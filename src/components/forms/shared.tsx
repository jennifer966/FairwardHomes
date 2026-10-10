"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { leadCapture } from "@/config/site";
import { getAttribution } from "@/lib/attribution";
import { consentText } from "@/lib/leads/schema";
import { Check, Info } from "../ui/Icons";

export type FieldErrors = Record<string, string>;
export type SubmitState = "idle" | "submitting" | "success" | "error";

export function useLeadSubmit() {
  const startedAt = useRef<number>(Date.now());
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState<string>("");
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});

  const submit = useCallback(async (payload: Record<string, unknown>): Promise<boolean> => {
    setState("submitting");
    setMessage("");
    setServerErrors({});
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, startedAt: startedAt.current, attribution: getAttribution() }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: FieldErrors };
      if (res.ok && data.ok) {
        setState("success");
        return true;
      }
      setServerErrors(data.fieldErrors ?? {});
      setMessage(data.error ?? "Something went wrong. Please try again.");
      setState("error");
      return false;
    } catch {
      setMessage("We couldn't reach the server. Please check your connection and try again.");
      setState("error");
      return false;
    }
  }, []);

  return { state, message, serverErrors, submit };
}

export function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["f-field", className].filter(Boolean).join(" ")}>
      <label className="f-label" htmlFor={id}>
        {label} {optional && <span className="opt">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <span className="f-hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="f-error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

/** Hidden honeypot field. Real visitors never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="hp" aria-hidden="true">
      <label>
        Website
        <input tabIndex={-1} autoComplete="off" name="website" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function Consents({
  email,
  sms,
  onEmail,
  onSms,
  smsAvailable,
}: {
  email: boolean;
  sms?: boolean;
  onEmail: (v: boolean) => void;
  onSms?: (v: boolean) => void;
  smsAvailable?: boolean;
}) {
  return (
    <fieldset className="consents">
      <legend className="general-label">Optional communication preferences</legend>
      <label className="consent">
        <input type="checkbox" checked={email} onChange={(e) => onEmail(e.target.checked)} />
        <span>{consentText.email}</span>
      </label>
      {onSms && (
        <label className={`consent${smsAvailable ? "" : " is-disabled"}`}>
          <input
            type="checkbox"
            checked={Boolean(sms) && Boolean(smsAvailable)}
            disabled={!smsAvailable}
            onChange={(e) => onSms(e.target.checked)}
          />
          <span>
            {consentText.sms}
            {!smsAvailable && " (Add a phone number above to enable.)"}
          </span>
        </label>
      )}
    </fieldset>
  );
}

export function CaptureNotice() {
  if (leadCapture === "enabled") return null;
  if (leadCapture === "disabled") {
    return (
      <div className="form-alert form-alert--info" role="status">
        <Info />
        <span>We&apos;re not accepting inquiries just yet. This form will open once Fairward is ready to launch.</span>
      </div>
    );
  }
  return (
    <div className="form-alert form-alert--info" role="status">
      <Info />
      <span>Private preview: submissions are stored as internal test data only.</span>
    </div>
  );
}

export function SuccessPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="form-success" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
      <span className="form-success__icon">
        <Check size={22} />
      </span>
      <h3 className="h3">{title}</h3>
      <p className="lede" style={{ fontSize: "1rem" }}>
        {body}
      </p>
    </div>
  );
}

export function Spinner() {
  return <span className="spinner" aria-hidden="true" />;
}

export function zodErrors(issues: { path: PropertyKey[]; message: string }[]): FieldErrors {
  const out: FieldErrors = {};
  for (const i of issues) {
    const k = i.path.map(String).join(".");
    if (k && !out[k]) out[k] = i.message;
  }
  return out;
}
