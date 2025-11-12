import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const source = searchParams.get('source') // 'terminal', 'form', 'api'
    
    let query: any = {}
    
    if (source) {
      query.source = source
    }
    
    const messages = await ContactMessage
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-__v')
      .lean()
    
    return NextResponse.json({
      success: true,
      data: messages,
      count: messages.length
    })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch contact messages' 
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
    const { name, email, message } = body
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: name, email, message' 
        },
        { status: 400 }
      )
    }
    
    // Get client information
    const ipAddress = request.headers.get('x-forwarded-for') 
      || request.headers.get('x-real-ip') 
      || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    const contactMessage = new ContactMessage({
      ...body,
      ipAddress,
      userAgent
    })
    
    await contactMessage.save()
    
    return NextResponse.json({
      success: true,
      data: {
        id: contactMessage._id,
        name: contactMessage.name,
        createdAt: contactMessage.createdAt
      },
      message: 'Message sent successfully'
    }, { status: 201 })
    
  } catch (error: any) {
    console.error('Create Contact Message Error:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation error',
          details: errors
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send message' 
      },
      { status: 500 }
    )
  }
}