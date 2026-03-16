/**
 * Spot info — Indonesia: Bali
 * Spots: uluwatu (+ sub-spots), balangan, padang_padang,
 *         impossibles, bingin, nusa_dua, melasti, green_bowl,
 *         pandawa, gunung_payung
 */
export const INDONESIA_BALI_INFO = {
  // ─── Uluwatu Complex ───────────────────────────────────────────────────────

  uluwatu: {
    name: "Uluwatu",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "Bali's most iconic wave — a long, winding left-hander that spills out of a cave at the base of a cliff and delivers world-class barrels across multiple sections to one of surfing's most breathtaking settings.",

    difficulty: {
      level: 4,
      label: "Advanced",
      note: "Multiple sections with very different characters. The Peak and Racetracks demand advanced ability on the face; Outside Corner becomes a big wave spot above 8ft. The cave entry/exit is the primary barrier — it requires precise timing and confidence in a narrow, current-affected space.",
    },

    heroImage: "uluwatu.jpg",

    stats: [
      { label: "Break Type",   value: "Reef Break"                    },
      { label: "Wave Type",    value: "Left-hand point"               },
      { label: "Best Swell",   value: "SW – W"                        },
      { label: "Swell Size",   value: "3 – 10ft (ocean)"              },
      { label: "Best Wind",    value: "E – SE Offshore"               },
      { label: "Best Tide",    value: "Mid tide"                      },
      { label: "Sections",     value: "The Peak, Racetracks, Temples" },
      { label: "Crowd Factor", value: "High (9 / 10)"                 },
    ],

    story: {
      heading: "The Cathedral of Balinese Surfing",
      body: [
        "There is no more photogenic surf spot in Indonesia and arguably none more famous in all of Asia. Uluwatu sits at the southern tip of the Bukit Peninsula, where towering limestone cliffs drop straight into the Indian Ocean. The surf is accessed through a narrow cave cut into the cliff face — a paddle-out ritual that newcomers find intimidating and regulars barely notice.",
        "The wave itself is a long left-hander that breaks across several sections, each with its own name and character. It has hosted professional surfing events for decades, introduced countless visiting surfers to Balinese reef breaks, and appeared in every significant surf film about the region. Its status is earned — when the swell is running and the morning trade winds are offshore, it is genuinely one of the world's great waves.",
        "The crowd is the constant variable. On any morning with a swell running, the lineup at The Peak will have 50–100 surfers. The lineups thin out as you move north through the sections. Knowing how to read the current, where to sit for your level, and how to pick waves away from the main pack is the skill that separates frustrating sessions from memorable ones.",
      ],
    },

    technical: [
      {
        title:   "The Cave Entry",
        icon:    "🪨",
        content: "The only way in and out is through a cave at the base of the cliff. Timing is critical — you enter on the push of a wave and exit the same way. There is a current running through the cave that builds with the swell size. On bigger days, the exit can be violent. Watch others entering and exiting before going yourself on your first session.",
      },
      {
        title:   "Sections & Lineups",
        icon:    "🌊",
        content: "Three main sections, each progressively more powerful moving south: Temples (most sheltered, suits intermediates on smaller days), Racetracks (long fast walls, intermediate–advanced), The Peak (steepest, most barrelling, expert territory). Outside Corner kicks in above 6ft as a heavy outer reef. Each section has its own crowd and dynamics.",
      },
      {
        title:   "Tidal Reading",
        icon:    "🌊",
        content: "Mid tide produces the best all-round conditions across all sections. High tide softens the wave significantly. Low tide is extremely shallow at The Peak and produces a very hollow, dangerous wave suited only to expert surfers. The tidal range is small (~0.5m) so the window is more forgiving than Atlantic or mainland spots.",
      },
      {
        title:   "Current Management",
        icon:    "💨",
        content: "A north-running current tracks along the reef throughout the day. It will pull you north along the sections if you are passive in the lineup. Paddling to stay in position is constant work — especially at The Peak. Experienced Uluwatu surfers use the current to move between sections intentionally rather than fighting it.",
      },
    ],

    hazards: [
      {
        level:  "high",
        title:  "Cave Entry & Exit",
        detail: "The cave is the single biggest hazard for visitors. Getting the timing wrong on exit means being thrown into the cave walls by white water. On bigger days, some surfers are held underwater against the cave ceiling. If in doubt about conditions, watch from the clifftop viewing platform before committing.",
      },
      {
        level:  "high",
        title:  "Shallow Reef at Low Tide",
        detail: "The Peak at low tide is extremely shallow. Wipeouts here result in contact with sharp reef. At low tide only experts should attempt The Peak; Temples is the safer option for most levels.",
      },
      {
        level:  "medium",
        title:  "Crowd & Paddle Battles",
        detail: "50–100 surfers in the lineup on any good day. Dropping in is common, mostly unintentional. Give way assertively when someone is on a wave and take ownership of your own priority. Do not paddle for waves you cannot make — causing a collision is the fastest way to create conflict in an already tense lineup.",
      },
      {
        level:  "low",
        title:  "Monkeys on the Cliff",
        detail: "The monkeys at Uluwatu temple are notorious for stealing sunglasses, hats, and food. Secure all valuables in your bag before starting the walk down to the cave. The temple staff can sometimes negotiate items back for a small fee.",
      },
    ],

    access: {
      overview: "Uluwatu is accessed via the temple complex on the Bukit Peninsula. A steep staircase leads down the cliff face to the cave. Most surf camps and accommodation in Bali run shuttle transfers to Uluwatu in the morning.",
      steps: [
        "From Kuta or Seminyak, take the Jalan Uluwatu road south through the Bukit (~45 minutes)",
        "Pass through the temple complex — there is an entry fee for the temple grounds",
        "Walk south from the temple along the cliff path to the surf access staircase",
        "Descend to the cave — timing your entry is critical, watch the water before entering",
        "Exit via the cave on the push of a small wave — this is the same cave in both directions",
      ],
      tip: "Go for the 6am session. The lineup at Uluwatu is manageable at first light and the offshore E–SE morning trade wind is at its cleanest. By 9am the crowd triples and the wind can be affected by thermal activity. Warung Uluwatu at the top of the cliff does excellent smoothie bowls for post-surf.",
    },

    seasonChart: [
      { month: "Jan", swell: 4, wind: 3, overall: 3 },
      { month: "Feb", swell: 4, wind: 3, overall: 4 },
      { month: "Mar", swell: 5, wind: 5, overall: 5 },
      { month: "Apr", swell: 7, wind: 7, overall: 7 },
      { month: "May", swell: 8, wind: 8, overall: 8 },
      { month: "Jun", swell: 9, wind: 9, overall: 9 },
      { month: "Jul", swell: 10, wind: 9, overall: 10 },
      { month: "Aug", swell: 9, wind: 9, overall: 9 },
      { month: "Sep", swell: 8, wind: 8, overall: 8 },
      { month: "Oct", swell: 7, wind: 7, overall: 7 },
      { month: "Nov", swell: 5, wind: 4, overall: 5 },
      { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote: "Peak season is May–September when Indian Ocean groundswells arrive consistently and SE trade winds blow offshore all morning. July is the prime month. The wet season (November–March) still produces surf but winds are less reliable and the occasional N–NW wind completely shuts the break down.",

    gallery: [
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "Uluwatu — the left reeling from the cave" },
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "The cliff face and temple at first light" },
      { url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80", caption: "Long left walls across the Racetracks section" },
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "Inside the cave — the entry that defines the experience" },
    ],
  },

  ulu_the_peak: {
    name: "Uluwatu: The Peak",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "The most coveted section of Uluwatu — steep, hollow, and always crowded. The place to be when a solid SW swell lines up perfectly with the reef.",

    difficulty: { level: 4, label: "Advanced / Expert",
      note: "Steep drops, a heavy first section, and an extremely shallow reef at low tide. Expert surfers only when the swell is above 6ft. Advanced surfers can enjoy it safely at 3–5ft on mid tide." },

    heroImage: "uluwatu.jpg",
    stats: [
      { label: "Break Type",  value: "Reef Break"         },
      { label: "Wave Type",   value: "Left — steep barrel" },
      { label: "Best Swell",  value: "SW"                 },
      { label: "Best Wind",   value: "E – SE Offshore"    },
      { label: "Best Tide",   value: "Mid tide"           },
      { label: "Crowd",       value: "Extreme"            },
    ],
    story: {
      heading: "The Main Event",
      body: [
        "The Peak is the southernmost and most powerful section of Uluwatu — the spot on the reef where sets stand up most abruptly, the lip throws hardest, and the barrel section is tightest. It is also the section most photographers are shooting from the cliff and the one that most surfers want to be on.",
        "On a 5–7ft SW swell with east wind and mid tide, The Peak produces world-class left-hand barrels that wind down the reef into Racetracks. Getting a clean one to yourself requires patience, positioning, and a willingness to sit on the peak through many passed-up sets waiting for the right one.",
      ],
    },
    technical: [
      { title: "The Drop", icon: "🌊", content: "Steep, often vertiginous takeoff that demands commitment. The first section is the most critical — any hesitation or wasted time getting to your feet results in a late drop and a straight freefall over the lip. Get to your feet early, set your line low, and drive hard into the first turn." },
      { title: "Positioning", icon: "🏄", content: "The pack sits slightly inside the peak, waiting for set waves. Positioning yourself deeper (further out and south) than the crowd gives first priority on the larger sets — but also means you take the biggest drops. Study the set patterns before choosing your position." },
      { title: "Reef Awareness", icon: "🪨", content: "The reef at The Peak is dangerous at low tide. Never paddle out here at low tide unless you are an expert surfer who has surfed the section before. Mid tide fills in the worst sections." },
    ],
    hazards: [
      { level: "high",   title: "Shallow Reef at Low Tide",  detail: "Extremely shallow. Low tide only for experts." },
      { level: "high",   title: "Cave Entry/Exit",           detail: "See main Uluwatu entry for full detail." },
      { level: "medium", title: "Crowd Intensity",           detail: "The Peak has the highest concentration of surfers and the most aggressive paddle battles at Uluwatu. Strict priority awareness required." },
    ],
    access: { overview: "Accessed via the Uluwatu cave — same entry as all Uluwatu sections. The Peak is the first section you encounter after exiting the cave heading south.", steps: [ "Enter through the Uluwatu cave (see main Uluwatu entry)", "Paddle south from the cave exit — The Peak is the southernmost section", "Position yourself on the peak — the takeoff zone is clearly identifiable by the crowd" ], tip: "Dawn patrol on a weekday. Weekends are significantly more crowded." },
    seasonChart: [
      { month: "Jan", swell: 4, wind: 3, overall: 3 }, { month: "Feb", swell: 4, wind: 3, overall: 4 },
      { month: "Mar", swell: 5, wind: 5, overall: 5 }, { month: "Apr", swell: 7, wind: 7, overall: 7 },
      { month: "May", swell: 8, wind: 8, overall: 8 }, { month: "Jun", swell: 9, wind: 9, overall: 9 },
      { month: "Jul", swell: 10, wind: 9, overall: 10 }, { month: "Aug", swell: 9, wind: 9, overall: 9 },
      { month: "Sep", swell: 8, wind: 8, overall: 8 }, { month: "Oct", swell: 7, wind: 7, overall: 7 },
      { month: "Nov", swell: 5, wind: 4, overall: 5 }, { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote: "Identical to the main Uluwatu seasonal pattern — peaks in June–August with Indian Ocean groundswells and SE trade winds.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "The Peak — a perfect left standing up on the reef" },
      { url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80", caption: "Tube section from the crowd perspective" },
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "Late afternoon at Uluwatu cliff" },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", caption: "Bali south coast — the Bukit limestone cliffs" },
    ],
  },

  ulu_racetracks: {
    name: "Uluwatu: Racetracks",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "Uluwatu's long-wall section — connecting rides from The Peak that run fast and open across the mid-reef, rewarding surfers who can match the wave's speed.",

    difficulty: { level: 3, label: "Intermediate / Advanced",
      note: "Longer, faster walls than The Peak but not as steep on takeoff. Advanced intermediates can surf here safely on smaller days. Becomes very fast and demanding at size." },

    heroImage: "uluwatu.jpg",
    stats: [
      { label: "Break Type",  value: "Reef Break"      },
      { label: "Wave Type",   value: "Left — fast wall" },
      { label: "Best Swell",  value: "SW – W"          },
      { label: "Best Wind",   value: "E – SE Offshore" },
      { label: "Best Tide",   value: "Mid tide"        },
      { label: "Wave Length", value: "100–200m runs"   },
    ],
    story: {
      heading: "Uluwatu's Fast Lane",
      body: [
        "Racetracks is the mid-reef section of Uluwatu where waves that have already broken at The Peak connect and find a second gear — walling fast and open across the reef with room to make big, committed turns. The name fits: waves here move at speed and reward surfers who can match them.",
        "For surfers who find The Peak too intense or too crowded, Racetracks offers a genuine alternative. The takeoff is less steep, the barrel section is less frequent but still present, and there is more margin for error. On a solid day with good swell, a wave ridden all the way from The Peak through Racetracks to Temples can be 200+ metres of riding.",
      ],
    },
    technical: [
      { title: "Wave Speed", icon: "🌊", content: "Racetracks moves fast. The wall outruns slower surfers, producing the demoralising experience of getting to your feet and watching the section ahead close down before you reach it. Speed generation from the first turn is the key skill — use the initial drop to get into a bottom turn and project hard into the first section." },
      { title: "Connecting Through", icon: "🏄", content: "The best Racetracks experience is riding all the way from a The Peak set wave, through the connecting wall, and into Temples. This requires reading the wave immediately on takeoff and committing to the full ride rather than turning back toward the channel." },
    ],
    hazards: [
      { level: "medium", title: "Reef Exposure", detail: "Shallow on the inside sections at low tide. Stay on the face of the wave and avoid falling in the trough section at low water." },
      { level: "medium", title: "Wave Speed Close-outs", detail: "At size, sections of Racetracks that were makeable at 4ft become unavoidable close-outs at 6ft. Know when to kick out early rather than getting pitched over a closing section." },
    ],
    access: { overview: "Accessed via the Uluwatu cave. Racetracks is the mid section — paddle north from The Peak or south from Temples.", steps: [ "Enter via the Uluwatu cave", "Paddle north from the cave exit toward the mid-reef — this is Racetracks" ], tip: "If The Peak is too crowded, sit at Racetracks and wait for set waves to connect through from The Peak. You get the full ride with a fraction of the crowd." },
    seasonChart: [
      { month: "Jan", swell: 4, wind: 3, overall: 3 }, { month: "Feb", swell: 4, wind: 3, overall: 4 },
      { month: "Mar", swell: 5, wind: 5, overall: 5 }, { month: "Apr", swell: 7, wind: 7, overall: 7 },
      { month: "May", swell: 8, wind: 8, overall: 8 }, { month: "Jun", swell: 9, wind: 9, overall: 9 },
      { month: "Jul", swell: 10, wind: 9, overall: 10 }, { month: "Aug", swell: 9, wind: 9, overall: 9 },
      { month: "Sep", swell: 8, wind: 8, overall: 8 }, { month: "Oct", swell: 7, wind: 7, overall: 7 },
      { month: "Nov", swell: 5, wind: 4, overall: 5 }, { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote: "Same season as the main Uluwatu complex — May–September peak.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "Long open wall connecting through Racetracks" },
      { url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80", caption: "Full speed down the line" },
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "Uluwatu mid-section — the fast lane" },
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80", caption: "Bukit cliffs from the water" },
    ],
  },

  ulu_outside_corner: {
    name: "Uluwatu: Outside Corner",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "Uluwatu's big wave section — an outer reef that only shows its full potential above 8ft and draws the serious big-wave surfers out of the regular lineup.",

    difficulty: { level: 5, label: "Expert / Big Wave",
      note: "Only activates properly above 6–8ft. Extremely heavy, long paddle-out, powerful hold-downs. Expert big wave surfers only. Observe from the cliff before any paddle-out consideration." },

    heroImage: "uluwatu.jpg",
    stats: [
      { label: "Break Type",  value: "Outer Reef"             },
      { label: "Wave Type",   value: "Left — big wave"        },
      { label: "Best Swell",  value: "W – NW (large, 12s+)"  },
      { label: "Swell Size",  value: "8ft+ (ocean)"           },
      { label: "Best Wind",   value: "E – SE Offshore"        },
      { label: "Board",       value: "Gun / Step-up required" },
    ],
    story: {
      heading: "When the Ocean Gets Serious",
      body: [
        "On the largest swells of the year — when every other section at Uluwatu is maxed out and barely rideable — Outside Corner wakes up. It sits further out to sea than the main reef, breaking on a submerged shelf that only becomes visible to surfers when the swell has enough size and period to reach it.",
        "When it fires, Outside Corner is one of the most impressive waves in Bali. Thick, dark walls of water roll in from the open Indian Ocean, stand up on the outer shelf, and throw with the weight of a wave that has travelled thousands of kilometres without interruption. Only the most committed big-wave surfers make the long paddle out.",
      ],
    },
    technical: [
      { title: "Activation Threshold", icon: "📡", content: "Outside Corner needs at least 8ft of swell energy at the main break to activate. Below that it is an inconsistent, un-surfable outer lump. Above 8ft it transforms into a legitimate big wave spot. Above 12ft it is tow-territory for most surfers." },
      { title: "Equipment", icon: "🏄", content: "A step-up or gun is mandatory. Standard shortboards are inadequate for generating enough paddle speed to get into the walls before they close out. A 7'4\"–8'6\" depending on the size of the day." },
    ],
    hazards: [
      { level: "high", title: "Extreme Wave Size", detail: "Hold-downs on Outside Corner are long and powerful. The distance from shore means rescue is difficult. Never paddle out alone." },
      { level: "high", title: "Paddle Distance", detail: "The paddle to the outside corner from the cave is significant. In large surf with current running, it requires real fitness and technique to reach the lineup." },
      { level: "medium", title: "Current", detail: "The northward current running along the reef is strongest when the swell is largest — exactly when Outside Corner is breaking. It will carry you toward the inside sections if you are passive." },
    ],
    access: { overview: "Accessed via the Uluwatu cave. Outside Corner is reached by paddling south past The Peak and continuing to the outer reef.", steps: [ "Enter via the Uluwatu cave", "Paddle south past The Peak", "Continue paddling south and outward to the outer reef shelf — this is a long paddle in big surf" ], tip: "Watch from the cliff for a full session before paddling out for the first time. Understand the current pattern, the set intervals, and the paddle-out route before committing." },
    seasonChart: [
      { month: "Jan", swell: 2, wind: 2, overall: 2 }, { month: "Feb", swell: 2, wind: 2, overall: 2 },
      { month: "Mar", swell: 3, wind: 3, overall: 3 }, { month: "Apr", swell: 5, wind: 6, overall: 5 },
      { month: "May", swell: 7, wind: 7, overall: 7 }, { month: "Jun", swell: 8, wind: 8, overall: 8 },
      { month: "Jul", swell: 9, wind: 9, overall: 9 }, { month: "Aug", swell: 9, wind: 8, overall: 8 },
      { month: "Sep", swell: 7, wind: 7, overall: 7 }, { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 3, wind: 3, overall: 3 }, { month: "Dec", swell: 2, wind: 2, overall: 2 },
    ],
    seasonNote: "Only relevant during the peak Indian Ocean swell season (June–August). Inactive most of the year.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80", caption: "Outside Corner — the outer reef activating" },
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "Large swell at the Bukit Peninsula" },
      { url: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&q=80", caption: "Big wave paddle session at Uluwatu" },
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "The outer reef from the cliff" },
    ],
  },

  ulu_temples: {
    name: "Uluwatu: Temples",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "The most accessible section of Uluwatu — longer, more forgiving lefts in the shadow of the temple that suit intermediate surfers and offer an escape from the intensity of The Peak.",

    difficulty: { level: 2, label: "Intermediate",
      note: "The most forgiving section in the Uluwatu complex. Beginners with reef experience can surf here safely on smaller days. Still a reef break — basic reef awareness and swimming ability required." },

    heroImage: "uluwatu.jpg",
    stats: [
      { label: "Break Type",  value: "Reef Break"        },
      { label: "Wave Type",   value: "Left — open wall"  },
      { label: "Best Swell",  value: "SW – W"            },
      { label: "Best Wind",   value: "E – SE Offshore"   },
      { label: "Best Tide",   value: "All tides"         },
      { label: "Crowd Factor",value: "Moderate"          },
    ],
    story: {
      heading: "The Approachable End",
      body: [
        "Temples is the northernmost section of the Uluwatu complex, breaking closest to the temple itself and offering waves that are noticeably more forgiving than the sections further south. The reef here is deeper, the waves less hollow, and the crowd thinner — making it a natural starting point for surfers visiting Uluwatu for the first time.",
        "On the best days — solid SW swell with clean east wind — Temples connects with waves running through from Racetracks and produces surprisingly long rides that wall predictably toward the cliff. It is a genuinely enjoyable wave in its own right, not just a consolation prize for surfers who couldn't get waves at The Peak.",
      ],
    },
    technical: [
      { title: "Wave Character", icon: "🌊", content: "Longer period, less hollow waves that break with more warning than The Peak. The takeoff zone is less critical and the face is more open, giving more time to generate speed and position for turns. On smaller days this is a legitimate fun wave — on bigger days it can still produce barrel sections." },
      { title: "All-Tide Performance", icon: "🌊", content: "Works across more of the tidal range than The Peak because the reef is deeper here. This makes session planning simpler and extends the morning window." },
    ],
    hazards: [
      { level: "medium", title: "Cave Entry/Exit",   detail: "Same cave as the rest of Uluwatu. Requires correct timing — see main Uluwatu entry." },
      { level: "medium", title: "Reef on Inside",    detail: "Still a reef break with a shallow inside section. Always use the channel for exit." },
      { level: "low",    title: "Crowd on Good Days", detail: "Temples fills up when The Peak and Racetracks become too crowded. Still less intense than the main sections but plan for 20–30 surfers on good swell days." },
    ],
    access: { overview: "Accessed via the Uluwatu cave. Temples is the northernmost section — paddle north from the cave exit.", steps: [ "Enter via the Uluwatu cave", "Paddle north from the cave exit — Temples is the first section you reach heading toward the temple", "Sit on the peak just inside the main crowd" ], tip: "If you're surfing Uluwatu for the first time, start at Temples. Learn the current patterns and wave character before moving south to Racetracks or The Peak." },
    seasonChart: [
      { month: "Jan", swell: 4, wind: 3, overall: 4 }, { month: "Feb", swell: 4, wind: 4, overall: 4 },
      { month: "Mar", swell: 5, wind: 5, overall: 5 }, { month: "Apr", swell: 7, wind: 7, overall: 7 },
      { month: "May", swell: 8, wind: 8, overall: 8 }, { month: "Jun", swell: 9, wind: 9, overall: 9 },
      { month: "Jul", swell: 10, wind: 9, overall: 10 }, { month: "Aug", swell: 9, wind: 9, overall: 9 },
      { month: "Sep", swell: 8, wind: 8, overall: 8 }, { month: "Oct", swell: 7, wind: 7, overall: 7 },
      { month: "Nov", swell: 5, wind: 4, overall: 5 }, { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote: "Same seasonal pattern as the main Uluwatu complex but with slightly higher scores in the shoulder months (Mar–Apr, Oct) because the deeper reef produces a more consistent wave even on smaller swells.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "Temples section — forgiving walls in the shadow of the temple" },
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "The Uluwatu temple perched above the surf" },
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "Morning session at Temples — smaller crowd" },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", caption: "Approaching the Bukit cliff from the water" },
    ],
  },

  ulu_the_bombie: {
    name: "Uluwatu: The Bombie",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "A rarely-breaking outer reef bombora that produces Bali's heaviest tow-in waves when a truly exceptional swell arrives — a once-or-twice-a-season spectacle.",

    difficulty: { level: 5, label: "Tow-In / Extreme",
      note: "Paddle-in only possible for the world's elite big wave surfers. Realistically a tow-in wave. If you are reading this to decide whether to paddle out — the answer is no." },

    heroImage: "uluwatu.jpg",
    stats: [
      { label: "Break Type",  value: "Outer Reef Bombora"    },
      { label: "Wave Type",   value: "Left — extreme size"   },
      { label: "Best Swell",  value: "W – NW (20s+, 15ft+)"  },
      { label: "Swell Size",  value: "15ft+ (ocean)"          },
      { label: "Frequency",   value: "2–4 times per year"     },
      { label: "Access",      value: "Tow-in / Water craft"   },
    ],
    story: {
      heading: "The Bombie",
      body: [
        "Sitting a kilometre offshore from the Uluwatu complex, The Bombie is an outer reef that breaks only on the largest swells of the year. On a standard good day at Uluwatu, The Bombie is invisible — just a section of open ocean with no evidence of what lies beneath. When a W or NW swell exceeds 15ft at the break, it surfaces.",
        "The waves that break here are among the heaviest in Bali. They stand up on a submerged shelf and throw huge lips far out over the trough. Watching from the Uluwatu cliff on a big day, you can see the Bombie breaking in the distance — enormous, powerful, remote. It is surfed by jet ski and tow-in only.",
      ],
    },
    technical: [
      { title: "Activation", icon: "📡", content: "The Bombie requires a minimum 15ft swell at the main break with a W–NW direction and long period (16s+). These conditions occur 2–4 times per year. Monitor buoy data during the peak season for prediction." },
      { title: "Tow Access", icon: "🚤", content: "Jet ski access from the channel north of the Uluwatu cave. The ride out to the Bombie is significant in big surf. Coordination with experienced tow partners who know the spot is essential — this is not a first-time tow-in venue." },
    ],
    hazards: [
      { level: "high", title: "Extreme Hold-Downs",    detail: "Two-wave hold-downs are documented at this spot. Remote location means no lifeguard or coast guard response within a reasonable timeframe." },
      { level: "high", title: "Distance from Shore",   detail: "1km offshore. Any equipment failure is a serious situation." },
    ],
    access: { overview: "Tow-in only. Jet ski access from the Uluwatu channel on large swell days.", steps: [ "Monitor Indian Ocean buoy data for 15ft+ W-NW swell with 16s+ period", "Coordinate with local tow-in crew and jet ski operators in the Uluwatu area", "Launch from the main channel north of the cave entry" ], tip: "This spot is surfed by a small number of elite local and international big wave surfers. If you don't already know who to call, you're not ready for this spot." },
    seasonChart: [
      { month: "Jan", swell: 1, wind: 1, overall: 1 }, { month: "Feb", swell: 1, wind: 1, overall: 1 },
      { month: "Mar", swell: 2, wind: 2, overall: 2 }, { month: "Apr", swell: 3, wind: 3, overall: 3 },
      { month: "May", swell: 5, wind: 5, overall: 5 }, { month: "Jun", swell: 7, wind: 6, overall: 6 },
      { month: "Jul", swell: 8, wind: 7, overall: 7 }, { month: "Aug", swell: 8, wind: 7, overall: 7 },
      { month: "Sep", swell: 5, wind: 5, overall: 5 }, { month: "Oct", swell: 3, wind: 3, overall: 3 },
      { month: "Nov", swell: 1, wind: 1, overall: 1 }, { month: "Dec", swell: 1, wind: 1, overall: 1 },
    ],
    seasonNote: "Requires exceptional swell — scores reflect probability of the break activating, not swell quality. May–August is when the largest Indian Ocean groundswells occur.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "Large swell — the Bombie visible in the distance" },
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80", caption: "Bali big wave surfing on an exceptional swell" },
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "The outer Uluwatu reef from the cliff" },
      { url: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&q=80", caption: "Tow-in session — Bali south swell" },
    ],
  },

  // ─── Bukit West Spots ──────────────────────────────────────────────────────

  balangan: {
    name: "Balangan",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "A long, beautifully curved left-hander tucked into a limestone cliff bay — less intense than its Bukit neighbours and one of Bali's most scenic surf spots.",

    difficulty: { level: 2, label: "Intermediate",
      note: "More forgiving than Padang Padang or Uluwatu but still a reef break that demands respect. Intermediates will progress well here. Gets powerful on large SW swells." },

    heroImage: "balangan.jpg",
    stats: [
      { label: "Break Type",   value: "Reef Break"              },
      { label: "Wave Type",    value: "Left-hander"             },
      { label: "Best Swell",   value: "SW – W"                  },
      { label: "Swell Size",   value: "2 – 6ft"                 },
      { label: "Best Wind",    value: "E – SE Offshore"         },
      { label: "Best Tide",    value: "Mid tide"                },
      { label: "Setting",      value: "Limestone cliff bay"     },
      { label: "Fun Factor",   value: "8 / 10"                  },
    ],
    story: {
      heading: "Beauty and the Break",
      body: [
        "Balangan is one of the most beautiful surfing locations in Bali. The break sits at the base of tall limestone cliffs that curve around a horseshoe bay of white sand and turquoise water. The setting alone makes a session here worth it — the wave is a bonus.",
        "The left-hander peels from the outer reef section into the bay with a satisfying predictability. It lacks the raw power and hollow character of nearby Padang Padang or Bingin, but what it offers — long, fun walls in a spectacular setting with manageable crowds — is what keeps surfers coming back.",
        "Balangan is consistently busy during peak season but rarely reaches the suffocating crowd levels of Uluwatu or Padang. The bay is large enough to spread surfers out, and the longer lull periods mean the lineup self-regulates naturally.",
      ],
    },
    technical: [
      { title: "Left Wall Character", icon: "🌊", content: "The wave breaks from an outer section and walls toward the inside of the bay. The outer section is the most powerful and provides the steepest drop. The wave softens as it runs into the bay but maintains shape through mid-tide. Best rides are 60–80 metres." },
      { title: "Bay Protection", icon: "🌊", content: "The curved cliff bay provides some shelter from cross-shore winds, keeping Balangan surfable in conditions that affect more exposed breaks. The bay faces generally SW — W swells fill it cleanly." },
      { title: "Reef & Paddle", icon: "🪨", content: "The entry is a rocky reef section at the north end of the beach. A sandy channel runs from the beach directly to the lineup — use it. Exit via the same channel or ride the wave to the shore and walk the beach." },
    ],
    hazards: [
      { level: "medium", title: "Rocky Entry",      detail: "The reef entry can be sharp and awkward — wear reef booties and pick your moment carefully when entering and exiting." },
      { level: "medium", title: "Reef at Low Tide", detail: "Low tide exposes the reef. The outer section becomes very shallow and unpredictable. Mid-to-high tide is safer." },
      { level: "low",    title: "Longshore Current", detail: "A mild longshore current runs through the bay. It won't pull you into dangerous areas but will move you along the beach if you don't paddle back to position between sets." },
    ],
    access: {
      overview: "Balangan Beach is accessed from the Bukit road system. Turn west toward Balangan from the Jimbaran–Uluwatu road. A paved road leads to the cliff top and a staircase descends to the beach.",
      steps: [
        "From Kuta/Seminyak head south to the Bukit via Jimbaran",
        "Take the Balangan road west — follow signs toward Balangan Beach",
        "Pay the small parking fee at the cliff top",
        "Descend the staircase to the beach — the reef entry is at the north end",
      ],
      tip: "Balangan has a good warung at the top of the cliff with excellent fresh coconuts and a clear view of the break. Check conditions over breakfast before suiting up.",
    },
    seasonChart: [
      { month: "Jan", swell: 4, wind: 3, overall: 4 }, { month: "Feb", swell: 4, wind: 3, overall: 4 },
      { month: "Mar", swell: 5, wind: 5, overall: 5 }, { month: "Apr", swell: 7, wind: 7, overall: 7 },
      { month: "May", swell: 8, wind: 8, overall: 8 }, { month: "Jun", swell: 9, wind: 8, overall: 8 },
      { month: "Jul", swell: 9, wind: 9, overall: 9 }, { month: "Aug", swell: 8, wind: 8, overall: 8 },
      { month: "Sep", swell: 7, wind: 8, overall: 7 }, { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 4, wind: 4, overall: 4 }, { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote: "Reliable across the full dry season (April–October). Less powerful than the most exposed Bukit reefs which makes it usable in more wind and swell conditions. Good shoulder-season option.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "Balangan — the left peeling into the limestone bay" },
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "Turquoise water and white sand — the Balangan setting" },
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "Bukit limestone cliffs framing the break" },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", caption: "Offshore morning session at Balangan" },
    ],
  },

  padang_padang: {
    name: "Padang Padang",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "The Balinese Pipeline — a short, brutally hollow left-hand barrel that explodes through a tight rock channel and produces some of the most perfect tubes in Indonesia.",

    difficulty: { level: 5, label: "Expert Only",
      note: "One of Bali's most demanding waves. Short, thick barrel section with a very shallow reef, a rocky channel entry, and close-out consequences. Does not forgive errors. Intermediate surfers should watch from the rocks before considering paddling out." },

    heroImage: "padang-padang.jpg",
    stats: [
      { label: "Break Type",   value: "Reef Break"              },
      { label: "Wave Type",    value: "Left — hollow barrel"    },
      { label: "Best Swell",   value: "SW – W (SW preferred)"   },
      { label: "Swell Size",   value: "4 – 10ft"                },
      { label: "Best Wind",    value: "E – SE Offshore"         },
      { label: "Best Tide",    value: "Mid to High"             },
      { label: "Also Known As",value: "The Balinese Pipeline"   },
    ],
    story: {
      heading: "The Balinese Pipeline",
      body: [
        "Padang Padang has hosted the Rip Curl Cup — an invitation-only, waiting-period big-wave tube riding contest that only opens when the swell exceeds 8ft. That context tells you everything about the wave's character: it is a specialist's spot, a barrel hunter's destination, a place where average surfers come to watch and experts come to be tested.",
        "The wave breaks through a channel between two rock formations and immediately throws a thick, hollow left-hand barrel. There is no shoulder to stall on and assess the situation — you drop, you look for the barrel, and you make it or you don't. The consequence of not making it is a wipeout in very shallow water over a hard reef.",
        "On the right day — 5–7ft SW swell, dead E wind, mid tide — Padang Padang is arguably the most perfect tube in Bali. The barrel is tight, predictable, and long enough to fit two or three body lengths. It has appeared in more surf films and photo galleries than almost any other spot on the island.",
      ],
    },
    technical: [
      { title: "The Channel Entry", icon: "🪨", content: "Entry is through a narrow rock channel at the base of the cliff accessed by a staircase with a small entry fee. Timing is critical — you slide through the channel on a smaller wave and immediately paddle to the lineup. Exit the same way. The channel is tight and the rocks are close — composure in this confined space is part of the Padang experience." },
      { title: "Barrel Mechanics", icon: "🌊", content: "The barrel at Padang Padang is triggered by an abrupt shelf that causes the wave to pitch suddenly and hard. From takeoff to tube is a fraction of a second. The key is a fast, straight-line bottom turn that projects you directly into the tube rather than along the face. Trying to generate speed through turns before the barrel closes out every time." },
      { title: "Swell Direction Sensitivity", icon: "🌊", content: "SW is the magic direction. W swells produce a more sectiony, less peel-able wave. S swells may not have enough angle to produce the right barrel shape. The wave is at its most defined on a 200–220° SW direction." },
      { title: "Size Window", icon: "📡", content: "The ideal window is 4–8ft. Below 4ft the wave lacks the power to produce a proper barrel. Above 8ft it begins to close out completely across the channel and wipeouts become extremely consequential." },
    ],
    hazards: [
      { level: "high", title: "Extremely Shallow Reef",  detail: "The reef at Padang Padang is dangerously shallow on any tide below mid. Wipeouts result in direct, high-speed contact with sharp coral. Reef booties are essential. Never paddle out at low tide." },
      { level: "high", title: "Rock Channel",            detail: "The entry and exit channel is narrow, rocky, and affected by surge. Mis-timing the entry or exit can result in being thrown against the rocks by white water. Watch the channel from the staircase and time your move carefully." },
      { level: "medium", title: "Strong Current",        detail: "A rip current runs along the reef and can push surfers into the close-out section or toward the rocks. Learn the current direction before paddling out." },
    ],
    access: {
      overview: "Padang Padang is accessed via a staircase cut into the cliff rock, clearly signposted from the Jalan Labuan Sait road between Uluwatu and Bingin. There is a small entry fee.",
      steps: [
        "From Kuta head south to the Bukit Peninsula via Jimbaran",
        "Follow Jalan Labuan Sait west — Padang is clearly signposted",
        "Pay the entry fee at the top of the stairs",
        "Descend the stairs through the rock passage to the channel",
        "Time your paddle-out through the channel carefully",
      ],
      tip: "Padang Padang is one of few Balinese surf breaks that can be assessed in detail from the rocks before paddling out. Spend 20 minutes watching: identify the current, the entry timing, and where the best barrels are peeling before committing.",
    },
    seasonChart: [
      { month: "Jan", swell: 3, wind: 2, overall: 3 }, { month: "Feb", swell: 3, wind: 3, overall: 3 },
      { month: "Mar", swell: 4, wind: 4, overall: 4 }, { month: "Apr", swell: 6, wind: 7, overall: 6 },
      { month: "May", swell: 7, wind: 8, overall: 7 }, { month: "Jun", swell: 8, wind: 9, overall: 8 },
      { month: "Jul", swell: 9, wind: 9, overall: 9 }, { month: "Aug", swell: 9, wind: 8, overall: 8 },
      { month: "Sep", swell: 7, wind: 8, overall: 7 }, { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 4, wind: 3, overall: 3 }, { month: "Dec", swell: 3, wind: 2, overall: 3 },
    ],
    seasonNote: "Prime season is June–August when consistent SW groundswells combine with clean E–SE offshore winds. Scores slightly lower than Uluwatu in the shoulder months because it needs more specific swell direction to produce the perfect barrel.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "Padang Padang — the barrel from inside the tube" },
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "The rock channel entry — Bali's tightest access" },
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "Hollow left threading through the channel rocks" },
      { url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80", caption: "Perfect SW swell day — every wave a barrel" },
    ],
  },

  impossibles: {
    name: "Impossibles",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "Bali's fastest wave — three connecting sections that race along the reef at pace, demanding power and commitment from anyone bold enough to link them all.",

    difficulty: { level: 3, label: "Intermediate / Advanced",
      note: "Fast, sucky takeoffs and high-speed walls that outrun average surfers. Intermediates with good reef experience can enjoy it on smaller days. On large swells the speed of the wave makes it very difficult to manage." },

    heroImage: "impossibles.jpg",
    stats: [
      { label: "Break Type",   value: "Reef Break"               },
      { label: "Wave Type",    value: "Left — fast, 3-section"   },
      { label: "Best Swell",   value: "SW – W"                   },
      { label: "Swell Size",   value: "3 – 8ft"                  },
      { label: "Best Wind",    value: "E – SE Offshore"          },
      { label: "Best Tide",    value: "Mid to High"              },
      { label: "Wave Length",  value: "Up to 300m"               },
    ],
    story: {
      heading: "Three Sections, One Ride",
      body: [
        "Impossibles got its name from the challenge of linking its three sections — First Peak, Middle Peak, and Third Peak — into a single connected ride. For years it was considered an impossibility; now it is the definition of what advanced surfers come here to achieve. A perfectly linked Impossibles ride covers up to 300 metres of fast, open wall at speeds that few waves in Bali can match.",
        "The wave breaks over a long shallow reef shelf between Padang Padang and Bingin. On a solid SW swell the first section stands up on the outer reef, walls rapidly, and the challenge begins: will the second section still be breaking by the time you arrive? On a great day — proper groundswell, clean wind, mid tide — the three sections connect and a full ride feels like something out of a surf film.",
        "Impossibles rewards surfers who are comfortable with speed and height on the face. Slow surfers simply don't make it through the connecting sections before they close out.",
      ],
    },
    technical: [
      { title: "Three Peaks", icon: "🌊", content: "First Peak is the outer, most powerful section. Second Peak is the connecting wall. Third Peak is the inside section that bends toward shore. Each has slightly different character. Linking all three requires reading the wave from the moment of takeoff — if First Peak doesn't connect to Second, exit via the channel rather than chasing a closing out wall." },
      { title: "Speed Generation", icon: "🏄", content: "The key skill at Impossibles is generating and maintaining speed across the connecting sections. Deep bottom turns, projection off the top, and rail surfing rather than fin-to-fin pivoting are the techniques that keep you ahead of the wave. Spray is cheap here — commitment is currency." },
      { title: "Swell Size", icon: "📡", content: "3–5ft is the sweet spot. Below that the sections don't connect. Above 6ft the speed increases to a level that most surfers cannot sustain and close-outs become more frequent. On a big SW swell, Impossibles is a wave for experienced surfers only." },
    ],
    hazards: [
      { level: "medium", title: "Speed-Related Wipeouts", detail: "High-speed wipeouts at Impossibles project surfers across the reef. The reef is not as shallow as Padang but shallow enough for injury at full speed. Avoid late takeoffs that put you directly over the reef on wipeout." },
      { level: "medium", title: "Section Close-Outs",     detail: "Chasing a section that has already closed out means taking a wave over the falls in the worst possible spot — not the takeoff but somewhere along the reef. Know when to kick out early." },
      { level: "low",    title: "Crowd",                  detail: "Less crowded than Uluwatu or Padang. The speed required deters intermediate surfers. Manage priority in the normal way." },
    ],
    access: {
      overview: "Impossibles is between Padang Padang and Bingin on the Bukit Peninsula. Access is via a cliff path from Jalan Labuan Sait — look for the Impossibles Beach Club sign.",
      steps: [
        "From Jalan Labuan Sait, follow signs for Impossibles or Bingin beach",
        "Descend the cliff path — the break is visible from the cliff",
        "Entry via the rocky path at the north end of the beach",
        "The lineup is clearly visible from the cliff — check conditions before entering",
      ],
      tip: "Sit at the First Peak and let waves go until you see one that shows all three sections connecting. Paddling for connected sets produces better results than chasing every wave that comes through.",
    },
    seasonChart: [
      { month: "Jan", swell: 3, wind: 2, overall: 3 }, { month: "Feb", swell: 3, wind: 3, overall: 3 },
      { month: "Mar", swell: 5, wind: 4, overall: 4 }, { month: "Apr", swell: 6, wind: 7, overall: 6 },
      { month: "May", swell: 7, wind: 8, overall: 7 }, { month: "Jun", swell: 8, wind: 9, overall: 8 },
      { month: "Jul", swell: 9, wind: 9, overall: 9 }, { month: "Aug", swell: 8, wind: 9, overall: 8 },
      { month: "Sep", swell: 7, wind: 8, overall: 7 }, { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 4, wind: 4, overall: 4 }, { month: "Dec", swell: 3, wind: 3, overall: 3 },
    ],
    seasonNote: "Peak season April–September. Needs proper SW groundswell to connect sections — small or windswell days produce disconnected sections and frustrated surfers. Best on 4–6ft SW with clean E morning winds.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "Impossibles — linking the sections at pace" },
      { url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80", caption: "The Bukit reef — three sections stretching to the horizon" },
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "Full speed through the middle section" },
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "Clean SW swell connecting all three peaks" },
    ],
  },

  bingin: {
    name: "Bingin",
    region: "Bukit Peninsula, Bali",
    country: "Indonesia",
    tagline: "Machine-like perfection on a shallow reef — a short, thick-lipped left barrel that fires with metronomic regularity and rewards precise tube riding above everything else.",

    difficulty: { level: 4, label: "Advanced",
      note: "Heavy, hollow, and shallow. The barrel is the wave's primary feature and it requires commitment and a precise line to make. Advanced surfers will love it; intermediates will find the shallow reef and fast barrel unforgiving." },

    heroImage: "bingin.jpg",
    stats: [
      { label: "Break Type",   value: "Reef Break"              },
      { label: "Wave Type",    value: "Left — hollow barrel"    },
      { label: "Best Swell",   value: "SW"                      },
      { label: "Swell Size",   value: "3 – 7ft"                 },
      { label: "Best Wind",    value: "E – SE Offshore"         },
      { label: "Best Tide",    value: "Mid tide"                },
      { label: "Access",       value: "Long cliff staircase"    },
      { label: "Fun Factor",   value: "9 / 10"                  },
    ],
    story: {
      heading: "The Machine",
      body: [
        "Bingin is one of the most discussed waves in Bali — and one of the most photogenic. The wave breaks on a shallow reef at the base of white limestone cliffs and fires with a regularity that makes it easy to understand why so many surfers have built their entire Bali trip around being here at the right moment.",
        "The barrel is the centrepiece. A solid SW swell produces waves that stand up on the outer edge of the reef and pitch a thick, relatively predictable barrel section that a competent tube rider can predict, set up for, and make on a good portion of attempts. The combination of consistency and barrel quality puts Bingin on many shortlists for Bali's best tube.",
        "Getting there requires descending a long staircase from the clifftop warung area — part of the experience. The small beach at the bottom feels secret even when it is not. The warungs at the top look directly down on the break and make excellent observation decks for planning your session.",
      ],
    },
    technical: [
      { title: "The Barrel Section", icon: "🌊", content: "The barrel at Bingin is shorter than Padang Padang but arguably more consistent. The wave stands up on the outer reef and immediately throws — the section is predictable enough that tube riders can position confidently and drive into it rather than reacting. The key line: take off slightly behind the peak, use the drop to generate speed, and project directly into the tube rather than pulling in after a turn." },
      { title: "Tidal Window", icon: "🌊", content: "Mid tide is the sweet spot — the reef is covered enough to prevent the worst wipeout consequences but exposed enough to produce hollow waves. High tide softens the barrel significantly. Low tide makes the reef dangerously shallow. The mid-tide window is usually 2–3 hours in the early morning." },
      { title: "Inside Section", icon: "🪨", content: "After the main barrel section, the wave connects to an inside section that can produce a second barrel opportunity on larger sets. This inside section is shallower than the main takeoff zone. At lower tides, exit via the channel before reaching the inside to avoid the shallow reef." },
    ],
    hazards: [
      { level: "high",   title: "Shallow Reef",        detail: "Bingin's reef is shallow at mid tide and extremely dangerous at low tide. Reef booties are essential. Know the channel exit." },
      { level: "medium", title: "Long Staircase Exit", detail: "After surfing, you have a long staircase climb back up the cliff — 100+ steps in full wetsuit with your board. Factor this into session planning, especially in heat." },
      { level: "medium", title: "Crowd",               detail: "Bingin draws a dedicated crowd of advanced and expert tube riders. The lineup is tight and the peak clearly defined — competition for waves is intense." },
    ],
    access: {
      overview: "Bingin is accessed by a long staircase descending from the cliff top on Jalan Labuansait near the Bingin Beach road junction.",
      steps: [
        "Head south on Jalan Labuansait from Padang Padang toward Bingin",
        "Turn left onto Jalan Bingin — follow to the clifftop car park",
        "Descend the long staircase to the beach — check the wave from the top first",
        "Entry via the rocks at the beach — the reef entry is straightforward at mid tide",
      ],
      tip: "The warungs at the top of the cliff serve breakfast overlooking the break. Eat first, watch the session going on below, time the tide, and descend when the window is right. The climb back up is real exercise — bring water.",
    },
    seasonChart: [
      { month: "Jan", swell: 3, wind: 2, overall: 3 }, { month: "Feb", swell: 3, wind: 3, overall: 3 },
      { month: "Mar", swell: 4, wind: 4, overall: 4 }, { month: "Apr", swell: 6, wind: 7, overall: 6 },
      { month: "May", swell: 7, wind: 8, overall: 7 }, { month: "Jun", swell: 8, wind: 9, overall: 8 },
      { month: "Jul", swell: 9, wind: 9, overall: 9 }, { month: "Aug", swell: 8, wind: 9, overall: 8 },
      { month: "Sep", swell: 7, wind: 8, overall: 7 }, { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 4, wind: 3, overall: 4 }, { month: "Dec", swell: 3, wind: 2, overall: 3 },
    ],
    seasonNote: "Best June–August when Indian Ocean SW groundswells fire consistently and SE offshore winds clean up the face perfectly. One of the most reliable waves on the Bukit in this window.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "Bingin barrel — the machine firing at mid tide" },
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "The cliff staircase and beach at Bingin" },
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "Thick lip throwing over the Bingin reef" },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", caption: "Limestone cliffs and blue water — Bingin beach" },
    ],
  },

  // ─── Bukit South / East Side ──────────────────────────────────────────────

  nusa_dua: {
    name: "Nusa Dua",
    region: "East Bukit, Bali",
    country: "Indonesia",
    tagline: "Bali's premier right-hand reef break — a powerful, barrelling wave on the east side of the Bukit that comes alive during the wet season when the prevailing winds flip onshore for every west-facing spot.",

    difficulty: { level: 4, label: "Advanced",
      note: "Heavy, powerful right-hander with a demanding takeoff and strong current. Not suitable for intermediates on larger swells. The best sessions require both skill and good local knowledge of the current patterns." },

    heroImage: "nusa-dua.jpg",
    stats: [
      { label: "Break Type",   value: "Reef Break"               },
      { label: "Wave Type",    value: "Right-hander"             },
      { label: "Best Swell",   value: "S – SE"                   },
      { label: "Swell Size",   value: "3 – 8ft"                  },
      { label: "Best Wind",    value: "W – NW (Offshore)"        },
      { label: "Best Tide",    value: "Mid to High"              },
      { label: "Season",       value: "Wet season (Nov–Mar)"     },
    ],
    story: {
      heading: "The Wet Season Wave",
      body: [
        "While every Bukit Peninsula wave goes onshore in the wet season (November–March), Nusa Dua faces the opposite direction — east into the Bali Sea — and offshore conditions flip. The W and NW winds that ruin Uluwatu and Bingin are perfect for Nusa Dua, making it Bali's premier wet-season destination.",
        "The wave is a powerful right-hander that breaks over a shallow coral reef and can produce genuine barrels on solid S and SE swells. It is less famous than the Bukit left-handers but no less demanding in terms of skill required. The local surf community around Nusa Dua rates it as one of the most underrated waves in Bali.",
      ],
    },
    technical: [
      { title: "Offshore Window", icon: "💨", content: "The magic of Nusa Dua is its opposite-facing orientation. When the W–NW wet season wind has ruined every west-facing spot, Nusa Dua is glassy and offshore. Plan trips to Bali in the wet season specifically around this spot." },
      { title: "Swell Window", icon: "🌊", content: "S to SE swells wrap around the Bukit Peninsula into the Nusa Dua reef. These swells are less frequent than the dominant SW Indian Ocean groundswells but occur reliably through the wet season alongside tropical weather systems." },
    ],
    hazards: [
      { level: "high",   title: "Shallow Reef & Current",  detail: "Strong currents run along the reef and the inside section is very shallow. Know the channel before paddling out." },
      { level: "medium", title: "Tourist Zone",            detail: "Nusa Dua is Bali's main luxury hotel precinct. The beach is patrolled and access can be restricted during high season hotel events. Check access before travelling." },
    ],
    access: {
      overview: "Nusa Dua beach is accessed via the Nusa Dua resort complex on the east coast of the Bukit Peninsula. Several beach access points exist along the resort road.",
      steps: [
        "From Kuta head south to Nusa Dua via the toll road",
        "Enter the Nusa Dua resort precinct — follow signs to the surf beach area",
        "Access the beach from one of the public access points",
        "The reef break is visible from the beach — assess from shore before entering",
      ],
      tip: "Check a surf forecast that specifically models SE swell. Nusa Dua's magic appears during wet season S–SE swells — tracking these ahead of time is the key to timing the trip.",
    },
    seasonChart: [
      { month: "Jan", swell: 7, wind: 7, overall: 7 }, { month: "Feb", swell: 7, wind: 7, overall: 7 },
      { month: "Mar", swell: 6, wind: 6, overall: 6 }, { month: "Apr", swell: 4, wind: 4, overall: 4 },
      { month: "May", swell: 3, wind: 3, overall: 3 }, { month: "Jun", swell: 3, wind: 3, overall: 3 },
      { month: "Jul", swell: 3, wind: 3, overall: 3 }, { month: "Aug", swell: 3, wind: 3, overall: 3 },
      { month: "Sep", swell: 4, wind: 4, overall: 4 }, { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 6, wind: 7, overall: 7 }, { month: "Dec", swell: 7, wind: 7, overall: 7 },
    ],
    seasonNote: "OPPOSITE to all other Bali spots — best in the wet season (November–March) when W–NW winds blow offshore. Largely flat and onshore during the dry season peak that fires Uluwatu and Padang.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "Nusa Dua right-hander — the wet season wave firing" },
      { url: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&q=80", caption: "East Bali coast — the reef break visible at low tide" },
      { url: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=900&q=80", caption: "WNW wind — offshore for the east side" },
      { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", caption: "Bali east coast — Nusa Dua foreshore" },
    ],
  },

  melasti: {
    name: "Melasti",
    region: "Bukit South, Bali",
    country: "Indonesia",
    tagline: "A dramatic beach break backed by towering white limestone cliffs — scenic, shifty peaks with a wide takeoff zone and fewer crowds than the main Bukit reef breaks.",

    difficulty: { level: 2, label: "Intermediate",
      note: "A beach break rather than a reef break — more forgiving on the consequences of wipeouts but still a sizable, powerful wave when conditions align. Intermediates welcome." },

    heroImage: "melasti.jpg",
    stats: [
      { label: "Break Type",   value: "Beach Break"              },
      { label: "Wave Type",    value: "Left & Right peaks"       },
      { label: "Best Swell",   value: "S – SSW"                  },
      { label: "Swell Size",   value: "2 – 6ft"                  },
      { label: "Best Wind",    value: "N – NE Offshore"          },
      { label: "Best Tide",    value: "All tides"                },
      { label: "Setting",      value: "Limestone cliff backdrop" },
    ],
    story: {
      heading: "Where the Cliffs Meet the Sand",
      body: [
        "Melasti is a photogenic stretch of white sand at the southern tip of the Bukit Peninsula, flanked on both sides by dramatic white limestone cliffs that make it one of the most photographed beaches in Bali. It is also an active sacred site for Balinese Hindus — large purification ceremonies (Melasti) take place here before Nyepi (the Balinese New Year), during which the beach may be closed to surfers.",
        "The wave is a beach break with shifty peaks that move around with the swell direction and sandbar changes. It is less predictable than the reef breaks elsewhere on the Bukit but offers a more forgiving experience — sand bottom means wipeout consequences are far less severe.",
      ],
    },
    technical: [
      { title: "Shifting Peaks", icon: "🌊", content: "The peaks move around depending on swell direction and sandbar formation. There is no single defined takeoff zone — read the beach from the cliff before descending and identify which section is breaking cleanest before paddling out." },
      { title: "Cliff Access", icon: "🪨", content: "Melasti is accessed via a steep paved road from the Ungasan area. The beach itself is wide and sandy. No rocky reef entry required — just paddle from the beach." },
    ],
    hazards: [
      { level: "medium", title: "Ceremonial Closures", detail: "The beach is used for Hindu ceremonies and can be closed to the public during major religious events. Check with local accommodation before planning a surf trip specifically to Melasti." },
      { level: "medium", title: "Rip Currents",        detail: "Beach break rips form between peaks, particularly at lower tides. Standard rip protocol: identify from the beach, use to exit, return via the shoulder." },
      { level: "low",    title: "Beach Access Road",   detail: "The access road is steep and narrow — take care on a scooter, especially when wet. Walk the board down if the road is slippery." },
    ],
    access: {
      overview: "Melasti Beach is accessed from Jalan Melasti in Ungasan, south Bukit Peninsula. A paved road winds steeply down the cliff to a car park above the beach.",
      steps: [
        "From Ungasan (south Bukit) head toward Melasti — follow signs",
        "Descend the steep paved road to the beach car park",
        "Walk down the final steps to the beach",
        "Entry directly from the beach — no reef navigation required",
      ],
      tip: "Melasti is worth visiting even outside of surf season for the scenery alone. If you're there for the surf, aim for the cleaner swell windows and check the peak positions from the cliff before suiting up.",
    },
    seasonChart: [
      { month: "Jan", swell: 4, wind: 3, overall: 4 }, { month: "Feb", swell: 4, wind: 3, overall: 4 },
      { month: "Mar", swell: 5, wind: 4, overall: 4 }, { month: "Apr", swell: 6, wind: 6, overall: 6 },
      { month: "May", swell: 7, wind: 7, overall: 7 }, { month: "Jun", swell: 7, wind: 8, overall: 7 },
      { month: "Jul", swell: 8, wind: 8, overall: 8 }, { month: "Aug", swell: 7, wind: 8, overall: 7 },
      { month: "Sep", swell: 6, wind: 7, overall: 6 }, { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 4, wind: 3, overall: 4 }, { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote: "Works across a broader seasonal range than the reef breaks because it picks up S swells that don't always penetrate the deeper reef zones. Best April–September but surfable year-round on suitable swell days.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "Melasti — white cliffs, white sand, turquoise sea" },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", caption: "Peaks breaking across the Melasti beach break" },
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "Limestone cliffs at the southern Bukit Peninsula" },
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "Dawn session at Melasti — nobody out" },
    ],
  },

  green_bowl: {
    name: "Green Bowl",
    region: "Bukit South, Bali",
    country: "Indonesia",
    tagline: "Bali's best-kept secret and most committed access — a powerful right-hand reef at the base of a 300-step cliff staircase that rewards the surfers willing to make the descent.",

    difficulty: { level: 3, label: "Intermediate / Advanced",
      note: "The wave itself is manageable for confident intermediates on smaller days. The commitment level — 300 steps down and back up — self-selects for serious surfers and keeps the crowd permanently thin." },

    heroImage: "green-bowl.jpg",
    stats: [
      { label: "Break Type",   value: "Reef Break"          },
      { label: "Wave Type",    value: "Right-hander"        },
      { label: "Best Swell",   value: "S – SW"              },
      { label: "Swell Size",   value: "2 – 6ft"             },
      { label: "Best Wind",    value: "N – NE Offshore"     },
      { label: "Best Tide",    value: "Mid to High"         },
      { label: "Access",       value: "300-step cliff walk" },
      { label: "Crowd Factor", value: "Very Low"            },
    ],
    story: {
      heading: "300 Steps for Perfection",
      body: [
        "Green Bowl is Bali's most committed surf spot — not because the wave is terrifyingly powerful but because the access involves descending (and later ascending) approximately 300 irregular cliff steps cut into the limestone face, with your board under your arm, in the Bali heat. The barrier works perfectly: on any given morning, you might share the lineup with two or three other surfers, or have it entirely to yourself.",
        "The reward for the effort is a right-hand reef break in a secluded limestone cove with crystal clear water, a white sand beach, and waves that peel with satisfying consistency on a good S swell. The setting is extraordinary. The wave, while not in the elite company of Padang or Uluwatu, is genuinely good — a proper right-hander with barrel sections at mid tide.",
      ],
    },
    technical: [
      { title: "Right-Hander Mechanics", icon: "🌊", content: "The wave breaks from a shallow outer reef section and walls toward the inside of the cove. Mid tide produces the best barrel sections on the outer section. Higher tide softens it to a fun, open wall. The wave is a right in a left-hand dominated island — goofy footers come specifically for this." },
      { title: "The Staircase Factor", icon: "🪨", content: "The 300 steps are not uniformly cut — some sections are very steep and irregular. Carry your board under one arm and use the rope/handrail where provided. Allow 15–20 minutes for the descent and 25–30 minutes for the ascent. Budget accordingly in your session plan." },
    ],
    hazards: [
      { level: "high",   title: "Medical Access",      detail: "If seriously injured at Green Bowl, getting a stretcher up 300 cliff steps is a serious logistical problem. This is a very remote surf spot by Bali standards. Do not surf here alone on large swells." },
      { level: "medium", title: "Reef at Low Tide",    detail: "The outer reef section is very shallow at low tide. Mid to high tide is safer for most surfers." },
      { level: "medium", title: "Staircase with Board",detail: "The descent and ascent with a board is physically demanding and has genuine injury risk if you slip. Take it slowly. A board bag provides some protection for the board and a better grip for the carry." },
    ],
    access: {
      overview: "Green Bowl is in the Ungasan area south of Bali. Follow Jalan Pantai Gunung Payung and look for the Green Bowl Beach sign — the staircase is clearly marked.",
      steps: [
        "Head to the Ungasan/Gunung Payung area south of Bukit",
        "Follow Jalan Pantai Gunung Payung to the Green Bowl Beach car park",
        "Pay the small parking and entry fee",
        "Begin the descent — carry your board under your arm and take your time on the steeper sections",
        "Allow 20 minutes for the descent and 30 minutes for the return climb",
      ],
      tip: "Start the descent no later than 6:30am to catch the morning offshore window before the heat of the day makes the climb back unbearable. Bring more water than you think you need.",
    },
    seasonChart: [
      { month: "Jan", swell: 4, wind: 3, overall: 3 }, { month: "Feb", swell: 4, wind: 3, overall: 4 },
      { month: "Mar", swell: 5, wind: 4, overall: 4 }, { month: "Apr", swell: 6, wind: 7, overall: 6 },
      { month: "May", swell: 7, wind: 7, overall: 7 }, { month: "Jun", swell: 8, wind: 8, overall: 8 },
      { month: "Jul", swell: 9, wind: 8, overall: 9 }, { month: "Aug", swell: 8, wind: 8, overall: 8 },
      { month: "Sep", swell: 7, wind: 7, overall: 7 }, { month: "Oct", swell: 6, wind: 6, overall: 6 },
      { month: "Nov", swell: 4, wind: 3, overall: 4 }, { month: "Dec", swell: 4, wind: 3, overall: 3 },
    ],
    seasonNote: "Best May–September. The limited access means the overall score is understated in terms of wave quality — on the right day in peak season, you might have a world-class right-hander entirely to yourself.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80", caption: "Green Bowl cove — the reward at the bottom of 300 steps" },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", caption: "The right-hander peeling in a limestone cove" },
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "Crystal water over the Green Bowl reef" },
      { url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&q=80", caption: "Bali's most secluded surf access" },
    ],
  },

  pandawa: {
    name: "Pandawa",
    region: "Bukit South, Bali",
    country: "Indonesia",
    tagline: "Deep reef peaks in a stunning cultural setting — a powerful, well-shaped beach break backed by cliff-carved Hindu statues that ranks among Bali's most visually dramatic surf locations.",

    difficulty: { level: 2, label: "Intermediate",
      note: "Accessible beach break for intermediates in normal conditions. Gets heavy on large swells. The main hazard is the volume of non-surfers on the beach in peak tourist season." },

    heroImage: "pandawa.jpg",
    stats: [
      { label: "Break Type",   value: "Beach / Reef peaks"   },
      { label: "Wave Type",    value: "Left & Right"         },
      { label: "Best Swell",   value: "S – SW"               },
      { label: "Swell Size",   value: "2 – 5ft"              },
      { label: "Best Wind",    value: "N – NE Offshore"      },
      { label: "Best Tide",    value: "All tides"            },
      { label: "Setting",      value: "Hindu cliff carvings" },
    ],
    story: {
      heading: "Surf Beneath the Hindu Gods",
      body: [
        "Pandawa Beach is accessed through a dramatic limestone canyon whose walls are carved with enormous Hindu statues — the five Pandawa brothers of the Mahabharata epic. The visual impact of arriving at the beach through this cultural gateway is unlike anything else in Indonesian surfing.",
        "The surf is a beach break with reef influence that produces A-frame peaks across the beach. It is consistent, accessible, and well-suited for the intermediate surfer who wants a quality wave in a manageable environment. The beach has developed significantly as a tourist site and the non-surf crowd is significant in peak season — which means navigating beach-goers as well as the surf.",
      ],
    },
    technical: [
      { title: "Peak Patterns", icon: "🌊", content: "Multiple peaks break across the beach depending on the swell direction and depth of the underlying reef structure. S swells produce the most organised peaks. Walk the beach before paddling to identify the best-shaped section." },
      { title: "Cultural Context", icon: "🏄", content: "Pandawa is an active Hindu pilgrimage site as well as a surf beach. Respect cultural activities and ceremonies when they occur. The beach management staff are generally helpful with surf conditions and safe entry points." },
    ],
    hazards: [
      { level: "medium", title: "Tourist Congestion",  detail: "Peak season brings large numbers of non-surfing tourists to Pandawa. Paddle-boarders and snorkellers can be present in the surf zone. Take extra care on takeoffs and be very visible when paddling." },
      { level: "medium", title: "Shore Dump at Size",  detail: "On larger S swells Pandawa produces a heavy shore dump that can be violent. Never underestimate the shorebreak — it is the most common injury cause at beach breaks." },
      { level: "low",    title: "Entry Fee & Access",  detail: "Pandawa charges a modest entry fee to the beach — this goes toward maintaining the site and the cultural carvings. Budget accordingly." },
    ],
    access: {
      overview: "Pandawa is in Kutuh village, south Bukit Peninsula. The road cuts through the limestone cliff via a sculpted canyon — one of Bali's most distinctive surf access routes.",
      steps: [
        "From Ungasan head south toward Kutuh village",
        "Follow signs for Pandawa Beach — the canyon entrance is clearly marked",
        "Drive through the carved limestone canyon to the beach car park",
        "Pay the entry fee and walk to the beach",
      ],
      tip: "Pandawa is best surfed early in the morning before the tourist crowd arrives. By 9am the beach is busy. A dawn session here with clean offshore winds is genuinely pleasant.",
    },
    seasonChart: [
      { month: "Jan", swell: 4, wind: 3, overall: 4 }, { month: "Feb", swell: 4, wind: 3, overall: 4 },
      { month: "Mar", swell: 5, wind: 4, overall: 5 }, { month: "Apr", swell: 6, wind: 6, overall: 6 },
      { month: "May", swell: 7, wind: 7, overall: 7 }, { month: "Jun", swell: 7, wind: 8, overall: 7 },
      { month: "Jul", swell: 8, wind: 8, overall: 8 }, { month: "Aug", swell: 7, wind: 7, overall: 7 },
      { month: "Sep", swell: 6, wind: 6, overall: 6 }, { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 4, wind: 3, overall: 4 }, { month: "Dec", swell: 4, wind: 3, overall: 4 },
    ],
    seasonNote: "Works year-round on S swells and is less demanding about wave size than the reef breaks. Best April–September. A good option when the Bukit reefs are too big or too crowded.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "Pandawa — the carved Hindu canyon leading to the beach" },
      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=80", caption: "Peaks breaking across the Pandawa beach break" },
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "Morning session before the tourists arrive" },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", caption: "Bukit south coast — white sand and limestone" },
    ],
  },

  gunung_payung: {
    name: "Gunung Payung",
    region: "Bukit South, Bali",
    country: "Indonesia",
    tagline: "Bali's most remote Bukit spot — a pristine, barely-visited beach at the end of a long cliff descent with powerful peaks and a Hindu temple at the waterline that you have almost entirely to yourself.",

    difficulty: { level: 3, label: "Intermediate / Advanced",
      note: "A powerful wave in a remote location. The main challenge is access — a significant cliff descent to an isolated beach with no facilities and difficult emergency access. Intermediate surfers with reef experience welcome in normal conditions." },

    heroImage: "gunung-payung.jpg",
    stats: [
      { label: "Break Type",   value: "Reef / Beach peaks"   },
      { label: "Wave Type",    value: "Left & Right"         },
      { label: "Best Swell",   value: "S – SW"               },
      { label: "Swell Size",   value: "2 – 6ft"              },
      { label: "Best Wind",    value: "N – NE Offshore"      },
      { label: "Best Tide",    value: "Mid to High"          },
      { label: "Crowd Factor", value: "Almost Zero"          },
    ],
    story: {
      heading: "Bali's Hidden Secret",
      body: [
        "Gunung Payung is Bali's answer to the question: what if a world-class surf spot had almost nobody out? The answer involves a significant cliff descent, a rough path through jungle, and arriving at an extraordinary white sand beach with a Hindu temple at the waterline, crystal clear water, and powerful peaks breaking across the reef — with often nobody else in sight.",
        "The effort required to reach Gunung Payung exceeds even Green Bowl. The path is longer, less maintained, and the descent more demanding. But the reward is complete solitude in one of the most beautiful beach settings in Bali, with waves that on the right day rival anything the Bukit has to offer.",
        "The beach is a sacred site — treat it with corresponding respect. The temple is active and used by local fishermen and worshippers. Do not surf directly in front of the temple.",
      ],
    },
    technical: [
      { title: "Swell & Banks", icon: "🌊", content: "Reef and sand influence produces peaks across the beach that vary with swell direction. S to SSW swells produce the most defined, hollow peaks. The beach faces more south than the main Bukit spots, making it slightly more sensitive to direct S swells." },
      { title: "Solitude Value", icon: "🏄", content: "The true value of Gunung Payung is the empty lineup. On a 4–5ft SW swell with light N wind — conditions that would produce 80 surfers at Uluwatu — Gunung Payung may have 3 or 4. This alone justifies the access challenge." },
    ],
    hazards: [
      { level: "high",   title: "Remote Emergency Access", detail: "This is the most remote surfable break on the Bukit Peninsula. Medical evacuation up the cliff path with an injured surfer would be extremely difficult. Do not surf here alone and always assess conditions carefully before paddling out." },
      { level: "medium", title: "Challenging Cliff Path",  detail: "The path down is steep, uneven, and can be slippery when wet. Carry your board in a bag for protection and use both hands on steep sections. Wear footwear." },
      { level: "low",    title: "Temple Respect Zone",     detail: "The temple at the waterline is an active place of worship. Do not paddle out directly in front of it. Use the beach areas north or south of the temple for entry." },
    ],
    access: {
      overview: "Gunung Payung is accessed from the Jalan Pantai Gunung Payung road in the Ungasan area. The path to the beach starts from a small car park and involves a 15–25 minute descent.",
      steps: [
        "Head to the Ungasan/Kutuh area south of Bukit",
        "Follow Jalan Pantai Gunung Payung to the small car park",
        "Begin the descent on foot — the path is marked but rough",
        "Allow 20–25 minutes for the descent and 30–40 minutes for the return",
        "Bring sufficient water — no facilities at the beach",
      ],
      tip: "Gunung Payung is best visited midweek in the off-season. Even on 'busy' days it rarely has more than 5 surfers. If you are willing to make the effort, this is one of the most rewarding sessions available anywhere in Bali.",
    },
    seasonChart: [
      { month: "Jan", swell: 4, wind: 3, overall: 3 }, { month: "Feb", swell: 4, wind: 3, overall: 4 },
      { month: "Mar", swell: 5, wind: 4, overall: 4 }, { month: "Apr", swell: 6, wind: 6, overall: 6 },
      { month: "May", swell: 7, wind: 7, overall: 7 }, { month: "Jun", swell: 7, wind: 8, overall: 7 },
      { month: "Jul", swell: 8, wind: 8, overall: 8 }, { month: "Aug", swell: 7, wind: 8, overall: 7 },
      { month: "Sep", swell: 6, wind: 7, overall: 6 }, { month: "Oct", swell: 5, wind: 5, overall: 5 },
      { month: "Nov", swell: 4, wind: 3, overall: 4 }, { month: "Dec", swell: 4, wind: 3, overall: 3 },
    ],
    seasonNote: "Best April–September. The reward-to-effort ratio peaks in the June–August window when consistent SW swells fill the south-facing bay with the most regularity. Even a modest swell day at Gunung Payung with nobody out beats a perfect day at a crowded Bukit reef.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80", caption: "Gunung Payung — pristine peaks with the Hindu temple at the waterline" },
      { url: "https://images.unsplash.com/photo-1444664597500-035db93e2323?w=900&q=80", caption: "The most remote beach on the Bukit" },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", caption: "Perfect solitude — Bali south coast" },
      { url: "https://images.unsplash.com/photo-1455264745730-cb3b76250ae8?w=900&q=80", caption: "Crystal water over the reef — nobody out" },
    ],
  },
};
