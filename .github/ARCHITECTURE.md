# Blog Project Architecture

## 1. Project Overview

This project is a blog web application built with Next.js 16 App Router.  
It currently provides post listing, post creation, and post detail pages.  
The architecture is designed to be extended with Supabase CRUD, authentication, and RLS in later chapters.

## 2. Tech Stack

- Framework: Next.js 16 App Router
- Styling: Tailwind CSS
- UI System: shadcn/ui
- Database / Backend: Supabase
- Authentication: Supabase Email/Password Auth
- Language: TypeScript

## 3. Page Map

### Core Pages (Ch7-Ch8)
| URL | Page | Description |
|---|---|---|
| `/` | Home | Main landing page and post preview area |
| `/posts` | Post List | Displays all blog posts |
| `/posts/[id]` | Post Detail | Displays a single post by id |

### Ch9 Auth Pages (Implemented)
| URL | Page | Description |
|---|---|---|
| `/login` | Login | Email/password login page |
| `/signup` | Signup | Email/password signup page |
| `/posts/new` | New Post | Protected route (requires auth). Form page for creating a new post |

### Planned Pages (Future)
| URL | Page | Description |
|---|---|---|
| `/mypage` | My Page | User profile and user's posts (protected route) |

## 4. Current App Router Structure (Post-Ch9)

```text
app/
├─ page.tsx
├─ layout.tsx          # Wrapped with AuthProvider
├─ globals.css
├─ login/
│  └─ page.tsx
├─ signup/
│  └─ page.tsx
└─ posts/
   ├─ page.tsx
   ├─ new/
   │  └─ page.tsx     # Protected by middleware.ts
   └─ [id]/
      └─ page.tsx

components/
├─ AuthNav.tsx         # Auth-aware navigation
└─ ...

contexts/
└─ AuthContext.tsx     # Global auth state & useAuth hook

lib/
├─ auth.ts            # signInWithEmail, signUpWithEmail, signOut
├─ supabase/
│  └─ client.ts       # Browser Supabase client
└─ ...

middleware.ts          # Protects /posts/new route