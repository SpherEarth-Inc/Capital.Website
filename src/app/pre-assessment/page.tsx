import { Suspense } from "react";
import { PreAssessmentWizard } from "@/features/pre-assessment";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: "Commercial Financing Pre-Assessment",
  description:
    "Start the SpherEarth Commercial Financing Pre-Assessment for Canadian business funding.",
  path: "/pre-assessment",
});

export default function PreAssessmentPage() {
  return (
    <Suspense
      fallback={
        <p className="site-width container-padding py-8 text-sm text-muted-foreground">
          Loading…
        </p>
      }
    >
      <PreAssessmentWizard />
    </Suspense>
  );
}
