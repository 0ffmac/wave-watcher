# 🏄‍♂️ Wave Watcher: A High-Performance Surf Forecast Engine 🚀

I've just built a modern, serverless surf forecasting backend that leverages the cutting edge of **Cloudflare Workers with Python**. This project demonstrates how to build a globally distributed, data-intensive API with minimal latency and zero infrastructure management.

## 🏗️ The Tech Stack

- **Runtime**: [Cloudflare Workers (Python)](https://developers.cloudflare.com/workers/languages/python/) – Running Python 3.11 directly on the edge.
- **Storage**: [Cloudflare KV](https://developers.cloudflare.com/kv/api/) – High-read, low-latency global key-value store.
- **Data Sources**: Dual-provider integration with **Open-Meteo** (Marine & Weather APIs) and **Stormglass.io**.
- **Interop**: Seamless integration between Python logic and JavaScript Web APIs (Fetch, URL, Intl, Date) via `pyodide`.

## 🧠 Key Features & Architecture

### 1. ⚡ Edge-First Python Deployment
By using Cloudflare's new Python Workers support, the entire backend is deployed at the edge. This means the Python code runs in 300+ locations worldwide, bringing the surf data as close to the user as possible.

### 2. 🗄️ Smart Caching with Cloudflare KV
To ensure lightning-fast responses and stay within API rate limits, the system implements a two-tier KV strategy:
- **Configuration Storage**: Spot definitions (lat/lon, ideal swell angles, wind orientations) are stored in KV (`SPOTS_CONFIG`), allowing for dynamic updates without redeploying code.
- **Forecast Caching**: Weather data is cached with a 1-hour TTL (`expiration_ttl=3600`). If a user requests a forecast for "Ujung Bocur," the system checks KV first, serving the data in milliseconds.

### 3. 🌊 Sophisticated Surf Rating Logic
The core of the application is a custom-built rating engine that translates raw meteorological data into human-readable ratings:
- **Wind Texture Analysis**: Automatically determines if conditions are *Offshore*, *Onshore*, or *Cross-shore* based on the spot's unique orientation.
- **Dynamic Rating System**: Categorizes sessions as `🔥 EPIC`, `✅ GOOD`, `⏳ FAIR`, `❌ POOR`, or `🌬️ BLOWN OUT` by analyzing:
    - Swell Height vs. Period.
    - Wind Speed thresholds (with higher tolerance for offshore winds).
    - Weather safety (Rain/Cloud cover).

### 4. 🌍 Timezone-Aware Precision
Using the `js.Intl` and `js.Date` interop, the worker accurately calculates the current local hour for any surf spot globally, ensuring that the "Current Conditions" truly reflect what's happening at the beach right now.

## 🚀 Why this approach?
- **Zero Cold Starts**: Cloudflare Workers' isolate-based architecture ensures the API is always warm.
- **Scale to Millions**: The system scales automatically without any server configuration.
- **Cost Effective**: Leveraging KV for caching significantly reduces expensive third-party API calls.

---

*I'm passionate about building high-performance edge applications. Check out the snippet below for a look at how we handle the rating logic in Python!*

```python
def calculate_spot_rating(spot_config, swell_height, swell_dir, wind_dir, wind_speed, rain):
    # Logic to determine if it's "Epic" or "Blown Out"
    is_offshore = is_angle_in_range(wind_dir, spot_config.get("offshore_wind", []))
    wind_limit = 32 if is_offshore else 22 # Higher limit for offshore!
    
    if wind_speed > wind_limit:
        return "🌬️ BLOWN OUT"
    # ... more scoring logic ...
```

#Cloudflare #Python #Serverless #WebDev #SurfTech #EdgeComputing #Programming
