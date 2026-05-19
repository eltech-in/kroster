import { prisma } from '@/lib/prisma'
import { Users, Tag, Calendar, TrendingUp, Crown, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard | BNI Krypton' }

async function getStats() {
  const [totalMembers, totalCategories, totalEvents, membersByRole] = await Promise.all([
    prisma.member.count({ where: { isActive: true } }),
    prisma.category.count(),
    prisma.event.count({ where: { isPublished: true } }),
    prisma.member.groupBy({
      by: ['memberRole'],
      _count: { _all: true },
      where: { isActive: true },
    }),
  ])

  const roleCount = Object.fromEntries(
    membersByRole.map((r) => [r.memberRole, r._count._all])
  )

  return { totalMembers, totalCategories, totalEvents, roleCount }
}

export default async function AdminDashboard() {
  const { totalMembers, totalCategories, totalEvents, roleCount } = await getStats()

  const stats = [
    { label: 'Total Members', value: totalMembers, icon: Users, color: 'from-[#B61F2B]/20 to-[#7A111B]/10', border: 'border-[#B61F2B]/20', iconColor: 'text-[#B61F2B]', href: '/admin/members' },
    { label: 'Categories', value: totalCategories, icon: Tag, color: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20', iconColor: 'text-blue-400', href: '/admin/categories' },
    { label: 'Events', value: totalEvents, icon: Calendar, color: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/20', iconColor: 'text-purple-400', href: '/admin/events' },
    { label: 'Executive Directors', value: roleCount['ED'] ?? 0, icon: Crown, color: 'from-[#D4AF37]/10 to-[#D4AF37]/5', border: 'border-[#D4AF37]/20', iconColor: 'text-[#D4AF37]', href: '/admin/members?role=ED' },
  ]

  const roleBreakdown = [
    { label: 'Executive Directors', count: roleCount['ED'] ?? 0, icon: Crown, badgeClass: 'badge-ed' },
    { label: 'Support Team', count: roleCount['SUPPORT'] ?? 0, icon: Shield, badgeClass: 'badge-support' },
    { label: 'Head Table', count: roleCount['HEAD_TABLE'] ?? 0, icon: Star, badgeClass: 'badge-headtable' },
    { label: 'Members', count: roleCount['MEMBER'] ?? 0, icon: Users, badgeClass: 'badge-member' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-['Playfair_Display']">Dashboard</h1>
        <p className="text-white/50 text-sm mt-1">BNI Krypton Chapter Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, border, iconColor, href }) => (
          <Link key={label} href={href}>
            <div className={`glass rounded-2xl p-5 border ${border} bg-gradient-to-br ${color} hover:opacity-80 transition-all premium-card`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center border ${border}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1 font-['Playfair_Display']">{value}</div>
              <div className="text-white/50 text-sm">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Role Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="text-base font-semibold text-white mb-4">Member Role Breakdown</h2>
          <div className="space-y-3">
            {roleBreakdown.map(({ label, count, icon: Icon, badgeClass }) => (
              <div key={label} className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
                  <Icon className="w-3 h-3" />
                  {label}
                </span>
                <div className="flex-1 h-2 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#B61F2B] to-[#7A111B] transition-all duration-500"
                    style={{ width: `${totalMembers > 0 ? (count / totalMembers) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-white font-semibold text-sm w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="text-base font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: '/admin/members/new', label: 'Add New Member', icon: Users },
              { href: '/admin/events/new', label: 'Create Event', icon: Calendar },
              { href: '/admin/categories/new', label: 'Add Category', icon: Tag },
              { href: '/', label: 'View Public Site', icon: TrendingUp },
            ].map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium transition-all border border-white/5">
                <Icon className="w-4 h-4 text-[#B61F2B]" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
