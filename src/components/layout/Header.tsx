'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import {
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon
} from '@/components/ui/SocialIcons';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navCategories = [
    {
      title: "Tech",
      href: "/category/technology",
      items: [
        { label: "Cloud & DevOps", href: "/category/technology" },
        { label: "Cybersecurity", href: "/category/technology" },
        { label: "Hardware & Gadgets", href: "/category/technology" }
      ]
    },
    {
      title: "AI & Tools",
      href: "/category/ai-tools",
      items: [
        { label: "LLMs & GPTs", href: "/category/ai-tools" },
        { label: "AI Automation", href: "/category/ai-tools" },
        { label: "Developer AI Tools", href: "/category/ai-tools" }
      ]
    },
    {
      title: "Web Development",
      href: "/category/web-development",
      items: [
        { label: "Next.js & React", href: "/category/web-development" },
        { label: "Tailwind CSS", href: "/category/web-development" },
        { label: "Full-Stack APIs", href: "/category/web-development" }
      ]
    },
    {
      title: "SEO",
      href: "/category/seo",
      items: [
        { label: "Core Web Vitals", href: "/category/seo" },
        { label: "Semantic Search", href: "/category/seo" },
        { label: "Link Building", href: "/category/seo" }
      ]
    },
    {
      title: "Digital Marketing",
      href: "/category/digital-marketing",
      items: [
        { label: "Content Strategy", href: "/category/digital-marketing" },
        { label: "Social Media Growth", href: "/category/digital-marketing" },
        { label: "Email Funnels", href: "/category/digital-marketing" }
      ]
    },
    {
      title: "More",
      href: "/categories",
      items: [
        { label: "WordPress Masterclass", href: "/category/wordpress" },
        { label: "Productivity Hacks", href: "/category/productivity" },
        { label: "About UbaidBlogs", href: "/about" },
        { label: "Contact Us", href: "/contact" }
      ]
    }
  ];

  return (
    <header className="w-full z-50 sticky top-0 transition-all duration-300">
      {/* 1. Slim Announcement Bar */}
      <div className="bg-[#0B0E14] border-b border-[#1A202C] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Announcement text */}
          <div className="flex items-center gap-2 text-gray-300">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FFD21F]/20 text-[#FFD21F]">
              🚀
            </span>
            <span className="font-medium">
              Welcome to <strong className="text-white">UbaidBlogs</strong> — Learn, Grow & Stay Ahead!
            </span>
          </div>

          {/* Top Utility Links & Socials */}
          <div className="flex items-center gap-4 text-gray-400">
            <nav className="hidden lg:flex items-center gap-3 text-[11px] font-medium tracking-wide">
              <Link href="/about" className="hover:text-[#FFD21F] transition-colors">About Us</Link>
              <span className="text-gray-700">|</span>
              <Link href="/contact" className="hover:text-[#FFD21F] transition-colors">Contact</Link>
              <span className="text-gray-700">|</span>
              <Link href="/privacy" className="hover:text-[#FFD21F] transition-colors">Privacy Policy</Link>
              <span className="text-gray-700">|</span>
              <Link href="/sitemap" className="hover:text-[#FFD21F] transition-colors">Sitemap</Link>
              <span className="text-gray-700">|</span>
              <Link href="/admin" className="text-gray-400 hover:text-[#FFD21F] transition-colors flex items-center gap-1">
                Admin
              </Link>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-gray-800">
              <a
                href="https://facebook.com/ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[#1877F2] transition-colors"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com/@ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-[#FF0000] transition-colors"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com/ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="hover:text-white transition-colors"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/company/ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#0A66C2] transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/ubaidblogs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#E4405F] transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07090D]/95 backdrop-blur-md shadow-lg shadow-black/60 border-b border-[#1E2533]'
            : 'bg-[#07090D] border-b border-[#151A24]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav ref={dropdownRef} className="hidden xl:flex items-center gap-1.5">
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname === '/'
                  ? 'bg-[#FFD21F] text-black shadow-[0_0_15px_rgba(255,210,31,0.4)]'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <span>Home</span>
            </Link>

            {navCategories.map((cat) => {
              const isActive = pathname.startsWith(cat.href);
              const isOpen = activeDropdown === cat.title;

              return (
                <div key={cat.title} className="relative">
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : cat.title)}
                    onMouseEnter={() => setActiveDropdown(cat.title)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                      isActive ? 'text-[#FFD21F]' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span>{cat.title}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-2 w-52 rounded-xl bg-[#11151C] border border-[#222A3A] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1"
                    >
                      <Link
                        href={cat.href}
                        className="block px-3 py-2 rounded-lg text-xs font-bold text-[#FFD21F] hover:bg-[#1A202C] transition-colors mb-1"
                      >
                        All in {cat.title} →
                      </Link>
                      <div className="h-[1px] bg-gray-800 mb-1" />
                      {cat.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-3 py-1.5 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-[#1A202C] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Search Bar & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-60 bg-[#121620] border border-[#202736] text-white text-xs rounded-full pl-3.5 pr-10 py-2 focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F] transition-all placeholder:text-gray-500"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 w-7 h-7 rounded-full bg-[#FFD21F] text-black flex items-center justify-center hover:bg-[#FFE047] hover:scale-105 transition-all shadow-[0_0_10px_rgba(255,210,31,0.3)]"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#141822] border border-[#202736] text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FFD21F]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0B0E14] border-l border-[#1F2633] p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-gray-800">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-gray-800/60 text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="mt-5 relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#121620] border border-[#202736] text-white text-sm rounded-xl pl-4 pr-11 py-2.5 focus:outline-none focus:border-[#FFD21F]"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-[#FFD21F] text-black flex items-center justify-center"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              <nav className="mt-6 flex flex-col gap-2">
                <Link
                  href="/"
                  className="px-4 py-2.5 rounded-xl font-bold text-sm bg-[#FFD21F] text-black"
                >
                  Home
                </Link>

                {navCategories.map((cat) => (
                  <div key={cat.title} className="rounded-xl bg-[#121622] border border-[#1C2331] overflow-hidden">
                    <Link
                      href={cat.href}
                      className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-gray-200 hover:text-[#FFD21F]"
                    >
                      <span>{cat.title}</span>
                      <span className="text-xs text-gray-500">Explore →</span>
                    </Link>
                  </div>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-gray-800">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pages</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  <Link href="/about" className="p-2 rounded bg-[#121622] hover:text-[#FFD21F]">About Us</Link>
                  <Link href="/contact" className="p-2 rounded bg-[#121622] hover:text-[#FFD21F]">Contact Us</Link>
                  <Link href="/privacy" className="p-2 rounded bg-[#121622] hover:text-[#FFD21F]">Privacy Policy</Link>
                  <Link href="/sitemap" className="p-2 rounded bg-[#121622] hover:text-[#FFD21F]">Sitemap</Link>
                  <Link href="/admin" className="p-2 rounded bg-[#121622] text-[#FFD21F] font-bold">Admin Portal</Link>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-800 text-center">
              <div className="flex justify-center gap-4 text-gray-400 mb-3">
                <a href="https://facebook.com/ubaidblogs" target="_blank" rel="noreferrer"><FacebookIcon className="w-4 h-4" /></a>
                <a href="https://youtube.com/@ubaidblogs" target="_blank" rel="noreferrer"><YoutubeIcon className="w-4 h-4" /></a>
                <a href="https://twitter.com/ubaidblogs" target="_blank" rel="noreferrer"><TwitterIcon className="w-4 h-4" /></a>
                <a href="https://linkedin.com/company/ubaidblogs" target="_blank" rel="noreferrer"><LinkedinIcon className="w-4 h-4" /></a>
                <a href="https://instagram.com/ubaidblogs" target="_blank" rel="noreferrer"><InstagramIcon className="w-4 h-4" /></a>
              </div>
              <p className="text-[11px] text-gray-500">© 2026 UbaidBlogs. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
