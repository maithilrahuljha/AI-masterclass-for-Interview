import type { InterviewQuestion } from "./questions";

// ---------------------------------------------------------------------------
// Citation key for the combined & cited question bank (all links clickable).
// ---------------------------------------------------------------------------
export interface Citation {
  id: string;
  label: string;
  url: string;
  note?: string;
}

export const CITATIONS: Citation[] = [
  {
    id: "S1",
    label: "aasimansari1/ml-interview-prep",
    url: "https://github.com/aasimansari1/ml-interview-prep",
    note: "500+ ML/AI Q&A with code and system design.",
  },
  {
    id: "S2",
    label: "anurag265/genai-interview-prep-india",
    url: "https://github.com/anurag265/genai-interview-prep-india",
    note: "GenAI interview questions for the Indian hiring loop.",
  },
  {
    id: "S3",
    label: "Kazukie0647/AI-Engineer-Interview-Questions",
    url: "https://github.com/Kazukie0647/AI-Engineer-Interview-Questions",
    note: "1,000+ questions with worked answers across companies.",
  },
  {
    id: "S4",
    label: "KodeKloud — AI Interview Questions 2026",
    url: "https://kodekloud.com/blog/ai-interview-questions/",
    note: "Beginner-to-LLM guided question set.",
  },
  {
    id: "S5",
    label: "ajitsingh98/Data-Science-Interview-Questions-Answers",
    url: "https://github.com/ajitsingh98/Data-Science-Interview-Questions-Answers",
    note: "1,300+ curated data science questions.",
  },
  {
    id: "S6",
    label: "mchittineni/ultimate-ai-engineering-guide",
    url: "https://github.com/mchittineni/ultimate-ai-engineering-guide",
    note: "100+ questions across LLM, RAG, agents and LLMOps.",
  },
  {
    id: "S7",
    label: "AI Engineer Interview Guide 2026 (Calvin University)",
    url: "https://calvin.edu",
    note: "On the site, search: “AI Engineer Interview Guide 2026”.",
  },
  {
    id: "S8",
    label: "shafaypro/CrackingMachineLearningInterview",
    url: "https://github.com/shafaypro/CrackingMachineLearningInterview",
    note: "Interview roadmap with milestones and question lists.",
  },
  {
    id: "S9",
    label: "InterviewBit",
    url: "https://www.interviewbit.com",
    note: "Classic coding and ML interview question collections (also see GeeksforGeeks).",
  },
  {
    id: "S10",
    label: "LeetCode Discuss — real interview experiences",
    url: "https://leetcode.com/discuss/",
    note: "Candidate-posted interview experiences and coding tasks.",
  },
];

// ---------------------------------------------------------------------------
// Bank numbers already covered by the core 44 questions (nothing repeated).
// ---------------------------------------------------------------------------
export const BANK_COVERED: Record<string, number> = {
  Q1: 9, Q6: 13, Q7: 8, Q9: 6, Q12: 12, Q14: 15, Q15: 10, Q16: 17,
  Q23: 129 /* merged into Q29 */, Q26: 19, Q35: 23, Q37: 24, Q38: 24,
  Q42: 27, Q52: 28, Q53: 29, Q64: 30, Q65: 31,
  Q71: 32, Q72: 34, Q73: 33,
  Q78: 36, Q79: 36, Q80: 37, Q81: 38,
  Q97: 42, Q98: 43,
};

// ---------------------------------------------------------------------------
// New questions from the combined bank (de-duplicated). ref = 100 + bank number.
// ---------------------------------------------------------------------------
type Extra = InterviewQuestion & { bankNum: string; cites: string[] };

function e(
  ref: number, bankNum: string, diff: "B" | "I" | "A", section: string,
  topicId: string, q: string, a: string, cites: string[], code?: string
): Extra {
  return { ref, bankNum, diff, section, topicId, q, a, cites, code,
    sourceLabel: `Combined question bank (${cites.join(", ")})`, sourceUrl: "#sources" };
}

export const EXTRA_QUESTIONS: Extra[] = [
  // ─── RAG & Vector Databases ───
  e(102, "Q2", "B", "RAG & Vector Databases", "foundations",
    "What are the four main steps of a RAG pipeline?",
    "Chunk → embed → retrieve → generate. Split each document into meaningful chunks, convert each chunk into a vector with an embedding model, and store it in a vector database. At question time, embed the query with the same model, retrieve the top-k nearest chunks, and let the LLM write the answer using those chunks as grounded context, ideally with citations.",
    ["S6", "S2"]),
  e(103, "Q3", "B", "Foundations & AI basics", "foundations",
    "What is an embedding?",
    "An embedding is a fixed-length list of numbers that represents a piece of text as a point in space, learned so that similar meanings sit close together. This turns search into geometry: you compare vectors with cosine similarity instead of matching words. Example: all-MiniLM-L6-v2 produces 384 numbers per text.",
    ["S1", "S5"]),
  e(104, "Q4", "B", "RAG & Vector Databases", "modern-ai",
    "What is a vector database?",
    "A database that stores embeddings with their text and metadata, and answers “which stored vectors are nearest to this query vector?” quickly using approximate nearest-neighbour indexes. Common choices: FAISS for local jobs, Chroma for prototyping, pgvector inside Postgres, and managed services like Pinecone or Weaviate at scale.",
    ["S6", "S4"]),
  e(105, "Q5", "I", "Foundations & AI basics", "foundations",
    "How does chunking impact retrieval quality?",
    "Chunk size defines the smallest unit your system can return. Too large and the key fact is diluted by surrounding noise, so weak semantic match; too small and the surrounding context is cut off, so the retrieved text is ambiguous. A 10–15% overlap protects sentences sitting on a boundary. Always validate chunk size against recall@k on a golden question set rather than guessing.",
    ["S2", "S6"]),
  e(108, "Q8", "I", "RAG & Vector Databases", "modern-ai",
    "What are the main approximate nearest-neighbour (ANN) algorithms in vector databases?",
    "Flat indexes compare the query with every vector — exact but slow at scale. IVF clusters vectors and searches only the closest clusters, trading a little recall for big speed. HNSW builds a navigable small-world graph and gives the best speed-to-recall balance at higher memory. Product Quantization compresses vectors so far more fit in RAM. Pick by corpus size, query rate and the recall you can afford to lose.",
    ["S6", "S4"]),
  e(110, "Q10", "I", "RAG & Vector Databases", "modern-ai",
    "How would you optimise latency in a RAG pipeline?",
    "Cut work at every stage: cache embeddings and frequent answers (semantic cache), use an ANN index instead of exhaustive search, reduce top-k and re-rank only the shortlist, pre-filter by metadata so the search space shrinks, and route simple questions to a smaller generator model. Keep only min-pooled tensor-heavy steps on GPU and stream the response so the perceived latency drops further.",
    ["S6", "S2"]),
  e(111, "Q11", "I", "RAG & Vector Databases", "modern-ai",
    "What is semantic caching?",
    "A cache keyed by meaning rather than exact text: embed each incoming question, and if it is very close to a previously answered question (say cosine similarity above 0.95), serve the stored answer and skip retrieval and generation entirely. It cuts cost and latency dramatically for FAQ-like traffic, with one caveat — set the threshold high and scope it per user or per tenant, or you will serve wrong answers.",
    ["S6", "S4"]),
  e(113, "Q13", "A", "RAG & Vector Databases", "modern-ai",
    "Explain bi-encoders vs cross-encoders.",
    "A bi-encoder embeds the query and each document separately, so document vectors can be pre-computed and stored — fast enough to search millions, but it never sees query and document together. A cross-encoder reads the query and the document jointly and scores the pair — far more accurate relevance, but far too slow to run over the whole corpus. The production pattern is bi-encoder for first-pass retrieval, cross-encoder to re-rank the top 50.",
    ["S6", "S4"]),

  // ─── Large Language Models ───
  e(117, "Q17", "B", "Large Language Models", "foundations",
    "What is a token?",
    "A token is a small piece of text — a word, part of a word, or punctuation — produced by the tokenizer. Models read and generate tokens, not raw characters. Rule of thumb for English: one token is about 0.75 words, and everything from pricing to context limits is counted in tokens.",
    ["S4", "S6"]),
  e(118, "Q18", "B", "Large Language Models", "modern-ai",
    "What is a context window?",
    "The maximum number of tokens the model can consider at once. The system prompt, any retrieved documents, the conversation history and the model's own reply all share this budget. Exceeding it truncates input, and recall is weaker for material buried in the middle of very long windows.",
    ["S4", "S6"]),
  e(119, "Q19", "B", "Large Language Models", "modern-ai",
    "What is a hallucination?",
    "A fluent, confident but false answer. It happens because the model is trained to predict plausible next tokens, not verified truth, so knowledge gaps get filled with statistically likely fabrications. Mitigations: ground answers in retrieved text, demand citations, keep temperature low, and let the system abstain.",
    ["S4", "S3"]),
  e(120, "Q20", "I", "Large Language Models", "modern-ai",
    "Explain temperature, top-p and top-k sampling.",
    "All three shape how the next token is chosen from the model's scores. Temperature scales randomness: near 0 is nearly deterministic, above 1 is adventurous. Top-k samples only from the k most likely tokens. Top-p (nucleus) samples from the smallest set of tokens whose probabilities add up to p, adapting to how confident the model is. In practice you tune temperature with top-p together; factual work stays low, brainstorming goes higher.",
    ["S6", "S4"]),
  e(121, "Q21", "I", "Large Language Models", "foundations",
    "What is KV cache and how does it speed up inference?",
    "During autoregressive generation, every new token attends to all previous tokens. The KV cache stores the already-computed key and value tensors for previous tokens, so attention does not recompute them on every step. This turns generation from quadratic recomputation into an append-and-lookup, and it is why the first token is slow (prefill) and subsequent tokens are fast (decode). It costs GPU memory proportional to context length and batch size.",
    ["S3", "S6"]),
  e(122, "Q22", "I", "Large Language Models", "foundations",
    "Encoder-only vs decoder-only vs encoder-decoder models?",
    "Encoder-only models (BERT family) read full text bidirectionally and are ideal for understanding tasks: classification, search embeddings, entity extraction. Decoder-only models (GPT, Llama) generate text left-to-right and power chat and assistants. Encoder-decoder models (T5, BART) read with an encoder and generate with a decoder, a natural fit for translation and summarisation. Pick the shape that matches the task.",
    ["S5", "S4"]),
  e(125, "Q25", "I", "Large Language Models", "modern-ai",
    "Greedy decoding vs beam search?",
    "Greedy decoding takes the single most likely token at every step — fast, deterministic, but a locally safe choice can paint you into a dull or repetitive passage. Beam search keeps the several highest-probability partial sequences alive and picks the best total at the end — usually more coherent, but slower, more compute-heavy, and prone to safe, generic outputs for open-ended chat. Beam suits translation and summarisation; sampling with top-p suits creative generation.",
    ["S5", "S6"]),
  e(127, "Q27", "A", "Large Language Models", "foundations",
    "What is FlashAttention and how does it work?",
    "An exact attention implementation that is faster purely through better memory management. Standard attention materialises the full N×N attention matrix in slow GPU memory (HBM). FlashAttention tiles the computation into blocks that fit in fast on-chip SRAM, fuses softmax with it online, and writes far fewer intermediate results. Same math, dramatically less memory traffic — that is what makes very long contexts trainable and affordable. FlashAttention-2/3 add further GPU-aware scheduling.",
    ["S3", "S6"]),
  e(128, "Q28", "A", "Large Language Models", "foundations",
    "How do Mixture-of-Experts (MoE) architectures scale efficiently?",
    "An MoE model replaces each dense feed-forward layer with many parallel “expert” sub-layers plus a small router. For every token the router chooses only a few experts (say 2 of 8), so only those run. Total parameters grow huge — capacity and knowledge — while compute per token stays small. Famous examples: Mixtral and Switch-style models. The costs are routing complexity, load balancing (one expert must not become a bottleneck), and memory since all experts still live on the hardware.",
    ["S3", "S6"]),
  e(129, "Q29", "A", "Large Language Models", "foundations",
    "Multi-head vs multi-query vs grouped-query attention? (covers Q23: GQA vs MHA)",
    "Multi-Head Attention (MHA) gives every attention head its own key and value projections — maximum expressiveness, but the KV cache grows with heads. Multi-Query Attention (MQA) shares one key and one value head across all query heads — smallest cache and fastest decode, with a noticeable quality trade-off. Grouped-Query Attention (GQA) is the compromise: query heads are grouped, each group shares one KV head — nearly MHA quality with much cheaper inference. This is why most modern open models (Llama 3, Mistral) use GQA.",
    ["S3", "S6"]),

  // ─── Prompt Engineering ───
  e(130, "Q30", "B", "Prompt Engineering", "modern-ai",
    "What is zero-shot prompting?",
    "Asking for the task with instructions only, no examples: “Classify this review as positive or negative.” It is the fastest to write and cheapest, but the least consistent on format and labels. Use it for simple, unambiguous tasks; move to few-shot the moment output format starts to matter.",
    ["S4", "S6"]),
  e(131, "Q31", "B", "Prompt Engineering", "modern-ai",
    "What is few-shot prompting?",
    "Showing the model two to five solved examples before the real question, so it copies their labels, format and tone. It fixes most inconsistency without any training. Choose representative, correctly-labelled examples — a wrong example teaches a wrong habit.",
    ["S4", "S6"]),
  e(132, "Q32", "I", "Prompt Engineering", "modern-ai",
    "What is chain-of-thought prompting?",
    "Asking the model to reason step by step before giving the final answer (“Let's think step by step” or a worked reasoning example). Forcing intermediate reasoning into the context measurably improves arithmetic, multi-condition logic and explainable classification. Trade-off: longer outputs cost more tokens and latency, so reserve it for tasks that actually need reasoning.",
    ["S6", "S4"]),
  e(133, "Q33", "I", "Prompt Engineering", "modern-ai",
    "What is ReAct prompting?",
    "ReAct interleaves Reasoning and Acting: the model writes a thought (“I need the latest tariff”), takes an action (call the search tool), reads the observation, and repeats until it can answer. It is the pattern underneath tool-using agents. Compared with plain chain-of-thought it grounds each reasoning step in an external result, which reduces hallucination and makes the trace auditable.",
    ["S6", "S7"]),
  e(134, "Q34", "I", "Prompt Engineering", "modern-ai",
    "What is prompt injection, and how do you defend against it?",
    "Prompt injection is when attacker-controlled text — in a user message, an email, a retrieved PDF — tells the model “ignore your instructions and …”. Defend in layers: declare that retrieved content is data, never instructions; wrap it in clear delimiters; keep system rules separate and explicit; allow-list tools with least-privilege scopes; filter outputs; and run injection canary tests before launch. No single defence suffices — layer them.",
    ["S6", "S7"]),
  e(136, "Q36", "A", "Prompt Engineering", "modern-ai",
    "How would you optimise a prompt for a production classification task?",
    "Treat it like an engineering iteration. Build an eval set of labelled inputs first. Test zero-shot, few-shot and chain-of-thought variants and measure accuracy, latency and token cost. Constrain output to JSON with a schema and validate it. Add explicit tie-break rules for ambiguous cases. Version the prompt in git next to its eval results, re-run the suite on every model or prompt change, and in production monitor the class distribution for drift.",
    ["S6", "S7"]),

  // ─── AI Agents ───
  e(139, "Q39", "I", "AI Agents", "modern-ai",
    "What are the core components of an AI agent?",
    "Four essentials: the LLM for reasoning, tools (APIs, search, calculators) for acting, a planning loop that alternates plan → act → observe, and memory — a short-term scratchpad plus optional long-term vector memory. Production agents add a safety tier on top: guardrails on inputs and outputs, least-privilege tool permissions, full step logging, human-in-the-loop checkpoints and a kill switch.",
    ["S6", "S7"]),
  e(140, "Q40", "I", "AI Agents", "modern-ai",
    "What are the main agent frameworks and patterns?",
    "Patterns: ReAct (reason then act in a loop), Plan-and-Execute (write a full plan first, then execute steps), and Reflexion (critique the previous attempt and retry with lessons). Frameworks: LangGraph for stateful graphs with loops, branching, durability and human interrupts; CrewAI/semantic-kernel style frameworks for role-based multi-agent teams; and LangChain components sitting underneath for models, tools and stores.",
    ["S6", "S7"]),
  e(141, "Q41", "I", "AI Agents", "modern-ai",
    "What is function calling / tool calling?",
    "The model outputs a structured call — a tool name and arguments as JSON — instead of plain text. Your runtime validates it against the tool's schema, executes it, and returns the result into the conversation as an observation. That contract between model and runtime is how an agent interacts with the real world, and the schema validation step is what stops hallucinated tool arguments from reaching production systems.",
    ["S6", "S4"]),
  e(143, "Q43", "A", "AI Agents", "modern-ai",
    "How do you evaluate an AI agent?",
    "At three levels. Outcome level: task success rate on a benchmark of goals (the only metric users care about). Trajectory level: did it choose sensible plans — step efficiency, number of retries, no redundant loops. Step level: tool-selection accuracy and argument correctness per call. Add cost and latency per completed task, plus safety metrics: forbidden actions attempted, approvals correctly requested. Human review stays essential for judging subtle quality.",
    ["S6", "S7"]),
  e(144, "Q44", "A", "AI Agents", "modern-ai",
    "What are common agent failure modes?",
    "The classics: infinite or thrashing loops when the goal is ambiguous; tool misuse or hallucinated tool arguments; cascading errors where a bad observation poisons every later step; context overflow pushing early progress out of the window; overconfident final answers built on weak evidence; and unsafe actions taken without approval. Each maps to a control — max iterations, schema validation, checkpoints, summarised memory, verification steps and human gates.",
    ["S7", "S6"]),
  e(145, "Q45", "A", "Scenario & System Design", "modern-ai",
    "Design an insurance-claims agent using RAG while controlling token cost.",
    "Scope it precisely: input is a claim plus its documents, output is approve / deny / escalate, with cited policy clauses. Pipeline: index the policy documents, retrieve the few relevant clauses, and pass them with a structured-output prompt. Guardrails: any claim above a dollar threshold or below a confidence threshold goes to a human. Cost control: cache embeddings, keep top-k tight, route easy claims to a smaller model, cap tokens per call and iterations per claim. Evaluate retrieval accuracy and decision accuracy separately, and log every decision with its citations for the auditors.",
    ["S7", "S6"]),
];

// (continued in bank2.ts to keep files reviewable)
export const BANK_NOTE =
  "Curated from the Combined & Cited question bank (102 questions across 9 sections). Questions already present in the core set are linked, not repeated.";
