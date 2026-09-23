import { MarketingPage } from "@/components/sections/marketing-page";
import { secureDocumentsContent } from "@/lib/content/pages";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: secureDocumentsContent.title,
  description: secureDocumentsContent.description,
  path: "/secure-documents",
});

export default function SecureDocumentsPage() {
  return <MarketingPage content={secureDocumentsContent} />;
}
