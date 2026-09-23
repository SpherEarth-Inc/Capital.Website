"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Client redirect for static export (GitHub Pages) where server `redirect()` is unavailable. */
export function ClientRedirect({ href }: { href: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return (
    <p className="site-width container-padding py-12 text-sm text-muted-foreground">Redirecting…</p>
  );
}
