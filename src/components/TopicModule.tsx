import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BookOpenCheck, Building2, CircleCheck, Clock3, ExternalLink,
  FlaskConical, ChevronDown, Landmark, ListChecks,
} from "lucide-react";
import { TOPICS } from "../data/topics";
import { QUESTIONS } from "../data/questions";
import { useApp } from "../state/AppContext";
import CodeBlock from "./CodeBlock";
import QuestionCard from "./QuestionCard";
import ConceptArt from "./ConceptArt";
import { TOPIC_ICONS } from "./icons";

function SectionTitle({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300" aria-hidden="true">
        <Icon className="h-4.5 w-4.5" />
      </span>
      {children}
    </h3>
  );
}

function SelfCheckItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-700/70 dark:bg-slate-900/60">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-slate-800 dark:text-slate-200"
      >
        {q}
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <p className="border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
          <span className="mr-1.5 font-semibold text-emerald-600 dark:text-emerald-400">Answer:</span>
          {a}
        </p>
      )}
    </div>
  );
}

export default function TopicModule() {
  const { id } = useParams();
  const topic = TOPICS.find((t) => t.id === id);
  const { done, toggleDone } = useApp();
  const location = useLocation();
  const [flashRef, setFlashRef] = useState<number | null>(null);

  const questions = useMemo(() => QUESTIONS.filter((q) => q.topicId === topic?.id), [topic?.id]);
  const idx = TOPICS.findIndex((t) => t.id === id);
  const prev = idx > 0 ? TOPICS[idx - 1] : null;
  const next = idx >= 0 && idx < TOPICS.length - 1 ? TOPICS[idx + 1] : null;

  useEffect(() => {
    if (location.hash.startsWith("#q-")) {
      const ref = Number(location.hash.replace("#q-", ""));
      setFlashRef(ref);
      const el = document.getElementById(`q-${ref}`);
      window.setTimeout(() => el?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
    } else {
      setFlashRef(null);
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.hash]);

  if (!topic) {
    return <Navigate to="/" replace />;
  }
  const Icon = TOPIC_ICONS[topic.id];
  const complete = !!done[topic.id];

  return (
    <div className="mx-auto max-w-4xl">
      {/* 1 — Header */}
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          Module {topic.num} of 08
        </p>
        <div className="mt-2 flex flex-wrap items-start gap-4">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900 sm:flex" aria-hidden="true">
            <Icon className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl">
              {topic.title}
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{topic.tagline}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600/10 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> {topic.time}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {topic.concepts.length} core concepts
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:bg-amber-400/10 dark:text-amber-300">
            {questions.length} real interview questions
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            1 Colab lab · CPU
          </span>
          {complete && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <CircleCheck className="h-3.5 w-3.5" aria-hidden="true" /> Completed
            </span>
          )}
        </div>
        <p className="mt-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{topic.overview}</p>
      </header>

      {/* 2 — Why this matters */}
      <div className="mt-7 rounded-r-xl border-l-4 border-blue-500 bg-blue-50/80 p-5 dark:bg-blue-950/30">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          <Building2 className="h-4 w-4" aria-hidden="true" /> Why this matters in interviews
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{topic.why}</p>
      </div>

      {/* 3 — Core concepts */}
      <section className="mt-12" aria-labelledby="concepts">
        <SectionTitle icon={BookOpenCheck}>Core concepts</SectionTitle>
        <div className="mt-6 space-y-6">
          {topic.concepts.map((c, i) => (
            <article
              key={c.title}
              className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900/50"
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Concept {i + 1} of {topic.concepts.length}
              </p>
              <h4 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{c.title}</h4>
              <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_340px]">
                <div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.explanation}</p>
                  <div className="mt-4 rounded-lg border border-emerald-200/60 bg-emerald-50/60 p-3.5 dark:border-emerald-500/20 dark:bg-emerald-950/25">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      <Landmark className="h-3.5 w-3.5" aria-hidden="true" /> Example from Telecom industry
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{c.example}</p>
                  </div>
                </div>
                <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
                  <ConceptArt topicId={topic.id} conceptIndex={i} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4 — Interview questions */}
      <section className="mt-12" aria-labelledby="questions">
        <SectionTitle icon={ListChecks}>Interview questions for this topic</SectionTitle>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Every question below was reported by real candidates in actual Analyst and AI/ML Engineer interview loops. Read the model answer, close it, then say it out loud in your own words.
        </p>
        <div className="mt-5 space-y-4">
          {questions.map((q, i) => (
            <QuestionCard key={q.ref} q={q} index={i} flash={flashRef === q.ref} />
          ))}
        </div>
      </section>

      {/* 5 — Hands-on labs */}
      <section className="mt-12" aria-labelledby="lab">
        <SectionTitle icon={FlaskConical}>
          Hands-on practice (Colab CPU)
        </SectionTitle>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {topic.labs.length > 1
            ? `${topic.labs.length} runnable labs. Each one pastes straight into a free Google Colab CPU notebook.`
            : "Paste this straight into a free Google Colab CPU notebook."}
        </p>
        <div className="mt-5 space-y-7">
          {topic.labs.map((lab, i) => (
            <div key={lab.title}>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {topic.labs.length > 1 && (
                  <span className="mr-2 font-mono text-xs text-indigo-600 dark:text-indigo-400">{i + 1}/{topic.labs.length}</span>
                )}
                {lab.title}
              </h4>
              <p className="mb-3 mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{lab.intro}</p>
              <CodeBlock code={lab.code} sampleOutput={lab.sampleOutput} />
            </div>
          ))}
        </div>
      </section>

      {/* 6 — Resources */}
      <section className="mt-12" aria-labelledby="resources">
        <SectionTitle icon={BookOpenCheck}>Real sources to read</SectionTitle>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {topic.resources.map((r) => (
            <a
              key={r.url + r.label}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-indigo-500"
            >
              <span className="flex items-start justify-between gap-2 text-sm font-semibold text-slate-800 group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-300">
                {r.label}
                <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-indigo-500" aria-hidden="true" />
              </span>
              {r.note && <span className="mt-1.5 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{r.note}</span>}
            </a>
          ))}
        </div>
      </section>

      {/* 7 — Self check */}
      <section className="mt-12" aria-labelledby="selfcheck">
        <SectionTitle icon={ListChecks}>Quick self-check</SectionTitle>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Answer out loud before you open each card.</p>
        <div className="mt-4 space-y-2.5">
          {topic.selfCheck.map((s) => (
            <SelfCheckItem key={s.q} q={s.q} a={s.a} />
          ))}
        </div>
      </section>

      {/* 8 — Completion + nav */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <button
          type="button"
          onClick={() => toggleDone(topic.id)}
          aria-pressed={complete}
          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
            complete
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-slate-900 text-white hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-amber-300"
          }`}
        >
          <CircleCheck className="h-5 w-5" aria-hidden="true" />
          {complete ? "Completed — tap to undo" : "Mark topic as complete"}
        </button>
        <div className="mt-6 flex items-center justify-between gap-4">
          {prev ? (
            <Link to={`/topic/${prev.id}`} className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              <span className="hidden sm:inline">{prev.title}</span><span className="sm:hidden">Previous</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/topic/${next.id}`} className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300">
              <span className="hidden sm:inline">{next.title}</span><span className="sm:hidden">Next</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ) : (
            <Link to="/checklist" className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400">
              Finish: final checklist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
