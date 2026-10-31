import React from 'react';

// 1. Emily 3D Avatar (Brown wavy hair, purple knit sweater, waving hand, rosy cheeks)
export const EmilyAvatar: React.FC<{ className?: string }> = ({ className = "w-28 h-28" }) => (
  <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hairClay" x1="40" y1="20" x2="120" y2="130" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9A5B32" />
        <stop offset="0.4" stopColor="#783E1E" />
        <stop offset="1" stopColor="#54280E" />
      </linearGradient>
      <linearGradient id="skinClay" x1="60" y1="40" x2="100" y2="110" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF2E8" />
        <stop offset="0.7" stopColor="#FBD3B8" />
        <stop offset="1" stopColor="#F5B992" />
      </linearGradient>
      <linearGradient id="sweaterClay" x1="40" y1="110" x2="120" y2="160" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D8C7F8" />
        <stop offset="0.5" stopColor="#BBA2EE" />
        <stop offset="1" stopColor="#9876E0" />
      </linearGradient>
      <filter id="clayShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#783E1E" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* Soft circular background glow */}
    <circle cx="80" cy="80" r="74" fill="#FBF8FF" />

    {/* Back Hair Waves */}
    <path d="M42 65C32 85 34 125 44 140C52 142 108 142 116 140C126 125 128 85 118 65C114 42 46 42 42 65Z" fill="url(#hairClay)" />
    
    {/* Body / Knit Sweater */}
    <path d="M48 126C52 116 70 112 80 112C90 112 108 116 112 126L126 160H34L48 126Z" fill="url(#sweaterClay)" />
    {/* Sweater Collar */}
    <path d="M68 112C72 120 88 120 92 112C95 114 96 118 94 122C90 128 70 128 66 122C64 118 65 114 68 112Z" fill="#9876E0" />
    {/* Sweater Texture Ribs */}
    <line x1="72" y1="126" x2="72" y2="155" stroke="#906CD6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="80" y1="126" x2="80" y2="155" stroke="#906CD6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="88" y1="126" x2="88" y2="155" stroke="#906CD6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

    {/* Left Arm Waving (Viewer's left) */}
    <path d="M48 126C42 118 32 106 28 92C32 90 38 94 44 102L54 118Z" fill="url(#sweaterClay)" />
    {/* Waving Hand */}
    <circle cx="27" cy="86" r="8" fill="url(#skinClay)" />
    {/* Fingers */}
    <path d="M22 84C21 80 23 78 25 79L28 84" stroke="#F5B992" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 81C26 77 28 75 30 76L31 82" stroke="#F5B992" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 83C31 79 33 78 35 80L34 85" stroke="#F5B992" strokeWidth="2" strokeLinecap="round" />

    {/* Neck */}
    <rect x="74" y="98" width="12" height="18" rx="5" fill="url(#skinClay)" />

    {/* Face */}
    <path d="M54 74C54 98 66 108 80 108C94 108 106 98 106 74C106 52 54 52 54 74Z" fill="url(#skinClay)" filter="url(#clayShadow)" />

    {/* Front Hair & Cute Side Curls */}
    <path d="M52 64C56 50 72 40 80 40C88 40 104 50 108 64C102 60 92 68 80 60C68 68 58 60 52 64Z" fill="url(#hairClay)" />
    <path d="M46 68C42 76 44 94 48 100C50 94 50 80 50 72Z" fill="url(#hairClay)" />
    <path d="M114 68C118 76 116 94 112 100C110 94 110 80 110 72Z" fill="url(#hairClay)" />
    {/* Cute Clay Hair Curls on Sides */}
    <circle cx="48" cy="82" r="7" fill="url(#hairClay)" />
    <circle cx="112" cy="82" r="7" fill="url(#hairClay)" />

    {/* Big Anime Clay Eyes */}
    <ellipse cx="68" cy="78" rx="5" ry="6" fill="#2E1C12" />
    <ellipse cx="92" cy="78" rx="5" ry="6" fill="#2E1C12" />
    {/* Eye Highlights */}
    <circle cx="66" cy="76" r="2" fill="#FFFFFF" />
    <circle cx="69" cy="79" r="1" fill="#FFFFFF" />
    <circle cx="90" cy="76" r="2" fill="#FFFFFF" />
    <circle cx="93" cy="79" r="1" fill="#FFFFFF" />

    {/* Rosy Cheeks */}
    <circle cx="62" cy="86" r="5" fill="#F87171" opacity="0.45" />
    <circle cx="98" cy="86" r="5" fill="#F87171" opacity="0.45" />

    {/* Cute Mouth */}
    <path d="M76 88Q80 92 84 88" stroke="#A84323" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 2. Cute Smiling Succulent Plant in Pink Pot (Bottom of Sidebar)
export const SmilingPlantPot: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Succulent Leaves */}
    <ellipse cx="32" cy="22" rx="5" ry="12" fill="#86EFAC" />
    <ellipse cx="32" cy="20" rx="4" ry="10" fill="#4ADE80" />
    <path d="M26 28C22 22 20 16 26 14C30 14 30 22 28 28Z" fill="#4ADE80" />
    <path d="M38 28C42 22 44 16 38 14C34 14 34 22 36 28Z" fill="#4ADE80" />
    <path d="M20 32C16 28 16 22 22 22C26 22 26 28 24 32Z" fill="#22C55E" />
    <path d="M44 32C48 28 48 22 42 22C38 22 38 28 40 32Z" fill="#22C55E" />

    {/* Pink Pot */}
    <path d="M18 34C18 32 46 32 46 34L43 54C43 57 21 57 21 54L18 34Z" fill="#FCA5A5" />
    {/* Pot Rim */}
    <rect x="16" y="32" width="32" height="6" rx="3" fill="#F87171" />
    {/* Smiling Face */}
    <circle cx="28" cy="44" r="1.5" fill="#450A0A" />
    <circle cx="36" cy="44" r="1.5" fill="#450A0A" />
    <circle cx="25" cy="45" r="1.5" fill="#EF4444" opacity="0.6" />
    <circle cx="39" cy="45" r="1.5" fill="#EF4444" opacity="0.6" />
    <path d="M30 47Q32 49 34 47" stroke="#450A0A" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 3. 3D Cloud Icon (Next to Good morning, Emily!)
export const ClayCloud: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 40 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 24C7.58 24 4 20.42 4 16C4 11.8 7.2 8.35 11.3 8.05C12.9 3.45 17.55 0 23 0C29.6 0 35 5.4 35 12C37.8 12.6 40 15 40 18C40 21.3 37.3 24 34 24H12Z" 
      fill="url(#cloud3dGrad)" 
    />
    <defs>
      <linearGradient id="cloud3dGrad" x1="8" y1="4" x2="32" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="0.6" stopColor="#F1F5F9" />
        <stop offset="1" stopColor="#E2E8F0" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. 3D Purple Clipboard (Tasks Done 24)
export const ClayClipboard: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Board */}
    <rect x="12" y="10" width="40" height="48" rx="10" fill="#DDD6FE" />
    <rect x="14" y="12" width="36" height="44" rx="8" fill="#EDE9FE" />
    {/* Clip at top */}
    <rect x="22" y="6" width="20" height="10" rx="5" fill="#A78BFA" />
    <circle cx="32" cy="11" r="2.5" fill="#EDE9FE" />
    {/* Check lines */}
    <path d="M22 28L26 32L34 24" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 42L26 46L34 38" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="38" y1="28" x2="44" y2="28" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="38" y1="42" x2="44" y2="42" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 5. 3D Calendar Icon (In Progress 7)
export const ClayCalendarIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <rect x="12" y="14" width="40" height="42" rx="10" fill="#FFF1F2" stroke="#FFE4E6" strokeWidth="1.5" />
    {/* Top Header */}
    <path d="M12 24C12 18.5 16.5 14 22 14H42C47.5 14 52 18.5 52 24V28H12V24Z" fill="#FDA4AF" />
    {/* Rings */}
    <rect x="20" y="8" width="4" height="10" rx="2" fill="#FB7185" />
    <rect x="40" y="8" width="4" height="10" rx="2" fill="#FB7185" />
    {/* Grid Dots */}
    <circle cx="22" cy="36" r="2.5" fill="#F43F5E" />
    <circle cx="32" cy="36" r="2.5" fill="#F43F5E" />
    <circle cx="42" cy="36" r="2.5" fill="#F43F5E" />
    <circle cx="22" cy="46" r="2.5" fill="#F43F5E" />
    <circle cx="32" cy="46" r="2.5" fill="#F43F5E" />
    <circle cx="42" cy="46" r="2.5" fill="#FDA4AF" />
  </svg>
);

// 6. 3D Flag Icon (Completed 56)
export const ClayFlag: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Stand */}
    <ellipse cx="32" cy="54" rx="10" ry="3.5" fill="#E2E8F0" />
    {/* Pole */}
    <rect x="23" y="12" width="4" height="42" rx="2" fill="#94A3B8" />
    {/* Waving Flag */}
    <path 
      d="M27 14C35 12 40 18 52 15V32C40 35 35 29 27 32V14Z" 
      fill="url(#flagGreenGrad)" 
    />
    <defs>
      <linearGradient id="flagGreenGrad" x1="27" y1="14" x2="52" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#86EFAC" />
        <stop offset="0.5" stopColor="#4ADE80" />
        <stop offset="1" stopColor="#22C55E" />
      </linearGradient>
    </defs>
  </svg>
);

// 7. 3D Star Icon (Focus Time 18h)
export const ClayStar: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M32 6L39.5 22.5L57 24L44 36L48 53L32 44L16 53L20 36L7 24L24.5 22.5L32 6Z" 
      fill="url(#starClayGrad)" 
      stroke="#FDE047" 
      strokeWidth="2" 
      strokeLinejoin="round" 
    />
    <defs>
      <linearGradient id="starClayGrad" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEF08A" />
        <stop offset="0.5" stopColor="#FACC15" />
        <stop offset="1" stopColor="#EAB308" />
      </linearGradient>
    </defs>
  </svg>
);

// 8. 3D Bunny with Heart (Bottom Right Motivation Card)
export const ClayBunnyWithHeart: React.FC<{ className?: string }> = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="50" cy="68" rx="28" ry="24" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />
    
    {/* Ears with Pink Center */}
    <ellipse cx="36" cy="24" rx="7" ry="18" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
    <ellipse cx="36" cy="25" rx="4" ry="13" fill="#FBCFE8" />

    <ellipse cx="64" cy="24" rx="7" ry="18" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
    <ellipse cx="64" cy="25" rx="4" ry="13" fill="#FBCFE8" />

    {/* Head */}
    <circle cx="50" cy="50" r="24" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2" />

    {/* Eyes */}
    <ellipse cx="42" cy="48" rx="2.5" ry="3.5" fill="#1E293B" />
    <ellipse cx="58" cy="48" rx="2.5" ry="3.5" fill="#1E293B" />
    <circle cx="41" cy="46" r="1" fill="#FFFFFF" />
    <circle cx="57" cy="46" r="1" fill="#FFFFFF" />

    {/* Nose & Mouth */}
    <ellipse cx="50" cy="53" rx="1.5" ry="1" fill="#F472B6" />
    <path d="M47 55Q50 57 53 55" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />

    {/* Cheeks */}
    <circle cx="36" cy="54" r="3" fill="#FDA4AF" opacity="0.6" />
    <circle cx="64" cy="54" r="3" fill="#FDA4AF" opacity="0.6" />

    {/* Paws Holding Pink Heart */}
    <path 
      d="M50 78C44 70 34 66 34 58C34 52 38 48 44 48C47 48 49 50 50 52C51 50 53 48 56 48C62 48 66 52 66 58C66 66 56 70 50 78Z" 
      fill="url(#heartGradBunny)" 
    />
    <defs>
      <linearGradient id="heartGradBunny" x1="34" y1="48" x2="66" y2="78" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#E11D48" />
      </linearGradient>
    </defs>
    {/* Tiny white paws over heart */}
    <ellipse cx="36" cy="62" rx="3.5" ry="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    <ellipse cx="64" cy="62" rx="3.5" ry="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
  </svg>
);

// 9. Bunny Face Profile Icon (Top Right Header)
export const BunnyProfileIcon: React.FC<{ className?: string }> = ({ className = "w-9 h-9" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="18" cy="12" rx="4" ry="10" fill="#FFF1F2" stroke="#FFE4E6" strokeWidth="1" />
    <ellipse cx="18" cy="13" rx="2" ry="7" fill="#FDA4AF" />
    <ellipse cx="30" cy="12" rx="4" ry="10" fill="#FFF1F2" stroke="#FFE4E6" strokeWidth="1" />
    <ellipse cx="30" cy="13" rx="2" ry="7" fill="#FDA4AF" />
    <circle cx="24" cy="28" r="16" fill="#FFF1F2" stroke="#FFE4E6" strokeWidth="1" />
    <circle cx="19" cy="27" r="1.8" fill="#1E293B" />
    <circle cx="29" cy="27" r="1.8" fill="#1E293B" />
    <ellipse cx="24" cy="30" rx="1" ry="0.8" fill="#F43F5E" />
    <circle cx="15" cy="31" r="2" fill="#FDA4AF" opacity="0.6" />
    <circle cx="33" cy="31" r="2" fill="#FDA4AF" opacity="0.6" />
  </svg>
);

// 10. 3D Project Folders in 4 Colors (Purple, Pink, Green, Yellow)
export const ClayFolder: React.FC<{ color: 'purple' | 'pink' | 'green' | 'yellow'; className?: string }> = ({
  color,
  className = "w-6 h-6"
}) => {
  const colorMap = {
    purple: { tab: '#A78BFA', front: '#C4B5FD', body: '#8B5CF6' },
    pink: { tab: '#FB7185', front: '#FDA4AF', body: '#F43F5E' },
    green: { tab: '#4ADE80', front: '#86EFAC', body: '#22C55E' },
    yellow: { tab: '#FACC15', front: '#FDE047', body: '#EAB308' },
  }[color];

  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8C4 6.9 4.9 6 6 6H12L15 9H26C27.1 9 28 9.9 28 11V24C28 25.1 27.1 26 26 26H6C4.9 26 4 25.1 4 24V8Z" fill={colorMap.body} />
      <path d="M4 13C4 11.9 4.9 11 6 11H26C27.1 11 28 11.9 28 13V24C28 25.1 27.1 26 26 26H6C4.9 26 4 25.1 4 24V13Z" fill={colorMap.front} />
    </svg>
  );
};
