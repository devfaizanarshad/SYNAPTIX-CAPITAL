"use client";

import { useEffect } from "react";

const motionSelectors = [
  ".focus-gallery .section-heading",
  ".gallery-card",
  ".invest-head",
  ".invest-item",
  ".services-intro",
  ".service-strip",
  ".transition-image",
  ".transition-copy",
  ".approach-intro",
  ".step-card",
  ".team-head",
  ".team-card",
  ".philosophy .section-heading",
  ".philosophy-grid article",
  ".credibility-grid > *",
  ".final-cta .cta-content",
  ".final-cta .cta-panel",
  ".site-footer .footer-brand-panel",
  ".site-footer .footer-statement",
  ".site-footer .footer-panel"
].join(", ");

const tiltSelectors = [
  ".gallery-card",
  ".team-card",
  ".founder-card",
  ".step-card",
  ".cta-panel",
  ".footer-panel"
].join(", ");

export function SiteMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    document.body.appendChild(progress);
    document.body.classList.add("motion-ready");

    const motionNodes = Array.from(document.querySelectorAll<HTMLElement>(motionSelectors));
    const groupedIndex = new WeakMap<Element, number>();

    motionNodes.forEach((node) => {
      const parent = node.parentElement;
      const previousIndex = parent ? groupedIndex.get(parent) ?? 0 : 0;

      node.classList.add("motion-item");
      node.style.setProperty("--motion-index", String(Math.min(previousIndex, 5)));

      if (parent) {
        groupedIndex.set(parent, previousIndex + 1);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    motionNodes.forEach((node) => observer.observe(node));

    const tiltNodes = Array.from(document.querySelectorAll<HTMLElement>(tiltSelectors));

    const handleTilt = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      target.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
      target.style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
      target.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      target.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    };

    const resetTilt = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      target.style.removeProperty("--tilt-x");
      target.style.removeProperty("--tilt-y");
      target.style.removeProperty("--glow-x");
      target.style.removeProperty("--glow-y");
    };

    tiltNodes.forEach((node) => {
      node.classList.add("motion-tilt");
      node.addEventListener("pointermove", handleTilt);
      node.addEventListener("pointerleave", resetTilt);
    });

    let ticking = false;

    const updateScrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const amount = max > 0 ? window.scrollY / max : 0;

      progress.style.transform = `scaleX(${Math.min(Math.max(amount, 0), 1)})`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollProgress);
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      tiltNodes.forEach((node) => {
        node.removeEventListener("pointermove", handleTilt);
        node.removeEventListener("pointerleave", resetTilt);
      });
      progress.remove();
      document.body.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
