import Image, { type StaticImageData } from "next/image";
import heroImage from "../assets/Hero-Section.png";
import aboutImage from "../assets/about-us.png";
import technologyImage from "../assets/technology.png";
import healthcareImage from "../assets/health care.png";
import industrialImage from "../assets/industrial.png";
import consumerImage from "../assets/consumer.png";
import approachImage from "../assets/Our Approch.png";
import logoImage from "../assets/logo.png";
import { PositioningSection } from "./components/PositioningSection";
import { NarrativeSections } from "./components/NarrativeSections";
import { ServicesSection, type ServiceItem } from "./components/ServicesSection";
import { TechnologySection, type TechnologyItem } from "./components/TechnologySection";
import { HeroAtmosphere } from "./components/HeroAtmosphere";
import { SiteMotion } from "./components/SiteMotion";
import { RetirementExitSection } from "./components/RetirementExitSection";

type ImageCard = {
  eyebrow: string;
  title: string;
  copy: string;
  image: StaticImageData;
};

const services: ServiceItem[] = [
  {
    mark: "INV",
    title: "Frontier Capital",
    summary: "Long-term capital for advanced technology businesses at meaningful inflection points.",
    copy:
      "We back advanced technology businesses with disciplined capital and a long-term lens, focusing on moments where innovation, execution, and market timing matter most.",
    points: [
      "Growth capital aligned with long-horizon value creation",
      "Selective partnership around timing, structure, and scale",
      "Conviction-led support for technically differentiated businesses"
    ]
  },
  {
    mark: "ADV",
    title: "Strategic Advisory",
    summary: "Board-level support on capital strategy, partner dialogue, and transaction planning.",
    copy:
      "We support boards, founders, and shareholders on capital strategy, positioning, partner dialogue, and transaction planning across complex growth and transition scenarios.",
    points: [
      "Capital strategy and readiness planning",
      "Strategic positioning for investors, partners, and acquirers",
      "Calm process leadership during high-stakes decisions"
    ]
  },
  {
    mark: "TRN",
    title: "Shareholder Transition",
    summary: "Succession, retirement, and ownership change handled with discretion and structure.",
    copy:
      "We advise on succession, retirement, shareholder exits, and ownership change with discretion, helping businesses protect legacy while realising long-term value.",
    points: [
      "Succession and retirement planning",
      "Shareholder exits, valuations, and ownership restructuring",
      "Legacy-sensitive guidance for founder-led businesses"
    ]
  },
  {
    mark: "M&A",
    title: "Strategic Transactions",
    summary: "Selective acquisitions and liquidity events managed with discipline and clarity.",
    copy:
      "From selective acquisitions to shareholder liquidity events, we structure and manage transactions with clarity, discipline, and an understanding of founder-led businesses.",
    points: [
      "Buy-side and sell-side transaction support",
      "Selective acquisitions and liquidity planning",
      "Execution oversight that protects strategic intent"
    ]
  }
];

const frontierAreas: TechnologyItem[] = [
  {
    number: "01",
    title: "Artificial Intelligence",
    copy: "Applied AI platforms, model infrastructure, enterprise intelligence systems, and data-led software.",
    focus: [
      "Model and compute infrastructure",
      "Enterprise intelligence systems",
      "Data-led software platforms"
    ],
    image: technologyImage
  },
  {
    number: "02",
    title: "Robotics",
    copy: "Intelligent machines, autonomous systems, and robotics platforms transforming industrial capability.",
    focus: [
      "Autonomous systems",
      "Intelligent machine platforms",
      "Operational robotics deployment"
    ],
    image: industrialImage
  },
  {
    number: "03",
    title: "Industrial Automation",
    copy: "Automation technologies improving productivity, resilience, and precision across mission-critical operations.",
    focus: [
      "Factory and workflow automation",
      "Precision-led productivity systems",
      "Mission-critical operational tooling"
    ],
    image: industrialImage
  },
  {
    number: "04",
    title: "Deep Tech",
    copy: "Advanced computing, hardware-enabled innovation, and defensible scientific or engineering-led technologies.",
    focus: [
      "Advanced computing systems",
      "Hardware-enabled innovation",
      "Engineering-led defensibility"
    ],
    image: approachImage
  },
  {
    number: "05",
    title: "Scientific Innovation",
    copy: "Science-led businesses converting research, discovery, and technical advantage into enduring enterprise value.",
    focus: [
      "Research commercialisation",
      "Discovery-led business models",
      "Technical advantage at scale"
    ],
    image: healthcareImage
  },
  {
    number: "06",
    title: "Future Infrastructure",
    copy: "Enabling systems that support the next generation of compute, energy, industrial, and digital capability.",
    focus: [
      "Digital and compute enablement",
      "Industrial and energy systems",
      "Long-horizon infrastructure platforms"
    ],
    image: aboutImage
  }
];

const focusThemes: ImageCard[] = [
  {
    eyebrow: "Applied AI",
    title: "Software and intelligence systems",
    copy: "Technology platforms where software, data, and decision systems converge into durable strategic infrastructure.",
    image: technologyImage
  },
  {
    eyebrow: "Science-Led",
    title: "Research and innovation platforms",
    copy: "Scientific and technical businesses translating innovation into commercial scale, defensibility, and long-term relevance.",
    image: healthcareImage
  },
  {
    eyebrow: "Industrial Systems",
    title: "Automation and operational transformation",
    copy: "Industrial technologies reshaping how businesses manufacture, move, monitor, and operate at scale.",
    image: industrialImage
  },
  {
    eyebrow: "Market Adoption",
    title: "Products meeting real demand",
    copy: "Businesses where advanced capability meets customer adoption, operational execution, and measurable value creation.",
    image: consumerImage
  }
];

const approachSteps = [
  {
    number: "01",
    title: "Frame the opportunity",
    copy:
      "We build a clear view of the business, the technology, the shareholder context, and the strategic moment."
  },
  {
    number: "02",
    title: "Structure the path",
    copy:
      "We define the right capital, transition, or transaction route with careful attention to timing, leverage, and alignment."
  },
  {
    number: "03",
    title: "Execute with discipline",
    copy:
      "We manage process, communication, and negotiation in a way that protects strategic intent and reduces noise."
  },
  {
    number: "04",
    title: "Support the next phase",
    copy:
      "We remain engaged through transition, growth, and post-transaction decision-making when continuity matters most."
  }
];

export default function Home() {
  return (
    <>
      <SiteMotion />
      <main id="top">
        <section className="hero section-dark" aria-labelledby="hero-title">
          <div className="hero-stage">
            <HeroAtmosphere />
            <Image
              className="hero-video"
              src={heroImage}
              alt="The Leadenhall Building and City of London skyline"
              fill
              priority
              sizes="100vw"
            />
            <div className="hero-shade" />
            <div className="hero-orb" aria-hidden="true" />
            <div className="hero-mesh" aria-hidden="true" />
            <div className="hero-light-sweep" aria-hidden="true" />
            <div className="hero-grain" aria-hidden="true" />

            <header className="site-header" aria-label="Primary navigation">
              <a className="brand brand-wordmark" href="#top" aria-label="Synaptix Capital home">
                <span className="brand-main">Synaptix</span>
                <span className="brand-sub">
                  <i aria-hidden="true" />
                  <small>Capital</small>
                  <i aria-hidden="true" />
                </span>
              </a>
              <nav className="nav-links" aria-label="Main menu">
                <a href="#about">About</a>
                <div className="nav-item">
                  <a className="nav-trigger" href="#invest">What We Invest In</a>
                  <div className="nav-dropdown" aria-label="Investment focus">
                    <a href="#invest">Artificial Intelligence</a>
                    <a href="#invest">Robotics & Automation</a>
                    <a href="#invest">Deep Tech</a>
                  </div>
                </div>
                <div className="nav-item">
                  <a className="nav-trigger" href="#services">Services</a>
                  <div className="nav-dropdown" aria-label="Services">
                    <a href="#services">Frontier Capital</a>
                    <a href="#services">Strategic Advisory</a>
                    <a href="#transition">Shareholder Transition</a>
                  </div>
                </div>
                <a href="#transition">Transition</a>
                <a href="#approach">Approach</a>
              </nav>
              <a className="header-action" href="/contact">
                Get in Touch
              </a>
            </header>

            <div className="hero-shell">
              <div className="hero-content">
                <p className="eyebrow">Frontier Capital Advisory</p>
                <h1 id="hero-title" className="hero-title">
                  <span>Capital for companies</span>
                  <span>shaping <em>what's next.</em></span>
                </h1>
                <p>
                  Synaptix Capital partners with founders and shareholders across advanced technology,
                  ownership transition, and high-stakes strategic growth.
                </p>
                <div className="hero-actions">
                  <a className="button button-primary" href="/contact">
                    Start a Conversation
                  </a>
                </div>
                <div className="hero-proof" aria-label="Synaptix Capital focus">
                  <span>Frontier technology</span>
                  <span>Shareholder transition</span>
                  <span>Strategic capital</span>
                </div>
              </div>

              <aside className="hero-annotation" aria-label="Hero positioning note">
                <span>Selective mandates</span>
                <strong aria-label="Rotating mandate focus">
                  <span>Discreet capital and ownership guidance for advanced technology businesses.</span>
                  <span>Strategic support for growth, transition, and long-term value creation.</span>
                  <span>Founder-led decisions handled with clarity, alignment, and discretion.</span>
                  <span>Capital strategy shaped around timing, conviction, and execution.</span>
                </strong>
              </aside>

              <a className="hero-scroll" href="#about" aria-label="Scroll to about section">
                <span aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <RetirementExitSection />

        <PositioningSection />

        <NarrativeSections betweenAboutAndFocus={<TechnologySection items={frontierAreas} />} />

        <section className="focus-gallery section-light">
          <div className="container">
            <div className="section-heading between">
              <div>
                <p className="section-kicker">Technology Focus</p>
                <h2>Selective exposure to markets shaping the next decade.</h2>
              </div>
            </div>
            <div className="gallery-grid">
              {focusThemes.map((item, index) => (
                <article className={`gallery-card gallery-card-${index + 1}`} key={item.title}>
                  <figure>
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 24vw" />
                  </figure>
                  <div>
                    <p>{item.eyebrow}</p>
                    <h3>{item.title}</h3>
                    <span>{item.copy}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ServicesSection items={services} />

        <section className="transition section-dark" id="transition">
          <div className="container transition-grid">
            <figure className="transition-image">
              <Image
                src={approachImage}
                alt="Architectural interior symbolising strategic transition"
                fill
                sizes="(max-width: 900px) 100vw, 52vw"
              />
            </figure>
            <div className="transition-copy">
              <p className="section-kicker">Planning the Next Chapter</p>
              <h2>Guidance for succession, retirement, and shareholder transition.</h2>
              <p>
                We support shareholders navigating succession, retirement, and ownership transition with
                discretion and clarity. From company valuations to strategic exit planning, we help founders
                and shareholders realise long-term value while protecting legacy.
              </p>
              <p>
                These decisions are rarely just financial. They involve timing, stewardship, leadership
                continuity, and the future shape of the business. Our role is to make those paths clearer and
                more executable.
              </p>
              <div className="transition-proof" aria-label="Transition planning priorities">
                <span>Succession</span>
                <span>Valuation</span>
                <span>Continuity</span>
              </div>
            </div>
          </div>
        </section>

        <section className="approach section-dark" id="approach">
          <div className="container approach-shell">
            <div className="approach-intro">
              <div>
                <p className="section-kicker">Our Approach</p>
                <h2>Clear process for complex technology and ownership decisions.</h2>
              </div>
              <p>
                A focused path from context to execution, designed to reduce noise and protect the
                strategic intent behind sensitive capital and ownership decisions.
              </p>
            </div>
            <div className="step-grid">
              {approachSteps.map((step) => (
                <article className="step-card" key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="philosophy section-light">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">Values</p>
              <h2>Institutional discipline, partner mindset.</h2>
            </div>
            <div className="philosophy-grid">
              <article>
                <h3>Clarity</h3>
                <p>We simplify technically and strategically complex situations so decisions can be made with conviction.</p>
              </article>
              <article>
                <h3>Precision</h3>
                <p>We move deliberately, combining analytical depth with timing, process discipline, and execution control.</p>
              </article>
              <article>
                <h3>Discretion</h3>
                <p>We work quietly and carefully across sensitive shareholder, capital, and transition matters.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="credibility section-dark">
          <Image className="credibility-image" src={heroImage} alt="" fill sizes="100vw" />
          <div className="credibility-shade" />
          <div className="container credibility-grid">
            <div className="section-copy compact">
              <p className="section-kicker">Trust and Metrics</p>
              <h2>Connected across capital and innovation.</h2>
              <p>
                We work across a selective network of founders, investors, operators, and innovation-led
                businesses. Our advantage is not scale for its own sake, but relevance, judgment, and trusted
                access where strategic relationships matter.
              </p>
            </div>
            <div className="metric-grid" aria-label="Representative firm experience">
              <article>
                <strong>25+</strong>
                <span>Years across investment, transactions, and strategic advisory</span>
              </article>
              <article>
                <strong>150+</strong>
                <span>Strategic capital and shareholder situations reviewed</span>
              </article>
              <article>
                <strong>$8B+</strong>
                <span>Capital raised, deployed, and advised across growth and transition</span>
              </article>
            </div>
          </div>
        </section>

        <section className="final-cta section-dark" id="contact">
          <div className="container cta-grid">
            <div className="cta-content">
              <p className="section-kicker">Contact</p>
              <h2>Let us understand the opportunity before the market does.</h2>
              <p>
                Whether you are raising capital, planning shareholder transition, or building a
                frontier technology business with long-term ambition, Synaptix Capital is structured
                to support clear and confidential decision-making.
              </p>
              <div className="cta-actions">
                <a className="button button-primary" href="/contact">
                  Start a Conversation
                </a>
                <a className="button button-quiet" href="mailto:info@synaptix.capital">
                  Email Directly
                </a>
              </div>
              <div className="cta-points" aria-label="Contact priorities">
                <span>Capital strategy</span>
                <span>Founder transition</span>
                <span>Strategic transactions</span>
              </div>
            </div>
            <aside className="cta-panel">
              <span>Private Briefing</span>
              <strong>Share the strategic moment. We will help frame the next conversation.</strong>
              <div className="cta-panel-steps" aria-label="Contact process">
                <p><b>01</b> Situation and timing</p>
                <p><b>02</b> Capital, transition, or transaction objective</p>
                <p><b>03</b> Confidential next step with the right partner</p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand-panel">
            <Image
              src={logoImage}
              alt="Synaptix Capital"
              fill
              sizes="(max-width: 900px) 100vw, 34vw"
            />
          </div>
          <div className="footer-statement">
            <p className="section-kicker">Synaptix Capital</p>
            <h2>Frontier technology investment and strategic advisory.</h2>
            <span>Disciplined capital, shareholder transition support, and long-term partnership for advanced technology businesses.</span>
          </div>
          <div className="footer-panel">
            <div className="footer-contact">
              <p>Contact</p>
              <a href="/contact">Start a conversation</a>
            </div>
            <div className="footer-meta">
              <span>Selective mandates</span>
              <span>Confidential advisory</span>
              <span>Long-term capital</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
