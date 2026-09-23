"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FinancingPathwaysSection } from "@/components/sections/financing-pathways-section";
import { financingSolutions } from "@/lib/content/financing-solutions";

function FinancingPathwaysFromQuery() {
  const searchParams = useSearchParams();
  const pathway = searchParams.get("pathway");

  return (
    <FinancingPathwaysSection
      solutions={financingSolutions}
      sectionId="financing-page"
      initialPathwaySlug={pathway}
    />
  );
}

export function FinancingPageContent() {
  return (
    <Suspense
      fallback={
        <div className="site-width container-padding py-14 md:py-16">
          <p className="text-sm text-muted-foreground">Loading financing pathways…</p>
        </div>
      }
    >
      <FinancingPathwaysFromQuery />
    </Suspense>
  );
}
