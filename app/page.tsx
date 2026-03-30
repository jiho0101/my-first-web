export default function Home() {
  return (
    <>
      <header className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">블로그 제목</h1>
        <nav>
          <ul className="flex gap-4 text-blue-600">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <section>
          <h2 className="text-xl font-semibold mb-6">최신 게시글</h2>

          <div className="space-y-4">
            <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">첫 번째 게시글</h3>
              <p className="text-gray-600 mb-2">
                첫 번째 게시글의 내용 미리보기입니다.
              </p>
              <p className="text-sm text-gray-400">작성자: 홍길동 | 날짜: 2026-03-30</p>
            </article>

            <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">두 번째 게시글</h3>
              <p className="text-gray-600 mb-2">
                두 번째 게시글의 내용 미리보기입니다.
              </p>
              <p className="text-sm text-gray-400">작성자: 김철수 | 날짜: 2026-03-29</p>
            </article>

            <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">세 번째 게시글</h3>
              <p className="text-gray-600 mb-2">
                세 번째 게시글의 내용 미리보기입니다.
              </p>
              <p className="text-sm text-gray-400">작성자: 이영희 | 날짜: 2026-03-28</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto p-4 text-sm text-gray-500">
        <p>© 2026 My Blog</p>
      </footer>
    </>
  );
}