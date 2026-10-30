export interface DiagramData {
  kind: "flow" | "cycle";
  nodes: string[];
  caption?: string;
  accent?: number[];
}

export interface Concept {
  title: string;
  explanation: string;
  example: string;
  diagram: DiagramData;
}

export interface Lab {
  title: string;
  intro: string;
  code: string;
  sampleOutput: string;
}

export interface Resource {
  label: string;
  url: string;
  note?: string;
}

export interface Topic {
  id: string;
  num: string;
  title: string;
  tagline: string;
  time: string;
  overview: string;
  why: string;
  covers: string[];
  concepts: Concept[];
  labs: Lab[];
  resources: Resource[];
  selfCheck: { q: string; a: string }[];
}

export const TOPICS: Topic[] = [
  // ═══════════════════════════ MODULE 01 ═══════════════════════════
  {
    id: "foundations",
    num: "01",
    title: "Foundations",
    tagline: "AI vs ML vs DL vs GenAI · classical ML · transformers · tokens · embeddings · chunking",
    time: "~35 min theory + 15 min practice",
    covers: [
      "AI vs ML vs DL vs GenAI",
      "Classical ML families",
      "Neural networks & backprop",
      "Transformer & self-attention",
      "Tokenization",
      "Embeddings & vector space",
      "Chunking strategies",
    ],
    overview:
      "This module builds the vocabulary that every later module assumes. You will learn how the four words everyone mixes up — AI, machine learning, deep learning and generative AI — actually nest inside one another, what classical machine learning looks like, how a neural network learns from its mistakes, and what the transformer architecture changed in 2017. Then we go one level deeper into the three mechanics that power every modern AI system: tokenization (text → numbers the model can read), embeddings (meaning → geometry) and chunking (big documents → retrievable pieces). Get these right and everything in Module 02 becomes easy.",
    why:
      "Almost every interview opens with a fundamentals screen, and candidates lose the room in the first five minutes by blurring AI with ML, or by saying “embeddings” without being able to explain what the numbers mean. Interviewers use these questions to decide how deep they can go later. If you can define the hierarchy cleanly, sketch a transformer in one sentence, and state the dimensionality of your embedding model from memory, the rest of the conversation shifts from testing you to exploring with you.",
    concepts: [
      {
        title: "AI vs ML vs DL vs GenAI — the nesting dolls",
        explanation:
          "These are four circles inside each other, not four competing things. Artificial Intelligence is the widest: any technique that makes a machine behave intelligently, including plain hand-written rules. Machine Learning is the subset that learns patterns from data instead of being told the rules. Deep Learning is the subset of ML that uses many-layered neural networks, which is what made images, speech and language work. Generative AI is the subset of deep learning whose output is new content — text, images, code — rather than just a label or a number. Every LLM is GenAI, which is DL, which is ML, which is AI.",
        example:
          "Four systems in one compliance team: a rules engine that flags any invoice over ₹10 lakh (AI, no learning); a churn model trained on past customers (ML); a neural network reading scanned licence pages (DL); and a copilot drafting the obligation summary (GenAI).",
        diagram: {
          kind: "flow",
          nodes: ["AI: any intelligent behaviour", "ML: learns from data", "DL: deep neural networks", "GenAI: creates new content"],
          accent: [3],
          caption: "Each box lives inside the one before it.",
        },
      },
      {
        title: "Classical machine learning — the three families",
        explanation:
          "Supervised learning trains on labelled examples (input → known answer) and splits into classification (predict a category: fraud / not fraud) and regression (predict a number: next month's usage). Unsupervised learning has no labels and finds structure by itself — clustering customers into segments, or flagging outliers. Reinforcement learning learns by trial and reward, like an agent optimising a decision over time. The workhorse algorithms are still simple: linear and logistic regression, decision trees, random forests, gradient boosting (XGBoost/LightGBM), k-means and k-nearest-neighbours. Classical ML beats deep learning on small, tabular datasets surprisingly often — say that in an interview and you will sound experienced.",
        example:
          "Predicting which subscribers will churn is supervised classification on tabular billing data — gradient boosting typically wins. Grouping 40 million subscribers into usage segments nobody defined in advance is unsupervised clustering.",
        diagram: {
          kind: "flow",
          nodes: ["Labelled data → Supervised", "No labels → Unsupervised", "Reward signal → Reinforcement"],
          caption: "The label tells you which family you are in.",
        },
      },
      {
        title: "How a neural network learns",
        explanation:
          "A neural network is layers of tiny units. Each neuron multiplies its inputs by weights, adds them up, and squashes the result through an activation function such as ReLU — that non-linearity is what lets the network learn curved patterns a straight line could never fit. Data flows forward through input → hidden layers → output. A loss function then measures how wrong the output was, and backpropagation pushes that error backwards to compute how much each weight contributed. Gradient descent nudges every weight a little in the direction that reduces the loss, and repeating this over many epochs is literally all that “training” means.",
        example:
          "Twenty network-quality features feed two hidden layers that output the probability a cell tower fails this week. Each training pass compares the prediction to what actually happened and corrects the weights.",
        diagram: {
          kind: "cycle",
          nodes: ["Forward pass", "Compute loss", "Backpropagate error", "Update weights"],
          caption: "Training = this loop, repeated thousands of times.",
        },
      },
      {
        title: "The transformer and self-attention",
        explanation:
          "Before 2017, language models read text one word at a time (RNNs/LSTMs), which was slow and forgetful over long passages. The transformer replaced that with self-attention: every token looks at every other token at once and decides which ones matter for its meaning. Because all positions are processed in parallel, transformers train on far more data, and because attention is direct, long-range connections survive. Positional encodings tell the model the word order that parallel processing would otherwise lose. Transformers come in three flavours — encoder-only (BERT, great for classification and embeddings), decoder-only (GPT/Llama, great for generation) and encoder-decoder (T5, great for translation and summarisation).",
        example:
          "In “the operator must pay its licence fee before it expires”, self-attention is how the model learns that “it” refers to the licence, not the operator — exactly the kind of ambiguity that matters when parsing legal text.",
        diagram: {
          kind: "flow",
          nodes: ["Tokens + positions", "Self-attention: every token sees every token", "Feed-forward layers", "Output representation"],
          accent: [1],
        },
      },
      {
        title: "Tokenization — turning text into numbers",
        explanation:
          "Models cannot read characters; they read token IDs. A tokenizer splits text into sub-word pieces using a learned vocabulary (BPE, WordPiece or SentencePiece), so common words stay whole while rare words break into fragments — which is how a model handles a word it has never seen. The practical rule of thumb for English is 1 token ≈ 0.75 words, or about 4 characters. This matters commercially: pricing, rate limits and the context window are all counted in tokens, so every cost estimate for an AI project starts with a token count.",
        example:
          "A 100-page regulatory order is roughly 50,000 tokens. Summarising 500 such orders means about 25 million input tokens — that single number decides whether the project uses a paid API or a self-hosted model.",
        diagram: {
          kind: "flow",
          nodes: ["“telecom regulation”", "Tokenizer (BPE)", "tele · com · regulation", "IDs [9906, 892, 3141]"],
        },
      },
      {
        title: "Embeddings — meaning becomes geometry",
        explanation:
          "An embedding model converts a piece of text into a fixed-length list of numbers (a vector) positioned so that similar meanings sit close together in space. Closeness is usually measured with cosine similarity, which compares the angle between two vectors on a scale of roughly −1 to 1. The length of that list is the dimensionality: all-MiniLM-L6-v2 outputs 384 numbers; OpenAI's text-embedding-3-small outputs 1536. More dimensions capture more nuance but cost more memory, more latency and more money — so you benchmark on your own data rather than assuming bigger is better. Crucially, you must embed your query with the exact same model you used for your documents, or the geometry will not line up.",
        example:
          "“AGR dues payable to DoT” and “licence fee as a share of revenue” contain almost no words in common, yet their vectors sit close together — which is precisely why semantic search finds the right clause when keyword search fails.",
        diagram: {
          kind: "flow",
          nodes: ["Text", "Embedding model", "[0.12, −0.44, … ×384]", "Nearby vectors = similar meaning"],
          accent: [3],
        },
      },
      {
        title: "Chunking — cutting documents into retrievable pieces",
        explanation:
          "You cannot embed a 300-page document as one vector; the meaning would be averaged into mush, and you could never cite a precise clause. So you split it into chunks. Fixed-size chunking takes equal windows of roughly 300–500 tokens with a 10–15% overlap so a sentence sitting on a boundary is not lost. Structure-aware chunking splits on real document boundaries — headings, numbered clauses, table rows — and is the best choice for legal and regulatory text. Semantic chunking breaks where the topic shifts. Hierarchical (parent–child) chunking matches on small precise children but hands the larger parent section to the model for context. The eternal trade-off: chunks that are too large dilute the match with noise, and chunks that are too small cut the meaning in half.",
        example:
          "A tariff order split blindly every 500 tokens slices clause 4.2 across two chunks, so neither retrieves well. Splitting on the clause numbering keeps each obligation whole and makes every answer citable.",
        diagram: {
          kind: "flow",
          nodes: ["Full document", "Choose split strategy", "Chunks + 10–15% overlap", "Metadata: doc · page · clause"],
          caption: "Metadata on every chunk is what makes answers traceable.",
        },
      },
    ],
    labs: [
      {
        title: "Tokens, embeddings and similarity in one go",
        intro:
          "See all three foundations at once: tokenize a sentence, embed six sentences, and measure which meanings sit closest together in vector space.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
!pip install -q sentence-transformers

from transformers import AutoTokenizer
from sentence_transformers import SentenceTransformer
import numpy as np

# ---------- 1. TOKENIZATION ----------
tok = AutoTokenizer.from_pretrained("bert-base-uncased")
text = "Telecom operators must pay AGR dues to the regulator."
print("Tokens:", tok.tokenize(text))
print("Token count:", len(tok.tokenize(text)), "| words:", len(text.split()))

# ---------- 2. EMBEDDINGS ----------
model = SentenceTransformer("all-MiniLM-L6-v2")
sents = [
    "AGR dues are a share of revenue payable to the regulator.",
    "Licence fees are calculated on adjusted gross revenue.",
    "The tower has a backup diesel generator.",
]
emb = model.encode(sents)
print("\\nEmbedding shape:", emb.shape, "-> 384 dimensions each")

# ---------- 3. COSINE SIMILARITY ----------
def cos(a, b):
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))

print(f"\\nsim(sentence 1, sentence 2) = {cos(emb[0], emb[1]):.3f}  <- same meaning")
print(f"sim(sentence 1, sentence 3) = {cos(emb[0], emb[2]):.3f}  <- unrelated")`,
        sampleOutput: `Tokens: ['telecom', 'operators', 'must', 'pay', 'ag', '##r', 'dues', 'to', 'the', 'regulator', '.']
Token count: 11 | words: 9

Embedding shape: (3, 384) -> 384 dimensions each

sim(sentence 1, sentence 2) = 0.742  <- same meaning
sim(sentence 1, sentence 3) = 0.061  <- unrelated

Note how "AGR" split into two sub-word tokens: that is BPE handling a rare word.`,
      },
      {
        title: "Chunking strategies side by side",
        intro:
          "Compare fixed-size chunking against structure-aware chunking on a short regulatory document, and see why the split strategy decides retrieval quality.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
doc = """4.1 The licensee shall pay licence fee quarterly.
4.2 Licence fee is eight percent of adjusted gross revenue.
4.3 Late payment attracts interest at the notified rate.
5.1 The licensee shall maintain lawful interception capability."""

# ---------- Strategy A: fixed-size with overlap ----------
def fixed_chunks(text, size=60, overlap=10):
    out, start = [], 0
    while start < len(text):
        out.append(text[start:start + size])
        start += size - overlap
    return out

# ---------- Strategy B: structure-aware (split on clause numbers) ----------
structure_chunks = [ln.strip() for ln in doc.split("\\n") if ln.strip()]

print("FIXED-SIZE CHUNKS (meaning gets cut):")
for c in fixed_chunks(doc)[:3]:
    print("  |", c.replace("\\n", " "))

print("\\nSTRUCTURE-AWARE CHUNKS (one obligation each):")
for c in structure_chunks:
    print("  |", c)

print(f"\\nFixed: {len(fixed_chunks(doc))} chunks, boundaries ignore clauses")
print(f"Structure: {len(structure_chunks)} chunks, each independently citable")`,
        sampleOutput: `FIXED-SIZE CHUNKS (meaning gets cut):
  | 4.1 The licensee shall pay licence fee quarterly. 4.2 Lice
  | .2 Licence fee is eight percent of adjusted gross revenue
  | oss revenue. 4.3 Late payment attracts interest at the no

STRUCTURE-AWARE CHUNKS (one obligation each):
  | 4.1 The licensee shall pay licence fee quarterly.
  | 4.2 Licence fee is eight percent of adjusted gross revenue.
  | 4.3 Late payment attracts interest at the notified rate.
  | 5.1 The licensee shall maintain lawful interception capability.

Fixed: 4 chunks, boundaries ignore clauses
Structure: 4 chunks, each independently citable`,
      },
    ],
    resources: [
      {
        label: "Jay Alammar — The Illustrated Transformer",
        url: "https://jalammar.github.io/illustrated-transformer/",
        note: "The clearest visual explanation of self-attention ever written. Read it twice.",
      },
      {
        label: "Google — Machine Learning Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
        note: "Free, practical grounding in classical ML, loss functions and gradient descent.",
      },
      {
        label: "Hugging Face — NLP Course, Chapter 2 (tokenizers & models)",
        url: "https://huggingface.co/learn/nlp-course/chapter2/1",
        note: "Hands-on tokenization and embeddings with runnable notebooks.",
      },
      {
        label: "Sentence-Transformers documentation",
        url: "https://www.sbert.net/",
        note: "The library behind all-MiniLM-L6-v2 — check model cards for dimensionality.",
      },
    ],
    selfCheck: [
      { q: "Order AI, ML, DL and GenAI from widest to narrowest.", a: "AI ⊃ ML ⊃ DL ⊃ GenAI. AI is any intelligent behaviour, ML learns from data, DL uses deep neural networks, GenAI generates new content." },
      { q: "What did self-attention replace, and why was that a breakthrough?", a: "It replaced sequential RNN/LSTM reading. Every token attends to every other token in parallel, so training scales massively and long-range meaning survives." },
      { q: "Roughly how many tokens is 1,000 English words?", a: "About 1,300 tokens (1 token ≈ 0.75 words ≈ 4 characters)." },
      { q: "What does the dimensionality of an embedding mean?", a: "The length of the vector — e.g. 384 numbers for all-MiniLM-L6-v2, 1536 for text-embedding-3-small. More dimensions mean more nuance but more memory, latency and cost." },
      { q: "Why add overlap between chunks?", a: "So a sentence or clause that lands on a boundary still appears whole inside at least one chunk and remains retrievable." },
      { q: "Name the activation function that makes a network non-linear.", a: "ReLU is the standard one (sigmoid and tanh are older). Without a non-linearity, stacked layers collapse into a single linear function." },
    ],
  },

  // ═══════════════════════════ MODULE 02 ═══════════════════════════
  {
    id: "modern-ai",
    num: "02",
    title: "Modern AI Engineering",
    tagline: "LLMs · prompting · RAG · agents — the whole GenAI stack",
    time: "~70 min theory + 30 min practice",
    covers: [
      "LLM generation & temperature",
      "Context windows & hallucinations",
      "Prompt engineering techniques",
      "Prompt injection defence",
      "RAG pipeline & vector databases",
      "Hybrid search & MMR",
      "RAG evaluation",
      "AI agents & tool calling",
      "LangChain vs LangGraph",
      "Production GenAI architecture",
    ],
    overview:
      "This is the heart of the masterclass and the bulk of any modern AI interview. It takes the foundations from Module 01 — tokens, embeddings, chunking, transformers — and turns them into working systems. First you learn how an LLM actually generates text and which knobs control it. Then prompting, the cheapest way to steer a model. Then RAG, which gives the model your private documents so it stops guessing. Finally agents, which give the model tools and a loop so it can act, not just answer. Each layer builds directly on the one before: prompting without understanding generation is cargo-culting, RAG is prompting with retrieved context, and an agent is RAG plus tools plus iteration.",
    why:
      "If an interview has a GenAI section, roughly two-thirds of it lives in this module — and RAG alone is the single most-asked topic reported by candidates. Panels do not want definitions; they want you to defend architecture choices: why that chunk size, why that embedding model, why that vector database, how you measured it, and what you did when retrieval returned the wrong clause. Agents are the 2026 differentiator: being able to explain the plan-act-observe loop and the guardrails around it marks you as current rather than someone who read a tutorial last year.",
    concepts: [
      {
        title: "How an LLM generates — and the temperature dial",
        explanation:
          "An LLM is a next-token predictor. It reads the whole prompt through its transformer layers, produces a score (logit) for every token in its vocabulary, converts those scores into probabilities, samples one token, appends it to the input, and repeats. That autoregressive loop is why answers stream word by word. Temperature is the dial applied to the scores before they become probabilities: near 0 the top token wins almost every time, giving stable and factual output; around 0.7 you get balance; above 1.0 the distribution flattens so unlikely tokens get chosen, giving creativity and errors. Related knobs are top-k (only consider the k best tokens) and top-p / nucleus sampling (consider the smallest set of tokens whose probabilities sum to p). Temperature changes word choice, never knowledge — a hot model is not smarter, just bolder.",
        example:
          "Draft a control description at temperature 0.1 so the wording is reproducible across audit cycles; brainstorm possible failure scenarios at 0.9 when variety is the point.",
        diagram: {
          kind: "cycle",
          nodes: ["Prompt tokens", "Transformer", "Logits ÷ temperature", "Sample token", "Append & repeat"],
          accent: [2],
        },
      },
      {
        title: "Context windows, hallucinations and the model landscape",
        explanation:
          "The context window is the maximum number of tokens a model can hold at once, and the system prompt, retrieved documents, conversation history and the answer itself all compete for that budget. Windows now range from 8k to over 1M tokens, but recall sags for material buried in the middle of a very long window — the well-documented ‘lost in the middle’ effect — which is a strong argument for retrieving a few precise chunks instead of dumping everything in. Hallucinations follow from the same mechanics: the model is trained to produce plausible continuations, not verified truth, so a knowledge gap gets filled with a confident fabrication. The landscape splits into closed APIs (Claude, GPT, Gemini — best quality, zero ops, but data leaves your boundary) and open-weight models (Llama, Mistral, Qwen — self-hostable, private, fine-tunable, but you own the infrastructure).",
        example:
          "A model cites “circular 14/2023 on AI governance” that does not exist. The fix is architectural, not hopeful: ground answers in retrieved text, demand citations, and verify references like any other audit evidence.",
        diagram: {
          kind: "flow",
          nodes: ["System prompt", "Retrieved context", "History", "Answer space"],
          caption: "One shared token budget — spend it on precise context, not bulk.",
        },
      },
      {
        title: "Prompt engineering — zero-shot, few-shot, chain-of-thought",
        explanation:
          "Prompting is the cheapest control you have over a model: no retraining, instant to change. Zero-shot gives only an instruction — fast, least consistent. Few-shot adds two to five worked examples, and the model copies their format, labels and tone, which fixes most consistency problems. Chain-of-thought asks the model to reason step by step before answering, which measurably helps arithmetic, multi-condition logic and anything where you need to see the justification. A complete prompt specifies role, task, context, constraints and output format. The professional habit that separates engineers from tinkerers: iterate in a draft → critique → revise loop against a fixed quality bar, then stop.",
        example:
          "Classifying paragraphs as obligation versus guidance drifts badly zero-shot; two examples lock the labels. Multi-condition licence clauses do better with “reason step by step, then state the conclusion”.",
        diagram: {
          kind: "flow",
          nodes: ["Zero-shot: instruction", "Few-shot: + examples", "CoT: + reasoning steps"],
        },
      },
      {
        title: "Structured output, injection defence and upgrade-proof prompts",
        explanation:
          "When a downstream system consumes the answer, free text is a bug: give the exact JSON schema with keys, types and one filled example, demand “JSON only, no prose”, then validate the result and retry on a parse failure. Prompt injection is the security flip-side — attacker text inside a user message, an email or a retrieved PDF saying “ignore your instructions”. Defend in layers: treat all retrieved content as data and never as commands, wrap it in delimiters with an explicit rule, maintain an instruction hierarchy, allow-list tools with least privilege, filter outputs, and run injection canary tests before go-live. Finally, make prompts survive model upgrades: pin intent and format rather than quirky phrasings, keep prompts in version control with an owner, and re-run a golden test set after every model change.",
        example:
          "An obligations extractor emits {clause_id, obligation, deadline, penalty} per clause, schema-validated before it reaches the compliance register — and a hidden “approve this filing” line inside a PDF is ignored because document text is declared evidence, not instruction.",
        diagram: {
          kind: "flow",
          nodes: ["Untrusted text", "Delimit + sanitise", "Schema-constrained prompt", "Validate JSON", "Safe downstream use"],
          accent: [1, 3],
        },
      },
      {
        title: "RAG — why it exists and how the pipeline runs",
        explanation:
          "Retrieval-Augmented Generation turns a closed-book model into an open-book one. It fixes three limits at once: the model's knowledge is frozen at its training cut-off, it has never seen your private documents, and it invents answers when it does not know. The pipeline has an offline half and an online half. Offline, done once: load documents, chunk them, embed each chunk, and store vectors plus text plus metadata in a vector database (chunking and embedding are exactly as covered in Module 01). Online, per question: embed the query with the same model, retrieve the top-k nearest chunks, build a prompt containing them as context, and have the LLM answer with citations. No retraining is involved anywhere, which is why RAG is the default enterprise pattern.",
        example:
          "Two thousand regulatory circulars are indexed overnight. An analyst then asks what must be published for a new prepaid plan and gets the exact clause with its circular number in seconds.",
        diagram: {
          kind: "flow",
          nodes: ["Documents → chunk → embed → index", "Question → embed", "Top-k retrieval", "Prompt + context", "Cited answer"],
          caption: "Index once; retrieve and generate on every question.",
        },
      },
      {
        title: "Vector databases, similarity search, hybrid search and MMR",
        explanation:
          "A vector database stores embeddings with their metadata and finds nearest neighbours by cosine similarity or dot product. FAISS is an in-process library, Chroma suits development, pgvector lives inside Postgres, and Pinecone or Weaviate are managed services. The index type is the scaling decision: Flat is exact but scans everything (fine below about a million vectors), IVF clusters vectors to skip most of the work, HNSW is a graph index with the best speed-to-recall ratio at higher memory, and product quantization compresses vectors when memory binds. Two retrieval upgrades matter in interviews. Hybrid search runs BM25 keyword search alongside dense vectors and fuses the rankings, because keywords nail exact acronyms and IDs while vectors catch paraphrase. MMR (Maximal Marginal Relevance) then re-ranks with a λ dial that trades relevance against diversity, so your top-k is not five copies of the same clause.",
        example:
          "For the query “AGR penalty”, BM25 locks onto the literal acronym while the vector side finds “licence fee dues”; MMR then keeps one clause per circular instead of three near-identical twins.",
        diagram: {
          kind: "flow",
          nodes: ["Query", "BM25 + dense search", "Fuse ranks (RRF)", "MMR re-rank", "Diverse top-k"],
          accent: [3],
        },
      },
      {
        title: "Improving retrieval, evaluating RAG, killing hallucinations",
        explanation:
          "When answers are wrong, retrieval is usually the culprit, so work a fixed checklist: clean and deduplicate the corpus, attach metadata and filter on it, switch to hybrid search, add a cross-encoder re-ranker over the top 50 candidates, rewrite or expand vague queries (HyDE), try a stronger embedding model, and tune chunk size and k. Prove every change rather than trusting your instincts: build a golden set of question–answer pairs, measure retrieval with recall@k and MRR, measure generation with faithfulness and answer relevance (RAGAS automates this), and keep a human spot-check. To suppress hallucinations specifically, instruct the model to answer only from context and otherwise say it does not know, require a citation per claim, keep temperature low, and abstain when the top similarity score falls below a threshold.",
        example:
          "Before sign-off, 60 golden questions must hit recall@5 of 0.9 and faithfulness of 0.95; below a 0.35 similarity score the bot answers “not found in the policy set” rather than guessing.",
        diagram: {
          kind: "flow",
          nodes: ["Golden Q&A set", "Run pipeline", "recall@k · faithfulness", "Threshold gate", "Ship or fix"],
          accent: [3],
        },
      },
      {
        title: "AI agents — the loop, the tools, the memory",
        explanation:
          "An agent is an LLM plus tools plus memory plus a loop. It receives a goal, plans the next step, calls a tool by emitting structured JSON like {tool, arguments}, reads the result as an observation, and re-plans — repeating until the goal is met or a limit is hit. That is why agents loop: real goals decompose into steps whose next move depends on the previous result, which also gives them error recovery. Memory is short-term (a scratchpad of steps taken this run) plus long-term (a vector store of facts learned earlier). The contrast with a traditional LLM application is sharp: a classic app is a fixed developer-defined pipeline producing one answer, while an agent chooses its own path at runtime, holds state, and takes real actions in real systems.",
        example:
          "Given a new regulatory order, an agent fetches the text, extracts obligations, checks them against the existing control library, and opens tickets for the gaps — a RAG bot would only have told you what the order says.",
        diagram: {
          kind: "cycle",
          nodes: ["Goal", "Plan", "Tool call", "Observe", "Done?"],
        },
      },
      {
        title: "LangChain vs LangGraph, production components and guardrails",
        explanation:
          "LangChain supplies integrations and composable chains, which is the fastest route to a linear pipeline such as classic RAG. LangGraph models the workflow as a stateful graph with cycles, branching, persistence and human interrupts, which is what agents and long-running approval processes actually need. Rule of thumb: known linear flow → LangChain; must loop, branch or wait for a person → LangGraph. Around either sits the production stack, and the model is maybe 20% of it: an API gateway with authentication, orchestration, the retrieval layer, prompt management, input and output guardrails, an evaluation suite in CI, observability for traces, latency and token cost, human-in-the-loop checkpoints, and least-privilege tool permissions with secrets management. Because agents act at machine speed, governance is mandatory: allow-listed tools, capped iterations and budget, an immutable step-by-step log, a kill switch, and red-teaming before go-live.",
        example:
          "An agent may draft an email to the regulator, but sending requires a manager's click; every plan, tool call and result is written to an append-only log that forms the audit trail.",
        diagram: {
          kind: "flow",
          nodes: ["Gateway + auth", "Orchestration", "Tools + retrieval", "Guardrails", "Human checkpoint", "Audit log"],
          accent: [3, 4],
        },
      },
    ],
    labs: [
      {
        title: "Lab A — temperature changes everything",
        intro: "Run one prompt at three temperatures with a small model and watch stability turn into chaos.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
!pip install -q transformers

from transformers import pipeline, set_seed

gen = pipeline("text-generation", model="distilgpt2")
prompt = "Good data governance in a telecom company means"

for temp in [0.2, 0.7, 1.2]:
    set_seed(42)                       # identical starting point each run
    out = gen(prompt, max_new_tokens=25, do_sample=True,
              temperature=temp, top_k=50, pad_token_id=50256)
    print(f"\\n--- temperature = {temp} ---")
    print(out[0]["generated_text"])`,
        sampleOutput: `--- temperature = 0.2 ---
Good data governance in a telecom company means that the company is responsible for
the use of the data ...

--- temperature = 0.7 ---
Good data governance in a telecom company means the ability to make data more
accessible to the public ...

--- temperature = 1.2 ---
Good data governance in a telecom company means: More accountability-powered
transparency, for random campaign-wing hysteria ...`,
      },
      {
        title: "Lab B — zero-shot vs few-shot vs chain-of-thought",
        intro: "The same task, prompted three ways, with a small instruction-tuned model. This is the comparison interviewers ask you to describe.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
!pip install -q transformers

from transformers import pipeline

gen = pipeline("text2text-generation",
               model="google/flan-t5-base", max_new_tokens=80)

task = ('Sentence: "The telco raised prepaid tariffs by 20% and ARPU '
        'grew." What is the sentiment?')

zero_shot = "Classify the sentiment as positive or negative.\\n" + task

few_shot = """Classify the sentiment as positive or negative.
Sentence: "Subscriber churn hit record highs." Sentiment: negative
Sentence: "Network uptime reached 99.99%." Sentiment: positive
""" + task

cot = ("Classify the sentiment. Think step by step: first list the key "
       "facts, then decide the tone.\\n" + task)

for name, p in [("ZERO-SHOT", zero_shot), ("FEW-SHOT", few_shot),
                ("CHAIN-OF-THOUGHT", cot)]:
    print(f"\\n--- {name} ---")
    print(gen(p)[0]["generated_text"])`,
        sampleOutput: `--- ZERO-SHOT ---
positive

--- FEW-SHOT ---
positive

--- CHAIN-OF-THOUGHT ---
Key facts: tariffs rose 20%; ARPU grew. Rising revenue per user is good for the
telco, so the sentiment is positive.`,
      },
      {
        title: "Lab C — a working RAG retrieval step",
        intro: "Embed seven compliance sentences, embed a question, rank by cosine similarity and print the top 2. This is the retrieval half of RAG in ten lines.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
!pip install -q sentence-transformers

from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")   # 384-dim embeddings

docs = [
  "Telecom operators must maintain lawful interception capability.",
  "AGR dues are a percentage of adjusted gross revenue payable to DoT.",
  "Spectrum trading requires prior approval from the department.",
  "Every tariff plan must be published and non-discriminatory.",
  "Roaming agreements must comply with data localisation rules.",
  "EMF radiation from towers is capped at one-tenth of ICNIRP limits.",
  "Customer grievances must be resolved within charter timelines.",
]
query = "What revenue share does a telco owe the government?"

d = model.encode(docs)
q = model.encode([query])
scores = (q @ d.T)[0] / (np.linalg.norm(q) * np.linalg.norm(d, axis=1))

print(f"Query: {query}\\n")
for rank, i in enumerate(scores.argsort()[::-1][:2], 1):
    print(f"#{rank}  score={scores[i]:.3f}  ->  {docs[i]}")`,
        sampleOutput: `Query: What revenue share does a telco owe the government?

#1  score=0.612  ->  AGR dues are a percentage of adjusted gross revenue payable to DoT.
#2  score=0.441  ->  Telecom operators must maintain lawful interception capability.`,
      },
      {
        title: "Lab D — a minimal agent loop in pure Python",
        intro: "No framework, no API key — just the pattern. Watch goal → plan → tool call → observation → answer print step by step.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
TOOLS = {
    "lookup_regulation": lambda topic: {
        "AGR": "Licence fee payable at 8% of adjusted gross revenue.",
        "spectrum": "Spectrum trading needs prior approval; 2-year lock-in.",
        "tariff": "All tariffs must be published and non-discriminatory.",
    }.get(topic, "No rule found.")
}

def llm_plan(goal):                 # stands in for the LLM reasoning step
    print(f"[agent] Goal: {goal}")
    for topic in ("AGR", "spectrum", "tariff"):
        if topic.lower() in goal.lower():
            return {"thought": f"I need the official rule on {topic}.",
                    "tool": "lookup_regulation", "arg": topic}
    return {"thought": "No tool needed.", "tool": None, "arg": None}

goal = "Check compliance risk: is our AGR payment process aligned with the rules?"

step = llm_plan(goal)                                  # 1) PLAN
print(f"[agent] Thought: {step['thought']}")
print(f"[agent] Tool call: {step['tool']}('{step['arg']}')")
obs = TOOLS[step["tool"]](step["arg"])                 # 2) ACT
print(f"[agent] Observation: {obs}")                   # 3) OBSERVE
print("[agent] Final answer:", obs,                    # 4) RESPOND
      "-> map each requirement to an internal control test.")`,
        sampleOutput: `[agent] Goal: Check compliance risk: is our AGR payment process aligned with the rules?
[agent] Thought: I need the official rule on AGR.
[agent] Tool call: lookup_regulation('AGR')
[agent] Observation: Licence fee payable at 8% of adjusted gross revenue.
[agent] Final answer: Licence fee payable at 8% of adjusted gross revenue. -> map each requirement to an internal control test.

LangGraph adds state, retries and human interrupts around exactly this loop.`,
      },
    ],
    resources: [
      {
        label: "Ketan Sagare — Gen AI Engineer interview experience (LinkedIn)",
        url: "https://www.linkedin.com/posts/ketan-sagare-15b4a9157_kpmg-interview-experience-gen-ai-engineer-share-7517984760242290688-UJpN",
        note: "A full real interview: RAG architecture, chunking, retrieval and agents.",
      },
      {
        label: "Abhishek Tiwari — Data Science / GenAI interview questions (LinkedIn)",
        url: "https://www.linkedin.com/posts/abhishek-tiwari786_datascience-artificialintelligence-machinelearning-activity-7313428558561927169-4Kzg",
        note: "Embedding models, vector databases, MMR and hybrid search questions.",
      },
      {
        label: "Dataford — AI Engineer interview guide 2026",
        url: "https://dataford.io/interview-guides/kpmg/ai-engineer",
        note: "Hallucination-safe RAG design, embedding trade-offs, agent components.",
      },
      {
        label: "LangGraph documentation — agent architectures",
        url: "https://langchain-ai.github.io/langgraph/concepts/agentic_concepts/",
        note: "Official explanation of agent loops, state, tools and human-in-the-loop.",
      },
      {
        label: "RAGAS — evaluation framework for RAG pipelines",
        url: "https://docs.ragas.io/",
        note: "Faithfulness, answer relevance and context recall — the metrics to quote.",
      },
    ],
    selfCheck: [
      { q: "Name the four stages of a RAG pipeline.", a: "Chunk → embed → retrieve → generate (indexing offline, retrieval and generation per query)." },
      { q: "What does temperature 0 vs 1.2 do?", a: "Near 0 the most likely token is picked every time — stable and factual. At 1.2 the distribution flattens, so rare tokens appear — creative but error-prone." },
      { q: "What does MMR add on top of similarity search?", a: "Diversity. It re-ranks results to balance relevance against redundancy so the top-k is not near-duplicate chunks." },
      { q: "Give one retrieval metric and one generation metric for RAG.", a: "Retrieval: recall@k. Generation: faithfulness — is every claim supported by the retrieved context." },
      { q: "Why do agents loop?", a: "Goals need multiple steps and each step depends on the previous result, so the agent plans, acts, observes and re-plans until done or a limit is hit." },
      { q: "LangChain or LangGraph for a workflow that pauses for manager approval?", a: "LangGraph — it supports stateful graphs with cycles, persistence and human interrupts." },
      { q: "Two defences against prompt injection?", a: "Treat retrieved text as data not instructions (delimiters plus an explicit rule), and give tools least-privilege allow-listed permissions; output filtering and canary tests also count." },
    ],
  },

  // ═══════════════════════════ MODULE 03 ═══════════════════════════
  {
    id: "ml",
    num: "03",
    title: "Machine Learning in Practice",
    tagline: "Metrics, imbalance, overfitting and the model lifecycle",
    time: "~25 min theory + 10 min practice",
    covers: [
      "Precision, recall, F1",
      "Imbalanced datasets",
      "Bias–variance & overfitting",
      "Validation strategy",
      "End-to-end project narrative",
    ],
    overview:
      "Module 01 explained what models are; this module is about judging them honestly. These are the rapid-fire questions almost every panel opens with — how you measure a model, what you do when 99% of the data is one class, why training accuracy lies, and how a model travels from notebook to production. Short, confident, example-backed answers win here; rambling loses the room. Nothing in this module repeats Module 01: there is no network anatomy and no algorithm tour, only evaluation and process.",
    why:
      "Every applied AI role is ultimately judged on measurement. The moment a model misses real fraud or floods a team with false alarms, somebody non-technical will ask you to explain why — in plain words, with numbers. Interviewers use precision versus recall as a one-minute proxy for whether you have actually shipped something or only followed tutorials.",
    concepts: [
      {
        title: "Precision, recall and F1 — with numbers",
        explanation:
          "Precision answers “of everything I flagged as positive, how much was truly positive?” Recall answers “of all the real positives out there, how many did I catch?” They pull against each other: lowering your decision threshold catches more real cases (recall up) but drags in more false alarms (precision down). F1 is the harmonic mean of the two — a single number that collapses if either side is weak. Accuracy, by contrast, is the share of all predictions that were right, which is nearly useless when classes are skewed. Always quote the confusion matrix underneath: true positives, false positives, true negatives, false negatives.",
        example:
          "You flag 100 calls as fraud and 80 really are: precision 0.80. There were 200 fraudulent calls in total and you caught 80: recall 0.40. F1 ≈ 0.53 — and now you can argue intelligently about where to set the threshold.",
        diagram: {
          kind: "flow",
          nodes: ["Of predicted + → Precision", "Of actual + → Recall", "Harmonic mean → F1"],
        },
      },
      {
        title: "Imbalanced datasets",
        explanation:
          "A dataset is imbalanced when one class dominates — fraud is often well under 1% of transactions. The trap is that a model predicting “never fraud” scores over 99% accuracy while catching nothing at all. Handle it on three fronts. Data: oversample the minority (SMOTE creates synthetic neighbours) or undersample the majority. Algorithm: set class_weight='balanced' so mistakes on rare cases cost more. Decision: tune the threshold away from the default 0.5, and always split with stratification so the rare class appears in both train and test. Then judge with recall, F1 and PR-AUC rather than accuracy or even ROC-AUC, which looks flattering under heavy skew.",
        example:
          "SIM-box fraud is about 0.2% of calls. Class weights plus a threshold moved to 0.3 lift recall from 40% to 85% at a false-alarm rate the investigations team can still absorb.",
        diagram: {
          kind: "flow",
          nodes: ["Skew 99:1", "Resample or re-weight", "Tune threshold", "Score with recall / PR-AUC"],
          accent: [3],
        },
      },
      {
        title: "Bias–variance tradeoff and overfitting",
        explanation:
          "Total error decomposes into bias, variance and irreducible noise. High bias means the model is too simple and misses genuine patterns — underfitting, where training and test scores are both poor. High variance means the model memorised the training data including its noise — overfitting, whose signature is training accuracy far above validation accuracy. The cures are well known: more data, a simpler model, regularization (L1 for sparsity, L2 for shrinkage, dropout in networks), early stopping, and ensembling. The classic beginner mistake is tuning against the test set until it silently becomes a second training set.",
        example:
          "A churn model hits 99% on training data but 71% on the held-out month — it learned last quarter's noise. L2 regularization plus cross-validation closes the gap to a believable 78%/76%.",
        diagram: {
          kind: "flow",
          nodes: ["Too simple → underfit", "Balanced → generalises", "Too complex → overfit"],
          accent: [1],
        },
      },
      {
        title: "Validation strategy you can defend",
        explanation:
          "A single train/test split is fragile on small data, so k-fold cross-validation trains k times on rotating folds and averages the score, giving both a mean and a variance. Use stratified folds for imbalanced classification so each fold keeps the class ratio. For anything time-ordered, never shuffle: use a time-based split or rolling-origin validation, because shuffling lets the model peek at the future — the most common form of data leakage. Keep a final hold-out set that you touch exactly once, and fit scalers and encoders inside the training fold only.",
        example:
          "Predicting next month's churn from billing history demands a time split: train on January–September, validate on October, test on November. A shuffled split would score beautifully and fail in production.",
        diagram: {
          kind: "flow",
          nodes: ["Full data", "k-fold / time split", "Mean ± variance score", "Touch hold-out once"],
        },
      },
      {
        title: "The model lifecycle and the end-to-end story",
        explanation:
          "Models have a lifecycle: frame the problem, collect and clean data, explore it, build a simple baseline, iterate on features and hyperparameters, validate with the right metric, deploy, then monitor and retrain. Interviewers ask you to walk an end-to-end project because it reveals whether you understand the whole chain or only the modelling cell of a notebook. Always start with a dumb baseline — logistic regression, or even a rule — because it proves the metric and gives the improvement something to be measured against. Deployment and monitoring are expanded in Module 05; here the point is simply that the story has all these beats.",
        example:
          "A clean narrative: “Problem: reduce churn. Data: 18 months of billing. Baseline logistic regression F1 0.58. Gradient boosting with tenure features F1 0.71. Deployed behind a small API. Monthly drift check.”",
        diagram: {
          kind: "cycle",
          nodes: ["Frame", "Baseline", "Iterate", "Validate", "Deploy & monitor"],
        },
      },
    ],
    labs: [
      {
        title: "Precision, recall and F1 on imbalanced data",
        intro:
          "Skew the breast-cancer dataset to mimic fraud-like imbalance, then compare a plain logistic regression against one with balanced class weights.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, classification_report
import numpy as np

X, y = load_breast_cancer(return_X_y=True)
# simulate imbalance: keep all of class 1, only 1 in 3 of class 0
idx = [i for i in range(len(y)) if y[i] == 1 or (y[i] == 0 and i % 3 == 0)]
X, y = X[idx], y[idx]
print("Class counts after skewing:", np.bincount(y))

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25,
                                      random_state=42, stratify=y)

plain = LogisticRegression(max_iter=5000).fit(Xtr, ytr)
weighted = LogisticRegression(max_iter=5000,
                              class_weight="balanced").fit(Xtr, ytr)

for name, m in [("Plain model", plain), ("Balanced model", weighted)]:
    print(f"\\n===== {name} =====")
    print("Confusion matrix:\\n", confusion_matrix(yte, m.predict(Xte)))
    print(classification_report(yte, m.predict(Xte), digits=3))`,
        sampleOutput: `Class counts after skewing: [71 357]

===== Plain model =====
Confusion matrix:
 [[ 16   2]
  [  3  86]]

===== Balanced model =====
Minority-class recall improves (fewer missed positives) at the cost of a few extra
false alarms — the classic imbalance trade-off, now visible in numbers.`,
      },
    ],
    resources: [
      {
        label: "Knok — Machine Learning Engineer interview walkthrough",
        url: "https://knok.work",
        note: "On the site, search: “Machine Learning Engineer Interview walkthrough”.",
      },
      {
        label: "InterviewQuestions.app — interview questions and answers 2026",
        url: "https://interviewquestions.app",
        note: "On the site, search: “AI engineer interview questions 2026”.",
      },
      {
        label: "scikit-learn — model evaluation user guide",
        url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
        note: "The authoritative reference for precision, recall, F1 and PR curves.",
      },
    ],
    selfCheck: [
      { q: "Why is accuracy misleading on imbalanced data?", a: "Predicting the majority class every time yields high accuracy while catching zero minority cases — 99% accuracy, 0% fraud found." },
      { q: "Precision vs recall in one line each.", a: "Precision: of predicted positives, how many were right. Recall: of actual positives, how many we found." },
      { q: "What is the signature of overfitting?", a: "Training score far above validation score — the model memorised noise instead of learning the pattern." },
      { q: "Why must time-series data never be shuffled before splitting?", a: "Shuffling leaks future information into training, producing scores that collapse in production. Use a time-based or rolling-origin split." },
      { q: "Name three ways to handle class imbalance.", a: "Resampling (SMOTE/undersampling), class weights, and threshold tuning — judged with recall, F1 or PR-AUC." },
    ],
  },

  // ═══════════════════════════ MODULE 04 ═══════════════════════════
  {
    id: "dataeng",
    num: "04",
    title: "Data Engineering for AI",
    tagline: "Unstructured PDFs, SCDs, duplicates and ingestion pipelines",
    time: "~20 min theory + 10 min practice",
    covers: [
      "PDF & OCR extraction",
      "Slowly Changing Dimensions",
      "Duplicate detection & survivorship",
      "RAG ingestion pipelines",
      "Data quality gates",
    ],
    overview:
      "AI systems are roughly 20% model and 80% data plumbing. This module covers the data questions interviewers actually ask: pulling usable text out of messy and scanned PDFs, tracking history properly with Slowly Changing Dimensions, finding and removing duplicate records, and wiring ingestion pipelines that feed a RAG index with clean, traceable data. Chunking and embedding themselves were covered in Module 01, so here we focus purely on everything that happens before and around them.",
    why:
      "Real AI work lives in documents — scanned agreements, PDF circulars, billing extracts. If ingestion is dirty, every downstream answer is wrong and indefensible in front of a reviewer, no matter how good the model is. Data quality is effectively an audit assertion, and these questions test whether you treat it that way or assume somebody else will.",
    concepts: [
      {
        title: "Extracting text from unstructured and scanned PDFs",
        explanation:
          "First classify the file. A digital PDF carries a real text layer, so PyMuPDF extracts text quickly and pdfplumber or Camelot recover table structure. A scanned PDF is just images, so it needs OCR — Tesseract is the free standard — and quality improves sharply with pre-processing such as deskewing, denoising and binarisation. Charts and figures that matter can be captioned by a vision model or stored as images linked to their page. Whatever the route, finish with cleaning (strip repeated headers and footers, repair hyphenated line breaks, normalise whitespace) and attach metadata — document name, page, clause — so anything built on top stays citable.",
        example:
          "Licence grant letters arrive as scans. OCR plus deskewing produces clause-level text, and each extracted passage carries its licence number and page so a later answer can point to the exact source.",
        diagram: {
          kind: "flow",
          nodes: ["PDF", "Text layer or image?", "Parser or OCR", "Clean + metadata", "Ready for indexing"],
          accent: [1],
        },
      },
      {
        title: "Slowly Changing Dimensions (SCD)",
        explanation:
          "Dimension data changes slowly — a customer's plan, a tariff's price, an employee's department — and the SCD type defines how you record that change. Type 1 overwrites the old value: simple, but history is gone forever. Type 2 inserts a new row carrying effective-from and effective-to dates plus a current flag, preserving the full timeline; this is the audit standard and the expected interview answer. Type 3 keeps only the previous value in an extra column, which is limited but cheap. Type 2 is what lets anyone reconstruct exactly what the business believed on a given date.",
        example:
          "A corporate plan moves from ₹499 to ₹599 on 1 June. With Type 2 both rows survive with their date ranges, so a billing dispute covering May can be re-created precisely.",
        diagram: {
          kind: "flow",
          nodes: ["Attribute changes", "Type 1: overwrite", "Type 2: new row + dates", "Type 3: prior-value column"],
          accent: [2],
        },
      },
      {
        title: "Finding and removing duplicate records",
        explanation:
          "Exact duplicates share a key and are easy: GROUP BY the key HAVING COUNT(*) > 1 in SQL, or df.duplicated() in pandas. Fuzzy duplicates are the real work — “Vodafone Idea”, “vodafone idea ltd.” and “Vodafone-Idea Limited” are one company. Normalise first (lowercase, trim, strip punctuation and legal suffixes), then compare with a similarity measure, using blocking on a coarse key like city or first letters so you avoid comparing every pair with every other. Deletion needs a survivorship rule — keep the most recent or most complete record, commonly via a ROW_NUMBER() window — and every removed row should land in a quarantine table with a reason code rather than vanishing.",
        example:
          "Two parsers loaded the same circular with different casing. After normalisation, deduplication on (document id, clause) keeps the parse with fewer nulls and quarantines the other for review.",
        diagram: {
          kind: "flow",
          nodes: ["Raw records", "Normalise keys", "Exact + fuzzy match", "Survivorship rule", "Quarantine log"],
        },
      },
      {
        title: "Ingestion pipelines that feed a RAG index",
        explanation:
          "A production ingestion pipeline runs: sources → extract → validate → deduplicate → chunk → embed → index, with lineage recorded at every hop. Content hashing gives cheap change detection so re-runs only re-index documents that actually changed, which keeps embedding costs sane. Files that fail parsing go to a dead-letter queue and raise an alert instead of being silently dropped. Schedule the job, make it idempotent so a re-run cannot create duplicates, and version the index so you can roll back to yesterday's state if a bad batch lands.",
        example:
          "A nightly job pulls new circulars, hashes each file, skips the unchanged ones, re-indexes only the deltas, and logs how many documents entered, failed and were quarantined.",
        diagram: {
          kind: "flow",
          nodes: ["Sources", "Extract + validate", "Dedupe + hash", "Chunk + embed", "Index + lineage"],
          accent: [4],
        },
      },
      {
        title: "Data quality gates",
        explanation:
          "Quality is checkable along five dimensions: completeness, uniqueness, validity, consistency and timeliness. Encode them as automated assertions — Great Expectations, or simple asserts with counts — that fail the pipeline loudly and visibly. Distinguish hard failures, which stop the run, from soft failures, which are usable but incomplete and belong in a manual-review queue rather than the bin. Publishing those counts as a small daily report is what turns data quality from a claim into evidence.",
        example:
          "Filings missing an amount are not deleted; they are flagged needs_review so a human checks the original scan. Six rows in: four clean, two reviewed, zero silently lost.",
        diagram: {
          kind: "flow",
          nodes: ["Incoming data", "Quality assertions", "Pass → warehouse", "Soft fail → review queue"],
          accent: [3],
        },
      },
    ],
    labs: [
      {
        title: "Clean a dirty document-extraction table",
        intro:
          "Simulate the output of parsing unstructured filings: normalise names, deduplicate, flag incomplete rows for manual review, and print before/after counts.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
import pandas as pd

# simulated output of parsing unstructured PDF filings
rows = [
    ("AGR-2024-Q1", "Vodafone Idea", 1250.0),
    ("AGR-2024-Q1", "Vodafone Idea", 1250.0),      # exact duplicate
    ("AGR-2024-Q1", "vodafone idea", 1250.0),      # duplicate, messy casing
    ("SPECTRUM-2023", "Bharti Airtel", None),      # image table failed OCR
    ("TARIFF-2024", "Reliance Jio", 98.5),
    ("EMF-2024", "BSNL", None),                    # missing value
]
df = pd.DataFrame(rows, columns=["filing", "operator", "amount_cr"])
print("BEFORE:", len(df), "rows")
print(df, "\\n")

df["operator"] = df["operator"].str.strip().str.title()     # normalise
df = df.drop_duplicates(subset=["filing", "operator"])      # dedupe
df["needs_review"] = df["amount_cr"].isna()                 # flag gaps
df["amount_cr"] = df["amount_cr"].fillna(-1)                # sentinel

print("AFTER:", len(df), "rows,",
      int(df["needs_review"].sum()), "flagged for manual review")
print(df)`,
        sampleOutput: `BEFORE: 6 rows
          filing       operator  amount_cr
0    AGR-2024-Q1  Vodafone Idea    1250.0
...

AFTER: 4 rows, 2 flagged for manual review
          filing       operator  amount_cr  needs_review
0    AGR-2024-Q1  Vodafone Idea    1250.0         False
1  SPECTRUM-2023  Bharti Airtel      -1.0          True
...`,
      },
    ],
    resources: [
      {
        label: "Ketan Sagare — Gen AI Engineer interview experience (LinkedIn)",
        url: "https://www.linkedin.com/posts/ketan-sagare-15b4a9157_kpmg-interview-experience-gen-ai-engineer-share-7517984760242290688-UJpN",
        note: "The original report containing the PDF-processing, SCD and duplicates questions.",
      },
      {
        label: "PyMuPDF documentation — text and image extraction",
        url: "https://pymupdf.readthedocs.io/en/latest/the-basics.html",
        note: "The fastest practical way to pull text, tables and images out of PDFs.",
      },
      {
        label: "Great Expectations — data quality testing",
        url: "https://docs.greatexpectations.io/docs/",
        note: "How to turn data quality rules into automated, evidenced pipeline gates.",
      },
    ],
    selfCheck: [
      { q: "What is a Type 2 SCD?", a: "A new row for every change, with effective-from/to dates and a current flag — full history, audit-friendly." },
      { q: "First step when a PDF has no text layer?", a: "OCR it (Tesseract), ideally after deskewing and denoising, to turn page images into text." },
      { q: "Two ways to find duplicates?", a: "Exact matching on a key, and fuzzy matching after normalising case, whitespace and punctuation — with blocking to limit comparisons." },
      { q: "Why store lineage metadata on every chunk?", a: "So any AI answer can cite the exact source document and page, which makes it auditable and debuggable." },
      { q: "What is a dead-letter queue in an ingestion pipeline?", a: "A holding area for records or files that failed processing, so failures are visible and replayable instead of silently dropped." },
    ],
  },

  // ═══════════════════════════ MODULE 05 ═══════════════════════════
  {
    id: "mlops",
    num: "05",
    title: "MLOps & AI Governance",
    tagline: "Ship it, watch it, version it, control it",
    time: "~25 min theory + 10 min practice",
    covers: [
      "Batch vs real-time deployment",
      "Data drift & concept drift",
      "Experiment tracking & model registry",
      "AI risk frameworks",
      "Bias & fairness testing",
      "GenAI security controls",
    ],
    overview:
      "Getting a model to production is chapter one; living with it is the rest of the book. MLOps covers deployment patterns, monitoring for drift, versioning experiments and models, and retraining pipelines. Governance wraps all of it in accountability: risk frameworks, fairness testing, security controls and audit trails. Module 03 ended at “deploy and monitor” — this module is that sentence expanded into an operating model.",
    why:
      "Governance, risk and compliance skills are what separate a strong analyst from a notebook-only coder. Interviewers ask how you version, monitor and govern models because organisations in regulated industries must prove their AI is controlled, not merely accurate. A candidate who can name NIST AI RMF, describe a drift threshold and insist on human-in-the-loop for irreversible actions is instantly more credible.",
    concepts: [
      {
        title: "Deployment patterns: batch, real-time and safe rollout",
        explanation:
          "Batch deployment scores large volumes on a schedule — nightly churn scores, monthly reconciliations — and favours throughput over latency. Real-time deployment serves a prediction per request within milliseconds behind an API, which constrains model size and feature lookups. Streaming sits between them for continuous event scoring. Roll out safely in stages: shadow mode runs the new model silently beside the current one and compares outputs on live traffic; a canary release sends a small percentage of real traffic to the new version; then you ramp up, with rollback always one switch away.",
        example:
          "A billing-fraud check must answer inside 100 ms during a transaction, so it is real-time. The monthly revenue-assurance reconciliation across every circle runs overnight as a batch job.",
        diagram: {
          kind: "flow",
          nodes: ["Trained model", "Batch or real-time?", "Shadow", "Canary", "Full rollout"],
          accent: [2, 3],
        },
      },
      {
        title: "Monitoring: data drift versus concept drift",
        explanation:
          "Data drift means the input distribution has moved away from what the model trained on; you detect it statistically without needing labels, using Population Stability Index (PSI above roughly 0.2 signals a real shift) or a Kolmogorov–Smirnov test against a baseline window. Concept drift means the relationship between inputs and outputs has changed — the world's rules moved — and you only see it as accuracy decay once ground-truth labels arrive, which is why proxy metrics matter when labels lag. Monitor rolling statistics, set thresholds that page a named owner, and write a runbook: investigate first, then recalibrate the threshold or retrain.",
        example:
          "After a tariff hike, usage features shift and the PSI alarm fires around day 40. Retraining on post-hike data restores performance; nobody had to wait for a quarterly review to notice.",
        diagram: {
          kind: "flow",
          nodes: ["Live inputs", "Compare to baseline (PSI/KS)", "Threshold breach", "Alert owner", "Retrain or recalibrate"],
          accent: [2],
        },
      },
      {
        title: "Experiment tracking, model registry and retraining",
        explanation:
          "Every training run should log its hyperparameters, metrics, code commit, data version and artifacts — MLflow and Weights & Biases exist for exactly this, and DVC versions the datasets. Trained models are then promoted through a registry with explicit stages (staging → production), and a production model is never overwritten in place, which is what makes instant rollback possible. Retraining is triggered by a schedule, a drift alarm or a business change, and it must reuse the same pipeline code so results stay reproducible. Pin dependencies and fix random seeds, or none of the above is actually reproducible.",
        example:
          "Model v14 is promoted only after beating v13 on recall in staging. When drift degrades v14 two months later, the team rolls back to v13 within minutes while v15 trains.",
        diagram: {
          kind: "cycle",
          nodes: ["Track experiment", "Register model", "Promote to prod", "Monitor", "Retrain or roll back"],
        },
      },
      {
        title: "AI risk management frameworks",
        explanation:
          "Know the vocabulary. The NIST AI Risk Management Framework organises work into four functions — govern, map, measure, manage. ISO/IEC 42001 defines an auditable AI management system, the organisational equivalent of ISO 27001 for AI. The EU AI Act sorts systems into risk tiers (unacceptable, high, limited, minimal) with legal obligations attached to each, and professional-services firms publish their own Trusted AI pillars on top. In practice the method is the same everywhere: inventory every AI use case, classify it by risk, map the controls that tier requires, and produce evidence that those controls actually operate.",
        example:
          "A chatbot answering tariff FAQs is limited risk. An agent that adjusts customer bills is high risk, which triggers documentation, bias testing, human approval and ongoing monitoring.",
        diagram: {
          kind: "flow",
          nodes: ["AI use case", "Risk tier", "Required controls", "Evidence + sign-off"],
          accent: [1, 3],
        },
      },
      {
        title: "Bias, fairness and explainability",
        explanation:
          "Bias enters through unrepresentative data, historical labels that encode past discrimination, and even the choice of objective. Make it visible by slicing every metric across groups — region, gender, age band — and computing disparity ratios rather than reporting one global number. Mitigate by re-sampling or re-weighting, or by adjusting thresholds where it is lawful to do so, and re-test afterwards. Pair this with explainability: SHAP or feature-importance values let you tell a customer or a regulator why a decision was made, and a model card records the intended use, the tested slices and the known limitations.",
        example:
          "A credit-limit model for prepaid users is evaluated circle by circle, with recall parity required within 5% before sign-off; SHAP values accompany every adverse decision.",
        diagram: {
          kind: "flow",
          nodes: ["Predictions", "Slice by group", "Disparity found?", "Mitigate + document", "Human decides"],
        },
      },
      {
        title: "Security and responsible AI in regulated settings",
        explanation:
          "The GenAI security checklist is concrete. Redact or pseudonymise personal data before any prompt leaves your boundary, and check vendor data-retention and training terms before sending anything at all. Defend against prompt injection and treat retrieved content as untrusted. Scope tool credentials to least privilege so a tricked agent can only reach what it genuinely needs. Log every model call and agent action immutably, because that log is your audit trail. Then add the human layer: approval gates for irreversible or externally visible actions, periodic red-teaming, and an incident runbook that names who does what when the model misbehaves.",
        example:
          "Subscriber records are pseudonymised before any external API call, agents hold read-only database credentials, and compliance reviews the immutable action log monthly.",
        diagram: {
          kind: "flow",
          nodes: ["Sensitive data", "Redact", "Guarded model call", "Least-privilege tools", "Immutable log"],
          accent: [1, 4],
        },
      },
    ],
    labs: [
      {
        title: "Simulate production drift detection",
        intro:
          "Generate sixty days of predictions, inject a distribution shift halfway through, and catch it with a rolling mean against a three-sigma baseline — the same logic as a real drift monitor.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
import numpy as np, pandas as pd

np.random.seed(7)
preds = np.concatenate([
    np.random.normal(0.30, 0.03, 30),   # days 0-29: healthy model
    np.random.normal(0.45, 0.03, 30),   # days 30-59: inputs drifted!
])
s = pd.Series(preds, index=np.arange(60))
rolling = s.rolling(7).mean()                 # 7-day rolling mean
baseline, sigma = s[:30].mean(), s[:30].std()
limit = baseline + 3 * sigma                  # 3-sigma alert line

print(f"Baseline mean: {baseline:.3f}   Alert limit: {limit:.3f}\\n")
print("Day   RollingMean   Status")
for d in range(6, 60, 9):
    status = "DRIFT ALERT" if rolling[d] > limit else "ok"
    print(f"{d:>3}   {rolling[d]:.3f}        {status}")

alerts = rolling[rolling > limit]
print(f"\\nFirst drift alert on day {alerts.index[0]} "
      f"(drift was injected on day 30)")`,
        sampleOutput: `Baseline mean: 0.298   Alert limit: 0.380

Day   RollingMean   Status
  6   0.289        ok
 15   0.301        ok
 24   0.312        ok
 33   0.371        ok
 42   0.443        DRIFT ALERT
 51   0.451        DRIFT ALERT

First drift alert on day 37 (drift was injected on day 30)`,
      },
    ],
    resources: [
      {
        label: "NIST — AI Risk Management Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
        note: "The govern–map–measure–manage framework everyone cites. Skim the core functions.",
      },
      {
        label: "Knok — Machine Learning Engineer interview walkthrough",
        url: "https://knok.work",
        note: "On the site, search: “Machine Learning Engineer Interview walkthrough”.",
      },
      {
        label: "Board oversight of GenAI (Board Leadership Center)",
        url: "https://kpmg.com/us/en/board-leadership/articles/2024/board-oversight-genai.html",
        note: "How boards govern GenAI — guardrails, risk and the questions directors ask.",
      },
      {
        label: "Oversight of data-related risks (Board Leadership Center)",
        url: "https://kpmg.com/us/en/board-leadership/articles/2024/oversight-data-related-risks.html",
        note: "Data governance, GenAI and cybersecurity oversight in one short paper.",
      },
    ],
    selfCheck: [
      { q: "Data drift vs concept drift?", a: "Data drift: the input distribution changes. Concept drift: the input→output relationship changes, showing up as accuracy decay." },
      { q: "What PSI value usually signals meaningful drift?", a: "Above roughly 0.2 (0.1–0.2 is a moderate shift worth watching)." },
      { q: "What is shadow deployment?", a: "Running the new model silently alongside production on live traffic, comparing outputs without affecting users." },
      { q: "Name one AI risk framework.", a: "NIST AI RMF — ISO/IEC 42001 or the EU AI Act also count." },
      { q: "Why least-privilege permissions for agent tools?", a: "It limits the blast radius if the model is tricked or fails — a compromised agent can only touch what it truly needs." },
    ],
  },

  // ═══════════════════════════ MODULE 06 ═══════════════════════════
  {
    id: "industry",
    num: "06",
    title: "Industry Context — AI in Telecom Compliance",
    tagline: "Applying the whole stack to a heavily regulated sector",
    time: "~20 min theory + 10 min practice",
    covers: [
      "Telecom regulatory landscape",
      "RegTech & obligation mapping",
      "Revenue assurance & fraud",
      "Published industry case studies",
      "Governing agentic AI in telecom",
    ],
    overview:
      "The final module takes everything from Modules 01–05 and points it at one of the most regulated industries on earth. Telecom runs on tariff rules, licence conditions, revenue-share dues, spectrum obligations and quality-of-service norms — thousands of pages that change constantly. That makes it the ideal showcase for AI: the work is document-heavy, rule-heavy and deadline-heavy, which is exactly what retrieval, extraction and agents are good at.",
    why:
      "Interviewers love candidates who can connect AI to a real regulated industry instead of speaking in abstractions. Telecom is the richest available example: global operators have publicly deployed AI-driven compliance programmes, and published assurance frameworks exist for governing agentic AI in telecom. Being able to name one real case study and describe its pattern separates you from every candidate who only studied generic GenAI.",
    concepts: [
      {
        title: "The telecom regulatory landscape",
        explanation:
          "In India the regulator TRAI governs tariffs, quality of service and consumer protection; the Department of Telecommunications (DoT) issues licences, allocates spectrum and sets security conditions; and TDSAT adjudicates disputes. The heavyweight obligations are licence fees computed on Adjusted Gross Revenue (AGR), spectrum payment and usage rules, mandatory tariff publication, EMF emission norms, data localisation and lawful interception. The scale is the problem: pan-India operators track conditions across 22 licensed service areas, where a single missed clause can mean penalties or worse.",
        example:
          "The AGR definition dispute became India's largest telecom litigation precisely because a single revenue definition cascaded into billions in dues — a vivid illustration of why obligation tracking matters.",
        diagram: {
          kind: "flow",
          nodes: ["TRAI · DoT · TDSAT", "Circulars + licences", "Obligation register", "Controls", "Filings + evidence"],
        },
      },
      {
        title: "RegTech: turning regulations into obligations automatically",
        explanation:
          "The highest-value pattern is a pipeline: ingest the circular, extract the obligations clause by clause, map each one to the internal control library, produce a gap list with owners and deadlines, and chase the evidence. Named-entity recognition pulls out regulators, clause numbers and dates; classification separates binding obligations from guidance; retrieval answers “what applies to us after this order?” in minutes instead of weeks. The value is not just speed — it is consistency, because the same reading is applied every time, and traceability from rule to control to evidence.",
        example:
          "After a new direction is published, the copilot lists impacted obligations and which controls already cover them within minutes — work that previously consumed a six-week manual review cycle.",
        diagram: {
          kind: "flow",
          nodes: ["New regulation", "Extract obligations", "Map to controls", "Gap list + owners", "Evidence trail"],
          accent: [1],
        },
      },
      {
        title: "Revenue assurance and fraud management",
        explanation:
          "Revenue assurance hunts for leakage between services delivered and revenue actually collected: rating versus billing mismatches, unbilled usage, interconnect settlement errors and roaming discrepancies. Fraud management is its adversarial cousin, running anomaly detection over call detail records to catch SIM-box bypass, subscription fraud and IRSF. Both are perfect agent territory because the work chains many small checks across many systems — query, compare, flag, escalate — and both demand explainability, since every disputed rupee may have to be justified later.",
        example:
          "An agent reconciles rated usage against billed amounts nightly, opens investigation tickets with the evidence attached, and may suspend a suspicious SIM automatically because that action is reversible.",
        diagram: {
          kind: "flow",
          nodes: ["CDR + billing streams", "Anomaly detection", "Reconcile & compare", "Ticket with evidence", "Human decision"],
          accent: [4],
        },
      },
      {
        title: "What published industry deployments look like",
        explanation:
          "Two public references are worth memorising. First, the Telstra case study: the operator worked with a global professional-services firm to deploy an AI-powered compliance solution on an enterprise workbench platform, with agent-to-agent communication, to simplify regulations, predict risks and optimise compliance processes. Second, the Business Assurance Framework for Agentic AI presented at the 2026 telecom RAFM summit, which addresses how to assure agents operating in revenue assurance and fraud management. The shared pattern across both: ingest regulations, map obligations, predict risk, automate workflow, and keep a human assurance layer on top.",
        example:
          "In an interview, describe the pattern rather than the brand: “regulations in, obligations mapped to controls, risks predicted early, workflows automated — with assurance and humans retained on top.”",
        diagram: {
          kind: "flow",
          nodes: ["Enterprise platform", "Ingest + simplify regulations", "Predict risk", "Automate workflow", "Human assurance"],
          accent: [4],
        },
      },
      {
        title: "Governing agentic AI in a telecom environment",
        explanation:
          "The stakes are unusually high. Call detail records are personal data subject to localisation rules, so redaction comes before any external model call. Billing-affecting decisions must be explainable to a regulator or tribunal, so every model call and agent action is logged immutably. Agents operating across network and IT systems get least-privilege, scoped credentials, and actions are triaged by reversibility: a reversible action such as flagging a SIM can run automatically, while a regulatory filing or a customer refund requires authorised human sign-off. Any external or cloud model is risk-assessed for data retention before it ever touches subscriber data.",
        example:
          "The fraud agent may suspend a SIM on its own because that is reversible; a waiver on a penalty filing goes to a named approver first, with the full reasoning chain attached.",
        diagram: {
          kind: "flow",
          nodes: ["Proposed action", "Reversible?", "Auto-execute or approve", "Immutable log", "Regulator-ready audit"],
          accent: [1, 2],
        },
      },
    ],
    labs: [
      {
        title: "Classify regulatory sentences with a small LLM",
        intro:
          "Zero-shot classification with a compact MNLI model: label six telecom sentences as compliance, risk or governance, then check accuracy against the true labels.",
        code: `# Paste this into a new Google Colab notebook. Runtime: CPU. No GPU needed.
!pip install -q transformers

from transformers import pipeline

clf = pipeline("zero-shot-classification",
               model="valhalla/distilbart-mnli-12-3")
labels = ["compliance", "risk", "governance"]

sentences = [
    ("The operator must file its AGR self-assessment quarterly.", "compliance"),
    ("Delayed spectrum payments expose the company to licence cancellation.", "risk"),
    ("The board audit committee reviews AI model approvals each quarter.", "governance"),
    ("All tariff plans must be published on the website.", "compliance"),
    ("Unmonitored agents could send incorrect filings to the regulator.", "risk"),
    ("A model inventory assigns an owner to every deployed model.", "governance"),
]

correct = 0
for text, truth in sentences:
    top = clf(text, labels)["labels"][0]
    correct += top == truth
    print(f"{text[:52]:<54} -> {top:<11} (true: {truth})")
print(f"\\nAccuracy: {correct}/{len(sentences)}")`,
        sampleOutput: `The operator must file its AGR self-assessment quar    -> compliance  (true: compliance)
Delayed spectrum payments expose the company to lic    -> risk        (true: risk)
The board audit committee reviews AI model approval    -> governance  (true: governance)
All tariff plans must be published on the website.     -> compliance  (true: compliance)
Unmonitored agents could send incorrect filings to     -> risk        (true: risk)
A model inventory assigns an owner to every deployed   -> governance  (true: governance)

Accuracy: 6/6   (small models do mislabel — which is exactly why we measure)`,
      },
    ],
    resources: [
      {
        label: "Telstra blazes the trail with AI-driven compliance (case study)",
        url: "https://kpmg.com/au/en/services/consulting.html",
        note: "A real deployment: AI simplifying regulations, predicting risks and optimising compliance.",
      },
      {
        label: "Global tech report 2026: Telecommunications (PDF)",
        url: "https://assets.kpmg.com/content/dam/kpmgsites/sg/pdf/2026/07/2026-global-tech-report-telecom.pdf.coredownload.inline.pdf",
        note: "Where telecom AI investment and value are heading — useful interview statistics.",
      },
      {
        label: "Business Assurance Framework for Agentic AI in telecom (PDF)",
        url: "https://assets.kpmg.com/content/dam/kpmgsites/ke/pdf/events/2026/telecom-africa-rafm-summit-2026/TL_Business%20Assurance%20Framework%20for%20Agentic%20AI%20Designed.pdf",
        note: "A published framework for governing agentic AI in telecom environments.",
      },
      {
        label: "TRAI — official regulations and consultation papers",
        url: "https://www.trai.gov.in/",
        note: "The primary source. Open one tariff order to see what a real obligation looks like.",
      },
    ],
    selfCheck: [
      { q: "What is AGR?", a: "Adjusted Gross Revenue — operators pay a licence fee as a percentage of it; disputes over its definition caused India's biggest telecom litigation." },
      { q: "Name one AI use case in revenue assurance.", a: "Detecting rating-versus-billing mismatches, or CDR anomaly detection for SIM-box and bypass fraud." },
      { q: "Why does auditability matter so much here?", a: "Regulators and tribunals expect explainable, logged decisions — every AI action must be reconstructable from evidence." },
      { q: "First step when automating telecom compliance?", a: "Extract obligations from circulars and licences, then map them to the internal control library to expose gaps." },
      { q: "Which agent actions should require human approval?", a: "Irreversible or externally visible ones — regulatory filings, customer refunds, disconnections. Reversible flags can run automatically." },
    ],
  },
];

export const TOTAL_MINUTES_LABEL = "~4.5 hours";
