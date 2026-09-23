import { notFound } from "next/navigation";
import { ContentSections } from "@/components/sections/content-sections";
import { PageIntro } from "@/components/sections/page-intro";
import { getInsightBySlug } from "@/lib/content/insights";
import { createMetadata } from "@/lib/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [
    { slug: "prepare-for-commercial-financing" },
    { slug: "commercial-financing-structures" },
    { slug: "after-commercial-finance-mandate" },
  ];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return {};
  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${slug}`,
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <PageIntro title={article.title} description={article.description} eyebrow="Insights" />
      <ContentSections sections={article.sections} />
    </>
  );
}
