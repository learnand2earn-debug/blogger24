import React from 'react';
import Link from 'next/link';
import {
  Bot,
  Code2,
  TrendingUp,
  Megaphone,
  Globe,
  Cpu,
  Zap,
  LayoutGrid
} from 'lucide-react';

export const CategoryShortcuts: React.FC = () => {
  const shortcuts = [
    {
      label: "AI & Tools",
      href: "/category/ai-tools",
      icon: Bot,
      color: "#FFD21F",
      count: "3 Guides",
    },
    {
      label: "Web Development",
      href: "/category/web-development",
      icon: Code2,
      color: "#168CFF",
      count: "Masterclass",
    },
    {
      label: "SEO Mastery",
      href: "/category/seo",
      icon: TrendingUp,
      color: "#10B981",
      count: "3 Guides",
    },
    {
      label: "Digital Marketing",
      href: "/category/digital-marketing",
      icon: Megaphone,
      color: "#EC4899",
      count: "2 Guides",
    },
    {
      label: "Technology & Cloud",
      href: "/category/technology",
      icon: Cpu,
      color: "#8B5CF6",
      count: "3 Guides",
    },
    {
      label: "Productivity & Health",
      href: "/category/productivity",
      icon: Zap,
      color: "#F59E0B",
      count: "3 Guides",
    },
    {
      label: "All Masterclasses",
      href: "/categories",
      icon: LayoutGrid,
      color: "#FFD21F",
      count: "15 Posts",
    },
  ];

  return (
    <div className="w-full bg-[#0A0D14] border-b border-[#181F2C] py-4">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111622] hover:bg-[#182030] border border-[#1E2738] hover:border-[#FFD21F]/50 transition-all duration-200"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}18`, color: item.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

