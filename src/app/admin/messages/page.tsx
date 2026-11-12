'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, User, Clock, CheckCircle2 } from 'lucide-react';
import { ContactMessage } from '@/types';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="pb-4 border-b border-[#1C2538]">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Contact Inquiries</h1>
        <p className="text-xs text-gray-400 mt-1">
          Review submissions received from the public contact form.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="p-8 text-center text-gray-500 bg-[#111622] rounded-2xl border border-[#1C2538]">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-[#111622] rounded-2xl border border-[#1C2538]">
            No contact submissions received yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="p-6 rounded-2xl bg-[#111622] border border-[#1C2538] flex flex-col gap-3 shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#182030]">
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">{msg.subject}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1 font-semibold text-gray-200">
                      <User className="w-3.5 h-3.5 text-[#FFD21F]" />
                      {msg.name}
                    </span>
                    <span>•</span>
                    <a href={`mailto:${msg.email}`} className="text-[#FFD21F] hover:underline flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap leading-relaxed bg-[#0B0E14] p-4 rounded-xl border border-[#1E2536]">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

