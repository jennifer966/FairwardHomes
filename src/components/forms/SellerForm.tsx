"use client";

import { useEffect, useId, useRef, useState } from "react";
import { sellerInterests, sellerStatuses, sellerTimelines } from "@/config/content";
import { leadCapture } from "@/config/site";
import { sellerLeadSchema } from "@/lib/leads/schema";
import { track } from "@/lib/analytics";
import { ArrowRight, Info } from "../ui/Icons";
import { PREFILL_EVENT } from "../sections/SavingsCalculator";
import {
  CaptureNotice,
  Consents,
  describedBy,
  Field,
  Honeypot,
  Spinner,
  SuccessPanel,
  useLeadSubmit,
  zodErrors,
  type FieldErrors,
} from "./shared";

const stepOneSchema = sellerLeadSchema.pick({ fullName: true, email: true, zip: true });

type Values = {
  fullName: string;
  email: string;
  zip: string;
  propertyAddress: string;
  phone: string;
  estimatedValue: string;
  timeline: string;
  sellingStatus: string;
  interest: (typeof sellerInterests)[number];
  consentEmailMarketing: boolean;
  consentSms: boolean;
  website: string;
};

const initial: Values = {
  fullName: "",
  email: "",
  zip: "",
  propertyAddress: "",
  phone: "",
  estimatedValue: "",
  timeline: "",
  sellingStatus: "",
  interest: "Seller Plan",
  consentEmailMarketing: false,
  consentSms: false,
  website: "",
};

export function SellerForm() {
  const id = useId();
  const [step, setStep] = useState<1 | 2>(1);
  const [v, setV] = useState<Values>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const started = useRef(false);
  const stepTwoHeading = useRef<HTMLHeadingElement>(null);
  const { state, message, serverErrors, submit } = useLeadSubmit();
  const disabled = leadCapture === "disabled";

  const allErrors = { ...serverErrors, ...errors };

  const set = <K extends keyof Values>(k: K, value: Values[K]) => {
    setV((prev) => ({ ...prev, [k]: value }));
    if (errors[k as string]) setErrors(({ [k as string]: _, ...rest }) => rest);
    if (!started.current) {
      started.current = true;
      track("seller_form_started", {}, { once: true });
    }
  };

  // Prefill estimated value from the savings calculator CTA.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const value = (e as CustomEvent<{ estimatedValue?: number }>).detail?.estimatedValue;
      if (value && value > 0) {
        setV((prev) => (prev.estimatedValue ? prev : { ...prev, estimatedValue: `$${value.toLocaleString("en-US")}` }));
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (step === 2) stepTwoHeading.current?.focus();
  }, [step]);

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    const r = stepOneSchema.safeParse(v);
    if (!r.success) {
      setErrors(zodErrors(r.error.issues));
      return;
    }
    setErrors({});
    setStep(2);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...v, leadType: "seller" as const, source: "landing-seller-form" };
    const r = sellerLeadSchema.safeParse({ ...payload, startedAt: 0 });
    if (!r.success) {
      const errs = zodErrors(r.error.issues);
      setErrors(errs);
      if (errs.fullName || errs.email || errs.zip) setStep(1);
      return;
    }
    const ok = await submit(payload);
    if (ok) track("seller_form_submitted", { interest: v.interest, status: v.sellingStatus, timeline: v.timeline });
  };

  if (state === "success") {
    return (
      <SuccessPanel
        title="Thank you — we've received your request."
        body={
          leadCapture === "test"
            ? "This was saved as preview test data. In live operation, a member of the Fairward team would follow up by email about your personalized selling plan."
            : "We'll follow up by email about your personalized selling plan. You won't receive marketing messages unless you opted in."
        }
      />
    );
  }

  return (
    <div>
      <div className="form-steps" aria-hidden="true">
        <span>Step {step} of 2</span>
        <span className="form-steps__bar">
          <span style={{ width: step === 1 ? "50%" : "100%" }} />
        </span>
      </div>

      {step === 1 ? (
        <form onSubmit={next} noValidate className="form-grid" aria-labelledby={`${id}-h1`}>
          <h3 id={`${id}-h1`} className="h3">
            Start with the basics
          </h3>
          <CaptureNotice />
          <Field id={`${id}-name`} label="Full name" error={allErrors.fullName}>
            <input
              id={`${id}-name`}
              className="f-input"
              autoComplete="name"
              value={v.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              aria-invalid={Boolean(allErrors.fullName)}
              aria-describedby={describedBy(`${id}-name`, allErrors.fullName)}
              required
            />
          </Field>
          <div className="form-grid form-grid--2">
            <Field id={`${id}-email`} label="Email address" error={allErrors.email}>
              <input
                id={`${id}-email`}
                className="f-input"
                type="email"
                autoComplete="email"
                value={v.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={Boolean(allErrors.email)}
                aria-describedby={describedBy(`${id}-email`, allErrors.email)}
                required
              />
            </Field>
            <Field id={`${id}-zip`} label="Property ZIP code" error={allErrors.zip}>
              <input
                id={`${id}-zip`}
                className="f-input"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={10}
                value={v.zip}
                onChange={(e) => set("zip", e.target.value)}
                aria-invalid={Boolean(allErrors.zip)}
                aria-describedby={describedBy(`${id}-zip`, allErrors.zip)}
                required
              />
            </Field>
          </div>
          <div className="form-actions">
            <span className="form-legal">Takes about a minute. No obligation.</span>
            <button className="btn" type="submit" disabled={disabled}>
              Continue <ArrowRight />
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit} noValidate className="form-grid" aria-labelledby={`${id}-h2`}>
          <h3 id={`${id}-h2`} className="h3" tabIndex={-1} ref={stepTwoHeading}>
            Tell us about your home
          </h3>
          <Honeypot value={v.website} onChange={(val) => set("website", val)} />

          <Field id={`${id}-addr`} label="Property address" error={allErrors.propertyAddress}>
            <input
              id={`${id}-addr`}
              className="f-input"
              autoComplete="street-address"
              value={v.propertyAddress}
              onChange={(e) => set("propertyAddress", e.target.value)}
              aria-invalid={Boolean(allErrors.propertyAddress)}
              aria-describedby={describedBy(`${id}-addr`, allErrors.propertyAddress)}
              required
            />
          </Field>

          <div className="form-grid form-grid--2">
            <Field id={`${id}-timeline`} label="Expected selling timeline" error={allErrors.timeline}>
              <select
                id={`${id}-timeline`}
                className="f-select"
                value={v.timeline}
                onChange={(e) => set("timeline", e.target.value)}
                aria-invalid={Boolean(allErrors.timeline)}
                aria-describedby={describedBy(`${id}-timeline`, allErrors.timeline)}
                required
              >
                <option value="" disabled>
                  Select…
                </option>
                {sellerTimelines.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field id={`${id}-status`} label="Current selling status" error={allErrors.sellingStatus}>
              <select
                id={`${id}-status`}
                className="f-select"
                value={v.sellingStatus}
                onChange={(e) => set("sellingStatus", e.target.value)}
                aria-invalid={Boolean(allErrors.sellingStatus)}
                aria-describedby={describedBy(`${id}-status`, allErrors.sellingStatus)}
                required
              >
                <option value="" disabled>
                  Select…
                </option>
                {sellerStatuses.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          <fieldset>
            <legend className="f-label">I&apos;m interested in</legend>
            <div className="chips">
              {sellerInterests.map((opt) => (
                <label key={opt} className="chip">
                  <input
                    type="radio"
                    name={`${id}-interest`}
                    value={opt}
                    checked={v.interest === opt}
                    onChange={() => set("interest", opt)}
                  />
                  <span>{opt === "Seller Plan" ? "A personalized selling plan" : "A general consultation"}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="form-grid form-grid--2">
            <Field id={`${id}-value`} label="Estimated home value" optional error={allErrors.estimatedValue}>
              <input
                id={`${id}-value`}
                className="f-input"
                inputMode="numeric"
                placeholder="$"
                value={v.estimatedValue}
                onChange={(e) => set("estimatedValue", e.target.value)}
              />
            </Field>
            <Field
              id={`${id}-phone`}
              label="Phone number"
              optional
              error={allErrors.phone}
              hint="Only used to respond to your request."
            >
              <input
                id={`${id}-phone`}
                className="f-input"
                type="tel"
                autoComplete="tel"
                value={v.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={Boolean(allErrors.phone)}
                aria-describedby={describedBy(`${id}-phone`, allErrors.phone, "Only used to respond to your request.")}
              />
            </Field>
          </div>

          <Consents
            email={v.consentEmailMarketing}
            sms={v.consentSms}
            onEmail={(b) => set("consentEmailMarketing", b)}
            onSms={(b) => set("consentSms", b)}
            smsAvailable={v.phone.trim().length >= 7}
          />

          {state === "error" && (
            <div className="form-alert form-alert--error" role="alert">
              <Info />
              <span>{message}</span>
            </div>
          )}

          <p className="form-legal">
            By submitting, you agree that Fairward may contact you about this request. See our{" "}
            <a className="text-link" href="/privacy">
              Privacy Policy
            </a>
            . Submitting this form does not create an agency relationship or brokerage agreement.
          </p>

          <div className="form-actions">
            <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn" type="submit" disabled={disabled || state === "submitting"}>
              {state === "submitting" ? (
                <>
                  <Spinner /> Sending…
                </>
              ) : (
                <>
                  Get My Selling Plan <ArrowRight />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
