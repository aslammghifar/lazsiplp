export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} aria-hidden />;
}

export function CardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-primary-100 bg-white">
      <Skeleton className={`rounded-none ${featured ? "aspect-[16/10]" : "aspect-[4/3]"} w-full`} />
      <div className={`flex flex-1 flex-col gap-2 ${featured ? "p-6" : "p-3.5"}`}>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="mt-auto h-3 w-1/2" />
      </div>
    </div>
  );
}
