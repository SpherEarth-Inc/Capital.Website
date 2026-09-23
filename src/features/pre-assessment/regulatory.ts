export type RegulatoryRoute =
  | "commercial_clear"
  | "consumer_blocked"
  | "manual_review_property"
  | "manual_review_securities";

export interface RegulatoryInput {
  consumerPurpose: string;
  realPropertySecurity: string;
  securitiesBased: string;
}

export function evaluateRegulatoryRoute(input: RegulatoryInput): RegulatoryRoute {
  if (input.consumerPurpose === "yes") {
    return "consumer_blocked";
  }

  if (input.realPropertySecurity === "yes" || input.realPropertySecurity === "unsure") {
    return "manual_review_property";
  }

  if (input.securitiesBased === "yes" || input.securitiesBased === "unsure") {
    return "manual_review_securities";
  }

  return "commercial_clear";
}

export function canProceedToPayment(route: RegulatoryRoute): boolean {
  return route === "commercial_clear";
}

export function regulatoryRouteMessage(route: RegulatoryRoute): string | null {
  switch (route) {
    case "consumer_blocked":
      return "This service is designed for business-purpose commercial financing. Please use the Enquiry Centre if you believe the transaction has a legitimate commercial component requiring clarification.";
    case "manual_review_property":
      return "Real-property-secured financing requires manual classification before SpherEarth accepts a paid Commercial Financing Pre-Assessment.";
    case "manual_review_securities":
      return "Securities-based financing requires separate regulatory classification. Payment is not required at this stage.";
    default:
      return null;
  }
}
