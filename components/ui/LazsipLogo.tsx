export function LazsipLogo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-sm ring-1 ring-primary-100 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/daun_lazsip.png" alt="LAZSIP" className="h-full w-full object-contain" />
    </span>
  );
}
