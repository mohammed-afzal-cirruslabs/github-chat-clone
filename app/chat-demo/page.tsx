"use client";

import { useState, useEffect } from "react";
import ChatInterface from "@/components/chat/ChatInterface";
import type { Message } from "@/types/message";

// Mock messages generator (called client-side to avoid hydration mismatch)
const getInitialMessages = (): Message[] => [
  {
    id: "1",
    role: "user",
    content: "Can you explain how React hooks work?",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    role: "assistant",
    content: `React Hooks are functions that let you "hook into" React state and lifecycle features from function components. Here are the most commonly used hooks:

## useState
The \`useState\` hook lets you add state to functional components:

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## useEffect
The \`useEffect\` hook lets you perform side effects in function components:

\`\`\`javascript
import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array means run once on mount
  
  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
\`\`\`

## Key Rules
1. **Only call hooks at the top level** - Don't call them inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call them from React function components or custom hooks

> **Note**: Hooks were introduced in React 16.8 and have become the standard way to write React components.

Would you like me to explain any specific hook in more detail?`,
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: "3",
    role: "user",
    content: "Yes, can you show me a more complex example with useEffect?",
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: "4",
    role: "assistant",
    content: `Sure! Here's a more complex example that demonstrates **cleanup**, **dependencies**, and **conditional effects**:

\`\`\`typescript
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This flag prevents setting state after unmount
    let isMounted = true;
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(\`https://api.example.com/users/\${userId}\`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const data = await response.json();
        
        // Only update state if component is still mounted
        if (isMounted) {
          setUser(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup function - runs when component unmounts or userId changes
    return () => {
      isMounted = false;
    };
  }, [userId]); // Re-run effect when userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

### Key Points:

| Feature | Purpose |
|---------|---------|
| **isMounted flag** | Prevents state updates after component unmounts |
| **Cleanup function** | Cancels pending operations when effect re-runs or component unmounts |
| **Dependency array** | \`[userId]\` means effect re-runs when userId changes |
| **Error handling** | Catches and displays fetch errors gracefully |

### Common Patterns:

1. **Subscriptions**: Use cleanup to unsubscribe
2. **Timers**: Use cleanup to clear intervals/timeouts
3. **Event listeners**: Use cleanup to remove listeners
4. **Async operations**: Use flags to prevent state updates after unmount

This pattern is essential for preventing **memory leaks** and **race conditions** in React applications!`,
    timestamp: new Date(Date.now() - 120000),
  },
];

export default function ChatDemoPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize messages client-side to avoid hydration mismatch
  useEffect(() => {
    setMessages(getInitialMessages());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-[var(--muted)]">Loading...</div>
      </div>
    );
  }

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response with streaming
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Thank you for your message! You said: "${content}"\n\nThis is a demo response. In a real application, this would be connected to an AI API like OpenAI's GPT-4.\n\nHere's some **formatted text** with *markdown* support:\n\n- Bullet point 1\n- Bullet point 2\n- Bullet point 3\n\nAnd here's a code example:\n\n\`\`\`javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n\`\`\`\n\nPretty cool, right?`,
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);

      // Stop streaming after 3 seconds
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, isStreaming: false }
              : msg
          )
        );
      }, 3000);
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--background)] px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-lg font-semibold">Chat Interface Demo</h1>
          <p className="text-sm text-[var(--muted)]">
            ChatGPT-style message display with markdown and syntax highlighting
          </p>
        </div>
      </header>

      {/* Chat Interface */}
      <ChatInterface
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
