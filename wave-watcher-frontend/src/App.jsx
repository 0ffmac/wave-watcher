import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import SwellDetails from "./components/SwellDetails";
import ForecastChart from "./components/ForecastChart";
import ForecastTable from "./components/ForecastTable";
import SpotMap from "./components/SpotMap";
import { Loader2, ChevronDown, MapPin } from "lucide-react";

// Configuration
const BASE_URL = "https://surf-forecast-api.comblog.workers.dev/api/forecast";

const SPOTS = {
  ujung_bocur: {
    name: "Ujung Bocur",
    lat: -5.3048,
    lon: 103.9919,
    location: "South Sumatra, Indonesia",
  },
  mandiri_beach: {
    name: "Mandiri Beach",
    lat: -5.2472,
    lon: 103.9234,
    location: "South Sumatra, Indonesia",
  },
  krui_left: {
    name: "Krui Left",
    lat: -5.1928,
    lon: 103.929,
    location: "South Sumatra, Indonesia",
  },
  jennys_right: {
    name: "Jenny's Right",
    lat: -5.0383,
    lon: 103.7666,
    location: "South Sumatra, Indonesia",
  },
  krui_right: {
    name: "Krui Right",
    lat: -5.178,
    lon: 103.888,
    location: "South Sumatra, Indonesia",
  },
  way_jambu: {
    name: "Way Jambu",
    lat: -5.3491,
    lon: 104.0302,
    location: "South Sumatra, Indonesia",
  },
  ujung_walur: {
    name: "Ujung Walur",
    lat: -5.216,
    lon: 103.908,
    location: "South Sumatra, Indonesia",
  },
};

function App() {
  const [activeSpotId, setActiveSpotId] = useState("ujung_bocur");
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
  const spotName = data?.meta?.spot_name || SPOTS[activeSpotId].name;
  const rating = data?.current?.rating || "N/A";
  const surfRange = data?.current?.surf_range || "N/A";
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
  const location = SPOTS[activeSpotId].location;
  const lat = SPOTS[activeSpotId].lat;
  const lon = SPOTS[activeSpotId].lon;

  return (
    <div className="min-h-screen pb-24">
      {/* Dynamic Header with Spot Selector */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:py-6 container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/30 shadow-xl">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-sm rotate-45" />
            </div>
            <span className="font-black text-white text-lg md:text-xl tracking-tighter hidden xs:block">
              WaveWatcher
            </span>
          </div>

          {/* Spot Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-white font-bold text-xs md:text-sm hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <MapPin size={14} className="md:w-4 md:h-4" />
              <span className="max-w-[100px] xs:max-w-none truncate">
                {SPOTS[activeSpotId].name}
              </span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} opacity-50 md:w-3.5 md:h-3.5`}
              />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 transition-all py-2 z-50 opacity-100 visible translate-y-0">
                  {Object.entries(SPOTS).map(([id, spot]) => (
                    <button
                      key={id}
                      onClick={() => {
                        setActiveSpotId(id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors hover:bg-blue-50 ${activeSpotId === id ? "text-blue-600 bg-blue-50/50" : "text-slate-700"}`}
                    >
                      {spot.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 font-black text-[10px] uppercase tracking-widest text-white/70">
          <a href="#" className="text-white">
            Reports
          </a>
          <a href="#">Forecasts</a>
          <a href="#">Maps</a>
        </div>

        <button className="bg-blue-500 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all whitespace-nowrap">
          <span className="hidden sm:inline">Join Premium</span>
          <span className="sm:hidden">Premium</span>
        </button>
      </nav>

      <HeroSection
        spotName={spotName}
        rating={rating}
        surfRange={surfRange}
        location={location}
      />

      <SwellDetails
        swells={swells}
        wind={wind}
        temperatures={temperatures}
        tide={tide}
        rating={rating}
        surfRange={surfRange}
      />

      <ForecastChart data={hourly} />

      <div className="grid grid-cols-1 xl:grid-cols-4 container mx-auto gap-8 px-6">
        <div className="xl:col-span-3">
          <ForecastTable data={hourly} />
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
