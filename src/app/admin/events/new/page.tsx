import { EventForm } from '@/components/admin/EventForm'

export default function NewEventPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-['Playfair_Display']">Add Event</h1>
      </div>
      <div className="glass rounded-2xl p-6 border border-white/10">
        <EventForm />
      </div>
    </div>
  )
}
