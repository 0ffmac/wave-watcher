export const calculateSurfHeight = (
  swellHeight,
  swellPeriod,
  swellDir,
  windDir,
  windSpeed,
  spotMeta,
) => {
  // If no spot metadata or missing critical calculation params, return a basic estimation
  if (
    !spotMeta ||
    !spotMeta.swellWindow ||
    spotMeta.optimalSwellDir === undefined ||
    spotMeta.facingDir === undefined
  ) {
    const breakingBaseMin = 0.5 + (swellPeriod - 6) * 0.045;
    const breakingBaseMax = 0.8 + (swellPeriod - 6) * 0.055;
    return {
      min: Math.max(0.1, swellHeight * breakingBaseMin),
      max: Math.max(0.2, swellHeight * breakingBaseMax),
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
    // Increased plateau from 30 to 45 degrees for better wrap coverage
    if (finalDiff <= 45) {
      directionalFactor = 1.0;
    } else {
      const halfWindow = (maxWin - minWin) / 2;
      // Softer falloff (using 1.3 multiplier instead of 1.1)
      directionalFactor = Math.max(0.4, 1 - finalDiff / (halfWindow * 1.3));
    }
  } else {
    directionalFactor = 0.3; // Increased wrap baseline from 0.2
  }

  // 2. Breaking Factor (Period dependent - Shoaling)
  // Slightly boosted growth for mid-to-long periods
  const breakingBaseMin = 0.5 + (swellPeriod - 6) * 0.045;
  const breakingBaseMax = 0.8 + (swellPeriod - 6) * 0.055;

  // 3. Wind Factor (The "Epic" vs "Blown Out" modifier)
  let windFactor = 1.0;
  if (windSpeed > 4) {
    const wDir = normalize(windDir);
    const beachFacing = normalize(spotMeta.facingDir);

    // Calculate angle between wind and "straight offshore" (which is beachFacing + 180)
    const offshoreDir = normalize(beachFacing + 180);
    const windFromOffshoreDiff = Math.abs(wDir - offshoreDir);
    const diff =
      windFromOffshoreDiff > 180
        ? 360 - windFromOffshoreDiff
        : windFromOffshoreDiff;

    if (diff < 45) {
      windFactor = 1.15; // Increased from 1.1
    } else if (diff > 135) {
      windFactor = 0.8; // More penalty for onshore (was 0.85)
    } else {
      windFactor = 0.9; // More penalty for side-shore (was 0.95)
    }
  }

  return {
    min: Math.max(
      0.1,
      swellHeight * breakingBaseMin * directionalFactor * windFactor,
    ),
    max: Math.max(
      0.2,
      swellHeight * breakingBaseMax * directionalFactor * windFactor,
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
) => {
  if (maxSurf < 0.2) return "FLAT";
  if (windSpeed > 45) return "BLOWN OUT"; // Increased from 35
  if (windFactor < 0.8 && windSpeed > 25) return "BLOWN OUT";

  // Strict Scoring (0-10)
  let score = 0;

  // 1. Height Score (0-4)
  if (maxSurf >= 0.8 && maxSurf <= 2.8) score += 4; // Adjusted range
  else if (maxSurf >= 0.5) score += 3; // Waist to chest high
  else if (maxSurf >= 0.3) score += 1; // Knee high
  else score += 0;

  // 2. Wind Score (0-4)
  if (windFactor >= 1.05) {
    // Offshore
    if (windSpeed < 15) score += 4; // Light offshore (Groomed) - increased from 12
    else if (windSpeed < 32)
      score += 3; // Moderate offshore - increased from 22, score from 2
    else score += 1; // Strong offshore - still manageable, score from 0
  } else if (windFactor >= 0.9) {
    // Glassy/Light Side
    if (windSpeed < 8) score += 3; // Glassy
    else score += 1; // Textured
  } else {
    // Onshore
    score -= 1;
  }

  // 3. Swell Quality (0-2)
  if (directionalFactor >= 0.9) score += 2;
  else if (directionalFactor >= 0.7) score += 1;

  if (score >= 9) return "EPIC";
  if (score >= 7) return "GOOD";
  if (score >= 4) return "FAIR";
  return "POOR";
};

export const calculateEnergy = (height, period) => {
  // KJ Match: H^2 * T * 14 (Derived from Surfline's 586kJ at 2.2m 11s)
  return Math.round(height * height * period * 14);
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
  // Extract the max height from the range (e.g., "0.9–1.4m" -> 1.4)
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
