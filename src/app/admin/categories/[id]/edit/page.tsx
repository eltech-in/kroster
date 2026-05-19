import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CategoryForm } from '@/components/admin/CategoryForm'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = await prisma.category.findUnique({ where: { id } })
  if (!category) notFound()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-['Playfair_Display']">Edit Category</h1>
      </div>
      <div className="glass rounded-2xl p-6 border border-white/10">
        <CategoryForm initialData={category} />
      </div>
    </div>
  )
}
