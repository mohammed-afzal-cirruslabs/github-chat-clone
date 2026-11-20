# ChatInput Component Documentation

## Overview

The **ChatInput** component is a production-ready, ChatGPT-style input area that provides a rich text input experience with multi-line support, keyboard shortcuts, character counting, and file attachments.

## Features

### ✅ Core Functionality

1. **Multi-line Textarea**
   - Auto-resizes from 52px (min) to 200px (max)
   - Smooth height transitions as content grows
   - Maintains scroll position

2. **Send Button**
   - Enabled only when text is present
   - Disabled during loading state
   - Visual feedback on hover
   - Lucide Send icon

3. **Attachment Button** (Optional)
   - File input trigger
   - Lucide Paperclip icon
   - Hidden file input for clean UI
   - Resets after file selection

4. **Character Counter**
   - Real-time character count
   - Token estimate (~4 chars per token)
   - Warning color at 90% of max length
   - Configurable max length (default: 4000)

5. **Keyboard Shortcuts**
   - `Enter` - Send message
   - `Shift + Enter` - New line
   - Visual keyboard hints below input

6. **User Feedback**
   - Disclaimer text: "ChatGPT can make mistakes. Check important info."
   - Keyboard shortcut hints
   - Loading state indication

### 🎨 Design System

- **Colors**: CSS variables from `globals.css`
- **Typography**: Inter font, 14px body text
- **Spacing**: 4px grid system (Tailwind)
- **Border Radius**: 12px (rounded-xl)
- **Focus Ring**: 2px primary color ring
- **Transitions**: 150ms ease-out

### ♿ Accessibility

- Semantic HTML elements
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus visible (2px ring)
- Screen reader friendly
- Color contrast ≥ 4.5:1

## Component API

```typescript
interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onAttachment?: (file: File) => void;
  isLoading?: boolean;
  placeholder?: string;
  maxLength?: number;
  showTokenCount?: boolean;
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSendMessage` | `(content: string) => void` | **Required** | Callback when user sends a message |
| `onAttachment` | `(file: File) => void` | `undefined` | Optional callback for file attachments |
| `isLoading` | `boolean` | `false` | Disables input during loading |
| `placeholder` | `string` | `"Message ChatGPT..."` | Textarea placeholder text |
| `maxLength` | `number` | `4000` | Maximum character limit |
| `showTokenCount` | `boolean` | `true` | Show character/token counter |

## Usage Examples

### Basic Usage

```tsx
import { ChatInput } from "@/components/chat";

function MyChat() {
  const handleSend = (content: string) => {
    console.log("Sending:", content);
  };

  return <ChatInput onSendMessage={handleSend} />;
}
```

### With Attachments

```tsx
import { ChatInput } from "@/components/chat";

function MyChat() {
  const handleSend = (content: string) => {
    console.log("Sending:", content);
  };

  const handleAttachment = (file: File) => {
    console.log("Attached:", file.name);
  };

  return (
    <ChatInput
      onSendMessage={handleSend}
      onAttachment={handleAttachment}
    />
  );
}
```

### With Loading State

```tsx
import { ChatInput } from "@/components/chat";
import { useState } from "react";

function MyChat() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (content: string) => {
    setIsLoading(true);
    await sendToAPI(content);
    setIsLoading(false);
  };

  return (
    <ChatInput
      onSendMessage={handleSend}
      isLoading={isLoading}
    />
  );
}
```

### Custom Configuration

```tsx
import { ChatInput } from "@/components/chat";

function MyChat() {
  return (
    <ChatInput
      onSendMessage={handleSend}
      placeholder="Type your message..."
      maxLength={2000}
      showTokenCount={false}
    />
  );
}
```

## Implementation Details

### Auto-Resize Logic

The textarea automatically adjusts its height based on content:

```typescript
useEffect(() => {
  const textarea = textareaRef.current;
  if (textarea) {
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;
  }
}, [value]);
```

### Token Estimation

Rough approximation using character count:

```typescript
const estimatedTokens = Math.ceil(charCount / 4);
```

### Keyboard Shortcuts

```typescript
const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
};
```

## Styling

The component uses CSS variables for theming:

```css
--background: Background color
--foreground: Text color
--border: Border color
--input: Input background
--primary: Primary action color
--primary-hover: Primary hover state
--secondary: Secondary background
--muted: Muted text color
--warning: Warning text color
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Minimal re-renders (only on value change)
- Efficient auto-resize calculation
- No unnecessary DOM manipulations
- Lightweight (~200 lines)

## Testing

### Manual Testing Checklist

- [ ] Type text and verify auto-resize
- [ ] Press Enter to send message
- [ ] Press Shift+Enter for new line
- [ ] Verify character counter updates
- [ ] Check token estimate accuracy
- [ ] Test attachment button (if enabled)
- [ ] Verify loading state disables input
- [ ] Test at 90%+ character limit
- [ ] Check light and dark themes
- [ ] Test on mobile (390px width)
- [ ] Verify keyboard navigation
- [ ] Test screen reader compatibility

## Known Limitations

1. Token estimation is approximate (~4 chars per token)
2. Max height is fixed at 200px
3. File attachment has no type restrictions (implement in parent)
4. No paste image support (future enhancement)

## Future Enhancements

- [ ] Paste image support
- [ ] Drag and drop file upload
- [ ] Voice input button
- [ ] Emoji picker
- [ ] Mention/slash commands
- [ ] Message history navigation (up/down arrows)
- [ ] Rich text formatting toolbar
- [ ] More accurate token counting

## Related Components

- **ChatInterface** - Main chat container that uses ChatInput
- **ChatMessage** - Individual message display
- **StreamingMessage** - Animated message streaming

## References

- [ChatGPT UI](https://chat.openai.com) - Design inspiration
- [Lucide Icons](https://lucide.dev) - Icon library
- [Tailwind CSS](https://tailwindcss.com) - Styling framework
