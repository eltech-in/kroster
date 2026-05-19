import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { MemberForm } from '@/components/admin/MemberForm'

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [member, categories] = await Promise.all([
    prisma.member.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } })
  ])
  
  if (!member) notFound()

  // Null checks for react-hook-form string fields
  const cleanMember = {
    ...member,
    phone: member.phone || '',
    whatsapp: member.whatsapp || '',
    email: member.email || '',
    website: member.website || '',
    shortIntro: member.shortIntro || '',
    fullDescription: member.fullDescription || '',
    address: member.address || '',
    profileImage: member.profileImage || '',
    categoryId: member.categoryId || '',
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-['Playfair_Display']">Edit Member</h1>
      </div>
      <div className="glass rounded-2xl p-6 border border-white/10">
        <MemberForm initialData={cleanMember} categories={categories} />
      </div>
    </div>
  )
}
