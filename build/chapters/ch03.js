/* Chapter 03 glue for the golem lab: friction coefficients per ground, and
   the geometry the push handle shares with the drawing each frame. */
var C03 = {
  mu: [0.05, 0.3, 0.6], surf: ["ice", "stone", "moss"],
  k: 0.6, pxm: 10, back: 0, X0: 0,
  WALL: 58,
  r: function(p, t){
    var r = PHYS.push(p.F, p.m, C03.mu[p.s], Math.min(Math.max(t, 0), p.T));
    if(r.x > C03.WALL){ r.x = C03.WALL; r.v = 0; r.wall = true; }
    return r;
  },
  word: function(s){ return tx(["{@ice}", "{@stone}", "{@moss}"][s]); }
};

var CHAPTER = {
id:"ch03", num:"03", slug:"force-and-motion", subject:"physics",
kicker:["Physics · Chapter 03","ฟิสิกส์ · บทที่ 3"],
title:["Force and Motion","แรงและกฎการเคลื่อนที่"],
mapTitle:["Why anything accelerates","ทำไมสิ่งต่างๆ จึงมีความเร่ง"],
lede:["Chapter 2 described motion without asking what caused it. This one supplies the cause. Almost every problem here reduces to the same two steps: draw every force, then add them as vectors.",
      "บทที่ 2 อธิบายการเคลื่อนที่โดยยังไม่ถามว่าเกิดจากอะไร บทนี้จะตอบคำถามนั้น โจทย์เกือบทุกข้อในบทนี้ใช้สองขั้นตอนเดิมเสมอ คือวาดแรงให้ครบทุกแรง แล้วรวมแรงเหล่านั้นแบบเวกเตอร์"],
next:["→ continues in Chapter 04 · Equilibrium","→ ต่อในบทที่ 4 · สมดุลกล"],

nodes:[
{ id:"vectors", x:235, y:52, requires:[], methods:["M-01","M-02"],
  title:["Vectors","เวกเตอร์"],
  body:[["A force has size and direction, so forces add head to tail rather than as plain numbers. At right angles the resultant is R² = A² + B²; at any other angle you resolve each vector into components first.",
         "The resolving rule worth memorising: the component nearest the angle uses cosine, the component further from it uses sine. Getting this backwards is trap T-01 and it is the most expensive habit in the chapter."],
        ["แรงมีทั้งขนาดและทิศทาง เราจึงรวมแรงแบบหัวต่อหาง ไม่ใช่บวกเลขธรรมดา ถ้าแรงตั้งฉากกัน แรงลัพธ์หาได้จาก R² = A² + B² ถ้าทำมุมอื่น ให้แตกแรงแต่ละแรงเป็นองค์ประกอบก่อน",
         "กฎการแตกแรงที่ควรจำคือ องค์ประกอบที่อยู่ติดมุมใช้โคไซน์ องค์ประกอบที่อยู่ไกลมุมใช้ไซน์ ถ้าจำสลับกันจะติดกับดัก T-01 ซึ่งเป็นนิสัยที่ทำให้เสียคะแนนมากที่สุดในบทนี้"]],
  formula:["R² = A² + B² + 2AB cos θ","R² = A² + B² + 2AB cos θ"],
  flabel:["General case · θ = 90° gives Pythagoras","กรณีทั่วไป · θ = 90° ได้พีทาโกรัส"],
  viz:"vector",
  /* Decoration only. The plate is a drafting ground behind the diagram; every
     line the reader needs is drawn by the visualizer over it, so the node is
     unchanged if assets/ is deleted. */
  vizcfg:{ art:{ src:"drafting-grid.png", opacity:0.55, dark:"invert",
                 alt:["drafting grid","กระดาษตาราง"] },
           caption:["Fig 03.1 — vectors add head to tail, never as plain numbers",
                    "รูป 03.1 — เวกเตอร์รวมกันแบบหัวต่อหาง ไม่ใช่บวกเลขธรรมดา"] },
  guide:[
    {say:["Two vectors at right angles. The red resultant closes the triangle, and its length is √(A²+B²).",
          "เวกเตอร์สองตัวตั้งฉากกัน เวกเตอร์ลัพธ์สีแดงปิดรูปสามเหลี่ยม ความยาวของมันคือ √(A²+B²)"], set:{A:12,tA:0,B:9,tB:90}},
    {say:["Swing B round to 180°. Opposing vectors subtract — the resultant shrinks to the difference.",
          "หมุน B ไปที่ 180° เวกเตอร์ที่ทิศตรงข้ามกันหักล้างกัน ลัพธ์จึงเหลือเท่าผลต่าง"], set:{A:12,tA:0,B:9,tB:180}},
    {say:["Now try 60°. Neither Pythagoras nor simple subtraction works — this is where the cosine rule earns its keep.",
          "ลองที่ 60° ดู ใช้พีทาโกรัสก็ไม่ได้ ลบตรง ๆ ก็ไม่ได้ ตรงนี้แหละที่ต้องใช้กฎโคไซน์"], set:{A:12,tA:0,B:9,tB:60}}
  ]},

{ id:"force-types", x:100, y:150, requires:["vectors"], methods:["M-06"],
  title:["Kinds of force","ชนิดของแรง"],
  body:[["Weight W = mg always points down. The normal force N is perpendicular to the surface, and it is not automatically equal to the weight — on a slope it is mg cos θ, and in a lift it changes with the acceleration.",
         "Tension pulls away from the body along the string. Spring force is F = −kx, opposing whatever stretched it. Naming every force before writing a single equation is what a free-body diagram is for."],
        ["น้ำหนัก W = mg ชี้ลงเสมอ ส่วนแรงปฏิกิริยาตั้งฉาก N ตั้งฉากกับผิวสัมผัส และไม่จำเป็นต้องเท่ากับน้ำหนัก บนพื้นเอียง N = mg cos θ ส่วนในลิฟต์ N จะเปลี่ยนไปตามความเร่ง",
         "แรงตึงเชือกดึงวัตถุออกไปตามแนวเชือก แรงสปริงคือ F = −kx ซึ่งต้านทิศที่สปริงถูกยืด ก่อนเขียนสมการ ให้ระบุแรงทุกแรงให้ครบก่อน นั่นคือเหตุผลที่เราวาดแผนภาพวัตถุอิสระ"]],
  formula:["W = mg    N = mg cos θ    F_spring = −kx","W = mg    N = mg cos θ    F_spring = −kx"],
  flabel:["N equals mg only on level ground","N เท่ากับ mg เฉพาะบนพื้นราบเท่านั้น"],
  viz:"fbd",
  vizcfg:{
    title:["EVERY FORCE ON ONE BLOCK","แรงทุกแรงบนวัตถุก้อนเดียว"],
    ctrls:[
      {k:"m",    lab:["Mass","มวล"],            min:1, max:12, step:.5, def:4, unit:" kg"},
      {k:"push", lab:["Push","แรงผลัก"],         min:0, max:60, step:1,  def:20, unit:" N"},
      {k:"mu",   lab:["Friction coefficient μ","สัมประสิทธิ์เสียดทาน μ"], min:0, max:1, step:.05, def:.3, unit:""}
    ],
    readouts:[
      {lab:["Weight W = mg","น้ำหนัก W = mg"], f:function(S){ return un(S.p.m*10,"N"); }},
      {lab:["Normal N","แรงตั้งฉาก N"],        f:function(S){ return un(S.p.m*10,"N"); }},
      {lab:["Friction f = μN","แรงเสียดทาน f = μN"], f:function(S){
        return un(Math.min(S.p.push, S.p.mu*S.p.m*10),"N"); }},
      {lab:["Net force","แรงลัพธ์"], f:function(S){
        var f=Math.min(S.p.push, S.p.mu*S.p.m*10);
        var net=S.p.push-f;
        return un(net,"N")+(net<1e-9?(L()?" · อยู่นิ่ง":" · stays put"):(L()?" · มีความเร่ง":" · accelerates")); }}
    ],
    forces:function(p){
      var W=p.m*10;
      return [{mag:W, ang:270, lab:["W","W"], col:"ink"},
              {mag:W, ang:90,  lab:["N","N"], col:"good"},
              {mag:p.push, ang:0, lab:["push","ผลัก"], col:"accent"},
              {mag:Math.min(p.push, p.mu*W), ang:180, lab:["f","f"], col:"warn"}];
    },
    note:["N balances W here, so only the horizontal pair decides the motion","N กับ W หักล้างกันพอดี การเคลื่อนที่จึงขึ้นกับแรงคู่ในแนวระดับเท่านั้น"]
  } },

{ id:"newton1", x:370, y:150, requires:["vectors"], methods:[],
  title:["The first law","กฎข้อที่หนึ่ง"],
  body:[["With no resultant force a body keeps doing exactly what it was doing — staying still, or moving in a straight line at constant speed. Motion needs no cause; only a change of motion does.",
         "This is why a puck on ice does not need a push to keep sliding, and why the honest question in any problem is never why is it moving but why is it accelerating."],
        ["ถ้าไม่มีแรงลัพธ์ วัตถุจะคงสภาพเดิมไว้ คือหยุดนิ่งอยู่ หรือเคลื่อนที่เป็นเส้นตรงด้วยอัตราเร็วคงที่ การเคลื่อนที่ไม่ต้องมีสาเหตุ ต้องมีสาเหตุก็ต่อเมื่อการเคลื่อนที่เปลี่ยนไป",
         "เพราะอย่างนี้ลูกฮ็อกกี้บนน้ำแข็งจึงไถลต่อไปได้โดยไม่ต้องมีใครผลัก และคำถามที่ควรถามในโจทย์ไม่ใช่ \"ทำไมมันจึงเคลื่อนที่\" แต่คือ \"ทำไมมันจึงมีความเร่ง\""]],
  formula:["ΣF = 0  ⟹  v constant","ΣF = 0  ⟹  v คงที่"],
  flabel:["Inertia","ความเฉื่อย"],
  viz:"fbd",
  vizcfg:{
    title:["BALANCED FORCES CHANGE NOTHING","แรงสมดุลไม่ทำให้อะไรเปลี่ยน"],
    ctrls:[
      {k:"left",  lab:["Pull left","ดึงซ้าย"],  min:0, max:50, step:1, def:20, unit:" N"},
      {k:"right", lab:["Pull right","ดึงขวา"],  min:0, max:50, step:1, def:20, unit:" N"},
      {k:"m",     lab:["Mass","มวล"],           min:1, max:20, step:1, def:5,  unit:" kg"}
    ],
    readouts:[
      {lab:["Net force","แรงลัพธ์"], f:function(S){ return un(S.p.right-S.p.left,"N"); }},
      {lab:["Acceleration","ความเร่ง"], f:function(S){ return un((S.p.right-S.p.left)/S.p.m,"m/s²"); }},
      {lab:["State","สถานะ"], f:function(S){
        return Math.abs(S.p.right-S.p.left)<1e-9
          ? (L()?"ความเร็วไม่เปลี่ยน — อาจนิ่งหรือเคลื่อนที่ตรงด้วยความเร็วคงที่":"velocity unchanged — at rest OR moving steadily")
          : (L()?"ความเร็วกำลังเปลี่ยนอยู่":"velocity is changing"); }},
      {lab:["Does zero net force mean at rest?","แรงลัพธ์เป็นศูนย์ แปลว่าวัตถุนิ่งหรือเปล่า"], f:function(){
        return L()?"ไม่ใช่ — แปลว่าความเร็วไม่เปลี่ยน":"no — it means velocity does not change"; }}
    ],
    forces:function(p){
      return [{mag:p.left,  ang:180, lab:["F","F"], col:"soft"},
              {mag:p.right, ang:0,   lab:["F","F"], col:"accent"}];
    },
    note:["the first law is about CHANGE of velocity, not about being still","กฎข้อที่หนึ่งว่าด้วยความเร็วที่เปลี่ยน ไม่ใช่เรื่องการอยู่นิ่ง"]
  },
  guide:[
    {say:["Equal and opposite pulls. Net force is zero, so whatever the block was doing, it keeps doing.",
          "ดึงสองข้างด้วยแรงเท่ากัน แรงลัพธ์จึงเป็นศูนย์ วัตถุทำอะไรอยู่ก็ทำอย่างนั้นต่อไป"], set:{left:20,right:20,m:5}},
    {say:["Tip the balance by 5 N and an acceleration appears. Only an imbalance changes velocity.",
          "ลองให้แรงสองข้างต่างกัน 5 N ความเร่งก็ปรากฏขึ้น ความเร็วเปลี่ยนได้ก็ต่อเมื่อแรงไม่สมดุล"], set:{left:20,right:25,m:5}},
    {say:["Same imbalance, four times the mass. The acceleration drops — that is inertia, quantified.",
          "แรงต่างกันเท่าเดิม แต่มวลเป็นสี่เท่า ความเร่งเลยลดลง นี่คือความเฉื่อยที่วัดออกมาเป็นตัวเลข"], set:{left:20,right:25,m:20}}
  ] },

{ id:"newton2", x:235, y:248, requires:["force-types","newton1"], methods:["M-03"],
  title:["The second law","กฎข้อที่สอง"],
  body:[["ΣF = ma. The resultant force, not any single force, sets the acceleration — and it is inversely proportional to mass. For a connected system, use the total external force over the total mass, then return to each body separately for the internal forces.",
         "The lab shows the consequence: a constant resultant force produces a constant acceleration, which is exactly the straight-line v–t trace from Chapter 2."],
        ["ΣF = ma ความเร่งขึ้นกับแรงลัพธ์ ไม่ใช่แรงใดแรงหนึ่ง และแปรผกผันกับมวล ถ้าเป็นระบบที่เชื่อมกัน ให้ใช้แรงภายนอกรวมหารด้วยมวลรวม แล้วค่อยกลับมาดูแต่ละก้อนทีละก้อนเพื่อหาแรงภายใน",
         "ห้องทดลองแสดงให้เห็นผลที่ตามมา แรงลัพธ์คงที่ทำให้ความเร่งคงที่ และกราฟ v–t ก็เป็นเส้นตรงเหมือนในบทที่ 2"]],
  formula:["ΣF = ma","ΣF = ma"],
  flabel:["Resultant force, total mass","แรงลัพธ์ มวลรวม"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["The Golem's Push: a = F / m","แรงผลักโกเลม: a = F / m"],
    question:["Drag the push. Why does {@golem} sometimes refuse to move — and when it moves, what sets how fast it speeds up?",
              "ลองลากแรงผลักดู ทำไมบางครั้ง{@golem}ไม่ขยับเลย แล้วพอขยับแล้ว อะไรกำหนดว่ามันเร่งได้เร็วแค่ไหน"],
    ctrls:[
      {k:"F", lab:["Push F","แรงผลัก F"], min:0, max:100, step:5, def:60, unit:" N"},
      {k:"m", lab:["Mass of {@golem}","มวลของ{@golem}"], min:4, max:20, step:1, def:8, unit:" kg"},
      {k:"s", lab:["Ground","พื้น"], min:0, max:2, step:1, def:1,
       opts:[["{@Ice} · μ = 0.05","{@ice} · μ = 0.05"],["{@Stone} · μ = 0.3","{@stone} · μ = 0.3"],["{@Moss} · μ = 0.6","{@moss} · μ = 0.6"]]},
      {k:"T", lab:["Watch for","ดูนาน"], min:2, max:8, step:1, def:4, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Friction","แรงเสียดทาน"], f:function(S){ return un(C03.r(S.p,S.t).fric,"N"); }},
      {lab:["Resultant ΣF","แรงลัพธ์ ΣF"], f:function(S){ return un(C03.r(S.p,S.t).net,"N"); }},
      {lab:["Acceleration a","ความเร่ง a"], f:function(S){ return un(C03.r(S.p,S.t).a,"m/s²"); }},
      {lab:["Speed now","อัตราเร็วตอนนี้"], f:function(S){ return un(C03.r(S.p,S.t).v,"m/s"); }}
    ],
    /* fixed 60 m arena; a fast golem stops against the far wall */
    world:{ kind:"lane", left:84, span:function(){ return 60; } },
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
               vel:r.v, velScale:3, velLift:66, velLab:[un(r.v,"m/s"), un(r.v,"m/s")]}];
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
      fitText(o, 96, 43, ["free-body diagram","แผนภาพวัตถุอิสระ"], 116, 9.5, "var(--ink-faint)", "middle");
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
    instrument:{ kind:"bar", ymax:120,
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
        return "a = \\dfrac{\\Sigma F}{m} = \\dfrac{F - f}{m} = \\dfrac{"+numTex(p.F)+" - "+numTex(r.fric)+"}{"+numTex(p.m)+"} = "+numTex(r.a)+"\\,\\text{m/s}^2"+
               "\\qquad\\left[\\tfrac{\\text{N}}{\\text{kg}}=\\tfrac{\\text{m}}{\\text{s}^2}\\right]"; },
      terms:[
        {k:"F", sym:"F", lab:["your push","แรงผลักของเรา"], col:"accent2", f:function(p){ return un(p.F,"N"); }},
        {k:"f", sym:"f", lab:["friction · at most μmg","แรงเสียดทาน · มากสุด μmg"], col:"warn", f:function(p){ return un(C03.r(p,0).fric,"N"); }},
        {k:"a", sym:"a", lab:["acceleration","ความเร่ง"], col:"accent", f:function(p){ return un(C03.r(p,0).a,"m/s²"); }}
      ]
    },
    predict:{ kind:"x",
      ask:["Where will {@golem} be when the run ends?","พอจบการทดลอง {@golem}จะอยู่ตรงไหน"],
      actual:function(p){ return C03.r(p,p.T).x; },
      tol:function(p){ return Math.max(0.6, 0.08*C03.r(p,p.T).x); },
      explain:function(p){ var r=C03.r(p,p.T);
        if(!r.moves) return ["Friction can grip up to μmg = "+un(C03.mu[p.s]*p.m*10,"N")+", more than your "+un(p.F,"N")+" push, so it matches the push exactly and nothing moves.",
                             "แรงเสียดทานต้านได้สูงสุด μmg = "+un(C03.mu[p.s]*p.m*10,"N")+" มากกว่าแรงผลัก "+un(p.F,"N")+" แรงเสียดทานจึงเท่ากับแรงผลักพอดี และไม่มีอะไรขยับ"];
        if(r.wall) return ["It hits the far wall and stops at "+un(C03.WALL,"m")+". With no wall, s = ½at² would be "+un(0.5*r.a*p.T*p.T,"m")+".",
                           "{@golem}ชนกำแพงสุดทางแล้วหยุดที่ "+un(C03.WALL,"m")+" ถ้าไม่มีกำแพง s = ½at² จะได้ "+un(0.5*r.a*p.T*p.T,"m")];
        return ["a = (F − μmg) / m = ("+num(p.F)+" − "+num(r.fric)+") / "+num(p.m)+" = "+un(r.a,"m/s²")+", so s = ½at² = "+un(r.x,"m")+".",
                "a = (F − μmg) / m = ("+num(p.F)+" − "+num(r.fric)+") / "+num(p.m)+" = "+un(r.a,"m/s²")+" ดังนั้น s = ½at² = "+un(r.x,"m")]; }
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
        if(g.kind==="reach") return ["On "+C03.word(g.s)+", push {@golem} ("+un(g.m,"kg")+") from rest to {@goal} "+un(g.D,"m",4)+" away in exactly "+un(g.T,"s")+". How hard must you push?",
                                     "บน"+C03.word(g.s)+" ผลัก{@golem} ("+un(g.m,"kg")+") จากหยุดนิ่งไปถึง{@goal}ที่ห่างออกไป "+un(g.D,"m",4)+" ให้ได้ภายใน "+un(g.T,"s")+" พอดี ต้องผลักแรงเท่าไร"];
        if(g.kind==="budge") return ["{@Golem} ("+un(g.m,"kg")+") stands on "+C03.word(g.s)+". Find the smallest push, to the nearest 5 N, that makes it move at all.",
                                     "{@golem} ("+un(g.m,"kg")+") ยืนอยู่บน"+C03.word(g.s)+" หาแรงผลักที่น้อยที่สุดที่ทำให้มันขยับได้ ตอบเป็นจำนวนเท่าของ 5 N"];
        return ["On ice, a "+un(g.F,"N")+" push must give {@golem} an acceleration of exactly "+un(g.a,"m/s²")+". How heavy must {@golem} be?",
                "บนน้ำแข็ง ผลักด้วยแรง "+un(g.F,"N")+" แล้วต้องให้{@golem}มีความเร่ง "+un(g.a,"m/s²")+" พอดี {@golem}ต้องมีมวลเท่าไร"];
      },
      at:function(g){ return {x:(g.D||4), lift:30}; },
      check:function(p,S,g){
        var r=C03.r(p,0);
        if(g.kind==="reach"){
          if(p.F===g.F) return {ok:true, msg:["Right on {@goal}. a = 2s / t² = "+un(g.a,"m/s²")+", and F = ma + μmg = "+num(g.m)+" × "+num(g.a)+" + "+num(C03.mu[g.s]*g.m*10)+" = "+un(g.F,"N")+".",
                                              "ถึง{@goal}พอดี a = 2s / t² = "+un(g.a,"m/s²")+" และ F = ma + μmg = "+num(g.m)+" × "+num(g.a)+" + "+num(C03.mu[g.s]*g.m*10)+" = "+un(g.F,"N")]};
          return {ok:false, msg:["It slid "+un(C03.r(p,g.T).x,"m")+". Work out the acceleration you need first, then add the friction you must beat.",
                                 "มันไถลไป "+un(C03.r(p,g.T).x,"m")+" ลองหาความเร่งที่ต้องการก่อน แล้วบวกแรงเสียดทานที่ต้องชนะ"]};
        }
        if(g.kind==="budge"){
          if(p.F===g.F) return {ok:true, msg:["It budges. Friction grips up to μmg = "+un(g.lim,"N")+"; "+un(g.F,"N")+" is the first push past that.",
                                              "มันขยับแล้ว แรงเสียดทานต้านได้สูงสุด μmg = "+un(g.lim,"N")+" และ "+un(g.F,"N")+" คือแรงแรกที่เกินค่านี้"]};
          if(!r.moves) return {ok:false, msg:["Nothing moves: friction simply matched your "+un(p.F,"N")+". How much can it grip at most?",
                                              "ไม่ขยับเลย แรงเสียดทานเท่ากับแรงผลัก "+un(p.F,"N")+" พอดี แล้วมันต้านได้มากที่สุดเท่าไร"]};
          return {ok:false, msg:["It moves — but a smaller push would too. Friction holds up to μmg.","ขยับแล้ว แต่แรงที่น้อยกว่านี้ก็ขยับได้เหมือนกัน เพราะแรงเสียดทานต้านได้มากสุดแค่ μmg"]};
        }
        if(p.m===g.m) return {ok:true, msg:["m = F / (a + μg) = "+num(g.F)+" / ("+num(g.a)+" + 0.5) = "+un(g.m,"kg")+". Friction's share, μg = 0.5 m/s², comes off whatever the mass; the rest of a is F / m.",
                                           "m = F / (a + μg) = "+num(g.F)+" / ("+num(g.a)+" + 0.5) = "+un(g.m,"kg")+" ส่วนที่เสียดทานกินไป μg = 0.5 m/s² หักออกเสมอ ไม่ว่ามวลเท่าไร ส่วนที่เหลือของ a คือ F / m"]};
        return {ok:false, msg:["That mass gives "+un(r.a,"m/s²")+". Remember the ice still takes a little: f = 0.05 × m × 10.",
                               "มวลนี้ให้ความเร่ง "+un(r.a,"m/s²")+" อย่าลืมว่าบนน้ำแข็งก็ยังมีแรงเสียดทานอยู่นิดหน่อย f = 0.05 × m × 10"]};
      }
    },
    note:["the resultant force, not the push, sets the acceleration — and friction only pushes back as hard as it has to",
          "แรงลัพธ์ต่างหากที่กำหนดความเร่ง ไม่ใช่แรงผลัก และแรงเสียดทานต้านแค่เท่าที่จำเป็น"]
  },
  guide:[
    {say:["On ice a modest push is plenty: friction takes only a sliver, so nearly all of F becomes ma. Press play.",
          "บนน้ำแข็งผลักเบา ๆ ก็พอ เพราะแรงเสียดทานมีนิดเดียว F เกือบทั้งหมดจึงกลายเป็น ma กดเล่นได้เลย"], set:{F:40,m:8,s:0,T:4}},
    {say:["Same push on moss. Friction can grip up to μmg = 48 N, more than 40 N, so it matches the push and nothing moves.",
          "ผลักด้วยแรงเท่าเดิมบนมอส แรงเสียดทานต้านได้สูงสุด μmg = 48 N มากกว่า 40 N จึงเท่ากับแรงผลักพอดี และไม่มีอะไรขยับ"], set:{F:40,m:8,s:2,T:4}},
    {say:["Push harder than the grip and {@golem} goes — but only the resultant, F − f, accelerates it. Watch the last two bars match.",
          "ผลักแรงกว่าที่เสียดทานต้านไหว {@golem}ก็เคลื่อนที่ แต่ที่ทำให้เร่งคือแรงลัพธ์ F − f เท่านั้น สังเกตว่าสองแถบสุดท้ายเท่ากัน"], set:{F:80,m:8,s:2,T:4}}
  ]
},

{ id:"friction", x:100, y:346, requires:["force-types"], methods:["M-04"],
  title:["Friction","แรงเสียดทาน"],
  body:[["Friction depends on the normal force, never directly on weight and never on contact area. While the body is still, static friction takes whatever value it needs up to μsN. Once sliding, kinetic friction is fixed at μkN.",
         "Because N is not always mg, substituting weight for the normal force on a slope is trap T-03 — and on an incline N = mg cos θ, which is always smaller."],
        ["แรงเสียดทานขึ้นกับแรงตั้งฉาก ไม่ได้ขึ้นกับน้ำหนักโดยตรง และไม่ขึ้นกับพื้นที่สัมผัส ตอนที่วัตถุยังนิ่ง แรงเสียดทานสถิตจะมีค่าเท่าที่จำเป็น แต่ไม่เกิน μsN พอวัตถุไถลแล้ว แรงเสียดทานจลน์จะคงที่ที่ μkN",
         "N ไม่ได้เท่ากับ mg เสมอไป ถ้าบนพื้นเอียงเอาน้ำหนักไปแทนแรงตั้งฉาก ก็ติดกับดัก T-03 บนพื้นเอียง N = mg cos θ ซึ่งน้อยกว่า mg เสมอ"]],
  formula:["f_s ≤ μ_s N      f_k = μ_k N","f_s ≤ μ_s N      f_k = μ_k N"],
  flabel:["μ_s > μ_k always","μ_s > μ_k เสมอ"],
  viz:"plot",
  vizcfg:{
    title:["FRICTION AGAINST APPLIED FORCE","แรงเสียดทาน เทียบกับแรงที่กระทำ"],
    xlab:["applied force (N)","แรงที่กระทำ (N)"], ylab:["friction (N)","แรงเสียดทาน (N)"],
    xmin:0, xmax:60, ymin:0, fill:false,
    fn:function(x,p){
      var s=p.mus*p.m*10, k=p.muk*p.m*10;
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
      {lab:["Maximum static friction","แรงเสียดทานสถิตสูงสุด"], f:function(S){ return un(S.p.mus*S.p.m*10,"N"); }},
      {lab:["Friction right now","แรงเสียดทานตอนนี้"], f:function(S){
        var s=S.p.mus*S.p.m*10;
        return un(S.p.F<=s ? S.p.F : S.p.muk*S.p.m*10,"N"); }},
      {lab:["Moving?","ขยับหรือยัง"], f:function(S){
        return S.p.F<=S.p.mus*S.p.m*10
          ? (L()?"ยังไม่ขยับ — แรงเสียดทานเพิ่มตามแรงผลัก":"still stuck — friction matches the push")
          : (L()?"ไถลแล้ว":"sliding"); }},
      {lab:["Net force","แรงลัพธ์"], f:function(S){
        var s=S.p.mus*S.p.m*10;
        return un(S.p.F<=s ? 0 : S.p.F-S.p.muk*S.p.m*10,"N"); }}
    ],
    note:["static friction is not a fixed number — it grows to match, up to a limit","แรงเสียดทานสถิตไม่ใช่ค่าคงที่ มันเพิ่มตามแรงที่ผลักไปจนถึงขีดสูงสุด"]
  },
  guide:[
    {say:["Push gently. Friction rises to exactly cancel the push — the line is a 45° diagonal.",
          "ผลักเบา ๆ แรงเสียดทานก็เพิ่มตามมาหักล้างพอดี กราฟจึงเป็นเส้นทแยง 45°"], set:{m:3,mus:.5,muk:.3,F:8}},
    {say:["Push harder and you climb the diagonal. Nothing moves yet, but friction is working harder.",
          "ผลักแรงขึ้น จุดก็ไต่ขึ้นไปตามเส้นทแยง วัตถุยังไม่ขยับ แต่แรงเสียดทานต้องต้านมากขึ้น"], set:{m:3,mus:.5,muk:.3,F:14}},
    {say:["Cross the peak and it breaks loose. Friction DROPS to the kinetic value — that is the sudden lurch.",
          "ผ่านจุดสูงสุดไปแล้ววัตถุก็หลุดไถล แรงเสียดทานตกลงมาเป็นค่าจลน์ จึงรู้สึกว่าวัตถุกระตุกพุ่งไปทันที"], set:{m:3,mus:.5,muk:.3,F:22}}
  ] },

{ id:"newton3", x:370, y:346, requires:["newton2"], methods:["M-05"],
  title:["The third law","กฎข้อที่สาม"],
  body:[["Forces come in pairs of equal size and opposite direction. The pair always acts on two different bodies, which is why the two never cancel each other.",
         "If a book rests on a table, the pair to the book's weight is the pull the book exerts on the Earth — not the table's normal force. Confusing a Newton pair with balanced forces on one body is trap T-02."],
        ["แรงเกิดเป็นคู่ ขนาดเท่ากันและทิศตรงข้ามกัน แรงคู่นี้กระทำต่อวัตถุคนละก้อนเสมอ จึงไม่มีทางหักล้างกัน",
         "ถ้าหนังสือวางอยู่บนโต๊ะ แรงคู่ของน้ำหนักหนังสือคือแรงที่หนังสือดึงโลก ไม่ใช่แรงปฏิกิริยาตั้งฉากจากโต๊ะ ถ้าเอาแรงคู่ตามกฎของนิวตันไปปนกับแรงสมดุลที่กระทำต่อวัตถุก้อนเดียว ก็ติดกับดัก T-02"]],
  formula:["F₁₂ = −F₂₁","F₁₂ = −F₂₁"],
  flabel:["Same size · opposite · different bodies","ขนาดเท่า · ทิศตรงข้าม · คนละวัตถุ"],
  viz:"bars",
  vizcfg:{
    title:["EQUAL FORCES, UNEQUAL ACCELERATIONS","แรงเท่ากัน แต่ความเร่งไม่เท่ากัน"],
    ylab:["N  and  m/s²","N  และ  m/s²"],
    ctrls:[
      {k:"F",  lab:["Force of the pair","ขนาดแรงของคู่แรง"], min:5, max:80, step:1, def:30, unit:" N"},
      {k:"mA", lab:["Mass of A","มวลของ A"], min:1, max:20, step:1, def:2,  unit:" kg"},
      {k:"mB", lab:["Mass of B","มวลของ B"], min:1, max:20, step:1, def:10, unit:" kg"}
    ],
    readouts:[
      {lab:["Force on A","แรงที่กระทำต่อ A"], f:function(S){ return un(S.p.F,"N"); }},
      {lab:["Force on B","แรงที่กระทำต่อ B"], f:function(S){ return un(S.p.F,"N"); }},
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
    note:["the two red bars can never differ — only the green and amber ones can","แถบสีแดงสองแถบไม่มีวันต่างกัน ต่างกันได้เฉพาะแถบสีเขียวกับสีเหลืองอำพัน"]
  },
  guide:[
    {say:["The two force bars are identical. That is the third law, and no setting can break it.",
          "แถบแรงสองแถบเท่ากันเป๊ะ นี่คือกฎข้อที่สาม ตั้งค่ายังไงก็ทำให้ต่างกันไม่ได้"], set:{F:30,mA:2,mB:10}},
    {say:["Yet the accelerations differ five-fold, because the masses do. Equal forces, unequal effects.",
          "แต่ความเร่งต่างกันห้าเท่า เพราะมวลต่างกันห้าเท่า แรงเท่ากัน แต่ผลที่ได้ไม่เท่ากัน"], set:{F:30,mA:2,mB:10}},
    {say:["Make the masses equal and the accelerations match too. The forces were never the difference.",
          "ลองทำให้มวลเท่ากัน ความเร่งก็เท่ากันด้วย แรงไม่ใช่ตัวที่ทำให้ต่างกัน"], set:{F:30,mA:6,mB:6}}
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
"T-01":["Sine and cosine swapped. The component nearest the angle takes the cosine.","สลับไซน์กับโคไซน์แล้ว องค์ประกอบที่อยู่ติดมุมใช้โคไซน์"],
"T-02":["That is a balanced pair on one body, not a Newton pair. A third-law pair acts on two different bodies.","นั่นคือแรงสองแรงที่สมดุลกันบนวัตถุก้อนเดียว ไม่ใช่แรงคู่ตามกฎของนิวตัน แรงคู่ตามกฎข้อสามกระทำต่อวัตถุสองก้อนที่ต่างกัน"],
"T-03":["You used the weight where the normal force belongs. On a slope N = mg cos θ.","คุณใช้น้ำหนักในที่ที่ต้องใช้แรงปฏิกิริยาตั้งฉาก บนพื้นเอียง N = mg cos θ"],
"T-04":["A force was left out, or the wrong mass was used. ΣF means every external force, m means the whole system.","อาจลืมแรงบางแรง หรือใช้มวลผิด ΣF คือแรงภายนอกทุกแรงรวมกัน และ m คือมวลของทั้งระบบ"]
},

gen:{
"M-01": function(sf){
  var F=ri(20,120), th=pick([30,37,45,53,60]);
  var R={30:[0.866,0.5],37:[0.799,0.602],45:[0.707,0.707],53:[0.602,0.799],60:[0.5,0.866]}[th];
  var cx=F*R[0], cy=F*R[1];
  if(sf==="S-04") return {stem:["A force F acts at angle θ above the horizontal. Which is its horizontal component?",
                                "แรง F กระทำทำมุม θ เหนือแนวราบ องค์ประกอบในแนวราบคือข้อใด"],
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
                                "แรง A และ B ตั้งฉากกันและกระทำต่อวัตถุ แรงลัพธ์มีขนาดเท่าใด"],
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
                                "กล่องสองใบผูกกันด้วยเชือกแล้วดึงเป็นระบบเดียว ใน ΣF = ma ต้องใช้มวลเท่าใด"],
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
                                "ถ้าเพิ่มพื้นที่สัมผัสระหว่างกล่องกับพื้นเป็นสองเท่า แรงเสียดทานจะเป็นอย่างไร"],
    opts:[{v:["Nothing — friction does not depend on area","ไม่เปลี่ยน แรงเสียดทานไม่ขึ้นกับพื้นที่"],ok:1},
          {v:["Doubles it","เพิ่มเป็นสองเท่า"]},{v:["Halves it","ลดลงครึ่งหนึ่ง"]},
          {v:["Depends on the material only","ขึ้นกับวัสดุเท่านั้น"]}],unit:""};
  return {stem:["A "+m+" kg block rests on level ground with μ = "+mu+". Find the maximum friction force.",
                "กล่องมวล "+m+" กิโลกรัม วางบนพื้นราบที่มี μ = "+mu+" จงหาแรงเสียดทานสูงสุด"],
    opts:[{v:fmt(mu*m*g),ok:1},{v:fmt(m*g)},{v:fmt(mu*m)},{v:fmt(mu*g)}],unit:" N"};
},
"M-05": function(sf){
  var C=[{s:["A book rests on a table. What is the Newton pair to the book's weight?","หนังสือวางอยู่บนโต๊ะ แรงคู่ตามกฎของนิวตันของน้ำหนักหนังสือคือแรงใด"],
          ok:["The book pulling the Earth upward","หนังสือดึงโลกขึ้น"],
          w:[["The table pushing the book up","โต๊ะดันหนังสือขึ้น"],["The book pushing the table down","หนังสือกดโต๊ะลง"],["The weight of the table","น้ำหนักของโต๊ะ"]]},
         {s:["A swimmer pushes water backwards. What is the reaction?","นักว่ายน้ำผลักน้ำไปข้างหลัง แรงปฏิกิริยาคือแรงใด"],
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
