import type { PageContent } from "@/types/content";

export const legalPages: Record<string, PageContent> = {
  privacy: {
    title: "Privacy Policy",
    description: "How SpherEarth Capital collects, uses and protects personal information.",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Privacy Policy" }],
    sections: [
      {
        paragraphs: [
          "SpherEarth Inc. | SphèreTerre Inc. respects your privacy. This policy describes how information submitted through SpherEarth Capital digital channels may be collected and used in connection with commercial finance services.",
          "Do not submit sensitive financial documents through general enquiry forms unless specifically instructed through an approved secure process.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    description: "Terms governing use of the SpherEarth Capital website.",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Terms of Use" }],
    sections: [
      {
        paragraphs: [
          "By using capital.spherearth.ca you agree to these Terms of Use. Website content is provided for general information and does not constitute a financing commitment.",
        ],
      },
    ],
  },
  "financial-services-disclaimer": {
    title: "Financial Services Disclaimer",
    description: "Important disclaimers regarding SpherEarth Capital services.",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Financial Services Disclaimer" }],
    sections: [
      {
        paragraphs: [
          "SpherEarth Capital provides commercial finance advisory and facilitation services. SpherEarth is not a bank or lender and does not guarantee financing, rates, amounts or timelines.",
          "Financing is subject to independent underwriting, approval and terms determined by the applicable financing provider.",
        ],
      },
    ],
  },
  "fees-refunds": {
    title: "Fees, Refunds & Cancellation Policy",
    description: "Policy regarding SpherEarth Capital professional fees.",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Fees, Refunds & Cancellation" }],
    sections: [
      {
        paragraphs: [
          "Professional fees are disclosed before payment. Applicable taxes are charged, zero-rated, exempted or otherwise treated according to the nature of the service and SpherEarth's applicable tax obligations.",
          "Refund and cancellation treatment depends on the service stage and applicable terms accepted at checkout.",
        ],
      },
    ],
  },
  security: {
    title: "Security & Data Protection",
    description: "Security practices for SpherEarth Capital digital services.",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Security & Data Protection" }],
    sections: [
      {
        paragraphs: [
          "SpherEarth employs reasonable administrative, technical and organizational measures to protect information submitted through official channels.",
          "Clients should verify official communications before submitting sensitive information or making payments.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie & Analytics Notice",
    description: "How cookies and analytics may be used on capital.spherearth.ca.",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Cookie Notice" }],
    sections: [
      {
        paragraphs: [
          "This site may use cookies and analytics tools to understand traffic, improve performance and measure marketing effectiveness.",
        ],
      },
    ],
  },
  accessibility: {
    title: "Accessibility",
    description: "Accessibility commitment for SpherEarth Capital digital properties.",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Accessibility" }],
    sections: [
      {
        paragraphs: [
          "SpherEarth aims to provide accessible digital experiences. If you encounter accessibility barriers, please contact us through the Enquiry Centre.",
        ],
      },
    ],
  },
  complaints: {
    title: "Complaints",
    description: "How to submit a complaint regarding SpherEarth Capital services.",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Complaints" }],
    sections: [
      {
        paragraphs: [
          "Clients may submit complaints through the Enquiry Centre with sufficient detail for review. SpherEarth will acknowledge and review complaints in accordance with applicable policies.",
        ],
      },
    ],
  },
};
