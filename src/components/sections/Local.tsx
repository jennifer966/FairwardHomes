import { localNotes } from "@/config/content";
import { isPrelaunch, localMarket } from "@/config/site";
import { Reveal } from "../ui/Reveal";

/** "Selling in Sacramento": local differences a seller's plan accounts for. */
export function Local() {
  return (
    <section className="section" id="sacramento" aria-labelledby="local-title">
      <div className="container">
        <div className="local__top">
          <Reveal className="section-head local__head">
            <span className="eyebrow">Starting in {localMarket.name}</span>
            <h2 id="local-title" className="h2">
              Selling here works <span className="serif-italic">a little differently.</span>
            </h2>
            <p className="lede">
              Fairward&apos;s pilot is planned for the {localMarket.name} region. A few local rules affect what you
              disclose and what you pay, so your plan accounts for them from the start.
            </p>
          </Reveal>

          <Reveal className="local__areas" delay={80}>
            <p className="general-label">{isPrelaunch ? "Proposed pilot area" : "Where we work"}</p>
            <ul>
              {localMarket.pilotAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            {isPrelaunch && <p className="local__areas-note">Service area will be confirmed at launch.</p>}
          </Reveal>
        </div>

        <ol className="local__notes">
          {localNotes.map((n, i) => (
            <Reveal as="li" className="local-note" key={n.title} delay={i * 90}>
              <span className="local-note__n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="h3">{n.title}</h3>
              <p>{n.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
