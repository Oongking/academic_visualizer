var CHAPTER = {
id:"ch08", num:"08", slug:"harmonic-motion", subject:"physics",
kicker:["Physics · Chapter 08","ฟิสิกส์ · บทที่ 8"],
title:["Harmonic Motion","การเคลื่อนที่ฮาร์มอนิก"],
mapTitle:["One condition, everything else follows","เงื่อนไขเดียว ที่เหลือตามมาเอง"],
lede:["Simple harmonic motion is defined by a single line: the acceleration is proportional to the displacement and points the other way. Every formula in this chapter is a consequence of that one statement.",
      "การเคลื่อนที่ฮาร์มอนิกอย่างง่ายนิยามด้วยบรรทัดเดียว คือความเร่งแปรผันตรงกับการกระจัดแต่ชี้ทิศตรงข้าม ทุกสูตรในบทนี้เป็นผลที่ตามมาจากประโยคนั้น"],
next:["→ continues in Chapter 09 · Waves","→ ต่อในบทที่ 9 · คลื่น"],

nodes:[
{ id:"definition", x:235, y:52, requires:[], methods:["M-01"],
  title:["The defining condition","เงื่อนไขนิยาม"],
  body:[["A motion is simple harmonic when a = −ω²x. The minus sign is the whole idea: the further the body strays, the harder it is pulled back, and always towards the centre.",
         "This is why a spring and a pendulum, which look nothing alike, obey the same equations. Any restoring force proportional to displacement produces the same sinusoidal motion."],
        ["การเคลื่อนที่เป็นฮาร์มอนิกอย่างง่ายเมื่อ a = −ω²x เครื่องหมายลบคือหัวใจทั้งหมด ยิ่งวัตถุออกห่างเท่าไร ยิ่งถูกดึงกลับแรงเท่านั้น และดึงเข้าหาศูนย์กลางเสมอ",
         "นี่คือเหตุผลที่สปริงกับลูกตุ้มซึ่งดูไม่เหมือนกันเลย กลับเป็นไปตามสมการเดียวกัน แรงดึงกลับใดที่แปรผันตรงกับการกระจัดจะให้การเคลื่อนที่แบบไซน์เหมือนกัน"]],
  formula:["a = −ω²x","a = −ω²x"],
  flabel:["The minus sign is the definition","เครื่องหมายลบคือนิยาม"],
  viz:"plot",
  vizcfg:{
    title:["THE TEST FOR SIMPLE HARMONIC MOTION","เกณฑ์ทดสอบการเคลื่อนที่ฮาร์มอนิกอย่างง่าย"],
    xlab:["displacement x (m)","การกระจัด x (m)"], ylab:["acceleration a (m/s²)","ความเร่ง a (m/s²)"],
    xmin:-4, xmax:4, fill:false,
    fn:function(x,p){ return p.shm===1 ? -p.w*p.w*x : -p.w*p.w*x*Math.abs(x)/2; },
    mark:function(p){ return p.x; },
    ctrls:[
      {k:"shm", lab:["1 true SHM · 0 not SHM","1 เป็น SHM · 0 ไม่เป็น"], min:0, max:1, step:1, def:1, unit:""},
      {k:"w",   lab:["Angular frequency ω","ความถี่เชิงมุม ω"], min:.5, max:3, step:.1, def:1.5, unit:" rad/s"},
      {k:"x",   lab:["Displacement","การกระจัด"], min:-3.5, max:3.5, step:.1, def:2, unit:" m"}
    ],
    readouts:[
      {lab:["Acceleration there","ความเร่ง ณ จุดนั้น"], f:function(S){
        var p=S.p; return fmt2(p.shm===1 ? -p.w*p.w*p.x : -p.w*p.w*p.x*Math.abs(p.x)/2)+" m/s²"; }},
      {lab:["Graph shape","รูปกราฟ"], f:function(S){
        return S.p.shm===1 ? (L()?"เส้นตรงผ่านจุดกำเนิด":"a straight line through the origin")
                           : (L()?"เส้นโค้ง — ไม่ใช่ SHM":"a curve — not SHM"); }},
      {lab:["Is it SHM?","เป็น SHM ไหม"], f:function(S){
        return S.p.shm===1 ? (L()?"ใช่ · a = −ω²x":"yes · a = −ω²x")
                           : (L()?"ไม่ · a ไม่แปรผันตรงกับ x":"no · a is not proportional to x"); }},
      {lab:["Period T","คาบ T"], f:function(S){ return fmt2(2*Math.PI/S.p.w)+" s"; }}
    ],
    note:["SHM is defined by a straight line of negative slope — nothing else qualifies","SHM นิยามด้วยเส้นตรงที่มีความชันเป็นลบ ไม่มีอย่างอื่นเข้าข่าย"]
  },
  guide:[
    {say:["A perfectly straight line sloping down through the origin. That line IS the definition of SHM.",
          "เส้นตรงสนิทลาดลงผ่านจุดกำเนิด เส้นนั้นคือนิยามของ SHM"], set:{shm:1,w:1.5,x:2}},
    {say:["Acceleration always points back towards zero — that is what the minus sign is saying.",
          "ความเร่งชี้กลับหาศูนย์เสมอ นั่นคือสิ่งที่เครื่องหมายลบกำลังบอก"], set:{shm:1,w:1.5,x:-3}},
    {say:["Now break the proportionality. Restoring force is still there, but the curve disqualifies it as SHM.",
          "ทีนี้ทำลายความเป็นสัดส่วน ยังมีแรงดึงกลับอยู่ แต่ความโค้งทำให้ไม่ใช่ SHM"], set:{shm:0,w:1.5,x:2}}
  ] },

{ id:"equations", x:235, y:150, requires:["definition"], methods:["M-02","M-05"],
  title:["Displacement, velocity, acceleration","การกระจัด ความเร็ว ความเร่ง"],
  body:[["Displacement follows x = A sin ωt, velocity is ωA cos ωt, and acceleration is −ω²A sin ωt. Each is the previous one differentiated, so each runs a quarter cycle ahead of the last.",
         "The consequence to internalise: velocity is greatest at the centre where displacement is zero, and acceleration is greatest at the extremes where velocity is zero. They are never large at the same moment."],
        ["การกระจัดเป็นไปตาม x = A sin ωt ความเร็วคือ ωA cos ωt และความเร่งคือ −ω²A sin ωt แต่ละตัวคือตัวก่อนหน้าที่ผ่านการหาอนุพันธ์ จึงนำหน้ากันอยู่หนึ่งในสี่รอบ",
         "ผลที่ต้องซึมซับคือ ความเร็วสูงสุดที่จุดกึ่งกลางซึ่งการกระจัดเป็นศูนย์ และความเร่งสูงสุดที่จุดปลายซึ่งความเร็วเป็นศูนย์ ทั้งสองไม่เคยมากพร้อมกัน"]],
  formula:["x = A sin ωt        v = ωA cos ωt        a = −ω²A sin ωt","x = A sin ωt        v = ωA cos ωt        a = −ω²A sin ωt"],
  flabel:["Each a quarter cycle apart","ห่างกันหนึ่งในสี่รอบ"],
  viz:{
    vb:"0 0 560 350", anim:true,
    ctrls:[
      {k:"A", lab:["Amplitude A","แอมพลิจูด A"], min:1, max:10, step:.5, def:6, unit:" m"},
      {k:"w", lab:["Angular speed ω","ความเร็วเชิงมุม ω"], min:.4, max:3, step:.1, def:1.2, unit:" rad/s"},
      {k:"T", lab:["Run for","เล่นนาน"], min:4, max:20, step:1, def:12, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Period T","คาบ T"],  f:function(S){ return fmt(2*Math.PI/S.p.w)+" s"; }},
      {lab:["Displacement x","การกระจัด x"], f:function(S){ return fmt(S.p.A*Math.sin(S.p.w*S.t))+" m"; }},
      {lab:["Velocity v","ความเร็ว v"],      f:function(S){ return fmt(S.p.w*S.p.A*Math.cos(S.p.w*S.t))+" m/s"; }},
      {lab:["Acceleration a","ความเร่ง a"],  f:function(S){ return fmt(-S.p.w*S.p.w*S.p.A*Math.sin(S.p.w*S.t))+" m/s²"; }}
    ],
    draw:function(S,o){
      var A=S.p.A, w=S.p.w, T=S.p.T, tt=Math.min(S.t,T);
      /* the oscillating mass, on its own little track with a scale */
      var TXx=58,TWw=462,TYy=52;
      o.push('<text x="'+TXx+'" y="20" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5" letter-spacing="1.4">'+tx(["OSCILLATOR","ตัวสั่น"])+'</text>');
      o.push('<text x="'+(TXx+TWw)+'" y="20" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="end">x (m)</text>');
      o.push('<line x1="'+TXx+'" y1="'+TYy+'" x2="'+(TXx+TWw)+'" y2="'+TYy+'" stroke="var(--rule)" stroke-width="2"/>');
      for(var k=0;k<=4;k++){
        var px=TXx+(TWw/4)*k, pv=-A+(A/2)*k;
        o.push('<line x1="'+px+'" y1="'+TYy+'" x2="'+px+'" y2="'+(TYy+7)+'" stroke="var(--ink-faint)" stroke-width="1"/>');
        o.push('<text x="'+px+'" y="'+(TYy+21)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">'+tk(pv)+'</text>');
      }
      var xnow=A*Math.sin(w*tt);
      var cx=TXx+TWw/2+(xnow/A)*(TWw/2);
      /* a spring drawn as a zigzag from the left wall to the mass */
      var zz="M"+TXx+" "+(TYy-9);
      for(var z=1;z<=12;z++){
        var zx=TXx+(cx-13-TXx)*z/12;
        zz+=" L"+zx+" "+(TYy-9+(z%2?-7:7));
      }
      o.push('<path d="'+zz+'" stroke="var(--ink-faint)" stroke-width="1.4" fill="none"/>');
      o.push('<rect x="'+(cx-13)+'" y="'+(TYy-19)+'" width="26" height="20" fill="var(--accent)"/>');
      o.push('<line x1="'+(TXx+TWw/2)+'" y1="'+(TYy-26)+'" x2="'+(TXx+TWw/2)+'" y2="'+(TYy+4)+'" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="2 3"/>');
      /* the three traces on one scaled axis */
      var lim=Math.max(A, w*A, w*w*A)*1.15;
      var G=axes(o,{x:58,y:150,w:462,h:160,xmin:0,xmax:T,ymin:-lim,ymax:lim,
                    title:["x, v, a  vs  TIME","x, v, a  เทียบ  เวลา"],xlab:"t (s)",ylab:"x · v · a"});
      function trace(f,col,wd,dash){
        var d="";
        for(var i=0;i<=200;i++){ var t=T*i/200; d+=(i?" L":"M")+G.X(t)+" "+G.Y(f(t)); }
        o.push('<path d="'+d+'" stroke="'+col+'" stroke-width="'+wd+'" fill="none"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>');
      }
      trace(function(t){ return -w*w*A*Math.sin(w*t); },"var(--ink-faint)",1.4,"2 3");
      trace(function(t){ return w*A*Math.cos(w*t); },"var(--ink-soft)",1.6,"5 3");
      trace(function(t){ return A*Math.sin(w*t); },"var(--accent)",2.5,null);
      o.push('<line x1="'+G.X(tt)+'" y1="150" x2="'+G.X(tt)+'" y2="310" stroke="var(--accent)" stroke-width="1" stroke-dasharray="2 3" opacity=".7"/>');
      o.push('<circle cx="'+G.X(tt)+'" cy="'+G.Y(xnow)+'" r="4.5" fill="var(--accent)"/>');
      o.push('<text x="58" y="336" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">— x    – – v    ·· a</text>');
    }
  },
  guide:[
    {say:["Press Play. The block oscillates and the solid red trace records its displacement.",
          "กดเล่น กล่องจะแกว่งและเส้นทึบสีแดงบันทึกการกระจัดของมัน"], set:{A:6,w:1.2,T:12}},
    {say:["When the block is at the centre the red trace crosses zero — and the dashed velocity trace is at its peak.",
          "เมื่อกล่องอยู่กึ่งกลาง เส้นแดงตัดศูนย์ และเส้นประความเร็วอยู่ที่จุดสูงสุดพอดี"], set:{A:6,w:1.2,T:12}},
    {say:["At the extremes the velocity trace crosses zero while the dotted acceleration trace peaks. Never both at once.",
          "ที่จุดปลาย เส้นความเร็วตัดศูนย์ขณะที่เส้นจุดความเร่งขึ้นสูงสุด ไม่เคยมากพร้อมกัน"], set:{A:8,w:1.2,T:12}},
    {say:["Raise ω. The period shrinks and the acceleration trace grows fast — a depends on ω squared.",
          "เพิ่ม ω คาบจะสั้นลงและเส้นความเร่งโตเร็วมาก เพราะ a ขึ้นกับ ω กำลังสอง"], set:{A:6,w:2.4,T:12}}
  ]},

{ id:"spring", x:100, y:248, requires:["equations"], methods:["M-03"],
  title:["Mass on a spring","มวลติดสปริง"],
  body:[["A spring obeying F = −kx gives ω = √(k/m), so the period is T = 2π√(m/k). A stiffer spring oscillates faster; a heavier mass oscillates slower.",
         "Notice what is absent: amplitude. Pull the mass twice as far and it still takes exactly the same time to return. That independence is what makes oscillators useful as clocks."],
        ["สปริงที่เป็นไปตาม F = −kx ให้ ω = √(k/m) ดังนั้นคาบคือ T = 2π√(m/k) สปริงที่แข็งกว่าแกว่งเร็วกว่า มวลที่หนักกว่าแกว่งช้ากว่า",
         "สังเกตสิ่งที่หายไปคือแอมพลิจูด ดึงมวลออกไปไกลเป็นสองเท่า มันก็ยังใช้เวลากลับเท่าเดิมพอดี ความเป็นอิสระนี้เองที่ทำให้ตัวแกว่งใช้เป็นนาฬิกาได้"]],
  formula:["ω = √(k/m)        T = 2π√(m/k)","ω = √(k/m)        T = 2π√(m/k)"],
  flabel:["Independent of amplitude","ไม่ขึ้นกับแอมพลิจูด"],
  viz:"plot",
  vizcfg:{
    title:["PERIOD AGAINST MASS ON A SPRING","คาบ เทียบ มวลบนสปริง"],
    xlab:["mass (kg)","มวล (kg)"], ylab:["period T (s)","คาบ T (s)"],
    xmin:0.1, xmax:8, ymin:0, fill:false,
    fn:function(x,p){ return 2*Math.PI*Math.sqrt(x/p.k); },
    mark:function(p){ return p.m; },
    ctrls:[
      {k:"k", lab:["Spring constant k","ค่านิจสปริง k"], min:5, max:120, step:5, def:40, unit:" N/m"},
      {k:"m", lab:["Mass","มวล"], min:.2, max:7.5, step:.1, def:2, unit:" kg"}
    ],
    readouts:[
      {lab:["Period T","คาบ T"], f:function(S){ return fmt2(2*Math.PI*Math.sqrt(S.p.m/S.p.k))+" s"; }},
      {lab:["Frequency f","ความถี่ f"], f:function(S){
        return fmt2(1/(2*Math.PI*Math.sqrt(S.p.m/S.p.k)))+" Hz"; }},
      {lab:["Four times the mass?","มวลสี่เท่า?"], f:function(){
        return L()?"คาบเป็นสองเท่า ไม่ใช่สี่เท่า":"the period doubles, not quadruples"; }},
      {lab:["Does amplitude matter?","แอมพลิจูดมีผลไหม"], f:function(){
        return L()?"ไม่ — คาบไม่ขึ้นกับแอมพลิจูด":"no — the period is independent of amplitude"; }}
    ],
    note:["the curve is a square root, so mass has a weaker grip on the period than it looks","เส้นโค้งเป็นรากที่สอง มวลจึงมีอิทธิพลต่อคาบน้อยกว่าที่คิด"]
  } },

{ id:"pendulum", x:370, y:248, requires:["equations"], methods:["M-04"],
  title:["The simple pendulum","ลูกตุ้มอย่างง่าย"],
  body:[["For small swings the pendulum gives ω = √(g/l), so T = 2π√(l/g). Only the length and the local gravity matter.",
         "The mass of the bob cancels out entirely, which surprises almost everyone the first time. And the small-angle condition is real: beyond roughly 15° the motion stops being simple harmonic."],
        ["สำหรับการแกว่งมุมเล็ก ลูกตุ้มให้ ω = √(g/l) ดังนั้น T = 2π√(l/g) มีเพียงความยาวและค่าโน้มถ่วงในท้องถิ่นเท่านั้นที่มีผล",
         "มวลของลูกตุ้มตัดหายไปหมด ซึ่งทำให้เกือบทุกคนแปลกใจในครั้งแรก และเงื่อนไขมุมเล็กเป็นเรื่องจริง เกินราว 15° การเคลื่อนที่จะไม่เป็นฮาร์มอนิกอย่างง่ายอีกต่อไป"]],
  formula:["T = 2π√(l/g)","T = 2π√(l/g)"],
  flabel:["Bob mass cancels · small angles only","มวลลูกตุ้มตัดหาย · เฉพาะมุมเล็ก"],
  viz:"plot",
  vizcfg:{
    title:["PERIOD AGAINST PENDULUM LENGTH","คาบ เทียบ ความยาวลูกตุ้ม"],
    xlab:["length (m)","ความยาว (m)"], ylab:["period T (s)","คาบ T (s)"],
    xmin:0.05, xmax:4, ymin:0, fill:false,
    fn:function(x,p){ return 2*Math.PI*Math.sqrt(x/p.g); },
    mark:function(p){ return p.Lp; },
    ctrls:[
      {k:"Lp", lab:["Length","ความยาว"], min:.1, max:3.8, step:.05, def:1, unit:" m"},
      {k:"g",  lab:["Gravity g","ความโน้มถ่วง g"], min:1.6, max:25, step:.2, def:9.8, unit:" m/s²"},
      {k:"mb", lab:["Bob mass (a decoy)","มวลลูกตุ้ม (ตัวลวง)"], min:.1, max:5, step:.1, def:1, unit:" kg"}
    ],
    readouts:[
      {lab:["Period T","คาบ T"], f:function(S){ return fmt2(2*Math.PI*Math.sqrt(S.p.Lp/S.p.g))+" s"; }},
      {lab:["Effect of the bob mass","ผลของมวลลูกตุ้ม"], f:function(){
        return L()?"ไม่มีเลย — มวลไม่อยู่ในสูตร":"none at all — mass is absent from the formula"; }},
      {lab:["On the Moon (g = 1.6)","บนดวงจันทร์ (g = 1.6)"], f:function(S){
        return fmt2(2*Math.PI*Math.sqrt(S.p.Lp/1.6))+" s"; }},
      {lab:["Four times the length?","ความยาวสี่เท่า?"], f:function(){
        return L()?"คาบเป็นสองเท่า":"the period doubles"; }}
    ],
    note:["drag the bob-mass slider as much as you like — the curve will not move","ลากแถบมวลลูกตุ้มเท่าไรก็ได้ เส้นโค้งจะไม่ขยับเลย"]
  },
  guide:[
    {say:["A one-metre pendulum on Earth beats at almost exactly two seconds. That is not a coincidence of history.",
          "ลูกตุ้มยาวหนึ่งเมตรบนโลกแกว่งครบรอบในเวลาเกือบสองวินาทีพอดี นั่นไม่ใช่เรื่องบังเอิญทางประวัติศาสตร์"], set:{Lp:1,g:9.8,mb:1}},
    {say:["Now drag the bob mass across its whole range. Nothing happens — mass is simply not in the formula.",
          "ทีนี้ลากมวลลูกตุ้มตลอดช่วง ไม่มีอะไรเกิดขึ้น เพราะมวลไม่ได้อยู่ในสูตรเลย"], set:{Lp:1,g:9.8,mb:5}},
    {say:["Take the same pendulum to the Moon and it slows right down. Gravity, not mass, sets the beat.",
          "เอาลูกตุ้มอันเดิมไปดวงจันทร์แล้วมันช้าลงมาก ความโน้มถ่วงต่างหากที่กำหนดจังหวะ ไม่ใช่มวล"], set:{Lp:1,g:1.6,mb:1}}
  ] },

{ id:"energy", x:235, y:346, requires:["spring","pendulum"], methods:["M-06"],
  title:["Energy in oscillation","พลังงานในการแกว่ง"],
  body:[["The total energy is ½kA², fixed by the amplitude alone. It moves back and forth between kinetic and potential twice every cycle, but the sum never changes.",
         "All kinetic at the centre, all potential at the extremes. Because energy goes as A², doubling the amplitude quadruples the energy while leaving the period untouched."],
        ["พลังงานรวมคือ ½kA² ถูกกำหนดด้วยแอมพลิจูดเพียงอย่างเดียว มันสลับไปมาระหว่างพลังงานจลน์กับศักย์สองครั้งต่อรอบ แต่ผลรวมไม่เคยเปลี่ยน",
         "เป็นพลังงานจลน์ล้วนที่จุดกึ่งกลาง และศักย์ล้วนที่จุดปลาย เพราะพลังงานแปรตาม A² การเพิ่มแอมพลิจูดสองเท่าทำให้พลังงานเป็นสี่เท่าโดยที่คาบไม่เปลี่ยนเลย"]],
  formula:["E = ½kA² = ½mω²A²","E = ½kA² = ½mω²A²"],
  flabel:["Set by amplitude alone","กำหนดด้วยแอมพลิจูดเท่านั้น"],
  viz:"stack",
  vizcfg:{
    title:["ENERGY SLOSHES BACK AND FORTH","พลังงานสวิงไปมา"],
    total:["total energy","พลังงานรวม"],
    ctrls:[
      {k:"A", lab:["Amplitude A","แอมพลิจูด A"], min:.5, max:5, step:.1, def:3, unit:" m"},
      {k:"x", lab:["Displacement now","การกระจัดขณะนี้"], min:-5, max:5, step:.1, def:0, unit:" m"},
      {k:"k", lab:["Spring constant k","ค่านิจสปริง k"], min:5, max:60, step:1, def:20, unit:" N/m"}
    ],
    readouts:[
      {lab:["Potential ½kx²","ศักย์ ½kx²"], f:function(S){
        var x=Math.max(-S.p.A,Math.min(S.p.A,S.p.x));
        return fmt2(0.5*S.p.k*x*x)+" J"; }},
      {lab:["Kinetic","จลน์"], f:function(S){
        var x=Math.max(-S.p.A,Math.min(S.p.A,S.p.x));
        return fmt2(0.5*S.p.k*(S.p.A*S.p.A-x*x))+" J"; }},
      {lab:["Total ½kA²","รวม ½kA²"], f:function(S){ return fmt2(0.5*S.p.k*S.p.A*S.p.A)+" J"; }},
      {lab:["Where is speed greatest?","อัตราเร็วสูงสุดที่ใด"], f:function(){
        return L()?"ที่ x = 0 ตรงกลางพอดี":"at x = 0, right in the middle"; }}
    ],
    parts:function(p){
      var x=Math.max(-p.A,Math.min(p.A,p.x));
      return [{v:0.5*p.k*x*x, lab:["potential","ศักย์"], col:"good"},
              {v:0.5*p.k*(p.A*p.A-x*x), lab:["kinetic","จลน์"], col:"accent"}];
    },
    note:["at the ends all potential, at the centre all kinetic, and the total never moves","ที่ปลายเป็นศักย์ทั้งหมด ที่กลางเป็นจลน์ทั้งหมด และผลรวมไม่เคยเปลี่ยน"]
  },
  guide:[
    {say:["At the centre the bar is entirely kinetic. The mass is moving fastest here and the spring is relaxed.",
          "ที่จุดกึ่งกลาง แถบเป็นพลังงานจลน์ทั้งหมด มวลเคลื่อนที่เร็วที่สุดตรงนี้และสปริงคลายตัว"], set:{A:3,x:0,k:20}},
    {say:["Halfway out, the split is uneven — potential grows as the square, so it lags behind at first.",
          "ออกไปครึ่งทาง สัดส่วนไม่เท่ากัน พลังงานศักย์โตแบบกำลังสอง ช่วงแรกจึงตามหลังอยู่"], set:{A:3,x:1.5,k:20}},
    {say:["At full amplitude it is all potential and the mass is momentarily at rest before turning back.",
          "ที่แอมพลิจูดสูงสุด เป็นศักย์ทั้งหมดและมวลหยุดนิ่งชั่วขณะก่อนย้อนกลับ"], set:{A:3,x:3,k:20}}
  ] }
],

methods:[
{id:"M-01", name:["Recognise SHM from a ∝ −x","ระบุ SHM จาก a ∝ −x"]},
{id:"M-02", name:["Use the x, v, a equations","ใช้สมการ x, v, a"]},
{id:"M-03", name:["Period of a mass on a spring","คาบของมวลติดสปริง"]},
{id:"M-04", name:["Period of a simple pendulum","คาบของลูกตุ้มอย่างง่าย"]},
{id:"M-05", name:["Find v from amplitude and displacement","หา v จากแอมพลิจูดและการกระจัด"]},
{id:"M-06", name:["Energy of an oscillator","พลังงานของตัวแกว่ง"]}
],

traps:{
"T-01":["Period does not depend on amplitude. Pulling it further does not make it slower.","คาบไม่ขึ้นกับแอมพลิจูด ดึงออกไปไกลกว่าไม่ได้ทำให้ช้าลง"],
"T-02":["Velocity peaks at the centre, acceleration at the extremes. They are never maximum together.","ความเร็วสูงสุดที่กึ่งกลาง ความเร่งสูงสุดที่ปลาย ไม่เคยสูงสุดพร้อมกัน"],
"T-03":["The pendulum bob's mass cancels out. Only length and g decide the period.","มวลลูกตุ้มตัดหายไป มีเพียงความยาวและ g ที่กำหนดคาบ"],
"T-04":["The square root was dropped, or m and k were the wrong way up inside it.","ลืมถอดรากที่สอง หรือสลับ m กับ k ในรากที่สอง"]
},

gen:{
"M-01": function(sf){
  var C=[{s:["Which relation defines simple harmonic motion?","ความสัมพันธ์ใดนิยามการเคลื่อนที่ฮาร์มอนิกอย่างง่าย"],
          ok:["a = −ω²x","a = −ω²x"], w:[["a = ω²x","a = ω²x"],["v = −ωx","v = −ωx"],["a = −ωx","a = −ωx"]]},
         {s:["Why is the minus sign in a = −ω²x essential?","ทำไมเครื่องหมายลบใน a = −ω²x จึงสำคัญ"],
          ok:["It makes the acceleration point back towards the centre","มันทำให้ความเร่งชี้กลับเข้าหาจุดกึ่งกลาง"],
          w:[["It makes the motion slow down","มันทำให้การเคลื่อนที่ช้าลง"],
             ["It keeps the amplitude negative","มันทำให้แอมพลิจูดเป็นลบ"],
             ["It is only a sign convention","เป็นเพียงข้อตกลงเรื่องเครื่องหมาย"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
},
"M-02": function(sf){
  var A=pick([2,4,5,8]), w=pick([2,3,4,5]);
  if(sf==="S-04") return {stem:["Where in the cycle is the acceleration greatest?","ความเร่งสูงสุดที่ตำแหน่งใดของรอบ"],
    opts:[{v:["At the extremes of the motion","ที่จุดปลายของการเคลื่อนที่"],ok:1},
          {v:["At the centre","ที่จุดกึ่งกลาง"],trap:"T-02"},
          {v:["Everywhere equally","ทุกจุดเท่ากัน"]},
          {v:["Where the velocity is greatest","ที่ความเร็วสูงสุด"],trap:"T-02"}],unit:""};
  if(sf==="S-05") return {stem:["An oscillator has maximum velocity "+fmt(w*A)+" m/s and amplitude "+A+" m. Find ω.",
                                "ตัวแกว่งมีความเร็วสูงสุด "+fmt(w*A)+" ม./วินาที และแอมพลิจูด "+A+" เมตร จงหา ω"],
    opts:[{v:String(w),ok:1},{v:fmt(w*A*A)},{v:fmt(A/w)},{v:fmt(w*2)}],unit:" rad/s"};
  return {stem:["An oscillator has amplitude "+A+" m and ω = "+w+" rad/s. Find its maximum velocity.",
                "ตัวแกว่งมีแอมพลิจูด "+A+" เมตร และ ω = "+w+" เรเดียน/วินาที จงหาความเร็วสูงสุด"],
    opts:[{v:String(w*A),ok:1},{v:String(w*w*A),trap:"T-02"},{v:String(A/w)},{v:String(A)}],unit:" m/s"};
},
"M-03": function(sf){
  var m=pick([0.2,0.5,1,2]), k=pick([20,50,80,200]);
  var T=2*Math.PI*Math.sqrt(m/k);
  if(sf==="S-04") return {stem:["A mass on a spring is pulled twice as far and released. What happens to the period?",
                                "ดึงมวลติดสปริงออกไปไกลเป็นสองเท่าแล้วปล่อย คาบเปลี่ยนอย่างไร"],
    opts:[{v:["Nothing — period is independent of amplitude","ไม่เปลี่ยน คาบไม่ขึ้นกับแอมพลิจูด"],ok:1},
          {v:["It doubles","เพิ่มเป็นสองเท่า"],trap:"T-01"},
          {v:["It halves","ลดลงครึ่งหนึ่ง"],trap:"T-01"},
          {v:["It quadruples","เพิ่มเป็นสี่เท่า"],trap:"T-01"}],unit:""};
  if(sf==="S-05") return {stem:["A "+m+" kg mass on a spring oscillates with period "+fmt(T)+" s. Find the spring constant.",
                                "มวล "+m+" กิโลกรัม ติดสปริงแกว่งด้วยคาบ "+fmt(T)+" วินาที จงหาค่านิจสปริง"],
    opts:[{v:String(k),ok:1},{v:fmt(m/T),trap:"T-04"},{v:fmt(T*T*m)},{v:fmt(k/2)}],unit:" N/m"};
  return {stem:["Find the period of a "+m+" kg mass on a spring of stiffness "+k+" N/m.",
                "จงหาคาบของมวล "+m+" กิโลกรัม ติดสปริงค่านิจ "+k+" นิวตัน/เมตร"],
    opts:[{v:fmt(T),ok:1},{v:fmt(2*Math.PI*Math.sqrt(k/m)),trap:"T-04"},{v:fmt(m/k),trap:"T-04"},{v:fmt(T*2)}],unit:" s"};
},
"M-04": function(sf){
  var l=pick([0.25,0.5,1,2.5]), g=10;
  var T=2*Math.PI*Math.sqrt(l/g);
  if(sf==="S-04") return {stem:["Two pendulums have the same length but different bob masses. Compare their periods.",
                                "ลูกตุ้มสองอันยาวเท่ากันแต่มวลต่างกัน คาบเป็นอย่างไร"],
    opts:[{v:["Identical — mass cancels out","เท่ากัน เพราะมวลตัดหายไป"],ok:1},
          {v:["The heavier swings slower","อันที่หนักกว่าแกว่งช้ากว่า"],trap:"T-03"},
          {v:["The lighter swings slower","อันที่เบากว่าแกว่งช้ากว่า"],trap:"T-03"},
          {v:["It depends on the amplitude","ขึ้นกับแอมพลิจูด"],trap:"T-01"}],unit:""};
  if(sf==="S-05") return {stem:["A pendulum has period "+fmt(T)+" s where g = 10 m/s². Find its length.",
                                "ลูกตุ้มมีคาบ "+fmt(T)+" วินาที ที่ g = 10 ม./วินาที² จงหาความยาว"],
    opts:[{v:String(l),ok:1},{v:fmt(T*T*g),trap:"T-04"},{v:fmt(T/g)},{v:fmt(l*2)}],unit:" m"};
  return {stem:["Find the period of a simple pendulum of length "+l+" m, taking g = 10 m/s².",
                "จงหาคาบของลูกตุ้มอย่างง่ายยาว "+l+" เมตร ให้ g = 10 ม./วินาที²"],
    opts:[{v:fmt(T),ok:1},{v:fmt(2*Math.PI*Math.sqrt(g/l)),trap:"T-04"},{v:fmt(l/g)},{v:fmt(T/2)}],unit:" s"};
},
"M-05": function(sf){
  var A=pick([4,5,8,10]), w=pick([2,3,4]), x=pick([2,3]);
  var v=w*Math.sqrt(A*A-x*x);
  if(sf==="S-04") return {stem:["At what displacement is the speed of an oscillator greatest?",
                                "ที่การกระจัดเท่าใดที่ตัวแกว่งมีอัตราเร็วสูงสุด"],
    opts:[{v:["x = 0, at the centre","x = 0 ที่จุดกึ่งกลาง"],ok:1},
          {v:["x = A, at the extreme","x = A ที่จุดปลาย"],trap:"T-02"},
          {v:["x = A/2","x = A/2"]},{v:["Speed is constant","อัตราเร็วคงที่"]}],unit:""};
  return {stem:["An oscillator has A = "+A+" m and ω = "+w+" rad/s. Find its speed at x = "+x+" m.",
                "ตัวแกว่งมี A = "+A+" เมตร และ ω = "+w+" เรเดียน/วินาที จงหาอัตราเร็วที่ x = "+x+" เมตร"],
    opts:[{v:fmt(v),ok:1},{v:String(w*A),trap:"T-02"},{v:fmt(w*(A-x))},{v:fmt(w*x)}],unit:" m/s"};
},
"M-06": function(sf){
  var k=pick([50,100,200,400]), A=pick([0.1,0.2,0.5]);
  var E=0.5*k*A*A;
  if(sf==="S-04") return {stem:["The amplitude of an oscillator is doubled. What happens to its total energy?",
                                "แอมพลิจูดของตัวแกว่งเพิ่มเป็นสองเท่า พลังงานรวมเปลี่ยนอย่างไร"],
    opts:[{v:["It becomes four times as large","เพิ่มเป็นสี่เท่า"],ok:1},
          {v:["It doubles","เพิ่มเป็นสองเท่า"],trap:"T-01"},
          {v:["It is unchanged","เท่าเดิม"]},{v:["It halves","ลดลงครึ่งหนึ่ง"]}],unit:""};
  if(sf==="S-03") return {stem:["Where in the cycle is an oscillator's energy entirely kinetic?",
                                "ที่ตำแหน่งใดของรอบที่พลังงานของตัวแกว่งเป็นพลังงานจลน์ทั้งหมด"],
    opts:[{v:["At the centre, x = 0","ที่จุดกึ่งกลาง x = 0"],ok:1},
          {v:["At the extremes, x = ±A","ที่จุดปลาย x = ±A"],trap:"T-02"},
          {v:["Halfway out","ที่กึ่งกลางระหว่างทาง"]},{v:["Nowhere","ไม่มีจุดใด"]}],unit:""};
  return {stem:["Find the total energy of an oscillator with k = "+k+" N/m and amplitude "+A+" m.",
                "จงหาพลังงานรวมของตัวแกว่งที่มี k = "+k+" นิวตัน/เมตร และแอมพลิจูด "+A+" เมตร"],
    opts:[{v:fmt(E),ok:1},{v:fmt(k*A*A),trap:"T-01"},{v:fmt(0.5*k*A)},{v:fmt(k*A)}],unit:" J"};
}
}
};
