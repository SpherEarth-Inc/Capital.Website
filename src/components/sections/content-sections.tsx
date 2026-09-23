import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentSection } from "@/types/content";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

export function ContentSectionList({
  sections,
  className,
}: {
  sections: ContentSection[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-14 md:space-y-16", className)}>
      {sections.map((section, index) => (
        <section key={section.id ?? section.title ?? index} className="w-full max-w-4xl">
          {section.title && (
            <h2 className="text-xl font-semibold text-brand-navy md:text-2xl">
              {section.title}
            </h2>
          )}
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-3 text-base leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
          {section.cta && (
            <ButtonLink href={section.cta.href} variant="brand" className="mt-6">
              {section.cta.label}
              <ArrowRight className="size-4" />
            </ButtonLink>
          )}
        </section>
      ))}
    </div>
  );
}

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="site-width container-padding pb-16 pt-8 md:pb-24 md:pt-10">
      <ContentSectionList sections={sections} />
    </div>
  );
}

export function FaqList({
  items,
  embedded = false,
}: {
  items: { question: string; answer: string }[];
  /** When true, omit page shell padding (e.g. home section). */
  embedded?: boolean;
}) {
  const list = (
    <div className="w-full max-w-4xl divide-y divide-border">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="cursor-pointer list-none text-lg font-medium marker:content-none">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="text-brand-green transition-transform group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );

  if (embedded) return list;

  return (
    <div className="site-width container-padding pb-16 pt-8 md:pb-24">{list}</div>
  );
}

export function InsightCard({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group block border-b border-border py-6 transition-colors hover:border-brand-green"
    >
      <h3 className="text-xl font-semibold group-hover:text-brand-green">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-green">
        Read insight <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
