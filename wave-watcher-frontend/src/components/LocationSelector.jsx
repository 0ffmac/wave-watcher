import React from "react";
import { MapPin, ChevronDown, Globe, Mountain } from "lucide-react";
import {
  getCountries,
  getRegionsForCountry,
  getSpotsForRegion,
  getSpotsForCountry,
} from "../data/spotConfig";

const LocationSelector = ({
  activeSpotId,
  activeCountryKey,
  activeRegionKey,
  onSpotSelect,
  onCountrySelect,
  onRegionSelect,
  isDropdownOpen,
  setIsDropdownOpen,
}) => {
  const countries = getCountries();
  const regions = getRegionsForCountry(activeCountryKey);
  const countrySpots = getSpotsForCountry(activeCountryKey);

  const handleCountryChange = (countryKey) => {
    onCountrySelect(countryKey);
    const newRegions = getRegionsForCountry(countryKey);
    if (newRegions.length > 0) {
      const firstRegion = newRegions.find((r) => r.hasSpots) || newRegions[0];
      onRegionSelect(firstRegion.key);

      // Auto-select first spot in the new region
      const regionSpots = getSpotsForRegion(countryKey, firstRegion.key) || {};
      const spotIds = Object.keys(regionSpots);
      if (spotIds.length > 0) {
        onSpotSelect(spotIds[0]);
      }
    }
  };

  const handleRegionChange = (regionKey) => {
    onRegionSelect(regionKey);

    // Auto-select first spot in the selected region
    const regionSpots = getSpotsForRegion(activeCountryKey, regionKey) || {};
    const spotIds = Object.keys(regionSpots);
    if (spotIds.length > 0) {
      onSpotSelect(spotIds[0]);
    }
  };

  const getSpotDisplayName = (spotId) => {
    // 1. Check if regions exists and is an array
    if (!regions || !Array.isArray(regions)) return spotId;

    for (const region of regions) {
      // 2. Add || {} to ensure regionSpots is at least an empty object
      const regionSpots = getSpotsForRegion(activeCountryKey, region.key) || {};

      if (regionSpots[spotId]) {
        return regionSpots[spotId].name;
      }
    }

    // 3. Last resort: check the country-wide spots list
    if (countrySpots && countrySpots[spotId]) {
      return countrySpots[spotId].name;
    }

    return spotId;
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap" style={{background:'var(--ww-card)',border:'0.5px solid var(--ww-border)',color:'var(--ww-text)',backdropFilter:'blur(12px)'}}
      >
        <MapPin size={14} className="md:w-4 md:h-4" />
        <span className="max-w-[150px] xs:max-w-none truncate">
          {getSpotDisplayName(activeSpotId)}
        </span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} opacity-50 md:w-3.5 md:h-3.5`}
        />
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl transition-all py-3 z-50 max-h-[70vh] overflow-y-auto" style={{background:'var(--ww-dropdown-bg)',border:'0.5px solid var(--ww-border)',boxShadow:'0 24px 60px rgba(0,0,0,0.6)',backdropFilter:'blur(20px)'}}>
            {/* Country Selector */}
            <div className="px-3 pb-2 mb-2" style={{borderBottom:'0.5px solid var(--ww-border)'}}>
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} style={{color:'var(--ww-text-2)'}} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
                  Country
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {countries.map((country) => (
                  <button
                    key={country.key}
                    onClick={() => handleCountryChange(country.key)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={activeCountryKey === country.key
                      ? {background:'var(--ww-accent-bg)',color:'var(--ww-accent)',border:'0.5px solid var(--ww-accent-border)'}
                      : {background:'var(--ww-card)',color:'var(--ww-text-2)',border:'0.5px solid var(--ww-border)'}}
                  >
                    {country.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Selector */}
            <div className="px-3 pb-2 mb-2" style={{borderBottom:'0.5px solid var(--ww-border)'}}>
              <div className="flex items-center gap-2 mb-2">
                <Mountain size={14} style={{color:'var(--ww-text-2)'}} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
                  Region
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {regions.map((region) => (
                  <button
                    key={region.key}
                    onClick={() => handleRegionChange(region.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!region.hasSpots ? "opacity-40" : ""}`}
                    style={activeRegionKey === region.key
                      ? {background:'var(--ww-accent-bg)',color:'var(--ww-accent)',border:'0.5px solid var(--ww-accent-border)'}
                      : {background:'var(--ww-card)',color:'var(--ww-text-2)',border:'0.5px solid var(--ww-border)'}}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Spots List */}
            <div className="px-3">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} style={{color:'var(--ww-text-2)'}} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{color:'var(--ww-text-2)'}}>
                  Spots
                </span>
              </div>

              {regions
                .filter((region) => region.key === activeRegionKey)
                .map((region) => {
                  const regionSpots =
                    getSpotsForRegion(activeCountryKey, region.key) || {};
                  const spotIds = Object.keys(regionSpots);

                  if (spotIds.length === 0) {
                    return (
                      <div key={region.key} className="text-center py-6">
                        <p className="text-slate-400 text-sm font-medium">
                          No spots found.
                        </p>
                      </div>
                    );
                  }

                  let currentGroup = null;
                  return (
                    <div key={region.key} className="space-y-0.5">
                      {spotIds.map((spotId) => {
                        const spot = regionSpots[spotId];
                        if (!spot) return null; // 2. SAFETY CHECK: Skip if spot data missing

                        const isGrouped = spot.group;
                        const showGroupHeader =
                          isGrouped && isGrouped !== currentGroup;
                        if (showGroupHeader) currentGroup = isGrouped;

                        return (
                          <React.Fragment key={spotId}>
                            {showGroupHeader && (
                              <div className="px-3 pt-3 pb-1">
                                <span className="text-[9px] font-black uppercase tracking-tighter" style={{color:'var(--ww-accent)',opacity:0.4}}>
                                  {isGrouped}
                                </span>
                              </div>
                            )}
                            <button
                              onClick={() => {
                                onSpotSelect(spotId);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all ${isGrouped ? "ml-2 w-[calc(100%-8px)]" : ""}`}
                              style={activeSpotId === spotId
                                ? {background:'var(--ww-accent-bg)',color:'var(--ww-accent)'}
                                : {color:'var(--ww-text-2)'}}
                            >
                              {spot.name || spotId}
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationSelector;
