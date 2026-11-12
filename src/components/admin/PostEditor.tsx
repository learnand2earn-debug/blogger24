'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Eye,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Code,
  Heading2,
  Heading3,
  List,
  Quote
} from 'lucide-react';
import { Category, Post } from '@/types';

interface PostEditorProps {
  initialPost?: Post;
  categories: Category[];
  isEditing?: boolean;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  initialPost,
  categories,
  isEditing = false
}) => {
  const router = useRouter();

  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [category, setCategory] = useState(initialPost?.category || categories[0]?.slug || 'ai-tools');
  const [tags, setTags] = useState(initialPost?.tags?.join(', ') || 'AI, Technology');
  const [featuredImage, setFeaturedImage] = useState(
    initialPost?.featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  );
  const [readingTime, setReadingTime] = useState(initialPost?.readingTime || '6 min read');
  const [status, setStatus] = useState<'published' | 'draft'>(initialPost?.status || 'published');
  const [isFeatured, setIsFeatured] = useState(initialPost?.isFeatured || false);
  const [isTrending, setIsTrending] = useState(initialPost?.isTrending || false);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialPost?.seoDescription || '');

  // UI state
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-generate slug from title if slug not manually edited
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEditing && (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
    }
  };

  // Quick insertion helpers for editor
  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.getElementById('article-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || 'Sample text';
    const newContent = content.substring(0, start) + before + selectedText + after + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 50);
  };

  const handleSave = async (publishStatus: 'published' | 'draft') => {
    if (!title || !content) {
      setMessage({ type: 'error', text: 'Please fill in both the title and article content.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const postPayload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: excerpt || title,
      content,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      featuredImage,
      readingTime,
      status: publishStatus,
      isFeatured,
      isTrending,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt
    };

    try {
      const url = isEditing ? `/api/posts/${initialPost?.id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: 'success',
          text: isEditing ? 'Article updated successfully!' : 'Article created and saved successfully!'
        });
        setTimeout(() => {
          router.push('/admin/posts');
          router.refresh();
        }, 1200);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save article.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'A network error occurred while saving.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1C2538]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-[#141924] hover:bg-[#1E2536] text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">
              {isEditing ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-xs text-gray-400">
              {isEditing ? `Editing: ${initialPost?.title}` : 'Draft and publish high-quality tech guides.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-[#151A26] hover:bg-[#1E2536] text-gray-300 font-bold text-xs transition-colors"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('published')}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-[#FFD21F] text-black font-extrabold text-xs hover:bg-[#FFE047] flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,210,31,0.3)] transition-all"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in ${
            message.type === 'success'
              ? 'bg-green-950/40 border border-green-500/30 text-green-300'
              : 'bg-red-950/40 border border-red-500/30 text-red-300'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Grid: Editor on Left, Meta & Settings on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Title, Excerpt, Content Editor (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Article Title */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538]">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Top 10 Free AI Tools You Must Try in 2026"
              className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-base sm:text-lg font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD21F]"
            />

            {/* Slug input */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-mono">/post/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-slug-url"
                className="flex-1 bg-[#0C0F17] border border-[#222B3D] text-gray-300 font-mono text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538]">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Short Excerpt / Summary
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A concise, punchy 1-2 sentence overview shown in feeds and search results..."
              className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs sm:text-sm rounded-xl p-3.5 focus:outline-none focus:border-[#FFD21F]"
            />
          </div>

          {/* Content Editor with Formatting Bar & Tabs */}
          <div className="rounded-2xl bg-[#111622] border border-[#1C2538] overflow-hidden shadow-xl">
            {/* Editor Toolbar Header */}
            <div className="p-3 bg-[#0D111A] border-b border-[#1C2538] flex flex-wrap items-center justify-between gap-3">
              {/* Tab Switcher */}
              <div className="flex items-center gap-1 bg-[#090C12] p-1 rounded-lg border border-[#1C2538]">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'write' ? 'bg-[#FFD21F] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Write</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'preview' ? 'bg-[#FFD21F] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Formatting Quick Tools */}
              {activeTab === 'write' && (
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <button
                    type="button"
                    onClick={() => insertFormatting('<h2>', '</h2>\n')}
                    className="p-1.5 rounded hover:bg-[#1C2436] hover:text-[#FFD21F]"
                    title="Insert H2 Heading"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<h3>', '</h3>\n')}
                    className="p-1.5 rounded hover:bg-[#1C2436] hover:text-[#FFD21F]"
                    title="Insert H3 Heading"
                  >
                    <Heading3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<strong>', '</strong>')}
                    className="p-1.5 rounded hover:bg-[#1C2436] hover:text-[#FFD21F] font-black"
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<pre><code class="language-javascript">\n', '\n</code></pre>\n')}
                    className="p-1.5 rounded hover:bg-[#1C2436] hover:text-[#FFD21F]"
                    title="Code Block"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<blockquote>\n  "', '"\n</blockquote>\n')}
                    className="p-1.5 rounded hover:bg-[#1C2436] hover:text-[#FFD21F]"
                    title="Blockquote"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<ul>\n  <li>', '</li>\n</ul>\n')}
                    className="p-1.5 rounded hover:bg-[#1C2436] hover:text-[#FFD21F]"
                    title="Bulleted List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Editor Body */}
            {activeTab === 'write' ? (
              <textarea
                id="article-content-textarea"
                required
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article in HTML or Markdown structure... (e.g. <h2>Introduction</h2><p>Article body...</p>)"
                className="w-full bg-[#0B0E14] text-gray-200 text-sm font-mono p-5 focus:outline-none leading-relaxed resize-y"
              />
            ) : (
              <div
                className="p-6 bg-[#0B0E14] min-h-[350px] article-body prose prose-invert max-w-none text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-500">No content entered yet...</p>' }}
              />
            )}
          </div>
        </div>

        {/* Right Column: Settings & Metadata (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Publishing Status & Highlights */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] flex flex-col gap-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-[#1C2538]">
              Publishing Settings
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              >
                <option value="published">Published (Visible to all)</option>
                <option value="draft">Draft (Admin only)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Tags (Comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="AI, Next.js, SEO"
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Reading Time</label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="e.g. 7 min read"
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            {/* Checkboxes */}
            <div className="pt-3 border-t border-[#1C2538] flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-gray-700 text-[#FFD21F] focus:ring-[#FFD21F]"
                />
                <span className="font-semibold">Mark as Featured Post</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="rounded border-gray-700 text-[#FFD21F] focus:ring-[#FFD21F]"
                />
                <span className="font-semibold">Mark as Trending Now</span>
              </label>
            </div>
          </div>

          {/* Featured Image */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] flex flex-col gap-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-[#1C2538]">
              Featured Image URL
            </h3>
            <input
              type="url"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
            />
            {featuredImage && (
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-[#222B3D] mt-2">
                <img
                  src={featuredImage}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Search Engine Optimization (SEO) */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] flex flex-col gap-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-[#1C2538]">
              Technical SEO
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Custom title tag..."
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Google SERP snippet description..."
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
