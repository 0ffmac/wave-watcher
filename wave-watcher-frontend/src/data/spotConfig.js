/**
 * Hierarchical Spot Configuration
 *
 * Structure: Country -> Region -> Spots
 * Easy to scale: Add new countries, regions, or spots by following the pattern
 */

export const SPOT_CONFIG = {
  indonesia: {
    name: "Indonesia",
    regions: {
      sumatra: {
        name: "Sumatra",
        spots: {
          ujung_bocur: {
            name: "Ujung Bocur",
            lat: -5.3048,
            lon: 103.9919,
            location: "South Sumatra, Indonesia",
            region: "indonesia_sumatra",
            swellWindow: [170, 240], // Widen for S swells
            optimalSwellDir: 205,
            facingDir: 205,
            breakType: "reef",
            spotScaleFactor: 1.05,
            offshore_wind: [80, 160],
            onshore_wind: [200, 20],
          },
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
          krui_left: {
            name: "Krui Left",
            lat: -5.1928,
            lon: 103.929,
            location: "South Sumatra, Indonesia",
            region: "indonesia_sumatra",
            swellWindow: [170, 220],
            optimalSwellDir: 195,
            facingDir: 195,
            breakType: "point",
            spotScaleFactor: 1.0,
            offshore_wind: [50, 130],
            onshore_wind: [190, 40],
          },
          jennys_right: {
            name: "Jenny's Right",
            lat: -5.0383,
            lon: 103.7666,
            location: "South Sumatra, Indonesia",
            region: "indonesia_sumatra",
            swellWindow: [170, 235],
            optimalSwellDir: 202,
            facingDir: 202,
            breakType: "point",
            spotScaleFactor: 1.0,
            offshore_wind: [270, 360],
            onshore_wind: [90, 180],
          },
          krui_right: {
            name: "Krui Right",
            lat: -5.185998,
            lon: 103.929829,
            location: "South Sumatra, Indonesia",
            region: "indonesia_sumatra",
            swellWindow: [180, 250],
            optimalSwellDir: 220,
            facingDir: 220,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [60, 150],
            onshore_wind: [240, 330],
          },
          way_jambu: {
            name: "Way Jambu",
            lat: -5.3491,
            lon: 104.0302,
            location: "South Sumatra, Indonesia",
            region: "indonesia_sumatra",
            swellWindow: [180, 240],
            optimalSwellDir: 210,
            facingDir: 210,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [30, 120],
            onshore_wind: [210, 300],
          },
          ujung_walur: {
            name: "Ujung Walur",
            lat: -5.208102,
            lon: 103.90135,
            location: "South Sumatra, Indonesia",
            region: "indonesia_sumatra",
            swellWindow: [180, 240],
            optimalSwellDir: 210,
            facingDir: 210,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [50, 140],
            onshore_wind: [230, 320],
          },
        },
      },
      bali: {
        name: "Bali",
        spots: {
          uluwatu: {
            name: "Uluwatu",
            lat: -8.8149,
            lon: 115.0884,
            location: "Bali, Indonesia",
            region: "indonesia_bali",
            swellWindow: [170, 235],
            optimalSwellDir: 202,
            facingDir: 270,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [90, 150],
            onshore_wind: [270, 330],
          },
          balangan: {
            name: "Balangan",
            lat: -8.792,
            lon: 115.1234,
            location: "Bali, Indonesia",
            region: "indonesia_bali",
            swellWindow: [180, 250],
            optimalSwellDir: 215,
            facingDir: 250,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [100, 160],
            onshore_wind: [280, 340],
          },
          padang_padang: {
            name: "Padang Padang",
            group: "Bukit West",
            lat: -8.8112,
            lon: 115.1037,
            location: "Bali, Indonesia",
            region: "indonesia_bali",
            swellWindow: [180, 230],
            optimalSwellDir: 205,
            facingDir: 270,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [90, 150],
            onshore_wind: [270, 330],
            description:
              "The Balinese Pipeline. Best on mid-to-high tide with solid SW swell.",
          },
          impossibles: {
            name: "Impossibles",
            group: "Bukit West",
            lat: -8.8085,
            lon: 115.109,
            location: "Bali, Indonesia",
            region: "indonesia_bali",
            swellWindow: [180, 240],
            optimalSwellDir: 210,
            facingDir: 270,
            breakType: "point",
            spotScaleFactor: 1.0,
            offshore_wind: [90, 150],
            onshore_wind: [270, 330],
            description: "Fast, long racing walls over a beautiful reef.",
          },
          bingin: {
            name: "Bingin",
            group: "Bukit West",
            lat: -8.8055,
            lon: 115.113,
            location: "Bali, Indonesia",
            region: "indonesia_bali",
            swellWindow: [180, 240],
            optimalSwellDir: 210,
            facingDir: 270,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [90, 150],
            onshore_wind: [270, 330],
            description: "Machine-like left barrel. Best on mid-tide.",
          },
          nusa_dua: {
            name: "Nusa Dua",
            group: "East Side",
            lat: -8.808,
            lon: 115.235,
            location: "Bali, Indonesia",
            region: "indonesia_bali",
            swellWindow: [150, 220],
            optimalSwellDir: 185,
            facingDir: 270,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [240, 320],
            onshore_wind: [60, 140],
            description: "Powerful right-hander. Main wet season peak.",
          },
          melasti: {
            name: "Melasti",
            group: "Bukit South",
            lat: -8.8481,
            lon: 115.1592,
            location: "Ungasan, Bali",
            region: "indonesia_bali",
            swellWindow: [170, 220],
            optimalSwellDir: 195,
            facingDir: 195,
            breakType: "beach",
            spotScaleFactor: 1.0,
            offshore_wind: [340, 40],
            onshore_wind: [160, 220],
            description:
              "Limestone cliff backdrop. Shifty peaks, best on mid tide.",
          },
          green_bowl: {
            name: "Green Bowl",
            group: "Bukit South",
            lat: -8.8488,
            lon: 115.1711,
            location: "Ungasan, Bali",
            region: "indonesia_bali",
            swellWindow: [160, 210],
            optimalSwellDir: 185,
            facingDir: 185,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [330, 30],
            onshore_wind: [150, 210],
            description:
              "Powerful right-hander. Long walk down (and up!) the stairs.",
          },
          pandawa: {
            name: "Pandawa",
            group: "Bukit South",
            lat: -8.8453,
            lon: 115.1864,
            location: "Kutuh, Bali",
            region: "indonesia_bali",
            swellWindow: [150, 210],
            optimalSwellDir: 180,
            facingDir: 180,
            breakType: "beach",
            spotScaleFactor: 1.0,
            offshore_wind: [330, 30],
            onshore_wind: [150, 210],
            description:
              "Deep reef peaks. Handles a lot of swell but gets windy.",
          },
          gunung_payung: {
            name: "Gunung Payung",
            group: "Bukit South",
            lat: -8.8425,
            lon: 115.2015,
            location: "Kutuh, Bali",
            region: "indonesia_bali",
            swellWindow: [160, 220],
            optimalSwellDir: 190,
            facingDir: 190,
            breakType: "reef",
            spotScaleFactor: 1.0,
            offshore_wind: [330, 30],
            onshore_wind: [150, 210],
            description:
              "Hidden gem. Quiet reef breaks, very sensitive to wind.",
          },
        },
      },
    },
  },
  france: {
    name: "France",
    regions: {
      hossegor: {
        name: "Hossegor/Capbreton",
        spots: {
          fr_la_graviere: {
            name: "La Gravière",
            lat: 43.6655,
            lon: -1.4442,
            region: "france_hossegor",
            swellWindow: [260, 320],
            optimalSwellDir: 290,
            facingDir: 285,
            breakType: "heavy_beach",
            spotScaleFactor: 1.1,
            offshore_wind: [45, 135],
            onshore_wind: [225, 315],
          },
          fr_la_nord: {
            name: "La Nord",
            lat: 43.667,
            lon: -1.446,
            region: "france_hossegor",
            swellWindow: [270, 330],
            optimalSwellDir: 300,
            facingDir: 290,
            breakType: "heavy_beach",
            spotScaleFactor: 1.1,
            offshore_wind: [45, 135],
            onshore_wind: [225, 315],
          },
          fr_la_sud: {
            name: "La Sud",
            lat: 43.6603,
            lon: -1.4434,
            region: "france_hossegor",
            swellWindow: [260, 310],
            optimalSwellDir: 285,
            facingDir: 285,
            breakType: "beach",
            spotScaleFactor: 0.95,
            offshore_wind: [45, 135],
            onshore_wind: [225, 315],
          },
          fr_la_piste: {
            name: "La Piste",
            lat: 43.63738,
            lon: -1.450487,
            region: "france_hossegor",
            swellWindow: [260, 320],
            optimalSwellDir: 290,
            facingDir: 285,
            breakType: "heavy_beach",
            spotScaleFactor: 0.95,
            offshore_wind: [45, 135],
            onshore_wind: [225, 315],
          },
          fr_santocha: {
            name: "Santocha",
            lat: 43.6477,
            lon: -1.4474,
            region: "france_hossegor",
            swellWindow: [250, 310],
            optimalSwellDir: 280,
            facingDir: 280,
            breakType: "beach",
            spotScaleFactor: 0.95,
            offshore_wind: [45, 135],
            onshore_wind: [225, 315],
          },
        },
      },
    },
  },
  usa: {
    name: "USA",
    regions: {
      north_carolina: {
        name: "North Carolina",
        spots: {
          us_obx_cape_point: {
            name: "Cape Point",
            lat: 35.2178,
            lon: -75.532,
            location: "Buxton, NC",
            region: "usa_north_carolina",
            swellWindow: [20, 200],
            optimalSwellDir: 120,
            facingDir: 120,
            breakType: "heavy_beach",
            spotScaleFactor: 1.1, // Small boost because the currents often "trap" swell energy here
            offshore_wind: [315, 45], // NW to NE is often magic here
          },
          us_obx_rodanthe: {
            name: "Rodanthe (S-Turns)",
            lat: 35.6028,
            lon: -75.465,
            location: "Outer Banks, NC",
            region: "usa_north_carolina",
            swellWindow: [20, 160],
            optimalSwellDir: 65,
            facingDir: 65,
            breakType: "heavy_beach", // <--- This triggers the 1.4x multiplier
            spotScaleFactor: 1.0, // Keep at 1.0 to let heavy_beach do the work
            offshore_wind: [240, 310],
          },
          us_obx_lighthouse: {
            name: "Hatteras Lighthouse",
            lat: 35.2514,
            lon: -75.5292,
            location: "Buxton, NC",
            region: "usa_north_carolina",
            swellWindow: [40, 190],
            optimalSwellDir: 110,
            facingDir: 110,
            breakType: "heavy_beach", // <--- Triggers heavy beach physics
            spotScaleFactor: 1.0,
            offshore_wind: [270, 340],
          },
          us_wrightsville: {
            name: "Wrightsville Beach",
            lat: 34.2091,
            lon: -77.7947,
            location: "Wilmington, NC",
            region: "usa_north_carolina",
            swellWindow: [90, 180],
            optimalSwellDir: 145,
            facingDir: 145,
            breakType: "beach", // Standard beach break (1.0x)
            spotScaleFactor: 0.9, // Slightly dampened due to shelf
            offshore_wind: [290, 340],
          },
        },
      },
      florida_north: {
        name: "Northern Florida",
        spots: {
          us_jax_pier: {
            name: "Jax Pier",
            lat: 30.2915,
            lon: -81.3885,
            region: "usa_florida",
            swellWindow: [35, 145],
            optimalSwellDir: 90,
            facingDir: 90,
            breakType: "soft_beach",
            spotScaleFactor: 0.7,
            offshore_wind: [240, 300],
            onshore_wind: [45, 135],
          },
          us_st_augustine: {
            name: "St. Augustine",
            lat: 29.8575,
            lon: -81.2655,
            region: "usa_florida",
            swellWindow: [60, 130],
            optimalSwellDir: 95,
            facingDir: 90,
            breakType: "soft_beach",
            spotScaleFactor: 0.7,
            offshore_wind: [250, 290],
            onshore_wind: [60, 130],
          },
          us_flagler_beach: {
            name: "Flagler Beach",
            lat: 29.485,
            lon: -81.1266,
            region: "usa_florida",
            swellWindow: [35, 145],
            optimalSwellDir: 90,
            facingDir: 90,
            breakType: "beach",
          },
        },
      },
      florida_central: {
        name: "Central Florida",
        spots: {
          us_new_smyrna: {
            name: "New Smyrna Beach",
            lat: 29.053676,
            lon: -80.889216,
            region: "usa_florida",
            swellWindow: [35, 120],
            optimalSwellDir: 77,
            facingDir: 90,
            breakType: "soft_beach",
            spotScaleFactor: 0.75,
            offshore_wind: [240, 300],
            onshore_wind: [45, 120],
          },
          us_ponce_inlet: {
            name: "Ponce Inlet",
            lat: 29.0814,
            lon: -80.9167,
            region: "usa_florida",
            swellWindow: [35, 120],
            optimalSwellDir: 77,
            facingDir: 90,
            breakType: "beach",
          },
          us_cocoa_beach: {
            name: "Cocoa Beach Pier",
            lat: 28.317949,
            lon: -80.589392,
            region: "usa_florida",
            swellWindow: [50, 130],
            optimalSwellDir: 90,
            facingDir: 90,
            breakType: "soft_beach",
            spotScaleFactor: 0.7,
            offshore_wind: [250, 290],
            onshore_wind: [60, 130],
          },
          us_indialantic: {
            name: "Indialantic",
            lat: 28.0911,
            lon: -80.5609,
            region: "usa_florida",
            swellWindow: [50, 130],
            optimalSwellDir: 90,
            facingDir: 90,
            breakType: "beach",
          },
          us_sebastian_inlet: {
            name: "Sebastian Inlet",
            lat: 27.8606,
            lon: -80.4475,
            region: "usa_florida",
            swellWindow: [35, 100],
            optimalSwellDir: 67,
            facingDir: 90,
            breakType: "soft_beach",
            spotScaleFactor: 0.8,
            offshore_wind: [240, 280],
            onshore_wind: [45, 100],
          },
        },
      },
      florida_south: {
        name: "Southern Florida",
        spots: {
          us_jupiter_inlet: {
            name: "Jupiter Inlet",
            lat: 26.9439,
            lon: -80.0706,
            region: "usa_florida",
            swellWindow: [35, 100],
            optimalSwellDir: 67,
            facingDir: 90,
            breakType: "beach",
          },
          us_reef_road: {
            name: "Reef Road",
            lat: 26.782,
            lon: -80.034,
            region: "usa_florida",
            swellWindow: [0, 55],
            optimalSwellDir: 27,
            facingDir: 90,
            breakType: "reef",
            spotScaleFactor: 0.85,
            offshore_wind: [240, 300],
            onshore_wind: [10, 55],
          },
          us_boynton_inlet: {
            name: "Boynton Inlet",
            lat: 26.5453,
            lon: -80.0439,
            region: "usa_florida",
            swellWindow: [0, 55],
            optimalSwellDir: 27,
            facingDir: 90,
            breakType: "beach",
          },
          us_south_beach: {
            name: "South Beach",
            lat: 25.7743,
            lon: -80.1303,
            region: "usa_florida",
            swellWindow: [0, 120],
            optimalSwellDir: 60,
            facingDir: 90,
            breakType: "beach",
          },
        },
      },
      florida_gulf: {
        name: "Gulf Coast",
        spots: {
          us_pensacola_pier: {
            name: "Pensacola Beach Pier",
            lat: 30.332,
            lon: -87.141,
            region: "usa_florida",
            swellWindow: [150, 230],
            optimalSwellDir: 190,
            facingDir: 180,
            breakType: "soft_beach",
            spotScaleFactor: 0.65,
            offshore_wind: [0, 45],
            onshore_wind: [160, 220],
          },
          us_pcb_pier: {
            name: "Panama City Beach Pier",
            lat: 30.213,
            lon: -85.878,
            region: "usa_florida",
            swellWindow: [170, 250],
            optimalSwellDir: 210,
            facingDir: 180,
            breakType: "soft_beach",
            spotScaleFactor: 0.65,
            offshore_wind: [0, 45],
            onshore_wind: [180, 240],
          },
          us_venice_jetty: {
            name: "Venice Jetty",
            lat: 27.1106,
            lon: -82.4673,
            region: "usa_florida",
            swellWindow: [210, 320],
            optimalSwellDir: 265,
            facingDir: 270,
            breakType: "soft_beach",
            spotScaleFactor: 0.65,
            offshore_wind: [45, 135],
            onshore_wind: [210, 320],
          },
        },
      },
    },
  },
};

/**
 * Get all spots as a flat object (for backward compatibility with existing components)
 * @returns {Object} Flat object with spotId -> spotData
 */
export const getAllSpotsFlat = () => {
  const flatSpots = {};
  for (const countryKey of Object.keys(SPOT_CONFIG)) {
    const country = SPOT_CONFIG[countryKey];
    if (!country.regions) continue;
    for (const regionKey of Object.keys(country.regions)) {
      const region = country.regions[regionKey];
      if (region.spots) {
        Object.assign(flatSpots, region.spots);
      }
    }
  }
  return flatSpots;
};

/**
 * Get spot metadata by ID
 * @param {string} spotId - The spot ID
 * @returns {Object|null} Spot data or null if not found
 */
export const getSpotById = (spotId) => {
  for (const countryKey of Object.keys(SPOT_CONFIG)) {
    const country = SPOT_CONFIG[countryKey];
    if (!country.regions) continue;
    for (const regionKey of Object.keys(country.regions)) {
      const region = country.regions[regionKey];
      if (region.spots && region.spots[spotId]) {
        return region.spots[spotId];
      }
    }
  }
  return null;
};

/**
 * Get location string for a spot (e.g., "Sumatra, Indonesia")
 * @param {string} spotId - The spot ID
 * @returns {string} Location string
 */
export const getSpotLocation = (spotId) => {
  for (const countryKey of Object.keys(SPOT_CONFIG)) {
    const country = SPOT_CONFIG[countryKey];
    if (!country.regions) continue;
    for (const regionKey of Object.keys(country.regions)) {
      const region = country.regions[regionKey];
      if (region.spots && region.spots[spotId]) {
        return `${region.name}, ${country.name}`;
      }
    }
  }
  return "";
};

/**
 * Get all countries as array of { key, name }
 * @returns {Array} Countries array
 */
export const getCountries = () => {
  return Object.entries(SPOT_CONFIG).map(([key, data]) => ({
    key,
    name: data.name,
  }));
};

/**
 * Get all regions for a country as array of { key, name, hasSpots }
 * @param {string} countryKey - Country key
 * @returns {Array} Regions array
 */
export const getRegionsForCountry = (countryKey) => {
  const country = SPOT_CONFIG[countryKey];
  if (!country || !country.regions) return [];

  return Object.entries(country.regions).map(([key, data]) => ({
    key,
    name: data.name,
    hasSpots: data.spots ? Object.keys(data.spots).length > 0 : false,
  }));
};

/**
 * Get all spots for a specific region
 * @param {string} countryKey - Country key
 * @param {string} regionKey - Region key
 * @returns {Object} Spots object
 */
export const getSpotsForRegion = (countryKey, regionKey) => {
  // 1. Check if SPOT_CONFIG even exists yet
  if (typeof SPOT_CONFIG === "undefined" || !SPOT_CONFIG) return {};

  // 2. Safely dive into the object
  // If countryKey or regionKey don't exist, it returns {} instead of crashing
  return SPOT_CONFIG[countryKey]?.regions?.[regionKey]?.spots || {};
};

/**
 * Get all spots for a country (across all regions)
 * @param {string} countryKey - Country key
 * @returns {Object} Flattened spots object for the country
 */
export const getSpotsForCountry = (countryKey) => {
  const country = SPOT_CONFIG[countryKey];
  if (!country || !country.regions) return {};

  const countrySpots = {};
  for (const regionKey of Object.keys(country.regions)) {
    const region = country.regions[regionKey];
    if (region && region.spots) {
      Object.assign(countrySpots, region.spots);
    }
  }
  return countrySpots;
};
