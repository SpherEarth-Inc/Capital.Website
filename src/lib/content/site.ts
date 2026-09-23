import type { Metadata } from "next";
import { env } from "@/lib/env";

export const siteConfig = {
  name: "SpherEarth Capital & Financial Solutions",
  shortName: "SpherEarth Capital",
  tagline: "Prepare. Position. Finance. Grow.",
  description:
    "Commercial financing assessment, preparation and facilitation for Canadian businesses. Working capital, equipment, acquisitions, contracts and $10M+ financing.",
  url: env.siteUrl,
  ogImage: "/images/og-image.svg",
  contact: {
    email: "capital@spherearth.ca",
    phone: "+1 647 936 2784",
    address: "First Canadian Place, 100 King Street West, Suite 5600",
    city: "Toronto, ON M5X 1C9",
  },
  whatsapp: {
    number: "16479362784",
    safetyNotice:
      "For general enquiries and appointment coordination only. Please do not send bank statements, identification documents, tax records, passwords, account credentials, or other sensitive financial documents through WhatsApp. Secure document instructions are provided when required.",
  },
} as const;

export const siteAssets = {
  homeHero: "/images/home-hero.png",
  howItWorks: "/images/how-it-works.png",
} as const;

export function createMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle =
    title === "Home"
      ? `${siteConfig.shortName} | Business Funding & Commercial Finance`
      : `${title} – ${siteConfig.shortName}`;
  const pageDescription = description ?? siteConfig.description;
  const pageUrl = `${siteConfig.url}${path}`;
  const ogImageUrl = `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: pageDescription,
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.shortName,
      locale: "en_CA",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}
