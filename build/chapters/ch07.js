/* Chapter 07 glue between the shared projectile model and its stage lab:
   the flight as cast, stopped early if it strikes a trial's castle wall. */
var C07 = {
  k: 0.2,
  shot: function(p, S){
    var g = S && S.trial && S.trial.goal, a = PHYS.arc(p.u, p.th, 0, 0), Tend = a.T, hit = null, through = false;
    if(g && g.kind === "wall"){
      var y = PHYS.arcYAt(p.u, p.th, 0, g.D);
      if(y != null && Math.abs(y - g.H) > g.r){ Tend = g.D / a.vx; hit = { x: g.D, y: Math.max(0, y) }; }
      else through = y != null;
    }
    var s = PHYS.arc(p.u, p.th, 0, Math.min(S ? S.t : 0, Tend));
    return { a: a, s: s, Tend: Tend, hit: hit, through: through };
  }
};

var CHAPTER = {
id:"ch07", num:"07", slug:"curved-motion", subject:"physics",
kicker:["Physics · Chapter 07","ฟิสิกส์ · บทที่ 7"],
title:["Curved Motion","การเคลื่อนที่แนวโค้ง"],
mapTitle:["Two motions at once","การเคลื่อนที่สองแบบพร้อมกัน"],
lede:["A curved path is never a new kind of physics. It is two straight-line motions happening in the same body at the same time, and the whole chapter is the trick of pulling them apart.",
      "เส้นทางโค้งไม่เคยเป็นฟิสิกส์ชนิดใหม่ มันคือการเคลื่อนที่แนวตรงสองแบบที่เกิดในวัตถุเดียวกันพร้อมกัน และทั้งบทนี้คือเทคนิคการแยกทั้งสองออกจากกัน"],
next:["→ continues in Chapter 08 · Harmonic Motion","→ ต่อในบทที่ 8 · การเคลื่อนที่ฮาร์มอนิก"],

nodes:[
{ id:"independence", x:235, y:52, requires:[], methods:["M-01"],
  title:["Independence of axes","ความเป็นอิสระของแกน"],
  body:[["Horizontal and vertical motion do not talk to each other. Along x there is no force, so the velocity is constant. Along y there is gravity, so it is Chapter 2's constant-acceleration problem, unchanged.",
         "Time is the only thing the two axes share. Find t from one axis, then hand it to the other. Substituting the full launch speed where a component belongs is trap T-01."],
        ["การเคลื่อนที่แนวราบกับแนวดิ่งไม่คุยกัน ตามแกน x ไม่มีแรง ความเร็วจึงคงที่ ตามแกน y มีแรงโน้มถ่วง จึงเป็นโจทย์ความเร่งคงที่ของบทที่ 2 ทุกประการ",
         "เวลาเป็นสิ่งเดียวที่สองแกนใช้ร่วมกัน หาค่า t จากแกนหนึ่งแล้วส่งให้อีกแกน การแทนอัตราเร็วเริ่มต้นเต็มลงในที่ที่ควรเป็นองค์ประกอบคือกับดัก T-01"]],
  formula:["u_x = u cos θ        u_y = u sin θ","u_x = u cos θ        u_y = u sin θ"],
  flabel:["Split first, always","แตกองค์ประกอบก่อนเสมอ"],
  viz:"bars",
  vizcfg:{
    title:["FIRED SIDEWAYS vs SIMPLY DROPPED","ยิงออกด้านข้าง เทียบ ปล่อยตกเฉยๆ"],
    ylab:["metres","เมตร"],
    ctrls:[
      {k:"u", lab:["Horizontal launch speed","อัตราเร็วแนวราบตอนยิง"], min:0, max:40, step:1, def:20, unit:" m/s"},
      {k:"t", lab:["Time since release","เวลาหลังปล่อย"], min:.2, max:3, step:.1, def:1.5, unit:" s"}
    ],
    readouts:[
      {lab:["Fired: fallen","ลูกที่ยิง: ตกไป"],    f:function(S){ return fmt2(4.9*S.p.t*S.p.t)+" m"; }},
      {lab:["Dropped: fallen","ลูกที่ปล่อย: ตกไป"], f:function(S){ return fmt2(4.9*S.p.t*S.p.t)+" m"; }},
      {lab:["Difference","ต่างกัน"], f:function(){
        return L()?"ศูนย์ — ตกพร้อมกันเสมอ":"zero — they always land together"; }},
      {lab:["Horizontal travel","ระยะแนวราบ"], f:function(S){ return fmt2(S.p.u*S.p.t)+" m"; }}
    ],
    bars:[
      {lab:["Fired ball: drop","ลูกที่ยิง: ระยะตก"],   f:function(p){ return 4.9*p.t*p.t; }, col:"accent"},
      {lab:["Dropped ball: drop","ลูกที่ปล่อย: ระยะตก"], f:function(p){ return 4.9*p.t*p.t; }, col:"good"},
      {lab:["Fired ball: sideways","ลูกที่ยิง: ระยะข้าง"], f:function(p){ return p.u*p.t; }, col:"warn"}
    ],
    note:["no setting can make the first two bars differ — gravity ignores sideways motion","ไม่มีการตั้งค่าใดทำให้สองแถบแรกต่างกัน แรงโน้มถ่วงไม่สนใจการเคลื่อนที่ด้านข้าง"]
  },
  guide:[
    {say:["Both balls have fallen exactly the same distance, even though one was fired at 20 m/s.",
          "ลูกทั้งสองตกได้ระยะเท่ากันพอดี แม้ลูกหนึ่งจะถูกยิงด้วยความเร็ว 20 เมตรต่อวินาที"], set:{u:20,t:1.5}},
    {say:["Triple the launch speed. The sideways bar leaps; the two drop bars do not budge.",
          "เพิ่มความเร็วยิงเป็นสามเท่า แถบระยะข้างพุ่งขึ้น แต่แถบระยะตกสองแถบไม่ขยับเลย"], set:{u:40,t:1.5}},
    {say:["Set the launch speed to zero and the two situations become identical. The axes never talk.",
          "ตั้งความเร็วยิงเป็นศูนย์ สองสถานการณ์กลายเป็นอย่างเดียวกัน แกนทั้งสองไม่เคยคุยกัน"], set:{u:0,t:2.4}}
  ] },

{ id:"projectile", x:100, y:150, requires:["independence"], methods:["M-02","M-03"],
  title:["Projectiles","โพรเจกไทล์"],
  body:[["At the top of the flight the vertical velocity is zero but the horizontal velocity is untouched — the body is still moving, just not upward. Believing it stops entirely is trap T-02.",
         "Range is maximised at 45°, and any two angles adding to 90° give the same range. Launch at 30° or at 60° and the projectile lands in the same place, by very different routes."],
        ["ที่จุดสูงสุดของการเคลื่อนที่ ความเร็วแนวดิ่งเป็นศูนย์แต่ความเร็วแนวราบไม่เปลี่ยน วัตถุยังเคลื่อนที่อยู่ เพียงแต่ไม่ได้ขึ้น การเข้าใจว่ามันหยุดสนิทคือกับดัก T-02",
         "ระยะไกลสุดเกิดที่ 45° และมุมสองมุมใดที่รวมกันได้ 90° จะให้ระยะเท่ากัน ยิงที่ 30° หรือ 60° วัตถุตกที่เดียวกัน แต่ด้วยเส้นทางที่ต่างกันมาก"]],
  formula:["R = u² sin 2θ / g        t_flight = 2u sin θ / g","R = u² sin 2θ / g        t_flight = 2u sin θ / g"],
  flabel:["Maximum range at 45°","ไกลสุดที่ 45°"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["The Fireball Arc: two independent motions","วิถีลูกไฟ: สองการเคลื่อนที่อิสระต่อกัน"],
    question:["Pull back the aiming rune and cast. Why does the fireball's sideways arrow never change?",
              "ดึงรูนเล็งแล้วร่ายเวท ทำไมลูกศรแนวราบของลูกไฟจึงไม่เปลี่ยนเลย"],
    ctrls:[
      {k:"u",  lab:["Launch speed u","อัตราเร็วต้น u"], min:10, max:26, step:1, def:22, unit:" m/s"},
      {k:"th", lab:["Angle θ","มุม θ"],                  min:10, max:80, step:1, def:45, unit:"°"}
    ],
    duration:function(p,S){ return C07.shot(p,S).Tend+0.5; },
    readouts:[
      {lab:["Range R","ระยะไกล R"], f:function(S){ return fmt(PHYS.arc(S.p.u,S.p.th,0,0).range)+" m"; }},
      {lab:["Highest point","จุดสูงสุด"], f:function(S){ return fmt(PHYS.arc(S.p.u,S.p.th,0,0).apexY)+" m"; }},
      {lab:["Time of flight","เวลาบิน"], f:function(S){ return fmt2(PHYS.arc(S.p.u,S.p.th,0,0).T)+" s"; }},
      {lab:["Speed at the top","ความเร็วที่จุดสูงสุด"], f:function(S){
        return fmt2(PHYS.arc(S.p.u,S.p.th,0,0).vx)+(L()?" ม./วิ · ไม่ใช่ศูนย์":" m/s · not zero"); }}
    ],
    world:{ kind:"plane", left:40,
      /* fixed: 26 m/s reaches 68 m at 45° and 33 m at 80° */
      span:function(){ return 72; },
      yspan:function(){ return 35; } },
    props:function(p,S){
      var list=[{role:"agent", px:48, y:0}], g=S.trial && S.trial.goal;
      if(g && g.kind!=="wall" && g.kind!=="top") list.push({role:"goal", x:g.D,
        on:S.t>0 && S.t>=C07.shot(p,S).Tend-1e-6 && Math.abs(PHYS.arc(p.u,p.th,0,0).range-g.D)<1.5});
      return list;
    },
    scene:function(o,S,W){
      var p=S.p, sh=C07.shot(p,S), a=sh.a, st=sh.s, g=S.trial && S.trial.goal;
      C07.k = 3.5 / W.s;   /* aim handle: 3.5 px of pull per m/s, whatever the zoom */
      if(g && g.kind==="wall"){
        var top=W.Y(g.H+g.r+5);
        role("wall")(o, W.X(g.D), W.g, { h:W.g-top, gapY:W.Y(g.H), gapR:g.r*W.s, on:sh.through && S.t>=sh.Tend-1e-6, clock:STAGE.clock });
      }
      /* the aim line, then the apex the formula promises */
      if(S.t<1e-9){
        var r=p.th*Math.PI/180;
        o.push('<line x1="'+fmt2(W.X(0))+'" y1="'+fmt2(W.Y(0))+'" x2="'+fmt2(W.X(0)+Math.cos(r)*p.u*3.5)+'" y2="'+fmt2(W.Y(0)-Math.sin(r)*p.u*3.5)+
               '" stroke="var(--accent2)" stroke-width="1.6" stroke-dasharray="3 4"/>');
      }
      if(!S.trial && !STAGE.guessing(S)){
        var ax=a.vx*a.apexT, hl=S.hl==="uy";
        o.push('<line x1="'+fmt2(W.X(ax))+'" y1="'+fmt2(W.Y(a.apexY))+'" x2="'+fmt2(W.X(ax))+'" y2="'+fmt2(W.g)+
               '" stroke="var(--ink-faint)" stroke-width="'+(hl?2:1)+'" stroke-dasharray="2 4"/>');
        fitText(o, W.X(ax), W.Y(a.apexY)-10, [(L()?"สูงสุด ":"top ")+fmt(a.apexY)+" m", "สูงสุด "+fmt(a.apexY)+" ม."], 100, 10, "var(--ink-faint)", "middle");
      }
      /* the fireball, and its velocity split into the two parts that never talk */
      var bx=W.X(st.x), by=W.Y(st.y), vy=st.vy, k=1.7;
      if(S.t>0 || S.playing){
        role("vector")(o, bx, by, bx+a.vx*k, by, {col:"var(--accent)", hl:S.hl==="ux"});
        if(Math.abs(vy)>0.3) role("vector")(o, bx, by, bx, by-vy*k, {col:"var(--accent2)", hl:S.hl==="uy"});
      }
      role("fireball")(o, bx, by, {clock:STAGE.clock, ang:Math.atan2(-vy, a.vx), size:6});
    },
    trace:function(p,S){ var s=C07.shot(p,S).s; return [s.x, s.y]; },
    traceCol:"warn",
    marks:function(p,S){
      if(S.trial) return [];
      var a=PHYS.arc(p.u,p.th,0,0);
      return [{a:0, b:a.range, lab:["range R = "+fmt(a.range)+" m","ระยะ R = "+fmt(a.range)+" ม."], col:"accent", term:"R"}];
    },
    handles:[
      {k:"u", at:function(p){ var r=p.th*Math.PI/180, c=C07.k; return {x:Math.cos(r)*p.u*c, y:Math.sin(r)*p.u*c}; },
       set:function(x,y){ var c=C07.k; x=Math.max(x,0.01); return {u:Math.sqrt(x*x+y*y)/c, th:Math.atan2(y,x)*180/Math.PI}; },
       lab:["drag to aim","ลากเพื่อเล็ง"], col:"accent2"}
    ],
    events:function(p,S){
      var sh=C07.shot(p,S), done=S.t>=sh.Tend-1e-6 && S.t>0, ev=[];
      if(sh.hit) ev.push({id:"wall", when:done, x:sh.hit.x, y:sh.hit.y, kind:"impact", col:"warn"});
      else ev.push({id:"land", when:done, x:sh.a.range, y:0, kind:sh.through?"burst":"impact", col:sh.through?"good":"warn"});
      return ev;
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:6, ymin:-28, ymax:28,
      xlab:["seconds","วินาที"], ylab:["m/s","ม./วิ"],
      fn:function(x,p){ var a=PHYS.arc(p.u,p.th,0,0); return a.vy0-10*Math.min(x,a.T); },
      mark:function(p,S){ return C07.shot(p,S).s.t; }
    },
    /* the horizontal part, flat for the whole flight, against the falling vertical one */
    overlay:function(o,S,G){
      var a=PHYS.arc(S.p.u,S.p.th,0,0), y=fmt2(G.Y(a.vx)), hl=S.hl==="ux";
      o.push('<line x1="'+fmt2(G.X(0))+'" y1="'+y+'" x2="'+fmt2(G.X(Math.min(6,a.T)))+'" y2="'+y+'" stroke="var(--accent)" stroke-width="'+(hl?4:2.4)+'"/>');
      o.push('<text x="'+fmt2(G.X(Math.min(6,a.T))+5)+'" y="'+(+y+4)+'" fill="var(--accent)" font-family="IBM Plex Sans" font-size="10.5">'+(L()?"vx คงที่":"vx steady")+'</text>');
      o.push('<text x="'+fmt2(G.X(0)+6)+'" y="'+fmt2(G.Y(a.vy0)-6)+'" fill="var(--accent2)" font-family="IBM Plex Sans" font-size="10.5">vy</text>');
    },
    spell:{
      tex:function(p){ var a=PHYS.arc(p.u,p.th,0,0);
        return "R = \\dfrac{u^2\\sin 2\\theta}{g} = \\dfrac{"+p.u+"^2\\,\\sin "+(2*p.th)+"^\\circ}{10} = "+fmt(a.range)+"\\,\\text{m}"+
               "\\qquad\\left[\\tfrac{(\\text{m/s})^2}{\\text{m/s}^2}=\\text{m}\\right]"; },
      terms:[
        {k:"ux", sym:"u cos θ", lab:["sideways · never changes","แนวราบ · ไม่เปลี่ยน"], col:"accent",
         f:function(p){ return fmt2(PHYS.arc(p.u,p.th,0,0).vx)+" m/s"; }},
        {k:"uy", sym:"u sin θ", lab:["upward · gravity eats it","แนวดิ่ง · แรงโน้มถ่วงกินไป"], col:"accent2",
         f:function(p){ return fmt2(PHYS.arc(p.u,p.th,0,0).vy0)+" m/s"; }},
        {k:"R", sym:"R", lab:["where it lands","จุดตก"], col:"good", f:function(p){ return fmt(PHYS.arc(p.u,p.th,0,0).range)+" m"; }}
      ]
    },
    predict:{ kind:"x",
      ask:["Where will the fireball land?","ลูกไฟจะตกที่ไหน"],
      actual:function(p){ return PHYS.arc(p.u,p.th,0,0).range; },
      tol:function(p){ return Math.max(2, 0.06*PHYS.arc(p.u,p.th,0,0).range); },
      explain:function(p){ var a=PHYS.arc(p.u,p.th,0,0); return [
        "R = u² sin 2θ / g = "+p.u+"² × sin "+(2*p.th)+"° / 10 = "+fmt(a.range)+" m. The flight lasts 2u sin θ / g = "+fmt2(a.T)+" s, and all that time it drifts sideways at a steady "+fmt2(a.vx)+" m/s.",
        "R = u² sin 2θ / g = "+p.u+"² × sin "+(2*p.th)+"° / 10 = "+fmt(a.range)+" ม. บินนาน 2u sin θ / g = "+fmt2(a.T)+" วินาที และตลอดเวลานั้นเคลื่อนแนวราบคงที่ "+fmt2(a.vx)+" ม./วิ"]; }
    },
    trials:{
      veil:true,
      make:function(){
        var kind=pick(["land","twin","top","wall"]);
        if(kind==="land"){ var u=ri(12,26); return {kind:kind, u:u, D:u*u/10, lock:["th"], set:{th:45, u:(u>20?12:28)}}; }
        if(kind==="twin"){ var u2=ri(16,26), t1=pick([20,25,30,35,40]);
          return {kind:kind, u:u2, t1:t1, D:u2*u2*Math.sin(2*t1*Math.PI/180)/10, set:{u:u2, th:t1}}; }
        if(kind==="top"){ var ts=pick([30,40,50,60]); return {kind:kind, u:20, ts:ts, X:20*Math.cos(ts*Math.PI/180), set:{u:20, th:78}}; }
        var u3=ri(20,26), tw=pick([30,35,40,45,50,55,60]), A=PHYS.arc(u3,tw,0,0);
        return {kind:kind, u:u3, tw:tw, D:A.vx*A.apexT, H:A.apexY, r:1.3, set:{u:u3, th:(tw>45?20:75)}};
      },
      lockFor:function(g){ return g.kind==="land" ? ["th"] : ["u"]; },
      say:function(g){
        if(g.kind==="land") return ["Launching at 45°, choose the speed that lands the fireball on the rune circle "+fmt2(g.D)+" m away.",
                                    "ยิงที่มุม 45° เลือกอัตราเร็วที่ทำให้ลูกไฟตกบนวงรูนที่ห่าง "+fmt2(g.D)+" ม."];
        if(g.kind==="twin") return ["At "+g.u+" m/s and "+g.t1+"°, the fireball lands on the rune "+fmt(g.D)+" m away. Find the other angle that lands on the very same rune.",
                                    "ที่ "+g.u+" ม./วิ และมุม "+g.t1+"° ลูกไฟตกบนรูนที่ห่าง "+fmt(g.D)+" ม. จงหามุมอีกมุมหนึ่งที่ตกบนรูนเดียวกันพอดี"];
        if(g.kind==="top") return ["At "+g.u+" m/s, set the angle so that at the very top of its arc the fireball is moving at exactly "+fmt2(g.X)+" m/s.",
                                   "ที่ "+g.u+" ม./วิ ตั้งมุมให้ลูกไฟมีอัตราเร็ว "+fmt2(g.X)+" ม./วิ พอดีที่จุดสูงสุดของวิถี"];
        return ["A portal opens in the castle wall "+fmt(g.D)+" m away and "+fmt(g.H)+" m up — exactly where your "+g.u+" m/s fireball must reach the top of its arc. Choose the angle.",
                "ประตูมิติเปิดบนกำแพงปราสาทที่ห่าง "+fmt(g.D)+" ม. สูง "+fmt(g.H)+" ม. ตรงที่ลูกไฟ "+g.u+" ม./วิ ต้องขึ้นถึงจุดสูงสุดพอดี จงเลือกมุม"];
      },
      at:function(g){ return g.kind==="wall" ? {x:g.D, y:g.H} : {x:g.D||0, y:0}; },
      check:function(p,S,g){
        var a=PHYS.arc(p.u,p.th,0,0);
        if(g.kind==="land"){
          if(Math.abs(p.u-g.u)<0.5) return {ok:true, msg:["On the rune. At 45°, sin 2θ = 1, so R = u² / g and u = √(gR) = √(10 × "+fmt2(g.D)+") = "+g.u+" m/s.",
                                                            "ตกบนรูนพอดี ที่ 45° sin 2θ = 1 ดังนั้น R = u² / g และ u = √(gR) = √(10 × "+fmt2(g.D)+") = "+g.u+" ม./วิ"]};
          return {ok:false, msg:["It landed at "+fmt(a.range)+" m. At 45° the range is just u² / g.","ตกที่ "+fmt(a.range)+" ม. ที่ 45° ระยะคือ u² / g เท่านั้น"]};
        }
        if(g.kind==="twin"){
          if(Math.abs(p.th-(90-g.t1))<0.5) return {ok:true, msg:["Same rune, different route. sin 2θ is the same for θ and 90° − θ, so "+g.t1+"° and "+(90-g.t1)+"° are twins.",
                                                                  "รูนเดียวกัน คนละเส้นทาง sin 2θ มีค่าเท่ากันที่ θ และ 90° − θ มุม "+g.t1+"° กับ "+(90-g.t1)+"° จึงเป็นมุมคู่แฝด"]};
          if(Math.abs(p.th-g.t1)<0.5) return {ok:false, msg:["That is the angle you were given. Find its twin.","นั่นคือมุมที่ให้มา หามุมคู่แฝดของมัน"]};
          return {ok:false, msg:["It landed at "+fmt(a.range)+" m. Which angle has the same sin 2θ as "+g.t1+"°?","ตกที่ "+fmt(a.range)+" ม. มุมใดมี sin 2θ เท่ากับมุม "+g.t1+"°"]};
        }
        if(g.kind==="top"){
          if(Math.abs(p.th-g.ts)<0.5) return {ok:true, msg:["At the top the upward part is zero, but the sideways part u cos θ = "+g.u+" × cos "+g.ts+"° = "+fmt2(g.X)+" m/s carries on. The fireball never stops at the top.",
                                                             "ที่จุดสูงสุดส่วนแนวดิ่งเป็นศูนย์ แต่ส่วนแนวราบ u cos θ = "+g.u+" × cos "+g.ts+"° = "+fmt2(g.X)+" ม./วิ ยังคงอยู่ ลูกไฟไม่เคยหยุดที่จุดสูงสุด"]};
          return {ok:false, msg:["At the top it moved at "+fmt2(a.vx)+" m/s. Trap T-02: the speed at the top is not zero — it is u cos θ. Solve cos θ = "+fmt2(g.X)+" / "+g.u+".",
                                 "ที่จุดสูงสุดเคลื่อนที่ "+fmt2(a.vx)+" ม./วิ กับดัก T-02: อัตราเร็วที่จุดสูงสุดไม่ใช่ศูนย์ แต่เป็น u cos θ แก้ cos θ = "+fmt2(g.X)+" / "+g.u]};
        }
        var sh=C07.shot(p,{t:0, trial:{goal:g}});
        if(sh.through) return {ok:true, msg:["Straight through the portal. The top of the arc is H = (u sin θ)² / 2g, so sin θ = √(2gH) / u = √(20 × "+fmt(g.H)+") / "+g.u+" → θ = "+g.tw+"°.",
                                              "ผ่านประตูมิติพอดี จุดสูงสุดคือ H = (u sin θ)² / 2g ดังนั้น sin θ = √(2gH) / u = √(20 × "+fmt(g.H)+") / "+g.u+" → θ = "+g.tw+"°"]};
        var y=PHYS.arcYAt(p.u,p.th,0,g.D);
        return {ok:false, msg:[y==null ? "It fell short of the wall." : "It struck the wall "+fmt(y)+" m up; the portal is at "+fmt(g.H)+" m. The top of the arc is H = (u sin θ)² / 2g.",
                               y==null ? "ตกก่อนถึงกำแพง" : "ชนกำแพงที่ความสูง "+fmt(y)+" ม. แต่ประตูอยู่ที่ "+fmt(g.H)+" ม. จุดสูงสุดคือ H = (u sin θ)² / 2g"]};
      }
    },
    note:["two arrows, two separate stories: the sideways one never changes, the upward one is eaten by gravity at 10 m/s every second",
          "ลูกศรสองอัน สองเรื่องแยกกัน อันแนวราบไม่เคยเปลี่ยน อันแนวดิ่งถูกแรงโน้มถ่วงกินไป 10 ม./วิ ทุกวินาที"]
  },
  guide:[
    {say:["Launch at 45° and cast. The dashed line was your aim; the glowing trail is the flight.",
          "ยิงที่ 45° แล้วร่ายเวท เส้นประคือทิศที่เล็ง รอยเรืองแสงคือเส้นทางการบิน"], set:{u:22,th:45}},
    {say:["Watch the two arrows on the fireball. The sideways one never changes length; the upward one shrinks, vanishes at the top, then points down.",
          "ดูลูกศรสองอันบนลูกไฟ อันแนวราบไม่เคยเปลี่ยนความยาว อันแนวดิ่งหดลง หายไปที่จุดสูงสุด แล้วชี้ลง"], set:{u:22,th:60}},
    {say:["Cast at 30°, then at 60°. The faint trail is your last cast: the two land on the same spot by very different routes, because 30 + 60 = 90.",
          "ร่ายที่ 30° แล้วที่ 60° รอยจาง ๆ คือการร่ายครั้งก่อน ทั้งสองตกจุดเดียวกันด้วยเส้นทางต่างกันมาก เพราะ 30 + 60 = 90"], set:{u:22,th:30}}
  ]
},

{ id:"circular", x:370, y:150, requires:["independence"], methods:["M-04"],
  title:["Circular motion","การเคลื่อนที่แบบวงกลม"],
  body:[["Going round at steady speed is still accelerated motion, because the direction of the velocity keeps changing. Period T and frequency f are reciprocals, and angular speed ω = 2π/T ties them to the linear speed by v = ωR.",
         "Radians, not degrees, throughout. Slipping in a diameter where the radius belongs, or degrees where radians belong, is trap T-04."],
        ["การวิ่งเป็นวงกลมด้วยอัตราเร็วคงที่ยังเป็นการเคลื่อนที่แบบมีความเร่ง เพราะทิศของความเร็วเปลี่ยนตลอด คาบ T กับความถี่ f เป็นส่วนกลับกัน และอัตราเร็วเชิงมุม ω = 2π/T ผูกทั้งสองเข้ากับอัตราเร็วเชิงเส้นด้วย v = ωR",
         "ใช้เรเดียนไม่ใช่องศาตลอด การใส่เส้นผ่านศูนย์กลางแทนรัศมี หรือองศาแทนเรเดียน คือกับดัก T-04"]],
  formula:["ω = 2π/T = 2πf        v = ωR","ω = 2π/T = 2πf        v = ωR"],
  flabel:["Radians throughout","ใช้เรเดียนตลอด"],
  viz:"plot",
  vizcfg:{
    title:["CENTRIPETAL FORCE AGAINST SPEED","แรงสู่ศูนย์กลาง เทียบ อัตราเร็ว"],
    xlab:["speed v (m/s)","อัตราเร็ว v (m/s)"], ylab:["force needed (N)","แรงที่ต้องใช้ (N)"],
    xmin:0, xmax:20, ymin:0, fill:false,
    fn:function(x,p){ return p.m*x*x/p.r; },
    mark:function(p){ return p.v; },
    ctrls:[
      {k:"m", lab:["Mass","มวล"],       min:.5, max:20, step:.5, def:5, unit:" kg"},
      {k:"r", lab:["Radius","รัศมี"],   min:1, max:20, step:.5, def:5, unit:" m"},
      {k:"v", lab:["Speed","อัตราเร็ว"], min:1, max:19, step:.5, def:8, unit:" m/s"}
    ],
    readouts:[
      {lab:["Force needed","แรงที่ต้องใช้"], f:function(S){
        return fmt2(S.p.m*S.p.v*S.p.v/S.p.r)+" N"; }},
      {lab:["Acceleration","ความเร่ง"], f:function(S){ return fmt2(S.p.v*S.p.v/S.p.r)+" m/s²"; }},
      {lab:["Double the speed?","อัตราเร็วสองเท่า?"], f:function(){
        return L()?"ต้องใช้แรงสี่เท่า":"you need four times the force"; }},
      {lab:["Direction of the force","ทิศของแรง"], f:function(){
        return L()?"เข้าหาศูนย์กลางเสมอ":"always towards the centre"; }}
    ],
    note:["the curve is a parabola, not a line — that is why fast corners are so much harder","เส้นโค้งเป็นพาราโบลาไม่ใช่เส้นตรง นั่นคือเหตุผลที่เข้าโค้งเร็วยากกว่ามาก"]
  } },

{ id:"centripetal", x:370, y:248, requires:["circular"], methods:["M-05"],
  title:["Centripetal force","แรงสู่ศูนย์กลาง"],
  body:[["The acceleration points at the centre and has magnitude v²/R, so the resultant force must too: F = mv²/R. Centripetal force is not an extra force you add to the diagram — it is the job that some real force is already doing.",
         "For a car on a bend, friction is the centripetal force. For a planet, gravity is. For a ball on a string, tension is. Drawing an additional inward arrow labelled 'centripetal' is trap T-03."],
        ["ความเร่งชี้เข้าสู่ศูนย์กลางและมีขนาด v²/R ดังนั้นแรงลัพธ์ก็ต้องเช่นกัน F = mv²/R แรงสู่ศูนย์กลางไม่ใช่แรงพิเศษที่เพิ่มเข้าไปในแผนภาพ แต่คือหน้าที่ที่แรงจริงบางแรงกำลังทำอยู่แล้ว",
         "สำหรับรถเข้าโค้ง แรงเสียดทานคือแรงสู่ศูนย์กลาง สำหรับดาวเคราะห์คือแรงโน้มถ่วง สำหรับลูกบอลผูกเชือกคือแรงตึงเชือก การวาดลูกศรเข้าในเพิ่มแล้วเขียนว่าแรงสู่ศูนย์กลางคือกับดัก T-03"]],
  formula:["a_c = v²/R = ω²R        F_c = mv²/R","a_c = v²/R = ω²R        F_c = mv²/R"],
  flabel:["A role, not an extra arrow","เป็นบทบาท ไม่ใช่ลูกศรเพิ่ม"],
  viz:"vector",
  guide:[
    {say:["Velocity is the tangent; acceleration points to the centre. They are always at 90° to each other.",
          "ความเร็วคือเส้นสัมผัส ส่วนความเร่งชี้เข้าศูนย์กลาง ทั้งสองทำมุม 90° กันเสมอ"], set:{A:12,tA:0,B:12,tB:90}},
    {say:["Because the force is always perpendicular to the motion, it does no work — the speed never changes.",
          "เพราะแรงตั้งฉากกับการเคลื่อนที่เสมอ มันจึงไม่ทำงาน อัตราเร็วจึงไม่เคยเปลี่ยน"], set:{A:14,tA:0,B:6,tB:90}}
  ]},

{ id:"gravitation", x:235, y:346, requires:["centripetal"], methods:["M-06"],
  title:["Orbits","วงโคจร"],
  body:[["A satellite is simply an object whose gravitational attraction supplies exactly the centripetal force it needs. Setting GMm/R² equal to mv²/R makes the satellite's mass cancel: v = √(GM/R).",
         "The same substitution with ω gives T² ∝ R³ — Kepler's third law, derived rather than remembered. A higher orbit is always a slower one."],
        ["ดาวเทียมคือวัตถุที่แรงดึงดูดโน้มถ่วงให้แรงสู่ศูนย์กลางพอดีตามที่ต้องการ การตั้ง GMm/R² เท่ากับ mv²/R ทำให้มวลดาวเทียมตัดกันหมด v = √(GM/R)",
         "การแทนค่าแบบเดียวกันด้วย ω ให้ T² ∝ R³ ซึ่งคือกฎข้อสามของเคปเลอร์ ที่ได้จากการพิสูจน์ไม่ใช่การท่องจำ วงโคจรที่สูงกว่าย่อมช้ากว่าเสมอ"]],
  formula:["v = √(GM/R)        T² ∝ R³","v = √(GM/R)        T² ∝ R³"],
  flabel:["Satellite mass cancels","มวลดาวเทียมตัดหายไป"],
  viz:"plot",
  vizcfg:{
    title:["GRAVITY FALLS OFF AS THE SQUARE","แรงโน้มถ่วงลดลงตามกำลังสอง"],
    xlab:["distance in Earth radii","ระยะทางเป็นเท่าของรัศมีโลก"], ylab:["field strength (N/kg)","ความเข้มสนาม (N/kg)"],
    xmin:1, xmax:10, ymin:0, fill:false,
    fn:function(x,p){ return p.g0/(x*x); },
    mark:function(p){ return p.r; },
    ctrls:[
      {k:"g0", lab:["Surface value","ค่าที่ผิว"], min:2, max:12, step:.2, def:9.8, unit:" N/kg"},
      {k:"r",  lab:["Distance","ระยะทาง"],        min:1, max:9.5, step:.1, def:1, unit:" R"}
    ],
    readouts:[
      {lab:["Field strength there","ความเข้มสนาม ณ ที่นั้น"], f:function(S){
        return fmt2(S.p.g0/(S.p.r*S.p.r))+" N/kg"; }},
      {lab:["Fraction of surface value","สัดส่วนของค่าที่ผิว"], f:function(S){
        return fmt2(100/(S.p.r*S.p.r))+" %"; }},
      {lab:["Double the distance?","ระยะทางสองเท่า?"], f:function(){
        return L()?"เหลือหนึ่งในสี่ ไม่ใช่ครึ่ง":"a quarter, not a half"; }},
      {lab:["Does it ever reach zero?","เป็นศูนย์ได้ไหม"], f:function(){
        return L()?"ไม่ — เข้าใกล้แต่ไม่ถึง":"no — it approaches but never arrives"; }}
    ],
    note:["halving is not enough — at twice the distance the field is a quarter","ลดครึ่งยังไม่พอ ที่ระยะสองเท่าสนามเหลือหนึ่งในสี่"]
  } }
],

methods:[
{id:"M-01", name:["Resolve the launch velocity","แตกความเร็วต้น"]},
{id:"M-02", name:["Find flight time and maximum height","หาเวลาบินและความสูงสุด"]},
{id:"M-03", name:["Find range and use complementary angles","หาระยะและใช้มุมประกอบ"]},
{id:"M-04", name:["Convert between v, ω, T and f","แปลงระหว่าง v, ω, T และ f"]},
{id:"M-05", name:["Apply F = mv²/R","ใช้ F = mv²/R"]},
{id:"M-06", name:["Orbital speed and period","อัตราเร็วและคาบของวงโคจร"]}
],

traps:{
"T-01":["You used the full launch speed where a component belongs. Split into u cos θ and u sin θ first.","คุณใช้อัตราเร็วต้นเต็มในที่ที่ควรเป็นองค์ประกอบ ต้องแตกเป็น u cos θ และ u sin θ ก่อน"],
"T-02":["At the apex only the vertical velocity is zero. The horizontal component carries straight on.","ที่จุดสูงสุดมีเพียงความเร็วแนวดิ่งที่เป็นศูนย์ องค์ประกอบแนวราบยังคงเดินหน้าต่อ"],
"T-03":["Centripetal force is not an extra force. It is the name for whichever real force points at the centre.","แรงสู่ศูนย์กลางไม่ใช่แรงเพิ่ม แต่เป็นชื่อเรียกแรงจริงที่ชี้เข้าศูนย์กลาง"],
"T-04":["Radius and diameter, or degrees and radians, were mixed up.","สับสนระหว่างรัศมีกับเส้นผ่านศูนย์กลาง หรือองศากับเรเดียน"]
},

gen:{
"M-01": function(sf){
  var u=pick([20,25,30,40]), th=pick([30,37,45,53,60]);
  var S={30:0.5,37:0.602,45:0.707,53:0.799,60:0.866}[th];
  var C={30:0.866,37:0.799,45:0.707,53:0.602,60:0.5}[th];
  if(sf==="S-04") return {stem:["A projectile is launched at angle θ. Which component stays constant throughout the flight?",
                                "ยิงวัตถุด้วยมุม θ องค์ประกอบใดคงที่ตลอดการเคลื่อนที่"],
    opts:[{v:["The horizontal component, u cos θ","องค์ประกอบแนวราบ u cos θ"],ok:1},
          {v:["The vertical component, u sin θ","องค์ประกอบแนวดิ่ง u sin θ"],trap:"T-02"},
          {v:["The full speed u","อัตราเร็วเต็ม u"],trap:"T-01"},
          {v:["Neither component","ไม่มีองค์ประกอบใด"]}],unit:""};
  return {stem:["A ball is launched at "+u+" m/s and "+th+"°. Find its initial vertical velocity.",
                "ยิงลูกบอลด้วย "+u+" ม./วินาที ที่มุม "+th+"° จงหาความเร็วแนวดิ่งเริ่มต้น"],
    opts:[{v:fmt(u*S),ok:1},{v:fmt(u*C),trap:"T-01"},{v:String(u),trap:"T-01"},{v:fmt(u*S/2)}],unit:" m/s"};
},
"M-02": function(sf){
  var u=pick([20,30,40]), th=pick([30,45,60]), g=10;
  var S={30:0.5,45:0.707,60:0.866}[th], uy=u*S;
  var tf=2*uy/g, H=uy*uy/(2*g);
  if(sf==="S-02"||sf==="S-05") return {stem:["A projectile reaches a maximum height of "+fmt(H)+" m. Find its initial vertical velocity, with g = 10 m/s².",
                                             "วัตถุขึ้นถึงความสูงสุด "+fmt(H)+" เมตร ให้ g = 10 ม./วินาที² จงหาความเร็วแนวดิ่งเริ่มต้น"],
    opts:[{v:fmt(uy),ok:1},{v:fmt(2*H/g)},{v:fmt(H*g)},{v:fmt(uy*2)}],unit:" m/s"};
  if(sf==="S-04") return {stem:["How does the time to reach the top compare with the total flight time?",
                                "เวลาที่ขึ้นถึงจุดสูงสุดเทียบกับเวลาบินทั้งหมดเป็นอย่างไร"],
    opts:[{v:["It is exactly half","เป็นครึ่งหนึ่งพอดี"],ok:1},{v:["It is the same","เท่ากัน"],trap:"T-02"},
          {v:["It is one third","เป็นหนึ่งในสาม"]},{v:["It depends on the angle","ขึ้นกับมุม"]}],unit:""};
  return {stem:["A ball is launched at "+u+" m/s and "+th+"° over level ground. Find its time of flight, with g = 10 m/s².",
                "ยิงลูกบอลด้วย "+u+" ม./วินาที ที่ "+th+"° บนพื้นราบ ให้ g = 10 ม./วินาที² จงหาเวลาบิน"],
    opts:[{v:fmt(tf),ok:1},{v:fmt(tf/2),trap:"T-02"},{v:fmt(u/g),trap:"T-01"},{v:fmt(H)}],unit:" s"};
},
"M-03": function(sf){
  var u=pick([20,30,40]), th=pick([30,37,45,53]), g=10;
  var R=u*u*Math.sin(2*th*Math.PI/180)/g;
  if(sf==="S-04") return {stem:["Which pair of launch angles gives the same range?",
                                "มุมยิงคู่ใดให้ระยะเท่ากัน"],
    opts:[{v:"30° and 60°",ok:1},{v:"30° and 45°"},{v:"20° and 80°"},{v:"45° and 90°"}],unit:""};
  if(sf==="S-05") return {stem:["A projectile launched at 45° travels "+fmt(u*u/g)+" m. Find its launch speed, with g = 10 m/s².",
                                "วัตถุที่ยิงด้วยมุม 45° ไปได้ไกล "+fmt(u*u/g)+" เมตร ให้ g = 10 ม./วินาที² จงหาอัตราเร็วต้น"],
    opts:[{v:String(u),ok:1},{v:fmt(u*u/g)},{v:fmt(u/2)},{v:fmt(u*Math.SQRT2)}],unit:" m/s"};
  return {stem:["Find the range of a projectile launched at "+u+" m/s and "+th+"°, with g = 10 m/s².",
                "จงหาระยะของวัตถุที่ยิงด้วย "+u+" ม./วินาที ที่ "+th+"° ให้ g = 10 ม./วินาที²"],
    opts:[{v:fmt(R),ok:1},{v:fmt(u*u/g),trap:"T-01"},{v:fmt(R/2)},{v:fmt(u*Math.sin(th*Math.PI/180)/g)}],unit:" m"};
},
"M-04": function(sf){
  var T=pick([0.5,2,4,5]), R=pick([0.5,2,3,4]);
  var w=2*Math.PI/T, v=w*R;
  if(sf==="S-05") return {stem:["A point moves in a circle of radius "+R+" m at "+fmt(v)+" m/s. Find its angular speed.",
                                "จุดหนึ่งเคลื่อนที่เป็นวงกลมรัศมี "+R+" เมตร ด้วย "+fmt(v)+" ม./วินาที จงหาอัตราเร็วเชิงมุม"],
    opts:[{v:fmt(w),ok:1},{v:fmt(v*R),trap:"T-04"},{v:fmt(v/(2*R)),trap:"T-04"},{v:fmt(v)}],unit:" rad/s"};
  if(sf==="S-04") return {stem:["A wheel completes one revolution in time T. What is its angular speed?",
                                "ล้อหมุนครบหนึ่งรอบในเวลา T อัตราเร็วเชิงมุมเป็นเท่าใด"],
    opts:[{v:"2π / T",ok:1},{v:"360 / T",trap:"T-04"},{v:"1 / T"},{v:"π / T"}],unit:""};
  return {stem:["An object circles with period "+T+" s at radius "+R+" m. Find its linear speed.",
                "วัตถุเคลื่อนที่เป็นวงกลม คาบ "+T+" วินาที รัศมี "+R+" เมตร จงหาอัตราเร็วเชิงเส้น"],
    opts:[{v:fmt(v),ok:1},{v:fmt(v*2),trap:"T-04"},{v:fmt(R/T)},{v:fmt(w)}],unit:" m/s"};
},
"M-05": function(sf){
  var m=pick([0.5,1,2,4]), v=pick([4,6,10]), R=pick([2,4,5]);
  var F=m*v*v/R;
  if(sf==="S-04") return {stem:["A car rounds a bend at steady speed. Which real force provides the centripetal force?",
                                "รถเลี้ยวโค้งด้วยอัตราเร็วคงที่ แรงจริงใดทำหน้าที่เป็นแรงสู่ศูนย์กลาง"],
    opts:[{v:["Friction between tyres and road","แรงเสียดทานระหว่างยางกับถนน"],ok:1},
          {v:["An extra centripetal force acting inward","แรงสู่ศูนย์กลางพิเศษที่กระทำเข้าใน"],trap:"T-03"},
          {v:["The weight of the car","น้ำหนักของรถ"]},
          {v:["The normal force from the road","แรงตั้งฉากจากถนน"]}],unit:""};
  if(sf==="S-05") return {stem:["A "+m+" kg mass needs "+fmt(F)+" N to circle at radius "+R+" m. Find its speed.",
                                "มวล "+m+" กิโลกรัม ต้องใช้แรง "+fmt(F)+" นิวตัน เพื่อวิ่งเป็นวงกลมรัศมี "+R+" เมตร จงหาอัตราเร็ว"],
    opts:[{v:String(v),ok:1},{v:fmt(F*R/m),trap:"T-04"},{v:fmt(F/m)},{v:fmt(v*2)}],unit:" m/s"};
  return {stem:["A "+m+" kg body moves at "+v+" m/s in a circle of radius "+R+" m. Find the centripetal force.",
                "วัตถุมวล "+m+" กิโลกรัม เคลื่อนที่ด้วย "+v+" ม./วินาที เป็นวงกลมรัศมี "+R+" เมตร จงหาแรงสู่ศูนย์กลาง"],
    opts:[{v:fmt(F),ok:1},{v:fmt(m*v/R)},{v:fmt(m*v*v/(2*R)),trap:"T-04"},{v:fmt(m*v*v*R)}],unit:" N"};
},
"M-06": function(sf){
  if(sf==="S-04") return {stem:["Two satellites of different mass orbit at the same radius. What can be said of their speeds?",
                                "ดาวเทียมสองดวงมวลต่างกันโคจรที่รัศมีเดียวกัน อัตราเร็วเป็นอย่างไร"],
    opts:[{v:["Identical — satellite mass cancels","เท่ากัน เพราะมวลดาวเทียมตัดหายไป"],ok:1},
          {v:["The heavier one is faster","ดวงที่หนักกว่าเร็วกว่า"]},
          {v:["The lighter one is faster","ดวงที่เบากว่าเร็วกว่า"]},
          {v:["It depends on their shapes","ขึ้นกับรูปร่างของดาวเทียม"]}],unit:""};
  if(sf==="S-03") return {stem:["A satellite is moved to a higher orbit. What happens to its orbital period?",
                                "ย้ายดาวเทียมไปวงโคจรที่สูงขึ้น คาบการโคจรเปลี่ยนอย่างไร"],
    opts:[{v:["It increases, since T² ∝ R³","เพิ่มขึ้น เพราะ T² ∝ R³"],ok:1},
          {v:["It decreases","ลดลง"]},{v:["It is unchanged","เท่าเดิม"]},
          {v:["It depends on the satellite's mass","ขึ้นกับมวลของดาวเทียม"]}],unit:""};
  var k=pick([2,3,4]);
  return {stem:["A satellite's orbital radius is increased by a factor of "+k+". By what factor does T² increase?",
                "รัศมีวงโคจรของดาวเทียมเพิ่มขึ้น "+k+" เท่า T² เพิ่มขึ้นกี่เท่า"],
    opts:[{v:String(k*k*k),ok:1},{v:String(k*k),trap:"T-04"},{v:String(k)},{v:fmt(Math.sqrt(k))}],unit:"×"};
}
}
};
