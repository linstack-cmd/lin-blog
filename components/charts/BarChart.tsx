import React from "react";

/**
 * BarChart — a tiny hand-rolled inline-SVG grouped bar chart for MDX posts.
 * Zero dependencies. Pure deterministic render (no window / Date.now /
 * Math.random / DOM measurement) so Vike prerender and hydration agree
 * byte-for-byte. viewBox + width:100% (never fixed pixel widths), value labels
 * in JetBrains Mono, native <title> hover tooltips, role="img" + aria-label.
 * The post's GFM table stays the no-JS source of truth — this figure overlays it.
 */

// Dark GitHub theme constants (single source of chart styling)
export const THEME = {
  panelBg: "#161b22",
  border: "#21262d",
  axisText: "#8b949e",
  valueLabel: "#c9d1d9",
  radius: 8,
} as const;

// Series palette for the benchmark post
export const SERIES_COLORS = {
  qwen: "#8b949e",
  deepseek: "#58a6ff",
} as const;

// Value formatters — must match the post tables/prose exactly
export const fmtSeconds = (v: number) => `${v}s`;
export const fmtRate = (v: number) => v.toFixed(1);
export const fmtTokens = (v: number) =>
  v >= 1000 ? (v % 1000 === 0 ? `${v / 1000}k` : `${(v / 1000).toFixed(1)}k`) : `${v}`;

export interface SeriesDef { key: string; label: string; color: string }
export interface PanelDef { key: string; label: string; unit: string; format: (v: number) => string }
export interface Datum { panel: string; category: string; series: string; value: number }
export interface BarChartProps {
  title: string; // → svg aria-label
  caption?: string; // visible figcaption
  series: SeriesDef[];
  categories: string[]; // x-axis labels in order (union across series)
  panels: PanelDef[]; // one small-multiple per metric
  data: Datum[];
}

// Geometry — unitless viewBox coords; rendered width comes from CSS width:100%
const VB_W = 640;
const PANEL_H = 168;
const PANEL_GAP = 16;
const PAD_X = 12;
const PAD_TOP = 34; // headroom above the tallest bar for its value label
const PAD_BOTTOM = 30; // room for x-axis category labels
const BAR_W = 40;
const BAR_GAP = 14;
const MONO = "'JetBrains Mono', monospace";

export default function BarChart({ title, caption, series, categories, panels, data }: BarChartProps) {
  const defs = series.filter((s) => s.key && s.label && s.color);
  const panelDefs = panels.filter((p) => p.key && p.label && p.unit && p.format);
  const cats = categories.filter(Boolean);
  if (!defs.length || !panelDefs.length || !cats.length) return null;

  // Keep only rows referencing declared categories/series (defensive).
  const rows = data.filter((d) => cats.includes(d.category) && defs.some((s) => s.key === d.series));

  if (!rows.length) {
    return (
      <figure style={{ margin: "2rem 0" }}>
        <figcaption style={{ color: THEME.axisText, fontSize: "0.9rem" }}>
          {title} — no chart data.
        </figcaption>
      </figure>
    );
  }

  const totalH = panelDefs.length * PANEL_H + (panelDefs.length - 1) * PANEL_GAP;
  const groupW = (VB_W - PAD_X * 2) / cats.length;
  const groupContent = BAR_W * defs.length + BAR_GAP * (defs.length - 1);
  const groupStartX = (i: number) => PAD_X + i * groupW + (groupW - groupContent) / 2;

  return (
    <figure style={{ margin: "2rem 0" }}>
      {/* Shared legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "0.75rem" }}>
        {defs.map((s) => (
          <span key={s.key} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: THEME.valueLabel }}>
            <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "3px", backgroundColor: s.color, display: "inline-block", flex: "none" }} />
            {s.label}
          </span>
        ))}
      </div>

      <svg viewBox={`0 0 ${VB_W} ${totalH}`} role="img" aria-label={title} style={{ width: "100%", height: "auto", display: "block" }}>
        {panelDefs.map((panel, pi) => {
          const top = pi * (PANEL_H + PANEL_GAP);
          const baseY = top + PANEL_H - PAD_BOTTOM;
          const plotH = PANEL_H - PAD_TOP - PAD_BOTTOM;
          const pr = rows.filter((r) => r.panel === panel.key);
          const max = Math.max(...pr.map((r) => r.value), 0);
          const fmt = panel.format;
          return (
            <g key={panel.key}>
              {/* Panel background */}
              <rect x={0} y={top} width={VB_W} height={PANEL_H} rx={THEME.radius} fill={THEME.panelBg} stroke={THEME.border} />
              {/* Panel header */}
              <text x={PAD_X} y={top + 17} fontFamily="'Inter', sans-serif" fontSize={12.5} fontWeight={600} fill={THEME.axisText}>{panel.label}</text>
              {/* Subtle gridlines + baseline */}
              {[0.25, 0.5, 0.75].map((t) => (
                <line key={t} x1={PAD_X} x2={VB_W - PAD_X} y1={baseY - plotH * t} y2={baseY - plotH * t} stroke={THEME.border} strokeWidth={1} opacity={0.55} />
              ))}
              <line x1={PAD_X} x2={VB_W - PAD_X} y1={baseY} y2={baseY} stroke={THEME.border} strokeWidth={1.5} />
              {/* Bars */}
              {cats.map((cat, ci) =>
                defs.map((s, si) => {
                  const d = pr.find((r) => r.category === cat && r.series === s.key);
                  if (!d || d.value <= 0) return null; // missing combo → no bar, no fake zero
                  const x = groupStartX(ci) + si * (BAR_W + BAR_GAP);
                  const h = (d.value / max) * plotH;
                  const y = baseY - h;
                  return (
                    <g key={`${cat}-${s.key}`}>
                      <title>{`${s.label} · ${cat} reasoning — ${fmt(d.value)}`}</title>
                      <rect x={x} y={y} width={BAR_W} height={h} rx={3} fill={s.color} />
                      <text x={x + BAR_W / 2} y={y - 6} textAnchor="middle" fontFamily={MONO} fontSize={12} fill={THEME.valueLabel}>{fmt(d.value)}</text>
                    </g>
                  );
                })
              )}
              {/* X-axis category labels */}
              {cats.map((cat, ci) => (
                <text key={cat} x={PAD_X + groupW * ci + groupW / 2} y={baseY + 20} textAnchor="middle" fontFamily={MONO} fontSize={11} fill={THEME.axisText}>{cat}</text>
              ))}
            </g>
          );
        })}
      </svg>

      {caption && (
        <figcaption style={{ color: THEME.axisText, fontSize: "0.9rem", marginTop: "0.75rem" }}>{caption}</figcaption>
      )}
    </figure>
  );
}
