"use client";

import { useEffect, useRef, useState } from "react";

export type FounderPrinciple = {
  title: string;
  copy: string;
  signal: string;
};

type FoundersSectionProps = {
  items: FounderPrinciple[];
};

const trustSignals = [
  "Selective mandates, not volume-driven advisory",
  "UK-based perspective across capital and ownership decisions",
  "Operator and investor judgment for complex founder situations"
];

const trustMarks = ["Founder-led context", "Discreet process", "Long-term alignment"];

export function FoundersSection({ items }: FoundersSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`founders section-dark${visible ? " is-visible" : ""}`}
      aria-labelledby="founders-title"
    >
      <div className="container founders-shell">
        <div className="founders-hero">
          <div className="founders-intro founders-reveal">
            <div>
              <p className="section-kicker">Why Founders Work With Us</p>
              <h2 id="founders-title">Why founders trust us in high-stakes decisions.</h2>
            </div>
            <div className="founders-lead">
              <p>
                Founders and shareholders often need more than a transaction adviser. They need a
                calm partner who understands timing, ownership, discretion, and the human weight
                behind the decision.
              </p>
              <p>
                That is where we tend to be most useful: moments that require judgment, structure,
                and trust at the same time.
              </p>
            </div>
          </div>

          <aside className="founders-trust founders-reveal founders-delay-1" aria-label="Founder trust signals">
            <span className="founders-trust-label">Trust Signals</span>
            <strong>Built for high-conviction situations where judgment matters as much as execution.</strong>
            <div className="founders-trust-list">
              {trustSignals.map((signal) => (
                <div className="founders-trust-item" key={signal}>
                  {signal}
                </div>
              ))}
            </div>
            <div className="founders-trust-marks">
              {trustMarks.map((mark) => (
                <span key={mark}>{mark}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="founder-grid">
          {items.map((item, index) => (
            <article
              className={`founder-card founders-reveal founders-delay-${Math.min(index + 1, 3)}`}
              key={item.title}
            >
              <div className="founder-card-top">
                <span className="founder-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="founder-signal">{item.signal}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
