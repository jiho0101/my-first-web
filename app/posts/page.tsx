import Link from "next/link";
import { posts } from "../../lib/posts";

export const metadata = {
  title: "게시글 목록",
  description: "작성된 모든 게시글을 확인할 수 있습니다.",
};

export default function PostsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          블로그 게시글
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          최신 기술과 일상 등 다양한 주제의 글을 만나보세요.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/posts/${post.id}`}
            className="group block h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
          >
            <article className="h-full flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-400 transform hover:-translate-y-1 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3 mb-4 flex-grow text-base leading-relaxed">
                {post.content}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                <span className="font-medium text-gray-700">{post.author}</span>
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
