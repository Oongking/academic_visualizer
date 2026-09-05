var CHAPTER = {
id:"ma03", num:"03", slug:"real-numbers", subject:"math",
kicker:["Mathematics · Chapter 03","คณิตศาสตร์ · บทที่ 3"],
title:["Real Numbers","จำนวนจริง"],
mapTitle:["The ground everything stands on","พื้นที่ทุกอย่างยืนอยู่"],
lede:["Solving an equation is easy once you know which tool to reach for. This chapter is mostly about recognising the shape of a problem — quadratic, polynomial, inequality, absolute value — because each shape has its own reliable method and its own way of going wrong.",
      "การแก้สมการเป็นเรื่องง่ายเมื่อรู้ว่าจะหยิบเครื่องมือใดมาใช้ บทนี้ส่วนใหญ่จึงเป็นเรื่องของการมองรูปแบบของโจทย์ให้ออก ว่าเป็นกำลังสอง พหุนาม อสมการ หรือค่าสัมบูรณ์ เพราะแต่ละรูปแบบมีวิธีที่เชื่อถือได้ของตัวเอง และมีวิธีพลาดของตัวเองด้วย"],
next:["→ continues in Chapter 04 · Relations and Functions","→ ต่อในบทที่ 4 · ความสัมพันธ์และฟังก์ชัน"],

nodes:[
{ id:"number-sets", x:235, y:52, requires:[], methods:["M-01"],
  title:["The number sets","เซตของจำนวน"],
  body:[["The reals nest inside each other: naturals sit inside integers, integers inside rationals, and the rationals together with the irrationals make up the reals. A rational is anything expressible as a fraction of integers, which includes every terminating and every recurring decimal.",
         "Irrationals are the leftovers — √2, π, e — decimals that never terminate and never repeat. The field properties (closure, commutativity, associativity, identity, inverse, distributivity) hold throughout the reals, and are what let you rearrange an equation at all."],
        ["จำนวนจริงซ้อนกันเป็นชั้น จำนวนนับอยู่ในจำนวนเต็ม จำนวนเต็มอยู่ในจำนวนตรรกยะ และจำนวนตรรกยะรวมกับอตรรกยะเป็นจำนวนจริง จำนวนตรรกยะคือสิ่งที่เขียนเป็นเศษส่วนของจำนวนเต็มได้ ซึ่งรวมทศนิยมซ้ำและทศนิยมรู้จบทุกตัว",
         "จำนวนอตรรกยะคือส่วนที่เหลือ เช่น √2, π, e ซึ่งเป็นทศนิยมที่ไม่รู้จบและไม่ซ้ำ สมบัติของฟีลด์ ได้แก่ ปิด สลับที่ เปลี่ยนกลุ่ม เอกลักษณ์ อินเวอร์ส และแจกแจง เป็นจริงตลอดในจำนวนจริง และเป็นสิ่งที่ทำให้เราจัดรูปสมการได้เลย"]],
  formula:["N ⊂ I ⊂ Q ⊂ R        Q ∪ Q′ = R","N ⊂ I ⊂ Q ⊂ R        Q ∪ Q′ = R"],
  flabel:["Rational means expressible as a fraction","ตรรกยะคือเขียนเป็นเศษส่วนได้"],
  viz:"numline",
  vizcfg:{
    title:["EACH SET SITS INSIDE THE NEXT","แต่ละเซตอยู่ภายในเซตถัดไป"],
    min:-5, max:5,
    ctrls:[{k:"i", lab:["Show up to","แสดงถึง"], min:0, max:3, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Set shown","เซตที่แสดง"], f:function(S){
        return [["ℕ natural","ℕ นับ"],["ℤ integers","ℤ จำนวนเต็ม"],
                ["ℚ rational","ℚ ตรรกยะ"],["ℝ real","ℝ จำนวนจริง"]][S.p.i][L()]; }},
      {lab:["What it adds","สิ่งที่เพิ่มเข้ามา"], f:function(S){
        return [["counting numbers","จำนวนนับ"],["zero and negatives","ศูนย์และจำนวนลบ"],
                ["fractions","เศษส่วน"],["irrationals like √2 and π","อตรรกยะ เช่น √2 และ π"]][S.p.i][L()]; }},
      {lab:["Chain","ลำดับชั้น"], f:function(){ return "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ"; }},
      {lab:["Are there gaps left?","ยังมีช่องว่างเหลือไหม"], f:function(S){
        return S.p.i===3 ? (L()?"ไม่ — ℝ เติมเส้นจนเต็ม":"no — ℝ fills the line completely")
                         : (L()?"มี — ยังมีช่องว่าง":"yes — holes remain"); }}
    ],
    regions:function(p){
      var r=[];
      if(p.i>=3) r.push({a:-5,b:5,col:"warn",lab:["ℝ fills every point","ℝ เต็มทุกจุด"]});
      return r;
    },
    points:function(p){
      var pts=[];
      for(var n=1;n<=5;n++) pts.push({v:n, col:"accent"});
      if(p.i>=1) for(var z=-5;z<=0;z++) pts.push({v:z, col:"good"});
      if(p.i>=2) [0.5,1.5,-2.5,3.25].forEach(function(q){ pts.push({v:q, col:"warn"}); });
      if(p.i>=3) [Math.SQRT2,Math.PI,-Math.PI].forEach(function(x){
        pts.push({v:x, lab:["irrational","อตรรกยะ"], col:"ink"}); });
      return pts;
    },
    note:["between any two rationals there is another — yet they still leave gaps that √2 falls into","ระหว่างจำนวนตรรกยะสองตัวย่อมมีอีกตัวเสมอ แต่ก็ยังเหลือช่องว่างที่ √2 ตกลงไป"]
  } },

{ id:"quadratics", x:100, y:150, requires:["number-sets"], methods:["M-02","M-03"],
  title:["Quadratic equations","สมการกำลังสอง"],
  body:[["Factorise when you can and use the formula when you cannot. The discriminant b² − 4ac decides everything before you calculate a single root: positive gives two distinct real roots, zero gives one repeated root, negative gives none at all in the reals.",
         "Two shortcuts save real time. The roots sum to −b/a and multiply to c/a, which lets you check an answer in seconds or reconstruct an equation from its roots. Reading the discriminant's sign backwards is trap T-01, and the graph below makes the sign impossible to misread."],
        ["แยกตัวประกอบเมื่อทำได้ และใช้สูตรเมื่อทำไม่ได้ ดิสคริมิแนนต์ b² − 4ac ตัดสินทุกอย่างก่อนที่จะคำนวณรากแม้แต่ตัวเดียว ค่าบวกให้รากจริงสองค่าที่ต่างกัน ค่าศูนย์ให้รากซ้ำหนึ่งค่า ค่าลบไม่ให้รากจริงเลย",
         "มีทางลัดสองข้อที่ประหยัดเวลาจริง ผลบวกของรากคือ −b/a และผลคูณคือ c/a ซึ่งช่วยตรวจคำตอบได้ในไม่กี่วินาทีหรือสร้างสมการย้อนกลับจากรากได้ การอ่านเครื่องหมายดิสคริมิแนนต์กลับด้านคือกับดัก T-01 และกราฟด้านล่างทำให้อ่านผิดไม่ได้เลย"]],
  formula:["x = (−b ± √(b² − 4ac)) / 2a        Σroots = −b/a ,  Πroots = c/a","x = (−b ± √(b² − 4ac)) / 2a        ผลบวกราก = −b/a ,  ผลคูณราก = c/a"],
  flabel:["The discriminant decides first","ดิสคริมิแนนต์ตัดสินก่อน"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){ return p.a*x*x + p.b*x + p.c; },
    xmin:-6, xmax:6, fill:false,
    title:["y = ax² + bx + c","y = ax² + bx + c"],
    xlab:["x","x"], ylab:["y","y"],
    mark:function(p){ return p.a!==0 ? -p.b/(2*p.a) : 0; },
    ctrls:[
      {k:"a", lab:["a","a"], min:-3, max:3, step:.5, def:1,  unit:""},
      {k:"b", lab:["b","b"], min:-8, max:8, step:1,  def:-2, unit:""},
      {k:"c", lab:["c","c"], min:-8, max:8, step:1,  def:-3, unit:""}
    ],
    readouts:[
      {lab:["Discriminant","ดิสคริมิแนนต์"], f:function(S){
        return fmt(S.p.b*S.p.b - 4*S.p.a*S.p.c); }},
      {lab:["Real roots","รากจริง"], f:function(S){
        var d=S.p.b*S.p.b-4*S.p.a*S.p.c;
        if(S.p.a===0) return L()?"ไม่ใช่กำลังสอง":"not quadratic";
        return d>0?"2":(Math.abs(d)<1e-9?"1":"0"); }},
      {lab:["Sum · product","ผลบวก · ผลคูณ"], f:function(S){
        if(S.p.a===0) return "—";
        return fmt(-S.p.b/S.p.a)+" · "+fmt(S.p.c/S.p.a); }}
    ]
  },
  guide:[
    {say:["Discriminant positive. The parabola cuts the x-axis twice, and there are two distinct real roots.",
          "ดิสคริมิแนนต์เป็นบวก พาราโบลาตัดแกน x สองจุด และมีรากจริงสองค่าที่ต่างกัน"], set:{a:1,b:-2,c:-3}},
    {say:["Now push c up until the discriminant reaches zero. The curve just touches the axis — one repeated root.",
          "ทีนี้เพิ่ม c จนดิสคริมิแนนต์เป็นศูนย์ เส้นโค้งแตะแกนพอดี มีรากซ้ำหนึ่งค่า"], set:{a:1,b:-2,c:1}},
    {say:["Push further and the curve lifts clear of the axis. Discriminant negative, no real roots at all.",
          "เพิ่มต่อไปอีก เส้นโค้งลอยพ้นแกน ดิสคริมิแนนต์เป็นลบ ไม่มีรากจริงเลย"], set:{a:1,b:-2,c:4}},
    {say:["Make a negative and the parabola flips. The discriminant rule is unchanged — only the opening direction moved.",
          "ทำให้ a เป็นลบ พาราโบลาพลิกกลับ กฎดิสคริมิแนนต์ไม่เปลี่ยน เปลี่ยนแค่ทิศการเปิด"], set:{a:-1,b:2,c:3}}
  ]},

{ id:"polynomials", x:370, y:150, requires:["number-sets"], methods:["M-04"],
  title:["Polynomials","พหุนาม"],
  body:[["Beyond degree two, the reliable route is to find one root and factor it out. The factor theorem says (x − a) divides P(x) exactly when P(a) = 0, so testing candidates costs one substitution each.",
         "The candidates are not arbitrary: any rational root p/q must have p dividing the constant term and q dividing the leading coefficient. Test both signs. Once one root is found, synthetic division drops the degree by one and you are back to familiar ground."],
        ["เมื่อดีกรีเกินสอง วิธีที่เชื่อถือได้คือหารากหนึ่งค่าแล้วแยกออกไป ทฤษฎีบทตัวประกอบบอกว่า (x − a) หาร P(x) ลงตัวเมื่อ P(a) = 0 พอดี การทดสอบตัวเลือกจึงเสียเพียงการแทนค่าครั้งละหนึ่งครั้ง",
         "ตัวเลือกไม่ได้สุ่มมั่ว รากตรรกยะ p/q ใดๆ ต้องมี p หารพจน์คงที่ลงตัว และ q หารสัมประสิทธิ์นำลงตัว ให้ทดสอบทั้งสองเครื่องหมาย เมื่อพบรากหนึ่งค่าแล้ว การหารสังเคราะห์จะลดดีกรีลงหนึ่ง แล้วเราก็กลับสู่พื้นที่คุ้นเคย"]],
  formula:["P(a) = 0  ⟺  (x − a) is a factor","P(a) = 0  ⟺  (x − a) เป็นตัวประกอบ"],
  flabel:["Rational roots divide constant over leading","รากตรรกยะ = ตัวหารพจน์คงที่ / ตัวหารสัมประสิทธิ์นำ"],
  viz:"plot",
  vizcfg:{
    title:["DEGREE DECIDES HOW MANY TIMES IT CAN CROSS","ดีกรีกำหนดว่าตัดแกนได้กี่ครั้ง"],
    xlab:["x","x"], ylab:["P(x)","P(x)"],
    xmin:-4, xmax:4, fill:false,
    fn:function(x,p){
      if(p.deg===1) return p.a*x + p.b;
      if(p.deg===2) return p.a*x*x + p.b*x - 2;
      return p.a*x*x*x + p.b*x*x - 2*x;
    },
    ctrls:[
      {k:"deg", lab:["Degree","ดีกรี"], min:1, max:3, step:1, def:2, unit:""},
      {k:"a",   lab:["Leading coefficient a","สัมประสิทธิ์นำ a"], min:-2, max:2, step:.1, def:1, unit:""},
      {k:"b",   lab:["Next coefficient b","สัมประสิทธิ์ถัดไป b"], min:-4, max:4, step:.2, def:0, unit:""}
    ],
    readouts:[
      {lab:["Degree","ดีกรี"], f:function(S){ return String(S.p.deg); }},
      {lab:["Maximum real roots","รากจริงมากสุด"], f:function(S){ return String(S.p.deg); }},
      {lab:["End behaviour","พฤติกรรมปลายกราฟ"], f:function(S){
        var p=S.p;
        if(p.deg%2===0) return p.a>0 ? (L()?"ขึ้นทั้งสองข้าง":"up at both ends") : (L()?"ลงทั้งสองข้าง":"down at both ends");
        return p.a>0 ? (L()?"ลงซ้าย ขึ้นขวา":"down left, up right") : (L()?"ขึ้นซ้าย ลงขวา":"up left, down right"); }},
      {lab:["Odd degree guarantees","ดีกรีคี่รับประกันว่า"], f:function(){
        return L()?"มีรากจริงอย่างน้อยหนึ่งราก":"at least one real root exists"; }}
    ],
    note:["an odd-degree curve must cross the axis; an even-degree one can miss it entirely","เส้นโค้งดีกรีคี่ต้องตัดแกน ส่วนดีกรีคู่พลาดไปทั้งหมดได้"]
  },
  guide:[
    {say:["A straight line: degree one, exactly one root, and it always crosses.",
          "เส้นตรง ดีกรีหนึ่ง มีรากเดียวพอดี และตัดแกนเสมอ"], set:{deg:1,a:1,b:0}},
    {say:["Degree two can cross twice, touch once, or miss the axis altogether.",
          "ดีกรีสองตัดได้สองครั้ง แตะครั้งเดียว หรือไม่แตะแกนเลยก็ได้"], set:{deg:2,a:1,b:0}},
    {say:["Degree three must come from below and go above, so a real root cannot be avoided.",
          "ดีกรีสามต้องมาจากด้านล่างและไปด้านบน จึงหลีกเลี่ยงรากจริงไม่ได้"], set:{deg:3,a:1,b:0}}
  ] },

{ id:"inequalities", x:235, y:248, requires:["quadratics","polynomials"], methods:["M-05"],
  title:["Inequalities","อสมการ"],
  body:[["Rearrange until one side is zero, factorise, then mark the critical values on a number line and read off the signs between them. That procedure never fails, whereas guessing does.",
         "Two rules protect you. Multiplying or dividing by a negative flips the inequality sign — and if the multiplier contains an unknown you cannot tell its sign, so never cross-multiply; combine into a single fraction instead. A critical value coming from a denominator is excluded from the answer, because it makes the expression undefined. That exclusion is trap T-03."],
        ["จัดรูปจนข้างหนึ่งเป็นศูนย์ แยกตัวประกอบ แล้วทำเครื่องหมายค่าวิกฤตบนเส้นจำนวนและอ่านเครื่องหมายระหว่างช่วง ขั้นตอนนี้ไม่เคยพลาด ต่างจากการเดา",
         "มีสองกฎที่ปกป้องคุณ การคูณหรือหารด้วยจำนวนลบทำให้เครื่องหมายอสมการกลับด้าน และถ้าตัวคูณมีตัวแปรอยู่ เราบอกเครื่องหมายไม่ได้ จึงห้ามคูณไขว้เด็ดขาด ให้รวมเป็นเศษส่วนเดียวแทน ส่วนค่าวิกฤตที่มาจากตัวส่วนต้องตัดออกจากคำตอบ เพราะทำให้นิพจน์ไม่นิยาม การไม่ตัดออกคือกับดัก T-03"]],
  formula:["× or ÷ by a negative  ⟹  flip the sign","คูณหรือหารด้วยจำนวนลบ  ⟹  กลับเครื่องหมาย"],
  flabel:["Never cross-multiply an unknown sign","ห้ามคูณไขว้เมื่อไม่รู้เครื่องหมาย"],
  viz:"numline",
  vizcfg:{
    title:["THE SOLUTION SET, DRAWN","เซตคำตอบ วาดออกมา"],
    min:-8, max:8,
    ctrls:[
      {k:"kind", lab:["0 x>a · 1 a<x<b · 2 x<a or x>b","0 · 1 · 2"], min:0, max:2, step:1, def:0, unit:""},
      {k:"a",    lab:["a","a"], min:-7, max:7, step:.5, def:-2, unit:""},
      {k:"b",    lab:["b","b"], min:-7, max:7, step:.5, def:3, unit:""},
      {k:"strict", lab:["0 includes ends · 1 excludes","0 รวมปลาย · 1 ไม่รวม"], min:0, max:1, step:1, def:1, unit:""}
    ],
    readouts:[
      {lab:["Solution","คำตอบ"], f:function(S){
        var p=S.p, o=p.strict===1;
        if(p.kind===0) return "x "+(o?">":"≥")+" "+fmt(p.a);
        if(p.kind===1) return fmt(Math.min(p.a,p.b))+(o?" < ":" ≤ ")+"x"+(o?" < ":" ≤ ")+fmt(Math.max(p.a,p.b));
        return "x "+(o?"<":"≤")+" "+fmt(Math.min(p.a,p.b))+(L()?" หรือ ":" or ")+"x "+(o?">":"≥")+" "+fmt(Math.max(p.a,p.b)); }},
      {lab:["Endpoint circles","วงกลมที่ปลาย"], f:function(S){
        return S.p.strict===1 ? (L()?"กลวง — ไม่รวมปลาย":"hollow — the end is excluded")
                              : (L()?"ทึบ — รวมปลาย":"solid — the end is included"); }},
      {lab:["Multiplying by a negative","การคูณด้วยจำนวนลบ"], f:function(){
        return L()?"ต้องกลับเครื่องหมายอสมการ":"reverses the inequality sign"; }},
      {lab:["Shape of the answer","รูปร่างคำตอบ"], f:function(S){
        return [["a ray","รังสี"],["a single interval","ช่วงเดียว"],["two separate pieces","สองช่วงแยกกัน"]][S.p.kind][L()]; }}
    ],
    regions:function(p){
      var lo=Math.min(p.a,p.b), hi=Math.max(p.a,p.b), o=p.strict===1;
      if(p.kind===0) return [{a:p.a,b:8,col:"accent",openA:o,lab:["solution","คำตอบ"]}];
      if(p.kind===1) return [{a:lo,b:hi,col:"accent",openA:o,openB:o,lab:["solution","คำตอบ"]}];
      return [{a:-8,b:lo,col:"accent",openB:o,lab:["solution","คำตอบ"]},
              {a:hi,b:8,col:"accent",openA:o,lab:["solution","คำตอบ"]}];
    },
    points:function(p){ return [{v:p.a, lab:["a","a"], col:"ink"},{v:p.b, lab:["b","b"], col:"ink"}]; },
    note:["'and' gives one interval; 'or' gives two — the word decides the picture","และ ให้ช่วงเดียว ส่วน หรือ ให้สองช่วง คำเชื่อมเป็นตัวกำหนดภาพ"]
  } },

{ id:"absolute-value", x:235, y:346, requires:["inequalities"], methods:["M-06"],
  title:["Absolute value","ค่าสัมบูรณ์"],
  body:[["|x| is the distance from zero, so it is never negative. Read |x| ≤ a as a single trapped interval −a ≤ x ≤ a, and |x| ≥ a as two separate outward rays x ≥ a or x ≤ −a. One is an 'and', the other an 'or'.",
         "The identity that catches people is √(x²) = |x|, not x — because the square root is defined to return the non-negative value. Dropping those bars is trap T-04. For anything messier, split at each critical value and solve each interval separately."],
        ["|x| คือระยะจากศูนย์ จึงไม่มีวันติดลบ ให้อ่าน |x| ≤ a เป็นช่วงเดียวที่ถูกขังไว้ −a ≤ x ≤ a และ |x| ≥ a เป็นสองรังสีที่แยกออกไป x ≥ a หรือ x ≤ −a อันหนึ่งคือ และ อีกอันคือ หรือ",
         "เอกลักษณ์ที่ดักคนคือ √(x²) = |x| ไม่ใช่ x เพราะรากที่สองถูกนิยามให้คืนค่าที่ไม่ติดลบ การละเครื่องหมายค่าสัมบูรณ์คือกับดัก T-04 สำหรับกรณีที่ยุ่งกว่านี้ ให้แยกช่วงที่ค่าวิกฤตแต่ละจุดแล้วแก้ทีละช่วง"]],
  formula:["|x| ≤ a ⟺ −a ≤ x ≤ a        √(x²) = |x|","|x| ≤ a ⟺ −a ≤ x ≤ a        √(x²) = |x|"],
  flabel:["One is 'and', the other is 'or'","อันหนึ่งคือ และ อีกอันคือ หรือ"],
  viz:"plot",
  vizcfg:{
    title:["ABSOLUTE VALUE IS A DISTANCE","ค่าสัมบูรณ์คือระยะทาง"],
    xlab:["x","x"], ylab:["|x − a|","|x − a|"],
    xmin:-8, xmax:8, ymin:0, fill:false,
    fn:function(x,p){ return Math.abs(x-p.a); },
    mark:function(p){ return p.x; },
    ctrls:[
      {k:"a", lab:["Centre a","จุดศูนย์กลาง a"], min:-5, max:5, step:.5, def:2, unit:""},
      {k:"b", lab:["Threshold b","ค่าเกณฑ์ b"], min:.5, max:6, step:.5, def:3, unit:""},
      {k:"x", lab:["Test point x","จุดทดสอบ x"], min:-8, max:8, step:.5, def:0, unit:""}
    ],
    readouts:[
      {lab:["|x − a|","|x − a|"], f:function(S){ return fmt2(Math.abs(S.p.x-S.p.a)); }},
      {lab:["Meaning","ความหมาย"], f:function(S){
        return L()?"ระยะจาก x ถึง a":"the distance from x to a"; }},
      {lab:["Solution of |x − a| < b","คำตอบของ |x − a| < b"], f:function(S){
        return fmt(S.p.a-S.p.b)+" < x < "+fmt(S.p.a+S.p.b); }},
      {lab:["Solution of |x − a| > b","คำตอบของ |x − a| > b"], f:function(S){
        return "x < "+fmt(S.p.a-S.p.b)+(L()?" หรือ ":" or ")+"x > "+fmt(S.p.a+S.p.b); }}
    ],
    note:["the V has its point at a — 'less than b' is the slice near the bottom of the V","ตัว V มียอดแหลมอยู่ที่ a เงื่อนไข น้อยกว่า b คือส่วนที่อยู่ใกล้ก้นของตัว V"]
  },
  guide:[
    {say:["The V bottoms out at x = a, where the distance is zero. That vertex is the whole idea.",
          "ตัว V ต่ำสุดที่ x = a ซึ่งระยะทางเป็นศูนย์ จุดยอดนั้นคือแนวคิดทั้งหมด"], set:{a:2,b:3,x:2}},
    {say:["Slide the centre and the whole V slides with it. Nothing about its shape changes.",
          "เลื่อนจุดศูนย์กลาง ตัว V ทั้งตัวเลื่อนตาม รูปร่างของมันไม่เปลี่ยนเลย"], set:{a:-4,b:3,x:0}},
    {say:["Anything below the threshold sits inside one interval; anything above splits into two.",
          "อะไรที่ต่ำกว่าเกณฑ์จะอยู่ในช่วงเดียว อะไรที่สูงกว่าจะแยกเป็นสองช่วง"], set:{a:2,b:1,x:6}}
  ] }
],

methods:[
{id:"M-01", name:["Classify a number","จำแนกชนิดของจำนวน"]},
{id:"M-02", name:["Solve a quadratic","แก้สมการกำลังสอง"]},
{id:"M-03", name:["Use the discriminant and root relations","ใช้ดิสคริมิแนนต์และความสัมพันธ์ของราก"]},
{id:"M-04", name:["Factor a polynomial","แยกตัวประกอบพหุนาม"]},
{id:"M-05", name:["Solve an inequality","แก้อสมการ"]},
{id:"M-06", name:["Solve with absolute value","แก้โจทย์ค่าสัมบูรณ์"]}
],

traps:{
"T-01":["Discriminant sign misread. Positive gives two roots, zero one, negative none.","อ่านเครื่องหมายดิสคริมิแนนต์ผิด บวกให้สองราก ศูนย์ให้หนึ่ง ลบไม่ให้รากจริง"],
"T-02":["Sign not flipped. Multiplying an inequality by a negative reverses it.","ลืมกลับเครื่องหมาย การคูณอสมการด้วยจำนวนลบทำให้กลับด้าน"],
"T-03":["A critical value from a denominator must be excluded — it makes the expression undefined.","ค่าวิกฤตที่มาจากตัวส่วนต้องตัดออก เพราะทำให้นิพจน์ไม่นิยาม"],
"T-04":["√(x²) is |x|, not x. The square root returns the non-negative value.","√(x²) คือ |x| ไม่ใช่ x รากที่สองคืนค่าที่ไม่ติดลบ"]
},

gen:{
"M-01": function(sf){
  var C=[{q:["√2","√2"],a:["Irrational","อตรรกยะ"],w:[["Rational","ตรรกยะ"],["Integer","จำนวนเต็ม"],["Natural","จำนวนนับ"]]},
         {q:["0.375","0.375"],a:["Rational","ตรรกยะ"],w:[["Irrational","อตรรกยะ"],["Integer","จำนวนเต็ม"],["Not real","ไม่ใช่จำนวนจริง"]]},
         {q:["0.333… (recurring)","0.333… (ซ้ำ)"],a:["Rational","ตรรกยะ"],w:[["Irrational","อตรรกยะ"],["Not real","ไม่ใช่จำนวนจริง"],["Natural","จำนวนนับ"]]},
         {q:["−7","−7"],a:["Integer but not natural","จำนวนเต็มแต่ไม่ใช่จำนวนนับ"],w:[["Natural","จำนวนนับ"],["Irrational","อตรรกยะ"],["Not rational","ไม่ใช่ตรรกยะ"]]}];
  var c=pick(C);
  if(sf==="S-04") return {stem:["Which statement is true of every recurring decimal?","ข้อใดจริงสำหรับทศนิยมซ้ำทุกตัว"],
    opts:[{v:["It is rational","เป็นจำนวนตรรกยะ"],ok:1},{v:["It is irrational","เป็นจำนวนอตรรกยะ"]},
          {v:["It is an integer","เป็นจำนวนเต็ม"]},{v:["It is not real","ไม่ใช่จำนวนจริง"]}],unit:""};
  return {stem:["Classify "+c.q[0]+".","จงจำแนก "+c.q[1]],
    opts:[{v:c.a,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
},
"M-02": function(sf){
  var r1=pick([1,2,3,-1,-2]), r2=pick([4,5,-3,-4]);
  var b=-(r1+r2), c=r1*r2;
  if(sf==="S-05") return {stem:["A quadratic has roots "+r1+" and "+r2+" with leading coefficient 1. What is the equation?",
                                "สมการกำลังสองมีราก "+r1+" และ "+r2+" โดยสัมประสิทธิ์นำเป็น 1 สมการคืออะไร"],
    opts:[{v:"x² "+(b>=0?"+ ":"− ")+Math.abs(b)+"x "+(c>=0?"+ ":"− ")+Math.abs(c)+" = 0",ok:1},
          {v:"x² "+(b>=0?"− ":"+ ")+Math.abs(b)+"x "+(c>=0?"+ ":"− ")+Math.abs(c)+" = 0",trap:"T-01"},
          {v:"x² + "+Math.abs(r1+r2)+"x + "+Math.abs(c)+" = 0"},
          {v:"x² − "+Math.abs(c)+"x + "+Math.abs(b)+" = 0"}],unit:""};
  if(sf==="S-04") return {stem:["When is factorising preferable to the quadratic formula?",
                                "เมื่อใดการแยกตัวประกอบดีกว่าการใช้สูตร"],
    opts:[{v:["When the roots are simple integers or fractions","เมื่อรากเป็นจำนวนเต็มหรือเศษส่วนอย่างง่าย"],ok:1},
          {v:["Always, the formula never works","เสมอ เพราะสูตรใช้ไม่ได้"]},
          {v:["Only when a = 1","เฉพาะเมื่อ a = 1"]},
          {v:["When the discriminant is negative","เมื่อดิสคริมิแนนต์เป็นลบ"],trap:"T-01"}],unit:""};
  return {stem:["Solve x² "+(b>=0?"+ ":"− ")+Math.abs(b)+"x "+(c>=0?"+ ":"− ")+Math.abs(c)+" = 0.",
                "จงแก้สมการ x² "+(b>=0?"+ ":"− ")+Math.abs(b)+"x "+(c>=0?"+ ":"− ")+Math.abs(c)+" = 0"],
    opts:[{v:"x = "+r1+", "+r2,ok:1},{v:"x = "+(-r1)+", "+(-r2),trap:"T-01"},
          {v:"x = "+r1+", "+(-r2)},{v:"x = "+b+", "+c}],unit:""};
},
"M-03": function(sf){
  var a=1, b=pick([2,4,-6,-2]), c=pick([1,3,-8,5]);
  var d=b*b-4*a*c;
  if(sf==="S-02"||sf==="S-04") return {stem:["A parabola just touches the x-axis at one point. What is its discriminant?",
                                             "พาราโบลาแตะแกน x ที่จุดเดียวพอดี ดิสคริมิแนนต์เป็นเท่าใด"],
    opts:[{v:["Zero","ศูนย์"],ok:1},{v:["Positive","เป็นบวก"],trap:"T-01"},
          {v:["Negative","เป็นลบ"],trap:"T-01"},{v:["Undefined","ไม่นิยาม"]}],unit:""};
  if(sf==="S-05") return {stem:["The roots of x² + bx + "+c+" = 0 sum to "+(-b)+". Find b.",
                                "รากของ x² + bx + "+c+" = 0 มีผลบวก "+(-b)+" จงหา b"],
    opts:[{v:String(b),ok:1},{v:String(-b),trap:"T-01"},{v:String(c)},{v:String(b*2)}],unit:""};
  return {stem:["Find the discriminant of x² "+(b>=0?"+ ":"− ")+Math.abs(b)+"x "+(c>=0?"+ ":"− ")+Math.abs(c)+" = 0 and say how many real roots it has.",
                "จงหาดิสคริมิแนนต์ของ x² "+(b>=0?"+ ":"− ")+Math.abs(b)+"x "+(c>=0?"+ ":"− ")+Math.abs(c)+" = 0 และบอกว่ามีรากจริงกี่ค่า"],
    opts:[{v:d+", "+(d>0?"2":(d===0?"1":"0")),ok:1},
          {v:d+", "+(d>0?"0":(d===0?"2":"2")),trap:"T-01"},
          {v:(-d)+", "+(d>0?"2":"0"),trap:"T-01"},
          {v:d+", 1"}],unit:""};
},
"M-04": function(sf){
  var r=pick([1,2,3,-1,-2]);
  if(sf==="S-04") return {stem:["The factor theorem says (x − a) divides P(x) exactly when:",
                                "ทฤษฎีบทตัวประกอบบอกว่า (x − a) หาร P(x) ลงตัวเมื่อ"],
    opts:[{v:"P(a) = 0",ok:1},{v:"P(0) = a"},{v:"P(a) = a"},{v:"P(−a) = 0"}],unit:""};
  if(sf==="S-05") return {stem:["P(x) = x³ − 2x² − 5x + 6 has a root at x = "+1+". What does that tell you?",
                                "P(x) = x³ − 2x² − 5x + 6 มีรากที่ x = 1 สิ่งนี้บอกอะไร"],
    opts:[{v:["(x − 1) is a factor","(x − 1) เป็นตัวประกอบ"],ok:1},
          {v:["(x + 1) is a factor","(x + 1) เป็นตัวประกอบ"]},
          {v:["P(1) = 1","P(1) = 1"]},{v:["The degree is 1","ดีกรีเป็น 1"]}],unit:""};
  return {stem:["Which values are the only possible rational roots of 2x³ + x² − 5x + 2 = 0?",
                "ค่าใดคือรากตรรกยะที่เป็นไปได้ทั้งหมดของ 2x³ + x² − 5x + 2 = 0"],
    opts:[{v:"±1, ±2, ±½",ok:1},{v:"±1, ±2 only"},{v:"±2, ±½ only"},{v:"any integer"}],unit:""};
},
"M-05": function(sf){
  var k=pick([2,3,5]), m=pick([4,6,10]);
  if(sf==="S-04") return {stem:["You multiply both sides of an inequality by −3. What must you do?",
                                "คุณคูณทั้งสองข้างของอสมการด้วย −3 ต้องทำอะไร"],
    opts:[{v:["Reverse the inequality sign","กลับเครื่องหมายอสมการ"],ok:1},
          {v:["Nothing changes","ไม่ต้องเปลี่ยนอะไร"],trap:"T-02"},
          {v:["Divide by 3 as well","หารด้วย 3 ด้วย"],trap:"T-02"},
          {v:["Square both sides","ยกกำลังสองทั้งสองข้าง"]}],unit:""};
  if(sf==="S-03") return {stem:["Why must you never cross-multiply in (x+1)/(x−2) > 3?",
                                "ทำไมจึงห้ามคูณไขว้ใน (x+1)/(x−2) > 3"],
    opts:[{v:["The sign of x − 2 is unknown, so the inequality might flip","ไม่รู้เครื่องหมายของ x − 2 อสมการอาจกลับด้าน"],ok:1},
          {v:["Cross-multiplying is always wrong","การคูณไขว้ผิดเสมอ"]},
          {v:["It makes the algebra longer","มันทำให้พีชคณิตยาวขึ้น"]},
          {v:["The 3 must be moved first","ต้องย้าย 3 ก่อน"]}],unit:""};
  if(sf==="S-05"){
    var v=pick([2,3,5]);
    return {stem:["Solving (x + 1)/(x − "+v+") ≥ 0 gives critical values −1 and "+v+". Which belongs in the answer as a closed endpoint?",
                  "การแก้ (x + 1)/(x − "+v+") ≥ 0 ให้ค่าวิกฤต −1 และ "+v+" ค่าใดรวมอยู่ในคำตอบแบบปิด"],
      opts:[{v:["−1 only — x = "+v+" makes the denominator zero","−1 เท่านั้น เพราะ x = "+v+" ทำให้ตัวส่วนเป็นศูนย์"],ok:1},
            {v:["Both −1 and "+v,"ทั้ง −1 และ "+v],trap:"T-03"},
            {v:[v+" only",v+" เท่านั้น"],trap:"T-03"},
            {v:["Neither","ไม่มีค่าใดเลย"]}],unit:""};
  }
  return {stem:["Solve −"+k+"x > "+m+".","จงแก้อสมการ −"+k+"x > "+m],
    opts:[{v:"x < −"+fmt(m/k),ok:1},{v:"x > −"+fmt(m/k),trap:"T-02"},
          {v:"x < "+fmt(m/k)},{v:"x > "+fmt(m/k),trap:"T-02"}],unit:""};
},
"M-06": function(sf){
  var a=pick([2,3,5,7]);
  if(sf==="S-04") return {stem:["Simplify √(x²).","จงลดรูป √(x²)"],
    opts:[{v:"|x|",ok:1},{v:"x",trap:"T-04"},{v:"±x",trap:"T-04"},{v:"x²"}],unit:""};
  if(sf==="S-05") return {stem:["The solution to an absolute-value inequality is −"+a+" ≤ x ≤ "+a+". Which inequality was it?",
                                "คำตอบของอสมการค่าสัมบูรณ์คือ −"+a+" ≤ x ≤ "+a+" อสมการนั้นคือข้อใด"],
    opts:[{v:"|x| ≤ "+a,ok:1},{v:"|x| ≥ "+a,trap:"T-04"},{v:"|x| = "+a},{v:"|x| > "+a,trap:"T-04"}],unit:""};
  return {stem:["Solve |x| ≥ "+a+".","จงแก้อสมการ |x| ≥ "+a],
    opts:[{v:"x ≥ "+a+" or x ≤ −"+a,ok:1},{v:"−"+a+" ≤ x ≤ "+a,trap:"T-04"},
          {v:"x ≥ "+a+" only"},{v:"x ≤ −"+a+" only"}],unit:""};
}
}
};
