
import APIClient from './apiClient';
import type { BlogPost } from '@/types/blog.ts';

const blogClient = new APIClient<BlogPost>('/blogs');


/** 根据 slug 获取单篇博客 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost> {
  return blogClient.get(slug);
}
