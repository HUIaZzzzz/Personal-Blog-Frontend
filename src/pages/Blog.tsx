import type { BlogPost } from "@/types/blog.ts";
import { useBlogList } from "@/hooks/useBlogs.ts";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {BlogCard} from "@/components/BlogCard.tsx";

function Blog() {
  const { data, isLoading, isError } = useBlogList();

  return (
    <div>
      <h1 className="scroll-m-20 text-xl font-extrabold  lg:text-3xl">博客</h1>

      {/* 加载态 */}
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          {[1, 2, 3].map((i) => (
            <BlogCard key= {i}/>
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
              title={blog.title} // 传递标题
              summary={blog.summary} // 传递摘要
              created_at={blog.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
