/* Chapter 03 glue for the golem lab: friction coefficients per ground, and
   the geometry the push handle shares with the drawing each frame. */
var C03 = {
  mu: [0.05, 0.3, 0.6], surf: ["ice", "stone", "moss"],
  k: 0.6, pxm: 10, back: 0, X0: 0,
  r: function(p, t){ return PHYS.push(p.F, p.m, C03.mu[p.s], Math.min(Math.max(t, 0), p.T)); },
  word: function(s){ return tx(["{@ice}", "{@stone}", "{@moss}"][s]); }
};

var CHAPTER = {
id:"ch03", num:"03", slug:"force-and-motion", subject:"physics",
kicker:["Physics · Chapter 03","ฟิสิกส์ · บทที่ 3"],
title:["Force and Motion","แรงและกฎการเคลื่อนที่"],
mapTitle:["Why anything accelerates","ทำไมสิ่งต่างๆ จึงมีความเร่ง"],
lede:["Chapter 2 described motion without asking what caused it. This one supplies the cause. Almost every problem here reduces to the same two steps: draw every force, then add them as vectors.",
      "บทที่ 2 บรรยายการเคลื่อนที่โดยไม่ถามว่าอะไรเป็นสาเหตุ บทนี้ให้คำตอบนั้น โจทย์เกือบทุกข้อในบทนี้ย่อลงเหลือสองขั้นตอนเดิมเสมอ คือวาดแรงให้ครบ แล้วรวมกันแบบเวกเตอร์"],
next:["→ continues in Chapter 04 · Equilibrium","→ ต่อในบทที่ 4 · สมดุลกล"],

nodes:[
{ id:"vectors", x:235, y:52, requires:[], methods:["M-01","M-02"],
  title:["Vectors","เวกเตอร์"],
  body:[["A force has size and direction, so forces add head to tail rather than as plain numbers. At right angles the resultant is R² = A² + B²; at any other angle you resolve each vector into components first.",
         "The resolving rule worth memorising: the component nearest the angle uses cosine, the component further from it uses sine. Getting this backwards is trap T-01 and it is the most expensive habit in the chapter."],
        ["แรงมีทั้งขนาดและทิศทาง จึงต้องรวมแบบหัวต่อหางไม่ใช่บวกเป็นตัวเลขธรรมดา ถ้าตั้งฉากกันผลลัพธ์คือ R² = A² + B² ถ้าทำมุมอื่นต้องแตกเวกเตอร์เป็นองค์ประกอบก่อน",
         "กฎแตกเวกเตอร์ที่ควรจำคือ ด้านที่ใกล้มุมใช้โคไซน์ ด้านที่ไกลมุมใช้ไซน์ การจำสลับกันคือกับดัก T-01 และเป็นนิสัยที่แพงที่สุดในบทนี้"]],
  formula:["R² = A² + B² + 2AB cos θ","R² = A² + B² + 2AB cos θ"],
  flabel:["General case · θ = 90° gives Pythagoras","กรณีทั่วไป · θ = 90° ได้พีทาโกรัส"],
  viz:"vector",
  /* Decoration only. The plate is a drafting ground behind the diagram; every
     line the reader needs is drawn by the visualizer over it, so the node is
     unchanged if assets/ is deleted. */
  vizcfg:{ art:{ src:"drafting-grid.png", opacity:0.55, dark:"invert",
                 alt:["drafting grid","กระดาษตาราง"] },
           caption:["Fig 03.1 — vectors add head to tail, never as plain numbers",
                    "รูป 03.1 — เวกเตอร์รวมแบบหัวต่อหาง ไม่ใช่บวกเป็นตัวเลขธรรมดา"] },
  guide:[
    {say:["Two vectors at right angles. The red resultant closes the triangle, and its length is √(A²+B²).",
          "เวกเตอร์สองตัวตั้งฉากกัน ผลลัพธ์สีแดงปิดสามเหลี่ยม และความยาวของมันคือ √(A²+B²)"], set:{A:12,tA:0,B:9,tB:90}},
    {say:["Swing B round to 180°. Opposing vectors subtract — the resultant shrinks to the difference.",
          "หมุน B ไปที่ 180° เวกเตอร์ที่สวนทางกันจะหักล้าง ผลลัพธ์เหลือเท่ากับผลต่าง"], set:{A:12,tA:0,B:9,tB:180}},
    {say:["Now try 60°. Neither Pythagoras nor simple subtraction works — this is where the cosine rule earns its keep.",
          "ลองที่ 60° ทั้งพีทาโกรัสและการลบตรงๆ ใช้ไม่ได้ นี่คือจุดที่กฎโคไซน์มีประโยชน์"], set:{A:12,tA:0,B:9,tB:60}}
  ]},

{ id:"force-types", x:100, y:150, requires:["vectors"], methods:["M-06"],
  title:["Kinds of force","ชนิดของแรง"],
  body:[["Weight W = mg always points down. The normal force N is perpendicular to the surface, and it is not automatically equal to the weight — on a slope it is mg cos θ, and in a lift it changes with the acceleration.",
         "Tension pulls away from the body along the string. Spring force is F = −kx, opposing whatever stretched it. Naming every force before writing a single equation is what a free-body diagram is for."],
        ["น้ำหนัก W = mg ชี้ลงเสมอ แรงตั้งฉาก N ตั้งฉากกับพื้นผิว และไม่ได้เท่ากับน้ำหนักโดยอัตโนมัติ บนพื้นเอียงมีค่า mg cos θ และในลิฟต์จะเปลี่ยนไปตามความเร่ง",
         "แรงตึงเชือกดึงออกจากวัตถุไปตามแนวเชือก แรงสปริงคือ F = −kx ต้านสิ่งที่ทำให้มันยืด การเรียกชื่อแรงทุกแรงก่อนเขียนสมการคือเหตุผลที่ต้องวาดแผนภาพวัตถุอิสระ"]],
  formula:["W = mg    N = mg cos θ    F_spring = −kx","W = mg    N = mg cos θ    F_spring = −kx"],
  flabel:["N equals mg only on level ground","N เท่ากับ mg เฉพาะบนพื้นราบเท่านั้น"],
  viz:"fbd",
  vizcfg:{
    title:["EVERY FORCE ON ONE BLOCK","แรงทุกแรงที่กระทำต่อวัตถุก้อนเดียว"],
    ctrls:[
      {k:"m",    lab:["Mass","มวล"],            min:1, max:12, step:.5, def:4, unit:" kg"},
      {k:"push", lab:["Push","แรงผลัก"],         min:0, max:60, step:1,  def:20, unit:" N"},
      {k:"mu",   lab:["Friction coefficient μ","สัมประสิทธิ์เสียดทาน μ"], min:0, max:1, step:.05, def:.3, unit:""}
    ],
    readouts:[
      {lab:["Weight W = mg","น้ำหนัก W = mg"], f:function(S){ return fmt(S.p.m*9.8)+" N"; }},
      {lab:["Normal N","แรงตั้งฉาก N"],        f:function(S){ return fmt(S.p.m*9.8)+" N"; }},
      {lab:["Friction f = μN","เสียดทาน f = μN"], f:function(S){
        return fmt(Math.min(S.p.push, S.p.mu*S.p.m*9.8))+" N"; }},
      {lab:["Net force","แรงลัพธ์"], f:function(S){
        var f=Math.min(S.p.push, S.p.mu*S.p.m*9.8);
        var net=S.p.push-f;
        return fmt(net)+" N"+(net<1e-9?(L()?" · อยู่นิ่ง":" · stays put"):(L()?" · เร่ง":" · accelerates")); }}
    ],
    forces:function(p){
      var W=p.m*9.8;
      return [{mag:W, ang:270, lab:["W","W"], col:"ink"},
              {mag:W, ang:90,  lab:["N","N"], col:"good"},
              {mag:p.push, ang:0, lab:["push","ผลัก"], col:"accent"},
              {mag:Math.min(p.push, p.mu*W), ang:180, lab:["f","f"], col:"warn"}];
    },
    note:["N balances W here, so only the horizontal pair decides the motion","ตรงนี้ N สมดุลกับ W แรงคู่แนวราบจึงเป็นตัวตัดสินการเคลื่อนที่"]
  } },

{ id:"newton1", x:370, y:150, requires:["vectors"], methods:[],
  title:["The first law","กฎข้อที่หนึ่ง"],
  body:[["With no resultant force a body keeps doing exactly what it was doing — staying still, or moving in a straight line at constant speed. Motion needs no cause; only a change of motion does.",
         "This is why a puck on ice does not need a push to keep sliding, and why the honest question in any problem is never why is it moving but why is it accelerating."],
        ["เมื่อไม่มีแรงลัพธ์ วัตถุจะทำสิ่งที่ทำอยู่ต่อไปพอดี คืออยู่นิ่งหรือเคลื่อนที่เป็นเส้นตรงด้วยอัตราเร็วคงที่ การเคลื่อนที่ไม่ต้องการสาเหตุ มีเพียงการเปลี่ยนแปลงการเคลื่อนที่เท่านั้นที่ต้องการ",
         "นี่คือเหตุผลที่ลูกฮ็อกกี้บนน้ำแข็งไม่ต้องถูกผลักเพื่อไถลต่อ และคำถามที่แท้จริงในโจทย์ไม่ใช่ทำไมมันเคลื่อนที่ แต่คือทำไมมันมีความเร่ง"]],
  formula:["ΣF = 0  ⟹  v constant","ΣF = 0  ⟹  v คงที่"],
  flabel:["Inertia","ความเฉื่อย"],
  viz:"fbd",
  vizcfg:{
    title:["BALANCED FORCES CHANGE NOTHING","แรงที่สมดุลไม่เปลี่ยนอะไรเลย"],
    ctrls:[
      {k:"left",  lab:["Pull left","ดึงซ้าย"],  min:0, max:50, step:1, def:20, unit:" N"},
      {k:"right", lab:["Pull right","ดึงขวา"],  min:0, max:50, step:1, def:20, unit:" N"},
      {k:"m",     lab:["Mass","มวล"],           min:1, max:20, step:1, def:5,  unit:" kg"}
    ],
    readouts:[
      {lab:["Net force","แรงลัพธ์"], f:function(S){ return fmt(S.p.right-S.p.left)+" N"; }},
      {lab:["Acceleration","ความเร่ง"], f:function(S){ return fmt2((S.p.right-S.p.left)/S.p.m)+" m/s²"; }},
      {lab:["State","สถานะ"], f:function(S){
        return Math.abs(S.p.right-S.p.left)<1e-9
          ? (L()?"ความเร็วคงเดิม — นิ่งหรือแล่นตรงสม่ำเสมอ":"velocity unchanged — at rest OR moving steadily")
          : (L()?"ความเร็วกำลังเปลี่ยน":"velocity is changing"); }},
      {lab:["Does zero net force mean at rest?","แรงลัพธ์ศูนย์แปลว่าอยู่นิ่งไหม"], f:function(){
        return L()?"ไม่ — แปลว่าความเร็วไม่เปลี่ยน":"no — it means velocity does not change"; }}
    ],
    forces:function(p){
      return [{mag:p.left,  ang:180, lab:["F","F"], col:"soft"},
              {mag:p.right, ang:0,   lab:["F","F"], col:"accent"}];
    },
    note:["the first law is about CHANGE of velocity, not about being still","กฎข้อที่หนึ่งพูดถึงการเปลี่ยนความเร็ว ไม่ใช่การอยู่นิ่ง"]
  },
  guide:[
    {say:["Equal and opposite pulls. Net force is zero, so whatever the block was doing, it keeps doing.",
          "ดึงเท่ากันสวนทางกัน แรงลัพธ์เป็นศูนย์ วัตถุจึงทำสิ่งที่ทำอยู่ต่อไป"], set:{left:20,right:20,m:5}},
    {say:["Tip the balance by 5 N and an acceleration appears. Only an imbalance changes velocity.",
          "ทำให้เสียสมดุลไป 5 นิวตัน ความเร่งก็ปรากฏขึ้น มีเพียงความไม่สมดุลเท่านั้นที่เปลี่ยนความเร็ว"], set:{left:20,right:25,m:5}},
    {say:["Same imbalance, four times the mass. The acceleration drops — that is inertia, quantified.",
          "ความไม่สมดุลเท่าเดิม มวลมากขึ้นสี่เท่า ความเร่งลดลง นั่นคือความเฉื่อยที่วัดออกมาเป็นตัวเลข"], set:{left:20,right:25,m:20}}
  ] },

{ id:"newton2", x:235, y:248, requires:["force-types","newton1"], methods:["M-03"],
  title:["The second law","กฎข้อที่สอง"],
  body:[["ΣF = ma. The resultant force, not any single force, sets the acceleration — and it is inversely proportional to mass. For a connected system, use the total external force over the total mass, then return to each body separately for the internal forces.",
         "The lab shows the consequence: a constant resultant force produces a constant acceleration, which is exactly the straight-line v–t trace from Chapter 2."],
        ["ΣF = ma แรงลัพธ์ ไม่ใช่แรงใดแรงหนึ่ง เป็นตัวกำหนดความเร่ง และความเร่งแปรผกผันกับมวล สำหรับระบบที่ผูกกัน ให้ใช้แรงภายนอกรวมหารด้วยมวลรวม แล้วค่อยกลับมาพิจารณาแต่ละก้อนเพื่อหาแรงภายใน",
         "ห้องทดลองแสดงผลที่ตามมา แรงลัพธ์คงที่ทำให้เกิดความเร่งคงที่ ซึ่งก็คือกราฟ v–t เส้นตรงจากบทที่ 2 นั่นเอง"]],
  formula:["ΣF = ma","ΣF = ma"],
  flabel:["Resultant force, total mass","แรงลัพธ์ มวลรวม"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["The Golem's Push","แรงผลักโกเลม"],
    question:["Drag the push. Why does {@golem} sometimes refuse to move — and when it moves, what sets how fast it speeds up?",
              "ลากแรงผลัก ทำไมบางครั้ง{@golem}จึงไม่ขยับเลย และเมื่อขยับ อะไรกำหนดว่ามันเร่งเร็วแค่ไหน"],
    ctrls:[
      {k:"F", lab:["Push F","แรงผลัก F"], min:0, max:100, step:5, def:60, unit:" N"},
      {k:"m", lab:["Mass of {@golem}","มวลของ{@golem}"], min:4, max:20, step:1, def:8, unit:" kg"},
      {k:"s", lab:["Ground","พื้น"], min:0, max:2, step:1, def:1,
       opts:[["{@Ice} · μ = 0.05","{@ice} · μ = 0.05"],["{@Stone} · μ = 0.3","{@stone} · μ = 0.3"],["{@Moss} · μ = 0.6","{@moss} · μ = 0.6"]]},
      {k:"T", lab:["Watch for","ดูนาน"], min:2, max:8, step:1, def:4, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Friction","แรงเสียดทาน"], f:function(S){ return fmt(C03.r(S.p,S.t).fric)+" N"; }},
      {lab:["Resultant ΣF","แรงลัพธ์ ΣF"], f:function(S){ return fmt(C03.r(S.p,S.t).net)+" N"; }},
      {lab:["Acceleration a","ความเร่ง a"], f:function(S){ return fmt2(C03.r(S.p,S.t).a)+" m/s²"; }},
      {lab:["Speed now","ความเร็วขณะนี้"], f:function(S){ return fmt2(C03.r(S.p,S.t).v)+" m/s"; }}
    ],
    world:{ kind:"lane", left:84, span:function(p,S){
      var x=C03.r(p,p.T).x; if(S.trial && S.trial.goal.D) x=Math.max(x,S.trial.goal.D);
      return Math.max(12, x*1.18+3); } },
    under:function(o,S,W){
      role("surface")(o, FR.sx, FR.sx+FR.sw, W.g, {variant:C03.surf[S.p.s]});
    },
    props:function(p,S){
      var g=S.trial && S.trial.goal;
      return g && g.D ? [{role:"goal", x:g.D, on:S.t>=p.T-1e-9 && Math.abs(C03.r(p,p.T).x-g.D)<0.3}] : [];
    },
    cast:function(p,S){
      var r=C03.r(p,S.t);
      return [{role:"golem", x:r.x, size:0.75+p.m/40, moving:r.moves && S.t>0, term:"a",
               vel:r.v, velScale:3, velLift:66, velLab:[fmt(r.v)+" m/s", fmt(r.v)+" ม./วิ"]}];
    },
    /* the push on the golem's back, its friction at the feet, and a
       free-body diagram to scale in the corner */
    scene:function(o,S,W){
      var p=S.p, r=C03.r(p,S.t), gx=W.X(r.x), gy=W.g, k=0.6, back=gx-26*(0.75+p.m/40);
      C03.pxm=W.X(1)-W.X(0); C03.X0=W.X(0); C03.back=back; C03.k=k;
      if(p.F>0) role("vector")(o, back-p.F*k, gy-20, back, gy-20, {col:"var(--accent2)", hl:S.hl==="F"});
      if(r.fric>0) role("vector")(o, gx, gy-3, gx-r.fric*k, gy-3, {col:"var(--warn)", hl:S.hl==="f"});
      /* free-body inset */
      /* to scale with each other: the largest force fills the box */
      var cx=96, cy=88, wg=p.m*10, sc=38/Math.max(wg, p.F, r.fric, 1);
      o.push('<rect x="34" y="30" width="124" height="112" rx="8" fill="var(--surface)" fill-opacity=".55" stroke="var(--rule)"/>');
      fitText(o, 96, 43, ["free-body diagram","แผนภาพแรงอิสระ"], 116, 9.5, "var(--ink-faint)", "middle");
      o.push('<rect x="'+(cx-9)+'" y="'+(cy-9)+'" width="18" height="18" fill="var(--ink-faint)" opacity=".5"/>');
      var arr=function(dx,dy,c,lab,hl){
        if(Math.abs(dx)+Math.abs(dy)<1) return;
        role("vector")(o, cx, cy, cx+dx, cy+dy, {col:c, hl:hl});
        o.push('<text x="'+fmt2(cx+dx+(dx>0?4:dx<0?-4:5))+'" y="'+fmt2(cy+dy+(dy>0?11:dy<0?-3:4))+'" fill="'+c+'" font-family="IBM Plex Sans" font-size="9.5" text-anchor="'+(dx<0?"end":"start")+'">'+lab+'</text>');
      };
      arr(0, -wg*sc, "var(--good)", "N");
      arr(0, wg*sc, "var(--ink-soft)", "mg");
      arr(p.F*sc, 0, "var(--accent2)", "F", S.hl==="F");
      arr(-r.fric*sc, 0, "var(--warn)", "f", S.hl==="f");
    },
    handles:[
      {k:"F", at:function(p){ return {x:(C03.back-p.F*C03.k-C03.X0)/C03.pxm, lift:20}; },
       set:function(m){ return {F:(C03.back-(C03.X0+m*C03.pxm))/C03.k}; },
       lab:["drag the push","ลากแรงผลัก"], col:"accent2", term:"F"}
    ],
    instrument:{ kind:"bar",
      ylab:["newtons","นิวตัน"],
      bars:[
        {lab:["Push F","แรงผลัก F"], f:function(p){ return p.F; }, col:"accent2"},
        {lab:["Friction f","แรงเสียดทาน f"], f:function(p){ return C03.r(p,0).fric; }, col:"warn"},
        {lab:["Resultant ΣF","แรงลัพธ์ ΣF"], f:function(p){ return C03.r(p,0).net; }, col:"good"},
        {lab:["m × a","m × a"], f:function(p){ return p.m*C03.r(p,0).a; }, col:"accent"}
      ]
    },
    spell:{
      tex:function(p){ var r=C03.r(p,0);
        return "a = \\dfrac{\\Sigma F}{m} = \\dfrac{F - f}{m} = \\dfrac{"+p.F+" - "+fmt(r.fric)+"}{"+p.m+"} = "+fmt2(r.a)+"\\,\\text{m/s}^2"+
               "\\qquad\\left[\\tfrac{\\text{N}}{\\text{kg}}=\\tfrac{\\text{m}}{\\text{s}^2}\\right]"; },
      terms:[
        {k:"F", sym:"F", lab:["your push","แรงผลักของคุณ"], col:"accent2", f:function(p){ return p.F+" N"; }},
        {k:"f", sym:"f", lab:["friction · at most μmg","แรงเสียดทาน · ไม่เกิน μmg"], col:"warn", f:function(p){ return fmt(C03.r(p,0).fric)+" N"; }},
        {k:"a", sym:"a", lab:["acceleration","ความเร่ง"], col:"accent", f:function(p){ return fmt2(C03.r(p,0).a)+" m/s²"; }}
      ]
    },
    predict:{ kind:"x",
      ask:["Where will {@golem} be when the run ends?","เมื่อจบการทดลอง {@golem}จะอยู่ตรงไหน"],
      actual:function(p){ return C03.r(p,p.T).x; },
      tol:function(p){ return Math.max(0.6, 0.08*C03.r(p,p.T).x); },
      explain:function(p){ var r=C03.r(p,p.T);
        if(!r.moves) return ["Friction can grip up to μmg = "+fmt(C03.mu[p.s]*p.m*10)+" N, more than your "+p.F+" N push, so it matches the push exactly and nothing moves.",
                             "แรงเสียดทานยึดได้ถึง μmg = "+fmt(C03.mu[p.s]*p.m*10)+" N มากกว่าแรงผลัก "+p.F+" N จึงต้านพอดีและไม่มีอะไรขยับ"];
        return ["a = (F − μmg) / m = ("+p.F+" − "+fmt(r.fric)+") / "+p.m+" = "+fmt2(r.a)+" m/s², so s = ½at² = "+fmt2(r.x)+" m.",
                "a = (F − μmg) / m = ("+p.F+" − "+fmt(r.fric)+") / "+p.m+" = "+fmt2(r.a)+" ม./วิ² ดังนั้น s = ½at² = "+fmt2(r.x)+" ม."]; }
    },
    trials:{
      veil:true,
      make:function(){
        var kind=pick(["reach","budge","mass"]), n=0, g;
        if(kind==="reach"){
          do{ var s=ri(0,2), m=ri(4,20), a=pick([0.5,1,1.5,2,2.5,3]), T=pick([2,3,4]);
              var F=m*(a+C03.mu[s]*10); n++; } while((Math.abs(F/5-Math.round(F/5))>1e-9 || F>100) && n<500);
          return {kind:kind, s:s, m:m, a:a, T:T, F:F, D:0.5*a*T*T, set:{s:s, m:m, T:T, F:0}};
        }
        if(kind==="budge"){
          var s2=ri(1,2), m2=ri(4,16), lim=C03.mu[s2]*m2*10, F2=Math.floor(lim/5+1e-9)*5+5;
          return {kind:kind, s:s2, m:m2, lim:lim, F:F2, set:{s:s2, m:m2, F:0, T:3}};
        }
        do{ var F3=5*ri(6,20), a3=pick([1.5,2,2.5,3.5,4.5,5.5,7.5]), m3=F3/(a3+0.5); n++; }
        while((Math.abs(m3-Math.round(m3))>1e-9 || m3<4 || m3>20) && n<500);
        return {kind:"mass", F:F3, a:a3, m:m3, set:{s:0, F:F3, m:20, T:3}};
      },
      lockFor:function(g){ return g.kind==="reach" ? ["s","m","T"] : (g.kind==="budge" ? ["s","m"] : ["s","F"]); },
      say:function(g){
        if(g.kind==="reach") return ["On "+C03.word(g.s)+", push {@golem} ("+g.m+" kg) from rest to {@goal} "+fmt2(g.D)+" m away in exactly "+g.T+" s. How hard must you push?",
                                     "บน"+C03.word(g.s)+" ผลัก{@golem} ("+g.m+" กก.) จากหยุดนิ่งไปถึง{@goal}ที่ห่าง "+fmt2(g.D)+" ม. ในเวลา "+g.T+" วินาทีพอดี ต้องผลักแรงเท่าใด"];
        if(g.kind==="budge") return ["{@Golem} ("+g.m+" kg) stands on "+C03.word(g.s)+". Find the smallest push, to the nearest 5 N, that makes it move at all.",
                                     "{@golem} ("+g.m+" กก.) ยืนอยู่บน"+C03.word(g.s)+" จงหาแรงผลักน้อยที่สุด (ละเอียดถึง 5 N) ที่ทำให้มันขยับได้"];
        return ["On ice, a "+g.F+" N push must give {@golem} an acceleration of exactly "+g.a+" m/s². How heavy must {@golem} be?",
                "บนน้ำแข็ง แรงผลัก "+g.F+" N ต้องทำให้{@golem}มีความเร่ง "+g.a+" ม./วิ² พอดี {@golem}ต้องมีมวลเท่าใด"];
      },
      at:function(g){ return {x:(g.D||4), lift:30}; },
      check:function(p,S,g){
        var r=C03.r(p,0);
        if(g.kind==="reach"){
          if(p.F===g.F) return {ok:true, msg:["Right on {@goal}. a = 2s / t² = "+g.a+" m/s², and F = ma + μmg = "+g.m+" × "+g.a+" + "+fmt(C03.mu[g.s]*g.m*10)+" = "+g.F+" N.",
                                              "ถึง{@goal}พอดี a = 2s / t² = "+g.a+" ม./วิ² และ F = ma + μmg = "+g.m+" × "+g.a+" + "+fmt(C03.mu[g.s]*g.m*10)+" = "+g.F+" N"]};
          return {ok:false, msg:["It slid "+fmt2(C03.r(p,g.T).x)+" m. Work out the acceleration you need first, then add the friction you must beat.",
                                 "มันไถลไป "+fmt2(C03.r(p,g.T).x)+" ม. หาความเร่งที่ต้องการก่อน แล้วบวกแรงเสียดทานที่ต้องเอาชนะ"]};
        }
        if(g.kind==="budge"){
          if(p.F===g.F) return {ok:true, msg:["It budges. Friction grips up to μmg = "+fmt(g.lim)+" N; "+g.F+" N is the first push past that.",
                                              "มันขยับแล้ว แรงเสียดทานยึดได้ถึง μmg = "+fmt(g.lim)+" N และ "+g.F+" N คือแรงแรกที่เกินค่านั้น"]};
          if(!r.moves) return {ok:false, msg:["Nothing moves: friction simply matched your "+p.F+" N. How much can it grip at most?",
                                              "ไม่ขยับ แรงเสียดทานต้านแรง "+p.F+" N ได้พอดี มันยึดได้มากที่สุดเท่าใด"]};
          return {ok:false, msg:["It moves — but a smaller push would too. Friction holds up to μmg.","ขยับแล้ว แต่แรงที่น้อยกว่านี้ก็ขยับได้ แรงเสียดทานยึดได้ไม่เกิน μmg"]};
        }
        if(p.m===g.m) return {ok:true, msg:["m = F / (a + μg) = "+g.F+" / ("+g.a+" + 0.5) = "+g.m+" kg. Friction's share, μg = 0.5 m/s², comes off whatever the mass; the rest of a is F / m.",
                                           "m = F / (a + μg) = "+g.F+" / ("+g.a+" + 0.5) = "+g.m+" กก. ส่วนของแรงเสียดทาน μg = 0.5 ม./วิ² ถูกหักออกเสมอไม่ว่ามวลเท่าใด ส่วนที่เหลือของ a คือ F / m"]};
        return {ok:false, msg:["That mass gives "+fmt2(r.a)+" m/s². Remember the ice still takes a little: f = 0.05 × m × 10.",
                               "มวลนี้ให้ความเร่ง "+fmt2(r.a)+" ม./วิ² อย่าลืมว่าน้ำแข็งยังมีแรงเสียดทานเล็กน้อย f = 0.05 × m × 10"]};
      }
    },
    note:["the resultant force, not the push, sets the acceleration — and friction only pushes back as hard as it has to",
          "แรงลัพธ์ ไม่ใช่แรงผลัก เป็นตัวกำหนดความเร่ง และแรงเสียดทานต้านกลับเท่าที่จำเป็นเท่านั้น"]
  },
  guide:[
    {say:["On ice a modest push is plenty: friction takes only a sliver, so nearly all of F becomes ma. Press play.",
          "บนน้ำแข็ง แรงผลักไม่มากก็พอ แรงเสียดทานกินไปนิดเดียว เกือบทั้งหมดของ F กลายเป็น ma กดเล่น"], set:{F:40,m:8,s:0,T:4}},
    {say:["Same push on moss. Friction can grip up to μmg = 48 N, more than 40 N, so it matches the push and nothing moves.",
          "แรงเดิมบนมอส แรงเสียดทานยึดได้ถึง μmg = 48 N มากกว่า 40 N จึงต้านพอดีและไม่มีอะไรขยับ"], set:{F:40,m:8,s:2,T:4}},
    {say:["Push harder than the grip and {@golem} goes — but only the resultant, F − f, accelerates it. Watch the last two bars match.",
          "ผลักแรงกว่าแรงยึด {@golem}ก็ไป แต่มีเพียงแรงลัพธ์ F − f เท่านั้นที่ทำให้เกิดความเร่ง สังเกตสองแถบสุดท้ายเท่ากัน"], set:{F:80,m:8,s:2,T:4}}
  ]
},

{ id:"friction", x:100, y:346, requires:["force-types"], methods:["M-04"],
  title:["Friction","แรงเสียดทาน"],
  body:[["Friction depends on the normal force, never directly on weight and never on contact area. While the body is still, static friction takes whatever value it needs up to μsN. Once sliding, kinetic friction is fixed at μkN.",
         "Because N is not always mg, substituting weight for the normal force on a slope is trap T-03 — and on an incline N = mg cos θ, which is always smaller."],
        ["แรงเสียดทานขึ้นกับแรงตั้งฉาก ไม่ได้ขึ้นกับน้ำหนักโดยตรงและไม่ขึ้นกับพื้นที่สัมผัส ขณะวัตถุยังนิ่ง แรงเสียดทานสถิตจะปรับค่าตามที่จำเป็นได้ถึง μsN เมื่อไถลแล้ว แรงเสียดทานจลน์คงที่ที่ μkN",
         "เพราะ N ไม่ได้เท่ากับ mg เสมอ การแทนน้ำหนักลงในตำแหน่งแรงตั้งฉากบนพื้นเอียงจึงเป็นกับดัก T-03 บนพื้นเอียง N = mg cos θ ซึ่งน้อยกว่าเสมอ"]],
  formula:["f_s ≤ μ_s N      f_k = μ_k N","f_s ≤ μ_s N      f_k = μ_k N"],
  flabel:["μ_s > μ_k always","μ_s > μ_k เสมอ"],
  viz:"plot",
  vizcfg:{
    title:["FRICTION AGAINST APPLIED FORCE","แรงเสียดทาน เทียบ แรงที่กระทำ"],
    xlab:["applied force (N)","แรงที่กระทำ (N)"], ylab:["friction (N)","แรงเสียดทาน (N)"],
    xmin:0, xmax:60, ymin:0, fill:false,
    fn:function(x,p){
      var s=p.mus*p.m*9.8, k=p.muk*p.m*9.8;
      return x<=s ? x : k;
    },
    mark:function(p){ return p.F; },
    ctrls:[
      {k:"m",   lab:["Mass","มวล"], min:1, max:8, step:.5, def:3, unit:" kg"},
      {k:"mus", lab:["Static μs","สถิต μs"],  min:.1, max:.9, step:.05, def:.5, unit:""},
      {k:"muk", lab:["Kinetic μk","จลน์ μk"], min:.05, max:.8, step:.05, def:.3, unit:""},
      {k:"F",   lab:["Applied force","แรงที่กระทำ"], min:0, max:58, step:1, def:8, unit:" N"}
    ],
    readouts:[
      {lab:["Maximum static friction","เสียดทานสถิตสูงสุด"], f:function(S){ return fmt(S.p.mus*S.p.m*9.8)+" N"; }},
      {lab:["Friction right now","เสียดทานขณะนี้"], f:function(S){
        var s=S.p.mus*S.p.m*9.8;
        return fmt(S.p.F<=s ? S.p.F : S.p.muk*S.p.m*9.8)+" N"; }},
      {lab:["Moving?","เคลื่อนที่ไหม"], f:function(S){
        return S.p.F<=S.p.mus*S.p.m*9.8
          ? (L()?"ยังไม่ขยับ — เสียดทานปรับตัวตาม":"still stuck — friction matches the push")
          : (L()?"ลื่นไถลแล้ว":"sliding"); }},
      {lab:["Net force","แรงลัพธ์"], f:function(S){
        var s=S.p.mus*S.p.m*9.8;
        return fmt(S.p.F<=s ? 0 : S.p.F-S.p.muk*S.p.m*9.8)+" N"; }}
    ],
    note:["static friction is not a fixed number — it grows to match, up to a limit","เสียดทานสถิตไม่ใช่ค่าคงที่ มันโตขึ้นตามแรงที่กระทำจนถึงขีดจำกัด"]
  },
  guide:[
    {say:["Push gently. Friction rises to exactly cancel the push — the line is a 45° diagonal.",
          "ผลักเบาๆ แรงเสียดทานเพิ่มขึ้นหักล้างแรงผลักพอดี เส้นกราฟจึงเป็นเส้นทแยง 45°"], set:{m:3,mus:.5,muk:.3,F:8}},
    {say:["Push harder and you climb the diagonal. Nothing moves yet, but friction is working harder.",
          "ผลักแรงขึ้น เราไต่ขึ้นไปตามเส้นทแยง ยังไม่มีอะไรขยับ แต่แรงเสียดทานทำงานหนักขึ้น"], set:{m:3,mus:.5,muk:.3,F:14}},
    {say:["Cross the peak and it breaks loose. Friction DROPS to the kinetic value — that is the sudden lurch.",
          "ผ่านจุดสูงสุดไป วัตถุหลุดออก แรงเสียดทานลดลงสู่ค่าจลน์ นั่นคือการกระตุกที่รู้สึกได้"], set:{m:3,mus:.5,muk:.3,F:22}}
  ] },

{ id:"newton3", x:370, y:346, requires:["newton2"], methods:["M-05"],
  title:["The third law","กฎข้อที่สาม"],
  body:[["Forces come in pairs of equal size and opposite direction. The pair always acts on two different bodies, which is why the two never cancel each other.",
         "If a book rests on a table, the pair to the book's weight is the pull the book exerts on the Earth — not the table's normal force. Confusing a Newton pair with balanced forces on one body is trap T-02."],
        ["แรงเกิดเป็นคู่ที่มีขนาดเท่ากันและทิศตรงข้าม คู่แรงนี้กระทำกับวัตถุคนละก้อนเสมอ ซึ่งเป็นเหตุผลว่าทำไมทั้งสองจึงไม่มีวันหักล้างกัน",
         "ถ้าหนังสือวางบนโต๊ะ คู่ของน้ำหนักหนังสือคือแรงที่หนังสือดึงโลก ไม่ใช่แรงตั้งฉากจากโต๊ะ การสับสนคู่กิริยา–ปฏิกิริยากับแรงสมดุลบนวัตถุเดียวคือกับดัก T-02"]],
  formula:["F₁₂ = −F₂₁","F₁₂ = −F₂₁"],
  flabel:["Same size · opposite · different bodies","ขนาดเท่า · ทิศตรงข้าม · คนละวัตถุ"],
  viz:"bars",
  vizcfg:{
    title:["EQUAL FORCES, UNEQUAL ACCELERATIONS","แรงเท่ากัน แต่ความเร่งไม่เท่ากัน"],
    ylab:["N  and  m/s²","N  และ  m/s²"],
    ctrls:[
      {k:"F",  lab:["Force of the pair","ขนาดแรงของคู่นี้"], min:5, max:80, step:1, def:30, unit:" N"},
      {k:"mA", lab:["Mass of A","มวลของ A"], min:1, max:20, step:1, def:2,  unit:" kg"},
      {k:"mB", lab:["Mass of B","มวลของ B"], min:1, max:20, step:1, def:10, unit:" kg"}
    ],
    readouts:[
      {lab:["Force on A","แรงที่กระทำต่อ A"], f:function(S){ return fmt(S.p.F)+" N"; }},
      {lab:["Force on B","แรงที่กระทำต่อ B"], f:function(S){ return fmt(S.p.F)+" N"; }},
      {lab:["Are they equal?","เท่ากันไหม"], f:function(){
        return L()?"เท่ากันเสมอ — เป็นคู่แรงกิริยา-ปฏิกิริยา":"always equal — they are the action-reaction pair"; }},
      {lab:["Why the different motion?","ทำไมเคลื่อนที่ต่างกัน"], f:function(S){
        return L()?"มวลต่างกัน a = F/m จึงต่างกัน":"different masses, so a = F/m differs"; }}
    ],
    bars:[
      {lab:["Force on A","แรงต่อ A"],       f:function(p){ return p.F; },      col:"accent"},
      {lab:["Force on B","แรงต่อ B"],       f:function(p){ return p.F; },      col:"accent"},
      {lab:["Acceleration of A","ความเร่ง A"], f:function(p){ return p.F/p.mA; }, col:"good"},
      {lab:["Acceleration of B","ความเร่ง B"], f:function(p){ return p.F/p.mB; }, col:"warn"}
    ],
    note:["the two red bars can never differ — only the green and amber ones can","แถบสีแดงสองแถบต่างกันไม่ได้เลย มีเพียงแถบเขียวกับเหลืองอำพันที่ต่างกันได้"]
  },
  guide:[
    {say:["The two force bars are identical. That is the third law, and no setting can break it.",
          "แถบแรงสองแถบเท่ากันเป๊ะ นั่นคือกฎข้อที่สาม และไม่มีการตั้งค่าใดทำให้มันต่างกันได้"], set:{F:30,mA:2,mB:10}},
    {say:["Yet the accelerations differ five-fold, because the masses do. Equal forces, unequal effects.",
          "แต่ความเร่งต่างกันห้าเท่า เพราะมวลต่างกัน แรงเท่ากันแต่ผลไม่เท่ากัน"], set:{F:30,mA:2,mB:10}},
    {say:["Make the masses equal and the accelerations match too. The forces were never the difference.",
          "ทำให้มวลเท่ากัน ความเร่งก็เท่ากันด้วย แรงไม่เคยเป็นตัวที่ทำให้ต่าง"], set:{F:30,mA:6,mB:6}}
  ] }
],

methods:[
{id:"M-01", name:["Resolve a vector into components","แตกเวกเตอร์เป็นองค์ประกอบ"]},
{id:"M-02", name:["Add vectors to find a resultant","รวมเวกเตอร์หาผลลัพธ์"]},
{id:"M-03", name:["Apply ΣF = ma","ใช้ ΣF = ma"]},
{id:"M-04", name:["Compute friction from the normal force","หาแรงเสียดทานจากแรงตั้งฉาก"]},
{id:"M-05", name:["Identify the action–reaction pair","ระบุคู่กิริยา–ปฏิกิริยา"]},
{id:"M-06", name:["Find the normal force in context","หาแรงตั้งฉากตามสถานการณ์"]}
],

traps:{
"T-01":["Sine and cosine swapped. The component nearest the angle takes the cosine.","สลับไซน์กับโคไซน์ ด้านที่ใกล้มุมใช้โคไซน์"],
"T-02":["That is a balanced pair on one body, not a Newton pair. A third-law pair acts on two different bodies.","นั่นคือแรงสมดุลบนวัตถุเดียว ไม่ใช่คู่ตามกฎข้อสาม คู่กิริยา–ปฏิกิริยากระทำกับวัตถุคนละก้อน"],
"T-03":["You used the weight where the normal force belongs. On a slope N = mg cos θ.","คุณใช้น้ำหนักแทนแรงตั้งฉาก บนพื้นเอียง N = mg cos θ"],
"T-04":["A force was left out, or the wrong mass was used. ΣF means every external force, m means the whole system.","มีแรงตกหล่นหรือใช้มวลผิด ΣF คือแรงภายนอกทุกแรง และ m คือทั้งระบบ"]
},

gen:{
"M-01": function(sf){
  var F=ri(20,120), th=pick([30,37,45,53,60]);
  var R={30:[0.866,0.5],37:[0.799,0.602],45:[0.707,0.707],53:[0.602,0.799],60:[0.5,0.866]}[th];
  var cx=F*R[0], cy=F*R[1];
  if(sf==="S-04") return {stem:["A force F acts at angle θ above the horizontal. Which is its horizontal component?",
                                "แรง F ทำมุม θ กับแนวราบ องค์ประกอบตามแนวราบคือข้อใด"],
    opts:[{v:"F cos θ",ok:1},{v:"F sin θ",trap:"T-01"},{v:"F tan θ"},{v:"F / cos θ"}],unit:""};
  if(sf==="S-05") return {stem:["A force has a horizontal component of "+fmt(cx)+" N at "+th+"° to the horizontal. Find the force.",
                                "แรงหนึ่งมีองค์ประกอบแนวราบ "+fmt(cx)+" นิวตัน ทำมุม "+th+"° กับแนวราบ จงหาขนาดแรง"],
    opts:[{v:String(F),ok:1},{v:fmt(cx*R[0])},{v:fmt(cx/R[1]),trap:"T-01"},{v:fmt(cx*2)}],unit:" N"};
  return {stem:["A force of "+F+" N acts at "+th+"° above the horizontal. Find its horizontal component.",
                "แรง "+F+" นิวตัน ทำมุม "+th+"° กับแนวราบ จงหาองค์ประกอบตามแนวราบ"],
    opts:[{v:fmt(cx),ok:1},{v:fmt(cy),trap:"T-01"},{v:String(F)},{v:fmt(F*0.5)}],unit:" N"};
},
"M-02": function(sf){
  var A=pick([3,6,8,9,12]), B=pick([4,8,15,12,5]);
  var R=Math.sqrt(A*A+B*B);
  if(sf==="S-04") return {stem:["Two perpendicular forces A and B act on a body. What is the magnitude of the resultant?",
                                "แรงตั้งฉากสองแรง A และ B กระทำต่อวัตถุ ขนาดของแรงลัพธ์คือข้อใด"],
    opts:[{v:"√(A² + B²)",ok:1},{v:"A + B"},{v:"|A − B|"},{v:"AB"}],unit:""};
  return {stem:["Forces of "+A+" N and "+B+" N act at right angles. Find the resultant.",
                "แรง "+A+" นิวตัน และ "+B+" นิวตัน กระทำตั้งฉากกัน จงหาแรงลัพธ์"],
    opts:[{v:fmt(R),ok:1},{v:String(A+B),trap:"T-04"},{v:String(Math.abs(A-B))},{v:fmt(R/2)}],unit:" N"};
},
"M-03": function(sf){
  var m=pick([2,4,5,8,10]), F=ri(10,60), a=F/m;
  if(sf==="S-05") return {stem:["A "+m+" kg body accelerates at "+fmt(a)+" m/s². What resultant force acts on it?",
                                "วัตถุมวล "+m+" กิโลกรัม มีความเร่ง "+fmt(a)+" ม./วินาที² แรงลัพธ์ที่กระทำเป็นเท่าใด"],
    opts:[{v:String(F),ok:1},{v:fmt(a/m)},{v:fmt(m/a)},{v:fmt(F*2)}],unit:" N"};
  if(sf==="S-03") return {stem:["A trolley of mass "+m+" kg is pushed along a frictionless floor by a steady "+F+" N. Find its acceleration.",
                                "รถเข็นมวล "+m+" กิโลกรัม ถูกผลักบนพื้นไร้แรงเสียดทานด้วยแรงคงที่ "+F+" นิวตัน จงหาความเร่ง"],
    opts:[{v:fmt(a),ok:1},{v:fmt(F*m),trap:"T-04"},{v:fmt(m/F)},{v:fmt(F/(m*10))}],unit:" m/s²"};
  if(sf==="S-04") return {stem:["Two blocks joined by a string are pulled as one system. Which mass goes into ΣF = ma?",
                                "กล่องสองใบผูกด้วยเชือกถูกดึงเป็นระบบเดียว ควรใช้มวลใดใน ΣF = ma"],
    opts:[{v:["The total mass of both blocks","มวลรวมของกล่องทั้งสอง"],ok:1},
          {v:["The mass of the front block only","มวลของกล่องหน้าเท่านั้น"],trap:"T-04"},
          {v:["The mass of the heavier block","มวลของกล่องที่หนักกว่า"],trap:"T-04"},
          {v:["The difference of the two masses","ผลต่างของมวลทั้งสอง"]}],unit:""};
  return {stem:["A resultant force of "+F+" N acts on a "+m+" kg body. Find the acceleration.",
                "แรงลัพธ์ "+F+" นิวตัน กระทำต่อวัตถุมวล "+m+" กิโลกรัม จงหาความเร่ง"],
    opts:[{v:fmt(a),ok:1},{v:fmt(m/F)},{v:fmt(F*m),trap:"T-04"},{v:fmt(F/(m+1))}],unit:" m/s²"};
},
"M-04": function(sf){
  var m=pick([2,4,5,10]), mu=pick([0.2,0.25,0.4,0.5]), g=10;
  var th=pick([30,37,53,60]), cos={30:0.866,37:0.799,53:0.602,60:0.5}[th];
  if(sf==="S-03"||sf==="S-02") return {stem:["A "+m+" kg block sits on a "+th+"° slope with μ = "+mu+". Find the friction force on it.",
                                             "กล่องมวล "+m+" กิโลกรัม วางบนพื้นเอียง "+th+"° ที่มี μ = "+mu+" จงหาแรงเสียดทาน"],
    opts:[{v:fmt(mu*m*g*cos),ok:1},{v:fmt(mu*m*g),trap:"T-03"},{v:fmt(m*g*cos)},{v:fmt(mu*m)}],unit:" N"};
  if(sf==="S-04") return {stem:["Doubling the contact area between a block and the floor does what to the friction force?",
                                "การเพิ่มพื้นที่สัมผัสระหว่างกล่องกับพื้นเป็นสองเท่า ส่งผลต่อแรงเสียดทานอย่างไร"],
    opts:[{v:["Nothing — friction does not depend on area","ไม่เปลี่ยน แรงเสียดทานไม่ขึ้นกับพื้นที่"],ok:1},
          {v:["Doubles it","เพิ่มเป็นสองเท่า"]},{v:["Halves it","ลดลงครึ่งหนึ่ง"]},
          {v:["Depends on the material only","ขึ้นกับวัสดุเท่านั้น"]}],unit:""};
  return {stem:["A "+m+" kg block rests on level ground with μ = "+mu+". Find the maximum friction force.",
                "กล่องมวล "+m+" กิโลกรัม วางบนพื้นราบที่มี μ = "+mu+" จงหาแรงเสียดทานสูงสุด"],
    opts:[{v:fmt(mu*m*g),ok:1},{v:fmt(m*g)},{v:fmt(mu*m)},{v:fmt(mu*g)}],unit:" N"};
},
"M-05": function(sf){
  var C=[{s:["A book rests on a table. What is the Newton pair to the book's weight?","หนังสือวางบนโต๊ะ คู่กิริยา–ปฏิกิริยาของน้ำหนักหนังสือคืออะไร"],
          ok:["The book pulling the Earth upward","หนังสือดึงโลกขึ้น"],
          w:[["The table pushing the book up","โต๊ะดันหนังสือขึ้น"],["The book pushing the table down","หนังสือกดโต๊ะลง"],["The weight of the table","น้ำหนักของโต๊ะ"]]},
         {s:["A swimmer pushes water backwards. What is the reaction?","นักว่ายน้ำผลักน้ำไปข้างหลัง ปฏิกิริยาคืออะไร"],
          ok:["The water pushes the swimmer forwards","น้ำผลักนักว่ายน้ำไปข้างหน้า"],
          w:[["The swimmer's weight","น้ำหนักของนักว่ายน้ำ"],["The upthrust on the swimmer","แรงพยุงนักว่ายน้ำ"],["Drag on the swimmer","แรงต้านนักว่ายน้ำ"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0],trap:"T-02"},{v:c.w[1],trap:"T-02"},{v:c.w[2]}],unit:""};
},
"M-06": function(sf){
  var m=pick([2,5,10,20]), g=10, th=pick([30,37,53,60]);
  var cos={30:0.866,37:0.799,53:0.602,60:0.5}[th];
  var a=pick([2,3,4]);
  if(sf==="S-03") return {stem:["A "+m+" kg person stands in a lift accelerating upward at "+a+" m/s². What does the floor push with?",
                                "คนมวล "+m+" กิโลกรัม ยืนในลิฟต์ที่เร่งขึ้นด้วย "+a+" ม./วินาที² พื้นลิฟต์ดันด้วยแรงเท่าใด"],
    opts:[{v:String(m*(g+a)),ok:1},{v:String(m*g),trap:"T-03"},{v:String(m*(g-a))},{v:String(m*a)}],unit:" N"};
  return {stem:["A "+m+" kg block lies on a slope of "+th+"°. Find the normal force.",
                "กล่องมวล "+m+" กิโลกรัม วางบนพื้นเอียง "+th+"° จงหาแรงตั้งฉาก"],
    opts:[{v:fmt(m*g*cos),ok:1},{v:String(m*g),trap:"T-03"},{v:fmt(m*g*Math.sqrt(1-cos*cos))},{v:fmt(m*cos)}],unit:" N"};
}
}
};
