import { MarketingPage } from "@/components/sections/marketing-page";
import { officialCommunicationsContent } from "@/lib/content/pages";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: officialCommunicationsContent.title,
  description: officialCommunicationsContent.description,
  path: "/trust/official-communications",
});

export default function OfficialCommunicationsPage() {
  return <MarketingPage content={officialCommunicationsContent} />;
}
