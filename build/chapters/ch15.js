var CHAPTER = {
id:"ch15", num:"15", slug:"magnetism", subject:"physics",
kicker:["Physics · Chapter 15","ฟิสิกส์ · บทที่ 15"],
title:["Magnetism","แม่เหล็กและไฟฟ้า"],
mapTitle:["Electricity and magnetism are one thing","ไฟฟ้าและแม่เหล็กคือสิ่งเดียวกัน"],
lede:["A current makes a magnetic field, and a changing magnetic field makes a current. That two-way link runs every motor and every generator on the planet, and it ends this block by joining its two halves together.",
      "กระแสสร้างสนามแม่เหล็ก และสนามแม่เหล็กที่เปลี่ยนแปลงสร้างกระแส ความเชื่อมโยงสองทางนี้ขับเคลื่อนมอเตอร์และเครื่องกำเนิดไฟฟ้าทุกเครื่องบนโลก และปิดท้ายบล็อกนี้ด้วยการเชื่อมสองครึ่งเข้าด้วยกัน"],
next:["→ continues in Chapter 18 · Electromagnetic Waves","→ ต่อในบทที่ 18 · คลื่นแม่เหล็กไฟฟ้า"],

nodes:[
{ id:"field", x:235, y:52, requires:[], methods:["M-01"],
  title:["Magnetic fields","สนามแม่เหล็ก"],
  body:[["Magnetic field B is measured in tesla and drawn as closed loops that never begin or end — there is no magnetic equivalent of an isolated charge. Into the page is drawn ×, out of the page is drawn •.",
         "A straight current-carrying wire wraps a circular field around itself. Grip the wire with your right hand, thumb along the current, and your fingers curl the way the field does."],
        ["สนามแม่เหล็ก B วัดเป็นเทสลา และเขียนเป็นวงปิดที่ไม่มีจุดเริ่มหรือจุดจบ ไม่มีสิ่งใดเทียบเท่าประจุเดี่ยวในทางแม่เหล็ก พุ่งเข้ากระดาษเขียนเป็น × พุ่งออกเขียนเป็น •",
         "ลวดตรงที่มีกระแสไหลจะมีสนามพันรอบตัวเป็นวงกลม กำมือขวารอบลวดโดยให้นิ้วโป้งชี้ตามกระแส นิ้วที่เหลือจะโค้งไปตามทิศของสนาม"]],
  formula:["Φ = BA        × into page  ·  • out of page","Φ = BA        × เข้ากระดาษ  ·  • ออกจากกระดาษ"],
  flabel:["Field lines always close","เส้นสนามเป็นวงปิดเสมอ"],
  viz:"plot",
  vizcfg:{
    title:["FIELD AROUND A LONG STRAIGHT WIRE","สนามรอบลวดตรงยาว"],
    xlab:["distance from the wire (cm)","ระยะจากลวด (cm)"], ylab:["B (µT)","B (µT)"],
    xmin:.5, xmax:10, ymin:0, fill:false,
    fn:function(x,p){ return 2e-7*p.I/(x/100)*1e6; },
    mark:function(p){ return p.r; },
    ctrls:[
      {k:"I", lab:["Current","กระแส"], min:1, max:30, step:1, def:10, unit:" A"},
      {k:"r", lab:["Distance","ระยะ"], min:.5, max:9.5, step:.5, def:2, unit:" cm"}
    ],
    readouts:[
      {lab:["Field there","สนาม ณ จุดนั้น"], f:function(S){
        return fmt2(2e-7*S.p.I/(S.p.r/100)*1e6)+" µT"; }},
      {lab:["Falls off as","ลดลงตาม"], f:function(){
        return L()?"1/r — ไม่ใช่ 1/r²":"1/r — not 1/r²"; }},
      {lab:["Shape of the field lines","รูปเส้นสนาม"], f:function(){
        return L()?"วงกลมรอบลวด":"circles wrapped around the wire"; }},
      {lab:["Direction rule","กฎหาทิศ"], f:function(){
        return L()?"กำมือขวา นิ้วโป้งชี้ตามกระแส":"right hand grip, thumb along the current"; }}
    ],
    note:["a wire falls off as 1/r, unlike a point charge's 1/r² — the geometry is different","ลวดลดลงตาม 1/r ต่างจากประจุจุดที่เป็น 1/r² เพราะรูปทรงต่างกัน"]
  } },

{ id:"force-charge", x:100, y:150, requires:["field"], methods:["M-02"],
  title:["Force on a moving charge","แรงต่อประจุที่เคลื่อนที่"],
  body:[["A charge moving through a magnetic field feels F = qvB sin θ, at right angles to both its velocity and the field. A charge moving along the field feels nothing at all.",
         "Because the force is always perpendicular to the motion it does no work, so the speed never changes — only the direction. That is why a charged particle in a uniform field travels in a circle of radius r = mv/qB."],
        ["ประจุที่เคลื่อนที่ผ่านสนามแม่เหล็กจะรู้สึกแรง F = qvB sin θ ในทิศตั้งฉากกับทั้งความเร็วและสนาม ประจุที่เคลื่อนที่ไปตามแนวสนามจะไม่รู้สึกแรงเลย",
         "เพราะแรงตั้งฉากกับการเคลื่อนที่เสมอ มันจึงไม่ทำงาน อัตราเร็วจึงไม่เคยเปลี่ยน เปลี่ยนแต่ทิศทาง นั่นคือเหตุผลที่อนุภาคมีประจุในสนามสม่ำเสมอเคลื่อนที่เป็นวงกลมรัศมี r = mv/qB"]],
  formula:["F = qvB sin θ        r = mv / qB","F = qvB sin θ        r = mv / qB"],
  flabel:["Perpendicular · does no work","ตั้งฉาก · ไม่ทำงาน"],
  viz:"vector",
  guide:[
    {say:["Take one arrow as the velocity and the other as the field. The force comes out perpendicular to both.",
          "ให้ลูกศรหนึ่งเป็นความเร็วและอีกอันเป็นสนาม แรงจะออกมาตั้งฉากกับทั้งสอง"], set:{A:12,tA:0,B:12,tB:90}},
    {say:["Line them up at 0°. sin θ is zero, so the force vanishes — a charge moving along the field feels nothing.",
          "จัดให้ทับกันที่ 0° sin θ เป็นศูนย์ แรงจึงหายไป ประจุที่วิ่งตามแนวสนามไม่รู้สึกแรงเลย"], set:{A:12,tA:0,B:12,tB:0}},
    {say:["At 90° the force is maximum. Everything in between scales with sin θ.",
          "ที่ 90° แรงมากที่สุด มุมระหว่างนั้นแปรตาม sin θ"], set:{A:12,tA:0,B:12,tB:90}}
  ]},

{ id:"force-wire", x:370, y:150, requires:["field"], methods:["M-03"],
  title:["Force on a current","แรงต่อลวดที่มีกระแส"],
  body:[["A wire carrying current I in a field B feels F = BIL sin θ. This is the same effect as the force on a moving charge, just counted over all the charges in the wire at once.",
         "Two parallel wires therefore push on each other: currents in the same direction attract, opposite directions repel. Note that this is the reverse of what charges do, and mixing the two up is trap T-03."],
        ["ลวดที่มีกระแส I ในสนาม B จะรู้สึกแรง F = BIL sin θ นี่คือผลอย่างเดียวกับแรงต่อประจุที่เคลื่อนที่ เพียงแต่นับรวมประจุทั้งหมดในลวดพร้อมกัน",
         "ลวดขนานสองเส้นจึงผลักดันกัน กระแสทิศเดียวกันดูดกัน ทิศตรงข้ามผลักกัน สังเกตว่านี่ตรงข้ามกับสิ่งที่ประจุทำ และการสับสนคือกับดัก T-03"]],
  formula:["F = BIL sin θ","F = BIL sin θ"],
  flabel:["Same current direction · wires attract","กระแสทิศเดียวกัน · ลวดดูดกัน"],
  viz:"plot",
  vizcfg:{
    title:["FORCE DEPENDS ON THE ANGLE TO THE FIELD","แรงขึ้นกับมุมที่ทำกับสนาม"],
    xlab:["angle between I and B (°)","มุมระหว่าง I กับ B (°)"], ylab:["force (N)","แรง (N)"],
    xmin:0, xmax:180, ymin:0, fill:false,
    fn:function(x,p){ return p.B*p.I*p.Lw*Math.sin(x*Math.PI/180); },
    mark:function(p){ return p.th; },
    ctrls:[
      {k:"B",  lab:["Flux density B","ความหนาแน่นฟลักซ์ B"], min:.1, max:2, step:.1, def:.5, unit:" T"},
      {k:"I",  lab:["Current","กระแส"], min:1, max:20, step:1, def:5, unit:" A"},
      {k:"Lw", lab:["Length in the field","ความยาวในสนาม"], min:.05, max:1, step:.05, def:.2, unit:" m"},
      {k:"th", lab:["Angle","มุม"], min:0, max:180, step:5, def:90, unit:"°"}
    ],
    readouts:[
      {lab:["Force","แรง"], f:function(S){
        var p=S.p; return fmt2(p.B*p.I*p.Lw*Math.sin(p.th*Math.PI/180))+" N"; }},
      {lab:["At 0° or 180°","ที่ 0° หรือ 180°"], f:function(){
        return L()?"แรงเป็นศูนย์ — ลวดขนานกับสนาม":"zero force — the wire lies along the field"; }},
      {lab:["Maximum at","สูงสุดที่"], f:function(){
        return L()?"90° — ตั้งฉากกับสนาม":"90° — perpendicular to the field"; }},
      {lab:["Direction of the force","ทิศของแรง"], f:function(){
        return L()?"ตั้งฉากกับทั้ง I และ B":"perpendicular to BOTH I and B"; }}
    ],
    note:["the curve touches zero at both ends — a wire parallel to the field feels nothing at all","เส้นโค้งแตะศูนย์ที่ปลายทั้งสอง ลวดที่ขนานกับสนามไม่รู้สึกถึงแรงเลย"]
  } },

{ id:"induction", x:235, y:248, requires:["force-charge","force-wire"], methods:["M-04"],
  title:["Electromagnetic induction","การเหนี่ยวนำแม่เหล็กไฟฟ้า"],
  body:[["Faraday's law says a changing magnetic flux induces an emf: ε = −N ΔΦ/Δt. What matters is the rate of change, not the flux itself — a stationary magnet in a coil induces nothing at all.",
         "The minus sign is Lenz's law: the induced current always opposes the change that created it. It has to, or you would get energy from nothing. Dropping the minus sign is trap T-04."],
        ["กฎของฟาราเดย์บอกว่าฟลักซ์แม่เหล็กที่เปลี่ยนแปลงเหนี่ยวนำให้เกิดแรงเคลื่อนไฟฟ้า ε = −N ΔΦ/Δt สิ่งที่สำคัญคืออัตราการเปลี่ยนแปลง ไม่ใช่ตัวฟลักซ์เอง แม่เหล็กที่วางนิ่งในขดลวดไม่เหนี่ยวนำอะไรเลย",
         "เครื่องหมายลบคือกฎของเลนซ์ กระแสเหนี่ยวนำจะต้านการเปลี่ยนแปลงที่สร้างมันขึ้นมาเสมอ มันต้องเป็นเช่นนั้น มิฉะนั้นจะได้พลังงานมาจากความว่างเปล่า การละเครื่องหมายลบคือกับดัก T-04"]],
  formula:["ε = −N ΔΦ / Δt","ε = −N ΔΦ / Δt"],
  flabel:["Rate of change · opposes the cause","อัตราการเปลี่ยนแปลง · ต้านสาเหตุ"],
  viz:"bars",
  vizcfg:{
    title:["EMF COMES FROM CHANGE, NOT FROM SIZE","แรงเคลื่อนไฟฟ้ามาจากการเปลี่ยนแปลง ไม่ใช่จากขนาด"],
    ylab:["Wb  ·  Wb/s  ·  V","Wb  ·  Wb/s  ·  V"],
    ctrls:[
      {k:"flux", lab:["Flux through the coil","ฟลักซ์ผ่านขดลวด"], min:0, max:10, step:.5, def:6, unit:" Wb"},
      {k:"rate", lab:["Rate of change","อัตราการเปลี่ยนแปลง"], min:0, max:8, step:.5, def:0, unit:" Wb/s"},
      {k:"N",    lab:["Number of turns","จำนวนรอบ"], min:1, max:50, step:1, def:10, unit:""}
    ],
    readouts:[
      {lab:["Flux linkage NΦ","ฟลักซ์คล้อง NΦ"], f:function(S){ return fmt2(S.p.N*S.p.flux)+" Wb"; }},
      {lab:["Induced emf","แรงเคลื่อนไฟฟ้าเหนี่ยวนำ"], f:function(S){ return fmt2(S.p.N*S.p.rate)+" V"; }},
      {lab:["Huge flux, no change?","ฟลักซ์มหาศาลแต่ไม่เปลี่ยน?"], f:function(S){
        return S.p.rate<1e-9 ? (L()?"emf เป็นศูนย์ ไม่ว่าฟลักซ์จะมากแค่ไหน":"zero emf, however large the flux")
                             : (L()?"มี emf เพราะกำลังเปลี่ยน":"there is emf, because it is changing"); }},
      {lab:["What the minus sign means","เครื่องหมายลบหมายถึง"], f:function(){
        return L()?"กระแสเหนี่ยวนำต้านการเปลี่ยนแปลงที่ทำให้เกิดมัน":"the induced current opposes the change that made it"; }}
    ],
    bars:[
      {lab:["Flux Φ","ฟลักซ์ Φ"], f:function(p){ return p.flux; }, col:"faint"},
      {lab:["Rate dΦ/dt","อัตรา dΦ/dt"], f:function(p){ return p.rate; }, col:"warn"},
      {lab:["Induced emf","emf เหนี่ยวนำ"], f:function(p){ return p.N*p.rate; }, col:"accent"}
    ],
    note:["push the flux bar to maximum with the rate at zero — the emf bar stays flat on the floor","ดันแถบฟลักซ์ให้สูงสุดโดยตั้งอัตราเป็นศูนย์ แถบ emf จะยังราบอยู่กับพื้น"]
  },
  guide:[
    {say:["A large, steady flux. The emf bar is flat at zero — a stationary magnet induces nothing.",
          "ฟลักซ์มากและคงที่ แถบ emf ราบที่ศูนย์ แม่เหล็กที่อยู่นิ่งไม่เหนี่ยวนำอะไรเลย"], set:{flux:10,rate:0,N:10}},
    {say:["Now let it change, even slowly. An emf appears at once, though the flux itself is smaller.",
          "ทีนี้ให้มันเปลี่ยน แม้จะช้าๆ แรงเคลื่อนไฟฟ้าก็ปรากฏทันที ทั้งที่ฟลักซ์เองน้อยกว่าเดิม"], set:{flux:3,rate:4,N:10}},
    {say:["More turns multiply the effect. Faraday's law counts turns as well as the rate of change.",
          "รอบมากขึ้นคูณผลให้มากขึ้น กฎของฟาราเดย์นับทั้งจำนวนรอบและอัตราการเปลี่ยนแปลง"], set:{flux:3,rate:4,N:40}}
  ] },

{ id:"transformers", x:235, y:346, requires:["induction"], methods:["M-05","M-06"],
  title:["Transformers","หม้อแปลงไฟฟ้า"],
  body:[["Voltage scales with the turns ratio, V₂/V₁ = N₂/N₁. In an ideal transformer no power is lost, so V₁I₁ = V₂I₂ — step the voltage up and the current steps down by the same factor.",
         "This is why power is transmitted at hundreds of kilovolts: high voltage means low current, and losses go as I²R. It only works with alternating current, because a steady field induces nothing."],
        ["ความต่างศักย์แปรตามอัตราส่วนจำนวนรอบ V₂/V₁ = N₂/N₁ ในหม้อแปลงอุดมคติไม่มีกำลังสูญเสีย จึงได้ V₁I₁ = V₂I₂ เพิ่มความต่างศักย์แล้วกระแสจะลดลงด้วยอัตราส่วนเดียวกัน",
         "นี่คือเหตุผลที่ส่งไฟฟ้าที่ระดับหลายแสนโวลต์ ความต่างศักย์สูงหมายถึงกระแสต่ำ และการสูญเสียแปรตาม I²R มันใช้ได้กับไฟฟ้ากระแสสลับเท่านั้น เพราะสนามที่คงที่ไม่เหนี่ยวนำอะไรเลย"]],
  formula:["V₂/V₁ = N₂/N₁        V₁I₁ = V₂I₂","V₂/V₁ = N₂/N₁        V₁I₁ = V₂I₂"],
  flabel:["Alternating current only","ใช้ได้กับไฟกระแสสลับเท่านั้น"],
  viz:"bars",
  vizcfg:{
    title:["VOLTAGE UP MEANS CURRENT DOWN","แรงดันขึ้น แปลว่ากระแสลง"],
    ylab:["V  ·  A  ·  turns","V  ·  A  ·  รอบ"],
    ctrls:[
      {k:"Vp", lab:["Primary voltage","แรงดันขดปฐมภูมิ"], min:12, max:240, step:12, def:240, unit:" V"},
      {k:"Np", lab:["Primary turns","รอบขดปฐมภูมิ"], min:10, max:500, step:10, def:200, unit:""},
      {k:"Ns", lab:["Secondary turns","รอบขดทุติยภูมิ"], min:10, max:500, step:10, def:50, unit:""},
      {k:"Ip", lab:["Primary current","กระแสขดปฐมภูมิ"], min:.1, max:5, step:.1, def:1, unit:" A"}
    ],
    readouts:[
      {lab:["Secondary voltage","แรงดันขดทุติยภูมิ"], f:function(S){
        return fmt2(S.p.Vp*S.p.Ns/S.p.Np)+" V"; }},
      {lab:["Secondary current (ideal)","กระแสขดทุติยภูมิ (อุดมคติ)"], f:function(S){
        return fmt2(S.p.Ip*S.p.Np/S.p.Ns)+" A"; }},
      {lab:["Power in vs out","กำลังเข้า เทียบ ออก"], f:function(S){
        return fmt2(S.p.Vp*S.p.Ip)+(L()?" W · เท่ากันทั้งสองฝั่ง":" W · identical on both sides"); }},
      {lab:["Step up or down?","เพิ่มหรือลด"], f:function(S){
        return S.p.Ns>S.p.Np ? (L()?"เพิ่มแรงดัน":"stepping voltage up")
             : S.p.Ns<S.p.Np ? (L()?"ลดแรงดัน":"stepping voltage down") : (L()?"เท่าเดิม":"one to one"); }}
    ],
    bars:[
      {lab:["Primary V","V ปฐมภูมิ"], f:function(p){ return p.Vp; }, col:"faint"},
      {lab:["Secondary V","V ทุติยภูมิ"], f:function(p){ return p.Vp*p.Ns/p.Np; }, col:"accent"},
      {lab:["Primary I","I ปฐมภูมิ"], f:function(p){ return p.Ip; }, col:"faint"},
      {lab:["Secondary I","I ทุติยภูมิ"], f:function(p){ return p.Ip*p.Np/p.Ns; }, col:"good"}
    ],
    note:["a transformer trades volts for amps — it never manufactures power","หม้อแปลงแลกโวลต์กับแอมป์ มันไม่เคยผลิตกำลังขึ้นมาเอง"]
  },
  guide:[
    {say:["Fewer turns on the secondary, so the voltage drops — but watch the current bar rise to match.",
          "รอบขดทุติยภูมิน้อยกว่า แรงดันจึงลดลง แต่ดูแถบกระแสที่เพิ่มขึ้นชดเชย"], set:{Vp:240,Np:200,Ns:50,Ip:1}},
    {say:["Flip it into a step-up. Voltage climbs and current falls by exactly the same factor.",
          "สลับเป็นแบบเพิ่มแรงดัน แรงดันไต่ขึ้นและกระแสลดลงด้วยอัตราส่วนเดียวกันพอดี"], set:{Vp:240,Np:50,Ns:200,Ip:1}},
    {say:["Whatever the ratio, the power readout never changes. That is the constraint behind the whole device.",
          "ไม่ว่าอัตราส่วนเป็นเท่าใด ค่ากำลังไม่เคยเปลี่ยน นั่นคือข้อจำกัดที่อยู่เบื้องหลังอุปกรณ์ทั้งชิ้น"], set:{Vp:120,Np:100,Ns:400,Ip:2}}
  ] }
],

methods:[
{id:"M-01", name:["Field direction and flux","ทิศสนามและฟลักซ์"]},
{id:"M-02", name:["Force on a moving charge","แรงต่อประจุที่เคลื่อนที่"]},
{id:"M-03", name:["Force on a current-carrying wire","แรงต่อลวดที่มีกระแส"]},
{id:"M-04", name:["Apply Faraday and Lenz","ใช้ฟาราเดย์และเลนซ์"]},
{id:"M-05", name:["Transformer turns ratio","อัตราส่วนรอบหม้อแปลง"]},
{id:"M-06", name:["Transformer power and rms values","กำลังหม้อแปลงและค่า rms"]}
],

traps:{
"T-01":["A charge moving parallel to the field feels no force. sin θ = 0.","ประจุที่เคลื่อนที่ขนานกับสนามไม่รู้สึกแรง เพราะ sin θ = 0"],
"T-02":["The magnetic force is perpendicular to the motion, so it does no work and cannot change the speed.","แรงแม่เหล็กตั้งฉากกับการเคลื่อนที่ จึงไม่ทำงานและเปลี่ยนอัตราเร็วไม่ได้"],
"T-03":["Parallel currents in the SAME direction attract. That is the opposite of like charges.","กระแสขนานทิศเดียวกันดูดกัน ซึ่งตรงข้ามกับประจุชนิดเดียวกัน"],
"T-04":["Lenz's law. The induced current opposes the change, and a steady flux induces nothing.","กฎของเลนซ์ กระแสเหนี่ยวนำต้านการเปลี่ยนแปลง และฟลักซ์ที่คงที่ไม่เหนี่ยวนำอะไรเลย"]
},

gen:{
"M-01": function(sf){
  var B=pick([0.2,0.5,1.2]), A=pick([0.01,0.05,0.2]);
  if(sf==="S-04") return {stem:["Which symbol shows a magnetic field pointing into the page?",
                                "สัญลักษณ์ใดแสดงสนามแม่เหล็กที่พุ่งเข้าไปในกระดาษ"],
    opts:[{v:"×",ok:1},{v:"•"},{v:"→"},{v:"↑"}],unit:""};
  if(sf==="S-03") return {stem:["Why do magnetic field lines never start or stop anywhere?",
                                "ทำไมเส้นสนามแม่เหล็กจึงไม่มีจุดเริ่มหรือจุดสิ้นสุด"],
    opts:[{v:["There are no isolated magnetic poles","ไม่มีขั้วแม่เหล็กเดี่ยว"],ok:1},
          {v:["They are too weak to end","มันอ่อนเกินกว่าจะสิ้นสุด"]},
          {v:["They start at the north pole only","มันเริ่มที่ขั้วเหนือเท่านั้น"]},
          {v:["They do end, at charges","มันสิ้นสุดที่ประจุ"]}],unit:""};
  return {stem:["A field of "+B+" T passes perpendicular to an area of "+A+" m². Find the flux.",
                "สนาม "+B+" เทสลา ผ่านตั้งฉากกับพื้นที่ "+A+" ตร.ม. จงหาฟลักซ์"],
    opts:[{v:fmt2(B*A),ok:1},{v:fmt2(B/A)},{v:fmt2(A/B)},{v:fmt2(B*A*2)}],unit:" Wb"};
},
"M-02": function(sf){
  var q=pick([1.6e-19,3.2e-19]), v=pick([1e6,2e6,5e6]), B=pick([0.1,0.4,0.8]);
  var F=q*v*B;
  if(sf==="S-04") return {stem:["A charge moves exactly along a magnetic field line. What force does it feel?",
                                "ประจุเคลื่อนที่ไปตามเส้นสนามแม่เหล็กพอดี มันรู้สึกแรงเท่าใด"],
    opts:[{v:["None — sin θ is zero","ไม่มีแรง เพราะ sin θ เป็นศูนย์"],ok:1},
          {v:["Maximum force","แรงมากที่สุด"],trap:"T-01"},
          {v:["Half the maximum","ครึ่งหนึ่งของแรงสูงสุด"],trap:"T-01"},
          {v:["A force along the field","แรงในแนวสนาม"],trap:"T-01"}],unit:""};
  if(sf==="S-03") return {stem:["A charged particle enters a uniform field at right angles. What path does it follow, and does it speed up?",
                                "อนุภาคมีประจุเข้าสู่สนามสม่ำเสมอในแนวตั้งฉาก มันเคลื่อนที่เป็นเส้นทางแบบใด และเร็วขึ้นหรือไม่"],
    opts:[{v:["A circle, at constant speed","วงกลม ด้วยอัตราเร็วคงที่"],ok:1},
          {v:["A circle, speeding up","วงกลม และเร็วขึ้น"],trap:"T-02"},
          {v:["A straight line, speeding up","เส้นตรง และเร็วขึ้น"],trap:"T-02"},
          {v:["A parabola","พาราโบลา"]}],unit:""};
  return {stem:["A charge of "+q.toExponential(1)+" C moves at "+v.toExponential(0)+" m/s across a "+B+" T field. Find the force.",
                "ประจุ "+q.toExponential(1)+" คูลอมบ์ เคลื่อนที่ด้วย "+v.toExponential(0)+" ม./วินาที ตัดสนาม "+B+" เทสลา จงหาแรง"],
    opts:[{v:F.toExponential(2),ok:1},{v:(F/B).toExponential(2)},{v:(F*B).toExponential(2)},{v:"0",trap:"T-01"}],unit:" N"};
},
"M-03": function(sf){
  var B=pick([0.2,0.5,1]), I=pick([2,5,10]), Lw=pick([0.1,0.4,1]);
  var F=B*I*Lw;
  if(sf==="S-04") return {stem:["Two parallel wires carry current in the same direction. What happens?",
                                "ลวดขนานสองเส้นมีกระแสไหลทิศเดียวกัน จะเกิดอะไรขึ้น"],
    opts:[{v:["They attract each other","ดูดกัน"],ok:1},{v:["They repel each other","ผลักกัน"],trap:"T-03"},
          {v:["Nothing happens","ไม่เกิดอะไร"]},{v:["They twist at right angles","บิดตั้งฉากกัน"]}],unit:""};
  if(sf==="S-05") return {stem:["A "+Lw+" m wire in a "+B+" T field feels "+fmt2(F)+" N. Find the current.",
                                "ลวดยาว "+Lw+" เมตร ในสนาม "+B+" เทสลา รู้สึกแรง "+fmt2(F)+" นิวตัน จงหากระแส"],
    opts:[{v:String(I),ok:1},{v:fmt(F*B*Lw)},{v:fmt(F/Lw)},{v:fmt(I*2)}],unit:" A"};
  return {stem:["A wire "+Lw+" m long carries "+I+" A perpendicular to a "+B+" T field. Find the force.",
                "ลวดยาว "+Lw+" เมตร มีกระแส "+I+" แอมแปร์ ตั้งฉากกับสนาม "+B+" เทสลา จงหาแรง"],
    opts:[{v:fmt2(F),ok:1},{v:fmt2(F/Lw)},{v:fmt2(B*I)},{v:"0",trap:"T-01"}],unit:" N"};
},
"M-04": function(sf){
  var N=pick([50,100,200]), dPhi=pick([0.01,0.02,0.05]), dt=pick([0.1,0.2,0.5]);
  var e=N*dPhi/dt;
  if(sf==="S-04") return {stem:["A magnet is held motionless inside a coil. What emf is induced?",
                                "วางแม่เหล็กนิ่งไว้ในขดลวด เกิดแรงเคลื่อนไฟฟ้าเหนี่ยวนำเท่าใด"],
    opts:[{v:["None — the flux is not changing","ไม่เกิด เพราะฟลักซ์ไม่เปลี่ยนแปลง"],ok:1},
          {v:["A steady emf proportional to the flux","แรงเคลื่อนคงที่ตามฟลักซ์"],trap:"T-04"},
          {v:["A large emf","แรงเคลื่อนขนาดใหญ่"],trap:"T-04"},
          {v:["An alternating emf","แรงเคลื่อนสลับ"]}],unit:""};
  if(sf==="S-03") return {stem:["A north pole is pushed into a coil. Which way does the induced current flow?",
                                "ผลักขั้วเหนือเข้าไปในขดลวด กระแสเหนี่ยวนำไหลไปทางใด"],
    opts:[{v:["So as to create a north pole facing the magnet","ในทิศที่สร้างขั้วเหนือหันเข้าหาแม่เหล็ก"],ok:1},
          {v:["So as to create a south pole facing the magnet","ในทิศที่สร้างขั้วใต้หันเข้าหาแม่เหล็ก"],trap:"T-04"},
          {v:["It does not flow at all","ไม่ไหลเลย"],trap:"T-04"},
          {v:["In whichever direction the coil is wound","ตามทิศที่พันขดลวด"]}],unit:""};
  return {stem:["A "+N+"-turn coil sees its flux change by "+dPhi+" Wb in "+dt+" s. Find the induced emf.",
                "ขดลวด "+N+" รอบ มีฟลักซ์เปลี่ยนไป "+dPhi+" เวเบอร์ ใน "+dt+" วินาที จงหาแรงเคลื่อนเหนี่ยวนำ"],
    opts:[{v:fmt(e),ok:1},{v:fmt(dPhi/dt),trap:"T-04"},{v:fmt(N*dPhi)},{v:fmt(e/2)}],unit:" V"};
},
"M-05": function(sf){
  var N1=pick([100,200,500]), k=pick([2,4,5]), N2=N1*k, V1=pick([12,24,240]);
  var V2=V1*k;
  if(sf==="S-04") return {stem:["Why will a transformer not work on direct current?",
                                "ทำไมหม้อแปลงจึงใช้กับไฟฟ้ากระแสตรงไม่ได้"],
    opts:[{v:["A steady current gives a steady flux, which induces nothing","กระแสคงที่ให้ฟลักซ์คงที่ ซึ่งไม่เหนี่ยวนำอะไรเลย"],ok:1},
          {v:["Direct current is too weak","กระแสตรงอ่อนเกินไป"]},
          {v:["The coils would melt","ขดลวดจะละลาย"]},
          {v:["It does work on direct current","ใช้กับกระแสตรงได้"],trap:"T-04"}],unit:""};
  if(sf==="S-05") return {stem:["A transformer turns "+V1+" V into "+V2+" V with "+N1+" primary turns. Find the secondary turns.",
                                "หม้อแปลงเปลี่ยน "+V1+" โวลต์ เป็น "+V2+" โวลต์ โดยขดปฐมภูมิ "+N1+" รอบ จงหาจำนวนรอบขดทุติยภูมิ"],
    opts:[{v:String(N2),ok:1},{v:String(N1/k),trap:"T-03"},{v:String(N1)},{v:String(N2*2)}],unit:" turns"};
  return {stem:["A transformer has "+N1+" primary and "+N2+" secondary turns, fed with "+V1+" V. Find the output voltage.",
                "หม้อแปลงมีขดปฐมภูมิ "+N1+" รอบ ทุติยภูมิ "+N2+" รอบ ป้อนด้วย "+V1+" โวลต์ จงหาความต่างศักย์ขาออก"],
    opts:[{v:String(V2),ok:1},{v:fmt(V1/k),trap:"T-03"},{v:String(V1)},{v:fmt(V2/2)}],unit:" V"};
},
"M-06": function(sf){
  var V1=pick([240,120]), I1=pick([2,5,10]), k=pick([2,4]);
  var P=V1*I1, V2=V1*k, I2=P/V2;
  if(sf==="S-04") return {stem:["Why is electrical power transmitted at very high voltage?",
                                "ทำไมจึงส่งกำลังไฟฟ้าที่ความต่างศักย์สูงมาก"],
    opts:[{v:["High voltage means low current, and losses go as I²R","ความต่างศักย์สูงทำให้กระแสต่ำ และการสูญเสียแปรตาม I²R"],ok:1},
          {v:["High voltage travels faster","ความต่างศักย์สูงเดินทางเร็วกว่า"]},
          {v:["It reduces the resistance of the cables","มันลดความต้านทานของสายเคเบิล"]},
          {v:["High voltage means high current","ความต่างศักย์สูงหมายถึงกระแสสูง"],trap:"T-03"}],unit:""};
  if(sf==="S-05") return {stem:["An ideal transformer outputs "+fmt(I2)+" A at "+V2+" V. Find its input power.",
                                "หม้อแปลงอุดมคติจ่ายกระแส "+fmt(I2)+" แอมแปร์ ที่ "+V2+" โวลต์ จงหากำลังขาเข้า"],
    opts:[{v:String(P),ok:1},{v:fmt(V2*I2*2)},{v:fmt(P/2)},{v:fmt(V2/I2)}],unit:" W"};
  return {stem:["An ideal transformer draws "+I1+" A at "+V1+" V and steps up by "+k+"×. Find the output current.",
                "หม้อแปลงอุดมคติรับกระแส "+I1+" แอมแปร์ ที่ "+V1+" โวลต์ และเพิ่มความต่างศักย์ "+k+" เท่า จงหากระแสขาออก"],
    opts:[{v:fmt(I2),ok:1},{v:String(I1*k),trap:"T-03"},{v:String(I1)},{v:fmt(I2*2)}],unit:" A"};
}
}
};
