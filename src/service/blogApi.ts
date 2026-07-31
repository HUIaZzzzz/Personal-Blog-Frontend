import { axiosInstance } from './apiClient';
import APIClient from './apiClient';
import type { BlogPost } from '@/types/Blog.ts';

const blogClient = new APIClient<BlogPost>('/blogs');

/** 获取博客列表 —— 后端返回纯数组，直接用 axiosInstance */
export async function fetchBlogs(): Promise<BlogPost[]> {
  const { data } = await axiosInstance.get<BlogPost[]>('/blogs');
  return data;
}

/** 根据 slug 获取单篇博客 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost> {
  return blogClient.get(slug);
}
