# DOCS_FORECAST_LOGIC (v4)

This document is the authoritative reference for WaveWatcher's surf calculation engine.
**Last updated:** April 2026 — reflects all changes from the v3 audit session.

---

## Changelog from v3

| Section | Change |
|---|---|
| §4 Step 1 | `indonesia_sumatra` inputScaleFactor corrected: 0.75 → **0.95** |
| §4 Step 3 | Directional plateau: 45° → **20° default**, now per-spot via `swellPlateau` |
| §4 Step 3 | EPIC size guard raised: 1.4m → **1.6m** |
| §4 NEW | Period correction (`REGION_PERIOD_CORRECTION`) added — 1.30× for Indo |
| §5 | Dual-swell combination corrected: NOT quadrature sum — uses **dominant swell** |
| §5 | Energy formula corrected: uses **surfMax** (face height), not raw Hs |
| §7 | Rating score table corrected to match actual code implementation |
| §8 | `indonesia_sumatra` inputScaleFactor corrected to 0.95 in region table |
| §8 | New spotConfig fields documented: `swellPlateau`, `spotScaleFactor` |
| §11 | Backend caching section added (KV TTL + staleness guard) |

---

## 1. Core Files

| File | Role |
|---|---|
| `entry.py` (backend) | Fetches Open-Meteo data, applies REGION_CONFIG, manages KV cache, passes metadata to frontend |
| `src/utils/surfCalculations.js` | Core formula engine — all height and rating calculations |
| `src/utils/spotConstants.js` | Physical constants: `BREAK_AMPLIFICATION`, `MIN_SURF_PERIOD`, `REGION_PERIOD_CORRECTION`, `REGION_ENERGY_MULTIPLIER` |
| `src/utils/dataTransformers.js` | Transforms raw API response into component props |
| `src/data/spotConfig.js` | Per-spot geographical metadata — the primary tuning file |
| `src/components/ForecastTable.jsx` | Hourly forecast rows, energy bar, condition rating |
| `src/components/ForecastChart.jsx` | Today's surf height + wind chart |
| `src/components/TideChart.jsx` | Full-day tide curve with sunrise/sunset bands |

---

## 2. Data Source

**Marine API:** `https://marine-api.open-meteo.com/v1/marine`
Returns: `swell_wave_height`, `swell_wave_period`, `swell_wave_direction`,
`secondary_swell_wave_height`, `secondary_swell_wave_period`, `secondary_swell_wave_direction`,
`wave_height`, `sea_surface_temperature`, `sea_level_height_msl`

**Weather API:** `https://api.open-meteo.com/v1/forecast`
Returns: `wind_speed_10m`, `wind_direction_10m`, `wind_gusts_10m`,
`temperature_2m`, `rain`, `cloud_cover`

Both fetched with `cache: "no-store"` to bypass Cloudflare's upstream CDN cache.

> ⚠️ **Open-Meteo vs LOTUS/MSW bias:** Open-Meteo's marine model reports significant wave
> height (Hs) that is systematically higher than Surfline's LOTUS for Indonesian waters.
> Corrected via `inputScaleFactor` in `REGION_CONFIG` (backend). Other regions use 1.0.

---

## 3. Backend Caching (KV)

```
Request → Worker → KV check → if fresh: return KV → if stale: fetch Open-Meteo → write KV → return
```

- **KV TTL:** 3600s (1 hour) — set via `Object.fromEntries(to_js({"expirationTtl": 3600}))`.
  > ⚠️ Python keyword `expiration_ttl=3600` is silently ignored by the JS bridge — must use the
  > JS options object pattern above.
- **Staleness guard:** Before serving KV data, the Worker checks the last forecast timestamp.
  If fewer than 3 calendar days remain (`days_remaining < 3`), the entry is discarded and
  fresh data is fetched — regardless of TTL. Comparison uses UTC dates only to avoid
  timezone issues with naive local-time timestamps.
- **Cache-Control:** `no-store, no-cache, must-revalidate` on all responses — prevents
  Cloudflare's edge CDN from caching Worker responses and freezing forecast data.

---

## 4. Spot Metadata Schema

All fields live in `src/data/spotConfig.js`. The backend `spots.json` (in `entry.py`)
must stay in sync for `name`, `lat`, `lon`, `timezone`, `region`, `offshore_wind`,
`onshore_wind`, and `ideal_swell`.

| Field | Type | Required | Description |
|---|---|---|---|
| `region` | `string` | ✅ | Key into backend `REGION_CONFIG` and `spotConstants.js` |
| `swellWindow` | `[min, max]°` | ✅ | Range of swell directions the break accepts. Wider for beach breaks. |
| `optimalSwellDir` | `number°` | ✅ | The single best swell direction — full credit. |
| `facingDir` | `number°` | ✅ | Physical beach/reef face direction. Geometric offshore = `facingDir + 180°`. |
| `breakType` | `'reef' \| 'point' \| 'beach' \| 'heavy_beach' \| 'soft_beach'` | ✅ | Drives `BREAK_AMPLIFICATION` |
| `offshore_wind` | `[min, max]°` | ✅ | Wind directions that groom the wave |
| `onshore_wind` | `[min, max]°` | ✅ | Wind directions that destroy the wave |
| `spotScaleFactor` | `number` | ✅ | Per-spot Hs multiplier. Models bay shadowing, exposure, shelf effects. Default 1.0. |
| `swellPlateau` | `number°` | optional | Half-width of full-credit directional zone. Default **20°**. Lower = more precise. |
| `amplification` | `number` | optional | Overrides `BREAK_AMPLIFICATION[breakType]` for this spot only. |
| `lat`, `lon` | `number` | ✅ | Coordinates |
| `location` | `string` | ✅ | Display string e.g. `"South Sumatra, Indonesia"` |

---

## 5. The Surf Height Formula

```
H_face = Hs × spotScaleFactor × inputScaleFactor × breakingFactor(T) × directionalFactor × amplification × windPenalty
```

> Note: `spotScaleFactor` (per-spot, frontend) and `inputScaleFactor` (per-region, backend)
> are multiplied together into `finalScaleFactor` in `dataTransformers.js` before
> `calculateSurfHeight` is called.

### Step 1 — Scale Raw Input

```
Hs_scaled = Hs × finalScaleFactor
finalScaleFactor = inputScaleFactor × spotScaleFactor
```

`inputScaleFactor` corrects Open-Meteo's regional model bias (backend, per-region).
`spotScaleFactor` corrects for local geography: bay shadowing, shelf exposure, canyon amplification.

### Step 2 — Breaking Factor (Period / Shoaling)

Converts scaled Hs to approximate face height. The PRIMARY Hs → face conversion.

```
breakingBaseMin = 0.40 + (T − 6) × 0.040
breakingBaseMax = 0.55 + (T − 6) × 0.045
```

| Period | Min Factor | Max Factor | Description |
|---|---|---|---|
| 6s | 0.40 | 0.55 | Wind chop, barely breaks |
| 8s | 0.48 | 0.64 | Gutless beachbreak |
| 10s | 0.56 | 0.73 | Average groundswell |
| 12s | 0.64 | 0.82 | Quality groundswell |
| 13s | 0.68 | 0.87 | Solid (Surfline calibration reference) |
| 16s | 0.80 | 1.00 | Long-period groundswell |
| 20s | 0.96 | 1.18 | Deep-ocean maximal shoaling |

> ⚠️ Do NOT apply `calculateSurfHeight` with period-corrected values — `spotScaleFactor`
> was calibrated against raw Open-Meteo periods. Period correction is display-only.

### Step 3 — Period Correction (display only)

Open-Meteo systematically underestimates swell period vs Surfline LOTUS.
Applied only for display in the table and chart — NOT fed into `calculateSurfHeight`.

```
displayPeriod = rawPeriod × REGION_PERIOD_CORRECTION[region]
```

| Region | Factor | Derivation |
|---|---|---|
| `indonesia_sumatra` | **1.30** | Surfline 13s vs Open-Meteo 10s → 13/10 |
| `indonesia_bali` | **1.30** | Same Indian Ocean pattern |
| `indonesia_mentawai` | **1.30** | Same |
| `france_hossegor` | 1.15 | Surfline ~13s vs Open-Meteo ~11s |
| `usa_florida` | 1.00 | Short wind swell, model bias minimal |

### Step 4 — Directional Efficiency

```
directionalFactor = f(angle difference between swellDir and optimalSwellDir)
```

| Zone | Condition | Factor |
|---|---|---|
| Full credit | Within `swellPlateau`° of `optimalSwellDir` (inside `swellWindow`) | 1.0 |
| Drop-off | Outside plateau, inside `swellWindow` | Linear falloff, floor 0.4 |
| Soft shoulder | 0–20° outside `swellWindow` | Ramp 0.4 → 0.2 |
| Shadow | >20° outside `swellWindow` | 0.2 (deep shadow) |

**`swellPlateau` default = 20°** (set in `surfCalculations.js`).
Override per-spot in `spotConfig.js` with `swellPlateau: N`.

| Break type | Recommended swellPlateau | Reason |
|---|---|---|
| Precise reef | 15° | Fixed structure, very directional |
| Standard reef | 20° (default) | Most reefs |
| Point break | 25° | Headland wraps swell slightly |
| Beach break | 30–35° | Sandbars shift, wider acceptance |
| Heavy beach (canyon) | 35° | Wide refraction zone |

### Step 5 — Break Amplification

Small morphology adjustment applied after breaking factor.

| Break Type | Factor | Examples |
|---|---|---|
| `reef` | 1.30 | Ujung Bocur, Uluwatu, G-Land |
| `point` | 1.15 | Jenny's Right, Impossibles |
| `beach` | 1.00 | Generic beach |
| `heavy_beach` | 1.40 | Mandiri, La Gravière (canyon effect) |
| `soft_beach` | 0.85 | Florida east coast (wide shelf friction) |

Override for a specific spot: add `amplification: 1.25` to `spotConfig.js`.

### Step 6 — Wind Penalty (Height)

Wind primarily affects the **rating** score (see §7). Applied to height only when strongly onshore:

```
heightWindPenalty = (windFactor < 0.9 AND windSpeed > 20kph) ? 0.85 : 1.0
```

### Step 7 — Short-period Chop Damping

```
chopDamping = (swellPeriod < 7s) ? 0.5 : 1.0
```

Prevents raw wind chop (3–6s secondary swells) from inflating surf height.

---

## 6. Dual-Swell Combination

> ⚠️ **v3 error corrected:** The doc previously stated quadrature sum `√(H1²+H2²)`.
> The actual implementation uses the **dominant swell** approach.

```js
surfMin = Math.max(pSurf.min, sSurf.min)
surfMax = Math.max(pSurf.max, sSurf.max)
```

The larger of the two calculated surf heights is used. This prevents over-reporting
on messy conditions with multiple small trains. Secondary swell is only included
if `rawPeriod ≥ MIN_SURF_PERIOD (7s)`.

---

## 7. Energy Calculation

> ⚠️ **v3 error corrected:** Energy previously used raw Hs, producing absurd values
> (e.g. 650 kJ with 0.6m surf). Now uses **surfMax** (calculated face height).

```
Energy = surfMax² × displayPeriod × REGION_ENERGY_MULTIPLIER[region]
```

`surfMax` already includes directional, wind, and scale penalties — so a bay-shadowed
wave shows proportionally lower energy than an exposed break in the same swell.

| Region | `REGION_ENERGY_MULTIPLIER` | Notes |
|---|---|---|
| `indonesia_sumatra` | 25 | Indo deep groundswell — high power per metre |
| `indonesia_bali` | 25 | Same |
| `indonesia_mentawai` | 25 | Same |
| `france_hossegor` | 20 | North Atlantic |
| `usa_florida` | 14 | Weak Atlantic swell |

The frontend uses `Math.max(energyMultiplier, getEnergyMultiplier(region))` — the
higher of the backend-sent value or the frontend regional default wins.

---

## 8. Condition Rating

Score accumulates across three components. Guards then cap the label by size.

### Scoring

**Size score** (reef/point):
- 1.0–3.0m → +5
- 0.7–1.0m → +3
- 0.4–0.7m → +1
- < 0.4m → −1

**Size score** (beach):
- 0.8–2.2m → +5
- 0.5–0.8m → +4
- 0.3–0.5m → +2

**Wind score:**
- Offshore + glassy (< 10kph) → +5
- Offshore + light (< 18kph) → +4
- Cross-shore + glassy → +4
- Cross-shore + light → +2
- Onshore + glassy → +2
- Onshore + light → −1
- Onshore + strong → −3

**Direction score:**
- directionalFactor ≥ 0.9 → +2
- directionalFactor 0.7–0.9 → +1
- directionalFactor < 0.4 → −2

### Label thresholds
| Score | Label | UI Color |
|---|---|---|
| ≥ 10 | EPIC | Purple `#8b5cf6` |
| ≥ 7 | GOOD | Emerald `#10b981` |
| ≥ 4 | FAIR | Amber `#f59e0b` |
| < 4 | POOR | Slate `#64748b` |

### Size guards (caps on label)
| surfMax | Maximum label allowed |
|---|---|
| < 0.5m | FLAT |
| 0.5–0.9m | FAIR |
| 0.9–1.6m | GOOD |
| ≥ **1.6m** | EPIC allowed |

> ⚠️ Changed from v3: EPIC threshold raised from 1.4m to **1.6m**.
> Chest-shoulder surf (1.3–1.4m) cannot show EPIC regardless of other conditions.

### Overrides (bypass scoring)
- `windSpeed > 45kph` → BLOWN OUT
- `windFactor < 0.8 AND windSpeed > 25kph` → BLOWN OUT

---

## 9. Region Configuration

Two places must stay in sync:
1. **Backend:** `entry.py → REGION_CONFIG`
2. **Frontend:** `spotConstants.js` + `spotConfig.js`

| Region key | `inputScaleFactor` | `energyMultiplier` | Notes |
|---|---|---|---|
| `indonesia_sumatra` | **0.95** | 14 | *(was 0.75 in v3 — corrected)* |
| `indonesia_mentawai` | 0.75 | 14 | Mentawai model bias higher than Sumatra mainland |
| `indonesia_bali` | 0.80 | 13 | Mixed swell, slightly lower bias |
| `france_hossegor` | 1.00 | 11 | North Atlantic, no correction |
| `usa_florida` | 1.00 | 9 | Weak Atlantic |
| `usa_california` | 1.00 | 12 | North Pacific |
| `usa_north_carolina` | 0.95 | 11 | Outer Banks |

The backend sends `meta.inputScaleFactor` and `meta.energyMultiplier` in every response.
The frontend reads these from the API response — they are NOT hardcoded in JS.

---

## 10. Validation Targets

| Condition | Expected WaveWatcher output |
|---|---|
| Indo Sumatra, 1.2m Hs, 13s, optimal dir, offshore | 0.8–1.2m (chest–shoulder high) |
| Indo Sumatra, 1.2m Hs, 13s, 20° off-axis, onshore | 0.4–0.7m (waist–chest) |
| Indo Sumatra, 2.5m Hs, 16s, optimal dir, offshore | 1.6–2.4m (overhead–double) |
| France, 2.0m Hs, 14s, W 290°, offshore | 1.4–2.0m (head–overhead) |
| Florida, 0.8m Hs, 8s, ENE, offshore | 0.3–0.5m (knee–thigh) |
| Krui Left, 2.0m Hs SSW 185°, any wind | 0.2–0.5m (shadow zone) |
| Krui Left, 1.5m Hs W 255°, offshore | 0.6–0.9m (waist–chest) |

Tolerance: ±20–30% vs Surfline mid-range.

---

## 11. Filtering (ForecastTable)

- **Past rows:** Any row with `timestamp < current hour` is hidden.
- **currentIdx:** Computed in `dataTransformers.js` using JS `Intl` API in the spot's
  own timezone — timezone-safe regardless of user browser location.
- **Default view:** 6AM / 12PM / 6PM rows only. Click day header to expand all hours.
- **Full day:** Both charts show 00:00–23:59 of today. A red "NOW" line tracks current hour.

---

## 12. How to Add a New Region

1. **Backend (`entry.py → REGION_CONFIG`):**
   Add `"your_region_key": {"inputScaleFactor": 1.0, "energyMultiplier": 12}`.
   Use `inputScaleFactor: 1.0` as a safe starting point; tune after 2–3 weeks.

2. **Backend (`spots_db` in `entry.py`):**
   Add each spot with `name`, `lat`, `lon`, `timezone`, `region`, `ideal_swell`,
   `offshore_wind`, `onshore_wind`.

3. **Frontend (`src/data/spotConfig.js`):**
   Add spot with all required fields (see §4 schema).

4. **Frontend (`src/utils/spotConstants.js`):**
   Add region key to `REGION_PERIOD_CORRECTION` and `REGION_ENERGY_MULTIPLIER`.
   Start with 1.0 and 14 respectively; tune from real data.

5. **Validate** against Surfline for 2–3 weeks. Use the formula:
   `new_spotScaleFactor = current × (target_max ÷ shown_max)`

---

## 13. Tuning Reference

### App reads too HIGH
- Decrease `spotScaleFactor` in `spotConfig.js`
- Or decrease `inputScaleFactor` in `entry.py → REGION_CONFIG` (affects all spots in region)

### App reads too LOW
- Increase `spotScaleFactor`
- Check `swellPlateau` — if too narrow, directional penalty may be excessive

### EPIC appearing on wrong days
- Raise `swellPlateau` (shrink full-credit zone)
- Check `optimalSwellDir` — is it truly centered on the real sweet spot?

### Rating inconsistent with real conditions
- Check `offshore_wind` and `onshore_wind` ranges in both `entry.py` and `spotConfig.js`
- Both must be identical for the same spot

### Period reads too low vs Surfline
- Increase `REGION_PERIOD_CORRECTION` for that region in `spotConstants.js`
- Do NOT change this for height calculations — display only
