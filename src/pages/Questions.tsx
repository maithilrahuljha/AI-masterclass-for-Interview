import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, ChevronDown, ExternalLink, Filter, Layers, Lightbulb,
  MessageCircleQuestion, Mic, Search, Swords, X,
} from "lucide-react";
import { QUESTIONS, CODING_QUESTIONS, type InterviewQuestion, type Difficulty } from "../data/questions";
import { DETAILED } from "../data/detailedAnswers";
import { CITATIONS, BANK_COVERED, EXTRA_QUESTIONS } from "../data/bank";
import { EXTRA_QUESTIONS_2, TRAINER_EXTRAS, MOCK_ROUNDS } from "../data/bank2";
import { TOPICS } from "../data/topics";
import CodeBlock from "../components/CodeBlock";

const ALL: InterviewQuestion[] = [
  ...QUESTIONS,
  ...CODING_QUESTIONS,
  ...EXTRA_QUESTIONS,
  ...EXTRA_QUESTIONS_2,
  ...TRAINER_EXTRAS,
];

const SECTIONS = [
  "All sections",
  "Foundations & AI basics",
  "RAG & Vector Databases",
  "Large Language Models",
  "Prompt Engineering",
  "AI Agents",
  "ML & DL Fundamentals",
  "Data Engineering",
  "MLOps & AI Governance",
  "Scenario & System Design",
  "Python Coding",
];

const DIFF_META: Record<Difficulty, { label: string; cls: string }> = {
  B: { label: "Basic", cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  I: { label: "Intermediate", cls: "bg-amber-400/20 text-amber-800 dark:text-amber-300" },
  A: { label: "Advanced", cls: "bg-rose-500/15 text-rose-700 dark:text-rose-300" },
};

// bank number → anchor ref (covered bank questions point at the core card)
const NUM_TO_REF: Record<string, number> = { ...BANK_COVERED };
for (const q of ALL) {
  const bn = (q as InterviewQuestion & { bankNum?: string }).bankNum;
  if (bn) NUM_TO_REF[bn] = q.ref;
  for (const b of q.bank ?? []) NUM_TO_REF[b] = q.ref;
}

function moduleLabel(id: string) {
  if (id === "coding") return "Python coding round";
  const t = TOPICS.find((x) => x.id === id);
  return t ? `Module ${t.num}` : id;
}

function QARow({ q, n }: { q: InterviewQuestion; n: number }) {
  const [open, setOpen] = useState(false);
  const d = DETAILED[q.ref];
  const ext = q as InterviewQuestion & { bankNum?: string; cites?: string[] };

  return (
    <article
      id={`qa-${q.ref}`}
      className="scroll-mt-40 overflow-hidden rounded-2xl border border-amber-200/80 bg-amber-50/70 shadow-sm dark:border-amber-500/25 dark:bg-amber-950/20"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`qa-body-${q.ref}`}
        className="flex w-full items-start gap-3 p-5 text-left"
      >
        <span
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/25 text-[11px] font-bold text-amber-800 dark:bg-amber-400/15 dark:text-amber-300"
          aria-hidden="true"
        >
          {n}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {q.diff && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${DIFF_META[q.diff].cls}`}>
                {DIFF_META[q.diff].label}
              </span>
            )}
            {q.section && (
              <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-white/10 dark:text-slate-400">
                {q.section}
              </span>
            )}
            {ext.bankNum && (
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                {ext.bankNum}
              </span>
            )}
            {d && (
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                In-depth
              </span>
            )}
          </span>
          <span className="mt-1.5 block text-[15px] font-semibold leading-snug text-slate-900 dark:text-slate-100">
            {q.q}
          </span>
          {!open && (
            <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" /> Click to reveal the answer
            </span>
          )}
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={`qa-body-${q.ref}`} className="border-t border-amber-200/70 bg-white/80 p-5 dark:border-amber-500/20 dark:bg-slate-950/50">
          <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50/70 p-4 dark:bg-emerald-950/25">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {d ? "The short answer" : "Model answer"}
            </p>
            <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
              {d ? d.simple : q.a}
            </p>
          </div>

          {d && (
            <>
              <div className="mt-5 space-y-4">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> Full explanation
                </p>
                {d.sections.map((s) => (
                  <div key={s.h}>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.h}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.p}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/60">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Connected terms you should know
                </p>
                <dl className="mt-2.5 space-y-2">
                  {d.terms.map((t) => (
                    <div key={t.t} className="text-sm leading-relaxed">
                      <dt className="inline font-semibold text-indigo-700 dark:text-indigo-300">{t.t}: </dt>
                      <dd className="inline text-slate-600 dark:text-slate-300">{t.d}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-4 rounded-xl border-l-4 border-indigo-500 bg-indigo-50/70 p-4 dark:bg-indigo-950/30">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  <Mic className="h-3.5 w-3.5" aria-hidden="true" /> Say it like this (~30 seconds)
                </p>
                <p className="mt-1.5 text-sm italic leading-relaxed text-slate-700 dark:text-slate-300">“{d.sayIt}”</p>
              </div>
            </>
          )}

          {q.code && (
            <div className="mt-4">
              <CodeBlock code={q.code} compact />
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {ext.cites ? (
              ext.cites.map((c) => (
                <a
                  key={c}
                  href="#sources"
                  className="rounded-full border border-slate-300 bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-slate-600 transition hover:border-indigo-400 hover:text-indigo-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300"
                  title={CITATIONS.find((x) => x.id === c)?.label}
                >
                  {c}
                </a>
              ))
            ) : (
              <a
                href={q.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-amber-300/70 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-amber-500 hover:text-amber-800 dark:border-amber-500/30 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:text-amber-300"
              >
                <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate">Source: {q.sourceLabel}</span>
              </a>
            )}
            {q.topicId !== "coding" && (
              <Link
                to={`/topic/${q.topicId}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-indigo-400 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-indigo-300"
              >
                <BookOpen className="h-3 w-3" aria-hidden="true" /> {moduleLabel(q.topicId)}
              </Link>
            )}
            {q.bank && q.bank.length > 0 && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                also listed as bank {q.bank.join(", ")}
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function Questions() {
  const [section, setSection] = useState("All sections");
  const [diff, setDiff] = useState<Difficulty | null>(null);
  const [deepOnly, setDeepOnly] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase();
    return ALL.filter((q) => {
      if (section !== "All sections" && q.section !== section) return false;
      if (diff && q.diff !== diff) return false;
      if (deepOnly && !DETAILED[q.ref]) return false;
      if (!s) return true;
      const d = DETAILED[q.ref];
      const hay = [
        q.q, q.a, q.section ?? "",
        d?.simple ?? "", d?.sayIt ?? "",
        ...(d?.sections.map((x) => x.h + " " + x.p) ?? []),
        ...(d?.terms.map((x) => x.t + " " + x.d) ?? []),
      ].join(" ").toLowerCase();
      return hay.includes(s);
    });
  }, [section, diff, deepOnly, query]);

  const bySection = useMemo(() => {
    const m = new Map<string, InterviewQuestion[]>();
    for (const q of filtered) {
      const k = q.section ?? "General";
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(q);
    }
    const order = SECTIONS.filter((x) => x !== "All sections");
    return [...m.entries()].sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
  }, [filtered]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { "All sections": ALL.length };
    for (const q of ALL) m[q.section ?? "General"] = (m[q.section ?? "General"] ?? 0) + 1;
    return m;
  }, []);

  const indepthCount = useMemo(() => ALL.filter((q) => DETAILED[q.ref]).length, []);

  let flatIndex = 0;

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          Question bank
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          Interview questions &amp; answers
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>{ALL.length} questions</strong> across ten sections — {indepthCount} with full in-depth
          walk-throughs, the rest with crisp model answers from the combined &amp; cited bank. Every answer is
          hidden until you click. Difficulty: <strong>B</strong> basic · <strong>I</strong> intermediate ·{" "}
          <strong>A</strong> advanced. Duplicates across sources are merged, never repeated.
        </p>
      </header>

      {/* Controls */}
      <div className="sticky top-[68px] z-20 -mx-4 mt-8 bg-slate-50/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 dark:bg-slate-950/95">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900">
          <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, explanations and terms…"
            aria-label="Search the question bank"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="rounded-full p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Filter className="mr-0.5 h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          {SECTIONS.map((s2) => (
            <button
              key={s2}
              type="button"
              onClick={() => setSection(s2)}
              aria-pressed={section === s2}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                section === s2
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-indigo-300"
              }`}
            >
              {s2}
              <span className="ml-1.5 opacity-60">{counts[s2] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {(["B", "I", "A"] as Difficulty[]).map((dLevel) => (
            <button
              key={dLevel}
              type="button"
              onClick={() => setDiff(diff === dLevel ? null : dLevel)}
              aria-pressed={diff === dLevel}
              className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                diff === dLevel ? "bg-indigo-600 text-white" : `${DIFF_META[dLevel].cls} hover:opacity-80`
              }`}
            >
              {dLevel} · {DIFF_META[dLevel].label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setDeepOnly((v) => !v)}
            aria-pressed={deepOnly}
            className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
              deepOnly ? "bg-indigo-600 text-white" : "bg-emerald-500/15 text-emerald-700 hover:opacity-80 dark:text-emerald-300"
            }`}
          >
            In-depth only ({indepthCount})
          </button>
        </div>
      </div>

      {/* Grouped list */}
      <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        Showing {filtered.length} of {ALL.length} questions
      </p>
      {bySection.map(([sec, qs]) => (
        <section key={sec} className="mt-8">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            {sec}
            <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {qs.length}
            </span>
          </h2>
          <div className="mt-4 space-y-3.5">
            {qs.map((q) => {
              flatIndex += 1;
              return <QARow key={q.ref} q={q} n={flatIndex} />;
            })}
          </div>
        </section>
      ))}
      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
          <MessageCircleQuestion className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            No questions match “{query}”. Try a shorter keyword like “RAG”, “drift” or “recall”.
          </p>
        </div>
      )}

      {/* Mock rounds */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
          <Swords className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          Mock interview rounds (trainer mode)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Trainer reads the question aloud; the student answers in 60–90 seconds, then compares against the model
          answer. For advanced questions, always ask one follow-up (“why?”, “what if the data changes?”).
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {MOCK_ROUNDS.map((r) => (
            <div key={r.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{r.title}</h3>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300">{r.duration}</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{r.note}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.nums.map((num) => {
                  const ref = NUM_TO_REF[num];
                  const go = () => {
                    const el = ref != null ? document.getElementById(`qa-${ref}`) : null;
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                      el.classList.add("flash-q");
                      window.setTimeout(() => el.classList.remove("flash-q"), 2000);
                    }
                  };
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={go}
                      aria-label={`Jump to question ${num}`}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px] font-bold text-slate-600 transition hover:border-indigo-400 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-300"
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Citation key */}
      <section id="sources" className="mt-14 scroll-mt-28">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
          <ExternalLink className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          Citation key — all sources are free and clickable
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {CITATIONS.map((c) => (
            <a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-indigo-500"
            >
              <span className="flex items-start gap-3 text-sm font-semibold text-slate-800 group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-300">
                <span className="mt-0.5 rounded bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700 dark:text-indigo-300">{c.id}</span>
                <span className="min-w-0">
                  {c.label}
                  {c.note && <span className="mt-1 block text-xs font-normal leading-relaxed text-slate-500 dark:text-slate-400">{c.note}</span>}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
