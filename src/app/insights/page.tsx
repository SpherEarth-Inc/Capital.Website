import { PageIntro } from "@/components/sections/page-intro";
import { InsightCard } from "@/components/sections/content-sections";
import { insightArticles } from "@/lib/content/insights";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: "Insights",
  description: "Commercial financing insights from SpherEarth Capital.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageIntro
        title="Insights"
        description="Starter articles on preparing for commercial financing."
      />
      <div className="site-width container-padding w-full max-w-4xl pb-16 pt-8 md:pb-24">
        {insightArticles.map((article) => (
          <InsightCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>
    </>
  );
}
