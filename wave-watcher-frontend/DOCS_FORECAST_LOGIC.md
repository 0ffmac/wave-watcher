# DOCS_FORECAST_LOGIC (v3)

This document is the authoritative reference for WaveWatcher's surf calculation engine.

---

## 1. Core Files

| File | Role |
|---|---|
| `entry.py` (backend) | Fetches Open-Meteo data, applies REGION_CONFIG, passes metadata to frontend |
| `src/utils/surfCalculations.js` | Core formula engine |
| `src/utils/spotConstants.js` | Physical constants (BREAK_AMPLIFICATION, MIN_SURF_PERIOD) |
| `src/utils/dataTransformers.js` | Transforms raw API response into component props |
| `src/data/spotConfig.js` | Per-spot geographical metadata |
| `src/components/ForecastTable.jsx` | Hourly forecast rows |
| `src/components/ForecastChart.jsx` | 48h surf height chart |

---

## 2. Data Source

**Marine API:** `https://marine-api.open-meteo.com/v1/marine`
Returns: `swell_wave_height`, `swell_wave_period`, `swell_wave_direction`,
`secondary_swell_wave_height`, `secondary_swell_wave_period`, `secondary_swell_wave_direction`,
`wave_height`, `sea_surface_temperature`, `sea_level_height_msl`

**Weather API:** `https://api.open-meteo.com/v1/forecast`
Returns: `wind_speed_10m`, `wind_direction_10m`, `wind_gusts_10m`,
`temperature_2m`, `rain`, `cloud_cover`

> ⚠️ **Open-Meteo vs LOTUS/MSW bias:** Open-Meteo's marine model reports significant wave
> height (Hs) that is systematically 25–35% higher than Surfline's LOTUS and surf-forecast's
> MSW models for Indonesian waters. This is corrected via `inputScaleFactor` in `REGION_CONFIG`
> (backend) before the formula runs. Other regions may not need this correction (factor = 1.0).

---

## 3. Spot Metadata Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `region` | `string` | ✅ | Key into backend `REGION_CONFIG` and `spotConstants.js` |
| `swellWindow` | `[min, max]°` | ✅ | `ideal_swell` ± 10°. Must NOT be a wide default. |
| `optimalSwellDir` | `number°` | ✅ | Midpoint of `ideal_swell`. Full credit direction. |
| `facingDir` | `number°` | ✅ | Direction the break faces. Offshore = `facingDir + 180°` |
| `breakType` | `'reef' \| 'point' \| 'beach'` | ✅ | Morphology; drives `BREAK_AMPLIFICATION` |
| `ideal_swell` | `[min, max]°` | ✅ | From spots.json — range where spot fires |
| `offshore_wind` | `[min, max]°` | ✅ | From spots.json |

---

## 4. The Surf Height Formula

```
H_face = (Hs × inputScaleFactor) × breakingFactor(T) × directionalFactor × amplification × windPenalty
```

Step-by-step:

### Step 1 — Scale Raw Input (Open-Meteo Bias Correction)
```
Hs_scaled = Hs × inputScaleFactor
```
`inputScaleFactor` comes from `meta.inputScaleFactor` in the backend API response.
Defined per-region in `entry.py → REGION_CONFIG`. Example values:
- `indonesia_sumatra`: 0.75 (Open-Meteo reads ~33% high vs LOTUS)
- `france_hossegor`: 1.00 (no correction needed)
- `usa_florida`: 1.00

### Step 2 — Breaking Factor (Period / Shoaling)
Converts scaled Hs to approximate face height. The PRIMARY conversion step.
```
breakingBaseMin = 0.40 + (T − 6) × 0.040
breakingBaseMax = 0.55 + (T − 6) × 0.045
```

| Period | Min Factor | Max Factor | Approx Description |
|---|---|---|---|
| 6s | 0.40 | 0.55 | Wind chop, barely breaks |
| 8s | 0.48 | 0.64 | Gutless beachbreak |
| 10s | 0.56 | 0.73 | Average groundswell |
| 12s | 0.64 | 0.82 | Quality groundswell |
| 13s | 0.68 | 0.87 | Solid (Surfline calibration reference) |
| 16s | 0.80 | 1.00 | Long-period groundswell |
| 20s | 0.96 | 1.18 | Deep-ocean maximal shoaling |

### Step 3 — Directional Efficiency
```
swellWindow   = ideal_swell ± 10°
optimalSwellDir = midpoint of ideal_swell
```

| Zone | Condition | Factor |
|---|---|---|
| Optimal | Within 45° of `optimalSwellDir` (inside `swellWindow`) | 1.0 |
| Drop-off | Outside plateau, inside `swellWindow` | Linear falloff, floor 0.3 |
| Shadow | Outside `swellWindow` entirely | 0.2 |

> ⚠️ The `swellWindow` must tightly match `ideal_swell ± 10°`. If it is set too wide
> (e.g. the old default `[140, 280]`), nearly all swells get directionalFactor = 1.0
> and the entire calculation inflates by 3–5×.

### Step 4 — Break Amplification
Small adjustment for break morphology. Applied AFTER breaking factor:

| Break Type | Factor | Examples |
|---|---|---|
| `reef` | 1.30 | Ujung Bocur, Uluwatu, G-Land |
| `point` | 1.15 | Jenny's Right, Impossibles |
| `beach` | 1.00 | Mandiri, La Gravière |

Defined in `spotConstants.js → BREAK_AMPLIFICATION`.

### Step 5 — Wind Penalty (Height)
Wind factor is primarily for condition **rating**. Applied to height only when strongly onshore:
```
heightWindPenalty = (windFactor < 0.9 AND windSpeed > 20kph) ? 0.85 : 1.0
```

---

## 5. Short-Period Swell Filter

Any swell with `period < MIN_SURF_PERIOD (7s)` is excluded from height calculation.
Open-Meteo's `secondary_swell_wave_*` often returns 3–6s wind chop rather than groundswell.
Including it in the quadrature sum would falsely inflate surf height.

The raw swell data is still displayed in the Secondary Swell column for reference.

---

## 6. Dual-Swell Combination

Heights combined via quadrature sum (only if secondary period ≥ MIN_SURF_PERIOD):
```
H_combined = √(H_primary² + H_secondary²)
```

Energy is additive:
```
Energy_total = H²_primary × T_primary × eMult + H²_secondary × T_secondary × eMult
```

`eMult` = `spotMeta.energyMultiplier` or region default.

---

## 7. Condition Rating

Score 0–10 → label:

| Component | Best case | Points |
|---|---|---|
| Height | 0.8m–2.8m | 0–4 |
| Wind | Offshore + light | 0–4 |
| Swell direction | directionalFactor ≥ 0.9 | 0–2 |

Labels: `FLAT` / `BLOWN OUT` / `POOR` / `FAIR` / `GOOD` / `EPIC`

---

## 8. Region Configuration

Defined in TWO places that must stay in sync:
1. **Backend:** `entry.py → REGION_CONFIG` (Python dict)
2. **Frontend:** `spotConstants.js → BREAK_AMPLIFICATION` + per-spot `spotConfig.js`

The backend sends `meta.inputScaleFactor` and `meta.energyMultiplier` in every response.
The frontend reads these from the API response — they are NOT hardcoded in JS.

| Region key | `inputScaleFactor` | `energyMultiplier` | Notes |
|---|---|---|---|
| `indonesia_sumatra` | 0.75 | 14 | Open-Meteo reads ~33% high vs LOTUS here |
| `indonesia_mentawai` | 0.75 | 14 | Same Indian Ocean model bias |
| `indonesia_bali` | 0.80 | 13 | Slightly lower bias, mixed swell environment |
| `france_hossegor` | 1.00 | 11 | North Atlantic, no correction needed |
| `usa_florida` | 1.00 | 9 | Weak Atlantic, no correction needed |
| `usa_california` | 1.00 | 12 | North Pacific, no correction needed |

---

## 9. Validation Targets

After applying all fixes, validate against Surfline and surf-forecast.com:

| Condition | Expected WaveWatcher output |
|---|---|
| Indo, 1.2m 13s, optimal direction, offshore | 0.9–1.4m (chest–head high) |
| Indo, 1.2m 13s, slightly off-axis, onshore | 0.5–0.9m (waist–chest high) ← TODAY'S CASE |
| Indo, 2.5m 16s, optimal direction, offshore | 1.8–2.8m (overhead–double overhead) |
| France, 2.0m 14s, W 290°, offshore | 1.4–2.0m (head–overhead) |
| Florida, 0.8m 8s, ENE, offshore | 0.3–0.5m (knee–thigh high) |

> Tolerance: ±20–30% vs Surfline's mid-range. Exact match is not possible without
> LOTUS-equivalent proprietary bathymetry data, but the ballpark should be correct.

---

## 10. Filtering

- Past timestamps filtered automatically.
- "Today" shows hours from current time only.
- Default table shows 6h, 12h, 18h intervals. Click to expand to all hours.
- Days where all hours have passed are hidden.

---

## 11. How to Add a New Region

1. **Backend:** Add entry to `REGION_CONFIG` in `entry.py` with `inputScaleFactor` and `energyMultiplier`
2. **spots.json:** Add `"region": "your_region_key"` to each spot in the new region
3. **spotConfig.js:** Add `region`, `swellWindow`, `optimalSwellDir`, `facingDir`, `breakType` to each spot
4. **Validate** against Surfline for 2–3 weeks. Adjust `inputScaleFactor` if consistently high/low.
