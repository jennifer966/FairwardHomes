export const analyticsEventNames = [
  "page_viewed",
  "calculator_used",
  "primary_cta_clicked",
  "seller_form_started",
  "seller_form_submitted",
  "buyer_form_submitted",
  "pricing_viewed",
  "faq_interaction",
  "assistant_demo_used",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
