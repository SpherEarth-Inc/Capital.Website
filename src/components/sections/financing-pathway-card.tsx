import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { FinancingSolution } from "@/lib/content/financing-solutions";
import { cn, sitePath } from "@/lib/utils";

const layoutClass: Record<FinancingSolution["layout"], string> = {
  feature: "aspect-[3/5]",
  default: "aspect-[2/3]",
};

export function FinancingPathwayCard({
  solution,
  href,
  onSelect,
  interactive = true,
  className,
}: {
  solution: FinancingSolution;
  href?: string;
  onSelect?: (slug: string) => void;
  interactive?: boolean;
  className?: string;
}) {
  const isFeature = solution.layout === "feature";

  const shellClass = cn(
    "group relative isolate flex w-full flex-col overflow-hidden rounded-sm bg-brand-navy text-left shadow-sm ring-1 ring-black/5",
    interactive &&
      "cursor-pointer transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-navy/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
    layoutClass[solution.layout],
    className,
  );

  const body = (
    <>
      <Image
        src={sitePath(solution.image)}
        alt=""
        fill
        className="object-cover object-[center_20%] transition duration-500 ease-out group-hover:scale-[1.05]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        unoptimized
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/40 to-transparent transition duration-300 group-hover:via-brand-navy/50"
        aria-hidden
      />
      <div className="relative mt-auto flex w-full items-end justify-between gap-3 p-4">
        <div>
          <h3
            className={cn(
              "font-semibold tracking-tight text-white",
              isFeature ? "text-lg md:text-xl" : "text-base",
            )}
          >
            {solution.title}
          </h3>
          <p className="mt-1 text-sm text-white/75 transition duration-300 group-hover:text-white/90">
            {solution.tagline}
          </p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition duration-300 group-hover:bg-brand-green group-hover:text-white">
          <ArrowUpRight className="size-4 transition duration-300 group-hover:rotate-12" />
        </span>
      </div>
    </>
  );

  if (!interactive) {
    return <div className={shellClass}>{body}</div>;
  }

  if (href) {
    return (
      <Link href={href} className={shellClass}>
        {body}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => onSelect?.(solution.slug)} className={shellClass}>
      {body}
    </button>
  );
}
