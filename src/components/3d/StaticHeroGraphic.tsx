import React from 'react';

export const StaticHeroGraphic: React.FC = () => {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center p-4">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Decorative SVG Geometric Mesh */}
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full text-lime/40 animate-spin-slow"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Concentric geometric polygons */}
          <polygon points="150,20 270,90 270,210 150,280 30,210 30,90" stroke="currentColor" strokeDasharray="3 3" />
          <polygon points="150,50 240,105 240,195 150,250 60,195 60,105" stroke="#38BDF8" strokeOpacity="0.4" />
          <polygon points="150,80 210,120 210,180 150,220 90,180 90,120" stroke="#CEFF00" />
          
          {/* Internal diagonal lattice links */}
          <line x1="150" y1="20" x2="150" y2="280" stroke="currentColor" strokeOpacity="0.3" />
          <line x1="30" y1="90" x2="270" y2="210" stroke="currentColor" strokeOpacity="0.3" />
          <line x1="30" y1="210" x2="270" y2="90" stroke="currentColor" strokeOpacity="0.3" />

          {/* Central nodes */}
          <circle cx="150" cy="150" r="6" fill="#CEFF00" />
          <circle cx="150" cy="80" r="3" fill="#38BDF8" />
          <circle cx="210" cy="120" r="3" fill="#CEFF00" />
          <circle cx="210" cy="180" r="3" fill="#38BDF8" />
          <circle cx="150" cy="220" r="3" fill="#CEFF00" />
          <circle cx="90" cy="180" r="3" fill="#38BDF8" />
          <circle cx="90" cy="120" r="3" fill="#CEFF00" />
        </svg>

        {/* Glow halo */}
        <div className="absolute inset-0 bg-lime/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      </div>
    </div>
  );
};
