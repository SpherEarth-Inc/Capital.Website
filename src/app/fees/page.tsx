import { FeeCalculatorPanel } from "@/components/sections/fee-calculator-panel";
import { FeesPageMain } from "@/components/sections/fees-page-main";
import { feesContent } from "@/lib/content/pages";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: feesContent.title,
  description: feesContent.description,
  path: "/fees",
});

export default function FeesPage() {
  return (
    <div className="bg-white">
      <div className="site-width container-padding pb-16 pt-10 md:pb-20 md:pt-12">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-12">
          <FeesPageMain />
          <FeeCalculatorPanel className="lg:sticky lg:top-24" />
        </div>
      </div>
    </div>
  );
}
