"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// 假设这是从文章解析出的标题数据
const demoHeadings = [
  { id: "intro", text: "介绍", level: 2 },
  { id: "install", text: "安装指南", level: 2 },
  { id: "usage", text: "基础用法", level: 3 },
  { id: "advanced", text: "高级配置", level: 3 },
  { id: "faq", text: "常见问题", level: 2 },
];

export function ElegantTOC() {
  const [activeId, setActiveId] = useState("install");

  return (

    <ScrollArea className="h-[calc(100vh-12rem)] w-full max-w-[220px] pr-4">
      <div className="flex flex-col space-y-3">
        {demoHeadings.map((heading, index) => {
          const isActive = activeId === heading.id;
          const isH2 = heading.level === 2;
          const isH3 = heading.level === 3;

          return (
            <div key={heading.id}>
              {/* 如果是 H3，加一个左侧缩进 */}
              <a
                href={`#${heading.id}`}
                className={cn(
                  "group relative block py-0.5 text-sm transition-all duration-200",
                  // H3 缩进 4，且字体稍小
                  isH3 && "pl-4 text-xs",
                  // 核心美学：左侧竖条指示器（伪元素或边框）
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground/80 hover:text-foreground",
                  // 左侧线条交互
                  "before:absolute before:left-0 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:transition-all",
                  isActive
                    ? "before:bg-primary"
                    : "before:bg-transparent group-hover:before:bg-muted-foreground/30",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveId(heading.id);
                  document
                    .getElementById(heading.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {heading.text}

                {/* 锦上添花：活跃时显示一个小小的 Badge 圆点 */}
                {isActive && (
                  <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </a>

              {/* 如果当前是 H2 且不是最后一个，加一条极淡的分隔线增加层次 */}
              {isH2 && index < demoHeadings.length - 1 && (
                <Separator className="mt-3 bg-muted/40" />
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
