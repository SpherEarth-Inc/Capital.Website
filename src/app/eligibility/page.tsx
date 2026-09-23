import { MarketingPage } from "@/components/sections/marketing-page";
import { eligibilityContent } from "@/lib/content/pages";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: eligibilityContent.title,
  description: eligibilityContent.description,
  path: "/eligibility",
});

export default function EligibilityPage() {
  return <MarketingPage content={eligibilityContent} />;
}
