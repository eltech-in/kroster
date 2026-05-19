import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getMemberRoleLabel, getWhatsAppUrl } from '@/lib/utils'
import { Phone, MessageCircle, Globe, Mail, MapPin, Crown, Shield, Star, Users, Share2, Download, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

async function getMember(slug: string) {
  return prisma.member.findUnique({
    where: { slug, isActive: true },
    include: {
      category: true,
      testimonials: { where: { isPublic: true }, orderBy: { createdAt: 'desc' } },
      analytics: true,
    },
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const member = await getMember(slug)
  if (!member) return { title: 'Member Not Found' }
  return {
    title: `${member.fullName} — ${member.businessName}`,
    description: member.shortIntro ?? `${member.fullName} is a member of BNI Krypton, Nagpur.`,
    openGraph: {
      title: `${member.fullName} | BNI Krypton`,
      description: member.shortIntro ?? '',
      images: member.profileImage ? [{ url: member.profileImage }] : [],
    },
  }
}

const roleIcons = {
  ED: Crown,
  SUPPORT: Shield,
  HEAD_TABLE: Star,
  MEMBER: Users,
}

const roleBadgeClass = {
  ED: 'badge-ed',
  SUPPORT: 'badge-support',
  HEAD_TABLE: 'badge-headtable',
  MEMBER: 'badge-member',
}

export default async function MemberProfilePage({ params }: Props) {
  const { slug } = await params
  const member = await getMember(slug)
  if (!member) notFound()

  const RoleIcon = roleIcons[member.memberRole] ?? Users
  const vcfUrl = `/api/members/${member.slug}/vcf`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Person', 'LocalBusiness'],
    name: member.fullName,
    jobTitle: getMemberRoleLabel(member.memberRole),
    worksFor: {
      '@type': 'Organization',
      name: member.businessName
    },
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://krypton.bni-nagpur.in'}/members/${member.slug}`,
    image: member.profileImage || '',
    description: member.shortIntro || '',
    telephone: member.phone || '',
    email: member.email || '',
    address: member.address || '',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-20">
        {/* Cover Banner */}
        <div className="relative h-48 md:h-64 bg-gradient-to-br from-[#B61F2B]/30 via-[#111111] to-[#7A111B]/20 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#B61F2B]/10 blur-[80px]" />
        </div>

        <div className="container-main">
          {/* Profile Header */}
          <div className="relative -mt-20 mb-8">
            <div className="glass rounded-3xl p-6 md:p-8 border border-white/10">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Profile Photo */}
                <div className="relative flex-shrink-0">
                  <div className={`w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 shadow-2xl ${member.memberRole === 'ED' ? 'border-[#D4AF37]/50' : 'border-white/10'}`}>
                    {member.profileImage ? (
                      <Image src={member.profileImage} alt={member.fullName} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#B61F2B]/30 to-[#7A111B]/20">
                        <span className="text-white font-bold text-5xl font-['Playfair_Display']">{member.fullName.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name & Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${roleBadgeClass[member.memberRole]}`}>
                        <RoleIcon className="w-3 h-3" />
                        {getMemberRoleLabel(member.memberRole)}
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold text-white font-['Playfair_Display']">
                        {member.fullName}
                      </h1>
                      <p className="text-[#D4AF37] font-semibold text-lg mt-1">{member.businessName}</p>
                      {member.category && (
                        <span className="inline-block mt-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50 text-sm">
                          {member.category.name}
                        </span>
                      )}
                    </div>

                    {/* Share / Back */}
                    <div className="flex gap-2">
                      <Link href="/">
                        <Button variant="outline" size="sm" className="border-white/10 text-white/60 bg-white/5">
                          <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {member.phone && (
                      <a href={`tel:${member.phone}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 text-sm font-medium transition-all border border-green-500/20">
                        <Phone className="w-4 h-4" /> {member.phone}
                      </a>
                    )}
                    {member.whatsapp && (
                      <a href={getWhatsAppUrl(member.whatsapp)} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-sm font-medium transition-all border border-[#25D366]/20">
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-sm font-medium transition-all border border-blue-500/20">
                        <Mail className="w-4 h-4" /> Email
                      </a>
                    )}
                    {member.website && (
                      <a href={member.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-sm font-medium transition-all border border-purple-500/20">
                        <Globe className="w-4 h-4" /> Website
                      </a>
                    )}
                    <a href={vcfUrl}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium transition-all border border-[#D4AF37]/20">
                      <Download className="w-4 h-4" /> Save Contact
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              {member.fullDescription && (
                <div className="glass rounded-2xl p-6 border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-3">About</h2>
                  <p className="text-white/60 leading-relaxed">{member.fullDescription}</p>
                </div>
              )}

              {/* Services */}
              {member.services && (
                <div className="glass rounded-2xl p-6 border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-3">Services</h2>
                  <p className="text-white/60 leading-relaxed whitespace-pre-line">{member.services}</p>
                </div>
              )}

              {/* Referral Expectations */}
              {member.referralExpectation && (
                <div className="glass rounded-2xl p-6 border border-white/10 border-l-2 border-l-[#D4AF37]">
                  <h2 className="text-lg font-semibold text-white mb-3">Looking For Referrals In</h2>
                  <p className="text-white/60 leading-relaxed">{member.referralExpectation}</p>
                </div>
              )}

              {/* Testimonials */}
              {member.testimonials.length > 0 && (
                <div className="glass rounded-2xl p-6 border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-4">Testimonials</h2>
                  <div className="space-y-4">
                    {member.testimonials.map((t) => (
                      <div key={t.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-white/70 text-sm italic leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#B61F2B]/30 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{t.authorName.charAt(0)}</span>
                          </div>
                          <span className="text-white/50 text-xs font-medium">{t.authorName}</span>
                          <div className="flex gap-0.5 ml-auto">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h2 className="text-base font-semibold text-white mb-4">Contact Details</h2>
                <ul className="space-y-3">
                  {member.address && (
                    <li className="flex gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-[#B61F2B] flex-shrink-0 mt-0.5" />
                      <span className="text-white/60">{member.address}</span>
                    </li>
                  )}
                  {member.email && (
                    <li className="flex gap-3 text-sm">
                      <Mail className="w-4 h-4 text-[#B61F2B] flex-shrink-0" />
                      <a href={`mailto:${member.email}`} className="text-white/60 hover:text-white truncate">{member.email}</a>
                    </li>
                  )}
                  {member.businessTiming && (
                    <li className="flex gap-3 text-sm">
                      <Star className="w-4 h-4 text-[#B61F2B] flex-shrink-0" />
                      <span className="text-white/60">{member.businessTiming}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Social Links */}
              {(member.linkedin || member.facebook || member.instagram || member.youtube) && (
                <div className="glass rounded-2xl p-6 border border-white/10">
                  <h2 className="text-base font-semibold text-white mb-4">Social Media</h2>
                  <div className="flex gap-3 flex-wrap">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-[#0A66C2]/20 text-[#0A66C2] text-xs font-medium border border-[#0A66C2]/30 hover:bg-[#0A66C2]/30 transition-colors">
                        LinkedIn
                      </a>
                    )}
                    {member.facebook && (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-[#1877F2]/20 text-[#1877F2] text-xs font-medium border border-[#1877F2]/30 hover:bg-[#1877F2]/30 transition-colors">
                        Facebook
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-[#E1306C]/20 text-[#E1306C] text-xs font-medium border border-[#E1306C]/30 hover:bg-[#E1306C]/30 transition-colors">
                        Instagram
                      </a>
                    )}
                    {member.youtube && (
                      <a href={member.youtube} target="_blank" rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-[#FF0000]/20 text-[#FF0000] text-xs font-medium border border-[#FF0000]/30 hover:bg-[#FF0000]/30 transition-colors">
                        YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* BNI Badge */}
              <div className="glass-gold rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B61F2B] to-[#7A111B] flex items-center justify-center">
                    <span className="text-white font-bold text-xs">BNI</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">BNI Krypton</div>
                    <div className="text-white/40 text-xs">Nagpur Chapter</div>
                  </div>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  This member is part of BNI Krypton, a premier business networking chapter in Nagpur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
