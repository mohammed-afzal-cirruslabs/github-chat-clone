# GitHub Chat Clone

A modern chat application built with Next.js 15, TypeScript, and Tailwind CSS, featuring GitHub's clean and professional interface design.

## 🚀 Tech Stack

- **Framework**: Next.js 15.0.3 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Font**: Inter (Google Fonts)
- **Package Manager**: npm

## 📁 Project Structure

```
github-chat-clone/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with Inter font
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles & CSS variables
├── components/              # React components
│   └── chat/               # Chat-specific components
│       ├── ChatContainer.tsx    # Main chat wrapper
│       ├── ChatHeader.tsx       # Channel header
│       ├── Sidebar.tsx          # Channel sidebar
│       ├── MessageList.tsx      # Message display area
│       ├── MessageInput.tsx     # Message input field
│       └── index.ts             # Barrel exports
├── types/                   # TypeScript type definitions
│   ├── chat.ts             # Chat-related types
│   └── index.ts            # Type exports
├── public/                  # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

## 🎨 Design System

The application follows GitHub's design language with:

### Color Tokens (CSS Variables)
- **Light Theme**: Clean whites, subtle grays, GitHub blue accent
- **Dark Theme**: Deep backgrounds, muted text, bright accent
- Automatic theme switching based on system preference

### Typography
- **Font**: Inter (system fallback: ui-sans-serif, system-ui)
- **Sizes**: Responsive scale from 12px to 32px
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing
- 4px base unit (Tailwind's default scale)
- Consistent padding and margins throughout

## 🏗️ Component Architecture

### Chat Components

1. **ChatContainer**: Main wrapper for the entire chat interface
2. **Sidebar**: Channel list and navigation
3. **ChatGPTSidebar**: ChatGPT-style collapsible sidebar with chat history ([docs](./docs/CHATGPT_SIDEBAR.md))
4. **ChatHeader**: Channel title and description
5. **MessageList**: Scrollable message display with auto-scroll
6. **MessageInput**: Text input with keyboard shortcuts (Enter to send, Shift+Enter for new line)

### Type Definitions

#### Chat Types
- `Message`: Chat message structure
- `Channel`: Channel/room information
- `User`: User profile data
- `Reaction`: Message reactions

#### ChatGPT Types
- `ChatSession`: Individual chat session with title and timestamp
- `ChatGroup`: Time-grouped chat sessions (Today, Yesterday, etc.)
- `UserProfile`: User information with plan and avatar

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint code
npm run lint
```

### Development Server

Open [http://localhost:3000](http://localhost:3000) in your browser.

The page auto-updates as you edit files.

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |

## 🎯 Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ GitHub-inspired design system
- ✅ Light/Dark theme support
- ✅ Responsive layout
- ✅ Component-based architecture
- ✅ Type-safe props and state
- ✅ Accessible UI components

## 🔧 Configuration

### Next.js Config (`next.config.ts`)
Standard Next.js 15 configuration with TypeScript support.

### TypeScript Config (`tsconfig.json`)
- Strict mode enabled
- Path aliases configured (`@/*`)
- Next.js plugin included

### Tailwind Config (`tailwind.config.ts`)
- Content paths for all component directories
- Custom color variables
- Extended theme configuration

## 🎨 Styling Approach

1. **CSS Variables**: Theme colors defined in `globals.css`
2. **Tailwind Utilities**: Component styling with utility classes
3. **No Default Controls**: All form elements are custom-styled
4. **Consistent Spacing**: 4px grid system
5. **Semantic Colors**: Primary, secondary, muted, destructive, success, warning

## 📦 Dependencies

### Production
- `next`: ^15.0.3
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `lucide-react`: ^0.468.0 (icons)

### Development
- `typescript`: ^5
- `@types/node`: ^22
- `@types/react`: ^18
- `@types/react-dom`: ^18
- `tailwindcss`: ^3.4.15
- `autoprefixer`: ^10.4.20
- `postcss`: ^8.4.49
- `eslint`: ^9
- `eslint-config-next`: 15.0.3

## 🚦 Build Status

- ✅ TypeScript compilation: Passing
- ✅ Production build: Successful
- ✅ ESLint: Configured
- ✅ Light theme: Verified
- ✅ Dark theme: Verified

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run type-check and build
5. Submit a pull request

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
