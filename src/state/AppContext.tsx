import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { TOPICS } from "../data/topics";

interface AppState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  done: Record<string, boolean>;
  toggleDone: (id: string) => void;
  doneCount: number;
  totalTopics: number;
  resetProgress: () => void;
}

const Ctx = createContext<AppState | null>(null);
const THEME_KEY = "grcs.theme";
const DONE_KEY = "grcs.done.v1";
const TOTAL = TOPICS.length;

function loadDone(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(DONE_KEY);
    if (!raw) return {};
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? Object.fromEntries(arr.map((k: string) => [k, true])) : {};
  } catch {
    return {};
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const t = localStorage.getItem(THEME_KEY);
      if (t === "dark" || t === "light") return t;
    } catch { /* ignore */ }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [done, setDone] = useState<Record<string, boolean>>(loadDone);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(DONE_KEY, JSON.stringify(Object.keys(done).filter((k) => done[k])));
    } catch { /* ignore */ }
  }, [done]);

  const value = useMemo<AppState>(() => ({
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    done,
    toggleDone: (id) => setDone((d) => ({ ...d, [id]: !d[id] })),
    doneCount: Object.values(done).filter(Boolean).length,
    totalTopics: TOTAL,
    resetProgress: () => setDone({}),
  }), [theme, done]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}
