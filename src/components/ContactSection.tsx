import React, { useEffect, useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MapPin,
  Clock,
} from "lucide-react";
import { STUDIO_CONFIG } from "../config/studioConfig";

interface ContactSectionProps {
  preselectedExperience?: string;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  enquiryType: string;
  visitDate: string;
  groupSize: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  enquiryType?: string;
  visitDate?: string;
  form?: string;
}

interface SubmissionRecord {
  referenceId: string;
  submittedAt: string;
  details: FormState;
}

const DEFAULT_EXPERIENCE = "General Visit & Walk-in";

const INITIAL_FORM: FormState = {
  fullName: "",
  phone: "",
  email: "",
  enquiryType: DEFAULT_EXPERIENCE,
  visitDate: "",
  groupSize: "1-2 Players",
  message: "",
};

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedExperience = DEFAULT_EXPERIENCE,
}) => {
  const [formData, setFormData] = useState<FormState>({
    ...INITIAL_FORM,
    enquiryType: preselectedExperience || DEFAULT_EXPERIENCE,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] =
    useState<SubmissionRecord | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [copyError, setCopyError] = useState("");

  useEffect(() => {
    if (preselectedExperience) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: preselectedExperience,
      }));
    }
  }, [preselectedExperience]);

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
      form: undefined,
    }));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Please enter your name.";
    } else if (formData.fullName.trim().length < 2) {
      nextErrors.fullName = "Name must contain at least 2 characters.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (
      phoneDigits.length < 10 ||
      phoneDigits.length > 15
    ) {
      nextErrors.phone =
        "Enter a valid phone number containing 10–15 digits.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.enquiryType.trim()) {
      nextErrors.enquiryType = "Please select an experience.";
    }

    if (formData.visitDate) {
      const selectedDate = new Date(`${formData.visitDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (
        Number.isNaN(selectedDate.getTime()) ||
        selectedDate < today
      ) {
        nextErrors.visitDate = "Please select today or a future date.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Local browser storage only; this is not a server submission.
      const record: SubmissionRecord = {
        referenceId: `KG-${Date.now().toString().slice(-8)}`,
        submittedAt: new Date().toISOString(),
        details: {
          ...formData,
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      };

      try {
        const existing = localStorage.getItem("khalifa_enquiries");
        const parsed: unknown = existing ? JSON.parse(existing) : [];
        const records = Array.isArray(parsed) ? parsed : [];

        records.push(record);
        localStorage.setItem(
          "khalifa_enquiries",
          JSON.stringify(records),
        );
      } catch {
        // Storage may be unavailable in private browsing or restricted contexts.
        // Still show the locally generated receipt, without claiming server delivery.
      }

      setSubmissionSuccess(record);
      setCopiedTicket(false);
      setCopyError("");
    } catch {
      setErrors({
        form: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = async () => {
    if (!submissionSuccess) return;

    const details = submissionSuccess.details;
    const ticketSummary = [
      "Khalifa Gaming Studio Enquiry",
      `Reference ID: ${submissionSuccess.referenceId}`,
      `Name: ${details.fullName}`,
      `Experience: ${details.enquiryType}`,
      `Group: ${details.groupSize}`,
      `Date: ${details.visitDate || "Flexible"}`,
      `Phone: ${details.phone}`,
      `Email: ${details.email}`,
      `Message: ${details.message || "None"}`,
    ].join("\n");

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(ticketSummary);
      setCopiedTicket(true);
      setCopyError("");

      window.setTimeout(() => setCopiedTicket(false), 2500);
    } catch {
      setCopyError(
        "Clipboard access is unavailable. You can copy the reference ID manually.",
      );
    }
  };

  const resetForm = () => {
    setSubmissionSuccess(null);
    setFormData({
      ...INITIAL_FORM,
      enquiryType: preselectedExperience || DEFAULT_EXPERIENCE,
    });
    setErrors({});
    setCopiedTicket(false);
    setCopyError("");
  };

  const inputClass = (hasError = false) =>
    `min-h-11 w-full min-w-0 rounded-md border bg-slate-900 px-3.5 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 sm:px-4 ${
      hasError
        ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30"
        : "border-slate-800 focus:border-purple-500 focus:ring-purple-500/30"
    }`;

  const FieldError = ({ children }: { children: React.ReactNode }) => (
    <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-5 text-rose-400">
      <AlertCircle
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
        aria-hidden="true"
      />
      <span>{children}</span>
    </p>
  );

  return (
    <section
      id="contact"
      className="relative border-t border-slate-900 bg-[#08090e] py-14 sm:py-18 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Contact information */}
          <div className="min-w-0 lg:col-span-5">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-purple-400 sm:text-xs sm:tracking-widest">
              <span>Direct Enquiries</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Reserve Stations</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              GET IN TOUCH.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Have questions about hardware specs, snooker table
              availability, private party bookings, or esports scrims?
              Send us an enquiry.
            </p>

            <div className="mt-7 space-y-4 sm:mt-8">
              <div className="rounded-lg border border-slate-800 bg-[#111420] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-purple-400"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-[11px]">
                      Studio Location
                    </span>
                    <span className="mt-1 block break-words text-sm font-semibold leading-6 text-slate-200">
                      {STUDIO_CONFIG.city}, {STUDIO_CONFIG.state},{" "}
                      {STUDIO_CONFIG.country}
                    </span>
                    <span className="mt-1 block break-words text-xs leading-5 text-slate-400 [overflow-wrap:anywhere]">
                      {STUDIO_CONFIG.addressDisplay}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-800 bg-[#111420] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-[11px]">
                      Operating Schedule
                    </span>
                    <span className="mt-1 block break-words text-sm font-semibold leading-6 text-slate-200">
                      {STUDIO_CONFIG.operatingHours.displayHours}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-cyan-400">
                      Walk-ins and advance enquiries
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-800/80 pt-5 sm:pt-6">
              <span className="mb-2 block text-xs text-slate-400">
                Need immediate assistance?
              </span>
              <a
                href={`mailto:${STUDIO_CONFIG.email.address}?subject=${encodeURIComponent(
                  "Khalifa Gaming Studio Session Enquiry",
                )}`}
                className="break-words text-xs font-semibold leading-6 text-purple-400 underline underline-offset-4 transition-colors hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400 [overflow-wrap:anywhere]"
              >
                Send Direct Email ({STUDIO_CONFIG.email.address})
              </a>
            </div>
          </div>

          {/* Form or receipt */}
          <div className="min-w-0 lg:col-span-7">
            {submissionSuccess ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-purple-500/40 bg-[#121520] p-4 shadow-2xl sm:p-6 lg:p-8"
              >
                <div className="mb-4 flex items-start gap-3 text-emerald-400">
                  <CheckCircle2
                    className="mt-0.5 h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-base font-bold leading-6 text-white sm:text-lg">
                      Enquiry Form Completed
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      A local reference slip has been created. This does not
                      confirm that the studio has received your enquiry.
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-6 text-slate-300">
                  Thank you,{" "}
                  <strong className="break-words text-white">
                    {submissionSuccess.details.fullName}
                  </strong>
                  .
                </p>

                <div className="mt-5 space-y-3 rounded-lg border border-slate-800 bg-slate-900/90 p-4 font-mono text-xs sm:p-5">
                  <div className="flex flex-col gap-1 border-b border-slate-800 pb-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
                    <span className="text-slate-400">Reference ID</span>
                    <span className="break-all font-bold text-purple-400">
                      {submissionSuccess.referenceId}
                    </span>
                  </div>

                  {[
                    ["Selected Experience", submissionSuccess.details.enquiryType],
                    ["Party Size", submissionSuccess.details.groupSize],
                    ["Preferred Date", submissionSuccess.details.visitDate || "Flexible"],
                    ["Contact Phone", submissionSuccess.details.phone],
                    ["Email", submissionSuccess.details.email],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between"
                    >
                      <span className="text-slate-400">{label}</span>
                      <span className="break-words text-slate-200 min-[420px]:max-w-[60%] min-[420px]:text-right [overflow-wrap:anywhere]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={handleCopyTicket}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-800 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-200 transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 sm:w-auto"
                  >
                    {copiedTicket ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Booking Slip
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-md px-4 py-3 text-xs font-semibold uppercase tracking-wider text-purple-400 transition-colors hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 sm:w-auto"
                  >
                    Submit Another Enquiry
                  </button>
                </div>

                {copyError && (
                  <p className="mt-3 text-xs leading-5 text-amber-300">
                    {copyError}
                  </p>
                )}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 rounded-xl border border-slate-800 bg-[#121520] p-4 shadow-2xl sm:p-6 lg:p-8"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label
                      htmlFor="fullName"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Your Full Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      maxLength={100}
                      required
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      className={inputClass(Boolean(errors.fullName))}
                    />
                    {errors.fullName && (
                      <div id="fullName-error">
                        <FieldError>{errors.fullName}</FieldError>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Phone / WhatsApp <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={20}
                      required
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={inputClass(Boolean(errors.phone))}
                    />
                    {errors.phone && (
                      <div id="phone-error">
                        <FieldError>{errors.phone}</FieldError>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Email Address <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      maxLength={254}
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={inputClass(Boolean(errors.email))}
                    />
                    {errors.email && (
                      <div id="email-error">
                        <FieldError>{errors.email}</FieldError>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="enquiryType"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Experience <span className="text-purple-400">*</span>
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      required
                      value={formData.enquiryType}
                      onChange={(e) => updateField("enquiryType", e.target.value)}
                      aria-invalid={Boolean(errors.enquiryType)}
                      className={inputClass(Boolean(errors.enquiryType))}
                    >
                      <option value="General Visit & Walk-in">General Visit &amp; Walk-in</option>
                      <option value="Pro Racing Simulators">Pro Racing Simulators</option>
                      <option value="Virtual Reality Arena">Virtual Reality Arena</option>
                      <option value="Tournament Snooker & Pool">Tournament Snooker &amp; Pool</option>
                      <option value="Food Court & Lounge Dining">Food Court &amp; Lounge Dining</option>
                      <option value="Esports PC Battlestations">Esports PC Battlestations</option>
                      <option value="Next-Gen Console Suites">Next-Gen Console Suites</option>
                      <option value="Group / Birthday Event">Private Group / Birthday Event</option>
                    </select>
                    {errors.enquiryType && (
                      <FieldError>{errors.enquiryType}</FieldError>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label
                      htmlFor="visitDate"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Target Visit Date (Optional)
                    </label>
                    <input
                      type="date"
                      id="visitDate"
                      name="visitDate"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={formData.visitDate}
                      onChange={(e) => updateField("visitDate", e.target.value)}
                      aria-invalid={Boolean(errors.visitDate)}
                      aria-describedby={errors.visitDate ? "visitDate-error" : undefined}
                      className={`${inputClass(Boolean(errors.visitDate))} [color-scheme:dark]`}
                    />
                    {errors.visitDate && (
                      <div id="visitDate-error">
                        <FieldError>{errors.visitDate}</FieldError>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="groupSize"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Estimated Party Size
                    </label>
                    <select
                      id="groupSize"
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={(e) => updateField("groupSize", e.target.value)}
                      className={inputClass()}
                    >
                      <option value="1-2 Players">1–2 Players</option>
                      <option value="3-5 Players">3–5 Players (Small Squad)</option>
                      <option value="6-10 Players">6–10 Players (Clan / Group)</option>
                      <option value="10+ Players">10+ Players (Full Party Booking)</option>
                    </select>
                  </div>
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300"
                  >
                    Specific Requests / Notes (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={1500}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder="Tell us if you want back-to-back sim stints, specific game titles, or table-side café seating..."
                    className={`${inputClass()} resize-y`}
                  />
                  <p className="mt-1 text-right text-[10px] text-slate-500">
                    {formData.message.length}/1500
                  </p>
                </div>

                {errors.form && (
                  <div role="alert">
                    <FieldError>{errors.form}</FieldError>
                  </div>
                )}

                <div className="border-t border-slate-800 pt-4 sm:pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-purple-600/30 transition-colors hover:bg-purple-500 active:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                          aria-hidden="true"
                        />
                        <span>Preparing Enquiry Slip...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Session Enquiry</span>
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                    This form currently creates a reference slip in your
                    browser. It does not send an email or notify the studio.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
