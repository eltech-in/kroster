import { prisma } from '@/lib/prisma'
import { MemberForm } from '@/components/admin/MemberForm'

export default async function NewMemberPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-['Playfair_Display']">Add Member</h1>
      </div>
      <div className="glass rounded-2xl p-6 border border-white/10">
        <MemberForm categories={categories} />
      </div>
    </div>
  )
}
