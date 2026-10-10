import { steps } from "@/config/content";
import { Reveal } from "../ui/Reveal";

const roles: Record<string, string[]> = {
  "01": ["You", "Platform"],
  "02": ["You", "Platform", "Licensed review"],
  "03": ["You", "Platform", "Licensed support"],
  "04": ["Licensed professionals", "Platform"],
};

export function HowItWorks() {
  return (
    <section className="section" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How Fairward works</span>
          <h2 id="how-title" className="h2">
            A simpler way to <span className="serif-italic">sell your home.</span>
          </h2>
          <p className="lede">Technology handles the routine. Licensed professionals handle what requires experience and judgment.</p>
        </Reveal>

        <ol className="steps">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} className="step" delay={i * 90}>
              <span className="step__num" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="h3">
                <span className="sr-only">Step {Number(s.n)}: </span>
                {s.title}
              </h3>
              <p className="step__body">{s.body}</p>
              <div className="step__who" aria-label="Who's involved">
                {roles[s.n]?.map((r) => (
                  <span key={r} className={r.startsWith("Licensed") ? "tag tag--copper" : "tag"}>
                    {r}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="split-note">
          <div>
            <h3>What technology does</h3>
            <p>Organizes information, tracks tasks and deadlines, sends reminders, and keeps everyone on the same page.</p>
          </div>
          <div>
            <h3>What licensed professionals do</h3>
            <p>Provide representation, advice, review, negotiation, and the supervision required by California law.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
