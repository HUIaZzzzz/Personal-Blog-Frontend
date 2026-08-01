import { useEffect, useState, useCallback } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

/** 从 markdown 文本中提取所有标题 */
function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[\s]+/g, '-')
      .replace(/[^\w一-鿿-]/g, '')  // 保留中英文和连字符
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    headings.push({ id, text, level });
  }
  return headings;
}

interface Props {
  content: string;
}

export default function TableOfContents({ content }: Props) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>('');

  // 滚动监听：高亮当前可见的标题
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 取第一个进入视口的标题作为当前 active
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }, // 顶部偏移 80px，底部留 60% 确保最上面的标题优先
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // 点击平滑滚动
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="text-sm leading-relaxed">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        目录
      </h4>
      <ul className="space-y-1 border-l border-border">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 1) * 12}px` }}>
            <button
              onClick={() => scrollTo(h.id)}
              className={`block w-full py-1 text-left text-xs transition-colors hover:text-foreground border-l-2 -ml-px pl-3 ${
                activeId === h.id
                  ? 'border-primary text-foreground font-medium'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
