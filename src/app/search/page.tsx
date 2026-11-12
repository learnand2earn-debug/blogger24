import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { Search, Home, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface SearchPageProps {
  searchParams: {
    q?: string;
    sort?: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q ? `"${searchParams.q}"` : 'Articles';
  return {
    title: `Search: ${query} | UbaidBlogs`,
    description: `Search results for ${query} on UbaidBlogs.`,
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const sort = (searchParams.sort as 'newest' | 'popular' | 'oldest') || 'newest';

  const { posts, total } = db.getPosts({
    search: query,
    status: 'published',
    sort
  });

  const categories = db.getCategories();

  return (
    <div className="w-full bg-[#07090D] min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-[#0A0E16] border-b border-[#161D2B] py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#FFD21F] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-gray-200">Search Results</span>
          </nav>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Search Input Banner */}
        <div className="rounded-2xl bg-[#111622] border border-[#1C2538] p-6 sm:p-8 mb-10 shadow-xl">
          <form method="GET" action="/search" className="max-w-2xl">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Search Database
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by keywords, topic, or tools..."
                className="w-full bg-[#0B0E14] border border-[#222B3D] text-white text-sm sm:text-base rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-2 w-9 h-9 rounded-lg bg-[#FFD21F] text-black flex items-center justify-center hover:bg-[#FFE047] transition-all"
              >
                <Search className="w-4 h-4 font-bold" />
              </button>
            </div>
          </form>

          {query && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
              <p>
                Found <strong>{total}</strong> {total === 1 ? 'result' : 'results'} for &ldquo;<span className="text-white font-semibold">{query}</span>&rdquo;
              </p>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FFD21F]" />
                <span className="text-gray-500 font-medium">Sort:</span>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&sort=newest`}
                  className={`px-2.5 py-1 rounded-lg ${sort === 'newest' ? 'bg-[#FFD21F] text-black font-bold' : 'bg-[#182030] text-gray-300'}`}
                >
                  Newest
                </Link>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&sort=popular`}
                  className={`px-2.5 py-1 rounded-lg ${sort === 'popular' ? 'bg-[#FFD21F] text-black font-bold' : 'bg-[#182030] text-gray-300'}`}
                >
                  Popular
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Results Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-[#11151F] border border-[#1C2333] text-center flex flex-col items-center">
                <Search className="w-12 h-12 text-[#FFD21F]/40 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">No matching articles found</h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-sm mb-6">
                  We could not find any articles matching your search criteria. Try using different keywords or explore our popular categories below.
                </p>
                <Link
                  href="/categories"
                  className="px-5 py-2.5 rounded-xl bg-[#FFD21F] text-black font-bold text-xs hover:bg-[#FFE047]"
                >
                  Browse All Categories
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <Sidebar categories={categories} recentPosts={posts} />
          </div>
        </div>
      </main>
    </div>
  );
}

