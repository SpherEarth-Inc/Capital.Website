import Image from "next/image";
import { GreenDotSteps } from "@/components/sections/green-dot-steps";
import { ButtonLink } from "@/components/ui/button-link";
import { homeContent } from "@/lib/content/pages";
import { siteAssets } from "@/lib/content/site";

const steps = [
  {
    title: "Pre-Assessment",
    description: "Review your financing need and business readiness.",
  },
  {
    title: "Commercial finance mandate",
    description: "Prepare the file and coordinate with financing providers.",
  },
  {
    title: "Successful financing",
    description: "Success fee applies only when qualifying financing completes.",
  },
] as const;

/** Shown inside the home hero white panel only — not a separate page section. */
export function HomeHowItWorksPanel() {
  const { eyebrow, title, lead } = homeContent.howItWorksPanel;

  return (
    <div
      id="how-it-works"
      className="pointer-events-auto site-width container-padding w-full py-4 md:py-6"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="max-w-lg">
          <p className="text-sm font-semibold tracking-tight text-brand-green md:text-base">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {lead}
          </p>
          <GreenDotSteps items={steps} />
          <div className="mt-8">
            <ButtonLink href="/pre-assessment" variant="brand" size="sm">
              Start Pre-Assessment
            </ButtonLink>
          </div>
        </div>

        <div className="flex w-full items-end justify-center">
          <div className="w-[14rem] overflow-hidden rounded-sm bg-yellow-200 px-3 pb-0 pt-36 shadow-sm shadow-yellow-900/5 sm:w-[15rem] sm:px-4 sm:pt-40 lg:w-[16.5rem] lg:translate-x-3 lg:pt-44">
            <Image
              src={siteAssets.howItWorks}
              alt=""
              width={1198}
              height={1313}
              className="block h-auto w-full align-bottom"
              sizes="(max-width: 1024px) 280px, 360px"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}
