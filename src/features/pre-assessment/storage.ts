import type { PreAssessmentFormValues } from "@/features/pre-assessment/schema";
import { PRE_ASSESSMENT_STORAGE_KEY } from "@/features/pre-assessment/constants";

export interface StoredPreAssessmentDraft {
  values: PreAssessmentFormValues;
  step: number;
  updatedAt: string;
}

export function loadPreAssessmentDraft(): StoredPreAssessmentDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PRE_ASSESSMENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredPreAssessmentDraft;
  } catch {
    return null;
  }
}

export function savePreAssessmentDraft(draft: StoredPreAssessmentDraft): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PRE_ASSESSMENT_STORAGE_KEY, JSON.stringify(draft));
}

export function clearPreAssessmentDraft(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PRE_ASSESSMENT_STORAGE_KEY);
}
