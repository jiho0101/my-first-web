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

| URL | Page | Description |
|---|---|---|
| `/` | Home | Main landing page and post preview area |
| `/posts` | Post List | Displays all blog posts |
| `/posts/new` | New Post | Form page for creating a new post |
| `/posts/[id]` | Post Detail | Displays a single post by id |
| `/mypage` | My Page | User profile and user's posts |
| `/login` | Login | Email/password login page |
| `/signup` | Signup | Email/password signup page |

## 4. Current App Router Structure

```text
app/
├─ page.tsx
├─ layout.tsx
├─ globals.css
└─ posts/
   ├─ page.tsx
   ├─ new/
   │  └─ page.tsx
   └─ [id]/
      └─ page.tsx