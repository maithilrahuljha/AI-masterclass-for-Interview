import { useMemo } from "react";

/**
 * Self-contained, dynamic SVG animations for different AI themes.
 * No external assets, uses pure CSS keyframes.
 */

const NeuralGrid = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-40 dark:opacity-30">
    <style>{`
      @keyframes pulseNode { 0%, 100% { r: 2; opacity: 0.4; } 50% { r: 4; opacity: 1; } }
      @keyframes flowLine { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
    `}</style>
    {Array.from({ length: 6 }).map((_, i) =>
      Array.from({ length: 5 }).map((_, j) => (
        <g key={`${i}-${j}`}>
          {i < 5 && (
            <line
              x1={40 + i * 25} y1={40 + j * 30} x2={40 + (i + 1) * 25} y2={40 + j * 30}
              stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2"
              style={{ animation: `flowLine ${2 + i}s linear infinite` }}
              className="text-indigo-400"
            />
          )}
          <circle
            cx={40 + i * 25} cy={40 + j * 30} r="2"
            fill="currentColor"
            style={{ animation: `pulseNode ${2 + (i + j) % 3}s ease-in-out infinite`, animationDelay: `${(i + j) * 0.2}s` }}
            className="text-indigo-500"
          />
        </g>
      ))
    )}
  </svg>
);

const TokenStream = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-50 dark:opacity-30">
    <style>{`
      @keyframes slideText { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 0.8; } 80% { opacity: 0.8; } 100% { transform: translateY(-100px); opacity: 0; } }
    `}</style>
    {["LLM", "RAG", "Embed", "Token", "Query", "Vector", "JSON"].map((txt, i) => (
      <text
        key={txt} x={30 + (i * 25) % 140} y={180}
        fontSize="10" fontWeight="bold" fill="currentColor"
        className="text-indigo-400"
        style={{ animation: `slideText ${3 + i}s linear infinite`, animationDelay: `${i * 0.5}s` }}
      >
        {txt}
      </text>
    ))}
  </svg>
);

const DataWaves = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-40 dark:opacity-20">
    <style>{`
      @keyframes wave { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.4); } }
    `}</style>
    <rect x="0" y="0" width="200" height="200" fill="none" />
    {Array.from({ length: 15 }).map((_, i) => (
      <rect
        key={i} x={40 + i * 8} y={100} width="4" height="60"
        fill="currentColor" className="text-indigo-400"
        style={{
          transformOrigin: "center",
          animation: `wave ${1 + i * 0.1}s ease-in-out infinite`,
          animationDelay: `${i * 0.05}s`
        }}
      />
    ))}
  </svg>
);

const SignalTowerVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-60 dark:opacity-30">
    <style>{`
      @keyframes ripple { 0% { r: 10; opacity: 1; } 100% { r: 80; opacity: 0; } }
    `}</style>
    <circle cx="100" cy="140" r="4" fill="currentColor" className="text-indigo-600" />
    <path d="M90 140 L110 140 L100 60 Z" fill="currentColor" className="text-slate-400 dark:text-slate-600" />
    <circle cx="100" cy="60" r="5" fill="currentColor" className="text-amber-500" />
    <circle cx="100" cy="60" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-400" style={{ animation: "ripple 2s linear infinite" }} />
    <circle cx="100" cy="60" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-400" style={{ animation: "ripple 2s linear infinite", animationDelay: "1s" }} />
  </svg>
);

const VectorCloud = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-40 dark:opacity-20">
    <style>{`
      @keyframes floatPoint { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10px, -10px); } }
    `}</style>
    {Array.from({ length: 20 }).map((_, i) => (
      <circle
        key={i}
        cx={Math.random() * 140 + 30}
        cy={Math.random() * 140 + 30}
        r={Math.random() * 3 + 1}
        fill="currentColor"
        className="text-indigo-400"
        style={{
          animation: `floatPoint ${3 + Math.random() * 3}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ))}
  </svg>
);

const PipelineVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-40 dark:opacity-20">
    <style>{`
      @keyframes rotateGear { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `}</style>
    <g style={{ animation: "rotateGear 10s linear infinite", transformOrigin: "100px 100px" }}>
       <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray="10 5" className="text-indigo-300" />
    </g>
    <g style={{ animation: "rotateGear 8s linear reverse infinite", transformOrigin: "65px 70px" }}>
       <circle cx="65" cy="70" r="20" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="8 4" className="text-amber-400" />
    </g>
  </svg>
);

export default function VisualDecor({ theme = "default" }: { theme?: string }) {
  return useMemo(() => {
    switch (theme) {
      case "foundations": return <NeuralGrid />;
      case "modern-ai": return <TokenStream />;
      case "ml": return <VectorCloud />;
      case "dataeng": return <DataWaves />;
      case "mlops": return <PipelineVisual />;
      case "industry": return <SignalTowerVisual />;
      default: return <NeuralGrid />;
    }
  }, [theme]);
}
