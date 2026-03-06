# WaveWatcher Forecasting Logic

This document explains the mathematical and geographical logic used to translate deep-water swell data into the local surf heights displayed in the WaveWatcher application.

## 1. Core Calculation Files
- `src/utils/surfCalculations.js`: The central engine containing the `calculateSurfHeight` and `calculateEnergy` functions.
- `src/App.jsx`: Contains the `SPOTS` metadata (geographical constraints) and calculates the "Current Conditions" card.
- `src/components/ForecastTable.jsx`: Processes hourly data arrays using the utility to generate the forecast rows.
- `src/components/ForecastChart.jsx`: Visualizes the max surf height over a 48-hour period using the same logic.

## 2. Geography-Driven Metadata (The `SPOTS` Object)
To make calculations universal, every spot defines its own geographical "fingerprint":
- **`optimalSwellDir`**: The compass degree where a swell hits the spot perfectly "square."
- **`swellWindow`**: The range of degrees (e.g., `[140, 280]`) where the spot is open to the ocean.
- **`facingDir`**: The compass degree the beach "looks" at. 
    - *Example:* If a beach faces West ($270^\circ$), an offshore wind comes from the East ($90^\circ$).

## 3. The Surf Height Formula
The final surf height ($H_s$) is calculated as:
$$H_s = H_{swell} \times \text{BreakingFactor} \times \text{DirectionalEfficiency} \times \text{WindFactor}$$

### A. Directional Efficiency (Swell Wrap)
We use a "Plateau Logic" to account for how reef points wrap swell:
- **Optimal Zone:** If the swell direction is within $45^\circ$ of the `optimalSwellDir`, efficiency is $100\%$ ($1.0$).
- **Drop-off Zone:** If outside the plateau but inside the `swellWindow`, efficiency scales down linearly to $30\%$ ($0.3$).
- **Shadow Zone:** If outside the window, a residual $20\%$ ($0.2$) is applied to account for extreme refraction/wrap.

### B. Breaking Factor (Period/Shoaling)
Longer period swells carry more energy and "grow" more when they hit shallow water:
- **Base Multiplier:** Starts at $0.7 \times$ to $1.0 \times$ for $6s$ periods.
- **Scaling:** For every second of period above $6s$, we add $0.06$ (min) to $0.10$ (max).
- *Result:* A $2.0m$ swell at $14s$ translates to a much larger breaking wave than a $2.0m$ swell at $8s$.

### C. Wind Factor (Texture & Hold)
We compare the current `windDir` to the spot's `straightOffshoreDir` (`facingDir + 180`):
- **Offshore ($<45^\circ$ diff):** Multiplier of $1.25\times$. Offshore winds groom the face and allow the wave to grow taller before breaking.
- **Onshore ($>135^\circ$ diff):** Multiplier of $0.75\times$. Onshore winds "crumble" the crest, reducing the surfable height.
- **Cross-shore:** Multiplier of $0.9\times$.

## 4. Energy Calculation (kJ)
To match industry standards (like Surfline), we calculate energy based on the square of the height multiplied by the period:
$$\text{Energy (kJ)} = (H^2 \times T) \times 14$$
*The multiplier 14 is tuned to match the kJ values typical of North Indian Ocean/Sumatran swell power.*

## 5. Filtering Logic
- The application automatically filters out past timestamps. 
- "Today" only shows hours from the current time forward.
- If all hours for a day have passed, the day header is hidden entirely.
