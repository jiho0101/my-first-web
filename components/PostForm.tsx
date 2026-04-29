"use client";

import { useState, FormEvent } from "react";

interface PostFormProps {
  onSubmit: (title: string, content: string) => void;
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      window.alert("제목을 입력해주세요!");
      return;
    }
    
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800">새 게시글 작성</h3>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="게시물 제목을 입력하세요."
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="게시물 내용을 자유롭게 작성하세요."
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          등록하기
        </button>
      </div>
    </form>
  );
}
