'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Edit,
  ExternalLink,
  Loader2,
  Filter
} from 'lucide-react';
import { Category, Post } from '@/types';

interface PostsManagerClientProps {
  initialPosts: Post[];
  categories: Category[];
}

export const PostsManagerClient: React.FC<PostsManagerClientProps> = ({
  initialPosts,
  categories
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const router = useRouter();

  // Filter posts
  const filtered = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.categoryName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Toggle publish/unpublish
  const handleToggleStatus = async (post: Post) => {
    setTogglingId(post.id);
    const newStatus = post.status === 'published' ? 'draft' : 'published';

    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
        router.refresh();
      }
    } catch {} finally {
      setTogglingId(null);
    }
  };

  // Delete post
  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== id));
        router.refresh();
      }
    } catch {} finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1C2538]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">All Articles</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage, edit, publish, or remove articles across all categories.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD21F] text-black font-extrabold text-xs sm:text-sm hover:bg-[#FFE047] shadow-[0_0_15px_rgba(255,210,31,0.3)] transition-all"
        >
          <Plus className="w-4 h-4 font-black" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-xl bg-[#111622] border border-[#1C2538] flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Filter by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
          />
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3" />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-300 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-36">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-300 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>

        <div className="ml-auto text-xs text-gray-400 font-semibold">
          Showing {filtered.length} of {posts.length} posts
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl bg-[#111622] border border-[#1C2538] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0C0F17] text-gray-400 text-[11px] uppercase tracking-wider border-b border-[#1C2538]">
              <tr>
                <th className="px-5 py-3 font-semibold">Article</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Views</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#182030] text-gray-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-gray-500">
                    No articles match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-[#141924]/60 transition-colors">
                    <td className="px-5 py-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-900 shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="font-bold text-white hover:text-[#FFD21F] line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          <span className="text-[11px] text-gray-500 block truncate">
                            /post/{post.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#182030] text-gray-300 whitespace-nowrap">
                        {post.categoryName}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        disabled={togglingId === post.id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                          post.status === 'published'
                            ? 'bg-green-950/60 text-green-400 border border-green-500/30 hover:bg-green-900/60'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-500/30 hover:bg-amber-900/60'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {togglingId === post.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : post.status === 'published' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{post.status === 'published' ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-400">
                      {post.views}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/post/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-[#141924] hover:bg-[#1C2538] text-gray-400 hover:text-white"
                          title="View Live Article"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-1.5 rounded-lg bg-[#FFD21F]/15 hover:bg-[#FFD21F] text-[#FFD21F] hover:text-black transition-colors"
                          title="Edit Article"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletingId === post.id}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                          title="Delete Article"
                        >
                          {deletingId === post.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

