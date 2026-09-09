"use client";

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-primary-200 bg-white text-primary-800 hover:border-primary-400"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
