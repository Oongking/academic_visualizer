/* Chapter 13 field room: charges placed in picture pixels, distances in
   metres at k px per metre. Field lines are traced through the summed field
   each frame, from whichever charges are positive. */
var C13 = {
  x0: 40, y0: 34, w: 480, h: 262, k: 96, KE: 9e9,
  pos: function(p){
    return { x1: p.x1 != null ? p.x1 : 200, y1: p.y1 != null ? p.y1 : 165, x2: p.x2 != null ? p.x2 : 400, y2: p.y2 != null ? p.y2 : 165,
             xt: p.xt != null ? p.xt : 330, yt: p.yt != null ? p.yt : 110 };
  },
  place: function(w, px, py){
    var o = {}; px = Math.max(C13.x0 + 14, Math.min(C13.x0 + C13.w - 14, px)); py = Math.max(C13.y0 + 14, Math.min(C13.y0 + C13.h - 14, py));
    if(w === "1"){ o.x1 = px; o.y1 = py; } else if(w === "2"){ o.x2 = px; o.y2 = py; } else { o.xt = px; o.yt = py; }
    return o;
  },
  charges: function(p){
    var P = C13.pos(p), c = [];
    if(p.Q1) c.push({ x: P.x1 / C13.k, y: P.y1 / C13.k, q: p.Q1 * 1e-9 });
    if(p.Q2) c.push({ x: P.x2 / C13.k, y: P.y2 / C13.k, q: p.Q2 * 1e-9 });
    return c;
  },
  Eat: function(p, pt){
    var e = PHYS.efield(C13.charges(p), pt[0] / C13.k, pt[1] / C13.k, 1e-4);
    var x = e[0] * C13.KE, y = e[1] * C13.KE;
    return { x: x, y: y, m: Math.sqrt(x * x + y * y) };
  },
  r1: function(p, pt){ var P = C13.pos(p); return Math.max(0.05, Math.hypot(pt[0] - P.x1, pt[1] - P.y1) / C13.k); },
  /* during a run the test charge walks straight out from wisp 1 to twice its distance */
  test: function(p, t){
    var P = C13.pos(p), f = 1 + Math.min(1, t / (p.T || 3));
    return [P.x1 + (P.xt - P.x1) * f, P.y1 + (P.yt - P.y1) * f];
  },
  lines: function(p){
    var cs = C13.charges(p), out = [], src = cs.filter(function(c){ return c.q > 0; }), dir = 1;
    if(!src.length){ src = cs; dir = -1; }
    var qmax = Math.max.apply(null, cs.map(function(c){ return Math.abs(c.q); }).concat([1e-12]));
    src.forEach(function(c){
      var n = Math.max(6, Math.round(14 * Math.abs(c.q) / qmax));
      for(var i = 0; i < n; i++){
        var a = 2 * Math.PI * (i + 0.5) / n, x = c.x * C13.k + 12 * Math.cos(a), y = c.y * C13.k + 12 * Math.sin(a), pts = [[x, y]];
        for(var s = 0; s < 160; s++){
          var e = PHYS.efield(cs, x / C13.k, y / C13.k, 1e-4), m = Math.hypot(e[0], e[1]) || 1;
          x += dir * 5 * e[0] / m; y += dir * 5 * e[1] / m;
          if(x < C13.x0 || x > C13.x0 + C13.w || y < C13.y0 || y > C13.y0 + C13.h) break;
          pts.push([x, y]);
          if(cs.some(function(o){ return o !== c && Math.hypot(x - o.x * C13.k, y - o.y * C13.k) < 10; })) break;
        }
        out.push(pts);
      }
    });
    return out;
  }
};

var CHAPTER = {
id:"ch13", num:"13", slug:"electrostatics", subject:"physics",
kicker:["Physics · Chapter 13","ฟิสิกส์ · บทที่ 13"],
title:["Electrostatics","ไฟฟ้าสถิต"],
mapTitle:["Gravity's louder cousin","ญาติที่เสียงดังกว่าของแรงโน้มถ่วง"],
lede:["Coulomb's law has the same shape as Newton's law of gravitation, which means every technique from Chapter 3 transfers directly. The differences are that charge comes in two signs, and that the force is unimaginably stronger.",
      "กฎของคูลอมบ์มีรูปแบบเดียวกับกฎแรงโน้มถ่วงของนิวตัน ทุกเทคนิคจากบทที่ 3 จึงถ่ายโอนมาได้โดยตรง ต่างกันตรงที่ประจุมีสองเครื่องหมาย และแรงนี้แข็งแรงกว่าอย่างเหลือเชื่อ"],
next:["→ continues in Chapter 14 · Current Electricity","→ ต่อในบทที่ 14 · ไฟฟ้ากระแส"],

nodes:[
{ id:"coulomb", x:235, y:52, requires:[], methods:["M-01"],
  title:["Coulomb's law","กฎของคูลอมบ์"],
  body:[["The force between two point charges is F = kq₁q₂/r², with k = 9 × 10⁹ N·m²/C². Like charges repel, unlike attract, and the force falls off as the square of separation.",
         "Compare it to gravity: identical form, but electrostatic attraction between a proton and an electron is about 10³⁹ times stronger than their gravitational attraction. Gravity only wins at large scales because charge cancels and mass never does."],
        ["แรงระหว่างประจุจุดสองประจุคือ F = kq₁q₂/r² โดย k = 9 × 10⁹ นิวตัน·ตร.ม./คูลอมบ์² ประจุชนิดเดียวกันผลักกัน ต่างชนิดดูดกัน และแรงลดลงตามกำลังสองของระยะห่าง",
         "เทียบกับแรงโน้มถ่วง รูปแบบเหมือนกันทุกประการ แต่แรงดูดทางไฟฟ้าระหว่างโปรตอนกับอิเล็กตรอนแรงกว่าแรงโน้มถ่วงราว 10³⁹ เท่า แรงโน้มถ่วงชนะเฉพาะในระดับใหญ่เพราะประจุหักล้างกันได้ แต่มวลไม่เคยหักล้าง"]],
  formula:["F = k q₁q₂ / r²        k = 9 × 10⁹","F = k q₁q₂ / r²        k = 9 × 10⁹"],
  flabel:["Inverse square, like gravity","กำลังสองผกผัน เหมือนแรงโน้มถ่วง"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){ return 9e9*p.q1*1e-9*p.q2*1e-9/(Math.max(x,0.02)*Math.max(x,0.02)); },
    xmin:0.02, xmax:1, fill:true,
    title:["FORCE AGAINST SEPARATION","แรง เทียบ ระยะห่าง"],
    xlab:["r (m)","r (ม.)"], ylab:["F (N)","F (นิวตัน)"],
    mark:function(p){ return p.r; },
    ctrls:[
      {k:"q1", lab:["Charge q₁","ประจุ q₁"], min:1, max:20, step:1, def:10, unit:" nC"},
      {k:"q2", lab:["Charge q₂","ประจุ q₂"], min:1, max:20, step:1, def:10, unit:" nC"},
      {k:"r",  lab:["Separation r","ระยะห่าง r"], min:0.05, max:1, step:.05, def:0.3, unit:" m"}
    ],
    readouts:[
      {lab:["Force at r","แรงที่ระยะ r"], f:function(S){
        return (9e9*S.p.q1*1e-9*S.p.q2*1e-9/(S.p.r*S.p.r)).toExponential(2)+" N"; }},
      {lab:["At half that distance","ที่ระยะครึ่งหนึ่ง"], f:function(S){
        return (9e9*S.p.q1*1e-9*S.p.q2*1e-9/(S.p.r*S.p.r/4)).toExponential(2)+" N"; }}
    ]
  },
  guide:[
    {say:["The curve dives near the origin. Bring the charges close and the force explodes.",
          "เส้นกราฟดิ่งลงใกล้จุดกำเนิด นำประจุเข้าใกล้กันแล้วแรงจะพุ่งขึ้นมหาศาล"], set:{q1:10,q2:10,r:0.5}},
    {say:["Halve the separation and read both numbers. The force goes up four times, not twice.",
          "ลดระยะห่างครึ่งหนึ่งแล้วอ่านตัวเลขทั้งสอง แรงเพิ่มสี่เท่า ไม่ใช่สองเท่า"], set:{q1:10,q2:10,r:0.25}},
    {say:["Doubling a charge only doubles the force. Distance is the squared variable, charge is not.",
          "การเพิ่มประจุสองเท่าทำให้แรงเพิ่มสองเท่าเท่านั้น ระยะทางคือตัวแปรที่ยกกำลังสอง ประจุไม่ใช่"], set:{q1:20,q2:10,r:0.25}}
  ]},

{ id:"field", x:100, y:150, requires:["coulomb"], methods:["M-02"],
  title:["Electric field","สนามไฟฟ้า"],
  body:[["A field is force per unit charge, E = F/q, so a charge placed in a field feels F = qE. Around a point charge E = kq/r², and field lines run outwards from positive and inwards to negative.",
         "The field exists whether or not a test charge is there to feel it. That shift — from action at a distance to a property of space — is what makes the field concept worth having."],
        ["สนามคือแรงต่อหนึ่งหน่วยประจุ E = F/q ดังนั้นประจุที่วางในสนามจะรู้สึกแรง F = qE รอบประจุจุด E = kq/r² และเส้นสนามพุ่งออกจากประจุบวกและพุ่งเข้าหาประจุลบ",
         "สนามมีอยู่ไม่ว่าจะมีประจุทดสอบไปรู้สึกหรือไม่ การเปลี่ยนมุมมองนี้ จากแรงกระทำระยะไกลไปสู่สมบัติของปริภูมิ คือเหตุผลที่แนวคิดสนามมีค่าควรแก่การมี"]],
  formula:["E = F/q = kq/r²        F = qE","E = F/q = kq/r²        F = qE"],
  flabel:["A property of space itself","สมบัติของปริภูมิเอง"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["Charged Wisps","ภูตประจุ"],
    question:["Drag the wisps and the little test charge. The field lines are drawn by the space itself — what does the test charge feel, and why?",
              "ลากภูตประจุและประจุทดสอบ เส้นสนามถูกวาดโดยที่ว่างเอง ประจุทดสอบรู้สึกอะไร และเพราะอะไร"],
    ctrls:[
      {k:"Q1", lab:["Wisp 1 charge","ประจุภูต 1"], min:-50, max:50, step:5, def:20, unit:" nC"},
      {k:"Q2", lab:["Wisp 2 charge","ประจุภูต 2"], min:-50, max:50, step:5, def:0, unit:" nC"},
      {k:"q",  lab:["Test charge q","ประจุทดสอบ q"], min:-10, max:10, step:1, def:2, unit:" nC"},
      {k:"T",  lab:["Walk out for","เดินออกนาน"], min:2, max:6, step:1, def:3, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Field at the test charge","สนามที่ประจุทดสอบ"], f:function(S){ return fmt(C13.Eat(S.p,C13.test(S.p,S.t)).m)+" N/C"; }},
      {lab:["Force on it, F = qE","แรงบนมัน F = qE"], f:function(S){ return fmt2(Math.abs(S.p.q)*1e-9*C13.Eat(S.p,C13.test(S.p,S.t)).m*1e6)+" μN"; }},
      {lab:["Distance from wisp 1","ระยะจากภูต 1"], f:function(S){ return fmt2(C13.r1(S.p,C13.test(S.p,S.t)))+" m"; }},
      {lab:["Does E depend on q?","E ขึ้นกับ q ไหม"], f:function(){ return L()?"ไม่ — E เป็นสมบัติของที่ว่าง":"no — E belongs to the space"; }}
    ],
    world:{ kind:"free" },
    scene:function(o,S,W){
      var p=S.p, P=C13.pos(p), lines=C13.lines(p), hl=S.hl==="E";
      o.push('<rect x="'+C13.x0+'" y="'+C13.y0+'" width="'+C13.w+'" height="'+C13.h+'" rx="10" fill="var(--surface)" fill-opacity=".25" stroke="var(--rule)"/>');
      lines.forEach(function(L1){
        var d=L1.map(function(q,i){ return (i?"L":"M")+fmt2(q[0])+" "+fmt2(q[1]); }).join(" ");
        o.push('<path d="'+d+'" fill="none" stroke="var(--accent)" stroke-width="'+(hl?1.8:1.1)+'" opacity=".55"/>');
        var m=L1[Math.floor(L1.length/2)], n=L1[Math.min(L1.length-1,Math.floor(L1.length/2)+1)];
        if(m && n){ var a=Math.atan2(n[1]-m[1], n[0]-m[0]);
          o.push('<path d="M'+fmt2(m[0]+5*Math.cos(a))+' '+fmt2(m[1]+5*Math.sin(a))+' L'+fmt2(m[0]-4*Math.cos(a-0.6))+' '+fmt2(m[1]-4*Math.sin(a-0.6))+' L'+fmt2(m[0]-4*Math.cos(a+0.6))+' '+fmt2(m[1]-4*Math.sin(a+0.6))+'Z" fill="var(--accent)" opacity=".7"/>'); }
      });
      /* r from wisp 1 to the test charge */
      var tp=C13.test(p,S.t);
      o.push('<line x1="'+P.x1+'" y1="'+P.y1+'" x2="'+fmt2(tp[0])+'" y2="'+fmt2(tp[1])+'" stroke="var(--good)" stroke-width="'+(S.hl==="r"?2.4:1)+'" stroke-dasharray="3 4"/>');
      if(p.Q1) role("charge")(o, P.x1, P.y1, {q:p.Q1, size:7+Math.abs(p.Q1)/8, clock:STAGE.clock});
      if(p.Q2) role("charge")(o, P.x2, P.y2, {q:p.Q2, size:7+Math.abs(p.Q2)/8, clock:STAGE.clock});
      /* the field there, and the force on whatever sits in it */
      var E=C13.Eat(p,tp), ux=E.x/(E.m||1), uy=E.y/(E.m||1), Lf=Math.min(90, 10+24*Math.log10(1+E.m/20));
      role("vector")(o, tp[0], tp[1], tp[0]+ux*Lf, tp[1]+uy*Lf, {col:"var(--accent)", hl:hl});
      if(p.q){ var s=p.q>0?1:-1, Lq=Lf*Math.min(1.3,0.4+Math.abs(p.q)/12);
        role("vector")(o, tp[0], tp[1], tp[0]+s*ux*Lq, tp[1]+s*uy*Lq, {col:"var(--warn)", hl:S.hl==="F"});
        fitText(o, tp[0]+s*ux*Lq+(s*ux>=0?6:-6), tp[1]+s*uy*Lq+4, ["F","F"], 20, 11, "var(--warn)", s*ux>=0?"start":"end"); }
      fitText(o, tp[0]+ux*Lf+(ux>=0?6:-6), tp[1]+uy*Lf-6, ["E","E"], 20, 11, "var(--accent)", ux>=0?"start":"end");
      role("charge")(o, tp[0], tp[1], {q:p.q||1, size:5.5, clock:STAGE.clock});
    },
    handles:[
      {k:"x1", at:function(p){ var P=C13.pos(p); return {px:P.x1, py:P.y1+24}; }, set:function(px,py){ return C13.place("1",px,py-24); }, hide:function(p){ return !p.Q1; },
       lab:["wisp 1","ภูต 1"], labBelow:true, col:"accent2"},
      {k:"x2", at:function(p){ var P=C13.pos(p); return {px:P.x2, py:P.y2+24}; }, set:function(px,py){ return C13.place("2",px,py-24); }, hide:function(p){ return !p.Q2; },
       lab:["wisp 2","ภูต 2"], labBelow:true, col:"accent2"},
      {k:"xt", at:function(p){ var P=C13.pos(p); return {px:P.xt, py:P.yt}; }, set:function(px,py){ return C13.place("t",px,py); },
       lab:["test charge","ประจุทดสอบ"], col:"good"}
    ],
    instrument:{ kind:"graph",
      xmin:0.4, xmax:5,
      xlab:["distance from wisp 1 (m)","ระยะจากภูต 1 (ม.)"], ylab:["E from wisp 1 (N/C)","E จากภูต 1 (N/C)"],
      fn:function(x,p){ return 9e9*Math.abs(p.Q1)*1e-9/(x*x); },
      mark:function(p,S){ return Math.max(0.4, Math.min(5, C13.r1(p,C13.test(p,S.t)))); }
    },
    spell:{
      tex:function(p,S){ var r=C13.r1(p,C13.test(p,S.t)), E=9e9*Math.abs(p.Q1)*1e-9/(r*r);
        return "E_1 = \\dfrac{kQ_1}{r^2} = \\dfrac{(9\\times10^9)("+Math.abs(p.Q1)+"\\times10^{-9})}{"+fmt2(r)+"^2} = "+fmt(E)+"\\,\\text{N/C}"+
               "\\qquad\\left[\\tfrac{\\text{N}\\cdot\\text{m}^2/\\text{C}^2\\cdot\\text{C}}{\\text{m}^2}=\\tfrac{\\text{N}}{\\text{C}}\\right]"; },
      terms:[
        {k:"E", sym:"E", lab:["the field · lines and arrow","สนาม · เส้นและลูกศร"], col:"accent", f:function(p,S){ return fmt(C13.Eat(p,C13.test(p,S.t)).m)+" N/C"; }},
        {k:"r", sym:"r", lab:["distance from wisp 1","ระยะจากภูต 1"], col:"good", f:function(p,S){ return fmt2(C13.r1(p,C13.test(p,S.t)))+" m"; }},
        {k:"F", sym:"F = qE", lab:["force on the test charge","แรงบนประจุทดสอบ"], col:"warn", f:function(p,S){ return fmt2(Math.abs(p.q)*1e-9*C13.Eat(p,C13.test(p,S.t)).m*1e6)+" μN"; }}
      ]
    },
    predict:{ kind:"choice",
      ask:["Press reveal and the test charge walks out to twice its distance from wisp 1. The field wisp 1 makes there will be…",
           "กดเปิดเผยแล้วประจุทดสอบจะเดินออกไปไกลเป็นสองเท่าจากภูต 1 สนามที่ภูต 1 สร้างตรงนั้นจะเป็น…"],
      opts:[["half as strong","ครึ่งหนึ่ง"],["a quarter as strong","หนึ่งในสี่"],["just as strong","เท่าเดิม"],["twice as strong","สองเท่า"]],
      actual:function(){ return 1; },
      explain:function(p){ return ["E = kQ / r²: doubling r divides the field by 2² = 4. The same lines spread over four times the area.",
                                   "E = kQ / r²: เพิ่ม r เป็นสองเท่า สนามหารด้วย 2² = 4 เส้นสนามจำนวนเดิมกระจายบนพื้นที่สี่เท่า"]; }
    },
    trials:{
      veil:true, play:false,
      make:function(){
        var kind=pick(["field","null","force"]);
        if(kind==="field"){ var Q=pick([10,15,20,25,30,40]), X=pick([60,90,120,150,200,300]);
          return {kind:kind, Q:Q, X:X, r:Math.sqrt(9e9*Q*1e-9/X), set:{Q1:Q, Q2:0, q:2, x1:160, y1:165, xt:470, yt:80, T:3}}; }
        if(kind==="null"){ var a=pick([10,20,30,40]), b=pick([10,20,30,40]);
          return {kind:kind, Q1:a, Q2:b, set:{Q1:a, Q2:b, q:1, x1:150, y1:165, x2:420, y2:165, xt:285, yt:70, T:3}}; }
        var Qf=pick([20,30,40]), qf=pick([-8,-6,-4,3,5,7,9]);
        return {kind:kind, Q:Qf, qv:qf, set:{Q1:Qf, Q2:0, q:1, x1:180, y1:165, xt:330, yt:165, T:3}};
      },
      lockFor:function(g){ return g.kind==="force" ? ["Q1","Q2","x1","x2","xt"] : (g.kind==="null" ? ["Q1","Q2","q","x1","x2"] : ["Q1","Q2","q","x1"]); },
      say:function(g){
        if(g.kind==="field") return ["Wisp 1 holds "+g.Q+" nC. Place the test charge where the field is exactly "+g.X+" N/C.",
                                     "ภูต 1 มีประจุ "+g.Q+" nC วางประจุทดสอบตรงที่สนามมีค่า "+g.X+" N/C พอดี"];
        if(g.kind==="null") return ["Two like wisps, "+g.Q1+" nC and "+g.Q2+" nC. Somewhere between them their fields cancel. Put the test charge on that null point.",
                                    "ภูตประจุชนิดเดียวกันสองดวง "+g.Q1+" nC และ "+g.Q2+" nC ที่ใดสักแห่งระหว่างทั้งสอง สนามหักล้างกันหมด วางประจุทดสอบที่จุดสะเทินนั้น"];
        var E=9e9*g.Q*1e-9/Math.pow(150/C13.k,2);
        return ["The test charge sits where wisp 1's field is "+fmt(E)+" N/C. Give it the charge that makes the force exactly "+fmt2(Math.abs(g.qv)*1e-9*E*1e6)+" μN, pointing "+(g.qv>0?"away from":"toward")+" the wisp.",
                "ประจุทดสอบอยู่ตรงที่สนามของภูต 1 มีค่า "+fmt(E)+" N/C กำหนดประจุให้แรงมีค่า "+fmt2(Math.abs(g.qv)*1e-9*E*1e6)+" μN พอดี โดยชี้"+(g.qv>0?"ออกจาก":"เข้าหา")+"ภูต"];
      },
      check:function(p,S,g){
        var tp=C13.test(p,0), E=C13.Eat(p,tp);
        if(g.kind==="field"){
          if(Math.abs(E.m-g.X)/g.X<0.05) return {ok:true, msg:["Right there: "+fmt(E.m)+" N/C. From E = kQ / r², r = √(kQ / E) = √(9×10⁹ × "+g.Q+"×10⁻⁹ / "+g.X+") = "+fmt2(g.r)+" m.",
                                                                "ตรงนั้นพอดี: "+fmt(E.m)+" N/C จาก E = kQ / r² ได้ r = √(kQ / E) = √(9×10⁹ × "+g.Q+"×10⁻⁹ / "+g.X+") = "+fmt2(g.r)+" ม."]};
          return {ok:false, msg:["Here the field is "+fmt(E.m)+" N/C at "+fmt2(C13.r1(p,tp))+" m. Work out r from E = kQ / r² first.",
                                 "ตรงนี้สนามมีค่า "+fmt(E.m)+" N/C ที่ระยะ "+fmt2(C13.r1(p,tp))+" ม. หา r จาก E = kQ / r² ก่อน"]};
        }
        if(g.kind==="null"){
          var P=C13.pos(p), d1=C13.r1(p,tp), E1=9e9*g.Q1*1e-9/(d1*d1);
          if(E.m<0.04*E1) return {ok:true, msg:["The fields cancel. kQ₁ / r₁² = kQ₂ / r₂² gives r₁ / r₂ = √(Q₁ / Q₂) = √("+g.Q1+" / "+g.Q2+") = "+fmt2(Math.sqrt(g.Q1/g.Q2))+(g.Q1===g.Q2?" — equal wisps, so it sits midway.":" — the null point sits nearer the weaker wisp."),
                                                "สนามหักล้างกันหมด kQ₁ / r₁² = kQ₂ / r₂² ให้ r₁ / r₂ = √(Q₁ / Q₂) = √("+g.Q1+" / "+g.Q2+") = "+fmt2(Math.sqrt(g.Q1/g.Q2))+(g.Q1===g.Q2?" ภูตเท่ากัน จึงอยู่กึ่งกลางพอดี":" จุดสะเทินอยู่ใกล้ภูตที่อ่อนกว่า")]};
          return {ok:false, msg:["The field there is still "+fmt(E.m)+" N/C. The null point is where r₁ / r₂ = √(Q₁ / Q₂), on the line between them.",
                                 "สนามตรงนั้นยังเหลือ "+fmt(E.m)+" N/C จุดสะเทินคือที่ r₁ / r₂ = √(Q₁ / Q₂) บนเส้นระหว่างทั้งสอง"]};
        }
        if(p.q===g.qv) return {ok:true, msg:["F = qE: "+g.qv+" nC × "+fmt(E.m)+" N/C = "+fmt2(Math.abs(g.qv)*1e-9*E.m*1e6)+" μN. A "+(g.qv>0?"positive":"negative")+" test charge is pushed "+(g.qv>0?"along":"against")+" the field.",
                                             "F = qE: "+g.qv+" nC × "+fmt(E.m)+" N/C = "+fmt2(Math.abs(g.qv)*1e-9*E.m*1e6)+" μN ประจุทดสอบ"+(g.qv>0?"บวก":"ลบ")+"ถูกผลัก"+(g.qv>0?"ไปตาม":"สวน")+"ทิศสนาม"]};
        return {ok:false, msg:["The force is "+fmt2(Math.abs(p.q)*1e-9*E.m*1e6)+" μN, pointing "+(p.q>0?"away from":"toward")+" the wisp. The size is |q|E; the sign of q sets the direction.",
                               "แรงมีค่า "+fmt2(Math.abs(p.q)*1e-9*E.m*1e6)+" μN ชี้"+(p.q>0?"ออกจาก":"เข้าหา")+"ภูต ขนาดคือ |q|E เครื่องหมายของ q กำหนดทิศ"]};
      }
    },
    note:["the blue arrow is the field — it is there whether or not anything sits in it; the orange arrow is the force on the test charge",
          "ลูกศรฟ้าคือสนาม มันอยู่ตรงนั้นไม่ว่าจะมีอะไรวางอยู่หรือไม่ ลูกศรส้มคือแรงบนประจุทดสอบ"]
  },
  guide:[
    {say:["One positive wisp. Field lines stream outward; the test charge is pushed along them.",
          "ภูตประจุบวกดวงเดียว เส้นสนามพุ่งออก ประจุทดสอบถูกผลักไปตามเส้น"], set:{Q1:20,Q2:0,q:2,x1:200,y1:165,xt:330,yt:110,T:3}},
    {say:["Flip the test charge negative. The field arrow does not move at all; only the force turns round.",
          "เปลี่ยนประจุทดสอบเป็นลบ ลูกศรสนามไม่ขยับเลย มีเพียงแรงที่กลับทิศ"], set:{Q1:20,Q2:0,q:-4,x1:200,y1:165,xt:330,yt:110,T:3}},
    {say:["Add an opposite wisp. The lines now leave the positive one and end on the negative one.",
          "เพิ่มภูตประจุตรงข้าม เส้นสนามออกจากภูตบวกและไปสิ้นสุดที่ภูตลบ"], set:{Q1:25,Q2:-25,q:2,x1:170,y1:165,x2:400,y2:165,xt:285,yt:90,T:3}}
  ]
},

{ id:"potential", x:370, y:150, requires:["coulomb"], methods:["M-03"],
  title:["Potential and energy","ศักย์และพลังงาน"],
  body:[["Potential is energy per unit charge, V = kq/r, and it is a scalar — potentials from several charges simply add, with no components to resolve. That makes it far easier to work with than field.",
         "The work needed to move a charge between two points is W = qΔV, and it does not depend on the path taken. Between parallel plates the field is uniform and E = ΔV/d."],
        ["ศักย์คือพลังงานต่อหนึ่งหน่วยประจุ V = kq/r และเป็นสเกลาร์ ศักย์จากหลายประจุจึงบวกกันตรงๆ ไม่ต้องแตกองค์ประกอบ ทำให้ใช้งานง่ายกว่าสนามมาก",
         "งานที่ต้องใช้ในการย้ายประจุระหว่างสองจุดคือ W = qΔV และไม่ขึ้นกับเส้นทางที่เลือก ระหว่างแผ่นขนานสนามสม่ำเสมอและ E = ΔV/d"]],
  formula:["V = kq/r        W = qΔV        E = ΔV/d","V = kq/r        W = qΔV        E = ΔV/d"],
  flabel:["A scalar · potentials just add","เป็นสเกลาร์ · ศักย์บวกกันตรงๆ"],
  viz:"plot",
  vizcfg:{
    title:["POTENTIAL FALLS MORE SLOWLY THAN FIELD","ศักย์ลดช้ากว่าสนาม"],
    xlab:["distance r (m)","ระยะ r (m)"], ylab:["V (volts)  or  E (N/C)","V (โวลต์)  หรือ  E (N/C)"],
    xmin:.3, xmax:6, ymin:0, fill:false,
    fn:function(x,p){ return p.show===0 ? 9e9*p.Q*1e-9/x : 9e9*p.Q*1e-9/(x*x); },
    mark:function(p){ return p.r; },
    ctrls:[
      {k:"show", lab:["",""], opts:[["potential V","ศักย์ V"], ["field E","สนาม E"]], min:0, def:0, unit:""},
      {k:"Q",    lab:["Charge","ประจุ"], min:1, max:50, step:1, def:10, unit:" nC"},
      {k:"r",    lab:["Distance","ระยะ"], min:.4, max:5.8, step:.1, def:1, unit:" m"}
    ],
    readouts:[
      {lab:["Potential V","ศักย์ V"], f:function(S){ return fmt2(9e9*S.p.Q*1e-9/S.p.r)+" V"; }},
      {lab:["Field E","สนาม E"], f:function(S){ return fmt2(9e9*S.p.Q*1e-9/(S.p.r*S.p.r))+" N/C"; }},
      {lab:["Which is a scalar?","อันไหนเป็นสเกลาร์"], f:function(){
        return L()?"ศักย์ V — บวกกันตรงๆ ไม่ต้องใช้เวกเตอร์":"V — you add potentials as plain numbers"; }},
      {lab:["Relationship","ความสัมพันธ์"], f:function(){
        return L()?"E = −dV/dr · สนามคือความชันของศักย์":"E = −dV/dr · the field is the slope of the potential"; }}
    ],
    note:["V goes as 1/r and E as 1/r² — switching between them shows how much steeper E is","V เป็น 1/r ส่วน E เป็น 1/r² สลับดูจะเห็นว่า E ชันกว่ามาก"]
  } },

{ id:"conductors", x:235, y:248, requires:["field","potential"], methods:["M-04"],
  title:["Charged conductors","ตัวนำที่มีประจุ"],
  body:[["Charge on a conductor moves until it can move no further, which means it all ends up on the outer surface and the field inside falls to exactly zero. The interior of any closed conductor is shielded — the principle behind a Faraday cage and behind why a car is a safe place in a lightning storm.",
         "Because E = 0 inside, the potential is constant throughout the conductor, equal to its surface value kQ/R. Outside, it behaves exactly as if all the charge were concentrated at the centre."],
        ["ประจุบนตัวนำจะเคลื่อนที่จนไปต่อไม่ได้ ซึ่งหมายความว่ามันไปรวมอยู่ที่ผิวนอกทั้งหมด และสนามภายในลดลงเป็นศูนย์พอดี ภายในตัวนำปิดใดๆ จึงถูกกำบัง เป็นหลักการเบื้องหลังกรงฟาราเดย์และเหตุผลที่รถยนต์เป็นที่ปลอดภัยขณะฟ้าผ่า",
         "เพราะ E = 0 ภายใน ศักย์จึงคงที่ทั่วทั้งตัวนำ เท่ากับค่าที่ผิว kQ/R ส่วนภายนอก มันประพฤติตัวราวกับประจุทั้งหมดรวมอยู่ที่จุดศูนย์กลาง"]],
  formula:["Inside: E = 0, V = kQ/R        Outside: as if a point charge","ภายใน: E = 0, V = kQ/R        ภายนอก: เสมือนประจุจุด"],
  flabel:["Charge sits on the outside","ประจุอยู่ที่ผิวนอก"],
  viz:"table",
  vizcfg:{
    title:["A CHARGED CONDUCTOR IN EQUILIBRIUM","ตัวนำที่มีประจุในภาวะสมดุล"],
    cols:[["Where","ที่ใด"],["Field E","สนาม E"],["Charge","ประจุ"],["Potential V","ศักย์ V"]],
    rowKey:"i",
    readouts:[
      {lab:["Region","บริเวณ"], f:function(S){
        return [["Deep inside","ลึกเข้าไปข้างใน"],["At the surface","ที่ผิว"],["Outside","ภายนอก"]][S.p.i][L()]; }},
      {lab:["Why the inside is empty","ทำไมข้างในจึงว่าง"], f:function(){
        return L()?"ประจุอิสระผลักกันจนไปอยู่ที่ผิว":"free charges repel until they reach the surface"; }},
      {lab:["Practical name","ชื่อที่ใช้จริง"], f:function(){
        return L()?"กรงฟาราเดย์":"a Faraday cage"; }}
    ],
    rows:function(p){
      var R=[[["Deep inside","ลึกข้างใน"],["exactly zero","ศูนย์พอดี"],["none","ไม่มี"],["constant","คงที่"]],
             [["At the surface","ที่ผิว"],["perpendicular to it","ตั้งฉากกับผิว"],["all of it sits here","อยู่ที่นี่ทั้งหมด"],["same as inside","เท่ากับข้างใน"]],
             [["Outside","ภายนอก"],["falls with distance","ลดลงตามระยะ"],["none","ไม่มี"],["falls with distance","ลดลงตามระยะ"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===0?"ink":"accent"}; }); });
    },
    note:["the whole conductor is one equipotential — that is why a car protects you in a storm","ตัวนำทั้งก้อนเป็นผิวสมศักย์เดียว จึงเป็นเหตุผลที่รถยนต์ป้องกันคุณได้ตอนฟ้าผ่า"]
  } },

{ id:"capacitance", x:235, y:346, requires:["conductors"], methods:["M-05","M-06"],
  title:["Capacitance","ความจุไฟฟ้า"],
  body:[["A capacitor stores charge in proportion to the voltage across it: C = Q/V. The energy it holds is U = ½CV², and the half matters — it appears because the voltage rises as the charge accumulates.",
         "Capacitors combine the opposite way to resistors. In parallel they add, C = ΣC; in series their reciprocals add. Applying the resistor rules is trap T-04."],
        ["ตัวเก็บประจุเก็บประจุเป็นสัดส่วนกับความต่างศักย์คร่อมมัน C = Q/V พลังงานที่เก็บได้คือ U = ½CV² และเลขครึ่งนั้นสำคัญ มันปรากฏเพราะความต่างศักย์เพิ่มขึ้นขณะประจุสะสม",
         "ตัวเก็บประจุต่อกันตรงข้ามกับตัวต้านทาน ต่อขนานให้บวกกัน C = ΣC ต่ออนุกรมให้บวกส่วนกลับ การใช้กฎของตัวต้านทานคือกับดัก T-04"]],
  formula:["C = Q/V        U = ½CV²        parallel: C = ΣC","C = Q/V        U = ½CV²        ขนาน: C = ΣC"],
  flabel:["Opposite of the resistor rules","ตรงข้ามกับกฎตัวต้านทาน"],
  viz:"plot",
  vizcfg:{
    title:["CHARGE STORED AGAINST VOLTAGE","ประจุที่เก็บได้ เทียบ ความต่างศักย์"],
    xlab:["voltage (V)","ความต่างศักย์ (V)"], ylab:["charge stored (µC)","ประจุที่เก็บ (µC)"],
    xmin:0, xmax:24, ymin:0, fill:true,
    fn:function(x,p){ return p.C*x; },
    mark:function(p){ return p.V; },
    ctrls:[
      {k:"C", lab:["Capacitance","ความจุ"], min:1, max:20, step:1, def:5, unit:" µF"},
      {k:"V", lab:["Applied voltage","ความต่างศักย์ที่ให้"], min:1, max:23, step:1, def:12, unit:" V"}
    ],
    readouts:[
      {lab:["Charge stored","ประจุที่เก็บ"], f:function(S){ return fmt2(S.p.C*S.p.V)+" µC"; }},
      {lab:["Energy stored ½CV²","พลังงานที่เก็บ ½CV²"], f:function(S){
        return fmt2(0.5*S.p.C*S.p.V*S.p.V/1000)+" mJ"; }},
      {lab:["Slope of the line","ความชันของเส้น"], f:function(S){
        return fmt2(S.p.C)+(L()?" µF · คือความจุเอง":" µF · which IS the capacitance"); }},
      {lab:["Double the voltage?","ความต่างศักย์สองเท่า?"], f:function(){
        return L()?"ประจุสองเท่า แต่พลังงานสี่เท่า":"twice the charge, but four times the energy"; }}
    ],
    note:["the shaded triangle under the line is the stored energy — hence the ½","สามเหลี่ยมแรเงาใต้เส้นคือพลังงานที่เก็บไว้ จึงมีเลข ½"]
  } }
],

methods:[
{id:"M-01", name:["Apply Coulomb's law","ใช้กฎของคูลอมบ์"]},
{id:"M-02", name:["Find electric field strength","หาความเข้มสนามไฟฟ้า"]},
{id:"M-03", name:["Find potential and work done","หาศักย์และงาน"]},
{id:"M-04", name:["Field and potential of a conductor","สนามและศักย์ของตัวนำ"]},
{id:"M-05", name:["Capacitance and stored energy","ความจุและพลังงานสะสม"]},
{id:"M-06", name:["Combine capacitors","รวมตัวเก็บประจุ"]}
],

traps:{
"T-01":["Inverse square. Halving the separation multiplies the force by four, not two.","กำลังสองผกผัน การลดระยะครึ่งหนึ่งทำให้แรงเพิ่มสี่เท่า ไม่ใช่สองเท่า"],
"T-02":["Field goes as 1/r² but potential as 1/r. They are not the same falloff.","สนามแปรตาม 1/r² แต่ศักย์แปรตาม 1/r ลดลงไม่เหมือนกัน"],
"T-03":["Inside a conductor the field is zero, but the potential is not — it equals the surface value.","ภายในตัวนำสนามเป็นศูนย์ แต่ศักย์ไม่เป็นศูนย์ มันเท่ากับค่าที่ผิว"],
"T-04":["Capacitors combine opposite to resistors: parallel adds, series adds reciprocals.","ตัวเก็บประจุรวมกันตรงข้ามกับตัวต้านทาน ขนานบวกตรงๆ อนุกรมบวกส่วนกลับ"]
},

gen:{
"M-01": function(sf){
  var q1=pick([2,4,5,10]), q2=pick([3,6,8]), r=pick([0.1,0.2,0.5]);
  var F=9e9*q1*1e-6*q2*1e-6/(r*r);
  if(sf==="S-04") return {stem:["The distance between two charges is halved. The force between them becomes:",
                                "ระยะระหว่างประจุสองประจุลดลงครึ่งหนึ่ง แรงระหว่างกันกลายเป็น"],
    opts:[{v:["Four times as large","สี่เท่า"],ok:1},{v:["Twice as large","สองเท่า"],trap:"T-01"},
          {v:["Half as large","ครึ่งหนึ่ง"],trap:"T-01"},{v:["Unchanged","เท่าเดิม"]}],unit:""};
  if(sf==="S-05") return {stem:["Two charges of "+q1+" μC and "+q2+" μC repel with "+fmt(F)+" N. Find their separation.",
                                "ประจุ "+q1+" ไมโครคูลอมบ์ และ "+q2+" ไมโครคูลอมบ์ ผลักกันด้วยแรง "+fmt(F)+" นิวตัน จงหาระยะห่าง"],
    opts:[{v:String(r),ok:1},{v:fmt(r*2),trap:"T-01"},{v:fmt(r/2)},{v:fmt(r*r)}],unit:" m"};
  return {stem:["Find the force between "+q1+" μC and "+q2+" μC placed "+r+" m apart.",
                "จงหาแรงระหว่างประจุ "+q1+" และ "+q2+" ไมโครคูลอมบ์ ที่วางห่างกัน "+r+" เมตร"],
    opts:[{v:fmt(F),ok:1},{v:fmt(F*r),trap:"T-01"},{v:fmt(F/2)},{v:fmt(F*4)}],unit:" N"};
},
"M-02": function(sf){
  var q=pick([2,5,8]), r=pick([0.1,0.3,0.5]), Q=pick([1,2,4]);
  var E=9e9*q*1e-6/(r*r);
  if(sf==="S-04") return {stem:["What is the direction of the electric field around a negative charge?",
                                "สนามไฟฟ้ารอบประจุลบมีทิศทางอย่างไร"],
    opts:[{v:["Radially inwards, towards the charge","พุ่งเข้าหาประจุตามแนวรัศมี"],ok:1},
          {v:["Radially outwards","พุ่งออกตามแนวรัศมี"]},
          {v:["Circular around the charge","วนเป็นวงกลมรอบประจุ"]},
          {v:["There is no field","ไม่มีสนาม"]}],unit:""};
  if(sf==="S-03") return {stem:["A charge of "+Q+" μC sits where the field is "+fmt(E)+" N/C. Find the force on it.",
                                "ประจุ "+Q+" ไมโครคูลอมบ์ อยู่ในสนาม "+fmt(E)+" นิวตัน/คูลอมบ์ จงหาแรงที่กระทำ"],
    opts:[{v:fmt(Q*1e-6*E),ok:1},{v:fmt(E/(Q*1e-6))},{v:fmt(E),trap:"T-02"},{v:fmt(Q*E)}],unit:" N"};
  return {stem:["Find the electric field "+r+" m from a point charge of "+q+" μC.",
                "จงหาสนามไฟฟ้าที่ระยะ "+r+" เมตร จากประจุจุด "+q+" ไมโครคูลอมบ์"],
    opts:[{v:fmt(E),ok:1},{v:fmt(E*r),trap:"T-02"},{v:fmt(E/r)},{v:fmt(E*2)}],unit:" N/C"};
},
"M-03": function(sf){
  var q=pick([2,5,10]), r=pick([0.2,0.5,1]), Q=pick([1,3]), dV=pick([50,100,200]);
  var V=9e9*q*1e-6/r;
  if(sf==="S-04") return {stem:["How do field and potential fall off with distance from a point charge?",
                                "สนามและศักย์ลดลงตามระยะห่างจากประจุจุดอย่างไร"],
    opts:[{v:["E as 1/r², V as 1/r","E แปรตาม 1/r² ส่วน V แปรตาม 1/r"],ok:1},
          {v:["Both as 1/r²","แปรตาม 1/r² ทั้งคู่"],trap:"T-02"},
          {v:["Both as 1/r","แปรตาม 1/r ทั้งคู่"],trap:"T-02"},
          {v:["E as 1/r, V as 1/r²","E แปรตาม 1/r ส่วน V แปรตาม 1/r²"],trap:"T-02"}],unit:""};
  if(sf==="S-03") return {stem:["How much work is needed to move "+Q+" μC through a potential difference of "+dV+" V?",
                                "ต้องใช้งานเท่าใดในการย้ายประจุ "+Q+" ไมโครคูลอมบ์ ผ่านความต่างศักย์ "+dV+" โวลต์"],
    opts:[{v:(Q*1e-6*dV).toExponential(2),ok:1},{v:(dV/(Q*1e-6)).toExponential(2)},
          {v:String(dV),trap:"T-02"},{v:(Q*dV).toExponential(2)}],unit:" J"};
  return {stem:["Find the potential "+r+" m from a point charge of "+q+" μC.",
                "จงหาศักย์ที่ระยะ "+r+" เมตร จากประจุจุด "+q+" ไมโครคูลอมบ์"],
    opts:[{v:fmt(V),ok:1},{v:fmt(V/r),trap:"T-02"},{v:fmt(V*r)},{v:fmt(V/2)}],unit:" V"};
},
"M-04": function(sf){
  var Q=pick([2,5,10]), R=pick([0.1,0.2,0.5]);
  var Vs=9e9*Q*1e-6/R;
  if(sf==="S-04") return {stem:["What is the electric field at the centre of a charged hollow conducting sphere?",
                                "สนามไฟฟ้าที่จุดศูนย์กลางของทรงกลมกลวงตัวนำที่มีประจุเป็นเท่าใด"],
    opts:[{v:["Zero","ศูนย์"],ok:1},{v:["kQ/R²","kQ/R²"],trap:"T-03"},
          {v:["kQ/R","kQ/R"],trap:"T-03"},{v:["Infinite","อนันต์"]}],unit:""};
  if(sf==="S-03") return {stem:["Why is the inside of a car relatively safe during a lightning strike?",
                                "ทำไมภายในรถยนต์จึงค่อนข้างปลอดภัยขณะฟ้าผ่า"],
    opts:[{v:["The metal shell keeps the field inside at zero","เปลือกโลหะทำให้สนามภายในเป็นศูนย์"],ok:1},
          {v:["The rubber tyres insulate it","ยางรถเป็นฉนวน"]},
          {v:["The car has no charge","รถไม่มีประจุ"]},
          {v:["The potential inside is zero","ศักย์ภายในเป็นศูนย์"],trap:"T-03"}],unit:""};
  return {stem:["A conducting sphere of radius "+R+" m carries "+Q+" μC. Find the potential at its centre.",
                "ทรงกลมตัวนำรัศมี "+R+" เมตร มีประจุ "+Q+" ไมโครคูลอมบ์ จงหาศักย์ที่จุดศูนย์กลาง"],
    opts:[{v:fmt(Vs),ok:1},{v:"0",trap:"T-03"},{v:fmt(Vs/R),trap:"T-03"},{v:fmt(Vs*2)}],unit:" V"};
},
"M-05": function(sf){
  var C=pick([10,22,47,100]), V=pick([5,9,12,24]);
  var Q=C*1e-6*V, U=0.5*C*1e-6*V*V;
  if(sf==="S-05") return {stem:["A capacitor holds "+Q.toExponential(2)+" C at "+V+" V. Find its capacitance.",
                                "ตัวเก็บประจุเก็บประจุ "+Q.toExponential(2)+" คูลอมบ์ ที่ "+V+" โวลต์ จงหาความจุ"],
    opts:[{v:String(C),ok:1},{v:fmt(Q*V*1e6)},{v:fmt(V/(Q*1e6))},{v:String(C*2)}],unit:" μF"};
  if(sf==="S-04") return {stem:["The voltage across a capacitor is doubled. Its stored energy becomes:",
                                "ความต่างศักย์คร่อมตัวเก็บประจุเพิ่มเป็นสองเท่า พลังงานที่เก็บกลายเป็น"],
    opts:[{v:["Four times as large","สี่เท่า"],ok:1},{v:["Twice as large","สองเท่า"],trap:"T-01"},
          {v:["Unchanged","เท่าเดิม"]},{v:["Half as large","ครึ่งหนึ่ง"]}],unit:""};
  return {stem:["Find the energy stored in a "+C+" μF capacitor charged to "+V+" V.",
                "จงหาพลังงานที่เก็บในตัวเก็บประจุ "+C+" ไมโครฟารัด ที่ประจุถึง "+V+" โวลต์"],
    opts:[{v:U.toExponential(2),ok:1},{v:(2*U).toExponential(2),trap:"T-01"},
          {v:Q.toExponential(2)},{v:(U/2).toExponential(2)}],unit:" J"};
},
"M-06": function(sf){
  var a=pick([2,4,6]), b=pick([3,6,12]);
  var par=a+b, ser=a*b/(a+b);
  if(sf==="S-04") return {stem:["Two capacitors are connected in series. How does the total compare with each one?",
                                "ตัวเก็บประจุสองตัวต่ออนุกรม ความจุรวมเทียบกับแต่ละตัวเป็นอย่างไร"],
    opts:[{v:["Smaller than either of them","น้อยกว่าทั้งสองตัว"],ok:1},
          {v:["The sum of the two","เท่ากับผลรวมของทั้งสอง"],trap:"T-04"},
          {v:["Larger than either","มากกว่าทั้งสองตัว"],trap:"T-04"},
          {v:["The average of the two","เท่ากับค่าเฉลี่ย"]}],unit:""};
  if(sf==="S-05") return {stem:[a+" μF and "+b+" μF give a combined "+fmt(par)+" μF. How are they connected?",
                                a+" และ "+b+" ไมโครฟารัด รวมกันได้ "+fmt(par)+" ไมโครฟารัด ต่อกันแบบใด"],
    opts:[{v:["In parallel","ขนาน"],ok:1},{v:["In series","อนุกรม"],trap:"T-04"},
          {v:["Series then parallel","อนุกรมแล้วขนาน"]},{v:["Cannot be determined","บอกไม่ได้"]}],unit:""};
  return {stem:["Find the total capacitance of "+a+" μF and "+b+" μF in series.",
                "จงหาความจุรวมของ "+a+" และ "+b+" ไมโครฟารัด ที่ต่ออนุกรม"],
    opts:[{v:fmt(ser),ok:1},{v:String(par),trap:"T-04"},{v:fmt(a*b)},{v:fmt(par/2)}],unit:" μF"};
}
}
};
