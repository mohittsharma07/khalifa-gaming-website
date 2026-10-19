export interface StudioConfig {
  name: string;
  shortName: string;
  tagline: string;
  subheadline: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  addressDisplay: string;
  addressLandmark: string;
  isAddressVerified: boolean;
  googleMapsQueryUrl: string;

  phone: {
    display: string;
    raw: string;
    isVerified: boolean;
  };

  whatsapp: {
    number: string;
    isVerified: boolean;
    defaultGreeting: string;
  };

  email: {
    address: string;
    isVerified: boolean;
  };

  operatingHours: {
    days: string;
    openTime: string;
    closeTime: string;
    displayHours: string;
    timezone: string;
  };

  socialLinks: {
    instagram: {
      handle: string;
      url: string;
      isVerified: boolean;
    };
    youtube: {
      url: string;
      isVerified: boolean;
    };
    discord: {
      url: string;
      isVerified: boolean;
    };
  };

  amenities: string[];
}

export const STUDIO_CONFIG: StudioConfig = {
  name: "Khalifa Gaming Studio & Lounge",
  shortName: "Khalifa Gaming",

  tagline: "Level Up Your Real-World Experience",

  subheadline:
    "Kanpur's premier entertainment destination combining tournament-tier gaming, direct-drive racing simulators, bespoke VR zones, championship snooker, and upscale lounge hospitality.",

  city: "Kanpur",
  state: "Uttar Pradesh",
  country: "India",
  postalCode: "208001",

  addressDisplay:
    "Swaroop Nagar / Civil Lines Entertainment Hub, Kanpur, Uttar Pradesh, India",

  addressLandmark:
    "Central Kanpur (Near Z Square / Mall Road corridor)",

  // Set true only after the owner confirms the complete address.
  isAddressVerified: false,

  // Opens a Google Maps search; it does not confirm an exact business pin.
  googleMapsQueryUrl:
    "https://www.google.com/maps/search/?api=1&query=Khalifa+Gaming+Studio+%26+Lounge+Kanpur",

  phone: {
    display: "+91 (Owner verification pending)",
    raw: "+910000000000",
    isVerified: false,
  },

  whatsapp: {
    number: "910000000000",
    isVerified: false,
    defaultGreeting:
      "Hi Khalifa Gaming Studio, I would like to enquire about visiting and reserving a session.",
  },

  email: {
    address: "contact@khalifagamingstudio.com",
    isVerified: false,
  },

  operatingHours: {
    days: "Monday – Sunday",
    openTime: "11:00",
    closeTime: "23:00",
    displayHours: "11:00 AM – 11:00 PM (Daily)",
    timezone: "Asia/Kolkata",
  },

  socialLinks: {
    instagram: {
      handle: "@khalifagamingstudio",
      url: "https://instagram.com",
      isVerified: false,
    },

    youtube: {
      url: "https://youtube.com",
      isVerified: false,
    },

    discord: {
      url: "https://discord.com",
      isVerified: false,
    },
  },

  amenities: [
    "High-Speed Gigabit LAN & Optical Fiber",
    "Dual-Zone Climate Control & Air Purification",
    "Direct-Drive Sim Racing Cockpits",
    "Dedicated 360° VR Motion Arenas",
    "Tournament-Grade Billiards & Snooker",
    "In-Lounge Gourmet Food & Beverage Service",
    "Ergonomic Esports Seating & Mechanical Rigs",
    "Power Backup with Zero-Downtime Online UPS",
  ],
};

/**
 * Converts a 24-hour HH:mm time into minutes after midnight.
 */
function parseTimeToMinutes(time: string): number | null {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);

  if (!match) return null;

  return Number(match[1]) * 60 + Number(match[2]);
}

/**
 * Gets the current time in the configured timezone.
 */
function getCurrentMinutes(timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const hour = parts.find((part) => part.type === "hour")?.value;
  const minute = parts.find((part) => part.type === "minute")?.value;

  if (hour === undefined || minute === undefined) {
    throw new Error("Unable to determine the current local time.");
  }

  return Number(hour) * 60 + Number(minute);
}

/**
 * Formats a duration as hours and minutes.
 */
function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}m`;
}

export interface LoungeOpenStatus {
  isOpen: boolean;
  statusText: string;
  nextEventText: string;
}

/**
 * Determines whether the lounge is currently open.
 *
 * Uses STUDIO_CONFIG operating hours and timezone.
 * Supports daytime and overnight opening schedules.
 *
 * Note: This is a schedule-based estimate, not confirmation
 * that the physical venue is actually open.
 */
export function getLoungeOpenStatus(): LoungeOpenStatus {
  const { operatingHours } = STUDIO_CONFIG;

  try {
    const openMinutes = parseTimeToMinutes(operatingHours.openTime);
    const closeMinutes = parseTimeToMinutes(operatingHours.closeTime);

    if (
      openMinutes === null ||
      closeMinutes === null ||
      openMinutes === closeMinutes
    ) {
      throw new Error("Invalid or unsupported operating hours.");
    }

    const currentMinutes = getCurrentMinutes(operatingHours.timezone);

    // If closing time is earlier than opening time, the schedule
    // crosses midnight, for example 20:00–02:00.
    const isOvernight = closeMinutes < openMinutes;

    const isOpen = isOvernight
      ? currentMinutes >= openMinutes || currentMinutes < closeMinutes
      : currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    if (isOpen) {
      const remainingMinutes =
        currentMinutes < closeMinutes && isOvernight
          ? closeMinutes - currentMinutes
          : closeMinutes > currentMinutes
            ? closeMinutes - currentMinutes
            : 24 * 60 - currentMinutes + closeMinutes;

      return {
        isOpen: true,
        statusText: "Open Now",
        nextEventText: `Closes at ${operatingHours.closeTime} (${formatDuration(
          remainingMinutes
        )} remaining)`,
      };
    }

    const opensLaterToday = isOvernight
      ? currentMinutes < openMinutes
      : currentMinutes < openMinutes;

    return {
      isOpen: false,
      statusText: "Closed Now",
      nextEventText: opensLaterToday
        ? `Opens today at ${operatingHours.openTime}`
        : `Opens tomorrow at ${operatingHours.openTime}`,
    };
  } catch {
    return {
      isOpen: false,
      statusText: "Hours unavailable",
      nextEventText: `Scheduled hours: ${operatingHours.displayHours}`,
    };
  }
}
