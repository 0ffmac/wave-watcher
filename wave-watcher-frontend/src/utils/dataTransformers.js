import {
  calculateSurfHeight,
  calculateConditionRating,
} from "./surfCalculations";
import { getSpotById, getSpotLocation, getAllSpotsFlat } from "../data/spotConfig";

const SPOTS = getAllSpotsFlat();

export const getDefaultSpotByRegion = (detectedLocation) => {
  if (!detectedLocation) return null;

  const { continent, country } = detectedLocation;

  // 1. Europe (France - La Graviere)
  if (continent === "EU" || country === "FR") {
    return {
      spotId: "fr_la_graviere",
      country: "france",
      region: "hossegor",
    };
  }

  // 2. North America (USA - Sebastian Inlet)
  if (continent === "NA" || country === "US") {
    return {
      spotId: "us_sebastian_inlet",
      country: "usa",
      region: "florida_central",
    };
  }

  // 3. Asia / Default (Indonesia - Ujung Bocur)
  return {
    spotId: "ujung_bocur",
    country: "indonesia",
    region: "sumatra",
  };
};

export const transformForecastData = (data, activeSpotId) => {
  // Provide default values for graceful degradation
  const spotData = getSpotById(activeSpotId) || SPOTS[activeSpotId] || {};
  const spotName = data?.meta?.spot_name || spotData?.name || activeSpotId;
  const location = getSpotLocation(activeSpotId) || spotData.location || "Unknown Location";
  const lat = spotData.lat || 0;
  const lon = spotData.lon || 0;

  // Dynamic Surf Range Calculation
  const currentSwell = data?.current?.swells?.[0] || {
    height: 0,
    period: 0,
    direction: 0,
  };
  const currentWind = data?.current?.wind || { speed: 0, direction: 0 };

  // Read calibration values from backend metadata.
  // Defaults are safe fallbacks if backend is an older version.
  const inputScaleFactor = data?.meta?.inputScaleFactor ?? 1.0;
  const energyMultiplier = data?.meta?.energyMultiplier ?? 14;

  const calculatedSurf = calculateSurfHeight(
    currentSwell.height,
    currentSwell.period,
    currentSwell.direction,
    currentWind.direction,
    currentWind.speed,
    spotData,
    inputScaleFactor
  );

  const surfRange = `${calculatedSurf.min.toFixed(1)}–${calculatedSurf.max.toFixed(1)}m`;
  const rating = calculateConditionRating(
    calculatedSurf.max,
    currentWind.speed,
    calculatedSurf.windFactor,
    calculatedSurf.directionalFactor,
    spotData.breakType // ADDED
  );

  const swells = data?.current?.swells || [];
  const mapSwells = [
    swells?.[0] || {
      height: data?.hourly?.swell_height?.[0] || 0,
      period: data?.hourly?.swell_period?.[0] || 0,
      direction: data?.hourly?.swell_direction?.[0] || 0,
    },
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

  const temperatures = data?.current?.temperatures || (data?.hourly?.temperature && data?.hourly?.sea_surface_temperature
    ? {
        air: data.hourly.temperature[0] || 0,
        water: data.hourly.sea_surface_temperature[0] || 0,
      }
    : undefined);

  const tide = data?.current?.tide || (data?.hourly?.sea_level_height_msl
    ? data.hourly.sea_level_height_msl[0]
    : undefined);

  const hourly = {
    times: data?.hourly?.times || [],
    wave_height: data?.hourly?.wave_height || [],
    wind_speed: data?.hourly?.wind_speed || [],
    wind_direction: data?.hourly?.wind_direction || [],
    wind_gusts: data?.hourly?.wind_gusts || [],
    swell_height: data?.hourly?.swell_height || [],
    swell_period: data?.hourly?.swell_period || [],
    swell_direction: data?.hourly?.swell_direction || [],
    secondary_swell_height: data?.hourly?.secondary_swell_height || [],
    secondary_swell_period: data?.hourly?.secondary_swell_period || [],
    secondary_swell_direction: data?.hourly?.secondary_swell_direction || [],
    temperature: data?.hourly?.temperature || [],
    rain: data?.hourly?.rain || [],
    cloud_cover: data?.hourly?.cloud_cover || [],
  };

  return {
    spotName,
    spotData,
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
    inputScaleFactor,
    energyMultiplier,
  };
};
