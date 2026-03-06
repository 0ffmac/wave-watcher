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
            optimalSwellDir: 200,
            swellWindow: [140, 280],
            facingDir: 270,
          },
          mandiri_beach: {
            name: "Mandiri Beach",
            lat: -5.2472,
            lon: 103.9234,
            location: "South Sumatra, Indonesia",
            optimalSwellDir: 225,
            swellWindow: [140, 310],
            facingDir: 235,
          },
          krui_left: {
            name: "Krui Left",
            lat: -5.1928,
            lon: 103.929,
            location: "South Sumatra, Indonesia",
            optimalSwellDir: 210,
            swellWindow: [150, 270],
            facingDir: 270,
          },
          jennys_right: {
            name: "Jenny's Right",
            lat: -5.0383,
            lon: 103.7666,
            location: "South Sumatra, Indonesia",
            optimalSwellDir: 190,
            swellWindow: [130, 280],
            facingDir: 135,
          },
          krui_right: {
            name: "Krui Right",
            lat: -5.178,
            lon: 103.888,
            location: "South Sumatra, Indonesia",
            optimalSwellDir: 210,
            swellWindow: [150, 280],
            facingDir: 240,
          },
          way_jambu: {
            name: "Way Jambu",
            lat: -5.3491,
            lon: 104.0302,
            location: "South Sumatra, Indonesia",
            optimalSwellDir: 210,
            swellWindow: [150, 270],
            facingDir: 215,
          },
          ujung_walur: {
            name: "Ujung Walur",
            lat: -5.216,
            lon: 103.908,
            location: "South Sumatra, Indonesia",
            optimalSwellDir: 225,
            swellWindow: [140, 290],
            facingDir: 230,
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
            optimalSwellDir: 210,
            swellWindow: [160, 260],
            facingDir: 220,
          },
          balangan: {
            name: "Balangan",
            lat: -8.792,
            lon: 115.1234,
            location: "Bali, Indonesia",
            optimalSwellDir: 215,
            swellWindow: [170, 270],
            facingDir: 230,
          },
          padang_padang: {
            name: "Padang Padang",
            group: "Bukit West",
            lat: -8.8112,
            lon: 115.1037,
            location: "Bali, Indonesia",
            optimalSwellDir: 210,
            swellWindow: [180, 240],
            facingDir: 225,
            description:
              "The Balinese Pipeline. Best on mid-to-high tide with solid SW swell.",
          },
          impossibles: {
            name: "Impossibles",
            group: "Bukit West",
            lat: -8.8085,
            lon: 115.109,
            location: "Bali, Indonesia",
            optimalSwellDir: 215,
            swellWindow: [180, 240],
            facingDir: 225,
            description: "Fast, long racing walls over a beautiful reef.",
          },
          bingin: {
            name: "Bingin",
            group: "Bukit West",
            lat: -8.8055,
            lon: 115.113,
            location: "Bali, Indonesia",
            optimalSwellDir: 210,
            swellWindow: [190, 240],
            facingDir: 230,
            description: "Machine-like left barrel. Best on mid-tide.",
          },
          nusa_dua: {
            name: "Nusa Dua",
            group: "East Side",
            lat: -8.808,
            lon: 115.235,
            location: "Bali, Indonesia",
            optimalSwellDir: 190,
            swellWindow: [120, 260],
            facingDir: 110,
            description: "Powerful right-hander. Main wet season peak.",
          },
          melasti: {
            name: "Melasti",
            group: "Bukit South",
            lat: -8.8481,
            lon: 115.1592,
            location: "Ungasan, Bali",
            optimalSwellDir: 195,
            swellWindow: [140, 260],
            facingDir: 180,
            description:
              "Limestone cliff backdrop. Shifty peaks, best on mid tide.",
          },
          green_bowl: {
            name: "Green Bowl",
            group: "Bukit South",
            lat: -8.8488,
            lon: 115.1711,
            location: "Ungasan, Bali",
            optimalSwellDir: 190,
            swellWindow: [140, 260],
            facingDir: 180,
            description:
              "Powerful right-hander. Long walk down (and up!) the stairs.",
          },
          pandawa: {
            name: "Pandawa",
            group: "Bukit South",
            lat: -8.8453,
            lon: 115.1864,
            location: "Kutuh, Bali",
            optimalSwellDir: 185,
            swellWindow: [140, 260],
            facingDir: 175,
            description:
              "Deep reef peaks. Handles a lot of swell but gets windy.",
          },
          gunung_payung: {
            name: "Gunung Payung",
            group: "Bukit South",
            lat: -8.8425,
            lon: 115.2015,
            location: "Kutuh, Bali",
            optimalSwellDir: 190,
            swellWindow: [140, 260],
            facingDir: 170,
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
          },
          fr_la_nord: { name: "La Nord", lat: 43.667, lon: -1.446 },
          fr_la_sud: { name: "La Sud", lat: 43.66, lon: -1.443 },
          fr_la_piste: { name: "La Piste", lat: 43.6515, lon: -1.4458 },
          fr_santocha: { name: "Santocha", lat: 43.6552, lon: -1.4462 },
        },
      },
    },
  },
  usa: {
    name: "USA",
    regions: {
      florida_north: {
        name: "Northern Florida",
        spots: {
          us_jax_pier: { name: "Jax Pier", lat: 30.2915, lon: -81.3885 },
          us_st_augustine: {
            name: "St. Augustine",
            lat: 29.8575,
            lon: -81.2655,
          },
          us_flagler_beach: {
            name: "Flagler Beach",
            lat: 29.485,
            lon: -81.1266,
          },
        },
      },
      florida_central: {
        name: "Central Florida",
        spots: {
          us_new_smyrna: {
            name: "New Smyrna Beach",
            lat: 29.0258,
            lon: -80.927,
          },
          us_ponce_inlet: { name: "Ponce Inlet", lat: 29.0814, lon: -80.9167 },
          us_cocoa_beach: {
            name: "Cocoa Beach Pier",
            lat: 28.3675,
            lon: -80.6078,
          },
          us_indialantic: { name: "Indialantic", lat: 28.0911, lon: -80.5609 },
          us_sebastian_inlet: {
            name: "Sebastian Inlet",
            lat: 27.8606,
            lon: -80.4475,
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
          },
          us_reef_road: { name: "Reef Road", lat: 26.782, lon: -80.034 },
          us_boynton_inlet: {
            name: "Boynton Inlet",
            lat: 26.5453,
            lon: -80.0439,
          },
          us_south_beach: { name: "South Beach", lat: 25.7743, lon: -80.1303 },
        },
      },
      florida_gulf: {
        name: "Gulf Coast",
        spots: {
          us_pensacola_pier: {
            name: "Pensacola Beach Pier",
            lat: 30.332,
            lon: -87.141,
          },
          us_pcb_pier: {
            name: "Panama City Beach Pier",
            lat: 30.213,
            lon: -85.878,
          },
          us_venice_jetty: {
            name: "Venice Jetty",
            lat: 27.1106,
            lon: -82.4673,
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
