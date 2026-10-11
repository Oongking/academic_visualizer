var CHAPTER = {
id:"ma14", num:"14", slug:"sequences", subject:"math",
kicker:["Mathematics · Chapter 14","คณิตศาสตร์ · บทที่ 14"],
title:["Sequences and Series","ลำดับและอนุกรม"],
mapTitle:["Patterns you can add up","แบบรูปที่บวกรวมได้"],
lede:["A sequence is a list with a rule; a series is what you get when you add that list up. Almost every question here reduces to spotting whether the rule adds a constant or multiplies by one — and those two answers lead to completely different formulas.",
      "ลำดับคือรายการตัวเลขที่เรียงตามกฎข้อหนึ่ง ส่วนอนุกรมคือผลที่ได้เมื่อบวกตัวเลขในลำดับนั้นเข้าด้วยกัน โจทย์เกือบทุกข้อในบทนี้เริ่มจากการดูว่ากฎนั้นบวกด้วยค่าคงที่หรือคูณด้วยค่าคงที่ สองแบบนี้ใช้สูตรต่างกันโดยสิ้นเชิง"],
next:["→ continues in Chapter 15 · Calculus","→ ต่อในบทที่ 15 · แคลคูลัส"],

nodes:[
{ id:"sequences", x:235, y:52, requires:[], methods:["M-01"],
  title:["Sequences","ลำดับ"],
  body:[["A sequence is a function whose domain is the positive integers, so aₙ is simply the output at input n. Finite sequences stop; infinite ones do not.",
         "To find the rule, take differences. If the first differences are constant the general term is linear, an + b. If the second differences are constant it is quadratic, an² + bn + c. If the ratios are constant it is geometric. Substituting n = 1, 2, 3 then gives simultaneous equations for the coefficients."],
        ["ลำดับคือฟังก์ชันที่มีโดเมนเป็นจำนวนเต็มบวก aₙ จึงเป็นค่าที่ได้เมื่อใส่ n ลำดับจำกัดมีพจน์สุดท้าย ส่วนลำดับอนันต์ไม่มี",
         "ถ้าจะหากฎ ให้ลองหาผลต่าง ถ้าผลต่างชั้นที่หนึ่งคงที่ พจน์ทั่วไปเป็นเชิงเส้น an + b ถ้าผลต่างชั้นที่สองคงที่ จะเป็นกำลังสอง an² + bn + c ถ้าอัตราส่วนคงที่ จะเป็นลำดับเรขาคณิต จากนั้นแทน n = 1, 2, 3 ก็จะได้ระบบสมการสำหรับหาสัมประสิทธิ์"]],
  formula:["1st differences constant → linear        2nd constant → quadratic","ผลต่างชั้น 1 คงที่ → เชิงเส้น        ชั้น 2 คงที่ → กำลังสอง"],
  flabel:["Take differences to find the rule","หาผลต่างเพื่อหากฎ"],
  viz:"bars",
  vizcfg:{
    title:["TAKE DIFFERENCES UNTIL THEY GO CONSTANT","หาผลต่างไปเรื่อยจนกว่าจะคงที่"],
    ylab:["value","ค่า"],
    ctrls:[
      {k:"kind", lab:["",""], opts:[["linear","เชิงเส้น"], ["quadratic","กำลังสอง"], ["geometric","เรขาคณิต"]], min:0, def:0, unit:""},
      {k:"a",    lab:["Leading coefficient","สัมประสิทธิ์นำ"], min:1, max:5, step:1, def:2, unit:""}
    ],
    readouts:[
      {lab:["Sequence","ลำดับ"], f:function(S){
        var p=S.p, out=[];
        for(var n=1;n<=5;n++) out.push(p.kind===0 ? p.a*n+1 : p.kind===1 ? p.a*n*n : p.a*Math.pow(2,n-1));
        return out.join(", "); }},
      {lab:["First differences","ผลต่างชั้นที่หนึ่ง"], f:function(S){
        var p=S.p, t=[], d=[];
        for(var n=1;n<=5;n++) t.push(p.kind===0 ? p.a*n+1 : p.kind===1 ? p.a*n*n : p.a*Math.pow(2,n-1));
        for(var i=1;i<5;i++) d.push(t[i]-t[i-1]);
        return d.join(", "); }},
      {lab:["Constant at which level?","คงที่ที่ชั้นใด"], f:function(S){
        return [["first — so the rule is linear","ชั้นที่หนึ่ง — กฎเป็นเชิงเส้น"],
                ["second — so the rule is quadratic","ชั้นที่สอง — กฎเป็นกำลังสอง"],
                ["never — the RATIOS are constant instead","ไม่มีเลย — อัตราส่วนคงที่แทน"]][S.p.kind][L()]; }},
      {lab:["What to look for","สิ่งที่ต้องมองหา"], f:function(){
        return L()?"ผลต่างคงที่ หรือ อัตราส่วนคงที่":"a constant difference, or a constant ratio"; }}
    ],
    bars:[
      {lab:["a₁","a₁"], f:function(p){ return p.kind===0?p.a+1:p.kind===1?p.a:p.a; }, col:"faint"},
      {lab:["a₂","a₂"], f:function(p){ return p.kind===0?2*p.a+1:p.kind===1?4*p.a:2*p.a; }, col:"faint"},
      {lab:["a₃","a₃"], f:function(p){ return p.kind===0?3*p.a+1:p.kind===1?9*p.a:4*p.a; }, col:"accent"},
      {lab:["a₄","a₄"], f:function(p){ return p.kind===0?4*p.a+1:p.kind===1?16*p.a:8*p.a; }, col:"accent"},
      {lab:["a₅","a₅"], f:function(p){ return p.kind===0?5*p.a+1:p.kind===1?25*p.a:16*p.a; }, col:"accent"}
    ],
    note:["evenly stepped bars mean linear; accelerating bars mean quadratic or geometric","แถบที่สูงขึ้นทีละเท่าๆ กันคือเชิงเส้น ส่วนแถบที่สูงขึ้นเร็วขึ้นเรื่อยๆ คือกำลังสองหรือเรขาคณิต"]
  } },

{ id:"arithmetic", x:100, y:150, requires:["sequences"], methods:["M-02"],
  title:["Arithmetic sequences","ลำดับเลขคณิต"],
  body:[["A constant is added each step, so aₙ = a₁ + (n − 1)d. The n − 1 matters: the first term has had the difference added zero times, not once. Using n instead of n − 1 is trap T-01 and it shifts every answer by exactly one d.",
         "The sum is Sₙ = (n/2)[2a₁ + (n − 1)d], which is the same as (n/2)(a₁ + aₙ) — the average of the first and last terms, times how many there are. That second form is faster whenever you already know the last term."],
        ["แต่ละขั้นบวกด้วยค่าคงที่ จึงได้ aₙ = a₁ + (n − 1)d ที่ใช้ n − 1 เพราะพจน์แรกยังไม่ได้บวกผลต่างเลยสักครั้ง ไม่ใช่บวกหนึ่งครั้ง ถ้าใช้ n แทน n − 1 ก็ตกกับดัก T-01 และคำตอบทุกข้อจะคลาดไปพอดีหนึ่ง d",
         "ผลบวกคือ Sₙ = (n/2)[2a₁ + (n − 1)d] ซึ่งเท่ากับ (n/2)(a₁ + aₙ) คือค่าเฉลี่ยของพจน์แรกกับพจน์สุดท้าย คูณจำนวนพจน์ ถ้ารู้พจน์สุดท้ายอยู่แล้ว รูปหลังจะคิดเร็วกว่า"]],
  formula:["aₙ = a₁ + (n−1)d        Sₙ = (n/2)[2a₁ + (n−1)d]","aₙ = a₁ + (n−1)d        Sₙ = (n/2)[2a₁ + (n−1)d]"],
  flabel:["Note the plus, and the n − 1","สังเกตเครื่องหมายบวก และ n − 1"],
  viz:"bars",
  vizcfg:{
    title:["THE TERM AND THE SUM ARE DIFFERENT THINGS","พจน์กับผลบวกเป็นคนละอย่าง"],
    ylab:["value","ค่า"],
    ctrls:[
      {k:"a1", lab:["First term a₁","พจน์แรก a₁"], min:-10, max:20, step:1, def:3, unit:""},
      {k:"d",  lab:["Common difference d","ผลต่างร่วม d"], min:-6, max:8, step:1, def:4, unit:""},
      {k:"n",  lab:["How many terms","จำนวนพจน์"], min:1, max:20, step:1, def:8, unit:""}
    ],
    readouts:[
      {lab:["nth term aₙ","พจน์ที่ n"], f:function(S){ return String(S.p.a1+(S.p.n-1)*S.p.d); }},
      {lab:["Sum Sₙ","ผลบวก Sₙ"], f:function(S){
        return String(S.p.n/2*(2*S.p.a1+(S.p.n-1)*S.p.d)); }},
      {lab:["If you used n instead of n−1","ถ้าใช้ n แทน n−1"], f:function(S){
        return String(S.p.a1+S.p.n*S.p.d)+(L()?" · ผิดไปหนึ่ง d":" · wrong by exactly one d"); }},
      {lab:["Average of first and last","ค่าเฉลี่ยพจน์แรกกับพจน์สุดท้าย"], f:function(S){
        return fmt2((S.p.a1+S.p.a1+(S.p.n-1)*S.p.d)/2)+(L()?" × n = Sₙ":" × n = Sₙ"); }}
    ],
    bars:[
      {lab:["First term","พจน์แรก"], f:function(p){ return p.a1; }, col:"faint"},
      {lab:["nth term","พจน์ที่ n"], f:function(p){ return p.a1+(p.n-1)*p.d; }, col:"accent"},
      {lab:["Sum Sₙ","ผลบวก Sₙ"], f:function(p){ return p.n/2*(2*p.a1+(p.n-1)*p.d); }, col:"good"},
      {lab:["Wrong: used n","ผิด: ใช้ n"], f:function(p){ return p.a1+p.n*p.d; }, col:"warn"}
    ],
    note:["the amber bar is the classic off-by-one — it always sits exactly one d above the right answer","แถบสีเหลืองอำพันคือความผิดพลาดแบบคลาดไปหนึ่งขั้นที่พบบ่อย มันสูงกว่าคำตอบที่ถูกอยู่ d พอดี"]
  } },

{ id:"geometric", x:370, y:150, requires:["sequences"], methods:["M-03"],
  title:["Geometric sequences","ลำดับเรขาคณิต"],
  body:[["A constant is multiplied each step, so aₙ = a₁r^(n−1) and growth is multiplicative rather than additive. That is why a geometric sequence eventually overtakes any arithmetic one, however large the common difference.",
         "The plot makes the contrast unmissable: an arithmetic sequence lies on a straight line, a geometric one bends. Switch between the two in the lab and watch the shape change — the shape is the diagnosis."],
        ["แต่ละขั้นคูณด้วยค่าคงที่ จึงได้ aₙ = a₁r^(n−1) และโตแบบคูณ ไม่ใช่แบบบวก ลำดับเรขาคณิตจึงแซงลำดับเลขคณิตได้ในที่สุด ไม่ว่าผลต่างร่วมของลำดับเลขคณิตจะมากเพียงใด",
         "กราฟทำให้เห็นความต่างชัดเจน ลำดับเลขคณิตเรียงตัวบนเส้นตรง ส่วนลำดับเรขาคณิตเป็นเส้นโค้ง ลองสลับไปมาในห้องทดลองแล้วดูรูปร่างที่เปลี่ยนไป รูปร่างบอกชนิดของลำดับได้"]],
  formula:["aₙ = a₁ r^(n−1)        Sₙ = a₁(1 − rⁿ)/(1 − r)","aₙ = a₁ r^(n−1)        Sₙ = a₁(1 − rⁿ)/(1 − r)"],
  flabel:["Multiplicative growth bends the line","การเติบโตแบบคูณทำให้เส้นโค้ง"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){
      var n=Math.round(x);
      return p.kind===0 ? p.a1 + (n-1)*p.d : p.a1*Math.pow(p.r, n-1);
    },
    xmin:1, xmax:12, fill:false,
    title:["TERM VALUE AGAINST n","ค่าของพจน์ เทียบ n"],
    xlab:["n","n"], ylab:["aₙ","aₙ"],
    mark:function(p){ return p.n; },
    ctrls:[
      {k:"kind", lab:["",""], opts:[["arithmetic","เลขคณิต"], ["geometric","เรขาคณิต"]], min:0, def:0, unit:""},
      {k:"a1", lab:["First term a₁","พจน์แรก a₁"], min:1, max:10, step:1, def:2, unit:""},
      {k:"d",  lab:["Difference d","ผลต่าง d"],     min:-5, max:8, step:1, def:3, unit:""},
      {k:"r",  lab:["Ratio r","อัตราส่วน r"],       min:-2, max:2.5, step:.1, def:1.5, unit:""},
      {k:"n",  lab:["Look at term n","ดูพจน์ที่ n"], min:1, max:12, step:1, def:5, unit:""}
    ],
    readouts:[
      {lab:["Term aₙ","พจน์ aₙ"], f:function(S){
        var p=S.p;
        return fmt2(p.kind===0 ? p.a1+(p.n-1)*p.d : p.a1*Math.pow(p.r,p.n-1)); }},
      {lab:["Sum Sₙ","ผลบวก Sₙ"], f:function(S){
        var p=S.p;
        if(p.kind===0) return fmt2((p.n/2)*(2*p.a1+(p.n-1)*p.d));
        if(Math.abs(p.r-1)<1e-9) return fmt2(p.a1*p.n);
        return fmt2(p.a1*(1-Math.pow(p.r,p.n))/(1-p.r)); }},
      {lab:["Infinite sum S∞","ผลบวกอนันต์ S∞"], f:function(S){
        var p=S.p;
        if(p.kind===0) return L()?"ลู่ออก":"diverges";
        return Math.abs(p.r)<1 ? fmt2(p.a1/(1-p.r)) : (L()?"ลู่ออก · |r| ≥ 1":"diverges · |r| ≥ 1"); }}
    ]
  },
  guide:[
    {say:["Arithmetic first. The terms sit on a perfectly straight line — adding a constant is linear growth.",
          "เริ่มที่เลขคณิตก่อน พจน์ทุกตัวอยู่บนเส้นตรงพอดี การบวกด้วยค่าคงที่ให้การเติบโตแบบเชิงเส้น"], set:{kind:0,a1:2,d:3,r:1.5,n:5}},
    {say:["Switch to geometric with r = 1.5. Same start, but the line bends upward and runs away.",
          "สลับเป็นเรขาคณิตที่ r = 1.5 เริ่มจากที่เดิม แต่เส้นโค้งขึ้นแล้วพุ่งสูงขึ้นเรื่อยๆ"], set:{kind:1,a1:2,d:3,r:1.5,n:5}},
    {say:["Now set r below 1. The terms shrink towards zero, and the infinite sum readout finally gives a number.",
          "ทีนี้ตั้ง r ให้ต่ำกว่า 1 พจน์จะหดเข้าหาศูนย์ และช่องผลบวกอนันต์ก็แสดงตัวเลขออกมาได้"], set:{kind:1,a1:8,d:3,r:0.5,n:8}},
    {say:["Push r back above 1 and the infinite sum reports divergence. That threshold at |r| = 1 is the whole rule.",
          "ดัน r กลับไปเกิน 1 ผลบวกอนันต์จะรายงานว่าลู่ออก เกณฑ์ที่ |r| = 1 คือกฎทั้งหมดของเรื่องนี้"], set:{kind:1,a1:2,d:3,r:1.8,n:8}}
  ]},

{ id:"sigma", x:235, y:248, requires:["arithmetic","geometric"], methods:["M-04"],
  title:["Sigma notation","สัญกรณ์ซิกมา"],
  body:[["Σ is shorthand for a sum, with the index running from the lower limit to the upper. A constant pulls straight out, and a sum splits across addition — but nothing useful happens across multiplication, so Σ(fg) is not Σf · Σg.",
         "Three standard results cover most questions: Σn = n(n+1)/2, Σn² = n(n+1)(2n+1)/6, and Σn³ = [n(n+1)/2]². Check the lower limit before using them, because they all assume the sum starts at 1."],
        ["Σ เป็นสัญลักษณ์ย่อของการบวก โดยดัชนีไล่จากขอบล่างถึงขอบบน ค่าคงที่ดึงออกมานอก Σ ได้ และ Σ แยกข้ามเครื่องหมายบวกได้ แต่ข้ามการคูณไม่ได้ Σ(fg) จึงไม่เท่ากับ Σf · Σg",
         "สูตรมาตรฐานสามสูตรใช้ได้กับโจทย์ส่วนใหญ่ คือ Σn = n(n+1)/2, Σn² = n(n+1)(2n+1)/6 และ Σn³ = [n(n+1)/2]² ก่อนใช้ให้ดูขอบล่างก่อน เพราะทุกสูตรสมมติว่าผลบวกเริ่มที่ 1"]],
  formula:["Σn = n(n+1)/2        Σn² = n(n+1)(2n+1)/6","Σn = n(n+1)/2        Σn² = n(n+1)(2n+1)/6"],
  flabel:["Check the lower limit is 1","ตรวจว่าขอบล่างเป็น 1"],
  viz:"bars",
  vizcfg:{
    title:["THE THREE STANDARD SIGMA RESULTS","ผลลัพธ์ซิกมามาตรฐานสามข้อ"],
    ylab:["value","ค่า"],
    ctrls:[{k:"n", lab:["Sum up to n","บวกถึง n"], min:1, max:20, step:1, def:10, unit:""}],
    readouts:[
      {lab:["Σn","Σn"], f:function(S){ return String(S.p.n*(S.p.n+1)/2); }},
      {lab:["Σn²","Σn²"], f:function(S){ return String(S.p.n*(S.p.n+1)*(2*S.p.n+1)/6); }},
      {lab:["Σn³","Σn³"], f:function(S){ var t=S.p.n*(S.p.n+1)/2; return String(t*t); }},
      {lab:["A neat coincidence","ความบังเอิญที่สวยงาม"], f:function(){
        return L()?"Σn³ = (Σn)² เสมอ":"Σn³ is always exactly (Σn)²"; }}
    ],
    bars:[
      {lab:["Σn","Σn"], f:function(p){ return p.n*(p.n+1)/2; }, col:"accent"},
      {lab:["Σn²","Σn²"], f:function(p){ return p.n*(p.n+1)*(2*p.n+1)/6; }, col:"good"},
      {lab:["(Σn)²","(Σn)²"], f:function(p){ var t=p.n*(p.n+1)/2; return t*t; }, col:"warn"},
      {lab:["Σn³","Σn³"], f:function(p){ var t=p.n*(p.n+1)/2; return t*t; }, col:"warn"}
    ],
    note:["all three assume the sum starts at n = 1 — check the lower limit before using them","ทั้งสามสูตรสมมติว่าผลบวกเริ่มที่ n = 1 ให้ดูขอบล่างก่อนใช้"]
  } },

{ id:"infinite", x:235, y:346, requires:["sigma"], methods:["M-05","M-06"],
  title:["Infinite series","อนุกรมอนันต์"],
  body:[["An infinite geometric series converges to a₁/(1 − r), but only when |r| < 1. Outside that range the terms do not shrink, the partial sums run away, and the formula returns a number that means nothing. Using it anyway is trap T-02.",
         "An arithmetic series can never converge, because its terms never shrink towards zero. One neat application: a recurring decimal is a geometric series in disguise, which is exactly why every recurring decimal is rational."],
        ["อนุกรมเรขาคณิตอนันต์ลู่เข้าสู่ a₁/(1 − r) แต่เฉพาะเมื่อ |r| < 1 ถ้า r อยู่นอกช่วงนี้ พจน์จะไม่หดลง ผลบวกย่อยจะเพิ่มขึ้นไม่หยุด และสูตรจะให้ตัวเลขที่ไม่มีความหมาย ถ้ายังใช้สูตรนี้ก็ตกกับดัก T-02",
         "อนุกรมเลขคณิตไม่มีทางลู่เข้า เพราะพจน์ไม่เคยหดเข้าหาศูนย์ มีตัวอย่างการใช้ที่น่าสนใจอย่างหนึ่งคือ ทศนิยมซ้ำก็คืออนุกรมเรขาคณิตในอีกรูปหนึ่ง ทศนิยมซ้ำทุกตัวจึงเป็นจำนวนตรรกยะ"]],
  formula:["S∞ = a₁/(1 − r) ,  valid only for |r| < 1","S∞ = a₁/(1 − r) ,  ใช้ได้เฉพาะ |r| < 1"],
  flabel:["Arithmetic series never converge","อนุกรมเลขคณิตไม่มีวันลู่เข้า"],
  viz:"plot",
  vizcfg:{
    title:["PARTIAL SUMS: SETTLING OR RUNNING AWAY","ผลบวกย่อย: ลงตัวหรือวิ่งหนี"],
    xlab:["number of terms","จำนวนพจน์"], ylab:["partial sum Sₙ","ผลบวกย่อย Sₙ"],
    xmin:1, xmax:25, fill:false,
    fn:function(x,p){
      var n=Math.round(x);
      if(Math.abs(p.r-1)<1e-9) return p.a1*n;
      return p.a1*(1-Math.pow(p.r,n))/(1-p.r);
    },
    mark:function(p){ return p.n; },
    ctrls:[
      {k:"a1", lab:["First term a₁","พจน์แรก a₁"], min:1, max:10, step:1, def:6, unit:""},
      {k:"r",  lab:["Common ratio r","อัตราส่วนร่วม r"], min:-1.5, max:1.6, step:.05, def:.5, unit:""},
      {k:"n",  lab:["Terms so far","พจน์ถึงตอนนี้"], min:1, max:24, step:1, def:6, unit:""}
    ],
    readouts:[
      {lab:["Sₙ so far","Sₙ ถึงตอนนี้"], f:function(S){
        var p=S.p;
        if(Math.abs(p.r-1)<1e-9) return fmt2(p.a1*p.n);
        return fmt2(p.a1*(1-Math.pow(p.r,p.n))/(1-p.r)); }},
      {lab:["S∞","S∞"], f:function(S){
        return Math.abs(S.p.r)<1 ? fmt2(S.p.a1/(1-S.p.r)) : (L()?"ไม่มี — ลู่ออก":"none — it diverges"); }},
      {lab:["Converges?","ลู่เข้าไหม"], f:function(S){
        return Math.abs(S.p.r)<1 ? (L()?"ลู่เข้า เพราะ |r| < 1":"yes, because |r| < 1")
                                 : (L()?"ลู่ออก เพราะ |r| ≥ 1":"no, because |r| ≥ 1"); }},
      {lab:["The threshold","เกณฑ์ตัดสิน"], f:function(){ return "|r| = 1"; }}
    ],
    note:["the curve either flattens onto a ceiling or climbs without limit — |r| = 1 is the switch","เส้นโค้งจะแบนลงชนเพดาน หรือไต่ขึ้นไม่มีที่สิ้นสุด โดย |r| = 1 เป็นตัวแบ่ง"]
  },
  guide:[
    {say:["With r = 0.5 the partial sums flatten quickly onto a ceiling. That ceiling is S∞.",
          "เมื่อ r = 0.5 ผลบวกย่อยแบนลงเข้าหาเพดานอย่างรวดเร็ว เพดานนั้นคือ S∞"], set:{a1:6,r:.5,n:6}},
    {say:["Nudge r above 1 and the ceiling vanishes. The sum climbs forever and S∞ does not exist.",
          "ขยับ r ให้เกิน 1 เพดานก็หายไป ผลบวกเพิ่มขึ้นไม่หยุด และ S∞ ไม่มีค่า"], set:{a1:6,r:1.2,n:12}},
    {say:["A negative ratio makes it oscillate as it settles — still converging, just from both sides.",
          "อัตราส่วนที่เป็นลบทำให้ผลบวกแกว่งไปมาขณะเข้าหาค่าหนึ่ง ยังลู่เข้าอยู่ แค่เข้าหาจากทั้งสองฝั่ง"], set:{a1:6,r:-.6,n:10}}
  ] }
],

methods:[
{id:"M-01", name:["Find the general term","หาพจน์ทั่วไป"]},
{id:"M-02", name:["Arithmetic term and sum","พจน์และผลบวกเลขคณิต"]},
{id:"M-03", name:["Geometric term and sum","พจน์และผลบวกเรขาคณิต"]},
{id:"M-04", name:["Evaluate a sigma sum","หาค่าผลบวกซิกมา"]},
{id:"M-05", name:["Test convergence","ตรวจการลู่เข้า"]},
{id:"M-06", name:["Sum an infinite series","หาผลบวกอนุกรมอนันต์"]}
],

traps:{
"T-01":["The general term uses n − 1, not n. The first term has had d added zero times.","พจน์ทั่วไปใช้ n − 1 ไม่ใช่ n เพราะพจน์แรกยังไม่ได้บวก d เลยสักครั้ง"],
"T-02":["S∞ only exists when |r| < 1. Outside that the series diverges.","S∞ มีค่าเฉพาะเมื่อ |r| < 1 ถ้าอยู่นอกช่วงนี้ อนุกรมลู่ออก"],
"T-03":["The nth term and the sum to n terms are different things.","พจน์ที่ n กับผลบวก n พจน์แรกเป็นคนละเรื่องกัน"],
"T-04":["Sign error in the arithmetic sum. It is 2a₁ + (n−1)d, with a plus.","เครื่องหมายผิดในผลบวกเลขคณิต ที่ถูกคือ 2a₁ + (n−1)d ซึ่งเป็นเครื่องหมายบวก"]
},

gen:{
"M-01": function(sf){
  var a=pick([2,3,5]), b=pick([1,4,-2]);
  var seq=[a+b, 2*a+b, 3*a+b, 4*a+b];
  if(sf==="S-04") return {stem:["The second differences of a sequence are constant. What form does its general term take?",
                                "ลำดับหนึ่งมีผลต่างชั้นที่สองคงที่ พจน์ทั่วไปมีรูปแบบใด"],
    opts:[{v:"an² + bn + c",ok:1},{v:"an + b",trap:"T-01"},{v:"a·rⁿ"},{v:"a/n"}],unit:""};
  return {stem:["Find the general term of "+seq.join(", ")+", …","จงหาพจน์ทั่วไปของ "+seq.join(", ")+", …"],
    opts:[{v:a+"n "+(b>=0?"+ ":"− ")+Math.abs(b),ok:1},
          {v:a+"n "+(b>=0?"− ":"+ ")+Math.abs(b),trap:"T-01"},
          {v:(a+b)+"n"},{v:a+"n²"}],unit:""};
},
"M-02": function(sf){
  var a1=pick([3,5,7]), d=pick([2,4,-3]), n=pick([8,10,12]);
  var an=a1+(n-1)*d, Sn=(n/2)*(2*a1+(n-1)*d);
  if(sf==="S-04") return {stem:["Why does the arithmetic general term use n − 1 rather than n?",
                                "ทำไมพจน์ทั่วไปของลำดับเลขคณิตจึงใช้ n − 1 ไม่ใช่ n"],
    opts:[{v:["The first term has had d added zero times","พจน์แรกยังไม่เคยถูกบวก d เลย"],ok:1},
          {v:["It is only a convention","เป็นเพียงข้อตกลง"],trap:"T-01"},
          {v:["To keep the answer positive","เพื่อให้คำตอบเป็นบวก"]},
          {v:["Because n starts at 0","เพราะ n เริ่มที่ 0"],trap:"T-01"}],unit:""};
  if(sf==="S-05") return {stem:["An arithmetic sequence has a₁ = "+a1+" and a"+n+" = "+an+". Find d.",
                                "ลำดับเลขคณิตมี a₁ = "+a1+" และ a"+n+" = "+an+" จงหา d"],
    opts:[{v:String(d),ok:1},{v:fmt2((an-a1)/n),trap:"T-01"},{v:String(an-a1)},{v:String(d*2)}],unit:""};
  if(sf==="S-03") return {stem:["Find the sum of the first "+n+" terms when a₁ = "+a1+" and d = "+d+".",
                                "จงหาผลบวก "+n+" พจน์แรก เมื่อ a₁ = "+a1+" และ d = "+d],
    opts:[{v:fmt2(Sn),ok:1},{v:fmt2((n/2)*(2*a1-(n-1)*d)),trap:"T-04"},
          {v:fmt2(an),trap:"T-03"},{v:fmt2(n*a1)}],unit:""};
  return {stem:["Find the "+n+"th term when a₁ = "+a1+" and d = "+d+".",
                "จงหาพจน์ที่ "+n+" เมื่อ a₁ = "+a1+" และ d = "+d],
    opts:[{v:String(an),ok:1},{v:String(a1+n*d),trap:"T-01"},
          {v:fmt2(Sn),trap:"T-03"},{v:String(a1*d)}],unit:""};
},
"M-03": function(sf){
  var a1=pick([2,3,5]), r=pick([2,3,0.5]), n=pick([5,6,7]);
  var an=a1*Math.pow(r,n-1);
  var Sn=a1*(1-Math.pow(r,n))/(1-r);
  if(sf==="S-04") return {stem:["A geometric and an arithmetic sequence start together. Which eventually grows faster?",
                                "ลำดับเรขาคณิตกับลำดับเลขคณิตเริ่มต้นพร้อมกัน สุดท้ายแล้วแบบไหนโตเร็วกว่า"],
    opts:[{v:["The geometric one, if r > 1","แบบเรขาคณิต ถ้า r > 1"],ok:1},
          {v:["The arithmetic one, always","แบบเลขคณิต เสมอ"]},
          {v:["They stay level","โตเท่ากันตลอด"]},
          {v:["It depends on a₁ only","ขึ้นกับ a₁ เท่านั้น"]}],unit:""};
  if(sf==="S-05") return {stem:["A geometric sequence has a₁ = "+a1+" and a"+n+" = "+fmt2(an)+". Find r.",
                                "ลำดับเรขาคณิตมี a₁ = "+a1+" และ a"+n+" = "+fmt2(an)+" จงหา r"],
    opts:[{v:String(r),ok:1},{v:fmt2(an/a1),trap:"T-01"},{v:fmt2(r*2)},{v:fmt2(1/r)}],unit:""};
  return {stem:["Find the "+n+"th term when a₁ = "+a1+" and r = "+r+".",
                "จงหาพจน์ที่ "+n+" เมื่อ a₁ = "+a1+" และ r = "+r],
    opts:[{v:fmt2(an),ok:1},{v:fmt2(a1*Math.pow(r,n)),trap:"T-01"},
          {v:fmt2(Sn),trap:"T-03"},{v:fmt2(a1*r*n)}],unit:""};
},
"M-04": function(sf){
  var n=pick([10,20,50]);
  var s1=n*(n+1)/2, s2=n*(n+1)*(2*n+1)/6;
  if(sf==="S-04") return {stem:["Is Σ(f·g) equal to (Σf)(Σg)?","Σ(f·g) เท่ากับ (Σf)(Σg) หรือไม่"],
    opts:[{v:["No — sigma does not distribute over multiplication","ไม่ได้ Σ ไม่กระจายข้ามการคูณ"],ok:1},
          {v:["Yes, always","ใช่ เสมอ"],trap:"T-03"},
          {v:["Yes, if both are positive","ใช่ ถ้าทั้งคู่เป็นบวก"],trap:"T-03"},
          {v:["Only for finite sums","เฉพาะผลบวกจำกัด"],trap:"T-03"}],unit:""};
  if(sf==="S-05") return {stem:["Σn from 1 to N equals "+s1+". Find N.","Σn จาก 1 ถึง N เท่ากับ "+s1+" จงหา N"],
    opts:[{v:String(n),ok:1},{v:String(s1),trap:"T-03"},{v:String(n*2)},{v:String(Math.round(Math.sqrt(s1)))}],unit:""};
  return {stem:["Evaluate Σn² from n = 1 to "+n+".","จงหาค่า Σn² จาก n = 1 ถึง "+n],
    opts:[{v:String(s2),ok:1},{v:String(s1),trap:"T-03"},{v:String(s1*s1)},{v:String(n*n)}],unit:""};
},
"M-05": function(sf){
  var r=pick([0.5,0.8,1.5,2,-0.4]);
  var conv=Math.abs(r)<1;
  if(sf==="S-04") return {stem:["Can an infinite arithmetic series converge?","อนุกรมเลขคณิตอนันต์ลู่เข้าได้หรือไม่"],
    opts:[{v:["Never — its terms do not shrink to zero","ไม่มีวัน เพราะพจน์ไม่หดเข้าหาศูนย์"],ok:1},
          {v:["Yes, if d is small","ได้ ถ้า d เล็ก"],trap:"T-02"},
          {v:["Yes, if d is negative","ได้ ถ้า d เป็นลบ"],trap:"T-02"},
          {v:["Only if a₁ = 0","เฉพาะเมื่อ a₁ = 0"]}],unit:""};
  return {stem:["Does an infinite geometric series with r = "+r+" converge?",
                "อนุกรมเรขาคณิตอนันต์ที่ r = "+r+" ลู่เข้าหรือไม่"],
    opts:[{v:[conv?"Yes, |r| < 1":"No, |r| ≥ 1", conv?"ลู่เข้า เพราะ |r| < 1":"ไม่ลู่เข้า เพราะ |r| ≥ 1"],ok:1},
          {v:[conv?"No, |r| ≥ 1":"Yes, |r| < 1", conv?"ไม่ลู่เข้า เพราะ |r| ≥ 1":"ลู่เข้า เพราะ |r| < 1"],trap:"T-02"},
          {v:["Only if a₁ > 0","เฉพาะเมื่อ a₁ > 0"]},
          {v:["Always","เสมอ"],trap:"T-02"}],unit:""};
},
"M-06": function(sf){
  var a1=pick([4,6,9,12]), r=pick([0.5,0.25,1/3]);
  var S=a1/(1-r);
  if(sf==="S-03") return {stem:["Express 0.444… as a fraction using an infinite geometric series.",
                                "จงเขียน 0.444… เป็นเศษส่วน โดยใช้อนุกรมเรขาคณิตอนันต์"],
    opts:[{v:"4/9",ok:1},{v:"4/10",trap:"T-02"},{v:"44/99"},{v:"2/5"}],unit:""};
  if(sf==="S-05") return {stem:["An infinite geometric series sums to "+fmt2(S)+" with r = "+fmt2(r)+". Find a₁.",
                                "อนุกรมเรขาคณิตอนันต์มีผลบวก "+fmt2(S)+" โดย r = "+fmt2(r)+" จงหา a₁"],
    opts:[{v:String(a1),ok:1},{v:fmt2(S*r),trap:"T-02"},{v:fmt2(S/r)},{v:fmt2(S)}],unit:""};
  return {stem:["Find the sum to infinity when a₁ = "+a1+" and r = "+fmt2(r)+".",
                "จงหาผลบวกอนันต์ เมื่อ a₁ = "+a1+" และ r = "+fmt2(r)],
    opts:[{v:fmt2(S),ok:1},{v:fmt2(a1/(1+r)),trap:"T-02"},
          {v:fmt2(a1*r)},{v:String(a1)}],unit:""};
}
}
};
