import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'
import BlogPost from '@/models/BlogPost'
import ContactMessage from '@/models/ContactMessage'

interface GitHubResponse {
  followers: number
  following: number
  public_repos: number
  [key: string]: any
}

async function getGitHubStats(username: string = 'salman') {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App'
    }
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`
    }
    
    // Get user info
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`)
    }
    
    const user: GitHubResponse = await userResponse.json()
    
    // Get repositories for stars and forks count
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 }
    })
    
    let totalStars = 0
    let totalForks = 0
    
    if (reposResponse.ok) {
      const repos = await reposResponse.json()
      totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)
      totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0)
    }
    
    return {
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      totalStars,
      totalForks,
      contributions: 0, // GitHub doesn't provide this in API without GraphQL
      lastUpdated: new Date()
    }
  } catch (error) {
    console.error('GitHub stats error:', error)
    return {
      followers: 0,
      following: 0,
      publicRepos: 0,
      totalStars: 0,
      totalForks: 0,
      contributions: 0,
      lastUpdated: new Date(),
      error: 'Failed to fetch GitHub stats'
    }
  }
}

export async function GET() {
  try {
    await dbConnect()
    
    // Get database statistics
    const [projectsCount, blogPostsCount, messagesCount] = await Promise.all([
      Project.countDocuments(),
      BlogPost.countDocuments({ published: true }),
      ContactMessage.countDocuments()
    ])
    
    // Get featured projects count
    const featuredProjectsCount = await Project.countDocuments({ featured: true })
    
    // Get recent activity
    const recentProjects = await Project
      .find({ status: 'active' })
      .sort({ updatedAt: -1 })
      .limit(3)
      .select('title updatedAt')
    
    const recentPosts = await BlogPost
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title createdAt')
    
    // Get GitHub statistics
    const githubStats = await getGitHubStats()
    
    // Portfolio statistics
    const portfolioStats = {
      totalProjects: projectsCount,
      featuredProjects: featuredProjectsCount,
      totalBlogPosts: blogPostsCount,
      totalMessages: messagesCount,
      recentActivity: {
        projects: recentProjects,
        posts: recentPosts
      }
    }
    
    // System status
    const systemStatus = {
      online: true,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      nodeVersion: process.version,
      platform: process.platform,
      lastUpdated: new Date()
    }
    
    return NextResponse.json({
      success: true,
      data: {
        portfolio: portfolioStats,
        github: githubStats,
        system: systemStatus
      }
    })
    
  } catch (error) {
    console.error('Stats API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch statistics' 
      },
      { status: 500 }
    )
  }
}