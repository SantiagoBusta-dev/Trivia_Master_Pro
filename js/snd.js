// ===== Sonidos: usa los archivos de /sonidos si existen; si no, usa sonidos sintéticos =====
const Snd=(()=>{
  const files={};let ctx=null,on=true,musicEl=null,musicId='';
  const AC=()=>{try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();if(ctx.state=='suspended')ctx.resume()}catch(e){}return ctx};
  function tone(f0,f1,d,type='sine',vol=.18,t0=0){const c=AC();if(!c)return;const t=c.currentTime+t0,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(Math.max(30,f1),t+d);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.02)}
  const seq=(arr,type,vol)=>arr.forEach(([f,d,t])=>tone(f,f,d,type||'triangle',vol||.17,t));
  const SY={
    acierto:()=>{tone(660,990,.14,'triangle');tone(990,1320,.2,'triangle',.18,.12)},
    error:()=>{tone(240,110,.4,'sawtooth',.2);if(navigator.vibrate)navigator.vibrate([120,60,120])},
    moneda:()=>{tone(1250,1250,.07,'square',.1);tone(1800,1800,.16,'square',.1,.07)},
    nivel_superado:()=>seq([[523,.14,0],[659,.14,.13],[784,.14,.26],[1047,.34,.39]]),
    perfecto_5de5:()=>seq([[523,.12,0],[659,.12,.11],[784,.12,.22],[1047,.12,.33],[1319,.12,.44],[1568,.5,.55]],'square',.12),
    compra:()=>{[0,.07,.14,.21].forEach((t,i)=>tone(1100+i*250,1100+i*250,.1,'square',.08,t))},
    click:()=>tone(900,700,.05,'square',.07),
    desbloqueo:()=>seq([[784,.1,0],[988,.1,.1],[1175,.1,.2],[1568,.4,.3]],'sine',.18),
    mision_completa:()=>seq([[660,.12,0],[880,.28,.12]]),
    evento_inicio:()=>{tone(300,900,.5,'sawtooth',.14);tone(900,900,.2,'square',.1,.5)},
    tictac:()=>tone(1000,900,.04,'square',.08),
    tiempo_agotado:()=>tone(180,120,.6,'sawtooth',.2),
    pista:()=>{tone(1400,1700,.12,'sine',.14)},
    anuncio_recompensa:()=>{tone(1250,1250,.07,'square',.1);tone(1800,1800,.07,'square',.1,.08);tone(2400,2400,.14,'square',.1,.16)},
    nivel_no_superado:()=>seq([[440,.2,0],[370,.2,.2],[294,.45,.4]],'triangle',.18)
  };
  async function scan(){const jobs=[];for(const [f,arr] of Object.entries(SND_IDS))for(const id of arr){const u=`sonidos/${f}/${id}.mp3`;jobs.push(fetch(u,{method:'HEAD'}).then(r=>{if(r.ok)files[id]=u}).catch(()=>{}))}await Promise.all(jobs);return files}
  function play(id){if(!on)return;if(files[id]){try{const a=new Audio(files[id]);a.volume=.9;a.play().catch(()=>{})}catch(e){}return}if(SY[id])SY[id]()}
  function music(id){if(!on||!files[id]){stopMusic();return}if(musicId==id&&musicEl&&!musicEl.paused)return;stopMusic();musicId=id;try{musicEl=new Audio(files[id]);musicEl.loop=true;musicEl.volume=.25;musicEl.play().catch(()=>{})}catch(e){}}
  function stopMusic(){if(musicEl){musicEl.pause();musicEl=null}musicId=''}
  return{scan,play,music,stopMusic,files,get on(){return on},set(v){on=v;if(!v)stopMusic()},tone}
})();
