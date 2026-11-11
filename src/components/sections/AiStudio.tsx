import { aiStudio, type PrepItem } from "@/config/content";
import { isPrelaunch } from "@/config/site";
import { Check, Layers, Person, Scale } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";

const callClass: Record<PrepItem["call"], string> = {
  "Do first": "studio-call--do",
  "Worth considering": "studio-call--maybe",
  Skip: "studio-call--skip",
};

/**
 * AI Prep & Marketing Studio: the update ROI advisor and the marketing tools,
 * shown as concept mockups with sample data, plus who does what.
 */
export function AiStudio() {
  const { prep, marketing, roles } = aiStudio;

  return (
    <section className="section section--white" id="ai-studio" aria-labelledby="studio-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">AI Prep &amp; Marketing Studio{isPrelaunch ? " · In development" : ""}</span>
          <h2 id="studio-title" className="h2">
            Put AI to work <span className="serif-italic">on your home&apos;s value.</span>
          </h2>
          <p className="lede">
            Decide which updates are worth making before you list, then present your home at its best. AI does the
            analysis and the drafting; you make the calls; a licensed professional reviews anything that affects your
            price or goes public.
          </p>
        </Reveal>

        <div className="studio-grid">
          {/* Prep & ROI Advisor */}
          <Reveal className="studio-tool">
            <div className="studio-tool__intro">
              <span className="studio-tool__icon" aria-hidden="true">
                <Scale size={22} />
              </span>
              <h3 className="h3">{prep.title}</h3>
              <p>{prep.body}</p>
            </div>

            <figure className="studio-mock" aria-label="Prep and ROI Advisor concept with sample data">
              <div className="studio-mock__bar">
                <span>Recommended updates</span>
                <span className="tag">Sample data</span>
              </div>
              <p className="studio-mock__source">{prep.source}</p>
              <table className="prep-table">
                <thead>
                  <tr>
                    <th scope="col">Update</th>
                    <th scope="col">Est. cost</th>
                    <th scope="col">Return potential</th>
                  </tr>
                </thead>
                <tbody>
                  {prep.items.map((it) => (
                    <tr key={it.item}>
                      <td>
                        <span className={`studio-call ${callClass[it.call]}`}>{it.call}</span>
                        <span className="prep-table__item">{it.item}</span>
                        <span className="prep-table__why">{it.why}</span>
                      </td>
                      <td className="prep-table__cost">{it.cost}</td>
                      <td>
                        <span className={`potential potential--${it.potential.toLowerCase()}`}>
                          <span aria-hidden="true" className="potential__bars">
                            <i />
                            <i />
                            <i />
                          </span>
                          {it.potential}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="studio-mock__review">
                <Person size={16} />
                <span>{prep.review}</span>
              </p>
            </figure>
          </Reveal>

          {/* Marketing Studio */}
          <Reveal className="studio-tool" delay={120}>
            <div className="studio-tool__intro">
              <span className="studio-tool__icon" aria-hidden="true">
                <Layers size={22} />
              </span>
              <h3 className="h3">{marketing.title}</h3>
              <p>{marketing.body}</p>
            </div>

            <figure className="studio-mock" aria-label="Marketing Studio concept with sample data">
              <div className="studio-mock__bar">
                <span>Your campaign</span>
                <span className="tag">Sample data</span>
              </div>

              <ol className="stages" aria-label="Approval steps">
                {marketing.stages.map((st, i) => (
                  <li
                    key={st}
                    className={i < marketing.currentStage ? "is-done" : i === marketing.currentStage ? "is-current" : ""}
                    aria-current={i === marketing.currentStage ? "step" : undefined}
                  >
                    <span className="stages__dot" aria-hidden="true">
                      {i < marketing.currentStage ? <Check size={11} /> : null}
                    </span>
                    {st}
                  </li>
                ))}
              </ol>

              <div className="draft-card">
                <p className="general-label">{marketing.draftLabel}</p>
                <p className="draft-card__text">{marketing.draft}</p>
                <ul className="draft-card__facts" aria-label="Verified facts used">
                  {marketing.facts.map((f) => (
                    <li key={f}>
                      <Check size={12} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="asset-grid">
                {marketing.assets.map((a) => (
                  <li key={a.label}>
                    <span className="asset-grid__label">{a.label}</span>
                    <span className="asset-grid__value">{a.value}</span>
                  </li>
                ))}
              </ul>
            </figure>
          </Reveal>
        </div>

        <ol className="studio-roles">
          {roles.map((r, i) => (
            <Reveal as="li" key={r.who} delay={i * 80}>
              <h3>{r.who}</h3>
              <p>{r.body}</p>
            </Reveal>
          ))}
        </ol>

        <p className="studio-note">
          Product concept shown with sample data. Cost estimates are not bids or appraisals, and no tool can promise a
          return on an update or a sale price.
        </p>
      </div>
    </section>
  );
}
