var CHAPTER = {
id:"ma05", num:"05", slug:"analytic-geometry", subject:"math",
kicker:["Mathematics · Chapter 05","คณิตศาสตร์ · บทที่ 5"],
title:["Analytic Geometry","เรขาคณิตวิเคราะห์"],
mapTitle:["Shapes written as equations","รูปทรงที่เขียนเป็นสมการ"],
lede:["Descartes' idea was that every geometric statement can be turned into an algebraic one. Once a curve is an equation you stop drawing and start calculating — and the four conic sections all turn out to be the same equation wearing different signs.",
      "ความคิดของเดการ์ตคือทุกข้อความทางเรขาคณิตเปลี่ยนเป็นพีชคณิตได้ เมื่อเส้นโค้งกลายเป็นสมการ เราก็เลิกวาดแล้วเริ่มคำนวณ และภาคตัดกรวยทั้งสี่ก็กลายเป็นสมการเดียวกันที่สวมเครื่องหมายต่างกัน"],
next:["→ continues in Chapter 06 · Matrices","→ ต่อในบทที่ 6 · เมทริกซ์"],

nodes:[
{ id:"points-lines", x:235, y:52, requires:[], methods:["M-01"],
  title:["Points and lines","จุดและเส้นตรง"],
  body:[["Distance comes from Pythagoras, the midpoint from averaging, and the gradient from rise over run. A line through a known point with a known gradient is y − y₁ = m(x − x₁), which is worth preferring over y = mx + c because it needs no rearranging.",
         "Parallel lines share a gradient; perpendicular ones have gradients multiplying to −1, not to +1. The distance from a point to a line, |Ax₁ + By₁ + C| / √(A² + B²), is the one formula here that is genuinely worth memorising."],
        ["ระยะทางมาจากพีทาโกรัส จุดกึ่งกลางมาจากการเฉลี่ย และความชันมาจากการเปลี่ยนแปลงตามแนวตั้งหารแนวนอน เส้นตรงที่ผ่านจุดที่รู้และมีความชันที่รู้คือ y − y₁ = m(x − x₁) ซึ่งควรใช้มากกว่า y = mx + c เพราะไม่ต้องจัดรูป",
         "เส้นขนานมีความชันเท่ากัน เส้นตั้งฉากมีผลคูณความชันเป็น −1 ไม่ใช่ +1 ส่วนระยะจากจุดถึงเส้นตรง |Ax₁ + By₁ + C| / √(A² + B²) เป็นสูตรเดียวในหัวข้อนี้ที่ควรท่องจำจริงๆ"]],
  formula:["m₁m₂ = −1 for perpendicular        d = |Ax₁+By₁+C| / √(A²+B²)","ตั้งฉาก m₁m₂ = −1        d = |Ax₁+By₁+C| / √(A²+B²)"],
  flabel:["Perpendicular gives −1, not +1","ตั้งฉากได้ −1 ไม่ใช่ +1"],
  viz:"plot",
  vizcfg:{
    title:["A LINE, ITS SLOPE AND ITS INTERCEPTS","เส้นตรง ความชัน และจุดตัดแกน"],
    xlab:["x","x"], ylab:["y","y"],
    xmin:-6, xmax:6, fill:false,
    fn:function(x,p){ return p.m*x + p.c; },
    mark:function(p){ return p.x; },
    ctrls:[
      {k:"m", lab:["Gradient m","ความชัน m"], min:-4, max:4, step:.25, def:1.5, unit:""},
      {k:"c", lab:["y-intercept c","จุดตัดแกน y คือ c"], min:-6, max:6, step:.5, def:1, unit:""},
      {k:"x", lab:["Point at x","จุดที่ x"], min:-5.5, max:5.5, step:.5, def:2, unit:""}
    ],
    readouts:[
      {lab:["Equation","สมการ"], f:function(S){
        return "y = "+fmt(S.p.m)+"x "+(S.p.c>=0?"+ ":"− ")+fmt(Math.abs(S.p.c)); }},
      {lab:["x-intercept","จุดตัดแกน x"], f:function(S){
        return Math.abs(S.p.m)<1e-9 ? (L()?"ไม่มี — เส้นขนานแกน x":"none — the line is horizontal")
                                    : fmt2(-S.p.c/S.p.m); }},
      {lab:["Perpendicular gradient","ความชันของเส้นตั้งฉาก"], f:function(S){
        return Math.abs(S.p.m)<1e-9 ? (L()?"ไม่นิยาม — แนวดิ่ง":"undefined — vertical")
                                    : fmt2(-1/S.p.m); }},
      {lab:["Distance from the origin","ระยะจากจุดกำเนิด"], f:function(S){
        return fmt2(Math.abs(S.p.c)/Math.sqrt(S.p.m*S.p.m+1)); }}
    ],
    note:["perpendicular gradients multiply to −1 — not to +1, and not to zero","ความชันของเส้นตั้งฉากคูณกันได้ −1 ไม่ใช่ +1 และไม่ใช่ศูนย์"]
  } },

{ id:"circle", x:100, y:150, requires:["points-lines"], methods:["M-02"],
  title:["The circle","วงกลม"],
  body:[["The standard form (x − h)² + (y − k)² = r² reads its centre and radius straight off. The general form x² + y² + ax + by + c = 0 hides them, and completing the square on each variable is what converts one to the other.",
         "Reading the centre from the general form without completing the square is trap T-03 — the signs come out wrong. A tangent meets the circle at exactly one point and is perpendicular to the radius there, which is usually the fastest route into a tangent problem."],
        ["รูปมาตรฐาน (x − h)² + (y − k)² = r² อ่านจุดศูนย์กลางและรัศมีได้ทันที ส่วนรูปทั่วไป x² + y² + ax + by + c = 0 ซ่อนทั้งสองไว้ และการทำกำลังสองสมบูรณ์ในแต่ละตัวแปรคือสิ่งที่แปลงรูปหนึ่งเป็นอีกรูป",
         "การอ่านจุดศูนย์กลางจากรูปทั่วไปโดยไม่ทำกำลังสองสมบูรณ์คือกับดัก T-03 เพราะเครื่องหมายจะออกมาผิด เส้นสัมผัสพบวงกลมที่จุดเดียวพอดีและตั้งฉากกับรัศมี ณ จุดนั้น ซึ่งมักเป็นทางเข้าที่เร็วที่สุดของโจทย์เส้นสัมผัส"]],
  formula:["(x − h)² + (y − k)² = r²","(x − h)² + (y − k)² = r²"],
  flabel:["Complete the square to read the centre","ทำกำลังสองสมบูรณ์เพื่ออ่านจุดศูนย์กลาง"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"h", lab:["Centre x","จุดศูนย์กลาง x"], min:-4, max:4, step:.5, def:0, unit:""},
      {k:"k", lab:["Centre y","จุดศูนย์กลาง y"], min:-4, max:4, step:.5, def:0, unit:""},
      {k:"r", lab:["Radius","รัศมี"], min:.5, max:5, step:.25, def:3, unit:""},
      {k:"px", lab:["Test point x","จุดทดสอบ x"], min:-7, max:7, step:.5, def:5, unit:""}
    ],
    readouts:[
      {lab:["Equation","สมการ"], f:function(S){
        var p=S.p;
        return "(x "+(p.h>=0?"− ":"+ ")+fmt(Math.abs(p.h))+")² + (y "+(p.k>=0?"− ":"+ ")+fmt(Math.abs(p.k))+")² = "+fmt2(p.r*p.r); }},
      {lab:["Centre","จุดศูนย์กลาง"], f:function(S){ return "("+fmt(S.p.h)+", "+fmt(S.p.k)+")"; }},
      {lab:["Distance to test point","ระยะถึงจุดทดสอบ"], f:function(S){
        var p=S.p; return fmt2(Math.abs(p.px-p.h)); }},
      {lab:["Test point lies","จุดทดสอบอยู่"], f:function(S){
        var p=S.p, d=Math.abs(p.px-p.h);
        return d<p.r ? (L()?"ภายในวง":"inside the circle") : d>p.r ? (L()?"ภายนอกวง":"outside the circle")
                     : (L()?"บนเส้นรอบวงพอดี":"exactly on the circle"); }}
    ],
    draw:function(S,o){
      var p=S.p;
      var A=axes(o,{x:110,y:30,w:300,h:250,xmin:-8,xmax:8,ymin:-6.5,ymax:6.5,
                    title:["A CIRCLE IS A CONSTANT DISTANCE","วงกลมคือระยะทางที่คงที่"],
                    xlab:"x", ylab:"y", xticks:5, yticks:5});
      var cx=A.X(p.h), cy=A.Y(p.k);
      var rx=A.X(p.r)-A.X(0), ry=A.Y(0)-A.Y(p.r);
      o.push('<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+
             '" fill="var(--accent)" fill-opacity="0.08" stroke="var(--accent)" stroke-width="2.2"/>');
      o.push('<circle cx="'+cx+'" cy="'+cy+'" r="4.5" fill="var(--ink)"/>');
      o.push('<line x1="'+cx+'" y1="'+cy+'" x2="'+A.X(p.h+p.r)+'" y2="'+cy+
             '" stroke="var(--ink-soft)" stroke-width="1.8" stroke-dasharray="4 3"/>');
      o.push('<text x="'+((cx+A.X(p.h+p.r))/2)+'" y="'+(cy-8)+'" fill="var(--ink-soft)" '+
             'font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">r = '+fmt(p.r)+'</text>');
      var tx2=A.X(p.px), ty=A.Y(p.k);
      var d=Math.abs(p.px-p.h);
      var c2 = d<p.r ? "var(--good)" : d>p.r ? "var(--warn)" : "var(--accent)";
      o.push('<circle cx="'+tx2+'" cy="'+ty+'" r="5.5" fill="'+c2+'"/>');
      cap(o,110,308,["green inside · amber outside · the radius never changes",
                     "เขียวคืออยู่ใน · เหลืองอำพันคืออยู่นอก · รัศมีไม่เคยเปลี่ยน"],"note");
    }
  },
  guide:[
    {say:["Every point on the ring is exactly r from the centre. That single sentence is the equation.",
          "ทุกจุดบนวงห่างจากจุดศูนย์กลางเท่ากับ r พอดี ประโยคเดียวนั้นคือสมการ"], set:{h:0,k:0,r:3,px:5}},
    {say:["Move the centre and the equation gains the (x − h) and (y − k) brackets. Nothing else changes.",
          "ย้ายจุดศูนย์กลาง สมการจะมีวงเล็บ (x − h) และ (y − k) เพิ่มมา ไม่มีอะไรอื่นเปลี่ยน"], set:{h:3,k:-2,r:3,px:5}},
    {say:["Note the minus signs: a centre at +3 appears as (x − 3). That sign flip is the classic slip.",
          "สังเกตเครื่องหมายลบ จุดศูนย์กลางที่ +3 ปรากฏเป็น (x − 3) การกลับเครื่องหมายนี้คือข้อผิดพลาดคลาสสิก"], set:{h:3,k:-2,r:4,px:0}}
  ] },

{ id:"conics", x:370, y:150, requires:["points-lines"], methods:["M-03"],
  title:["The conic family","ตระกูลภาคตัดกรวย"],
  body:[["Slice a double cone with a plane and you get one of four curves, decided entirely by the angle of the cut: perpendicular to the axis gives a circle, parallel to the slant gives a parabola, an intermediate angle gives an ellipse, and cutting through both halves gives a hyperbola.",
         "From the general equation Ax² + Cy² + Dx + Ey + F = 0 you can identify the curve without drawing anything. A = C is a circle; A and C the same sign but unequal is an ellipse; opposite signs is a hyperbola; one of them zero is a parabola. Drive the lab and watch the eccentricity cross 1 as the family changes."],
        ["ผ่ากรวยคู่ด้วยระนาบแล้วจะได้เส้นโค้งหนึ่งในสี่ ตัดสินโดยมุมของการผ่าล้วนๆ ตั้งฉากกับแกนได้วงกลม ขนานกับเส้นเอียงได้พาราโบลา มุมกลางๆ ได้วงรี และผ่าทะลุทั้งสองซีกได้ไฮเพอร์โบลา",
         "จากสมการทั่วไป Ax² + Cy² + Dx + Ey + F = 0 เราระบุชนิดเส้นโค้งได้โดยไม่ต้องวาด A = C คือวงกลม A กับ C เครื่องหมายเดียวกันแต่ไม่เท่ากันคือวงรี เครื่องหมายต่างกันคือไฮเพอร์โบลา ตัวใดตัวหนึ่งเป็นศูนย์คือพาราโบลา ลองปรับในห้องทดลองแล้วดูความเยื้องศูนย์กลางข้ามค่า 1 เมื่อเปลี่ยนตระกูล"]],
  formula:["A = C circle · same sign ellipse · opposite sign hyperbola · one zero parabola","A = C วงกลม · เครื่องหมายเดียวกันวงรี · ต่างกันไฮเพอร์โบลา · ตัวหนึ่งเป็นศูนย์พาราโบลา"],
  flabel:["Identify before you draw","ระบุชนิดก่อนวาด"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"kind", lab:["",""], opts:[["circle","วงกลม"], ["ellipse","วงรี"], ["parabola","พาราโบลา"], ["hyperbola","ไฮเพอร์โบลา"]], min:0, def:1, unit:""},
      {k:"a", lab:["a","a"], min:1, max:6, step:.5, def:4, unit:""},
      {k:"b", lab:["b","b"], min:1, max:6, step:.5, def:2, unit:""}
    ],
    readouts:[
      {lab:["Curve","เส้นโค้ง"], f:function(S){
        var N=[["Circle","วงกลม"],["Ellipse","วงรี"],["Parabola","พาราโบลา"],["Hyperbola","ไฮเพอร์โบลา"]];
        return N[S.p.kind][L()]; }},
      {lab:["c","c"], f:function(S){
        var a=S.p.a,b=S.p.b,k=S.p.kind;
        if(k===0) return "0";
        if(k===1) return fmt2(Math.sqrt(Math.max(a*a-b*b,0)));
        if(k===3) return fmt2(Math.sqrt(a*a+b*b));
        return fmt2(a/4); }},
      {lab:["Eccentricity e","ความเยื้องศูนย์กลาง e"], f:function(S){
        var a=S.p.a,b=S.p.b,k=S.p.kind;
        if(k===0) return "0";
        if(k===1) return fmt2(Math.sqrt(Math.max(a*a-b*b,0))/a);
        if(k===2) return "1";
        return fmt2(Math.sqrt(a*a+b*b)/a); }}
    ],
    draw:function(S,o){
      var a=S.p.a, b=S.p.b, k=S.p.kind;
      var A=axes(o,{x:58,y:44,w:462,h:216,xmin:-8,xmax:8,ymin:-6,ymax:6,
                    title:["CONIC SECTION","ภาคตัดกรวย"],xlab:"x",ylab:"y"});
      var d="", i, t, xx, yy;
      if(k===0 || k===1){
        var ra = (k===0)? a : a, rb = (k===0)? a : b;
        for(i=0;i<=180;i++){
          t=2*Math.PI*i/180; xx=ra*Math.cos(t); yy=rb*Math.sin(t);
          d+=(i?" L":"M")+A.X(xx)+" "+A.Y(yy);
        }
        o.push('<path d="'+d+'" stroke="var(--accent)" stroke-width="2.4" fill="none"/>');
        var cc=(k===0)?0:Math.sqrt(Math.max(ra*ra-rb*rb,0));
        [cc,-cc].forEach(function(fx){
          if(cc>0.01) o.push('<circle cx="'+A.X(fx)+'" cy="'+A.Y(0)+'" r="4" fill="var(--ink)"/>');
        });
      } else if(k===2){
        var c4=a/4;
        for(i=0;i<=120;i++){
          yy=-6+12*i/120; xx=yy*yy/(4*c4);
          if(xx>9) continue;
          d+=(d?" L":"M")+A.X(xx)+" "+A.Y(yy);
        }
        o.push('<path d="'+d+'" stroke="var(--accent)" stroke-width="2.4" fill="none"/>');
        o.push('<circle cx="'+A.X(c4)+'" cy="'+A.Y(0)+'" r="4" fill="var(--ink)"/>');
        o.push('<line x1="'+A.X(-c4)+'" y1="'+A.Y(-6)+'" x2="'+A.X(-c4)+'" y2="'+A.Y(6)+
               '" stroke="var(--ink-faint)" stroke-width="1.2" stroke-dasharray="4 3"/>');
        o.push('<text x="'+A.X(-c4)+'" y="'+(A.Y(6)-6)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">'+tx(["directrix","ไดเรกทริกซ์"])+'</text>');
      } else {
        [1,-1].forEach(function(sgn){
          var dd="";
          for(i=0;i<=100;i++){
            t=-1.6+3.2*i/100; xx=sgn*a*Math.cosh(t); yy=b*Math.sinh(t);
            if(Math.abs(xx)>9||Math.abs(yy)>6) continue;
            dd+=(dd?" L":"M")+A.X(xx)+" "+A.Y(yy);
          }
          o.push('<path d="'+dd+'" stroke="var(--accent)" stroke-width="2.4" fill="none"/>');
        });
        /* asymptotes y = ±(b/a)x */
        [1,-1].forEach(function(sg){
          o.push('<line x1="'+A.X(-8)+'" y1="'+A.Y(sg*b/a*-8)+'" x2="'+A.X(8)+'" y2="'+A.Y(sg*b/a*8)+
                 '" stroke="var(--ink-faint)" stroke-width="1.2" stroke-dasharray="4 3"/>');
        });
        var ch=Math.sqrt(a*a+b*b);
        [ch,-ch].forEach(function(fx){
          o.push('<circle cx="'+A.X(fx)+'" cy="'+A.Y(0)+'" r="4" fill="var(--ink)"/>');
        });
      }
      var EQ=["x² + y² = a²","x²/a² + y²/b² = 1","y² = 4cx","x²/a² − y²/b² = 1"][k];
      var REL=["","c² = a² − b²","e = 1","c² = a² + b²"][k];
      o.push('<text x="58" y="296" fill="var(--ink)" font-family="Bodoni Moda" font-size="18">'+EQ+'</text>');
      if(REL) o.push('<text x="300" y="296" fill="var(--accent)" font-family="IBM Plex Sans" font-size="12" font-weight="600">'+REL+'</text>');
      o.push('<text x="58" y="318" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["foci drawn as solid dots","จุดโฟกัสวาดเป็นจุดทึบ"])+'</text>');
    }
  },
  guide:[
    {say:["A circle: both axes equal, both foci collapsed onto the centre, eccentricity exactly zero.",
          "วงกลม แกนทั้งสองเท่ากัน โฟกัสทั้งสองยุบมาที่จุดศูนย์กลาง ความเยื้องศูนย์กลางเป็นศูนย์พอดี"], set:{kind:0,a:4,b:4}},
    {say:["Now an ellipse. Pull b down and the foci slide outwards — c² = a² − b², so c grows as b shrinks.",
          "ทีนี้เป็นวงรี ลด b ลงแล้วโฟกัสจะเลื่อนออก c² = a² − b² ดังนั้น c โตขึ้นเมื่อ b เล็กลง"], set:{kind:1,a:5,b:2}},
    {say:["The parabola sits exactly at e = 1 — the boundary case between the closed and open families.",
          "พาราโบลาอยู่ที่ e = 1 พอดี เป็นกรณีขอบเขตระหว่างตระกูลปิดกับตระกูลเปิด"], set:{kind:2,a:4,b:2}},
    {say:["The hyperbola. Note the relation on screen flipped to c² = a² + b² — a PLUS. That single sign is the classic error.",
          "ไฮเพอร์โบลา สังเกตว่าความสัมพันธ์บนจอเปลี่ยนเป็น c² = a² + b² คือเครื่องหมายบวก เครื่องหมายเดียวนี้คือข้อผิดพลาดคลาสสิก"], set:{kind:3,a:3,b:2}}
  ]},

{ id:"parabola-ellipse", x:235, y:248, requires:["circle","conics"], methods:["M-04"],
  title:["Parabola and ellipse","พาราโบลาและวงรี"],
  body:[["A parabola is the set of points equidistant from a focus and a directrix. In the form (y − k)² = 4c(x − h) the focus sits c from the vertex and the directrix c the other way, and the latus rectum has length |4c|.",
         "An ellipse is the set of points whose distances to two foci sum to a constant 2a. Here c² = a² − b², with a always the larger, and the eccentricity e = c/a lies strictly between 0 and 1 — the closer to zero, the rounder."],
        ["พาราโบลาคือเซตของจุดที่ห่างจากโฟกัสเท่ากับห่างจากไดเรกทริกซ์ ในรูป (y − k)² = 4c(x − h) โฟกัสอยู่ห่างจากจุดยอด c และไดเรกทริกซ์อยู่อีกด้านที่ระยะ c ส่วนลาตัสเรกตัมยาว |4c|",
         "วงรีคือเซตของจุดที่ผลบวกระยะถึงโฟกัสทั้งสองคงที่เท่ากับ 2a ตรงนี้ c² = a² − b² โดย a เป็นตัวที่ใหญ่กว่าเสมอ และความเยื้องศูนย์กลาง e = c/a อยู่ระหว่าง 0 กับ 1 เสมอ ยิ่งใกล้ศูนย์ยิ่งกลม"]],
  formula:["(y−k)² = 4c(x−h)        x²/a² + y²/b² = 1 ,  c² = a² − b²","(y−k)² = 4c(x−h)        x²/a² + y²/b² = 1 ,  c² = a² − b²"],
  flabel:["Ellipse subtracts","วงรีใช้เครื่องหมายลบ"],
  viz:"plot",
  vizcfg:{
    title:["THE PARABOLA AND ITS FOCUS","พาราโบลาและจุดโฟกัส"],
    xlab:["x","x"], ylab:["y","y"],
    xmin:-6, xmax:6, fill:false,
    fn:function(x,p){ return (x-p.h)*(x-p.h)/(4*p.a) + p.k; },
    mark:function(p){ return p.h; },
    ctrls:[
      {k:"a", lab:["Focal distance a","ระยะโฟกัส a"], min:.25, max:3, step:.25, def:1, unit:""},
      {k:"h", lab:["Vertex x","จุดยอด x"], min:-4, max:4, step:.5, def:0, unit:""},
      {k:"k", lab:["Vertex y","จุดยอด y"], min:-4, max:4, step:.5, def:-2, unit:""}
    ],
    readouts:[
      {lab:["Vertex","จุดยอด"], f:function(S){ return "("+fmt(S.p.h)+", "+fmt(S.p.k)+")"; }},
      {lab:["Focus","จุดโฟกัส"], f:function(S){ return "("+fmt(S.p.h)+", "+fmt(S.p.k+S.p.a)+")"; }},
      {lab:["Directrix","ไดเรกทริกซ์"], f:function(S){ return "y = "+fmt(S.p.k-S.p.a); }},
      {lab:["Defining property","สมบัติที่เป็นนิยาม"], f:function(){
        return L()?"ทุกจุดห่างจากโฟกัสเท่ากับห่างจากไดเรกทริกซ์":"every point is equally far from the focus and the directrix"; }}
    ],
    note:["a larger focal distance makes a wider, lazier curve — the focus moves away from the vertex","ระยะโฟกัสที่มากขึ้นทำให้เส้นโค้งกว้างและแบนลง จุดโฟกัสเลื่อนออกห่างจากจุดยอด"]
  } },

{ id:"hyperbola", x:235, y:346, requires:["parabola-ellipse"], methods:["M-05","M-06"],
  title:["The hyperbola","ไฮเพอร์โบลา"],
  body:[["A hyperbola is the set of points whose distances to two foci *differ* by a constant 2a. Its equation looks almost identical to the ellipse's but with a minus between the terms, and it opens along whichever variable carries the positive sign.",
         "The relation is **c² = a² + b²** — a plus, not the ellipse's minus. This single sign is the most reliably examined error in the whole chapter, so check which family you are in before writing it. The asymptotes y − k = ±(b/a)(x − h) guide the sketch, and the eccentricity always exceeds 1."],
        ["ไฮเพอร์โบลาคือเซตของจุดที่ผลต่างระยะถึงโฟกัสทั้งสองคงที่เท่ากับ 2a สมการหน้าตาเกือบเหมือนวงรีแต่มีเครื่องหมายลบคั่นระหว่างพจน์ และมันเปิดไปตามตัวแปรที่มีเครื่องหมายบวก",
         "ความสัมพันธ์คือ c² = a² + b² เป็นบวก ไม่ใช่ลบแบบวงรี เครื่องหมายเดียวนี้คือข้อผิดพลาดที่ถูกออกสอบอย่างสม่ำเสมอที่สุดในบทนี้ จึงต้องตรวจก่อนว่าอยู่ตระกูลใดก่อนเขียน เส้นกำกับ y − k = ±(b/a)(x − h) ช่วยนำการร่างภาพ และความเยื้องศูนย์กลางมากกว่า 1 เสมอ"]],
  formula:["x²/a² − y²/b² = 1 ,  c² = a² + b² ,  e > 1","x²/a² − y²/b² = 1 ,  c² = a² + b² ,  e > 1"],
  flabel:["Hyperbola adds — the opposite of the ellipse","ไฮเพอร์โบลาใช้บวก ตรงข้ามกับวงรี"],
  viz:"plot",
  vizcfg:{
    title:["A RECTANGULAR HYPERBOLA AND ITS ASYMPTOTES","ไฮเพอร์โบลามุมฉากและเส้นกำกับ"],
    xlab:["x","x"], ylab:["y = k / x","y = k / x"],
    xmin:0.3, xmax:8, fill:false,
    fn:function(x,p){ return p.k/x; },
    mark:function(p){ return p.x; },
    ctrls:[
      {k:"k", lab:["Constant k","ค่าคงที่ k"], min:1, max:12, step:.5, def:6, unit:""},
      {k:"x", lab:["Point at x","จุดที่ x"], min:.4, max:7.5, step:.1, def:2, unit:""}
    ],
    readouts:[
      {lab:["y at that x","ค่า y ที่ x นั้น"], f:function(S){ return fmt2(S.p.k/S.p.x); }},
      {lab:["Product x·y","ผลคูณ x·y"], f:function(S){
        return fmt2(S.p.k)+(L()?" · คงที่เสมอ":" · constant, always"); }},
      {lab:["Asymptotes","เส้นกำกับ"], f:function(){ return "x = 0  " + (L()?"และ":"and") + "  y = 0"; }},
      {lab:["Does it ever touch them?","แตะเส้นกำกับไหม"], f:function(){
        return L()?"ไม่เลย — เข้าใกล้ตลอดไป":"never — it approaches forever"; }}
    ],
    note:["this is the same curve as a gas isotherm, where PV stays constant","นี่คือเส้นโค้งเดียวกับเส้นอุณหภูมิคงที่ของแก๊ส ที่ PV คงที่"]
  } }
],

methods:[
{id:"M-01", name:["Distance, midpoint and gradient","ระยะทาง จุดกึ่งกลาง และความชัน"]},
{id:"M-02", name:["Circle from general to standard form","แปลงวงกลมจากรูปทั่วไปเป็นมาตรฐาน"]},
{id:"M-03", name:["Identify a conic from its equation","ระบุชนิดภาคตัดกรวยจากสมการ"]},
{id:"M-04", name:["Parabola and ellipse features","องค์ประกอบของพาราโบลาและวงรี"]},
{id:"M-05", name:["Hyperbola features","องค์ประกอบของไฮเพอร์โบลา"]},
{id:"M-06", name:["Eccentricity","ความเยื้องศูนย์กลาง"]}
],

traps:{
"T-01":["Hyperbola uses c² = a² + b². Only the ellipse subtracts.","ไฮเพอร์โบลาใช้ c² = a² + b² มีเพียงวงรีที่ใช้เครื่องหมายลบ"],
"T-02":["Perpendicular gradients multiply to −1, not +1.","ความชันของเส้นตั้งฉากคูณกันได้ −1 ไม่ใช่ +1"],
"T-03":["Complete the square before reading a circle's centre from the general form.","ต้องทำกำลังสองสมบูรณ์ก่อนอ่านจุดศูนย์กลางวงกลมจากรูปทั่วไป"],
"T-04":["Conic misidentified. Compare the signs of the x² and y² coefficients first.","ระบุชนิดภาคตัดกรวยผิด ให้เทียบเครื่องหมายของสัมประสิทธิ์ x² และ y² ก่อน"]
},

gen:{
"M-01": function(sf){
  var x1=ri(-4,4), y1=ri(-4,4), x2=ri(-4,4)+5, y2=ri(-4,4)+5;
  var m=(y2-y1)/(x2-x1);
  if(sf==="S-04") return {stem:["A line has gradient 3. What is the gradient of any line perpendicular to it?",
                                "เส้นตรงมีความชัน 3 เส้นที่ตั้งฉากกับมันมีความชันเท่าใด"],
    opts:[{v:"−1/3",ok:1},{v:"1/3",trap:"T-02"},{v:"3",trap:"T-02"},{v:"−3",trap:"T-02"}],unit:""};
  if(sf==="S-05") return {stem:["The midpoint of AB is ("+fmt((x1+x2)/2)+", "+fmt((y1+y2)/2)+") and A is ("+x1+", "+y1+"). Find B.",
                                "จุดกึ่งกลางของ AB คือ ("+fmt((x1+x2)/2)+", "+fmt((y1+y2)/2)+") และ A คือ ("+x1+", "+y1+") จงหา B"],
    opts:[{v:"("+x2+", "+y2+")",ok:1},{v:"("+(-x2)+", "+(-y2)+")"},
          {v:"("+fmt((x1+x2)/2)+", "+fmt((y1+y2)/2)+")"},{v:"("+(x2-x1)+", "+(y2-y1)+")"}],unit:""};
  return {stem:["Find the distance between ("+x1+", "+y1+") and ("+x2+", "+y2+").",
                "จงหาระยะระหว่างจุด ("+x1+", "+y1+") และ ("+x2+", "+y2+")"],
    opts:[{v:fmt2(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))),ok:1},
          {v:fmt2(Math.abs(x2-x1)+Math.abs(y2-y1))},
          {v:fmt2((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))},
          {v:fmt2(m)}],unit:""};
},
"M-02": function(sf){
  var h=ri(-4,4), k=ri(-4,4), r=ri(2,6);
  var a=-2*h, b=-2*k, c=h*h+k*k-r*r;
  if(sf==="S-04") return {stem:["What must you do before reading the centre of x² + y² + ax + by + c = 0?",
                                "ก่อนอ่านจุดศูนย์กลางของ x² + y² + ax + by + c = 0 ต้องทำอะไร"],
    opts:[{v:["Complete the square in x and in y","ทำกำลังสองสมบูรณ์ทั้งใน x และ y"],ok:1},
          {v:["Read (a, b) directly","อ่าน (a, b) ได้เลย"],trap:"T-03"},
          {v:["Read (−a, −b) directly","อ่าน (−a, −b) ได้เลย"],trap:"T-03"},
          {v:["Divide everything by c","หารทุกพจน์ด้วย c"]}],unit:""};
  return {stem:["Find the centre of x² + y² "+(a>=0?"+ ":"− ")+Math.abs(a)+"x "+(b>=0?"+ ":"− ")+Math.abs(b)+"y "+(c>=0?"+ ":"− ")+Math.abs(c)+" = 0.",
                "จงหาจุดศูนย์กลางของ x² + y² "+(a>=0?"+ ":"− ")+Math.abs(a)+"x "+(b>=0?"+ ":"− ")+Math.abs(b)+"y "+(c>=0?"+ ":"− ")+Math.abs(c)+" = 0"],
    opts:[{v:"("+h+", "+k+")",ok:1},{v:"("+a+", "+b+")",trap:"T-03"},
          {v:"("+(-h)+", "+(-k)+")",trap:"T-03"},{v:"("+r+", "+r+")"}],unit:""};
},
"M-03": function(sf){
  var C=[{e:"4x² + 4y² − 8x = 0", a:["Circle","วงกลม"], w:[["Ellipse","วงรี"],["Hyperbola","ไฮเพอร์โบลา"],["Parabola","พาราโบลา"]]},
         {e:"9x² + 4y² = 36",     a:["Ellipse","วงรี"], w:[["Circle","วงกลม"],["Hyperbola","ไฮเพอร์โบลา"],["Parabola","พาราโบลา"]]},
         {e:"9x² − 4y² = 36",     a:["Hyperbola","ไฮเพอร์โบลา"], w:[["Ellipse","วงรี"],["Circle","วงกลม"],["Parabola","พาราโบลา"]]},
         {e:"y² − 8x = 0",        a:["Parabola","พาราโบลา"], w:[["Hyperbola","ไฮเพอร์โบลา"],["Ellipse","วงรี"],["Circle","วงกลม"]]}];
  var c=pick(C);
  return {stem:["Identify the conic "+c.e+".","จงระบุชนิดภาคตัดกรวยของ "+c.e],
    opts:[{v:c.a,ok:1},{v:c.w[0],trap:"T-04"},{v:c.w[1],trap:"T-04"},{v:c.w[2]}],unit:""};
},
"M-04": function(sf){
  var a=pick([5,10,13]), b=pick([3,6,12]);
  if(b>=a){ var t=a; a=b+2; }
  var c=Math.sqrt(a*a-b*b);
  if(sf==="S-04") return {stem:["A parabola is defined as the set of points equidistant from which two things?",
                                "พาราโบลานิยามเป็นเซตของจุดที่ห่างเท่ากันจากสองสิ่งใด"],
    opts:[{v:["A focus and a directrix","โฟกัสและไดเรกทริกซ์"],ok:1},
          {v:["Two foci","โฟกัสสองจุด"],trap:"T-04"},
          {v:["A centre and a vertex","จุดศูนย์กลางและจุดยอด"]},
          {v:["Two directrices","ไดเรกทริกซ์สองเส้น"]}],unit:""};
  if(sf==="S-05") return {stem:["An ellipse has a = "+a+" and c = "+fmt2(c)+". Find b.",
                                "วงรีมี a = "+a+" และ c = "+fmt2(c)+" จงหา b"],
    opts:[{v:String(b),ok:1},{v:fmt2(Math.sqrt(a*a+c*c)),trap:"T-01"},
          {v:fmt2(a-c)},{v:fmt2(a+c)}],unit:""};
  return {stem:["An ellipse has a = "+a+" and b = "+b+". Find c.","วงรีมี a = "+a+" และ b = "+b+" จงหา c"],
    opts:[{v:fmt2(c),ok:1},{v:fmt2(Math.sqrt(a*a+b*b)),trap:"T-01"},
          {v:fmt2(a-b)},{v:fmt2(a*b)}],unit:""};
},
"M-05": function(sf){
  var a=pick([3,4,5]), b=pick([2,3,12]);
  var c=Math.sqrt(a*a+b*b);
  if(sf==="S-04") return {stem:["For a hyperbola, which relation connects a, b and c?",
                                "สำหรับไฮเพอร์โบลา ความสัมพันธ์ใดเชื่อม a, b และ c"],
    opts:[{v:"c² = a² + b²",ok:1},{v:"c² = a² − b²",trap:"T-01"},
          {v:"c² = b² − a²",trap:"T-01"},{v:"c = a + b"}],unit:""};
  if(sf==="S-02"||sf==="S-03") return {stem:["A hyperbola has x²/"+(a*a)+" − y²/"+(b*b)+" = 1. What are its asymptotes?",
                                             "ไฮเพอร์โบลา x²/"+(a*a)+" − y²/"+(b*b)+" = 1 มีเส้นกำกับเป็นอะไร"],
    opts:[{v:"y = ±("+b+"/"+a+")x",ok:1},{v:"y = ±("+a+"/"+b+")x",trap:"T-04"},
          {v:"y = ±"+a+"x"},{v:"y = ±"+b+"x"}],unit:""};
  return {stem:["A hyperbola has a = "+a+" and b = "+b+". Find c.","ไฮเพอร์โบลามี a = "+a+" และ b = "+b+" จงหา c"],
    opts:[{v:fmt2(c),ok:1},{v:fmt2(Math.sqrt(Math.abs(a*a-b*b))),trap:"T-01"},
          {v:String(a+b)},{v:fmt2(c/2)}],unit:""};
},
"M-06": function(sf){
  var C=[{q:["a circle","วงกลม"],a:"e = 0",w:["0 < e < 1","e = 1","e > 1"]},
         {q:["an ellipse","วงรี"],a:"0 < e < 1",w:["e = 0","e = 1","e > 1"]},
         {q:["a parabola","พาราโบลา"],a:"e = 1",w:["e = 0","0 < e < 1","e > 1"]},
         {q:["a hyperbola","ไฮเพอร์โบลา"],a:"e > 1",w:["e = 0","0 < e < 1","e = 1"]}];
  var c=pick(C);
  if(sf==="S-05") return {stem:["An ellipse has eccentricity 0.6 and a = 10. Find c.",
                                "วงรีมีความเยื้องศูนย์กลาง 0.6 และ a = 10 จงหา c"],
    opts:[{v:"6",ok:1},{v:"0.06"},{v:"16.7",trap:"T-01"},{v:"10"}],unit:""};
  return {stem:["What is the eccentricity of "+c.q[0]+"?","ความเยื้องศูนย์กลางของ"+c.q[1]+"เป็นเท่าใด"],
    opts:[{v:c.a,ok:1},{v:c.w[0],trap:"T-04"},{v:c.w[1],trap:"T-04"},{v:c.w[2]}],unit:""};
}
}
};
