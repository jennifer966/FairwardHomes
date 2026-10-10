import { ArrowRight } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";

export function FinalCta() {
  return (
    <section className="section section--navy on-dark final-cta" aria-labelledby="final-title">
      <svg className="final-cta__lines" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1="0"
            x2="1200"
            y1={80 + i * 44}
            y2={80 + i * 44}
            stroke="rgba(245,243,237,0.06)"
            strokeWidth="1"
          />
        ))}
      </svg>
      <div className="container">
        <Reveal className="final-cta__inner">
          <span className="eyebrow">A Fairer Way Forward</span>
          <h2 id="final-title" className="display">
            Your next move starts with a <span className="serif-italic">smarter way forward.</span>
          </h2>
          <p className="lede">
            Discover what a more transparent, technology-driven approach to real estate could mean for you.
          </p>
          <div className="final-cta__actions">
            <a className="btn" href="#savings" data-cta="Calculate Your Savings" data-cta-location="final">
              Calculate Your Savings <ArrowRight />
            </a>
            <a className="btn btn--ghost-light" href="#get-started" data-cta="Request Early Access" data-cta-location="final">
              Request Early Access
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
