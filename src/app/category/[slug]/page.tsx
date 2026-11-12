import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { FolderOpen, ArrowLeft, Home, ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: { slug: string };
  searchParams?: { sort?: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = db.getCategoryBySlug(params.slug);
  if (!category) {
    return { title: 'Category Not Found | UbaidBlogs' };
  }

  return {
    title: `${category.name} Articles & Tutorials | UbaidBlogs`,
    description: category.description || `Browse the latest guides and tutorials in ${category.name} on UbaidBlogs.`,
    alternates: {
      canonical: `https://ubaidblogs.com/category/${category.slug}`,
    },
  };
}

export default function CategoryArchivePage({ params, searchParams }: CategoryPageProps) {
  const category = db.getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const sort = (searchParams?.sort as 'newest' | 'popular' | 'oldest') || 'newest';
  const { posts, total } = db.getPosts({
    category: category.slug,
    status: 'published',
    sort
  });

  const allCategories = db.getCategories();

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
            <Link href="/categories" className="hover:text-[#FFD21F]">Categories</Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-gray-200">{category.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Category Header Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-[#121624] via-[#0E131E] to-[#121624] border border-[#1C2538] p-8 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD21F]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/40 text-[#FFD21F] text-xs font-bold mb-4">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Category Archive</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              {category.name}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
              {category.description}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
              <span className="px-3 py-1 rounded-full bg-[#1A2233] text-gray-200">
                {total} Published {total === 1 ? 'Article' : 'Articles'}
              </span>
            </div>
          </div>
        </div>

        {/* Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Sorting Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1A2230] text-xs">
              <span className="text-gray-400">
                Showing <strong>{posts.length}</strong> of <strong>{total}</strong> articles
              </span>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Sort by:</span>
                <Link
                  href={`/category/${category.slug}?sort=newest`}
                  className={`px-2.5 py-1 rounded-lg ${sort === 'newest' ? 'bg-[#FFD21F] text-black font-bold' : 'text-gray-400 hover:text-white bg-[#141924]'}`}
                >
                  Newest
                </Link>
                <Link
                  href={`/category/${category.slug}?sort=popular`}
                  className={`px-2.5 py-1 rounded-lg ${sort === 'popular' ? 'bg-[#FFD21F] text-black font-bold' : 'text-gray-400 hover:text-white bg-[#141924]'}`}
                >
                  Popular
                </Link>
              </div>
            </div>

            {/* Articles Grid or Empty State */}
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-[#11151F] border border-[#1C2333] text-center flex flex-col items-center">
                <FolderOpen className="w-12 h-12 text-[#FFD21F]/40 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">No articles in this category yet</h3>
                <p className="text-xs text-gray-400 max-w-sm mb-6">
                  Check back soon! Our editorial team is currently drafting fresh tutorials and guides for {category.name}.
                </p>
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-xl bg-[#FFD21F] text-black font-bold text-xs hover:bg-[#FFE047]"
                >
                  Explore All Topics
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar categories={allCategories} recentPosts={posts} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

