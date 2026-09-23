"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  landingPage?: string;
  referringUrl?: string;
}

const UTM_STORAGE_KEY = "spherearth-capital-utm";

export function captureUtmsFromSearchParams(searchParams: URLSearchParams): UtmParams {
  return {
    utmSource: searchParams.get("utm_source") ?? undefined,
    utmMedium: searchParams.get("utm_medium") ?? undefined,
    utmCampaign: searchParams.get("utm_campaign") ?? undefined,
    utmContent: searchParams.get("utm_content") ?? undefined,
    utmTerm: searchParams.get("utm_term") ?? undefined,
    gclid: searchParams.get("gclid") ?? undefined,
    landingPage: typeof window !== "undefined" ? window.location.pathname : undefined,
    referringUrl: typeof document !== "undefined" ? document.referrer || undefined : undefined,
  };
}

export function persistUtms(params: UtmParams): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
}

export function readPersistedUtms(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

export function useUtms(): UtmParams {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = captureUtmsFromSearchParams(searchParams);
    if (Object.values(params).some(Boolean)) {
      persistUtms({ ...readPersistedUtms(), ...params });
    }
  }, [searchParams]);

  return readPersistedUtms();
}
