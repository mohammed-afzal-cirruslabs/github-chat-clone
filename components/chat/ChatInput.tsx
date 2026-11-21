"use client";

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onAttachment?: (file: File) => void;
  isLoading?: boolean;
  placeholder?: string;
  maxLength?: number;
  showTokenCount?: boolean;
}

export default function ChatInput({
  onSendMessage,
  onAttachment,
  isLoading = false,
  placeholder = "Message ChatGPT...",
  maxLength = 4000,
  showTokenCount = true,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  // Estimate token count (rough approximation: ~4 chars per token)
  const estimatedTokens = Math.ceil(charCount / 4);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
      setCharCount(newValue.length);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (trimmedValue && !isLoading) {
      onSendMessage(trimmedValue);
      setValue("");
      setCharCount(0);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAttachment) {
      onAttachment(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isOverLimit = charCount > maxLength * 0.9; // Warning at 90%
  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <div className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Input Container */}
        <div className="relative">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--input)] px-4 py-3 pr-24 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{
              minHeight: "52px",
              maxHeight: "200px",
            }}
            aria-label="Message input"
          />

          {/* Button Container */}
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            {/* Attachment Button */}
            {onAttachment && (
              <>
                <button
                  type="button"
                  onClick={handleAttachmentClick}
                  disabled={isLoading}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Attach file"
                  title="Attach file"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-hidden="true"
                />
              </>
            )}

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSend}
              className={`p-2 rounded-lg transition-all ${
                canSend
                  ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                  : "bg-[var(--secondary)] text-[var(--muted)] cursor-not-allowed"
              }`}
              aria-label="Send message"
              title="Send message (Enter)"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 px-1">
          {/* Character/Token Count */}
          {showTokenCount && charCount > 0 && (
            <div
              className={`text-xs transition-colors ${
                isOverLimit ? "text-[var(--warning)]" : "text-[var(--muted)]"
              }`}
            >
              {charCount} / {maxLength} characters (~{estimatedTokens} tokens)
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-[var(--muted)] ml-auto">
            ChatGPT can make mistakes. Check important info.
          </p>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="text-xs text-[var(--muted)] text-center mt-1">
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--secondary)] border border-[var(--border)] font-mono text-xs">
            Enter
          </kbd>{" "}
          to send,{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--secondary)] border border-[var(--border)] font-mono text-xs">
            Shift
          </kbd>
          {" + "}
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--secondary)] border border-[var(--border)] font-mono text-xs">
            Enter
          </kbd>{" "}
          for new line
        </div>
      </div>
    </div>
  );
}
