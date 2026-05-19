# BNI Krypton Premium E-Roster Platform — MASTER IMPLEMENTATION PROMPT

Build a world-class premium digital business networking directory platform for BNI Krypton.

The application must feel like:
- LinkedIn meets luxury networking platform
- Premium SaaS dashboard
- Elite business club ecosystem
- Ultra-modern networking experience

The final product must NOT look like:
- A basic directory
- A PDF replacement
- A generic Bootstrap website
- A traditional member listing portal

The platform must be:
- Extremely premium
- Mobile-first
- Fast
- Elegant
- SEO optimized
- AI-search optimized
- Highly scalable
- Production-ready

---

# PRIMARY OBJECTIVE

Create a premium business networking ecosystem for BNI Krypton where members can:
- Discover businesses
- Build referrals
- Connect instantly
- Share profiles
- Manage professional presence

The homepage itself should function as the entire networking directory experience.

NO separate member directory page is required.

---

# BRAND REFERENCE

Reference:
https://bni-nagpur.in/en-IN/chapterdetail?chapterId=7QKJvFtIdz9xPf8f9ZWHIg%3D%3D&name=BNI%20Krypton
https://prompt-web-app.replit.app/
Use BNI-inspired branding and colors.

---

# TECH STACK

Use EXACTLY this stack.

## Frontend
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion

## Backend
- Next.js Route Handlers
- Server Actions where appropriate

## Database
- MySQL
- User: root@localhost (blank password)
- Password: 

## ORM
- Prisma ORM

## Authentication
- Auth.js / NextAuth
- Passwordless Email OTP Authentication

## State Management
- Zustand

## Forms
- React Hook Form
- Zod validation

## Tables
- TanStack Table

## Icons
- Lucide React

## Charts
- Recharts

## Image Processing
- Sharp

## Email
- Nodemailer
- SMTP support

## SEO
- Metadata API
- JSON-LD Schema
- OpenGraph
- Sitemap

## Deployment
- Hostinger VPS compatible
- PM2
- NGINX reverse proxy

---

# DESIGN LANGUAGE

The UI must feel inspired by:
- Linear
- Stripe
- Vercel
- Apple
- Notion
- Premium SaaS dashboards

The design should feel:
- Luxurious
- Corporate
- Elegant
- Elite
- Modern
- Trustworthy

---

# COLOR SYSTEM

Use BNI-inspired premium colors.

## Primary Red
```css
#B61F2B
```

## Secondary Burgundy
```css
#7A111B
```

## Gold Accent
```css
#D4AF37
```

## Dark Background
```css
#111111
```

## Light Surface
```css
#F8F8F8
```

---

# DESIGN STYLE

Use:
- Large typography
- Spacious layouts
- Soft shadows
- Rounded-2xl cards
- Layered sections
- Glassmorphism
- Smooth hover animations
- Elegant gradients
- Premium spacing
- Floating elements
- Subtle motion

Avoid:
- Generic templates
- Bootstrap aesthetics
- Overly playful design
- Startup neon cyberpunk visuals

---

# CORE UX PRINCIPLES

The platform must prioritize:
- Fast networking
- Minimal clicks
- Mobile-first interactions
- One-hand usability
- Instant discoverability
- Smooth navigation
- Premium feel

The app should feel almost native on mobile.

---

# APPLICATION STRUCTURE

## PUBLIC WEBSITE

1. Homepage
2. Member Profile Pages
3. Categories
4. Leadership Team
5. Events
6. Contact

---

# IMPORTANT ARCHITECTURE CHANGE

DO NOT create a separate Members Directory page.

The homepage itself must become:
- The searchable member experience
- The networking hub
- The discovery platform

This creates:
- Better UX
- Better SEO
- Faster engagement
- Reduced navigation friction

---

# HOMEPAGE STRUCTURE

The homepage should contain:

1. Hero Section
2. Sticky Search Bar
3. Executive Directors
4. Support Team
5. Head Table
6. All Members
7. Events
8. Footer

Scrolling through the homepage should feel seamless and premium.

---

# HERO SECTION

Create a stunning premium hero section.

Include:
- Animated gradient background
- Floating member cards
- Search bar
- Networking statistics
- Elegant typography
- Smooth animations

Headline example:
“Connect With Trusted BNI Krypton Businesses”

Subheadline:
“Discover verified professionals, services, and referral partners.”

CTA buttons:
- Explore Members
- Join Network

---

# HOMEPAGE MEMBER HIERARCHY

Display members in this exact order.

---

## SECTION 1 — Executive Directors (EDs)

Display first.

Count:
- 2 members

Style:
- Large horizontal cards
- Premium gold accents
- Bigger profile photos
- Distinguished appearance
- Elevated shadows

---

## SECTION 2 — Support Team

Display second.

Count:
- 3 members

Style:
- Medium cards
- Highlighted styling
- Support badges

---

## SECTION 3 — Head Table

Display third.

Count:
- 4 members

Style:
- Premium leadership cards
- Elevated appearance
- Leadership badge

---

## SECTION 4 — All Members

Display remaining members.

Style:
- Beautiful responsive grid
- Infinite scroll or pagination
- Searchable cards
- Smooth animations

---

# MEMBER CARD DESIGN

Each member card must include:

- Profile photo
- Full name
- Business name
- BNI category
- Short introduction
- Quick action buttons

Buttons:
- Call
- WhatsApp
- Website
- View Profile

Card effects:
- Hover elevation
- Smooth scaling
- Gradient borders
- Microinteractions
- Elegant shadows

---

# MEMBER PROFILE PAGE

URL structure:
```bash
/members/[slug]
```

The profile page must feel premium and luxurious.

---

# PROFILE PAGE STRUCTURE

## Header Section
- Cover/banner image
- Profile photo
- Business logo
- Gold leadership accents if applicable

## Main Information
- Name
- Business name
- Category
- Tagline
- About business
- Services offered

## Contact Section
- Phone
- WhatsApp
- Email
- Website
- Address
- Google Maps embed

## Additional Sections
- Gallery
- Social links
- Referral expectations
- Testimonials
- Business timing
- QR code
- Download contact button

---

# EMAIL OTP AUTHENTICATION

DO NOT use passwords.

Implement:
- Passwordless Email OTP Authentication

Preferred stack:
- Auth.js / NextAuth
- Nodemailer
- SMTP

---

# LOGIN FLOW

1. User enters email
2. OTP sent via email
3. User enters OTP
4. Session created securely

No passwords anywhere in the system.

---

# ACCESS CONTROL

## Public Users
Can:
- Browse members
- Search members
- View profiles

## Logged-In Members
Can:
- Edit their own profile
- Update contact details
- Manage social links
- Upload profile image

## Admin Users
Can:
- Manage all members
- Upload photos
- Manage leadership order
- Manage categories
- Moderate content

---

# SEARCH EXPERIENCE

Homepage search must remain sticky.

Features:
- Live filtering
- Debounced search
- Instant results
- Filter chips
- Animated transitions

Search by:
- Name
- Business
- Category
- Keywords
- Services
- Area

Search should dynamically filter all sections without page reload.

---

# PROFILE IMAGE REQUIREMENTS

CRITICAL REQUIREMENT.

All member profile images must:
- Be perfect square
- Have uniform appearance
- Be automatically optimized
- Load extremely fast

---

# IMAGE UPLOAD RULES

Restrictions:
- Max upload size: 300KB
- Square format required
- Auto crop to center
- Auto resize
- Auto optimization

---

# IMAGE PROCESSING PIPELINE

Use Sharp.

Processing steps:

1. Validate upload
2. Auto center crop
3. Resize to:
```text
600x600
```

4. Convert to:
```text
.avif
```

5. Compress aggressively
6. Ensure final size under:
```text
300KB
```

---

# FINAL IMAGE STORAGE

Store only optimized AVIF files.

Example:
```text
/uploads/members/nishant-barde.avif
```

---

# IMAGE UX REQUIREMENTS

Use:
- Lazy loading
- Blur placeholders
- Responsive rendering
- Retina-quality optimization

Leadership images should appear more premium.

---

# QR CODE FEATURE

Generate dynamic QR codes for:
- Profile URL
- WhatsApp link
- Contact sharing

---

# CONTACT DOWNLOAD

Generate downloadable VCF files dynamically.

---

# CATEGORY PAGES

Create:
```bash
/categories/[slug]
```

Display:
- Category members
- Statistics
- Featured businesses

---

# ADMIN PANEL

Build a premium SaaS-style admin dashboard.

Must include:
- Collapsible sidebar
- Dark mode
- Command palette
- Analytics
- Activity logs

---

# ADMIN FEATURES

## Members Management
- Add/edit/delete members
- Upload profile photos
- Manage gallery
- Feature members

## Categories
- CRUD operations

## Media Library
- Drag-and-drop uploads
- Auto optimization

## Analytics
- Total members
- Most viewed profiles
- Search analytics
- Traffic stats

---

# DATABASE DESIGN

Use Prisma ORM with MySQL.

Required models:
- Users
- Members
- Categories
- Events
- Testimonials
- GalleryImages
- Settings

---

# REQUIRED MEMBER FIELDS

```sql
id INT
full_name VARCHAR
slug VARCHAR
business_name VARCHAR
category VARCHAR
phone VARCHAR
whatsapp VARCHAR
email VARCHAR
website VARCHAR
short_intro TEXT
full_description TEXT
address TEXT
google_maps TEXT
profile_image VARCHAR
company_logo VARCHAR
gallery_images JSON
facebook VARCHAR
linkedin VARCHAR
instagram VARCHAR
youtube VARCHAR
referral_expectation TEXT
featured BOOLEAN
display_order INT
member_role ENUM(
 'ED',
 'SUPPORT',
 'HEAD_TABLE',
 'MEMBER'
)
created_at TIMESTAMP
```

---

# FILE STORAGE STRUCTURE

```bash
/public
  /uploads
    /members
    /logos
    /gallery
```

---

# FILE STRUCTURE

```bash
/src
  /app
  /components
  /features
  /lib
  /hooks
  /services
  /store
  /types
  /styles
  /prisma
  /schemas
```

---

# REQUIRED COMPONENTS

Build reusable components:

- Navbar
- Sidebar
- SearchBar
- MemberCard
- ProfileHeader
- StatsCard
- QRCard
- GalleryGrid
- ContactActions
- FloatingCTA
- CategoryBadge
- ThemeSwitcher

All components must:
- Be reusable
- Fully responsive
- Accessible
- Dark-mode compatible
- Strongly typed

---

# SEO REQUIREMENTS

CRITICAL REQUIREMENT.

Implement:
- Dynamic metadata
- OpenGraph images
- JSON-LD schema
- LocalBusiness schema
- Member schema
- Organization schema
- Leadership schema
- Breadcrumb schema
- robots.txt
- sitemap.xml

Homepage must become the primary SEO landing page.

Each member profile must be fully indexable.

---

# PERFORMANCE REQUIREMENTS

Target:
- Lighthouse score 95+
- Homepage load under 2 seconds

Use:
- Server Components
- Dynamic imports
- Streaming
- Suspense
- Partial prerendering
- Image optimization
- Minimal hydration

---

# ACCESSIBILITY

Follow WCAG standards.

Must support:
- Keyboard navigation
- Screen readers
- Proper focus states
- Accessible contrast ratios

---

# MOBILE EXPERIENCE

CRITICAL REQUIREMENT.

The app should feel like a modern networking mobile app.

Requirements:
- Sticky search
- Floating CTA
- Thumb-friendly controls
- Swipe-friendly cards
- Smooth scrolling
- Fast transitions

Leadership sections should feel luxurious on mobile.

---

# DARK MODE

Implement:
- Light mode
- Dark mode
- System mode

Persist user preference.

---

# ANIMATIONS

Use Framer Motion extensively but elegantly.

Include:
- Page transitions
- Hover interactions
- Scroll reveal
- Animated counters
- Skeleton loading states

DO NOT overuse animations.

Everything should feel refined and professional.

---

# SECURITY REQUIREMENTS

Implement:
- Rate limiting
- Input sanitization
- Form validation
- Secure uploads
- Auth middleware
- CSRF protection

---

# HOSTINGER DEPLOYMENT REQUIREMENTS

The application must be fully deployable on Hostinger VPS.

Generate:
- PM2 ecosystem config
- NGINX config
- Environment variable setup
- Production deployment guide

---

# IMPLEMENTATION ORDER

Build in this exact sequence.

## Phase 1
Project architecture setup

## Phase 2
Database + Prisma + Auth

## Phase 3
Homepage UI

## Phase 4
Member sections

## Phase 5
Profile pages

## Phase 6
Admin dashboard

## Phase 7
Search system

## Phase 8
Image optimization system

## Phase 9
SEO + performance

## Phase 10
Deployment configs

---

# DEVELOPMENT RULES

1. Use App Router best practices
2. Use Server Components wherever possible
3. Minimize client components
4. Build reusable primitives
5. Prioritize performance
6. Use strong TypeScript typing
7. Avoid unnecessary dependencies
8. Produce production-grade code only
9. Follow modern 2026 UI/UX standards
10. Every page must feel premium

---

# FINAL OUTPUT EXPECTATIONS

Generate:
- Full production-ready application
- Beautiful responsive UI
- Complete Prisma schema
- Database migrations
- Admin dashboard
- OTP authentication system
- Search system
- Image optimization pipeline
- Deployment configuration
- Seed scripts
- Example member data
- Documentation

The final product must feel like:
“An elite private business networking platform.”

NOT:
- A basic directory
- A simple listing website
- A template-based member portal