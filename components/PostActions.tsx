'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { updatePost, deletePost } from '@/lib/posts';

interface PostActionsProps {
  postId: string;
  userId: string;
  initialTitle: string;
  initialContent: string;
}

export default function PostActions({ postId, userId, initialTitle, initialContent }: PostActionsProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // UI-only 분기입니다. 실제 보안은 Ch11 RLS에서 처리됩니다.
  const isAuthor = user?.id === userId;

  if (!isAuthor) {
    return null;
  }

  const handleUpdate = async () => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const updatedPost = await updatePost(postId, title, content);
      if (!updatedPost) {
        throw new Error('게시글 수정에 실패했습니다.');
      }
      router.push('/posts');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '게시글 수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
    if (!confirmed) {
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const deleted = await deletePost(postId);
      if (!deleted) {
        throw new Error('게시글 삭제에 실패했습니다.');
      }
      router.push('/posts');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '게시글 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
      {errorMessage && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mb-2">
              내용
            </label>
            <textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleUpdate}
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              저장
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            수정
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
