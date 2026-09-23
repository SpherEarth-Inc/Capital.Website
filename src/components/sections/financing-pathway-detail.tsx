import { ButtonLink } from "@/components/ui/button-link";
import { buttonVariants } from "@/components/ui/button";
import type { FinancingSolution } from "@/lib/content/financing-solutions";
import { cn } from "@/lib/utils";

export function FinancingPathwayDetailPanel({
  solution,
  visible,
  onBack,
  backDisabled = false,
}: {
  solution: FinancingSolution;
  visible: boolean;
  onBack: () => void;
  backDisabled?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-lg transition-all duration-500 ease-out lg:max-w-xl xl:max-w-2xl",
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <p className="text-sm font-semibold text-brand-green">{solution.tagline}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
        {solution.title}
      </h3>
      <ul className="mt-6 space-y-4">
        {solution.details.map((paragraph) => (
          <li
            key={paragraph}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            <span
              className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-green"
              aria-hidden
            />
            <span>{paragraph}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-10">
        <ButtonLink href={solution.href} variant="brand" size="lg">
          {solution.ctaLabel}
        </ButtonLink>
        <button
          type="button"
          onClick={onBack}
          disabled={backDisabled}
          className={cn(
            buttonVariants({ size: "lg" }),
            "rounded-full border border-border bg-transparent text-brand-navy shadow-none hover:border-brand-navy/35 hover:bg-transparent disabled:opacity-50",
          )}
        >
          Other financing
        </button>
      </div>
    </div>
  );
}
