'use client';

import React, { useState, useEffect } from 'react';
import { FolderOpen, Plus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setSubmitting(true);
    setMsg(null);

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      });
      const data = await res.json();

      if (res.ok) {
        setCategories(prev => [...prev, data.category]);
        setName('');
        setDescription('');
        setMsg({ type: 'success', text: 'Category added successfully!' });
      } else {
        setMsg({ type: 'error', text: data.error || 'Failed to add category.' });
      }
    } catch {
      setMsg({ type: 'error', text: 'Network error occurred.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="pb-4 border-b border-[#1C2538]">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Categories Management</h1>
        <p className="text-xs text-gray-400 mt-1">
          Organize your articles into targeted publication categories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Add Category Form (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111622] border border-[#1C2538] shadow-xl">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#FFD21F]" />
            <span>Add New Category</span>
          </h2>

          <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Category Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cloud & DevOps"
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short editorial summary of what this category covers..."
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl p-3 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            {msg && (
              <div
                className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                  msg.type === 'success' ? 'bg-green-950/40 text-green-300 border border-green-500/30' : 'bg-red-950/40 text-red-300 border border-red-500/30'
                }`}
              >
                {msg.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
                <span>{msg.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="py-2.5 px-4 rounded-xl bg-[#FFD21F] text-black font-extrabold text-xs hover:bg-[#FFE047] flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(255,210,31,0.25)]"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              <span>Add Category</span>
            </button>
          </form>
        </div>

        {/* Existing Categories Table (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#111622] border border-[#1C2538] overflow-hidden shadow-xl">
          <div className="p-4 border-b border-[#1C2538] flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[#FFD21F]" />
              <span>Active Categories ({categories.length})</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0C0F17] text-gray-400 text-[11px] uppercase tracking-wider border-b border-[#1C2538]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Articles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#182030] text-gray-300">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                      Loading categories...
                    </td>
                  </tr>
                ) : (
                  categories.map((c) => (
                    <tr key={c.id} className="hover:bg-[#141924]/60">
                      <td className="px-4 py-3.5 font-bold text-white">
                        {c.name}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-gray-400">
                        {c.slug}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#182030] text-[#FFD21F] font-bold text-[11px]">
                          {c.count}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

