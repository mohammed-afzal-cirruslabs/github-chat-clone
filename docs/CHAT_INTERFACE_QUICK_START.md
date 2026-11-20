# Chat Interface Quick Start Guide

## 🚀 Getting Started

### View the Demo

```bash
npm run dev
# Visit http://localhost:3000/chat-demo
```

### Basic Integration

```tsx
import ChatInterface from "@/components/chat/ChatInterface";
import type { Message } from "@/types/message";

const [messages, setMessages] = useState<Message[]>([]);

<ChatInterface
  messages={messages}
  onSendMessage={(content) => {
    // Handle message send
  }}
/>
```

## 📦 Components

### ChatInterface

Full chat UI with message list and input field.

```tsx
<ChatInterface
  messages={messages}           // Array of Message objects
  onSendMessage={handleSend}    // Callback when user sends message
  isLoading={false}             // Optional: show loading state
  placeholder="Type here..."    // Optional: input placeholder
/>
```

### ChatMessage

Individual message bubble (used internally by ChatInterface).

```tsx
<ChatMessage
  message={message}             // Message object
  isStreaming={false}           // Optional: animate text reveal
/>
```

## 🎨 Message Format

```typescript
interface Message {
  id: string;                   // Unique identifier
  role: "user" | "assistant";   // Who sent the message
  content: string;              // Message text (supports markdown)
  timestamp: Date;              // When it was sent
}
```

## ✨ Features

### Markdown Support

```markdown
# Heading
**Bold** and *italic*
- List items
1. Numbered lists
`inline code`
```js
code blocks
```
[Links](url)
> Blockquotes
| Tables | Work |
|--------|------|
| Yes    | ✓    |
```

### Code Highlighting

Automatically highlights 190+ languages:

````markdown
```javascript
const hello = "world";
```

```typescript
interface User {
  name: string;
}
```

```python
def hello():
    print("world")
```
````

### Streaming Effect

```tsx
// Add message with empty content
const newMessage: Message = {
  id: "123",
  role: "assistant",
  content: "",
  timestamp: new Date(),
};
setMessages([...messages, newMessage]);

// Update content progressively
setMessages(messages.map(msg =>
  msg.id === "123"
    ? { ...msg, content: msg.content + chunk }
    : msg
));
```

## 🎯 Common Patterns

### Send Message

```tsx
const handleSendMessage = (content: string) => {
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content,
    timestamp: new Date(),
  };
  setMessages([...messages, userMessage]);

  // Call your API here
  fetchResponse(content).then(response => {
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMessage]);
  });
};
```

### Clear Chat

```tsx
const clearChat = () => {
  setMessages([]);
};
```

### Load History

```tsx
useEffect(() => {
  fetch("/api/chat/history")
    .then(res => res.json())
    .then(data => setMessages(data.messages));
}, []);
```

### Save Messages

```tsx
useEffect(() => {
  localStorage.setItem("chat-messages", JSON.stringify(messages));
}, [messages]);
```

## 🎨 Styling

### CSS Variables

Customize colors in `app/globals.css`:

```css
:root {
  --background: 255 255 255;
  --foreground: 10 10 10;
  --primary: 37 99 235;
  --muted: 107 114 128;
  --input: 229 231 235;
}
```

### Custom Styles

Override with Tailwind classes:

```tsx
<div className="h-screen bg-gray-50">
  <ChatInterface messages={messages} onSendMessage={handleSend} />
</div>
```

## 🔧 Configuration

### Change Placeholder

```tsx
<ChatInterface
  messages={messages}
  onSendMessage={handleSend}
  placeholder="Ask me anything..."
/>
```

### Disable Input

```tsx
<ChatInterface
  messages={messages}
  onSendMessage={handleSend}
  isLoading={true}  // Disables input and shows loading
/>
```

### Custom Height

```tsx
<div className="h-[600px]">
  <ChatInterface messages={messages} onSendMessage={handleSend} />
</div>
```

## 📱 Responsive Design

The interface automatically adapts to screen size:

- **Desktop**: Full width with max 70% message bubbles
- **Tablet**: Adjusted spacing
- **Mobile**: Single column, touch-friendly

No additional configuration needed!

## ♿ Accessibility

Built-in features:

- ✅ Keyboard navigation (Tab, Enter, Shift+Enter)
- ✅ ARIA labels on all interactive elements
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Semantic HTML

## 🐛 Troubleshooting

### Code not highlighting?

Import highlight.js CSS in `app/layout.tsx`:

```tsx
import "highlight.js/styles/github-dark.css";
```

### Hydration errors?

Initialize messages client-side:

```tsx
const [messages, setMessages] = useState<Message[]>([]);

useEffect(() => {
  setMessages(loadMessages());
}, []);
```

### Messages not scrolling?

The component handles auto-scroll automatically. If it's not working, check that the parent container has a fixed height:

```tsx
<div className="h-screen">
  <ChatInterface ... />
</div>
```

## 📚 Examples

### With API Integration

```tsx
const handleSendMessage = async (content: string) => {
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content,
    timestamp: new Date(),
  };
  setMessages([...messages, userMessage]);

  setIsLoading(true);
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: content }),
    });
    const data = await response.json();

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: data.response,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMessage]);
  } finally {
    setIsLoading(false);
  }
};
```

### With Local Storage

```tsx
const STORAGE_KEY = "chat-messages";

const [messages, setMessages] = useState<Message[]>([]);

// Load on mount
useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);

// Save on change
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}, [messages]);
```

### With Streaming

```tsx
const handleSendMessage = async (content: string) => {
  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content,
    timestamp: new Date(),
  };
  setMessages([...messages, userMessage]);

  // Create streaming message
  const streamId = (Date.now() + 1).toString();
  const streamMessage: Message = {
    id: streamId,
    role: "assistant",
    content: "",
    timestamp: new Date(),
  };
  setMessages(prev => [...prev, streamMessage]);

  // Stream response
  const response = await fetch("/api/chat/stream", {
    method: "POST",
    body: JSON.stringify({ message: content }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;

    const chunk = decoder.decode(value);
    setMessages(prev =>
      prev.map(msg =>
        msg.id === streamId
          ? { ...msg, content: msg.content + chunk }
          : msg
      )
    );
  }
};
```

## 🔗 Related Files

- **Components**: `components/chat/ChatInterface.tsx`, `components/chat/ChatMessage.tsx`
- **Types**: `types/message.ts`
- **Demo**: `app/chat-demo/page.tsx`
- **Docs**: `docs/CHAT_INTERFACE.md`

## 📖 Full Documentation

For detailed documentation, see:
- [CHAT_INTERFACE.md](./CHAT_INTERFACE.md) - Complete component documentation
- [CHAT_INTERFACE_VISUAL_VERIFICATION.md](./CHAT_INTERFACE_VISUAL_VERIFICATION.md) - Visual testing proof

## 🎉 That's It!

You're ready to build chat interfaces. Start with the demo at `/chat-demo` and customize from there.

**Questions?** Check the full documentation or the demo page source code.
