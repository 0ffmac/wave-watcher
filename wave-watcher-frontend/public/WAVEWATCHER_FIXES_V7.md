# WaveWatcher — Rating Gates & Wave Height Calibration Fix V7
## Files: `src/utils/surfCalculations.js`, `src/data/spotConfig.js`

> **⚠️ CRITICAL RULES BEFORE STARTING:**
> - Touch **only** what is listed below in the exact order given
> - Do NOT modify backend files, `dataTransformers.js`, `ForecastTable.jsx`, or any other file
> - Do NOT rename any existing functions, variables, or constants
> - Do NOT change the signature or return shape of any existing function
> - Do NOT remove any existing logic — only ADD the size threshold guards described below
> - Always check that the app still builds and renders before committing

---

## Problem 1 — The "Micro-Epic" Bug

### What is happening

`calculateConditionRating` in `surfCalculations.js` scores conditions purely on wind
and swell direction quality. When the wind shifts offshore and the swell direction is
optimal, it returns `EPIC` — regardless of whether the waves are 3ft or 10ft.

On Wednesday the 11th the sequence was:
1. Raw swell dropped to ~0.8–1.2m (knee to waist high)
2. Wind shifted to light NE offshore
3. Wind + direction = perfect score → app returned `EPIC`
4. Surfline saw the same offshore wind but capped at `FAIR` because the wave was only 3–4ft

A wave cannot be `EPIC` or `GOOD` if it is not big enough to surf properly.
Ratings must be gated by size.

### The fix — add size threshold guards at the END of `calculateConditionRating`

**Location:** `src/utils/surfCalculations.js` → `calculateConditionRating` function.

**Do NOT touch any of the existing scoring logic above.** Only add the guard block
immediately before the final `return` statement.

**Find the final return at the bottom of `calculateConditionRating`:**
```js
// Current — the function returns the raw calculated rating directly:
return calculatedRating; // or whatever the final return variable is named
```

**Replace that final return with the size-gated version:**
```js
  // ─────────────────────────────────────────────────────────────────────────
  // SIZE THRESHOLD GUARDS
  // A rating cannot exceed what the wave size physically allows.
  // surfHeightMax is the calculated face height in metres (post-scale).
  // These thresholds align with Surfline's LOTUS rating caps:
  //   < 0.5m  → always FLAT regardless of wind / direction quality
  //   < 0.9m  → maximum FAIR  (knee–waist high, fun but not impressive)
  //   < 1.4m  → maximum GOOD  (chest–overhead, solid but not epic)
  //   ≥ 1.4m  → EPIC allowed if wind and direction quality justify it
  // ─────────────────────────────────────────────────────────────────────────
  let finalRating = calculatedRating;

  if (surfHeightMax < 0.5) {
    finalRating = 'FLAT';
  } else if (surfHeightMax < 0.9) {
    if (finalRating === 'EPIC' || finalRating === 'GOOD') {
      finalRating = 'FAIR';
    }
  } else if (surfHeightMax < 1.4) {
    if (finalRating === 'EPIC') {
      finalRating = 'GOOD';
    }
  }
  // ≥ 1.4m: no cap — EPIC is allowed if the rest of the score earned it

  return finalRating;
```

> **What is `surfHeightMax`?**
> It is the calculated maximum face height in metres — the same value used to build
> the `surfRange` string (e.g. the `max` field from `calculateSurfHeight`'s return object).
> `calculateConditionRating` must have this value available at the point where the guard
> runs. How to provide it depends on the current function signature:
>
> **Option A — `surfHeightMax` is already a parameter:**
> Just add the guard block. No signature change needed.
>
> **Option B — `surfHeightMax` is not yet a parameter:**
> Add it as the last parameter with a safe default:
> ```js
> // Add surfHeightMax as final parameter — default 0 is safe, guard will return FLAT
> const calculateConditionRating = (...existingParams, surfHeightMax = 0) => {
> ```
> Then find every call site of `calculateConditionRating` in the codebase and pass
> the surf height max value as the final argument. The call sites are likely in
> `dataTransformers.js` and `ForecastTable.jsx`. Pass the `max` field from the
> `calculateSurfHeight` return object at each call site:
> ```js
> // Example call site update:
> const rating = calculateConditionRating(
>   ...existingArgs,
>   calculatedSurf.max  // ADD as final argument
> );
> ```

---

## Problem 2 — Wave Height Over-Prediction (30–40% too high)

### What is happening

Surfline predicts **3–4ft (0.9–1.2m)** for Ujung Bocur on a 1.2m 12s primary swell.
WaveWatcher predicts **1.3–2.0m** for the exact same input — 30–40% too high.

Open-Meteo provides raw open-ocean swell height. Surfline's LOTUS model applies
coastal bathymetry corrections that reduce swell energy as it wraps onto a point break
like Ujung Bocur. The current `spotScaleFactor: 1.0` does not account for this.

### The fix — lower `spotScaleFactor` for Ujung Bocur in `spotConfig.js`

**Location:** `src/data/spotConfig.js` → the `ujung_bocur` spot object.

**Find the `ujung_bocur` entry and update only `spotScaleFactor`:**

```js
// Current:
ujung_bocur: {
  // ...all existing fields...
  spotScaleFactor: 1.0,   // ← this is the line to change
  // ...all other existing fields unchanged...
},

// Change to:
ujung_bocur: {
  // ...all existing fields...
  spotScaleFactor: 0.75,  // Reduced from 1.0 — corrects 30-40% LOTUS bathymetry gap
  // ...all other existing fields unchanged...
},
```

> **Why 0.75?**
> The combined factor for Ujung Bocur is:
> `finalScaleFactor = inputScaleFactor (0.75) × spotScaleFactor (0.75) = 0.5625`
>
> Wait — that may be too aggressive. Check what `inputScaleFactor` the backend is
> currently sending for `indonesia_sumatra`. If it is already `0.75` (set in V5),
> then the combined factor would be `0.75 × 0.75 = 0.56`, which is likely too low.
>
> **Recommended approach — check before committing:**
> 1. If `inputScaleFactor` from backend for `indonesia_sumatra` is `0.75`:
>    → Set `spotScaleFactor: 0.85` (combined = `0.75 × 0.85 = 0.64`)
> 2. If `inputScaleFactor` from backend is `1.0` (not yet deployed):
>    → Set `spotScaleFactor: 0.75` (combined = `1.0 × 0.75 = 0.75`)
>
> Target: a 1.2m 12s swell at Ujung Bocur should produce ~0.8–1.1m surf face.
> Use the V5 math trace formula to verify before deploying:
> ```
> scaledHeight     = 1.2 × finalScaleFactor
> breakingBaseMax  = 0.55 + (12−6) × 0.045 = 0.82
> amp (reef)       = 1.30
> surfMax          = scaledHeight × 0.82 × 1.0 × 1.30
> ```
> Adjust `spotScaleFactor` until `surfMax` lands in the 0.9–1.2m range.

### Check Mandiri Beach too

If Mandiri Beach is also reading 30–40% too high, apply the same reduction.
Mandiri is a beach break — apply a **slightly less aggressive** reduction than Ujung Bocur:

```js
mandiri_beach: {
  // ...all existing fields...
  spotScaleFactor: 0.80,  // Beach break — slightly more conservative reduction than reef
  // ...all other existing fields unchanged...
},
```

---

## Summary of All Changes

| File | Change | Why |
|---|---|---|
| `surfCalculations.js` | Add size threshold guard block before final `return` in `calculateConditionRating` | Prevents EPIC/GOOD on waist-high waves |
| `surfCalculations.js` | Add `surfHeightMax` parameter if not already present | Required to pass height into the guard |
| `spotConfig.js` | Lower `spotScaleFactor` on `ujung_bocur` to `0.75` or `0.85` | Closes 30–40% over-prediction gap vs Surfline LOTUS |
| `spotConfig.js` | Lower `spotScaleFactor` on `mandiri_beach` to `0.80` (if also over-predicting) | Same reason, slightly less aggressive for beach break |

---

## Expected Results After Fix

**Wednesday the 11th (0.8–1.2m swell, light offshore NE wind):**

| Component | Before fix | After fix |
|---|---|---|
| Surf height | 1.3–2.0m ❌ | 0.8–1.1m ✅ |
| Rating | `EPIC` ❌ | `FAIR` ✅ |
| Matches Surfline | No | Yes (3–4ft, FAIR) |

**Validation targets:**

| Swell input | Expected output |
|---|---|
| `0.4m 8s`, offshore, optimal direction | `FLAT` |
| `0.7m 10s`, offshore, optimal direction | `FAIR` (size cap — not EPIC) |
| `1.1m 12s`, offshore, optimal direction | `GOOD` (size cap — not EPIC) |
| `1.6m 14s`, offshore, optimal direction | `EPIC` ✅ (≥ 1.4m threshold met) |
| `1.6m 14s`, onshore, any size | `POOR` (wind penalty overrides size) |

---

## Checklist

**`surfCalculations.js`:**
- [ ] Located `calculateConditionRating` function
- [ ] Identified the final `return` statement
- [ ] Added `surfHeightMax` parameter (with default `0`) if not already present
- [ ] Added size threshold guard block immediately before the final `return`
- [ ] Confirmed all existing scoring logic above the guard is untouched
- [ ] Updated all `calculateConditionRating` call sites to pass `surfHeightMax` (if parameter was added)

**`spotConfig.js`:**
- [ ] Checked current `inputScaleFactor` from backend for `indonesia_sumatra`
- [ ] Calculated combined `finalScaleFactor` using the math trace formula
- [ ] Updated `spotScaleFactor` on `ujung_bocur` to `0.75` or `0.85` based on check
- [ ] Verified `surfMax` result lands in `0.9–1.2m` range for 1.2m 12s input
- [ ] Updated `spotScaleFactor` on `mandiri_beach` to `0.80` if also over-predicting

---

## What NOT to Touch

- All existing scoring logic inside `calculateConditionRating` above the guard block
- `calculateSurfHeight` — do not modify
- `BREAK_AMPLIFICATION` values in `spotConstants.js` — do not modify
- All other spot entries in `spotConfig.js` — only `ujung_bocur` and optionally `mandiri_beach`
- `dataTransformers.js` — do not modify (except passing `surfHeightMax` to call sites if needed)
- `ForecastTable.jsx` — do not modify (except passing `surfHeightMax` to call sites if needed)
- Backend files — do not modify
- All CSS, icons, and layout — logic changes only
