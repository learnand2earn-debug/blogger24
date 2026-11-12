import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bell } from 'lucide-react';
import { HeroIllustration } from './HeroIllustration';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden pt-8 pb-14 lg:py-16 bg-gradient-to-b from-[#07090D] via-[#0B0F17] to-[#07090D] border-b border-[#161D2B]">
      {/* Ambient background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD21F]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#168CFF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Badge, Description, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#FFD21F]/40 text-[#FFD21F] text-xs font-bold tracking-wide mb-5 shadow-[0_0_15px_rgba(255,210,31,0.15)] animate-in fade-in slide-in-from-bottom-2">
              <span className="text-sm">🚀</span>
              <span>Grow Smarter with UbaidBlogs</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-5">
              Learn New Skills,<br />
              <span className="text-[#FFD21F] drop-shadow-[0_0_20px_rgba(255,210,31,0.45)]">
                Grow Your Future
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mb-8">
              Discover the latest in AI, Web Development, SEO, Digital Marketing and much more. Stay updated with expert tips, production guides, and tutorials.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#featured"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD21F] text-black font-extrabold text-sm sm:text-base hover:bg-[#FFE047] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,210,31,0.4)]"
              >
                <span>Explore Blog</span>
                <ArrowRight className="w-4 h-4 font-bold" />
              </Link>

              <a
                href="#newsletter"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#131722]/80 hover:bg-[#1C2333] border border-[#2B354A] hover:border-[#FFD21F]/60 text-white font-semibold text-sm sm:text-base transition-all"
              >
                <Bell className="w-4 h-4 text-[#FFD21F]" />
                <span>Subscribe Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Illustration (Workspace, Laptop, Robot) */}
          <div className="lg:col-span-5 flex justify-center items-center z-10 w-full">
            <HeroIllustration />
          </div>

        </div>
      </div>
    </section>
  );
};
