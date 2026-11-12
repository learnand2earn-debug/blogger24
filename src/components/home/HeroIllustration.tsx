import React from 'react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto flex items-center justify-center select-none">
      {/* Background golden ambient glow aura */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD21F]/15 via-transparent to-[#168CFF]/15 blur-3xl -z-10 rounded-full animate-pulse-slow" />

      <svg
        viewBox="0 0 620 440"
        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="deskGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#121722" />
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
            <stop offset="0%" stopColor="#0E121B" />
            <stop offset="100%" stopColor="#05070B" />
          </linearGradient>

          <linearGradient id="goldLogoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF7A1" />
            <stop offset="50%" stopColor="#FFD21F" />
            <stop offset="100%" stopColor="#D4A000" />
          </linearGradient>

          <linearGradient id="robotBodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5F8FC" />
            <stop offset="60%" stopColor="#D4DCE8" />
            <stop offset="100%" stopColor="#A8B7CD" />
          </linearGradient>

          <radialGradient id="electricBlueGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38A0FF" />
            <stop offset="60%" stopColor="#168CFF" />
            <stop offset="100%" stopColor="#0F5EB0" />
          </radialGradient>

          {/* Filter for golden neon glow */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Ambient Glowing Gold Light Trails (Background) --- */}
        <path
          d="M-20,340 C140,280 220,400 400,320 C500,280 580,350 640,320"
          stroke="url(#goldRibbon1)"
          strokeWidth="3.5"
          filter="url(#goldGlow)"
        />
        <path
          d="M-40,360 C120,330 250,420 420,350 C520,310 590,380 650,340"
          stroke="url(#goldRibbon2)"
          strokeWidth="6"
          opacity="0.4"
          filter="url(#softGlow)"
        />
        <path
          d="M100,260 C260,180 340,360 620,220"
          stroke="url(#goldRibbon1)"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* --- Floating Sparkles / Gold Stars --- */}
        <circle cx="120" cy="140" r="2.5" fill="#FFD21F" opacity="0.8" />
        <circle cx="280" cy="90" r="3.5" fill="#FFF285" opacity="0.9" filter="url(#goldGlow)" />
        <circle cx="490" cy="70" r="2" fill="#FFD21F" opacity="0.7" />
        <circle cx="560" cy="180" r="2.5" fill="#168CFF" opacity="0.8" />

        {/* --- The Desk Surface --- */}
        <path
          d="M 10 330 L 610 330 L 630 430 L -10 430 Z"
          fill="url(#deskGrad)"
          stroke="#1E2536"
          strokeWidth="1.5"
        />
        {/* Desk top gold edge reflection */}
        <line x1="20" y1="330" x2="600" y2="330" stroke="#FFD21F" strokeWidth="1.5" opacity="0.5" />

        {/* --- Plant on Desk (Left of laptop) --- */}
        <g transform="translate(185, 230)">
          {/* Ceramic Pot */}
          <path d="M 12 70 L 48 70 L 44 100 L 16 100 Z" fill="#141924" stroke="#252F42" strokeWidth="1.5" />
          <ellipse cx="30" cy="70" rx="18" ry="4" fill="#20293A" />
          {/* Leaves */}
          <path d="M 30 70 Q 15 45 5 45 Q 18 55 30 70" fill="#256B3D" />
          <path d="M 30 70 Q 22 30 20 20 Q 28 35 30 70" fill="#34A853" />
          <path d="M 30 70 Q 38 25 45 15 Q 42 35 30 70" fill="#46C26A" />
          <path d="M 30 70 Q 45 40 55 42 Q 45 55 30 70" fill="#256B3D" />
          {/* Plant ambient back light */}
          <ellipse cx="30" cy="55" rx="30" ry="25" fill="#FFD21F" opacity="0.08" filter="url(#softGlow)" />
        </g>

        {/* --- Coffee Mug with Gold U Logo --- */}
        <g transform="translate(250, 280)">
          {/* Mug body */}
          <rect x="0" y="0" width="34" height="42" rx="3" fill="#0C0F17" stroke="#283246" strokeWidth="1.5" />
          {/* Handle */}
          <path d="M -2 10 C -12 10 -12 30 -2 30" fill="none" stroke="#283246" strokeWidth="3" />
          {/* Gold mini U on mug */}
          <polygon points="12,14 16,14 16,24 22,24 22,14 26,14 26,27 12,27" fill="#FFD21F" />
        </g>

        {/* --- Modern Sleek Laptop --- */}
        <g transform="translate(290, 160)">
          {/* Laptop Lid Outer */}
          <rect x="0" y="0" width="220" height="142" rx="8" fill="#141824" stroke="#2A354A" strokeWidth="2" />
          {/* Screen Bezel */}
          <rect x="8" y="8" width="204" height="126" rx="4" fill="#07090D" />

          {/* Screen Content */}
          <rect x="10" y="10" width="200" height="122" rx="3" fill="url(#laptopScreenGrad)" />

          {/* Golden Ambient Waves on Screen */}
          <path
            d="M 12 110 C 60 85 120 120 208 75"
            stroke="#FFD21F"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <path
            d="M 12 120 C 80 100 140 130 208 95"
            stroke="#168CFF"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Screen Logo: Geometric U */}
          <g transform="translate(92, 30)">
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
            x="110"
            y="80"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="13"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            Ubaid<tspan fill="#FFD21F">Blogs</tspan>
          </text>
          <text
            x="110"
            y="94"
            textAnchor="middle"
            fill="#A7AFBC"
            fontSize="7"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            Dream Big, Build Smart
          </text>

          {/* Laptop Base (Keyboard & Trackpad) */}
          <path
            d="M -30 142 L 250 142 L 265 162 L -45 162 Z"
            fill="#121622"
            stroke="#2A354A"
            strokeWidth="1.5"
          />
          {/* Trackpad */}
          <rect x="85" y="146" width="50" height="12" rx="2" fill="#1C2333" stroke="#2D384F" strokeWidth="0.8" />
          {/* Laptop front edge reflection */}
          <line x1="-40" y1="162" x2="260" y2="162" stroke="#FFD21F" strokeWidth="1" opacity="0.6" />
        </g>

        {/* --- Futuristic Friendly AI Robot (Right Side) --- */}
        <g transform="translate(480, 155)">
          {/* Robot Head Outer Capsule */}
          <rect
            x="25"
            y="25"
            width="80"
            height="65"
            rx="28"
            fill="url(#robotBodyGrad)"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />

          {/* Robot Ear Headphones (Electric Blue Glow!) */}
          {/* Left ear */}
          <rect x="14" y="42" width="14" height="30" rx="6" fill="#111622" stroke="#168CFF" strokeWidth="2" />
          <circle cx="21" cy="57" r="4" fill="url(#electricBlueGlow)" />
          {/* Right ear */}
          <rect x="102" y="42" width="14" height="30" rx="6" fill="#111622" stroke="#168CFF" strokeWidth="2" />
          <circle cx="109" cy="57" r="4" fill="url(#electricBlueGlow)" />

          {/* Robot Face Screen (Dark glossy screen) */}
          <rect
            x="35"
            y="35"
            width="60"
            height="45"
            rx="18"
            fill="#090C12"
            stroke="#1E2738"
            strokeWidth="1.5"
          />

          {/* Glowing Electric Blue Expressive Eyes */}
          <ellipse cx="50" cy="54" rx="7" ry="9" fill="url(#electricBlueGlow)" />
          <circle cx="48" cy="51" r="2.5" fill="#FFFFFF" />
          <ellipse cx="80" cy="54" rx="7" ry="9" fill="url(#electricBlueGlow)" />
          <circle cx="78" cy="51" r="2.5" fill="#FFFFFF" />

          {/* Robot Torso / Body */}
          <path
            d="M 40 92 C 40 90 90 90 90 92 L 95 140 C 95 146 35 146 35 140 Z"
            fill="url(#robotBodyGrad)"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          {/* Center Gold Emblem on Chest */}
          <circle cx="65" cy="115" r="9" fill="#0C101A" stroke="#FFD21F" strokeWidth="1.5" />
          <polygon points="62,111 65,108 68,111 68,118 62,118" fill="#FFD21F" />

          {/* Left Arm (Relaxed) */}
          <path
            d="M 38 98 C 22 108 24 130 32 142"
            fill="none"
            stroke="url(#robotBodyGrad)"
            strokeWidth="11"
            strokeLinecap="round"
          />

          {/* Right Arm (Waving friendly gesture!) */}
          <path
            d="M 92 100 C 110 95 116 75 106 65"
            fill="none"
            stroke="url(#robotBodyGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Hand */}
          <circle cx="104" cy="62" r="6" fill="#D4DCE8" />

          {/* Floating "Stay Connected! 💛" Speech Bubble / Accent */}
          <g transform="translate(80, -25)">
            <rect
              x="0"
              y="0"
              width="105"
              height="36"
              rx="18"
              fill="#0F131D"
              stroke="#FFD21F"
              strokeWidth="1.5"
              filter="url(#goldGlow)"
            />
            <text
              x="52"
              y="22"
              textAnchor="middle"
              fill="#FFF285"
              fontSize="10.5"
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

