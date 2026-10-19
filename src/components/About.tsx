import React from "react";
import {
  Users2,
  ShieldCheck,
  Sparkles,
  Coffee,
  Compass,
} from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

import studioExteriorImage from "../assets/images/studio_exterior_entrance_1792425627990.jpg";
import ps5ConsoleImage from "../assets/images/ps5_console_station_1792425627150.jpg";
import loungeCafeImage from "../assets/images/lounge_cafe_dining_1792425596502.jpg";

interface AboutProps {
  onPlanVisit: () => void;
}

export const About: React.FC<AboutProps> = ({ onPlanVisit }) => {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-slate-900 bg-[#0b0d13] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <div className="min-w-0 lg:col-span-6">
            <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-widest text-purple-400 sm:text-xs">
              <span>About The Venue</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Kanpur Destination</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
              CRAFTED FOR GAMERS. BUILT FOR SOCIAL ENTERTAINMENT.
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base">
              <p>
                Khalifa Gaming Studio &amp; Lounge was conceived to answer a
                clear need in Kanpur: a premium, mature space where competitive
                gaming meets the comfort of an upscale social lounge.
              </p>

              <p>
                Too often, gaming spaces in cities are either cramped
                cybercafés or dimly lit arcades. Khalifa Studio brings
                high-fidelity entertainment under one refined roof—pairing
                tournament-grade PC battlestations and racing simulators with
                championship snooker and a full hospitality café.
              </p>

              <p>
                Whether you are climbing ranked competitive ladders,
                discovering virtual reality for the first time, enjoying
                friendly games of 8-ball pool, or catching up over gourmet
                burgers and coffee, the space is built to be welcoming,
                comfortable, and technically uncompromising.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-8 sm:gap-4">
              <div className="min-w-0 rounded-lg border border-slate-800/80 bg-[#121520] p-4">
                <div className="mb-2 flex items-center gap-2 text-purple-400">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Hardware First
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Zero compromises on refresh rates, direct-drive force
                  feedback, and optical fiber low-latency routing.
                </p>
              </div>

              <div className="min-w-0 rounded-lg border border-slate-800/80 bg-[#121520] p-4">
                <div className="mb-2 flex items-center gap-2 text-cyan-400">
                  <Coffee className="h-4 w-4 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Lounge Hospitality
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Clean air filtration, climate-controlled interiors, ergonomic
                  chairs, and station-side food &amp; drinks.
                </p>
              </div>

              <div className="min-w-0 rounded-lg border border-slate-800/80 bg-[#121520] p-4">
                <div className="mb-2 flex items-center gap-2 text-blue-400">
                  <Users2 className="h-4 w-4 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Community &amp; Friends
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Spacious zones crafted for group hangouts, local LAN scrims,
                  and friendly weekend tournaments.
                </p>
              </div>

              <div className="min-w-0 rounded-lg border border-slate-800/80 bg-[#121520] p-4">
                <div className="mb-2 flex items-center gap-2 text-violet-400">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Pure Accessibility
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Friendly floor staff ready to help onboard newcomers to VR
                  rigs, racing wheels, and cue sports.
                </p>
              </div>
            </div>

            <div className="mt-7 sm:mt-8">
              <button
                type="button"
                onClick={onPlanVisit}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-600/20 transition-colors hover:bg-purple-500 active:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d13] sm:w-auto sm:px-6"
              >
                <Compass className="h-3.5 w-3.5 shrink-0" />
                <span>Plan Your Visit to Kanpur Studio</span>
              </button>
            </div>
          </div>

          <div className="min-w-0 space-y-3 sm:space-y-4 lg:col-span-6">
            <div className="overflow-hidden rounded-xl border border-slate-800 shadow-xl">
              <div className="h-56 w-full sm:h-72 md:h-80">
                <ImageWithFallback
                  src={studioExteriorImage}
                  alt="Hospitality lounge entrance concept of Khalifa Gaming Studio & Lounge"
                  className="h-full w-full object-cover object-center"
                  fallbackTitle="Khalifa Lounge Atmosphere"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="min-w-0 overflow-hidden rounded-xl border border-slate-800">
                <div className="h-36 w-full min-[420px]:h-40 sm:h-44">
                  <ImageWithFallback
                    src={ps5ConsoleImage}
                    alt="Console gaming suites with 4K screens"
                    className="h-full w-full object-cover object-center"
                    fallbackTitle="Console Suite"
                  />
                </div>
              </div>

              <div className="min-w-0 overflow-hidden rounded-xl border border-slate-800">
                <div className="h-36 w-full min-[420px]:h-40 sm:h-44">
                  <ImageWithFallback
                    src={loungeCafeImage}
                    alt="Dining and refreshment bar within the studio"
                    className="h-full w-full object-cover object-center"
                    fallbackTitle="Lounge Dining"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3.5 text-xs leading-relaxed text-slate-400">
              <span className="font-semibold text-slate-300">Venue Note:</span>{" "}
              High-fidelity preview assets showcase the planned interior layout
              and experience zones. Official venue snapshots can be directly
              inserted into{" "}
              <code className="break-all font-mono text-[11px] text-purple-300">
                src/data/gallery.ts
              </code>{" "}
              anytime.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
