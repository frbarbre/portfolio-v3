"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={() => setTheme("dark")}
        className="font-medium text-sm tracking-wider border-b-2 border-b-background dark:border-b-foreground"
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("light")}
        className="font-medium text-sm tracking-wider border-b-2 dark:border-b-0 border-b-foreground dark:border-b-background"
      >
        Light
      </button>
    </div>
  );
}
