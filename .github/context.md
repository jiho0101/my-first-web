# Repository Context - Ch10 Posts CRUD

## Project Status
- Next.js 16.2.1 App Router based project.
- Tailwind CSS and shadcn/ui styling.
- **Ch8 Complete**: Supabase CLI connected, `posts` and `profiles` tables created in schema.
- **Ch9 Complete**: Email/password auth (signup, login, logout), session persistence, protected `/posts/new` route via middleware.
- **Ch10 Complete**: Supabase CRUD implemented in `lib/posts.ts`, pages wired, and UI workflows verified.

## Current Pages (Ch9)
- `/` — Home
- `/posts` — Post list (READ)
- `/posts/new` — Create post form (protected)
- `/posts/[id]` — Post detail (READ)
- `/login` — Login form
- `/signup` — Signup form

## Ch10 Scope: Posts CRUD
- **READ** (GET): `/posts` list, `/posts/[id]` detail
- **CREATE** (POST): `/posts/new` form → insert to Supabase
- **UPDATE** (PUT): Edit UI in post detail with `updatePost()`
- **DELETE** (DELETE): Delete button in post detail with `deletePost()`

### Completed Ch10 Pages
- `/posts` — Server page renders post list from Supabase
- `/posts/[id]` — Server page renders post detail; edit/delete UI shown only to author
- `/posts/new` — Client page with `PostForm`, createPost, and auth redirect

### Supabase Query Pattern
- `supabase.from('posts').select('id, user_id, title, content, created_at').order('created_at', { ascending: false })`
- `supabase.from('posts').select('id, user_id, title, content, created_at').eq('id', id).single()`
- `supabase.from('posts').insert([{ title, content, user_id }])`
- `supabase.from('posts').update({ title, content }).eq('id', id)`
- `supabase.from('posts').delete().eq('id', id)`

### Author UI Branch
- edit/delete buttons are shown only when `useAuth().user?.id === post.user_id`
- this is a UX check only; actual security will be enforced by Ch11 RLS

### Database Schema (Ch8)
**posts table:**
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key → profiles)
- `title` (text)
- `content` (text)
- `created_at` (timestamptz, default now())

**profiles table:**
- `id` (uuid, primary key, auth.users 참조)
- `username` (text)
- `avatar_url` (text)
- `role` (text)
- `created_at` (timestamptz, default now())

## Key Architecture Decisions
1. Use `lib/supabase/client.ts` (createBrowserClient) for data operations
2. Use `contexts/AuthContext.tsx` (useAuth hook) to check logged-in user
3. Use Server Components for data fetching, Client Components for forms/interactions
4. UI controls for edit/delete (show only to post author), actual security via RLS (Ch11)
5. `lib/posts.ts` now implements Supabase CRUD: fetchPosts, getPost, createPost, updatePost, deletePost

## Version Policy
| Package | 교재 기준 | 실제 설치 |
|---------|----------|----------|
| Next.js | 16.2.1 | 16.2.1 |
| @supabase/supabase-js | 2.47.12 | ^2.105.4 |
| @supabase/ssr | 0.5.2 | ^0.10.3 |

- 수업 설명은 교재 기준으로 통일
- 코드 작성은 실제 설치 버전 (^2.105.4, ^0.10.3)에 맞춤
- 빌드 오류는 package.json 버전 기준으로 진단

## Restrictions
- ❌ Pages Router / `next/router`
- ❌ Social login
- ❌ `service_role` key in client
- ✅ App Router only, `next/navigation`
