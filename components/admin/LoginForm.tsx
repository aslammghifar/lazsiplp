"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminLoggedIn } from "@/lib/admin-session";

// UI saja — belum disambungkan ke NextAuth credentials provider (lihat CLAUDE.md §Tech Stack).
// Submit sekarang cuma simulasi delay lalu redirect ke /admin, TIDAK memverifikasi kredensial apa pun.
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setAdminLoggedIn(true);
      router.push("/admin");
    }, 500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-email" className="text-sm font-medium text-primary-900">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@lazsip.or.id"
          className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-password" className="text-sm font-medium text-primary-900">
          Kata Sandi
        </label>
        <input
          id="login-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="rounded-full border border-primary-200 bg-white px-4 py-2.5 text-sm text-primary-900 outline-none focus:ring-2 focus:ring-primary-400"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Memproses..." : "Masuk"}
      </button>

      <p className="text-center text-xs text-primary-800/45">
        Autentikasi asli belum aktif — tombol ini langsung masuk ke dashboard untuk keperluan
        pratinjau tampilan.
      </p>
    </form>
  );
}
