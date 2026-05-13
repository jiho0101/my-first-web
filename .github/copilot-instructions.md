# Tech Stack
- Next.js: 16.2.1 (App Router ONLY)
- Tailwind CSS: ^4

## Version Policy
- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 실제 package.json은 더 최신일 수 있다.
- 수업 프롬프트와 설명은 교재 기준으로 통일한다.
- 빌드 오류가 버전 차이에서 발생하면 package.json 기준으로 원인을 확인한다.

# Coding Conventions
- Server Component 기본 (Use Server Components by default)
- Tailwind CSS만 사용 (Use Tailwind CSS exclusively)

# Known AI Mistakes
- `next/router` 금지 (`next/navigation` 사용)
- Pages Router 금지
- `params`는 await 필수

# Design Tokens

- Primary color: defined in `app/globals.css` using CSS variables
- Use `--primary` and `--primary-foreground` for main UI actions
- Example:
  - `bg-primary` → main button background
  - `text-primary-foreground` → button text color

- Use Tailwind CSS utility classes only
- Use CSS variables from `globals.css` for color system
- Keep consistent spacing:
  - `p-4`, `p-6`
  - `gap-4`, `gap-6`

- Use simple and clean UI style
- Prefer rounded corners and minimal shadows
- Use card-based layout for content sections

# Component Rules

- Use shadcn/ui components as default UI system

## Core Components
- Button → actions (submit, navigation)
- Card → layout blocks, post preview
- Input → title, search, email, password
- Textarea → post content

## Usage Rules
- Do NOT create custom UI if shadcn/ui component exists
- Keep UI consistent across pages
- Wrap content in Card when displaying structured data

## Next.js Rules
- Use App Router only
- Use `next/navigation` instead of `next/router`
- Use Server Components by default
- Use Client Components only when interaction is required

## Routing Rules
- `/` → Home
- `/posts` → Post list
- `/posts/new` → Create post
- `/posts/[id]` → Post detail

## Data Flow Rules
- Data fetching should happen in Server Components
- Forms (create/update) can use Client Components
- Separate UI and data logic clearly

# Database Rules (Supabase)

## Tables

### profiles
- id (uuid, PK, auth.users 연결)
- username (text)
- avatar_url (text)
- created_at (timestamptz)

### posts
- id (uuid, PK)
- user_id (uuid, FK → profiles.id)
- title (text)
- content (text)
- created_at (timestamptz)

## Relationships
- profiles 1 : N posts

## Auth Rules
- 이메일/비밀번호 로그인 사용
- 로그아웃, 로그인 상태 유지 구현
- 로그인 사용자만 글 작성 가능
- 게시글 조회는 모두 가능
- `/posts/new`은 보호 라우트로 처리
- 이 교재에서는 보호 라우트 파일로 middleware.ts를 사용
- Supabase Auth 로그인은 signInWithPassword 사용
- auth.signIn() 구버전은 사용하지 않는다
- service_role 키는 클라이언트에 절대 두지 않는다
- 소셜 로그인은 추가하지 않는다
- 환경변수: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

# UI/UX Rules

- Minimal and clean design
- Avoid over-design
- Focus on readability
- Keep layout simple and predictable

# Important

- Do NOT modify routing structure unnecessarily
- Do NOT mix Pages Router and App Router
- Always follow design tokens and component rules