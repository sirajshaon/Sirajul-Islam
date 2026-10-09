
const DEFS="Food|🍽️|#e76f51|Breakfast,Lunch,Dinner,Snacks,Restaurant,Fast Food,Groceries,Tea/Coffee,Other;Clothing|👕|#9b5de5|Shirt,T-Shirt,Panjabi,Pants,Undergarments,Shoes,Sandals,Jacket,Accessories,Other;Personal Care|🧴|#f15bb5|Cosmetics,Skincare,Haircut,Shaving,Perfume,Toiletries,Other;Transport|🚌|#00a6fb|Bus,CNG,Rickshaw,Train,Ride Sharing,Fuel,Maintenance,Parking,Other;Housing|🏠|#8d6e63|Rent,Maintenance,Furniture,Household Items,Cleaning,Other;Utilities|💡|#f4a261|Electricity,Gas,Water,Internet,Mobile Recharge,Other;Medical|💊|#e63946|Doctor,Medicine,Test,Dental,Other;Education|📚|#3a86ff|Books,Course,Training,Tuition,Other;Donation|🤲|#2a9d8f|Charity,Zakat,Mosque,Other;Investment|📈|#06d6a0|Savings,Stocks,Business,Fixed Deposit,Other;Debt / Loan|🤝|#6d6875|Loan Given,Loan Repayment,Borrowed Money,Other;Subscription|🔁|#7209b7|Internet,Software,Streaming,Cloud Storage,Other;Social|🎁|#ff7f50|Gift,Invitation,Friends,Family,Other;Miscellaneous|📦|#64748b|Other";
const $=s=>document.querySelector(s),nd=new Date(),KEY='tj1',MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
let S,V={tab:'home',y:nd.getFullYear(),m:nd.getMonth(),sel:null,f:{q:'',k:'',c:'',p:'',mo:'',s:'new',min:0,max:0},ed:null,rs:null};
function def(){return{tx:[],cats:DEFS.split(';').map((s,i)=>{const[a,b,c,d]=s.split('|');return{id:'c'+i,name:a,icon:b,color:c,on:true,subs:d.split(',')}}),inc:['Salary','Freelance','Business','Gift','Interest','Other'],pay:['Cash','Bank','bKash','Nagad','Card','Other'],bud:{t:0,c:{}},theme:'system',ac:'#0f766e'}}
function load(){try{const j=localStorage.getItem(KEY);if(j)return JSON.parse(j)}catch(e){}return def()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10),TODAY=()=>iso(new Date());
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=p=>(p<0?'-':'')+'৳'+(Math.abs(p)/100).toLocaleString('en-IN',{maximumFractionDigits:2});
const toP=s=>{s=String(s).replace(/,/g,'').trim();if(!s||!/^\d*\.?\d{0,2}$/.test(s)||s=='.')return NaN;const[a,b='']=s.split('.');return(+a||0)*100+(+b.padEnd(2,'0')||0)};
const pm=(y,m)=>y+'-'+String(m+1).padStart(2,'0'),mt=(y,m)=>S.tx.filter(t=>t.d.startsWith(pm(y,m))),sm=(L,k)=>L.filter(t=>t.k==k).reduce((a,t)=>a+t.a,0);
const cat=id=>S.cats.find(c=>c.id==id)||{name:'Removed category',icon:'❓',color:'#888'},ci=t=>t.k=='i'?{name:t.c,icon:'💰',color:'#168a4a'}:cat(t.c);
const dl=d=>new Date(d+'T00:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
const bycat=L=>{const o={};L.filter(t=>t.k=='e').forEach(t=>o[t.c]=(o[t.c]||0)+t.a);return Object.entries(o).sort((a,b)=>b[1]-a[1])};
const catBars=L=>{const b=bycat(L),tot=b.reduce((a,x)=>a+x[1],0);return b.length?b.map(([id,a])=>{const c=cat(id),bg=S.bud.c[id],w=bg?Math.min(100,a/bg*100):a/tot*100;return`<div class=cb><div class=r><span>${c.icon} ${esc(c.name)}</span><b>${fmt(a)}${bg?' / '+fmt(bg)+' ('+Math.round(a/bg*100)+'%)':''}</b></div><div class=bar><i style="width:${w}%;background:${bg&&a>bg?'var(--rd)':c.color}"></i></div></div>`}).join(''):'<p class=em>No spending yet. Tap + to add your first expense.</p>'};
const row=t=>{const c=ci(t);return`<div class=tx onclick="act('${t.id}')"><span class=ic style="background:${c.color}25">${c.icon}</span><div class=g><b>${esc(t.desc||c.name)}</b><small>${esc(c.name)}${t.s?' · '+esc(t.s):''} · ${esc(t.p)}</small></div><b class="${t.k=='i'?'gn':''}">${t.k=='i'?'+':'-'}${fmt(t.a)}</b></div>`};
const grouped=L=>{const o={};L.forEach(t=>(o[t.d]=o[t.d]||[]).push(t));return Object.keys(o).sort().reverse().map(d=>`<h4>${dl(d)}<span>${fmt(sm(o[d],'e'))}</span></h4>`+o[d].map(row).join('')).join('')||'<p class=em>No transactions found.</p>'};
const st=(l,v,c='')=>`<div class=cd><small>${l}</small><b class="${c}">${v}</b></div>`;
function insights(y,m){const p=m?[y,m-1]:[y-1,11],a=Object.fromEntries(bycat(mt(y,m))),b=Object.fromEntries(bycat(mt(...p))),r=[];for(const id in a)if(b[id]>0){const x=Math.round((a[id]-b[id])/b[id]*100);if(Math.abs(x)>=10)r.push(`You spent ${Math.abs(x)}% ${x>0?'more':'less'} on ${cat(id).name} than last month.`)}return r.slice(0,3)}
const yrs=()=>{const a=Math.min(2025,...S.tx.map(t=>+t.d.slice(0,4))),b=nd.getFullYear()+2;return[...Array(b-a+1)].map((_,i)=>a+i)};
const ysel=()=>`<select onchange="V.y=+this.value;V.sel=null;R()">${yrs().map(y=>`<option ${y==V.y?'selected':''}>${y}</option>`).join('')}</select>`;
const VW={
home(){const y=nd.getFullYear(),m=nd.getMonth(),L=mt(y,m),e=sm(L,'e'),i=sm(L,'i'),b=budT(),yr=S.tx.filter(t=>t.k=='e'&&t.d.startsWith(y+'-')).reduce((a,t)=>a+t.a,0),n=new Date(y,m+1,0).getDate(),dd=Array(n).fill(0);L.filter(t=>t.k=='e').forEach(t=>dd[+t.d.slice(8)-1]+=t.a);const mx=Math.max(1,...dd),ins=insights(y,m);
return`<small>${nd.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</small><h2>${MN[m]} ${y}</h2>
<div class=cd><small>Spent this month</small><div class=big>${fmt(e)}</div>${b?`<div class=bar style="margin:8px 0"><i style="width:${Math.min(100,e/b*100)}%;background:${e>b?'var(--rd)':'var(--ac)'}"></i></div><div class=r><small>Budget ${fmt(b)}</small><small class="${b-e<0?'rd':''}">${b-e<0?'Over by '+fmt(e-b):fmt(b-e)+' left'}</small></div>`:'<small>Set a monthly budget in More</small>'}</div>
<div class=grid>${st('Income',fmt(i),'gn')}${st('Remaining (income − expense)',fmt(i-e),i-e<0?'rd':'')}${st('Monthly budget',b?fmt(b):'Not set')}${st('Spent this year',fmt(yr))}</div>
<div class=btns style="margin:12px 0"><button class="pri big-btn" onclick="openForm()">+ Add expense</button><button class="big-btn" onclick="bulk()">+ Add many</button></div>
${ins.length?`<div class=cd><h3>Insights</h3>${ins.map(x=>`<p style="margin:4px 0">${x}</p>`).join('')}</div>`:''}
<div class=cd><h3>Daily spending</h3><div class=days>${dd.map(v=>`<i style="height:${v/mx*100}%"></i>`).join('')}</div></div>
<div class=cd><h3>Where it went</h3>${catBars(L)}</div><h4>Recent<span></span></h4>${S.tx.slice().sort((a,b)=>a.d<b.d?1:a.d>b.d?-1:b.id<a.id?-1:1).slice(0,6).map(row).join('')||'<p class=em>Nothing yet.</p>'}`},
month(){const{y,m}=V,L=mt(y,m),e=sm(L,'e'),i=sm(L,'i'),b=budT(),n=new Date(y,m+1,0).getDate(),f=new Date(y,m,1).getDay(),cur=y==nd.getFullYear()&&m==nd.getMonth(),dt={};L.filter(t=>t.k=='e').forEach(t=>dt[t.d]=(dt[t.d]||0)+t.a);
const cells=[...Array(f)].map(()=>'<div></div>').concat([...Array(n)].map((_,k)=>{const d=pm(y,m)+'-'+String(k+1).padStart(2,'0'),a=dt[d];return`<div class="dy${V.sel==d?' on':''}${d==TODAY()?' t':''}" onclick="V.sel='${d}';R()">${k+1}<b>${a?(a>=1e5?(a/1e5).toFixed(1)+'k':Math.round(a/100)):''}</b></div>`}));
const sl=V.sel?L.filter(t=>t.d==V.sel):[];
return`<h2>Monthly view</h2><div class=ctl>${ysel()}<select onchange="V.m=+this.value;V.sel=null;R()">${MN.map((x,k)=>`<option value=${k} ${k==m?'selected':''}>${x}</option>`).join('')}</select></div>
<div class=grid>${st('Expense',fmt(e))}${st('Income',fmt(i),'gn')}${st('Net balance',fmt(i-e),i-e<0?'rd':'')}${st('Budget left',b?fmt(b-e):'No budget',b&&b-e<0?'rd':'')}${st('Average per day',fmt(Math.round(e/(cur?nd.getDate():n))))}${st('Transactions',L.length)}</div>
<div class=cd style="margin-top:12px"><div class=cal>${'SMTWTFS'.split('').map(x=>`<small>${x}</small>`).join('')}${cells.join('')}</div></div>
${V.sel?`<h4>${dl(V.sel)}<span>${fmt(dt[V.sel]||0)}</span></h4>${sl.map(row).join('')||'<p class=em>No transactions on this day.</p>'}<div class=btns><button class="pri big-btn" onclick="openForm(null,V.sel)">+ Add expense</button><button class="big-btn" onclick="bulk(V.sel)">+ Add many</button></div>`:'<p class=em>Tap a date to see its transactions.</p>'}
<div class=cd style="margin-top:12px"><h3>Category spending</h3>${catBars(L)}</div>`},
year(){const y=V.y,A=S.tx.filter(t=>t.d.startsWith(y+'-')),ms=[...Array(12)].map((_,m)=>sm(mt(y,m),'e')),e=sm(A,'e'),i=sm(A,'i'),ac=ms.map((v,m)=>[v,m]).filter(x=>x[0]>0),mx=Math.max(1,...ms),hi=ac.length?ac.reduce((a,b)=>b[0]>a[0]?b:a):0,lo=ac.length?ac.reduce((a,b)=>b[0]<a[0]?b:a):0;
return`<h2>Yearly view</h2><div class=ctl>${ysel()}</div><div class=grid>${st('Total expense',fmt(e))}${st('Total income',fmt(i),'gn')}${st('Net balance',fmt(i-e),i-e<0?'rd':'')}${st('Average per month',fmt(ac.length?Math.round(e/ac.length):0))}${st('Highest month',hi?MN[hi[1]]+' · '+fmt(hi[0]):'—')}${st('Lowest month',lo?MN[lo[1]]+' · '+fmt(lo[0]):'—')}</div>
<div class=cd style="margin-top:12px"><div class=cols>${ms.map((v,m)=>`<div class=col onclick="V.m=${m};V.sel=null;V.tab='month';R()"><i style="height:${v/mx*100}%"></i><small>${MN[m].slice(0,3)}</small></div>`).join('')}</div></div>
<div class=cd>${ms.map((v,m)=>`<div class=r onclick="V.m=${m};V.sel=null;V.tab='month';R()" style="cursor:pointer"><span>${MN[m]}</span><b>${fmt(v)}</b></div>`).join('')}</div>
<div class=cd><h3>Category breakdown</h3>${catBars(A)}</div>`},
tx(){const f=V.f;return`<h2>Transactions</h2><div class=cd><input placeholder="Search" value="${esc(f.q)}" oninput="V.f.q=this.value;dl2()"><div class=ctl style="margin-top:8px"><select onchange="V.f.k=this.value;R()"><option value="">All types</option><option value=e ${f.k=='e'?'selected':''}>Expense</option><option value=i ${f.k=='i'?'selected':''}>Income</option></select><select onchange="V.f.c=this.value;R()"><option value="">All categories</option>${S.cats.map(c=>`<option value="${c.id}" ${f.c==c.id?'selected':''}>${esc(c.name)}</option>`).join('')}${S.inc.map(c=>`<option ${f.c==c?'selected':''}>${esc(c)}</option>`).join('')}</select></div>
<div class=ctl><select onchange="V.f.p=this.value;R()"><option value="">All payment methods</option>${S.pay.map(c=>`<option ${f.p==c?'selected':''}>${esc(c)}</option>`).join('')}</select><input type=month value="${f.mo}" onchange="V.f.mo=this.value;R()"></div>
<div class=ctl><input class=sm style="flex:1" inputmode=decimal placeholder="Min ৳" value="${f.min?f.min/100:''}" onchange="V.f.min=toP(this.value)||0;R()"><input class=sm style="flex:1" inputmode=decimal placeholder="Max ৳" value="${f.max?f.max/100:''}" onchange="V.f.max=toP(this.value)||0;R()"><select onchange="V.f.s=this.value;R()">${[['new','Newest'],['old','Oldest'],['hi','Highest'],['lo','Lowest']].map(([a,b])=>`<option value=${a} ${f.s==a?'selected':''}>${b}</option>`).join('')}</select></div></div><div id=lst>${lst()}</div>`},
more(){const q=(c,i)=>`<div class=r><label><input type=checkbox style="width:auto" ${c.on?'checked':''} onchange="tg(${i})"> ${c.icon} ${esc(c.name)}</label><span><button class="ib ghost" onclick="mv(${i})">↑</button><button class="ib ghost" onclick="editCat(${i})">✎</button></span></div>`;
return`<h2>Settings</h2><div class=cd><h3>Appearance</h3><div class=r><span>Theme</span><select onchange="S.theme=this.value;save();R()">${['system','light','dark'].map(x=>`<option ${S.theme==x?'selected':''}>${x}</option>`).join('')}</select></div><div class=r><span>Accent color</span><input type=color style="width:60px" value="${S.ac}" onchange="S.ac=this.value;save();R()"></div><div class=r><span>Currency</span><b>Taka (৳)</b></div></div>
<div class=cd><h3>Budgets (৳ per month)</h3>${bsum()?`<div class=r><b>Overall (total of categories)</b><b>${fmt(bsum())}</b></div>`:`<div class=r><b>Overall</b><input class=sm inputmode=decimal value="${S.bud.t/100||''}" onchange="setB('t',this.value)"></div><small>Or fill the category budgets below. The overall budget then becomes their total (empty counts as 0).</small>`}${S.cats.filter(c=>c.on).map(c=>`<div class=r><span>${c.icon} ${esc(c.name)}</span><input class=sm inputmode=decimal value="${(S.bud.c[c.id]||0)/100||''}" onchange="setB('${c.id}',this.value)"></div>`).join('')}</div>
<div class=cd><h3>Categories</h3><small>Tap ✎ to edit or delete. Past transactions always stay safe.</small>${S.cats.map((c,i)=>c.arch?'':q(c,i)).join('')}<div class=r><input id=nc placeholder="New category"><input id=ni style="width:70px" placeholder="😀" maxlength=2><button class=pri onclick="addC()">Add</button></div><div class=r><select id=sc>${S.cats.filter(c=>!c.arch).map(c=>`<option value=${c.id}>${esc(c.name)}</option>`).join('')}</select><input id=ns placeholder="New subcategory"><button class=pri onclick="addS()">Add</button></div></div>
<div class=cd><h3>Income categories</h3>${S.inc.map((p,i)=>`<span class=chip>${esc(p)} <a onclick="if(S.inc.length>1){S.inc.splice(${i},1);save();R()}">✕</a></span>`).join('')}<div class=r><input id=nin placeholder="New income category"><button class=pri onclick="addI()">Add</button></div></div>
<div class=cd><h3>Payment methods</h3>${S.pay.map((p,i)=>`<span class=chip>${esc(p)} <a onclick="if(S.pay.length>1){S.pay.splice(${i},1);save();R()}">✕</a></span>`).join('')}<div class=r><input id=np placeholder="New method"><button class=pri onclick="addP()">Add</button></div></div>
<div class=cd><h3>Backup, restore and export</h3><small>Your data is saved in this browser on this device. Download a backup file now and then; use it to restore or to move to another device.</small><div class=r style="margin-top:8px"><button onclick="dlFile('taka-backup-'+TODAY()+'.json',JSON.stringify({app:'tj',v:1,data:S},null,1))">Download backup</button><select id=xs><option value=m>This month</option><option value=y>This year</option><option value=a>All data</option></select><button onclick="dlFile('taka-export-'+TODAY()+'.csv','\ufeff'+csv())">Export CSV</button></div><div id=io></div><h3 style="margin-top:14px">Restore</h3><input type=file accept=".json,application/json" onchange="rf(this)" style="margin-bottom:6px"><textarea id=rs placeholder="Paste backup text here"></textarea><button style="margin-top:6px" onclick="chk()">Check backup</button><p id=rm class=mu></p></div>
<p class=em>Taka Journal · private and offline. Nothing is uploaded.</p>`}};
const filt=()=>{const f=V.f,q=f.q.toLowerCase();let L=S.tx.filter(t=>(!f.k||t.k==f.k)&&(!f.c||t.c==f.c)&&(!f.p||t.p==f.p)&&(!f.mo||t.d.startsWith(f.mo))&&(!f.min||t.a>=f.min)&&(!f.max||t.a<=f.max)&&(!q||(t.desc+' '+(t.n||'')+' '+ci(t).name+' '+(t.s||'')).toLowerCase().includes(q)));return f.s=='hi'?L.sort((a,b)=>b.a-a.a):f.s=='lo'?L.sort((a,b)=>a.a-b.a):f.s=='old'?L.sort((a,b)=>a.d<b.d?-1:1):L.sort((a,b)=>a.d<b.d?1:-1)};
function lst(){const L=filt();if(V.f.s=='hi'||V.f.s=='lo')return L.map(row).join('')||'<p class=em>No transactions found.</p>';let h=grouped(L);if(V.f.s=='old'){const o={};L.forEach(t=>(o[t.d]=o[t.d]||[]).push(t));h=Object.keys(o).sort().map(d=>`<h4>${dl(d)}<span>${fmt(sm(o[d],'e'))}</span></h4>`+o[d].map(row).join('')).join('')||'<p class=em>No transactions found.</p>'}return h}
const dl2=()=>{$('#lst').innerHTML=lst()};
function R(){$('#dlb').style.display=V.tab=='more'?'none':'flex';const r=document.documentElement;S.theme=='system'?r.removeAttribute('data-theme'):r.dataset.theme=S.theme;r.style.setProperty('--ac',S.ac);$('#app').innerHTML=VW[V.tab]();$('#nav').innerHTML=[['home','🏠','Home'],['month','📅','Month'],['year','📊','Year'],['tx','🧾','List'],['rep','📄','Reports'],['more','⚙️','More']].map(([k,i,l])=>`<a class="${V.tab==k?'on':''}" onclick="V.tab='${k}';R();scrollTo(0,0)"><span>${i}</span>${l}</a>`).join('')}
function toast(t){const e=$('#toast');e.textContent=t;e.style.display='block';clearTimeout(toast.h);toast.h=setTimeout(()=>e.style.display='none',2200)}
function sheet(h){$('#ov').innerHTML=h?`<div class=ov onclick="if(event.target==this)closeS()"><div class=sh>${h}</div></div>`:''}const closeS=()=>sheet('');
function openForm(id,date){const t=id?S.tx.find(x=>x.id==id):null;V.ed=t?{...t}:{k:'e',d:date||TODAY(),c:(S.cats.find(c=>c.on)||S.cats[0]).id,s:'',p:S.pay[0],a:0,desc:'',n:''};drawForm()}
function sync(){const g=i=>$('#'+i)?$('#'+i).value:null,e=V.ed;if(g('fa')!==null){e.d=g('fd')||e.d;e.c=g('fc')||e.c;e.s=g('fs')??e.s;e.p=g('fp')||e.p;e.desc=g('fdesc');e.n=g('fn');e._a=g('fa')}}
function setK(k){sync();V.ed.k=k;V.ed.c=k=='e'?(S.cats.find(c=>c.on)||S.cats[0]).id:S.inc[0];V.ed.s='';drawForm()}
function drawForm(){const e=V.ed,ex=e.k=='e',cs=ex?S.cats.filter(c=>c.on||c.id==e.c):[],sc=ex?cat(e.c).subs||[]:[];
sheet(`<div class=seg><button class="${ex?'on':''}" onclick="setK('e')">Expense</button><button class="${ex?'':'on'}" onclick="setK('i')">Income</button>${e.id?'':`<button onclick="sync();bulk(V.ed.d)">Many</button>`}</div>
<input id=fa inputmode=decimal placeholder="Amount ৳" value="${e._a??(e.a?e.a/100:'')}" autofocus><input id=fd type=date value="${e.d}">
<select id=fc onchange="sync();V.ed.s='';drawForm()">${ex?cs.map(c=>`<option value="${c.id}" ${c.id==e.c?'selected':''}>${c.icon} ${esc(c.name)}</option>`).join(''):S.inc.map(c=>`<option ${c==e.c?'selected':''}>${esc(c)}</option>`).join('')}</select>
${ex?`<select id=fs><option value="">Subcategory (optional)</option>${sc.map(s=>`<option ${s==e.s?'selected':''}>${esc(s)}</option>`).join('')}</select>`:''}
<select id=fp>${[...new Set([...S.pay,e.p])].map(p=>`<option ${p==e.p?'selected':''}>${esc(p)}</option>`).join('')}</select>
<input id=fdesc placeholder="Description" value="${esc(e.desc)}"><input id=fn placeholder="Notes (optional)" value="${esc(e.n)}">
<div class=btns><button class=ghost onclick=closeS()>Cancel</button><button class=pri onclick=saveF()>Save</button></div>`)}
function saveF(){sync();const e=V.ed,a=toP(e._a??'');if(!(a>0)){toast('Enter an amount like 250 or 99.50');return}if(!e.d){toast('Pick a date');return}
const o={id:e.id||Date.now().toString(36)+Math.random().toString(36).slice(2,5),k:e.k,a,d:e.d,c:e.c,s:e.k=='e'?e.s||'':'',p:e.p,desc:e.desc||'',n:e.n||''};
const i=S.tx.findIndex(x=>x.id==o.id);i>=0?S.tx[i]=o:S.tx.push(o);save();closeS();R();toast('Saved')}
function act(id){const t=S.tx.find(x=>x.id==id),c=ci(t);sheet(`<h3>${c.icon} ${esc(t.desc||c.name)}</h3><div class=big>${t.k=='i'?'+':'-'}${fmt(t.a)}</div><p class=mu style="margin:0">${dl(t.d)}<br>${esc(c.name)}${t.s?' · '+esc(t.s):''} · ${esc(t.p)}${t.n?'<br>'+esc(t.n):''}</p><div class=btns><button onclick="openForm('${id}')">Edit</button><button onclick="dup('${id}')">Duplicate</button><button class=rd onclick="del('${id}',this)">Delete</button></div><button class=ghost onclick=closeS()>Close</button>`)}
function dup(id){const t=S.tx.find(x=>x.id==id);S.tx.push({...t,id:Date.now().toString(36)+'d',d:TODAY()});save();closeS();R();toast('Duplicated to today')}
function del(id,b){if(!b.dataset.s){b.dataset.s=1;b.textContent='Tap again to delete';return}S.tx=S.tx.filter(x=>x.id!=id);save();closeS();R();toast('Deleted')}
function setB(k,v){const p=v.trim()?toP(v):0;if(isNaN(p)){toast('Enter a number');return}k=='t'?S.bud.t=p:S.bud.c[k]=p;save();R()}
const tg=i=>{S.cats[i].on=!S.cats[i].on;save();R()},mv=i=>{if(i>0){[S.cats[i-1],S.cats[i]]=[S.cats[i],S.cats[i-1]];save();R()}};
function addC(){const n=$('#nc').value.trim();if(!n)return;S.cats.push({id:'c'+Date.now().toString(36),name:n,icon:$('#ni').value||'🏷️',color:'#'+Math.floor(Math.random()*0x888888+0x444444).toString(16),on:true,subs:['Other']});save();R()}
function addS(){const n=$('#ns').value.trim(),c=S.cats.find(x=>x.id==$('#sc').value);if(n&&c){c.subs.push(n);save();R();toast('Subcategory added')}}
function addP(){const n=$('#np').value.trim();if(n&&!S.pay.includes(n)){S.pay.push(n);save();R()}}
function csv(){const sc=$('#xs').value,y=nd.getFullYear();let L=S.tx;if(sc=='m')L=mt(y,nd.getMonth());if(sc=='y')L=L.filter(t=>t.d.startsWith(y+'-'));const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';return'Date,Type,Amount,Category,Subcategory,Payment,Description,Notes\n'+L.slice().sort((a,b)=>a.d<b.d?-1:1).map(t=>[t.d,t.k=='e'?'Expense':'Income',(t.a/100).toFixed(2),ci(t).name,t.s,t.p,t.desc,t.n].map(q).join(',')).join('\n')}
function showIO(txt,l){$('#io').innerHTML=`<p class=mu>${l}</p><textarea id=iot readonly></textarea><button onclick="cp()">Copy</button>`;$('#iot').value=txt}
function cp(){const t=$('#iot');t.select();try{navigator.clipboard.writeText(t.value).then(()=>toast('Copied'),()=>{document.execCommand('copy');toast('Copied')})}catch(e){document.execCommand('copy');toast('Copied')}}
function chk(){try{const o=JSON.parse($('#rs').value),d=o.data;if(o.app!='tj'||!Array.isArray(d.tx)||!Array.isArray(d.cats)||!Array.isArray(d.inc)||!Array.isArray(d.pay)||!d.bud||d.tx.some(t=>!t.id||!Number.isInteger(t.a)||!/^\d{4}-\d\d-\d\d$/.test(t.d)))throw 0;V.rs=d;$('#rm').innerHTML=`Valid backup: ${d.tx.length} transactions, ${d.cats.length} categories. This will replace the data on this device.<br><button class=pri onclick="doRs()">Replace my current data</button>`}catch(e){$('#rm').textContent='This is not a valid backup. Nothing was changed.'}}
function doRs(){S=V.rs;save();R();toast('Backup restored')}
S=load();R();

function dlFile(n,t){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/plain;charset=utf-8'}));a.download=n;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);toast('Saved '+n)}
function rf(i){const f=i.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{$('#rs').value=r.result;chk()};r.readAsText(f)}
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}

function addI(){const n=$('#nin').value.trim();if(n&&!S.inc.includes(n)){S.inc.push(n);save();R()}}
function editCat(i){const c=S.cats[i];sheet(`<h3>Edit category</h3><input id=en value="${esc(c.name)}"><div class=r><input id=ei style="width:80px" value="${esc(c.icon)}" maxlength=2><input id=ek type=color style="width:70px" value="${c.color}"></div><h3>Subcategories</h3>${c.subs.map((s,j)=>`<div class=r><input value="${esc(s)}" onchange="renSub(${i},${j},this.value)"><button class="ib ghost" onclick="delSub(${i},${j})">✕</button></div>`).join('')||'<small>None yet</small>'}<div class=r><input id=es placeholder="New subcategory"><button class=pri onclick="addSub(${i})">Add</button></div><div class=btns><button class=rd onclick="delCat(${i},this)">Delete category</button><button class=pri onclick="saveCat(${i})">Save</button></div>`)}
function keep(i){const c=S.cats[i],n=$('#en').value.trim();if(n)c.name=n;c.icon=$('#ei').value||c.icon;c.color=$('#ek').value}
function saveCat(i){keep(i);save();closeS();R();toast('Saved')}
function addSub(i){keep(i);const n=$('#es').value.trim(),c=S.cats[i];if(n&&!c.subs.includes(n))c.subs.push(n);save();editCat(i);R()}
function renSub(i,j,v){const c=S.cats[i],n=v.trim(),o=c.subs[j];if(!n||(n!=o&&c.subs.includes(n))){toast('Invalid name');editCat(i);return}S.tx.forEach(t=>{if(t.c==c.id&&t.s==o)t.s=n});c.subs[j]=n;save()}
function delSub(i,j){keep(i);S.cats[i].subs.splice(j,1);save();editCat(i);R()}
function delCat(i,b){if(!b.dataset.s){b.dataset.s=1;b.textContent='Tap again to delete';return}const c=S.cats[i];delete S.bud.c[c.id];if(S.tx.some(t=>t.k=='e'&&t.c==c.id)){c.arch=true;c.on=false;toast('Has past transactions, so it was archived. History is safe.')}else{S.cats.splice(i,1);toast('Category deleted')}save();closeS();R()}

function bulk(date){const c=(S.cats.find(c=>c.on)||S.cats[0]).id;V.bk={d:date||TODAY(),rows:[{c,s:'',a:'',desc:'',p:S.pay[0]}]};drawBulk()}
function bsync(){const b=V.bk;if(!$('#bd'))return;b.d=$('#bd').value||b.d;b.rows.forEach((r,i)=>{r.c=$('#bc'+i).value;r.s=$('#bs'+i).value;r.a=$('#ba'+i).value;r.desc=$('#bn'+i).value;r.p=$('#bp'+i).value})}
function badd(){bsync();const l=V.bk.rows[V.bk.rows.length-1];V.bk.rows.push({c:l.c,s:'',a:'',desc:'',p:l.p});drawBulk(true)}
function bdel(i){bsync();V.bk.rows.splice(i,1);drawBulk()}
function bcat(i){bsync();V.bk.rows[i].s='';drawBulk()}
function btot(){const b=V.bk;let t=0;b.rows.forEach((_,i)=>{const p=toP($('#ba'+i).value);if(p>0)t+=p});$('#bt').textContent=fmt(t)}
function drawBulk(foc){const b=V.bk,o=$('#ov .sh'),st=o?o.scrollTop:0;
sheet(`<h3>Add many expenses</h3><input id=bd type=date value="${b.d}">${b.rows.map((r,i)=>{const cs=S.cats.filter(c=>c.on||c.id==r.c),sc=cat(r.c).subs||[];return`<div class=cd style="background:var(--bg);margin:0"><div class=r><b>#${i+1}</b>${b.rows.length>1?`<button class="ib ghost" onclick="bdel(${i})">✕</button>`:''}</div><div class=ctl><select id=bc${i} onchange="bcat(${i})">${cs.map(c=>`<option value="${c.id}" ${c.id==r.c?'selected':''}>${c.icon} ${esc(c.name)}</option>`).join('')}</select><select id=bs${i}><option value="">Subcategory</option>${sc.map(s=>`<option ${s==r.s?'selected':''}>${esc(s)}</option>`).join('')}</select></div><div class=ctl><input id=ba${i} inputmode=decimal placeholder="Amount ৳" value="${esc(r.a)}" oninput="btot()"><input id=bn${i} placeholder="Description" value="${esc(r.desc)}" onkeydown="if(event.key=='Enter'&&${i}==V.bk.rows.length-1)badd()"></div><select id=bp${i}>${[...new Set([...S.pay,r.p])].map(p=>`<option ${p==r.p?'selected':''}>${esc(p)}</option>`).join('')}</select></div>`}).join('')}<button class=big-btn onclick="badd()">+ Add another expense</button><div class=r><b>Total</b><b id=bt></b></div><div class=btns><button class=ghost onclick=closeS()>Cancel</button><button class=pri onclick=bsave()>Save all</button></div>`);
const n=$('#ov .sh');if(o){n.style.animation='none';n.scrollTop=st}btot();if(foc){const a=$('#ba'+(b.rows.length-1));a&&a.focus()}}
function bsave(){bsync();const b=V.bk,out=[];if(!b.d){toast('Pick a date');return}
for(let i=0;i<b.rows.length;i++){const r=b.rows[i];if(!r.a.trim()&&!r.desc.trim())continue;const a=toP(r.a);if(!(a>0)){toast('#'+(i+1)+': enter an amount like 250 or 99.50');return}out.push({id:Date.now().toString(36)+i+Math.random().toString(36).slice(2,5),k:'e',a,d:b.d,c:r.c,s:r.s||'',p:r.p,desc:r.desc.trim(),n:''})}
if(!out.length){toast('Enter at least one amount');return}S.tx.push(...out);save();closeS();R();toast(out.length+' expenses saved')}

/* ===== Reports v2: filters, sorting, content options, smart PDF pages ===== */
V.rp={t:'m',from:'',to:'',k:'',c:'',s:'',p:'',min:0,max:0,q:'',sort:'new',ct:'full'};
const SORTS=[['new','Newest first'],['old','Oldest first'],['hi','Highest amount'],['lo','Lowest amount'],['cat','Category A-Z']];
const so=(a,cur)=>a.map(([v,l])=>`<option value="${esc(v)}" ${cur==v?'selected':''}>${esc(l)}</option>`).join('');
const rpN=()=>{const r=V.rp;return[r.k,r.c,r.s,r.p,r.min,r.max,r.q.trim()].filter(Boolean).length};
function repL(){const r=V.rp,y=V.y;let L,n;
if(r.t=='m'){L=mt(y,V.m);n=MN[V.m]+' '+y}else if(r.t=='y'){L=S.tx.filter(t=>t.d.startsWith(y+'-'));n='Year '+y}else if(r.t=='r'){L=S.tx.filter(t=>(!r.from||t.d>=r.from)&&(!r.to||t.d<=r.to));n=(r.from||'Start')+' to '+(r.to||'today')}else{L=S.tx;n='All data'}
const q=r.q.trim().toLowerCase();
L=L.filter(t=>(!r.k||t.k==r.k)&&(!r.c||t.c==r.c)&&(!r.s||t.s==r.s)&&(!r.p||t.p==r.p)&&(!r.min||t.a>=r.min)&&(!r.max||t.a<=r.max)&&(!q||(t.desc+' '+(t.n||'')+' '+ci(t).name+' '+(t.s||'')).toLowerCase().includes(q)));
const cmp={new:(a,b)=>a.d<b.d?1:a.d>b.d?-1:0,old:(a,b)=>a.d<b.d?-1:a.d>b.d?1:0,hi:(a,b)=>b.a-a.a,lo:(a,b)=>a.a-b.a,cat:(a,b)=>ci(a).name.localeCompare(ci(b).name)||(a.d<b.d?-1:1)}[r.sort]||(()=>0);
return{L:L.slice().sort(cmp),n}}
function fdesc(){const r=V.rp,a=[];if(r.k)a.push(r.k=='e'?'Expenses only':'Income only');if(r.c)a.push('Category: '+((S.cats.find(c=>c.id==r.c)||{}).name||r.c));if(r.s)a.push('Sub: '+r.s);if(r.p)a.push('Payment: '+r.p);if(r.min)a.push('Min '+fmt(r.min));if(r.max)a.push('Max '+fmt(r.max));if(r.q.trim())a.push('Search: "'+r.q.trim()+'"');a.push('Sorted: '+(SORTS.find(x=>x[0]==r.sort)||SORTS[0])[1]);return a.map(esc).join(' · ')}
const repHdr=(n,fd)=>`<h2 style="margin:0">Taka Journal Report</h2><p class=mu style="margin:2px 0 2px">${esc(n)} · created ${dl(TODAY())}</p><p class=mu style="margin:0 0 8px;font-size:12px">${fd}</p>`;
const trH=()=>`<div class=trh><span class=d>Date</span><span class=g>Description · Category</span><span class=p>Payment</span><span class=a>Amount</span></div>`;
const trR=t=>`<div class=trw><span class=d>${t.d}</span><span class=g>${esc(t.desc||'')} <small>${esc(ci(t).name)}${t.s?' · '+esc(t.s):''}</small></span><span class=p>${esc(t.p)}</span><span class="a ${t.k=='i'?'gn':''}">${t.k=='i'?'+':'-'}${fmt(t.a)}</span></div>`;
const txTbl=L=>`<h3>Transactions (${L.length})</h3>`+trH()+L.map(trR).join('');
const txTot=L=>`<div class=r style="margin:6px 0 2px"><span>${L.length} transactions</span><b>Expense ${fmt(sm(L,'e'))} · Income ${fmt(sm(L,'i'))}</b></div>`;
const bars=(rows,tot)=>rows.length?rows.map(([l,v,c])=>`<div class=cb><div class=r><span>${l}</span><b>${fmt(v)}</b></div><div class=bar><i style="width:${tot?v/tot*100:0}%;background:${c}"></i></div></div>`).join(''):'<p class=mu>None</p>';
function catChart(L){let b=bycat(L);const tot=b.reduce((s,x)=>s+x[1],0),bud=V.rp.t=='m'&&!rpN();if(!b.length)return'<p class=mu>No expenses</p>';let o=0;if(b.length>10){o=b.slice(9).reduce((s,x)=>s+x[1],0);b=b.slice(0,9)}
return b.map(([id,a])=>{const c=cat(id),bg=bud?S.bud.c[id]:0,w=bg?Math.min(100,a/bg*100):a/tot*100;return`<div class=cb><div class=r><span>${c.icon} ${esc(c.name)} <small>${Math.round(a/tot*100)}%</small></span><b>${fmt(a)}${bg?' / '+fmt(bg):''}</b></div><div class=bar><i style="width:${w}%;background:${bg&&a>bg?'var(--rd)':c.color}"></i></div></div>`}).join('')+(o?`<div class=cb><div class=r><span>Others <small>${Math.round(o/tot*100)}%</small></span><b>${fmt(o)}</b></div><div class=bar><i style="width:${o/tot*100}%;background:#94a3b8"></i></div></div>`:'')}
function trend(L){const r=V.rp,ex=L.filter(t=>t.k=='e');let keys=[],len=10;
if(r.t=='m'){const n=new Date(V.y,V.m+1,0).getDate();keys=[...Array(n)].map((_,i)=>pm(V.y,V.m)+'-'+String(i+1).padStart(2,'0'))}
else if(r.t=='y'){len=7;keys=[...Array(12)].map((_,m)=>pm(V.y,m))}
else{const ds=L.map(t=>t.d).sort();if(!ds.length)return'<p class=mu>No data</p>';const a=(r.t=='r'&&r.from)||ds[0],b=(r.t=='r'&&r.to)||ds[ds.length-1],A=new Date(a+'T00:00'),B=new Date(b+'T00:00');len=(B-A)/864e5>62?7:10;const c=new Date(A);if(len==7)c.setDate(1);while(c<=B&&keys.length<400){keys.push(iso(c).slice(0,len));len==7?c.setMonth(c.getMonth()+1):c.setDate(c.getDate()+1)}}
const v=keys.map(k=>ex.filter(t=>t.d.startsWith(k)).reduce((s,t)=>s+t.a,0)),mx=Math.max(1,...v),st=Math.ceil(keys.length/12);
return`<div class=trd>${v.map((x,i)=>`<div class=tc><i style="height:${x/mx*100}%"></i><small>${i%st?'':len==7?MN[+keys[i].slice(5,7)-1].slice(0,3):keys[i].slice(8)}</small></div>`).join('')}</div>`}
function repSum(L){const r=V.rp,e=sm(L,'e'),i=sm(L,'i'),ex=L.filter(t=>t.k=='e'),days=new Set(ex.map(t=>t.d)).size,mxE=ex.reduce((m,t)=>Math.max(m,t.a),0),clean=!rpN(),ins=r.t=='m'&&clean?insights(V.y,V.m):[],b=budT(),m=Math.max(e,i,1);
const pay=Object.entries(ex.reduce((o,t)=>(o[t.p]=(o[t.p]||0)+t.a,o),{})).sort((a,b)=>b[1]-a[1]).map(([p,v])=>[esc(p),v,'var(--ac)']);
return`<div class=grid>${st('Expense',fmt(e))}${st('Income',fmt(i),'gn')}${st('Net balance',fmt(i-e),i-e<0?'rd':'')}${st('Transactions',L.length)}${st('Avg per spending day',fmt(days?Math.round(e/days):0))}${st('Largest expense',fmt(mxE))}</div>
${r.t=='m'&&clean&&b?`<div class=cb style="margin-top:10px"><div class=r><span>Monthly budget</span><b>${fmt(e)} / ${fmt(b)} (${Math.round(e/b*100)}%)</b></div><div class=bar><i style="width:${Math.min(100,e/b*100)}%;background:${e>b?'var(--rd)':'var(--ac)'}"></i></div></div>`:''}
${ins.length?`<h3>Insights</h3>${ins.map(x=>`<div style="font-size:13px">${x}</div>`).join('')}`:''}
<h3>Spending trend</h3>${trend(L)}
<div class=two><div><h3>By category</h3>${catChart(L)}</div><div><h3>Income vs expense</h3>${bars([['Income',i,'var(--gn)'],['Expense',e,'var(--rd)']],m)}<h3>By payment method</h3>${bars(pay,e)}</div></div>`}
function repView(){const r=V.rp,{L,n}=repL(),ct=r.ct;return repHdr(n,fdesc())+(ct=='tx'?txTot(L):repSum(L))+(ct!='sum'?txTbl(L.slice(0,300))+(L.length>300?'<p class=mu>Showing the first 300 here. The download has all of them.</p>':''):'')}
function repUpd(){$('#report').innerHTML=repView();$('#rpn').textContent=rpN()?rpN()+' active':''}
VW.rep=()=>{const r=V.rp,sub=S.cats.find(c=>c.id==r.c);
return`<h2>Reports</h2><div class=ctl><select onchange="V.rp.t=this.value;R()">${so([['m','Month'],['y','Year'],['r','Custom range'],['a','All data']],r.t)}</select>${r.t=='m'||r.t=='y'?ysel():''}${r.t=='m'?`<select onchange="V.m=+this.value;R()">${MN.map((x,k)=>`<option value=${k} ${k==V.m?'selected':''}>${x}</option>`).join('')}</select>`:''}</div>
${r.t=='r'?`<div class=ctl><input type=date value="${r.from}" onchange="V.rp.from=this.value;R()"><input type=date value="${r.to}" onchange="V.rp.to=this.value;R()"></div>`:''}
<details class=cd ${V.rpo?'open':''} ontoggle="V.rpo=this.open"><summary><b>Filters &amp; sort</b> <small id=rpn>${rpN()?rpN()+' active':''}</small></summary><div style="display:grid;gap:8px;margin-top:10px">
<input placeholder="Search description or notes" value="${esc(r.q)}" oninput="V.rp.q=this.value;repUpd()">
<div class=ctl><select onchange="V.rp.k=this.value;R()">${so([['','All types'],['e','Expenses'],['i','Income']],r.k)}</select><select onchange="V.rp.c=this.value;V.rp.s='';R()"><option value="">All categories</option>${S.cats.map(c=>`<option value="${c.id}" ${r.c==c.id?'selected':''}>${c.icon} ${esc(c.name)}${c.arch?' (archived)':''}</option>`).join('')}${S.inc.map(c=>`<option value="${esc(c)}" ${r.c==c?'selected':''}>💰 ${esc(c)}</option>`).join('')}</select></div>
${sub?`<select onchange="V.rp.s=this.value;R()"><option value="">All subcategories</option>${sub.subs.map(s=>`<option ${r.s==s?'selected':''}>${esc(s)}</option>`).join('')}</select>`:''}
<div class=ctl><select onchange="V.rp.p=this.value;R()"><option value="">All payment methods</option>${S.pay.map(p=>`<option ${r.p==p?'selected':''}>${esc(p)}</option>`).join('')}</select><select onchange="V.rp.sort=this.value;R()">${so(SORTS,r.sort)}</select></div>
<div class=ctl><input inputmode=decimal placeholder="Min ৳" value="${r.min?r.min/100:''}" onchange="V.rp.min=toP(this.value)||0;R()"><input inputmode=decimal placeholder="Max ৳" value="${r.max?r.max/100:''}" onchange="V.rp.max=toP(this.value)||0;R()"></div>
<button class=ghost onclick="Object.assign(V.rp,{k:'',c:'',s:'',p:'',min:0,max:0,q:''});R()">Clear filters</button></div></details>
<div class=cd><div class=ctl><select onchange="V.rp.ct=this.value;R()">${so([['full','Download: Full report'],['sum','Download: Summary only'],['tx','Download: Transactions only']],r.ct)}</select></div><small>Use the JPG and PDF buttons at the bottom right to download exactly this report. PDF: a short report fits on one page; a long one gets a summary page with the top transactions, then all transactions. JPG: summary and charts (transactions only when 25 or fewer).</small></div>
<div id=rpw><div id=report class="cd rp">${repView()}</div></div>`};
async function dlRep(f){
if(!window.html2canvas||(f=='pdf'&&!(window.jspdf&&window.jspdf.jsPDF))){toast('Report tools missing (lib folder)');return}
const r=V.rp,{L,n}=repL(),ct=r.ct,nm='taka-report-'+TODAY(),hdr=repHdr(n,fdesc()),host=document.createElement('div');document.body.appendChild(host);
const mk=(inner,i,N)=>{const e=document.createElement('div');e.className='pg rp';e.innerHTML='<div class=pb>'+inner+'</div>'+(N?`<div class=ft><span>Taka Journal · ${esc(n)}</span><span>Page ${i} of ${N}</span></div>`:'');host.appendChild(e);return e};
const head=ct=='tx'?hdr+txTot(L):hdr+repSum(L);
try{toast('Preparing…');await new Promise(z=>setTimeout(z,30));
if(f=='jpg'){let note='',inner=head;
if(ct=='tx'){if(L.length>40){toast('Too many transactions for JPG. Please use PDF.');return}inner+=txTbl(L)}
else if(ct=='full'&&L.length){if(L.length<=25)inner+=txTbl(L);else note=' (summary and charts only)'}
const e=mk(inner);e.classList.add('j');const c=await html2canvas(e,{scale:2,backgroundColor:'#ffffff'}),a=document.createElement('a');a.href=c.toDataURL('image/jpeg',.92);a.download=nm+'.jpg';document.body.appendChild(a);a.click();a.remove();toast('Saved '+nm+'.jpg'+note);return}
const FH=1035,RH=25,H3=38,m=mk(head),hh=m.firstChild.offsetHeight;m.remove();
const A=L.length,th=trH();let pages=[];
if(ct=='sum'||!A){pages=[head+(ct=='sum'?'':'<p class=mu>No transactions found.</p>')]}
else if(hh+A*RH+RH+H3<=FH){pages=[head+txTbl(L)]}
else{let i=0,fst=false;
if(ct=='full'){const k=Math.min(15,Math.floor((FH-hh-H3-RH)/RH));pages.push(head+(k>=3?'<h3>Top transactions (largest)</h3>'+th+L.slice().sort((a,b)=>b.a-a.a).slice(0,k).map(trR).join(''):''));fst=true}
else{const k=Math.max(0,Math.floor((FH-hh-H3-RH)/RH));pages.push(head+`<h3>Transactions (${A})</h3>`+th+L.slice(0,k).map(trR).join(''));i=k}
while(i<A){const c=fst?Math.floor((FH-H3-RH)/RH):Math.floor((FH-RH)/RH);pages.push((fst?`<h3>All transactions (${A})</h3>`:'')+th+L.slice(i,i+c).map(trR).join(''));i+=c;fst=false}}
const N=pages.length,sc=N>8?1.5:2,doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'});
for(let i=0;i<N;i++){toast('Page '+(i+1)+' of '+N+'…');await new Promise(z=>setTimeout(z,0));const e=mk(pages[i],i+1,N),need=e.firstChild.offsetHeight+88;if(need>1123)e.style.height=need+'px';const ph=e.offsetHeight||1123,c=await html2canvas(e,{scale:sc,backgroundColor:'#ffffff'});e.remove();
let w=210,h=210*ph/794;if(h>297){h=297;w=297*794/ph}if(i)doc.addPage();doc.addImage(c.toDataURL('image/jpeg',.9),'JPEG',(210-w)/2,0,w,h)}
doc.save(nm+'.pdf');toast('Saved '+nm+'.pdf ('+N+(N>1?' pages)':' page)'))
}catch(err){console.error(err);toast('Could not create the file')}finally{host.remove()}}

function bsum(){return S.cats.filter(c=>c.on&&!c.arch).reduce((s,c)=>s+(S.bud.c[c.id]||0),0)}
function budT(){return bsum()||S.bud.t}
const dlAny=f=>V.tab=='rep'?dlRep(f):V.tab=='more'?0:dlPage(f);
async function dlPage(f){
if(!window.html2canvas||(f=='pdf'&&!(window.jspdf&&window.jspdf.jsPDF))){toast('Download tools missing (lib folder)');return}
const el=$('#app'),W=el.offsetWidth,H=el.offsetHeight,bg=getComputedStyle(document.body).backgroundColor,ttl={home:'home',month:'month-'+pm(V.y,V.m),year:'year-'+V.y,tx:'transactions'}[V.tab]||V.tab,nm='taka-'+ttl+'-'+TODAY(),sc=Math.min(2,14000/H,Math.sqrt(16e6/(W*H)));
if(sc<0.9){toast('This page is too long for one picture. Use the Reports page for a full PDF.');return}
try{toast('Preparing…');await new Promise(z=>setTimeout(z,30));
const c=await html2canvas(el,{scale:sc,backgroundColor:bg});
if(f=='jpg'){const a=document.createElement('a');a.href=c.toDataURL('image/jpeg',.92);a.download=nm+'.jpg';document.body.appendChild(a);a.click();a.remove();toast('Saved '+nm+'.jpg');return}
const top=el.getBoundingClientRect().top,br=[...el.querySelectorAll(':scope>*,.tx,h4,.cb')].map(x=>x.getBoundingClientRect().bottom-top).filter(v=>v>0&&v<=H).sort((a,b)=>a-b),ph=277*W/190,pg=[];
let y=0;while(y<H-1){let e=Math.min(H,y+ph);if(e<H){const k=br.filter(v=>v>y+ph*.5&&v<=y+ph);if(k.length)e=k[k.length-1]}pg.push([y,e]);y=e}
const doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'});
pg.forEach(([a,b],i)=>{const s=document.createElement('canvas'),sy=Math.round(a*sc);s.width=c.width;s.height=Math.max(1,Math.min(c.height-sy,Math.round((b-a)*sc)));const x=s.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,s.width,s.height);x.drawImage(c,0,sy,c.width,s.height,0,0,c.width,s.height);
if(i)doc.addPage();doc.addImage(s.toDataURL('image/jpeg',.9),'JPEG',10,10,190,s.height/sc*190/W);doc.setFontSize(8);doc.setTextColor(120);doc.text('Taka Journal - '+ttl+' - '+TODAY(),10,292);doc.text('Page '+(i+1)+' of '+pg.length,200,292,{align:'right'})});
doc.save(nm+'.pdf');toast('Saved '+nm+'.pdf')}catch(err){console.error(err);toast('Could not create the file')}}
