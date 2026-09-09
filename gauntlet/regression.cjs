// Real-browser regression for the beta redesign. No jsdom/layout substitutes.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('fs');
const base=process.argv[2]||'http://127.0.0.1:8130/';
const out=process.env.QA_OUTPUT||require('path').join(process.cwd(),'qa-output');
fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({headless:true,args:['--no-sandbox']});const results=[],errors=[];
const check=(name,pass,details)=>{results.push({name,pass:!!pass,details});console.log(`${pass?'PASS':'FAIL'} ${name}${pass?'':' '+JSON.stringify(details)}`)};
try{const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errors.push(e.message));await p.goto(base,{waitUntil:'networkidle'});
const data=await p.evaluate(()=>({domains:AB620_CONTENT.domains,subDomains:AB620_CONTENT.subDomains,items:AB620_CONTENT.learningItems,labs:AB620_CONTENT.labs,questions:AB620_CONTENT.examBank}));
check('domains closed initially',await p.locator('.domain-accordion[open]').count()===0);
let seen=[];
for(const d of data.domains){const root=p.locator(`.domain-accordion[data-domain-id="${d.id}"]`);await root.locator(':scope > summary').click();await root.locator('.domain-presenter-start-btn').click();const items=data.subDomains.filter(s=>s.domainId===d.id).flatMap(s=>data.items.filter(i=>i.subDomainId===s.id));let matching=true;
for(let i=0;i<items.length;i++){const text=await root.locator('.presenter-card__content').innerText();if(text!==items[i].content)matching=false;seen.push(items[i].id);if(i<items.length-1)await root.locator('.presenter-next-btn').click();}
check(`${d.id}: every full learning text reachable`,matching,items.length);check(`${d.id}: truthful end-of-domain message`,/Domäne/.test(await root.locator('.presenter-card__complete').innerText()));await root.locator('.presenter-overview-btn').click();await root.locator(':scope > summary').click();}
check('all learning IDs exactly once',seen.length===data.items.length&&new Set(seen).size===data.items.length,{seen:seen.length,expected:data.items.length});fs.writeFileSync(out+'/visited-items.json',JSON.stringify(seen));
await p.locator('.domain-accordion').first().locator(':scope > summary').click();await p.locator('.domain-presenter-start-btn').first().click();
check('reading pane keyboard focusable',await p.locator('.presenter-card__explanation').first().getAttribute('tabindex')==='0');
await p.locator('.presenter-card .subdomain-read-btn').first().click();check('mark read persists',await p.evaluate(()=>Object.values(JSON.parse(localStorage.getItem('ab620-progress')).subDomains).some(Boolean)));
await p.locator('.presenter-overview-btn').first().click();
check('domain progress updates without reload',Number(await p.locator('.domain-progress').first().getAttribute('aria-valuenow'))>0);
await p.locator('a[data-domain="d2"]').click();check('domain shortcut opens target',await p.locator('.domain-accordion[data-domain-id="d2"]').evaluate(e=>e.open));
let labLinksMatch=true;for(const lab of data.labs){const rendered=await p.locator(`.lab-card[data-lab-id="${lab.id}"] a`).evaluateAll(els=>els.map(a=>a.href));for(const url of lab.msLearnRefs||[])if(!rendered.includes(url))labLinksMatch=false;}
check('every stored lab Learn link rendered',labLinksMatch);
await p.locator('.lab-card').first().locator(':scope > summary').click();await p.locator('.lab-card').first().locator('.lab-done-btn').click();check('lab completion retains open card and keyboard focus',await p.locator('.lab-card').first().evaluate(e=>e.open&&e.contains(document.activeElement)));check('lab total updates',/1 von/.test(await p.locator('.lab-progress-summary').innerText()));
await p.locator('#search-input').fill('Authentifizierung');check('search shows learning text',await p.locator('.learning-item').count()>0);await p.locator('#search-input').fill('');
await p.locator('#exam-start-btn').click();await p.locator('.quiz-option').first().click();await p.locator('#exam-next-btn').click();await p.locator('#exam-prev-btn').click();check('exam answer retained',await p.locator('.quiz-option[aria-checked="true"]').count()===1);
// Deterministic scored result uses actual bank, not a substitute response.
await p.evaluate(()=>{const e=AB620_APP.ExamSimulator;e.state.questions.forEach(q=>e.state.answers[q.id]=q.correctIndex);e.finish(false)});
check('all-correct exam passes',await p.locator('.exam-results__status--pass').count()===1);check('review grouped and collapsed',await p.locator('.review-accordion').count()>0&&await p.locator('.review-accordion[open]').count()===0);check('no bogus weight-as-pass-target legend',!(await p.locator('.exam-results__legend').innerText()).includes('Ziel-Trefferquote'));
await p.reload({waitUntil:'networkidle'});
for(const viewport of [{width:1440,height:1000},{width:390,height:844},{width:320,height:700},{width:844,height:390},{width:720,height:500}]){await p.setViewportSize(viewport);await p.screenshot({path:`${out}/beta-${viewport.width}.png`});check(`${viewport.width}: no horizontal page overflow`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));const root=p.locator('.domain-accordion').first();if(!await root.evaluate(e=>e.open))await root.locator(':scope > summary').click();await root.locator('.domain-presenter-start-btn').click();const dims=await root.locator('.presenter-card__explanation').evaluate(e=>{const title=e.querySelector('h4').getBoundingClientRect();const top=e.getBoundingClientRect();const before=e.scrollTop;e.scrollTop=e.scrollHeight;const end=e.scrollTop;e.scrollTop=0;return {client:e.clientHeight,scroll:e.scrollHeight,scrollable:end>0,titleReachable:title.top>=top.top-2,style:getComputedStyle(e).overflowY}});check(`${viewport.width}: text start/end reachable`,dims.client>80&&dims.titleReachable&&(dims.scroll<=dims.client+2||dims.scrollable),dims);await p.screenshot({path:`${out}/lesson-${viewport.width}.png`});await root.locator('.presenter-overview-btn').click();await root.locator(':scope > summary').click();}
for(const theme of ['dark','high-contrast','light']){await p.locator('#theme-select').selectOption(theme);check(`theme ${theme} applied`,await p.locator('html').getAttribute('data-theme')===theme);await p.screenshot({path:`${out}/theme-${theme}.png`});}
check('no runtime page errors',errors.length===0,errors);
}finally{await b.close();fs.writeFileSync(out+'/regression.json',JSON.stringify({base,results,errors},null,2));console.log(JSON.stringify({passed:results.filter(x=>x.pass).length,failed:results.filter(x=>!x.pass).length}));if(results.some(x=>!x.pass)||errors.length)process.exitCode=1;}})().catch(e=>{console.error(e);process.exitCode=1});
