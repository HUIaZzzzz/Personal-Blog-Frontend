import { useQuery } from "@tanstack/react-query";
import APIClient from "../service/apiClient.ts";
import Blog from "../types/Blog.ts";

const apiClient = new APIClient<Blog>("/blogs");

const useBlog = (slug?: string) =>
  useQuery({
    queryKey: ["blogs", slug],
    queryFn: async () => {
      if (slug) {
        return apiClient.get(slug);
      }
      return apiClient.getAll();
    },
  });

export default useBlog;
