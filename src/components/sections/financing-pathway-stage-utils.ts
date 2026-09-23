import type { FinancingSolution } from "@/lib/content/financing-solutions";

export const FINANCING_FLIP_MS = 680;
export const FINANCING_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export type CardRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type CardFlipStyle = {
  transform: string;
  transition: string;
};

export function measureCardsInStage(
  stage: HTMLElement,
  refs: Map<string, HTMLElement | null>,
): Record<string, CardRect> {
  const stageRect = stage.getBoundingClientRect();
  const out: Record<string, CardRect> = {};

  for (const [slug, el] of refs) {
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    out[slug] = {
      left: rect.left - stageRect.left,
      top: rect.top - stageRect.top,
      width: rect.width,
      height: rect.height,
    };
  }

  return out;
}

export function flipTransform(first: CardRect, last: CardRect): string {
  const dx = first.left - last.left;
  const dy = first.top - last.top;
  const sx = last.width > 0 ? first.width / last.width : 1;
  const sy = last.height > 0 ? first.height / last.height : 1;
  return `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
}

export const FLIP_ORIGIN = "0 0";

export function buildInvertFlipStyles(
  first: Record<string, CardRect>,
  last: Record<string, CardRect>,
): Record<string, CardFlipStyle> {
  const styles: Record<string, CardFlipStyle> = {};

  for (const slug of Object.keys(last)) {
    const a = first[slug];
    const b = last[slug];
    if (!a || !b) continue;
    styles[slug] = {
      transform: flipTransform(a, b),
      transition: "none",
    };
  }

  return styles;
}

export function deckStackTransform(
  slug: string,
  selectedSlug: string,
  all: FinancingSolution[],
): string {
  if (slug === selectedSlug) {
    return "translate(-50%, -50%)";
  }

  const stack = all.filter((item) => item.slug !== selectedSlug);
  const index = stack.findIndex((item) => item.slug === slug);
  if (index < 0) return "translate(-50%, -50%)";

  const layer = index + 1;
  const shift = layer * 6;
  const rotate = layer % 2 === 0 ? -layer * 0.65 : layer * 0.65;
  const scale = 1 - layer * 0.015;

  return `translate(calc(-50% + ${shift}px), calc(-50% + ${shift * 0.85}px)) rotate(${rotate}deg) scale(${scale})`;
}

export function deckZIndex(
  slug: string,
  selectedSlug: string,
  all: FinancingSolution[],
): number {
  if (slug === selectedSlug) return 20;
  const stack = all.filter((item) => item.slug !== selectedSlug);
  const index = stack.findIndex((item) => item.slug === slug);
  return index >= 0 ? index + 1 : 0;
}

export function waitForDoubleFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}
