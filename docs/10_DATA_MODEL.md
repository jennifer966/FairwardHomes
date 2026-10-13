# 10 · Data Model

## Current schema (live in Supabase project `aabmheprejtxpyjvbjhm`)
Source: `supabase/migrations/20261010000000_init_leads.sql`. It's safe to re-run (no destructive statements).

### `public.leads`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid PK | `gen_random_uuid()` |
| created_at / updated_at | timestamptz | trigger keeps `updated_at` current |
| lead_type | text | `seller` / `buyer` |
| status | text | `new`, `contacted`, `qualified`, `not_a_fit`, `archived` |
| is_test | boolean | true while `NEXT_PUBLIC_LEAD_CAPTURE=test` |
| full_name, email, phone | text | length and format checks |
| property_address, zip, estimated_value, selling_status, interest | text | seller fields |
| preferred_area, purchase_range | text | buyer fields |
| timeline | text | |
| consent_marketing_email, consent_sms | boolean | default false |
| consent_text | jsonb | snapshot of the consent wording agreed to |
| source, utm_source, utm_medium, utm_campaign, utm_term, utm_content, referrer, landing_path | text | attribution |
| site_mode | text | prelaunch / live at submission |
| notification_status | text | `not_configured`, `pending`, `sent`, `failed_*` |

Indexes: `created_at desc`, `(lead_type, status)`.

### `public.analytics_events`
`id`, `created_at`, `name`, `path`, `props jsonb`, `utm_source`, `utm_medium`, `utm_campaign`, `referrer_host`. No IP address or user agent.

### Security
- RLS is **enabled and forced** on both tables, with **no policies**. Privileges are revoked from `anon` and `authenticated`.
- Only the server (secret/service key) can read or write. Verified: the public key gets "permission denied".
- Supabase's linter will show an informational "RLS enabled, no policy" note. That's intentional.

## Pending schema changes
- Add `converted` to `leads.status`, plus `transaction_id` linking a lead to its file (used by the broker Leads screen).
- `assigned_to` (licensee) on leads.

## Planned entities (for the real platform)
| Entity | Purpose | Key fields |
| --- | --- | --- |
| `organizations` / `offices` | Brokerage and future offices | name, DRE corp #, address |
| `people` | Licensees, coordinators, consumers | role, license #, license expiry, supervisor_id |
| `memberships` | Person ↔ org role | role: designated_broker / associate_broker / salesperson / coordinator |
| `role_permissions` | Approval authority matrix | action, role, allowed, locked |
| `transactions` | Seller and buyer files | type (listing/buyer), stage (1–6), assignee, responsible_broker, property_id |
| `transaction_parties` | Sellers, buyers, helpers, escrow | per-action permissions: view / approve / sign; verification status |
| `properties` | Property facts | address, APN, facts with provenance |
| `facts` | Verified fact sheet | value, source document, status (verified/unverified/estimated) |
| `documents` | Vault | type, version, status, retention_until, legal_hold |
| `deadlines` | Deadline engine | source (contract/amendment), rule, date, status (calculated/confirmed), confirmed_by |
| `reviews` | Review queue and submissions | type, prepared_by, reviewer, status (waiting/approved/changes/reassigned), note |
| `gates` | Ready-for-MLS and similar | prerequisites, authorized_by, reopened_reason |
| `exceptions` | Exception workflows | type, playbook steps, owners, status |
| `messages` / `threads` | Inbox | channel, visibility (client/internal), advice_flag |
| `events` | Calendar | kind (call/showing/accompanied/open house/deadline), host, requirements |
| `time_entries` | Economics | person, transaction, category, minutes |
| `media` / `marketing_assets` | Marketing Studio | original_id, altered flag + label, approval status, rights |
| `audit_log` | Everything sensitive | actor, action, object, timestamp |

**RLS strategy for the platform:** org-scoped plus role-scoped policies. Salespersons see only assigned files; brokers see files they're responsible for or supervise; the designated broker sees everything; consumers see only their own transaction, and only the fields their party permissions allow.
