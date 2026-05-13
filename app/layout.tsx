import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import AuthNav from "../components/AuthNav";

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
    <html lang="ko">
      <body>
        <AuthProvider>
          <AuthNav />
          <main className="max-w-4xl mx-auto p-6 min-h-screen">
            {children}
          </main>
          <footer className="text-center text-gray-500 p-4">
            © 2026 내 블로그
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
