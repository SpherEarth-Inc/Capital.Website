import { FinancingPathwaysSection } from "@/components/sections/financing-pathways-section";
import { financingSolutions } from "@/lib/content/financing-solutions";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: "Financing pathways",
  description:
    "Working capital, equipment, receivables, contract, acquisition and enterprise commercial financing pathways through SpherEarth Capital.",
  path: "/financing",
});

export default async function FinancingPage({
  searchParams,
}: {
  searchParams: Promise<{ pathway?: string }>;
}) {
  const { pathway } = await searchParams;

  return (
    <FinancingPathwaysSection
      solutions={financingSolutions}
      sectionId="financing-page"
      initialPathwaySlug={pathway ?? null}
    />
  );
}
