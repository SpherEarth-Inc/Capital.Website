import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FinancingMoreCard({ className }: { className?: string }) {
  return (
    <Link
      href="/financing"
      className={cn(
        "group relative isolate flex w-full flex-col overflow-hidden rounded-sm border border-dashed border-border bg-muted/30 text-left shadow-sm",
        "aspect-[2/3] transition duration-300 ease-out hover:-translate-y-1 hover:border-brand-green/40 hover:bg-muted/50 hover:shadow-md",
        className,
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <span className="flex size-11 items-center justify-center rounded-full border border-border bg-white text-brand-navy transition duration-300 group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-white">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
        <p className="mt-4 text-base font-semibold text-brand-navy">More pathways</p>
        <p className="mt-1 text-sm text-muted-foreground">View all financing types</p>
      </div>
    </Link>
  );
}
