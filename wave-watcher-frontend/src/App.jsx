import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import SwellDetails from "./components/SwellDetails";
import ForecastChart from "./components/ForecastChart";
import ForecastTable from "./components/ForecastTable";
import SpotMap from "./components/SpotMap";
import LocationSelector from "./components/LocationSelector";
import { Loader2 } from "lucide-react";
import {
  calculateSurfHeight,
  calculateConditionRating,
} from "./utils/surfCalculations";
import {
  getAllSpotsFlat,
  getSpotById,
  getSpotLocation,
  getCountries,
} from "./data/spotConfig";

// Configuration
const BASE_URL = "https://surf-forecast-api.comblog.workers.dev/api/forecast";

// Get all spots as flat object for backward compatibility
const SPOTS = getAllSpotsFlat();

// Default selection
const DEFAULT_COUNTRY = "indonesia";
const DEFAULT_REGION = "sumatra";
const DEFAULT_SPOT = "ujung_bocur";

function App() {
  const [activeSpotId, setActiveSpotId] = useState(DEFAULT_SPOT);
  const [activeCountryKey, setActiveCountryKey] = useState(DEFAULT_COUNTRY);
  const [activeRegionKey, setActiveRegionKey] = useState(DEFAULT_REGION);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setData(null); // Reset data on each fetch
      try {
        const response = await fetch(
          `${BASE_URL}?spot=${activeSpotId}&bypass_cache=false`, // &source=stormglass
        );
        if (!response.ok) throw new Error(`Backend error: ${response.status}`);
        const json = await response.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err) {
        console.warn("Could not fetch live data.", err);
        // data remains null, so UI will show N/A values
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSpotId]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="font-black text-xs uppercase tracking-[0.3em] text-slate-400">
          Loading Forecast
        </p>
      </div>
    );
  }

  // Provide default values for graceful degradation
  const spotName =
    data?.meta?.spot_name ||
    getSpotById(activeSpotId)?.name ||
    SPOTS[activeSpotId]?.name ||
    activeSpotId;
  const spotData = getSpotById(activeSpotId) || SPOTS[activeSpotId] || {};

  // Dynamic Surf Range Calculation for the Hero/Details card
  const currentSwell = data?.current?.swells?.[0] || {
    height: 0,
    period: 0,
    direction: 0,
  };
  const currentWind = data?.current?.wind || { speed: 0, direction: 0 };
  const calculatedSurf = calculateSurfHeight(
    currentSwell.height,
    currentSwell.period,
    currentSwell.direction,
    currentWind.direction,
    currentWind.speed,
    spotData,
  );

  const surfRange = `${calculatedSurf.min.toFixed(1)}–${calculatedSurf.max.toFixed(1)}m`;
  const rating = calculateConditionRating(
    calculatedSurf.max,
    currentWind.speed,
    calculatedSurf.windFactor,
    calculatedSurf.directionalFactor,
  );

  const swells = data?.current?.swells || [];

  // This ensures we check for both even if the primary 'swells' array only has 1 item
  const mapSwells = [
    // Primary Swell
    swells?.[0] || {
      height: data?.hourly?.swell_height?.[0] || 0,
      period: data?.hourly?.swell_period?.[0] || 0,
      direction: data?.hourly?.swell_direction?.[0] || 0,
    },
    // Secondary Swell
    swells?.[1] || {
      height: data?.hourly?.secondary_swell_height?.[0] || 0,
      period: data?.hourly?.secondary_swell_period?.[0] || 0,
      direction: data?.hourly?.secondary_swell_direction?.[0] || 0,
    },
  ];

  const wind = data?.current?.wind || {
    speed: 0,
    direction: 0,
    compass: "N/A",
    texture: "N/A",
  };

  // Try to map temperature from either current or hourly if available
  const temperatures =
    data?.current?.temperatures ||
    (data?.hourly?.temperature && data?.hourly?.sea_surface_temperature
      ? {
          air: data.hourly.temperature[0] || 0,
          water: data.hourly.sea_surface_temperature[0] || 0,
        }
      : undefined);

  const tide =
    data?.current?.tide ||
    (data?.hourly?.sea_level_height_msl
      ? data.hourly.sea_level_height_msl[0]
      : undefined);

  // Deep merge defaults to ensure all required arrays exist
  const hourly = {
    times: data?.hourly?.times || [],
    wave_height: data?.hourly?.wave_height || [],
    wind_speed: data?.hourly?.wind_speed || [],
    wind_direction: data?.hourly?.wind_direction || [],
    swell_height: data?.hourly?.swell_height || [],
    swell_period: data?.hourly?.swell_period || [],
    swell_direction: data?.hourly?.swell_direction || [],
    secondary_swell_height: data?.hourly?.secondary_swell_height || [],
    secondary_swell_period: data?.hourly?.secondary_swell_period || [],
    secondary_swell_direction: data?.hourly?.secondary_swell_direction || [],
    temperature: data?.hourly?.temperature || [],
  };
  const location =
    getSpotLocation(activeSpotId) || spotData.location || "Unknown Location";
  const lat = spotData.lat || 0;
  const lon = spotData.lon || 0;

  return (
    <div className="min-h-screen pb-24">
      {/* Dynamic Header with Spot Selector */}
      {/* Added a subtle top-down gradient overlay to ensure text visibility regardless of wave brightness */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-40 pointer-events-none" />

      <nav className="absolute top-0 left-0 right-0 z-50 px-3 py-3 md:px-6 md:py-6 container mx-auto flex items-center justify-between gap-2">
        {/* LEFT: Logo & Location */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            {/* WaveWatcher Custom Logo */}
            <div className="relative group cursor-pointer">
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
            </div>
            {/* Brand Name: Added drop-shadow for visibility on white foam */}
            <span className="font-black text-white text-base md:text-lg tracking-tighter hidden sm:block drop-shadow-md">
              WaveWatcher
            </span>
          </div>

          {/* Location Selector: We pass a 'compact' prop if you want to shrink it on mobile */}
          <div className="min-w-0 max-w-[140px] xs:max-w-none">
            <LocationSelector
              activeSpotId={activeSpotId}
              activeCountryKey={activeCountryKey}
              activeRegionKey={activeRegionKey}
              onSpotSelect={setActiveSpotId}
              onCountrySelect={setActiveCountryKey}
              onRegionSelect={setActiveRegionKey}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </div>
        </div>

        {/* CENTER: Desktop Links */}
        {/* High-visibility slate colors with hard-edge drop shadows */}
        <div className="hidden lg:flex items-center gap-8 font-black text-[10px] uppercase tracking-widest">
          <a
            href="#"
            className="text-white hover:text-blue-400 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >
            Reports
          </a>
          <a
            href="#"
            className="text-slate-200 hover:text-white transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >
            Forecasts
          </a>
          <a
            href="#"
            className="text-slate-200 hover:text-white transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >
            Maps
          </a>
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
        <a
          href="#"
          className="text-white text-[9px] font-black uppercase tracking-tighter"
        >
          Reports
        </a>
        <a
          href="#"
          className="text-slate-400 text-[9px] font-black uppercase tracking-tighter"
        >
          Forecasts
        </a>
        <a
          href="#"
          className="text-slate-400 text-[9px] font-black uppercase tracking-tighter"
        >
          Maps
        </a>
      </div>

      <HeroSection
        spotName={spotName}
        rating={rating}
        surfRange={surfRange}
        location={location}
      />

      <SwellDetails
        swells={mapSwells}
        wind={wind}
        temperatures={temperatures}
        tide={tide}
        tideForecast={data?.hourly?.sea_level_height_msl}
        times={data?.hourly?.times}
        rating={rating}
        surfRange={surfRange}
        activeSpotId={activeSpotId}
        activeCountryKey={activeCountryKey}
        activeRegionKey={activeRegionKey}
        onSpotSelect={setActiveSpotId}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 container mx-auto gap-8 px-6">
        <div className="xl:col-span-3">
          <ForecastTable
            data={hourly}
            spotId={activeSpotId}
            spotsMetadata={SPOTS}
          />
        </div>
        <div className="xl:col-span-1">
          <div className="sticky top-8 space-y-8">
            <SpotMap
              lat={lat}
              lon={lon}
              spotName={spotName}
              wind={wind}
              swells={mapSwells}
            />
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <h4 className="font-black text-2xl mb-2 relative z-10">
                Go Premium
              </h4>
              <p className="text-white/80 text-sm mb-6 relative z-10">
                Get 17-day forecasts, ad-free experience, and high-def live
                cams.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest relative z-10 hover:shadow-xl transition-shadow">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <ForecastChart
        data={hourly}
        spotId={activeSpotId}
        spotsMetadata={SPOTS}
      />

      <footer className="mt-24 border-t border-slate-200 bg-white/50 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
            © 2026 WaveWatcher Forecast Services.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
