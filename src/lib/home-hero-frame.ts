/** Shared center frame — hero border and scroll expand origin (keep in sync with hero CSS min()). */
export function getHeroFrameSize(viewportWidth: number, viewportHeight: number) {
  const width = Math.min(360, viewportWidth * 0.88);
  const height = Math.min(520, viewportHeight * 0.58);
  return { width, height };
}
