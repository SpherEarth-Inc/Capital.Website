import { redirect } from "next/navigation";

/** FAQ lives on the homepage after financing pathways. */
export default function FaqPage() {
  redirect("/#faq");
}
