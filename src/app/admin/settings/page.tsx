'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();

      if (res.ok) {
        setMsg({ type: 'success', text: 'Site settings updated successfully!' });
      } else {
        setMsg({ type: 'error', text: data.error || 'Failed to update settings.' });
      }
    } catch {
      setMsg({ type: 'error', text: 'Network error occurred.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading site settings...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="pb-4 border-b border-[#1C2538]">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Site Settings</h1>
        <p className="text-xs text-gray-400 mt-1">
          Customize your global site branding, announcement banner, and social media handles.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Branding */}
        <div className="p-6 rounded-2xl bg-[#111622] border border-[#1C2538] flex flex-col gap-4 shadow-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-[#1C2538]">
            General Branding
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Announcement Bar Text</label>
            <input
              type="text"
              value={settings.announcementText}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
              className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 rounded-2xl bg-[#111622] border border-[#1C2538] flex flex-col gap-4 shadow-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-[#1C2538]">
            Social Media Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Facebook URL</label>
              <input
                type="url"
                value={settings.socialLinks.facebook}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                })}
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">YouTube URL</label>
              <input
                type="url"
                value={settings.socialLinks.youtube}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, youtube: e.target.value }
                })}
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">X / Twitter URL</label>
              <input
                type="url"
                value={settings.socialLinks.twitter}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                })}
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">LinkedIn URL</label>
              <input
                type="url"
                value={settings.socialLinks.linkedin}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                })}
                className="w-full bg-[#0C0F17] border border-[#222B3D] text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#FFD21F]"
              />
            </div>
          </div>
        </div>

        {/* Feedback message */}
        {msg && (
          <div
            className={`p-4 rounded-xl flex items-center gap-2 text-xs sm:text-sm ${
              msg.type === 'success' ? 'bg-green-950/40 text-green-300 border border-green-500/30' : 'bg-red-950/40 text-red-300 border border-red-500/30'
            }`}
          >
            {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            <span>{msg.text}</span>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={saving}
            className="py-3 px-6 rounded-xl bg-[#FFD21F] text-black font-extrabold text-xs sm:text-sm hover:bg-[#FFE047] flex items-center gap-2 shadow-[0_0_15px_rgba(255,210,31,0.3)] transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

