import Link from "next/link";
import type { ReactNode } from "react";
import { SiteLogo } from "@/components/layout/site-logo";

export function PreAssessmentFlowShell({ children }: { children: ReactNode }) {
  return (
    <div
      data-pre-assessment-flow
      className="min-h-svh bg-gradient-to-b from-[#f0f9f0]/90 via-white to-white"
    >
      <div className="site-width container-padding flex items-center justify-between py-5 md:py-6">
        <Link
          href="/"
          className="rounded-lg outline-offset-4"
          aria-label="SpherEarth Capital home"
        >
          <SiteLogo compact />
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold text-muted-foreground transition-colors hover:text-brand-navy"
        >
          Exit
        </Link>
      </div>
      {children}
    </div>
  );
}
