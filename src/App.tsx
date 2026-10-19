import React, { useCallback, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Experiences } from "./components/Experiences";
import { ImmersiveFeature } from "./components/ImmersiveFeature";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { PlanVisit } from "./components/PlanVisit";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [selectedExperienceForBooking, setSelectedExperienceForBooking] =
    useState<string>("General Visit & Walk-in");

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      console.warn(`Section with id "${sectionId}" was not found.`);
      return;
    }

    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, []);

  const handleSelectExperienceForBooking = useCallback(
    (experienceTitle: string) => {
      setSelectedExperienceForBooking(experienceTitle);
      scrollToSection("contact");
    },
    [scrollToSection]
  );

  const handleOpenBooking = useCallback(() => {
    scrollToSection("contact");
  }, [scrollToSection]);

  const handlePlanVisit = useCallback(() => {
    scrollToSection("visit");
  }, [scrollToSection]);

  const handleExplore = useCallback(() => {
    scrollToSection("experiences");
  }, [scrollToSection]);

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col bg-[#0b0d13] font-sans text-slate-100 selection:bg-purple-600/30 selection:text-purple-200">
      <Navbar onOpenBooking={handleOpenBooking} />

      <main className="min-w-0 flex-1">
        <Hero onExplore={handleExplore} onPlanVisit={handlePlanVisit} />

        <Experiences
          onSelectForBooking={handleSelectExperienceForBooking}
        />

        <ImmersiveFeature
          onReserve={() =>
            handleSelectExperienceForBooking("Pro Racing Simulators")
          }
        />

        <About onPlanVisit={handlePlanVisit} />

        <Gallery />

        <PlanVisit onOpenBooking={handleOpenBooking} />

        <ContactSection
          preselectedExperience={selectedExperienceForBooking}
        />
      </main>

      <Footer />
    </div>
  );
}
