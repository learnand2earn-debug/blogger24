import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://ubaidblogs.com'),
  title: {
    default: 'UbaidBlogs — Knowledge • Technology • Success',
    template: '%s | UbaidBlogs'
  },
  description: 'Your premier tech destination for Artificial Intelligence, Web Development, SEO, Digital Marketing, and Productivity tutorials. Dream Big, Build Smart.',
  keywords: [
    'UbaidBlogs',
    'AI Tools 2026',
    'Next.js Tutorials',
    'SEO Strategies',
    'Web Development',
    'WordPress Guide',
    'Digital Marketing'
  ],
  authors: [{ name: 'UbaidBlogs Team' }],
  creator: 'UbaidBlogs',
  publisher: 'UbaidBlogs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ubaidblogs.com',
    siteName: 'UbaidBlogs',
    title: 'UbaidBlogs — Learn New Skills, Grow Your Future',
    description: 'Discover the latest in AI, Web Development, SEO, Digital Marketing and technology tutorials.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'UbaidBlogs — Knowledge • Technology • Success',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UbaidBlogs — Knowledge • Technology • Success',
    description: 'Learn New Skills, Grow Your Future with UbaidBlogs.',
    creator: '@ubaidblogs',
    images: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'],
  },
  alternates: {
    canonical: 'https://ubaidblogs.com',
    types: {
      'application/rss+xml': 'https://ubaidblogs.com/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="alternate" type="application/rss+xml" title="UbaidBlogs RSS Feed" href="/feed.xml" />
      </head>
      <body className="bg-[#07090D] text-[#F5F7FA] min-h-screen flex flex-col antialiased selection:bg-[#FFD21F]/30 selection:text-[#FFD21F]">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
