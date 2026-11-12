'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Copy,
  Check,
  MessageSquare,
  Send,
  Loader2,
  List
} from 'lucide-react';
import { Comment, Post } from '@/types';
import { FacebookIcon, TwitterIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

interface ArticleInteractiveProps {
  post: Post;
  headings: { id: string; text: string; level: number }[];
}

export const ArticleInteractive: React.FC<ArticleInteractiveProps> = ({
  post,
  headings
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentStatus, setCommentStatus] = useState<string | null>(null);

  // 1. Record view count on mount
  useEffect(() => {
    fetch(`/api/posts/${post.id}/view`, { method: 'POST' }).catch(() => {});
  }, [post.id]);

  // 2. Fetch comments on mount
  useEffect(() => {
    fetch(`/api/posts/${post.id}/comments`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data);
      })
      .catch(() => {})
      .finally(() => setLoadingComments(false));
  }, [post.id]);

  // 3. Inject copy buttons into pre/code blocks in content
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('.article-body pre');
    codeBlocks.forEach((block) => {
      if (block.querySelector('.copy-code-btn')) return;

      block.classList.add('relative', 'group');
      const btn = document.createElement('button');
      btn.className = 'copy-code-btn absolute top-2 right-2 px-2.5 py-1 text-[11px] font-semibold bg-[#1C2333] hover:bg-[#FFD21F] hover:text-black text-gray-300 rounded border border-[#2B354A] transition-colors opacity-90';
      btn.innerText = 'Copy Code';

      btn.addEventListener('click', async () => {
        const codeElement = block.querySelector('code');
        const codeText = codeElement ? codeElement.innerText : block.textContent || '';
        try {
          await navigator.clipboard.writeText(codeText);
          btn.innerText = 'Copied! ✓';
          setTimeout(() => {
            btn.innerText = 'Copy Code';
          }, 2000);
        } catch {
          btn.innerText = 'Error';
        }
      });

      block.appendChild(btn);
    });
  }, [post.content]);

  // Copy share URL
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {}
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://ubaidblogs.com/post/${post.slug}`;
  const encodedTitle = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(currentUrl);

  // Submit comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !authorEmail || !content) return;

    setSubmitting(true);
    setCommentStatus(null);

    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName, authorEmail, content })
      });
      const data = await res.json();

      if (res.ok) {
        setComments(prev => [data.comment, ...prev]);
        setAuthorName('');
        setAuthorEmail('');
        setContent('');
        setCommentStatus('Your comment has been posted successfully!');
      } else {
        setCommentStatus(data.error || 'Failed to post comment.');
      }
    } catch {
      setCommentStatus('Network error while posting comment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Table of Contents (if headings exist) */}
      {headings.length > 0 && (
        <nav aria-label="Table of contents" className="rounded-2xl bg-[#0F131D] border border-[#1F2738] p-5">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1E2638]">
            <List className="w-4 h-4 text-[#FFD21F]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Table of Contents
            </h3>
          </div>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm">
            {headings.map((h, i) => (
              <li key={i} className={h.level === 3 ? 'ml-4' : ''}>
                <a
                  href={`#${h.id}`}
                  className="text-gray-300 hover:text-[#FFD21F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FFD21F]/60">›</span>
                  <span>{h.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Social Sharing Bar */}
      <div className="p-4 rounded-xl bg-[#111622] border border-[#1E2638] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
          <Share2 className="w-4 h-4 text-[#FFD21F]" />
          <span>Share this article:</span>
        </div>

        <div className="flex items-center gap-2">
          {/* X / Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#19202E] hover:bg-white hover:text-black text-gray-300 transition-colors"
            title="Share on X"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#19202E] hover:bg-[#1877F2] hover:text-white text-gray-300 transition-colors"
            title="Share on Facebook"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#19202E] hover:bg-[#0A66C2] hover:text-white text-gray-300 transition-colors"
            title="Share on LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* Copy URL */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#19202E] hover:bg-[#FFD21F] hover:text-black text-xs font-semibold text-gray-300 transition-all"
            title="Copy URL to clipboard"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Comments Section */}
      <section id="comments" className="rounded-2xl bg-[#0E121B] border border-[#1C2434] p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1C2434]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#FFD21F]" />
            <h3 className="text-lg font-black text-white">
              Discussion ({comments.length})
            </h3>
          </div>
          <span className="text-xs text-gray-400">Join the conversation</span>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-[#141924] border border-[#222C3F] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFD21F]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Your Email (Private) *</label>
              <input
                type="email"
                required
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                className="w-full bg-[#141924] border border-[#222C3F] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFD21F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Your Comment *</label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, experiences or questions regarding this topic..."
              className="w-full bg-[#141924] border border-[#222C3F] rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFD21F]"
            />
          </div>

          <div className="flex items-center justify-between">
            {commentStatus ? (
              <span className="text-xs text-green-400 font-medium">{commentStatus}</span>
            ) : <span />}

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-[#FFD21F] text-black font-extrabold text-xs sm:text-sm hover:bg-[#FFE047] transition-all flex items-center gap-1.5"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Existing Comments List */}
        <div className="flex flex-col gap-4">
          {loadingComments ? (
            <div className="text-xs text-gray-500 py-4 text-center">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-xs text-gray-500 py-4 text-center bg-[#121622] rounded-xl">
              Be the first to leave a comment on this article!
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-xl bg-[#131722] border border-[#1E2536] flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{comment.authorName}</span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
