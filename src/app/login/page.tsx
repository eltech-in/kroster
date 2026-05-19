'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      const result = await signIn('nodemailer', {
        email,
        redirect: false,
        callbackUrl: '/',
      })

      if (result?.error) {
        setError('Failed to send login email. Please try again.')
      } else {
        setSent(true)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B61F2B]/8 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B61F2B] to-[#7A111B] flex items-center justify-center shadow-xl">
              <span className="text-white font-bold">BNI</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-lg">BNI Krypton</div>
              <div className="text-white/40 text-xs">Member Portal</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
          {!sent ? (
            <>
              <h1 className="text-2xl font-bold text-white text-center mb-2 font-['Playfair_Display']">
                Welcome Back
              </h1>
              <p className="text-white/50 text-center text-sm mb-8">
                Enter your email to receive a secure login link.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B61F2B]/50 focus:ring-2 focus:ring-[#B61F2B]/20 transition-all"
                    aria-label="Email address"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full h-12 bg-gradient-to-r from-[#B61F2B] to-[#7A111B] hover:from-[#D4404E] hover:to-[#9A1520] text-white border-0 rounded-xl font-semibold text-base shadow-xl shadow-red-900/30 disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                  ) : (
                    <>Send Login Link <ArrowRight className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
              </form>

              <p className="text-center text-white/30 text-xs mt-6">
                No password needed. We&apos;ll send you a secure link.
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 font-['Playfair_Display']">Check Your Email</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                We&apos;ve sent a login link to <span className="text-white">{email}</span>.
                Click the link in your email to sign in.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                Use a different email
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            &larr; Back to directory
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
