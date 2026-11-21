"use client";

import { useRef, useEffect } from "react";

interface Message {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
}

interface MessageListProps {
  messages?: Message[];
}

export default function MessageList({ messages = [] }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-[var(--muted)]">No messages yet. Start a conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center">
              <span className="text-sm font-medium">
                {message.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-sm">{message.author}</span>
                <span className="text-xs text-[var(--muted)]">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm break-words">{message.content}</p>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
