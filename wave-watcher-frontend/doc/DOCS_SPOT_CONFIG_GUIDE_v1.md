# DOCS_SPOT_CONFIG_GUIDE (v1)

How to add new surf spots, configure them accurately, and validate the output.

---

## Overview

Every spot in WaveWatcher is defined by two entries that must stay in sync:

| File | What goes there | Who reads it |
|---|---|---|
| `src/data/spotConfig.js` | Frontend metadata: coordinates, swell window, wind ranges, scale factors | ForecastTable, Charts, Rating engine |
| `entry.py → spots_db` | Backend metadata: same coordinates + timezone + ideal_swell for the Python rating | Worker / KV cache |

The frontend does all the real calculation. The backend only fetches data and applies
a regional bias correction. When they disagree on wind ranges, the frontend wins for
the displayed rating.

---

## Part 1 — Adding a New Spot

### Step 1 — Add to `src/data/spotConfig.js`

Find the right country and region block, then add a new entry:

```js
your_spot_id: {
  name: "Your Spot Name",
  lat: -5.1234,
  lon: 103.9876,
  location: "Region Name, Country",
  region: "indonesia_sumatra",        // must match entry.py REGION_CONFIG key
  swellWindow: [185, 230],            // see Part 2 for how to set this
  optimalSwellDir: 207,               // midpoint of your sweet spot
  facingDir: 205,                     // physical beach/reef face direction
  breakType: "reef",                  // reef | point | beach | heavy_beach | soft_beach
  spotScaleFactor: 1.0,               // start at 1.0, tune after observing
  swellPlateau: 20,                   // optional, default 20°
  offshore_wind: [60, 150],           // degrees that groom the wave
  onshore_wind: [200, 330],           // degrees that destroy the wave
},
```

### Step 2 — Add to `entry.py → spots_db`

Inside the `spots_db` dict (around line 315), add a matching Python entry:

```python
"your_spot_id": {
    "name": "Your Spot Name",
    "lat": -5.1234,
    "lon": 103.9876,
    "timezone": "Asia/Jakarta",
    "region": "indonesia_sumatra",
    "ideal_swell": [195, 220],        # narrower than swellWindow — exact firing range
    "offshore_wind": [60, 150],
    "onshore_wind": [200, 330],
},
```

### Step 3 — Add to the nearby spots UI (optional)

The spot will appear in the spot selector automatically (from `spotConfig.js`).
No other files need changing for a new spot in an existing region.

### Step 4 — Add region constants if it's a new region

In `src/utils/spotConstants.js`, add entries to both:

```js
export const REGION_PERIOD_CORRECTION = {
  your_new_region: 1.10,   // start conservative, tune up if periods read low vs Surfline
};

export const REGION_ENERGY_MULTIPLIER = {
  your_new_region: 14,     // tune based on observed energy readings
};
```

And in `entry.py`:
```python
REGION_CONFIG = {
    "your_new_region": {"inputScaleFactor": 1.0, "energyMultiplier": 14},
}
```

---

## Part 2 — Configuring a Spot Accurately

### Finding the right values

**`optimalSwellDir`** — the single direction where the spot fires best.
- Stand on the beach and face the ocean. The direction the swell comes FROM is your optimal.
- Example: Ujung Bocur faces SSW (205°) → optimal swell comes from SSW → `optimalSwellDir: 209`

**`swellWindow`** — the full range of usable swell directions.
- Rule of thumb: `[optimalSwellDir − 20°, optimalSwellDir + 20°]` for a reef.
  Wider for beach breaks, narrower for very precise reef setups.
- For bays with a "magic angle" (like Krui): extend toward that angle even if it's far
  from the primary optimal.

**`facingDir`** — which way the beach/reef physically faces.
- Different from `optimalSwellDir` for points and bays.
- Used only for the geometric wind fallback when explicit wind ranges aren't set.

**`swellPlateau`** — how precisely directional the break is:

```
directionalFactor = 1.0 if |swellDir - optimalSwellDir| ≤ swellPlateau
                  = linear falloff otherwise
```

| Break character | swellPlateau | Example |
|---|---|---|
| Extremely precise reef barrel | 12–15° | G-Land, Pipeline |
| Standard reef | 20° (default) | Ujung Bocur |
| Point break | 25° | Jenny's Right |
| Beach break | 30–35° | Mandiri Beach |
| Protected bay, wide swell catch | 35° | La Gravière canyon |

**`spotScaleFactor`** — the most important tuning lever.
Multiplied with the regional `inputScaleFactor` before ALL height calculations.

| Physical situation | spotScaleFactor range |
|---|---|
| Fully exposed, no obstructions | 0.9 – 1.1 |
| Slight headland shadow | 0.7 – 0.9 |
| Bay entrance, partial shadow | 0.5 – 0.7 |
| Deep inside bay, major shadow | 0.3 – 0.5 |
| Canyon / shelf amplification | 1.1 – 1.5 |
| Extreme amplification | up to 2.0 |

---

## Part 3 — The Full Calculation Formula (with example)

### Formula

```
H_face_max = Hs × finalScaleFactor × breakingBaseMax × directionalFactor × amplification × windPenalty × chopDamping
H_face_min = Hs × finalScaleFactor × breakingBaseMin × directionalFactor × amplification × windPenalty × chopDamping

finalScaleFactor = inputScaleFactor × spotScaleFactor
breakingBaseMax  = 0.55 + (period − 6) × 0.045
breakingBaseMin  = 0.40 + (period − 6) × 0.040
```

### Worked Example — Ujung Bocur, typical session

**Inputs from Open-Meteo:**
- Hs = 1.1m
- Period = 10s (raw) → display period = 10 × 1.30 = **13s** (period correction, display only)
- Swell direction = 205° (SSW)
- Wind = E 6kph

**Step 1 — finalScaleFactor:**
```
inputScaleFactor = 0.95   (indonesia_sumatra, from REGION_CONFIG)
spotScaleFactor  = 1.55   (Ujung Bocur — exposed reef, slight canyon)
finalScaleFactor = 0.95 × 1.55 = 1.4725
Hs_scaled = 1.1 × 1.4725 = 1.62m
```

**Step 2 — Breaking factor (using raw period = 10s):**
```
breakingBaseMin = 0.40 + (10 − 6) × 0.040 = 0.40 + 0.16 = 0.56
breakingBaseMax = 0.55 + (10 − 6) × 0.045 = 0.55 + 0.18 = 0.73
```

**Step 3 — Directional factor:**
```
optimalSwellDir = 209°
swellDir        = 205°
diff            = |205 − 209| = 4°
swellPlateau    = 20°
4° < 20° → directionalFactor = 1.0   ✓ (inside plateau)
```

**Step 4 — Amplification (reef = 1.30):**

**Step 5 — Wind penalty:**
```
wind E 6kph, offshore_wind = [80, 160]° → E 90° IS offshore → windFactor = 1.25
windSpeed 6kph < 20kph → heightWindPenalty = 1.0
```

**Step 6 — chopDamping:**
```
period 10s ≥ 7s → chopDamping = 1.0
```

**Step 7 — Final face height:**
```
H_min = 1.62 × 0.56 × 1.0 × 1.30 × 1.0 × 1.0 = 1.18m
H_max = 1.62 × 0.73 × 1.0 × 1.30 × 1.0 × 1.0 = 1.54m
```

**Displayed:** `1.2–1.5m` — chest to overhead ✓

**Energy:**
```
surfMax        = 1.54m
displayPeriod  = 13s (period-corrected)
eMult          = 25 (indonesia_sumatra)
Energy = 1.54² × 13 × 25 = 2.37 × 13 × 25 = 770 kJ
```

---

## Part 4 — Condition Rating Color Reference

The rating engine produces one of six labels. Each maps to a UI color used in
the ForecastTable left accent bar, the surf height number, and the condition badge.

| Label | Score threshold | Size guard | UI color | Hex | Description |
|---|---|---|---|---|---|
| **EPIC** | ≥ 10 | surfMax ≥ 1.6m | Purple | `#8b5cf6` | Exceptional — rare, must earn it |
| **GOOD** | ≥ 7 | surfMax ≥ 0.9m | Emerald | `#10b981` | Solid session, clean conditions |
| **FAIR** | ≥ 4 | surfMax ≥ 0.5m | Amber | `#f59e0b` | Fun but not perfect |
| **POOR** | < 4 | — | Slate | `#64748b` | Surfable but not worth it |
| **FLAT** | any | surfMax < 0.5m | Dark slate | `#475569` | Too small |
| **BLOWN OUT** | any | windSpeed > 45kph or (onshore > 25kph) | Red | `#ef4444` | Unsurfable wind |

### Score breakdown — what contributes

```
Total score = sizeScore + windScore + directionScore
```

**Size score:**
```
Reef / point break:
  1.0–3.0m  → +5    (working range)
  0.7–1.0m  → +3    (small but breaking)
  0.4–0.7m  → +1    (marginal)
  < 0.4m    → −1    (reefs need size)

Beach break:
  0.8–2.2m  → +5
  0.5–0.8m  → +4
  0.3–0.5m  → +2
```

**Wind score:**
```
Offshore + glassy  (< 10kph)   → +5
Offshore + light   (< 18kph)   → +4
Offshore + strong  (≥ 18kph)   → +2
Cross-shore + glassy           → +4
Cross-shore + light            → +2
Cross-shore + strong           → +1
Onshore + glassy               → +2
Onshore + light (< 18kph)      → −1
Onshore + strong (≥ 18kph)     → −3
```

**Direction score:**
```
directionalFactor ≥ 0.9  → +2
directionalFactor 0.7–0.9 → +1
directionalFactor < 0.4   → −2
```

### Example scores

| Scenario | Size | Wind | Dir | Total | Rating |
|---|---|---|---|---|---|
| 1.5m reef, offshore glassy, optimal dir | +5 | +5 | +2 | **12** → EPIC (1.5m < 1.6m → **GOOD**) |
| 1.7m reef, offshore glassy, optimal dir | +5 | +5 | +2 | **12** → **EPIC** ✓ |
| 0.8m reef, offshore glassy, optimal dir | +3 | +5 | +2 | **10** → EPIC (0.8m < 0.9m → **FAIR**) |
| 1.2m beach, cross-shore light, optimal | +5 | +2 | +2 | **9** → EPIC (1.2m < 1.6m → **GOOD**) |
| 1.0m reef, onshore strong, off-axis | +3 | −3 | −2 | **−2** → **POOR** |
| 0.3m any | any | any | any | **FLAT** (size guard) |

---

## Part 5 — Quick Tuning Cheatsheet

### App reads too HIGH at a spot

```
new_spotScaleFactor = current × (target_max ÷ shown_max)
Example: shown 1.4m, target 0.9m → 1.0 × (0.9 ÷ 1.4) = 0.64 → round to 0.65
```

### App reads too LOW at a spot

```
new_spotScaleFactor = current × (target_max ÷ shown_max)
Example: shown 0.4m, target 0.7m → 1.0 × (0.7 ÷ 0.4) = 1.75
```

### EPIC showing on bad days

1. Check `optimalSwellDir` — is it truly the best angle, or too close to the common swell direction?
2. Reduce `swellPlateau` (e.g. 20° → 15°) to penalize off-angle swells more
3. Verify `offshore_wind` ranges — if too wide, too many winds score as offshore

### Spot fires on W swell but model misses it

Shift `optimalSwellDir` toward W and extend `swellWindow` to include W angles.
The spot will then show GOOD/EPIC on W swells even if the common SSW angle remains penalized.

### POOR/FAIR never improves even on known good days

Check that `swellWindow` actually includes the typical swell direction.
If the swell is outside `swellWindow`, `directionalFactor = 0.2` → always POOR.

---

## Part 6 — Spotting Sync Issues

The frontend and backend have their own spot configs. If they drift, the displayed
rating (frontend) will differ from the API `current.rating` (backend). The frontend
always wins for what the user sees.

**Check for sync issues:**
- `offshore_wind` and `onshore_wind` must be identical in both files
- `region` key must exist in both `REGION_CONFIG` (backend) and `spotConstants.js` (frontend)
- Coordinate drift: if `lat`/`lon` differ by more than 0.01°, Open-Meteo returns
  different swell data for each → inconsistent readings

**The backend `current.rating` field is NOT used by the frontend.**
It exists only for debugging. The frontend calculates its own rating from hourly data.
