import { type StaticImageData } from "next/image";

export type TechnologyItem = {
  number: string;
  title: string;
  copy: string;
  focus: string[];
  image: StaticImageData;
};

type TechnologySectionProps = {
  items: TechnologyItem[];
};

export function TechnologySection({ items }: TechnologySectionProps) {
  return (
    <section className="invest section-light" id="invest" aria-labelledby="invest-title">
      <div className="container invest-shell">
        <div className="invest-head">
          <div className="invest-copy">
            <p className="section-kicker">Frontier Technologies We Back</p>
            <h2 id="invest-title">Focused technology markets where capital and conviction matter.</h2>
            <p>
              We focus on advanced markets where technical capability, commercial timing, and
              ownership decisions intersect. The goal is not broad coverage, but deeper conviction
              in categories where real value can compound.
            </p>
          </div>
          <div className="invest-meta">
            <span>Six priority areas</span>
            <p>
              Selected for technical depth, strategic relevance, and long-term value creation.
            </p>
          </div>
        </div>

        <div className="invest-ledger" aria-label="Technology focus areas">
          {items.map((item) => (
            <article className="invest-item" key={item.title}>
              <div className="invest-item-head">
                <span>{item.number}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.copy}</p>
              <div className="invest-item-focus">
                {item.focus.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
