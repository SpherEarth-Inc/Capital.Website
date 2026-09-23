import { MarketingPage } from "@/components/sections/marketing-page";
import { preAssessmentTermsContent } from "@/lib/content/pages";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: preAssessmentTermsContent.title,
  description: preAssessmentTermsContent.description,
  path: "/pre-assessment-terms",
});

export default function PreAssessmentTermsPage() {
  return <MarketingPage content={preAssessmentTermsContent} />;
}
