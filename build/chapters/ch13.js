var CHAPTER = {
id:"ch13", num:"13", slug:"electrostatics", subject:"physics",
kicker:["Physics · Chapter 13","ฟิสิกส์ · บทที่ 13"],
title:["Electrostatics","ไฟฟ้าสถิต"],
mapTitle:["Gravity's louder cousin","ญาติที่เสียงดังกว่าของแรงโน้มถ่วง"],
lede:["Coulomb's law has the same shape as Newton's law of gravitation, which means every technique from Chapter 3 transfers directly. The differences are that charge comes in two signs, and that the force is unimaginably stronger.",
      "กฎของคูลอมบ์มีรูปแบบเดียวกับกฎแรงโน้มถ่วงของนิวตัน ทุกเทคนิคจากบทที่ 3 จึงถ่ายโอนมาได้โดยตรง ต่างกันตรงที่ประจุมีสองเครื่องหมาย และแรงนี้แข็งแรงกว่าอย่างเหลือเชื่อ"],
next:["→ continues in Chapter 14 · Current Electricity","→ ต่อในบทที่ 14 · ไฟฟ้ากระแส"],

nodes:[
{ id:"coulomb", x:235, y:52, requires:[], methods:["M-01"],
  title:["Coulomb's law","กฎของคูลอมบ์"],
  body:[["The force between two point charges is F = kq₁q₂/r², with k = 9 × 10⁹ N·m²/C². Like charges repel, unlike attract, and the force falls off as the square of separation.",
         "Compare it to gravity: identical form, but electrostatic attraction between a proton and an electron is about 10³⁹ times stronger than their gravitational attraction. Gravity only wins at large scales because charge cancels and mass never does."],
        ["แรงระหว่างประจุจุดสองประจุคือ F = kq₁q₂/r² โดย k = 9 × 10⁹ นิวตัน·ตร.ม./คูลอมบ์² ประจุชนิดเดียวกันผลักกัน ต่างชนิดดูดกัน และแรงลดลงตามกำลังสองของระยะห่าง",
         "เทียบกับแรงโน้มถ่วง รูปแบบเหมือนกันทุกประการ แต่แรงดูดทางไฟฟ้าระหว่างโปรตอนกับอิเล็กตรอนแรงกว่าแรงโน้มถ่วงราว 10³⁹ เท่า แรงโน้มถ่วงชนะเฉพาะในระดับใหญ่เพราะประจุหักล้างกันได้ แต่มวลไม่เคยหักล้าง"]],
  formula:["F = k q₁q₂ / r²        k = 9 × 10⁹","F = k q₁q₂ / r²        k = 9 × 10⁹"],
  flabel:["Inverse square, like gravity","กำลังสองผกผัน เหมือนแรงโน้มถ่วง"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){ return 9e9*p.q1*1e-9*p.q2*1e-9/(Math.max(x,0.02)*Math.max(x,0.02)); },
    xmin:0.02, xmax:1, fill:true,
    title:["FORCE AGAINST SEPARATION","แรง เทียบ ระยะห่าง"],
    xlab:["r (m)","r (ม.)"], ylab:["F (N)","F (นิวตัน)"],
    mark:function(p){ return p.r; },
    ctrls:[
      {k:"q1", lab:["Charge q₁","ประจุ q₁"], min:1, max:20, step:1, def:10, unit:" nC"},
      {k:"q2", lab:["Charge q₂","ประจุ q₂"], min:1, max:20, step:1, def:10, unit:" nC"},
      {k:"r",  lab:["Separation r","ระยะห่าง r"], min:0.05, max:1, step:.05, def:0.3, unit:" m"}
    ],
    readouts:[
      {lab:["Force at r","แรงที่ระยะ r"], f:function(S){
        return (9e9*S.p.q1*1e-9*S.p.q2*1e-9/(S.p.r*S.p.r)).toExponential(2)+" N"; }},
      {lab:["At half that distance","ที่ระยะครึ่งหนึ่ง"], f:function(S){
        return (9e9*S.p.q1*1e-9*S.p.q2*1e-9/(S.p.r*S.p.r/4)).toExponential(2)+" N"; }}
    ]
  },
  guide:[
    {say:["The curve dives near the origin. Bring the charges close and the force explodes.",
          "เส้นกราฟดิ่งลงใกล้จุดกำเนิด นำประจุเข้าใกล้กันแล้วแรงจะพุ่งขึ้นมหาศาล"], set:{q1:10,q2:10,r:0.5}},
    {say:["Halve the separation and read both numbers. The force goes up four times, not twice.",
          "ลดระยะห่างครึ่งหนึ่งแล้วอ่านตัวเลขทั้งสอง แรงเพิ่มสี่เท่า ไม่ใช่สองเท่า"], set:{q1:10,q2:10,r:0.25}},
    {say:["Doubling a charge only doubles the force. Distance is the squared variable, charge is not.",
          "การเพิ่มประจุสองเท่าทำให้แรงเพิ่มสองเท่าเท่านั้น ระยะทางคือตัวแปรที่ยกกำลังสอง ประจุไม่ใช่"], set:{q1:20,q2:10,r:0.25}}
  ]},

{ id:"field", x:100, y:150, requires:["coulomb"], methods:["M-02"],
  title:["Electric field","สนามไฟฟ้า"],
  body:[["A field is force per unit charge, E = F/q, so a charge placed in a field feels F = qE. Around a point charge E = kq/r², and field lines run outwards from positive and inwards to negative.",
         "The field exists whether or not a test charge is there to feel it. That shift — from action at a distance to a property of space — is what makes the field concept worth having."],
        ["สนามคือแรงต่อหนึ่งหน่วยประจุ E = F/q ดังนั้นประจุที่วางในสนามจะรู้สึกแรง F = qE รอบประจุจุด E = kq/r² และเส้นสนามพุ่งออกจากประจุบวกและพุ่งเข้าหาประจุลบ",
         "สนามมีอยู่ไม่ว่าจะมีประจุทดสอบไปรู้สึกหรือไม่ การเปลี่ยนมุมมองนี้ จากแรงกระทำระยะไกลไปสู่สมบัติของปริภูมิ คือเหตุผลที่แนวคิดสนามมีค่าควรแก่การมี"]],
  formula:["E = F/q = kq/r²        F = qE","E = F/q = kq/r²        F = qE"],
  flabel:["A property of space itself","สมบัติของปริภูมิเอง"],
  viz:"plot",
  vizcfg:{
    title:["FIELD STRENGTH AROUND A POINT CHARGE","ความเข้มสนามรอบประจุจุด"],
    xlab:["distance r (m)","ระยะ r (m)"], ylab:["field E (N/C)","สนาม E (N/C)"],
    xmin:.2, xmax:5, ymin:0, fill:false,
    fn:function(x,p){ return 9e9*p.Q*1e-9/(x*x); },
    mark:function(p){ return p.r; },
    ctrls:[
      {k:"Q", lab:["Charge","ประจุ"], min:1, max:50, step:1, def:10, unit:" nC"},
      {k:"r", lab:["Distance","ระยะ"], min:.3, max:4.8, step:.1, def:1, unit:" m"},
      {k:"q", lab:["Test charge","ประจุทดสอบ"], min:1, max:20, step:1, def:2, unit:" nC"}
    ],
    readouts:[
      {lab:["Field E","สนาม E"], f:function(S){ return fmt2(9e9*S.p.Q*1e-9/(S.p.r*S.p.r))+" N/C"; }},
      {lab:["Force on the test charge","แรงบนประจุทดสอบ"], f:function(S){
        return fmt2(9e9*S.p.Q*1e-9*S.p.q*1e-9/(S.p.r*S.p.r)*1000)+" mN"; }},
      {lab:["Does E depend on the test charge?","E ขึ้นกับประจุทดสอบไหม"], f:function(){
        return L()?"ไม่ — E เป็นสมบัติของที่ว่างเอง":"no — E is a property of the space itself"; }},
      {lab:["Double the distance?","ระยะสองเท่า?"], f:function(){
        return L()?"สนามเหลือหนึ่งในสี่":"the field drops to a quarter"; }}
    ],
    note:["drag the test charge slider — the curve will not move, because E does not depend on it","ลากแถบประจุทดสอบดู เส้นโค้งจะไม่ขยับ เพราะ E ไม่ขึ้นกับมัน"]
  } },

{ id:"potential", x:370, y:150, requires:["coulomb"], methods:["M-03"],
  title:["Potential and energy","ศักย์และพลังงาน"],
  body:[["Potential is energy per unit charge, V = kq/r, and it is a scalar — potentials from several charges simply add, with no components to resolve. That makes it far easier to work with than field.",
         "The work needed to move a charge between two points is W = qΔV, and it does not depend on the path taken. Between parallel plates the field is uniform and E = ΔV/d."],
        ["ศักย์คือพลังงานต่อหนึ่งหน่วยประจุ V = kq/r และเป็นสเกลาร์ ศักย์จากหลายประจุจึงบวกกันตรงๆ ไม่ต้องแตกองค์ประกอบ ทำให้ใช้งานง่ายกว่าสนามมาก",
         "งานที่ต้องใช้ในการย้ายประจุระหว่างสองจุดคือ W = qΔV และไม่ขึ้นกับเส้นทางที่เลือก ระหว่างแผ่นขนานสนามสม่ำเสมอและ E = ΔV/d"]],
  formula:["V = kq/r        W = qΔV        E = ΔV/d","V = kq/r        W = qΔV        E = ΔV/d"],
  flabel:["A scalar · potentials just add","เป็นสเกลาร์ · ศักย์บวกกันตรงๆ"],
  viz:"plot",
  vizcfg:{
    title:["POTENTIAL FALLS MORE SLOWLY THAN FIELD","ศักย์ลดช้ากว่าสนาม"],
    xlab:["distance r (m)","ระยะ r (m)"], ylab:["V (volts)  or  E (N/C)","V (โวลต์)  หรือ  E (N/C)"],
    xmin:.3, xmax:6, ymin:0, fill:false,
    fn:function(x,p){ return p.show===0 ? 9e9*p.Q*1e-9/x : 9e9*p.Q*1e-9/(x*x); },
    mark:function(p){ return p.r; },
    ctrls:[
      {k:"show", lab:["0 potential V · 1 field E","0 ศักย์ V · 1 สนาม E"], min:0, max:1, step:1, def:0, unit:""},
      {k:"Q",    lab:["Charge","ประจุ"], min:1, max:50, step:1, def:10, unit:" nC"},
      {k:"r",    lab:["Distance","ระยะ"], min:.4, max:5.8, step:.1, def:1, unit:" m"}
    ],
    readouts:[
      {lab:["Potential V","ศักย์ V"], f:function(S){ return fmt2(9e9*S.p.Q*1e-9/S.p.r)+" V"; }},
      {lab:["Field E","สนาม E"], f:function(S){ return fmt2(9e9*S.p.Q*1e-9/(S.p.r*S.p.r))+" N/C"; }},
      {lab:["Which is a scalar?","อันไหนเป็นสเกลาร์"], f:function(){
        return L()?"ศักย์ V — บวกกันตรงๆ ไม่ต้องใช้เวกเตอร์":"V — you add potentials as plain numbers"; }},
      {lab:["Relationship","ความสัมพันธ์"], f:function(){
        return L()?"E = −dV/dr · สนามคือความชันของศักย์":"E = −dV/dr · the field is the slope of the potential"; }}
    ],
    note:["V goes as 1/r and E as 1/r² — switching between them shows how much steeper E is","V เป็น 1/r ส่วน E เป็น 1/r² สลับดูจะเห็นว่า E ชันกว่ามาก"]
  } },

{ id:"conductors", x:235, y:248, requires:["field","potential"], methods:["M-04"],
  title:["Charged conductors","ตัวนำที่มีประจุ"],
  body:[["Charge on a conductor moves until it can move no further, which means it all ends up on the outer surface and the field inside falls to exactly zero. The interior of any closed conductor is shielded — the principle behind a Faraday cage and behind why a car is a safe place in a lightning storm.",
         "Because E = 0 inside, the potential is constant throughout the conductor, equal to its surface value kQ/R. Outside, it behaves exactly as if all the charge were concentrated at the centre."],
        ["ประจุบนตัวนำจะเคลื่อนที่จนไปต่อไม่ได้ ซึ่งหมายความว่ามันไปรวมอยู่ที่ผิวนอกทั้งหมด และสนามภายในลดลงเป็นศูนย์พอดี ภายในตัวนำปิดใดๆ จึงถูกกำบัง เป็นหลักการเบื้องหลังกรงฟาราเดย์และเหตุผลที่รถยนต์เป็นที่ปลอดภัยขณะฟ้าผ่า",
         "เพราะ E = 0 ภายใน ศักย์จึงคงที่ทั่วทั้งตัวนำ เท่ากับค่าที่ผิว kQ/R ส่วนภายนอก มันประพฤติตัวราวกับประจุทั้งหมดรวมอยู่ที่จุดศูนย์กลาง"]],
  formula:["Inside: E = 0, V = kQ/R        Outside: as if a point charge","ภายใน: E = 0, V = kQ/R        ภายนอก: เสมือนประจุจุด"],
  flabel:["Charge sits on the outside","ประจุอยู่ที่ผิวนอก"],
  viz:"grid",
  vizcfg:{
    title:["A CHARGED CONDUCTOR IN EQUILIBRIUM","ตัวนำที่มีประจุในภาวะสมดุล"],
    cols:[["Where","ที่ใด"],["Field E","สนาม E"],["Charge","ประจุ"],["Potential V","ศักย์ V"]],
    ctrls:[{k:"i", lab:["Highlight region","เน้นบริเวณ"], min:0, max:2, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Region","บริเวณ"], f:function(S){
        return [["Deep inside","ลึกเข้าไปข้างใน"],["At the surface","ที่ผิว"],["Outside","ภายนอก"]][S.p.i][L()]; }},
      {lab:["Why the inside is empty","ทำไมข้างในจึงว่าง"], f:function(){
        return L()?"ประจุอิสระผลักกันจนไปอยู่ที่ผิว":"free charges repel until they reach the surface"; }},
      {lab:["Practical name","ชื่อที่ใช้จริง"], f:function(){
        return L()?"กรงฟาราเดย์":"a Faraday cage"; }}
    ],
    rows:function(p){
      var R=[[["Deep inside","ลึกข้างใน"],["exactly zero","ศูนย์พอดี"],["none","ไม่มี"],["constant","คงที่"]],
             [["At the surface","ที่ผิว"],["perpendicular to it","ตั้งฉากกับผิว"],["all of it sits here","อยู่ที่นี่ทั้งหมด"],["same as inside","เท่ากับข้างใน"]],
             [["Outside","ภายนอก"],["falls with distance","ลดลงตามระยะ"],["none","ไม่มี"],["falls with distance","ลดลงตามระยะ"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===0?"ink":"accent"}; }); });
    },
    note:["the whole conductor is one equipotential — that is why a car protects you in a storm","ตัวนำทั้งก้อนเป็นผิวสมศักย์เดียว จึงเป็นเหตุผลที่รถยนต์ป้องกันคุณได้ตอนฟ้าผ่า"]
  } },

{ id:"capacitance", x:235, y:346, requires:["conductors"], methods:["M-05","M-06"],
  title:["Capacitance","ความจุไฟฟ้า"],
  body:[["A capacitor stores charge in proportion to the voltage across it: C = Q/V. The energy it holds is U = ½CV², and the half matters — it appears because the voltage rises as the charge accumulates.",
         "Capacitors combine the opposite way to resistors. In parallel they add, C = ΣC; in series their reciprocals add. Applying the resistor rules is trap T-04."],
        ["ตัวเก็บประจุเก็บประจุเป็นสัดส่วนกับความต่างศักย์คร่อมมัน C = Q/V พลังงานที่เก็บได้คือ U = ½CV² และเลขครึ่งนั้นสำคัญ มันปรากฏเพราะความต่างศักย์เพิ่มขึ้นขณะประจุสะสม",
         "ตัวเก็บประจุต่อกันตรงข้ามกับตัวต้านทาน ต่อขนานให้บวกกัน C = ΣC ต่ออนุกรมให้บวกส่วนกลับ การใช้กฎของตัวต้านทานคือกับดัก T-04"]],
  formula:["C = Q/V        U = ½CV²        parallel: C = ΣC","C = Q/V        U = ½CV²        ขนาน: C = ΣC"],
  flabel:["Opposite of the resistor rules","ตรงข้ามกับกฎตัวต้านทาน"],
  viz:"plot",
  vizcfg:{
    title:["CHARGE STORED AGAINST VOLTAGE","ประจุที่เก็บได้ เทียบ ความต่างศักย์"],
    xlab:["voltage (V)","ความต่างศักย์ (V)"], ylab:["charge stored (µC)","ประจุที่เก็บ (µC)"],
    xmin:0, xmax:24, ymin:0, fill:true,
    fn:function(x,p){ return p.C*x; },
    mark:function(p){ return p.V; },
    ctrls:[
      {k:"C", lab:["Capacitance","ความจุ"], min:1, max:20, step:1, def:5, unit:" µF"},
      {k:"V", lab:["Applied voltage","ความต่างศักย์ที่ให้"], min:1, max:23, step:1, def:12, unit:" V"}
    ],
    readouts:[
      {lab:["Charge stored","ประจุที่เก็บ"], f:function(S){ return fmt2(S.p.C*S.p.V)+" µC"; }},
      {lab:["Energy stored ½CV²","พลังงานที่เก็บ ½CV²"], f:function(S){
        return fmt2(0.5*S.p.C*S.p.V*S.p.V/1000)+" mJ"; }},
      {lab:["Slope of the line","ความชันของเส้น"], f:function(S){
        return fmt2(S.p.C)+(L()?" µF · คือความจุเอง":" µF · which IS the capacitance"); }},
      {lab:["Double the voltage?","ความต่างศักย์สองเท่า?"], f:function(){
        return L()?"ประจุสองเท่า แต่พลังงานสี่เท่า":"twice the charge, but four times the energy"; }}
    ],
    note:["the shaded triangle under the line is the stored energy — hence the ½","สามเหลี่ยมแรเงาใต้เส้นคือพลังงานที่เก็บไว้ จึงมีเลข ½"]
  } }
],

methods:[
{id:"M-01", name:["Apply Coulomb's law","ใช้กฎของคูลอมบ์"]},
{id:"M-02", name:["Find electric field strength","หาความเข้มสนามไฟฟ้า"]},
{id:"M-03", name:["Find potential and work done","หาศักย์และงาน"]},
{id:"M-04", name:["Field and potential of a conductor","สนามและศักย์ของตัวนำ"]},
{id:"M-05", name:["Capacitance and stored energy","ความจุและพลังงานสะสม"]},
{id:"M-06", name:["Combine capacitors","รวมตัวเก็บประจุ"]}
],

traps:{
"T-01":["Inverse square. Halving the separation multiplies the force by four, not two.","กำลังสองผกผัน การลดระยะครึ่งหนึ่งทำให้แรงเพิ่มสี่เท่า ไม่ใช่สองเท่า"],
"T-02":["Field goes as 1/r² but potential as 1/r. They are not the same falloff.","สนามแปรตาม 1/r² แต่ศักย์แปรตาม 1/r ลดลงไม่เหมือนกัน"],
"T-03":["Inside a conductor the field is zero, but the potential is not — it equals the surface value.","ภายในตัวนำสนามเป็นศูนย์ แต่ศักย์ไม่เป็นศูนย์ มันเท่ากับค่าที่ผิว"],
"T-04":["Capacitors combine opposite to resistors: parallel adds, series adds reciprocals.","ตัวเก็บประจุรวมกันตรงข้ามกับตัวต้านทาน ขนานบวกตรงๆ อนุกรมบวกส่วนกลับ"]
},

gen:{
"M-01": function(sf){
  var q1=pick([2,4,5,10]), q2=pick([3,6,8]), r=pick([0.1,0.2,0.5]);
  var F=9e9*q1*1e-6*q2*1e-6/(r*r);
  if(sf==="S-04") return {stem:["The distance between two charges is halved. The force between them becomes:",
                                "ระยะระหว่างประจุสองประจุลดลงครึ่งหนึ่ง แรงระหว่างกันกลายเป็น"],
    opts:[{v:["Four times as large","สี่เท่า"],ok:1},{v:["Twice as large","สองเท่า"],trap:"T-01"},
          {v:["Half as large","ครึ่งหนึ่ง"],trap:"T-01"},{v:["Unchanged","เท่าเดิม"]}],unit:""};
  if(sf==="S-05") return {stem:["Two charges of "+q1+" μC and "+q2+" μC repel with "+fmt(F)+" N. Find their separation.",
                                "ประจุ "+q1+" ไมโครคูลอมบ์ และ "+q2+" ไมโครคูลอมบ์ ผลักกันด้วยแรง "+fmt(F)+" นิวตัน จงหาระยะห่าง"],
    opts:[{v:String(r),ok:1},{v:fmt(r*2),trap:"T-01"},{v:fmt(r/2)},{v:fmt(r*r)}],unit:" m"};
  return {stem:["Find the force between "+q1+" μC and "+q2+" μC placed "+r+" m apart.",
                "จงหาแรงระหว่างประจุ "+q1+" และ "+q2+" ไมโครคูลอมบ์ ที่วางห่างกัน "+r+" เมตร"],
    opts:[{v:fmt(F),ok:1},{v:fmt(F*r),trap:"T-01"},{v:fmt(F/2)},{v:fmt(F*4)}],unit:" N"};
},
"M-02": function(sf){
  var q=pick([2,5,8]), r=pick([0.1,0.3,0.5]), Q=pick([1,2,4]);
  var E=9e9*q*1e-6/(r*r);
  if(sf==="S-04") return {stem:["What is the direction of the electric field around a negative charge?",
                                "สนามไฟฟ้ารอบประจุลบมีทิศทางอย่างไร"],
    opts:[{v:["Radially inwards, towards the charge","พุ่งเข้าหาประจุตามแนวรัศมี"],ok:1},
          {v:["Radially outwards","พุ่งออกตามแนวรัศมี"]},
          {v:["Circular around the charge","วนเป็นวงกลมรอบประจุ"]},
          {v:["There is no field","ไม่มีสนาม"]}],unit:""};
  if(sf==="S-03") return {stem:["A charge of "+Q+" μC sits where the field is "+fmt(E)+" N/C. Find the force on it.",
                                "ประจุ "+Q+" ไมโครคูลอมบ์ อยู่ในสนาม "+fmt(E)+" นิวตัน/คูลอมบ์ จงหาแรงที่กระทำ"],
    opts:[{v:fmt(Q*1e-6*E),ok:1},{v:fmt(E/(Q*1e-6))},{v:fmt(E),trap:"T-02"},{v:fmt(Q*E)}],unit:" N"};
  return {stem:["Find the electric field "+r+" m from a point charge of "+q+" μC.",
                "จงหาสนามไฟฟ้าที่ระยะ "+r+" เมตร จากประจุจุด "+q+" ไมโครคูลอมบ์"],
    opts:[{v:fmt(E),ok:1},{v:fmt(E*r),trap:"T-02"},{v:fmt(E/r)},{v:fmt(E*2)}],unit:" N/C"};
},
"M-03": function(sf){
  var q=pick([2,5,10]), r=pick([0.2,0.5,1]), Q=pick([1,3]), dV=pick([50,100,200]);
  var V=9e9*q*1e-6/r;
  if(sf==="S-04") return {stem:["How do field and potential fall off with distance from a point charge?",
                                "สนามและศักย์ลดลงตามระยะห่างจากประจุจุดอย่างไร"],
    opts:[{v:["E as 1/r², V as 1/r","E แปรตาม 1/r² ส่วน V แปรตาม 1/r"],ok:1},
          {v:["Both as 1/r²","แปรตาม 1/r² ทั้งคู่"],trap:"T-02"},
          {v:["Both as 1/r","แปรตาม 1/r ทั้งคู่"],trap:"T-02"},
          {v:["E as 1/r, V as 1/r²","E แปรตาม 1/r ส่วน V แปรตาม 1/r²"],trap:"T-02"}],unit:""};
  if(sf==="S-03") return {stem:["How much work is needed to move "+Q+" μC through a potential difference of "+dV+" V?",
                                "ต้องใช้งานเท่าใดในการย้ายประจุ "+Q+" ไมโครคูลอมบ์ ผ่านความต่างศักย์ "+dV+" โวลต์"],
    opts:[{v:(Q*1e-6*dV).toExponential(2),ok:1},{v:(dV/(Q*1e-6)).toExponential(2)},
          {v:String(dV),trap:"T-02"},{v:(Q*dV).toExponential(2)}],unit:" J"};
  return {stem:["Find the potential "+r+" m from a point charge of "+q+" μC.",
                "จงหาศักย์ที่ระยะ "+r+" เมตร จากประจุจุด "+q+" ไมโครคูลอมบ์"],
    opts:[{v:fmt(V),ok:1},{v:fmt(V/r),trap:"T-02"},{v:fmt(V*r)},{v:fmt(V/2)}],unit:" V"};
},
"M-04": function(sf){
  var Q=pick([2,5,10]), R=pick([0.1,0.2,0.5]);
  var Vs=9e9*Q*1e-6/R;
  if(sf==="S-04") return {stem:["What is the electric field at the centre of a charged hollow conducting sphere?",
                                "สนามไฟฟ้าที่จุดศูนย์กลางของทรงกลมกลวงตัวนำที่มีประจุเป็นเท่าใด"],
    opts:[{v:["Zero","ศูนย์"],ok:1},{v:["kQ/R²","kQ/R²"],trap:"T-03"},
          {v:["kQ/R","kQ/R"],trap:"T-03"},{v:["Infinite","อนันต์"]}],unit:""};
  if(sf==="S-03") return {stem:["Why is the inside of a car relatively safe during a lightning strike?",
                                "ทำไมภายในรถยนต์จึงค่อนข้างปลอดภัยขณะฟ้าผ่า"],
    opts:[{v:["The metal shell keeps the field inside at zero","เปลือกโลหะทำให้สนามภายในเป็นศูนย์"],ok:1},
          {v:["The rubber tyres insulate it","ยางรถเป็นฉนวน"]},
          {v:["The car has no charge","รถไม่มีประจุ"]},
          {v:["The potential inside is zero","ศักย์ภายในเป็นศูนย์"],trap:"T-03"}],unit:""};
  return {stem:["A conducting sphere of radius "+R+" m carries "+Q+" μC. Find the potential at its centre.",
                "ทรงกลมตัวนำรัศมี "+R+" เมตร มีประจุ "+Q+" ไมโครคูลอมบ์ จงหาศักย์ที่จุดศูนย์กลาง"],
    opts:[{v:fmt(Vs),ok:1},{v:"0",trap:"T-03"},{v:fmt(Vs/R),trap:"T-03"},{v:fmt(Vs*2)}],unit:" V"};
},
"M-05": function(sf){
  var C=pick([10,22,47,100]), V=pick([5,9,12,24]);
  var Q=C*1e-6*V, U=0.5*C*1e-6*V*V;
  if(sf==="S-05") return {stem:["A capacitor holds "+Q.toExponential(2)+" C at "+V+" V. Find its capacitance.",
                                "ตัวเก็บประจุเก็บประจุ "+Q.toExponential(2)+" คูลอมบ์ ที่ "+V+" โวลต์ จงหาความจุ"],
    opts:[{v:String(C),ok:1},{v:fmt(Q*V*1e6)},{v:fmt(V/(Q*1e6))},{v:String(C*2)}],unit:" μF"};
  if(sf==="S-04") return {stem:["The voltage across a capacitor is doubled. Its stored energy becomes:",
                                "ความต่างศักย์คร่อมตัวเก็บประจุเพิ่มเป็นสองเท่า พลังงานที่เก็บกลายเป็น"],
    opts:[{v:["Four times as large","สี่เท่า"],ok:1},{v:["Twice as large","สองเท่า"],trap:"T-01"},
          {v:["Unchanged","เท่าเดิม"]},{v:["Half as large","ครึ่งหนึ่ง"]}],unit:""};
  return {stem:["Find the energy stored in a "+C+" μF capacitor charged to "+V+" V.",
                "จงหาพลังงานที่เก็บในตัวเก็บประจุ "+C+" ไมโครฟารัด ที่ประจุถึง "+V+" โวลต์"],
    opts:[{v:U.toExponential(2),ok:1},{v:(2*U).toExponential(2),trap:"T-01"},
          {v:Q.toExponential(2)},{v:(U/2).toExponential(2)}],unit:" J"};
},
"M-06": function(sf){
  var a=pick([2,4,6]), b=pick([3,6,12]);
  var par=a+b, ser=a*b/(a+b);
  if(sf==="S-04") return {stem:["Two capacitors are connected in series. How does the total compare with each one?",
                                "ตัวเก็บประจุสองตัวต่ออนุกรม ความจุรวมเทียบกับแต่ละตัวเป็นอย่างไร"],
    opts:[{v:["Smaller than either of them","น้อยกว่าทั้งสองตัว"],ok:1},
          {v:["The sum of the two","เท่ากับผลรวมของทั้งสอง"],trap:"T-04"},
          {v:["Larger than either","มากกว่าทั้งสองตัว"],trap:"T-04"},
          {v:["The average of the two","เท่ากับค่าเฉลี่ย"]}],unit:""};
  if(sf==="S-05") return {stem:[a+" μF and "+b+" μF give a combined "+fmt(par)+" μF. How are they connected?",
                                a+" และ "+b+" ไมโครฟารัด รวมกันได้ "+fmt(par)+" ไมโครฟารัด ต่อกันแบบใด"],
    opts:[{v:["In parallel","ขนาน"],ok:1},{v:["In series","อนุกรม"],trap:"T-04"},
          {v:["Series then parallel","อนุกรมแล้วขนาน"]},{v:["Cannot be determined","บอกไม่ได้"]}],unit:""};
  return {stem:["Find the total capacitance of "+a+" μF and "+b+" μF in series.",
                "จงหาความจุรวมของ "+a+" และ "+b+" ไมโครฟารัด ที่ต่ออนุกรม"],
    opts:[{v:fmt(ser),ok:1},{v:String(par),trap:"T-04"},{v:fmt(a*b)},{v:fmt(par/2)}],unit:" μF"};
}
}
};
