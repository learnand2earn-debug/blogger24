import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* Geometric 'U' Gold Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(255,210,31,0.5)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glowing polygonal frame */}
          <polygon
            points="50,4 92,26 92,74 50,96 8,74 8,26"
            fill="#0F131D"
            stroke="#FFD21F"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Inner Geometric U Facets */}
          {/* Left vertical pillar of U */}
          <polygon
            points="22,28 36,20 36,66 22,58"
            fill="url(#goldGradPillarLeft)"
          />
          {/* Right vertical pillar of U */}
          <polygon
            points="78,28 64,20 64,66 78,58"
            fill="url(#goldGradPillarRight)"
          />
          {/* Bottom curve/connector of U */}
          <polygon
            points="22,58 36,66 50,75 64,66 78,58 66,80 50,86 34,80"
            fill="url(#goldGradBase)"
          />
          {/* Center glowing focal point */}
          <circle cx="50" cy="46" r="4.5" fill="#FFF285" />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradPillarLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF48F" />
              <stop offset="50%" stopColor="#FFD21F" />
              <stop offset="100%" stopColor="#C69400" />
            </linearGradient>
            <linearGradient id="goldGradPillarRight" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE547" />
              <stop offset="60%" stopColor="#FFD21F" />
              <stop offset="100%" stopColor="#9E7600" />
            </linearGradient>
            <linearGradient id="goldGradBase" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C69400" />
              <stop offset="50%" stopColor="#FFD21F" />
              <stop offset="100%" stopColor="#FFE547" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-black tracking-tight flex items-center ${textSizes[size]}`}>
          <span className="text-white group-hover:text-gray-100 transition-colors">Ubaid</span>
          <span className="text-[#FFD21F] ml-0.5 drop-shadow-[0_0_8px_rgba(255,210,31,0.4)]">Blogs</span>
        </div>
        {showTagline && (
          <span className="text-[10px] sm:text-[11px] font-medium text-gray-400 tracking-wider mt-0.5">
            Knowledge • Technology • Success
          </span>
        )}
      </div>
    </Link>
  );
};

