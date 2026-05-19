'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  type?: 'profile' | 'gallery'
  name: string // used for generating the filename
  label?: string
}

export function ImageUpload({ value, onChange, type = 'profile', name, label = 'Upload Image' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      toast.error('Invalid file type. Please upload a JPG, PNG, WEBP, or AVIF image.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Max size is 5MB.')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    formData.append('name', name)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to upload image')
      }

      const data = await res.json()
      onChange(data.url)
      toast.success('Image uploaded successfully')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-white/80">{label}</div>
      
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-square max-w-[200px]">
          <Image src={value} alt="Uploaded" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={() => onChange('')}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`relative rounded-xl border-2 border-dashed transition-all p-8 flex flex-col items-center justify-center gap-3 cursor-pointer
            ${dragActive ? 'border-[#B61F2B] bg-[#B61F2B]/10' : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(e) => {
              if (e.target.files?.[0]) handleUpload(e.target.files[0])
            }}
            disabled={isUploading}
          />
          
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60">
            {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
          </div>
          
          <div className="text-center">
            <p className="text-sm font-medium text-white">
              {isUploading ? 'Uploading...' : 'Click or drag image to upload'}
            </p>
            <p className="text-xs text-white/50 mt-1">
              JPG, PNG, WEBP (Max 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
