// Static data for the portfolio to prevent undefined values

export const portfolioData = {
  personal: {
    name: 'Salman Hossain',
    title: 'Software Engineer',
    age: 25,
    experience: '3+ Years',
    location: 'Earth.Planet',
    email: 'salman@example.com',
    tagline: 'Building the future, one line of code at a time',
    status: 'Available for Opportunities'
  },
  
  skills: {
    Frontend: {
      color: 'neon-cyan',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js']
    },
    Backend: {
      color: 'neon-magenta', 
      items: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Express', 'FastAPI']
    },
    DevOps: {
      color: 'neon-purple',
      items: ['Docker', 'AWS', 'Vercel', 'Git', 'CI/CD', 'Linux']
    },
    'AI/ML': {
      color: 'neon-green',
      items: ['OpenAI API', 'TensorFlow', 'PyTorch', 'Automation', 'Data Science', 'NLP']
    }
  },

  stats: {
    projects: 50,
    experience: 3,
    coffeeLevel: 'CRITICAL',
    linesOfCode: '1,337,420+',
    debugMethod: 'console.log()',
    tabsVsSpaces: 'Spaces'
  },

  quickFacts: [
    { icon: '☕', text: 'Coffee addiction level: CRITICAL', color: 'neon-green' },
    { icon: '🐛', text: 'Favorite debugging method: console.log()', color: 'neon-magenta' },
    { icon: '💻', text: 'Lines of code written: 1,337,420+', color: 'neon-purple' },
    { icon: '🚀', text: 'Tabs vs Spaces: Spaces (fight me)', color: 'neon-amber' }
  ],

  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/salman', icon: '🐙', command: 'git clone life' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/salman', icon: '💼', command: 'connect --professional' },
    { name: 'Twitter', url: 'https://twitter.com/salman', icon: '🐦', command: 'tweet --follow' },
    { name: 'Email', url: 'mailto:salman@example.com', icon: '📧', command: 'send --message' },
    { name: 'Telegram', url: 'https://t.me/salman', icon: '✈️', command: 'ping --instant' }
  ]
}

export const defaultProjects = [
  {
    id: '001',
    title: 'AI-Powered Task Automation',
    description: 'Intelligent automation system that learns from user behavior to optimize workflows and reduce manual tasks.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL'],
    status: 'active' as const,
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/salman/ai-automation',
    featured: true
  },
  {
    id: '002', 
    title: 'Retro Portfolio Website',
    description: 'Cyberpunk-themed portfolio with interactive terminal interface, built with Next.js and Framer Motion.',
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'MongoDB'],
    status: 'completed' as const,
    githubUrl: 'https://github.com/salman/retro-portfolio',
    featured: true
  },
  {
    id: '003',
    title: 'Real-time Chat Application', 
    description: 'WebSocket-based chat app with end-to-end encryption and AI moderation features.',
    tech: ['Node.js', 'Socket.io', 'React', 'Redis', 'MongoDB'],
    status: 'completed' as const,
    demoUrl: 'https://chat.example.com',
    githubUrl: 'https://github.com/salman/secure-chat',
    featured: false
  },
  {
    id: '004',
    title: 'Blockchain Voting System',
    description: 'Decentralized voting platform ensuring transparency and security in democratic processes.',
    tech: ['Solidity', 'Web3.js', 'React', 'IPFS', 'MetaMask'],
    status: 'active' as const,
    githubUrl: 'https://github.com/salman/blockchain-voting', 
    featured: true
  }
]

export const defaultBlogPosts = [
  {
    id: '001',
    title: 'Building Retro UIs with Modern Tech',
    excerpt: 'Learn how to create authentic retro user interfaces using modern web technologies.',
    date: '2024-01-15',
    tags: ['React', 'Design', 'Retro', 'CSS'],
    readTime: 5,
    content: `# Building Retro UIs with Modern Tech

The nostalgic appeal of 80s and 90s computer interfaces has made a comeback in modern web design...`
  },
  {
    id: '002', 
    title: 'AI-Powered Automation in 2024',
    excerpt: 'Explore how AI is transforming automation workflows and development processes.',
    date: '2024-01-10',
    tags: ['AI', 'Automation', 'Python', 'Machine Learning'],
    readTime: 7,
    content: `# AI-Powered Automation in 2024

Artificial Intelligence has revolutionized how we approach automation...`
  },
  {
    id: '003',
    title: 'The Future of Web Development',
    excerpt: 'A look at emerging web development trends and technologies shaping our industry.',
    date: '2024-01-05', 
    tags: ['WebDev', 'Future', 'Technology', 'Trends'],
    readTime: 6,
    content: `# The Future of Web Development

Web development is evolving rapidly...`
  }
]