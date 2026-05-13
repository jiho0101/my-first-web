# Project Agent Rules

## App Router
- Next.js 16 App Router만 사용합니다.
- `pages` 라우터를 사용하지 않습니다.
- 클라이언트 내비게이션은 `next/navigation`을 사용합니다.
- `next/router`는 사용하지 않습니다.

## Auth & Supabase
- 이메일/비밀번호 인증만 구현합니다.
- 소셜 로그인은 추가하지 않습니다.
- Supabase Auth 로그인은 `signInWithPassword`를 사용합니다.
- `auth.signIn()` 구버전은 사용하지 않습니다.
- 보호 라우트는 `middleware.ts` 파일로 처리합니다.
- `service_role` 키를 클라이언트에 절대 두지 않습니다.
- `@supabase/ssr` 패턴을 따라 서버 측 인증 헬퍼를 분리합니다.
- 환경변수 이름은 `NEXT_PUBLIC_SUPABASE_URL` 및 `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 유지합니다.

## UI / 구현 범위
- `shadcn/ui` 컴포넌트를 기본 UI 시스템으로 사용합니다.
- Tailwind CSS만 씁니다.
- 서버 컴포넌트 기본, 클라이언트 컴포넌트는 상호작용이 필요한 곳에만 사용합니다.

## Version Policy
- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 실제 package.json은 더 최신일 수 있습니다.
- 문서와 프롬프트는 교재 기준으로 통일하되, 빌드 오류가 버전 차이에서 발생하면 package.json을 우선 확인합니다.
