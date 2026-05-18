import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "../../../lib/posts";
import PostActions from "../../../components/PostActions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  // created_at을 날짜 문자열로 포맷
  const postDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-4">
        <Link href="/posts" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors inline-block">
          &larr; 목록으로 돌아가기
        </Link>
      </div>
      
      <article className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <header className="border-b border-gray-100 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">{post.title}</h1>
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="font-medium text-gray-700">작성자: {post.user_id}</span>
            <span>|</span>
            <time>{postDate}</time>
          </div>
        </header>
        
        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
          {post.content}
        </div>

        {/* 로그인한 사용자가 작성자인 경우 수정/삭제 버튼 표시 */}
        <PostActions
          postId={post.id}
          userId={post.user_id}
          initialTitle={post.title}
          initialContent={post.content}
        />
      </article>
    </div>
  );
}
