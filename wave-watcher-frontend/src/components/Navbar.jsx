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
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-40 pointer-events-none" />

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-3 py-3 md:px-6 md:py-4 flex items-center justify-between gap-2">
          {/* LEFT: Logo & Location */}
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              {/* WaveWatcher Custom Logo */}
              <Link to="/" className="relative group cursor-pointer">
                <div className="w-9 h-9 md:w-11 md:h-11 bg-slate-900 rounded-xl flex items-center justify-center border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-blue-400/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-blue-500 group-hover:text-white transition-all fill-none stroke-current"
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
              <Link to="/" className="font-black text-white text-base md:text-lg tracking-tighter hidden sm:block drop-shadow-md">
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
            <Link
              to="/"
              className="text-white hover:text-blue-400 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              Reports
            </Link>
            <Link
              to="/info"
              className="text-white hover:text-blue-400 transition-colors drop-shadow-[0_2_px_2px_rgba(0,0,0,0.8)]"
            >
              Info
            </Link>
            <Link
              to="/map"
              className="text-white hover:text-blue-400 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              Maps
            </Link>
          </div>

          {/* RIGHT: CTA Button */}
          <div className="shrink-0 hidden sm:block">
            <button className="bg-blue-600 text-white px-3 py-1.5 md:px-6 md:py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-blue-900/40 hover:bg-blue-700 hover:scale-105 transition-all whitespace-nowrap active:scale-95">
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
