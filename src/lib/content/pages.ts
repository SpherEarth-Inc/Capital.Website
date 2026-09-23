import type { PageContent } from "@/types/content";

export const homeContent = {
  announcement:
    "Commercial financing for established Canadian businesses — from growth capital to $10M+ enterprise mandates.",
  hero: {
    heading: "Funding is easy",
    supporting:
      "Start a Pre-Assessment today and see what lenders may be willing to offer your business.",
    primaryCta: { label: "Begin Pre-Assessment", href: "/pre-assessment" },
  },
  howItWorksPanel: {
    eyebrow: "Ready to get funding?",
    title: "How it works",
    lead: "SpherEarth Capital helps Canadian businesses pursue commercial loans—from first review to lender coordination.",
  },
};

export const howItWorksContent: PageContent = {
  title: "How Commercial Finance Facilitation Works",
  description:
    "Understand SpherEarth Capital's commercial finance process from Pre-Assessment through mandate preparation and financing-provider coordination.",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "How It Works" }],
  sections: [
    {
      title: "Assess → Prepare → Structure → Introduce → Coordinate → Close",
      paragraphs: [
        "SpherEarth Capital helps Canadian businesses approach commercial financing with professional preparation rather than scattered applications.",
        "The process begins with a paid SpherEarth Commercial Financing Pre-Assessment™, continues through consultation and mandate acceptance where appropriate, and may proceed to financing-provider outreach and closing coordination.",
      ],
      cta: { label: "Start Pre-Assessment", href: "/pre-assessment" },
    },
    {
      title: "Stage 1 — Pre-Assessment",
      paragraphs: [
        "A professional review of your business profile, financing objective, amount requested, use of funds, operating history, cash-flow profile, obligations, repayment strategy, collateral or transaction support, documentation readiness, potential structure, regulatory classification and preliminary financing-provider fit.",
      ],
    },
    {
      title: "Stage 2 — Commercial Finance Mandate",
      paragraphs: [
        "Where SpherEarth accepts the mandate after Pre-Assessment and consultation, substantive transaction preparation, financing strategy, provider identification and coordination may proceed under a Commercial Finance Mandate Agreement.",
      ],
    },
    {
      title: "Stage 3 — Successful Financing",
      paragraphs: [
        "Where qualifying financing is completed under the Mandate Agreement, SpherEarth's Success / Facilitation Fee applies to financing actually funded, advanced, drawn or otherwise made available.",
      ],
    },
  ],
};

export const financingSolutionsContent: PageContent = {
  title: "Commercial Financing Solutions",
  description:
    "Explore working capital, equipment, receivables, contract, acquisition and enterprise commercial financing pathways through SpherEarth Capital.",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Financing Solutions" }],
  sections: [
    {
      title: "Working Capital & Growth Financing",
      paragraphs: [
        "For established businesses requiring capital for inventory, payroll, seasonal working capital, expansion, marketing, new locations or other documented business purposes.",
      ],
      cta: { label: "Start Pre-Assessment", href: "/pre-assessment" },
    },
    {
      title: "Equipment & Commercial Asset Financing",
      paragraphs: [
        "Construction equipment, manufacturing machinery, trucks, fleet assets, restaurant equipment, medical or professional equipment, technology assets and other productive business assets.",
      ],
      cta: { label: "Start Pre-Assessment", href: "/pre-assessment" },
    },
    {
      title: "Invoice, Receivables & Asset-Based Financing",
      paragraphs: [
        "Invoice factoring, accounts receivable financing, asset-based facilities and receivables-backed working capital where eligible receivables or assets may support the structure.",
      ],
      cta: { label: "Start Pre-Assessment", href: "/pre-assessment" },
    },
    {
      title: "Contract & Purchase Order Financing",
      paragraphs: [
        "Financing to purchase materials, acquire inventory, mobilize personnel, meet payroll, obtain equipment or execute awarded commercial work.",
      ],
      cta: { label: "Start Pre-Assessment", href: "/pre-assessment" },
    },
    {
      title: "Business Expansion & Acquisition Financing",
      paragraphs: [
        "Business acquisitions, strategic expansion, additional locations, recapitalization, significant equipment purchases and other qualifying commercial transactions.",
      ],
      cta: { label: "Start Pre-Assessment", href: "/pre-assessment" },
    },
    {
      title: "Mid-Market, Enterprise & Major Commercial Financing",
      paragraphs: [
        "$1 million to $10 million mid-market mandates and $10 million+ enterprise mandates where the transaction, repayment strategy and supporting fundamentals justify a serious financing process.",
      ],
      cta: { label: "Discuss a $10M+ Requirement", href: "/enterprise-finance" },
    },
  ],
};

export const eligibilityContent: PageContent = {
  title: "Eligibility & readiness",
  description:
    "Who we serve and what we typically expect before a Pre-Assessment proceeds.",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Eligibility" }],
  sections: [
    {
      title: "Built for serious commercial opportunities",
      paragraphs: [
        "Availability depends on the transaction and the underwriting requirements of the applicable financing provider.",
      ],
    },
    {
      title: "What We Typically Look For",
      bullets: [
        "Legitimate business-purpose financing",
        "Established operating history where appropriate",
        "Sustainable revenue and cash flow",
        "Clear use of funds and repayment strategy",
        "Appropriate documentation readiness",
        "Experienced ownership and management",
      ],
    },
    {
      title: "Regulatory boundaries",
      paragraphs: [
        "Consumer-purpose, real-property-secured and securities-based transactions may require separate classification and may not use the standard Pre-Assessment funnel.",
      ],
      cta: { label: "Read Eligibility & Regulatory Boundaries", href: "/trust" },
    },
  ],
};

export const feesContent: PageContent = {
  title: "Fees",
  description:
    "Enter your financing amount in the calculator to see fees for all three stages.",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Fees" }],
  sections: [
    {
      title: "Pre-Assessment",
      paragraphs: ["Due when you start. Not a lender fee or a guarantee of funding."],
    },
    {
      title: "Mandate",
      paragraphs: ["Only if we accept your file after Pre-Assessment."],
    },
    {
      title: "Success fee",
      paragraphs: ["Only when financing completes."],
    },
  ],
};

export const enterpriseFinanceContent: PageContent = {
  title: "$10M+ Enterprise & Commercial Financing",
  description:
    "SpherEarth Capital evaluates mid-market, enterprise and major commercial financing mandates including credible requirements of $10 million and above.",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Enterprise Finance" }],
  sections: [
    {
      title: "Major Commercial Mandates",
      paragraphs: [
        "SpherEarth evaluates larger commercial financing mandates where the business, transaction, repayment strategy and supporting fundamentals justify a serious financing process.",
        "Larger transactions receive enhanced commercial, financial and regulatory review before SpherEarth accepts a mandate.",
      ],
    },
    {
      title: "Typical Enterprise Requirements",
      bullets: [
        "Major acquisitions or recapitalization",
        "Major equipment / capital expenditure",
        "Large contract or project finance",
        "Working-capital facilities at scale",
        "Multi-entity or complex capital structures",
      ],
      cta: { label: "Start Pre-Assessment", href: "/pre-assessment" },
    },
  ],
};

export const partnerContent: PageContent = {
  title: "Partner With SpherEarth Capital",
  description:
    "Commercial finance partnerships connecting appropriately prepared business opportunities with financing providers.",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Partner With Us" }],
  sections: [
    {
      title: "Building a Commercial Finance Network",
      paragraphs: [
        "SpherEarth Capital is building a diversified commercial-finance network designed to connect appropriately prepared business opportunities with financing providers whose products, criteria and transaction capabilities may fit the client's needs.",
      ],
    },
    {
      title: "Who Should Reach Out",
      bullets: [
        "Financing providers and institutional lenders",
        "Referral partners and professional advisers",
        "Brokers and intermediaries with commercial mandates",
        "Industry associations and enterprise networks",
      ],
      cta: { label: "Contact Enquiry Centre", href: "/enquiry-centre" },
    },
  ],
};

export const trustContent: PageContent = {
  title: "Trust & Security Centre",
  description:
    "Official communications, fraud prevention and secure handling expectations for SpherEarth Capital clients.",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Trust & Security" }],
  sections: [
    {
      title: "Verify Before You Pay",
      paragraphs: [
        "Before sharing sensitive information or making a payment, confirm you are dealing with SpherEarth Capital through an official channel.",
        "Pay only to payment instructions issued through an official SpherEarth channel. SpherEarth Capital will not instruct clients to pay Pre-Assessment fees into an employee's or representative's personal bank account.",
      ],
    },
    {
      title: "Sensitive Documents",
      paragraphs: [
        "Do not upload bank statements, tax records, identification documents or other sensitive financial documents on the public Pre-Assessment form.",
        "Secure document instructions are provided when required through an approved process.",
      ],
      cta: { label: "Official Communications", href: "/trust/official-communications" },
    },
  ],
};

export const officialCommunicationsContent: PageContent = {
  title: "Official Communications & Fraud Prevention",
  description:
    "How to verify legitimate SpherEarth Capital communications and protect yourself from fraud.",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Trust & Security", href: "/trust" },
    { label: "Official Communications" },
  ],
  sections: [
    {
      title: "Official Channels",
      bullets: [
        "Website: capital.spherearth.ca",
        "Business email domains used by SpherEarth Inc.",
        "Official payment instructions issued through verified SpherEarth channels",
      ],
    },
    {
      title: "Red Flags",
      bullets: [
        "Requests to pay fees to personal bank accounts",
        "Pressure to send sensitive documents via WhatsApp or unsecured email",
        "Guaranteed financing claims before underwriting",
        "Unusual payment methods not listed on official instructions",
      ],
    },
  ],
};

export const bookConsultationContent: PageContent = {
  title: "Book Executive Consultation",
  description:
    "Executive virtual consultation is ordinarily available after a paid Pre-Assessment and sufficient preliminary information.",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Book Consultation" }],
  sections: [
    {
      title: "After Your Paid Pre-Assessment",
      paragraphs: [
        "Where an executive virtual consultation forms part of an accepted paid Pre-Assessment, SpherEarth ordinarily targets scheduling within five business days after payment and receipt of sufficient preliminary information.",
        "Appropriate in-person meetings may ordinarily be scheduled within fifteen business days, subject to availability, location and agreed arrangements.",
      ],
      cta: { label: "Start Pre-Assessment", href: "/pre-assessment" },
    },
  ],
};

export const secureDocumentsContent: PageContent = {
  title: "Secure Document Centre",
  description:
    "How SpherEarth Capital handles sensitive financial documentation after initial Pre-Assessment.",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Secure Documents" }],
  sections: [
    {
      title: "Not Available on the Public Form",
      paragraphs: [
        "Detailed financial documentation should only be requested later through an approved secure process — not through the initial public Pre-Assessment form, WhatsApp or general email attachments.",
      ],
    },
    {
      title: "Future Authenticated Access",
      paragraphs: [
        "Where appropriate, clients may receive secure upload instructions after SpherEarth accepts further engagement. An authenticated document centre may be introduced in a future release.",
      ],
    },
  ],
};

export const preAssessmentTermsContent: PageContent = {
  title: "SpherEarth Commercial Financing Pre-Assessment™ — Service Terms",
  description: "Service terms governing the SpherEarth Commercial Financing Pre-Assessment.",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Pre-Assessment Terms" },
  ],
  sections: [
    {
      title: "Nature of the Service",
      paragraphs: [
        "The Pre-Assessment is a professional commercial advisory service intended to help SpherEarth understand and evaluate a proposed business-purpose financing requirement at a preliminary level.",
      ],
    },
    {
      title: "What the Pre-Assessment Is Not",
      bullets: [
        "Not a loan application or lender approval",
        "Not a guarantee of financing, rates, amounts or timelines",
        "Not legal, tax or accounting advice",
        "Not automatic acceptance into a Commercial Finance Mandate",
      ],
    },
    {
      title: "Fee",
      paragraphs: [
        "The standard Pre-Assessment Fee is 0.10% of the financing amount sought, subject to a minimum of CAD $500 and a maximum of CAD $10,000, plus applicable taxes where required. The exact fee is displayed before payment.",
      ],
    },
  ],
};
