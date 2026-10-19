import React, { useEffect, useRef } from "react";
import {
  X,
  FileCode,
  MapPin,
  Phone,
  Instagram,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { STUDIO_CONFIG } from "../config/studioConfig";

interface OwnerHandoverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerHandoverModal: React.FC<OwnerHandoverModalProps> = ({
  isOpen,
  onClose,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "Tab") {
        const modal = document.getElementById("owner-handover-dialog");
        if (!modal) return;

        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !modal.contains(document.activeElement))
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !modal.contains(document.activeElement))
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/85 p-3 backdrop-blur-md sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        id="owner-handover-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="owner-handover-title"
        aria-describedby="owner-handover-description"
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-[#111420] text-slate-200 shadow-2xl"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-800 bg-[#111420]/95 px-4 py-4 backdrop-blur sm:px-7 sm:py-5">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <FileCode aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>Studio Owner Handover Guide</span>
            </div>

            <h2
              id="owner-handover-title"
              className="text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl"
            >
              Welcome to Your New Khalifa Gaming Website
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
            aria-label="Close handover guide"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[calc(100dvh-11rem)] overflow-y-auto overscroll-contain px-4 py-5 sm:px-7 sm:py-6">
          <p
            id="owner-handover-description"
            className="text-sm leading-7 text-slate-300"
          >
            This website is organized so its branding, experiences, contact
            details, and image galleries can be updated through configuration
            and data files. Before launch, verify the production setup and
            connect any services that require a backend.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            {/* Configuration */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 sm:p-5">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300">
                  <FileCode aria-hidden="true" className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold leading-6 text-white">
                    1. Master Configuration File
                  </h3>
                  <code className="mt-2 block break-all rounded-md bg-slate-950 p-3 font-mono text-xs leading-5 text-purple-300">
                    src/config/studioConfig.ts
                  </code>
                </div>
              </div>

              <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                Contains the venue name, address, Google Maps link, operating
                hours, phone number, and social links. Check these values
                before publishing the website.
              </p>
            </div>

            {/* Photographs */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 sm:p-5">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold leading-6 text-white">
                    2. Custom Venue Photographs
                  </h3>
                  <code className="mt-2 block break-all rounded-md bg-slate-950 p-3 font-mono text-xs leading-5 text-purple-300">
                    src/data/gallery.ts
                    <br />
                    src/data/experiences.ts
                  </code>
                </div>
              </div>

              <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                When official studio photographs are ready, add the image
                files to{" "}
                <code className="break-all text-slate-300">
                  src/assets/images/
                </code>{" "}
                and update the relevant paths in the data files.
              </p>
            </div>

            {/* Enquiry Handling */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 sm:p-5">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-300">
                  <AlertCircle aria-hidden="true" className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold leading-6 text-white">
                    3. Enquiry Handling
                  </h3>
                  <code className="mt-2 block break-all rounded-md bg-slate-950 p-3 font-mono text-xs leading-5 text-purple-300">
                    src/components/ContactSection.tsx
                  </code>
                </div>
              </div>

              <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                The current enquiry form stores records in the visitor’s
                browser. To receive enquiries centrally, configure a backend
                or connect an email service or WhatsApp integration. Test the
                complete enquiry flow before launch.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 flex justify-end border-t border-slate-800 bg-[#111420]/95 px-4 py-4 backdrop-blur sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-purple-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 sm:w-auto"
          >
            Close Guide
          </button>
        </div>
      </section>
    </div>
  );
};
