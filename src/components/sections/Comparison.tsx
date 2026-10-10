import { comparison, comparisonNote, type ComparisonCell } from "@/config/content";
import { Check } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { Wordmark } from "../ui/Wordmark";

const levelLabel = { strong: "Included or typical", partial: "Varies or partial", limited: "Limited or not included" };

function Level({ level }: { level: ComparisonCell["level"] }) {
  return (
    <span className={`level level--${level}`} title={levelLabel[level]}>
      {level === "strong" && <Check size={11} />}
      <span className="sr-only">{levelLabel[level]}: </span>
    </span>
  );
}

export function Comparison() {
  const [fsbo, trad, fairward] = comparison.columns;
  return (
    <section className="section section--white" id="compare" aria-labelledby="compare-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Ways to sell</span>
          <h2 id="compare-title" className="h2">
            More control. <span className="serif-italic">Less unnecessary expense.</span>
          </h2>
          <p className="lede">
            Every approach has trade-offs. Here&apos;s how Fairward is designed to compare in general terms.
          </p>
        </Reveal>

        <Reveal className="compare compare-desktop">
          <table>
            <caption className="sr-only">General comparison of For Sale By Owner, traditional brokerage, and Fairward</caption>
            <thead>
              <tr>
                <th scope="col">Criteria</th>
                <th scope="col">{fsbo}</th>
                <th scope="col">{trad}</th>
                <th scope="col" className="is-fairward">
                  <Wordmark href={null} />
                  <span className="sr-only">{fairward}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.criterion}>
                  <th scope="row">{row.criterion}</th>
                  {row.cells.map((c, i) => (
                    <td key={i} className={i === 2 ? "is-fairward" : undefined}>
                      <span className="cell">
                        <Level level={c.level} />
                        <span>{c.text}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <div className="compare-cards">
          {comparison.columns.map((col, ci) => (
            <Reveal key={col} className={`compare-card${ci === 2 ? " is-fairward" : ""}`}>
              <h3 className="h3">{ci === 2 ? <Wordmark href={null} /> : col}</h3>
              <dl>
                {comparison.rows.map((row) => (
                  <div key={row.criterion}>
                    <dt>{row.criterion}</dt>
                    <dd className="cell">
                      <Level level={row.cells[ci].level} />
                      <span>{row.cells[ci].text}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <div className="legend" aria-hidden="true">
          <span>
            <span className="level level--strong">
              <Check size={11} />
            </span>
            Included or typical
          </span>
          <span>
            <span className="level level--partial" /> Varies or partial
          </span>
          <span>
            <span className="level level--limited" /> Limited or not included
          </span>
        </div>
        <p className="fine-print">{comparisonNote}</p>
      </div>
    </section>
  );
}
