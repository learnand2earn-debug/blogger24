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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3 w-full">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#111622] hover:bg-[#182030] border border-[#1E2738] hover:border-[#FFD21F]/60 shadow-sm hover:shadow-[0_8px_20px_-4px_rgba(255,210,31,0.25)] hover:-translate-y-1 transition-all duration-300 w-full"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
                  style={{ backgroundColor: `${item.color}18`, color: item.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white truncate">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-500 group-hover:text-[#FFD21F] transition-colors">
                    {item.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

