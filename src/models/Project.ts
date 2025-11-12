import mongoose, { Schema, Document } from 'mongoose'
import { Project } from '@/types'

interface ProjectDocument extends Document {
  id: string
  title: string
  description: string
  tech: string[]
  status: 'active' | 'completed' | 'archived'
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  imageUrl?: string
}

const ProjectSchema = new Schema<ProjectDocument>(
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
    description: {
      type: String,
      required: true,
    },
    tech: [{
      type: String,
      required: true,
    }],
    status: {
      type: String,
      enum: ['active', 'completed', 'archived'],
      default: 'active',
    },
    demoUrl: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v)
        },
        message: 'Demo URL must be a valid URL'
      }
    },
    githubUrl: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/(www\.)?github\.com\/.+/.test(v)
        },
        message: 'GitHub URL must be a valid GitHub URL'
      }
    },
    featured: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ProjectSchema.index({ featured: -1, createdAt: -1 })
ProjectSchema.index({ status: 1 })

export default mongoose.models.Project || mongoose.model<ProjectDocument>('Project', ProjectSchema)