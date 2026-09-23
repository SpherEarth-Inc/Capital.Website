import Link from "next/link";
import { SiteLogo } from "@/components/layout/site-logo";
import { footerNavigation } from "@/lib/content/navigation";
import { siteConfig } from "@/lib/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-white text-foreground">
      <div className="site-width container-padding py-8 md:py-9">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-sm space-y-2">
            <Link href="/" aria-label="SpherEarth Capital home">
              <SiteLogo compact />
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Commercial financing for Canadian businesses.
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-green">
                {siteConfig.contact.email}
              </a>
              <span className="text-border" aria-hidden>
                ·
              </span>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="hover:text-brand-green"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6 sm:gap-x-14">
            <div>
              <p className="mb-2 text-xs font-semibold text-brand-navy">Explore</p>
              <ul className="space-y-1.5">
                {footerNavigation.explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-brand-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-brand-navy">Contact</p>
              <ul className="space-y-1.5">
                {footerNavigation.contact.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-brand-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-2 max-w-[14rem] text-xs leading-snug text-muted-foreground">
                {siteConfig.contact.address}, {siteConfig.contact.city}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border/80 pt-4 md:flex md:items-center md:justify-between md:gap-4">
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-muted-foreground">
            {footerNavigation.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand-green">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground md:mt-0 md:shrink-0">
            &copy; {year} {siteConfig.shortName}
          </p>
        </div>
      </div>
    </footer>
  );
}
