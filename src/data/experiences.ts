import racingSimImage from "../assets/images/racing_simulator_rig_1792425595538.jpg";
import vrArenaImage from "../assets/images/vr_gaming_experience_1792425595122.jpg";
import snookerPoolImage from "../assets/images/snooker_pool_lounge_1792425598455.jpg";
import loungeDiningImage from "../assets/images/lounge_cafe_dining_1792425596502.jpg";
import esportsPcImage from "../assets/images/multiplayer_pc_zone_1792425627694.jpg";
import consoleLoungeImage from "../assets/images/ps5_console_station_1792425627150.jpg";

export interface ExperienceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  shortDescription: string;
  fullOverview: string;
  image: string;
  imageAlt: string;
  keyFeatures: string[];
  setupHighlights: {
    label: string;
    value: string;
  }[];
  idealFor: string;
  bookingNote: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "racing-sim",
    slug: "racing-simulators",
    title: "Pro Racing Simulators",
    category: "Motorsport Simulation",
    tagline: "Direct-Drive Force Feedback & Panoramic Triple Displays",
    shortDescription:
      "Experience authentic motorsport physics with high-torque direct-drive wheelbases, hydraulic load-cell pedals, and an immersive multi-screen cockpit.",
    fullOverview:
      "Step into our custom-engineered aluminum chassis cockpits built to replicate genuine GT and open-wheel racecars. Equipped with precision direct-drive force feedback, realistic paddle shifters, and ultra-wide surround visuals, every apex, kerb rumble, and traction slip is transmitted directly to your hands with zero latency.",
    image: racingSimImage,
    imageAlt:
      "Professional direct-drive sim racing cockpit with bucket seat and triple curved panoramic screens",
    keyFeatures: [
      "Precision direct-drive wheelbases with true torque feedback",
      "Hydraulic & load-cell pressure-sensitive brake pedal systems",
      "Triple curved panoramic displays or VR cockpit integration",
      "FIA-style bucket seats with rigid aluminum profile chassis",
      "Curated track telemetry & hot-lap leaderboard tracking",
    ],
    setupHighlights: [
      { label: "Motion & Rigs", value: "Rigid Chassis + Direct Drive" },
      { label: "Visuals", value: "Triple Panoramic Displays" },
      { label: "Pedals", value: "Load-Cell Calibrated" },
      { label: "Format", value: "Solo Time Trials & Head-to-Head" },
    ],
    idealFor:
      "Motorsport fans, sim racers, competitive drivers, and thrill-seekers looking for true mechanical immersion.",
    bookingNote:
      "Available for single sprint sessions, endurance stints, and multi-player split-screen race battles.",
  },
  {
    id: "vr-arena",
    slug: "vr-gaming",
    title: "Virtual Reality Arena",
    category: "Immersive VR",
    tagline: "Room-Scale 360° Tracking & Next-Gen Spatial Audio",
    shortDescription:
      "Dive beyond the screen into room-scale VR arenas featuring ultra-sharp optics, haptic controllers, and high-framerate motion tracking.",
    fullOverview:
      "Our dedicated VR bays provide ample physical play volume with discreet perimeter boundary sensors and cable-managed rigs. Whether you are stepping into cooperative tactical scenarios, rhythm challenges, or cinematic story adventures, the high-density optics and spatial audio immerse you in fully interactive virtual realms.",
    image: vrArenaImage,
    imageAlt:
      "High-end VR headset and illuminated motion controllers resting on a sleek lounge pedestal",
    keyFeatures: [
      "High-resolution VR headsets with crystal clear field-of-view",
      "Room-scale designated boundary play zones for free movement",
      "Haptic wireless motion controllers with sub-millimeter tracking",
      "Active staff assistance for seamless onboarding and game swaps",
      "Sanitized hygiene face-covers between every guest session",
    ],
    setupHighlights: [
      { label: "Tracking", value: "360° Room-Scale Laser Bounds" },
      { label: "Optics", value: "High-Resolution Dual Displays" },
      { label: "Hygiene", value: "Medical-Grade UV Sanitization" },
      { label: "Experience", value: "Solo & Multiplayer Cooperative" },
    ],
    idealFor:
      "Gamers seeking physical interactivity, groups exploring cooperative missions, and newcomers to immersive VR.",
    bookingNote:
      "Staff-guided walkthrough provided before each session. Suitable for teens and adults.",
  },
  {
    id: "snooker-pool",
    slug: "snooker-and-pool",
    title: "Tournament Snooker & Pool",
    category: "Cue Sports",
    tagline: "Championship Cloth, Balanced Cues & Lounge Seating",
    shortDescription:
      "Play on full-size tournament tables with precision slate beds, Strachan cloth, balanced ash cues, and dedicated spectator lounge seating.",
    fullOverview:
      "A dedicated quiet sanctum within the studio crafted for cue sports enthusiasts. Featuring full-size tournament snooker and American pool tables set upon laser-leveled Italian slate beds, surrounded by warm pendant lighting and comfortable leather armchairs for spectators and social breaks.",
    image: snookerPoolImage,
    imageAlt:
      "Full-size championship snooker table in a moodily lit dark wood lounge with brass pendant lights",
    keyFeatures: [
      "Precision-leveled slate bed tables with genuine wool cloth",
      "Hand-selected ash and maple cues in varied balance weights",
      "Aramith tournament-grade phenolic resin ball sets",
      "Shadowless overhead warm-glow canopy lighting",
      "Spacious table clearance for unhindered 360° shot execution",
    ],
    setupHighlights: [
      { label: "Tables", value: "Full-Size Tournament Snooker & 8-Ball" },
      { label: "Bed & Cloth", value: "Precision Slate + Championship Cloth" },
      { label: "Atmosphere", value: "Intimate, Moody Lounge Acoustics" },
      { label: "Refreshments", value: "Table-side Food & Beverage Service" },
    ],
    idealFor:
      "Cue sports connoisseurs, evening social matches, and relaxed friendly competition between friends.",
    bookingNote:
      "Hourly table hire available with table-side refreshment service.",
  },
  {
    id: "lounge-dining",
    slug: "food-court-dining",
    title: "Food Court & Lounge Dining",
    category: "Lounge Hospitality",
    tagline: "Artisanal Mocktails, Gourmet Sliders & Fresh Brews",
    shortDescription:
      "Recharge between competitive rounds with handcrafted burgers, signature mocktails, barista coffee, and premium shareable finger foods.",
    fullOverview:
      "Khalifa Gaming Lounge is designed as a complete social hub where dining is an integral part of the experience. Our in-house café counter serves freshly prepared gourmet street-style bites, handcrafted shakes, chilled coolers, and hot brews directly to your private booth or gaming battlestation.",
    image: loungeDiningImage,
    imageAlt:
      "Contemporary dark-accented lounge bar counter with artisanal sliders, cocktails, and booth seating",
    keyFeatures: [
      "Freshly prepared burgers, loaded fries, and gourmet wraps",
      "Signature non-alcoholic mocktails, coolers, and thick shakes",
      "Freshly brewed espresso, cappuccino, and iced teas",
      "Station-side ordering without pausing your gameplay session",
      "Comfortable booth seating with ambient mood lighting",
    ],
    setupHighlights: [
      { label: "Menu Concept", value: "Quick-Bite Gourmet & Comfort Food" },
      { label: "Beverages", value: "Barista Brews, Shakes & Mocktails" },
      { label: "Service", value: "Table & Battlestation Delivery" },
      { label: "Seating", value: "Deep Leather Booths & Bar Stools" },
    ],
    idealFor:
      "Friends hanging out, casual social gatherings, refueling between tournament matches, and weekend meetups.",
    bookingNote:
      "Open to both players and dining guests. Walk-ins always welcome.",
  },
  {
    id: "esports-pc",
    slug: "pc-battlestations",
    title: "Esports PC Battlestations",
    category: "Esports Arena",
    tagline: "240Hz Fast-IPS Displays & Ultra-Low Latency LAN",
    shortDescription:
      "High-FPS competitive rigs featuring mechanical keyboards, ultra-light mice, esports headsets, and dedicated optical fiber routing.",
    fullOverview:
      "Built for competitive rank climbing and 5v5 team scrims. Each battlestation features high-refresh tournament monitors, custom mechanical switches, low-friction desks, and low-latency optical connectivity. Play your favorite titles with peak responsiveness and zero micro-stuttering.",
    image: esportsPcImage,
    imageAlt:
      "Row of esports gaming PC battlestations with purple backlighting and 240Hz monitors",
    keyFeatures: [
      "High-refresh esports displays with low response times",
      "Custom mechanical keyboards with tactile switches",
      "Precision lightweight esports mice with large desk mats",
      "Over-ear noise-isolating gaming headsets with crisp mics",
      "Gigabit optical fiber low-ping routing to Asian servers",
    ],
    setupHighlights: [
      { label: "Refresh Rate", value: "High-Refresh Esports Displays" },
      { label: "Peripherals", value: "Mechanical Keyboards & Studio Audio" },
      { label: "Network", value: "Low-Ping Gigabit Fiber LAN" },
      { label: "Form Factor", value: "Solo Stations & 5v5 Team Arenas" },
    ],
    idealFor:
      "Competitive ranked players, LAN team scrims, and gamers who demand top-shelf hardware.",
    bookingNote: "Individual and team LAN booking slots available.",
  },
  {
    id: "console-lounge",
    slug: "console-suites",
    title: "Next-Gen Console Suites",
    category: "Console Gaming",
    tagline: "4K HDR Displays, DualSense Wireless & Plush Seating",
    shortDescription:
      "Kick back with friends in private living-room style console pods equipped with 4K OLED screens and the latest multiplayer titles.",
    fullOverview:
      "Relax in plush lounge recliners with friends and enjoy local co-op, sports showdowns, and fighting tournaments on large 4K HDR displays. Equipped with comfortable seating, wireless controllers, and a chill ambient vibe.",
    image: consoleLoungeImage,
    imageAlt:
      "Console gaming station in luxury dark lounge with dual controllers and 4K display",
    keyFeatures: [
      "Large 4K HDR OLED displays with vibrant color reproduction",
      "Dual wireless haptic controllers ready for local multiplayer",
      "Curated library of competitive sports, fighting, and co-op titles",
      "Deep plush recliners and acoustic sound-softened walls",
      "In-seat food and beverage tray tables",
    ],
    setupHighlights: [
      { label: "Displays", value: "4K HDR Large-Screen OLED" },
      { label: "Controllers", value: "Dual Wireless Haptic Gamepads" },
      { label: "Atmosphere", value: "Private Living-Room Pod Vibe" },
      { label: "Multiplayer", value: "Up to 4 Players Local Co-Op" },
    ],
    idealFor:
      "FIFA / EA Sports showdowns, fighting game battles, and relaxed group gaming sessions.",
    bookingNote: "Hourly pod rental with flexible group sizing.",
  },
];
