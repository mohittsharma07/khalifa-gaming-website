import React, { useState } from "react";
import { EXPERIENCES, type ExperienceItem } from "../data/experiences";
import { ExperienceModal } from "./ExperienceModal";
import { ImageWithFallback } from "./ImageWithFallback";
import { ArrowUpRight } from "lucide-react";

interface ExperiencesProps {
  onSelectForBooking: (title: string) => void;
}

export const Experiences: React.FC<ExperiencesProps> = ({
  onSelectForBooking,
}) => {
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);

  const marqueeItems = EXPERIENCES.slice(0, 2);
  const standardItems = EXPERIENCES.slice(2);

  const openExperience = (experience: ExperienceItem) => {
    setSelectedExperience(experience);
  };

  return (
    <section
      id="experiences"
      className="relative border-t border-slate-900 bg-[#0b0d13] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-16">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400">
            <span>Entertainment Ecosystem</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span>Six Curated Zones</span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
            MORE THAN JUST GAMING.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-300 [text-wrap:balance] sm:text-lg">
            Whether you are testing your cornering limits on a direct-drive
            racing rig, exploring wireless virtual reality, settling scores on
            tournament snooker, or hanging out in the dining lounge—Khalifa
            Studio is engineered for authentic social entertainment.
          </p>
        </div>

        {/* Featured experiences */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:gap-8 lg:mb-12 lg:grid-cols-12">
          {marqueeItems.map((item, idx) => {
            const isCol7 = idx === 0;

            return (
              <article
                key={item.id}
                onClick={() => openExperience(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openExperience(item);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${item.title}`}
                className={`group flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-slate-800/80 bg-[#121520] transition-colors duration-300 hover:border-purple-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  isCol7 ? "lg:col-span-7" : "lg:col-span-5"
                }`}
              >
                <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-80">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover"
                    fallbackTitle={item.title}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121520] via-black/30 to-transparent" />

                  <div className="pointer-events-none absolute left-4 top-4 z-10 text-xs font-semibold uppercase tracking-wider text-purple-300/90 drop-shadow">
                    {item.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 sm:p-8">
                  <div>
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-purple-300 sm:text-2xl">
                        {item.title}
                      </h3>

                      <div className="shrink-0 rounded-full bg-slate-800/80 p-2 text-slate-300 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                    <p className="line-clamp-3 text-sm leading-relaxed text-slate-300">
                      {item.shortDescription}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-800/60 pt-4 text-xs text-slate-400">
                      {item.setupHighlights.slice(0, 3).map((highlight, index) => (
                        <div key={`${item.id}-highlight-${index}`} className="flex items-start gap-1.5">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-purple-400" />
                          <span className="font-medium text-slate-300">
                            {highlight.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/40 pt-4 text-xs">
                    <span className="font-semibold text-purple-400 group-hover:underline">
                      Explore Rig &amp; Specs →
                    </span>
                    <span className="text-slate-400">Walk-in &amp; Reserve</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Remaining experiences */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {standardItems.map((item) => (
            <article
              key={item.id}
              onClick={() => openExperience(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openExperience(item);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${item.title}`}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-[#121520] transition-colors duration-300 hover:border-purple-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <div className="relative h-48 w-full overflow-hidden sm:h-52 lg:h-48">
                <ImageWithFallback
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover"
                  fallbackTitle={item.title}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121520] via-black/20 to-transparent" />

                <div className="pointer-events-none absolute left-3 top-3 text-[11px] font-semibold uppercase tracking-wider text-purple-300/90">
                  {item.category}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-purple-300">
                      {item.title}
                    </h3>

                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-purple-400" />
                  </div>

                  <p className="line-clamp-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/60 pt-3 text-xs">
                  <span className="font-medium text-purple-400 group-hover:underline">
                    View Details
                  </span>
                  <span className="text-slate-400">
                    {item.setupHighlights[0]?.value}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        onSelectForBooking={onSelectForBooking}
      />
    </section>
  );
};

