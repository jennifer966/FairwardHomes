"use client";

import { useId, useRef, useState } from "react";
import { buyerRanges, buyerTimelines } from "@/config/content";
import { leadCapture } from "@/config/site";
import { buyerLeadSchema } from "@/lib/leads/schema";
import { track } from "@/lib/analytics";
import { ArrowRight, Info } from "../ui/Icons";
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

export function BuyerForm() {
  const id = useId();
  const [v, setV] = useState({
    fullName: "",
    email: "",
    preferredArea: "",
    purchaseRange: "",
    timeline: "",
    consentEmailMarketing: false,
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const { state, message, serverErrors, submit } = useLeadSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const allErrors = { ...serverErrors, ...errors };
  const disabled = leadCapture === "disabled";

  const set = <K extends keyof typeof v>(k: K, value: (typeof v)[K]) => {
    setV((p) => ({ ...p, [k]: value }));
    if (errors[k as string]) setErrors(({ [k as string]: _, ...rest }) => rest);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...v, leadType: "buyer" as const, source: "landing-buyer-form" };
    const r = buyerLeadSchema.safeParse({ ...payload, startedAt: 0 });
    if (!r.success) {
      setErrors(zodErrors(r.error.issues));
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    const ok = await submit(payload);
    if (ok) track("buyer_form_submitted", { timeline: v.timeline });
  };

  if (state === "success") {
    return (
      <SuccessPanel
        title="You're on the buyer interest list."
        body={
          leadCapture === "test"
            ? "Saved as preview test data. In live operation, you'd hear from us when Fairward's buyer experience is ready in your area."
            : "We'll be in touch when Fairward's buyer experience is ready in your area."
        }
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form-grid" aria-label="Buyer interest list">
      <CaptureNotice />
      <Honeypot value={v.website} onChange={(val) => set("website", val)} />
      <div className="form-grid form-grid--2">
        <Field id={`${id}-name`} label="Name" error={allErrors.fullName}>
          <input
            id={`${id}-name`}
            className="f-input"
            autoComplete="name"
            value={v.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            aria-invalid={Boolean(allErrors.fullName)}
            aria-describedby={describedBy(`${id}-name`, allErrors.fullName)}
          />
        </Field>
        <Field id={`${id}-email`} label="Email" error={allErrors.email}>
          <input
            id={`${id}-email`}
            className="f-input"
            type="email"
            autoComplete="email"
            value={v.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(allErrors.email)}
            aria-describedby={describedBy(`${id}-email`, allErrors.email)}
          />
        </Field>
        <Field id={`${id}-area`} label="Preferred area" error={allErrors.preferredArea} hint="City, neighborhood, or ZIP">
          <input
            id={`${id}-area`}
            className="f-input"
            value={v.preferredArea}
            onChange={(e) => set("preferredArea", e.target.value)}
            aria-invalid={Boolean(allErrors.preferredArea)}
            aria-describedby={describedBy(`${id}-area`, allErrors.preferredArea, "City, neighborhood, or ZIP")}
          />
        </Field>
        <Field id={`${id}-timeline`} label="Buying timeline" error={allErrors.timeline}>
          <select
            id={`${id}-timeline`}
            className="f-select"
            value={v.timeline}
            onChange={(e) => set("timeline", e.target.value)}
            aria-invalid={Boolean(allErrors.timeline)}
            aria-describedby={describedBy(`${id}-timeline`, allErrors.timeline)}
          >
            <option value="" disabled>
              Select…
            </option>
            {buyerTimelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field id={`${id}-range`} label="Estimated purchase range" optional className="span-2">
          <select
            id={`${id}-range`}
            className="f-select"
            value={v.purchaseRange}
            onChange={(e) => set("purchaseRange", e.target.value)}
          >
            <option value="">Prefer not to say</option>
            {buyerRanges.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Consents email={v.consentEmailMarketing} onEmail={(b) => set("consentEmailMarketing", b)} />

      {state === "error" && (
        <div className="form-alert form-alert--error" role="alert">
          <Info />
          <span>{message}</span>
        </div>
      )}

      <div className="form-actions">
        <p className="form-legal">
          See our{" "}
          <a className="text-link" href="/privacy">
            Privacy Policy
          </a>
          . Joining does not create an agency relationship.
        </p>
        <button className="btn btn--navy" type="submit" disabled={disabled || state === "submitting"}>
          {state === "submitting" ? (
            <>
              <Spinner /> Sending…
            </>
          ) : (
            <>
              Join the Buyer Interest List <ArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
