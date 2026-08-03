export interface TocItem {
    level: number;   // 1 ~ 6
    text: string;    // 纯文本标题
    id: string;      // 用于锚点跳转
}

export const extractToc = (markdown: string): TocItem[] => {
    const lines = markdown.split('\n');
    const headings: TocItem[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
        const trimmed = line.trim();
        // 忽略代码块
        if (trimmed.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        if (inCodeBlock) continue;

        // 匹配 ATX 标题
        const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
        if (!match) continue;

        const level = match[1].length;
        let text = match[2].trim();

        // 去除标题内的 Markdown 语法（粗体、斜体、链接、行内代码）
        text = text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/`(.*?)`/g, '$1');

        // 生成唯一 ID（与 rehype-slug 规则兼容）
        const id = text
            .toLowerCase()
            .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
            .replace(/^-+|-+$/g, '');

        headings.push({ level, text, id });
    }

    return headings;
};