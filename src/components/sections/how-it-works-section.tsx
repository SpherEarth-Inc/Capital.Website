import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faFileSignature,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ButtonLink } from "@/components/ui/button-link";

const stages: {
  stage: string;
  title: string;
  description: string;
  icon: IconDefinition;
}[] = [
  {
    stage: "Stage 1",
    title: "Pre-Assessment",
    icon: faClipboardCheck,
    description: "Review your financing need and business readiness.",
  },
  {
    stage: "Stage 2",
    title: "Commercial Finance Mandate",
    icon: faFileSignature,
    description: "Prepare the file and coordinate with financing providers.",
  },
  {
    stage: "Stage 3",
    title: "Successful Financing",
    icon: faCircleCheck,
    description: "Fee applies only when qualifying financing is completed.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-14 md:py-16">
      <div className="site-width container-padding">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">
          How it works
        </h2>

        <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {stages.map((item) => (
            <li key={item.title} className="card-surface elevated-hover p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white">
                  <FontAwesomeIcon icon={item.icon} className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-brand-green">{item.stage}</p>
                  <h3 className="text-base font-semibold text-brand-navy">{item.title}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <ButtonLink href="/pre-assessment" variant="brand">
            Start Pre-Assessment
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
