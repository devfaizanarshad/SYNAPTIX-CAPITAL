"use client";

import { useEffect } from "react";

export function HeroAtmosphere() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".hero-stage");
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    const setDepth = (event: PointerEvent) => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        stage.style.setProperty("--hero-pan-x", `${(-x * 1.6).toFixed(2)}%`);
        stage.style.setProperty("--hero-pan-y", `${(-y * 1.2).toFixed(2)}%`);
        stage.style.setProperty("--hero-orb-x", `${(52 + x * 6).toFixed(2)}%`);
        stage.style.setProperty("--hero-orb-y", `${(44 + y * 5).toFixed(2)}%`);
      });
    };

    const resetDepth = () => {
      stage.style.setProperty("--hero-pan-x", "0%");
      stage.style.setProperty("--hero-pan-y", "0%");
      stage.style.setProperty("--hero-orb-x", "52%");
      stage.style.setProperty("--hero-orb-y", "44%");
    };

    stage.addEventListener("pointermove", setDepth);
    stage.addEventListener("pointerleave", resetDepth);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      stage.removeEventListener("pointermove", setDepth);
      stage.removeEventListener("pointerleave", resetDepth);
    };
  }, []);

  return null;
}
