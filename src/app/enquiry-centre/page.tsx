import { Suspense } from "react";
import { PageIntro } from "@/components/sections/page-intro";
import { EnquiryForm } from "@/features/enquiry";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: "Enquiry Centre",
  description: "General enquiries for SpherEarth Capital commercial finance services.",
  path: "/enquiry-centre",
});

export default function EnquiryCentrePage() {
  return (
    <>
      <PageIntro
        title="Enquiry Centre"
        description="General enquiries and appointment coordination. Do not send sensitive financial documents."
      />
      <div className="site-width container-padding pb-16 pt-8 md:pb-24">
        <Suspense fallback={<p className="text-muted-foreground">Loading form...</p>}>
          <EnquiryForm />
        </Suspense>
      </div>
    </>
  );
}
