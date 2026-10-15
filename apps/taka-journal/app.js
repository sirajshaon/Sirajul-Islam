
const DEFS="Food|🍽️|#e76f51|Breakfast,Lunch,Dinner,Snacks,Restaurant,Fast Food,Groceries,Tea/Coffee,Other;Clothing|👕|#9b5de5|Shirt,T-Shirt,Panjabi,Pants,Undergarments,Shoes,Sandals,Jacket,Accessories,Other;Personal Care|🧴|#f15bb5|Cosmetics,Skincare,Haircut,Shaving,Perfume,Toiletries,Other;Transport|🚌|#00a6fb|Bus,CNG,Rickshaw,Train,Ride Sharing,Fuel,Maintenance,Parking,Other;Housing|🏠|#8d6e63|Rent,Maintenance,Furniture,Household Items,Cleaning,Other;Utilities|💡|#f4a261|Electricity,Gas,Water,Internet,Mobile Recharge,Other;Medical|💊|#e63946|Doctor,Medicine,Test,Dental,Other;Education|📚|#3a86ff|Books,Course,Training,Tuition,Other;Donation|🤲|#2a9d8f|Charity,Zakat,Mosque,Other;Investment|📈|#06d6a0|Savings,Stocks,Business,Fixed Deposit,Other;Debt / Loan|🤝|#6d6875|Loan Given,Loan Repayment,Borrowed Money,Other;Subscription|🔁|#7209b7|Internet,Software,Streaming,Cloud Storage,Other;Social|🎁|#ff7f50|Gift,Invitation,Friends,Family,Other;Miscellaneous|📦|#64748b|Other";
const $=s=>document.querySelector(s),nd=new Date(),KEY='tj1',MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
let S,V={tab:'home',y:nd.getFullYear(),m:nd.getMonth(),sel:null,f:{q:'',k:'',c:'',p:'',mo:'',s:'new',min:0,max:0},ed:null,rs:null};
function def(){return{tx:[],cats:DEFS.split(';').map((s,i)=>{const[a,b,c,d]=s.split('|');return{id:'c'+i,name:a,icon:b,color:c,on:true,subs:d.split(',')}}),inc:['Salary','Freelance','Business','Gift','Interest','Other'],pay:['Cash','Bank','bKash','Nagad','Card','Other'],bud:{t:0,c:{}},theme:'system',ac:'#0f766e',bz:1}}
function load(){try{const j=localStorage.getItem(KEY);if(j)return JSON.parse(j)}catch(e){}return def()}
function save(raw){if(!raw)stamp();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}if(!raw){SY.dirty=true;schedSync()}}
const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10),TODAY=()=>iso(new Date());
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=p=>(p<0?'-':'')+'৳'+(Math.abs(p)/100).toLocaleString('en-IN',{minimumFractionDigits:p%100?2:0,maximumFractionDigits:2});
const toP=s=>{s=String(s).replace(/[০-৯]/g,d=>'০১২৩৪৫৬৭৮৯'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[,،৳\s]/g,'');if(!s||!/^\d*\.?\d{0,2}$/.test(s)||s=='.')return NaN;const[a,b='']=s.split('.');return(+a||0)*100+(+b.padEnd(2,'0')||0)};
const pm=(y,m)=>y+'-'+String(m+1).padStart(2,'0'),mt=(y,m)=>S.tx.filter(t=>t.d.startsWith(pm(y,m))),sm=(L,k)=>L.filter(t=>t.k==k).reduce((a,t)=>a+t.a,0);
const cat=id=>S.cats.find(c=>c.id==id)||{name:'Removed category',icon:'❓',color:'#888'},ci=t=>t.k=='i'?{name:t.c,icon:'💰',color:'#168a4a'}:cat(t.c);
const dl=d=>new Date(d+'T00:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
const bycat=L=>{const o={};L.filter(t=>t.k=='e').forEach(t=>o[t.c]=(o[t.c]||0)+t.a);return Object.entries(o).sort((a,b)=>b[1]-a[1])};
const catBars=L=>{const b=bycat(L),tot=b.reduce((a,x)=>a+x[1],0);return b.length?b.map(([id,a])=>{const c=cat(id),bg=S.bud.c[id]==null?null:S.bud.c[id],w=bg!=null?(bg?Math.min(100,a/bg*100):100):a/tot*100;return`<div class=cb><div class=r><span>${c.icon} ${esc(c.name)}</span><b>${fmt(a)}${bg!=null?' / '+fmt(bg)+(bg?' ('+Math.round(a/bg*100)+'%)':''):''}</b></div><div class=bar><i style="width:${w}%;background:${bg!=null&&a>bg?'var(--rd)':c.color}"></i></div></div>`}).join(''):'<p class=em>No spending yet. Tap + to add your first expense.</p>'};
const row=t=>{const c=ci(t);return`<div class=tx onclick="act('${t.id}')"><span class=ic style="background:${c.color}25">${c.icon}</span><div class=g><b>${esc(t.desc||c.name)}${t.r?' 📎':''}</b><small>${esc(c.name)}${t.s?' · '+esc(t.s):''} · ${esc(t.p)}</small></div><b class="${t.k=='i'?'gn':''}">${t.k=='i'?'+':'-'}${fmt(t.a)}</b></div>`};
const grouped=L=>{const o={};L.forEach(t=>(o[t.d]=o[t.d]||[]).push(t));return Object.keys(o).sort().reverse().map(d=>`<h4>${dl(d)}<span>${fmt(sm(o[d],'e'))}</span></h4>`+o[d].map(row).join('')).join('')||'<p class=em>No transactions found.</p>'};
const st=(l,v,c='')=>`<div class=cd><small>${l}</small><b class="${c}">${v}</b></div>`;
function insights(y,m){const p=m?[y,m-1]:[y-1,11],a=Object.fromEntries(bycat(mt(y,m))),b=Object.fromEntries(bycat(mt(...p))),r=[];for(const id in a)if(b[id]>0){const x=Math.round((a[id]-b[id])/b[id]*100);if(Math.abs(x)>=10)r.push(`You spent ${Math.abs(x)}% ${x>0?'more':'less'} on ${cat(id).name} than last month.`)}return r.slice(0,3)}
const yrs=()=>{const a=Math.min(2025,...S.tx.map(t=>+t.d.slice(0,4))),b=nd.getFullYear()+2;return[...Array(b-a+1)].map((_,i)=>a+i)};
const ysel=()=>`<select onchange="V.y=+this.value;V.sel=null;R()">${yrs().map(y=>`<option ${y==V.y?'selected':''}>${y}</option>`).join('')}</select>`;
const VW={
home(){const y=nd.getFullYear(),m=nd.getMonth(),L=mt(y,m),e=sm(L,'e'),i=sm(L,'i'),b=budT(),yr=S.tx.filter(t=>t.k=='e'&&t.d.startsWith(y+'-')).reduce((a,t)=>a+t.a,0),n=new Date(y,m+1,0).getDate(),dd=Array(n).fill(0);L.filter(t=>t.k=='e').forEach(t=>dd[+t.d.slice(8)-1]+=t.a);const mx=Math.max(1,...dd),ins=insights(y,m);
return`${hero()}<h2>${MN[m]} ${y}</h2>
<div class=cd><small>Spent this month</small><div class=big data-cnt="${e}">${fmt(e)}</div>${b?`<div class=bar style="margin:8px 0"><i style="width:${Math.min(100,e/b*100)}%;background:${e>b?'var(--rd)':'var(--ac)'}"></i></div><div class=r><small>Budget ${fmt(b)}</small><small class="${b-e<0?'rd':''}">${b-e<0?'Over by '+fmt(e-b):fmt(b-e)+' left'}</small></div>`:'<small>Set a monthly budget in More</small>'}</div>
<div class=grid>${st('Income',fmt(i),'gn')}${st('Remaining (income − expense)',fmt(i-e),i-e<0?'rd':'')}${st('Monthly budget',b?fmt(b):'Not set')}${st('Spent this year',fmt(yr))}</div>
<div class=btns style="margin:12px 0"><button class="pri big-btn" onclick="openForm()">+ Add expense</button><button class="big-btn" onclick="bulk()">+ Add many</button></div>
${ins.length?`<div class=cd><h3>Insights</h3>${ins.map(x=>`<p style="margin:4px 0">${x}</p>`).join('')}</div>`:''}
<div class=cd><h3>Daily spending</h3><div class=days>${dd.map(v=>`<i style="height:${v/mx*100}%"></i>`).join('')}</div></div>
<div class=cd><h3>Where it went</h3>${catBars(L)}</div><h4>Recent<span></span></h4>${S.tx.slice().sort((a,b)=>a.d<b.d?1:a.d>b.d?-1:b.id<a.id?-1:1).slice(0,6).map(row).join('')||'<p class=em>🧾<br>No entries yet.<br><small>Tap <b>+</b> to add your first one.</small></p>'}`},
month(){const{y,m}=V,L=mt(y,m),e=sm(L,'e'),i=sm(L,'i'),b=budT(),n=new Date(y,m+1,0).getDate(),f=new Date(y,m,1).getDay(),cur=y==nd.getFullYear()&&m==nd.getMonth(),dt={};L.filter(t=>t.k=='e').forEach(t=>dt[t.d]=(dt[t.d]||0)+t.a);
const cells=[...Array(f)].map(()=>'<div></div>').concat([...Array(n)].map((_,k)=>{const d=pm(y,m)+'-'+String(k+1).padStart(2,'0'),a=dt[d];return`<div class="dy${V.sel==d?' on':''}${d==TODAY()?' t':''}" onclick="V.sel='${d}';R()">${k+1}<b>${a?(a>=1e5?(a/1e5).toFixed(1)+'k':Math.round(a/100)):''}</b></div>`}));
const sl=V.sel?L.filter(t=>t.d==V.sel):[];
return`<div class=ctl><button class="ib ghost" onclick="shiftM(-1)" aria-label="Previous month">‹</button>${ysel()}<select onchange="V.m=+this.value;V.sel=null;R()">${MN.map((x,k)=>`<option value=${k} ${k==m?'selected':''}>${x}</option>`).join('')}</select><button class="ib ghost" onclick="shiftM(1)" aria-label="Next month">›</button></div>
<div class=grid>${st('Expense',fmt(e))}${st('Income',fmt(i),'gn')}${st('Net balance',fmt(i-e),i-e<0?'rd':'')}${st('Budget left',b?fmt(b-e):'No budget',b&&b-e<0?'rd':'')}${st('Average per day',fmt(Math.round(e/(cur?nd.getDate():n))))}${st('Transactions',L.length)}</div>
<div class=cd style="margin-top:12px"><div class=cal>${'SMTWTFS'.split('').map(x=>`<small>${x}</small>`).join('')}${cells.join('')}</div></div>
${V.sel?`<h4>${dl(V.sel)}<span>${fmt(dt[V.sel]||0)}</span></h4>${sl.map(row).join('')||'<p class=em>No transactions on this day.</p>'}<div class=btns><button class="pri big-btn" onclick="openForm(null,V.sel)">+ Add expense</button><button class="big-btn" onclick="bulk(V.sel)">+ Add many</button></div>`:'<p class=em>Tap a date to see its transactions.</p>'}
<div class=cd style="margin-top:12px"><h3>Category spending</h3>${catBars(L)}</div>`},
year(){const y=V.y,A=S.tx.filter(t=>t.d.startsWith(y+'-')),ms=[...Array(12)].map((_,m)=>sm(mt(y,m),'e')),e=sm(A,'e'),i=sm(A,'i'),ac=ms.map((v,m)=>[v,m]).filter(x=>x[0]>0),mx=Math.max(1,...ms),hi=ac.length?ac.reduce((a,b)=>b[0]>a[0]?b:a):0,lo=ac.length?ac.reduce((a,b)=>b[0]<a[0]?b:a):0;
return`<div class=ctl>${ysel()}</div><div class=grid>${st('Total expense',fmt(e))}${st('Total income',fmt(i),'gn')}${st('Net balance',fmt(i-e),i-e<0?'rd':'')}${st('Average per month',fmt(ac.length?Math.round(e/ac.length):0))}${st('Highest month',hi?MN[hi[1]]+' · '+fmt(hi[0]):'—')}${st('Lowest month',lo?MN[lo[1]]+' · '+fmt(lo[0]):'—')}</div>
<div class=cd style="margin-top:12px"><div class=cols>${ms.map((v,m)=>`<div class=col onclick="V.m=${m};V.sel=null;V.tab='tx';V.lv='month';R()"><i style="height:${v/mx*100}%"></i><small>${MN[m].slice(0,3)}</small></div>`).join('')}</div></div>
<div class=cd>${ms.map((v,m)=>`<div class=r onclick="V.m=${m};V.sel=null;V.tab='tx';V.lv='month';R()" style="cursor:pointer"><span>${MN[m]}</span><b>${fmt(v)}</b></div>`).join('')}</div>
<div class=cd><h3>Category breakdown</h3>${catBars(A)}</div>`},
tx(){return txBody()},
more(){const q=(c,i)=>`<div class=r><label><input type=checkbox style="width:auto" ${c.on?'checked':''} onchange="tg(${i})"> ${c.icon} ${esc(c.name)}</label><span><button class="ib ghost" onclick="mv(${i})">↑</button><button class="ib ghost" onclick="editCat(${i})">✎</button></span></div>`;
return`<h2>Profile</h2>${profCard()}<div id=acct>${acct()}</div><div class=cd><h3>Appearance</h3><div class=r><span>Theme</span><select onchange="S.theme=this.value;save();R()">${so([['system','System'],['light','Light'],['dark','Dark']],S.theme)}</select></div><div class=r><span>Accent color</span><input type=color value="${S.ac}" onchange="setAc(this.value)"></div><div class=sw>${SWATCH.map(c=>`<span class="swc${String(S.ac).toLowerCase()==c?' on':''}" style="background:${c}" onclick="setAc('${c}')"></span>`).join('')}</div><div class=r><span>Currency</span><b>Taka (৳)</b></div></div>
<div class="cd sec${secCls('cat')}"><h3 onclick="togS('cat',this)">Categories</h3><small>Tap ✎ to edit or delete. Past transactions always stay safe.</small>${S.cats.map((c,i)=>c.arch?'':q(c,i)).join('')}<div class=add><input id=nc placeholder="New category"><input id=ni class=sm2 placeholder="😀" maxlength=2><button class=pri onclick="addC()">Add</button></div><div class=add><select id=sc>${S.cats.filter(c=>!c.arch).map(c=>`<option value=${c.id}>${esc(c.name)}</option>`).join('')}</select><input id=ns placeholder="Subcategory"><button class=pri onclick="addS()">Add</button></div></div>
<div class="cd sec${secCls('inc')}"><h3 onclick="togS('inc',this)">Income categories</h3>${S.inc.map((p,i)=>`<span class=chip>${esc(p)} <a onclick="if(S.inc.length>1){S.inc.splice(${i},1);save();R()}">✕</a></span>`).join('')}<div class=add><input id=nin placeholder="New income category"><button class=pri onclick="addI()">Add</button></div></div>
<div class="cd sec${secCls('pay')}"><h3 onclick="togS('pay',this)">Payment methods</h3>${S.pay.map((p,i)=>`<span class=chip>${esc(p)} <a onclick="if(S.pay.length>1){S.pay.splice(${i},1);save();R()}">✕</a></span>`).join('')}<div class=add><input id=np placeholder="New method"><button class=pri onclick="addP()">Add</button></div></div>
<div class="cd sec${secCls('bk')}"><h3 onclick="togS('bk',this)">Backup, restore and export</h3><small>Your data is saved in this browser on this device. Download a backup file now and then; use it to restore or to move to another device.</small><div class=r style="margin-top:8px"><button onclick="bkp()">Download backup</button><select id=xs><option value=m>This month</option><option value=y>This year</option><option value=a>All data</option></select><button onclick="dlFile('taka-export-'+TODAY()+'.csv','\ufeff'+csv())">Export CSV</button></div><label style="display:flex;gap:6px;align-items:center;margin-top:6px;font-size:13px"><input type=checkbox id=bkr checked style="width:auto"> Include receipt photos (bigger file)</label><div id=io></div><h3 style="margin-top:14px">Restore</h3><input type=file accept=".json,application/json" onchange="rf(this)" style="margin-bottom:6px"><textarea id=rs placeholder="Paste backup text here"></textarea><button style="margin-top:6px" onclick="chk()">Check backup</button><p id=rm class=mu></p></div>
${delCard()}${dangerCard()}<p class=em>Taka Journal · ${AU?'saved in your own account':'private and offline'}</p>`}};
const filtOld=()=>{const f=V.f,q=f.q.toLowerCase();let L=S.tx.filter(t=>(!f.k||t.k==f.k)&&(!f.c||t.c==f.c)&&(!f.p||t.p==f.p)&&(!f.mo||t.d.startsWith(f.mo))&&(!f.min||t.a>=f.min)&&(!f.max||t.a<=f.max)&&(!q||(t.desc+' '+(t.n||'')+' '+ci(t).name+' '+(t.s||'')).toLowerCase().includes(q)));return f.s=='hi'?L.sort((a,b)=>b.a-a.a):f.s=='lo'?L.sort((a,b)=>a.a-b.a):f.s=='old'?L.sort((a,b)=>a.d<b.d?-1:1):L.sort((a,b)=>a.d<b.d?1:-1)};
const dl2=()=>{$('#lst').innerHTML=lst()};
function R(){nd.setTime(Date.now());$('#dlb').style.display=V.tab=='more'?'none':'flex';const r=document.documentElement;S.theme=='system'?r.removeAttribute('data-theme'):r.dataset.theme=S.theme;applyAc(S.ac);if(gate()){document.body.classList.remove('ready');return}document.body.classList.add('ready');{const a=$('#app');a.innerHTML=VW[V.tab]();if(R.last!==V.tab){a.classList.remove('swap');void a.offsetWidth;a.classList.add('swap');R.last=V.tab;if(V.tab=='home')countUp()}}navUpd()}function navUpd(){$('#nav').innerHTML=[['home','🏠','Home'],['tx','🧾','List'],['rep','📄','Reports'],['bud','🎯'+(overN()?`<b class=bdg>${overN()}</b>`:''),'Budget'],['more',avHtml(26,(S.prof||{}).photo,pname()),esc(pname().split(' ')[0])]].map(([k,i,l])=>`<a class="${V.tab==k?'on':''}" onclick="V.tab='${k}';R();scrollTo(0,0)"><span class=ni>${i}</span><em>${l}</em></a>`).join('')}
function toast(t){const e=$('#toast');e.textContent=t;e.style.display='block';clearTimeout(toast.h);toast.h=setTimeout(()=>e.style.display='none',2200)}
function sheet(h){$('#ov').innerHTML=h?`<div class=ov onclick="if(event.target==this)closeS()"><div class=sh>${h}</div></div>`:''}const closeS=()=>{V.bk=null;sheet('')};
function openForm(id,date){const t=id?S.tx.find(x=>x.id==id):null;V.ed=t?{...t}:{k:'e',d:date||TODAY(),c:(S.cats.find(c=>c.on)||S.cats[0]).id,s:'',p:S.pay[0],a:0,desc:'',n:''};drawForm()}
function sync(){const g=i=>$('#'+i)?$('#'+i).value:null,e=V.ed;if(g('fa')!==null){e.d=g('fd')||e.d;e.c=g('fc')||e.c;e.s=g('fs')??e.s;e.p=g('fp')||e.p;e.desc=g('fdesc');e.n=g('fn');e._a=g('fa')}}
function setK(k){sync();V.ed.k=k;V.ed.c=k=='e'?(S.cats.find(c=>c.on)||S.cats[0]).id:S.inc[0];V.ed.s='';drawForm()}
function drawForm(){if(!V.ed.id&&!V.ed._fv){V.ed._fv=1;V.fv=favs()}const e=V.ed,ex=e.k=='e',cs=ex?S.cats.filter(c=>c.on||c.id==e.c):[],sc=ex?cat(e.c).subs||[]:[];
sheet(`<div class=seg><button class="${ex?'on':''}" onclick="setK('e')">Expense</button><button class="${ex?'':'on'}" onclick="setK('i')">Income</button>${e.id?'':`<button onclick="sync();bulkBack(V.ed.d)">Many</button>`}</div>
${ex&&!e.id&&V.fv&&V.fv.length?`<div class=chips>${V.fv.map((f,i)=>{const c=cat(f[0]);return`<span class=chip onclick="useFav(${i})">${c.icon} ${esc(f[1]||c.name)}</span>`}).join('')}</div>`:''}<input id=fa inputmode=decimal enterkeyhint=done placeholder="Amount ৳" value="${e._a??(e.a?e.a/100:'')}" autofocus><input id=fd type=date value="${e.d}"><div class=chips><span class=chip onclick="setD(0)">Today</span><span class=chip onclick="setD(-1)">Yesterday</span></div>
<select id=fc onchange="sync();V.ed.s='';drawForm()">${ex?cs.map(c=>`<option value="${c.id}" ${c.id==e.c?'selected':''}>${c.icon} ${esc(c.name)}</option>`).join(''):S.inc.map(c=>`<option ${c==e.c?'selected':''}>${esc(c)}</option>`).join('')}</select>
${ex?`<select id=fs><option value="">Subcategory (optional)</option>${sc.map(s=>`<option ${s==e.s?'selected':''}>${esc(s)}</option>`).join('')}</select>`:''}
<select id=fp>${[...new Set([...S.pay,e.p])].map(p=>`<option ${p==e.p?'selected':''}>${esc(p)}</option>`).join('')}</select>
<input id=fdesc placeholder="Description" value="${esc(e.desc)}"><input id=fn placeholder="Notes (optional)" value="${esc(e.n)}">${rcUi(e)}
<div class=btns><button class=ghost onclick=closeS()>Cancel</button><button class=pri onclick=saveF()>Save</button></div>`);fillRpv()}
function saveF(){sync();const e=V.ed,a=toP(e._a??'');if(!(a>0)){toast('Enter an amount like 250 or 99.50');return}if(!e.d){toast('Pick a date');return}
const o={id:e.id||Date.now().toString(36)+Math.random().toString(36).slice(2,5),k:e.k,a,d:e.d,c:e.c,s:e.k=='e'?e.s||'':'',p:e.p,desc:e.desc||'',n:e.n||''};
const nr='_r' in e?e._r:(e.r||'');if(nr)o.r=nr;if(e._rd)rcPut(nr,e._rd);if(e.r&&e.r!==nr)rqAdd([e.r]);const i=S.tx.findIndex(x=>x.id==o.id);i>=0?S.tx[i]=o:S.tx.push(o);save();closeS();R();toast('Saved')}
function act(id){const t=S.tx.find(x=>x.id==id),c=ci(t);sheet(`<h3>${c.icon} ${esc(t.desc||c.name)}</h3><div class=big>${t.k=='i'?'+':'-'}${fmt(t.a)}</div><p class=mu style="margin:0">${dl(t.d)}<br>${esc(c.name)}${t.s?' · '+esc(t.s):''} · ${esc(t.p)}${t.n?'<br>'+esc(t.n):''}</p>${t.r?`<button class="big-btn" onclick="viewRc('${t.r}','${id}')">📎 View receipt</button>`:''}<div class=btns><button onclick="openForm('${id}')">Edit</button><button onclick="dup('${id}')">Duplicate</button><button class=rd onclick="del('${id}',this)">Delete</button></div><button class=ghost onclick=closeS()>Close</button>`)}
function dup(id){const t=S.tx.find(x=>x.id==id);const nt={...t,id:Date.now().toString(36)+'d',d:TODAY()};delete nt.r;S.tx.push(nt);save();closeS();R();toast('Duplicated to today')}
function del(id,b){if(!b.dataset.s){b.dataset.s=1;b.textContent='Tap again to delete';return}const t0=S.tx.find(x=>x.id==id);if(t0&&t0.r)rqAdd([t0.r]);S.tx=S.tx.filter(x=>x.id!=id);save();closeS();R();toast('Deleted')}
function setB(k,v){const blank=!String(v).trim(),p=blank?null:toP(v);if(!blank&&isNaN(p)){toast('Enter a number');return}if(k=='t')S.bud.t=blank?0:p;else if(blank)delete S.bud.c[k];else S.bud.c[k]=p;save();budUpd(k)}
const tg=i=>{S.cats[i].on=!S.cats[i].on;save();R()},mv=i=>{if(i>0){[S.cats[i-1],S.cats[i]]=[S.cats[i],S.cats[i-1]];save();R()}};
function addC(){const n=$('#nc').value.trim();if(!n)return;S.cats.push({id:'c'+Date.now().toString(36),name:n,icon:$('#ni').value||'🏷️',color:'#'+Math.floor(Math.random()*0x888888+0x444444).toString(16),on:true,subs:['Other']});save();R()}
function addS(){const n=$('#ns').value.trim(),c=S.cats.find(x=>x.id==$('#sc').value);if(n&&c){c.subs.push(n);save();R();toast('Subcategory added')}}
function addP(){const n=$('#np').value.trim();if(n&&!S.pay.includes(n)){S.pay.push(n);save();R()}}
function csv(){const sc=$('#xs').value,y=nd.getFullYear();let L=S.tx;if(sc=='m')L=mt(y,nd.getMonth());if(sc=='y')L=L.filter(t=>t.d.startsWith(y+'-'));const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';return'Date,Type,Amount,Category,Subcategory,Payment,Description,Notes,Receipt\n'+L.slice().sort((a,b)=>a.d<b.d?-1:1).map(t=>[t.d,t.k=='e'?'Expense':'Income',(t.a/100).toFixed(2),ci(t).name,t.s,t.p,t.desc,t.n,t.r?'Yes':''].map(q).join(',')).join('\n')}
function showIO(txt,l){$('#io').innerHTML=`<p class=mu>${l}</p><textarea id=iot readonly></textarea><button onclick="cp()">Copy</button>`;$('#iot').value=txt}
function cp(){const t=$('#iot');t.select();try{navigator.clipboard.writeText(t.value).then(()=>toast('Copied'),()=>{document.execCommand('copy');toast('Copied')})}catch(e){document.execCommand('copy');toast('Copied')}}
function chk(){try{const o=JSON.parse($('#rs').value),d=o.data;if(o.app!='tj'||!Array.isArray(d.tx)||!Array.isArray(d.cats)||!Array.isArray(d.inc)||!Array.isArray(d.pay)||!d.bud||d.tx.some(t=>!t.id||!Number.isInteger(t.a)||!/^\d{4}-\d\d-\d\d$/.test(t.d)))throw 0;V.rs=d;V.rsr=o.receipts&&typeof o.receipts=='object'?Object.fromEntries(Object.entries(o.receipts).filter(([k,v])=>typeof v=='string'&&v.startsWith('data:image/'))):null;$('#rm').innerHTML=`Valid backup: ${d.tx.length} transactions, ${d.cats.length} categories${V.rsr?', '+Object.keys(V.rsr).length+' photos':''}. This will replace the data on this device.<br><button class=pri onclick="doRs()">Replace my current data</button>`}catch(e){$('#rm').textContent='This is not a valid backup. Nothing was changed.'}}
async function doRs(){S=V.rs;fixBud();if(V.rsr)for(const k in V.rsr)await rcPut(k,V.rsr[k]);save();R();toast('Backup restored')}

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
sheet(`<div class=seg><button onclick="bkTo('e')">Expense</button><button onclick="bkTo('i')">Income</button><button class=on>Many</button></div><input id=bd type=date value="${b.d}">${b.rows.map((r,i)=>{const cs=S.cats.filter(c=>c.on||c.id==r.c),sc=cat(r.c).subs||[];return`<div class=cd style="background:var(--bg);margin:0"><div class=r><b>#${i+1}</b>${b.rows.length>1?`<button class="ib ghost" onclick="bdel(${i})">✕</button>`:''}</div><div class=ctl><select id=bc${i} onchange="bcat(${i})">${cs.map(c=>`<option value="${c.id}" ${c.id==r.c?'selected':''}>${c.icon} ${esc(c.name)}</option>`).join('')}</select><select id=bs${i}><option value="">Subcategory</option>${sc.map(s=>`<option ${s==r.s?'selected':''}>${esc(s)}</option>`).join('')}</select></div><div class=ctl><input id=ba${i} inputmode=decimal placeholder="Amount ৳" value="${esc(r.a)}" oninput="btot()"><input id=bn${i} placeholder="Description" value="${esc(r.desc)}" onkeydown="if(event.key=='Enter'&&${i}==V.bk.rows.length-1)badd()"></div><select id=bp${i}>${[...new Set([...S.pay,r.p])].map(p=>`<option ${p==r.p?'selected':''}>${esc(p)}</option>`).join('')}</select></div>`}).join('')}<button class=big-btn onclick="badd()">+ Add another expense</button><div class=r><b>Total</b><b id=bt></b></div><div class=btns><button class=ghost onclick=closeS()>Cancel</button><button class=pri onclick=bsave()>Save all</button></div>`);
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
if(r.t=='d'){L=S.tx.filter(t=>t.d==r.d);n=dl(r.d)}else if(r.t=='w'){const a=wk(r.d);L=S.tx.filter(t=>t.d>=a[0]&&t.d<=a[1]);n='Week '+a[0]+' to '+a[1]}else if(r.t=='m'){L=mt(y,V.m);n=MN[V.m]+' '+y}else if(r.t=='y'){L=S.tx.filter(t=>t.d.startsWith(y+'-'));n='Year '+y}else if(r.t=='r'){L=S.tx.filter(t=>(!r.from||t.d>=r.from)&&(!r.to||t.d<=r.to));n=(r.from||'Start')+' to '+(r.to||'today')}else{L=S.tx;n='All data'}
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
return b.map(([id,a])=>{const c=cat(id),bg=bud&&S.bud.c[id]!=null?S.bud.c[id]:null,w=bg!=null?(bg?Math.min(100,a/bg*100):100):a/tot*100;return`<div class=cb><div class=r><span>${c.icon} ${esc(c.name)} <small>${Math.round(a/tot*100)}%</small></span><b>${fmt(a)}${bg!=null?' / '+fmt(bg):''}</b></div><div class=bar><i style="width:${w}%;background:${bg!=null&&a>bg?'var(--rd)':c.color}"></i></div></div>`}).join('')+(o?`<div class=cb><div class=r><span>Others <small>${Math.round(o/tot*100)}%</small></span><b>${fmt(o)}</b></div><div class=bar><i style="width:${o/tot*100}%;background:#94a3b8"></i></div></div>`:'')}
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
function repView(){const r=V.rp,{L,n}=repL(),ct=r.ct;if(ct=='rcp'){const R=L.filter(t=>t.r);return repHdr(n,fdesc())+`<div class=r style="margin:6px 0"><span>📎 ${R.length} receipt${R.length==1?'':'s'}</span><b>Expense ${fmt(sm(R,'e'))}</b></div>`+(R.length?txTbl(R):'<p class=em>No receipts in this selection.</p>')+'<p class=mu style="font-size:12px">The PDF has every receipt photo with its details. Use the PDF button.</p>'}return repHdr(n,fdesc())+(ct=='tx'?txTot(L):repSum(L))+(ct!='sum'?txTbl(L.slice(0,300))+(L.length>300?'<p class=mu>Showing the first 300 here. The download has all of them.</p>':''):'')}
function repUpd(){$('#report').innerHTML=repView();$('#rpn').textContent=rpN()?rpN()+' active':''}
VW.rep=()=>{const r=V.rp,sub=S.cats.find(c=>c.id==r.c);
return`<h2>Reports</h2><div class=ctl><select onchange="V.rp.t=this.value;R()">${so([['d','Day'],['w','Week (Sat-Fri)'],['m','Month'],['y','Year'],['r','Custom range'],['a','All data']],r.t)}</select>${r.t=='m'||r.t=='y'?ysel():''}${r.t=='m'?`<select onchange="V.m=+this.value;R()">${MN.map((x,k)=>`<option value=${k} ${k==V.m?'selected':''}>${x}</option>`).join('')}</select>`:''}</div>
${r.t=='d'||r.t=='w'?`<div class=ctl><input type=date value="${r.d}" onchange="V.rp.d=this.value||TODAY();R()"></div>`:''}${r.t=='r'?`<div class=ctl><input type=date value="${r.from}" onchange="V.rp.from=this.value;R()"><input type=date value="${r.to}" onchange="V.rp.to=this.value;R()"></div>`:''}
<details class=cd ${V.rpo?'open':''} ontoggle="V.rpo=this.open"><summary><b>Filters &amp; sort</b> <small id=rpn>${rpN()?rpN()+' active':''}</small></summary><div class=gr>
<input placeholder="Search description or notes" value="${esc(r.q)}" oninput="V.rp.q=this.value;repUpd()">
<div class=ctl><select onchange="V.rp.k=this.value;R()">${so([['','All types'],['e','Expenses'],['i','Income']],r.k)}</select><select onchange="V.rp.c=this.value;V.rp.s='';R()"><option value="">All categories</option>${S.cats.map(c=>`<option value="${c.id}" ${r.c==c.id?'selected':''}>${c.icon} ${esc(c.name)}${c.arch?' (archived)':''}</option>`).join('')}${S.inc.map(c=>`<option value="${esc(c)}" ${r.c==c?'selected':''}>💰 ${esc(c)}</option>`).join('')}</select></div>
${sub?`<select onchange="V.rp.s=this.value;R()"><option value="">All subcategories</option>${sub.subs.map(s=>`<option ${r.s==s?'selected':''}>${esc(s)}</option>`).join('')}</select>`:''}
<div class=ctl><select onchange="V.rp.p=this.value;R()"><option value="">All payment methods</option>${S.pay.map(p=>`<option ${r.p==p?'selected':''}>${esc(p)}</option>`).join('')}</select><select onchange="V.rp.sort=this.value;R()">${so(SORTS,r.sort)}</select></div>
<div class=ctl><input inputmode=decimal placeholder="Min ৳" value="${r.min?r.min/100:''}" onchange="V.rp.min=toP(this.value)||0;R()"><input inputmode=decimal placeholder="Max ৳" value="${r.max?r.max/100:''}" onchange="V.rp.max=toP(this.value)||0;R()"></div>
<button class=ghost onclick="Object.assign(V.rp,{k:'',c:'',s:'',p:'',min:0,max:0,q:''});R()">Clear filters</button></div></details>
<div class=cd><div class=ctl><select onchange="V.rp.ct=this.value;R()">${so([['full','Download: Full report'],['sum','Download: Summary only'],['tx','Download: Transactions only'],['rcp','Download: Receipts only (photos)']],r.ct)}</select></div><small>Use the JPG and PDF buttons at the bottom right to download exactly this report. PDF: a short report fits on one page; a long one gets a summary page with the top transactions, then all transactions. JPG: summary and charts (transactions only when 25 or fewer).</small></div>
<div id=rpw><div id=report class="cd rp">${repView()}</div></div>`};
async function dlRep0(f){
if(!window.html2canvas||(f=='pdf'&&!(window.jspdf&&window.jspdf.jsPDF))){toast('Report tools missing (lib folder)');return}
if(V.rp.ct=='rcp'){const q=repL();if(f=='pdf')await rcPdf(q.L,q.n,fdesc(),'taka-receipts-'+slug(q.n));else{const R=q.L.filter(t=>t.r);if(R.length!=1)toast(R.length?'Several receipts: please use the PDF button':'No receipts in this selection');else dlImg(R[0].r)}return}
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
const hasCB=()=>S.cats.some(c=>c.on&&!c.arch&&S.bud.c[c.id]!=null);function budT(){return hasCB()?bsum():S.bud.t}
const dlAny=f=>V.tab=='rep'?dlRep(f):V.tab=='more'?0:dlPage(f);
async function dlPage0(f){
if(!window.html2canvas||(f=='pdf'&&!(window.jspdf&&window.jspdf.jsPDF))){toast('Download tools missing (lib folder)');return}
const el=$('#app'),W=el.offsetWidth,H=el.offsetHeight,bg=getComputedStyle(document.body).backgroundColor,ttl=V.tab=='tx'?{all:'transactions',month:'month-'+pm(V.y,V.m),year:'year-'+V.y}[V.lv]:V.tab=='bud'?'budget-'+pm(V.y,V.m):V.tab,nm='taka-'+ttl+'-'+TODAY(),sc=Math.min(2,14000/H,Math.sqrt(16e6/(W*H)));
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

/* ===== Optional account + cloud sync (Firebase REST, free plan) ===== */
const FB=window.TJ_FIREBASE||{},fbOn=()=>!!(FB.apiKey&&FB.projectId);
let AU=null;try{AU=JSON.parse(localStorage.getItem('tj_auth'))}catch(e){}
const saveAU=()=>{try{AU?localStorage.setItem('tj_auth',JSON.stringify(AU)):localStorage.removeItem('tj_auth')}catch(e){}};
let SY={dirty:false,busy:false,t:+(()=>{try{return localStorage.getItem('tj_last_sync')}catch(e){return 0}})()||0,err:'',ch:false,again:false};
const tk=t=>JSON.stringify([t.k,t.a,t.d,t.c,t.s,t.p,t.desc,t.n,t.r||'']),sk=()=>JSON.stringify([S.cats,S.inc,S.pay,S.bud,S.ac]),defKey=()=>{const d=def();return JSON.stringify([d.cats,d.inc,d.pay,d.bud,d.ac])};
let HM=new Map(),SK='',PK='';const pkey=()=>JSON.stringify([S.prof&&S.prof.name,S.prof&&S.prof.photo]);
function rebuildHM(){HM=new Map(S.tx.map(t=>[t.id,tk(t)]));SK=sk();PK=pkey()}
function stamp(){const now=Date.now(),ids=new Set();S.del=S.del||{};S.tx.forEach(t=>{ids.add(t.id);const k=tk(t);if(HM.get(t.id)!==k){t.u=now;HM.set(t.id,k)}});[...HM.keys()].forEach(id=>{if(!ids.has(id)){S.del[id]=now;HM.delete(id)}});const k=sk();if(k!==SK){S.su=now;SK=k}const pk=pkey();if(pk!==PK){S.prof=S.prof||{name:'',photo:''};S.prof.pu=now;PK=pk}}
async function fbAuth(path,body){const r=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${path}?key=${FB.apiKey}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),j=await r.json();if(!r.ok)throw new Error((j.error&&j.error.message)||'Error');return j}
const authMsg=m=>/OPERATION_NOT_ALLOWED|CONFIGURATION_NOT_FOUND/.test(m)?'Email sign-in is not turned on in Firebase. Open Firebase > Authentication > Sign-in method > Email/Password > Enable. ('+m+')':/API_KEY_INVALID|API key not valid|API_KEY_SERVICE_BLOCKED/i.test(m)?'The apiKey in firebase-config.js is not correct. ('+m+')':/REFERER|referrer/i.test(m)?'The API key settings block this website. ('+m+')':/EXISTS/.test(m)?'This email already has an account. Please sign in.':/INVALID_LOGIN|INVALID_PASSWORD|EMAIL_NOT_FOUND|INVALID_CREDENTIAL/.test(m)?'Wrong email or password.':/WEAK/.test(m)?'Password must be at least 6 characters.':/INVALID_EMAIL|MISSING_EMAIL/.test(m)?'Please enter a valid email.':/TOO_MANY/.test(m)?'Too many tries. Please wait a few minutes.':/fetch|Network/i.test(m)?'No internet connection.':m;
const syncHelp=m=>/permission|PERMISSION/i.test(m)?'Permission denied. Check the Firestore rules (see SETUP-CLOUD.txt).':/fetch|Network/i.test(m)?'No internet. It will retry later.':m;
function setAU(j){AU={uid:j.localId||j.user_id,email:j.email||(AU&&AU.email),rt:j.refreshToken||j.refresh_token,it:j.idToken||j.id_token,exp:Date.now()+(+(j.expiresIn||j.expires_in)-60)*1000};saveAU()}
async function tok(){if(!AU)throw new Error('Signed out');if(Date.now()<AU.exp)return AU.it;const r=await fetch(`https://securetoken.googleapis.com/v1/token?key=${FB.apiKey}`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=refresh_token&refresh_token='+encodeURIComponent(AU.rt)}),j=await r.json();if(!r.ok){if(/TOKEN_EXPIRED|USER_DISABLED|USER_NOT_FOUND|INVALID_REFRESH/.test((j.error&&j.error.message)||'')){AU=null;saveAU();R()}throw new Error('Please sign in again')}setAU({...j,email:AU.email});return AU.it}
const FS=()=>`https://firestore.googleapis.com/v1/projects/${FB.projectId}/databases/(default)/documents/users/${AU.uid}/data`;
async function fsReq(url,opt){const t=await tok(),r=await fetch(url,{...opt,headers:{Authorization:'Bearer '+t,'Content-Type':'application/json'}});if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error((j.error&&j.error.message)||'HTTP '+r.status)}return r.json()}
const fsList=()=>fsListAt(FS());async function fsListAt(base){const out=[];let pt='';do{const j=await fsReq(base+'?pageSize=100'+(pt?'&pageToken='+encodeURIComponent(pt):''));(j.documents||[]).forEach(d=>out.push(d));pt=j.nextPageToken||''}while(pt);return out}
const fsPut=(id,s)=>fsReq(FS()+'/'+id+'?updateMask.fieldPaths=json',{method:'PATCH',body:JSON.stringify({fields:{json:{stringValue:s}}})});
const PJ=s=>{try{return JSON.parse(s)}catch(e){return null}};
async function syncNow(){if(!fbOn()||!AU)return;if(SY.busy){SY.again=true;return}SY.busy=true;SY.ch=false;updSync();
try{const rm={};(await fsList()).forEach(d=>{rm[d.name.split('/').pop()]=(d.fields&&d.fields.json&&d.fields.json.stringValue)||''});
stamp();const tx=new Map(S.tx.map(t=>[t.id,t])),del={...(S.del||{})},rd=PJ(rm.del)||{};for(const k in rd)del[k]=Math.max(del[k]||0,rd[k]);
for(const k in rm)if(k.startsWith('tx-'))(PJ(rm[k])||[]).forEach(t=>{const l=tx.get(t.id);if(!l||(t.u||0)>(l.u||0)){tx.set(t.id,t);SY.ch=true}});
for(const[id,t]of[...tx])if(del[id]&&del[id]>=(t.u||0)){tx.delete(id);if(t.r)rcDel(t.r);SY.ch=true}
const cut=Date.now()-180*864e5;for(const k in del)if(del[k]<cut)delete del[k];
const dk=defKey();if(!S.su&&sk()!==dk)S.su=Date.now();
const rs=PJ(rm.settings);if(rs&&typeof rs=='object'){const N={cats:Array.isArray(rs.cats)&&rs.cats.length?rs.cats:S.cats,inc:Array.isArray(rs.inc)&&rs.inc.length?rs.inc:S.inc,pay:Array.isArray(rs.pay)&&rs.pay.length?rs.pay:S.pay,bud:rs.bud&&typeof rs.bud=='object'?(rs.bz?rs.bud:stripZ(rs.bud)):S.bud,ac:rs.ac||S.ac},nk=JSON.stringify([N.cats,N.inc,N.pay,N.bud,N.ac]);
if(nk!==sk()&&((rs.su||0)>(S.su||0)||(!S.su&&sk()===dk))){S.cats=N.cats;S.inc=N.inc;S.pay=N.pay;S.bud=N.bud;S.ac=N.ac;S.su=rs.su||0;SY.ch=true}}const rp=PJ(rm.profile);if(rp&&(rp.pu||0)>((S.prof&&S.prof.pu)||0)){S.prof=rp;SY.ch=true}
S.tx=[...tx.values()];S.del=del;rebuildHM();save(true);
const by={};S.tx.forEach(t=>(by[t.d.slice(0,4)]=by[t.d.slice(0,4)]||[]).push(t));for(const k in rm)if(k.startsWith('tx-')&&!by[k.slice(3)])by[k.slice(3)]=[];
const jobs=[];for(const y in by){const s=JSON.stringify(by[y].sort((a,b)=>a.id<b.id?-1:1));if(s!==rm['tx-'+y])jobs.push(['tx-'+y,s])}
const ds=JSON.stringify(del);if(ds!==rm.del)jobs.push(['del',ds]);const ss=JSON.stringify({su:S.su||0,cats:S.cats,inc:S.inc,pay:S.pay,bud:S.bud,ac:S.ac,bz:1});if(ss!==rm.settings)jobs.push(['settings',ss]);const ps=JSON.stringify(S.prof||{});if(S.prof&&ps!==rm.profile)jobs.push(['profile',ps]);
for(const[j,s]of jobs)await fsPut(j,s);
let rpend=0;try{rpend=await rcSync()}catch(e){rpend=1}SY.t=Date.now();SY.err="";if(!SY.again&&!rpend)SY.dirty=false;try{localStorage.setItem('tj_last_sync',SY.t)}catch(e){}}
catch(e){SY.err=e.message||'error'}finally{SY.busy=false;updSync();if(SY.again){SY.again=false;schedSync()}}}
function schedSync(){if(!fbOn()||!AU)return;clearTimeout(schedSync.h);schedSync.h=setTimeout(async()=>{await syncNow();if(SY.ch)R()},2500)}
function note(t){const g=$('#gerr');if(g&&$('#gate').style.display=='grid')g.textContent=t;toast(t)}
async function login(mode){const e=$('#ae').value.trim(),p=$('#ap').value,btn=$('#gbtn');let nm='';if(!e||!p){note('Enter email and password');return}
if(mode=='up'){nm=$('#an').value.trim();if(!nm){note('Please enter your name');return}if(p.length<6){note('Password must be at least 6 characters');return}if(p!==$('#ap2').value){note('Passwords do not match');return}}
const g=$('#gerr');if(g)g.textContent='';const lab=btn?btn.textContent:'';if(btn){btn.disabled=true;btn.textContent='Please wait…'}
try{setAU(await fbAuth(mode=='up'?'signUp':'signInWithPassword',{email:e,password:p,returnSecureToken:true}));AU.email=e;saveAU();enter(mode,nm);await syncNow();R();toast(SY.err?'Signed in. Sync problem: '+syncHelp(SY.err):mode=='up'?'Account created':'Signed in')}catch(err){note(authMsg(err.message))}finally{if(btn){btn.disabled=false;btn.textContent=lab}}}
async function resetPw(){const e=$('#ae').value.trim();if(!e){note('Enter your email first');return}try{await fbAuth('sendOobCode',{requestType:'PASSWORD_RESET',email:e});note('Password reset email sent. Check your inbox.')}catch(err){note(authMsg(err.message))}}
async function signOut(b){await syncNow();if(SY.err&&!b.dataset.s){b.dataset.s=1;b.textContent='Sync failed. Tap again to sign out and erase this device';return}
rcClear();AU=null;saveAU();S=def();rebuildHM();save(true);SY.t=0;try{localStorage.removeItem('tj_last_sync');localStorage.removeItem('tj_owner')}catch(e){}R();toast('Signed out. This device was cleared.')}
function acct(){const h='<h3>Account &amp; sync</h3>';
if(!fbOn())return`<div class=cd>${h}<p class=mu style="margin:0">Cloud sync is not turned on. Your data stays on this device only. See SETUP-CLOUD.txt to turn it on.</p></div>`;
if(!AU)return'';
return`<div class=cd>${h}<div class=r><b>${esc(AU.email)}</b></div><p class=mu style="margin:4px 0">${syncLabel()}${SY.err&&!/fetch|Network/i.test(SY.err)?' · '+esc(syncHelp(SY.err)):SY.t&&!SY.dirty&&!SY.err?' · '+new Date(SY.t).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):''}</p><button onclick="signOut(this)" style="width:100%">Sign out</button><small>Changes are saved to your account automatically, and sync as soon as you are online. Signing out clears this device; your data stays in your account.</small></div>`}
const legacyN=()=>{const l=PJ((()=>{try{return localStorage.getItem('tj_legacy')}catch(e){return null}})());return l&&l.tx?l.tx.length:0};
function stashLegacy(){try{const old=PJ(localStorage.getItem('tj_legacy'));if(old&&old.tx){const ids=new Set(old.tx.map(t=>t.id));S.tx.forEach(t=>{if(!ids.has(t.id))old.tx.push(t)});localStorage.setItem('tj_legacy',JSON.stringify(old))}else localStorage.setItem('tj_legacy',JSON.stringify(S))}catch(e){return}S=def();rebuildHM();save(true)}
function enter(mode,nm){const uid=AU.uid,own=localStorage.getItem('tj_owner'),keep=$('#gk')&&$('#gk').checked;
if(own!==uid){S=def();rebuildHM();SY.t=0}if(mode=='up'&&nm)S.prof={name:nm,photo:'',pu:Date.now()};
if(keep){const lg=PJ(localStorage.getItem('tj_legacy'));if(lg){const have=new Set(S.tx.map(t=>t.id));(lg.tx||[]).forEach(t=>{if(!have.has(t.id))S.tx.push(t)});if(mode=='up'){S.cats=lg.cats||S.cats;S.inc=lg.inc||S.inc;S.pay=lg.pay||S.pay;S.bud=lg.bud?(lg.bz?lg.bud:stripZ(lg.bud)):S.bud}try{localStorage.removeItem('tj_legacy')}catch(e){}}}
try{localStorage.setItem('tj_owner',uid)}catch(e){}save(true)}
V.gm='in';
function gateHtml(){const n=legacyN(),up=V.gm=='up';return`<div class=box><div style="text-align:center"><div class=big>৳ Taka Journal</div><p class=mu style="margin:4px 0 0">${up?'Create your account':'Sign in to open your journal'}</p></div>${up?'<input id=an placeholder="Your name" autocomplete=name>':''}<input id=ae type=email autocomplete=username placeholder="Email"><input id=ap type=password autocomplete="${up?'new-password':'current-password'}" placeholder="${up?'Password (6+ characters)':'Password'}" ${up?'':`onkeydown="if(event.key=='Enter')login('in')"`}>${up?`<input id=ap2 type=password autocomplete=new-password placeholder="Confirm password" onkeydown="if(event.key=='Enter')login('up')">`:''}<p id=gerr class=rd style="margin:0;text-align:center;font-size:13px"></p><button id=gbtn class="pri big-btn" onclick="login('${up?'up':'in'}')">${up?'Create account':'Sign in'}</button>${up?'':'<button class=ghost onclick="resetPw()">Forgot password?</button>'}${n?`<label style="display:flex;gap:8px;align-items:flex-start;font-size:13px"><input type=checkbox id=gk style="width:auto;margin-top:3px"> <span>Also add the ${n} entries already saved on this device to this account</span></label>`:''}<button class=ghost onclick="gmode('${up?'in':'up'}')">${up?'Already have an account? Sign in':'New here? Create an account'}</button><small class=mu style="text-align:center">Each account has its own separate data, available on any device.</small></div>`}
function gmode(m){const e=$('#ae')?$('#ae').value:'';V.gm=m;$('#gate').innerHTML='';gate();$('#ae').value=e}
function gate(){const g=$('#gate');if(fbOn()&&!AU){if(!g.innerHTML)g.innerHTML=gateHtml();g.style.display='grid';return true}g.style.display='none';g.innerHTML='';return false}
if(fbOn()&&!AU&&!localStorage.getItem('tj_owner')){S=load();if(S.tx.length)stashLegacy()}


/* ===== v3: profile, budget page, merged List page, bulk delete ===== */
V.lv='all';V.pf={name:'',photo:''};
V.dl={sc:'month',d:TODAY(),mo:TODAY().slice(0,7),y:nd.getFullYear(),from:'',to:'',c:'',k:''};
function pname(){return(S.prof&&S.prof.name)||(AU&&AU.email?AU.email.split('@')[0]:'')||'You'}
function avHtml(sz,photo,name){return`<span class=av style="width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.42)}px">${photo?`<img alt="" src="${photo}">`:esc(String(name||'?').trim().charAt(0).toUpperCase()||'?')}</span>`}
const hero=()=>`<div class=hero onclick="V.tab='more';R()">${avHtml(64,(S.prof||{}).photo,pname())}<div class=g><small>${greet()}</small><b>${esc(pname())}</b><small>${nd.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</small><small id=hsy>${syncLabel()}</small></div></div>`;
function profCard(){const p=S.prof||{};return`<div class=cd style="text-align:center">${avHtml(88,p.photo,pname())}<div class=big style="font-size:22px;margin-top:8px">${esc(pname())}</div>${AU?`<small>${esc(AU.email)}</small>`:''}<div class=btns style="margin-top:10px"><button onclick="profBox()">Edit profile</button>${AU?'<button onclick="pwBox()">Change password</button>':''}</div></div>`}
function profBox(keep){if(!keep){const p=S.prof||{};V.pf={name:p.name||'',photo:p.photo||''}}const p=V.pf;
sheet(`<h3>Edit profile</h3><div style="text-align:center">${avHtml(96,p.photo,p.name||pname())}</div><div class=btns><label class=lb>Choose photo<input type=file accept="image/*" hidden onchange="pickPhoto(this)"></label><button class=ghost onclick="V.pf.photo='';V.pf.name=$('#pn').value;profBox(true)">Remove photo</button></div><input id=pn placeholder="Your name" value="${esc(p.name)}"><div class=btns><button class=ghost onclick=closeS()>Cancel</button><button class=pri onclick="saveProf()">Save</button></div>`)}
function pickPhoto(inp){const f=inp.files&&inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{let sz=320,q=.85,out='';const s=Math.min(im.width,im.height),sx=(im.width-s)/2,sy=(im.height-s)/2;
for(let i=0;i<14;i++){const c=document.createElement('canvas');c.width=c.height=sz;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,sz,sz);x.drawImage(im,sx,sy,s,s,0,0,sz,sz);out=c.toDataURL('image/jpeg',q);if((out.length-23)*.75<=100*1024)break;if(q>.45)q-=.1;else sz=Math.round(sz*.8)}
V.pf.photo=out;V.pf.name=$('#pn').value;profBox(true)};im.onerror=()=>toast('Could not read this image');im.src=r.result};r.readAsDataURL(f)}
function saveProf(){S.prof={...(S.prof||{}),name:$('#pn').value.trim(),photo:V.pf.photo};save();closeS();R();toast('Profile saved')}
function pwBox(){sheet(`<h3>Change password</h3><input id=pw0 type=password placeholder="Current password" autocomplete=current-password><input id=pw1 type=password placeholder="New password (6+ characters)" autocomplete=new-password><input id=pw2 type=password placeholder="Confirm new password" autocomplete=new-password><div class=btns><button class=ghost onclick=closeS()>Cancel</button><button class=pri onclick="changePw()">Save</button></div>`)}
async function changePw(){const a=$('#pw0').value,b=$('#pw1').value;if(!a||!b){toast('Fill all fields');return}if(b.length<6){toast('New password must be at least 6 characters');return}if(b!==$('#pw2').value){toast('New passwords do not match');return}
try{setAU(await fbAuth('signInWithPassword',{email:AU.email,password:a,returnSecureToken:true}));const j=await fbAuth('update',{idToken:AU.it,password:b,returnSecureToken:true});setAU({...j,email:AU.email});closeS();toast('Password changed')}catch(err){toast(authMsg(err.message))}}
const dangerCard=()=>AU?`<div class=cd><h3>Delete account</h3><small>Permanently removes your account and all your data from the server, right away. This cannot be undone.</small><button class="rd big-btn" style="margin-top:8px" onclick="delAccBox()">Delete my account…</button></div>`:'';
function delAccBox(){sheet(`<h3 class=rd>Delete account</h3><p class=mu style="margin:0">Your account and all synced data will be erased from the server. Data on this device is cleared too.</p><button onclick="bkp(true)">Download a backup first</button><input id=dpw type=password placeholder="Enter your password" autocomplete=current-password><div class=btns><button class=ghost onclick=closeS()>Cancel</button><button class=rd onclick="delAcc(this)">Delete everything</button></div>`)}
async function delAcc(b){const pw=$('#dpw').value;if(!pw){toast('Enter your password');return}if(!b.dataset.s){b.dataset.s=1;b.textContent='Tap again to delete forever';return}
try{toast('Deleting…');setAU(await fbAuth('signInWithPassword',{email:AU.email,password:pw,returnSecureToken:true}));for(const d of await fsList())await fsReq(FS()+'/'+d.name.split('/').pop(),{method:'DELETE'});for(const d of await fsListAt(RCU()))await fsReq(RCU()+'/'+d.name.split('/').pop(),{method:'DELETE'});await fbAuth('delete',{idToken:AU.it});rcClear();
AU=null;saveAU();S=def();rebuildHM();save(true);try{['tj_owner','tj_last_sync'].forEach(k=>localStorage.removeItem(k))}catch(e){}closeS();R();toast('Account deleted')}catch(err){b.dataset.s='';b.textContent='Delete everything';toast(authMsg(err.message))}}
/* bulk delete */
const catOpts=cur=>'<option value="">All categories</option>'+S.cats.map(c=>`<option value="${c.id}" ${cur==c.id?'selected':''}>${c.icon} ${esc(c.name)}${c.arch?' (archived)':''}</option>`).join('')+S.inc.map(c=>`<option value="${esc(c)}" ${cur==c?'selected':''}>💰 ${esc(c)}</option>`).join('');
function dlSel(){const o=V.dl;let ok;if(o.sc=='day')ok=t=>o.d&&t.d==o.d;else if(o.sc=='month')ok=t=>o.mo&&t.d.startsWith(o.mo);else if(o.sc=='year')ok=t=>t.d.startsWith(o.y+'-');else if(o.sc=='range')ok=t=>(o.from||o.to)&&(!o.from||t.d>=o.from)&&(!o.to||t.d<=o.to);else ok=()=>true;return S.tx.filter(t=>ok(t)&&(!o.c||t.c==o.c)&&(!o.k||t.k==o.k))}
function dlTxt(){const L=dlSel();return L.length?`<b>${L.length} entries</b> will be deleted (expense ${fmt(sm(L,'e'))}, income ${fmt(sm(L,'i'))})`:'Nothing matches.'}
function dlUpd(){$('#dlp').innerHTML=dlTxt();const b=$('#dlgo');b.dataset.s='';b.textContent='Delete these entries'}
function delCard(){const o=V.dl;return`<div class="cd sec${secCls('del')}"><h3 onclick="togS('del',this)">Delete entries</h3><small>Remove many entries at once, for example after a mistake. You can undo right after deleting.</small><div class=gr><select onchange="V.dl.sc=this.value;R()">${so([['day','One day'],['month','One month'],['year','One year'],['range','Date range'],['all','Everything']],o.sc)}</select>
${o.sc=='day'?`<input type=date value="${o.d}" onchange="V.dl.d=this.value;dlUpd()">`:o.sc=='month'?`<input type=month value="${o.mo}" onchange="V.dl.mo=this.value;dlUpd()">`:o.sc=='year'?`<select onchange="V.dl.y=+this.value;dlUpd()">${yrs().map(y=>`<option ${y==o.y?'selected':''}>${y}</option>`).join('')}</select>`:o.sc=='range'?`<div class=ctl><input type=date value="${o.from}" onchange="V.dl.from=this.value;dlUpd()"><input type=date value="${o.to}" onchange="V.dl.to=this.value;dlUpd()"></div>`:''}
<div class=ctl><select onchange="V.dl.c=this.value;dlUpd()">${catOpts(o.c)}</select><select onchange="V.dl.k=this.value;dlUpd()">${so([['','Expense + income'],['e','Expenses only'],['i','Income only']],o.k)}</select></div>
<div id=dlp class=mu>${dlTxt()}</div><button id=dlgo class="rd big-btn" onclick="dlGo(this)">Delete these entries</button></div></div>`}
function dlGo(b){const L=dlSel();if(!L.length){toast('Nothing to delete');return}if(!b.dataset.s){b.dataset.s=1;b.textContent='Tap again to delete '+L.length+' entries';return}
const ids=new Set(L.map(t=>t.id));V.undo=L;rqAdd(L.filter(t=>t.r).map(t=>t.r));S.tx=S.tx.filter(t=>!ids.has(t.id));save();R();sheet(`<h3>Deleted ${L.length} entries</h3><div class=btns><button onclick="undoDel()">Undo</button><button class=pri onclick="closeS()">OK</button></div>`)}
function undoDel(){if(V.undo){rqRem(V.undo.filter(t=>t.r).map(t=>t.r));S.tx.push(...V.undo);V.undo=null;save();closeS();R();toast('Restored')}}
/* budget page */
const bst=(a,b)=>b==null?'var(--ac)':a>b?'var(--rd)':(b&&a>=b*.8)?'#d98a00':'var(--ac)';
function bOver(){const e=sm(mt(V.y,V.m),'e'),b=budT(),cur=V.y==nd.getFullYear()&&V.m==nd.getMonth(),left=cur?new Date(V.y,V.m+1,0).getDate()-nd.getDate()+1:0;
return`<small>Overall monthly budget${hasCB()?' (total of categories)':''}</small>${hasCB()?`<div class=big>${fmt(b)}</div>`:`<div class=r><input class=sm inputmode=decimal placeholder="৳" value="${S.bud.t/100||''}" onchange="setB('t',this.value)"><small>Or fill the categories below.</small></div>`}${b?`<div class=bar style="margin:8px 0"><i style="width:${Math.min(100,e/b*100)}%;background:${bst(e,b)}"></i></div><div class=r><small>Spent ${fmt(e)} (${Math.round(e/b*100)}%)</small><small class="${e>b?'rd':''}">${e>b?'⚠ Over by '+fmt(e-b):fmt(b-e)+' left'}</small></div>${cur&&b>e?`<div class=r><small>Safe to spend per day</small><b>${fmt(Math.floor((b-e)/left))}</b></div>`:''}`:''}`}
function bRow(c){const a=spentBy(V.y,V.m,c.id),bg=S.bud.c[c.id],has=bg!=null,ov=has&&a>bg;return`<small class="${ov?'rd':''}">${fmt(a)}${has?` of ${fmt(bg)}${bg?' · '+Math.round(a/bg*100)+'%':''}${ov?' · ⚠ over by '+fmt(a-bg):''}`:' spent · no budget'}</small><div class=bar style="margin-top:4px"><i style="width:${has?(bg?Math.min(100,a/bg*100):(a>0?100:0)):0}%;background:${has?bst(a,bg):'var(--ac)'}"></i></div>`}
VW.bud=()=>`<h2>Budget</h2><div class=ctl><button class="ib ghost" onclick="shiftM(-1)" aria-label="Previous month">‹</button>${ysel()}<select onchange="V.m=+this.value;R()">${MN.map((x,k)=>`<option value=${k} ${k==V.m?'selected':''}>${x}</option>`).join('')}</select><button class="ib ghost" onclick="shiftM(1)" aria-label="Next month">›</button></div><div id=bwarn>${bWarn()}</div><div class="cd${ovAll()?' over':''}" id=bovr>${bOver()}</div><div class=cd><h3>Category budgets</h3><small>Type a monthly amount for each category. The overall budget is their total. Empty means 0.</small>${S.cats.filter(c=>c.on&&!c.arch).map(c=>`<div class="cb${isOver(c.id)?' over':''}"><div class=r><span>${isOver(c.id)?'⚠ ':''}${c.icon} ${esc(c.name)}</span><input class=sm inputmode=decimal placeholder="৳" value="${S.bud.c[c.id]!=null?S.bud.c[c.id]/100:''}" onchange="setB('${c.id}',this.value)"></div><div id="br-${c.id}">${bRow(c)}</div></div>`).join('')}</div>`;
function budUpd(k){if(V.tab!='bud'){R();return}$('#bovr').innerHTML=bOver();$('#bovr').className='cd'+(ovAll()?' over':'');$('#bwarn').innerHTML=bWarn();if(k!='t'){const c=S.cats.find(x=>x.id==k),e=$('#br-'+k);if(c&&e){e.innerHTML=bRow(c);e.parentNode.className='cb'+(isOver(k)?' over':'');e.previousSibling.firstChild.textContent=(isOver(k)?'⚠ ':'')+c.icon+' '+c.name}}navUpd()}
/* merged List page */
const txAll=VW.tx;
VW.tx=()=>`<h2>List</h2><div class=seg style="margin-bottom:10px">${[['all','All'],['month','Month'],['year','Year']].map(([k,l])=>`<button class="${V.lv==k?'on':''}" onclick="V.lv='${k}';V.sel=null;R()">${l}</button>`).join('')}</div>`+(V.lv=='month'?VW.month():V.lv=='year'?VW.year():txAll());


/* ===== v4: budget warnings, sync label, misc ===== */
function spentBy(y,m,id){return mt(y,m).filter(t=>t.k=='e'&&t.c==id).reduce((s,t)=>s+t.a,0)}
function isOver(id,y=V.y,m=V.m){const bg=S.bud.c[id];return bg!=null&&spentBy(y,m,id)>bg}
const overIds=(y=V.y,m=V.m)=>S.cats.filter(c=>c.on&&!c.arch&&isOver(c.id,y,m)).map(c=>c.id);
const ovAll=(y=V.y,m=V.m)=>!hasCB()&&S.bud.t>0&&sm(mt(y,m),'e')>S.bud.t;
const overN=()=>{const y=nd.getFullYear(),m=nd.getMonth();return Math.max(overIds(y,m).length,ovAll(y,m)?1:0)};
function bWarn(){const o=overIds();if(!o.length)return'';return`<div class="cd warn">⚠ ${o.length} ${o.length>1?'categories are':'category is'} over budget: ${o.map(id=>esc(cat(id).name)).join(', ')}</div>`}
function syncLabel(){if(!fbOn()||!AU)return'';if(SY.busy)return'☁ Syncing…';if(SY.err)return/permission/i.test(SY.err)?'☁ Sync problem':'☁ Offline · will sync automatically';if(SY.dirty)return'☁ Waiting to sync';return'☁ All changes saved'}
function updSync(){const a=$('#acct');if(a)a.innerHTML=acct();const h=$('#hsy');if(h)h.textContent=syncLabel()}
document.addEventListener('keydown',e=>{if(e.key=='Escape')closeS()});
try{if('serviceWorker' in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{})}catch(e){}


/* ===== v5: faster entry and month navigation ===== */
function favs(){const lim=iso(new Date(Date.now()-90*864e5)),m={};S.tx.forEach(t=>{if(t.k!='e'||t.d<lim)return;const c=S.cats.find(x=>x.id==t.c);if(!c||!c.on||c.arch)return;const k=t.c+'|'+(t.s||'')+'|'+t.p;m[k]=(m[k]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k])=>k.split('|'))}
function useFav(i){sync();const f=V.fv[i];V.ed.c=f[0];V.ed.s=f[1];V.ed.p=f[2];drawForm();const a=$('#fa');if(a)a.focus()}
function setD(n){const x=new Date();x.setDate(x.getDate()+n);$('#fd').value=iso(x)}
function shiftM(d){let m=V.m+d,y=V.y;if(m<0){m=11;y--}if(m>11){m=0;y++}const ys=yrs();if(y<ys[0]||y>ys[ys.length-1])return;V.y=y;V.m=m;V.sel=null;R()}
function greet(){const h=new Date().getHours();return h<5?'Hello':h<12?'Good morning':h<17?'Good afternoon':h<21?'Good evening':'Hello'}


/* ===== v6: receipt photos ===== */
const RCM=new Map();let RCDB=null;
function rcDB(){return RCDB||(RCDB=new Promise(res=>{try{const q=indexedDB.open('tj_rc',1);q.onupgradeneeded=()=>q.result.createObjectStore('rc');q.onsuccess=()=>res(q.result);q.onerror=()=>res(null);q.onblocked=()=>res(null)}catch(e){res(null)}}))}
async function rcGet(id){const db=await rcDB();if(!db)return RCM.get(id)||null;return new Promise(r=>{try{const q=db.transaction('rc').objectStore('rc').get(id);q.onsuccess=()=>r(q.result||null);q.onerror=()=>r(null)}catch(e){r(null)}})}
async function rcPut(id,d){const db=await rcDB();if(!db){RCM.set(id,d);return true}return new Promise(r=>{try{const t=db.transaction('rc','readwrite');t.objectStore('rc').put(d,id);t.oncomplete=()=>r(true);t.onerror=()=>r(false)}catch(e){r(false)}})}
async function rcDel(id){RCM.delete(id);const db=await rcDB();if(db)try{db.transaction('rc','readwrite').objectStore('rc').delete(id)}catch(e){}}
async function rcClear(){RCM.clear();const db=await rcDB();if(db)try{db.transaction('rc','readwrite').objectStore('rc').clear()}catch(e){}try{['tj_rc_up','tj_rc_q'].forEach(k=>localStorage.removeItem(k))}catch(e){}}
const upGet=()=>{try{return new Set(JSON.parse(localStorage.getItem('tj_rc_up')||'[]'))}catch(e){return new Set()}},upAdd=id=>{const s=upGet();s.add(id);try{localStorage.setItem('tj_rc_up',JSON.stringify([...s]))}catch(e){}};
const rqGet=()=>{try{return JSON.parse(localStorage.getItem('tj_rc_q')||'[]')}catch(e){return[]}},rqSet=a=>{try{localStorage.setItem('tj_rc_q',JSON.stringify(a))}catch(e){}};
function rqAdd(ids){if(!ids.length)return;const q=rqGet();ids.forEach(id=>{if(!q.some(x=>x.id==id))q.push({id,at:Date.now()})});rqSet(q)}
function rqRem(ids){rqSet(rqGet().filter(x=>!ids.includes(x.id)))}
const RCU=()=>FS().replace(/\/data$/,'/receipts');
async function rcFetch(id){if(!fbOn()||!AU)return null;try{const j=await fsReq(RCU()+'/'+id),d=j.fields&&j.fields.d&&j.fields.d.stringValue;if(d){await rcPut(id,d);upAdd(id)}return d||null}catch(e){return null}}
async function rcSync(){const up=upGet();let pend=0;
for(const t of S.tx){if(!t.r||up.has(t.r))continue;const d=await rcGet(t.r);if(d){await fsReq(RCU()+'/'+t.r+'?updateMask.fieldPaths=d',{method:'PATCH',body:JSON.stringify({fields:{d:{stringValue:d}}})});upAdd(t.r)}}
const q=rqGet(),keep=[];for(const it of q){if(Date.now()-it.at<3e5){keep.push(it);continue}try{await fsReq(RCU()+'/'+it.id,{method:'DELETE'})}catch(e){keep.push(it);pend=1;continue}await rcDel(it.id)}rqSet(keep);
let n=0;for(const t of S.tx){if(n>=3)break;if(t.r&&!(await rcGet(t.r))){n++;await rcFetch(t.r)}}
return pend}
function shrink(f,max,lim){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const sc=Math.min(1,max/Math.max(im.width,im.height));let w=Math.round(im.width*sc),h=Math.round(im.height*sc),q=.82,out='';for(let i=0;i<16;i++){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(im,0,0,w,h);out=c.toDataURL('image/jpeg',q);if((out.length-23)*.75<=lim*1024)break;if(q>.5)q-=.08;else{w=Math.round(w*.85);h=Math.round(h*.85)}}res(out)};im.onerror=()=>rej(new Error('img'));im.src=r.result};r.onerror=()=>rej(new Error('read'));r.readAsDataURL(f)})}
function rcUi(e){const rid='_r' in e?e._r:e.r;return`<div class=rcp>${rid?`<div class=rpv><img id=rpv alt="Receipt"><button class=ib type=button onclick="rmReceipt()" aria-label="Remove photo">✕</button></div>`:''}<div class=btns><label class=lb>📷 ${rid?'Retake':'Camera'}<input type=file accept="image/*" capture=environment hidden onchange="pickReceipt(this)"></label><label class=lb>🖼 ${rid?'Replace':'Gallery'}<input type=file accept="image/*" hidden onchange="pickReceipt(this)"></label></div><small class=mu>Receipt photo (optional)</small></div>`}
async function pickReceipt(inp){const f=inp.files&&inp.files[0];if(!f)return;sync();toast('Preparing photo…');try{const d=await shrink(f,1400,200);V.ed._r='r'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);V.ed._rd=d;drawForm()}catch(e){toast('Could not read this photo')}}
function rmReceipt(){sync();V.ed._r='';V.ed._rd=null;drawForm()}
function fillRpv(){const e=V.ed,img=$('#rpv');if(!img)return;if(e._rd){img.src=e._rd;return}const id='_r' in e?e._r:e.r;if(id)rcGet(id).then(async d=>{if(!d)d=await rcFetch(id);if(d&&$('#rpv'))$('#rpv').src=d})}
async function dlImg(id){const d=await rcGet(id);if(!d)return;const a=document.createElement('a');a.href=d;a.download='receipt-'+id+'.jpg';document.body.appendChild(a);a.click();a.remove()}
async function bkp(forced){const o={app:'tj',v:1,data:S},c=$('#bkr');if(forced||(c&&c.checked)){const r={};for(const t of S.tx)if(t.r){const d=await rcGet(t.r);if(d)r[t.r]=d}if(Object.keys(r).length)o.receipts=r}dlFile('taka-backup-'+TODAY()+'.json',JSON.stringify(o,null,1))}
/* ===== v6: search and quick filters ===== */
V.f.qr='';V.f.rc=false;V.f.lim=200;
const QR=[['','All time'],['today','Today'],['yest','Yesterday'],['week','This week'],['lweek','Last week'],['month','This month'],['lmonth','Last month'],['d30','Last 30 days'],['year','This year']];
function qrange(k){if(!k)return null;const t=new Date(),y=t.getFullYear(),m=t.getMonth(),d=t.getDate(),I=x=>iso(x),dd=n=>new Date(y,m,d+n),sat=(t.getDay()+1)%7;
return{today:[I(t),I(t)],yest:[I(dd(-1)),I(dd(-1))],week:[I(dd(-sat)),I(t)],lweek:[I(dd(-sat-7)),I(dd(-sat-1))],month:[I(new Date(y,m,1)),I(t)],lmonth:[I(new Date(y,m-1,1)),I(new Date(y,m,0))],d30:[I(dd(-29)),I(t)],year:[y+'-01-01',I(t)]}[k]}
function filt(){const f=V.f,q=f.q.trim().toLowerCase(),r=qrange(f.qr),L=S.tx.filter(t=>(!f.k||t.k==f.k)&&(!f.c||t.c==f.c)&&(!f.p||t.p==f.p)&&(!f.mo||t.d.startsWith(f.mo))&&(!r||(t.d>=r[0]&&t.d<=r[1]))&&(!f.rc||t.r)&&(!f.min||t.a>=f.min)&&(!f.max||t.a<=f.max)&&(!q||(t.desc+' '+(t.n||'')+' '+ci(t).name+' '+(t.s||'')+' '+t.p).toLowerCase().includes(q)||String(t.a/100).includes(q)));
return f.s=='hi'?L.sort((a,b)=>b.a-a.a):f.s=='lo'?L.sort((a,b)=>a.a-b.a):f.s=='old'?L.sort((a,b)=>a.d<b.d?-1:1):L.sort((a,b)=>a.d<b.d?1:-1)}
function lst(){const L=filt(),e=sm(L,'e'),i=sm(L,'i');let h;
if(V.f.s=='hi'||V.f.s=='lo')h=L.slice(0,V.f.lim).map(row).join('');else if(V.f.s=='old'){const o={};L.slice(0,V.f.lim).forEach(t=>(o[t.d]=o[t.d]||[]).push(t));h=Object.keys(o).sort().map(d=>`<h4>${dl(d)}<span>${fmt(sm(o[d],'e'))}</span></h4>`+o[d].map(row).join('')).join('')}else h=grouped(L.slice(0,V.f.lim));
return`<div class=r style="margin:4px 2px 8px"><small>${L.length} ${L.length==1?'entry':'entries'}</small><small>${e?'Expense <b>'+fmt(e)+'</b>':''}${e&&i?' · ':''}${i?'Income <b class=gn>'+fmt(i)+'</b>':''}</small></div>`+(L.some(t=>t.r)?`<button class="ghost" style="width:100%;margin-bottom:8px" onclick="rcPdfList()">📎 Download receipts PDF (${L.filter(t=>t.r).length})</button>`:'')+(h||'<p class=em>🧾<br>Nothing found here.<br><small>Try another word or date range.</small></p>')+(L.length>V.f.lim?`<button class=ghost style="width:100%;margin:8px 0" onclick="V.f.lim+=200;dl2()">Show more (${L.length-V.f.lim} left)</button>`:'')}
const setQ=k=>{V.f.qr=V.f.qr==k?'':k;V.f.mo='';V.f.lim=200;R()},togF=(k,v)=>{V.f[k]=V.f[k]==v?'':v;R()},clrF=()=>{Object.assign(V.f,{q:'',k:'',c:'',p:'',mo:'',qr:'',rc:false,min:0,max:0,lim:200});R()};
function txBody(){const f=V.f,n=[f.k,f.c,f.p,f.mo,f.qr,f.rc,f.min,f.max,f.q.trim()].filter(Boolean).length;
return`<div class=srch><span>🔍</span><input type=search placeholder="Search entries…" value="${esc(f.q)}" oninput="V.f.q=this.value;dl2()" enterkeyhint=search></div>
<div class=chips>${QR.map(([k,l])=>`<span class="chip${(f.qr||'')==k?' on':''}" onclick="setQ('${k}')">${l}</span>`).join('')}</div>
<div class=chips style="margin-top:6px"><span class="chip${f.k=='e'?' on':''}" onclick="togF('k','e')">Expenses</span><span class="chip${f.k=='i'?' on':''}" onclick="togF('k','i')">Income</span><span class="chip${f.rc?' on':''}" onclick="V.f.rc=!V.f.rc;R()">📎 Has receipt</span>${n?`<span class=chip onclick="clrF()">✕ Clear (${n})</span>`:''}</div>
<details class=cd style="margin:10px 0" ${V.fo?'open':''} ontoggle="V.fo=this.open"><summary><b>More filters &amp; sort</b></summary><div class=gr><select onchange="V.f.c=this.value;R()">${catOpts(f.c)}</select><div class=ctl><select onchange="V.f.p=this.value;R()"><option value="">All payment methods</option>${S.pay.map(c=>`<option ${f.p==c?'selected':''}>${esc(c)}</option>`).join('')}</select><input type=month value="${f.mo}" onchange="V.f.mo=this.value;V.f.qr='';R()"></div><div class=ctl><input inputmode=decimal placeholder="Min ৳" value="${f.min?f.min/100:''}" onchange="V.f.min=toP(this.value)||0;R()"><input inputmode=decimal placeholder="Max ৳" value="${f.max?f.max/100:''}" onchange="V.f.max=toP(this.value)||0;R()"><select onchange="V.f.s=this.value;R()">${so([['new','Newest'],['old','Oldest'],['hi','Highest'],['lo','Lowest']],f.s)}</select></div></div></details>
<div id=lst>${lst()}</div>`}


/* ===== v7: receipt viewer + receipts PDF, collapsible settings ===== */
V.rp.d=TODAY();V.sh={};
const secCls=k=>V.sh[k]?'':' shut',togS=(k,el)=>{V.sh[k]=!V.sh[k];el.parentNode.classList.toggle('shut')};
function wk(d){const x=new Date(d+'T00:00'),a=new Date(x),b=new Date(x);a.setDate(x.getDate()-(x.getDay()+1)%7);b.setTime(a.getTime());b.setDate(a.getDate()+6);return[iso(a),iso(b)]}
async function viewRc(id,txid){let d=await rcGet(id);if(!d)d=await rcFetch(id);if(!d){toast('Photo is not on this device yet. Connect to the internet and try again.');return}
sheet(`<h3>Receipt</h3><img alt="Receipt" src="${d}" style="width:100%;border-radius:12px"><div class=btns><button onclick="dlImg('${id}')">⬇ Save photo</button>${txid?`<button onclick="rcPdfOne('${txid}')">⬇ PDF</button>`:''}</div><div class=btns><button class=ghost onclick="${txid?`act('${txid}')`:'closeS()'}">← Back</button><button class=pri onclick="closeS()">Close</button></div>`)}
const unesc=s=>String(s).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&amp;/g,'&');
function capImg(a,b){const w=1500,c=document.createElement('canvas');c.width=w;c.height=96;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,96);x.fillStyle='#17222b';x.font='700 30px system-ui,"Noto Sans Bengali",sans-serif';x.fillText(a,0,36,w);x.fillStyle='#6a7783';x.font='26px system-ui,"Noto Sans Bengali",sans-serif';x.fillText(b,0,78,w);return c.toDataURL('image/jpeg',.92)}
const loadImg=d=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r({width:1,height:1});i.src=d});
async function rcPdf(L,title,desc,name){if(!(window.jspdf&&window.jspdf.jsPDF)){toast('PDF tool missing (lib folder)');return}
const R=L.filter(t=>t.r).sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:0);if(!R.length){toast('No receipts in this selection');return}
try{toast('Preparing receipts…');await new Promise(z=>setTimeout(z,30));const doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'}),CH=12.16;let y=10,miss=0;
doc.addImage(capImg('Taka Journal · Receipts',unesc(title+' · '+R.length+' receipt'+(R.length>1?'s':'')+' · Expense '+fmt(sm(R,'e'))+(desc?' · '+desc:''))),'JPEG',10,y,190,CH);y+=CH+4;
for(let i=0;i<R.length;i++){const t=R[i],c=ci(t);if(i%3==0)toast('Receipt '+(i+1)+' of '+R.length+'…');let d=await rcGet(t.r);if(!d)d=await rcFetch(t.r);
let w=0,h=0;if(d){const im=await loadImg(d),ar=im.height/im.width,mh=R.length==1||ar>1.5?235:128;w=190;h=190*ar;if(h>mh){h=mh;w=mh/ar}}else miss++;
if(y+CH+(d?h+4:8)>287){doc.addPage();y=10}
doc.addImage(capImg(t.d+'  ·  '+(t.desc||c.name)+'  ·  '+(t.k=='i'?'+':'-')+fmt(t.a),c.name+(t.s?' · '+t.s:'')+' · '+t.p+(t.n?' · '+t.n:'')),'JPEG',10,y,190,CH);y+=CH+.5;
if(d){doc.addImage(d,'JPEG',10+(190-w)/2,y,w,h);y+=h+5}else{doc.setFontSize(9);doc.setTextColor(150);doc.text('(photo not available on this device yet)',10,y+4);y+=9}}
const N=doc.getNumberOfPages();for(let p=1;p<=N;p++){doc.setPage(p);doc.setFontSize(8);doc.setTextColor(120);doc.text('Taka Journal - receipts',10,293);doc.text('Page '+p+' of '+N,200,293,{align:'right'})}
const fn=(name||'taka-receipts')+'-'+TODAY()+'.pdf';doc.save(fn);toast('Saved '+fn+(miss?' ('+miss+' photo(s) not available yet)':''))}catch(e){console.error(e);toast('Could not create the receipts PDF')}}
function rcPdfOne(id){const t=S.tx.find(x=>x.id==id);if(t)rcPdf([t],dl(t.d),'','taka-receipt-'+t.d)}
function rcPdfList(){const q=V.f,qr=QR.find(x=>x[0]==(q.qr||''));rcPdf(filt(),(q.mo?q.mo:qr[1])+(q.q.trim()?' · "'+q.q.trim()+'"':''),'','taka-receipts-'+slug(q.mo||qr[1]))}


const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,24)||'all';


/* ===== v8: bulk tabs, budget zero rule, theme, back button ===== */
const SWATCH=['#0f766e','#4f46e5','#e11d48','#d97706','#16a34a','#0ea5e9','#9333ea','#475569'];
function setAc(c){S.ac=c;save();R()}
function applyAc(hex){const st=document.documentElement.style;let h=String(hex||'#0f766e').replace('#','');if(h.length==3)h=h.split('').map(x=>x+x).join('');const n=parseInt(h,16)||0,r=n>>16&255,g=n>>8&255,b=n&255,lum=(.299*r+.587*g+.114*b)/255;
st.setProperty('--ac',hex);st.setProperty('--on',lum>.62?'#10231f':'#ffffff');st.setProperty('--acs',`rgba(${r},${g},${b},.14)`);st.setProperty('--acg',`rgba(${r},${g},${b},.38)`);st.setProperty('--ac2',`rgb(${Math.round(r*.72)},${Math.round(g*.72)},${Math.round(b*.72)})`)}
const stripZ=b=>({...b,c:Object.fromEntries(Object.entries(b.c||{}).filter(([k,v])=>v))});
function fixBud(){if(!S.bz){S.bz=1;S.bud=stripZ(S.bud||{t:0,c:{}})}}
function bkTo(k){bsync();const keep=V.bk,d=keep.d;openForm(null,d);V.bk=keep;if(k=='i')setK('i')}
function bulkBack(d){if(V.bk&&V.bk.rows.some(r=>r.a||r.desc)){V.bk.d=d;drawBulk()}else bulk(d)}
function countUp(){const el=document.querySelector('[data-cnt]');if(!el)return;const to=+el.dataset.cnt;if(!to||(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches))return;const t0=performance.now(),D=650;
const step=n=>{if(!el.isConnected)return;const k=Math.min(1,(n-t0)/D),e=1-Math.pow(1-k,3);if(k<1&&!document.body.classList.contains('cap')){el.textContent=fmt(Math.round(to*e));requestAnimationFrame(step)}else el.textContent=fmt(to)};requestAnimationFrame(step)}
async function capMode(fn,f){document.body.classList.add('cap');await new Promise(r=>setTimeout(r,60));try{await fn(f)}finally{document.body.classList.remove('cap')}}
const dlPage=f=>capMode(dlPage0,f),dlRep=f=>capMode(dlRep0,f);
(function(){try{if(!matchMedia('(pointer:coarse)').matches)return;history.pushState({g:1},'')}catch(e){return}
addEventListener('popstate',()=>{if($('#ov').innerHTML){$('#ov').innerHTML='';V.bk=null;history.pushState({g:1},'');return}
if(V.tab!='home'&&document.body.classList.contains('ready')){V.tab='home';R();scrollTo(0,0);history.pushState({g:1},'');return}
toast('Press back again to exit');setTimeout(()=>{try{history.pushState({g:1},'')}catch(e){}},2200)})})();
S=load();fixBud();rebuildHM();
if(fbOn()&&AU&&!localStorage.getItem('tj_owner'))try{localStorage.setItem('tj_owner',AU.uid)}catch(e){}
R();
if(fbOn()){if(AU)syncNow().then(()=>{if(SY.ch)R()});addEventListener('online',schedSync);setInterval(()=>{if(AU&&!document.hidden&&(SY.dirty||SY.err||Date.now()-SY.t>120000))schedSync()},30000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedSync()})}
