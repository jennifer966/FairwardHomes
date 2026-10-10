"use client";

import { useId, useState } from "react";
import { faqs } from "@/config/content";
import { track } from "@/lib/analytics";
import { Info } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";

export function Faq() {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    setOpen(next);
    if (next !== null) track("faq_interaction", { question: faqs[i].q.slice(0, 80) });
  };

  return (
    <section className="section section--white" id="faq" aria-labelledby="faq-title">
      <div className="container faq">
        <Reveal className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-title" className="h2">
            Questions, <span className="serif-italic">answered clearly.</span>
          </h2>
          <p className="lede">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a className="text-link" href="#get-started">
              Ask us directly.
            </a>
          </p>
        </Reveal>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${id}-q${i}`;
            const panelId = `${id}-a${i}`;
            return (
              <div className="faq-item" key={f.q}>
                <h3 style={{ margin: 0 }}>
                  <button
                    id={btnId}
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={`faq-a${isOpen ? " is-open" : ""}`}
                  inert={!isOpen}
                >
                  <div className="faq-a__inner">
                    <div className="faq-a__content">
                      {f.a.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      {f.pending && (
                        <span className="pending-note">
                          <Info size={14} /> Final service terms coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
