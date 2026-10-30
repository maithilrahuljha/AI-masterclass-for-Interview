import { Link } from "react-router-dom";
import {
  AlarmClock, CircleCheck, CircleDashed, Code2, ListChecks, MessageCircleQuestion,
  RotateCcw, Sunrise, Timer,
} from "lucide-react";
import { TOPICS, TOTAL_MINUTES_LABEL } from "../data/topics";
import { QUESTIONS, CODING_QUESTIONS } from "../data/questions";
import { EXTRA_QUESTIONS } from "../data/bank";
import { EXTRA_QUESTIONS_2, TRAINER_EXTRAS } from "../data/bank2";
import { useApp } from "../state/AppContext";
import QuestionCard from "../components/QuestionCard";
import { TOPIC_ICONS } from "../components/icons";

const QUESTION_TOTAL =
  QUESTIONS.length + CODING_QUESTIONS.length +
  EXTRA_QUESTIONS.length + EXTRA_QUESTIONS_2.length + TRAINER_EXTRAS.length;

const SPRINT = [
  { when: "Day 1 · evening (≈2.5 h)", what: "Module 01 Foundations, then Module 02 Modern AI Engineering. Run all six Colab labs. Module 02 is the biggest and carries most of the real interview — do not rush it." },
  { when: "Day 2 · evening (≈1.5 h)", what: "Modules 03–05: ML in practice, data engineering, MLOps and governance. Then open the Q&A bank, filter to those modules, and answer every question out loud before revealing it." },
  { when: "Interview morning (≈1 h)", what: "Module 06 industry context, plus the two Python coding questions. Re-read the Telstra AI-driven compliance case study and the agentic assurance framework PDF so you can quote them by name." },
];

const DAY_OF = [
  "What is RAG? — answer in three sentences without notes.",
  "Your RAG project: documents → parse → chunk → embed → store → retrieve → generate → evaluate. Walk it in 60 seconds.",
  "Three numbers ready: your embedding model's dimensions, your chunk size, your top-k.",
  "Precision vs recall with a fraud example, numbers included.",
  "Agents vs traditional LLM apps, and why agents loop.",
  "One telecom fact: what AGR means, one duty TRAI imposes, and a citable case study (Telstra's AI-driven compliance programme).",
  "The two coding answers below, rewritten from memory.",
];

export default function Checklist() {
  const { done, doneCount, totalTopics, resetProgress } = useApp();
  const pct = Math.round((doneCount / totalTopics) * 100);

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Final step</p>
      <h1 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">Final checklist &amp; coding round</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
        Total delivery time of this lecture: <strong>{TOTAL_MINUTES_LABEL}</strong> (reading + labs + self-checks).
        Use this page the day before your interview to confirm nothing is left open.
      </p>

      {/* Module completion review */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
          <ListChecks className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          Module completion — {pct}%
        </h2>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {TOPICS.map((t) => {
            const Icon = TOPIC_ICONS[t.id];
            const isDone = !!done[t.id];
            return (
              <Link
                key={t.id}
                to={`/topic/${t.id}`}
                className={`flex items-center gap-3 rounded-xl border p-3.5 text-sm font-medium transition hover:-translate-y-0.5 ${
                  isDone
                    ? "border-emerald-300/70 bg-emerald-50/60 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/25 dark:text-emerald-200"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">{t.num} · {t.title}</span>
                {isDone
                  ? <CircleCheck className="h-4.5 w-4.5 shrink-0 text-emerald-500" aria-label="Complete" />
                  : <CircleDashed className="h-4.5 w-4.5 shrink-0 text-slate-300 dark:text-slate-600" aria-label="Not complete" />}
              </Link>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => { if (window.confirm("Reset all module progress?")) resetProgress(); }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-400 transition hover:text-rose-500"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset progress
        </button>
      </section>

      {/* 48-hour plan */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
          <Timer className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          The 48-hour sprint plan
        </h2>
        <ol className="mt-4 space-y-3">
          {SPRINT.map((s) => (
            <li key={s.when} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{s.when}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.what}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Coding round */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
          <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          Python coding round — both reported questions
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Interview panels often pair the theory questions with small Python tasks like these. Practise writing them on a blank editor, not by reading.
        </p>
        <div className="mt-5 space-y-4">
          {CODING_QUESTIONS.map((q, i) => (
            <QuestionCard key={q.ref} q={q} index={i} />
          ))}
        </div>
        <Link
          to="/questions"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-amber-500 hover:text-amber-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-amber-300"
        >
          <MessageCircleQuestion className="h-4 w-4" aria-hidden="true" />
          Open the full {QUESTION_TOTAL}-question bank with detailed answers
        </Link>
      </section>

      {/* Day-of checklist */}
      <section className="mt-12 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-6 dark:border-amber-500/25 dark:bg-amber-950/20">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
          <AlarmClock className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          60 minutes before you log in — can you…
        </h2>
        <ul className="mt-4 space-y-2.5">
          {DAY_OF.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <Sunrise className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-amber-200 pt-4 text-sm font-semibold text-slate-800 dark:border-amber-500/20 dark:text-slate-200">
          If every line above is a confident “yes” — you are ready. Good luck from the Placement Cell.
        </p>
      </section>
    </div>
  );
}
