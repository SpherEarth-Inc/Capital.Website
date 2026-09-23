"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FormField } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/api/enquiry";

export function EnquiryForm() {
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      await submitEnquiry({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        company: String(formData.get("company") ?? ""),
        message: String(formData.get("message") ?? ""),
      });
      toast.success("Enquiry submitted.");
      event.currentTarget.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Backend not connected yet.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="content-width card-surface space-y-4 p-6 md:p-8">
      <p className="text-sm text-muted-foreground">
        General enquiries only. Do not send sensitive financial documents here.
      </p>
      <FormField label="Full name" htmlFor="name" required>
        <Input id="name" name="name" required />
      </FormField>
      <FormField label="Business email" htmlFor="email" required>
        <Input id="email" name="email" type="email" required />
      </FormField>
      <FormField label="Company" htmlFor="company" required>
        <Input id="company" name="company" required />
      </FormField>
      <FormField label="Message" htmlFor="message" required>
        <Textarea id="message" name="message" required rows={4} />
      </FormField>
      <Button type="submit" variant="brand" disabled={pending}>
        {pending ? "Sending…" : "Submit enquiry"}
      </Button>
    </form>
  );
}
