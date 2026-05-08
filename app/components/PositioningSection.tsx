"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

export function PositioningSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.26
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const bounds = node.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    node.style.setProperty("--positioning-glow-x", `${x}%`);
    node.style.setProperty("--positioning-glow-y", `${y}%`);
  };

  return (
    <section className="positioning section-light" aria-labelledby="positioning-title">
      <div
        ref={ref}
        className={`container container-narrow positioning-inner${isVisible ? " is-visible" : ""}`}
        onMouseMove={handlePointerMove}
      >
        <span className="positioning-anchor" aria-hidden="true" />
        <p className="section-kicker positioning-kicker">Positioning</p>
        <h2 id="positioning-title">
          A discreet capital partner at the intersection of{" "}
          <span className="positioning-emphasis">innovation</span>, ownership, and{" "}
          <em>long-term value</em>.
        </h2>
        <p className="positioning-copy">
          Synaptix Capital is built for advanced technology businesses and the shareholders behind
          them. We combine investment perspective, strategic judgment, and disciplined execution
          across capital, transition, and high-stakes growth decisions.
        </p>
      </div>
    </section>
  );
}
