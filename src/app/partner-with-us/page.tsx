import { MarketingPage } from "@/components/sections/marketing-page";
import { partnerContent } from "@/lib/content/pages";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: partnerContent.title,
  description: partnerContent.description,
  path: "/partner-with-us",
});

export default function PartnerPage() {
  return <MarketingPage content={partnerContent} />;
}
