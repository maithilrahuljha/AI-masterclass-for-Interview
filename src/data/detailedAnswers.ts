export interface DetailedAnswer {
  /** One-line answer in the simplest possible words. */
  simple: string;
  /** The full explanation, broken into readable parts. */
  sections: { h: string; p: string }[];
  /** Mini-glossary of every connected idea the answer touches. */
  terms: { t: string; d: string }[];
  /** A ~30-second spoken script you can deliver in the room. */
  sayIt: string;
}

export const DETAILED: Record<number, DetailedAnswer> = {
  // ───────────────── Module 01 · Foundations ─────────────────
  2: {
    simple:
      "Name the exact model you used and the exact number of dimensions its vectors have — the number is the real question.",
    sections: [
      {
        h: "What an embedding model actually does",
        p: "An embedding model is a small neural network that reads a piece of text and outputs a fixed-length list of numbers called a vector. Text with similar meaning produces vectors that sit close together in space. That is the whole trick behind semantic search: instead of matching words, you compare positions in a mathematical space, so 'licence fee as a share of revenue' can match 'AGR dues' even though they share almost no words.",
      },
      {
        h: "What dimensionality means",
        p: "Dimensionality is simply how many numbers are in that list. all-MiniLM-L6-v2 outputs 384 numbers per text. OpenAI's text-embedding-3-small outputs 1536, and text-embedding-3-large outputs 3072. BGE-base outputs 768. More dimensions can encode more nuance, but they cost proportionally more memory in the vector database, more time per similarity comparison, and more money if you pay per call. This is why the honest answer is always 'I benchmarked on our own data', never 'bigger is better'.",
      },
      {
        h: "How to justify your choice",
        p: "Tie the choice to a constraint. Free and CPU-friendly with no data leaving the network points to MiniLM at 384 dimensions. Highest retrieval quality on nuanced legal language, with budget approved, points to a larger paid model. Domain-specific jargon might justify a fine-tuned or domain model such as BGE or E5. One rule is non-negotiable: you must embed your queries with the same model that embedded your documents, otherwise the two sets of vectors live in different spaces and similarity is meaningless.",
      },
    ],
    terms: [
      { t: "Vector", d: "An ordered list of numbers representing a piece of text as a point in space." },
      { t: "Cosine similarity", d: "Measures the angle between two vectors, roughly −1 to 1. Higher means more similar meaning." },
      { t: "Fine-tuned embeddings", d: "An embedding model further trained on your own domain pairs so jargon clusters correctly." },
    ],
    sayIt:
      "I used all-MiniLM-L6-v2 from sentence-transformers, which produces 384-dimensional vectors. I picked it because it runs fast on CPU, costs nothing, and the documents were short clauses where it performed well on my test set. If accuracy had been the binding constraint I would have moved to a 1536-dimension model like text-embedding-3-small and measured the recall gain before paying for it.",
  },

  11: {
    simple:
      "List the four strategies — fixed-size, structure-aware, semantic and hierarchical — then say you choose by document structure and prove it with retrieval metrics.",
    sections: [
      {
        h: "Why chunking exists at all",
        p: "You cannot embed a 300-page document as a single vector: all its meaning would average into mush, and you could never cite a precise clause. So documents are cut into chunks, each embedded and stored separately. Chunking quality decides retrieval quality more than almost any other knob, because a chunk is the smallest unit the system can ever return.",
      },
      {
        h: "The four strategies",
        p: "Fixed-size chunking takes equal windows of roughly 300–500 tokens with 10–15% overlap. It is simple, predictable and the correct default. Structure-aware chunking splits on real boundaries — headings, numbered clauses, table rows — and is the best choice for legal and regulatory text where a clause is a natural unit. Semantic chunking uses embeddings to detect where the topic shifts and splits there; it is smarter but slower and harder to debug. Hierarchical or parent–child chunking indexes small precise children for matching but returns the larger parent section to the model, giving you precision in retrieval and context in generation.",
      },
      {
        h: "How to actually choose",
        p: "Let the document and the question type decide. Highly structured documents get structure-aware splitting. Flowing narrative text gets fixed-size with overlap. Questions needing broad context favour larger chunks or the parent–child pattern; questions needing a pinpoint fact favour smaller chunks. Then stop guessing: build a golden set of questions, measure recall@k for two or three configurations, and pick the winner on evidence. Always attach metadata — document, page, section — to every chunk so answers stay citable.",
      },
    ],
    terms: [
      { t: "Overlap", d: "Repeating the last 10–15% of a chunk at the start of the next so boundary sentences survive." },
      { t: "recall@k", d: "The share of questions where the correct chunk appears in the top k retrieved results." },
      { t: "Parent–child", d: "Match on small chunks, but send the bigger enclosing section to the LLM for context." },
    ],
    sayIt:
      "There are four main strategies: fixed-size with overlap, structure-aware splitting on headings or clauses, semantic splitting where the topic changes, and hierarchical parent–child chunking. I choose based on document structure — regulatory text gets clause-level splitting because a clause is a natural unit — and then I validate the choice by measuring recall@k on a golden question set rather than trusting intuition.",
  },

  14: {
    simple:
      "Same four families, described by how they cut: by length, by document structure, by meaning, or by hierarchy.",
    sections: [
      {
        h: "Fixed-size and recursive splitting",
        p: "Fixed-size cuts every N tokens with overlap — predictable and fast, but blind to meaning, so it will happily slice a sentence in half. Recursive character splitting is the common refinement: it tries to split on paragraph breaks first, then sentences, then words, only cutting mid-sentence as a last resort. That is what LangChain's RecursiveCharacterTextSplitter does and it is the sensible default for mixed content.",
      },
      {
        h: "Structure-aware and semantic splitting",
        p: "Structure-aware (sometimes called document-based) splitting follows the document's own skeleton: markdown headings, numbered clauses, table rows, slide boundaries. It keeps each logical unit whole, which is ideal for contracts, policies and regulations. Semantic chunking embeds sentences and starts a new chunk when consecutive sentences stop being similar — it adapts to content automatically, at the cost of extra compute during ingestion and less predictable chunk sizes.",
      },
      {
        h: "Hierarchical and the universal trade-off",
        p: "Hierarchical chunking stores more than one granularity: small children for precise matching, large parents for context, sometimes with a summary at the top level. Whatever you pick, the trade-off never changes — large chunks carry more context but dilute the embedding with unrelated text, while small chunks match precisely but may lack the surrounding information the model needs to answer well.",
      },
    ],
    terms: [
      { t: "Token", d: "A sub-word unit; about 0.75 English words. Chunk sizes are measured in tokens." },
      { t: "Recursive splitter", d: "Splits on the largest natural boundary available, falling back to smaller ones." },
      { t: "Context dilution", d: "When a chunk contains so much unrelated text that its embedding stops representing the key fact." },
    ],
    sayIt:
      "Broadly four types: fixed-size with overlap, recursive splitting on natural boundaries, structure-aware splitting on headings or clauses, and semantic or hierarchical chunking. The trade-off is always context versus precision — bigger chunks carry more meaning but dilute the match, smaller chunks match cleanly but can lose the surrounding context.",
  },

  // ───────────────── Module 02 · Modern AI Engineering ─────────────────
  0: {
    simple:
      "Walk the offline path, then the online path, then state your specific role, then one real challenge and how you fixed it.",
    sections: [
      {
        h: "Structure the architecture in two halves",
        p: "Offline, done once: documents are loaded, parsed, cleaned, split into chunks, embedded, and stored in a vector database along with their text and metadata. Online, on every question: the user's query is embedded with the same model, the top-k nearest chunks are retrieved, a prompt is assembled containing those chunks as context plus instructions to answer only from them with citations, and the LLM generates the final answer. Saying it in this two-phase shape immediately signals that you have built one rather than read about one.",
      },
      {
        h: "State your role concretely",
        p: "Vague ownership is the most common failure here. Say exactly which pieces were yours: 'I owned ingestion and retrieval tuning — the PDF parsing, the chunking strategy and the hybrid search configuration — while a colleague built the API layer.' Interviewers respect precise, modest ownership far more than a claim to have built everything.",
      },
      {
        h: "Pick one challenge and show the fix",
        p: "Choose a challenge that reveals engineering judgement, and always give the resolution and the measurement. Strong examples: scanned PDFs with no text layer, solved with OCR plus deskewing; retrieval missing acronym queries, solved by adding BM25 hybrid search; chunks cutting clauses in half, solved by structure-aware splitting; the model answering confidently from nothing, solved by an abstention threshold and mandatory citations. Close with the number that proved it worked — recall@5 moved from 0.62 to 0.91, for instance.",
      },
    ],
    terms: [
      { t: "Top-k", d: "How many chunks you retrieve per query, typically 3–8. Too few misses evidence, too many adds noise." },
      { t: "Grounding", d: "Forcing the model to answer only from supplied context instead of its own memory." },
      { t: "Metadata", d: "Document name, page, section and date stored with each chunk so answers can cite sources." },
    ],
    sayIt:
      "The pipeline had two halves. Offline we parsed the documents, chunked them at clause level, embedded each chunk with MiniLM and stored them in FAISS with page metadata. Online we embedded the query, retrieved the top five chunks, and prompted the LLM to answer only from that context with citations. I owned ingestion and retrieval tuning. The biggest challenge was that scanned PDFs returned empty text — we added OCR with deskewing, and recall@5 went from 0.62 to 0.91.",
  },

  1: {
    simple:
      "Give real numbers: how many documents, which formats, which parser, and your exact chunk size and overlap.",
    sections: [
      {
        h: "Volume and format",
        p: "Prepare concrete figures before the interview, because hesitation here reads as inexperience. For instance: around 500 documents, mostly PDF with some DOCX and a few scanned image PDFs, averaging 30 pages, producing roughly 12,000 chunks. Knowing the chunk count matters because it determines your index choice — under a million chunks, a simple flat index is perfectly adequate.",
      },
      {
        h: "How you parsed them",
        p: "Match the tool to the file. PyMuPDF (fitz) is fast and reliable for digital text. pdfplumber or Camelot preserve table structure, which matters because a mangled table becomes meaningless text. Tesseract OCR handles scanned pages, ideally after deskewing and denoising. python-docx covers Word files. Then clean: strip repeated headers and footers, repair hyphenated line breaks, normalise whitespace and drop empty pages.",
      },
      {
        h: "How you chunked",
        p: "Give the recipe with numbers and a reason. For example: 400-token chunks with 50 tokens of overlap, split preferentially on clause boundaries, with document name, page number and section title attached as metadata to every chunk. Explain the reasoning — overlap protects sentences that fall on a boundary, clause-level splitting keeps each obligation whole, and metadata is what makes every answer citable back to a page.",
      },
    ],
    terms: [
      { t: "PyMuPDF", d: "A fast Python library for extracting text, images and layout from digital PDFs." },
      { t: "OCR", d: "Optical Character Recognition — converts page images into machine-readable text." },
      { t: "Deskewing", d: "Straightening a crooked scan before OCR, which sharply improves accuracy." },
    ],
    sayIt:
      "Around 500 documents, mostly PDF with a few DOCX and some scans. I used PyMuPDF for digital text, pdfplumber for tables and Tesseract for the scanned pages after deskewing. I chunked at roughly 400 tokens with 50 tokens of overlap, splitting on clause boundaries where the structure allowed, and stored document, page and section as metadata on every chunk so answers could cite their source. That produced about 12,000 chunks.",
  },

  3: {
    simple:
      "Name one, justify it with a constraint, and show you know the alternatives and when they would win.",
    sections: [
      {
        h: "What a vector database does",
        p: "It stores embeddings alongside the original text and metadata, and answers the question 'which stored vectors are nearest to this query vector?' quickly. Beyond raw similarity it provides metadata filtering (only this regulator, only after 2023), persistence, and often hybrid keyword plus vector search in one query.",
      },
      {
        h: "The realistic options",
        p: "FAISS is a free in-process library from Meta with no server to run — ideal below about a million vectors and for air-gapped environments. Chroma is the friendliest for development and prototypes. pgvector is an extension that keeps vectors inside PostgreSQL, which is excellent when the data and permissions already live there. Pinecone and Weaviate are managed services that handle scale, replication and uptime for you. Elasticsearch or OpenSearch make sense when you already run them and want hybrid search out of the box.",
      },
      {
        h: "Justify with the constraint that drove you",
        p: "The strongest answers connect the choice to a requirement: data could not leave the network, so a managed cloud service was out; the corpus was small, so an exact flat index was fast enough; the team already ran Postgres, so pgvector avoided new infrastructure. Then show you know when the choice breaks: 'beyond a few million vectors I would move to HNSW indexing or a managed service, because a flat index scans everything.'",
      },
    ],
    terms: [
      { t: "FAISS", d: "Facebook AI Similarity Search — a local library for fast nearest-neighbour search." },
      { t: "HNSW", d: "A graph-based index giving excellent speed-to-recall at higher memory cost." },
      { t: "Metadata filtering", d: "Restricting search to chunks matching attributes such as year, regulator or access level." },
    ],
    sayIt:
      "I used FAISS, because the corpus was about twelve thousand chunks, the data could not leave our network, and a flat index gives exact results in milliseconds on CPU with no infrastructure to maintain. If we had grown past a few million vectors or needed replication and uptime guarantees, I would have moved to HNSW indexing or a managed service like Pinecone.",
  },

  4: {
    simple:
      "Retrieval is embed-the-query then nearest-neighbour search; when it is wrong, work a fixed checklist and prove each fix with recall@k.",
    sections: [
      {
        h: "The mechanism",
        p: "The user's question is embedded with the same model used for the documents, producing a query vector. The vector database compares that vector against stored chunk vectors, usually by cosine similarity, and returns the top-k nearest with their scores and metadata. Those chunks are then injected into the prompt as context. Optionally, metadata filters narrow the candidate set before similarity is computed at all.",
      },
      {
        h: "Why retrieval goes wrong",
        p: "Common causes: the user's vocabulary differs from the document's; chunks are too large so the key sentence is diluted; chunks are too small so context is missing; the corpus contains near-duplicates that crowd out variety; or the query is vague and ambiguous. Diagnose before fixing — print the retrieved chunks and their scores, and you will usually see the cause immediately.",
      },
      {
        h: "The fix checklist, in order of effort",
        p: "First, cheap fixes: clean and deduplicate the corpus, add metadata filters, retune chunk size and k. Then hybrid search, combining BM25 keyword matching with dense vectors so exact acronyms and IDs are not missed. Then a cross-encoder re-ranker, which re-scores the top 50 candidates by reading query and chunk together — expensive per pair but very accurate, and typically the largest single quality jump. Then query transformation: rewriting vague questions, expanding acronyms, or HyDE, where the model drafts a hypothetical answer and you search with that instead. Finally, consider a stronger or domain-tuned embedding model. Measure recall@k after every change so you know which one actually helped.",
      },
    ],
    terms: [
      { t: "BM25", d: "A classic keyword ranking algorithm that excels at exact terms and rare words." },
      { t: "Cross-encoder", d: "A model that scores a query and a document together for accurate re-ranking of a shortlist." },
      { t: "HyDE", d: "Hypothetical Document Embeddings — search using a drafted answer rather than the raw question." },
    ],
    sayIt:
      "We embed the query with the same model as the documents and run cosine nearest-neighbour search to get the top-k chunks. If results are inaccurate, I work a checklist: clean and dedupe the corpus, add metadata filters, tune chunk size and k, add hybrid BM25 plus vector search, then a cross-encoder re-ranker over the top fifty, and query rewriting for vague inputs. I validate each change against recall@k on a golden set rather than by eyeballing a few answers.",
  },

  5: {
    simple:
      "Generation is the LLM answering from the retrieved context under strict instructions — and your model choice should follow a constraint like privacy, quality or cost.",
    sections: [
      {
        h: "How generation works in a RAG system",
        p: "The retrieved chunks and the user's question are assembled into a single prompt, typically with a system instruction such as 'answer only from the context below; cite the source of every claim; if the answer is not present, say you do not know.' The LLM then generates the answer autoregressively — one token at a time, each token conditioned on everything before it. Temperature is kept low, usually 0 to 0.3, because the task is factual recall and reformulation rather than creative writing.",
      },
      {
        h: "Choosing the model with a reason",
        p: "Three credible justifications. Privacy: subscriber or client data could not leave the network, so we self-hosted Llama or Mistral. Quality: the documents involved dense legal reasoning and long contexts, so a frontier model such as GPT-4-class or Claude was worth the cost. Economics: volume was high and the task was simple extraction, so a small model served the traffic at a fraction of the price. Any of these shows engineering judgement; naming a model with no reason shows none.",
      },
      {
        h: "Details that signal maturity",
        p: "Mention the context budget — you can only fit so many chunks before you hit the window, and burying context in a very long prompt degrades recall. Mention output control, such as requiring a structured answer with a citations field. Mention the fallback path when retrieval returns nothing relevant: the system should abstain rather than improvise.",
      },
    ],
    terms: [
      { t: "Autoregressive", d: "Generating one token at a time, each conditioned on all previous tokens." },
      { t: "System prompt", d: "Standing instructions that define the model's role, rules and output format." },
      { t: "Abstention", d: "Deliberately answering 'not found' when confidence or retrieval quality is too low." },
    ],
    sayIt:
      "The retrieved chunks plus the question go into a prompt that instructs the model to answer only from that context and cite each claim, and the LLM generates the answer token by token at a low temperature of around 0.2 because this is a factual task. We used a self-hosted Llama model because the documents were confidential and could not leave our network; if quality had mattered more than privacy, a frontier API model would have been the better call.",
  },

  6: {
    simple:
      "Build a golden question set, then measure retrieval and generation separately — recall@k for retrieval, faithfulness for generation.",
    sections: [
      {
        h: "Why you evaluate the two halves separately",
        p: "A RAG system fails in two distinct ways: it retrieves the wrong context, or it retrieves the right context and still writes a bad answer. Reporting one blended score hides which half is broken. Separate measurement tells you exactly where to spend your next week of effort.",
      },
      {
        h: "Retrieval metrics",
        p: "Create a golden set of 50–100 real questions where you know which chunk contains the answer. Then measure recall@k — the share of questions whose correct chunk appears in the top k — plus MRR (Mean Reciprocal Rank), which rewards putting the right chunk nearer the top, and precision@k if you care about noise in the context window.",
      },
      {
        h: "Generation metrics and the human layer",
        p: "Faithfulness asks whether every claim in the answer is supported by the retrieved context — this is the hallucination detector. Answer relevance asks whether the response actually addresses the question. Context precision and recall assess how much of the supplied context was useful. The RAGAS framework computes these using an LLM as judge. Always keep a human review sample too, because an LLM judge is itself a model with blind spots, and in regulated settings a person must sign off. Finally, wire the golden set into CI so any change to chunking, model or prompt is re-tested automatically.",
      },
    ],
    terms: [
      { t: "Golden set", d: "A curated list of questions with known correct answers and source chunks." },
      { t: "Faithfulness", d: "Whether the answer's claims are genuinely supported by the retrieved context." },
      { t: "LLM-as-judge", d: "Using a strong model to score outputs automatically against defined criteria." },
    ],
    sayIt:
      "I built a golden set of about sixty real questions with the correct source chunk labelled. Retrieval was measured with recall@5 and MRR, and generation with faithfulness and answer relevance using RAGAS. We set release gates — recall@5 above 0.9 and faithfulness above 0.95 — plus a human spot-check of twenty answers each cycle, and the whole suite re-ran whenever we changed chunking or prompts.",
  },

  7: {
    simple:
      "Temperature scales the model's token scores before sampling: low means stable and factual, high means varied and risky.",
    sections: [
      {
        h: "The mechanism in plain words",
        p: "At each step the model produces a raw score, called a logit, for every token in its vocabulary. Those scores are divided by the temperature and then converted into probabilities with softmax. Dividing by a small number such as 0.1 exaggerates the gaps, so the leading token dominates and output becomes nearly deterministic. Dividing by a large number such as 1.5 flattens the gaps, so unlikely tokens get a real chance of being chosen.",
      },
      {
        h: "What each setting is for",
        p: "0 to 0.3 suits factual work: RAG answers, extraction, classification, code, anything that must be reproducible. Around 0.7 is a balanced default for general chat and drafting. Above 1.0 is for brainstorming and creative variety. Temperature does not change what the model knows or how capable it is; it only changes how adventurously it picks among the options it already has.",
      },
      {
        h: "Related controls worth mentioning",
        p: "Top-k restricts sampling to the k highest-scoring tokens. Top-p, or nucleus sampling, keeps the smallest set of tokens whose probabilities sum to p, adapting the cut-off to how confident the model is. In practice people tune temperature together with top-p. Note also that temperature 0 is near-deterministic but not always bit-identical, because of floating-point and infrastructure variation.",
      },
    ],
    terms: [
      { t: "Logit", d: "The raw, unnormalised score the model assigns to each candidate token." },
      { t: "Softmax", d: "The function converting raw scores into probabilities that sum to one." },
      { t: "Top-p / nucleus", d: "Sampling from the smallest group of tokens whose combined probability reaches p." },
    ],
    sayIt:
      "Temperature scales the logits before they become probabilities. Near zero the highest-scoring token wins almost every time, so output is stable and factual; above one the distribution flattens and rarer tokens appear, which is creative but error-prone. For a compliance Q&A system I keep it between 0 and 0.3 so answers are reproducible and defensible.",
  },

  8: {
    simple:
      "Similarity search returns the closest chunks; MMR re-ranks them to be relevant *and* different from each other.",
    sections: [
      {
        h: "Similarity search",
        p: "The query becomes a vector, and the database returns the k stored vectors with the highest similarity — usually cosine similarity, which compares the angle between vectors and so ignores length. It is pure relevance with no awareness of redundancy, which is both its strength and its weakness.",
      },
      {
        h: "The redundancy problem MMR solves",
        p: "Corpora contain near-duplicates: the same clause repeated across circulars, boilerplate repeated in every contract. Plain similarity search will happily return five versions of the same sentence, wasting the context window and starving the model of the complementary information it needs to answer fully.",
      },
      {
        h: "How MMR works",
        p: "Maximal Marginal Relevance builds the result list one item at a time. At each step it scores every candidate as a weighted blend: λ times its similarity to the query, minus (1 − λ) times its maximum similarity to anything already selected. A λ near 1 behaves like pure relevance; a λ near 0.5 actively promotes diversity. Use MMR when coverage matters — broad questions, redundant corpora, or when you want several perspectives in the context window. Stick to plain similarity when there is exactly one right clause and precision is everything.",
      },
    ],
    terms: [
      { t: "λ (lambda)", d: "The MMR dial trading relevance (high λ) against diversity (low λ)." },
      { t: "Redundancy", d: "Multiple retrieved chunks carrying essentially the same information." },
      { t: "Cosine similarity", d: "Angle-based similarity between vectors, insensitive to their magnitude." },
    ],
    sayIt:
      "Similarity search embeds the query and returns the k nearest chunks by cosine similarity — pure relevance. MMR re-ranks those candidates to balance relevance against diversity using a lambda parameter, so each additional chunk must be relevant to the query but different from what is already selected. I use MMR when the corpus has near-duplicate clauses, otherwise the top five results are effectively the same sentence five times.",
  },

  9: {
    simple:
      "RAG retrieves relevant passages from your own documents and puts them in the prompt, so the model answers from evidence instead of memory.",
    sections: [
      {
        h: "The three limits RAG removes",
        p: "First, a knowledge cut-off: the model's training ended on a date, so it knows nothing newer. Second, no private data: it has never seen your contracts, policies or tickets. Third, hallucination: faced with a gap, it generates something plausible rather than admitting ignorance. RAG addresses all three by supplying the relevant text at question time.",
      },
      {
        h: "How it improves responses concretely",
        p: "Answers become current, because the index can be updated nightly. They become specific to your organisation. They become citable, since each chunk carries its source document and page, which is what makes the output auditable. And they become more honest, because you can instruct the model to answer only from the provided context and to say so when the context is silent.",
      },
      {
        h: "Why RAG rather than fine-tuning",
        p: "Fine-tuning changes the model's style and behaviour but is a poor way to inject facts: it is expensive, must be repeated whenever documents change, and still produces no citations. RAG updates instantly by re-indexing, costs far less, and keeps the evidence visible. The standard framing is that fine-tuning teaches form while RAG supplies facts — and most enterprise problems are fact problems.",
      },
    ],
    terms: [
      { t: "Knowledge cut-off", d: "The date after which a model has seen no training data." },
      { t: "Grounding", d: "Tying generated text to supplied source material." },
      { t: "Fine-tuning", d: "Further training a model on examples to shape its behaviour or style." },
    ],
    sayIt:
      "RAG stands for Retrieval-Augmented Generation. Before the model answers, we search our own document store for the most relevant passages and put them into the prompt as context. That fixes three things at once: the model's knowledge cut-off, its lack of access to private data, and its tendency to hallucinate — and because each chunk carries its source, every answer can be cited and audited. All of that without retraining the model.",
  },

  10: {
    simple:
      "Detect whether each page has a text layer; extract text directly where it does, OCR where it does not, and caption or link the images that matter.",
    sections: [
      {
        h: "Triage every page first",
        p: "PDFs are a container, not a format. One file may hold digital text pages, scanned image pages and embedded charts. The first step is detection: try a text extraction and, if a page returns almost nothing, treat it as an image page. Handling this automatically is what separates a prototype from a pipeline, because real document sets are always mixed.",
      },
      {
        h: "Handling each content type",
        p: "Digital text: PyMuPDF for speed and layout, pdfplumber or Camelot for tables, because tables flattened into a line of numbers become meaningless. Scanned pages: Tesseract OCR, after deskewing, denoising and binarisation, which materially improves accuracy. Images, charts and diagrams: either caption them with a vision-language model and index the caption as text, or store the image with a reference so a user can open the original page. For heavy workloads, layout-aware tools such as LayoutLM-style models or the unstructured library handle multi-column documents better than naive extraction.",
      },
      {
        h: "Multimodal and metadata",
        p: "If images carry real information — network diagrams, signed annexures — a multimodal RAG design stores both text embeddings and image embeddings, or indexes generated captions. In every case attach metadata: page number, extraction method, OCR confidence. Low-confidence pages go to a manual review queue rather than silently polluting the index, and because OCR introduces errors, flagging confidence is part of being honest about data quality.",
      },
    ],
    terms: [
      { t: "Text layer", d: "Embedded, selectable characters in a PDF, as opposed to a picture of text." },
      { t: "Binarisation", d: "Converting a scan to clean black and white to improve OCR accuracy." },
      { t: "Multimodal RAG", d: "Retrieval over both text and images, using captions or image embeddings." },
    ],
    sayIt:
      "I classify each page first. Pages with a text layer go through PyMuPDF, and tables through pdfplumber so structure survives. Pages that return no text are scans, so they go through Tesseract OCR after deskewing. Charts and diagrams are either captioned by a vision model and indexed as text, or stored with a page reference. Every chunk records the page and the extraction method, and low-confidence OCR pages are flagged for human review rather than trusted silently.",
  },

  12: {
    simple:
      "Work a checklist from cheapest to most expensive — corpus hygiene, metadata filters, hybrid search, re-ranking, query rewriting — and measure recall@k after each change.",
    sections: [
      {
        h: "Start with the data, not the model",
        p: "Most retrieval problems are data problems. Remove duplicates and boilerplate that crowd the results. Fix broken extraction, especially tables and scanned pages. Re-examine chunking: clause-aware splitting with sensible overlap often beats any model change. Enrich chunks with metadata — document type, date, issuing body, section title — and prepend a short contextual header to each chunk so an isolated paragraph still carries its topic.",
      },
      {
        h: "Then upgrade the retrieval mechanism",
        p: "Add hybrid search so exact terms, acronyms and identifiers are matched by BM25 while meaning is matched by vectors, fusing the rankings with reciprocal rank fusion. Add a cross-encoder re-ranker over the top 50 candidates: it reads query and chunk jointly, which is far more accurate than comparing two independent embeddings, and it is usually the single biggest quality improvement available. Use metadata filters to eliminate irrelevant candidates before scoring.",
      },
      {
        h: "Then fix the query, and finally the model",
        p: "Users ask short, ambiguous questions. Rewrite them with an LLM, expand acronyms, or generate several paraphrases and merge the results (multi-query retrieval). HyDE drafts a hypothetical answer and searches with its embedding, which often matches document phrasing better than the question did. Only after all this should you swap the embedding model or fine-tune one on your domain. Throughout, keep a golden set and report recall@k before and after, because without measurement you are just rearranging knobs.",
      },
    ],
    terms: [
      { t: "Reciprocal rank fusion", d: "A simple, robust way to merge two ranked lists into one." },
      { t: "Contextual header", d: "A short document/section summary prepended to each chunk before embedding." },
      { t: "Multi-query retrieval", d: "Generating several paraphrases of a question and merging their results." },
    ],
    sayIt:
      "I go cheapest to most expensive. First corpus hygiene — dedupe, fix extraction, improve chunking, add metadata. Then hybrid BM25 plus vector search with rank fusion, then a cross-encoder re-ranker over the top fifty, which usually gives the biggest single jump. Then query rewriting or HyDE for vague questions. Only then would I change the embedding model. And I measure recall@k on a golden set after each step so I know what actually worked.",
  },

  13: {
    simple:
      "Hybrid search runs keyword search and vector search together and fuses the results, so you catch both exact terms and paraphrases.",
    sections: [
      {
        h: "Why one method is never enough",
        p: "Dense vector search understands meaning, so it finds 'licence fee on revenue' when you asked about 'AGR dues' — but it can blur exact strings, so rare acronyms, product codes, clause numbers and proper nouns sometimes rank poorly. Keyword search with BM25 is the mirror image: it matches exact and rare terms superbly, scoring by term frequency weighted by how rare the term is, but it completely misses a paraphrase that shares no words.",
      },
      {
        h: "How the fusion works",
        p: "Run both retrievers, then merge. Reciprocal rank fusion is the usual choice because it needs no score calibration: each document's final score is the sum over retrievers of 1/(k + rank). Alternatively you can normalise and weight the raw scores, for example 0.6 dense plus 0.4 sparse, if you want explicit control. Many engines — Elasticsearch, OpenSearch, Weaviate, Qdrant — provide hybrid search natively.",
      },
      {
        h: "When it matters most",
        p: "Hybrid earns its keep in technical and regulatory domains stuffed with abbreviations and identifiers, and in any corpus where users search by code or clause number. It pairs naturally with a cross-encoder re-ranker on top of the fused list. The cost is modest: two queries instead of one, and a little more infrastructure.",
      },
    ],
    terms: [
      { t: "Sparse retrieval", d: "Keyword-based methods like BM25 that operate on term matches." },
      { t: "Dense retrieval", d: "Embedding-based search that operates on meaning." },
      { t: "RRF", d: "Reciprocal Rank Fusion — combines ranked lists using 1/(k + rank) without score calibration." },
    ],
    sayIt:
      "Hybrid search combines sparse keyword retrieval like BM25 with dense vector retrieval and fuses the two rankings, usually with reciprocal rank fusion. Keywords nail exact acronyms and clause numbers that embeddings blur, while vectors catch paraphrases that keywords miss. In a regulatory corpus full of terms like AGR, hybrid consistently outperforms either method on its own.",
  },

  15: {
    simple:
      "Ground the model in retrieved text, force citations, let it abstain, and keep measuring faithfulness after every change.",
    sections: [
      {
        h: "Design the retrieval half for trust",
        p: "Hallucination usually starts as a retrieval failure: given nothing useful, the model improvises. So curate the corpus to authoritative, current documents only; chunk on clause boundaries so facts stay intact; use hybrid search plus a re-ranker for accuracy; and set a similarity floor. If the best chunk scores below that floor, the system must return 'I could not find this in the approved documents' instead of attempting an answer.",
      },
      {
        h: "Constrain the generation half",
        p: "The system prompt should be explicit: answer only from the supplied context, never from prior knowledge; cite the document and page for every claim; if the context does not contain the answer, say so. Keep temperature low. Require structured output with a citations field so an unsupported sentence is structurally obvious. Sanitise retrieved chunks so instructions hidden inside a document cannot hijack behaviour.",
      },
      {
        h: "Verify, then keep verifying",
        p: "Add a verification pass for high-stakes answers: a second call, or a cross-encoder, checks whether each sentence is entailed by the cited chunk, and unsupported sentences are dropped or flagged. Measure faithfulness continuously on a golden set with RAGAS, gate releases on a threshold, and log every question, retrieved chunk and answer so failures can be investigated. In a corporate deployment, add human review for high-risk categories and a visible feedback button so users can report a wrong answer the moment they see one.",
      },
    ],
    terms: [
      { t: "Similarity floor", d: "A minimum retrieval score below which the system abstains from answering." },
      { t: "Entailment check", d: "Verifying that a generated sentence logically follows from its cited source." },
      { t: "Guardrail", d: "An automated rule constraining what the system may say or do." },
    ],
    sayIt:
      "I design it in three layers. Retrieval: curated corpus, clause-level chunks, hybrid search with a re-ranker, and a similarity threshold below which we abstain. Generation: a strict prompt to answer only from context with a citation per claim, low temperature, and structured output. Verification: an entailment check on high-stakes answers plus continuous faithfulness scoring on a golden set, with release gates and full logging. The aim is that the system would rather say 'not found' than guess.",
  },

  16: {
    simple:
      "Embeddings trade nuance against cost and speed; indexes trade recall against memory and latency. Both choices should follow from corpus size, query volume and the recall you can afford to lose.",
    sections: [
      {
        h: "The embedding trade-off",
        p: "Dimensionality is the headline: 384 dimensions are roughly four times cheaper to store and compare than 1536, and the gap shows up in RAM, latency and bill. Model size matters too — larger encoders are more accurate but slower to embed, which affects ingestion time for millions of chunks. Then there is specialisation: a general model is robust everywhere, while a domain-tuned model wins on jargon but may degrade on everything else. Maximum sequence length matters because a model truncating at 256 tokens silently discards the tail of longer chunks. And multilingual corpora need multilingual embeddings or retrieval quietly fails for some documents.",
      },
      {
        h: "The indexing trade-off",
        p: "A Flat index compares the query against every vector: perfect recall, linear cost, fine up to roughly a million vectors. IVF partitions the space into clusters and searches only the nearest few, which is much faster but can miss neighbours near cluster borders — the nprobe parameter buys recall back at the cost of speed. HNSW builds a navigable graph and generally gives the best speed-to-recall balance, at the price of high memory and slower index construction. Product quantization compresses vectors so billions fit in RAM, trading some precision; IVF-PQ combines both. Disk-based options like DiskANN trade latency for capacity.",
      },
      {
        h: "How to decide, and what else to weigh",
        p: "Work from numbers: how many vectors, what query rate, what latency budget, how much memory, and what recall the use case tolerates. Under a million vectors with modest traffic, flat indexing with a good embedding model is simplest and exact. At tens of millions with high traffic, HNSW or IVF-PQ becomes necessary. Remember operational factors too: updates and deletions are awkward in some index types, and changing embedding model means re-embedding the entire corpus, which is a genuine migration cost worth stating out loud.",
      },
    ],
    terms: [
      { t: "IVF", d: "Inverted File Index — clusters vectors so only nearby clusters are searched." },
      { t: "Product quantization", d: "Compressing vectors into codes so far more fit in memory, with some precision loss." },
      { t: "nprobe", d: "How many IVF clusters to search — higher means better recall but slower queries." },
    ],
    sayIt:
      "On embeddings, higher dimensions capture more nuance but cost roughly linearly in memory, latency and money, so I benchmark 384 against 1536 on our own golden set before paying for the larger one. On indexing, flat is exact and fine under about a million vectors; IVF is faster but loses recall near cluster boundaries; HNSW gives the best speed-to-recall at high memory; and PQ compresses when memory binds. I pick based on corpus size, query rate and how much recall the use case can afford to lose.",
  },

  17: {
    simple:
      "Same RAG pipeline, but every layer gets a security control: private deployment, per-document access control, grounded answers with citations, and full audit logging.",
    sections: [
      {
        h: "Security of the infrastructure",
        p: "Tax policy documents are confidential, so start with where things run. Either self-host the model inside the company boundary, or use an enterprise endpoint with contractual guarantees that prompts are not retained or used for training. Encrypt the vector store at rest and in transit, keep it inside the private network, and apply the same data-classification rules you would to any confidential repository.",
      },
      {
        h: "Access control is the part people forget",
        p: "Not everyone may read every tax document. Store an access-control label on every chunk — department, clearance, jurisdiction — and filter by the requesting user's entitlements before similarity search, not after. Filtering after retrieval still leaks information through the ranking and through anything already placed in the prompt. Authenticate users through SSO and carry their identity all the way into the retrieval call.",
      },
      {
        h: "Answer quality, and proving it stays good",
        p: "Apply the anti-hallucination design: answer only from retrieved context, cite document and clause for every claim, low temperature, and abstain below a similarity threshold, because a confidently wrong tax answer is a compliance incident rather than a bad user experience. Sanitise chunks against prompt injection hidden in uploaded files. Log every query, the chunks retrieved and the answer returned, so any question can be reconstructed later. Then operate it: a specialist reviews a monthly sample, users can flag bad answers, the index refreshes when policy changes, and a prominent disclaimer makes clear the bot supports professional judgement rather than replacing it.",
      },
    ],
    terms: [
      { t: "Pre-filtering", d: "Applying access rules before the similarity search so unauthorised chunks never rank." },
      { t: "SSO", d: "Single sign-on — central authentication that carries user identity into the application." },
      { t: "Data residency", d: "Contractual and technical control over which jurisdiction data is processed in." },
    ],
    sayIt:
      "I would run it entirely inside the company boundary — self-hosted model or an enterprise endpoint with no-training terms — with the vector store encrypted and private. Every chunk carries an access label, and I pre-filter by the user's entitlements before the similarity search so unauthorised content never even ranks. Answers are grounded with mandatory citations, low temperature, and abstention below a confidence threshold, because a wrong tax answer is a compliance incident. Everything is logged for audit, and a tax specialist reviews a monthly sample.",
  },

  18: {
    simple:
      "It is the randomness dial on token selection: low for factual and repeatable, high for varied and creative.",
    sections: [
      {
        h: "Where temperature sits in the pipeline",
        p: "Generation runs in a loop. The model computes a score for every possible next token, those scores are divided by the temperature, softmax turns them into probabilities, and one token is sampled. Temperature therefore acts after the model has finished thinking and only affects how its preferences are converted into a choice.",
      },
      {
        h: "What changes in practice",
        p: "At 0.1 the same prompt yields nearly the same answer every time, and phrasing stays conservative. At 0.7 wording varies between runs while the substance holds. At 1.3 the model takes genuine risks with vocabulary and structure, which produces originality and also mistakes, tangents and occasional incoherence. Reproducibility matters in regulated work: if a reviewer re-runs the prompt next month, low temperature is what makes the output defensible.",
      },
      {
        h: "Choosing a value, and its limits",
        p: "Map the setting to the task: extraction, classification, RAG answers and code generation at 0–0.3; summarisation and general drafting at 0.3–0.7; ideation at 0.8–1.2. Tune top-p alongside it rather than pushing temperature alone to extremes. And be clear about what temperature cannot do — it will not make a model factual. A low temperature makes a confident hallucination consistent rather than absent; only grounding and verification fix accuracy.",
      },
    ],
    terms: [
      { t: "Determinism", d: "Getting the same output for the same input — approached, though not guaranteed, at temperature 0." },
      { t: "Sampling", d: "Randomly selecting the next token according to its probability." },
      { t: "Greedy decoding", d: "Always taking the highest-probability token, equivalent to temperature 0." },
    ],
    sayIt:
      "Temperature controls randomness in token selection by scaling the logits before softmax. Low values sharpen the distribution so the top token almost always wins, which gives stable, repeatable, factual output. High values flatten it so rarer tokens get picked, which gives creativity and more mistakes. I use 0 to 0.3 for anything factual or auditable, and higher only when variety is the actual goal.",
  },

  19: {
    simple:
      "Name the models, say what each was used for, and show you chose them for a reason — privacy, quality or cost.",
    sections: [
      {
        h: "Structure the answer by category",
        p: "Group rather than list. Closed APIs: GPT-4 or GPT-4o, Claude, Gemini — strongest reasoning, zero operations, but data leaves your perimeter unless enterprise terms cover it. Open-weight models: Llama, Mistral, Qwen, Gemma — self-hostable, private, fine-tunable, and free of per-token cost once you own the hardware. Small specialist models: FLAN-T5, DistilBERT, MiniLM — cheap workhorses for classification, extraction and embeddings on CPU.",
      },
      {
        h: "Attach a use case to each",
        p: "Concreteness is what is being tested. For example: Claude for long-document summarisation because of its large context window; GPT-4 for complex reasoning over multi-condition clauses; a self-hosted Mistral for anything touching confidential records; MiniLM for embeddings in the RAG index; FLAN-T5 for zero-shot classification experiments on a CPU notebook.",
      },
      {
        h: "Be honest about scale, and name the tooling",
        p: "If your experience is academic or project-scale, say so plainly and describe the trade-offs you weighed — honesty with sound reasoning beats an inflated claim that collapses under one follow-up question. Mention the surrounding ecosystem as well: Hugging Face Transformers for model access, sentence-transformers for embeddings, LangChain or LangGraph for orchestration, Ollama or vLLM for local serving. That shows you have actually run these things rather than only called an API.",
      },
    ],
    terms: [
      { t: "Open-weight", d: "A model whose parameters are published, so it can be self-hosted and fine-tuned." },
      { t: "Context window", d: "The maximum tokens a model can process at once, prompt plus answer." },
      { t: "vLLM / Ollama", d: "Tools for serving open-weight models efficiently on your own hardware." },
    ],
    sayIt:
      "On the API side I have used GPT-4 and Claude — Claude particularly for long-document summarisation because of the context window. On the open side I have run Llama and Mistral locally with Ollama for cases where data could not leave the machine, and I use MiniLM for embeddings and FLAN-T5 for small classification tasks on CPU. I choose between them on three axes: data privacy, required reasoning quality, and cost per token at expected volume.",
  },

  20: {
    simple:
      "Describe a repeatable method: role and task, context, examples, explicit output format, constraints — then iterate against test cases.",
    sections: [
      {
        h: "The anatomy of a good prompt",
        p: "Five parts. Role sets the perspective ('you are a risk analyst'). Task states precisely what to do, with the verb that matters — summarise, extract, classify, compare. Context supplies the material and any background rules. Examples demonstrate the expected format when consistency is required. Output format specifies structure exactly: five bullets, or JSON with these keys. Constraints add the boundaries — length, tone, what to ignore, and what to do when information is missing.",
      },
      {
        h: "Techniques worth naming",
        p: "Zero-shot for simple, unambiguous tasks. Few-shot, with two to five examples, when format or labelling must stay consistent. Chain-of-thought for multi-step reasoning, asking the model to work through the logic before concluding. Delimiters such as triple backticks or XML tags to separate instructions from untrusted content. Negative instructions sparingly — telling a model what not to do is weaker than showing it what to do. Decomposition, splitting a complex job into chained prompts. And self-critique, where the model reviews its own draft against a rubric before finalising.",
      },
      {
        h: "The professional habits",
        p: "Treat prompts like code: version them, give each an owner, and keep a golden set of inputs with expected outputs so a change or model upgrade can be regression-tested. Iterate deliberately in a draft–critique–revise loop, changing one thing at a time so you know what caused an improvement. Define the quality bar in advance and stop when you hit it. Mentioning testing and versioning is what distinguishes an engineer from someone who types clever sentences.",
      },
    ],
    terms: [
      { t: "Delimiters", d: "Markers isolating untrusted or quoted content from your instructions." },
      { t: "Decomposition", d: "Splitting a complex task into a chain of smaller, verifiable prompts." },
      { t: "Regression test", d: "Re-running known inputs to confirm a change did not break existing behaviour." },
    ],
    sayIt:
      "I use a consistent structure — role, task, context, examples, output format and constraints. For technique I pick zero-shot for simple jobs, few-shot when the format must stay consistent, and chain-of-thought for multi-step reasoning. I always delimit untrusted content and specify the output schema when a system consumes the result. Then I treat prompts like code: versioned, owned, and regression-tested against a golden set so a model upgrade cannot silently break them.",
  },

  21: {
    simple:
      "The prompt that specifies role, audience, length, structure and what to ignore — not a bare 'summarise this'.",
    sections: [
      {
        h: "Why the vague version fails",
        p: "'Summarise this report' leaves every important decision to the model: how long, for whom, what counts as important, what to drop. You will get a generic abstract that treats a routine operational note and a material revenue risk as equally interesting, and the output will vary every time you run it.",
      },
      {
        h: "What the strong version contains",
        p: "A good prompt pins down five things. Role, because 'you are a risk analyst' changes what the model considers salient. Audience, because a board summary differs from an engineering note. Length and structure, such as five bullets of one sentence each. Focus, naming what matters — revenue risks, compliance issues, variance against guidance. And exclusions, explicitly telling it to skip routine operational updates. Adding 'cite the page or section for each point' makes the summary verifiable.",
      },
      {
        h: "The pattern to deliver",
        p: "A model answer sounds like: 'You are a risk analyst. Summarise the attached quarterly report in five bullet points for a risk committee. Highlight revenue risks, compliance issues and any variance against guidance. Ignore routine operational updates. Cite the section number for each point.' If the report is long, mention that you would chunk it, summarise each section, then summarise the summaries — the map-reduce pattern — because a single pass over a huge document loses detail in the middle.",
      },
    ],
    terms: [
      { t: "Map-reduce summarisation", d: "Summarise each chunk, then summarise those summaries into a final output." },
      { t: "Salience", d: "What the model treats as important — strongly influenced by the role you assign." },
      { t: "Extractive vs abstractive", d: "Quoting source sentences versus rewriting ideas in new words." },
    ],
    sayIt:
      "The best prompt is the specific one. Something like: 'You are a risk analyst. Summarise this quarterly report in five bullets for a risk committee, highlighting revenue risks and compliance issues, ignoring routine operational updates, and citing the section for each point.' It wins because it fixes the role, audience, length, structure and exclusions — a bare 'summarise this' leaves all of those to chance, so the output is generic and inconsistent.",
  },

  22: {
    simple:
      "It is the practice of designing a model's input — instructions, context, examples and output format — so the output is reliable enough to build a process on.",
    sections: [
      {
        h: "The definition to give",
        p: "Prompt engineering is the discipline of writing and refining the text sent to a generative model so it produces accurate, consistent, correctly formatted output for a specific task. It is the cheapest and fastest control available: no retraining, no infrastructure change, effective immediately. It exists because the same model can be brilliant or useless on the same task depending entirely on how the request is framed.",
      },
      {
        h: "Why it works at all",
        p: "A generative model predicts the next token conditioned on everything before it. The prompt is that condition, so it shapes the entire probability distribution over what follows. Assigning a role shifts the model toward text written by that kind of person; giving examples shifts it toward their format; asking for step-by-step reasoning makes the intermediate steps part of the context the final answer is conditioned on, which is precisely why chain-of-thought improves accuracy on multi-step problems.",
      },
      {
        h: "Where it sits among the alternatives",
        p: "Three ways to improve model output, in rising order of cost: prompt engineering (minutes, free), RAG (days, moderate — supplies missing facts), and fine-tuning (weeks, expensive — changes behaviour and style). Good practice exhausts prompting first. Note the limits honestly: prompting cannot give a model knowledge it never had, that is RAG's job, and it cannot fully guarantee a format, which is why you validate output with a schema and retry on failure.",
      },
    ],
    terms: [
      { t: "Conditioning", d: "How the prompt shapes the model's probability distribution over next tokens." },
      { t: "System vs user prompt", d: "Standing rules versus the specific request on this turn." },
      { t: "Prompt template", d: "A reusable prompt with variable slots, versioned and tested like code." },
    ],
    sayIt:
      "Prompt engineering is designing the input to a generative model — role, task, context, examples, constraints and output format — so the result is reliable enough to build a process on. It works because the model predicts the next token conditioned on the prompt, so the framing changes the whole output distribution. It is the cheapest lever available, which is why I exhaust it before reaching for RAG or fine-tuning.",
  },

  23: {
    simple:
      "Pin intent and output format rather than model quirks, version your prompts, and regression-test them on a golden set after every model change.",
    sections: [
      {
        h: "Why prompts break on upgrade",
        p: "Prompts often succeed for fragile reasons: a particular phrasing that happened to work, exploitation of a quirk, or reliance on a model's default verbosity. A new model version has different defaults and different quirks, so those crutches vanish and output silently changes shape — which is far more dangerous than an outright error, because downstream systems keep running on wrong data.",
      },
      {
        h: "How to write durably",
        p: "State intent explicitly rather than hinting at it. Specify the output format concretely and include one filled example, because examples generalise across versions far better than clever wording. Avoid depending on default behaviour such as length or tone — say what you want. Keep instructions atomic and ordered rather than one dense paragraph. Define the fallback explicitly: what should the model output when information is missing? Prefer a schema plus validation over trusting prose.",
      },
      {
        h: "The process that actually protects you",
        p: "Treat prompts as versioned artefacts in source control, each with an owner and a changelog. Maintain a golden test set of representative inputs with expected outputs, and run it automatically in CI. On a model upgrade, run the suite against the new version first, diff the outputs, and review before promoting. Pin the model version in production rather than floating to 'latest', and roll out a new version behind a canary. Monitor output validity — schema parse failures, length anomalies, refusal rates — so drift surfaces quickly even for inputs your test set missed.",
      },
    ],
    terms: [
      { t: "Golden set", d: "Fixed inputs with expected outputs used to detect behaviour changes." },
      { t: "Pinned model version", d: "Explicitly specifying a model release rather than tracking 'latest'." },
      { t: "Canary release", d: "Shipping to a small traffic slice first to catch regressions early." },
    ],
    sayIt:
      "I pin intent and format rather than model quirks: explicit instructions, a concrete output schema and one worked example, because examples survive version changes better than clever phrasings. Operationally, prompts live in version control with an owner and a golden test set of inputs and expected outputs. I pin the model version in production, and when we upgrade, the suite runs against the new version and I diff the outputs before promoting it behind a canary.",
  },

  24: {
    simple:
      "An agent is an LLM with tools, memory and a loop that lets it plan and act; a traditional LLM app is a fixed pipeline that answers once.",
    sections: [
      {
        h: "What makes something an agent",
        p: "Four ingredients. The LLM is the reasoning engine. Tools are functions it can call — search, a database query, a calculator, an API. Memory holds what has happened, short-term within a run and often long-term across runs. The loop ties it together: observe the goal, plan a step, act by calling a tool, observe the result, and re-plan until the goal is met or a limit is reached. Remove the loop and the tools and you simply have a chatbot.",
      },
      {
        h: "The differences that matter",
        p: "Control flow: a traditional app follows a path the developer wrote, whereas an agent decides its own path at runtime. Steps: one prompt and one response versus many iterations. State: stateless or simple chat history versus accumulated working memory. Capability: producing text versus taking actions that change real systems. Predictability: a fixed pipeline is testable and repeatable, while an agent's trajectory varies between runs. Cost and latency: one call versus potentially dozens.",
      },
      {
        h: "When to use which — and the governance consequence",
        p: "Use a traditional pipeline when the steps are known: classification, summarisation, standard RAG question answering. It is cheaper, faster and easier to test, and most production GenAI is still exactly this. Reach for an agent only when the path genuinely cannot be predetermined — the required information depends on what earlier steps return. Because agents take actions autonomously, they need guardrails that a Q&A bot does not: allow-listed tools with least privilege, capped iterations and budget, human approval for irreversible actions, and a complete action log.",
      },
    ],
    terms: [
      { t: "Tool calling", d: "The model emitting structured JSON naming a function and arguments for the runtime to execute." },
      { t: "ReAct", d: "The Reason + Act pattern: interleaving a thought, an action and an observation each cycle." },
      { t: "Trajectory", d: "The specific sequence of steps an agent took on one run." },
    ],
    sayIt:
      "An AI agent is an LLM plus tools, memory and a planning loop: it receives a goal, decides a step, calls a tool, reads the result and re-plans until it is done. A traditional LLM application is a fixed developer-defined pipeline — one prompt, one answer, no actions. The agent is more capable and far less predictable, so it needs guardrails: least-privilege tools, capped iterations, human approval for irreversible actions, and a full audit log of every step.",
  },

  25: {
    simple:
      "The model is about 20% of it — you also need orchestration, retrieval, guardrails, evaluation, observability, security and human checkpoints.",
    sections: [
      {
        h: "The request path",
        p: "Start at the edge: an API gateway handling authentication, authorisation, rate limiting and quotas. Then orchestration — the chain or agent graph that decides what happens, including retries, timeouts and fallback to a smaller model if the primary is unavailable. Then the retrieval layer with its vector database, hybrid search and re-ranking. Then the model layer itself, which should be abstracted behind an interface so you can swap providers without rewriting the application. Caching, both exact and semantic, sits across this path and is often the cheapest performance win available.",
      },
      {
        h: "The safety and quality layers",
        p: "Input guardrails screen for PII, prompt injection and out-of-scope requests. Output guardrails check for policy violations, hallucination signals, schema validity and the presence of citations. Prompt management keeps templates versioned with owners. The evaluation suite — golden sets, faithfulness and task metrics — runs in CI so a regression is caught before release rather than by a user. Human-in-the-loop checkpoints gate risky or irreversible actions.",
      },
      {
        h: "Operations and governance",
        p: "Observability means tracing every call end to end: latency, token usage, cost per request, error rates, and the full prompt and response for debugging. Monitoring and alerting tie to those signals. Add a feedback mechanism so users can flag bad answers, and feed that back into the golden set. Security covers secrets management, least-privilege tool credentials and data-retention terms with model vendors. Governance adds the model inventory, risk classification, documentation and audit logs. Answering in these layers, rather than naming a model, is what signals production experience.",
      },
    ],
    terms: [
      { t: "Semantic cache", d: "Reusing a previous answer when a new question is semantically near-identical." },
      { t: "Guardrail", d: "An automated filter on inputs or outputs enforcing safety and policy rules." },
      { t: "Tracing", d: "Recording each step of a request so failures and costs can be diagnosed." },
    ],
    sayIt:
      "The model is maybe twenty percent of the system. Around it you need an API gateway with auth and rate limiting, orchestration with retries and fallbacks, a retrieval layer, prompt version management, input and output guardrails, an evaluation suite running in CI, observability for traces, latency and token cost, human-in-the-loop checkpoints for risky actions, and security controls like least-privilege tool credentials and secrets management. Plus a model inventory and audit logs for governance.",
  },

  26: {
    simple:
      "LangChain gives you components and linear chains; LangGraph gives you a stateful graph with loops, branching and human interrupts. Linear flow → LangChain; loops or approvals → LangGraph.",
    sections: [
      {
        h: "What LangChain is for",
        p: "LangChain is an orchestration toolkit providing standard interfaces over models, embedding providers, vector stores, document loaders and tools, so you can swap components without rewriting your application. Its expression language composes steps into a pipeline — prompt, model, parser — and it ships ready-made patterns for retrieval question answering and summarisation. It shines when the sequence of steps is known in advance, which describes most production GenAI: a classic RAG chain is retrieve, then prompt, then generate, every time.",
      },
      {
        h: "What LangGraph adds",
        p: "LangGraph models the application as a graph of nodes with shared state. Because the graph may contain cycles, a node can route back — the loop an agent needs to retry, refine or gather more information. It supports conditional branching on state, persistent checkpointing so a long-running workflow can resume after a crash, human-in-the-loop interrupts that pause execution for approval and then continue, and multi-agent topologies where specialised agents hand work to each other. It also gives far better observability of exactly which path a run took.",
      },
      {
        h: "Choosing between them in one sentence",
        p: "If you can draw the flow as a straight line, use LangChain; if you need cycles, conditional routing, durable state or a pause for human approval, use LangGraph. They are complementary rather than rival — LangGraph is built by the same team and uses LangChain components inside its nodes. And it is worth saying that for a genuinely simple use case, plain Python calling the model API directly is often the right answer; frameworks earn their complexity only when the orchestration is real.",
      },
    ],
    terms: [
      { t: "LCEL", d: "LangChain Expression Language — composes components into a pipeline." },
      { t: "Checkpointing", d: "Persisting workflow state so execution can pause, resume or be audited." },
      { t: "Interrupt", d: "A deliberate pause in a graph awaiting human input before continuing." },
    ],
    sayIt:
      "LangChain is the component and integration layer — models, vector stores, loaders, tools — plus linear chains, which is ideal for standard RAG where the flow is fixed. LangGraph models the workflow as a stateful graph that supports cycles, conditional branching, persistence and human interrupts, which is what agents and approval workflows actually need. My rule is: straight-line flow, LangChain; loops, branching or a pause for human sign-off, LangGraph.",
  },

  27: {
    simple:
      "Because real goals take several steps, and each next step depends on what the previous one returned — so the agent must re-plan after every observation.",
    sections: [
      {
        h: "The intended reason for looping",
        p: "An agent cannot know its full plan in advance because the information needed to decide step three only arrives after step two executes. So it iterates: plan, act, observe, re-plan. This also gives error recovery — when a tool fails or returns something unexpected, the agent sees that observation and can try a different approach, which a single-shot pipeline cannot do. The loop is the mechanism that converts a text generator into something that can pursue a goal.",
      },
      {
        h: "The unintended reason — when loops go wrong",
        p: "There is a second meaning behind this question: agents sometimes get stuck looping. Typical causes are an ambiguous goal with no clear completion test, a tool that keeps returning unhelpful or identical results, the model failing to recognise it already has the answer, context overflow pushing earlier progress out of the window, or two agents bouncing work between each other. The result is wasted tokens, latency and real money.",
      },
      {
        h: "How to control it",
        p: "Always cap the loop: maximum iterations, a token or cost budget, and a wall-clock timeout. Define an explicit completion condition the agent must evaluate. Detect repetition — if the same tool is called with the same arguments twice, break or escalate. Keep a scratchpad so the agent can see what it has already tried. Make tool outputs informative, including clear errors, so the model can adapt. And escalate to a human when the limit is hit rather than failing silently. Mentioning these caps unprompted shows you have actually run agents in production.",
      },
    ],
    terms: [
      { t: "Max iterations", d: "A hard cap on loop cycles to prevent runaway execution." },
      { t: "Scratchpad", d: "The running record of thoughts, actions and observations within one run." },
      { t: "Termination condition", d: "The explicit test that tells the agent its goal is complete." },
    ],
    sayIt:
      "Agents loop by design because real goals need several steps and each step depends on the result of the last — so it plans, acts, observes and re-plans, which also gives it error recovery. The failure mode is looping without progress: ambiguous goals, unhelpful tool output, or the model not recognising it is done. I control that with max iterations, a cost budget, an explicit completion condition, repetition detection, and escalation to a human when a limit is hit.",
  },

  // ───────────────── Module 03 · ML in Practice ─────────────────
  28: {
    simple:
      "One class vastly outnumbers the other, so accuracy becomes meaningless — fix it with resampling, class weights and threshold tuning, and judge with recall, F1 or PR-AUC.",
    sections: [
      {
        h: "What it is and why it breaks models",
        p: "An imbalanced dataset has a heavily skewed class distribution — fraud at 0.5%, churn at 5%, defects at 1%. Two things go wrong. Evaluation breaks, because predicting the majority class always gives 99% accuracy while catching nothing. And training breaks, because most loss functions minimise total error, so the cheapest strategy is to ignore the rare class entirely. The cruel irony is that the rare class is almost always the one you care about.",
      },
      {
        h: "The three levels of fix",
        p: "Data level: oversample the minority by duplication or SMOTE, which synthesises new points between existing minority neighbours; or undersample the majority, which is fast but discards information. Algorithm level: set class_weight='balanced' so errors on the rare class cost proportionally more, available in most scikit-learn estimators and in XGBoost via scale_pos_weight; anomaly-detection methods are an option at extreme skew. Decision level: stop using the default 0.5 threshold — pick the operating point from a precision-recall curve based on the real cost of a miss versus a false alarm. This is often the cheapest and most effective change.",
      },
      {
        h: "Evaluating honestly",
        p: "Replace accuracy with precision, recall, F1 and especially PR-AUC, which is more informative than ROC-AUC under heavy skew because it ignores the overwhelming true negatives. Always stratify your train/test split so both sets contain the rare class, and use stratified k-fold cross-validation. Critically, apply resampling only to the training fold, never to validation or test data — resampling your test set gives you a beautiful score that means nothing. Finally, translate the trade-off into business terms: a missed fraud costs X, an unnecessary investigation costs Y, and that ratio sets the threshold.",
      },
    ],
    terms: [
      { t: "SMOTE", d: "Synthetic Minority Over-sampling: creates new minority points between existing neighbours." },
      { t: "PR-AUC", d: "Area under the precision-recall curve — the right summary metric under heavy imbalance." },
      { t: "Stratified split", d: "Splitting so each subset preserves the original class proportions." },
    ],
    sayIt:
      "An imbalanced dataset is one where one class dominates — fraud might be under one percent. The danger is that predicting the majority class scores ninety-nine percent accuracy and catches nothing. I handle it at three levels: data, with SMOTE or undersampling applied only to the training fold; algorithm, with balanced class weights; and decision, by tuning the threshold off the precision-recall curve based on the cost of a miss versus a false alarm. And I report recall, F1 and PR-AUC rather than accuracy.",
  },

  29: {
    simple:
      "Precision is how often your positive predictions are right; recall is how many real positives you caught; F1 is the harmonic mean of the two.",
    sections: [
      {
        h: "Define them from the confusion matrix",
        p: "Four cells: true positives (correctly flagged), false positives (false alarms), true negatives (correctly ignored) and false negatives (missed cases). Precision is TP / (TP + FP) — of everything I flagged, how much was real. Recall, also called sensitivity, is TP / (TP + FN) — of everything real, how much did I find. F1 is 2 × precision × recall / (precision + recall), the harmonic mean, which stays low unless both components are decent, unlike a simple average.",
      },
      {
        h: "The trade-off and the intuition",
        p: "They pull in opposite directions through the decision threshold. Lower the threshold and you flag more cases, catching more real positives (recall up) but admitting more false alarms (precision down). Raise it and the reverse happens. Use a concrete analogy in the room: a security guard who stops everyone has perfect recall and terrible precision; a guard who stops nobody has the opposite. Anchor it with numbers — 100 flagged, 80 correct means precision 0.80; 200 real cases with 80 caught means recall 0.40; F1 is about 0.53.",
      },
      {
        h: "Which one to optimise",
        p: "It depends entirely on the cost of each error type. Prioritise recall when a miss is catastrophic: disease screening, fraud detection, safety-critical defects — you accept false alarms as the price of catching everything. Prioritise precision when a false alarm is expensive or damaging: blocking legitimate customer transactions, flagging someone for investigation, sending an alert that wastes scarce analyst time. F1 is the right summary when both matter roughly equally. Say this trade-off out loud in business terms and you will sound like someone who has shipped a model rather than memorised definitions.",
      },
    ],
    terms: [
      { t: "Confusion matrix", d: "The 2×2 table of true/false positives and negatives underlying all these metrics." },
      { t: "Specificity", d: "TN / (TN + FP) — the share of actual negatives correctly identified." },
      { t: "Harmonic mean", d: "An average that punishes imbalance, so F1 is low if either metric is weak." },
    ],
    sayIt:
      "Precision is of everything I predicted positive, how much was actually positive. Recall is of all the real positives, how many I found. F1 is their harmonic mean, so it drops if either is weak. For example, flag a hundred calls as fraud with eighty correct and precision is 0.8; if there were two hundred real cases, recall is 0.4 and F1 about 0.53. Which one I optimise depends on cost: recall for fraud or disease screening where a miss is catastrophic, precision where false alarms are expensive.",
  },

  30: {
    simple:
      "Audit the data, measure performance sliced by group, mitigate what you find, document it, and keep humans deciding high-impact outcomes.",
    sections: [
      {
        h: "Understand where bias comes from",
        p: "Bias is rarely a bug in the algorithm; it is usually inherited. Historical bias means past decisions were unfair and the labels encode it, so a model trained on past hiring or lending decisions learns the discrimination. Representation bias means some groups are under-sampled, so the model is simply less accurate for them. Measurement bias means the proxy you chose differs in meaning across groups. Proxy variables are the subtle trap: removing a protected attribute does not remove bias, because postcode, device type or spending pattern can correlate strongly with it.",
      },
      {
        h: "Measure before you claim anything",
        p: "You cannot manage what you do not measure. Slice every metric by group rather than reporting one global number, and use explicit fairness definitions: demographic parity (similar positive rates across groups), equal opportunity (similar recall), and equalised odds (similar error rates both ways). These definitions are mathematically incompatible in general, so choose the one that matches the harm you are trying to prevent and say why. Set a tolerance in advance, for example recall parity within five percent, and treat breaching it as a release blocker.",
      },
      {
        h: "Mitigate, document and keep a human in the loop",
        p: "Mitigations exist at three stages: pre-processing (re-balance or re-weight the training data), in-processing (add fairness constraints to the objective), and post-processing (adjust thresholds per group where lawful — check legal advice, since this is regulated in many jurisdictions). Then document: a model card recording intended use, the slices tested, results and known limitations. Add explainability with SHAP so individual decisions can be interrogated. Re-test fairness on a schedule, because drift affects subgroups unevenly. And keep humans making the final call on high-impact outcomes, with a route for people to contest a decision.",
      },
    ],
    terms: [
      { t: "Proxy variable", d: "A feature correlated with a protected attribute, carrying bias even after removal." },
      { t: "Equal opportunity", d: "A fairness criterion requiring similar true-positive rates across groups." },
      { t: "Model card", d: "Documentation of a model's purpose, training data, evaluation slices and limitations." },
    ],
    sayIt:
      "I treat it as a measurement problem first. Audit the training data for representation gaps and historical bias, remembering that dropping a protected attribute does not help when proxies like postcode remain. Then evaluate sliced by group using an explicit fairness definition — usually equal opportunity — with a tolerance agreed up front, like recall parity within five percent. If it breaches, I mitigate by re-weighting or threshold adjustment where lawful, re-test, and document everything in a model card. And humans keep the final decision on high-impact outcomes.",
  },

  31: {
    simple:
      "Tell it in lifecycle order with honest numbers: problem, data, baseline, iteration, evaluation, deployment, monitoring — and what you learned.",
    sections: [
      {
        h: "Frame the problem in business terms first",
        p: "Open with why the project existed and how success was defined, because candidates who start with the algorithm reveal they were handed a dataset rather than a problem. State the objective, the available data and the metric chosen with its justification: 'reduce churn; eighteen months of billing and usage data; optimise recall because a missed churner costs far more than an unnecessary retention call.'",
      },
      {
        h: "Walk the technical spine honestly",
        p: "Data: where it came from, its size, and the real cleaning work — missing values, duplicates, leakage checks. Exploration: the two or three findings that shaped feature engineering. Baseline: always start with something dumb, such as logistic regression or a simple rule, because it validates the pipeline and gives the improvement a reference point. Iteration: the features you engineered, the models you compared, how you tuned them, and your validation strategy — time-based splitting for anything temporal. Results: real numbers including the baseline, for instance F1 moving from 0.58 to 0.71.",
      },
      {
        h: "Finish with deployment, monitoring and reflection",
        p: "Say how it shipped — a Flask or FastAPI endpoint, a batch job, a dashboard — and how it was monitored for drift and performance decay. Then add the reflection that separates strong candidates: what went wrong and what you would do differently. 'My first version leaked future information through an aggregate feature; I caught it because validation looked too good, and fixing the time-based split dropped the score to something believable.' Admitting a caught mistake demonstrates rigour far more convincingly than a flawless story.",
      },
    ],
    terms: [
      { t: "Baseline model", d: "A deliberately simple first model that proves the pipeline and sets a reference score." },
      { t: "Data leakage", d: "Information in training that would not exist at prediction time, inflating scores." },
      { t: "Feature engineering", d: "Creating informative inputs from raw data, often the biggest source of gains." },
    ],
    sayIt:
      "I built a churn prediction model. The business goal was reducing involuntary churn, and we optimised recall because a missed churner cost far more than an extra retention call. Data was eighteen months of billing and usage; cleaning meant deduplication and handling missing tenure. I started with logistic regression as a baseline at F1 0.58, then gradient boosting with tenure and complaint-frequency features reached 0.71, validated with a time-based split after I caught a leakage bug. It shipped as a FastAPI endpoint with monthly drift monitoring.",
  },

  // ───────────────── Module 04 · Data Engineering ─────────────────
  32: {
    simple:
      "Classify the document type, extract with the right tool (parser for digital, OCR for scans), clean the output, and attach metadata for traceability.",
    sections: [
      {
        h: "Classify before you extract",
        p: "Unstructured documents are not uniform. Within one folder you will find digital PDFs with a clean text layer, scanned images, mixed files where only some pages are scanned, Word documents, and HTML. The pipeline should detect the type per page rather than per file: attempt text extraction, and if a page returns almost nothing, route it to OCR. Hard-coding one path is the most common reason a document pipeline works in a demo and fails on the real archive.",
      },
      {
        h: "Extract with the appropriate tool",
        p: "Digital text: PyMuPDF for speed and layout fidelity. Tables: pdfplumber or Camelot, because a table flattened into a stream of numbers loses all meaning and will mislead any downstream model. Scans: Tesseract OCR, preceded by deskewing, denoising and binarisation, which materially improves character accuracy. Complex multi-column layouts: layout-aware tooling such as the unstructured library or LayoutLM-style models, which understand reading order. Word and HTML: python-docx and BeautifulSoup.",
      },
      {
        h: "Clean, structure and record provenance",
        p: "Raw extraction is never usable as-is. Strip repeated headers and footers, repair hyphenated words split across lines, normalise whitespace and unicode, and drop empty or boilerplate pages. Then impose structure: detect headings and clause numbers so the document's hierarchy survives. Attach metadata to every extracted unit — source file, page, section, extraction method, OCR confidence — because that provenance is what makes downstream answers citable and auditable. Route low-confidence pages to a manual review queue, log counts at each stage, and send unparseable files to a dead-letter queue so nothing disappears silently.",
      },
    ],
    terms: [
      { t: "Reading order", d: "The correct sequence of text blocks in a multi-column or complex layout." },
      { t: "Provenance", d: "The recorded origin of a piece of data — file, page, method, confidence." },
      { t: "Dead-letter queue", d: "Where failed items go so they are visible and replayable, not lost." },
    ],
    sayIt:
      "I classify each page first, because real archives mix digital and scanned pages. Digital pages go through PyMuPDF, tables through pdfplumber so structure survives, and scanned pages through Tesseract after deskewing and denoising. Then I clean aggressively — strip headers and footers, fix hyphenation, normalise whitespace — and attach metadata to every unit: file, page, section, extraction method and OCR confidence. Low-confidence pages go to human review and unparseable files to a dead-letter queue rather than being silently dropped.",
  },

  33: {
    simple:
      "An SCD is a dimension attribute that changes slowly over time; the type number defines whether you overwrite history, preserve it in new rows, or keep just the prior value.",
    sections: [
      {
        h: "The context: dimensions and facts",
        p: "In a dimensional warehouse, fact tables hold measurable events (a call, a payment) and dimension tables hold descriptive context (customer, plan, location). Dimension attributes change occasionally rather than constantly — a customer moves city, a plan is repriced. 'Slowly changing' names that pattern, and the design question is simply what should happen to the old value when a new one arrives.",
      },
      {
        h: "The types you must know",
        p: "Type 0 never changes, used for genuinely immutable attributes. Type 1 overwrites the old value: simple and compact, but history is destroyed, so historical reports silently change. Type 2 inserts a new row for each change with effective-from and effective-to dates, a current flag and a surrogate key, preserving the complete timeline — this is the audit standard and the expected answer. Type 3 adds a 'previous value' column, cheap but holding only one step of history. Types 4 and 6 exist too: Type 4 moves history into a separate mini-dimension, Type 6 is a hybrid of 1, 2 and 3.",
      },
      {
        h: "Why Type 2 matters and what it costs",
        p: "Type 2 is what lets you answer 'what did we believe on 1 April?' — essential for reconstructing a billing dispute, re-running a historical report, or satisfying a regulator who asks which tariff applied on a given date. The cost is real: the dimension grows with every change, queries must join on the date range rather than just the key, and ETL must correctly close the old row before opening the new one. In practice you often mix types within one table — Type 1 for a corrected typo, Type 2 for a genuine business change.",
      },
    ],
    terms: [
      { t: "Surrogate key", d: "A system-generated key uniquely identifying each version of a dimension row." },
      { t: "Effective dating", d: "The valid-from and valid-to columns defining when a row was true." },
      { t: "Current flag", d: "A boolean marking the active version so simple queries stay easy." },
    ],
    sayIt:
      "A Slowly Changing Dimension is a dimension attribute that changes occasionally over time, like a customer's plan or address. Type 1 overwrites and loses history. Type 2 inserts a new row with effective-from and effective-to dates plus a current flag, preserving the full timeline — that is the audit standard and my default, because someone will eventually ask what we believed on a specific date. Type 3 keeps only the previous value in an extra column. The cost of Type 2 is table growth and date-range joins in ETL.",
  },

  34: {
    simple:
      "Define what 'duplicate' means, find exact matches with GROUP BY or window functions, catch fuzzy ones after normalising, keep a survivor by rule, and quarantine the rest.",
    sections: [
      {
        h: "Decide the matching key first",
        p: "Before writing any SQL, define duplication for this dataset. Is it the same primary key, the same natural business key such as (document, clause), or the same entity recorded with different spellings? That decision drives everything. Exact duplicates are found with GROUP BY key HAVING COUNT(*) > 1, or in pandas with df.duplicated(subset=[...]). Always count them before deleting anything, because the count tells you whether you have a small data-entry issue or a broken ingestion job re-loading the same file.",
      },
      {
        h: "Remove exact duplicates safely",
        p: "The standard SQL approach uses a window function: assign ROW_NUMBER() OVER (PARTITION BY the key ORDER BY your survivorship preference) and delete everything where the row number exceeds one. Ordering by last-updated descending keeps the most recent; ordering by a completeness score keeps the richest record. In pandas, sort first and then drop_duplicates(subset=[...], keep='first'). Adding a unique constraint or an idempotent upsert afterwards prevents the problem recurring — fixing the cause beats repeatedly cleaning the symptom.",
      },
      {
        h: "Handle fuzzy duplicates and keep evidence",
        p: "Real duplicates are messy: 'Vodafone Idea', 'vodafone idea ltd.', 'Vodafone-Idea Limited'. Normalise first — lowercase, trim, collapse whitespace, strip punctuation and legal suffixes. Then compare with a similarity measure such as Levenshtein, Jaro-Winkler or token-set ratio, or phonetic keys like Soundex for names. Use blocking so you only compare records sharing a coarse key like city or first three characters, otherwise comparisons grow quadratically. Finally, never hard-delete without a trail: write removed rows to a quarantine table with a reason code and timestamp, so a wrong merge can be reversed and the clean-up can be evidenced.",
      },
    ],
    terms: [
      { t: "ROW_NUMBER()", d: "A SQL window function numbering rows within a partition, used for deduplication." },
      { t: "Blocking", d: "Restricting fuzzy comparisons to candidates sharing a coarse key, avoiding N² work." },
      { t: "Survivorship rule", d: "The documented rule deciding which duplicate record is kept as the golden copy." },
    ],
    sayIt:
      "First I define the duplicate key — primary key, business key, or fuzzy entity match. For exact duplicates I count them with GROUP BY HAVING COUNT(*) greater than one, then delete using ROW_NUMBER partitioned by the key, ordered so the most recent or most complete record survives. For fuzzy duplicates I normalise case, whitespace and legal suffixes, then use similarity matching with blocking so I am not comparing every pair. And I write removed rows to a quarantine table with a reason code rather than hard-deleting, so the clean-up is reversible and auditable.",
  },

  // ───────────────── Module 05 · MLOps & Governance ─────────────────
  35: {
    simple:
      "Describe three lanes — versioning with a tracker and registry, retraining triggered by schedule or drift, and monitoring with alerts and rollback — and be honest about your scale.",
    sections: [
      {
        h: "Versioning: experiments, models and data",
        p: "Every training run logs hyperparameters, metrics, the code commit, the dataset version and the output artifacts — MLflow or Weights & Biases handle this, with DVC for dataset versioning. Trained models are registered in a model registry and promoted through explicit stages, typically staging then production, with approval recorded. A production model is never overwritten in place; a new version is registered alongside, which is precisely what makes rollback instant. Reproducibility also demands pinned dependencies and fixed random seeds, otherwise 'version 14' is not actually reproducible.",
      },
      {
        h: "Retraining pipelines",
        p: "Retraining should be an automated pipeline rather than a person reopening a notebook. Triggers are a fixed schedule, a drift alarm, a performance threshold breach, or a known business change such as a pricing update. The pipeline reuses the same feature code as serving to avoid training-serving skew, validates the new model against the current production model on a hold-out set, and only promotes it if it wins on the agreed metric. Keep a champion-challenger setup so promotion is a measured decision rather than an assumption that newer is better.",
      },
      {
        h: "Production monitoring and honesty about scope",
        p: "Monitor three layers: operational (latency, throughput, error rate, cost), data (input drift via PSI or KS tests, schema violations, missing-value rates), and model (accuracy when labels arrive, plus proxy metrics while they lag, and performance sliced by segment). Alerts route to a named owner with a runbook. If your experience is project-scale rather than enterprise-scale, say so directly and then describe this design — interviewers are testing whether you understand the operating model, and an honest candidate with a clear design beats an inflated claim that collapses on the first follow-up.",
      },
    ],
    terms: [
      { t: "Model registry", d: "A catalogue of model versions with stages, lineage and approvals." },
      { t: "Champion-challenger", d: "Running a candidate model against the incumbent and promoting only if it wins." },
      { t: "Training-serving skew", d: "Differences between training and production feature computation that silently degrade accuracy." },
    ],
    sayIt:
      "I think of it in three lanes. Versioning: every run logged in MLflow with parameters, metrics, code commit and data version, and models promoted through a registry from staging to production, never overwritten, so rollback is instant. Retraining: an automated pipeline triggered by schedule or a drift alarm, reusing the serving feature code, with champion-challenger validation before promotion. Monitoring: operational metrics, input drift via PSI, and accuracy once labels arrive, all alerting to a named owner with a runbook.",
  },

  36: {
    simple:
      "Data drift is the inputs changing — detect it statistically without labels. Concept drift is the input-to-output relationship changing — detect it through performance decay.",
    sections: [
      {
        h: "Distinguish the two clearly",
        p: "Data drift, also called covariate shift, means the distribution of incoming features has moved away from the training distribution — a new customer segment, a changed upstream system, a pricing change altering usage patterns. The model itself is still correct about the world; it is just being asked about inputs it has not seen. Concept drift means the underlying relationship has changed: the same inputs should now produce different outputs, because fraudsters adapted their tactics or consumer behaviour shifted. There is also label drift, where the target distribution itself moves.",
      },
      {
        h: "How to detect each",
        p: "Data drift needs no labels, which is why it is your early warning system. Compare a recent window against a training baseline feature by feature using Population Stability Index (above roughly 0.2 indicates a significant shift) or a Kolmogorov-Smirnov test for continuous features and chi-square for categorical ones. Also monitor prediction drift — the distribution of model outputs — which is a cheap aggregate signal. Concept drift requires ground truth, so you track accuracy, recall or error rate as labels arrive. When labels lag by months, use proxies: the rate of manual overrides, downstream outcome rates, or confidence-score distributions.",
      },
      {
        h: "Operationalising the response",
        p: "Define a baseline window and refresh it deliberately rather than letting it slide. Set thresholds per feature, with tighter limits on features the model relies on most, and route alerts to a named owner with an agreed runbook: investigate the cause first, because a data-pipeline bug and a genuine market shift look identical on a drift chart but demand opposite responses. Then choose between recalibrating the threshold, retraining on recent data, or re-engineering features. Log drift metrics over time so the trend is visible, and review it in a regular model-risk forum rather than only when something breaks. Tools like Evidently, WhyLabs or NannyML automate much of this.",
      },
    ],
    terms: [
      { t: "PSI", d: "Population Stability Index: under 0.1 stable, 0.1–0.2 moderate shift, above 0.2 significant." },
      { t: "KS test", d: "Kolmogorov-Smirnov: compares two continuous distributions for a significant difference." },
      { t: "Label lag", d: "The delay between making a prediction and learning whether it was correct." },
    ],
    sayIt:
      "Data drift means the input distribution has shifted; I detect it without labels using PSI or a KS test comparing a recent window to the training baseline, with PSI above about 0.2 as the alert. Concept drift means the input-to-output relationship changed, which only shows as performance decay once labels arrive, so where labels lag I use proxies like override rates. Both alert a named owner with a runbook, and the first step is always diagnosis — a pipeline bug and a real market shift look identical on the chart but need opposite responses.",
  },

  37: {
    simple:
      "Log every run's parameters, metrics, code and data version in a tracking tool; promote models through a registry with stages; pin dependencies and seeds for reproducibility.",
    sections: [
      {
        h: "Experiment tracking",
        p: "The problem being solved is that dozens of runs blur together and nobody can reconstruct which configuration produced the good number. A tracker such as MLflow or Weights & Biases logs, for every run, the hyperparameters, the evaluation metrics, the code commit hash, the dataset version, the environment, and the output artifacts including the model file and plots. That makes runs comparable side by side and, crucially, reproducible months later when someone asks how a production model was built.",
      },
      {
        h: "Hyperparameter search done properly",
        p: "Random search generally beats grid search for the same budget, and Bayesian optimisation tools like Optuna beat both by learning from previous trials. Whatever the method, tune against cross-validated scores rather than a single split, and keep a final hold-out set that tuning never touches — otherwise you overfit to the validation set and your reported number is optimistic. Log every trial, not just the winner, because the distribution of results tells you how sensitive the model is to configuration.",
      },
      {
        h: "Model versioning and reproducibility",
        p: "Use a model registry as the single source of truth: each version carries its lineage back to the run that produced it, its stage (staging, production, archived), and who approved the promotion. Never overwrite a production model — register a new version so rollback is a stage change rather than a retraining exercise. Version the data too, with DVC or immutable dated snapshots, because the same code on different data is a different model. Pin library versions and fix random seeds. Adopt a clear naming and semantic-versioning convention so a conversation about 'v14' is unambiguous.",
      },
    ],
    terms: [
      { t: "MLflow", d: "Open-source platform for experiment tracking, model packaging and a model registry." },
      { t: "Optuna", d: "A Bayesian hyperparameter optimisation library that learns from prior trials." },
      { t: "Lineage", d: "The traceable chain from a deployed model back to its code, data and parameters." },
    ],
    sayIt:
      "Every run is logged in MLflow with hyperparameters, metrics, the code commit and the dataset version, so any result is reproducible and runs are comparable. For tuning I prefer random search or Optuna over grid search, scored with cross-validation, keeping a hold-out set that tuning never sees. Models go into a registry with stages and approvals, lineage back to the producing run, and no in-place overwrites, so rollback is just a stage change. Dependencies are pinned and seeds fixed, otherwise none of it is truly reproducible.",
  },

  38: {
    simple:
      "Monitor on three axes — accuracy with proxies while labels lag, fairness sliced by group on a schedule, and operational performance — all with thresholds, owners and runbooks.",
    sections: [
      {
        h: "Accuracy monitoring when labels are late",
        p: "The central difficulty is that ground truth usually arrives long after the prediction. So combine signals. Where labels do arrive, track accuracy, recall, precision and calibration on a rolling window and compare against the validation baseline. While waiting, use proxies: prediction distribution drift, confidence-score distributions, manual override rates, and downstream business outcomes. Periodically sample predictions for human labelling to create a small, reliable ground-truth set even when the natural label is slow.",
      },
      {
        h: "Fairness monitoring is continuous, not a launch gate",
        p: "Models are commonly tested for fairness once before release and never again, which is a mistake because drift affects subgroups unevenly — a model can stay fine in aggregate while degrading badly for one region or age band. Schedule sliced evaluation across the groups agreed with legal and risk, track disparity ratios over time with a defined tolerance, and alert when it breaches. Keep per-slice sample sizes in view, because a disparity measured on thirty cases is noise rather than evidence.",
      },
      {
        h: "Performance, governance and the response path",
        p: "Operationally, track latency percentiles (p50, p95, p99 — averages hide the problem), throughput, error and timeout rates, and cost per prediction, which for GenAI means token spend. Watch input data quality too: schema changes, null-rate spikes and range violations usually precede accuracy problems. Wrap it in governance: a model inventory with a risk tier, a named owner per model, dashboards reviewed on a cadence, an incident runbook covering rollback and escalation, and periodic independent review. The monitoring itself must be evidenced — in a regulated setting, 'we monitor' is a claim; a dated dashboard with thresholds and sign-offs is proof.",
      },
    ],
    terms: [
      { t: "Calibration", d: "Whether predicted probabilities match observed frequencies — a 0.8 score should be right 80% of the time." },
      { t: "p95 latency", d: "The response time the slowest 5% of requests exceed; averages hide tail pain." },
      { t: "Model inventory", d: "A register of every deployed model with owner, purpose and risk tier." },
    ],
    sayIt:
      "Three axes. Accuracy: rolling metrics where labels arrive, and proxies like confidence distributions and override rates while they lag, plus periodic human-labelled samples. Fairness: scheduled sliced evaluation with disparity ratios against an agreed tolerance, not a one-off check at launch, because drift hits subgroups unevenly. Performance: p95 latency, error rates and cost per prediction, with input data-quality checks. All of it has thresholds, a named owner, a runbook with rollback, and dated evidence — in a regulated setting, monitoring has to be provable, not just claimed.",
  },

  // ───────────────── Module 06 · Industry context ─────────────────
  39: {
    simple:
      "AI reads the regulations, extracts obligations, maps them to existing controls, flags the gaps, and drafts the evidence — turning weeks of manual reading into minutes.",
    sections: [
      {
        h: "Why telecom compliance suits AI so well",
        p: "The work is document-heavy, rule-heavy and deadline-heavy. Regulators publish a continuous stream of orders, directions and amendments; licences impose hundreds of conditions; and obligations must be tracked across many service areas simultaneously. Manual tracking does not fail because people are careless, it fails because the volume exceeds what careful reading can cover. That combination — large text volumes, repetitive extraction, strict traceability — is exactly where language models add value.",
      },
      {
        h: "The concrete pipeline",
        p: "Ingest the circular or licence. Use NER to pull out entities: the issuing body, clause numbers, dates, thresholds and penalties. Classify each paragraph as a binding obligation, guidance or background. Map each obligation against the internal control library using semantic similarity, so near-matches surface even when wording differs. Produce a gap list with owners and deadlines, and let a retrieval copilot answer 'what changed for us after this order?' with citations. Downstream, agents can assemble evidence packs, draft filings and chase overdue items.",
      },
      {
        h: "The value and the controls",
        p: "The benefits are speed, consistency — the same reading is applied every time rather than varying by reviewer — coverage across all circles, and an auditable chain from regulation to control to evidence. A published example is the Telstra programme, where an operator deployed an AI-driven compliance solution on an enterprise platform with agent-to-agent communication to simplify regulations, predict risks and optimise compliance. The controls matter just as much: answers must cite the source clause, a compliance professional reviews before anything is filed, and every AI action is logged, because an unverifiable compliance claim is worse than none.",
      },
    ],
    terms: [
      { t: "RegTech", d: "Technology that automates regulatory compliance tasks and reporting." },
      { t: "Obligation register", d: "The structured list of every requirement an organisation must meet, with owners." },
      { t: "Control mapping", d: "Linking each obligation to the internal control that satisfies it, exposing gaps." },
    ],
    sayIt:
      "Telecom compliance is document-heavy and rule-heavy, which is ideal for AI. The pipeline ingests circulars and licences, uses NER to extract clause numbers, dates and thresholds, classifies paragraphs as binding obligations or guidance, then maps each obligation to the internal control library and produces a gap list with owners and deadlines. A retrieval copilot answers 'what changed for us' with citations. Telstra's published programme is a real example. The essential controls are mandatory citations, human review before filing, and logging every action.",
  },

  40: {
    simple:
      "Agents continuously reconcile usage against billing and scan call records for anomalies, then open investigation tickets with evidence attached — with humans approving anything customer-facing.",
    sections: [
      {
        h: "What the two functions actually do",
        p: "Revenue assurance hunts for leakage between services delivered and revenue collected: rating errors where usage is priced wrongly, unbilled usage, interconnect settlement disputes with other operators, roaming discrepancies, and provisioning mismatches where an active service is never billed. Fraud management is its adversarial sibling, detecting SIM-box bypass that routes international calls as local, subscription fraud using false identities, IRSF revenue-share fraud, and account takeover. Leakage typically runs at a few percent of revenue, so the numbers are material.",
      },
      {
        h: "Why agents fit this work specifically",
        p: "These tasks are chains of small checks across many systems, which is precisely what an agent loop handles well. An agent can query the mediation system, pull the corresponding billing record, compare them, check the customer's plan, decide whether the variance exceeds tolerance, and either close the item or open a ticket with the evidence attached. It can run continuously rather than in a monthly cycle, investigate the specific thing each result suggests, and escalate what it cannot resolve. On fraud, anomaly-detection models over call detail records flag unusual patterns — sudden international spikes, improbable call durations, impossible location changes — and the agent assembles the case file.",
      },
      {
        h: "The guardrails that must come with it",
        p: "Action risk must be triaged by reversibility. Reversible actions such as flagging an account, opening a ticket or requesting verification can be automated. Irreversible or customer-affecting actions — disconnection, refunds, penalty waivers, regulatory filings — require human approval. Every decision needs an explanation, because disputed charges may be challenged by a customer or examined by a regulator. Agents hold least-privilege credentials, typically read-only against billing systems. False-positive rates are monitored, since aggressive fraud blocking harms genuine customers. And the full action log is immutable, forming the audit trail.",
      },
    ],
    terms: [
      { t: "Revenue leakage", d: "Revenue earned but never billed or collected, due to process or system gaps." },
      { t: "SIM-box fraud", d: "Routing international calls through local SIMs to bypass interconnect charges." },
      { t: "CDR", d: "Call Detail Record — the per-event log of calls and data sessions used for billing and analysis." },
    ],
    sayIt:
      "Revenue assurance looks for leakage between services delivered and revenue collected — rating versus billing mismatches, unbilled usage, interconnect and roaming errors — and fraud management detects SIM-box bypass, subscription fraud and IRSF from call detail records. Agents suit this because the work is long chains of small checks across systems: query mediation, pull the billing record, compare, decide, open a ticket with evidence. The guardrails matter — reversible actions like flagging can be automated, but disconnections, refunds and filings need human approval, with least-privilege access and an immutable log.",
  },

  41: {
    simple:
      "Subscriber privacy, explainability for billing decisions, least-privilege agent access, immutable audit logs, and human approval for anything irreversible or customer-facing.",
    sections: [
      {
        h: "Data privacy and residency",
        p: "Call detail records, location data and subscriber identity are highly sensitive personal data, frequently subject to localisation requirements and lawful-interception rules. The practical controls are pseudonymisation or redaction before any data reaches an external model, strict data-minimisation so prompts carry only what is needed, verified data residency for any cloud service, and contractual guarantees that prompts are not retained or used for vendor training. Self-hosting an open-weight model is often the cleanest answer for the most sensitive workloads.",
      },
      {
        h: "Explainability, accuracy and accountability",
        p: "Decisions that affect a customer's bill or service must be explainable to that customer, to the regulator and potentially to a tribunal. That rules out unexplained black-box outputs for consequential actions and requires the reasoning chain, the inputs used and the model version to be recorded. Hallucination becomes a compliance risk rather than an inconvenience: an AI-drafted regulatory filing containing an invented figure is a reportable problem, so grounding, citations and human sign-off are mandatory. Accountability must be named — a specific owner for each model, not 'the AI did it'.",
      },
      {
        h: "Agent-specific and operational risks",
        p: "Agents acting across network and IT systems introduce fresh exposure: over-broad credentials, prompt injection arriving through ingested documents or customer messages, runaway loops consuming budget, and agent-to-agent chains where one error propagates. Controls are allow-listed tools with least-privilege scoped credentials, capped iterations and spend, reversibility-based triage with human approval for irreversible actions, immutable logging of every step, red-teaming before launch, and a kill switch. Wrap it in governance: a model inventory with risk tiers, bias testing where customers are segmented, vendor risk assessment, and alignment to a recognised framework such as NIST AI RMF or ISO/IEC 42001.",
      },
    ],
    terms: [
      { t: "Pseudonymisation", d: "Replacing identifiers with surrogates so data cannot be tied to a person without a key." },
      { t: "Data residency", d: "Legal requirements on which country data is stored and processed in." },
      { t: "Kill switch", d: "A mechanism to halt an agent or model immediately when it misbehaves." },
    ],
    sayIt:
      "Four main areas. Privacy: CDRs and location data are sensitive and often subject to localisation, so pseudonymise before any external call and verify residency and no-training terms. Explainability: billing-affecting decisions must be defensible to a regulator, so the reasoning, inputs and model version are logged. Agent risk: least-privilege scoped credentials, allow-listed tools, capped iterations, injection defences and human approval for irreversible actions. And governance on top — a model inventory with risk tiers, bias testing and alignment to something like NIST AI RMF.",
  },

  // ───────────────── Coding round ─────────────────
  42: {
    simple:
      "Loop the list once and test each number with n % 2 — zero remainder means even, otherwise odd.",
    sections: [
      {
        h: "The logic",
        p: "The modulo operator % returns the remainder of a division. Any integer divided by 2 leaves a remainder of either 0 or 1, so n % 2 == 0 identifies even numbers and anything else is odd. A single pass over the list is enough, which makes this O(n) in time. Talk through this reasoning before you start typing — interviewers are assessing how you think as much as whether the code runs.",
      },
      {
        h: "Writing it cleanly",
        p: "Two list comprehensions are the idiomatic Python solution and read almost like English. If the interviewer prefers a single pass, use one explicit for-loop appending to two lists, which touches each element exactly once. Both are correct; mentioning that you could do it either way, and why, demonstrates fluency rather than memorisation.",
      },
      {
        h: "Edge cases and follow-ups",
        p: "Mention them proactively: an empty list returns two empty lists; zero is even since 0 % 2 == 0; negative numbers work correctly in Python because -4 % 2 is 0. If the list might contain non-integers, filter with isinstance first. Likely follow-ups are counting instead of listing, using filter with a lambda, or handling a very large list with a generator to avoid holding everything in memory.",
      },
    ],
    terms: [
      { t: "Modulo (%)", d: "Returns the remainder after division; the standard parity test." },
      { t: "List comprehension", d: "Concise Python syntax for building a list from an iterable with a condition." },
      { t: "O(n)", d: "Runtime grows linearly with input size — here, one pass over the list." },
    ],
    sayIt:
      "I will walk the list once and use the modulo operator: n % 2 == 0 means even, otherwise odd. Two list comprehensions give a clean two-line solution, or one explicit loop appending to both lists if we want a strict single pass. It is O(n) time. Edge cases: an empty list gives two empty lists, zero counts as even, and negatives behave correctly in Python.",
  },

  43: {
    simple:
      "Numbers below 2 are not prime; otherwise test divisors from 2 up to the square root of n — if nothing divides it, it is prime.",
    sections: [
      {
        h: "The definition and the edge cases",
        p: "A prime number is a whole number greater than 1 whose only divisors are 1 and itself. Handle the boundaries explicitly and first: anything less than 2 is not prime, which covers 0, 1 and all negatives; 2 is prime and is the only even prime. Candidates who forget that 1 is not prime lose easy credit, so state it deliberately.",
      },
      {
        h: "Why the loop stops at the square root",
        p: "This is the real question being asked. If n has a divisor larger than its square root, then the matching co-factor must be smaller than the square root, and you would already have found it. For 36, the pairs are 2×18, 3×12, 4×9 and 6×6 — every pair has one member at or below 6, which is √36. So checking up to and including the integer square root is sufficient, reducing the work from O(n) to O(√n). Being able to explain this clearly matters more than the code itself.",
      },
      {
        h: "Optimisations and follow-ups",
        p: "A further refinement: handle 2 separately, then test only odd divisors, roughly halving the iterations. The standard follow-up is generating all primes up to N, where you should name the Sieve of Eratosthenes, which marks multiples as composite and runs in about O(n log log n) — far better than testing each number individually. Another common follow-up is primality testing for very large numbers, where you would mention probabilistic tests such as Miller-Rabin.",
      },
    ],
    terms: [
      { t: "Prime", d: "An integer greater than 1 divisible only by 1 and itself." },
      { t: "O(√n)", d: "Runtime proportional to the square root of n — the gain from stopping at the root." },
      { t: "Sieve of Eratosthenes", d: "An efficient algorithm for finding all primes up to a limit by marking multiples." },
    ],
    sayIt:
      "First the edge cases: anything below 2 is not prime, and 2 is the only even prime. Then I loop from 2 up to the integer square root of n and return False if any value divides it evenly. The square root bound is the key insight — if a divisor larger than the root existed, its co-factor would be smaller than the root and we would already have found it — so it is O(√n) rather than O(n). If asked for all primes up to N, I would use the Sieve of Eratosthenes instead.",
  },
};
