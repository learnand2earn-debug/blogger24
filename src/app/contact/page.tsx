import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, Clock, Home, ChevronRight } from 'lucide-react';
import { ContactForm } from '@/components/common/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | UbaidBlogs',
  description: 'Reach out to the UbaidBlogs editorial team for questions, partnerships, and technical feedback.',
};

export default function ContactPage() {
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
            <span className="text-gray-200">Contact Us</span>
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/40 text-[#FFD21F] text-xs font-bold mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Connect with UbaidBlogs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Have a question, feedback, or a collaboration proposal? Fill out the form below or contact our editorial team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl bg-[#111520] border border-[#1C2538] p-6 shadow-xl">
              <h3 className="text-base font-bold text-white mb-4">Direct Channels</h3>

              <div className="flex flex-col gap-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD21F]/15 text-[#FFD21F] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Email Address</span>
                    <a href="mailto:contact@ubaidblogs.com" className="text-white hover:text-[#FFD21F] font-semibold">
                      contact@ubaidblogs.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#168CFF]/15 text-[#168CFF] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Response Time</span>
                    <span className="text-white font-medium">Within 24 to 48 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial FAQ card */}
            <div className="rounded-2xl bg-[#111520] border border-[#1C2538] p-6">
              <h3 className="text-sm font-bold text-white mb-3">Frequently Asked Questions</h3>
              <div className="flex flex-col gap-3 text-xs text-gray-300">
                <div>
                  <strong className="text-white block mb-0.5">Can I submit a guest article?</strong>
                  <span className="text-gray-400">Yes, we review submissions that meet our high technical standards in AI, Web Dev, and SEO.</span>
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Do you offer sponsored reviews?</strong>
                  <span className="text-gray-400">We only review software we test hands-on. Inquire with details on your tool.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#111520] border border-[#1C2538] p-8 shadow-xl">
            <h2 className="text-xl font-black text-white mb-6 pb-3 border-b border-[#1C2538]">
              Send us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}
