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
        className="flex items-center gap-1.5 md:gap-2 bg-slate-900/60 backdrop-blur-md border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-white font-bold text-xs md:text-sm hover:bg-slate-900/80 transition-all cursor-pointer whitespace-nowrap shadow-lg"
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
          <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 transition-all py-3 z-50 max-h-[70vh] overflow-y-auto">
            {/* Country Selector */}
            <div className="px-3 pb-2 border-b border-slate-100 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Country
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {countries.map((country) => (
                  <button
                    key={country.key}
                    onClick={() => handleCountryChange(country.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeCountryKey === country.key
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {country.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Selector */}
            <div className="px-3 pb-2 border-b border-slate-100 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <Mountain size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Region
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {regions.map((region) => (
                  <button
                    key={region.key}
                    onClick={() => handleRegionChange(region.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeRegionKey === region.key
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    } ${!region.hasSpots ? "opacity-40" : ""}`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Spots List */}
            <div className="px-3">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
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
                                <span className="text-[9px] font-black text-blue-500/50 uppercase tracking-tighter">
                                  {isGrouped}
                                </span>
                              </div>
                            )}
                            <button
                              onClick={() => {
                                onSpotSelect(spotId);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                                activeSpotId === spotId
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-slate-700 hover:bg-slate-50"
                              } ${isGrouped ? "ml-2 w-[calc(100%-8px)]" : ""}`}
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
