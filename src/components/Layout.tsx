import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap, Home, ListChecks, Menu, MessageCircleQuestion, Moon, Search, Sun, X, CircleCheck,
} from "lucide-react";
import { TOPICS } from "../data/topics";
import { QUESTIONS, CODING_QUESTIONS } from "../data/questions";
import { EXTRA_QUESTIONS } from "../data/bank";
import { EXTRA_QUESTIONS_2, TRAINER_EXTRAS } from "../data/bank2";

const QA_TOTAL =
  QUESTIONS.length + CODING_QUESTIONS.length +
  EXTRA_QUESTIONS.length + EXTRA_QUESTIONS_2.length + TRAINER_EXTRAS.length;
import { useApp } from "../state/AppContext";
import { TOPIC_ICONS } from "./icons";

function useSearch(query: string) {
  return useMemo(() => {
    const s = query.trim().toLowerCase();
    if (s.length < 2) return { topics: [], questions: [] };
    const topics = TOPICS.filter(
      (t) => t.title.toLowerCase().includes(s) || t.tagline.toLowerCase().includes(s) ||
        t.concepts.some((c) => c.title.toLowerCase().includes(s) || c.explanation.toLowerCase().includes(s))
    ).slice(0, 4);
    const questions = [...QUESTIONS, ...CODING_QUESTIONS]
      .filter((q) => q.q.toLowerCase().includes(s))
      .slice(0, 8);
    return { topics, questions };
  }, [query]);
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { done } = useApp();
  const base =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition focus-visible:outline-none";
  const idle = "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white";
  const active = "bg-indigo-600/10 text-indigo-700 font-semibold dark:bg-indigo-500/15 dark:text-indigo-300";

  return (
    <nav aria-label="Course modules" className="space-y-1">
      <NavLink to="/" end onClick={onNavigate} className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
        <Home className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Home &amp; how to use</span>
      </NavLink>
      {TOPICS.map((t) => {
        const Icon = TOPIC_ICONS[t.id];
        return (
          <NavLink
            key={t.id}
            to={`/topic/${t.id}`}
            onClick={onNavigate}
            className={({ isActive }) => `${base} ${isActive ? active : idle}`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">
              <span className="mr-1.5 font-mono text-[11px] opacity-60">{t.num}</span>
              {t.title}
            </span>
            {done[t.id] && (
              <CircleCheck className="h-4 w-4 shrink-0 text-emerald-500" aria-label="Completed" />
            )}
          </NavLink>
        );
      })}
      <NavLink to="/questions" onClick={onNavigate} className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
        <MessageCircleQuestion className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate">Interview Q&amp;A bank</span>
        <span className="shrink-0 rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">{QA_TOTAL}</span>
      </NavLink>
      <NavLink to="/checklist" onClick={onNavigate} className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
        <ListChecks className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Final checklist</span>
      </NavLink>
    </nav>
  );
}

export default function Layout() {
  const { theme, toggleTheme, doneCount, totalTopics } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const results = useSearch(query);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const pct = Math.round((doneCount / totalTopics) * 100);

  useEffect(() => { setMenuOpen(false); setQuery(""); }, [location.pathname]);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") { setQuery(""); setMenuOpen(false); } }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hasResults = results.topics.length > 0 || results.questions.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Sticky header + progress */}
      <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
        <header className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>

          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900" aria-hidden="true">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold tracking-tight">Masterclass on AI</span>
              <span className="block truncate text-[11px] font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Analyst &amp; AI/ML interview prep</span>
            </span>
          </Link>

          {/* Search */}
          <div ref={searchRef} className="relative mx-auto hidden w-full max-w-md md:block">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/70 px-4 py-2 transition focus-within:border-indigo-400 focus-within:bg-white dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-indigo-500">
              <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => window.setTimeout(() => setSearchFocus(false), 150)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (results.topics[0] || results.questions[0])) {
                    const t = results.topics[0];
                    const q = results.questions[0];
                    navigate(t ? `/topic/${t.id}` : `/topic/${q.topicId}#q-${q.ref}`);
                    setQuery("");
                  }
                }}
                placeholder="Search modules or interview questions…"
                aria-label="Search modules and interview questions"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
            {searchFocus && hasResults && (
              <div className="absolute left-0 right-0 top-11 max-h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                {results.topics.length > 0 && (
                  <>
                    <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Modules</p>
                    {results.topics.map((t) => (
                      <button key={t.id} type="button" onMouseDown={(e) => e.preventDefault()}
                        onClick={() => { navigate(`/topic/${t.id}`); setQuery(""); }}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                        <span className="mr-1.5 font-mono text-[11px] text-slate-400">{t.num}</span>
                        {t.title}
                      </button>
                    ))}
                  </>
                )}
                {results.questions.length > 0 && (
                  <>
                    <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Interview questions</p>
                    {results.questions.map((q) => {
                      const t = TOPICS.find((x) => x.id === q.topicId);
                      return (
                        <button key={q.ref} type="button" onMouseDown={(e) => e.preventDefault()}
                          onClick={() => { navigate(q.topicId === "coding" ? `/questions#qa-${q.ref}` : `/topic/${q.topicId}#q-${q.ref}`); setQuery(""); }}
                          className="block w-full rounded-lg px-3 py-2 text-left hover:bg-amber-50 dark:hover:bg-amber-950/30">
                          <span className="block truncate text-sm">{q.q}</span>
                          <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400">{t?.title ?? "Python coding"}</span>
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <span className="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:flex">
              {doneCount}/{totalTopics} done · {pct}%
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </header>
        {/* Always-visible progress bar */}
        <div className="h-1 w-full bg-slate-200 dark:bg-slate-800" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Course completion">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-400 transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Mobile search row */}
      <div className="border-b border-slate-200/80 bg-white/60 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60 md:hidden">
        <div className="relative">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/70 px-4 py-2 dark:border-slate-700 dark:bg-slate-900">
            <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => window.setTimeout(() => setSearchFocus(false), 150)}
              placeholder="Search modules or questions…"
              aria-label="Search modules and interview questions"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          {searchFocus && hasResults && (
            <div className="absolute left-0 right-0 top-12 z-30 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
              {results.topics.map((t) => (
                <button key={t.id} type="button" onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { navigate(`/topic/${t.id}`); setQuery(""); }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                  {t.num} · {t.title}
                </button>
              ))}
              {results.questions.map((q) => (
                <button key={q.ref} type="button" onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { navigate(`/topic/${q.topicId}#q-${q.ref}`); setQuery(""); }}
                  className="block w-full rounded-lg px-3 py-2 text-left hover:bg-amber-50 dark:hover:bg-amber-950/30">
                  <span className="block truncate text-sm">{q.q}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-[68px] hidden h-[calc(100vh-68px)] w-72 shrink-0 overflow-y-auto border-r border-slate-200/80 px-4 py-6 thin-scroll dark:border-slate-800 lg:block">
          <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {TOPICS.length} modules · {QA_TOTAL} interview questions · ~4.5 h
          </p>
          <NavItems />
        </aside>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div className="absolute inset-0 bg-slate-950/40" onClick={() => setMenuOpen(false)} aria-hidden="true" />
            <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white p-4 pt-6 shadow-2xl dark:bg-slate-900">
              <NavItems onNavigate={() => setMenuOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
          <Outlet />
          <footer className="mt-16 border-t border-slate-200 pt-6 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
            <p>B.Tech Placement Cell · Masterclass on Artificial Intelligence — preparation for Analyst and AI/ML Engineer interviews. All questions were gathered from public candidate interview reports; source links open in a new tab. Progress is stored only in your browser.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
