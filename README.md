# GitHub Chat Clone

A modern chat application that replicates GitHub's clean and intuitive frontend interface.

## Overview

This project aims to build a real-time chat application with a user interface inspired by GitHub's design system. The application will feature GitHub's signature dark/light themes, clean typography, and responsive layout patterns.

## Features

### ✅ Implemented

- **ChatGPT-style sidebar** - Collapsible navigation with chat history, search, and user menu
- **Chat interface** - Message display with markdown rendering and code syntax highlighting
- **Theme support** - Dark and light mode with automatic switching
- **Responsive design** - Works seamlessly across desktop, tablet, and mobile devices
- **Message formatting** - Full GitHub Flavored Markdown support
- **Code highlighting** - Syntax highlighting for 190+ programming languages
- **Streaming text** - Animated text reveal effect for assistant messages

### 🚧 Planned

- **Real-time messaging** - WebSocket integration for instant updates
- **User authentication** - Secure login and user management
- **Channel/Room support** - Organize conversations into channels
- **Message history** - Persistent chat storage and retrieval
- **File attachments** - Upload and share files in chat

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Custom components with Lucide icons
- **Markdown**: react-markdown with remark-gfm
- **Code Highlighting**: highlight.js
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/mohammed-afzal-cirruslabs/github-chat-clone.git

# Navigate to project directory
cd github-chat-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
github-chat-clone/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API and WebSocket services
│   ├── store/          # State management
│   ├── styles/         # Global styles and themes
│   └── utils/          # Utility functions
├── public/             # Static assets
└── tests/              # Test files
```

## Development

```bash
# Run development server
npm run dev

# Type-check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Demo Pages

- **ChatGPT Sidebar**: `/chatgpt-demo` - Interactive sidebar navigation demo
- **Chat Interface**: `/chat-demo` - Full chat interface with message display

## Documentation

- [ChatGPT Sidebar](docs/CHATGPT_SIDEBAR.md) - Sidebar component documentation
- [Chat Interface](docs/CHAT_INTERFACE.md) - Chat interface documentation
- [Quick Start Guide](docs/CHAT_INTERFACE_QUICK_START.md) - Quick integration guide
- [Visual Verification](docs/CHAT_INTERFACE_VISUAL_VERIFICATION.md) - Testing proof

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from [GitHub](https://github.com)
- Built with modern web technologies and best practices

## Roadmap

- [x] ~~Basic chat interface with ChatGPT styling~~
- [x] ~~ChatGPT-style sidebar navigation~~
- [x] ~~Message display with markdown rendering~~
- [x] ~~Code syntax highlighting~~
- [x] ~~Dark/light theme support~~
- [x] ~~Mobile responsive design~~
- [ ] User authentication and profiles
- [ ] Real-time messaging infrastructure (WebSocket)
- [ ] Channel/room management
- [ ] Message search and filtering
- [ ] File sharing and attachments
- [ ] Emoji and reaction support
- [ ] Notification system
- [ ] Message editing and deletion
- [ ] Accessibility improvements (WCAG AA)

---

**Note**: This is an independent project and is not affiliated with or endorsed by GitHub, Inc.
