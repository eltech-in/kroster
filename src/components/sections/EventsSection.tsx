import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { Event } from '@prisma/client'

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date))
}

export function EventsSection({ events }: { events: Event[] }) {
  if (!events.length) return null

  return (
    <section id="events" className="py-24 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#0D0305] to-[#111111] pointer-events-none" />

      <div className="container-main relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B61F2B]/10 border border-[#B61F2B]/20 text-[#B61F2B] text-sm font-semibold mb-4">
            <Calendar className="w-4 h-4" />
            Upcoming Events
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display']">
            Connect at Our Events
          </h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">
            Join weekly BNI meetings and special chapter events to grow your referral network.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="glass rounded-2xl overflow-hidden premium-card group"
            >
              {/* Event image or placeholder */}
              <div className="h-40 bg-gradient-to-br from-[#B61F2B]/20 to-[#7A111B]/10 relative overflow-hidden">
                {event.image ? (
                  <Image src={event.image} alt={event.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-white/10" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <div className="glass rounded-xl px-3 py-2 text-center min-w-[3rem]">
                    <div className="text-[#D4AF37] font-bold text-lg leading-none">
                      {new Date(event.eventDate).getDate()}
                    </div>
                    <div className="text-white/50 text-xs">
                      {new Date(event.eventDate).toLocaleString('en', { month: 'short' })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{formatEventDate(event.eventDate)}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                )}
                {event.description && (
                  <p className="text-white/40 text-sm line-clamp-2 mb-4">{event.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
