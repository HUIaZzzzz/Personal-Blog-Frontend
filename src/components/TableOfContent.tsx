import { ScrollArea } from "@/components/ui/scroll-area";
import { extractToc } from "@/lib/extractToc.ts";
import { useState } from "react";

export function ElegantTOC({ markdown }: { markdown: string }) {
  if (!markdown) {
    return null;
  }
  const headings = extractToc(markdown);
  const minLevel = Math.min(...headings.map((h) => h.level));
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <ScrollArea className="h-72 w-60 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">目录</h4>
        <nav className="flex flex-col gap-1">
          {headings.map((heading) => {
            const indent = (heading.level - minLevel) * 16;
            const isActive = heading.id === activeId;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={
                  isActive
                    ? "block text-sm font-medium text-foreground transition-colors"
                    : "block text-sm text-muted-foreground transition-colors hover:text-foreground"
                }
                style={{ paddingLeft: indent }}
                onClick={() => setActiveId(heading.id)}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      </div>
    </ScrollArea>
  );
}
