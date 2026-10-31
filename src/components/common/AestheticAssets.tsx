import React from 'react';

// Cute Study Anime Girl in Lavender Hoodie (matches the reference screenshot)
export const CozyStudyGirlIllustration: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-44 h-44", 
  size 
}) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      style={size ? { width: size, height: size } : undefined}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hoodieGrad" x1="40" y1="120" x2="160" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B5FD" />
          <stop offset="0.5" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="80" y1="50" x2="120" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1EB" />
          <stop offset="1" stopColor="#FED7AA" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="70" y1="20" x2="130" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3730A3" />
          <stop offset="0.7" stopColor="#312E81" />
          <stop offset="1" stopColor="#1E1B4B" />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Warm Ambient Circle Behind */}
      <circle cx="100" cy="100" r="92" fill="#FAF5FF" />
      <circle cx="100" cy="100" r="88" fill="#F3E8FF" opacity="0.6" />

      {/* Desk surface */}
      <path d="M10 160C40 156 160 156 190 160V195H10V160Z" fill="#FDE68A" opacity="0.8" />
      <path d="M10 160H190V164H10V160Z" fill="#F59E0B" opacity="0.4" />

      {/* Study Open Book on Desk */}
      <path d="M48 152L85 146V172L48 178Z" fill="#FFFFFF" />
      <path d="M85 146L122 152V178L85 172Z" fill="#FDF4FF" />
      <line x1="85" y1="146" x2="85" y2="172" stroke="#DDD6FE" strokeWidth="2" />
      {/* Book text lines */}
      <line x1="56" y1="156" x2="78" y2="153" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="56" y1="162" x2="76" y2="159" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="92" y1="153" x2="114" y2="156" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="92" y1="159" x2="112" y2="162" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />

      {/* Cozy Mug with Heart / Cat Face */}
      <rect x="142" y="148" width="22" height="24" rx="4" fill="#F472B6" />
      <path d="M164 154C168 154 171 157 171 160C171 163 168 166 164 166" stroke="#F472B6" strokeWidth="2" fill="none" />
      <circle cx="150" cy="158" r="1.5" fill="#FFFFFF" />
      <circle cx="156" cy="158" r="1.5" fill="#FFFFFF" />
      <path d="M152 161Q153 163 154 161" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
      {/* Steam rising with hearts */}
      <path d="M150 142C148 136 154 132 151 127" stroke="#FBCFE8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M156 144C158 138 153 134 156 129" stroke="#FBCFE8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

      {/* Hair Bun with Cute Scrunchie */}
      <circle cx="100" cy="36" r="18" fill="url(#hairGrad)" />
      <ellipse cx="100" cy="48" rx="14" ry="5" fill="#F472B6" />

      {/* Hair Behind */}
      <path d="M72 70C68 95 70 120 74 125H126C130 120 132 95 128 70C128 40 72 40 72 70Z" fill="url(#hairGrad)" />

      {/* Anime Girl Neck & Face */}
      <rect x="94" y="96" width="12" height="18" rx="4" fill="url(#skinGrad)" />
      <path d="M78 72C78 98 88 106 100 106C112 106 122 98 122 72C122 54 78 54 78 72Z" fill="url(#skinGrad)" />

      {/* Cute Bangs & Hair Strands */}
      <path d="M76 66C82 78 90 80 94 72C98 84 108 82 114 70C118 78 123 74 124 66C122 48 78 48 76 66Z" fill="url(#hairGrad)" />
      <path d="M72 70C70 82 72 96 74 102C76 96 76 80 75 70Z" fill="url(#hairGrad)" />
      <path d="M128 70C130 82 128 96 126 102C124 96 124 80 125 70Z" fill="url(#hairGrad)" />

      {/* Eyes (Gentle, focused, cute anime look) */}
      <ellipse cx="89" cy="80" rx="4" ry="4.5" fill="#312E81" />
      <ellipse cx="111" cy="80" rx="4" ry="4.5" fill="#312E81" />
      {/* Eye Sparkles */}
      <circle cx="88" cy="78.5" r="1.5" fill="#FFFFFF" />
      <circle cx="90.5" cy="81.5" r="0.8" fill="#FFFFFF" />
      <circle cx="110" cy="78.5" r="1.5" fill="#FFFFFF" />
      <circle cx="112.5" cy="81.5" r="0.8" fill="#FFFFFF" />
      {/* Soft Eyelashes */}
      <path d="M84 76C87 74 92 74 95 76" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M105 76C108 74 113 74 116 76" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" />

      {/* Sweet Smile & Rosy Blushing Cheeks */}
      <circle cx="83" cy="85" rx="3.5" ry="2" fill="#F472B6" opacity="0.6" />
      <circle cx="117" cy="85" rx="3.5" ry="2" fill="#F472B6" opacity="0.6" />
      <path d="M97 88Q100 91 103 88" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round" />

      {/* Lavender Hoodie Body & Cozy Collar */}
      <path d="M60 124C65 114 80 110 100 110C120 110 135 114 140 124L154 180H46L60 124Z" fill="url(#hoodieGrad)" />
      {/* Hoodie Collar Fold */}
      <path d="M82 110C86 118 94 124 100 124C106 124 114 118 118 110C124 112 128 118 126 124C118 132 108 136 100 136C92 136 82 132 74 124C72 118 76 112 82 110Z" fill="#7C3AED" opacity="0.5" />
      {/* Hoodie strings with cute star tips */}
      <path d="M94 126V142" stroke="#EDE9FE" strokeWidth="2" strokeLinecap="round" />
      <path d="M106 126V142" stroke="#EDE9FE" strokeWidth="2" strokeLinecap="round" />
      <circle cx="94" cy="144" r="2" fill="#FDE047" />
      <circle cx="106" cy="144" r="2" fill="#FDE047" />

      {/* Left Arm Resting & Hand on Cheek */}
      <path d="M60 124C52 134 50 148 54 162C58 160 64 154 68 148L74 132Z" fill="url(#hoodieGrad)" />
      {/* Right Arm Writing with Pen */}
      <path d="M140 124C148 134 146 150 138 162L126 158C130 148 132 138 130 128Z" fill="url(#hoodieGrad)" />
      {/* Hand holding cute pastel pen */}
      <circle cx="124" cy="156" r="5" fill="url(#skinGrad)" />
      <line x1="126" y1="148" x2="114" y2="164" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
      <circle cx="127" cy="147" r="2" fill="#FDE047" />

      {/* Floating Sparkles & Little Sakura Petals */}
      <path d="M30 40L32 46L38 48L32 50L30 56L28 50L22 48L28 46L30 40Z" fill="#FDE047" opacity="0.9" />
      <path d="M170 60L172 65L177 67L172 69L170 74L168 69L163 67L168 65L170 60Z" fill="#F472B6" opacity="0.8" />
      <path d="M158 35C158 35 166 38 164 44C162 50 156 46 156 46C156 46 154 40 158 35Z" fill="#FBCFE8" />
    </svg>
  );
};

// Fluffy Blushing Cloud Mascot (sits on the progress bar in the screenshot)
export const CuteCloudMascot: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-10 h-10", 
  size 
}) => {
  return (
    <svg 
      viewBox="0 0 64 48" 
      className={className} 
      style={size ? { width: size, height: (size * 48) / 64 } : undefined}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cloudGrad" x1="10" y1="10" x2="54" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F5F3FF" />
        </linearGradient>
        <filter id="cloudShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#8B5CF6" floodOpacity="0.15" />
        </filter>
      </defs>
      {/* Cloud Puffs */}
      <g filter="url(#cloudShadow)">
        <path 
          d="M18 38C12.477 38 8 33.523 8 28C8 23.04 11.6 18.9 16.4 18.1C18.2 11.2 24.5 6 32 6C40.3 6 47.1 12.1 48.3 20.1C51.6 20.9 54 23.9 54 27.5C54 31.6 50.6 35 46.5 35H44V38H18Z" 
          fill="url(#cloudGrad)" 
        />
      </g>
      {/* Happy Eyes */}
      <path d="M22 25C23 23 25 23 26 25" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 25C39 23 41 23 42 25" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" />
      {/* Sweet Mouth */}
      <path d="M31 28Q32 30 33 28" stroke="#6D28D9" strokeWidth="1.8" strokeLinecap="round" />
      {/* Rosy Cheeks */}
      <circle cx="18" cy="27" r="3" fill="#F472B6" opacity="0.6" />
      <circle cx="45" cy="27" r="3" fill="#F472B6" opacity="0.6" />
      {/* Cute Little Sparkle */}
      <path d="M48 10L49 13L52 14L49 15L48 18L47 15L44 14L47 13L48 10Z" fill="#FDE047" />
    </svg>
  );
};

// Adorable Kitten Mascot (matches bottom cats in screenshot)
export const CuteKittenMascot: React.FC<{ className?: string; size?: number; pose?: 'sitting' | 'lying' }> = ({ 
  className = "w-12 h-12", 
  size,
  pose = 'sitting' 
}) => {
  return (
    <svg 
      viewBox="0 0 64 64" 
      className={className} 
      style={size ? { width: size, height: size } : undefined}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="catGrad" x1="16" y1="16" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F8FAFC" />
        </linearGradient>
      </defs>

      {/* Tail */}
      <path d="M44 48C52 46 56 36 50 32C46 30 44 36 46 42" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Body */}
      <ellipse cx="32" cy="44" rx="14" ry="12" fill="url(#catGrad)" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Head */}
      <circle cx="32" cy="28" r="14" fill="url(#catGrad)" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Ears with Pink Interior */}
      <path d="M20 22L22 10L30 18Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <path d="M22 20L23 13L28 17Z" fill="#FBCFE8" />

      <path d="M44 22L42 10L34 18Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <path d="M42 20L41 13L36 17Z" fill="#FBCFE8" />

      {/* Eyes */}
      <ellipse cx="27" cy="28" rx="2" ry="3" fill="#3B82F6" />
      <circle cx="26.5" cy="27" r="0.8" fill="#FFFFFF" />

      <ellipse cx="37" cy="28" rx="2" ry="3" fill="#3B82F6" />
      <circle cx="36.5" cy="27" r="0.8" fill="#FFFFFF" />

      {/* Nose & Mouth */}
      <polygon points="31,32 33,32 32,33.5" fill="#F472B6" />
      <path d="M30 34Q32 36 34 34" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="18" y1="30" x2="23" y2="31" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="33" x2="23" y2="33" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
      <line x1="46" y1="30" x2="41" y2="31" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
      <line x1="46" y1="33" x2="41" y2="33" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />

      {/* Blush */}
      <circle cx="23" cy="32" r="2" fill="#F472B6" opacity="0.6" />
      <circle cx="41" cy="32" r="2" fill="#F472B6" opacity="0.6" />

      {/* Paws */}
      <circle cx="27" cy="52" r="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
      <circle cx="37" cy="52" r="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />

      {/* Collar with Little Golden Bell */}
      <path d="M26 38Q32 41 38 38" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="40.5" r="2.2" fill="#FDE047" stroke="#CA8A04" strokeWidth="0.8" />
    </svg>
  );
};

// Fairy Lights ambient header string (matches top lights in screenshot)
export const FairyLights: React.FC<{ className?: string }> = ({ className = "w-full" }) => {
  return (
    <div className={`relative h-6 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 24" fill="none">
        <path d="M0 4 Q 75 16, 150 4 Q 225 16, 300 4 Q 375 16, 450 4 Q 525 16, 600 4" stroke="#E9D5FF" strokeWidth="1" opacity="0.6" />
        <circle cx="75" cy="14" r="3" fill="#FEF08A" opacity="0.9" />
        <circle cx="75" cy="14" r="6" fill="#FEF08A" opacity="0.25" />
        <circle cx="225" cy="14" r="3" fill="#FBCFE8" opacity="0.9" />
        <circle cx="225" cy="14" r="6" fill="#FBCFE8" opacity="0.25" />
        <circle cx="375" cy="14" r="3" fill="#C4B5FD" opacity="0.9" />
        <circle cx="375" cy="14" r="6" fill="#C4B5FD" opacity="0.25" />
        <circle cx="525" cy="14" r="3" fill="#FEF08A" opacity="0.9" />
        <circle cx="525" cy="14" r="6" fill="#FEF08A" opacity="0.25" />
      </svg>
    </div>
  );
};
