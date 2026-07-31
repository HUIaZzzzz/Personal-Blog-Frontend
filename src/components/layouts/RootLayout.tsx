import { Outlet, NavLink } from 'react-router-dom';
import { Switch } from '@/components/ui/switch.tsx';
import { useTheme } from '@/theme.ts';
import { useEffect } from 'react';
import { ButtonGroupInput } from '@/components/SeacchInput.tsx';

function RootLayout() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground transition-colors';

  return (
    <div className="min-h-screen bg-background p-4 text-foreground xs:p-6 desktop:p-8">
      <div className="grid min-h-[calc(100vh-2rem)] grid-cols-1 gap-4 xs:gap-6 lg:grid-cols-[240px_1fr] desktop:grid-cols-[280px_1fr] desktop:gap-8">
        {/* ===== 导航栏 ===== */}
        <header className="flex h-16 items-center justify-between px-4 xs:px-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold xs:text-lg">辉的个人博客</span>
          </div>
          <ButtonGroupInput />
          <nav className="flex items-center gap-3 text-xs xs:gap-4 xs:text-sm">
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={() => toggleTheme()}
              aria-label="切换主题"
            />
            <NavLink to="/" end className={linkClass}>首页</NavLink>
            <NavLink to="/blog" className={linkClass}>博客</NavLink>
            <NavLink to="/projects" className={linkClass}>项目</NavLink>
            <NavLink to="/about" className={linkClass}>关于</NavLink>
          </nav>
        </header>

        {/* ===== 子路由内容 ===== */}
        <main className="lg:col-span-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
