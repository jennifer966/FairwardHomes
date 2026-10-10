import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { compliance } from "@/config/site";

export const metadata: Metadata = { title: "Terms" };

export default function Terms() {
  return (
    <DocPage title="Terms of Use" draft={!compliance.termsApproved}>
      <p>
        This website presents a proposed real estate brokerage concept for review. Information on this site is general
        in nature, is not legal, tax, or financial advice, and is not an offer of brokerage services.
      </p>
      <p>
        Pricing, services, and calculator results are illustrative and subject to change. Any brokerage relationship
        would be established only through a separate written agreement signed by you and the brokerage.
      </p>
      <p>Final terms of use will be published here prior to public launch.</p>
    </DocPage>
  );
}
