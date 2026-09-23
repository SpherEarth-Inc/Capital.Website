export function trackPreAssessmentPaid({
  feePaid,
  reference,
}: {
  feePaid: number;
  reference: string;
}) {
  if (typeof window === "undefined") return;

  // Stub for Google Ads conversion: Commercial_PreAssessment_Paid
  console.info("[analytics stub] Pre-Assessment paid", { feePaid, reference });
}
