"use client";

import { useRef, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import StreamingMessage from "./StreamingMessage";
import type { Message } from "@/types/message";
import { Sparkles } from "lucide-react";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading?: boolean;
  onSendMessage?: (content: string) => void;
}

export default function ChatInterface({
  messages,
  isLoading = false,
  onSendMessage,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              How can I help you today?
            </h2>
            <p className="text-[var(--muted)] max-w-md">
              Start a conversation by typing a message below. I can help with
              coding, writing, analysis, and more.
            </p>
          </div>
        ) : (
          <div className="w-full">
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;
              const shouldStream = isLastMessage && message.isStreaming;

              return shouldStream ? (
                <StreamingMessage key={message.id} message={message} />
              ) : (
                <ChatMessage key={message.id} message={message} />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const form = e.currentTarget.form;
                  if (form) {
                    handleSubmit(e as any);
                  }
                }
              }}
              placeholder="Message ChatGPT..."
              disabled={isLoading}
              rows={1}
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--input)] px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                minHeight: "52px",
                maxHeight: "200px",
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 bottom-2 p-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          <p className="text-xs text-[var(--muted)] text-center mt-2">
            ChatGPT can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
