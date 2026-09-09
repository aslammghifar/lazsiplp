type Icon = "fund" | "donors" | "beneficiaries" | "verifikator" | "mitra" | "calendar" | "campaign";

const ICONS: Record<Icon, string> = {
  fund: "M12 3v18M7 7l5-4 5 4M6 12h12M6 17h12",
  donors: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 2.7-5.5 7-5.5s7 2.5 7 5.5M14.5 14.8c3.5.3 5.5 2.6 5.5 5.2",
  beneficiaries: "M12 21s-7-4.35-9.5-8.8C.8 8.6 2.4 5 6 5c2 0 3.3 1 4 2.2C10.7 6 12 5 14 5c3.6 0 5.2 3.6 3.5 7.2C15 16.65 12 21 12 21z",
  verifikator: "M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  mitra: "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM4 20c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5M17 4.5c1.7.4 3 2 3 3.9 0 1.9-1.3 3.5-3 3.9",
  calendar: "M8 3v3M16 3v3M3.5 9h17M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
  campaign: "M3 11v2a1 1 0 0 0 1 1h2l4 4V6l-4 4H4a1 1 0 0 0-1 1zM15.5 8.5a4 4 0 0 1 0 7M18.5 5.5a8 8 0 0 1 0 13",
};

export function StatCounter({
  value,
  label,
  icon = "fund",
  className = "",
}: {
  value: string;
  label: string;
  icon?: Icon;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl bg-white p-6 ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[icon]} />
        </svg>
      </span>
      <p className="mt-4 text-2xl font-extrabold tracking-tight text-primary-900 sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-sm text-primary-800/60">{label}</p>
    </div>
  );
}
