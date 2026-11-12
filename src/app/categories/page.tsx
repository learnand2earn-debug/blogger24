import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import {
  FolderOpen,
  Bot,
  Code2,
  TrendingUp,
  Megaphone,
  Globe,
  Cpu,
  Zap,
  ArrowRight,
  Home,
  ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Topics & Categories | UbaidBlogs',
  description: 'Explore all publication categories on UbaidBlogs including AI & Tools, Web Development, SEO, Digital Marketing, and WordPress.',
};

export default function CategoriesIndexPage() {
  const categories = db.getCategories();

  const iconMap: Record<string, any> = {
    'ai-tools': Bot,
    'web-development': Code2,
    'seo': TrendingUp,
    'digital-marketing': Megaphone,
    'wordpress': Globe,
    'technology': Cpu,
    'productivity': Zap,
  };

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
            <span className="text-gray-200">All Categories</span>
          </nav>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] text-xs font-bold mb-4">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Curated Topics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Browse by Category
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Select a specialized topic area to discover in-depth articles, production architectures, and step-by-step guides.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.slug] || FolderOpen;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group p-6 rounded-2xl bg-[#111622] border border-[#1C2436] hover:border-[#FFD21F]/50 shadow-lg shadow-black/40 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_20px_0_rgba(255,210,31,0.15)] flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD21F]/15 text-[#FFD21F] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1B2333] text-gray-300 group-hover:text-[#FFD21F] group-hover:bg-[#FFD21F]/15 transition-colors">
                      {cat.count} Articles
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#FFD21F] transition-colors mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFD21F] group-hover:translate-x-1 transition-transform">
                  <span>Explore Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

