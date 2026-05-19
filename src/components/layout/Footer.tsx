import Link from 'next/link'
import { Users, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#0A0A0A] pt-16 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B61F2B] to-[#7A111B] flex items-center justify-center">
                <span className="text-white font-bold text-sm">BNI</span>
              </div>
              <div>
                <div className="font-bold text-white">BNI Krypton</div>
                <div className="text-xs text-white/40">Business Network</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Nagpur&apos;s premier business networking chapter. Building lasting relationships and
              driving business growth through referrals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '#members', label: 'Browse Members' },
                { href: '#events', label: 'Upcoming Events' },
                { href: '/categories', label: 'Categories' },
                { href: '/login', label: 'Member Login' },
                { href: '/admin', label: 'Admin Panel' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-[#B61F2B] flex-shrink-0" />
                <span>Nagpur, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-[#B61F2B] flex-shrink-0" />
                <a href="mailto:krypton@bni.com" className="hover:text-white transition-colors">
                  krypton@bni.com
                </a>
              </li>
            </ul>
          </div>

          {/* BNI Reference */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Chapter</h4>
            <a
              href="https://bni-nagpur.in/en-IN/chapterdetail?chapterId=7QKJvFtIdz9xPf8f9ZWHIg%3D%3D&name=BNI%20Krypton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#B61F2B]/10 to-[#7A111B]/5 border border-[#B61F2B]/20 text-[#B61F2B] text-sm font-medium hover:from-[#B61F2B]/20 hover:to-[#7A111B]/10 transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              View BNI Chapter Page
            </a>
            <p className="text-white/30 text-xs mt-4 leading-relaxed">
              BNI® — Business Network International. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} BNI Krypton Chapter. Built with ❤️ for business networking.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
