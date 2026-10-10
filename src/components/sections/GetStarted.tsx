import { SellerForm } from "../forms/SellerForm";
import { Reveal } from "../ui/Reveal";

const points = [
  { b: "A tailored overview", t: "How Fairward's proposed process could apply to your home and timeline." },
  { b: "A clear cost picture", t: "An outline of the listing fee and the other selling costs to plan for." },
  { b: "A real conversation", t: "Questions answered by our team, with no obligation to proceed." },
];

export function GetStarted() {
  return (
    <section className="section" id="get-started" aria-labelledby="get-started-title">
      <div className="container lead-wrap">
        <Reveal className="lead-aside">
          <span className="eyebrow">Get started</span>
          <h2 id="get-started-title" className="h2">
            Request your <span className="serif-italic">personalized selling plan.</span>
          </h2>
          <p className="lede">Share a few details about your home and goals. We&apos;ll follow up by email.</p>
          <ul className="lead-points">
            {points.map((p, i) => (
              <li key={p.b}>
                <span className="n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <b>{p.b}</b>
                  {p.t}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="form-card" delay={120}>
          <SellerForm />
        </Reveal>
      </div>
    </section>
  );
}
