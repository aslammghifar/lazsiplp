import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { LazsipLogo } from "@/components/ui/LazsipLogo";

export const metadata: Metadata = {
  title: "Login Admin — LAZSIP",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-50/60 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <LazsipLogo size={48} />
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-primary-900">LAZSIP Admin</h1>
            <p className="mt-1 text-sm text-primary-800/60">Masuk untuk mengelola konten landing page</p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
