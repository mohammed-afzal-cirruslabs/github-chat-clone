"use client";

import { useState, useEffect, memo } from "react";
import ChatMessage from "./ChatMessage";
import type { Message } from "@/types/message";

interface StreamingMessageProps {
  message: Message;
  streamingSpeed?: number; // characters per interval
}

const StreamingMessage = memo(
  ({ message, streamingSpeed = 10 }: StreamingMessageProps) => {
    const [displayedContent, setDisplayedContent] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      if (!message.isStreaming) {
        setDisplayedContent(message.content);
        setIsComplete(true);
        return;
      }

      let currentIndex = 0;
      const fullContent = message.content;

      const interval = setInterval(() => {
        if (currentIndex < fullContent.length) {
          currentIndex += streamingSpeed;
          setDisplayedContent(fullContent.slice(0, currentIndex));
        } else {
          setDisplayedContent(fullContent);
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 50); // Update every 50ms

      return () => clearInterval(interval);
    }, [message.content, message.isStreaming, streamingSpeed]);

    return (
      <ChatMessage
        message={{
          ...message,
          content: displayedContent,
          isStreaming: !isComplete && message.isStreaming,
        }}
      />
    );
  }
);

StreamingMessage.displayName = "StreamingMessage";

export default StreamingMessage;
