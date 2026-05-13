"use client";

import React, { useEffect, useRef, useState, MouseEvent } from "react";

const SpotlightCard = ({ title, copy, delay, number }: { title: string, copy: string, delay: number, number: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="re-premium-card fade-up-elem"
      style={{ '--delay': `${delay}s` } as React.CSSProperties}
    >
      <div
        className="re-premium-glow"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(215, 175, 115, 0.08), transparent 40%)`,
        }}
      />
      <div 
        className="re-premium-border-glow"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(215, 175, 115, 0.5), transparent 40%)`,
        }}
      />
      <div className="re-premium-inner">
        <span className="re-card-number">{number}</span>
        <h4>{title}</h4>
        <p>{copy}</p>
      </div>
    </div>
  );
};

export function RetirementExitSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`re-grand-section ${isVisible ? 'is-visible' : ''}`} id="retirement-exit">
      <div className="re-bg-mesh"></div>
      <div className="re-bg-glow"></div>
      
      <div className="container re-grand-container">
        <div className="re-eyebrow-wrapper fade-up-elem" style={{ '--delay': '0.1s' } as React.CSSProperties}>
          <div className="re-badge-premium">
            <div className="re-badge-spinner"></div>
            <span>★ NO BROKER &mdash; NO BROKERAGE FEE</span>
          </div>
        </div>

        <div className="re-main-title-wrap fade-up-elem" style={{ '--delay': '0.2s' } as React.CSSProperties}>
          <h2 className="re-main-title">
            Your Legacy,<br/>
            <span className="re-text-gradient">Protected.</span>
          </h2>
          <p className="re-main-subtitle">
            We aim to acquire established businesses by offering structured retirement exit solutions to owners who are ready to step back.
          </p>
        </div>

        <div className="re-layout-grid">
          <div className="re-glass-panel fade-up-elem" style={{ '--delay': '0.3s' } as React.CSSProperties}>
            <div className="re-glass-content">
              <h3>Are you ready to step back?</h3>
              <p>
                You've built your manufacturing business over decades. You have loyal customers, experienced staff, reliable suppliers, and invaluable production knowledge. But without a structured succession plan, retirement becomes incredibly complicated.
              </p>
              <p>
                We acquire established manufacturing companies, managing the transition with absolute discretion. We protect what you've built, ensuring your business continues to thrive while you secure your financial exit.
              </p>
              <a className="re-btn-shimmer" href="/contact">
                <span className="re-btn-text">Discuss Your Exit Strategy</span>
                <span className="re-btn-shimmer-effect"></span>
              </a>
            </div>
            <div className="re-glass-features">
              <div className="re-feature">
                <div className="re-feat-icon">✓</div>
                <span>Direct Acquisition</span>
              </div>
              <div className="re-feature">
                <div className="re-feat-icon">✓</div>
                <span>Confidential Process</span>
              </div>
              <div className="re-feature">
                <div className="re-feat-icon">✓</div>
                <span>Flexible Handover</span>
              </div>
            </div>
          </div>

          <div className="re-cards-column">
            <SpotlightCard 
              number="01"
              title="Full Buyout" 
              copy="We acquire 100% of the company and the owner exits after a short handover period. Best for owners who want a clean retirement."
              delay={0.4}
            />
            <SpotlightCard 
              number="02"
              title="Staged Retirement Exit" 
              copy="We buy the company in stages. The owner stays involved for 6–24 months, then exits gradually. Best for companies heavily dependent on the owner."
              delay={0.5}
            />
            <SpotlightCard 
              number="03"
              title="Earn-Out Agreement" 
              copy="Part of the purchase price is paid upfront, and the remainder based on future performance. Best when the company has potential but needs operational improvement."
              delay={0.6}
            />
            <SpotlightCard 
              number="04"
              title="Partnership Before Acquisition" 
              copy="We first work with the company, improve systems or production, then agree on a future acquisition. Best when valuation is unclear."
              delay={0.7}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
