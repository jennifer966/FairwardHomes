# 07 · Agent (Salesperson) Workspace: Prototype

**Canvas:** same as the broker console: https://claude.ai/artifact/GB8dnifw1TeGYUXvjBKAib (rows "A1–A6")
**Source:** `prototypes/broker-console/Agent*.dc.html`
**Example user:** Jordan Lee (sample), salesperson supervised by `[Broker name]`. Lighter navy sidebar so the view is easy to tell apart.

## Principle
The agent **prepares, communicates and schedules**. A broker **approves, authorizes MLS publication and confirms deadlines**. Everything an agent prepares goes to the supervising broker's review queue, and feedback comes back to the agent.

## Screens
| # | File | Screen | Key features |
| --- | --- | --- | --- |
| A1 | `AgentToday.dc.html` | **Today** | Stats (active files, waiting on broker, changes requested, replies due); task list with check-off; messages needing reply; this week; broker feedback; license, CE and supervision status |
| A2 | `AgentFiles.dc.html` | **Seller files** | Only the agent's 4 files; tabs: Work & prepare (open items, "Submit" for broker review), Deadlines (read-only, "Remind broker to confirm"), What I can do (allowed / not allowed) |
| A3 | `AgentSubmissions.dc.html` | **Submissions** | Status filters; detail with broker feedback and history; revise and **resubmit**; **New submission** (incl. "advice check before replying to a seller") |
| A4 | `AgentInbox.dc.html` | **Inbox** | Sellers, buyer clients, broker; "Before you reply" warnings (open exception, Fairward-listing dual agency); **Ask broker first**; note to broker; assistant drafts |
| A5 | `AgentCalendar.dc.html` | **Calendar** | Seller / buyer / everything filter; buyer tours with requirements (signed buyer representation agreement, pre-approval) and stops; consultation for a buyer with no agreement yet; **Offer to host** a brokerage open house |
| A6 | `AgentBuyers.dc.html` | **Buyer clients** | 3 clients: touring / agreement pending / offer in progress; 6-step buyer track; homes with **dual-agency check** for Fairward listings + "Request broker decision"; offer drafts "Submit for broker review"; agreement, term, compensation "per signed agreement", buyer credit "not yet offered · subject to lender approval" |

## Buyer-side rules encoded
- **No tours** until a written buyer representation agreement is signed.
- **Fairward listings** shown to Fairward buyer clients trigger dual-agency disclosure, written consent from both parties, and a broker decision before scheduling or advising.
- **Compensation and buyer credits come from the signed agreement.** No specific credit amounts are advertised or promised.

*Counsel to confirm current California requirements and forms.*

## Gaps
- The broker side doesn't yet receive buyer items (see doc 06 open gaps).
- Prototype screens don't share state (submitting on one screen doesn't appear on another).
