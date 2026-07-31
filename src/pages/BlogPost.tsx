import { useLoaderData, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchBlogBySlug } from '@/service/blogApi';
import type { BlogPost } from '@/types/Blog.ts';
import TableOfContents from '@/components/TableOfContents';

/** React Router loader —— 路由渲染前自动请求数据 */
export async function blogPostLoader({ params }: { params: { slug?: string } }): Promise<BlogPost> {
  if (!params.slug) {
    throw new Response('缺少文章标识', { status: 400 });
  }
  return fetchBlogBySlug(params.slug);
}

/** 给标题渲染时加上 id 锚点，与目录联动 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w一-鿿\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function HeadingRenderer({ level, children }: { level: number; children?: React.ReactNode }) {
  const text = typeof children === 'string' ? children : String(children ?? '');
  const id = slugify(text);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag id={id}>{children}</Tag>;
}

function BlogPost() {
  const post = useLoaderData() as BlogPost;

  return (
    <div className="flex gap-6 lg:gap-8">
      {/* ===== 左侧目录（桌面端固定） ===== */}
      <aside className="hidden lg:block w-48 desktop:w-56 shrink-0">
        <div className="sticky top-8">
          <TableOfContents content={post.content ?? ''} />
        </div>
      </aside>

      {/* ===== 右侧正文 ===== */}
      <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-4 shadow-sm xs:p-6 desktop:p-8">
        <Link
          to="/blog"
          className="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← 返回博客列表
        </Link>

        <h1 className="mb-2 scroll-m-20 text-xl font-extrabold tracking-tight xs:text-2xl lg:text-3xl">
          {post.title}
        </h1>

        <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground">
          {post.tags && post.tags.length > 0 && (
            <span className="flex gap-1">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded bg-muted px-1.5 py-0.5 font-mono">{tag}</span>
              ))}
            </span>
          )}
          <span>{new Date(post.created_at).toLocaleDateString('zh-CN')}</span>
        </div>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <HeadingRenderer level={1}>{children}</HeadingRenderer>,
              h2: ({ children }) => <HeadingRenderer level={2}>{children}</HeadingRenderer>,
              h3: ({ children }) => <HeadingRenderer level={3}>{children}</HeadingRenderer>,
              h4: ({ children }) => <HeadingRenderer level={4}>{children}</HeadingRenderer>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

export default BlogPost;
