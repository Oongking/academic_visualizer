/* Chapter 06 collision lab: two orbs on a line, where they meet, and how
   they leave. Restitution e: 1 elastic, 0.5 half-bouncy, 0 sticking. */
var C06 = {
  XA: 6, XB: 22, k: 1.2, E: [1, 0.5, 0],
  r: function(m){ return 5 + 4 * Math.cbrt(m); },
  rm: function(m){ return C06.r(m) / 12; },          /* radius in metres on this 40 m lane */
  meets: function(p){ return p.u1 > p.u2; },
  out: function(p){
    var e = C06.E[p.e], c = C06.meets(p) ? PHYS.collide(p.m1, p.u1, p.m2, p.u2, e) : { v1: p.u1, v2: p.u2, p: p.m1 * p.u1 + p.m2 * p.u2 };
    c.ke0 = 0.5 * p.m1 * p.u1 * p.u1 + 0.5 * p.m2 * p.u2 * p.u2;
    c.ke1 = 0.5 * p.m1 * c.v1 * c.v1 + 0.5 * p.m2 * c.v2 * c.v2;
    return c;
  },
  /* the lane is fitted to the whole run: shifted right if an orb bounces
     back past the start, and widened if one flies off to the right */
  view: function(p){
    var a = C06.raw(p, 0), z = C06.raw(p, p.T), lo = Math.min(a.a, z.a, z.b), hi = Math.max(a.b, z.a, z.b);
    var off = Math.max(0, 3 - lo);
    return { off: off, span: Math.max(40, hi + off + 3) };
  },
  at: function(p, t){
    var r = C06.raw(p, t), off = C06.view(p).off;
    return { a: r.a + off, b: r.b + off, hit: r.hit, cx: r.cx != null ? r.cx + off : null };
  },
  raw: function(p, t){
    var gap = C06.XB - C06.XA - C06.rm(p.m1) - C06.rm(p.m2), tc = C06.meets(p) ? gap / (p.u1 - p.u2) : Infinity;
    if(t <= tc) return { a: C06.XA + p.u1 * t, b: C06.XB + p.u2 * t, hit: false };
    var r = C06.out(p), ac = C06.XA + p.u1 * tc, bc = C06.XB + p.u2 * tc, d = t - tc;
    return { a: ac + r.v1 * d, b: bc + r.v2 * d, hit: true, cx: (ac + bc) / 2 };
  }
};

var CHAPTER = {
id:"ch06", num:"06", slug:"momentum", subject:"physics",
kicker:["Physics · Chapter 06","ฟิสิกส์ · บทที่ 6"],
title:["Momentum","โมเมนตัมและการชน"],
mapTitle:["The quantity collisions cannot destroy","ปริมาณที่การชนทำลายไม่ได้"],
lede:["Energy is often lost in a collision. Momentum never is. That asymmetry is the whole chapter: one conserved quantity you can always write down, and one that only survives in the special case.",
      "พลังงานมักสูญหายในการชน แต่โมเมนตัมไม่เคยหาย ความไม่สมมาตรนี้คือทั้งบท ปริมาณหนึ่งที่อนุรักษ์เสมอและเขียนลงได้ทุกครั้ง กับอีกปริมาณที่รอดเฉพาะกรณีพิเศษ"],
next:["→ continues in Chapter 07 · Curved Motion","→ ต่อในบทที่ 7 · การเคลื่อนที่แนวโค้ง"],

nodes:[
{ id:"momentum", x:235, y:52, requires:[], methods:["M-01"],
  title:["Momentum","โมเมนตัม"],
  body:[["Momentum is p = mv, and it is a vector. A lorry crawling at 2 m/s and a motorcycle at 60 m/s can carry the same momentum, which is why mass and velocity must always be considered together.",
         "Because it is a vector, direction is not decoration. In one dimension pick a positive direction and hold it; a body moving the other way carries negative momentum."],
        ["โมเมนตัมคือ p = mv และเป็นเวกเตอร์ รถบรรทุกที่คลานด้วย 2 ม./วินาที กับมอเตอร์ไซค์ที่ 60 ม./วินาที อาจมีโมเมนตัมเท่ากัน จึงต้องพิจารณามวลกับความเร็วควบคู่กันเสมอ",
         "เพราะเป็นเวกเตอร์ ทิศทางจึงไม่ใช่ของประดับ ในหนึ่งมิติให้เลือกทิศบวกแล้วยึดไว้ วัตถุที่วิ่งสวนทางมีโมเมนตัมเป็นลบ"]],
  formula:["p = mv","p = mv"],
  flabel:["A vector · units kg·m/s","เป็นเวกเตอร์ · หน่วย kg·m/s"],
  viz:"bars",
  vizcfg:{
    title:["MASS AND SPEED TRADE OFF","มวลกับอัตราเร็วแลกกันได้"],
    ylab:["kg·m/s","kg·m/s"],
    ctrls:[
      {k:"m1", lab:["Truck mass","มวลรถบรรทุก"],   min:500, max:8000, step:100, def:4000, unit:" kg"},
      {k:"v1", lab:["Truck speed","อัตราเร็วรถบรรทุก"], min:1, max:30, step:1, def:5, unit:" m/s"},
      {k:"m2", lab:["Bullet mass","มวลกระสุน"],    min:.005, max:.2, step:.005, def:.02, unit:" kg"},
      {k:"v2", lab:["Bullet speed","อัตราเร็วกระสุน"], min:100, max:1200, step:50, def:800, unit:" m/s"}
    ],
    readouts:[
      {lab:["Truck momentum","โมเมนตัมรถบรรทุก"], f:function(S){ return fmt2(S.p.m1*S.p.v1)+" kg·m/s"; }},
      {lab:["Bullet momentum","โมเมนตัมกระสุน"],  f:function(S){ return fmt2(S.p.m2*S.p.v2)+" kg·m/s"; }},
      {lab:["Which carries more?","อันไหนมากกว่า"], f:function(S){
        return S.p.m1*S.p.v1>S.p.m2*S.p.v2 ? (L()?"รถบรรทุก":"the truck") : (L()?"กระสุน":"the bullet"); }},
      {lab:["Kinetic energy ratio","อัตราส่วนพลังงานจลน์"], f:function(S){
        var p=S.p; return fmt2((0.5*p.m1*p.v1*p.v1)/(0.5*p.m2*p.v2*p.v2))+" ×"; }}
    ],
    bars:[
      {lab:["Truck p = mv","รถบรรทุก p = mv"], f:function(p){ return p.m1*p.v1; }, col:"accent"},
      {lab:["Bullet p = mv","กระสุน p = mv"],  f:function(p){ return p.m2*p.v2; }, col:"warn"}
    ],
    note:["momentum is linear in speed, but kinetic energy is quadratic — they rank things differently","โมเมนตัมเป็นเชิงเส้นกับอัตราเร็ว แต่พลังงานจลน์เป็นกำลังสอง ทั้งสองจึงจัดอันดับต่างกัน"]
  } },

{ id:"impulse", x:235, y:150, requires:["momentum"], methods:["M-02"],
  title:["Impulse","การดล"],
  body:[["Impulse is force times the time it acts, and it equals the change in momentum: Ft = mv − mu. Rearranged, F = Δp/Δt — Newton's second law in its original and more general form.",
         "This explains airbags, crash barriers and bending your knees when you land. The momentum change is fixed by the collision; stretching the time is the only way to reduce the force."],
        ["การดลคือแรงคูณเวลาที่แรงกระทำ และเท่ากับการเปลี่ยนแปลงโมเมนตัม Ft = mv − mu จัดรูปใหม่ได้ F = Δp/Δt ซึ่งคือกฎข้อสองของนิวตันในรูปดั้งเดิมที่กว้างกว่า",
         "นี่อธิบายถุงลมนิรภัย แบริเออร์กันชน และการย่อเข่าตอนลงพื้น การเปลี่ยนโมเมนตัมถูกกำหนดโดยการชนแล้ว การยืดเวลาจึงเป็นทางเดียวที่ลดแรงได้"]],
  formula:["Ft = Δp = mv − mu","Ft = Δp = mv − mu"],
  flabel:["Longer time · smaller force","เวลานานขึ้น · แรงน้อยลง"],
  viz:"motion",
  guide:[
    {say:["A steady force acting over a duration changes the velocity. That change, times the mass, is the impulse.",
          "แรงคงที่ที่กระทำตลอดช่วงเวลาทำให้ความเร็วเปลี่ยน การเปลี่ยนนั้นคูณมวลคือการดล"], set:{u:0,a:5,T:4}},
    {say:["Halve the force and double the time. The velocity change comes out the same — same impulse, gentler ride.",
          "ลดแรงครึ่งหนึ่งและเพิ่มเวลาสองเท่า ความเร็วที่เปลี่ยนเท่าเดิม การดลเท่ากันแต่นุ่มนวลกว่า"], set:{u:0,a:2.5,T:8}},
    {say:["A large negative acceleration over a very short time is a crash. Same Δp, enormous force.",
          "ความเร่งลบขนาดใหญ่ในเวลาสั้นมากคือการชน Δp เท่าเดิมแต่แรงมหาศาล"], set:{u:20,a:-10,T:2}}
  ]},

{ id:"conservation", x:235, y:248, requires:["impulse"], methods:["M-03"],
  title:["Conservation of momentum","การอนุรักษ์โมเมนตัม"],
  body:[["In any collision or explosion with no external force, total momentum before equals total momentum after. The internal forces are a Newton pair, so they cancel exactly.",
         "This holds whether or not energy is conserved, which makes it the most reliable equation in the chapter. Write it down first, always."],
        ["ในการชนหรือการระเบิดใดๆ ที่ไม่มีแรงภายนอก โมเมนตัมรวมก่อนเท่ากับโมเมนตัมรวมหลัง แรงภายในเป็นคู่ตามกฎข้อสามจึงหักล้างกันพอดี",
         "ข้อนี้เป็นจริงไม่ว่าพลังงานจะอนุรักษ์หรือไม่ จึงเป็นสมการที่เชื่อถือได้ที่สุดในบทนี้ ให้เขียนลงก่อนเสมอ"]],
  formula:["Σp before = Σp after","Σp ก่อน = Σp หลัง"],
  flabel:["True in every collision","จริงในการชนทุกแบบ"],
  viz:"bars",
  vizcfg:{
    title:["THE TOTAL BEFORE EQUALS THE TOTAL AFTER","ผลรวมก่อนชนเท่ากับผลรวมหลังชน"],
    ylab:["kg·m/s","kg·m/s"],
    ctrls:[
      {k:"m1", lab:["Mass A","มวล A"],       min:1, max:10, step:.5, def:3, unit:" kg"},
      {k:"u1", lab:["A before","A ก่อนชน"],  min:-8, max:12, step:.5, def:6, unit:" m/s"},
      {k:"m2", lab:["Mass B","มวล B"],       min:1, max:10, step:.5, def:2, unit:" kg"},
      {k:"u2", lab:["B before","B ก่อนชน"],  min:-8, max:12, step:.5, def:-2, unit:" m/s"}
    ],
    readouts:[
      {lab:["Total before","รวมก่อนชน"], f:function(S){
        return fmt2(S.p.m1*S.p.u1+S.p.m2*S.p.u2)+" kg·m/s"; }},
      {lab:["Total after (they stick)","รวมหลังชน (ติดกัน)"], f:function(S){
        return fmt2(S.p.m1*S.p.u1+S.p.m2*S.p.u2)+" kg·m/s"; }},
      {lab:["Common velocity","ความเร็วร่วม"], f:function(S){
        var p=S.p; return fmt2((p.m1*p.u1+p.m2*p.u2)/(p.m1+p.m2))+" m/s"; }},
      {lab:["Any external force?","มีแรงภายนอกไหม"], f:function(){
        return L()?"ไม่มี — จึงอนุรักษ์ได้":"none — which is why it is conserved"; }}
    ],
    bars:[
      {lab:["A before","A ก่อน"],    f:function(p){ return p.m1*p.u1; }, col:"faint"},
      {lab:["B before","B ก่อน"],    f:function(p){ return p.m2*p.u2; }, col:"faint"},
      {lab:["Total before","รวมก่อน"], f:function(p){ return p.m1*p.u1+p.m2*p.u2; }, col:"accent"},
      {lab:["Total after","รวมหลัง"],  f:function(p){ return p.m1*p.u1+p.m2*p.u2; }, col:"good"}
    ],
    note:["momentum is a vector — a body moving backwards contributes a negative bar","โมเมนตัมเป็นเวกเตอร์ วัตถุที่วิ่งย้อนกลับให้แถบค่าติดลบ"]
  },
  guide:[
    {say:["A moves right, B moves left. B's bar hangs below the axis because its momentum is negative.",
          "A วิ่งไปขวา B วิ่งไปซ้าย แถบของ B ห้อยใต้แกนเพราะโมเมนตัมเป็นลบ"], set:{m1:3,u1:6,m2:2,u2:-2}},
    {say:["The last two bars are always identical, whatever you set. That is conservation, drawn.",
          "แถบสองอันสุดท้ายเท่ากันเสมอ ไม่ว่าจะตั้งค่าอย่างไร นั่นคือการอนุรักษ์ที่วาดออกมา"], set:{m1:3,u1:6,m2:2,u2:-9}},
    {say:["Tune B so the two contributions cancel. Total momentum is zero — and stays zero after the crash.",
          "ปรับ B ให้สองส่วนหักล้างกัน โมเมนตัมรวมเป็นศูนย์ และยังเป็นศูนย์หลังชน"], set:{m1:3,u1:4,m2:6,u2:-2}}
  ] },

{ id:"collisions", x:100, y:346, requires:["conservation"], methods:["M-04","M-05"],
  title:["Types of collision","ชนิดของการชน"],
  body:[["Elastic collisions conserve kinetic energy as well as momentum. Inelastic ones lose kinetic energy to heat, sound and deformation. Perfectly inelastic means the bodies stick and move off together with one common velocity.",
         "Assuming energy is conserved when the question says the bodies stick together is trap T-02 — sticking guarantees that energy was lost."],
        ["การชนแบบยืดหยุ่นอนุรักษ์ทั้งพลังงานจลน์และโมเมนตัม ส่วนแบบไม่ยืดหยุ่นสูญเสียพลังงานจลน์ไปเป็นความร้อน เสียง และการเปลี่ยนรูป แบบไม่ยืดหยุ่นสมบูรณ์คือวัตถุติดกันแล้วเคลื่อนที่ไปด้วยความเร็วร่วมเดียวกัน",
         "การสมมติว่าพลังงานอนุรักษ์ทั้งที่โจทย์บอกว่าวัตถุติดกันคือกับดัก T-02 การติดกันรับประกันว่าพลังงานสูญหายแน่นอน"]],
  formula:["Sticks together → v = (m₁u₁ + m₂u₂)/(m₁ + m₂)","ติดกัน → v = (m₁u₁ + m₂u₂)/(m₁ + m₂)"],
  flabel:["Perfectly inelastic","ไม่ยืดหยุ่นสมบูรณ์"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["Clash of the Orbs","การปะทะของลูกแก้ว"],
    question:["Fling the two orbs together. What survives every collision — and what can be lost?",
              "เหวี่ยงลูกแก้วสองลูกเข้าหากัน อะไรอยู่รอดทุกการชน และอะไรสูญหายได้"],
    ctrls:[
      {k:"e",  lab:["Kind of collision","ชนิดการชน"], min:0, max:2, step:1, def:0,
       opts:[["Elastic","ยืดหยุ่น"],["Half-bouncy","กึ่งยืดหยุ่น"],["They stick","ติดกัน"]]},
      {k:"m1", lab:["Mass of orb A","มวลลูกแก้ว A"], min:1, max:8, step:.5, def:3, unit:" kg"},
      {k:"u1", lab:["A's speed before","ความเร็ว A ก่อนชน"], min:0, max:12, step:.5, def:6, unit:" m/s"},
      {k:"m2", lab:["Mass of orb B","มวลลูกแก้ว B"], min:1, max:8, step:.5, def:3, unit:" kg"},
      {k:"u2", lab:["B's speed before","ความเร็ว B ก่อนชน"], min:-6, max:6, step:.5, def:0, unit:" m/s"},
      {k:"T",  lab:["Watch for","ดูนาน"], min:3, max:10, step:1, def:6, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Total momentum","โมเมนตัมรวม"], f:function(S){ return fmt2(C06.out(S.p).p)+" kg·m/s"; }},
      {lab:["A after","A หลังชน"], f:function(S){ return fmt2(C06.out(S.p).v1)+" m/s"; }},
      {lab:["B after","B หลังชน"], f:function(S){ return fmt2(C06.out(S.p).v2)+" m/s"; }},
      {lab:["Kinetic energy lost","พลังงานจลน์ที่สูญไป"], f:function(S){ var r=C06.out(S.p); return fmt2(r.ke0-r.ke1)+" J"; }}
    ],
    world:{ kind:"lane", span:function(p){ return C06.view(p).span; } },
    cast:function(p,S){
      var st=C06.at(p,S.t), r=C06.out(p), hit=st.hit;
      var A=hit?r.v1:p.u1, B=hit?r.v2:p.u2;
      return [
        {role:"orb", x:st.a, size:C06.r(p.m1), col:"accent", term:"p", lab:["A · "+fmt2(p.m1)+" kg","A · "+fmt2(p.m1)+" กก."],
         labLift:C06.r(p.m1)*2+22, vel:A, velScale:5, velLift:C06.r(p.m1)*2+38, velCol:"accent", velLab:["p = "+fmt2(p.m1*A),"p = "+fmt2(p.m1*A)]},
        {role:"orb", x:st.b, size:C06.r(p.m2), col:"accent2", variant:"rose", term:"p", lab:["B · "+fmt2(p.m2)+" kg","B · "+fmt2(p.m2)+" กก."],
         labLift:C06.r(p.m2)*2+22, vel:B, velScale:5, velLift:C06.r(p.m2)*2+38, velCol:"accent2", velLab:["p = "+fmt2(p.m2*B),"p = "+fmt2(p.m2*B)]}
      ];
    },
    handles:[
      {k:"u1", at:function(p){ return {x:C06.XA+C06.view(p).off+p.u1*C06.k, lift:-4}; }, set:function(m,p){ return {u1:(m-C06.XA-C06.view(p).off)/C06.k}; },
       lab:["fling A","เหวี่ยง A"], labBelow:true, col:"accent"},
      {k:"u2", at:function(p){ return {x:C06.XB+C06.view(p).off+p.u2*C06.k, lift:-4}; }, set:function(m,p){ return {u2:(m-C06.XB-C06.view(p).off)/C06.k}; },
       lab:["fling B","เหวี่ยง B"], labBelow:true, col:"accent2"}
    ],
    events:function(p,S){
      var st=C06.at(p,S.t);
      return [{id:"hit", when:st.hit && S.t>0, x:st.cx, lift:16, kind:p.e===2?"impact":"burst", col:p.e===2?"warn":"accent"}];
    },
    instrument:{ kind:"bar",
      ylab:["kg·m/s   ·   J","kg·m/s   ·   J"],
      bars:[
        {lab:["Momentum before","โมเมนตัมก่อน"], f:function(p){ return C06.out(p).p; }, col:"accent"},
        {lab:["Momentum after","โมเมนตัมหลัง"], f:function(p){ var r=C06.out(p); return p.m1*r.v1+p.m2*r.v2; }, col:"accent"},
        {lab:["Energy before","พลังงานก่อน"], f:function(p){ return C06.out(p).ke0; }, col:"good"},
        {lab:["Energy after","พลังงานหลัง"], f:function(p){ return C06.out(p).ke1; }, col:"warn"}
      ]
    },
    spell:{
      tex:function(p){ var r=C06.out(p);
        return "m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2:\\quad ("+fmt2(p.m1)+")("+fmt2(p.u1)+") + ("+fmt2(p.m2)+")("+fmt2(p.u2)+") = ("+fmt2(p.m1)+")("+fmt2(r.v1)+") + ("+fmt2(p.m2)+")("+fmt2(r.v2)+") = "+fmt2(r.p)+"\\,\\text{kg·m/s}"; },
      terms:[
        {k:"p", sym:"Σp", lab:["total momentum · always kept","โมเมนตัมรวม · อยู่รอดเสมอ"], col:"accent", f:function(p){ return fmt2(C06.out(p).p)+" kg·m/s"; }},
        {k:"ke", sym:"ΔE", lab:["energy lost to heat and sound","พลังงานที่สูญเป็นความร้อนและเสียง"], col:"warn", f:function(p){ var r=C06.out(p); return fmt2(r.ke0-r.ke1)+" J"; }}
      ]
    },
    predict:{ kind:"choice",
      ask:["After the clash, what will orb A do?","หลังการปะทะ ลูกแก้ว A จะทำอะไร"],
      opts:[["Stop dead","หยุดนิ่ง"],["Keep going forward","ไปข้างหน้าต่อ"],["Bounce back","กระเด้งกลับ"]],
      actual:function(p){ var r=C06.out(p); if(!C06.meets(p)) return 1; return Math.abs(r.v1)<0.05 ? 0 : (r.v1>0 ? 1 : 2); },
      explain:function(p){ var r=C06.out(p); return [
        "Momentum before is "+fmt2(r.p)+" kg·m/s and must still be "+fmt2(r.p)+" after: A leaves at "+fmt2(r.v1)+" m/s and B at "+fmt2(r.v2)+" m/s. A light orb hitting a heavy one bounces back; equal orbs in an elastic hit swap speeds.",
        "โมเมนตัมก่อนชนคือ "+fmt2(r.p)+" kg·m/s และหลังชนต้องยังเป็น "+fmt2(r.p)+" A ออกไปด้วย "+fmt2(r.v1)+" ม./วิ และ B ด้วย "+fmt2(r.v2)+" ม./วิ ลูกเบาชนลูกหนักจะกระเด้งกลับ ลูกเท่ากันชนแบบยืดหยุ่นจะสลับความเร็วกัน"]; }
    },
    trials:{
      veil:true,
      make:function(){
        var kind=pick(["stick","stop","give"]), n=0;
        if(kind==="stick"){
          do{ var m1=ri(2,16)/2, m2=ri(2,16)/2, V=ri(2,10)/2, u1=V*(m1+m2)/m1; n++; }
          while((Math.abs(u1*2-Math.round(u1*2))>1e-9 || u1>12) && n<500);
          return {kind:kind, m1:m1, m2:m2, V:V, u1:u1, set:{e:2, m1:m1, m2:m2, u2:0, u1:0}};
        }
        if(kind==="stop"){ var m2s=ri(2,16)/2; return {kind:kind, m2:m2s, set:{e:0, m2:m2s, u1:6, u2:0, m1:(m2s>4?1:8)}}; }
        do{ var a=ri(2,16)/2, b=ri(2,16)/2, V2=ri(2,16)/2, u=V2*(a+b)/(2*a); n++; }
        while((Math.abs(u*2-Math.round(u*2))>1e-9 || u>12) && n<500);
        return {kind:"give", m1:a, m2:b, V:V2, u1:u, set:{e:0, m1:a, m2:b, u2:0, u1:0}};
      },
      lockFor:function(g){ return g.kind==="stop" ? ["e","m2","u1","u2"] : ["e","m1","m2","u2"]; },
      say:function(g){
        if(g.kind==="stick") return ["The orbs will stick. A is "+g.m1+" kg, B is "+g.m2+" kg and waits at rest. How fast must A fly so the joined pair drifts off at exactly "+g.V+" m/s?",
                                     "ลูกแก้วจะติดกัน A หนัก "+g.m1+" กก. B หนัก "+g.m2+" กก. และอยู่นิ่ง A ต้องพุ่งเร็วเท่าใดให้คู่ที่ติดกันเคลื่อนไปด้วย "+g.V+" ม./วิ พอดี"];
        if(g.kind==="stop") return ["In an elastic clash with B ("+g.m2+" kg, at rest), choose A's mass so that A stops dead and B takes all its motion.",
                                    "ในการชนแบบยืดหยุ่นกับ B ("+g.m2+" กก. อยู่นิ่ง) เลือกมวลของ A ให้ A หยุดนิ่ง และ B รับการเคลื่อนที่ไปทั้งหมด"];
        return ["Elastic clash: A ("+g.m1+" kg) hits B ("+g.m2+" kg, at rest). How fast must A fly so that B shoots off at exactly "+g.V+" m/s?",
                "ชนแบบยืดหยุ่น: A ("+g.m1+" กก.) ชน B ("+g.m2+" กก. อยู่นิ่ง) A ต้องพุ่งเร็วเท่าใดให้ B พุ่งออกไปด้วย "+g.V+" ม./วิ พอดี"];
      },
      at:function(){ return {x:22, lift:30}; },
      check:function(p,S,g){
        var r=C06.out(p);
        if(g.kind==="stick"){
          if(p.u1===g.u1) return {ok:true, msg:["Stuck together at "+g.V+" m/s. Momentum in = momentum out: m₁u₁ = (m₁ + m₂)v, so u₁ = "+g.V+" × "+(g.m1+g.m2)+" / "+g.m1+" = "+g.u1+" m/s. Kinetic energy is NOT conserved — "+fmt2(r.ke0-r.ke1)+" J went to heat (trap T-02).",
                                                "ติดกันไปด้วย "+g.V+" ม./วิ โมเมนตัมเข้า = โมเมนตัมออก: m₁u₁ = (m₁ + m₂)v ดังนั้น u₁ = "+g.V+" × "+(g.m1+g.m2)+" / "+g.m1+" = "+g.u1+" ม./วิ พลังงานจลน์ไม่อนุรักษ์ — "+fmt2(r.ke0-r.ke1)+" J กลายเป็นความร้อน (กับดัก T-02)"]};
          return {ok:false, msg:["The pair moved at "+fmt2(r.v1)+" m/s. Sticking means one velocity after: use momentum, not energy.",
                                 "คู่ที่ติดกันเคลื่อนที่ "+fmt2(r.v1)+" ม./วิ ติดกันหมายถึงมีความเร็วเดียวหลังชน ใช้โมเมนตัม ไม่ใช่พลังงาน"]};
        }
        if(g.kind==="stop"){
          if(p.m1===g.m2) return {ok:true, msg:["A stops dead and B leaves at A's old speed. In an elastic clash between equal masses the two simply swap velocities.",
                                                "A หยุดนิ่ง และ B ออกไปด้วยความเร็วเดิมของ A ในการชนแบบยืดหยุ่นระหว่างมวลเท่ากัน ทั้งสองแค่สลับความเร็วกัน"]};
          return {ok:false, msg:[r.v1>0 ? "A kept going at "+fmt2(r.v1)+" m/s — it is too heavy." : "A bounced back at "+fmt2(-r.v1)+" m/s — it is too light.",
                                 r.v1>0 ? "A ยังไปต่อที่ "+fmt2(r.v1)+" ม./วิ หนักเกินไป" : "A กระเด้งกลับที่ "+fmt2(-r.v1)+" ม./วิ เบาเกินไป"]};
        }
        if(p.u1===g.u1) return {ok:true, msg:["B shoots off at "+g.V+" m/s. In an elastic clash with B at rest, v₂ = 2m₁u₁ / (m₁ + m₂), so u₁ = "+g.V+" × "+(g.m1+g.m2)+" / (2 × "+g.m1+") = "+g.u1+" m/s.",
                                              "B พุ่งออกไปด้วย "+g.V+" ม./วิ ในการชนแบบยืดหยุ่นที่ B อยู่นิ่ง v₂ = 2m₁u₁ / (m₁ + m₂) ดังนั้น u₁ = "+g.V+" × "+(g.m1+g.m2)+" / (2 × "+g.m1+") = "+g.u1+" ม./วิ"]};
        return {ok:false, msg:["B left at "+fmt2(r.v2)+" m/s. Both momentum and kinetic energy are kept in an elastic clash — together they fix v₂.",
                               "B ออกไปด้วย "+fmt2(r.v2)+" ม./วิ การชนแบบยืดหยุ่นเก็บทั้งโมเมนตัมและพลังงานจลน์ ทั้งสองอย่างร่วมกันกำหนด v₂"]};
      }
    },
    note:["the two momentum bars always match; the two energy bars match only when nothing sticks or squashes",
          "แถบโมเมนตัมสองแถบเท่ากันเสมอ แถบพลังงานสองแถบเท่ากันก็ต่อเมื่อไม่มีอะไรติดหรือบุบ"]
  },
  guide:[
    {say:["Equal orbs, elastic. Press play: A stops dead and B carries on at A's speed — they swap.",
          "ลูกแก้วเท่ากัน ชนแบบยืดหยุ่น กดเล่น A หยุดนิ่ง และ B ไปต่อด้วยความเร็วของ A ทั้งสองสลับกัน"], set:{e:0,m1:3,u1:6,m2:3,u2:0,T:6}},
    {say:["Now make them stick. Both momentum bars still match, but the energy-after bar drops: that energy became heat.",
          "ทีนี้ให้ติดกัน แถบโมเมนตัมสองแถบยังเท่ากัน แต่แถบพลังงานหลังชนลดลง พลังงานส่วนนั้นกลายเป็นความร้อน"], set:{e:2,m1:3,u1:6,m2:3,u2:0,T:6}},
    {say:["A light orb into a heavy one, elastic: A bounces back. Its momentum turns negative, and B's grows to keep the total the same.",
          "ลูกเบาชนลูกหนัก แบบยืดหยุ่น A กระเด้งกลับ โมเมนตัมของ A ติดลบ และของ B เพิ่มขึ้นเพื่อให้ผลรวมเท่าเดิม"], set:{e:0,m1:1,u1:8,m2:6,u2:0,T:6}}
  ]
},

{ id:"two-d", x:370, y:346, requires:["conservation"], methods:["M-06"],
  title:["Collisions in two dimensions","การชนสองมิติ"],
  body:[["In two dimensions momentum is conserved along each axis independently. Resolve every velocity into x and y components and write two separate equations — the problem is never harder than that.",
         "One elegant result worth knowing: when two equal masses collide elastically and one was at rest, they separate at exactly 90° to each other."],
        ["ในสองมิติ โมเมนตัมอนุรักษ์แยกกันในแต่ละแกน ให้แตกความเร็วทุกตัวเป็นองค์ประกอบ x และ y แล้วเขียนสมการสองสมการแยกกัน โจทย์ไม่เคยยากไปกว่านี้",
         "ผลลัพธ์งดงามที่ควรรู้คือ เมื่อมวลเท่ากันสองก้อนชนกันแบบยืดหยุ่นโดยก้อนหนึ่งหยุดนิ่งอยู่ ทั้งสองจะแยกออกทำมุม 90° กันพอดี"]],
  formula:["Σp_x before = Σp_x after   ·   Σp_y before = Σp_y after","Σp_x ก่อน = Σp_x หลัง   ·   Σp_y ก่อน = Σp_y หลัง"],
  flabel:["Two axes, two equations","สองแกน สองสมการ"],
  viz:"vector",
  guide:[
    {say:["Treat the two outgoing momenta as vectors. Their resultant must equal the incoming momentum.",
          "มองโมเมนตัมที่ออกไปทั้งสองเป็นเวกเตอร์ ผลลัพธ์ต้องเท่ากับโมเมนตัมที่เข้ามา"], set:{A:10,tA:35,B:10,tB:-35}},
    {say:["Equal masses, elastic, one initially at rest — the two paths open to exactly 90°.",
          "มวลเท่ากัน ชนยืดหยุ่น ก้อนหนึ่งหยุดนิ่งอยู่ เส้นทางทั้งสองจะกางออกเป็น 90° พอดี"], set:{A:10,tA:45,B:10,tB:-45}},
    {say:["Unequal masses break the symmetry. The heavier body takes the smaller angle.",
          "มวลไม่เท่ากันทำลายความสมมาตร ก้อนที่หนักกว่าจะเบนด้วยมุมที่เล็กกว่า"], set:{A:14,tA:20,B:7,tB:-55}}
  ]}
],

methods:[
{id:"M-01", name:["Compute momentum with sign","คำนวณโมเมนตัมพร้อมเครื่องหมาย"]},
{id:"M-02", name:["Apply impulse Ft = Δp","ใช้การดล Ft = Δp"]},
{id:"M-03", name:["Conserve momentum in 1D","อนุรักษ์โมเมนตัมในหนึ่งมิติ"]},
{id:"M-04", name:["Solve a perfectly inelastic collision","แก้การชนไม่ยืดหยุ่นสมบูรณ์"]},
{id:"M-05", name:["Classify a collision by energy","จำแนกการชนจากพลังงาน"]},
{id:"M-06", name:["Conserve momentum in 2D","อนุรักษ์โมเมนตัมในสองมิติ"]}
],

traps:{
"T-01":["Momentum is a vector. A body moving the other way contributes a negative term.","โมเมนตัมเป็นเวกเตอร์ วัตถุที่วิ่งสวนทางให้ค่าเป็นลบ"],
"T-02":["If the bodies stick together, kinetic energy was NOT conserved. Only momentum was.","ถ้าวัตถุติดกัน พลังงานจลน์ไม่ได้อนุรักษ์ มีเพียงโมเมนตัมเท่านั้นที่อนุรักษ์"],
"T-03":["Impulse is force times time, not force times distance. That is work.","การดลคือแรงคูณเวลา ไม่ใช่แรงคูณระยะทาง อย่างหลังคืองาน"],
"T-04":["Components must be resolved before adding. Momenta at an angle do not add as plain numbers.","ต้องแตกองค์ประกอบก่อนบวก โมเมนตัมที่ทำมุมกันบวกเป็นตัวเลขธรรมดาไม่ได้"]
},

gen:{
"M-01": function(sf){
  var m=pick([2,4,5,8]), v=pick([3,6,10,12]);
  if(sf==="S-04") return {stem:["A ball of momentum p bounces straight back with the same speed. What is its change in momentum?",
                                "ลูกบอลที่มีโมเมนตัม p กระดอนกลับตรงๆ ด้วยอัตราเร็วเท่าเดิม โมเมนตัมเปลี่ยนไปเท่าใด"],
    opts:[{v:"2p",ok:1},{v:"0",trap:"T-01"},{v:"p",trap:"T-01"},{v:"p/2"}],unit:""};
  if(sf==="S-05") return {stem:["A body of momentum "+(m*v)+" kg·m/s moves at "+v+" m/s. Find its mass.",
                                "วัตถุมีโมเมนตัม "+(m*v)+" กก.·ม./วินาที เคลื่อนที่ด้วย "+v+" ม./วินาที จงหามวล"],
    opts:[{v:String(m),ok:1},{v:fmt(m*v*v)},{v:fmt(v/m)},{v:fmt(m*2)}],unit:" kg"};
  return {stem:["Find the momentum of a "+m+" kg body moving at "+v+" m/s.",
                "จงหาโมเมนตัมของวัตถุมวล "+m+" กิโลกรัม ที่เคลื่อนที่ด้วย "+v+" ม./วินาที"],
    opts:[{v:String(m*v),ok:1},{v:fmt(0.5*m*v*v),trap:"T-03"},{v:fmt(m/v)},{v:fmt(m+v)}],unit:" kg·m/s"};
},
"M-02": function(sf){
  var m=pick([0.2,0.5,1,2]), u=pick([10,15,20]), t=pick([0.05,0.1,0.2]);
  var F=m*u/t;
  if(sf==="S-04") return {stem:["Why does bending your knees on landing reduce the force on you?",
                                "ทำไมการย่อเข่าตอนลงพื้นจึงลดแรงที่กระทำต่อร่างกาย"],
    opts:[{v:["It lengthens the time, and Δp is fixed","มันยืดเวลาออกไป ในขณะที่ Δp คงที่"],ok:1},
          {v:["It reduces the momentum change","มันลดการเปลี่ยนแปลงโมเมนตัม"],trap:"T-03"},
          {v:["It reduces your mass","มันลดมวลของคุณ"]},
          {v:["It shortens the stopping distance","มันลดระยะหยุด"],trap:"T-03"}],unit:""};
  if(sf==="S-03") return {stem:["A "+m+" kg ball hits a wall at "+u+" m/s and stops in "+t+" s. Find the average force.",
                                "ลูกบอลมวล "+m+" กิโลกรัม ชนกำแพงด้วย "+u+" ม./วินาที และหยุดใน "+t+" วินาที จงหาแรงเฉลี่ย"],
    opts:[{v:fmt(F),ok:1},{v:fmt(m*u),trap:"T-03"},{v:fmt(m*u*t)},{v:fmt(u/t)}],unit:" N"};
  return {stem:["A force acts on a "+m+" kg body for "+t+" s and brings it from rest to "+u+" m/s. Find the force.",
                "แรงกระทำต่อวัตถุมวล "+m+" กิโลกรัม เป็นเวลา "+t+" วินาที ทำให้จากหยุดนิ่งเป็น "+u+" ม./วินาที จงหาแรง"],
    opts:[{v:fmt(F),ok:1},{v:fmt(m*u),trap:"T-03"},{v:fmt(m/t)},{v:fmt(u*t)}],unit:" N"};
},
"M-03": function(sf){
  var m1=pick([2,3,4]), u1=pick([4,6,8]), m2=pick([1,2,5]), v2=pick([2,3,4]);
  var v1=(m1*u1-m2*v2)/m1;
  if(sf==="S-03"){
    /* recoil: a stationary rifle fires a bullet, total momentum stays zero */
    var M=pick([3,4,5]), mb=pick([0.01,0.02,0.05]), vb=pick([300,400,500]);
    var recoil=mb*vb/M;
    return {stem:["A "+M+" kg rifle at rest fires a "+mb+" kg bullet at "+vb+" m/s. Find the recoil speed of the rifle.",
                  "ปืนมวล "+M+" กิโลกรัม ที่หยุดนิ่ง ยิงกระสุนมวล "+mb+" กิโลกรัม ด้วย "+vb+" ม./วินาที จงหาอัตราเร็วการถอยหลังของปืน"],
      opts:[{v:fmt(recoil),ok:1},{v:fmt(M*vb/mb)},{v:String(vb),trap:"T-01"},{v:fmt(recoil*2)}],unit:" m/s"};
  }
  return {stem:["A "+m1+" kg body at "+u1+" m/s collides with a stationary "+m2+" kg body, which moves off at "+v2+" m/s. Find the first body's new velocity.",
                "วัตถุมวล "+m1+" กิโลกรัม ที่ "+u1+" ม./วินาที ชนวัตถุมวล "+m2+" กิโลกรัม ที่หยุดนิ่ง ซึ่งเคลื่อนที่ออกด้วย "+v2+" ม./วินาที จงหาความเร็วใหม่ของวัตถุแรก"],
    opts:[{v:fmt(v1),ok:1},{v:fmt(u1+v2),trap:"T-01"},{v:String(u1)},{v:fmt(m2*v2/m1)}],unit:" m/s"};
},
"M-04": function(sf){
  var m1=pick([2,3,4]), u1=pick([6,8,10]), m2=pick([1,2,6]);
  var v=m1*u1/(m1+m2);
  var Ek1=0.5*m1*u1*u1, Ek2=0.5*(m1+m2)*v*v;
  if(sf==="S-05") return {stem:["Two bodies stick together and move at "+fmt(v)+" m/s. The second, of mass "+m2+" kg, was at rest and the first has mass "+m1+" kg. Find the first body's initial speed.",
                                "วัตถุสองก้อนติดกันแล้วเคลื่อนที่ด้วย "+fmt(v)+" ม./วินาที ก้อนที่สองมวล "+m2+" กิโลกรัม หยุดนิ่งอยู่ และก้อนแรกมวล "+m1+" กิโลกรัม จงหาอัตราเร็วเริ่มต้นของก้อนแรก"],
    opts:[{v:String(u1),ok:1},{v:fmt(v*m2/m1)},{v:fmt(v),trap:"T-02"},{v:fmt(u1/2)}],unit:" m/s"};
  if(sf==="S-04") return {stem:["Two lumps of clay collide and stick. Which quantities are conserved?",
                                "ดินน้ำมันสองก้อนชนกันแล้วติดกัน ปริมาณใดที่อนุรักษ์"],
    opts:[{v:["Momentum only","โมเมนตัมเท่านั้น"],ok:1},
          {v:["Both momentum and kinetic energy","ทั้งโมเมนตัมและพลังงานจลน์"],trap:"T-02"},
          {v:["Kinetic energy only","พลังงานจลน์เท่านั้น"],trap:"T-02"},
          {v:["Neither","ไม่มีเลย"]}],unit:""};
  return {stem:["A "+m1+" kg body at "+u1+" m/s strikes a stationary "+m2+" kg body and they stick. Find their common velocity.",
                "วัตถุมวล "+m1+" กิโลกรัม ที่ "+u1+" ม./วินาที ชนวัตถุมวล "+m2+" กิโลกรัม ที่หยุดนิ่งแล้วติดกัน จงหาความเร็วร่วม"],
    opts:[{v:fmt(v),ok:1},{v:String(u1),trap:"T-02"},{v:fmt(m1*u1/m2)},{v:fmt(u1/2)}],unit:" m/s"};
},
"M-05": function(sf){
  var C=[{s:["A collision in which the total kinetic energy after equals the total before is called:","การชนที่พลังงานจลน์รวมหลังเท่ากับก่อน เรียกว่าอะไร"],
          ok:["Elastic","ยืดหยุ่น"],w:[["Inelastic","ไม่ยืดหยุ่น"],["Perfectly inelastic","ไม่ยืดหยุ่นสมบูรณ์"],["Explosive","การระเบิด"]]},
         {s:["Two cars crumple together and move off as one. This collision is:","รถสองคันยับติดกันแล้วเคลื่อนที่ไปเป็นก้อนเดียว การชนนี้คือ"],
          ok:["Perfectly inelastic","ไม่ยืดหยุ่นสมบูรณ์"],w:[["Elastic","ยืดหยุ่น"],["Momentum is not conserved","โมเมนตัมไม่อนุรักษ์"],["Impossible","เป็นไปไม่ได้"]]},
         {s:["In which collision is momentum NOT conserved?","การชนแบบใดที่โมเมนตัมไม่อนุรักษ์"],
          ok:["None — momentum is conserved in all of them","ไม่มี โมเมนตัมอนุรักษ์ในทุกแบบ"],
          w:[["Inelastic collisions","การชนไม่ยืดหยุ่น"],["Perfectly inelastic collisions","การชนไม่ยืดหยุ่นสมบูรณ์"],["Explosions","การระเบิด"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
},
"M-06": function(sf){
  var m=pick([1,2,3]), u=pick([6,8,10]), th=pick([30,37,53,60]);
  var cos={30:0.866,37:0.799,53:0.602,60:0.5}[th];
  if(sf==="S-04") return {stem:["Two equal masses collide elastically, one initially at rest. What angle separates them afterwards?",
                                "มวลเท่ากันสองก้อนชนกันแบบยืดหยุ่น ก้อนหนึ่งหยุดนิ่งอยู่ หลังชนแยกกันด้วยมุมเท่าใด"],
    opts:[{v:"90°",ok:1},{v:"180°"},{v:"45°"},{v:["It depends on the speeds","ขึ้นกับอัตราเร็ว"],trap:"T-04"}],unit:""};
  return {stem:["A "+m+" kg body moving at "+u+" m/s is deflected to "+th+"° from its original path. Find the x-component of its new momentum, given its speed is unchanged.",
                "วัตถุมวล "+m+" กิโลกรัม เคลื่อนที่ด้วย "+u+" ม./วินาที ถูกเบนไป "+th+"° จากแนวเดิม โดยอัตราเร็วไม่เปลี่ยน จงหาองค์ประกอบ x ของโมเมนตัมใหม่"],
    opts:[{v:fmt(m*u*cos),ok:1},{v:String(m*u),trap:"T-04"},{v:fmt(m*u*Math.sqrt(1-cos*cos))},{v:fmt(m*cos)}],unit:" kg·m/s"};
}
}
};
