import { MarketingPage } from "@/components/sections/marketing-page";
import { bookConsultationContent } from "@/lib/content/pages";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: bookConsultationContent.title,
  description: bookConsultationContent.description,
  path: "/book-consultation",
});

export default function BookConsultationPage() {
  return <MarketingPage content={bookConsultationContent} />;
}
