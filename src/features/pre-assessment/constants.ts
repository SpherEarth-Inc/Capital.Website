export const PRE_ASSESSMENT_STORAGE_KEY = "spherearth-capital-pre-assessment-draft";

export const FINANCING_PURPOSES = [
  { value: "working-capital", label: "Working Capital" },
  { value: "equipment", label: "Equipment / Commercial Assets" },
  { value: "acquisition", label: "Acquisition / Expansion" },
  { value: "contract", label: "Contract / Purchase Order" },
  { value: "receivables", label: "Receivables / Invoice Finance" },
  { value: "major-project", label: "Major Project / Capital Expenditure" },
  { value: "recapitalization", label: "Recapitalization" },
  { value: "other", label: "Other Business Purpose" },
] as const;

export const LEAD_SOURCES = [
  { value: "google-search", label: "Google Search" },
  { value: "google-ads", label: "Google Ads" },
  { value: "referral", label: "Referral" },
  { value: "partner", label: "Partner Introduction" },
  { value: "social", label: "Social Media" },
  { value: "other", label: "Other" },
] as const;

export const WIZARD_STEPS = [
  "Financing Requirement",
  "Business Information",
  "Financial Profile",
  "Transaction Support",
  "Regulatory Routing",
  "Decision Maker",
  "Attribution & Consent",
  "Review & Payment",
] as const;

export type WizardStepIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
