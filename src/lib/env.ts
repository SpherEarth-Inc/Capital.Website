const DEFAULT_SITE_URL = "https://capital.spherearth.ca";
const DEFAULT_TAX_RATE = 0.13;

function readNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
  capitalApiBaseUrl:
    process.env.CAPITAL_API_BASE_URL ??
    process.env.NEXT_PUBLIC_CAPITAL_API_URL ??
    "",
  preAssessmentTaxRate: readNumber(
    process.env.NEXT_PUBLIC_PRE_ASSESSMENT_TAX_RATE,
    DEFAULT_TAX_RATE,
  ),
} as const;

export function isApiConfigured(): boolean {
  return env.capitalApiBaseUrl.trim().length > 0;
}
