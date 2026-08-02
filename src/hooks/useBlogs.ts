import {useQuery} from "@tanstack/react-query";
import APIClient, {type FetchResponse} from "../service/apiClient.ts";
import type {BlogPost} from "../types/blog.ts";

const blogClient = new APIClient<BlogPost>("/blogs");

/** 获取博客列表（分页） */
export function useBlogList(page: number = 1, pageSize: number = 10) {
  const skip = (page - 1) * pageSize;
  return useQuery<FetchResponse<BlogPost>>({
    queryKey: ["blogs", "list", page, pageSize],
    queryFn: () => {
        return blogClient.getAll({ skip, limit: pageSize });
    },
  });
}

/** 获取单篇博客（有 slug） */
export function useBlog(slug: string) {
  return useQuery<BlogPost>({
    queryKey: ["blogs", slug],
    queryFn: () => blogClient.get(slug),
    enabled: !!slug, // 没有 slug 时不请求
  });
}
