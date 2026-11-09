/* Ses -> ağız şekli (viseme) zaman çizelgesi.
   Şekiller: 0 kapalı, 1 küçük açık (ünsüz/sessiz ünlü), 2 geniş açık (a/e), 3 yuvarlak (o/u)
   Tarayıcıda: LipSync.analyze(Float32Array, sampleRate) | node'da: require('./lipsync.js')
   Çıktı: [{t:saniye, v:0-3}, ...]  (33 ms adım) */
(function(root){
  function analyze(x, sr, opt){
    opt = Object.assign({hop:0.033, win:0.045, minHold:2}, opt||{});
    const hop=Math.round(sr*opt.hop), win=Math.round(sr*opt.win), n=Math.max(0,Math.floor((x.length-win)/hop));
    const rmsA=new Float32Array(n), zcrA=new Float32Array(n), lowA=new Float32Array(n);
    const a=1-Math.exp(-2*Math.PI*700/sr); let y=0;
    const low=new Float32Array(x.length);
    for(let i=0;i<x.length;i++){y+=a*(x[i]-y);low[i]=y}
    for(let f=0;f<n;f++){
      let s=0,sl=0,z=0;const o=f*hop;
      for(let i=0;i<win;i++){const v=x[o+i];s+=v*v;sl+=low[o+i]*low[o+i];if(i&&(v>=0)!==(x[o+i-1]>=0))z++}
      rmsA[f]=Math.sqrt(s/win);lowA[f]=s>0?Math.sqrt(sl/win)/Math.sqrt(s/win):0;zcrA[f]=z/win*sr/2/ (sr/2); // oran
    }
    const sorted=Array.from(rmsA).sort((p,q)=>p-q);
    const floor=sorted[Math.floor(n*0.1)]||0, peak=sorted[Math.floor(n*0.95)]||1e-6;
    let v=new Array(n);
    for(let f=0;f<n;f++){
      const e=Math.min(1,Math.max(0,(rmsA[f]-floor)/Math.max(1e-6,peak-floor)));
      let k=0;
      if(e>=0.12){
        if(zcrA[f]>0.3) k=1;
        else if(lowA[f]>0.9 && e>0.2) k=3;
        else if(e>0.35) k=2;
        else k=1;
      }
      v[f]=k;
    }
    // titremeyi azalt: tek karelik sapmaları komşuya çek
    for(let f=1;f<n-1;f++) if(v[f]!==v[f-1]&&v[f-1]===v[f+1]) v[f]=v[f-1];
    // en az bekleme
    let run=0;for(let f=1;f<n;f++){if(v[f]===v[f-1])run++;else{if(run<opt.minHold-1&&f>=2)v[f-1]=v[f];run=0}}
    return v.map((k,i)=>({t:+(i*opt.hop).toFixed(3),v:k}));
  }
  const api={analyze};
  if(typeof module!=='undefined')module.exports=api;else root.LipSync=api;
})(typeof self!=='undefined'?self:this);
