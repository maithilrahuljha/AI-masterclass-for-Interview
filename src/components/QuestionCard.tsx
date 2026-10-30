import { useEffect, useState, type ReactNode } from "react";
import { ExternalLink, MessageCircleQuestion, ChevronDown } from "lucide-react";
import type { InterviewQuestion } from "../data/questions";
import CodeBlock from "./CodeBlock";

interface Props {
  q: InterviewQuestion;
  index: number;
  flash?: boolean;
  children?: ReactNode;
}

export default function QuestionCard({ q, index, flash = false }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (flash) setOpen(true);
  }, [flash]);

  return (
    <article
      id={`q-${q.ref}`}
      className={`scroll-mt-32 rounded-xl border border-amber-200/80 bg-amber-50/80 shadow-sm transition dark:border-amber-500/25 dark:bg-amber-950/20 ${
        flash ? "flash-q" : ""
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-400/25 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300"
            aria-hidden="true"
          >
            <MessageCircleQuestion className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700/80 dark:text-amber-400/80">
              Asked in real interviews · Q{index + 1}
            </p>
            <h4 className="mt-1 text-[15px] font-semibold leading-snug text-slate-900 dark:text-slate-100">
              {q.q}
            </h4>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={`answer-${q.ref}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-amber-300"
          >
            {open ? "Hide model answer" : "Show model answer"}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
          <a
            href={q.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-amber-500 hover:text-amber-800 dark:border-amber-500/30 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-amber-400 dark:hover:text-amber-300"
          >
            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="truncate">Source: {q.sourceLabel}</span>
          </a>
        </div>

        {open && (
          <div
            id={`answer-${q.ref}`}
            className="mt-4 rounded-lg border border-amber-200/70 bg-white/80 p-4 dark:border-amber-500/20 dark:bg-slate-950/50"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Model answer · say it in your own words
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{q.a}</p>
            {q.code && (
              <div className="mt-3">
                <CodeBlock code={q.code} compact />
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
