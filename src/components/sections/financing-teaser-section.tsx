import { FinancingPathwaysSection } from "@/components/sections/financing-pathways-section";
import { financingSolutions } from "@/lib/content/financing-solutions";

const HOME_FINANCING_PREVIEW_COUNT = 3;

export function FinancingTeaserSection() {
  return (
    <FinancingPathwaysSection
      solutions={financingSolutions.slice(0, HOME_FINANCING_PREVIEW_COUNT)}
      showMoreCard
      sectionId="financing"
      navigateCardsToFinancing
    />
  );
}
