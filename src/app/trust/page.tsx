import { MarketingPage } from "@/components/sections/marketing-page";
import { trustContent } from "@/lib/content/pages";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: trustContent.title,
  description: trustContent.description,
  path: "/trust",
});

export default function TrustPage() {
  return <MarketingPage content={trustContent} />;
}
