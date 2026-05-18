'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import PostForm from '../../../components/PostForm'
import { createPost } from '../../../lib/posts'

export default function NewPostPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">로딩 중입니다...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500 mb-4">로그인이 필요합니다.</p>
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          로그인하러 가기
        </button>
      </div>
    )
  }

  const handleSubmit = async (title: string, content: string) => {
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const newPost = await createPost(title, content, user.id)
      if (!newPost) {
        throw new Error('게시글 작성에 실패했습니다.')
      }
      router.push(`/posts/${newPost.id}`)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '게시글 작성 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">새 게시글 작성</h1>
        <p className="mt-2 text-gray-600">새로운 게시글을 작성하세요.</p>
      </header>

      {errorMessage && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      <PostForm onSubmit={handleSubmit} disabled={isSubmitting} />
    </div>
  )
}