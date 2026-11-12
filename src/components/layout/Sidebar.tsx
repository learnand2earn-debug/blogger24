import React from 'react';
import Link from 'next/link';
import {
  Mail,
  Flame,
  FolderOpen,
  Bot,
  Code2,
  TrendingUp,
  Megaphone,
  Globe,
  Cpu,
  LucideIcon
} from 'lucide-react';
import { Category, Post } from '@/types';
import { NewsletterWidget } from '@/components/common/NewsletterWidget';
import {
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon
} from '@/components/ui/SocialIcons';

interface SidebarProps {
  categories: Category[];
  recentPosts?: Post[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  recentPosts = []
}) => {
  const categoryIcons: Record<string, LucideIcon> = {
    'ai-tools': Bot,
    'web-development': Code2,
    'seo': TrendingUp,
    'digital-marketing': Megaphone,
    'wordpress': Globe,
    'technology': Cpu
  };

  return (
    <aside className="w-full flex flex-col gap-8">
      {/* 1. Follow Us Box */}
      <div className="rounded-2xl bg-[#11151F] border border-[#1C2333] p-5 shadow-lg shadow-black/40">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#FFD21F] text-base">🔗</span>
          <h3 className="text-base font-extrabold text-white">Follow Us</h3>
        </div>
        <p className="text-xs text-gray-400 mb-4">Stay connected for latest updates!</p>

        <div className="grid grid-cols-5 gap-2">
          <a
            href="https://facebook.com/ubaidblogs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="h-10 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2] border border-[#1877F2]/30 text-[#1877F2] hover:text-white flex items-center justify-center transition-all hover:scale-105"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com/@ubaidblogs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="h-10 rounded-xl bg-[#FF0000]/10 hover:bg-[#FF0000] border border-[#FF0000]/30 text-[#FF0000] hover:text-white flex items-center justify-center transition-all hover:scale-105"
          >
            <YoutubeIcon className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com/ubaidblogs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="h-10 rounded-xl bg-white/10 hover:bg-white border border-white/20 text-white hover:text-black flex items-center justify-center transition-all hover:scale-105"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/company/ubaidblogs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="h-10 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2] border border-[#0A66C2]/30 text-[#0A66C2] hover:text-white flex items-center justify-center transition-all hover:scale-105"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com/ubaidblogs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="h-10 rounded-xl bg-[#E4405F]/10 hover:bg-[#E4405F] border border-[#E4405F]/30 text-[#E4405F] hover:text-white flex items-center justify-center transition-all hover:scale-105"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 2. Subscribe to Our Newsletter Box */}
      <div id="newsletter" className="relative rounded-2xl bg-gradient-to-b from-[#141824] to-[#0E121B] border border-[#FFD21F]/30 p-5 shadow-lg shadow-black/50 overflow-hidden">
        <div className="absolute top-3 right-3 opacity-25 pointer-events-none">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#FFD21F" strokeWidth="1.5">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-[#FFD21F]" />
          <h3 className="text-base font-extrabold text-white">Subscribe to Our Newsletter</h3>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          Get the latest articles, tips and updates directly in your inbox.
        </p>

        <NewsletterWidget variant="sidebar" />
      </div>

      {/* 3. Popular Categories Box */}
      <div className="rounded-2xl bg-[#11151F] border border-[#1C2333] p-5 shadow-lg shadow-black/40">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1C2333]">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-[#FFD21F]" />
            <h3 className="text-base font-extrabold text-white">Popular Categories</h3>
          </div>
          <Link href="/categories" className="text-[11px] font-semibold text-[#FFD21F] hover:underline">
            View All →
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {categories.slice(0, 6).map((cat) => {
            const Icon = categoryIcons[cat.slug] || FolderOpen;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#141824]/60 hover:bg-[#1C2333] border border-transparent hover:border-[#FFD21F]/30 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#FFD21F]/10 text-[#FFD21F] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {cat.name}
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1F2738] text-gray-300 group-hover:text-[#FFD21F] group-hover:bg-[#FFD21F]/15 transition-colors">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Trending / Recent Articles Box */}
      {recentPosts.length > 0 && (
        <div className="rounded-2xl bg-[#11151F] border border-[#1C2333] p-5 shadow-lg shadow-black/40">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1C2333]">
            <Flame className="w-4 h-4 text-[#FFD21F]" />
            <h3 className="text-base font-extrabold text-white">Recently Published</h3>
          </div>

          <div className="flex flex-col gap-3.5">
            {recentPosts.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="group flex gap-3 items-center"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#161B26] border border-[#222A3A]">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#FFD21F] uppercase tracking-wider block mb-0.5">
                    {post.categoryName}
                  </span>
                  <h4 className="text-xs font-semibold text-gray-200 group-hover:text-[#FFD21F] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    {post.readingTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
