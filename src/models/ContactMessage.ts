import mongoose, { Schema, Document } from 'mongoose'
import { ContactMessage } from '@/types'

interface ContactMessageDocument extends Document {
  name: string
  email: string
  message: string
  source: 'terminal' | 'form' | 'api'
  ipAddress?: string
  userAgent?: string
}

const ContactMessageSchema = new Schema<ContactMessageDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        },
        message: 'Please enter a valid email address'
      }
    },
    message: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    source: {
      type: String,
      enum: ['terminal', 'form', 'api'],
      default: 'terminal',
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ContactMessageSchema.index({ createdAt: -1 })
ContactMessageSchema.index({ source: 1 })

export default mongoose.models.ContactMessage || mongoose.model<ContactMessageDocument>('ContactMessage', ContactMessageSchema)