import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  compact?: boolean;
};

export function SiteLogo({ className, compact = false }: SiteLogoProps) {
  return (
    <span
      className={cn(
        "font-logo leading-none tracking-[-0.02em] text-black",
        compact ? "text-[1.15rem]" : "text-[1.35rem] md:text-[1.55rem]",
        className,
      )}
    >
      SpherEarth Capital
    </span>
  );
}
