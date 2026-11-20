# Chat Interface Documentation

## Overview

The Chat Interface is a ChatGPT-style message display system with full markdown rendering, syntax highlighting, and streaming text effects. It provides a modern, accessible chat experience matching ChatGPT's design patterns.

## Components

### 1. ChatMessage (`components/chat/ChatMessage.tsx`)

The core message component that renders individual messages with full markdown support.

**Features:**
- ✅ User and Assistant message styling
- ✅ Avatar icons (User/Bot)
- ✅ Markdown rendering with GitHub Flavored Markdown (GFM)
- ✅ Syntax highlighting for code blocks
- ✅ Custom styling for tables, links, blockquotes
- ✅ Language labels on code blocks
- ✅ Streaming indicator
- ✅ Timestamp on hover

**Props:**
```typescript
interface ChatMessageProps {
  message: Message;
}
```

**Message Type:**
```typescript
interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}
```

**Styling:**
- User messages: White background
- Assistant messages: Light gray background with border
- Avatars: User (blue), Assistant (green)
- Code blocks: Syntax highlighted with language label
- Inline code: Highlighted with background
- Links: Blue, open in new tab
- Tables: Bordered with header styling
- Blockquotes: Left border with italic text

### 2. StreamingMessage (`components/chat/StreamingMessage.tsx`)

Wrapper component that adds streaming text effect to messages.

**Features:**
- ✅ Character-by-character reveal
- ✅ Configurable streaming speed
- ✅ Typing indicator
- ✅ Smooth animation

**Props:**
```typescript
interface StreamingMessageProps {
  message: Message;
  streamingSpeed?: number; // characters per interval (default: 10)
}
```

**How it works:**
1. Takes a message with `isStreaming: true`
2. Reveals content progressively (10 chars every 50ms by default)
3. Shows "Typing..." indicator while streaming
4. Automatically stops when complete

### 3. ChatInterface (`components/chat/ChatInterface.tsx`)

The main chat interface component that combines messages, input, and empty state.

**Features:**
- ✅ Message list with auto-scroll
- ✅ Empty state with welcome message
- ✅ Message input with send button
- ✅ Enter to send, Shift+Enter for new line
- ✅ Loading state
- ✅ Disabled state during processing

**Props:**
```typescript
interface ChatInterfaceProps {
  messages: Message[];
  isLoading?: boolean;
  onSendMessage?: (content: string) => void;
}
```

**Layout:**
```
┌─────────────────────────────────────┐
│         Messages Area               │
│  ┌───────────────────────────────┐  │
│  │ User Message                  │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ Assistant Message             │  │
│  │ - Markdown rendered           │  │
│  │ - Code highlighted            │  │
│  └───────────────────────────────┘  │
│         (auto-scrolls)              │
├─────────────────────────────────────┤
│         Input Area                  │
│  ┌───────────────────────────────┐  │
│  │ Message ChatGPT...        [→] │  │
│  └───────────────────────────────┘  │
│  ChatGPT can make mistakes...       │
└─────────────────────────────────────┘
```

## Dependencies

### Installed Packages

```json
{
  "react-markdown": "^9.0.1",
  "remark-gfm": "^4.0.0",
  "rehype-highlight": "^7.0.0",
  "rehype-raw": "^7.0.0",
  "highlight.js": "^11.10.0"
}
```

### What Each Does

| Package | Purpose |
|---------|---------|
| `react-markdown` | Core markdown rendering for React |
| `remark-gfm` | GitHub Flavored Markdown support (tables, strikethrough, task lists) |
| `rehype-highlight` | Syntax highlighting for code blocks |
| `rehype-raw` | Allow raw HTML in markdown (use carefully) |
| `highlight.js` | Syntax highlighting library with 190+ languages |

## Markdown Features

### Supported Syntax

#### Text Formatting
```markdown
**bold text**
*italic text*
~~strikethrough~~
`inline code`
```

#### Headings
```markdown
# H1
## H2
### H3
```

#### Lists
```markdown
- Unordered item
- Another item

1. Ordered item
2. Another item

- [ ] Task list item
- [x] Completed task
```

#### Links
```markdown
[Link text](https://example.com)
```

#### Code Blocks
````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

#### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

#### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

### Syntax Highlighting

Supports 190+ languages including:
- JavaScript/TypeScript
- Python
- Java
- C/C++/C#
- Go
- Rust
- Ruby
- PHP
- HTML/CSS
- SQL
- Bash/Shell
- And many more...

**Usage:**
````markdown
```typescript
interface User {
  id: number;
  name: string;
}
```
````

## Usage Examples

### Basic Usage

```tsx
import ChatInterface from "@/components/chat/ChatInterface";
import type { Message } from "@/types/message";

function MyChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  
  const handleSend = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };
  
  return (
    <ChatInterface
      messages={messages}
      onSendMessage={handleSend}
    />
  );
}
```

### With Streaming

```tsx
const handleSend = (content: string) => {
  // Add user message
  const userMsg: Message = {
    id: Date.now().toString(),
    role: "user",
    content,
    timestamp: new Date(),
  };
  setMessages([...messages, userMsg]);
  
  // Simulate AI response
  setTimeout(() => {
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "AI response here...",
      timestamp: new Date(),
      isStreaming: true, // Enable streaming
    };
    setMessages(prev => [...prev, aiMsg]);
    
    // Stop streaming after complete
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMsg.id
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
    }, 3000);
  }, 1000);
};
```

### Individual Message Component

```tsx
import ChatMessage from "@/components/chat/ChatMessage";

<ChatMessage
  message={{
    id: "1",
    role: "assistant",
    content: "Hello! How can I help you?",
    timestamp: new Date(),
  }}
/>
```

### Streaming Message Component

```tsx
import StreamingMessage from "@/components/chat/StreamingMessage";

<StreamingMessage
  message={{
    id: "1",
    role: "assistant",
    content: "This text will appear character by character...",
    timestamp: new Date(),
    isStreaming: true,
  }}
  streamingSpeed={15} // Optional: chars per interval
/>
```

## Styling

### Design System

The components use CSS variables from `globals.css`:

```css
--background: #ffffff (light) / #0d1117 (dark)
--foreground: #1f2328 (light) / #e6edf3 (dark)
--muted: #656d76 (light) / #7d8590 (dark)
--border: #d1d9e0 (light) / #30363d (dark)
--input: #f6f8fa (light) / #161b22 (dark)
--primary: #0969da (light) / #2f81f7 (dark)
--success: #1a7f37 (light) / #3fb950 (dark)
```

### Custom Styling

Override styles using Tailwind classes:

```tsx
<ChatInterface
  messages={messages}
  className="custom-class"
/>
```

Or use CSS:

```css
.chat-message {
  /* Custom styles */
}
```

## Accessibility

### Keyboard Navigation
- ✅ Tab to navigate between elements
- ✅ Enter to send message
- ✅ Shift+Enter for new line in textarea

### Screen Readers
- ✅ Semantic HTML (`<article>`, `<button>`, `<textarea>`)
- ✅ ARIA labels on interactive elements
- ✅ Alt text on icons
- ✅ Proper heading hierarchy

### Focus Management
- ✅ Visible focus rings (2px primary color)
- ✅ Focus trap in input area
- ✅ Auto-scroll to new messages

### Color Contrast
- ✅ WCAG AA compliant (4.5:1 minimum)
- ✅ Dark mode support
- ✅ High contrast for important elements

## Performance

### Optimizations

1. **Memoization**: `ChatMessage` uses `React.memo` to prevent unnecessary re-renders
2. **Lazy Loading**: Messages render only when visible (via browser's native scrolling)
3. **Efficient Streaming**: Uses intervals instead of recursive setTimeout
4. **Code Splitting**: Markdown libraries loaded only when needed

### Best Practices

```tsx
// ✅ Good: Memoize messages array
const messages = useMemo(() => [...], [dependencies]);

// ✅ Good: Debounce input
const debouncedSend = useMemo(
  () => debounce(handleSend, 300),
  []
);

// ❌ Bad: Creating new array on every render
<ChatInterface messages={[...messages]} />
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/react';
import ChatMessage from '@/components/chat/ChatMessage';

test('renders user message', () => {
  render(
    <ChatMessage
      message={{
        id: '1',
        role: 'user',
        content: 'Hello',
        timestamp: new Date(),
      }}
    />
  );
  
  expect(screen.getByText('You')).toBeInTheDocument();
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### Integration Tests

```tsx
test('sends message on Enter key', async () => {
  const handleSend = jest.fn();
  render(<ChatInterface messages={[]} onSendMessage={handleSend} />);
  
  const input = screen.getByPlaceholderText('Message ChatGPT...');
  await userEvent.type(input, 'Test message{Enter}');
  
  expect(handleSend).toHaveBeenCalledWith('Test message');
});
```

## Troubleshooting

### Common Issues

#### Code blocks not highlighting
**Problem**: Code appears as plain text
**Solution**: Ensure `highlight.js/styles/github-dark.css` is imported in `globals.css`

#### Markdown not rendering
**Problem**: Markdown shows as raw text
**Solution**: Check that `react-markdown` and plugins are installed

#### Streaming not working
**Problem**: Text appears all at once
**Solution**: Ensure `isStreaming: true` is set on the message

#### Scroll not working
**Problem**: New messages don't auto-scroll
**Solution**: Check that `messagesEndRef` is properly attached

### Debug Mode

Add console logs to track message flow:

```tsx
useEffect(() => {
  console.log('Messages updated:', messages);
}, [messages]);
```

## Future Enhancements

### Planned Features
- [ ] Message editing
- [ ] Message deletion
- [ ] Copy code button
- [ ] Message reactions
- [ ] File attachments
- [ ] Voice input
- [ ] Message search
- [ ] Export conversation
- [ ] Custom themes
- [ ] Message threading

### API Integration
- [ ] OpenAI GPT-4 integration
- [ ] Anthropic Claude integration
- [ ] Custom model support
- [ ] Streaming API responses
- [ ] Rate limiting
- [ ] Error handling

## Contributing

When adding features:
1. Follow existing code style
2. Add TypeScript types
3. Update documentation
4. Add tests
5. Check accessibility
6. Test in both themes

## License

MIT License - See LICENSE file for details
