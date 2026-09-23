import { GreenDotSteps } from "@/components/sections/green-dot-steps";
import { feesContent } from "@/lib/content/pages";

const feeStages = feesContent.sections.map((section) => ({
  title: section.title ?? "",
  description: section.paragraphs?.[0] ?? "",
}));

export function FeesPageMain() {
  return (
    <div className="max-w-lg">
      <p className="text-sm font-semibold tracking-tight text-brand-green md:text-base">
        Three steps
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
        {feesContent.title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {feesContent.description}
      </p>
      <GreenDotSteps items={feeStages} />
    </div>
  );
}
