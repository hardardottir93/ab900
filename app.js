(function(){
const TESTS = window.AB900_TESTS || [];
const NAMES = ["Æfingapróf #1","Æfingapróf #2: gildrur","Microsoft-æfingaprófið (50)","Microsoft-bankinn: umferð 2","Microsoft-bankinn: umferð 3","Microsoft-bankinn: umferð 4","Microsoft-bankinn: umferð 5"];
const DESCS = [
  "Byggt á fyrirlestrunum. Öll þrjú sviðin.",
  "Algengustu gildrurnar (Purview-tól, oversharing, tegundir agents), orðaðar öðruvísi en hjá Microsoft.",
  "Allar 50 spurningarnar úr opinbera prófinu, orðrétt.",
  "24 nýjar spurningar úr annarri umferð.",
  "13 nýjar spurningar úr þriðju umferð.",
  "6 nýjar spurningar úr fjórðu umferð.",
  "5 nýjar spurningar úr fimmtu umferð."
];
const LECTURES = window.AB900_LECTURES || [];
const DOMAINS = {
  "1": ["Domain 1", "Core services, identity & security"],
  "2": ["Domain 2", "Data protection & governance (Purview)"],
  "3": ["Domain 3", "Copilot & agent administration"]
};

/* storage: browser first; signed-in viewers also get a private copy on their own account */
const listeners = [];
const store = {
  get(k, d){ try{ const v = localStorage.getItem("ab900."+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem("ab900."+k, JSON.stringify(v)); }catch(e){} if(k==="hist"||k==="wrong"||k==="read") listeners.forEach(f=>f()); }
};
/* spaced repetition: wrong[key] = {b: box 0-2, due: ms}. Old format (1) counts as due now. */
const DAY = 864e5, SRS_DAYS = [1, 3, 7];
function srsGet(){ const w = store.get("wrong", {}); Object.keys(w).forEach(k => { if(typeof w[k] !== "object" || !w[k]) w[k] = {b:0, due:0}; }); return w; }
function srsList(){ const w = srsGet(); return Object.keys(w).map(k => [k, w[k].b, w[k].due]); }
function srsFrom(list){ const o = {}; (list||[]).forEach(x => { if(typeof x === "string") o[x] = {b:0, due:0}; else if(Array.isArray(x) && typeof x[0] === "string") o[x[0]] = {b:+x[1]||0, due:+x[2]||0}; }); return o; }
function snapshot(){ return {app:"ab900", v:2, saved:new Date().toISOString(), hist:store.get("hist",[]), srs:srsList(), read:Object.keys(store.get("read",{}))}; }
function mergeIn(data){
  if(!data || !Array.isArray(data.hist)) throw new Error("bad");
  const hist = store.get("hist", []); const seenH = new Set(hist.map(r=>r.date+"|"+r.id));
  data.hist.forEach(r => { if(r && r.date && typeof r.pct==="number" && !seenH.has(r.date+"|"+r.id)){ hist.push(r); seenH.add(r.date+"|"+r.id); } });
  hist.sort((a,b)=> a.date<b.date ? 1 : -1);
  const wrong = srsGet(); const inc = Object.assign(srsFrom(data.wrong), srsFrom(data.srs));
  Object.keys(inc).forEach(k => { if(!wrong[k] || inc[k].due > wrong[k].due) wrong[k] = inc[k]; });
  const read = store.get("read", {}); (data.read||[]).forEach(n => { read[n] = 1; });
  try{ localStorage.setItem("ab900.hist", JSON.stringify(hist.slice(0,200))); localStorage.setItem("ab900.wrong", JSON.stringify(wrong)); localStorage.setItem("ab900.read", JSON.stringify(read)); }catch(e){}
  return data.hist.length;
}
let cloud = null, cloudTimer = null;
function setSync(on, text){ $("#syncBadge").classList.toggle("on", on); $("#syncText").textContent = text; }
function pushCloud(){
  if(!cloud) return;
  clearTimeout(cloudTimer);
  cloudTimer = setTimeout(async () => {
    const s = snapshot();
    try{ await cloud.set({hist:s.hist.slice(0,200), srs:s.srs, read:s.read, updated:s.saved}); setSync(true, "Vistað á aðganginum þínum"); }
    catch(e){ cloud = null; setSync(false, "Vistað í þessum vafra"); }
  }, 800);
}
listeners.push(pushCloud);
async function initCloud(){
  if(!window.claude || !window.claude.use) return;
  try{
    const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
    if(!db || !user) return;
    const id = await user.id(); if(!id) return;
    const ref = db.doc("data/users/" + id + "/progress");
    const snap = await ref.get();
    if(snap && snap.exists){ const d = snap.data() || {}; mergeIn({hist:d.hist||[], wrong:d.wrong||[], srs:d.srs||[], read:d.read||[]}); }
    cloud = ref;
    setSync(true, "Vistað á aðganginum þínum");
    $("#syncNote").textContent = "Framvindan vistast bæði í þessum vafra og á claude.ai-aðganginum þínum, svo hún fylgir þér milli tækja. Þú getur líka sótt hana í skrá sem afrit.";
    renderTests(); renderHist(); renderHome(); renderLectures();
    pushCloud();
  }catch(e){ cloud = null; }
}

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

/* every question, tagged with its source; key = prompt text */
const ALL = [];
/* exam domain per Microsoft question (1 core services, 2 data protection, 3 Copilot & agents) */
const MS_DOMAINS = {
  2: i => i < 16 ? 1 : i < 36 ? 2 : 3,
  3: i => [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3][i],
  4: i => [1,1,1,1,1,2,2,2,2,3,3,3,3][i],
  5: i => [1,1,2,2,2,3][i],
  6: i => [1,2,2,3,3][i]
};
TESTS.forEach((t,ti) => ti>=2 && t.q.forEach((q,qi) => ALL.push({key:q[0], prompt:q[0], opts:q[1], ans:q[2], expl:q[3], src:ti, n:qi+1, dom:(MS_DOMAINS[ti] ? MS_DOMAINS[ti](qi) : 0) || 0})));
const UNIQUE = []; const seen = new Set();
ALL.forEach(q => { if(!seen.has(q.key)){ seen.add(q.key); UNIQUE.push(q); } });
const YT_URL = "https://www.youtube.com/playlist?list=PLeAdpmiY-mCf-1ysvpuGMbtgQsOKV5ESW";
const lecDomain = q => (LECTURES[q.lec-1] || {}).d;
const LQ = (window.AB900_LQ || []).map((q,i) => ({key:"lq:"+q[0], prompt:q[0], opts:q[1], ans:q[2], expl:q[3], src:"lec", lec:q[4], n:i+1, dom:+((LECTURES[q[4]-1]||{}).d)||0}));
const MQ = (window.AB900_MATCH || []).map((m,i) => {
  const rights = [...new Set(m.pairs.map(p => p[1]).concat(m.extra || []))];
  return {type:"match", key:"mq:"+m.p+"|"+m.pairs.map(p=>p[0]).join("|"), prompt:m.p, pairs:m.pairs, choices:rights, expl:m.x, src:"lec", lec:m.lec, n:i+1, dom:+((LECTURES[m.lec-1]||{}).d)||0};
});
const DQ = [];
(window.AB900_DIFF || []).forEach(p => p.s.forEach(sc => DQ.push({type:"diff", key:"dq:"+sc[0], prompt:sc[0], pair:p.a+" eða "+p.b+"?", opts:[p.a, p.b], ans:sc[1], expl:p.d, src:"lec", lec:p.lec, n:DQ.length+1, dom:+((LECTURES[p.lec-1]||{}).d)||0})));
function lectureSet(n){
  const l = LECTURES[n-1]; const qs = LQ.concat(MQ, DQ).filter(q => q.lec===n);
  return {id:"lql-"+n, name:"Lecture "+n+": "+(l ? l.t : ""), qs, so:true};
}
const totalEl = $("#totalQ"); if(totalEl) totalEl.textContent = ALL.length;

function nextDueText(qs, wrong){
  const t = Math.min(...qs.map(q => wrong[q.key].due)); const days = Math.max(1, Math.ceil((t - Date.now()) / DAY));
  return days === 1 ? "á morgun" : "eftir " + days + " daga";
}
/* exam objectives (as in Microsoft's results page) → lectures that cover them */
const OBJECTIVES = [
  ["1.1","1","Identify the core objects of Microsoft 365 services",[8,9,10,11,13]],
  ["1.2","1","Understand the Microsoft 365 security principles",[1,2,3,4]],
  ["1.3","1","Identify the core security features of Microsoft 365 services",[5,6,7,12]],
  ["2.1","2","Understand Microsoft Purview",[14,15]],
  ["2.2","2","Understand data security implications of Copilot",[19,21]],
  ["2.3","2","Identify data protection and governance risks for Microsoft 365 and Copilot",[16,17]],
  ["2.4","2","Identify and monitor oversharing in SharePoint in Microsoft 365",[18]],
  ["3.1","3","Understand features and capabilities of Copilot and agents",[20,22,23,24,26]],
  ["3.2","3","Perform basic administrative tasks for Copilot",[25,27,28,29,30,31,32]],
  ["3.3","3","Perform basic administrative tasks for agents",[33,34,35,36,37,38,39]]
];
const DOM_INFO = {1:["Kjarnaþjónustur, auðkenni og öryggi","30–35%"], 2:["Gagnavernd og stjórnun","35–40%"], 3:["Copilot og agents","25–30%"]};
function lecRange(ls){ const out = []; let a = ls[0], b = ls[0]; ls.slice(1).concat([null]).forEach(x => { if(x === b+1) b = x; else { out.push(a===b ? ""+a : a+"–"+b); a = b = x; } }); return out.join(", "); }
function testSets(){
  const wrong = srsGet(); const now = Date.now();
  const wrongQs = UNIQUE.concat(LQ, MQ, DQ).filter(q => wrong[q.key]);
  const dueQs = wrongQs.filter(q => wrong[q.key].due <= now);
  return [
    {id:"mix", name:"Blandað próf (Microsoft)", desc:"50 Microsoft-spurningar af handahófi, eins og alvöru próf.", qs:UNIQUE, pick:50, group:"main"},
    {id:"ms", name:"Microsoft-bankinn", desc:"Allar opinberu spurningarnar úr Microsoft-æfingaprófinu.", qs:ALL.filter(q=>q.src>=2), group:"main"},
    {id:"lq", name:"Fyrirlestraprófið: allt", desc:"Allt sem kennarinn sagði að þyrfti pottþétt að kunna, úr öllum 39 fyrirlestrunum.", qs:LQ.concat(MQ), group:"lec", so:true},
    {id:"mq", name:"Tengispurningar", desc:"Paraðu saman atriði, t.d. tól og hlutverk þess, eins og í Microsoft-prófunum.", qs:MQ, group:"lec", so:true},
    {id:"diff", name:"Hver er munurinn?", desc:"Stuttar spurningar um hugtök sem ruglast oft saman, t.d. sensitivity labels og DLP. 15 í hvert skipti.", qs:DQ, pick:15, group:"lec"},
    ...["1","2","3"].map(d => ({id:"lq"+d, name:"Svið "+d+": "+DOM_INFO[d][0], desc:"", qs:LQ.concat(MQ, DQ).filter(q=>lecDomain(q)===d), group:"dom", so:true})),
    ...OBJECTIVES.map(([code, d, t, ls]) => ({id:"obj-"+code, name:code+" "+t, desc:"Lectures "+lecRange(ls), qs:LQ.concat(MQ, DQ).filter(q => ls.includes(q.lec)), group:"obj", dom:d, code, t, so:true})),
    {id:"due", name:"Upprifjun dagsins", desc:dueQs.length ? "Villur sem eru komnar á tíma. Svarirðu rétt kemur spurningin næst eftir 3 daga, svo eftir 7 daga, og dettur svo út. Svarirðu vitlaust byrjar hún upp á nýtt á morgun." : (wrongQs.length ? "Ekkert á dagskrá í dag. Næsta upprifjun: " + nextDueText(wrongQs, wrong) + "." : "Tómt í bili. Spurningar sem þú svarar vitlaust koma hingað daginn eftir."), qs:dueQs, group:"due"},
    {id:"wrong", name:"Villurnar mínar", desc:wrongQs.length ? "Allar spurningar sem þú átt eftir að ná tökum á, úr öllum prófunum. Þær detta út eftir þrjár réttar upprifjanir með millibili." : "Tómt í bili. Spurningar sem þú svarar vitlaust í hvaða prófi sem er safnast hingað.", qs:wrongQs, group:"more"}
  ];
}

/* ---------- theme: system / light / dark ---------- */
const THEMES = [["system","◐","Kerfi"],["light","☀","Ljóst"],["dark","☾","Dökkt"]];
function applyTheme(t){
  const root = document.documentElement;
  if(t === "light" || t === "dark") root.setAttribute("data-theme", t); else root.removeAttribute("data-theme");
  const th = THEMES.find(x => x[0] === t) || THEMES[0];
  $("#themeIcon").textContent = th[1]; $("#themeLabel").textContent = th[2];
  $("#themeBtn").setAttribute("aria-label", "Útlit: " + th[2] + ". Smelltu til að skipta.");
}
let themeNow = store.get("theme", "system"); applyTheme(themeNow);
$("#themeBtn").addEventListener("click", () => {
  const i = THEMES.findIndex(x => x[0] === themeNow); themeNow = THEMES[(i + 1) % THEMES.length][0];
  store.set("theme", themeNow); applyTheme(themeNow);
});

/* ---------- router ---------- */
let quizActive = false;
const ROUTES = {heim:"home", prof:"tests", lykilatridi:"sheet", fyrirlestrar:"lec", framvinda:"status", leit:"search"};
const ALLVIEWS = ["home","tests","quiz","sheet","lec","lecture","status","search"];
function show(v, n){
  ALLVIEWS.forEach(x => { const el = $("#view-"+x); if(el) el.hidden = true; });
  if(v==="tests") $(quizActive ? "#view-quiz" : "#view-tests").hidden = false;
  else $("#view-"+v).hidden = false;
  const navKey = v==="lecture" ? "lec" : v;
  document.querySelectorAll(".topnav a").forEach(a => { if(a.dataset.view===navKey) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  if(v==="status") renderHist();
  if(v==="home") renderHome();
  if(v==="lecture") renderLecture(n);
  if(v==="lec") renderLectures();
  if(v==="search") setTimeout(() => { const i = $("#searchInput"); if(i) i.focus(); }, 0);
}
function route(){
  const h = (location.hash || "").slice(1);
  const m = h.match(/^fyrirlestur-(\d+)$/);
  if(m) show("lecture", +m[1]);
  else show(ROUTES[h] || "home");
  window.scrollTo({top:0});
}
window.addEventListener("hashchange", route);

/* ---------- test list ---------- */
function bestChip(id){
  const h = store.get("hist", []).filter(r => r.id===id);
  if(!h.length) return '<span class="chip">Ekki tekið</span>';
  const best = Math.max(...h.map(r=>r.pct));
  const cls = best>=80 ? "good" : best>=70 ? "warn" : "bad";
  return `<span class="chip ${cls}">Best ${best}%</span>`;
}
function renderTests(){
  const opts = store.get("opts", {sq:true, so:false});
  const sets = testSets();
  const row = s => `<div class="test">
      <div class="meta"><h3>${esc(s.name)}</h3><p class="muted">${esc(s.desc)}</p><span class="count">${s.pick ? s.pick+" af "+s.qs.length : s.qs.length} spurningar</span></div>
      <div class="side">${bestChip(s.id)}<button class="btn primary" data-start="${s.id}" ${s.qs.length?"":"disabled"}>Byrja</button></div>
    </div>`;
  $("#view-tests").innerHTML = `
    <div class="opts">
      <label><input type="checkbox" id="optSQ" ${opts.sq?"checked":""}> Stokka röð spurninga</label>
      <label><input type="checkbox" id="optSO" ${opts.so?"checked":""}> Stokka svarmöguleika</label>
    </div>
    ${(() => { const due = sets.find(s => s.id==="due"); return due.qs.length ? '<div class="due-banner"><div><span class="eyebrow">Upprifjun dagsins</span><h3>'+due.qs.length+' '+(due.qs.length===1?'spurning bíður':'spurningar bíða')+' upprifjunar</h3><p class="muted">Villur sem eru komnar á tíma. Rétt svar sendir þær lengra fram í tímann.</p></div><button class="btn primary" data-start="due">Byrja</button></div>' : ''; })()}
    <span class="eyebrow group-label">Microsoft-æfingaprófið</span>
    <div class="tests">${sets.filter(s=>s.group==="main").map(row).join("")}</div>
    <span class="eyebrow group-label">Úr YouTube-fyrirlestrunum</span>
    <div class="tests">${sets.filter(s=>s.group==="lec").map(row).join("")}</div>
    <p class="muted src-note">Byggt á <a href="${YT_URL}" target="_blank" rel="noopener">AB-900 fyrirlestraröðinni á YouTube</a>. Á hverri fyrirlestrasíðu er líka stutt próf úr þeim fyrirlestri.</p>
    <span class="eyebrow group-label">Eftir hlutum prófsins</span>
    <p class="muted src-note">Prófið skiptist í þrjá hluta. Hér eru spurningar úr fyrirlestrunum fyrir hvern hluta, svo þú getir æft þann sem gekk verst.</p>
    <div class="obj">${["1","2","3"].map(d => { const ds = sets.find(s => s.id==="lq"+d); return '<section class="obj-dom"><div class="obj-head"><div><span class="eyebrow">Svið '+d+' · '+DOM_INFO[d][1]+' af prófinu</span><h3>'+DOM_INFO[d][0]+'</h3></div><div class="side">'+bestChip(ds.id)+'<button class="btn primary" data-start="'+ds.id+'">Byrja · '+ds.qs.length+'</button></div></div><details class="obj-sub"><summary>Æfa einn undirhluta ('+sets.filter(s => s.group==="obj" && s.dom===d).length+')</summary>'
      + sets.filter(s => s.group==="obj" && s.dom===d).map(s => '<div class="obj-row"><span class="obj-code mono">'+s.code+'</span><div class="obj-meta"><b>'+esc(s.t)+'</b><span class="muted">'+esc(s.desc)+' · '+s.qs.length+' spurningar</span></div><div class="side">'+bestChip(s.id)+'<button class="btn small" data-start="'+s.id+'">Byrja</button></div></div>').join("")
      + '</details></section>'; }).join("")}</div>
    <details class="more-tests"><summary>Villurnar mínar <span class="muted">allt sem þú átt eftir að ná tökum á</span></summary>
      <div class="tests">${sets.filter(s=>s.group==="more").map(row).join("")}</div>
    </details>`;
  const saveOpts = () => store.set("opts", {sq:$("#optSQ").checked, so:$("#optSO").checked});
  $("#optSQ").addEventListener("change", saveOpts);
  $("#optSO").addEventListener("change", saveOpts);
  document.querySelectorAll("[data-start]").forEach(b => b.addEventListener("click", () => start(b.dataset.start)));
}

/* ---------- quiz ---------- */
let Q = null;
function start(id){
  const set = id.startsWith("lql-") ? lectureSet(+id.slice(4)) : testSets().find(s => s.id===id);
  const opts = store.get("opts", {sq:true, so:false});
  let qs = set.qs.slice();
  if(set.pick){ qs = shuffle(qs).slice(0, set.pick); }
  else if(opts.sq){ qs = shuffle(qs); }
  qs = qs.map(q => {
    if(q.type === "match") return {...q, choiceOrder: shuffle(q.choices), rowOrder: shuffle(q.pairs.map((_,i)=>i))};
    let order = q.opts.map((_,i)=>i);
    if(opts.so || set.so) order = shuffle(order);
    return {...q, order};
  });
  Q = {id, name:set.name, qs, i:0, picked:null, results:[]};
  quizActive = true; show("tests"); renderQ();
  window.scrollTo({top:0});
}
function renderMatch(q, done, right){
  const vals = done ? Q.picked : (Q.draft || []);
  const ok = done && Q.results[Q.results.length-1];
  $("#view-quiz").innerHTML = `
    <div class="qhead"><span class="eyebrow">${esc(Q.name)}</span><button class="btn small" id="quit">Hætta</button></div>
    <div class="qhead"><span class="mono">Spurning ${Q.i+1} / ${Q.qs.length}</span><span class="mono muted">${right} rétt</span></div>
    <div class="bar"><i style="width:${(Q.i/Q.qs.length)*100}%"></i></div>
    <div class="qcard">
      <span class="qtype">Tengispurning</span>
      <p class="qtext">${esc(q.prompt)}</p>
      <p class="hint">${done ? "" : "Smelltu á atriði vinstra megin og svo á svarið hægra megin. Smelltu aftur til að breyta."}</p>
      <div class="match${done ? " is-done" : ""}" id="match">
        <svg class="match-lines" aria-hidden="true"></svg>
        <div class="match-col" role="group" aria-label="Atriði">${q.rowOrder.map(ri =>
          '<button type="button" class="m-item m-left" data-r="'+ri+'" '+(done?"disabled":"")+'><span class="m-text">'+esc(q.pairs[ri][0])+'</span><i class="m-dot"></i></button>'
          + (done && vals[ri] !== q.pairs[ri][1] ? '<span class="match-fix">Rétt: <b>'+esc(q.pairs[ri][1])+'</b></span>' : '')).join("")}</div>
        <div class="match-col" role="group" aria-label="Svör">${q.choiceOrder.map((c,ci) =>
          '<button type="button" class="m-item m-right" data-c="'+ci+'" '+(done?"disabled":"")+'><i class="m-dot"></i><span class="m-text">'+esc(c)+'</span>'+(matchCap(q,c) > 1 ? '<span class="m-cap mono"></span>' : '')+'</button>').join("")}</div>
      </div>
      ${done ? '<div class="feedback '+(ok?"ok":"no")+'"><strong>'+(ok?"Rétt":"Ekki alveg — "+q.pairs.filter((p,i)=>vals[i]===p[1]).length+" af "+q.pairs.length+" rétt")+'</strong><span>'+esc(q.expl)+'</span><a class="readmore" href="#fyrirlestur-'+q.lec+'">Lesa glósurnar: Lecture '+q.lec+' →</a></div>' : ""}
      <div class="qfoot">
        <span class="src">YouTube-fyrirlestur ${q.lec}: ${esc((LECTURES[q.lec-1]||{}).t||"")}</span>
        ${done ? '<button class="btn primary" id="next">'+(Q.i+1<Q.qs.length?"Næsta":"Sjá niðurstöðu")+'</button>' : '<button class="btn primary" id="submitMatch" disabled>Svara</button>'}
      </div>
    </div>`;
  $("#quit").addEventListener("click", quit);
  const box = $("#match"), svg = box.querySelector(".match-lines");
  const lefts = [...box.querySelectorAll(".m-left")], rights = [...box.querySelectorAll(".m-right")];
  const rightBtn = c => rights.find(b => q.choiceOrder[+b.dataset.c] === c);
  Q.draft = Q.draft || []; if(!done && Q.sel === undefined) Q.sel = null;
  // colour per left row, in display order
  const colour = ri => "var(--m" + (q.rowOrder.indexOf(ri) % 5) + ")";
  function paint(){
    const v = done ? vals : Q.draft;
    lefts.forEach(b => {
      const ri = +b.dataset.r, c = v[ri];
      b.classList.toggle("is-sel", !done && Q.sel === ri);
      b.classList.toggle("is-linked", !!c);
      b.classList.toggle("right", done && c === q.pairs[ri][1]);
      b.classList.toggle("wrong", done && c !== q.pairs[ri][1]);
      b.style.setProperty("--mc", c ? colour(ri) : "");
      b.setAttribute("aria-pressed", !done && Q.sel === ri);
      b.setAttribute("aria-label", q.pairs[ri][0] + (c ? " — tengt við: " + c : " — ekki tengt"));
    });
    rights.forEach(b => {
      const c = q.choiceOrder[+b.dataset.c], users = q.pairs.map((_,i) => i).filter(i => v[i] === c), cap = matchCap(q, c);
      b.classList.toggle("is-linked", users.length > 0);
      b.classList.toggle("is-full", !done && users.length >= cap);
      b.style.setProperty("--mc", done ? "" : users.length === 1 ? colour(users[0]) : users.length ? "var(--accent)" : "");
      const capEl = b.querySelector(".m-cap"); if(capEl) capEl.textContent = users.length + "/" + cap;
    });
    drawLines();
    const sub = $("#submitMatch"); if(sub) sub.disabled = q.pairs.some((_,i) => !Q.draft[i]);
  }
  function drawLines(){
    const bx = box.getBoundingClientRect();
    svg.setAttribute("width", bx.width); svg.setAttribute("height", bx.height);
    const v = done ? vals : Q.draft;
    svg.innerHTML = lefts.map(b => {
      const ri = +b.dataset.r, c = v[ri], rb = c && rightBtn(c); if(!rb) return "";
      const a = b.querySelector(".m-dot").getBoundingClientRect(), z = rb.querySelector(".m-dot").getBoundingClientRect();
      const x1 = a.left + a.width/2 - bx.left, y1 = a.top + a.height/2 - bx.top, x2 = z.left + z.width/2 - bx.left, y2 = z.top + z.height/2 - bx.top, mx = (x1 + x2) / 2;
      const stroke = done ? (c === q.pairs[ri][1] ? "var(--good)" : "var(--bad)") : colour(ri);
      return '<path d="M'+x1+' '+y1+' C'+mx+' '+y1+' '+mx+' '+y2+' '+x2+' '+y2+'" stroke="'+stroke+'"'+(done && c !== q.pairs[ri][1] ? ' stroke-dasharray="6 5"' : '')+'/>';
    }).join("");
  }
  function link(ri, c){
    const cap = matchCap(q, c), users = q.pairs.map((_,i) => i).filter(i => Q.draft[i] === c && i !== ri);
    if(users.length >= cap) Q.draft[users[0]] = "";   // answer already used: move it to this row
    Q.draft[ri] = c; Q.sel = null;
    const nextFree = q.rowOrder.find(i => !Q.draft[i]);
    if(nextFree !== undefined) Q.sel = nextFree;
    paint();
  }
  if(window.ResizeObserver){ const ro = new ResizeObserver(drawLines); ro.observe(box); }
  if(done){ paint(); $("#next").addEventListener("click", next); $("#next").focus(); return; }
  if(Q.sel === null) Q.sel = q.rowOrder.find(i => !Q.draft[i]) ?? null;
  lefts.forEach(b => b.addEventListener("click", () => {
    const ri = +b.dataset.r;
    if(Q.sel === ri && Q.draft[ri]){ Q.draft[ri] = ""; }      // second click on a linked row unlinks it
    Q.sel = ri; paint();
  }));
  rights.forEach(b => b.addEventListener("click", () => {
    const c = q.choiceOrder[+b.dataset.c];
    if(Q.sel === null || Q.sel === undefined){
      const linked = q.pairs.map((_,i) => i).filter(i => Q.draft[i] === c);   // no row picked: clicking a used answer frees it
      if(linked.length){ Q.draft[linked[linked.length-1]] = ""; Q.sel = linked[linked.length-1]; paint(); }
      return;
    }
    if(Q.draft[Q.sel] === c){ Q.draft[Q.sel] = ""; paint(); return; }
    link(Q.sel, c);
  }));
  paint();
  $("#submitMatch").addEventListener("click", () => { Q.sel = undefined; pickMatch(q.pairs.map((_,i) => Q.draft[i] || "")); });
}
function matchCap(q, c){ return Math.max(1, q.pairs.filter(p => p[1] === c).length); }
function pickMatch(vals){
  if(Q.picked!==null) return;
  const q = Q.qs[Q.i]; Q.picked = vals; Q.draft = null;
  const ok = q.pairs.every((p,i) => vals[i] === p[1]); Q.results.push(ok);
  srsRecord(q, ok); q.yours = vals;
  renderQ();
}
function srsRecord(q, ok){
  const wrong = srsGet(); const now = Date.now(); const cur = wrong[q.key];
  if(!ok) wrong[q.key] = {b:0, due: now + SRS_DAYS[0]*DAY};
  else if(cur && cur.due <= now){ const b = cur.b + 1; if(b >= SRS_DAYS.length) delete wrong[q.key]; else wrong[q.key] = {b, due: now + SRS_DAYS[b]*DAY}; }
  store.set("wrong", wrong);
}
function renderQ(){
  const q = Q.qs[Q.i], done = Q.picked!==null, right = Q.results.filter(Boolean).length;
  if(q.type === "match") return renderMatch(q, done, right);
  const keys = "ABCD";
  $("#view-quiz").innerHTML = `
    <div class="qhead"><span class="eyebrow">${esc(Q.name)}</span><button class="btn small" id="quit">Hætta</button></div>
    <div class="qhead"><span class="mono">Spurning ${Q.i+1} / ${Q.qs.length}</span><span class="mono muted">${right} rétt</span></div>
    <div class="bar"><i style="width:${(Q.i/Q.qs.length)*100}%"></i></div>
    <div class="qcard">
      ${q.type==="diff" ? '<span class="qtype">Hver er munurinn? · '+esc(q.pair)+'</span>' : ''}
      <p class="qtext">${esc(q.prompt)}</p>
      <div class="choices">${q.order.map((oi,pos) => {
        let cls = "";
        if(done){ if(oi===q.ans) cls="right"; else if(oi===Q.picked) cls="wrong"; }
        return `<button class="choice ${cls}" data-o="${oi}" ${done?"disabled":""}><span class="k">${keys[pos]}</span><span>${esc(q.opts[oi])}</span></button>`;
      }).join("")}</div>
      ${done ? `<div class="feedback ${Q.picked===q.ans?"ok":"no"}"><strong>${Q.picked===q.ans?"Rétt":"Rangt"}</strong><span>${esc(q.expl)}</span>${q.src==="lec" ? '<a class="readmore" href="#fyrirlestur-'+q.lec+'">Lesa glósurnar: Lecture '+q.lec+' →</a>' : ""}</div>` : ""}
      <div class="qfoot">
        <span class="src">${q.src==="lec" ? "YouTube-fyrirlestur "+q.lec+": "+esc((LECTURES[q.lec-1]||{}).t||"") : q.src>=2 ? "Microsoft-bankinn" : esc(NAMES[q.src]) + " · nr. " + q.n}</span>
        ${done ? `<button class="btn primary" id="next">${Q.i+1<Q.qs.length?"Næsta":"Sjá niðurstöðu"}</button>` : `<span class="hint">Takkar: A–D eða 1–4</span>`}
      </div>
    </div>`;
  $("#quit").addEventListener("click", quit);
  document.querySelectorAll(".choice").forEach(b => b.addEventListener("click", () => pick(+b.dataset.o)));
  if(done){ $("#next").addEventListener("click", next); $("#next").focus(); }
}
function pick(o){
  if(Q.picked!==null) return;
  const q = Q.qs[Q.i]; Q.picked = o;
  const ok = o===q.ans; Q.results.push(ok);
  const wrong = srsGet(); const now = Date.now(); const cur = wrong[q.key];
  if(!ok) wrong[q.key] = {b:0, due: now + SRS_DAYS[0]*DAY};
  else if(cur && cur.due <= now){ const b = cur.b + 1; if(b >= SRS_DAYS.length) delete wrong[q.key]; else wrong[q.key] = {b, due: now + SRS_DAYS[b]*DAY}; }
  store.set("wrong", wrong);
  q.yours = o;
  renderQ();
}
function next(){
  if(Q.i+1<Q.qs.length){ Q.i++; Q.picked=null; Q.draft=null; Q.sel=undefined; renderQ(); window.scrollTo({top:0}); }
  else finish();
}
function lecOf(id){ return id && id.startsWith("lql-") ? +id.slice(4) : 0; }
function quit(){
  const n = lecOf(Q && Q.id); quizActive=false; Q=null; renderTests();
  if(n){ location.hash = "fyrirlestur-"+n; return; }
  show("tests");
}
function goLecture(n){ quizActive=false; Q=null; renderTests(); location.hash = "fyrirlestur-"+n; }
function finish(){
  const n = Q.qs.length, right = Q.results.filter(Boolean).length, pct = Math.round(right/n*100);
  const scaled = Math.round(pct*10);
  const hist = store.get("hist", []);
  const DOM_NAMES = {1:"Kjarnaþjónustur, auðkenni og öryggi", 2:"Gagnavernd og stjórnun", 3:"Copilot og agents"};
  const dom = {}; Q.qs.forEach((q,i) => { if(!q.dom) return; dom[q.dom] = dom[q.dom] || [0,0]; dom[q.dom][1]++; if(Q.results[i]) dom[q.dom][0]++; });
  hist.unshift({id:Q.id, name:Q.name, pct, right, n, dom, date:new Date().toISOString()});
  store.set("hist", hist.slice(0,200));
  const wrongs = Q.qs.filter((q,i) => !Q.results[i]);
  const verdict = pct>=80 ? "Markmiðinu náð." : pct>=70 ? "Yfir 700 en undir 80% markmiðinu." : "Undir 700. Farðu yfir villurnar hér fyrir neðan.";
  const lec = lecOf(Q.id), nextLec = lec && LECTURES[lec] ? lec+1 : 0;
  if(lec && !isRead(lec)) setRead(lec, true);
  renderLectures();
  $("#view-quiz").innerHTML = `
    <div class="qhead"><span class="eyebrow">${esc(Q.name)}</span><button class="btn small" id="quit">${lec ? "Til baka í fyrirlesturinn" : "Til baka"}</button></div>
    ${nextLec ? '<a class="next-lec" href="#fyrirlestur-'+nextLec+'" id="nextLec"><span>Næsti fyrirlestur →</span><b>Lecture '+nextLec+': '+esc(LECTURES[nextLec-1].t)+'</b></a>' : ''}
    <div class="score">
      <div class="qhead"><span class="big mono">${pct}%</span><span class="mono muted">${right} / ${n} rétt</span></div>
      <div>
        <div class="scale" aria-label="Gróft mat: ${scaled} af 1000"><i style="width:${Math.min(scaled,1000)/10}%"></i><span class="mark" style="left:70%"><span>700 til að standast</span></span></div>
      </div>
      <p>≈ <b class="mono">${scaled}</b> af 1000 (gróft mat). ${verdict}</p>
      ${Object.keys(dom).length > 1 ? '<div class="dom-break"><span class="eyebrow">Eftir sviðum</span>' + Object.keys(dom).sort().map(d => { const r = dom[d][0], t = dom[d][1], p = Math.round(r/t*100); return '<div class="dbar"><div class="dbar-top"><b>Svið '+d+': '+DOM_NAMES[d]+'</b><span class="mono">'+p+'% · '+r+'/'+t+'</span></div><div class="bar '+(p>=80?"good":p>=70?"warn":"bad")+'"><i style="width:'+p+'%"></i></div></div>'; }).join("") + '</div>' : ''}
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" id="again">Taka aftur</button>${wrongs.length?'<button class="btn" id="wrongOnly">Æfa villurnar mínar</button>':""}</div><p class="hint">Villurnar koma aftur í „Upprifjun dagsins“ á morgun.</p><div></div>
    </div>
    ${wrongs.length ? `<h2>Villurnar (${wrongs.length})</h2><div class="review">${wrongs.map(q => `
      <div class="rv"><p><b>${esc(q.prompt)}</b></p>
        ${q.type === "match" ? '<ul class="rv-match">' + q.pairs.map((p,i) => '<li>'+esc(p[0])+' → <b>'+esc(p[1])+'</b>'+(q.yours[i]!==p[1] ? ' <span class="y">(þú: '+esc(q.yours[i]||"–")+')</span>' : '')+'</li>').join("") + '</ul>' :
        '<p class="y">Þitt svar: '+esc(q.opts[q.yours])+'</p><p class="a">Rétt: <b>'+esc(q.opts[q.ans])+'</b></p>'}
        <p class="muted" style="font-size:14px">${esc(q.expl)}</p></div>`).join("")}</div>` : `<p class="muted">Engar villur. Vel gert!</p>`}`;
  const id = Q.id;
  $("#quit").addEventListener("click", quit);
  $("#again").addEventListener("click", () => start(id));
  const w = $("#wrongOnly"); if(w) w.addEventListener("click", () => start("wrong"));
  const nl = $("#nextLec"); if(nl) nl.addEventListener("click", e => { e.preventDefault(); goLecture(nextLec); });
  window.scrollTo({top:0});
}
document.addEventListener("keydown", e => {
  if(!quizActive || !Q || $("#view-quiz").hidden) return;
  if(e.target.tagName==="INPUT" || e.target.tagName==="SELECT") return;
  const k = e.key.toLowerCase();
  const idx = "abcd".indexOf(k) >= 0 ? "abcd".indexOf(k) : "1234".indexOf(k);
  const q = Q.qs[Q.i];
  if(idx>=0 && q && q.order && Q.picked===null && idx<q.order.length){ pick(q.order[idx]); e.preventDefault(); }
  else if(e.key==="Enter" && Q.picked!==null && document.activeElement?.id!=="next"){ next(); e.preventDefault(); }
});

/* ---------- lectures ---------- */
function inline(t){
  return esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?![*\w])/g, "$1<em>$2</em>");
}
function md(src){
  const lines = src.trim().split("\n"); const out = []; let i = 0, sec = 0;
  const box = (cls, lbl, t) => '<aside class="box '+cls+'"><span class="lbl">'+lbl+'</span><p>'+inline(t)+'</p></aside>';
  while(i < lines.length){
    const L = lines[i];
    if(!L.trim()){ i++; continue; }
    if(L.startsWith("## ")){ out.push('<h2 id="sec-'+(sec++)+'">'+inline(L.slice(3))+'</h2>'); i++; continue; }
    if(L.startsWith("> ")){ out.push(box("analogy","Analogy",L.slice(2))); i++; continue; }
    if(L.startsWith("! ")){ out.push(box("tip","Exam tip",L.slice(2))); i++; continue; }
    if(L.startsWith("+ ")){ out.push(box("note","Good to know",L.slice(2))); i++; continue; }
    if(L.startsWith("- ")){
      const items = [];
      while(i < lines.length && lines[i].startsWith("- ")){ items.push("<li>"+inline(lines[i].slice(2))+"</li>"); i++; }
      out.push("<ul>"+items.join("")+"</ul>"); continue;
    }
    if(L.startsWith("|")){
      const rows = [];
      while(i < lines.length && lines[i].startsWith("|")){ rows.push(lines[i].split("|").slice(1).map(c=>c.trim())); i++; }
      const w = Math.max(...rows.map(r=>r.length));
      const cells = (r, tag) => { const c = r.slice(); while(c.length < w) c.push(""); return c.map(x => "<"+tag+">"+inline(x)+"</"+tag+">").join(""); };
      out.push('<div class="tbl"><table><thead><tr>'+cells(rows[0],"th")+'</tr></thead><tbody>'
        + rows.slice(1).map(r => "<tr>"+cells(r,"td")+"</tr>").join("") + '</tbody></table></div>');
      continue;
    }
    out.push("<p>"+inline(L)+"</p>"); i++;
  }
  return out.join("");
}
function teaser(l){
  const line = l.md.split("\n").find(x => x.startsWith("> ") || x.startsWith("- ")) || "";
  const t = line.slice(2).replace(/\*\*/g,"").replace(/\*/g,"");
  return t.length > 150 ? t.slice(0,147).replace(/\s+\S*$/,"") + "…" : t;
}
const PLAYLIST = "PLeAdpmiY-mCf-1ysvpuGMbtgQsOKV5ESW";
const VIDEOS = [["VFS2iJ-WoxI","1-2","11:13"],["1M0jR6ISXV0","1-3","11:43"],["SfIPkAhLmAA","1-4","8:16"],["IJ_wC5e2t9A","1-5","8:04"],["Ga4Lnq6g4ds","1-6","10:50"],["6kgN2WmEqEA","1-7","5:57"],["p9YD24wn83s","1-8","8:38"],["eyPRQObASDI","2-1","9:34"],["IIti1RQpJx0","2-2","9:26"],["MMC7sZixwVU","2-3","9:59"],["e14ofYg1OoY","2-4","9:26"],["6EGNZTvpQtU","2-5","10:27"],["4ljtFOOklr4","2-6","8:29"],["i-OvwVmC05A","3-1","11:09"],["rGbDkMhYj4M","3-2","8:02"],["axT9MtTNSfs","3-3","8:28"],["TAfRmKrC3-g","3-4","9:01"],["VSl9nP3qfXg","3-5","11:16"],["eq6sJSgYzfg","3-6","7:27"],["5dnf2joA_FY","4-1","6:13"],["R1apJV9EQi4","4-2","8:40"],["wjdy24sIuz4","4-3","10:15"],["ooXz0Vh7gXA","4-4","8:55"],["BR89BGUQcuA","4-5","7:57"],["ljK9m_uDcsg","4-6","9:13"],["CcdPXYg4OLM","4-7","9:26"],["lU6CxgjZCUg","5-1","6:23"],["9AzU6Ofu6f4","5-2","7:44"],["xgcT7BIuYVk","5-3","8:00"],["uKC21N9Cs20","5-4","10:20"],["0xjOqmTo5xU","5-5","10:08"],["wAKEYnoAztY","5-6","8:26"],["IBi2PCUXI-8","6-1","6:11"],["h_iqLjcI4mQ","6-2","8:30"],["pZCTn1lSBjQ","6-3","8:16"],["c9KpZYRBpFs","6-4","8:42"],["fq3pe-zC3QY","6-5","7:30"],["sM-omuY60Bo","6-6","8:28"],["LBtl_EF1vIM","6-7","10:08"]];
const videoUrl = n => VIDEOS[n-1] ? "https://www.youtube.com/watch?v=" + VIDEOS[n-1][0] + "&list=" + PLAYLIST + "&index=" + (n+1) : YT_URL;
const isRead = n => !!store.get("read", {})[n];
function setRead(n, v){ const r = store.get("read", {}); if(v) r[n] = 1; else delete r[n]; store.set("read", r); }
function lecBest(n){
  const h = store.get("hist", []).filter(r => r.id === "lql-"+n); if(!h.length) return "";
  const b = Math.max(...h.map(r => r.pct)); return '<span class="chip '+(b>=80?"good":b>=70?"warn":"bad")+'">Test '+b+'%</span>';
}
function renderLectures(){
  const readN = LECTURES.filter((l,i) => isRead(i+1)).length;
  $("#lecProgress").innerHTML = '<div class="dbar-top"><b>'+readN+' of '+LECTURES.length+' lectures read</b><span class="mono">'+Math.round(readN/LECTURES.length*100)+'%</span></div><div class="bar"><i style="width:'+(readN/LECTURES.length*100)+'%"></i></div>';
  $("#lecList").innerHTML = ["1","2","3"].map(d => {
    const items = LECTURES.map((l,i) => [l,i]).filter(([l]) => l.d===d);
    return '<section class="lec-group"><div class="lec-group-head"><span class="eyebrow">'+DOMAINS[d][0]+' · '+items.length+' lectures</span><h2>'+DOMAINS[d][1]+'</h2></div><div class="lec-grid">'
      + items.map(([l,i]) => '<a class="lec-card'+(isRead(i+1)?' is-read':'')+'" href="#fyrirlestur-'+(i+1)+'"><span class="n mono">'+String(i+1).padStart(2,"0")+(VIDEOS[i] ? ' · Module '+VIDEOS[i][1]+' · '+VIDEOS[i][2] : '')+'</span><h3>'+esc(l.t)+'</h3><p>'+esc(teaser(l))+'</p><div class="lec-foot"><span class="open">'+(isRead(i+1)?'Review notes →':'Open notes →')+'</span>'+lecBest(i+1)+(isRead(i+1)?'<span class="done-badge">✓ Done</span>':'')+'</div></a>').join("")
      + '</div></section>';
  }).join("");
}
function renderLecture(n){
  const l = LECTURES[n-1];
  if(!l){ location.hash = "fyrirlestrar"; return; }
  const prev = LECTURES[n-2], next = LECTURES[n];
  const secs = l.md.split("\n").filter(x => x.startsWith("## ")).map(x => x.slice(3));
  $("#view-lecture").innerHTML =
    '<nav class="crumbs"><a href="#fyrirlestrar">← All lectures</a></nav>'
    + '<header class="lec-head"><span class="eyebrow">'+DOMAINS[l.d][0]+' · '+DOMAINS[l.d][1]+' · Lecture '+n+' of '+LECTURES.length+'</span><h1>'+esc(l.t)+'</h1>'
    + '<div class="lec-actions"><a class="btn" href="'+videoUrl(n)+'" target="_blank" rel="noopener">▶ Watch on YouTube'+(VIDEOS[n-1] ? ' · Module '+VIDEOS[n-1][1]+' · '+VIDEOS[n-1][2] : '')+' ↗</a>'
    + '<button class="btn'+(isRead(n)?' is-on':'')+'" type="button" id="readToggle" aria-pressed="'+isRead(n)+'">'+(isRead(n)?'✓ Read':'Mark as read')+'</button></div></header>'
    + (secs.length > 2 ? '<div class="toc"><span class="eyebrow">On this page</span><div class="toc-list">'+secs.map((t,k) => '<button type="button" data-sec="sec-'+k+'">'+inline(t)+'</button>').join("")+'</div></div>' : '')
    + '<article class="notes">'+md(l.md)+'</article>'
    + '<div class="done-row"><button class="btn'+(isRead(n)?' is-on':'')+'" type="button" id="readToggle2">'+(isRead(n)?'✓ Read — nice work':'Mark this lecture as read')+'</button></div>'
    + (lectureSet(n).qs.length ? '<section class="selftest"><div><span class="eyebrow">Test yourself</span><h2>'+lectureSet(n).qs.length+' must-know questions from this lecture</h2></div><button class="btn primary" type="button" id="lecTest">Start</button></section>' : '')
    + '<nav class="pager">'
    + (prev ? '<a href="#fyrirlestur-'+(n-1)+'"><span>← Previous</span><b>'+esc(prev.t)+'</b></a>' : '<span></span>')
    + (next ? '<a class="next" href="#fyrirlestur-'+(n+1)+'"><span>Next →</span><b>'+esc(next.t)+'</b></a>' : '<a class="next" href="#fyrirlestrar"><span>Done</span><b>Back to all lectures</b></a>')
    + '</nav>';
  ["#readToggle","#readToggle2"].forEach(id => $(id).addEventListener("click", () => { setRead(n, !isRead(n)); renderLecture(n); renderLectures(); }));
  const lt = $("#lecTest"); if(lt) lt.addEventListener("click", () => { location.hash = "prof"; setTimeout(() => start("lql-"+n), 0); });
  document.querySelectorAll(".toc button").forEach(b => b.addEventListener("click", () => {
    const el = document.getElementById(b.dataset.sec); if(el) el.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start"});
  }));
}

/* ---------- search ---------- */
const norm = t => String(t).toLowerCase();
const plain = t => String(t).replace(/\*\*/g, "").replace(/(^|\s)\*([^*]+)\*/g, "$1$2");
function hl(text, q){
  const t = String(text), i = norm(t).indexOf(q);
  if(i < 0) return esc(t);
  return esc(t.slice(0,i)) + "<mark>" + esc(t.slice(i, i+q.length)) + "</mark>" + esc(t.slice(i+q.length));
}
function snip(text, q, len){
  const t = plain(text), i = norm(t).indexOf(q); if(i < 0) return "";
  const a = Math.max(0, i - 60), b = Math.min(t.length, i + q.length + (len||110));
  return (a > 0 ? "…" : "") + t.slice(a, b) + (b < t.length ? "…" : "");
}
let SHEET_INDEX = null;
function sheetIndex(){
  if(SHEET_INDEX) return SHEET_INDEX;
  SHEET_INDEX = [];
  document.querySelectorAll("#view-sheet section").forEach(sec => {
    const h = sec.querySelector("h2"); const title = h ? h.textContent : "";
    sec.querySelectorAll("tr, li").forEach(el => { if(el.querySelector("th")) return; const cells = [...el.children].map(c => c.textContent.trim()).filter(Boolean); SHEET_INDEX.push({title, text: el.tagName === "TR" ? cells.join(" · ") : el.textContent.trim()}); });
  });
  return SHEET_INDEX;
}
function runSearch(raw){
  const q = norm(raw.trim()); const out = $("#searchResults");
  if(q.length < 2){ out.innerHTML = '<p class="muted">Skrifaðu að minnsta kosti tvo stafi, t.d. „DLP“, „PIM“ eða „Integrated apps“.</p>'; return; }
  const lec = []; LECTURES.forEach((l,i) => { const lines = l.md.split("\n").filter(x => norm(plain(x)).includes(q)); if(lines.length || norm(l.t).includes(q)) lec.push({n:i+1, l, lines}); });
  const sheet = sheetIndex().filter(r => norm(r.text).includes(q));
  const qtext = x => x.type === "match" ? x.pairs.map(p => p[0]+" "+p[1]).join(" ") : x.opts[x.ans];
  const qs = ALL.concat(LQ, MQ, DQ).filter(x => norm(x.prompt).includes(q) || norm(qtext(x)).includes(q) || norm(x.expl).includes(q));
  const total = lec.length + sheet.length + qs.length;
  if(!total){ out.innerHTML = '<p class="muted">Ekkert fannst fyrir „'+esc(raw.trim())+'“.</p>'; return; }
  let h = '<p class="muted">'+total+' niðurstöður</p>';
  if(lec.length) h += '<section class="sr-group"><h2>Fyrirlestrar <span class="mono muted">'+lec.length+'</span></h2>' + lec.slice(0,20).map(r =>
    '<a class="sr-item" href="#fyrirlestur-'+r.n+'"><span class="eyebrow">Lecture '+r.n+'</span><b>'+hl(r.l.t, q)+'</b>'
    + r.lines.slice(0,2).map(x => '<span class="sr-snip">'+hl(snip(x.replace(/^(## |> |! |\+ |- |\| ?)/, "").replace(/\|/g, " · "), q), q)+'</span>').join("") + '</a>').join("") + '</section>';
  if(sheet.length) h += '<section class="sr-group"><h2>Lykilatriði <span class="mono muted">'+sheet.length+'</span></h2>' + sheet.slice(0,20).map(r =>
    '<a class="sr-item" href="#lykilatridi"><span class="eyebrow">'+esc(r.title)+'</span><span class="sr-snip">'+hl(r.text, q)+'</span></a>').join("") + '</section>';
  if(qs.length) h += '<section class="sr-group"><h2>Spurningar <span class="mono muted">'+qs.length+'</span></h2>' + qs.slice(0,25).map(x =>
    '<details class="sr-item sr-q"><summary><span class="eyebrow">'+(x.type==="diff" ? "Hver er munurinn? · Lecture "+x.lec : x.src==="lec" ? "Lecture "+x.lec : "Microsoft-bankinn")+'</span><b>'+hl(x.prompt, q)+'</b></summary>'
    + (x.type === "match" ? '<ul class="rv-match">'+x.pairs.map(p => '<li>'+hl(p[0], q)+' → <b>'+hl(p[1], q)+'</b></li>').join("")+'</ul>' : '<p class="a">Rétt svar: <b>'+hl(x.opts[x.ans], q)+'</b></p>')
    + '<p class="muted">'+hl(x.expl, q)+'</p></details>').join("") + '</section>';
  out.innerHTML = h;
}
let searchTimer = null;
$("#searchInput").addEventListener("input", e => { clearTimeout(searchTimer); const v = e.target.value; searchTimer = setTimeout(() => runSearch(v), 150); });

/* ---------- home ---------- */
function dayKey(d){ const x = new Date(d); return x.getFullYear()+"-"+(x.getMonth()+1)+"-"+x.getDate(); }
function streakInfo(){
  const days = new Set(store.get("hist", []).map(r => dayKey(r.date)));
  const today = new Date(); let cur = 0; const d = new Date(today);
  if(!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while(days.has(dayKey(d))){ cur++; d.setDate(d.getDate() - 1); }
  return {cur, today: days.has(dayKey(today))};
}
function renderHome(){
  const h = store.get("hist", []); const ms = h.filter(r=>r.id==="ms");
  const best = ms.length ? Math.max(...ms.map(r=>r.pct))+"%" : "–";
  const wrongN = Object.keys(store.get("wrong", {})).length;
  const dueN = srsList().filter(x => x[2] <= Date.now()).length;
  $("#homeStats").innerHTML =
    '<div class="stat"><span class="v mono">'+ALL.length+'</span><span class="l">opinberar spurningar</span></div>'
    + '<div class="stat"><span class="v mono">'+LECTURES.filter((l,i)=>isRead(i+1)).length+'/'+LECTURES.length+'</span><span class="l">fyrirlestrar lesnir</span></div>'
    + '<div class="stat"><span class="v mono">'+best+'</span><span class="l">þín besta einkunn</span></div>'
    + (() => { const st = streakInfo(); return '<div class="stat"><span class="v mono">'+st.cur+(st.cur ? ' 🔥' : '')+'</span><span class="l">'+(st.cur===1 ? 'dagur' : 'dagar')+' í röð'+(st.cur && !st.today ? ' · taktu próf í dag til að halda áfram' : '')+(dueN ? ' · '+dueN+' í upprifjun' : '')+'</span></div>'; })();
}

/* ---------- progress ---------- */
function renderHist(){
  const h = store.get("hist", []); const wrongN = Object.keys(store.get("wrong", {})).length;
  const ms = h.filter(r=>r.id==="ms"); const last5 = h.slice(0,5);
  const avg = last5.length ? Math.round(last5.reduce((a,r)=>a+r.pct,0)/last5.length) : null;
  const stat = (v,l) => '<div class="stat"><span class="v mono">'+v+'</span><span class="l">'+l+'</span></div>';
  $("#stats").innerHTML = stat(h.length, "próf tekin") + stat(avg===null?"–":avg+"%", "meðaltal síðustu 5")
    + stat(ms.length?Math.max(...ms.map(r=>r.pct))+"%":"–", "best í Microsoft-bankanum") + stat(wrongN, "spurningar í „Villurnar mínar“");
  const fmt = d => { try{ return new Date(d).toLocaleDateString("is-IS",{day:"numeric",month:"short"}); }catch(e){ return ""; } };
  $("#histList").innerHTML = h.length ? h.map(r =>
    '<div class="hrow"><span class="t">'+esc(r.name)+'</span><span class="mono muted">'+fmt(r.date)+'</span>'
    + '<span class="chip '+(r.pct>=80?"good":r.pct>=70?"warn":"bad")+'">'+r.pct+'% · '+r.right+'/'+r.n+'</span></div>').join("")
    : '<p class="muted">Engar niðurstöður enn. Taktu próf undir flipanum Próf.</p>';
}
const msg = t => { $("#ioMsg").textContent = t; };
$("#clearHist").addEventListener("click", () => {
  const b = $("#clearHist");
  if(b.dataset.confirm){ store.set("hist", []); store.set("wrong", {}); store.set("read", {}); delete b.dataset.confirm; b.textContent="Hreinsa framvinduna"; renderHist(); renderTests(); msg("Framvindan var hreinsuð."); }
  else { b.dataset.confirm = "1"; b.textContent = "Smelltu aftur til að staðfesta"; }
});
$("#exportBtn").addEventListener("click", async () => {
  const text = JSON.stringify(snapshot(), null, 1);
  const name = "ab900-framvinda-" + new Date().toISOString().slice(0,10) + ".json";
  let dl = null; try{ dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null; }catch(e){}
  if(dl){
    try{ await dl.save({filename:name, data:text}); msg("Skráin " + name + " var vistuð."); return; }
    catch(e){ if(e && e.code==="declined"){ msg("Hætt við að vista."); return; } if(e && e.code==="rate_limited"){ msg("Bíddu augnablik og reyndu aftur."); return; } }
  }
  if(!window.claude){ /* plain browser download */
    try{ const url = URL.createObjectURL(new Blob([text], {type:"application/json"})); const a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); msg("Skráin " + name + " var sótt."); return; }catch(e){}
  }
  $("#manualBox").hidden = false; $("#manualText").value = text; msg("");
});
$("#copyBtn").addEventListener("click", () => {
  const t = $("#manualText");
  navigator.clipboard.writeText(t.value).then(() => msg("Afritað."), () => { t.select(); msg("Veldu textann og afritaðu með Ctrl+C."); });
});
function loadText(text){
  try{ const n = mergeIn(JSON.parse(text)); renderHist(); renderTests(); pushCloud(); msg("Framvindu hlaðið inn: " + n + " niðurstöður."); }
  catch(e){ msg("Þetta er ekki gild framvinduskrá. Notaðu skrá sem var sótt hér á síðunni."); }
}
$("#pasteLoad").addEventListener("click", () => loadText($("#manualText").value));
$("#importLabel").addEventListener("keydown", e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); $("#importFile").click(); } });
$("#importFile").addEventListener("change", e => {
  const f = e.target.files && e.target.files[0]; if(!f) return;
  const r = new FileReader(); r.onload = () => loadText(String(r.result)); r.onerror = () => msg("Ekki tókst að lesa skrána."); r.readAsText(f);
  e.target.value = "";
});

/* one-time: lecture tests taken before auto-marking count as done */
if(!store.get("readMig", false)){ store.get("hist", []).forEach(r => { const n = lecOf(r.id); if(n && LECTURES[n-1]) setRead(n, true); }); store.set("readMig", true); }
renderTests(); renderLectures(); runSearch("");
route();
/* progress is stored in this browser only (no account sync) */
})();
