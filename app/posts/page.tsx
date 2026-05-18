import { fetchPosts } from "../../lib/posts";
import PostList from "../../components/PostList";

export const metadata = {
  title: "게시글 목록",
  description: "작성된 모든 게시글을 확인할 수 있습니다.",
};

export default async function PostsPage() {
  // Supabase에서 게시글 데이터 조회
  const fetchedPosts = await fetchPosts();

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

      {/* 게시글이 없을 때 */}
      {fetchedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">게시글이 없습니다.</p>
        </div>
      ) : (
        /* 클라이언트 컴포넌트로 초기 데이터를 넘겨주어 상태 관리(검색)를 위임합니다. */
        <PostList initialPosts={fetchedPosts} />
      )}
    </div>
  );
}
