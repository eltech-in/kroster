'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Globe, User, Crown, Shield, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getWhatsAppUrl, getMemberRoleLabel, truncate } from '@/lib/utils'
import type { MemberCardData } from '@/types'

type MemberCardProps = {
  member: MemberCardData
  variant?: 'default' | 'ed' | 'support' | 'headtable'
  index?: number
}

const roleConfig = {
  ED: {
    badge: 'badge-ed',
    icon: Crown,
    label: 'Executive Director',
    cardClass: 'glass-gold glow-gold',
  },
  SUPPORT: {
    badge: 'badge-support',
    icon: Shield,
    label: 'Support Team',
    cardClass: 'glass-red',
  },
  HEAD_TABLE: {
    badge: 'badge-headtable',
    icon: Star,
    label: 'Head Table',
    cardClass: 'glass',
  },
  MEMBER: {
    badge: 'badge-member',
    icon: User,
    label: 'Member',
    cardClass: 'glass',
  },
}

export function MemberCard({ member, index = 0 }: MemberCardProps) {
  const config = roleConfig[member.memberRole] ?? roleConfig.MEMBER
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl p-5 premium-card cursor-default group ${config.cardClass}`}
    >
      {/* Role badge */}
      <div className="absolute top-4 right-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${config.badge}`}>
          <Icon className="w-3 h-3" />
          {config.label}
        </span>
      </div>

      {/* Profile */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10">
            {member.profileImage ? (
              <Image
                src={member.profileImage}
                alt={member.fullName}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#B61F2B]/30 to-[#7A111B]/20">
                <span className="text-white/60 font-bold text-xl">
                  {member.fullName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {member.featured && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Star className="w-3 h-3 text-black fill-black" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 pr-20">
          <h3 className="font-semibold text-white text-base leading-tight truncate">
            {member.fullName}
          </h3>
          <p className="text-white/60 text-sm truncate mt-0.5">{member.businessName}</p>
          {member.category && (
            <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-white/50">
              {member.category.name}
            </span>
          )}
        </div>
      </div>

      {/* Intro */}
      {member.shortIntro && (
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
          {member.shortIntro}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        {member.phone && (
          <a
            href={`tel:${member.phone}`}
            className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-green-500/20 hover:text-green-400 text-white/60 text-xs font-medium transition-all duration-200 border border-white/10 hover:border-green-500/30"
            aria-label={`Call ${member.fullName}`}
          >
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Call</span>
          </a>
        )}
        {member.whatsapp && (
          <a
            href={getWhatsAppUrl(member.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-[#25D366]/20 hover:text-[#25D366] text-white/60 text-xs font-medium transition-all duration-200 border border-white/10 hover:border-[#25D366]/30"
            aria-label={`WhatsApp ${member.fullName}`}
          >
            <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>
        )}
        {member.website && (
          <a
            href={member.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 text-white/60 text-xs font-medium transition-all duration-200 border border-white/10 hover:border-blue-500/30"
            aria-label={`Visit ${member.businessName} website`}
          >
            <Globe className="w-3.5 h-3.5" />
          </a>
        )}
        <Link
          href={`/members/${member.slug}`}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#B61F2B]/80 to-[#7A111B]/80 hover:from-[#B61F2B] hover:to-[#7A111B] text-white text-xs font-medium transition-all duration-200 border border-[#B61F2B]/30"
          aria-label={`View ${member.fullName}'s profile`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile</span>
        </Link>
      </div>
    </motion.div>
  )
}
