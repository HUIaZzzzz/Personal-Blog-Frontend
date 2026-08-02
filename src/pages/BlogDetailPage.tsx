import {useBlog} from "@/hooks/useBlogs.ts";
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import {EmptyDemo} from "@/components/Empty.tsx";

const BlogDetailPage = () => {
    const { slug } = useParams();
    const { data, isLoading, error} = useBlog(slug!);
    if (isLoading) return <EmptyDemo/>

    if (error || !data) throw error;
    return (
        <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {data.content}
            </ReactMarkdown>
        </article>
    );
};

export default BlogDetailPage;