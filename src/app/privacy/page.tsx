import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { compliance } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <DocPage title="Privacy Policy" draft={!compliance.privacyPolicyApproved}>
      <p>
        This summary describes how information submitted through this prelaunch website is handled. A complete privacy
        policy, including disclosures required under the California Consumer Privacy Act (CCPA/CPRA), will replace this
        page before public launch.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Information you choose to submit in our forms, such as your name, email, phone number, and property details.</li>
        <li>Campaign information from the link you used to reach us (for example, UTM parameters) and the referring website.</li>
        <li>Aggregate, cookieless usage events if first-party analytics are enabled. We do not store IP addresses with these events.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your inquiry and evaluate interest in Fairward&apos;s proposed services.</li>
        <li>To send optional marketing communications only if you separately opted in.</li>
      </ul>
      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We do not sell your personal information.</li>
        <li>We do not enroll you in text-message marketing without your express consent.</li>
      </ul>
      <h2>Your choices</h2>
      <p>You may request access to or deletion of your information at any time. Contact details will be published here.</p>
    </DocPage>
  );
}
