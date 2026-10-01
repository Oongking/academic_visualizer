/* Chapter 02 motion models, shared by its stage labs. Pure functions of the
   lab parameters p and the clock t: they say where things are, never how
   they look - that is the art skin's job. */
var C02 = {
  /* out and back along a line; you cannot fly back past the start */
  trip:function(p){ var back=Math.min(p.back,p.out), s=p.out-back; return {back:back, s:s, d:p.out+back}; },
  /* speed ramps steadily from v1 to v2 over T */
  ramp:function(p,t){ t=Math.min(Math.max(t,0),p.T); var v=p.v1+(p.v2-p.v1)*t/p.T; return {v:v, x:(p.v1+v)/2*t}; },
  /* constant a from u; a slowing body stops rather than reversing */
  glide:function(p,t){ t=Math.min(Math.max(t,0),p.T);
    var ts=p.a<0 ? Math.min(t,-p.u/p.a) : t, x=p.u*ts+0.5*p.a*ts*ts;
    return {x:Math.max(0,x), v:Math.max(0,p.u+p.a*t)}; },
  /* reaction at steady u, then braking at b until rest */
  stop:function(p,t){
    var th=p.u*p.rt, d=th+p.u*p.u/(2*p.b), x, v;
    if(t<=p.rt){ x=p.u*t; v=p.u; }
    else { var tau=Math.min(t-p.rt,p.u/p.b); x=th+p.u*tau-0.5*p.b*tau*tau; v=p.u-p.b*tau; }
    return {x:x, v:Math.max(0,v), d:d}; },
  /* free fall with g = 10 m/s², stopping at the ground */
  fall:function(p,t){ return Math.min(p.h, 5*t*t); }
};

var CHAPTER = {
id:"ch02", num:"02", slug:"linear-motion", subject:"physics",
kicker:["Physics · Chapter 02","ฟิสิกส์ · บทที่ 2"],
title:["Linear Motion","การเคลื่อนที่แนวตรง"],
mapTitle:["Six ideas, one chain","หกแนวคิด หนึ่งสายโซ่"],
lede:["Nothing here stands alone. Displacement defines velocity, velocity defines acceleration, and the graph ties them together before the five equations fall out of it. The map tracks where you are — everything below it is one continuous read.",
      "ไม่มีหัวข้อใดอยู่ลำพัง การกระจัดนิยามความเร็ว ความเร็วนิยามความเร่ง และกราฟผูกทั้งหมดเข้าด้วยกันก่อนที่สมการทั้งห้าจะตามมา แผนที่คอยบอกว่าคุณอยู่ตรงไหน ส่วนเนื้อหาทั้งหมดด้านล่างอ่านต่อเนื่องได้เลย"],
next:["→ continues in Chapter 07 · Curved Motion","→ ต่อในบทที่ 7 · การเคลื่อนที่แนวโค้ง"],

nodes:[
{ id:"displacement", x:235, y:52, requires:[], methods:[],
  title:["Displacement","การกระจัด"],
  body:[["Distance is how far you travelled. Displacement is how far you ended up from where you began, and in which direction. Distance is a scalar and never shrinks; displacement is a vector and can return to zero.",
         "Run a full lap of a track and your distance is 400 m while your displacement is exactly zero. Every formula in this chapter is built on displacement, not distance — the single most common place marks are lost."],
        ["ระยะทางคือความยาวเส้นทางที่เคลื่อนที่จริง ส่วนการกระจัดคือระยะจากจุดเริ่มถึงจุดสุดท้ายพร้อมทิศทาง ระยะทางเป็นสเกลาร์และไม่มีวันลดลง แต่การกระจัดเป็นเวกเตอร์และกลับมาเป็นศูนย์ได้",
         "วิ่งรอบสนามครบหนึ่งรอบ ระยะทางคือ 400 เมตร แต่การกระจัดเป็นศูนย์พอดี ทุกสูตรในบทนี้สร้างอยู่บนการกระจัด ไม่ใช่ระยะทาง ซึ่งเป็นจุดที่เสียคะแนนบ่อยที่สุด"]],
  formula:["|s| ≤ distance","|s| ≤ ระยะทาง เสมอ"], flabel:["Always true","จริงเสมอ"],
  viz:"stage",
  vizcfg:{
    spellName:["Thread of Return","ด้ายแห่งการกลับคืน"],
    question:["{@Agent} {@flies} out and turns back. Why does the thread home shrink while the trail keeps growing?",
              "{@agent}{@fly}ออกไปแล้วย้อนกลับ ทำไมด้ายที่โยงกลับ{@origin}หดสั้นลง ทั้งที่รอยทางยาวขึ้นเรื่อย ๆ"],
    ctrls:[
      {k:"out",  lab:["{@Flies} out to","{@fly}ออกไปถึง"],     min:0, max:55, step:1, def:40, unit:" m"},
      {k:"back", lab:["Then turns back by","แล้วย้อนกลับ"], min:0, max:55, step:1, def:24, unit:" m"}
    ],
    readouts:[
      {lab:["Trail {@flown} (distance)","รอยทางที่{@fly} (ระยะทาง)"], f:function(S){ return fmt(C02.trip(S.p).d)+" m"; }},
      {lab:["Thread home (displacement)","ด้ายกลับบ้าน (การกระจัด)"], f:function(S){ return fmt(C02.trip(S.p).s)+" m"; }},
      {lab:["Trail vs thread","รอยทางเทียบด้าย"], f:function(S){
        var r=C02.trip(S.p), d=r.d-r.s;
        return d<1e-9 ? (L()?"เท่ากัน — ยังไม่ได้ย้อนกลับ":"identical — never turned back")
                      : (L()?"ต่างกัน "+fmt(d)+" ม.":"apart by "+fmt(d)+" m"); }},
      {lab:["Back at {@origin}?","กลับถึง{@origin}หรือยัง"], f:function(S){
        return C02.trip(S.p).s<1e-9
          ? (L()?"ถึงแล้ว · การกระจัดเป็นศูนย์":"yes · displacement is zero")
          : (L()?"ยัง":"not yet"); }}
    ],
    world:{ kind:"lane", span:function(){ return 56; } },
    props:function(p,S){
      var r=C02.trip(p), list=[{role:"origin", x:0}];
      if(S.trial) list.push({role:"goal", x:S.trial.goal.s, on:r.s===S.trial.goal.s});
      list.push({role:"marker", x:p.out, on:true, term:"d"});
      return list;
    },
    paths:function(p){
      var r=C02.trip(p), list=[{pts:[[0,40],[p.out,40]], col:"warn", term:"d"}];
      if(r.back>0) list.push({pts:[[p.out,40],[p.out,24],[r.s,24]], col:"warn", term:"d"});
      list.push({pts:[[0,6],[r.s,6]], col:"accent", term:"s", dash:"none"});
      return list;
    },
    cast:function(p){
      var r=C02.trip(p);
      return [{role:"agent", x:r.s, flip:r.back>0, term:"s"}];
    },
    marks:function(p){
      var r=C02.trip(p);
      return [{a:0, b:r.s, lab:["thread home · s","ด้ายกลับบ้าน · s"], col:"accent", term:"s"}];
    },
    handles:[
      {k:"out", at:function(p){ return {x:p.out, lift:52}; }, set:function(m){ return {out:m}; },
       lab:["drag the turn","ลากจุดเลี้ยว"], col:"warn"},
      {k:"back", at:function(p){ return {x:C02.trip(p).s, lift:0}; },
       set:function(m,p){ return {back:p.out-Math.max(0,m)}; },
       lab:["drag {@agent}","ลาก{@agent}"], labBelow:true}
    ],
    instrument:{ kind:"bar",
      ylab:["metres","เมตร"],
      bars:[
        {lab:["Trail · distance","รอยทาง · ระยะทาง"], f:function(p){ return C02.trip(p).d; }, col:"warn"},
        {lab:["Thread · displacement","ด้าย · การกระจัด"], f:function(p){ return C02.trip(p).s; }, col:"accent"}
      ]
    },
    spell:{
      tex:function(p){ var r=C02.trip(p);
        return "s = "+p.out+" - "+r.back+" = "+r.s+"\\,\\text{m}\\qquad d = "+p.out+" + "+r.back+" = "+r.d+"\\,\\text{m}"; },
      terms:[
        {k:"s", sym:"s", lab:["displacement · the thread","การกระจัด · ด้าย"], col:"accent",
         f:function(p){ return C02.trip(p).s+" m"; }},
        {k:"d", sym:"d", lab:["distance · the trail","ระยะทาง · รอยทาง"], col:"warn",
         f:function(p){ return C02.trip(p).d+" m"; }}
      ]
    },
    trials:{
      play:false,
      make:function(){
        var out=ri(26,55), back=ri(6,out-6);
        return {s:out-back, d:out+back, set:{out:20, back:0}};
      },
      say:function(g){ return [
        "The portal opens "+g.s+" m from {@origin} — but only for a traveller whose trail is exactly "+g.d+" m long. Drag the turn and {@agent}, then cast.",
        "ประตูมิติเปิดห่างจาก{@origin} "+g.s+" ม. แต่จะเปิดให้เฉพาะผู้ที่มีรอยทางยาว "+g.d+" ม. พอดี ลากจุดเลี้ยวและ{@agent} แล้วร่ายเวท"]; },
      at:function(g){ return {x:g.s, lift:30}; },
      check:function(p,S,g){
        var r=C02.trip(p);
        if(r.s===g.s && r.d===g.d) return {ok:true, msg:[
          "The portal opens. Out = (d + s) / 2 = "+fmt((g.d+g.s)/2)+" m and back = (d − s) / 2 = "+fmt((g.d-g.s)/2)+" m: the trail and the thread are different quantities.",
          "ประตูมิติเปิดแล้ว ขาไป = (d + s) / 2 = "+fmt((g.d+g.s)/2)+" ม. และขากลับ = (d − s) / 2 = "+fmt((g.d-g.s)/2)+" ม. รอยทางกับด้ายจึงเป็นคนละปริมาณกัน"]};
        return {ok:false, msg:[
          "Thread "+r.s+" m (needs "+g.s+"), trail "+r.d+" m (needs "+g.d+"). Hint: out − back = s, out + back = d.",
          "ด้าย "+r.s+" ม. (ต้องการ "+g.s+") รอยทาง "+r.d+" ม. (ต้องการ "+g.d+") คำใบ้: ขาไป − ขากลับ = s และ ขาไป + ขากลับ = d"]};
      }
    },
    note:["the trail only ever grows; the thread home can shrink back to nothing",
          "รอยทางมีแต่ยาวขึ้น แต่ด้ายที่โยงกลับบ้านหดจนเหลือศูนย์ได้"]
  },
  guide:[
    {say:["{@Agent} {@flies} straight out and stops. Nothing has doubled back, so the trail and the thread match.",
          "{@agent}{@fly}ตรงออกไปแล้วหยุด ยังไม่ได้ย้อนกลับ รอยทางกับด้ายจึงยาวเท่ากัน"], set:{out:40,back:0}},
    {say:["Now {@agent} turns and comes part-way back. The trail keeps growing while the thread home shortens.",
          "ทีนี้{@agent}เลี้ยวกลับมาบางส่วน รอยทางยังยาวขึ้น ขณะที่ด้ายกลับบ้านสั้นลง"], set:{out:40,back:24}},
    {say:["All the way home: eighty metres of trail, and a displacement of exactly zero.",
          "กลับถึงบ้าน: รอยทางยาวแปดสิบเมตร แต่การกระจัดเป็นศูนย์พอดี"], set:{out:40,back:40}}
  ]
},

{ id:"velocity", x:235, y:150, requires:["displacement"], methods:["M-02"],
  title:["Velocity","ความเร็ว"],
  body:[["Velocity is the rate of change of displacement. Speed is its scalar twin: run that lap again and your average speed is healthy while your average velocity is zero.",
         "Drive the lab with acceleration set to zero and watch the velocity–time trace go flat. A flat trace is the signature of constant velocity, and the rectangle beneath it is the displacement."],
        ["ความเร็วคืออัตราการเปลี่ยนแปลงของการกระจัด ส่วนอัตราเร็วคือคู่แฝดที่เป็นสเกลาร์ วิ่งรอบสนามอีกครั้ง อัตราเร็วเฉลี่ยมีค่าพอควรแต่ความเร็วเฉลี่ยเป็นศูนย์",
         "ลองตั้งความเร่งเป็นศูนย์แล้วดูเส้นกราฟความเร็ว–เวลาแบนราบ เส้นแบนคือลายเซ็นของความเร็วคงที่ และสี่เหลี่ยมใต้เส้นคือการกระจัด"]],
  formula:["v = s / t","v = s / t"], flabel:["Average velocity","ความเร็วเฉลี่ย"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["The Average Echo","เงาสะท้อนเฉลี่ย"],
    question:["The faint echo {@flies} at the average speed the whole way. Does {@agent} ever match it?",
              "เงาจาง ๆ {@fly}ด้วยความเร็วเฉลี่ยตลอดทาง {@agent}เคย{@fly}เร็วเท่ามันจริง ๆ ไหม"],
    ctrls:[
      {k:"v1", lab:["Speed at the first {@marker}","ความเร็วที่{@marker}แรก"], min:2, max:22, step:1, def:5, unit:" m/s"},
      {k:"v2", lab:["Speed at the second","ความเร็วที่{@marker}ที่สอง"],    min:2, max:22, step:1, def:14, unit:" m/s"},
      {k:"T",  lab:["Watch for","ดูนาน"], min:2, max:8, step:1, def:6, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Average speed","อัตราเร็วเฉลี่ย"], f:function(S){ return fmt2((S.p.v1+S.p.v2)/2)+" m/s"; }},
      {lab:["Speed right now","ความเร็วขณะนี้"], f:function(S){ return fmt2(C02.ramp(S.p,S.t).v)+" m/s"; }},
      {lab:["Distance so far","ระยะทางถึงตอนนี้"], f:function(S){ return fmt2(C02.ramp(S.p,S.t).x)+" m"; }},
      {lab:["Steady or changing?","คงที่หรือกำลังเปลี่ยน"], f:function(S){
        return Math.abs(S.p.v1-S.p.v2)<0.5 ? (L()?"คงที่ — เฉลี่ยคือค่าจริง":"steady — the average is the truth")
          : (L()?"กำลังเปลี่ยน — เฉลี่ยซ่อนรายละเอียด":"changing — the average hides the story"); }}
    ],
    world:{ kind:"lane", span:function(p,S){
      var D=(p.v1+p.v2)/2*p.T;
      if(S.trial) D=Math.max(D,S.trial.goal.D);
      return Math.max(30,D*1.15); } },
    props:function(p,S){
      var D=(p.v1+p.v2)/2*p.T, done=S.t>=p.T-1e-9;
      var list=[{role:"marker", x:0, on:true}];
      if(S.trial) list.push({role:"goal", x:S.trial.goal.D, on:done && Math.abs(D-S.trial.goal.D)<1e-6});
      else list.push({role:"marker", x:D, on:done});
      return list;
    },
    cast:function(p,S){
      var r=C02.ramp(p,S.t), avg=(p.v1+p.v2)/2, te=Math.min(S.t,p.T);
      return [
        {role:"agent", x:avg*te, ghost:0.32, term:"vbar"},
        {role:"agent", x:r.x, moving:S.playing, term:"v",
         vel:r.v, velScale:2.4, velTerm:"v", velLab:[fmt(r.v)+" m/s", fmt(r.v)+" ม./วิ"]}
      ];
    },
    events:function(p,S){
      var D=(p.v1+p.v2)/2*p.T;
      return [{id:"arrive", when:S.t>=p.T-1e-9, x:D, lift:30, kind:"burst", col:"good"}];
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:8, ymin:0,
      xlab:["seconds","วินาที"], ylab:["m/s","ม./วิ"],
      fn:function(x,p){ var f=Math.min(1,x/p.T); return p.v1+(p.v2-p.v1)*f; },
      mark:function(p,S){ return Math.min(S.t,p.T); }
    },
    overlay:function(o,S,G){
      var avg=(S.p.v1+S.p.v2)/2, y=fmt2(G.Y(avg)), hl=S.hl==="vbar";
      o.push('<line x1="'+fmt2(G.X(0))+'" y1="'+y+'" x2="'+fmt2(G.X(S.p.T))+'" y2="'+y+'" stroke="var(--accent2)" stroke-width="'+(hl?3:1.4)+'" stroke-dasharray="6 4"/>');
      o.push('<text x="'+fmt2(G.X(S.p.T)+6)+'" y="'+(+y+4)+'" fill="var(--accent2)" font-family="IBM Plex Sans" font-size="10.5">'+(L()?"เฉลี่ย":"average")+'</text>');
    },
    leader:function(p,S){ return C02.ramp(p,S.t).x; },
    spell:{
      tex:function(p,S){ var D=(p.v1+p.v2)/2*p.T;
        return "\\bar v = \\dfrac{s}{t} = \\dfrac{"+fmt2(D)+"}{"+p.T+"} = "+fmt2(D/p.T)+"\\,\\text{m/s}\\qquad v_{\\text{now}} = "+fmt2(C02.ramp(p,S.t).v)+"\\,\\text{m/s}"; },
      terms:[
        {k:"vbar", sym:"v̄", lab:["average · the echo","ค่าเฉลี่ย · เงาสะท้อน"], col:"accent2",
         f:function(p){ return fmt2((p.v1+p.v2)/2)+" m/s"; }},
        {k:"v", sym:"v", lab:["right now · {@agent}","ขณะนี้ · {@agent}"], col:"accent",
         f:function(p,S){ return fmt2(C02.ramp(p,S.t).v)+" m/s"; }}
      ]
    },
    trials:{
      lock:["v1","T"],
      make:function(){
        var v1=ri(2,12), v2=ri(v1+2,22), T=ri(3,8);
        return {v1:v1, v2:v2, T:T, D:(v1+v2)/2*T, set:{v1:v1, v2:v1, T:T}};
      },
      say:function(g){ return [
        "{@Goal} is "+fmt2(g.D)+" m away and opens in exactly "+g.T+" s. You leave the first {@marker} at "+g.v1+" m/s and speed up steadily. What speed must you reach at the portal to arrive exactly on time?",
        "{@goal}อยู่ห่างไป "+fmt2(g.D)+" ม. และจะเปิดในอีก "+g.T+" วินาทีพอดี คุณออกจาก{@marker}แรกที่ "+g.v1+" ม./วิ แล้วเร่งขึ้นสม่ำเสมอ ต้องไปถึงประตูด้วยความเร็วเท่าใดจึงจะถึงตรงเวลาพอดี"]; },
      at:function(g){ return {x:g.D, lift:30}; },
      check:function(p,S,g){
        var D=(p.v1+p.v2)/2*p.T, avg=g.D/g.T;
        if(p.v2===g.v2) return {ok:true, msg:[
          "Right on time. The average must be "+fmt2(g.D)+" / "+g.T+" = "+fmt2(avg)+" m/s, and a steady ramp averages its two ends, so the end is 2 × "+fmt2(avg)+" − "+g.v1+" = "+g.v2+" m/s.",
          "ตรงเวลาพอดี ความเร็วเฉลี่ยต้องเป็น "+fmt2(g.D)+" / "+g.T+" = "+fmt2(avg)+" ม./วิ และการเร่งสม่ำเสมอมีค่าเฉลี่ยอยู่กึ่งกลางสองปลาย ปลายทางจึงเป็น 2 × "+fmt2(avg)+" − "+g.v1+" = "+g.v2+" ม./วิ"]};
        return {ok:false, msg:[
          "You averaged "+fmt2((p.v1+p.v2)/2)+" m/s and covered "+fmt2(D)+" m in "+g.T+" s, "+(D<g.D?"short of":"past")+" the portal. What average does the portal need?",
          "คุณเฉลี่ยได้ "+fmt2((p.v1+p.v2)/2)+" ม./วิ และไปได้ "+fmt2(D)+" ม. ใน "+g.T+" วินาที "+(D<g.D?"ยังไม่ถึง":"เลย")+"ประตู ประตูต้องการความเร็วเฉลี่ยเท่าใด"]};
      }
    },
    note:["the average is one number; the arrow tells a different story at every instant",
          "ค่าเฉลี่ยเป็นเลขตัวเดียว แต่ลูกศรเล่าเรื่องต่างกันในทุกขณะ"]
  },
  guide:[
    {say:["Both {@markers} see the same speed. The echo and {@agent} {@fly} as one: here the average really is the truth.",
          "{@markers}ทั้งสองวัดความเร็วเท่ากัน เงากับ{@agent}{@fly}ไปด้วยกัน ตรงนี้ค่าเฉลี่ยคือสิ่งที่เกิดขึ้นจริง"], set:{v1:9,v2:9,T:6}},
    {say:["Now {@agent} speeds up between them. The average still reads 9.5, but press play: the echo pulls ahead, then is caught.",
          "ทีนี้{@agent}เร่งขึ้นระหว่างทาง ค่าเฉลี่ยยังเป็น 9.5 แต่ลองกดเล่น เงาจะนำไปก่อน แล้วถูกไล่ทันตอนจบ"], set:{v1:5,v2:14,T:6}},
    {say:["An extreme ramp. They leave together and arrive together — and are apart the whole way between.",
          "เร่งแบบสุดขั้ว ทั้งสองออกพร้อมกันและถึงพร้อมกัน แต่ห่างกันตลอดทางระหว่างนั้น"], set:{v1:2,v2:22,T:6}}
  ]
},

{ id:"acceleration", x:100, y:248, requires:["velocity"], methods:["M-02"],
  title:["Acceleration","ความเร่ง"],
  body:[["Acceleration is the rate of change of velocity. It says nothing about which way you are moving — only about how your motion is changing.",
         "A car braking from 30 m/s has negative acceleration while still moving forward. Negative acceleration does not mean reversing; it means the velocity is being driven downward, which may eventually flip its sign."],
        ["ความเร่งคืออัตราการเปลี่ยนแปลงของความเร็ว มันไม่ได้บอกว่าคุณเคลื่อนที่ไปทางไหน บอกแค่ว่าการเคลื่อนที่กำลังเปลี่ยนอย่างไร",
         "รถที่เบรกจาก 30 เมตร/วินาที มีความเร่งเป็นลบทั้งที่ยังวิ่งไปข้างหน้า ความเร่งเป็นลบไม่ได้แปลว่าถอยหลัง แต่แปลว่าความเร็วกำลังถูกกดให้ลดลง ซึ่งสุดท้ายอาจกลับเครื่องหมายได้"]],
  formula:["a = (v − u) / t","a = (v − u) / t"], flabel:["Constant acceleration","ความเร่งคงที่"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["Gust Sigil","ตราเวทลม"],
    question:["{@Push} adds the same speed every second. Watch the afterimages: why do they spread apart?",
              "{@push}เพิ่มความเร็วเท่าเดิมทุกวินาที ดูภาพติดตา ทำไมมันจึงห่างกันมากขึ้นเรื่อย ๆ"],
    ctrls:[
      {k:"a", lab:["Strength of {@push}","ความแรงของ{@push}"], min:0.5, max:6, step:.5, def:2.5, unit:" m/s²"},
      {k:"T", lab:["Watch for","ดูนาน"], min:2, max:8, step:1, def:6, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Speed now","ความเร็วขณะนี้"], f:function(S){ return fmt2(S.p.a*Math.min(S.t,S.p.T))+" m/s"; }},
      {lab:["Acceleration","ความเร่ง"], f:function(S){
        return fmt2(S.p.a)+(L()?" ม./วิ² · คงที่":" m/s² · constant"); }},
      {lab:["Gained each second","เพิ่มขึ้นทุกวินาที"], f:function(S){
        return fmt2(S.p.a)+(L()?" ม./วิ":" m/s"); }},
      {lab:["Distance from the start","ระยะจากจุดเริ่ม"], f:function(S){
        var t=Math.min(S.t,S.p.T); return fmt2(0.5*S.p.a*t*t)+" m"; }}
    ],
    world:{ kind:"lane", span:function(p,S){
      var D=0.5*p.a*p.T*p.T;
      if(S.trial) D=Math.max(D,S.trial.goal.D);
      return Math.max(24,D*1.12); } },
    props:function(p,S){
      var list=[{role:"marker", x:0, on:true}], t=Math.min(S.t,p.T);
      if(S.trial){
        var g=S.trial.goal;
        list.push({role:"goal", x:g.D, on:S.t>=p.T-1e-9 && Math.abs(0.5*p.a*p.T*p.T-g.D)<1e-6});
      }
      return list;
    },
    paths:function(p,S){
      var t=Math.min(S.t,p.T), list=[];
      for(var k=1;k<=Math.floor(t+1e-9);k++){
        var x=0.5*p.a*k*k;
        list.push({pts:[[x,0],[x,12]], col:"accent2", term:"a", dash:"none"});
      }
      return list;
    },
    cast:function(p,S){
      var t=Math.min(S.t,p.T), list=[];
      for(var k=1;k<=Math.floor(t+1e-9) && k<t-0.05;k++)
        list.push({role:"agent", x:0.5*p.a*k*k, ghost:0.2, term:"a", haloLift:30});
      list.push({role:"agent", x:0.5*p.a*t*t, moving:S.playing, term:"v",
                 vel:p.a*t, velScale:2, velTerm:"v", velLab:[fmt(p.a*t)+" m/s", fmt(p.a*t)+" ม./วิ"]});
      return list;
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:8, ymin:0,
      xlab:["seconds from the start","วินาทีจากจุดเริ่ม"], ylab:["m/s","ม./วิ"],
      fn:function(x,p){ return p.a*Math.min(x,p.T); },
      mark:function(p,S){ return Math.min(S.t,p.T); }
    },
    /* the rise over one second, drawn on the graph: that rise is a */
    overlay:function(o,S,G){
      var p=S.p, t0=Math.max(0,Math.min(p.T-1,Math.floor(Math.min(S.t,p.T)))), hl=S.hl==="a";
      var x0=G.X(t0), x1=G.X(t0+1), y0=G.Y(p.a*t0), y1=G.Y(p.a*(t0+1)), c="var(--accent2)";
      o.push('<path d="M'+fmt2(x0)+' '+fmt2(y0)+' H'+fmt2(x1)+' V'+fmt2(y1)+'" fill="none" stroke="'+c+'" stroke-width="'+(hl?3:1.6)+'"/>');
      o.push('<text x="'+fmt2(x1+5)+'" y="'+fmt2((y0+y1)/2+4)+'" fill="'+c+'" font-family="IBM Plex Sans" font-size="10.5" font-weight="600">+'+fmt(p.a)+(L()?" ม./วิ ต่อ 1 วิ":" m/s per 1 s")+'</text>');
    },
    leader:function(p,S){ var t=Math.min(S.t,p.T); return 0.5*p.a*t*t; },
    spell:{
      tex:function(p,S){ var t=Math.min(S.t,p.T);
        return "v = u + at = 0 + ("+fmt2(p.a)+")("+fmt2(t)+") = "+fmt2(p.a*t)+"\\,\\text{m/s}"; },
      terms:[
        {k:"a", sym:"a", lab:["gained each second","เพิ่มทุกวินาที"], col:"accent2", f:function(p){ return fmt2(p.a)+" m/s²"; }},
        {k:"v", sym:"v", lab:["speed now","ความเร็วขณะนี้"], col:"accent", f:function(p,S){ return fmt2(p.a*Math.min(S.t,p.T))+" m/s"; }}
      ]
    },
    trials:{
      lock:["T"],
      make:function(){
        var T=pick([4,5,6,8]), a=pick([1,1.5,2,2.5,3,3.5,4,5]);
        return {a:a, T:T, D:0.5*a*T*T, set:{a:(a===0.5?1:0.5), T:T}};
      },
      say:function(g){ return [
        "From rest, reach {@goal} "+fmt2(g.D)+" m away exactly as {@clock} runs out at "+g.T+" s. How strong must {@push} be?",
        "เริ่มจากหยุดนิ่ง ไปให้ถึง{@goal}ที่ห่าง "+fmt2(g.D)+" ม. พอดีตอนที่{@clock}หมดที่ "+g.T+" วินาที {@push}ต้องแรงเท่าใด"]; },
      at:function(g){ return {x:g.D, lift:30}; },
      check:function(p,S,g){
        var D=0.5*p.a*g.T*g.T;
        if(p.a===g.a) return {ok:true, msg:[
          "Through the portal on the last grain of sand. From s = ½at², a = 2s / t² = 2 × "+fmt2(g.D)+" / "+g.T+"² = "+fmt2(g.a)+" m/s².",
          "ผ่านประตูพอดีตอนทรายเม็ดสุดท้าย จาก s = ½at² ได้ a = 2s / t² = 2 × "+fmt2(g.D)+" / "+g.T+"² = "+fmt2(g.a)+" ม./วิ²"]};
        return {ok:false, msg:[
          "At "+fmt2(p.a)+" m/s² you cover ½ × "+fmt2(p.a)+" × "+g.T+"² = "+fmt2(D)+" m — "+(D<g.D?"short":"past")+" by "+fmt2(Math.abs(D-g.D))+" m.",
          "ที่ "+fmt2(p.a)+" ม./วิ² คุณไปได้ ½ × "+fmt2(p.a)+" × "+g.T+"² = "+fmt2(D)+" ม. "+(D<g.D?"ขาดไป":"เลยไป")+" "+fmt2(Math.abs(D-g.D))+" ม."]};
      }
    },
    note:["the slope of this line IS the acceleration — a stronger push, a steeper line",
          "ความชันของเส้นนี้คือความเร่ง แรงส่งมากขึ้น เส้นก็ชันขึ้น"]
  },
  guide:[
    {say:["A gentle push. Press play: the speed climbs steadily and the line is a shallow ramp.",
          "แรงส่งเบา ๆ กดเล่น ความเร็วเพิ่มขึ้นสม่ำเสมอ และเส้นเป็นทางลาดตื้น ๆ"], set:{a:1,T:6}},
    {say:["A stronger push. Same shape, steeper line — the acceleration is the slope. See the afterimages spread wider.",
          "แรงส่งมากขึ้น รูปทรงเดิม แต่เส้นชันขึ้น ความเร่งคือความชัน ภาพติดตาจะห่างกันกว้างขึ้น"], set:{a:4,T:6}},
    {say:["Each second adds the same speed, so each second also covers more ground than the last. Constant acceleration, not constant speed.",
          "ทุกวินาทีเพิ่มความเร็วเท่ากัน ทุกวินาทีจึงไปได้ไกลกว่าวินาทีก่อน ความเร่งคงที่ ไม่ใช่ความเร็วคงที่"], set:{a:2.5,T:8}}
  ]
},

{ id:"vt-graph", x:370, y:248, requires:["velocity"], methods:["M-04","M-05"],
  title:["The v–t graph","กราฟความเร็ว–เวลา"],
  body:[["The velocity–time graph is the most efficient object in this chapter, because it carries two answers at once. Its slope is the acceleration. The area beneath it is the displacement.",
         "Area below the axis counts as negative. A learner who reports the total shaded region as distance travelled has answered a different question from the one asked — that is trap T-01, and it is everywhere."],
        ["กราฟความเร็ว–เวลาเป็นวัตถุที่คุ้มค่าที่สุดในบทนี้ เพราะให้คำตอบสองอย่างพร้อมกัน ความชันคือความเร่ง และพื้นที่ใต้กราฟคือการกระจัด",
         "พื้นที่ใต้แกนมีค่าเป็นลบ ผู้เรียนที่ตอบพื้นที่แรเงารวมว่าเป็นระยะทาง กำลังตอบคนละคำถามกับที่ถูกถาม นั่นคือกับดัก T-01 ซึ่งพบได้ทั่วไป"]],
  formula:["slope = a   ·   area = s","ความชัน = a   ·   พื้นที่ = s"],
  flabel:["Read both from one figure","อ่านได้สองค่าจากรูปเดียว"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["The Scrying Graph","กราฟพยากรณ์"],
    question:["Drag the two glowing handles on the graph. What is the filled area actually measuring?",
              "ลากจุดเรืองแสงสองจุดบนกราฟ พื้นที่ที่ถูกเติมสีนั้นวัดอะไรกันแน่"],
    ctrls:[
      {k:"u", lab:["Speed at the start","ความเร็วตอนเริ่ม"], min:0, max:16, step:1, def:4, unit:" m/s"},
      {k:"a", lab:["Acceleration (slope)","ความเร่ง (ความชัน)"], min:-2, max:5, step:.5, def:2, unit:" m/s²"},
      {k:"T", lab:["Watch for","ดูนาน"], min:2, max:8, step:1, def:6, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Speed now","ความเร็วขณะนี้"], f:function(S){
        return fmt2(Math.max(0,S.p.u+S.p.a*Math.min(S.t,S.p.T)))+" m/s"; }},
      {lab:["Filled area","พื้นที่ที่เติมสี"], f:function(S){ return fmt2(C02.glide(S.p,S.t).x)+" m"; }},
      {lab:["Distance along {@world}","ระยะตาม{@world}"], f:function(S){ return fmt2(C02.glide(S.p,S.t).x)+" m"; }},
      {lab:["So the area is","พื้นที่จึงคือ"], f:function(){
        return L()?"ระยะที่เคลื่อนที่ได้":"the distance travelled"; }}
    ],
    world:{ kind:"lane", span:function(p,S){
      var D=C02.glide(p,p.T).x;
      if(S.trial) D=Math.max(D,S.trial.goal.D);
      return Math.max(30,D*1.15); } },
    props:function(p,S){
      var list=[{role:"marker", x:0, on:true}];
      if(S.trial){
        var g=S.trial.goal;
        list.push({role:"goal", x:g.D, on:S.t>=p.T-1e-9 && p.u===g.u && p.a===g.a});
      }
      return list;
    },
    paths:function(p,S){
      var x=C02.glide(p,S.t).x;
      return x>0 ? [{pts:[[0,8],[x,8]], col:"accent", term:"s"}] : [];
    },
    cast:function(p,S){
      var r=C02.glide(p,S.t);
      return [{role:"agent", x:r.x, moving:S.playing, term:"s",
               vel:r.v, velScale:2.4, velLab:[fmt(r.v)+" m/s", fmt(r.v)+" ม./วิ"]}];
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:8, ymin:0, fill:true,
      xlab:["seconds","วินาที"], ylab:["m/s","ม./วิ"],
      fn:function(x,p){ return Math.max(0, p.u+p.a*Math.min(x,p.T)); },
      upto:function(p,S){ return Math.min(S.t,p.T); },
      mark:function(p,S){ return Math.min(S.t,p.T); }
    },
    handles:[
      {k:"u", space:"graph", at:function(p){ return {t:0, v:p.u}; },
       set:function(t,v){ return {u:v}; }, lab:["start speed u","ความเร็วต้น u"], term:"u"},
      {k:"a", space:"graph", at:function(p){ return {t:p.T, v:Math.max(0,p.u+p.a*p.T)}; },
       set:function(t,v,p){ return {a:(v-p.u)/p.T}; }, lab:["slope a","ความชัน a"], col:"accent2", term:"a"}
    ],
    overlay:function(o,S,G){
      var p=S.p, hl=S.hl, end=Math.max(0,p.u+p.a*p.T);
      if(hl==="a")
        o.push('<line x1="'+fmt2(G.X(0))+'" y1="'+fmt2(G.Y(p.u))+'" x2="'+fmt2(G.X(p.T))+'" y2="'+fmt2(G.Y(end))+
               '" stroke="var(--accent2)" stroke-width="6" opacity=".45" stroke-linecap="round"/>');
      if(hl==="s"){
        var d="M"+fmt2(G.X(0))+" "+fmt2(G.Y(0));
        for(var i=0;i<=40;i++){ var x=p.T*i/40; d+=" L"+fmt2(G.X(x))+" "+fmt2(G.Y(Math.max(0,p.u+p.a*x))); }
        d+=" L"+fmt2(G.X(p.T))+" "+fmt2(G.Y(0))+" Z";
        o.push('<path d="'+d+'" fill="var(--accent)" fill-opacity=".22" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 3"/>');
      }
    },
    leader:function(p,S){ return C02.glide(p,S.t).x; },
    spell:{
      tex:function(p,S){ var t=Math.min(S.t,p.T);
        return "s = ut + \\tfrac12 at^2 = ("+p.u+")("+fmt2(t)+") + \\tfrac12("+fmt2(p.a)+")("+fmt2(t)+")^2 = "+fmt2(C02.glide(p,S.t).x)+"\\,\\text{m}"; },
      terms:[
        {k:"u", sym:"u", lab:["height where it starts","ความสูงตอนเริ่ม"], col:"accent", f:function(p){ return p.u+" m/s"; }},
        {k:"a", sym:"a", lab:["slope of the line","ความชันของเส้น"], col:"accent2", f:function(p){ return fmt2(p.a)+" m/s²"; }},
        {k:"s", sym:"s", lab:["area under it","พื้นที่ใต้เส้น"], col:"good", f:function(p,S){ return fmt2(C02.glide(p,S.t).x)+" m"; }}
      ]
    },
    trials:{
      lock:["T"],
      make:function(){
        var T, u, a, tries=0;
        do{ T=pick([4,5,6]); u=ri(0,10); a=pick([-1,-0.5,0.5,1,1.5,2,2.5,3]); tries++; }
        while(u+a*T<1 && tries<50);
        return {T:T, u:u, a:a, D:u*T+0.5*a*T*T, v:u+a*T, set:{u:ri(0,16), a:0, T:T}};
      },
      say:function(g){ return [
        "Shape the graph so {@agent} covers exactly "+fmt2(g.D)+" m in "+g.T+" s and is moving at "+fmt2(g.v)+" m/s at the end. The end handle fixes one condition; the area fixes the other.",
        "ปั้นกราฟให้{@agent}ไปได้ "+fmt2(g.D)+" ม. พอดีใน "+g.T+" วินาที และมีความเร็ว "+fmt2(g.v)+" ม./วิ ตอนจบ จุดปลายกำหนดเงื่อนไขหนึ่ง พื้นที่กำหนดอีกเงื่อนไขหนึ่ง"]; },
      at:function(g){ return {x:g.D, lift:30}; },
      check:function(p,S,g){
        var D=C02.glide(p,p.T).x, v=Math.max(0,p.u+p.a*p.T);
        if(p.u===g.u && p.a===g.a) return {ok:true, msg:[
          "Area = (u + v) / 2 × t, so u = 2s / t − v = 2 × "+fmt2(g.D)+" / "+g.T+" − "+fmt2(g.v)+" = "+g.u+" m/s, and the slope a = (v − u) / t = "+fmt2(g.a)+" m/s².",
          "พื้นที่ = (u + v) / 2 × t ดังนั้น u = 2s / t − v = 2 × "+fmt2(g.D)+" / "+g.T+" − "+fmt2(g.v)+" = "+g.u+" ม./วิ และความชัน a = (v − u) / t = "+fmt2(g.a)+" ม./วิ²"]};
        return {ok:false, msg:[
          "Your area is "+fmt2(D)+" m (need "+fmt2(g.D)+") and you end at "+fmt2(v)+" m/s (need "+fmt2(g.v)+"). Place the end handle first, then slide the start until the area fits.",
          "พื้นที่ของคุณคือ "+fmt2(D)+" ม. (ต้องการ "+fmt2(g.D)+") และความเร็วตอนจบ "+fmt2(v)+" ม./วิ (ต้องการ "+fmt2(g.v)+") วางจุดปลายก่อน แล้วเลื่อนจุดเริ่มจนพื้นที่พอดี"]};
      }
    },
    note:["height is how fast, width is how long, so the area can only be how far",
          "ความสูงคือเร็วแค่ไหน ความกว้างคือนานแค่ไหน พื้นที่จึงเป็นได้แค่ไปไกลแค่ไหน"]
  },
  guide:[
    {say:["Press play. The filled area grows at exactly the rate {@agent} covers ground.",
          "กดเล่น พื้นที่ที่เติมสีโตขึ้นในอัตราเดียวกับที่{@agent}เคลื่อนที่ไปพอดี"], set:{u:4,a:2,T:6}},
    {say:["Drag the slope handle flat. The area is now a plain rectangle: speed times time.",
          "ลากจุดความชันให้แบน พื้นที่กลายเป็นสี่เหลี่ยมผืนผ้า คือความเร็วคูณเวลา"], set:{u:10,a:0,T:6}},
    {say:["Let the line slope down. The area still measures distance — it just grows more slowly.",
          "ให้เส้นลาดลง พื้นที่ยังวัดระยะทางอยู่ เพียงแต่โตช้าลง"], set:{u:14,a:-2,T:6}}
  ]
},

{ id:"five-equations", x:235, y:346, requires:["acceleration","vt-graph"], methods:["M-01","M-03"],
  title:["The five equations","สมการทั้งห้า"],
  body:[["For constant acceleration there are five equations, and each one is simply missing a different variable. That absence is how you choose.",
         "List what the question gives you and what it asks. One variable will be mentioned nowhere — pick the equation that omits it. This is method M-01, and it converts the whole topic from memory into a two-second lookup."],
        ["สำหรับความเร่งคงที่มีสมการห้าสูตร แต่ละสูตรเพียงแค่ขาดตัวแปรคนละตัว การขาดหายนั้นคือวิธีเลือก",
         "ไล่ดูว่าโจทย์ให้อะไรมาและถามหาอะไร จะมีตัวแปรหนึ่งที่ไม่ถูกกล่าวถึงเลย ให้เลือกสูตรที่ไม่มีตัวแปรนั้น นี่คือวิธี M-01 ซึ่งเปลี่ยนทั้งหัวข้อจากการท่องจำเป็นการเปิดตารางสองวินาที"]],
  formula:["v = u + at   ·   v² = u² + 2as   ·   s = ut + ½at²","v = u + at   ·   v² = u² + 2as   ·   s = ut + ½at²"],
  flabel:["Three of five · the other two omit u and a","สามในห้า · อีกสองสูตรตัด u และ a"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["The Stopping Ward","ม่านเวทหยุดยั้ง"],
    question:["{@Hazard} lies ahead. Can {@agent} stop in time — and can you tell before pressing play?",
              "{@hazard}อยู่ข้างหน้า {@agent}จะหยุดทันไหม และคุณบอกได้ก่อนกดเล่นหรือเปล่า"],
    ctrls:[
      {k:"u",   lab:["Speed when it is spotted","ความเร็วตอนมองเห็น"], min:4, max:24, step:1, def:14, unit:" m/s"},
      {k:"b",   lab:["Strength of {@brake}","ความแรงของ{@brake}"], min:1, max:9, step:.5, def:5, unit:" m/s²"},
      {k:"rt",  lab:["Reaction time","เวลาตอบสนอง"], min:0, max:1.5, step:.1, def:.8, unit:" s"},
      {k:"gap", lab:["Distance ahead","ระยะข้างหน้า"], min:15, max:55, step:1, def:34, unit:" m"}
    ],
    duration:function(p){ return p.rt+p.u/p.b+0.6; },
    readouts:[
      {lab:["Thinking distance","ระยะคิด"], f:function(S){ return fmt2(S.p.u*S.p.rt)+" m"; }},
      {lab:["Braking distance","ระยะเบรก"], f:function(S){ return fmt2(S.p.u*S.p.u/(2*S.p.b))+" m"; }},
      {lab:["Total stopping distance","ระยะหยุดรวม"], f:function(S){ return fmt2(C02.stop(S.p,0).d)+" m"; }},
      {lab:["Verdict","ผลลัพธ์"], f:function(S){
        var d=C02.stop(S.p,0).d;
        return d<=S.p.gap ? (L()?"หยุดทัน · เหลือ "+fmt2(S.p.gap-d)+" ม.":"stops in time · "+fmt2(S.p.gap-d)+" m spare")
                          : (L()?"ไม่ทัน · เกิน "+fmt2(d-S.p.gap)+" ม.":"too late · "+fmt2(d-S.p.gap)+" m over"); }}
    ],
    world:{ kind:"lane", span:function(){ return 60; } },
    props:function(p,S){
      var r=C02.stop(p,S.t), hit=r.d>p.gap && r.x>=p.gap-1e-6;
      return [{role:"marker", x:0, on:true},
              {role:"hazard", x:p.gap+4, awake:hit, term:"gap"}];
    },
    cast:function(p,S){
      var r=C02.stop(p,S.t), list=[];
      if(!S.trial && S.t<1e-9)
        list.push({role:"agent", x:Math.min(58,r.d), ghost:0.28,
                   lab:r.d<=p.gap?["will stop here","จะหยุดตรงนี้"]:["still moving here","ยังไม่หยุดตรงนี้"],
                   col:r.d<=p.gap?"good":"warn"});
      list.push({role:"agent", x:Math.min(r.x, p.gap), moving:S.playing && r.v>0, term:"u",
                 vel:r.v, velScale:2.2, velLab:[fmt(r.v)+" m/s", fmt(r.v)+" ม./วิ"]});
      return list;
    },
    marks:function(p){
      var think=p.u*p.rt, brake=p.u*p.u/(2*p.b);
      return [{a:0, b:Math.min(60,think), lab:["thinking","ระยะคิด"], col:"faint", term:"rt"},
              {a:Math.min(60,think), b:Math.min(60,think+brake), lab:["braking","ระยะเบรก"], col:"warn", term:"b", row:0}];
    },
    handles:[
      {k:"gap", at:function(p){ return {x:p.gap+4, lift:-2}; }, set:function(m){ return {gap:m-4}; },
       lab:["drag","ลาก"], labBelow:true, col:"good"}
    ],
    events:function(p,S){
      var r=C02.stop(p,S.t);
      return [{id:"crash", when:r.d>p.gap && r.x>=p.gap-1e-6, x:p.gap, lift:20, kind:"impact", col:"warn"},
              {id:"halt",  when:r.d<=p.gap && S.t>0 && r.v<=1e-9, x:r.d, lift:20, kind:"burst", col:"good"}];
    },
    instrument:{ kind:"bar",
      ylab:["metres","เมตร"],
      bars:[
        {lab:["Thinking","ระยะคิด"], f:function(p){ return p.u*p.rt; }, col:"faint"},
        {lab:["Braking","ระยะเบรก"], f:function(p){ return p.u*p.u/(2*p.b); }, col:"warn"},
        {lab:["Total needed","ที่ต้องใช้"], f:function(p){ return p.u*p.rt+p.u*p.u/(2*p.b); }, col:"accent"},
        {lab:["Available","ที่มี"], f:function(p){ return p.gap; }, col:"good"}
      ]
    },
    spell:{
      tex:function(p){ var th=p.u*p.rt, br=p.u*p.u/(2*p.b), d=th+br;
        return "d = ut_r + \\dfrac{u^2}{2b} = ("+p.u+")("+fmt2(p.rt)+") + \\dfrac{"+p.u+"^2}{2("+fmt2(p.b)+")} = "+fmt2(th)+" + "+fmt2(br)+
               " = "+fmt2(d)+"\\,\\text{m}\\;"+(d<=p.gap?"\\le":">")+"\\;"+p.gap+"\\,\\text{m}"; },
      terms:[
        {k:"u",  sym:"u",  lab:["speed","ความเร็ว"], col:"accent", f:function(p){ return p.u+" m/s"; }},
        {k:"rt", sym:"tᵣ", lab:["thinking time","เวลาคิด"], col:"faint", f:function(p){ return fmt2(p.rt)+" s"; }},
        {k:"b",  sym:"b",  lab:["braking strength","ความแรงเบรก"], col:"warn", f:function(p){ return fmt2(p.b)+" m/s²"; }},
        {k:"gap", sym:"gap", lab:["room available","ระยะที่มี"], col:"good", f:function(p){ return p.gap+" m"; }}
      ]
    },
    trials:{
      lock:["u","rt","gap"],
      make:function(){
        var u, rt, gap, bmin, bs, n=0;
        do{
          u=ri(10,22); rt=pick([0.3,0.5,0.7,0.9,1]); gap=ri(25,55); n++;
          var room=gap-u*rt; bmin=room>3 ? u*u/(2*room) : 99; bs=Math.ceil(bmin*2-1e-9)/2;
        } while((bs>9 || bs<1.5) && n<200);
        return {u:u, rt:rt, gap:gap, room:gap-u*rt, bmin:bmin, b:bs, set:{u:u, rt:rt, gap:gap, b:1}};
      },
      say:function(g){ return [
        "You {@fly} at "+g.u+" m/s, your reactions take "+g.rt+" s, and {@hazard} is "+g.gap+" m ahead. Choose the gentlest {@brake} (to the nearest 0.5 m/s²) that still stops you in time — work it out before you cast.",
        "คุณ{@fly}ด้วยความเร็ว "+g.u+" ม./วิ ใช้เวลาตอบสนอง "+g.rt+" วินาที และ{@hazard}อยู่ห่างไป "+g.gap+" ม. เลือก{@brake}ที่เบาที่สุด (ละเอียดถึง 0.5 ม./วิ²) ที่ยังหยุดทัน คำนวณก่อนร่ายเวท"]; },
      at:function(g){ return {x:g.gap, lift:30}; },
      check:function(p,S,g){
        var d=C02.stop(p,0).d;
        var why=["Room to brake = "+g.gap+" − "+g.u+" × "+g.rt+" = "+fmt2(g.room)+" m, so b ≥ u² / 2s = "+g.u+"² / (2 × "+fmt2(g.room)+") = "+fmt2(g.bmin)+" → "+fmt2(g.b)+" m/s².",
                 "ระยะที่เหลือให้เบรก = "+g.gap+" − "+g.u+" × "+g.rt+" = "+fmt2(g.room)+" ม. ดังนั้น b ≥ u² / 2s = "+g.u+"² / (2 × "+fmt2(g.room)+") = "+fmt2(g.bmin)+" → "+fmt2(g.b)+" ม./วิ²"];
        if(p.b===g.b) return {ok:true, msg:["Stopped "+fmt2(g.gap-d)+" m short, and not a jolt harder than needed. "+why[0],
                                            "หยุดก่อนถึง "+fmt2(g.gap-d)+" ม. และไม่แรงเกินจำเป็นเลย "+why[1]]};
        if(d<=p.gap) return {ok:false, msg:["Safe — but a gentler {@brake} would still have stopped in time. How little room do you actually need?",
                                            "ปลอดภัย แต่{@brake}ที่เบากว่านี้ก็ยังหยุดทัน จริง ๆ แล้วต้องใช้ระยะน้อยที่สุดเท่าใด"]};
        return {ok:false, msg:["Too gentle: you needed "+fmt2(d)+" m but had "+g.gap+" m. Remember the thinking distance comes off the room first.",
                               "เบาเกินไป ต้องใช้ระยะ "+fmt2(d)+" ม. แต่มีแค่ "+g.gap+" ม. อย่าลืมหักระยะคิดออกก่อน"]};
      }
    },
    note:["speed counts twice in braking (u²): ten percent faster costs twenty-one percent more room",
          "ความเร็วนับสองครั้งในระยะเบรก (u²) เร็วขึ้นสิบเปอร์เซ็นต์ ต้องใช้ระยะเพิ่มยี่สิบเอ็ดเปอร์เซ็นต์"]
  },
  guide:[
    {say:["At 14 m/s with a firm brake, {@agent} stops with room to spare. Press play to see it.",
          "ที่ 14 ม./วิ กับเบรกที่หนักแน่น {@agent}หยุดได้โดยยังเหลือระยะ กดเล่นเพื่อดู"], set:{u:14,b:5,rt:.8,gap:34}},
    {say:["Add just 6 m/s. Thinking distance grew a little; braking distance grew enormously.",
          "เพิ่มแค่ 6 ม./วิ ระยะคิดเพิ่มนิดเดียว แต่ระยะเบรกเพิ่มมหาศาล"], set:{u:20,b:5,rt:.8,gap:34}},
    {say:["Same speed as before, but a distracted glance first. Reaction time alone can decide it.",
          "ความเร็วเท่าเดิม แต่เผลอเหลือบมองก่อน เวลาตอบสนองอย่างเดียวก็ตัดสินผลได้"], set:{u:14,b:5,rt:1.5,gap:34}}
  ]
},

{ id:"free-fall", x:235, y:444, requires:["five-equations"], methods:["M-06"],
  title:["Free fall","การตกแบบเสรี"],
  body:[["Free fall is the five equations with a fixed acceleration of g. Everything hard about it is bookkeeping, not physics.",
         "Choose a positive direction once and hold it for the entire problem. If up is positive then g is −10 m/s² the whole way, including on the way down. At the very top the velocity is zero but the acceleration is still −10 — trap T-02, and it catches almost everyone once."],
        ["การตกแบบเสรีคือสมการทั้งห้าที่ความเร่งถูกตรึงไว้ที่ g ความยากทั้งหมดอยู่ที่การจัดระเบียบเครื่องหมาย ไม่ใช่ฟิสิกส์",
         "เลือกทิศบวกครั้งเดียวและยึดไว้ตลอดทั้งข้อ ถ้าขึ้นเป็นบวก g ก็เป็น −10 เมตร/วินาที² ตลอด รวมถึงตอนขาลง ที่จุดสูงสุดความเร็วเป็นศูนย์แต่ความเร่งยังเป็น −10 นั่นคือกับดัก T-02 ซึ่งดักเกือบทุกคนอย่างน้อยหนึ่งครั้ง"]],
  formula:["a = g = −10 m/s²  (taking up as +)","a = g = −10 m/s²  (ให้ขึ้นเป็นบวก)"],
  flabel:["One sign convention, held throughout","เครื่องหมายเดียว ใช้ตลอดทั้งข้อ"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["Runestone and Gem","หินรูนกับอัญมณี"],
    question:["{@Heavy} and {@light} leave {@perch} together. Which lands first?",
              "{@heavy}กับ{@light}หลุดจาก{@perch}พร้อมกัน อะไรถึงพื้นก่อน"],
    ctrls:[
      {k:"h",  lab:["Height of {@perch}","ความสูงของ{@perch}"], min:2, max:20, step:.2, def:12, unit:" m"},
      {k:"mm", lab:["Mass of {@heavy}","มวลของ{@heavy}"], min:.05, max:2, step:.05, def:.4, unit:" kg"},
      {k:"T",  lab:["Watch for","ดูนาน"], min:1, max:3, step:.2, def:2, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["{@Heavy} has fallen","{@heavy}ตกไปแล้ว"], f:function(S){ return fmt2(C02.fall(S.p,S.t))+" m"; }},
      {lab:["{@Light} has fallen","{@light}ตกไปแล้ว"], f:function(S){ return fmt2(C02.fall(S.p,S.t))+" m"; }},
      {lab:["Time to land","เวลาถึงพื้น"], f:function(S){ return fmt2(Math.sqrt(2*S.p.h/10))+" s"; }},
      {lab:["Does mass matter?","มวลมีผลไหม"], f:function(){
        return L()?"ไม่เลย — ทั้งคู่ตกด้วย g เท่ากัน":"no — both fall at the same g"; }}
    ],
    world:{ kind:"tower", span:function(){ return 21; }, unit:["m","ม."] },
    props:function(p,S){
      var list=[{role:"perch", h:p.h, lane:0.5, w:190, term:"h"}];
      if(S.trial){
        var g=S.trial.goal;
        list.push({role:"goal", h:0, lane:0, on:S.t>=g.t-1e-9 && Math.abs(p.h-g.h)<1e-6});
      }
      return list;
    },
    paths:function(p,S,W){
      var hf=p.h-C02.fall(p,S.t);
      if(hf>=p.h-1e-9) return [];
      return [{pts:[[W.lane(0),p.h],[W.lane(0),hf]], col:"accent", term:"t"},
              {pts:[[W.lane(1),p.h],[W.lane(1),hf]], col:"accent2", term:"t"}];
    },
    cast:function(p,S){
      var hf=p.h-C02.fall(p,S.t);
      return [
        {role:"relic", variant:"heavy", h:hf, lane:0, lift:11, col:"accent", term:"m",
         lab:["{@heavy} · "+fmt2(p.mm)+" kg","{@heavy} · "+fmt2(p.mm)+" กก."], labLift:20},
        {role:"relic", variant:"light", h:hf, lane:1, lift:6, col:"accent2",
         lab:["{@light} · 0.01 kg","{@light} · 0.01 กก."], labLift:14}
      ];
    },
    marks:function(p){ return [{a:0, b:p.h, col:"faint", term:"h"}]; },
    handles:[
      {k:"h", at:function(p){ return {h:p.h, lane:1.55}; }, set:function(h){ return {h:h}; },
       lab:["drag {@perch}","ลาก{@perch}"], col:"good", term:"h"}
    ],
    events:function(p,S){
      var land=C02.fall(p,S.t)>=p.h-1e-9 && S.t>0;
      return [{id:"land0", when:land, h:0, lane:0, kind:"impact", col:"accent"},
              {id:"land1", when:land, h:0, lane:1, kind:"burst", col:"accent2"}];
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:3, ymin:0,
      xlab:["seconds","วินาที"], ylab:["metres fallen","เมตรที่ตกไป"],
      fn:function(x,p){ return Math.min(p.h, 5*x*x); },
      mark:function(p,S){ return Math.min(S.t,p.T); }
    },
    spell:{
      tex:function(p){ var tl=Math.sqrt(2*p.h/10);
        return "h = \\tfrac12 g t^2 \\;\\Rightarrow\\; t = \\sqrt{\\dfrac{2h}{g}} = \\sqrt{\\dfrac{2("+fmt2(p.h)+")}{10}} = "+fmt2(tl)+"\\,\\text{s}"; },
      terms:[
        {k:"h", sym:"h", lab:["height of the fall","ความสูงที่ตก"], col:"good", f:function(p){ return fmt2(p.h)+" m"; }},
        {k:"t", sym:"t", lab:["time to land","เวลาถึงพื้น"], col:"accent", f:function(p){ return fmt2(Math.sqrt(2*p.h/10))+" s"; }},
        {k:"m", sym:"m", lab:["mass — not in the spell","มวล — ไม่อยู่ในบทร่าย"], col:"faint", f:function(p){ return fmt2(p.mm)+" kg"; }}
      ]
    },
    trials:{
      lock:["T"],
      make:function(){
        var t=pick([1,1.2,1.4,1.6,1.8,2]), h=+(5*t*t).toFixed(1);
        return {t:t, h:h, set:{h:(h>10?4:16), T:2.6, mm:+(pick([0.1,0.5,1,2])).toFixed(2)}};
      },
      say:function(g){ return [
        "{@Goal} on the ground opens for a single instant, exactly "+g.t+" s after you let go. From what height must {@heavy} fall to pass through it? Drag {@perch}, then cast. (g = 10 m/s²)",
        "{@goal}บนพื้นจะเปิดเพียงชั่วพริบตา ที่ "+g.t+" วินาทีหลังปล่อยพอดี {@heavy}ต้องตกจากความสูงเท่าใดจึงจะผ่านประตูได้ ลาก{@perch} แล้วร่ายเวท (g = 10 ม./วิ²)"]; },
      at:function(g){ return {h:0, lane:0}; },
      check:function(p,S,g){
        var tl=Math.sqrt(2*p.h/10);
        if(Math.abs(p.h-g.h)<1e-6) return {ok:true, msg:[
          "Through the portal at "+g.t+" s. h = ½gt² = 5 × "+g.t+"² = "+fmt2(g.h)+" m — and the mass never entered the calculation.",
          "ผ่านประตูที่ "+g.t+" วินาทีพอดี h = ½gt² = 5 × "+g.t+"² = "+fmt2(g.h)+" ม. และมวลไม่ได้อยู่ในการคำนวณเลย"]};
        return {ok:false, msg:[
          "From "+fmt2(p.h)+" m it lands after √(2h / g) = "+fmt2(tl)+" s — "+(tl<g.t?"too early":"too late")+". Which height gives "+g.t+" s?",
          "จาก "+fmt2(p.h)+" ม. จะถึงพื้นหลัง √(2h / g) = "+fmt2(tl)+" วินาที "+(tl<g.t?"เร็วไป":"ช้าไป")+" ความสูงเท่าใดจึงได้ "+g.t+" วินาที"]};
      }
    },
    note:["one curve, not two — the heavy one and the light one fall along exactly the same line",
          "มีเส้นเดียว ไม่ใช่สองเส้น ของหนักกับของเบาตกตามเส้นเดียวกันพอดี"]
  },
  guide:[
    {say:["Press play. They leave together and they arrive together.",
          "กดเล่น ทั้งสองหลุดออกพร้อมกันและถึงพื้นพร้อมกัน"], set:{h:12,mm:.4,T:2}},
    {say:["Make {@heavy} two hundred times heavier than {@light}. Play it again — nothing changes. Mass is not in the spell.",
          "ทำให้{@heavy}หนักกว่า{@light}สองร้อยเท่า เล่นใหม่อีกครั้ง ไม่มีอะไรเปลี่ยน มวลไม่อยู่ในบทร่ายเลย"], set:{h:12,mm:2,T:2}},
    {say:["Raise {@perch} and both simply take longer, still in step the whole way down.",
          "ยก{@perch}ให้สูงขึ้น ทั้งคู่ใช้เวลานานขึ้นเท่ากัน และยังลงมาพร้อมกันตลอดทาง"], set:{h:20,mm:.4,T:2.2}}
  ]
}
],

methods:[
{id:"M-01", name:["Select the equation by what is missing","เลือกสูตรจากตัวแปรที่ขาด"]},
{id:"M-02", name:["Apply v = u + at","ใช้ v = u + at"]},
{id:"M-03", name:["Apply v² = u² + 2as","ใช้ v² = u² + 2as"]},
{id:"M-04", name:["Acceleration as slope of v–t","ความเร่งจากความชันกราฟ v–t"]},
{id:"M-05", name:["Displacement as area under v–t","การกระจัดจากพื้นที่ใต้กราฟ v–t"]},
{id:"M-06", name:["Sign convention in free fall","เครื่องหมายในการตกแบบเสรี"]}
],

traps:{
"T-01":["You reported distance where displacement was asked. Area below the axis subtracts.","คุณตอบระยะทางในขณะที่โจทย์ถามการกระจัด พื้นที่ใต้แกนต้องหักลบ"],
"T-02":["Sign slip. Hold one positive direction for the whole problem, including the downward leg.","เครื่องหมายพลาด ยึดทิศบวกเดียวตลอดทั้งข้อ รวมถึงช่วงขาลง"],
"T-03":["Unit mismatch — convert km/h to m/s before substituting.","หน่วยไม่ตรงกัน แปลง กม./ชม. เป็น ม./วินาที ก่อนแทนค่า"],
"T-04":["You dropped the ½. In s = ut + ½at² the triangle is half the rectangle it sits on.","คุณลืม ½ ในสูตร s = ut + ½at²"]
},

fig:function(f){
  var vmax=Math.max(f.u,f.v,0)*1.2+1, vmin=Math.min(f.u,f.v,0)*1.2-1, W=300,x0=36,y1=16,yh=100;
  var Y=function(v){ return y1+yh-((v-vmin)/(vmax-vmin))*yh; }, yz=Y(0);
  var b='<line x1="'+x0+'" y1="'+y1+'" x2="'+x0+'" y2="'+(y1+yh)+'" stroke="var(--ink-faint)" stroke-width="1.4"/>'+
        '<line x1="'+x0+'" y1="'+yz+'" x2="'+(W-14)+'" y2="'+yz+'" stroke="var(--ink-faint)" stroke-width="1.4"/>';
  if(f.shade) b+='<path d="M'+x0+' '+yz+' L'+x0+' '+Y(f.u)+' L'+(W-40)+' '+Y(f.v)+' L'+(W-40)+' '+yz+' Z" fill="var(--accent)" fill-opacity=".14"/>';
  b+='<line x1="'+x0+'" y1="'+Y(f.u)+'" x2="'+(W-40)+'" y2="'+Y(f.v)+'" stroke="var(--accent)" stroke-width="2.4"/>'+
     '<text x="'+(x0-6)+'" y="'+(Y(f.u)+4)+'" text-anchor="end" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+f.u+'</text>'+
     '<text x="'+(W-36)+'" y="'+(Y(f.v)+4)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+f.v+'</text>'+
     '<text x="'+(W-40)+'" y="'+(yz+14)+'" text-anchor="middle" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+f.T+'s</text>';
  return '<svg viewBox="0 0 '+W+' 140" role="img" aria-label="velocity time graph">'+b+'</svg>';
},

gen:{
"M-02": function(sf){
  var u=ri(2,12), a=ri(2,6), T=ri(3,8), v=u+a*T;
  if(sf==="S-05") return {stem:["A cart leaves at "+u+" m/s and is measured at "+v+" m/s after "+T+" s. Find its acceleration.",
                                "รถเริ่มที่ "+u+" ม./วินาที และวัดได้ "+v+" ม./วินาที หลังผ่านไป "+T+" วินาที จงหาความเร่ง"],
    opts:[{v:fmt(a),ok:1},{v:fmt(v/T),trap:"T-01"},{v:fmt(a*2)},{v:fmt(u/T)}],unit:" m/s²"};
  if(sf==="S-04") return {stem:["A body starts at u and accelerates uniformly at a. Which expression gives its velocity after time t?",
                                "วัตถุเริ่มที่ u และมีความเร่งคงที่ a นิพจน์ใดให้ความเร็วหลังเวลา t"],
    opts:[{v:"u + at",ok:1},{v:"ut + ½at²",trap:"T-04"},{v:"u² + 2at"},{v:"(u+v)t / 2"}],unit:""};
  if(sf==="S-03") return {stem:["A train pulls away from a platform at "+u+" m/s, gaining speed steadily at "+a+" m/s². How fast is it moving "+T+" seconds later?",
                                "รถไฟออกจากชานชาลาที่ "+u+" ม./วินาที และเร่งสม่ำเสมอ "+a+" ม./วินาที² หลังจากนั้น "+T+" วินาที รถไฟเร็วเท่าใด"],
    opts:[{v:fmt(v),ok:1},{v:fmt(u+a)},{v:fmt(a*T),trap:"T-03"},{v:fmt(u*T)}],unit:" m/s"};
  return {stem:["Given u = "+u+" m/s, a = "+a+" m/s² and t = "+T+" s, find v.",
                "กำหนด u = "+u+" ม./วินาที, a = "+a+" ม./วินาที² และ t = "+T+" วินาที จงหา v"],
    opts:[{v:fmt(v),ok:1},{v:fmt(u*a*T)},{v:fmt(u+a)},{v:fmt(a*T)}],unit:" m/s"};
},
"M-03": function(sf){
  var u=ri(0,8), a=ri(2,5), s=ri(10,40), v=Math.sqrt(u*u+2*a*s);
  if(sf==="S-05") return {stem:["A body speeds up from "+u+" m/s to "+fmt(v)+" m/s over "+s+" m. Find its acceleration.",
                                "วัตถุเร่งจาก "+u+" ม./วินาที เป็น "+fmt(v)+" ม./วินาที ในระยะ "+s+" เมตร จงหาความเร่ง"],
    opts:[{v:fmt(a),ok:1},{v:fmt(v/s)},{v:fmt((v-u)/s)},{v:fmt(a*2)}],unit:" m/s²"};
  if(sf==="S-04") return {stem:["Time is not mentioned anywhere in the question. Which relation should you reach for?",
                                "โจทย์ไม่กล่าวถึงเวลาเลย ควรใช้ความสัมพันธ์ใด"],
    opts:[{v:"v² = u² + 2as",ok:1},{v:"v = u + at"},{v:"s = ut + ½at²"},{v:"s = ((u+v)/2)t"}],unit:""};
  return {stem:["A body starts at "+u+" m/s and accelerates at "+a+" m/s² over "+s+" m. Find its final velocity.",
                "วัตถุเริ่มที่ "+u+" ม./วินาที เร่ง "+a+" ม./วินาที² เป็นระยะ "+s+" เมตร จงหาความเร็วปลาย"],
    opts:[{v:fmt(v),ok:1},{v:fmt(u+a*s)},{v:fmt(Math.sqrt(2*a*s))},{v:fmt(u*u+2*a*s)}],unit:" m/s"};
},
"M-04": function(sf){
  var u=ri(0,6), T=ri(3,6), a=ri(2,6), v=u+a*T;
  var q={stem:["A velocity–time trace rises in a straight line from "+u+" m/s to "+v+" m/s over "+T+" s. Find the acceleration.",
               "กราฟความเร็ว–เวลาเป็นเส้นตรงไต่จาก "+u+" ม./วินาที ถึง "+v+" ม./วินาที ใน "+T+" วินาที จงหาความเร่ง"],
    opts:[{v:fmt(a),ok:1},{v:fmt(v/T),trap:"T-01"},{v:fmt((v+u)/T)},{v:fmt(v-u)}],unit:" m/s²"};
  if(sf==="S-02") q.fig=CHAPTER.fig({u:u,v:v,T:T,shade:false});
  return q;
},
"M-05": function(sf){
  var u=ri(2,10), T=ri(3,6), a=pick([0,2,3]), v=u+a*T, s=u*T+0.5*a*T*T;
  var q={stem:["A velocity–time trace runs from "+u+" m/s to "+v+" m/s over "+T+" s. Find the displacement.",
               "กราฟความเร็ว–เวลาไล่จาก "+u+" ม./วินาที ถึง "+v+" ม./วินาที ใน "+T+" วินาที จงหาการกระจัด"],
    opts:[{v:fmt(s),ok:1},{v:fmt(u*T),trap:"T-04"},{v:fmt(v*T)},{v:fmt((v-u)*T)}],unit:" m"};
  if(sf==="S-02") q.fig=CHAPTER.fig({u:u,v:v,T:T,shade:true});
  return q;
},
"M-06": function(sf){
  var u=pick([10,15,20,25]), g=10, tTop=u/g, hMax=u*u/(2*g);
  if(sf==="S-05"||sf==="S-01") return {stem:["A ball is thrown straight up at "+u+" m/s. Taking g = 10 m/s², how high does it rise?",
                                             "ขว้างลูกบอลขึ้นตรงๆ ด้วย "+u+" ม./วินาที ให้ g = 10 ม./วินาที² ลูกบอลขึ้นสูงเท่าใด"],
    opts:[{v:fmt(hMax),ok:1},{v:fmt(u*tTop),trap:"T-04"},{v:fmt(hMax*2),trap:"T-02"},{v:fmt(u/g)}],unit:" m"};
  if(sf==="S-04") return {stem:["A ball is thrown upward. At the very top of its flight, which statement is true?",
                                "ขว้างลูกบอลขึ้น ที่จุดสูงสุดของการเคลื่อนที่ ข้อใดถูกต้อง"],
    opts:[{v:["v = 0, a = −10 m/s²","v = 0, a = −10 ม./วินาที²"],ok:1},
          {v:["v = 0, a = 0","v = 0, a = 0"],trap:"T-02"},
          {v:["v = 0, a = +10 m/s²","v = 0, a = +10 ม./วินาที²"],trap:"T-02"},
          {v:["v is maximum, a = 0","v สูงสุด, a = 0"]}],unit:""};
  return {stem:["A ball is thrown straight up at "+u+" m/s with g = 10 m/s². How long until it returns to the thrower's hand?",
                "ขว้างลูกบอลขึ้นตรงๆ ด้วย "+u+" ม./วินาที ให้ g = 10 ม./วินาที² ใช้เวลาเท่าใดกว่าจะกลับถึงมือ"],
    opts:[{v:fmt(2*tTop),ok:1},{v:fmt(tTop),trap:"T-02"},{v:fmt(u),trap:"T-03"},{v:fmt(hMax)}],unit:" s"};
},
"M-01": function(sf){
  var miss=pick([{m:["displacement s","การกระจัด s"],eq:"v = u + at"},
                 {m:["time t","เวลา t"],eq:"v² = u² + 2as"},
                 {m:["final velocity v","ความเร็วปลาย v"],eq:"s = ut + ½at²"},
                 {m:["acceleration a","ความเร่ง a"],eq:"s = ((u+v)/2)t"}]);
  var all=["v = u + at","v² = u² + 2as","s = ut + ½at²","s = ((u+v)/2)t"], opts=[{v:miss.eq,ok:1}];
  for(var i=0;i<all.length&&opts.length<4;i++) if(all[i]!==miss.eq) opts.push({v:all[i]});
  return {stem:["A question mentions neither "+miss.m[0]+" nor asks for it. Which equation should you select?",
                "โจทย์ไม่กล่าวถึงและไม่ถามหา"+miss.m[1]+" ควรเลือกสมการใด"],opts:opts,unit:""};
}
}
};
