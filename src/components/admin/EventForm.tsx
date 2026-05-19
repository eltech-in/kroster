'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { createEvent, updateEvent } from '@/app/admin/actions'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  eventDate: z.string().min(1, 'Event date is required'),
  location: z.string().optional(),
  image: z.string().optional(),
  isPublished: z.boolean(),
})

type FormData = z.infer<typeof schema>

export function EventForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      ...initialData,
      eventDate: new Date(initialData.eventDate).toISOString().slice(0, 16) // Format for datetime-local
    } : { title: '', description: '', location: '', image: '', isPublished: true, eventDate: '' },
  })

  const image = watch('image')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const payload = { ...data, eventDate: new Date(data.eventDate) }
      if (initialData?.id) {
        await updateEvent(initialData.id, payload)
        toast.success('Event updated')
      } else {
        await createEvent(payload)
        toast.success('Event created')
      }
      router.push('/admin/events')
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white/80">Title</label>
            <input
              {...register('title')}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-white/80">Date & Time</label>
            <input
              type="datetime-local"
              {...register('eventDate')}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]"
            />
            {errors.eventDate && <p className="text-red-400 text-xs mt-1">{errors.eventDate.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-white/80">Location</label>
            <input
              {...register('location')}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]"
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="isPublished" {...register('isPublished')} className="w-4 h-4 rounded border-white/10 bg-white/5" />
            <label htmlFor="isPublished" className="text-sm text-white/80">Published</label>
          </div>
        </div>

        <div className="space-y-4">
          <ImageUpload
            name="event"
            type="gallery"
            label="Event Image (Optional)"
            value={image}
            onChange={(url) => setValue('image', url)}
          />

          <div>
            <label className="text-sm font-medium text-white/80">Description</label>
            <textarea
              {...register('description')}
              rows={5}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/events')} className="bg-transparent border-white/10 text-white/60">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-[#B61F2B] hover:bg-[#7A111B] text-white">
          {isSubmitting ? 'Saving...' : 'Save Event'}
        </Button>
      </div>
    </form>
  )
}
