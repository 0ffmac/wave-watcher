import {
  calculateSurfHeight,
  calculateConditionRating,
} from "./surfCalculations";
import { getSpotById, getSpotLocation, getAllSpotsFlat } from "../data/spotConfig";
import { getPeriodCorrection } from "./spotConstants";

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

  // 1. Calculate Current Time Index Early
  // Improved Logic: We find the index of the hour that is NOT in the future.
  // This picks the 12:00 PM row when the time is 12:04 PM.
  const now = new Date();
  let currentIdx = data?.hourly?.times?.findLastIndex(t => new Date(t) <= now);
  if (currentIdx === -1) currentIdx = 0; // Fallback to first row if all are future

  // ── Scale Factor Resolution ────────────────────────────────────────────────
  // inputScaleFactor: regional Open-Meteo model bias correction (from backend)
  // spotScaleFactor:  per-spot physical tuning (canyon, shelf, etc.)
  // finalScaleFactor: combined — used for ALL height calculations and display
  const inputScaleFactor = data?.meta?.inputScaleFactor ?? 1.0;
  const spotScaleFactor  = spotData?.spotScaleFactor ?? 1.0;
  const finalScaleFactor = inputScaleFactor * spotScaleFactor;
  const energyMultiplier = data?.meta?.energyMultiplier ?? 14;

  // ── Surgical Regional Sync ──────────────────────────────────────────────────
  // GENERAL FIX: We now consistently prefer the hourly forecast sync for the Header
  // and Swell/Wind Cards to ensure they are 100% aligned with the Forecast Table.
  // We only use 'current' telemetry if hourly data is missing.
  const useHourlyForCurrent = true;

  const periodCorrection = getPeriodCorrection(spotData?.region);

  // Dynamic Surf Range Calculation
  // We use the hourly forecast at currentIdx to ensure the header matches the table exactly.
  const pSwellSource = (useHourlyForCurrent || !data?.current)
    ? {
        height:    data?.hourly?.swell_height?.[currentIdx]    || 0,
        period:    (data?.hourly?.swell_period?.[currentIdx]   || 0) * periodCorrection,
        direction: data?.hourly?.swell_direction?.[currentIdx] || 0,
      }
    : (data?.current?.swells?.[0] || { height: 0, period: 0, direction: 0 });

  const sSwellSource = (useHourlyForCurrent || !data?.current)
    ? {
        height:    data?.hourly?.secondary_swell_height?.[currentIdx]    || 0,
        period:    (data?.hourly?.secondary_swell_period?.[currentIdx]   || 0) * periodCorrection,
        direction: data?.hourly?.secondary_swell_direction?.[currentIdx] || 0,
      }
    : (data?.current?.swells?.[1] || { height: 0, period: 0, direction: 0 });

  const currentWind = (useHourlyForCurrent || !data?.current)
    ? {
        speed:     data?.hourly?.wind_speed?.[currentIdx]     || 0,
        direction: data?.hourly?.wind_direction?.[currentIdx] || 0,
        gusts:     data?.hourly?.wind_gusts?.[currentIdx]     || 0,
        texture:   "N/A",
      }
    : (data?.current?.wind || { speed: 0, direction: 0, texture: "N/A" });

  // 1. Header Surf Height: We use ONLY the primary swell here to match the 
  // Surfline-aligned heights the user prefers (e.g. 1.0-1.3m for Mandiri).
  const calculatedSurf = calculateSurfHeight(
    pSwellSource.height,
    pSwellSource.period,
    pSwellSource.direction,
    currentWind.direction,
    currentWind.speed,
    spotData,
    finalScaleFactor
  );

  const surfRange = `${calculatedSurf.min.toFixed(1)}–${calculatedSurf.max.toFixed(1)}m`;

  // 2. Condition Rating: We still use the 'dominant' swell approach from the table 
  // to ensure the quality rating (Fair/Good/Epic) is accurate.
  const pSurfRating = calculatedSurf; // already calculated above
  const sSurfRating = (sSwellSource.period >= 7) // MIN_SURF_PERIOD
    ? calculateSurfHeight(
        sSwellSource.height,
        sSwellSource.period,
        sSwellSource.direction,
        currentWind.direction,
        currentWind.speed,
        spotData,
        finalScaleFactor
      )
    : { min: 0, max: 0, windFactor: 1.0, directionalFactor: 1.0 };

  const dominant = pSurfRating.max >= sSurfRating.max ? pSurfRating : sSurfRating;
  const ratingSurfMax = Math.max(pSurfRating.max, sSurfRating.max);
  
  const rating = calculateConditionRating(
    ratingSurfMax,
    currentWind.speed,
    dominant.windFactor,
    dominant.directionalFactor,
    spotData.breakType,
    ratingSurfMax
  );

  const mapSwells = [
    {
      height: parseFloat((pSwellSource.height * finalScaleFactor).toFixed(2)),
      period: Math.round(pSwellSource.period),
      direction: pSwellSource.direction,
    },
    {
      height: parseFloat((sSwellSource.height * finalScaleFactor).toFixed(2)),
      period: Math.round(sSwellSource.period),
      direction: sSwellSource.direction,
    },
  ];

  const temperatures = data?.current?.temperatures || (data?.hourly?.temperature && data?.hourly?.sea_surface_temperature
    ? {
        air: data.hourly.temperature[currentIdx] || 0,
        water: data.hourly.sea_surface_temperature[currentIdx] || 0,
      }
    : undefined);

  const tide = data?.current?.tide || (data?.hourly?.sea_level_height_msl
    ? data.hourly.sea_level_height_msl[currentIdx]
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
    wind: currentWind,
    temperatures,
    tide,
    hourly,
    inputScaleFactor,
    finalScaleFactor,
    energyMultiplier,
    currentIdx,
  };
};
