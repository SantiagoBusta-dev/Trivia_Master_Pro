const $=s=>document.querySelector(s),R=a=>a[Math.random()*a.length|0],sh=a=>[...a].sort(()=>Math.random()-.5);
const K='triviaMasterV2',td=()=>new Date().toISOString().slice(0,10);
const QS=Q.map((x,i)=>({id:i,c:x[0],d:x[1],q:x[2],o:x[3],r:x[4],h:x[5]}));
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
S=S||{name:'Jugador',coins:100,max:1,av:['a0'],a:'a0',pets:['p0'],p:'p0',ev:[]};
if(!S.ads||S.ads.d!==td())S.ads={d:td(),n:0};
if(!S.m||S.m.d!==td())S.m={d:td(),q:0,l:0,h:0,done:[]};
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const show=h=>$('#screen').innerHTML=h,back=(f='home')=>`<button class=back onclick=${f}()>⬅ Volver</button>`;
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1800)}
function top(){$('#hd').innerHTML=`<span class=av>${AV.find(x=>x[0]==S.a)[1]}</span><b onclick=ren()>${S.name}</b><span class=c>🪙 ${S.coins}</span>`}
function ren(){const n=prompt('¿Cómo te llamás?',S.name);if(n&&n.trim()){S.name=n.trim().slice(0,16);save();top()}}
let G=null,T=null;const stop=()=>clearInterval(T);
function home(){stop();show(`<h1>Trivia Master Pro</h1><div class=menu>
<button onclick=levels()>🚀 Niveles</button><button onclick=cats()>📚 Categorías</button>
<button onclick=miss()>🎯 Misiones</button><button onclick=evs()>⚡ Eventos</button>
<button onclick=shop()>🛒 Tienda</button><button onclick=ad()>📺 Ver anuncio (+20 🪙) · ${5-S.ads.n}/5 hoy</button></div>`)}
// ---- Niveles (1-100, 5 preguntas aleatorias, dificultad creciente)
function levels(){show(`${back()}<h2>Niveles</h2><div class=grid>${Array.from({length:100},(_,i)=>`<button ${i+1>S.max?'disabled':''} onclick=lvl(${i+1})>${i+1}</button>`).join('')}</div>`)}
function pickLevel(L){const used=new Set(),out=[],p3=Math.min(.8,Math.max(0,(L-30)/70)),p1=Math.min(.8,Math.max(0,(50-L)/60));
 for(let i=0;i<5;i++){const r=Math.random(),d=r<p3?3:r<p3+p1?1:2;let p=QS.filter(q=>q.d==d&&!used.has(q.id));if(!p.length)p=QS.filter(q=>!used.has(q.id));const q=R(p);used.add(q.id);out.push(q)}return out}
function lvl(L){run(pickLevel(L),{title:'Nivel '+L,reward:(k,n)=>k>=3?(k==n?30:10):0,done:k=>{if(k>=3){S.max=Math.max(S.max,L+1);S.m.l++}},back:'levels'})}
// ---- Motor de preguntas (niveles, categorías y eventos)
function run(list,o){G={list,i:0,ok:0,o};ask()}
function ask(){stop();G.q=G.list[G.i];G.lock=0;G.hint='';G.hid=[];G.left=G.o.t||0;G.opts=sh(G.q.o.map((t,j)=>({t,j})));draw();
 if(G.o.t)T=setInterval(()=>{G.left--;const e=$('#tm');if(e)e.textContent='⏱ '+G.left;if(G.left<=0)pick(-1)},1000)}
function draw(){const q=G.q;show(`<div class=bar><span>${G.o.title} · ${G.i+1}/${G.list.length}</span><span id=tm>${G.o.t?'⏱ '+G.left:''}</span></div><p class=cat>${CATS[q.c]}</p><h2>${q.q}</h2>
<div class=opts>${G.opts.map(x=>`<button id=o${x.j} class="${G.hid.includes(x.j)?'gone':''}" onclick=pick(${x.j})>${x.t}</button>`).join('')}</div>
<p class=hint>${G.hint}</p><div class=helps><button onclick=help(1)>💡 Pista · 10🪙</button><button onclick=help(2)>✂️ Quitar una · 15🪙</button><button onclick=help(3)>🔄 Cambiar · 30🪙</button></div>`)}
function help(k){if(G.lock)return;const c=[0,10,15,30][k];if(S.coins<c)return toast('Te faltan monedas');S.coins-=c;S.m.h++;
 if(k==1)G.hint='💡 '+G.q.h;
 if(k==2){const w=G.q.o.map((_,j)=>j).filter(j=>j!=G.q.r&&!G.hid.includes(j));if(w.length>1)G.hid.push(R(w));else{S.coins+=c;toast('Ya no se puede quitar más')}}
 if(k==3){const ids=G.list.map(q=>q.id),p=QS.filter(q=>!ids.includes(q.id));if(p.length){G.list[G.i]=R(p);save();top();return ask()}S.coins+=c}
 save();top();draw()}
function pick(j){if(G.lock)return;G.lock=1;stop();const q=G.q;S.m.q++;if(j==q.r){G.ok++;S.coins+=5}
 $('#o'+q.r).classList.add('ok');if(j>=0&&j!=q.r)$('#o'+j).classList.add('bad');save();top();
 setTimeout(()=>{G.i++;G.i<G.list.length?ask():end()},900)}
function end(){const o=G.o,k=G.ok,n=G.list.length,r=o.reward(k,n);S.coins+=r;if(o.done)o.done(k,n);save();top();
 show(`<h2>${o.title}</h2><p class=big>${k} / ${n}</p><p style=text-align:center>🪙 +${r+k*5}${o.done&&k<3?' · Necesitás 3 aciertos para avanzar':''}</p><div class=menu><button onclick=${o.back}()>Continuar</button></div>`)}
// ---- Categorías y eventos
function cats(){show(`${back()}<h2>Categorías</h2><div class=menu>${Object.keys(CATS).map(k=>`<button onclick="cat('${k}')">${CATS[k]}</button>`).join('')}</div>`)}
function cat(k){run(sh(QS.filter(q=>q.c==k)),{title:CATS[k],reward:()=>0,back:'cats'})}
function evs(){const l=S.ev.includes('leg');show(`${back()}<h2>Eventos</h2><div class=menu><button onclick=rel()>⚡ Relámpago<br><small>10 preguntas · 12 s cada una · hasta +100 🪙</small></button>
<button onclick=${l?'leg()':'unlock()'}>${l?'🏆 Desafío Legendario<br><small>5 preguntas difíciles · hasta +150 🪙</small>':'🔒 Evento secreto · desbloquear por 150 🪙'}</button></div>`)}
function rel(){run(sh(QS).slice(0,10),{title:'⚡ Relámpago',t:12,reward:k=>k*10,back:'evs'})}
function leg(){run(sh(QS.filter(q=>q.d==3)).slice(0,5),{title:'🏆 Desafío Legendario',reward:k=>k*30,back:'evs'})}
function unlock(){if(S.coins<150)return toast('Te faltan monedas');S.coins-=150;S.ev.push('leg');save();top();evs()}
// ---- Misiones diarias
const MS=[['q','Responder 10 preguntas',10,30],['l','Completar 1 nivel',1,40],['h','Usar una ayuda',1,15]];
function miss(){show(`${back()}<h2>Misiones de hoy</h2>${MS.map(m=>{const p=Math.min(S.m[m[0]],m[2]),d=S.m.done.includes(m[0]);return`<div class=row><div class=t>${m[1]}<small>${p}/${m[2]} · 🪙 ${m[3]}</small></div><button ${d||p<m[2]?'disabled':''} onclick="claim('${m[0]}',${m[3]})">${d?'Cobrada':'Cobrar'}</button></div>`}).join('')}`)}
function claim(k,c){S.m.done.push(k);S.coins+=c;save();top();miss()}
// ---- Tienda
function shop(t='av'){const L=t=='av'?AV:PETS,own=t=='av'?S.av:S.pets,cur=t=='av'?S.a:S.p;
 show(`${back()}<h2>Tienda</h2><div class=tabs><button onclick="shop('av')">👤 Avatares</button><button onclick="shop('pet')">🐾 Mascotas</button></div>${L.map(x=>`<div class=row><span class=e>${x[1]}</span><div class=t>${x[2]}<small>${own.includes(x[0])?(cur==x[0]?'En uso':'Tuyo'):'🪙 '+x[3]}</small></div><button ${cur==x[0]?'disabled':''} onclick="buy('${t}','${x[0]}')">${own.includes(x[0])?'Usar':'Comprar'}</button></div>`).join('')}`)}
function buy(t,id){const L=t=='av'?AV:PETS,own=t=='av'?S.av:S.pets,x=L.find(y=>y[0]==id);
 if(!own.includes(id)){if(S.coins<x[3])return toast('Te faltan monedas');S.coins-=x[3];own.push(id)}
 if(t=='av')S.a=id;else{S.p=id;pet()}save();top();shop(t)}
// ---- Anuncios (simulados, con límite diario)
function ad(){if(S.ads.n>=5)return toast('Volvé mañana: ya viste 5 anuncios hoy');let n=3;show(`<h2 style=text-align:center>📺 Anuncio de prueba</h2><p class=big id=cd>3</p>`);
 const t=setInterval(()=>{n--;if(n>0)return $('#cd').textContent=n;clearInterval(t);S.ads.n++;S.coins+=20;save();top();toast('+20 monedas');home()},1000)}
// ---- Mascota
function pet(){const p=PETS.find(x=>x[0]==S.p);$('#pet').innerHTML=`<span class="pe ${p[4]}">${p[1]}</span>${p[6]||''}<span id=say></span>`}
function anim(c){const e=$('.pe');if(!e)return;e.classList.add(c);setTimeout(()=>e.classList.remove(c),2200)}
function petTap(){const p=PETS.find(x=>x[0]==S.p);anim('act');$('#say').textContent=p[5];
 if(window.speechSynthesis){const u=new SpeechSynthesisUtterance(p[5].replace(/[^\p{L} ¡!]/gu,''));u.lang='es-AR';speechSynthesis.speak(u)}}
setInterval(()=>anim('idle'),7000);
top();pet();home();
