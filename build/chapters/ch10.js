/* Chapter 10 scrying pool: two runes ripple in step; brightness on the
   screen comes from the exact path difference, not the small-angle sum. */
var C10 = {
  x0: 70, y0: 150, k: 7.6, v: 10,
  dx: function(p){ return p.lam * p.L / p.d; },
  I: function(p, y){
    var r1 = Math.sqrt(p.L * p.L + (y + p.d / 2) * (y + p.d / 2)), r2 = Math.sqrt(p.L * p.L + (y - p.d / 2) * (y - p.d / 2));
    var c = Math.cos(Math.PI * (r1 - r2) / p.lam); return c * c;
  },
  /* ripple colour follows wavelength, violet to red, as light's would */
  hue: function(lam){ return "hsl(" + Math.round(275 - (lam - 1) / 2 * 275) + " 95% 62%)"; },
  cands: function(p){
    var c = [p.lam * p.L / p.d, p.lam * p.d / p.L, p.lam * p.L / (2 * p.d), 2 * p.lam * p.L / p.d], u = [];
    c.forEach(function(v){ if(u.every(function(w){ return Math.abs(w - v) > 0.05; })) u.push(v); });
    return u.sort(function(a, b){ return a - b; });
  }
};

var CHAPTER = {
id:"ch10", num:"10", slug:"wave-optics", subject:"physics",
kicker:["Physics · Chapter 10","ฟิสิกส์ · บทที่ 10"],
title:["Wave Optics","แสงเชิงคลื่น"],
mapTitle:["Proof that light is a wave","หลักฐานว่าแสงเป็นคลื่น"],
lede:["Rays cannot explain why two beams of light can add up to darkness. Interference can, and the pattern it makes is the measurement that pinned down the wavelength of light itself.",
      "แนวรังสีอธิบายไม่ได้ว่าทำไมลำแสงสองลำจึงรวมกันแล้วเกิดความมืด แต่การแทรกสอดอธิบายได้ และลวดลายที่เกิดขึ้นคือการวัดที่ระบุความยาวคลื่นของแสงได้เป็นครั้งแรก"],
next:["→ continues in Chapter 11 · Ray Optics","→ ต่อในบทที่ 11 · แสงเชิงรังสี"],

nodes:[
{ id:"coherence", x:235, y:52, requires:[], methods:["M-06"],
  title:["Coherence","ความอาพันธ์"],
  body:[["Two sources interfere visibly only if they keep a constant phase relationship. Two separate lamps never do — their phases jitter randomly, and the pattern washes out faster than any eye can follow.",
         "Young's solution was to split one source into two, so both halves inherit the same phase history. A laser achieves the same thing directly. Without coherence there is still interference at every instant, just no stable pattern to see."],
        ["แหล่งกำเนิดสองแหล่งจะแทรกสอดให้เห็นได้ก็ต่อเมื่อรักษาความสัมพันธ์ของเฟสให้คงที่ หลอดไฟสองดวงแยกกันทำไม่ได้ เพราะเฟสกระเพื่อมสุ่มไปมา ลวดลายจึงเลือนหายเร็วกว่าที่ตาจะตามทัน",
         "ทางออกของยังคือแยกแหล่งกำเนิดเดียวออกเป็นสอง ทั้งสองครึ่งจึงสืบทอดประวัติเฟสเดียวกัน เลเซอร์ทำสิ่งเดียวกันได้โดยตรง หากไม่มีความอาพันธ์ การแทรกสอดยังเกิดทุกขณะ เพียงแต่ไม่มีลวดลายนิ่งให้เห็น"]],
  formula:["Constant phase difference","ผลต่างเฟสคงที่"],
  flabel:["One source, split in two","แหล่งเดียว แยกเป็นสอง"],
  viz:"plot",
  vizcfg:{
    title:["INTENSITY AGAINST PHASE DIFFERENCE","ความเข้ม เทียบ ผลต่างเฟส"],
    xlab:["phase difference (degrees)","ผลต่างเฟส (องศา)"], ylab:["intensity","ความเข้ม"],
    xmin:0, xmax:720, ymin:0, fill:true,
    fn:function(x,p){
      var c=Math.cos(x*Math.PI/360);
      return p.coh===1 ? 4*p.I0*c*c : 2*p.I0;
    },
    mark:function(p){ return p.ph; },
    ctrls:[
      {k:"coh", lab:["",""], opts:[["incoherent","ไม่อาพันธ์"], ["coherent","อาพันธ์"]], min:0, def:1, unit:""},
      {k:"I0",  lab:["Intensity of each source","ความเข้มของแต่ละแหล่ง"], min:1, max:10, step:.5, def:4, unit:""},
      {k:"ph",  lab:["Phase difference","ผลต่างเฟส"], min:0, max:720, step:10, def:0, unit:"°"}
    ],
    readouts:[
      {lab:["Intensity there","ความเข้ม ณ จุดนั้น"], f:function(S){
        var p=S.p, c=Math.cos(p.ph*Math.PI/360);
        return fmt2(p.coh===1 ? 4*p.I0*c*c : 2*p.I0); }},
      {lab:["Maximum possible","สูงสุดที่เป็นไปได้"], f:function(S){
        return S.p.coh===1 ? fmt2(4*S.p.I0)+(L()?" · สี่เท่าของแหล่งเดียว":" · four times one source")
                           : fmt2(2*S.p.I0); }},
      {lab:["Pattern visible?","เห็นลวดลายไหม"], f:function(S){
        return S.p.coh===1 ? (L()?"เห็น — ริ้วคงที่":"yes — the fringes hold still")
                           : (L()?"ไม่เห็น — เฉลี่ยจนเรียบ":"no — it averages flat"); }},
      {lab:["Total energy","พลังงานรวม"], f:function(S){
        return L()?"เท่าเดิม — แค่กระจายใหม่":"unchanged — merely redistributed"; }}
    ],
    note:["incoherent sources give a flat line — no dark fringes, no bright ones","แหล่งที่ไม่อาพันธ์ให้เส้นราบ ไม่มีทั้งริ้วมืดและริ้วสว่าง"]
  },
  guide:[
    {say:["Coherent sources. Intensity swings between four times one source and total darkness.",
          "แหล่งอาพันธ์ ความเข้มแกว่งระหว่างสี่เท่าของแหล่งเดียวกับความมืดสนิท"], set:{coh:1,I0:4,ph:0}},
    {say:["At 180° the two cancel completely — a dark fringe where light plus light gives nothing.",
          "ที่ 180° ทั้งสองหักล้างกันหมด เกิดริ้วมืดที่แสงบวกแสงแล้วได้ความมืด"], set:{coh:1,I0:4,ph:180}},
    {say:["Break the coherence and the curve flattens to the plain sum. No fringes at all.",
          "ทำลายความอาพันธ์ เส้นโค้งแบนราบเป็นผลบวกธรรมดา ไม่มีริ้วเลย"], set:{coh:0,I0:4,ph:180}}
  ] },

{ id:"double-slit", x:100, y:150, requires:["coherence"], methods:["M-01","M-02"],
  title:["The double slit","สลิตคู่"],
  body:[["Light from two narrow slits overlaps on a screen. Where the path difference is a whole number of wavelengths the waves arrive in step and the screen is bright; where it is an odd number of half wavelengths they cancel and it is dark.",
         "For small angles the bright fringes are evenly spaced, Δx = λL/d. Note that d is the slit separation and L the slit-to-screen distance — swapping them is trap T-03, and it is the most common arithmetic error in this chapter."],
        ["แสงจากสลิตแคบสองช่องซ้อนทับกันบนฉาก ที่ใดผลต่างทางเดินเป็นจำนวนเต็มเท่าของความยาวคลื่น คลื่นจะมาถึงพร้อมกันและฉากสว่าง ที่ใดเป็นจำนวนคี่ของครึ่งความยาวคลื่น คลื่นจะหักล้างกันและฉากมืด",
         "สำหรับมุมเล็ก แถบสว่างจะเรียงห่างเท่าๆ กัน Δx = λL/d สังเกตว่า d คือระยะห่างระหว่างสลิต และ L คือระยะจากสลิตถึงฉาก การสลับกันคือกับดัก T-03 และเป็นข้อผิดพลาดทางเลขที่พบบ่อยที่สุดในบทนี้"]],
  formula:["Bright: d sin θ = nλ        Δx = λL / d","สว่าง: d sin θ = nλ        Δx = λL / d"],
  flabel:["n = 0, 1, 2, … from the centre","n = 0, 1, 2, … นับจากกึ่งกลาง"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["Two Runes in the Pool: path difference makes fringes","สองรูนในสระ: ผลต่างระยะทางทำให้เกิดแถบ"],
    question:["Two runes ripple in step. Why does the far screen light up in bands — and what spaces them out?",
              "รูนสองอันส่งระลอกพร้อมกัน ทำไมฉากฝั่งไกลจึงสว่างเป็นแถบ และอะไรกำหนดระยะห่างของแถบ"],
    ctrls:[
      {k:"lam", lab:["Ripple wavelength λ","ความยาวคลื่นระลอก λ"], min:1, max:3, step:.1, def:2, unit:" cm"},
      {k:"d",   lab:["Rune separation d","ระยะห่างรูน d"], min:3, max:12, step:.5, def:6, unit:" cm"},
      {k:"L",   lab:["Distance to screen L","ระยะถึงฉาก L"], min:20, max:55, step:1, def:40, unit:" cm"}
    ],
    duration:function(p){ return Math.sqrt(p.L*p.L+15*15)/C10.v+1.5; },
    readouts:[
      {lab:["Band spacing Δx","ระยะห่างแถบ Δx"], f:function(S){ return fmt2(C10.dx(S.p))+" cm"; }},
      {lab:["Bright bands on the screen","แถบสว่างบนฉาก"], f:function(S){ return String(2*Math.floor(15/C10.dx(S.p))+1); }},
      {lab:["Same spell for light","สูตรเดียวกันกับแสง"], f:function(){ return "550 nm · 0.3 mm · 2 m → 3.7 mm"; }}
    ],
    world:{ kind:"free" },
    scene:function(o,S,W){
      var p=S.p, x0=C10.x0, y0=C10.y0, k=C10.k, sx=x0+p.L*k, top=y0-15*k, bot=y0+15*k, col=C10.hue(p.lam);
      var s1=[x0, y0-p.d/2*k], s2=[x0, y0+p.d/2*k], R=C10.v*S.t;
      o.push('<rect x="'+(x0-18)+'" y="'+fmt2(top-8)+'" width="'+fmt2(sx-x0+36)+'" height="'+fmt2(bot-top+16)+'" rx="10" fill="var(--surface)" fill-opacity=".35" stroke="var(--rule)"/>');
      o.push('<clipPath id="c10clip"><rect x="'+(x0-18)+'" y="'+fmt2(top-8)+'" width="'+fmt2(sx-x0+18)+'" height="'+fmt2(bot-top+16)+'"/></clipPath>');
      o.push('<g clip-path="url(#c10clip)">');
      [[s1,"var(--accent)","l1"],[s2,"var(--accent2)","l2"]].forEach(function(s){
        for(var r=R; r>0; r-=p.lam){
          o.push('<circle cx="'+s[0][0]+'" cy="'+fmt2(s[0][1])+'" r="'+fmt2(r*k)+'" fill="none" stroke="'+s[1]+'" stroke-width="'+(S.hl==="lam"?1.8:1.1)+'" opacity="'+fmt2(Math.max(0.12,0.55-r/120))+'"/>');
        }
      });
      o.push('</g>');
      /* the separation and the distance, measured on the pool itself */
      var hd=S.hl==="d", hL=S.hl==="L";
      o.push('<line x1="'+(x0-10)+'" y1="'+fmt2(s1[1])+'" x2="'+(x0-10)+'" y2="'+fmt2(s2[1])+'" stroke="var(--warn)" stroke-width="'+(hd?3:1.5)+'"/>');
      fitText(o, x0-14, y0+4, ["d","d"], 30, 11, "var(--warn)", "end");
      o.push('<line x1="'+x0+'" y1="'+fmt2(bot+16)+'" x2="'+fmt2(sx)+'" y2="'+fmt2(bot+16)+'" stroke="var(--good)" stroke-width="'+(hL?3:1.4)+'"/>');
      fitText(o, (x0+sx)/2, bot+30, ["L = "+p.L+" cm","L = "+p.L+" ซม."], 120, 10.5, "var(--good)", "middle");
      role("source")(o, s1[0], s1[1], {clock:STAGE.clock, col:"var(--accent)"});
      role("source")(o, s2[0], s2[1], {clock:STAGE.clock, col:"var(--accent2)"});
      role("screen")(o, sx, top, bot);
      /* the screen lights only where both ripples have arrived */
      if(!STAGE.guessing(S)) for(var y=-15; y<=15.001; y+=0.25){
        var r1=Math.sqrt(p.L*p.L+(y+p.d/2)*(y+p.d/2)), r2=Math.sqrt(p.L*p.L+(y-p.d/2)*(y-p.d/2));
        if(R<Math.max(r1,r2)) continue;
        var I=C10.I(p,y);
        if(I>0.04) o.push('<rect x="'+fmt2(sx+5)+'" y="'+fmt2(y0+y*k-1.1)+'" width="16" height="2.4" fill="'+col+'" opacity="'+fmt2(I)+'"/>');
      }
    },
    handles:[
      {k:"d", at:function(p){ return {px:C10.x0, py:C10.y0+p.d/2*C10.k}; }, set:function(px,py){ return {d:2*(py-C10.y0)/C10.k}; },
       lab:["drag the rune","ลากรูน"], labBelow:true, col:"accent2"},
      {k:"L", at:function(p){ return {px:C10.x0+p.L*C10.k+34, py:C10.y0}; }, set:function(px){ return {L:(px-34-C10.x0)/C10.k}; },
       lab:["drag the screen","ลากฉาก"], labBelow:true, col:"good"}
    ],
    instrument:{ kind:"graph",
      xmin:-15, xmax:15, ymin:0, ymax:1,
      xlab:["position on the screen (cm)","ตำแหน่งบนฉาก (ซม.)"], ylab:["brightness","ความสว่าง"],
      fn:function(x,p){ return C10.I(p,x); }
    },
    overlay:function(o,S,G){
      var dx=C10.dx(S.p), y=G.Y(0)+0, hl=S.hl==="dx";
      if(dx<15){
        var x1=G.X(0), x2=G.X(dx), yy=G.Y(1)+12;
        o.push('<line x1="'+fmt2(x1)+'" y1="'+fmt2(yy)+'" x2="'+fmt2(x2)+'" y2="'+fmt2(yy)+'" stroke="var(--warn)" stroke-width="'+(hl?3.4:2)+'"/>');
        o.push('<text x="'+fmt2((x1+x2)/2)+'" y="'+fmt2(yy-5)+'" fill="var(--warn)" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">Δx = '+fmt2(dx)+' cm</text>');
      }
    },
    spell:{
      tex:function(p){ return "\\Delta x = \\dfrac{\\lambda L}{d} = \\dfrac{("+fmt2(p.lam)+")("+p.L+")}{"+fmt2(p.d)+"} = "+fmt2(C10.dx(p))+"\\,\\text{cm}"+
                              "\\qquad\\left[\\tfrac{\\text{cm}\\cdot\\text{cm}}{\\text{cm}}=\\text{cm}\\right]"; },
      terms:[
        {k:"lam", sym:"λ", lab:["ripple wavelength","ความยาวคลื่น"], col:"accent", f:function(p){ return fmt2(p.lam)+" cm"; }},
        {k:"L", sym:"L", lab:["runes to screen","รูนถึงฉาก"], col:"good", f:function(p){ return p.L+" cm"; }},
        {k:"d", sym:"d", lab:["between the runes","ระหว่างรูน"], col:"warn", f:function(p){ return fmt2(p.d)+" cm"; }},
        {k:"dx", sym:"Δx", lab:["band spacing","ระยะแถบ"], col:"warn", f:function(p){ return fmt2(C10.dx(p))+" cm"; }}
      ]
    },
    predict:{ kind:"choice",
      ask:["How far apart will the bright bands on the screen be?","แถบสว่างบนฉากจะห่างกันเท่าใด"],
      opts:function(p){ return C10.cands(p).map(function(v){ return ["≈ "+fmt2(v)+" cm","≈ "+fmt2(v)+" ซม."]; }); },
      actual:function(p){ var c=C10.cands(p), v=C10.dx(p), b=0; c.forEach(function(w,i){ if(Math.abs(w-v)<Math.abs(c[b]-v)) b=i; }); return b; },
      explain:function(p){ return ["Δx = λL / d = "+fmt2(p.lam)+" × "+p.L+" / "+fmt2(p.d)+" = "+fmt2(C10.dx(p))+" cm. Writing λd / L instead swaps the slit gap and the screen distance — trap T-03.",
                                   "Δx = λL / d = "+fmt2(p.lam)+" × "+p.L+" / "+fmt2(p.d)+" = "+fmt2(C10.dx(p))+" ซม. ถ้าเขียน λd / L จะเป็นการสลับระยะห่างสลิตกับระยะถึงฉาก — กับดัก T-03"]; }
    },
    trials:{
      veil:true,
      make:function(){
        var kind=pick(["d","L","lam"]), lam, d, L, n=0;
        do{ lam=ri(10,30)/10; d=ri(6,24)/2; L=ri(20,55); n++; } while((lam*L/d<2 || lam*L/d>12) && n<500);
        return {kind:kind, lam:lam, d:d, L:L, X:lam*L/d, set:kind==="d"?{lam:lam,L:L,d:(d>7?3:12)}:(kind==="L"?{lam:lam,d:d,L:(L>37?20:55)}:{d:d,L:L,lam:(lam>2?1:3)})};
      },
      lockFor:function(g){ return g.kind==="d" ? ["lam","L"] : (g.kind==="L" ? ["lam","d"] : ["d","L"]); },
      say:function(g){
        var X=fmt2(g.X);
        if(g.kind==="d") return ["With λ = "+g.lam+" cm and the screen "+g.L+" cm away, place the runes so the bright bands are exactly "+X+" cm apart.",
                                 "เมื่อ λ = "+g.lam+" ซม. และฉากอยู่ห่าง "+g.L+" ซม. วางรูนให้แถบสว่างห่างกัน "+X+" ซม. พอดี"];
        if(g.kind==="L") return ["With λ = "+g.lam+" cm and the runes "+g.d+" cm apart, move the screen so the bright bands are exactly "+X+" cm apart.",
                                 "เมื่อ λ = "+g.lam+" ซม. และรูนห่างกัน "+g.d+" ซม. เลื่อนฉากให้แถบสว่างห่างกัน "+X+" ซม. พอดี"];
        return ["The runes are "+g.d+" cm apart and the screen "+g.L+" cm away. Choose the ripple wavelength that spaces the bands exactly "+X+" cm apart.",
                "รูนห่างกัน "+g.d+" ซม. และฉากอยู่ห่าง "+g.L+" ซม. เลือกความยาวคลื่นที่ทำให้แถบห่างกัน "+X+" ซม. พอดี"];
      },
      check:function(p,S,g){
        var dx=C10.dx(p), ok=Math.abs(dx-g.X)<0.01;
        if(ok) return {ok:true, msg:["Bands "+fmt2(dx)+" cm apart. Rearranging Δx = λL / d: "+(g.kind==="d"?"d = λL / Δx = "+fmt2(g.d)+" cm":g.kind==="L"?"L = Δx·d / λ = "+g.L+" cm":"λ = Δx·d / L = "+fmt2(g.lam)+" cm")+".",
                                       "แถบห่างกัน "+fmt2(dx)+" ซม. จัดรูป Δx = λL / d: "+(g.kind==="d"?"d = λL / Δx = "+fmt2(g.d)+" ซม.":g.kind==="L"?"L = Δx·d / λ = "+g.L+" ซม.":"λ = Δx·d / L = "+fmt2(g.lam)+" ซม.")]};
        return {ok:false, msg:["The bands came out "+fmt2(dx)+" cm apart. Wider runes squeeze the bands; a farther screen spreads them.",
                               "แถบห่างกัน "+fmt2(dx)+" ซม. รูนที่ห่างกันมากทำให้แถบชิดกัน ฉากที่ไกลขึ้นทำให้แถบห่างกัน"]};
      }
    },
    note:["where crest meets crest the pool swells and the screen glows; where crest meets trough it stays dark",
          "ที่ยอดพบยอด น้ำในสระนูนขึ้นและฉากเรืองแสง ที่ยอดพบท้อง ฉากยังคงมืด"]
  },
  guide:[
    {say:["Press play. Ripples spread from both runes; once both reach the screen, it lights up in evenly spaced bands.",
          "กดเล่น ระลอกแผ่จากรูนทั้งสอง เมื่อทั้งสองไปถึงฉาก ฉากจะสว่างเป็นแถบที่ห่างเท่า ๆ กัน"], set:{lam:2,d:6,L:40}},
    {say:["Pull the runes further apart. The bands squeeze together — d is on the bottom of the spell.",
          "ดึงรูนให้ห่างกันมากขึ้น แถบจะชิดกันเข้า d อยู่ตัวส่วนของบทร่าย"], set:{lam:2,d:12,L:40}},
    {say:["Longer ripples, farther screen: the bands spread wide. Mixing up d and L is trap T-03.",
          "ระลอกยาวขึ้น ฉากไกลขึ้น แถบกระจายห่าง การสลับ d กับ L คือกับดัก T-03"], set:{lam:3,d:6,L:55}}
  ]
},

{ id:"single-slit", x:370, y:150, requires:["coherence"], methods:["M-03"],
  title:["The single slit","สลิตเดี่ยว"],
  body:[["One slit alone still produces a pattern, because different parts of the same slit interfere with each other. Its condition looks deceptively like the double slit's but means the opposite: d sin θ = nλ gives the dark fringes, not the bright ones.",
         "The central maximum is twice as wide as the others and much brighter. Reading the single-slit condition as a bright-fringe rule is trap T-01."],
        ["สลิตเดี่ยวเพียงช่องเดียวก็ยังให้ลวดลายได้ เพราะส่วนต่างๆ ของสลิตเดียวกันแทรกสอดกันเอง เงื่อนไขของมันดูคล้ายสลิตคู่อย่างน่าหลอก แต่ความหมายตรงข้าม d sin θ = nλ ให้แถบมืด ไม่ใช่แถบสว่าง",
         "แถบสว่างกลางกว้างเป็นสองเท่าของแถบอื่นและสว่างกว่ามาก การอ่านเงื่อนไขสลิตเดี่ยวเป็นกฎของแถบสว่างคือกับดัก T-01"]],
  formula:["Dark: d sin θ = nλ ,  n = 1, 2, 3, …","มืด: d sin θ = nλ ,  n = 1, 2, 3, …"],
  flabel:["Same formula, opposite meaning","สูตรเดียวกัน ความหมายตรงข้าม"],
  viz:"plot",
  vizcfg:{
    title:["SINGLE-SLIT DIFFRACTION PATTERN","ลวดลายการเลี้ยวเบนจากช่องเดี่ยว"],
    xlab:["angle (degrees)","มุม (องศา)"], ylab:["intensity","ความเข้ม"],
    xmin:-30, xmax:30, ymin:0, fill:true,
    fn:function(x,p){
      var b=Math.PI*p.a*Math.sin(x*Math.PI/180)/(p.lam/1000);
      if(Math.abs(b)<1e-6) return 1;
      var s=Math.sin(b)/b; return s*s;
    },
    ctrls:[
      {k:"a",   lab:["Slit width a","ความกว้างช่อง a"], min:.002, max:.03, step:.002, def:.01, unit:" mm"},
      {k:"lam", lab:["Wavelength λ","ความยาวคลื่น λ"], min:400, max:700, step:10, def:550, unit:" nm"}
    ],
    readouts:[
      {lab:["First minimum at","จุดมืดแรกที่"], f:function(S){
        var r=(S.p.lam/1000)/S.p.a;
        return r>=1 ? (L()?"ไม่มี — ช่องแคบเกินไป":"none — the slit is too narrow")
                    : fmt2(Math.asin(r)*180/Math.PI)+"°"; }},
      {lab:["Central peak width","ความกว้างพีคกลาง"], f:function(S){
        var r=(S.p.lam/1000)/S.p.a;
        return r>=1 ? (L()?"กว้างเต็มจอ":"fills the screen") : fmt2(2*Math.asin(r)*180/Math.PI)+"°"; }},
      {lab:["Narrower slit?","ช่องแคบลง?"], f:function(){
        return L()?"ลวดลายกว้างขึ้น — สวนทางกับสัญชาตญาณ":"the pattern spreads WIDER — counter-intuitive"; }},
      {lab:["Central peak brightness","ความสว่างพีคกลาง"], f:function(){
        return L()?"สว่างกว่าพีคข้างมาก":"far brighter than any side peak"; }}
    ],
    note:["a sin θ = nλ locates the DARK fringes here, not the bright ones","ที่นี่ a sin θ = nλ บอกตำแหน่งริ้วมืด ไม่ใช่ริ้วสว่าง"]
  },
  guide:[
    {say:["The central maximum dominates, with much fainter peaks either side.",
          "พีคกลางเด่นที่สุด โดยมีพีคข้างที่จางกว่ามากอยู่สองข้าง"], set:{a:.01,lam:550}},
    {say:["Narrow the slit and the pattern spreads out. Squeezing the light makes it fan wider.",
          "ทำให้ช่องแคบลง ลวดลายกลับแผ่กว้างขึ้น การบีบแสงทำให้มันบานออก"], set:{a:.004,lam:550}},
    {say:["Widen it instead and everything contracts towards a single sharp beam.",
          "ทำให้ช่องกว้างขึ้น ทุกอย่างหดเข้าหาลำแสงคมเส้นเดียว"], set:{a:.03,lam:550}}
  ] },

{ id:"grating", x:235, y:248, requires:["double-slit","single-slit"], methods:["M-04"],
  title:["The diffraction grating","เกรตติง"],
  body:[["A grating is thousands of slits instead of two. The bright fringes obey the same d sin θ = nλ, but because so many slits contribute they become extremely narrow and sharp — which is what makes a grating a precision instrument rather than a demonstration.",
         "Gratings are specified in lines per millimetre, so the spacing must be recovered as d = 1/N before it can be used. Substituting N directly is trap T-02."],
        ["เกรตติงคือสลิตหลายพันช่องแทนที่จะเป็นสองช่อง แถบสว่างเป็นไปตาม d sin θ = nλ เหมือนเดิม แต่เพราะมีสลิตจำนวนมากร่วมด้วย แถบจึงแคบและคมมาก ซึ่งทำให้เกรตติงเป็นเครื่องมือวัดที่แม่นยำ ไม่ใช่แค่การสาธิต",
         "เกรตติงระบุเป็นจำนวนเส้นต่อมิลลิเมตร จึงต้องหาระยะห่างก่อนด้วย d = 1/N การแทน N ลงไปตรงๆ คือกับดัก T-02"]],
  formula:["d sin θ = nλ ,  d = 1/N","d sin θ = nλ ,  d = 1/N"],
  flabel:["N is lines per unit length","N คือจำนวนเส้นต่อหน่วยความยาว"],
  viz:"plot",
  vizcfg:{
    title:["MORE SLITS MAKE SHARPER LINES","ยิ่งมีช่องมาก เส้นยิ่งคม"],
    xlab:["angle (degrees)","มุม (องศา)"], ylab:["intensity","ความเข้ม"],
    xmin:-30, xmax:30, ymin:0, fill:true,
    fn:function(x,p){
      var g=Math.PI*p.d*Math.sin(x*Math.PI/180)/(p.lam/1000000);
      if(Math.abs(Math.sin(g))<1e-9) return 1;
      var s=Math.sin(p.N*g)/(p.N*Math.sin(g));
      return s*s;
    },
    ctrls:[
      {k:"N",   lab:["Number of slits","จำนวนช่อง"], min:2, max:20, step:1, def:2, unit:""},
      {k:"d",   lab:["Slit spacing d","ระยะห่างช่อง d"], min:1.5, max:6, step:.5, def:3, unit:" µm"},
      {k:"lam", lab:["Wavelength λ","ความยาวคลื่น λ"], min:400, max:700, step:10, def:550, unit:" nm"}
    ],
    readouts:[
      {lab:["First order at","อันดับหนึ่งที่"], f:function(S){
        var r=(S.p.lam/1000)/S.p.d;
        return r>=1 ? (L()?"ไม่มี":"none") : fmt2(Math.asin(r)*180/Math.PI)+"°"; }},
      {lab:["Peak sharpness","ความคมของพีค"], f:function(S){
        return S.p.N<=2 ? (L()?"กว้างและนุ่ม":"broad and soft")
             : S.p.N<8 ? (L()?"คมขึ้น":"sharpening") : (L()?"คมมาก":"very sharp"); }},
      {lab:["Peak positions","ตำแหน่งพีค"], f:function(){
        return L()?"ไม่ขยับเลยเมื่อเพิ่มช่อง — d เป็นตัวกำหนด":"unmoved by adding slits — d sets them"; }},
      {lab:["Why gratings beat two slits","ทำไมเกรตติงดีกว่าสองช่อง"], f:function(){
        return L()?"เส้นคมกว่า วัดความยาวคลื่นได้แม่นกว่า":"sharper lines measure wavelength more precisely"; }}
    ],
    note:["adding slits does not move the maxima — it only narrows them","การเพิ่มช่องไม่ได้ย้ายตำแหน่งพีค แต่ทำให้พีคแคบลงเท่านั้น"]
  },
  guide:[
    {say:["Two slits give broad, gently rounded fringes — the familiar Young pattern.",
          "สองช่องให้ริ้วกว้างและมนนุ่ม คือลวดลายของยังที่คุ้นเคย"], set:{N:2,d:3,lam:550}},
    {say:["Six slits and the peaks tighten dramatically, with faint ripples between them.",
          "หกช่อง พีคแคบลงอย่างชัดเจน โดยมีระลอกจางๆ ระหว่างพีค"], set:{N:6,d:3,lam:550}},
    {say:["Twenty slits give knife-sharp lines at exactly the same angles. That precision is the whole point.",
          "ยี่สิบช่องให้เส้นคมกริบที่มุมเดิมพอดี ความแม่นยำนั้นคือหัวใจทั้งหมด"], set:{N:20,d:3,lam:550}}
  ] },

{ id:"spectra", x:235, y:346, requires:["grating"], methods:["M-05"],
  title:["Splitting white light","การแยกแสงขาว"],
  body:[["Because the angle depends on wavelength, a grating sends each colour to a different place. White light fans out into a spectrum, with red deflected furthest because its wavelength is longest.",
         "This is the reverse of a prism, where dispersion comes from refractive index rather than interference — and the two spread the colours in opposite orders. A grating spectrum is also repeated at each order n, which a prism never does."],
        ["เพราะมุมขึ้นกับความยาวคลื่น เกรตติงจึงส่งแต่ละสีไปคนละตำแหน่ง แสงขาวกระจายออกเป็นสเปกตรัม โดยสีแดงเบนมากที่สุดเพราะความยาวคลื่นยาวที่สุด",
         "นี่ตรงข้ามกับปริซึม ซึ่งการกระจายเกิดจากดัชนีหักเหไม่ใช่การแทรกสอด และทั้งสองเรียงสีในลำดับตรงข้ามกัน สเปกตรัมจากเกรตติงยังเกิดซ้ำที่ทุกอันดับ n ซึ่งปริซึมไม่เคยทำ"]],
  formula:["θ_red > θ_violet","θ_red > θ_violet"],
  flabel:["Longest wavelength bends most","ความยาวคลื่นยาวสุดเบนมากสุด"],
  viz:"numline",
  vizcfg:{
    title:["WHITE LIGHT, SPREAD OUT BY WAVELENGTH","แสงขาวที่ถูกแยกตามความยาวคลื่น"],
    min:380, max:760,
    ctrls:[
      {k:"lam", lab:["Wavelength","ความยาวคลื่น"], min:390, max:750, step:5, def:550, unit:" nm"},
      {k:"d",   lab:["Grating spacing d","ระยะห่างเกรตติง d"], min:1.5, max:6, step:.5, def:2, unit:" µm"}
    ],
    readouts:[
      {lab:["Colour","สี"], f:function(S){
        var l=S.p.lam;
        var C=l<450?["violet","ม่วง"]:l<490?["blue","น้ำเงิน"]:l<560?["green","เขียว"]:
              l<590?["yellow","เหลือง"]:l<630?["orange","ส้ม"]:["red","แดง"];
        return C[L()]; }},
      {lab:["First-order angle","มุมอันดับหนึ่ง"], f:function(S){
        var r=(S.p.lam/1000)/S.p.d;
        return r>=1 ? (L()?"ไม่มี":"none") : fmt2(Math.asin(r)*180/Math.PI)+"°"; }},
      {lab:["Bent most","หักเหมากที่สุด"], f:function(){
        return L()?"แดง — ความยาวคลื่นมากที่สุด":"red — it has the longest wavelength"; }},
      {lab:["Prism or grating?","ปริซึมหรือเกรตติง"], f:function(){
        return L()?"ปริซึมแยกกลับทาง เพราะใช้การหักเห":"a prism splits the other way round — it refracts"; }}
    ],
    regions:function(p){
      return [{a:380,b:450,col:"soft",lab:["violet","ม่วง"]},
              {a:450,b:490,col:"soft"},
              {a:490,b:560,col:"good",lab:["green","เขียว"]},
              {a:560,b:590,col:"warn"},
              {a:590,b:760,col:"accent",lab:["red","แดง"]}];
    },
    points:function(p){ return [{v:p.lam, lab:["your wavelength","ความยาวคลื่นที่เลือก"], col:"accent"}]; },
    note:["a grating bends long wavelengths most; a prism bends short ones most — opposite orders","เกรตติงหักเหคลื่นยาวมากที่สุด ปริซึมหักเหคลื่นสั้นมากที่สุด ลำดับกลับกัน"]
  } }
],

methods:[
{id:"M-01", name:["Apply d sin θ = nλ","ใช้ d sin θ = nλ"]},
{id:"M-02", name:["Use fringe spacing Δx = λL/d","ใช้ระยะแถบ Δx = λL/d"]},
{id:"M-03", name:["Single-slit minima","แถบมืดของสลิตเดี่ยว"]},
{id:"M-04", name:["Grating with lines per mm","เกรตติงที่ให้เส้นต่อมิลลิเมตร"]},
{id:"M-05", name:["Order of colours in a spectrum","ลำดับสีในสเปกตรัม"]},
{id:"M-06", name:["Predict the effect of a change","ทำนายผลของการเปลี่ยนตัวแปร"]}
],

traps:{
"T-01":["For a single slit d sin θ = nλ gives the DARK fringes. For a double slit it gives the bright ones.","สำหรับสลิตเดี่ยว d sin θ = nλ ให้แถบมืด ส่วนสลิตคู่ให้แถบสว่าง"],
"T-02":["A grating is quoted in lines per mm. You must invert it: d = 1/N.","เกรตติงระบุเป็นเส้นต่อมิลลิเมตร ต้องกลับเศษส่วนก่อน d = 1/N"],
"T-03":["Slit separation d and screen distance L were swapped. Δx = λL/d, not λd/L.","สลับระยะห่างสลิต d กับระยะถึงฉาก L  สูตรคือ Δx = λL/d ไม่ใช่ λd/L"],
"T-04":["Units. Wavelengths come in nanometres, slit spacings in millimetres — convert both to metres first.","หน่วยผิด ความยาวคลื่นเป็นนาโนเมตร ระยะสลิตเป็นมิลลิเมตร ต้องแปลงเป็นเมตรทั้งคู่ก่อน"]
},

gen:{
"M-01": function(sf){
  var lam=pick([450,500,600,650]), d=pick([0.1,0.2,0.5]), n=pick([1,2,3]);
  var s=n*lam*1e-9/(d*1e-3);
  if(sf==="S-04") return {stem:["In a double-slit experiment, what does n = 0 correspond to?",
                                "ในการทดลองสลิตคู่ n = 0 ตรงกับอะไร"],
    opts:[{v:["The central bright fringe","แถบสว่างกลาง"],ok:1},
          {v:["The first dark fringe","แถบมืดแรก"],trap:"T-01"},
          {v:["The edge of the screen","ขอบฉาก"]},{v:["No fringe at all","ไม่มีแถบใดเลย"]}],unit:""};
  return {stem:["Light of wavelength "+lam+" nm passes two slits "+d+" mm apart. Find sin θ for the order-"+n+" bright fringe.",
                "แสงความยาวคลื่น "+lam+" นาโนเมตร ผ่านสลิตสองช่องห่างกัน "+d+" มิลลิเมตร จงหา sin θ ของแถบสว่างอันดับที่ "+n],
    opts:[{v:s.toExponential(2),ok:1},{v:(s*1000).toExponential(2),trap:"T-04"},
          {v:(s/n).toExponential(2)},{v:(s*n).toExponential(2)}],unit:""};
},
"M-02": function(sf){
  var lam=pick([450,550,650]), d=pick([0.2,0.4,0.5]), L=pick([1,2,3]);
  var dx=lam*1e-9*L/(d*1e-3)*1000;
  if(sf==="S-05") return {stem:["Fringes "+fmt(dx)+" mm apart are seen with slits "+d+" mm apart and a screen "+L+" m away. Find the wavelength.",
                                "พบแถบห่างกัน "+fmt(dx)+" มิลลิเมตร โดยสลิตห่าง "+d+" มิลลิเมตร และฉากอยู่ห่าง "+L+" เมตร จงหาความยาวคลื่น"],
    opts:[{v:String(lam),ok:1},{v:fmt(dx*d/L),trap:"T-03"},{v:fmt(lam/2)},{v:fmt(lam*2)}],unit:" nm"};
  if(sf==="S-04") return {stem:["The screen is moved twice as far away. What happens to the fringe spacing?",
                                "ย้ายฉากออกไปไกลเป็นสองเท่า ระยะแถบเปลี่ยนอย่างไร"],
    opts:[{v:["It doubles","เพิ่มเป็นสองเท่า"],ok:1},{v:["It halves","ลดลงครึ่งหนึ่ง"],trap:"T-03"},
          {v:["It is unchanged","เท่าเดิม"]},{v:["It quadruples","เพิ่มเป็นสี่เท่า"]}],unit:""};
  return {stem:["Slits "+d+" mm apart are lit by "+lam+" nm light with a screen "+L+" m away. Find the fringe spacing.",
                "สลิตห่างกัน "+d+" มิลลิเมตร ส่องด้วยแสง "+lam+" นาโนเมตร ฉากอยู่ห่าง "+L+" เมตร จงหาระยะแถบ"],
    opts:[{v:fmt(dx),ok:1},{v:fmt(lam*1e-9*d*1e-3/L*1000),trap:"T-03"},{v:fmt(dx/2)},{v:fmt(dx*10),trap:"T-04"}],unit:" mm"};
},
"M-03": function(sf){
  var lam=pick([500,600,700]), a=pick([0.05,0.1,0.2]);
  var s=lam*1e-9/(a*1e-3);
  if(sf==="S-04") return {stem:["For a single slit, what does d sin θ = nλ locate?",
                                "สำหรับสลิตเดี่ยว d sin θ = nλ ระบุตำแหน่งอะไร"],
    opts:[{v:["The dark fringes","แถบมืด"],ok:1},{v:["The bright fringes","แถบสว่าง"],trap:"T-01"},
          {v:["The central maximum only","เฉพาะแถบสว่างกลาง"],trap:"T-01"},{v:["Nothing useful","ไม่มีประโยชน์"]}],unit:""};
  if(sf==="S-02") return {stem:["In a single-slit pattern, how does the central maximum compare with the others?",
                                "ในลวดลายสลิตเดี่ยว แถบสว่างกลางเทียบกับแถบอื่นเป็นอย่างไร"],
    opts:[{v:["Twice as wide and much brighter","กว้างเป็นสองเท่าและสว่างกว่ามาก"],ok:1},
          {v:["The same width as the others","กว้างเท่ากับแถบอื่น"],trap:"T-01"},
          {v:["Narrower than the others","แคบกว่าแถบอื่น"]},{v:["It is dark","เป็นแถบมืด"],trap:"T-01"}],unit:""};
  return {stem:["A single slit "+a+" mm wide is lit by "+lam+" nm light. Find sin θ for the first minimum.",
                "สลิตเดี่ยวกว้าง "+a+" มิลลิเมตร ส่องด้วยแสง "+lam+" นาโนเมตร จงหา sin θ ของแถบมืดแรก"],
    opts:[{v:s.toExponential(2),ok:1},{v:(s/2).toExponential(2),trap:"T-01"},
          {v:(s*1000).toExponential(2),trap:"T-04"},{v:(s*2).toExponential(2)}],unit:""};
},
"M-04": function(sf){
  var N=pick([300,500,600]), lam=pick([500,600,650]), n=pick([1,2]);
  var d=1e-3/N, s=n*lam*1e-9/d;
  if(sf==="S-04") return {stem:["A grating is marked 500 lines per mm. What is the slit spacing d?",
                                "เกรตติงระบุ 500 เส้นต่อมิลลิเมตร ระยะห่างสลิต d เป็นเท่าใด"],
    opts:[{v:"2 × 10⁻⁶ m",ok:1},{v:"500 m",trap:"T-02"},{v:"5 × 10⁻⁴ m",trap:"T-02"},{v:"2 × 10⁻³ m"}],unit:""};
  return {stem:["A grating of "+N+" lines/mm is lit by "+lam+" nm light. Find sin θ at order "+n+".",
                "เกรตติง "+N+" เส้น/มม. ส่องด้วยแสง "+lam+" นาโนเมตร จงหา sin θ ที่อันดับ "+n],
    opts:[{v:fmt2(s),ok:1},{v:fmt2(s*N),trap:"T-02"},{v:fmt2(s/n)},{v:fmt2(s/1000),trap:"T-04"}],unit:""};
},
"M-05": function(sf){
  var C=[{s:["White light passes through a grating. Which colour is deflected furthest?","แสงขาวผ่านเกรตติง สีใดเบนมากที่สุด"],
          ok:["Red, because its wavelength is longest","สีแดง เพราะความยาวคลื่นยาวที่สุด"],
          w:[["Violet, because its wavelength is shortest","สีม่วง เพราะความยาวคลื่นสั้นที่สุด"],
             ["Green, because it is in the middle","สีเขียว เพราะอยู่ตรงกลาง"],
             ["They all deflect equally","ทุกสีเบนเท่ากัน"]]},
         {s:["Why does a grating produce several complete spectra rather than one?","ทำไมเกรตติงจึงให้สเปกตรัมครบชุดหลายชุด ไม่ใช่ชุดเดียว"],
          ok:["One spectrum forms at each order n","เกิดสเปกตรัมหนึ่งชุดที่แต่ละอันดับ n"],
          w:[["The light reflects repeatedly","แสงสะท้อนไปมาหลายครั้ง"],
             ["The slits have different widths","สลิตกว้างไม่เท่ากัน"],
             ["The screen is curved","ฉากโค้ง"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
},
"M-06": function(sf){
  var C=[{s:["The slit separation is halved. What happens to the fringe spacing?","ลดระยะห่างสลิตลงครึ่งหนึ่ง ระยะแถบเปลี่ยนอย่างไร"],
          ok:["It doubles","เพิ่มเป็นสองเท่า"],w:[["It halves","ลดลงครึ่งหนึ่ง"],["Unchanged","เท่าเดิม"],["It quadruples","เพิ่มเป็นสี่เท่า"]]},
         {s:["Blue light replaces red in a double-slit setup. What happens to the pattern?","เปลี่ยนจากแสงแดงเป็นแสงน้ำเงินในการทดลองสลิตคู่ ลวดลายเปลี่ยนอย่างไร"],
          ok:["The fringes get closer together","แถบเข้ามาใกล้กันมากขึ้น"],
          w:[["The fringes spread out","แถบกระจายห่างออก"],["Nothing changes","ไม่เปลี่ยน"],["The pattern disappears","ลวดลายหายไป"]]},
         {s:["Two separate light bulbs are used as the two sources. What is seen?","ใช้หลอดไฟสองดวงแยกกันเป็นแหล่งกำเนิดทั้งสอง จะเห็นอะไร"],
          ok:["No stable pattern — the sources are not coherent","ไม่มีลวดลายนิ่ง เพราะแหล่งกำเนิดไม่อาพันธ์"],
          w:[["A brighter pattern","ลวดลายที่สว่างกว่า"],["Wider fringes","แถบที่กว้างกว่า"],["The same pattern","ลวดลายเหมือนเดิม"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0],trap:"T-03"},{v:c.w[1]},{v:c.w[2]}],unit:""};
}
}
};
