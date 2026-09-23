export const PRE_ASSESSMENT_FEE_RATE = 0.001; // 0.10%
export const PRE_ASSESSMENT_FEE_MIN = 500;
export const PRE_ASSESSMENT_FEE_MAX = 10_000;
export const MANDATE_FEE_RATE = 0.005; // 0.50%
export const SUCCESS_FEE_RATE = 0.02; // 2.00%

export interface PreAssessmentFeeBreakdown {
  financingAmount: number;
  fee: number;
  taxRate: number;
  tax: number;
  total: number;
}

export interface FeeScheduleBreakdown {
  financingAmount: number;
  preAssessment: PreAssessmentFeeBreakdown;
  /** Stage 2 estimate — only if a mandate is accepted later */
  mandateFee: number;
  /** Stage 3 estimate — only if qualifying financing is completed */
  successFee: number;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculatePreAssessmentFee(
  financingAmount: number,
  taxRate = 0.13,
): PreAssessmentFeeBreakdown {
  const rawFee = financingAmount * PRE_ASSESSMENT_FEE_RATE;
  const fee = Math.min(
    Math.max(rawFee, PRE_ASSESSMENT_FEE_MIN),
    PRE_ASSESSMENT_FEE_MAX,
  );
  const tax = roundMoney(fee * taxRate);
  const total = roundMoney(fee + tax);

  return {
    financingAmount,
    fee,
    taxRate,
    tax,
    total,
  };
}

export function calculateFeeSchedule(
  financingAmount: number,
  taxRate = 0.13,
): FeeScheduleBreakdown {
  return {
    financingAmount,
    preAssessment: calculatePreAssessmentFee(financingAmount, taxRate),
    mandateFee: roundMoney(financingAmount * MANDATE_FEE_RATE),
    successFee: roundMoney(financingAmount * SUCCESS_FEE_RATE),
  };
}
