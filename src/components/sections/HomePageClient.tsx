'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Shield, Star, Users, Filter, X, Search, Phone, MessageCircle, Globe, User } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { StickySearchBar } from '@/components/search/StickySearchBar'
import { EventsSection } from '@/components/sections/EventsSection'
import Image from 'next/image'
import Link from 'next/link'
import type { Member, Event } from '@prisma/client'

type MemberWithCategory = Member & {
  category?: { name: string; slug: string } | null
}

type Props = {
  eds: MemberWithCategory[]
  support: MemberWithCategory[]
  headTable: MemberWithCategory[]
  members: MemberWithCategory[]
  events: Event[]
}

// ── Inline MemberCard to guarantee styles ──────────────────────────────────
function MCard({ m, gold }: { m: MemberWithCategory; gold?: boolean }) {
  const initials = m.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const waUrl = m.whatsapp
    ? `https://wa.me/${m.whatsapp.replace(/[^0-9]/g, '')}`
    : null

  return (
    <div
      style={{
        background: gold
          ? 'linear-gradient(135deg, rgba(212,175,55,0.10) 0%, rgba(122,17,27,0.12) 100%)'
          : 'rgba(255,255,255,0.03)',
        border: gold ? '1px solid rgba(212,175,55,0.25)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 20,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: gold
          ? 'linear-gradient(90deg, #D4AF37, #B61F2B)'
          : 'linear-gradient(90deg, #B61F2B, transparent)',
        opacity: 0.6,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
        {/* Avatar */}
        <div style={{
          width: 52, height: 52, borderRadius: 14, overflow: 'hidden', flexShrink: 0,
          background: 'linear-gradient(135deg, #B61F2B 0%, #7A111B 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: gold ? '2px solid rgba(212,175,55,0.3)' : '2px solid rgba(255,255,255,0.08)',
          position: 'relative',
        }}>
          {m.profileImage ? (
            <Image src={m.profileImage} alt={m.fullName} fill style={{ objectFit: 'cover' }} />
          ) : (
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: 'Playfair Display, serif' }}>
              {initials}
            </span>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 15,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {m.fullName}
          </div>
          <div style={{
            color: gold ? '#D4AF37' : 'rgba(255,255,255,0.5)',
            fontSize: 12,
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginTop: 2,
          }}>
            {m.businessName}
          </div>
          {m.category && (
            <div style={{
              display: 'inline-block',
              marginTop: 6,
              padding: '2px 8px',
              borderRadius: 6,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.45)',
              fontSize: 11,
              fontWeight: 500,
            }}>
              {m.category.name}
            </div>
          )}
        </div>
      </div>

      {m.shortIntro && (
        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: 12,
          lineHeight: 1.6,
          marginBottom: 14,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as React.CSSProperties}>
          {m.shortIntro}
        </p>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {m.phone && (
          <a href={`tel:${m.phone}`} style={{
            flex: 1,
            minWidth: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            padding: '7px 10px',
            borderRadius: 10,
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.15)',
            color: '#4ade80',
            fontSize: 11,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            <Phone size={11} /> Call
          </a>
        )}
        {waUrl && (
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
            flex: 1,
            minWidth: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            padding: '7px 10px',
            borderRadius: 10,
            background: 'rgba(37,211,102,0.08)',
            border: '1px solid rgba(37,211,102,0.15)',
            color: '#25D366',
            fontSize: 11,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            <MessageCircle size={11} /> WhatsApp
          </a>
        )}
        {m.website && (
          <a href={m.website} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '7px 10px',
            borderRadius: 10,
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.15)',
            color: '#818cf8',
            fontSize: 11,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            <Globe size={11} />
          </a>
        )}
        <Link href={`/members/${m.slug}`} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          padding: '7px 12px',
          borderRadius: 10,
          background: 'linear-gradient(135deg, #B61F2B, #7A111B)',
          color: '#fff',
          fontSize: 11,
          fontWeight: 700,
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(182,31,43,0.3)',
        }}>
          <User size={11} /> Profile
        </Link>
      </div>
    </div>
  )
}

// ── Section Header ─────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, subtitle, color, count }: {
  icon: React.ElementType
  title: string
  subtitle: string
  color: string
  count: number
}) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 56 }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 24px',
        borderRadius: 999,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        color,
        fontSize: 13,
        fontWeight: 700,
        marginBottom: 20,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        <Icon size={14} />
        {subtitle}
      </div>
      <h2 style={{
        fontSize: 'clamp(36px, 5vw, 60px)',
        fontWeight: 800,
        color: '#ffffff',
        fontFamily: '"Playfair Display", serif',
        lineHeight: 1.1,
        marginBottom: 16,
      }}>
        {title}
      </h2>
      <div style={{
        width: 80,
        height: 3,
        borderRadius: 4,
        margin: '0 auto 12px',
        background: `linear-gradient(90deg, ${color}, #D4AF37)`,
      }} />
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {count} {count === 1 ? 'Professional' : 'Professionals'}
      </p>
    </div>
  )
}

// ── Filter Chip ────────────────────────────────────────────────────────────
function FilterChip({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '9px 18px',
        borderRadius: 999,
        border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.12)',
        background: active
          ? 'linear-gradient(135deg, #B61F2B, #7A111B)'
          : 'rgba(255,255,255,0.04)',
        color: active ? '#ffffff' : 'rgba(255,255,255,0.65)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: active ? '0 4px 16px rgba(182,31,43,0.35)' : 'none',
        transform: active ? 'scale(1.03)' : 'scale(1)',
        flexShrink: 0,
      }}
    >
      {label}
      <span style={{
        fontSize: 11,
        fontWeight: 700,
        padding: '1px 7px',
        borderRadius: 999,
        background: active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
        color: active ? '#fff' : 'rgba(255,255,255,0.45)',
      }}>
        {count}
      </span>
    </button>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export function HomePageClient({ eds, support, headTable, members, events }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const allMembersList = useMemo(() => [...eds, ...support, ...headTable, ...members], [eds, support, headTable, members])

  const categories = useMemo(() => {
    const cats = new Map<string, number>()
    allMembersList.forEach(m => {
      if (m.category?.name) cats.set(m.category.name, (cats.get(m.category.name) || 0) + 1)
    })
    return Array.from(cats.entries()).sort((a, b) => b[1] - a[1])
  }, [allMembersList])

  const filterMembers = useCallback((list: MemberWithCategory[]) =>
    list.filter(m => {
      const q = searchQuery.toLowerCase().trim()
      const matchSearch = !q ||
        m.fullName.toLowerCase().includes(q) ||
        m.businessName.toLowerCase().includes(q) ||
        m.category?.name.toLowerCase().includes(q) ||
        m.shortIntro?.toLowerCase().includes(q)
      const matchCat = !selectedCategory || m.category?.name === selectedCategory
      return matchSearch && matchCat
    }),
  [searchQuery, selectedCategory])

  const fEDs = filterMembers(eds)
  const fSupport = filterMembers(support)
  const fHead = filterMembers(headTable)
  const fMembers = filterMembers(members)
  const total = fEDs.length + fSupport.length + fHead.length + fMembers.length
  const isFiltering = !!searchQuery || !!selectedCategory

  const clearFilters = () => { setSearchQuery(''); setSelectedCategory(null) }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <HeroSection onSearch={setSearchQuery} />

      <StickySearchBar
        onSearch={setSearchQuery}
        value={searchQuery}
        categories={categories.map(([n]) => n)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* ══ FILTER SECTION ══════════════════════════════════════════════ */}
      <div id="members" style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(182,31,43,0.3)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #B61F2B, #7A111B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(182,31,43,0.4)',
              }}>
                <Filter size={16} color="#fff" />
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>Browse by Category</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
                  {categories.length} categories · {allMembersList.length} members
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isFiltering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                >
                  <button onClick={clearFilters} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 10,
                    border: '1px solid rgba(239,68,68,0.25)',
                    background: 'rgba(239,68,68,0.08)',
                    color: '#f87171',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}>
                    <X size={13} /> Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <FilterChip
              label="All Members"
              count={allMembersList.length}
              active={!selectedCategory}
              onClick={() => setSelectedCategory(null)}
            />
            {categories.map(([cat, count]) => (
              <FilterChip
                key={cat}
                label={cat}
                count={count}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              />
            ))}
          </div>

          {/* Active filter info */}
          <AnimatePresence>
            {isFiltering && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                style={{
                  marginTop: 16,
                  padding: '10px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 13,
                }}
              >
                <Search size={13} style={{ flexShrink: 0 }} />
                <span>
                  Showing <strong style={{ color: '#fff' }}>{total}</strong> result{total !== 1 ? 's' : ''}
                  {searchQuery && <> for <strong style={{ color: '#D4AF37' }}>&ldquo;{searchQuery}&rdquo;</strong></>}
                  {selectedCategory && <> in <strong style={{ color: '#E85464' }}>{selectedCategory}</strong></>}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ══ MEMBER SECTIONS ═════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 24px' }}>

        {/* ── EDs ── */}
        <AnimatePresence mode="popLayout">
          {fEDs.length > 0 && (
            <motion.section key="eds" layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 100 }}>
              <SectionHeader icon={Crown} title="Executive Directors" subtitle="Chapter Leadership" color="#D4AF37" count={fEDs.length} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 500px), 1fr))', gap: 20 }}>
                <AnimatePresence mode="popLayout">
                  {fEDs.map((m, i) => (
                    <motion.div key={m.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.07, duration: 0.35 }}>
                      <MCard m={m} gold />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Support ── */}
        <AnimatePresence mode="popLayout">
          {fSupport.length > 0 && (
            <motion.section key="support" layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 100 }}>
              <SectionHeader icon={Shield} title="Support Team" subtitle="Chapter Support" color="#E85464" count={fSupport.length} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 18 }}>
                <AnimatePresence mode="popLayout">
                  {fSupport.map((m, i) => (
                    <motion.div key={m.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.06, duration: 0.35 }}>
                      <MCard m={m} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Head Table ── */}
        <AnimatePresence mode="popLayout">
          {fHead.length > 0 && (
            <motion.section key="headtable" layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 100 }}>
              <SectionHeader icon={Star} title="Head Table" subtitle="Chapter Leaders" color="#818cf8" count={fHead.length} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
                <AnimatePresence mode="popLayout">
                  {fHead.map((m, i) => (
                    <motion.div key={m.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05, duration: 0.35 }}>
                      <MCard m={m} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── All Members ── */}
        <AnimatePresence mode="popLayout">
          {fMembers.length > 0 && (
            <motion.section key="members" layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <SectionHeader icon={Users} title="All Members" subtitle="Active Professionals" color="#38bdf8" count={fMembers.length} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
                <AnimatePresence mode="popLayout">
                  {fMembers.map((m, i) => (
                    <motion.div key={m.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04, duration: 0.3 }}>
                      <MCard m={m} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Empty ── */}
        <AnimatePresence>
          {total === 0 && isFiltering && (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                textAlign: 'center',
                padding: '120px 24px',
                borderRadius: 24,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ fontSize: 72, marginBottom: 20 }}>🔍</div>
              <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 800, fontFamily: '"Playfair Display", serif', marginBottom: 12 }}>
                No members found
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, marginBottom: 32 }}>
                Try adjusting your search or selecting a different category.
              </p>
              <button onClick={clearFilters} style={{
                padding: '12px 32px', borderRadius: 999,
                background: 'linear-gradient(135deg, #B61F2B, #7A111B)',
                color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                border: 'none',
                boxShadow: '0 8px 24px rgba(182,31,43,0.4)',
              }}>
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <EventsSection events={events} />
    </div>
  )
}
