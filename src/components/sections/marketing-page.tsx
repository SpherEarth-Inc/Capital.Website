import type { PageContent } from "@/types/content";
import { PageIntro } from "@/components/sections/page-intro";
import { ContentSections } from "@/components/sections/content-sections";

export function MarketingPage({ content }: { content: PageContent }) {
  return (
    <>
      <PageIntro title={content.title} description={content.description} />
      <ContentSections sections={content.sections} />
    </>
  );
}
