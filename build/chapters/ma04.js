var CHAPTER = {
id:"ma04", num:"04", slug:"functions", subject:"math",
kicker:["Mathematics · Chapter 04","คณิตศาสตร์ · บทที่ 4"],
title:["Relations and Functions","ความสัมพันธ์และฟังก์ชัน"],
mapTitle:["One input, one output — and everything that follows from it","หนึ่งอินพุต หนึ่งเอาต์พุต และทุกอย่างที่ตามมา"],
lede:["A relation is any bag of ordered pairs at all. A function is a relation that has made one promise — one input, one output — and almost every object in later mathematics is built from things that keep that promise. This chapter is about testing whether the promise holds, and what you are allowed to do once it does.",
      "ความสัมพันธ์คือถุงที่บรรจุคู่อันดับกลุ่มใดก็ได้ ส่วนฟังก์ชันคือความสัมพันธ์ที่ให้คำสัญญาไว้ข้อหนึ่ง คือหนึ่งอินพุตต่อหนึ่งเอาต์พุต และสิ่งที่คณิตศาสตร์บทถัดๆ ไปสร้างขึ้นเกือบทั้งหมดล้วนรักษาคำสัญญานี้ บทนี้ว่าด้วยการตรวจว่าคำสัญญายังอยู่หรือไม่ และเมื่ออยู่แล้วเราทำอะไรกับมันได้บ้าง"],
next:["→ continues in Chapter 05 · Analytic Geometry","→ ต่อในบทที่ 5 · เรขาคณิตวิเคราะห์"],

nodes:[
{ id:"relations", x:235, y:52, requires:[], methods:["M-01"],
  title:["Ordered pairs and relations","คู่อันดับและความสัมพันธ์"],
  body:[["An ordered pair (a, b) records two things and, unlike a set, insists on which one came first. So (2, 5) and (5, 2) are different objects, and (a, b) = (c, d) holds only when a = c and b = d. The Cartesian product A × B is the exhaustive catalogue of such pairs — every element of A matched against every element of B — which makes n(A × B) = n(A) · n(B).",
         "A relation from A to B is nothing more exotic than a subset of A × B: any collection of those pairs you care to select. Because each of the n(A)·n(B) pairs is independently either taken or left out, the number of possible relations is 2 raised to n(A)·n(B) — the power-set count from Chapter 1 wearing new clothes. The empty set counts as a relation too, and A × B is not the same thing as B × A unless the two sets are equal."],
        ["คู่อันดับ (a, b) บันทึกสองสิ่งพร้อมกันโดยยืนกรานว่าสิ่งใดมาก่อน ต่างจากเซตตรงจุดนี้ (2, 5) กับ (5, 2) จึงเป็นคนละตัว และ (a, b) = (c, d) ก็ต่อเมื่อ a = c และ b = d ผลคูณคาร์ทีเซียน A × B คือรายการคู่อันดับทั้งหมดอย่างไม่ขาดตกบกพร่อง จับสมาชิกทุกตัวของ A กับสมาชิกทุกตัวของ B ทำให้ n(A × B) = n(A) · n(B)",
         "ความสัมพันธ์จาก A ไป B ไม่ใช่อะไรที่แปลกไปกว่าสับเซตของ A × B คือกลุ่มคู่อันดับกลุ่มใดก็ได้ที่เราเลือกหยิบมา เพราะคู่อันดับแต่ละคู่ในทั้งหมด n(A)·n(B) คู่ เลือกได้อิสระว่าจะหยิบหรือไม่หยิบ จำนวนความสัมพันธ์ที่เป็นไปได้จึงเท่ากับ 2 ยกกำลัง n(A)·n(B) ซึ่งคือการนับเพาเวอร์เซตจากบทที่ 1 ที่เปลี่ยนเสื้อผ้าใหม่ เซตว่างก็นับเป็นความสัมพันธ์ด้วย และ A × B ไม่ใช่สิ่งเดียวกับ B × A เว้นแต่สองเซตนั้นจะเท่ากัน"]],
  formula:["A × B = {(x, y) | x ∈ A, y ∈ B}        relations = 2^(n(A)·n(B))","A × B = {(x, y) | x ∈ A, y ∈ B}        จำนวนความสัมพันธ์ = 2^(n(A)·n(B))"],
  flabel:["Each pair is taken or left","คู่อันดับแต่ละคู่เลือกหยิบหรือไม่หยิบ"],
  viz:"grid",
  vizcfg:{
    title:["WHICH RELATIONS ARE FUNCTIONS","ความสัมพันธ์ใดเป็นฟังก์ชัน"],
    cols:[["Relation","ความสัมพันธ์"],["A function?","เป็นฟังก์ชันไหม"],["Reason","เหตุผล"]],
    ctrls:[{k:"i", lab:["Highlight row","เน้นแถวที่"], min:0, max:4, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Verdict","คำตัดสิน"], f:function(S){
        return [1,0,1,0,1][S.p.i] ? (L()?"เป็นฟังก์ชัน":"a function") : (L()?"ไม่เป็นฟังก์ชัน":"not a function"); }},
      {lab:["The rule","กฎ"], f:function(){
        return L()?"หนึ่งอินพุตให้ได้เอาต์พุตเดียวเท่านั้น":"each input may have exactly one output"; }},
      {lab:["Repeated outputs","เอาต์พุตซ้ำ"], f:function(){
        return L()?"อนุญาต — ห้ามเฉพาะอินพุตซ้ำ":"allowed — only repeated inputs are fatal"; }}
    ],
    rows:function(p){
      var R=[[["{(1,2),(2,4),(3,6)}","{(1,2),(2,4),(3,6)}"],["yes","ใช่"],["every input used once","อินพุตแต่ละตัวใช้ครั้งเดียว"]],
             [["{(1,2),(1,5),(2,4)}","{(1,2),(1,5),(2,4)}"],["no","ไม่"],["input 1 has two outputs","อินพุต 1 มีสองเอาต์พุต"]],
             [["{(1,7),(2,7),(3,7)}","{(1,7),(2,7),(3,7)}"],["yes","ใช่"],["repeated OUTPUTS are fine","เอาต์พุตซ้ำไม่เป็นไร"]],
             [["y² = x","y² = x"],["no","ไม่"],["x = 4 gives y = ±2","x = 4 ให้ y = ±2"]],
             [["y = x²","y = x²"],["yes","ใช่"],["one y for every x","แต่ละ x ให้ y เดียว"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===1?([1,0,1,0,1][i]?"good":"warn"):"accent"}; }); });
    },
    note:["the vertical line test is this rule drawn as a picture","การทดสอบเส้นแนวตั้งคือกฎข้อนี้ที่วาดออกมาเป็นภาพ"]
  } },

{ id:"domain-range", x:100, y:150, requires:["relations"], methods:["M-02"],
  title:["Domain and range","โดเมนและเรนจ์"],
  body:[["The domain of a relation is the set of all first members, the range the set of all second members. When the relation arrives as a list of pairs you simply read them off. When it arrives as a rule you have to ask a harder question — which x may be fed in at all, and which y can come back out. Arranging y in terms of x is what tests the domain; arranging x in terms of y is what tests the range.",
         "Four restrictions do nearly all the work. A denominator may never be zero. An even root may never be handed a negative number. A square is never negative, and neither is an absolute value, so those two limit the range rather than the domain. Declaring the answer to be all of R without checking these four is trap T-03, and it is the commonest way to lose a mark on algebra that was otherwise correct."],
        ["โดเมนของความสัมพันธ์คือเซตของสมาชิกตัวหน้าทั้งหมด ส่วนเรนจ์คือเซตของสมาชิกตัวหลังทั้งหมด ถ้าโจทย์ให้มาเป็นรายการคู่อันดับก็อ่านออกมาได้ตรงๆ แต่ถ้าให้มาเป็นสมการต้องถามคำถามที่ยากกว่า คือ x ตัวใดใส่เข้าไปได้บ้าง และ y ตัวใดออกมาได้บ้าง การจัด y ในเทอมของ x คือการตรวจโดเมน การจัด x ในเทอมของ y คือการตรวจเรนจ์",
         "ข้อจำกัดสี่แบบทำงานเกือบทั้งหมด ตัวส่วนห้ามเป็นศูนย์ กรณฑ์ที่เป็นคู่ห้ามรับจำนวนลบ กำลังสองไม่มีทางติดลบ และค่าสัมบูรณ์ก็เช่นกัน สองข้อหลังจึงจำกัดเรนจ์มากกว่าโดเมน การตอบว่าเป็นจำนวนจริงทั้งหมดโดยไม่ตรวจสี่ข้อนี้คือกับดัก T-03 และเป็นวิธีเสียคะแนนที่พบบ่อยที่สุดทั้งที่พีชคณิตถูกหมดแล้ว"]],
  formula:["denominator ≠ 0 · even root ≥ 0 · square ≥ 0 · absolute value ≥ 0","ตัวส่วน ≠ 0 · กรณฑ์คู่ ≥ 0 · กำลังสอง ≥ 0 · ค่าสัมบูรณ์ ≥ 0"],
  flabel:["Four restrictions, checked every time","ข้อจำกัดสี่แบบ ตรวจทุกครั้ง"],
  viz:"numline",
  vizcfg:{
    title:["WHAT GOES IN, AND WHAT COMES OUT","อะไรเข้าไป และอะไรออกมา"],
    min:-6, max:10,
    ctrls:[{k:"f", lab:["0 √x · 1 1/x · 2 x² · 3 sin x","0 √x · 1 1/x · 2 x² · 3 sin x"], min:0, max:3, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Function","ฟังก์ชัน"], f:function(S){ return ["√x","1/x","x²","sin x"][S.p.f]; }},
      {lab:["Domain","โดเมน"], f:function(S){
        return [["x ≥ 0","x ≥ 0"],["x ≠ 0","x ≠ 0"],["all real x","x จริงทุกค่า"],["all real x","x จริงทุกค่า"]][S.p.f][L()]; }},
      {lab:["Range","เรนจ์"], f:function(S){
        return [["y ≥ 0","y ≥ 0"],["y ≠ 0","y ≠ 0"],["y ≥ 0","y ≥ 0"],["−1 ≤ y ≤ 1","−1 ≤ y ≤ 1"]][S.p.f][L()]; }},
      {lab:["What restricts it","อะไรเป็นข้อจำกัด"], f:function(S){
        return [["no square root of a negative","ไม่มีรากที่สองของจำนวนลบ"],["no division by zero","หารด้วยศูนย์ไม่ได้"],
                ["nothing restricts the input","ไม่มีอะไรจำกัดอินพุต"],["nothing restricts the input","ไม่มีอะไรจำกัดอินพุต"]][S.p.f][L()]; }}
    ],
    regions:function(p){
      var D=[[0,10],[-6,10],[-6,10],[-6,10]][p.f];
      var R=[[0,10],[-6,10],[0,10],[-1,1]][p.f];
      return [{a:D[0],b:D[1],col:"accent",lab:["domain (inputs)","โดเมน (อินพุต)"]},
              {a:R[0],b:R[1],col:"good",lab:["range (outputs)","เรนจ์ (เอาต์พุต)"]}];
    },
    points:function(p){
      return p.f===1 ? [{v:0, lab:["excluded","ถูกตัดออก"], col:"warn", open:true}] : [];
    },
    note:["the domain is what you are allowed to feed in; the range is what can actually come out","โดเมนคือสิ่งที่ใส่เข้าไปได้ เรนจ์คือสิ่งที่ออกมาได้จริง"]
  } },

{ id:"functions", x:370, y:150, requires:["relations"], methods:["M-03","M-04"],
  title:["Functions and the two line tests","ฟังก์ชันและการทดสอบด้วยเส้นสองแบบ"],
  body:[["A function is a relation carrying one extra promise: no two of its pairs share a first member and then disagree about the second. Feed it an x and exactly one y comes back. On a graph that promise is visible — every line parallel to the y-axis meets the curve at most once. A relation that fails this test, such as a circle or a parabola lying on its side, is still a perfectly good relation. It is simply not a function.",
         "Being one-to-one is a second and stronger promise: no two different inputs may share an output. For that you draw lines parallel to the x-axis instead, and if any one of them cuts twice the function is not one-to-one. Slide both test lines across the four candidate curves in the lab and the parabola makes the point on its own — it passes the vertical test and fails the horizontal one. Keep the two other labels straight as well: f from A to B is into when the range sits inside B, and onto when the range fills B exactly. Confusing which line answers which question is trap T-02."],
        ["ฟังก์ชันคือความสัมพันธ์ที่มีคำสัญญาเพิ่มมาอีกหนึ่งข้อ คือไม่มีคู่อันดับสองคู่ใดที่สมาชิกตัวหน้าเท่ากันแล้วสมาชิกตัวหลังต่างกัน ใส่ x เข้าไปแล้วได้ y กลับมาเพียงตัวเดียว บนกราฟคำสัญญานี้มองเห็นได้ เส้นทุกเส้นที่ขนานแกน y ตัดกราฟได้ไม่เกินหนึ่งจุด ความสัมพันธ์ที่สอบตกการทดสอบนี้ เช่น วงกลมหรือพาราโบลาที่นอนตะแคง ก็ยังเป็นความสัมพันธ์ที่ดีอยู่ เพียงแต่ไม่ใช่ฟังก์ชัน",
         "การเป็นหนึ่งต่อหนึ่งคือคำสัญญาข้อที่สองซึ่งแข็งกว่า คือห้ามมีอินพุตสองตัวที่ต่างกันแล้วให้เอาต์พุตเดียวกัน คราวนี้ต้องลากเส้นขนานแกน x แทน ถ้ามีเส้นใดตัดสองจุด ฟังก์ชันนั้นก็ไม่เป็นหนึ่งต่อหนึ่ง ลองเลื่อนเส้นทดสอบทั้งสองบนกราฟทั้งสี่แบบในห้องทดลอง พาราโบลาจะแสดงประเด็นนี้ด้วยตัวมันเอง มันผ่านการทดสอบแนวตั้งแต่ไม่ผ่านแนวนอน อีกสองคำก็ต้องแยกให้ออก f จาก A ไป B เป็นฟังก์ชันไป B เมื่อเรนจ์อยู่ภายใน B และเป็นฟังก์ชันไปทั่วถึง B เมื่อเรนจ์เต็ม B พอดี การสับสนว่าเส้นใดตอบคำถามใดคือกับดัก T-02"]],
  formula:["vertical line cuts once → a function        horizontal line cuts once → 1-1","เส้นขนานแกน y ตัดจุดเดียว → เป็นฟังก์ชัน        เส้นขนานแกน x ตัดจุดเดียว → เป็น 1-1"],
  flabel:["Two lines, two different questions","สองเส้น สองคำถามคนละเรื่อง"],
  viz:"plot",
  vizcfg:{
    fn:function(v,p){
      if(p.mode===0) return 2*v-1;                       /* straight line   */
      if(p.mode===1) return 0.5*v*v-3;                   /* parabola        */
      if(p.mode===2) return v*v*v/8;                     /* cubic           */
      return Math.sqrt(Math.max(0,16-v*v));              /* upper半 circle  */
    },
    xmin:-4, xmax:4, fill:false,
    title:["THE CANDIDATE CURVE","กราฟที่นำมาทดสอบ"],
    xlab:["input","อินพุต"], ylab:["output","เอาต์พุต"],
    mark:function(p){ return p.c; },
    /* the horizontal test needs its line drawn too - the node teaches both
       tests, and only the vertical one was on the plate */
    hline:function(p){ return p.k; },
    ctrls:[
      {k:"mode", lab:["0 line · 1 parabola · 2 cubic · 3 half-circle","0 เส้นตรง · 1 พาราโบลา · 2 ลูกบาศก์ · 3 ครึ่งวงกลม"],
       min:0, max:3, step:1, def:0, unit:""},
      {k:"c", lab:["Vertical test line","เส้นทดสอบแนวตั้ง"],   min:-4, max:4, step:.5, def:2, unit:""},
      {k:"k", lab:["Horizontal test line","เส้นทดสอบแนวนอน"], min:-6, max:6, step:.5, def:3, unit:""}
    ],
    readouts:[
      {lab:["Vertical line meets the curve at","เส้นแนวตั้งพบกราฟที่"], f:function(S){
        var m=S.p.mode;
        var F=function(v){ return m===0?2*v-1 : m===1?0.5*v*v-3 : m===2?v*v*v/8 : Math.sqrt(Math.max(0,16-v*v)); };
        return fmt2(F(S.p.c))+(L()?" · ค่าเดียว จึงเป็นฟังก์ชัน":" · one value, so it is a function"); }},
      {lab:["Horizontal line crossings","จำนวนจุดตัดของเส้นแนวนอน"], f:function(S){
        var m=S.p.mode, k=S.p.k, n=0, prev=null;
        var F=function(v){ return m===0?2*v-1 : m===1?0.5*v*v-3 : m===2?v*v*v/8 : Math.sqrt(Math.max(0,16-v*v)); };
        for(var i=0;i<=400;i++){
          var d=F(-4+8*i/400)-k, s=d>0?1:(d<0?-1:0);
          if(s===0){ n++; prev=null; continue; }
          if(prev!==null && s!==prev) n++;
          prev=s;
        }
        return String(n)+(n>1?(L()?" จุด · ไม่เป็น 1-1":" · not one-to-one"):(L()?" จุด":"")); }},
      {lab:["One-to-one","หนึ่งต่อหนึ่ง"], f:function(S){
        var one=(S.p.mode===0||S.p.mode===2);
        return one?(L()?"ใช่":"Yes"):(L()?"ไม่ใช่":"No"); }},
      {lab:["Reflected in the diagonal","เมื่อสะท้อนผ่านเส้นทแยง"], f:function(S){
        var R=[["y = (x + 1)/2 · a function","y = (x + 1)/2 · เป็นฟังก์ชัน"],
               ["y = ±√(2x + 6) · two branches, not a function","y = ±√(2x + 6) · สองแขนง ไม่เป็นฟังก์ชัน"],
               ["y = ∛(8x) · a function","y = ∛(8x) · เป็นฟังก์ชัน"],
               ["the right half-circle · not a function","ครึ่งวงกลมด้านขวา · ไม่เป็นฟังก์ชัน"]];
        return R[S.p.mode][L()]; }}
    ]
  },
  guide:[
    {say:["Start with the straight line. Slide the vertical marker anywhere you like — it always meets the curve exactly once, so this relation is a function. The horizontal line crosses once as well, so it is one-to-one into the bargain.",
          "เริ่มที่เส้นตรง เลื่อนเครื่องหมายแนวตั้งไปที่ใดก็ได้ มันตัดกราฟหนึ่งจุดเสมอ ความสัมพันธ์นี้จึงเป็นฟังก์ชัน และเส้นแนวนอนก็ตัดจุดเดียวเช่นกัน จึงเป็นหนึ่งต่อหนึ่งไปด้วยในตัว"], set:{mode:0,c:2,k:3}},
    {say:["Now the parabola. The vertical line still cuts once, so it is still a function. But the horizontal line finds two crossings: two different inputs deliver the same output, and one-to-one has failed.",
          "คราวนี้พาราโบลา เส้นแนวตั้งยังตัดจุดเดียว มันจึงยังเป็นฟังก์ชัน แต่เส้นแนวนอนพบจุดตัดสองจุด อินพุตสองตัวที่ต่างกันให้เอาต์พุตเดียวกัน ความเป็นหนึ่งต่อหนึ่งจึงตกไป"], set:{mode:1,c:2,k:1}},
    {say:["The cubic climbs the whole way across, so no horizontal line can catch it twice. Both tests pass, and the last readout confirms that its reflection in the diagonal is still a function.",
          "กราฟลูกบาศก์ไต่ขึ้นตลอดช่วง เส้นแนวนอนจึงไม่มีทางจับมันได้สองจุด ผ่านทั้งสองการทดสอบ และค่าที่อ่านได้ช่องสุดท้ายยืนยันว่าภาพสะท้อนผ่านเส้นทแยงของมันยังเป็นฟังก์ชัน"], set:{mode:2,c:2,k:3}},
    {say:["The half-circle is an even function, symmetric about the vertical axis, so every horizontal line below the top cuts twice. Reflect it in the diagonal and you get the right half-circle, which a vertical line cuts twice — a relation, but no longer a function.",
          "ครึ่งวงกลมเป็นฟังก์ชันคู่ สมมาตรรอบแกนตั้ง เส้นแนวนอนทุกเส้นที่ต่ำกว่ายอดจึงตัดสองจุด สะท้อนมันผ่านเส้นทแยงจะได้ครึ่งวงกลมด้านขวา ซึ่งเส้นแนวตั้งตัดสองจุด เป็นความสัมพันธ์ แต่ไม่ใช่ฟังก์ชันอีกต่อไป"], set:{mode:3,c:2,k:2}}
  ]},

{ id:"inverse", x:235, y:248, requires:["domain-range","functions"], methods:["M-05"],
  title:["Inverse functions","ฟังก์ชันผกผัน"],
  body:[["The inverse relation is built by turning every pair around: (a, b) becomes (b, a). For a rule that means writing the equation, swapping the two letters, and solving for the output again. Geometrically the swap is a reflection in the diagonal line where the two variables are equal, which is why a function and its inverse always look like mirror images across that line. And because the pairs have been reversed, the domain of the inverse is the range of the original and the range of the inverse is the original domain.",
         "Every function has an inverse relation. Only a one-to-one function has an inverse that is again a function. Reflect the parabola from the lab in the diagonal and you get a parabola lying on its side: one input, two outputs, vertical test failed. Assuming that the inverse of any function must be a function is trap T-02, and it is exactly why exam questions restrict the domain of a parabola before asking you to invert it."],
        ["ความสัมพันธ์ผกผันสร้างขึ้นโดยกลับคู่อันดับทุกคู่ (a, b) กลายเป็น (b, a) ถ้าเป็นสมการก็คือเขียนสมการออกมา สลับที่ตัวแปรสองตัว แล้วจัดรูปหาเอาต์พุตใหม่ ในเชิงเรขาคณิตการสลับนี้คือการสะท้อนผ่านเส้นทแยงที่ตัวแปรทั้งสองเท่ากัน กราฟของฟังก์ชันกับอินเวอร์สของมันจึงเป็นภาพในกระจกของกันและกันผ่านเส้นนั้นเสมอ และเพราะคู่อันดับถูกกลับด้าน โดเมนของอินเวอร์สจึงเท่ากับเรนจ์ของตัวเดิม และเรนจ์ของอินเวอร์สก็เท่ากับโดเมนเดิม",
         "ทุกฟังก์ชันมีความสัมพันธ์ผกผัน แต่มีเพียงฟังก์ชันหนึ่งต่อหนึ่งเท่านั้นที่ผกผันแล้วยังเป็นฟังก์ชัน ลองสะท้อนพาราโบลาในห้องทดลองผ่านเส้นทแยงจะได้พาราโบลาที่นอนตะแคง หนึ่งอินพุตให้สองเอาต์พุต สอบแนวตั้งไม่ผ่าน การเหมาว่าอินเวอร์สของฟังก์ชันใดก็ตามต้องเป็นฟังก์ชันคือกับดัก T-02 และนั่นคือเหตุผลที่โจทย์มักจำกัดโดเมนของพาราโบลาก่อนจะสั่งให้หาอินเวอร์ส"]],
  formula:["D(f⁻¹) = R(f)        R(f⁻¹) = D(f)","D(f⁻¹) = R(f)        R(f⁻¹) = D(f)"],
  flabel:["Domain and range trade places","โดเมนกับเรนจ์สลับที่กัน"],
  viz:"plot",
  vizcfg:{
    title:["A FUNCTION AND ITS INVERSE SWAP AXES","ฟังก์ชันกับตัวผกผันสลับแกนกัน"],
    xlab:["x","x"], ylab:["y","y"],
    xmin:-1, xmax:9, fill:false,
    fn:function(x,p){
      if(p.which===0) return p.m*x + p.c;
      return (x - p.c)/p.m;
    },
    ctrls:[
      {k:"which", lab:["0 f(x) · 1 its inverse","0 f(x) · 1 ตัวผกผัน"], min:0, max:1, step:1, def:0, unit:""},
      {k:"m",     lab:["Gradient m","ความชัน m"], min:.3, max:3, step:.1, def:2, unit:""},
      {k:"c",     lab:["Intercept c","จุดตัดแกน c"], min:-3, max:4, step:.5, def:1, unit:""}
    ],
    readouts:[
      {lab:["Showing","กำลังแสดง"], f:function(S){
        return S.p.which===0 ? ("f(x) = "+fmt(S.p.m)+"x + "+fmt(S.p.c))
                             : ("f⁻¹(x) = (x − "+fmt(S.p.c)+") / "+fmt(S.p.m)); }},
      {lab:["Gradient shown","ความชันที่แสดง"], f:function(S){
        return fmt2(S.p.which===0 ? S.p.m : 1/S.p.m); }},
      {lab:["Relationship","ความสัมพันธ์"], f:function(){
        return L()?"สะท้อนกันในเส้น y = x":"reflections of each other in the line y = x"; }},
      {lab:["f⁻¹ means","f⁻¹ หมายถึง"], f:function(){
        return L()?"ฟังก์ชันผกผัน ไม่ใช่ 1/f":"the inverse function, never 1/f"; }}
    ],
    note:["switch between the two and watch the gradient turn into its reciprocal","สลับดูทั้งสอง แล้วสังเกตว่าความชันกลายเป็นส่วนกลับของมัน"]
  },
  guide:[
    {say:["The original line climbs at gradient 2 and cuts the y-axis at 1.",
          "เส้นเดิมไต่ขึ้นด้วยความชัน 2 และตัดแกน y ที่ 1"], set:{which:0,m:2,c:1}},
    {say:["Its inverse has gradient ½ — reflecting in y = x turns any slope into its reciprocal.",
          "ตัวผกผันมีความชัน ½ การสะท้อนในเส้น y = x เปลี่ยนความชันใดก็ตามเป็นส่วนกลับของมัน"], set:{which:1,m:2,c:1}},
    {say:["Set the gradient to 1 and the two coincide. A line of slope 1 is its own inverse.",
          "ตั้งความชันเป็น 1 แล้วทั้งสองทับกัน เส้นที่มีความชัน 1 เป็นตัวผกผันของตัวเอง"], set:{which:1,m:1,c:0}}
  ] },

{ id:"composite", x:235, y:346, requires:["inverse"], methods:["M-06"],
  title:["Composite functions","ฟังก์ชันประกอบ"],
  body:[["Composition feeds one machine's output straight into the next. The symbol g ∘ f applied to an input means g(f(x)): f runs first even though g is written first, because the input sits nearest to f. The composite can be evaluated wherever the middle step makes sense, which requires R(f) ∩ D(g) to be non-empty, and its domain is the set of inputs in D(f) whose images actually land inside D(g).",
         "Two facts about order cause most of the damage. Reading g ∘ f as g first and f second is trap T-04 — always work from the inside outwards. And undoing a composite reverses the queue: the inverse of f ∘ g is g⁻¹ ∘ f⁻¹, in the same way that removing shoes before socks undoes putting on socks before shoes. Writing f⁻¹ ∘ g⁻¹ instead is trap T-01, and the identical reversal turns up again for products in the matrix chapter."],
        ["ฟังก์ชันประกอบคือการป้อนเอาต์พุตของเครื่องหนึ่งเข้าไปในอีกเครื่องโดยตรง สัญลักษณ์ g ∘ f ที่กระทำกับอินพุตหมายถึง g(f(x)) นั่นคือ f ทำงานก่อนทั้งที่ g เขียนอยู่ข้างหน้า เพราะอินพุตอยู่ติดกับ f มากกว่า ฟังก์ชันประกอบหาค่าได้เมื่อขั้นกลางมีความหมาย ซึ่งต้องมี R(f) ∩ D(g) ไม่เป็นเซตว่าง และโดเมนของมันคือเซตของอินพุตใน D(f) ที่ภาพของมันตกลงไปใน D(g) จริงๆ",
         "ข้อเท็จจริงเรื่องลำดับสองข้อสร้างความเสียหายมากที่สุด การอ่าน g ∘ f ว่าทำ g ก่อนแล้วค่อย f คือกับดัก T-04 ให้ทำจากในออกนอกเสมอ และการแก้ฟังก์ชันประกอบกลับจะสลับคิว อินเวอร์สของ f ∘ g คือ g⁻¹ ∘ f⁻¹ ทำนองเดียวกับที่การถอดรองเท้าก่อนถุงเท้าเป็นการแก้การใส่ถุงเท้าก่อนรองเท้า การเขียนเป็น f⁻¹ ∘ g⁻¹ คือกับดัก T-01 และการสลับลำดับแบบเดียวกันนี้จะกลับมาอีกครั้งกับผลคูณในบทเมทริกซ์"]],
  formula:["(g ∘ f)(x) = g(f(x))        (f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹","(g ∘ f)(x) = g(f(x))        (f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹"],
  flabel:["Inside out, and reversed when undone","ทำจากในออกนอก และสลับลำดับเมื่อผกผัน"],
  viz:"plot",
  vizcfg:{
    title:["ORDER MATTERS IN A COMPOSITION","ลำดับสำคัญในฟังก์ชันประกอบ"],
    xlab:["x","x"], ylab:["output","ผลลัพธ์"],
    xmin:-3, xmax:3, fill:false,
    fn:function(x,p){
      var f=function(t){ return p.a*t + p.b; };
      var g=function(t){ return t*t; };
      return p.order===0 ? f(g(x)) : g(f(x));
    },
    mark:function(p){ return p.x; },
    ctrls:[
      {k:"order", lab:["0 f(g(x)) · 1 g(f(x))","0 f(g(x)) · 1 g(f(x))"], min:0, max:1, step:1, def:0, unit:""},
      {k:"a",     lab:["f: multiply by a","f: คูณด้วย a"], min:-3, max:3, step:.5, def:2, unit:""},
      {k:"b",     lab:["f: then add b","f: แล้วบวก b"], min:-4, max:4, step:.5, def:1, unit:""},
      {k:"x",     lab:["Test x","ทดสอบที่ x"], min:-3, max:3, step:.25, def:2, unit:""}
    ],
    readouts:[
      {lab:["f(x)","f(x)"], f:function(S){ return fmt2(S.p.a*S.p.x+S.p.b); }},
      {lab:["g(x) = x²","g(x) = x²"], f:function(S){ return fmt2(S.p.x*S.p.x); }},
      {lab:["f(g(x))","f(g(x))"], f:function(S){ return fmt2(S.p.a*S.p.x*S.p.x+S.p.b); }},
      {lab:["g(f(x))","g(f(x))"], f:function(S){
        var v=S.p.a*S.p.x+S.p.b; return fmt2(v*v); }}
    ],
    note:["the two readouts almost never agree — composition is not commutative","ค่าที่แสดงสองค่านี้แทบไม่เคยเท่ากัน การประกอบฟังก์ชันไม่มีสมบัติสลับที่"]
  },
  guide:[
    {say:["f(g(x)) squares first, then applies the linear step. The result is a plain parabola.",
          "f(g(x)) ยกกำลังสองก่อน แล้วค่อยทำขั้นเชิงเส้น ผลลัพธ์เป็นพาราโบลาธรรมดา"], set:{order:0,a:2,b:1,x:2}},
    {say:["Swap the order. Now the linear step comes first and the parabola shifts sideways.",
          "สลับลำดับ ตอนนี้ขั้นเชิงเส้นมาก่อน และพาราโบลาเลื่อนไปด้านข้าง"], set:{order:1,a:2,b:1,x:2}},
    {say:["Compare the last two readouts at the same x. Different numbers, same two functions.",
          "เทียบค่าสองค่าสุดท้ายที่ x เดียวกัน ตัวเลขต่างกัน ทั้งที่เป็นฟังก์ชันสองตัวเดิม"], set:{order:1,a:2,b:1,x:1.5}}
  ] }
],

methods:[
{id:"M-01", name:["Build A × B and count relations","สร้าง A × B และนับจำนวนความสัมพันธ์"]},
{id:"M-02", name:["Find domain and range with restrictions","หาโดเมนและเรนจ์พร้อมข้อจำกัด"]},
{id:"M-03", name:["Test for a function and for one-to-one","ตรวจการเป็นฟังก์ชันและการเป็นหนึ่งต่อหนึ่ง"]},
{id:"M-04", name:["Distinguish into from onto and count functions","แยกฟังก์ชันไปกับไปทั่วถึง และนับจำนวนฟังก์ชัน"]},
{id:"M-05", name:["Find an inverse function","หาฟังก์ชันผกผัน"]},
{id:"M-06", name:["Evaluate and unpick composite functions","หาค่าและแกะฟังก์ชันประกอบ"]}
],

traps:{
"T-01":["The inverse of a composite reverses the order: (f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹, not f⁻¹ ∘ g⁻¹.","อินเวอร์สของฟังก์ชันประกอบต้องสลับลำดับ (f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹ ไม่ใช่ f⁻¹ ∘ g⁻¹"],
"T-02":["The vertical line decides whether it is a function; the horizontal line decides whether it is one-to-one. Only a one-to-one function has an inverse that is again a function.","เส้นขนานแกน y ตัดสินว่าเป็นฟังก์ชันหรือไม่ เส้นขนานแกน x ตัดสินว่าเป็นหนึ่งต่อหนึ่งหรือไม่ และมีเพียงฟังก์ชันหนึ่งต่อหนึ่งเท่านั้นที่อินเวอร์สยังเป็นฟังก์ชัน"],
"T-03":["Check every restriction before answering: denominator ≠ 0, even root ≥ 0, and a square or absolute value is never negative.","ตรวจข้อจำกัดให้ครบก่อนตอบ ตัวส่วน ≠ 0 กรณฑ์คู่ ≥ 0 และกำลังสองหรือค่าสัมบูรณ์ไม่มีทางติดลบ"],
"T-04":["g ∘ f means f runs first and g second. Work from the inside outwards, not left to right.","g ∘ f หมายถึง f ทำก่อนแล้ว g ทำทีหลัง ให้ไล่จากในออกนอก ไม่ใช่จากซ้ายไปขวา"]
},

gen:{
"M-01": function(sf){
  if(sf==="S-04") return {stem:["Which statement about ordered pairs and products is always true?","ข้อใดเป็นจริงเสมอเกี่ยวกับคู่อันดับและผลคูณคาร์ทีเซียน"],
    opts:[{v:["(a, b) = (c, d) only when a = c and b = d","(a, b) = (c, d) ก็ต่อเมื่อ a = c และ b = d"],ok:1},
          {v:["(a, b) and (b, a) are the same pair","(a, b) กับ (b, a) เป็นคู่อันดับเดียวกัน"]},
          {v:["A × B = B × A for all sets A and B","A × B = B × A สำหรับทุกเซต A และ B"]},
          {v:["n(A × B) = n(A) + n(B)","n(A × B) = n(A) + n(B)"]}],unit:""};
  if(sf==="S-05"){
    var q=pick([{a:3,b:2},{a:2,b:2},{a:4,b:2},{a:3,b:3}]);
    var tot=Math.pow(2,q.a*q.b);
    return {stem:["There are "+tot+" different relations from A to B, and n(A) = "+q.a+". Find n(B).",
                  "มีความสัมพันธ์จาก A ไป B ทั้งหมด "+tot+" ความสัมพันธ์ และ n(A) = "+q.a+" จงหา n(B)"],
      opts:[{v:String(q.b),ok:1},{v:String(q.a*q.b)},{v:String(tot/2)},{v:String(q.a+q.b)}],unit:""};
  }
  if(sf==="S-03"){
    var m=pick([4,5,6]), d=pick([3,4]);
    return {stem:["A canteen offers "+m+" main dishes and "+d+" desserts. How many different (main, dessert) pairs can be ordered?",
                  "โรงอาหารมีอาหารจานหลัก "+m+" อย่างและของหวาน "+d+" อย่าง สั่งเป็นคู่อันดับ (จานหลัก, ของหวาน) ได้กี่แบบ"],
      opts:[{v:String(m*d),ok:1},{v:String(m+d)},{v:String(Math.pow(2,m*d))},{v:String(Math.pow(m,d))}],unit:""};
  }
  var A=pick([2,3]), B=pick([2,3]);
  return {stem:["n(A) = "+A+" and n(B) = "+B+". How many relations are there from A to B?",
                "n(A) = "+A+" และ n(B) = "+B+" มีความสัมพันธ์จาก A ไป B กี่ความสัมพันธ์"],
    opts:[{v:String(Math.pow(2,A*B)),ok:1},{v:String(A*B)},{v:String(Math.pow(2,A+B))},{v:String(Math.pow(B,A))}],unit:""};
},
"M-02": function(sf){
  if(sf==="S-04") return {stem:["Which restriction fixes the domain rather than the range?","ข้อจำกัดใดกำหนดโดเมน ไม่ใช่เรนจ์"],
    opts:[{v:["A denominator may not be zero","ตัวส่วนห้ามเป็นศูนย์"],ok:1},
          {v:["A square is never negative","กำลังสองไม่มีทางติดลบ"],trap:"T-03"},
          {v:["An absolute value is never negative","ค่าสัมบูรณ์ไม่มีทางติดลบ"],trap:"T-03"},
          {v:["No restriction ever affects the domain","ไม่มีข้อจำกัดใดกระทบโดเมนเลย"],trap:"T-03"}],unit:""};
  if(sf==="S-05") return {stem:["A rule has domain {x | x ≥ 4} because of an even root. Which rule is it?",
                                "สมการหนึ่งมีโดเมน {x | x ≥ 4} เพราะติดกรณฑ์คู่ สมการนั้นคือข้อใด"],
    opts:[{v:"y = √(2x − 8)",ok:1},{v:"y = √(8 − 2x)"},{v:"y = 1/(x − 4)",trap:"T-03"},{v:"y = (x − 4)²",trap:"T-03"}],unit:""};
  if(sf==="S-03"){
    var f=pick([50,80,120]);
    return {stem:["A copy shop spreads a "+f+"-baht setup fee over n copies, so the cost per copy is "+f+"/n + 2 baht. For which n is that expression undefined?",
                  "ร้านถ่ายเอกสารเฉลี่ยค่าตั้งเครื่อง "+f+" บาทลงบนสำเนา n แผ่น ต้นทุนต่อแผ่นจึงเป็น "+f+"/n + 2 บาท จำนวน n ใดที่ทำให้นิพจน์นี้หาค่าไม่ได้"],
      opts:[{v:["n = 0","n = 0"],ok:1},
            {v:["It is defined for every n","หาค่าได้สำหรับทุกค่า n"],trap:"T-03"},
            {v:["n = 2","n = 2"]},
            {v:["n = −2","n = −2"]}],unit:""};
  }
  var C=pick([
    {r:"y = 3/(x + 2)", q:["the domain","โดเมน"], a:"R − {−2}",    w:["R − {0}","{x | x ≥ −2}"]},
    {r:"y = √(2x − 8)", q:["the domain","โดเมน"], a:"{x | x ≥ 4}", w:["{x | x ≥ 8}","{x | x ≤ 4}"]},
    {r:"y = (x − 3)²",  q:["the range","เรนจ์"],  a:"{y | y ≥ 0}", w:["{y | y ≥ 3}","{y | y ≤ 0}"]},
    {r:"y = |5 − 2x|",  q:["the range","เรนจ์"],  a:"{y | y ≥ 0}", w:["{y | y ≥ 5}","{y | y ≤ 0}"]}
  ]);
  return {stem:["For "+C.r+", find "+C.q[0]+".","จาก "+C.r+" จงหา"+C.q[1]],
    opts:[{v:C.a,ok:1},{v:"R",trap:"T-03"},{v:C.w[0]},{v:C.w[1]}],unit:""};
},
"M-03": function(sf){
  if(sf==="S-02") return {stem:["A curve is drawn. Every line parallel to the y-axis meets it exactly once, but the line y = 2 meets it twice. What is the curve?",
                                "กราฟเส้นหนึ่งถูกวาดไว้ เส้นทุกเส้นที่ขนานแกน y ตัดมันหนึ่งจุดพอดี แต่เส้น y = 2 ตัดมันสองจุด กราฟนี้คืออะไร"],
    opts:[{v:["A function, but not one-to-one","เป็นฟังก์ชัน แต่ไม่เป็นหนึ่งต่อหนึ่ง"],ok:1},
          {v:["Not a function, because a horizontal line cuts twice","ไม่เป็นฟังก์ชัน เพราะเส้นแนวนอนตัดสองจุด"],trap:"T-02"},
          {v:["A one-to-one function","เป็นฟังก์ชันหนึ่งต่อหนึ่ง"],trap:"T-02"},
          {v:["Not a relation at all","ไม่เป็นความสัมพันธ์เลย"]}],unit:""};
  if(sf==="S-04") return {stem:["Classify r = {(1, 2), (2, 4), (3, 2)}.","จงจำแนก r = {(1, 2), (2, 4), (3, 2)}"],
    opts:[{v:["A function, but not one-to-one","เป็นฟังก์ชัน แต่ไม่เป็นหนึ่งต่อหนึ่ง"],ok:1},
          {v:["A one-to-one function","เป็นฟังก์ชันหนึ่งต่อหนึ่ง"],trap:"T-02"},
          {v:["Not a function, because 2 appears twice as a second member","ไม่เป็นฟังก์ชัน เพราะเลข 2 ปรากฏเป็นสมาชิกตัวหลังสองครั้ง"],trap:"T-02"},
          {v:["Not a relation","ไม่เป็นความสัมพันธ์"]}],unit:""};
  if(sf==="S-05") return {stem:["A relation is a function, yet its inverse is not a function. What must be true of it?",
                                "ความสัมพันธ์หนึ่งเป็นฟังก์ชัน แต่อินเวอร์สของมันไม่เป็นฟังก์ชัน ข้อใดต้องเป็นจริง"],
    opts:[{v:["It is not one-to-one","มันไม่เป็นหนึ่งต่อหนึ่ง"],ok:1},
          {v:["It has no inverse relation at all","มันไม่มีความสัมพันธ์ผกผันเลย"],trap:"T-02"},
          {v:["Its domain is empty","โดเมนของมันเป็นเซตว่าง"]},
          {v:["It fails the vertical line test","มันไม่ผ่านการทดสอบเส้นแนวตั้ง"],trap:"T-02"}],unit:""};
  var p=pick([{b:3,c:5},{b:7,c:2},{b:4,c:9}]);
  return {stem:["For which value of a is r = {(1, "+p.b+"), (2, "+p.c+"), (1, a)} a function?",
                "ค่า a ใดที่ทำให้ r = {(1, "+p.b+"), (2, "+p.c+"), (1, a)} เป็นฟังก์ชัน"],
    opts:[{v:String(p.b),ok:1},{v:String(p.c)},{v:"0"},{v:String(p.b+p.c)}],unit:""};
},
"M-04": function(sf){
  if(sf==="S-04") return {stem:["When is f from A to B called onto?","f จาก A ไป B เรียกว่าเป็นฟังก์ชันไปทั่วถึงเมื่อใด"],
    opts:[{v:["When the range of f equals B exactly","เมื่อเรนจ์ของ f เท่ากับ B พอดี"],ok:1},
          {v:["When the range of f is a proper subset of B","เมื่อเรนจ์ของ f เป็นสับเซตแท้ของ B"]},
          {v:["When f is one-to-one","เมื่อ f เป็นหนึ่งต่อหนึ่ง"],trap:"T-02"},
          {v:["When the domain of f is a proper subset of A","เมื่อโดเมนของ f เป็นสับเซตแท้ของ A"]}],unit:""};
  if(sf==="S-05"){
    var nb=pick([2,3]), na=pick([2,3,4]);
    var tot=Math.pow(nb,na);
    return {stem:["There are "+tot+" functions from A into B, and n(B) = "+nb+". Find n(A).",
                  "มีฟังก์ชันจาก A ไป B ทั้งหมด "+tot+" ฟังก์ชัน และ n(B) = "+nb+" จงหา n(A)"],
      opts:[{v:String(na),ok:1},{v:String(nb),trap:"T-02"},{v:String(tot/nb)},{v:String(na*nb)}],unit:""};
  }
  if(sf==="S-03") return {stem:["Six students each join exactly one of three clubs. Treating student as the input and club as the output, which statement is correct?",
                                "นักเรียนหกคนต่างเข้าชมรมคนละหนึ่งชมรมจากสามชมรม ถ้าให้นักเรียนเป็นอินพุตและชมรมเป็นเอาต์พุต ข้อใดถูกต้อง"],
    opts:[{v:["Always a function; onto only if every club gets at least one student","เป็นฟังก์ชันเสมอ และเป็นไปทั่วถึงก็ต่อเมื่อทุกชมรมมีสมาชิกอย่างน้อยหนึ่งคน"],ok:1},
          {v:["Never a function, because six students share three clubs","ไม่เป็นฟังก์ชันเลย เพราะนักเรียนหกคนใช้ชมรมร่วมกันสามชมรม"],trap:"T-02"},
          {v:["Always onto, since every student picks a club","เป็นไปทั่วถึงเสมอ เพราะนักเรียนทุกคนเลือกชมรม"]},
          {v:["A function only if each club gets exactly two students","เป็นฟังก์ชันก็ต่อเมื่อทุกชมรมได้นักเรียนชมรมละสองคนพอดี"]}],unit:""};
  var s=pick([{a:2,b:3},{a:2,b:4},{a:3,b:2},{a:3,b:4}]);
  return {stem:["n(A) = "+s.a+" and n(B) = "+s.b+". How many functions are there from A into B?",
                "n(A) = "+s.a+" และ n(B) = "+s.b+" มีฟังก์ชันจาก A ไป B กี่ฟังก์ชัน"],
    opts:[{v:String(Math.pow(s.b,s.a)),ok:1},{v:String(Math.pow(s.a,s.b))},
          {v:String(s.a*s.b)},{v:String(Math.pow(2,s.a*s.b))}],unit:""};
},
"M-05": function(sf){
  if(sf==="S-04") return {stem:["Which functions have an inverse that is itself a function?","ฟังก์ชันแบบใดที่อินเวอร์สของมันยังเป็นฟังก์ชัน"],
    opts:[{v:["Exactly the one-to-one functions","ฟังก์ชันหนึ่งต่อหนึ่งเท่านั้น"],ok:1},
          {v:["Every function without exception","ทุกฟังก์ชันโดยไม่มีข้อยกเว้น"],trap:"T-02"},
          {v:["Every function whose domain is R","ทุกฟังก์ชันที่มีโดเมนเป็นจำนวนจริง"],trap:"T-02"},
          {v:["Only increasing functions","ฟังก์ชันเพิ่มเท่านั้น"]}],unit:""};
  if(sf==="S-02") return {stem:["How is the graph of the inverse obtained from the graph of f?","กราฟของอินเวอร์สได้มาจากกราฟของ f อย่างไร"],
    opts:[{v:["Reflect it in the line where the two variables are equal","สะท้อนผ่านเส้นที่ตัวแปรทั้งสองเท่ากัน"],ok:1},
          {v:["Reflect it in the horizontal axis","สะท้อนผ่านแกนนอน"]},
          {v:["Reflect it in the vertical axis","สะท้อนผ่านแกนตั้ง"]},
          {v:["Turn it upside down about the origin","พลิกกลับหัวรอบจุดกำเนิด"]}],unit:""};
  if(sf==="S-03") return {stem:["A function f has domain {x | x ≥ 0} and range {y | y ≥ 2}. State the domain and range of its inverse.",
                                "ฟังก์ชัน f มีโดเมน {x | x ≥ 0} และเรนจ์ {y | y ≥ 2} จงบอกโดเมนและเรนจ์ของอินเวอร์ส"],
    opts:[{v:["Domain {x | x ≥ 2}, range {y | y ≥ 0}","โดเมน {x | x ≥ 2} เรนจ์ {y | y ≥ 0}"],ok:1},
          {v:["Domain {x | x ≥ 0}, range {y | y ≥ 2}","โดเมน {x | x ≥ 0} เรนจ์ {y | y ≥ 2}"],trap:"T-02"},
          {v:["Domain R, range R","โดเมนจำนวนจริง เรนจ์จำนวนจริง"]},
          {v:["Domain {x | x ≥ −2}, range {y | y ≥ 0}","โดเมน {x | x ≥ −2} เรนจ์ {y | y ≥ 0}"]}],unit:""};
  if(sf==="S-05"){
    var u=pick([{a:3,b:4},{a:2,b:5},{a:5,b:1}]);
    return {stem:["The inverse of f is given by (x + "+u.b+")/"+u.a+". Find f itself.",
                  "อินเวอร์สของ f คือ (x + "+u.b+")/"+u.a+" จงหา f"],
      opts:[{v:"f(x) = "+u.a+"x − "+u.b,ok:1},{v:"f(x) = "+u.a+"x + "+u.b},
            {v:"f(x) = (x − "+u.b+")/"+u.a},{v:"f(x) = "+u.a+"/(x + "+u.b+")"}],unit:""};
  }
  var w=pick([{a:2,b:7},{a:4,b:3},{a:5,b:2}]);
  return {stem:["f(x) = "+w.a+"x + "+w.b+". Find the inverse of f.","f(x) = "+w.a+"x + "+w.b+" จงหาอินเวอร์สของ f"],
    opts:[{v:"(x − "+w.b+")/"+w.a,ok:1},{v:"(x + "+w.b+")/"+w.a},
          {v:w.a+"x − "+w.b},{v:"1/("+w.a+"x + "+w.b+")"}],unit:""};
},
"M-06": function(sf){
  if(sf==="S-04") return {stem:["Simplify the inverse of the composite f ∘ g.","จงลดรูปอินเวอร์สของฟังก์ชันประกอบ f ∘ g"],
    opts:[{v:"g⁻¹ ∘ f⁻¹",ok:1},{v:"f⁻¹ ∘ g⁻¹",trap:"T-01"},
          {v:"g ∘ f",trap:"T-01"},{v:"f⁻¹ · g⁻¹",trap:"T-01"}],unit:""};
  if(sf==="S-05"){
    var r=pick([{c:2,d:7,e:3},{c:3,d:8,e:2},{c:2,d:9,e:4}]);
    var gk=r.d-r.c*r.e;
    return {stem:["(g ∘ f)(x) = "+r.c+"x + "+r.d+" and f(x) = x + "+r.e+". Find g(x).",
                  "(g ∘ f)(x) = "+r.c+"x + "+r.d+" และ f(x) = x + "+r.e+" จงหา g(x)"],
      opts:[{v:r.c+"x + "+gk,ok:1},{v:r.c+"x + "+r.d,trap:"T-04"},
            {v:r.c+"x + "+(r.d+r.c*r.e)},{v:"x + "+(r.e+1)}],unit:""};
  }
  if(sf==="S-03"){
    var n0=pick([4,6,7]);
    return {stem:["One machine doubles a number and another adds 5. A number is sent through the doubler first and the adder second. Starting from "+n0+", what comes out?",
                  "เครื่องหนึ่งคูณสองให้กับตัวเลข อีกเครื่องบวกด้วย 5 ถ้าส่งตัวเลขผ่านเครื่องคูณสองก่อนแล้วจึงผ่านเครื่องบวก เริ่มจาก "+n0+" จะได้ผลลัพธ์เท่าใด"],
      opts:[{v:String(2*n0+5),ok:1},{v:String(2*(n0+5)),trap:"T-04"},
            {v:String(n0+5)},{v:String(2*n0)}],unit:""};
  }
  var z=pick([{a:2,b:1,v:2},{a:3,b:5,v:2},{a:2,b:3,v:4}]);
  var inner=z.a*z.v+z.b;
  return {stem:["f(x) = "+z.a+"x + "+z.b+" and g(x) = x². Find (g ∘ f)("+z.v+").",
                "f(x) = "+z.a+"x + "+z.b+" และ g(x) = x² จงหา (g ∘ f)("+z.v+")"],
    opts:[{v:String(inner*inner),ok:1},{v:String(z.a*z.v*z.v+z.b),trap:"T-04"},
          {v:String(inner)},{v:String(z.v*z.v)}],unit:""};
}
}
};
