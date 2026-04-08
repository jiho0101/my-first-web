import Link from "next/link";
import { posts } from "../../../lib/posts";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h1 className="text-2xl font-bold text-gray-800">게시글을 찾을 수 없습니다.</h1>
        <Link href="/posts" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

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
            <span className="font-medium text-gray-700">{post.author}</span>
            <span>|</span>
            <time>{post.date}</time>
          </div>
        </header>
        
        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
          {post.content}
        </div>
      </article>
    </div>
  );
}
