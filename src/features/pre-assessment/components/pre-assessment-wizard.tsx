"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  CurrencyInput,
  FormField,
  NativeSelect,
  RadioGroup,
} from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { WIZARD_STEPS } from "@/features/pre-assessment/constants";
import { calculatePreAssessmentFee } from "@/features/pre-assessment/fee";
import {
  canProceedToPayment,
  evaluateRegulatoryRoute,
  regulatoryRouteMessage,
} from "@/features/pre-assessment/regulatory";
import {
  defaultPreAssessmentValues,
  preAssessmentSchema,
  stepFields,
  type PreAssessmentFormValues,
} from "@/features/pre-assessment/schema";
import {
  clearPreAssessmentDraft,
  loadPreAssessmentDraft,
  savePreAssessmentDraft,
} from "@/features/pre-assessment/storage";
import { PaymentMethodChooser } from "@/features/pre-assessment/components/payment-method-chooser";
import { useUtms } from "@/hooks/use-utms";
import { createCheckout, createDraft } from "@/lib/api/pre-assessment";
import { env } from "@/lib/env";
import { formatCad } from "@/lib/utils";
import { FINANCING_PURPOSES, LEAD_SOURCES } from "@/features/pre-assessment/constants";

export function PreAssessmentWizard() {
  const utms = useUtms();
  const [step, setStep] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const form = useForm<PreAssessmentFormValues>({
    resolver: zodResolver(preAssessmentSchema),
    defaultValues: defaultPreAssessmentValues,
    mode: "onChange",
  });

  const values = form.watch();

  useEffect(() => {
    const draft = loadPreAssessmentDraft();
    if (draft) {
      form.reset(draft.values);
      setStep(draft.step);
    }
  }, [form]);

  useEffect(() => {
    savePreAssessmentDraft({
      values,
      step,
      updatedAt: new Date().toISOString(),
    });
  }, [values, step]);

  const feeBreakdown = useMemo(
    () => calculatePreAssessmentFee(values.financingAmount, env.preAssessmentTaxRate),
    [values.financingAmount],
  );

  const regulatoryRoute = evaluateRegulatoryRoute({
    consumerPurpose: values.consumerPurpose,
    realPropertySecurity: values.realPropertySecurity,
    securitiesBased: values.securitiesBased,
  });

  const regulatoryMessage = regulatoryRouteMessage(regulatoryRoute);
  const paymentAllowed = canProceedToPayment(regulatoryRoute);

  async function goNext() {
    const fields = stepFields[step];
    const valid = fields.length === 0 ? true : await form.trigger(fields);
    if (!valid) return;

    if (step === 5 && values.authorizedDecisionMaker !== "yes") {
      form.setError("authorizedDecisionMaker", {
        message: "You must be authorized to proceed",
      });
      return;
    }

    if (step === 4 && !paymentAllowed) {
      toast.message("Manual review required", {
        description: regulatoryMessage ?? "This request cannot proceed to payment yet.",
      });
      return;
    }

    setStep((current) => Math.min(current + 1, WIZARD_STEPS.length - 1));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  async function handleProceedToPayment() {
    const valid = await form.trigger();
    if (!valid) return;
    if (!paymentAllowed) {
      toast.error(regulatoryMessage ?? "Payment is not available for this route.");
      return;
    }

    try {
      await createDraft({ ...values, attribution: utms });
      await createCheckout({
        paymentMethod: selectedPaymentMethod,
        financingAmount: values.financingAmount,
        fee: feeBreakdown.fee,
        tax: feeBreakdown.tax,
        total: feeBreakdown.total,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Backend not connected yet.");
    }
  }

  const progress = ((step + 1) / WIZARD_STEPS.length) * 100;

  return (
    <div className="site-width container-padding pb-12 md:pb-16">
      <div className="mx-auto w-full max-w-xl">
        <p className="text-sm font-semibold text-brand-green">Pre-Assessment</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          {WIZARD_STEPS[step]}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Step {step + 1} of {WIZARD_STEPS.length}
        </p>
        <div
          className="mt-4 h-1 overflow-hidden rounded-full bg-muted/80"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={WIZARD_STEPS.length}
        >
          <div
            className="h-full rounded-full bg-brand-green transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form
        className="mx-auto mt-8 w-full max-w-xl space-y-6 rounded-xl border border-border/70 bg-white p-6 shadow-sm md:p-8"
        onSubmit={(event) => event.preventDefault()}
      >
        {step === 0 && (
          <>
            <FormField label="Exact Financing Amount Requested" htmlFor="financingAmount" required>
              <CurrencyInput
                id="financingAmount"
                value={values.financingAmount}
                onChange={(amount) =>
                  form.setValue("financingAmount", amount === "" ? 0 : amount, {
                    shouldValidate: true,
                  })
                }
              />
            </FormField>
            <FormField label="Primary Financing Purpose" htmlFor="financingPurpose" required>
              <NativeSelect
                id="financingPurpose"
                value={values.financingPurpose}
                onChange={(value) => form.setValue("financingPurpose", value as PreAssessmentFormValues["financingPurpose"], { shouldValidate: true })}
                options={[...FINANCING_PURPOSES]}
              />
            </FormField>
            <FormField label="Use of Funds" htmlFor="useOfFunds" required>
              <Textarea id="useOfFunds" {...form.register("useOfFunds")} />
            </FormField>
            <div className="rounded-lg border border-border/60 bg-muted/25 px-4 py-3 text-sm">
              <p className="font-semibold text-brand-navy">Pre-Assessment fee</p>
              <p className="mt-1 text-muted-foreground">
                {formatCad(feeBreakdown.fee)} + tax ({formatCad(feeBreakdown.tax)})
              </p>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <FormField label="Business Legal Name" htmlFor="businessLegalName" required>
              <Input id="businessLegalName" {...form.register("businessLegalName")} />
            </FormField>
            <FormField label="Operating Name" htmlFor="operatingName">
              <Input id="operatingName" {...form.register("operatingName")} />
            </FormField>
            <FormField label="Business Number" htmlFor="businessNumber">
              <Input id="businessNumber" {...form.register("businessNumber")} />
            </FormField>
            <FormField label="Industry" htmlFor="industry" required>
              <Input id="industry" {...form.register("industry")} />
            </FormField>
            <FormField label="Province" htmlFor="province" required>
              <Input id="province" {...form.register("province")} />
            </FormField>
            <FormField label="Years Operating" htmlFor="yearsOperating" required>
              <NativeSelect
                id="yearsOperating"
                value={values.yearsOperating}
                onChange={(value) => form.setValue("yearsOperating", value, { shouldValidate: true })}
                placeholder="Select"
                options={[
                  { value: "0-1", label: "0–1 years" },
                  { value: "2-4", label: "2–4 years" },
                  { value: "5-9", label: "5–9 years" },
                  { value: "10+", label: "10+ years" },
                ]}
              />
            </FormField>
          </>
        )}

        {step === 2 && (
          <>
            <FormField label="Annual Revenue Range" htmlFor="annualRevenue" required>
              <NativeSelect
                id="annualRevenue"
                value={values.annualRevenue}
                onChange={(value) => form.setValue("annualRevenue", value, { shouldValidate: true })}
                placeholder="Select"
                options={[
                  { value: "under-500k", label: "Under CAD $500K" },
                  { value: "500k-2m", label: "CAD $500K – $2M" },
                  { value: "2m-10m", label: "CAD $2M – $10M" },
                  { value: "10m+", label: "CAD $10M+" },
                ]}
              />
            </FormField>
            <FormField label="Existing Debt Level" htmlFor="existingDebt" required>
              <NativeSelect
                id="existingDebt"
                value={values.existingDebt}
                onChange={(value) => form.setValue("existingDebt", value, { shouldValidate: true })}
                placeholder="Select"
                options={[
                  { value: "minimal", label: "Minimal" },
                  { value: "moderate", label: "Moderate" },
                  { value: "significant", label: "Significant" },
                ]}
              />
            </FormField>
            <FormField label="Cash-Flow Profile" htmlFor="cashFlowProfile" required>
              <NativeSelect
                id="cashFlowProfile"
                value={values.cashFlowProfile}
                onChange={(value) => form.setValue("cashFlowProfile", value, { shouldValidate: true })}
                placeholder="Select"
                options={[
                  { value: "stable", label: "Stable" },
                  { value: "seasonal", label: "Seasonal" },
                  { value: "growth", label: "Growth / variable" },
                ]}
              />
            </FormField>
          </>
        )}

        {step === 3 && (
          <>
            <FormField label="Collateral Available?" htmlFor="collateralAvailable" required>
              <RadioGroup
                name="collateralAvailable"
                value={values.collateralAvailable}
                onChange={(value) => form.setValue("collateralAvailable", value, { shouldValidate: true })}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </FormField>
            <FormField label="Owner / Sponsor Equity Available?" htmlFor="ownerEquityAvailable" required>
              <RadioGroup
                name="ownerEquityAvailable"
                value={values.ownerEquityAvailable}
                onChange={(value) => form.setValue("ownerEquityAvailable", value, { shouldValidate: true })}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "unsure", label: "Unsure" },
                ]}
              />
            </FormField>
          </>
        )}

        {step === 4 && (
          <>
            <FormField
              label="Will any portion be used for personal, family or household purposes?"
              htmlFor="consumerPurpose"
              required
            >
              <RadioGroup
                name="consumerPurpose"
                value={values.consumerPurpose}
                onChange={(value) => form.setValue("consumerPurpose", value, { shouldValidate: true })}
                options={[
                  { value: "no", label: "No" },
                  { value: "yes", label: "Yes" },
                ]}
              />
            </FormField>
            <FormField
              label="Will financing be secured against real property?"
              htmlFor="realPropertySecurity"
              required
            >
              <RadioGroup
                name="realPropertySecurity"
                value={values.realPropertySecurity}
                onChange={(value) => form.setValue("realPropertySecurity", value, { shouldValidate: true })}
                options={[
                  { value: "no", label: "No" },
                  { value: "yes", label: "Yes" },
                  { value: "unsure", label: "Unsure" },
                ]}
              />
            </FormField>
            <FormField
              label="Are you seeking equity / securities-based financing?"
              htmlFor="securitiesBased"
              required
            >
              <RadioGroup
                name="securitiesBased"
                value={values.securitiesBased}
                onChange={(value) => form.setValue("securitiesBased", value, { shouldValidate: true })}
                options={[
                  { value: "no", label: "No" },
                  { value: "yes", label: "Yes" },
                  { value: "unsure", label: "Unsure" },
                ]}
              />
            </FormField>
            {regulatoryMessage && (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
                {regulatoryMessage}
                {regulatoryRoute === "consumer_blocked" && (
                  <div className="mt-3">
                    <ButtonLink href="/enquiry-centre" variant="brand" size="sm">
                      Go to Enquiry Centre
                    </ButtonLink>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {step === 5 && (
          <>
            <FormField label="Full Name" htmlFor="decisionMakerName" required>
              <Input id="decisionMakerName" {...form.register("decisionMakerName")} />
            </FormField>
            <FormField label="Role / Title" htmlFor="decisionMakerRole" required>
              <Input id="decisionMakerRole" {...form.register("decisionMakerRole")} />
            </FormField>
            <FormField label="Authorized to act for the business?" htmlFor="authorizedDecisionMaker" required>
              <RadioGroup
                name="authorizedDecisionMaker"
                value={values.authorizedDecisionMaker}
                onChange={(value) => form.setValue("authorizedDecisionMaker", value, { shouldValidate: true })}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </FormField>
            <FormField label="Business Email" htmlFor="businessEmail" required>
              <Input id="businessEmail" type="email" {...form.register("businessEmail")} />
            </FormField>
            <FormField label="Business Telephone" htmlFor="businessPhone" required>
              <Input id="businessPhone" {...form.register("businessPhone")} />
            </FormField>
            <FormField label="Preferred Contact Method" htmlFor="preferredContactMethod" required>
              <NativeSelect
                id="preferredContactMethod"
                value={values.preferredContactMethod}
                onChange={(value) => form.setValue("preferredContactMethod", value, { shouldValidate: true })}
                options={[
                  { value: "email", label: "Email" },
                  { value: "telephone", label: "Telephone" },
                  { value: "whatsapp", label: "WhatsApp (general only)" },
                ]}
              />
            </FormField>
          </>
        )}

        {step === 6 && (
          <>
            <FormField label="How did you hear about SpherEarth Capital?" htmlFor="leadSource" required>
              <NativeSelect
                id="leadSource"
                value={values.leadSource}
                onChange={(value) => form.setValue("leadSource", value as PreAssessmentFormValues["leadSource"], { shouldValidate: true })}
                options={[...LEAD_SOURCES]}
              />
            </FormField>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={values.termsAccepted} onChange={(event) => form.setValue("termsAccepted", event.target.checked as true, { shouldValidate: true })} className="mt-1" />
              <span>
                I accept the{" "}
                <Link href="/pre-assessment-terms" className="text-brand-green underline">
                  Pre-Assessment Service Terms
                </Link>
                .
              </span>
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={values.accuracyConfirmed} onChange={(event) => form.setValue("accuracyConfirmed", event.target.checked as true, { shouldValidate: true })} className="mt-1" />
              <span>I confirm the information provided is accurate to the best of my knowledge.</span>
            </label>
          </>
        )}

        {step === 7 && (
          <>
            <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-5">
              <h3 className="text-lg font-semibold text-brand-navy">Review before payment</h3>
              <p>Financing Amount Sought: {formatCad(values.financingAmount)}</p>
              <p>Pre-Assessment Fee: {formatCad(feeBreakdown.fee)}</p>
              <p>Applicable Tax: {formatCad(feeBreakdown.tax)}</p>
              <p className="text-lg font-semibold">Total Due Now: {formatCad(feeBreakdown.total)}</p>
              <p className="text-sm text-muted-foreground">
                This payment purchases the SpherEarth Commercial Financing Pre-Assessment™. It does
                not purchase or guarantee financing.
              </p>
            </div>
            <PaymentMethodChooser
              value={selectedPaymentMethod}
              onChange={setSelectedPaymentMethod}
              disabled={!paymentAllowed}
            />
            <p className="text-xs text-muted-foreground">
              Pay only to payment instructions issued through an official SpherEarth channel.
            </p>
          </>
        )}

        <div className="flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={goBack}>
                Back
              </Button>
            )}
            {step < WIZARD_STEPS.length - 1 && (
              <Button type="button" variant="brand" onClick={goNext}>
                Continue
              </Button>
            )}
            {step === WIZARD_STEPS.length - 1 && (
              <Button
                type="button"
                variant="brand"
                onClick={handleProceedToPayment}
                disabled={!paymentAllowed}
              >
                Proceed to payment
              </Button>
            )}
          </div>
          <button
            type="button"
            onClick={() => clearPreAssessmentDraft()}
            className="text-left text-xs font-medium text-muted-foreground underline-offset-2 hover:text-brand-navy hover:underline sm:text-right"
          >
            Clear saved progress
          </button>
        </div>
      </form>
    </div>
  );
}
