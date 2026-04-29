import "./globals.css";
import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "내 블로그",
  description: "나의 개인 블로그입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">내 블로그</div>
            <ul className="flex space-x-6">
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
              <li>
                <Link href="/posts/new" className="hover:text-gray-300 transition-colors">
                  새 글 쓰기
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto p-6 min-h-screen">
          {children}
        </main>
        <footer className="text-center text-gray-500 p-4">
          © 2026 내 블로그
        </footer>
      </body>
    </html>
  );
}
