# 06 · Broker Console: Prototype

**Canvas:** https://claude.ai/artifact/GB8dnifw1TeGYUXvjBKAib (private; contains both broker and agent views)
**Source:** `prototypes/broker-console/` (screens 1–9 below; agent screens A1–A6 are in doc 07)
**Format:** desktop pages (1440 wide, responsive), dark navy sidebar, sample data. Press **Play** on "1 · Today".

## Roles
| Role | Licensed | Can do |
| --- | --- | --- |
| **Designated broker** (you) | Broker | Everything; always holds full authority |
| **Associate broker** | Broker | Approve most items; manage team if granted |
| **Salesperson (agent)** | Salesperson | Prepare, communicate and schedule; **cannot** approve, authorize MLS or confirm deadlines |
| **Transaction coordinator** | No | Scheduling and admin; never approves or hosts showings |

Supervision is attached to every file: assigned licensee + supervising/responsible broker.

## Shared sample dataset (consistent across all screens)
11 seller files: 10 active, 1 completed.
- **You:** 2210 Capitol Ave (explore), 9 Riverbend Dr (prepare, trust sale), 1234 Sample Lane (prepare, MLS gate), 305 Laurel St (listed), 6 Willow Bend (closed).
- **Jordan Lee, salesperson, supervised by you:** 47 Elm Glen (explore), 52 Fremont Ct (prepare), 760 Sutter Way (offers), 88 Oak Park Way (escrow, **low-appraisal exception**).
- **Priya Shah, associate broker:** 14 Alder Row (listed), 19 Poplar Ct (escrow).

## Screens
| # | File | Screen | Key features |
| --- | --- | --- | --- |
| 1 | `Main.dc.html` | **Today** | My work / Whole brokerage switch; reviews, contract dates, exceptions, active files; decisions needed; deadlines (Calculated/Confirmed); open exception; health alerts (task-based, no predictions); weekly time |
| 2 | `Review.dc.html` | **Review queue** | Filters by reviewer (me / whole brokerage) and type (MLS gate, pricing, disclosures, marketing, offers, deadlines); detail with checks, materials and "who can approve"; approve / request changes with note / reassign reviewer; MLS gate with 7 prerequisites |
| 3 | `Transaction.dc.html` | **Transactions** | List of all files (filter by assignee, needs attention, include completed) → per-file workspace with switcher: stage bar, tabs for Overview (open items, key facts, exception playbook), Deadlines (confirm), People & authority (view/approve/sign), Documents, Activity & time (audit log, log time) |
| 4 | `Pipeline.dc.html` | **Pipeline** | Board by the 6 seller stages, filter by licensee |
| 5 | `Leads.dc.html` | **Leads** | Same fields as the website/Supabase; consent shown; assign licensee; status incl. "Seller file opened"; **Open a seller file** |
| 6 | `Team.dc.html` | **Team, roles & supervision** | People with license status and supervisor; **approval authority matrix** (locked cells = licensing rules; others toggle); invite with DRE # and supervising broker; supervision/compliance panel |
| 7 | `Economics.dc.html` | **Time & economics** | Per-file hours mix, labor cost, file costs, contribution vs. $2,995; loaded hourly cost $75/$100/$150; break-even hours; exception share (computed) |
| 8 | `Inbox.dc.html` | **Inbox** | Every conversation tied to a file; seller app, email bridge, internal; assistant handoffs flagged "Licensed advice requested"; reply vs. internal note; assistant drafts inserted, never auto-sent; resolve |
| 9 | `Calendar.dc.html` | **Calendar** | Week view across files: calls, site visits, showings, open houses, contract deadlines; host assignment (licensees only); **accompanied showings for buyers without an agent** (ID verification, no lockbox access, consistent rules, representation disclosure); confirm / suggest new time |

## Approval authority matrix (defaults)
| Action | Designated broker | Associate broker | Salesperson | Coordinator |
| --- | --- | --- | --- | --- |
| Authorize MLS publication | Always | Always | Never | Never |
| Approve pricing recommendation | Always | Always | Prepare only | Never |
| Approve marketing | Always | Always | Off (toggle) | Never |
| Complete disclosure review | Always | Always | Prepare only | Never |
| Confirm calculated deadlines | Always | On (toggle) | Off (toggle) | Off (toggle) |
| Send offers / counteroffers | Always | Always | Off (toggle) | Never |
| Assign leads and files | Always | On (toggle) | Never | On (toggle) |
| Manage team and roles | Always | Off (toggle) | Never | Never |
| View economics | Always | On (toggle) | Off (toggle) | Never |

*Locked cells reflect my reading of supervision rules; counsel to confirm.*

## Known prototype limitations
- Screens can't pass a selection to each other (pipeline cards open the transactions list, not the specific file). The real app would link directly.
- Actions on one screen don't update counts on others; badges are static.

## Open gaps (next to build)
- Buyer files in the broker console: pipeline, transactions, and review items for dual-agency decisions, buyer agreements and buyer offers.
- Exceptions list (all open exceptions and special paths).
- Calendar sync (Google/Outlook), month view.
- Reply-time reminders and escalation to the supervising broker.
- Text messages for opted-in contacts only.
- Saved replies, with broker approval for any that give advice.
- File audit sampler and compliance calendar.
- "As seller sees it" preview.
