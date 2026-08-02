/** 生成页码数组，中间超过 1 个间隔用 ellipsis 替换 */
function getPageNumbers(
    current: number,
    total: number,
): (number | "ellipsis")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];

    // 始终显示第一页
    pages.push(1);

    if (current > 3) {
        pages.push("ellipsis");
    }

    // 当前页附近的页码
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (current < total - 2) {
        pages.push("ellipsis");
    }

    // 始终显示最后一页（total > 1 时才加，避免重复）
    if (total > 1) {
        pages.push(total);
    }

    return pages;
}

export default getPageNumbers;