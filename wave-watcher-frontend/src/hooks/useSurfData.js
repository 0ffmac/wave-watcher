import { useState, useEffect } from "react";

const BASE_URL    = "https://surf-forecast-api.comblog.workers.dev/api/forecast";
const LOCATION_URL = "https://surf-forecast-api.comblog.workers.dev/api/location";

export const useSurfData = (activeSpotId) => {
  const [data, setData]                       = useState(null);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState(null);
  const [detectedLocation, setDetectedLocation] = useState(null);

  // ── 1. Detect user location via Cloudflare Worker headers ──────────────────
  // The worker reads CF-IPCountry + CF-IPContinent from the incoming request
  // and returns them as JSON. No external API, no CORS, no mixed-content issues.
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const res  = await fetch(LOCATION_URL);
        if (!res.ok) throw new Error(`Location endpoint returned ${res.status}`);
        const json = await res.json();

        // json = { country: "ID", continent: "AS" }
        // Falls back to "XX" server-side if Cloudflare headers are absent (local dev).
        setDetectedLocation({
          continent: json.continent ?? "XX",
          country:   json.country   ?? "XX",
        });
      } catch (err) {
        // Silent failure — the app still works, just without region-based defaults.
        console.warn("Location detection failed:", err.message);
        setDetectedLocation({ continent: "XX", country: "XX" });
      }
    };

    detectLocation();
  }, []);

  // ── 2. Fetch forecast data ──────────────────────────────────────────────────
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
