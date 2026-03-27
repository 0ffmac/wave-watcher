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
  theme = 'dark',
  onToggleTheme,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const location = useLocation();
  const isMapPage = location.pathname === "/map";

  return (
    <>
      {/* Dynamic Header with Spot Selector */}
      {/* Added a subtle top-down gradient overlay to ensure text visibility regardless of wave brightness */}
      <div className="fixed top-0 left-0 right-0 h-24 pointer-events-none z-40" style={{background:'linear-gradient(to bottom, var(--ww-bg) 0%, transparent 100%)',opacity:0.85}} />

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          borderBottom: scrolled ? '0.5px solid var(--ww-nav-border)' : 'none',
        }}
      >
        <div
          className="container mx-auto px-3 py-3 md:px-6 md:py-4 flex items-center justify-between gap-2 transition-all duration-300"
          style={{
            background: scrolled ? 'var(--ww-nav-bg)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
          }}
        >
          {/* LEFT: Logo & Location */}
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              {/* WaveWatcher Custom Logo */}
              <Link to="/" className="relative group cursor-pointer">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500" style={{background:'var(--ww-accent-bg)',border:'0.5px solid var(--ww-accent-border)'}}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background:'var(--ww-accent-bg)'}} />
                  <div className="relative z-10 flex flex-col items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-none stroke-current transition-all" style={{color:'var(--ww-accent)'}}
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
              <Link to="/" className="font-black text-base md:text-lg tracking-tighter hidden sm:block" style={{color:'var(--ww-text)',letterSpacing:'-0.03em'}}>
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
            <Link to="/" className="transition-colors" style={{color:'var(--ww-text-2)'}} onMouseEnter={e=>e.target.style.color='var(--ww-accent)'} onMouseLeave={e=>e.target.style.color='var(--ww-text-2)'}>Reports</Link>
            <Link to="/info" className="transition-colors" style={{color:'var(--ww-text-2)'}} onMouseEnter={e=>e.target.style.color='var(--ww-accent)'} onMouseLeave={e=>e.target.style.color='var(--ww-text-2)'}>Info</Link>
            <Link to="/map" className="transition-colors" style={{color:'var(--ww-text-2)'}} onMouseEnter={e=>e.target.style.color='var(--ww-accent)'} onMouseLeave={e=>e.target.style.color='var(--ww-text-2)'}>Maps</Link>
          </div>

          {/* RIGHT: Theme toggle + CTA */}
          <div className="shrink-0 hidden sm:flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{background:'var(--ww-card)',border:'0.5px solid var(--ww-border)',color:'var(--ww-text)'}}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="4"/>
                  <line x1="12" y1="20" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="4" y2="12"/>
                  <line x1="20" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button
              className="font-black text-[10px] md:text-xs uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 rounded-full px-3 py-1.5 md:px-6 md:py-2 hover:scale-105"
              style={{background:'var(--ww-accent)',color:'var(--ww-accent-text)',boxShadow:'0 0 20px rgba(34,211,238,0.25)'}}
            >
              Join Premium
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE CTA - Only show on very small screens since we hid it above */}
      {!isMapPage && (
        <div className="sm:hidden fixed top-[70px] right-3 z-50 flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{background:'var(--ww-nav-bg)',border:'0.5px solid var(--ww-border)',color:'var(--ww-text)'}}
          >
            {theme === 'dark' ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <line x1="12" y1="2" x2="12" y2="4"/>
                <line x1="12" y1="20" x2="12" y2="22"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="2" y1="12" x2="4" y2="12"/>
                <line x1="20" y1="12" x2="22" y2="12"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button
            className="px-3 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest active:scale-95"
            style={{background:'var(--ww-accent)',color:'var(--ww-accent-text)'}}
          >
            Premium
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
