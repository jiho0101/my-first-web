"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function AuthNav() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const { error } = await signOut();
    setIsLoggingOut(false);
    if (!error) {
      router.push("/");
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <div className="text-xl font-bold">내 블로그</div>

        <ul className="flex flex-wrap items-center gap-4 text-sm">
          <li>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              홈
            </Link>
          </li>
          <li>
            <Link href="/posts" className="hover:text-gray-300 transition-colors">
              블로그
            </Link>
          </li>

          {loading ? (
            <li className="text-gray-300">로딩...</li>
          ) : user ? (
            <>
              <li>
                <Link href="/posts/new" className="hover:text-gray-300 transition-colors">
                  새 글 쓰기
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="rounded-xl bg-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-300 transition-colors">
                  로그인
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-300 transition-colors">
                  회원가입
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
