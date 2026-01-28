


import { Sun, Moon, LayoutPanelLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  // Detect system theme
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Apply theme
  useEffect(() => {
    const appliedTheme = theme === "system" ? getSystemTheme() : theme;

    if (appliedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen to system theme changes (AUTO MODE)
  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      document.documentElement.classList.toggle(
        "dark",
        media.matches
      );
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  // Cycle theme
  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === "system") return "light";
      if (prev === "light") return "dark";
      return "system";
    });
  };

  return (
    <header className="border-b border-[color:var(--border-soft)] bg-[color:var(--paper-card)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <LayoutPanelLeft size={18} />
          <span className="font-semibold tracking-tight">
            Todo with Love
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            cursor-pointer
            p-2 rounded-md
            text-[color:var(--ink-muted)]
            hover:text-[color:var(--ink-main)]
            hover:bg-black/5 dark:hover:bg-white/5
            transition-all duration-300 ease-in-out
          "
          aria-label="Toggle theme"
          title={`Theme: ${theme}`}
        >
          <span className="inline-block transition-transform duration-300">
            {theme === "dark" && <Moon size={18} />}
            {theme === "light" && <Sun size={18} />}
            {theme === "system" && (
              <span className="text-xs font-semibold">AUTO</span>
            )}
          </span>
        </button>

      </div>
    </header>
  );
}
