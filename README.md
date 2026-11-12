# UbaidBlogs — Modern Black & Gold Tech Blogging Platform

> **Knowledge • Technology • Success**  
> *Dream Big, Build Smart*

A production-ready, ultra-fast, and responsive blogging platform built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and a dual-mode database layer (seamless local storage with Supabase PostgreSQL migration ready).

Inspired by the signature black-and-gold futuristic aesthetic, UbaidBlogs delivers real-time article publishing, category filtering, keyword search, technical SEO structured data, full admin studio, interactive comments, and newsletter automation.

---

## 🌟 Key Features

### 1. Design System & Futuristic Visual Identity
- **Palette**: Near-black (`#07090D`), surface charcoal (`#11151C`), luminous gold (`#FFD21F`), and electric blue (`#168CFF`).
- **Signature Geometric 'U' Logo**: Scalable, high-definition SVG polygon emblem.
- **Cinematic Hero**: Ambient golden waves, modern laptop mockup, mug, desk plant, and futuristic friendly AI robot.
- **Micro-Animations & Glow Effects**: Tasteful gold borders, focus states, and card hover physics.

### 2. Complete Content Architecture
- **Featured Articles**: Highlights top publications with reading time, badges, and quick-action buttons.
- **Latest & Trending Feeds**: Dynamic sorting by publication date and real view counter.
- **Category Shortcuts Strip**: Horizontally scrollable strip featuring icons for AI & Tools, Web Development, SEO, Digital Marketing, WordPress, Technology, and Productivity.
- **Full Article Detail Pages (`/post/[slug]`)**:
  - Auto-generated Table of Contents with smooth jump links
  - Formatted headings, lists, pull quotes, responsive comparison tables
  - Code blocks with one-click **Copy Code** button
  - Social sharing links (X/Twitter, Facebook, LinkedIn, Copy Link)
  - Interactive discussion comments with spam protection
  - Previous and Next post navigation
  - Related category recommendations

### 3. Dynamic Taxonomy & Search
- **Category Archives (`/category/[slug]`)**: Deep category pages with description, post counts, and sorting.
- **All Categories Directory (`/categories`)**: Topic cards with live article counts.
- **Tag Archives (`/tag/[slug]`)**: Tag-filtered article lists.
- **Instant Search (`/search?q=...`)**: Full search across titles, excerpts, content, and tags.

### 4. Administrator Studio (`/admin`)
- **Secure Authentication**: HTTP-only cookie session protection.
- **Publishing Studio**:
  - Create, edit, preview, and delete articles
  - Auto slug generator with validation
  - Rich text formatting toolbar (H2, H3, Bold, Code, Quote, List)
  - Live preview tab
  - Draft vs. Published toggle
  - Custom SEO title and meta description editor
- **Category Manager**: Add new categories with slugs and descriptions.
- **Subscriber Manager**: View active newsletter subscribers and export to CSV.
- **Contact Inquiries**: Review and manage messages sent from the public contact form.
- **Site Settings**: Customize branding, announcement banner, and social media handles.

### 5. Technical SEO & Core Web Vitals
- **Schema.org Structured Data**: JSON-LD `BlogPosting`, `BreadcrumbList`, and `Organization` metadata.
- **Dynamic XML Sitemap**: Auto-generated `/sitemap.xml` indexing all valid URLs.
- **HTML Sitemap**: User-friendly `/sitemap` directory.
- **Robots.txt**: Auto-generated `/robots.txt` disallowing admin routes.
- **RSS 2.0 Feed**: Fully valid XML feed at `/feed.xml`.
- **OpenGraph & Twitter Cards**: High-definition social cards for all articles.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14.2 (App Router, Server Components, Route Handlers)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Database Layer**:
  - Embedded local persistent JSON repository (`data/ubaidblogs.json`) for instant local testing and serverless deployment.
  - Production Supabase PostgreSQL schema with Row-Level Security (RLS) in `supabase/migrations/20261111_init.sql`.

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### 2. Installation
Clone the repository and install dependencies:
\`\`\`bash
npm install
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Access
Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and log in:
- **Default Password**: `UbaidAdmin2026!` (Configurable via `ADMIN_PASSWORD` in `.env.local`)

---

## 📦 Production Build & Testing

Run the production build:
\`\`\`bash
npm run build
\`\`\`
Start production server:
\`\`\`bash
npm run start
\`\`\`

---

## ☁️ Supabase PostgreSQL Deployment (Optional)

To connect UbaidBlogs to a managed Supabase database:
1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in Supabase and run the migration script:
   - File: `supabase/migrations/20261111_init.sql`
3. Copy your project credentials into `.env.local`:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
   \`\`\`

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the project in [Vercel](https://vercel.com).
3. Set the environment variables from `.env.example`.
4. Click **Deploy**.

---

## 📄 License
© 2026 UbaidBlogs. All Rights Reserved. Made with ❤️ by UbaidBlogs.
