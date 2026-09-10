"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Stop click bubbling supaya toggle/tombol di dalam card tidak ikut memicu navigasi ke halaman edit.
export function stopCardClick(e: MouseEvent) {
  e.stopPropagation();
}

export function AdminGridCard({
  href,
  imageUrl,
  title,
  badges,
  description,
  meta,
  footer,
  onDelete,
}: {
  href: string;
  imageUrl: string;
  title: string;
  badges?: ReactNode;
  description?: string;
  meta?: ReactNode;
  footer?: ReactNode;
  onDelete: () => void;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white transition-colors hover:border-primary-300 hover:shadow-sm"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-primary-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={(e) => {
            stopCardClick(e);
            onDelete();
          }}
          aria-label="Hapus"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 opacity-0 shadow transition-opacity group-hover:opacity-100 focus:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6h12z" />
          </svg>
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3.5">
        {badges && <div className="flex flex-wrap items-center gap-1.5">{badges}</div>}
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-primary-900">{title}</h3>
        {description && <p className="line-clamp-2 text-xs text-primary-800/60">{description}</p>}
        {meta && <div className="min-w-0 text-[11px] text-primary-800/50">{meta}</div>}
        {footer && (
          <div onClick={stopCardClick} className="mt-1.5 flex flex-wrap items-center justify-between gap-2 border-t border-primary-50 pt-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
