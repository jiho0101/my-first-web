"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "../lib/posts";
import SearchBar from "./SearchBar";
import PostForm from "./PostForm";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddPost = (title: string, content: string) => {
    const newPost: Post = {
      id: Date.now(), // Generate a unique numerical ID
      title,
      content,
      author: "게스트 유저",
      date: new Date().toISOString().split("T")[0],
    };
    // Immutable update
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (id: number) => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      // Immutable update using filter
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const filteredPosts = posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <PostForm onSubmit={handleAddPost} />

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
                <div>
                  <span className="font-medium text-gray-700">{post.author}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeletePost(post.id);
                  }}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors focus:ring-2 focus:ring-red-500 text-xs font-semibold"
                >
                  삭제
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
