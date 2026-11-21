"use client";

import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { User, Bot } from "lucide-react";
import type { Message } from "@/types/message";
import "highlight.js/styles/github-dark.css";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = memo(({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`group relative px-4 py-6 ${
        isUser
          ? "bg-[var(--background)]"
          : "bg-[var(--input)] border-y border-[var(--border)]"
      }`}
    >
      <div className="max-w-3xl mx-auto flex gap-4">
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center ${
            isUser
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--success)] text-white"
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5" />
          ) : (
            <Bot className="w-5 h-5" />
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Role Label */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              {isUser ? "You" : "Assistant"}
            </span>
            {message.isStreaming && (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                <span className="animate-pulse">●</span>
                Typing...
              </span>
            )}
          </div>

          {/* Message Text with Markdown */}
          <div className="prose prose-sm max-w-none dark:prose-invert prose-pre:bg-[var(--secondary)] prose-pre:border prose-pre:border-[var(--border)] prose-code:text-[var(--primary)] prose-code:bg-[var(--input)] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // Custom code block styling
                code({ node, className, children, ...props }: any) {
                  const inline = !className;
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";

                  if (!inline && language) {
                    return (
                      <div className="relative group/code">
                        {/* Language label */}
                        <div className="absolute top-2 right-2 text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded opacity-0 group-hover/code:opacity-100 transition-opacity">
                          {language}
                        </div>
                        <pre className={className}>
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  }

                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                // Custom link styling
                a({ node, children, ...props }: any) {
                  return (
                    <a
                      {...props}
                      className="text-[var(--primary)] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  );
                },
                // Custom table styling
                table({ node, children, ...props }: any) {
                  return (
                    <div className="overflow-x-auto">
                      <table
                        className="min-w-full border-collapse border border-[var(--border)]"
                        {...props}
                      >
                        {children}
                      </table>
                    </div>
                  );
                },
                th({ node, children, ...props }: any) {
                  return (
                    <th
                      className="border border-[var(--border)] bg-[var(--input)] px-4 py-2 text-left font-semibold"
                      {...props}
                    >
                      {children}
                    </th>
                  );
                },
                td({ node, children, ...props }: any) {
                  return (
                    <td
                      className="border border-[var(--border)] px-4 py-2"
                      {...props}
                    >
                      {children}
                    </td>
                  );
                },
                // Custom blockquote styling
                blockquote({ node, children, ...props }: any) {
                  return (
                    <blockquote
                      className="border-l-4 border-[var(--primary)] pl-4 italic text-[var(--muted)]"
                      {...props}
                    >
                      {children}
                    </blockquote>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Timestamp */}
          <div className="text-xs text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
