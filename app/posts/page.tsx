import { fetchPosts } from "../../lib/posts";
import PostList from "../../components/PostList";

export const metadata = {
  title: "게시글 목록",
  description: "작성된 모든 게시글을 확인할 수 있습니다.",
};

export default async function PostsPage() {
  // 서버 컴포넌트에서 초기 데이터(20개)를 Fetching 합니다.
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

      {/* 클라이언트 컴포넌트로 초기 데이터를 넘겨주어 상태 관리(검색/추가/삭제)를 위임합니다. */}
      <PostList initialPosts={fetchedPosts} />
    </div>
  );
}
