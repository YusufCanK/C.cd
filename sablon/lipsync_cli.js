#!/usr/bin/env node
// Kullanım: node sablon/lipsync_cli.js ses.wav  -> stdout'a viseme dizisi (JSON, 33 ms adım)
const fs=require('fs'),L=require('./lipsync.js');
const b=fs.readFileSync(process.argv[2]);let off=12;while(b.toString('ascii',off,off+4)!=='data')off+=8+b.readUInt32LE(off+4);off+=8;
const n=(b.length-off)/2,x=new Float32Array(n);for(let i=0;i<n;i++)x[i]=b.readInt16LE(off+i*2)/32768;
process.stdout.write(JSON.stringify(L.analyze(x,16000).map(q=>q.v)));
