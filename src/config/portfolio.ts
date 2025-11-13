export interface PortfolioSection {
  id: string
  type: 'hero' | 'about' | 'skills' | 'projects' | 'blog' | 'contact' | 'custom'
  title: string
  enabled: boolean
  order: number
  config: any
}

export interface PortfolioConfig {
  personal: {
    name: string
    title: string
    email: string
    tagline: string
    avatar?: string
    socialLinks: {
      github?: string
      linkedin?: string
      twitter?: string
      telegram?: string
    }
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    backgroundColor: string
  }
  features: {
    bootSequence: boolean
    matrixRain: boolean
    audioEffects: boolean
    aiChatbot: boolean
    liveStats: boolean
    cliMode: boolean
  }
  sections: PortfolioSection[]
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: 'Salman Hossain',
    title: 'Software Engineer',
    email: 'salman@example.com',
    tagline: 'Building the future, one line of code at a time',
    socialLinks: {
      github: 'https://github.com/salman',
      linkedin: 'https://linkedin.com/in/salman',
      telegram: '@salman_dev'
    }
  },
  theme: {
    primaryColor: '#00ffff',
    secondaryColor: '#ff00ff', 
    accentColor: '#ffff00',
    backgroundColor: '#0a0a0a'
  },
  features: {
    bootSequence: true,
    matrixRain: true,
    audioEffects: true,
    aiChatbot: true,
    liveStats: true,
    cliMode: true
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Welcome',
      enabled: true,
      order: 1,
      config: {
        terminalLines: [
          '> Initializing system...',
          '> Loading user profile...',
          '> Hello, I\'m Salman Hossain_',
          '> Software Engineer | Automation & AI Enthusiast',
          '> Welcome to my digital domain...',
          '> Type "help" for available commands'
        ],
        stats: [
          { label: 'YEARS EXP', value: '3+', color: 'neon-cyan' },
          { label: 'PROJECTS', value: '50+', color: 'neon-magenta' },
          { label: 'CURIOSITY', value: '∞', color: 'neon-purple' }
        ],
        buttons: [
          { text: 'DOWNLOAD CV', action: 'download-cv', style: 'primary' },
          { text: 'VIEW PROJECTS', action: 'navigate-projects', style: 'secondary' }
        ]
      }
    },
    {
      id: 'about',
      type: 'about',
      title: 'About Me',
      enabled: true,
      order: 2,
      config: {
        description: 'Passionate Software Engineer with expertise in modern web technologies.',
        details: [
          { label: 'Location', value: 'Digital Realm' },
          { label: 'Experience', value: '3+ Years' },
          { label: 'Specialization', value: 'React, Node.js, AI/ML' },
          { label: 'Status', value: 'Available for Opportunities' }
        ],
        timeline: [
          { year: '2024', title: 'Senior Developer', company: 'Tech Corp', description: 'Leading full-stack development projects' },
          { year: '2023', title: 'Software Engineer', company: 'StartupXYZ', description: 'Built scalable web applications' },
          { year: '2022', title: 'Junior Developer', company: 'DevAgency', description: 'Started professional development journey' }
        ]
      }
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Technical Arsenal',
      enabled: true,
      order: 3,
      config: {
        categories: [
          {
            name: 'Frontend',
            skills: [
              { name: 'React/Next.js', level: 90, icon: '⚛️' },
              { name: 'TypeScript', level: 85, icon: '📘' },
              { name: 'Tailwind CSS', level: 88, icon: '🎨' },
              { name: 'Framer Motion', level: 80, icon: '🎬' }
            ]
          },
          {
            name: 'Backend',
            skills: [
              { name: 'Node.js', level: 85, icon: '🟢' },
              { name: 'Python', level: 82, icon: '🐍' },
              { name: 'MongoDB', level: 80, icon: '🍃' },
              { name: 'PostgreSQL', level: 75, icon: '🐘' }
            ]
          },
          {
            name: 'DevOps',
            skills: [
              { name: 'Docker', level: 75, icon: '🐳' },
              { name: 'AWS', level: 70, icon: '☁️' },
              { name: 'GitHub Actions', level: 78, icon: '⚙️' },
              { name: 'Vercel', level: 85, icon: '▲' }
            ]
          }
        ]
      }
    },
    {
      id: 'projects',
      type: 'projects',
      title: 'Featured Projects',
      enabled: true,
      order: 4,
      config: {
        featured: [
          {
            title: 'AI ChatBot Platform',
            description: 'Advanced conversational AI with natural language processing',
            technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
            github: 'https://github.com/salman/ai-chatbot',
            demo: 'https://ai-chatbot-demo.com',
            image: '/projects/ai-chatbot.jpg',
            status: 'production'
          },
          {
            title: 'E-Commerce Dashboard',
            description: 'Real-time analytics dashboard for e-commerce businesses',
            technologies: ['Next.js', 'TypeScript', 'Prisma', 'Chart.js'],
            github: 'https://github.com/salman/ecommerce-dashboard',
            demo: 'https://dashboard-demo.com',
            image: '/projects/dashboard.jpg',
            status: 'production'
          },
          {
            title: 'Retro Portfolio',
            description: 'Cyberpunk-themed portfolio with interactive CLI',
            technologies: ['Next.js', 'Framer Motion', 'Canvas API', 'Tailwind'],
            github: 'https://github.com/salman/retro-portfolio',
            demo: 'https://portfolio-demo.com',
            image: '/projects/portfolio.jpg',
            status: 'production'
          }
        ]
      }
    },
    {
      id: 'blog',
      type: 'blog',
      title: 'Tech Blog',
      enabled: true,
      order: 5,
      config: {
        featured: [
          {
            title: 'Building AI-Powered Web Applications',
            excerpt: 'A comprehensive guide to integrating AI capabilities into modern web apps',
            date: '2024-11-01',
            readTime: '8 min',
            tags: ['AI', 'React', 'OpenAI'],
            slug: 'ai-powered-web-apps'
          },
          {
            title: 'The Future of Web Development',
            excerpt: 'Exploring upcoming trends and technologies in web development',
            date: '2024-10-15',
            readTime: '6 min',
            tags: ['Web Dev', 'Trends', 'Technology'],
            slug: 'future-of-web-dev'
          }
        ]
      }
    },
    {
      id: 'contact',
      type: 'contact',
      title: 'Get In Touch',
      enabled: true,
      order: 6,
      config: {
        description: 'Ready to build something amazing together?',
        methods: [
          { type: 'email', label: 'Email', value: 'salman@example.com', icon: '📧' },
          { type: 'telegram', label: 'Telegram', value: '@salman_dev', icon: '💬' },
          { type: 'github', label: 'GitHub', value: 'github.com/salman', icon: '🐙' },
          { type: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/salman', icon: '💼' }
        ],
        form: {
          enabled: true,
          fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'subject', label: 'Subject', type: 'text', required: true },
            { name: 'message', label: 'Message', type: 'textarea', required: true }
          ]
        }
      }
    }
  ]
}

// Helper functions
export const getSectionById = (id: string): PortfolioSection | undefined => {
  return portfolioConfig.sections.find(section => section.id === id)
}

export const getEnabledSections = (): PortfolioSection[] => {
  return portfolioConfig.sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)
}

export const getSectionsByType = (type: PortfolioSection['type']): PortfolioSection[] => {
  return portfolioConfig.sections.filter(section => section.type === type && section.enabled)
}