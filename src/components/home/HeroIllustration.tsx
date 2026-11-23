import React from 'react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl flex items-center justify-center select-none ml-auto">
      {/* Background ambient glow aura (User's exact requested snippet + multi-layered animated Aurora) */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD21F]/15 via-transparent to-[#168CFF]/15 blur-3xl -z-10 rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute -inset-8 bg-gradient-to-r from-[#FFD21F]/20 via-[#168CFF]/20 to-[#FFD21F]/20 blur-3xl -z-10 rounded-full animate-aurora pointer-events-none" />

      <svg
        viewBox="0 0 680 440"
        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="deskGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#141924" />
            <stop offset="50%" stopColor="#0B0F17" />
            <stop offset="100%" stopColor="#05070B" />
          </linearGradient>

          <linearGradient id="goldRibbon1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFD21F" stopOpacity="0" />
            <stop offset="30%" stopColor="#FFD21F" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FFF285" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFD21F" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="goldRibbon2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E5B608" stopOpacity="0" />
            <stop offset="40%" stopColor="#FFD21F" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFD21F" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="laptopScreenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D111A" />
            <stop offset="100%" stopColor="#05070B" />
          </linearGradient>

          <linearGradient id="goldLogoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF7A1" />
            <stop offset="50%" stopColor="#FFD21F" />
            <stop offset="100%" stopColor="#D4A000" />
          </linearGradient>

          <linearGradient id="robotBodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="60%" stopColor="#D9E2EC" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <radialGradient id="electricBlueGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38A0FF" />
            <stop offset="60%" stopColor="#168CFF" />
            <stop offset="100%" stopColor="#0F5EB0" />
          </radialGradient>

          {/* Glow Filters */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Ambient Glowing Gold Light Trails (Background) --- */}
        <path
          d="M 10,340 C 140,280 220,390 400,310 C 510,270 590,340 670,310"
          stroke="url(#goldRibbon1)"
          strokeWidth="3.5"
          filter="url(#goldGlow)"
        />
        <path
          d="M 0,360 C 130,330 260,410 430,340 C 530,300 600,370 670,330"
          stroke="url(#goldRibbon2)"
          strokeWidth="5"
          opacity="0.4"
          filter="url(#softGlow)"
        />
        <path
          d="M 90,250 C 240,170 330,350 640,210"
          stroke="url(#goldRibbon1)"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* --- Floating Sparkles / Particles --- */}
        <circle cx="80" cy="110" r="2.5" fill="#FFD21F" className="animate-sparkle" style={{ animationDelay: '0.4s' }} />
        <circle cx="230" cy="80" r="3.5" fill="#FFF285" filter="url(#goldGlow)" className="animate-sparkle" style={{ animationDelay: '1.2s' }} />
        <circle cx="340" cy="50" r="2" fill="#FFD21F" className="animate-sparkle" style={{ animationDelay: '2s' }} />
        <circle cx="490" cy="70" r="3" fill="#FFF285" filter="url(#goldGlow)" className="animate-sparkle" style={{ animationDelay: '0.8s' }} />
        <circle cx="630" cy="120" r="2.5" fill="#168CFF" className="animate-sparkle" style={{ animationDelay: '1.6s' }} />
        <circle cx="650" cy="240" r="2" fill="#FFD21F" className="animate-sparkle" style={{ animationDelay: '2.4s' }} />

        {/* --- Floating Tech Badge on Left (Balances composition) --- */}
        <g transform="translate(65, 130)" className="animate-float-reverse">
          <rect
            x="0"
            y="0"
            width="105"
            height="32"
            rx="16"
            fill="#0F1420"
            stroke="#202A3C"
            strokeWidth="1.2"
          />
          <circle cx="16" cy="16" r="4" fill="#FFD21F" filter="url(#goldGlow)" />
          <text
            x="58"
            y="20"
            textAnchor="middle"
            fill="#E2E8F0"
            fontSize="9.5"
            fontWeight="bold"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            AI Agent ⚡
          </text>
        </g>

        {/* --- The Desk Surface (Edge-to-Edge Balanced) --- */}
        <path
          d="M 25 325 L 655 325 L 675 425 L 5 425 Z"
          fill="url(#deskGrad)"
          stroke="#1E2536"
          strokeWidth="1.5"
        />
        {/* Desk top gold edge reflection */}
        <line
          x1="35"
          y1="325"
          x2="645"
          y2="325"
          stroke="#FFD21F"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* --- Desk Plant (Left Side) --- */}
        <g transform="translate(100, 235)">
          {/* Ceramic Pot */}
          <path
            d="M 12 65 L 48 65 L 44 95 L 16 95 Z"
            fill="#121722"
            stroke="#242E40"
            strokeWidth="1.5"
          />
          <ellipse cx="30" cy="65" rx="18" ry="4" fill="#1C2433" />
          {/* Leaves */}
          <path d="M 30 65 Q 15 42 5 42 Q 18 52 30 65" fill="#256B3D" />
          <path d="M 30 65 Q 22 26 20 16 Q 28 32 30 65" fill="#34A853" />
          <path d="M 30 65 Q 38 22 45 12 Q 42 32 30 65" fill="#46C26A" />
          <path d="M 30 65 Q 45 36 55 38 Q 45 52 30 65" fill="#256B3D" />
          {/* Plant ambient back light */}
          <ellipse cx="30" cy="50" rx="28" ry="22" fill="#FFD21F" opacity="0.08" filter="url(#softGlow)" />
        </g>

        {/* --- Coffee Mug with Golden Monogram --- */}
        <g transform="translate(165, 275)">
          {/* Mug body */}
          <rect
            x="0"
            y="0"
            width="32"
            height="40"
            rx="4"
            fill="#0E121B"
            stroke="#263144"
            strokeWidth="1.5"
          />
          {/* Handle */}
          <path
            d="M -2 10 C -12 10 -12 28 -2 28"
            fill="none"
            stroke="#263144"
            strokeWidth="2.8"
          />
          {/* Gold mini U on mug */}
          <polygon points="11,13 15,13 15,22 21,22 21,13 25,13 25,25 11,25" fill="#FFD21F" />
          {/* Steam curls with animated rise */}
          <g className="animate-steam">
            <path d="M 12 -4 Q 10 -12 15 -18" stroke="#FFD21F" strokeWidth="1" strokeLinecap="round" opacity="0.45" fill="none" />
            <path d="M 20 -2 Q 23 -10 18 -16" stroke="#FFD21F" strokeWidth="1" strokeLinecap="round" opacity="0.45" fill="none" />
          </g>
        </g>

        {/* --- Modern Sleek Laptop (Centerpiece) --- */}
        <g transform="translate(225, 150)">
          {/* Laptop Lid Outer */}
          <rect
            x="0"
            y="0"
            width="225"
            height="146"
            rx="8"
            fill="#141824"
            stroke="#2A354A"
            strokeWidth="2"
          />
          {/* Screen Bezel */}
          <rect x="7" y="7" width="211" height="132" rx="4" fill="#07090D" />

          {/* Screen Content */}
          <rect x="9" y="9" width="207" height="128" rx="3" fill="url(#laptopScreenGrad)" />

          {/* IDE Window Controls */}
          <circle cx="20" cy="18" r="2.5" fill="#EF4444" opacity="0.8" />
          <circle cx="28" cy="18" r="2.5" fill="#F59E0B" opacity="0.8" />
          <circle cx="36" cy="18" r="2.5" fill="#10B981" opacity="0.8" />

          {/* Golden & Blue Ambient Waves on Screen */}
          <path
            d="M 12 112 C 60 88 120 122 204 78"
            stroke="#FFD21F"
            strokeWidth="1.5"
            opacity="0.75"
          />
          <path
            d="M 12 122 C 80 102 140 132 204 98"
            stroke="#168CFF"
            strokeWidth="1.2"
            opacity="0.55"
          />

          {/* Screen Logo: Geometric U */}
          <g transform="translate(97, 26)">
            <polygon
              points="16,2 30,10 30,26 16,34 2,26 2,10"
              fill="#0D111A"
              stroke="#FFD21F"
              strokeWidth="1.5"
            />
            <polygon points="7,9 12,6 12,23 7,20" fill="url(#goldLogoGrad)" />
            <polygon points="25,9 20,6 20,23 25,20" fill="url(#goldLogoGrad)" />
            <polygon points="7,20 12,23 16,26 20,23 25,20 21,28 16,30 11,28" fill="url(#goldLogoGrad)" />
          </g>

          {/* Screen Text: UbaidBlogs */}
          <text
            x="112"
            y="76"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="13.5"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            Ubaid<tspan fill="#FFD21F">Blogs</tspan>
          </text>
          <text
            x="112"
            y="90"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="7"
            fontFamily="sans-serif"
            letterSpacing="1"
            fontWeight="600"
          >
            DREAM BIG, BUILD SMART
          </text>

          {/* Tech Status Pill on Screen */}
          <rect
            x="67"
            y="100"
            width="90"
            height="14"
            rx="7"
            fill="#101522"
            stroke="#FFD21F"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
          <circle cx="77" cy="107" r="2.5" fill="#10B981" />
          <text
            x="115"
            y="110"
            textAnchor="middle"
            fill="#E2E8F0"
            fontSize="6.5"
            fontWeight="bold"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            NEXT.JS • AI • SEO
          </text>

          {/* Laptop Base (Keyboard & Trackpad) */}
          <path
            d="M -30 146 L 255 146 L 270 168 L -45 168 Z"
            fill="#121622"
            stroke="#2A354A"
            strokeWidth="1.5"
          />
          {/* Trackpad */}
          <rect x="88" y="150" width="50" height="12" rx="2" fill="#1C2333" stroke="#2D384F" strokeWidth="0.8" />
          {/* Laptop front edge reflection */}
          <line x1="-40" y1="168" x2="265" y2="168" stroke="#FFD21F" strokeWidth="1" opacity="0.6" />
        </g>

        {/* --- Futuristic Friendly AI Robot (Properly Positioned & Uncut) --- */}
        <g transform="translate(470, 150)">
          {/* Robot Head Outer Capsule */}
          <rect
            x="25"
            y="25"
            width="82"
            height="66"
            rx="29"
            fill="url(#robotBodyGrad)"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />

          {/* Robot Head Antenna with pulsating golden tip */}
          <line x1="66" y1="25" x2="66" y2="12" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="66" cy="10" r="4.5" fill="#FFD21F" filter="url(#goldGlow)" className="animate-gold-pulse" />

          {/* Robot Ear Headphones (Electric Blue Glow!) */}
          {/* Left ear */}
          <rect x="13" y="43" width="14" height="30" rx="6" fill="#111622" stroke="#168CFF" strokeWidth="2" />
          <circle cx="20" cy="58" r="4" fill="url(#electricBlueGlow)" />
          {/* Right ear */}
          <rect x="105" y="43" width="14" height="30" rx="6" fill="#111622" stroke="#168CFF" strokeWidth="2" />
          <circle cx="112" cy="58" r="4" fill="url(#electricBlueGlow)" />

          {/* Robot Face Screen (Dark glossy screen) */}
          <rect
            x="36"
            y="36"
            width="60"
            height="44"
            rx="18"
            fill="#090C12"
            stroke="#1E2738"
            strokeWidth="1.5"
          />

          {/* Glowing Electric Blue Expressive Eyes with soft pulse */}
          <g className="animate-cyan-pulse">
            <ellipse cx="51" cy="55" rx="7" ry="9" fill="url(#electricBlueGlow)" />
            <circle cx="49" cy="52" r="2.5" fill="#FFFFFF" />
            <ellipse cx="81" cy="55" rx="7" ry="9" fill="url(#electricBlueGlow)" />
            <circle cx="79" cy="52" r="2.5" fill="#FFFFFF" />
          </g>

          {/* Cute LED Smile */}
          <path d="M 61 68 Q 66 72 71 68" stroke="#38A0FF" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Robot Torso / Body */}
          <path
            d="M 40 93 C 40 91 92 91 92 93 L 97 142 C 97 148 35 148 35 142 Z"
            fill="url(#robotBodyGrad)"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          {/* Center Gold Emblem on Chest */}
          <circle cx="66" cy="117" r="9" fill="#0C101A" stroke="#FFD21F" strokeWidth="1.5" />
          <polygon points="63,113 66,110 69,113 69,120 63,120" fill="#FFD21F" />

          {/* Left Arm (Relaxed) */}
          <path
            d="M 38 99 C 22 109 24 131 32 143"
            fill="none"
            stroke="url(#robotBodyGrad)"
            strokeWidth="11"
            strokeLinecap="round"
          />

          {/* Right Arm (Animated friendly waving gesture!) */}
          <g className="animate-robot-wave">
            <path
              d="M 94 101 C 112 96 118 76 108 66"
              fill="none"
              stroke="url(#robotBodyGrad)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Hand */}
            <circle cx="106" cy="63" r="6" fill="#D4DCE8" />
          </g>

          {/* Floating "Stay Connected! 💛" Speech Bubble (Animated gentle float) */}
          <g transform="translate(15, -34)" className="animate-float">
            {/* Bubble Tail */}
            <polygon points="45,36 57,36 51,44" fill="#0F131D" stroke="#FFD21F" strokeWidth="1" />
            {/* Bubble Pill */}
            <rect
              x="0"
              y="0"
              width="135"
              height="36"
              rx="18"
              fill="#0F131D"
              stroke="#FFD21F"
              strokeWidth="1.5"
              filter="url(#goldGlow)"
            />
            <text
              x="67"
              y="22"
              textAnchor="middle"
              fill="#FFF285"
              fontSize="11"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              Stay Connected! 💛
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
