import { sitePath } from "@/lib/utils";

export type FinancingSolutionLayout = "feature" | "default";

export interface FinancingSolution {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  href: string;
  ctaLabel: string;
  details: string[];
  layout: FinancingSolutionLayout;
}

export function financingPathwayHref(slug: string) {
  return `/financing?pathway=${encodeURIComponent(slug)}`;
}

export const financingSolutions: FinancingSolution[] = [
  {
    slug: "working-capital",
    title: "Working capital & growth",
    tagline: "Inventory, payroll, and expansion.",
    image: sitePath("/images/home-hero2.png"),
    href: "/pre-assessment",
    ctaLabel: "Begin Pre-Assessment",
    details: [
      "For established businesses that need capital for inventory, payroll, seasonal gaps, marketing, or new locations.",
      "SpherEarth helps you clarify the requirement and pursue lender options that fit documented business use.",
    ],
    layout: "feature",
  },
  {
    slug: "equipment",
    title: "Equipment & assets",
    tagline: "Machinery, fleet, and tech.",
    image: sitePath("/images/equipment-finance.jpg"),
    href: "/pre-assessment",
    ctaLabel: "Begin Pre-Assessment",
    details: [
      "Construction, manufacturing, fleet, restaurant, medical, technology, and other productive assets.",
      "We coordinate assessment and preparation when asset-backed structures may apply.",
    ],
    layout: "default",
  },
  {
    slug: "receivables",
    title: "Invoice & receivables",
    tagline: "Factoring and ABL facilities.",
    image: sitePath("/images/invoice-finance.jpg"),
    href: "/pre-assessment",
    ctaLabel: "Begin Pre-Assessment",
    details: [
      "Invoice factoring, receivables financing, and asset-based lines where eligible receivables or assets support the facility.",
      "Useful when cash flow timing—not lack of revenue—is the constraint.",
    ],
    layout: "default",
  },
  {
    slug: "contract",
    title: "Contract & PO finance",
    tagline: "Mobilize awarded work.",
    image: sitePath("/images/purchase-order.jpg"),
    href: "/pre-assessment",
    ctaLabel: "Begin Pre-Assessment",
    details: [
      "Funding to buy materials, stock inventory, mobilize teams, meet payroll, or secure equipment for awarded work.",
      "Structured around the contract or purchase order and your delivery plan.",
    ],
    layout: "default",
  },
  {
    slug: "acquisition",
    title: "Expansion & acquisition",
    tagline: "Buyouts and new locations.",
    image: sitePath("/images/how-it-works.png"),
    href: "/pre-assessment",
    ctaLabel: "Begin Pre-Assessment",
    details: [
      "Acquisitions, strategic expansion, additional locations, recapitalization, and major capital events.",
      "We help frame the transaction and lender conversation at a commercial finance level.",
    ],
    layout: "default",
  },
  {
    slug: "enterprise",
    title: "Mid-market & enterprise",
    tagline: "$1M–$10M+ mandates.",
    image: sitePath("/images/home-hero.png"),
    href: "/enterprise-finance",
    ctaLabel: "Discuss a $10M+ requirement",
    details: [
      "Mid-market mandates from about $1M to $10M and larger enterprise processes where fundamentals justify a serious run.",
      "Executive-led preparation, provider identification, and coordination under mandate where accepted.",
    ],
    layout: "default",
  },
];
