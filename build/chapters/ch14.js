var CHAPTER = {
id:"ch14", num:"14", slug:"current-electricity", subject:"physics",
kicker:["Physics · Chapter 14","ฟิสิกส์ · บทที่ 14"],
title:["Current Electricity","ไฟฟ้ากระแส"],
mapTitle:["Charge that keeps moving","ประจุที่เคลื่อนที่ไม่หยุด"],
lede:["Chapter 13 held charge still. Let it flow and two rules govern everything: charge is conserved at every junction, and energy is conserved around every loop. Every circuit problem is one of those two.",
      "บทที่ 13 ตรึงประจุไว้กับที่ ปล่อยให้มันไหลแล้วจะมีสองกฎที่ควบคุมทุกอย่าง คือประจุอนุรักษ์ที่ทุกจุดต่อ และพลังงานอนุรักษ์รอบทุกวงรอบ โจทย์วงจรทุกข้อคือหนึ่งในสองนั้น"],
next:["→ continues in Chapter 15 · Magnetism","→ ต่อในบทที่ 15 · แม่เหล็กและไฟฟ้า"],

nodes:[
{ id:"current", x:235, y:52, requires:[], methods:["M-01"],
  title:["Current and resistance","กระแสและความต้านทาน"],
  body:[["Current is charge per second, I = Q/t. Resistance opposes it, and Ohm's law V = IR ties the two together for any component whose resistance stays constant.",
         "Resistance itself comes from geometry and material: R = ρL/A. A longer wire resists more, a thicker one resists less, which is why thin filaments glow and thick cables do not."],
        ["กระแสคือประจุต่อวินาที I = Q/t ความต้านทานต้านมันไว้ และกฎของโอห์ม V = IR ผูกทั้งสองเข้าด้วยกันสำหรับอุปกรณ์ใดที่ความต้านทานคงที่",
         "ความต้านทานเองมาจากรูปทรงและวัสดุ R = ρL/A ลวดที่ยาวกว่าต้านมากกว่า ลวดที่หนากว่าต้านน้อยกว่า จึงเป็นเหตุผลที่ไส้หลอดบางเรืองแสงแต่สายเคเบิลหนาไม่เรือง"]],
  formula:["I = Q/t        V = IR        R = ρL/A","I = Q/t        V = IR        R = ρL/A"],
  flabel:["Longer resists more, thicker resists less","ยาวกว่าต้านมากกว่า หนากว่าต้านน้อยกว่า"],
  viz:"plot",
  vizcfg:{
    title:["OHMIC AND NON-OHMIC BEHAVIOUR","พฤติกรรมแบบโอห์มและไม่เป็นโอห์ม"],
    xlab:["current I (A)","กระแส I (A)"], ylab:["voltage V (V)","ความต่างศักย์ V (V)"],
    xmin:0, xmax:3, ymin:0, fill:false,
    fn:function(x,p){ return p.kind===0 ? p.R*x : p.R*x*(1+0.9*x); },
    mark:function(p){ return p.I; },
    ctrls:[
      {k:"kind", lab:["",""], opts:[["resistor","ตัวต้านทาน"], ["filament lamp","หลอดไส้"]], min:0, def:0, unit:""},
      {k:"R",    lab:["Resistance at low current","ความต้านทานที่กระแสต่ำ"], min:1, max:12, step:.5, def:4, unit:" Ω"},
      {k:"I",    lab:["Current","กระแส"], min:.1, max:2.9, step:.1, def:1, unit:" A"}
    ],
    readouts:[
      {lab:["Voltage","ความต่างศักย์"], f:function(S){
        var p=S.p; return fmt2(p.kind===0 ? p.R*p.I : p.R*p.I*(1+0.9*p.I))+" V"; }},
      {lab:["Resistance V/I right now","ความต้านทาน V/I ขณะนี้"], f:function(S){
        var p=S.p; return fmt2(p.kind===0 ? p.R : p.R*(1+0.9*p.I))+" Ω"; }},
      {lab:["Obeys Ohm's law?","เป็นไปตามกฎของโอห์มไหม"], f:function(S){
        return S.p.kind===0 ? (L()?"ใช่ — เส้นตรง ความต้านทานคงที่":"yes — straight line, constant resistance")
                            : (L()?"ไม่ — ความต้านทานโตขึ้นเมื่อร้อน":"no — resistance rises as it heats"); }},
      {lab:["What the graph shape means","รูปกราฟบอกอะไร"], f:function(){
        return L()?"ตรง = โอห์ม · โค้ง = ไม่ใช่โอห์ม":"straight means ohmic, curved means not"; }}
    ],
    note:["Ohm's law is not a law of nature — it is a description that some components happen to fit","กฎของโอห์มไม่ใช่กฎธรรมชาติ แต่เป็นคำบรรยายที่อุปกรณ์บางชนิดบังเอิญเข้าข่าย"]
  } },

{ id:"series", x:100, y:150, requires:["current"], methods:["M-02"],
  title:["Series circuits","วงจรอนุกรม"],
  body:[["In series there is only one path, so the same current passes through every component. The voltage divides between them in proportion to their resistances, and the total resistance is the plain sum.",
         "Add a resistor in series and the total always rises. Christmas lights of the old kind were wired this way, which is why one failed bulb killed the whole string."],
        ["ในวงจรอนุกรมมีทางเดินเดียว กระแสเดียวกันจึงผ่านทุกอุปกรณ์ ความต่างศักย์แบ่งกันตามสัดส่วนของความต้านทาน และความต้านทานรวมคือผลบวกตรงๆ",
         "เพิ่มตัวต้านทานแบบอนุกรม ค่ารวมจะเพิ่มขึ้นเสมอ ไฟประดับแบบเก่าต่อกันแบบนี้ จึงเป็นเหตุผลที่หลอดเดียวขาดแล้วดับทั้งสาย"]],
  formula:["I same        V splits        R = ΣR","I เท่ากัน        V แบ่งกัน        R = ΣR"],
  flabel:["One path, shared current","ทางเดียว กระแสร่วมกัน"],
  viz:"bars",
  vizcfg:{
    title:["HOW A SERIES CHAIN SHARES THE VOLTAGE","วงจรอนุกรมแบ่งความต่างศักย์อย่างไร"],
    ylab:["volts  ·  ohms","โวลต์  ·  โอห์ม"],
    ctrls:[
      {k:"V",  lab:["Supply voltage","ความต่างศักย์แหล่งจ่าย"], min:3, max:24, step:1, def:12, unit:" V"},
      {k:"R1", lab:["R₁","R₁"], min:1, max:20, step:1, def:2, unit:" Ω"},
      {k:"R2", lab:["R₂","R₂"], min:1, max:20, step:1, def:4, unit:" Ω"},
      {k:"R3", lab:["R₃","R₃"], min:1, max:20, step:1, def:6, unit:" Ω"}
    ],
    readouts:[
      {lab:["Total resistance","ความต้านทานรวม"], f:function(S){
        return fmt2(S.p.R1+S.p.R2+S.p.R3)+" Ω"; }},
      {lab:["Current (same everywhere)","กระแส (เท่ากันทุกจุด)"], f:function(S){
        return fmt2(S.p.V/(S.p.R1+S.p.R2+S.p.R3))+" A"; }},
      {lab:["Voltages add up to","ผลรวมความต่างศักย์"], f:function(S){
        return fmt2(S.p.V)+(L()?" V · เท่ากับแหล่งจ่ายพอดี":" V · exactly the supply"); }},
      {lab:["Biggest share goes to","ส่วนแบ่งมากที่สุดตกที่"], f:function(S){
        var p=S.p, m=Math.max(p.R1,p.R2,p.R3);
        return (m===p.R1?"R₁":m===p.R2?"R₂":"R₃")+(L()?" · ความต้านทานสูงสุด":" · the largest resistance"); }}
    ],
    bars:[
      {lab:["V across R₁","V คร่อม R₁"], f:function(p){ return p.V*p.R1/(p.R1+p.R2+p.R3); }, col:"accent"},
      {lab:["V across R₂","V คร่อม R₂"], f:function(p){ return p.V*p.R2/(p.R1+p.R2+p.R3); }, col:"accent"},
      {lab:["V across R₃","V คร่อม R₃"], f:function(p){ return p.V*p.R3/(p.R1+p.R2+p.R3); }, col:"accent"},
      {lab:["Supply V","แหล่งจ่าย V"], f:function(p){ return p.V; }, col:"ink"}
    ],
    note:["the three coloured bars always stack up to the black one — that is Kirchhoff's loop rule","แถบสีทั้งสามรวมกันได้เท่ากับแถบสีดำเสมอ นั่นคือกฎวงของเคอร์ชอฟฟ์"]
  } },

{ id:"parallel", x:370, y:150, requires:["current"], methods:["M-03"],
  title:["Parallel circuits","วงจรขนาน"],
  body:[["In parallel every branch sees the same voltage, and the current divides between them. Reciprocals add, so the total resistance is always less than the smallest single branch.",
         "That last fact surprises people: adding another resistor in parallel lowers the total. It works because you have added another path, not another obstacle. Adding resistances directly here is trap T-02."],
        ["ในวงจรขนาน ทุกกิ่งเห็นความต่างศักย์เท่ากัน และกระแสแบ่งกันไป ส่วนกลับบวกกัน ความต้านทานรวมจึงน้อยกว่ากิ่งที่น้อยที่สุดเสมอ",
         "ข้อเท็จจริงสุดท้ายทำให้คนแปลกใจ การเพิ่มตัวต้านทานแบบขนานทำให้ค่ารวมลดลง เพราะคุณเพิ่มทางเดินอีกทาง ไม่ใช่เพิ่มสิ่งกีดขวาง การบวกความต้านทานตรงๆ ตรงนี้คือกับดัก T-02"]],
  formula:["V same        I splits        1/R = Σ1/R","V เท่ากัน        I แบ่งกัน        1/R = Σ1/R"],
  flabel:["Total is below the smallest branch","ค่ารวมน้อยกว่ากิ่งที่เล็กที่สุด"],
  viz:{
    vb:"0 0 560 300", anim:false,
    ctrls:[
      {k:"V",  lab:["Supply V","แหล่งจ่าย V"], min:3, max:24, step:1, def:12, unit:" V"},
      {k:"R1", lab:["R₁","R₁"], min:1, max:50, step:1, def:10, unit:" Ω"},
      {k:"R2", lab:["R₂","R₂"], min:1, max:50, step:1, def:20, unit:" Ω"},
      {k:"mode", lab:["",""], opts:[["series","อนุกรม"], ["parallel","ขนาน"]], min:0, def:0, unit:""}
    ],
    readouts:[
      {lab:["Total R","R รวม"], f:function(S){
        return fmt(S.p.mode?1/(1/S.p.R1+1/S.p.R2):S.p.R1+S.p.R2)+" Ω"; }},
      {lab:["Total current","กระแสรวม"], f:function(S){
        var R=S.p.mode?1/(1/S.p.R1+1/S.p.R2):S.p.R1+S.p.R2; return fmt(S.p.V/R)+" A"; }},
      {lab:["Power","กำลัง"], f:function(S){
        var R=S.p.mode?1/(1/S.p.R1+1/S.p.R2):S.p.R1+S.p.R2; return fmt(S.p.V*S.p.V/R)+" W"; }}
    ],
    draw:function(S,o){
      var V=S.p.V, R1=S.p.R1, R2=S.p.R2, par=S.p.mode===1;
      var Rt=par?1/(1/R1+1/R2):R1+R2, It=V/Rt;
      var i1=par?V/R1:It, i2=par?V/R2:It;
      var v1=par?V:It*R1, v2=par?V:It*R2;
      o.push('<text x="30" y="24" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5" letter-spacing="1.4">'+(par?"PARALLEL":"SERIES")+'</text>');
      function res(x,y,w,label,val,cur,volt){
        o.push('<rect x="'+x+'" y="'+(y-13)+'" width="'+w+'" height="26" fill="var(--ground)" stroke="var(--ink)" stroke-width="1.8"/>');
        o.push('<text x="'+(x+w/2)+'" y="'+(y+4)+'" fill="var(--ink)" font-family="IBM Plex Sans" font-size="11" font-weight="600" text-anchor="middle">'+label+'</text>');
        o.push('<text x="'+(x+w/2)+'" y="'+(y-20)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">'+val+' Ω</text>');
        o.push('<text x="'+(x+w/2)+'" y="'+(y+34)+'" fill="var(--accent)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">'+fmt(cur)+' A · '+fmt(volt)+' V</text>');
      }
      function wire(x1,y1,x2,y2){ o.push('<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="var(--ink-soft)" stroke-width="2"/>'); }
      /* battery */
      o.push('<line x1="60" y1="150" x2="60" y2="126" stroke="var(--ink)" stroke-width="3"/>');
      o.push('<line x1="60" y1="174" x2="60" y2="196" stroke="var(--ink)" stroke-width="1.5"/>');
      o.push('<text x="42" y="166" fill="var(--ink)" font-family="IBM Plex Sans" font-size="11" text-anchor="end">'+V+' V</text>');
      if(!par){
        wire(60,126,150,126); res(150,126,90,"R₁",R1,i1,v1); wire(240,126,340,126);
        res(340,126,90,"R₂",R2,i2,v2); wire(430,126,500,126);
        wire(500,126,500,196); wire(500,196,60,196);
      } else {
        wire(60,126,160,126);
        wire(160,126,160,96); wire(160,96,220,96); res(220,96,90,"R₁",R1,i1,v1); wire(310,96,400,96);
        wire(160,126,160,186); wire(160,186,220,186); res(220,186,90,"R₂",R2,i2,v2); wire(310,186,400,186);
        wire(400,96,400,186);
        wire(400,141,500,141); wire(500,141,500,240); wire(500,240,60,240); wire(60,196,60,240);
      }
      /* total readout bar, drawn to scale against a 5 A full-scale */
      var bw=Math.min(300,It/5*300);
      o.push('<text x="30" y="272" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["TOTAL CURRENT","กระแสรวม"])+'</text>');
      o.push('<rect x="150" y="262" width="300" height="12" fill="none" stroke="var(--rule)" stroke-width="1"/>');
      o.push('<rect x="150" y="262" width="'+bw+'" height="12" fill="var(--accent)"/>');
      o.push('<text x="456" y="272" fill="var(--ink)" font-family="IBM Plex Sans" font-size="10">'+fmt(It)+' A</text>');
      o.push('<text x="150" y="290" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="9">0</text>');
      o.push('<text x="450" y="290" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="9" text-anchor="end">5 A</text>');
    }
  },
  guide:[
    {say:["Series first. One path, so both resistors carry the same current — and the voltages add up to the supply.",
          "เริ่มที่อนุกรม ทางเดียว ตัวต้านทานทั้งสองจึงมีกระแสเท่ากัน และความต่างศักย์รวมกันได้เท่าแหล่งจ่าย"], set:{V:12,R1:10,R2:20,mode:0}},
    {say:["Switch to parallel. Now both see the full 12 V, and the total current jumps — read the bar.",
          "สลับเป็นขนาน ทีนี้ทั้งคู่เห็น 12 โวลต์เต็ม และกระแสรวมพุ่งขึ้น ดูที่แถบวัด"], set:{V:12,R1:10,R2:20,mode:1}},
    {say:["The total resistance in parallel is under 7 Ω — less than either branch. Adding a path lowers resistance.",
          "ความต้านทานรวมแบบขนานต่ำกว่า 7 โอห์ม น้อยกว่าทั้งสองกิ่ง การเพิ่มทางเดินทำให้ความต้านทานลดลง"], set:{V:12,R1:10,R2:20,mode:1}},
    {say:["Make R₂ very large in parallel. That branch nearly stops conducting, and the total tends to R₁ alone.",
          "ทำให้ R₂ ใหญ่มากในแบบขนาน กิ่งนั้นแทบไม่นำกระแส และค่ารวมเข้าใกล้ R₁ เพียงตัวเดียว"], set:{V:12,R1:10,R2:50,mode:1}}
  ]},

{ id:"power", x:235, y:248, requires:["series","parallel"], methods:["M-04"],
  title:["Electrical power","กำลังไฟฟ้า"],
  body:[["Power is P = IV, and with Ohm's law that becomes P = I²R or P = V²/R. Which form to use depends on what the question gives you, and picking well saves a whole line of algebra.",
         "Energy is power times time, W = Pt. Domestic bills use the kilowatt-hour, which is just a large joule: 1 kWh = 3.6 × 10⁶ J."],
        ["กำลังคือ P = IV และเมื่อใช้กฎของโอห์มจะกลายเป็น P = I²R หรือ P = V²/R เลือกใช้รูปใดขึ้นกับสิ่งที่โจทย์ให้มา และการเลือกดีช่วยประหยัดพีชคณิตไปทั้งบรรทัด",
         "พลังงานคือกำลังคูณเวลา W = Pt บิลค่าไฟบ้านใช้หน่วยกิโลวัตต์-ชั่วโมง ซึ่งก็คือจูลขนาดใหญ่ 1 kWh = 3.6 × 10⁶ จูล"]],
  formula:["P = IV = I²R = V²/R        W = Pt","P = IV = I²R = V²/R        W = Pt"],
  flabel:["Three forms, one idea","สามรูป หนึ่งความคิด"],
  viz:"bars",
  vizcfg:{
    title:["WHICH COMPONENT GETS HOT","ชิ้นส่วนใดจะร้อน"],
    ylab:["watts","วัตต์"],
    ctrls:[
      {k:"V",  lab:["Supply voltage","ความต่างศักย์แหล่งจ่าย"], min:3, max:24, step:1, def:12, unit:" V"},
      {k:"R1", lab:["R₁","R₁"], min:1, max:20, step:1, def:2, unit:" Ω"},
      {k:"R2", lab:["R₂","R₂"], min:1, max:20, step:1, def:10, unit:" Ω"},
      {k:"ser", lab:["",""], opts:[["series","อนุกรม"], ["parallel","ขนาน"]], min:0, def:0, unit:""}
    ],
    readouts:[
      {lab:["Power in R₁","กำลังใน R₁"], f:function(S){
        var p=S.p;
        if(p.ser===0){ var I=p.V/(p.R1+p.R2); return fmt2(I*I*p.R1)+" W"; }
        return fmt2(p.V*p.V/p.R1)+" W"; }},
      {lab:["Power in R₂","กำลังใน R₂"], f:function(S){
        var p=S.p;
        if(p.ser===0){ var I=p.V/(p.R1+p.R2); return fmt2(I*I*p.R2)+" W"; }
        return fmt2(p.V*p.V/p.R2)+" W"; }},
      {lab:["Hotter one","ตัวที่ร้อนกว่า"], f:function(S){
        var p=S.p;
        var hot = p.ser===0 ? (p.R1>p.R2?"R₁":"R₂") : (p.R1<p.R2?"R₁":"R₂");
        return hot+(L()?(p.ser===0?" · อนุกรม: R มากยิ่งร้อน":" · ขนาน: R น้อยยิ่งร้อน")
                       :(p.ser===0?" · in series, bigger R burns more":" · in parallel, smaller R burns more")); }},
      {lab:["Why they swap","ทำไมจึงสลับกัน"], f:function(){
        return L()?"อนุกรมใช้ I²R (I เท่ากัน) ขนานใช้ V²/R (V เท่ากัน)":"series shares I so use I²R; parallel shares V so use V²/R"; }}
    ],
    bars:[
      {lab:["P in R₁","กำลังใน R₁"], f:function(p){
        if(p.ser===0){ var I=p.V/(p.R1+p.R2); return I*I*p.R1; } return p.V*p.V/p.R1; }, col:"accent"},
      {lab:["P in R₂","กำลังใน R₂"], f:function(p){
        if(p.ser===0){ var I=p.V/(p.R1+p.R2); return I*I*p.R2; } return p.V*p.V/p.R2; }, col:"warn"},
      {lab:["Total","รวม"], f:function(p){
        if(p.ser===0){ var I=p.V/(p.R1+p.R2); return I*I*(p.R1+p.R2); }
        return p.V*p.V/p.R1+p.V*p.V/p.R2; }, col:"ink"}
    ],
    note:["flip between series and parallel and watch which resistor takes the heat — it swaps over","สลับระหว่างอนุกรมกับขนานแล้วดูว่าตัวไหนร้อน คำตอบจะสลับกัน"]
  },
  guide:[
    {say:["In series both carry the same current, so P = I²R makes the LARGER resistor the hotter one.",
          "ในวงจรอนุกรม ทั้งคู่มีกระแสเท่ากัน P = I²R จึงทำให้ตัวที่ R มากกว่าร้อนกว่า"], set:{V:12,R1:2,R2:10,ser:0}},
    {say:["Switch to parallel. Now both share the voltage, P = V²/R, and the SMALLER resistor runs hotter.",
          "สลับเป็นขนาน ตอนนี้ทั้งคู่มีความต่างศักย์เท่ากัน P = V²/R ตัวที่ R น้อยกว่าจึงร้อนกว่า"], set:{V:12,R1:2,R2:10,ser:1}},
    {say:["Same two resistors, opposite answer. Which formula to use is decided by what the components share.",
          "ตัวต้านทานคู่เดิม คำตอบตรงข้าม การเลือกสูตรขึ้นกับว่าอุปกรณ์ใช้อะไรร่วมกัน"], set:{V:12,R1:2,R2:10,ser:1}}
  ] },

{ id:"kirchhoff", x:235, y:346, requires:["power"], methods:["M-05","M-06"],
  title:["Kirchhoff's laws","กฎของเคอร์ชอฟฟ์"],
  body:[["The junction rule says current in equals current out — charge does not pile up anywhere. The loop rule says the voltages around any closed loop sum to zero — energy is conserved.",
         "Real cells have internal resistance r, so the terminal voltage is E − Ir rather than E. That is why a battery reads lower when it is doing work, and why headlights dim as the starter turns."],
        ["กฎจุดต่อบอกว่ากระแสเข้าเท่ากับกระแสออก ประจุไม่กองสะสมที่ใด ส่วนกฎวงรอบบอกว่าความต่างศักย์รอบวงรอบปิดใดๆ รวมกันได้ศูนย์ พลังงานอนุรักษ์",
         "เซลล์จริงมีความต้านทานภายใน r ความต่างศักย์ที่ขั้วจึงเป็น E − Ir ไม่ใช่ E จึงเป็นเหตุผลที่แบตเตอรี่อ่านค่าได้ต่ำลงขณะทำงาน และไฟหน้ารถหรี่ลงตอนสตาร์ท"]],
  formula:["ΣI_in = ΣI_out        ΣV = 0        V_terminal = E − Ir","ΣI_in = ΣI_out        ΣV = 0        V_terminal = E − Ir"],
  flabel:["Charge at junctions · energy round loops","ประจุที่จุดต่อ · พลังงานรอบวงรอบ"],
  viz:"bars",
  vizcfg:{
    title:["WHAT FLOWS IN MUST FLOW OUT","เข้าเท่าไร ต้องออกเท่านั้น"],
    ylab:["amperes","แอมแปร์"],
    ctrls:[
      {k:"Iin", lab:["Current arriving","กระแสที่ไหลเข้า"], min:1, max:12, step:.5, def:6, unit:" A"},
      {k:"f",   lab:["Fraction down branch 1","สัดส่วนที่ไปสาขา 1"], min:5, max:95, step:5, def:60, unit:" %"}
    ],
    readouts:[
      {lab:["Into the junction","เข้าจุดต่อ"], f:function(S){ return fmt2(S.p.Iin)+" A"; }},
      {lab:["Out along branch 1","ออกทางสาขา 1"], f:function(S){ return fmt2(S.p.Iin*S.p.f/100)+" A"; }},
      {lab:["Out along branch 2","ออกทางสาขา 2"], f:function(S){ return fmt2(S.p.Iin*(100-S.p.f)/100)+" A"; }},
      {lab:["Can charge pile up?","ประจุสะสมที่จุดต่อได้ไหม"], f:function(){
        return L()?"ไม่ได้ — ประจุอนุรักษ์":"no — charge is conserved"; }}
    ],
    bars:[
      {lab:["In","เข้า"], f:function(p){ return p.Iin; }, col:"accent"},
      {lab:["Branch 1","สาขา 1"], f:function(p){ return p.Iin*p.f/100; }, col:"good"},
      {lab:["Branch 2","สาขา 2"], f:function(p){ return p.Iin*(100-p.f)/100; }, col:"warn"},
      {lab:["Out total","ออกรวม"], f:function(p){ return p.Iin; }, col:"ink"}
    ],
    note:["the first and last bars can never differ — the junction rule is just charge conservation","แถบแรกกับแถบสุดท้ายต่างกันไม่ได้เลย กฎจุดต่อคือการอนุรักษ์ประจุนั่นเอง"]
  } }
],

methods:[
{id:"M-01", name:["Apply V = IR and R = ρL/A","ใช้ V = IR และ R = ρL/A"]},
{id:"M-02", name:["Solve a series circuit","แก้วงจรอนุกรม"]},
{id:"M-03", name:["Solve a parallel circuit","แก้วงจรขนาน"]},
{id:"M-04", name:["Compute power and energy","คำนวณกำลังและพลังงาน"]},
{id:"M-05", name:["Apply the junction rule","ใช้กฎจุดต่อ"]},
{id:"M-06", name:["Account for internal resistance","คิดความต้านทานภายใน"]}
],

traps:{
"T-01":["Resistance rises with length but falls with cross-sectional area. R = ρL/A, not ρA/L.","ความต้านทานเพิ่มตามความยาวแต่ลดตามพื้นที่หน้าตัด R = ρL/A ไม่ใช่ ρA/L"],
"T-02":["Parallel resistances add as reciprocals. The total is always below the smallest branch.","ความต้านทานขนานบวกแบบส่วนกลับ ค่ารวมต่ำกว่ากิ่งที่เล็กที่สุดเสมอ"],
"T-03":["In series the current is shared and voltage splits. In parallel it is the other way round.","ในอนุกรมกระแสเท่ากันและความต่างศักย์แบ่งกัน ในขนานกลับกัน"],
"T-04":["Terminal voltage is E − Ir, not E. A working cell always reads below its emf.","ความต่างศักย์ที่ขั้วคือ E − Ir ไม่ใช่ E เซลล์ที่กำลังทำงานอ่านค่าได้ต่ำกว่าแรงเคลื่อนไฟฟ้าเสมอ"]
},

gen:{
"M-01": function(sf){
  var V=pick([6,12,24]), R=pick([2,4,8,12]);
  var I=V/R, rho=1.7e-8, Lw=pick([2,5,10]), Aw=pick([1,2,4]);
  if(sf==="S-04") return {stem:["A wire is replaced by one twice as long and of the same thickness. Its resistance:",
                                "เปลี่ยนลวดเป็นเส้นที่ยาวเป็นสองเท่าและหนาเท่าเดิม ความต้านทานจะ"],
    opts:[{v:["Doubles","เพิ่มเป็นสองเท่า"],ok:1},{v:["Halves","ลดลงครึ่งหนึ่ง"],trap:"T-01"},
          {v:["Is unchanged","เท่าเดิม"]},{v:["Quadruples","เพิ่มเป็นสี่เท่า"]}],unit:""};
  if(sf==="S-03") return {stem:["A wire of resistivity 1.7 × 10⁻⁸ Ω·m is "+Lw+" m long with cross-section "+Aw+" mm². Find its resistance.",
                                "ลวดสภาพต้านทาน 1.7 × 10⁻⁸ โอห์ม·เมตร ยาว "+Lw+" เมตร พื้นที่หน้าตัด "+Aw+" ตร.มม. จงหาความต้านทาน"],
    opts:[{v:(rho*Lw/(Aw*1e-6)).toExponential(2),ok:1},
          {v:(rho*Aw*1e-6/Lw).toExponential(2),trap:"T-01"},
          {v:(rho*Lw).toExponential(2)},{v:(rho*Lw*Aw).toExponential(2)}],unit:" Ω"};
  return {stem:["A "+R+" Ω resistor is connected to "+V+" V. Find the current.",
                "ตัวต้านทาน "+R+" โอห์ม ต่อกับ "+V+" โวลต์ จงหากระแส"],
    opts:[{v:fmt(I),ok:1},{v:fmt(V*R)},{v:fmt(R/V)},{v:fmt(I*2)}],unit:" A"};
},
"M-02": function(sf){
  var V=pick([12,24]), R1=pick([2,4,10]), R2=pick([6,8,20]);
  var Rt=R1+R2, I=V/Rt, v1=I*R1;
  if(sf==="S-04") return {stem:["Two unequal resistors are in series. Which statement is true?",
                                "ตัวต้านทานสองตัวค่าไม่เท่ากันต่ออนุกรม ข้อใดถูกต้อง"],
    opts:[{v:["Same current, larger voltage across the larger resistor","กระแสเท่ากัน ความต่างศักย์มากกว่าที่ตัวใหญ่กว่า"],ok:1},
          {v:["Same voltage, larger current through the larger resistor","ความต่างศักย์เท่ากัน กระแสมากกว่าที่ตัวใหญ่กว่า"],trap:"T-03"},
          {v:["Same current and same voltage","กระแสและความต่างศักย์เท่ากัน"],trap:"T-03"},
          {v:["Larger current through the smaller resistor","กระแสมากกว่าที่ตัวเล็กกว่า"],trap:"T-03"}],unit:""};
  if(sf==="S-05") return {stem:[R1+" Ω and R₂ in series across "+V+" V draw "+fmt(I)+" A. Find R₂.",
                                R1+" โอห์ม กับ R₂ ต่ออนุกรมคร่อม "+V+" โวลต์ ได้กระแส "+fmt(I)+" แอมแปร์ จงหา R₂"],
    opts:[{v:String(R2),ok:1},{v:fmt(V/I),trap:"T-03"},{v:fmt(Rt*2)},{v:String(R1)}],unit:" Ω"};
  return {stem:[R1+" Ω and "+R2+" Ω are in series across "+V+" V. Find the voltage across the "+R1+" Ω resistor.",
                R1+" โอห์ม และ "+R2+" โอห์ม ต่ออนุกรมคร่อม "+V+" โวลต์ จงหาความต่างศักย์คร่อมตัว "+R1+" โอห์ม"],
    opts:[{v:fmt(v1),ok:1},{v:String(V),trap:"T-03"},{v:fmt(V/2)},{v:fmt(V-v1-1)}],unit:" V"};
},
"M-03": function(sf){
  var V=pick([12,24]), R1=pick([4,6,10]), R2=pick([12,20,30]);
  var Rt=1/(1/R1+1/R2), It=V/Rt, i1=V/R1;
  if(sf==="S-04") return {stem:["Another resistor is added in parallel with an existing one. The total resistance:",
                                "เพิ่มตัวต้านทานอีกตัวขนานกับตัวเดิม ความต้านทานรวมจะ"],
    opts:[{v:["Falls","ลดลง"],ok:1},{v:["Rises","เพิ่มขึ้น"],trap:"T-02"},
          {v:["Is unchanged","เท่าเดิม"]},{v:["Becomes the sum of the two","เท่ากับผลรวมของทั้งสอง"],trap:"T-02"}],unit:""};
  if(sf==="S-05") return {stem:["Two resistors in parallel give "+fmt(Rt)+" Ω, one of which is "+R1+" Ω. Find the other.",
                                "ตัวต้านทานสองตัวต่อขนานได้ "+fmt(Rt)+" โอห์ม ตัวหนึ่งคือ "+R1+" โอห์ม จงหาอีกตัว"],
    opts:[{v:String(R2),ok:1},{v:fmt(R1+Rt),trap:"T-02"},{v:fmt(Rt/2)},{v:fmt(R1*2)}],unit:" Ω"};
  return {stem:[R1+" Ω and "+R2+" Ω are in parallel. Find the total resistance.",
                R1+" โอห์ม และ "+R2+" โอห์ม ต่อขนานกัน จงหาความต้านทานรวม"],
    opts:[{v:fmt(Rt),ok:1},{v:String(R1+R2),trap:"T-02"},{v:fmt((R1+R2)/2),trap:"T-02"},{v:fmt(Rt*2)}],unit:" Ω"};
},
"M-04": function(sf){
  var V=pick([12,24,230]), R=pick([6,12,50]), t=pick([60,300,3600]);
  var P=V*V/R, W=P*t;
  if(sf==="S-04") return {stem:["Which expression for power is most useful when you know V and R but not I?",
                                "นิพจน์กำลังใดใช้สะดวกที่สุดเมื่อรู้ V และ R แต่ไม่รู้ I"],
    opts:[{v:"P = V²/R",ok:1},{v:"P = I²R"},{v:"P = IV"},{v:"P = IR"}],unit:""};
  if(sf==="S-05") return {stem:["A device uses "+fmt(W/3.6e6)+" kWh in "+t+" s. Find its power.",
                                "อุปกรณ์ใช้พลังงาน "+fmt(W/3.6e6)+" กิโลวัตต์-ชั่วโมง ใน "+t+" วินาที จงหากำลัง"],
    opts:[{v:fmt(P),ok:1},{v:fmt(W),trap:"T-03"},{v:fmt(P*t)},{v:fmt(P/2)}],unit:" W"};
  return {stem:["Find the power dissipated by a "+R+" Ω resistor across "+V+" V.",
                "จงหากำลังที่สูญเสียในตัวต้านทาน "+R+" โอห์ม คร่อม "+V+" โวลต์"],
    opts:[{v:fmt(P),ok:1},{v:fmt(V*R)},{v:fmt(V/R)},{v:fmt(P/2)}],unit:" W"};
},
"M-05": function(sf){
  var a=pick([2,3,5]), b=pick([1,4,6]);
  if(sf==="S-04") return {stem:["Why must the currents into a junction equal the currents out?",
                                "ทำไมกระแสที่เข้าจุดต่อจึงต้องเท่ากับกระแสที่ออก"],
    opts:[{v:["Charge is conserved — it cannot accumulate there","ประจุอนุรักษ์ มันสะสมที่นั่นไม่ได้"],ok:1},
          {v:["Energy is conserved","พลังงานอนุรักษ์"]},
          {v:["Resistance is the same everywhere","ความต้านทานเท่ากันทุกที่"]},
          {v:["Voltage is conserved","ความต่างศักย์อนุรักษ์"]}],unit:""};
  return {stem:["Currents of "+a+" A and "+b+" A flow into a junction, and one wire leaves it. Find the current leaving.",
                "กระแส "+a+" และ "+b+" แอมแปร์ ไหลเข้าจุดต่อ และมีสายออกหนึ่งเส้น จงหากระแสที่ออก"],
    opts:[{v:String(a+b),ok:1},{v:String(Math.abs(a-b))},{v:String(a),trap:"T-03"},{v:fmt((a+b)/2)}],unit:" A"};
},
"M-06": function(sf){
  var E=pick([9,12]), r=pick([0.5,1,2]), R=pick([4,5,10]);
  var I=E/(R+r), Vt=E-I*r;
  if(sf==="S-04") return {stem:["Why do a car's headlights dim while the starter motor turns?",
                                "ทำไมไฟหน้ารถจึงหรี่ลงขณะมอเตอร์สตาร์ททำงาน"],
    opts:[{v:["The large current drops more voltage across the internal resistance","กระแสมากทำให้ความต่างศักย์ตกคร่อมความต้านทานภายในมากขึ้น"],ok:1},
          {v:["The battery's emf falls","แรงเคลื่อนไฟฟ้าของแบตเตอรี่ลดลง"],trap:"T-04"},
          {v:["The bulbs heat up","หลอดร้อนขึ้น"]},
          {v:["The wires get longer","สายไฟยาวขึ้น"]}],unit:""};
  if(sf==="S-05") return {stem:["A cell of emf "+E+" V delivers "+fmt(I)+" A with terminal voltage "+fmt(Vt)+" V. Find its internal resistance.",
                                "เซลล์แรงเคลื่อน "+E+" โวลต์ จ่ายกระแส "+fmt(I)+" แอมแปร์ ความต่างศักย์ที่ขั้ว "+fmt(Vt)+" โวลต์ จงหาความต้านทานภายใน"],
    opts:[{v:String(r),ok:1},{v:fmt(Vt/I),trap:"T-04"},{v:fmt(E/I)},{v:fmt(r*2)}],unit:" Ω"};
  return {stem:["A cell of emf "+E+" V and internal resistance "+r+" Ω drives a "+R+" Ω load. Find the terminal voltage.",
                "เซลล์แรงเคลื่อน "+E+" โวลต์ ความต้านทานภายใน "+r+" โอห์ม จ่ายให้โหลด "+R+" โอห์ม จงหาความต่างศักย์ที่ขั้ว"],
    opts:[{v:fmt(Vt),ok:1},{v:String(E),trap:"T-04"},{v:fmt(I*r)},{v:fmt(E+I*r)}],unit:" V"};
}
}
};
