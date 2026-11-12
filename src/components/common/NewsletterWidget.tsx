'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

interface NewsletterWidgetProps {
  variant?: 'sidebar' | 'footer' | 'inline';
}

export const NewsletterWidget: React.FC<NewsletterWidgetProps> = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing to UbaidBlogs!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            disabled={loading}
            className="w-full bg-[#0D1017] border border-[#222A3A] text-white text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F] placeholder:text-gray-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-5 rounded-xl bg-[#FFD21F] text-black font-extrabold text-xs sm:text-sm hover:bg-[#FFE047] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,210,31,0.25)]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </>
          )}
        </button>

        {status === 'success' && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-green-950/40 border border-green-500/30 text-green-300 text-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
};
