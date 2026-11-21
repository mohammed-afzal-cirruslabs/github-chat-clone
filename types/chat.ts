export interface Message {
  id: string;
  content: string;
  author: string;
  authorId: string;
  timestamp: Date;
  edited?: boolean;
  reactions?: Reaction[];
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  memberCount: number;
  unreadCount?: number;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  status: "online" | "away" | "offline";
}
