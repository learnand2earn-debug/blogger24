import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Post } from '@/types';

interface ArticleCardProps {
  post: Post;
  variant?: 'featured' | 'standard' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  post,
  variant = 'standard'
}) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group relative flex flex-col h-full rounded-2xl bg-[#11151F] border border-[#1C2333] hover:border-[#FFD21F]/40 shadow-lg shadow-black/40 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_20px_0_rgba(255,210,31,0.15)] transition-all duration-300 overflow-hidden">
      {/* Article Cover Image */}
      <Link href={`/post/${post.slug}`} className="relative w-full aspect-[16/10] overflow-hidden bg-[#0A0D14] block">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11151F] via-transparent to-transparent opacity-80" />

        {/* Category Pill on top left */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFD21F] text-black shadow-md shadow-black/50">
            {post.categoryName}
          </span>
        </div>

        {/* Views badge if trending */}
        {post.isTrending && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/75 border border-[#FFD21F]/40 text-[#FFD21F] backdrop-blur-md">
              🔥 Trending
            </span>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFD21F] transition-colors line-clamp-2 leading-snug mb-2.5">
            <Link href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {post.excerpt && variant !== 'compact' && (
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Card Footer: Metadata + Yellow Action Button */}
        <div className="pt-3 border-t border-[#1C2333] flex items-center justify-between text-[11px] sm:text-xs text-gray-400 mt-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{formattedDate}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{post.readingTime}</span>
            </span>
          </div>

          <Link
            href={`/post/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="w-8 h-8 rounded-full bg-[#FFD21F] text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FFE047] transition-all shadow-[0_0_10px_rgba(255,210,31,0.3)] shrink-0 ml-2"
          >
            <ArrowRight className="w-4 h-4 font-bold" />
          </Link>
        </div>
      </div>
    </article>
  );
};
