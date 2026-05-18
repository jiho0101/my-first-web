import { supabase } from './supabase/client';

export type Post = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

// Supabase posts 테이블에서 모든 게시글을 조회 (최신순)
export async function fetchPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, user_id, title, content, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch posts from Supabase:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
}

// Supabase posts 테이블에서 특정 게시글을 조회
export async function getPost(id: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, user_id, title, content, created_at')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Failed to fetch post from Supabase:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error fetching post:', err);
    return null;
  }
}

export async function createPost(
  title: string,
  content: string,
  user_id: string
): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, user_id }])
      .select('id, user_id, title, content, created_at')
      .single();

    if (error) {
      console.error('Failed to create post:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error creating post:', err);
    return null;
  }
}

export async function updatePost(
  id: string,
  title: string,
  content: string
): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id)
      .select('id, user_id, title, content, created_at')
      .single();

    if (error) {
      console.error('Failed to update post:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error updating post:', err);
    return null;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      console.error('Failed to delete post:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error deleting post:', err);
    return false;
  }
}
