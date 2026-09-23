"use client";

import { useSearchParams } from "next/navigation";

export function CompleteReference() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref") ?? "CAP-2026-000000";

  return (
    <p className="mt-4 text-sm text-muted-foreground">
      Reference:{" "}
      <span className="font-mono font-semibold text-brand-navy">{reference}</span>
    </p>
  );
}
