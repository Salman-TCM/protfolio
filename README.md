# 🚀 Retro Cyberpunk Portfolio

A futuristic portfolio website that blends retro 80s/90s aesthetics with modern web technologies. Experience a unique, cinematic, and interactive journey through a developer's digital realm.

![Portfolio Preview](./public/preview.png)

## ✨ Features

### 🎨 **Retro Design System**
- **Dark Synthwave Theme**: Deep blacks with neon cyan, magenta, and purple accents
- **CRT Monitor Effects**: Authentic scanlines and subtle glow effects
- **Retro Typography**: Press Start 2P, VT323, and IBM Plex Mono fonts
- **Terminal Aesthetics**: Command-line inspired interfaces throughout

### 🎭 **Interactive Elements**
- **Typewriter Animations**: Text appears character by character
- **Terminal CLI Navigation** (`Ctrl + \``): Navigate via command line
- **Live Stats Dashboard** (`Ctrl + S`): Real-time GitHub and system metrics
- **AI Chatbot Assistant**: ARIA (Automated Retro Intelligence Assistant)
- **Interactive Background**: Mouse-responsive grid animations

### 🎵 **Audio & Effects**
- **Retro Sound Effects**: Web Audio API generated beeps and boops
- **Background Music Support**: Synthwave ambient tracks
- **Konami Code Easter Egg**: Classic cheat code activation
- **Dynamic Audio Controls**: Volume and mute functionality

### 🔧 **Technical Features**
- **Full-Stack Architecture**: Next.js 15 with App Router
- **Real-time Data**: Live GitHub stats and portfolio metrics
- **Database Integration**: MongoDB with Mongoose ODM
- **API Endpoints**: RESTful APIs for projects, blog, and contact
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15, React 18 | Modern React framework with SSR |
| **Styling** | Tailwind CSS, Framer Motion | Rapid styling + smooth animations |
| **Backend** | Next.js API Routes | Serverless API functions |
| **Database** | MongoDB, Mongoose | Document storage and ODM |
| **Animation** | Framer Motion, Canvas API | Advanced animations and effects |
| **Audio** | Web Audio API | Retro sound generation |
| **Typography** | Google Fonts | Authentic retro font loading |
| **Development** | TypeScript, ESLint | Type safety and code quality |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/salman/retro-portfolio.git
cd retro-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration

# Seed the database (optional)
npm run seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your retro portfolio in action!

### Environment Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/retro-portfolio

# GitHub API (for live stats)
GITHUB_TOKEN=your-github-token

# OpenAI API (for enhanced chatbot)
OPENAI_API_KEY=your-openai-key

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 📱 Usage Guide

### **Navigation**
- **Mouse/Touch**: Traditional scrolling and clicking
- **Keyboard Shortcuts**:
  - `Ctrl + \``: Toggle terminal CLI
  - `Ctrl + S`: Toggle live stats dashboard
- **Terminal Commands**: Type `help` in CLI for available commands

### **CLI Commands**
```bash
# Navigation
home, about, projects, blog, contact

# System
clear, help, whoami, date, status

# Fun
matrix, hack, coffee, joke, quote
```

### **Chatbot Interaction**
- Click the robot icon (bottom right)
- Ask about skills, projects, experience
- Try: "Tell me about your skills" or "What projects are featured?"

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/api/projects` | GET/POST | Manage portfolio projects |
| `/api/blog` | GET/POST | Blog posts and articles |
| `/api/contact` | GET/POST | Contact form submissions |
| `/api/stats` | GET | Live GitHub and system stats |
| `/api/chat` | POST | AI chatbot conversations |
| `/api/seed` | POST | Database seeding utility |

## 🎨 Customization

### **Color Scheme**
Edit `tailwind.config.ts` to modify the retro color palette:

```typescript
colors: {
  'retro-bg': '#0A0A0A',        // Deep black background
  'neon-cyan': '#00FFF7',       // Primary accent
  'neon-magenta': '#FF00C8',    // Secondary accent  
  'neon-purple': '#8B5CF6',     // Tertiary accent
  'retro-green': '#00FF41',     // Success color
  'retro-amber': '#FFB000',     // Warning color
}
```

### **Typography**
Fonts are configured in `src/app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=IBM+Plex+Mono');

.font-retro { font-family: 'Press Start 2P', cursive; }
.font-terminal { font-family: 'VT323', monospace; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }
```

### **Animations**
Custom Tailwind animations in `tailwind.config.ts`:

```typescript
animation: {
  'typewriter': 'typewriter 2s steps(20) infinite',
  'blink': 'blink 1s infinite',
  'flicker': 'flicker 2s infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
}
```

## 📁 Project Structure

```
retro-portfolio/
├── src/
│   ├── app/                 # Next.js 15 App Router
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── TerminalCLI.tsx
│   │   ├── AIChatbot.tsx
│   │   ├── AudioSystem.tsx
│   │   └── LiveStats.tsx
│   ├── lib/               # Utilities
│   │   ├── mongodb.ts     # Database connection
│   │   └── seed.ts        # Data seeding
│   ├── models/            # MongoDB schemas
│   └── types/             # TypeScript definitions
├── public/                # Static assets
├── .env.local            # Environment variables
└── package.json          # Dependencies
```

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### **Docker**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### **Manual Deployment**

```bash
# Build for production
npm run build

# Start production server
npm start
```

## ⚡ Performance Optimizations

- **Static Generation**: Pages pre-rendered at build time
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Use `npm run analyze` to analyze bundle size
- **Code Splitting**: Automatic route-based splitting
- **Caching**: API responses cached for optimal performance

## 🎯 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Mobile Responsive**: Optimized for all screen sizes
- **Performance**: Lighthouse score 95+ across all metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- **Design Inspiration**: 80s/90s sci-fi movies and retro computing
- **Typography**: Google Fonts for authentic retro typefaces
- **Animations**: Framer Motion for smooth, modern animations
- **Sound Design**: Web Audio API for authentic retro sound effects

---

**Built with ❤️ and lots of ☕ by Salman Hossain**

*Experience the future of portfolios - where nostalgia meets innovation* ✨