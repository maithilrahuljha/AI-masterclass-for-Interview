/**
 * ConceptArt — one unique animated SVG per concept.
 * Every diagram is purpose-built for its concept, zero external assets.
 * Usage: <ConceptArt topicId="foundations" conceptIndex={0} />
 */

import type React from "react";

/* ─────────────────── shared tiny helpers ─────────────────── */
const css = (rules: string) => (
  <style dangerouslySetInnerHTML={{ __html: rules }} />
);

/* ═══════════════════════════════════════════════════════════
   FOUNDATIONS
═══════════════════════════════════════════════════════════ */

// F-0  AI ⊃ ML ⊃ DL ⊃ GenAI  — animated nesting circles
const NestingDolls = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes nd-pulse { 0%,100%{opacity:.18} 50%{opacity:.38} }
      @keyframes nd-pop   { 0%,100%{r:82} 50%{r:86} }
      @keyframes nd-label { 0%,100%{opacity:.7} 50%{opacity:1} }
    `)}
    <circle cx="150" cy="110" r="105" fill="none" stroke="#6366f1" strokeWidth="2" opacity=".18" style={{ animation: "nd-pulse 5s ease-in-out infinite" }} />
    <circle cx="150" cy="110" r="82"  fill="#6366f1" fillOpacity=".07" stroke="#6366f1" strokeWidth="1.5" style={{ animation: "nd-pop 4s ease-in-out infinite" }} />
    <circle cx="150" cy="110" r="58"  fill="#8b5cf6" fillOpacity=".10" stroke="#8b5cf6" strokeWidth="1.5" style={{ animation: "nd-pulse 3.5s ease-in-out infinite 0.5s" }} />
    <circle cx="150" cy="110" r="34"  fill="#f59e0b" fillOpacity=".20" stroke="#f59e0b" strokeWidth="2"   style={{ animation: "nd-pulse 3s ease-in-out infinite 1s" }} />
    {[
      [150, 20,  "#6366f1", "AI"],
      [150, 48,  "#8b5cf6", "Machine Learning"],
      [150, 76,  "#a78bfa", "Deep Learning"],
      [150, 110, "#f59e0b", "Generative AI"],
    ].map(([cx, cy, col, lbl]) => (
      <text key={String(lbl)} x={Number(cx)} y={Number(cy)} textAnchor="middle"
        fontSize={String(lbl).length > 8 ? "9" : "11"} fontWeight="700" fill={String(col)}
        style={{ animation: "nd-label 4s ease-in-out infinite" }}>
        {String(lbl)}
      </text>
    ))}
    <text x="150" y="195" textAnchor="middle" fontSize="9" fill="#64748b">
      Each circle lives inside the one before it
    </text>
  </svg>
);

// F-1  Classical ML families — animated branching tree
const MLFamiliesTree = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes dash { to { stroke-dashoffset: 0; } }
      @keyframes blink { 0%,100%{opacity:.5} 50%{opacity:1} }
    `)}
    {/* root */}
    <rect x="100" y="8" width="100" height="28" rx="8" fill="#6366f1" fillOpacity=".15" stroke="#6366f1" strokeWidth="1.5"/>
    <text x="150" y="27" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6366f1">Machine Learning</text>
    {/* branches */}
    {[
      [55,  80,  "#10b981", "Supervised"],
      [150, 80,  "#f59e0b", "Unsupervised"],
      [245, 80,  "#ef4444", "Reinforcement"],
    ].map(([bx, by, col, lbl]) => (
      <g key={String(lbl)}>
        <line x1="150" y1="36" x2={Number(bx)} y2={Number(by)-14}
          stroke={String(col)} strokeWidth="1.5" strokeDasharray="120" strokeDashoffset="120"
          style={{ animation: `dash 1.2s ease forwards` }} />
        <rect x={Number(bx)-45} y={Number(by)-14} width="90" height="26" rx="7"
          fill={String(col)} fillOpacity=".12" stroke={String(col)} strokeWidth="1.3"/>
        <text x={Number(bx)} y={Number(by)+6} textAnchor="middle" fontSize="10" fontWeight="700" fill={String(col)}>
          {String(lbl)}
        </text>
      </g>
    ))}
    {/* leaves */}
    {[
      [30,  155, "#10b981", "Classification"],
      [80,  155, "#10b981", "Regression"],
      [150, 155, "#f59e0b", "Clustering"],
      [225, 155, "#ef4444", "XGBoost"],
      [275, 155, "#ef4444", "DQN"],
    ].map(([lx, ly, col, lbl], i) => (
      <g key={String(lbl)}>
        <rect x={Number(lx)-36} y={Number(ly)-12} width="72" height="22" rx="5"
          fill={String(col)} fillOpacity=".08" stroke={String(col)} strokeWidth="1" strokeDasharray="4 2"/>
        <text x={Number(lx)} y={Number(ly)+4} textAnchor="middle" fontSize="8.5" fill={String(col)}
          style={{ animation: `blink ${2 + i * 0.3}s ease-in-out infinite` }}>
          {String(lbl)}
        </text>
      </g>
    ))}
  </svg>
);

// F-2  Neural network learns — forward-backprop animated flow
const NeuralLearnsDiagram = () => {
  const layers = [[60, [55, 95, 135]], [150, [70, 110, 150]], [240, [90, 130]]];
  const colors = ["#6366f1", "#8b5cf6", "#f59e0b"];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes fwd  { 0%{stroke-dashoffset:60} 100%{stroke-dashoffset:0} }
        @keyframes bwd  { 0%{stroke-dashoffset:0}  100%{stroke-dashoffset:-60} }
        @keyframes glow { 0%,100%{r:6;opacity:.6} 50%{r:9;opacity:1} }
      `)}
      {/* connections */}
      {layers.slice(0,-1).map(([x1,ys1],li)=>
        (ys1 as number[]).flatMap(y1 =>
          (layers[li+1][1] as number[]).map(y2 => (
            <line key={`${x1}-${y1}-${y2}`} x1={Number(x1)} y1={y1} x2={layers[li+1][0] as number} y2={y2}
              stroke={colors[li]} strokeWidth="1.2" strokeDasharray="60" strokeDashoffset="60" opacity=".6"
              style={{ animation: `fwd 1.5s linear infinite`, animationDelay: `${(y1 as number)/200}s` }}/>
          ))
        )
      )}
      {/* nodes */}
      {layers.map(([x, ys], li) =>
        (ys as number[]).map(y => (
          <circle key={`${x}-${y}`} cx={Number(x)} cy={Number(y)} r="6"
            fill={colors[li]} fillOpacity=".8"
            style={{ animation: `glow ${1.5 + li * 0.3}s ease-in-out infinite`, animationDelay: `${(y as number)/300}s` }} />
        ))
      )}
      {/* labels */}
      {[60, 150, 240].map((x, i) => (
        <text key={x} x={x} y="185" textAnchor="middle" fontSize="9" fill={colors[i]} fontWeight="600">
          {["Input", "Hidden", "Output"][i]}
        </text>
      ))}
      {/* backprop arrow */}
      <path d="M240 200 Q150 215 60 200" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 3"
        style={{ animation: "bwd 2s linear infinite" }} markerEnd="url(#arr)" />
      <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444"/>
      </marker></defs>
      <text x="150" y="212" textAnchor="middle" fontSize="8.5" fill="#ef4444">backprop</text>
    </svg>
  );
};

// F-3  Transformer — self-attention heat-map style
const TransformerAttention = () => {
  const tokens = ["operator", "must", "pay", "it", "expires"];
  const heat = [
    [1, .1, .1, .2, .6],
    [.1, 1, .2, .1, .1],
    [.1, .2, 1, .3, .3],
    [.1, .1, .2, .3, .8],
    [.6, .1, .3, .8, 1],
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`@keyframes attn { 0%,100%{opacity:.5} 50%{opacity:1} }`)}
      <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6366f1">Self-Attention Heatmap</text>
      {tokens.map((tok, i) => (
        <text key={tok+"r"} x="58" y={38 + i * 32} textAnchor="end" fontSize="9" fontWeight="600" fill="#475569">{tok}</text>
      ))}
      {tokens.map((tok, j) => (
        <text key={tok+"c"} x={68 + j * 36} y="180" textAnchor="middle" fontSize="8.5" fill="#475569"
          transform={`rotate(-35 ${68 + j * 36} 180)`}>{tok}</text>
      ))}
      {heat.map((row, i) =>
        row.map((val, j) => {
          const h = `rgba(99,102,241,${val.toFixed(2)})`;
          return (
            <rect key={`${i}-${j}`} x={62 + j * 36} y={26 + i * 32} width="28" height="24" rx="4"
              fill={h} style={{ animation: `attn ${1.5 + val}s ease-in-out infinite`, animationDelay: `${(i + j) * 0.1}s` }} />
          );
        })
      )}
    </svg>
  );
};

// F-4  Tokenization — animated text-split
const TokenizationFlow = () => {
  const word = "telecom-regulation";
  const tokens = ["tele", "com", "-", "reg", "ul", "ation"];
  const colors = ["#6366f1","#8b5cf6","#f59e0b","#10b981","#ef4444","#3b82f6"];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes drop { 0%{transform:translateY(-18px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes idpop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
      `)}
      <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e293b" className="dark:fill-slate-100">
        {word}
      </text>
      <text x="150" y="40" textAnchor="middle" fontSize="9" fill="#94a3b8">tokenizer splits</text>
      <path d="M60 45 L150 58 L240 45" fill="none" stroke="#cbd5e1" strokeWidth="1.2"/>
      {tokens.map((tok, i) => (
        <g key={tok + i} style={{ animation: `drop 0.5s ease forwards`, animationDelay: `${i * 0.15}s` }}>
          <rect x={18 + i * 44} y={68} width="38" height="26" rx="6"
            fill={colors[i]} fillOpacity=".18" stroke={colors[i]} strokeWidth="1.4"/>
          <text x={37 + i * 44} y={85} textAnchor="middle" fontSize="10" fontWeight="700" fill={colors[i]}>{tok}</text>
          <rect x={21 + i * 44} y={104} width="32" height="20" rx="4" fill={colors[i]} fillOpacity=".08" stroke={colors[i]} strokeWidth="1"/>
          <text x={37 + i * 44} y={118} textAnchor="middle" fontSize="9" fill={colors[i]}
            style={{ animation: `idpop 2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
            {1000 + i * 317}
          </text>
        </g>
      ))}
      <text x="150" y="145" textAnchor="middle" fontSize="9" fill="#94a3b8">token IDs fed to model</text>
      <rect x="60" y="155" width="180" height="24" rx="8" fill="#6366f1" fillOpacity=".08" stroke="#6366f1" strokeWidth="1"/>
      <text x="150" y="171" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6366f1">
        1 token ≈ 0.75 words ≈ 4 chars
      </text>
    </svg>
  );
};

// F-5  Embeddings — 2-D vector space scatter
const EmbeddingSpace = () => {
  const points = [
    [80, 80, "AGR dues",       "#6366f1"],
    [95, 65, "licence fee",    "#6366f1"],
    [88, 73, "revenue share",  "#8b5cf6"],
    [180, 60, "tower failure",  "#ef4444"],
    [195, 75, "network outage", "#ef4444"],
    [170, 140, "data plan",     "#10b981"],
    [185, 155, "prepaid tariff","#10b981"],
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes connPulse { 0%,100%{opacity:.15} 50%{opacity:.5} }
      `)}
      <line x1="30" y1="195" x2="270" y2="195" stroke="#cbd5e1" strokeWidth="1"/>
      <line x1="30" y1="195" x2="30"  y2="20"  stroke="#cbd5e1" strokeWidth="1"/>
      <text x="150" y="210" textAnchor="middle" fontSize="8" fill="#94a3b8">Dimension 1</text>
      <text x="15" y="110" textAnchor="middle" fontSize="8" fill="#94a3b8" transform="rotate(-90 15 110)">Dimension 2</text>
      <line x1="80" y1="80" x2="95" y2="65" stroke="#6366f1" strokeWidth="1" style={{ animation: "connPulse 2s ease-in-out infinite" }}/>
      <line x1="95" y1="65" x2="88" y2="73" stroke="#6366f1" strokeWidth="1" style={{ animation: "connPulse 2s ease-in-out infinite" }}/>
      <line x1="180" y1="60" x2="195" y2="75" stroke="#ef4444" strokeWidth="1" style={{ animation: "connPulse 2.5s ease-in-out infinite" }}/>
      <line x1="170" y1="140" x2="185" y2="155" stroke="#10b981" strokeWidth="1" style={{ animation: "connPulse 2s ease-in-out infinite 0.5s" }}/>
      {points.map(([cx, cy, lbl, col], i) => (
        <g key={String(lbl)} style={{ animation: `float ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
          <circle cx={Number(cx)} cy={Number(cy)} r="6" fill={String(col)} fillOpacity=".85"/>
          <text x={Number(cx) + 8} y={Number(cy) + 4} fontSize="8" fill={String(col)} fontWeight="600">{String(lbl)}</text>
        </g>
      ))}
      <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">
        Vector Space — similar meaning = near points
      </text>
    </svg>
  );
};

// F-6  Chunking — animated doc slice
const ChunkingSlice = () => {
  const chunks = [
    { y: 30,  h: 28, col: "#6366f1", lbl: "Clause 4.1  — pay quarterly" },
    { y: 66,  h: 28, col: "#8b5cf6", lbl: "Clause 4.2  — 8% of AGR" },
    { y: 102, h: 28, col: "#10b981", lbl: "Clause 4.3  — late interest" },
    { y: 138, h: 28, col: "#f59e0b", lbl: "Clause 5.1  — interception" },
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes slideIn { 0%{transform:translateX(-30px);opacity:0} 100%{transform:translateX(0);opacity:1} }
        @keyframes glow2   { 0%,100%{filter:drop-shadow(0 0 0px transparent)} 50%{filter:drop-shadow(0 0 4px currentColor)} }
      `)}
      <rect x="20" y="20" width="80" height="170" rx="8" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 3"/>
      <text x="60" y="12" textAnchor="middle" fontSize="9" fill="#94a3b8">full document</text>
      {chunks.map((c, i) => (
        <g key={c.lbl} style={{ animation: `slideIn .5s ease forwards`, animationDelay: `${i * 0.2}s` }}>
          <rect x="30" y={c.y} width="60" height={c.h - 4} rx="4" fill={c.col} fillOpacity=".15" stroke={c.col} strokeWidth="1"/>
          <rect x="120" y={c.y} width="162" height={c.h - 4} rx="6"
            fill={c.col} fillOpacity=".10" stroke={c.col} strokeWidth="1.4"
            style={{ animation: `glow2 ${2 + i * 0.5}s ease-in-out infinite` }}/>
          <text x="201" y={c.y + 17} textAnchor="middle" fontSize="8.5" fontWeight="600" fill={c.col}>{c.lbl}</text>
          <path d={`M90 ${c.y + 12} L120 ${c.y + 12}`} stroke={c.col} strokeWidth="1.2"
            markerEnd="url(#ca)" strokeDasharray="20" strokeDashoffset="20"
            style={{ animation: `slideIn .4s ease forwards`, animationDelay: `${i * 0.2 + 0.1}s` }}/>
        </g>
      ))}
      <defs><marker id="ca" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
        <path d="M0,0 L5,2.5 L0,5 Z" fill="#94a3b8"/>
      </marker></defs>
      <text x="200" y="210" textAnchor="middle" fontSize="8" fill="#94a3b8">chunks + metadata tags →</text>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════
   MODERN AI
═══════════════════════════════════════════════════════════ */

// MA-0  LLM generation — temperature dial animated
const TemperatureDial = () => {
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes needleSpin { 0%{transform:rotate(-45deg)} 33%{transform:rotate(0deg)} 66%{transform:rotate(30deg)} 100%{transform:rotate(-45deg)} }
        @keyframes sparkle    { 0%,100%{opacity:0;r:2} 50%{opacity:1;r:5} }
      `)}
      {/* Dial */}
      <path d="M150 140 m-70 0 a70 70 0 0 1 140 0" fill="none" stroke="#e2e8f0" strokeWidth="18" strokeLinecap="round" className="dark:stroke-slate-700"/>
      <path d="M150 140 m-70 0 a70 70 0 0 1 47 -54" fill="none" stroke="#10b981" strokeWidth="18" strokeLinecap="round" opacity=".5"/>
      <path d="M150 140 m-23 -66 a70 70 0 0 1 23 -4"  fill="none" stroke="#f59e0b" strokeWidth="18" strokeLinecap="round" opacity=".5"/>
      <path d="M150 140 m0 -70 a70 70 0 0 1 70 70"     fill="none" stroke="#ef4444" strokeWidth="18" strokeLinecap="round" opacity=".5"/>
      {/* needle */}
      <g style={{ transformOrigin: "150px 140px", animation: "needleSpin 6s ease-in-out infinite" }}>
        <line x1="150" y1="140" x2="150" y2="78" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" className="dark:stroke-slate-200"/>
        <circle cx="150" cy="140" r="6" fill="#1e293b" className="dark:fill-slate-200"/>
      </g>
      {/* temp labels */}
      {[["0.1", 88, 155, "#10b981"],["0.7", 150, 68, "#f59e0b"],["1.2", 212, 155, "#ef4444"]].map(([t, x, y, c]) => (
        <text key={String(t)} x={Number(x)} y={Number(y)} textAnchor="middle" fontSize="11" fontWeight="800" fill={String(c)}>{String(t)}</text>
      ))}
      {[["Low", 88, 170, "#10b981"],["Balanced", 150, 82, "#f59e0b"],["High", 212, 170, "#ef4444"]].map(([t, x, y, c]) => (
        <text key={String(t)} x={Number(x)} y={Number(y)} textAnchor="middle" fontSize="8" fill={String(c)}>{String(t)}</text>
      ))}
      {/* sparkles at high temp */}
      {[[-15, -10],[10,-20],[20, 5]].map(([dx, dy], i) => (
        <circle key={i} cx={212 + dx} cy={140 + dy} r="2" fill="#ef4444"
          style={{ animation: `sparkle ${1 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}/>
      ))}
      <text x="150" y="205" textAnchor="middle" fontSize="9" fill="#94a3b8">
        temperature = randomness of word choice
      </text>
    </svg>
  );
};

// MA-1  Context windows — shrinking window vs "lost in middle"
const ContextWindowViz = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes fade { 0%,100%{opacity:1} 50%{opacity:.25} }
      @keyframes grow { 0%,100%{width:0} 100%{width:240} }
    `)}
    <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6366f1">Context Window Budget</text>
    {[
      [30,  30, 70,  "#6366f1", "System prompt"],
      [108, 30, 90,  "#8b5cf6", "Retrieved chunks"],
      [206, 30, 54,  "#f59e0b", "User query"],
      [30,  68, 240, "#e2e8f0", "← max window →"],
    ].map(([x, y, w, col, lbl], i) => (
      <g key={String(lbl)}>
        <rect x={Number(x)} y={Number(y)} width={Number(w)} height="24" rx="5"
          fill={i === 3 ? "none" : String(col)} fillOpacity={i === 3 ? 0 : .18}
          stroke={String(col)} strokeWidth={i === 3 ? "1" : "1.4"} strokeDasharray={i === 3 ? "5 3" : "0"}/>
        <text x={Number(x) + Number(w)/2} y={Number(y) + 15} textAnchor="middle" fontSize="8.5" fontWeight="600" fill={i === 3 ? "#94a3b8" : String(col)}>{String(lbl)}</text>
      </g>
    ))}
    {/* "lost in middle" illustration */}
    <text x="150" y="110" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ef4444">⚠ Lost-in-the-middle effect</text>
    {["Start", "Middle", "End"].map((seg, i) => (
      <g key={seg}>
        <rect x={30 + i * 82} y="118" width="76" height="30" rx="6"
          fill={i === 1 ? "#ef4444" : "#10b981"} fillOpacity={i === 1 ? .08 : .15}
          stroke={i === 1 ? "#ef4444" : "#10b981"} strokeWidth="1.3"/>
        <text x={68 + i * 82} y="137" textAnchor="middle" fontSize="9" fontWeight="700" fill={i === 1 ? "#ef4444" : "#10b981"}>{seg}</text>
        <text x={68 + i * 82} y="148" textAnchor="middle" fontSize="7.5" fill={i === 1 ? "#ef4444" : "#10b981"}
          style={{ animation: i === 1 ? "fade 2s ease-in-out infinite" : "none" }}>
          {i === 1 ? "low recall" : "recalled well"}
        </text>
      </g>
    ))}
    <text x="150" y="185" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
      budget it like memory — precision over volume
    </text>
  </svg>
);

// MA-2  Prompting — zero/few/CoT comparison
const PromptingLadder = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes rise { 0%{transform:translateY(12px);opacity:0} 100%{transform:translateY(0);opacity:1} }
      @keyframes badge { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
    `)}
    {[
      { y: 30,  col: "#94a3b8", label: "Zero-shot",       detail: "instruction only",    badge: "B" },
      { y: 92,  col: "#6366f1", label: "Few-shot",        detail: "+ examples",           badge: "I" },
      { y: 154, col: "#10b981", label: "Chain-of-Thought",detail: "+ step-by-step reason", badge: "A" },
    ].map((row, i) => (
      <g key={row.label} style={{ animation: `rise .5s ease forwards`, animationDelay: `${i * 0.25}s` }}>
        {/* bar */}
        <rect x="30" y={row.y} width={80 + i * 55} height="42" rx="8"
          fill={row.col} fillOpacity=".12" stroke={row.col} strokeWidth="1.5"/>
        <text x="38" y={row.y + 17} fontSize="10" fontWeight="700" fill={row.col}>{row.label}</text>
        <text x="38" y={row.y + 32} fontSize="8" fill={row.col} opacity=".8">{row.detail}</text>
        {/* quality badge */}
        <rect x="230" y={row.y + 8} width="48" height="26" rx="6"
          fill={row.col} fillOpacity=".2" stroke={row.col} strokeWidth="1.2"
          style={{ animation: `badge ${1.5 + i * 0.5}s ease-in-out infinite` }}/>
        <text x="254" y={row.y + 25} textAnchor="middle" fontSize="9" fontWeight="700" fill={row.col}>{row.badge === "B" ? "Basic" : row.badge === "I" ? "Better" : "Best ✓"}</text>
      </g>
    ))}
    <text x="150" y="212" textAnchor="middle" fontSize="8.5" fill="#94a3b8">consistency improves with each technique</text>
  </svg>
);

// MA-3  Injection defence — shield diagram
const InjectionShield = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes scanline { 0%{transform:translateY(0)} 100%{transform:translateY(160px)} }
      @keyframes blocked  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
    `)}
    {/* bad input */}
    <rect x="20" y="20" width="80" height="36" rx="7" fill="#ef4444" fillOpacity=".12" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="60" y="35" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ef4444">Untrusted input</text>
    <text x="60" y="49" textAnchor="middle" fontSize="8" fill="#ef4444">"ignore rules"</text>
    {/* arrow to shield */}
    <path d="M100 38 L150 38" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#iarr)"/>
    <defs><marker id="iarr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#ef4444"/></marker></defs>
    {/* shield */}
    <path d="M150 20 L185 34 L185 70 Q185 90 150 100 Q115 90 115 70 L115 34 Z"
      fill="#6366f1" fillOpacity=".15" stroke="#6366f1" strokeWidth="2"/>
    <text x="150" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill="#6366f1">GUARD</text>
    <text x="150" y="72" textAnchor="middle" fontSize="8" fill="#6366f1">• Delimit</text>
    <text x="150" y="83" textAnchor="middle" fontSize="8" fill="#6366f1">• Sanitise</text>
    {/* scan line */}
    <rect x="115" y="20" width="70" height="2" fill="#6366f1" opacity=".4"
      style={{ animation: "scanline 2s linear infinite" }}/>
    {/* blocked indicator */}
    <text x="150" y="115" textAnchor="middle" fontSize="20" style={{ animation: "blocked 1.5s ease-in-out infinite" }}>🛡</text>
    {/* safe output */}
    <path d="M185 60 L230 60" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#oarr)"/>
    <defs><marker id="oarr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#10b981"/></marker></defs>
    <rect x="230" y="44" width="60" height="32" rx="7" fill="#10b981" fillOpacity=".12" stroke="#10b981" strokeWidth="1.5"/>
    <text x="260" y="64" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981">Safe output</text>
    {/* layers */}
    {["1. Delimiter","2. Least priv","3. Output filter"].map((l, i) => (
      <g key={l}>
        <rect x="30" y={140 + i * 22} width="240" height="18" rx="4"
          fill="#6366f1" fillOpacity=".06 " stroke="#6366f1" strokeWidth=".8" strokeDasharray="3 2"/>
        <text x="40" y={153 + i * 22} fontSize="8.5" fill="#6366f1">{l}</text>
      </g>
    ))}
  </svg>
);

// MA-4  RAG pipeline — two-phase animated flow
const RAGPipeline = () => {
  const offline = ["Documents", "Chunk", "Embed", "Vector DB"];
  const online  = ["Question", "Embed Q", "Retrieve", "LLM", "Cited Answer"];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes pktMove { 0%{transform:translateX(-8px);opacity:0} 100%{transform:translateX(0);opacity:1} }
        @keyframes pulse2  { 0%,100%{r:4} 50%{r:7} }
      `)}
      <text x="150" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">OFFLINE (index once)</text>
      {offline.map((n, i) => (
        <g key={n} style={{ animation: `pktMove .4s ease forwards`, animationDelay: `${i * 0.15}s` }}>
          <rect x={20 + i * 67} y="22" width="58" height="26" rx="6"
            fill="#8b5cf6" fillOpacity=".12" stroke="#8b5cf6" strokeWidth="1.3"/>
          <text x={49 + i * 67} y="38" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#8b5cf6">{n}</text>
          {i < 3 && <path d={`M78+${i*67} 35 L${87+i*67} 35`} stroke="#8b5cf6" strokeWidth="1"/>}
        </g>
      ))}
      <line x1="20" y1="60" x2="280" y2="60" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="150" y="76" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">ONLINE (per question)</text>
      {online.map((n, i) => (
        <g key={n} style={{ animation: `pktMove .4s ease forwards`, animationDelay: `${i * 0.2 + 0.5}s` }}>
          <rect x={12 + i * 54} y="84" width="46" height="26" rx="6"
            fill="#6366f1" fillOpacity=".12" stroke="#6366f1" strokeWidth="1.3"/>
          <text x={35 + i * 54} y="100" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#6366f1">{n}</text>
        </g>
      ))}
      {online.slice(0,-1).map((_, i) => (
        <path key={i} d={`M${58+i*54} 97 L${62+i*54} 97`} stroke="#6366f1" strokeWidth="1.2"
          markerEnd="url(#ra)" />
      ))}
      <defs><marker id="ra" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#6366f1"/></marker></defs>
      <circle cx="35" cy="97" r="4" fill="#f59e0b"
        style={{ animation: "pulse2 2s ease-in-out infinite" }}/>
      <text x="150" y="130" textAnchor="middle" fontSize="8.5" fill="#94a3b8">embed query → nearest chunks → grounded answer</text>
      {/* similarity illustration */}
      <rect x="40" y="142" width="220" height="30" rx="8" fill="#f59e0b" fillOpacity=".07" stroke="#f59e0b" strokeWidth="1"/>
      <text x="150" y="158" textAnchor="middle" fontSize="8" fill="#f59e0b" fontWeight="600">cosine similarity ranks retrieved chunks</text>
      <text x="150" y="170" textAnchor="middle" fontSize="7.5" fill="#f59e0b">sim = (q · d) / (|q| × |d|)</text>
      <text x="150" y="210" textAnchor="middle" fontSize="8" fill="#94a3b8">same embedding model for query AND documents</text>
    </svg>
  );
};

// MA-5  Vector DB & hybrid search — Venn + ranked list
const HybridSearchVenn = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes vennglow { 0%,100%{opacity:.18} 50%{opacity:.35} }
      @keyframes rankslide { 0%{transform:translateX(-10px);opacity:0} 100%{transform:translateX(0);opacity:1} }
    `)}
    <circle cx="110" cy="100" r="65" fill="#6366f1" fillOpacity=".15" stroke="#6366f1" strokeWidth="1.5"
      style={{ animation: "vennglow 3s ease-in-out infinite" }}/>
    <circle cx="175" cy="100" r="65" fill="#f59e0b" fillOpacity=".15" stroke="#f59e0b" strokeWidth="1.5"
      style={{ animation: "vennglow 3s ease-in-out infinite 1s" }}/>
    <text x="78" y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="#6366f1">Dense</text>
    <text x="78" y="100" textAnchor="middle" fontSize="8" fill="#6366f1">Vectors</text>
    <text x="78" y="112" textAnchor="middle" fontSize="7.5" fill="#6366f1">semantics</text>
    <text x="207" y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f59e0b">Sparse</text>
    <text x="207" y="100" textAnchor="middle" fontSize="8" fill="#f59e0b">BM25</text>
    <text x="207" y="112" textAnchor="middle" fontSize="7.5" fill="#f59e0b">keywords</text>
    <text x="142" y="94" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#10b981">Hybrid</text>
    <text x="142" y="107" textAnchor="middle" fontSize="7.5" fill="#10b981">RRF fusion</text>
    {["#1  AGR penalty clause", "#2  licence fee dues", "#3  spectrum rule"].map((t, i) => (
      <g key={t} style={{ animation: `rankslide .4s ease forwards`, animationDelay: `${0.8 + i * 0.15}s` }}>
        <rect x="50" y={165 + i * 16} width="200" height="13" rx="4"
          fill={["#10b981","#6366f1","#f59e0b"][i]} fillOpacity=".10" stroke={["#10b981","#6366f1","#f59e0b"][i]} strokeWidth=".8"/>
        <text x="60" y={176 + i * 16} fontSize="8.5" fontWeight="600" fill={["#10b981","#6366f1","#f59e0b"][i]}>{t}</text>
      </g>
    ))}
    <text x="150" y="160" textAnchor="middle" fontSize="8" fill="#94a3b8">Merged ranked results (RRF)</text>
  </svg>
);

// MA-6  RAG evaluation — radar / metrics dashboard
const RAGEvalDashboard = () => {
  const metrics = [
    ["Recall@5",    0.91, "#6366f1"],
    ["Faithfulness",0.95, "#10b981"],
    ["Relevance",   0.88, "#f59e0b"],
    ["Precision",   0.82, "#8b5cf6"],
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes barGrow { 0%{width:0} 100%{width:var(--w)} }
        @keyframes thresh  { 0%,100%{opacity:.4} 50%{opacity:1} }
      `)}
      <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">RAG Evaluation Dashboard</text>
      {metrics.map(([name, val, col], i) => {
        const w = Number(val) * 160;
        return (
          <g key={String(name)}>
            <text x="30" y={45 + i * 38} fontSize="9" fontWeight="600" fill={String(col)}>{String(name)}</text>
            <rect x="110" y={32 + i * 38} width="160" height="18" rx="4" fill="#f1f5f9" className="dark:fill-slate-800"/>
            <rect x="110" y={32 + i * 38} width={w} height="18" rx="4" fill={String(col)} fillOpacity=".7"
              style={{ ["--w" as string]: `${w}px`, animation: `barGrow 1s ease forwards`, animationDelay: `${i * 0.2}s` }}/>
            <text x={114 + w} y={45 + i * 38} fontSize="9" fontWeight="700" fill={String(col)}> {(Number(val) * 100).toFixed(0)}%</text>
            {/* threshold line at 90% */}
            <line x1={110 + 0.9*160} y1={30 + i * 38} x2={110 + 0.9*160} y2={52 + i * 38}
              stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2"
              style={{ animation: `thresh 2s ease-in-out infinite` }}/>
          </g>
        );
      })}
      <text x="254" y="185" textAnchor="middle" fontSize="7.5" fill="#ef4444">gate ≥ 90%</text>
      <rect x="30" y="192" width="240" height="20" rx="6" fill="#10b981" fillOpacity=".08" stroke="#10b981" strokeWidth="1"/>
      <text x="150" y="205" textAnchor="middle" fontSize="9" fontWeight="600" fill="#10b981">All metrics pass → safe to ship ✓</text>
    </svg>
  );
};

// MA-7  Agent loop — animated state-machine
const AgentLoop = () => {
  const steps = [
    { x: 150, y: 40,  col: "#6366f1", lbl: "Goal" },
    { x: 242, y: 100, col: "#8b5cf6", lbl: "Plan" },
    { x: 210, y: 175, col: "#f59e0b", lbl: "Act (tool)" },
    { x: 90,  y: 175, col: "#10b981", lbl: "Observe" },
    { x: 58,  y: 100, col: "#ef4444", lbl: "Done?" },
  ];
  const arrows = [
    "M 163 52 L 232 90", "M 242 116 L 218 163",
    "M 196 178 L 104 178", "M 90 161 L 68 112",
    "M 72 90 L 138 48",
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes circleGlow { 0%,100%{r:22;opacity:.7} 50%{r:26;opacity:1} }
        @keyframes arrowRun   { 0%{stroke-dashoffset:80} 100%{stroke-dashoffset:0} }
      `)}
      {arrows.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#94a3b8" strokeWidth="1.5"
          strokeDasharray="80" markerEnd="url(#aarr)"
          style={{ animation: `arrowRun 2s linear infinite`, animationDelay: `${i * 0.4}s` }}/>
      ))}
      <defs><marker id="aarr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8"/></marker></defs>
      {steps.map((s, i) => (
        <g key={s.lbl} style={{ animation: `circleGlow ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
          <circle cx={s.x} cy={s.y} r="22" fill={s.col} fillOpacity=".15" stroke={s.col} strokeWidth="2"/>
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={s.col}>{s.lbl}</text>
        </g>
      ))}
      <text x="150" y="210" textAnchor="middle" fontSize="8.5" fill="#94a3b8">loop until goal met or limit hit</text>
    </svg>
  );
};

// MA-8  LangChain vs LangGraph
const LangChainGraph = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes linearPkt { 0%{transform:translateX(-5px);opacity:0} 100%{transform:translateX(0);opacity:1} }
      @keyframes cyclePkt  { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
    `)}
    {/* LangChain side */}
    <text x="75" y="18" textAnchor="middle" fontSize="10" fontWeight="800" fill="#6366f1">LangChain</text>
    <text x="75" y="30" textAnchor="middle" fontSize="7.5" fill="#94a3b8">linear pipeline</text>
    {["Prompt","Model","Parser"].map((n, i) => (
      <g key={n} style={{ animation: `linearPkt .4s ease forwards`, animationDelay: `${i * 0.15}s` }}>
        <rect x="28" y={42 + i * 36} width="94" height="26" rx="6"
          fill="#6366f1" fillOpacity=".12" stroke="#6366f1" strokeWidth="1.3"/>
        <text x="75" y={58 + i * 36} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#6366f1">{n}</text>
        {i < 2 && <path d="M75 68 L75 78" stroke="#6366f1" strokeWidth="1.2" markerEnd="url(#lca)" style={{ animationDelay: `${i*0.15+0.05}s` }}/>}
      </g>
    ))}
    <defs>
      <marker id="lca" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#6366f1"/></marker>
      <marker id="lga" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#10b981"/></marker>
    </defs>
    {/* divider */}
    <line x1="148" y1="12" x2="148" y2="210" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="5 3"/>
    {/* LangGraph side */}
    <text x="222" y="18" textAnchor="middle" fontSize="10" fontWeight="800" fill="#10b981">LangGraph</text>
    <text x="222" y="30" textAnchor="middle" fontSize="7.5" fill="#94a3b8">stateful graph + loops</text>
    {[
      [222, 60, "Plan"],
      [268, 110, "Act"],
      [222, 160, "Observe"],
      [176, 110, "Human?"],
    ].map(([x, y, lbl]) => (
      <g key={String(lbl)}>
        <rect x={Number(x)-36} y={Number(y)-14} width="72" height="26" rx="6"
          fill="#10b981" fillOpacity=".12" stroke="#10b981" strokeWidth="1.3"/>
        <text x={Number(x)} y={Number(y)+5} textAnchor="middle" fontSize="9" fontWeight="700" fill="#10b981">{String(lbl)}</text>
      </g>
    ))}
    <path d="M222 74 L268 96 L268 124 L222 146 L176 124 L176 96 Z"
      fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="200"
      style={{ animation: "cyclePkt 3s linear infinite" }}/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   ML IN PRACTICE
═══════════════════════════════════════════════════════════ */

// ML-0  Precision/Recall — animated confusion matrix
const ConfusionMatrixAnim = () => {
  const cells = [
    { x: 80, y: 60, col: "#10b981", lbl: "TP", n: "80",  tip: "caught fraud" },
    { x: 80, y: 130, col: "#ef4444", lbl: "FN", n: "120", tip: "missed fraud" },
    { x: 200, y: 60, col: "#f59e0b", lbl: "FP", n: "20",  tip: "false alarm" },
    { x: 200, y: 130, col: "#6366f1", lbl: "TN", n: "9980",tip: "correctly clean" },
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`@keyframes cm-pop { 0%{transform:scale(.5);opacity:0} 100%{transform:scale(1);opacity:1} }`)}
      <text x="150" y="14" textAnchor="middle" fontSize="9" fill="#94a3b8">Predicted</text>
      <text x="20" y="100" fontSize="9" fill="#94a3b8" transform="rotate(-90 20 100)">Actual</text>
      <text x="80" y="42" textAnchor="middle" fontSize="8.5" fill="#475569">Fraud</text>
      <text x="200" y="42" textAnchor="middle" fontSize="8.5" fill="#475569">Not Fraud</text>
      <text x="45" y="68" textAnchor="middle" fontSize="8.5" fill="#475569">Fraud</text>
      <text x="45" y="138" textAnchor="middle" fontSize="8.5" fill="#475569">Not</text>
      {cells.map((c, i) => (
        <g key={c.lbl} style={{ animation: `cm-pop .4s ease forwards`, animationDelay: `${i * 0.2}s` }}>
          <rect x={c.x - 48} y={c.y - 22} width="96" height="44" rx="8"
            fill={c.col} fillOpacity=".12" stroke={c.col} strokeWidth="2"/>
          <text x={c.x} y={c.y - 4} textAnchor="middle" fontSize="16" fontWeight="900" fill={c.col}>{c.n}</text>
          <text x={c.x} y={c.y + 13} textAnchor="middle" fontSize="8" fill={c.col}>{c.tip}</text>
        </g>
      ))}
      <rect x="30" y="186" width="240" height="22" rx="6" fill="#6366f1" fillOpacity=".08" stroke="#6366f1" strokeWidth="1"/>
      <text x="150" y="200" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6366f1">
        Precision 0.80 · Recall 0.40 · F1 0.53
      </text>
    </svg>
  );
};

// ML-1  Imbalanced data — seesaw with SMOTE
const ImbalanceSeesaw = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes tilt    { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(0deg)} }
      @keyframes smote   { 0%{opacity:0;transform:scale(0)} 100%{opacity:1;transform:scale(1)} }
    `)}
    <text x="150" y="16" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">Class Imbalance → SMOTE fix</text>
    {/* seesaw before */}
    <line x1="60" y1="120" x2="240" y2="120" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"
      style={{ transformOrigin: "150px 120px", animation: "tilt 3s ease-in-out infinite" }}/>
    <polygon points="150,120 142,140 158,140" fill="#94a3b8"/>
    {/* many majority dots */}
    {Array.from({ length: 8 }).map((_, i) => (
      <circle key={i} cx={60 + i * 12} cy={112} r="6" fill="#6366f1" fillOpacity=".7"/>
    ))}
    <text x="96" y="150" textAnchor="middle" fontSize="8" fill="#6366f1">999 normal calls</text>
    {/* few minority dots */}
    <circle cx="220" cy="112" r="6" fill="#ef4444" fillOpacity=".8"/>
    <text x="220" y="150" textAnchor="middle" fontSize="8" fill="#ef4444">1 fraud</text>
    {/* SMOTE arrow */}
    <path d="M150 160 L150 175" stroke="#10b981" strokeWidth="2" markerEnd="url(#smoa)"/>
    <defs><marker id="smoa" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#10b981"/></marker></defs>
    {/* after: balanced */}
    {[0,1,2].map(i => (
      <circle key={i} cx={130 + i * 22} cy={192} r="6" fill="#ef4444" fillOpacity=".8"
        style={{ animation: `smote .4s ease forwards`, animationDelay: `${i * 0.15}s` }}/>
    ))}
    <text x="150" y="210" textAnchor="middle" fontSize="8.5" fill="#10b981">SMOTE: synthesised minority points</text>
  </svg>
);

// ML-2  Bias-variance — animated bull's-eye
const BiasVarianceBullseye = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes shotIn { 0%{opacity:0;r:0} 100%{opacity:.9;r:5} }
    `)}
    {/* three bull's-eyes */}
    {[
      { cx: 60, label: "High Bias\n(Underfit)", shots: [[50,90],[70,80],[55,70],[65,95]], col: "#f59e0b" },
      { cx: 150, label: "Just Right", shots: [[150,110],[148,108],[152,112],[149,110]], col: "#10b981" },
      { cx: 240, label: "High Variance\n(Overfit)", shots: [[220,80],[260,130],[230,140],[250,70]], col: "#ef4444" },
    ].map((b, bi) => (
      <g key={bi}>
        {[28,20,12,5].map(r => (
          <circle key={r} cx={b.cx} cy={110} r={r} fill="none" stroke="#cbd5e1" strokeWidth="1"/>
        ))}
        {b.shots.map(([sx, sy], si) => (
          <circle key={si} cx={sx} cy={sy} r="5" fill={b.col} fillOpacity=".85"
            style={{ animation: `shotIn .3s ease forwards`, animationDelay: `${bi * 0.3 + si * 0.1}s` }}/>
        ))}
        <text x={b.cx} y="155" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={b.col}>
          {b.label.split("\n")[0]}
        </text>
        {b.label.includes("\n") && (
          <text x={b.cx} y="166" textAnchor="middle" fontSize="8" fill={b.col}>{b.label.split("\n")[1]}</text>
        )}
      </g>
    ))}
    <text x="150" y="188" textAnchor="middle" fontSize="8" fill="#94a3b8">
      accurate + consistent = low bias AND low variance
    </text>
    <rect x="110" y="196" width="80" height="18" rx="5" fill="#10b981" fillOpacity=".1" stroke="#10b981" strokeWidth="1"/>
    <text x="150" y="208" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981">Goal zone ✓</text>
  </svg>
);

// ML-3  Validation — animated fold rotation
const ValidationFolds = () => {
  const folds = Array.from({ length: 5 });
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes foldIn { 0%{opacity:0;transform:scaleX(0)} 100%{opacity:1;transform:scaleX(1)} }
        @keyframes valFlash { 0%,100%{fill-opacity:.08} 50%{fill-opacity:.28} }
      `)}
      <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">5-Fold Cross-Validation</text>
      {folds.map((_f, fi) => (
        <g key={fi}>
          {folds.map((_, si) => (
            <rect key={si} x={20 + si * 52} y={30 + fi * 32} width="46" height="24" rx="5"
              fill={si === fi ? "#6366f1" : "#10b981"}
              fillOpacity={si === fi ? .25 : .10}
              stroke={si === fi ? "#6366f1" : "#10b981"} strokeWidth="1.3"
              style={{
                animation: si === fi ? `valFlash ${1.5 + fi * 0.3}s ease-in-out infinite` : `foldIn .4s ease forwards`,
                animationDelay: `${fi * 0.15}s`,
                transformOrigin: `${20 + si * 52}px ${30 + fi * 32}px`
              }}/>
          ))}
          <text x="285" y={46 + fi * 32} fontSize="8.5" fontWeight="600" fill="#6366f1">val</text>
        </g>
      ))}
      <text x="150" y="200" textAnchor="middle" fontSize="8" fill="#94a3b8">
        ⬛ train fold  &nbsp;⬜ validation fold (rotates each round)
      </text>
      <text x="150" y="212" textAnchor="middle" fontSize="8" fill="#94a3b8">
        final score = mean of 5 results ± std
      </text>
    </svg>
  );
};

// ML-4  Model lifecycle — animated circular Kanban
const ModelLifecycle = () => {
  const steps = [
    { lbl: "Define",    x: 150, y: 30,  col: "#6366f1" },
    { lbl: "Collect",   x: 248, y: 80,  col: "#8b5cf6" },
    { lbl: "Train",     x: 248, y: 150, col: "#f59e0b" },
    { lbl: "Validate",  x: 150, y: 195, col: "#10b981" },
    { lbl: "Deploy",    x: 52,  y: 150, col: "#3b82f6" },
    { lbl: "Monitor",   x: 52,  y: 80,  col: "#ef4444" },
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes orbit  { 0%{stroke-dashoffset:600} 100%{stroke-dashoffset:0} }
        @keyframes lc-pop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
      `)}
      <circle cx="150" cy="113" r="80" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="600"
        style={{ animation: "orbit 12s linear infinite" }}/>
      {steps.map((s, i) => (
        <g key={s.lbl} style={{ animation: `lc-pop ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
          <circle cx={s.x} cy={s.y} r="20" fill={s.col} fillOpacity=".15" stroke={s.col} strokeWidth="2"/>
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={s.col}>{s.lbl}</text>
        </g>
      ))}
      <text x="150" y="116" textAnchor="middle" fontSize="9" fill="#94a3b8">↻ loop</text>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════
   DATA ENGINEERING
═══════════════════════════════════════════════════════════ */

// DE-0  PDF extraction — animated scan beam
const PDFScanFlow = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes scan { 0%,100%{transform:translateY(0)} 50%{transform:translateY(110px)} }
      @keyframes textIn { 0%{opacity:0} 100%{opacity:1} }
    `)}
    {/* PDF page */}
    <rect x="30" y="20" width="80" height="110" rx="6" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="70" y="36" textAnchor="middle" fontSize="8" fill="#94a3b8">PDF</text>
    {/* page content lines */}
    {[45,58,71,84,97,110].map(y => (
      <rect key={y} x="38" y={y} width={30 + (y % 30)} height="7" rx="2" fill="#e2e8f0"/>
    ))}
    {/* scan beam */}
    <rect x="30" y="42" width="80" height="3" fill="#6366f1" fillOpacity=".5" rx="1"
      style={{ animation: "scan 2s ease-in-out infinite" }}/>
    {/* arrow */}
    <path d="M110 75 L140 75" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#pdfA)"/>
    <defs><marker id="pdfA" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#6366f1"/></marker></defs>
    {/* extracted text */}
    {["Clause 4.1  →  pay quarterly",
      "Clause 4.2  →  8% AGR",
      "Page 3  ·  Licence No. 12",
      "Date: 2023-06-01"].map((t, i) => (
      <text key={t} x="148" y={42 + i * 18} fontSize="8" fill="#475569"
        style={{ animation: `textIn .3s ease forwards`, animationDelay: `${i * 0.25}s` }}>{t}</text>
    ))}
    {/* OCR badge */}
    <rect x="30" y="145" width="80" height="22" rx="6" fill="#f59e0b" fillOpacity=".12" stroke="#f59e0b" strokeWidth="1"/>
    <text x="70" y="159" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f59e0b">OCR for scans</text>
    <rect x="140" y="145" width="130" height="22" rx="6" fill="#8b5cf6" fillOpacity=".12" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="205" y="159" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#8b5cf6">+ page metadata</text>
    <text x="150" y="195" textAnchor="middle" fontSize="8.5" fill="#94a3b8">every chunk knows its source →</text>
    <text x="150" y="208" textAnchor="middle" fontSize="8.5" fill="#94a3b8">citable, auditable, traceable</text>
  </svg>
);

// DE-1  SCD — timeline rows animation
const SCDTimeline = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes rowSlide { 0%{transform:translateX(-20px);opacity:0} 100%{transform:translateX(0);opacity:1} }
    `)}
    <text x="150" y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">SCD Type 2 — full history</text>
    {/* header */}
    {["plan_key","plan","price","from","to","current"].map((h, i) => (
      <text key={h} x={22 + i * 46} y="30" fontSize="7.5" fontWeight="700" fill="#6366f1">{h}</text>
    ))}
    <line x1="18" y1="33" x2="282" y2="33" stroke="#e2e8f0" strokeWidth="1"/>
    {/* rows */}
    {[
      ["1", "Starter", "₹499", "Jan 1", "May 31", "N", "#94a3b8"],
      ["2", "Starter", "₹599", "Jun 1", "—",      "Y", "#10b981"],
    ].map(([k, pl, pr, fr, to, curr, col], ri) => (
      <g key={String(k)} style={{ animation: `rowSlide .5s ease forwards`, animationDelay: `${ri * 0.3}s` }}>
        <rect x="18" y={40 + ri * 30} width="264" height="26" rx="5"
          fill={String(col)} fillOpacity=".08" stroke={String(col)} strokeWidth={curr === "Y" ? "1.5" : ".8"}/>
        {[k, pl, pr, fr, to, curr].map((val, ci) => (
          <text key={ci} x={22 + ci * 46} y={57 + ri * 30} fontSize="8.5"
            fontWeight={curr === "Y" ? "700" : "400"} fill={String(col)}>{String(val)}</text>
        ))}
        {curr === "Y" && (
          <text x="274" y={57 + ri * 30} fontSize="9" fill="#10b981">✓</text>
        )}
      </g>
    ))}
    {/* change event */}
    <rect x="40" y="115" width="220" height="28" rx="8" fill="#f59e0b" fillOpacity=".10" stroke="#f59e0b" strokeWidth="1.3"/>
    <text x="150" y="127" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f59e0b">Plan changes ₹499 → ₹599 on Jun 1</text>
    <text x="150" y="139" textAnchor="middle" fontSize="8" fill="#f59e0b">old row closed · new row opened</text>
    <path d="M150 143 L150 156" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#scdA)"/>
    <defs><marker id="scdA" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#f59e0b"/></marker></defs>
    <text x="150" y="168" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="600">Both rows survive → dispute handled ✓</text>
    <text x="150" y="195" textAnchor="middle" fontSize="8" fill="#94a3b8">Type 1 overwrites → history lost forever</text>
    <text x="150" y="208" textAnchor="middle" fontSize="8" fill="#94a3b8">Type 2 inserts → full audit trail preserved</text>
  </svg>
);

// DE-2  Deduplication — merge funnel
const DedupFunnel = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes mergeIn { 0%{transform:translateY(-10px);opacity:0} 100%{transform:translateY(0);opacity:1} }
      @keyframes quarantine { 0%,100%{opacity:.4} 50%{opacity:1} }
    `)}
    <text x="150" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">Deduplication Pipeline</text>
    {/* raw records */}
    {[
      ["Vodafone Idea", "#6366f1"],
      ["vodafone idea",  "#6366f1"],
      ["Vodafone-Idea",  "#6366f1"],
      ["Bharti Airtel",  "#10b981"],
    ].map(([lbl, col], i) => (
      <g key={String(lbl)+i} style={{ animation: `mergeIn .3s ease forwards`, animationDelay: `${i * 0.1}s` }}>
        <rect x="20" y={22 + i * 22} width="100" height="18" rx="4" fill={String(col)} fillOpacity=".10" stroke={String(col)} strokeWidth="1"/>
        <text x="70" y={34 + i * 22} textAnchor="middle" fontSize="7.5" fill={String(col)}>{String(lbl)}</text>
      </g>
    ))}
    {/* funnel */}
    <path d="M120 30 L150 90 L150 90 L120 120 Z" fill="#6366f1" fillOpacity=".05" stroke="#6366f1" strokeWidth="1"/>
    <path d="M120 30 L120 120 L150 90 Z" fill="none"/>
    <text x="130" y="72" fontSize="8" fill="#6366f1" transform="rotate(-50 130 72)">normalise</text>
    <path d="M122 70 L148 70" stroke="#6366f1" strokeWidth="1.2" strokeDasharray="3 2"/>
    {/* survivors */}
    {[["Vodafone Idea ✓", "#6366f1"],["Bharti Airtel ✓","#10b981"]].map(([lbl, col], i) => (
      <g key={String(lbl)} style={{ animation: `mergeIn .4s ease forwards`, animationDelay: `${0.5 + i * 0.2}s` }}>
        <rect x="168" y={35 + i * 35} width="110" height="22" rx="6" fill={String(col)} fillOpacity=".12" stroke={String(col)} strokeWidth="1.5"/>
        <text x="223" y={50 + i * 35} textAnchor="middle" fontSize="9" fontWeight="700" fill={String(col)}>{String(lbl)}</text>
      </g>
    ))}
    {/* quarantine */}
    <rect x="168" y="120" width="110" height="22" rx="6" fill="#ef4444" fillOpacity=".08" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2"
      style={{ animation: "quarantine 2s ease-in-out infinite" }}/>
    <text x="223" y="134" textAnchor="middle" fontSize="8.5" fill="#ef4444">quarantine log 📋</text>
    <text x="150" y="165" textAnchor="middle" fontSize="8.5" fill="#94a3b8">survivorship rule: keep most complete</text>
    <text x="150" y="178" textAnchor="middle" fontSize="8.5" fill="#94a3b8">nothing deleted without a trace</text>
    <text x="150" y="208" textAnchor="middle" fontSize="8" fill="#94a3b8">exact match → fuzzy match → merge → log</text>
  </svg>
);

// DE-3  Ingestion pipeline — conveyor belt
const IngestionPipeline = () => {
  const stages = ["Source", "Extract", "Validate", "Dedupe", "Chunk", "Embed", "Index"];
  const cols   = ["#94a3b8","#6366f1","#8b5cf6","#f59e0b","#10b981","#3b82f6","#ef4444"];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes pkt { 0%{transform:translateX(0)} 100%{transform:translateX(38px)} }
        @keyframes nightly { 0%,100%{opacity:.4} 50%{opacity:1} }
      `)}
      <text x="150" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">Nightly Ingestion Pipeline</text>
      {/* belt */}
      <rect x="12" y="55" width="276" height="40" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-900"/>
      {/* moving packets */}
      {[0, 80, 160, 220].map((ox, pi) => (
        <rect key={pi} x={12 + ox} y="62" width="28" height="26" rx="4"
          fill={cols[pi % cols.length]} fillOpacity=".25" stroke={cols[pi % cols.length]} strokeWidth="1"
          style={{ animation: `pkt 2s linear infinite`, animationDelay: `${pi * 0.5}s` }}/>
      ))}
      {/* stage labels below */}
      {stages.map((s, i) => (
        <g key={s}>
          <circle cx={24 + i * 38} cy="75" r="10" fill={cols[i]} fillOpacity=".2" stroke={cols[i]} strokeWidth="1.2"/>
          <text x={24 + i * 38} y="79" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={cols[i]}>{i+1}</text>
          <text x={24 + i * 38} y="112" textAnchor="middle" fontSize="7" fontWeight="600" fill={cols[i]}
            transform={`rotate(-35 ${24 + i * 38} 112)`}>{s}</text>
        </g>
      ))}
      {/* hash / delta */}
      <rect x="30" y="140" width="240" height="22" rx="7" fill="#6366f1" fillOpacity=".07" stroke="#6366f1" strokeWidth="1"/>
      <text x="150" y="154" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#6366f1">
        hash each file → skip unchanged → re-index only deltas
      </text>
      {/* dead letter */}
      <rect x="30" y="170" width="110" height="18" rx="5" fill="#ef4444" fillOpacity=".08" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2"/>
      <text x="85" y="182" textAnchor="middle" fontSize="8" fill="#ef4444">dead-letter queue</text>
      <rect x="160" y="170" width="110" height="18" rx="5" fill="#10b981" fillOpacity=".08" stroke="#10b981" strokeWidth="1"/>
      <text x="215" y="182" textAnchor="middle" fontSize="8" fill="#10b981">lineage log ✓</text>
      <text x="150" y="210" textAnchor="middle" fontSize="8" fill="#94a3b8"
        style={{ animation: "nightly 3s ease-in-out infinite" }}>runs nightly, fully idempotent</text>
    </svg>
  );
};

// DE-4  Data quality gates — traffic-light dashboard
const DataQualityGates = () => {
  const checks = [
    { name: "Completeness",  pct: 96, col: "#10b981", status: "PASS" },
    { name: "Uniqueness",    pct: 99, col: "#10b981", status: "PASS" },
    { name: "Validity",      pct: 87, col: "#f59e0b", status: "WARN" },
    { name: "Timeliness",    pct: 62, col: "#ef4444", status: "FAIL" },
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes led { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes barq { from{width:0} to{width:var(--bw)} }
      `)}
      <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Data Quality Gate</text>
      {checks.map((c, i) => {
        const bw = c.pct * 1.6;
        return (
          <g key={c.name}>
            <text x="22" y={44 + i * 42} fontSize="8.5" fontWeight="600" fill="#475569">{c.name}</text>
            <rect x="110" y={30 + i * 42} width="160" height="18" rx="4" fill="#f1f5f9" className="dark:fill-slate-800"/>
            <rect x="110" y={30 + i * 42} width={bw} height="18" rx="4" fill={c.col} fillOpacity=".7"
              style={{ ["--bw" as string]: `${bw}px`, animation: `barq 1s ease forwards`, animationDelay: `${i * 0.2}s` }}/>
            <text x={114 + bw} y={43 + i * 42} fontSize="9" fontWeight="700" fill={c.col}> {c.pct}%</text>
            {/* LED */}
            <circle cx="285" cy={39 + i * 42} r="7" fill={c.col}
              style={{ animation: c.status === "FAIL" ? `led 1s ease-in-out infinite` : "none" }}/>
          </g>
        );
      })}
      <rect x="30" y="198" width="110" height="16" rx="5" fill="#ef4444" fillOpacity=".1" stroke="#ef4444" strokeWidth="1"/>
      <text x="85" y="209" textAnchor="middle" fontSize="8" fill="#ef4444">FAIL → manual review queue</text>
      <rect x="160" y="198" width="110" height="16" rx="5" fill="#10b981" fillOpacity=".1" stroke="#10b981" strokeWidth="1"/>
      <text x="215" y="209" textAnchor="middle" fontSize="8" fill="#10b981">PASS → warehouse ✓</text>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════
   MLOPS & GOVERNANCE
═══════════════════════════════════════════════════════════ */

// MLOPS-0  Deployment — animated canary
const DeploymentCanary = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes traffic { 0%{opacity:0;transform:translateX(-8px)} 100%{opacity:1;transform:translateX(0)} }
      @keyframes canaryBlink { 0%,100%{fill-opacity:.15} 50%{fill-opacity:.35} }
    `)}
    {/* Prod box */}
    <rect x="20" y="30" width="110" height="50" rx="8" fill="#6366f1" fillOpacity=".12" stroke="#6366f1" strokeWidth="1.5"/>
    <text x="75" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6366f1">Production v13</text>
    <text x="75" y="65" textAnchor="middle" fontSize="8.5" fill="#6366f1">95% traffic</text>
    {/* Canary */}
    <rect x="170" y="30" width="110" height="50" rx="8" fill="#f59e0b" fillOpacity=".12" stroke="#f59e0b" strokeWidth="1.5"
      style={{ animation: "canaryBlink 2s ease-in-out infinite" }}/>
    <text x="225" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f59e0b">Canary v14</text>
    <text x="225" y="65" textAnchor="middle" fontSize="8.5" fill="#f59e0b">5% traffic 🐤</text>
    {/* traffic arrows */}
    {[0,1,2,3,4].map(i => (
      <path key={i} d={`M150 ${95 + i * 22} L${i < 4 ? 130 : 170} ${95 + i * 22}`}
        stroke={i < 4 ? "#6366f1" : "#f59e0b"} strokeWidth="1.5"
        markerEnd={`url(#${i < 4 ? "pa" : "ca"})`}
        style={{ animation: `traffic .4s ease forwards`, animationDelay: `${i * 0.15}s` }}/>
    ))}
    <defs>
      <marker id="pa" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#6366f1"/></marker>
      <marker id="ca" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#f59e0b"/></marker>
    </defs>
    <circle cx="150" cy="100" r="12" fill="#94a3b8" fillOpacity=".2" stroke="#94a3b8" strokeWidth="1"/>
    <text x="150" y="104" textAnchor="middle" fontSize="8" fill="#64748b">Router</text>
    {/* stages */}
    {["Shadow","Canary","Full rollout"].map((s, i) => (
      <g key={s}>
        <rect x={20 + i * 90} y="188" width="80" height="18" rx="5"
          fill={["#94a3b8","#f59e0b","#10b981"][i]} fillOpacity=".12"
          stroke={["#94a3b8","#f59e0b","#10b981"][i]} strokeWidth="1"/>
        <text x={60 + i * 90} y="200" textAnchor="middle" fontSize="8" fontWeight="600"
          fill={["#94a3b8","#f59e0b","#10b981"][i]}>{s}</text>
      </g>
    ))}
  </svg>
);

// MLOPS-1  Drift — rolling window chart
const DriftMonitor = () => {
  const healthy = [30,31,29,32,30,31,29,30].map((v, i) => ({ x: 20 + i * 22, y: 180 - v * 2.5 }));
  const drifted = [30,34,40,48,55,58,60,63].map((v, i) => ({ x: 196 + i * 12, y: 180 - v * 2.5 }));
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes alarm { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes lineGrow { 0%{stroke-dashoffset:300} 100%{stroke-dashoffset:0} }
      `)}
      <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Drift Monitor</text>
      {/* axes */}
      <line x1="18" y1="185" x2="282" y2="185" stroke="#e2e8f0" strokeWidth="1"/>
      <line x1="18" y1="185" x2="18"  y2="30"  stroke="#e2e8f0" strokeWidth="1"/>
      {/* baseline band */}
      <rect x="18" y="105" width="264" height="30" fill="#10b981" fillOpacity=".06"/>
      <line x1="18" y1="120" x2="282" y2="120" stroke="#10b981" strokeWidth="1" strokeDasharray="5 3"/>
      <text x="284" y="123" fontSize="7" fill="#10b981">baseline</text>
      {/* alert line */}
      <line x1="18" y1="82" x2="282" y2="82" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2"/>
      <text x="284" y="85" fontSize="7" fill="#ef4444">alert</text>
      {/* healthy line */}
      <polyline points={healthy.map(p => `${p.x},${p.y}`).join(" ")}
        fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="300" style={{ animation: "lineGrow 1.5s ease forwards" }}/>
      {/* drifted line */}
      <polyline points={drifted.map(p => `${p.x},${p.y}`).join(" ")}
        fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="300" style={{ animation: "lineGrow 1.5s ease forwards 0.5s" }}/>
      {/* drift label */}
      <text x="244" y="62" fontSize="8.5" fill="#ef4444" fontWeight="700">DRIFT!</text>
      <path d="M170 185 L170 20" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 3"/>
      <text x="173" y="25" fontSize="7.5" fill="#f59e0b">tariff hike</text>
      <rect x="180" y="192" width="110" height="16" rx="5" fill="#ef4444" fillOpacity=".1" stroke="#ef4444" strokeWidth="1"
        style={{ animation: "alarm 1.5s ease-in-out infinite" }}/>
      <text x="235" y="203" textAnchor="middle" fontSize="8" fill="#ef4444">⚠ retrain triggered</text>
    </svg>
  );
};

// MLOPS-2  Model registry — version timeline
const ModelRegistry = () => {
  const versions = [
    { v: "v12", stage: "archived", col: "#94a3b8" },
    { v: "v13", stage: "prod",     col: "#10b981" },
    { v: "v14", stage: "staging",  col: "#6366f1" },
    { v: "v15", stage: "training", col: "#f59e0b" },
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes promote { 0%{transform:translateY(8px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes trainSpin { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
      `)}
      <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Model Registry</text>
      {/* central line */}
      <line x1="150" y1="30" x2="150" y2="175" stroke="#e2e8f0" strokeWidth="2"/>
      {versions.map((v, i) => (
        <g key={v.v} style={{ animation: `promote .4s ease forwards`, animationDelay: `${i * 0.2}s` }}>
          <circle cx="150" cy={40 + i * 42} r="12" fill={v.col} fillOpacity=".2" stroke={v.col} strokeWidth="2"
            strokeDasharray={v.stage === "training" ? "60" : "0"}
            style={v.stage === "training" ? { animation: "trainSpin 2s linear infinite" } : {}}/>
          <text x="150" y={44 + i * 42} textAnchor="middle" fontSize="9" fontWeight="700" fill={v.col}>{v.v}</text>
          <rect x="168" y={30 + i * 42} width="70" height="22" rx="5" fill={v.col} fillOpacity=".1" stroke={v.col} strokeWidth="1"/>
          <text x="203" y={44 + i * 42} textAnchor="middle" fontSize="8.5" fontWeight="600" fill={v.col}>{v.stage}</text>
          {v.stage === "prod" && (
            <text x="244" y={44 + i * 42} fontSize="12" fill={v.col}>⭐</text>
          )}
        </g>
      ))}
      <path d="M150 178 L150 190" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2"/>
      <rect x="30" y="192" width="240" height="18" rx="6" fill="#10b981" fillOpacity=".08" stroke="#10b981" strokeWidth="1"/>
      <text x="150" y="204" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#10b981">rollback = promote previous version instantly</text>
    </svg>
  );
};

// MLOPS-3  AI risk framework — NIST wheel
const AIRiskWheel = () => {
  const quadrants = [
    { lbl: "Govern",  col: "#6366f1", d: "M150 110 L150 30  A80 80 0 0 1 230 110 Z" },
    { lbl: "Map",     col: "#10b981", d: "M150 110 L230 110 A80 80 0 0 1 150 190 Z" },
    { lbl: "Measure", col: "#f59e0b", d: "M150 110 L150 190 A80 80 0 0 1 70 110 Z" },
    { lbl: "Manage",  col: "#ef4444", d: "M150 110 L70 110  A80 80 0 0 1 150 30 Z" },
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes qspin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes qlabel { 0%,100%{opacity:.7} 50%{opacity:1} }
      `)}
      <text x="150" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">NIST AI RMF</text>
      <g style={{ transformOrigin: "150px 110px", animation: "qspin 20s linear infinite" }}>
        {quadrants.map((q) => (
          <path key={q.lbl} d={q.d} fill={q.col} fillOpacity=".18" stroke={q.col} strokeWidth="1.5"/>
        ))}
      </g>
      {[
        ["Govern", 150, 68, "#6366f1"], ["Map", 200, 120, "#10b981"],
        ["Measure", 150, 168, "#f59e0b"], ["Manage", 100, 120, "#ef4444"],
      ].map(([l, x, y, c]) => (
        <text key={String(l)} x={Number(x)} y={Number(y)} textAnchor="middle" fontSize="10" fontWeight="800" fill={String(c)}
          style={{ animation: `qlabel 3s ease-in-out infinite` }}>{String(l)}</text>
      ))}
      <circle cx="150" cy="110" r="24" fill="white" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-950"/>
      <text x="150" y="106" textAnchor="middle" fontSize="8" fontWeight="700" fill="#475569">Risk</text>
      <text x="150" y="118" textAnchor="middle" fontSize="8" fontWeight="700" fill="#475569">Framework</text>
      <text x="150" y="200" textAnchor="middle" fontSize="8.5" fill="#94a3b8">classify use case → map controls → evidence</text>
    </svg>
  );
};

// MLOPS-4  Fairness slicing — multi-group bar chart
const FairnessSlice = () => {
  const groups = [
    ["North",   88, "#6366f1"],
    ["South",   91, "#8b5cf6"],
    ["East",    74, "#ef4444"],
    ["West",    90, "#10b981"],
    ["Metro",   93, "#f59e0b"],
  ];
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {css(`
        @keyframes barUp { from{height:0;y:160} to{height:var(--h);y:var(--y)} }
        @keyframes parityScan { 0%,100%{opacity:.4} 50%{opacity:1} }
      `)}
      <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Fairness Slice by Region</text>
      {groups.map(([grp, pct, col], i) => {
        const h = Number(pct) * 1.2;
        const y = 160 - h;
        return (
          <g key={String(grp)}>
            <rect x={20 + i * 52} y={y} width="38" height={h} rx="4"
              fill={String(col)} fillOpacity=".7"
              style={{ ["--h" as string]: `${h}px`, ["--y" as string]: `${y}px`, animation: `barUp .8s ease forwards`, animationDelay: `${i * 0.15}s` }}/>
            <text x={39 + i * 52} y={y - 5} textAnchor="middle" fontSize="9" fontWeight="700" fill={String(col)}>{String(pct)}%</text>
            <text x={39 + i * 52} y="175" textAnchor="middle" fontSize="8.5" fill={String(col)}>{String(grp)}</text>
            {Number(pct) < 80 && (
              <text x={39 + i * 52} y={y - 18} textAnchor="middle" fontSize="14">⚠️</text>
            )}
          </g>
        );
      })}
      {/* parity line */}
      <line x1="18" y1={160 - 80 * 1.2} x2="282" y2={160 - 80 * 1.2}
        stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 3"
        style={{ animation: "parityScan 2s ease-in-out infinite" }}/>
      <text x="285" y={160 - 80 * 1.2 + 4} fontSize="7" fill="#ef4444">80% floor</text>
      <text x="150" y="200" textAnchor="middle" fontSize="8.5" fill="#94a3b8">recall parity ≤ 5% gap required for sign-off</text>
    </svg>
  );
};

// MLOPS-5  Security controls — layered castle
const SecurityCastle = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes shield2 { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
      @keyframes log2    { 0%{transform:translateY(4px);opacity:0} 100%{transform:translateY(0);opacity:1} }
    `)}
    {/* outer wall */}
    <rect x="20" y="40" width="260" height="140" rx="12" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="8 4"/>
    <text x="150" y="32" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6366f1">Network boundary</text>
    {/* middle wall */}
    <rect x="50" y="65" width="200" height="98" rx="10" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="6 3"/>
    <text x="150" y="60" textAnchor="middle" fontSize="8" fill="#8b5cf6">Least-privilege tools</text>
    {/* inner */}
    <rect x="80" y="90" width="140" height="60" rx="8" fill="#6366f1" fillOpacity=".06" stroke="#6366f1" strokeWidth="1.2"/>
    <text x="150" y="124" textAnchor="middle" fontSize="9" fontWeight="700" fill="#6366f1">LLM / Agent</text>
    {/* PII strip */}
    <rect x="20" y="195" width="100" height="18" rx="5" fill="#ef4444" fillOpacity=".10" stroke="#ef4444" strokeWidth="1"/>
    <text x="70" y="207" textAnchor="middle" fontSize="8" fill="#ef4444">redact PII first</text>
    {/* audit log */}
    <rect x="180" y="195" width="100" height="18" rx="5" fill="#10b981" fillOpacity=".10" stroke="#10b981" strokeWidth="1"
      style={{ animation: "log2 .5s ease forwards" }}/>
    <text x="230" y="207" textAnchor="middle" fontSize="8" fill="#10b981">immutable log ✓</text>
    {/* shield icon in center */}
    <text x="150" y="105" textAnchor="middle" fontSize="20"
      style={{ animation: "shield2 3s ease-in-out infinite" }}>🔒</text>
    <text x="150" y="145" textAnchor="middle" fontSize="8" fill="#6366f1">output filter · injection guard</text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   INDUSTRY CONTEXT
═══════════════════════════════════════════════════════════ */

// IND-0  Telecom regulatory landscape — hierarchy map
const RegLandscape = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes regpulse { 0%,100%{opacity:.6} 50%{opacity:1} }
    `)}
    {[
      { lbl: "TRAI",  x: 150, y: 38,  col: "#6366f1", sub: "Tariffs · QoS · Consumer" },
      { lbl: "DoT",   x: 75,  y: 105, col: "#8b5cf6", sub: "Licences · Spectrum · Security" },
      { lbl: "TDSAT", x: 225, y: 105, col: "#f59e0b", sub: "Dispute tribunal" },
    ].map((node, i) => (
      <g key={node.lbl} style={{ animation: `regpulse ${2 + i}s ease-in-out infinite` }}>
        <ellipse cx={node.x} cy={node.y} rx="46" ry="24" fill={node.col} fillOpacity=".15" stroke={node.col} strokeWidth="1.8"/>
        <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="13" fontWeight="900" fill={node.col}>{node.lbl}</text>
        <text x={node.x} y={node.y + 36} textAnchor="middle" fontSize="7" fill={node.col}>{node.sub}</text>
      </g>
    ))}
    <line x1="110" y1="52" x2="90" y2="85"  stroke="#94a3b8" strokeWidth="1.2"/>
    <line x1="190" y1="52" x2="210" y2="85" stroke="#94a3b8" strokeWidth="1.2"/>
    {/* obligations */}
    {["AGR licence fee","Tariff transparency","Spectrum payment","Lawful interception"].map((ob, i) => (
      <g key={ob}>
        <rect x="20" y={148 + i * 16} width="260" height="13" rx="4"
          fill={["#6366f1","#8b5cf6","#f59e0b","#10b981"][i]} fillOpacity=".08"
          stroke={["#6366f1","#8b5cf6","#f59e0b","#10b981"][i]} strokeWidth=".8"/>
        <text x="30" y={159 + i * 16} fontSize="8.5" fill={["#6366f1","#8b5cf6","#f59e0b","#10b981"][i]}>{ob}</text>
      </g>
    ))}
  </svg>
);

// IND-1  RegTech pipeline — obligation extraction
const RegTechFlow = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes extract { 0%{transform:scale(0);opacity:0} 100%{transform:scale(1);opacity:1} }
      @keyframes convey  { 0%{transform:translateX(-12px);opacity:0} 100%{transform:translateX(0);opacity:1} }
    `)}
    {/* Input */}
    <rect x="10" y="20" width="60" height="70" rx="6" fill="#94a3b8" fillOpacity=".10" stroke="#94a3b8" strokeWidth="1.2"/>
    <text x="40" y="38" textAnchor="middle" fontSize="8.5" fill="#475569">Circular</text>
    {[44,56,68,80].map(y => (
      <rect key={y} x="16" y={y} width={24 + (y % 20)} height="6" rx="2" fill="#e2e8f0"/>
    ))}
    {/* NLP extraction */}
    <path d="M72 55 L100 55" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#re)"/>
    <defs><marker id="re" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#6366f1"/></marker></defs>
    <rect x="100" y="38" width="60" height="34" rx="7" fill="#6366f1" fillOpacity=".12" stroke="#6366f1" strokeWidth="1.3"/>
    <text x="130" y="52" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6366f1">NLP</text>
    <text x="130" y="64" textAnchor="middle" fontSize="7.5" fill="#6366f1">extract</text>
    {/* obligations out */}
    {["Must file AGR quarterly","Publish tariffs 7d ahead","Maintain interception"].map((ob, i) => (
      <g key={ob} style={{ animation: `extract .4s ease forwards`, animationDelay: `${i * 0.2}s` }}>
        <rect x="175" y={25 + i * 28} width="115" height="22" rx="5"
          fill={["#6366f1","#8b5cf6","#10b981"][i]} fillOpacity=".10"
          stroke={["#6366f1","#8b5cf6","#10b981"][i]} strokeWidth="1"/>
        <text x="185" y={39 + i * 28} fontSize="7.5" fontWeight="600"
          fill={["#6366f1","#8b5cf6","#10b981"][i]}>{ob}</text>
      </g>
    ))}
    {/* gap label */}
    <rect x="30" y="115" width="240" height="22" rx="7" fill="#f59e0b" fillOpacity=".10" stroke="#f59e0b" strokeWidth="1"/>
    <text x="150" y="129" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f59e0b">→ mapped to control library → gaps flagged</text>
    {/* timing */}
    <rect x="30" y="148" width="110" height="18" rx="5" fill="#ef4444" fillOpacity=".08" stroke="#ef4444" strokeWidth="1"/>
    <text x="85" y="160" textAnchor="middle" fontSize="8" fill="#ef4444">before: 6 weeks manual</text>
    <rect x="160" y="148" width="110" height="18" rx="5" fill="#10b981" fillOpacity=".08" stroke="#10b981" strokeWidth="1"/>
    <text x="215" y="160" textAnchor="middle" fontSize="8" fill="#10b981">after: minutes with AI ✓</text>
    <text x="150" y="195" textAnchor="middle" fontSize="8.5" fill="#94a3b8">consistency: same reading every time</text>
    <text x="150" y="208" textAnchor="middle" fontSize="8.5" fill="#94a3b8">traceability: rule → control → evidence</text>
  </svg>
);

// IND-2  Revenue assurance — leakage waterfall
const RevenueWaterfall = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes drip { 0%{height:0} 100%{height:var(--h)} }
      @keyframes alert2 { 0%,100%{opacity:.3} 50%{opacity:1} }
    `)}
    <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Revenue Leakage Waterfall</text>
    {[
      { lbl: "Billed",      val: 140, col: "#6366f1" },
      { lbl: "Rating err",  val: -18, col: "#ef4444" },
      { lbl: "Unbilled",    val: -12, col: "#ef4444" },
      { lbl: "Roaming",     val: -8,  col: "#ef4444" },
      { lbl: "Collected",   val: 102, col: "#10b981" },
    ].reduce<Array<{lbl:string;val:number;col:string;i:number;top:number}>>((acc, item, i) => {
      const prev = acc.length ? acc[acc.length - 1].top : 0;
      const top = item.val > 0 ? prev : prev + item.val;
      acc.push({ ...item, i, top });
      return acc;
    }, []).map((item) => {
      const h = Math.abs(item.val) * 0.7;
      return (
        <g key={item.lbl}>
          <rect x={22 + item.i * 52} y={170 - (item.top + Math.max(item.val, 0)) * 0.7} width="42" height={h} rx="4"
            fill={item.col} fillOpacity=".8"
            style={{ ["--h" as string]: `${h}px`, animation: `drip .8s ease forwards`, animationDelay: `${item.i * 0.2}s` }}/>
          <text x={43 + item.i * 52} y={175 - (item.top + Math.max(item.val,0)) * 0.7 - 5}
            textAnchor="middle" fontSize="8" fontWeight="700" fill={item.col}>
            {item.val > 0 ? item.val : item.val}
          </text>
          <text x={43 + item.i * 52} y="183" textAnchor="middle" fontSize="7.5" fill={item.col}>{item.lbl}</text>
        </g>
      );
    })}
    <line x1="18" y1="170" x2="282" y2="170" stroke="#e2e8f0" strokeWidth="1"/>
    <rect x="30" y="196" width="240" height="16" rx="5" fill="#f59e0b" fillOpacity=".1" stroke="#f59e0b" strokeWidth="1"
      style={{ animation: "alert2 2s ease-in-out infinite" }}/>
    <text x="150" y="207" textAnchor="middle" fontSize="8" fill="#f59e0b">⚡ AI agent reconciles nightly, opens tickets per gap</text>
  </svg>
);

// IND-3  Industry deployment pattern
const DeploymentPattern = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes flow3 { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
      @keyframes box3  { 0%{transform:translateY(6px);opacity:0} 100%{transform:translateY(0);opacity:1} }
    `)}
    <text x="150" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">Production AI Deployment Pattern</text>
    {[
      { y: 28,  col: "#6366f1", lbl: "1. Ingest regulations" },
      { y: 68,  col: "#8b5cf6", lbl: "2. Extract obligations" },
      { y: 108, col: "#10b981", lbl: "3. Predict risks early" },
      { y: 148, col: "#f59e0b", lbl: "4. Automate workflows" },
      { y: 188, col: "#ef4444", lbl: "5. Human assurance layer" },
    ].map((s, i) => (
      <g key={s.lbl} style={{ animation: `box3 .4s ease forwards`, animationDelay: `${i * 0.2}s` }}>
        {i > 0 && (
          <path d={`M150 ${s.y - 14} L150 ${s.y - 4}`} stroke={s.col} strokeWidth="1.5"
            strokeDasharray="200" style={{ animation: `flow3 1s linear infinite`, animationDelay: `${i * 0.3}s` }}
            markerEnd="url(#dp)"/>
        )}
        <rect x="40" y={s.y} width="220" height="28" rx="7"
          fill={s.col} fillOpacity=".10" stroke={s.col} strokeWidth="1.5"/>
        <text x="150" y={s.y + 18} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={s.col}>{s.lbl}</text>
      </g>
    ))}
    <defs><marker id="dp" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#94a3b8"/></marker></defs>
  </svg>
);

// IND-4  Agent governance — action triage
const AgentGovernance = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full">
    {css(`
      @keyframes glow3  { 0%,100%{box-shadow:none} 50%{filter:drop-shadow(0 0 6px currentColor)} }
      @keyframes approve { 0%{opacity:0;transform:scale(.5)} 100%{opacity:1;transform:scale(1)} }
    `)}
    {/* agent */}
    <circle cx="150" cy="40" r="24" fill="#6366f1" fillOpacity=".15" stroke="#6366f1" strokeWidth="2"/>
    <text x="150" y="36" textAnchor="middle" fontSize="9" fontWeight="700" fill="#6366f1">AI Agent</text>
    <text x="150" y="49" textAnchor="middle" fontSize="8" fill="#6366f1">proposes action</text>
    {/* decision diamond */}
    <path d="M150 78 L178 105 L150 132 L122 105 Z" fill="#f59e0b" fillOpacity=".15" stroke="#f59e0b" strokeWidth="1.8"/>
    <text x="150" y="101" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f59e0b">Reversible?</text>
    <text x="150" y="113" textAnchor="middle" fontSize="7.5" fill="#f59e0b">Yes / No</text>
    {/* YES → auto */}
    <path d="M122 105 L70 105" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#ga)"/>
    <defs><marker id="ga" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#10b981"/></marker></defs>
    <rect x="14" y="90" width="56" height="30" rx="7" fill="#10b981" fillOpacity=".12" stroke="#10b981" strokeWidth="1.3"/>
    <text x="42" y="107" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981">Auto ✓</text>
    {/* NO → human */}
    <path d="M178 105 L230 105" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#gb)"/>
    <defs><marker id="gb" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#ef4444"/></marker></defs>
    <rect x="230" y="90" width="60" height="30" rx="7" fill="#ef4444" fillOpacity=".12" stroke="#ef4444" strokeWidth="1.3"/>
    <text x="260" y="107" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ef4444">Human 👤</text>
    {/* log */}
    <path d="M150 132 L150 152" stroke="#6366f1" strokeWidth="1.5"/>
    <rect x="70" y="152" width="160" height="28" rx="7" fill="#6366f1" fillOpacity=".08" stroke="#6366f1" strokeWidth="1.2"/>
    <text x="150" y="168" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6366f1">Immutable audit log</text>
    <text x="150" y="180" textAnchor="middle" fontSize="7.5" fill="#6366f1">plan · tool call · result · decision</text>
    <rect x="40" y="194" width="220" height="18" rx="6" fill="#ef4444" fillOpacity=".06" stroke="#ef4444" strokeWidth="1"/>
    <text x="150" y="206" textAnchor="middle" fontSize="8" fill="#ef4444">budget cap · max iterations · kill switch</text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   DISPATCH TABLE
═══════════════════════════════════════════════════════════ */

const ARTS: Record<string, React.FC> = {
  "foundations-0": NestingDolls,
  "foundations-1": MLFamiliesTree,
  "foundations-2": NeuralLearnsDiagram,
  "foundations-3": TransformerAttention,
  "foundations-4": TokenizationFlow,
  "foundations-5": EmbeddingSpace,
  "foundations-6": ChunkingSlice,
  "modern-ai-0":   TemperatureDial,
  "modern-ai-1":   ContextWindowViz,
  "modern-ai-2":   PromptingLadder,
  "modern-ai-3":   InjectionShield,
  "modern-ai-4":   RAGPipeline,
  "modern-ai-5":   HybridSearchVenn,
  "modern-ai-6":   RAGEvalDashboard,
  "modern-ai-7":   AgentLoop,
  "modern-ai-8":   LangChainGraph,
  "ml-0":          ConfusionMatrixAnim,
  "ml-1":          ImbalanceSeesaw,
  "ml-2":          BiasVarianceBullseye,
  "ml-3":          ValidationFolds,
  "ml-4":          ModelLifecycle,
  "dataeng-0":     PDFScanFlow,
  "dataeng-1":     SCDTimeline,
  "dataeng-2":     DedupFunnel,
  "dataeng-3":     IngestionPipeline,
  "dataeng-4":     DataQualityGates,
  "mlops-0":       DeploymentCanary,
  "mlops-1":       DriftMonitor,
  "mlops-2":       ModelRegistry,
  "mlops-3":       AIRiskWheel,
  "mlops-4":       FairnessSlice,
  "mlops-5":       SecurityCastle,
  "industry-0":    RegLandscape,
  "industry-1":    RegTechFlow,
  "industry-2":    RevenueWaterfall,
  "industry-3":    DeploymentPattern,
  "industry-4":    AgentGovernance,
};

interface Props {
  topicId: string;
  conceptIndex: number;
}

export default function ConceptArt({ topicId, conceptIndex }: Props) {
  const key = `${topicId}-${conceptIndex}`;
  const Art = ARTS[key];
  if (!Art) return null;
  return (
    <div className="relative flex h-full min-h-[200px] w-full items-center justify-center overflow-hidden">
      <Art />
    </div>
  );
}
