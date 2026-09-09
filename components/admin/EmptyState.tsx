export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 17h3M9 3h6l3 3v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        </svg>
      </span>
      <p className="text-sm text-primary-800/55">{message}</p>
    </div>
  );
}
