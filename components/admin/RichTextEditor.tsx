"use client";

import { useEffect, useRef } from "react";

function exec(command: string) {
  document.execCommand(command);
}

// WYSIWYG sederhana berbasis contentEditable — cukup untuk kebutuhan admin (bold/italic/list),
// tanpa nambah dependency library editor pihak ketiga.
export function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis di sini...",
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && ref.current) {
      ref.current.innerHTML = value;
      initialized.current = true;
    }
  }, [value]);

  return (
    <div className="overflow-hidden rounded-2xl border border-primary-200 bg-white">
      <div className="flex items-center gap-1 border-b border-primary-100 bg-primary-50/40 p-1.5">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("bold")}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-primary-800 transition-colors hover:bg-white"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm italic text-primary-800 transition-colors hover:bg-white"
        >
          I
        </button>
        <span className="mx-1 h-5 w-px bg-primary-200" />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertUnorderedList")}
          aria-label="Bullet list"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-800 transition-colors hover:bg-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        data-placeholder={placeholder}
        className="admin-rte min-h-[140px] px-4 py-3 text-sm leading-relaxed text-primary-900 outline-none [&_ul]:list-disc [&_ul]:pl-5"
      />
    </div>
  );
}
