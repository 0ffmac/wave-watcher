/**
 * spotConstants.js
 *
 * Physical calibration constants for the WaveWatcher surf calculation engine.
 *
 * FORMULA ARCHITECTURE:
 *   H_face = Hs_scaled × breakingFactor(T) × directionalFactor × amplification × windPenalty
 *
 *   Hs_scaled      = Hs × inputScaleFactor  (from backend meta, corrects Open-Meteo bias)
 *   breakingFactor = PRIMARY Hs→face converter, period-dependent (0.55–1.18)
 *   amplification  = SMALL break-type modifier only (1.00–1.30). NOT another Hs→face converter.
 *
 * inputScaleFactor lives in entry.py REGION_CONFIG and is sent via meta.inputScaleFactor.
 * Do not hardcode it here — always read it from the API response.
 *
 * TUNING GUIDE (validate against Surfline over 2–3 weeks):
 *   App reads too HIGH → decrease BREAK_AMPLIFICATION for that breakType
 *                     → or tell backend to decrease inputScaleFactor in REGION_CONFIG
 *   App reads too LOW  → increase BREAK_AMPLIFICATION for that breakType
 *                     → or tell backend to increase inputScaleFactor in REGION_CONFIG
 */

// ---------------------------------------------------------------------------
// BREAK_AMPLIFICATION
// Small break-type modifier applied after the breaking factor.
// breakingFactor() in surfCalculations.js handles the main Hs→face conversion.
// This only adjusts for how efficiently different break morphologies amplify waves.
//
// Calibrated so that at 13s, optimal direction, with inputScaleFactor applied:
//   reef  → face ≈ 0.85–1.1× Hs_scaled
//   point → face ≈ 0.75–1.0× Hs_scaled
//   beach → face ≈ 0.65–0.87× Hs_scaled
// ---------------------------------------------------------------------------
export const BREAK_AMPLIFICATION = {
  // ── Core types ────────────────────────────────────────────────────────────
  reef: 1.3, // Abrupt-bathymetry reef breaks (G-Land, Uluwatu)
  point: 1.15, // Headland point breaks (Jenny's Right, Rincon)
  beach: 1.0, // Standard beach breaks (generic default)

  // ── Regional specialisations ──────────────────────────────────────────────
  heavy_beach: 1.4, // Canyon-focused or high-energy beach breaks (La Gravière,
  // Black's Beach). Canyon "magnifying glass" effect amplifies
  // swell energy above what a standard beach produces.

  soft_beach: 0.85, // Shallow continental-shelf beach breaks (Florida East Coast).
  // Swell energy is lost to bottom friction across the wide shelf
  // before reaching the break — face height lower than open-ocean
  // models predict.
};

// ---------------------------------------------------------------------------
// MIN_SURF_PERIOD
// Minimum swell period (seconds) for a swell to count toward surf height.
// Below this, the swell is local wind chop, not rideable groundswell.
// Open-Meteo frequently reports 3–6s secondary swells (wind chop) that would
// falsely inflate surf height if included in the quadrature sum.
// ---------------------------------------------------------------------------
export const MIN_SURF_PERIOD = 7;

// ---------------------------------------------------------------------------
// SWELL_WINDOW_DEFAULTS
// Last-resort fallback if a spot has no swellWindow in spotConfig.
// This should never be hit if spotConfig is complete.
// ---------------------------------------------------------------------------
export const SWELL_WINDOW_DEFAULTS = [160, 260];
