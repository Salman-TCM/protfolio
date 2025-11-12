import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') // 'featured', 'active', etc.
    const limit = parseInt(searchParams.get('limit') || '10')
    
    let query = {}
    
    if (filter === 'featured') {
      query = { featured: true }
    } else if (filter === 'active') {
      query = { status: 'active' }
    }
    
    const projects = await Project
      .find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit)
      .select('-__v')
      .lean()
    
    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length
    })
  } catch (error) {
    console.error('Projects API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch projects' 
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
    const { title, description, tech, status = 'active' } = body
    
    if (!title || !description || !tech || !Array.isArray(tech)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: title, description, tech' 
        },
        { status: 400 }
      )
    }
    
    // Generate unique ID
    const id = Date.now().toString()
    
    const project = new Project({
      ...body,
      id
    })
    
    await project.save()
    
    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project created successfully'
    }, { status: 201 })
    
  } catch (error: any) {
    console.error('Create Project Error:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Project with this ID already exists' 
        },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create project' 
      },
      { status: 500 }
    )
  }
}