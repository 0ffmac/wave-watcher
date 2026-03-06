import { useState, useEffect } from "react";

const BASE_URL = "https://surf-forecast-api.comblog.workers.dev/api/forecast";

export const useSurfData = (activeSpotId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detectedLocation, setDetectedLocation] = useState(null);

  // 1. Detect user location once on mount
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const json = await res.json();
        // Return continent or country to help App.jsx decide the default
        setDetectedLocation({
          continent: json.continent_code, // e.g., "AS", "EU", "NA"
          country: json.country_code,    // e.g., "ID", "FR", "US"
        });
      } catch (err) {
        console.warn("Location detection failed", err);
      }
    };
    detectLocation();
  }, []);

  // 2. Fetch Forecast Data
  useEffect(() => {
    const fetchData = async () => {
      if (!activeSpotId) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${BASE_URL}?spot=${activeSpotId}&bypass_cache=false`,
        );
        if (!response.ok) throw new Error(`Backend error: ${response.status}`);
        const json = await response.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err) {
        console.warn("Could not fetch live data.", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSpotId]);

  return { data, loading, error, detectedLocation };
};
