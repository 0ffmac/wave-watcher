import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Loader2 } from "lucide-react";

import { useSurfData } from "./hooks/useSurfData";
import {
  transformForecastData,
  getDefaultSpotByRegion,
} from "./utils/dataTransformers";
import { getAllSpotsFlat } from "./data/spotConfig";

// Pages
import Dashboard from "./pages/Dashboard";
import MapPage from "./pages/MapPage";
import SpotInfo from "./pages/SpotInfo";

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
  const [theme, setTheme] = useState(() => localStorage.getItem('ww-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ww-theme', theme);
  }, [theme]);

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
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4" style={{background:'var(--ww-bg)'}}>
        <Loader2 className="animate-spin" size={48} style={{color:'var(--ww-accent)'}} />
        <p className="font-black text-xs uppercase tracking-[0.3em]" style={{color:'var(--ww-text-2)'}}>
          {detectedLocation ? "Loading Forecast" : "Detecting Location"}
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar
          activeSpotId={activeSpotId}
          activeCountryKey={activeCountryKey}
          activeRegionKey={activeRegionKey}
          onSpotSelect={setActiveSpotId}
          onCountrySelect={setActiveCountryKey}
          onRegionSelect={setActiveRegionKey}
          theme={theme}
          onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                data={data}
                transformedData={transformedData}
                activeSpotId={activeSpotId}
                activeCountryKey={activeCountryKey}
                activeRegionKey={activeRegionKey}
                setActiveSpotId={setActiveSpotId}
                SPOTS={SPOTS}
              />
            }
          />
          <Route
            path="/map"
            element={
              <MapPage
                data={data}
                loading={loading}
                error={error}
                activeSpotId={activeSpotId}
                activeCountryKey={activeCountryKey}
                activeRegionKey={activeRegionKey}
                onSpotSelect={setActiveSpotId}
                transformedData={transformedData}
              />
            }
          />
          <Route
            path="/info"
            element={
              <SpotInfo
                activeSpotId={activeSpotId}
              />
            }
          />
        </Routes>

        <footer className="mt-24 py-12" style={{borderTop:'0.5px solid var(--ww-border)',background:'var(--ww-card-2)'}}>
          <div className="container mx-auto px-6 text-center">
            <p className="font-bold text-xs uppercase tracking-[0.2em]" style={{color:'var(--ww-text-3)'}}>
              © 2026 WaveWatcher Forecast Services.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
