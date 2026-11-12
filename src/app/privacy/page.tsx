import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | UbaidBlogs',
  description: 'Understand how UbaidBlogs collects, uses, and protects your information.',
};

export default function PrivacyPolicyPage() {
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
            <span className="text-gray-200">Privacy Policy</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-14">
        <div className="mb-8 pb-6 border-b border-[#1C2538]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] text-xs font-bold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-400">
            Effective Date: November 11, 2026 | Last updated: November 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Welcome to <strong>UbaidBlogs</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We respect your privacy and are committed to protecting any personal information you share with us through our website.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">1. Information We Collect</h2>
          <p>
            We only collect personal information that you intentionally provide:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Newsletter Subscriptions:</strong> Your email address when you voluntarily subscribe to our updates.</li>
            <li><strong>Contact Inquiries:</strong> Your name, email, and message content when submitting our contact form.</li>
            <li><strong>Article Comments:</strong> Your display name, email, and comment text when posting in our discussion threads.</li>
            <li><strong>Technical Analytics:</strong> Anonymized server logs including browser type, referring pages, and timestamp to maintain security and monitor site performance.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">2. How We Use Your Information</h2>
          <p>We use your information strictly to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Deliver our email newsletter and technical digests when requested.</li>
            <li>Respond to direct messages and collaboration inquiries.</li>
            <li>Prevent spam, security exploits, and brute-force attacks.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">3. Unsubscribe & Data Deletion</h2>
          <p>
            You may unsubscribe from our newsletter at any time by clicking the unsubscribe link present in every email or contacting us at <a href="mailto:privacy@ubaidblogs.com" className="text-[#FFD21F]">privacy@ubaidblogs.com</a>. Upon request, we will promptly delete your email address from our active subscriber database.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">4. Cookies & Tracking Technologies</h2>
          <p>
            UbaidBlogs uses minimal essential cookies for session management (such as administrator authentication) and theme preferences. We do not sell user data to advertising brokers or data aggregators.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact our data team via email at <a href="mailto:privacy@ubaidblogs.com" className="text-[#FFD21F]">privacy@ubaidblogs.com</a> or through our <Link href="/contact" className="text-[#FFD21F]">contact page</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}

