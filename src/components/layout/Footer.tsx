import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NewsletterWidget } from '@/components/common/NewsletterWidget';
import {
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon
} from '@/components/ui/SocialIcons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#05070A] border-t border-[#161D2B] text-gray-400 overflow-hidden pt-14 pb-8">
      {/* Golden subtle ambient light ribbons in background */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FFD21F]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FFD21F]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#161D2B]">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Logo size="lg" showTagline={false} className="mb-2" />
            <span className="text-xs font-semibold text-[#FFD21F] tracking-wider uppercase mb-3">
              Dream Big, Build Smart
            </span>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              Your ultimate destination for AI, Web Development, SEO and Digital Marketing. Let&apos;s build a smarter future together.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-gray-400">
              <a
                href="https://facebook.com/ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#121622] border border-[#222A3A] hover:border-[#1877F2] hover:text-[#1877F2] flex items-center justify-center transition-colors"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com/@ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#121622] border border-[#222A3A] hover:border-[#FF0000] hover:text-[#FF0000] flex items-center justify-center transition-colors"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com/ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-8 h-8 rounded-full bg-[#121622] border border-[#222A3A] hover:border-white hover:text-white flex items-center justify-center transition-colors"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/company/ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#121622] border border-[#222A3A] hover:border-[#0A66C2] hover:text-[#0A66C2] flex items-center justify-center transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#121622] border border-[#222A3A] hover:border-[#E4405F] hover:text-[#E4405F] flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-[#FFD21F] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFD21F] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFD21F] transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#FFD21F] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FFD21F] transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#FFD21F] transition-colors">Disclaimer</Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-[#FFD21F] transition-colors">Sitemap</Link>
              </li>
            </ul>
          </div>

          {/* Our Services / Topics (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Our Services & Topics</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-[#FFD21F]">✔</span>
                <Link href="/category/web-development" className="hover:text-[#FFD21F] transition-colors">Web Development</Link>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-[#FFD21F]">✔</span>
                <Link href="/category/ai-tools" className="hover:text-[#FFD21F] transition-colors">AI Automation</Link>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-[#FFD21F]">✔</span>
                <Link href="/category/seo" className="hover:text-[#FFD21F] transition-colors">SEO Services</Link>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-[#FFD21F]">✔</span>
                <Link href="/category/digital-marketing" className="hover:text-[#FFD21F] transition-colors">Digital Marketing</Link>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-[#FFD21F]">✔</span>
                <Link href="/category/wordpress" className="hover:text-[#FFD21F] transition-colors">WordPress Consulting</Link>
              </li>
            </ul>
          </div>

          {/* Stay Updated / Newsletter (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Stay Updated</h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to get latest updates and tips directly in your inbox.
            </p>
            <NewsletterWidget variant="footer" />
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {currentYear} UbaidBlogs. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>by <strong className="text-gray-300 font-bold">UbaidBlogs</strong> | Dream Big, Build Smart</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
