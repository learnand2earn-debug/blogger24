import React from 'react';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center">
      <div className="relative mb-6">
        <span className="text-8xl sm:text-9xl font-black text-[#141824] tracking-widest select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl sm:text-4xl font-black text-[#FFD21F] drop-shadow-[0_0_20px_rgba(255,210,31,0.5)]">
            Page Not Found
          </span>
        </div>
      </div>

      <p className="text-sm sm:text-base text-gray-400 max-w-md mb-8 leading-relaxed">
        The article or resource you are looking for has been moved, renamed, or does not exist on UbaidBlogs.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD21F] text-black font-extrabold text-xs sm:text-sm hover:bg-[#FFE047] transition-all shadow-[0_0_15px_rgba(255,210,31,0.3)]"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#141924] hover:bg-[#1E2536] text-gray-200 text-xs sm:text-sm font-semibold border border-[#222B3D] transition-all"
        >
          <Search className="w-4 h-4 text-[#FFD21F]" />
          <span>Browse Topics</span>
        </Link>
      </div>
    </div>
  );
}
