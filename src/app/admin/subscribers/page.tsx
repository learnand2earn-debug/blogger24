'use client';

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, XCircle, UserCheck, Download } from 'lucide-react';
import { NewsletterSubscriber } from '@/types';

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/newsletter')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSubscribers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Email,SubscribedAt,Status"].concat(
        subscribers.map(s => `"${s.email}","${s.subscribedAt}","${s.status}"`)
      ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ubaidblogs_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1C2538]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Newsletter Subscribers</h1>
          <p className="text-xs text-gray-400 mt-1">
            View and manage audience members subscribed to UbaidBlogs updates.
          </p>
        </div>

        {subscribers.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#141924] hover:bg-[#1E2536] text-gray-200 hover:text-white font-bold text-xs border border-[#222B3D] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#FFD21F]" />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      <div className="rounded-2xl bg-[#111622] border border-[#1C2538] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0C0F17] text-gray-400 text-[11px] uppercase tracking-wider border-b border-[#1C2538]">
              <tr>
                <th className="px-5 py-3 font-semibold">Subscriber Email</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#182030] text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-5 py-8 text-center text-gray-500">
                    Loading subscriber records...
                  </td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-8 text-center text-gray-500">
                    No newsletter subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-[#141924]/60">
                    <td className="px-5 py-3.5 font-medium text-white flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#FFD21F]" />
                      <span>{s.email}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {s.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-950/60 text-green-400 border border-green-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-800 text-gray-400">
                          <XCircle className="w-3 h-3" />
                          Unsubscribed
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">
                      {new Date(s.subscribedAt).toLocaleString()}
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
}

