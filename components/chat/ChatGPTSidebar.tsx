"use client";

import { useState } from "react";
import {
  PanelLeft,
  Plus,
  MessageSquare,
  Search,
  MoreHorizontal,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Trash2,
  Archive,
  Pin,
} from "lucide-react";
import { ChatSession, ChatGroup, UserProfile } from "@/types/chatgpt";

interface ChatGPTSidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  chatGroups?: ChatGroup[];
  currentChatId?: string;
  onNewChat?: () => void;
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  onArchiveChat?: (chatId: string) => void;
  onPinChat?: (chatId: string) => void;
  user?: UserProfile;
}

export default function ChatGPTSidebar({
  className = "",
  isCollapsed = false,
  onToggleCollapse,
  chatGroups = [],
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onArchiveChat,
  onPinChat,
  user,
}: ChatGPTSidebarProps) {
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState<string | null>(null);

  if (isCollapsed) {
    return (
      <aside
        className={`w-16 border-r bg-[var(--input)] flex flex-col items-center py-4 transition-all duration-300 ${className}`}
      >
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-[var(--secondary-hover)] transition-colors mb-4"
          aria-label="Expand sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNewChat}
          className="p-2 rounded-lg hover:bg-[var(--secondary-hover)] transition-colors"
          aria-label="New chat"
        >
          <Plus className="w-5 h-5" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      className={`w-64 border-r bg-[var(--input)] flex flex-col transition-all duration-300 ${className}`}
    >
      {/* Header with collapse and new chat */}
      <div className="flex items-center gap-2 p-3 border-b">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-[var(--secondary-hover)] transition-colors"
          aria-label="Collapse sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNewChat}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[var(--background)] hover:bg-[var(--secondary-hover)] transition-colors border"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[var(--background)] border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>
      </div>

      {/* Chat history */}
      <nav className="flex-1 overflow-y-auto p-2">
        {chatGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <MessageSquare className="w-12 h-12 text-[var(--muted)] mb-3" />
            <p className="text-sm text-[var(--muted)]">
              No chats yet. Start a new conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-xs font-semibold text-[var(--muted)] px-3 mb-2 uppercase tracking-wide">
                  {group.label}
                </h3>
                <div className="space-y-1">
                  {group.sessions.map((chat) => (
                    <div
                      key={chat.id}
                      className="relative"
                      onMouseEnter={() => setHoveredChatId(chat.id)}
                      onMouseLeave={() => setHoveredChatId(null)}
                    >
                      <button
                        onClick={() => onSelectChat?.(chat.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors group ${
                          currentChatId === chat.id
                            ? "bg-[var(--background)] border"
                            : "hover:bg-[var(--secondary-hover)]"
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 flex-shrink-0 text-[var(--muted)]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {chat.title}
                          </p>
                          {chat.preview && (
                            <p className="text-xs text-[var(--muted)] truncate">
                              {chat.preview}
                            </p>
                          )}
                        </div>
                        {chat.isPinned && (
                          <Pin className="w-3 h-3 text-[var(--muted)] flex-shrink-0" />
                        )}
                        {hoveredChatId === chat.id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowChatMenu(
                                showChatMenu === chat.id ? null : chat.id
                              );
                            }}
                            className="p-1 rounded hover:bg-[var(--secondary-hover)] flex-shrink-0"
                            aria-label="Chat options"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        )}
                      </button>

                      {/* Chat context menu */}
                      {showChatMenu === chat.id && (
                        <div className="absolute right-2 top-full mt-1 w-48 bg-[var(--background)] border rounded-lg shadow-lg z-10 py-1">
                          <button
                            onClick={() => {
                              onPinChat?.(chat.id);
                              setShowChatMenu(null);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-[var(--secondary-hover)] transition-colors"
                          >
                            <Pin className="w-4 h-4" />
                            {chat.isPinned ? "Unpin" : "Pin"}
                          </button>
                          <button
                            onClick={() => {
                              onArchiveChat?.(chat.id);
                              setShowChatMenu(null);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-[var(--secondary-hover)] transition-colors"
                          >
                            <Archive className="w-4 h-4" />
                            Archive
                          </button>
                          <div className="border-t my-1" />
                          <button
                            onClick={() => {
                              onDeleteChat?.(chat.id);
                              setShowChatMenu(null);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--destructive)] hover:bg-[var(--secondary-hover)] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* User menu at bottom */}
      <div className="border-t p-2">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--secondary-hover)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium truncate">
                {user?.name || "User"}
              </p>
              {user?.plan && (
                <p className="text-xs text-[var(--muted)] capitalize">
                  {user.plan}
                </p>
              )}
            </div>
            <ChevronDown
              className={`w-4 h-4 text-[var(--muted)] transition-transform ${
                showUserMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute bottom-full left-2 right-2 mb-2 bg-[var(--background)] border rounded-lg shadow-lg py-1">
              <button
                onClick={() => setShowUserMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-[var(--secondary-hover)] transition-colors"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => setShowUserMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-[var(--secondary-hover)] transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <div className="border-t my-1" />
              <button
                onClick={() => setShowUserMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--destructive)] hover:bg-[var(--secondary-hover)] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
