import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getMemberRoleLabel } from '@/lib/utils'
import Image from 'next/image'

export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({
    orderBy: [{ memberRole: 'asc' }, { fullName: 'asc' }],
    include: { category: true }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Playfair_Display']">Members</h1>
          <p className="text-white/50 text-sm mt-1">Manage BNI Krypton directory members</p>
        </div>
        <Link href="/admin/members/new">
          <Button className="bg-[#B61F2B] hover:bg-[#7A111B] text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Member
          </Button>
        </Link>
      </div>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white">
            <thead className="bg-white/5 text-white/60 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Member</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden relative flex-shrink-0">
                        {member.profileImage ? (
                          <Image src={member.profileImage} alt={member.fullName} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50">{member.fullName.charAt(0)}</div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white">{member.fullName}</div>
                        <div className="text-white/50 text-xs">{member.businessName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-[10px] uppercase font-bold bg-white/5 border border-white/10">
                      {getMemberRoleLabel(member.memberRole)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/60">{member.category?.name || '-'}</td>
                  <td className="px-6 py-4 text-white/60">
                    <span className={`px-2 py-1 rounded text-xs ${member.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/members/${member.id}/edit`}>
                      <Button variant="outline" size="sm" className="bg-transparent border-white/10 hover:bg-white/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-white/50">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
