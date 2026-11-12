'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Mail,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export const AdminNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show admin nav
  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {}
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Articles', href: '/admin/posts', icon: FileText },
    { label: 'Categories', href: '/admin/categories', icon: FolderOpen },
    { label: 'Subscribers', href: '/admin/subscribers', icon: Mail },
    { label: 'Inquiries', href: '/admin/messages', icon: MessageSquare },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <nav className="w-full bg-[#0B0E14] border-b border-[#1C2538] sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        {/* Brand & Badge */}
        <div className="flex items-center gap-4">
          <Logo size="sm" showTagline={false} />
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFD21F]/15 border border-[#FFD21F]/40 text-[#FFD21F]">
            Admin Studio
          </span>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#FFD21F] text-black shadow-[0_0_12px_rgba(255,210,31,0.3)]'
                    : 'text-gray-300 hover:text-white hover:bg-[#141924]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin/posts/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFD21F] text-black text-xs font-bold hover:bg-[#FFE047]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Post</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-lg bg-[#141924] hover:bg-[#1C2333] text-gray-300 hover:text-white transition-colors"
            title="View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-[#141924] hover:bg-red-950/60 text-gray-300 hover:text-red-400 border border-transparent hover:border-red-500/40 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

