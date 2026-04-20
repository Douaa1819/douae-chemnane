export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="relative h-24 w-24">
        <span className="absolute inset-0 animate-ping rounded-full bg-pink-500/40" />
        <span className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-pink-400 border-r-fuchsia-500" />
      </div>
    </div>
  );
}