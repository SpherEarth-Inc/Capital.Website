import { MarketingPage } from "@/components/sections/marketing-page";
import { enterpriseFinanceContent } from "@/lib/content/pages";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: enterpriseFinanceContent.title,
  description: enterpriseFinanceContent.description,
  path: "/enterprise-finance",
});

export default function EnterpriseFinancePage() {
  return <MarketingPage content={enterpriseFinanceContent} />;
}
