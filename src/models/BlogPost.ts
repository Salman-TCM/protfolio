import mongoose, { Schema, Document } from 'mongoose'
import { BlogPost } from '@/types'

interface BlogPostDocument extends Document {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  tags: string[]
  readTime: number
  published: boolean
}

const BlogPostSchema = new Schema<BlogPostDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 500,
    },
    date: {
      type: String,
      required: true,
    },
    tags: [{
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    }],
    readTime: {
      type: Number,
      required: true,
      min: 1,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

BlogPostSchema.index({ published: 1, createdAt: -1 })
BlogPostSchema.index({ tags: 1 })
BlogPostSchema.index({ title: 'text', content: 'text' })

export default mongoose.models.BlogPost || mongoose.model<BlogPostDocument>('BlogPost', BlogPostSchema)