import { cn } from "@/lib/utils";

interface PageIntroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  bare?: boolean;
}

export function PageIntro({ title, description, eyebrow, className, bare }: PageIntroProps) {
  return (
    <div className={cn(!bare && "site-width container-padding pt-10 md:pt-12", className)}>
      {eyebrow ? (
        <p className="text-sm font-medium text-brand-green">{eyebrow}</p>
      ) : null}
      <h1
        className={cn(
          "w-full max-w-3xl text-3xl font-semibold tracking-tight text-brand-navy md:text-4xl",
          eyebrow && "mt-2",
        )}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-3 w-full max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
