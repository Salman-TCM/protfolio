import dbConnect from './mongodb'
import Project from '@/models/Project'
import BlogPost from '@/models/BlogPost'

const sampleProjects = [
  {
    id: '001',
    title: 'AI-Powered Task Automation',
    description: 'Intelligent automation system that learns from user behavior to optimize workflows and reduce manual tasks using machine learning algorithms.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL', 'Redis'],
    status: 'active' as const,
    demoUrl: 'https://demo.example.com/ai-automation',
    githubUrl: 'https://github.com/salman/ai-automation',
    featured: true
  },
  {
    id: '002',
    title: 'Retro Portfolio Website',
    description: 'Cyberpunk-themed portfolio with interactive terminal interface, built with Next.js and Framer Motion for smooth animations.',
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'MongoDB'],
    status: 'completed' as const,
    githubUrl: 'https://github.com/salman/retro-portfolio',
    featured: true
  },
  {
    id: '003',
    title: 'Real-time Chat Application',
    description: 'WebSocket-based chat app with end-to-end encryption and AI moderation features for secure communication.',
    tech: ['Node.js', 'Socket.io', 'React', 'Redis', 'MongoDB', 'OpenAI'],
    status: 'completed' as const,
    demoUrl: 'https://chat.example.com',
    githubUrl: 'https://github.com/salman/secure-chat',
    featured: false
  },
  {
    id: '004',
    title: 'Blockchain Voting System',
    description: 'Decentralized voting platform ensuring transparency and security in democratic processes using smart contracts.',
    tech: ['Solidity', 'Web3.js', 'React', 'IPFS', 'MetaMask', 'Hardhat'],
    status: 'active' as const,
    githubUrl: 'https://github.com/salman/blockchain-voting',
    featured: true
  },
  {
    id: '005',
    title: 'E-commerce Analytics Dashboard',
    description: 'Comprehensive analytics platform for tracking sales, customer behavior, and inventory management with real-time insights.',
    tech: ['Vue.js', 'D3.js', 'Express', 'MongoDB', 'AWS', 'Docker'],
    status: 'completed' as const,
    featured: false
  },
  {
    id: '006',
    title: 'DevOps Monitoring Suite',
    description: 'Complete monitoring solution with custom metrics, alerting, and automated scaling for cloud infrastructure.',
    tech: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Go', 'Terraform'],
    status: 'archived' as const,
    featured: false
  }
]

const sampleBlogPosts = [
  {
    id: '001',
    title: 'Building Retro UIs with Modern Tech',
    content: `# Building Retro UIs with Modern Tech

The nostalgic appeal of 80s and 90s computer interfaces has made a comeback in modern web design. Here's how I combined retro aesthetics with cutting-edge technologies to create engaging user experiences.

## The Challenge

Creating authentic retro designs while maintaining modern usability and performance standards requires careful balance. You need to evoke nostalgia without sacrificing functionality.

## Technologies Used

- **Next.js 15**: For server-side rendering and optimal performance
- **Framer Motion**: For smooth animations and transitions
- **Tailwind CSS**: For rapid styling with custom retro color schemes
- **Canvas API**: For dynamic background effects

## Key Design Principles

1. **Neon Color Palette**: Cyan, magenta, and purple create that classic cyberpunk feel
2. **Monospace Typography**: Essential for authentic terminal aesthetics
3. **Scanline Effects**: Subtle CRT monitor simulation
4. **Typewriter Animations**: Text that appears character by character

## Implementation Tips

The secret is in the details - subtle glows, proper spacing, and consistent theming throughout the entire application.

Happy coding! 🚀`,
    excerpt: 'Learn how to create authentic retro user interfaces using modern web technologies while maintaining performance and usability.',
    date: '2024-01-15',
    tags: ['React', 'Design', 'Retro', 'CSS', 'UI/UX'],
    readTime: 5,
    published: true
  },
  {
    id: '002',
    title: 'AI-Powered Automation in 2024',
    content: `# AI-Powered Automation in 2024

Artificial Intelligence has revolutionized how we approach automation. Let me share insights from building intelligent systems that learn and adapt.

## The Evolution

From simple rule-based systems to machine learning models that understand context and make decisions autonomously.

## Current Trends

- **Large Language Models**: GPT-4 and beyond
- **Computer Vision**: Real-time image processing
- **Natural Language Processing**: Better human-AI interaction
- **Edge Computing**: AI processing closer to data sources

## Building Smart Automations

The key is starting simple and iterating. Begin with clear, measurable tasks and gradually add intelligence.

## Tools & Frameworks

- **OpenAI API**: For language processing
- **TensorFlow**: For custom model training
- **Python FastAPI**: For scalable backend services
- **Docker**: For consistent deployment environments

Remember: The best automation is invisible to the end user.`,
    excerpt: 'Explore how AI is transforming automation workflows and learn practical approaches to building intelligent systems.',
    date: '2024-01-10',
    tags: ['AI', 'Automation', 'Python', 'Machine Learning'],
    readTime: 7,
    published: true
  },
  {
    id: '003',
    title: 'The Future of Web Development',
    content: `# The Future of Web Development

Web development is evolving rapidly. Here are the trends shaping our industry and how to prepare for what's coming.

## Key Trends

1. **Edge Computing**: Bringing computation closer to users
2. **WebAssembly**: Near-native performance in browsers
3. **Serverless Architecture**: Focus on code, not infrastructure
4. **AI Integration**: Smart features in every application

## Technologies to Watch

- **Deno & Bun**: Modern JavaScript runtimes
- **SvelteKit**: Compile-time optimized frameworks
- **Astro**: Static site generation with islands architecture
- **Vercel Edge Functions**: Global, fast serverless computing

## Preparing for the Future

Stay curious, keep learning, and don't be afraid to experiment with new technologies. The future belongs to adaptable developers.

## Conclusion

The web platform continues to evolve, offering more capabilities and better performance. Embrace the change!`,
    excerpt: 'A look at emerging web development trends and technologies that will shape the future of our industry.',
    date: '2024-01-05',
    tags: ['WebDev', 'Future', 'Technology', 'Trends'],
    readTime: 6,
    published: true
  }
]

export async function seedDatabase() {
  try {
    await dbConnect()
    console.log('Connected to database')

    // Clear existing data
    await Project.deleteMany({})
    await BlogPost.deleteMany({})
    console.log('Cleared existing data')

    // Seed projects
    await Project.insertMany(sampleProjects)
    console.log(`Seeded ${sampleProjects.length} projects`)

    // Seed blog posts
    await BlogPost.insertMany(sampleBlogPosts)
    console.log(`Seeded ${sampleBlogPosts.length} blog posts`)

    console.log('Database seeding completed successfully')
    
    return {
      success: true,
      projectsCount: sampleProjects.length,
      postsCount: sampleBlogPosts.length
    }
  } catch (error) {
    console.error('Database seeding failed:', error)
    throw error
  }
}