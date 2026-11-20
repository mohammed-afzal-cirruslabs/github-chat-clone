"use client";

import { useState } from "react";
import ChatGPTSidebar from "@/components/chat/ChatGPTSidebar";
import { ChatGroup, UserProfile } from "@/types/chatgpt";

export default function ChatGPTDemoPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentChatId, setCurrentChatId] = useState("chat-1");

  // Mock data
  const mockUser: UserProfile = {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    plan: "plus",
  };

  const mockChatGroups: ChatGroup[] = [
    {
      label: "Today",
      sessions: [
        {
          id: "chat-1",
          title: "Build a React component",
          timestamp: new Date(),
          preview: "How do I create a reusable button...",
        },
        {
          id: "chat-2",
          title: "TypeScript best practices",
          timestamp: new Date(),
          preview: "What are the best practices for...",
          isPinned: true,
        },
      ],
    },
    {
      label: "Yesterday",
      sessions: [
        {
          id: "chat-3",
          title: "Next.js routing explained",
          timestamp: new Date(Date.now() - 86400000),
          preview: "Can you explain how routing works...",
        },
        {
          id: "chat-4",
          title: "CSS Grid vs Flexbox",
          timestamp: new Date(Date.now() - 86400000),
        },
      ],
    },
    {
      label: "Previous 7 Days",
      sessions: [
        {
          id: "chat-5",
          title: "API design patterns",
          timestamp: new Date(Date.now() - 172800000),
          preview: "What are common REST API patterns...",
        },
        {
          id: "chat-6",
          title: "Database optimization tips",
          timestamp: new Date(Date.now() - 259200000),
        },
        {
          id: "chat-7",
          title: "Authentication strategies",
          timestamp: new Date(Date.now() - 345600000),
          preview: "JWT vs session-based auth...",
        },
      ],
    },
    {
      label: "Previous 30 Days",
      sessions: [
        {
          id: "chat-8",
          title: "Docker containerization guide",
          timestamp: new Date(Date.now() - 432000000),
        },
        {
          id: "chat-9",
          title: "Git workflow strategies",
          timestamp: new Date(Date.now() - 518400000),
          preview: "What's the difference between...",
        },
        {
          id: "chat-10",
          title: "Testing React components",
          timestamp: new Date(Date.now() - 604800000),
        },
      ],
    },
  ];

  const handleNewChat = () => {
    console.log("New chat clicked");
    // In a real app, this would create a new chat session
  };

  const handleSelectChat = (chatId: string) => {
    console.log("Selected chat:", chatId);
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = (chatId: string) => {
    console.log("Delete chat:", chatId);
    // In a real app, this would delete the chat
  };

  const handleArchiveChat = (chatId: string) => {
    console.log("Archive chat:", chatId);
    // In a real app, this would archive the chat
  };

  const handlePinChat = (chatId: string) => {
    console.log("Pin/unpin chat:", chatId);
    // In a real app, this would toggle the pin status
  };

  return (
    <div className="flex h-screen">
      <ChatGPTSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        chatGroups={mockChatGroups}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onArchiveChat={handleArchiveChat}
        onPinChat={handlePinChat}
        user={mockUser}
      />

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl font-bold">ChatGPT Sidebar Demo</h1>
          <p className="text-lg text-[var(--muted)]">
            This is a demonstration of the ChatGPT-style collapsible sidebar
            navigation component.
          </p>
          <div className="space-y-4 text-left bg-[var(--input)] p-6 rounded-lg border">
            <h2 className="text-xl font-semibold">Features:</h2>
            <ul className="space-y-2 text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>Collapsible sidebar with smooth animations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>New chat button prominently placed at the top</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>Search functionality for finding past chats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>
                  Chat history grouped by time (Today, Yesterday, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>
                  Context menu for each chat (Pin, Archive, Delete)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>User menu at the bottom with profile and settings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>Active chat highlighting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>Hover states and smooth transitions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>Light and dark theme support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary)]">✓</span>
                <span>Keyboard accessible</span>
              </li>
            </ul>
          </div>
          <div className="text-sm text-[var(--muted)]">
            <p>
              Try clicking the sidebar toggle button, selecting different chats,
              and hovering over chat items to see the context menu.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
