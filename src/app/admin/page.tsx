import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  FolderOpen,
  Mail,
  MessageSquare,
  Eye,
  Plus,
  ArrowRight,
  TrendingUp,
  Settings,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { isAdminAuthenticated } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardOverview() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const { posts: allPosts } = db.getPosts({ status: 'all', limit: 100 });
  const publishedCount = allPosts.filter(p => p.status === 'published').length;
  const draftCount = allPosts.filter(p => p.status === 'draft').length;
  const totalViews = allPosts.reduce((acc, p) => acc + (p.views || 0), 0);
  const categories = db.getCategories();
  const subscribers = db.getSubscribers();
  const messages = db.getContactMessages();
  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;

  const stats = [
    {
      label: 'Published Posts',
      value: publishedCount,
      icon: FileText,
      color: '#FFD21F',
      change: `${draftCount} drafts awaiting`
    },
    {
      label: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: '#168CFF',
      change: 'Real visitor impressions'
    },
    {
      label: 'Subscribers',
      value: subscribers.length,
      icon: Mail,
      color: '#10B981',
      change: `${subscribers.filter(s => s.status === 'active').length} active`
    },
    {
      label: 'Inquiries',
      value: messages.length,
      icon: MessageSquare,
      color: '#EC4899',
      change: `${unreadMessagesCount} unread`
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1C2538]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Publishing Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Welcome back to the UbaidBlogs administration and content command center.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD21F] text-black font-extrabold text-xs sm:text-sm hover:bg-[#FFE047] shadow-[0_0_15px_rgba(255,210,31,0.3)] transition-all"
          >
            <Plus className="w-4 h-4 font-black" />
            <span>Create Article</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] flex flex-col justify-between shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400">{stat.label}</span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight block mb-1">
                  {stat.value}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/admin/posts"
          className="p-4 rounded-xl bg-[#131824] hover:bg-[#1A2130] border border-[#1F283A] text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-bold text-white block">Articles</span>
            <span className="text-[11px] text-gray-400">Manage {allPosts.length} posts</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#FFD21F] transition-colors" />
        </Link>

        <Link
          href="/admin/categories"
          className="p-4 rounded-xl bg-[#131824] hover:bg-[#1A2130] border border-[#1F283A] text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-bold text-white block">Categories</span>
            <span className="text-[11px] text-gray-400">{categories.length} topics</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#FFD21F] transition-colors" />
        </Link>

        <Link
          href="/admin/subscribers"
          className="p-4 rounded-xl bg-[#131824] hover:bg-[#1A2130] border border-[#1F283A] text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-bold text-white block">Subscribers</span>
            <span className="text-[11px] text-gray-400">{subscribers.length} total</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#FFD21F] transition-colors" />
        </Link>

        <Link
          href="/admin/messages"
          className="p-4 rounded-xl bg-[#131824] hover:bg-[#1A2130] border border-[#1F283A] text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-bold text-white block">Contact Inquiries</span>
            <span className="text-[11px] text-gray-400">{unreadMessagesCount} unread</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#FFD21F] transition-colors" />
        </Link>
      </div>

      {/* Recent Posts Table */}
      <div className="rounded-2xl bg-[#111622] border border-[#1C2538] overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#1C2538] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#FFD21F]" />
            <h2 className="text-base font-bold text-white">Recent Articles</h2>
          </div>
          <Link
            href="/admin/posts"
            className="text-xs font-semibold text-[#FFD21F] hover:underline"
          >
            View All Posts ({allPosts.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0C0F17] text-gray-400 text-[11px] uppercase tracking-wider border-b border-[#1C2538]">
              <tr>
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Published</th>
                <th className="px-5 py-3 font-semibold">Views</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#182030] text-gray-300">
              {allPosts.slice(0, 6).map((post) => (
                <tr key={post.id} className="hover:bg-[#141924]/60 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-white max-w-xs truncate">
                    <Link href={`/admin/posts/${post.id}/edit`} className="hover:text-[#FFD21F]">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#182030] text-gray-300">
                      {post.categoryName}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {post.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-950/60 text-green-400 border border-green-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/60 text-amber-400 border border-amber-500/30">
                        <Clock className="w-3 h-3" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-gray-400 text-xs">
                    {post.views}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/post/${post.slug}`}
                        target="_blank"
                        className="px-2.5 py-1 rounded bg-[#182030] hover:text-[#FFD21F] text-xs font-semibold"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="px-2.5 py-1 rounded bg-[#FFD21F] text-black hover:bg-[#FFE047] text-xs font-bold"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

