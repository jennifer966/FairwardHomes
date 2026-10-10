import { broker, compliance } from "@/config/site";
import { techPillars } from "@/config/content";
import { Layers, Person, Scale } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";

const icons = [Layers, Person, Scale];

export function Expertise() {
  const hasBroker = Boolean(broker.name);
  return (
    <section className="section section--navy on-dark" id="expertise" aria-labelledby="expertise-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Professional expertise, modern technology</span>
          <h2 id="expertise-title" className="h2">
            Technology makes it simpler. <span className="serif-italic">Experience makes it stronger.</span>
          </h2>
          <p className="lede">
            Fairward is designed around a simple belief: buying or selling a home shouldn&apos;t require unnecessary
            complexity or expense. Intelligent technology can streamline the process, while licensed real estate
            professionals remain responsible for the work that calls for professional judgment.
          </p>
        </Reveal>

        <div className="pillars">
          {techPillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title} className="pillar" delay={i * 90}>
                <span className="pillar__icon">
                  <Icon />
                </span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="broker-slot" aria-label="Brokerage leadership">
          <div className="broker-photo">
            {broker.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={broker.photo} alt={broker.name ?? "Broker portrait"} loading="lazy" />
            ) : (
              <span>Broker portrait to be added</span>
            )}
          </div>
          <div className="broker-info">
            <span className="tag tag--dark">{hasBroker ? (broker.title ?? "Designated Broker") : "Brokerage leadership"}</span>
            {hasBroker ? (
              <>
                <h3 className="h3">{broker.name}</h3>
                {broker.bio && <p>{broker.bio}</p>}
                {broker.credentials.length > 0 && <p>{broker.credentials.join(" · ")}</p>}
                {compliance.responsibleBrokerDreNumber && <p>DRE #{compliance.responsibleBrokerDreNumber}</p>}
              </>
            ) : (
              <>
                <h3 className="h3">Meet the licensed professionals behind Fairward</h3>
                <p>
                  Broker biography, brokerage identity, and verified California DRE license information will be
                  published here prior to launch.
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
