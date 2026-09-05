var CHAPTER = {
id:"ma10", num:"10", slug:"complex-numbers", subject:"math",
kicker:["Mathematics · Chapter 10","คณิตศาสตร์ · บทที่ 10"],
title:["Complex Numbers","จำนวนเชิงซ้อน"],
mapTitle:["The number line becomes a plane","เส้นจำนวนกลายเป็นระนาบ"],
lede:["Declaring that i² = −1 sounds like cheating. It is not: it is the one addition that makes every polynomial equation solvable, and the price is that numbers stop living on a line and start living on a plane.",
      "การประกาศว่า i² = −1 ฟังดูเหมือนการโกง แต่ไม่ใช่ มันคือส่วนเพิ่มเพียงอย่างเดียวที่ทำให้สมการพหุนามทุกสมการแก้ได้ และราคาที่ต้องจ่ายคือจำนวนเลิกอยู่บนเส้นตรงแล้วย้ายไปอยู่บนระนาบ"],
next:["→ continues in Chapter 11 · Probability","→ ต่อในบทที่ 11 · ความน่าจะเป็น"],

nodes:[
{ id:"imaginary", x:235, y:52, requires:[], methods:["M-01"],
  title:["The imaginary unit","หน่วยจินตภาพ"],
  body:[["Define i so that i² = −1. Every complex number is then a + bi, with a the real part and b the imaginary part. Note that the imaginary part is b, a real number — not bi. Quoting bi as the imaginary part is trap T-01.",
         "Powers of i cycle with period four: i, −1, −i, 1, and then round again. So i to any power reduces to whichever of those four the exponent leaves on division by 4 — a fact that turns an intimidating question like i⁵⁰ into a remainder calculation."],
        ["นิยาม i ให้ i² = −1 จากนั้นจำนวนเชิงซ้อนทุกตัวคือ a + bi โดย a คือส่วนจริงและ b คือส่วนจินตภาพ สังเกตว่าส่วนจินตภาพคือ b ซึ่งเป็นจำนวนจริง ไม่ใช่ bi การตอบว่า bi คือส่วนจินตภาพคือกับดัก T-01",
         "กำลังของ i วนซ้ำด้วยคาบสี่ ได้แก่ i, −1, −i, 1 แล้ววนใหม่ ดังนั้น i ยกกำลังใดก็ตามจะลดรูปเหลือหนึ่งในสี่ตัวนั้นตามเศษที่เหลือจากการหารด้วย 4 ข้อเท็จจริงนี้เปลี่ยนคำถามที่ดูน่ากลัวอย่าง i⁵⁰ ให้กลายเป็นการหาเศษ"]],
  formula:["i² = −1        i¹ = i , i² = −1 , i³ = −i , i⁴ = 1","i² = −1        i¹ = i , i² = −1 , i³ = −i , i⁴ = 1"],
  flabel:["Powers of i cycle every four","กำลังของ i วนซ้ำทุกสี่"],
  viz:"grid",
  vizcfg:{
    title:["POWERS OF i GO ROUND IN FOURS","กำลังของ i วนซ้ำทีละสี่"],
    cols:[["n","n"],["iⁿ","iⁿ"],["Remainder n ÷ 4","เศษของ n ÷ 4"]],
    ctrls:[{k:"n", lab:["Exponent n","เลขชี้กำลัง n"], min:0, max:11, step:1, def:0, unit:""}],
    readouts:[
      {lab:["i^n","i^n"], f:function(S){ return ["1","i","−1","−i"][S.p.n%4]; }},
      {lab:["Remainder on dividing by 4","เศษเมื่อหารด้วย 4"], f:function(S){ return String(S.p.n%4); }},
      {lab:["i⁵⁰ for example","เช่น i⁵⁰"], f:function(){
        return L()?"50 ÷ 4 เหลือเศษ 2 จึงได้ −1":"50 leaves remainder 2, so it is −1"; }},
      {lab:["Why four","ทำไมต้องสี่"], f:function(){
        return L()?"การคูณด้วย i หมุน 90° สี่ครั้งครบรอบ":"multiplying by i turns 90°, and four turns is a full circle"; }}
    ],
    rows:function(p){
      var V=["1","i","−1","−i"];
      var out=[];
      for(var n=0;n<12;n++) out.push([{v:String(n), on:n===p.n, col:"ink"},
                                      {v:V[n%4], on:n===p.n, col:"accent"},
                                      {v:String(n%4), on:n===p.n, col:"good"}]);
      return out;
    },
    note:["read down the middle column and the same four symbols repeat forever","อ่านลงมาตามคอลัมน์กลาง สัญลักษณ์สี่ตัวเดิมวนซ้ำไม่รู้จบ"]
  } },

{ id:"arithmetic", x:100, y:150, requires:["imaginary"], methods:["M-02"],
  title:["Arithmetic","การคำนวณ"],
  body:[["Add and subtract componentwise, exactly as with vectors. Multiply by expanding as usual, then replace every i² with −1 and collect terms — that replacement is the only new step.",
         "Division needs a trick: multiply top and bottom by the conjugate of the denominator. Since (a + bi)(a − bi) = a² + b², the denominator becomes real and the answer separates cleanly into a + bi form. The plus sign in a² + b² comes from the i² turning negative twice; writing a² − b² there is trap T-02."],
        ["บวกและลบทีละส่วนเหมือนเวกเตอร์ทุกประการ คูณโดยกระจายตามปกติ แล้วแทน i² ทุกตัวด้วย −1 และรวมพจน์ การแทนค่านั้นคือขั้นตอนใหม่เพียงขั้นเดียว",
         "การหารต้องใช้เทคนิค คือคูณทั้งเศษและส่วนด้วยสังยุคของตัวส่วน เนื่องจาก (a + bi)(a − bi) = a² + b² ตัวส่วนจึงกลายเป็นจำนวนจริงและคำตอบแยกออกเป็นรูป a + bi ได้สะอาด เครื่องหมายบวกใน a² + b² มาจาก i² ที่ติดลบสองครั้ง การเขียน a² − b² ตรงนั้นคือกับดัก T-02"]],
  formula:["(a + bi)(a − bi) = a² + b²    ← plus, not minus","(a + bi)(a − bi) = a² + b²    ← บวก ไม่ใช่ลบ"],
  flabel:["Divide by multiplying by the conjugate","หารโดยคูณด้วยสังยุค"],
  viz:"grid",
  vizcfg:{
    title:["EXPANDING A PRODUCT, TERM BY TERM","กระจายผลคูณทีละพจน์"],
    cols:[["Term","พจน์"],["Product","ผลคูณ"],["After i² = −1","หลังแทน i² = −1"],["Goes to","ไปอยู่ที่"]],
    ctrls:[
      {k:"a", lab:["a","a"], min:-5, max:5, step:1, def:2, unit:""},
      {k:"b", lab:["b","b"], min:-5, max:5, step:1, def:3, unit:""},
      {k:"c", lab:["c","c"], min:-5, max:5, step:1, def:1, unit:""},
      {k:"d", lab:["d","d"], min:-5, max:5, step:1, def:4, unit:""}
    ],
    readouts:[
      {lab:["Real part","ส่วนจริง"], f:function(S){ return fmt2(S.p.a*S.p.c-S.p.b*S.p.d); }},
      {lab:["Imaginary part","ส่วนจินตภาพ"], f:function(S){ return fmt2(S.p.a*S.p.d+S.p.b*S.p.c); }},
      {lab:["Which term flips sign","พจน์ใดกลับเครื่องหมาย"], f:function(){
        return L()?"พจน์ bd เพราะมี i²":"the bd term, because it carries i²"; }},
      {lab:["Product with the conjugate","ผลคูณกับสังยุค"], f:function(S){
        return fmt2(S.p.a*S.p.a+S.p.b*S.p.b)+(L()?" · จำนวนจริงเสมอ":" · always real"); }}
    ],
    rows:function(p){
      return [[{v:"a·c", on:false, col:"ink"}, {v:fmt2(p.a*p.c), on:true, col:"accent"},
               {v:fmt2(p.a*p.c), on:true, col:"accent"}, {v:["real","ส่วนจริง"], on:true, col:"accent"}],
              [{v:"a·di", on:false, col:"ink"}, {v:fmt2(p.a*p.d)+"i", on:true, col:"good"},
               {v:fmt2(p.a*p.d)+"i", on:true, col:"good"}, {v:["imaginary","ส่วนจินตภาพ"], on:true, col:"good"}],
              [{v:"bi·c", on:false, col:"ink"}, {v:fmt2(p.b*p.c)+"i", on:true, col:"good"},
               {v:fmt2(p.b*p.c)+"i", on:true, col:"good"}, {v:["imaginary","ส่วนจินตภาพ"], on:true, col:"good"}],
              [{v:"bi·di", on:false, col:"ink"}, {v:fmt2(p.b*p.d)+"i²", on:true, col:"warn"},
               {v:fmt2(-p.b*p.d), on:true, col:"warn"}, {v:["real","ส่วนจริง"], on:true, col:"warn"}]];
    },
    note:["only the last row changes — i² turns it real and flips its sign","มีเพียงแถวสุดท้ายที่เปลี่ยน i² ทำให้มันเป็นจำนวนจริงและกลับเครื่องหมาย"]
  } },

{ id:"argand", x:370, y:150, requires:["imaginary"], methods:["M-03"],
  title:["The Argand plane","ระนาบเชิงซ้อน"],
  body:[["Plot the real part horizontally and the imaginary part vertically and a complex number becomes a point — or an arrow from the origin. Its length |z| = √(a² + b²) is the modulus and its angle from the positive real axis is the argument.",
         "The conjugate is the reflection in the real axis. That geometric reading explains why a conjugate pair has the same modulus and opposite arguments, and why multiplying a number by its conjugate lands you on the real axis at |z|². Drag the point in the lab and watch modulus, argument and conjugate move together."],
        ["วาดส่วนจริงตามแนวนอนและส่วนจินตภาพตามแนวตั้ง จำนวนเชิงซ้อนก็กลายเป็นจุด หรือเป็นลูกศรจากจุดกำเนิด ความยาวของมัน |z| = √(a² + b²) คือมอดูลัส และมุมจากแกนจริงด้านบวกคืออาร์กิวเมนต์",
         "สังยุคคือภาพสะท้อนในแกนจริง การอ่านเชิงเรขาคณิตนี้อธิบายว่าทำไมคู่สังยุคจึงมีมอดูลัสเท่ากันและอาร์กิวเมนต์ตรงข้ามกัน และทำไมการคูณจำนวนด้วยสังยุคของมันจึงไปตกบนแกนจริงที่ |z|² ลองลากจุดในห้องทดลองแล้วดูมอดูลัส อาร์กิวเมนต์ และสังยุคขยับไปพร้อมกัน"]],
  formula:["|z| = √(a² + b²)        arg z = tan⁻¹(b/a) , adjusted for quadrant","|z| = √(a² + b²)        arg z = tan⁻¹(b/a) , ปรับตามควอดรันต์"],
  flabel:["The conjugate is a reflection in the real axis","สังยุคคือการสะท้อนในแกนจริง"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"a", lab:["Real part a","ส่วนจริง a"], min:-4, max:4, step:.1, def:3, unit:""},
      {k:"b", lab:["Imaginary part b","ส่วนจินตภาพ b"], min:-4, max:4, step:.1, def:2, unit:""},
      {k:"conj", lab:["0 hide · 1 show conjugate","0 ซ่อน · 1 แสดงสังยุค"], min:0, max:1, step:1, def:1, unit:""},
      {k:"mult", lab:["Multiply by i, n times","คูณด้วย i, n ครั้ง"], min:0, max:4, step:1, def:0, unit:""}
    ],
    readouts:[
      {lab:["z","z"], f:function(S){ var p=S.p;
        return fmt2(p.a)+(p.b>=0?" + ":" − ")+fmt2(Math.abs(p.b))+"i"; }},
      {lab:["Modulus |z|","มอดูลัส |z|"], f:function(S){ var p=S.p;
        return fmt2(Math.sqrt(p.a*p.a+p.b*p.b)); }},
      {lab:["Argument","อาร์กิวเมนต์"], f:function(S){ var p=S.p;
        if(Math.abs(p.a)<1e-9 && Math.abs(p.b)<1e-9) return L()?"ไม่นิยาม":"undefined";
        return fmt2(Math.atan2(p.b,p.a)*180/Math.PI)+"°"; }},
      {lab:["z · z̄","z · z̄"], f:function(S){ var p=S.p;
        return fmt2(p.a*p.a+p.b*p.b)+(L()?" · จำนวนจริงเสมอ":" · always real"); }}
    ],
    draw:function(S,o){
      var p=S.p;
      /* multiplying by i is a quarter turn, applied n times */
      var a=p.a, b=p.b, i;
      for(i=0;i<p.mult;i++){ var na=-b, nb=a; a=na; b=nb; }
      var A=axes(o,{x:80,y:30,w:400,h:246,xmin:-5,xmax:5,ymin:-5,ymax:5,
                    title:["ARGAND PLANE","ระนาบเชิงซ้อน"],xlab:"Re",ylab:"Im",xticks:5,yticks:5});
      var m=Math.sqrt(a*a+b*b);
      if(m>0.05){
        o.push('<ellipse cx="'+A.X(0)+'" cy="'+A.Y(0)+'" rx="'+(A.X(m)-A.X(0))+
               '" ry="'+(A.Y(0)-A.Y(m))+'" fill="none" stroke="var(--rule)" stroke-width="1.2" stroke-dasharray="3 4"/>');
      }
      if(m>0.2){
        var th=Math.atan2(b,a), arc="M"+A.X(1.1)+" "+A.Y(0), k;
        for(k=1;k<=24;k++){ var t=th*k/24;
          arc+=" L"+A.X(1.1*Math.cos(t))+" "+A.Y(1.1*Math.sin(t)); }
        o.push('<path d="'+arc+'" stroke="var(--warn)" stroke-width="1.5" fill="none"/>');
      }
      if(p.conj===1){
        o.push('<line x1="'+A.X(0)+'" y1="'+A.Y(0)+'" x2="'+A.X(a)+'" y2="'+A.Y(-b)+
               '" stroke="var(--good)" stroke-width="2" stroke-dasharray="5 4"/>');
        o.push('<circle cx="'+A.X(a)+'" cy="'+A.Y(-b)+'" r="4.5" fill="var(--good)"/>');
        o.push('<text x="'+(A.X(a)+9)+'" y="'+(A.Y(-b)+14)+
               '" fill="var(--good)" font-family="IBM Plex Sans" font-size="10.5">z̄</text>');
        o.push('<line x1="'+A.X(a)+'" y1="'+A.Y(b)+'" x2="'+A.X(a)+'" y2="'+A.Y(-b)+
               '" stroke="var(--rule)" stroke-width="1" stroke-dasharray="2 3"/>');
      }
      o.push('<line x1="'+A.X(0)+'" y1="'+A.Y(0)+'" x2="'+A.X(a)+'" y2="'+A.Y(b)+
             '" stroke="var(--accent)" stroke-width="2.6"/>');
      o.push('<circle cx="'+A.X(a)+'" cy="'+A.Y(b)+'" r="5.5" fill="var(--accent)"/>');
      o.push('<text x="'+(A.X(a)+9)+'" y="'+(A.Y(b)-9)+
             '" fill="var(--accent)" font-family="IBM Plex Sans" font-size="11">'+
             fmt2(a)+(b>=0?" + ":" − ")+fmt2(Math.abs(b))+'i</text>');
      o.push('<text x="80" y="304" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["dashed circle = modulus · amber arc = argument","วงกลมประ = มอดูลัส · ส่วนโค้งเหลืองอำพัน = อาร์กิวเมนต์"])+'</text>');
      o.push('<text x="80" y="320" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["each multiplication by i rotates a quarter turn anticlockwise","การคูณด้วย i แต่ละครั้งหมุนไปหนึ่งในสี่รอบทวนเข็มนาฬิกา"])+'</text>');
    }
  },
  guide:[
    {say:["The red arrow is z = 3 + 2i. Its length is the modulus, and the amber arc is the argument.",
          "ลูกศรสีแดงคือ z = 3 + 2i ความยาวคือมอดูลัส และส่วนโค้งสีเหลืองอำพันคืออาร์กิวเมนต์"], set:{a:3,b:2,conj:0,mult:0}},
    {say:["Bring in the conjugate. It is the mirror image in the real axis — same modulus, opposite argument.",
          "เพิ่มสังยุคเข้ามา มันคือภาพสะท้อนในแกนจริง มอดูลัสเท่ากัน อาร์กิวเมนต์ตรงข้าม"], set:{a:3,b:2,conj:1,mult:0}},
    {say:["Multiply by i once. The arrow does not stretch — it turns a quarter circle. Multiplication by i is pure rotation.",
          "คูณด้วย i หนึ่งครั้ง ลูกศรไม่ยืดออก แต่หมุนไปหนึ่งในสี่รอบ การคูณด้วย i คือการหมุนล้วนๆ"], set:{a:3,b:2,conj:0,mult:1}},
    {say:["Four multiplications return it exactly where it started. That is why powers of i cycle with period four.",
          "คูณสี่ครั้งแล้วกลับมาที่เดิมพอดี นั่นคือเหตุผลที่กำลังของ i วนซ้ำด้วยคาบสี่"], set:{a:3,b:2,conj:0,mult:4}}
  ]},

{ id:"polar", x:235, y:248, requires:["argand"], methods:["M-04"],
  title:["Polar form","รูปเชิงขั้ว"],
  body:[["Writing z = r(cos θ + i sin θ) records the same number as a length and a direction instead of two coordinates. Nothing is gained for addition, but multiplication becomes trivial: multiply the moduli and add the arguments.",
         "That is why the lab's rotation demonstration works — multiplying by i means multiplying modulus by 1 and adding 90°, so the arrow only turns. De Moivre's theorem extends the same idea to powers: zⁿ has modulus rⁿ and argument nθ."],
        ["การเขียน z = r(cos θ + i sin θ) บันทึกจำนวนเดียวกันในรูปความยาวกับทิศทางแทนที่จะเป็นสองพิกัด การบวกไม่ได้ประโยชน์อะไร แต่การคูณกลายเป็นเรื่องง่าย คือคูณมอดูลัสและบวกอาร์กิวเมนต์",
         "นั่นคือเหตุผลที่การสาธิตการหมุนในห้องทดลองใช้ได้ การคูณด้วย i หมายถึงคูณมอดูลัสด้วย 1 และบวก 90° ลูกศรจึงแค่หมุน ทฤษฎีบทเดอมัวร์ขยายแนวคิดเดียวกันไปสู่การยกกำลัง zⁿ มีมอดูลัส rⁿ และอาร์กิวเมนต์ nθ"]],
  formula:["z₁z₂ : moduli multiply, arguments add        zⁿ = rⁿ(cos nθ + i sin nθ)","z₁z₂ : มอดูลัสคูณกัน อาร์กิวเมนต์บวกกัน        zⁿ = rⁿ(cos nθ + i sin nθ)"],
  flabel:["Arguments add — they do not multiply","อาร์กิวเมนต์บวกกัน ไม่ใช่คูณกัน"],
  viz:"bars",
  vizcfg:{
    title:["MULTIPLY THE LENGTHS, ADD THE ANGLES","คูณความยาว บวกมุม"],
    ylab:["modulus  ·  degrees","มอดูลัส  ·  องศา"],
    ctrls:[
      {k:"r1", lab:["|z₁|","|z₁|"], min:.5, max:6, step:.5, def:2, unit:""},
      {k:"t1", lab:["arg z₁","arg z₁"], min:0, max:180, step:5, def:30, unit:"°"},
      {k:"r2", lab:["|z₂|","|z₂|"], min:.5, max:6, step:.5, def:3, unit:""},
      {k:"t2", lab:["arg z₂","arg z₂"], min:0, max:180, step:5, def:45, unit:"°"}
    ],
    readouts:[
      {lab:["|z₁z₂|","|z₁z₂|"], f:function(S){ return fmt2(S.p.r1*S.p.r2); }},
      {lab:["arg(z₁z₂)","arg(z₁z₂)"], f:function(S){ return fmt2(S.p.t1+S.p.t2)+"°"; }},
      {lab:["Moduli","มอดูลัส"], f:function(){ return L()?"คูณกัน":"multiply"; }},
      {lab:["Arguments","อาร์กิวเมนต์"], f:function(){ return L()?"บวกกัน ไม่ใช่คูณกัน":"add — they never multiply"; }}
    ],
    bars:[
      {lab:["|z₁|","|z₁|"], f:function(p){ return p.r1; }, col:"faint"},
      {lab:["|z₂|","|z₂|"], f:function(p){ return p.r2; }, col:"faint"},
      {lab:["|z₁z₂| = product","|z₁z₂| = ผลคูณ"], f:function(p){ return p.r1*p.r2; }, col:"accent"},
      {lab:["arg sum (°)","ผลบวกมุม (°)"], f:function(p){ return p.t1+p.t2; }, col:"good"}
    ],
    note:["De Moivre's theorem is this rule applied over and over to the same number","ทฤษฎีบทเดอมัวร์คือกฎข้อนี้ที่ใช้ซ้ำๆ กับจำนวนเดียวกัน"]
  } },

{ id:"roots", x:235, y:346, requires:["polar","arithmetic"], methods:["M-05"],
  title:["Complex roots","รากเชิงซ้อน"],
  body:[["When a quadratic with real coefficients has a negative discriminant, its roots are complex — and they always arrive as a conjugate pair, because the ± in the formula sits in front of an imaginary square root. Reporting only one root is trap T-03.",
         "This is what the fundamental theorem of algebra guarantees: a degree-n polynomial has exactly n roots over the complex numbers, counting multiplicity. Nothing is ever unsolvable any more; some solutions simply sit off the real line."],
        ["เมื่อสมการกำลังสองที่มีสัมประสิทธิ์เป็นจำนวนจริงมีดิสคริมิแนนต์เป็นลบ รากของมันจะเป็นจำนวนเชิงซ้อน และมาเป็นคู่สังยุคเสมอ เพราะเครื่องหมาย ± ในสูตรอยู่หน้ารากที่สองที่เป็นจินตภาพ การตอบรากเดียวคือกับดัก T-03",
         "นี่คือสิ่งที่ทฤษฎีบทมูลฐานของพีชคณิตรับประกันไว้ พหุนามดีกรี n มีราก n ตัวพอดีบนจำนวนเชิงซ้อน โดยนับพหุคูณ ไม่มีอะไรแก้ไม่ได้อีกต่อไป เพียงแต่คำตอบบางตัวอยู่นอกเส้นจำนวนจริง"]],
  formula:["b² − 4ac < 0  ⟹  roots p ± qi , always a conjugate pair","b² − 4ac < 0  ⟹  ราก p ± qi เป็นคู่สังยุคเสมอ"],
  flabel:["Complex roots come in pairs","รากเชิงซ้อนมาเป็นคู่"],
  viz:"plot",
  vizcfg:{
    title:["WHEN THE PARABOLA MISSES THE AXIS","เมื่อพาราโบลาพลาดแกน"],
    xlab:["x","x"], ylab:["y = x² + bx + c","y = x² + bx + c"],
    xmin:-6, xmax:6, fill:false,
    fn:function(x,p){ return x*x + p.b*x + p.c; },
    ctrls:[
      {k:"b", lab:["b","b"], min:-6, max:6, step:.5, def:-4, unit:""},
      {k:"c", lab:["c","c"], min:-6, max:12, step:.5, def:8, unit:""}
    ],
    readouts:[
      {lab:["Discriminant b² − 4c","ดิสคริมิแนนต์ b² − 4c"], f:function(S){
        return fmt2(S.p.b*S.p.b-4*S.p.c); }},
      {lab:["Roots","ราก"], f:function(S){
        var D=S.p.b*S.p.b-4*S.p.c;
        if(D>1e-9) return fmt2((-S.p.b-Math.sqrt(D))/2)+"  "+(L()?"และ":"and")+"  "+fmt2((-S.p.b+Math.sqrt(D))/2);
        if(Math.abs(D)<=1e-9) return fmt2(-S.p.b/2)+(L()?" · รากซ้ำ":" · a repeated root");
        return fmt2(-S.p.b/2)+" ± "+fmt2(Math.sqrt(-D)/2)+"i"; }},
      {lab:["Kind of roots","ชนิดของราก"], f:function(S){
        var D=S.p.b*S.p.b-4*S.p.c;
        return D>1e-9 ? (L()?"จำนวนจริงสองราก":"two real roots")
             : Math.abs(D)<=1e-9 ? (L()?"รากจริงซ้ำหนึ่งราก":"one repeated real root")
             : (L()?"คู่สังยุคเชิงซ้อน":"a complex conjugate pair"); }},
      {lab:["Do the roots exist?","รากมีอยู่ไหม"], f:function(){
        return L()?"มีเสมอ — เพียงแต่บางครั้งอยู่นอกเส้นจำนวนจริง":"always — sometimes just off the real line"; }}
    ],
    note:["missing the x-axis does not mean there is no solution, only none you can see on this axis","การพลาดแกน x ไม่ได้แปลว่าไม่มีคำตอบ เพียงแต่ไม่มีคำตอบที่มองเห็นบนแกนนี้"]
  },
  guide:[
    {say:["The curve floats clear above the axis. No real root exists — but two complex ones do.",
          "เส้นโค้งลอยพ้นเหนือแกน ไม่มีรากจริง แต่มีรากเชิงซ้อนสองราก"], set:{b:-4,c:8}},
    {say:["Lower it until it just kisses the axis. The discriminant hits zero and the roots merge into one.",
          "ลดลงมาจนแตะแกนพอดี ดิสคริมิแนนต์เป็นศูนย์และรากสองรากรวมเป็นหนึ่ง"], set:{b:-4,c:4}},
    {say:["Push it lower still and two real roots appear, spreading apart as the discriminant grows.",
          "ดันลงต่ำกว่านั้นอีก รากจริงสองรากปรากฏขึ้น และแยกออกจากกันเมื่อดิสคริมิแนนต์โตขึ้น"], set:{b:-4,c:0}}
  ] }
],

methods:[
{id:"M-01", name:["Simplify a power of i","ลดรูปกำลังของ i"]},
{id:"M-02", name:["Add, multiply or divide","บวก คูณ หรือหาร"]},
{id:"M-03", name:["Find modulus, argument, conjugate","หามอดูลัส อาร์กิวเมนต์ สังยุค"]},
{id:"M-04", name:["Work in polar form","ทำงานในรูปเชิงขั้ว"]},
{id:"M-05", name:["Find complex roots","หารากเชิงซ้อน"]}
],

traps:{
"T-01":["The imaginary part is b, a real number — not bi.","ส่วนจินตภาพคือ b ซึ่งเป็นจำนวนจริง ไม่ใช่ bi"],
"T-02":["(a + bi)(a − bi) = a² + b², with a plus. The i² supplies the second sign flip.","(a + bi)(a − bi) = a² + b² ใช้เครื่องหมายบวก ตัว i² ให้การกลับเครื่องหมายครั้งที่สอง"],
"T-03":["Complex roots of a real quadratic always come as a conjugate pair. Give both.","รากเชิงซ้อนของสมการกำลังสองจำนวนจริงมาเป็นคู่สังยุคเสมอ ต้องตอบทั้งคู่"],
"T-04":["In polar multiplication the moduli multiply but the arguments ADD.","ในการคูณเชิงขั้ว มอดูลัสคูณกัน แต่อาร์กิวเมนต์บวกกัน"]
},

gen:{
"M-01": function(sf){
  var n=pick([7,15,22,26,33,50]);
  var r=n%4, V=["1","i","−1","−i"];
  if(sf==="S-04") return {stem:["What is the period of the powers of i?","กำลังของ i มีคาบเท่าใด"],
    opts:[{v:"4",ok:1},{v:"2",trap:"T-01"},{v:"3"},{v:["No period","ไม่มีคาบ"]}],unit:""};
  if(sf==="S-03") return {stem:["In z = 5 − 3i, what is the imaginary part?","ใน z = 5 − 3i ส่วนจินตภาพคือเท่าใด"],
    opts:[{v:"−3",ok:1},{v:"−3i",trap:"T-01"},{v:"3",trap:"T-01"},{v:"5"}],unit:""};
  return {stem:["Simplify i^"+n+".","จงลดรูป i^"+n],
    opts:[{v:V[r],ok:1},{v:V[(r+1)%4],trap:"T-01"},{v:V[(r+2)%4]},{v:V[(r+3)%4]}],unit:""};
},
"M-02": function(sf){
  var a=pick([2,3,4]), b=pick([1,2,5]), c=pick([1,3,4]), d=pick([2,3,6]);
  if(sf==="S-04") return {stem:["What does (a + bi)(a − bi) equal?","(a + bi)(a − bi) เท่ากับอะไร"],
    opts:[{v:"a² + b²",ok:1},{v:"a² − b²",trap:"T-02"},{v:"a² + b²i",trap:"T-02"},{v:"a² − b²i"}],unit:""};
  if(sf==="S-03") return {stem:["To divide by "+c+" + "+d+"i, what do you multiply top and bottom by?",
                                "เมื่อหารด้วย "+c+" + "+d+"i ต้องคูณเศษและส่วนด้วยอะไร"],
    opts:[{v:c+" − "+d+"i",ok:1},{v:c+" + "+d+"i",trap:"T-02"},{v:"i"},{v:String(c)}],unit:""};
  var re=a*c-b*d, im=a*d+b*c;
  return {stem:["Expand ("+a+" + "+b+"i)("+c+" + "+d+"i).","จงกระจาย ("+a+" + "+b+"i)("+c+" + "+d+"i)"],
    opts:[{v:re+(im>=0?" + ":" − ")+Math.abs(im)+"i",ok:1},
          {v:(a*c+b*d)+(im>=0?" + ":" − ")+Math.abs(im)+"i",trap:"T-02"},
          {v:(a*c)+" + "+(b*d)+"i",trap:"T-02"},
          {v:re+(im>=0?" − ":" + ")+Math.abs(im)+"i"}],unit:""};
},
"M-03": function(sf){
  var P=[{a:3,b:4,m:5},{a:6,b:8,m:10},{a:5,b:12,m:13},{a:8,b:15,m:17}];
  var p=pick(P);
  if(sf==="S-04") return {stem:["Geometrically, what is the conjugate of z?","ในเชิงเรขาคณิต สังยุคของ z คืออะไร"],
    opts:[{v:["Its reflection in the real axis","ภาพสะท้อนในแกนจริง"],ok:1},
          {v:["Its reflection in the imaginary axis","ภาพสะท้อนในแกนจินตภาพ"],trap:"T-01"},
          {v:["Its rotation by 180°","การหมุน 180°"],trap:"T-01"},
          {v:["The same point","จุดเดิม"]}],unit:""};
  if(sf==="S-05") return {stem:["A complex number has |z| = "+p.m+" and real part "+p.a+". What is |b|?",
                                "จำนวนเชิงซ้อนมี |z| = "+p.m+" และส่วนจริง "+p.a+" ค่า |b| เป็นเท่าใด"],
    opts:[{v:String(p.b),ok:1},{v:String(p.m-p.a),trap:"T-02"},{v:String(p.m+p.a)},{v:String(p.a)}],unit:""};
  return {stem:["Find |z| for z = "+p.a+" + "+p.b+"i.","จงหา |z| ของ z = "+p.a+" + "+p.b+"i"],
    opts:[{v:String(p.m),ok:1},{v:String(p.a+p.b),trap:"T-02"},
          {v:fmt2(Math.abs(p.a*p.a-p.b*p.b)),trap:"T-02"},{v:String(p.a*p.b)}],unit:""};
},
"M-04": function(sf){
  var r1=pick([2,3,4]), r2=pick([2,5,6]), t1=pick([30,45,60]), t2=pick([20,30,90]);
  if(sf==="S-04") return {stem:["Multiplying two complex numbers in polar form does what to the arguments?",
                                "การคูณจำนวนเชิงซ้อนสองตัวในรูปเชิงขั้วทำอะไรกับอาร์กิวเมนต์"],
    opts:[{v:["Adds them","บวกกัน"],ok:1},{v:["Multiplies them","คูณกัน"],trap:"T-04"},
          {v:["Leaves them unchanged","ไม่เปลี่ยน"],trap:"T-04"},{v:["Subtracts them","ลบกัน"],trap:"T-04"}],unit:""};
  if(sf==="S-03") return {stem:["What does multiplying by i do to a point on the Argand plane?",
                                "การคูณด้วย i ทำอะไรกับจุดบนระนาบเชิงซ้อน"],
    opts:[{v:["Rotates it 90° anticlockwise","หมุน 90° ทวนเข็มนาฬิกา"],ok:1},
          {v:["Doubles its modulus","เพิ่มมอดูลัสเป็นสองเท่า"],trap:"T-04"},
          {v:["Reflects it in the real axis","สะท้อนในแกนจริง"],trap:"T-04"},
          {v:["Moves it one unit up","เลื่อนขึ้นหนึ่งหน่วย"]}],unit:""};
  return {stem:["z₁ has modulus "+r1+" and argument "+t1+"°; z₂ has modulus "+r2+" and argument "+t2+"°. Find z₁z₂ in polar form.",
                "z₁ มีมอดูลัส "+r1+" อาร์กิวเมนต์ "+t1+"° และ z₂ มีมอดูลัส "+r2+" อาร์กิวเมนต์ "+t2+"° จงหา z₁z₂ ในรูปเชิงขั้ว"],
    opts:[{v:["modulus "+(r1*r2)+", argument "+(t1+t2)+"°","มอดูลัส "+(r1*r2)+" อาร์กิวเมนต์ "+(t1+t2)+"°"],ok:1},
          {v:["modulus "+(r1*r2)+", argument "+(t1*t2)+"°","มอดูลัส "+(r1*r2)+" อาร์กิวเมนต์ "+(t1*t2)+"°"],trap:"T-04"},
          {v:["modulus "+(r1+r2)+", argument "+(t1+t2)+"°","มอดูลัส "+(r1+r2)+" อาร์กิวเมนต์ "+(t1+t2)+"°"],trap:"T-04"},
          {v:["modulus "+(r1*r2)+", argument "+Math.abs(t1-t2)+"°","มอดูลัส "+(r1*r2)+" อาร์กิวเมนต์ "+Math.abs(t1-t2)+"°"],trap:"T-04"}],unit:""};
},
"M-05": function(sf){
  var p=pick([1,2,3]), q=pick([1,2,3]);
  var b=2*p, c=p*p+q*q;
  if(sf==="S-04") return {stem:["A real quadratic has one root 2 + 5i. What is the other?",
                                "สมการกำลังสองจำนวนจริงมีรากหนึ่งเป็น 2 + 5i อีกรากคืออะไร"],
    opts:[{v:"2 − 5i",ok:1},{v:"−2 + 5i",trap:"T-03"},{v:"−2 − 5i",trap:"T-03"},
          {v:["There is no other root","ไม่มีรากอื่น"],trap:"T-03"}],unit:""};
  if(sf==="S-03") return {stem:["How many roots does a degree-5 polynomial have over the complex numbers?",
                                "พหุนามดีกรี 5 มีรากกี่ตัวบนจำนวนเชิงซ้อน"],
    opts:[{v:"5",ok:1},{v:["It depends on the discriminant","ขึ้นกับดิสคริมิแนนต์"],trap:"T-03"},
          {v:"1"},{v:"10"}],unit:""};
  return {stem:["Solve x² − "+b+"x + "+c+" = 0.","จงแก้ x² − "+b+"x + "+c+" = 0"],
    opts:[{v:p+" ± "+q+"i",ok:1},{v:p+" + "+q+"i",trap:"T-03"},
          {v:(-p)+" ± "+q+"i",trap:"T-03"},{v:["No solution","ไม่มีคำตอบ"],trap:"T-03"}],unit:""};
}
}
};
