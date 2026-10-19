import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Experiences", href: "#experiences" },
    { label: "Simulator Rigs", href: "#immersive" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Plan Visit", href: "#visit" },
  ];

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  const handleBookingClick = () => {
    setMobileMenuOpen(false);
    onOpenBooking();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-800/80 bg-[#0b0d13]/95 py-3 shadow-xl shadow-black/40 backdrop-blur-md"
          : "bg-gradient-to-b from-[#0b0d13]/90 via-[#0b0d13]/50 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:gap-5 sm:px-6 lg:gap-8 lg:px-8">
        {/* Brand */}
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setMobileMenuOpen(false);
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? "auto"
                : "smooth",
            });
          }}
          className="group flex min-w-0 shrink items-center gap-2 text-white transition-colors hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          aria-label="Khalifa Gaming Studio - Back to top"
        >
          <span className="h-2.5 w-2.5 shrink-0 rotate-45 rounded-sm bg-gradient-to-tr from-purple-500 to-cyan-400 transition-transform group-hover:scale-110" />
          <span className="truncate text-base font-bold tracking-tight sm:text-xl">
            Khalifa Gaming Studio
          </span>
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-4 text-sm font-medium text-slate-300 lg:flex xl:gap-7"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleLinkClick(event, link.href)}
              className="relative shrink-0 whitespace-nowrap py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-purple-500 after:transition-all after:duration-200 hover:text-white hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Booking button: desktop and tablet */}
        <div className="hidden shrink-0 sm:flex">
          <button
            type="button"
            onClick={handleBookingClick}
            className="flex min-h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-purple-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-purple-600/20 transition-colors hover:bg-purple-500 active:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d13] sm:px-4"
          >
            <span>Reserve Session</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-200 transition-colors hover:bg-slate-800/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Compact navigation for tablets */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-200 transition-colors hover:bg-slate-800/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 md:max-lg:flex"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile/tablet navigation drawer */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 -z-10 cursor-default bg-black/30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-slate-800 bg-[#0e111a] px-5 py-5 shadow-2xl sm:px-6 lg:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 text-base font-medium"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleLinkClick(event, link.href)}
                  className="border-b border-slate-800/60 py-3 text-slate-200 transition-colors hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  {link.label}
                </a>
              ))}

              <button
                type="button"
                onClick={handleBookingClick}
                className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-500 active:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span>Reserve Session / Enquire</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
