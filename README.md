# Masterclass on Artificial Intelligence

A **self-hosted, single-page web app** that prepares students for **Analyst and AI/ML Engineer interviews**.  
Built as a ~4.5-hour guided lecture: 6 teach-from-scratch modules, runnable hands-on labs, and a 131-question interview bank with hidden, click-to-reveal answers — all gathered from public interview reports and free cited sources.

> No backend. No accounts. No external fonts or images. Builds to **one self-contained HTML file** that can be hosted anywhere.

---

## What's inside

### 6 learning modules (each ~30–45 min)
| # | Module | Covers |
|---|--------|--------|
| 01 | **Foundations** | AI vs ML vs DL vs GenAI · classical ML · transformers & self-attention · tokenization · embeddings · chunking |
| 02 | **Modern AI Engineering** | LLM generation & temperature · prompting · prompt injection defence · RAG pipelines · vector databases · hybrid search & MMR · evaluation · AI agents · LangChain vs LangGraph |
| 03 | **Machine Learning in Practice** | Precision/recall/F1 · imbalanced data · bias–variance · validation strategy · the end-to-end project narrative |
| 04 | **Data Engineering for AI** | PDF & OCR extraction · Slowly Changing Dimensions · duplicates & survivorship · ingestion pipelines · quality gates |
| 05 | **MLOps & AI Governance** | Batch vs real-time · drift monitoring · model registry · risk frameworks (NIST AI RMF, ISO/IEC 42001, EU AI Act) · fairness · security |
| 06 | **Industry Context** | Applying the full stack to a regulated industry (telecom compliance, revenue assurance, agent governance) |

Each module renders from data with:
- Plain-English concept cards with **inline SVG diagrams** (no external images)
- A telecom / audit **worked example** per concept
- **Runnable Google Colab labs (CPU)** — paste-and-run, sample output included, one-click copy
- **Real interview questions** per module with expandable model answers
- Free, clickable **reading resources**
- A **quick self-check** quiz
- **"Mark as complete"** progress tracking (persists in `localStorage`)

### Interview Q&A bank — 131 questions
- Every answer **hidden behind a click** so you can self-test first
- 44 core questions open into a full in-depth walk-through: short answer → detailed explanation of every connected concept → glossary of terms → a **30-second spoken script**
- 87 additional questions with crisp, cited model answers
- Filter by **10 sections**, **difficulty (Basic / Intermediate / Advanced)**, **in-depth only**, and **live search**
- Duplicates across sources merged, never repeated
- **Mock interview rounds** (Screening 30 min · Technical 45 min · Design 45 min · Coding 30 min) with jump-to-question chips for trainer mode
- **Citation key** — 10 free sources (GitHub prep repos, interview guides, experience posts), all clickable

### Final checklist
Module completion review, a 48-hour sprint plan, the Python coding round questions, and a 60-minute pre-interview warm-up list.

---

## Tech stack

- **React 19 + TypeScript + Vite 7**
- **Tailwind CSS v4**
- **react-router-dom** (HashRouter — works on any static host, no server config)
- **lucide-react** icons
- **vite-plugin-singlefile** → the whole app ships as one `dist/index.html`
- System fonts only · light/dark theme persisted in `localStorage` · mobile-friendly

---

## Project structure

```
├── index.html                    # entry (title/meta)
├── vite.config.ts
├── .github/workflows/deploy.yml  # auto-deploy to GitHub Pages on push
├── src/
│   ├── main.tsx
│   ├── App.tsx                   # routes: /, /topic/:id, /questions, /checklist
│   ├── index.css                 # Tailwind v4 + theme + diagram styles
│   ├── data/
│   │   ├── topics.ts             # 6 modules: concepts, diagrams, labs, resources
│   │   ├── questions.ts          # 44 core interview questions (+ 2 coding)
│   │   ├── detailedAnswers.ts    # long-form answers for the core set
│   │   ├── bank.ts / bank2.ts    # 87 cited bank questions, citations, mock rounds
│   ├── components/
│   │   ├── Layout.tsx            # sidebar nav, search, theme toggle, progress bar
│   │   ├── TopicModule.tsx       # the per-module page template
│   │   ├── Diagram.tsx           # inline-SVG flow/cycle renderer
│   │   ├── CodeBlock.tsx         # monospace block + copy button + sample output
│   │   ├── QuestionCard.tsx      # expandable interview-question card
│   │   ├── icons.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Questions.tsx         # the 131-question bank
│   │   ├── Checklist.tsx
│   └── state/AppContext.tsx      # theme + completion state (localStorage)
```

---

## Run locally

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173
npm run build      # production build → dist/index.html (single self-contained file)
npm run preview    # serve the production build locally
```

`dist/index.html` is fully self-contained — you can also just open it in a browser or drop it onto any static host.

---

## Deploy to GitHub Pages (username.github.io)

The repo already includes `.github/workflows/deploy.yml`.

```bash
git init
git add .
git commit -m "Masterclass on Artificial Intelligence"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source → GitHub Actions**.  
Wait for the **Actions** run to go green, and your site is live at:

```
https://<YOUR-USERNAME>.github.io/<REPO-NAME>/
```

Thanks to hash-based routing, deep links work directly on Pages:

```
#/#/questions           #/#/topic/modern-ai           #/checklist
```

Every later push to `main` redeploys automatically.

---

## Accessibility & privacy

- Sufficient color contrast in both light and dark themes
- Keyboard-reachable controls, visible focus rings, aria-labels on icon buttons
- Code blocks scroll horizontally on small screens
- **Zero tracking**: theme and module completion are stored only in your browser's `localStorage`

## Sources

All interview questions were gathered from public candidate interview reports and free preparation guides; every question carries its citation, and the Q&A page ends with a clickable source index. Content is for education and interview preparation.
