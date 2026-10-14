/* Matching questions from the lecture series.
   p: prompt · pairs: [left item, correct match] · extra: distractor matches (optional) · x: explanation · lec: lecture number */
window.AB900_MATCH = [
{lec:1, p:"Match each Zero Trust principle to what it means.", pairs:[
  ["Verify explicitly","Check every request using all available context signals"],
  ["Least privilege access","Give only the minimum access needed for the job"],
  ["Assume breach","Plan for attackers already being inside — focus on rapid containment"]],
 x:"The bouncer checking ID at every door, the key card for one floor, and the hospital that assumes the virus is already inside."},
{lec:1, p:"Match each Zero Trust pillar to the Microsoft tool the lecture linked it to.", pairs:[
  ["Identity","Microsoft Entra ID"],["Endpoints","Microsoft Intune"],["Applications","Defender for Cloud Apps"],["Data","Purview Information Protection and DLP"],["Infrastructure","Defender for Cloud and Azure Policy"]],
 extra:["Viva Learning"], x:"Six pillars, connected by visibility, automation and orchestration. Network uses segmentation and Azure Firewall."},
{lec:2, p:"Put each tool in the Zero Trust phase where the lecture used it.", pairs:[
  ["Assess posture","Microsoft Secure Score"],["Enable identity protection","Conditional Access"],["Enforce endpoint compliance","Microsoft Intune"],["Monitor and respond to threats","Microsoft Sentinel"],["Educate users","Attack simulation in Defender for Office 365"]],
 x:"Order: Assess → Identity → Endpoints → Classify data → Monitor → Educate."},
{lec:3, p:"Match each Defender XDR component to the scenario it handles.", pairs:[
  ["Defender for Office 365","Blocks a link to a fake sign-in page before the user clicks"],
  ["Defender for Endpoint","Isolates a laptop where ransomware was downloaded"],
  ["Defender for Identity","Alerts on pass-the-hash and lateral movement in on-prem AD"],
  ["Defender for Cloud Apps","Stops files being moved to a personal Dropbox (shadow IT)"]],
 x:"Defender correlates signals across email, endpoint, identity and cloud apps into one attack story."},
{lec:3, p:"Match each email protection feature to what it does.", pairs:[
  ["Safe Links","Rewrites and scans URLs at the moment of click"],
  ["Zero-hour Auto Purge (ZAP)","Removes a malicious email after it was already delivered"],
  ["Spoof intelligence","Blocks fake sender addresses"],
  ["Transport rules","Custom admin rules, e.g. quarantine .exe attachments"]],
 extra:["Correlates logs into a multi-stage attack"], x:"ZAP's retroactive removal is a definition you must know for the exam."},
{lec:4, p:"Match each hybrid authentication method to its key characteristic.", pairs:[
  ["Password hash sync (PHS)","A hash syncs to the cloud — users can still sign in if on-prem goes down"],
  ["Pass-through authentication (PTA)","An on-prem agent validates — passwords never stored in the cloud"],
  ["Federation (AD FS)","Sign-in is redirected to an on-prem server that issues a token"]],
 x:"Microsoft recommends PHS or PTA for most organisations; federation needs much more infrastructure."},
{lec:5, p:"Match each group type to what it provides.", pairs:[
  ["Security group","Access control only — no mailbox or calendar"],
  ["Microsoft 365 group","Shared mailbox, calendar, SharePoint library, Planner and optional Team"],
  ["Mail-enabled security group","Access control plus mass email"],
  ["Distribution group","Mass email only — can't assign permissions"]],
 extra:["Members added automatically from user attributes"], x:"Sports car, moving truck, hybrid and passenger bus."},
{lec:5, p:"Match each admin tool to what the lecture said it is best for.", pairs:[
  ["Microsoft 365 admin center","Everyday tasks like resetting a password"],
  ["Microsoft Entra admin center","Dynamic group rules and Conditional Access"],
  ["PowerShell and Microsoft Graph API","Enterprise-scale automation"]],
 x:"The mechanic's daily wrench vs specialised diagnostic machines."},
{lec:7, p:"Match each problem to the first thing to check.", pairs:[
  ["A user is blocked and you need to know why","Sign-in logs"],
  ["You want to test a policy without the user signing in","The What If tool"],
  ["An Authenticator code keeps failing","The device clock (TOTP sync)"],
  ["Who downloaded a file from SharePoint?","The Purview audit log"]],
 extra:["The Message center"], x:"Sign-in logs = what happened; What If = what would happen; audit log = actions."},
{lec:7, p:"Match each term to its meaning.", pairs:[
  ["App registration","The setup: metadata, identity and requested permissions"],
  ["Enterprise application","The service principal — the living instance in your tenant"]],
 extra:["A Conditional Access policy for apps"], x:"The passport application vs using the passport at border control."},
{lec:10, p:"Match each admin center tool to what it shows.", pairs:[
  ["Service health","Current outages, advisories and planned maintenance"],
  ["Usage reports","Adoption, active users and storage"],
  ["Message center","Upcoming changes from Microsoft"]],
 x:"You must be able to distinguish these three for the exam."},
{lec:10, p:"Where is each of these managed?", pairs:[
  ["OneDrive sync and storage limits","SharePoint admin center"],
  ["Shared mailboxes and litigation hold","Exchange admin center"],
  ["Meeting and messaging policies","Teams admin center"],
  ["Conditional Access policies","Microsoft Entra admin center"]],
 extra:["OneDrive admin center"], x:"There is no separate OneDrive admin portal — it's built on SharePoint."},
{lec:11, p:"Match each Teams channel type to who can access it.", pairs:[
  ["Standard channel","Everyone in the team"],
  ["Private channel","A restricted subset of the team"],
  ["Shared channel","People from other departments or external partners, without the whole team"]],
 x:"Shared channels act as a bridge."},
{lec:11, p:"Match each mailbox type to its purpose.", pairs:[
  ["User mailbox","A personal desk, created with a licence"],
  ["Shared mailbox","A team address like support@ — no licence of its own"],
  ["Resource mailbox","Books rooms or company cars"]],
 x:"Resource mailboxes are for things, not people."},
{lec:12, p:"Match each Conditional Access area to its example.", pairs:[
  ["User and group targeting","Finance must use MFA every time for Exchange"],
  ["Sign-in risk evaluation","Impossible travel triggers a block or password reset"],
  ["Session controls","View SharePoint in a home browser but no download or print"]],
 x:"Session controls are enforced through Defender for Cloud Apps."},
{lec:12, p:"Where do you look?", pairs:[
  ["Investigate a data leak","Purview portal — DLP alerts"],
  ["Why was a user blocked from signing in?","Entra admin center — sign-in logs"],
  ["Health of a laptop fleet","Intune reporting"]],
 x:"A smart admin correlates these sources."},
{lec:14, p:"Match each Purview solution to what it watches.", pairs:[
  ["Insider Risk Management","User behaviour plus HR signals"],
  ["Data loss prevention","Sensitive content leaving the organisation"],
  ["Communication Compliance","What people write in email, Teams and Copilot chats"],
  ["Activity Explorer","A forensic timeline of all activity"]],
 extra:["Regulatory compliance score"], x:"Behaviour, content leaving, what people say, and the timeline."},
{lec:15, p:"Match each classification method to when you use it.", pairs:[
  ["Sensitive information types","Predictable patterns, checked with regex and checksums"],
  ["Trainable classifiers","Content without a pattern, learned from at least 50 samples"],
  ["Exact Data Match","Only exact values from a list you upload"]],
 x:"EDM eliminates false positives such as part numbers that look like ID numbers."},
{lec:15, p:"Retention label or retention policy?", pairs:[
  ["Keep one specific contract for 7 years","Retention label"],
  ["Delete all Teams chats older than 90 days company-wide","Retention policy"]],
 x:"Labels apply to items; policies apply to locations."},
{lec:17, p:"Match each tool to the question it answers.", pairs:[
  ["Compliance Manager","How well do we meet regulations?"],
  ["Data Explorer","Where is our sensitive data?"],
  ["DSPM for AI","What is AI doing with our data?"],
  ["eDiscovery","How do we find and preserve evidence?"]],
 x:"The four tools of the compliance lecture."},
{lec:18, p:"Match each oversharing tool to its role.", pairs:[
  ["Data access governance reports","Find risky sites tenant-wide"],
  ["Site access reviews","Owners confirm who still needs access"],
  ["Restricted access control","Limit a site to a specific group"],
  ["Inactivity alerts","Flag stale sites for archiving"]],
 x:"DAG finds, access reviews review, restricted access control restricts."},
{lec:21, p:"Put the orchestration stages in order by matching each to its step number.", pairs:[
  ["Step 1","Prompt intake"],["Step 2","Evaluation"],["Step 3","Enrichment"],["Step 4","Execution"],["Step 5","Formatting"]],
 x:"Intake → Evaluate → Enrich (grounded prompt) → Execute → Format (with DLP checks)."},
{lec:23, p:"Copilot or agent?", pairs:[
  ["Waits for the user to type a prompt","Copilot"],
  ["Runs on a schedule or when an event happens","Agent"],
  ["Uses only the signed-in user's permissions","Copilot"],
  ["Often runs under a service account or managed identity","Agent"]],
 x:"Copilot is the UI for AI; agents act autonomously on your behalf."},
{lec:23, p:"Match each agent failure mode to its fix.", pairs:[
  ["Hallucinated output","Human verification for critical actions"],
  ["UI automation breaks when a button moves","Use stable API connections"],
  ["Over-permissioned credentials","Narrow scope and expiration dates"]],
 x:"Like trusting a GPS that hasn't been updated in ten years."},
{lec:24, p:"Match each Copilot plan to what it gives.", pairs:[
  ["Free Copilot Chat","Web-grounded only"],
  ["Business plan","Grounded in Microsoft Graph, up to 300 users"],
  ["Enterprise plan","Unlimited users plus advanced Purview security"],
  ["Copilot Studio","An add-on for building custom agents"]],
 x:"Plan = features; licensing model = how you pay."},
{lec:26, p:"Match each situation to the right tool.", pairs:[
  ["A one-off task inside Word","Copilot"],
  ["Which quarter had the biggest variance in a spreadsheet?","Analyst agent"],
  ["Summarise months of emails and chats with sources","Researcher agent"],
  ["Multi-system automation through APIs","A custom agent"]],
 x:"Researcher = reading (text); Analyst = arithmetic (numbers)."},
{lec:28, p:"Complete the pay-as-you-go setup.", pairs:[
  ["Step 1","Create a billing policy (subscription, scope, budget)"],
  ["Step 2","Connect the policy to the service"],
  ["Alert thresholds","80% and 100%"],
  ["Budget reset","Monthly, quarterly or yearly"]],
 x:"Skip step 2 and pay-as-you-go stays disabled by default."},
{lec:29, p:"Microsoft 365 admin center or Azure Cost Management?", pairs:[
  ["Invoice history and available licences","Microsoft 365 admin center"],
  ["Group costs by user principal name","Azure Cost Management"],
  ["Export to CSV or Power BI","Azure Cost Management"],
  ["Quick weekly check","Microsoft 365 admin center"]],
 x:"M365 for summary checks; Azure for deep analysis."},
{lec:30, p:"Match each reporting tool to its use.", pairs:[
  ["Microsoft 365 admin center","Daily triage and basic counters"],
  ["Viva Insights","Deep impact analysis for leadership (premium)"],
  ["Microsoft Graph API","Nightly exports and joining with HR data"]],
 x:"Check your licensing before standardising a reporting cadence."},
{lec:31, p:"Match each prompt lifecycle phase to the admin's job.", pairs:[
  ["Save","Require clear naming conventions"],
  ["Share","Restrict sharing to trusted Microsoft 365 groups"],
  ["Schedule","Monitor so automation doesn't drain resources"],
  ["Delete","Quarterly central reviews"]],
 x:"There's no central prompt folder — share through SharePoint, Teams or Viva Engage."},
{lec:32, p:"Which scoped role fits each task?", pairs:[
  ["Manage the team's Copilot licences","License Administrator"],
  ["Onboard contractors","User Administrator"],
  ["Review Copilot usage logs","Compliance Administrator"],
  ["Reset passwords for locked-out users","Password Administrator"]],
 extra:["Global Administrator"], x:"Least privilege — never Global Admin for everyday tasks."},
{lec:33, p:"Copilot Studio (Lite) or SharePoint agent?", pairs:[
  ["Can show a custom welcome message","SharePoint agent"],
  ["Can use the code interpreter","Copilot Studio (Lite)"],
  ["Limited to three starter prompts","SharePoint agent"],
  ["Can start from a template","Copilot Studio (Lite)"]],
 x:"SharePoint agent = 3 prompts, 0 code, 0 images, 1 welcome message."},
{lec:34, p:"Match each Copilot Studio limit to its value.", pairs:[
  ["Maximum knowledge sources","20"],
  ["Maximum file size","200 MB"],
  ["Icon format and size","PNG, 1 MB or less"],
  ["Starter prompts in Copilot Chat agents","Unlimited"]],
 extra:["3"], x:"Know these numbers by heart."},
{lec:35, p:"Match each starting point to the default scope of the new SharePoint agent.", pairs:[
  ["Site homepage","The entire site"],
  ["Document library","All supported files in that library"],
  ["Selected files","Only the selected files"]],
 x:"Whichever door you use, the agent is prescoped to that location."},
{lec:37, p:"Match each item to where it's configured.", pairs:[
  ["Copilot Studio user licence","Microsoft 365 admin center"],
  ["Environment maker role","Power Platform admin center"],
  ["MFA for the most sensitive agents","Conditional Access in Entra ID"]],
 x:"Step 1 is the building badge; step 2 is access to the floor."},
{lec:38, p:"Match each agent type to its description.", pairs:[
  ["Custom","Built in-house for rule-based tasks; needs admin approval"],
  ["First-party","Prebuilt by Microsoft, like Researcher and Analyst"],
  ["External","From third-party vendors; tightly control permissions"],
  ["Frontier","Experimental; very limited rollout"]],
 extra:["Created automatically for every SharePoint site"], x:"Shared agents are created by one user and shared with others."},
{lec:39, p:"Match each troubleshooting category to the first action.", pairs:[
  ["Connectivity problems","Check Service health"],
  ["Permission errors","Integrated apps → Manage permissions"],
  ["Performance degradation","Review error logs and usage spikes"]],
 x:"Procurement agent example: Health → Permissions → Logs → Resolve."}
];
