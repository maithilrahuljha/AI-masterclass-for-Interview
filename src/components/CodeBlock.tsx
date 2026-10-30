import { useState } from "react";
import { Check, Copy, Eye, EyeOff, Terminal } from "lucide-react";

interface Props {
  code: string;
  sampleOutput?: string;
  compact?: boolean;
}

export default function CodeBlock({ code, sampleOutput, compact = false }: Props) {
  const [copied, setCopied] = useState(false);
  const [showOut, setShowOut] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/60 shadow-md">
      <div className="flex items-center justify-between gap-2 bg-slate-800 px-4 py-2">
        <span className="flex items-center gap-2 text-xs font-medium text-slate-300">
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          python · Google Colab (CPU)
        </span>
        <div className="flex items-center gap-2">
          {sampleOutput && (
            <button
              type="button"
              onClick={() => setShowOut((s) => !s)}
              aria-label={showOut ? "Hide sample output" : "Show sample output"}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              {showOut ? <EyeOff className="h-3.5 w-3.5" aria-hidden="true" /> : <Eye className="h-3.5 w-3.5" aria-hidden="true" />}
              {showOut ? "Hide output" : "Sample output"}
            </button>
          )}
          <button
            type="button"
            onClick={copy}
            aria-label="Copy code to clipboard"
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-700 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-600"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>
      </div>
      <pre
        className={`code-scroll m-0 bg-slate-900 p-4 font-mono text-[13px] leading-6 text-slate-100 ${
          compact ? "max-h-80" : ""
        }`}
      >
        <code>{code}</code>
      </pre>
      {showOut && sampleOutput && (
        <pre className="code-scroll m-0 border-t border-slate-700/60 bg-slate-950 p-4 font-mono text-[12.5px] leading-6 text-emerald-200/90">
          <code>{sampleOutput}</code>
        </pre>
      )}
    </div>
  );
}
