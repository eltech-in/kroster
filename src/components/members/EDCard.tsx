'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Globe, User, Crown, ExternalLink } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'
import type { MemberCardData } from '@/types'

export function EDCard({ member, index = 0 }: { member: MemberCardData; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative rounded-3xl p-6 glass-gold glow-gold premium-card overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#D4AF37]/5 -translate-y-32 translate-x-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#B61F2B]/5 translate-y-16 -translate-x-16 pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-xl">
            {member.profileImage ? (
              <Image
                src={member.profileImage}
                alt={member.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/20 to-[#A88B20]/10">
                <span className="text-[#D4AF37] font-bold text-4xl font-['Playfair_Display']">
                  {member.fullName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {/* ED Crown Badge */}
          <div className="mt-3 flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full badge-ed text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3 h-3" />
              Executive Director
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-xl font-bold text-white font-['Playfair_Display']">
                {member.fullName}
              </h3>
              <p className="text-[#D4AF37]/80 font-semibold text-sm mt-0.5">{member.businessName}</p>
            </div>
          </div>

          {member.category && (
            <div className="mt-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]/70 text-xs">
                {member.category.name}
              </span>
            </div>
          )}

          {member.shortIntro && (
            <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
              {member.shortIntro}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 text-sm font-medium transition-all duration-200 border border-green-500/20"
              >
                <Phone className="w-4 h-4" /> Call
              </a>
            )}
            {member.whatsapp && (
              <a
                href={getWhatsAppUrl(member.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-sm font-medium transition-all duration-200 border border-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            )}
            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-sm font-medium transition-all duration-200 border border-blue-500/20"
              >
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
            <Link
              href={`/members/${member.slug}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 to-[#A88B20]/10 hover:from-[#D4AF37]/30 hover:to-[#A88B20]/20 text-[#D4AF37] text-sm font-medium transition-all duration-200 border border-[#D4AF37]/30"
            >
              <User className="w-4 h-4" /> View Profile
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
