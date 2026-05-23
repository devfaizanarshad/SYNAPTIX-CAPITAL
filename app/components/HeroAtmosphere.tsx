"use client";

import { useEffect } from "react";

export function HeroAtmosphere() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".hero-stage");
    if (!stage) {
      return;
    }

    stage.style.setProperty("--hero-pan-x", "0%");
    stage.style.setProperty("--hero-pan-y", "0%");
    stage.style.setProperty("--hero-orb-x", "52%");
    stage.style.setProperty("--hero-orb-y", "44%");
  }, []);

  return null;
}
