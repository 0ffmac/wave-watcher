import { useState, useEffect } from "react";

const BASE_URL = "https://surf-forecast-api.comblog.workers.dev/api/forecast";

export const useSurfData = (activeSpotId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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

  return { data, loading, error };
};
