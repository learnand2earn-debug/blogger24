import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Sparkles, BookOpen, ShieldCheck, ArrowRight, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | UbaidBlogs',
  description: 'Learn about the editorial mission, technology standards, and vision behind UbaidBlogs.',
};

export default function AboutPage() {
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
            <span className="text-gray-200">About Us</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-14">
        {/* Header Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/40 text-[#FFD21F] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story & Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Knowledge • Technology • Success
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            At <strong>UbaidBlogs</strong>, we empower developers, marketers, entrepreneurs, and tech enthusiasts to master modern computing through actionable, production-grade insights.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="flex flex-col gap-10 text-gray-300 leading-relaxed text-sm sm:text-base">
          
          {/* Mission Card */}
          <div className="rounded-2xl bg-[#111520] border border-[#1C2538] p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFD21F]/15 text-[#FFD21F] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Our Editorial Mission</h2>
            </div>
            <p className="mb-4">
              The technology landscape in 2026 is moving faster than ever before. With rapid advancements in generative artificial intelligence, agentic workflows, headless architectures, and algorithm changes, developers and digital marketers require clear, fluff-free guidance.
            </p>
            <p>
              UbaidBlogs was created to bridge the gap between complex software documentation and real-world execution. Every tutorial we publish is tested, code-verified, and designed to save you hours of trial and error.
            </p>
          </div>

          {/* Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-[#111520] border border-[#1C2538]">
              <div className="w-8 h-8 rounded-lg bg-[#168CFF]/20 text-[#168CFF] flex items-center justify-center mb-4">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Practical Depth</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                We avoid surface-level summaries. Our guides provide working code samples, architectural diagrams, and real benchmarks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111520] border border-[#1C2538]">
              <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mb-4">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Editorial Integrity</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                All recommendations are based on actual tool testing. We never promote products we do not trust and use ourselves.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111520] border border-[#1C2538]">
              <div className="w-8 h-8 rounded-lg bg-[#FFD21F]/20 text-[#FFD21F] flex items-center justify-center mb-4">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Future Ready</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                From autonomous AI copilots to next-generation search algorithms, we keep you informed about tomorrow&apos;s technology today.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="rounded-2xl bg-gradient-to-r from-[#171D2B] to-[#121622] border border-[#FFD21F]/30 p-8 text-center flex flex-col items-center">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Have a question or proposal?</h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md mb-6">
              We welcome article suggestions, technical feedback, and partnership inquiries from our global community.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD21F] text-black font-extrabold text-xs sm:text-sm hover:bg-[#FFE047]"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}

