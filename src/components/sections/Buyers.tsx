"use client";

import { useState } from "react";
import { buyerCreditsNote, buyerFeatures } from "@/config/content";
import { imagery } from "@/config/site";
import { BuyerForm } from "../forms/BuyerForm";
import { ArchImage } from "../ui/ArchImage";
import { ArrowRight, Check } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";

export function Buyers() {
  const [open, setOpen] = useState(false);
  return (
    <section className="section section--tight" id="buy" aria-labelledby="buy-title">
      <div className="container">
        <Reveal className="buyers">
          <div className="buyers__media">
            <ArchImage src={imagery.buyers.src} alt={imagery.buyers.alt} variant="interior" caption />
          </div>
          <div className="buyers__body">
            <span className="eyebrow">For buyers · In development</span>
            <h2 id="buy-title" className="h2">
              Buying a home? There&apos;s a <span className="serif-italic">fairer way forward,</span> too.
            </h2>
            <p className="lede" style={{ fontSize: "1.05rem" }}>
              Fairward is developing an intelligent homebuying experience for self-directed buyers who value
              transparency, professional representation, and a more streamlined process.
            </p>
            <ul className="feature-list">
              {buyerFeatures.map((f) => (
                <li key={f}>
                  <Check />
                  {f}
                  {f.startsWith("Potential buyer credits") && <span aria-hidden="true">*</span>}
                </li>
              ))}
            </ul>
            <p className="field__hint">* {buyerCreditsNote}</p>

            {!open ? (
              <div>
                <button
                  type="button"
                  className="btn btn--navy"
                  aria-expanded={open}
                  aria-controls="buyer-form"
                  onClick={() => setOpen(true)}
                  data-cta="Join the Buyer Interest List"
                  data-cta-location="buyers"
                >
                  Join the Buyer Interest List <ArrowRight />
                </button>
              </div>
            ) : (
              <div className="buyer-form-panel" id="buyer-form">
                <BuyerForm />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
