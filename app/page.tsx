export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-sans text-sm">
        <h1 className="text-4xl font-bold mb-4">GitHub Chat Clone</h1>
        <p className="text-[var(--muted)] mb-8">
          A modern chat application with GitHub&apos;s clean interface
        </p>
        <div className="rounded-lg border bg-[var(--input)] p-8">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-[var(--muted)]">
            The Next.js project is successfully set up with TypeScript and Tailwind CSS.
          </p>
        </div>
      </div>
    </main>
  );
}
