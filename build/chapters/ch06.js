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
  viz:"bars",
  vizcfg:{
    title:["MOMENTUM ALWAYS SURVIVES · ENERGY DOES NOT","โมเมนตัมอยู่รอดเสมอ · พลังงานไม่"],
    ylab:["J   and   kg·m/s","J   และ   kg·m/s"],
    ctrls:[
      {k:"kind", lab:["",""], opts:[["elastic","ยืดหยุ่น"], ["perfectly inelastic","ไม่ยืดหยุ่นสมบูรณ์"]], min:0, def:1, unit:""},
      {k:"m1",   lab:["Mass A","มวล A"], min:1, max:8, step:.5, def:3, unit:" kg"},
      {k:"u1",   lab:["A before","A ก่อนชน"], min:0, max:12, step:.5, def:6, unit:" m/s"},
      {k:"m2",   lab:["Mass B (at rest)","มวล B (อยู่นิ่ง)"], min:1, max:8, step:.5, def:3, unit:" kg"}
    ],
    readouts:[
      {lab:["KE before","พลังงานจลน์ก่อน"], f:function(S){ return fmt2(0.5*S.p.m1*S.p.u1*S.p.u1)+" J"; }},
      {lab:["KE after","พลังงานจลน์หลัง"], f:function(S){
        var p=S.p, K0=0.5*p.m1*p.u1*p.u1;
        if(p.kind===0) return fmt2(K0)+" J";
        var v=p.m1*p.u1/(p.m1+p.m2);
        return fmt2(0.5*(p.m1+p.m2)*v*v)+" J"; }},
      {lab:["Energy lost","พลังงานที่สูญไป"], f:function(S){
        var p=S.p, K0=0.5*p.m1*p.u1*p.u1;
        if(p.kind===0) return L()?"ไม่สูญเลย":"none";
        var v=p.m1*p.u1/(p.m1+p.m2);
        return fmt2(K0-0.5*(p.m1+p.m2)*v*v)+" J"; }},
      {lab:["Where did it go?","หายไปไหน"], f:function(S){
        return S.p.kind===0 ? (L()?"ไม่มีที่ไป — ยืดหยุ่นสมบูรณ์":"nowhere — the collision is elastic")
                            : (L()?"ความร้อน เสียง และการเสียรูป":"heat, sound and deformation"); }}
    ],
    bars:[
      {lab:["p before","p ก่อน"], f:function(p){ return p.m1*p.u1; }, col:"accent"},
      {lab:["p after","p หลัง"],  f:function(p){ return p.m1*p.u1; }, col:"accent"},
      {lab:["KE before","จลน์ก่อน"], f:function(p){ return 0.5*p.m1*p.u1*p.u1; }, col:"good"},
      {lab:["KE after","จลน์หลัง"], f:function(p){
        var K0=0.5*p.m1*p.u1*p.u1;
        if(p.kind===0) return K0;
        var v=p.m1*p.u1/(p.m1+p.m2);
        return 0.5*(p.m1+p.m2)*v*v; }, col:"warn"}
    ],
    note:["the two red bars always match · the green and amber ones need not","แถบสีแดงสองแถบเท่ากันเสมอ · แถบเขียวกับเหลืองอำพันไม่จำเป็นต้องเท่า"]
  },
  guide:[
    {say:["A perfectly inelastic hit. Momentum is untouched, but the kinetic energy bar drops sharply.",
          "การชนแบบไม่ยืดหยุ่นสมบูรณ์ โมเมนตัมไม่เปลี่ยน แต่แถบพลังงานจลน์ลดฮวบ"], set:{kind:1,m1:3,u1:6,m2:3}},
    {say:["Switch to elastic. Now both pairs match — this is the only case where energy also survives.",
          "สลับเป็นการชนยืดหยุ่น ตอนนี้ทั้งสองคู่เท่ากัน นี่เป็นกรณีเดียวที่พลังงานอยู่รอดด้วย"], set:{kind:0,m1:3,u1:6,m2:3}},
    {say:["Back to inelastic with a much heavier target. More energy vanishes, yet momentum still balances.",
          "กลับไปแบบไม่ยืดหยุ่นโดยให้เป้าหนักกว่ามาก พลังงานหายไปมากขึ้น แต่โมเมนตัมยังสมดุลอยู่ดี"], set:{kind:1,m1:1,u1:10,m2:8}}
  ] },

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
