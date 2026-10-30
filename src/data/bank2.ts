import type { InterviewQuestion } from "./questions";

// Second half of the combined-bank additions (ML/DL, data engineering, MLOps,
// design, coding) plus trainer's-extra questions. Same shape as bank.ts.
type Extra = InterviewQuestion & { bankNum: string; cites: string[] };

function e(
  ref: number, bankNum: string, diff: "B" | "I" | "A", section: string,
  topicId: string, q: string, a: string, cites: string[], code?: string
): Extra {
  return { ref, bankNum, diff, section, topicId, q, a, cites, code,
    sourceLabel: `Combined question bank (${cites.join(", ")})`, sourceUrl: "#sources" };
}

export const EXTRA_QUESTIONS_2: Extra[] = [
  // ─── ML & DL Fundamentals ───
  e(146, "Q46", "B", "ML & DL Fundamentals", "foundations",
    "What is supervised learning?",
    "Learning a mapping from labelled examples — pairs of input and correct answer — so the model generalises to unseen inputs. It splits into classification (predict a category) and regression (predict a number). Contrast with unsupervised learning, which finds structure in unlabelled data, and reinforcement learning, which learns from rewards.",
    ["S1", "S5"]),
  e(147, "Q47", "B", "ML & DL Fundamentals", "foundations",
    "Classification vs regression?",
    "Classification predicts a category — fraud / not fraud, churn / stay — and you evaluate it with accuracy, precision, recall, F1 and AUC. Regression predicts a continuous number — next month's usage, a price — and you evaluate it with MAE, RMSE or R². The same features can often serve either, depending on how you frame the target.",
    ["S1", "S4"]),
  e(148, "Q48", "B", "ML & DL Fundamentals", "ml",
    "What is overfitting?",
    "The model memorises the training data, noise included, and fails on new data. The signature: training accuracy far above validation accuracy. Fixes: more data, a simpler model, regularization (L1/L2, dropout), cross-validation and early stopping.",
    ["S1", "S5"]),
  e(149, "Q49", "B", "ML & DL Fundamentals", "ml",
    "What is underfitting?",
    "The model is too simple to capture the real pattern — both training and test scores are poor. Fixes: a more powerful model, better features, less regularization, or training longer. The diagnosis matters, because the cure for underfitting (more capacity) is the opposite of the cure for overfitting.",
    ["S1", "S5"]),
  e(150, "Q50", "B", "ML & DL Fundamentals", "ml",
    "What is cross-validation?",
    "Instead of one train/test split, split the data into k folds, train k times using k−1 folds for training and the remaining fold for scoring, rotating each time. You get a mean score and a variance, which is far more trustworthy than a single lucky split. Use stratified folds for imbalanced classes and time-based splits — never shuffled ones — for time-series data.",
    ["S5", "S1"]),
  e(151, "Q51", "I", "ML & DL Fundamentals", "ml",
    "Explain the bias–variance tradeoff.",
    "Total error = bias² + variance + irreducible noise. High bias (underfitting): the model is too rigid and misses the pattern. High variance (overfitting): the model waves with the training noise and fails on new data. The trade-off is that reducing one usually raises the other, so the goal is the sweet spot of best held-out performance, found with cross-validation, regularization and enough data.",
    ["S1", "S5"]),
  e(154, "Q54", "I", "ML & DL Fundamentals", "ml",
    "What is a confusion matrix?",
    "A small table — true positives, false positives, true negatives, false negatives — that shows exactly where a classifier goes wrong. Every headline metric comes from it: precision, recall, F1, specificity and accuracy. Read it before any aggregated score, because 99% accuracy can hide zero recall on the class that matters.",
    ["S5", "S9"]),
  e(155, "Q55", "I", "ML & DL Fundamentals", "ml",
    "What is data leakage and how do you prevent it?",
    "Leakage is when training features contain information that would not exist at prediction time — for example, an aggregate computed over the whole dataset including the test period, or “days until cancellation” used to predict churn. The model then looks miraculous in evaluation and fails in production. Prevention: split before any preprocessing, fit scalers and encoders on training data only, time-based splits for temporal problems, and a suspicious eye on any result that looks too good.",
    ["S1", "S5"]),
  e(156, "Q56", "I", "ML & DL Fundamentals", "ml",
    "What is feature engineering?",
    "Turning raw data into informative model inputs: extracting day-of-week from timestamps, computing ratios and rolling averages, binning continuous values, encoding categories, or building interaction terms. In classical ML it is usually the largest single source of accuracy gains — bigger than model choice. Deep learning learns features automatically, which is powerful but needs far more data.",
    ["S1", "S5"]),
  e(157, "Q57", "I", "ML & DL Fundamentals", "ml",
    "Normalization vs standardization?",
    "Normalization scales values to a fixed range, typically 0–1 with min-max; standardization subtracts the mean and divides by the standard deviation, giving mean 0 and std 1. Use normalization when you want bounded inputs or are feeding distance-based models like k-NN; standardization with outliers and for linear models such as logistic regression. Either way, fit the scaler on training data only, then apply it to validation and test.",
    ["S5", "S9"]),
  e(158, "Q58", "I", "Foundations & AI basics", "foundations",
    "How do neural networks work?",
    "Layers of simple units: each neuron multiplies inputs by weights, sums them, and applies a non-linear activation such as ReLU. Data flows forward through input → hidden layers → output. A loss function measures the error, backpropagation computes each weight's share of blame with the chain rule, and gradient descent nudges the weights to reduce the loss. Repeat over epochs — that loop is “training”.",
    ["S1", "S5"]),
  e(159, "Q59", "I", "Foundations & AI basics", "foundations",
    "What are activation functions, and which ones matter?",
    "The non-linearity after each layer's weighted sum — without it, stacked layers collapse into one linear function. ReLU is the default in hidden layers: fast and avoids the vanishing-gradient problem, but can produce dead neurons (Leaky ReLU and GELU fix that). Softmax turns logits into class probabilities for multi-class outputs; sigmoid squashes to 0–1 for binary outputs.",
    ["S1", "S5"]),
  e(160, "Q60", "I", "Foundations & AI basics", "foundations",
    "What is backpropagation?",
    "The algorithm that tells you how to adjust every weight. After a forward pass produces a prediction, the loss measures the error, and backpropagation applies the chain rule backwards through the network to compute each weight's gradient — its share of responsibility. Gradient descent then steps each weight opposite its gradient. Backprop computes the gradients; gradient descent uses them. Together they are how networks learn.",
    ["S5", "S9"]),
  e(161, "Q61", "I", "Foundations & AI basics", "foundations",
    "CNN vs RNN vs LSTM vs Transformers?",
    "CNNs use sliding convolutional filters and shine on spatial data like images. RNNs process sequences token by token with a carried hidden state, but struggle with long-range dependencies. LSTMs add input, forget and output gates to an RNN, fixing most of the vanishing-gradient problem. Transformers abandon recurrence for self-attention — every token attends to every other token in parallel — which scales to huge datasets and long sequences, and is why they dominate language today.",
    ["S5", "S1"]),
  e(162, "Q62", "I", "Foundations & AI basics", "foundations",
    "What is the attention mechanism?",
    "A way for the model to weigh which inputs matter for each output. Each position produces a query; it is compared (dot product, then softmax) against every position's key, producing weights; the output is a weighted sum of the values. Self-attention does this within a single sequence, so a pronoun can focus on its antecedent 50 words earlier. Multi-head attention runs several of these views in parallel. It is the core of the transformer.",
    ["S5", "S3"]),
  e(163, "Q63", "I", "Foundations & AI basics", "foundations",
    "LayerNorm vs BatchNorm?",
    "BatchNorm normalises across the batch dimension for each feature: great for CNNs in computer vision with large batches, but awkward with small batches and variable-length sequences. LayerNorm normalises across the features within each individual sample: independent of batch size and sequence length, which is why every transformer uses it. Memory hook: BatchNorm across samples, LayerNorm within a sample.",
    ["S3", "S5"]),
  e(166, "Q66", "I", "ML & DL Fundamentals", "ml",
    "What is the AI model lifecycle?",
    "A loop, not a line: define the problem → collect and clean data → train → validate on held-out data (performance plus fairness) → deploy behind an API or batch job, versioned → monitor in production for drift and decay → retrain when triggers fire, and repeat. Deploying is the midpoint, not the finish line — saying this out loud signals you think beyond notebooks.",
    ["S6", "S1"]),
  e(167, "Q67", "A", "ML & DL Fundamentals", "foundations",
    "Why does ReLU have a drawback?",
    "The dying-ReLU problem: ReLU outputs zero for every negative input with a zero gradient, so a neuron pushed permanently negative by a bad update or a large gradient stops learning forever. Ensembles of such dead neurons silently reduce capacity. Fixes: Leaky ReLU, which keeps a small slope for negatives; GELU or SiLU, which are smooth alternatives used in modern transformers; and, preventively, sensible learning rates and initialization.",
    ["S3", "S5"]),
  e(168, "Q68", "A", "ML & DL Fundamentals", "foundations",
    "If all weights are initialized to the same value, what happens?",
    "Symmetry never breaks. Every neuron in a layer computes the same output, receives the same gradient, and updates identically — so they stay identical forever, and the network behaves like a single neuron per layer no matter how wide it is. That is why all-zero or all-constant initialization is fatal and why random initialization such as Xavier or He is essential.",
    ["S3", "S9"]),
  e(169, "Q69", "A", "ML & DL Fundamentals", "foundations",
    "If the loss becomes NaN during training, what are the possible reasons?",
    "Usual suspects in order: the learning rate is too high, so updates explode past numerical range (lower it); exploding gradients (add gradient clipping); numerical instability inside the math, like log(0) or an unprotected exp (use log-sum-exp formulations); NaNs or infinities already in the data (sanitize the inputs); and invalid operations such as a square root of a negative number. Debug with anomaly detection mode and by printing intermediate ranges.",
    ["S3", "S9"]),
  e(170, "Q70", "A", "ML & DL Fundamentals", "ml",
    "If classifier accuracy on an example is 1 (correct), what are the bounds on the cross-entropy loss for that example?",
    "Cross-entropy loss for one example is −log(p) where p is the probability assigned to the correct class. A correct prediction only means p is the largest. If the model is barely confident — say p = 0.51 with two classes — the loss is about 0.67, close to its maximum for a correct prediction (approaching −log(0.5)). If it is perfectly certain (p → 1), the loss approaches 0. So accuracy 1 with low confidence can still carry high loss; accuracy hides confidence, log loss does not.",
    ["S3", "S9"]),

  // ─── Data Engineering ───
  e(174, "Q74", "I", "Data Engineering", "dataeng",
    "How would you clean a messy “experience” column (“5 yrs”, “60 months”, “Fresher”) into numeric years?",
    "Parse with rules per pattern: extract the number and its unit, convert months to years by dividing by 12, map vocabulary like “Fresher” to 0, and coerce unparseable values to null with a needs_review flag rather than guessing. Then validate the plausible range (0–50 years) and print the distribution before and after so the cleaning is evidenced. A regex-plus-mapping function with a test on edge cases is the expected implementation.",
    ["S2", "S10"]),
  e(175, "Q75", "I", "Data Engineering", "dataeng",
    "What is data lineage and why does it matter?",
    "The recorded journey of a data item: where it came from, every transformation applied, and where it landed. It matters for debugging (when a dashboard number moves, lineage shows which upstream change caused it), for compliance and audit (you can evidence exactly how a reported figure was produced), and for impact analysis before changing a column. In AI systems, lineage on every ingested chunk is what makes answers citable to a source page.",
    ["S7", "S5"]),

  // ─── MLOps & Governance ───
  e(176, "Q76", "B", "MLOps & AI Governance", "mlops",
    "What is MLOps?",
    "DevOps discipline applied to machine learning: versioning data, code and models; CI/CD pipelines that test and deploy models; monitoring of accuracy, drift and cost in production; scheduled or triggered retraining; and one-click rollback. The mental shift is that a notebook is not a product — a product needs reproducibility, monitoring and an owner.",
    ["S1", "S6"]),
  e(177, "Q77", "B", "MLOps & AI Governance", "mlops",
    "Batch vs real-time deployment?",
    "Batch scores a large backlog on a schedule — nightly churn scores, monthly reconciliations — and optimises throughput and cost. Real-time answers one request at a time behind an API with tight latency, which constrains model size and feature lookups. Safe rollouts use shadow mode (run silently beside production and compare) and canary releases (a small traffic slice first).",
    ["S1", "S6"]),
  e(182, "Q82", "I", "MLOps & AI Governance", "mlops",
    "What security risks exist for LLM applications?",
    "Prompt injection from user messages or poisoned documents; PII leakage in both directions (data sent out in prompts, data revealed in answers); tool misuse by agents with over-broad permissions; data poisoning of the knowledge index; model and weight theft; denial-of-wallet through runaway loops; and supply-chain risk from third-party models and plugins. Mitigate with injection defences, redaction, least privilege, input validation, rate limits and tested models with pinned versions.",
    ["S6", "S7"]),
  e(183, "Q83", "I", "MLOps & AI Governance", "mlops",
    "How do you govern AI in a regulated industry?",
    "Make every claim provable. Inventory every model with an owner, purpose and risk tier. Document intended use, training data and limitations (model cards). Test accuracy and bias on recorded slices before release and on a schedule after. Keep human approval for high-impact decisions. Log every decision immutably so it can be reconstructed. Enforce data residency and retention rules. And align the operating model to NIST AI RMF or ISO/IEC 42001 with periodic audits.",
    ["S7", "S6"]),
  e(184, "Q84", "A", "MLOps & AI Governance", "mlops",
    "How do you design a complete CI/CD pipeline for ML models?",
    "Stages: data validation (schema, nulls, ranges) → training → evaluation gate (performance, fairness, calibration versus thresholds versus the incumbent model) → packaging with pinned dependencies → staging deployment → shadow or canary in production → full rollout, with automated rollback if metrics degrade. Every gate emits an artifact so the promotion decision is evidenced. Rollback is to the previous registry version, monitored like any deploy.",
    ["S1", "S6"]),
  e(185, "Q85", "A", "MLOps & AI Governance", "mlops",
    "How do you optimise cost for ML workloads on cloud?",
    "Training is interruptible, so use spot instances with checkpointing and train on schedule windows. Inference is cost per request: right-size instances, autoscale on real load, batch requests, quantise or distil to smaller models, and cache frequent predictions. For LLMs specifically, cap output tokens, route easy queries to small models, and use semantic caching. Add budget alerts and attribute spend per model and per team, because cost visibility is what makes any of this stick.",
    ["S6", "S1"]),
  e(186, "Q86", "A", "MLOps & AI Governance", "mlops",
    "How would you evaluate an LLM feature when there is no single correct answer?",
    "Build a domain-specific evaluation set from real user queries with rubric criteria instead of a single gold answer. Combine human evaluation — the gold standard, expensive — with LLM-as-judge scoring against a fixed rubric, keeping human spot-checks on the judge. For retrieval-heavy features score the two halves separately: context recall for retrieval, faithfulness and relevance for generation. Track rubric metrics over time and gate releases on them.",
    ["S6", "S7"]),
  e(187, "Q87", "A", "MLOps & AI Governance", "mlops",
    "What does LLM-as-a-judge do, and what are its failure modes?",
    "A strong model scores another system's outputs against a rubric — making evaluation scalable and cheap. Failure modes: judges prefer fluent, long and confident answers (style bias); self-preference for their own family of models; positional bias in pairwise comparisons; high variance across runs; and blindness to subtle factual errors. Mitigations: strict rubrics, multiple judges or multiple seeds, position-swapped pairwise tests, human calibration on a sample, and never letting the judge be the only gate for high-stakes deployment.",
    ["S6", "S7"]),

  // ─── Scenario & System Design ───
  e(188, "Q88", "A", "Scenario & System Design", "mlops",
    "Design a real-time fraud detection system.",
    "Features: amount, merchant category, location delta, velocity counts, device fingerprint. Model: gradient boosting (XGBoost/LightGBM) for millisecond latency and tabular strength. Decision tiers from the score: above 0.7 block, 0.3–0.7 step-up verification, below 0.3 pass. Latency target under 100 ms at the tail (p99). Feedback loop: fraud outcomes label the data and retrain weekly. Metrics are precision (false positives destroy customer trust) and recall (false negatives are direct fraud loss), with the threshold set from their cost ratio.",
    ["S1", "S6"]),
  e(189, "Q89", "A", "Scenario & System Design", "ml",
    "Design a recommendation system (video/content style).",
    "Two stages. Retrieval shrinks a catalogue of millions to about a thousand candidates fast — matrix factorization or a two-tower network embedding users and items. Ranking orders those candidates with a richer model (wide & deep or a transformer) using user, item and context features. Evaluate online with CTR and watch time, offline with NDCG, and explicitly track coverage, diversity and filter-bubble effects. Retrain on fresh interaction data frequently because taste drifts.",
    ["S1", "S6"]),
  e(190, "Q90", "A", "Scenario & System Design", "modern-ai",
    "Design a RAG-based Q&A system for internal documents WITH access control.",
    "Store a permission label on every chunk in the vector database. At query time, resolve the user's entitlements and filter candidate chunks before similarity search — never filter after, because post-filtering leaks information through the ranking and whatever is already in the prompt. Ground answers with citations, abstain under low confidence, redact PII, log every retrieval for audit, and run the whole thing on-prem or on a private endpoint if the content is confidential.",
    ["S6", "S7"]),
  e(191, "Q91", "A", "Scenario & System Design", "modern-ai",
    "Design a customer-service AI agent that controls token cost.",
    "Ground answers with RAG so prompts stay short instead of pasting the whole FAQ. Semantic-cache frequent questions. Route by difficulty: a small model answers simple intents, complex ones escalate to a larger model, unresolved ones go to a human with the transcript attached. Cap iterations and output tokens per conversation. Monitor cost per resolved conversation — the metric that matters — with budget alerts, and abuse protection at the gateway so one user cannot run up the meter.",
    ["S6", "S7"]),
  e(192, "Q92", "A", "Scenario & System Design", "modern-ai",
    "An agent has access to the billing database and an email tool. A user asks: “email me the top 10 defaulters.” What should happen?",
    "Refuse by default. This is a bulk export of personal data sent outside a boundary — a high-risk, potentially impermissible action. The correct behaviour: the agent explains it cannot do that, checks whether the email tool is even in its allow-list (least privilege means it is not), requires manager approval if such an export is ever allowed, logs the request, and offers a safe alternative such as an in-app report with masked identifiers and an audit trail.",
    ["S7", "S6"]),
  e(193, "Q93", "A", "Scenario & System Design", "mlops",
    "How would you evaluate whether an AI system is production-ready in a regulated environment?",
    "Run a release checklist: accuracy and fairness on held-out data against thresholds; hallucination rate on a golden set below an agreed limit; citations or explanations present on outputs; security testing covering injection, PII leakage and access control; immutable audit logging verified end to end; human-in-the-loop wired for high-risk actions; monitoring, drift alerts and a tested rollback; documented owner, model card and data lineage; and a final compliance sign-off. Any unmet gate blocks release.",
    ["S7", "S6"]),
  e(194, "Q94", "A", "Scenario & System Design", "modern-ai",
    "A deployed conversational model gives confident but factually wrong answers in high-risk contexts. Investigate and mitigate.",
    "Quantify first: score an evaluation set for how often answers are wrong AND confident, not just wrong. Investigate the cause in layers — retrieval gap (no relevant context was present), prompt problem (no instruction to abstain), or calibration problem (model confidently improvises). Mitigate: ground with retrieved context, require citations, explicitly instruct uncertainty expression, add a verification pass on high-risk answers, and route the highest-risk categories to humans. Then re-run the eval and confirm the confident-wrong rate actually dropped before closing the incident.",
    ["S7", "S6"]),
  e(195, "Q95", "A", "Scenario & System Design", "modern-ai",
    "How do you choose between a hosted API model and a self-hosted open model?",
    "Four axes. Data sensitivity: confidential or regulated data favours self-hosting or enterprise endpoints with no-training terms. Capability: frontier reasoning and huge contexts currently favour hosted. Cost: per-token API pricing wins at low volume; production scale often favours self-hosting once utilisation is high. Operations: hosted means zero ops; self-hosted means GPUs, serving, monitoring and upgrades on you. In practice many teams hybrid-route: hard or sensitive tasks self-hosted, routine tasks hosted — and say so.",
    ["S7", "S6"]),
  e(196, "Q96", "A", "Scenario & System Design", "industry",
    "How would you detect whether a company is under-reporting revenue using AI?",
    "Reconstruct an independent estimate and compare. Combine the reported billing data with independent usage signals (call records, metered events) and estimate expected revenue per entity; run anomaly detection — isolation forest or statistical outlier tests — on entities whose reported figures fall far below estimate. Cross-reference related entities for round-tripping. Flag ranked cases for human auditors with the evidence and the model's rationale attached, because in an audit the reasoning must be defensible, and keep humans making every accusation.",
    ["S10", "S7"]),

  // ─── Python coding ───
  e(199, "Q99", "I", "Python Coding", "coding",
    "Remove duplicates from a list while preserving order.",
    "Track seen values in a set and append each new value once — O(n) time, O(n) extra space. Mention the one-liner dict.fromkeys(lst), which preserves order in modern Python, then explain why the explicit loop shows the mechanics better in an interview.",
    ["S9", "S1"],
    `def dedup(lst):
    seen = set()
    out = []
    for x in lst:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out

print(dedup([1, 2, 2, 3, 1, 4]))   # [1, 2, 3, 4]
# or: list(dict.fromkeys(lst))`),
  e(200, "Q100", "I", "Python Coding", "coding",
    "Count word frequency in a sentence.",
    "Normalise case, strip punctuation if required, split, and count with collections.Counter. Know how to do the same with a plain dict loop — getting the word, incrementing — because some interviewers disallow library shortcuts.",
    ["S9", "S1"],
    `from collections import Counter

def word_freq(text):
    return Counter(text.lower().split())

print(word_freq("AI is the future and AI is here"))
# Counter({'ai': 2, 'is': 2, 'the': 1, 'future': 1, 'and': 1, 'here': 1})`),
  e(201, "Q101", "I", "Python Coding", "coding",
    "Implement mean, median and mode in core Python.",
    "Mean is sum over count. Median needs a sort: the middle element for odd lengths, the average of the two middles for even. Mode is the most frequent value via a count dictionary, handling ties. Edge cases to name: empty list, and multiple modes.",
    ["S1", "S9"],
    `from statistics import multimode

def mean(xs): return sum(xs) / len(xs)

def median(xs):
    s = sorted(xs); n = len(s); m = n // 2
    return s[m] if n % 2 else (s[m - 1] + s[m]) / 2

def mode(xs): return multimode(xs)          # returns all modes (ties)
print(mean([2, 4, 6]), median([7, 1, 3]), mode([1, 1, 2, 2, 3]))`),
  e(202, "Q102", "A", "Python Coding", "coding",
    "Implement linear regression from scratch with gradient descent (no sklearn).",
    "Start weights at zero; each epoch compute predictions, take the mean-squared-error gradients with respect to the weight and bias, and step both opposite the gradient scaled by the learning rate. Plot or print the loss per epoch to show convergence. Key insight to verbalise: gradient descent follows the downhill direction of the loss surface.",
    ["S1", "S9"],
    `def fit_linear(X, y, lr=0.05, epochs=500):
    w = b = 0.0
    n = len(X)
    for ep in range(epochs):
        pred = [w * x + b for x in X]
        err = [p - t for p, t in zip(pred, y)]
        grad_w = (2 / n) * sum(e * x for e, x in zip(err, X))
        grad_b = (2 / n) * sum(err)
        w -= lr * grad_w; b -= lr * grad_b
        if ep % 100 == 0:
            print(f"epoch {ep}: loss={sum(e*e for e in err)/n:.4f}")
    return w, b

w, b = fit_linear([1, 2, 3, 4, 5], [2, 4, 6, 8, 10])
print(f"learned y = {w:.3f}x + {b:.3f}")`),
  e(203, "Q103", "A", "Python Coding", "coding",
    "Display the first n Fibonacci numbers.",
    "Iteratively track two values and slide them forward — O(n) time, O(1) extra space. Contrast with naive recursion, which is exponential because it recomputes subproblems, and mention memoization or the iterative approach as the fix.",
    ["S9", "S10"],
    `def fib(n):
    a, b = 0, 1
    out = []
    for _ in range(n):
        out.append(a)
        a, b = b, a + b
    return out

print(fib(10))   # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`),
  e(204, "Q104", "A", "Python Coding", "coding",
    "Check if two strings are anagrams.",
    "Normalise case (and strip spaces if asked), then compare sorted characters or character counts — both O(n log n) via sort or O(n) via counts. Mention the Counter approach as the faster interview answer and sorted() as the simplest.",
    ["S9", "S10"],
    `from collections import Counter

def is_anagram(s1, s2):
    return Counter(s1.lower()) == Counter(s2.lower())
    # equivalent one-liner: sorted(s1.lower()) == sorted(s2.lower())

print(is_anagram("Listen", "Silent"))   # True
print(is_anagram("Hello", "World"))     # False`),
  e(205, "Q105", "A", "Python Coding", "coding",
    "Implement an in-memory key-value store with set, get and delete.",
    "A dictionary-backed class gives O(1) average set/get/delete. Then strengthen it: get returns a default rather than raising, and delete ignores missing keys. Be ready for the follow-up — adding TTL expiry or size limits (an LRU) turns this into a real design question.",
    ["S3", "S10"],
    `class KVStore:
    def __init__(self):
        self.store = {}
    def set(self, key, value):
        self.store[key] = value
    def get(self, key):
        return self.store.get(key)          # None if missing
    def delete(self, key):
        self.store.pop(key, None)           # no error if missing

kv = KVStore()
kv.set("plan", "599")
print(kv.get("plan"))     # 599
kv.delete("plan")
print(kv.get("plan"))     # None`),
];

// ─── Trainer's extras: high-value additions from the cited sources ───
export const TRAINER_EXTRAS: Extra[] = [
  e(210, "E1", "I", "Large Language Models", "foundations",
    "How are large language models trained end to end?",
    "Three stages. Pre-training: next-token prediction on massive unlabelled text, where the model absorbs language and world knowledge over weeks of GPU time. Supervised fine-tuning (SFT): small sets of high-quality instruction-and-answer demonstrations teach it to follow instructions. Preference alignment, classically RLHF and now often DPO: human rankings of responses train a reward model (or directly tune the policy) toward helpful, harmless, honest behaviour. Follow-ups love the distinction between these stages.",
    ["S4", "S5"]),
  e(211, "E2", "B", "Foundations & AI basics", "foundations",
    "Cosine similarity vs dot product vs Euclidean distance — when do you use each?",
    "Cosine compares the angle between vectors, ignoring magnitude — the default for text embeddings, where direction encodes meaning. Dot product equals cosine on normalised vectors and is cheaper, and also rewards longer (higher-norm) vectors when they are not normalised. Euclidean distance measures absolute distance, useful in clustering and anomaly detection. Practical advice: normalise your embeddings and cosine and dot product coincide.",
    ["S6"]),
  e(212, "E3", "I", "RAG & Vector Databases", "modern-ai",
    "When would you fine-tune a model instead of using RAG?",
    "Fine-tuning teaches form; RAG supplies facts. Fine-tune when you need a specific style, format, domain vocabulary or classification behaviour that prompting cannot reliably produce, and when inference must be cheap at scale with a smaller tuned model. Use RAG when the gap is knowledge: private or frequently changing data, and citations. They complement — many production systems do both. Fine-tuning is a poor way to inject facts because it is expensive to repeat after every document change and gives no citations.",
    ["S6", "S4"]),
  e(213, "E4", "I", "Large Language Models", "foundations",
    "What is model quantization, and when would you use it?",
    "Storing weights (and sometimes activations) at lower precision — INT8 or 4-bit instead of FP16 — so the model is smaller and inference is faster, typically with a small accuracy cost. Widespread formats are GPTQ, AWQ and GGUF; popular settings are Q8 (negligible quality loss), Q6, Q5 and Q4 (noticeable but workable). Use it to run bigger models on smaller GPUs, to cut latency and cost at scale, and for edge or CPU inference.",
    ["S3"]),
  e(214, "E5", "I", "ML & DL Fundamentals", "ml",
    "ROC-AUC vs PR-AUC — when do you prefer which?",
    "ROC-AUC summarises true-positive rate against false-positive rate across thresholds and looks flattering under heavy class imbalance because the huge number of true negatives keeps FPR tiny. Precision-Recall AUC ignores true negatives entirely and focuses on the positive class, so it shows the real story for rare events like fraud. Rule: for imbalanced problems, report PR-AUC; ROC-AUC is fine for roughly balanced ones.",
    ["S1", "S5"]),
  e(215, "E6", "I", "ML & DL Fundamentals", "ml",
    "Explain L1 vs L2 regularization — and where dropout fits.",
    "Both penalise large weights to curb overfitting. L1 (Lasso) adds the absolute weights to the loss and pushes weak weights to exactly zero, doing feature selection. L2 (Ridge) adds squared weights and shrinks all weights smoothly, which is the standard default. Dropout is the neural-network sibling: randomly switch off units during training so no unit can rely on any other, roughly like training an ensemble in one network.",
    ["S5", "S9"]),
  e(216, "E7", "B", "ML & DL Fundamentals", "ml",
    "What is early stopping?",
    "Monitor validation loss during training and stop when it stops improving for a patience window of epochs, restoring the best-seen weights. It is the cheapest regularization available: the model never gets the chance to memorise the noise. Almost always used alongside dropout or L2.",
    ["S5"]),
  e(217, "E8", "I", "Foundations & AI basics", "foundations",
    "How do tokenizers handle rare or unknown words?",
    "Through subword segmentation: common words stay whole, rare words break into known fragments, so the model rarely faces a truly unknown token. Byte-level BPE (as in GPT-style tokenizers) guarantees it by falling back to bytes, so any input can be represented. Real cost: rare and code-like text consumes more tokens — worth remembering when sizing context windows and costs.",
    ["S4"]),
  e(218, "E9", "B", "Python Coding", "coding",
    "Check whether a string is a palindrome.",
    "Normalise (lowercase, optionally strip non-letters), then compare the string to its reverse with s == s[::-1], or two pointers from both ends for O(1) space. State the edge cases: empty string is a palindrome; decide up front whether spaces and punctuation count.",
    ["S9"],
    `def is_palindrome(s):
    s = "".join(ch.lower() for ch in s if ch.isalnum())
    return s == s[::-1]

print(is_palindrome("Never odd or even"))   # True
print(is_palindrome("python"))              # False`),
  e(219, "E10", "I", "Python Coding", "coding",
    "Find the second-largest number in a list without sorting.",
    "Track the largest and second-largest as you scan once — O(n) time, O(1) space. Handle the traps: fewer than two distinct values, negatives, and duplicates of the maximum.",
    ["S9"],
    `def second_largest(nums):
    first = second = float("-inf")
    for n in nums:
        if n > first:
            first, second = n, first
        elif first > n > second:
            second = n
    if second == float("-inf"):
        raise ValueError("no distinct second value")
    return second

print(second_largest([10, 40, 25, 40, 8]))   # 25`),
];

// ─── Mock interview rounds (trainer mode) ───
export interface MockRound {
  title: string;
  duration: string;
  note: string;
  nums: string[];
}

export const MOCK_ROUNDS: MockRound[] = [
  {
    title: "Round 1 — Screening",
    duration: "30 min",
    note: "Warm, definitional pace-check. Hesitation here is a red flag.",
    nums: ["Q1", "Q2", "Q17", "Q20", "Q30", "Q37", "Q46", "Q48", "Q51", "Q53", "Q97"],
  },
  {
    title: "Round 2 — Technical deep dive",
    duration: "45 min",
    note: "Mechanics and trade-offs. Expect “why?” after every answer.",
    nums: ["Q3", "Q4", "Q6", "Q8", "Q9", "Q20", "Q21", "Q22", "Q32", "Q39", "Q40",
           "Q52", "Q55", "Q62", "Q78", "Q80", "Q81", "Q82"],
  },
  {
    title: "Round 3 — Design & scenario",
    duration: "45 min",
    note: "Open-ended. Structure first, then detail, then metrics and guardrails.",
    nums: ["Q12", "Q13", "Q14", "Q43", "Q45", "Q84", "Q86", "Q87", "Q88", "Q89",
           "Q90", "Q91", "Q92", "Q93", "Q94", "Q95", "Q96"],
  },
  {
    title: "Coding round",
    duration: "30 min",
    note: "On a blank editor. Say the complexity out loud.",
    nums: ["Q97", "Q98", "Q99", "Q100", "Q101", "Q102", "Q103", "Q104", "Q105"],
  },
];
