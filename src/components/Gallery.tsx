import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { GALLERY_ITEMS } from "../data/gallery";
import { ImageWithFallback } from "./ImageWithFallback";

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Spaces" },
    { id: "sim-racing", label: "Sim Racing" },
    { id: "vr", label: "VR Arena" },
    { id: "esports", label: "Esports & PC" },
    { id: "snooker", label: "Snooker & Pool" },
    { id: "dining", label: "Dining & Bar" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const closeLightbox = () => setLightboxIndex(null);

  const handlePrev = () => {
    setLightboxIndex((current) => {
      if (current === null || filteredItems.length === 0) return null;
      return current > 0 ? current - 1 : filteredItems.length - 1;
    });
  };

  const handleNext = () => {
    setLightboxIndex((current) => {
      if (current === null || filteredItems.length === 0) return null;
      return current < filteredItems.length - 1 ? current + 1 : 0;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, filteredItems.length]);

  const currentLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setLightboxIndex(null);
  };

  return (
    <section
      id="gallery"
      className="relative border-t border-slate-900 bg-[#0a0c12] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400">
              <span>Studio Visuals</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span>Lounge Walkthrough</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              INSIDE KHALIFA STUDIO.
            </h2>
          </div>

          {/* Category filters */}
          <div
            className="flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 p-1"
            aria-label="Filter gallery by category"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => selectCategory(category.id)}
                  aria-pressed={isActive}
                  className={`min-h-9 rounded-md px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Open image: ${item.title}`}
              className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900 text-left transition-colors duration-300 hover:border-purple-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <div className="relative h-56 w-full overflow-hidden sm:h-60 lg:h-64">
                <ImageWithFallback
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover"
                  fallbackTitle={item.title}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

                {/* Visual hint stays; image itself does not zoom */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                  <div className="rounded-full bg-purple-600/90 p-3 text-white shadow-lg">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="pointer-events-none absolute left-3 top-3 text-[11px] font-semibold uppercase tracking-wider text-purple-300 drop-shadow">
                  {item.categoryLabel}
                </div>
              </div>

              <div className="w-full bg-[#111420] p-4">
                <h3 className="text-base font-bold text-white transition-colors group-hover:text-purple-300">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-400">
            No images found in this category.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {currentLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/95 p-3 backdrop-blur-md sm:p-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview: ${currentLightboxItem.title}`}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-3 top-3 z-30 rounded-full border border-slate-700 bg-slate-900/90 p-2.5 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 sm:right-5 sm:top-5"
            aria-label="Close image preview"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-200 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 sm:left-5 sm:p-3"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-200 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 sm:right-5 sm:p-3"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div
            className="my-auto flex max-h-[92dvh] w-full max-w-5xl flex-col items-center justify-center py-12 sm:max-h-[90vh] sm:py-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex max-h-[65dvh] w-full items-center justify-center sm:max-h-[72vh]">
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.imageAlt}
                referrerPolicy="no-referrer"
                className="block max-h-[65dvh] max-w-full rounded-lg object-contain shadow-2xl sm:max-h-[72vh]"
              />
            </div>

            <div className="mt-4 max-w-2xl px-2 text-center">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-purple-400">
                {currentLightboxItem.categoryLabel} ({lightboxIndex! + 1} of{" "}
                {filteredItems.length})
              </span>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                {currentLightboxItem.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                {currentLightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
