"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { CurrencyInput } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  calculateFeeSchedule,
  type FeeScheduleBreakdown,
} from "@/lib/fees/calculate";
import { env } from "@/lib/env";
import { cn, formatCad } from "@/lib/utils";

const PRESETS = [250_000, 500_000, 1_000_000, 5_000_000, 10_000_000] as const;
const CALCULATE_DELAY_MS = 1600;

export function FeeCalculatorPanel({ className }: { className?: string }) {
  const [amount, setAmount] = useState<number | "">("");
  const [result, setResult] = useState<FeeScheduleBreakdown | null>(null);
  const [calculating, setCalculating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function updateAmount(next: number | "") {
    setAmount(next);
    setResult(null);
    setCalculating(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function handleCalculate() {
    if (typeof amount !== "number" || amount < 1000 || calculating) return;

    setResult(null);
    setCalculating(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setResult(calculateFeeSchedule(amount, env.preAssessmentTaxRate));
      setCalculating(false);
      timerRef.current = null;
    }, CALCULATE_DELAY_MS);
  }

  return (
    <aside className={cn(className)}>
      <div className="fee-calculator-enter rounded-lg border border-border/80 bg-white p-5 shadow-sm md:p-6">
      <div className="pb-4">
        <h2 className="text-lg font-semibold text-brand-navy">Fee estimate</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter an amount to see all three stages.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="fee-calculator" className="mb-2 block text-sm font-medium">
            Amount to finance
          </label>
          <CurrencyInput id="fee-calculator" value={amount} onChange={updateAmount} />
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => updateAmount(preset)}
              className={cn(
                "border px-2.5 py-1.5 text-xs font-medium transition-colors",
                amount === preset
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-border bg-white text-foreground hover:border-brand-green hover:text-brand-green",
              )}
            >
              {formatCad(preset)}
            </button>
          ))}
        </div>

        <Button
          type="button"
          variant="brand"
          className="w-full"
          disabled={typeof amount !== "number" || amount < 1000 || calculating}
          onClick={handleCalculate}
        >
          {calculating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Calculating…
            </>
          ) : (
            "Calculate fees"
          )}
        </Button>

        {calculating && (
          <div className="flex flex-col items-center justify-center border border-dashed border-border bg-white px-4 py-10 text-center">
            <Loader2 className="size-8 animate-spin text-brand-green" />
            <p className="mt-3 text-sm text-muted-foreground">
              Calculating…
            </p>
          </div>
        )}

        {!calculating && result && (
          <div className="space-y-3">
            <div className="overflow-hidden rounded-md border border-border bg-white">
              <div className="bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white">
                Stage 1 — Due now
              </div>
              <div className="flex items-center justify-between border-b border-border px-4 py-3 text-sm">
                <span className="text-muted-foreground">Pre-Assessment fee (0.10%)*</span>
                <span className="font-medium tabular-nums">
                  {formatCad(result.preAssessment.fee)}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border px-4 py-3 text-sm">
                <span className="text-muted-foreground">
                  Estimated tax ({Math.round(env.preAssessmentTaxRate * 100)}%)
                </span>
                <span className="font-medium tabular-nums">
                  {formatCad(result.preAssessment.tax)}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-semibold text-brand-navy">Pre-Assessment total</span>
                <span className="font-heading text-lg font-bold tabular-nums text-brand-navy">
                  {formatCad(result.preAssessment.total)}
                </span>
              </div>
              <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                *Min CAD $500 · Max CAD $10,000
              </p>
            </div>

            <div className="overflow-hidden rounded-md border border-border bg-white">
              <div className="border-b border-border px-4 py-2.5 text-sm font-semibold text-brand-navy">
                Stage 2 — If we accept a mandate
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-muted-foreground">Mandate fee (0.50%)</span>
                <span className="font-medium tabular-nums">{formatCad(result.mandateFee)}</span>
              </div>
              <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                Not due at Pre-Assessment. Only if you sign a mandate.
              </p>
            </div>

            <div className="overflow-hidden rounded-md border border-border bg-white">
              <div className="border-b border-border px-4 py-2.5 text-sm font-semibold text-brand-navy">
                Stage 3 — If funding completes
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-muted-foreground">Success fee (2.00%)</span>
                <span className="font-medium tabular-nums">{formatCad(result.successFee)}</span>
              </div>
              <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                Shown on the amount above. Based on funding actually received.
              </p>
            </div>
          </div>
        )}

        {!calculating && !result && (
          <p className="text-sm text-muted-foreground">
            Enter an amount and tap Calculate.
          </p>
        )}

        <p className="text-xs leading-relaxed text-muted-foreground">
          Estimates only. Only Stage 1 is due to start. Stages 2 and 3 are later, if you proceed.
        </p>

        <ButtonLink
          href="/pre-assessment"
          variant="brand"
          className={cn("w-full", !result && "pointer-events-none opacity-50")}
          aria-disabled={!result}
        >
          Start Pre-Assessment
        </ButtonLink>
        <p className="text-center text-xs text-muted-foreground">
          Or{" "}
          <Link href="/enquiry-centre" className="underline hover:text-brand-green">
            contact the Enquiry Centre
          </Link>
        </p>
      </div>
      </div>
    </aside>
  );
}
