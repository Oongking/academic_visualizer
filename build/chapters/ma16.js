var CHAPTER = {
id:"ma16", num:"16", slug:"linear-programming", subject:"math",
kicker:["Mathematics · Chapter 16","คณิตศาสตร์ · บทที่ 16"],
title:["Linear Programming","กำหนดการเชิงเส้น"],
mapTitle:["The best point in a fenced region","จุดที่ดีที่สุดในบริเวณที่ถูกล้อมไว้"],
lede:["Every real decision has limits — budget, hours, materials. Draw those limits as lines and they fence off a region of everything you could do. The remarkable result is that the best plan always sits at a corner of that fence, so you only ever have to check a handful of points.",
      "การตัดสินใจจริงทุกเรื่องมีข้อจำกัด ไม่ว่าจะเป็นงบ เวลา หรือวัตถุดิบ ถ้าวาดข้อจำกัดเหล่านี้เป็นเส้นตรง เส้นจะล้อมบริเวณที่รวมทุกอย่างที่เราทำได้ไว้ สิ่งที่น่าทึ่งคือแผนที่ดีที่สุดอยู่ที่มุมของรั้วนี้เสมอ เราจึงตรวจแค่ไม่กี่จุดก็พอ"],
next:null,

nodes:[
{ id:"model", x:235, y:52, requires:[], methods:["M-01"],
  title:["Building the model","การสร้างแบบจำลอง"],
  body:[["Name the decision variables first — usually 'how many of each thing to make'. Then write one inequality per limited resource, and one linear expression for the quantity you want to make as large or as small as possible: the objective function.",
         "Almost every real problem also carries the silent constraints x ≥ 0 and y ≥ 0, since you cannot produce a negative quantity of anything. Leaving them out opens the region into quadrants that have no meaning, and that is trap T-01."],
        ["เริ่มจากตั้งชื่อตัวแปรตัดสินใจ ซึ่งมักเป็น จะผลิตของแต่ละอย่างกี่ชิ้น แล้วเขียนอสมการหนึ่งข้อต่อทรัพยากรที่จำกัดหนึ่งอย่าง จากนั้นเขียนนิพจน์เชิงเส้นแทนปริมาณที่เราอยากให้มากที่สุดหรือน้อยที่สุด นิพจน์นี้เรียกว่าฟังก์ชันจุดประสงค์",
         "โจทย์จริงเกือบทุกข้อมีข้อจำกัดที่ไม่ได้เขียนไว้ด้วย คือ x ≥ 0 และ y ≥ 0 เพราะผลิตของติดลบไม่ได้ ถ้าลืมเขียน บริเวณจะขยายไปยังควอดรันต์ที่ไม่มีความหมาย นี่คือกับดัก T-01"]],
  formula:["maximise P = ax + by   subject to constraints, with x ≥ 0 , y ≥ 0","หาค่าสูงสุดของ P = ax + by   ภายใต้ข้อจำกัด โดย x ≥ 0 , y ≥ 0"],
  flabel:["Never forget x ≥ 0 and y ≥ 0","อย่าลืม x ≥ 0 และ y ≥ 0"],
  viz:"table",
  vizcfg:{
    title:["TURNING WORDS INTO A MODEL","แปลงโจทย์เป็นแบบจำลอง"],
    cols:[["The sentence says","โจทย์บอกว่า"],["Becomes","กลายเป็น"],["Kind","ชนิด"]],
    rowKey:"i",
    readouts:[
      {lab:["Line","บรรทัด"], f:function(S){ return String(S.p.i+1)+" / 5"; }},
      {lab:["Objective function","ฟังก์ชันจุดประสงค์"], f:function(){
        return L()?"มีได้ข้อเดียว":"there is exactly one"; }},
      {lab:["Constraints","ข้อจำกัด"], f:function(){
        return L()?"มีได้หลายข้อ รวมถึงข้อที่ไม่ได้เขียนไว้":"there may be many, including unwritten ones"; }},
      {lab:["Easiest to forget","ลืมง่ายที่สุด"], f:function(){
        return L()?"x ≥ 0 และ y ≥ 0":"x ≥ 0 and y ≥ 0"; }}
    ],
    rows:function(p){
      var R=[[["how many of each to make","จะผลิตแต่ละอย่างกี่ชิ้น"],["x and y","x และ y"],["decision variables","ตัวแปรตัดสินใจ"]],
             [["profit is 20 and 30 each","กำไรอย่างละ 20 และ 30"],["P = 20x + 30y","P = 20x + 30y"],["objective","จุดประสงค์"]],
             [["at most 40 hours available","มีเวลาไม่เกิน 40 ชั่วโมง"],["2x + y ≤ 40","2x + y ≤ 40"],["constraint","ข้อจำกัด"]],
             [["at least 5 of product A","ต้องผลิต A อย่างน้อย 5"],["x ≥ 5","x ≥ 5"],["constraint","ข้อจำกัด"]],
             [["(never actually stated)","(ไม่เคยเขียนไว้จริง)"],["x ≥ 0, y ≥ 0","x ≥ 0, y ≥ 0"],["implied constraint","ข้อจำกัดโดยปริยาย"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===2?(i===4?"warn":(i===1?"accent":"good")):"accent"}; }); });
    },
    note:["the last line is the one nobody writes down and everybody needs","บรรทัดสุดท้ายนี้ไม่มีใครเขียน แต่ทุกโจทย์ต้องใช้"]
  } },

{ id:"region", x:100, y:150, requires:["model"], methods:["M-02"],
  title:["The feasible region","อาณาบริเวณที่เป็นไปได้"],
  body:[["Graph each constraint as a boundary line, then shade the side that satisfies it. The feasible region is the overlap of every shaded half-plane — the set of plans that break no rule at all.",
         "Test the origin to find the correct side: substitute (0, 0) and see whether the inequality holds. A solid line means the boundary itself is included (≤ or ≥); a dashed line means it is not (< or >). Shading the wrong half is trap T-02, and it silently invalidates everything that follows."],
        ["วาดข้อจำกัดแต่ละข้อเป็นเส้นขอบ แล้วแรเงาด้านที่เป็นไปตามอสมการ อาณาบริเวณที่เป็นไปได้คือส่วนที่ครึ่งระนาบทุกอันซ้อนกัน ซึ่งก็คือเซตของแผนที่ไม่ผิดกฎข้อใดเลย",
         "ใช้จุดกำเนิดทดสอบว่าต้องแรเงาด้านไหน โดยแทน (0, 0) แล้วดูว่าอสมการเป็นจริงหรือไม่ เส้นทึบแปลว่ารวมเส้นขอบด้วย (≤ หรือ ≥) เส้นประแปลว่าไม่รวม (< หรือ >) ถ้าแรเงาผิดด้านคือกับดัก T-02 และทุกขั้นตอนหลังจากนั้นจะผิดทั้งหมดโดยไม่รู้ตัว"]],
  formula:["Test (0, 0). If the inequality holds, shade that side.","ทดสอบ (0, 0) ถ้าอสมการเป็นจริง ให้แรเงาด้านนั้น"],
  flabel:["Solid = included, dashed = excluded","เส้นทึบ = รวม, เส้นประ = ไม่รวม"],
  viz:"plot",
  vizcfg:{
    title:["ONE CONSTRAINT, ONE HALF-PLANE","หนึ่งข้อจำกัด หนึ่งครึ่งระนาบ"],
    xlab:["x","x"], ylab:["y","y"],
    xmin:0, xmax:12, ymin:0, fill:true,
    fn:function(x,p){ return Math.max(0,(p.c - p.a*x)/p.b); },
    mark:function(p){ return p.tx; },
    ctrls:[
      {k:"a",  lab:["a  (ax + by ≤ c)","a  (ax + by ≤ c)"], min:1, max:6, step:1, def:2, unit:""},
      {k:"b",  lab:["b","b"], min:1, max:6, step:1, def:3, unit:""},
      {k:"c",  lab:["c","c"], min:4, max:30, step:1, def:18, unit:""},
      {k:"tx", lab:["Test point x","จุดทดสอบ x"], min:0, max:11.5, step:.5, def:2, unit:""}
    ],
    readouts:[
      {lab:["Boundary line","เส้นขอบ"], f:function(S){
        return num(S.p.a)+"x + "+num(S.p.b)+"y = "+num(S.p.c); }},
      {lab:["Test the origin (0,0)","ทดสอบจุดกำเนิด (0,0)"], f:function(S){
        return "0 ≤ "+num(S.p.c)+(L()?" · เป็นจริง จึงแรเงาฝั่งนี้":" · true, so shade this side"); }},
      {lab:["x-intercept","จุดตัดแกน x"], f:function(S){ return num(S.p.c/S.p.a); }},
      {lab:["y-intercept","จุดตัดแกน y"], f:function(S){ return num(S.p.c/S.p.b); }}
    ],
    note:["substitute (0,0) to settle which side — it is the fastest test there is","แทน (0,0) เพื่อดูว่าต้องแรเงาด้านไหน เป็นวิธีที่เร็วที่สุด"]
  } },

{ id:"corners", x:370, y:150, requires:["region"], methods:["M-03"],
  title:["The corner-point theorem","ทฤษฎีบทจุดมุม"],
  body:[["If an optimum exists, it occurs at a vertex of the feasible region. That is what makes the whole method practical: instead of testing infinitely many points, list the corners, evaluate the objective at each, and pick the best.",
         "The lab shows why. The objective function draws a family of parallel lines, one for every value of P. Sliding P pushes the line across the region, and the last point it touches before leaving is always a corner — unless the line happens to lie parallel to an edge, in which case that whole edge ties for the optimum. Evaluating at an interior point instead of a vertex is trap T-03."],
        ["ถ้ามีค่าเหมาะที่สุด มันจะอยู่ที่จุดยอดของอาณาบริเวณที่เป็นไปได้ ข้อนี้ทำให้วิธีนี้ใช้ได้จริง เราไม่ต้องทดสอบจุดอนันต์จุด แค่เขียนรายการมุมทั้งหมด หาค่าฟังก์ชันจุดประสงค์ที่แต่ละมุม แล้วเลือกค่าที่ดีที่สุด",
         "ห้องทดลองช่วยอธิบายเหตุผล ฟังก์ชันจุดประสงค์วาดเป็นเส้นขนานหลายเส้น โดย P แต่ละค่าให้หนึ่งเส้น เมื่อเลื่อน P เส้นจะเคลื่อนข้ามบริเวณ และจุดสุดท้ายที่เส้นแตะก่อนจะหลุดออกไปคือมุมเสมอ ยกเว้นเมื่อเส้นขนานกับขอบพอดี กรณีนั้นทั้งขอบเป็นค่าเหมาะที่สุดเท่ากันหมด ถ้าหาค่าที่จุดภายในแทนจุดยอด ก็ตกกับดัก T-03"]],
  formula:["The optimum sits at a vertex — check every corner","ค่าเหมาะที่สุดอยู่ที่จุดยอด ให้ตรวจทุกมุม"],
  flabel:["Slide the line until it is about to leave","เลื่อนเส้นจนกำลังจะออกจากบริเวณ"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"c1", lab:["Resource 1 limit  (2x + y ≤ c₁)","ข้อจำกัดที่ 1  (2x + y ≤ c₁)"], min:6, max:20, step:1, def:14, unit:""},
      {k:"c2", lab:["Resource 2 limit  (x + 2y ≤ c₂)","ข้อจำกัดที่ 2  (x + 2y ≤ c₂)"], min:6, max:20, step:1, def:16, unit:""},
      {k:"a",  lab:["Profit per x","กำไรต่อ x"], min:1, max:8, step:1, def:3, unit:""},
      {k:"b",  lab:["Profit per y","กำไรต่อ y"], min:1, max:8, step:1, def:4, unit:""},
      {k:"P",  lab:["Slide the objective line P","เลื่อนเส้นจุดประสงค์ P"], min:0, max:70, step:1, def:20, unit:""}
    ],
    readouts:[
      {lab:["Objective","ฟังก์ชันจุดประสงค์"], f:function(S){ var p=S.p;
        return "P = "+p.a+"x + "+p.b+"y"; }},
      {lab:["Best corner","มุมที่ดีที่สุด"], f:function(S){
        return S._best ? "("+num(S._best[0])+", "+num(S._best[1])+")" : "—"; }},
      {lab:["Maximum P","ค่า P สูงสุด"], f:function(S){ return num(S._max||0); }},
      {lab:["Your line at P","เส้นของเราที่ P"], f:function(S){
        var p=S.p, mx=S._max||0;
        if(p.P>mx+1e-9) return L()?"หลุดออกนอกบริเวณ":"outside the region";
        if(Math.abs(p.P-mx)<=1e-9) return L()?"แตะมุมที่ดีที่สุดพอดี":"touching the best corner";
        if(mx-p.P<1) return L()?"เกือบแตะแล้ว (ห่างไม่ถึง 1)":"almost touching (within 1)";
        return L()?"ยังตัดผ่านบริเวณอยู่":"still cutting through"; }}
    ],
    draw:function(S,o){
      var p=S.p;
      var A=axes(o,{x:58,y:30,w:352,h:240,xmin:0,xmax:12,ymin:0,ymax:12,
                    title:["FEASIBLE REGION","อาณาบริเวณที่เป็นไปได้"],xlab:"x",ylab:"y",xticks:6,yticks:6});
      /* the vertices: origin, both axis intercepts, and the constraint intersection */
      var ix=(2*p.c1-p.c2)/3, iy=(2*p.c2-p.c1)/3;   /* 2x+y=c1 , x+2y=c2 */
      /* clip a segment to the plot window 0..12, so long lines do not leave the axes */
      var seg=function(x1,y1,x2,y2){
        var t0=0,t1=1,dx=x2-x1,dy=y2-y1,ok=true;
        [[-dx,x1],[dx,12-x1],[-dy,y1],[dy,12-y1]].forEach(function(e){
          if(Math.abs(e[0])<1e-12){ if(e[1]<0) ok=false; return; }
          var t=e[1]/e[0];
          if(e[0]<0){ if(t>t1) ok=false; else if(t>t0) t0=t; }
          else { if(t<t0) ok=false; else if(t<t1) t1=t; }
        });
        return ok ? [x1+t0*dx,y1+t0*dy,x1+t1*dx,y1+t1*dy] : null;
      };
      var verts=[[0,0]];
      var xcap=Math.min(p.c1/2, p.c2);
      verts.push([xcap,0]);
      if(ix>0 && iy>0) verts.push([ix,iy]);
      var ycap=Math.min(p.c1, p.c2/2);
      verts.push([0,ycap]);
      /* shade it */
      var d="";
      verts.forEach(function(v,i){ d+=(i?" L":"M")+A.X(v[0])+" "+A.Y(v[1]); });
      d+=" Z";
      o.push('<path d="'+d+'" fill="var(--accent)" opacity="0.11" stroke="var(--accent)" stroke-width="1.6"/>');
      /* the two constraint boundaries, drawn full length */
      var s1=seg(0,p.c1,p.c1/2,0), s2=seg(0,p.c2/2,p.c2,0);
      if(s1) o.push('<line x1="'+A.X(s1[0])+'" y1="'+A.Y(s1[1])+'" x2="'+A.X(s1[2])+'" y2="'+A.Y(s1[3])+
             '" stroke="var(--ink-soft)" stroke-width="1.6"/>');
      if(s2) o.push('<line x1="'+A.X(s2[0])+'" y1="'+A.Y(s2[1])+'" x2="'+A.X(s2[2])+'" y2="'+A.Y(s2[3])+
             '" stroke="var(--ink-soft)" stroke-width="1.6" stroke-dasharray="6 4"/>');
      /* evaluate the objective at every corner */
      var best=null, max=-1e9;
      verts.forEach(function(v){
        var val=p.a*v[0]+p.b*v[1];
        if(val>max){ max=val; best=v; }
      });
      S._best=best; S._max=max;
      /* the sliding objective line ax + by = P */
      var P=p.P;
      var sp=seg(0,P/p.b,P/p.a,0);
      if(sp){
        o.push('<line x1="'+A.X(sp[0])+'" y1="'+A.Y(sp[1])+'" x2="'+A.X(sp[2])+'" y2="'+A.Y(sp[3])+
               '" stroke="var(--good)" stroke-width="2.6"/>');
        o.push('<text x="'+(A.X(sp[2])-6)+'" y="'+(A.Y(sp[3])-6)+
               '" fill="var(--good)" font-family="IBM Plex Sans" font-size="10.5" text-anchor="end">P = '+num(P)+'</text>');
      }
      /* corners, with the winner ringed */
      verts.forEach(function(v){
        var isBest = best && Math.abs(v[0]-best[0])<1e-9 && Math.abs(v[1]-best[1])<1e-9;
        o.push('<circle cx="'+A.X(v[0])+'" cy="'+A.Y(v[1])+'" r="'+(isBest?7:4.5)+
               '" fill="'+(isBest?"var(--accent)":"var(--ink)")+'"/>');
        if(isBest) o.push('<circle cx="'+A.X(v[0])+'" cy="'+A.Y(v[1])+
                          '" r="12" fill="none" stroke="var(--accent)" stroke-width="1.6"/>');
      });
      /* the corner table, so the method is visible as well as the picture */
      var colx=430;
      o.push('<text x="'+colx+'" y="48" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.2">'+tx(["CORNERS","มุม"])+'</text>');
      verts.forEach(function(v,i){
        var val=p.a*v[0]+p.b*v[1];
        var isBest = best && Math.abs(v[0]-best[0])<1e-9 && Math.abs(v[1]-best[1])<1e-9;
        var y=72+i*26;
        o.push('<text x="'+colx+'" y="'+y+'" fill="'+(isBest?"var(--accent)":"var(--ink-soft)")+
               '" font-family="IBM Plex Sans" font-size="10.5"'+(isBest?' font-weight="600"':'')+'>('+
               num(v[0])+', '+num(v[1])+')</text>');
        o.push('<text x="'+colx+'" y="'+(y+13)+'" fill="'+(isBest?"var(--accent)":"var(--ink-faint)")+
               '" font-family="IBM Plex Sans" font-size="10.5">P = '+num(val)+'</text>');
      });
      o.push('<text x="58" y="306" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="10.5">'+tx(["green line = all plans giving the same profit P","เส้นสีเขียว = ทุกแผนที่ให้กำไร P เท่ากัน"])+'</text>');
      o.push('<text x="58" y="322" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["push P up until the line is about to leave the region","ดัน P ขึ้นจนเส้นกำลังจะหลุดออกจากบริเวณ"])+'</text>');
    }
  },
  guide:[
    {say:["The shaded quadrilateral is every plan that breaks no constraint. Its corners are ringed.",
          "รูปสี่เหลี่ยมที่แรเงาคือทุกแผนที่ไม่ผิดข้อจำกัดข้อใดเลย มุมของมันมีวงกลมล้อมไว้"], set:{c1:14,c2:16,a:3,b:4,P:20}},
    {say:["The green line collects every plan worth the same profit. Raise P and it marches outward, staying parallel.",
          "เส้นสีเขียวคือทุกแผนที่ให้กำไรเท่ากัน เพิ่ม P แล้วเส้นจะเลื่อนออกไปข้างนอก โดยยังขนานเหมือนเดิม"], set:{c1:14,c2:16,a:3,b:4,P:32}},
    {say:["Keep pushing. The last point the line touches before it leaves is the ringed corner — that is the maximum.",
          "ดันต่อไปเรื่อยๆ จุดสุดท้ายที่เส้นแตะก่อนหลุดออกไปคือมุมที่มีวงกลมล้อม นั่นคือค่าสูงสุด"], set:{c1:14,c2:16,a:3,b:4,P:36}},
    {say:["Now change the profit per unit. A different corner wins — the region did not move, only the line's slope did.",
          "ทีนี้เปลี่ยนกำไรต่อหน่วยดู มุมที่ชนะเปลี่ยนไป บริเวณไม่ได้ขยับเลย มีแค่ความชันของเส้นที่เปลี่ยน"], set:{c1:14,c2:16,a:8,b:1,P:56}}
  ]},

{ id:"solving", x:235, y:248, requires:["corners"], methods:["M-04"],
  title:["Finding the optimum","การหาค่าเหมาะที่สุด"],
  body:[["The procedure is fixed. Graph the constraints, identify the feasible region, find every vertex — including the ones where two constraint lines cross, which need simultaneous equations — evaluate the objective at each, then compare.",
         "Minimisation runs identically; only the comparison at the end flips. Reading a maximum where the question asked for a minimum is trap T-04, and it is an easy mistake to make when the arithmetic all went right."],
        ["ขั้นตอนเป็นแบบเดียวกันเสมอ วาดข้อจำกัด หาอาณาบริเวณที่เป็นไปได้ แล้วหาจุดยอดทุกจุด รวมทั้งจุดที่เส้นข้อจำกัดสองเส้นตัดกัน ซึ่งต้องแก้ระบบสมการ จากนั้นหาค่าฟังก์ชันจุดประสงค์ที่แต่ละจุดแล้วเทียบกัน",
         "การหาค่าต่ำสุดทำเหมือนกันทุกอย่าง ต่างกันแค่ตอนเทียบค่าในขั้นสุดท้ายที่เป็นตรงข้าม ถ้าโจทย์ถามค่าต่ำสุดแต่ตอบค่าสูงสุดคือกับดัก T-04 พลาดง่ายด้วย เพราะแม้คำนวณถูกทุกอย่างก็ยังพลาดตรงนี้ได้"]],
  formula:["graph → region → vertices → evaluate → compare","วาดกราฟ → หาบริเวณ → หาจุดยอด → คำนวณค่า → เปรียบเทียบ"],
  flabel:["Check whether max or min was asked for","ตรวจว่าโจทย์ถามค่าสูงสุดหรือต่ำสุด"],
  viz:"bars",
  vizcfg:{
    title:["EVALUATE AT EVERY CORNER, THEN COMPARE","หาค่าที่ทุกมุม แล้วเทียบกัน"],
    ylab:["objective value P","ค่าจุดประสงค์ P"],
    ctrls:[
      {k:"a", lab:["Profit per x","กำไรต่อ x"], min:1, max:10, step:1, def:3, unit:""},
      {k:"b", lab:["Profit per y","กำไรต่อ y"], min:1, max:10, step:1, def:5, unit:""}
    ],
    readouts:[
      {lab:["At (0,0)","ที่ (0,0)"], f:function(){ return "0"; }},
      {lab:["At (6,0)","ที่ (6,0)"], f:function(S){ return num(6*S.p.a); }},
      {lab:["At (4,3)","ที่ (4,3)"], f:function(S){ return num(4*S.p.a+3*S.p.b); }},
      {lab:["Best corner","มุมที่ดีที่สุด"], f:function(S){
        var p=S.p, V=[[0,0],[6,0],[4,3],[0,5]], best=null, m=-1e9;
        V.forEach(function(v){ var x=p.a*v[0]+p.b*v[1]; if(x>m){ m=x; best=v; } });
        return "("+best[0]+", "+best[1]+") = "+num(m); }}
    ],
    bars:[
      {lab:["(0,0)","(0,0)"], f:function(p){ return 0; }, col:"faint"},
      {lab:["(6,0)","(6,0)"], f:function(p){ return 6*p.a; }, col:"good"},
      {lab:["(4,3)","(4,3)"], f:function(p){ return 4*p.a+3*p.b; }, col:"accent"},
      {lab:["(0,5)","(0,5)"], f:function(p){ return 5*p.b; }, col:"warn"}
    ],
    note:["change the profit per unit and the tallest bar can move to a different corner","เปลี่ยนกำไรต่อหน่วย แถบที่สูงที่สุดอาจย้ายไปอยู่มุมอื่น"]
  },
  guide:[
    {say:["With these profits the interior corner (4,3) wins.",
          "ด้วยกำไรชุดนี้ มุมด้านใน (4,3) ให้ค่าดีที่สุด"], set:{a:3,b:5}},
    {say:["Make x far more profitable and the winner jumps to the corner on the x-axis.",
          "ทำให้ x ให้กำไรมากกว่า y มาก มุมที่ชนะจะกระโดดไปอยู่ที่มุมบนแกน x"], set:{a:10,b:1}},
    {say:["Reverse it and the top corner takes over. The region never changed — only the objective did.",
          "สลับกัน มุมบนสุดก็ชนะแทน บริเวณไม่เคยเปลี่ยน มีแค่ฟังก์ชันจุดประสงค์ที่เปลี่ยน"], set:{a:1,b:10}}
  ] },

{ id:"cases", x:235, y:346, requires:["solving"], methods:["M-05"],
  title:["Special cases","กรณีพิเศษ"],
  body:[["Three things can go differently. If the constraints contradict each other the feasible region is empty and there is no solution at all. If the region is unbounded in the direction the objective improves, no maximum exists — though a minimum still might.",
         "And if the objective line runs exactly parallel to one edge, every point along that edge is optimal, so there are infinitely many best answers rather than one. Reporting a single vertex there is not wrong, but it is incomplete."],
        ["มีสามกรณีที่ต่างออกไป ถ้าข้อจำกัดขัดแย้งกันเอง อาณาบริเวณที่เป็นไปได้จะว่างและไม่มีคำตอบเลย ถ้าบริเวณไม่มีขอบเขตในทิศทางที่ฟังก์ชันจุดประสงค์ดีขึ้น จะไม่มีค่าสูงสุด แต่ยังอาจมีค่าต่ำสุดได้",
         "และถ้าเส้นจุดประสงค์ขนานกับขอบเส้นหนึ่งพอดี ทุกจุดบนขอบนั้นเป็นค่าเหมาะที่สุด คำตอบที่ดีที่สุดจึงมีอนันต์คำตอบ ไม่ใช่คำตอบเดียว ถ้าตอบจุดยอดเพียงจุดเดียวในกรณีนี้ ไม่ถือว่าผิด แต่ตอบไม่ครบ"]],
  formula:["empty region → none        unbounded → no maximum        parallel edge → infinitely many","บริเวณว่าง → ไม่มีคำตอบ        ไม่มีขอบเขต → ไม่มีค่าสูงสุด        ขนานกับขอบ → มีคำตอบอนันต์"],
  flabel:["Unbounded blocks the max, not the min","ไม่มีขอบเขตขวางค่าสูงสุด ไม่ใช่ค่าต่ำสุด"],
  viz:"table",
  vizcfg:{
    title:["WHEN THE STANDARD METHOD BREAKS DOWN","เมื่อวิธีมาตรฐานใช้ไม่ได้"],
    cols:[["Situation","สถานการณ์"],["What the region looks like","บริเวณมีลักษณะ"],["Answer","คำตอบ"]],
    rowKey:"i",
    readouts:[
      {lab:["Case","กรณี"], f:function(S){
        return [["Normal","ปกติ"],["Infeasible","ไม่มีคำตอบที่เป็นไปได้"],
                ["Unbounded","ไม่มีขอบเขต"],["Multiple optima","มีคำตอบเหมาะสุดหลายค่า"]][S.p.i][L()]; }},
      {lab:["Does a maximum exist?","มีค่าสูงสุดไหม"], f:function(S){
        return [["yes, at one corner","มี ที่มุมหนึ่ง"],["no — nothing is feasible","ไม่มี — ไม่มีแผนใดเป็นไปได้"],
                ["no — but a minimum may","ไม่มี — แต่ค่าต่ำสุดอาจมี"],["yes — along a whole edge","มี — ตลอดขอบเส้นหนึ่ง"]][S.p.i][L()]; }},
      {lab:["What to write","ควรเขียนว่าอย่างไร"], f:function(S){
        return [["the single optimal corner","มุมที่เหมาะสุดจุดเดียว"],["no feasible solution","ไม่มีคำตอบที่เป็นไปได้"],
                ["no maximum exists","ไม่มีค่าสูงสุด"],["every point on that edge","ทุกจุดบนขอบนั้น"]][S.p.i][L()]; }}
    ],
    rows:function(p){
      var R=[[["Normal","ปกติ"],["a closed polygon","รูปหลายเหลี่ยมปิด"],["one optimal corner","มุมเหมาะสุดหนึ่งมุม"]],
             [["Constraints contradict","ข้อจำกัดขัดแย้งกัน"],["empty","ว่างเปล่า"],["no solution at all","ไม่มีคำตอบเลย"]],
             [["Region open in the good direction","บริเวณเปิดไปทางที่ดีขึ้น"],["unbounded","ไม่มีขอบเขต"],["no maximum","ไม่มีค่าสูงสุด"]],
             [["Objective parallel to an edge","จุดประสงค์ขนานกับขอบ"],["a closed polygon","รูปหลายเหลี่ยมปิด"],["infinitely many optima","คำตอบเหมาะสุดอนันต์"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===0?"ink":(i===0?"good":"warn")}; }); });
    },
    note:["unbounded blocks the maximum but often leaves the minimum perfectly well defined","บริเวณที่ไม่มีขอบเขตอาจทำให้ไม่มีค่าสูงสุด แต่ค่าต่ำสุดมักยังหาได้ตามปกติ"]
  } }
],

methods:[
{id:"M-01", name:["Formulate the model","สร้างแบบจำลอง"]},
{id:"M-02", name:["Graph a constraint correctly","วาดข้อจำกัดให้ถูกต้อง"]},
{id:"M-03", name:["Apply the corner-point theorem","ใช้ทฤษฎีบทจุดมุม"]},
{id:"M-04", name:["Find a maximum or minimum","หาค่าสูงสุดหรือต่ำสุด"]},
{id:"M-05", name:["Recognise a special case","ระบุกรณีพิเศษ"]}
],

traps:{
"T-01":["The constraints x ≥ 0 and y ≥ 0 were left out, so the region spilled into meaningless quadrants.","ลืมข้อจำกัด x ≥ 0 และ y ≥ 0 บริเวณจึงขยายไปยังควอดรันต์ที่ไม่มีความหมาย"],
"T-02":["The wrong side of a boundary was shaded. Test (0, 0) to settle it.","แรเงาผิดด้านของเส้นขอบ ให้ทดสอบที่ (0, 0) แล้วดูว่าเป็นจริงหรือไม่"],
"T-03":["The objective was evaluated at an interior point. The optimum lives at a vertex.","หาค่าฟังก์ชันจุดประสงค์ที่จุดภายใน ทั้งที่ค่าเหมาะที่สุดอยู่ที่จุดยอด"],
"T-04":["A maximum was reported where a minimum was asked for, or the reverse.","ตอบค่าสูงสุดทั้งที่โจทย์ถามค่าต่ำสุด หรือตอบกลับกัน"]
},

gen:{
"M-01": function(sf){
  if(sf==="S-04") return {stem:["Which constraints are almost always implied but not written?",
                                "ข้อจำกัดใดที่มักมีอยู่โดยปริยายแต่ไม่ได้เขียนไว้"],
    opts:[{v:"x ≥ 0 and y ≥ 0",ok:1},{v:"x ≤ 0 and y ≤ 0",trap:"T-01"},
          {v:"x = y",trap:"T-01"},{v:["None","ไม่มี"],trap:"T-01"}],unit:""};
  if(sf==="S-03") return {stem:["In a production problem, what does the objective function represent?",
                                "ในโจทย์การผลิต ฟังก์ชันจุดประสงค์แทนอะไร"],
    opts:[{v:["The quantity being maximised or minimised","ปริมาณที่ต้องการให้มากที่สุดหรือน้อยที่สุด"],ok:1},
          {v:["A resource limit","ข้อจำกัดของทรัพยากร"],trap:"T-01"},
          {v:["The feasible region","อาณาบริเวณที่เป็นไปได้"],trap:"T-03"},
          {v:["The number of variables","จำนวนตัวแปร"]}],unit:""};
  var a=pick([20,30,50]), b=pick([15,25,40]);
  return {stem:["A factory profits "+a+" per unit of A and "+b+" per unit of B. Write the objective function.",
                "โรงงานได้กำไร "+a+" ต่อหน่วยของ A และ "+b+" ต่อหน่วยของ B จงเขียนฟังก์ชันจุดประสงค์"],
    opts:[{v:"P = "+a+"x + "+b+"y",ok:1},{v:"P = "+a+"x − "+b+"y",trap:"T-04"},
          {v:a+"x + "+b+"y ≤ 0",trap:"T-01"},{v:"P = "+(a+b)+"(x + y)"}],unit:""};
},
"M-02": function(sf){
  var c=pick([6,10,12]);
  if(sf==="S-04") return {stem:["How do you decide which side of a boundary to shade?",
                                "เราจะรู้ได้อย่างไรว่าต้องแรเงาด้านไหนของเส้นขอบ"],
    opts:[{v:["Substitute (0, 0) and check whether the inequality holds","แทน (0, 0) แล้วดูว่าอสมการเป็นจริงหรือไม่"],ok:1},
          {v:["Always shade above the line","แรเงาเหนือเส้นเสมอ"],trap:"T-02"},
          {v:["Always shade below the line","แรเงาใต้เส้นเสมอ"],trap:"T-02"},
          {v:["Always shade towards the origin","แรเงาเข้าหาจุดกำเนิดเสมอ"],trap:"T-02"}],unit:""};
  if(sf==="S-03") return {stem:["A constraint uses < rather than ≤. How is its boundary drawn?",
                                "ข้อจำกัดข้อหนึ่งใช้ < ไม่ใช่ ≤ ต้องวาดเส้นขอบของมันอย่างไร"],
    opts:[{v:["Dashed — the boundary is excluded","เส้นประ เพราะไม่รวมเส้นขอบ"],ok:1},
          {v:["Solid — the boundary is included","เส้นทึบ เพราะรวมเส้นขอบ"],trap:"T-02"},
          {v:["It is not drawn at all","ไม่ต้องวาดเลย"],trap:"T-02"},
          {v:["Doubled","วาดสองเส้น"]}],unit:""};
  return {stem:["Where does the line 2x + y = "+c+" cross the y-axis?","เส้น 2x + y = "+c+" ตัดแกน y ที่ใด"],
    opts:[{v:"(0, "+c+")",ok:1},{v:"("+(c/2)+", 0)",trap:"T-02"},
          {v:"(0, "+(c/2)+")",trap:"T-02"},{v:"(0, 0)",trap:"T-01"}],unit:""};
},
"M-03": function(sf){
  var a=pick([2,3,5]), b=pick([3,4,6]), x=pick([2,4,6]), y=pick([1,3,5]);
  if(a===b) b=a+1;   /* otherwise the swapped-coordinates distractor equals the right answer */
  if(sf==="S-04") return {stem:["Where does the optimum of a linear program occur?",
                                "ค่าเหมาะที่สุดของกำหนดการเชิงเส้นเกิดที่ไหน"],
    opts:[{v:["At a vertex of the feasible region","ที่จุดยอดของอาณาบริเวณที่เป็นไปได้"],ok:1},
          {v:["At the centre of the region","ที่ศูนย์กลางของบริเวณ"],trap:"T-03"},
          {v:["At the origin, always","ที่จุดกำเนิดเสมอ"],trap:"T-03"},
          {v:["Anywhere inside the region","ที่ใดก็ได้ภายในบริเวณ"],trap:"T-03"}],unit:""};
  if(sf==="S-03") return {stem:["Why is checking only the corners enough?","ทำไมการตรวจเฉพาะมุมจึงเพียงพอ"],
    opts:[{v:["The objective line leaves the region at a corner last","เส้นจุดประสงค์แตะมุมเป็นจุดสุดท้ายก่อนหลุดออกจากบริเวณ"],ok:1},
          {v:["Corners have the largest coordinates","มุมมีพิกัดใหญ่ที่สุด"],trap:"T-03"},
          {v:["Interior points are not feasible","จุดภายในไม่เป็นไปได้"],trap:"T-03"},
          {v:["It is only an approximation","เป็นเพียงการประมาณ"],trap:"T-03"}],unit:""};
  return {stem:["Evaluate P = "+a+"x + "+b+"y at the vertex ("+x+", "+y+").",
                "จงหาค่า P = "+a+"x + "+b+"y ที่จุดยอด ("+x+", "+y+")"],
    opts:[{v:String(a*x+b*y),ok:1},{v:String(a*y+b*x),trap:"T-04"},
          {v:String(a*x*b*y),trap:"T-03"},{v:String(x+y)}],unit:""};
},
"M-04": function(sf){
  var V=[[0,0],[6,0],[4,3],[0,5]];
  var a=pick([2,3,4]), b=pick([3,5,6]);
  var vals=V.map(function(v){ return a*v[0]+b*v[1]; });
  var mx=Math.max.apply(null,vals), mn=Math.min.apply(null,vals);
  if(sf==="S-04") return {stem:["What is the first step after graphing the constraints?",
                                "หลังวาดกราฟข้อจำกัดแล้ว ขั้นแรกต้องทำอะไร"],
    opts:[{v:["Identify the feasible region and its vertices","หาอาณาบริเวณที่เป็นไปได้และจุดยอดของมัน"],ok:1},
          {v:["Guess a solution","เดาคำตอบ"],trap:"T-03"},
          {v:["Evaluate at the centre","หาค่าที่จุดศูนย์กลาง"],trap:"T-03"},
          {v:["Ignore the objective","ไม่สนใจฟังก์ชันจุดประสงค์"]}],unit:""};
  var wantMin = sf==="S-05";
  return {stem:[(wantMin?"Minimise":"Maximise")+" P = "+a+"x + "+b+"y over the vertices (0,0), (6,0), (4,3), (0,5).",
                "จงหาค่า"+(wantMin?"ต่ำสุด":"สูงสุด")+"ของ P = "+a+"x + "+b+"y ที่จุดยอด (0,0), (6,0), (4,3), (0,5)"],
    opts:[{v:String(wantMin?mn:mx),ok:1},{v:String(wantMin?mx:mn),trap:"T-04"},
          {v:String(a*3+b*2),trap:"T-03"},{v:String(a+b)}],unit:""};
},
"M-05": function(sf){
  if(sf==="S-04") return {stem:["The feasible region is unbounded above. What follows?",
                                "อาณาบริเวณที่เป็นไปได้ไม่มีขอบเขตด้านบน จะสรุปอะไรได้"],
    opts:[{v:["No maximum exists, though a minimum may","ไม่มีค่าสูงสุด แม้ว่าค่าต่ำสุดอาจมี"],ok:1},
          {v:["No solution of any kind exists","ไม่มีคำตอบใดๆ เลย"],trap:"T-04"},
          {v:["Both maximum and minimum exist","มีทั้งค่าสูงสุดและต่ำสุด"],trap:"T-04"},
          {v:["The maximum is at the origin","ค่าสูงสุดอยู่ที่จุดกำเนิด"],trap:"T-03"}],unit:""};
  if(sf==="S-03") return {stem:["The objective line lies parallel to one edge of the region. What does that mean?",
                                "เส้นจุดประสงค์ขนานกับขอบเส้นหนึ่งของบริเวณ แปลว่าอะไร"],
    opts:[{v:["Every point on that edge is optimal","ทุกจุดบนขอบนั้นเป็นค่าเหมาะที่สุด"],ok:1},
          {v:["There is no solution","ไม่มีคำตอบ"],trap:"T-04"},
          {v:["Only the midpoint is optimal","เฉพาะจุดกึ่งกลางที่เหมาะที่สุด"],trap:"T-03"},
          {v:["The problem is unbounded","ปัญหาไม่มีขอบเขต"],trap:"T-04"}],unit:""};
  return {stem:["The constraints contradict each other. What is the feasible region?",
                "ข้อจำกัดขัดแย้งกันเอง อาณาบริเวณที่เป็นไปได้เป็นอย่างไร"],
    opts:[{v:["Empty — there is no solution","ว่างเปล่า ไม่มีคำตอบ"],ok:1},
          {v:["The whole first quadrant","ควอดรันต์ที่หนึ่งทั้งหมด"],trap:"T-01"},
          {v:["A single point","จุดเดียว"],trap:"T-03"},
          {v:["Unbounded","ไม่มีขอบเขต"],trap:"T-04"}],unit:""};
}
}
};
