'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Eye,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Heading2,
  Heading3,
  AlignLeft,
  Image as ImageIcon,
  Images,
  List as ListIcon,
  Quote,
  Sparkles,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  X,
  LayoutTemplate
} from 'lucide-react';
import { Category, ContentBlock, BlockType, Post } from '@/types';

// Curated high quality preset images for one-click selection
const IMAGE_PRESETS = [
  { label: 'AI Neural', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Coding Screen', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Tech Workspace', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Modern SEO', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Futuristic Robot', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Cloud Network', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Cybersecurity', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Mobile Tech', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80' },
];

interface PostEditorProps {
  initialPost?: Post;
  categories: Category[];
  isEditing?: boolean;
}

// Convert HTML content into blocks for visual editing
function parseHtmlToBlocks(html: string): ContentBlock[] {
  if (!html) return [];
  const blocks: ContentBlock[] = [];
  const cleaned = html.replace(/\r\n/g, '\n');

  // Simple tag extractor
  const tagRegex = /<(h[23]|p|blockquote|figure|ul)[\s\S]*?<\/\1>/gi;
  let match;
  let lastIndex = 0;
  let blockId = 1;

  while ((match = tagRegex.exec(cleaned)) !== null) {
    const rawTag = match[0];
    const tagName = match[1].toLowerCase();

    if (tagName === 'h2') {
      const text = rawTag.replace(/<[^>]*>/g, '').trim();
      blocks.push({ id: `b-${blockId++}`, type: 'heading2', content: text });
    } else if (tagName === 'h3') {
      const text = rawTag.replace(/<[^>]*>/g, '').trim();
      blocks.push({ id: `b-${blockId++}`, type: 'heading3', content: text });
    } else if (tagName === 'p') {
      const text = rawTag.replace(/<[^>]*>/g, '').trim();
      if (text) blocks.push({ id: `b-${blockId++}`, type: 'paragraph', content: text });
    } else if (tagName === 'blockquote') {
      const text = rawTag.replace(/<[^>]*>/g, '').trim();
      blocks.push({ id: `b-${blockId++}`, type: 'quote', content: text });
    } else if (tagName === 'figure') {
      const imgMatch = rawTag.match(/src=["'](.*?)["']/i);
      const capMatch = rawTag.match(/<figcaption[\s\S]*?>(.*?)<\/figcaption>/i);
      if (imgMatch) {
        blocks.push({
          id: `b-${blockId++}`,
          type: 'image',
          content: '',
          url: imgMatch[1],
          caption: capMatch ? capMatch[1].replace(/<[^>]*>/g, '') : ''
        });
      }
    } else if (tagName === 'ul') {
      const liMatches = rawTag.match(/<li[\s\S]*?>(.*?)<\/li>/gi) || [];
      const items = liMatches.map(li => li.replace(/<[^>]*>/g, '').trim());
      blocks.push({ id: `b-${blockId++}`, type: 'list', content: '', items });
    }

    lastIndex = tagRegex.lastIndex;
  }

  // Fallback if parsing yielded no blocks
  if (blocks.length === 0 && html.trim()) {
    blocks.push({
      id: `b-1`,
      type: 'paragraph',
      content: html.replace(/<[^>]*>/g, '').trim()
    });
  }

  return blocks;
}

// Convert blocks into semantic clean HTML for display & SEO
function compileBlocksToHtml(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading2':
          return `<h2>${block.content}</h2>`;
        case 'heading3':
          return `<h3>${block.content}</h3>`;
        case 'paragraph':
          return `<p>${block.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />')}</p>`;
        case 'image':
          return `<figure class="my-8"><img src="${block.url}" alt="${block.alt || block.caption || 'Article illustration'}" class="w-full rounded-2xl border border-[#1E2538] object-cover max-h-[520px]" />${block.caption ? `<figcaption class="text-center text-xs text-gray-400 mt-2 italic">${block.caption}</figcaption>` : ''}</figure>`;
        case 'gallery':
          if (!block.images || block.images.length === 0) return '';
          return `<div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">${block.images.map(img => `<figure class="rounded-xl overflow-hidden border border-[#1E2538] bg-[#0E121B]"><img src="${img.url}" alt="${img.caption || 'Gallery Image'}" class="w-full h-48 sm:h-60 object-cover" />${img.caption ? `<figcaption class="p-2.5 text-center text-xs text-gray-400">${img.caption}</figcaption>` : ''}</figure>`).join('')}</div>`;
        case 'list':
          if (!block.items || block.items.length === 0) return '';
          return `<ul class="my-5 list-disc ml-6 space-y-1.5">${block.items.map(it => `<li>${it}</li>`).join('')}</ul>`;
        case 'quote':
          return `<blockquote class="border-l-4 border-[#FFD21F] bg-[#111624] p-5 rounded-r-xl italic my-6 text-gray-200">"${block.content}"</blockquote>`;
        case 'callout':
          return `<div class="p-4 rounded-xl my-6 bg-[#131A29] border-l-4 border-[#FFD21F] text-gray-200"><strong>Note:</strong> ${block.content}</div>`;
        default:
          return `<p>${block.content}</p>`;
      }
    })
    .join('\n\n');
}

export const PostEditor: React.FC<PostEditorProps> = ({
  initialPost,
  categories,
  isEditing = false
}) => {
  const router = useRouter();

  // Basic Post Details
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [category, setCategory] = useState(initialPost?.category || categories[0]?.slug || 'ai-tools');
  const [tags, setTags] = useState(initialPost?.tags?.join(', ') || 'AI, Technology');
  const [featuredImage, setFeaturedImage] = useState(
    initialPost?.featuredImage || IMAGE_PRESETS[0].url
  );
  const [galleryImages, setGalleryImages] = useState<string[]>(initialPost?.galleryImages || []);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [readingTime, setReadingTime] = useState(initialPost?.readingTime || '6 min read');
  const [status, setStatus] = useState<'published' | 'draft'>(initialPost?.status || 'published');
  const [isFeatured, setIsFeatured] = useState(initialPost?.isFeatured || false);
  const [isTrending, setIsTrending] = useState(initialPost?.isTrending || false);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialPost?.seoDescription || '');

  // Visual Gutenberg Blocks
  const [blocks, setBlocks] = useState<ContentBlock[]>(() => {
    if (initialPost?.blocks && initialPost.blocks.length > 0) {
      return initialPost.blocks;
    }
    if (initialPost?.content) {
      return parseHtmlToBlocks(initialPost.content);
    }
    // Default blocks for new post
    return [
      {
        id: 'b-1',
        type: 'paragraph',
        content: 'Write your article introduction here. In this guide, we explore the essential concepts and practical tips.'
      },
      {
        id: 'b-2',
        type: 'heading2',
        content: 'Main Key Concept & Benefits'
      },
      {
        id: 'b-3',
        type: 'paragraph',
        content: 'Explain the core idea clearly in plain language. You can add more paragraphs, headings, or images using the buttons below.'
      },
      {
        id: 'b-4',
        type: 'image',
        content: '',
        url: IMAGE_PRESETS[1].url,
        caption: 'Visual breakdown and architecture'
      }
    ];
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEditing && (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
    }
  };

  // Block management functions
  const addBlock = (type: BlockType) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: '',
      url: type === 'image' ? IMAGE_PRESETS[0].url : undefined,
      caption: '',
      items: type === 'list' ? ['First bullet point', 'Second bullet point'] : undefined,
      images: type === 'gallery' ? [
        { url: IMAGE_PRESETS[0].url, caption: 'Feature 1' },
        { url: IMAGE_PRESETS[1].url, caption: 'Feature 2' }
      ] : undefined
    };
    setBlocks(prev => [...prev, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const copy = [...blocks];
    const [moved] = copy.splice(index, 1);
    copy.splice(newIndex, 0, moved);
    setBlocks(copy);
  };

  // Extra Gallery Images Management
  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setGalleryImages(prev => [...prev, newGalleryUrl.trim()]);
      setNewGalleryUrl('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (publishStatus: 'published' | 'draft') => {
    if (!title) {
      setMessage({ type: 'error', text: 'Please enter an article title.' });
      return;
    }

    if (blocks.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one text or image block to your article.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    // Automatically compile blocks to clean semantic HTML
    const compiledContent = compileBlocksToHtml(blocks);

    const postPayload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: excerpt || title,
      content: compiledContent,
      blocks,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      featuredImage,
      galleryImages,
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
          text: isEditing ? 'Article updated successfully!' : 'Article published successfully!'
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
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1C2538]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-[#141924] hover:bg-[#1E2536] text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isEditing ? 'Edit Article' : 'Visual Article Studio'}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Write text and add images easily — like Gutenberg, with zero coding or HTML required.
            </p>
          </div>
        </div>

        {/* Tab & Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-[#10141E] p-1 rounded-xl border border-[#1E2536]">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'editor' ? 'bg-[#FFD21F] text-black shadow-[0_0_10px_rgba(255,210,31,0.3)]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>Visual Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'preview' ? 'bg-[#FFD21F] text-black shadow-[0_0_10px_rgba(255,210,31,0.3)]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>

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

      {/* Main Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Title, Excerpt, Visual Blocks (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* 1. Article Title Box */}
          <div className="p-6 rounded-2xl bg-[#111622] border border-[#1C2538] shadow-lg">
            <label className="block text-xs font-bold text-[#FFD21F] uppercase tracking-wider mb-2">
              Article Title (Main Heading) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Top 10 Free AI Tools You Must Try in 2026"
              className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-lg sm:text-xl font-black rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#FFD21F] placeholder:text-gray-600"
            />

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
              <span className="font-mono text-gray-500">URL Slug: /post/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="article-slug"
                className="flex-1 bg-[#0C0F17] border border-[#222B3D] text-gray-300 font-mono text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>
          </div>

          {/* 2. Article Excerpt Box */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] shadow-lg">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Short Description / Summary (Excerpt)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief 1-2 sentence preview of your article shown on homepage cards and Google search..."
              className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs sm:text-sm rounded-xl p-3.5 focus:outline-none focus:border-[#FFD21F] placeholder:text-gray-600"
            />
          </div>

          {/* 3. Visual Gutenberg Block Editor or Live Preview */}
          {activeTab === 'editor' ? (
            <div className="flex flex-col gap-5">
              
              {/* Quick Add Block Toolbar */}
              <div className="p-4 rounded-2xl bg-[#10141F] border border-[#1E273A] shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
                    <span>Insert Content Block (No HTML Needed):</span>
                  </span>
                  <span className="text-[11px] text-gray-500">{blocks.length} blocks in article</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => addBlock('paragraph')}
                    className="px-3.5 py-2 rounded-xl bg-[#171D2B] hover:bg-[#20293D] text-gray-200 hover:text-white text-xs font-semibold border border-[#263248] flex items-center gap-1.5 transition-all"
                  >
                    <AlignLeft className="w-3.5 h-3.5 text-[#168CFF]" />
                    <span>+ Normal Text</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addBlock('heading2')}
                    className="px-3.5 py-2 rounded-xl bg-[#171D2B] hover:bg-[#20293D] text-gray-200 hover:text-white text-xs font-semibold border border-[#263248] flex items-center gap-1.5 transition-all"
                  >
                    <Heading2 className="w-3.5 h-3.5 text-[#FFD21F]" />
                    <span>+ Section Heading (H2)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addBlock('heading3')}
                    className="px-3.5 py-2 rounded-xl bg-[#171D2B] hover:bg-[#20293D] text-gray-200 hover:text-white text-xs font-semibold border border-[#263248] flex items-center gap-1.5 transition-all"
                  >
                    <Heading3 className="w-3.5 h-3.5 text-[#FFD21F]" />
                    <span>+ Subheading (H3)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addBlock('image')}
                    className="px-3.5 py-2 rounded-xl bg-[#171D2B] hover:bg-[#20293D] text-gray-200 hover:text-white text-xs font-semibold border border-[#263248] flex items-center gap-1.5 transition-all"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>+ Article Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addBlock('gallery')}
                    className="px-3.5 py-2 rounded-xl bg-[#171D2B] hover:bg-[#20293D] text-gray-200 hover:text-white text-xs font-semibold border border-[#263248] flex items-center gap-1.5 transition-all"
                  >
                    <Images className="w-3.5 h-3.5 text-[#EC4899]" />
                    <span>+ 2-Image Gallery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addBlock('list')}
                    className="px-3.5 py-2 rounded-xl bg-[#171D2B] hover:bg-[#20293D] text-gray-200 hover:text-white text-xs font-semibold border border-[#263248] flex items-center gap-1.5 transition-all"
                  >
                    <ListIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>+ Bullet Points</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addBlock('quote')}
                    className="px-3.5 py-2 rounded-xl bg-[#171D2B] hover:bg-[#20293D] text-gray-200 hover:text-white text-xs font-semibold border border-[#263248] flex items-center gap-1.5 transition-all"
                  >
                    <Quote className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>+ Quote Box</span>
                  </button>
                </div>
              </div>

              {/* Blocks List */}
              <div className="flex flex-col gap-4">
                {blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] hover:border-[#2C384E] shadow-xl transition-all"
                  >
                    {/* Block Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1A2232] text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-[#182030] text-[#FFD21F] flex items-center justify-center font-bold text-[10px]">
                          {index + 1}
                        </span>
                        <span className="font-bold text-gray-300 uppercase tracking-wider text-[11px]">
                          {block.type === 'heading2' && 'Section Heading (H2)'}
                          {block.type === 'heading3' && 'Subheading (H3)'}
                          {block.type === 'paragraph' && 'Normal Paragraph'}
                          {block.type === 'image' && 'Article Image Block'}
                          {block.type === 'gallery' && 'Side-by-Side Image Gallery'}
                          {block.type === 'list' && 'Bullet Points List'}
                          {block.type === 'quote' && 'Quote / Highlight'}
                        </span>
                      </div>

                      {/* Reorder and Delete Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded bg-[#171D2B] hover:bg-[#222B3D] text-gray-400 hover:text-white disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 'down')}
                          disabled={index === blocks.length - 1}
                          className="p-1 rounded bg-[#171D2B] hover:bg-[#222B3D] text-gray-400 hover:text-white disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(block.id)}
                          className="p-1 rounded bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white transition-colors ml-1"
                          title="Delete Block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Block Content Inputs Based On Type */}
                    {block.type === 'heading2' && (
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        placeholder="Type section heading here..."
                        className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-base sm:text-lg font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD21F]"
                      />
                    )}

                    {block.type === 'heading3' && (
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        placeholder="Type subheading here..."
                        className="w-full bg-[#0C0F17] border border-[#222B3D] text-[#FFD21F] text-sm sm:text-base font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FFD21F]"
                      />
                    )}

                    {block.type === 'paragraph' && (
                      <textarea
                        rows={4}
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        placeholder="Type your normal text here without any coding or tags..."
                        className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-sm rounded-xl p-4 focus:outline-none focus:border-[#FFD21F] leading-relaxed"
                      />
                    )}

                    {block.type === 'image' && (
                      <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-gray-400 font-semibold mb-1">Image URL</label>
                            <input
                              type="url"
                              value={block.url || ''}
                              onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-400 font-semibold mb-1">Caption (Optional)</label>
                            <input
                              type="text"
                              value={block.caption || ''}
                              onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                              placeholder="e.g. AI Workflow Diagram"
                              className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
                            />
                          </div>
                        </div>

                        {/* Quick Presets for this image */}
                        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                          <span className="text-[10px] text-gray-500 shrink-0">Quick presets:</span>
                          {IMAGE_PRESETS.slice(0, 5).map((p) => (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => updateBlock(block.id, { url: p.url, caption: p.label })}
                              className="text-[10px] px-2 py-0.5 rounded bg-[#182030] hover:bg-[#FFD21F] hover:text-black text-gray-300 shrink-0"
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>

                        {block.url && (
                          <div className="relative aspect-[16/9] max-h-56 rounded-xl overflow-hidden bg-black/60 border border-[#20283A] mt-1">
                            <img src={block.url} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    )}

                    {block.type === 'gallery' && (
                      <div className="flex flex-col gap-3">
                        <span className="text-xs text-gray-400">Two images displayed side-by-side in article:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {block.images?.map((img, imgIdx) => (
                            <div key={imgIdx} className="p-3 rounded-xl bg-[#0C0F17] border border-[#1E2536] flex flex-col gap-2">
                              <label className="text-[10px] text-gray-400 font-bold uppercase">Image #{imgIdx + 1}</label>
                              <input
                                type="url"
                                value={img.url}
                                onChange={(e) => {
                                  const updated = [...(block.images || [])];
                                  updated[imgIdx] = { ...updated[imgIdx], url: e.target.value };
                                  updateBlock(block.id, { images: updated });
                                }}
                                placeholder="Image URL..."
                                className="w-full bg-[#111622] border border-[#222B3D] text-white text-xs rounded-lg px-2.5 py-2"
                              />
                              <input
                                type="text"
                                value={img.caption || ''}
                                onChange={(e) => {
                                  const updated = [...(block.images || [])];
                                  updated[imgIdx] = { ...updated[imgIdx], caption: e.target.value };
                                  updateBlock(block.id, { images: updated });
                                }}
                                placeholder="Caption..."
                                className="w-full bg-[#111622] border border-[#222B3D] text-gray-300 text-xs rounded-lg px-2.5 py-1.5"
                              />
                              {img.url && (
                                <img src={img.url} alt="Gallery item" className="w-full h-24 rounded-lg object-cover" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {block.type === 'list' && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] text-gray-400">List items:</span>
                        {block.items?.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-2">
                            <span className="text-[#FFD21F] font-bold">•</span>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newItems = [...(block.items || [])];
                                newItems[itemIdx] = e.target.value;
                                updateBlock(block.id, { items: newItems });
                              }}
                              className="flex-1 bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-lg px-3 py-2"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = block.items?.filter((_, i) => i !== itemIdx);
                                updateBlock(block.id, { items: newItems });
                              }}
                              className="p-1 text-gray-500 hover:text-red-400"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => updateBlock(block.id, { items: [...(block.items || []), 'New item'] })}
                          className="self-start mt-1 text-xs text-[#FFD21F] hover:underline font-semibold"
                        >
                          + Add item
                        </button>
                      </div>
                    )}

                    {block.type === 'quote' && (
                      <textarea
                        rows={2}
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        placeholder="Write quote text..."
                        className="w-full bg-[#0C0F17] border border-[#222B3D] text-white italic text-sm rounded-xl p-3"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Add Block Trigger */}
              <div className="p-4 rounded-2xl border border-dashed border-[#242E42] text-center">
                <button
                  type="button"
                  onClick={() => addBlock('paragraph')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171D2B] hover:bg-[#FFD21F] hover:text-black text-gray-200 text-xs font-bold transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Text Paragraph</span>
                </button>
              </div>

            </div>
          ) : (
            /* Live Preview Mode */
            <div className="p-8 rounded-2xl bg-[#0D111A] border border-[#1E2536] shadow-2xl">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFD21F] text-black mb-4">
                {categories.find(c => c.slug === category)?.name || 'Category'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">{title || 'Untitled Post'}</h1>
              {excerpt && <p className="text-base text-gray-300 italic mb-6">{excerpt}</p>}
              
              {featuredImage && (
                <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 border border-[#1E2536]">
                  <img src={featuredImage} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}

              <div
                className="article-body prose prose-invert max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: compileBlocksToHtml(blocks) }}
              />
            </div>
          )}

        </div>

        {/* Right Column: Front Images, Categories, Settings (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Main Front Cover Image Box */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] shadow-lg flex flex-col gap-3">
            <h3 className="text-xs font-bold text-[#FFD21F] uppercase tracking-wider pb-2 border-b border-[#1C2538] flex items-center justify-between">
              <span>Front Cover Image *</span>
              <span className="text-[10px] text-gray-400 font-normal">Card & Hero cover</span>
            </h3>

            <input
              type="url"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="Enter front cover image URL..."
              className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
            />

            {/* Quick Presets Carousel */}
            <div>
              <span className="text-[10px] text-gray-400 font-semibold block mb-1.5">
                Select from Curated Covers (1-Click):
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {IMAGE_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setFeaturedImage(p.url)}
                    className={`relative rounded-lg overflow-hidden aspect-video border transition-all ${
                      featuredImage === p.url ? 'border-[#FFD21F] scale-105 shadow-[0_0_10px_rgba(255,210,31,0.5)]' : 'border-[#222B3D] opacity-70 hover:opacity-100'
                    }`}
                    title={p.label}
                  >
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {featuredImage && (
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-[#222B3D] mt-2">
                <img src={featuredImage} alt="Main Front Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Additional Front / Gallery Images Box */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] shadow-lg flex flex-col gap-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-[#1C2538] flex items-center justify-between">
              <span>Extra Front / Gallery Images</span>
              <span className="text-[10px] text-[#FFD21F] font-bold">({galleryImages.length})</span>
            </h3>
            <p className="text-[11px] text-gray-400">
              Add multiple high-resolution photos that display in this article&apos;s photo gallery.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="url"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                placeholder="Paste extra image URL..."
                className="flex-1 bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#FFD21F]"
              />
              <button
                type="button"
                onClick={handleAddGalleryImage}
                className="px-3 py-2 rounded-xl bg-[#1A2232] hover:bg-[#FFD21F] hover:text-black text-xs font-bold text-gray-200 transition-colors"
              >
                + Add
              </button>
            </div>

            {galleryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {galleryImages.map((imgUrl, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden aspect-video border border-[#222B3D] group">
                    <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(i)}
                      className="absolute top-1 right-1 p-1 rounded bg-black/80 text-red-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Publishing Settings & Category */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] shadow-lg flex flex-col gap-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-[#1C2538]">
              Publishing Options
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              >
                <option value="published">Published (Live to visitors)</option>
                <option value="draft">Draft (Saved in Admin)</option>
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
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Estimated Reading Time</label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            <div className="pt-2 border-t border-[#1C2538] flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-gray-700 text-[#FFD21F] focus:ring-[#FFD21F]"
                />
                <span className="font-semibold">Featured Article ⭐</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="rounded border-gray-700 text-[#FFD21F] focus:ring-[#FFD21F]"
                />
                <span className="font-semibold">Trending Now 🔥</span>
              </label>
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="p-5 rounded-2xl bg-[#111622] border border-[#1C2538] shadow-lg flex flex-col gap-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-[#1C2538]">
              SEO & Social Snippets
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Google Title..."
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Search engine preview text..."
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-gray-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
