import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LocationSelector from "./LocationSelector";

const Navbar = ({
  activeSpotId,
  activeCountryKey,
  activeRegionKey,
  onSpotSelect,
  onCountrySelect,
  onRegionSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const isMapPage = location.pathname === "/map";

  return (
    <>
      {/* Dynamic Header with Spot Selector */}
      {/* Added a subtle top-down gradient overlay to ensure text visibility regardless of wave brightness */}
      <div className="fixed top-0 left-0 right-0 h-24 pointer-events-none z-40" style={{background:'linear-gradient(to bottom, rgba(6,16,31,0.9), transparent)'}} />

      <nav className="fixed top-0 left-0 right-0 z-50" style={{borderBottom:'0.5px solid rgba(255,255,255,0.06)'}}>
        <div className="container mx-auto px-3 py-3 md:px-6 md:py-4 flex items-center justify-between gap-2" style={{background:'rgba(6,16,31,0.85)',backdropFilter:'blur(20px)'}}>
          {/* LEFT: Logo & Location */}
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              {/* WaveWatcher Custom Logo */}
              <Link to="/" className="relative group cursor-pointer">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500" style={{background:'rgba(34,211,238,0.08)',border:'0.5px solid rgba(34,211,238,0.25)'}}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background:'rgba(34,211,238,0.12)'}} />
                  <div className="relative z-10 flex flex-col items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-none stroke-current transition-all" style={{color:'#22d3ee'}}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                      <path d="M2 17c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    </svg>
                  </div>
                </div>
              </Link>
              {/* Brand Name: Added drop-shadow for visibility on white foam */}
              <Link to="/" className="font-black text-base md:text-lg tracking-tighter hidden sm:block" style={{color:'#dde8ff',letterSpacing:'-0.03em'}}>
                WaveWatcher
              </Link>
            </div>

            {/* Location Selector: We pass a 'compact' prop if you want to shrink it on mobile */}
            <div className="min-w-0 max-w-[140px] xs:max-w-none">
              <LocationSelector
                activeSpotId={activeSpotId}
                activeCountryKey={activeCountryKey}
                activeRegionKey={activeRegionKey}
                onSpotSelect={onSpotSelect}
                onCountrySelect={onCountrySelect}
                onRegionSelect={onRegionSelect}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
              />
            </div>
          </div>

          {/* CENTER: Navigation Links - Now visible on all screens */}
          <div className="flex items-center gap-3 md:gap-8 font-black text-[9px] md:text-[10px] uppercase tracking-widest">
            <Link to="/" className="transition-colors" style={{color:'#536280'}} onMouseEnter={e=>e.target.style.color='#22d3ee'} onMouseLeave={e=>e.target.style.color='#536280'}>Reports</Link>
            <Link to="/info" className="transition-colors" style={{color:'#536280'}} onMouseEnter={e=>e.target.style.color='#22d3ee'} onMouseLeave={e=>e.target.style.color='#536280'}>Info</Link>
            <Link to="/map" className="transition-colors" style={{color:'#536280'}} onMouseEnter={e=>e.target.style.color='#22d3ee'} onMouseLeave={e=>e.target.style.color='#536280'}>Maps</Link>
          </div>

          {/* RIGHT: CTA Button */}
          <div className="shrink-0 hidden sm:block">
            <button className="font-black text-[10px] md:text-xs uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 rounded-full px-3 py-1.5 md:px-6 md:py-2 hover:scale-105" style={{background:'#22d3ee',color:'#06101f',boxShadow:'0 0 20px rgba(34,211,238,0.25)'}}>
              Join Premium
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE CTA - Only show on very small screens since we hid it above */}
      {!isMapPage && (
        <div className="sm:hidden fixed top-[70px] right-3 z-50">
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg shadow-blue-900/40 active:scale-95">
            Premium
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
