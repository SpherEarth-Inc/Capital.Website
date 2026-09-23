/** Home hero backdrop — faded SpherEarth green wash. */
export const heroSky = {
  top: "#f0f9f0",
  mid: "#e2f2e2",
  bottom: "#c5e4c5",
} as const;

export const heroSkyGradient = `linear-gradient(to bottom, ${heroSky.top} 0%, ${heroSky.mid} 55%, ${heroSky.bottom} 100%)`;

export const heroSkyGradientClass =
  "bg-[linear-gradient(to_bottom,#f0f9f0_0%,#e2f2e2_55%,#c5e4c5_100%)]";
