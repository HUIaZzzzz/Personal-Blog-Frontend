import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "@/service/blogApi";
import type { BlogPost } from "@/types/Blog.ts";

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBlogs();
        if (!cancelled) setPosts(data);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "加载失败，请稍后重试");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm xs:p-6 desktop:p-8">
      <h1 className="mb-6 scroll-m-20 text-xl font-extrabold tracking-tight xs:text-2xl lg:text-3xl">
        博客
      </h1>

      {/* 加载态 */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-md bg-muted/50 p-4">
              <div className="mb-2 h-5 w-2/3 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
            </div>
          ))}
        </div>
      )}

      {/* 错误态 */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-3 underline underline-offset-2"
          >
            重试
          </button>
        </div>
      )}

      {/* 空态 */}
      {!loading && !error && posts.length === 0 && (
        <p className="text-sm text-muted-foreground">暂无文章</p>
      )}

      {/* 文章列表 */}
      {!loading && !error && posts.length > 0 && (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/blog/${post.slug}`}
                className="block rounded-md border border-border p-4 transition-colors hover:bg-muted/30"
              >
                <h2 className="text-base font-semibold xs:text-lg">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {post.summary}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  {post.tags && post.tags.length > 0 && (
                    <span className="flex gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-muted px-1.5 py-0.5 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                  <span>
                    {new Date(post.created_at).toLocaleDateString("zh-CN")}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Blog;
