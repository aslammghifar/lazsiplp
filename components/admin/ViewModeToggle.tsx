"use client";

export type ViewMode = "list" | "card";

export function ViewModeToggle({ mode, onChange }: { mode: ViewMode; onChange: (mode: ViewMode) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-primary-200 bg-white p-1">
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-pressed={mode === "list"}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
          mode === "list" ? "bg-primary-900 text-white" : "text-primary-800/60 hover:text-primary-900"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        List
      </button>
      <button
        type="button"
        onClick={() => onChange("card")}
        aria-pressed={mode === "card"}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
          mode === "card" ? "bg-primary-900 text-white" : "text-primary-800/60 hover:text-primary-900"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h7v7H4zM13 5h7v7h-7zM4 15h7v4H4zM13 15h7v4h-7z" />
        </svg>
        Card
      </button>
    </div>
  );
}
