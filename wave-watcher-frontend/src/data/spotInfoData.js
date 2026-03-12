/**
 * spotInfoData.js
 *
 * Static editorial content for the Spot Info page.
 * Keyed by spot ID matching spotConfig.js.
 *
 * TO ADD A NEW SPOT:
 * 1. Add an entry below using the same structure as ujung_bocur
 * 2. The SpotInfo page will render it automatically via the spot ID from the URL
 */

export const SPOT_INFO = {
  ujung_bocur: {
    // ── Identity ────────────────────────────────────────────────────────────
    name: "Ujung Bocur",
    region: "Krui, Lampung, Sumatra",
    country: "Indonesia",
    tagline:
      "The crown jewel of the Krui coast — a freight-train left that breaks over a sharp reef with military precision.",

    difficulty: {
      level: 3,
      label: "Intermediate / Advanced",
      note: "More approachable than most Indonesian lefts. Intermediates will love the long rippable walls; experts will want to push deeper for the barrel sections. Gets significantly more challenging when a large west swell is running.",
    },

    // ── Hero image (use a high-quality Unsplash/Pexels ocean URL or a local asset path) ──
    heroImage: "Ujung-Bocur.jpg",

    // ── Quick stats ─────────────────────────────────────────────────────────
    stats: [
      { label: "Break Type", value: "Reef Break" },
      { label: "Wave Type", value: "Left-hand barrel" },
      { label: "Best Swell", value: "SW – W (works all directions)" },
      { label: "Best Wind", value: "SE – E Offshore" },
      { label: "Swell Size", value: "1 – 8ft (ocean)" },
      { label: "Best Tide", value: "Mid to High" },
      { label: "Bottom", value: "Sharp reef" },
      { label: "Crowd Factor", value: "8 / 10" },
      { label: "Fun Factor", value: "9 / 10" },
    ],

    // ── Story ────────────────────────────────────────────────────────────────
    story: {
      heading: "A Secret That Got Out",
      body: [
        "Ujung Bocur sits at the southern tip of the Krui coastline, a stretch of Sumatra's west coast that remained largely unknown to the surfing world until the late 1990s. Local fishermen had watched perfect barrels unload on the reef for generations before the first travelling surfers stumbled upon the region.",
        "The wave breaks over a shallow reef shelf that juts out from a headland, creating a long, mechanical left-hander that draws comparisons to G-Land but with a fraction of the crowd. At full size, the wave stands up on the outer reef, pitches a heavy lip, and walls along for 50–100 metres before closing out in the channel.",
        "The Krui region gained recognition in the early 2000s as one of Indonesia's last frontier surf destinations. Today it attracts a devoted following of barrel hunters who come specifically for Ujung Bocur and the cluster of world-class waves that surround it.",
      ],
    },

    // ── Technical breakdown ──────────────────────────────────────────────────
    technical: [
      {
        title: "Swell Window",
        icon: "🌊",
        content:
          "Picks up virtually any south to south-southwest swell generated in the southern Indian Ocean. The headland provides some protection from cross-swells, keeping the face clean even on mid-size days.",
      },
      {
        title: "Tidal Influence",
        icon: "🌊",
        content:
          "Works across most tides but the wave transforms significantly with water movement. Mid to high tide fills in the dry-reef sections and allows the wave to barrel further. Low tide exposes the reef and makes wipeouts significantly more consequential.",
      },
      {
        title: "Wind Sensitivity",
        icon: "💨",
        content:
          "The ideal wind is light E to SE — blowing from land across the face of the wave. The Sumatran coast benefits from a reliable offshore morning window before the sea breeze fills in from the west around midday. Plan sessions for first light to 11am.",
      },
      {
        title: "Crowd & Lineup",
        icon: "🏄",
        content:
          "Far from overcrowded by Bali standards. The remote location self-selects for experienced surfers. The takeoff zone is well-defined and the lineup has an unspoken order. Respect local surfers and visiting regulars — aggression is rare but priority is taken seriously.",
      },
    ],

    // ── Hazards ──────────────────────────────────────────────────────────────
    hazards: [
      {
        level: "high", // high | medium | low
        title: "Shallow Reef",
        detail:
          "The reef shelf is extremely shallow at low tide. Wipeouts at full speed result in direct contact with sharp coral and rock. Reef booties are strongly recommended.",
      },
      {
        level: "high",
        title: "Rip Currents",
        detail:
          "A strong lateral rip runs along the reef edge on larger swells. It can drag surfers into the impact zone quickly. Know your exit channel before paddling out.",
      },
      {
        level: "medium",
        title: "Remote Location",
        detail:
          "Medical facilities in Krui are basic. The nearest hospital is in Bandar Lampung, approximately 3–4 hours by road. Travel with a first aid kit and know how to manage reef injuries.",
      },
      {
        level: "low",
        title: "Boat Traffic",
        detail:
          "Local fishing boats use the channel adjacent to the break. Visibility of surfers from the boats is limited on large swell days. Stay aware during paddle-outs.",
      },
    ],

    // ── Access ───────────────────────────────────────────────────────────────
    access: {
      overview:
        "Ujung Bocur is accessible by road from Krui town (approx. 8km south) via a sealed road that winds through the headland. The final 1km is a dirt track to the beach.",
      steps: [
        "Fly into Bandar Lampung (TKG) — the nearest international-linked airport",
        "Take a car or bus northwest along the Trans-Sumatran highway (~270km, 5–6 hours)",
        "Arrive in Krui town — accommodation ranges from homestays to surf camps",
        "Hire a scooter or ojek (motorcycle taxi) for the 8km ride to Ujung Bocur",
        "Park at the small warung (food stall) near the dirt track — the break is a 5-minute walk",
      ],
      tip: "Most surfers base themselves in Krui town or at one of the surf camps between Krui and Way Jambu. The camps often run shuttle transfers to Ujung Bocur for the morning session.",
    },

    // ── Best season (monthly swell quality score 1–10) ───────────────────────
    // Based on historical Indian Ocean swell patterns and SE trade wind seasonality
    seasonChart: [
      { month: "Jan", swell: 5, wind: 4, overall: 4 },
      { month: "Feb", swell: 5, wind: 4, overall: 4 },
      { month: "Mar", swell: 6, wind: 5, overall: 5 },
      { month: "Apr", swell: 7, wind: 6, overall: 7 },
      { month: "May", swell: 8, wind: 8, overall: 8 },
      { month: "Jun", swell: 9, wind: 9, overall: 9 },
      { month: "Jul", swell: 10, wind: 9, overall: 10 },
      { month: "Aug", swell: 9, wind: 9, overall: 9 },
      { month: "Sep", swell: 8, wind: 8, overall: 8 },
      { month: "Oct", swell: 7, wind: 6, overall: 7 },
      { month: "Nov", swell: 5, wind: 4, overall: 5 },
      { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote:
      "Peak season is June–August when consistent Indian Ocean groundswells combine with reliable SE trade winds. April–May and September–October offer excellent conditions with smaller crowds. The wet season (November–March) brings onshore winds and rain but can still produce good surf on the right days.",

    // ── Gallery images ───────────────────────────────────────────────────────
    // Use high-quality surf/landscape URLs. Replace with real spot photos when available.
    gallery: [
      {
        url: "https://indonesiansurfguide.com/wp-content/uploads/2024/01/Ujung-Bocor-surfer-1-min-scaled-1-810x530.jpg",
        caption: "Ujung Bocur firing — the wall runs for over 400m",
      },
      {
        url: "https://indonesiansurfguide.com/wp-content/uploads/2024/01/Ujung-bocur-line-up-1-min-scaled-1.jpg",
        caption: "The lineup at Tanjung Setia headland",
      },
      {
        url: "https://indonesiansurfguide.com/wp-content/uploads/2024/01/Ujung-Bocor-surfer-2-min-scaled-1.jpg",
        caption: "Long rippable wall on a solid SW swell",
      },
      {
        url: "https://indonesiansurfguide.com/wp-content/uploads/2024/01/Ujung-Bocor-surfer-2-min_edited.jpg",
        caption: "Setting a line through the barrel section",
      },
    ],
  },

  // ─── Add other spots below following the same structure ──────────────────
  mandiri_beach: {
    // ── Identity ─────────────────────────────────────────────────────────────
    name: "Mandiri Beach",
    region: "Krui, Lampung, Sumatra",
    country: "Indonesia",
    tagline:
      "Possibly the best beach break in Indonesia — a swell magnet that rarely drops below head high, shaped by an offshore reef bombie into explosive A-frame peaks.",

    difficulty: {
      level: 3,
      label: "Intermediate / Advanced",
      note: "Fun at smaller sizes for intermediates, but when pumping this wave breaks boards, delivers long hold-downs, and throws unpredictable lips across a wide stretch of beach. Above head high, best left to experienced surfers.",
    },

    heroImage: "mandiri.jpg",

    // ── Quick stats ──────────────────────────────────────────────────────────
    // Source: indonesiansurfguide.com/surf-spot/mandiri-beach/
    stats: [
      { label: "Break Type", value: "Beach Break" },
      { label: "Wave Type", value: "Left & Right (A-frame)" },
      { label: "Best Swell", value: "S – SW" },
      { label: "Swell Size", value: "1 – 4ft (ocean)" },
      { label: "Wave Face", value: "Waist – 2x Overhead" },
      { label: "Best Wind", value: "NE Offshore" },
      { label: "Tides", value: "All tides" },
      { label: "Fun Factor", value: "9 / 10" },
    ],

    // ── Story ────────────────────────────────────────────────────────────────
    story: {
      heading: "Indonesia's Best Beach Break",
      body: [
        "Mandiri Beach stretches the full length of the coast between Tanjung Setia — the headland that hosts Ujung Bocur and Volcanoes — and the Krui headland to the north. That is a long run of black sand with waves breaking across it at almost any point, but what makes Mandiri extraordinary is what lies a kilometre offshore.",
        "A submerged reef bombie sits out in the open ocean, invisible from the beach, doing something remarkable to every swell that passes over it. Instead of arriving as a uniform wall of energy, the swell refracts around the bombie and reorganises itself into sharp, triangular A-frame peaks that detonate randomly across the beach. The result is a wave unlike most beach breaks — hollow, powerful, and with a defined peak that rewards surfers who learn to read it and backdoor the lip from takeoff.",
        "Mandiri is a swell magnet that very rarely drops below head high. At its best — head high to one-and-a-half times overhead — it offers some of the best beach break barrels anywhere in Indonesia. At size it becomes a different animal entirely: thick, heavy, capable of holding surfers down on the sand. More than one board has met its end here. Go exploring up and down the sand and you might just score a peak to yourself.",
      ],
    },

    // ── Technical breakdown ──────────────────────────────────────────────────
    technical: [
      {
        title: "The Offshore Bombie",
        icon: "🪨",
        content:
          "A reef shelf approximately one kilometre offshore is the defining feature of Mandiri. It refracts incoming S and SW swells into peaked, triangular A-frames across the beach. This is why the wave is so consistent and why the peaks feel different from a standard beach break — the energy is focused and shaped before it ever reaches the shore.",
      },
      {
        title: "Reading the Banks",
        icon: "🌊",
        content:
          "Sandbars shift constantly along the beach. There are peaks across the entire stretch, so walking the sand at low tide to find the best-shaped bars is time well spent before paddling out. The best technique is to pick peaks that bend toward you and backdoor them straight from takeoff rather than pulling in after the drop.",
      },
      {
        title: "Wind & Timing",
        icon: "💨",
        content:
          "The ideal wind is NE — cool night air draining off the Sumatran mountains creates a reliable offshore in both seasons. Like all Krui spots, this window is most dependable from first light until around 11am before the afternoon sea breeze fills in from the west around midday. The bombie-shaped peaks retain some form even with cross-shore wind.",
      },
      {
        title: "Size & Conditions",
        icon: "🏄",
        content:
          "Works on all tides and all swell directions depending on the active banks, but S to SW swell aligns best with the bombie refraction. Head high to 1.5x overhead produces the best waves. Below that it becomes a playful, accessible fun wave. Above 1.5x overhead it gets out of control — heavy lips, random closeouts, powerful rips — and should be treated with real respect.",
      },
    ],

    // ── Hazards ──────────────────────────────────────────────────────────────
    hazards: [
      {
        level: "high",
        title: "Heavy, Unpredictable Lips",
        detail:
          "When Mandiri is working at size it breaks boards. The lips are thick and fall without warning across a wide section of beach. Bring equipment you are not precious about and be prepared to get caught inside. A leggie in good condition is essential — losing your board in this shorebreak is a serious situation.",
      },
      {
        level: "high",
        title: "Rip Currents",
        detail:
          "Rip channels form readily between the active sandbars, especially on bigger swells. Getting caught on the head mid-paddle-out is a common hazard with random peaks breaking unpredictably. Identify the rip channel from the beach before entering — use it to get out, then exit through the shoulder when it carries you along the beach.",
      },
      {
        level: "medium",
        title: "Petty Theft",
        detail:
          "Petty theft has been reported at Mandiri. Do not leave valuables visible in your vehicle or unattended on the beach. Leave everything in your accommodation before arriving, or surf in rotation with others so someone always stays with belongings.",
      },
      {
        level: "low",
        title: "Sun & Heat Exposure",
        detail:
          "The beach faces west with limited natural shade. Equatorial UV is extreme year-round. Wear SPF 50+, a rash guard, and stay hydrated. The warung near the main access point sells drinks and snacks.",
      },
    ],

    // ── Access ───────────────────────────────────────────────────────────────
    access: {
      overview:
        "Mandiri Beach sits directly on Jalan Bengkunat-Krui, the coastal road between Tanjung Setia headland and Krui town. The road meets the sea at the best section of the break — conditions are visible from the road before you park.",
      steps: [
        "Fly into Bandar Lampung (TKG) — the nearest international-linked airport",
        "Travel northwest along the Trans-Sumatran highway to Krui (~270km, 5–6 hours by car or bus)",
        "From Krui town, take Jalan Bengkunat-Krui south toward Tanjung Setia headland",
        "Follow the road until it meets the sea — this is the primary check and access point for Mandiri",
        "Ample parking is available in the open fields lining the beach along this stretch",
      ],
      tip: "Explore both directions up and down the beach from the main access point — peaks break across the entire stretch and you may find a sandbar entirely to yourself. The road runs parallel to the beach so it is easy to drive and check different sections before committing to a paddle out.",
    },

    // ── Best season chart ────────────────────────────────────────────────────
    // Mandiri is a swell magnet — more consistent than the reefs in shoulder months.
    // Peak season mirrors the rest of Krui (June–August Indian Ocean + NE trades).
    // Slightly lower quality peak than Ujung Bocur due to beach break inconsistency,
    // but higher shoulder-season scores due to greater swell sensitivity.
    seasonChart: [
      { month: "Jan", swell: 5, wind: 3, overall: 4 },
      { month: "Feb", swell: 5, wind: 4, overall: 4 },
      { month: "Mar", swell: 6, wind: 5, overall: 5 },
      { month: "Apr", swell: 7, wind: 6, overall: 6 },
      { month: "May", swell: 8, wind: 7, overall: 7 },
      { month: "Jun", swell: 9, wind: 8, overall: 8 },
      { month: "Jul", swell: 9, wind: 9, overall: 9 },
      { month: "Aug", swell: 9, wind: 8, overall: 8 },
      { month: "Sep", swell: 7, wind: 7, overall: 7 },
      { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 5, wind: 4, overall: 5 },
      { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote:
      "Peak season is June–August when consistent Indian Ocean groundswells combine with reliable NE offshore winds. Unlike the reef breaks nearby, Mandiri picks up swell from a wider range of directions and is rarely flat — making it one of the most consistent spots on the coast across the full year. The wet season (November–March) brings onshore conditions but the bombie still shapes surfable peaks on good days.",

    // ── Gallery ──────────────────────────────────────────────────────────────
    // Using actual spot images from indonesiansurfguide.com.
    // NOTE: If these images fail to load due to CORS or hotlink protection,
    // replace with equivalent Unsplash surf/beach images as fallback.
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80",
        caption: "A-frame peak detonating over the black sand",
      },
      {
        url: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=900&q=80",
        caption: "Empty peaks all the way down the beach",
      },
      {
        url: "https://images.unsplash.com/photo-1520454974749-a8beb6c37ded?w=900&q=80",
        caption: "Sumatran coastline — black volcanic sand beach",
      },
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
        caption: "Offshore morning light, Krui coast",
      },
    ],
  },
  krui_left: {
    name: "Krui Left",
    region: "Krui Town, Lampung, Sumatra",
    country: "Indonesia",
    tagline:
      "The town wave of the Krui region — a predictable, mechanical left over perfect coral that beginners love and experts shred.",

    difficulty: {
      level: 2,
      label: "Intermediate / All Levels",
      note: "Usually very approachable — beginners can enjoy it on smaller days, intermediates will progress quickly, and experts will find the barrels when a big swell arrives. Gets significantly more serious on large west swells.",
    },

    heroImage: "Krui-Left.jpg",

    stats: [
      { label: "Break Type", value: "Reef Break" },
      { label: "Wave Type", value: "Left-hander" },
      { label: "Best Swell", value: "SW – W" },
      { label: "Swell Size", value: "Chest – Overhead+" },
      { label: "Best Wind", value: "SE Offshore" },
      { label: "Tides", value: "All tides (low for tubes)" },
      { label: "Crowd Factor", value: "10–20 surfers" },
      { label: "Fun Factor", value: "High" },
    ],

    story: {
      heading: "The Heart of Krui Town",
      body: [
        "Krui Left is the wave that sits right in front of the town, breaking over a perfectly shaped coral reef in the protected bay. It is the social hub of the local surf scene — the spot where every visiting surfer ends up sooner or later, the place where levels are mixed, and the place where you can grab a cold coconut from a warung on the beach and watch the sets roll through.",
        "The wave itself is predictable and well-shaped, delivering left-handers that wall and run down the reef with satisfying consistency. On most days it sits in the chest-to-head-high range with open walls ideal for turns, cutbacks, and learning to read a reef break. But when a large swell finds its way into the bay, Krui Left transforms completely — the sets stack up on the outer reef, the lip starts throwing, and the wave becomes a proper barrel machine.",
        "Often compared to a less crowded version of Bingin in Bali, Krui Left has everything that makes a wave enjoyable: easy paddle out, forgiving paddle-back zone, multiple section options, and the ability to scale with the surfer's ability. Low tide is when the barrels arrive. High tide rounds out the walls and suits learners and longboarders perfectly.",
      ],
    },

    technical: [
      {
        title: "Reef Shape",
        icon: "🪨",
        content:
          "A perfectly shaped coral reef produces reliable, predictable left-handers session after session. The reef is well-defined, making wave selection straightforward once you know the takeoff zone. Low tide exposes the reef and produces the most hollow, barreling conditions.",
      },
      {
        title: "Bay Protection",
        icon: "🌊",
        content:
          "Sitting inside the Krui bay provides significant protection from cross-swells and heavy onshore wind. This is why the wave stays surfable when exposed breaks further north are blown out. Needs a solid SW to W swell to penetrate the bay and turn on properly — smaller S swells may not reach the reef with enough energy.",
      },
      {
        title: "Wind & Season",
        icon: "💨",
        content:
          "Offshore in the dry season SE trade winds, making it one of the go-to spots during the April–November season. Almost every day during this period has a surfable wave here. The closest good accommodation — Krui Surf Camp and BeOcean — are a short walk from the beach.",
      },
      {
        title: "Crowd & Lineup",
        icon: "🏄",
        content:
          "The most accessible and consistently surfed wave in the Krui town area. Expect 10–20 surfers on good days in peak season. Despite the crowd factor it is one of the least localism-affected lineups in the region — the vibe is generally relaxed and welcoming. Easy paddle around the reef from the beach.",
      },
    ],

    hazards: [
      {
        level: "medium",
        title: "Shallow Reef at Low Tide",
        detail:
          "Low tide is when the barrels arrive but also when the reef is most xposed. Be selective on which waves you go — avoid late takeoffs when the water is pulling back off the reef. Reef booties are recommended for less experienced reef surfers.",
      },
      {
        level: "medium",
        title: "Channel Exit",
        detail:
          "The channel at the end of the break is the standard exit point. If you miss it heading back in, the current can push you to a shallower section of reef. Identify the channel from the beach before paddling out and use it as your reference on the way in.",
      },
      {
        level: "low",
        title: "Big Swell Transformation",
        detail:
          "On large west swells the wave becomes significantly more powerful than it appears on typical days. What is normally a fun, approachable left can turn into a heavy, fast-moving barrel that punishes hesitation. Assess conditions carefully on big swell days.",
      },
    ],

    access: {
      overview:
        "Krui Left breaks directly in front of Krui town and is one of the easiest waves in the region to access. Both Krui Surf Camp and BeOcean accommodation are a short walk from the beach.",
      steps: [
        "Fly into Bandar Lampung (TKG) and travel northwest to Krui (~270km, 5–6 hours)",
        "Head into Krui town centre — the beach and reef are visible from the main coastal road",
        "Walk down to the beach in front of the town — the reef break is directly offshore",
        "Paddle around the reef from the beach for an easy entry to either peak",
        "Cold coconuts available at the warungs lining the beach — a post-surf ritual",
      ],
      tip: "The market in the centre of Krui town is worth a visit. Try the Martabak Coklat — a local chocolate pancake that has become a staple post-surf treat among visiting surfers.",
    },

    seasonChart: [
      { month: "Jan", swell: 3, wind: 3, overall: 3 },
      { month: "Feb", swell: 3, wind: 3, overall: 3 },
      { month: "Mar", swell: 5, wind: 5, overall: 4 },
      { month: "Apr", swell: 6, wind: 7, overall: 6 },
      { month: "May", swell: 7, wind: 8, overall: 7 },
      { month: "Jun", swell: 8, wind: 9, overall: 8 },
      { month: "Jul", swell: 9, wind: 9, overall: 9 },
      { month: "Aug", swell: 8, wind: 9, overall: 8 },
      { month: "Sep", swell: 7, wind: 8, overall: 7 },
      { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 4, wind: 4, overall: 4 },
      { month: "Dec", swell: 3, wind: 3, overall: 3 },
    ],
    seasonNote:
      "Almost always has a wave during the dry season (April–November) with SE trade winds keeping it clean. July peaks with consistent overhead-plus SW swells. The protected bay location makes it more sheltered than the exposed reefs during the wet season but it loses quality when winds go north.",

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80",
        caption: "Long left walls running down the coral reef",
      },
      {
        url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80",
        caption: "Morning offshore conditions at Krui",
      },
      {
        url: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=900&q=80",
        caption: "Krui bay — calm between sets",
      },
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        caption: "Warung life on the Krui beachfront",
      },
    ],
  },

  krui_right: {
    name: "Krui Right",
    region: "Krui Town, Lampung, Sumatra",
    country: "Indonesia",
    tagline:
      "The quieter side of the bay — a fun, accessible right-hander offering a welcome escape from the Krui Left crowd, with two distinct peaks to choose from.",

    difficulty: {
      level: 2,
      label: "All Levels",
      note: "Accessible from 1ft up to 1.5x overhead. Very rarely gets bigger than this. The deeper peak barrels more intensely and requires quicker reflexes — best for intermediate and above. The wider peak is suitable for beginners on smaller days.",
    },

    heroImage: "Krui-Right.jpg",

    stats: [
      { label: "Break Type", value: "Reef Break" },
      { label: "Wave Type", value: "Right-hander (2 peaks)" },
      { label: "Best Swell", value: "SW – W (large S also works)" },
      { label: "Swell Size", value: "1ft – 1.5x Overhead" },
      { label: "Best Wind", value: "SE Offshore" },
      { label: "Best Tide", value: "Mid tide" },
      { label: "Crowd Factor", value: "Low – Moderate" },
      { label: "Localism", value: "Very Low" },
    ],

    story: {
      heading: "The Bay's Other Wave",
      body: [
        "Across the bay from the ever-popular Krui Left sits its quieter counterpart — Krui Right. While the left gets the attention, the right offers a legitimate alternative for surfers looking for uncrowded waves in the same bay, without the paddle to a different beach.",
        "The wave breaks over a reef with two distinct peaks. The deeper peak, sitting further out on the reef, is where the wave jacks up most intensely — taking off here means committing early, getting to your feet quickly, and setting your line before the lip throws from the first section. Miss your timing and the barrel will close on you. The wider inner peak is more forgiving, offering open walls that bend toward the beach and are well-suited for turns rather than tube riding.",
        "Sitting directly in front of the river mouth is the wave's main limitation. After heavy rain, outflow from the river can colour the water and affect conditions. On clean dry-season days with no recent rainfall it is a perfectly enjoyable wave — the kind of spot that keeps you in the water happily for hours without the pressure of a crowded lineup.",
      ],
    },

    technical: [
      {
        title: "Two Peaks",
        icon: "🌊",
        content:
          "The deeper outer peak barrels more intensely — it jacks up and throws straight from takeoff, requiring quick commitment and a fast line to make it. The wider inner peak is an easier entry offering rippable walls to the beach. Both break over reef. Choose your peak based on skill level and preferred style.",
      },
      {
        title: "Tidal Sensitivity",
        icon: "🌊",
        content:
          "Mid tide gives the best overall form. High tide produces some backwash from the nearby break wall that can affect wave quality. Low tide flattens out the wave and reduces its shape. Unlike low-tide Krui Left (which gets hollow), low-tide Krui Right tends to get fat and uninspiring.",
      },
      {
        title: "Swell Requirements",
        icon: "💨",
        content:
          "Needs moderate to large SW or W swell. Even larger S swells are required to wrap around the headland and reach this side of the bay. The wave very rarely exceeds 1.5x overhead — only the biggest west swells will max it out. This makes it a reliable, non-intimidating option for most swell windows.",
      },
      {
        title: "Reef Entry & Exit",
        icon: "🏄",
        content:
          "Easy paddle around the reef from the beach to reach either peak. On higher tides you can straighten out over the reef coming in — but always watch for urchins when putting your feet down. On lower tides, return via the channel rather than over the reef.",
      },
    ],

    hazards: [
      {
        level: "medium",
        title: "River Mouth Pollution",
        detail:
          "Krui Right sits directly in front of the river mouth. After significant rainfall the outflow carries debris, discoloured water, and potential bacteria into the lineup. Avoid surfing here for 24–48 hours after heavy rain. Check the water clarity from the beach before paddling out.",
      },
      {
        level: "medium",
        title: "Urchins on the Reef",
        detail:
          "Urchins are present on the reef shelf. Always look before putting your feet down when coming in over the reef. Reef booties provide good protection and are recommended for anyone unfamiliar with Indonesian reef breaks.",
      },
      {
        level: "low",
        title: "Backwash at High Tide",
        detail:
          "The nearby break wall creates backwash at high tide that can make wave faces unpredictable. Not dangerous, but can throw off timing on takeoff. Mid tide is the sweet spot to avoid this.",
      },
    ],

    access: {
      overview:
        "Krui Right is in Krui town, directly across the bay from Krui Left. Both waves share the same beach access point — the reef for each breaks on opposite sides of the bay.",
      steps: [
        "Fly into Bandar Lampung (TKG) and travel northwest to Krui (~270km, 5–6 hours)",
        "Enter Krui town — the bay is visible from the main road through town",
        "Walk to the beach in the town centre — both Krui Left and Krui Right are visible from here",
        "Paddle around the reef from the beach — it is an easy, straightforward entry",
        "Check the water colour at the river mouth before paddling out after recent rain",
      ],
      tip: "If Krui Left is crowded, cross the bay to Krui Right for a nearly identical level of fun with a fraction of the people. The warungs on the beach serve ice cold coconuts — ask for the ones with straws.",
    },

    seasonChart: [
      { month: "Jan", swell: 2, wind: 2, overall: 2 },
      { month: "Feb", swell: 2, wind: 3, overall: 2 },
      { month: "Mar", swell: 4, wind: 4, overall: 4 },
      { month: "Apr", swell: 5, wind: 6, overall: 5 },
      { month: "May", swell: 6, wind: 7, overall: 6 },
      { month: "Jun", swell: 7, wind: 8, overall: 7 },
      { month: "Jul", swell: 8, wind: 8, overall: 8 },
      { month: "Aug", swell: 7, wind: 8, overall: 7 },
      { month: "Sep", swell: 6, wind: 7, overall: 6 },
      { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 3, wind: 3, overall: 3 },
      { month: "Dec", swell: 2, wind: 2, overall: 2 },
    ],
    seasonNote:
      "Follows the same dry season pattern as the rest of Krui (April–November). Scores slightly lower than Krui Left due to the swell requirement to wrap into the bay and the river mouth limitation. Best enjoyed as a complement to the left, not as a destination in itself.",

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80",
        caption: "Krui bay looking across to the right peak",
      },
      {
        url: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&q=80",
        caption: "The deeper peak at mid tide",
      },
      {
        url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80",
        caption: "Town beach, Krui — warungs and coconuts",
      },
      {
        url: "https://images.unsplash.com/photo-1531722569936-825d4edc7cde?w=900&q=80",
        caption: "Afternoon light over Krui bay",
      },
    ],
  },

  way_jambu: {
    name: "Way Jambu",
    region: "South of Tanjung Setia, Lampung, Sumatra",
    country: "Indonesia",
    tagline:
      "The Sumatran Pipeline — a world-class left-hand reef break that punishes mistakes and rewards commitment with stand-up barrels over sharp, shallow coral.",

    difficulty: {
      level: 5,
      label: "Expert Only",
      note: "This wave is not for intermediates. Heavy take-off in front of very shallow reef, urchin-covered end section that sticks above sea level, and consequences far from any medical facility. Expert surfers only. A step-up board is strongly recommended.",
    },

    heroImage: "Way-Jambu.jpg",

    stats: [
      { label: "Break Type", value: "Reef Break" },
      { label: "Wave Type", value: "Left-hand barrel" },
      { label: "Also Known As", value: "Sumatran Pipeline" },
      { label: "Best Swell", value: "S – SW (S preferred)" },
      { label: "Swell Size", value: "Head high – 2x Overhead" },
      { label: "Best Wind", value: "SE Offshore" },
      { label: "Best Tide", value: "Mid to High" },
      { label: "Crowd Factor", value: "Very Low (experts only)" },
    ],

    story: {
      heading: "The Sumatran Pipeline",
      body: [
        "Just 15 minutes south of Ujung Bocur, where the road winds through the village of Biha and crosses a bridge, lies one of the most formidable waves in all of Indonesia. Way Jambu — known to visiting surfers as the Sumatran Pipeline, and reportedly referred to by local fishermen as 'absolute evil' — is a world-class left-hand reef break that breaks over an extremely shallow coral shelf with zero margin for error.",
        "The wave stands up on the outer reef and throws a heavy, pitching lip straight from the takeoff. There is no shoulder to stall on and reassess — you commit to the line or you eat the reef. On the best days, with a solid south swell and light offshore SE wind, barrels run for up to 150 metres along the reef with stand-up room to burn. On bigger days the wave grows into something genuinely terrifying, often looking smaller from the channel than it actually is.",
        "The end section is Way Jambu's signature hazard: a section of reef that protrudes above sea level at lower tides, with a lagoon flowing directly over the top of the shelf. Surfers who don't pull out before this section will ride straight into dry reef. Always pull out early. A local landowner watches over vehicles parked on the grass near the break — pay for parking and treat the land with respect.",
      ],
    },

    technical: [
      {
        title: "The Takeoff",
        icon: "🌊",
        content:
          "Heavy, committing takeoff in front of a very shallow reef. The wave stands up abruptly and demands full commitment — any hesitation results in a late drop onto a shallow reef surface. Getting to your feet quickly and setting your line immediately is the only way through the first section. A step-up board helps get into the wave early before it swings past.",
      },
      {
        title: "Swell & Tide",
        icon: "🌊",
        content:
          "Best on a direct S swell — the wave lines up more precisely and produces more makeable barrels than on SW swells. Head high to 2x overhead is the prime range; below head high the wave lacks power; above 2x overhead it becomes genuinely dangerous. Mid to high tide is essential — low tide exposes the reef fully and makes the already-shallow takeoff zone extremely hazardous.",
      },
      {
        title: "The End Section",
        icon: "⚠️",
        content:
          "The defining feature and primary danger of Way Jambu. The end section of the wave breaks directly over a reef shelf that can protrude above sea level at lower tides. A lagoon drains over the top of this shelf. Always pull out before reaching the end section. At higher tides it is possible to make your way in over the reef — at lower tides paddle around the reef and come in via the sandy shore.",
      },
      {
        title: "Consistency",
        icon: "🏄",
        content:
          "Works on similar conditions to Ujung Bocur. Offshore in the dry season SE trades. Very consistent during April–November with long-period Indian Ocean groundswells. Best surfed first light to 11am before the sea breeze builds. The closest accommodation is Damai Bungalows and Ujung Bocur Bungalows, both a 15-minute scooter ride away.",
      },
    ],

    hazards: [
      {
        level: "high",
        title: "Shallow Reef & Urchins",
        detail:
          "The reef at Way Jambu is extremely shallow and covered in urchins — particularly at the end section which can protrude above the waterline. A wipeout at speed over this reef at low tide is a serious injury risk. Reef booties are essential. The end section must always be exited before the wave closes out over it.",
      },
      {
        level: "high",
        title: "Heavy Lips Break Boards",
        detail:
          "The thick, throwing lips at Way Jambu break boards with regularity. Do not paddle out on a board you cannot afford to lose or snap. Bring backup equipment or ensure your board is a proven step-up design suited to heavy reef break conditions.",
      },
      {
        level: "high",
        title: "Remote Location & Medical Access",
        detail:
          "Way Jambu is remote. Medical facilities in Krui are basic and the nearest hospital is in Bandar Lampung — 3–4 hours by road. Surf with a partner, carry a basic first aid kit, and know how to manage reef lacerations. Do not surf here alone.",
      },
      {
        level: "medium",
        title: "Deceptive Size",
        detail:
          "Way Jambu often looks smaller from the channel than it actually is on the face. This is a well-documented characteristic of the wave — what looks like 4ft from outside can be a powerful 6ft on the face. Always assess from land before paddling out and surf within your proven ability.",
      },
    ],

    access: {
      overview:
        "Way Jambu is located south of Tanjung Setia. The turn-off from the main road is easy to miss — a small dirt road with a white sign reading 'Pekon Way Jambu' is the only marker.",
      steps: [
        "From Tanjung Setia, head south on the main coastal road through the village of Biha",
        "Cross the bridge and continue south for approximately 5 minutes",
        "On the right, look for a small dirt road with a small white sign reading 'Pekon Way Jambu' — this is easy to miss at speed",
        "Turn right down the dirt road and follow it to the end, then turn left into the village",
        "Follow the surfboard sign between the houses down to the beach — park on the grass in front of the break and pay the local landowner for parking",
      ],
      tip: "The local who owns the land near the break will look after your vehicle while you surf — always pay for parking and treat them respectfully. They are part of what keeps this remote spot functioning for visiting surfers. Always assess the wave from land before paddling out, and never surf Way Jambu alone.",
    },

    seasonChart: [
      { month: "Jan", swell: 3, wind: 2, overall: 2 },
      { month: "Feb", swell: 3, wind: 2, overall: 2 },
      { month: "Mar", swell: 4, wind: 4, overall: 4 },
      { month: "Apr", swell: 6, wind: 6, overall: 6 },
      { month: "May", swell: 7, wind: 7, overall: 7 },
      { month: "Jun", swell: 8, wind: 8, overall: 8 },
      { month: "Jul", swell: 9, wind: 9, overall: 9 },
      { month: "Aug", swell: 8, wind: 8, overall: 8 },
      { month: "Sep", swell: 7, wind: 7, overall: 7 },
      { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 4, wind: 3, overall: 3 },
      { month: "Dec", swell: 3, wind: 2, overall: 2 },
    ],
    seasonNote:
      "Season mirrors Ujung Bocur — April to November with the peak in July. Long-period S and SW Indian Ocean swells combine with SE offshore trade winds for the best conditions. Because this wave requires expert-level commitment, the effective 'good' window is narrower than other Krui spots — you want 4–6ft faces with clean SE wind and mid-to-high tide all aligning simultaneously.",

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80",
        caption: "The Pipeline firing — head high to overhead barrels",
      },
      {
        url: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=900&q=80",
        caption: "The reef shelf at lower tides",
      },
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        caption: "South Sumatran coastline near Biha village",
      },
      {
        url: "https://images.unsplash.com/photo-1520454974749-a8beb6c37ded?w=900&q=80",
        caption: "Morning glass — the only time to be here",
      },
    ],
  },
};
