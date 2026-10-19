import React from "react";
import { Gauge, Shield, Cpu, Zap, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

interface ImmersiveFeatureProps {
  onReserve: () => void;
}

export const ImmersiveFeature: React.FC<ImmersiveFeatureProps> = ({
  onReserve,
}) => {
  return (
    <section
      id="immersive"
      className="relative overflow-hidden border-y border-slate-900 bg-[#08090e] py-16 sm:py-20 lg:py-24"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-900/10 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-blue-900/10 blur-3xl sm:h-96 sm:w-96"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Simulator image */}
          <div className="relative min-w-0 lg:col-span-7">
            <div className="group relative overflow-hidden rounded-xl border border-slate-800 shadow-2xl shadow-purple-950/20 sm:rounded-2xl">
              <div className="h-64 w-full sm:h-80 md:h-[420px] lg:h-[460px]">
                <ImageWithFallback
                  src="/src/assets/images/racing_simulator_rig_1792425595538.jpg"
                  alt="Sim racing cockpit and racing simulator setup at the gaming lounge"
                  className="h-full w-full object-cover object-center"
                  fallbackTitle="Khalifa Sim Racing Rig"
                />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090e] via-transparent to-transparent opacity-80"
              />

              {/* Telemetry panel */}
              <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2 rounded-lg border border-slate-700/80 bg-[#0e111a]/95 p-3 backdrop-blur-md min-[420px]:inset-x-4 min-[420px]:bottom-4 sm:inset-x-5 sm:bottom-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
                <div className="min-w-0">
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-purple-400 sm:text-[11px]">
                    Cockpit Telemetry
                  </span>
                  <span className="block text-xs font-bold leading-relaxed text-white sm:text-sm">
                    Direct-Drive High-Torque Force Feedback
                  </span>
                </div>

                <span className="shrink-0 text-[10px] font-medium text-cyan-400 sm:text-xs">
                  100% Zero-Latency
                </span>
              </div>
            </div>
          </div>

          {/* Feature content */}
          <div className="min-w-0 lg:col-span-5">
            <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-widest text-cyan-400 sm:text-xs">
              <span>Precision Motorsport</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span>Kanpur Flagship Setup</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
              FEEL EVERY APEX. MASTER EVERY APEX.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 [text-wrap:pretty] sm:mt-5 sm:text-base">
              We designed our simulator pods for true driving enthusiasts.
              Forget plastic toy wheels—experience high-resistance force
              feedback motors that transmit genuine road camber, curb strikes,
              and tire slip angles directly into your hands.
            </p>

            {/* Feature cards */}
            <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-8 sm:gap-4">
              <div className="min-w-0 rounded-lg border border-slate-800/80 bg-[#111420] p-4">
                <div className="mb-2 flex items-center gap-2 text-purple-400">
                  <Gauge className="h-4 w-4 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Torque Response
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Direct motor-to-wheel shaft connection for instantaneous road
                  feel without belt dampenings.
                </p>
              </div>

              <div className="min-w-0 rounded-lg border border-slate-800/80 bg-[#111420] p-4">
                <div className="mb-2 flex items-center gap-2 text-cyan-400">
                  <Shield className="h-4 w-4 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Rigid Cockpit
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Reinforced aluminum extrusion chassis with zero flex under
                  extreme braking loads.
                </p>
              </div>

              <div className="min-w-0 rounded-lg border border-slate-800/80 bg-[#111420] p-4">
                <div className="mb-2 flex items-center gap-2 text-blue-400">
                  <Cpu className="h-4 w-4 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Surround Field
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Curved panoramic visual field providing uninterrupted
                  peripheral apex spotting.
                </p>
              </div>

              <div className="min-w-0 rounded-lg border border-slate-800/80 bg-[#111420] p-4">
                <div className="mb-2 flex items-center gap-2 text-violet-400">
                  <Zap className="h-4 w-4 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Telemetry Tracking
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Sector-by-sector time logs to compare hot-laps with your group
                  and local lap records.
                </p>
              </div>
            </div>

            {/* Booking action */}
            <div className="mt-6 flex flex-col items-stretch gap-3 border-t border-slate-800/80 pt-6 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={onReserve}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-600/20 transition-colors hover:bg-purple-500 active:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090e] sm:w-auto sm:px-6"
              >
                <span>Book a Simulator Slot</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </button>

              <span className="text-center text-xs leading-relaxed text-slate-400 sm:text-left">
                Solo stints or 1v1 split battles
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
