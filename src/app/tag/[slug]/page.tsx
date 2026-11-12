import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { Tag, Home, ChevronRight } from 'lucide-react';

interface TagPageProps {
  params: { slug: string };
  searchParams?: { sort?: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tagName = params.slug.replace(/-/g, ' ');
  return {
    title: `#${tagName} Articles | UbaidBlogs`,
    description: `Browse all articles tagged with #${tagName} on UbaidBlogs.`,
  };
}

export default function TagArchivePage({ params, searchParams }: TagPageProps) {
  const sort = (searchParams?.sort as 'newest' | 'popular' | 'oldest') || 'newest';
  const tagSlug = params.slug;

  const { posts, total } = db.getPosts({
    tag: tagSlug,
    status: 'published',
    sort
  });

  const categories = db.getCategories();
  const tagName = tagSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="w-full bg-[#07090D] min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-[#0A0E16] border-b border-[#161D2B] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#FFD21F] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span>Tags</span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-gray-200">#{tagName}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="rounded-2xl bg-[#111622] border border-[#1C2538] p-8 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] text-xs font-bold mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Topic Tag</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            #{tagName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Showing {total} {total === 1 ? 'article' : 'articles'} matching this topic tag.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-[#11151F] border border-[#1C2333] text-center">
                <p className="text-sm text-gray-400 mb-4">No articles found with this tag.</p>
                <Link href="/" className="px-5 py-2.5 rounded-xl bg-[#FFD21F] text-black font-bold text-xs">
                  Return to Home
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
