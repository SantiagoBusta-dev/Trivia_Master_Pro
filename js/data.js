// ===== Datos del juego: categorías, catálogo de la tienda, sonidos =====
const QB=window.QB||[];window.QB=QB;
const CATS={ciencia:'🔬 Ciencia',geografia:'🌎 Geografía',historia:'📜 Historia',tecnologia:'💻 Tecnología',deportes:'⚽ Deportes',entretenimiento:'🎬 Entretenimiento',gaming:'🎮 Gaming',general:'🧠 Cultura general',matematica:'➗ Matemática'};
const RAR={'Común':'#9aa4b2','Especial':'#3ddc97','Raro':'#6fa8ff','Legendario':'#ffc933'};
const META_PREGUNTAS=500;          // total objetivo de preguntas
const MOSTRAR_CONTADOR=true;       // cambiar a false cuando haya 500

// --- Avatares: el orden coincide con el visor 3D (viewer_avatares.html)
const AV_NAMES={m:['Explorador','Gamer','Científico','Futbolista','Astronauta','Ninja','Mago','Superhéroe','Payaso','Payaso Malvado'],
                f:['Exploradora','Gamer','Científica','Deportista','Astronauta','Ninja','Maga','Superheroína','Payasa','Payasa Malvada']};
const AV_RAR=['Común','Común','Especial','Especial','Raro','Raro','Raro','Legendario','Raro','Legendario'];
const AV_PRICE=[0,150,500,500,1200,1200,1200,5000,1200,5000];
function avatarList(g){const out=[];for(let i=0;i<10;i++){const gg=g=='o'?(i%2?'f':'m'):g;out.push({id:gg+i,g:gg,i,n:AV_NAMES[gg][i],r:AV_RAR[i],p:AV_PRICE[i]})}return out}
function avatarById(id){const g=id[0],i=+id.slice(1);return{id,g,i,n:AV_NAMES[g][i],r:AV_RAR[i],p:AV_PRICE[i]}}

// --- Mascotas: id = clave del visor 3D (viewer_mascotas.html)
const PETS=[
 {id:'cat',n:'Gato naranja',r:'Común',p:0},{id:'rab',n:'Conejo blanco',r:'Común',p:100},{id:'sh',n:'Perro Shiba',r:'Común',p:250},
 {id:'cat2',n:'Gato negro',r:'Especial',p:400},{id:'cat3',n:'Gato gris',r:'Especial',p:400},{id:'rab2',n:'Conejo marrón',r:'Especial',p:450},{id:'rab3',n:'Conejo gris',r:'Especial',p:450},{id:'sh2',n:'Perro negro',r:'Especial',p:500},{id:'deerR',n:'Ciervo',r:'Especial',p:600},
 {id:'stag',n:'Ciervo macho',r:'Raro',p:1000},{id:'fox',n:'Zorro',r:'Raro',p:1200},{id:'koala',n:'Koala',r:'Raro',p:1200},{id:'husky',n:'Husky',r:'Raro',p:1300},{id:'wolf',n:'Lobo',r:'Raro',p:1400},{id:'alpaca',n:'Alpaca',r:'Raro',p:1500},{id:'panda',n:'Panda',r:'Raro',p:1500},
 {id:'goatN',n:'El Goat',r:'Legendario',p:5000,fixed:true}];
const PET_BY={};PETS.forEach(p=>PET_BY[p.id]=p);
// accesorios de mascotas
const PET_ACC={yarn:{n:'Ovillo',ic:'🧶',p:150,pets:['cat','cat2','cat3'],who:'los gatos'},laser:{n:'Láser',ic:'🔴',p:200,pets:['cat','cat2','cat3'],who:'los gatos'},
 bone:{n:'Hueso',ic:'🦴',p:150,pets:['sh','sh2','husky','fox','wolf'],who:'los perros, el zorro y el lobo'},ball:{n:'Pelota',ic:'⚽',p:0,pets:['goatN'],who:'el Goat (viene de regalo)',gift:'goatN'},
 carrot:{n:'Zanahoria',ic:'🥕',p:150,pets:['rab','rab2','rab3'],who:'los conejos'},apple:{n:'Manzana',ic:'🍎',p:150,pets:['deerR','stag','alpaca'],who:'los ciervos y la alpaca'},
 euc:{n:'Eucalipto',ic:'🌿',p:200,pets:['koala'],who:'el koala'},bamboo:{n:'Bambú',ic:'🎋',p:200,pets:['panda'],who:'el panda'},trunk:{n:'Tronco',ic:'🪵',p:300,pets:['koala','panda'],who:'el koala y el panda'}};
// accesorios de avatares: who = lista de [género|'*', índice de avatar]
const AV_ACC={brujula:{n:'Brújula',ic:'🧭',p:250,who:[['*',0]]},linterna:{n:'Linterna',ic:'🔦',p:300,who:[['*',0]]},control:{n:'Joystick',ic:'🎮',p:350,who:[['*',1]]},probeta:{n:'Probeta',ic:'🧪',p:400,who:[['*',2]]},
 pelota:{n:'Pelota',ic:'⚽',p:300,who:[['m',3]]},raqueta:{n:'Raqueta',ic:'🎾',p:450,who:[['f',3]]},trofeo:{n:'Trofeo',ic:'🏆',p:600,who:[['*',3]]},bandera:{n:'Bandera',ic:'🚩',p:450,who:[['*',4]]},
 shuriken:{n:'Shuriken',ic:'⭐',p:500,who:[['*',5]]},varita:{n:'Varita',ic:'🪄',p:600,who:[['*',6]]},libro:{n:'Libro',ic:'📖',p:500,who:[['*',6]]},escudo:{n:'Escudo',ic:'🛡️',p:700,who:[['*',7]]},
 globos:{n:'Globos',ic:'🎈',p:400,who:[['*',8]]},bocina:{n:'Bocina',ic:'📯',p:350,who:[['*',8]]},globo:{n:'Globo rojo',ic:'🎈',p:600,who:[['*',9]]}};
function avAccFits(k,av){return AV_ACC[k].who.some(([g,i])=>i==av.i&&(g=='*'||g==av.g))}
function avAccWho(k){return AV_ACC[k].who.map(([g,i])=>g=='*'?AV_NAMES.m[i]+(AV_NAMES.f[i]!=AV_NAMES.m[i]?' / '+AV_NAMES.f[i]:''):AV_NAMES[g][i]).join(', ')}

// --- Sonidos: carpeta -> nombres (sin extensión). Deben existir como sonidos/<carpeta>/<nombre>.mp3
const SND_IDS={
 animales:['gato','conejo','perro','husky','zorro','lobo','ciervo','ciervo_macho','alpaca','cabra','koala','panda','gato_negro','gato_gris','conejo_marron','conejo_gris','perro_negro','mascota_feliz','mascota_triste'],
 mascotas_accesorios:['pelota_patada','pelota_rebote','gol_hinchada','ovillo_golpe','comer_hueso','comer_crunch','comer_manzana','comer_hojas','tronco_abrazo','item_aparece','laser_punto'],
 avatares_accesorios:['av_brujula','av_linterna','av_joystick','av_probeta','av_patada_pelota','av_trofeo','av_bandera','av_shuriken','av_varita','av_libro','av_escudo','av_raqueta_saque','av_globos_retorcer','av_globos_listo','av_bocina','av_risa_malvada','av_globo_soltar'],
 juego_principales:['acierto','error','moneda','nivel_superado','perfecto_5de5','compra'],
 juego_extras:['click','desbloqueo','mision_completa','evento_inicio','tictac','tiempo_agotado','pista','anuncio_recompensa','nivel_no_superado'],
 musica:['musica_menu','musica_juego']};
// --- Filtro de nombres de mascota
const MALAS=['puta','puto','mierda','verga','pija','concha','pelotud','boludo','cagar','culo','sexo','nazi','hitler','pene','teta','zorra','trola','idiota','estupid','imbecil','carajo','forro','mongol','retrasad','maric','joder','coño','follar','porno','violar','mata'];
