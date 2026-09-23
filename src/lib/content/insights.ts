import type { InsightArticle } from "@/types/content";

export const insightArticles: InsightArticle[] = [
  {
    slug: "prepare-for-commercial-financing",
    title: "Preparing for Commercial Financing",
    description:
      "How established Canadian businesses can prepare documentation, use of funds and repayment narrative before approaching financing providers.",
    sections: [
      {
        title: "Start With the Transaction Story",
        paragraphs: [
          "Financing providers assess whether the commercial purpose, repayment source and supporting fundamentals make sense before they discuss structure or pricing.",
        ],
      },
      {
        title: "Organize What You Already Have",
        bullets: [
          "Recent financial statements or management accounts",
          "Revenue and cash-flow summary",
          "Use-of-funds breakdown",
          "Existing debt schedule",
          "Key contracts or assets supporting the opportunity",
        ],
      },
    ],
  },
  {
    slug: "commercial-financing-structures",
    title: "Choosing the Right Financing Structure",
    description:
      "Working capital, equipment, receivables, contract and acquisition pathways each carry different underwriting expectations.",
    sections: [
      {
        title: "Match Structure to Purpose",
        paragraphs: [
          "A credible structure aligns the financing type with how the business will deploy capital and generate repayment capacity.",
        ],
      },
    ],
  },
  {
    slug: "after-commercial-finance-mandate",
    title: "What Happens After a Financing Mandate Begins",
    description:
      "What clients can expect after SpherEarth accepts a Commercial Finance Mandate and substantive preparation begins.",
    sections: [
      {
        title: "Mandate Work Is Substantive",
        paragraphs: [
          "Following mandate acceptance, SpherEarth may coordinate financing strategy, transaction preparation, provider identification and client-authorized introductions.",
        ],
      },
    ],
  },
];

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insightArticles.find((article) => article.slug === slug);
}
