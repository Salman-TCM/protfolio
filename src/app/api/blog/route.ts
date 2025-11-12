import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published') !== 'false'
    const limit = parseInt(searchParams.get('limit') || '10')
    const tag = searchParams.get('tag')
    
    let query: any = {}
    
    if (published) {
      query.published = true
    }
    
    if (tag) {
      query.tags = { $in: [tag.toLowerCase()] }
    }
    
    const posts = await BlogPost
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-__v')
      .lean()
    
    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length
    })
  } catch (error) {
    console.error('Blog API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch blog posts' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Validate required fields
    const { title, content, excerpt, tags, readTime } = body
    
    if (!title || !content || !excerpt || !tags || !readTime) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: title, content, excerpt, tags, readTime' 
        },
        { status: 400 }
      )
    }
    
    // Generate unique ID and date
    const id = Date.now().toString()
    const date = new Date().toISOString().split('T')[0]
    
    const blogPost = new BlogPost({
      ...body,
      id,
      date,
      tags: Array.isArray(tags) ? tags.map((t: string) => t.toLowerCase()) : []
    })
    
    await blogPost.save()
    
    return NextResponse.json({
      success: true,
      data: blogPost,
      message: 'Blog post created successfully'
    }, { status: 201 })
    
  } catch (error: any) {
    console.error('Create Blog Post Error:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Blog post with this ID already exists' 
        },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create blog post' 
      },
      { status: 500 }
    )
  }
}