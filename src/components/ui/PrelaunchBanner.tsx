import { isPrelaunch } from "@/config/site";

export function PrelaunchBanner() {
  if (!isPrelaunch) return null;
  return (
    <div className="prelaunch-bar" role="note">
      <strong>Prelaunch preview</strong>
      Fairward is in private review. Pricing and services shown are proposed and not yet available.
    </div>
  );
}
