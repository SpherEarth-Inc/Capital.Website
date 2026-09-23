import { FinancingPageContent } from "@/app/financing/financing-page-content";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: "Financing pathways",
  description:
    "Working capital, equipment, receivables, contract, acquisition and enterprise commercial financing pathways through SpherEarth Capital.",
  path: "/financing",
});

export default function FinancingPage() {
  return <FinancingPageContent />;
}
