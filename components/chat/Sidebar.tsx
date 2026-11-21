"use client";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  return (
    <aside
      className={`w-64 border-r bg-[var(--input)] flex flex-col ${className}`}
    >
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Channels</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {/* Channel list will go here */}
          <p className="text-sm text-[var(--muted)] p-2">No channels yet</p>
        </div>
      </nav>
    </aside>
  );
}
