import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";

export const metadata: Metadata = { title: "Accessibility" };

export default function Accessibility() {
  return (
    <DocPage title="Accessibility" draft={false}>
      <p>
        Fairward is committed to making this website usable by as many people as possible. We design with the Web
        Content Accessibility Guidelines (WCAG) 2.2 Level AA in mind, including keyboard navigation, visible focus
        states, sufficient color contrast, descriptive labels, and support for reduced-motion preferences.
      </p>
      <p>
        If you encounter a barrier on this site, please let us know through the contact form on the home page and we
        will work to address it. Direct accessibility contact details will be added before public launch.
      </p>
    </DocPage>
  );
}
