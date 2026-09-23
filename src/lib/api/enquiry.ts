import { apiFetch } from "@/lib/api/client";

export interface EnquiryRequest {
  name: string;
  email: string;
  company: string;
  message: string;
}

export async function submitEnquiry(payload: EnquiryRequest): Promise<{ ok: true }> {
  return apiFetch<{ ok: true }>("/enquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
