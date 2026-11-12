'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setResponseMsg(data.message || 'Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Failed to submit form. Please verify your inputs.');
      }
    } catch {
      setStatus('error');
      setResponseMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
            Your Name *
          </label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Sarah Jenkins"
            className="w-full bg-[#0C0F17] border border-[#222A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
            Your Email *
          </label>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. sarah@example.com"
            className="w-full bg-[#0C0F17] border border-[#222A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Subject *
        </label>
        <input
          type="text"
          required
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Inquiry regarding article collaboration"
          className="w-full bg-[#0C0F17] border border-[#222A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Message *
        </label>
        <textarea
          required
          rows={5}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please write your detailed message or inquiry here..."
          className="w-full bg-[#0C0F17] border border-[#222A3A] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
        />
      </div>

      {status === 'success' && (
        <div className="p-4 rounded-xl bg-green-950/40 border border-green-500/40 text-green-300 text-sm flex items-start gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
          <span>{responseMsg}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <span>{responseMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="py-3.5 px-6 rounded-xl bg-[#FFD21F] text-black font-extrabold text-sm sm:text-base hover:bg-[#FFE047] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,210,31,0.3)] mt-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};

