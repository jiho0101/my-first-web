# Project Agent Rules (Ch10+)

## Next.js & Routing
- **Next.js 16 App Router only** — no Pages Router
- Client navigation: `next/navigation` only (Router, useRouter)
- ❌ Forbidden: `next/router`
- Dynamic routes: `/posts/[id]` (not `/posts/:id`)
- `params` must be awaited: `const { id } = await params`

## Server vs Client Components
- **Default: Server Components** for data fetching and page rendering
- **Client Components ("use client")** only for:
  - Form interactions (input state, submission)
  - useAuth() hook usage
  - Event handlers (onClick, onChange, etc.)
  - Navigation (useRouter)

## Auth & Supabase (Ch9+)
- Email/password auth only (no social login)
- `signInWithPassword` method only (not `auth.signIn()`)
- `@supabase/ssr` pattern: `createBrowserClient` in `lib/supabase/client.ts`
- Protected routes via `middleware.ts` (not component-level route guards)
- **Never** add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Environment: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Data Layer (Ch10 CRUD)
- Use `lib/supabase/client.ts` for all Supabase operations (queries, inserts, updates, deletes)
- Server Components can import and call functions from `lib/posts.ts`
- Client Components use `useAuth()` to check current user before form submission
- Query pattern: `supabase.from('posts').select(...).eq(...)`
- Insert pattern: `supabase.from('posts').insert([...])`
- Update pattern: `supabase.from('posts').update(...).eq('id', id)`
- Delete pattern: `supabase.from('posts').delete().eq('id', id)`

## UI & Styling
- **shadcn/ui components** as default UI system
- **Tailwind CSS only** for styling (no custom CSS except globals.css)
- Spacing: `p-4`, `p-6`, `gap-4`, `gap-6`
- Colors: Use CSS variables from `globals.css` (--primary, --primary-foreground)
- Design: Minimal, clean, card-based layouts

### Core Components Used
- `Button` — form submit, delete, navigate
- `Card` — content containers, post preview
- `Input` — text fields (title, search)
- `Textarea` — post content field

## Database Schema (Ch8)
```
posts:
  - id (uuid, PK)
  - user_id (uuid, FK)
  - title (text)
  - content (text)
  - created_at (timestamptz)

profiles:
  - id (uuid, PK)
  - username (text)
  - avatar_url (text)
  - created_at (timestamptz)
```

## Ch10 CRUD Rules
1. **READ**: Fetch posts in Server Component, render with PostList
2. **CREATE**: Form in Client Component (`/posts/new`), submit via server action or API
3. **UPDATE/DELETE**: Show buttons only to post author (UX check with `useAuth()`)
   - Actual security enforcement happens in Ch11 via RLS
   - Do NOT skip the UX check (user experience)
4. Edit flow: Either inline edit in detail page or separate `/posts/[id]/edit` page

## Version Policy
| Item | Textbook | Actual | Notes |
|------|----------|--------|-------|
| Next.js | 16.2.1 | 16.2.1 | Fixed |
| @supabase/supabase-js | 2.47.12 | ^2.105.4 | Higher OK, check if build breaks |
| @supabase/ssr | 0.5.2 | ^0.10.3 | Higher OK, check if build breaks |

- Documentation (prompts, instructions) follow textbook versions
- Code implementation follows actual package.json versions
- Build errors: Check actual package.json first

## Build & Deploy
```bash
npm run dev          # Development mode
npm run build        # Verify TypeScript + build
npm run lint         # Type check
```

Before committing Ch10 work:
1. ✅ Test CRUD flows in browser
2. ✅ No TypeScript errors (`npm run lint`)
3. ✅ Build succeeds (`npm run build`)
4. ✅ Update `.github/context.md` with completion notes

## Restrictions (Global)
- ❌ Pages Router
- ❌ `next/router`
- ❌ Social login
- ❌ `service_role` key in client
- ❌ Custom UI if shadcn/ui exists
- ❌ Server actions in components marked "use client" (use POST route handlers instead)
- ✅ App Router, `next/navigation`, Email/password auth, Server Components
