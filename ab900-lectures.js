(window.AB900_LECTURES = window.AB900_LECTURES || []).push(
{d:"1", t:"Zero Trust Security Model", md:`
> Picture a highly exclusive VIP club. In the old days of IT security, we treated our networks like a medieval castle with a moat — once you crossed the drawbridge you were trusted completely. Today it's that VIP club where everyone's ID is checked at every single door, hallway and lounge area.
## The Zero Trust shift
- In the past, attacks were primarily network-based, so defending the perimeter made sense. Today our digital assets have **left the building**: people work from home, use their own mobile devices and log into SaaS apps outside the corporate firewall.
- Attackers have shifted focus: they actively target **identities** through phishing and credential theft. **Identity is the new battleground.**
| Old trusted network model | Zero Trust paradigm
| Sitting at a desk in the office = safe, trusted by default | **Zero trust regardless of location**
| | No user, device or application is trusted by default
! For your AB-900 exam: this shift is absolutely crucial for **modern hybrid work**. You cannot rely on where a user is — you must **continuously prove who they are**.
## Principle 1: Verify explicitly
> The bouncer doesn't just check your ID once at the front door — they check it again at the bar, at the VIP lounge, and watch as you head for the exit.
- Every request is double-checked using all available clues — **context signals** — against admin policies before any access decision.
- Move from **static credentials** (username and password) to **dynamic context**: device health, user location, behaviour risk level.
- The technical engine is **Conditional Access in Microsoft Entra ID**. Examples: accessing SharePoint from outside the corporate network → **require MFA**; device not updated and not compliant with **Intune** → **block**.
- It supports **session controls**, e.g. restricting a contractor to **read-only** so they can't download sensitive files.
! This is exactly how you turn the theory of verify explicitly into automated reality.
- **Risk-based authentication**: Entra ID Protection uses machine learning to flag anomalies. Log in from New York and 10 minutes later from Tokyo = **impossible travel** → flagged high risk.
- To balance security with usability, it doesn't prompt for MFA on every click; it triggers **passwordless or FIDO2 MFA dynamically, only when the risk demands it**.
## Principle 2: Least privilege access
> If verify explicitly is the bouncer, least privilege is the corporate key card. An HR employee's card opens the lobby and the third floor — not the basement server room, and certainly not the CEO's suite.
- Users and apps get only the **minimum access** needed for their job. If an attacker steals those HR credentials, they're **contained to the third floor** — you shrink your **attack surface**.
- Enforced in Microsoft 365 with **role-based access control (RBAC)**.
! Classic exam scenario: a new help desk tech helps users who get locked out. Don't give them Global Administrator — assign the **Password Administrator** role. They can reset passwords but can't open mailboxes or change security policies.
- This prevents **privilege creep** — users accumulating unnecessary permissions over time.
- **Privileged Identity Management (PIM)** gives top admins **just-in-time access**: they work as standard users, request temporary elevation through an **approval workflow**, get it for e.g. 2 hours, and the privileges are **automatically revoked**.
## Principle 3: Assume breach
> A hospital dealing with a contagious virus assumes it may already be inside — quarantine zones, isolated floors, every hallway monitored.
- A shift in mindset from **pure prevention to rapid containment**. Every component is treated as potentially compromised: anomaly detected → investigated → isolated → contained.
- It relies on **continuous telemetry** across your entire digital estate.
| Tool | Role
| **Defender for Endpoint** | Isolates devices showing ransomware or lateral movement (behavioural analytics)
| **Microsoft Sentinel** | Connects the dots: a bird's-eye view aggregating logs across domains, e.g. linking a phishing email to a strange login
| **Defender for Identity** | Watches identity traffic to catch complex identity attacks such as **pass-the-hash**
## The six pillars
Implementing Zero Trust isn't buying one piece of software — it's a **layered approach**. Six interdependent pillars, all connected by **visibility, automation and orchestration**.
| Pillar | What the lecture said
| **Identity** | The cornerstone — your digital passport. **Entra ID** enables passwordless sign-in with **Windows Hello for Business** or the **Microsoft Authenticator** app
| **Endpoints** | Any device connecting to data. **Intune** checks compliance (minimum OS, encrypted drive). A **jailbroken** personal phone is flagged non-compliant and blocked
| **Applications** | **Defender for Cloud Apps** stops **shadow IT** — e.g. blocks an upload to a personal Dropbox. **Entra ID App Proxy** gives secure remote access to on-prem apps without exposing them to the internet
| **Data** | The goal of Zero Trust. **Purview Information Protection** inspects, labels and encrypts (e.g. credit card numbers → Confidential). **DLP** blocks emailing it outside the company
| **Infrastructure** | **Defender for Cloud** assesses posture across multicloud (even AWS and Google Cloud). **Azure Policy** enforces deployment rules — a new server without encryption can't be deployed
| **Network** | **Network segmentation**; **Azure Firewall** restricts outbound traffic against exfiltration; **Defender for Identity** watches for **lateral movement**
`},
{d:"1", t:"Implementing Zero Trust in M365: 6 Phases", md:`
> Securing a massive corporate campus: not a single padlock on the gate, but checking IDs at every door, monitoring hallways and locking down the fireproof safes inside.
! The huge takeaway: Zero Trust isn't a **one-and-done** setup — it's an ongoing, everyday cycle. The six phases in order: **1 Assess posture → 2 Enable identity protection → 3 Enforce endpoint compliance → 4 Classify data → 5 Monitor threats → 6 Educate users.**
## Phase 1: Assess posture
> Surveying the blueprints and checking the existing locks before buying an expensive new alarm system.
- **Microsoft Secure Score**: like grading your organisation's security homework — a quantitative measure of security posture across all Microsoft 365 services. It identifies internal gaps (missing MFA, excessive admin privileges) and gives a dashboard of **actionable recommendations**.
! "Actionable" is a key term for the exam.
| Microsoft Secure Score | Purview Compliance Manager
| Your **internal** security grade | Your **external** legal audit
| Gaps against best practice | Maps configuration to **regulatory standards** (HIPAA, ISO 27001)
| | A lifesaver in healthcare or fintech
## Phase 2: Enable identity protection
> The front desk security check. **Identity really is your new perimeter**, and **Microsoft Entra ID** is your primary gateway.
- **Conditional Access** evaluates multiple signals in real time — who, where from, recognised safe device? — then **allows**, **requires MFA** or **blocks**.
! Burn this into your memory: the policy engine makes an **instant, context-aware decision** every single time someone connects.
- **Risk-based authentication** (your AI security guard): 1) detects anomalies like impossible travel, 2) evaluates the risk, 3) automatically requires MFA or forces a password reset.
- **Identity governance**: a 3-month contractor gets time-limited access to a SharePoint site through **entitlement management and access reviews**, and the access **automatically expires**.
! This prevents **privilege creep** — the dangerous accumulation of unnecessary access rights over time.
## Phase 3: Enforce endpoint compliance
> If checking identity is checking the driver's ID, endpoint compliance is inspecting **the delivery truck itself** at the loading dock.
- **Microsoft Intune** checks device health: encrypted with **BitLocker**? Fully patched? An unpatched laptop opening a sensitive OneDrive folder is denied.
- **BYOD → app protection policies**.
! You don't have to enroll or manage the employee's entire personal phone — protection is applied at the **application level** (no copy/paste from Outlook to a personal notepad app, Teams in read-only mode).
- **Endpoint analytics**: device performance and software health (frequent app crashes, long boot times from outdated drivers). It's how you prove to leadership that **high security doesn't have to mean low productivity**.
## Phase 4: Classify and protect data
> Data is the actual target. Organise your most valuable assets into highly monitored fireproof safes — **Microsoft Purview** is the hub.
| Sensitivity labels | Data loss prevention (DLP)
| Classify data by content and context | Actively prevents unauthorised sharing
| **Travel with the file** — encryption persists in SharePoint, Teams, even downloaded | Blocks emailing customer social security numbers to a personal address
! You must be able to contrast these two for the exam.
- **Policy tuning and incident response**: if a strict DLP policy creates too many **false positives**, refine the rules in the Purview dashboards — balance ironclad security with smooth operations.
## Phase 5: Monitor and respond to threats
> A 24/7 campus security command center. When prevention is eventually bypassed, you need continuous monitoring.
- Identities, endpoints, apps and data are continuously evaluated in a loop fuelled by **global threat intelligence** and **real-time telemetry**.
| Tool | What it does
| **Defender for Endpoint** | Behavioural analytics on devices; detects lateral movement or contact with a malicious server and, integrated with Intune, **automatically isolates** the device
| **Microsoft Sentinel** | Your **SIEM** — the central brain. Correlates a phishing email (Defender) and a compromised account (Entra ID) into a multi-stage attack
| **Defender for Identity** | Monitors traffic to **on-premises Active Directory**; stops lateral movement before domain admin privileges; bridges the gap for **hybrid** environments
! For the exam, Sentinel is the go-to tool for **correlation and automated playbooks**, plus **proactive hunting queries**.
## Phase 6: Educate users
> Training the entire campus staff on emergency protocols — **human error is almost always the weakest link**.
| Pillar of human defence | Example
| **Attack simulation** | Defender for Office 365 sends realistic simulated phishing emails
| **Awareness campaigns** | Viva Learning or Teams nudges about password hygiene
| **Role-specific training** | Finance learns invoice fraud; developers learn secure coding
! Recognise these three pillars for the AB-900.
`},
{d:"1", t:"M365 Threat Protection", md:`
## Unified security
- As businesses move to the cloud, the office is everywhere — the **attack surface expands**. Siloed security is like **guards who never talk to each other**.
- Attackers use advanced techniques like **phishing and credential theft**. Microsoft 365 runs attacks through AI and machine-learning defences, unifying security across **Exchange Online, Teams, SharePoint and OneDrive**.
## The Defender XDR suite
> An elite, perfectly coordinated rapid response team — skilled at prevention **and** at post-breach investigation and containment.
- Attackers use multi-stage campaigns: email → endpoint → stolen identity → cloud app. Defender **correlates signals from all four** for a complete, unbroken narrative of the attack.
| Component | Plain English | Example
| **Defender for Office 365** | Shield for email and collaboration tools | A link to a fake sign-in page is **blocked before the user can click it**
| **Defender for Endpoint** | Security guard at the employee's device | Ransomware downloads → laptop **automatically isolated**
| **Defender for Identity** | Monitors **on-premises Active Directory** | Stolen credentials moving laterally (**pass-the-hash**) → alert to the admin
| **Defender for Cloud Apps** | Supervisor discovering **shadow IT** | Files moved to a personal Dropbox → flagged and stopped
! You absolutely need to understand scenarios exactly like these for the exam.
## Defender and Purview
> A retail store: **Defender XDR** is the loss-prevention guard tackling shoplifters; **Purview** is the compliance auditor in the back office making sure private data is properly labelled and handled.
! A crucial exam point: **Purview is not part of the Defender XDR suite**. Defender handles **threat detection**; Purview handles **data security** — but they work together (Purview applies sensitivity labels to block external sharing while Defender monitors for attacks).
## Core threat features
> A highly automated corporate mail room that scans, X-rays and sorts out dangerous packages before anything reaches the CEO.
- **Anti-phishing flow**: email arrives → Defender scan → **spoof intelligence** (blocks fake sender addresses) and **impersonation protection** (stops emails pretending to be executives) → quarantine → protected user.
- **Safe Links** rewrites and scans URLs **at the exact moment a user clicks them**; malicious → quarantine.
! You must know the definition of **Zero-hour Auto Purge (ZAP)**: a sophisticated malicious email gets past the filters into an inbox; when Microsoft identifies the threat moments later, ZAP **retroactively removes the message even after it was delivered**.
- **Anti-spam and malware**: **transport rules** are custom admin instructions — e.g. quarantine any email with a **.exe** attachment, or block external emails containing "wire transfer".
## Threat intelligence and proactive protection
> Advanced weather forecasting: not an umbrella for today, but anticipating a hurricane days before it forms.
- The **Microsoft Threat Intelligence Center (MSTIC)** gathers insights from **over 65 trillion signals every day**. Human researchers + AI track **nation-state actors**, monitor **dark web** markets for stolen credentials and adapt global defences — a new attack in one region updates defences everywhere **within minutes**.
- **Threat Explorer** — included in **Defender for Office 365 Plan 2** — is a real-time investigation tool.
! Know the Threat Explorer workflow: **1) view real-time threats → 2) pivot** (find everyone who received the same bad URL) **→ 3) delivery status** — delete the emails from inboxes before harm is done.
- **Threat analytics**: a curated library of reports by Microsoft researchers, mapped to the **MITRE ATT&CK** framework — an encyclopaedia of known hacker behaviours.
`}
);
window.AB900_LECTURES.push(
{d:"1", t:"Identity & Authentication in M365", md:`
> Think of identity as your name on an exclusive guest list. Authentication is the moment you actually show your ID to the bouncer at the door.
## Identity vs authentication
| Identity | Authentication
| **Who** is this person, device or service trying to access Microsoft 365? | **How** do we prove they are who they say they are?
- Every interaction with Microsoft 365 — checking email, joining a Teams meeting, opening a SharePoint document — **starts right here**.
- **Microsoft Entra ID is the bouncer**: the cloud-based identity and access management system. It's not just humans — **machines and software applications have digital identities too**, and Entra ID verifies all of them.
## Cloud-only vs hybrid identities
| Cloud-only | Hybrid
| "Born in the cloud" | "Commuters moving in from the suburbs"
| Created and managed entirely in Entra ID, no on-prem dependency | Originate in an on-premises **Active Directory**
| | **Synchronised** to Entra ID with **Microsoft Entra Connect Sync**
## Passwordless sign-in
> Upgrading from a simple, easily copied metal key to a high-tech smart card.
| Method | How
| **Microsoft Authenticator** | Push notification to your phone, approved with your fingerprint
| **FIDO2 security keys** | Physical USB or NFC tokens — e.g. at a public kiosk
| **Windows Hello** biometrics | Facial recognition or fingerprint built into the device
| **Certificate-based authentication (CBA)** | Digital certificates on smart cards, often with a PIN
! The crucial takeaway for Copilot admins: push for these **phishing-resistant** options — they improve **both security and the user experience**.
## Multifactor authentication
> A bank vault that needs both a PIN code and a retinal scan.
- MFA requires two or more of: **something you know** (password, PIN), **something you have** (phone, hardware token), **something you are** (biometrics).
! As an AB-900 candidate, understand that enforcing MFA drastically reduces account compromise: even with a stolen password, the attacker doesn't have your phone or fingerprint — which keeps your Copilot deployment safe.
## Identity protection
- **Self-service password reset (SSPR)**: users reset their own password by verifying a code on their phone — saves IT support time and money.
- **Microsoft Entra ID Protection**: a user signs in → machine learning analyses the risk (e.g. an unfamiliar country) → checked against your **risk policy** → access blocked or an extra verification step demanded.
## Hybrid authentication methods
> A local branch office verifying a visitor's credentials with global headquarters.
| | Password hash sync (PHS) | Pass-through authentication (PTA) | Federation (AD FS)
| What happens | Only a **hash** of the password syncs to Entra ID; validation is **entirely in the cloud** | Entra ID puts an encrypted request in a queue; an **on-prem agent** checks local AD in real time | Sign-in is **delegated** to the on-prem AD FS server, which issues a trusted token
| On-prem goes down | **Users can still log in** | Sign-in depends on on-prem | Sign-in depends on on-prem
| When | **Most common and recommended**; simple and resilient | **Strict compliance** — passwords never stored in the cloud in any form | Highly customised sign-in pages
! For your exam: Microsoft now heavily recommends **PHS or PTA** for most organisations, because **federation requires much more infrastructure** and is more complex.
## Single sign-on (SSO)
> An all-access VIP wristband at a music festival: show your ID at the main gate once, then walk into any VIP tent.
- **Cloud-only**: identities, authentication and tokens all in Entra ID — faster deployment, ideal for cloud-native start-ups.
- **Hybrid**: **Entra Connect Sync** bridges domain-joined workstations to the cloud; log into the office PC and you're automatically signed in to Outlook and SharePoint.
- **Device-based SSO**: with **Intune**, sign into the laptop with Windows Hello → the device gets an **SSO token** → Teams and OneDrive open with zero password prompts.
! The key benefit isn't just convenience: less **password fatigue** drastically reduces the risk of falling for phishing.
`},
{d:"1", t:"Access & Permissions in M365", md:`
> Authentication is the security guard checking your ID at the front desk. Authorization is your encoded **key card**, deciding which floors and secure rooms you can visit.
## Authorization basics
- Once identity is verified, **authorization** governs which tools, services and data users may access.
! The ultimate goal is the **principle of least privilege**: exactly what users need for their job — nothing more, nothing less.
- Permissions use a **layered architecture**: broad tenant-wide roles → resource-specific permissions → context-aware controls. This layered logic is what lets admins safely secure complex AI and Copilot environments.
## RBAC in Microsoft Entra ID
> A busy restaurant: the head chef has the whole kitchen; a regular patron is assigned one table.
- Microsoft 365 uses **role-based access control (RBAC)** built into **Entra ID** as its central authorization mechanism.
- **Global Administrator** = the head chef, full control — you wouldn't give everyone that. Use **service-specific roles** with a rigidly defined scope: **Exchange Administrator** for email, **Teams Administrator** for communications.
- Non-admins get access through **group permissions**: adding a user to a group (input) → read, edit or manage shared items like a SharePoint library or Planner board (output) — independent of any admin role.
! Exam scenario: **Sara** is added to the Marketing team group as a **member** → edit access to the team site and calendar. She's added to an Event planning site as a **visitor** → **read-only**. **Scope matters** — permissions change depending on the resource.
## Advanced authorization
> Modern airport security scans your bags, assesses behaviour and checks your origin before letting you board.
- **Conditional Access** — hands down one of the most powerful authorization tools — applies rules based on real-time **sign-in risk, device compliance, location and app sensitivity** (e.g. require MFA for financial data from a personal unmanaged device).
- **Privileged Identity Management (PIM)**: just-in-time, temporary admin roles, automatically revoked when the approved window ends.
! Understanding how **PIM reduces the risk of credential misuse** is essential for the AB-900.
| Access packages | Sensitivity labels
| **Entitlement management**: bundle permissions across apps and sites with approval workflows | Authorization **at content level**
| Perfect for onboarding a new employee | Follow the document; restrict printing, copying or forwarding even after access is granted
| Grants entry | Travels with the document
## Users and groups
> A music festival: users are individual concert-goers with tickets; groups are whole VIP sections security manages as one block.
- A **user** has unique credentials, licences and a **user principal name (UPN)**. Assign users to groups and **grant permissions to the group**.
| Group | Vehicle | What it does
| **Security group** | Sports car — one fast task | **Solely controls access** (SharePoint sites, Teams channels, Conditional Access). No shared mailbox or calendar
| **Microsoft 365 group** | Moving truck — heavy collaboration | Automatically provisions a shared **Outlook mailbox, group calendar, SharePoint library, Planner board** and optional **Teams** workspace
| **Mail-enabled security group** | Hybrid | Access control **plus** mass email
| **Distribution group** | Passenger bus | **Mass email only** — can't assign security permissions
- **Dynamic groups** are populated automatically from **user attributes** in Entra ID (rule: department equals Sales). Change department → removed automatically. Zero manual work.
## Administering users and groups
> An expert mechanic: a standard wrench for daily tune-ups, specialised diagnostics for a fleet overhaul.
| Tool | For
| **Microsoft 365 admin center** | Daily basics: reset a password, add a user to a group
| **Microsoft Entra admin center** | Complex identity: dynamic group rules, Conditional Access
| **PowerShell + Microsoft Graph API** | Enterprise-scale automation
- **Graph API + HR database**: new hire → project teams and tool access updated automatically; leaver → access revoked instantly. Eliminates **lingering permissions** and manual human error.
- Best practices: **departmental groups** (Finance team) for sensitive apps, **project-based groups** (Q1 launch) for temporary collaboration, **dynamic groups** for real-time alignment.
! If an admin is still manually adding and removing users to ensure security, the environment is **neither scalable nor truly secure**. Automated group-based permissions layered with Conditional Access is the key.
`},
{d:"1", t:"Microsoft Entra: Conditional Access, Identity Secure Score & PIM", md:`
> Your company network is an exclusive VIP nightclub, and Microsoft Entra is the master guest list evaluating everyone at the front door.
## Microsoft Entra features
- **Entra ID is your central directory**.
! For the AB-900, understand this flow: Entra processes a user's login and securely routes them to **Microsoft 365 or Azure** using **single sign-on** — no dozen passwords, front door still locked tight.
- **ID Protection** uses machine learning to stop risky sign-ins before they happen. **Permissions Management** enforces least privilege across **Azure, AWS and Google Cloud**.
## Conditional Access policies
> A warehouse security guard who checks your badge, whether you're wearing a hard hat and what time your shift starts.
- The **dynamic policy engine at the heart of the Zero Trust model** — decisions based on **real-time context**, not static passwords.
- Signals include an **unmanaged personal laptop** or a sign-in from a **high-risk geographic region**.
- Example: an external contractor accesses sensitive data → signals pulled → risk evaluated → **MFA demanded** → access decision.
- **Windows 365 Cloud PC** flow: user signs in → device passes an **Intune compliance check** → user completes MFA → access granted.
! For your AB-900 prep: admins use the **What If tool** to validate the workflow in a simulation so they don't accidentally lock out legitimate users.
## Identity Secure Score
> Like a personal credit score, but for a corporation's security health.
- An analytics dashboard in Entra ID that **prioritises recommendations** to reduce identity threats, based on Microsoft's threat intelligence.
! For the AB-900, know that admins manage improvement actions with **status options** — e.g. **planned**, **resolved through a third party**, or **risk accepted** for business reasons (the default is "to address"). Not every recommendation fits every business.
- Example: inactive accounts plus outdated **legacy authentication** still active → remove stale accounts, **block legacy auth with Conditional Access**, roll out MFA → a measurable **40-point increase**, reportable to auditors and leadership.
## Privileged Identity Management (PIM)
> Standard access is your everyday employee ID; PIM is a **temporary VIP visitor badge** for one floor, valid for a few hours.
- **Time-bound elevated access** to admin roles — no permanent standing admin rights, smaller attack surface.
! The PIM flow: request a sensitive role → **business justification + MFA** → **manager approval** → an **audit log** for compliance → access expires automatically.
- Example: a senior cloud engineer needs **Azure Network Contributor** for a data-centre migration → justification → lead approves → work done → **exactly 4 hours later the access disappears**. No manual clean-up, no **privilege creep**.
! PIM enforces Zero Trust through **time-bound limits, auditable logs and just-in-time approvals** — shifting from "trust by default" to "verify continuously".
`},
{d:"1", t:"Troubleshooting & Monitoring Identity", md:`
> Identity security is like the badge access system of a secure office building. If the scanner breaks or a badge is stolen, operational continuity grinds to a halt.
! Identity is the **Zero Trust cornerstone** ("never trust, always verify"). For your AB-900 exam: misconfiguring it doesn't just mean one compromised account — it can lead to **complete service outages**.
## Troubleshooting tools
| Tool | Analogy | Purpose
| **Microsoft Entra admin center** | The strict club bouncer | Main hub to manage and troubleshoot identity access
| **Sign-in logs** | The bouncer's clipboard | Every sign-in by a user **or automated service**: who, what, when, where
| **What If tool** | A **flight simulator** for admins | Simulates a sign-in for a user without them logging in — which policies apply, granted or denied
! Filtering sign-in logs **by user, app or IP address** is a mandatory skill — it pinpoints the true failure reason.
## Real-world access scenarios
- **Blocked by MFA**: start with the **sign-in logs** and verify the correct method (e.g. a **FIDO2** key if policy requires phishing-resistant MFA).
! Massive exam pitfall — **TOTP (time-based one-time passwords)**: the Authenticator app and Entra rely on clocks. If the phone's clock is slightly out of sync, the code fails. **Always check device clock sync.**
- **Denied by Conditional Access** (a valid reservation but you showed up in flip-flops — the dress code is device compliance): **What If tool** → which policy? → **Intune** → missing patches? → **Defender for Endpoint** → active malware alerts?
! Conditional Access doesn't just check passwords — it checks the **health of the entire device**.
- **Risky sign-in** (your bank freezes your card after New York then Tokyo): **Identity Protection** flags impossible travel or **leaked credentials** → access temporarily blocked → review logs → if it's real, **force a password reset and MFA**.
- **Travelling executive blocked** on hotel Wi-Fi abroad: check sign-in logs, verify the itinerary, grant an exception.
! Highly testable: use **PIM** to grant **temporary just-in-time access** rather than permanently relaxing security policies.
- **Legacy authentication fails**: basic auth (username and password over **POP or IMAP**) is vulnerable to brute force and should be blocked. Microsoft is retiring it.
! Upgrading clients to **OAuth 2.0 modern authentication** isn't a friendly recommendation — it's an **absolute requirement**.
## Audit logs
> A logistics warehouse master shipping log: every box in or out is recorded.
- Lives in the **Microsoft Purview portal**: unified tracking across **Exchange, SharePoint, Teams and Entra**.
- You need specific roles: **Audit Logs** or **View-Only Audit Logs**.
- Investigations: **"file downloaded"** events in SharePoint (exfiltration), unexpected **Global Admin** assignments, Teams policy changes. Automate with **PowerShell** or pipe into **Microsoft Sentinel** for real-time alerts.
## App registrations vs enterprise apps
! A classic exam trap. Think of a passport: **app registration** is filling out the application (metadata, who you are, requested permissions). An **enterprise application** is using the passport at border control — the **instantiated service principal**, the living instance in your tenant. **Registration is the setup; the enterprise app is the execution.**
`}
);
window.AB900_LECTURES.push(
{d:"1", t:"M365 Blueprint: The Corporate Campus", md:`
> Think of Microsoft 365 not as a bunch of software but as building a massive, highly secure corporate campus from the ground up: a solid foundation, a strong perimeter, dedicated departments and a master control room.
## Architecture and identity foundations
| Layer (floor) | What lives there
| **Identity** (ground floor) | Controls exactly who gets in — Entra ID
| **Service** | The offices: Exchange, Teams
| **Data** | **Microsoft Graph** — the building's internal pneumatic tube system
| **Intelligence** | AI such as Copilot
| **Security** | Wraps around the entire building
! For your AB-900 exam, remember this logic: a security rule applied on the **bottom floor automatically protects all the offices above it**.
- **Microsoft Entra ID** (you might remember it as **Azure Active Directory**) is the identity and access management platform. Recognise it as the **absolute authority** for enforcing things like MFA — revoke a badge here and access **stops instantly everywhere**.
- **Custom domain**: the default domain looks like a generic PO box (contoso.onmicrosoft.com). For a branded sign like contoso.com, you **must complete DNS verification** to prove you own it.
## Core services and AI
| Service | Room
| **Exchange Online** | The mail room
| **Teams** | The interactive meeting room
| **SharePoint Online** | The central corporate filing cabinet
| **OneDrive** | An employee's personal locker
! These are tightly integrated: **creating a team provisions a SharePoint site and an Exchange group mailbox** behind the scenes.
! **Known Folder Move (KFM)** is a heavily tested term: like a moving company silently copying an employee's desk into a fireproof vault every few seconds. It redirects **Desktop, Documents and Pictures** to the cloud — if a laptop falls in a river, the files are already protected.
- **Microsoft Copilot** has a dual role: embedded in apps (Word, PowerPoint) to generate content and summarise meetings, and a **platform-wide intelligence engine** that understands your work context.
! Copilot requests flow through **Microsoft Graph**, which enforces strict role-based access — Copilot only retrieves data the user is **explicitly authorised to see**. A standard employee can't use Copilot to summarise the CEO's private HR files. This security boundary is a **major exam focus**.
## The admin center
- In **admin.microsoft.com**, assigning licences is like handing out equipment by job: **E3** gives standard tools, **E5** unlocks the heavy-duty advanced security vaults.
- **Group-based licensing**: assign licences to an entire security group. The lecture says you can apply it to a **maximum of 20 groups** and **nested groups are not supported**.
- Email is down? 1) Check the **Service health dashboard** (like checking the local power grid status). 2) Use **PowerShell** for advanced diagnostics and bulk actions — heavily tested: scripts manage thousands of mailboxes instantly. 3) Watch the **Message center** for updates from Microsoft.
## Configuring collaboration services
| User mailbox | Shared mailbox
| A personal desk, created when an Exchange licence is assigned | A customer service front desk (support@contoso.com) — many people answer
| | **Doesn't require its own licence** (the lecture adds: unless users access it from a mobile device)
- **Transport rules**: an inspection station in the mail room — inspect headers, content or attachments, then block an executable or auto-encrypt an email with a credit card number.
- New project war room: 1) provision a **team site**, 2) configure the document library and turn on **version history**, 3) permissions governed by **Microsoft 365 group membership** — add a user to the team and they get chat, files and calendar at once.
## Security foundations
- Zero Trust: trust no one, verify everything. **Conditional Access** is an intelligent security guard who checks your ID, the city you're coming from and your device for malware.
! For the AB-900: CA is configured in **Entra ID** and is your **primary tool for evaluating real-time risk**. A managed corporate laptop, or an unmanaged rooted phone at 2 a.m.? → grant, block, or step-up MFA.
- **Microsoft Purview** protects the data inside: **DLP** stops a spreadsheet of social security numbers leaving; **sensitivity labels** watermark and encrypt legal documents; **retention policies** keep HR files exactly **7 years**, then shred them automatically.
## Role-based access control
> Give the night janitor the key to the supply closet, but never the code to the bank vault.
- Delegate with predefined roles under least privilege: a **help desk admin** can reset passwords but **can't alter compliance policies** — limiting the **blast radius** if an account is compromised.
`},
{d:"1", t:"The M365 Ecosystem", md:`
> You've just been handed the keys to a massive, state-of-the-art corporate office building — thousands of employees, filing cabinets, a mail room and hyper-efficient executive assistants. You have to understand the architectural blueprint.
## The layered architecture
| Layer | What it is
| **Identity** | Microsoft Entra ID — the secure lobby and badge system
| **Service** | Where work happens: Exchange, Teams, SharePoint
| **Data** | Powered by **Microsoft Graph**, connecting information across services
| **Intelligence** | Copilot and AI agents, pulling from that data
| **Security and compliance** | A force field around the whole building
! You must grasp how these five layers interlock, because **a change in one layer ripples through all the others**.
## Identity and domains
- **Entra ID** is the ultimate smart badge scanner: who gets in and what they may touch. For the exam, it's where you manage **authentication, MFA and Conditional Access** (e.g. verifying a login from a brand-new device across the world).
- Microsoft issues a default domain (contoso.onmicrosoft.com). A professional brand wants a verified custom domain — admins **verify ownership through DNS records**. Security policies, branding and external integrations all **respect domain boundaries**.
## Core services
- **Exchange Online**: cloud email and calendaring. Admins configure **user mailboxes** and **shared mailboxes** for departments, and manage **transport rules (mail flow rules)** to inspect content and headers, encrypt sensitive data or block attachments.
! Highly testable: **Teams is built natively on Microsoft 365 groups and SharePoint**. Creating a team provisions a SharePoint site and an Exchange group mailbox. Admins govern it with **meeting policies, transcription settings** and which **third-party apps** are allowed.
| Communication site | Team site
| HR broadcasts benefits info to the whole company | Tied to a group for collaborative, **version-controlled** document storage
- SharePoint document libraries let many people **co-author** a quarterly report without overwriting each other.
- **OneDrive** is the personal lockable desk drawer — **1 TB** per user. The magic keyword is **KFM (Known Folder Move)**: Desktop and Documents redirect into OneDrive automatically.
## Copilot and AI agents
- Designed to understand **user intent**: plain-English command → understands context → task automation → result.
- Copilot drafts documents, summarises meetings and generates reports; specialised agents serve departments; with **Microsoft Copilot Studio** organisations build **custom agents** tied to business processes (extensibility).
! For an AB-900 administrator, managing **how agents interact with organisational data** is a primary responsibility.
## The intelligence layer
- **Microsoft Graph** is the **central nervous system** of your building, connecting signals from emails, chats, documents and meetings. A Copilot question flows through Graph and returns a personalised, contextual answer.
! Graph strictly honours role-based access: Copilot can only surface information the user **already has permission to see. No exceptions.**
## Security and compliance
- **Microsoft Purview** is your **chief compliance officer** — a central console for data governance. DLP and sensitivity labels detect credit card numbers or health records.
! Because Copilot operates within this framework, **restricting a document in Purview restricts Copilot** from oversharing it in an AI summary.
- Zero Trust checks IDs at every interior door: **Defender XDR and Entra ID** assess identity, device health and threats like malware and phishing before access is granted.
! The final takeaway: if an admin forgets to label or restrict a confidential HR document and the permissions are open, **Copilot will read it**. In an AI-enabled environment the technology is only as secure as the administrator who configures it.
`},
{d:"1", t:"The Microsoft 365 Admin Center", md:`
> A massive logistics dispatch center: just as a dispatcher monitors every truck route, the admin oversees the whole IT environment from this portal.
- The **central hub** for users, services, security configuration and environment health. The dashboard shows user activity, licence usage, service health and **recommended actions**, organised into Users, Devices, Roles, Billing and Settings.
! The interface is **role-aware**: it only shows the buttons you're authorised to touch. A Global admin sees everything; an Exchange admin sees only email settings. This design prevents accidental changes by restricting access by job function.
## Users and licence management
> Assigning licences is like handing out security badges and specialised equipment on a new hire's first day.
- The **licence type** decides which features a user can use. Assign individually or with **group-based licensing**.
! Group-based licensing limits from the lecture: **max 20 groups per assignment** and **no nested groups**.
| Microsoft 365 E3 | Microsoft 365 E5
| Core productivity: Exchange Online, SharePoint Online, Teams | Advanced: **Defender for Office 365, eDiscovery, compliance analytics**
- The exam tests your ability to balance **cost efficiency and compliance** — when a user needs E3 vs E5.
! Provisioning workflow you will be tested on: create the account in **Active users** → **set the location FIRST** (licensing legally depends on the location attribute) → assign the licence → configure MFA → add to a security group (e.g. Remote workers) so the right Conditional Access policies apply.
## Service-specific admin portals
> The main admin center is corporate HQ; the service portals are specialised branch offices with granular control.
| Portal | You manage
| **Exchange admin center (EAC)** | Shared mailboxes, mail flow rules, accepted domains, retention policies, **litigation holds**
| **Teams admin center** | Channels, messaging and meeting policies, app permissions, call quality analytics
| **SharePoint admin center** | SharePoint **and all OneDrive settings**
! A classic trap: there is **no dedicated OneDrive admin portal**. Sync, sharing, storage limits and device access are managed in the **SharePoint admin center**, because OneDrive is built on SharePoint.
## Org settings
> The standard operating rules for a retail chain: same branding, same security codes, same stock-room rules in every store.
- DNS records, vanity domains, tenant roles and calendar sharing, **profile branding** (users recognise official communications).
- **Security defaults**: require MFA for everyone and **block legacy authentication**.
- **External sharing**: can guests access SharePoint files? Restrict it for sensitive departments like finance.
! Org settings enforce legal and security compliance **universally across the board**.
## Monitoring health and usage
> Warning lights on a delivery truck's dashboard — low fuel or tyre pressure before you break down.
- Example: a spike in failed sign-ins from one region → Service health + sign-in reports → no outage, just a **misconfigured Conditional Access policy** → fixed. You can set **email alerts** for services.
| Tool | Purpose
| **Service health dashboard** | Real-time service status: outages, advisories, planned maintenance
| **Usage reports** | Adoption metrics, active users, storage consumption
| **Message center** | **Upcoming changes** from Microsoft (e.g. a new Teams meeting policy next month)
! You absolutely must be able to distinguish these three tools.
## PowerShell and automation
> Clicking in the web interface is hand-packing boxes; PowerShell is an automated conveyor belt for bulk orders.
| Module | For
| **Exchange Online PowerShell** | Mailboxes and transport rules
| **Teams module** | Policies and provisioning
| **SharePoint Online Management Shell** | SharePoint
| **Microsoft Graph PowerShell SDK** | Unified API access
- Cost efficiency: a script finds mailboxes with **zero activity in 90 days** and disables them — better security and freed licences.
## Responding to a service outage
> An IT fire drill: don't panic, follow a strict procedure.
! The workflow: users can't access email → **1) Service health** confirms an Exchange Online incident → **2) subscribe to updates and notify users through Teams** → **3) Exchange Online PowerShell** to verify your own mail flow → **4) follow-up message and update documentation**. A core competency for the exam.
`},
{d:"1", t:"Configuring Exchange, SharePoint & Teams", md:`
> A bustling office building: Exchange is the mail room, SharePoint the ultra-secure endless filing cabinet, and Teams the glass-walled conference room where everyone works together.
! For the AB-900: getting this initial setup right lays the groundwork for a scalable environment and is what lets **AI agents function securely** later on.
## Exchange Online
> The ultimate digital post office for a non-stop flow of inbound and outbound communication.
| Role | Access
| **Global Administrator** | Master keys to the whole building — use very sparingly
| **Exchange Administrator** | Mailboxes, mail flow, anti-spam policies
| **Organization Management** role group | Most features, but not everything
! Lock in role-based access logic: always grant admins the **least privilege** they need.
- The **Exchange admin center dashboard** shows inbound/outbound metrics — monitor mail flow volumes, investigate bottlenecks, apply transport rules.
| Mailbox | For
| **User mailbox** | A personal digital desk, set up when a licence is assigned
| **Shared mailbox** | A general support address many agents use — **no extra licence** (the lecture adds: unless accessed directly from a mobile device)
| **Resource mailbox** | **Things, not people**: books conference rooms or company vehicles, so double booking is practically impossible
- **Mail flow logic**: a transport rule acts like a trained postal inspector — encrypt a message containing a credit card number, block a suspicious attachment. Compliance enforced **invisibly**.
| Retention policy | Litigation hold
| Lifecycle of email — e.g. keep deleted mail 30 days in a hidden folder, then wipe it | A strict **legal freeze** when the company is sued
| Basic housekeeping | Preserves **all** mailbox data **indefinitely**: originals, deleted items, everything
! Remember: **retention is for housekeeping; litigation hold is for legal protection.**
## SharePoint Online
> The secure corporate library and digital broadcasting center where organisational knowledge lives.
- **SharePoint Administrator** manages **site collections** and overarching sharing rules.
- A user added to a **Microsoft 365 group** gets site permissions automatically: **owner** (full control), **member** (edit), **visitor** (read-only).
| Team site | Communication site
| A project **war room**, integrated with M365 groups, with shared calendar and group mailbox | A polished **corporate billboard** — few publish, everyone reads
| Group collaboration | HR policies, company news, new-hire onboarding (like an intranet)
| Document library | Custom list
| Digital shelves for files; **versioning** shows who changed a contract and when | "Spreadsheets on steroids" for structured data (IT assets, logistics)
- **Power Automate + lists**: an IT asset marked broken triggers an email to a technician automatically.
## Permission inheritance
> Russian nesting dolls.
- By default **permission inheritance** cascades down: site → libraries → folders.
! **Broken inheritance** is a big one: an admin cuts a highly sensitive folder off from the default rules and locks it down so only a handful of executives can open it.
## Microsoft Teams
- Built directly on **M365 groups, Exchange and SharePoint**. The **Teams administrator** governs the ecosystem: policies, external app integrations, usage analytics. **Delegated settings** let team owners tweak things themselves so admins aren't a bottleneck.
| Channel | Who
| **Standard** | Open to everyone in the team
| **Private** | Restricted — e.g. a confidential leadership discussion inside a department team
| **Shared** | A **bridge** to other departments or **external partners** for one project, without access to the whole team
! You really need to understand the architecture of Teams channels for the AB-900.
| Policy | Example
| **Meeting policies** | Managers can record meetings; general staff can't (privacy)
| **Messaging policies** | A regulated financial firm disables GIFs and stickers
| **App permissions** | Block unapproved third-party software
- Extensibility: a live **Power BI dashboard as a tab**, **connectors** pulling Salesforce updates, **bots** as an automated IT help desk.
`}
);
window.AB900_LECTURES.push(
{d:"1", t:"Security, Identity & Compliance Foundations", md:`
! To crush the AB-900 you've got to master security, identity and compliance — the baselines that lock down users, devices and data **before you even think about deploying Copilot**.
## Foundations
> A highly secure corporate building: guards checking IDs, swipe badges for VIP floors, locked filing cabinets for sensitive paperwork.
| Tool | In the building | Role
| **Microsoft Entra** | The ID badge system | Identity and access management
| **Microsoft Purview** | The locked filing cabinet | Data compliance and content protection
| **Microsoft Intune** | The security guard checking gear | Devices and their health
! Configuring these three baseline tools is what keeps **Exchange, SharePoint and Teams** secure.
## Device access policies
> A bouncer checks two things before unhooking the velvet rope: your ID and whether you meet the dress code.
- **Device compliance** (the dress code) is enforced by **Intune**: recent OS version, active antivirus, password complexity, encryption like **BitLocker** → marked **compliant**. The cornerstone of secure access management.
- Then **Entra ID** evaluates the request with a **Conditional Access** policy based on device state: is it compliant, is it **hybrid Azure AD joined** (a known corporate asset)? If not, access is denied.
- **App protection policies** work at the **application level** (Outlook, Teams) without controlling the whole personal phone — a game changer for **BYOD**. Example: block copying text from a corporate email into Instagram or Twitter.
| Rooted | Jailbroken
| Usually an **Android** phone modified for root control (often to bypass carrier restrictions) | Usually an **iOS** device modified to remove manufacturer restrictions
! Know the difference for the exam. Both strip built-in security; app protection policies can **automatically block Microsoft 365 apps** the second a device is detected as rooted or jailbroken.
## Conditional Access
> Airport security: normally you walk through, but if you flew in from a high-risk location you're pulled aside for an extra bag check.
- Built into **Entra ID**: evaluates who the user is, where they log in from, device health and risk level → grant, block or limit.
! Understand three key configuration areas: **user and group targeting, sign-in risk evaluation and session controls**.
| Area | Example
| **User and group targeting** | Finance must use MFA **every time** for Exchange Online; general staff get a more relaxed rule (a summer intern ≠ the CFO)
| **Sign-in risk evaluation** | Impossible travel (New York, then 10 minutes later a country never visited) → high risk → block or force a password reset
| **Session controls** | View SharePoint in a home browser, but **no download or print**
- Session controls are enforced through **Microsoft Defender for Cloud Apps**, especially on unmanaged devices: they can look, but can't take the data with them.
## Protecting corporate content
> HR folders at different levels — some open to all, some managers only, some confidential legal folders that self-destruct after 7 years.
| Purview tool | What it does | Example
| **Sensitivity labels** | Classify and protect; usually rely on users classifying their own documents | "Confidential Legal" → encrypted, legal only, watermarked — on disk or emailed
| **Data loss prevention** | **Automatically inspects content** to stop leaks | Spreadsheet of social security numbers to a vendor → blocked + notification that **educates the user**
| **Retention policies** | Manage the data lifecycle (law and storage cost) | HR documents kept exactly **7 years**, then deleted automatically
## Monitoring policy deployment
> Deploying policies without monitoring is like hiring a guard, installing cameras, and never looking at the footage.
| Question | Where
| Investigate a **data leak** | **Purview portal** → DLP alerts
| Why was a user **blocked from logging in**? | **Entra admin center** → sign-in logs
| Health of a **laptop fleet** | **Intune** reporting dashboards
- A smart admin correlates a DLP alert in Purview with sign-ins from unmanaged devices in Entra to find unauthorised access to HR documents.
## Implementation best practices
> A sports team tests a new strategy in a scrimmage, not the championship game.
! Critical for the AB-900: **always start with a pilot group** (so you don't lock the whole company out of email), **use built-in templates** (preconfigured DLP templates for financial and health data), **review audit logs**, and **educate users** — if they understand why something was blocked, they're less likely to find a dangerous workaround.
- **Automation with Power Automate**: a DLP trigger (someone sharing credit card numbers) → urgent alert to security + access revoked instantly.
`},
{d:"1", t:"RBAC: Role-Based Access Control in Depth", md:`
> Handing out keys to a new corporate office: you'd never give every employee a master key to every door, the server room and the CEO's office — you'd hand out room keys or floor passes based on the job.
! For your AB-900, RBAC is absolutely crucial: the structured approach to securely distribute admin responsibilities so **no single person has unchecked power** over security, compliance or configuration.
## The basics
- A **role** is a permission to do a specific task. A **role group** is a container for one or more roles; users added to it get its permissions.
- This illustrates the **principle of least privilege** and enables **separation of duties** (IT support manages accounts, compliance accesses audit logs, communications manages Teams).
! Keeping the **Global Administrator entirely separate from the Billing Administrator** drastically reduces fraud, privilege abuse and accidental configuration errors.
## Predefined admin roles
> Restaurant staff: the head chef and waiting staff have preset tasks and stations they can't deviate from.
- Built-in roles are fast to assign and cover the common tasks. A new **Exchange admin** gets email settings but **no** broader SharePoint or Teams permissions.
! They prevent **privilege creep** — an employee who changed departments three times in five years suddenly able to modify payroll, delete the intranet and read everyone's email.
- Assign in the **Microsoft 365 admin center** in a few clicks. For a huge group (Help desk admin for **50 new technicians**), use **PowerShell bulk assignments**.
## Custom roles
> A contractor fixing the air conditioning gets a temporary visitor badge for the mechanical room only.
| Step (in Entra ID) | What | Example
| **1. Define permissions** | Select only what's required from a massive list | Read audit logs, but not modify them
| **2. Assign scope** | Limit the role to specific groups, departments or resources | Marketing only
| **3. Assign groups** | Tie the role to the right security groups |
! **Scoping is your secret weapon.** Marketing manages Teams channels for its own projects only — impact strictly limited to their department.
## Delegating securely
> Truck keys handed to a driver at the start of a shift and returned the second it ends.
- **Use security groups for role assignment**, not individuals — remove a leaver from the IT support group and their admin rights are revoked instantly (no **orphaned permissions**).
- **Regularly review role assignments** — e.g. a contractor who still has SharePoint admin rights 3 months after the project ended.
- **Document** role definitions and assignments for transparency in a compliance audit.
## Monitoring and auditing roles
> A high-end retail store keeps the cameras running 24/7 to see who opens the cash register.
| Tool | Purpose
| **Purview portal audit logs** | Comprehensive record of admin activities and role changes
| **Entra admin center** | Track who holds admin roles; spot unusual access patterns
| **Automated alerts** | Notify you of critical role changes
! Spot anomalies: someone suddenly assigned **Global Admin at 3:00 a.m.** outside business hours → an automated alert lets you investigate immediately.
## Implementation and rollout
> A head chef taste-tests a new recipe with the kitchen staff before putting it on a busy Friday menu.
- Start with a **pilot group**, lean on **built-in templates**, and **educate** admins about least privilege.
! Your road map for the AB-900: **Test → Pilot → Refine → Roll → Deploy securely**.
`},
{d:"2", t:"Microsoft Purview: Data Governance & Copilot Protection", md:`
> A massive global logistics hub with millions of packages moving every second — if you don't know what's in the boxes, where they're going or who may open them, chaos ensues. **Microsoft Purview is the air-traffic controller for your data.**
## Purview and governance
> A centralised security badge system in a corporate building.
- Purview **discovers, classifies and protects** data across emails, documents and cloud apps.
! For the AB-900, remember Purview is the **centralised suite** that unifies **information protection, data governance and risk management** in a single portal.
| Regex (regular expression) | Exact Data Match (EDM)
| A bouncer looking for anyone with a generic ID badge — guesses from patterns (any 9-digit number) | A bouncer checking a secure **VIP guest list**
| Guessing causes false alarms | Only triggers on **known values** your organisation provides — **drastically fewer false positives**
- EDM flow: **input** — HR uploads a secure CSV of real employee IDs → **process** — Purview scans for exact matches → **output** — protection rules trigger.
- **Sensitivity labels** are bright red TOP SECRET stamps that **travel with the document**. They **encrypt** (authorised groups only), **visually mark** (headers, watermarks) and **restrict actions** (printing, external sharing). Protection is embedded in the **file's metadata** — even on a USB drive.
## Data lifecycle management
! A classic AB-900 trap — **label vs policy**: a **retention label** is a sticky note on an **individual file** ("keep this contract 5 years"); a **retention policy** locks an entire filing cabinet — a **whole location** such as a SharePoint site or all Teams messages. **Labels apply to items; policies apply to locations.**
- Lifecycle: content created → retention rule applied (it can hold a document **even if a user tries to delete it**) → deleted automatically when time expires. Outcome: **lower legal risk and saved storage**.
## Identifying risks and user actions
- **Insider Risk Management** (loss prevention watching the cashiers too): users already have legitimate access, so it analyses **behavioural baselines and HR signals** — mass downloads, sharing to personal email, abnormal hours.
! Example: someone submits a **resignation** to HR and then downloads **50 confidential files at 3:00 a.m.** → flagged as a high-risk correlation.
- **DLP** (an airport baggage scanner) inspects emails and files before they leave: detect, block, audit. Through **Defender for Endpoint**, DLP can stop copying to the clipboard or pasting into an unmanaged app.
- **Communication Compliance** (HR and legal reviewing workplace transcripts) scans emails, Teams messages **and Copilot chats** with machine-learning classifiers for harassment, insider-trading language and leaks, flagged for **human review**.
- **Activity Explorer** (a detective's evidence board with red string) gives a **forensic timeline**: labelled → downloaded to USB → shared externally.
## Compliance and eDiscovery
- **Compliance Manager** (a health inspector's checklist with a final grade) gives an actionable **compliance score** against GDPR or HIPAA, with improvement actions ("turn on audit logging", "apply DLP policies").
| eDiscovery Standard | eDiscovery Premium
| Content search, export, **legal holds** | Full **case management**, deep analytics (**near-duplicates**), **redaction**
! If the exam asks about complex legal cases or reviewing massive data sets, you're looking for **Premium**.
- **DSPM for AI** (a teacher making sure students don't sneak internet-connected calculators into a test) monitors **shadow AI** — unapproved third-party generative AI apps that might leak corporate data.
## Preventing SharePoint oversharing
- **Oversharing** is handing the master key to every employee and guest — e.g. a confidential file shared with **"Anyone with the link"**.
- **Data access governance (DAG) reports** expose high-risk sites with sensitive content shared excessively or lacking labels — a roadmap to revoke guest access.
- **SharePoint Advanced Management (SAM)** — a **premium add-on** — enforces **restricted site access**, sends **inactivity alerts** for stale sites, and forces **site access reviews** where owners confirm who still needs access.
## Copilot data protection
> Microsoft Graph is a highly secure, ultra-strict corporate librarian.
! The flow to memorise: **user submits a prompt → Microsoft Graph performs a strict permission check with the user's secure token** (sensitivity labels and DLP enforced here) **→ Copilot generates the result.** Copilot does **not** bypass security.
! Does Copilot see everything — could it leak the CEO's emails to a marketing intern? **Absolutely not.** Copilot is only allowed to **see what the user is already allowed to see**. No access to a folder → Copilot can't read it, summarise it or know it exists.
`},
{d:"2", t:"Purview & Data Governance: Additions", md:`
> A fast-moving logistics warehouse with millions of unlabelled boxes piling up every second — emails, documents and chats you know nothing about.
- An unmanaged data explosion risks violating privacy laws like **GDPR or HIPAA** and internal misuse of sensitive information.
! The reality for the AB-900: **you cannot administer AI tools like Copilot safely if your underlying data is unmanaged**.
## Purview core features
> The master control tower at an international airport: no data takes off or lands without authorisation.
| Category | For
| **Data security** | Cyber-security teams
| **Data governance** | Data engineers
| **Risk and compliance** | Legal teams
| Tool | What it does
| **Information Protection** | Encrypts files so only the right people can read them
| **Data loss prevention** | A guardrail blocking risky actions (emailing a credit card number outside the company)
| **Insider Risk Management** | Detects internal threats from unusual behaviour
! The logic flow for the exam: a **user activity happens → a scanner checks it against your rules → a policy action is applied automatically**.
- **DSPM (Data Security Posture Management)** governs sensitive data flows in **AI workloads**, so Copilot doesn't summarise a confidential executive document for someone who shouldn't know it exists.
- **80% of leaders** worry about oversharing and leaks with generative AI. Securing AI isn't flipping a switch — it needs a rock-solid governance foundation first.
## Data discovery and classification
> A corporate mail room that opens, reads and categorises every letter. You cannot protect what you cannot see.
- **Discovery** scans data sources like SharePoint and Exchange; **classification** assigns categories based on actual content. The **bedrock** for eDiscovery, DLP and Microsoft 365 Copilot.
| Method | How | Example
| **Sensitive information types (SITs)** | Predefined library: a **regex** pattern + **checksums** | Checks a credit card number is **mathematically valid**, not made up
| **Trainable classifiers** | Give Purview's AI **at least 50 sample documents** | HR résumés or source code — recognised even if "resume" never appears
| **Exact Data Match (EDM)** | Like a nightclub's strict VIP list | Only your uploaded employee ID numbers
- Regex can flag a 9-digit **inventory part number** as a social security number; EDM eliminates those false alarms.
## Information protection and labels
> A security badge permanently glued to an employee: it decides which rooms they can enter, in any building.
- Apply a **sensitivity label** → Purview embeds protection in the **file's metadata**, and the encryption — handled by **Azure Rights Management** — travels with it.
! **Control stays with the data, not the location**: email a confidential report to an unmanaged home PC and the encryption simply says no.
- Labels handle **encryption settings** (read, edit, print), **content markings** (TOP SECRET watermark), **access restrictions** (stop external sharing). **Label policies** can make labelling **mandatory** before a document can be saved.
## Data lifecycle management
> Retail inventory: keep tax records 7 years, throw out expired perishables.
- DLM automates retention and deletion: evaluate → apply rule → **retain, archive or delete**. Supports GDPR's **right to be forgotten** and saves legal teams sifting decades of expired data in eDiscovery.
| Retention label | Retention policy
| **Item-specific**: a 7-year legal hold on one contract | **Location-based**: delete all Teams chats older than **90 days** company-wide, whatever they say
! Know this distinction for the AB-900.
- **Auto-apply**: Purview detects a credit card number in a new Word document → a **5-year retention** hold is applied automatically — total compliance with zero user interaction.
`}
);
window.AB900_LECTURES.push(
{d:"2", t:"Identifying & Responding to Data Risks", md:`
## Purview and data risks
> A traditional office had physical walls, security badges and locked filing cabinets. With hybrid work, cloud storage and AI, **those walls have vanished**.
- Data is fluid: sensitive information moves between managed devices, **unmanaged personal phones**, external partners and **AI generators**.
! For your AB-900, Purview isn't one single tool — it's an **entire unified platform** for compliance, data protection and insider risk, securing both traditional endpoints and AI ecosystems.
- Instead of manual audits that react **after** a breach, Purview gives **real-time, contextual insights** and monitors risk proactively.
## Microsoft 365 and Copilot governance
> You hire a highly efficient executive assistant who, on day one, emails the confidential board notes to the whole company. That assistant is a bit like Microsoft 365 Copilot.
- AI boosts productivity but creates **new vectors for data exposure** — e.g. Copilot surfaces a restricted document and uses it to draft an external email.
! How it's stopped: when a user prompts Copilot, **Purview monitors the interaction**; if the prompt touches **labelled sensitive data**, Purview issues **warnings or a policy block**.
- Centralised dashboards detect **spikes in data access** and unauthorised **exfiltration attempts**, including those initiated by AI.
- Purview makes sure Copilot strictly honours **existing file permissions**, **lifecycle policies** and **audit requirements** — AI operates inside the governance boundaries you've already set.
## Insider Risk Management
> A trusted HR manager with legitimate keys to the sensitive cabinet suddenly empties it right before resigning.
- Insider threats come from users **who already have legitimate access**. Purview learns **behavioural baselines** and uses machine learning to flag deviations like mass downloads.
! Remember this formula: Purview combines **user activity with HR signals** to determine if a **risk threshold** has been crossed.
| Activity alone | Activity + HR signal
| Sign-in at 3:00 a.m., files sent to a personal Yahoo account | + a recent **resignation notice** or poor performance review
| Anomalous | **Risk threshold crossed**
- The added context drastically **reduces false positives** and helps compliance teams justify a formal investigation.
## Data loss prevention
> A smart scanner on a warehouse conveyor belt pushes a mislabelled hazardous package off the belt before it leaves the bay.
- **DLP** is the foundational Purview tool for enforcing data security, using **content inspection and sensitivity labels** — with **flexible actions** so it doesn't ruin productivity: **block** outright, or **allow with a business justification**.
! Exam-critical: **device-level enforcement via Microsoft Defender for Endpoint** — DLP can block copying files to a **USB drive** or pasting into a **personal browser**, even outside the cloud.
- **Adaptive Protection** applies controls dynamically by user risk level: an elevated-risk user (from Insider Risk Management) gets a **strict DLP block**; a minor-risk user just gets **policy tips**.
- DLP alerts integrate with **Microsoft Defender XDR and Microsoft Sentinel**, giving rich context on the data and the user's intent for automated workflows or targeted incident response.
## Communication Compliance
> A call-centre QA team using speech analytics to scan thousands of calls for prohibited phrases.
- Monitors **Teams messages, Yammer posts, emails and Copilot chats** with pattern matching and ML classifiers for harassment, abusive language, **insider trading** and regulatory violations. Flagged items land in a **reviewer dashboard**.
! For the AB-900: this is a **human-in-the-loop** process — an authorised analyst reviews the context and decides the next steps. It supports custom policies for regulated industries: **FINRA** (finance), **HIPAA** (healthcare).
## Activity Explorer
> A detective reconstructing a precise, chronological timeline of every footprint at a crime scene.
! Unlike standard alert dashboards that only show when a rule was broken, Activity Explorer gives visibility into **all user and data activity, even when no policy was violated**.
- It reconstructs linked sequences: label applied → downloaded to USB → emailed externally, minutes later. It's your **essential starting point for triaging alerts**.
`},
{d:"2", t:"Purview: Compliance, AI Data Discovery & eDiscovery", md:`
! Your core objective for the AB-900: master how Purview handles **compliance, AI data discovery and eDiscovery**, and how these tools intersect to enforce governance.
## The Purview portal
> The main lobby of a highly secure office building — what you see depends entirely on your access badge.
- The central hub to govern data, secure AI workflows and enforce legal rules. Depending on your **permissions and subscription**, different **solution cards** populate the homepage; without the right permissions, those doors simply don't appear.
## Compliance Manager
> A dynamic health inspector's checklist: not "the kitchen is dirty" but exactly which GDPR or HIPAA rule is missing and how to fix it.
- The **cornerstone risk assessment engine** in Purview — structured assessments tailored to regulations instead of static spreadsheets.
- The **compliance score** quantifies how well you meet regulatory requirements, broken down into **controls**:
| Microsoft-managed controls | Customer-managed controls
| Monitored automatically (e.g. back-end encryption) | Need **your manual verification** (e.g. mandatory staff training completed)
! The step-by-step flow: **evaluate** with pre-built assessments → **implement improvement actions** (a DLP policy, audit logging) → **assign owners** and check off actions → the **score increases**. Use the score to **prioritise remediation**.
## Data Explorer
> A high-tech retail inventory scanner that finds a single misplaced, sensitive item in a chaotic warehouse.
- Scans **SharePoint, Teams and OneDrive** for **sensitive info types** (social security numbers, health records, credit card numbers), then categorises and visualises them. Worst nightmare: a spreadsheet full of employee SSNs in a **public Teams channel**.
! Memorise the three filters: **location, label and content**. Filter by a label such as "Confidential Finance" to see who owns the files, how they're shared and whether external users have access — **before** implementing new policies.
## DSPM for AI
> A corporate badge tracker that specifically monitors where AI agents wander and which virtual filing cabinets they open.
- **Data Security Posture Management for AI** extends security visibility into AI interactions.
- **Shadow AI** = unauthorised use of generative AI apps, ML tools or even **browser extensions** without IT approval. Studies suggest **over half of employees** use unapproved AI tools at work.
- Scenario (a major exam focus): a user asks Copilot to summarise a confidential legal contract; without the right permissions the summary could be overshared. DSPM lets admins **detect the interaction, restrict access and automatically apply encryption or sensitivity labels to AI-generated content**.
| Built-in analytics (memorise) | What
| **Activity explorer views** | See actual AI prompts and responses
| **Audit logs** | Detailed user and AI activity
| **Oversharing assessments** | Where sensitive data is overexposed
| **Data risk assessment reports** | Summaries of user behaviour patterns
## Content search and eDiscovery
> A detective's extremely secure evidence locker — nothing can be tampered with.
- Locate, review and lock down information across **mailboxes, SharePoint, OneDrive and Teams**.
- Admins use **KQL (Keyword Query Language)** plus filters (keywords, sender, dates), then apply a **legal hold** — even if a departing employee empties the trash, the data is preserved for export and review.
| eDiscovery Standard | eDiscovery Premium
| Search, export, standard legal holds | End-to-end **case management**, **review sets**, **near-duplicate** analytics, **redaction** before handing to outside counsel
! Know this distinction clearly for the AB-900.
`},
{d:"2", t:"Data Access Governance & Oversharing", md:`
> Handing every employee a master key that unlocks every door: incredibly convenient, but a massive security risk. That's the challenge with cloud collaboration.
## What oversharing is
> A confidential HR folder left wide open on a table in a public break room.
- Oversharing happens when users grant **broader access to SharePoint content than appropriate or intended**; SharePoint applies the permissions immediately — a compliance risk or data leak.
- **Copilot** surfaces data a user technically has access to, even if they shouldn't. Three impacts: access **beyond what the role needs**, **inappropriate sharing**, and **out-of-date or irrelevant responses**.
! A crucial exam concept: **Copilot respects existing permissions** — if your permissions are too loose, Copilot's outputs become a major security risk.
| Common scenario | What happens
| **"Everyone" or "Anyone with the link"** | An internal draft plan forwarded to an external vendor via an anonymous link — unrestricted routing
| **Edit instead of view only** | An external partner could alter the marketing brochure's messaging or branding
| **External guest gets full site access** | Invited for one file, the guest reads HR records elsewhere on the site
## Identifying oversharing
> A store manager checking the security logs to see who unlocked which doors last night.
- **Sharing reports** in the M365 and SharePoint admin centers show who shared what, who has access and external sharing status — filter by site, folder or file.
| PowerShell | Microsoft Graph API
| **Bulk auditing** of user access | Similar, with more flexibility for **automated scripts**
- Example script: find all documents labelled **Confidential** shared with **Anyone with the link**, for targeted remediation.
! The risk formula: **sensitive data + broad access + high traffic = high risk** (credit card numbers + everyone can access + 575 users last week) → prioritise remediation immediately.
## Preventing oversharing
- **Sensitivity labels with encryption**: even if an HR report link is shared externally, only authorised HR members can open it.
- **Organisation-wide sharing limits** in the SharePoint admin center: **disable anonymous links** at the top level.
- **User education**: pop-up prompts reminding people to check permissions.
| Prepare | Operate
| **Fix existing risks**: restrict access to risky sites; stop Copilot processing sensitive files that lack controls | **Monitor for new risks**: notifications on new oversharing; **DLP policies**
! You absolutely have to **restrict existing risks first**, so Copilot only processes secure, well-governed files.
## Data access governance (DAG) reports
> A targeted radar sweep for the highest-risk collaborative spaces — accessed through the **SharePoint admin center**.
| DAG reports flag | Why
| Sensitive content with **excessive external sharing** | Direct leak risk
| **Inactive owners** | Nobody is managing the permissions — a massive governance risk
| **Missing sensitivity labels** | No protection on the content
! DAG reports are your **primary roadmap for targeted compliance**.
- Remediation: **analyse** the report (e.g. a legal site open to guests) → **assign new owners** where owners are inactive → targeted actions: revoke guest access, apply encrypted labels, or **disable external sharing** for that site.
## SharePoint Advanced Management (SAM)
> The vault — an elite security detail for your most critical assets. A **paid add-on**.
! SAM's lifecycle is a continuous loop: **monitor** (collaboration insights) → **detect** (DAG reports) → **act** (policies like **restricted access control**) → **automate** (site lifecycle management).
| Capability | Example
| **Restricted site access** | A finance site only accessible from devices managed by **Intune**
| **Inactivity alerts** | A project site untouched for **6 months** is flagged stale so you can archive it
| **Site access reviews** | Owners periodically confirm who should have access; integrates with **Conditional Access** (e.g. require MFA)
- Copilot readiness: basic reports → sensitivity labels → DAG reports → SAM for high-risk assets. From **reactive panic to proactive protection**.
`},
{d:"2", t:"Copilot Data Protection & Responsible AI", md:`
! The single most crucial rule for your AB-900: **Microsoft 365 Copilot only ever sees exactly what the user sees. Period.** It inherits the exact same access controls as the authenticated user.
- A common misconception is that AI sees everything or leaks between users — logically and technically, that isn't true. Data boundaries are impenetrable unless the user already has explicit permission.
## Data protection basics
> Copilot is like an employee with a key card who can only enter the rooms the card allows.
- Retrieval goes through **Microsoft Graph**, the API layer supporting all of Microsoft 365 — where the access check happens.
! A major takeaway: you **do not need to build a new security model for AI**. If SharePoint groups, OneDrive settings and Purview policies are configured properly, Copilot respects them.
## How Copilot accesses data
> A super-strict corporate bouncer who checks the guest list every single time.
- Outlook: summarises only emails the user can access. Word/Excel: analyses only files the user can open.
! Highly testable: Copilot **cannot bypass existing file permissions in SharePoint or OneDrive** under any circumstances.
! Exam scenario: a **marketing** user asks Copilot to summarise last quarter's **finance report**, stored in a finance-only SharePoint folder → **denied**. Copilot returns nothing and responds that **no such file can be found** — the user's Graph context lacks permission to know it exists.
## Microsoft Graph and the semantic index
- Graph is the organisation's **central nervous system** and the **mandatory secure gateway**. It uses an **OAuth token** representing the user's identity and authorization scope: prompt → token authenticated → semantic results.
> A semantic index is a highly intelligent library catalogue that understands the subject you're researching, not just exact titles.
- It turns content into **vectors** — mathematical representations of meaning — so Copilot understands **intent**, not just syntax ("project kickoff" also finds launch meetings and initial planning).
| Graph signal | Purpose
| **Context tokens** | Ensure authorization
| **Semantic understanding** | Gauge relevance
| **Temporal filters** | "Last week's meeting" → the right time window
| **File activity** | Prioritise files you recently edited or shared
! A warning for admins: disorganised, poorly governed data without metadata leads to **irrelevant or excessive AI outputs**. Copilot is only as smart as your data structure.
## Security and permissions model
> A bank vault inside the office building, with its own combination Copilot respects.
| Secure | Govern
| Honours existing permissions; protects against data loss and insider risk | Supports lifecycle policies and auditing
- Copilot respects Purview **sensitivity labels** (Highly Confidential), **DLP rules** and **Conditional Access** (blocking unmanaged devices). Purview lets you assess oversharing and stay compliant with AI regulations.
! Highly testable — **link sharing**: with an **"Anyone with the link"** share, Copilot can use the file; the moment the link **expires or is revoked**, Copilot **loses access instantly**.
## AI safety and responsible AI
> A strict code of ethics for a trusted employee.
- **Data minimisation**: Copilot fetches only the data needed — it doesn't crawl whole mailboxes. "Last week's meetings" narrows to the right time range and calendar items.
! For risk-mitigation questions: data exposure is **minimised by design**.
- **Content filtering** blocks inappropriate or unverified information. **Transparency**: every answer has **verifiable source links** to the Excel file or Teams chat used.
! **Auditability**: every Copilot interaction is logged — the **prompt history, the data accessed and the AI responses** are recorded in **Purview**. Vital in regulated environments.
`}
);
window.AB900_LECTURES.push(
{d:"3", t:"Microsoft 365 Copilot & AI Agents", md:`
> A brilliant executive assistant sits next to you, ready to draft emails, build spreadsheets and summarise meetings — but can only look inside **your** filing cabinets.
## Microsoft 365 Copilot
- Generative AI built into the apps you already use — Word, Excel, Teams. It operates inside your company's secure environment and only sees files and messages **you already have permission to access**.
| Step | Role
| **Orchestration service** | A traffic controller checking your credentials — the prompt doesn't go straight to the AI
| **Microsoft Graph and Work IQ** | Your digital history: emails, project files, working patterns — who your teammates are and what you're working on
| **Isolated large language model** | Processes the context and delivers a response into your app
- Public web AI tools may put your data in a "public library"; Copilot runs in a **private, isolated environment** — company data is **never shared** and **never used to train general AI models**.
! For the AB-900, remember Copilot's core identity: an **interactive, secure tool** that relies on **Microsoft Graph** to enforce strict **role-based data access** for every user.
## AI agents
> Down the hall, specialised clerks sort invoices and run reports automatically, without step-by-step guidance.
- Copilot helps you draft a single document; an **agent** handles specific **multi-step business processes in the background** on your behalf.
| Prebuilt / ready-made agent | What it does
| **Researcher** | Sifts through thousands of emails to summarise a project's history
| **Analyst** | Turns a messy spreadsheet into a clear chart without writing formulas
| **SharePoint agents** | Generated automatically for each new team site; **strictly limited** to that site's documents
- **Custom agents**: anyone can build one with **Copilot Studio Lite** — no code (e.g. answer travel-policy questions from HR files). **Professional developers** build **advanced agents** that reach outside Microsoft (sales database, shipping system).
## Copilot vs agents
| | Copilot | Agent
| How it starts | **Interactive** — idle until you type a prompt | Can be **autonomous** — triggered on a schedule or when a new invoice arrives
| Identity | Accesses as **you**, the individual | Often its own **dedicated service account**
| Data | Your data | Broader departmental data a single employee might not see
! The core distinction comes down to **scope and autonomy**: Copilot works interactively with you on your data; agents work automatically for the department under system-level rules.
## Licensing models
> A fixed monthly apartment rent vs a fluctuating water bill.
| Monthly per-user licence | Pay-as-you-go
| **Predictable, fixed cost** — even if used once or twice | Billed on **actual usage**
| | Flexible, but needs monitoring to avoid budget spikes
- Business and Enterprise plans both give the core AI features; **Enterprise** adds specialised tracking and security tools — audit every interaction and set strict rules for sensitive data.
- Rollout: **one master switch** for the whole company, or **targeted policies** (test with finance first, then everyone else).
## Shadow AI and Agent 365
- If employees build agents without telling IT, unsupervised software touches company data — **shadow AI**.
> **Agent 365** is a centralised security camera for your AI.
- It lists every active agent, its **assigned identity** and exactly what data it can reach, so admins can enforce **least privilege** (a shipping agent sees only shipping folders).
! For the AB-900, balancing innovation with security is the ultimate goal: **granular rollout controls + Agent 365 monitoring**.
`},
{d:"3", t:"Copilot Architecture: Under the Hood", md:`
> A brilliant new office assistant who knows every project, file and meeting you've been part of — and strictly follows every confidentiality rule.
! The first thing to get straight for the AB-900: Copilot is **not a standalone consumer app**. It's a secure, built-in **intelligence layer** in Word, Excel, PowerPoint and Teams, operating strictly inside your **Microsoft 365 tenant boundary** — it only accesses data the signed-in user can already see.
## Copilot architecture
> A highly secure corporate headquarters where only authorised people enter specific rooms.
- Three components: **Microsoft Graph, an orchestration service and large language models (LLMs)**.
! A massive takeaway: Copilot's **accuracy and security depend entirely on your data governance and role-based permissions**. No access to a confidential HR file → Copilot can't retrieve it.
## Graph and Work IQ
> The ultimate corporate mail room.
- **Microsoft Graph** is the backbone: a unified data layer across **Exchange Online, SharePoint, OneDrive and Teams** that **maps relationships** (you and a co-worker co-authored a document later discussed in a Teams channel).
! Graph enforces enterprise-grade security: it honours **Conditional Access** (a safe device?) and strictly respects **sensitivity labels** — the ultimate gatekeeper.
- **Work IQ**, built on Graph, builds a **work memory**: your patterns, context and how information flows.
! Understand **intent vs keywords**: ask for "Q2 financial progress" and Copilot matches your intent to a document titled "Quarterly revenue analysis".
## Large language models
> A brilliant multilingual writer locked in a private office who only knows the documents you slide under the door.
- Hosted in **Azure OpenAI Service**, interpreting prompts and generating natural responses.
! Burn this into your memory: models run in a **tenant-isolated environment**; your data is **never used to train the public foundation models**.
- Copilot never sends a raw prompt — it sends a **grounded prompt**: your request + relevant emails and files from Graph, processed in isolation → a business-tuned result within enterprise guardrails.
## Orchestration
> An expert traffic controller managing prompts, Graph data and LLMs.
| Stage | What happens
| **1. Prompt intake** | Captures and classifies the request
| **2. Evaluation** | Decides which data sources are needed (no wasted processing)
| **3. Enrichment** | Pulls context from Graph to build the grounded prompt
| **4. Execution** | Sends the enriched package to the LLM
| **5. Formatting** | Preps the output for the app and applies **compliance checks such as DLP**
- **Copilot connectors and plugins** bring external line-of-business data (CRM, ERP, HR) into Graph. Indexed inside the Microsoft 365 boundary, the same **data handling, privacy and governance** rules apply.
## Capabilities
> An automated assembly line turning raw materials into polished products.
| Capability | Example
| **Content generation** | A Word document from messy meeting notes
| **Data analysis** | Excel formulas and trends
| **Meeting summaries** | Teams action items from the transcript
| **Universal search** | Natural-language search across mail, chats and documents, even if you forgot the file name
- **Cross-app flow**: ask PowerPoint to build a presentation from Excel data and Word text — checked against admin controls and permissions.
## The prompt lifecycle
> A secure courier tracking a sensitive package from sender to recipient.
- Requests are **encrypted in transit (HTTPS)**: user prompt → **pre-processing** (grounding with Graph) → LLM → **post-processing** (automated compliance and **responsible AI checks** mitigate harmful content).
! Be able to articulate the three concepts: **1) the user prompt, 2) grounding** (Work IQ and Graph enrich it with authorised, relevant data), **3) response generation** (the isolated LLM processes it; orchestration polishes it).
| Three things that are always true
| **Data is always encrypted in transit**
| **Role-based permissions are strictly respected** — it only sees what you see
| **Your tenant's data never trains public foundation models**
`},
{d:"3", t:"Agents in Microsoft 365", md:`
> A proactive office assistant who anticipates what you need, organises files and drafts emails before your morning coffee — in Microsoft 365, that's an **agent**.
## What agents are
- AI-powered tools that automate routine tasks, answer complex questions and give personalised recommendations. They work **alongside you or on your behalf**, adapting to your workflow with machine learning.
! AB-900 takeaway: the shift from **basic assistance** to **acting on your behalf** is what fundamentally defines an agent.
> A logistics warehouse: sometimes a worker glances at a clipboard; sometimes an automated forklift plans its own route and escalates if blocked.
| Simple | Middle | Advanced
| **Retrieval**: answer questions from grounding data | **Take action**, automate multi-step workflows | **Fully autonomous**: orchestrate other agents, plan tasks dynamically
! Memorise this spectrum, from simple retrieval to advanced autonomy.
## The four types of agents
| Type | Analogy | Key points
| **Prebuilt** | Clothes off the rack | Made by **Microsoft or an approved vendor**; ready-made, no code; add to your **user library** — lower development cost. E.g. **Prompt Coach**, **Analyst** (uses **Python**)
| **Ready-made SharePoint site agents** | A librarian who only works in one room | Generated automatically for a new site; **scope strictly limited to that site**
| **Everyday user agents** | A smart-home routine on your phone | Built by business users in SharePoint or Copilot Chat with templates — code-free, strict permissions
| **Advanced agents** | A custom-built, fully automated skyscraper HQ | Need **programming skills**: Copilot Studio or **Visual Studio Code**; generative AI; **1,000+ connectors**
! Highly testable: a ready-made site agent is only generated when the user has a **valid Copilot licence**, the **right permissions** and a **properly configured environment**.
! For the exam: everyday agents **don't use advanced generative AI** to create new content or write code — intentionally limited for security and simplicity. **Advanced agents require developers, use generative AI and integrate complex custom connectors.**
## Copilot Chat and knowledge sources
> A 911 dispatcher instantly routing each call to the right specialised unit.
- In Copilot Chat, agents are specialised virtual assistants that respond conversationally in real time and can predict what a user needs next.
| Knowledge source | What
| **Web search** | **Bing** for up-to-date public data
| **SharePoint** | Internal, company-approved documents and libraries
| **Copilot connectors** | External apps such as **Salesforce, Jira, ServiceNow**
! A huge compliance topic: agents strictly respect **all Microsoft 365 security boundaries and permissions** across all three sources.
## SharePoint agents and the case study
- About **2 billion documents** are added to SharePoint and OneDrive every day. A SharePoint agent is like a project manager who has memorised every page in a huge filing cabinet — working only from SharePoint **sites, pages and selected files**, for owners, members and visitors.
! Contoso Camera case: a sales manager asks the **ready-made agent** on the **Mega 300** site for a pitch → it can't differentiate from the older **Mega 200**, because it only has access to that one site → they create a **custom agent** linked to **three sites** (Mega 300, Mega 200, R&D) → a detailed, competitive pitch. This is exactly why you step up from ready-made to custom.
## Tools for creating agents
> Copilot Studio is a dual-mode workshop: heavy machinery for engineers, simple guided workstations for everyone.
| Copilot Studio full experience | Copilot Studio lite experience
| Developers: advanced agents, custom connectors, generative AI | Business users: Copilot Chat agents in natural language, **no code**
- The **SharePoint agent tool** is an on-site facility manager built into SharePoint — optimises SharePoint-specific workflows and local site content without leaving SharePoint.
! The interfaces look similar and capture similar information, but **Copilot Studio** enables conversational chat features that **don't apply to SharePoint site agents**. Know the line between a **conversational chat agent** and a **document-focused SharePoint site agent**.
`},
{d:"3", t:"Copilot vs Agents: A Detailed Comparison", md:`
> Deploying AI is like assembling a world-class sports team: the right player in the right position.
| Copilot | Agent
| A personal assistant next to you, ready the second you ask | A mail-room robot behind the scenes sorting deliveries and triggering processes
! Ultimately: **Copilot is the UI for AI, while agents act autonomously on your behalf.**
## The basics
> A sous-chef who hands you exactly the right knife the moment you reach for it.
- **Copilot**: generative AI embedded in Word, Excel, Outlook and Teams.
! For the AB-900: Copilot is **reactive and assistive** — it relies on natural-language prompts — and **context-aware**, pulling real-time info from your current document or email thread.
> A factory line that turns on at 5:00 a.m., packages products and shuts off with no human intervention.
- **Agents**: customisable software entities for specific tasks — **flexible building blocks** (Copilot is general purpose), created in **Copilot Studio or SharePoint**, acting autonomously and grounded in specific workflows and data sets.
## Core capabilities
| Area | Copilot | Agent
| **Interaction** | A live phone call: prompt → instant response in your app | An alarm clock: runs on a **schedule** or an **event** (priority email, deadline)
| **Integration** | A walled garden: Microsoft AI models and Graph; admins manage access | A bridge outward — mini-apps with **triggers, external APIs, multi-step workflows**
| **Access** | Your personal ID badge — **only data you can see. No exceptions.** | A department master key — **service accounts or managed identities** with broader access
| **Customisation** | Adjusting the car's air conditioning: org-level configuration and tuning, low-code, your terminology | Designing a new engine: **treat it like code** — version control, testing, change management
| **Compliance** | A front-desk guard: audit logs, retention, chat transcript review | A bank vault: secure credentials, approval steps for sensitive actions, limit network access, monitor behaviour
! Understanding **access** is a massive security point for the exam.
## Productivity and automation
> An executive assistant helping with a memo vs a night-shift auditor compiling reports while you sleep.
- **Copilot** accelerates short-cycle, user-driven tasks (meeting summary, email draft, action items) where **you own the final judgement**. An **agent** never sleeps — e.g. nightly aggregation of every team's transcripts into a prioritised backlog by morning.
- **Accounts payable relay race**: the agent parses unstructured invoices, cross-checks purchase orders via API and writes entries to the ERP; for a complex exception it triggers a **human approval task**, and **Copilot** gives the reviewer a succinct summary. They can be paired.
- **IT operations** (a paramedic stabilising things before the engineer arrives): monitor **Azure alerts** or a **PagerDuty webhook** → run a diagnostic playbook (disk space) → safe remediation (clear a temp folder) or escalate with a well-scoped incident log → fewer noisy alerts, better **mean time to repair**.
## Governance best practices
! A foundational AB-900 concept: agent interactions must stay **within the Microsoft 365 and Azure service boundary**, using **label inheritance** and **DLP policies** so existing security, governance and privacy policies apply to agent output.
| Step | How
| **Keep access limited** | Store agent credentials in **Azure Key Vault**; avoid broad tenant-wide permissions
| **Test safely** | Simulations in a sandbox or non-production tenant — **dry run mode**
| **Monitor activity** | Send run histories and error logs to **Azure Monitor** or your SIEM
## Operational limitations
> Trusting automation without verification is like trusting a GPS that hasn't been updated in 10 years — you end up in a lake.
| Failure mode | Mitigation
| AI **hallucinates** incorrect outputs | **Human verification** for critical actions
| **Fragile UI automation** (mimicking mouse clicks breaks when a button moves) | Use **stable API connections**
| **Over-permissioned credentials** | Scope as narrowly as possible; strict **expiration dates**
- Copilot boosts **individual productivity**; agents drive **organisational efficiency at scale**.
`}
);
window.AB900_LECTURES.push(
{d:"3", t:"Copilot Plans vs Licensing Models", md:`
> Renting an apartment on a yearly lease versus paying a daily hotel rate: both give you a place to stay, but **what's inside the room** and **how you pay** are completely different things.
! For your AB-900: the **Copilot plan** determines the **technical features** (the furniture in the apartment); the **licensing model** determines the **financial and billing structure** (how you pay). Mixing them up is a super common trap.
- Three core categories: **free Copilot Chat**, the paid **Microsoft 365 Copilot** plan, and **Copilot Studio**.
## Comparing Copilot plans
! Mapping features to the correct plan is a **mandatory AB-900 exam objective**.
| Plan | What you get
| **Free Copilot Chat** | **Web-grounded only** — no connection to your company's private data
| **Consumer plans** | Copilot in Office apps, but **no Microsoft Graph work data**
| **Business** | Grounded in your secure **Microsoft Graph** data (email, Teams chats, SharePoint) — **hard cap of 300 users**
| **Enterprise** | Scales infinitely and unlocks advanced security via **Microsoft Purview**
| **Copilot Studio** | An add-on alongside all of these for **building custom AI agents**
- Enterprise is like a top-tier security checkpoint: Graph data flows through admin controls — filters that stop credit card numbers being shared, **Insider Risk Management** — before a secure result is delivered.
| Scenario | Answer
| A 20-person consulting firm with only free Copilot Chat can't summarise internal client project files | Web-grounded only — the admin must **purchase and assign the paid Microsoft 365 Copilot add-on**
| IT wants a Teams help-desk agent answering "What is the status of my IT ticket?" from an internal ticketing system | A standard plan won't do — you need **Copilot Studio capacity**, connectors and often premium rights (add-ons for Business or Enterprise)
! Heavily tested: an enterprise needs strict control over which content Copilot can access — **Enterprise plans** provide tools to **restrict search, apply sensitivity labels and audit usage logs**. Free and basic plans lack these controls.
## Monthly vs pay-as-you-go
> A flat-rate mobile phone contract vs a metered water bill.
| Monthly | Pay-as-you-go (PAYG)
| **Predictable, fixed cost** per licensed user every month | **Metered consumption** — you pay when someone triggers a prompt
| Admin assigns licences to a user group in **Microsoft Entra ID** → fixed monthly fee | **Every prompt hits an Azure meter** → variable bill
| | Integrates with **Azure billing**
! Exam pitfall — **overlicensing**: a monthly licence for a seasonal retail worker who uses Copilot once a month wastes budget — paying full price for an empty room.
- PAYG suits intermittent users (university researchers crunching data 2 weeks a semester), but heavy use during a merger or project rush can cause a **huge spike** in your Azure budget.
## Impact on SharePoint
> Giving Copilot access to SharePoint is like handing out master keys to a massive filing room — the licensing model dictates how risky those keys are.
- Copilot **only surfaces data based on the user's existing SharePoint permissions** — never a document they can't already read.
| Monthly (blanket licensing) | Pay-as-you-go
| **Security** risk: 5,000 licensed users querying daily; poorly secured HR or finance libraries → salary data surfaces | **Financial** risk: a legal team summarising thousands of contracts — every query hits the Azure meter
| Broad licensing demands **tight data governance** | Use **Azure workload tagging** — a digital name tag on a department's cloud bill
## Budgeting best practices
- Treat Copilot like your broader cloud infrastructure budget:
| Step | Why
| **1. Start with a PAYG pilot** | Collect real data on how often people prompt
| **2. Quarterly audits** of monthly licences | Remove licences from inactive users (seasonal interns, short-term contractors)
| **3. Azure cost alerts** | Get notified before a financial surprise
`},
{d:"3", t:"Deploying & Governing Copilot and Agents", md:`
## Deploying Copilot and agents
> Give a new employee a detailed map of exactly what they are and aren't allowed to access on day one.
- Standalone AI tools are like a public library. **Microsoft 365 Copilot** is an assistant who already holds the keys to your filing cabinets, working inside daily workflows through **Microsoft Graph**.
- You can't just flip a single switch — take a **modular approach**, balancing productivity with compliance.
## Feature controls and availability
> A master power switch in the basement plus individual room keys.
! In the **Microsoft 365 admin center**, Copilot is **not an all-or-nothing service**. Understanding these tiers is a crucial AB-900 objective.
| Tenant-wide controls | Granular controls
| Global enable/disable — fast but inflexible | Per application, feature or user group
| Pause deployment for everyone while you finalise data governance | **Phased rollout**
| | Finance uses Copilot in Excel today; Word stays restricted for Legal until new compliance guidance
! A massive exam point — **underlying dependencies**. Like reading in a pitch-black room before turning on the light: **Copilot in Teams requires meeting transcription to be allowed**. If transcription is disabled for HR, **meeting recaps can't be generated for them. Period.**
- Healthcare case: start with a **tenant-wide block** (privacy regulations) → compliance gives the green light → **group-based Entra policies** enable only finance and operations staff. Layer licensing, policies and governance.
## Governance and data security
> A filing cabinet without labelled restricted folders — anyone might read something they shouldn't.
- Without correct classification, Copilot might summarise top-secret financial drafts for someone asking for a project update.
! The flow: **Microsoft Graph signals → classification policy → Copilot output**. Strong data classification is a **non-negotiable prerequisite**.
- Global manufacturing case: labels are just step one. They set up **cross-departmental governance committees** (IT, legal, compliance) and **auditing dashboards** to spot risky behaviour (a user frequently summarising confidential documents). Governance isn't just an IT thing.
## Permissions and rollout
> A bank vault where different managers hold different keys and no one opens it alone.
! Lock these three steps in your memory:
| Step | Example
| **Role-based delegation** | Workload-specific admins — **Exchange admins manage Outlook Copilot features**
| **Privileged Identity Management (PIM)** | Just-in-time access, smaller attack surface
| **Separation of duties** | The person who **approves** an AI agent is **never** the person who **publishes** it
- Rollout is iterative (test a recipe on friends before a 500-person banquet): **structured pilots** (a university pilots Excel Copilot with finance during budget season), **targeted training** on **when and why**, not just how, and **feedback and escalation loops** (legal flags an issue → adjust access policies immediately).
## The Copilot Adoption Site
> An airline pilot's pre-flight checklist.
| Step | What
| **1. Choose the licence** | The correct licence
| **2. Prepare the environment** | Microsoft 365 apps, network and data governance
| **3. Set up Copilot** | Configure and assign licences
| **4. Engage users** | Built-in **success kits** and **scenario libraries**
## Managing AI with Agent 365
> ID badges and restricted floor access for a crew of robotic contractors.
- Built into the **Microsoft 365 admin center**, working with **Entra, Defender and Purview**.
! Core principles: **identity, access and visibility**. Every custom agent gets a **trusted identity** bound by an **Agent 365 policy** — invisible shadow agents become accountable digital co-workers.
| Task | Example
| **Least privilege** | A purchasing agent only reads the purchase-order libraries
| **Run history** | Confirm an HR onboarding agent uses approved templates and doesn't touch sensitive data
| **Audit trails** | Incident response: see exactly what data an agent used
| **Approval workflows** | Require approval **before** new agents can be activated
`},
{d:"3", t:"Copilot & Agents in Practice: Choosing the Right Tool", md:`
> Microsoft 365 is a corporate campus; Copilot and its specialised agents are the staff who help you navigate data and delegate complex tasks.
## Foundations
| Copilot | Agents
| A personal desk assistant — helps with what's in front of you | Specialised department workers — specific, repeatable processes
| Woven into apps and Microsoft Graph; interactive, user-driven tasks | Repeatable workflows, department processes, integrations **outside** Microsoft 365
! For the AB-900, understand this difference in **scope and complexity** so you can route requests to the right AI capability.
## In-app Copilot vs Copilot Chat
| | In-app Copilot | Copilot Chat
| Analogy | A smart colleague helping you write | The company archivist searching the whole building
| Role | **Contextual creation** in one workflow | **Knowledge discovery** across the tenant
| Examples | Word drafts from meeting notes; **pivot charts in Excel without a formula**; PowerPoint slides from finance reports | "Summarise all meetings this week about the Contoso rollout" — transcripts, Teams chats, Outlook, SharePoint via Graph
| Admin focus | Configure **transcription and document storage policies** | Precise **Microsoft Search configuration** and stringent permissions; configure **Microsoft Graph connectors** for ServiceNow or Salesforce
## Researcher vs Analyst
| | Researcher | Analyst
| Analogy | A private investigator in messy filing cabinets | A financial whiz turning raw receipts into a clean presentation
| Data | **Unstructured**: long emails, Teams chats, big Word documents | **Structured**: spreadsheets and tables
| How | **Semantic search** over relationships between people, projects and activities | Cleans Excel data, integrates with **Power BI**, generates narrative explanations
| Example | Briefing on past network outages; a compliance officer condenses hundreds of pages of contracts **with links back to sources** | "Which quarter had the highest variance between forecast and actual expenses?" → instant chart
! Exam tips: Researcher relies heavily on **Microsoft Graph relationships**. Analyst **eliminates the need to write DAX formulas**, reducing dependency on BI developers and keeping reporting standardised.
## Prebuilt coaching agents
> A temp-agency worker who arrives fully trained.
| Coach | Helps with
| **Writing Coach** | Email tone and grammar
| **Career Coach** | Professional development and interview prep
| **Ideas Coach** | Brainstorming and ranking new product features
- Preconfigured, secure and **maintained by Microsoft** — IT overhead is practically zero, which is why they're a staple exam concept.
## Custom and SharePoint agents
- **No-code bots in Copilot Studio** (turn a static HR cheat sheet into a talking manual): a branding-guidelines Q&A bot, an expense-checklist guide that removes repetitive "how do I" tickets.
! For admins the game changes: **you aren't building these bots**. Exam scenarios focus on **governance guardrails, monitoring usage and managing SharePoint/OneDrive access** so user innovation happens safely.
- **SharePoint agents** (a records clerk in an organised warehouse): find content without knowing folder structures, remind users to add **metadata** to contracts, trigger list-based workflows for approaching deadlines. What they surface is restricted by **access controls, retention labels and compliance rules**.
- **Advanced custom agents** (a robotic assembly line), built by IT or developers: a supply-chain agent that checks inventory and triggers manufacturing via **APIs**. Needs **Power Automate connectors, custom APIs and strict DLP guardrails** for external ERP systems.
## Choosing the right tool
> A bicycle for a quick trip, a freight train for heavy cargo.
! Memorise this alignment for your AB-900 scenarios:
| Situation | Tool
| User-driven, one-off, unplanned tasks in familiar apps | **Copilot**
| Predictable volume of standardised requests (HR policies, writing help) | **Prebuilt agents**
| Lightweight, no-code lookups within one team | **Everyday user agents**
| Navigating and governing libraries; structured document lifecycles | **SharePoint agents**
| Multi-system orchestration, APIs, complex automation | **Custom agents**
`},
{d:"3", t:"Managing Copilot: Licences, Cost and Support", md:`
> Giving every employee access to a brand-new skyscraper: unlock the doors without checking badges or tracking electricity and things get chaotic fast. The IT admin is the building manager.
- Before anyone drafts an email with AI, the admin controls **who gets access, what it costs and how users get support**.
## Paying for access
| Flat-rate licences | Pay-as-you-go billing
| A fixed monthly rent per user | Like a monthly utility bill — pay for the AI power people actually consume
- Without active management you overspend on unused licences or get hit with massive consumption bills.
## Assigning access
| Direct assignment | Group-based assignment
| A specific person — useful for testing with one executive | Linked to a team list in your directory — more efficient for a department
| | New name on the marketing list → AI permissions automatically; leaves the team → access reclaimed instantly
## Pay-as-you-go safeguards
- Every AI request has a price tag; without limits a single team could spend the quarter's budget in a few weeks.
! Two steps: **1) create a billing policy** — connects users to your corporate payment account and sets a hard budget (e.g. **$500 a month**). That alone **doesn't enable the software**. **2) Connect the budget policy to the Copilot service.** Only when both are linked does the feature turn on.
## Monitoring usage and cost
- A PAYG team using AI **every day** is usually cheaper on a **permanent monthly licence**.
| Standard admin center | Azure portal
| High-level bills; how many licences are left | Detailed cost charts and **automatic warnings** when a department hits **80%** of budget
- Low active usage compared with licences is a sign a team needs **more training** or a better explanation of the tool.
- **Impact analytics** show where the tool helps (time saved summarising meetings or drafting emails). Admins first set **privacy rules** — hide data for small groups, exclude specific people — to see trends without monitoring individuals.
## Saved prompts
- Saved prompts are **repeatable workflows**: a user **saves** one that works → **shares** it with the team → **schedules** it to run weekly → admins eventually **remove** outdated ones.
- Keep things organised with clear names (**start with the department**) and detailed descriptions.
! This ensures consistent quality and encourages people to **point the tool at secure company files** instead of typing sensitive information directly into the chat.
## Least privilege for technicians
- Don't give every technician control of the whole environment. Someone who only manages licences should only see that section — the rest of security and finance stays locked away.
## "I can't find the AI button"
| Check | Question
| **1. Licence** | Is it active?
| **2. Version** | Is the user on the newest Office software?
| **3. Health dashboard** | Is there a general service outage?
- Communication plan: emails with **screenshots** of where the buttons appear and a **central help page** for self-service.
! Managing Copilot isn't one-and-done: it's an ongoing rhythm of **tracking costs, securing access and helping users**.
`}
);
window.AB900_LECTURES.push(
{d:"3", t:"Copilot Licences & Billing in Detail", md:`
> You're head of security for a corporate high-rise, deciding who gets a key card to the VIP floors and how much each person can charge to the executive café tab. Hand them out to everyone and your budget is blown by lunch.
## Licensing basics and billing
| Licence | Billing management
| The office key — unlocks AI features in Word or Teams for a user | The corporate expense account — controls the subscription cost
| No licence → **zero access** to Copilot | No guardrails → costs spiral out of control
! For the AB-900: you, the admin, are the **ultimate gatekeeper for both**.
## Individual licence assignment
> The CEO needs the server room: you hand over a single master key, you don't rewrite building security for everyone.
- Path: **Users → Active users → [user] → Licenses and apps → tick Microsoft 365 Copilot → Save**.
- Highly targeted — perfect for **small pilots** (three HR staff testing job-posting drafts), and the licence is easily removed afterwards.
## Group licence assignment
> One switch unlocks the third floor for anyone wearing a sales badge.
- The **recommended approach for medium to large organisations**.
- Path: **Groups → Active groups → [Sales users group] → Licenses → Assign licenses → tick Microsoft 365 Copilot → Save**. A new salesperson added to the group **inherits the licence immediately**.
| | Individual | Group
| Strength | Absolute precision | Incredible scalability
| Best for | Pilots and executives | Whole departments
| Downside | High manual overhead with dozens or hundreds of users | Needs diligent **group audits** — a leaver left in the Entra ID group keeps consuming a licence
! Knowing when to use which method is a core concept, **heavily tested** on the AB-900.
## Pay-as-you-go billing
> Paying for a taxi on the meter instead of buying the car for a year.
- Consumption-based billing lets seasonal workforces or experimental teams (finance at quarter-end) use Copilot on demand: query → AI handles it → billed per use.
! The catch: it **must be highly restricted**. Without guardrails, one curious user outside the team can drive costs up fast.
## Step 1: billing policies
> Set a hard limit on a corporate credit card before handing it out.
- Path: **Microsoft 365 admin center → Copilot → Billing and usage → Billing policies tab → create a new policy**.
- Input: your **Azure subscription** → define the **user scope** (e.g. the legal department security group) → output: a **firm budget limit**.
! You must memorise these: the budget **resets** on the first day of the **month, quarter or year**; add **recipients** for alerts; **alert thresholds at 80% and 100%** of the budget.
## Step 2: connecting services
> The programmed card is in your hand, but you still have to plug it into the taxi meter.
- Still on **Billing and usage**, open the **Pay-as-you-go services** tab, select a service such as **Microsoft 365 Copilot Chat** or **SharePoint agents**, and **connect** your billing policy.
! A massive AB-900 pitfall: create the policy but **skip step 2** and pay-as-you-go **remains disabled by default**. Once connected, the status turns **Active** and usage data flows into your dashboards.
`},
{d:"3", t:"Monitoring Pay-as-you-go Usage", md:`
> Pay-as-you-go is like a corporate taxi account — you only pay when people ride. But if someone takes a taxi every day, it's cheaper to buy them a company car.
## Why monitor
- PAYG charges **fluctuate** with use, unlike predictable standard licences. The cycle: **monitor the data → understand the dashboards → convert users** as needed.
| Team | Usage | Decision
| HR | A small handful use Copilot | Leave them on **PAYG**
| Engineering | Daily — summarising Teams chats, technical docs | **Full licences** make more sense
! For the AB-900: monitoring isn't just a financial safeguard — it's a **foundational planning tool** for scaling AI without overspending.
- Logic: raw Copilot use (input) → cost analysis (process) → review and action, e.g. move a high-use pilot group to permanent licences (output). Without it, a pilot group that expands can drive costs up unnoticed.
## Billing dashboards and alerts
> A smart home energy meter that warns you if the air conditioning runs all day.
| Microsoft 365 admin center | Azure Cost Management
| Simple, high-level, **subscription-focused** view | **Granular deep analytics, forecasting, customisable alerts**
| First stop: invoices, active licences | Budget tracking and trend reporting
! You must be able to sharply contrast the two portals: **M365 for quick summary checks, Azure for deep analysis**.
- Azure budget example: a **$2,000** monthly Copilot budget with an alert at **80% ($1,600)** → automatic email, time to check whether it's valid demand or a misconfiguration.
## Microsoft 365 admin center
> Glancing at your monthly credit card statement — topline numbers.
| Step | Purpose
| **Billing → Bills & payments** | Current and past invoices, month-over-month trends
| **Licenses** | Microsoft 365 Copilot (PAYG): assigned vs available
| **Active users** | Only the intended groups have access
| **Org settings** | High-level usage reports by email
! If a question asks where to view **invoice history, payment trends or available licence capacity**, the answer is **always the Microsoft 365 admin center**.
## Azure Cost Management
> A store manager drilling into which product sold most in which aisle on a Tuesday afternoon.
| Click path | What
| **1. Scope** | The right billing account and subscription
| **2. Filter** | Service name = **Microsoft 365 Copilot PAYG**
| **3. Time granularity** | Daily or monthly
| **4. Group by** | Resource, **tag** (finance, legal) or **user principal name** — who is consuming Copilot
| Daily | Monthly
| Spot **sudden, unexpected spikes** | Track **long-term budget trends**
- Example: finance should only use Copilot quarterly, but daily view shows a big **January spike** → someone outside finance was probably misconfigured.
! Key terms: **deep analytics, exporting and alerts**. Exporting to **CSV** or straight into **Power BI** to justify moving groups to permanent licences is **exclusively an Azure Cost Management feature**.
## Monitoring scenarios
> Adjusting call-centre shift schedules around predictable seasonal call volumes.
| Pattern | Action
| Finance spikes only in March, June, September, December | Keep on **PAYG**
| Operations: consistent cost every day | Switch to **permanent licences**
| Unexpected daily spike | **Investigate immediately** — a test group may have unrestricted access
! Best practice: a quick check **weekly** in M365 and a deep dive **monthly** in Azure.
- When someone uses Copilot daily: go to the **Marketplace** in the Microsoft 365 admin center, buy permanent licences and reassign the users → significant savings.
`},
{d:"3", t:"Monitoring Copilot Usage & Adoption", md:`
> A gym owner checking whether members actually use the equipment they pay for.
! Mastering this is non-negotiable for the AB-900. Monitoring is the **operational backbone** of a responsible AI rollout: is there a **productivity lift**, where is **extra governance** needed, and do licences deliver **business value**?
## Why monitor
> A smart foot-traffic counter turns assumptions about busy hours into hard data.
| Tool | Gives you
| **Admin reports** (M365 admin center) | Operational view: who used Copilot, when and in which app
| **Viva Insights** | Deep impact analysis — business outcomes
| **Graph API** | Long-term tracking, automated scorecards
- Usage is a data pipeline: **raw usage → reports → action**, with surgical precision instead of guesses.
! Monitoring is **also security and governance**: detect anomalies (an account suddenly making thousands of AI requests) and verify **privacy exclusions and thresholds** are respected.
## User adoption metrics
> A gym card in your wallet = **enabled**; actually lifting weights = **active**.
| Enabled user | Active user
| Has a Copilot licence assigned | Used Copilot in the reporting period
- The ratio is your **first indicator of a problem**: many enabled but few active suggests a **rollout gap, a permissions issue** or a mismatch with daily work.
- The built-in usage report breaks this down by **Teams, Outlook, Word and Excel**. Low Word usage → targeted Word training or reassign the licences.
! Know the admin steps: **1)** quick check in the usage UI, **2)** export user-level **CSVs** (prompt counts), **3)** check licences under **billing** to reconcile enabled vs active, **4)** programmatic extract with the **Graph API**.
! Massive exam tip: always account for the **24–48 hour ingestion delay** in admin usage reports — don't chase daily noise.
## Deep analysis with analytics
> Adoption metrics are daily attendance; Copilot Analytics is the annual performance review.
- The **Microsoft Copilot Dashboard in Viva Insights** shows **meeting hours summarised by Copilot**, email thread summaries and other impact signals, using **Power BI templates** — what you show leadership when they ask about ROI.
! The sequence is a major exam focus: **access the dashboard → enable analytics → set privacy controls** (minimum group size, exclusion lists — e.g. exclude the CEO) **→ run the Power BI templates**. Privacy **before** any impact queries.
## Spotting trends
| Pattern | Meaning
| **Adoption funnels** | Users dropping off between trying once and using often
| **Feature diffusion** | A pilot group uses meeting summaries daily but the habit hasn't spread
| **Seasonality** | HR spikes during annual review cycles
! Best practice: agree a **single source of truth** metric (e.g. **active = at least one prompt per week**), then investigate outliers — thousands of interactions a week is likely a misconfigured automation, not a person.
## Driving adoption
| Technical levers | Cultural levers
| **Group-based licensing** so pilots scale automatically | **Leaders visibly model** the tool (live in meetings)
| **Teams setup policies** to **pin Copilot Chat to the app bar** | **Concrete stories** ("legal cut contract drafting time by 30%")
| Targeted training; Copilot Studio agents for repetitive tasks | Visible measurement dashboards
- Technical availability alone isn't enough — you need both.
## Choosing reporting tools
| Tool | Use for
| **Microsoft 365 admin center** | Daily operational triage, base counters
| **Viva Insights** | Deep, leadership-ready impact analysis
| **Service-specific analytics** | One app in depth (e.g. Copilot in **Dynamics 365**)
| **Microsoft Graph API** | Bypass UI **retention windows**, automate **nightly exports**, join raw data with HR or finance databases for cohort analysis
! Must memorise: the admin center and Graph API are in **standard licensing**; **Viva Insights deep impact analysis and Power BI integrations need an additional premium licence**. Verify tenant licensing before standardising a reporting cadence.
`},
{d:"3", t:"Governing Copilot Prompts", md:`
> Unmanaged prompts are a chaotic commercial kitchen where every chef uses a different recipe for the same dish. **You are the head chef.**
## Why prompts matter
- In business, prompts become **reusable workflows** (a service agent summarising a complex call log the same way every time), **knowledge-sharing tools**, and vital **compliance artifacts**.
- Unmanaged: a fragmented experience, duplicated work and exposed sensitive information.
! The golden rule for the AB-900: governance is about **balancing easy user accessibility with strict organisational oversight**.
## Two levels of prompt management
> A corporate office: security policies at the front desk, day-to-day work at your own desk.
| Administrators (front desk) | End users (their desk)
| **Microsoft 365 admin center**: tenant-wide feature availability, data access policies, compliance controls | **Copilot side panel** in Word, Excel, Teams: create, edit and save workflows
! A massive exam pitfall: there is **no single master folder** holding every user's prompts — you **cannot manage prompt storage from one admin screen**. Encourage teams to share effective prompts through secure channels: **SharePoint, Teams or Viva Engage**.
## The prompt lifecycle
> A logistics supply chain: package, route, automate deliveries, retire old vehicles.
| Phase | User | Admin
| **Save** | "Save prompt" with a name and description (e.g. month-end summary in Excel) | Mandate **clear naming conventions** from the start ("Finance – Monthly summary report")
| **Share** | Shares a great prompt (HR onboarding checklist) | **Settings → Copilot → Prompts** — restrict to **trusted Microsoft 365 groups**
| **Schedule** | The **Copilot scheduler** (weekly KPI dashboard every Monday) | **Continuous monitoring** so automated tasks don't drain resources
| **Delete** | Clears their own prompts from the library | **Quarterly central reviews** to sweep out outdated instructions
! Quarterly central reviews are a key compliance best practice — they stop employees relying on obsolete processes.
## Standardisation
> A retail barcode system — without it, ten versions of the same prompt give different results and skew decisions.
| Rule | In practice
| **Strict naming standards** | Department prefixes: Operations-, Sales-
| **Document prompt usage** | Define the required information in the description
| **Prompt templates** | Baselines with blank placeholders such as [date] or [attendees]
## Governance and security
> A bank vault — you'd never leave stacks of cash on the lobby coffee table.
! The vulnerability: a user **hardcodes confidential data** into a prompt (an employee's salary) → Copilot digests it → the output can expose it to **anyone who shares or runs the prompt**. Scheduled prompts make this worse.
| Defence | How
| **Restrict sharing** | **M365 admin center → Settings → Copilot → Prompt policies** — sharing for trusted roles such as department leads
| **Audit prompt usage** | **Reports → Copilot usage**, filter for prompts — find critical workflows and clutter
| **Train users** (most critical) | **Never embed sensitive details** in a prompt — reference data already on **permission-restricted SharePoint sites**
- The secure workflow: the user requests → Copilot **references** external data → admin controls check whether **this user** has rights to the SharePoint site → only then a safe result.
`}
);
window.AB900_LECTURES.push(
{d:"3", t:"Operational Foundation for Copilot", md:`
> A beautifully run corporate skyscraper: not just unlocking the doors at 8 a.m., but working elevators, badges for the right floors and utilities without a hiccup.
- For the AB-900 this is **building and maintaining an operational foundation**, so Copilot delivers value without exposing the business to security or compliance risk.
## Operational foundations
> A global logistics company treating every delivery as a brand-new problem would collapse.
! Treating admin tasks as **one-offs is the number one cause of runaway costs** in a Microsoft 365 tenant. A systematic approach avoids **overlicensing** and **missing permissions** that block access, and keeps overhead low as you grow.
## Admin roles and permissions
> You'd never give every employee a master key to the server room, finance office and CEO's suite.
- The exam strictly tests **least privilege**. **Global Administrator** is the master key — complete tenant-wide access and a huge risk if misused or compromised. Use **scoped roles**.
- Logic (RBAC in **Microsoft Entra ID**): user requests access → Entra ID verifies identity → a heavily **scoped role** → safe access.
| Scenario | Role
| A department lead manages Copilot licences for the team | **License Administrator**
| HR onboards contractors | **User Administrator**
| A compliance officer reviews Copilot usage logs | **Compliance Administrator**
! Memorise the click paths — you will absolutely be tested on when to use which portal:
| Individual — Microsoft 365 admin center | Bulk — Microsoft Entra admin center
| Users → Active users → [user] → **Manage roles** → choose the scoped role → Save | **Roles and administrators** → [role] → **Add assignments** → user or group → Assign
## Licence assignment and onboarding
> A big-box store doesn't restock by buying one item at a time at the till.
- Assigning licences one by one without a strategy is an **administrative trap**.
! AB-900 best practice: **group-based licensing through Microsoft Entra ID** — a new hire is added to the department security group, which is set to auto-license → instantly Copilot-ready. Remove a leaver from the group → licence **reclaimed instantly**.
| Manual — Microsoft 365 admin center | Group-based — Microsoft Entra admin center
| Users → Active users → [user] → Licenses and apps → tick Copilot → Save | Groups → [security group] → **Licenses** → **Assignments** → add Microsoft 365 Copilot → add users to the group
## Troubleshooting
> A good mechanic follows a checklist — battery, starter, fuel line — instead of replacing random parts.
- Flow: user reports → check M365 apps → verify licence → review. Is it a **licence** issue, **network connectivity** or an **outdated app**?
! Classic exam scenario: **Copilot is missing from Word** — nine times out of ten the user isn't on **Microsoft 365 Apps for enterprise**. User steps: **File → Account → Product information** (verify "Microsoft 365 Apps for enterprise") → **Update options → Update now**.
! Before diving into one user's logs, **check Service health first**: **Health → Service health** → advisories and incidents for Copilot. Don't spend 2 hours on a perfectly fine laptop during a global outage.
## Communicating changes
> Handing someone a heavy-duty power tool with no manual or safety briefing.
| Action | How
| **Email announcements before rollout** | Include **screenshots** showing exactly where the button is
| **Live Teams training** | Real use cases: a summary in Word, analysing a big budget in Excel
| **Centralised support documentation** | A **SharePoint FAQ wiki** so users self-serve instead of 500 tickets asking "where is the button?"
`},
{d:"3", t:"The Agent Lifecycle: Digital Workers", md:`
> Copilot agents are a specialised digital workforce. Like new employees, you define their role, set access, monitor performance and offboard them when the project is finished.
## Build
- **Copilot Studio**: developers use the advanced version; most business users use the **lite experience** to create company-wide agents **without code**.
| Tab | What happens
| **Describe** | Type what you want in everyday language ("Create an IT password reset agent") — a working draft is generated
| **Configure** | The agent's **job description**: strict instructions on behaviour and responses, plus knowledge
- Knowledge: up to **20 sources**, limiting answers to approved SharePoint sites, document libraries or designated web content.
- Skills: **code interpreter** (complex maths or data problems in the background) and **image generator** (visuals on demand).
- For a local assistant for one filing cabinet, use the **Copilot agent tool built into SharePoint**, focused on one site or document library.
| | Copilot Studio | SharePoint agent
| Scope | Company-wide experts | One site or library
| Templates | Yes | **No**
| Code / images | Yes | **No**
| Starter prompts | More | **Three**
| Unique | | **Custom welcome message** greeting users
## Test
- Catch mistakes before they hit the business: run **practice questions** to check **tone, facts** and **unusual or complex requests**.
! If you **update a SharePoint agent that uses restricted files**, you must **explicitly reshare** it so the system syncs the updated permissions.
## Access control
- Many employees can use standard Copilot Chat, but **building and publishing a company-wide agent requires a Copilot Studio licence**.
- Copilot Studio agents live in a secure, isolated workspace called a **Power Platform environment**.
| Role | Can
| **Basic user** | Talk to the agent
| **Environment maker** | **Edit** the agent
- Assign roles to **Entra ID security groups** to grant access to everyone inside instantly.
## Govern
- The **Copilot Control System** is your central command post to **review, approve or reject** agent requests.
! Example: a **marketing agent asks to read sensitive financial data** → you spot the risk and **reject** it before it touches a live file.
- **Data policies** act as automatic guards: reading an approved internal site is allowed; sending data to an **unauthorised external service** is blocked instantly.
- **Microsoft Purview audit logging** records every command a user gives an agent and every response.
## Monitor
- Like a performance review: watch **abandonment rates** (users stop using the chat), **technical errors** and **slow response times**.
- Example: a sudden drop in adoption was directly caused by a **spike in connection errors**.
## Retire
| Block | Remove
| Stops anyone in the organisation using the agent | Removes it entirely from your **inventory**
`},
{d:"3", t:"Creating a Copilot Chat Agent (Copilot Studio Lite)", md:`
! The objective: master creating a Microsoft 365 Copilot Chat agent for the AB-900 — the services, components and workflows an admin must understand.
## Copilot Studio experiences
| Lite experience | Full experience
| A reliable automatic commuter car — no mechanic's licence needed | Building a custom race-car engine from scratch
| **Non-technical business users**, inside Microsoft 365, **zero code**, no new apps | **Developers**: enterprise-grade agents, complex automation, multi-step workflows, granular security
! Your strict exam focus is the **lite experience** — empowering everyday users safely without Power Platform knowledge.
## The Describe tab
> Ordering in a restaurant by describing your craving to a world-class chef who builds the dish.
- Plain natural language defines the agent's **name, description and instructions**; Copilot Studio fills the fields and creates a **draft agent**.
- **Templates** are optional but ensure structural consistency, enforce best practice and speed up common scenarios (HR leave policies, IT troubleshooting).
! **Progressive refinement**: Agent Builder doesn't guess — it parses your intent and gives an **interactive, conversational experience**, asking **clarifying questions** (audience skill level, tone, fallback mechanisms).
- You can **test the draft right in the Describe tab** before adding company data — it uses general knowledge to validate your behavioural instructions.
## The Configure tab
> Popping the hood and adjusting engine parts with a wrench.
- Manually input or edit the name, description and instructions.
! **Describe and Configure are fully synchronised** — a change in one is instantly reflected in the other.
! Very likely tested: if you **select a new template in the Configure tab** after customising in Describe, Copilot Studio **completely resets the configuration to the new template's defaults** — your conversational refinements are **erased and overwritten**.
| Icon requirement | Value
| Format | **PNG only**
| Size | **No more than 1 MB**
- Copilot Studio translates the Describe conversation into a bulleted list of **purposes, guidelines and skills**. You can type natural language in Configure too, but it **asks no clarifying questions** — it parses exactly what you type.
## Knowledge sources
> An open-book test where you hand the employee the specific approved textbooks.
- Ground the agent with **SharePoint sites**, **file uploads** (Word, PDF) or **Microsoft Copilot connectors** (formerly **Graph connectors**) for external data such as incident tickets or CRM accounts.
| Must-memorise constraint | Value
| Knowledge sources | **Maximum 20**
| Individual file size | Typically **200 MB** (depends on licensing)
| Web content | **Not a given** — controlled by the **"Allow web search in Copilot"** policy
| **Restricted SharePoint Search** enabled | **SharePoint can't be used** as a knowledge source at all
| New upload | Shows **"Preparing"** while it's indexed
## Capabilities and starter prompts
> A high-powered calculator and a digital sketchbook for your employee.
- Capabilities are **off by default**. **Code interpreter** generates and runs **Python** behind the scenes (you never see it). **Image generator** uses **DALL·E** technology based on **Microsoft Designer**.
- **Starter prompts** are clickable suggestions for users who don't know how to start. A template auto-populates them; otherwise they're suggested from your description.
! Explicit rule: you can assign an **unlimited number of starter prompts** to an agent in Microsoft 365 Copilot Chat.
## Creating the agent
> Flipping the "open for business" sign on a new store — not just saving a file.
| Background process | What
| **Activation** | Draft → **active**
| **Deployment** | Pushed to the environment; knowledge sources connected
| **Configuration synchronisation** | Final parity between Describe and Configure
| **Availability** | Permission structures established for sharing
| **Monitoring** | Hooked into analytics to track performance and usage
- A dialog gives a **direct link that initially works only for you**: choose **Change sharing settings** to open access, or **Go to agent** for the live chat.
! Think about it: if you applied a new template in Configure right before Create, what happened to the 20 minutes of Describe refinements? **Reset to the template defaults.**
`},
{d:"3", t:"Creating a SharePoint Agent", md:`
> Creating a SharePoint agent is like onboarding a new employee who needs a **security badge**, a **training manual** and a **job description**.
## Permissions
! Write this down for your AB-900: to create an agent you need **edit permissions or higher** on the SharePoint site or document library. With read access only, the doors are locked.
## Four starting points
> A corporate HQ with a main lobby, a loading dock, a side door and a parking-garage elevator.
| Starting point | How | Default scope
| **Site homepage** | **New** drop-down → **Agent** | The **entire site**
| **Document library** | Command bar → **Create an agent** | All supported files in that library
| **Selected files** | Select files → right-click (or the ellipsis) → **Create an agent** | Only those files (e.g. two specific HR policies)
| **Agent chat pane** | **Copilot** button (upper right) → drop-down by the current agent's name → **Create an agent** | That location
! Highly testable: memorise these four doors. Whichever you use, the system **prescopes** the agent to that location.
## Draft lifecycle
- The **Create your new agent** form is a **draft** — an unsigned contract. Move between tabs and change settings; it only goes **live when you click Create**. After that, changes apply **instantly** to the live version.
## Overview tab
- The agent's name tag: **name** and **description** (customise the defaults) and an optional custom icon.
! If you upload a custom icon it **must be a PNG** and **can't exceed 1 MB**. No exceptions.
## Sources tab
- The training manual. Default: **"Sourced from entire site"** — everything on the site the user can access.
- Choose **"Source from document libraries, folders or files"** and the **Pick items** window lets you hand-pick exactly what becomes the agent's brain.
! The hard limit: **a maximum of 20 sources** — folders or individual files. Not 21, not 100. People confuse this with limits in other tools.
## Behavior tab
- **Welcome message** shown when a user opens the agent.
! Highly testable: welcome messages are **unique to SharePoint agents** — not available in standard Copilot Chat agents.
- **Instructions** in natural language: role, tone and limitations.
! Constraints: a maximum of **three starter prompts**, and instructions are refined **manually** — unlike Copilot Studio, the SharePoint tool **doesn't carry on a conversation** or ask clarifying questions.
## SharePoint vs Copilot Studio
| | SharePoint agent | Copilot Studio
| Analogy | A highly specialised librarian | A versatile full-stack developer
| Focus | Document management, content discovery, internal workflows | Flexible conversations and tasks
| Starter prompts | **Three** | **Unlimited**
| Welcome message | **Yes** | No
| Refinement | Manual | Dynamic chat refinement
| Code interpreter / image generator | **No / No** | **Yes / Yes**
! Recap for the exam: **edit permissions** to create, **20** knowledge sources, **3** starter prompts, **no image generator and no code interpreter**. Need code execution or images on the fly → step outside SharePoint to **Copilot Studio**.
`}
);
window.AB900_LECTURES.push(
{d:"3", t:"Testing & Editing Agents", md:`
> A new car goes to the test track — brakes, steering, engine under all conditions — before it reaches the dealership. You never want the customer to find the flaw at highway speeds.
## Why test
- Testing reveals bugs, behavioural issues and conversational roadblocks before users hit them. Skip it and you're **launching blind**.
- Flow: user request → Microsoft 365 Copilot service → **your admin control (testing)** → result.
! Testing is a **non-negotiable phase** of agent deployment — your absolute baseline for the AB-900.
- Goals: find issues early, refine instructions to match user expectations, optimise response times and accuracy, ensure strict data compliance.
! Testing isn't a one-time pre-deployment checklist: **post-deployment continuous monitoring is equally important** — keep gathering feedback and testing.
## Testing agent instructions
> Role-play when training a new call-centre representative: right tone, following the script.
- Input instruction → AI processes → response. Modify instructions to test **clarity and consistency** — e.g. switch from detailed steps to brief summaries and see how fast the agent adapts. Test **edge cases**.
| Scenario | Tests
| **1** | Basic instructional clarity — an accurate step-by-step answer for a fundamental task
| **2** | Collaboration — the correct **sharing protocols** per your organisational rules
| **3** | Complex workflows — **multi-step conditional logic**
- Confusing or wrong output → go back and refine the core instructions.
## Testing knowledge sources
> An employee checking the latest HR handbook — if it's outdated, they give bad advice.
- Regularly update sources and test that the agent reflects the updates.
! Strict AB-900 rule: if a **SharePoint hub site** is a knowledge source, it **automatically includes its associated sites** — verify that behaviour during testing.
## Testing capabilities
> A logistics dispatcher handling both simple requests and complex multi-stop routing in bad weather.
| Capability | Simple test | Complex test
| **Code interpreter** | A data set + "generate a basic bar chart" — does it create the Python? | Complex summaries; a scatter plot with a specific trend line
| **Image generator** | "A sunset over a mountain range" | Plot data points, add a trend line and provide the code behind the plot
- Always evaluate user feedback to refine capabilities.
## Testing starter prompts
> The greeting a retail worker gives at the door sets the tone for the whole interaction.
- Starter prompts are your **default inputs**. Turn generic prompts ("What can you do?") into audience-specific ones ("How can I get started with using SharePoint for project management?") — a key admin task you'll be tested on.
## Editing agents
> Architectural blueprints: any change means going back to the original drafting table.
! Core rule: **always edit with the same tool you created it with** — a **Copilot Chat agent** in **Copilot Studio**; a **SharePoint agent** in the **embedded SharePoint tool**.
! When you update an agent, **shared users can't see the changes until it's re-shared**. With SharePoint files as sources, re-sharing shares those files again for a consistent experience.
- **Edit a Copilot Chat agent**: in the Copilot navigation pane, hover the agent (pinned or unpinned) → ellipsis → **Edit**; or **All agents → agent store → Your agents → Edit**. Copilot Studio opens on the **Configure** tab (your workbench) → refine, test → **Update** to publish.
- **Edit a SharePoint agent**: created from the homepage it's stored as an **.agent file** → **Site contents → Site assets → Copilots folder → select the agent → Edit** → the embedded Copilot tool opens → save.
! Massive caveat for the exam: you **cannot edit a site's ready-made agent** that Copilot created automatically with the site — it's permanently locked.
`},
{d:"3", t:"Managing User Access & Permissions for Agents", md:`
> Your company's data is a corporate office building: who sits in the public lobby, and who gets the master keys to the locked HR file room?
## Managing agent access
- The goal is the sweet spot between productivity and security.
| Standard business user | Developer or IT admin
| Just **talks to** an agent — asking the receptionist a question | Needs **elevated permissions** to change how agents behave — behind the desk
- Without strict admin controls, an unauthorised user could expose sensitive information or disrupt operations — why access management is a big part of AB-900 compliance.
## Licensing and agent types
! A huge beginner trap: access to standard **Copilot Chat does NOT** give the right to **build or manage custom tenant agents**.
| Bucket | Includes | Requires
| **Free** | Standard Copilot Chat and **public declarative web agents** (external web data only) | —
| **Licensed** | Custom tenant agents built in Copilot Studio | A **Copilot Studio user licence**
| **Consumption-billed** | High-volume pay-as-you-go agents (a call-centre bot handling thousands of queries) | **Azure billing** or **message packs**
## Step 1: assign licences (Microsoft 365 admin center)
> Handing a new employee their building entry badge.
- Assign a **Copilot Studio user licence** — a **per-user licence that grants tenant-wide rights**.
! Know the click path: **M365 admin center → Users → Active users → [user] → Licenses and apps → tick the Copilot product licence → Save**.
| Copilot Control System pillar | Includes
| **Security and governance** | —
| **Management controls** | **Assigning licences** and managing agent availability, centrally
| **Measurement and reporting** | —
## Step 2: environment roles (Power Platform admin center)
> A badge to enter the building doesn't get you into the CEO's office.
- **Power Platform environments** are secure, fully separated floors (HR, finance, IT) — containers for agents. With **RBAC**, a recruiting agent in the HR environment is strictly separated from finance.
| Basic user | Environment maker
| Only interacts with agents **explicitly shared** with them; can't change anything | Has the keys to **create, edit and publish** agents in that environment
| | Often combined with the **Copilot Studio author** role
! These two roles will definitely show up on your test. Memorise the click path: **Power Platform admin center → Environments → [e.g. HR] → Settings → Users + permissions → [user] → assign the role** (e.g. Environment maker).
## Group-based role assignments
> A master key card for the whole marketing team at once.
- Assign the environment role to a **Microsoft Entra ID security group** — everyone inherits it. A new hire dropped into "Marketing users" is set up automatically: scalability and consistency.
## Security best practices
| Principle | How
| **Least privilege** | The lowest permissions needed — for most people, **Basic user**
| **Separate dev and production** | Unfinished experimental agents don't break real workflows
| **Review access regularly** | E.g. quarterly — people change roles
| **Monitor usage** | **M365 audit logs** and the **Power Platform admin center**
| **Conditional Access** for the most sensitive agents | E.g. require MFA in Entra ID
! Access management is never set-and-forget. Your primary job isn't turning on cool AI features — it's **protecting the integrity of business data**.
`},
{d:"3", t:"Agent Governance: City Planning for AI", md:`
> You're the chief city planner of a fast-growing metropolis. Your job isn't to stop skyscrapers but to put in traffic lights, zoning laws and safety checkpoints.
| Maker (end users, developers) | CISO and CIO
| Innovation, efficiency, cost savings | Data protection, compliance, strict risk assessment
! Your objective: innovation happens, **but only within a secure, compliant framework**.
## Copilot agent types
| Type | Analogy | Key point
| **Custom** | Specialised factory workers on an assembly line | Predefined instructions for predictable, rule-based tasks — **require strict admin approval before publishing**
| **Shared** | A specialty printer in the HR office | Created by one user, configured for many users or a security group
| **First-party** | Full-time sworn city employees | **Prebuilt by Microsoft** — **Researcher, Analyst, Writing Coach** — native capabilities
| **External** | Freelance contractors from outside the city | From third-party developers or vendors — **tightly control availability and data permissions**
| **Frontier** | A beta-testing group on a closed track | Bleeding-edge — **highly limited rollouts** and intense oversight
## The approval process
> A security badge system — you don't hand everyone the master key.
! Least privilege: use the **AI Administrator** role or the view-only **Global Reader** role for approvals. Reserve **Global Administrator** for absolute emergencies.
| Stage | What happens
| **1. Submission** | The developer details the purpose, audience and — most important — the **permissions it needs**
| **2. Review** | Admins and compliance officers assess technical and organisational risk
| **3. Decision** | **Approve**, **reject** or **send back for revisions**
- Path: **Microsoft 365 admin center → Copilot → Agents → Requested agents** tab — vet each submission and the data connections it wants.
## Roles in agent governance
| Role | Contribution
| **Admins** | Gatekeepers: technical permissions, API access, system compliance
| **Business owner** | Real-world context and operational justification
| **Security and compliance officers** | Spot broad access requests to highly sensitive data (financial records, HR files)
- Example: sales requests an agent pulling heavy Dynamics 365 data — the admin sees a risky request; the business owner explains why it's needed.
- Best practice: document collaborative decisions in a **SharePoint list** for transparency.
## Managing updates and versions
- In the **Agent inventory** tab: version history, **availability** (who can install it), capabilities and knowledge sources, and **security certification** — **publisher attested** or **Microsoft 365 certified**.
! Proactively review updates to stop unvetted upgrades: an updated marketing agent suddenly asking for **full CRM access** when it used to need **read-only** must be caught and evaluated.
- Always keep a **rollback strategy** to revert to the previous stable version.
## Governance policies and tools (Power Platform admin center)
| Restrict | What
| **Unauthorised connectors** | No pulling data from unapproved external sources
| **Unauthenticated / anonymous users** | Blocked from solutions
| **Sharing limits** | Makers can't spread non-certified solutions too widely
| Enable | What
| **Maker onboarding** | Customised welcome messages and step-by-step guidance
| **Advisor** | Continuous scans and proactive recommendations
| **Catalog** | Pre-certified, reusable templates
! Governance isn't just blocking users — it's **enabling them safely**.
## Security and compliance checks
- **Microsoft Information Protection (MIP) labels**: Copilot content **inherits Purview sensitivity labels** from Microsoft 365 content.
- The **Copilot security checker** warns makers about risks **before they publish**; a **consolidated security page** sits in the Power Platform admin center.
! Memorise the compliance audit: **Microsoft Purview portal → Solutions → Audit → Activities (friendly names) → search "Copilot"** to filter the event logs.
`},
{d:"3", t:"Managing the Agent Lifecycle After Rollout", md:`
> You wouldn't hand a new employee a laptop and ignore them for three years. **Deployment is just the starting line** of continuous management.
## Usage and performance
| Metric | Warning sign
| **User adoption** | Low adoption flags poor communication or a design flaw
| **Performance** | A finance agent taking **30 seconds** to fetch basic ledger data
| **Error tracking** | Broken back-end connections
! These three are your **primary health indicators**.
! Burn this click path into memory: **Microsoft 365 admin center → Reports → Usage → Microsoft 365 Copilot → Copilot → Agents tab**. Choose an agent, filter by date, department or group, and export to Excel.
## Operational insights
> Auditing an employee's security badge — every room they enter.
! **Overprivileged agents**: an agent with **read and write** access when its job only needs **read** is a major vulnerability. **Scaling back to read-only** is crucial — a huge exam focus.
- **Cross-service dependencies**: an HR agent relying on SharePoint and Power Automate stalls if SharePoint has an outage.
- **Trend analysis**: steady growth, falling off a cliff, or seasonal peaks (a finance tool at tax time).
- Audit permissions and **data source alignment**: **Reports → Copilot → Agents** → usage reports. E.g. a Teams support agent heavily using Teams but rarely its intended SharePoint source — is it behaving as designed?
## The lifecycle framework
> An employee's career path from onboarding to retirement.
| Stage | What happens
| **Creation (day zero)** | Developers design; you set up security guardrails
| **Approval and deployment** | Vetted, published and communicated
| **Maintenance** | The **longest phase**: monitor, update, maintain stability
| **Block or removal** | Block stops access; removal deletes it from inventory
! A highly testable best practice: communicate agent retirement to impacted users **at least 30 days in advance** (Teams or email) and provide **training for the replacement tool**. Never pull the rug out from under users.
- Decommission: **Microsoft 365 admin center → Copilot → Agents → [agent] → Remove or Block** → define the scope (everyone or specific groups) → confirm and save.
| Block | Remove
| Instantly stops people relying on an outdated tool | Takes it out of the tenant inventory — it **can be reacquired from the store** later
## Dashboards and RBAC
| Administrative roles | Reader roles
| Global admin, Teams admin — emergencies and least privilege | **Reports Reader, Global Reader, Usage Summary Reports Reader**
| | **Don't expose specific user details** — insights without compromising privacy
- Deep performance data for **Copilot Studio** agents: **Power Platform admin center → Copilot → Copilot Studio → Agents** — **average response time, escalation frequency, abandonment rate**. A high abandonment rate means **redesign the conversation flows**.
## Troubleshooting
> The assembly line stops dead — rapid triage to find the jam.
| Category | Symptom | First action
| **Connectivity** | Agent loses its connection to SharePoint or Dynamics 365 | **Always check Service health first** to rule out a Microsoft outage
| **Permission errors** | Agent can't access its data | **Settings → Integrated apps → Copilot agents → Manage permissions** — nine times out of ten it's misconfigured access
| **Performance degradation** | Slow, laggy responses | Audit error logs and look for usage spikes — thousands of users at once and the system **throttles**
! You will absolutely see this: a **procurement agent fails** every time it pulls purchase orders → **1) Service health for Dynamics 365 → 2) the agent's permission set** (active read access to PO tables?) **→ 3) logs for failed API calls** (often an **expired authentication token**) **→ 4) renew permissions or reconfigure the back-end connection**.
`}
);
