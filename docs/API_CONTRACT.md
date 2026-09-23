# Capital API Contract (stub)

Frontend repo: `Capital.Website`. Backend to implement separately (e.g. Railway service + Postgres).

Base URL env: `CAPITAL_API_BASE_URL` / `NEXT_PUBLIC_CAPITAL_API_URL`

## POST /pre-assessments/drafts

Create or update a Pre-Assessment draft before payment.

**Request body:** all fields from `PreAssessmentFormValues` in `src/features/pre-assessment/schema.ts`, plus optional `attribution`:

```json
{
  "financingAmount": 1000000,
  "financingPurpose": "working-capital",
  "useOfFunds": "...",
  "businessLegalName": "...",
  "attribution": {
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "...",
    "gclid": "...",
    "landingPage": "/",
    "referringUrl": "..."
  }
}
```

**Response:**

```json
{ "draftId": "uuid" }
```

## POST /pre-assessments/checkout

Create payment session or instructions after draft is valid and regulatory route is `commercial_clear`.

**Request:**

```json
{
  "paymentMethod": "card|interac|eft|wire",
  "financingAmount": 1000000,
  "fee": 1000,
  "tax": 130,
  "total": 1130
}
```

**Response:**

```json
{
  "checkoutUrl": "https://...",
  "paymentInstructions": "optional text for manual methods"
}
```

## POST /pre-assessments/{draftId}/finalize

After verified payment, finalize submission and assign reference.

**Response:**

```json
{ "reference": "CAP-2026-123456" }
```

## POST /enquiries

General Enquiry Centre form.

**Request:**

```json
{
  "name": "...",
  "email": "...",
  "company": "...",
  "message": "..."
}
```

**Response:**

```json
{ "ok": true }
```

## Hidden CRM / analytics fields (backend should persist)

- Original lead source, UTM params, GCLID
- Financing amount requested, calculated fee
- Payment transaction ID, status, date
- Lifecycle / pipeline stage, regulatory routing status
- CRM contact/company IDs when integrated

## Google Ads conversion

Fire `Commercial_PreAssessment_Paid` only after:

1. Payment verified server-side
2. Final submission completed

Conversion value = Pre-Assessment fee paid excluding tax. Frontend stub: `src/features/analytics/track-pre-assessment-paid.ts`.
