'use client';

import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <div className="relative z-10 flex items-center gap-3">
      <button
        onClick={() => setTheme('dark')}
        className="border-b-2 border-b-background text-sm font-medium tracking-wider dark:border-b-foreground"
      >
        Dark
      </button>
      <button
        onClick={() => setTheme('light')}
        className="border-b-2 border-b-foreground text-sm font-medium tracking-wider dark:border-b-0 dark:border-b-background"
      >
        Light
      </button>
    </div>
  );
}
