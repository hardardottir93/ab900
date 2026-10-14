/* "What's the difference?" drills: pairs that are often confused.
   a / b: the two options · d: the difference in one line · lec: lecture · s: [scenario, 0 = a, 1 = b] */
window.AB900_DIFF = [
{a:"Sensitivity labels", b:"Data loss prevention (DLP)", lec:2, d:"Labels classify and protect the file itself (encryption travels with it). DLP inspects content and stops it being shared out.", s:[
  ["A confidential report must stay encrypted even after it's downloaded to a USB stick.",0],
  ["Block an email containing customer social security numbers sent to a personal address.",1],
  ["Add a CONFIDENTIAL watermark and restrict printing.",0],
  ["Show a policy tip when a user tries to share credit card numbers externally.",1]]},
{a:"Retention label", b:"Retention policy", lec:14, d:"Labels apply to individual items; policies apply to whole locations.", s:[
  ["Keep this one specific contract for 7 years.",0],
  ["Delete all Teams chats older than 90 days across the company.",1],
  ["Apply retention to an entire SharePoint site, whatever is inside it.",1],
  ["Put a legal-hold sticky note on a single file.",0]]},
{a:"Microsoft Secure Score", b:"Purview Compliance Manager", lec:2, d:"Secure Score measures internal security posture against best practice; Compliance Manager maps you against external regulations.", s:[
  ["Show how well we meet HIPAA and ISO 27001.",1],
  ["Find missing MFA and too many admin privileges.",0],
  ["Track controls for the EU AI Act and NIST AI RMF.",1],
  ["Grade our security homework across Microsoft 365 services.",0]]},
{a:"Service health", b:"Message center", lec:10, d:"Service health = current outages and incidents. Message center = upcoming changes.", s:[
  ["Users report email is down right now — is it Microsoft?",0],
  ["A new Teams meeting policy is rolling out next month.",1],
  ["Planned maintenance and active advisories.",0],
  ["Prepare users for a feature change announced by Microsoft.",1]]},
{a:"Sign-in logs", b:"What If tool", lec:7, d:"Sign-in logs show what actually happened; the What If tool simulates what would happen.", s:[
  ["Find which policy blocked a user this morning.",0],
  ["Test a new policy before any user signs in.",1],
  ["Filter by user, app or IP address to find the failure reason.",0],
  ["Simulate a sign-in from a specific location and device.",1]]},
{a:"Password hash sync (PHS)", b:"Pass-through authentication (PTA)", lec:4, d:"PHS validates in the cloud using a hash and keeps working if on-prem fails. PTA validates on-prem; passwords never stored in the cloud.", s:[
  ["Users must still sign in if on-prem servers go down.",0],
  ["Regulations say passwords can never be stored in the cloud in any form.",1],
  ["Microsoft's most common, simplest and most resilient option.",0],
  ["An on-prem agent checks the password against local AD in real time.",1]]},
{a:"Security group", b:"Microsoft 365 group", lec:5, d:"A security group only controls access. A Microsoft 365 group also creates a mailbox, calendar, SharePoint library, Planner and optional Team.", s:[
  ["Give Finance read-only access to a site, with nothing else created.",0],
  ["A project team needs a shared mailbox, calendar and document library automatically.",1],
  ["Use it in a Conditional Access policy assignment.",0],
  ["Creating it can also give the team a Teams workspace.",1]]},
{a:"Private channel", b:"Shared channel", lec:11, d:"Private channels restrict to a subset of the team; shared channels bridge to other departments or external partners.", s:[
  ["A confidential leadership discussion inside a department team.",0],
  ["Work with an external partner on one project without adding them to the whole team.",1],
  ["Collaborate with another department in a single channel.",1],
  ["Only a few team members should see this channel.",0]]},
{a:"Retention policy (Exchange)", b:"Litigation hold", lec:11, d:"Retention is housekeeping over a lifecycle; litigation hold is a legal freeze that preserves everything indefinitely.", s:[
  ["The company is being sued — preserve all mailbox data, deleted items included.",1],
  ["Keep deleted emails 30 days, then purge them.",0],
  ["Routine lifecycle management of mail.",0],
  ["Preserve original versions for legal discovery indefinitely.",1]]},
{a:"Device compliance policy", b:"App protection policy", lec:12, d:"Device compliance manages the whole enrolled device; app protection protects data inside apps without managing a personal phone.", s:[
  ["Employees use personal phones — stop copying from Outlook into Instagram without enrolling the phone.",1],
  ["Require BitLocker and a recent OS before a corporate laptop gets access.",0],
  ["BYOD scenario where you don't control the device.",1],
  ["Mark a managed device as compliant for Conditional Access.",0]]},
{a:"Activity explorer", b:"Content / Data explorer", lec:17, d:"Activity explorer shows what happened (a timeline of actions). Content/Data explorer shows where sensitive data is.", s:[
  ["Review the user actions behind a DLP alert.",0],
  ["Find a spreadsheet full of ID numbers sitting in a public Teams channel.",1],
  ["See that a file was labelled, copied to USB and emailed out.",0],
  ["Filter by location, label and content type to see exposure.",1]]},
{a:"DAG reports", b:"Site access review", lec:18, d:"DAG reports find oversharing tenant-wide; a site access review has an owner confirm who still needs access to one site.", s:[
  ["Get tenant-wide insight into overshared sites before Copilot.",0],
  ["Ask the owner of one site to confirm who still needs access.",1],
  ["Find sites with inactive owners and missing labels.",0],
  ["Remediate permissions on a specific site through its owner.",1]]},
{a:"Restricted Content Discovery", b:"Restricted Access Control", lec:18, d:"Restricted Content Discovery hides content from search and Copilot without changing permissions. Restricted Access Control limits a site to specific groups.", s:[
  ["Only members of one security group may access the site at all.",1],
  ["Keep a site out of Copilot answers and search, leaving permissions as they are.",0],
  ["Lock a finance site to the Finance group.",1],
  ["Hide content from discovery without touching who has access.",0]]},
{a:"Insider Risk Management", b:"Communication Compliance", lec:14, d:"Insider Risk watches behaviour plus HR signals; Communication Compliance reviews what people write.", s:[
  ["An employee who resigned downloads 50 confidential files at 3 a.m.",0],
  ["Detect harassment or insider-trading language in Teams and Copilot chats.",1],
  ["Correlate unusual activity with a poor performance review.",0],
  ["Flagged messages go to a reviewer dashboard for a human decision.",1]]},
{a:"eDiscovery Standard", b:"eDiscovery Premium", lec:17, d:"Standard covers search, export and legal holds. Premium adds case management, review sets, near-duplicate analytics and redaction.", s:[
  ["Search, export and place a legal hold.",0],
  ["Find near-duplicate documents in a review set.",1],
  ["Redact sensitive details before sending to outside counsel.",1],
  ["A basic content search for an HR investigation.",0]]},
{a:"Researcher", b:"Analyst", lec:26, d:"Researcher works on unstructured text with cited sources; Analyst works on structured data like spreadsheets, no DAX needed.", s:[
  ["Which quarter had the highest variance between forecast and actual?",1],
  ["Summarise months of emails and chats into a cited report.",0],
  ["Turn a messy spreadsheet into a chart without formulas.",1],
  ["Condense hundreds of pages of contracts with links to sources.",0]]},
{a:"Copilot", b:"Agent", lec:23, d:"Copilot is interactive and uses your permissions; agents can run autonomously, often under a service account.", s:[
  ["Runs every night on a schedule to process invoices.",1],
  ["Drafts an email when you ask it to.",0],
  ["Uses a managed identity with broader department access.",1],
  ["Only sees what the signed-in user can see.",0]]},
{a:"Declarative agent", b:"Custom engine agent", lec:22, d:"Declarative agents use Microsoft 365 data and Copilot's built-in orchestration; custom engine agents bring their own orchestration, external systems and models.", s:[
  ["Run multi-step workflows in external systems with your own AI model.",1],
  ["Extend Copilot with instructions and knowledge, no custom code.",0],
  ["Complex business logic and external integrations.",1],
  ["Uses Copilot's built-in orchestration.",0]]},
{a:"Copilot Studio (Lite)", b:"SharePoint agent", lec:35, d:"Copilot Studio: templates, code interpreter, images, unlimited starter prompts. SharePoint agent: 3 starter prompts, a welcome message, no code or images.", s:[
  ["Needs to run Python and generate images.",0],
  ["Greets users with a custom welcome message.",1],
  ["Limited to three starter prompts.",1],
  ["Can start from a template.",0]]},
{a:"Block an agent", b:"Remove an agent", lec:39, d:"Block stops everyone using it (reversible); remove takes it out of the inventory (can be reacquired from the store).", s:[
  ["Stop people using an outdated agent immediately, but keep it.",0],
  ["Take the agent out of the tenant's inventory.",1],
  ["Restrict it for specific groups only.",0],
  ["Clean it out of the inventory completely.",1]]},
{a:"Basic user", b:"Environment maker", lec:37, d:"A Basic user can only use agents shared with them; an Environment maker can create, edit and publish agents.", s:[
  ["Chat with an agent that was shared with them.",0],
  ["Edit and publish agents in the HR environment.",1],
  ["The right level for most employees.",0],
  ["Often combined with the Copilot Studio author role.",1]]},
{a:"Enabled users", b:"Active users", lec:30, d:"Enabled = has a Copilot licence. Active = actually used Copilot in the period.", s:[
  ["How many people have a Copilot licence assigned?",0],
  ["How many people used Copilot this month?",1],
  ["The number that grows when you assign more licences.",0],
  ["A low number here compared with licences signals a rollout gap.",1]]},
{a:"Microsoft 365 admin center", b:"Azure Cost Management", lec:29, d:"M365 admin center = invoices and licence summary. Azure Cost Management = deep analytics, forecasts, group by user, export.", s:[
  ["Check invoice history and available licences.",0],
  ["Group Copilot PAYG costs by user principal name.",1],
  ["Export cost data to Power BI.",1],
  ["A quick weekly look at the subscription.",0]]},
{a:"Monthly Copilot licence", b:"Pay-as-you-go", lec:24, d:"Monthly = predictable fixed cost for daily users (risk: overlicensing). PAYG = metered for occasional users (risk: cost spikes).", s:[
  ["A seasonal worker who uses Copilot once a month.",1],
  ["Daily users and a predictable budget.",0],
  ["Billed through an Azure meter per prompt.",1],
  ["Risk of paying full price for an empty room.",0]]},
{a:"App registration", b:"Enterprise application", lec:7, d:"App registration is the blueprint (identity, requested permissions); the enterprise application is the service principal in your tenant.", s:[
  ["Where you define redirect URIs and request API permissions.",0],
  ["Where you assign users and manage SSO for the app in your tenant.",1],
  ["The setup.",0],
  ["The living instance.",1]]},
{a:"Security defaults", b:"Conditional Access", lec:10, d:"Security defaults: free, one switch, same MFA rules for everyone. Conditional Access: needs Entra ID P1, custom rules per situation.", s:[
  ["A small company wants MFA for everyone and legacy auth blocked with one switch.",0],
  ["Require MFA only for finance staff on unmanaged devices.",1],
  ["Requires Entra ID P1.",1],
  ["No custom rules, no extra licence.",0]]}
];
