import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title?: string;
  summary?: string;
  created_at?: string;
}
export function BlogCard({ title, summary, created_at }: Props) {
  return (
    <Card className="mx-auto w-full max-w-2xl">
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
      </CardFooter>
    </Card>
  );
}
