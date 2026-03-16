/**
 * Spot info — USA: Florida (Atlantic + Gulf Coast)
 * Spots: us_jax_pier, us_st_augustine, us_new_smyrna,
 *         us_cocoa_beach, us_sebastian_inlet, us_reef_road,
 *         us_venice_jetty, us_pensacola_pier, us_pcb_pier
 */
export const USA_FLORIDA_INFO = {
  // ─── North Florida (Atlantic) ─────────────────────────────────────────────

  us_jax_pier: {
    name: "Jax Beach Pier",
    region: "Jacksonville Beach, Florida",
    country: "USA",
    tagline: "The most consistent break on North Florida's coast — a pier-anchored sandbar that funnels NE wind swells into punchy, surprisingly hollow peaks year-round.",

    difficulty: { level: 1, label: "All Levels",
      note: "A highly accessible wave that suits all levels depending on conditions. NE wind swells produce short, fast peaks ideal for progressive shortboarders. The biggest hurricane swells can produce powerful, advanced-level surf." },

    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85",

    stats: [
      { label: "Break Type",   value: "Beach Break (Pier)"     },
      { label: "Wave Type",    value: "Left & Right"           },
      { label: "Best Swell",   value: "NE – E (wind swell)"    },
      { label: "Swell Size",   value: "1 – 5ft"                },
      { label: "Best Wind",    value: "W – SW Offshore"        },
      { label: "Best Tide",    value: "Low to Mid"             },
      { label: "Water Temp",   value: "16°C (Jan) – 28°C (Aug)" },
      { label: "Fun Factor",   value: "7 / 10"                 },
    ],

    story: {
      heading: "North Florida's Living Room",
      body: [
        "Jacksonville Beach Pier has been the centre of the North Florida surf scene for decades. The concrete structure extends into the Atlantic and disrupts the sandbars in a way that consistently produces better-shaped waves than the surrounding open beach — a phenomenon observed at piers up and down the East Coast.",
        "The surf here is almost entirely wind swell driven. NE frontal systems and the occasional tropical disturbance provide the best conditions. During hurricane season (August–October) the swells can reach legitimate size and power. The rest of the year it ranges from fun knee-high punters to solid overhead peaks on the better winter NE swells.",
        "Jacksonville Beach has a vibrant local surf community despite — or perhaps because of — the lack of consistent epic surf. Surf schools, shops, and competitions run year-round. The pier itself is a social hub where locals congregate to check conditions.",
      ],
    },

    technical: [
      { title: "Pier Sandbar Effect", icon: "🌊", content: "The pier pilings interrupt longshore sediment transport and create more pronounced sandbars on both sides — north and south. The north side typically produces longer lefts; the south side shorter, more punchy rights. Both sides are worth checking before committing to a spot." },
      { title: "Wind Swell Character", icon: "🌊", content: "Florida's Atlantic coast runs almost due N–S, making it nearly perpendicular to the NE swell direction. This produces short-period (6–9s) wind swells that break steeply and quickly. The style is more reactive and punchy than the long-period groundswell surfing of Indonesia or France — boards need to be looser and sessions more opportunistic." },
      { title: "Tidal Range", icon: "🌊", content: "North Florida's tidal range (~1.5m) is significant by tropical standards. Low tide exposes the sandbars and produces hollower, faster waves. High tide pushes water over the bars and softens the wave. The low-to-mid incoming tide window is the most consistent for quality." },
      { title: "Hurricane Swells", icon: "📡", content: "When a tropical system passes within 300km of the coast, Jacksonville Beach can receive powerful, disorganised swells that produce the biggest surf of the year. These events are difficult to predict more than 48 hours out. Monitor NHC (National Hurricane Center) tracks and NOAA buoy data during August–October." },
    ],

    hazards: [
      { level: "high",   title: "Pier Structure",          detail: "Never surf directly under or within 20 metres of the pier pilings in any surf. Sets sweeping through can pin surfers against the barnacle-covered concrete with serious consequences. Stay to the side of the pier and maintain a safe distance." },
      { level: "medium", title: "Rip Currents",            detail: "Rip channels form on both sides of the pier. They are usable as paddle-out routes — angle into the rip and ride it out to the lineup rather than paddling directly through the break." },
      { level: "medium", title: "Winter Cold & Wind",      detail: "Winter frontal swells come with cold temperatures and strong winds. Water drops to 16–18°C and air temperature can reach near-freezing during cold snaps. A sealed 3/2mm wetsuit is essential November–March." },
      { level: "low",    title: "Fishing Lines from Pier", detail: "Pier fishermen cast into the same water surfers use. Be aware of fishing lines when surfing close to the pier structure and call out clearly to fishermen before paddling through." },
    ],

    access: {
      overview: "Jacksonville Beach Pier is directly on 1st Street North at the Jacksonville Beach oceanfront. Metered parking is available along the beachfront road.",
      steps: [
        "From central Jacksonville, take US-90 (Beach Boulevard) east to Jacksonville Beach",
        "Turn north on 1st Street — the pier is clearly visible",
        "Park in the metered lots along the oceanfront",
        "Access the beach via the dune walkovers — check both sides of the pier before suiting up",
      ],
      tip: "The north side of the pier generally produces longer left-hand walls. The south side is more sheltered from direct NE swell and can be cleaner in side-off conditions. Walk both sides and watch for 10 minutes before choosing your spot.",
    },

    seasonChart: [
      { month: "Jan", swell: 5, wind: 5, overall: 5 }, { month: "Feb", swell: 5, wind: 5, overall: 5 },
      { month: "Mar", swell: 4, wind: 5, overall: 4 }, { month: "Apr", swell: 3, wind: 6, overall: 4 },
      { month: "May", swell: 2, wind: 6, overall: 3 }, { month: "Jun", swell: 2, wind: 6, overall: 3 },
      { month: "Jul", swell: 3, wind: 6, overall: 3 }, { month: "Aug", swell: 6, wind: 7, overall: 6 },
      { month: "Sep", swell: 7, wind: 7, overall: 7 }, { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 5, wind: 5, overall: 5 }, { month: "Dec", swell: 5, wind: 5, overall: 5 },
    ],
    seasonNote: "No true off-season — just a variation in consistency and power. Winter NE frontal swells (Nov–Feb) are the backbone of the year. Hurricane season (Aug–Oct) produces the most exciting but unpredictable surf. Summer is the flattest. Year-round warmth makes suiting up optional in summer and minimal in winter by global standards.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", caption: "Jacksonville Beach Pier — the North Florida hub" },
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "NE wind swell peaks at the pier" },
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "Winter front — clean NE swell arriving" },
      { url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80", caption: "Florida beachbreak — low tide peaks" },
    ],
  },

  us_st_augustine: {
    name: "St. Augustine Beach",
    region: "St. Augustine, Florida",
    country: "USA",
    tagline: "Shifty, fun peaks at the oldest city in America — a reliable NE swell spot with sandbar variety and consistent waves that improve every step of the way toward the inlet.",

    difficulty: { level: 1, label: "All Levels",
      note: "Very accessible beach break suitable for all levels. Gets better (and more demanding) closer to the inlet. No reef hazards — the main concern is rips and the inlet current." },

    heroImage: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=1800&q=85",

    stats: [
      { label: "Break Type",   value: "Beach Break"            },
      { label: "Wave Type",    value: "Left & Right"           },
      { label: "Best Swell",   value: "NE – E"                 },
      { label: "Swell Size",   value: "1 – 4ft"                },
      { label: "Best Wind",    value: "W – SW Offshore"        },
      { label: "Best Tide",    value: "Mid tide"               },
      { label: "Water Temp",   value: "17°C (Jan) – 29°C (Aug)" },
    ],

    story: {
      heading: "Ancient City, Modern Peaks",
      body: [
        "St. Augustine is the oldest continuously occupied European settlement in North America — founded in 1565, it predates Jamestown by 42 years. The beach, however, is timeless in the way all Atlantic beach breaks are: always moving, always shifting, always producing slightly different peaks depending on the previous week's weather.",
        "The surf here is fun rather than epic. Chest-to-head-high NE wind swells produce punchy, crumbly peaks that suit beginners to intermediates comfortably. Walk south toward the inlet and conditions improve with every hundred metres — the inlet influence produces more consistent, better-shaped sandbars near the jetty structure. This is where the surf shops and more experienced local crew tends to congregate.",
      ],
    },

    technical: [
      { title: "Inlet Gradient", icon: "🌊", content: "Sandbars improve significantly approaching the inlet. The jetty interrupts sediment transport in the same way piers do, creating more pronounced, better-shaped bars in the immediate vicinity. The closer to the inlet, the better the waves — and the stronger the current." },
      { title: "NE Swell Window", icon: "🌊", content: "The beach faces NE, making it almost perfectly aligned with the dominant NE wind swell direction. Even a small NE wind swell of 2–3ft produces recognisable, surfable waves here that might barely register on a more sheltered or obliquely-angled beach." },
    ],

    hazards: [
      { level: "medium", title: "Inlet Current",   detail: "The inlet current near the jetty is strong and directional. It will push you into or away from the inlet structure depending on the tide stage. Understand tidal flow before surfing the inlet zone." },
      { level: "medium", title: "Rip Currents",    detail: "Standard beach break rips between sandbars. Identify from the beach — darker, calmer strips of water between breaking peaks indicate rip channels." },
      { level: "low",    title: "Jellyfish",       detail: "Cannonball jellyfish are common in late summer and early autumn. Non-lethal but uncomfortable. Check with lifeguards about jellyfish presence before extended sessions." },
    ],

    access: {
      overview: "St. Augustine Beach is on Anastasia Island, across the Bridge of Lions from the historic city. A1A runs the length of the island with multiple beach access ramps.",
      steps: [
        "Cross the Bridge of Lions from historic St. Augustine onto Anastasia Island",
        "Take A1A south — beach access ramps are every few hundred metres",
        "For the best surf, drive south toward the St. Augustine Inlet",
        "Park at the public lots near the south end of the island",
      ],
      tip: "The St. Augustine Alligator Farm observation tower (just north of the inlet) is a surprisingly good spot to check the surf from elevation before suiting up. The inlet zone is visible from the bridge.",
    },

    seasonChart: [
      { month: "Jan", swell: 5, wind: 5, overall: 5 }, { month: "Feb", swell: 5, wind: 5, overall: 5 },
      { month: "Mar", swell: 4, wind: 5, overall: 4 }, { month: "Apr", swell: 3, wind: 6, overall: 4 },
      { month: "May", swell: 2, wind: 6, overall: 3 }, { month: "Jun", swell: 2, wind: 6, overall: 2 },
      { month: "Jul", swell: 2, wind: 6, overall: 3 }, { month: "Aug", swell: 5, wind: 7, overall: 5 },
      { month: "Sep", swell: 7, wind: 7, overall: 7 }, { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 5, wind: 5, overall: 5 }, { month: "Dec", swell: 5, wind: 5, overall: 5 },
    ],
    seasonNote: "Similar to all North Florida spots — best in late summer/autumn hurricane season and winter NE fronts. Summer is flat. No wetsuit needed May–October.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80", caption: "St. Augustine beachfront — shifty NE swell peaks" },
      { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", caption: "Florida Atlantic coast in the golden hour" },
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "Clean NE swell — the St. Augustine window" },
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "Inlet zone — the best sandbars on the beach" },
    ],
  },

  us_new_smyrna: {
    name: "New Smyrna Beach",
    region: "New Smyrna Beach, Florida",
    country: "USA",
    tagline: "Florida's most celebrated surf town and most consistent wave — a lively beachbreak community anchored by one of the Atlantic coast's best inlet setups.",

    difficulty: { level: 2, label: "Intermediate",
      note: "The inlet zone is Florida's most consistent quality surf — intermediate surfers will find excellent progression here. The open beach suits all levels. Respect local rules around the inlet's tidal current." },

    heroImage: "https://images.unsplash.com/photo-1464899582853-b8b8e01e3ac0?w=1800&q=85",

    stats: [
      { label: "Break Type",   value: "Beach Break / Inlet"     },
      { label: "Wave Type",    value: "Left & Right"            },
      { label: "Best Swell",   value: "NE – E (and hurricanes)" },
      { label: "Swell Size",   value: "1 – 6ft"                 },
      { label: "Best Wind",    value: "W – SW Offshore"         },
      { label: "Best Tide",    value: "Outgoing Mid"            },
      { label: "Water Temp",   value: "18°C (Jan) – 29°C (Aug)" },
      { label: "Fun Factor",   value: "8 / 10"                  },
    ],

    story: {
      heading: "Florida's Surf Capital",
      body: [
        "New Smyrna Beach has been nicknamed 'the shark attack capital of the world' by media outlets for years — an exaggerated label that the local surf community regards with varying degrees of amusement. What the label doesn't obscure is that NSB is legitimately Florida's most consistent surf destination and home to one of the best inlet surf setups on the Atlantic coast.",
        "Ponce Inlet, at the south end of the beach, is where Florida surfing concentrates. The inlet's outgoing tidal flow combined with NE swells produces fast, hollow peaks that punch well above the typical Florida standard. On the best days — proper NE groundswell, outgoing tide, W wind — the inlet rivals small beach breaks anywhere in the world for fun factor.",
        "The town has built its identity around surfing. Numerous surf shops, lessons, and local surf culture make it the most fully realised surf community in Florida. Kelly Slater grew up two hours south in Cocoa Beach, but NSB has produced its own generations of elite surfers who cut their teeth on the inlet.",
      ],
    },

    technical: [
      { title: "The Inlet Effect", icon: "🌊", content: "Ponce Inlet is Florida's secret weapon. The outgoing tidal current flowing through the inlet collides with incoming NE swells and produces a standing-wave effect — hollow, fast, punchy peaks that far exceed what the surrounding open beach offers. Outgoing mid-tide is the magic window. The current is strong here — do not surf the inlet if you cannot read and manage tidal flow." },
      { title: "Swell Magnification", icon: "📡", content: "New Smyrna's positioning and the inlet's geometry magnify even small NE swells. A 2ft NE wind swell that barely registers on the Jacksonville surf cams can produce head-high+ punchy peaks at the NSB inlet. This is why it is Florida's most consistent surf destination." },
      { title: "Hurricane Positioning", icon: "🌊", content: "NSB sits in a particularly good position for hurricane swells tracking up the Atlantic. Swells from systems passing east of the Bahamas wrap into the Volusia County coast in a way that produces several days of quality surf before and after the system passes." },
    ],

    hazards: [
      { level: "medium", title: "Inlet Tidal Current",  detail: "The Ponce Inlet current is strong on outgoing tides — exactly when the best surf is produced. Surfers not respecting the current get swept into the inlet channel. Always paddle out via the north side and keep the inlet structure visible as a reference." },
      { level: "medium", title: "Sharks",               detail: "The blacktip shark population around Ponce Inlet is well-documented. Incidents are almost exclusively minor bites on feet and hands — exploratory rather than predatory. Avoid surfing at dawn and dusk, avoid the inlet channel (where sharks feed), and exit the water if baitfish activity is visible." },
      { level: "low",    title: "Summer Crowds",        detail: "NSB's reputation draws significant crowds during summer hurricane threats. The inlet zone is particularly crowded. Arrive early or surf the open beach sections for more space." },
    ],

    access: {
      overview: "New Smyrna Beach is on Volusia County's Atlantic coast, accessed from I-95 via SR-44. Ponce Inlet is at the south end of the beach — follow A1A south from the main beach area.",
      steps: [
        "Take I-95 to SR-44 exit and head east to New Smyrna Beach",
        "Cross the causeway to the beach island and take A1A south toward Ponce Inlet",
        "Park at the Inlet Parking area — there is a fee in season",
        "Walk north along the beach from the inlet to find the best sandbars",
        "アイドル zone is the north side of the inlet jetty — clearly visible",
      ],
      tip: "The outgoing tide window at the inlet is the premium session. Check tide charts the night before and plan to be in the water as the tide transitions from high to mid outgoing — this usually produces the cleanest, most consistent peaks of the day.",
    },

    seasonChart: [
      { month: "Jan", swell: 5, wind: 5, overall: 5 }, { month: "Feb", swell: 5, wind: 5, overall: 5 },
      { month: "Mar", swell: 4, wind: 5, overall: 4 }, { month: "Apr", swell: 3, wind: 6, overall: 4 },
      { month: "May", swell: 3, wind: 6, overall: 3 }, { month: "Jun", swell: 3, wind: 6, overall: 3 },
      { month: "Jul", swell: 4, wind: 6, overall: 4 }, { month: "Aug", swell: 6, wind: 7, overall: 6 },
      { month: "Sep", swell: 8, wind: 7, overall: 8 }, { month: "Oct", swell: 7, wind: 6, overall: 7 },
      { month: "Nov", swell: 6, wind: 5, overall: 6 }, { month: "Dec", swell: 5, wind: 5, overall: 5 },
    ],
    seasonNote: "Florida's most consistently good surf. The inlet effect amplifies even marginal NE swells year-round. September–October is the peak for both hurricane swell and NE frontal swell overlap. Winter fronts deliver reliable consistency. Summer is the quietest but the inlet still fires on tropical activity.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1464899582853-b8b8e01e3ac0?w=900&q=80", caption: "New Smyrna Beach — Florida's surf capital" },
      { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", caption: "Ponce Inlet — the outgoing tide magic window" },
      { url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80", caption: "NSB inlet zone at low-mid tide" },
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "NE groundswell — New Smyrna at its best" },
    ],
  },

  us_cocoa_beach: {
    name: "Cocoa Beach Pier",
    region: "Cocoa Beach, Florida",
    country: "USA",
    tagline: "The birthplace of Kelly Slater — an iconic Florida beachbreak pier town with consistent NE swell peaks and a surfing culture that runs generations deep.",

    difficulty: { level: 1, label: "All Levels",
      note: "Accessible, forgiving beach break. Small to moderate waves suit all levels. The pier produces marginally better sandbars but the same pier-proximity hazard applies." },

    heroImage: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1800&q=85",

    stats: [
      { label: "Break Type",   value: "Beach Break (Pier)"     },
      { label: "Wave Type",    value: "Left & Right"           },
      { label: "Best Swell",   value: "NE – E"                 },
      { label: "Swell Size",   value: "1 – 4ft"                },
      { label: "Best Wind",    value: "W Offshore"             },
      { label: "Best Tide",    value: "Low to Mid"             },
      { label: "Legacy",       value: "Kelly Slater's home"    },
    ],

    story: {
      heading: "Where Legends Are Made",
      body: [
        "Kelly Slater grew up surfing the waves at Cocoa Beach. Eleven world titles later, this unassuming stretch of Florida beachbreak has become one of surfing's most famous origin stories. The town has embraced the identity — the Ron Jon Surf Shop here is the largest surf shop in the world and a pilgrimage site in its own right.",
        "The surf is honest Florida beach break — rarely epic, often fun, always there for the community that surrounds it. The pier influences the sandbars in the same way piers do everywhere and produces marginally better waves than the open beach sections. The real value of Cocoa Beach is its accessibility, its central Space Coast location, and its uninterrupted surf culture.",
      ],
    },

    technical: [
      { title: "Pier Break", icon: "🌊", content: "The pier creates sandbar interference that produces better-defined peaks on both sides. The north side is typically longer and more consistent; the south side can be more hollow on the right NE swells." },
      { title: "Space Coast Swell Window", icon: "📡", content: "Cocoa Beach is in the middle of the Florida Space Coast — the area south of the Cape Canaveral Air Force Station. Its orientation faces slightly more east-southeast than the northern spots, making it marginally more sensitive to SE components from tropical systems." },
    ],

    hazards: [
      { level: "high",   title: "Pier Proximity",   detail: "Same as all Florida pier breaks — never surf within 20 metres of the pier structure. Current can push you against the pilings in larger surf." },
      { level: "medium", title: "Rip Currents",     detail: "Rip channels form around the pier structure. Use them for paddle-out, then angle across them once out the back." },
      { level: "low",    title: "Surf School Zone", detail: "Cocoa Beach has numerous surf schools that use the beach in front of the pier. Watch for beginners on foamies in the inside section." },
    ],

    access: {
      overview: "Cocoa Beach Pier is at 401 Meade Ave, Cocoa Beach. Central A1A access with public parking nearby.",
      steps: [
        "Take SR-528 (Beachline Expressway) east from I-95 to Cocoa Beach",
        "Turn south on A1A — Cocoa Beach Pier is clearly marked",
        "Park in the public lots on Meade Ave",
        "Check both sides of the pier before choosing your spot",
      ],
      tip: "The Ron Jon Surf Shop two blocks from the pier is open 24 hours and has a good surf report board. The staff know current conditions better than any app.",
    },

    seasonChart: [
      { month: "Jan", swell: 5, wind: 5, overall: 5 }, { month: "Feb", swell: 4, wind: 5, overall: 5 },
      { month: "Mar", swell: 4, wind: 5, overall: 4 }, { month: "Apr", swell: 3, wind: 5, overall: 3 },
      { month: "May", swell: 2, wind: 6, overall: 3 }, { month: "Jun", swell: 2, wind: 6, overall: 2 },
      { month: "Jul", swell: 3, wind: 6, overall: 3 }, { month: "Aug", swell: 5, wind: 7, overall: 6 },
      { month: "Sep", swell: 7, wind: 7, overall: 7 }, { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 5, wind: 5, overall: 5 }, { month: "Dec", swell: 5, wind: 5, overall: 5 },
    ],
    seasonNote: "Best Sept–Oct (hurricane season) and winter fronts (Nov–Feb). Summer is generally flat.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", caption: "Cocoa Beach Pier — Kelly Slater's home break" },
      { url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80", caption: "Florida beach break — NE swell peaks" },
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "Space Coast sunrise — dawn patrol" },
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "Clean NE swell at the Cocoa Beach pier" },
    ],
  },

  us_sebastian_inlet: {
    name: "Sebastian Inlet",
    region: "Sebastian, Florida",
    country: "USA",
    tagline: "The best wave in Florida — First Peak at Sebastian Inlet is a powerful, hollow right-hander that produces legitimate barrels and a competitive lineup that has produced world-class surfers for decades.",

    difficulty: { level: 3, label: "Intermediate / Advanced",
      note: "First Peak is Florida's most demanding regular surf break. The wave is fast and hollow for Florida standards. Intermediates with solid reef/inlet experience can surf here safely. Beginners should use the more protected south jetty area." },

    heroImage: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1800&q=85",

    stats: [
      { label: "Break Type",   value: "Inlet Break"             },
      { label: "Wave Type",    value: "Right (First Peak)"      },
      { label: "Best Swell",   value: "NE – E (and hurricane)"  },
      { label: "Swell Size",   value: "2 – 8ft"                 },
      { label: "Best Wind",    value: "W – SW Offshore"         },
      { label: "Best Tide",    value: "Outgoing"                },
      { label: "Fun Factor",   value: "9 / 10 (when on)"        },
    ],

    story: {
      heading: "Florida's First Peak",
      body: [
        "Sebastian Inlet is a water management inlet cut through the barrier island between the Indian River Lagoon and the Atlantic Ocean. The combination of the inlet's tidal flow and NE swell produces, at its First Peak section, the best and most consistently hollow wave in Florida. Surfers have driven from Miami and Jacksonville for a good day at Sebastian since the 1960s.",
        "First Peak works on the outgoing tide — the water flowing out of the inlet through the north side of the jetty structure collides with incoming NE swell to produce a standing-wave-like, fast right-hander. On the best days, with a proper NE groundswell and strong outgoing tide, First Peak is a genuinely powerful, hollow wave that barrels with conviction over a sand and shell bottom.",
        "The local surf community at Sebastian is serious and competitive. The Florida Pro, one of the only professional surf contests regularly held in the state, has run at Sebastian multiple times. The lineup at First Peak has a distinct pecking order — respect it.",
      ],
    },

    technical: [
      { title: "First Peak Mechanics", icon: "🌊", content: "The outgoing tidal flow through the inlet's north side pushes against incoming NE swell, jacking up the wave and producing a hollow, fast right-hander. The power and hollowness are directly proportional to the speed of the outgoing current — a strong outgoing tide on a solid NE swell produces genuine barrels. As the tide ebbs further, the peak moves and the wave becomes more sectiony." },
      { title: "Tidal Timing", icon: "🌊", content: "The window is 2–3 hours around the outgoing mid-tide. Too early in the outgoing and the current hasn't fully engaged. Too late (low tide) and the peak moves inside and loses shape. Check tide charts and aim to be in the water as the tide transitions through the mid-outgoing stage." },
      { title: "Hurricane Swell Performance", icon: "📡", content: "Sebastian Inlet is one of the best-positioned spots on the Florida coast for hurricane swells. The inlet's geometry amplifies E–NE swells from tropical systems and the outgoing tide effect is strongest during the energetic, consistent swell that tropical systems produce before they make landfall or pass offshore." },
      { title: "South Jetty Alternative", icon: "🏄", content: "The south jetty area is the gentler alternative — a beach break protected by the south side of the inlet that produces smaller, more forgiving waves. This is where beginners and kids learn. If First Peak looks too intense, the south jetty will have waves more appropriate for intermediates." },
    ],

    hazards: [
      { level: "high",   title: "Inlet Current",           detail: "The outgoing tidal current at Sebastian is strong — this is what makes the wave but also what makes it dangerous. Surfers caught in the main current during a large outgoing can be swept rapidly toward the open ocean. Never fight the current directly — angle across it toward the north jetty rocks to exit." },
      { level: "high",   title: "Jetty Rocks",             detail: "The north jetty rocks are immediately adjacent to First Peak. Any sideways wipeout or current push toward the rocks is a serious hazard. Know the position of the rocks relative to the peak before paddling out and never get caught between a set wave and the rocks." },
      { level: "medium", title: "Competitive Lineup",      detail: "Sebastian's First Peak has one of the most competitive lineups in Florida. Strict wave priority is observed. Dropping in is not tolerated. Sit wide on your first session and observe before going for set waves." },
      { level: "low",    title: "Stingrays & Shells",      detail: "The sandy bottom at Sebastian has stingrays and scattered shells. Do the stingray shuffle (sliding feet rather than stepping) when walking in shallow water to avoid stepping on them." },
    ],

    access: {
      overview: "Sebastian Inlet State Park is on SR-A1A between Melbourne Beach and Vero Beach. There is a state park entry fee. First Peak is on the north side of the inlet — clearly signposted within the park.",
      steps: [
        "Take I-95 to SR-512 east, then south on A1A to Sebastian Inlet State Park",
        "Pay the state park entry fee at the gate",
        "Drive to the north inlet parking area — First Peak is visible from the car park",
        "Check conditions from the jetty walkway before entering — the wave is clearly visible",
        "Entry via the beach — paddle north along the inlet channel to reach the peak",
      ],
      tip: "Download a tide chart app before visiting Sebastian and plan your session around the outgoing tide. Arriving at slack high tide and surfing through the first 2–3 hours of outgoing produces the best First Peak conditions of the day. The park's camp store sells snacks and drinks.",
    },

    seasonChart: [
      { month: "Jan", swell: 6, wind: 5, overall: 5 }, { month: "Feb", swell: 5, wind: 6, overall: 5 },
      { month: "Mar", swell: 4, wind: 6, overall: 5 }, { month: "Apr", swell: 3, wind: 6, overall: 4 },
      { month: "May", swell: 2, wind: 6, overall: 3 }, { month: "Jun", swell: 2, wind: 6, overall: 3 },
      { month: "Jul", swell: 3, wind: 6, overall: 4 }, { month: "Aug", swell: 6, wind: 7, overall: 6 },
      { month: "Sep", swell: 8, wind: 7, overall: 8 }, { month: "Oct", swell: 7, wind: 6, overall: 7 },
      { month: "Nov", swell: 6, wind: 5, overall: 6 }, { month: "Dec", swell: 6, wind: 5, overall: 6 },
    ],
    seasonNote: "Florida's most rewarding surf spot across all seasons. The inlet effect means it fires on smaller swells than the open beach spots. September–October is the peak for hurricane swell + strong outgoing tide overlap. Winter NE fronts are reliable and the wave is powerful in cold water. Wetsuit needed November–March.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "First Peak firing — Florida's best wave" },
      { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", caption: "Sebastian Inlet — the north jetty view" },
      { url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80", caption: "Outgoing tide + NE swell = magic" },
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "Hurricane swell at the inlet — rare but spectacular" },
    ],
  },

  us_reef_road: {
    name: "Reef Road",
    region: "Palm Beach, Florida",
    country: "USA",
    tagline: "South Florida's most powerful wave — a winter right-hander that breaks over a genuine rock and sand bottom, drawing a small but devoted crew of experienced surfers when a proper NE swell fires.",

    difficulty: { level: 3, label: "Advanced",
      note: "Reef Road is the most powerful regular surf break in South Florida. The wave breaks over a rocky reef structure, not sand — wipeouts have harder consequences than open beach breaks. Not suitable for beginners." },

    heroImage: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1800&q=85",

    stats: [
      { label: "Break Type",   value: "Reef / Rock Bottom"     },
      { label: "Wave Type",    value: "Right-hander"           },
      { label: "Best Swell",   value: "NE – N (winter fronts)" },
      { label: "Swell Size",   value: "2 – 8ft"                },
      { label: "Best Wind",    value: "W – SW Offshore"        },
      { label: "Best Tide",    value: "Low to Mid"             },
      { label: "Season",       value: "Winter (Nov–Mar)"       },
    ],

    story: {
      heading: "South Florida's Secret Reef",
      body: [
        "South Florida is not known as a surf destination — the wide continental shelf and lack of exposed coastline means most of the state's south end is sheltered from the swells that produce quality surf further north. Reef Road is the exception. Located in Palm Beach, the break sits over a rocky bottom structure that produces a genuine right-hander when winter NE swells arrive.",
        "The wave is most active November through March, when cold fronts track across the Southeast US and send NE wind swells down the coast. On the best days, Reef Road produces powerful, fast rights that compare favourably with the better inlet breaks further north. The small local crew that surfs here year-round are among the most experienced and territorial in South Florida.",
      ],
    },

    technical: [
      { title: "Rock Bottom", icon: "🪨", content: "Unlike virtually every other South Florida surf spot, Reef Road breaks over a shallow rock and reef structure. This produces steeper, more powerful waves than the surrounding sandbars and means wipeouts carry harder consequences. Booties recommended." },
      { title: "Winter Dependence", icon: "📡", content: "Reef Road needs N to NE swells that travel down the Atlantic coast from winter low-pressure systems. These swells are most frequent November through March. Summer is almost entirely flat here." },
    ],

    hazards: [
      { level: "high",   title: "Rocky Reef Bottom",      detail: "The reef at Reef Road is hard and uneven. Wipeouts at speed can result in contact with the bottom. Check for sharp outcroppings at low tide before paddling out." },
      { level: "medium", title: "Strong Rip Current",     detail: "A rip channel runs along the reef. It intensifies during NE swells and can be difficult to exit. Always identify the channel before paddling out." },
      { level: "medium", title: "Territorial Lineup",     detail: "The small Reef Road crew has surfed this spot for decades. Respect priority and lineage. Sit wide and observe on your first session." },
    ],

    access: {
      overview: "Reef Road Beach is in Palm Beach at the end of Reef Road (private road) — accessible via the public parking at Phipps Ocean Park on S Ocean Blvd.",
      steps: [
        "Take I-95 to Southern Blvd (US-98) east across the bridge to Palm Beach Island",
        "Head south on S Ocean Blvd to Phipps Ocean Park",
        "Park at the public beach access",
        "Walk south along the beach to the reef section — visible at low tide",
      ],
      tip: "Reef Road is worth checking every time a NE cold front is forecast for Palm Beach County. Check NOAA buoy 41047 (East of Jacksonville) for incoming swell data 24–48 hours ahead.",
    },

    seasonChart: [
      { month: "Jan", swell: 7, wind: 5, overall: 6 }, { month: "Feb", swell: 7, wind: 6, overall: 6 },
      { month: "Mar", swell: 5, wind: 6, overall: 5 }, { month: "Apr", swell: 3, wind: 5, overall: 3 },
      { month: "May", swell: 2, wind: 5, overall: 2 }, { month: "Jun", swell: 1, wind: 5, overall: 1 },
      { month: "Jul", swell: 2, wind: 5, overall: 2 }, { month: "Aug", swell: 4, wind: 6, overall: 4 },
      { month: "Sep", swell: 6, wind: 6, overall: 6 }, { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 6, wind: 5, overall: 6 }, { month: "Dec", swell: 7, wind: 5, overall: 6 },
    ],
    seasonNote: "A winter specialist. Best November–February when cold fronts send NE swells down the Atlantic coast. The rock bottom means it activates more readily than surrounding sandbars. Summer is largely irrelevant for surfing here.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "Reef Road — winter right-hander over the rocky bottom" },
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "NE front arriving at Palm Beach" },
      { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", caption: "South Florida coastline — the reef visible at low tide" },
      { url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80", caption: "Winter session at Reef Road" },
    ],
  },

  // ─── Gulf Coast ────────────────────────────────────────────────────────────

  us_venice_jetty: {
    name: "Venice Jetty",
    region: "Venice, Florida",
    country: "USA",
    tagline: "Florida's Gulf Coast answer — the state's most consistent Gulf surf spot, where the jetty anchors sandbar formations that fire on W–NW swells and tropical storm activity in the warm, calm waters of the Gulf of Mexico.",

    difficulty: { level: 1, label: "All Levels",
      note: "Gulf waves are generally smaller and more forgiving than Atlantic equivalents. Venice Jetty is accessible to all levels. The current near the jetty structure is the primary hazard." },

    heroImage: "https://images.unsplash.com/photo-1464899582853-b8b8e01e3ac0?w=1800&q=85",

    stats: [
      { label: "Break Type",   value: "Beach Break (Jetty)"     },
      { label: "Wave Type",    value: "Left & Right"            },
      { label: "Best Swell",   value: "W – NW (or Tropical S)"  },
      { label: "Swell Size",   value: "1 – 4ft"                 },
      { label: "Best Wind",    value: "E – NE Offshore"         },
      { label: "Best Tide",    value: "Mid tide"                },
      { label: "Water Temp",   value: "20°C (Jan) – 31°C (Aug)" },
    ],

    story: {
      heading: "Gulf Coast Surfing",
      body: [
        "The Gulf of Mexico is not a traditional surfing destination — the enclosed sea limits fetch and produces mostly short-period, moderate-height wind swells. But Venice has built a dedicated surf culture around precisely those conditions, and the jetty here provides the same sandbar enhancement effect that piers do on the Atlantic side.",
        "The Gulf surf is warm, clear, and genuinely enjoyable when conditions align. W and NW frontal swells during winter and spring, and S swells from tropical disturbances in summer and autumn, are the twin pillars of the Venice surf calendar. The best days are nowhere near as powerful as the Atlantic spots but they are fun, accessible, and often entirely crowd-free.",
      ],
    },

    technical: [
      { title: "Gulf Swell Character", icon: "🌊", content: "Gulf swells are short-period (4–7s) and moderate height by design — the enclosed sea limits how much swell can build. Venice works best on W–NW winter frontal swells of 2–4ft. Tropical systems in the Gulf (rare but powerful) are the exception and can produce much larger surf." },
      { title: "Jetty Effect", icon: "🌊", content: "The Venice Inlet jetty structures on both sides of the inlet produce sandbar interference that creates better-defined peaks than the open Gulf beach. North of the north jetty is the primary surf zone." },
    ],

    hazards: [
      { level: "medium", title: "Jetty Current",   detail: "The Venice Inlet current can be strong on outgoing tides — similar dynamics to the Atlantic inlet breaks but at smaller scale. Stay north of the north jetty structure and away from the direct inlet channel." },
      { level: "low",    title: "Sharks",          detail: "Bull sharks are present in the warm Gulf waters. Venice is known for fossil shark teeth washing up on the beach — a reminder of the Gulf's shark population. Avoid surfing at dawn, dusk, or when fish are visibly active." },
    ],

    access: {
      overview: "Venice Jetty is at the south end of Venice Beach, accessed from Harbor Drive S off US-41.",
      steps: [
        "From I-75 take Exit 193 west toward Venice",
        "Follow US-41 to Venice and then Harbor Drive S toward the jetty",
        "Park at the jetty parking area — there may be a fee in peak season",
        "Walk to the beach on the north side of the north jetty",
      ],
      tip: "Venice Beach is also famous for fossil shark teeth — bring a small scoop and sift the sand at the waterline for megalodon teeth fragments. This is as much a fossil-hunting destination as a surf destination.",
    },

    seasonChart: [
      { month: "Jan", swell: 5, wind: 5, overall: 5 }, { month: "Feb", swell: 5, wind: 5, overall: 5 },
      { month: "Mar", swell: 5, wind: 6, overall: 5 }, { month: "Apr", swell: 4, wind: 6, overall: 4 },
      { month: "May", swell: 3, wind: 6, overall: 3 }, { month: "Jun", swell: 3, wind: 5, overall: 3 },
      { month: "Jul", swell: 4, wind: 5, overall: 4 }, { month: "Aug", swell: 5, wind: 6, overall: 5 },
      { month: "Sep", swell: 6, wind: 6, overall: 6 }, { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 5, wind: 5, overall: 5 }, { month: "Dec", swell: 5, wind: 5, overall: 5 },
    ],
    seasonNote: "Remarkably consistent year-round by Florida standards, simply because W–NW frontal swells occur in winter and tropical S swells fill the summer gaps. Never huge, always warm, often uncrowded.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1464899582853-b8b8e01e3ac0?w=900&q=80", caption: "Venice Jetty — Gulf Coast beach break" },
      { url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80", caption: "Warm Gulf waters and sandy peaks" },
      { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", caption: "NW winter swell arriving at the Venice jetty" },
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "Gulf of Mexico sunset surf session" },
    ],
  },

  us_pensacola_pier: {
    name: "Pensacola Beach Pier",
    region: "Pensacola Beach, Florida",
    country: "USA",
    tagline: "The Panhandle's surf hub — a white-sand Gulf barrier island pier break that fires on tropical storm swells and delivers some of the Florida Gulf Coast's most surprising surf.",

    difficulty: { level: 1, label: "All Levels",
      note: "Gulf Coast beach break suitable for all levels in normal conditions. Hurricane swell can push it to intermediate level. The pier proximity is the main hazard." },

    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85",

    stats: [
      { label: "Break Type",   value: "Beach Break (Pier)"      },
      { label: "Wave Type",    value: "Left & Right"            },
      { label: "Best Swell",   value: "S – SW (tropical)"       },
      { label: "Swell Size",   value: "1 – 5ft"                 },
      { label: "Best Wind",    value: "N – NE Offshore"         },
      { label: "Best Tide",    value: "Mid tide"                },
      { label: "Water Temp",   value: "16°C (Jan) – 30°C (Aug)" },
    ],

    story: {
      heading: "The Panhandle Pier",
      body: [
        "Pensacola Beach is on Santa Rosa Island, a narrow barrier island of brilliant white quartz sand on Florida's northwest Gulf coast — the Florida Panhandle. The pier here is the gathering point for Northwest Florida's surf community, a group accustomed to waiting out flat spells between the relatively infrequent tropical systems that generate surfable surf this far north and west in the Gulf.",
        "When a tropical system enters the Gulf and tracks west, Pensacola can receive S to SW swells that produce the best surf on the Panhandle coast. The pier amplifies sandbar formation and the white sand beach provides a dramatic backdrop. Hurricane Katrina produced legendary surf here in 2005 that is still talked about locally.",
      ],
    },

    technical: [
      { title: "Tropical Swell Dependence", icon: "📡", content: "Pensacola's surf is almost entirely driven by tropical activity. The Gulf is enclosed and the Panhandle orientation (facing south) means only S–SW swells from Gulf tropical systems produce quality surf. Monitor Gulf tropical activity June–October." },
      { title: "Pier Sandbar Effect", icon: "🌊", content: "The pier creates sandbars on both sides. The east side (downwind from typical S swells) tends to produce longer walls. The west side can be more hollow on direct S swell." },
    ],

    hazards: [
      { level: "high",   title: "Pier Structure",    detail: "Never surf within 20 metres of the pier in any surf. Gulf swells can push you toward the pilings faster than expected." },
      { level: "medium", title: "Hurricane Approach", detail: "When Pensacola receives good surf from a Gulf tropical system, that system is relatively close to land. Monitor NHC advisories and have an evacuation plan. Do not surf in conditions that are approaching unsafe levels for any onshore activity." },
    ],

    access: {
      overview: "Pensacola Beach Pier is on Via De Luna Drive, Pensacola Beach. Cross the Bob Sikes Bridge from Gulf Breeze to Pensacola Beach and follow the main road to the pier.",
      steps: [
        "From Pensacola, cross the Bob Sikes Bridge onto Santa Rosa Island",
        "Follow Via De Luna Drive east to the pier",
        "Park in the lots near the pier",
        "Check both sides of the pier from the pier walkway before entering",
      ],
      tip: "The Pensacola surf community is tight-knit and welcoming. Ask at any of the local surf shops about current conditions and which tropical systems are worth positioning for.",
    },

    seasonChart: [
      { month: "Jan", swell: 3, wind: 3, overall: 3 }, { month: "Feb", swell: 3, wind: 3, overall: 3 },
      { month: "Mar", swell: 3, wind: 4, overall: 3 }, { month: "Apr", swell: 2, wind: 5, overall: 3 },
      { month: "May", swell: 2, wind: 5, overall: 2 }, { month: "Jun", swell: 3, wind: 5, overall: 3 },
      { month: "Jul", swell: 5, wind: 6, overall: 5 }, { month: "Aug", swell: 6, wind: 7, overall: 6 },
      { month: "Sep", swell: 7, wind: 6, overall: 7 }, { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 4, wind: 4, overall: 4 }, { month: "Dec", swell: 3, wind: 3, overall: 3 },
    ],
    seasonNote: "Hurricane season (July–October) is the surf season. Outside of tropical activity, Pensacola is largely flat. The trade-off: when it fires, the warm Gulf water, white sand, and uncrowded lineup make it a memorable experience.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80", caption: "Pensacola Beach Pier — white sand Panhandle surf" },
      { url: "https://images.unsplash.com/photo-1464899582853-b8b8e01e3ac0?w=900&q=80", caption: "Tropical swell approaching the Gulf Panhandle" },
      { url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80", caption: "S swell peaks on the Gulf coast" },
      { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", caption: "Santa Rosa Island — the Panhandle barrier island setting" },
    ],
  },

  us_pcb_pier: {
    name: "Panama City Beach Pier",
    region: "Panama City Beach, Florida",
    country: "USA",
    tagline: "The Redneck Riviera's surf pier — a busy Gulf resort beach that transforms into an active surf zone when tropical systems push S swells into the Panhandle.",

    difficulty: { level: 1, label: "All Levels",
      note: "Tourist-heavy beach in summer that becomes a fun surf zone during tropical swell windows. All levels welcome. The pier proximity and summer crowd density are the main considerations." },

    heroImage: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1800&q=85",

    stats: [
      { label: "Break Type",   value: "Beach Break (Pier)"     },
      { label: "Wave Type",    value: "Left & Right"           },
      { label: "Best Swell",   value: "S – SW (tropical)"      },
      { label: "Swell Size",   value: "1 – 4ft"                },
      { label: "Best Wind",    value: "N – NE Offshore"        },
      { label: "Best Tide",    value: "Mid tide"               },
      { label: "Water Temp",   value: "17°C (Jan) – 31°C (Aug)" },
    ],

    story: {
      heading: "Gulf Surf Between the Spring Breakers",
      body: [
        "Panama City Beach is one of the most popular tourist beach destinations in the United States — its nickname 'The Redneck Riviera' is worn with local pride. It is also a legitimate surf destination during tropical swell events, when the PCB Pier anchors the sandbar formations that produce the Gulf's characteristic short, punchy beach break peaks.",
        "Like Pensacola 90 miles to the west, PCB surf is almost entirely tropical-dependent. The S to SW swells that Gulf tropical systems generate produce the year's best surf, typically during the July–October window. Outside of tropical activity, the Gulf here is flat and warm — ideal for swimming, not for surfing.",
        "The combination of warm water, white sand, and the occasional tropical swell makes PCB a genuinely enjoyable surf spot when conditions align — just be prepared to share the beach with a very large non-surfing population.",
      ],
    },

    technical: [
      { title: "Tourist Season Management", icon: "🏄", content: "Summer is both the best swell season (tropical activity) and the busiest tourist season. The beach is patrolled and swim zones are enforced. Know where the surf zone is relative to the swim zones and stay within designated surf areas." },
      { title: "Gulf Swell Windows", icon: "📡", content: "Monitor Gulf tropical activity closely during July–October. S to SW swells from Gulf systems can produce 2–4 days of quality surf before the system makes landfall. The arrival of the swell is usually the best time — before local wind conditions deteriorate." },
    ],

    hazards: [
      { level: "high",   title: "Summer Crowd Density", detail: "Panama City Beach in summer has extremely high beach density. The surf zone overlaps with swim zones and recreational boat traffic. Be very visible and avoid paddling near watercraft lanes." },
      { level: "medium", title: "Pier Structure",        detail: "Same pier proximity rule applies — 20+ metres clearance at all times." },
      { level: "low",    title: "Jellyfish",             detail: "Sea nettles are common in Gulf waters in late summer. Check with lifeguards before extended sessions." },
    ],

    access: {
      overview: "Panama City Beach Pier is at 16101 Front Beach Rd, Panama City Beach. Multiple public beach accesses along Front Beach Road (US-98).",
      steps: [
        "Take US-98 (Panama City Beach Pkwy) west across the bridge from Panama City to the beach",
        "Head west along Front Beach Road — the pier is clearly marked",
        "Park in the public lots along Front Beach Road",
        "The surf zone is north (away from the pier) and within designated surf areas",
      ],
      tip: "Check NOAA Gulf of Mexico tropical outlook June–October. When a tropical system enters the central or eastern Gulf, begin tracking its path — a westward track produces the best swell for PCB. The window between system entry and landfall is usually 2–4 days.",
    },

    seasonChart: [
      { month: "Jan", swell: 3, wind: 3, overall: 3 }, { month: "Feb", swell: 3, wind: 3, overall: 3 },
      { month: "Mar", swell: 3, wind: 4, overall: 3 }, { month: "Apr", swell: 2, wind: 5, overall: 2 },
      { month: "May", swell: 2, wind: 5, overall: 2 }, { month: "Jun", swell: 3, wind: 5, overall: 3 },
      { month: "Jul", swell: 5, wind: 6, overall: 5 }, { month: "Aug", swell: 6, wind: 6, overall: 5 },
      { month: "Sep", swell: 6, wind: 6, overall: 6 }, { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 3, wind: 4, overall: 3 }, { month: "Dec", swell: 3, wind: 3, overall: 3 },
    ],
    seasonNote: "Hurricane/tropical season July–October is the surf season. The rest of the year is largely flat. When it fires, the warm water and white sand deliver a beach break experience that is hard to beat for fun-per-effort in the entire state.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "Panama City Beach Pier — Gulf surf in a holiday town" },
      { url: "https://images.unsplash.com/photo-1464899582853-b8b8e01e3ac0?w=900&q=80", caption: "Tropical swell peaks on the Gulf Panhandle" },
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80", caption: "White sand Panhandle beach — the PCB setting" },
      { url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80", caption: "S swell window — Gulf coast beach break" },
    ],
  },
};
