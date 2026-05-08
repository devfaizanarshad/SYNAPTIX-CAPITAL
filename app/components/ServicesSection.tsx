export type ServiceItem = {
  mark: string;
  title: string;
  copy: string;
  summary: string;
  points: string[];
};

type ServicesSectionProps = {
  items: ServiceItem[];
};

export function ServicesSection({ items }: ServicesSectionProps) {
  return (
    <section className="services section-light" id="services" aria-labelledby="services-title">
      <div className="container services-shell">
        <div className="services-intro">
          <div className="services-intro-copy">
            <p className="section-kicker">Core Services</p>
            <h2 id="services-title">Integrated support across capital, strategy, and ownership transition.</h2>
            <p>
              The firm is structured around a small number of high-value mandates. Rather than
              separating capital, advisory, and shareholder work into disconnected silos, we align
              them around the decision in front of the client.
            </p>
          </div>

          <div className="services-intro-meta" aria-label="Service section highlights">
            <span>Selective mandates</span>
            <strong>Capital, advisory, transition, and transaction support brought into one decision framework.</strong>
          </div>
        </div>

        <div className="services-editorial">
          {items.map((item, index) => (
            <article className="service-strip" key={item.title}>
              <div className="service-strip-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.mark}</strong>
              </div>
              <div className="service-strip-copy">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <div className="service-strip-points">
                {item.points.slice(0, 2).map((point) => (
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
