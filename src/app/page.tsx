import { FinancingTeaserSection } from "@/components/sections/financing-teaser-section";
import { HomeFaqSection } from "@/components/sections/home-faq-section";
import { HomeHowItWorksPanel } from "@/components/sections/home-how-it-works-section";
import { HomeHeroScroll } from "@/components/sections/home-hero-scroll";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Commercial financing assessment, preparation and facilitation for Canadian businesses.",
  path: "/",
});

export default function HomePage() {
  return (
    <HomeHeroScroll panelContent={<HomeHowItWorksPanel />}>
      <FinancingTeaserSection />
      <HomeFaqSection />
    </HomeHeroScroll>
  );
}
