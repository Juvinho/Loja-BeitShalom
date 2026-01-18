import React from 'react';

const youtubeLogoUrl = import.meta.env.VITE_YOUTUBE_LOGO_URL as string | undefined;

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-brand-card to-brand-dark border border-brand-accent/50 shadow-[0_0_15px_rgba(0,180,216,0.3)] ${className}`}>
      {/* Outer Ring Glow */}
      <div className="absolute inset-0 rounded-full border border-brand-accent/20 animate-pulse"></div>
      
      {youtubeLogoUrl ? (
        <img
          src={youtubeLogoUrl}
          alt="Logo do canal BeitShalom no YouTube"
          className="relative w-[80%] h-[80%] rounded-full object-cover"
        />
      ) : (
        <>
          {/* Stylized Menorah / Tree of Life */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-[60%] h-[60%] text-brand-accent"
            strokeWidth={1.5}
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Central Stem */}
            <path d="M12 21V3" className="text-white" strokeWidth={2} />
            
            {/* Branches */}
            <path d="M12 18C7 18 4 14 4 10" />
            <path d="M20 10C20 14 17 18 12 18" />
            
            <path d="M12 14C9 14 7 11 7 8" />
            <path d="M17 8C17 11 15 14 12 14" />
            
            {/* Flames / Leaves */}
            <circle cx="12" cy="3" r="1" fill="currentColor" className="text-brand-gold animate-pulse" />
            <circle cx="4" cy="10" r="1" fill="currentColor" />
            <circle cx="20" cy="10" r="1" fill="currentColor" />
            <circle cx="7" cy="8" r="1" fill="currentColor" />
            <circle cx="17" cy="8" r="1" fill="currentColor" />
          </svg>
        </>
      )}
    </div>
  );
};
