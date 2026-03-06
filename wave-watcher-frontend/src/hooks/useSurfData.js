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
      console.log("Detecting location...");
      try {
        // Primary API (wrapped in a proxy to bypass simple tracker blocks)
        const PROXY_URL = "https://api.allorigins.win/raw?url=";
        const TARGET_URL = encodeURIComponent("https://ipapi.co/json/");
        
        let res = await fetch(`${PROXY_URL}${TARGET_URL}`);
        if (!res.ok) throw new Error("ipapi via proxy failed");
        let json = await res.json();
        
        console.log("Location detected (Primary):", json.country_code, json.continent_code);
        
        setDetectedLocation({
          continent: json.continent_code,
          country: json.country_code,
        });
      } catch (err) {
        console.warn("Primary location API failed, trying fallback...", err);
        try {
          // Fallback API (ip-api.com) - Note: continent is often 'North America' instead of 'NA' here
          const res = await fetch("http://ip-api.com/json/");
          const json = await res.json();
          
          console.log("Location detected (Fallback):", json.countryCode);
          
          // Map ip-api fields to our format
          setDetectedLocation({
            continent: json.timezone?.split("/")[0] === "America" ? "NA" : 
                       json.timezone?.split("/")[0] === "Europe" ? "EU" : "AS",
            country: json.countryCode,
          });
        } catch (fallbackErr) {
          console.error("All location APIs failed", fallbackErr);
        }
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
