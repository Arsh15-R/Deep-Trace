"use client";

import React from "react";

export type Severity = "critical" | "high" | "medium";

/**
 * Monochrome palette has no status colours, so severity is shown by SHAPE:
 * critical = solid + pulsing, high = solid ring, medium = dim ring.
 * The text label is always shown too (never rely on the dot alone).
 */
export function SeverityDot({ level }: { level: Severity | string }) {
  const normalized = (level || "medium").toLowerCase() as Severity;
  const style =
    normalized === "critical"
      ? { background: "var(--fg)", border: "1.5px solid var(--fg)" }
      : normalized === "high"
      ? { background: "transparent", border: "1.5px solid var(--fg)" }
      : { background: "transparent", border: "1.5px solid var(--subtle)" };

  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium">
      <span
        aria-hidden
        className={"inline-block h-2.5 w-2.5 rounded-full " + (normalized === "critical" ? "live-dot" : "")}
        style={style}
      />
      <span style={{ color: normalized === "medium" ? "var(--subtle)" : "var(--fg)" }}>
        {normalized}
      </span>
    </span>
  );
}
