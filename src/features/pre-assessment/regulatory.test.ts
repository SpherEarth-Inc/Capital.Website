import { describe, expect, it } from "vitest";
import {
  canProceedToPayment,
  evaluateRegulatoryRoute,
} from "@/features/pre-assessment/regulatory";

describe("evaluateRegulatoryRoute", () => {
  it("blocks consumer purpose", () => {
    expect(
      evaluateRegulatoryRoute({
        consumerPurpose: "yes",
        realPropertySecurity: "no",
        securitiesBased: "no",
      }),
    ).toBe("consumer_blocked");
  });

  it("requires manual review for property", () => {
    expect(
      evaluateRegulatoryRoute({
        consumerPurpose: "no",
        realPropertySecurity: "yes",
        securitiesBased: "no",
      }),
    ).toBe("manual_review_property");
  });

  it("allows clear commercial path", () => {
    const route = evaluateRegulatoryRoute({
      consumerPurpose: "no",
      realPropertySecurity: "no",
      securitiesBased: "no",
    });
    expect(route).toBe("commercial_clear");
    expect(canProceedToPayment(route)).toBe(true);
  });
});
