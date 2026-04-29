# Tech Stack
- Next.js: 16.2.1 (App Router ONLY)
- Tailwind CSS: ^4

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
- 로그인 사용자만 글 작성 가능
- 게시글 조회는 모두 가능

# UI/UX Rules

- Minimal and clean design
- Avoid over-design
- Focus on readability
- Keep layout simple and predictable

# Important

- Do NOT modify routing structure unnecessarily
- Do NOT mix Pages Router and App Router
- Always follow design tokens and component rules