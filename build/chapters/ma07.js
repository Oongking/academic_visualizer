var CHAPTER = {
id:"ma07", num:"07", slug:"exponentials", subject:"math",
kicker:["Mathematics · Chapter 07","คณิตศาสตร์ · บทที่ 7"],
title:["Exponentials and Logs","เอกซ์โพเนนเชียลและลอการิทึม"],
mapTitle:["Growth that multiplies, and the function that undoes it","การเติบโตแบบทวีคูณ และฟังก์ชันที่ย้อนกลับมัน"],
lede:["Almost nothing in the real world grows by adding a fixed amount — money, populations and radioactive samples all change by multiplying. That is the exponential. The logarithm is the question asked backwards: given the result, what was the exponent? Everything in this chapter is those two functions looking at each other in a mirror.",
      "แทบไม่มีสิ่งใดในโลกจริงที่เติบโตด้วยการบวกค่าคงที่ ทั้งเงิน ประชากร และสารกัมมันตรังสี ล้วนเปลี่ยนแปลงด้วยการคูณ นั่นคือเอกซ์โพเนนเชียล ส่วนลอการิทึมคือคำถามเดียวกันที่ถามย้อนกลับ เมื่อรู้ผลลัพธ์แล้วเลขชี้กำลังคืออะไร ทุกอย่างในบทนี้คือฟังก์ชันสองตัวนี้ที่มองหน้ากันอยู่คนละฝั่งของกระจก"],
next:["→ continues in Chapter 08 · Trigonometry","→ ต่อในบทที่ 8 · ตรีโกณมิติ"],

nodes:[
{ id:"indices", x:235, y:52, requires:[], methods:["M-01"],
  title:["Powers, roots and surds","เลขยกกำลัง ราก และกรณฑ์"],
  body:[["The index laws all follow from counting factors. Multiplying adds the indices, aᵐ · aⁿ = aᵐ⁺ⁿ, and dividing subtracts them; a power of a power multiplies them. Push the subtraction past zero and you are forced into a⁰ = 1 and a⁻ⁿ = 1/aⁿ, because aⁿ ÷ aⁿ must be both 1 and a⁰. Push it into fractions and you are forced into a^(1/n) = ⁿ√a. Only 0⁰ resists: 0ⁿ drags the answer towards 0 while a⁰ drags it towards 1, and no single value satisfies both, so it is left undefined.",
         "The radical sign is fussier than it looks. √a means the principal root — the non-negative one — so √4 is 2 alone, even though the second roots of 4 are 2 and −2. That is why ⁿ√(aⁿ) equals a for odd n but |a| for even n, and why √(x²) = |x| rather than x. Dropping those bars is trap T-04: an even root, like an exponential, can never hand back a negative number."],
        ["กฎเลขยกกำลังทั้งหมดมาจากการนับตัวประกอบ การคูณคือการบวกเลขชี้ aᵐ · aⁿ = aᵐ⁺ⁿ การหารคือการลบ และกำลังซ้อนกำลังคือการคูณเลขชี้ เมื่อดันการลบให้ผ่านศูนย์ไป เราจึงถูกบังคับให้ได้ a⁰ = 1 และ a⁻ⁿ = 1/aⁿ เพราะ aⁿ ÷ aⁿ ต้องเท่ากับ 1 และเท่ากับ a⁰ พร้อมกัน และเมื่อดันเข้าไปในเศษส่วนก็ถูกบังคับให้ได้ a^(1/n) = ⁿ√a มีแต่ 0⁰ ที่ขัดขืน เพราะ 0ⁿ ลากคำตอบไปหา 0 แต่ a⁰ ลากไปหา 1 ไม่มีค่าใดตอบได้ทั้งสองทาง จึงไม่นิยาม",
         "เครื่องหมายกรณฑ์จุกจิกกว่าที่เห็น √a หมายถึงค่าหลักซึ่งไม่เป็นลบ ดังนั้น √4 คือ 2 เท่านั้น แม้ว่ารากที่ 2 ของ 4 จะมีทั้ง 2 และ −2 ด้วยเหตุนี้ ⁿ√(aⁿ) จึงเท่ากับ a เมื่อ n เป็นจำนวนคี่ แต่เท่ากับ |a| เมื่อ n เป็นจำนวนคู่ และเป็นเหตุผลที่ √(x²) = |x| ไม่ใช่ x การทิ้งเครื่องหมายค่าสัมบูรณ์คือกับดัก T-04 กรณฑ์คู่ก็เหมือนเอกซ์โพเนนเชียล คือคืนค่าติดลบให้ไม่ได้เลย"]],
  formula:["aᵐ · aⁿ = aᵐ⁺ⁿ        a⁻ⁿ = 1/aⁿ        a^(1/n) = ⁿ√a        √(x²) = |x|","aᵐ · aⁿ = aᵐ⁺ⁿ        a⁻ⁿ = 1/aⁿ        a^(1/n) = ⁿ√a        √(x²) = |x|"],
  flabel:["a⁰ = 1, but 0⁰ is undefined","a⁰ = 1 แต่ 0⁰ ไม่นิยาม"],
  viz:"plot",
  vizcfg:{
    title:["GROWTH AND DECAY MEET AT x = 0","การเติบโตและการลดลงพบกันที่ x = 0"],
    xlab:["x","x"], ylab:["aˣ","aˣ"],
    xmin:-3, xmax:3, ymin:0, fill:false,
    fn:function(x,p){ return Math.pow(p.a,x); },
    mark:function(p){ return p.x; },
    ctrls:[
      {k:"a", lab:["Base a","ฐาน a"], min:.2, max:4, step:.1, def:2, unit:""},
      {k:"x", lab:["Exponent x","เลขชี้กำลัง x"], min:-3, max:3, step:.25, def:1, unit:""}
    ],
    readouts:[
      {lab:["aˣ","aˣ"], f:function(S){ return fmt2(Math.pow(S.p.a,S.p.x)); }},
      {lab:["Value at x = 0","ค่าที่ x = 0"], f:function(S){
        return "1"+(L()?" · ฐานใดก็ให้ 1":" · every base gives 1"); }},
      {lab:["Behaviour","พฤติกรรม"], f:function(S){
        return S.p.a>1 ? (L()?"เติบโต":"growth") : S.p.a<1 ? (L()?"ลดลง":"decay") : (L()?"คงที่":"constant"); }},
      {lab:["Can aˣ be negative?","aˣ เป็นลบได้ไหม"], f:function(){
        return L()?"ไม่ได้ — มันเป็นบวกเสมอ":"never — it is always positive"; }}
    ],
    note:["every exponential passes through (0, 1), whatever the base — that is why a⁰ = 1","เส้นโค้งเลขชี้กำลังทุกเส้นผ่าน (0, 1) ไม่ว่าฐานเป็นอะไร นั่นคือเหตุผลที่ a⁰ = 1"]
  },
  guide:[
    {say:["Base 2. The curve doubles with every step to the right and never touches the axis.",
          "ฐาน 2 เส้นโค้งเพิ่มเป็นสองเท่าทุกก้าวไปทางขวา และไม่เคยแตะแกน"], set:{a:2,x:1}},
    {say:["Drop the base below 1 and it flips into decay — but it still passes through (0, 1).",
          "ลดฐานให้ต่ำกว่า 1 มันพลิกเป็นการลดลง แต่ก็ยังผ่าน (0, 1) อยู่ดี"], set:{a:0.5,x:1}},
    {say:["Set the base to exactly 1 and the curve flattens into a horizontal line at height 1.",
          "ตั้งฐานเป็น 1 พอดี เส้นโค้งแบนกลายเป็นเส้นนอนที่ความสูง 1"], set:{a:1,x:1}}
  ] },

{ id:"exponential", x:100, y:150, requires:["indices"], methods:["M-02"],
  title:["The exponential function","ฟังก์ชันเอกซ์โพเนนเชียล"],
  body:[["An exponential function is y = aˣ with a > 0 and a ≠ 1. The base is fixed and the exponent moves, which is the whole difference from the polynomials of earlier chapters. Because a real number to any real power is still a real number, the domain is the whole of ℝ; because a positive base raised to anything stays positive, the range is only the positive reals, ℝ⁺. The base 1 is barred because 1ˣ is the flat line y = 1, which repeats every value and so has no inverse to invert.",
         "Every such curve passes through the point where the exponent is zero, giving the height 1, and from there its direction is settled entirely by the base: for a > 1 it climbs, for 0 < a < 1 it falls. Slide the base past 1 in the panel and watch the graph reflect. The x-axis is a horizontal asymptote the curve approaches forever and never touches, so an equation that demands aˣ = 0 or aˣ < 0 has no solution at all — trap T-04 — and the climbing-or-falling direction is exactly what decides whether an inequality keeps its sign or flips it, trap T-03."],
        ["ฟังก์ชันเอกซ์โพเนนเชียลคือ y = aˣ เมื่อ a > 0 และ a ≠ 1 ฐานอยู่นิ่งแต่เลขชี้กำลังเคลื่อนที่ นี่คือความต่างทั้งหมดจากพหุนามในบทก่อนหน้า เพราะจำนวนจริงยกกำลังจำนวนจริงใดก็ยังเป็นจำนวนจริง โดเมนจึงเป็น ℝ ทั้งหมด และเพราะฐานบวกยกกำลังอะไรก็ยังเป็นบวก เรนจ์จึงเป็นจำนวนจริงบวก ℝ⁺ เท่านั้น ที่ห้ามฐานเท่ากับ 1 เพราะ 1ˣ คือเส้นตรงแบน y = 1 ซึ่งซ้ำค่าเดิมทุกจุดจึงไม่มีอินเวอร์สให้ย้อนกลับ",
         "กราฟทุกเส้นผ่านจุดที่เลขชี้กำลังเป็นศูนย์ซึ่งให้ความสูงเท่ากับ 1 และจากจุดนั้นทิศทางถูกกำหนดด้วยฐานล้วนๆ ถ้า a > 1 เป็นฟังก์ชันเพิ่ม ถ้า 0 < a < 1 เป็นฟังก์ชันลด ลองเลื่อนฐานผ่าน 1 ในแผงควบคุมแล้วดูกราฟพลิกกลับ แกน x เป็นเส้นกำกับแนวนอนที่กราฟเข้าใกล้ตลอดไปแต่ไม่เคยแตะ ดังนั้นสมการที่เรียกร้องให้ aˣ = 0 หรือ aˣ < 0 จึงไม่มีคำตอบเลย คือกับดัก T-04 และทิศทางขึ้นหรือลงนี่เองที่ตัดสินว่าอสมการจะคงเครื่องหมายเดิมหรือต้องกลับเครื่องหมาย คือกับดัก T-03"]],
  formula:["y = aˣ ,  a > 0 ,  a ≠ 1        domain ℝ ,  range ℝ⁺","y = aˣ ,  a > 0 ,  a ≠ 1        โดเมน ℝ ,  เรนจ์ ℝ⁺"],
  flabel:["Always positive, never zero","เป็นบวกเสมอ ไม่เคยเป็นศูนย์"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){
      var a=p.a, la=Math.log(a);
      if(p.m<0.5) return Math.pow(a,x);
      if(x<=0.02) return -60;
      if(Math.abs(la)<1e-6) return x>1?24:-60;
      return Math.max(-60,Math.min(24,Math.log(x)/la));
    },
    xmin:-3, xmax:3, ymin:-3, ymax:9,
    title:["EXPONENTIAL AND ITS INVERSE","เอกซ์โพเนนเชียลและอินเวอร์สของมัน"],
    xlab:["x","x"], ylab:["y","y"],
    mark:function(p){ return p.m<0.5 ? p.xv : Math.max(p.xv,0.25); },
    ctrls:[
      {k:"a",  lab:["Base a","ฐาน a"],                                        min:0.2, max:4, step:.2,  def:2, unit:""},
      {k:"m", lab:["",""], opts:[["exponential aˣ","เอกซ์โพเนนเชียล aˣ"], ["logarithm logₐ x","ลอการิทึม logₐ x"]], min:0, def:0, unit:""},
      {k:"xv", lab:["Read the curve off at","อ่านค่ากราฟที่"],                  min:-3,  max:3, step:.25, def:1, unit:""}
    ],
    readouts:[
      {lab:["Value at that point","ค่า ณ จุดนั้น"], f:function(S){
        var p=S.p, a=p.a, la=Math.log(a);
        if(p.m<0.5) return fmt2(Math.pow(a,p.xv));
        if(p.xv<=0) return tx(["undefined — the input must be positive","ไม่นิยาม เพราะสิ่งที่อยู่หลัง log ต้องเป็นบวก"]);
        if(Math.abs(la)<1e-6) return tx(["base 1 has no logarithm","ฐาน 1 ไม่มีลอการิทึม"]);
        return fmt2(Math.log(p.xv)/la); }},
      {lab:["Behaviour","ลักษณะกราฟ"], f:function(S){
        var a=S.p.a;
        if(a>0.99&&a<1.01) return tx(["a = 1 is excluded","ฐาน a = 1 ใช้ไม่ได้"]);
        return tx(a>1?["increasing — the base beats 1","ฟังก์ชันเพิ่ม เพราะฐานมากกว่า 1"]
                     :["decreasing — the base is under 1","ฟังก์ชันลด เพราะฐานน้อยกว่า 1"]); }},
      {lab:["Domain and range","โดเมนและเรนจ์"], f:function(S){
        return tx(S.p.m<0.5?["input any real, output above 0","รับจำนวนจริงใดก็ได้ ให้ผลมากกว่า 0"]
                           :["input above 0, output any real","รับค่ามากกว่า 0 ให้ผลเป็นจำนวนจริงใดก็ได้"]); }},
      {lab:["Smallest height drawn","ค่าความสูงต่ำสุดที่วาด"], f:function(S){
        var a=S.p.a, v=a>1?Math.pow(a,-3):Math.pow(a,3);
        return fmt2(v)+" — "+tx(["still above zero","ยังมากกว่าศูนย์"]); }}
    ]
  },
  guide:[
    {say:["Start with a base above 1. The curve climbs left to right, doubling and redoubling, and it passes through height 1 where the exponent is zero. Every base above 1 does this — only the steepness changes.",
          "เริ่มด้วยฐานที่มากกว่า 1 กราฟไต่ขึ้นจากซ้ายไปขวา ทวีคูณแล้วทวีคูณอีก และผ่านความสูง 1 ตรงที่เลขชี้กำลังเป็นศูนย์ ฐานที่มากกว่า 1 ทุกค่าทำแบบนี้ ต่างกันแค่ความชัน"], set:{a:3,m:0,xv:2}},
    {say:["Now drop the base below 1. The same curve reflects and becomes decreasing. Nothing about the function has broken — this is why an inequality solved with a base under 1 must have its sign flipped.",
          "ทีนี้ลดฐานให้ต่ำกว่า 1 กราฟเส้นเดิมพลิกกลับกลายเป็นฟังก์ชันลด ฟังก์ชันไม่ได้เสียหายอะไร นี่คือเหตุผลที่อสมการซึ่งมีฐานน้อยกว่า 1 ต้องกลับเครื่องหมาย"], set:{a:0.4,m:0,xv:2}},
    {say:["Walk the reader out to the far left. The height keeps halving but the readout never prints zero and never prints a minus sign. The x-axis is an asymptote, not a destination, which is why aˣ = 0 has no solution.",
          "เลื่อนตัวอ่านค่าไปทางซ้ายสุด ความสูงลดลงครึ่งหนึ่งเรื่อยๆ แต่ค่าที่อ่านได้ไม่เคยเป็นศูนย์และไม่เคยติดลบ แกน x เป็นเส้นกำกับ ไม่ใช่จุดหมาย จึงเป็นเหตุผลที่ aˣ = 0 ไม่มีคำตอบ"], set:{a:2,m:0,xv:-3}},
    {say:["Switch to the logarithm. It is the same curve reflected in the line through the origin at 45°, so the domain and range have swapped: now the input must be positive and the output may be any real number.",
          "สลับไปที่ลอการิทึม มันคือกราฟเส้นเดิมที่สะท้อนกับเส้นทแยง 45 องศาผ่านจุดกำเนิด โดเมนกับเรนจ์จึงสลับกัน คราวนี้สิ่งที่ป้อนเข้าต้องเป็นบวก ส่วนผลลัพธ์เป็นจำนวนจริงใดก็ได้"], set:{a:2,m:1,xv:1}}
  ]},

{ id:"logarithm", x:370, y:150, requires:["indices"], methods:["M-03"],
  title:["The logarithm","ลอการิทึม"],
  body:[["logₐ x answers one question: what power of a produces x? That makes it the exact inverse of the exponential, and inverses swap domain with range — the logarithm accepts only positive inputs and returns any real number at all. Two special values fall straight out of the definition, logₐ 1 = 0 and logₐ a = 1, together with the cancelling identity a^(logₐ x) = x. Because exponentials turn addition of indices into multiplication of values, logarithms run that backwards: logₐ MN = logₐ M + logₐ N, logₐ (M/N) = logₐ M − logₐ N, and logₐ Mᵏ = k logₐ M. When the base is inconvenient, change it — logₐ M = log M / log a — and the special case logₐ b = 1/log_b a follows.",
         "It is worth being precise about what the laws do not say. They convert a product into a sum; they say nothing whatever about a sum inside the log. logₐ (M + N) is not logₐ M + logₐ N, a quotient of logs is not the log of a quotient, and (logₐ M)ᵏ is not logₐ Mᵏ. Inventing any of these is trap T-01, and it is the single most common error in the chapter. The second discipline is the domain: writing log(x − 3) has already committed you to x > 3, so every candidate solution must be substituted back and any that makes an argument zero or negative must be thrown out — trap T-02."],
        ["logₐ x ตอบคำถามเดียวคือ a ยกกำลังเท่าไรจึงได้ x นั่นทำให้มันเป็นอินเวอร์สของเอกซ์โพเนนเชียลพอดี และอินเวอร์สจะสลับโดเมนกับเรนจ์ ลอการิทึมจึงรับเฉพาะค่าบวกและคืนจำนวนจริงใดก็ได้ ค่าพิเศษสองค่าตกออกมาจากนิยามตรงๆ คือ logₐ 1 = 0 และ logₐ a = 1 พร้อมกับเอกลักษณ์หักล้าง a^(logₐ x) = x เพราะเอกซ์โพเนนเชียลเปลี่ยนการบวกเลขชี้ให้เป็นการคูณค่า ลอการิทึมจึงย้อนกลับ logₐ MN = logₐ M + logₐ N, logₐ (M/N) = logₐ M − logₐ N และ logₐ Mᵏ = k logₐ M เมื่อฐานไม่สะดวกก็เปลี่ยนฐาน logₐ M = log M / log a และได้กรณีพิเศษ logₐ b = 1/log_b a ตามมา",
         "ควรพูดให้ชัดว่ากฎเหล่านี้ไม่ได้พูดถึงอะไร มันเปลี่ยนผลคูณให้เป็นผลบวก แต่ไม่ได้บอกอะไรเลยเกี่ยวกับผลบวกที่อยู่ข้างใน logₐ (M + N) ไม่เท่ากับ logₐ M + logₐ N ผลหารของ log ไม่ใช่ log ของผลหาร และ (logₐ M)ᵏ ไม่ใช่ logₐ Mᵏ การประดิษฐ์กฎเหล่านี้ขึ้นเองคือกับดัก T-01 ซึ่งเป็นความผิดพลาดที่พบบ่อยที่สุดในบทนี้ วินัยข้อที่สองคือโดเมน การเขียน log(x − 3) เท่ากับยอมรับไปแล้วว่า x > 3 ดังนั้นคำตอบที่ได้ทุกค่าต้องแทนกลับ และค่าใดที่ทำให้สิ่งหลัง log เป็นศูนย์หรือติดลบต้องตัดทิ้ง คือกับดัก T-02"]],
  formula:["logₐ MN = logₐ M + logₐ N        logₐ M = log M / log a","logₐ MN = logₐ M + logₐ N        logₐ M = log M / log a"],
  flabel:["Products become sums — sums do not","ผลคูณกลายเป็นผลบวก แต่ผลบวกไม่กลาย"],
  viz:"plot",
  vizcfg:{
    title:["THE LOGARITHM UNDOES THE POWER","ลอการิทึมย้อนการยกกำลัง"],
    xlab:["x","x"], ylab:["log_a x","log_a x"],
    xmin:.05, xmax:10, fill:false,
    fn:function(x,p){ return Math.log(x)/Math.log(p.a); },
    mark:function(p){ return p.x; },
    ctrls:[
      {k:"a", lab:["Base a","ฐาน a"], min:1.2, max:10, step:.2, def:2, unit:""},
      {k:"x", lab:["Input x","อินพุต x"], min:.1, max:9.5, step:.1, def:8, unit:""}
    ],
    readouts:[
      {lab:["log_a x","log_a x"], f:function(S){ return fmt2(Math.log(S.p.x)/Math.log(S.p.a)); }},
      {lab:["Check","ตรวจสอบ"], f:function(S){
        return fmt(S.p.a)+" ^ "+fmt2(Math.log(S.p.x)/Math.log(S.p.a))+" = "+fmt2(S.p.x); }},
      {lab:["Value at x = 1","ค่าที่ x = 1"], f:function(){
        return "0"+(L()?" · ทุกฐาน":" · for every base"); }},
      {lab:["Domain","โดเมน"], f:function(){
        return L()?"x > 0 เท่านั้น — ลอการิทึมของศูนย์หรือจำนวนลบไม่มี":"x > 0 only — no log of zero or a negative"; }}
    ],
    note:["the curve dives towards minus infinity near zero but never reaches x = 0","เส้นโค้งดิ่งลงสู่ลบอนันต์เมื่อเข้าใกล้ศูนย์ แต่ไม่เคยไปถึง x = 0"]
  } },

{ id:"equations", x:235, y:248, requires:["exponential","logarithm"], methods:["M-04","M-05"],
  title:["Solving the equations","การแก้สมการ"],
  body:[["There are three moves, and they are tried in order. First, match the bases: rewrite both sides over one base and the exponents must agree, so 2^(3y) · 4 = 16^(y−3) becomes 2^(3y+2) = 2^(4y−12) and then 3y + 2 = 4y − 12. Second, match the exponents: if the two sides share an exponent but the bases genuinely differ, as in 21^(x−3) = 6^(3x−9) where 3x − 9 = 3(x − 3), the only way out is for that shared exponent to be zero. Third, when neither works — 2ˣ = 3^(x+1) has no common base — take logs of both sides and the unknown drops out of the exponent into an ordinary linear equation.",
         "When the same power turns up twice, as in 3^(2x) − 2 · 3ˣ − 3 = 0 or 3ˣ + 3^(2−x) = 4√3, substitute A = 3ˣ, clear the fractions and solve the quadratic in A. Then comes the step people skip: convert back and test. A root giving A ≤ 0 is not a solution, because 3ˣ is strictly positive and no real x makes it negative — trap T-04 — and in a log equation any root that makes an argument non-positive goes the same way, trap T-02. For inequalities the extra care is the base: above 1 the sign is kept, but between 0 and 1 the function is decreasing and the sign must be flipped, trap T-03."],
        ["มีสามท่า และลองไล่ตามลำดับ ท่าแรกจัดฐานเท่า เขียนสองข้างให้อยู่บนฐานเดียวกันแล้วเลขชี้กำลังต้องเท่ากัน ดังนั้น 2^(3y) · 4 = 16^(y−3) กลายเป็น 2^(3y+2) = 2^(4y−12) แล้วได้ 3y + 2 = 4y − 12 ท่าที่สองจัดเลขชี้เท่า ถ้าสองข้างมีเลขชี้กำลังเดียวกันแต่ฐานต่างกันจริงๆ อย่าง 21^(x−3) = 6^(3x−9) ซึ่ง 3x − 9 = 3(x − 3) ทางออกเดียวคือเลขชี้ร่วมนั้นต้องเป็นศูนย์ ท่าที่สาม เมื่อสองท่าแรกใช้ไม่ได้ อย่าง 2ˣ = 3^(x+1) ที่ไม่มีฐานร่วม ให้ take log ทั้งสองข้าง ตัวไม่รู้ค่าจะหล่นลงมาจากเลขชี้กลายเป็นสมการเชิงเส้นธรรมดา",
         "เมื่อกำลังเดิมโผล่มาสองครั้ง อย่าง 3^(2x) − 2 · 3ˣ − 3 = 0 หรือ 3ˣ + 3^(2−x) = 4√3 ให้ตั้งตัวแปรแทน A = 3ˣ คูณล้างเศษส่วนแล้วแก้สมการกำลังสองใน A จากนั้นคือขั้นที่คนมักข้าม แปลงกลับแล้วตรวจคำตอบ รากที่ให้ A ≤ 0 ไม่ใช่คำตอบ เพราะ 3ˣ เป็นบวกเสมอและไม่มี x จริงใดทำให้มันติดลบ คือกับดัก T-04 ส่วนในสมการ log รากใดที่ทำให้สิ่งหลัง log ไม่เป็นบวกก็ต้องตัดทิ้งเช่นกัน คือกับดัก T-02 สำหรับอสมการต้องระวังเพิ่มที่ฐาน ฐานมากกว่า 1 ใช้เครื่องหมายเดิม แต่ฐานระหว่าง 0 กับ 1 ฟังก์ชันเป็นฟังก์ชันลด ต้องกลับเครื่องหมาย คือกับดัก T-03"]],
  formula:["aᵐ = aⁿ ⇒ m = n        aⁿ = bⁿ , a ≠ b ⇒ n = 0        else take logs","aᵐ = aⁿ ⇒ m = n        aⁿ = bⁿ , a ≠ b ⇒ n = 0        ถ้าไม่ได้ให้ take log"],
  flabel:["Match bases, match exponents, or take logs","จัดฐานเท่า จัดเลขชี้เท่า หรือ take log"],
  viz:"plot",
  vizcfg:{
    title:["SOLVING aˣ = b BY READING THE GRAPH","แก้ aˣ = b ด้วยการอ่านกราฟ"],
    xlab:["x","x"], ylab:["aˣ","aˣ"],
    xmin:-2, xmax:5, ymin:0, fill:false,
    fn:function(x,p){ return Math.pow(p.a,x); },
    mark:function(p){ return Math.log(p.b)/Math.log(p.a); },
    ctrls:[
      {k:"a", lab:["Base a","ฐาน a"], min:1.2, max:5, step:.1, def:2, unit:""},
      {k:"b", lab:["Target value b","ค่าเป้าหมาย b"], min:.5, max:30, step:.5, def:8, unit:""}
    ],
    readouts:[
      {lab:["Solution x","คำตอบ x"], f:function(S){
        return fmt2(Math.log(S.p.b)/Math.log(S.p.a)); }},
      {lab:["Written as","เขียนได้เป็น"], f:function(S){
        return "x = log_"+fmt(S.p.a)+" "+fmt(S.p.b); }},
      {lab:["Change of base","การเปลี่ยนฐาน"], f:function(S){
        return "log "+fmt(S.p.b)+" / log "+fmt(S.p.a); }},
      {lab:["If b were negative","ถ้า b เป็นลบ"], f:function(){
        return L()?"ไม่มีคำตอบ — aˣ เป็นบวกเสมอ":"no solution — aˣ is always positive"; }}
    ],
    note:["taking a logarithm is simply asking the graph where it reaches a given height","การใส่ลอการิทึมคือการถามกราฟว่ามันไปถึงความสูงที่กำหนดตรงไหน"]
  } },

{ id:"applications", x:235, y:346, requires:["equations"], methods:["M-06"],
  title:["Interest, decay and log scales","ดอกเบี้ย การสลายตัว และสเกลลอการิทึม"],
  body:[["Compound interest is the exponential wearing a suit: A = P(1 + r/n)^(nt) for n compoundings a year, and A = Pe^(rt) when the compounding is continuous. Growth and decay use the same skeleton with the sign of the exponent switched, N = N₀e^(−λt), and a half-life is nothing more than the time that makes the bracket one half. Any question asking how long instead of how much is answered by taking logs, because the unknown is sitting in the exponent and logs are the only tool that brings it down.",
         "A log scale — pH, decibels, the Richter magnitude, stellar brightness — is the logarithm used as a ruler. Each step of one along the scale is one multiplication by the base, so magnitude 7 is not two units worse than magnitude 5, it is a hundred times the ground motion. Reading such a scale additively is the same reflex as writing log(A + B) = log A + log B, and it is tagged as trap T-01 for exactly that reason. The matching error in decay problems is announcing that the sample is gone after a few half-lives; each halving leaves a smaller positive amount and the total never reaches zero, which is trap T-04 again."],
        ["ดอกเบี้ยทบต้นคือเอกซ์โพเนนเชียลที่ใส่สูท A = P(1 + r/n)^(nt) เมื่อทบต้น n ครั้งต่อปี และ A = Pe^(rt) เมื่อทบต้นต่อเนื่อง การเติบโตและการสลายตัวใช้โครงเดียวกันเพียงสลับเครื่องหมายเลขชี้ N = N₀e^(−λt) ส่วนครึ่งชีวิตก็คือเวลาที่ทำให้ค่าในวงเล็บเหลือครึ่งหนึ่งเท่านั้นเอง คำถามที่ถามว่านานเท่าไรแทนที่จะถามว่าเท่าไร ตอบได้ด้วยการ take log เพราะตัวไม่รู้ค่านั่งอยู่บนเลขชี้ และ log เป็นเครื่องมือเดียวที่ดึงมันลงมาได้",
         "สเกลลอการิทึม ไม่ว่าจะเป็น pH เดซิเบล ริกเตอร์ หรือความสว่างของดาว คือลอการิทึมที่ถูกใช้เป็นไม้บรรทัด การขยับหนึ่งขั้นบนสเกลคือการคูณด้วยฐานหนึ่งครั้ง ดังนั้นขนาด 7 ไม่ได้แย่กว่าขนาด 5 อยู่สองหน่วย แต่แรงสั่นสะเทือนมากกว่ากันร้อยเท่า การอ่านสเกลแบบบวกลบคือปฏิกิริยาเดียวกับการเขียน log(A + B) = log A + log B จึงติดป้ายเป็นกับดัก T-01 ด้วยเหตุผลนั้นพอดี ความผิดพลาดคู่กันในโจทย์การสลายตัวคือการประกาศว่าสารหมดไปแล้วหลังผ่านไปไม่กี่ครึ่งชีวิต การลดลงครึ่งหนึ่งแต่ละครั้งเหลือปริมาณบวกที่เล็กลง และผลรวมไม่เคยถึงศูนย์ ซึ่งก็คือกับดัก T-04 อีกครั้ง"]],
  formula:["A = P(1 + r/n)^(nt)        A = Pe^(rt)        N = N₀e^(−λt)","A = P(1 + r/n)^(nt)        A = Pe^(rt)        N = N₀e^(−λt)"],
  flabel:["Every step of 1 is one more multiplication","ทุกขั้นที่เพิ่ม 1 คือคูณเพิ่มอีกหนึ่งครั้ง"],
  viz:"plot",
  vizcfg:{
    title:["COMPOUND GROWTH OVER TIME","การเติบโตทบต้นตามเวลา"],
    xlab:["years","ปี"], ylab:["amount","จำนวนเงิน"],
    xmin:0, xmax:30, ymin:0, fill:false,
    fn:function(x,p){ return p.P*Math.pow(1+p.r/100, x); },
    mark:function(p){ return p.t; },
    ctrls:[
      {k:"P", lab:["Starting amount","เงินต้น"], min:100, max:5000, step:100, def:1000, unit:""},
      {k:"r", lab:["Rate per year","อัตราต่อปี"], min:1, max:20, step:.5, def:7, unit:" %"},
      {k:"t", lab:["Years elapsed","ผ่านไปกี่ปี"], min:0, max:29, step:1, def:10, unit:""}
    ],
    readouts:[
      {lab:["Amount then","จำนวนเงินตอนนั้น"], f:function(S){
        return fmt2(S.p.P*Math.pow(1+S.p.r/100,S.p.t)); }},
      {lab:["Doubling time","เวลาที่เงินเป็นสองเท่า"], f:function(S){
        return fmt2(Math.log(2)/Math.log(1+S.p.r/100))+(L()?" ปี":" years"); }},
      {lab:["Rule of 70 estimate","ประมาณด้วยกฎเลข 70"], f:function(S){
        return fmt2(70/S.p.r)+(L()?" ปี":" years"); }},
      {lab:["Simple interest would give","ดอกเบี้ยคงต้นจะให้"], f:function(S){
        return fmt2(S.p.P*(1+S.p.r*S.p.t/100)); }}
    ],
    note:["finding the doubling time means inverting an exponential — which is what a logarithm is for","การหาเวลาที่เงินเป็นสองเท่าคือการย้อนฟังก์ชันเลขชี้กำลัง ซึ่งเป็นหน้าที่ของลอการิทึม"]
  } }
],

methods:[
{id:"M-01", name:["Apply index laws and simplify surds","ใช้กฎเลขยกกำลังและลดรูปกรณฑ์"]},
{id:"M-02", name:["Read the exponential graph, domain and range","อ่านกราฟเอกซ์โพเนนเชียล โดเมนและเรนจ์"]},
{id:"M-03", name:["Apply the log laws and change of base","ใช้สูตรลอการิทึมและการเปลี่ยนฐาน"]},
{id:"M-04", name:["Solve an exponential equation","แก้สมการเอกซ์โพเนนเชียล"]},
{id:"M-05", name:["Solve a log equation or inequality","แก้สมการหรืออสมการลอการิทึม"]},
{id:"M-06", name:["Apply growth, decay and log scales","ใช้การเติบโต การสลายตัว และสเกลลอการิทึม"]}
],

traps:{
"T-01":["A log turns a product into a sum, never a sum into a sum. log(A + B) ≠ log A + log B, and one step along a log scale is a multiplication.","log เปลี่ยนผลคูณเป็นผลบวก ไม่ใช่เปลี่ยนผลบวกเป็นผลบวก log(A + B) ≠ log A + log B และการขยับหนึ่งขั้นบนสเกลลอการิทึมคือการคูณ"],
"T-02":["Whatever sits behind a log must be positive. Substitute every root back and discard any that makes an argument zero or negative.","สิ่งที่อยู่หลัง log ต้องเป็นบวก ให้แทนรากทุกค่ากลับไป แล้วตัดค่าที่ทำให้สิ่งหลัง log เป็นศูนย์หรือติดลบทิ้ง"],
"T-03":["Unwrapping an inequality keeps the sign only when the base is above 1. For a base between 0 and 1 the function decreases, so the sign flips.","การปลดฐานในอสมการคงเครื่องหมายเดิมได้เฉพาะเมื่อฐานมากกว่า 1 ถ้าฐานอยู่ระหว่าง 0 กับ 1 ฟังก์ชันเป็นฟังก์ชันลด ต้องกลับเครื่องหมาย"],
"T-04":["aˣ is strictly positive — never zero, never negative — and an even root is never negative either. Any answer that needs one to be is not an answer.","aˣ เป็นบวกเสมอ ไม่เป็นศูนย์และไม่ติดลบ กรณฑ์คู่ก็ไม่ติดลบเช่นกัน คำตอบใดที่ต้องการให้มันติดลบ ย่อมไม่ใช่คำตอบ"]
},

gen:{
"M-01": function(sf){
  if(sf==="S-04") return {stem:["Which statement holds for every real number x?","ข้อใดเป็นจริงสำหรับจำนวนจริง x ทุกค่า"],
    opts:[{v:["√(x²) = |x|","√(x²) = |x|"],ok:1},
          {v:["√(x²) = x","√(x²) = x"],trap:"T-04"},
          {v:["√(x²) = ±x","√(x²) = ±x"],trap:"T-04"},
          {v:["∛(x³) = |x|","∛(x³) = |x|"],trap:"T-04"}],unit:""};
  if(sf==="S-05"){
    var e=pick([{b:2,n:5},{b:2,n:6},{b:3,n:4},{b:5,n:3}]);
    var w=Math.pow(e.b,e.n);
    return {stem:[e.b+"ⁿ = 1/"+w+". Find n.",e.b+"ⁿ = 1/"+w+" จงหา n"],
      opts:[{v:String(-e.n),ok:1},{v:String(e.n),trap:"T-04"},{v:String(-w)},{v:"1/"+e.n}],unit:""};
  }
  if(sf==="S-03"){
    var f=pick([8,10,12]), th=0.1*Math.pow(2,f);
    return {stem:["A sheet of paper 0.1 mm thick is folded in half "+f+" times. How thick is the stack, in millimetres?",
                  "กระดาษหนา 0.1 มม. ถูกพับครึ่ง "+f+" ครั้ง ปึกกระดาษจะหนากี่มิลลิเมตร"],
      opts:[{v:fmt2(th),ok:1},{v:fmt2(0.1*2*f),trap:"T-01"},{v:fmt2(0.1*f*f)},{v:String(Math.pow(2,f))}],unit:""};
  }
  var q=pick([{q:"8^(−2/3)",a:"1/4",  w:["−4","4","64"]},
              {q:"27^(−2/3)",a:"1/9", w:["−9","9","1/3"]},
              {q:"16^(−3/4)",a:"1/8", w:["−8","8","1/16"]},
              {q:"32^(−1/5)",a:"1/2", w:["−2","2","1/32"]}]);
  return {stem:["Evaluate "+q.q+".","จงหาค่าของ "+q.q],
    opts:[{v:q.a,ok:1},{v:q.w[0],trap:"T-04"},{v:q.w[1]},{v:q.w[2]}],unit:""};
},
"M-02": function(sf){
  if(sf==="S-02") return {stem:["A graph of y = aˣ falls steadily from left to right and stays above the x-axis. What is true of a?",
                                "กราฟ y = aˣ ลดลงเรื่อยๆ จากซ้ายไปขวาและอยู่เหนือแกน x เสมอ ข้อใดจริงเกี่ยวกับ a"],
    opts:[{v:["0 < a < 1","0 < a < 1"],ok:1},
          {v:["a > 1","a > 1"],trap:"T-03"},
          {v:["a < 0","a < 0"],trap:"T-04"},
          {v:["a = 1","a = 1"]}],unit:""};
  if(sf==="S-04") return {stem:["What is the range of y = aˣ when a > 0 and a ≠ 1?","เรนจ์ของ y = aˣ เมื่อ a > 0 และ a ≠ 1 คืออะไร"],
    opts:[{v:["every y greater than 0","y ทุกค่าที่มากกว่า 0"],ok:1},
          {v:["every y greater than or equal to 0","y ทุกค่าที่มากกว่าหรือเท่ากับ 0"],trap:"T-04"},
          {v:["every real y","y จำนวนจริงทุกค่า"],trap:"T-04"},
          {v:["every y greater than 1","y ทุกค่าที่มากกว่า 1"]}],unit:""};
  if(sf==="S-05"){
    var b=pick([2,3,4,5]), h=Math.pow(b,3);
    return {stem:["The curve y = aˣ passes through the point where x = 3 and y = "+h+". Find a.",
                  "กราฟ y = aˣ ผ่านจุดที่ x เท่ากับ 3 และ y เท่ากับ "+h+" จงหา a"],
      opts:[{v:String(b),ok:1},{v:String(-b),trap:"T-04"},{v:String(h)},{v:fmt(h/3)}],unit:""};
  }
  var t=pick([{b:2,a:"1/4",n:"−4",s:"4"},{b:3,a:"1/9",n:"−9",s:"9"},
              {b:4,a:"1/16",n:"−16",s:"16"},{b:5,a:"1/25",n:"−25",s:"25"}]);
  return {stem:["For y = "+t.b+"ˣ, find y when the exponent is −2.","สำหรับ y = "+t.b+"ˣ จงหา y เมื่อเลขชี้กำลังเป็น −2"],
    opts:[{v:t.a,ok:1},{v:t.n,trap:"T-04"},{v:"0",trap:"T-04"},{v:t.s}],unit:""};
},
"M-03": function(sf){
  if(sf==="S-04") return {stem:["Which of these is a genuine law of logarithms?","ข้อใดเป็นสูตรลอการิทึมที่ถูกต้องจริง"],
    opts:[{v:["logₐ M + logₐ N = logₐ MN","logₐ M + logₐ N = logₐ MN"],ok:1},
          {v:["logₐ (M + N) = logₐ M + logₐ N","logₐ (M + N) = logₐ M + logₐ N"],trap:"T-01"},
          {v:["logₐ (M/N) = logₐ M / logₐ N","logₐ (M/N) = logₐ M / logₐ N"],trap:"T-01"},
          {v:["logₐ Mᵏ = (logₐ M)ᵏ","logₐ Mᵏ = (logₐ M)ᵏ"],trap:"T-01"}],unit:""};
  if(sf==="S-03"){
    var n=pick([7,11,13]), m=pick([20,30,50]);
    return {stem:["Your calculator only has the common log, base 10. Which expression gives log base "+n+" of "+m+"?",
                  "เครื่องคิดเลขมีแต่ลอการิทึมสามัญฐาน 10 นิพจน์ใดให้ค่า log ฐาน "+n+" ของ "+m],
      opts:[{v:["log "+m+" / log "+n,"log "+m+" / log "+n],ok:1},
            {v:["log "+m+" − log "+n,"log "+m+" − log "+n],trap:"T-01"},
            {v:["log ("+m+" + "+n+")","log ("+m+" + "+n+")"],trap:"T-01"},
            {v:["log "+n+" / log "+m,"log "+n+" / log "+m]}],unit:""};
  }
  if(sf==="S-05"){
    var e=pick([{b:2,n:5},{b:3,n:4},{b:5,n:3},{b:2,n:3}]);
    var v=Math.pow(e.b,e.n);
    return {stem:["log to base a of "+v+" equals "+e.n+". Find a.","log ฐาน a ของ "+v+" เท่ากับ "+e.n+" จงหา a"],
      opts:[{v:String(e.b),ok:1},{v:String(-e.b),trap:"T-04"},{v:String(e.n)},{v:String(v)}],unit:""};
  }
  return {stem:["Given log 2 = 0.301 and log 3 = 0.477, find log 12.","กำหนด log 2 = 0.301 และ log 3 = 0.477 จงหา log 12"],
    opts:[{v:"1.079",ok:1},{v:"1.301",trap:"T-01"},{v:"0.778"},{v:"0.602"}],unit:""};
},
"M-04": function(sf){
  if(sf==="S-04") return {stem:["2ˣ = 3^(x+1) has no common base and no common exponent. What is the correct next move?",
                                "2ˣ = 3^(x+1) ไม่มีฐานร่วมและไม่มีเลขชี้ร่วม ขั้นต่อไปที่ถูกต้องคืออะไร"],
    opts:[{v:["Take logs of both sides, giving x log 2 = (x + 1) log 3","take log ทั้งสองข้าง จะได้ x log 2 = (x + 1) log 3"],ok:1},
          {v:["Subtract, since log 2 − log 3 = log (2 − 3)","ลบกัน เพราะ log 2 − log 3 = log (2 − 3)"],trap:"T-01"},
          {v:["Equate the exponents to get x = x + 1","จับเลขชี้เท่ากันได้ x = x + 1"]},
          {v:["Cancel x from both sides and read off 2 = 3","ตัด x ทั้งสองข้างแล้วสรุปว่า 2 = 3"]}],unit:""};
  if(sf==="S-05"){
    var r=pick([{b:2,p:4,q:2},{b:3,p:9,q:2},{b:5,p:25,q:2},{b:2,p:8,q:3}]);
    return {stem:["Substituting A = "+r.b+"ˣ turned an equation into a quadratic whose roots are A = "+r.p+" and A = −1. Find x.",
                  "การตั้งตัวแปรแทน A = "+r.b+"ˣ ทำให้สมการกลายเป็นกำลังสองที่มีราก A = "+r.p+" และ A = −1 จงหา x"],
      opts:[{v:["x = "+r.q+" only, since A = −1 is impossible","x = "+r.q+" เท่านั้น เพราะ A = −1 เป็นไปไม่ได้"],ok:1},
            {v:["x = "+r.q+" or x = −1","x = "+r.q+" หรือ x = −1"],trap:"T-04"},
            {v:["x = "+r.p+" or x = −1","x = "+r.p+" หรือ x = −1"],trap:"T-04"},
            {v:["x = "+r.q+" or x = 0","x = "+r.q+" หรือ x = 0"]}],unit:""};
  }
  if(sf==="S-03"){
    var h=pick([2,3,4]);
    return {stem:["Culture A holds 3ᵗ cells and culture B holds 9^(t−"+h+") cells after t hours. At what t are they equal?",
                  "หลังผ่านไป t ชั่วโมง อาณานิคม A มี 3ᵗ เซลล์ และอาณานิคม B มี 9^(t−"+h+") เซลล์ ที่ t เท่าใดจึงเท่ากัน"],
      opts:[{v:String(2*h),ok:1},{v:String(h)},{v:String(4*h)},{v:String(-2*h),trap:"T-04"}],unit:""};
  }
  var k=pick([2,3,4,5]);
  return {stem:["Solve 2^(3y) · 4 = 16^(y − "+k+") for y.","จงแก้สมการ 2^(3y) · 4 = 16^(y − "+k+") หาค่า y"],
    opts:[{v:String(4*k+2),ok:1},{v:String(4*k)},{v:String(-(4*k+2))},{v:String(k+2)}],unit:""};
},
"M-05": function(sf){
  if(sf==="S-04") return {stem:["Solve (1/2)^(x²) > 1/16.","จงแก้อสมการ (1/2)^(x²) > 1/16"],
    opts:[{v:["−2 < x < 2","−2 < x < 2"],ok:1},
          {v:["x < −2 or x > 2","x < −2 หรือ x > 2"],trap:"T-03"},
          {v:["x² > 4","x² > 4"],trap:"T-03"},
          {v:["−4 < x < 4","−4 < x < 4"]}],unit:""};
  if(sf==="S-05") return {stem:["Solving log(x + 5) + log(x − 5) = log 11 gave the two roots x = 6 and x = −6. Which of them are genuine solutions?",
                                "การแก้ log(x + 5) + log(x − 5) = log 11 ได้สองราก คือ x = 6 และ x = −6 รากใดเป็นคำตอบจริง"],
    opts:[{v:["x = 6 only","x = 6 เท่านั้น"],ok:1},
          {v:["both roots","ทั้งสองราก"],trap:"T-02"},
          {v:["x = −6 only","x = −6 เท่านั้น"],trap:"T-02"},
          {v:["neither root","ไม่มีรากใดใช้ได้"]}],unit:""};
  if(sf==="S-03"){
    var d=pick([4,5,6]);
    return {stem:["A drug loses 20% of its concentration every hour, so the fraction left after n hours is (0.8)ⁿ. After how many whole hours does it first fall below 40%?",
                  "ยาชนิดหนึ่งมีความเข้มข้นลดลง 20% ทุกชั่วโมง สัดส่วนที่เหลือหลัง n ชั่วโมงคือ (0.8)ⁿ กี่ชั่วโมงเต็มที่มันจะต่ำกว่า 40% เป็นครั้งแรก"],
      opts:[{v:["5 hours","5 ชั่วโมง"],ok:1},
            {v:["4 hours","4 ชั่วโมง"],trap:"T-03"},
            {v:["It never falls below 40%","ไม่มีวันต่ำกว่า 40%"],trap:"T-04"},
            {v:[String(d-2)+" hours",String(d-2)+" ชั่วโมง"]}],unit:""};
  }
  return {stem:["Solve log₂ x + log₂ (x − 2) = 3.","จงแก้สมการ log₂ x + log₂ (x − 2) = 3"],
    opts:[{v:["x = 4 only","x = 4 เท่านั้น"],ok:1},
          {v:["x = 4 or x = −2","x = 4 หรือ x = −2"],trap:"T-02"},
          {v:["x = −2 only","x = −2 เท่านั้น"],trap:"T-02"},
          {v:["x = 3","x = 3"]}],unit:""};
},
"M-06": function(sf){
  if(sf==="S-04"){
    var g=pick([2,3,4]);
    return {stem:["On the Richter scale each whole step is a tenfold increase in ground motion. How much stronger is a magnitude "+(5+g)+" quake than a magnitude 5 one?",
                  "บนมาตราริกเตอร์ ทุกหนึ่งขั้นเต็มคือแรงสั่นสะเทือนเพิ่มสิบเท่า แผ่นดินไหวขนาด "+(5+g)+" แรงกว่าขนาด 5 กี่เท่า"],
      opts:[{v:String(Math.pow(10,g))+"×",ok:1},
            {v:String(g)+"×",trap:"T-01"},
            {v:String(10*g)+"×",trap:"T-01"},
            {v:"10×"}],unit:""};
  }
  if(sf==="S-03"){
    var m0=pick([400,800,1200]), hl=pick([4,5,6]), k3=3;
    return {stem:["A "+m0+" g sample has a half-life of "+hl+" days. How many grams remain after "+(k3*hl)+" days?",
                  "สารตัวอย่าง "+m0+" กรัม มีครึ่งชีวิต "+hl+" วัน เมื่อผ่านไป "+(k3*hl)+" วัน จะเหลือกี่กรัม"],
      opts:[{v:fmt2(m0/8),ok:1},{v:"0",trap:"T-04"},{v:fmt2(m0/3),trap:"T-01"},{v:fmt2(m0/2)}],unit:""};
  }
  if(sf==="S-05"){
    var rr=pick([4,5,8]);
    return {stem:["A population follows N = N₀e^(rt) with r = 0."+(rr<10?"0"+rr:rr)+" per year. How many years does it take to double? Use ln 2 = 0.693.",
                  "ประชากรเป็นไปตาม N = N₀e^(rt) โดย r = 0."+(rr<10?"0"+rr:rr)+" ต่อปี ต้องใช้เวลากี่ปีจึงเพิ่มเป็นสองเท่า ใช้ ln 2 = 0.693"],
      opts:[{v:fmt(69.3/rr),ok:1},{v:fmt(100/rr)},{v:fmt(200/rr)},{v:fmt(2*rr)}],unit:""};
  }
  var P=pick([10000,20000,50000]), r2=pick([5,6,8]), t2=pick([3,5]);
  var A=Math.round(P*Math.pow(1+r2/100,t2));
  return {stem:[P+" baht is invested at "+r2+"% per year, compounded annually. What is it worth after "+t2+" years, to the nearest baht?",
                "ลงทุน "+P+" บาท ที่อัตรา "+r2+"% ต่อปี ทบต้นปีละครั้ง เมื่อครบ "+t2+" ปี จะมีมูลค่ากี่บาท ปัดเป็นจำนวนเต็ม"],
    opts:[{v:String(A),ok:1},
          {v:String(Math.round(P*(1+r2*t2/100))),trap:"T-01"},
          {v:String(Math.round(P*(1+r2/100))),trap:"T-01"},
          {v:String(Math.round(P*r2*t2/100))}],unit:""};
}
}
};
