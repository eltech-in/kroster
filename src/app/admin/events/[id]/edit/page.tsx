import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { EventForm } from '@/components/admin/EventForm'

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) notFound()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-['Playfair_Display']">Edit Event</h1>
      </div>
      <div className="glass rounded-2xl p-6 border border-white/10">
        <EventForm initialData={event} />
      </div>
    </div>
  )
}
