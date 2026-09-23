import { apiFetch } from "@/lib/api/client";
import type { PreAssessmentFormValues } from "@/features/pre-assessment/schema";
import type { UtmParams } from "@/hooks/use-utms";

export interface CreateDraftRequest extends PreAssessmentFormValues {
  attribution?: UtmParams;
}

export interface CreateDraftResponse {
  draftId: string;
}

export interface CreateCheckoutRequest {
  paymentMethod: string;
  financingAmount: number;
  fee: number;
  tax: number;
  total: number;
}

export interface CreateCheckoutResponse {
  checkoutUrl?: string;
  paymentInstructions?: string;
}

export interface FinalizeSubmissionResponse {
  reference: string;
}

export async function createDraft(
  payload: CreateDraftRequest,
): Promise<CreateDraftResponse> {
  return apiFetch<CreateDraftResponse>("/pre-assessments/drafts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createCheckout(
  payload: CreateCheckoutRequest,
): Promise<CreateCheckoutResponse> {
  return apiFetch<CreateCheckoutResponse>("/pre-assessments/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function finalizeSubmission(
  draftId: string,
): Promise<FinalizeSubmissionResponse> {
  return apiFetch<FinalizeSubmissionResponse>(
    `/pre-assessments/${draftId}/finalize`,
    { method: "POST" },
  );
}
