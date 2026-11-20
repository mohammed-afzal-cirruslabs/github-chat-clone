# Chat Interface Documentation

## Overview

The chat interface is the central component of the GitHub Chat Clone application, providing a ChatGPT-style message display with markdown rendering, code syntax highlighting, and streaming text effects.

## Components

### ChatMessage

**Location**: `components/chat/ChatMessage.tsx`

Individual message bubble component that displays a single message with proper styling based on the role (user or assistant).

#### Props

```typescript
interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
```

#### Features

- **Role-based styling**: User messages (right-aligned, blue) vs Assistant messages (left-aligned, gray)
- **Markdown rendering**: Full GitHub Flavored Markdown support
- **Code syntax highlighting**: Automatic language detection with highlight.js
- **Timestamps**: Formatted time display for each message
- **Streaming effect**: Optional animated text reveal for assistant messages
- **Theme support**: Automatic light/dark theme switching

#### Markdown Support

The component supports:
- **Headings**: `# H1` through `###### H6`
- **Lists**: Ordered and unordered lists
- **Tables**: GitHub-style tables with alignment
- **Code blocks**: Syntax-highlighted code with language detection
- **Inline code**: Monospace inline code
- **Links**: Clickable hyperlinks
- **Bold/Italic**: Text formatting
- **Blockquotes**: Quote blocks
- **Strikethrough**: `~~text~~`
- **Task lists**: `- [ ]` and `- [x]`
- **HTML**: Raw HTML rendering (sanitized)

#### Code Highlighting

Supports 190+ languages including:
- JavaScript/TypeScript
- Python
- Java
- C/C++
- Go
- Rust
- Ruby
- PHP
- SQL
- HTML/CSS
- Bash/Shell
- And many more...

### ChatInterface

**Location**: `components/chat/ChatInterface.tsx`

Full chat interface component that manages the message list, input field, and user interactions.

#### Props

```typescript
interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}
```

#### Features

- **Message list**: Scrollable container with all messages
- **Auto-scroll**: Automatically scrolls to latest message
- **Input field**: Multi-line textarea with auto-resize
- **Send button**: Disabled during loading state
- **Loading indicator**: Shows when waiting for response
- **Keyboard shortcuts**: Enter to send, Shift+Enter for new line
- **Empty state**: Placeholder when no messages exist

#### Layout

```
┌─────────────────────────────────────┐
│  Message List (scrollable)          │
│  ┌───────────────────────────────┐  │
│  │ User Message                  │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ Assistant Message             │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ User Message                  │  │
│  └───────────────────────────────┘  │
├─────────────────────────────────────┤
│  Input Area                         │
│  ┌───────────────────────────────┐  │
│  │ Type your message...          │  │
│  └───────────────────────────────┘  │
│                          [Send]     │
└─────────────────────────────────────┘
```

## Types

**Location**: `types/message.ts`

```typescript
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
```

## Usage Example

### Basic Usage

```tsx
import { useState } from "react";
import ChatInterface from "@/components/chat/ChatInterface";
import type { Message } from "@/types/message";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate API call
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });
      const data = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        placeholder="Ask me anything..."
      />
    </div>
  );
}
```

### With Streaming

```tsx
const handleSendMessage = async (content: string) => {
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content,
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, userMessage]);

  // Create placeholder for streaming response
  const assistantId = (Date.now() + 1).toString();
  const assistantMessage: Message = {
    id: assistantId,
    role: "assistant",
    content: "",
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, assistantMessage]);

  // Stream response
  const response = await fetch("/api/chat/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: content }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;

    const chunk = decoder.decode(value);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === assistantId
          ? { ...msg, content: msg.content + chunk }
          : msg
      )
    );
  }
};
```

## Styling

### CSS Variables

The components use CSS variables from `app/globals.css`:

```css
:root {
  --background: 255 255 255;
  --foreground: 10 10 10;
  --input: 229 231 235;
  --primary: 37 99 235;
  --muted: 107 114 128;
  --border: 229 231 235;
}

.dark {
  --background: 10 10 10;
  --foreground: 250 250 250;
  --input: 38 38 38;
  --primary: 59 130 246;
  --muted: 156 163 175;
  --border: 38 38 38;
}
```

### Message Bubble Styling

**User messages**:
- Background: `rgb(var(--primary))` (blue)
- Text: White
- Alignment: Right
- Max width: 70%

**Assistant messages**:
- Background: `rgb(var(--input))` (gray)
- Text: `rgb(var(--foreground))`
- Alignment: Left
- Max width: 70%

### Code Block Styling

Code blocks use the `github-dark` theme from highlight.js with custom overrides:

```css
pre code.hljs {
  background: rgb(13 17 23);
  border-radius: 6px;
  padding: 16px;
}

.hljs-keyword { color: #ff7b72; }
.hljs-string { color: #a5d6ff; }
.hljs-function { color: #d2a8ff; }
.hljs-comment { color: #8b949e; }
```

## Dependencies

### Required Packages

```json
{
  "react-markdown": "^10.1.0",
  "remark-gfm": "^4.0.1",
  "rehype-highlight": "^7.0.2",
  "rehype-raw": "^7.0.0",
  "highlight.js": "^11.12.0"
}
```

### Installation

```bash
npm install react-markdown remark-gfm rehype-highlight rehype-raw highlight.js
```

## Accessibility

### Keyboard Navigation

- **Tab**: Navigate between input field and send button
- **Enter**: Send message (when input is focused)
- **Shift+Enter**: New line in message
- **Escape**: Clear input (optional implementation)

### ARIA Labels

- Input field: `aria-label="Message input"`
- Send button: `aria-label="Send message"`
- Message list: `role="log"` with `aria-live="polite"`

### Screen Reader Support

- Messages announce role and timestamp
- Loading state announces "Sending message..."
- New messages announce automatically

### Focus Management

- Focus returns to input after sending
- Visible focus rings on all interactive elements
- Skip to input link for keyboard users

## Performance

### Optimizations

1. **Memoization**: Message components memoized with `React.memo`
2. **Virtual scrolling**: Consider for 100+ messages
3. **Lazy loading**: Code highlighting loaded on demand
4. **Debouncing**: Input changes debounced for auto-save
5. **Message batching**: Multiple messages rendered in single pass

### Bundle Size

- react-markdown: ~50KB
- highlight.js: ~80KB (full), ~5KB per language
- Total overhead: ~130KB gzipped

### Recommendations

- Use dynamic imports for highlight.js languages
- Implement virtual scrolling for long conversations
- Cache rendered markdown for repeated messages
- Use Web Workers for heavy markdown parsing

## Testing

### Unit Tests

```typescript
import { render, screen } from "@testing-library/react";
import ChatMessage from "@/components/chat/ChatMessage";

test("renders user message", () => {
  const message = {
    id: "1",
    role: "user" as const,
    content: "Hello",
    timestamp: new Date(),
  };

  render(<ChatMessage message={message} />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByText("You")).toBeInTheDocument();
});

test("renders markdown", () => {
  const message = {
    id: "1",
    role: "assistant" as const,
    content: "# Heading\n\n**Bold text**",
    timestamp: new Date(),
  };

  render(<ChatMessage message={message} />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Heading");
  expect(screen.getByText("Bold text")).toHaveStyle({ fontWeight: "700" });
});
```

### Integration Tests

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import ChatInterface from "@/components/chat/ChatInterface";

test("sends message on button click", () => {
  const onSendMessage = jest.fn();
  render(<ChatInterface messages={[]} onSendMessage={onSendMessage} />);

  const input = screen.getByPlaceholderText("Type your message...");
  const button = screen.getByText("Send");

  fireEvent.change(input, { target: { value: "Test message" } });
  fireEvent.click(button);

  expect(onSendMessage).toHaveBeenCalledWith("Test message");
});
```

## Troubleshooting

### Common Issues

#### 1. Code highlighting not working

**Problem**: Code blocks show plain text without syntax highlighting

**Solution**: Ensure highlight.js CSS is imported in `app/layout.tsx`:

```tsx
import "highlight.js/styles/github-dark.css";
```

#### 2. Hydration mismatch errors

**Problem**: Console shows hydration warnings

**Solution**: Initialize messages client-side:

```tsx
const [messages, setMessages] = useState<Message[]>([]);

useEffect(() => {
  setMessages(getInitialMessages());
}, []);
```

#### 3. Markdown not rendering

**Problem**: Markdown shows as plain text

**Solution**: Check that `react-markdown` and plugins are installed:

```bash
npm install react-markdown remark-gfm rehype-highlight rehype-raw
```

#### 4. Scroll not working

**Problem**: Messages don't auto-scroll to bottom

**Solution**: Ensure scroll ref is properly set:

```tsx
const scrollRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
```

## Future Enhancements

### Planned Features

1. **Message editing**: Edit sent messages
2. **Message deletion**: Delete individual messages
3. **Copy to clipboard**: Copy message content
4. **Code copy button**: Copy code blocks
5. **Message reactions**: Like/dislike messages
6. **File attachments**: Upload and display files
7. **Voice input**: Speech-to-text
8. **Export chat**: Download conversation as PDF/Markdown
9. **Search messages**: Full-text search
10. **Message threading**: Reply to specific messages

### API Integration

```typescript
// Example API route structure
// app/api/chat/route.ts

export async function POST(request: Request) {
  const { message } = await request.json();

  // Call AI service
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: message }],
  });

  return Response.json({
    response: response.choices[0].message.content,
  });
}
```

### Streaming API

```typescript
// app/api/chat/stream/route.ts

export async function POST(request: Request) {
  const { message } = await request.json();

  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: message }],
    stream: true,
  });

  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    })
  );
}
```

## Resources

- [react-markdown documentation](https://github.com/remarkjs/react-markdown)
- [remark-gfm plugin](https://github.com/remarkjs/remark-gfm)
- [highlight.js documentation](https://highlightjs.org/)
- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)
- [ChatGPT UI patterns](https://chat.openai.com/)

## License

MIT License - See LICENSE file for details
