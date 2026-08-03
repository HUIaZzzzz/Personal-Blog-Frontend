import { CalendarIcon , Eye} from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Props {
  title?: string;
  summary?: string;
  slug?: string;
  created_at?: string;
  view_count?: number;
}

export function BlogCard({ title, summary, slug, created_at,view_count }: Props) {
  return (
    <Link to={"/blogs/" + slug} className="mx-auto w-full max-w-2xl block">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardHeader>
        <CardFooter className="gap-2">
          <CalendarIcon />
          <time>
            {created_at
              ? new Date(created_at).toLocaleDateString("zh-CN")
              : "未知日期"}
          </time>
          <Eye/>
          {view_count}
        </CardFooter>
      </Card>
    </Link>
  );
}
