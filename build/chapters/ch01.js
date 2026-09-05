var CHAPTER = {
id:"ch01", num:"01", slug:"measurement", subject:"physics",
kicker:["Physics · Chapter 01","ฟิสิกส์ · บทที่ 1"],
title:["Measurement","การวัด"],
mapTitle:["Before any physics, a language","ก่อนจะมีฟิสิกส์ ต้องมีภาษา"],
lede:["Every later chapter reports a number. This one decides what a number is allowed to mean — which units it wears, how many of its digits are real, and how much of it is doubt.",
      "ทุกบทหลังจากนี้ล้วนรายงานเป็นตัวเลข บทนี้จึงกำหนดว่าตัวเลขหนึ่งมีความหมายได้แค่ไหน สวมหน่วยอะไร มีกี่หลักที่เชื่อถือได้ และมีความไม่แน่นอนเท่าใด"],
next:["→ continues in Chapter 02 · Linear Motion","→ ต่อในบทที่ 2 · การเคลื่อนที่แนวตรง"],

nodes:[
{ id:"si", x:235, y:52, requires:[], methods:[],
  title:["SI base quantities","ปริมาณฐาน SI"],
  body:[["Seven quantities are defined rather than derived: length (m), mass (kg), time (s), temperature (K), electric current (A), amount of substance (mol), and luminous intensity (cd). Everything else in physics is built from these.",
         "Physics is unusual in that its vocabulary is finite and agreed. If a quantity cannot be written in these seven, it is not a physical quantity."],
        ["มีเจ็ดปริมาณที่ถูก \"นิยาม\" ไม่ใช่ \"อนุมาน\" ได้แก่ ความยาว (m) มวล (kg) เวลา (s) อุณหภูมิ (K) กระแสไฟฟ้า (A) ปริมาณสาร (mol) และความเข้มการส่องสว่าง (cd) ทุกอย่างที่เหลือในฟิสิกส์สร้างขึ้นจากเจ็ดตัวนี้",
         "ฟิสิกส์แปลกตรงที่คำศัพท์มีจำกัดและตกลงกันไว้แล้ว ถ้าปริมาณใดเขียนด้วยเจ็ดตัวนี้ไม่ได้ ปริมาณนั้นก็ไม่ใช่ปริมาณทางฟิสิกส์"]],
  formula:["m · kg · s · K · A · mol · cd","m · kg · s · K · A · mol · cd"],
  flabel:["Seven, and only seven","เจ็ด และมีเพียงเจ็ด"],
  viz:"grid",
  vizcfg:{
    title:["THE SEVEN BASE QUANTITIES","ปริมาณฐานทั้งเจ็ด"],
    cols:[["Quantity","ปริมาณ"],["Symbol","สัญลักษณ์"],["Unit","หน่วย"],["Unit symbol","สัญลักษณ์หน่วย"]],
    ctrls:[{k:"i", lab:["Highlight row","เน้นแถวที่"], min:0, max:6, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Selected","ที่เลือก"], f:function(S){
        var N=[["Length","ความยาว"],["Mass","มวล"],["Time","เวลา"],["Current","กระแสไฟฟ้า"],
               ["Temperature","อุณหภูมิ"],["Amount","ปริมาณสาร"],["Luminous intensity","ความเข้มการส่องสว่าง"]];
        return N[S.p.i][L()]; }},
      {lab:["Base quantities","จำนวนปริมาณฐาน"], f:function(){ return "7"; }}
    ],
    rows:function(p){
      var R=[[["Length","ความยาว"],"l","metre","m"],
             [["Mass","มวล"],"m","kilogram","kg"],
             [["Time","เวลา"],"t","second","s"],
             [["Current","กระแสไฟฟ้า"],"I","ampere","A"],
             [["Temperature","อุณหภูมิ"],"T","kelvin","K"],
             [["Amount","ปริมาณสาร"],"n","mole","mol"],
             [["Luminous","ความเข้มแสง"],"Iv","candela","cd"]];
      return R.map(function(r,i){
        return r.map(function(c){ return {v:c, on:i===p.i}; });
      });
    },
    note:["every other unit in physics is built from these seven","หน่วยอื่นทุกหน่วยในฟิสิกส์สร้างขึ้นจากเจ็ดตัวนี้"]
  } },

{ id:"derived", x:100, y:150, requires:["si"], methods:["M-06"],
  title:["Derived units","หน่วยอนุพันธ์"],
  body:[["A derived unit is just base units multiplied and divided. Velocity is m/s because it is displacement over time; force is kg·m/s² because it is mass times acceleration. The newton is a nickname, not a new idea.",
         "This gives you a free error check. Work out the units of both sides of any equation you write — if they disagree, the equation is wrong, and you have caught it before substituting a single number."],
        ["หน่วยอนุพันธ์คือหน่วยฐานที่นำมาคูณหารกัน ความเร็วมีหน่วย m/s เพราะเป็นการกระจัดต่อเวลา แรงมีหน่วย kg·m/s² เพราะเป็นมวลคูณความเร่ง คำว่านิวตันเป็นเพียงชื่อเล่น ไม่ใช่แนวคิดใหม่",
         "สิ่งนี้ให้เครื่องมือตรวจสอบฟรี ลองหาหน่วยของทั้งสองข้างในสมการที่เขียน ถ้าไม่ตรงกันแสดงว่าสมการผิด และคุณจับได้ก่อนแทนตัวเลขแม้แต่ตัวเดียว"]],
  formula:["N = kg·m/s²    J = N·m    W = J/s","N = kg·m/s²    J = N·m    W = J/s"],
  flabel:["Nicknames for combinations of the seven","ชื่อเล่นของการรวมกันของเจ็ดหน่วยฐาน"],
  viz:"grid",
  vizcfg:{
    title:["DERIVED UNITS, BROKEN BACK DOWN","หน่วยอนุพัทธ์ แตกกลับเป็นหน่วยฐาน"],
    cols:[["Quantity","ปริมาณ"],["Named unit","ชื่อหน่วย"],["In base units","ในรูปหน่วยฐาน"]],
    ctrls:[{k:"i", lab:["Highlight row","เน้นแถวที่"], min:0, max:5, step:1, def:1, unit:""}],
    readouts:[
      {lab:["Base units used","หน่วยฐานที่ใช้"], f:function(S){
        return ["m","kg m s^-2","kg m^2 s^-2","kg m^2 s^-3","kg m^-1 s^-2","s^-1"][S.p.i]; }},
      {lab:["Named after a person?","ตั้งชื่อตามบุคคล?"], f:function(S){
        var yes=[0,1,1,1,1,1][S.p.i];
        return yes ? (L()?"ใช่ — จึงขึ้นต้นด้วยตัวใหญ่":"yes — so the symbol is capitalised")
                   : (L()?"ไม่ใช่":"no"); }}
    ],
    rows:function(p){
      var R=[[["Area","พื้นที่"],"m²","m × m"],
             [["Force","แรง"],"newton (N)","kg m s⁻²"],
             [["Energy","พลังงาน"],"joule (J)","kg m² s⁻²"],
             [["Power","กำลัง"],"watt (W)","kg m² s⁻³"],
             [["Pressure","ความดัน"],"pascal (Pa)","kg m⁻¹ s⁻²"],
             [["Frequency","ความถี่"],"hertz (Hz)","s⁻¹"]];
      return R.map(function(r,i){ return r.map(function(c){ return {v:c, on:i===p.i}; }); });
    },
    note:["a newton is not a new idea — it is kg m s⁻² wearing a shorter name","นิวตันไม่ใช่แนวคิดใหม่ แต่คือ kg m s⁻² ที่สวมชื่อสั้นกว่า"]
  } },

{ id:"prefixes", x:370, y:150, requires:["si"], methods:["M-01","M-02"],
  title:["Prefixes and notation","คำอุปสรรคและสัญกรณ์"],
  body:[["A prefix is a power of ten wearing a name. Kilo is 10³, milli is 10⁻³, nano is 10⁻⁹. Scientific notation writes the same idea as A × 10ⁿ with 1 ≤ |A| < 10.",
         "Drive the scale below. The single most common error in this chapter is applying a prefix backwards — dividing when you should multiply — so watch which way the value moves as you slide."],
        ["คำอุปสรรคคือเลขยกกำลังสิบที่สวมชื่อไว้ กิโลคือ 10³ มิลลิคือ 10⁻³ นาโนคือ 10⁻⁹ ส่วนสัญกรณ์วิทยาศาสตร์เขียนความคิดเดียวกันในรูป A × 10ⁿ โดย 1 ≤ |A| < 10",
         "ลองเลื่อนสเกลด้านล่าง ข้อผิดพลาดที่พบบ่อยที่สุดในบทนี้คือใช้คำอุปสรรคกลับทาง หารทั้งที่ควรคูณ ให้สังเกตว่าค่าขยับไปทางไหนขณะเลื่อน"]],
  formula:["A × 10ⁿ ,  1 ≤ |A| < 10","A × 10ⁿ ,  1 ≤ |A| < 10"],
  flabel:["Scientific notation","สัญกรณ์วิทยาศาสตร์"],
  viz:{
    vb:"0 0 560 250", anim:false,
    ctrls:[
      {k:"e", lab:["Power of ten","เลขชี้กำลังสิบ"], min:-12, max:12, step:3, def:3, unit:""},
      {k:"m", lab:["Mantissa A","ตัวเลขนำหน้า A"],   min:1,   max:9.9, step:.1, def:1.5, unit:""}
    ],
    readouts:[
      {lab:["Scientific","สัญกรณ์"], f:function(S){ return S.p.m+" × 10"+(S.p.e); }},
      {lab:["Prefix","คำอุปสรรค"],   f:function(S){
        var N={"12":"tera T","9":"giga G","6":"mega M","3":"kilo k","0":"—",
               "-3":"milli m","-6":"micro μ","-9":"nano n","-12":"pico p"};
        return N[String(S.p.e)]||"—"; }},
      {lab:["Plain value","ค่าเต็ม"], f:function(S){
        var v=S.p.m*Math.pow(10,S.p.e);
        return (Math.abs(v)>=1e7||Math.abs(v)<1e-4) ? v.toExponential(2) : String(Math.round(v*10000)/10000); }}
    ],
    draw:function(S,o){
      var x0=50,w=460,y=140;
      o.push('<text x="'+x0+'" y="34" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5" letter-spacing="1.4">'+tx(["POWERS OF TEN","กำลังของสิบ"])+'</text>');
      o.push('<line x1="'+x0+'" y1="'+y+'" x2="'+(x0+w)+'" y2="'+y+'" stroke="var(--ink-faint)" stroke-width="1.6"/>');
      var names={"-12":"p","-9":"n","-6":"μ","-3":"m","0":"","3":"k","6":"M","9":"G","12":"T"};
      for(var e=-12;e<=12;e+=3){
        var px=x0+((e+12)/24)*w, on=(e===S.p.e);
        o.push('<line x1="'+px+'" y1="'+(y-8)+'" x2="'+px+'" y2="'+(y+8)+'" stroke="'+(on?"var(--accent)":"var(--ink-faint)")+'" stroke-width="'+(on?2.5:1)+'"/>');
        o.push('<text x="'+px+'" y="'+(y+26)+'" fill="'+(on?"var(--accent)":"var(--ink-faint)")+'" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">10'+(e<0?"⁻":"")+Math.abs(e)+'</text>');
        if(names[String(e)]) o.push('<text x="'+px+'" y="'+(y-18)+'" fill="'+(on?"var(--accent)":"var(--ink-faint)")+'" font-family="IBM Plex Sans" font-size="11" font-weight="600" text-anchor="middle">'+names[String(e)]+'</text>');
      }
      var cx=x0+((S.p.e+12)/24)*w;
      o.push('<circle cx="'+cx+'" cy="'+y+'" r="6" fill="var(--accent)"/>');
      var v=S.p.m*Math.pow(10,S.p.e);
      var shown=(Math.abs(v)>=1e7||Math.abs(v)<1e-4)?v.toExponential(2):String(Math.round(v*10000)/10000);
      o.push('<text x="280" y="80" fill="var(--ink)" font-family="Bodoni Moda" font-size="30" text-anchor="middle">'+shown+'</text>');
      o.push('<text x="280" y="212" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="11" text-anchor="middle">'+S.p.m+' × 10'+S.p.e+'</text>');
    }
  },
  guide:[
    {say:["Slide the power of ten. Every step of three moves you one prefix along — and multiplies the plain value by a thousand.",
          "เลื่อนเลขชี้กำลังสิบ ทุกๆ สามขั้นจะขยับไปหนึ่งคำอุปสรรค และคูณค่าเต็มด้วยหนึ่งพัน"], set:{e:3,m:1.5}},
    {say:["Negative exponents run the other way. Milli, micro, nano — each one divides by a thousand again.",
          "เลขชี้กำลังลบวิ่งไปอีกทาง มิลลิ ไมโคร นาโน แต่ละขั้นหารด้วยหนึ่งพันอีกครั้ง"], set:{e:-6,m:2.4}},
    {say:["The mantissa must stay between 1 and 10. 15 × 10³ is not scientific notation — 1.5 × 10⁴ is.",
          "ตัวเลขนำหน้าต้องอยู่ระหว่าง 1 ถึง 10  15 × 10³ ไม่ใช่สัญกรณ์วิทยาศาสตร์ แต่ 1.5 × 10⁴ ใช่"], set:{e:4,m:1.5}}
  ]},

{ id:"sigfig", x:235, y:248, requires:["prefixes"], methods:["M-03","M-04"],
  title:["Significant figures","เลขนัยสำคัญ"],
  body:[["Significant figures record how much of a number you actually measured. Digits 1–9 always count. Zeros between digits count. Trailing zeros after a decimal point count. Leading zeros never do — 0.0047 has two significant figures, not four.",
         "When reporting a calculation: addition and subtraction follow the fewest decimal places; multiplication and division follow the fewest significant figures. These are different rules and mixing them up is trap T-03."],
        ["เลขนัยสำคัญบันทึกว่าคุณวัดตัวเลขนั้นได้จริงกี่หลัก ตัวเลข 1–9 นับเสมอ ศูนย์ที่อยู่ระหว่างตัวเลขนับ ศูนย์ท้ายหลังจุดทศนิยมนับ แต่ศูนย์นำหน้าไม่เคยนับ 0.0047 มีเลขนัยสำคัญสองตัว ไม่ใช่สี่",
         "เวลารายงานผลการคำนวณ การบวกลบให้ยึดจำนวนตำแหน่งทศนิยมที่น้อยที่สุด ส่วนการคูณหารให้ยึดจำนวนเลขนัยสำคัญที่น้อยที่สุด นี่เป็นคนละกฎกัน และการสับสนคือกับดัก T-03"]],
  formula:["+ −  →  fewest decimals      × ÷  →  fewest sig figs","+ −  →  ทศนิยมน้อยสุด      × ÷  →  นัยสำคัญน้อยสุด"],
  flabel:["Two different rules","สองกฎที่ต่างกัน"],
  viz:"grid",
  vizcfg:{
    title:["WHICH DIGITS COUNT","หลักไหนนับเป็นเลขนัยสำคัญ"],
    cols:[["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"]],
    ctrls:[{k:"i", lab:["Sample number","ตัวเลขตัวอย่าง"], min:0, max:4, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Number","ตัวเลข"], f:function(S){ return ["0.00450","1002.0","45000","0.0708","3.140"][S.p.i]; }},
      {lab:["Significant figures","จำนวนเลขนัยสำคัญ"], f:function(S){ return ["3","5","2","3","4"][S.p.i]; }},
      {lab:["Why","เพราะ"], f:function(S){
        var W=[["leading zeros never count","ศูนย์นำหน้าไม่นับ"],
               ["zeros between digits always count","ศูนย์ระหว่างตัวเลขนับเสมอ"],
               ["trailing zeros with no point are ambiguous","ศูนย์ท้ายที่ไม่มีจุดทศนิยมกำกวม"],
               ["leading zeros never count","ศูนย์นำหน้าไม่นับ"],
               ["a trailing zero after the point counts","ศูนย์ท้ายหลังจุดทศนิยมนับ"]];
        return W[S.p.i][L()]; }}
    ],
    rows:function(p){
      var D=[["0",".","0","0","4","5"],["1","0","0","2",".","0"],["4","5","0","0","0"," "],
             ["0",".","0","7","0","8"],["3",".","1","4","0"," "]];
      var S2=[[0,0,0,0,1,1],[1,1,1,1,0,1],[1,1,0,0,0,0],[0,0,0,1,1,1],[1,0,1,1,1,0]];
      return [D[p.i].map(function(d,j){ return {v:d, on:!!S2[p.i][j], col:"accent"}; })];
    },
    note:["red digits are the significant ones · scientific notation removes the ambiguity","หลักสีแดงคือเลขนัยสำคัญ · สัญกรณ์วิทยาศาสตร์ขจัดความกำกวมนี้"]
  },
  guide:[
    {say:["Leading zeros are only placeholders — they locate the decimal point and count for nothing.",
          "ศูนย์นำหน้าเป็นเพียงตัวคั่นตำแหน่ง มันบอกตำแหน่งจุดทศนิยมและไม่นับเป็นเลขนัยสำคัญ"], set:{i:0}},
    {say:["A zero trapped between two digits was measured, so it always counts.",
          "ศูนย์ที่ติดอยู่ระหว่างตัวเลขสองตัวคือค่าที่วัดได้จริง จึงนับเสมอ"], set:{i:1}},
    {say:["45000 is the ambiguous case: are those zeros measured or padding? Only 4.50 × 10⁴ settles it.",
          "45000 คือกรณีกำกวม ศูนย์เหล่านั้นวัดได้จริงหรือเป็นแค่ตัวเติม มีเพียง 4.50 × 10⁴ ที่ตอบได้ชัด"], set:{i:2}},
    {say:["A trailing zero AFTER a decimal point is a deliberate claim of precision, so it counts.",
          "ศูนย์ท้ายที่อยู่หลังจุดทศนิยมคือการยืนยันความละเอียดอย่างตั้งใจ จึงนับ"], set:{i:4}}
  ] },

{ id:"uncertainty", x:235, y:346, requires:["sigfig"], methods:["M-05"],
  title:["Uncertainty","ความไม่แน่นอน"],
  body:[["No measurement is a point; it is an interval. Report it as x̄ ± Δx, where the mean is the average of your readings and Δx is half the spread between the largest and smallest.",
         "Uncertainties combine by two rules and only two. Adding or subtracting quantities: add the absolute uncertainties. Multiplying or dividing: add the percentage uncertainties. Using the wrong one is trap T-04."],
        ["ไม่มีการวัดใดเป็นจุดเดียว ทุกการวัดเป็นช่วง รายงานในรูป x̄ ± Δx โดยค่าเฉลี่ยคือค่าเฉลี่ยของการอ่าน และ Δx คือครึ่งหนึ่งของผลต่างระหว่างค่ามากสุดกับน้อยสุด",
         "ความไม่แน่นอนรวมกันด้วยสองกฎเท่านั้น การบวกลบให้บวกความไม่แน่นอนสัมบูรณ์ การคูณหารให้บวกเปอร์เซ็นต์ความไม่แน่นอน ใช้ผิดกฎคือกับดัก T-04"]],
  formula:["Δx̄ = (x_max − x_min) / 2","Δx̄ = (x_max − x_min) / 2"],
  flabel:["Half the spread","ครึ่งหนึ่งของพิสัย"],
  viz:"numline",
  vizcfg:{
    title:["A MEASUREMENT IS A RANGE, NOT A POINT","ค่าที่วัดได้คือช่วง ไม่ใช่จุด"],
    min:0, max:20,
    ctrls:[
      {k:"v", lab:["Reading","ค่าที่อ่านได้"], min:2, max:18, step:.5, def:10, unit:" cm"},
      {k:"u", lab:["Uncertainty ±","ความไม่แน่นอน ±"], min:.1, max:4, step:.1, def:1, unit:" cm"},
      {k:"w", lab:["Second reading","ค่าที่สอง"], min:2, max:18, step:.5, def:13, unit:" cm"}
    ],
    readouts:[
      {lab:["Result","ผลลัพธ์"], f:function(S){ return fmt(S.p.v)+" ± "+fmt(S.p.u)+" cm"; }},
      {lab:["Relative uncertainty","ความไม่แน่นอนสัมพัทธ์"], f:function(S){
        return fmt2(100*S.p.u/S.p.v)+" %"; }},
      {lab:["Do the two agree?","สองค่าตรงกันไหม"], f:function(S){
        var d=Math.abs(S.p.v-S.p.w);
        return d<=2*S.p.u ? (L()?"ตรงกันภายในความไม่แน่นอน":"yes — they overlap")
                          : (L()?"ไม่ตรงกัน ช่วงไม่ทับกัน":"no — the ranges miss each other"); }}
    ],
    regions:function(p){
      return [{a:p.v-p.u, b:p.v+p.u, col:"accent", lab:["reading ± u","ค่าที่อ่าน ± u"]},
              {a:p.w-p.u, b:p.w+p.u, col:"good",   lab:["second ± u","ค่าที่สอง ± u"]}];
    },
    points:function(p){ return [{v:p.v, lab:["best estimate","ค่าที่ดีที่สุด"], col:"accent"}]; },
    note:["two results agree when their bars overlap — not when the numbers match","สองผลลัพธ์ตรงกันเมื่อแถบซ้อนทับกัน ไม่ใช่เมื่อตัวเลขเท่ากัน"]
  },
  guide:[
    {say:["A measurement is a band, not a point. The red bar is everywhere the true value could be.",
          "ค่าที่วัดได้คือแถบ ไม่ใช่จุด แถบสีแดงคือทุกที่ที่ค่าจริงอาจอยู่"], set:{v:10,u:1,w:13}},
    {say:["Widen the uncertainty. The bars now overlap, so the two readings agree after all.",
          "ขยายความไม่แน่นอน แถบทั้งสองซ้อนกันแล้ว สองค่าจึงถือว่าตรงกัน"], set:{v:10,u:2.5,w:13}},
    {say:["A precise instrument narrows the bar. Now the same two readings clearly disagree.",
          "เครื่องมือที่ละเอียดทำให้แถบแคบลง ตอนนี้สองค่าเดิมขัดแย้งกันชัดเจน"], set:{v:10,u:0.4,w:13}}
  ] }
],

methods:[
{id:"M-01", name:["Convert between unit prefixes","แปลงหน่วยด้วยคำอุปสรรค"]},
{id:"M-02", name:["Write in scientific notation","เขียนเป็นสัญกรณ์วิทยาศาสตร์"]},
{id:"M-03", name:["Count significant figures","นับเลขนัยสำคัญ"]},
{id:"M-04", name:["Report a result to the right precision","รายงานผลด้วยความละเอียดที่ถูกต้อง"]},
{id:"M-05", name:["Combine uncertainties","รวมความไม่แน่นอน"]},
{id:"M-06", name:["Derive a unit from a formula","หาหน่วยจากสูตร"]}
],

traps:{
"T-01":["Prefix applied backwards — you divided where you should have multiplied.","ใช้คำอุปสรรคกลับทาง คุณหารทั้งที่ควรคูณ"],
"T-02":["Leading zeros are never significant. 0.0047 has two significant figures.","ศูนย์นำหน้าไม่นับเป็นเลขนัยสำคัญ 0.0047 มีเลขนัยสำคัญสองตัว"],
"T-03":["Wrong rule. Multiplication follows significant figures; addition follows decimal places.","ใช้ผิดกฎ การคูณยึดเลขนัยสำคัญ ส่วนการบวกยึดตำแหน่งทศนิยม"],
"T-04":["Uncertainties add as absolutes for + and −, but as percentages for × and ÷.","ความไม่แน่นอนบวกแบบสัมบูรณ์สำหรับ + และ − แต่บวกแบบเปอร์เซ็นต์สำหรับ × และ ÷"]
},

gen:{
"M-01": function(sf){
  var P=[{n:["kilometres","กิโลเมตร"],s:"km",f:1000},{n:["millimetres","มิลลิเมตร"],s:"mm",f:0.001},
         {n:["micrometres","ไมโครเมตร"],s:"μm",f:1e-6},{n:["nanometres","นาโนเมตร"],s:"nm",f:1e-9}];
  var p=pick(P), v=ri(2,9)*(p.f>=1?1:10);
  var ans=v*p.f;
  var f=function(x){ return (Math.abs(x)>=1e4||Math.abs(x)<1e-3)?x.toExponential(2):String(Math.round(x*1e9)/1e9); };
  if(sf==="S-04") return {stem:["The prefix micro (μ) stands for which factor?","คำอุปสรรคไมโคร (μ) แทนตัวคูณใด"],
    opts:[{v:"10⁻⁶",ok:1},{v:"10⁻³",trap:"T-01"},{v:"10⁻⁹"},{v:"10⁶"}],unit:""};
  if(sf==="S-05") return {stem:["A length is "+f(ans)+" m. Express it in "+p.n[0]+".","ความยาวค่าหนึ่งเท่ากับ "+f(ans)+" เมตร จงเขียนในหน่วย"+p.n[1]],
    opts:[{v:String(v)},{v:f(ans*p.f),trap:"T-01"},{v:String(v*10)},{v:String(v/10)}].map(function(o,i){return i===0?{v:String(v),ok:1}:o;}),unit:" "+p.s};
  return {stem:["Convert "+v+" "+p.s+" into metres.","จงแปลง "+v+" "+p.s+" เป็นเมตร"],
    opts:[{v:f(ans),ok:1},{v:f(v/p.f),trap:"T-01"},{v:f(ans*10)},{v:f(ans/10)}],unit:" m"};
},
"M-02": function(sf){
  var m=ri(11,99)/10, e=pick([2,3,4,-2,-3,-4]);
  var v=m*Math.pow(10,e);
  var plain=(Math.abs(v)>=1e5||Math.abs(v)<1e-3)?v.toExponential(4):String(Math.round(v*1e6)/1e6);
  if(sf==="S-04") return {stem:["Which of these is correctly written in scientific notation?","ข้อใดเขียนเป็นสัญกรณ์วิทยาศาสตร์ได้ถูกต้อง"],
    opts:[{v:"4.7 × 10³",ok:1},{v:"47 × 10²"},{v:"0.47 × 10⁴"},{v:"4.7 × 10"}],unit:""};
  return {stem:["Write "+plain+" in scientific notation.","จงเขียน "+plain+" เป็นสัญกรณ์วิทยาศาสตร์"],
    opts:[{v:m+" × 10"+e,ok:1},{v:(m*10)+" × 10"+(e-1)},{v:(m/10)+" × 10"+(e+1)},{v:m+" × 10"+(-e),trap:"T-01"}],unit:""};
},
"M-03": function(sf){
  var C=[{s:"0.0047",n:2,t:"T-02"},{s:"1.030",n:4},{s:"56000",n:2},{s:"0.00900",n:3,t:"T-02"},
         {s:"120.05",n:5},{s:"9.0",n:2}];
  var c=pick(C);
  var wrong=[c.n+2,c.n-1,c.n+1].filter(function(x){return x>0&&x!==c.n;});
  return {stem:["How many significant figures does "+c.s+" have?","จำนวน "+c.s+" มีเลขนัยสำคัญกี่ตัว"],
    opts:[{v:String(c.n),ok:1},{v:String(wrong[0]),trap:c.t||null},{v:String(wrong[1])},{v:String(wrong[2])}],unit:""};
},
"M-04": function(sf){
  if(sf==="S-04") return {stem:["A result comes from multiplying 2.5 by 3.42. To how many significant figures should it be reported?","ผลลัพธ์มาจาก 2.5 คูณ 3.42 ควรรายงานด้วยเลขนัยสำคัญกี่ตัว"],
    opts:[{v:"2",ok:1},{v:"3",trap:"T-03"},{v:"4"},{v:"5"}],unit:""};
  var a=ri(20,90)/10, b=ri(200,900)/100;
  var raw=a*b;
  return {stem:["Evaluate "+a+" × "+b+" and report it correctly.","จงคำนวณ "+a+" × "+b+" แล้วรายงานให้ถูกต้อง"],
    opts:[{v:String(Number(raw.toPrecision(2))),ok:1},{v:String(Math.round(raw*100)/100),trap:"T-03"},
          {v:String(Math.round(raw*1000)/1000)},{v:String(Math.round(raw))}],unit:""};
},
"M-05": function(sf){
  var A=ri(20,60), dA=ri(1,3), B=ri(10,40), dB=ri(1,3);
  if(sf==="S-03"||sf==="S-05"){
    var pA=dA/A*100, pB=dB/B*100, prod=A*B, dprod=(pA+pB)/100*prod;
    return {stem:["Two measured lengths, "+A+" ± "+dA+" cm and "+B+" ± "+dB+" cm, are multiplied. What is the uncertainty in the product?",
                  "ความยาวที่วัดได้สองค่า "+A+" ± "+dA+" ซม. และ "+B+" ± "+dB+" ซม. นำมาคูณกัน ความไม่แน่นอนของผลคูณเป็นเท่าใด"],
      opts:[{v:fmt(dprod),ok:1},{v:String(dA+dB),trap:"T-04"},{v:fmt(dprod/2)},{v:String(Math.abs(dA-dB))}],unit:" cm²"};
  }
  return {stem:["Add "+A+" ± "+dA+" cm to "+B+" ± "+dB+" cm.","จงบวก "+A+" ± "+dA+" ซม. กับ "+B+" ± "+dB+" ซม."],
    opts:[{v:(A+B)+" ± "+(dA+dB),ok:1},{v:(A+B)+" ± "+Math.abs(dA-dB),trap:"T-04"},
          {v:(A+B)+" ± "+dA},{v:(A+B)+" ± "+fmt((dA+dB)/2)}],unit:" cm"};
},
"M-06": function(sf){
  var C=[{q:["kinetic energy ½mv²","พลังงานจลน์ ½mv²"],u:"kg·m²/s²",w:["kg·m/s²","kg·m/s","kg·m²/s"]},
         {q:["force ma","แรง ma"],u:"kg·m/s²",w:["kg·m²/s²","kg·m/s","kg/s²"]},
         {q:["power W/t","กำลัง W/t"],u:"kg·m²/s³",w:["kg·m²/s²","kg·m/s³","kg·m²/s"]},
         {q:["momentum mv","โมเมนตัม mv"],u:"kg·m/s",w:["kg·m/s²","kg·m²/s","kg/s"]}];
  var c=pick(C);
  return {stem:["Express the unit of "+c.q[0]+" in SI base units.","จงเขียนหน่วยของ"+c.q[1]+"ในรูปหน่วยฐาน SI"],
    opts:[{v:c.u,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
}
}
};
