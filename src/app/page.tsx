import React from 'react';
import Link from 'next/link';
import { Star, Flame, Clock, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryShortcuts } from '@/components/home/CategoryShortcuts';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Sidebar } from '@/components/layout/Sidebar';

export const revalidate = 60; // ISR cache revalidation every minute

export default function HomePage() {
  const categories = db.getCategories();
  
  // Fetch featured posts (3 cards)
  const { posts: featuredPosts } = db.getPosts({
    featured: true,
    limit: 3,
    status: 'published'
  });

  // Fetch latest posts
  const { posts: latestPosts } = db.getPosts({
    limit: 4,
    status: 'published',
    sort: 'newest'
  });

  // Fetch trending posts
  const { posts: trendingPosts } = db.getPosts({
    trending: true,
    limit: 2,
    status: 'published',
    sort: 'popular'
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Category Shortcuts Bar */}
      <CategoryShortcuts />

      {/* 3. Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Left Content Stream (8 columns on desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* --- Section A: Featured Posts --- */}
            <section id="featured">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#1A2230]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD21F]/15 text-[#FFD21F] flex items-center justify-center">
                    <Star className="w-4 h-4 fill-[#FFD21F]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Featured Posts
                  </h2>
                </div>
                <Link
                  href="/categories"
                  className="group inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#FFD21F] hover:text-[#FFE047] transition-colors"
                >
                  <span>View All Posts</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* 3 Featured Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {featuredPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} variant="featured" />
                ))}
              </div>
            </section>

            {/* --- Section B: Latest Articles --- */}
            <section id="latest">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#1A2230]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#168CFF]/15 text-[#168CFF] flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Latest Articles
                  </h2>
                </div>
                <Link
                  href="/search?sort=newest"
                  className="group inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#FFD21F] hover:text-[#FFE047] transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {latestPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* --- Section C: Trending Now --- */}
            <section id="trending">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#1A2230]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center">
                    <Flame className="w-4 h-4 fill-orange-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Trending Now
                  </h2>
                </div>
                <Link
                  href="/search?sort=popular"
                  className="group inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#FFD21F] hover:text-[#FFE047] transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {trendingPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar (4 columns on desktop) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar categories={categories} recentPosts={latestPosts} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
