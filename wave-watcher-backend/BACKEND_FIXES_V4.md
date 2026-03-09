# WaveWatcher — Backend Fix Prompt V4
## Files: `entry.py` + `spots.json`

> **⚠️ CRITICAL RULE BEFORE STARTING:**
> Touch **only** what is listed below. Do not refactor, rename, or restructure
> anything not explicitly targeted. Preserve all existing logic and behaviour
> unless a specific replacement is described.

---

## Context — Why These Fixes Are Needed

The frontend calculation engine needs three things from the backend that are currently
missing or broken:

1. **`inputScaleFactor`** — Open-Meteo reports Hs ~25–35% higher than Surfline/MSW for
   Indonesian waters. The frontend must know how much to scale down the raw value before
   running the formula. This correction factor lives in the backend and is sent in the
   API response metadata.

2. **`region`** — Every spot must declare which ocean region it belongs to so the
   frontend can resolve the correct calibration constants.

3. **`wind_gusts` field name** — The backend sends `"gusts"` but the frontend reads
   `"wind_gusts"`. This mismatch means gusts always display as zero or fabricated values.

---

## Fix 1 — Add `REGION_CONFIG` Dictionary (New Code — Top of File)

Add this dictionary **at the top of `entry.py`, after the imports and before
the first helper function**. Do not place it anywhere else.

```python
# ─────────────────────────────────────────────────────────────────────────────
# REGION_CONFIG
#
# Per-region calibration constants sent to the frontend in every API response.
#
# inputScaleFactor:
#   Corrects Open-Meteo's systematic Hs overestimation vs Surfline LOTUS and
#   surf-forecast.com MSW models. Validated by comparing live screenshots.
#     indonesia_sumatra/mentawai : Open-Meteo reads ~33% high → factor 0.75
#     indonesia_bali             : Slightly less bias → factor 0.80
#     other regions              : No correction needed → factor 1.00
#
# energyMultiplier:
#   kJ tuning constant for this region's typical swell character.
#   Indo deep-ocean groundswell = 14. Atlantic/Pacific varies lower.
#
# HOW TO ADD A NEW REGION:
#   1. Add an entry below with a snake_case key
#   2. Add "region": "your_key" to each spot in spots.json
#   3. Tell the frontend team to add the region key to spotConfig.js
#   inputScaleFactor=1.0 is a safe default for any untested region.
# ─────────────────────────────────────────────────────────────────────────────
REGION_CONFIG = {
    "indonesia_sumatra":  {"inputScaleFactor": 0.75, "energyMultiplier": 14},
    "indonesia_mentawai": {"inputScaleFactor": 0.75, "energyMultiplier": 14},
    "indonesia_bali":     {"inputScaleFactor": 0.80, "energyMultiplier": 13},
    "france_hossegor":    {"inputScaleFactor": 1.00, "energyMultiplier": 11},
    "usa_florida":        {"inputScaleFactor": 1.00, "energyMultiplier": 9},
    "usa_california":     {"inputScaleFactor": 1.00, "energyMultiplier": 12},
    # ── Add new regions below this line ──────────────────────────────────────
    # "costa_rica_guanacaste": {"inputScaleFactor": 1.00, "energyMultiplier": 12},
    # "costa_rica_osa":        {"inputScaleFactor": 1.00, "energyMultiplier": 12},
    # "peru_lima":             {"inputScaleFactor": 1.00, "energyMultiplier": 11},
    # "peru_chicama":          {"inputScaleFactor": 1.00, "energyMultiplier": 12},
}
```

---

## Fix 2 — Rename `gusts` → `wind_gusts` (Two Places)

### 2A — In `fetch_stormglass_data()`

**Location:** The `hourly_data` initialization dict and the mapping loop inside
`fetch_stormglass_data`.

**Current code (initialization):**
```python
hourly_data = {
    k: []
    for k in [
        "times", "wave_height", "swell_height", "swell_period", "swell_direction",
        "secondary_swell_height", "secondary_swell_period", "secondary_swell_direction",
        "wind_speed", "wind_direction", "temperature", "rain", "cloud_cover",
        "gusts",   # ← rename this
        "sea_level_height_msl", "sea_surface_temperature",
    ]
}
```

**Replace `"gusts"` with `"wind_gusts"`:**
```python
hourly_data = {
    k: []
    for k in [
        "times", "wave_height", "swell_height", "swell_period", "swell_direction",
        "secondary_swell_height", "secondary_swell_period", "secondary_swell_direction",
        "wind_speed", "wind_direction", "temperature", "rain", "cloud_cover",
        "wind_gusts",   # ← renamed
        "sea_level_height_msl", "sea_surface_temperature",
    ]
}
```

**Current code (mapping loop):**
```python
hourly_data["gusts"].append(gv("gust"))
```

**Replace with:**
```python
hourly_data["wind_gusts"].append(gv("gust"))
```

---

### 2B — In the Open-Meteo `mh` Dictionary

**Location:** The `mh = { ... }` dict in the `source == "open-meteo"` branch inside
the main `fetch` handler.

**Current code:**
```python
mh = {
    "times": times,
    "wave_height": m_data.get("wave_height", []),
    "swell_height": m_data.get("swell_wave_height", []),
    "swell_period": m_data.get("swell_wave_period", []),
    "swell_direction": m_data.get("swell_wave_direction", []),
    "secondary_swell_height": m_data.get("secondary_swell_wave_height", []),
    "secondary_swell_period": m_data.get("secondary_swell_wave_period", []),
    "secondary_swell_direction": m_data.get("secondary_swell_wave_direction", []),
    "wind_speed": w_data.get("wind_speed_10m", []),
    "wind_direction": w_data.get("wind_direction_10m", []),
    "temperature": w_data.get("temperature_2m", []),
    "rain": w_data.get("rain", []),
    "cloud_cover": w_data.get("cloud_cover", []),
    "gusts": w_data.get("wind_gusts_10m", []),   # ← rename this key
    "sea_level_height_msl": m_data.get("sea_level_height_msl", []),
    "sea_surface_temperature": m_data.get("sea_surface_temperature", []),
}
```

**Replace the `"gusts"` line only:**
```python
    "wind_gusts": w_data.get("wind_gusts_10m", []),   # ← renamed
```

---

## Fix 3 — Add Calibration Fields to the API Response `meta` Object

**Location:** The `payload` dictionary inside the main `fetch` handler, specifically
the `"meta"` block.

**Current code:**
```python
payload = {
    "meta": {
        "spot_id": spot_id,
        "spot_name": spot["name"],
        "data_source": "Stormglass" if source == "stormglass" else "Open-Meteo",
    },
    "current": { ... },
    "hourly": mh,
}
```

**Replace the `"meta"` block with:**
```python
spot_region = spot.get("region", "unknown")
region_cfg = REGION_CONFIG.get(
    spot_region,
    {"inputScaleFactor": 1.0, "energyMultiplier": 14}  # safe defaults
)

payload = {
    "meta": {
        "spot_id": spot_id,
        "spot_name": spot["name"],
        "data_source": "Stormglass" if source == "stormglass" else "Open-Meteo",
        "region": spot_region,                                # NEW
        "inputScaleFactor": region_cfg["inputScaleFactor"],  # NEW
        "energyMultiplier": region_cfg["energyMultiplier"],  # NEW
    },
    "current": { ... },  # unchanged
    "hourly": mh,
}
```

> Do not modify anything inside `"current"` or `"hourly"` — only the `"meta"` block
> is changed here.

---

## Fix 4 — Add `region` Field to All Spots in `spots.json`

Add `"region"` to every spot object. Do not change any other field.

**Complete mapping:**

| Spot ID | Add `"region"` value |
|---|---|
| `ujung_bocur` | `"indonesia_sumatra"` |
| `mandiri_beach` | `"indonesia_sumatra"` |
| `krui_left` | `"indonesia_sumatra"` |
| `krui_right` | `"indonesia_sumatra"` |
| `jennys_right` | `"indonesia_sumatra"` |
| `way_jambu` | `"indonesia_sumatra"` |
| `ujung_walur` | `"indonesia_sumatra"` |
| `uluwatu` | `"indonesia_bali"` |
| `ulu_the_peak` | `"indonesia_bali"` |
| `ulu_racetracks` | `"indonesia_bali"` |
| `ulu_outside_corner` | `"indonesia_bali"` |
| `ulu_temples` | `"indonesia_bali"` |
| `ulu_the_bombie` | `"indonesia_bali"` |
| `balangan` | `"indonesia_bali"` |
| `padang_padang` | `"indonesia_bali"` |
| `impossibles` | `"indonesia_bali"` |
| `bingin` | `"indonesia_bali"` |
| `nusa_dua` | `"indonesia_bali"` |
| `melasti` | `"indonesia_bali"` |
| `green_bowl` | `"indonesia_bali"` |
| `pandawa` | `"indonesia_bali"` |
| `gunung_payung` | `"indonesia_bali"` |
| `fr_la_graviere` | `"france_hossegor"` |
| `fr_la_nord` | `"france_hossegor"` |
| `fr_la_sud` | `"france_hossegor"` |
| `fr_la_piste` | `"france_hossegor"` |
| `fr_santocha` | `"france_hossegor"` |
| `us_jax_pier` | `"usa_florida"` |
| `us_st_augustine` | `"usa_florida"` |
| `us_new_smyrna` | `"usa_florida"` |
| `us_cocoa_beach` | `"usa_florida"` |
| `us_sebastian_inlet` | `"usa_florida"` |
| `us_reef_road` | `"usa_florida"` |
| `us_venice_jetty` | `"usa_florida"` |
| `us_pensacola_pier` | `"usa_florida"` |
| `us_pcb_pier` | `"usa_florida"` |

**Example — add only the `"region"` line, touch nothing else:**
```json
"ujung_bocur": {
    "name": "Ujung Bocur",
    "lat": -5.3048,
    "lon": 103.9919,
    "timezone": "Asia/Jakarta",
    "region": "indonesia_sumatra",
    "ideal_swell": [190, 220],
    "offshore_wind": [80, 160],
    "onshore_wind": [200, 20]
}
```

---

## Fix 5 — Add `region` to the Hardcoded Fallback Dict in `entry.py`

**Location:** The hardcoded `spots_db` dictionary inside the main `fetch` handler
(the fallback used when `SURF_CACHE.get("SPOTS_CONFIG")` returns nothing).

Apply the **exact same `"region"` values** from Fix 4 to every spot in `spots_db`.
Only add `"region"` — do not touch any other key in any spot.

**Example:**
```python
"ujung_bocur": {
    "name": "Ujung Bocur",
    "lat": -5.3048,
    "lon": 103.9919,
    "timezone": "Asia/Jakarta",
    "region": "indonesia_sumatra",   # ADD
    "ideal_swell": [190, 220],
    "offshore_wind": [80, 160],
    "onshore_wind": [200, 20],
},
```

---

## Verification

After deploying, test by calling with `bypass_cache=true`:

```
/api/forecast?spot=ujung_bocur&bypass_cache=true
```

The response `meta` object must contain:
```json
{
  "meta": {
    "spot_id": "ujung_bocur",
    "spot_name": "Ujung Bocur",
    "data_source": "Open-Meteo",
    "region": "indonesia_sumatra",
    "inputScaleFactor": 0.75,
    "energyMultiplier": 14
  }
}
```

The hourly data must contain `"wind_gusts"` (not `"gusts"`):
```json
{
  "hourly": {
    "wind_gusts": [14.2, 16.1, ...]
  }
}
```

If both are correct, the backend is done. Hand off to the frontend team.

---

## Checklist

- [ ] Add `REGION_CONFIG` dictionary at top of `entry.py` (after imports)
- [ ] Rename `"gusts"` → `"wind_gusts"` in `fetch_stormglass_data` init dict
- [ ] Rename `"gusts"` → `"wind_gusts"` in `fetch_stormglass_data` mapping loop
- [ ] Rename `"gusts"` → `"wind_gusts"` in Open-Meteo `mh` dict
- [ ] Add `spot_region` + `region_cfg` lookup before the `payload` dict
- [ ] Add `region`, `inputScaleFactor`, `energyMultiplier` to `payload["meta"]`
- [ ] Add `"region"` field to all spots in `spots.json`
- [ ] Add `"region"` field to all spots in the hardcoded `spots_db` fallback in `entry.py`
- [ ] Deploy and verify response with `bypass_cache=true`

## What NOT to Touch

- `calculate_spot_rating()` — do not modify
- `get_wind_texture()` — do not modify
- `get_current_hour_index()` — do not modify
- `safe_val()` — do not modify
- `is_angle_in_range()` — do not modify
- All `"current"` block fields in the payload — do not modify
- All `"hourly"` array fields (except the `gusts` rename) — do not modify
- Cache TTL values — do not modify
- CORS headers — do not modify
