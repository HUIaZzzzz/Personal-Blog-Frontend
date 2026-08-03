import { useBlog } from "@/hooks/useBlogs.ts";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/atom-one-dark.css";
import { EmptyDemo } from "@/components/Empty.tsx";

import { ElegantTOC } from "@/components/TableOfContent.tsx";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useBlog(slug!);


  if (isLoading) return <EmptyDemo />;

  if (error || !data) throw error;
  return (
    <div className="flex">
      <ElegantTOC markdown={data.content ?? ""}/>
      <div className="typeset typeset-docs mx-auto max-w-[37em]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {data.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDetailPage;
