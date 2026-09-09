type Tone = "primary" | "secondary" | "neutral";

const TONES: Record<Tone, string> = {
  primary: "bg-primary-50 text-primary-700",
  secondary: "bg-secondary-50 text-secondary-700",
  neutral: "bg-primary-900/5 text-primary-900/70",
};

export function Badge({
  children,
  tone = "primary",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
