import type { Metadata } from "next";
import { leadCapture, liveModeBlockers, siteMode } from "@/config/site";
import { leadStatuses } from "@/lib/leads/schema";
import { emailConfigured } from "@/lib/leads/notify";
import { listLeads, storageMode } from "@/lib/leads/store";
import { updateStatus } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Leads", robots: { index: false, follow: false } };

const cell: React.CSSProperties = { padding: "10px 12px", borderBottom: "1px solid var(--line)", verticalAlign: "top" };

export default async function LeadsAdmin({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const all = await listLeads(500);
  const leads = type === "seller" || type === "buyer" ? all.filter((l) => l.lead_type === type) : all;
  const mode = storageMode();
  const blockers = liveModeBlockers();

  return (
    <main className="container" style={{ paddingBlock: 48, display: "grid", gap: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap" }}>
        <div>
          <span className="eyebrow">Internal</span>
          <h1 className="h2">Leads</h1>
        </div>
        <nav style={{ display: "flex", gap: 8 }}>
          <a className="btn btn--sm btn--ghost" href="/admin/leads">All ({all.length})</a>
          <a className="btn btn--sm btn--ghost" href="/admin/leads?type=seller">Sellers</a>
          <a className="btn btn--sm btn--ghost" href="/admin/leads?type=buyer">Buyers</a>
        </nav>
      </header>

      <section className="note-card" style={{ background: "var(--white)" }}>
        <h3>System status</h3>
        <p>
          Site mode: <b>{siteMode}</b> · Lead capture: <b>{leadCapture}</b> · Storage: <b>{mode}</b> · Email
          notifications: <b>{emailConfigured() ? "configured" : "requires configuration"}</b>
        </p>
        {blockers.length > 0 && (
          <p>
            Live mode blocked until configured: <code>{blockers.join(", ")}</code>
          </p>
        )}
        {mode === "dev-file" && <p>Development storage (.data/leads.jsonl). Status changes require Supabase.</p>}
      </section>

      <div style={{ overflowX: "auto", background: "var(--white)", borderRadius: 14, border: "1px solid var(--line)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ textAlign: "left", background: "var(--ivory)" }}>
              {["Received", "Type", "Contact", "Details", "Source", "Consent", "Status"].map((h) => (
                <th key={h} style={cell} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td style={cell} colSpan={7}>
                  No leads yet.
                </td>
              </tr>
            )}
            {leads.map((l) => (
              <tr key={l.id}>
                <td style={cell}>
                  {new Date(l.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  {l.is_test && (
                    <>
                      <br />
                      <span className="tag">Test</span>
                    </>
                  )}
                </td>
                <td style={cell}>{l.lead_type}</td>
                <td style={cell}>
                  <b>{l.full_name}</b>
                  <br />
                  <a className="text-link" href={`mailto:${l.email}`}>
                    {l.email}
                  </a>
                  {l.phone && (
                    <>
                      <br />
                      {l.phone}
                    </>
                  )}
                </td>
                <td style={cell}>
                  {l.lead_type === "seller" ? (
                    <>
                      {l.property_address} {l.zip}
                      <br />
                      {[l.selling_status, l.timeline, l.interest, l.estimated_value].filter(Boolean).join(" · ")}
                    </>
                  ) : (
                    <>{[l.preferred_area, l.timeline, l.purchase_range].filter(Boolean).join(" · ")}</>
                  )}
                </td>
                <td style={cell}>
                  {[l.utm_source, l.utm_medium, l.utm_campaign].filter(Boolean).join(" / ") || l.referrer || "direct"}
                  <br />
                  <small>{l.source}</small>
                </td>
                <td style={cell}>
                  Email: {l.consent_marketing_email ? "yes" : "no"}
                  <br />
                  SMS: {l.consent_sms ? "yes" : "no"}
                </td>
                <td style={cell}>
                  <form action={updateStatus} style={{ display: "flex", gap: 6 }}>
                    <input type="hidden" name="id" value={l.id} />
                    <select name="status" defaultValue={l.status} className="f-select" style={{ minHeight: 36, padding: "4px 32px 4px 8px" }}>
                      {leadStatuses.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                    <button className="btn btn--sm btn--navy" type="submit" disabled={mode !== "supabase"}>
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
