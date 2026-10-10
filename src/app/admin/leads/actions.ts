"use server";

import { revalidatePath } from "next/cache";
import { leadStatuses, type LeadStatus } from "@/lib/leads/schema";
import { setLeadStatus } from "@/lib/leads/store";

// Access to /admin/* is enforced by HTTP Basic auth in middleware.
export async function updateStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as LeadStatus;
  if (!/^[0-9a-f-]{36}$/i.test(id) || !leadStatuses.includes(status)) return;
  await setLeadStatus(id, status);
  revalidatePath("/admin/leads");
}
