import { Link } from "react-router-dom";
import {
  ArrowRight, CircleCheck, Clock3, FlaskConical, GraduationCap,
  MessageCircleQuestion, MousePointerClick, NotebookPen, Target,
} from "lucide-react";
import { TOPICS } from "../data/topics";
import { QUESTIONS, CODING_QUESTIONS } from "../data/questions";
import { EXTRA_QUESTIONS } from "../data/bank";
import { EXTRA_QUESTIONS_2, TRAINER_EXTRAS } from "../data/bank2";

const QA_TOTAL =
  QUESTIONS.length + CODING_QUESTIONS.length +
  EXTRA_QUESTIONS.length + EXTRA_QUESTIONS_2.length + TRAINER_EXTRAS.length;
import { useApp } from "../state/AppContext";
import { TOPIC_ICONS } from "../components/icons";

const STATS = [
  { k: String(TOPICS.length), v: "topic modules" },
  { k: String(QA_TOTAL), v: "interview questions" },
  { k: String(TOPICS.reduce((n, t) => n + t.labs.length, 0)), v: "Colab CPU labs" },
  { k: "~4.5 h", v: "total focused time" },
];

export default function Home() {
  const { done } = useApp();
  return (
    <div className="mx-auto max-w-5xl">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12 dark:border-slate-800 dark:bg-slate-900/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl"
        />
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          B.Tech Placement Cell · Self-hosted lecture series
        </p>
        <h2 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Masterclass on <span className="text-indigo-600 dark:text-indigo-400">Artificial Intelligence</span>
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          A complete preparation track for Analyst and AI/ML Engineer interviews at any company. Eight focused modules are distilled from real job descriptions and the questions candidates were actually asked — RAG and vector databases, LLM mechanics, prompt engineering, AI agents, ML fundamentals, data engineering, MLOps &amp; AI governance, and the telecom industry context that wins the room. Every module ends in drills and a runnable CPU lab.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to={`/topic/${TOPICS[0].id}`}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-amber-300"
          >
            Start with Module 01 <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/questions"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-amber-500 hover:text-amber-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-amber-400 dark:hover:text-amber-300"
          >
            <MessageCircleQuestion className="h-4 w-4" aria-hidden="true" /> Jump to the {QA_TOTAL} interview questions
          </Link>
        </div>
        <dl className="mt-9 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-4 dark:border-slate-800">
          {STATS.map((s) => (
            <div key={s.v}>
              <dt className="sr-only">{s.v}</dt>
              <dd className="font-display text-3xl font-bold text-slate-900 dark:text-white">{s.k}</dd>
              <dd className="mt-0.5 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How to use */}
      <section className="mt-12">
        <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">How to use this in one evening</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { icon: NotebookPen, t: "1 · Read the module", d: "Each concept is written in plain English with a diagram and a telecom or audit example. Skim first, then re-read slowly." },
            { icon: FlaskConical, t: "2 · Run the Colab lab", d: "Copy the code into a free Google Colab CPU notebook and run every cell. Seeing the output yourself is what makes it stick." },
            { icon: MessageCircleQuestion, t: "3 · Drill the questions", d: "Open each real interview question, read the model answer, hide it, and answer out loud. Then mark the module complete." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <s.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{s.t}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Q&A bank callout */}
      <section className="mt-12">
        <Link
          to="/questions"
          className="group flex flex-wrap items-center gap-5 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-amber-500/25 dark:bg-amber-950/20"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/25 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300" aria-hidden="true">
            <MessageCircleQuestion className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-bold text-slate-900 dark:text-white">
              The full interview question bank →
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {QA_TOTAL} questions with answers hidden until you click — {QUESTIONS.length + CODING_QUESTIONS.length} open into a full in-depth
              walk-through (explanation, glossary, spoken script) and {QA_TOTAL - QUESTIONS.length - CODING_QUESTIONS.length} carry crisp cited model
              answers from the combined question bank. Filter by section, difficulty and search.
            </span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-amber-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </section>

      {/* Module cards */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">The {TOPICS.length} modules</h3>
          <p className="hidden text-xs font-medium text-slate-500 sm:block dark:text-slate-400">Tap a card to open · progress saves automatically</p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {TOPICS.map((t) => {
            const Icon = TOPIC_ICONS[t.id];
            const qCount = QUESTIONS.filter((q) => q.topicId === t.id).length;
            const isDone = !!done[t.id];
            return (
              <Link
                key={t.id}
                to={`/topic/${t.id}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-indigo-500/60"
              >
                {isDone && <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500" aria-hidden="true" />}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition group-hover:bg-indigo-600 dark:bg-slate-800 dark:text-slate-100 dark:group-hover:bg-indigo-500" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Module {t.num}</p>
                    <h4 className="mt-0.5 text-base font-bold leading-snug text-slate-900 dark:text-white">{t.title}</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.tagline}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" aria-hidden="true" />{t.time}</span>
                      <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400"><MessageCircleQuestion className="h-3 w-3" aria-hidden="true" />{qCount} questions</span>
                      {isDone && <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><CircleCheck className="h-3 w-3" aria-hidden="true" />Done</span>}
                    </div>
                  </div>
                  <MousePointerClick className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-indigo-500 dark:text-slate-600" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Outcomes */}
      <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 text-amber-400">
          <Target className="h-5 w-5" aria-hidden="true" />
          <h3 className="font-display text-2xl font-bold text-white">When you finish, you can…</h3>
        </div>
        <ul className="mt-5 grid gap-3 text-sm leading-relaxed sm:grid-cols-2">
          {[
            "Explain a full RAG architecture and defend every choice — chunking, embedding model and its dimensionality, vector DB, retrieval fixes, evaluation.",
            "Control any LLM: tokens, temperature, context windows — and explain hallucinations in one breath.",
            "Write prompts that produce structured output, resist injection, and survive a model upgrade.",
            "Describe how AI agents loop, when LangGraph beats LangChain, and what guardrails a responsible engineer demands.",
            "Answer the classic ML screen — precision, recall, F1, imbalance, overfitting — in under a minute each.",
            "Speak telecom: AGR, TRAI, DoT, revenue assurance — and quote real published industry case studies, like Telstra's AI-driven compliance programme, by name.",
          ].map((s) => (
            <li key={s} className="flex items-start gap-2.5">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
