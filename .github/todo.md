# Project Tasks

## Ch7 Foundation ✅
- [x] Next.js 16 App Router setup
- [x] Tailwind CSS + shadcn/ui
- [x] Base pages structure (`/`, `/posts`, `/posts/[id]`, `/posts/new`)

## Ch8 Supabase Connection ✅
- [x] Supabase project creation + CLI setup
- [x] `posts` and `profiles` tables with schema
- [x] `lib/supabase/client.ts` (createBrowserClient)
- [x] Environment variables (.env.local)

## Ch9 Authentication ✅
- [x] `lib/auth.ts` (signInWithEmail, signUpWithEmail, signOut)
- [x] `contexts/AuthContext.tsx` (useAuth hook, session persistence)
- [x] `/login` and `/signup` pages (Client Components with forms)
- [x] `components/AuthNav.tsx` (Auth-aware navigation)
- [x] `middleware.ts` (Protected route: `/posts/new`)
- [x] `app/layout.tsx` wrapped with AuthProvider

## Ch10 Posts CRUD (Completed) ✅

### 구현 완료 목록
- [x] 게시글 목록 `/posts` — Supabase에서 데이터 조회, 빈 상태 표시
- [x] 게시글 상세 `/posts/[id]` — post 조회, 없는 경우 notFound() 처리
- [x] 게시글 작성 `/posts/new` — 제목/내용 입력, insert, user_id는 `user.id` 사용
- [x] 게시글 수정 UI `/posts/[id]` — 작성자만 edit 버튼 표시, updatePost() 호출
- [x] 게시글 삭제 UI `/posts/[id]` — 작성자만 delete 버튼 표시, 확인 창 후 deletePost() 호출
- [x] 빌드 검증: `npm run build` 성공

### 추가 검증
- [ ] Ch11 RLS로 실제 보안 구현

## Ch11 Row-Level Security (Future) 📋
- [ ] Implement RLS policies for posts table (enforce author-only update/delete)
- [ ] Implement RLS policies for profiles table
- [ ] Test RLS enforcement
- [ ] Update context.md with RLS completion
