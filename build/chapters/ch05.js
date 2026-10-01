/* Chapter 05 coaster: the track's shape and the cart's run along it, found
   by stepping energy (and, on a sticky track, heat) forward in time. One run
   per setting is computed and kept, so drawing a frame is a lookup. */
var C05 = {
  KX: [0, 14, 30, 46, 60], mu: 0.04, dt: 0.004, cache: {},
  knots: function(p){ return [p.h0, 0, p.h2, 0, 0]; },
  y: function(p, x){
    var K = C05.KX, H = C05.knots(p);
    x = Math.max(0, Math.min(60, x));
    for(var i = 0; i < K.length - 1; i++) if(x <= K[i + 1]){
      var f = (x - K[i]) / (K[i + 1] - K[i]);
      return H[i] + (H[i + 1] - H[i]) * (1 - Math.cos(Math.PI * f)) / 2;
    }
    return 0;
  },
  dy: function(p, x){
    var K = C05.KX, H = C05.knots(p);
    x = Math.max(0, Math.min(60, x));
    for(var i = 0; i < K.length - 1; i++) if(x <= K[i + 1]){
      var w = K[i + 1] - K[i], f = (x - K[i]) / w;
      return (H[i + 1] - H[i]) * Math.PI / 2 * Math.sin(Math.PI * f) / w;
    }
    return 0;
  },
  sim: function(p){
    var key = p.h0 + "|" + p.h2 + "|" + p.fr;
    if(C05.cache[key]) return C05.cache[key];
    var g = 10, mu = p.fr ? C05.mu : 0, x = 0.3, dir = 1, s = 0, t = 0, dt = C05.dt;
    var out = [], crest = false, exited = false, next = 0;
    while(t < 17){
      var E = g * (p.h0 - C05.y(p, x)) - mu * g * s, v = Math.sqrt(2 * Math.max(E, 0));
      if(t >= next){ out.push({ x: x, v: v, y: C05.y(p, x), heat: mu * g * s }); next += 0.02; }
      var sl = C05.dy(p, x);
      if(v < 0.06){
        if(mu && Math.abs(sl) < 0.03){ break; }        /* settled in the valley */
        if(sl * dir > 0) dir = -dir;                    /* climbing with nothing left: turn back */
      }
      var ds = Math.max(v, 0.06) * dt, nx = x + dir * ds / Math.sqrt(1 + sl * sl);
      if(g * (p.h0 - C05.y(p, nx)) - mu * g * (s + ds) < 0 && sl * dir > 0){ dir = -dir; t += dt; continue; }
      x = nx; s += ds; t += dt;
      if(x > C05.KX[2]) crest = true;
      if(x >= 59){ exited = true; out.push({ x: 59, v: v, y: 0, heat: mu * g * s, out: true }); break; }
      if(x < 0){ x = 0; dir = 1; }
    }
    var r = { pts: out, crest: crest, out: exited };
    C05.cache[key] = r;
    return r;
  },
  at: function(p, t){
    var r = C05.sim(p), i = Math.min(r.pts.length - 1, Math.max(0, Math.floor(t / 0.02)));
    return r.pts[i];
  }
};

var CHAPTER = {
id:"ch05", num:"05", slug:"work-and-energy", subject:"physics",
kicker:["Physics · Chapter 05","ฟิสิกส์ · บทที่ 5"],
title:["Work and Energy","งานและพลังงาน"],
mapTitle:["The shortcut around time","ทางลัดที่ข้ามเวลา"],
lede:["Newton's laws work, but they make you track every instant. Energy asks only where you started and where you finished. Whole problems that would take three equations collapse into one line.",
      "กฎของนิวตันใช้ได้ แต่บังคับให้ตามทุกช่วงเวลา พลังงานถามเพียงว่าเริ่มที่ไหนและจบที่ไหน โจทย์ทั้งข้อที่ต้องใช้สามสมการจึงยุบเหลือบรรทัดเดียว"],
next:["→ continues in Chapter 06 · Momentum","→ ต่อในบทที่ 6 · โมเมนตัมและการชน"],

nodes:[
{ id:"work", x:235, y:52, requires:[], methods:["M-01"],
  title:["Work","งาน"],
  body:[["Work is force times displacement in the direction of the force: W = Fs cos θ. A force perpendicular to the motion does no work at all — which is why carrying a suitcase along a level corridor is, physically, free.",
         "Sign matters. A force helping the motion does positive work; friction, always opposing, does negative work. Reporting friction's work as positive is trap T-01."],
        ["งานคือแรงคูณการกระจัดในทิศของแรง W = Fs cos θ แรงที่ตั้งฉากกับการเคลื่อนที่ไม่ทำงานเลย จึงเป็นเหตุผลว่าทำไมการหิ้วกระเป๋าเดินตามทางเดินราบจึงไม่มีงานในทางฟิสิกส์",
         "เครื่องหมายสำคัญ แรงที่ช่วยการเคลื่อนที่ทำงานเป็นบวก ส่วนแรงเสียดทานซึ่งต้านเสมอทำงานเป็นลบ การรายงานงานของแรงเสียดทานเป็นบวกคือกับดัก T-01"]],
  formula:["W = F s cos θ","W = F s cos θ"],
  flabel:["θ = 90° gives zero work","θ = 90° ได้งานเป็นศูนย์"],
  viz:"plot",
  vizcfg:{
    title:["WORK IS THE AREA UNDER FORCE vs DISPLACEMENT","งานคือพื้นที่ใต้กราฟแรง เทียบ การกระจัด"],
    xlab:["displacement (m)","การกระจัด (m)"], ylab:["force (N)","แรง (N)"],
    xmin:0, xmax:6, ymin:0, fill:true,
    fn:function(x,p){ return p.kind===0 ? p.F : p.k*x; },
    mark:function(p){ return p.s; },
    ctrls:[
      {k:"kind", lab:["",""], opts:[["constant force","แรงคงที่"], ["spring","สปริง"]], min:0, def:0, unit:""},
      {k:"F",    lab:["Constant force","แรงคงที่"],      min:2, max:40, step:1, def:12, unit:" N"},
      {k:"k",    lab:["Spring constant k","ค่านิจสปริง k"], min:1, max:12, step:.5, def:5, unit:" N/m"},
      {k:"s",    lab:["Displacement so far","การกระจัดถึงตอนนี้"], min:.2, max:6, step:.2, def:4, unit:" m"}
    ],
    readouts:[
      {lab:["Force at that point","แรง ณ จุดนั้น"], f:function(S){
        return fmt(S.p.kind===0 ? S.p.F : S.p.k*S.p.s)+" N"; }},
      {lab:["Work done","งานที่ทำ"], f:function(S){
        var p=S.p; return fmt2(p.kind===0 ? p.F*p.s : 0.5*p.k*p.s*p.s)+" J"; }},
      {lab:["Shape of the area","รูปร่างของพื้นที่"], f:function(S){
        return S.p.kind===0 ? (L()?"สี่เหลี่ยม · W = Fs":"rectangle · W = Fs")
                            : (L()?"สามเหลี่ยม · W = ½kx²":"triangle · W = ½kx²"); }},
      {lab:["Double the distance?","ระยะทางสองเท่า?"], f:function(S){
        return S.p.kind===0 ? (L()?"งานเป็นสองเท่า":"work doubles")
                            : (L()?"งานเป็นสี่เท่า":"work quadruples"); }}
    ],
    note:["a constant force gives a rectangle; a spring gives a triangle, hence the ½","แรงคงที่ให้สี่เหลี่ยม สปริงให้สามเหลี่ยม จึงมีเลข ½"]
  },
  guide:[
    {say:["A constant force. The shaded area is a rectangle, so the work is simply force times distance.",
          "แรงคงที่ พื้นที่แรเงาเป็นสี่เหลี่ยม งานจึงเท่ากับแรงคูณระยะทางเฉยๆ"], set:{kind:0,F:12,k:5,s:4}},
    {say:["Switch to a spring. The force grows as you stretch, so the area becomes a triangle instead.",
          "สลับเป็นสปริง แรงเพิ่มขึ้นตามการยืด พื้นที่จึงกลายเป็นสามเหลี่ยม"], set:{kind:1,F:12,k:5,s:4}},
    {say:["That triangle is where the ½ in ½kx² comes from. It is not a fudge factor — it is half a rectangle.",
          "สามเหลี่ยมนั้นคือที่มาของเลข ½ ใน ½kx² มันไม่ใช่ตัวเลขที่ใส่มามั่ว แต่คือครึ่งหนึ่งของสี่เหลี่ยม"], set:{kind:1,F:12,k:8,s:5.4}}
  ] },

{ id:"kinetic", x:100, y:150, requires:["work"], methods:["M-02"],
  title:["Kinetic energy","พลังงานจลน์"],
  body:[["Kinetic energy is ½mv², and the net work done on a body equals its change in kinetic energy. That single statement replaces a whole chapter of kinematics.",
         "Note the square. Doubling the speed quadruples the energy — and quadruples the braking distance, which is the entire argument behind speed limits."],
        ["พลังงานจลน์คือ ½mv² และงานสุทธิที่ทำต่อวัตถุเท่ากับการเปลี่ยนแปลงพลังงานจลน์ ประโยคเดียวนี้แทนเนื้อหาจลนศาสตร์ทั้งบท",
         "สังเกตกำลังสอง เพิ่มอัตราเร็วสองเท่าพลังงานเพิ่มสี่เท่า และระยะเบรกก็เพิ่มสี่เท่า ซึ่งเป็นเหตุผลทั้งหมดเบื้องหลังการจำกัดความเร็ว"]],
  formula:["E_k = ½mv²        W_net = ΔE_k","E_k = ½mv²        W_net = ΔE_k"],
  flabel:["Work–energy theorem","ทฤษฎีบทงาน–พลังงาน"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){ return 0.5*p.m*x*x; },
    xmin:0, xmax:20, fill:true,
    title:["KINETIC ENERGY vs SPEED","พลังงานจลน์ เทียบ อัตราเร็ว"],
    xlab:["v (m/s)","v (ม./วิ)"], ylab:["E (J)","E (J)"],
    mark:function(p){ return p.v; },
    ctrls:[
      {k:"m", lab:["Mass m","มวล m"],  min:1, max:10, step:1, def:2,  unit:" kg"},
      {k:"v", lab:["Speed v","อัตราเร็ว v"], min:0, max:20, step:1, def:10, unit:" m/s"}
    ],
    readouts:[
      {lab:["Kinetic energy","พลังงานจลน์"], f:function(S){ return fmt(0.5*S.p.m*S.p.v*S.p.v)+" J"; }},
      {lab:["Double the speed","ถ้าเร็วสองเท่า"], f:function(S){ return fmt(0.5*S.p.m*4*S.p.v*S.p.v)+" J"; }}
    ]
  },
  guide:[
    {say:["The curve is a parabola, not a straight line. Energy grows with the square of speed.",
          "เส้นกราฟเป็นพาราโบลา ไม่ใช่เส้นตรง พลังงานโตตามกำลังสองของอัตราเร็ว"], set:{m:2,v:5}},
    {say:["Double the speed from 5 to 10 and read the two energies. It is four times, not twice.",
          "เพิ่มอัตราเร็วจาก 5 เป็น 10 แล้วอ่านค่าพลังงานทั้งสอง จะได้สี่เท่า ไม่ใช่สองเท่า"], set:{m:2,v:10}},
    {say:["Mass only scales the curve. Speed reshapes it — that is why speed is the dangerous variable.",
          "มวลเพียงขยายกราฟตามสัดส่วน แต่อัตราเร็วเปลี่ยนรูปกราฟ นี่คือเหตุผลที่อัตราเร็วคือตัวแปรอันตราย"], set:{m:6,v:10}}
  ]},

{ id:"potential", x:370, y:150, requires:["work"], methods:["M-03"],
  title:["Potential energy","พลังงานศักย์"],
  body:[["Gravitational potential energy is mgh, measured from whatever level you declare as zero. The choice of zero is free; only differences matter.",
         "Elastic potential energy in a spring is ½kx², and like kinetic energy it goes as a square — stretching a spring twice as far stores four times the energy."],
        ["พลังงานศักย์โน้มถ่วงคือ mgh วัดจากระดับใดก็ได้ที่เรากำหนดให้เป็นศูนย์ การเลือกระดับศูนย์เป็นอิสระ เพราะสิ่งที่มีความหมายคือผลต่างเท่านั้น",
         "พลังงานศักย์ยืดหยุ่นในสปริงคือ ½kx² และเช่นเดียวกับพลังงานจลน์ มันโตตามกำลังสอง ยืดสปริงเป็นสองเท่าจะเก็บพลังงานสี่เท่า"]],
  formula:["E_p = mgh        E_spring = ½kx²","E_p = mgh        E_spring = ½kx²"],
  flabel:["Zero level is yours to choose","ระดับศูนย์เลือกเองได้"],
  viz:"plot",
  vizcfg:{
    title:["TWO KINDS OF STORED ENERGY","พลังงานสะสมสองแบบ"],
    xlab:["height or extension","ความสูงหรือระยะยืด"], ylab:["stored energy (J)","พลังงานสะสม (J)"],
    xmin:0, xmax:5, ymin:0, fill:false,
    fn:function(x,p){ return p.kind===0 ? p.m*9.8*x : 0.5*p.k*x*x; },
    mark:function(p){ return p.x; },
    ctrls:[
      {k:"kind", lab:["",""], opts:[["gravitational","โน้มถ่วง"], ["elastic","ยืดหยุ่น"]], min:0, def:0, unit:""},
      {k:"m",    lab:["Mass","มวล"],                   min:.5, max:10, step:.5, def:2, unit:" kg"},
      {k:"k",    lab:["Spring constant k","ค่านิจสปริง k"], min:2, max:40, step:1, def:20, unit:" N/m"},
      {k:"x",    lab:["Height / extension","ความสูง / ระยะยืด"], min:.2, max:5, step:.1, def:2, unit:" m"}
    ],
    readouts:[
      {lab:["Stored energy","พลังงานสะสม"], f:function(S){
        var p=S.p; return fmt2(p.kind===0 ? p.m*9.8*p.x : 0.5*p.k*p.x*p.x)+" J"; }},
      {lab:["Shape","รูปร่าง"], f:function(S){
        return S.p.kind===0 ? (L()?"เส้นตรง · mgh":"straight line · mgh")
                            : (L()?"พาราโบลา · ½kx²":"parabola · ½kx²"); }},
      {lab:["Double the height?","ความสูงสองเท่า?"], f:function(S){
        return S.p.kind===0 ? (L()?"พลังงานสองเท่า":"energy doubles")
                            : (L()?"พลังงานสี่เท่า":"energy quadruples"); }},
      {lab:["Measured from where?","วัดจากที่ใด"], f:function(S){
        return S.p.kind===0 ? (L()?"ระดับอ้างอิงที่คุณเลือกเอง":"a zero level you choose")
                            : (L()?"ความยาวธรรมชาติของสปริง":"the spring's natural length"); }}
    ],
    note:["gravitational PE is linear in height; elastic PE is quadratic in extension","พลังงานศักย์โน้มถ่วงเป็นเชิงเส้นกับความสูง ส่วนยืดหยุ่นเป็นกำลังสองกับระยะยืด"]
  } },

{ id:"conservation", x:235, y:248, requires:["kinetic","potential"], methods:["M-04"],
  title:["Conservation of energy","การอนุรักษ์พลังงาน"],
  body:[["With no friction, kinetic plus potential energy is constant. Set the total at the start equal to the total at the end and the whole middle of the problem disappears — including the time, which never enters.",
         "A ball dropped from height h arrives at √(2gh) regardless of its mass, and by the same logic regardless of the path it took. Only the height difference counts."],
        ["ถ้าไม่มีแรงเสียดทาน พลังงานจลน์บวกพลังงานศักย์จะคงที่ ตั้งพลังงานรวมตอนเริ่มเท่ากับตอนจบ แล้วช่วงกลางทั้งหมดของโจทย์ก็หายไป รวมถึงเวลาซึ่งไม่ปรากฏเลย",
         "ลูกบอลที่ปล่อยจากความสูง h จะถึงพื้นด้วย √(2gh) ไม่ว่ามวลเท่าใด และด้วยเหตุผลเดียวกัน ไม่ว่าจะไปทางไหน สิ่งที่นับคือผลต่างความสูงเท่านั้น"]],
  formula:["E_k1 + E_p1 = E_k2 + E_p2","E_k1 + E_p1 = E_k2 + E_p2"],
  flabel:["Path and time both drop out","ทั้งเส้นทางและเวลาหายไป"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["The Mana Coaster","รถรางพลังเวท"],
    question:["Drag the starting height and the second hill. Can the cart cross it — and how fast is it going at the bottom?",
              "ลากความสูงจุดปล่อยและเนินที่สอง รถจะข้ามเนินได้ไหม และที่ก้นหุบเร็วแค่ไหน"],
    ctrls:[
      {k:"h0", lab:["Released from","ปล่อยจากความสูง"], min:2, max:20, step:.1, def:12, unit:" m"},
      {k:"h2", lab:["Second hill","เนินที่สอง"], min:1, max:20, step:.1, def:9, unit:" m"},
      {k:"m",  lab:["Mass of the cart","มวลรถ"], min:.5, max:5, step:.5, def:2, unit:" kg"},
      {k:"fr", lab:["Track","ราง"], min:0, max:1, step:1, def:0, opts:[["Frictionless","ไร้แรงเสียดทาน"],["Sticky","มีแรงเสียดทาน"]]},
      {k:"T",  lab:["Watch for","ดูนาน"], min:4, max:16, step:1, def:10, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Speed now","อัตราเร็วขณะนี้"], f:function(S){ return fmt2(C05.at(S.p,S.t).v)+" m/s"; }},
      {lab:["Height now","ความสูงขณะนี้"], f:function(S){ return fmt2(C05.at(S.p,S.t).y)+" m"; }},
      {lab:["Total energy","พลังงานรวม"], f:function(S){ return fmt(S.p.m*10*S.p.h0)+" J"; }},
      {lab:["Turned to heat","กลายเป็นความร้อน"], f:function(S){ return fmt(S.p.m*C05.at(S.p,S.t).heat)+" J"; }}
    ],
    world:{ kind:"plane", left:22, span:function(){ return 62; },
      yspan:function(){ return 28; } },
    scene:function(o,S,W){
      var p=S.p, pts=[];
      for(var x=0;x<=60.01;x+=0.5) pts.push([W.X(x), W.Y(C05.y(p,x))]);
      role("track")(o, pts, W.g, {clock:STAGE.clock});
      /* the height the energy allows: a line the cart can never rise above */
      if(!STAGE.guessing(S) && !(S.trial && S.trial.goal)){
        var hy=fmt2(W.Y(p.h0)), hl=S.hl==="h0";
        o.push('<line x1="'+fmt2(W.X(0))+'" y1="'+hy+'" x2="'+fmt2(W.X(60))+'" y2="'+hy+'" stroke="var(--good)" stroke-width="'+(hl?2.4:1.2)+'" stroke-dasharray="6 5" opacity=".8"/>');
        fitText(o, W.X(60), +hy-6, [p.fr?"start height · heat lowers the real reach":"start height · the most it can climb back to",
                                    p.fr?"ความสูงเริ่มต้น · ความร้อนทำให้ขึ้นได้ไม่ถึง":"ความสูงเริ่มต้น · สูงสุดที่ขึ้นกลับได้"], 260, 9.5, "var(--good)", "end");
      }
      role("goal")(o, W.X(59), W.g, {clock:STAGE.clock, on:C05.at(p,S.t).out});
      var c=C05.at(p,S.t);
      if(!c.out) role("cart")(o, W.X(c.x), W.Y(c.y), {ang:-Math.atan(C05.dy(p,c.x)*W.s/W.s), clock:STAGE.clock});
    },
    handles:[
      {k:"h0", at:function(p){ return {x:0.4, y:p.h0}; }, set:function(x,y){ return {h0:y}; }, lab:["drag the start","ลากจุดเริ่ม"], col:"good", term:"h0"},
      {k:"h2", at:function(p){ return {x:30, y:p.h2}; }, set:function(x,y){ return {h2:y}; }, lab:["drag the hill","ลากเนิน"], col:"accent2", term:"h"}
    ],
    events:function(p,S){ var c=C05.at(p,S.t); return [{id:"exit", when:c.out && S.t>0, x:59, y:1, kind:"burst", col:"good"}]; },
    instrument:{ kind:"strip",
      parts:function(p,S){ var c=C05.at(p,S.t), m=p.m;
        return [{v:m*10*c.y, lab:["potential mgh","ศักย์ mgh"], col:"good"},
                {v:0.5*m*c.v*c.v, lab:["kinetic ½mv²","จลน์ ½mv²"], col:"accent"},
                {v:m*c.heat, lab:["heat","ความร้อน"], col:"warn"}]; }
    },
    spell:{
      tex:function(p,S){ var c=C05.at(p,S.t);
        return "v = \\sqrt{2g(h_0 - h)"+(p.fr?" - 2E_\\text{heat}/m":"")+"} = \\sqrt{2(10)("+fmt2(p.h0)+" - "+fmt2(c.y)+")"+(p.fr?" - "+fmt2(2*c.heat):"")+"} = "+fmt2(c.v)+"\\,\\text{m/s}"+
               "\\qquad\\left[\\sqrt{\\tfrac{\\text{m}}{\\text{s}^2}\\cdot\\text{m}}=\\tfrac{\\text{m}}{\\text{s}}\\right]"; },
      terms:[
        {k:"h0", sym:"h₀", lab:["start height · the energy budget","ความสูงเริ่ม · งบพลังงาน"], col:"good", f:function(p){ return fmt2(p.h0)+" m"; }},
        {k:"h",  sym:"h",  lab:["height now","ความสูงขณะนี้"], col:"accent2", f:function(p,S){ return fmt2(C05.at(p,S.t).y)+" m"; }},
        {k:"m",  sym:"m",  lab:["mass — cancels out","มวล — ตัดกันหมด"], col:"faint", f:function(p){ return fmt2(p.m)+" kg"; }}
      ]
    },
    predict:{ kind:"choice",
      ask:["Will the cart make it over the second hill?","รถจะข้ามเนินที่สองได้ไหม"],
      opts:[["It crosses the hill","ข้ามเนินได้"],["It rolls back","ไหลกลับ"]],
      actual:function(p){ return C05.sim(p).crest ? 0 : 1; },
      explain:function(p){ return p.fr
        ? ["On a sticky track some energy turns to heat on the way, so the cart can no longer climb back to "+fmt2(p.h0)+" m. It crosses only if the hill is low enough to leave room for those losses.",
           "บนรางที่มีแรงเสียดทาน พลังงานบางส่วนกลายเป็นความร้อนระหว่างทาง รถจึงขึ้นกลับไปถึง "+fmt2(p.h0)+" ม. ไม่ได้ มันข้ามได้ก็ต่อเมื่อเนินต่ำพอให้เผื่อพลังงานที่สูญไป"]
        : ["Without friction the cart can climb back to exactly its starting height and no higher: "+fmt2(p.h0)+" m against a "+fmt2(p.h2)+" m hill. Mass, speed and the shape of the track do not matter.",
           "ถ้าไม่มีแรงเสียดทาน รถขึ้นกลับไปได้สูงเท่าความสูงเริ่มต้นพอดี ไม่เกินนั้น: "+fmt2(p.h0)+" ม. เทียบกับเนิน "+fmt2(p.h2)+" ม. มวล ความเร็ว และรูปร่างรางไม่มีผล"]; }
    },
    trials:{
      veil:true,
      make:function(){
        if(Math.random()<0.5){
          var V=pick([8,10,12,14,16,18]), h0=V*V/20, h2=Math.max(1,Math.round((h0*0.6)*2)/2);
          return {kind:"exit", V:V, h0:h0, h2:h2, set:{h2:h2, fr:0, h0:20, T:12}};
        }
        var H0=pick([10,12,14,16,18,20]), V2=pick([4,6,8,10,12]), H2=H0-V2*V2/20;
        if(H2<1){ V2=4; H2=H0-0.8; }
        return {kind:"crest", V:V2, h0:H0, h2:H2, set:{h0:H0, fr:0, h2:1, T:12}};
      },
      lockFor:function(g){ return g.kind==="exit" ? ["h2","fr"] : ["h0","fr"]; },
      say:function(g){
        if(g.kind==="exit") return ["{@Goal} at the end of the track only accepts a cart arriving at exactly "+g.V+" m/s. From what height must you release it?",
                                    "{@goal}ที่ปลายรางรับเฉพาะรถที่มาถึงด้วยอัตราเร็ว "+g.V+" ม./วิ พอดี ต้องปล่อยรถจากความสูงเท่าใด"];
        return ["Released from "+g.h0+" m, the cart must glide over the top of the second hill at exactly "+g.V+" m/s. How high should the hill be?",
                "ปล่อยจากความสูง "+g.h0+" ม. รถต้องผ่านยอดเนินที่สองด้วยอัตราเร็ว "+g.V+" ม./วิ พอดี เนินควรสูงเท่าใด"];
      },
      at:function(g){ return g.kind==="exit" ? {x:59, y:1} : {x:30, y:g.h2}; },
      check:function(p,S,g){
        if(g.kind==="exit"){
          if(Math.abs(p.h0-g.h0)<1e-6) return {ok:true, msg:["In at "+g.V+" m/s. All of mgh₀ became ½mv² at ground level, so h₀ = v² / 2g = "+g.V+"² / 20 = "+fmt2(g.h0)+" m — the hill in between changes nothing.",
                                                              "เข้าประตูที่ "+g.V+" ม./วิ พลังงาน mgh₀ ทั้งหมดกลายเป็น ½mv² ที่ระดับพื้น ดังนั้น h₀ = v² / 2g = "+g.V+"² / 20 = "+fmt2(g.h0)+" ม. เนินระหว่างทางไม่เปลี่ยนอะไรเลย"]};
          var sim=C05.sim(p);
          return {ok:false, msg:[sim.out ? "It arrived at "+fmt2(Math.sqrt(20*p.h0))+" m/s. Only the drop from the start to the ground matters." : "It never got over the hill. Release it higher.",
                                 sim.out ? "มาถึงด้วยอัตราเร็ว "+fmt2(Math.sqrt(20*p.h0))+" ม./วิ สำคัญเพียงระยะตกจากจุดเริ่มถึงพื้น" : "รถข้ามเนินไม่ได้ ปล่อยให้สูงกว่านี้"]};
        }
        if(Math.abs(p.h2-g.h2)<1e-6) return {ok:true, msg:["Over the top at "+g.V+" m/s. The drop from "+g.h0+" m to the hilltop pays for ½v²: h = h₀ − v² / 2g = "+g.h0+" − "+fmt2(g.V*g.V/20)+" = "+fmt2(g.h2)+" m.",
                                                            "ผ่านยอดเนินที่ "+g.V+" ม./วิ ระยะลดระดับจาก "+g.h0+" ม. ถึงยอดเนินจ่ายให้ ½v² พอดี: h = h₀ − v² / 2g = "+g.h0+" − "+fmt2(g.V*g.V/20)+" = "+fmt2(g.h2)+" ม."]};
        var vt=p.h2<p.h0 ? Math.sqrt(20*(p.h0-p.h2)) : 0;
        return {ok:false, msg:["At the top it was moving at "+fmt2(vt)+" m/s. How much height must it lose to have "+g.V+" m/s left?",
                               "ที่ยอดเนินมีอัตราเร็ว "+fmt2(vt)+" ม./วิ ต้องเสียความสูงเท่าใดจึงเหลืออัตราเร็ว "+g.V+" ม./วิ"]};
      }
    },
    note:["the bar is the energy budget: it only changes length when friction turns some of it into heat",
          "แถบนี้คืองบพลังงาน ความยาวเปลี่ยนก็ต่อเมื่อแรงเสียดทานเปลี่ยนบางส่วนเป็นความร้อนเท่านั้น"]
  },
  guide:[
    {say:["Release the cart from 12 m. Watch the bar: green potential pours into blue kinetic on the way down and back again on the way up — the total never moves.",
          "ปล่อยรถจาก 12 ม. ดูแถบ: พลังงานศักย์สีเขียวไหลไปเป็นพลังงานจลน์สีฟ้าขาลง และไหลกลับขาขึ้น ผลรวมไม่เคยเปลี่ยน"], set:{h0:12,h2:9,m:2,fr:0,T:10}},
    {say:["Raise the second hill above the start. However fast it is at the bottom, the cart can never climb above the dashed line — it rolls back.",
          "ยกเนินที่สองให้สูงกว่าจุดเริ่ม ไม่ว่าที่ก้นหุบจะเร็วแค่ไหน รถก็ขึ้นเกินเส้นประไม่ได้ มันไหลกลับ"], set:{h0:12,h2:13,m:2,fr:0,T:12}},
    {say:["Make the track sticky. Now an orange slice of heat grows, the bar's useful part shrinks, and the cart settles in the valley.",
          "ทำให้รางมีแรงเสียดทาน ส่วนความร้อนสีส้มจะโตขึ้น ส่วนที่ใช้ได้หดลง และรถหยุดนิ่งในหุบ"], set:{h0:12,h2:11,m:2,fr:1,T:16}}
  ]
},

{ id:"power", x:235, y:346, requires:["conservation"], methods:["M-05","M-06"],
  title:["Power and efficiency","กำลังและประสิทธิภาพ"],
  body:[["Power is the rate of doing work: P = W/t, and for a steady force moving at steady speed, P = Fv. Two machines can do identical work and differ entirely in how long they take.",
         "No real machine returns all the work put in. Efficiency is useful output over total input, always below 100%, and the missing fraction has almost always become heat."],
        ["กำลังคืออัตราการทำงาน P = W/t และสำหรับแรงคงที่ที่เคลื่อนด้วยอัตราเร็วคงที่ P = Fv เครื่องจักรสองเครื่องอาจทำงานเท่ากันทุกประการแต่ใช้เวลาต่างกันสิ้นเชิง",
         "ไม่มีเครื่องจักรจริงเครื่องใดคืนงานได้ครบตามที่ใส่เข้าไป ประสิทธิภาพคืองานที่ได้ประโยชน์หารด้วยงานที่ใส่เข้า ต่ำกว่า 100% เสมอ และส่วนที่หายไปเกือบทั้งหมดกลายเป็นความร้อน"]],
  formula:["P = W/t = Fv        Eff = (W_out / W_in) × 100%","P = W/t = Fv        Eff = (W_out / W_in) × 100%"],
  flabel:["Never above 100 per cent","ไม่มีวันเกินร้อยเปอร์เซ็นต์"],
  viz:"stack",
  vizcfg:{
    title:["WHERE THE INPUT ENERGY ACTUALLY GOES","พลังงานที่ใส่เข้าไปหายไปไหน"],
    total:["input power","กำลังที่ใส่เข้า"],
    ctrls:[
      {k:"Pin", lab:["Input power","กำลังที่ใส่เข้า"], min:100, max:2000, step:50, def:800, unit:" W"},
      {k:"eff", lab:["Efficiency","ประสิทธิภาพ"],      min:5, max:95, step:5, def:40, unit:" %"},
      {k:"t",   lab:["Run for","ทำงานนาน"],            min:5, max:120, step:5, def:60, unit:" s"}
    ],
    readouts:[
      {lab:["Useful output","กำลังที่ใช้ได้"], f:function(S){ return fmt2(S.p.Pin*S.p.eff/100)+" W"; }},
      {lab:["Wasted as heat","สูญเสียเป็นความร้อน"], f:function(S){ return fmt2(S.p.Pin*(100-S.p.eff)/100)+" W"; }},
      {lab:["Useful energy in that time","พลังงานที่ใช้ได้ในเวลานั้น"], f:function(S){
        return fmt2(S.p.Pin*S.p.eff/100*S.p.t/1000)+" kJ"; }},
      {lab:["Can efficiency reach 100%?","ประสิทธิภาพถึง 100% ได้ไหม"], f:function(){
        return L()?"ไม่ได้ — มีการสูญเสียเสมอ":"no — some waste is unavoidable"; }}
    ],
    parts:function(p){
      return [{v:p.Pin*p.eff/100,       lab:["useful","ที่ใช้ได้"],   col:"good"},
              {v:p.Pin*(100-p.eff)/100, lab:["wasted","ที่สูญเสีย"], col:"warn"}];
    },
    note:["power is energy per second — efficiency is which fraction of it you actually wanted","กำลังคือพลังงานต่อวินาที ประสิทธิภาพคือสัดส่วนที่เราต้องการจริงๆ"]
  } }
],

methods:[
{id:"M-01", name:["Compute work including the angle","คำนวณงานโดยคิดมุมด้วย"]},
{id:"M-02", name:["Apply the work–energy theorem","ใช้ทฤษฎีบทงาน–พลังงาน"]},
{id:"M-03", name:["Compute potential energy","คำนวณพลังงานศักย์"]},
{id:"M-04", name:["Conserve energy between two points","อนุรักษ์พลังงานระหว่างสองจุด"]},
{id:"M-05", name:["Compute power","คำนวณกำลัง"]},
{id:"M-06", name:["Compute efficiency","คำนวณประสิทธิภาพ"]}
],

traps:{
"T-01":["Friction always opposes the motion, so the work it does is negative.","แรงเสียดทานต้านการเคลื่อนที่เสมอ งานที่มันทำจึงเป็นลบ"],
"T-02":["You dropped the ½, or forgot that energy goes as v² and not v.","คุณลืม ½ หรือลืมว่าพลังงานแปรตาม v² ไม่ใช่ v"],
"T-03":["A force perpendicular to the displacement does no work, however large it is.","แรงที่ตั้งฉากกับการกระจัดไม่ทำงานเลย ไม่ว่าจะมากแค่ไหน"],
"T-04":["Efficiency cannot exceed 100%. Output over input, not the other way round.","ประสิทธิภาพเกิน 100% ไม่ได้ ใช้งานออกหารงานเข้า ไม่ใช่กลับกัน"]
},

gen:{
"M-01": function(sf){
  var F=pick([20,40,50,80,100]), s=pick([3,5,8,10]), th=pick([0,30,60,90]);
  var cos={0:1,30:0.866,60:0.5,90:0}[th];
  if(sf==="S-04") return {stem:["A porter carries a suitcase at constant height along a level corridor. How much work does the lifting force do?",
                                "พนักงานยกกระเป๋าเดินตามทางเดินราบที่ความสูงคงที่ แรงยกทำงานเท่าใด"],
    opts:[{v:["Zero — the force is perpendicular to the motion","ศูนย์ เพราะแรงตั้งฉากกับการเคลื่อนที่"],ok:1},
          {v:["mgh, where h is the carrying height","mgh เมื่อ h คือความสูงที่หิ้ว"],trap:"T-03"},
          {v:["The weight times the corridor length","น้ำหนักคูณความยาวทางเดิน"],trap:"T-03"},
          {v:["It depends on the walking speed","ขึ้นกับความเร็วในการเดิน"]}],unit:""};
  if(sf==="S-03") return {stem:["A crate is dragged "+s+" m across a floor against a friction force of "+F+" N. How much work does friction do?",
                                "ลากลังไป "+s+" เมตรบนพื้นโดยมีแรงเสียดทาน "+F+" นิวตัน แรงเสียดทานทำงานเท่าใด"],
    opts:[{v:String(-F*s),ok:1},{v:String(F*s),trap:"T-01"},{v:"0",trap:"T-03"},{v:fmt(F*s/2)}],unit:" J"};
  return {stem:["A force of "+F+" N pulls a body "+s+" m at "+th+"° to the displacement. Find the work done.",
                "แรง "+F+" นิวตัน ดึงวัตถุไป "+s+" เมตร ทำมุม "+th+"° กับการกระจัด จงหางาน"],
    opts:[{v:fmt(F*s*cos),ok:1},{v:String(F*s),trap:"T-03"},{v:fmt(F*s*Math.sqrt(1-cos*cos))},{v:fmt(F/s)}],unit:" J"};
},
"M-02": function(sf){
  var m=pick([2,4,5,10]), v=pick([4,6,10,12]), Ek=0.5*m*v*v;
  if(sf==="S-04") return {stem:["A car doubles its speed. What happens to its kinetic energy?",
                                "รถเพิ่มความเร็วเป็นสองเท่า พลังงานจลน์เปลี่ยนอย่างไร"],
    opts:[{v:["It becomes four times as large","เพิ่มเป็นสี่เท่า"],ok:1},
          {v:["It doubles","เพิ่มเป็นสองเท่า"],trap:"T-02"},
          {v:["It stays the same","เท่าเดิม"]},{v:["It becomes eight times as large","เพิ่มเป็นแปดเท่า"]}],unit:""};
  if(sf==="S-05") return {stem:["A "+m+" kg body has "+fmt(Ek)+" J of kinetic energy. Find its speed.",
                                "วัตถุมวล "+m+" กิโลกรัม มีพลังงานจลน์ "+fmt(Ek)+" จูล จงหาอัตราเร็ว"],
    opts:[{v:String(v),ok:1},{v:fmt(2*Ek/m),trap:"T-02"},{v:fmt(Ek/m)},{v:fmt(v*2)}],unit:" m/s"};
  return {stem:["Find the kinetic energy of a "+m+" kg body moving at "+v+" m/s.",
                "จงหาพลังงานจลน์ของวัตถุมวล "+m+" กิโลกรัม ที่เคลื่อนที่ด้วย "+v+" ม./วินาที"],
    opts:[{v:fmt(Ek),ok:1},{v:fmt(m*v*v),trap:"T-02"},{v:fmt(m*v)},{v:fmt(0.5*m*v)}],unit:" J"};
},
"M-03": function(sf){
  var m=pick([2,5,10,20]), h=pick([3,5,8,12]), g=10, k=pick([100,200,400]), x=pick([0.1,0.2,0.5]);
  if(sf==="S-04") return {stem:["A spring is stretched twice as far. The energy it stores becomes:",
                                "สปริงถูกยืดเป็นสองเท่า พลังงานที่เก็บไว้จะกลายเป็น"],
    opts:[{v:["Four times as much","สี่เท่า"],ok:1},{v:["Twice as much","สองเท่า"],trap:"T-02"},
          {v:["The same","เท่าเดิม"]},{v:["Half as much","ครึ่งเดียว"]}],unit:""};
  if(sf==="S-03") return {stem:["A spring of stiffness "+k+" N/m is compressed by "+x+" m. How much energy is stored?",
                                "สปริงค่านิจ "+k+" นิวตัน/เมตร ถูกกดเข้าไป "+x+" เมตร เก็บพลังงานเท่าใด"],
    opts:[{v:fmt(0.5*k*x*x),ok:1},{v:fmt(k*x*x),trap:"T-02"},{v:fmt(k*x)},{v:fmt(0.5*k*x)}],unit:" J"};
  return {stem:["A "+m+" kg mass is raised "+h+" m. Taking g = 10 m/s², find the gain in potential energy.",
                "ยกมวล "+m+" กิโลกรัม ขึ้น "+h+" เมตร ให้ g = 10 ม./วินาที² จงหาพลังงานศักย์ที่เพิ่มขึ้น"],
    opts:[{v:String(m*g*h),ok:1},{v:String(m*h)},{v:fmt(0.5*m*g*h),trap:"T-02"},{v:String(m*g)}],unit:" J"};
},
"M-04": function(sf){
  var h=pick([5,10,20,45]), g=10, v=Math.sqrt(2*g*h);
  if(sf==="S-04") return {stem:["Two balls of different mass are dropped from the same height with no air resistance. Which lands faster?",
                                "ลูกบอลสองลูกมวลต่างกันถูกปล่อยจากความสูงเดียวกันโดยไม่มีแรงต้านอากาศ ลูกใดถึงพื้นเร็วกว่า"],
    opts:[{v:["Neither — mass cancels out","ไม่มี เพราะมวลตัดกันหมด"],ok:1},
          {v:["The heavier one","ลูกที่หนักกว่า"]},{v:["The lighter one","ลูกที่เบากว่า"]},
          {v:["It depends on the drop height","ขึ้นกับความสูงที่ปล่อย"]}],unit:""};
  if(sf==="S-05") return {stem:["A ball reaches the ground at "+fmt(v)+" m/s having been dropped from rest. From what height did it fall?",
                                "ลูกบอลถึงพื้นด้วย "+fmt(v)+" ม./วินาที โดยปล่อยจากหยุดนิ่ง ตกจากความสูงเท่าใด"],
    opts:[{v:String(h),ok:1},{v:fmt(v*v/g),trap:"T-02"},{v:fmt(v/g)},{v:fmt(h*2)}],unit:" m"};
  return {stem:["A ball is dropped from rest at "+h+" m. Ignoring air resistance, how fast is it moving at the ground?",
                "ปล่อยลูกบอลจากหยุดนิ่งที่ความสูง "+h+" เมตร ไม่คิดแรงต้านอากาศ ถึงพื้นด้วยอัตราเร็วเท่าใด"],
    opts:[{v:fmt(v),ok:1},{v:fmt(2*g*h),trap:"T-02"},{v:fmt(g*h)},{v:fmt(Math.sqrt(g*h))}],unit:" m/s"};
},
"M-05": function(sf){
  var W=pick([600,1200,2400,3000]), t=pick([4,10,20,60]), F=pick([50,100,200]), v=pick([2,5,10]);
  if(sf==="S-03") return {stem:["A car engine pushes with "+F+" N while the car travels at a steady "+v+" m/s. Find the power output.",
                                "เครื่องยนต์ให้แรง "+F+" นิวตัน ขณะรถแล่นด้วยอัตราเร็วคงที่ "+v+" ม./วินาที จงหากำลัง"],
    opts:[{v:String(F*v),ok:1},{v:fmt(F/v)},{v:fmt(F+v)},{v:fmt(F*v/2)}],unit:" W"};
  if(sf==="S-05") return {stem:["A motor rated at "+fmt(W/t)+" W runs for "+t+" s. How much work does it do?",
                                "มอเตอร์กำลัง "+fmt(W/t)+" วัตต์ ทำงานนาน "+t+" วินาที ทำงานได้เท่าใด"],
    opts:[{v:String(W),ok:1},{v:fmt(W/(t*t))},{v:fmt(W*t)},{v:fmt(W/2)}],unit:" J"};
  return {stem:["A machine does "+W+" J of work in "+t+" s. Find its power.",
                "เครื่องจักรทำงาน "+W+" จูล ใน "+t+" วินาที จงหากำลัง"],
    opts:[{v:fmt(W/t),ok:1},{v:String(W*t)},{v:fmt(t/W)},{v:String(W)}],unit:" W"};
},
"M-06": function(sf){
  var out=pick([120,300,450,800]), eff=pick([40,50,60,75]), inp=out*100/eff;
  if(sf==="S-04") return {stem:["A student calculates a machine's efficiency as 120%. What has gone wrong?",
                                "นักเรียนคำนวณประสิทธิภาพเครื่องจักรได้ 120% เกิดอะไรผิดพลาด"],
    opts:[{v:["Input and output were swapped — efficiency cannot exceed 100%","สลับงานเข้ากับงานออก ประสิทธิภาพเกิน 100% ไม่ได้"],ok:1},
          {v:["Nothing, some machines exceed 100%","ไม่ผิด เครื่องจักรบางชนิดเกิน 100% ได้"],trap:"T-04"},
          {v:["The units were wrong","หน่วยผิด"]},{v:["Friction was included","รวมแรงเสียดทานเข้าไปด้วย"]}],unit:""};
  if(sf==="S-05") return {stem:["A machine is "+eff+"% efficient and delivers "+out+" J of useful work. How much energy went in?",
                                "เครื่องจักรมีประสิทธิภาพ "+eff+"% และให้งานที่เป็นประโยชน์ "+out+" จูล ใส่พลังงานเข้าไปเท่าใด"],
    opts:[{v:fmt(inp),ok:1},{v:fmt(out*eff/100),trap:"T-04"},{v:String(out)},{v:fmt(inp/2)}],unit:" J"};
  return {stem:["A machine takes in "+fmt(inp)+" J and delivers "+out+" J of useful work. Find its efficiency.",
                "เครื่องจักรรับพลังงาน "+fmt(inp)+" จูล และให้งานที่เป็นประโยชน์ "+out+" จูล จงหาประสิทธิภาพ"],
    opts:[{v:String(eff),ok:1},{v:fmt(inp*100/out),trap:"T-04"},{v:fmt(out/inp)},{v:fmt(100-eff)}],unit:" %"};
}
}
};
