import { NextRequest, NextResponse } from 'next/server'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// Predefined responses for the AI chatbot
const responses = {
  greetings: [
    "Hello! I'm ARIA (Automated Retro Intelligence Assistant), Salman's AI companion. How can I help you explore this digital realm?",
    "Greetings, human! Welcome to Salman's cyberpunk portfolio. What information are you seeking?",
    "Hey there! I'm the AI assistant running this retro terminal. Ask me anything about Salman's work!",
  ],
  
  portfolio: [
    "Salman's portfolio showcases a range of full-stack projects, from AI automation tools to blockchain applications. He specializes in React, Node.js, Python, and modern web technologies.",
    "This portfolio demonstrates expertise in frontend development, backend APIs, database design, and AI integration. All projects follow modern best practices and clean architecture.",
    "The portfolio features both personal projects and professional work, highlighting skills in automation, web development, and emerging technologies like blockchain and AI.",
  ],
  
  skills: [
    "Salman's technical stack includes: Frontend (React, Next.js, TypeScript, Tailwind CSS), Backend (Node.js, Python, FastAPI, Express), Databases (MongoDB, PostgreSQL, Redis), and AI/ML (TensorFlow, OpenAI API).",
    "Key competencies: Full-stack web development, API design, database architecture, automation scripting, AI integration, DevOps practices, and modern deployment strategies.",
    "Specializations: Building scalable web applications, creating intelligent automation workflows, implementing real-time features, and integrating AI capabilities into web platforms.",
  ],
  
  projects: [
    "Featured projects include an AI-powered task automation system, this retro cyberpunk portfolio, a blockchain voting platform, and various web applications. Each demonstrates different aspects of modern development.",
    "The project portfolio spans multiple domains: AI/ML applications, blockchain technology, real-time communication tools, e-commerce platforms, and developer tools.",
    "Recent work focuses on automation, AI integration, and creating engaging user experiences with modern frameworks and cutting-edge technologies.",
  ],
  
  contact: [
    "You can reach Salman through the contact section below, via email, or through any of the social media links. He's always open to discussing new opportunities and interesting projects.",
    "Feel free to send a message through the terminal interface or use the traditional contact form. Salman typically responds within 24 hours to all inquiries.",
    "For collaboration, job opportunities, or just to chat about technology, don't hesitate to get in touch. The contact terminal accepts various commands for different types of messages.",
  ],
  
  help: [
    "I can answer questions about Salman's skills, projects, experience, and this portfolio. Try asking about: 'projects', 'skills', 'experience', 'contact', or specific technologies.",
    "Available topics: portfolio overview, technical skills, project details, work experience, contact information, and how this retro terminal interface was built.",
    "You can ask me about anything related to Salman's work, background, or the technologies used in his projects. I'm here to help you navigate this digital space!",
  ],
  
  default: [
    "Interesting question! While I don't have specific information about that, I can tell you more about Salman's skills, projects, or experience. What would you like to know?",
    "I'm not sure about that particular topic, but I'm knowledgeable about Salman's portfolio, technical expertise, and professional background. How can I help?",
    "That's outside my current knowledge base, but I can provide detailed information about the portfolio, projects, skills, or how to get in touch. What interests you?",
  ]
}

function getRandomResponse(category: keyof typeof responses): string {
  const categoryResponses = responses[category]
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
}

function categorizeMessage(message: string): keyof typeof responses {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.match(/\b(hello|hi|hey|greetings?|good (morning|afternoon|evening))\b/)) {
    return 'greetings'
  }
  
  if (lowerMessage.match(/\b(portfolio|website|work|showcase)\b/)) {
    return 'portfolio'
  }
  
  if (lowerMessage.match(/\b(skills?|technologies?|tech|programming|languages?|frameworks?|expertise)\b/)) {
    return 'skills'
  }
  
  if (lowerMessage.match(/\b(projects?|applications?|apps?|work|examples?)\b/)) {
    return 'projects'
  }
  
  if (lowerMessage.match(/\b(contact|reach|email|message|get in touch|hire|collaborate)\b/)) {
    return 'contact'
  }
  
  if (lowerMessage.match(/\b(help|what|how|can you|commands?|info)\b/)) {
    return 'help'
  }
  
  return 'default'
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Simple rate limiting (in production, use Redis or similar)
    const userIP = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Categorize the message and get appropriate response
    const category = categorizeMessage(message)
    let response = getRandomResponse(category)
    
    // Add some personality based on the conversation context
    if (history.length === 0 && category === 'greetings') {
      response += " This is a cyberpunk-themed portfolio built with Next.js, featuring real-time animations and interactive elements."
    }
    
    // Simulate typing delay for more realistic feel
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
    
    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
      category
    })
    
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process message',
        response: "System error: AI assistant temporarily offline. Please try again or use the contact form."
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'ARIA - Automated Retro Intelligence Assistant',
    version: '2.0.1',
    capabilities: [
      'Portfolio information',
      'Technical skills overview',
      'Project details',
      'Contact assistance',
      'General conversation'
    ],
    status: 'online'
  })
}