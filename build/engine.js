"use strict";
/* ============================================================
   LEARNING PACKAGE ENGINE
   Reads the global CHAPTER object defined by the chapter file
   that is concatenated ahead of this one at build time.
   ============================================================ */

/* ---------- 0 · storage (every access guarded) ---------- */
var KEY = "lp." + CHAPTER.id + ".v1";
function load(){ try{ var r=localStorage.getItem(KEY); return r?JSON.parse(r):null; }catch(e){ return null; } }
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(STATE)); }catch(e){} }
var STATE = load() || { lang:"en", theme:null, read:{}, cov:{}, current:(CHAPTER.nodes[0]||{}).id };

/* ---------- 1 · strings ---------- */
var BASE = {
  "ui.theme":["Dark","มืด"], "ui.themeLight":["Light","สว่าง"],
  "ui.reset":["Reset progress","ล้างความคืบหน้า"],
  "nav.learn":["Learn","เรียน"], "nav.forge":["Forge","ฝึก"],
  "map.eyebrow":["The knowledge map","แผนที่ความรู้"],
  "map.fig":["prerequisite graph · click a node to jump to it","ผังลำดับความรู้ · คลิกที่โหนดเพื่อไปยังหัวข้อนั้น"],
  "map.progress":["Progress","ความคืบหน้า"], "map.progressSub":["nodes read","โหนดที่อ่านแล้ว"],
  "map.s1":["Upcoming","ยังไม่ถึง"],
  "map.s1d":["Its prerequisites are not read yet. Advisory only — the content is right below.","ยังไม่ได้อ่านหัวข้อที่ควรรู้ก่อน เป็นเพียงคำแนะนำ เนื้อหาอยู่ด้านล่างแล้ว"],
  "map.s2":["Next up","ถัดไป"], "map.s2d":["Prerequisites done. This is where to go.","อ่านหัวข้อก่อนหน้าครบแล้ว ไปต่อที่นี่"],
  "map.s3":["Read","อ่านแล้ว"], "map.s3d":["You have scrolled through it.","เลื่อนผ่านเนื้อหานี้แล้ว"],
  "map.s4":["Trained","ฝึกครบ"], "map.s4d":["Its methods answered correctly in the Forge.","ตอบวิธีของหัวข้อนี้ถูกในห้องฝึกแล้ว"],
  "study.methods":["Methods trained by this node","วิธีที่ฝึกจากโหนดนี้"],
  "lab.title":["Lab","ห้องทดลอง"],
  "lab.guided":["Guided tour","ทัวร์นำชม"], "lab.sandbox":["Sandbox","เล่นอิสระ"],
  "lab.prev":["Back","ย้อน"], "lab.next":["Next","ถัดไป"], "lab.skip":["Skip to sandbox","ข้ามไปเล่นอิสระ"],
  "lab.play":["Play","เล่น"], "lab.pause":["Pause","หยุด"], "lab.reset":["Reset","เริ่มใหม่"],
  "lab.step":["Step","ขั้นที่"],
  "forge.eyebrow":["The forge","ห้องฝึก"],
  "forge.title":["Train the method, not the question","ฝึกที่วิธี ไม่ใช่ที่ข้อสอบ"],
  "forge.lede":["A question is disposable. The method it exercises is the thing worth owning. Configure a blueprint and it sweeps the method × surface matrix, so no method escapes being asked in every disguise it can wear.",
                "ข้อสอบใช้แล้วทิ้งได้ แต่วิธีทำที่อยู่เบื้องหลังต่างหากที่ต้องทำให้เป็นของตัวเอง ตั้งค่าพิมพ์เขียวไว้ ระบบจะไล่ให้ครบทั้งตารางวิธี × รูปแบบ เพื่อให้ทุกวิธีถูกถามครบทุกมุมที่โจทย์พลิกได้"],
  "forge.methods":["Methods","วิธี"], "forge.surfaces":["Surfaces","รูปแบบคำถาม"],
  "forge.mode":["Mode","โหมด"], "forge.modeCov":["Coverage sweep","กวาดให้ครบ"],
  "forge.modeRnd":["Random mix","สุ่มผสม"], "forge.count":["Questions","จำนวนข้อ"],
  "forge.generate":["Generate","สร้างชุดข้อสอบ"],
  "forge.coverage":["Coverage matrix · correct answers per method and surface","ตารางความครอบคลุม · จำนวนข้อที่ตอบถูกแยกตามวิธีและรูปแบบ"],
  "forge.right":["Correct","ถูกต้อง"], "forge.wrong":["Not quite","ยังไม่ใช่"],
  "forge.pickFirst":["Select at least one method and one surface.","เลือกอย่างน้อยหนึ่งวิธีและหนึ่งรูปแบบ"],
  "foot.pkg":["Chapter package · works offline · no server","แพ็กเกจบทเรียน · ใช้งานออฟไลน์ · ไม่ต้องมีเซิร์ฟเวอร์"],
  /* per-subject source credit — picked at render time from CHAPTER.subject */
  "foot.src.physics":["Distilled from Physics Blueprint · 20 chapters","เนื้อหากลั่นจากสรุปฟิสิกส์ 20 บท"],
  "foot.src.math":["Distilled from ขมิ้นหนังสือ · 16 chapters","เนื้อหากลั่นจากสรุปคณิตศาสตร์ 16 บท"],
  "s.S-01":["Bare numeric","ตัวเลขล้วน"], "s.S-02":["Graph or figure","อ่านจากรูป"],
  "s.S-03":["Word problem","โจทย์บรรยาย"], "s.S-04":["Symbolic","เชิงสัญลักษณ์"],
  "s.S-05":["Reverse","ย้อนกลับ"]
};
var STR = {};
for(var bk in BASE) STR[bk]=BASE[bk];
if(CHAPTER.str) for(var ck in CHAPTER.str) STR[ck]=CHAPTER.str[ck];
function L(){ return STATE.lang==="th"?1:0; }
function t(k){ var e=STR[k]; return e?e[L()]:k; }
function tx(pair){
  var s=Array.isArray(pair)?pair[L()]:pair;
  /* {@noun} is filled by the active art skin, so one sentence reads
     "the apprentice" in one style and "the rider" in another. */
  return (typeof s==="string" && s.indexOf("{@")>=0 && typeof skinWords==="function") ? skinWords(s) : s;
}
function esc(v){ return String(v==null?"":v).replace(/&/g,"&amp;").replace(/</g,"&lt;")
                        .replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

/* ---------- 2 · helpers ---------- */
function ri(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function fmt(n){ return (Math.round(n*10)/10).toString(); }
function fmt2(n){ return (Math.round(n*100)/100).toString(); }
function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var x=a[i]; a[i]=a[j]; a[j]=x; } return a; }
function niceStep(range,target){
  if(!(range>0)) return 1;
  var raw=range/target, mag=Math.pow(10,Math.floor(Math.log(raw)/Math.LN10)), n=raw/mag;
  return (n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*mag;
}
function tk(n){ var r=Math.round(n*100)/100; return (Math.abs(r)<1e-9?0:r).toString(); }
var FT='fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10"';

/* Shared, fully scaled axis frame. Returns mapping functions. */
function axes(o,c){
  var X=function(v){ return c.x + (v-c.xmin)/(c.xmax-c.xmin)*c.w; };
  var Y=function(v){ return c.y + c.h - (v-c.ymin)/(c.ymax-c.ymin)*c.h; };
  /* title / xlab / ylab accept either a plain string or an ["EN","TH"] pair */
  if(c.title) o.push('<text x="'+c.x+'" y="'+(c.y-22)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5" letter-spacing="1.4">'+tx(c.title)+'</text>');
  var ys=niceStep(c.ymax-c.ymin,c.yticks||5), y0v=Math.ceil(c.ymin/ys)*ys;
  for(var i=0;c.yticks!==0 && i<=Math.floor((c.ymax-y0v)/ys+1e-9);i++){
    var vv=y0v+i*ys, gy=Y(vv);
    o.push('<line x1="'+c.x+'" y1="'+gy+'" x2="'+(c.x+c.w)+'" y2="'+gy+'" stroke="var(--rule)" stroke-width="1"/>');
    o.push('<line x1="'+(c.x-5)+'" y1="'+gy+'" x2="'+c.x+'" y2="'+gy+'" stroke="var(--ink-faint)" stroke-width="1"/>');
    o.push('<text x="'+(c.x-9)+'" y="'+(gy+3.5)+'" '+FT+' text-anchor="end">'+tk(vv)+'</text>');
  }
  var xs=niceStep(c.xmax-c.xmin,c.xticks||5), x0v=Math.ceil(c.xmin/xs)*xs;
  for(var j=0;c.xticks!==0 && j<=Math.floor((c.xmax-x0v)/xs+1e-9);j++){
    var uu=x0v+j*xs, gx=X(uu);
    o.push('<line x1="'+gx+'" y1="'+c.y+'" x2="'+gx+'" y2="'+(c.y+c.h)+'" stroke="var(--rule)" stroke-width="1"/>');
    o.push('<line x1="'+gx+'" y1="'+(c.y+c.h)+'" x2="'+gx+'" y2="'+(c.y+c.h+5)+'" stroke="var(--ink-faint)" stroke-width="1"/>');
    o.push('<text x="'+gx+'" y="'+(c.y+c.h+19)+'" '+FT+' text-anchor="middle">'+tk(uu)+'</text>');
  }
  var zy = (c.ymin<0&&c.ymax>0) ? Y(0) : c.y+c.h;
  o.push('<line x1="'+c.x+'" y1="'+c.y+'" x2="'+c.x+'" y2="'+(c.y+c.h)+'" stroke="var(--ink-faint)" stroke-width="1.6"/>');
  o.push('<line x1="'+c.x+'" y1="'+zy+'" x2="'+(c.x+c.w)+'" y2="'+zy+'" stroke="var(--ink-faint)" stroke-width="1.6"/>');
  if(c.ylab) o.push('<text transform="rotate(-90 15 '+(c.y+c.h/2)+')" x="15" y="'+(c.y+c.h/2)+'" '+FT+' text-anchor="middle">'+tx(c.ylab)+'</text>');
  if(c.xlab) o.push('<text x="'+(c.x+c.w)+'" y="'+(c.y+c.h+36)+'" '+FT+' text-anchor="end">'+tx(c.xlab)+'</text>');
  return { X:X, Y:Y, zy:zy };
}

/* Caption inside a visualizer. ALWAYS takes an ["EN","TH"] pair, so no drawing
   can quietly ship English-only text. o=out array, kind picks the styling. */
function cap(o,x,y,pair,kind){
  var st = kind==="eyebrow"
      ? 'fill="var(--ink-faint)" font-size="10" letter-spacing="1.4"'
    : kind==="note"
      ? 'fill="var(--ink-faint)" font-size="10"'
    : kind==="accent"
      ? 'fill="var(--accent)" font-size="11"'
    : kind==="good"
      ? 'fill="var(--good)" font-size="10.5"'
    : kind==="strong"
      ? 'fill="var(--ink)" font-size="11.5" font-weight="600"'
      : 'fill="var(--ink-soft)" font-size="10.5"';
  var anchor = kind==="mid" ? ' text-anchor="middle"' : kind==="end" ? ' text-anchor="end"' : '';
  if(kind==="mid"||kind==="end") st='fill="var(--ink-soft)" font-size="10.5"';
  o.push('<text x="'+x+'" y="'+y+'" '+st+' font-family="IBM Plex Sans"'+anchor+'>'+tx(pair)+'</text>');
}

/* ---------- 3 · visualizer library ---------- */
var VIZLIB = {};

/* MOTION — track with distance scale + fully scaled v–t graph */
VIZLIB.motion = {
  vb:"0 0 560 380", anim:true,
  ctrls:[
    {k:"u", lab:["Initial velocity u","ความเร็วต้น u"], min:-20,max:20,step:1, def:8,  unit:" m/s"},
    {k:"a", lab:["Acceleration a","ความเร่ง a"],        min:-10,max:10,step:.5,def:2,  unit:" m/s²"},
    {k:"T", lab:["Duration","ช่วงเวลา"],                min:2,  max:12,step:1, def:6,  unit:" s", isT:true}
  ],
  readouts:[
    {lab:["Time","เวลา"],            f:function(S){ return fmt(S.t)+" s"; }},
    {lab:["Velocity v","ความเร็ว v"], f:function(S){ return fmt(S.p.u+S.p.a*S.t)+" m/s"; }},
    {lab:["Displacement s","การกระจัด s"], f:function(S){ return fmt(S.p.u*S.t+0.5*S.p.a*S.t*S.t)+" m"; }},
    {lab:["Slope","ความชัน"],        f:function(S){ return fmt(S.p.a)+" m/s²"; }}
  ],
  draw:function(S,o){
    var u=S.p.u,a=S.p.a,T=S.p.T,tt=Math.min(S.t,T);
    var vA=function(x){ return u+a*x; }, sA=function(x){ return u*x+0.5*a*x*x; };
    var vs=[]; for(var i=0;i<=40;i++) vs.push(vA(T*i/40));
    var vmax=Math.max.apply(null,vs.concat([0])), vmin=Math.min.apply(null,vs.concat([0]));
    var pad=Math.max(1,(vmax-vmin)*0.14); vmax+=pad; vmin-=pad;
    var ss=[]; for(var j=0;j<=40;j++) ss.push(sA(T*j/40));
    var smax=Math.max.apply(null,ss.map(Math.abs).concat([1]));
    var TXx=58,TWw=462,TYy=52;
    o.push('<text x="'+TXx+'" y="20" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5" letter-spacing="1.4">'+(L()?"ราง":"TRACK")+'</text>');
    o.push('<text x="'+(TXx+TWw)+'" y="20" '+FT+' text-anchor="end">s (m)</text>');
    o.push('<line x1="'+TXx+'" y1="'+TYy+'" x2="'+(TXx+TWw)+'" y2="'+TYy+'" stroke="var(--rule)" stroke-width="2"/>');
    for(var k=0;k<=4;k++){
      var px=TXx+(TWw/4)*k, pv=-smax+(smax/2)*k;
      o.push('<line x1="'+px+'" y1="'+TYy+'" x2="'+px+'" y2="'+(TYy+7)+'" stroke="var(--ink-faint)" stroke-width="1"/>');
      o.push('<text x="'+px+'" y="'+(TYy+21)+'" '+FT+' text-anchor="middle">'+tk(pv)+'</text>');
    }
    var cx=TXx+(sA(tt)/smax)*(TWw/2)+TWw/2;
    cx=Math.max(TXx+13,Math.min(TXx+TWw-13,cx));
    o.push('<rect x="'+(cx-13)+'" y="'+(TYy-17)+'" width="26" height="15" fill="var(--accent)"/>');
    var A=axes(o,{x:58,y:140,w:462,h:166,xmin:0,xmax:T,ymin:vmin,ymax:vmax,
                  title:["VELOCITY vs TIME","ความเร็ว เทียบ เวลา"],xlab:"t (s)",ylab:"v (m/s)"});
    var nx=A.X(tt), ny=A.Y(vA(tt));
    o.push('<path d="M'+A.X(0)+' '+A.zy+' L'+A.X(0)+' '+A.Y(vA(0))+' L'+nx+' '+ny+' L'+nx+' '+A.zy+' Z" fill="var(--accent)" fill-opacity="0.14"/>');
    o.push('<line x1="'+A.X(0)+'" y1="'+A.Y(vA(0))+'" x2="'+A.X(T)+'" y2="'+A.Y(vA(T))+'" stroke="var(--ink-faint)" stroke-width="1.5" stroke-dasharray="3 3"/>');
    o.push('<line x1="'+A.X(0)+'" y1="'+A.Y(vA(0))+'" x2="'+nx+'" y2="'+ny+'" stroke="var(--accent)" stroke-width="2.5"/>');
    o.push('<line x1="'+nx+'" y1="'+ny+'" x2="'+nx+'" y2="'+(140+166)+'" stroke="var(--accent)" stroke-width="1" stroke-dasharray="2 3" opacity=".65"/>');
    o.push('<line x1="58" y1="'+ny+'" x2="'+nx+'" y2="'+ny+'" stroke="var(--accent)" stroke-width="1" stroke-dasharray="2 3" opacity=".65"/>');
    o.push('<circle cx="'+nx+'" cy="'+ny+'" r="4.5" fill="var(--accent)"/>');
  }
};

/* PLOT — generic scaled y = f(x) plotter. Node supplies fn, ranges, labels. */
VIZLIB.plot = {
  vb:"0 0 560 300", anim:false,
  draw:function(S,o,cfg){
    var xs=[],ys=[],N=160;
    for(var i=0;i<=N;i++){ var x=cfg.xmin+(cfg.xmax-cfg.xmin)*i/N; xs.push(x); ys.push(cfg.fn(x,S.p)); }
    var ymax=Math.max.apply(null,ys.concat([0])), ymin=Math.min.apply(null,ys.concat([0]));
    if(cfg.ymin!=null) ymin=cfg.ymin; if(cfg.ymax!=null) ymax=cfg.ymax;
    var pad=Math.max(.5,(ymax-ymin)*0.14); ymax+=pad; ymin-=pad;
    var A=axes(o,{x:58,y:52,w:462,h:190,xmin:cfg.xmin,xmax:cfg.xmax,ymin:ymin,ymax:ymax,
                  title:tx(cfg.title),xlab:tx(cfg.xlab),ylab:tx(cfg.ylab)});
    var d="";
    for(var j=0;j<=N;j++){ d+=(j?" L":"M")+A.X(xs[j])+" "+A.Y(ys[j]); }
    if(cfg.fill) o.push('<path d="'+d+' L'+A.X(cfg.xmax)+' '+A.zy+' L'+A.X(cfg.xmin)+' '+A.zy+' Z" fill="var(--accent)" fill-opacity=".12"/>');
    o.push('<path d="'+d+'" stroke="var(--accent)" stroke-width="2.5" fill="none"/>');
    /* A target height to read the curve against, with a dot on every crossing.
       Drawn in ink, not accent: the curve is the one accent in this plate. */
    if(cfg.hline!=null){
      var hv=cfg.hline(S.p), hy=A.Y(hv);
      o.push('<line x1="'+A.X(cfg.xmin)+'" y1="'+hy+'" x2="'+A.X(cfg.xmax)+'" y2="'+hy+
             '" stroke="var(--ink)" stroke-width="1.2" stroke-dasharray="5 4" opacity=".55"/>');
      for(var m=1;m<=N;m++){
        var d0=ys[m-1]-hv, d1=ys[m]-hv;
        if(d0===0||d0*d1<0){
          var f=d0===0?0:d0/(d0-d1), cx=A.X(xs[m-1]+(xs[m]-xs[m-1])*f);
          o.push('<circle cx="'+cx+'" cy="'+hy+'" r="3.6" fill="var(--ground)" '+
                 'stroke="var(--ink)" stroke-width="1.4"/>');
        }
      }
    }
    if(cfg.mark!=null){
      var mx=cfg.mark(S.p), my=cfg.fn(mx,S.p);
      o.push('<line x1="'+A.X(mx)+'" y1="'+A.Y(my)+'" x2="'+A.X(mx)+'" y2="'+A.zy+'" stroke="var(--accent)" stroke-width="1" stroke-dasharray="2 3" opacity=".65"/>');
      o.push('<circle cx="'+A.X(mx)+'" cy="'+A.Y(my)+'" r="4.5" fill="var(--accent)"/>');
    }
  }
};

/* VECTOR — two vectors, magnitude + direction, with resultant drawn to scale */
VIZLIB.vector = {
  vb:"0 0 560 340", anim:false,
  ctrls:[
    {k:"A",  lab:["Magnitude A","ขนาด A"],  min:0,max:20,step:1,def:12, unit:""},
    {k:"tA", lab:["Angle A","มุม A"],       min:0,max:360,step:5,def:0,  unit:"°"},
    {k:"B",  lab:["Magnitude B","ขนาด B"],  min:0,max:20,step:1,def:9,  unit:""},
    {k:"tB", lab:["Angle B","มุม B"],       min:0,max:360,step:5,def:90, unit:"°"}
  ],
  readouts:[
    {lab:["Resultant R","ผลลัพธ์ R"], f:function(S){
      var p=S.p, rx=p.A*Math.cos(p.tA*Math.PI/180)+p.B*Math.cos(p.tB*Math.PI/180);
      var ry=p.A*Math.sin(p.tA*Math.PI/180)+p.B*Math.sin(p.tB*Math.PI/180);
      return fmt(Math.sqrt(rx*rx+ry*ry)); }},
    {lab:["Direction","ทิศทาง"], f:function(S){
      var p=S.p, rx=p.A*Math.cos(p.tA*Math.PI/180)+p.B*Math.cos(p.tB*Math.PI/180);
      var ry=p.A*Math.sin(p.tA*Math.PI/180)+p.B*Math.sin(p.tB*Math.PI/180);
      var d=Math.atan2(ry,rx)*180/Math.PI; if(d<0) d+=360; return fmt(d)+"°"; }}
  ],
  draw:function(S,o){
    var p=S.p, cx=280, cy=180, sc=6.5;
    var ax=p.A*Math.cos(p.tA*Math.PI/180), ay=p.A*Math.sin(p.tA*Math.PI/180);
    var bx=p.B*Math.cos(p.tB*Math.PI/180), by=p.B*Math.sin(p.tB*Math.PI/180);
    var rx=ax+bx, ry=ay+by;
    for(var g=-20;g<=20;g+=5){
      o.push('<line x1="'+(cx+g*sc)+'" y1="'+(cy-140)+'" x2="'+(cx+g*sc)+'" y2="'+(cy+140)+'" stroke="var(--rule)" stroke-width="1"/>');
      o.push('<line x1="'+(cx-250)+'" y1="'+(cy-g*sc)+'" x2="'+(cx+250)+'" y2="'+(cy-g*sc)+'" stroke="var(--rule)" stroke-width="1"/>');
    }
    o.push('<line x1="'+(cx-250)+'" y1="'+cy+'" x2="'+(cx+250)+'" y2="'+cy+'" stroke="var(--ink-faint)" stroke-width="1.4"/>');
    o.push('<line x1="'+cx+'" y1="'+(cy-140)+'" x2="'+cx+'" y2="'+(cy+140)+'" stroke="var(--ink-faint)" stroke-width="1.4"/>');
    for(var s=-20;s<=20;s+=10){ if(!s) continue;
      o.push('<text x="'+(cx+s*sc)+'" y="'+(cy+16)+'" '+FT+' text-anchor="middle">'+s+'</text>');
      o.push('<text x="'+(cx-8)+'" y="'+(cy-s*sc+3.5)+'" '+FT+' text-anchor="end">'+s+'</text>');
    }
    function arrow(x1,y1,x2,y2,col,w,dash){
      var ang=Math.atan2(y2-y1,x2-x1), hl=9;
      o.push('<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+col+'" stroke-width="'+w+'"'+(dash?' stroke-dasharray="4 4"':'')+'/>');
      if(Math.abs(x2-x1)+Math.abs(y2-y1)>4)
        o.push('<path d="M'+x2+' '+y2+' L'+(x2-hl*Math.cos(ang-.4))+' '+(y2-hl*Math.sin(ang-.4))+' L'+(x2-hl*Math.cos(ang+.4))+' '+(y2-hl*Math.sin(ang+.4))+' Z" fill="'+col+'"/>');
    }
    arrow(cx,cy,cx+ax*sc,cy-ay*sc,"var(--ink-soft)",2);
    arrow(cx+ax*sc,cy-ay*sc,cx+rx*sc,cy-ry*sc,"var(--ink-faint)",1.6,true);
    arrow(cx,cy,cx+rx*sc,cy-ry*sc,"var(--accent)",2.8);
    o.push('<text x="'+(cx+ax*sc/2-10)+'" y="'+(cy-ay*sc/2-6)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="11" font-weight="600">A</text>');
    o.push('<text x="'+(cx+ax*sc+bx*sc/2+6)+'" y="'+(cy-ay*sc-by*sc/2)+'" '+FT+' font-weight="600">B</text>');
    o.push('<text x="'+(cx+rx*sc/2+6)+'" y="'+(cy-ry*sc/2+14)+'" fill="var(--accent)" font-family="IBM Plex Sans" font-size="12" font-weight="600">R</text>');
  }
};

/* WAVE — travelling sine wave with wavelength, amplitude, frequency, to scale */
VIZLIB.wave = {
  vb:"0 0 560 300", anim:true,
  ctrls:[
    {k:"A",  lab:["Amplitude A","แอมพลิจูด A"],   min:1,max:10,step:.5,def:5, unit:" m"},
    {k:"lam",lab:["Wavelength λ","ความยาวคลื่น λ"],min:2,max:20,step:1, def:8, unit:" m"},
    {k:"f",  lab:["Frequency f","ความถี่ f"],      min:.2,max:3,step:.1,def:1, unit:" Hz"},
    {k:"T",  lab:["Run for","เล่นนาน"],            min:2,max:12,step:1, def:8, unit:" s", isT:true}
  ],
  readouts:[
    {lab:["Speed v = fλ","อัตราเร็ว v = fλ"], f:function(S){ return fmt(S.p.f*S.p.lam)+" m/s"; }},
    {lab:["Period T = 1/f","คาบ T = 1/f"],    f:function(S){ return fmt(1/S.p.f)+" s"; }},
    {lab:["Time","เวลา"],                     f:function(S){ return fmt(S.t)+" s"; }}
  ],
  draw:function(S,o){
    var p=S.p, xmax=24;
    var A=axes(o,{x:58,y:52,w:462,h:190,xmin:0,xmax:xmax,ymin:-11,ymax:11,
                  title:["WAVE SNAPSHOT","ภาพนิ่งของคลื่น"],xlab:"x (m)",ylab:"y (m)"});
    var d="";
    for(var i=0;i<=240;i++){
      var x=xmax*i/240;
      var y=p.A*Math.sin(2*Math.PI*(x/p.lam - p.f*S.t));
      d+=(i?" L":"M")+A.X(x)+" "+A.Y(y);
    }
    o.push('<path d="'+d+'" stroke="var(--accent)" stroke-width="2.5" fill="none"/>');
    /* one wavelength marked out on the axis */
    o.push('<line x1="'+A.X(0)+'" y1="'+(A.Y(-11)+0)+'" x2="'+A.X(p.lam)+'" y2="'+(A.Y(-11)+0)+'" stroke="var(--ink-soft)" stroke-width="2"/>');
    o.push('<text x="'+A.X(p.lam/2)+'" y="'+(A.Y(-11)-6)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">λ = '+p.lam+' m</text>');
    /* a tracked particle showing it only moves up and down */
    var px=xmax*0.75, py=p.A*Math.sin(2*Math.PI*(px/p.lam - p.f*S.t));
    o.push('<line x1="'+A.X(px)+'" y1="'+A.Y(-11)+'" x2="'+A.X(px)+'" y2="'+A.Y(11)+'" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="2 3"/>');
    o.push('<circle cx="'+A.X(px)+'" cy="'+A.Y(py)+'" r="5" fill="var(--accent)"/>');
  }
};

/* ============================================================
   GENERIC VISUALIZERS · added so most nodes need only a config
   block, not a bespoke drawing. Every one reads its shape from
   nd.vizcfg and takes bilingual ["EN","TH"] pairs for all text.
   ============================================================ */

var COL = { accent:"var(--accent)", good:"var(--good)", warn:"var(--warn)",
            ink:"var(--ink)", soft:"var(--ink-soft)", faint:"var(--ink-faint)" };
function col(k){ return COL[k] || COL.accent; }

/* BARS — compare quantities that move together. cfg.bars:[{lab,f,col}] */
VIZLIB.bars = {
  vb:"0 0 560 300", anim:false,
  draw:function(S,o,cfg){
    var B=cfg.bars.map(function(b){ return {lab:b.lab, v:b.f(S.p), c:col(b.col)}; });
    var vs=B.map(function(b){ return b.v; });
    var hi=Math.max.apply(null,vs.concat([0])), lo=Math.min.apply(null,vs.concat([0]));
    if(cfg.ymax!=null) hi=cfg.ymax;
    if(cfg.ymin!=null) lo=cfg.ymin;
    var pad=Math.max(1e-6,(hi-lo)*0.18); hi+=pad; if(lo<0) lo-=pad;
    var n=B.length, A=axes(o,{x:64,y:54,w:452,h:184,xmin:0,xmax:n,ymin:lo,ymax:hi,
                             title:cfg.title, ylab:cfg.ylab, xticks:0, yticks:5});
    var w=452/n, bw=Math.min(74,w*0.56);
    B.forEach(function(b,i){
      var cx=A.X(i+0.5), y0=A.Y(0), y1=A.Y(b.v);
      o.push('<rect x="'+(cx-bw/2)+'" y="'+Math.min(y0,y1)+'" width="'+bw+
             '" height="'+Math.abs(y1-y0)+'" fill="'+b.c+'" opacity="0.9"/>');
      o.push('<text x="'+cx+'" y="'+(y1+(b.v<0?15:-7))+'" fill="var(--ink)" font-family="IBM Plex Sans" '+
             'font-size="11" font-weight="600" text-anchor="middle">'+fmt2(b.v)+'</text>');
      o.push('<text x="'+cx+'" y="'+(A.Y(lo)+34)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" '+
             'font-size="10" text-anchor="middle">'+tx(b.lab)+'</text>');
    });
    if(cfg.note) cap(o,64,290,cfg.note,"note");
  }
};

/* NUMLINE — points and intervals on a real line. cfg.regions(p), cfg.points(p) */
VIZLIB.numline = {
  vb:"0 0 560 250", anim:false,
  draw:function(S,o,cfg){
    var lo=cfg.min!=null?cfg.min:-10, hi=cfg.max!=null?cfg.max:10;
    var x0=52, w=456, y=132;
    var X=function(v){ return x0+(v-lo)/(hi-lo)*w; };
    if(cfg.title) cap(o,x0,44,cfg.title,"eyebrow");
    var st=niceStep(hi-lo,8), s0=Math.ceil(lo/st)*st, i;
    for(i=0;s0+i*st<=hi+1e-9;i++){
      var v=s0+i*st, gx=X(v);
      o.push('<line x1="'+gx+'" y1="'+(y-6)+'" x2="'+gx+'" y2="'+(y+6)+'" stroke="var(--ink-faint)" stroke-width="1"/>');
      o.push('<text x="'+gx+'" y="'+(y+23)+'" '+FT+' text-anchor="middle">'+tk(v)+'</text>');
    }
    o.push('<line x1="'+x0+'" y1="'+y+'" x2="'+(x0+w)+'" y2="'+y+'" stroke="var(--ink)" stroke-width="1.8"/>');
    o.push('<path d="M'+(x0+w)+' '+y+' L'+(x0+w-9)+' '+(y-4)+' L'+(x0+w-9)+' '+(y+4)+' Z" fill="var(--ink)"/>');
    (cfg.regions?cfg.regions(S.p):[]).forEach(function(r,k){
      var a=Math.max(lo,r.a), b=Math.min(hi,r.b);
      if(b<=a) return;
      var yy=y-16-k*15;
      o.push('<line x1="'+X(a)+'" y1="'+yy+'" x2="'+X(b)+'" y2="'+yy+
             '" stroke="'+col(r.col)+'" stroke-width="7" opacity="0.32"/>');
      [[a,r.openA,X(a)],[b,r.openB,X(b)]].forEach(function(e){
        o.push('<circle cx="'+e[2]+'" cy="'+yy+'" r="4.5" fill="'+(e[1]?"var(--ground)":col(r.col))+
               '" stroke="'+col(r.col)+'" stroke-width="2"/>');
      });
      if(r.lab) o.push('<text x="'+((X(a)+X(b))/2)+'" y="'+(yy-10)+'" fill="'+col(r.col)+
                       '" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">'+tx(r.lab)+'</text>');
    });
    (cfg.points?cfg.points(S.p):[]).forEach(function(pt){
      if(pt.v<lo||pt.v>hi) return;
      var gx=X(pt.v);
      o.push('<line x1="'+gx+'" y1="'+(y-30)+'" x2="'+gx+'" y2="'+(y+30)+'" stroke="'+col(pt.col||"accent")+
             '" stroke-width="1.4" stroke-dasharray="3 3"/>');
      o.push('<circle cx="'+gx+'" cy="'+y+'" r="6" fill="'+(pt.open?"var(--ground)":col(pt.col||"accent"))+
             '" stroke="'+col(pt.col||"accent")+'" stroke-width="2.2"/>');
      if(pt.lab) o.push('<text x="'+gx+'" y="'+(y+50)+'" fill="'+col(pt.col||"accent")+
                        '" font-family="IBM Plex Sans" font-size="11" text-anchor="middle">'+tx(pt.lab)+'</text>');
    });
    if(cfg.note) cap(o,x0,222,cfg.note,"note");
  }
};

/* TRI — a triangle drawn to scale from two sides and the included angle */
VIZLIB.tri = {
  vb:"0 0 560 300", anim:false,
  draw:function(S,o,cfg){
    var g=cfg.sides(S.p), a=g.a, b=g.b, C=g.C*Math.PI/180;
    var c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C));
    var A1=Math.asin(Math.min(1,a*Math.sin(C)/(c||1)));
    var B1=Math.PI-C-A1;
    /* place C at origin, b along +x, a at angle C */
    var P={ C:[0,0], A:[b,0], B:[a*Math.cos(C), a*Math.sin(C)] };
    var xs=[P.C[0],P.A[0],P.B[0]], ys=[P.C[1],P.A[1],P.B[1]];
    var mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs);
    var mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys);
    var sc=Math.min(360/Math.max(1e-6,mxx-mnx), 170/Math.max(1e-6,mxy-mny));
    var ox=150-mnx*sc, oy=230+mny*sc;
    var T=function(p){ return [ox+p[0]*sc, oy-p[1]*sc]; };
    var tC=T(P.C), tA=T(P.A), tB=T(P.B);
    if(cfg.title) cap(o,44,40,cfg.title,"eyebrow");
    o.push('<path d="M'+tC[0]+' '+tC[1]+' L'+tA[0]+' '+tA[1]+' L'+tB[0]+' '+tB[1]+
           ' Z" fill="var(--accent)" fill-opacity="0.10" stroke="var(--ink)" stroke-width="2.2"/>');
    function side(p,q,lab,val,c2){
      o.push('<text x="'+((p[0]+q[0])/2)+'" y="'+((p[1]+q[1])/2-6)+'" fill="'+c2+
             '" font-family="IBM Plex Sans" font-size="11" text-anchor="middle">'+lab+' = '+fmt2(val)+'</text>');
    }
    side(tC,tA,"b",b,"var(--ink-soft)");
    side(tC,tB,"a",a,"var(--ink-soft)");
    side(tA,tB,"c",c,"var(--accent)");
    [[tC,"C",g.C],[tA,"A",A1*180/Math.PI],[tB,"B",B1*180/Math.PI]].forEach(function(v){
      o.push('<circle cx="'+v[0][0]+'" cy="'+v[0][1]+'" r="3.5" fill="var(--ink)"/>');
      o.push('<text x="'+(v[0][0]-14)+'" y="'+(v[0][1]+14)+'" fill="var(--ink)" font-family="IBM Plex Sans" '+
             'font-size="10.5" font-weight="600">'+v[1]+' '+fmt(v[2])+'°</text>');
    });
    var area=0.5*a*b*Math.sin(C);
    o.push('<text x="404" y="86" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.2">'+
           tx(["THIRD SIDE","ด้านที่สาม"])+'</text>');
    o.push('<text x="404" y="118" fill="var(--accent)" font-family="Bodoni Moda, serif" font-size="30">'+fmt2(c)+'</text>');
    o.push('<text x="404" y="152" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.2">'+
           tx(["AREA ½ ab sin C","พื้นที่ ½ ab sin C"])+'</text>');
    o.push('<text x="404" y="182" fill="var(--ink)" font-family="Bodoni Moda, serif" font-size="26">'+fmt2(area)+'</text>');
    if(cfg.note) cap(o,44,286,cfg.note,"note");
  }
};

/* GRID — a table whose cells light up. cfg.cols:[pair], cfg.rows(p)->[[{v,on}]] */
VIZLIB.grid = {
  vb:"0 0 560 320", anim:false,
  draw:function(S,o,cfg){
    var rows=cfg.rows(S.p), cols=cfg.cols;
    var x0=48, y0=72, cw=Math.min(96,(500-x0)/cols.length), ch=Math.min(30,210/Math.max(1,rows.length));
    if(cfg.title) cap(o,x0,44,cfg.title,"eyebrow");
    cols.forEach(function(c,j){
      o.push('<text x="'+(x0+j*cw+cw/2)+'" y="'+(y0-9)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" '+
             'font-size="10.5" font-weight="600" text-anchor="middle">'+tx(c)+'</text>');
    });
    rows.forEach(function(r,i){
      r.forEach(function(cell,j){
        var x=x0+j*cw, y=y0+i*ch, on=cell.on;
        o.push('<rect x="'+x+'" y="'+y+'" width="'+(cw-2)+'" height="'+(ch-2)+
               '" fill="'+(on?col(cell.col||"accent"):"var(--surface)")+'" stroke="var(--rule)" stroke-width="1"/>');
        o.push('<text x="'+(x+cw/2-1)+'" y="'+(y+ch/2+3)+'" fill="'+(on?"#fff":"var(--ink-soft)")+
               '" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">'+tx(cell.v)+'</text>');
      });
    });
    if(cfg.note) cap(o,x0,y0+rows.length*ch+26,cfg.note,"note");
  }
};

/* SCALE — a logarithmic ruler for quantities spanning many decades */
VIZLIB.scale = {
  vb:"0 0 560 260", anim:false,
  draw:function(S,o,cfg){
    var lo=cfg.lo, hi=cfg.hi, x0=54, w=452, y=140;
    var X=function(e){ return x0+(e-lo)/(hi-lo)*w; };
    if(cfg.title) cap(o,x0,42,cfg.title,"eyebrow");
    o.push('<line x1="'+x0+'" y1="'+y+'" x2="'+(x0+w)+'" y2="'+y+'" stroke="var(--ink)" stroke-width="2"/>');
    var step=Math.max(1,Math.round((hi-lo)/9));
    for(var e=Math.ceil(lo);e<=hi;e+=step){
      var gx=X(e);
      o.push('<line x1="'+gx+'" y1="'+(y-6)+'" x2="'+gx+'" y2="'+(y+6)+'" stroke="var(--ink-faint)" stroke-width="1"/>');
      o.push('<text x="'+gx+'" y="'+(y+22)+'" '+FT+' text-anchor="middle">10^'+e+'</text>');
    }
    (cfg.marks?cfg.marks(S.p):[]).forEach(function(m,k){
      var gx=X(m.e), yy=y-24-(k%3)*20;
      o.push('<line x1="'+gx+'" y1="'+yy+'" x2="'+gx+'" y2="'+(y-4)+'" stroke="'+col(m.col||"faint")+'" stroke-width="1.2"/>');
      o.push('<circle cx="'+gx+'" cy="'+(y)+'" r="3.5" fill="'+col(m.col||"faint")+'"/>');
      o.push('<text x="'+gx+'" y="'+(yy-5)+'" fill="'+col(m.col||"faint")+'" font-family="IBM Plex Sans" '+
             'font-size="10" text-anchor="middle">'+tx(m.lab)+'</text>');
    });
    if(cfg.cursor!=null){
      var ce=cfg.cursor(S.p), cx=X(ce);
      o.push('<line x1="'+cx+'" y1="'+(y-52)+'" x2="'+cx+'" y2="'+(y+34)+'" stroke="var(--accent)" stroke-width="2.4"/>');
      o.push('<circle cx="'+cx+'" cy="'+y+'" r="6" fill="var(--accent)"/>');
      if(cfg.cursorLab) o.push('<text x="'+cx+'" y="'+(y+50)+'" fill="var(--accent)" font-family="IBM Plex Sans" '+
                               'font-size="11" font-weight="600" text-anchor="middle">'+tx(cfg.cursorLab(S.p))+'</text>');
    }
    if(cfg.note) cap(o,x0,232,cfg.note,"note");
  }
};

/* FBD — a body with force arrows, optionally on an incline */
VIZLIB.fbd = {
  vb:"0 0 560 320", anim:false,
  draw:function(S,o,cfg){
    var inc=cfg.incline?cfg.incline(S.p):0, r=inc*Math.PI/180;
    var cx=270, cy=180;
    if(cfg.title) cap(o,44,40,cfg.title,"eyebrow");
    if(inc>0){
      var L=210, H=L*Math.tan(r);
      o.push('<path d="M'+(cx-L/2)+' '+(cy+56)+' L'+(cx+L/2)+' '+(cy+56)+' L'+(cx+L/2)+' '+(cy+56-H)+
             ' Z" fill="var(--surface)" stroke="var(--ink-faint)" stroke-width="1.5"/>');
      o.push('<text x="'+(cx-L/2+26)+'" y="'+(cy+50)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" '+
             'font-size="10">'+fmt(inc)+'°</text>');
    } else {
      o.push('<line x1="'+(cx-120)+'" y1="'+(cy+34)+'" x2="'+(cx+120)+'" y2="'+(cy+34)+
             '" stroke="var(--ink-faint)" stroke-width="1.5"/>');
    }
    o.push('<rect x="'+(cx-24)+'" y="'+(cy-20)+'" width="48" height="48" fill="var(--ink)" opacity="0.88"/>');
    var F=cfg.forces(S.p);
    var mx=Math.max.apply(null,F.map(function(f){ return Math.abs(f.mag); }).concat([1]));
    F.forEach(function(f){
      if(Math.abs(f.mag)<1e-6) return;
      var ang=f.ang*Math.PI/180, len=18+Math.abs(f.mag)/mx*84;
      var sgn=f.mag<0?-1:1;
      var ex=cx+Math.cos(ang)*len*sgn, ey=cy-Math.sin(ang)*len*sgn;
      var c2=col(f.col||"accent"), hl=9, aa=Math.atan2(ey-cy,ex-cx);
      o.push('<line x1="'+cx+'" y1="'+cy+'" x2="'+ex+'" y2="'+ey+'" stroke="'+c2+'" stroke-width="2.6"/>');
      o.push('<path d="M'+ex+' '+ey+' L'+(ex-hl*Math.cos(aa-0.4))+' '+(ey-hl*Math.sin(aa-0.4))+
             ' L'+(ex-hl*Math.cos(aa+0.4))+' '+(ey-hl*Math.sin(aa+0.4))+' Z" fill="'+c2+'"/>');
      o.push('<text x="'+(cx+Math.cos(aa)*(len+24))+'" y="'+(cy+Math.sin(aa)*(len+24)+4)+'" fill="'+c2+
             '" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">'+tx(f.lab)+' '+fmt(Math.abs(f.mag))+'</text>');
    });
    if(cfg.note) cap(o,44,300,cfg.note,"note");
  }
};

/* STACK — a part-whole bar, for conservation and proportion arguments */
VIZLIB.stack = {
  vb:"0 0 560 260", anim:false,
  draw:function(S,o,cfg){
    var P=cfg.parts(S.p);
    var tot=P.reduce(function(s2,p){ return s2+Math.max(0,p.v); },0) || 1;
    var x0=54, w=452, y=96, h=54;
    if(cfg.title) cap(o,x0,44,cfg.title,"eyebrow");
    var x=x0;
    P.forEach(function(p){
      var pw=Math.max(0,p.v)/tot*w;
      o.push('<rect x="'+x+'" y="'+y+'" width="'+pw+'" height="'+h+'" fill="'+col(p.col)+'" opacity="0.88"/>');
      if(pw>34) o.push('<text x="'+(x+pw/2)+'" y="'+(y+h/2+4)+'" fill="#fff" font-family="IBM Plex Sans" '+
                       'font-size="11" font-weight="600" text-anchor="middle">'+fmt2(p.v)+'</text>');
      x+=pw;
    });
    o.push('<rect x="'+x0+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="none" stroke="var(--ink)" stroke-width="1.6"/>');
    var lx=x0;
    P.forEach(function(p,i){
      var ly=y+h+28+Math.floor(i/3)*20, cxx=x0+(i%3)*156;
      o.push('<rect x="'+cxx+'" y="'+(ly-9)+'" width="11" height="11" fill="'+col(p.col)+'"/>');
      o.push('<text x="'+(cxx+18)+'" y="'+ly+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" '+
             'font-size="10.5">'+tx(p.lab)+'</text>');
    });
    if(cfg.total) o.push('<text x="'+(x0+w)+'" y="'+(y-10)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" '+
                         'font-size="10.5" text-anchor="end">'+tx(cfg.total)+' '+fmt2(tot)+'</text>');
    if(cfg.note) cap(o,x0,236,cfg.note,"note");
  }
};

/* ============================================================
   SCENES · see [[Visualizer Concepts]]
   Every lab is a drawn piece of daily life (top band) with the
   measurement taken from it (bottom band), joined by a leader
   line. Scene builders live in SCENE; VIZLIB.scene composes one
   with an instrument.
   ============================================================ */

var FR = { qy:22, sx:30, sw:500, sy:34, ground:214, div:250,
           iy:268, ih:144, ix:64, iw:462 };

/* A dimension line with end ticks and a centred label. Used constantly. */
function dim(o, x1, x2, y, pair, c){
  c = c || "var(--ink-soft)";
  if(Math.abs(x2-x1) < 2) return;
  o.push('<line x1="'+x1+'" y1="'+y+'" x2="'+x2+'" y2="'+y+'" stroke="'+c+'" stroke-width="1.3"/>');
  [x1,x2].forEach(function(x){
    o.push('<line x1="'+x+'" y1="'+(y-4)+'" x2="'+x+'" y2="'+(y+4)+'" stroke="'+c+'" stroke-width="1.3"/>');
  });
  if(pair) o.push('<text x="'+((x1+x2)/2)+'" y="'+(y-7)+'" fill="'+c+
                  '" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">'+tx(pair)+'</text>');
}

/* Thai has no word spaces, so long labels shrink rather than wrap. */
function fitText(o, x, y, pair, maxw, size, c, anchor){
  var s = tx(pair), fs = size;
  var est = s.length * size * 0.56;
  if(est > maxw) fs = Math.max(7.5, size * maxw / est);
  o.push('<text x="'+x+'" y="'+y+'" fill="'+(c||"var(--ink-soft)")+
         '" font-family="IBM Plex Sans" font-size="'+fmt2(fs)+'"'+
         (anchor?' text-anchor="'+anchor+'"':'')+'>'+s+'</text>');
}

/* A gauge arc with a needle, for the `dial` instrument. */
function needle(o, cx, cy, r, frac, pair, unit){
  var a0 = Math.PI*0.82, a1 = Math.PI*0.18;
  function pt(a, rr){ return [cx+Math.cos(a)*rr, cy-Math.sin(a)*rr]; }
  var p0=pt(a0,r), p1=pt(a1,r);
  o.push('<path d="M'+fmt2(p0[0])+' '+fmt2(p0[1])+' A'+r+' '+r+' 0 0 1 '+fmt2(p1[0])+' '+fmt2(p1[1])+
         '" fill="none" stroke="var(--rule)" stroke-width="7"/>');
  var f = Math.max(0, Math.min(1, frac));
  var ae = a0 + (a1-a0)*f, pe=pt(ae,r);
  o.push('<path d="M'+fmt2(p0[0])+' '+fmt2(p0[1])+' A'+r+' '+r+' 0 0 1 '+fmt2(pe[0])+' '+fmt2(pe[1])+
         '" fill="none" stroke="var(--accent)" stroke-width="7"/>');
  var tip=pt(ae, r-9);
  o.push('<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt2(tip[0])+'" y2="'+fmt2(tip[1])+
         '" stroke="var(--ink)" stroke-width="2.4"/>');
  o.push('<circle cx="'+cx+'" cy="'+cy+'" r="3.5" fill="var(--ink)"/>');
  if(pair) o.push('<text x="'+cx+'" y="'+(cy+20)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" '+
                  'font-size="10" text-anchor="middle">'+tx(pair)+'</text>');
  if(unit!=null) o.push('<text x="'+cx+'" y="'+(cy-14)+'" fill="var(--ink)" font-family="Bodoni Moda, serif" '+
                        'font-size="19" text-anchor="middle">'+unit+'</text>');
}

/* ---------- silhouettes ----------
   Five shapes or fewer, readable at 40px. Never illustrations. */
var FIG = {};
FIG.moto = function(o,x,y,c,flip){
  var d = flip?-1:1, s=1;
  o.push('<ellipse cx="'+x+'" cy="'+(y+3)+'" rx="21" ry="3.5" fill="var(--ink)" opacity=".13"/>');
  o.push('<circle cx="'+(x-13*d)+'" cy="'+(y-6)+'" r="6.5" fill="none" stroke="'+c+'" stroke-width="2.4"/>');
  o.push('<circle cx="'+(x+13*d)+'" cy="'+(y-6)+'" r="6.5" fill="none" stroke="'+c+'" stroke-width="2.4"/>');
  o.push('<path d="M'+(x-13*d)+' '+(y-6)+' L'+(x-2*d)+' '+(y-14)+' L'+(x+13*d)+' '+(y-6)+
         '" fill="none" stroke="'+c+'" stroke-width="2.4" stroke-linejoin="round"/>');
  o.push('<path d="M'+(x-4*d)+' '+(y-15)+' q'+(3*d)+' -11 '+(9*d)+' -11 q'+(5*d)+' 0 '+(6*d)+' 5" '+
         'fill="none" stroke="'+c+'" stroke-width="2.4" stroke-linecap="round"/>');
  o.push('<circle cx="'+(x+6*d)+'" cy="'+(y-29)+'" r="4.6" fill="'+c+'"/>');
};
FIG.ball = function(o,x,y,c,r){
  r = r||7;
  o.push('<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+c+'"/>');
};
FIG.post = function(o,x,y,c){
  o.push('<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y-46)+'" stroke="'+c+'" stroke-width="2"/>');
  o.push('<path d="M'+x+' '+(y-46)+' q0 -7 9 -7" fill="none" stroke="'+c+'" stroke-width="2"/>');
  o.push('<circle cx="'+(x+11)+'" cy="'+(y-52)+'" r="3.2" fill="'+c+'"/>');
};
FIG.light = function(o,x,y,c,on){
  o.push('<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y-52)+'" stroke="var(--ink-faint)" stroke-width="2"/>');
  o.push('<rect x="'+(x-6)+'" y="'+(y-76)+'" width="12" height="26" rx="2" fill="none" stroke="var(--ink-faint)" stroke-width="1.6"/>');
  o.push('<circle cx="'+x+'" cy="'+(y-69)+'" r="3.2" fill="'+(on?"var(--ink-faint)":"var(--accent)")+'" opacity="'+(on?".3":"1")+'"/>');
  o.push('<circle cx="'+x+'" cy="'+(y-57)+'" r="3.2" fill="'+(on?"var(--good)":"var(--ink-faint)")+'" opacity="'+(on?"1":".3")+'"/>');
};
FIG.zebra = function(o,x,y,c,w){
  w = w||34;
  for(var i=0;i<5;i++)
    o.push('<rect x="'+(x-w/2+i*(w/5))+'" y="'+(y-3)+'" width="'+(w/5-2.5)+'" height="7" fill="var(--ink-faint)" opacity=".55"/>');
};
FIG.tree = function(o,x,y,c){
  o.push('<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y-40)+'" stroke="var(--ink-faint)" stroke-width="3"/>');
  o.push('<path d="M'+(x-20)+' '+(y-40)+' q20 -30 40 0 z" fill="var(--good)" opacity=".22" stroke="var(--good)" stroke-width="1.6"/>');
};

/* ---------- scene builders ---------- */
var SCENE = {};

/* ROAD — a street with distance markers, props and vehicles.
   Returns X(metres)->px so the instrument band can align to it. */
SCENE.road = function(S,o,sc){
  var p = S.p;
  var span = sc.span ? sc.span(p) : 60;
  if(!(span>0)) span = 1;
  var X = function(m){ return FR.sx + (m/span)*FR.sw; };
  var g = FR.ground;

  o.push('<rect x="'+FR.sx+'" y="'+(g-2)+'" width="'+FR.sw+'" height="16" fill="var(--ink)" opacity=".055"/>');
  o.push('<line x1="'+FR.sx+'" y1="'+g+'" x2="'+(FR.sx+FR.sw)+'" y2="'+g+'" stroke="var(--ink-soft)" stroke-width="1.6"/>');

  var step = niceStep(span, 6);
  for(var m=0; m<=span+1e-9; m+=step){
    var gx=X(m);
    o.push('<line x1="'+fmt2(gx)+'" y1="'+g+'" x2="'+fmt2(gx)+'" y2="'+(g+7)+'" stroke="var(--ink-faint)" stroke-width="1"/>');
    o.push('<text x="'+fmt2(gx)+'" y="'+(g+20)+'" '+FT+' text-anchor="middle">'+tk(m)+'</text>');
  }
  o.push('<text x="'+(FR.sx+FR.sw)+'" y="'+(g+34)+'" '+FT+' text-anchor="end">'+
         tx(sc.unit||["metres","เมตร"])+'</text>');

  (sc.props ? sc.props(p) : []).forEach(function(pr){
    var f = FIG[pr.kind];
    if(f) f(o, X(pr.x), g, pr.col||"var(--ink-faint)", pr.arg);
    if(pr.lab) fitText(o, X(pr.x), g-84, pr.lab, 90, 10, "var(--ink-faint)", "middle");
  });

  (sc.cast ? sc.cast(p,S) : []).forEach(function(v){
    var f = FIG[v.kind] || FIG.ball;
    var yy = g - (v.lift||0);
    f(o, X(v.x), yy, v.col||"var(--accent)", v.arg);
    if(v.lab) fitText(o, X(v.x), yy-(v.kind==="moto"?42:18), v.lab, 120, 10.5, v.col||"var(--accent)", "middle");
  });

  (sc.marks ? sc.marks(p) : []).forEach(function(mk,i){
    dim(o, X(mk.a), X(mk.b), g+44+i*22, mk.lab, mk.col||"var(--accent)");
  });

  return { X:X, span:span };
};

/* ROAD, stood on end. Same archetype — a 1-D track with a scale —
   for anything that falls, rises or stacks vertically. */
SCENE.drop = function(S,o,sc){
  var p=S.p;
  var span = sc.span ? sc.span(p) : 20;
  if(!(span>0)) span=1;
  var base = FR.ground, top = FR.sy+16;
  var Y = function(h){ return base - (h/span)*(base-top); };
  var lane = function(i){ return FR.sx + 150 + i*130; };

  o.push('<rect x="'+FR.sx+'" y="'+base+'" width="'+FR.sw+'" height="12" fill="var(--ink)" opacity=".055"/>');
  o.push('<line x1="'+FR.sx+'" y1="'+base+'" x2="'+(FR.sx+FR.sw)+'" y2="'+base+'" stroke="var(--ink-soft)" stroke-width="1.6"/>');

  var step = niceStep(span,5);
  for(var h=0; h<=span+1e-9; h+=step){
    var gy=Y(h);
    o.push('<line x1="'+(FR.sx+62)+'" y1="'+fmt2(gy)+'" x2="'+(FR.sx+FR.sw)+'" y2="'+fmt2(gy)+
           '" stroke="var(--rule)" stroke-width="1"/>');
    o.push('<text x="'+(FR.sx+56)+'" y="'+fmt2(gy+3.5)+'" '+FT+' text-anchor="end">'+tk(h)+'</text>');
  }
  o.push('<text x="'+(FR.sx+56)+'" y="'+(top-6)+'" '+FT+' text-anchor="end">'+tx(sc.unit||["m","m"])+'</text>');

  (sc.cast ? sc.cast(p,S) : []).forEach(function(v,i){
    var lx = v.lane!=null ? lane(v.lane) : lane(i);
    var f = FIG[v.kind] || FIG.ball;
    if(v.trail) o.push('<line x1="'+lx+'" y1="'+fmt2(Y(v.from!=null?v.from:span))+'" x2="'+lx+'" y2="'+fmt2(Y(v.h))+
                       '" stroke="'+(v.col||"var(--accent)")+'" stroke-width="1.2" stroke-dasharray="3 4" opacity=".55"/>');
    f(o, lx, Y(v.h), v.col||"var(--accent)", v.arg);
    if(v.lab) fitText(o, lx, Y(v.h)-18, v.lab, 118, 10.5, v.col||"var(--accent)", "middle");
  });

  (sc.marks ? sc.marks(p) : []).forEach(function(mk,i){
    var mx = FR.sx + 96 + i*20;
    var y1=Y(mk.a), y2=Y(mk.b), c=mk.col||"var(--accent)";
    o.push('<line x1="'+mx+'" y1="'+fmt2(y1)+'" x2="'+mx+'" y2="'+fmt2(y2)+'" stroke="'+c+'" stroke-width="1.3"/>');
    [y1,y2].forEach(function(yy){
      o.push('<line x1="'+(mx-4)+'" y1="'+fmt2(yy)+'" x2="'+(mx+4)+'" y2="'+fmt2(yy)+'" stroke="'+c+'" stroke-width="1.3"/>');
    });
    if(mk.lab) o.push('<text x="'+(mx+7)+'" y="'+fmt2((y1+y2)/2+3)+'" fill="'+c+
                      '" font-family="IBM Plex Sans" font-size="10.5">'+tx(mk.lab)+'</text>');
  });

  return { X:function(){ return FR.sx+FR.sw/2; }, Y:Y, span:span };
};

/* ROAD, stood on end. Same archetype — a 1-D track with a scale —
   for anything that falls, rises or stacks vertically. */
SCENE.drop = function(S,o,sc){
  var p=S.p;
  var span = sc.span ? sc.span(p) : 20;
  if(!(span>0)) span=1;
  var base = FR.ground, top = FR.sy+16;
  var Y = function(h){ return base - (h/span)*(base-top); };
  var lane = function(i){ return FR.sx + 140 + i*120; };

  o.push('<rect x="'+FR.sx+'" y="'+base+'" width="'+FR.sw+'" height="12" fill="var(--ink)" opacity=".055"/>');
  o.push('<line x1="'+FR.sx+'" y1="'+base+'" x2="'+(FR.sx+FR.sw)+'" y2="'+base+'" stroke="var(--ink-soft)" stroke-width="1.6"/>');

  var step = niceStep(span,5);
  for(var h=0; h<=span+1e-9; h+=step){
    var gy=Y(h);
    o.push('<line x1="'+(FR.sx+62)+'" y1="'+fmt2(gy)+'" x2="'+(FR.sx+FR.sw)+'" y2="'+fmt2(gy)+
           '" stroke="var(--rule)" stroke-width="1"/>');
    o.push('<text x="'+(FR.sx+56)+'" y="'+fmt2(gy+3.5)+'" '+FT+' text-anchor="end">'+tk(h)+'</text>');
  }
  o.push('<text x="'+(FR.sx+56)+'" y="'+(top-6)+'" '+FT+' text-anchor="end">'+tx(sc.unit||["m","ม."])+'</text>');

  (sc.cast ? sc.cast(p,S) : []).forEach(function(v,i){
    var lx = v.lane!=null ? lane(v.lane) : lane(i);
    var f = FIG[v.kind] || FIG.ball;
    f(o, lx, Y(v.h), v.col||"var(--accent)", v.arg);
    if(v.lab) fitText(o, lx, Y(v.h)-18, v.lab, 116, 10.5, v.col||"var(--accent)", "middle");
    if(v.trail) o.push('<line x1="'+lx+'" y1="'+fmt2(Y(v.from||span))+'" x2="'+lx+'" y2="'+fmt2(Y(v.h))+
                       '" stroke="'+(v.col||"var(--accent)")+'" stroke-width="1.2" stroke-dasharray="3 4" opacity=".55"/>');
  });

  (sc.marks ? sc.marks(p) : []).forEach(function(mk,i){
    var mx = FR.sx + 92 + i*18;
    var y1=Y(mk.a), y2=Y(mk.b), c=mk.col||"var(--accent)";
    o.push('<line x1="'+mx+'" y1="'+fmt2(y1)+'" x2="'+mx+'" y2="'+fmt2(y2)+'" stroke="'+c+'" stroke-width="1.3"/>');
    [y1,y2].forEach(function(yy){
      o.push('<line x1="'+(mx-4)+'" y1="'+fmt2(yy)+'" x2="'+(mx+4)+'" y2="'+fmt2(yy)+'" stroke="'+c+'" stroke-width="1.3"/>');
    });
    if(mk.lab) o.push('<text x="'+(mx+7)+'" y="'+fmt2((y1+y2)/2+3)+'" fill="'+c+
                      '" font-family="IBM Plex Sans" font-size="10.5">'+tx(mk.lab)+'</text>');
  });

  return { X:function(){ return FR.sx+FR.sw/2; }, Y:Y, span:span };
};

/* ---------- instrument band ---------- */

function instrument(S, o, ins, ctx){
  if(!ins) return null;
  var k = ins.kind || "graph";

  if(k === "graph"){
    var N=140, xs=[], ys=[], i;
    for(i=0;i<=N;i++){ var x=ins.xmin+(ins.xmax-ins.xmin)*i/N; xs.push(x); ys.push(ins.fn(x,S.p,S)); }
    var hi=Math.max.apply(null,ys.concat([0])), lo=Math.min.apply(null,ys.concat([0]));
    if(ins.ymin!=null) lo=ins.ymin;
    if(ins.ymax!=null) hi=ins.ymax;
    var pad=Math.max(.4,(hi-lo)*0.16); hi+=pad; if(lo<0) lo-=pad;
    /* a drag holds the scale still, or the axis would slide under the pointer */
    if(ins.lockY){ lo=ins.lockY[0]; hi=ins.lockY[1]; }
    var A=axes(o,{x:FR.ix,y:FR.iy,w:FR.iw,h:FR.ih,xmin:ins.xmin,xmax:ins.xmax,ymin:lo,ymax:hi,
                  xlab:ins.xlab, ylab:ins.ylab, xticks:ins.xticks, yticks:ins.yticks});
    var d="";
    for(i=0;i<=N;i++) d+=(i?" L":"M")+fmt2(A.X(xs[i]))+" "+fmt2(A.Y(ys[i]));
    /* the fill may stop short of the curve, so the area can be watched growing */
    if(ins.fill){
      var upto = ins.upto ? ins.upto(S.p,S) : ins.xmax;
      upto = Math.max(ins.xmin, Math.min(ins.xmax, upto));
      var fd="";
      for(i=0;i<=N;i++){
        var fx=ins.xmin+(upto-ins.xmin)*i/N;
        fd+=(i?" L":"M")+fmt2(A.X(fx))+" "+fmt2(A.Y(ins.fn(fx,S.p,S)));
      }
      if(upto>ins.xmin)
        o.push('<path d="'+fd+' L'+fmt2(A.X(upto))+' '+fmt2(A.zy)+' L'+fmt2(A.X(ins.xmin))+' '+
               fmt2(A.zy)+' Z" fill="var(--accent)" fill-opacity=".14"/>');
    }
    o.push('<path d="'+d+'" stroke="var(--accent)" stroke-width="2.4" fill="none"/>');
    if(ins.mark!=null){
      var mx=ins.mark(S.p,S), my=ins.fn(mx,S.p,S);
      o.push('<line x1="'+fmt2(A.X(mx))+'" y1="'+fmt2(A.Y(my))+'" x2="'+fmt2(A.X(mx))+'" y2="'+fmt2(A.zy)+
             '" stroke="var(--accent)" stroke-width="1" stroke-dasharray="2 3" opacity=".7"/>');
      o.push('<circle cx="'+fmt2(A.X(mx))+'" cy="'+fmt2(A.Y(my))+'" r="4.5" fill="var(--accent)"/>');
      return { X:A.X, Y:A.Y, lo:lo, hi:hi, markX:A.X(mx) };
    }
    return { X:A.X, Y:A.Y, lo:lo, hi:hi };
  }

  if(k === "bar"){
    var B=ins.bars.map(function(b){ return {lab:b.lab, v:b.f(S.p,S), c:col(b.col)}; });
    var vs=B.map(function(b){ return b.v; });
    var h2=Math.max.apply(null,vs.concat([0])), l2=Math.min.apply(null,vs.concat([0]));
    if(ins.ymax!=null) h2=ins.ymax;
    var pd=Math.max(1e-6,(h2-l2)*0.2); h2+=pd; if(l2<0) l2-=pd;
    var A2=axes(o,{x:FR.ix,y:FR.iy,w:FR.iw,h:FR.ih-18,xmin:0,xmax:B.length,ymin:l2,ymax:h2,
                   ylab:ins.ylab, xticks:0, yticks:4});
    var w=FR.iw/B.length, bw=Math.min(66,w*0.5);
    B.forEach(function(b,j){
      var cx=A2.X(j+0.5), y0=A2.Y(0), y1=A2.Y(b.v);
      o.push('<rect x="'+fmt2(cx-bw/2)+'" y="'+fmt2(Math.min(y0,y1))+'" width="'+fmt2(bw)+
             '" height="'+fmt2(Math.abs(y1-y0))+'" fill="'+b.c+'" opacity=".9"/>');
      o.push('<text x="'+fmt2(cx)+'" y="'+fmt2(y1+(b.v<0?14:-7))+'" fill="var(--ink)" '+
             'font-family="IBM Plex Sans" font-size="11" font-weight="600" text-anchor="middle">'+fmt2(b.v)+'</text>');
      fitText(o, cx, A2.Y(l2)+32, b.lab, w-6, 10, "var(--ink-soft)", "middle");
    });
    return null;
  }

  if(k === "strip"){
    var P=ins.parts(S.p,S);
    var tot=P.reduce(function(a,q){ return a+Math.max(0,q.v); },0)||1;
    var x0=FR.ix, w2=FR.iw, y=FR.iy+26, hh=48, x=x0;
    P.forEach(function(q){
      var pw=Math.max(0,q.v)/tot*w2;
      o.push('<rect x="'+fmt2(x)+'" y="'+y+'" width="'+fmt2(pw)+'" height="'+hh+'" fill="'+col(q.col)+'" opacity=".88"/>');
      if(pw>36) o.push('<text x="'+fmt2(x+pw/2)+'" y="'+(y+hh/2+4)+'" fill="#fff" font-family="IBM Plex Sans" '+
                       'font-size="11" font-weight="600" text-anchor="middle">'+fmt2(q.v)+'</text>');
      x+=pw;
    });
    o.push('<rect x="'+x0+'" y="'+y+'" width="'+w2+'" height="'+hh+'" fill="none" stroke="var(--ink)" stroke-width="1.6"/>');
    P.forEach(function(q,j){
      var lx=x0+(j%3)*158, ly=y+hh+26+Math.floor(j/3)*19;
      o.push('<rect x="'+lx+'" y="'+(ly-9)+'" width="11" height="11" fill="'+col(q.col)+'"/>');
      fitText(o, lx+17, ly, q.lab, 132, 10.5, "var(--ink-soft)");
    });
    return null;
  }

  if(k === "dial"){
    needle(o, FR.ix+FR.iw/2, FR.iy+104, 78, ins.frac(S.p,S), ins.lab, ins.value(S.p,S));
    return null;
  }
  return null;
}

/* ---------- the composer ---------- */
VIZLIB.scene = {
  vb:"0 0 560 430", anim:false,
  draw:function(S,o,cfg){
    if(cfg.question)
      fitText(o, FR.sx, FR.qy, cfg.question, FR.sw, 12.5, "var(--ink)");

    var ctx = null, B = cfg.scene && SCENE[cfg.scene.kind];
    if(B) ctx = B(S, o, cfg.scene);

    o.push('<line x1="'+FR.sx+'" y1="'+FR.div+'" x2="'+(FR.sx+FR.sw)+'" y2="'+FR.div+
           '" stroke="var(--rule)" stroke-width="1"/>');

    var ictx = instrument(S, o, cfg.instrument, ctx);

    /* the leader: drops from the scene marker into the graph, so the
       reader can see the number's origin */
    if(cfg.leader && ctx && ictx){
      var sxp = ctx.X(cfg.leader(S.p,S));
      var ixp = ictx.markX!=null ? ictx.markX : sxp;
      o.push('<path d="M'+fmt2(sxp)+' '+(FR.ground+4)+' L'+fmt2(sxp)+' '+(FR.div-6)+
             ' L'+fmt2(ixp)+' '+(FR.div+6)+' L'+fmt2(ixp)+' '+(FR.iy)+
             '" fill="none" stroke="var(--accent)" stroke-width="1.1" stroke-dasharray="3 4" opacity=".7"/>');
    }
    if(cfg.note) cap(o, FR.sx, 424, cfg.note, "note");
  }
};

/* ---------- 3.5 · art layer ----------

   Raster and vector art that decorates a visualizer, per the asset contract in
   Project Concept 9 and the body-and-clothes rule in 4:

     - art lives beside the package at  assets/ch<NN>/<name>.<ext>  and is never
       inlined, so the HTML stays the unit of distribution
     - the page must work with assets/ deleted, so every reference is optional
       and a failed load leaves the scene drawn and the lesson intact
     - no meaning may live only in an image: captions and hotspot labels are
       SVG <text> from [en,th] pairs on the layer above, so they translate

   Art sits on its own <svg>, drawn once, behind the scene layer that redraws
   every frame. That keeps an animating visualizer from re-parsing the image
   sixty times a second, and keeps the picture still while the labels move. */

var ART = {
  base: function(){ return "assets/ch" + (CHAPTER.num || "00") + "/"; },
  seen: {},                                  /* src -> "wait" | "ok" | "gone" */

  url: function(src){
    return /^(?:[a-z]+:|\/|\.)/i.test(src) ? src : ART.base() + src;
  },

  /* Ask for a file once. Load and failure both redraw, so the first paint can
     go ahead without waiting and the picture drops in when it arrives. */
  ask: function(src){
    var u = ART.url(src);
    if(ART.seen[u]) return ART.seen[u];
    ART.seen[u] = "wait";
    var im = new Image();
    im.onload  = function(){ ART.seen[u] = "ok";   ART.repaint(); };
    im.onerror = function(){ ART.seen[u] = "gone"; ART.repaint(); };
    im.src = u;
    return "wait";
  },

  ready: function(src){ return ART.ask(src) === "ok"; },

  dark: function(){
    var m = document.documentElement.getAttribute("data-theme");
    if(m) return m === "dark";
    return !!(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
  },

  /* Which file to show, and how, for the theme in force.

     11.5 relieves the artist of any dark-matting duty: assets may assume a
     light ground. The consequence lands here instead - a light-ground plate
     dropped on the dark theme reads as a grey slab. So on dark the engine
     shows an authored dark variant if there is one, inverts a texture that
     says it may be inverted, and otherwise shows nothing. Hiding is the safe
     default because inverting real artwork would misrepresent it, and a
     missing decoration is a state the page is already required to survive. */
  pick: function(a){
    if(!a || !a.src) return null;
    if(!ART.dark()) return { src: a.src, cls: "" };
    if(a.srcDark)   return { src: a.srcDark, cls: "" };
    if(a.dark === "invert") return { src: a.src, cls: "art-invert" };
    if(a.dark === "as-is")  return { src: a.src, cls: "" };
    return null;
  },

  repaint: function(){
    if(typeof LABS === "undefined") return;
    LABS.forEach(function(l){ if(l.repaintArt) l.repaintArt(); });
  },

  /* One <image>, or nothing at all if the file is absent. `fit` follows
     preserveAspectRatio; the default letterboxes rather than distorts. */
  tag: function(a, vb){
    var use = ART.pick(a);
    if(!use || !ART.ready(use.src)) return "";
    var box = ART.box(a, vb);
    return '<image class="' + use.cls + '" href="' + esc(ART.url(use.src)) + '"' +
           ' x="' + box.x + '" y="' + box.y +
           '" width="' + box.w + '" height="' + box.h + '"' +
           ' preserveAspectRatio="' + (a.fit || "xMidYMid meet") + '"' +
           (a.opacity != null ? ' opacity="' + a.opacity + '"' : "") +
           ' aria-hidden="true"/>';
  },

  /* Default to filling the visualizer's own viewBox, so a decorating image
     needs nothing but a filename. */
  box: function(a, vb){
    var v = (vb || "0 0 560 340").split(/\s+/);
    return { x: a.x != null ? a.x : +v[0], y: a.y != null ? a.y : +v[1],
             w: a.w != null ? a.w : +v[2], h: a.h != null ? a.h : +v[3] };
  }
};


/* A plate: the artwork is the scene. Labels sit over it as real text, so the
   plate still says what it means when the file is missing or the reader
   switches language. */
VIZLIB.plate = {
  vb: "0 0 560 340",
  draw: function(S, o, cfg){
    var vb = (cfg && cfg.vb) || VIZLIB.plate.vb,
        v = vb.split(/\s+/), w = +v[2], h = +v[3],
        use = cfg && ART.pick(cfg.art), on = use && ART.ready(use.src), art = cfg && cfg.art;
    /* Plates are framed with a hairline whether or not the art loaded - the
       frame is the house style, not a broken-image marker. */
    o.push('<rect x="0.5" y="0.5" width="' + (w - 1) + '" height="' + (h - 1) +
           '" fill="none" stroke="var(--rule)" stroke-width="1"/>');
    if(!on && art)
      o.push('<text x="' + (w / 2) + '" y="' + (h / 2) +
             '" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="11"' +
             ' text-anchor="middle">' + esc(tx(art.alt || ["", ""])) + '</text>');
    (cfg && cfg.labels || []).forEach(function(L){
      var anc = L.anchor || "middle";
      if(L.pin)
        o.push('<circle cx="' + L.pin[0] + '" cy="' + L.pin[1] + '" r="2.5" fill="var(--ink)"/>' +
               '<line x1="' + L.pin[0] + '" y1="' + L.pin[1] + '" x2="' + L.x + '" y2="' + L.y +
               '" stroke="var(--ink)" stroke-width="1" opacity=".45"/>');
      o.push('<text x="' + L.x + '" y="' + L.y + '" text-anchor="' + anc +
             '" fill="var(--ink)" font-family="IBM Plex Sans" font-size="11"' +
             ' font-weight="600" paint-order="stroke"' +
             ' stroke="var(--ground)" stroke-width="3" stroke-linejoin="round">' +
             esc(tx(L.text)) + '</text>');
    });
  }
};

/*@@STAGE@@*/

/* ---------- 4 · map ---------- */
var NW=150, NH=38;
function node(id){ for(var i=0;i<CHAPTER.nodes.length;i++) if(CHAPTER.nodes[i].id===id) return CHAPTER.nodes[i]; return null; }
function methodMastered(m){ var c=STATE.cov[m]; if(!c) return false; for(var k in c) if(c[k]>0) return true; return false; }
function stateOf(id){
  var n=node(id);
  if(STATE.read[id]){
    if(n.methods && n.methods.length){
      var all=true;
      for(var i=0;i<n.methods.length;i++) if(!methodMastered(n.methods[i])) all=false;
      if(all) return "trained";
    }
    return "read";
  }
  var req=n.requires||[];
  for(var j=0;j<req.length;j++) if(!STATE.read[req[j]]) return "upcoming";
  return "available";
}
/* Orthogonal edge routing for the chapter map.

   Nodes sit on a fixed grid (columns 135 apart, rows 98 apart) but the boxes
   are 150 wide, so neighbouring columns overlap and there is no vertical
   corridor between them. Routes are therefore planned against the nodes that
   actually exist rather than against the grid: a candidate is accepted only
   once every one of its segments has been checked clear of every node that is
   not its own endpoint.

   The earlier version drew one cubic Bezier per edge from the parent's
   bottom-centre to the child's top-centre, which put every edge of a node on
   the same attach point and let a curve cut straight through whatever sat
   between the two rows. */
var EDGE_CH = 30;   /* channel offset from a row edge; rows are 60px apart   */
var EDGE_R  = 8;    /* elbow radius                                          */
var EDGE_GAP = 8;   /* clearance required when testing a route against a box */

function mapRect(n) {
  return { x0: n.x - NW / 2, x1: n.x + NW / 2, y0: n.y - NH / 2, y1: n.y + NH / 2 };
}

/* Does this axis-aligned segment run through any node that is not an endpoint? */
function segClear(p, q, skip) {
  var i, r, x0 = Math.min(p[0], q[0]), x1 = Math.max(p[0], q[0]),
      y0 = Math.min(p[1], q[1]), y1 = Math.max(p[1], q[1]);
  for (i = 0; i < CHAPTER.nodes.length; i++) {
    if (skip.indexOf(CHAPTER.nodes[i].id) >= 0) continue;
    r = mapRect(CHAPTER.nodes[i]);
    if (x1 > r.x0 - EDGE_GAP && x0 < r.x1 + EDGE_GAP &&
        y1 > r.y0 - EDGE_GAP && y0 < r.y1 + EDGE_GAP) return false;
  }
  return true;
}

function ptsClear(pts, skip) {
  for (var i = 0; i < pts.length - 1; i++)
    if (!segClear(pts[i], pts[i + 1], skip)) return false;
  return true;
}

/* Fanned attach points: k-th of n along an edge of the box, never shared. */
function attach(n, side, k, total) {
  var r = mapRect(n), t = (k + 1) / (total + 1);
  if (side === "bottom") return [r.x0 + NW * t, r.y1];
  if (side === "top")    return [r.x0 + NW * t, r.y0];
  if (side === "right")  return [r.x1, r.y0 + NH * t];
  return [r.x0, r.y0 + NH * t];
}

function routeEdge(p, n, pk, pn, nk, nn) {
  var skip = [p.id, n.id], a, b, cand = [], i;
  if (p.y === n.y) {                                   /* same row, sideways */
    var right = n.x > p.x;
    a = attach(p, right ? "right" : "left", pk, pn);
    b = attach(n, right ? "left" : "right", nk, nn);
    if (a[1] === b[1]) return [a, b];
    var mx = (a[0] + b[0]) / 2;
    return [a, [mx, a[1]], [mx, b[1]], b];
  }
  a = attach(p, "bottom", pk, pn);
  b = attach(n, "top", nk, nn);
  if (a[0] === b[0]) cand.push([a, b]);                /* straight down      */
  cand.push([a, [a[0], a[1] + EDGE_CH], [b[0], a[1] + EDGE_CH], b]);   /* high */
  cand.push([a, [a[0], b[1] - EDGE_CH], [b[0], b[1] - EDGE_CH], b]);   /* low  */
  for (i = 0; i < cand.length; i++)
    if (ptsClear(cand[i], skip)) return cand[i];
  /* Both channels blocked: drop out to a side corridor and come back in. */
  var xs = [24, NW / 2 - 24, 470 - 24], best = null;
  for (i = 0; i < xs.length; i++) {
    var route = [a, [a[0], a[1] + EDGE_CH], [xs[i], a[1] + EDGE_CH],
                 [xs[i], b[1] - EDGE_CH], [b[0], b[1] - EDGE_CH], b];
    if (ptsClear(route, skip)) { best = route; break; }
  }
  return best || cand[1];
}

/* Two connectors may share a channel only if their spans do not touch. Where
   they do - most often two edges leaving the same box for different rows - the
   later one is nudged onto its own line so neither hides the other. */
function laneChannels(list){
  var runs=[], i, j, e;
  for(i=0;i<list.length;i++){
    e=list[i];
    for(j=1;j<e.pts.length-2;j++){
      if(e.pts[j][1]===e.pts[j+1][1] && e.pts[j][0]!==e.pts[j+1][0])
        runs.push({e:e,i:j,y:e.pts[j][1],
                   x0:Math.min(e.pts[j][0],e.pts[j+1][0]),
                   x1:Math.max(e.pts[j][0],e.pts[j+1][0])});
    }
  }
  var by={};
  runs.forEach(function(r){ (by[r.y]=by[r.y]||[]).push(r); });
  var off=[0,-12,12,-24,24];
  Object.keys(by).forEach(function(y){
    var g=by[y].sort(function(a,b){ return a.x0-b.x0; }), ends=[];
    g.forEach(function(r){
      var k=0;
      while(k<ends.length && r.x0 < ends[k]-0.5) k++;
      if(k===ends.length) ends.push(r.x1); else ends[k]=r.x1;
      var d=off[Math.min(k,off.length-1)];
      if(d){ r.e.pts[r.i][1]+=d; r.e.pts[r.i+1][1]+=d; }
    });
  });
}

/* Polyline -> path with quarter-arc corners, shrinking the radius on short legs. */
function edgePath(pts) {
  var d = "M" + pts[0][0] + " " + pts[0][1], i;
  function sgn(v) { return v > 0 ? 1 : (v < 0 ? -1 : 0); }
  for (i = 1; i < pts.length - 1; i++) {
    var p = pts[i - 1], c = pts[i], q = pts[i + 1],
        d1x = sgn(c[0] - p[0]), d1y = sgn(c[1] - p[1]),
        d2x = sgn(q[0] - c[0]), d2y = sgn(q[1] - c[1]);
    if (d1x === d2x && d1y === d2y) continue;
    var r = Math.min(EDGE_R,
                     (Math.abs(c[0] - p[0]) + Math.abs(c[1] - p[1])) / 2,
                     (Math.abs(q[0] - c[0]) + Math.abs(q[1] - c[1])) / 2);
    if (r < 1) continue;
    var sweep = (d1x * d2y - d1y * d2x) > 0 ? 1 : 0;
    d += " L" + (c[0] - d1x * r) + " " + (c[1] - d1y * r) +
         " A" + r + " " + r + " 0 0 " + sweep + " " +
         (c[0] + d2x * r) + " " + (c[1] + d2y * r);
  }
  return d + " L" + pts[pts.length - 1][0] + " " + pts[pts.length - 1][1];
}

function drawMap(){
  var E=document.getElementById("edges"), N=document.getElementById("nodes");
  E.innerHTML=""; N.innerHTML="";
  /* Count what leaves and enters each box first, so every connector on one
     edge of a box gets its own attach point instead of sharing the centre. */
  var out={}, inc={}, list=[];
  CHAPTER.nodes.forEach(function(n){
    (n.requires||[]).forEach(function(r){
      var p=node(r); if(!p) return;
      var os=(p.y===n.y)?(n.x>p.x?"right":"left"):"bottom";
      var is=(p.y===n.y)?(n.x>p.x?"left":"right"):"top";
      out[p.id+os]=(out[p.id+os]||0)+1;
      inc[n.id+is]=(inc[n.id+is]||0)+1;
      list.push({p:p,n:n,os:os,is:is,r:r});
    });
  });
  var oi={}, ii={};
  list.forEach(function(e){
    var ok=e.p.id+e.os, ik=e.n.id+e.is;
    oi[ok]=(ok in oi)?oi[ok]+1:0; ii[ik]=(ik in ii)?ii[ik]+1:0;
    e.pts=routeEdge(e.p,e.n,oi[ok],out[ok],ii[ik],inc[ik]);
  });
  laneChannels(list);
  list.forEach(function(e){
    var path=document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d",edgePath(e.pts));
    path.setAttribute("class","medge"+(STATE.read[e.r]?" lit":""));
    path.setAttribute("marker-end","url(#ah)");
    E.appendChild(path);
  });
  CHAPTER.nodes.forEach(function(n){
    var g=document.createElementNS("http://www.w3.org/2000/svg","g");
    g.setAttribute("class","mnode");
    g.setAttribute("data-state",stateOf(n.id));
    g.setAttribute("data-current",STATE.current===n.id?"1":"0");
    g.setAttribute("tabindex","0"); g.setAttribute("role","button");
    var r=document.createElementNS("http://www.w3.org/2000/svg","rect");
    r.setAttribute("x",n.x-NW/2); r.setAttribute("y",n.y-NH/2);
    r.setAttribute("width",NW); r.setAttribute("height",NH);
    var txt=document.createElementNS("http://www.w3.org/2000/svg","text");
    txt.setAttribute("x",n.x); txt.setAttribute("y",n.y+1);
    txt.textContent=tx(n.title);
    g.appendChild(r); g.appendChild(txt);
    function go(){ var el=document.getElementById("sec-"+n.id); if(el) el.scrollIntoView({behavior:"smooth",block:"start"}); }
    g.addEventListener("click",go);
    g.addEventListener("keydown",function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); go(); } });
    N.appendChild(g);
  });
  var done=0; CHAPTER.nodes.forEach(function(n){ if(STATE.read[n.id]) done++; });
  document.getElementById("progNum").textContent=done;
  document.getElementById("progTot").textContent="/"+CHAPTER.nodes.length;
}

/* ---------- 5 · lab factory ---------- */
var LABS=[];
function makeLab(nd, host){
  var viz = typeof nd.viz==="string" ? VIZLIB[nd.viz] : nd.viz;
  if(!viz) return null;
  var cfg = nd.vizcfg || {};
  var ctrls = viz.ctrls || cfg.ctrls || [];
  var animated = viz.anim || cfg.anim;   /* cfg wins for shared builders */
  var readouts = viz.readouts || cfg.readouts || [];

  var h='<div class="lab-head"><span class="label accent">'+t("lab.title")+'</span>'+
        '<div class="lab-mode"><button class="btn m-guided" type="button">'+t("lab.guided")+'</button>'+
        '<button class="btn m-sandbox" type="button">'+t("lab.sandbox")+'</button></div></div>'+
        '<div class="lab-stage">'+
          '<svg class="labart" viewBox="'+viz.vb+'" aria-hidden="true" focusable="false"></svg>'+
          '<svg class="labsvg" viewBox="'+viz.vb+'" role="img" aria-label="visualizer"></svg>'+
        '</div>'+
        (cfg.caption?'<figcaption class="lab-cap">'+esc(tx(cfg.caption))+'</figcaption>':'')+
        '<div class="lab-body">'+
        '<div class="guide"><span class="step g-step"></span><p class="g-text"></p></div>'+
        '<div class="transport g-nav"><button class="btn g-prev" type="button">'+t("lab.prev")+'</button>'+
        '<button class="btn g-next" type="button">'+t("lab.next")+'</button>'+
        '<button class="btn g-skip" type="button">'+t("lab.skip")+'</button></div><div class="ctrls">';
  ctrls.forEach(function(c,i){
    /* A control that picks one of a few named things is a choice, not a
       quantity. Dragging a slider to "2" to mean "cubic" asks the reader to
       remember which number means what; naming the options removes the step. */
    if(c.opts && c.opts.length){
      h+='<div class="ctrl choice">';
      if(c.lab && tx(c.lab)) h+='<label><span>'+esc(tx(c.lab))+'</span></label>';
      h+='<div class="opts" role="group">';
      c.opts.forEach(function(o,j){
        h+='<button type="button" class="opt-b" data-i="'+i+'" data-v="'+
           (c.min!=null?c.min+j:j)+'">'+esc(tx(o))+'</button>';
      });
      h+='</div></div>';
      return;
    }
    h+='<div class="ctrl"><label><span>'+esc(tx(c.lab))+'</span><span class="lv" data-i="'+i+'"></span></label>'+
       '<input type="range" class="cv" data-i="'+i+'" min="'+c.min+'" max="'+c.max+'" step="'+c.step+'" value="'+c.def+'"></div>';
  });
  h+='</div>';
  if(animated) h+='<div class="transport"><button class="btn b-play" type="button">'+t("lab.play")+'</button>'+
                  '<button class="btn b-rew" type="button">'+t("lab.reset")+'</button></div>';
  if(readouts.length){
    h+='<div class="readouts">';
    readouts.forEach(function(r,i){ h+='<div class="ro"><b>'+tx(r.lab)+'</b><span class="rv" data-i="'+i+'"></span></div>'; });
    h+='</div>';
  }
  h+='</div>';
  host.className="lab"; host.innerHTML=h;
  if(cfg.caption) MATH.renderInline(host.querySelector(".lab-cap"));

  var S={p:{},t:0,playing:false,mode:"sandbox",step:0,script:nd.guide||null,raf:null};
  ctrls.forEach(function(c){ S.p[c.k]=c.def; });
  var q=function(s){ return host.querySelector(s); };
  var svg=q(".labsvg"), artsvg=q(".labart");
  var Tkey=null; ctrls.forEach(function(c){ if(c.isT) Tkey=c.k; });

  function labels(){
    host.querySelectorAll(".opt-b").forEach(function(el){
      var c=ctrls[+el.getAttribute("data-i")];
      var on = String(S.p[c.k])===el.getAttribute("data-v");
      el.classList.toggle("on",on);
      el.setAttribute("aria-pressed",on?"true":"false");
    });
    host.querySelectorAll(".lv").forEach(function(el){
      var c=ctrls[+el.getAttribute("data-i")];
      el.textContent=S.p[c.k]+(c.unit||"");
    });
    host.querySelectorAll(".rv").forEach(function(el){
      el.textContent=readouts[+el.getAttribute("data-i")].f(S);
    });
  }
  /* Art changes only when a file finishes loading or fails, so it is painted
     on its own layer rather than rebuilt with every frame of the scene. */
  function paintArt(){
    if(!artsvg) return;
    var a=[];
    if(viz.backdrop) a.push(viz.backdrop(S, cfg, viz.vb));
    if(cfg.art)    a.push(ART.tag(cfg.art, viz.vb));
    if(cfg.artTop) a.push(ART.tag(cfg.artTop, viz.vb));
    artsvg.innerHTML=a.join("");
    artsvg.hidden=!a.join("");
  }
  /* One repaint per frame, never one per event.

     A drag fires "input" far faster than the screen refreshes, and each repaint
     rebuilds the whole scene with innerHTML. Doing that synchronously inside
     the handler puts rendering on the critical path of pointer delivery: on a
     slower machine the events queue behind their own repaints and the thumb
     stops following the cursor until the pointer is released. Coalescing into
     an animation frame keeps the handler O(1) - the last value before the frame
     is the one drawn, which is exactly what the reader should see - and stops
     the play loop and a drag from painting the same frame twice. */
  var frame=null;
  function paint(){ frame=null; var o=[]; viz.draw(S,o,cfg); svg.innerHTML=o.join(""); labels();
                    if(S.afterPaint) S.afterPaint(); }
  function draw(){ if(frame===null) frame=requestAnimationFrame(paint); }
  function applyStep(){
    var st=S.script[S.step]; if(!st) return;
    q(".g-step").textContent=t("lab.step")+" "+(S.step+1)+" / "+S.script.length;
    q(".g-text").textContent=tx(st.say);
    MATH.renderInline(q(".g-text"));
    for(var k in st.set) S.p[k]=st.set[k];
    S.t=0;
    host.querySelectorAll(".cv").forEach(function(el){ el.value=S.p[ctrls[+el.getAttribute("data-i")].k]; });
    labels();
    draw();
  }
  /* Guided is an OFFER, never a gate: sandbox is default and the
     controls stay live in either mode. */
  function setMode(m){
    S.mode=m;
    q(".m-guided").classList.toggle("on",m==="guided");
    q(".m-sandbox").classList.toggle("on",m==="sandbox");
    if(S.onMode) S.onMode(m);
    var g=(m==="guided"&&S.script);
    q(".guide").hidden=!g; q(".g-nav").hidden=!g;
    if(g) applyStep(); else draw();
  }
  /* how long a run lasts: the duration slider, or a length the scene
     computes from its own physics (a stop, a landing) */
  function limit(){ return Tkey ? S.p[Tkey] : (cfg.duration ? cfg.duration(S.p,S) : 10); }
  function tick(){
    if(!S.playing) return;
    var lim = limit();
    S.t+=0.035;
    if(S.t>=lim){ S.t=lim; S.playing=false; var b=q(".b-play"); if(b) b.textContent=t("lab.play");
                  if(S.onEnd){ var f=S.onEnd; S.onEnd=null; f(); } }
    paint();   /* already inside a frame - scheduling another would cost one */
    if(S.playing) S.raf=requestAnimationFrame(tick);
  }
  host.querySelectorAll(".cv").forEach(function(el){
    el.addEventListener("input",function(){
      var c=ctrls[+el.getAttribute("data-i")];
      S.p[c.k]=parseFloat(el.value);
      if(Tkey && S.t>S.p[Tkey]) S.t=S.p[Tkey];
      if(S.onInput) S.onInput(c.k);
      draw();
    });
  });
  host.querySelectorAll(".opt-b").forEach(function(el){
    el.addEventListener("click",function(){
      var c=ctrls[+el.getAttribute("data-i")];
      S.p[c.k]=parseFloat(el.getAttribute("data-v"));
      if(Tkey && S.t>S.p[Tkey]) S.t=S.p[Tkey];
      draw();
    });
  });
  q(".m-guided").addEventListener("click",function(){ if(S.script) setMode("guided"); });
  q(".m-sandbox").addEventListener("click",function(){ setMode("sandbox"); });
  q(".g-next").addEventListener("click",function(){ if(S.step<S.script.length-1){ S.step++; applyStep(); } else setMode("sandbox"); });
  q(".g-prev").addEventListener("click",function(){ if(S.step>0){ S.step--; applyStep(); } });
  q(".g-skip").addEventListener("click",function(){ setMode("sandbox"); });
  if(animated){
    q(".b-play").addEventListener("click",function(){
      S.playing=!S.playing; this.textContent=S.playing?t("lab.pause"):t("lab.play");
      var lim=limit();
      if(S.playing){ if(S.t>=lim) S.t=0; S.raf=requestAnimationFrame(tick); }
    });
    q(".b-rew").addEventListener("click",function(){
      S.playing=false; S.t=0; q(".b-play").textContent=t("lab.play"); draw();
    });
  }
  if(!S.script) q(".m-guided").hidden=true;
  S.redraw=draw;
  /* A visualizer that needs more than a picture - pointer handles, a live
     formula, challenges - adds them through this one door. */
  if(viz.mount) viz.mount(S, host, {
    nd:nd, cfg:cfg, ctrls:ctrls, svg:svg, q:q, draw:draw, paint:paint, labels:labels,
    setMode:setMode, limit:limit,
    sync:function(){
      host.querySelectorAll(".cv").forEach(function(el){ el.value=S.p[ctrls[+el.getAttribute("data-i")].k]; });
      labels();
    },
    play:function(){
      var b=q(".b-play");
      if(!b){ S.t=limit(); paint(); if(S.onEnd){ var f=S.onEnd; S.onEnd=null; f(); } return; }
      cancelAnimationFrame(S.raf); S.t=0; S.playing=true; b.textContent=t("lab.pause");
      S.raf=requestAnimationFrame(tick);
    }
  });
  /* A caption is text in the DOM, so it follows the language switch. */
  S.repaintArt=function(){ paintArt(); var c=q(".lab-cap"); if(c&&cfg.caption){ c.textContent=tx(cfg.caption); MATH.renderInline(c); } };
  paintArt();
  setMode("sandbox");
  LABS.push(S);
  return S;
}

/* ---------- 6 · sections ---------- */
/* ---------- reference table ----------

   Some nodes carry a table of cases to read, not a system to drive: a slider
   that only moved a highlight down a fixed list dressed a reference table up
   as a visualizer without adding anything to it. Those nodes declare
   viz:"table" and the whole table is rendered as content, every row visible
   at once, which is how a reader actually uses one. */
function tableHTML(nd){
  var cfg=nd.vizcfg||{}, key=cfg.rowKey, rows=[];
  try{ rows = cfg.rows ? cfg.rows({}) : []; }catch(e){ rows=[]; }

  /* A readout that was written against the highlighted row is a column of this
     table, one value per row - it only looked like a readout because the
     slider showed one row at a time. One that reads the same for every row is
     a note about the table as a whole. Telling them apart by evaluating both
     ways means nothing has to be restated in the data. */
  var cols=[], facts=[];
  (cfg.readouts||[]).forEach(function(r){
    var vals=[], ok=true;
    for(var i=0;i<rows.length;i++){
      var p={}; if(key) p[key]=i;
      try{ vals.push(r.f({p:p})); }catch(e){ ok=false; break; }
    }
    if(!ok||!vals.length) return;
    var varies=false;
    for(var j=1;j<vals.length;j++) if(vals[j]!==vals[0]) varies=true;
    if(!varies){ facts.push({lab:r.lab, v:vals[0]}); return; }
    /* Some of these readouts only named the row that was highlighted. That is
       a column the table already has - sometimes word for word, sometimes just
       under the same heading - so drop it either way. */
    var lab=String(tx(r.lab));
    for(var c=0;c<(cfg.cols||[]).length;c++){
      if(String(tx(cfg.cols[c]))===lab) return;
      var same=true;
      for(var k=0;k<rows.length;k++){
        var cell=rows[k][c];
        if(!cell||String(tx(cell.v))!==String(vals[k])){ same=false; break; }
      }
      if(same) return;
    }
    cols.push({lab:r.lab, vals:vals});
  });

  var h='<figure class="xtable">';
  if(cfg.title) h+='<figcaption class="label">'+esc(tx(cfg.title))+'</figcaption>';
  h+='<div class="xscroll"><table><thead><tr>';
  (cfg.cols||[]).forEach(function(c){ h+='<th>'+esc(tx(c))+'</th>'; });
  cols.forEach(function(c){ h+='<th>'+esc(tx(c.lab))+'</th>'; });
  h+='</tr></thead><tbody>';
  rows.forEach(function(r,i){
    h+='<tr>';
    r.forEach(function(cell){ h+='<td>'+esc(tx(cell.v))+'</td>'; });
    cols.forEach(function(c){ h+='<td>'+esc(c.vals[i])+'</td>'; });
    h+='</tr>';
  });
  h+='</tbody></table></div>';
  if(cfg.note) h+='<p class="xnote">'+esc(tx(cfg.note))+'</p>';
  if(facts.length){
    h+='<dl class="xfacts">';
    facts.forEach(function(f){
      if(f.v==null||f.v==="") return;
      h+='<dt>'+esc(tx(f.lab))+'</dt><dd>'+esc(f.v)+'</dd>';
    });
    h+='</dl>';
  }
  return h+'</figure>';
}


function buildSections(){
  LABS.forEach(function(l){ l.playing=false; if(l.raf) cancelAnimationFrame(l.raf); if(l.dispose) l.dispose(); });
  LABS=[];
  var host=document.getElementById("nodeSections"); host.innerHTML="";
  CHAPTER.nodes.forEach(function(n,i){
    var isTable = (n.viz === "table");
    var hasLab = !!(n.viz) && !isTable;
    var sec=document.createElement("section");
    sec.className="node-sec"; sec.id="sec-"+n.id;
    sec.setAttribute("data-node",n.id); sec.setAttribute("data-nolab",hasLab?"0":"1");
    if(isTable) sec.setAttribute("data-table","1");
    var main='<div class="node-body">';
    tx(n.body).forEach(function(p){ main+="<p>"+p+"</p>"; });
    main+='</div>';
    if(isTable) main+=tableHTML(n);
    if(n.formula || n.formulaTeX) main+='<div class="formula"><div class="formula-content"></div>'+
      (n.flabel?'<small>'+tx(n.flabel)+'</small>':'')+'</div>';
    if(n.methods && n.methods.length){
      main+='<div class="methods-here"><span class="label">'+t("study.methods")+'</span><div>';
      n.methods.forEach(function(m){
        var def=null; CHAPTER.methods.forEach(function(x){ if(x.id===m) def=x; });
        main+='<span class="mtag">'+m+' · '+(def?tx(def.name):"")+'</span>';
      });
      main+='</div></div>';
    }
    sec.innerHTML='<div class="node-head"><span class="node-num">'+String(i+1).padStart(2,"0")+'</span><h3>'+tx(n.title)+'</h3></div>'+
                  '<div class="node-split"><div class="node-main">'+main+'</div></div>';
    sec.querySelectorAll(".node-body p").forEach(MATH.renderInline);
    sec.querySelectorAll(".xtable td, .xfacts dd, .xnote").forEach(MATH.renderInline);
    if(n.formula || n.formulaTeX) MATH.renderFormula(sec.querySelector(".formula-content"),
      tx(n.formulaTeX || n.formula),!!n.formulaTeX);
    if(hasLab){
      var lh=document.createElement("div");
      sec.querySelector(".node-split").appendChild(lh);
      makeLab(n,lh);
    }
    host.appendChild(sec);
  });
  observeSections();
}
var OBS = null;
function observeSections(){
  if(OBS) OBS.disconnect();
  if(!("IntersectionObserver" in window)){
    CHAPTER.nodes.forEach(function(n){ STATE.read[n.id]=true; }); save(); drawMap(); return;
  }
  OBS=new IntersectionObserver(function(en){
    var ch=false;
    en.forEach(function(e){
      if(e.isIntersecting && e.intersectionRatio>=0.3){
        var id=e.target.getAttribute("data-node");
        if(STATE.current!==id){ STATE.current=id; ch=true; }
        if(!STATE.read[id]){ STATE.read[id]=true; ch=true; }
      }
    });
    if(ch){ save(); drawMap(); }
  },{threshold:[0.3]});
  document.querySelectorAll(".node-sec").forEach(function(s){ OBS.observe(s); });
}

/* ---------- 7 · forge ---------- */
var SURFACES=[{id:"S-01"},{id:"S-02"},{id:"S-03"},{id:"S-04"},{id:"S-05"}];
function sName(id){ return t("s."+id); }
function drawBlueprint(){
  var m=document.getElementById("bpMethods"); m.innerHTML="";
  CHAPTER.methods.forEach(function(x){
    var l=document.createElement("label"); l.className="check";
    l.innerHTML='<input type="checkbox" value="'+x.id+'" checked><span><code>'+x.id+'</code> '+tx(x.name)+'</span>';
    m.appendChild(l);
  });
  var s=document.getElementById("bpSurfaces"); s.innerHTML="";
  var avail = CHAPTER.surfaces || ["S-01","S-02","S-03","S-04","S-05"];
  SURFACES.forEach(function(x){
    if(avail.indexOf(x.id)<0) return;
    var l=document.createElement("label"); l.className="check";
    l.innerHTML='<input type="checkbox" value="'+x.id+'" checked><span><code>'+x.id+'</code> '+sName(x.id)+'</span>';
    s.appendChild(l);
  });
}
function chosen(sel){
  return Array.prototype.slice.call(document.querySelectorAll(sel+" input:checked")).map(function(i){return i.value;});
}
function buildQuestion(m,s){
  var g=CHAPTER.gen[m]; if(!g) return null;
  var q=g(s); if(!q) return null;
  var opts=q.opts.map(function(o){
    var lbl=Array.isArray(o.v)?o.v[L()]:(o.v+(q.unit||""));
    return { label:lbl, ok:!!o.ok, trap:o.trap||null };
  });
  shuffle(opts);
  return { method:m, surface:s, stem:tx(q.stem), opts:opts, fig:q.fig||null };
}
function generate(){
  var ms=chosen("#bpMethods"), ss=chosen("#bpSurfaces");
  var list=document.getElementById("qlist"); list.innerHTML="";
  if(!ms.length||!ss.length){
    list.innerHTML='<div class="q"><div class="q-body"><p class="q-stem">'+t("forge.pickFirst")+'</p></div></div>'; return;
  }
  var n=parseInt(document.getElementById("bpCount").value,10)||12;
  var mode=document.getElementById("bpMode").value, pairs=[];
  if(mode==="coverage"){
    for(var i=0;i<ms.length;i++) for(var j=0;j<ss.length;j++) pairs.push([ms[i],ss[j]]);
    shuffle(pairs);
    var base=pairs.slice();
    while(pairs.length<n) pairs=pairs.concat(base);
    pairs=pairs.slice(0,n);
  } else { for(var k=0;k<n;k++) pairs.push([pick(ms),pick(ss)]); }
  var made=0;
  pairs.forEach(function(p){ var q=buildQuestion(p[0],p[1]); if(q){ list.appendChild(qCard(q,made)); made++; } });
}
function qCard(q,idx){
  var mdef=null; CHAPTER.methods.forEach(function(x){ if(x.id===q.method) mdef=x; });
  var el=document.createElement("div"); el.className="q";
  el.innerHTML='<div class="q-top"><span class="tg m">'+q.method+'</span><span class="tg">'+(mdef?tx(mdef.name):"")+'</span>'+
    '<span class="tg">'+sName(q.surface)+'</span></div><div class="q-body"><p class="q-stem">'+(idx+1)+'. '+q.stem+'</p>'+
    (q.fig?'<div class="q-fig">'+q.fig+'</div>':"")+'<div class="opts"></div><div class="fbslot"></div></div>';
  MATH.renderInline(el.querySelector(".q-stem"));
  var box=el.querySelector(".opts"), letters=["A","B","C","D"];
  q.opts.forEach(function(o,i){
    var b=document.createElement("button");
    b.type="button"; b.className="opt";
    b.innerHTML='<b>'+letters[i]+'</b><span>'+o.label+'</span>';
    MATH.renderInline(b.querySelector("span"));
    b.addEventListener("click",function(){
      var all=box.querySelectorAll(".opt");
      for(var z=0;z<all.length;z++) all[z].disabled=true;
      b.setAttribute("data-mark",o.ok?"right":"wrong");
      if(!o.ok) for(var z2=0;z2<all.length;z2++) if(q.opts[z2].ok) all[z2].setAttribute("data-mark","right");
      record(q.method,q.surface,o.ok);
      var fb=document.createElement("div");
      fb.className="fb"+(o.ok?"":" trap");
      var msg=o.ok?(mdef?tx(mdef.name):""):(o.trap&&CHAPTER.traps[o.trap]?tx(CHAPTER.traps[o.trap]):(mdef?tx(mdef.name):""));
      fb.innerHTML="<b>"+(o.ok?t("forge.right"):(o.trap||t("forge.wrong")))+"</b>"+msg;
      el.querySelector(".fbslot").appendChild(fb);
    });
    box.appendChild(b);
  });
  return el;
}
function record(m,s,ok){
  if(!STATE.cov[m]) STATE.cov[m]={};
  if(!STATE.cov[m][s]) STATE.cov[m][s]=0;
  if(ok) STATE.cov[m][s]++; else if(STATE.cov[m][s]===0) STATE.cov[m][s]=-1;
  save(); drawCoverage(); drawMap();
}
function drawCoverage(){
  var avail = CHAPTER.surfaces || ["S-01","S-02","S-03","S-04","S-05"];
  var h="<tr><th class='rowh'></th>";
  avail.forEach(function(s){ h+="<th>"+s+"</th>"; });
  h+="</tr>";
  CHAPTER.methods.forEach(function(m){
    h+="<tr><th class='rowh'>"+m.id+" · "+tx(m.name)+"</th>";
    avail.forEach(function(s){
      var v=(STATE.cov[m.id]&&STATE.cov[m.id][s])||0;
      h+="<td data-hit='"+(v>0?"1":(v<0?"miss":"0"))+"'>"+(v>0?v:(v<0?"✕":"·"))+"</td>";
    });
    h+="</tr>";
  });
  document.getElementById("covTable").innerHTML=h;
}

/* ---------- 8 · shell ---------- */
function setView(v){
  ["learn","forge"].forEach(function(x){ document.getElementById("view-"+x).classList.toggle("active",x===v); });
  document.querySelectorAll("nav.surfaces button").forEach(function(b){
    b.setAttribute("aria-selected", b.dataset.view===v?"true":"false");
  });
}
function applyLang(){
  document.documentElement.setAttribute("lang",STATE.lang);
  document.querySelectorAll("[data-i18n]").forEach(function(el){ el.textContent=t(el.getAttribute("data-i18n")); });
  /* The page-nav carries its two languages inline rather than through the
     string table, because the words are chapter titles the table never sees.
     The index and bridge pages switch the same way. */
  var k="data-"+(STATE.lang==="th"?"th":"en");
  document.querySelectorAll("["+k+"]").forEach(function(el){ el.textContent=el.getAttribute(k); });
  var fs=document.getElementById("footSrc");
  if(fs) fs.textContent=t("foot.src."+(CHAPTER.subject||"physics"));
  document.getElementById("chNum").textContent=tx(CHAPTER.kicker);
  document.getElementById("chTitle").textContent=tx(CHAPTER.title);
  var mt=document.getElementById("chmap-title");
  if(mt) mt.textContent=tx(CHAPTER.title)+" "+t("map.eyebrow");
  document.getElementById("mapTitle").textContent=tx(CHAPTER.mapTitle);
  document.getElementById("mapLede").textContent=tx(CHAPTER.lede);
  document.getElementById("mapFig").textContent="Fig "+CHAPTER.num+".0 · "+t("map.fig");
  var ext=document.getElementById("mapExt");
  if(CHAPTER.next){ ext.textContent=tx(CHAPTER.next); ext.style.display=""; } else { ext.style.display="none"; }
  document.getElementById("langBtn").textContent = STATE.lang==="en"?"ไทย":"English";
  document.querySelectorAll("[data-"+STATE.lang+"]").forEach(function(el){ el.textContent=el.getAttribute("data-"+STATE.lang); });
  fillSkinPicker();
  buildSections(); drawMap(); drawBlueprint(); drawCoverage();
}
/* The art picker only appears on a chapter that has a stage lab to restyle. */
function fillSkinPicker(){
  var wrap=document.getElementById("artSkinWrap"), sel=document.getElementById("artSkin");
  if(!wrap||!sel||typeof SKINS==="undefined") return;
  var any=CHAPTER.nodes.some(function(n){ return n.viz==="stage"; });
  wrap.hidden=!any||SKINS.list.length<2;
  if(wrap.hidden) return;
  var cur=SK().id;
  sel.innerHTML=SKINS.list.map(function(s){
    return '<option value="'+esc(s.id)+'"'+(s.id===cur?' selected':'')+'>'+esc(tx(s.name))+'</option>';
  }).join("");
}
(function(){
  var sel=document.getElementById("artSkin");
  if(sel) sel.addEventListener("change",function(){ SKINS.use(sel.value); applyLang(); });
})();
document.querySelectorAll("nav.surfaces button").forEach(function(b){
  b.addEventListener("click",function(){ setView(b.dataset.view); });
});
document.getElementById("langBtn").addEventListener("click",function(){
  STATE.lang = STATE.lang==="en"?"th":"en"; save(); applyLang();
});
document.addEventListener("readingthemechange",function(){
  ART.repaint();
  LABS.forEach(function(l){ if(l.redraw) l.redraw(); if(l.repaintArt) l.repaintArt(); });
});
document.getElementById("resetBtn").addEventListener("click",function(){
  STATE={lang:STATE.lang,theme:STATE.theme,read:{},cov:{},current:CHAPTER.nodes[0].id};
  save(); applyLang(); setView("learn"); window.scrollTo({top:0,behavior:"smooth"});
});
document.getElementById("genBtn").addEventListener("click",generate);

applyLang();
setView("learn");
generate();
