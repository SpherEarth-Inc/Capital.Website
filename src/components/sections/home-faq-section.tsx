import { FaqList } from "@/components/sections/content-sections";
import { faqItems } from "@/lib/content/faq";

export function HomeFaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border/60 bg-white py-14 md:py-16">
      <div className="site-width container-padding">
        <div className="max-w-lg">
          <p className="text-sm font-semibold tracking-tight text-brand-green md:text-base">FAQ</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
            Common questions
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Fees, process, and what to expect.
          </p>
        </div>
        <div className="mt-8 md:mt-10">
          <FaqList items={faqItems} embedded />
        </div>
      </div>
    </section>
  );
}
