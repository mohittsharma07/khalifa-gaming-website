import React, { useState } from "react";
import { MapPin, Navigation, Info, ArrowUp } from "lucide-react";
import { STUDIO_CONFIG } from "../config/studioConfig";
import { OwnerHandoverModal } from "./OwnerHandoverModal";

export const Footer: React.FC = () => {
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-slate-900 bg-[#07080c] py-12 text-slate-400 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-9 border-b border-slate-800/80 pb-10 sm:grid-cols-2 sm:gap-10 sm:pb-12 lg:grid-cols-12">
          {/* Brand Information */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-5">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                scrollToTop();
              }}
              className="inline-flex min-h-11 items-center gap-3 rounded-sm text-lg font-bold tracking-tight text-white transition-colors hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
              aria-label={`${STUDIO_CONFIG.name} - back to top`}
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rotate-45 rounded-sm bg-gradient-to-tr from-purple-500 to-cyan-400"
              />
              <span className="break-words">{STUDIO_CONFIG.name}</span>
            </a>

            <p className="max-w-md text-sm leading-7 text-slate-400">
              Kanpur’s premier gaming and social lounge. Featuring
              cutting-edge direct-drive racing simulators, bespoke VR play
              bays, tournament snooker, esports battlestations, and gourmet
              lounge dining.
            </p>

            <div className="flex items-start gap-2 pt-1 text-sm leading-6 text-slate-400">
              <MapPin
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 text-purple-400"
              />
              <span>
                {STUDIO_CONFIG.city}, {STUDIO_CONFIG.state},{" "}
                {STUDIO_CONFIG.country}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3 lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h2>

            <ul className="space-y-1 text-sm">
              {[
                { href: "#experiences", label: "Studio Experiences" },
                { href: "#immersive", label: "Pro Sim Racing" },
                { href: "#about", label: "About the Studio" },
                { href: "#gallery", label: "Visual Gallery" },
                { href: "#visit", label: "Plan Your Visit" },
                { href: "#contact", label: "Enquiries & Reservations" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-10 items-center py-1 pr-2 transition-colors hover:text-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location and Directions */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Visit in Kanpur
            </h2>

            <p className="max-w-lg break-words text-sm leading-7 text-slate-400">
              {STUDIO_CONFIG.addressDisplay}
            </p>

            <div className="pt-1">
              <a
                href={STUDIO_CONFIG.googleMapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm py-2 text-sm font-semibold leading-6 text-cyan-400 transition-colors hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                <Navigation
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
                <span>Get Google Maps Directions →</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowOwnerModal(true)}
                className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-left text-sm leading-5 text-slate-300 transition-colors hover:border-purple-500/40 hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
              >
                <Info
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-purple-400"
                />
                <span>Studio Owner Handover Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col items-start justify-between gap-5 pt-7 text-sm sm:flex-row sm:items-center sm:gap-4 sm:pt-8">
          <p className="max-w-full leading-6">
            © {currentYear} {STUDIO_CONFIG.name}. All rights reserved.
            <span className="block text-slate-500 sm:inline">
              {" "}Kanpur, India.
            </span>
          </p>

          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end sm:gap-5">
            <span className="text-xs leading-5 text-slate-500 sm:text-sm">
              Designed for Khalifa Gaming Studio
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-purple-500/40 hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Studio Owner Handover Modal */}
      <OwnerHandoverModal
        isOpen={showOwnerModal}
        onClose={() => setShowOwnerModal(false)}
      />
    </footer>
  );
};
