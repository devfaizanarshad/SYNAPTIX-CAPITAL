"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import aboutImage from "../../assets/about-us.png";
import industrialImage from "../../assets/industrial.png";

const founderFocusItems = [
  {
    number: "01",
    title: "UK-Based Perspective",
    copy: "Grounded in local relationships with access to global innovation networks and institutional capital.",
    accent: "Local relationships, global context."
  },
  {
    number: "02",
    title: "PE and VC Experience",
    copy: "Investment judgment shaped by scaling companies, transactions, and long-term ownership realities.",
    accent: "Capital discipline with operator awareness."
  },
  {
    number: "03",
    title: "Frontier Technology Focus",
    copy: "Focused on AI, robotics, science-led businesses, and technical founders building durable value.",
    accent: "Advanced technology with real strategic depth."
  },
  {
    number: "04",
    title: "Shareholder Transition Advisory",
    copy: "Strategic support around succession, valuation, ownership change, and liquidity events.",
    accent: "Careful guidance where ownership decisions carry weight."
  }
];

type NarrativeSectionsProps = {
  betweenAboutAndFocus?: ReactNode;
};

export function NarrativeSections({ betweenAboutAndFocus }: NarrativeSectionsProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;

    if (!root) {
      return;
    }

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <section className="vision-editorial section-light" aria-labelledby="vision-title">
        <div className="container vision-editorial-grid">
          <div className="vision-copy narrative-reveal" data-reveal>
            <span className="vision-accent" aria-hidden="true" />
            <p className="section-kicker">Vision</p>
            <h2 id="vision-title">Backing the builders of tomorrow.</h2>
            <p>
              We believe the next generation of transformative businesses will emerge from the
              intersection of technology, science, and long-term thinking. Synaptix Capital exists
              to support those businesses with disciplined capital, strategic partnership, and
              thoughtful transition guidance.
            </p>
          </div>
          <div className="vision-orb narrative-reveal narrative-delay-1" data-reveal aria-hidden="true" />
        </div>
      </section>

      <section className="about-cinematic section-dark" id="about" aria-labelledby="about-title">
        <div className="container about-cinematic-grid">
          <div className="about-cinematic-copy narrative-reveal" data-reveal>
            <p className="section-kicker">About Us</p>
            <h2 id="about-title">
              A frontier technology investment firm built for strategic growth.
            </h2>
            <p>
              We partner with founder-led and innovation-driven businesses navigating growth,
              ownership transition, and long-term value creation.
            </p>
            <p className="about-cinematic-pull">
              Selective. Discreet. Built for ambitious technical businesses and the shareholders
              behind them.
            </p>
            <p>
              Our work spans investment, shareholder transition, and strategic advisory around the
              moments that shape the future of a company.
            </p>
            <div className="about-cinematic-metrics">
              <span>UK PE and VC Perspective</span>
              <span>Frontier Technology Focus</span>
              <span>Long-Term Strategic Advisory</span>
            </div>
          </div>

          <div className="about-cinematic-media narrative-reveal narrative-delay-1" data-reveal>
            <figure className="about-cinematic-image">
              <Image
                src={industrialImage}
                alt="Robotics and industrial automation environment"
                fill
                sizes="(max-width: 900px) 100vw, 54vw"
              />
            </figure>
            <aside className="about-cinematic-note narrative-reveal narrative-delay-2" data-reveal>
              <span>UK-Based</span>
              <strong>Private equity and venture capital judgment across AI, robotics, and science-led innovation.</strong>
            </aside>
          </div>
        </div>
      </section>

      {betweenAboutAndFocus}

      <section className="about-trust section-light" aria-labelledby="trust-title">
        <div className="container">
          <div className="about-trust-intro">
            <div className="about-trust-head narrative-reveal" data-reveal>
              <p className="section-kicker">Founder Focus</p>
              <h2 id="trust-title">
                Built to support
                <br />
                high-conviction
                <br />
                decisions.
              </h2>
              <p>
                We work best when judgment matters more than noise: growth inflection points,
                ownership decisions, transition planning, and strategic capital moments.
              </p>
            </div>
            <div className="about-trust-visual narrative-reveal narrative-delay-1" data-reveal>
              <figure className="about-trust-image">
                <Image
                  src={aboutImage}
                  alt="Synaptix Capital executive meeting room with skyline view"
                  fill
                  sizes="(max-width: 1120px) 100vw, 44vw"
                />
              </figure>
              <div className="about-trust-float">
                <span>Judgment Layer</span>
                <strong>Strategic advisory for capital, ownership, and long-range decisions.</strong>
              </div>
            </div>
          </div>

          <div className="about-trust-stack">
            {founderFocusItems.map((item, index) => (
              <article
                className={`about-trust-stack-card narrative-reveal narrative-delay-${Math.min(index + 1, 3)}`}
                data-reveal
                key={item.number}
                style={
                  {
                    "--stack-index": index,
                    "--stack-top": `${124 + index * 20}px`
                  } as CSSProperties
                }
              >
                <div className="about-trust-stack-line" aria-hidden="true" />
                <div className="about-trust-stack-number">{item.number}</div>
                <div className="about-trust-stack-body">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <span className="about-trust-stack-accent">{item.accent}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
