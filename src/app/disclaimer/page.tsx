import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer | UbaidBlogs',
  description: 'Editorial and technical disclaimer for UbaidBlogs content.',
};

export default function DisclaimerPage() {
  return (
    <div className="w-full bg-[#07090D] min-h-screen">
      <div className="bg-[#0A0E16] border-b border-[#161D2B] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#FFD21F] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-gray-200">Disclaimer</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-14">
        <div className="mb-8 pb-6 border-b border-[#1C2538]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] text-xs font-bold mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Editorial Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Website Disclaimer
          </h1>
          <p className="text-xs text-gray-400">
            Effective Date: November 11, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            The content provided on <strong>UbaidBlogs</strong> is for educational, informational, and technical reference purposes only.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">1. Technical Accuracy</h2>
          <p>
            While our authors and engineers strive to provide accurate code examples, configurations, and benchmarks, technology platforms evolve rapidly. You are encouraged to test software architectures in sandboxed environments before deploying to production systems.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">2. Third-Party Links & Services</h2>
          <p>
            Our website contains links to external tools, documentation repositories, and third-party services. We have no control over the content, policies, or practices of third-party websites and assume no liability for them.
          </p>
        </div>
      </main>
    </div>
  );
}

