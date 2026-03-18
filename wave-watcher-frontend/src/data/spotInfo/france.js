/**
 * Spot info — France: Hossegor & Capbreton
 * Spots: fr_la_graviere, fr_la_nord, fr_la_sud, fr_la_piste, fr_santocha
 *
 * Season context: Bay of Biscay, North Atlantic swell driven.
 * Peak season: September–November (autumn).
 * Water temp: 12°C (Feb) – 22°C (Aug). Wetsuit: 3/2mm summer, 5/3mm winter.
 * Tidal range: up to 4.5m spring tide — always check tide tables.
 */

export const FRANCE_INFO = {
  fr_la_graviere: {
    name: "La Gravière",
    region: "Hossegor, Landes",
    country: "France",
    tagline:
      "One of the world's great beachbreaks — a sand-bottom barrel machine that hosted the Quiksilver Pro for two decades and still humbles the best surfers on earth when the Atlantic loads up.",

    difficulty: {
      level: 5,
      label: "Expert",
      note: "Heavy, thick-lipped barrels break perilously close to shore into a violent shorebreak. The rip speed rises in direct proportion with the swell height. On big days only experienced paddlers can hold position. Not a spot to sample on your first Atlantic session.",
    },

    heroImage:
      "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=1800&q=85",

    stats: [
      { label: "Break Type", value: "Beach Break" },
      { label: "Wave Type", value: "Left & Right (sand wedge)" },
      { label: "Best Swell", value: "W – NW" },
      { label: "Swell Size", value: "3 – 12ft (ocean)" },
      { label: "Wave Face", value: "Head high – 3× Overhead" },
      { label: "Best Wind", value: "E (Offshore)" },
      { label: "Best Tide", value: "Low – incoming mid" },
      { label: "Fun Factor", value: "10 / 10 (when on)" },
    ],

    story: {
      heading: "The World's Best Beach Break",
      body: [
        "Sited on an old gravel pit in the heart of Hossegor, La Gravière is the wave that put the Landes coast on the global surf map. For nearly two decades it hosted the Quiksilver Pro France, drawing the entire WSL tour to witness the spectacle of top-ranked pros being spat across the sand in shorebreak barrels that mere spectators couldn't fathom paddling into.",
        "What makes it extraordinary is the Gouf de Capbreton — a submarine canyon roughly the size of the Colorado Canyon that plunges four kilometres deep just three hundred metres offshore. This geological quirk means incoming Atlantic swells hit the coast without the energy-dissipating continental shelf that blunts most European beachbreaks. The result is raw, unfiltered ocean energy arriving directly at the sand, where shifting sandbanks compress it into steep, hollow, sand-charged pits.",
        "On a good autumn day — W swell at 8–12 seconds, east wind, incoming tide — La Gravière is as good as beachbreak surfing gets anywhere on the planet. The lips are thick, the drops are steep, the tubes are fast and tight. The shorebreak is violent. The rips are relentless. And the local crew is large and deeply talented. Come prepared or come to watch.",
      ],
    },

    technical: [
      {
        title: "The Gouf de Capbreton",
        icon: "🏔️",
        content:
          "The defining geological feature of the entire Hossegor coast is the Gouf — a submarine canyon starting just offshore that descends four kilometres into the ocean floor. It acts as a swell amplifier, concentrating wave energy that would otherwise be filtered by a shallow continental shelf. This is why Hossegor receives full raw Atlantic swell energy while similar beaches further north do not.",
      },
      {
        title: "Reading the Sand Banks",
        icon: "🌊",
        content:
          "Banks shift constantly and the best peak on any given day may not be in front of the main access path. Arrive early, walk the beach at low tide, and observe where the waves are ledging most sharply before paddling. The best banks form a steep inside shelf that rolls in from outside and reforms to detonate on the inner bar — thick-lipped, fast, and very hollow.",
      },
      {
        title: "Tidal Window",
        icon: "🌊",
        content:
          "The tidal range at Hossegor reaches up to 4.5 metres at spring tide, which dramatically affects wave quality. La Gravière is at its best from low to incoming mid tide, when the banks are exposed and the swell focuses onto the shallow inner bar. High tide can produce a violent semi-closeout shorebreak popular with bodyboarders but very dangerous for surfers on big days.",
      },
      {
        title: "Swell Period is Everything",
        icon: "📡",
        content:
          "Period, not just height, determines whether La Gravière is world-class or messy. An 8–12 second period W swell organises the banks into lined-up, readable peaks. Short-period wind swell of the same height produces lumpy, unpredictable close-outs. Always check the period, not just the height, before making the paddle-out decision.",
      },
    ],

    hazards: [
      {
        level: "high",
        title: "Rip Currents",
        detail:
          "Rips at La Gravière are notoriously powerful. On big days the rip speed rises with the swell height and surfers on the outside can be swept south along the beach faster than they can paddle in. Identify rip channels from the beach before entering. On very large days, only tow-in crews are able to hold position in the water.",
      },
      {
        level: "high",
        title: "Violent Shorebreak",
        detail:
          "Waves break perilously close to shore onto a steep, shallow inner bar. Getting caught inside means taking a powerful close-out wave directly onto the beach. Board-snapping is commonplace. The shorebreak alone — even before a full set wave — can inflict serious injury. Wear a solid leggie and don't go further out than you can swim in.",
      },
      {
        level: "high",
        title: "Crowding & Localism",
        detail:
          "La Gravière has a large, highly skilled local crew who have surfed here their entire lives. Understand priority rules before paddling out, sit wide on your first session to observe, give waves generously, and do not drop in. Tensions do flare here on pumping days.",
      },
      {
        level: "medium",
        title: "Close-outs at Size",
        detail:
          "When the swell exceeds 6–8ft the peaks begin to close out across the entire bank. Only the best tube riders can navigate sections that most surfers will be pitched over. On maxing days, consider moving north to Les Culs Nus or south to La Centrale where the banks may provide more rideable options.",
      },
    ],

    access: {
      overview:
        "La Gravière is located in the heart of Hossegor's oceanside district. Park along Boulevard du Front de Mer (D79) and use the slatted timber access paths through the stabilised dune system directly to the beach.",
      steps: [
        "Fly into Biarritz Airport (BIQ) — 24km away — or Bordeaux (BOD) — ~150km north",
        "Take the A63 autoroute south from Bordeaux toward Bayonne, exit at Capbreton/Hossegor",
        "Follow signs for Hossegor Océan (the ocean-facing side, not the lake side)",
        "Drive north along Boulevard du Front de Mer (D79) — La Gravière is signposted",
        "Park on the roadside or in one of the car parks along the front — early arrival essential in peak season",
        "Access the beach via the timber dune walkways — check conditions from the boardwalk before suiting up",
      ],
      tip: "The best mornings at La Gravière are glassy east wind sessions in October when the car parks are empty by 6:30am. Arrive before sunrise, walk the beach at low tide to find the best bank, and be in the water as the first light hits. By 9am on a good day the line-up fills fast.",
    },

    seasonChart: [
      { month: "Jan", swell: 7, wind: 4, overall: 6 },
      { month: "Feb", swell: 7, wind: 5, overall: 6 },
      { month: "Mar", swell: 6, wind: 5, overall: 6 },
      { month: "Apr", swell: 5, wind: 6, overall: 5 },
      { month: "May", swell: 4, wind: 6, overall: 4 },
      { month: "Jun", swell: 3, wind: 5, overall: 3 },
      { month: "Jul", swell: 2, wind: 5, overall: 3 },
      { month: "Aug", swell: 3, wind: 5, overall: 3 },
      { month: "Sep", swell: 7, wind: 8, overall: 8 },
      { month: "Oct", swell: 9, wind: 9, overall: 9 },
      { month: "Nov", swell: 8, wind: 7, overall: 8 },
      { month: "Dec", swell: 7, wind: 4, overall: 6 },
    ],
    seasonNote:
      "October is the prime month — consistent groundswells, frequently offshore easterlies, warm water (~19°C), and manageable crowds. September and November are nearly as good. Winter brings the biggest swells but also the most storm days, heavy onshore winds, and cold water (12–14°C). Summer is largely flat and crowded.",

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80",
        caption: "Heavy Atlantic barrel — the signature shape of La Gravière",
      },
      {
        url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80",
        caption: "Autumn dawn session — east wind, clean lines",
      },
      {
        url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80",
        caption: "Looking down the Hossegor beachfront toward the peak",
      },
      {
        url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80",
        caption: "Waiting for sets on an October morning",
      },
    ],
  },

  fr_la_nord: {
    name: "La Nord",
    region: "Hossegor, Landes",
    country: "France",
    tagline:
      "Hossegor's big wave arena — a pseudo-reef that breaks directly over the underwater cliff face of the Gouf de Capbreton and can hold waves exceeding 6 metres on the biggest Atlantic winter swells.",

    difficulty: {
      level: 5,
      label: "Expert / Big Wave",
      note: "La Nord only switches on when swell exceeds 4–5ft and reaches its terrifying best above double overhead. Paddling out on big days requires significant physical fitness, precise timing, and the ability to handle hold-downs in cold, powerful Atlantic water. A gun or step-up board is required. Do not paddle out alone.",
    },

    heroImage: "la_nord.jpg",

    stats: [
      { label: "Break Type", value: "Pseudo-Reef / Sandbar" },
      { label: "Wave Type", value: "Left & Right" },
      { label: "Best Swell", value: "NW – W" },
      { label: "Swell Size", value: "4 – 15ft+ (ocean)" },
      { label: "Wave Face", value: "Double – 4× Overhead" },
      { label: "Best Wind", value: "E – SE (Offshore)" },
      { label: "Best Tide", value: "All tides" },
      { label: "Board", value: "Step-up / Gun required" },
    ],

    story: {
      heading: "The Landes North Shore",
      body: [
        "La Nord is Hossegor's answer to big wave surfing. On the largest winter days it looks more like a North Shore Hawaiian break than anything you'd expect on a French beach: walls of dark Atlantic water stacking up, lips throwing far out over the trough, the whole thing unloading with a concussive force that shakes the ground. It has been ridden up to 6 metres and on the biggest documented swells it has gone bigger.",
        "What makes La Nord exceptional is its bottom. Unlike La Gravière's pure sandbar, La Nord breaks over the underwater cliff face of the Gouf de Capbreton — technically making it Hossegor's only true reef break, though the reef in question is four kilometres deep and invisible from the water. The cliff edge concentrates and focuses swell energy in a way no sandbar can, producing waves with shape and power well above what the surrounding beaches can manage.",
        "Sitting just 200 metres north of La Gravière, you can sometimes be at La Sud surfing gentle two-foot walls and watch 12-foot monsters being ridden at La Nord in the same sightline. When La Nord is breaking, stop and watch. When it is your turn, come fully prepared.",
      ],
    },

    technical: [
      {
        title: "The Gouf Cliff Edge",
        icon: "🏔️",
        content:
          "La Nord breaks directly over the lip of the Gouf de Capbreton submarine canyon. This underwater cliff amplifies NW groundswells into waves that hold their shape at heights that collapse most beach breaks. The bottom contour means waves jack up rapidly, producing steep drops and long hollow sections that hold form even at extreme size.",
      },
      {
        title: "Equipment",
        icon: "🏄",
        content:
          "Do not bring your everyday shortboard to La Nord. A step-up (7'0\"–8'0\") is the minimum for anything above double overhead. On the biggest days, a gun (8'6\"+) is needed to generate enough paddle speed to get into steep, fast-moving walls before they close out. A 5/3mm winter wetsuit with boots, hood, and gloves is essential November through March.",
      },
      {
        title: "Paddle vs Tow",
        icon: "🚤",
        content:
          "La Nord is paddle-surfable up to around 12ft for very strong paddlers. Above that, the rip speed and paddle-out difficulty make tow-in the only realistic option. If you see jet skis in the water, the waves are beyond the paddle-in threshold. Respect that boundary — getting caught inside at 15ft with no jet ski support is a life-threatening situation.",
      },
      {
        title: "Swell Direction",
        icon: "🧭",
        content:
          "La Nord needs a NW to W swell with sufficient period (12 seconds+) to fully activate. Straight W swells with long period produce the most organised walls. Large N swells also work and can generate some of the most dramatic barrels. SW swells lose energy as they wrap into the Hossegor coast and rarely produce the best La Nord conditions.",
      },
    ],

    hazards: [
      {
        level: "high",
        title: "Extreme Wave Size",
        detail:
          "La Nord only breaks properly at double overhead and above. A wipeout at this size in cold Atlantic water, with rips running and the next set approaching, is genuinely dangerous. Do not overestimate your ability. Many experienced surfers who ride La Gravière comfortably have been severely punished at La Nord.",
      },
      {
        level: "high",
        title: "Paddle-Out Difficulty",
        detail:
          "Getting out at La Nord on a big day requires navigating through powerful rips, broken water, and incoming sets. Mistiming the paddle-out can leave you caught inside, unable to make it through the breaking zone. Study the channel carefully from the beach, time your entry with the lull between sets, and have an exit plan before entering.",
      },
      {
        level: "high",
        title: "Cold Water & Hypothermia Risk",
        detail:
          "Water temperature drops to 12–14°C in winter — exactly when La Nord is at its best. Hypothermia is a real risk in extended sessions without proper equipment. Wear a sealed 5/3mm wetsuit with gloves, hood, and booties for any session November–March.",
      },
      {
        level: "medium",
        title: "Rip Currents",
        detail:
          "Powerful rip channels run along the coast at La Nord, especially on big swells. These can sweep surfers rapidly south toward La Gravière and beyond. Never fight a rip directly — angle across it toward the shoulder of the break.",
      },
    ],

    access: {
      overview:
        "La Nord is accessed from the same Boulevard du Front de Mer (D79) as La Gravière, located a few hundred metres to the north. There is no separate signposted access — local knowledge tells you which dune path leads to the right bank.",
      steps: [
        "Arrive via Biarritz Airport (BIQ) or from Bordeaux via the A63",
        "Drive to Hossegor Océan along Boulevard du Front de Mer (D79)",
        "Park north of the main La Gravière access point and walk the beach north",
        "Check conditions from the dune before suiting up — the wave should be clearly visible from height",
        "Only enter the water once you have identified a clear rip channel to use as your paddle-out route",
      ],
      tip: "La Nord works on the same swell that fires La Gravière but needs more size to fully activate. On a 6ft day at La Gravière, La Nord may still be lumpy and inconsistent. On a 10ft day at La Gravière, La Nord is producing its best waves. Check La Gravière first — if it looks maxed out and out of control, walk north and assess La Nord.",
    },

    seasonChart: [
      { month: "Jan", swell: 8, wind: 3, overall: 6 },
      { month: "Feb", swell: 7, wind: 4, overall: 6 },
      { month: "Mar", swell: 6, wind: 5, overall: 5 },
      { month: "Apr", swell: 4, wind: 5, overall: 4 },
      { month: "May", swell: 2, wind: 5, overall: 2 },
      { month: "Jun", swell: 1, wind: 5, overall: 1 },
      { month: "Jul", swell: 1, wind: 5, overall: 1 },
      { month: "Aug", swell: 1, wind: 5, overall: 1 },
      { month: "Sep", swell: 5, wind: 7, overall: 6 },
      { month: "Oct", swell: 8, wind: 9, overall: 8 },
      { month: "Nov", swell: 9, wind: 7, overall: 8 },
      { month: "Dec", swell: 9, wind: 4, overall: 7 },
    ],
    seasonNote:
      "La Nord needs serious swell to come alive — it is essentially non-existent in summer. October through December is the prime window: big enough swells from the North Atlantic, still some offshore days before winter storm winds dominate. A flat spell in autumn followed by a quality groundswell is the dream scenario.",

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80",
        caption: "Large Atlantic groundswell approaching the Hossegor coast",
      },
      {
        url: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=80",
        caption: "Big wave surfing on the Bay of Biscay",
      },
      {
        url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=900&q=80",
        caption: "Watching from the dunes on a big winter swell",
      },
      {
        url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80",
        caption: "The Hossegor oceanfront on a heavy autumn day",
      },
    ],
  },

  fr_la_sud: {
    name: "La Sud",
    region: "Hossegor, Landes",
    country: "France",
    tagline:
      "Hossegor's rare beginner-friendly corner — a sheltered, fun beachbreak that gives learners and intermediates access to quality French surf without the power and crowds of the main peaks.",

    difficulty: {
      level: 1,
      label: "Beginner / Intermediate",
      note: "La Sud is the safest entry point in Hossegor. Smaller waves, shorter rips, and a forgiving bank make it suitable for surfers still developing. It disappears at high tide on big swells — always check conditions before entering.",
    },

    heroImage: "la_sud.jpg",

    stats: [
      { label: "Break Type", value: "Beach Break" },
      { label: "Wave Type", value: "Left & Right" },
      { label: "Best Swell", value: "NW – W" },
      { label: "Swell Size", value: "2 – 6ft (ocean)" },
      { label: "Wave Face", value: "Waist – Head high" },
      { label: "Best Wind", value: "E (Offshore)" },
      { label: "Best Tide", value: "Low – Mid (only)" },
      { label: "Fun Factor", value: "7 / 10" },
    ],

    story: {
      heading: "A Forgiving Corner in a Heavy Town",
      body: [
        "Hossegor is not a beginner's destination — almost every wave on the Landes coast requires real surfing ability to navigate safely. La Sud is the exception. Located at the southern end of the Hossegor beachfront, it benefits from a touch of protection afforded by the orientation of the Capbreton harbour walls and the sand bank geometry, which reduces the raw swell size slightly and softens the wave profile.",
        "On a 2–4ft NW swell, La Sud produces fun, forgiving peaks with lefts and rights that roll in consistently and give surfers room to position, pop up, and make the wave without the punishing consequences found at La Gravière or La Nord just a few hundred metres north.",
        "The key limitation is the tide. La Sud largely disappears at high tide and works best only from low to mid. On big swells at high tide, even La Sud can produce a dangerous shorebreak. Check the tide chart, arrive at low water, and be off the beach before the tide comes fully in.",
      ],
    },

    technical: [
      {
        title: "Swell Filtering",
        icon: "🌊",
        content:
          "La Sud receives a slightly reduced version of the same swells hitting La Gravière due to its position at the southern end of the beach and the influence of the Capbreton harbour structure. On a 6ft day at La Gravière, La Sud may be 3–4ft — surfable and fun rather than terrifying.",
      },
      {
        title: "Tide Dependency",
        icon: "🌊",
        content:
          "La Sud works only at low to mid tide and completely disappears at high tide on medium to large swells. The tidal range at Hossegor reaches 4.5m at spring tide — timing your session matters here more than at most breaks. Low tide exposes the best banks.",
      },
      {
        title: "Crowd Management",
        icon: "👥",
        content:
          "La Sud fills with surf school students during summer mornings. Arriving early (before 8am) or in the afternoon avoids the densest crowds. As the only truly beginner-appropriate spot in Hossegor, it is popular — but large enough that peaks spread across the bank.",
      },
      {
        title: "Progression Spot",
        icon: "🏄",
        content:
          "For surfers at La Sud wanting to test themselves, walk north at low tide to observe La Gravière from the beach before committing to paddling out. The contrast is instructive: the same swell that produces fun peaks at La Sud arrives at La Gravière as a completely different animal.",
      },
    ],

    hazards: [
      {
        level: "medium",
        title: "Rip Currents",
        detail:
          "Even at La Sud, Atlantic rip channels form between the banks, especially on bigger swells. The rips here are weaker than at La Gravière but can still pull beginner surfers quickly away from their entry point. Always identify the rip channels from the beach before paddling out.",
      },
      {
        level: "medium",
        title: "High Tide Close-Out",
        detail:
          "At high tide on any swell above 3ft, La Sud loses its rideable shape and produces close-out shorebreak. Do not surf La Sud at high tide on medium or large swells. Check the tide table before leaving your accommodation.",
      },
      {
        level: "low",
        title: "Surf School Congestion",
        detail:
          "Summer mornings at La Sud see heavy surf school use. Beginners on foamies can be unpredictable in the line-up. Be patient, surf wider peaks, and accept that July and August mornings will be chaotic. Afternoons and early mornings are significantly less crowded.",
      },
      {
        level: "low",
        title: "Cold Water",
        detail:
          "Atlantic water temperatures drop to 12–14°C in winter. A 3/2mm wetsuit is the minimum for summer; a 4/3mm with optional gloves and hood is needed from November through April.",
      },
    ],

    access: {
      overview:
        "La Sud is at the southern end of the Hossegor oceanfront, near the boundary with Capbreton. Access from Boulevard du Front de Mer (D79) — look for access paths south of the main La Gravière zone toward the harbour area.",
      steps: [
        "Arrive via Biarritz Airport (BIQ), 24km south, or Bordeaux (BOD), ~150km north",
        "Drive to Hossegor Océan via the A63 — exit Capbreton/Hossegor",
        "Head south along Boulevard du Front de Mer toward the Capbreton harbour",
        "La Sud is signposted and clearly accessed via the southernmost dune walkways before the harbour wall",
        "Paid parking is available along the front — free parking is easier to find in the side streets",
      ],
      tip: "Surf school sessions typically run 9am–12pm and 2pm–5pm. If you want the peak to yourself, aim for a 7am low-tide session in summer or a mid-morning session outside July–August.",
    },

    seasonChart: [
      { month: "Jan", swell: 5, wind: 3, overall: 4 },
      { month: "Feb", swell: 5, wind: 4, overall: 4 },
      { month: "Mar", swell: 5, wind: 5, overall: 5 },
      { month: "Apr", swell: 6, wind: 6, overall: 6 },
      { month: "May", swell: 6, wind: 7, overall: 6 },
      { month: "Jun", swell: 5, wind: 7, overall: 6 },
      { month: "Jul", swell: 4, wind: 6, overall: 5 },
      { month: "Aug", swell: 5, wind: 6, overall: 6 },
      { month: "Sep", swell: 7, wind: 8, overall: 8 },
      { month: "Oct", swell: 7, wind: 8, overall: 7 },
      { month: "Nov", swell: 5, wind: 6, overall: 5 },
      { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote:
      "Unlike La Gravière, La Sud is actually usable in summer when the swell is smaller. The sweet spot is April–June and September–October: moderate swell energy, warming water, and manageable crowds. Winter swells frequently overwhelm the spot's sheltering effect.",

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1464899582853-b8b8e01e3ac0?w=900&q=80",
        caption: "Fun peaks at the southern end of the Hossegor beach",
      },
      {
        url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80",
        caption: "Learning to surf on the Landes coast",
      },
      {
        url: "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=900&q=80",
        caption:
          "Hossegor beachfront — the full stretch from La Sud to La Nord",
      },
      {
        url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80",
        caption: "Autumn morning light on the Hossegor ocean side",
      },
    ],
  },

  fr_la_piste: {
    name: "La Piste",
    region: "Capbreton, Landes",
    country: "France",
    tagline:
      "Capbreton's barrel machine — a heavy, hollow beach break flanked by graffiti-covered WWII bunkers that delivers some of the most intense tube rides on the French Atlantic coast when a proper W swell arrives.",

    difficulty: {
      level: 4,
      label: "Advanced / Expert",
      note: "La Piste is a powerful, fast-breaking shoreline barrel that handles triple-overhead swell. It favours regular-footers (left-breaking tendency) and demands the ability to make a steep air-drop takeoff, hold in the tube, and pull out before the inside section closes. Not suitable for intermediates when above head-high.",
    },

    heroImage: "la_piste.jpg",

    stats: [
      { label: "Break Type", value: "Beach Break" },
      { label: "Wave Type", value: "Left (favoured) & Right" },
      { label: "Best Swell", value: "W – NW" },
      { label: "Swell Size", value: "2 – 10ft (ocean)" },
      { label: "Wave Face", value: "Head high – 3× Overhead" },
      { label: "Best Wind", value: "E (Offshore)" },
      { label: "Best Tide", value: "Low – Mid" },
      { label: "Fun Factor", value: "9 / 10 (when on)" },
    ],

    story: {
      heading: "Bunkers, Barrels & the Gouf",
      body: [
        "La Piste is the signature wave of Capbreton — a stretch of beach framed by concrete WWII bunkers that have been tumbled, tilted, and half-swallowed by the sand over decades. They are now covered in surf art, salt spray, and layered graffiti, and they sit as permanent landmarks in one of the most photographed surf beaches in Europe. The setting alone is dramatic; the waves are the real story.",
        "Like Hossegor just a few kilometres north, Capbreton benefits from the Gouf de Capbreton canyon — the enormous submarine trench that begins just 300 metres from the harbour mouth and channels raw Atlantic swell energy directly to the coast. La Piste needs slightly more swell energy than the open beaches of Hossegor to ignite, but when it does, the banks here produce heavy, barrelling lefts that are among the best in the region.",
        "The famous VVF section — named after the camping village behind the dunes — adds length to the line-up further north along the same beach and can provide slightly more forgiving peaks when the main La Piste bunker section is too intense.",
      ],
    },

    technical: [
      {
        title: "The Left",
        icon: "🌊",
        content:
          "La Piste clearly favours regular-footers. The predominant left-breaking bank produces steep drops into tight tube sections before linking into a fast open face toward the south. On the best days the left offers a barrel section, a connecting wall, and a final inside tube before closing out — a three-section wave that demands both power surfing and tube-riding ability to complete.",
      },
      {
        title: "The WWII Bunker Banks",
        icon: "🏗️",
        content:
          "The collapsed concrete bunkers scattered across the sand have, over decades, influenced how sandbars form around them. Irregular sandbar shapes produce the distinctive hollow, wedging peaks that make La Piste special. However, the same concrete also creates occasional subsurface obstacles near the shore — be aware of lumps of concrete at very low tide.",
      },
      {
        title: "Low to Mid Tide Only",
        icon: "🌊",
        content:
          "La Piste hits its best form from low tide through mid incoming. At low tide the shallow banks produce steep, ledging drops and maximum hollowness. The wave quality deteriorates as the tide pushes above mid, becoming a more violent, unpredictable close-out at high tide. Plan sessions around the tide chart.",
      },
      {
        title: "Swell Threshold",
        icon: "📡",
        content:
          "La Piste needs more swell energy than the Hossegor beaches to truly activate. On a day when La Gravière is 4ft and fun, La Piste may only be showing 2–3ft and inconsistent. Wait for 6ft+ at La Gravière before expecting La Piste to fire at its best.",
      },
    ],

    hazards: [
      {
        level: "high",
        title: "Powerful Shorebreak",
        detail:
          "La Piste's banks produce waves that break very close to shore with serious force. The shorebreak alone — even on a moderate day — can flip, roll, and pin surfers on the bottom. Always exit the water well clear of the shore zone.",
      },
      {
        level: "high",
        title: "Rip Currents & Localism",
        detail:
          "Strong rips run along the beach, particularly between the bunker section and the VVF zone. La Piste also has a well-established local crew who surf here year-round. The line-up etiquette is strictly observed — respect priority, sit wide on first arrival, and earn your place in the rotation.",
      },
      {
        level: "medium",
        title: "Concrete Bunker Debris",
        detail:
          "WWII bunkers have partially collapsed into the sand. At very low tide, irregular concrete slabs may be present near the shoreline. Scan the inside section before paddling out and identify any submerged hazards.",
      },
      {
        level: "medium",
        title: "Close-outs at Size",
        detail:
          "Above 6–8ft, La Piste tends to close out across the full bank. The consequence of a wipeout — being driven into the sand in shallow water by a heavy lip — increases significantly. If in doubt, spectate from the dune.",
      },
    ],

    access: {
      overview:
        "La Piste is located along the north end of Capbreton's surf beach, clearly identifiable by the WWII concrete bunkers visible from the roadside.",
      steps: [
        "Fly into Biarritz Airport (BIQ), 20km south — the closest airport to Capbreton",
        "Take the D28 north from Capbreton town center toward the beach car parks",
        "Follow the coastal road north — the bunkers are visible from the car park",
        "Walk through the dune access path toward the bunker section — this is the La Piste peak",
        "Check conditions from the dunes before suiting up",
      ],
      tip: "The VVF section (north of the main bunker peak) is slightly less intense than the core La Piste break and can be a better option on big days when the main peak is too heavy. Walk north along the beach to find less crowded, still-quality peaks.",
    },

    seasonChart: [
      { month: "Jan", swell: 6, wind: 3, overall: 5 },
      { month: "Feb", swell: 6, wind: 4, overall: 5 },
      { month: "Mar", swell: 5, wind: 5, overall: 5 },
      { month: "Apr", swell: 4, wind: 6, overall: 4 },
      { month: "May", swell: 3, wind: 6, overall: 3 },
      { month: "Jun", swell: 2, wind: 6, overall: 2 },
      { month: "Jul", swell: 2, wind: 6, overall: 3 },
      { month: "Aug", swell: 3, wind: 6, overall: 3 },
      { month: "Sep", swell: 7, wind: 8, overall: 7 },
      { month: "Oct", swell: 9, wind: 9, overall: 9 },
      { month: "Nov", swell: 8, wind: 7, overall: 8 },
      { month: "Dec", swell: 6, wind: 4, overall: 5 },
    ],
    seasonNote:
      "La Piste is an October-November specialist. Big autumn groundswells from W-NW, combined with the easterly offshore wind pattern, produce the classic Capbreton barrel sessions. Winter has the biggest raw swell but more storm weather. Summer is fun on rare pulse swells but La Piste needs real energy to show its best.",

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80",
        caption:
          "Hollow left breaking at La Piste — the signature Capbreton barrel",
      },
      {
        url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80",
        caption: "Atlantic swell stacking up against the Landes coast",
      },
      {
        url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=900&q=80",
        caption: "Checking the surf from the beach at Capbreton",
      },
      {
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80",
        caption: "Autumn session — clean banks, offshore wind, perfect light",
      },
    ],
  },

  fr_santocha: {
    name: "Santocha",
    region: "Capbreton, Landes",
    country: "France",
    tagline:
      "Capbreton's most accessible quality peak — a peaky beachbreak with multiple options at all tides, picture-perfect bowling waves on the right day, and the iconic WWII bunkers framing every session.",

    difficulty: {
      level: 2,
      label: "Intermediate",
      note: "santocha",
    },

    heroImage: "santocha.jpg",

    stats: [
      { label: "Break Type", value: "Beach Break (Peaky)" },
      { label: "Wave Type", value: "Left & Right" },
      { label: "Best Swell", value: "W – NW" },
      { label: "Swell Size", value: "1 – 8ft (ocean)" },
      { label: "Wave Face", value: "Waist – 2× Overhead" },
      { label: "Best Wind", value: "E (Offshore)" },
      { label: "Best Tide", value: "All tides" },
      { label: "Fun Factor", value: "8 / 10" },
    ],

    story: {
      heading: "Bowling Peaks & Bunker Views",
      body: [
        "Santocha — sometimes called La Savane — is the beach immediately south of La Piste and it shares the same extraordinary setting: long stretches of pale Atlantic sand punctuated by the looming grey shapes of WWII coastal defence bunkers, slowly tilting into the dunes as the sand beneath them shifts decade by decade.",
        "The waves here are defined by their multiple peaks. Unlike La Piste, which focuses energy into specific heavy banks, Santocha offers several options spread across the beach — a wider, more peaky pattern that gives different positions to surfers of different levels and spreads the crowd more effectively.",
        "Santocha works at all tides and across a wide range of swell sizes — from waist-high fun to solid double-overhead. When La Piste and La Gravière are closing out and borderline dangerous, Santocha will often still be producing rideable, fun waves. It is the spot that keeps on giving.",
      ],
    },

    technical: [
      {
        title: "Peak Selection",
        icon: "🌊",
        content:
          "Santocha's dispersed peak pattern rewards surfers who take the time to read the beach before paddling out. Walk the waterline at low tide and identify the bank with the most pronounced ledge. The crowd tends to gather at the most visible central peak; walking 200m in either direction often yields a better-shaped, less crowded option.",
      },
      {
        title: "All-Tide Performance",
        icon: "🌊",
        content:
          "One of Santocha's key advantages over La Piste is that it works at all tidal stages. The peak shape changes with the tide — low tide exposes shallower banks with more power and hollowness; high tide produces a longer, softer ride that suits carving more than barrel-hunting. Both are enjoyable.",
      },
      {
        title: "Bunker Influence",
        icon: "🏗️",
        content:
          "The WWII blockhaus structures on the beach are part of the bank-shaping system, creating the distinctive bowling peak shapes that Santocha is known for. Like La Piste, check for any exposed concrete slabs at extreme low tide near the shoreline before entering.",
      },
      {
        title: "Swell Size & Quality",
        icon: "📡",
        content:
          "Santocha works best in the 2–5ft range where the peaks are well-defined and makeable across their full face. Above 6ft the beach can become powerful and close-out sections appear more frequently. Below 2ft it is still rideable — more so than La Piste, which needs real energy.",
      },
    ],

    hazards: [
      {
        level: "medium",
        title: "Rip Currents",
        detail:
          "Rip channels are ever-present at Santocha between the active peaks. Always identify rip positions from the beach before paddling out. Use the rip to paddle out by angling into it, then exit through the shoulder.",
      },
      {
        level: "medium",
        title: "Powerful Peaks at Size",
        detail:
          "Above 5–6ft of ocean swell, Santocha's peaks become heavy and fast, with close-out risks increasing significantly. Intermediate surfers should be cautious about paddling out when waves exceed head-high. Watch from the beach for 10–15 minutes before committing.",
      },
      {
        level: "low",
        title: "Concrete Bunker Debris",
        detail:
          "WWII bunker structures have partially eroded into the beach. During extreme low tides on large spring tides, submerged concrete may be present near the shoreline.",
      },
      {
        level: "low",
        title: "Summer Crowd Density",
        detail:
          "July and August bring significant numbers of visiting surfers to Santocha. Early morning (pre-8am) sessions sidestep the worst of the crowds.",
      },
    ],

    access: {
      overview:
        "Santocha (La Savane beach) is accessible along the northern Capbreton coastal road. The WWII bunkers are clearly visible from the road and serve as the landmark for the main beach access point.",
      steps: [
        "Fly into Biarritz Airport (BIQ), 20km south, or connect via TGV to Bayonne then drive 20 min north",
        "From Capbreton town, follow the coastal road north (D28) toward La Piste",
        "Santocha is immediately south of La Piste — park at either the La Piste car park or the La Savane car park",
        "The beach is accessed via dune walkways — the bunkers are clearly visible from the access path",
        "Walk the beach to assess peaks before suiting up — conditions vary significantly between the bunker zone and further south",
      ],
      tip: "Santocha sits between La Piste to the north and Les Océanides to the south — both worth checking on the same session. If Santocha's central peak is crowded, walk south toward Les Océanides for quality waves with a fraction of the crowd.",
    },

    seasonChart: [
      { month: "Jan", swell: 6, wind: 3, overall: 5 },
      { month: "Feb", swell: 6, wind: 5, overall: 5 },
      { month: "Mar", swell: 6, wind: 6, overall: 6 },
      { month: "Apr", swell: 5, wind: 7, overall: 6 },
      { month: "May", swell: 4, wind: 7, overall: 5 },
      { month: "Jun", swell: 3, wind: 6, overall: 4 },
      { month: "Jul", swell: 3, wind: 6, overall: 4 },
      { month: "Aug", swell: 4, wind: 6, overall: 5 },
      { month: "Sep", swell: 7, wind: 8, overall: 8 },
      { month: "Oct", swell: 9, wind: 9, overall: 9 },
      { month: "Nov", swell: 8, wind: 7, overall: 8 },
      { month: "Dec", swell: 6, wind: 4, overall: 5 },
    ],
    seasonNote:
      "Santocha is one of the more versatile spots on the Capbreton coast — it works in a wider range of conditions than La Piste. October is the peak month. The shoulder months (September, November, April, May) provide good mid-size waves. Summer produces less swell but the spot can still deliver on good days.",

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=80",
        caption:
          "Bowling peak at Santocha — the characteristic Capbreton shape",
      },
      {
        url: "https://images.unsplash.com/photo-1464899582853-b8b8e01e3ac0?w=900&q=80",
        caption: "Multiple peaks spread across the Santocha beach",
      },
      {
        url: "https://images.unsplash.com/photo-1437263674751-c7b8618adadb?w=900&q=80",
        caption: "Dawn session with offshore easterlies — Capbreton coast",
      },
      {
        url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80",
        caption: "Clean autumn swell on the Landes beachfront",
      },
    ],
  },
};
