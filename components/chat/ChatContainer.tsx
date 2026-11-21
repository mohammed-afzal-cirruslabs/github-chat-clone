"use client";

import { ReactNode } from "react";

interface ChatContainerProps {
  children: ReactNode;
}

export default function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--background)]">
      {children}
    </div>
  );
}
