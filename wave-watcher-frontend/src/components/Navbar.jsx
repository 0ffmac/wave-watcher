import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <>
      {/* Dynamic Header with Spot Selector */}
      {/* Added a subtle top-down gradient overlay to ensure text visibility regardless of wave brightness */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-40 pointer-events-none" />

      <nav className="absolute top-0 left-0 right-0 z-50 px-3 py-3 md:px-6 md:py-6 container mx-auto flex items-center justify-between gap-2">
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

        {/* CENTER: Desktop Links */}
        {/* High-visibility slate colors with hard-edge drop shadows */}
        <div className="hidden lg:flex items-center gap-8 font-black text-[10px] uppercase tracking-widest">
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >
            Reports
          </Link>
          <a
            href="#"
            className="text-slate-200 hover:text-white transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >
            Forecasts
          </a>
          <Link
            to="/map"
            className="text-slate-200 hover:text-white transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >
            Maps
          </Link>
        </div>

        {/* RIGHT: CTA Button */}
        <div className="shrink-0">
          <button className="bg-blue-600 text-white px-3 py-1.5 md:px-6 md:py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-blue-900/40 hover:bg-blue-700 hover:scale-105 transition-all whitespace-nowrap active:scale-95">
            <span className="hidden xs:inline">Join Premium</span>
            <span className="xs:hidden">Premium</span>
          </button>
        </div>
      </nav>

      {/* MOBILE NAVIGATION BAR (Bottom Fixed) */}
      {/* This solves the visibility/positioning issue for mobile devices by putting keys links at the thumb level */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8 px-8 py-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full z-50 shadow-2xl">
        <Link
          to="/"
          className="text-white text-[9px] font-black uppercase tracking-tighter"
        >
          Reports
        </Link>
        <a
          href="#"
          className="text-slate-400 text-[9px] font-black uppercase tracking-tighter"
        >
          Forecasts
        </a>
        <Link
          to="/map"
          className="text-slate-400 text-[9px] font-black uppercase tracking-tighter"
        >
          Maps
        </Link>
      </div>
    </>
  );
};

export default Navbar;
