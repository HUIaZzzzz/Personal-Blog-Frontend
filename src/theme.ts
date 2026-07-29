// src/store/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

// 使用 persist 中间件自动将状态同步到 localStorage
export const useTheme = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'light', // 默认值
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light',
                })),
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'theme-storage', // localStorage 的键名
        }
    )
);