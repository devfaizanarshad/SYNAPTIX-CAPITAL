const inquiryTypes = [
  "Capital strategy or fundraising",
  "Shareholder transition or succession",
  "Strategic acquisition or liquidity event",
  "Frontier technology investment discussion"
];

const contactDetails = [
  {
    label: "Email",
    value: "info@synaptixcapital.com",
    href: "mailto:info@synaptixcapital.com"
  },
  {
    label: "Office",
    value: "Level 30, The Leadenhall Building, 122 Leadenhall Street, London",
    href: "https://www.google.com/maps/search/?api=1&query=Level%2030%2C%20The%20Leadenhall%20Building%2C%20122%20Leadenhall%20Street%2C%20London"
  },
  {
    label: "Focus",
    value: "AI, robotics, deep tech, and science-led innovation",
    href: "#contact-brief"
  },
  {
    label: "Engagement",
    value: "Selective, confidential, founder-led situations",
    href: "#contact-brief"
  }
];

export function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero section-dark">
        <header className="contact-header">
          <a className="brand brand-wordmark" href="/" aria-label="Synaptix Capital home">
            <span className="brand-main">Synaptix</span>
            <span className="brand-sub">
              <i aria-hidden="true" />
              <small>Capital</small>
              <i aria-hidden="true" />
            </span>
          </a>
          <nav className="nav-links" aria-label="Contact page menu">
            <a href="/#about">About</a>
            <div className="nav-item">
              <a className="nav-trigger" href="/#invest">What We Invest In</a>
              <div className="nav-dropdown" aria-label="Investment focus">
                <a href="/#invest">Artificial Intelligence</a>
                <a href="/#invest">Robotics & Automation</a>
                <a href="/#invest">Deep Tech</a>
              </div>
            </div>
            <div className="nav-item">
              <a className="nav-trigger" href="/#services">Services</a>
              <div className="nav-dropdown" aria-label="Services">
                <a href="/#services">Frontier Capital</a>
                <a href="/#services">Strategic Advisory</a>
                <a href="/#transition">Shareholder Transition</a>
              </div>
            </div>
            <a href="/#transition">Transition</a>
            <a href="/#approach">Approach</a>
            <a href="/#team">Team</a>
          </nav>
          <a className="header-action" href="mailto:info@synaptixcapital.com">
            Email Us
          </a>
        </header>

        <div className="container contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="section-kicker">Contact Synaptix Capital</p>
            <h1>Start with the decision you need to make.</h1>
            <p>
              Tell us the context, the timing, and what a good outcome needs to protect. We work
              discreetly with founders, shareholders, and investors across capital, transition, and
              strategic growth situations.
            </p>
            <div className="contact-hero-actions">
              <a className="button button-primary" href="mailto:info@synaptixcapital.com">
                Email Synaptix Capital
              </a>
              <a className="button button-quiet" href="/#about">
                Return to Homepage
              </a>
            </div>
          </div>

          <form className="contact-form" aria-label="Contact form">
            <div className="contact-form-head">
              <span>Private Inquiry</span>
              <h2>Tell us where the conversation should begin.</h2>
            </div>

            <div className="form-grid">
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  suppressHydrationWarning
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  suppressHydrationWarning
                />
              </label>
            </div>

            <label>
              <span>Company</span>
              <input
                type="text"
                name="company"
                placeholder="Company or organisation"
                autoComplete="organization"
                suppressHydrationWarning
              />
            </label>

            <label>
              <span>Inquiry Type</span>
              <select name="inquiry" defaultValue="" suppressHydrationWarning>
                <option value="" disabled>
                  Select a topic
                </option>
                {inquiryTypes.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Brief Context</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Share the situation, timing, objectives, and anything that should remain confidential."
                suppressHydrationWarning
              />
            </label>

            <button
              className="button button-primary contact-submit"
              type="submit"
              suppressHydrationWarning
            >
              Submit Inquiry
            </button>
            <p className="contact-form-note">
              This form is prepared for confidential first contact. For urgent matters, email us directly.
            </p>
          </form>
        </div>
      </section>

      <section className="contact-brief section-light" id="contact-brief">
        <div className="container contact-brief-grid">
          <div className="contact-details">
            <p className="section-kicker">Direct Contact</p>
            <h2>Confidential conversations for serious strategic moments.</h2>
            <div className="contact-detail-list">
              {contactDetails.map((item) => (
                <a className="contact-detail" href={item.href} key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-brief-card">
            <p className="section-kicker">Inquiry Brief</p>
            <h3>Useful starting points</h3>
            <div className="contact-topic-list">
              {inquiryTypes.map((item, index) => (
                <div className="contact-topic" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <a className="button button-primary contact-brief-button" href="mailto:info@synaptixcapital.com">
              Send an Inquiry
            </a>
          </div>
        </div>
      </section>

      <section className="office-location section-dark" aria-labelledby="office-location-title">
        <div className="container office-location-grid">
          <div className="office-location-copy">
            <p className="section-kicker">Office Location</p>
            <h2 id="office-location-title">A London base in The Leadenhall Building.</h2>
            <address>
              Level 30, The Leadenhall Building
              <br />
              122 Leadenhall Street
              <br />
              London
            </address>
            <p>
              The location anchors Synaptix Capital in the City of London, close to institutional
              capital, strategic advisers, and the innovation networks shaping high-conviction
              technology markets.
            </p>
            <a
              className="button button-primary office-location-button"
              href="https://www.google.com/maps/search/?api=1&query=Level%2030%2C%20The%20Leadenhall%20Building%2C%20122%20Leadenhall%20Street%2C%20London"
              target="_blank"
              rel="noreferrer"
            >
              View on Map
            </a>
          </div>

          <figure className="office-location-media">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/The_Leadenhall_Building_from_Ground_Level.jpg/1280px-The_Leadenhall_Building_from_Ground_Level.jpg"
              alt="The Leadenhall Building on Leadenhall Street in the City of London"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}
