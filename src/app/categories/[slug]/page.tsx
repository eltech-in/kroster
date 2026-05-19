import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MemberCard } from '@/components/members/MemberCard'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      members: {
        where: { isActive: true },
        include: { category: { select: { name: true, slug: true } } },
        orderBy: [{ memberRole: 'asc' }, { displayOrder: 'asc' }, { fullName: 'asc' }]
      }
    }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) return { title: 'Category Not Found' }
  
  return {
    title: `${category.name} Members`,
    description: category.description || `Browse BNI Krypton members in the ${category.name} category.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
        <div className="container-main">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                {category.description}
              </p>
            )}
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="px-4 py-2 rounded-full glass border border-white/10 text-white/80 text-sm font-medium">
                {category.members.length} Members
              </span>
            </div>
          </div>

          {/* Members Grid */}
          {category.members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.members.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-3xl border border-white/10">
              <p className="text-white/50 text-lg">No members found in this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
