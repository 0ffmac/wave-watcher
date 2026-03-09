import json
import traceback
from datetime import datetime
from js import fetch, URL, Object, Date, Intl
from pyodide.ffi import to_js
from workers import WorkerEntrypoint, Response

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
    "indonesia_sumatra": {"inputScaleFactor": 0.75, "energyMultiplier": 14},
    "indonesia_mentawai": {"inputScaleFactor": 0.75, "energyMultiplier": 14},
    "indonesia_bali": {"inputScaleFactor": 0.80, "energyMultiplier": 13},
    "france_hossegor": {"inputScaleFactor": 1.00, "energyMultiplier": 11},
    "usa_florida": {"inputScaleFactor": 1.00, "energyMultiplier": 9},
    "usa_california": {"inputScaleFactor": 1.00, "energyMultiplier": 12},
    # ── North Carolina / Outer Banks ──────────────────────────────────────────
    "usa_north_carolina": {"inputScaleFactor": 0.95, "energyMultiplier": 11},
    # ── Add new regions below this line ──────────────────────────────────────
    # "costa_rica_guanacaste": {"inputScaleFactor": 1.00, "energyMultiplier": 12},
    # "costa_rica_osa":        {"inputScaleFactor": 1.00, "energyMultiplier": 12},
    # "peru_lima":             {"inputScaleFactor": 1.00, "energyMultiplier": 11},
    # "peru_chicama":          {"inputScaleFactor": 1.00, "energyMultiplier": 12},
}

# ======================
# Helpers
# ======================


def get_cardinal(deg):
    if deg is None:
        return "N/A"
    dirs = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ]
    ix = int((deg + 11.25) / 22.5)
    return dirs[ix % 16]


def is_angle_in_range(angle, range_array):
    if not range_array or len(range_array) != 2:
        return False
    start, end = range_array
    if start <= end:
        return start <= angle <= end
    return angle >= start or angle <= end


def calculate_spot_rating(
    spot_config, swell_height, swell_dir, wind_dir, wind_speed, rain, cloud_cover=0
):
    if None in [swell_height, swell_dir, wind_dir, wind_speed]:
        return "N/A"

    # 1. Weather Safety First
    if rain > 2.0:  # Increased slightly to allow for light drizzle
        return "🌧️ RAINY"

    # 2. Determine Wind Texture First
    is_offshore = is_angle_in_range(wind_dir, spot_config.get("offshore_wind", []))
    is_onshore = is_angle_in_range(wind_dir, spot_config.get("onshore_wind", []))

    # 3. Dynamic "Blown Out" Thresholds
    # Offshore wind holds waves up, so we allow higher speeds.
    wind_limit = 32 if is_offshore else 22

    if wind_speed > wind_limit:
        return "🌬️ BLOWN OUT"

    # 4. Basic "Flat" check
    if swell_height < 0.5:
        return "💨 FLAT"

    # 5. Scoring Logic
    score = 0

    # Swell direction is king
    if is_angle_in_range(swell_dir, spot_config.get("ideal_swell", [])):
        score += 50

    # Wind quality
    if is_offshore:
        # Give full points for offshore unless it's getting too gusty
        score += 50 if wind_speed < 20 else 30
    elif is_onshore:
        # Onshore is usually poor if it's more than a light breeze
        if wind_speed > 12:
            return "❌ POOR"
        score += 10  # Light onshore is just 'Fair'
    else:
        # Cross-shore
        score += 20 if wind_speed < 15 else 0

    # 6. Final Rating Return
    if score >= 100:
        return "🔥 EPIC"
    if score >= 70:
        return "✅ GOOD"
    if score >= 40:
        return "⏳ FAIR"
    return "❌ POOR"


def get_wind_texture(wind_dir, spot_config):
    if is_angle_in_range(wind_dir, spot_config.get("offshore_wind", [])):
        return "Offshore"
    if is_angle_in_range(wind_dir, spot_config.get("onshore_wind", [])):
        return "Onshore"
    return "Cross-shore"


def get_current_hour_index(times, timezone="UTC"):
    try:
        # Use JS Intl to get current time in the spot's timezone
        options = Object.fromEntries(
            to_js(
                {
                    "timeZone": timezone,
                    "year": "numeric",
                    "month": "2-digit",
                    "day": "2-digit",
                    "hour": "2-digit",
                    "hour12": False,
                }
            )
        )
        formatter = Intl.DateTimeFormat.new("en-CA", options)
        parts_list = formatter.formatToParts(Date.new())
        parts = {}
        for p in parts_list:
            parts[p.type] = p.value

        # Construction: YYYY-MM-DDTHH:00
        # Some environments return hour 24 instead of 00
        hour = parts.get("hour", "00")
        if hour == "24":
            hour = "00"

        now_str = f"{parts['year']}-{parts['month']}-{parts['day']}T{hour}:00"
        if now_str in times:
            return times.index(now_str)
    except Exception as e:
        print(f"Timezone detection error: {e}")

    # Fallback to UTC
    now_utc = datetime.now().strftime("%Y-%m-%dT%H:00")
    return times.index(now_utc) if now_utc in times else 0


def safe_val(array, idx, default=0.0):
    try:
        val = array[idx]
        return val if val is not None else default
    except (IndexError, TypeError, KeyError):
        return default


async def fetch_stormglass_data(spot, api_key):
    params = [
        "swellHeight",
        "swellPeriod",
        "swellDirection",
        "waveHeight",
        "windDirection",
        "windSpeed",
        "airTemperature",
        "waterTemperature",
        "windWaveHeight",
        "windWavePeriod",
        "gust",
        "seaLevel",
        "rain",
        "cloudCover",
    ]
    sg_url = f"https://api.stormglass.io/v2/weather/point?lat={spot['lat']}&lng={spot['lon']}&params={','.join(params)}"

    # Fix: Convert Python Dict to JS Headers Object
    js_headers = Object.fromEntries(to_js({"Authorization": api_key}))

    sg_res = await fetch(sg_url, headers=js_headers)
    if not sg_res.ok:
        err_text = await sg_res.text()
        raise Exception(f"Stormglass API error ({sg_res.status}): {err_text}")

    sg_data = json.loads(await sg_res.text())

    hourly_data = {
        k: []
        for k in [
            "times",
            "wave_height",
            "swell_height",
            "swell_period",
            "swell_direction",
            "secondary_swell_height",
            "secondary_swell_period",
            "secondary_swell_direction",
            "wind_speed",
            "wind_direction",
            "temperature",
            "rain",
            "cloud_cover",
            "wind_gusts",
            "sea_level_height_msl",
            "sea_surface_temperature",
        ]
    }

    for hour in sg_data.get("hours", []):
        hourly_data["times"].append(hour.get("time"))

        def gv(p):
            val = hour.get(p, {})
            return val.get("sg", 0.0) if isinstance(val, dict) else 0.0

        hourly_data["wave_height"].append(gv("waveHeight"))
        hourly_data["swell_height"].append(gv("swellHeight"))
        hourly_data["swell_period"].append(gv("swellPeriod"))
        hourly_data["swell_direction"].append(gv("swellDirection"))
        hourly_data["secondary_swell_height"].append(gv("windWaveHeight"))
        hourly_data["secondary_swell_period"].append(gv("windWavePeriod"))
        hourly_data["secondary_swell_direction"].append(gv("windDirection"))
        hourly_data["wind_speed"].append(gv("windSpeed"))
        hourly_data["wind_direction"].append(gv("windDirection"))
        hourly_data["temperature"].append(gv("airTemperature"))
        hourly_data["rain"].append(gv("rain"))
        hourly_data["cloud_cover"].append(gv("cloudCover"))
        hourly_data["wind_gusts"].append(gv("gust"))
        hourly_data["sea_level_height_msl"].append(gv("seaLevel"))
        hourly_data["sea_surface_temperature"].append(gv("waterTemperature"))
    return hourly_data


# ======================
# MAIN HANDLER
# ======================


class Default(WorkerPoint := WorkerEntrypoint):
    async def fetch(self, request):
        cors_headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=600",
        }
        if request.method == "OPTIONS":
            return Response("", headers=cors_headers)

        try:
            req_url = URL.new(request.url)
            if not req_url.pathname.endswith("/forecast"):
                return Response(
                    json.dumps({"error": "Use /forecast"}),
                    status=404,
                    headers=cors_headers,
                )

            # 1. Spot Config
            spots_json = await self.env.SURF_CACHE.get("SPOTS_CONFIG")
            if spots_json:
                spots_db = json.loads(spots_json)
            else:
                spots_db = {
                    "ujung_bocur": {
                        "name": "Ujung Bocur",
                        "lat": -5.3048,
                        "lon": 103.9919,
                        "timezone": "Asia/Jakarta",
                        "region": "indonesia_sumatra",
                        "ideal_swell": [190, 220],
                        "offshore_wind": [80, 160],
                        "onshore_wind": [200, 20],
                    },
                    "mandiri_beach": {
                        "name": "Mandiri Beach",
                        "lat": -5.2472,
                        "lon": 103.9234,
                        "timezone": "Asia/Jakarta",
                        "region": "indonesia_sumatra",
                        "ideal_swell": [200, 230],
                        "offshore_wind": [40, 120],
                        "onshore_wind": [180, 30],
                    },
                    "krui_left": {
                        "name": "Krui Left",
                        "lat": -5.1928,
                        "lon": 103.929,
                        "timezone": "Asia/Jakarta",
                        "region": "indonesia_sumatra",
                        "ideal_swell": [180, 210],
                        "offshore_wind": [50, 130],
                        "onshore_wind": [190, 40],
                    },
                    "jennys_right": {
                        "name": "Jenny's Right",
                        "lat": -5.0383,
                        "lon": 103.7666,
                        "timezone": "Asia/Jakarta",
                        "region": "indonesia_sumatra",
                        "ideal_swell": [180, 225],
                        "offshore_wind": [270, 360],
                        "onshore_wind": [90, 180],
                    },
                    "krui_right": {
                        "name": "Krui Right",
                        "lat": -5.178,
                        "lon": 103.888,
                        "timezone": "Asia/Jakarta",
                        "region": "indonesia_sumatra",
                        "ideal_swell": [200, 240],
                        "offshore_wind": [60, 150],
                        "onshore_wind": [240, 330],
                    },
                    "way_jambu": {
                        "name": "Way Jambu",
                        "lat": -5.3491,
                        "lon": 104.0302,
                        "timezone": "Asia/Jakarta",
                        "region": "indonesia_sumatra",
                        "ideal_swell": [190, 230],
                        "offshore_wind": [30, 120],
                        "onshore_wind": [210, 300],
                    },
                    "ujung_walur": {
                        "name": "Ujung Walur",
                        "lat": -5.216,
                        "lon": 103.908,
                        "timezone": "Asia/Jakarta",
                        "region": "indonesia_sumatra",
                        "ideal_swell": [190, 230],
                        "offshore_wind": [50, 140],
                        "onshore_wind": [230, 320],
                    },
                    "uluwatu": {
                        "name": "Uluwatu",
                        "lat": -8.8149,
                        "lon": 115.0884,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [180, 225],
                        "offshore_wind": [90, 150],
                        "onshore_wind": [270, 330],
                    },
                    "ulu_the_peak": {
                        "name": "Uluwatu: The Peak",
                        "lat": -8.8149,
                        "lon": 115.0884,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [180, 225],
                        "offshore_wind": [90, 150],
                        "onshore_wind": [270, 330],
                    },
                    "ulu_racetracks": {
                        "name": "Uluwatu: Racetracks",
                        "lat": -8.8155,
                        "lon": 115.0875,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [190, 230],
                        "offshore_wind": [90, 150],
                        "onshore_wind": [270, 330],
                    },
                    "ulu_outside_corner": {
                        "name": "Uluwatu: Outside Corner",
                        "lat": -8.814,
                        "lon": 115.085,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [180, 225],
                        "offshore_wind": [90, 150],
                        "onshore_wind": [270, 330],
                    },
                    "ulu_temples": {
                        "name": "Uluwatu: Temples",
                        "lat": -8.82,
                        "lon": 115.089,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [180, 220],
                        "offshore_wind": [90, 150],
                        "onshore_wind": [270, 330],
                    },
                    "ulu_the_bombie": {
                        "name": "Uluwatu: The Bombie",
                        "lat": -8.812,
                        "lon": 115.082,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [180, 225],
                        "offshore_wind": [90, 150],
                        "onshore_wind": [270, 330],
                    },
                    "balangan": {
                        "name": "Balangan",
                        "lat": -8.792,
                        "lon": 115.1235,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [190, 240],
                        "offshore_wind": [100, 160],
                        "onshore_wind": [280, 340],
                    },
                    "padang_padang": {
                        "name": "Padang Padang",
                        "lat": -8.8112,
                        "lon": 115.1037,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [190, 220],
                        "offshore_wind": [90, 150],
                        "onshore_wind": [270, 330],
                    },
                    "impossibles": {
                        "name": "Impossibles",
                        "lat": -8.8085,
                        "lon": 115.109,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [190, 230],
                        "offshore_wind": [90, 150],
                        "onshore_wind": [270, 330],
                    },
                    "bingin": {
                        "name": "Bingin",
                        "lat": -8.8055,
                        "lon": 115.113,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [190, 230],
                        "offshore_wind": [90, 150],
                        "onshore_wind": [270, 330],
                    },
                    "nusa_dua": {
                        "name": "Nusa Dua",
                        "lat": -8.808,
                        "lon": 115.235,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [160, 210],
                        "offshore_wind": [240, 320],
                        "onshore_wind": [60, 140],
                    },
                    "melasti": {
                        "name": "Melasti Beach",
                        "lat": -8.8481,
                        "lon": 115.1592,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [180, 210],
                        "offshore_wind": [340, 40],
                        "onshore_wind": [160, 220],
                    },
                    "green_bowl": {
                        "name": "Green Bowl",
                        "lat": -8.8488,
                        "lon": 115.1711,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [170, 200],
                        "offshore_wind": [330, 30],
                        "onshore_wind": [150, 210],
                    },
                    "pandawa": {
                        "name": "Pandawa Beach",
                        "lat": -8.8453,
                        "lon": 115.1864,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [160, 200],
                        "offshore_wind": [330, 30],
                        "onshore_wind": [150, 210],
                    },
                    "gunung_payung": {
                        "name": "Gunung Payung",
                        "lat": -8.8425,
                        "lon": 115.2015,
                        "timezone": "Asia/Makassar",
                        "region": "indonesia_bali",
                        "ideal_swell": [170, 210],
                        "offshore_wind": [330, 30],
                        "onshore_wind": [150, 210],
                    },
                    "fr_la_graviere": {
                        "name": "La Gravière",
                        "group": "Hossegor, France",
                        "lat": 43.6655,
                        "lon": -1.4442,
                        "timezone": "Europe/Paris",
                        "region": "france_hossegor",
                        "ideal_swell": [270, 310],
                        "offshore_wind": [45, 135],
                        "desc": "World-class heavy barrels. Expert only. Best on incoming mid-tide.",
                    },
                    "fr_la_nord": {
                        "name": "La Nord",
                        "group": "Hossegor, France",
                        "lat": 43.667,
                        "lon": -1.446,
                        "timezone": "Europe/Paris",
                        "region": "france_hossegor",
                        "ideal_swell": [280, 320],
                        "offshore_wind": [45, 135],
                        "desc": "Big wave spot. Handles 15ft+. Needs a big board and serious experience.",
                    },
                    "fr_la_sud": {
                        "name": "La Sud",
                        "group": "Hossegor, France",
                        "lat": 43.66,
                        "lon": -1.443,
                        "timezone": "Europe/Paris",
                        "region": "france_hossegor",
                        "ideal_swell": [270, 300],
                        "offshore_wind": [45, 135],
                        "desc": "Beginner friendly. Sheltered from big NW swells by the jetty.",
                    },
                    "us_jax_pier": {
                        "name": "Jax Beach Pier",
                        "group": "North Florida",
                        "lat": 30.2915,
                        "lon": -81.3885,
                        "timezone": "America/New_York",
                        "region": "usa_florida",
                        "ideal_swell": [45, 135],
                        "offshore_wind": [240, 300],
                        "desc": "Most consistent in North FL. Best on NE wind swells or Hurricane swells.",
                    },
                    "us_st_augustine": {
                        "name": "St. Augustine Beach",
                        "group": "North Florida",
                        "lat": 29.8575,
                        "lon": -81.2655,
                        "timezone": "America/New_York",
                        "region": "usa_florida",
                        "ideal_swell": [70, 120],
                        "offshore_wind": [250, 290],
                        "desc": "Fun, shifty peaks. Works best on a mid-tide.",
                    },
                }
            spot_id = req_url.searchParams.get("spot") or "ujung_bocur"
            spot = spots_db.get(spot_id)
            if not spot:
                return Response(
                    json.dumps({"error": "Spot not found"}),
                    status=404,
                    headers=cors_headers,
                )

            # 2. Cache Check
            cache_key = f"forecast_{spot_id}"
            source = req_url.searchParams.get("source") or "open-meteo"
            # Append source to cache key to avoid mixing data
            cache_key_with_source = f"{cache_key}_{source}"

            if req_url.searchParams.get("bypass_cache") != "true":
                cached = await self.env.SURF_CACHE.get(cache_key_with_source)
                if cached:
                    return Response(cached, headers=cors_headers)

            # 3. Data Fetching Logic
            if source == "stormglass":
                mh = await fetch_stormglass_data(spot, self.env.STORMGLASS_API_KEY)
                times = mh["times"]
                idx = get_current_hour_index(times, spot.get("timezone", "UTC"))
                c_wind_dir = safe_val(mh["wind_direction"], idx)
                c_wind_speed = safe_val(mh["wind_speed"], idx)
                c_rain = safe_val(mh["rain"], idx)
                c_cloud_cover = safe_val(mh["cloud_cover"], idx)
            else:
                m_res = await fetch(
                    f"https://marine-api.open-meteo.com/v1/marine?latitude={spot['lat']}&longitude={spot['lon']}&hourly=swell_wave_height,swell_wave_period,swell_wave_direction,secondary_swell_wave_height,secondary_swell_wave_period,secondary_swell_wave_direction,wave_height,sea_surface_temperature,sea_level_height_msl&timezone={spot['timezone']}&forecast_days=8"
                )
                w_res = await fetch(
                    f"https://api.open-meteo.com/v1/forecast?latitude={spot['lat']}&longitude={spot['lon']}&hourly=wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_2m,rain,cloud_cover&timezone={spot['timezone']}&forecast_days=8"
                )

                if not m_res.ok or not w_res.ok:
                    raise Exception(
                        f"Open-Meteo API error: M={m_res.status} W={w_res.status}"
                    )

                m_data = json.loads(await m_res.text()).get("hourly", {})
                w_data = json.loads(await w_res.text()).get("hourly", {})

                times = m_data.get("time", [])
                idx = get_current_hour_index(times, spot.get("timezone", "UTC"))

                # Normalize Open-Meteo data to match Stormglass-like structure for frontend
                mh = {
                    "times": times,
                    "wave_height": m_data.get("wave_height", []),
                    "swell_height": m_data.get("swell_wave_height", []),
                    "swell_period": m_data.get("swell_wave_period", []),
                    "swell_direction": m_data.get("swell_wave_direction", []),
                    "secondary_swell_height": m_data.get(
                        "secondary_swell_wave_height", []
                    ),
                    "secondary_swell_period": m_data.get(
                        "secondary_swell_wave_period", []
                    ),
                    "secondary_swell_direction": m_data.get(
                        "secondary_swell_wave_direction", []
                    ),
                    "wind_speed": w_data.get("wind_speed_10m", []),
                    "wind_direction": w_data.get("wind_direction_10m", []),
                    "temperature": w_data.get("temperature_2m", []),
                    "rain": w_data.get("rain", []),
                    "cloud_cover": w_data.get("cloud_cover", []),
                    "wind_gusts": w_data.get("wind_gusts_10m", []),
                    "sea_level_height_msl": m_data.get("sea_level_height_msl", []),
                    "sea_surface_temperature": m_data.get(
                        "sea_surface_temperature", []
                    ),
                }
                c_wind_dir = safe_val(mh["wind_direction"], idx)
                c_wind_speed = safe_val(mh["wind_speed"], idx)
                c_rain = safe_val(mh["rain"], idx)
                c_cloud_cover = safe_val(mh["cloud_cover"], idx)

            # 4. Calculation & Normalization
            s_height = safe_val(mh["swell_height"], idx)
            s_dir = safe_val(mh["swell_direction"], idx)

            c_surf_min = round(s_height * 0.5, 1)
            c_surf_max = round(s_height * 0.7, 1)

            current_rating = calculate_spot_rating(
                spot, s_height, s_dir, c_wind_dir, c_wind_speed, c_rain, c_cloud_cover
            )

            # 5. Build Final Response
            spot_region = spot.get("region", "unknown")
            region_cfg = REGION_CONFIG.get(
                spot_region,
                {"inputScaleFactor": 1.0, "energyMultiplier": 14},  # safe defaults
            )

            payload = {
                "meta": {
                    "spot_id": spot_id,
                    "spot_name": spot["name"],
                    "data_source": "Stormglass"
                    if source == "stormglass"
                    else "Open-Meteo",
                    "region": spot_region,
                    "inputScaleFactor": region_cfg["inputScaleFactor"],
                    "energyMultiplier": region_cfg["energyMultiplier"],
                },
                "current": {
                    "rating": current_rating,
                    "surf_range": f"{c_surf_min}–{c_surf_max}m",
                    "swells": [
                        {
                            "label": "Primary",
                            "height": s_height,
                            "period": safe_val(mh["swell_period"], idx),
                            "direction": s_dir,
                            "compass": get_cardinal(s_dir),
                        }
                    ],
                    "wind": {
                        "speed": c_wind_speed,
                        "direction": c_wind_dir,
                        "compass": get_cardinal(c_wind_dir),
                        "texture": get_wind_texture(c_wind_dir, spot),
                    },
                    "cloud_cover": c_cloud_cover,
                },
                "hourly": mh,
            }

            final_json = json.dumps(payload)
            await self.env.SURF_CACHE.put(
                cache_key_with_source, final_json, expiration_ttl=300
            )
            return Response(final_json, headers=cors_headers)

        except Exception as e:
            return Response(
                json.dumps({"error": str(e), "traceback": traceback.format_exc()}),
                status=500,
                headers=cors_headers,
            )


# Required by Worker Entrypoint
def on_fetch(request, env, ctx):
    return Default().fetch(request, env, ctx)
