"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { FinancingMoreCard } from "@/components/sections/financing-more-card";
import { FinancingPathwayCard } from "@/components/sections/financing-pathway-card";
import { FinancingPathwayDetailPanel } from "@/components/sections/financing-pathway-detail";
import {
  buildInvertFlipStyles,
  deckStackTransform,
  deckZIndex,
  FINANCING_FLIP_MS,
  FINANCING_EASE,
  FLIP_ORIGIN,
  measureCardsInStage,
  waitForDoubleFrame,
  type CardFlipStyle,
} from "@/components/sections/financing-pathway-stage-utils";
import {
  financingPathwayHref,
  type FinancingSolution,
} from "@/lib/content/financing-solutions";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "deck";

const cardStaggerClass: Record<string, string> = {
  "working-capital": "mt-0 sm:mt-0 lg:mt-0",
  equipment: "mt-4 sm:mt-6 lg:mt-12",
  receivables: "mt-0 sm:mt-2 lg:mt-5",
  contract: "mt-6 sm:mt-8 lg:mt-16",
  acquisition: "mt-2 sm:mt-0 lg:mt-3",
  enterprise: "mt-5 sm:mt-6 lg:mt-10",
  more: "mt-4 sm:mt-6 lg:mt-10",
};

function gridClassForCount(count: number) {
  if (count <= 4) {
    return "grid-cols-2 lg:grid-cols-4 lg:gap-x-5";
  }
  return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5";
}

export function FinancingPathwaysSection({
  solutions,
  showMoreCard = false,
  sectionId = "financing",
  navigateCardsToFinancing = false,
  initialPathwaySlug = null,
}: {
  solutions: FinancingSolution[];
  showMoreCard?: boolean;
  sectionId?: string;
  /** Home teaser: cards link to /financing?pathway=… instead of expanding in place. */
  navigateCardsToFinancing?: boolean;
  initialPathwaySlug?: string | null;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const [view, setView] = useState<ViewMode>("grid");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [flipStyles, setFlipStyles] = useState<Record<string, CardFlipStyle>>({});
  const [animating, setAnimating] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);

  const selected = solutions.find((item) => item.slug === selectedSlug) ?? null;
  const gridItemCount = solutions.length + (showMoreCard ? 1 : 0);

  const runFlipToDeck = useCallback(
    async (slug: string) => {
      const stage = stageRef.current;
      if (!stage || animating) return;

      setAnimating(true);
      setDetailVisible(false);

      const first = measureCardsInStage(stage, cardRefs.current);

      flushSync(() => {
        setSelectedSlug(slug);
        setView("deck");
      });

      await waitForDoubleFrame();

      const last = measureCardsInStage(stage, cardRefs.current);
      const invert = buildInvertFlipStyles(first, last);
      setFlipStyles(invert);

      await waitForDoubleFrame();

      const play: Record<string, CardFlipStyle> = {};
      const transition = `transform ${FINANCING_FLIP_MS}ms ${FINANCING_EASE}`;

      for (const solution of solutions) {
        play[solution.slug] = {
          transform: deckStackTransform(solution.slug, slug, solutions),
          transition,
        };
      }

      setFlipStyles(play);

      window.setTimeout(() => {
        setFlipStyles({});
        setDetailVisible(true);
        setAnimating(false);
      }, FINANCING_FLIP_MS);
    },
    [animating, solutions],
  );

  const runFlipToGrid = useCallback(async () => {
    const stage = stageRef.current;
    if (!stage || animating || !selectedSlug) return;

    setAnimating(true);
    setDetailVisible(false);

    const first = measureCardsInStage(stage, cardRefs.current);

    flushSync(() => {
      setView("grid");
      setSelectedSlug(null);
    });

    await waitForDoubleFrame();

    const last = measureCardsInStage(stage, cardRefs.current);
    const invert = buildInvertFlipStyles(first, last);
    setFlipStyles(invert);

    await waitForDoubleFrame();

    const play: Record<string, CardFlipStyle> = {};
    const transition = `transform ${FINANCING_FLIP_MS}ms ${FINANCING_EASE}`;

    for (const solution of solutions) {
      play[solution.slug] = {
        transform: "none",
        transition,
      };
    }

    setFlipStyles(play);

    window.setTimeout(() => {
      setFlipStyles({});
      setAnimating(false);
    }, FINANCING_FLIP_MS);
  }, [animating, selectedSlug, solutions]);

  const handleSelect = useCallback(
    (slug: string) => {
      if (view !== "grid" || animating) return;
      void runFlipToDeck(slug);
    },
    [animating, runFlipToDeck, view],
  );

  const handleBack = useCallback(() => {
    if (view !== "deck" || animating) return;
    void runFlipToGrid();
  }, [animating, runFlipToGrid, view]);

  const openedFromQueryRef = useRef<string | null>(null);

  useEffect(() => {
    if (navigateCardsToFinancing || !initialPathwaySlug) {
      return;
    }
    if (!solutions.some((item) => item.slug === initialPathwaySlug)) {
      return;
    }
    if (openedFromQueryRef.current === initialPathwaySlug) {
      return;
    }

    let cancelled = false;

    const openFromQuery = async () => {
      for (let attempt = 0; attempt < 40 && !cancelled; attempt++) {
        const stage = stageRef.current;
        const refsReady = solutions.every((item) => cardRefs.current.get(item.slug));
        if (stage && refsReady) break;
        await waitForDoubleFrame();
      }

      if (cancelled) return;

      document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
      await runFlipToDeck(initialPathwaySlug);
      if (!cancelled) {
        openedFromQueryRef.current = initialPathwaySlug;
      }
    };

    void openFromQuery();

    return () => {
      cancelled = true;
    };
  }, [initialPathwaySlug, navigateCardsToFinancing, runFlipToDeck, sectionId, solutions]);

  const showDeckLayout = view === "deck" && selectedSlug !== null;

  return (
    <section id={sectionId} className="scroll-mt-24 bg-white py-14 md:py-16">
      <div className="site-width container-padding">
        {!showDeckLayout && (
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">
              Financing pathways
            </h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Commercial funding types we help Canadian businesses pursue.
            </p>
          </div>
        )}

        <div
          className={cn(
            showDeckLayout &&
              "mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-28 xl:max-w-6xl xl:gap-32 2xl:gap-36",
            showDeckLayout ? "mt-4" : "mt-8",
          )}
        >
          <div
            ref={stageRef}
            className={cn(
              showDeckLayout
                ? "relative min-h-[min(28rem,65vh)] w-full max-w-[16rem] shrink-0 overflow-visible pb-8 pr-8"
                : cn(
                    "grid w-full items-start gap-x-3 gap-y-2 pb-4 sm:gap-x-4 lg:pb-8",
                    gridClassForCount(gridItemCount),
                  ),
            )}
          >
            {solutions.map((solution) => {
              const flip = flipStyles[solution.slug];
              const isDeck = showDeckLayout;

              return (
                <div
                  key={solution.slug}
                  ref={(node) => {
                    cardRefs.current.set(solution.slug, node);
                  }}
                  className={cn(
                    "min-w-0 will-change-transform",
                    !isDeck && cardStaggerClass[solution.slug],
                    isDeck && "absolute left-1/2 top-1/2 w-full max-w-[16rem]",
                  )}
                  style={
                    isDeck
                      ? {
                          zIndex: deckZIndex(solution.slug, selectedSlug ?? "", solutions),
                          transform:
                            flip?.transform ??
                            deckStackTransform(solution.slug, selectedSlug ?? "", solutions),
                          transformOrigin: flip ? FLIP_ORIGIN : "center center",
                          transition:
                            flip?.transition ??
                            `transform ${FINANCING_FLIP_MS}ms ${FINANCING_EASE}`,
                        }
                      : {
                          transform: flip?.transform,
                          transformOrigin: flip ? FLIP_ORIGIN : undefined,
                          transition: flip?.transition,
                        }
                  }
                >
                  <FinancingPathwayCard
                    solution={solution}
                    href={
                      navigateCardsToFinancing
                        ? financingPathwayHref(solution.slug)
                        : undefined
                    }
                    onSelect={navigateCardsToFinancing ? undefined : handleSelect}
                    interactive={view === "grid" && !animating}
                  />
                </div>
              );
            })}

            {showMoreCard && !showDeckLayout && (
              <div className={cn("min-w-0", cardStaggerClass.more)}>
                <FinancingMoreCard />
              </div>
            )}
          </div>

          {selected && showDeckLayout && (
            <div className="flex w-full max-w-xl items-center lg:max-w-md xl:max-w-lg">
              <FinancingPathwayDetailPanel
                solution={selected}
                visible={detailVisible}
                onBack={handleBack}
                backDisabled={animating}
              />
            </div>
          )}
        </div>

        {showDeckLayout && selected && (
          <p
            className={cn(
              "mt-4 text-center text-xs font-medium text-muted-foreground transition-opacity duration-500 lg:hidden",
              detailVisible ? "opacity-100" : "opacity-0",
            )}
          >
            {solutions.length} pathways · {selected.title} selected
          </p>
        )}
      </div>
    </section>
  );
}
