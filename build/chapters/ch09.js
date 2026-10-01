/* Chapter 09 rope: two Gaussian pulses that pass through each other. They
   leave the ends at 4 m/s and meet in the middle at t = 1.75 s. */
var C09 = {
  v: 4, w: 1.4, tm: 1.75, yc: 140, k: 11,
  X: function(x){ return 50 + x * 23.5; },
  Y: function(y){ return C09.yc - y * C09.k; },
  c1: function(t){ return 3 + C09.v * t; },
  c2: function(t){ return 17 - C09.v * t; },
  p1: function(p, x, t){ var u = (x - C09.c1(t)) / C09.w; return p.A1 * Math.exp(-u * u); },
  p2: function(p, x, t){ var u = (x - C09.c2(t)) / C09.w; return p.A2 * Math.exp(-u * u); },
  y: function(p, x, t){ return C09.p1(p, x, t) + C09.p2(p, x, t); },
  cands: function(p){
    var c = [p.A1 + p.A2, p.A1 - p.A2, p.A2 - p.A1, 0, Math.max(Math.abs(p.A1), Math.abs(p.A2))], u = [];
    c.forEach(function(v){ if(u.every(function(w){ return Math.abs(w - v) > 1e-9; })) u.push(v); });
    return u.sort(function(a, b){ return a - b; });
  }
};

var CHAPTER = {
id:"ch09", num:"09", slug:"waves", subject:"physics",
kicker:["Physics · Chapter 09","ฟิสิกส์ · บทที่ 9"],
title:["Waves","คลื่น"],
mapTitle:["Energy without transport","พลังงานที่เดินทางโดยสสารอยู่กับที่"],
lede:["A wave carries energy across a room while every particle in the room stays where it is. Once that separation is clear, the four wave behaviours and every formula built on them follow naturally.",
      "คลื่นพาพลังงานข้ามห้องไปในขณะที่อนุภาคทุกตัวในห้องอยู่ที่เดิม เมื่อเข้าใจการแยกกันนี้แล้ว สมบัติของคลื่นทั้งสี่และทุกสูตรที่สร้างบนมันจะตามมาเอง"],
next:["→ continues in Chapters 10–12 · Light and Sound","→ ต่อในบทที่ 10–12 · แสงและเสียง"],

nodes:[
{ id:"anatomy", x:235, y:52, requires:[], methods:["M-01"],
  title:["Anatomy of a wave","องค์ประกอบของคลื่น"],
  body:[["Wavelength is the distance between repeats, amplitude is the maximum displacement from rest, and frequency is how many whole waves pass a point each second. Period is simply 1/f.",
         "Amplitude carries the energy; frequency and wavelength carry the identity. Louder is bigger amplitude, higher-pitched is greater frequency, and the two are entirely independent."],
        ["ความยาวคลื่นคือระยะระหว่างการซ้ำ แอมพลิจูดคือการกระจัดสูงสุดจากตำแหน่งสมดุล และความถี่คือจำนวนคลื่นเต็มลูกที่ผ่านจุดหนึ่งในหนึ่งวินาที ส่วนคาบคือ 1/f",
         "แอมพลิจูดเป็นตัวพาพลังงาน ส่วนความถี่และความยาวคลื่นบอกเอกลักษณ์ เสียงดังขึ้นคือแอมพลิจูดใหญ่ขึ้น เสียงสูงขึ้นคือความถี่มากขึ้น และทั้งสองเป็นอิสระต่อกันสิ้นเชิง"]],
  formula:["T = 1/f","T = 1/f"],
  flabel:["Amplitude carries the energy","แอมพลิจูดเป็นตัวพาพลังงาน"],
  viz:"wave" },

{ id:"wave-equation", x:235, y:150, requires:["anatomy"], methods:["M-02"],
  title:["The wave equation","สมการคลื่น"],
  body:[["v = fλ is the only equation most wave questions need. It says a wave travels one wavelength in one period, which is almost a definition rather than a discovery.",
         "The critical fact for later chapters: when a wave crosses into a new medium the frequency never changes — it is set by the source. The speed changes, and the wavelength changes to match. Changing f at a boundary is trap T-02."],
        ["v = fλ เป็นสมการเดียวที่โจทย์คลื่นส่วนใหญ่ต้องใช้ มันบอกว่าคลื่นเดินทางได้หนึ่งความยาวคลื่นในหนึ่งคาบ ซึ่งเกือบจะเป็นนิยามมากกว่าการค้นพบ",
         "ข้อเท็จจริงสำคัญสำหรับบทถัดไปคือ เมื่อคลื่นข้ามเข้าสู่ตัวกลางใหม่ ความถี่ไม่เคยเปลี่ยน เพราะถูกกำหนดโดยแหล่งกำเนิด สิ่งที่เปลี่ยนคืออัตราเร็ว และความยาวคลื่นเปลี่ยนตาม การเปลี่ยน f ที่รอยต่อคือกับดัก T-02"]],
  formula:["v = fλ","v = fλ"],
  flabel:["f is fixed by the source","f ถูกกำหนดโดยแหล่งกำเนิด"],
  viz:"wave",
  guide:[
    {say:["Press Play. The wave travels right, but watch the red dot — it only moves up and down, never sideways.",
          "กดเล่น คลื่นเดินทางไปขวา แต่ดูจุดสีแดง มันขยับขึ้นลงเท่านั้น ไม่เคยเคลื่อนไปด้านข้าง"], set:{A:5,lam:8,f:1,T:8}},
    {say:["Double the wavelength at the same frequency. The bar on the axis stretches, and the wave moves twice as fast.",
          "เพิ่มความยาวคลื่นเป็นสองเท่าที่ความถี่เดิม แถบบนแกนจะยืดออก และคลื่นเคลื่อนที่เร็วขึ้นสองเท่า"], set:{A:5,lam:16,f:1,T:8}},
    {say:["Now raise the frequency instead. The shape is unchanged but it passes faster — v = fλ, both ways.",
          "ทีนี้เพิ่มความถี่แทน รูปร่างไม่เปลี่ยนแต่ผ่านไปเร็วขึ้น v = fλ ได้ทั้งสองทาง"], set:{A:5,lam:8,f:2,T:8}},
    {say:["Amplitude changes the height and nothing else. Speed and wavelength are untouched — amplitude is energy alone.",
          "แอมพลิจูดเปลี่ยนความสูงเท่านั้น อัตราเร็วและความยาวคลื่นไม่เปลี่ยน แอมพลิจูดคือพลังงานล้วนๆ"], set:{A:9,lam:8,f:1,T:8}}
  ]},

{ id:"types", x:100, y:248, requires:["anatomy"], methods:["M-03"],
  title:["Types of wave","ชนิดของคลื่น"],
  body:[["Transverse waves oscillate perpendicular to their direction of travel; longitudinal waves oscillate along it, producing compressions and rarefactions. Light is transverse, sound is longitudinal.",
         "The distinction has a hard consequence: only transverse waves can be polarised. If a wave can be polarised, it is transverse — which is how we know light is a transverse wave."],
        ["คลื่นตามขวางสั่นตั้งฉากกับทิศการเคลื่อนที่ ส่วนคลื่นตามยาวสั่นในแนวเดียวกัน ทำให้เกิดส่วนอัดและส่วนขยาย แสงเป็นคลื่นตามขวาง เสียงเป็นคลื่นตามยาว",
         "ความแตกต่างนี้มีผลชัดเจนคือ มีเพียงคลื่นตามขวางเท่านั้นที่เกิดโพลาไรเซชันได้ ถ้าคลื่นใดเกิดโพลาไรเซชันได้ คลื่นนั้นเป็นคลื่นตามขวาง ซึ่งเป็นวิธีที่เรารู้ว่าแสงเป็นคลื่นตามขวาง"]],
  formula:["Transverse ⟂ travel    ·    Longitudinal ∥ travel","ตามขวาง ⟂ ทิศเคลื่อนที่  ·  ตามยาว ∥ ทิศเคลื่อนที่"],
  flabel:["Only transverse waves polarise","เฉพาะคลื่นตามขวางที่โพลาไรซ์ได้"],
  viz:"table",
  vizcfg:{
    title:["TRANSVERSE AGAINST LONGITUDINAL","คลื่นตามขวาง เทียบ คลื่นตามยาว"],
    cols:[["Property","สมบัติ"],["Transverse","ตามขวาง"],["Longitudinal","ตามยาว"]],
    rowKey:"i",
    readouts:[
      {lab:["Row","แถว"], f:function(S){
        return [["Particle motion","การสั่นของอนุภาค"],["Example","ตัวอย่าง"],
                ["Can it polarise?","โพลาไรซ์ได้ไหม"],["Travels in a vacuum?","ผ่านสุญญากาศได้ไหม"],
                ["Named features","ชื่อส่วนประกอบ"]][S.p.i][L()]; }},
      {lab:["The key difference","ความต่างสำคัญ"], f:function(){
        return L()?"ทิศการสั่นเทียบกับทิศการเดินทาง":"vibration direction relative to travel direction"; }}
    ],
    rows:function(p){
      var R=[[["Particle motion","การสั่นของอนุภาค"],["perpendicular to travel","ตั้งฉากกับการเดินทาง"],["along the travel","ตามแนวการเดินทาง"]],
             [["Example","ตัวอย่าง"],["light, water ripples","แสง คลื่นผิวน้ำ"],["sound","เสียง"]],
             [["Polarisable?","โพลาไรซ์ได้ไหม"],["yes","ได้"],["no","ไม่ได้"]],
             [["In a vacuum?","ผ่านสุญญากาศ"],["only if electromagnetic","เฉพาะคลื่นแม่เหล็กไฟฟ้า"],["never","ไม่ได้เลย"]],
             [["Features","ส่วนประกอบ"],["crest and trough","สันและท้อง"],["compression and rarefaction","ส่วนอัดและส่วนขยาย"]]];
      return R.map(function(r,i){ return r.map(function(c,j){ return {v:c, on:i===p.i, col:j===0?"soft":(j===1?"accent":"good")}; }); });
    },
    note:["only a transverse wave has a vibration direction to filter — that is why sound cannot polarise","เฉพาะคลื่นตามขวางเท่านั้นที่มีทิศการสั่นให้กรอง จึงเป็นเหตุผลที่เสียงโพลาไรซ์ไม่ได้"]
  } },

{ id:"behaviours", x:370, y:248, requires:["wave-equation"], methods:["M-04"],
  title:["The four behaviours","สมบัติทั้งสี่"],
  body:[["Every wave reflects, refracts, diffracts and interferes. Reflection obeys equal angles. Refraction bends the wave because its speed changed, following sin θ₁/sin θ₂ = v₁/v₂.",
         "Diffraction is spreading through a gap, and it is only pronounced when the gap is comparable to the wavelength. A wide gap barely diffracts at all, which is why you can hear round a corner but not see round one."],
        ["คลื่นทุกชนิดสะท้อน หักเห เลี้ยวเบน และแทรกสอด การสะท้อนเป็นไปตามมุมเท่ากัน การหักเหทำให้คลื่นเบนเพราะอัตราเร็วเปลี่ยน ตาม sin θ₁/sin θ₂ = v₁/v₂",
         "การเลี้ยวเบนคือการแผ่ผ่านช่อง และจะเห็นชัดเมื่อช่องมีขนาดใกล้เคียงความยาวคลื่นเท่านั้น ช่องกว้างแทบไม่เลี้ยวเบนเลย จึงเป็นเหตุผลที่เราได้ยินเสียงอ้อมมุมได้แต่มองไม่เห็นอ้อมมุม"]],
  formula:["sin θ₁ / sin θ₂ = v₁ / v₂ = λ₁ / λ₂","sin θ₁ / sin θ₂ = v₁ / v₂ = λ₁ / λ₂"],
  flabel:["Snell's law · f unchanged","กฎสเนลล์ · f ไม่เปลี่ยน"],
  viz:"table",
  vizcfg:{
    title:["WHAT SURVIVES EACH BEHAVIOUR","อะไรที่ยังคงเดิมในแต่ละพฤติกรรม"],
    cols:[["Behaviour","พฤติกรรม"],["Frequency","ความถี่"],["Wavelength","ความยาวคลื่น"],["Speed","อัตราเร็ว"],["Direction","ทิศทาง"]],
    rowKey:"i",
    readouts:[
      {lab:["Behaviour","พฤติกรรม"], f:function(S){
        return [["Reflection","การสะท้อน"],["Refraction","การหักเห"],
                ["Diffraction","การเลี้ยวเบน"],["Interference","การแทรกสอด"]][S.p.i][L()]; }},
      {lab:["Frequency","ความถี่"], f:function(){
        return L()?"ไม่เคยเปลี่ยนเลย ในทั้งสี่กรณี":"never changes — in any of the four"; }},
      {lab:["Why","เพราะ"], f:function(){
        return L()?"ความถี่ถูกกำหนดโดยแหล่งกำเนิด ไม่ใช่ตัวกลาง":"frequency is set by the source, not the medium"; }}
    ],
    rows:function(p){
      var R=[[["Reflection","การสะท้อน"],["same","เท่าเดิม"],["same","เท่าเดิม"],["same","เท่าเดิม"],["changes","เปลี่ยน"]],
             [["Refraction","การหักเห"],["same","เท่าเดิม"],["changes","เปลี่ยน"],["changes","เปลี่ยน"],["changes","เปลี่ยน"]],
             [["Diffraction","การเลี้ยวเบน"],["same","เท่าเดิม"],["same","เท่าเดิม"],["same","เท่าเดิม"],["spreads","แผ่ออก"]],
             [["Interference","การแทรกสอด"],["same","เท่าเดิม"],["same","เท่าเดิม"],["same","เท่าเดิม"],["pattern","เกิดลวดลาย"]]];
      return R.map(function(r,i){
        return r.map(function(c,j){
          var changed = (c[0]!=="same");
          return {v:c, on:i===p.i, col:j===0?"ink":(changed?"warn":"good")};
        });
      });
    },
    note:["read down the frequency column — it says the same word four times","อ่านลงมาตามคอลัมน์ความถี่ มันบอกคำเดิมสี่ครั้ง"]
  },
  guide:[
    {say:["Refraction changes wavelength, speed and direction all at once — but look at the frequency column.",
          "การหักเหเปลี่ยนความยาวคลื่น อัตราเร็ว และทิศทางพร้อมกัน แต่ลองดูคอลัมน์ความถี่"], set:{i:1}},
    {say:["Reflection changes only the direction. Everything else about the wave is untouched.",
          "การสะท้อนเปลี่ยนแค่ทิศทาง สมบัติอื่นของคลื่นไม่ถูกแตะเลย"], set:{i:0}},
    {say:["Whichever row you pick, the frequency cell stays green. The source sets it, and nothing downstream can.",
          "ไม่ว่าเลือกแถวไหน ช่องความถี่ยังเขียวอยู่ แหล่งกำเนิดเป็นผู้กำหนด ไม่มีอะไรหลังจากนั้นเปลี่ยนได้"], set:{i:3}}
  ] },

{ id:"superposition", x:235, y:346, requires:["types","behaviours"], methods:["M-05","M-06"],
  title:["Superposition","การซ้อนทับ"],
  body:[["Where two waves meet, the displacements simply add. In phase they reinforce; exactly out of phase they cancel. That is the whole principle, and interference is its visible consequence.",
         "The condition is written in path difference: whole wavelengths give constructive interference, odd half wavelengths give destructive. Standing waves are the special case where a wave meets its own reflection, giving fixed nodes and antinodes that do not travel."],
        ["ที่ใดคลื่นสองขบวนมาพบกัน การกระจัดจะบวกกันตรงๆ ถ้าเฟสตรงกันจะเสริมกัน ถ้าเฟสตรงข้ามพอดีจะหักล้างกัน นั่นคือหลักการทั้งหมด และการแทรกสอดคือผลที่มองเห็นได้",
         "เงื่อนไขเขียนในรูปผลต่างทางเดิน จำนวนเต็มเท่าของความยาวคลื่นให้การแทรกสอดแบบเสริม ส่วนจำนวนคี่ของครึ่งความยาวคลื่นให้แบบหักล้าง คลื่นนิ่งคือกรณีพิเศษที่คลื่นพบกับการสะท้อนของตัวเอง เกิดบัพและปฏิบัพที่อยู่กับที่"]],
  formula:["Constructive: Δpath = nλ    ·    Destructive: Δpath = (n − ½)λ","เสริม: Δทางเดิน = nλ  ·  หักล้าง: Δทางเดิน = (n − ½)λ"],
  flabel:["Path difference decides","ผลต่างทางเดินเป็นตัวตัดสิน"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["The Enchanted Rope","เชือกต้องมนตร์"],
    question:["Two pulses race toward each other along the rope. What happens where they meet — and afterwards?",
              "คลื่นดลสองลูกวิ่งเข้าหากันบนเชือก เกิดอะไรขึ้นตรงที่พบกัน และหลังจากนั้น"],
    ctrls:[
      {k:"A1", lab:["Height of pulse 1","ความสูงคลื่นดล 1"], min:-5, max:5, step:.5, def:3, unit:""},
      {k:"A2", lab:["Height of pulse 2","ความสูงคลื่นดล 2"], min:-5, max:5, step:.5, def:2, unit:""},
      {k:"T",  lab:["Watch for","ดูนาน"], min:1, max:4, step:.25, def:3.5, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["At the meeting point now","ที่จุดพบขณะนี้"], f:function(S){ return fmt2(C09.y(S.p,10,S.t)); }},
      {lab:["When they overlap fully","เมื่อซ้อนกันสนิท"], f:function(S){ return fmt2(S.p.A1+S.p.A2); }},
      {lab:["Kind of meeting","ลักษณะการพบ"], f:function(S){
        var a=S.p.A1, b=S.p.A2;
        if(a*b>0) return L()?"เสริมกัน":"constructive";
        if(a*b<0) return a+b===0 ? (L()?"หักล้างสมบูรณ์":"complete cancelling") : (L()?"หักล้างบางส่วน":"partly cancelling");
        return L()?"มีคลื่นเดียว":"only one pulse"; }},
      {lab:["After they part","หลังแยกจากกัน"], f:function(){ return L()?"ทั้งคู่ไปต่อเหมือนเดิม":"each carries on unchanged"; }}
    ],
    world:{ kind:"free" },
    scene:function(o,S,W){
      var p=S.p, t=S.t, n=120, r1=[], r2=[], r=[];
      for(var i=0;i<=n;i++){
        var x=20*i/n, X=C09.X(x);
        r1.push([X, C09.Y(C09.p1(p,x,t))]); r2.push([X, C09.Y(C09.p2(p,x,t))]); r.push([X, C09.Y(C09.y(p,x,t))]);
      }
      o.push('<line x1="'+C09.X(0)+'" y1="'+C09.yc+'" x2="'+C09.X(20)+'" y2="'+C09.yc+'" stroke="var(--rule)" stroke-width="1"/>');
      o.push('<line x1="'+C09.X(10)+'" y1="'+(C09.yc-74)+'" x2="'+C09.X(10)+'" y2="'+(C09.yc+74)+'" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="3 4"/>');
      fitText(o, C09.X(10), C09.yc+88, ["meeting point","จุดพบ"], 120, 10, "var(--ink-faint)", "middle");
      role("rope")(o, r1, {col:"var(--accent)", w:S.hl==="y1"?2.6:1.5, dash:"5 4", op:.85});
      role("rope")(o, r2, {col:"var(--accent2)", w:S.hl==="y2"?2.6:1.5, dash:"5 4", op:.85});
      role("rope")(o, r, {w:S.hl==="y"?4:2.8});
      [[0,0],[20,0]].forEach(function(e){ role("source")(o, C09.X(e[0]), C09.yc, {clock:STAGE.clock, col:e[0]?"var(--accent2)":"var(--accent)"}); });
    },
    handles:[
      {k:"A1", at:function(p,S){ return {px:C09.X(C09.c1(S.t)), py:C09.Y(p.A1)}; }, set:function(px,py){ return {A1:(C09.yc-py)/C09.k}; },
       lab:["pulse 1","คลื่นดล 1"], col:"accent"},
      {k:"A2", at:function(p,S){ return {px:C09.X(C09.c2(S.t)), py:C09.Y(p.A2)}; }, set:function(px,py){ return {A2:(C09.yc-py)/C09.k}; },
       lab:["pulse 2","คลื่นดล 2"], col:"accent2"}
    ],
    events:function(p,S){
      return [{id:"meet", when:S.t>=C09.tm-0.02 && S.t>0, px:C09.X(10), py:C09.Y(p.A1+p.A2), kind:Math.abs(p.A1+p.A2)<0.01?"impact":"burst",
               col:Math.abs(p.A1+p.A2)<0.01?"warn":"good"}];
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:4,
      xlab:["seconds","วินาที"], ylab:["height at meeting point","ความสูงที่จุดพบ"],
      fn:function(x,p){ return C09.y(p,10,x); },
      mark:function(p,S){ return S.t; }
    },
    spell:{
      tex:function(p,S){ var a=C09.p1(p,10,S.t), b=C09.p2(p,10,S.t);
        return "y = y_1 + y_2 = ("+fmt2(a)+") + ("+fmt2(b)+") = "+fmt2(a+b)+"\\quad\\text{"+(L()?"ที่จุดพบ":"at the meeting point")+"}"; },
      terms:[
        {k:"y1", sym:"y₁", lab:["pulse 1 alone","คลื่นดล 1 เดี่ยว ๆ"], col:"accent", f:function(p,S){ return fmt2(C09.p1(p,10,S.t)); }},
        {k:"y2", sym:"y₂", lab:["pulse 2 alone","คลื่นดล 2 เดี่ยว ๆ"], col:"accent2", f:function(p,S){ return fmt2(C09.p2(p,10,S.t)); }},
        {k:"y",  sym:"y",  lab:["the rope itself","ตัวเชือกจริง"], col:"good", f:function(p,S){ return fmt2(C09.y(p,10,S.t)); }}
      ]
    },
    predict:{ kind:"choice",
      ask:["At the instant the two pulses sit exactly on top of each other, how high is the rope at the meeting point?",
           "ในขณะที่คลื่นดลสองลูกซ้อนกันสนิท เชือกที่จุดพบสูงเท่าใด"],
      opts:function(p){ return C09.cands(p).map(function(v){ return [fmt2(v), fmt2(v)]; }); },
      actual:function(p){ return C09.cands(p).indexOf(p.A1+p.A2); },
      explain:function(p){ return ["Displacements simply add: "+fmt2(p.A1)+" + ("+fmt2(p.A2)+") = "+fmt2(p.A1+p.A2)+". Then each pulse travels on as if the other had never been there.",
                                   "การกระจัดบวกกันตรง ๆ: "+fmt2(p.A1)+" + ("+fmt2(p.A2)+") = "+fmt2(p.A1+p.A2)+" แล้วคลื่นดลแต่ละลูกก็เดินทางต่อเหมือนไม่เคยพบกันมาก่อน"]; }
    },
    trials:{
      veil:true,
      make:function(){
        var A1=pick([-4,-3,-2,2,3,4,5,-5,1.5,-1.5]);
        if(Math.random()<0.5) return {kind:"flat", A1:A1, A2:-A1, set:{A1:A1, A2:0, T:3.5}};
        var A2, X; do{ A2=ri(-10,10)/2; X=A1+A2; } while(Math.abs(A2)<0.5 || A2===-A1);
        return {kind:"peak", A1:A1, A2:A2, X:X, set:{A1:A1, A2:0, T:3.5}};
      },
      lock:["A1","T"],
      say:function(g){
        if(g.kind==="flat") return ["Pulse 1 has height "+g.A1+". Shape pulse 2 so that, at the meeting instant, the rope lies perfectly flat.",
                                    "คลื่นดล 1 สูง "+g.A1+" ปั้นคลื่นดล 2 ให้เชือกแบนราบสนิทในขณะที่พบกัน"];
        return ["Pulse 1 has height "+g.A1+". Shape pulse 2 so the rope reaches exactly "+fmt2(g.X)+" at the meeting instant.",
                "คลื่นดล 1 สูง "+g.A1+" ปั้นคลื่นดล 2 ให้เชือกสูง "+fmt2(g.X)+" พอดีในขณะที่พบกัน"];
      },
      check:function(p,S,g){
        if(p.A2===g.A2) return {ok:true, msg:[g.kind==="flat" ? "Flat for an instant: "+g.A1+" + ("+g.A2+") = 0 — yet both pulses re-emerge untouched. Nothing was destroyed."
                                                               : "Exactly "+fmt2(g.X)+": y₂ = "+fmt2(g.X)+" − ("+g.A1+") = "+fmt2(g.A2)+". The rope just adds the two.",
                                                g.kind==="flat" ? "เชือกแบนชั่วขณะ: "+g.A1+" + ("+g.A2+") = 0 แต่คลื่นดลทั้งสองก็กลับมาเหมือนเดิม ไม่มีอะไรถูกทำลาย"
                                                               : "ได้ "+fmt2(g.X)+" พอดี: y₂ = "+fmt2(g.X)+" − ("+g.A1+") = "+fmt2(g.A2)+" เชือกแค่บวกสองคลื่นเข้าด้วยกัน"]};
        return {ok:false, msg:["At the meeting point the rope reached "+fmt2(p.A1+p.A2)+". Heights add with their signs.",
                               "ที่จุดพบเชือกสูง "+fmt2(p.A1+p.A2)+" ความสูงบวกกันโดยคิดเครื่องหมายด้วย"]};
      }
    },
    note:["the dashed lines are each pulse alone; the glowing rope is their sum, point by point",
          "เส้นประคือคลื่นดลแต่ละลูกเดี่ยว ๆ เชือกเรืองแสงคือผลรวมของทั้งสองทีละจุด"]
  },
  guide:[
    {say:["Two crests. Press play: where they overlap the rope rises to 3 + 2 = 5, then both pulses walk away unchanged.",
          "ยอดคลื่นสองลูก กดเล่น ตรงที่ซ้อนกันเชือกสูงขึ้นเป็น 3 + 2 = 5 แล้วคลื่นดลทั้งสองก็เดินจากไปเหมือนเดิม"], set:{A1:3,A2:2,T:3.5}},
    {say:["A crest meets an equal trough. For one instant the rope is perfectly flat — and then both pulses reappear.",
          "ยอดคลื่นพบท้องคลื่นที่เท่ากัน ชั่วขณะหนึ่งเชือกแบนราบสนิท แล้วคลื่นดลทั้งสองก็ปรากฏขึ้นอีกครั้ง"], set:{A1:3,A2:-3,T:3.5}},
    {say:["Unequal crest and trough cannot fully cancel. Something always survives when the two do not match.",
          "ยอดกับท้องที่ไม่เท่ากันหักล้างกันไม่หมด เมื่อทั้งสองไม่เท่ากันจะเหลือบางส่วนเสมอ"], set:{A1:4,A2:-1.5,T:3.5}}
  ]
}
],

methods:[
{id:"M-01", name:["Read wavelength, amplitude and period","อ่านความยาวคลื่น แอมพลิจูด และคาบ"]},
{id:"M-02", name:["Apply v = fλ","ใช้ v = fλ"]},
{id:"M-03", name:["Classify transverse or longitudinal","จำแนกคลื่นตามขวางหรือตามยาว"]},
{id:"M-04", name:["Apply Snell's law to a wave","ใช้กฎสเนลล์กับคลื่น"]},
{id:"M-05", name:["Decide constructive or destructive","ตัดสินว่าเสริมหรือหักล้าง"]},
{id:"M-06", name:["Standing waves on a string","คลื่นนิ่งบนเส้นเชือก"]}
],

traps:{
"T-01":["Amplitude and wavelength are different things. Amplitude is height, wavelength is spacing.","แอมพลิจูดกับความยาวคลื่นเป็นคนละอย่าง แอมพลิจูดคือความสูง ความยาวคลื่นคือระยะห่าง"],
"T-02":["Frequency does not change at a boundary. It is fixed by the source; v and λ change together.","ความถี่ไม่เปลี่ยนที่รอยต่อ มันถูกกำหนดโดยแหล่งกำเนิด ส่วน v และ λ เปลี่ยนไปด้วยกัน"],
"T-03":["Only transverse waves can be polarised. Sound is longitudinal and cannot be.","เฉพาะคลื่นตามขวางที่โพลาไรซ์ได้ เสียงเป็นคลื่นตามยาวจึงทำไม่ได้"],
"T-04":["A half-wavelength was counted as a whole one, or the harmonic number was off by one.","นับครึ่งความยาวคลื่นเป็นหนึ่งความยาวคลื่น หรือเลขฮาร์มอนิกคลาดไปหนึ่ง"]
},

gen:{
"M-01": function(sf){
  var f=pick([2,4,5,10,20]), A=pick([0.02,0.05,0.1,0.3]);
  if(sf==="S-04") return {stem:["A wave is made louder without changing its pitch. Which quantity changed?",
                                "ทำให้คลื่นเสียงดังขึ้นโดยระดับเสียงไม่เปลี่ยน ปริมาณใดเปลี่ยนไป"],
    opts:[{v:["Amplitude","แอมพลิจูด"],ok:1},{v:["Wavelength","ความยาวคลื่น"],trap:"T-01"},
          {v:["Frequency","ความถี่"]},{v:["Speed","อัตราเร็ว"]}],unit:""};
  if(sf==="S-02") return {stem:["On a displacement–distance graph, which feature gives the wavelength?",
                                "บนกราฟการกระจัด–ระยะทาง ลักษณะใดให้ค่าความยาวคลื่น"],
    opts:[{v:["The distance between two successive crests","ระยะระหว่างสันคลื่นสองลูกที่ติดกัน"],ok:1},
          {v:["The height of a crest","ความสูงของสันคลื่น"],trap:"T-01"},
          {v:["The time for one cycle","เวลาของหนึ่งรอบ"]},
          {v:["Twice the amplitude","สองเท่าของแอมพลิจูด"],trap:"T-01"}],unit:""};
  return {stem:["A wave has frequency "+f+" Hz. Find its period.",
                "คลื่นมีความถี่ "+f+" เฮิรตซ์ จงหาคาบ"],
    opts:[{v:fmt2(1/f),ok:1},{v:String(f),trap:"T-01"},{v:fmt(f*2)},{v:fmt2(2/f)}],unit:" s"};
},
"M-02": function(sf){
  var f=pick([2,4,5,20,50]), lam=pick([0.4,1.5,2,3,8]);
  var v=f*lam;
  if(sf==="S-05") return {stem:["A wave travels at "+fmt(v)+" m/s with wavelength "+lam+" m. Find its frequency.",
                                "คลื่นเคลื่อนที่ด้วย "+fmt(v)+" ม./วินาที ความยาวคลื่น "+lam+" เมตร จงหาความถี่"],
    opts:[{v:String(f),ok:1},{v:fmt(v*lam)},{v:fmt(lam/v)},{v:fmt(f*2)}],unit:" Hz"};
  if(sf==="S-04") return {stem:["A wave passes from one medium into another where it travels faster. What happens to f and λ?",
                                "คลื่นผ่านจากตัวกลางหนึ่งไปอีกตัวกลางที่เคลื่อนที่ได้เร็วกว่า f และ λ เปลี่ยนอย่างไร"],
    opts:[{v:["f stays the same, λ increases","f เท่าเดิม λ เพิ่มขึ้น"],ok:1},
          {v:["f increases, λ stays the same","f เพิ่มขึ้น λ เท่าเดิม"],trap:"T-02"},
          {v:["Both increase","เพิ่มขึ้นทั้งคู่"],trap:"T-02"},
          {v:["Both stay the same","เท่าเดิมทั้งคู่"]}],unit:""};
  return {stem:["Find the speed of a wave of frequency "+f+" Hz and wavelength "+lam+" m.",
                "จงหาอัตราเร็วของคลื่นความถี่ "+f+" เฮิรตซ์ ความยาวคลื่น "+lam+" เมตร"],
    opts:[{v:fmt(v),ok:1},{v:fmt(f/lam)},{v:fmt(lam/f)},{v:fmt(f+lam)}],unit:" m/s"};
},
"M-03": function(sf){
  var C=[{s:["Sound travelling through air is which kind of wave?","เสียงที่เดินทางผ่านอากาศเป็นคลื่นชนิดใด"],
          ok:["Longitudinal","ตามยาว"],w:[["Transverse","ตามขวาง"],["Both at once","เป็นทั้งสองอย่าง"],["Neither","ไม่ใช่ทั้งสอง"]]},
         {s:["A wave passes through a polarising filter. What does that prove?","คลื่นผ่านแผ่นโพลารอยด์ได้ สิ่งนี้พิสูจน์อะไร"],
          ok:["It is transverse","มันเป็นคลื่นตามขวาง"],
          w:[["It is longitudinal","มันเป็นคลื่นตามยาว"],["It carries no energy","มันไม่พาพลังงาน"],["Its frequency changed","ความถี่ของมันเปลี่ยน"]]},
         {s:["Why can sound not be polarised?","ทำไมเสียงจึงเกิดโพลาไรเซชันไม่ได้"],
          ok:["It oscillates along its direction of travel","มันสั่นในแนวเดียวกับทิศการเคลื่อนที่"],
          w:[["It travels too slowly","มันเดินทางช้าเกินไป"],["Its frequency is too low","ความถี่ต่ำเกินไป"],
             ["It needs a medium","มันต้องอาศัยตัวกลาง"]]}];
  var c=pick(C);
  var o=[{v:c.ok,ok:1},{v:c.w[0],trap:"T-03"},{v:c.w[1]},{v:c.w[2]}];
  return {stem:c.s, opts:o, unit:""};
},
"M-04": function(sf){
  var v1=pick([200,300,340]), v2=pick([400,500,600]), th=pick([30,37,45]);
  var s1={30:0.5,37:0.602,45:0.707}[th];
  var s2=s1*v2/v1;
  if(sf==="S-04") return {stem:["A wave slows down as it enters a new medium. Which way does it bend?",
                                "คลื่นช้าลงเมื่อเข้าสู่ตัวกลางใหม่ มันเบนไปทางใด"],
    opts:[{v:["Towards the normal","เข้าหาเส้นปกติ"],ok:1},{v:["Away from the normal","ออกจากเส้นปกติ"]},
          {v:["It does not bend","ไม่เบน"]},{v:["It reflects entirely","สะท้อนกลับทั้งหมด"]}],unit:""};
  if(s2>=1) return {stem:["A wave meets a boundary where its speed rises from "+v1+" to "+v2+" m/s. Beyond a certain angle it cannot cross at all. What is that called?",
                          "คลื่นพบรอยต่อที่อัตราเร็วเพิ่มจาก "+v1+" เป็น "+v2+" ม./วินาที เกินมุมหนึ่งมันข้ามไม่ได้เลย เรียกว่าอะไร"],
    opts:[{v:["Total internal reflection","การสะท้อนกลับหมด"],ok:1},{v:["Diffraction","การเลี้ยวเบน"]},
          {v:["Interference","การแทรกสอด"]},{v:["Polarisation","โพลาไรเซชัน"]}],unit:""};
  return {stem:["A wave hits a boundary at "+th+"°, with speeds "+v1+" m/s and "+v2+" m/s either side. Find sin of the refracted angle.",
                "คลื่นตกกระทบรอยต่อที่ "+th+"° โดยอัตราเร็วสองฝั่งเป็น "+v1+" และ "+v2+" ม./วินาที จงหาไซน์ของมุมหักเห"],
    opts:[{v:fmt2(s2),ok:1},{v:fmt2(s1*v1/v2)},{v:fmt2(s1),trap:"T-02"},{v:fmt2(s2/2)}],unit:""};
},
"M-05": function(sf){
  var lam=pick([2,4,5,6]), n=pick([1,2,3]);
  var dc=n*lam, dd=(n-0.5)*lam;
  if(sf==="S-04") return {stem:["Two identical sources are in phase. A point is 2.5 wavelengths further from one than the other. What is observed?",
                                "แหล่งกำเนิดเหมือนกันสองแหล่งมีเฟสตรงกัน จุดหนึ่งห่างจากแหล่งหนึ่งมากกว่าอีกแหล่ง 2.5 ความยาวคลื่น จะสังเกตเห็นอะไร"],
    opts:[{v:["Destructive interference","การแทรกสอดแบบหักล้าง"],ok:1},
          {v:["Constructive interference","การแทรกสอดแบบเสริม"],trap:"T-04"},
          {v:["No interference at all","ไม่เกิดการแทรกสอด"]},
          {v:["Total reflection","การสะท้อนกลับหมด"]}],unit:""};
  if(sf==="S-05") return {stem:["Constructive interference is seen where the path difference is "+dc+" m, at order n = "+n+". Find the wavelength.",
                                "พบการแทรกสอดแบบเสริมที่ผลต่างทางเดิน "+dc+" เมตร ที่อันดับ n = "+n+" จงหาความยาวคลื่น"],
    opts:[{v:String(lam),ok:1},{v:fmt(dc),trap:"T-04"},{v:fmt(dc/2)},{v:fmt(lam*2)}],unit:" m"};
  return {stem:["Two in-phase sources emit waves of wavelength "+lam+" m. Find the smallest non-zero path difference giving destructive interference.",
                "แหล่งกำเนิดเฟสตรงกันสองแหล่งปล่อยคลื่นความยาวคลื่น "+lam+" เมตร จงหาผลต่างทางเดินที่น้อยที่สุดที่ไม่เป็นศูนย์ซึ่งให้การแทรกสอดแบบหักล้าง"],
    opts:[{v:fmt(lam/2),ok:1},{v:String(lam),trap:"T-04"},{v:fmt(lam*2)},{v:fmt(lam/4)}],unit:" m"};
},
"M-06": function(sf){
  var L=pick([0.6,1,1.2,2]), n=pick([1,2,3,4]);
  var lam=2*L/n;
  if(sf==="S-04") return {stem:["A string fixed at both ends vibrates in its fundamental mode. How much of a wavelength fits on it?",
                                "เส้นเชือกที่ตรึงปลายทั้งสองสั่นในโหมดมูลฐาน มีความยาวคลื่นอยู่บนเชือกเท่าใด"],
    opts:[{v:["Half a wavelength","ครึ่งความยาวคลื่น"],ok:1},{v:["One wavelength","หนึ่งความยาวคลื่น"],trap:"T-04"},
          {v:["Two wavelengths","สองความยาวคลื่น"],trap:"T-04"},{v:["A quarter wavelength","หนึ่งในสี่ความยาวคลื่น"]}],unit:""};
  if(sf==="S-05") return {stem:["A standing wave of wavelength "+fmt(lam)+" m sits on a string in harmonic "+n+". Find the string's length.",
                                "คลื่นนิ่งความยาวคลื่น "+fmt(lam)+" เมตร อยู่บนเชือกในฮาร์มอนิกที่ "+n+" จงหาความยาวเชือก"],
    opts:[{v:String(L),ok:1},{v:fmt(lam*n),trap:"T-04"},{v:fmt(lam/2)},{v:fmt(L*2)}],unit:" m"};
  return {stem:["A string of length "+L+" m is fixed at both ends. Find the wavelength of harmonic "+n+".",
                "เส้นเชือกยาว "+L+" เมตร ตรึงปลายทั้งสอง จงหาความยาวคลื่นของฮาร์มอนิกที่ "+n+""],
    opts:[{v:fmt(lam),ok:1},{v:fmt(L/n),trap:"T-04"},{v:fmt(2*L*n)},{v:String(L)}],unit:" m"};
}
}
};
