# Ìbáṣepọ̀ – Connected Hearts Coaching & Consultancy

A modern, full-stack website and admin dashboard for a faith-based coaching and consultancy business. Built with Next.js 16, React 19, TailwindCSS v4, and Zustand for state management.

## Features

### Public Site
- **Home Page**: Hero section, featured services, testimonials, latest blog posts, newsletter signup
- **About Page**: Founder's story, mission, values, credentials
- **Services Pages**: Services directory with search/filtering, detailed service pages with markdown content
- **Blog**: Blog listing with search, tags, pagination; individual blog posts with sharing
- **Testimonials**: Testimonials gallery with service filtering
- **Gallery**: Masonry gallery with lightbox functionality
- **Booking**: Multi-step booking form for scheduling sessions
- **Contact**: Contact form with contact information
- **Legal**: Privacy policy and terms of service

### Admin Dashboard
- **Authentication**: Admin login system with JWT-like tokens
- **Blog Manager**: Create, edit, publish, schedule blog posts with SEO optimization
- **Services Manager**: Manage coaching services with search and filtering
- **Testimonials Manager**: Approve/reject client testimonials
- **Gallery Manager**: Upload and organize gallery images
- **Bookings Manager**: Track and manage client bookings with CSV export
- **Subscribers Manager**: Email list management with CSV export
- **Users Manager**: Admin and client account management
- **Settings**: Business information and integrations
- **Dashboard**: Statistics, charts, quick actions, activity logs

### Client Portal
- **Client Login**: Secure client authentication
- **Dashboard**: Welcome overview with stats and quick actions
- **My Bookings**: View, schedule, reschedule, and manage sessions
- **Profile**: Update personal information and coaching goals
- **Resources**: Access published blog articles and learning materials

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **State Management**: Zustand with persistence
- **Authentication**: Custom JWT-like token system with role-based access
- **Styling**: TailwindCSS v4 with semantic design tokens
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **Forms**: React Hook Form (client-side)
- **Animations**: Framer Motion
- **Database**: Mock JSON (easily swappable for real backend)

## Project Structure

\`\`\`
├── app/
│   ├── admin/                 # Admin dashboard routes
│   │   ├── layout.tsx        # Admin layout with sidebar/topbar
│   │   ├── page.tsx          # Dashboard home
│   │   ├── blog/             # Blog management
│   │   ├── services/         # Services management
│   │   ├── testimonials/     # Testimonials moderation
│   │   ├── gallery/          # Gallery management
│   │   ├── bookings/         # Bookings manager
│   │   ├── subscribers/      # Subscribers list
│   │   ├── users/            # Users management
│   │   ├── settings/         # Settings
│   │   └── login/            # Admin login
│   ├── dashboard/            # Client portal routes
│   │   ├── layout.tsx        # Client dashboard layout
│   │   ├── page.tsx          # Dashboard home
│   │   ├── bookings/         # My bookings
│   │   ├── profile/          # Profile settings
│   │   └── resources/        # Learning resources
│   ├── auth/                 # Authentication routes
│   │   └── login/            # Client login
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── admin-sidebar.tsx     # Admin sidebar navigation
│   ├── admin-topbar.tsx      # Admin top navigation
│   ├── auth-guard.tsx        # Route protection
│   └── ...                   # Other components
├── lib/
│   ├── auth.ts              # Authentication utilities
│   ├── store.ts             # Zustand store
│   ├── api.ts               # API calls
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript type definitions
├── data/
│   ├── blog.json            # Blog posts
│   ├── services.json        # Services
│   ├── testimonials.json    # Testimonials
│   ├── bookings.json        # Bookings
│   ├── subscribers.json     # Subscribers
│   ├── gallery.json         # Gallery images
│   ├── users.json           # Users
│   └── settings.json        # Settings
└── styles/
    └── globals.css          # Global styles with design tokens
\`\`\`

## Design System

### Colors
- **Primary**: #2A7F7F (Sage Green)
- **Primary Light**: #A8D5BA
- **Secondary**: #2D5F4F (Dark Forest)
- **Accent**: #F5F3EE (Warm Cream)
- **Text**: #2C3E50 (Charcoal)

### Typography
- **Headings**: Montserrat (400, 500, 600, 700)
- **Body**: Open Sans (400, 500, 600)
- **Spacing**: 0.25rem base unit (scale: 1, 2, 3, 4, 6, 8, 12, 16)
- **Border Radius**: 0.5rem (8px)

## Getting Started

### Installation

\`\`\`bash
# Clone the repository
git clone <repo-url>
cd ibasepo-website

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Visit `http://localhost:3000`

### Admin Access

1. Navigate to `http://localhost:3000/admin/login`
2. Email: `eo.bismark@ibasepo.org.uk`
3. Password: `admin123`

**Available Roles:**
- **SuperAdmin**: Full access to all features
- **Editor**: Can manage blog, services, testimonials

### Client Portal Access

1. Navigate to `http://localhost:3000/auth/login`
2. Enter any email and password to access client dashboard

## Key Features

### Admin Dashboard
- **Real-time Statistics**: Dashboard with charts and metrics
- **Full Blog CRUD**: Create, edit, publish, schedule posts
- **Content Management**: Services, testimonials, gallery
- **Booking Management**: Track sessions with status updates
- **CSV Export**: Export bookings and subscribers
- **Activity Logging**: Audit trail of all admin actions
- **Search & Filtering**: Fast lookups across all managers
- **Responsive Design**: Mobile-friendly admin interface

### Client Features
- **Session Management**: Schedule, reschedule, cancel bookings
- **Resource Access**: Browse published blog articles
- **Profile Management**: Update personal information
- **Booking History**: Track past and upcoming sessions

## API Layer

The `lib/api.ts` file abstracts all data fetching. Currently uses mock JSON, but can be easily swapped:

\`\`\`typescript
// Current: Mock data from JSON files
export const getServices = async () => servicesData

// Future: Real API
export const getServices = async () => {
  const res = await fetch('https://api.example.com/services')
  return res.json()
}
\`\`\`

## Authentication System

### Token Structure
\`\`\`typescript
{
  id: string
  name: string
  email: string
  role: 'SuperAdmin' | 'Editor' | 'Client'
  exp: number // expiry timestamp
}
\`\`\`

### Roles & Permissions
- **SuperAdmin**: Full admin access, user management
- **Editor**: Blog, services, testimonials management
- **Client**: Own bookings, profile, resources

## Customization

### Adding New Blog Posts

Edit `data/blog.json`:

\`\`\`json
{
  "id": "unique-id",
  "slug": "post-slug",
  "title": "Post Title",
  "excerpt": "Short summary",
  "content": "# Markdown content",
  "author": "Aduké L.",
  "category": "Category",
  "tags": ["tag1", "tag2"],
  "image": "/image-url",
  "status": "published",
  "publishedAt": "2024-11-03",
  "seoTitle": "SEO Title",
  "seoDescription": "SEO Description",
  "seoKeywords": "keyword1, keyword2"
}
\`\`\`

### Adding New Services

Edit `data/services.json` and add new coaching offerings with descriptions and pricing.

### Updating Theme Colors

Edit `app/globals.css` and update CSS variables in `:root` selector.

## Performance & Accessibility

- ✓ Semantic HTML
- ✓ ARIA labels and roles
- ✓ Keyboard navigation support
- ✓ Color contrast >= 4.5:1
- ✓ Image lazy loading with Next.js Image
- ✓ Font preconnect for performance
- ✓ Mobile-first responsive design
- ✓ Activity logging for transparency

## SEO

- ✓ Dynamic metadata on all pages
- ✓ Open Graph tags for social sharing
- ✓ Sitemap generation
- ✓ robots.txt
- ✓ Semantic HTML structure
- ✓ Blog post SEO fields

## Deployment

### Vercel (Recommended)

\`\`\`bash
# Push to GitHub
git push origin main

# Deploy on Vercel
vercel --prod
\`\`\`

Set environment variables in Vercel dashboard if needed.

### Environment Variables

Create `.env.local`:

\`\`\`
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/ibasepo
\`\`\`

## Future Enhancements

- [ ] Real database integration (Supabase, Neon, PlanetScale)
- [ ] Payment processing (Stripe, Paystack)
- [ ] Email notifications (SendGrid, Mailchimp, Resend)
- [ ] Real-time booking calendar (Calendly API integration)
- [ ] Advanced analytics dashboard
- [ ] Newsletter automation
- [ ] Automated testimonial submission & approval
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] WhatsApp integration

## Troubleshooting

### Admin Login Not Working
- Verify credentials: `eo.bismark@ibasepo.org.uk` / `admin123`
- Check browser localStorage is enabled
- Clear cache and try again

### Data Not Persisting
- Currently uses in-memory Zustand store with localStorage
- For production, connect to real database in `lib/api.ts`

### Import Errors
- Ensure all files in `data/` directory are present
- Check `lib/api.ts` exports match imports in managers

## Support

For questions or issues, contact: enquiries@ibasepo.org.uk

## License

All rights reserved © 2025 Ìbáṣepọ̀ – Connected Hearts Coaching & Consultancy
