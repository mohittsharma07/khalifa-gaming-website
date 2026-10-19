import heroImage from "../assets/images/hero_gaming_lounge_1792425594186.jpg";
import racingImage from "../assets/images/racing_simulator_rig_1792425595538.jpg";
import vrImage from "../assets/images/vr_gaming_experience_1792425595122.jpg";
import snookerImage from "../assets/images/snooker_pool_lounge_1792425598455.jpg";
import diningImage from "../assets/images/lounge_cafe_dining_1792425596502.jpg";
import consoleImage from "../assets/images/ps5_console_station_1792425627150.jpg";
import esportsImage from "../assets/images/multiplayer_pc_zone_1792425627694.jpg";
import exteriorImage from "../assets/images/studio_exterior_entrance_1792425627990.jpg";

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "esports" | "sim-racing" | "vr" | "snooker" | "dining";
  categoryLabel: string;
  image: string;
  imageAlt: string;
  caption: string;
  aspectRatio: "landscape" | "portrait" | "standard";
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Esports Arena & Central Stage",
    category: "esports",
    categoryLabel: "Esports & PC",
    image: heroImage,
    imageAlt:
      "Central competitive gaming arena with spectators, tournament stage and battlestations",
    caption:
      "The central arena floor with high-spec battlestations, spectator seating, and tournament broadcast viewports.",
    aspectRatio: "landscape",
  },
  {
    id: "gal-2",
    title: "Pro Direct-Drive Sim Racing Rig",
    category: "sim-racing",
    categoryLabel: "Sim Racing",
    image: racingImage,
    imageAlt:
      "Driver in racing bucket seat testing direct-drive simulator with triple curved panoramic screens",
    caption:
      "Full cockpit simulator with aluminum profile chassis, direct-drive motor, and panoramic curved views.",
    aspectRatio: "standard",
  },
  {
    id: "gal-3",
    title: "Virtual Reality Boundary Arena",
    category: "vr",
    categoryLabel: "VR Arena",
    image: vrImage,
    imageAlt:
      "Illuminated VR headset station with motion controllers on dark pedestal in lounge bay",
    caption:
      "Dedicated room-scale VR bay featuring high-fidelity optics and 360-degree wireless tracking.",
    aspectRatio: "standard",
  },
  {
    id: "gal-4",
    title: "Tournament Snooker Lounge",
    category: "snooker",
    categoryLabel: "Snooker & Pool",
    image: snookerImage,
    imageAlt:
      "Championship snooker table with warm pendant lights in club lounge with cue players",
    caption:
      "Full-size slate snooker table with warm canopy lighting and private clubroom atmosphere.",
    aspectRatio: "standard",
  },
  {
    id: "gal-5",
    title: "Gourmet Lounge & Refreshment Bar",
    category: "dining",
    categoryLabel: "Dining & Lounge",
    image: diningImage,
    imageAlt:
      "Gourmet sliders, shakes, and guests enjoying hospitality inside the studio lounge bar",
    caption:
      "In-lounge food court and café serving artisan drinks, signature sliders, and table-side service.",
    aspectRatio: "standard",
  },
  {
    id: "gal-6",
    title: "Next-Gen Console Station",
    category: "esports",
    categoryLabel: "Esports & PC",
    image: consoleImage,
    imageAlt:
      "Console gaming setup with 4K screen, ergonomic chairs, and wireless controllers",
    caption:
      "Cozy console alcove configured for local co-op, fighting games, and sports showdowns.",
    aspectRatio: "standard",
  },
  {
    id: "gal-7",
    title: "Competitive 5v5 LAN Row",
    category: "esports",
    categoryLabel: "Esports & PC",
    image: esportsImage,
    imageAlt:
      "Team of gamers seated at high-refresh PC monitors during a LAN match",
    caption:
      "Tournament-ready LAN row with 240Hz displays, tactile mechanical boards, and optical low-ping fiber.",
    aspectRatio: "standard",
  },
  {
    id: "gal-8",
    title: "Lounge Exterior & Hospitality Entrance",
    category: "dining",
    categoryLabel: "Dining & Lounge",
    image: exteriorImage,
    imageAlt:
      "Modern illuminated architectural entrance of the entertainment lounge at dusk",
    caption:
      "Welcoming entrance and hospitality lounge in Kanpur, designed for gamers and evening visitors alike.",
    aspectRatio: "landscape",
  },
];
