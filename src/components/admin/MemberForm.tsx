'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { createMember, updateMember } from '@/app/admin/actions'

const schema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  businessName: z.string().min(1, 'Business name is required'),
  categoryId: z.string().optional(),
  memberRole: z.enum(['ED', 'SUPPORT', 'HEAD_TABLE', 'MEMBER']),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  shortIntro: z.string().optional(),
  fullDescription: z.string().optional(),
  address: z.string().optional(),
  profileImage: z.string().optional(),
  isActive: z.boolean(),
})

type FormData = z.infer<typeof schema>

export function MemberForm({ initialData, categories }: { initialData?: any, categories: any[] }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { 
      fullName: '', businessName: '', memberRole: 'MEMBER', isActive: true,
      phone: '', whatsapp: '', email: '', website: '', shortIntro: '', fullDescription: '', address: '', profileImage: ''
    },
  })

  const profileImage = watch('profileImage')
  const fullName = watch('fullName')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      if (initialData?.id) {
        await updateMember(initialData.id, data)
        toast.success('Member updated')
      } else {
        await createMember(data)
        toast.success('Member created')
      }
      router.push('/admin/members')
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Top Section - Image & Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ImageUpload
            name={fullName || 'member'}
            type="profile"
            label="Profile Image"
            value={profileImage}
            onChange={(url) => setValue('profileImage', url)}
          />
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-white/80">Full Name</label>
              <input {...register('fullName')} className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]" />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-white/80">Business Name</label>
              <input {...register('businessName')} className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]" />
              {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-white/80">Category</label>
              <select {...register('categoryId')} className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B] appearance-none">
                <option value="" className="bg-[#111]">Select Category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#111]">{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-white/80">Role</label>
              <select {...register('memberRole')} className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B] appearance-none">
                <option value="MEMBER" className="bg-[#111]">Member</option>
                <option value="HEAD_TABLE" className="bg-[#111]">Head Table</option>
                <option value="SUPPORT" className="bg-[#111]">Support Team</option>
                <option value="ED" className="bg-[#111]">Executive Director</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="isActive" {...register('isActive')} className="w-4 h-4 rounded border-white/10 bg-white/5" />
            <label htmlFor="isActive" className="text-sm text-white/80">Active Member</label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Info</h3>
          <div>
            <label className="text-sm font-medium text-white/80">Phone</label>
            <input {...register('phone')} className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]" />
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">WhatsApp</label>
            <input {...register('whatsapp')} placeholder="+91..." className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]" />
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Email</label>
            <input {...register('email')} className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Website</label>
            <input {...register('website')} placeholder="https://..." className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Profile Content</h3>
          <div>
            <label className="text-sm font-medium text-white/80">Short Intro (Tagline)</label>
            <input {...register('shortIntro')} className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]" />
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Full Description</label>
            <textarea {...register('fullDescription')} rows={4} className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]" />
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Address</label>
            <textarea {...register('address')} rows={2} className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#B61F2B]" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/members')} className="bg-transparent border-white/10 text-white/60">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-[#B61F2B] hover:bg-[#7A111B] text-white">
          {isSubmitting ? 'Saving...' : 'Save Member'}
        </Button>
      </div>
    </form>
  )
}
