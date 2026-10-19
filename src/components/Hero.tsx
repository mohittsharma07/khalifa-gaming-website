import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown, ArrowRight, MapPin, Compass } from "lucide-react";
import { STUDIO_CONFIG, getLoungeOpenStatus } from "../config/studioConfig";

interface HeroProps {
  onExplore: () => void;
  onPlanVisit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onPlanVisit,
}) => {
  const openStatus = getLoungeOpenStatus();
  const shouldReduceMotion = useReducedMotion();

  const entranceTransition = (delay = 0) => ({
    duration: shouldReduceMotion ? 0 : 0.6,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  });

  const entranceAnimation = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: entranceTransition(delay),
  });

  return (
    <section
      className="relative isolate flex min-h-[92svh] w-full items-center justify-center overflow-hidden bg-[#0b0d13] px-0 pb-20 pt-28 sm:min-h-[92vh] sm:pt-32 lg:min-h-screen lg:pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Cinematic background — no scale or zoom animation */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/images/hero_gaming_lounge_1792425594186.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />

        {/* Layered scrims for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-[#0b0d13]/75 to-[#0b0d13]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,13,19,0.4)_55%,rgba(11,13,19,0.9)_100%)]" />
      </div>

      {/* Main hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        {/* Location and status */}
        <motion.div
          {...entranceAnimation(0)}
          className="mb-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[10px] font-medium uppercase tracking-[0.12em] text-purple-300/90 sm:text-xs sm:tracking-widest md:text-sm"
        >
          <span>Kanpur, Uttar Pradesh</span>
          <span aria-hidden="true" className="text-slate-600">
            ·
          </span>
          <span>Next-Gen Gaming Lounge</span>
          <span aria-hidden="true" className="text-slate-600">
            ·
          </span>
          <span className="font-semibold text-cyan-300">
            {openStatus.statusText}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...entranceAnimation(0.1)}
          id="hero-heading"
          className="max-w-5xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white [text-wrap:balance] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          LEVEL UP YOUR{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-200 to-cyan-400 bg-clip-text text-transparent">
            REAL-WORLD
          </span>{" "}
          EXPERIENCE.
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          {...entranceAnimation(0.2)}
          className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 [text-wrap:balance] sm:mt-6 sm:text-base md:text-lg lg:text-xl"
        >
          {STUDIO_CONFIG.subheadline}
        </motion.p>

        {/* Primary and secondary actions */}
        <motion.div
          {...entranceAnimation(0.3)}
          className="mt-7 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <button
            type="button"
            onClick={onExplore}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-purple-600/30 transition-colors hover:bg-purple-500 active:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d13] sm:w-auto sm:px-7"
          >
            <span>Explore Experiences</span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </button>

          <button
            type="button"
            onClick={onPlanVisit}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-slate-700/80 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-slate-200 backdrop-blur-sm transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d13] sm:w-auto sm:px-7"
          >
            <Compass className="h-4 w-4 shrink-0 text-cyan-400" />
            <span>Plan Your Visit</span>
          </button>
        </motion.div>

        {/* Venue information */}
        <motion.div
          {...entranceAnimation(0.4)}
          className="mt-9 grid w-full max-w-3xl grid-cols-1 gap-x-5 gap-y-5 border-t border-slate-800/60 pt-6 text-left min-[380px]:grid-cols-2 sm:mt-12 sm:gap-y-6 sm:pt-8 lg:grid-cols-4"
        >
          <div className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 sm:text-[11px]">
              Location
            </span>
            <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-200">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-purple-400" />
              Kanpur, UP
            </span>
          </div>

          <div className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 sm:text-[11px]">
              Timings
            </span>
            <span className="mt-1 block break-words text-sm font-medium text-slate-200">
              {STUDIO_CONFIG.operatingHours.displayHours}
            </span>
          </div>

          <div className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 sm:text-[11px]">
              Attractions
            </span>
            <span className="mt-1 block text-sm font-medium text-slate-200">
              VR, Sim, Snooker, Café
            </span>
          </div>

          <div className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 sm:text-[11px]">
              Entry Format
            </span>
            <span className="mt-1 block text-sm font-medium text-slate-200">
              Walk-in &amp; Reservations
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll prompt */}
      <button
        type="button"
        onClick={onExplore}
        className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 rounded-md px-3 py-2 text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:bottom-4"
        aria-label="Explore gaming experiences"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown
          className={`h-4 w-4 ${shouldReduceMotion ? "" : "animate-bounce"}`}
        />
      </button>
    </section>
  );
};
