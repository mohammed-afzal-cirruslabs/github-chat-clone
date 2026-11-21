export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatMessage extends Message {
  // Additional properties for chat messages
  metadata?: {
    model?: string;
    tokens?: number;
    [key: string]: any;
  };
}
