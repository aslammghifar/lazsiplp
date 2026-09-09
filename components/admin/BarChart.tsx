import { formatRupiah } from "@/lib/format";

const MAX_BAR_HEIGHT = 160; // px

// Chart batang sederhana tanpa library eksternal — cukup untuk kebutuhan dashboard ini.
export function BarChart({
  data,
  labelEvery = 1,
}: {
  data: { label: string; nominal: number }[];
  labelEvery?: number;
}) {
  const max = Math.max(...data.map((d) => d.nominal), 1);

  return (
    <div className="flex items-end gap-1 sm:gap-1.5" style={{ height: MAX_BAR_HEIGHT + 24 }}>
      {data.map((d, i) => {
        const barHeight = Math.round((d.nominal / max) * MAX_BAR_HEIGHT);
        return (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <div
              className="w-full rounded-t bg-primary-700"
              style={{ height: `${barHeight}px` }}
              title={`${d.label}: ${formatRupiah(d.nominal)}`}
            />
            <span className="text-[10px] font-medium text-primary-800/50">
              {i % labelEvery === 0 ? d.label : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}
