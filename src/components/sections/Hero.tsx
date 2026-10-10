import { HeroDashboard } from "./HeroDashboard";
import { ArrowRight, Shield } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";

export function Hero() {
  return (
    <section className="hero" id="sell" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <Reveal className="hero__copy">
          <span className="eyebrow">A Fairer Way Forward</span>
          <h1 id="hero-title" className="hero__title">
            Sell smarter.
            <br />
            <em>Keep more.</em>
          </h1>
          <p className="lede">
            Meet a new approach to real estate. Fairward combines intelligent technology, transparent pricing, and
            licensed professional guidance to make selling your home simpler and more affordable.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#savings" data-cta="Calculate Your Savings" data-cta-location="hero">
              Calculate Your Savings <ArrowRight />
            </a>
            <a className="btn btn--ghost" href="#how-it-works" data-cta="See How Fairward Works" data-cta-location="hero">
              See How Fairward Works
            </a>
          </div>
          <p className="hero__trust">
            <Shield />
            <span>Designed for California homeowners. Built around real brokerage expertise.</span>
          </p>
        </Reveal>
        <Reveal delay={150}>
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  );
}
