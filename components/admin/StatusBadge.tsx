import type { TransactionStatus } from "@/lib/admin-dummy-data";

const STATUS_STYLES: Record<TransactionStatus, string> = {
  paid: "bg-secondary-50 text-secondary-700",
  pending: "bg-amber-50 text-amber-700",
  failed: "bg-red-50 text-red-700",
  expired: "bg-primary-900/5 text-primary-900/50",
};

const STATUS_LABEL: Record<TransactionStatus, string> = {
  paid: "Lunas",
  pending: "Menunggu",
  failed: "Gagal",
  expired: "Kedaluwarsa",
};

export function StatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
