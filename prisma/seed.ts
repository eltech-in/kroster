import { PrismaClient, MemberRole } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import 'dotenv/config'

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASS ?? '',
  database: process.env.DB_NAME ?? 'kroster',
  connectionLimit: 5,
})

const prisma = new PrismaClient({ adapter })

const categories = [
  { name: 'Information Technology', slug: 'information-technology', icon: 'IT', color: '#3B82F6' },
  { name: 'Real Estate', slug: 'real-estate', icon: 'RE', color: '#10B981' },
  { name: 'Finance and Banking', slug: 'finance-banking', icon: 'FIN', color: '#F59E0B' },
  { name: 'Healthcare', slug: 'healthcare', icon: 'HC', color: '#EF4444' },
  { name: 'Legal Services', slug: 'legal-services', icon: 'LEG', color: '#8B5CF6' },
  { name: 'Marketing and Advertising', slug: 'marketing-advertising', icon: 'MKT', color: '#EC4899' },
  { name: 'Education and Training', slug: 'education-training', icon: 'EDU', color: '#06B6D4' },
  { name: 'Construction and Architecture', slug: 'construction-architecture', icon: 'CON', color: '#84CC16' },
  { name: 'Food and Beverage', slug: 'food-beverage', icon: 'FnB', color: '#F97316' },
  { name: 'Logistics and Transport', slug: 'logistics-transport', icon: 'LOG', color: '#6B7280' },
]

type MemberSeed = {
  fullName: string
  slug: string
  businessName: string
  phone: string
  whatsapp: string
  email: string
  website?: string
  shortIntro: string
  fullDescription?: string
  memberRole: MemberRole
  displayOrder: number
  featured?: boolean
  categorySlug: string
}

const members: MemberSeed[] = [
  {
    fullName: 'Nishant Barde',
    slug: 'nishant-barde',
    businessName: 'BNI Krypton Chapter',
    phone: '+91-9876543210',
    whatsapp: '919876543210',
    email: 'nishant@bnikrypton.com',
    shortIntro: 'Executive Director of BNI Krypton, empowering businesses through strategic networking and referrals.',
    fullDescription: 'With over 10 years of experience in business development, Nishant leads BNI Krypton Chapter with passion and dedication.',
    memberRole: MemberRole.ED,
    displayOrder: 1,
    featured: true,
    categorySlug: 'marketing-advertising',
  },
  {
    fullName: 'Sonia Mehta',
    slug: 'sonia-mehta',
    businessName: 'Mehta Associates',
    phone: '+91-9876543211',
    whatsapp: '919876543211',
    email: 'sonia@mehtaassociates.com',
    shortIntro: 'Co-Executive Director with expertise in business coaching and leadership development.',
    fullDescription: 'Sonia brings 12 years of corporate experience to BNI Krypton.',
    memberRole: MemberRole.ED,
    displayOrder: 2,
    featured: true,
    categorySlug: 'education-training',
  },
  {
    fullName: 'Ravi Kumar',
    slug: 'ravi-kumar',
    businessName: 'Kumar IT Solutions',
    phone: '+91-9876543212',
    whatsapp: '919876543212',
    email: 'ravi@kumarit.com',
    website: 'https://kumarit.com',
    shortIntro: 'President of BNI Krypton. IT solutions expert helping businesses digitize and scale.',
    fullDescription: 'Ravi Kumar is the President of BNI Krypton and founder of Kumar IT Solutions.',
    memberRole: MemberRole.SUPPORT,
    displayOrder: 1,
    categorySlug: 'information-technology',
  },
  {
    fullName: 'Priya Sharma',
    slug: 'priya-sharma',
    businessName: 'Sharma Legal Advisory',
    phone: '+91-9876543213',
    whatsapp: '919876543213',
    email: 'priya@sharmalegal.com',
    shortIntro: 'VP Membership of BNI Krypton. Expert corporate attorney helping businesses navigate legal complexities.',
    memberRole: MemberRole.SUPPORT,
    displayOrder: 2,
    categorySlug: 'legal-services',
  },
  {
    fullName: 'Amit Joshi',
    slug: 'amit-joshi',
    businessName: 'Joshi Finance Consultants',
    phone: '+91-9876543214',
    whatsapp: '919876543214',
    email: 'amit@joshifinance.com',
    website: 'https://joshifinance.com',
    shortIntro: 'Secretary/Treasurer of BNI Krypton. Financial advisor specializing in wealth management and tax planning.',
    memberRole: MemberRole.SUPPORT,
    displayOrder: 3,
    categorySlug: 'finance-banking',
  },
  {
    fullName: 'Deepak Agarwal',
    slug: 'deepak-agarwal',
    businessName: 'Agarwal Realty',
    phone: '+91-9876543215',
    whatsapp: '919876543215',
    email: 'deepak@agarwalrealty.com',
    website: 'https://agarwalrealty.com',
    shortIntro: 'VP Education at BNI Krypton. Trusted real estate developer in Nagpur with 15+ years of experience.',
    memberRole: MemberRole.HEAD_TABLE,
    displayOrder: 1,
    categorySlug: 'real-estate',
  },
  {
    fullName: 'Neha Patel',
    slug: 'neha-patel',
    businessName: 'Patel Healthcare',
    phone: '+91-9876543216',
    whatsapp: '919876543216',
    email: 'neha@patelhealthcare.com',
    shortIntro: 'Chapter Director at BNI Krypton. Multi-specialty healthcare clinic providing comprehensive medical care.',
    memberRole: MemberRole.HEAD_TABLE,
    displayOrder: 2,
    categorySlug: 'healthcare',
  },
  {
    fullName: 'Rajesh Singh',
    slug: 'rajesh-singh',
    businessName: 'Singh Marketing Pro',
    phone: '+91-9876543217',
    whatsapp: '919876543217',
    email: 'rajesh@singhmarketing.com',
    website: 'https://singhmarketing.com',
    shortIntro: 'Visitor Host at BNI Krypton. Digital marketing strategist helping brands dominate online.',
    memberRole: MemberRole.HEAD_TABLE,
    displayOrder: 3,
    categorySlug: 'marketing-advertising',
  },
  {
    fullName: 'Sunita Desai',
    slug: 'sunita-desai',
    businessName: 'Desai Constructions',
    phone: '+91-9876543218',
    whatsapp: '919876543218',
    email: 'sunita@desaiconstructions.com',
    shortIntro: 'Event Coordinator at BNI Krypton. Premium residential and commercial construction specialist.',
    memberRole: MemberRole.HEAD_TABLE,
    displayOrder: 4,
    categorySlug: 'construction-architecture',
  },
  {
    fullName: 'Vikas Tiwari',
    slug: 'vikas-tiwari',
    businessName: 'Tiwari Logistics',
    phone: '+91-9876543219',
    whatsapp: '919876543219',
    email: 'vikas@tiwarilogistics.com',
    shortIntro: 'Reliable logistics and transportation solutions across Maharashtra and Central India.',
    memberRole: MemberRole.MEMBER,
    displayOrder: 1,
    categorySlug: 'logistics-transport',
  },
  {
    fullName: 'Kavita Mishra',
    slug: 'kavita-mishra',
    businessName: 'Kavitas Kitchen',
    phone: '+91-9876543220',
    whatsapp: '919876543220',
    email: 'kavita@kavitaskitchen.com',
    website: 'https://kavitaskitchen.com',
    shortIntro: 'Premium catering and event food services for corporate and personal occasions in Nagpur.',
    memberRole: MemberRole.MEMBER,
    displayOrder: 2,
    categorySlug: 'food-beverage',
  },
  {
    fullName: 'Suresh Kadam',
    slug: 'suresh-kadam',
    businessName: 'Kadam Education Hub',
    phone: '+91-9876543221',
    whatsapp: '919876543221',
    email: 'suresh@kadamedu.com',
    shortIntro: 'Professional skill development and corporate training programs for individuals and organizations.',
    memberRole: MemberRole.MEMBER,
    displayOrder: 3,
    categorySlug: 'education-training',
  },
  {
    fullName: 'Anjali Rao',
    slug: 'anjali-rao',
    businessName: 'Rao Digital Solutions',
    phone: '+91-9876543222',
    whatsapp: '919876543222',
    email: 'anjali@raodigital.com',
    website: 'https://raodigital.com',
    shortIntro: 'Full-stack web development and mobile app solutions for businesses of all sizes.',
    memberRole: MemberRole.MEMBER,
    displayOrder: 4,
    categorySlug: 'information-technology',
  },
]

const events = [
  {
    title: 'BNI Krypton Weekly Chapter Meeting',
    slug: 'weekly-meeting-june-2026',
    description: 'Our weekly chapter meeting where members share referrals, conduct presentations, and grow their businesses.',
    eventDate: new Date('2026-06-04T07:30:00'),
    location: 'Hotel Centre Point, Nagpur',
    isPublished: true,
  },
  {
    title: 'BNI Krypton Mega Visitor Day',
    slug: 'mega-visitor-day-june-2026',
    description: 'Special Mega Visitor Day featuring multiple member presentations, networking breakfast, and business opportunities.',
    eventDate: new Date('2026-06-18T08:00:00'),
    location: 'Grand Venue, Nagpur',
    isPublished: true,
  },
  {
    title: 'Annual BNI Krypton Gala Dinner',
    slug: 'annual-gala-dinner-2026',
    description: 'Celebrate another year of successful networking at our Annual Gala Dinner. Awards, recognition, and networking.',
    eventDate: new Date('2026-07-15T19:00:00'),
    location: 'Radisson Blu, Nagpur',
    isPublished: true,
  },
]

async function main() {
  console.log('Seeding database...')

  const createdCategories: Record<string, string> = {}
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
    createdCategories[cat.slug] = created.id
  }
  console.log('Categories seeded:', Object.keys(createdCategories).length)

  for (const member of members) {
    const { categorySlug, ...memberData } = member
    await prisma.member.upsert({
      where: { slug: memberData.slug },
      update: {},
      create: {
        ...memberData,
        categoryId: categorySlug ? createdCategories[categorySlug] : null,
        isActive: true,
      },
    })
  }
  console.log('Members seeded:', members.length)

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    })
  }
  console.log('Events seeded:', events.length)

  await prisma.setting.upsert({
    where: { key: 'chapter_name' },
    update: {},
    create: { key: 'chapter_name', value: 'BNI Krypton' },
  })
  await prisma.setting.upsert({
    where: { key: 'chapter_city' },
    update: {},
    create: { key: 'chapter_city', value: 'Nagpur' },
  })

  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
