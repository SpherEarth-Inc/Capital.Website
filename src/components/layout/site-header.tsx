"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ButtonLink } from "@/components/ui/button-link";
import { SiteLogo } from "@/components/layout/site-logo";
import { mainNavigation } from "@/lib/content/navigation";
import type { NavItem } from "@/types/content";
import { cn } from "@/lib/utils";

type HeaderVariant = "sky" | "solid";

/** Always show the bar when scroll is near the top (hero headline / page start). */
const HEADER_ALWAYS_VISIBLE_Y = 56;
/** Ignore tiny scroll jitter before toggling hide/show. */
const HEADER_SCROLL_DELTA = 10;

function useHeaderRevealOnScrollUp(mobileMenuOpen: boolean) {
  const [revealed, setRevealed] = useState(true);
  const lastScrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const measure = () => {
      rafRef.current = null;
      const y = window.scrollY;
      const lastY = lastScrollYRef.current;
      const delta = y - lastY;

      if (mobileMenuOpen) {
        setRevealed(true);
        lastScrollYRef.current = y;
        return;
      }

      if (y <= HEADER_ALWAYS_VISIBLE_Y) {
        setRevealed(true);
      } else if (Math.abs(delta) >= HEADER_SCROLL_DELTA) {
        setRevealed(delta < 0);
      }

      lastScrollYRef.current = y;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(measure);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [mobileMenuOpen]);

  return revealed;
}

function navLinkClass(variant: HeaderVariant) {
  if (variant === "sky") {
    return "rounded-lg px-3 py-2 text-[15px] font-semibold text-brand-navy transition-colors hover:bg-white/40";
  }
  return "rounded-lg px-3 py-2 text-[15px] font-semibold text-brand-navy/90 transition-colors hover:bg-muted/60 hover:text-brand-navy";
}

function DesktopNavItem({ item, variant }: { item: NavItem; variant: HeaderVariant }) {
  const [open, setOpen] = useState(false);

  if (!item.children?.length) {
    return (
      <Link href={item.href} className={navLinkClass(variant)}>
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn("inline-flex items-center gap-1", navLinkClass(variant))}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        {item.label}
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </button>
      <div
        className={cn(
          "absolute left-0 top-full z-50 min-w-[220px] overflow-hidden rounded-2xl border border-border/80 bg-white p-1 shadow-lg transition-all",
          open ? "visible translate-y-1 opacity-100" : "invisible opacity-0",
        )}
      >
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/60 hover:text-brand-green"
            onClick={() => setOpen(false)}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileNavLinks({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate?: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.href}>
          {item.children?.length ? (
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[15px] font-semibold"
                aria-expanded={expanded === item.label}
                onClick={() =>
                  setExpanded((current) => (current === item.label ? null : item.label))
                }
              >
                {item.label}
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform",
                    expanded === item.label && "rotate-180",
                  )}
                />
              </button>
              {expanded === item.label && (
                <ul className="ml-2 space-y-1 border-l border-border pl-3">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onNavigate}
                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-brand-green"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2 text-[15px] font-semibold transition-colors hover:bg-muted/60"
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function useOverHomeHero(isHome: boolean) {
  const [overHero, setOverHero] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }

    const update = () => {
      const hero = document.querySelector("[data-home-hero]");
      if (!hero) {
        setOverHero(true);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setOverHero(rect.bottom > 72);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  return overHero;
}

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/pre-assessment")) {
    return null;
  }

  const isHome = pathname === "/";
  const overHero = useOverHomeHero(isHome);
  const variant: HeaderVariant = overHero ? "sky" : "solid";
  const [open, setOpen] = useState(false);
  const headerRevealed = useHeaderRevealOnScrollUp(open);

  return (
    <header
      aria-hidden={!headerRevealed}
      className={cn(
        "fixed top-0 z-50 w-full border-b transition-[transform,background-color,box-shadow,border-color] duration-300 ease-out",
        headerRevealed ? "translate-y-0" : "pointer-events-none -translate-y-full",
        variant === "sky"
          ? "border-transparent bg-transparent shadow-none"
          : "border-border/80 bg-white shadow-sm shadow-black/[0.03]",
      )}
    >
      <div className="site-width container-padding flex items-center justify-between gap-4 py-3 md:py-4">
        <Link href="/" className="min-w-0 shrink-0 rounded-lg outline-offset-4" aria-label="SpherEarth Capital home">
          <SiteLogo />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main navigation">
          {mainNavigation.map((item) => (
            <DesktopNavItem key={item.href} item={item} variant={variant} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/pre-assessment" variant="brand" size="sm" className="hidden sm:inline-flex">
            Start Pre-Assessment
          </ButtonLink>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-xl border lg:hidden",
                variant === "sky" ? "border-brand-navy/15 text-brand-navy" : "border-border text-foreground",
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <MobileNavLinks items={mainNavigation} onNavigate={() => setOpen(false)} />
              <ButtonLink
                href="/pre-assessment"
                variant="brand"
                className="mt-6 w-full"
                onClick={() => setOpen(false)}
              >
                Start Pre-Assessment
              </ButtonLink>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
