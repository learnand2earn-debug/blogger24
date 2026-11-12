'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('A connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" showTagline={false} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Administrator Portal
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Secure access to publishing studio, articles, and settings
          </p>
        </div>

        {/* Login Box */}
        <div className="rounded-2xl bg-[#111520] border border-[#1C2538] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD21F] to-transparent" />

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full bg-[#0B0E14] border border-[#222B3D] text-white text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="py-3 px-5 rounded-xl bg-[#FFD21F] text-black font-extrabold text-sm hover:bg-[#FFE047] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,210,31,0.3)] mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Dev / Testing Credentials Hint */}
          <div className="mt-6 pt-5 border-t border-[#1C2538] text-[11px] text-gray-400 text-center">
            <span className="text-gray-500 block mb-1">Default Configuration Key:</span>
            <code className="px-2.5 py-1 rounded bg-[#0A0D14] border border-[#1E2536] text-[#FFD21F] font-mono select-all">
              UbaidAdmin2026!
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

