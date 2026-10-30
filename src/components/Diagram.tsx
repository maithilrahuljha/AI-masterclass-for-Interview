import type { DiagramData } from "../data/topics";

/**
 * Lightweight inline-SVG diagram renderer.
 * kind "flow": nodes connected left→right (or top→bottom when there are many).
 * kind "cycle": nodes arranged on an ellipse with arrows around the loop.
 * Theming is driven by CSS classes (.dg-node, .dg-text, .dg-arrow...) in index.css.
 */

const CHAR_W = 6.8;
const PAD_X = 26;

function boxW(label: string) {
  return Math.max(88, label.length * CHAR_W + PAD_X);
}

function ArrowHead({ x, y, angle }: { x: number; y: number; angle: number }) {
  const s = 7;
  const rad = (angle * Math.PI) / 180;
  const p1 = { x, y };
  const p2 = { x: x - s * Math.cos(rad - 0.42), y: y - s * Math.sin(rad - 0.42) };
  const p3 = { x: x - s * Math.cos(rad + 0.42), y: y - s * Math.sin(rad + 0.42) };
  return (
    <polygon
      className="dg-arrowhead"
      points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
    />
  );
}

function FlowDiagram({ data }: { data: DiagramData }) {
  const n = data.nodes.length;
  const horizontal = n <= 4 && data.nodes.reduce((s, t) => s + boxW(t), 0) + (n - 1) * 34 <= 940;
  const accent = new Set(data.accent ?? []);

  if (horizontal) {
    const widths = data.nodes.map(boxW);
    const H = 64;
    const GAP = 32;
    const totalW = widths.reduce((a, b) => a + b, 0) + (n - 1) * GAP;
    let x = 0;
    return (
      <svg
        viewBox={`0 0 ${totalW} ${H}`}
        width="100%"
        role="img"
        aria-label={data.nodes.join(" → ")}
        className="max-h-20"
        preserveAspectRatio="xMidYMid meet"
      >
        {data.nodes.map((label, i) => {
          const w = widths[i];
          const cx = x;
          const cy = H / 2;
          x += w + GAP;
          return (
            <g key={i}>
              {i > 0 && (
                <>
                  <line
                    className="dg-arrow"
                    x1={cx - GAP}
                    y1={cy}
                    x2={cx - 7}
                    y2={cy}
                  />
                  <ArrowHead x={cx - 4} y={cy} angle={0} />
                </>
              )}
              <rect
                className={accent.has(i) ? "dg-node-accent" : "dg-node"}
                x={cx}
                y={cy - 19}
                width={w}
                height={38}
                rx={10}
              />
              <text
                className={`dg-text ${accent.has(i) ? "dg-text-accent" : ""}`}
                x={cx + w / 2}
                y={cy + 4.5}
                textAnchor="middle"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  // Vertical flow
  const w = Math.min(600, Math.max(...data.nodes.map(boxW)));
  const boxH = 38;
  const gap = 24;
  const H = n * boxH + (n - 1) * gap;
  return (
    <svg
      viewBox={`0 0 ${w} ${H}`}
      width="100%"
      role="img"
      aria-label={data.nodes.join(" → ")}
      className="mx-auto block max-w-md"
    >
      {data.nodes.map((label, i) => {
        const y = i * (boxH + gap);
        return (
          <g key={i}>
            {i > 0 && (
              <>
                <line
                  className="dg-arrow"
                  x1={w / 2}
                  y1={y - gap}
                  x2={w / 2}
                  y2={y - 7}
                />
                <ArrowHead x={w / 2} y={y - 3} angle={90} />
              </>
            )}
            <rect
              className={accent.has(i) ? "dg-node-accent" : "dg-node"}
              x={4}
              y={y}
              width={w - 8}
              height={boxH}
              rx={10}
            />
            <text
              className={`dg-text ${accent.has(i) ? "dg-text-accent" : ""}`}
              x={w / 2}
              y={y + boxH / 2 + 4.5}
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CycleDiagram({ data }: { data: DiagramData }) {
  const n = data.nodes.length;
  const W = 440;
  const H = n <= 4 ? 250 : 290;
  const cx = W / 2;
  const cy = H / 2;
  const rx = W / 2 - 96;
  const ry = H / 2 - 40;
  const accent = new Set(data.accent ?? []);

  const pts = data.nodes.map((label, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    return { label, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), w: Math.max(74, label.length * 6.4 + 18), h: 30 };
  });

  const arrows: { x1: number; y1: number; x2: number; y2: number; angle: number }[] = [];
  for (let i = 0; i < n; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const startPad = Math.min(Math.abs(a.w / 2 / (ux || 0.001)), Math.abs(a.h / 2 / (uy || 0.001))) + 4;
    const endPad = Math.min(Math.abs(b.w / 2 / (ux || 0.001)), Math.abs(b.h / 2 / (uy || 0.001))) + 9;
    arrows.push({
      x1: a.x + ux * startPad,
      y1: a.y + uy * startPad,
      x2: b.x - ux * endPad,
      y2: b.y - uy * endPad,
      angle: (Math.atan2(dy, dx) * 180) / Math.PI,
    });
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={data.nodes.join(" → ")}
      className="mx-auto block max-w-sm"
    >
      {arrows.map((a, i) => (
        <g key={`a${i}`}>
          <line className="dg-arrow" x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} />
          <ArrowHead x={a.x2 + Math.cos((a.angle * Math.PI) / 180) * 5} y={a.y2 + Math.sin((a.angle * Math.PI) / 180) * 5} angle={a.angle} />
        </g>
      ))}
      {pts.map((p, i) => (
        <g key={`n${i}`}>
          <rect
            className={accent.has(i) ? "dg-node-accent" : "dg-node"}
            x={p.x - p.w / 2}
            y={p.y - p.h / 2}
            width={p.w}
            height={p.h}
            rx={10}
          />
          <text
            className={`dg-text ${accent.has(i) ? "dg-text-accent" : ""}`}
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function Diagram({ data, naked = false }: { data: DiagramData; naked?: boolean }) {
  const baseClass = naked 
    ? "p-2" 
    : "rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700/70 dark:bg-slate-900/40 shadow-sm";
  return (
    <figure className={baseClass}>
      {data.kind === "cycle" ? <CycleDiagram data={data} /> : <FlowDiagram data={data} />}
      {data.caption && (
        <figcaption className="mt-3 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
}
