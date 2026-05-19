'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogIn, LayoutDashboard } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#members', label: 'Members' },
  { href: '/#events', label: 'Events' },
  { href: '/categories', label: 'Categories' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navBg = scrolled || mobileOpen
    ? 'rgba(10,10,10,0.92)'
    : 'transparent'

  const borderBottom = scrolled || mobileOpen
    ? '1px solid rgba(255,255,255,0.08)'
    : '1px solid transparent'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 50,
          background: navBg,
          borderBottom,
          backdropFilter: scrolled || mobileOpen ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled || mobileOpen ? 'blur(24px)' : 'none',
          transition: 'background 0.3s ease, border-color 0.3s ease',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
        } as React.CSSProperties}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', zIndex: 50 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, #B61F2B, #7A111B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(182,31,43,0.4)',
                position: 'relative',
                flexShrink: 0,
              }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, fontFamily: '"Playfair Display", serif' }}>BNI</span>
                <div style={{
                  position: 'absolute', top: -2, right: -2,
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#D4AF37',
                  border: '2px solid #0A0A0A',
                }} />
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>BNI Krypton</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>Business Network</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: 'none', alignItems: 'center', gap: 4 }} className="desktop-nav">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} style={{
                  position: 'relative',
                  padding: '8px 16px',
                  borderRadius: 10,
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = '#fff';
                    (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                    (e.target as HTMLElement).style.background = 'transparent'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div style={{ display: 'none', alignItems: 'center', gap: 10 }} className="desktop-actions">
              <Link href="/login" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 10,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 13, fontWeight: 600,
                textDecoration: 'none',
              }}>
                <LogIn size={14} /> Login
              </Link>
              <Link href="/admin" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 10,
                background: 'linear-gradient(135deg, #B61F2B, #7A111B)',
                color: '#fff',
                fontSize: 13, fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(182,31,43,0.35)',
              }}>
                <LayoutDashboard size={14} /> Dashboard
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', cursor: 'pointer', zIndex: 50,
              }}
              className="mobile-toggle"
            >
              <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
              zIndex: 40,
              background: 'rgba(10,10,10,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              padding: '32px 24px',
              display: 'flex', flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '18px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: 26,
                      fontWeight: 700,
                      fontFamily: '"Playfair Display", serif',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 24 }}
            >
              <Link href="/login" onClick={() => setMobileOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px', borderRadius: 14,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: 15, fontWeight: 600,
                textDecoration: 'none',
              }}>
                <LogIn size={16} /> Login
              </Link>
              <Link href="/admin" onClick={() => setMobileOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px', borderRadius: 14,
                background: 'linear-gradient(135deg, #B61F2B, #7A111B)',
                color: '#fff', fontSize: 15, fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(182,31,43,0.4)',
              }}>
                <LayoutDashboard size={16} /> Admin Dashboard
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  )
}
