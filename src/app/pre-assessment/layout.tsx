import { PreAssessmentFlowShell } from "@/components/layout/pre-assessment-flow-shell";

export default function PreAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PreAssessmentFlowShell>{children}</PreAssessmentFlowShell>;
}
