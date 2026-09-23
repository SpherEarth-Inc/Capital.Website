import type { NavItem } from "@/types/content";

/** Primary desktop/mobile links (logo also links home). */
export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Financing", href: "/financing" },
  { label: "Fees", href: "/fees" },
  { label: "FAQ", href: "/#faq" },
  {
    label: "Resources",
    href: "/eligibility",
    children: [
      { label: "Eligibility", href: "/eligibility" },
      { label: "Trust & security", href: "/trust" },
      { label: "Enquiry Centre", href: "/enquiry-centre" },
      { label: "Enterprise finance", href: "/enterprise-finance" },
      { label: "Insights", href: "/insights" },
      { label: "Partner with us", href: "/partner-with-us" },
    ],
  },
];

export const footerNavigation = {
  explore: [
    { label: "Financing", href: "/financing" },
    { label: "Fees", href: "/fees" },
    { label: "Eligibility", href: "/eligibility" },
    { label: "FAQ", href: "/#faq" },
  ],
  contact: [
    { label: "Enquiry Centre", href: "/enquiry-centre" },
    { label: "Trust & security", href: "/trust" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Financial services disclaimer", href: "/financial-services-disclaimer" },
    { label: "Fees & refunds", href: "/fees-refunds" },
    { label: "Security", href: "/security" },
    { label: "Cookies", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Complaints", href: "/complaints" },
  ],
};
