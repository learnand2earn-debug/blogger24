import React from 'react';
import type { Metadata } from 'next';
import { AdminNav } from './AdminNav';

export const metadata: Metadata = {
  title: 'Admin Studio | UbaidBlogs',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07090D] flex flex-col">
      <AdminNav />
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {children}
      </div>
    </div>
  );
}

