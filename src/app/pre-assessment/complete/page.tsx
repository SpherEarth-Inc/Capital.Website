import { ButtonLink } from "@/components/ui/button-link";
import { createMetadata } from "@/lib/content/site";

export const metadata = createMetadata({
  title: "Payment Confirmed",
  description: "Your SpherEarth Pre-Assessment submission has been received.",
  path: "/pre-assessment/complete",
  noIndex: true,
});

export default function PreAssessmentCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  return (
    <div className="site-width container-padding pb-12 md:pb-16">
      <div className="mx-auto w-full max-w-xl rounded-xl border border-border/70 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold text-brand-green">Pre-Assessment</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          Thank you
        </h1>
        <CompleteReference searchParams={searchParams} />
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Your payment has been verified and your submission is received. SpherEarth will
          contact you using your preferred method. Where appropriate, executive virtual
          consultation is ordinarily targeted within five business days after sufficient
          information and payment.
        </p>
        <ButtonLink href="/" variant="brand" className="mt-8" size="lg">
          Return home
        </ButtonLink>
      </div>
    </div>
  );
}

async function CompleteReference({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const reference = params.ref ?? "CAP-2026-000000";

  return (
    <p className="mt-4 text-sm text-muted-foreground">
      Reference:{" "}
      <span className="font-mono font-semibold text-brand-navy">{reference}</span>
    </p>
  );
}
