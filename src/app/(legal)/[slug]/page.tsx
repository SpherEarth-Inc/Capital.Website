import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/sections/marketing-page";
import { legalPages } from "@/lib/content/legal";
import { createMetadata } from "@/lib/content/site";

const slugs = Object.keys(legalPages);

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = legalPages[slug as keyof typeof legalPages];
  if (!page) return {};
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/${slug}`,
  });
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = legalPages[slug as keyof typeof legalPages];
  if (!page) notFound();
  return <MarketingPage content={page} />;
}
