import React, { useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  Gamepad2,
  ArrowRight,
} from "lucide-react";
import { ExperienceItem } from "../data/experiences";
import { ImageWithFallback } from "./ImageWithFallback";

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
  onSelectForBooking: (experienceTitle: string) => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  experience,
  onClose,
  onSelectForBooking,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!experience) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      // Keep keyboard focus inside the open dialog.
      if (event.key === "Tab") {
        const dialog = document.getElementById("experience-modal-dialog");
        if (!dialog) return;

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        const focusable = Array.from(focusableElements).filter(
          (element) => element.getAttribute("aria-hidden") !== "true",
        );

        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [experience, onClose]);

  if (!experience) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-5 lg:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onTouchStart={(event) => {
        if (event.target === event.currentTarget) {
          // Allow backdrop touch without adding image or content zoom effects.
        }
      }}
    >
      <div
        id="experience-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-experience-title"
        aria-describedby="modal-experience-tagline"
        className="relative my-2 flex w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#11141e] shadow-2xl sm:my-6"
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close experience details"
          className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700/70 bg-slate-950/85 text-slate-200 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Image header — no scale or zoom animation */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden bg-slate-900 sm:h-64 md:h-72">
          <ImageWithFallback
            src={experience.image}
            alt={experience.imageAlt}
            className="h-full w-full object-cover object-center"
            fallbackTitle={experience.title}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11141e] via-[#11141e]/45 to-transparent"
          />

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-purple-400 sm:text-xs">
              {experience.category}
            </span>

            <h2
              id="modal-experience-title"
              className="max-w-2xl break-words text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl"
            >
              {experience.title}
            </h2>

            <p
              id="modal-experience-tagline"
              className="mt-1 max-w-xl text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6"
            >
              {experience.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 space-y-6 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8">
          {/* Overview */}
          <section>
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
              Overview
            </h3>

            <p className="break-words text-sm leading-7 text-slate-300 sm:text-base">
              {experience.fullOverview}
            </p>
          </section>

          {/* Setup highlights */}
          <section>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
              Setup Highlights
            </h3>

            <div className="grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:grid-cols-4 sm:gap-3">
              {experience.setupHighlights.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className="min-w-0 rounded-lg border border-slate-800/80 bg-slate-900/80 p-3"
                >
                  <span className="block break-words text-[10px] font-medium uppercase leading-5 text-slate-400 sm:text-[11px]">
                    {stat.label}
                  </span>

                  <span className="mt-1 block break-words text-xs font-semibold leading-5 text-slate-200 [overflow-wrap:anywhere]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
              Included Experience Features
            </h3>

            <ul className="space-y-3">
              {experience.keyFeatures.map((feature, idx) => (
                <li
                  key={`${feature}-${idx}`}
                  className="flex items-start gap-2.5 text-xs leading-6 text-slate-300 sm:text-sm"
                >
                  <CheckCircle2
                    className="mt-1 h-4 w-4 shrink-0 text-purple-400"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 break-words">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Recommendation */}
          <section className="flex items-start gap-3 rounded-lg border border-purple-900/30 bg-purple-950/20 p-3.5 sm:p-4">
            <Gamepad2
              className="mt-0.5 h-5 w-5 shrink-0 text-purple-400"
              aria-hidden="true"
            />

            <div className="min-w-0 text-xs leading-6 sm:text-sm">
              <h3 className="font-semibold text-purple-200">
                Session &amp; Group Recommendation
              </h3>

              <p className="mt-1 break-words text-purple-300/90">
                {experience.idealFor}
              </p>

              <p className="mt-2 break-words text-xs italic leading-5 text-slate-400">
                {experience.bookingNote}
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col items-stretch gap-3 border-t border-slate-800 bg-slate-900/95 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p className="text-center text-[11px] leading-5 text-slate-400 sm:max-w-xs sm:text-left sm:text-xs">
            Walk-ins welcome, subject to station availability.
          </p>

          <button
            type="button"
            onClick={() => {
              onSelectForBooking(experience.title);
              onClose();
            }}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-500 active:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 sm:w-auto sm:shrink-0 sm:px-5"
          >
            <span>Enquire for {experience.title}</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
