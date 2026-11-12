import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | UbaidBlogs',
  description: 'Review the terms and conditions governing the use of UbaidBlogs.',
};

export default function TermsPage() {
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
            <span className="text-gray-200">Terms of Service</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-14">
        <div className="mb-8 pb-6 border-b border-[#1C2538]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] text-xs font-bold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-xs text-gray-400">
            Effective Date: November 11, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            By accessing or using the website at <strong>UbaidBlogs</strong>, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using the platform.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">1. Intellectual Property</h2>
          <p>
            All original articles, code snippets, visual graphics, logos, and instructional content on UbaidBlogs are the intellectual property of UbaidBlogs and protected by applicable copyright laws. You may quote excerpts or share links with proper attribution, but wholesale reproduction or scraping without explicit written consent is prohibited.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">2. User Conduct in Discussions</h2>
          <p>
            When submitting comments or messages, you agree not to submit spam, promotional solicitations, defamatory language, malicious scripts, or copyrighted material without permission. We reserve the right to remove any comments that violate these guidelines.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">3. Changes to Terms</h2>
          <p>
            We may revise these Terms of Service periodically. Your continued use of the website following any modifications constitutes your acceptance of the revised terms.
          </p>
        </div>
      </main>
    </div>
  );
}

