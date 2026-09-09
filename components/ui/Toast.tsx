"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ToastTone = "success" | "error";

type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
  leaving: boolean;
};

type ToastContextValue = {
  showToast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TONE_STYLES: Record<ToastTone, string> = {
  success: "bg-primary-900 text-white",
  error: "bg-red-600 text-white",
};

let nextId = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, tone, leaving: false }]);

    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    }, 3200);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3450);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto rounded-lg px-5 py-3 text-sm font-medium shadow-lg shadow-black/10 transition-all duration-250 ${
              TONE_STYLES[t.tone]
            } ${t.leaving ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus dipakai di dalam ToastProvider");
  return ctx;
}
