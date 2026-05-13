Ch9 Supabase Auth Implementation Status:

## Completed ✅
1. Document refinement: `.github/copilot-instructions.md`, `.github/ARCHITECTURE.md`, `.github/context.md`, `.github/todo.md`, `AGENTS.md`, `CLAUDE.md`, `.agent/rules/project.md`.
2. Version policy documented.
3. Core implementation:
   - `lib/auth.ts`: signInWithEmail, signUpWithEmail, signOut
   - `app/login/page.tsx`: Email/password login form
   - `app/signup/page.tsx`: Email/password signup form
   - `contexts/AuthContext.tsx`: Global auth state with useAuth hook
   - `components/AuthNav.tsx`: Auth-aware navigation header
   - `middleware.ts`: Protected route for `/posts/new` → `/login` redirect
   - `app/layout.tsx`: AuthProvider wrapper
4. Build successful with no TypeScript errors.

## Optional / Future
- `app/mypage/page.tsx`: User profile page (protected route)
