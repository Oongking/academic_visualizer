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
  formula:["R = u² sin 2θ / g        t_flight = 2u sin θ / g","R = u² sin 2θ / g        t บิน = 2u sin θ / g"],
  flabel:["Maximum range at 45°","ไกลสุดที่ 45°"],
  viz:{
    vb:"0 0 560 320", anim:true,
    ctrls:[
      {k:"u",  lab:["Launch speed u","อัตราเร็วต้น u"], min:10, max:40, step:2,  def:24, unit:" m/s"},
      {k:"th", lab:["Angle θ","มุม θ"],                  min:10, max:80, step:5,  def:45, unit:"°"},
      {k:"T",  lab:["Run for","เล่นนาน"],                min:2,  max:10, step:1,  def:6,  unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Range R","ระยะไกลสุด R"], f:function(S){
        var r=S.p.th*Math.PI/180; return fmt(S.p.u*S.p.u*Math.sin(2*r)/10)+" m"; }},
      {lab:["Max height","ความสูงสุด"], f:function(S){
        var r=S.p.th*Math.PI/180, uy=S.p.u*Math.sin(r); return fmt(uy*uy/20)+" m"; }},
      {lab:["Time of flight","เวลาบิน"], f:function(S){
        var r=S.p.th*Math.PI/180; return fmt(2*S.p.u*Math.sin(r)/10)+" s"; }}
    ],
    draw:function(S,o){
      var g=10, r=S.p.th*Math.PI/180, ux=S.p.u*Math.cos(r), uy=S.p.u*Math.sin(r);
      var tf=2*uy/g, R=ux*tf, H=uy*uy/(2*g);
      var tt=Math.min(S.t,tf);
      var A=axes(o,{x:56,y:48,w:466,h:196,xmin:0,xmax:Math.max(R*1.1,10),ymin:0,ymax:Math.max(H*1.5,5),
                    title:["TRAJECTORY","วิถีการเคลื่อนที่"],xlab:"x (m)",ylab:"y (m)"});
      var d="";
      for(var i=0;i<=120;i++){
        var t=tf*i/120, x=ux*t, y=uy*t-0.5*g*t*t;
        d+=(i?" L":"M")+A.X(x)+" "+A.Y(Math.max(y,0));
      }
      o.push('<path d="'+d+'" stroke="var(--ink-faint)" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>');
      var dd="";
      for(var j=0;j<=120;j++){
        var t2=tt*j/120, x2=ux*t2, y2=uy*t2-0.5*g*t2*t2;
        dd+=(j?" L":"M")+A.X(x2)+" "+A.Y(Math.max(y2,0));
      }
      o.push('<path d="'+dd+'" stroke="var(--accent)" stroke-width="2.5" fill="none"/>');
      /* apex and range markers, both labelled against the scale */
      o.push('<line x1="'+A.X(R/2)+'" y1="'+A.Y(H)+'" x2="'+A.X(R/2)+'" y2="'+A.Y(0)+'" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="2 3"/>');
      o.push('<text x="'+A.X(R/2)+'" y="'+(A.Y(H)-7)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">H = '+fmt(H)+' m</text>');
      o.push('<text x="'+A.X(R)+'" y="'+(A.Y(0)+30)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">R = '+fmt(R)+' m</text>');
      var cx=ux*tt, cy=Math.max(uy*tt-0.5*g*tt*tt,0);
      o.push('<circle cx="'+A.X(cx)+'" cy="'+A.Y(cy)+'" r="5" fill="var(--accent)"/>');
      /* velocity components at the current point, drawn to scale */
      var sc=2.2, vy=uy-g*tt;
      o.push('<line x1="'+A.X(cx)+'" y1="'+A.Y(cy)+'" x2="'+(A.X(cx)+ux*sc)+'" y2="'+A.Y(cy)+'" stroke="var(--ink-soft)" stroke-width="1.8"/>');
      o.push('<line x1="'+A.X(cx)+'" y1="'+A.Y(cy)+'" x2="'+A.X(cx)+'" y2="'+(A.Y(cy)-vy*sc)+'" stroke="var(--ink-soft)" stroke-width="1.8"/>');
    }
  },
  guide:[
    {say:["Launch at 45°. The dashed curve is the whole flight; the solid part is what has happened so far. Press Play.",
          "ยิงที่ 45° เส้นประคือการเคลื่อนที่ทั้งหมด ส่วนเส้นทึบคือสิ่งที่เกิดขึ้นแล้ว กดเล่น"], set:{u:24,th:45,T:6}},
    {say:["Watch the two grey arrows. The horizontal one never changes length; the vertical one shrinks, reverses and grows.",
          "สังเกตลูกศรเทาสองอัน อันแนวราบไม่เคยเปลี่ยนความยาว ส่วนอันแนวดิ่งหดลง กลับทิศ แล้วยาวขึ้น"], set:{u:24,th:60,T:6}},
    {say:["At the apex the vertical arrow vanishes but the horizontal one is untouched. The projectile has not stopped.",
          "ที่จุดสูงสุดลูกศรแนวดิ่งหายไปแต่แนวราบยังอยู่ครบ วัตถุไม่ได้หยุด"], set:{u:24,th:75,T:6}},
    {say:["Now compare 30° and 60°. Read the range each time — the two are identical, because 30 + 60 = 90.",
          "ทีนี้เปรียบเทียบ 30° กับ 60° อ่านค่าระยะทั้งสองครั้ง จะเท่ากันพอดี เพราะ 30 + 60 = 90"], set:{u:30,th:30,T:6}}
  ]},

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
