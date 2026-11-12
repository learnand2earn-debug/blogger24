import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Map, Home, ChevronRight, FileText, FolderOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Sitemap | UbaidBlogs',
  description: 'Complete directory of all pages, categories, and articles on UbaidBlogs.',
};

export default function HtmlSitemapPage() {
  const categories = db.getCategories();
  const { posts } = db.getPosts({ status: 'published', limit: 100 });

  return (
    <div className="w-full bg-[#07090D] min-h-screen">
      <div className="bg-[#0A0E16] border-b border-[#161D2B] py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#FFD21F] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-gray-200">Sitemap</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-14">
        <div className="mb-10 pb-6 border-b border-[#1C2538]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] text-xs font-bold mb-3">
            <Map className="w-3.5 h-3.5" />
            <span>Site Navigation Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Website Sitemap
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            A comprehensive, structured index of all pages, categories, and published articles on UbaidBlogs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Pages */}
          <div className="p-6 rounded-2xl bg-[#111520] border border-[#1C2538]">
            <h2 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FFD21F]" />
              <span>Main Pages</span>
            </h2>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-[#FFD21F]">Home</Link></li>
              <li><Link href="/categories" className="text-gray-300 hover:text-[#FFD21F]">All Categories</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-[#FFD21F]">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#FFD21F]">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-[#FFD21F]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-[#FFD21F]">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-gray-300 hover:text-[#FFD21F]">Disclaimer</Link></li>
              <li><Link href="/feed.xml" className="text-[#FFD21F] hover:underline">RSS Feed (XML)</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="p-6 rounded-2xl bg-[#111520] border border-[#1C2538]">
            <h2 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-800 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[#FFD21F]" />
              <span>Topic Categories</span>
            </h2>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="text-gray-300 hover:text-[#FFD21F]">
                    {cat.name} ({cat.count} articles)
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All Published Articles */}
        <div className="mt-8 p-6 rounded-2xl bg-[#111520] border border-[#1C2538]">
          <h2 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-800">
            Published Articles ({posts.length})
          </h2>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
            {posts.map((post) => (
              <li key={post.id} className="flex items-center justify-between gap-4">
                <Link href={`/post/${post.slug}`} className="text-gray-300 hover:text-[#FFD21F] truncate">
                  {post.title}
                </Link>
                <span className="text-[11px] text-gray-500 shrink-0">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

