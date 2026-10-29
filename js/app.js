// ===== Trivia Master Pro · lógica del juego =====
(()=>{
const $=s=>document.querySelector(s);
const KEY='trivia_master_pro_v3';
const today=()=>new Date().toISOString().slice(0,10);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const hash=s=>{let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return h.toString(36)};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let S=null,ALLQ=[],P=null,cur='',SH={tab:'av',sub:'av'};
const MISS=[{id:'ans',t:'Responder 10 preguntas',goal:10,rw:20},{id:'ok',t:'Acertar 8 preguntas',goal:8,rw:20},{id:'pass',t:'Pasar 2 niveles',goal:2,rw:25}];
function def(){return{v:3,name:'',gen:'',coins:50,lvl:{},used:[],own:{av:[],pet:['cat'],pacc:[],aacc:[]},av:null,pet:'cat',names:{},eq:{av:null},day:{d:today(),ans:0,ok:0,pass:0,claimed:[],ads:0,evt:false},secret:false,sound:true}}
function load(){try{const o=JSON.parse(localStorage.getItem(KEY));if(o&&o.v==3)return o}catch(e){}return null}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function newDay(){if(S.day.d!=today())S.day={d:today(),ans:0,ok:0,pass:0,claimed:[],ads:0,evt:false}}
function toast(m,ms=2200){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),ms)}
function modal(html){$('#modal').innerHTML='<div class="mbox">'+html+'</div>';$('#modal').classList.add('on')}
function closeModal(){$('#modal').classList.remove('on');$('#modal').innerHTML=''}
const petName=id=>S.names[id]||PET_BY[id].n;
const ownsPacc=k=>S.own.pacc.includes(k)||(PET_ACC[k].gift&&S.own.pet.includes(PET_ACC[k].gift));
const curAv=()=>avatarById(S.av);
const lvDone=n=>(S.lvl[n]||0)>=3;
const maxLv=()=>{let m=0;for(let n=1;n<=100;n++){if(lvDone(n))m=n;else break}return Math.min(100,m+1)};
function addCoins(n){S.coins+=n;save()}

// ---------- Escenario 3D (dos visores incrustados) ----------
const Stage={cur:'av',ifr:{av:$('#fav'),pet:$('#fpet')},booted:{av:false,pet:false},pend:null,
 post(k,m){const w=this.ifr[k].contentWindow;if(w)w.postMessage(m,'*')},
 ensure(k){const f=this.ifr[k];if(!f.getAttribute('src'))f.src=(k=='av'?'viewer_avatares.html':'viewer_mascotas.html')+'?embed=1'},
 sync(k,over){if(!this.booted[k])return;if(k=='av'){const a=over||curAv();this.post('av',{t:'load',g:a.g,i:a.i})}else this.post('pet',{t:'pet',k:over||S.pet})},
 show(k,over){this.cur=k;['av','pet'].forEach(x=>this.ifr[x].classList.toggle('on',x==k));this.ensure(k);this.sync(k,over);this.tabs()},
 tabs(){const t=$('#stg-tabs');t.innerHTML=cur=='home'?`<button class="stgbtn ${this.cur=='av'?'on':''}" data-a="stage" data-k="av">🧑 Avatar</button><button class="stgbtn ${this.cur=='pet'?'on':''}" data-a="stage" data-k="pet">🐾 Mascota</button>`:''},
 react(r){this.show('pet');if(this.booted.pet)setTimeout(()=>this.post('pet',{t:'react',r,q:1}),900);else this.pend=r}};
addEventListener('message',e=>{const d=e.data||{};const k=e.source===Stage.ifr.av.contentWindow?'av':e.source===Stage.ifr.pet.contentWindow?'pet':null;if(!k)return;
 if(d.t=='boot'){Stage.booted[k]=true;if(k=='pet'&&Stage.pre)setTimeout(()=>Stage.post('pet',{t:'pre',keys:PETS.map(p=>p.id)}),1500);Stage.post(k,{t:'cfg',files:Snd.files});if(Stage.cur==k)Stage.sync(k,Stage.over&&Stage.over[k])}
 else if(d.t=='ready'){if(k=='av'&&S&&S.eq.av&&!Stage.over)Stage.post('av',{t:'equip',k:S.eq.av});if(k=='pet'&&Stage.pend){const r=Stage.pend;Stage.pend=null;setTimeout(()=>Stage.post('pet',{t:'react',r,q:1}),500)}}});

// ---------- Navegación ----------
function go(s,opt){cur=s;Stage.over=null;const m={home:'st-home',shop:'st-shop',res:'st-res'}[s]||'';document.body.className=m;R[s](opt||{});window.scrollTo(0,0)}
function top(extra=''){return`<div class="top"><div><b>${esc(S.name)}</b> <span class="sm">· Nivel ${maxLv()}</span></div><div class="row"><span class="coins">🪙 ${S.coins}</span>${extra}</div></div>`}
const R={};

// ---------- Inicio y bienvenida ----------
R.welcome=()=>{document.body.className='';$('#app').innerHTML=`<h1 class="center">🧠 Trivia Master Pro</h1><p class="center">¡Bienvenido! Contanos un poco para armar tu aventura.</p>
 <div class="card"><b>Tu nombre</b><input id="nm" maxlength="14" placeholder="Nombre de jugador"><b>¿Cómo te querés ver?</b><p class="sm">Elegí cómo aparecen los avatares.</p>
 <div class="row c"><button data-a="gen" data-g="m" class="gb">Masculino</button><button data-a="gen" data-g="f" class="gb">Femenino</button><button data-a="gen" data-g="o" class="gb">Otro / invitado</button></div></div>
 <p class="center"><button class="pri" data-a="start" style="min-width:200px;font-size:1.1rem">Empezar ▶</button></p><p class="center sm">Tu mascota inicial es un gatito naranja 🐱</p>`};
R.home=()=>{newDay();const a=curAv();$('#app').innerHTML=top()+`<div class="center sm" style="margin:2px 0 6px">${esc(a.n)} · ${esc(petName(S.pet))}</div><div id="chips" class="row c" style="margin-bottom:8px"></div>
 <div class="grid menu"><button class="pri" data-a="levels" style="grid-column:span 2;font-size:1.2rem">▶ Jugar niveles</button><button data-a="cats">📚 Categorías</button><button data-a="shop">🛍️ Tienda</button><button data-a="miss">✅ Misiones</button><button data-a="events">⚡ Eventos</button><button data-a="ad">📺 Ver anuncio (+15)</button><button data-a="sets">⚙️ Ajustes</button></div>
 <p class="center sm" style="margin-top:14px"><button data-a="resetq" class="chip dim">Reiniciar progreso</button></p>`;
 Stage.show(Stage.cur||'av');chips()};
function chips(){const el=$('#chips');if(!el)return;let h='';
 if(Stage.cur=='av'){const a=curAv();Object.keys(AV_ACC).filter(k=>S.own.aacc.includes(k)&&avAccFits(k,a)).forEach(k=>{h+=`<button class="chip ${S.eq.av==k?'on':''}" data-a="aeq" data-k="${k}">${AV_ACC[k].ic} ${AV_ACC[k].n}</button>`});if(S.eq.av)h+=`<button class="chip gold" data-a="ause">✨ Usar</button>`;if(!h)h='<span class="sm">Comprá accesorios para tu avatar en la tienda.</span>'}
 else{Object.keys(PET_ACC).filter(k=>ownsPacc(k)&&PET_ACC[k].pets.includes(S.pet)).forEach(k=>{h+=`<button class="chip" data-a="pacc" data-k="${k}">${PET_ACC[k].ic} ${PET_ACC[k].n}</button>`});if(!h)h='<span class="sm">Comprá accesorios para tu mascota en la tienda.</span>'}
 el.innerHTML=h}

// ---------- Niveles ----------
R.levels=()=>{const mx=maxLv();let g='';for(let n=1;n<=100;n++){const sc=S.lvl[n]||0,cl=sc>=5?'gd':sc>=3?'ok':n>mx?'lock':n==mx?'cur':'';g+=`<button class="${cl}" ${n>mx?'disabled':''} data-a="play" data-n="${n}">${sc>=5?'★':sc>=3?'✓':''}${n}</button>`}
 $('#app').innerHTML=top('<button data-a="home">🏠</button>')+`<h2>Niveles</h2><p class="sm">Pasá con 3 de 5 aciertos. Con 5 de 5 el nivel se pone dorado ★.</p><div class="lv">${g}</div>`};
R.cats=()=>{$('#app').innerHTML=top('<button data-a="home">🏠</button>')+`<h2>Categorías</h2><p class="sm">Práctica de 5 preguntas de un tema (2 🪙 por acierto).</p><div class="grid">`+Object.entries(CATS).map(([k,v])=>`<button data-a="playcat" data-c="${k}">${v}</button>`).join('')+'</div>'};

// ---------- Preguntas ----------
const diffsFor=n=>n<=20?[1]:n<=40?[1,2]:n<=60?[2]:n<=80?[2,3]:[3];
function pick(count,diffs,cat,excl=[]){const f=q=>!excl.includes(q.id)&&(!diffs||diffs.includes(q.d))&&(!cat||q.c==cat);
 let pool=ALLQ.filter(q=>f(q)&&!S.used.includes(q.id));if(pool.length<count)pool=ALLQ.filter(f);if(pool.length<count)pool=ALLQ.filter(q=>!excl.includes(q.id)&&(!cat||q.c==cat));if(pool.length<count)pool=ALLQ.filter(q=>!excl.includes(q.id));return shuffle(pool).slice(0,count)}
function startGame(mode,o){newDay();if(!ALLQ.length){toast('No hay preguntas cargadas');return}
 const cfg={lvl:{count:5,sec:0},cat:{count:5,sec:0},evt:{count:10,sec:12},sec:{count:8,sec:20}}[mode];
 let qs=mode=='lvl'?pick(5,diffsFor(o.n)):mode=='cat'?pick(5,null,o.c):mode=='sec'?pick(8,[3,2]):pick(10,null,null);
 P={mode,n:o.n||0,c:o.c,qs,i:0,ok:0,good:[],sec:cfg.sec,hint:false,off:[],order:[],answered:false};Snd.music('musica_juego');go('play');}
R.play=()=>{const q=P.qs[P.i];P.order=shuffle([0,1,2,3]);P.hint=false;P.off=[];P.answered=false;paintQ();if(P.sec)timer()};
function paintQ(){const q=P.qs[P.i],opts=P.order.map((oi,k)=>`<button class="opt ${P.off.includes(oi)?'off':''}" ${P.off.includes(oi)||P.answered?'disabled':''} data-a="ans" data-o="${oi}">${'ABCD'[k]}) ${esc(q.o[oi])}</button>`).join('');
 const dots=P.qs.map((x,i)=>`<i class="${P.res&&0}${i<P.i?(P.good[i]?'g':'b'):''} ${i==P.i?'c':''}"></i>`).join('');
 const title={lvl:'Nivel '+P.n,cat:CATS[P.c],evt:'⚡ Evento Relámpago',sec:'🔒 Evento Secreto'}[P.mode];
 $('#app').innerHTML=`<div class="top"><b>${title}</b><span class="coins">🪙 ${S.coins}</span></div>${P.sec?'<div class="bar"><i id="tb"></i></div>':''}<div class="dots">${dots}</div>
 <div class="q"><div class="ct">${CATS[q.c]||''} · Pregunta ${P.i+1} de ${P.qs.length}</div><div class="tx">${esc(q.q)}</div>${P.hint?`<p>💡 ${esc(q.h||'Pensalo bien...')}</p>`:''}</div>${opts}
 ${P.mode=='lvl'||P.mode=='cat'?`<div class="row c"><button class="chip" data-a="h1" ${S.coins<10||P.hint?'disabled':''}>💡 Pista 10</button><button class="chip" data-a="h2" ${S.coins<15||P.off.length?'disabled':''}>✂️ Quitar 1 · 15</button><button class="chip" data-a="h3" ${S.coins<30?'disabled':''}>🔄 Cambiar · 30</button></div>`:''}<p class="center"><button class="chip dim" data-a="quit">Salir</button></p>`}
let tmr=null;function timer(){clearInterval(tmr);let t=P.sec*10;const tot=t;tmr=setInterval(()=>{if(!P||P.answered){clearInterval(tmr);return}t--;const b=$('#tb');if(b)b.style.width=(t/tot*100)+'%';if(t==30)Snd.play('tictac');if(t<=0){clearInterval(tmr);answer(-1)}},100)}
function answer(oi){if(P.answered)return;P.answered=true;clearInterval(tmr);const q=P.qs[P.i],ok=oi==q.a;P.good[P.i]=ok;if(ok){P.ok++;Snd.play('acierto')}else Snd.play(oi<0?'tiempo_agotado':'error');
 document.querySelectorAll('.opt').forEach(b=>{const o=+b.dataset.o;b.disabled=true;if(o==q.a)b.classList.add('good');else if(o==oi)b.classList.add('wrong')});
 setTimeout(()=>{if(!P)return;P.i++;P.i<P.qs.length?R.play():finish()},P.mode=='evt'||P.mode=='sec'?900:1100)}
function finish(){const n=P.qs.length,ok=P.ok;let gain=0,pass=null;
 if(P.mode=='lvl'){pass=ok>=3;gain=ok*2+(pass?10:0)+(ok==5?20:0);if(pass){P.qs.forEach((q,i)=>{if(P.good[i]&&!S.used.includes(q.id))S.used.push(q.id)});S.lvl[P.n]=Math.max(S.lvl[P.n]||0,ok)}}
 else if(P.mode=='cat')gain=ok*2;else if(P.mode=='evt')gain=ok*5+(ok>=8?30:0);else gain=ok*15+(ok==8?150:0);
 S.day.ans+=n;S.day.ok+=ok;if(P.mode=='lvl'&&pass)S.day.pass++;S.coins+=gain;save();
 Snd.music('');if(P.mode=='lvl')Snd.play(!pass?'nivel_no_superado':ok==5?'perfecto_5de5':'nivel_superado');else Snd.play(ok>=n/2?'nivel_superado':'nivel_no_superado');
 const res={mode:P.mode,n:P.n,c:P.c,ok,total:n,gain,pass};lastRes=res;P=null;go('res',res);Stage.react(res.mode=='lvl'?(!pass?'s':ok==5?'x':'h'):ok>=n/2?'h':'s')}
R.res=r=>{const star=r.mode=='lvl'?(r.ok>=5?'★★★':r.ok==4?'★★☆':r.ok==3?'★☆☆':'☆☆☆'):'';const win=r.mode=='lvl'?r.pass:r.ok>=r.total/2;
 $('#app').innerHTML=top()+`<div class="center"><h1>${r.mode=='lvl'?(r.pass?'¡Nivel superado!':'No pasaste... ¡probá de nuevo!'):win?'¡Muy bien!':'Casi...'}</h1><div class="stars">${star}</div><p>Aciertos: <b>${r.ok} de ${r.total}</b> · Ganaste <b style="color:var(--coin)">🪙 ${r.gain}</b>${r.ok==5&&r.mode=='lvl'?'<br>¡Perfecto! +20 extra':''}</p></div>
 <div class="row c">${r.mode=='lvl'?`${r.pass&&r.n<100?`<button class="pri" data-a="play" data-n="${r.n+1}">Siguiente nivel ▶</button>`:''}<button data-a="play" data-n="${r.n}">↻ Reintentar</button><button data-a="levels">Niveles</button>`:`<button data-a="home" class="pri">Menú</button>`}<button data-a="home">🏠 Inicio</button></div>`};

// ---------- Tienda ----------
R.shop=()=>{const tab=SH.tab;let h=top('<button data-a="home">🏠</button>')+`<div class="tabs"><button class="${tab=='av'?'on':''}" data-a="stab" data-t="av">🧑 Avatares</button><button class="${tab=='pet'?'on':''}" data-a="stab" data-t="pet">🐾 Mascotas</button><button class="${tab=='acc'?'on':''}" data-a="stab" data-t="acc">🎒 Accesorios</button></div>`;
 if(tab=='av')h+='<div class="grid">'+avatarList(S.gen).map(a=>{const own=S.own.av.includes(a.id),sel=S.av==a.id;return`<div class="card" style="border-color:${RAR[a.r]}" data-a="pv" data-t="av" data-id="${a.id}"><div class="nm">${esc(a.n)}</div><span class="tag" style="background:${RAR[a.r]}">${a.r}</span><div class="pr">${own?'Tuyo':'🪙 '+a.p}</div>${own?`<button class="chip ${sel?'gold':''}" data-a="use" data-t="av" data-id="${a.id}">${sel?'En uso':'Usar'}</button>`:`<button class="chip" data-a="buy" data-t="av" data-id="${a.id}" ${S.coins<a.p?'disabled':''}>Comprar</button>`}</div>`}).join('')+'</div>';
 else if(tab=='pet')h+='<div class="grid">'+PETS.map(p=>{const own=S.own.pet.includes(p.id),sel=S.pet==p.id;return`<div class="card" style="border-color:${RAR[p.r]}" data-a="pv" data-t="pet" data-id="${p.id}"><div class="nm">${esc(own?petName(p.id):p.n)}</div><span class="tag" style="background:${RAR[p.r]}">${p.r}</span><div class="pr">${own?'Tuya':'🪙 '+p.p}</div>${own?`<div class="row"><button class="chip ${sel?'gold':''}" data-a="use" data-t="pet" data-id="${p.id}">${sel?'En uso':'Usar'}</button>${p.fixed?'':`<button class="chip" data-a="ren" data-id="${p.id}">✏️ 50</button>`}</div>`:`<button class="chip" data-a="buy" data-t="pet" data-id="${p.id}" ${S.coins<p.p?'disabled':''}>Comprar</button>`}</div>`}).join('')+'</div>';
 else{const a=curAv(),pp=S.pet;h+=`<p class="sm">Los accesorios funcionan solo con su avatar o mascota. Los apagados no sirven para el que estás usando.</p><h2>Para tu avatar</h2><div class="grid">`+Object.entries(AV_ACC).map(([k,x])=>{const own=S.own.aacc.includes(k),fit=avAccFits(k,a);return`<div class="card ${fit?'':'dim'}" data-a="${fit?'':'nofit'}" data-k="${k}" data-t="av"><div class="nm">${x.ic} ${x.n}</div><div class="sm">Para: ${esc(avAccWho(k))}</div><div class="pr">${own?'Tuyo':'🪙 '+x.p}</div>${own?'':`<button class="chip" data-a="buy" data-t="aacc" data-id="${k}" ${S.coins<x.p?'disabled':''}>Comprar</button>`}</div>`}).join('')+`</div><h2>Para tu mascota</h2><div class="grid">`+Object.entries(PET_ACC).map(([k,x])=>{const own=ownsPacc(k),fit=x.pets.includes(pp);return`<div class="card ${fit?'':'dim'}" data-a="${fit?'':'nofit'}" data-k="${k}" data-t="pet"><div class="nm">${x.ic} ${x.n}</div><div class="sm">Para ${esc(x.who)}</div><div class="pr">${own?(x.gift&&!S.own.pacc.includes(k)?'Regalo del Goat 🎁':'Tuyo'):'🪙 '+x.p}</div>${own?'':`<button class="chip" data-a="buy" data-t="pacc" data-id="${k}" ${S.coins<x.p?'disabled':''}>Comprar</button>`}</div>`}).join('')+'</div>'}
 $('#app').innerHTML=h;if(tab=='pet')Stage.show('pet');else Stage.show('av');if(!Stage.pre){Stage.pre=1;Stage.ensure('pet');setTimeout(()=>{if(Stage.booted.pet)Stage.post('pet',{t:'pre',keys:PETS.map(p=>p.id)})},1500)}};
function buy(t,id){let p,name;if(t=='av'){const a=avatarById(id);p=a.p;name=a.n}else if(t=='pet'){p=PET_BY[id].p;name=PET_BY[id].n}else if(t=='aacc'){p=AV_ACC[id].p;name=AV_ACC[id].n}else{p=PET_ACC[id].p;name=PET_ACC[id].n}
 if(S.coins<p){toast('Te faltan monedas 🪙');return}S.coins-=p;const rare=(t=='av'?avatarById(id).r:t=='pet'?PET_BY[id].r:'Común');
 if(t=='av')S.own.av.push(id);else if(t=='pet')S.own.pet.push(id);else if(t=='aacc')S.own.aacc.push(id);else S.own.pacc.push(id);save();
 Snd.play(rare=='Raro'||rare=='Legendario'?'desbloqueo':'compra');toast('¡Compraste '+name+'!'+(id=='goatN'?' 🎁 La pelota viene de regalo':''));go('shop')}

// ---------- Misiones, eventos, anuncios, ajustes ----------
R.miss=()=>{newDay();$('#app').innerHTML=top('<button data-a="home">🏠</button>')+`<h2>Misiones de hoy</h2>`+MISS.map(m=>{const v=Math.min(S.day[m.id],m.goal),done=v>=m.goal,cl=S.day.claimed.includes(m.id);return`<div class="card" style="margin:8px 0"><div class="mission"><div><b>${m.t}</b><div class="sm">${v} / ${m.goal} · Premio 🪙 ${m.rw}</div></div>${cl?'<span class="sm">✓ Cobrada</span>':`<button class="chip ${done?'gold':''}" ${done?'':'disabled'} data-a="claim" data-id="${m.id}">Cobrar</button>`}</div></div>`}).join('')+'<p class="sm">Se renuevan todos los días.</p>'};
R.events=()=>{newDay();$('#app').innerHTML=top('<button data-a="home">🏠</button>')+`<h2>Eventos</h2><div class="card" style="margin:8px 0"><b>⚡ Relámpago</b><p class="sm">10 preguntas, 12 segundos cada una. 🪙 5 por acierto y +30 si hacés 8 o más. ${S.day.evt?'Hoy ya jugaste: otra vez cuesta 20 🪙.':'Hoy es gratis.'}</p><button class="pri" data-a="evt">Jugar</button></div>
 <div class="card" style="margin:8px 0"><b>🔒 Secreto</b><p class="sm">8 preguntas difíciles. 🪙 15 por acierto y +150 si acertás todas.</p>${S.secret?'<button class="pri" data-a="sec">Jugar</button>':'<button class="gold" data-a="unl" '+(S.coins<150?'disabled':'')+'>Desbloquear por 150 🪙</button>'}</div>`};
function ad(){newDay();if(S.day.ads>=5){toast('Ya viste los 5 anuncios de hoy');return}let t=3;modal(`<h2>📺 Anuncio (simulado)</h2><p>Acá irá un anuncio real. Esperá <b id="cd">3</b> s...</p>`);const iv=setInterval(()=>{t--;const c=$('#cd');if(c)c.textContent=t;if(t<=0){clearInterval(iv);closeModal();S.day.ads++;addCoins(15);Snd.play('anuncio_recompensa');toast('+15 🪙 ('+S.day.ads+'/5 hoy)');if(cur=='home')go('home')}},1000)}
R.sets=()=>{$('#app').innerHTML=top('<button data-a="home">🏠</button>')+`<h2>Ajustes</h2><div class="card" style="margin:8px 0"><div class="mission"><b>Sonido</b><button class="chip" data-a="snd">${Snd.on?'🔊 Activado':'🔇 Apagado'}</button></div></div>
 ${MOSTRAR_CONTADOR?`<div class="card" style="margin:8px 0"><b>Preguntas cargadas</b><div class="sm">${ALLQ.length} de ${META_PREGUNTAS}</div></div>`:''}
 <div class="card" style="margin:8px 0"><b>Sonidos propios cargados</b><div class="sm">${Object.keys(Snd.files).length} de ${Object.values(SND_IDS).flat().length}</div></div>
 <p class="center"><button data-a="resetq" class="chip">Reiniciar progreso</button></p>`};
function nameModal(id){modal(`<h2>✏️ Nombre de tu mascota</h2><p class="sm">Hasta 12 letras. Cambiarlo cuesta 50 🪙.</p><input id="pn" maxlength="12" value="${esc(petName(id))}"><div class="row c"><button class="gold" data-a="rename" data-id="${id}">Guardar (50 🪙)</button><button data-a="close">Cancelar</button></div>`)}
function okName(s){const n=s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[0431@$5]/g,c=>({'0':'o','4':'a','3':'e','1':'i','@':'a','$':'s','5':'s'}[c])).replace(/[^a-z]/g,'');return!MALAS.some(w=>n.includes(w.normalize('NFD').replace(/[\u0300-\u036f]/g,'')))}

// ---------- Acciones (clicks) ----------
const A={
 gen:d=>{document.querySelectorAll('.gb').forEach(b=>b.classList.toggle('on',b.dataset.g==d.g));A.g=d.g;document.querySelectorAll('.gb').forEach(b=>b.style.borderColor=b.dataset.g==d.g?'#ffc933':'')},
 start:()=>{const nm=($('#nm').value||'').trim();if(!nm){toast('Escribí tu nombre');return}if(!A.g){toast('Elegí una opción');return}S=def();S.name=nm.slice(0,14);S.gen=A.g;const a=avatarList(S.gen)[0];S.av=a.id;S.own.av=[a.id];save();Snd.play('desbloqueo');go('home')},
 home:()=>{Snd.music('musica_menu');go('home')},levels:()=>go('levels'),cats:()=>go('cats'),shop:()=>go('shop'),miss:()=>go('miss'),events:()=>go('events'),sets:()=>go('sets'),ad,
 play:d=>{const n=+d.n;if(n>maxLv())return;startGame('lvl',{n})},playcat:d=>startGame('cat',{c:d.c}),
 ans:d=>answer(+d.o),
 h1:()=>{if(S.coins<10||P.hint)return;S.coins-=10;save();P.hint=true;Snd.play('pista');paintQ()},
 h2:()=>{if(S.coins<15||P.off.length)return;const q=P.qs[P.i];S.coins-=15;save();const wr=[0,1,2,3].filter(i=>i!=q.a);P.off=[shuffle(wr)[0]];Snd.play('pista');paintQ()},
 h3:()=>{if(S.coins<30)return;S.coins-=30;save();const ex=P.qs.map(q=>q.id);const nq=pick(1,P.mode=='lvl'?diffsFor(P.n):null,P.mode=='cat'?P.c:null,ex)[0];if(nq){P.qs[P.i]=nq;Snd.play('pista');R.play()}else{S.coins+=30;save();toast('No hay otra pregunta')}},
 quit:()=>{if(confirm('¿Salir? Perdés el progreso de esta ronda.')){clearInterval(tmr);P=null;Snd.music('menu');go('home')}},
 stage:d=>{Stage.show(d.k);chips()},aeq:d=>{if(S.eq.av==d.k){S.eq.av=null;Stage.post('av',{t:'equip',k:null})}else{S.eq.av=d.k;Stage.post('av',{t:'equip',k:d.k})}save();chips()},ause:()=>Stage.post('av',{t:'use'}),pacc:d=>Stage.post('pet',{t:'acc',k:d.k}),
 stab:d=>{SH.tab=d.t;go('shop')},pv:(d,el,ev)=>{if(ev.target.closest('button'))return;if(d.t=='av'){Stage.show('av',avatarById(d.id))}else{Stage.show('pet',d.id)}},
 buy:d=>buy(d.t,d.id),use:d=>{if(d.t=='av'){S.av=d.id;S.eq.av=null}else S.pet=d.id;save();Snd.play('click');go('shop');toast('Listo ✔')},nofit:d=>{if(d.t=='av')toast('Solo funciona para: '+avAccWho(d.k));else toast('Solo funciona para '+PET_ACC[d.k].who)},
 ren:d=>nameModal(d.id),close:closeModal,rename:d=>{const v=($('#pn').value||'').trim();if(!v){toast('Escribí un nombre');return}if(v.length>12){toast('Máximo 12 letras');return}if(!okName(v)){toast('Ese nombre no está permitido');return}if(S.coins<50){toast('Te faltan monedas 🪙');return}S.coins-=50;S.names[d.id]=v;save();closeModal();Snd.play('compra');toast('¡Tu mascota ahora se llama '+v+'!');go('shop')},
 claim:d=>{const m=MISS.find(x=>x.id==d.id);if(S.day[m.id]<m.goal||S.day.claimed.includes(m.id))return;S.day.claimed.push(m.id);addCoins(m.rw);Snd.play('mision_completa');toast('+'+m.rw+' 🪙');go('miss')},
 evt:()=>{newDay();if(S.day.evt){if(S.coins<20){toast('Te faltan 20 🪙');return}S.coins-=20}S.day.evt=true;save();Snd.play('evento_inicio');startGame('evt',{})},
 unl:()=>{if(S.coins<150)return;S.coins-=150;S.secret=true;save();Snd.play('desbloqueo');go('events')},sec:()=>{Snd.play('evento_inicio');startGame('sec',{})},
 snd:()=>{Snd.set(!Snd.on);S.sound=Snd.on;save();go('sets')},
 resetq:()=>{if(confirm('¿Seguro que querés borrar todo tu progreso? No se puede deshacer.')){try{localStorage.removeItem(KEY)}catch(e){}S=null;Stage.over=null;location.reload()}}
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||!b.dataset.a)return;if(b.tagName!='BUTTON'&&e.target.closest('button')&&b.dataset.a=='pv')return;if(b.tagName=='BUTTON'||b.classList.contains('card'))Snd.play('click');const f=A[b.dataset.a];if(f)f(b.dataset,b,e)});

// ---------- Botón "atrás" del teléfono ----------
let exitArmed=false,exitT=null,lastRes=null;
const BACK={levels:'home',cats:'home',shop:'home',miss:'home',events:'home',sets:'home'};
const guard=()=>{try{history.pushState({g:1},'')}catch(e){}};
addEventListener('popstate',()=>{
 if($('#modal').classList.contains('on')){closeModal();guard();return}
 if(cur=='play'){guard();if(confirm('¿Salir? Perdés el progreso de esta ronda.')){clearInterval(tmr);P=null;Snd.music('musica_menu');go('home')}return}
 const t=cur=='res'?(lastRes&&lastRes.mode=='lvl'?'levels':'home'):BACK[cur];
 if(t){guard();if(t=='home')Snd.music('musica_menu');go(t);return}
 if(exitArmed){clearTimeout(exitT);history.back();return}
 exitArmed=true;toast('Tocá atrás otra vez para salir');guard();clearTimeout(exitT);exitT=setTimeout(()=>{exitArmed=false},2200)});
try{history.replaceState({g:0},'');guard()}catch(e){}

// ---------- Arranque ----------
async function boot(){
 await Promise.all(QFILES.map(f=>new Promise(r=>{const s=document.createElement('script');s.src='questions/'+f;s.onload=()=>r();s.onerror=()=>r();document.head.appendChild(s)})));
 const seen=new Set();QB.forEach(b=>b.forEach(r=>{const id=hash(r[2]);if(seen.has(id))return;seen.add(id);ALLQ.push({id,c:r[0],d:r[1],q:r[2],o:r[3],a:r[4],h:r[5]||''})}));
 S=load();setTimeout(()=>Snd.scan().then(()=>{Object.keys(Stage.booted).forEach(k=>Stage.booted[k]&&Stage.post(k,{t:'cfg',files:Snd.files}))}),3500);
 if(!S){R.welcome();return}
 Snd.set(S.sound!==false);newDay();S.coins=S.coins|0;go('home')}
boot();
})();
