# Blog Project Architecture

## 1. Project Overview

This is a blog application built with Next.js 16 App Router and Supabase backend.
- **Ch7-Ch8**: Foundation and Supabase database setup
- **Ch9**: Email/password authentication
- **Ch10**: Posts CRUD operations (Create, Read, Update, Delete)
- **Ch11**: Row-Level Security policies for data protection

## 2. Tech Stack

- **Framework**: Next.js 16 App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Database / Backend**: Supabase
- **Authentication**: Supabase Email/Password Auth
- **Language**: TypeScript

### Key Packages (Ch10+)

| Package | Version (Textbook) | Version (Actual) | Notes |
|---------|-------------------|------------------|-------|
| next | 16.2.1 | 16.2.1 | App Router |
| @supabase/supabase-js | 2.47.12 | ^2.105.4 | Data operations |
| @supabase/ssr | 0.5.2 | ^0.10.3 | Browser client |
| react | ^19 | 19.2.4 | UI rendering |
| tailwindcss | ^4 | ^4 | CSS framework |

## 3. Page Map (Post-Ch10)

### Public Pages
| URL | Component | Purpose | Type |
|---|---|---|---|
| `/` | `app/page.tsx` | Home / blog preview | Server |
| `/posts` | `app/posts/page.tsx` | All posts list | Server |
| `/posts/[id]` | `app/posts/[id]/page.tsx` | Post detail (with author info) | Server |

### Auth Pages
| URL | Component | Purpose | Type |
|---|---|---|---|
| `/login` | `app/login/page.tsx` | Email/password login | Client (form) |
| `/signup` | `app/signup/page.tsx` | Email/password signup | Client (form) |

### Protected Pages
| URL | Component | Protection | Type |
|---|---|---|---|
| `/posts/new` | `app/posts/new/page.tsx` | middleware.ts redirect → `/login` | Client (form) |
| `/posts/[id]` | `app/posts/[id]/page.tsx` | edit/delete UI shown only to author | Server + Client (PostActions) |

## 4. Data Model (Supabase Tables)

### posts
```sql
CREATE TABLE posts (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES profiles.id,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

### profiles
```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users.id,
  username text,
  avatar_url text,
  role text,
  created_at timestamptz DEFAULT now()
);
```

**Relationship**: `profiles` (1) ← → (N) `posts`

## 5. App Router Structure (Post-Ch10)

```
app/
├─ page.tsx                    # Home
├─ layout.tsx                  # Root layout + AuthProvider
├─ globals.css                 # Design tokens & colors
├─ login/
│  └─ page.tsx                # Login form (Client)
├─ signup/
│  └─ page.tsx                # Signup form (Client)
└─ posts/
   ├─ page.tsx                # Posts list (Server)
   ├─ new/
   │  └─ page.tsx             # Create post form (Client, protected)
   └─ [id]/
      └─ page.tsx             # Post detail (Server) + edit/delete UI

components/
├─ AuthNav.tsx                # Navigation + auth status (Client)
├─ PostActions.tsx            # Post edit/delete UI (Client)
├─ PostForm.tsx               # Shared post form (Client)
├─ PostList.tsx               # Posts list display (Client search/filter)
├─ SearchBar.tsx              # Search UI (Client)
└─ ui/
   └─ button.tsx              # shadcn/ui Button

contexts/
└─ AuthContext.tsx            # useAuth hook, session persistence (Client)

lib/
├─ auth.ts                    # signInWithEmail, signUpWithEmail, signOut
├─ posts.ts                   # fetchPosts, getPost, createPost, updatePost, deletePost
├─ supabase/
│  └─ client.ts              # createBrowserClient for posts CRUD
└─ utils.ts                   # Helpers (if needed)

middleware.ts                  # Protected route: /posts/new → /login
```

## 6. Data Flow (Ch10 CRUD)

### CREATE Flow
```
POST /posts/new
  → PostForm component (Client)
    → form submission
      → call createPost() in lib/posts.ts
        → supabase.from('posts').insert()
          → redirect to /posts/[id]
```

### READ Flow
```
GET /posts
  → app/posts/page.tsx (Server)
    → fetchPosts() in lib/posts.ts
      → supabase.from('posts').select('*, profiles(*)')
        → render PostList component
```

```
GET /posts/[id]
  → app/posts/[id]/page.tsx (Server)
    → getPost(id) in lib/posts.ts
      → supabase.from('posts').select('*, profiles(*)').eq('id', id)
        → render post + author info + edit/delete buttons (if author)
```

### UPDATE/DELETE Flow
```
POST /posts/[id]/edit or DELETE /posts/[id]
  → (auth check: useAuth() returns current user)
    → if user.id === post.user_id (UX check only)
      → show edit/delete button
        → call updatePost() or deletePost()
          → supabase.from('posts').update/delete
            → (actual security via RLS in Ch11)
```

## 7. Authentication State (Ch9+)

```
AuthContext (Client context)
├─ user (User | null)
├─ loading (boolean)
├─ signInWithEmail()
├─ signUpWithEmail()
└─ signOut()

useAuth() hook (any Client component)
  → access current user & auth methods
```

## 8. Key Design Decisions

1. **Server Components by default**: Data fetching in pages/lib, reduces client bundle
2. **Client Components for forms**: PostForm, AuthNav interaction needs state
3. **Supabase Client (browser)**: `lib/supabase/client.ts` for all CRUD via createBrowserClient
4. **UX vs Security**: Edit/delete buttons hidden from non-authors (UX), actual enforcement via RLS (Ch11)
5. **Middleware for routes**: `/posts/new` protected by middleware redirect, not component-level check
6. **No Pages Router**: Purely App Router throughout

## 9. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

⚠️ Do NOT add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` (client-facing repo)

## 10. Routing Rules (Next.js)

- Dynamic routes: `/posts/[id]` (not `/posts/:id`)
- Segments require `page.tsx` for rendering
- `params` must be awaited: `const { id } = await params`
- `next/navigation` for client-side navigation (Router, useRouter)

## 11. Component Rules

### Core shadcn/ui Components
- **Button**: Actions (submit, delete, navigate)
- **Card**: Content containers, post preview
- **Input**: Text fields (title, search)
- **Textarea**: Multi-line fields (post content)

### Restrictions
- ❌ Do NOT build custom UI if shadcn/ui component exists
- ❌ Do NOT mix Tailwind classes unnecessarily
- ✅ Use CSS variables from globals.css for colors

## 12. Testing & Build

```bash
# Development
npm run dev

# Type checking + build simulation
npm run build

# Type checking only
npm run lint
```

Before each chapter completion:
1. Test in browser (full CRUD flow)
2. `npm run build` — verify no TypeScript errors
3. Update context.md with completion notes