"use client";

interface ChatHeaderProps {
  title?: string;
  description?: string;
}

export default function ChatHeader({
  title = "General",
  description,
}: ChatHeaderProps) {
  return (
    <header className="border-b p-4 bg-[var(--background)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold"># {title}</h1>
          {description && (
            <p className="text-sm text-[var(--muted)] mt-1">{description}</p>
          )}
        </div>
      </div>
    </header>
  );
}
