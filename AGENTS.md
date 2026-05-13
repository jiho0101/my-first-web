<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This repository uses Next.js 16 App Router and Supabase. Follow `.github/copilot-instructions.md` for the primary coding rules.

## Agent Guidance
- App Router only
- `next/navigation` 사용, `next/router` 금지
- Supabase Auth는 이메일/비밀번호만 사용
- 보호 라우트는 `middleware.ts`로 처리
- `signInWithPassword` 사용, `auth.signIn()` 구버전 금지
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Version Policy
- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 실제 package.json은 더 최신일 수 있다.
- 수업 설명은 교재 기준으로 통일한다.
<!-- END:nextjs-agent-rules -->
