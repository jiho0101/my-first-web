"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "../lib/posts";
import SearchBar from "./SearchBar";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = initialPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {filteredPosts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          검색된 게시글이 없거나 작성된 글이 없습니다.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300"
            >
              <Link href={`/posts/${post.id}`} className="flex-grow focus:outline-none">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-4 flex-grow text-base leading-relaxed">
                  {post.content}
                </p>
              </Link>

              <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                <time dateTime={post.created_at} className="text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('ko-KR')}
                </time>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
