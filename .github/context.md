Repository context for Ch9 Supabase Auth implementation:

- Next.js 16.2.1 App Router based project.
- Tailwind CSS and shadcn/ui styling.
- Current implemented pages: `/`, `/posts`, `/posts/new`, `/posts/[id]`, `/login`, `/signup`.
- Authentication (Supabase Email/Password) is implemented and working.
- Installed Supabase packages: @supabase/supabase-js ^2.105.4, @supabase/ssr ^0.10.3.
- Ch9 implementation complete: email/password signup, login, logout, session persistence, protected `/posts/new` route.
- Use App Router only; pages router and `next/router` are prohibited.
- Keep environment variable names: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Do not add social login.

## Version Policy
- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 실제 package.json: Next.js 16.2.1, @supabase/supabase-js ^2.105.4, @supabase/ssr ^0.10.3
- 수업 설명은 교재 기준, 코드는 설치 버전으로 작성.
