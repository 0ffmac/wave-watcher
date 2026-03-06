import React, { useState, useMemo } from "react";
import HeroSection from "./components/HeroSection";
import SwellDetails from "./components/SwellDetails";
import ForecastChart from "./components/ForecastChart";
import ForecastTable from "./components/ForecastTable";
import SpotMap from "./components/SpotMap";
import Navbar from "./components/Navbar";
import { Loader2 } from "lucide-react";

import { useSurfData } from "./hooks/useSurfData";
import {
  transformForecastData,
  getDefaultSpotByRegion,
} from "./utils/dataTransformers";
import { getAllSpotsFlat } from "./data/spotConfig";

// Configuration
const SPOTS = getAllSpotsFlat();
const DEFAULT_COUNTRY = "indonesia";
const DEFAULT_REGION = "sumatra";
const DEFAULT_SPOT = "ujung_bocur";

function App() {
  const [activeSpotId, setActiveSpotId] = useState(DEFAULT_SPOT);
  const [activeCountryKey, setActiveCountryKey] = useState(DEFAULT_COUNTRY);
  const [activeRegionKey, setActiveRegionKey] = useState(DEFAULT_REGION);
  const [hasInitializedLocation, setHasInitializedLocation] = useState(false);

  // 1. Data Fetching & Location Hook
  const { data, loading, error, detectedLocation } = useSurfData(activeSpotId);

  // 2. Dynamic Defaulting based on Geolocation (runs once when location is detected)
  useEffect(() => {
    if (detectedLocation && !hasInitializedLocation) {
      const suggested = getDefaultSpotByRegion(detectedLocation);
      if (suggested) {
        console.log("Setting default location for user region:", suggested);
        setActiveSpotId(suggested.spotId);
        setActiveCountryKey(suggested.country);
        setActiveRegionKey(suggested.region);
      }
      setHasInitializedLocation(true);
    }
  }, [detectedLocation, hasInitializedLocation]);

  // 3. Optimized Data Transformation
  const transformedData = useMemo(() => {
    return transformForecastData(data, activeSpotId);
  }, [data, activeSpotId]);

  if (loading && !data) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="font-black text-xs uppercase tracking-[0.3em] text-slate-400">
          {detectedLocation ? "Loading Forecast" : "Detecting Location"}
        </p>
      </div>
    );
  }

  // Handle error state gracefully if needed (optional)
  if (error && !data) {
     // You could show an error message here, but original code just showed N/A
  }

  const {
    spotName,
    location,
    lat,
    lon,
    surfRange,
    rating,
    mapSwells,
    wind,
    temperatures,
    tide,
    hourly,
  } = transformedData;

  return (
    <div className="min-h-screen pb-24">
      <Navbar
        activeSpotId={activeSpotId}
        activeCountryKey={activeCountryKey}
        activeRegionKey={activeRegionKey}
        onSpotSelect={setActiveSpotId}
        onCountrySelect={setActiveCountryKey}
        onRegionSelect={setActiveRegionKey}
      />

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
