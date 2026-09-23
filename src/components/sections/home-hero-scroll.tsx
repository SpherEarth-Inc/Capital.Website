"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { getHeroFrameSize } from "@/lib/home-hero-frame";
import { heroSkyGradientClass } from "@/lib/home-hero-sky";
import { homeContent } from "@/lib/content/pages";
import { siteAssets } from "@/lib/content/site";

/** Extra scroll while the hero stays pinned (expand animation). */
const RUNWAY_EXTRA_VH = 0.45;
const EXPAND_ANIM_MS = 680;
const HOW_IT_WORKS_HASH = "how-it-works";
/** Runway scroll progress — keeps panel open (above collapse threshold). */
const HOW_IT_WORKS_SCROLL_PROGRESS = 0.35;

const HERO_HEADER_OFFSET = "5rem";

const heroImageProps = {
  src: siteAssets.homeHero,
  alt: "",
  fill: true as const,
  priority: true as const,
  unoptimized: true as const,
  className: "object-contain object-bottom",
  sizes: "100vw",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

function animateScrollTo(targetY: number, durationMs: number) {
  const startY = window.scrollY;
  if (Math.abs(startY - targetY) < 2) return;

  const start = performance.now();
  const tick = (now: number) => {
    const u = clamp((now - start) / durationMs, 0, 1);
    window.scrollTo(0, startY + (targetY - startY) * easeOutCubic(u));
    if (u < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function HeroFigure() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
      style={{ top: HERO_HEADER_OFFSET }}
      aria-hidden
    >
      <div className="relative h-full w-full pb-6 md:pb-8">
        <Image {...heroImageProps} />
      </div>
    </div>
  );
}

function HeroCopyLayout({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex"
      style={{ paddingTop: HERO_HEADER_OFFSET, ...style }}
    >
      <div className="site-width container-padding mx-auto flex w-full flex-1 lg:grid lg:grid-cols-2">
        <div className="flex flex-col justify-center items-start py-10 md:py-12">{children}</div>
      </div>
    </div>
  );
}

function HeroSkyHighlight() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 20%, rgba(0,153,0,0.12) 0%, transparent 55%)",
      }}
      aria-hidden
    />
  );
}

export function HomeHeroScroll({
  panelContent,
  children,
}: {
  panelContent?: ReactNode;
  children: ReactNode;
}) {
  const { hero } = homeContent;
  const runwayRef = useRef<HTMLDivElement>(null);
  const expandTRef = useRef(0);
  const expandAnimRef = useRef<number | null>(null);
  const panelHoldOpenRef = useRef(false);
  const animateExpandToRef = useRef<(target: number) => void>(() => {});
  const [expandT, setExpandT] = useState(0);
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  const [reducedMotion, setReducedMotion] = useState(false);

  const stopExpandAnim = () => {
    if (expandAnimRef.current !== null) {
      cancelAnimationFrame(expandAnimRef.current);
      expandAnimRef.current = null;
    }
  };

  const animateExpandTo = (target: number) => {
    stopExpandAnim();
    const from = expandTRef.current;
    if (Math.abs(from - target) < 0.002) {
      expandTRef.current = target;
      setExpandT(target);
      return;
    }
    const start = performance.now();

    const tick = (now: number) => {
      const u = clamp((now - start) / EXPAND_ANIM_MS, 0, 1);
      const eased = target > from ? easeOutCubic(u) : easeInOutCubic(u);
      const value = from + (target - from) * eased;
      expandTRef.current = value;
      setExpandT(value);
      if (u < 1) {
        expandAnimRef.current = requestAnimationFrame(tick);
      } else {
        expandAnimRef.current = null;
      }
    };
    expandAnimRef.current = requestAnimationFrame(tick);
  };

  animateExpandToRef.current = animateExpandTo;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) {
        expandTRef.current = 1;
        setExpandT(1);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const measure = () => {
      const runway = runwayRef.current;
      if (!runway) return 0;
      const scrollable = Math.max(runway.offsetHeight - viewport.h, 1);
      return clamp(-runway.getBoundingClientRect().top / scrollable, 0, 1);
    };

    const onScroll = () => {
      const progress = measure();
      const scrollBoost = easeOutCubic(clamp(progress / 0.22, 0, 1));

      if (progress <= 0.008 && !panelHoldOpenRef.current) {
        if (expandTRef.current > 0.01) animateExpandTo(0);
        return;
      }

      if (progress > 0.012) {
        if (progress >= 0.22 || scrollBoost > expandTRef.current + 0.08) {
          expandTRef.current = Math.max(expandTRef.current, scrollBoost);
          setExpandT(expandTRef.current);
        }
        if (expandTRef.current < 0.995 && expandAnimRef.current === null) {
          animateExpandTo(1);
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      stopExpandAnim();
    };
  }, [viewport.h, reducedMotion]);

  useEffect(() => {
    const isHowItWorksHash = () =>
      window.location.hash.replace(/^#/, "") === HOW_IT_WORKS_HASH;

    const openHowItWorksPanel = () => {
      if (reducedMotion) {
        document.getElementById(HOW_IT_WORKS_HASH)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      panelHoldOpenRef.current = true;

      const runway = runwayRef.current;
      let targetTop = window.scrollY;
      if (runway) {
        const scrollable = Math.max(runway.offsetHeight - viewport.h, 1);
        targetTop =
          window.scrollY +
          runway.getBoundingClientRect().top +
          HOW_IT_WORKS_SCROLL_PROGRESS * scrollable;
      }

      animateExpandToRef.current(1);
      animateScrollTo(targetTop, EXPAND_ANIM_MS);

      window.setTimeout(() => {
        panelHoldOpenRef.current = false;
      }, EXPAND_ANIM_MS + 150);
    };

    const onHash = () => {
      if (isHowItWorksHash()) openHowItWorksPanel();
    };

    const onDocClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes(`#${HOW_IT_WORKS_HASH}`)) return;
      if (window.location.pathname !== "/") return;

      event.preventDefault();
      window.history.pushState(null, "", `#${HOW_IT_WORKS_HASH}`);
      openHowItWorksPanel();
    };

    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onDocClick, true);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onDocClick, true);
    };
  }, [viewport.h, reducedMotion]);

  const frame = getHeroFrameSize(viewport.w, viewport.h);
  const coverScale =
    Math.max(viewport.w / frame.width, viewport.h / frame.height) * 1.02;
  const panelT = expandT;
  const panelScale = 1 + panelT * (coverScale - 1);
  const heroCopyOpacity = clamp(1 - panelT * 2.2, 0, 1);
  const panelContentOpacity = clamp((panelT - 0.8) / 0.18, 0, 1);

  const panelTransition = `transform ${EXPAND_ANIM_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;

  if (reducedMotion) {
    return (
      <>
        <section data-home-hero className={`relative min-h-svh ${heroSkyGradientClass}`}>
          <HeroSkyHighlight />
          <HeroFigure />
          <HeroCopyLayout>
            <HeroCopy hero={hero} />
          </HeroCopyLayout>
        </section>
        <div className="bg-white">
          {panelContent}
          {children}
        </div>
      </>
    );
  }

  return (
    <>
      <div
        ref={runwayRef}
        data-home-hero
        className="relative z-10"
        style={{ height: `calc(100svh + ${RUNWAY_EXTRA_VH * 100}vh)` }}
      >
        <div className="sticky top-0 z-10 h-svh overflow-hidden">
          <div className={`relative h-full w-full ${heroSkyGradientClass}`}>
            <HeroSkyHighlight />
            <div
              className="absolute inset-0 z-[1]"
              style={{ opacity: clamp(1 - panelT * 1.8, 0, 1) }}
            >
              <HeroFigure />
            </div>

            {panelT > 0.75 && (
              <div
                className="pointer-events-none absolute inset-0 z-[3] bg-white"
                style={{ opacity: clamp((panelT - 0.75) / 0.2, 0, 1) }}
                aria-hidden
              />
            )}

            <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
              <div
                className="absolute box-border border border-white/50"
                style={{
                  width: frame.width,
                  height: frame.height,
                  transform: `scale(${panelScale})`,
                  opacity: clamp(1 - panelT * 1.1, 0, 1),
                  transition: panelTransition,
                  willChange: "transform, opacity",
                }}
                aria-hidden
              />
              {panelT > 0.02 && (
                <div
                  className="pointer-events-none absolute bg-white"
                  style={{
                    width: frame.width,
                    height: frame.height,
                    transform: `scale(${panelScale})`,
                    transition: panelTransition,
                    willChange: "transform",
                  }}
                />
              )}
            </div>

            <HeroCopyLayout
              style={{
                opacity: heroCopyOpacity,
                pointerEvents: heroCopyOpacity > 0.35 ? undefined : "none",
              }}
            >
              <HeroCopy hero={hero} />
            </HeroCopyLayout>

            {panelContent && (
              <div
                className="pointer-events-none absolute inset-0 z-[4] flex items-center"
                style={{
                  opacity: panelContentOpacity,
                  visibility: panelContentOpacity > 0.02 ? "visible" : "hidden",
                }}
                aria-hidden={panelContentOpacity <= 0.02}
              >
                {panelContent}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-svh">{children}</div>
    </>
  );
}

function HeroCopy({ hero }: { hero: (typeof homeContent)["hero"] }) {
  return (
    <div className="pointer-events-auto max-w-lg">
      <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-navy md:text-5xl lg:text-[3.25rem]">
        {hero.heading}
      </h1>
      <p className="mt-4 text-base text-muted-foreground md:text-lg">{hero.supporting}</p>
      <div className="mt-8">
        <ButtonLink href={hero.primaryCta.href} variant="brand" size="lg">
          {hero.primaryCta.label}
        </ButtonLink>
      </div>
    </div>
  );
}
