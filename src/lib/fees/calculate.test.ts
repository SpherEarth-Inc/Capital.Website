import { describe, expect, it } from "vitest";
import { calculateFeeSchedule, calculatePreAssessmentFee } from "@/lib/fees/calculate";

describe("calculatePreAssessmentFee", () => {
  it("applies minimum fee", () => {
    expect(calculatePreAssessmentFee(100_000, 0).fee).toBe(500);
  });

  it("calculates percentage within bounds", () => {
    expect(calculatePreAssessmentFee(1_000_000, 0).fee).toBe(1000);
  });

  it("applies maximum fee", () => {
    expect(calculatePreAssessmentFee(20_000_000, 0).fee).toBe(10_000);
  });
});

describe("calculateFeeSchedule", () => {
  it("includes mandate and success fee estimates", () => {
    const schedule = calculateFeeSchedule(1_000_000, 0);
    expect(schedule.preAssessment.fee).toBe(1000);
    expect(schedule.mandateFee).toBe(5000);
    expect(schedule.successFee).toBe(20_000);
  });
});
