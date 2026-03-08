import { BREAK_AMPLIFICATION, MIN_SURF_PERIOD } from './spotConstants';

/**
 * isAngleInRange
 * Returns true if `angle` falls within [start, end].
 * Handles ranges that wrap around North, e.g. [330, 30] for NNW–NNE.
 */
const isAngleInRange = (angle, range) => {
  if (!range || range.length !== 2) return false;
  const [start, end] = range;
  const a = ((angle % 360) + 360) % 360;
  return start <= end ? (a >= start && a <= end) : (a >= start || a <= end);
};

export const calculateSurfHeight = (
  swellHeight,
  swellPeriod,
  swellDir,
  windDir,
  windSpeed,
  spotMeta,
  inputScaleFactor = 1.0,   // ADD — corrects Open-Meteo model bias per region
) => {
  // Scale raw Hs to correct Open-Meteo's systematic overestimation vs LOTUS/MSW.
  // Factor comes from the backend API response (meta.inputScaleFactor).
  const scaledHeight = swellHeight * inputScaleFactor;

  // Breaking factor is the PRIMARY Hs→face height converter.
  // Starts below 1.0 — short-period wind chop barely breaks as a face.
  // Scales up with period as longer swells shoal more aggressively.
  //
  // Reference targets (face/Hs_scaled, beach break, no directional penalty):
  //   6s  → 0.40–0.55 (wind chop)       10s → 0.56–0.73 (avg groundswell)
  //   8s  → 0.48–0.64 (gutless)         13s → 0.68–0.87 (solid — Surfline ref)
  //   16s → 0.80–1.00 (long period)     20s → 0.96–1.18 (max shoaling)
  const breakingBaseMin = 0.40 + (swellPeriod - 6) * 0.040;
  const breakingBaseMax = 0.55 + (swellPeriod - 6) * 0.045;

  // If no spot metadata or missing critical calculation params, return a basic estimation
  if (
    !spotMeta ||
    !spotMeta.swellWindow ||
    spotMeta.optimalSwellDir === undefined ||
    spotMeta.facingDir === undefined
  ) {
    const defaultAmp = 1.5;
    const chopDamping = (swellPeriod < MIN_SURF_PERIOD) ? 0.5 : 1.0;
    return {
      min: Math.max(0.1, scaledHeight * breakingBaseMin * defaultAmp * chopDamping),
      max: Math.max(0.2, scaledHeight * breakingBaseMax * defaultAmp * chopDamping),
      windFactor: 1.0,
      directionalFactor: 1.0,
    };
  }

  const normalize = (d) => (d + 360) % 360;

  // 1. Directional Efficiency
  const [minWin, maxWin] = spotMeta.swellWindow;
  let directionalFactor = 0;
  const sDir = normalize(swellDir);
  const optDir = normalize(spotMeta.optimalSwellDir);

  if (sDir >= minWin && sDir <= maxWin) {
    const diff = Math.abs(sDir - optDir);
    const finalDiff = diff > 180 ? 360 - diff : diff;

    // Plateau logic: Spots wrap swell.
    if (finalDiff <= 45) {
      directionalFactor = 1.0;
    } else {
      const halfWindow = (maxWin - minWin) / 2;
      directionalFactor = Math.max(0.4, 1 - finalDiff / (halfWindow * 1.3));
    }
  } else {
    // SOFT SHOULDER: Instead of a cliff, ramp down over 20 degrees
    const distToMin = Math.min(Math.abs(sDir - minWin), 360 - Math.abs(sDir - minWin));
    const distToMax = Math.min(Math.abs(sDir - maxWin), 360 - Math.abs(sDir - maxWin));
    const minDist = Math.min(distToMin, distToMax);

    if (minDist <= 20) {
      // Ramp from 0.4 down to 0.2 over 20 degrees
      directionalFactor = 0.4 - (minDist / 20) * 0.2;
    } else {
      directionalFactor = 0.2; // deep shadow zone
    }
  }

  // 3. Wind Factor
  let windFactor = 1.0;
  if (windSpeed > 4) {
    const hasExplicitRanges =
      spotMeta?.offshore_wind?.length === 2 &&
      spotMeta?.onshore_wind?.length === 2;

    if (hasExplicitRanges) {
      // Use the spot's declared wind ranges (from spots.json via spotConfig).
      // These are more accurate than geometry, especially for spots where
      // offshore wraps through North (e.g. offshore_wind: [200, 20]).
      const isOffshore = isAngleInRange(windDir, spotMeta.offshore_wind);
      const isOnshore  = isAngleInRange(windDir, spotMeta.onshore_wind);

      if (isOffshore) {
        windFactor = 1.25;
      } else if (isOnshore) {
        windFactor = 0.75;
      } else {
        windFactor = 0.90; // cross-shore
      }
    } else {
      // Geometric fallback for spots without explicit ranges.
      const wDir = normalize(windDir);
      const offshoreDir = normalize(spotMeta.facingDir + 180);
      const rawDiff = Math.abs(wDir - offshoreDir);
      const diff = rawDiff > 180 ? 360 - rawDiff : rawDiff;
      windFactor = diff < 45 ? 1.25 : diff > 135 ? 0.75 : 0.90;
    }
  }

  // Resolve amplification: spot-level → break-type global → fallback
  const amp =
    spotMeta.amplification ||
    BREAK_AMPLIFICATION[spotMeta.breakType] ||
    BREAK_AMPLIFICATION.beach;

  // Wind penalizes height only when strong onshore
  const heightWindPenalty = (windFactor < 0.9 && windSpeed > 20) ? 0.85 : 1.0;

  // Wind-chop damping: if the period is below the minimum groundswell threshold,
  // treat this swell as local chop and cap its effective contribution at 50%.
  // This prevents "Heavy" ratings from short-period wind slop.
  // MIN_SURF_PERIOD is imported from spotConstants.
  const chopDamping = (swellPeriod < MIN_SURF_PERIOD) ? 0.5 : 1.0;

  return {
    min: Math.max(
      0.1,
      scaledHeight * breakingBaseMin * directionalFactor * amp * heightWindPenalty * chopDamping,
    ),
    max: Math.max(
      0.2,
      scaledHeight * breakingBaseMax * directionalFactor * amp * heightWindPenalty * chopDamping,
    ),
    windFactor,
    directionalFactor,
  };
};

export const calculateConditionRating = (
  maxSurf,
  windSpeed,
  windFactor,
  directionalFactor,
  breakType = "beach" // ADDED: to differentiate spot sensitivity
) => {
  if (maxSurf < 0.2) return "FLAT";
  if (windSpeed > 45) return "BLOWN OUT";
  
  // High wind onshore penalty
  if (windFactor < 0.8 && windSpeed > 25) return "BLOWN OUT";

  let score = 0;

  // 1. SIZE SCORE (Scaled by Break Type)
  if (breakType === "reef" || breakType === "point") {
    // Reefs/Points need more size to "work"
    if (maxSurf >= 1.0 && maxSurf <= 3.0) score += 5;
    else if (maxSurf >= 0.7) score += 3;
    else if (maxSurf >= 0.4) score += 1;
    else score -= 1; // Reefs are usually poor when tiny
  } else {
    // Beach breaks are fun even when small
    if (maxSurf >= 0.8 && maxSurf <= 2.2) score += 5;
    else if (maxSurf >= 0.5) score += 4;
    else if (maxSurf >= 0.3) score += 2;
  }

  // 2. WIND SCORE (The "Glassy Morning" Factor)
  const isGlassy = windSpeed < 10;
  const isLight = windSpeed < 18;

  if (windFactor >= 1.10) { 
    // Offshore
    if (isGlassy) score += 5; // EPIC Glassy Offshore
    else if (isLight) score += 4;
    else score += 2;
  } else if (windFactor >= 0.90 || isGlassy) {
    // Cross-shore OR Glassy (any direction)
    if (isGlassy) score += 4; // Morning glass bonus
    else if (isLight) score += 2;
    else score += 1;
  } else {
    // Onshore
    if (isGlassy) score += 2; // Onshore but so light it doesn't matter
    else if (isLight) score -= 1;
    else score -= 3;
  }

  // 3. DIRECTIONAL SCORE
  if (directionalFactor >= 0.9) score += 2;
  else if (directionalFactor >= 0.7) score += 1;
  else if (directionalFactor < 0.4) score -= 2;

  // 4. FINAL RATING
  if (score >= 10) return "EPIC";
  if (score >= 7) return "GOOD";
  if (score >= 4) return "FAIR";
  return "POOR";
};

export const calculateEnergy = (height, period, energyMultiplier = 14) => {
  // Default 14 is tuned for Indo/Sumatran swell power.
  // Pass the region-specific value from meta.energyMultiplier for accuracy elsewhere.
  return Math.round(height * height * period * energyMultiplier);
};

export const getRatingSegments = (r) => {
  const segments = [false, false, false, false, false];
  let label = "N/A";
  let color = "bg-slate-200";
  if (!r) return { segments, label, color };
  if (r.includes("RAINY")) {
    segments[0] = segments[1] = true;
    label = "RAINY";
    color = "bg-blue-400";
  } else if (r.includes("BLOWN OUT")) {
    segments[0] = true;
    label = "BLOWN OUT";
    color = "bg-red-500";
  } else if (r.includes("FLAT")) {
    segments[0] = true;
    label = "FLAT";
    color = "bg-slate-400";
  } else if (r.includes("POOR")) {
    segments[0] = segments[1] = true;
    label = "POOR";
    color = "bg-orange-400";
  } else if (r.includes("FAIR")) {
    segments[0] = segments[1] = segments[2] = true;
    label = "FAIR";
    color = "bg-yellow-400";
  } else if (r.includes("GOOD")) {
    segments[0] = segments[1] = segments[2] = segments[3] = true;
    label = "GOOD";
    color = "bg-emerald-400";
  } else if (r.includes("EPIC")) {
    segments.fill(true);
    label = "EPIC";
    color = "bg-purple-500";
  }
  return { segments, label, color };
};

export const getSurfDesc = (range) => {
  if (!range) return "N/A";
  const parts = range.split("–");
  const height = parseFloat(parts[parts.length - 1]);
  if (height < 0.3) return "Flat";
  if (height < 0.7) return "Knee to thigh";
  if (height < 1.1) return "Waist to chest";
  if (height < 1.5) return "Chest to shoulder";
  if (height < 1.9) return "Head high";
  if (height < 2.5) return "Overhead";
  return "Well overhead";
};
