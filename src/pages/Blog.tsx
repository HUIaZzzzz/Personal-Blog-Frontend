import { useState } from "react";
import type { BlogPost } from "@/types/blog.ts";
import { useBlogList } from "@/hooks/useBlogs.ts";
import { Card, CardContent } from "@/components/ui/card";
import { BlogCard } from "@/components/BlogCard.tsx";
import { PaginationDemo } from "@/components/Page.tsx";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const PAGE_SIZE = 10;

function Blog() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useBlogList(page, PAGE_SIZE);

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  return (
    <div>
      <div className="p-4 mt-4">
        <Badge className="block mx-auto">Blog</Badge>
        <h1 className=" text-xl font-extrabold lg:text-3xl text-center">
          博客
        </h1>
        <Label className="block text-center">探索代码</Label>
      </div>

      {/* 加载态 */}
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          {[1, 2, 3].map((i) => (
            <BlogCard key={i} />
          ))}
        </div>
      )}

      {/* 空态 */}
      {!isLoading && !isError && data && data.results.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              暂无文章，稍后再来看看
            </p>
          </CardContent>
        </Card>
      )}

      {/* 文章列表 */}
      {!isLoading && !isError && data && data.results.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          {data.results.map((blog: BlogPost) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              summary={blog.summary}
              slug={blog.slug}
              created_at={blog.created_at}
              view_count={blog.view_count}
            />
          ))}
          <PaginationDemo
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default Blog;
