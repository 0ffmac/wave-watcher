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
};

function App() {
  const [activeSpotId, setActiveSpotId] = useState("ujung_bocur");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setData(null); // Reset data on each fetch
      try {
        const response = await fetch(
          `${BASE_URL}?spot=${activeSpotId}&bypass_cache=false`, // &source=stormglass
        );
        if (!response.ok) throw new Error("Backend not reachable");
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
  const wind = data?.current?.wind || {
    speed: 0,
    direction: 0,
    compass: "N/A",
    texture: "N/A",
  };
  const temperatures = data?.current?.temperatures; // Can be undefined, SwellDetails handles it
  const tide = data?.current?.tide; // Can be undefined, SwellDetails handles it
  const hourly = data?.hourly || { times: [], wave_height: [], wind_speed: [] };
  const location = SPOTS[activeSpotId].location;
  const lat = SPOTS[activeSpotId].lat;
  const lon = SPOTS[activeSpotId].lon;

  return (
    <div className="min-h-screen pb-24">
      {/* Dynamic Header with Spot Selector */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/30 shadow-xl">
              <div className="w-5 h-5 bg-white rounded-sm rotate-45" />
            </div>
            <span className="font-black text-white text-xl tracking-tighter">
              WaveWatcher
            </span>
          </div>

          {/* Spot Dropdown */}
          <div className="relative group ml-4">
            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-white font-bold text-sm hover:bg-white/20 transition-all cursor-pointer">
              <MapPin size={16} />
              {SPOTS[activeSpotId].name}
              <ChevronDown size={14} className="opacity-50" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50">
              {Object.entries(SPOTS).map(([id, spot]) => (
                <button
                  key={id}
                  onClick={() => setActiveSpotId(id)}
                  className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors hover:bg-blue-50 ${activeSpotId === id ? "text-blue-600 bg-blue-50/50" : "text-slate-700"}`}
                >
                  {spot.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 font-black text-[10px] uppercase tracking-widest text-white/70">
          <a href="#" className="text-white">
            Reports
          </a>
          <a href="#">Forecasts</a>
          <a href="#">Maps</a>
        </div>

        <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
          Join Premium
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
            <SpotMap lat={lat} lon={lon} spotName={spotName} />
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
