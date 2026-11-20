"use client";

import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import StreamingMessage from "./StreamingMessage";
import ChatInput from "./ChatInput";
import type { Message } from "@/types/message";
import { Sparkles } from "lucide-react";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading?: boolean;
  onSendMessage?: (content: string) => void;
  onAttachment?: (file: File) => void;
}

export default function ChatInterface({
  messages,
  isLoading = false,
  onSendMessage,
  onAttachment,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (onSendMessage) {
      onSendMessage(content);
    }
  };

  const handleAttachment = (file: File) => {
    if (onAttachment) {
      onAttachment(file);
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
      <ChatInput
        onSendMessage={handleSendMessage}
        onAttachment={onAttachment ? handleAttachment : undefined}
        isLoading={isLoading}
      />
    </div>
  );
}
