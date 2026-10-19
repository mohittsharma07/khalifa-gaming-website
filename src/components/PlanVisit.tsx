import React from "react";
import {
  MapPin,
  Clock,
  Navigation,
  AlertCircle,
} from "lucide-react";
import {
  STUDIO_CONFIG,
  getLoungeOpenStatus,
} from "../config/studioConfig";

interface PlanVisitProps {
  onOpenBooking: () => void;
}

export const PlanVisit: React.FC<PlanVisitProps> = ({
  onOpenBooking,
}) => {
  const openStatus = getLoungeOpenStatus();

  return (
    <section
      id="visit"
      className="relative border-t border-slate-900 bg-[#0b0d13] py-14 sm:py-18 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-3xl sm:mb-14">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400 sm:text-xs sm:tracking-widest">
            <span>Visitor Guide</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span>Kanpur, Uttar Pradesh</span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            PLAN YOUR VISIT.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
            Everything you need to know before walking into Khalifa
            Gaming Studio &amp; Lounge. We welcome solo walk-ins,
            esports duos, and group bookings.
          </p>
        </div>

        {/* Responsive two-column layout */}
        <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left column */}
          <div className="min-w-0 space-y-5 sm:space-y-6 lg:col-span-7">
            {/* Status and hours */}
            <div className="rounded-xl border border-slate-800 bg-[#121520] p-4 shadow-lg sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0 rounded-lg border border-purple-800/40 bg-purple-950/60 p-3 text-purple-400">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                      Operating Schedule
                    </span>

                    <h3 className="mt-1 break-words text-base font-bold text-white sm:text-lg">
                      {STUDIO_CONFIG.operatingHours.displayHours}
                    </h3>
                  </div>
                </div>

                <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 sm:flex-col sm:items-end sm:text-right">
                  <span
                    className={`inline-flex max-w-full items-center rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:text-xs ${
                      openStatus.isOpen
                        ? "border-emerald-800/50 bg-emerald-950/40 text-emerald-300"
                        : "border-amber-800/50 bg-amber-950/40 text-amber-300"
                    }`}
                  >
                    {openStatus.statusText}
                  </span>

                  <span className="text-[11px] leading-relaxed text-slate-400">
                    {openStatus.nextEventText}
                  </span>
                </div>
              </div>
            </div>

            {/* Address and navigation */}
            <div className="rounded-xl border border-slate-800 bg-[#121520] p-4 shadow-lg sm:p-6">
              <div className="mb-4 flex items-start gap-3">
                <div className="shrink-0 rounded-lg border border-cyan-800/40 bg-cyan-950/60 p-3 text-cyan-400">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                    Physical Destination
                  </span>

                  <h3 className="mt-1 break-words text-base font-bold text-white sm:text-lg">
                    {STUDIO_CONFIG.name}
                  </h3>

                  <p className="mt-2 break-words text-sm leading-6 text-slate-300 [overflow-wrap:anywhere]">
                    {STUDIO_CONFIG.addressDisplay}
                  </p>

                  <p className="mt-2 break-words text-xs leading-5 text-slate-400 [overflow-wrap:anywhere]">
                    <span className="font-semibold text-slate-300">
                      Landmark:
                    </span>{" "}
                    {STUDIO_CONFIG.addressLandmark}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col items-stretch gap-3 border-t border-slate-800 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <a
                  href={STUDIO_CONFIG.googleMapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions to Khalifa Gaming Studio on Google Maps"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 active:bg-blue-700 sm:w-auto sm:px-5"
                >
                  <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Get Google Maps Directions</span>
                </a>

                <span className="text-xs leading-relaxed text-slate-400 sm:max-w-52 sm:text-right">
                  Opens Google Maps in a new tab.
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-xl border border-slate-800 bg-[#121520] p-4 sm:p-6">
              <h4 className="mb-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                Studio Amenities &amp; Standards
              </h4>

              <div className="grid grid-cols-1 gap-3 text-xs leading-5 text-slate-300 sm:grid-cols-2 sm:gap-4">
                {STUDIO_CONFIG.amenities.map((amenity, idx) => (
                  <div key={`${amenity}-${idx}`} className="flex min-w-0 items-start gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400"
                      aria-hidden="true"
                    />
                    <span className="break-words">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="min-w-0 space-y-5 sm:space-y-6 lg:col-span-5">
            {/* Visitor guidelines */}
            <div className="rounded-xl border border-slate-800 bg-[#121520] p-4 sm:p-6">
              <h4 className="mb-4 text-[10px] font-bold uppercase tracking-wider text-purple-400 sm:text-xs">
                Important Visitor Guidelines
              </h4>

              <ul className="space-y-4 text-xs leading-6 text-slate-300 sm:text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 font-bold text-purple-400">
                    01.
                  </span>
                  <span>
                    <strong className="text-white">Walk-ins Welcome:</strong>{" "}
                    While walk-ins are seated on available stations,
                    sim-racing rigs and snooker tables are in high demand
                    during evenings.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 font-bold text-purple-400">
                    02.
                  </span>
                  <span>
                    <strong className="text-white">
                      Clean Gameplay Hygiene:
                    </strong>{" "}
                    Hand-sanitizing stations and disposable VR eye masks
                    are provided for maximum comfort.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 font-bold text-purple-400">
                    03.
                  </span>
                  <span>
                    <strong className="text-white">
                      Dining Zone Etiquette:
                    </strong>{" "}
                    Food and drinks are permitted in the designated dining
                    lounge, booth seats, and at battlestations with
                    protective coaster trays.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 font-bold text-purple-400">
                    04.
                  </span>
                  <span>
                    <strong className="text-white">
                      Group &amp; Private Sessions:
                    </strong>{" "}
                    Planning a birthday tournament, corporate outing, or
                    clan scrimmage? Advance enquiries allow us to prepare
                    custom brackets.
                  </span>
                </li>
              </ul>

              <div className="mt-6 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 active:bg-purple-700"
                >
                  Submit Visit Enquiry Online
                </button>
              </div>
            </div>

            {/* Owner verification notice */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/90 p-4 text-xs text-slate-400 sm:p-5">
              <div className="mb-2 flex items-start gap-2 font-semibold text-slate-300">
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-purple-400"
                  aria-hidden="true"
                />
                <span>Verification Checklist for Studio Owner</span>
              </div>

              <p className="leading-6">
                Before public marketing launches, confirm the exact street
                door number, primary WhatsApp number, and pricing tariffs
                in{" "}
                <code className="break-words font-mono text-[11px] text-purple-300 [overflow-wrap:anywhere]">
                  src/config/studioConfig.ts
                </code>
                . No unverified phone numbers or false claims are shown.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
