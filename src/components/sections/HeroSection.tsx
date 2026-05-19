'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Users, TrendingUp, Award, Zap, Search, X } from 'lucide-react'

const stats = [
  { label: 'Active Members', value: '50+', icon: Users, color: '#B61F2B' },
  { label: 'Referrals Passed', value: '2Cr+', icon: TrendingUp, color: '#D4AF37' },
  { label: 'Years Active', value: '5+', icon: Award, color: '#818cf8' },
  { label: 'Business Categories', value: '40+', icon: Zap, color: '#38bdf8' },
]

const floating = [
  { name: 'Rahul Sharma', biz: 'IT Solutions', avatar: 'R', color: '#B61F2B', side: 'left' as const, top: '28%' },
  { name: 'Priya Patel', biz: 'Legal Services', avatar: 'P', color: '#7A111B', side: 'left' as const, top: '58%' },
  { name: 'Amit Gupta', biz: 'Real Estate', avatar: 'A', color: '#D4AF37', side: 'right' as const, top: '32%' },
]

export function HeroSection({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleChange = (v: string) => {
    setQuery(v)
    onSearch(v)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #2a0a0d 0%, #0A0A0A 60%)',
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }} />

      {/* Center glow */}
      <div style={{
        position: 'absolute',
        top: '45%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(182,31,43,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '20%', right: '20%',
        width: 350, height: 350,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Floating cards – desktop only */}
      {mounted && floating.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: f.side === 'left' ? -30 : 30 }}
          animate={{ opacity: 0.75, x: 0, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 + i * 0.25 },
            y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 },
          }}
          style={{
            position: 'absolute',
            top: f.top,
            ...(f.side === 'left' ? { left: 40 } : { right: 40 }),
            display: 'none',
            alignItems: 'center',
            gap: 12,
            padding: '14px 18px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            minWidth: 200,
          } as React.CSSProperties}
          className="hero-float-card"
        >
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: `linear-gradient(135deg, ${f.color}, #0A0A0A)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 16,
            fontFamily: '"Playfair Display", serif',
          }}>
            {f.avatar}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{f.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, marginTop: 2 }}>{f.biz}</div>
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, width: '100%',
        margin: '0 auto', padding: '96px 24px 64px',
        textAlign: 'center',
      }}>

        {/* Chapter badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 999,
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.25)',
            color: '#D4AF37', fontSize: 13, fontWeight: 600,
            marginBottom: 28, letterSpacing: '0.04em',
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#D4AF37', flexShrink: 0,
            boxShadow: '0 0 8px #D4AF37',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          BNI Krypton Chapter — Nagpur
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 800,
            color: '#ffffff',
            fontFamily: '"Playfair Display", serif',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: 24,
            maxWidth: 900,
            margin: '0 auto 24px',
          }}
        >
          Connect With Trusted{' '}
          <span style={{
            background: 'linear-gradient(135deg, #B61F2B 0%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            BNI Krypton
          </span>{' '}
          Businesses
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}
        >
          Discover verified professionals, services, and referral partners in Nagpur&apos;s
          most elite business networking chapter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}
        >
          <a href="#members" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 14,
            background: 'linear-gradient(135deg, #B61F2B 0%, #7A111B 100%)',
            color: '#fff', fontWeight: 700, fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(182,31,43,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.2s ease',
          }}>
            Explore Members <ArrowRight size={16} />
          </a>
          <a href="https://bni.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 14,
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: 15,
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease',
          }}>
            Join Network
          </a>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ maxWidth: 600, margin: '0 auto 16px', position: 'relative' }}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}>
            <Search size={17} style={{ position: 'absolute', left: 18, color: 'rgba(255,255,255,0.35)', flexShrink: 0 }} />
            <input
              type="search"
              value={query}
              onChange={e => handleChange(e.target.value)}
              placeholder="Search members, businesses, categories..."
              style={{
                width: '100%',
                padding: '18px 52px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
              }}
            />
            {query && (
              <button onClick={handleClear} style={{
                position: 'absolute', right: 16,
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.4)', padding: 4,
                display: 'flex', alignItems: 'center',
              }}>
                <X size={16} />
              </button>
            )}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 10, letterSpacing: '0.03em' }}>
            Try searching: &ldquo;IT&rdquo;, &ldquo;Real Estate&rdquo;, &ldquo;Legal&rdquo;...
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 14,
            maxWidth: 680,
            margin: '48px auto 0',
          }}
        >
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{
              padding: '20px 16px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              textAlign: 'center',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, margin: '0 auto 10px',
                background: `${color}18`,
                border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div style={{
                fontSize: 26, fontWeight: 800, color: '#fff',
                fontFamily: '"Playfair Display", serif',
                lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 6, letterSpacing: '0.05em' }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute', bottom: 32,
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1, height: 36,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
          }}
        />
      </motion.div>

      {/* Show floating cards on desktop via global style */}
      <style>{`
        @media (min-width: 1024px) {
          .hero-float-card { display: flex !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        input[type="search"]::-webkit-search-cancel-button { display: none; }
        input::placeholder { color: rgba(255,255,255,0.28) !important; }
      `}</style>
    </section>
  )
}
