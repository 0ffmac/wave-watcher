# Agent Task: Per-Spot Directional Plateau Override

## What This Does
The global plateau fix set 20° for all spots. Mandiri Beach is a heavy beach
break that works well across a wider swell window and should stay more lenient.
This adds a `swellPlateau` property to individual spots in `spotConfig.js`.
`surfCalculations.js` reads it with a fallback to 20° (the new tight default).

No other spots are affected unless explicitly given a `swellPlateau` value.

---

## ⚠️ Hard Rules
- Touch only `spotConfig.js` and `surfCalculations.js`.
- Only add the `swellPlateau` property to spots listed below.
- Only change the one line in `surfCalculations.js` that reads the plateau.
- Do not reformat or touch any other lines.

---

## File 1 — `src/utils/surfCalculations.js`

### Change 1A — Read swellPlateau from spotMeta with fallback to 20

Find:
```js
    // Plateau logic: only award full marks within ±20° of optimal.
    // 45° was too generous — it gave full credit to directions that are
    // noticeably off-angle for most breaks. 20° matches real-world sweet spots.
    if (finalDiff <= 20) {
```

Replace with:
```js
    // Plateau logic: only award full marks within ±swellPlateau° of optimal.
    // Default 20° for precise reef breaks. Beach breaks can override higher.
    const swellPlateau = spotMeta?.swellPlateau ?? 20;
    if (finalDiff <= swellPlateau) {
```

---

## File 2 — `src/data/spotConfig.js`

Add `swellPlateau` to each spot that needs a wider or narrower window than
the 20° default. Spots with NO `swellPlateau` key automatically use 20°.

### Mandiri Beach — add `swellPlateau: 35`

Heavy beach break. Works well from S through SSW. A swell 35° off optimal
still produces rideable, fun surf because the sandbanks shift and pick up
energy from wider angles than a fixed reef.

Find:
```js
          mandiri_beach: {
            name: "Mandiri Beach",
            lat: -5.2704,
            lon: 103.9987,
            location: "South Sumatra, Indonesia",
            region: "indonesia_sumatra",
            swellWindow: [170, 250], // Widen for S swells
            optimalSwellDir: 215,
            facingDir: 215,
            breakType: "heavy_beach",
            spotScaleFactor: 1.1,
            offshore_wind: [40, 120],
            onshore_wind: [180, 30],
          },
```

Replace with:
```js
          mandiri_beach: {
            name: "Mandiri Beach",
            lat: -5.2704,
            lon: 103.9987,
            location: "South Sumatra, Indonesia",
            region: "indonesia_sumatra",
            swellWindow: [170, 250], // Widen for S swells
            optimalSwellDir: 215,
            facingDir: 215,
            breakType: "heavy_beach",
            spotScaleFactor: 1.1,
            offshore_wind: [40, 120],
            onshore_wind: [180, 30],
            swellPlateau: 35,        // Beach break — works across wider angles
          },
```

---

## Plateau reference guide for other spots

Use this as a reference when tuning other spots in the same region.
Add `swellPlateau` only to spots that genuinely need a different value.

| Break type | Suggested swellPlateau | Reasoning |
|---|---|---|
| Precise reef (G-Land style) | **15°** | Very directional — 1° off kills the barrel |
| Standard reef | **20°** (default) | Most reefs work in a tight window |
| Point break | **25°** | Headlands wrap swell, slightly wider window |
| Beach break | **30–35°** | Sandbars shift, wider acceptance |
| Heavy beach (canyon) | **35°** | Wide refraction zone, still benefits from optimal |

### Other Sumatra spots you may want to tune

**Krui Left** (point break) — consider `swellPlateau: 25`
```js
            swellPlateau: 25,
```

**Jenny's Right** (point break) — consider `swellPlateau: 25`
```js
            swellPlateau: 25,
```

**Way Jambu / Ujung Walur / Krui Right** (reefs) — leave at default 20°,
no `swellPlateau` property needed.

**Ujung Bocur** (precise reef) — already set to 20° by default. Could go
to 15° if you want it even more strict, but 20° is appropriate.

---

## Verify after deploy

Test Mandiri Beach with a swell at 188° (35° off optimal 215°):
- **Before this fix:** would have been penalized under the global 20° rule
- **After this fix:** 35° off is right at the plateau edge → directionalFactor = 1.0 ✓

Test Mandiri with swell at 170° (45° off optimal):
- directionalFactor should now drop to ~0.85 (outside the 35° plateau)

Test Ujung Bocur with swell at 188° (21° off new optimal 209°):
- directionalFactor should be ~0.82 (outside 20° plateau, penalized) ✓

---

## Files modified

| File | Change |
|---|---|
| `src/utils/surfCalculations.js` | Read `spotMeta.swellPlateau` with fallback to 20 |
| `src/data/spotConfig.js` | Add `swellPlateau: 35` to Mandiri Beach |

**Total: 2 files, 2 changes. Run `npm run deploy` after saving.**
