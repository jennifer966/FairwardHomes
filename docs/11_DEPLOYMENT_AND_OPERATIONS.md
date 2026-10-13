# 11 · Deployment & Operations

## Environments
| Thing | Value |
| --- | --- |
| Repo | `jennifer966/FairwardHomes` |
| Branch | `claude/fairwardhomes-landing-il9dgg`. Recommended: create `main` via a pull request and deploy from `main`; use a `staging` branch for previews |
| Database | Supabase project `aabmheprejtxpyjvbjhm`, URL `https://aabmheprejtxpyjvbjhm.supabase.co` |
| Hosting | AWS Amplify (`amplify.yml` in the repo) |
| Domain | FairwardHomes.com |

## Environment variables (see `.env.example`)
| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_MODE` | `prelaunch` (default) / `live` (only honored when approvals are complete) |
| `NEXT_PUBLIC_LEAD_CAPTURE` | `test` / `enabled` / `disabled` |
| `NEXT_PUBLIC_SITE_URL` | `https://fairwardhomes.com` |
| `SUPABASE_URL` | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** key (`sb_secret_…`). Server only; never `NEXT_PUBLIC_` |
| `ADMIN_USER` / `ADMIN_PASSWORD` | `/admin/leads` Basic auth (admin disabled if no password) |
| `PREVIEW_USER` / `PREVIEW_PASSWORD` | Optional password for the whole site during prelaunch |
| `RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM`, `LEAD_NOTIFICATION_TO` | Optional email notifications |
| `NEXT_PUBLIC_ANALYTICS` | `none` / `first-party` |
| `RATE_LIMIT_SALT` | Random string for IP hashing |

## AWS Amplify setup
1. Amplify → **Create new app** → GitHub → choose the repo and branch.
2. Add the environment variables above. Use a **new production Supabase secret key**.
3. Deploy. The build copies the server variables into `.env.production` (Amplify doesn't expose console variables to the Next.js server at runtime).
4. **Hosting → Custom domains:** add `fairwardhomes.com` and `www`, then follow the DNS steps (automatic if the domain is in Route 53). Amplify issues the SSL certificate.
5. After changing a variable, **redeploy**.

## Supabase
- Schema applied (see doc 10). To recreate it elsewhere, run `supabase db push` or paste the migration into the SQL editor.
- Note: the hosted migration tool times out on `DROP` statements, so the migration avoids them.
- **Security housekeeping:** delete the temporary `claude-test` secret key (it appeared in a chat transcript). Create a separate key for production.
- Two test rows ("Test Seller", "Test Buyer", `is_test = true`) can be deleted.

## Updating the site
- **Content and business details:** edit `src/config/site.ts` and `src/config/content.ts`, then commit. Amplify redeploys automatically.
- **Previews:** connect a `staging` branch in Amplify to get a private preview URL.
- **Before pushing code changes:** `npm run typecheck && npm run lint && npm test && npm run build`.

## Going live checklist
- [ ] Brokerage name and advertising approval → fill `compliance.*`, set `approvedForLive`
- [ ] Counsel-approved Privacy Policy (CCPA/CPRA), Terms, disclosures
- [ ] Final pricing, inclusions, payment timing (`pricing.paymentTiming`)
- [ ] Broker photo, bio, verified credentials (`broker.*`)
- [ ] Final logo SVG and licensed photography
- [ ] Production Supabase key; email provider configured
- [ ] `NEXT_PUBLIC_LEAD_CAPTURE=enabled`, then `NEXT_PUBLIC_SITE_MODE=live`; remove `PREVIEW_PASSWORD`

## Prototypes
Both prototypes are Claude Design canvases (private links in doc 00). Their source files are in `prototypes/`. They are design artifacts, not production code. The real seller app and broker console would be built in the codebase (Next.js for the web console; React Native/Expo for mobile) against the data model in doc 10.
