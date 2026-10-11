/* the load cannot sit past the far support, even if the beam is shortened under it */
var C04 = { xe: function(p){ return Math.min(p.x, p.Lb); } };

var CHAPTER = {
id:"ch04", num:"04", slug:"equilibrium", subject:"physics",
kicker:["Physics · Chapter 04","ฟิสิกส์ · บทที่ 4"],
title:["Equilibrium","สมดุลกล"],
mapTitle:["When nothing happens, and why","เมื่อไม่มีอะไรเกิดขึ้น และเพราะเหตุใด"],
lede:["A body can have zero resultant force and still spin. Balance therefore needs two conditions, not one — and the second, the moment condition, is where the marks actually live.",
      "วัตถุอาจมีแรงลัพธ์เป็นศูนย์แต่ยังหมุนอยู่ได้ ดังนั้นสมดุลต้องมีสองเงื่อนไข ไม่ใช่เงื่อนไขเดียว และเงื่อนไขที่สองคือโมเมนต์ ซึ่งเป็นจุดที่ได้คะแนนจริง ๆ"],
next:["→ continues in Chapter 05 · Work and Energy","→ ต่อในบทที่ 5 · งานและพลังงาน"],

nodes:[
{ id:"translational", x:235, y:52, requires:[], methods:["M-01"],
  title:["Force balance","สมดุลต่อการเลื่อน"],
  body:[["The first condition is ΣF = 0. Resolve every force into two perpendicular directions and require both sums to vanish: up equals down, left equals right.",
         "This alone is not equilibrium. A couple — two equal, opposite, non-aligned forces — has zero resultant and spins the body anyway. That is why a second condition exists."],
        ["เงื่อนไขแรกคือ ΣF = 0 แตกแรงทุกแรงออกเป็นสองแนวที่ตั้งฉากกัน แล้วให้ผลรวมในแต่ละแนวเป็นศูนย์ คือแรงขึ้นเท่ากับแรงลง และแรงซ้ายเท่ากับแรงขวา",
         "แค่เงื่อนไขนี้ยังไม่พอจะเรียกว่าสมดุล แรงคู่ควบคือแรงสองแรงที่ขนาดเท่ากัน ทิศตรงข้ามกัน แต่ไม่อยู่บนแนวเดียวกัน แรงลัพธ์เป็นศูนย์ แต่ยังทำให้วัตถุหมุนได้ จึงต้องมีเงื่อนไขข้อที่สอง"]],
  formula:["ΣF_x = 0    ΣF_y = 0","ΣF_x = 0    ΣF_y = 0"],
  flabel:["Necessary, not sufficient","จำเป็น แต่ยังไม่พอ"],
  viz:"vector",
  guide:[
    {say:["Two forces exactly opposite and equal. The red resultant collapses to nothing — this is force balance.",
          "แรงสองแรงเท่ากันและทิศตรงข้ามกันพอดี ลัพธ์สีแดงหายไปเป็นศูนย์ นี่คือสมดุลของแรง"], set:{A:12,tA:0,B:12,tB:180}},
    {say:["Break the balance by turning B. The moment a resultant appears, the body accelerates.",
          "ลองหมุน B ให้สมดุลเสียไป พอมีแรงลัพธ์ วัตถุก็เริ่มมีความเร่ง"], set:{A:12,tA:0,B:12,tB:120}},
    {say:["Three forces in equilibrium close into a triangle. That closure is Lami's theorem in picture form.",
          "แรงสามแรงที่สมดุลกันต่อกันเป็นสามเหลี่ยมปิด ภาพนี้คือทฤษฎีบทของลามี"], set:{A:10,tA:210,B:10,tB:330}}
  ]},

{ id:"moment", x:235, y:150, requires:["translational"], methods:["M-02","M-03"],
  title:["Moment of a force","โมเมนต์ของแรง"],
  body:[["A moment is force times perpendicular distance from the pivot: M = F·l. Only the perpendicular distance counts, so a force whose line of action passes through the pivot has no moment at all, however large it is.",
         "The second condition is ΣM = 0 — clockwise moments equal anticlockwise moments. Using the along-the-beam distance instead of the perpendicular one is trap T-01."],
        ["โมเมนต์คือแรงคูณระยะตั้งฉากจากจุดหมุน M = F·l ที่นับได้มีแต่ระยะตั้งฉาก ดังนั้นแรงที่แนวแรงผ่านจุดหมุนจึงไม่มีโมเมนต์เลย ไม่ว่าแรงนั้นจะใหญ่แค่ไหน",
         "เงื่อนไขข้อที่สองคือ ΣM = 0 โมเมนต์ตามเข็มนาฬิกาเท่ากับโมเมนต์ทวนเข็มนาฬิกา ถ้าใช้ระยะที่วัดตามแนวคานแทนระยะตั้งฉาก ก็ติดกับดัก T-01"]],
  formula:["M = F · l⊥        ΣM_cw = ΣM_ccw","M = F · l⊥        ΣM_cw = ΣM_ccw"],
  flabel:["Perpendicular distance only","ระยะตั้งฉากเท่านั้น"],
  viz:"bars",
  vizcfg:{
    title:["A SEESAW BALANCES ON MOMENTS, NOT WEIGHTS","ไม้กระดกสมดุลเพราะโมเมนต์ ไม่ใช่เพราะน้ำหนัก"],
    ylab:["N  and  N·m","N  และ  N·m"],
    ctrls:[
      {k:"F1", lab:["Force on the left","แรงด้านซ้าย"],   min:5, max:80, step:1, def:40, unit:" N"},
      {k:"d1", lab:["Its distance","ระยะจากจุดหมุน"],     min:.2, max:3, step:.1, def:1, unit:" m"},
      {k:"F2", lab:["Force on the right","แรงด้านขวา"],   min:5, max:80, step:1, def:20, unit:" N"},
      {k:"d2", lab:["Its distance","ระยะจากจุดหมุน"],     min:.2, max:3, step:.1, def:2, unit:" m"}
    ],
    readouts:[
      {lab:["Anticlockwise F₁d₁","ทวนเข็ม F₁d₁"], f:function(S){ return un(S.p.F1*S.p.d1,"N·m"); }},
      {lab:["Clockwise F₂d₂","ตามเข็ม F₂d₂"],     f:function(S){ return un(S.p.F2*S.p.d2,"N·m"); }},
      {lab:["Balanced?","สมดุลหรือเปล่า"], f:function(S){
        var d=S.p.F1*S.p.d1-S.p.F2*S.p.d2;
        return Math.abs(d)<0.05 ? (L()?"สมดุล":"balanced")
          : (L()?(d>0?"หมุนทวนเข็ม":"หมุนตามเข็ม"):(d>0?"turns anticlockwise":"turns clockwise")); }},
      {lab:["Bigger force wins?","แรงมากกว่าชนะไหม"], f:function(S){
        return L()?"ไม่เสมอไป — ระยะชดเชยแรงได้":"not necessarily — distance can beat force"; }}
    ],
    bars:[
      {lab:["Left force","แรงซ้าย"],       f:function(p){ return p.F1; },       col:"faint"},
      {lab:["Right force","แรงขวา"],       f:function(p){ return p.F2; },       col:"faint"},
      {lab:["Moment F₁d₁","โมเมนต์ F₁d₁"], f:function(p){ return p.F1*p.d1; },  col:"accent"},
      {lab:["Moment F₂d₂","โมเมนต์ F₂d₂"], f:function(p){ return p.F2*p.d2; },  col:"good"}
    ],
    note:["the grey force bars can differ wildly while the two moment bars match exactly","แถบแรงสีเทาอาจต่างกันมาก แต่แถบโมเมนต์สองแถบเท่ากันพอดี"]
  },
  guide:[
    {say:["40 N at 1 m against 20 N at 2 m. The forces are wildly unequal — the moments are identical.",
          "แรง 40 N ที่ระยะ 1 m กับแรง 20 N ที่ระยะ 2 m แรงต่างกันมาก แต่โมเมนต์เท่ากันพอดี"], set:{F1:40,d1:1,F2:20,d2:2}},
    {say:["Slide the right force inward. Its moment shrinks and the seesaw tips, though its force never changed.",
          "ลองเลื่อนแรงด้านขวาเข้าใกล้จุดหมุน โมเมนต์ของมันลดลง ไม้กระดกเลยเอียง ทั้งที่แรงเท่าเดิม"], set:{F1:40,d1:1,F2:20,d2:1}},
    {say:["A small child can balance an adult simply by sitting further out. That is the whole lever principle.",
          "เด็กตัวเล็กนั่งให้สมดุลกับผู้ใหญ่ได้ แค่นั่งให้ห่างจุดหมุนกว่า นี่คือหลักการของคานทั้งหมด"], set:{F1:70,d1:0.4,F2:14,d2:2}}
  ] },

{ id:"pivot", x:100, y:248, requires:["moment"], methods:["M-04"],
  title:["Choosing the pivot","การเลือกจุดหมุน"],
  body:[["In equilibrium every point is a valid pivot, because ΣM = 0 about all of them. That freedom is a gift: choose the pivot so that the force you do not know passes straight through it, and it drops out of the equation.",
         "A ladder against a wall becomes a one-line problem the moment you take moments about its foot — the two unknown reactions there contribute nothing."],
        ["เมื่อวัตถุสมดุล จะเลือกจุดใดเป็นจุดหมุนก็ได้ เพราะ ΣM = 0 รอบทุกจุด ข้อนี้เป็นประโยชน์มาก ให้เลือกจุดหมุนที่แนวของแรงที่เราไม่รู้ค่าผ่านพอดี แรงนั้นก็จะหายไปจากสมการ",
         "บันไดพิงกำแพงกลายเป็นโจทย์ที่แก้ได้ในบรรทัดเดียว ถ้าคิดโมเมนต์รอบโคนบันได เพราะแรงปฏิกิริยาที่ไม่ทราบค่าสองแรงตรงนั้นไม่ให้โมเมนต์เลย"]],
  formula:["Take moments where the unknowns meet","คิดโมเมนต์ ณ จุดที่ตัวไม่รู้ค่ามาบรรจบ"],
  flabel:["Strategy, not a formula","กลยุทธ์ ไม่ใช่สูตร"],
  viz:"bars",
  vizcfg:{
    title:["THE SAME BEAM, JUDGED FROM TWO PIVOTS","คานเดิม มองจากจุดหมุนสองจุด"],
    ylab:["N  ·  N·m","N  ·  N·m"],
    ctrls:[
      {k:"W", lab:["Load","น้ำหนักที่วาง"],        min:20, max:200, step:5, def:100, unit:" N"},
      {k:"x", lab:["Load position from A","ตำแหน่งห่างจาก A"], min:.2, max:3.8, step:.1, def:1, unit:" m"},
      {k:"Lb", lab:["Beam length","ความยาวคาน"],   min:2, max:4, step:.2, def:4, unit:" m"}
    ],
    readouts:[
      {lab:["Reaction at A","แรงปฏิกิริยาที่ A"], f:function(S){
        return un(S.p.W*(S.p.Lb-C04.xe(S.p))/S.p.Lb,"N"); }},
      {lab:["Reaction at B","แรงปฏิกิริยาที่ B"], f:function(S){
        return un(S.p.W*C04.xe(S.p)/S.p.Lb,"N"); }},
      {lab:["Σ moments about A","Σโมเมนต์รอบ A"], f:function(){ return "0"; }},
      {lab:["Σ moments about B","Σโมเมนต์รอบ B"], f:function(){
        return L()?"0 — เลือกจุดหมุนไหนก็ได้ศูนย์":"0 — either pivot gives zero"; }}
    ],
    bars:[
      {lab:["Reaction A","ปฏิกิริยา A"], f:function(p){ return p.W*(p.Lb-C04.xe(p))/p.Lb; }, col:"accent"},
      {lab:["Reaction B","ปฏิกิริยา B"], f:function(p){ return p.W*C04.xe(p)/p.Lb; },        col:"good"},
      {lab:["Load W","น้ำหนัก W"],       f:function(p){ return p.W; },                 col:"ink"},
      {lab:["A + B","A + B"],            f:function(p){ return p.W; },                 col:"warn"}
    ],
    note:["the two reactions always add back to the load — pick whichever pivot kills an unknown","แรงปฏิกิริยาสองแรงรวมกันได้เท่ากับน้ำหนักเสมอ เลือกจุดหมุนที่ทำให้แรงที่ไม่รู้ค่าหายไปหนึ่งแรง"]
  },
  guide:[
    {say:["Load near A. A carries most of it — the closer support takes the bigger share.",
          "วางน้ำหนักไว้ใกล้ A จุด A เลยรับมากกว่า ที่รองรับที่อยู่ใกล้กว่าจะรับส่วนใหญ่"], set:{W:100,x:1,Lb:4}},
    {say:["Slide the load to the middle and the two reactions become equal, each half the load.",
          "เลื่อนน้ำหนักมาตรงกลางคาน แรงปฏิกิริยาสองแรงก็เท่ากัน แรงละครึ่งหนึ่งของน้ำหนัก"], set:{W:100,x:2,Lb:4}},
    {say:["Wherever it sits, A + B equals the load exactly. Taking moments about A or about B gives the same answer.",
          "วางไว้ตรงไหน A + B ก็เท่ากับน้ำหนักพอดี และจะคิดโมเมนต์รอบ A หรือรอบ B ก็ได้คำตอบเท่ากัน"], set:{W:100,x:3.2,Lb:4}}
  ] },

{ id:"centre-gravity", x:370, y:248, requires:["moment"], methods:["M-05"],
  title:["Centre of gravity","จุดศูนย์ถ่วง"],
  body:[["The centre of gravity is the single point where all the weight may be taken to act. For a composite body it is the weighted mean of the parts: x̄ = Σmx / Σm.",
         "Stability follows from it directly. A body topples when the vertical line through its centre of gravity falls outside its base — which is why a wide base and a low centre of gravity is the recipe for anything that must not fall over."],
        ["จุดศูนย์ถ่วงคือจุดเดียวที่เราถือว่าน้ำหนักทั้งหมดกระทำอยู่ ถ้าวัตถุประกอบจากหลายส่วน จุดนี้คือค่าเฉลี่ยถ่วงน้ำหนักของแต่ละส่วน x̄ = Σmx / Σm",
         "ความมั่นคงอธิบายได้จากจุดนี้โดยตรง วัตถุจะล้มเมื่อเส้นดิ่งผ่านจุดศูนย์ถ่วงตกออกนอกฐาน เพราะฉะนั้นถ้าอยากให้อะไรไม่ล้ม ก็ทำให้ฐานกว้างและจุดศูนย์ถ่วงต่ำ"]],
  formula:["x̄ = Σmx / Σm","x̄ = Σmx / Σm"],
  flabel:["Weighted mean of the parts","ค่าเฉลี่ยถ่วงน้ำหนักของส่วนย่อย"],
  viz:"numline",
  vizcfg:{
    title:["WHERE THE WEIGHT EFFECTIVELY ACTS","จุดที่เสมือนน้ำหนักทั้งหมดกระทำ"],
    min:0, max:10,
    ctrls:[
      {k:"m1", lab:["Mass at the left","มวลด้านซ้าย"],  min:1, max:20, step:1, def:6, unit:" kg"},
      {k:"x1", lab:["Its position","ตำแหน่ง"],           min:0, max:9, step:.5, def:1, unit:" m"},
      {k:"m2", lab:["Mass at the right","มวลด้านขวา"],  min:1, max:20, step:1, def:2, unit:" kg"},
      {k:"x2", lab:["Its position","ตำแหน่ง"],           min:1, max:10, step:.5, def:9, unit:" m"}
    ],
    readouts:[
      {lab:["Centre of gravity","จุดศูนย์ถ่วง"], f:function(S){
        var p=S.p; return un((p.m1*p.x1+p.m2*p.x2)/(p.m1+p.m2),"m"); }},
      {lab:["Total mass","มวลรวม"], f:function(S){ return un(S.p.m1+S.p.m2,"kg"); }},
      {lab:["Nearer to","อยู่ใกล้"], f:function(S){
        var p=S.p;
        return p.m1===p.m2 ? (L()?"กึ่งกลางระหว่างสองก้อน — มวลเท่ากัน":"midway — the masses are equal")
          : p.m1>p.m2 ? (L()?"มวลที่มากกว่า (ซ้าย)":"the heavier mass (left)")
          : (L()?"มวลที่มากกว่า (ขวา)":"the heavier mass (right)"); }},
      {lab:["Is it on an object?","อยู่บนวัตถุไหม"], f:function(){
        return L()?"ไม่จำเป็น — อาจอยู่ในที่ว่าง":"not necessarily — it can sit in empty space"; }}
    ],
    regions:function(p){ return [{a:Math.min(p.x1,p.x2), b:Math.max(p.x1,p.x2), col:"faint"}]; },
    points:function(p){
      var g=(p.m1*p.x1+p.m2*p.x2)/(p.m1+p.m2);
      return [{v:p.x1, lab:["m₁","m₁"], col:"soft"},
              {v:p.x2, lab:["m₂","m₂"], col:"soft"},
              {v:g,    lab:["centre of gravity","จุดศูนย์ถ่วง"], col:"accent"}];
    },
    note:["the centre of gravity is a weighted average — it always leans towards the heavier mass","จุดศูนย์ถ่วงเป็นค่าเฉลี่ยถ่วงน้ำหนัก จึงขยับเข้าใกล้มวลที่มากกว่าเสมอ"]
  } },

{ id:"stability", x:235, y:346, requires:["pivot","centre-gravity"], methods:["M-06"],
  title:["Kinds of equilibrium","ชนิดของสมดุล"],
  body:[["Tip a body slightly and watch its centre of gravity. If it rises, gravity pulls it back — stable. If it falls, gravity carries it over — unstable. If it stays level, the body simply sits in its new position — neutral.",
         "A cone on its base is stable, the same cone balanced on its point is unstable, and lying on its side it is neutral. One object, three answers, decided entirely by what the centre of gravity does."],
        ["ลองเอียงวัตถุเล็กน้อยแล้วดูจุดศูนย์ถ่วง ถ้าสูงขึ้น แรงโน้มถ่วงจะดึงวัตถุกลับ เรียกว่าสมดุลเสถียร ถ้าต่ำลง แรงโน้มถ่วงจะดึงให้ล้มต่อ เรียกว่าสมดุลไม่เสถียร ถ้าอยู่ระดับเดิม วัตถุก็อยู่นิ่งในตำแหน่งใหม่ เรียกว่าสมดุลสะเทิน",
         "กรวยที่ตั้งบนฐานเป็นสมดุลเสถียร กรวยอันเดิมที่ตั้งบนปลายแหลมเป็นสมดุลไม่เสถียร และเมื่อวางนอนตะแคงเป็นสมดุลสะเทิน วัตถุเดียวได้สามคำตอบ ซึ่งตัดสินด้วยการเคลื่อนของจุดศูนย์ถ่วงเท่านั้น"]],
  formula:["CG rises → stable · falls → unstable · level → neutral","CG สูงขึ้น → เสถียร · ต่ำลง → ไม่เสถียร · ระดับเดิม → สะเทิน"],
  flabel:["Watch the centre of gravity","ดูที่จุดศูนย์ถ่วง"],
  viz:"plot",
  vizcfg:{
    title:["POTENTIAL ENERGY DECIDES STABILITY","พลังงานศักย์ตัดสินว่าเสถียรหรือไม่"],
    xlab:["displacement from rest","การกระจัดจากตำแหน่งสมดุล"], ylab:["potential energy","พลังงานศักย์"],
    xmin:-4, xmax:4, fill:false,
    fn:function(x,p){ return p.kind===0 ? 0.5*x*x : p.kind===1 ? -0.5*x*x : 0; },
    mark:function(p){ return p.d; },
    ctrls:[
      {k:"kind", lab:["",""], opts:[["stable","เสถียร"], ["unstable","ไม่เสถียร"], ["neutral","สะเทิน"]], min:0, def:0, unit:""},
      {k:"d",    lab:["Nudge it to","ผลักไปที่"], min:-3.5, max:3.5, step:.1, def:1.2, unit:""}
    ],
    readouts:[
      {lab:["Kind","ชนิด"], f:function(S){
        return [["Stable","เสถียร"],["Unstable","ไม่เสถียร"],["Neutral","สะเทิน"]][S.p.kind][L()]; }},
      {lab:["Centre of gravity","จุดศูนย์ถ่วง"], f:function(S){
        return [["rises when nudged","สูงขึ้นเมื่อโดนผลัก"],["falls when nudged","ต่ำลงเมื่อโดนผลัก"],
                ["stays level","อยู่ระดับเดิม"]][S.p.kind][L()]; }},
      {lab:["What happens next","จะเกิดอะไรต่อ"], f:function(S){
        return [["returns to rest","กลับสู่ตำแหน่งเดิม"],["runs further away","ยิ่งออกห่างไปอีก"],
                ["stays where you left it","อยู่ตรงที่เราวางไว้"]][S.p.kind][L()]; }}
    ],
    note:["a valley traps, a hilltop repels, a flat plain does neither","หุบเขารั้งไว้ ยอดเขาผลักออก ที่ราบไม่ทำทั้งสองอย่าง"]
  },
  guide:[
    {say:["A valley. Nudging the object raises its energy, so it rolls back — stable equilibrium.",
          "หุบเขา ขยับวัตถุนิดหน่อย พลังงานก็สูงขึ้น วัตถุจึงกลิ้งกลับมา นี่คือสมดุลเสถียร"], set:{kind:0,d:1.2}},
    {say:["A hilltop. Any nudge lowers the energy, so it accelerates away — unstable.",
          "ยอดเขา ขยับนิดเดียวพลังงานก็ลดลง วัตถุจึงเร่งออกไปไกลขึ้น นี่คือสมดุลไม่เสถียร"], set:{kind:1,d:1.2}},
    {say:["A flat plain. Energy does not change, so it simply stays put — neutral.",
          "ที่ราบ พลังงานไม่เปลี่ยน วัตถุจึงอยู่ที่เดิม นี่คือสมดุลสะเทิน"], set:{kind:2,d:1.2}}
  ] }
],

methods:[
{id:"M-01", name:["Resolve and balance forces","แตกแรงและทำให้สมดุล"]},
{id:"M-02", name:["Compute a moment","คำนวณโมเมนต์"]},
{id:"M-03", name:["Apply ΣM = 0 to a beam","ใช้ ΣM = 0 กับคาน"]},
{id:"M-04", name:["Choose a pivot to remove an unknown","เลือกจุดหมุนเพื่อตัดตัวไม่รู้ค่า"]},
{id:"M-05", name:["Locate the centre of gravity","หาจุดศูนย์ถ่วง"]},
{id:"M-06", name:["Classify the equilibrium","จำแนกชนิดของสมดุล"]}
],

traps:{
"T-01":["You used the distance along the beam, not the perpendicular distance to the line of action.","คุณใช้ระยะที่วัดตามแนวคาน ไม่ใช่ระยะตั้งฉากจากแนวแรง"],
"T-02":["Force balance alone is not equilibrium — a couple has zero resultant and still spins the body.","สมดุลของแรงอย่างเดียวยังไม่พอ แรงคู่ควบมีแรงลัพธ์เป็นศูนย์ แต่ยังทำให้วัตถุหมุนได้"],
"T-03":["A force whose line of action passes through the pivot contributes no moment, however large.","แรงที่แนวแรงผ่านจุดหมุนไม่ให้โมเมนต์เลย ไม่ว่าจะมากเท่าไร"],
"T-04":["The weight of the beam itself acts at its centre and was left out.","น้ำหนักของคานเองกระทำที่จุดกึ่งกลางคาน แต่คุณลืมนับ"]
},

gen:{
"M-01": function(sf){
  var W=pick([40,60,80,100]), th=pick([30,37,53,60]);
  var sin={30:0.5,37:0.602,53:0.799,60:0.866}[th], cos={30:0.866,37:0.799,53:0.602,60:0.5}[th];
  if(sf==="S-04") return {stem:["Three forces hold a body in equilibrium. What must be true of them?",
                                "แรงสามแรงทำให้วัตถุสมดุล ข้อใดต้องเป็นจริง"],
    opts:[{v:["They form a closed triangle","แรงทั้งสามปิดเป็นสามเหลี่ยม"],ok:1},
          {v:["They are all equal in size","แรงทั้งสามมีขนาดเท่ากัน"]},
          {v:["They all point the same way","แรงทั้งสามชี้ทางเดียวกัน"]},
          {v:["Two cancel and the third is zero","สองแรงหักล้างและแรงที่สามเป็นศูนย์"],trap:"T-02"}],unit:""};
  if(sf==="S-03") return {stem:["A "+W+" N sign hangs from a wire making "+th+"° with the vertical on each side. Find the tension in one wire.",
                                "ป้ายหนัก "+W+" นิวตัน แขวนด้วยลวดที่ทำมุม "+th+"° กับแนวดิ่งทั้งสองข้าง จงหาแรงตึงในลวดเส้นหนึ่ง"],
    opts:[{v:fmt(W/(2*cos)),ok:1},{v:fmt(W/2),trap:"T-01"},{v:fmt(W/(2*sin))},{v:String(W)}],unit:" N"};
  return {stem:["A block is held on a frictionless "+th+"° slope by a rope along the slope. Its weight is "+W+" N. Find the tension.",
                "กล่องถูกยึดบนพื้นเอียงไร้แรงเสียดทาน "+th+"° ด้วยเชือกตามแนวพื้นเอียง น้ำหนัก "+W+" นิวตัน จงหาแรงตึงเชือก"],
    opts:[{v:fmt(W*sin),ok:1},{v:fmt(W*cos),trap:"T-01"},{v:String(W)},{v:fmt(W/sin)}],unit:" N"};
},
"M-02": function(sf){
  var F=pick([20,30,40,50,60]), d=pick([0.4,0.8,1.2,1.5,2]);
  var th=pick([30,60]), sin={30:0.5,60:0.866}[th];
  if(sf==="S-04") return {stem:["A force acts directly through the pivot. What moment does it produce?",
                                "แรงกระทำผ่านจุดหมุนพอดี จะเกิดโมเมนต์เท่าใด"],
    opts:[{v:["Zero","ศูนย์"],ok:1},{v:["F times the force's length","F คูณความยาวของแรง"],trap:"T-03"},
          {v:["Maximum","มากที่สุด"],trap:"T-03"},{v:["Half of F·l","ครึ่งหนึ่งของ F·l"]}],unit:""};
  if(sf==="S-02"||sf==="S-03") return {stem:["A force of "+F+" N acts at the end of a "+d+" m spanner, at "+th+"° to the spanner. Find the moment about the nut.",
                                             "แรง "+F+" นิวตัน กระทำที่ปลายประแจยาว "+d+" เมตร ทำมุม "+th+"° กับประแจ จงหาโมเมนต์รอบน็อต"],
    opts:[{v:fmt(F*d*sin),ok:1},{v:fmt(F*d),trap:"T-01"},{v:fmt(F/d)},{v:fmt(F*d*2)}],unit:" N·m"};
  return {stem:["A force of "+F+" N acts perpendicular to a lever "+d+" m from the pivot. Find the moment.",
                "แรง "+F+" นิวตัน กระทำตั้งฉากกับคานที่ระยะ "+d+" เมตรจากจุดหมุน จงหาโมเมนต์"],
    opts:[{v:fmt(F*d),ok:1},{v:fmt(F/d)},{v:fmt(F+d)},{v:fmt(F*d/2)}],unit:" N·m"};
},
"M-03": function(sf){
  var L=pick([4,6,8]), W=pick([100,200,300]), x=pick([1,2,3]);
  var R2=W*x/L, R1=W-R2;
  if(sf==="S-05") return {stem:["A light beam of length "+L+" m on two supports carries a load. The far support reads "+fmt(R2)+" N and the load is "+W+" N. How far from the near support is the load?",
                                "คานเบายาว "+L+" เมตร วางบนที่รองรับสองจุด มีน้ำหนักกด ที่รองรับด้านไกลอ่านได้ "+fmt(R2)+" นิวตัน และน้ำหนักคือ "+W+" นิวตัน น้ำหนักอยู่ห่างจากที่รองรับใกล้เท่าใด"],
    opts:[{v:String(x),ok:1},{v:fmt(L-x)},{v:fmt(L/2),trap:"T-04"},{v:fmt(x*2)}],unit:" m"};
  return {stem:["A light beam "+L+" m long rests on supports at each end. A "+W+" N load sits "+x+" m from the left support. Find the reaction at the right support.",
                "คานเบายาว "+L+" เมตร วางบนที่รองรับที่ปลายทั้งสอง มีน้ำหนัก "+W+" นิวตัน วางห่างจากที่รองรับซ้าย "+x+" เมตร จงหาแรงปฏิกิริยาที่ที่รองรับขวา"],
    opts:[{v:fmt(R2),ok:1},{v:fmt(R1),trap:"T-01"},{v:fmt(W/2),trap:"T-04"},{v:String(W)}],unit:" N"};
},
"M-04": function(sf){
  return {stem:["A ladder leans against a smooth wall. Its foot has two unknown reactions. Where should you take moments?",
                "บันไดพิงกำแพงลื่น ที่โคนบันไดมีแรงปฏิกิริยาที่ไม่รู้ค่าอยู่สองแรง ควรคิดโมเมนต์รอบจุดใด"],
    opts:[{v:["About the foot, so both unknowns drop out","ที่โคนบันได เพื่อตัดตัวไม่รู้ค่าทั้งสองออก"],ok:1},
          {v:["About the top, where the wall touches","ที่ปลายบน จุดที่แตะกำแพง"]},
          {v:["About the centre of the ladder","ที่จุดกึ่งกลางบันได"]},
          {v:["Any point — it makes no difference to the work","จุดใดก็ได้ คำนวณเหนื่อยเท่ากัน"],trap:"T-03"}],unit:""};
},
"M-05": function(sf){
  var m1=pick([2,3,4]), m2=pick([1,5,6]), x1=0, x2=pick([2,4,6]);
  var cg=(m1*x1+m2*x2)/(m1+m2);
  if(sf==="S-04") return {stem:["Where does the weight of a uniform beam act?","น้ำหนักของคานสม่ำเสมอกระทำที่ใด"],
    opts:[{v:["At its midpoint","ที่จุดกึ่งกลาง"],ok:1},{v:["At the pivot","ที่จุดหมุน"],trap:"T-04"},
          {v:["At the loaded end","ที่ปลายที่มีน้ำหนักกด"],trap:"T-04"},{v:["Spread out, so it can be ignored","กระจายทั่วคาน จึงตัดทิ้งได้"],trap:"T-04"}],unit:""};
  return {stem:["Masses of "+m1+" kg and "+m2+" kg sit at 0 m and "+x2+" m on a light rod. Find the centre of gravity from the "+m1+" kg end.",
                "มวล "+m1+" กิโลกรัม และ "+m2+" กิโลกรัม วางที่ 0 เมตร และ "+x2+" เมตร บนแท่งเบา จงหาจุดศูนย์ถ่วงวัดจากปลายที่มีมวล "+m1+" กิโลกรัม"],
    opts:[{v:fmt(cg),ok:1},{v:fmt(x2/2),trap:"T-04"},{v:fmt(x2-cg)},{v:fmt(cg*2)}],unit:" m"};
},
"M-06": function(sf){
  var C=[{s:["A cone balanced on its point is nudged. What kind of equilibrium was it in?","กรวยที่ตั้งบนปลายแหลมถูกสะกิด ก่อนหน้านั้นอยู่ในสมดุลชนิดใด"],
          ok:["Unstable — the centre of gravity falls","ไม่เสถียร จุดศูนย์ถ่วงต่ำลง"],
          w:[["Stable — the centre of gravity rises","เสถียร จุดศูนย์ถ่วงสูงขึ้น"],
             ["Neutral — it stays level","สะเทิน อยู่ระดับเดิม"],
             ["It was not in equilibrium at all","ไม่ได้อยู่ในสมดุลเลย"]]},
         {s:["A ball resting on a flat table is pushed sideways. What kind of equilibrium is this?","ลูกบอลวางอยู่บนโต๊ะราบ ถูกผลักไปทางข้าง นี่เป็นสมดุลชนิดใด"],
          ok:["Neutral — the centre of gravity stays level","สะเทิน จุดศูนย์ถ่วงอยู่ระดับเดิม"],
          w:[["Stable","เสถียร"],["Unstable","ไม่เสถียร"],["Absolute equilibrium","สมดุลสัมบูรณ์"]]},
         {s:["Why is a racing car built wide and low?","ทำไมรถแข่งจึงสร้างให้กว้างและเตี้ย"],
          ok:["A wide base and low centre of gravity resist toppling","ฐานกว้างและจุดศูนย์ถ่วงต่ำช่วยต้านการล้ม"],
          w:[["To reduce its weight","เพื่อลดน้ำหนัก"],["To increase friction","เพื่อเพิ่มแรงเสียดทาน"],
             ["To raise the centre of gravity","เพื่อยกจุดศูนย์ถ่วงให้สูง"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
}
}
};
