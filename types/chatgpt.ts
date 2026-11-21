export interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  preview?: string;
  isPinned?: boolean;
}

export interface ChatGroup {
  label: string;
  sessions: ChatSession[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan?: "free" | "plus" | "team" | "enterprise";
}
