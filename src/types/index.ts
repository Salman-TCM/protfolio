export interface Project {
  _id?: string
  id: string
  title: string
  description: string
  tech: string[]
  status: 'active' | 'completed' | 'archived'
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  imageUrl?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface BlogPost {
  _id?: string
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  tags: string[]
  readTime: number
  published: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ContactMessage {
  _id?: string
  name: string
  email: string
  message: string
  source: 'terminal' | 'form' | 'api'
  ipAddress?: string
  userAgent?: string
  createdAt?: Date
}

export interface GitHubStats {
  followers: number
  following: number
  publicRepos: number
  totalStars: number
  totalForks: number
  contributions: number
  lastUpdated: Date
}

export interface TelegramStats {
  botUsername: string
  messageCount: number
  userCount: number
  lastMessage?: string
  lastUpdated: Date
}