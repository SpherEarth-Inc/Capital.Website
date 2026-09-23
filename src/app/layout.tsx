import { DM_Serif_Display, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppWidget } from "@/components/layout/whatsapp-widget";
import { Toaster } from "@/components/ui/sonner";
import { createMetadata, siteConfig } from "@/lib/content/site";
import "@/lib/fontawesome";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-logo-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = createMetadata({
  title: "Home",
  description: siteConfig.description,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-CA"
      className={`${spaceGrotesk.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1 pt-[4.25rem] has-[[data-home-hero]]:pt-0 has-[[data-pre-assessment-flow]]:pt-0">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppWidget />
        <Toaster />
      </body>
    </html>
  );
}
