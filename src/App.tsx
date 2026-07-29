import { Switch } from "@/components/ui/switch.tsx";
import { useTheme } from "@/theme.ts";
import {useEffect} from "react";

function App() {
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // localStorage 的持久化已由 persist 中间件自动处理，无需手动写
  }, [theme]);
  return (
    // 1. 基础 (<576px): p-4；2. xs (≥576px): p-6；3. desktop (≥1440px): p-8
    <div className="min-h-screen bg-background p-4 text-foreground xs:p-6 desktop:p-8">
      <div className="grid min-h-[calc(100vh-2rem)] grid-cols-1 gap-4 xs:gap-6 lg:grid-cols-[240px_1fr] desktop:grid-cols-[280px_1fr] desktop:gap-8">
        {/* ===== 导航栏：始终横跨所有列 ===== */}
        <header className="flex h-16 items-center justify-between px-4 xs:px-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20"></div>
            <span className="text-base font-bold xs:text-lg">MyApp</span>
          </div>
          <nav className="flex gap-3 text-xs text-muted-foreground xs:gap-4 xs:text-sm">
            <Switch
            checked={theme === 'dark'}
            onCheckedChange={() => toggleTheme()}
            aria-label="切换主题"
            />
            <span>首页</span>
            <span className="hidden sm:inline">博客</span>
            <span className="hidden sm:inline">项目</span>
            <span className="hidden sm:inline">关于</span>
          </nav>
        </header>

        {/* ===== 侧边栏：移动端隐藏，≥1024px 显示 ===== */}
        <aside className="hidden rounded-lg border border-border bg-card p-4 lg:block">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            导航菜单
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="rounded-md bg-primary/10 px-3 py-2 font-medium text-primary">
              仪表盘
            </li>
            <li className="rounded-md px-3 py-2 text-muted-foreground hover:bg-muted">
              用户管理
            </li>
            <li className="rounded-md px-3 py-2 text-muted-foreground hover:bg-muted">
              内容设置
            </li>
          </ul>
          {/* 桌面大屏额外提示 */}
          <div className="mt-6 hidden rounded-md bg-muted/50 p-2 text-center text-xs text-muted-foreground desktop:block">
            1440px+ 大屏模式
          </div>
        </aside>

        {/* ===== 主内容区 ===== */}
        <main className="rounded-lg border border-border bg-card p-4 shadow-sm xs:p-6 desktop:p-8">
          <h1 className="mb-2 scroll-m-20 text-xl font-extrabold tracking-tight xs:text-2xl lg:text-3xl">
            自定义断点生效！
          </h1>
          <p className="text-sm text-muted-foreground xs:text-base">
            当前断点配置：
            <br />
            <span className="font-mono text-xs">
              xs: 576px &nbsp;|&nbsp; lg: 1024px &nbsp;|&nbsp; desktop: 1440px
            </span>
          </p>

          {/* 测试卡片 */}
          <div className="mt-6 grid grid-cols-1 gap-3 xs:grid-cols-2 desktop:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-md bg-muted/50 p-4 text-center xs:text-left"
              >
                <p className="text-sm font-medium">卡片 {i}</p>
                <p className="text-xs text-muted-foreground">数据概览</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
