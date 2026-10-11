var CHAPTER = {
id:"ma08", num:"08", slug:"trigonometry", subject:"math",
kicker:["Mathematics · Chapter 08","คณิตศาสตร์ · บทที่ 8"],
title:["Trigonometry","ตรีโกณมิติ"],
mapTitle:["Ratios that escape the triangle","อัตราส่วนที่หลุดออกจากสามเหลี่ยม"],
lede:["Sine and cosine start as ratios of sides in a right triangle, which caps them at 90°. The unit circle frees them: they become the coordinates of a point going round, and suddenly every angle has a value.",
      "ไซน์และโคไซน์เริ่มจากอัตราส่วนของด้านในสามเหลี่ยมมุมฉาก จึงใช้ได้แค่มุมไม่เกิน 90° วงกลมหนึ่งหน่วยปลดข้อจำกัดนี้ ไซน์กับโคไซน์กลายเป็นพิกัดของจุดที่เคลื่อนรอบวงกลม และทุกมุมก็มีค่าของมันทันที"],
next:["→ continues in Chapter 09 · Vectors","→ ต่อในบทที่ 9 · เวกเตอร์"],

nodes:[
{ id:"ratios", x:235, y:52, requires:[], methods:["M-01"],
  title:["The ratios","อัตราส่วนตรีโกณ"],
  body:[["In a right triangle sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, tangent is opposite over adjacent. The reciprocals — cosec, sec, cot — are simply those three turned upside down, and sec pairs with cos rather than with sin, which surprises people.",
         "The exact values at 30°, 45° and 60° come from two triangles worth drawing from memory: the half-equilateral and the half-square. Radians replace degrees for anything analytic, with π radians equal to 180°; substituting degrees where radians are needed is trap T-03."],
        ["ในสามเหลี่ยมมุมฉาก ไซน์คือด้านตรงข้ามมุมหารด้วยด้านตรงข้ามมุมฉาก โคไซน์คือด้านประชิดมุมหารด้วยด้านตรงข้ามมุมฉาก และแทนเจนต์คือด้านตรงข้ามมุมหารด้วยด้านประชิดมุม ส่วนอัตราส่วนกลับอย่างโคเซแคนต์ เซแคนต์ และโคแทนเจนต์ ก็คือสามตัวนี้กลับเศษเป็นส่วน ที่หลายคนแปลกใจคือเซแคนต์คู่กับโคไซน์ ไม่ใช่ไซน์",
         "ค่าที่แน่นอนของ 30° 45° และ 60° มาจากสามเหลี่ยมสองรูปที่ควรวาดได้จากความจำ คือครึ่งหนึ่งของสามเหลี่ยมด้านเท่า กับครึ่งหนึ่งของสี่เหลี่ยมจัตุรัส ในงานเชิงวิเคราะห์ใช้เรเดียนแทนองศา โดย π เรเดียนเท่ากับ 180° ถ้าแทนองศาในที่ที่ต้องใช้เรเดียนก็ตกกับดัก T-03"]],
  formula:["sin = opp/hyp    cos = adj/hyp    tan = opp/adj        π rad = 180°","sin = ข้าม/ฉาก    cos = ชิด/ฉาก    tan = ข้าม/ชิด        π rad = 180°"],
  flabel:["sec pairs with cos, not sin","sec จับคู่กับ cos ไม่ใช่ sin"],
  viz:"tri",
  vizcfg:{
    title:["THE RATIOS IN A RIGHT TRIANGLE","อัตราส่วนในสามเหลี่ยมมุมฉาก"],
    sides:function(p){ return {a:p.a, b:p.b, C:90}; },
    ctrls:[
      {k:"a", lab:["Opposite side a","ด้านตรงข้าม a"], min:1, max:10, step:.5, def:3, unit:""},
      {k:"b", lab:["Adjacent side b","ด้านประชิด b"], min:1, max:10, step:.5, def:4, unit:""}
    ],
    readouts:[
      {lab:["Hypotenuse","ด้านตรงข้ามมุมฉาก"], f:function(S){
        return num(Math.sqrt(S.p.a*S.p.a+S.p.b*S.p.b)); }},
      {lab:["sin of angle A","sin ของมุม A"], f:function(S){
        return num(S.p.a/Math.sqrt(S.p.a*S.p.a+S.p.b*S.p.b)); }},
      {lab:["cos of angle A","cos ของมุม A"], f:function(S){
        return num(S.p.b/Math.sqrt(S.p.a*S.p.a+S.p.b*S.p.b)); }},
      {lab:["tan of angle A","tan ของมุม A"], f:function(S){ return num(S.p.a/S.p.b); }}
    ],
    note:["scale both sides together and every ratio holds — that is why they depend on the angle alone","ขยายทั้งสองด้านพร้อมกัน อัตราส่วนทุกตัวก็ยังเท่าเดิม เพราะอย่างนี้อัตราส่วนจึงขึ้นกับมุมอย่างเดียว"]
  },
  guide:[
    {say:["The classic 3–4–5 triangle. Read the three ratios off the sides.",
          "สามเหลี่ยม 3–4–5 ที่ทุกคนรู้จัก ลองอ่านอัตราส่วนทั้งสามจากความยาวด้าน"], set:{a:3,b:4}},
    {say:["Double both sides to 6 and 8. The sides changed, but every ratio is exactly the same.",
          "ขยายด้านทั้งสองเป็นสองเท่า คือ 6 กับ 8 ด้านเปลี่ยนไป แต่อัตราส่วนทุกตัวเท่าเดิมเป๊ะ"], set:{a:6,b:8}},
    {say:["Now change the shape instead. Only now do the ratios move — they track the angle, not the size.",
          "ลองเปลี่ยนรูปร่างของสามเหลี่ยมแทน ตอนนี้อัตราส่วนถึงจะเปลี่ยน เพราะมันขึ้นกับมุม ไม่ใช่ขนาด"], set:{a:8,b:3}}
  ] },

{ id:"unit-circle", x:100, y:150, requires:["ratios"], methods:["M-02"],
  title:["The unit circle","วงกลมหนึ่งหน่วย"],
  body:[["Put a point on a circle of radius 1 at angle θ from the positive x-axis. Its x-coordinate is cos θ and its y-coordinate is sin θ. That is the whole definition, and it works for any angle at all — obtuse, reflex, negative, beyond a full turn.",
         "The signs then fall out for free. In the first quadrant both coordinates are positive, in the second only y, in the third neither, in the fourth only x — which is the ASTC rule, except now you can derive it instead of memorising it. Ignoring the quadrant is trap T-01."],
        ["วางจุดบนวงกลมรัศมี 1 ที่มุม θ จากแกน x ด้านบวก พิกัด x ของจุดคือ cos θ และพิกัด y คือ sin θ นี่คือนิยามทั้งหมด และใช้ได้กับมุมทุกแบบ ไม่ว่าจะเป็นมุมป้าน มุมกลับ มุมลบ หรือมุมที่เกินหนึ่งรอบ",
         "เครื่องหมายก็ตามมาเองโดยไม่ต้องท่อง ควอดรันต์ที่หนึ่งพิกัดทั้งสองเป็นบวก ควอดรันต์ที่สองเป็นบวกเฉพาะ y ควอดรันต์ที่สามไม่เป็นบวกเลย ควอดรันต์ที่สี่เป็นบวกเฉพาะ x นี่คือกฎ ASTC ต่างกันที่ตอนนี้เราหาได้เอง ไม่ต้องท่องจำ ถ้ามองข้ามควอดรันต์ก็ตกกับดัก T-01"]],
  formula:["cos θ = x        sin θ = y        on radius 1","cos θ = x        sin θ = y        บนวงรัศมี 1"],
  flabel:["Coordinates, not just ratios","เป็นพิกัด ไม่ใช่แค่อัตราส่วน"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"th", lab:["Angle θ","มุม θ"], min:0, max:360, step:5, def:35, unit:"°"}
    ],
    readouts:[
      {lab:["cos θ","cos θ"], f:function(S){ return num(Math.round((Math.cos(S.p.th*Math.PI/180))*1e9)/1e9); }},
      {lab:["sin θ","sin θ"], f:function(S){ return num(Math.round((Math.sin(S.p.th*Math.PI/180))*1e9)/1e9); }},
      {lab:["tan θ","tan θ"], f:function(S){
        var c=Math.cos(S.p.th*Math.PI/180);
        return Math.abs(c)<1e-6 ? (L()?"ไม่นิยาม":"undefined") : num(Math.round((Math.tan(S.p.th*Math.PI/180))*1e9)/1e9); }},
      {lab:["Quadrant","ควอดรันต์"], f:function(S){
        var t=((S.p.th%360)+360)%360;
        var q = t<90?1 : t<180?2 : t<270?3 : 4;
        /* the sign mnemonic: the function names are notation, but the
           "all" that starts it is a word, and it stayed English */
        var P=[["",""],["all +","บวกทุกตัว"],["sin +","sin +"],
               ["tan +","tan +"],["cos +","cos +"]];
        return q+" · "+tx(P[q]); }}
    ],
    draw:function(S,o){
      var th=S.p.th*Math.PI/180;
      var A=axes(o,{x:150,y:34,w:264,h:232,xmin:-1.4,xmax:1.4,ymin:-1.25,ymax:1.25,
                    title:["UNIT CIRCLE","วงกลมหนึ่งหน่วย"],xlab:"cos θ",ylab:"sin θ",xticks:4,yticks:4});
      var cx=A.X(0), cy=A.Y(0), rx=A.X(1)-A.X(0), ry=A.Y(0)-A.Y(1);
      o.push('<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="none" stroke="var(--ink-soft)" stroke-width="1.6"/>');
      var px=A.X(Math.cos(th)), py=A.Y(Math.sin(th));
      /* the angle arc */
      var arc="M"+A.X(0.32)+" "+A.Y(0);
      for(var i=1;i<=30;i++){
        var t=th*i/30;
        arc+=" L"+A.X(0.32*Math.cos(t))+" "+A.Y(0.32*Math.sin(t));
      }
      o.push('<path d="'+arc+'" stroke="var(--accent)" stroke-width="1.6" fill="none"/>');
      o.push('<text x="'+A.X(0.44*Math.cos(th/2))+'" y="'+A.Y(0.44*Math.sin(th/2))+
             '" fill="var(--accent)" font-family="IBM Plex Sans" font-size="11" text-anchor="middle">θ</text>');
      /* the two legs, labelled with their values */
      o.push('<line x1="'+cx+'" y1="'+cy+'" x2="'+px+'" y2="'+cy+
             '" stroke="var(--ink)" stroke-width="2.4"/>');
      o.push('<line x1="'+px+'" y1="'+cy+'" x2="'+px+'" y2="'+py+
             '" stroke="var(--ink-soft)" stroke-width="2.4" stroke-dasharray="4 3"/>');
      o.push('<line x1="'+cx+'" y1="'+cy+'" x2="'+px+'" y2="'+py+
             '" stroke="var(--accent)" stroke-width="2.4"/>');
      o.push('<circle cx="'+px+'" cy="'+py+'" r="5" fill="var(--accent)"/>');
      o.push('<text x="'+((cx+px)/2)+'" y="'+(cy+16)+'" fill="var(--ink)" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">cos θ = '+num(Math.round(Math.cos(th)*1e9)/1e9)+'</text>');
      o.push('<text x="'+(px+8)+'" y="'+((cy+py)/2)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="10.5">sin θ = '+num(Math.round(Math.sin(th)*1e9)/1e9)+'</text>');
      /* quadrant sign table, so ASTC is derived rather than recited */
      var t2=((S.p.th%360)+360)%360, q = t2<90?1 : t2<180?2 : t2<270?3 : 4;
      var rows=[["I","sin +","cos +","tan +"],["II","sin +","cos −","tan −"],
                ["III","sin −","cos −","tan +"],["IV","sin −","cos +","tan −"]];
      o.push('<text x="432" y="52" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.2">'+tx(["SIGNS","เครื่องหมาย"])+'</text>');
      rows.forEach(function(r,i){
        var y=76+i*30, on=(i+1===q);
        o.push('<text x="432" y="'+y+'" fill="'+(on?"var(--accent)":"var(--ink-faint)")+
               '" font-family="IBM Plex Sans" font-size="'+(on?11.5:10.5)+'" font-weight="'+(on?600:500)+'">'+
               r[0]+'  '+r[1]+'  '+r[2]+'</text>');
      });
      o.push('<text x="150" y="322" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["the point on the circle IS (cos θ, sin θ)","จุดบนวงกลมคือ (cos θ, sin θ) นั่นเอง"])+'</text>');
    }
  },
  guide:[
    {say:["An acute angle. The red arm reaches a point whose coordinates are exactly cos θ and sin θ — both positive here.",
          "มุมแหลม แขนสีแดงชี้ไปที่จุดที่มีพิกัดเป็น cos θ และ sin θ พอดี และตรงนี้เป็นบวกทั้งคู่"], set:{th:35}},
    {say:["Swing past 90°. The horizontal leg crosses to the left, so cos turns negative while sin stays positive.",
          "หมุนผ่าน 90° ไป ขาแนวนอนข้ามไปทางซ้าย cos จึงเป็นลบ ส่วน sin ยังเป็นบวก"], set:{th:130}},
    {say:["Third quadrant: both coordinates negative, so both sin and cos are negative — but tan, their ratio, is positive again.",
          "ควอดรันต์ที่สาม พิกัดทั้งสองเป็นลบ sin กับ cos จึงเป็นลบทั้งคู่ แต่ tan เป็นอัตราส่วนของสองตัวนี้ จึงกลับเป็นบวกอีกครั้ง"], set:{th:215}},
    {say:["Fourth quadrant: cos back to positive, sin still negative. You have just derived ASTC instead of memorising it.",
          "ควอดรันต์ที่สี่ cos กลับเป็นบวก ส่วน sin ยังเป็นลบ เราเพิ่งหากฎ ASTC ได้เองโดยไม่ต้องท่องจำ"], set:{th:315}}
  ]},

{ id:"identities", x:370, y:150, requires:["ratios"], methods:["M-03"],
  title:["Identities","เอกลักษณ์"],
  body:[["sin²θ + cos²θ = 1 is Pythagoras written on the unit circle, and dividing it through by cos²θ or sin²θ produces the other two Pythagorean identities for free. That derivation is worth doing once rather than memorising three separate facts.",
         "The compound-angle formulas give sin(A ± B) and cos(A ∓ B) — note that cosine's signs are the reverse of sine's. Setting B = A collapses them into the double-angle formulas, and cos 2A has three interchangeable forms, which is what makes it so useful for substitution."],
        ["sin²θ + cos²θ = 1 ก็คือทฤษฎีบทพีทาโกรัสที่เขียนบนวงกลมหนึ่งหน่วย พอหารทั้งสมการด้วย cos²θ หรือ sin²θ ก็ได้เอกลักษณ์พีทาโกรัสอีกสองตัวมาเลย ลองพิสูจน์สักครั้งดีกว่าท่องสามสูตรแยกกัน",
         "สูตรผลบวกและผลต่างของมุมให้ sin(A ± B) และ cos(A ∓ B) สังเกตว่าเครื่องหมายของโคไซน์กลับกับไซน์ ถ้าให้ B = A สูตรเหล่านี้จะกลายเป็นสูตรมุมสองเท่า และ cos 2A เขียนได้สามรูปที่ใช้แทนกันได้ จึงสะดวกมากเวลาแทนค่า"]],
  formula:["sin²θ + cos²θ = 1        sin(A±B) = sinA cosB ± cosA sinB","sin²θ + cos²θ = 1        sin(A±B) = sinA cosB ± cosA sinB"],
  flabel:["Cosine's signs run opposite to sine's","เครื่องหมายของโคไซน์กลับกับไซน์"],
  viz:"plot",
  vizcfg:{
    title:["WHY sin²θ + cos²θ NEVER BUDGES","ทำไม sin²θ + cos²θ จึงไม่เคยขยับ"],
    xlab:["angle θ (degrees)","มุม θ (องศา)"], ylab:["value","ค่า"],
    xmin:0, xmax:720, ymin:-1.4, ymax:1.6, fill:false,
    fn:function(x,p){
      var r=x*Math.PI/180, s=Math.sin(r), c=Math.cos(r);
      return p.show===0 ? s*s+c*c : p.show===1 ? s*s : c*c;
    },
    mark:function(p){ return p.th; },
    ctrls:[
      {k:"show", lab:["",""], opts:[["sin²+cos²","sin²+cos²"], ["sin²","sin²"], ["cos²","cos²"]], min:0, def:0, unit:""},
      {k:"th",   lab:["Angle θ","มุม θ"], min:0, max:720, step:5, def:35, unit:"°"}
    ],
    readouts:[
      {lab:["sin²θ","sin²θ"], f:function(S){
        var s=Math.sin(S.p.th*Math.PI/180); return num(Math.round(s*s*1e9)/1e9); }},
      {lab:["cos²θ","cos²θ"], f:function(S){
        var c=Math.cos(S.p.th*Math.PI/180); return num(Math.round(c*c*1e9)/1e9); }},
      {lab:["Their sum","ผลบวก"], f:function(S){
        var r=S.p.th*Math.PI/180;
        return num(Math.round((Math.sin(r)*Math.sin(r)+Math.cos(r)*Math.cos(r))*1e9)/1e9); }},
      {lab:["Why it is fixed","ทำไมถึงคงที่"], f:function(){
        return L()?"เป็นพีทาโกรัสบนวงกลมรัศมี 1":"it is Pythagoras on a circle of radius 1"; }}
    ],
    note:["the two squares rise and fall in perfect opposition, so their sum is a dead flat line","กำลังสองสองตัวขึ้นลงสวนกันพอดี ผลบวกจึงเป็นเส้นราบ"]
  },
  guide:[
    {say:["A perfectly flat line at 1. However far you go, the sum never moves.",
          "เส้นราบเรียบที่ค่า 1 ไม่ว่าจะไปไกลแค่ไหน ผลบวกก็ไม่ขยับ"], set:{show:0,th:35}},
    {say:["Look at sin²θ alone — it swings between 0 and 1, so it is certainly not constant.",
          "ลองดู sin²θ ตัวเดียว มันแกว่งระหว่าง 0 กับ 1 จึงไม่คงที่แน่ ๆ"], set:{show:1,th:35}},
    {say:["And cos²θ does the same, but exactly out of step. Add them and the wobbles cancel completely.",
          "cos²θ ก็แกว่งแบบเดียวกัน แต่สวนกับ sin²θ พอดี พอบวกกัน ส่วนที่แกว่งก็หักล้างกันหมด"], set:{show:2,th:35}}
  ] },

{ id:"equations", x:235, y:248, requires:["unit-circle","identities"], methods:["M-04"],
  title:["Trigonometric equations","สมการตรีโกณมิติ"],
  body:[["Reduce the equation to a single ratio, find the reference angle from the inverse function, then use the unit circle to place every solution inside the required interval.",
         "The calculator gives you one angle. Over a full revolution sine and cosine each hit any given value twice, so there is almost always a second solution — reporting only the calculator's answer is trap T-02, and it costs half the marks on these questions routinely."],
        ["ลดรูปสมการให้เหลืออัตราส่วนเดียว หามุมอ้างอิงจากฟังก์ชันผกผัน แล้วใช้วงกลมหนึ่งหน่วยหาคำตอบทุกค่าที่อยู่ในช่วงที่โจทย์กำหนด",
         "เครื่องคิดเลขให้มุมมาเพียงค่าเดียว แต่ในหนึ่งรอบ ไซน์และโคไซน์แต่ละตัวมีค่าเท่ากับค่าที่กำหนดได้สองครั้ง จึงเกือบทุกครั้งมีคำตอบที่สองด้วย ถ้าตอบเฉพาะค่าจากเครื่องคิดเลขก็ตกกับดัก T-02 และข้อแบบนี้มักเสียคะแนนไปครึ่งหนึ่ง"]],
  formula:["One value of sin θ  ⟹  two angles per revolution","sin θ หนึ่งค่า  ⟹  สองมุมต่อหนึ่งรอบ"],
  flabel:["The calculator gives one, not all","เครื่องคิดเลขให้หนึ่งค่า ไม่ใช่ทั้งหมด"],
  viz:"plot",
  vizcfg:{
    title:["ONE VALUE, TWO ANGLES PER REVOLUTION","หนึ่งค่า สองมุมต่อหนึ่งรอบ"],
    xlab:["angle θ (degrees)","มุม θ (องศา)"], ylab:["sin θ","sin θ"],
    xmin:0, xmax:720, fill:false,
    fn:function(x,p){ return Math.sin(x*Math.PI/180); },
    /* the note tells the reader to draw this line and count the crossings,
       so the plate has to actually draw it */
    hline:function(p){ return p.v; },
    ctrls:[
      {k:"v", lab:["Target value","ค่าเป้าหมาย"], min:-1, max:1, step:.05, def:.5, unit:""}
    ],
    readouts:[
      {lab:["Calculator gives","เครื่องคิดเลขให้"], f:function(S){
        var v=Math.max(-1,Math.min(1,S.p.v));
        return num(Math.asin(v)*180/Math.PI)+"°"; }},
      {lab:["The second solution","คำตอบที่สอง"], f:function(S){
        var v=Math.max(-1,Math.min(1,S.p.v));
        return num(180-Math.asin(v)*180/Math.PI)+"°"; }},
      {lab:["Solutions in 0° to 720°","คำตอบในช่วง 0° ถึง 720°"], f:function(S){
        return Math.abs(Math.abs(S.p.v)-1)<1e-9 ? "2" : Math.abs(S.p.v)<1e-9 ? "5" : "4"; }},
      {lab:["The trap","กับดัก"], f:function(){
        return L()?"ตอบเฉพาะค่าจากเครื่องคิดเลข":"reporting only the calculator's answer"; }}
    ],
    note:["draw a horizontal line at your target and count how many times the curve crosses it","ลากเส้นนอนที่ค่าเป้าหมาย แล้วนับว่าเส้นโค้งตัดเส้นนั้นกี่ครั้ง"]
  },
  guide:[
    {say:["Target 0.5. Over two full turns the sine curve reaches this height four separate times.",
          "ค่าเป้าหมาย 0.5 ในสองรอบเต็ม เส้นโค้งไซน์ผ่านความสูงนี้สี่ครั้ง"], set:{v:.5}},
    {say:["A negative target lands in the troughs instead, but there are still four crossings.",
          "ถ้าค่าเป้าหมายเป็นลบ เส้นจะอยู่ที่ท้องคลื่นแทน แต่ก็ยังตัดสี่ครั้งเท่าเดิม"], set:{v:-.5}},
    {say:["Only at the very peak does the count drop to one per revolution. Everywhere else, two.",
          "เฉพาะตรงยอดพอดีที่เหลือหนึ่งครั้งต่อรอบ ที่อื่นเป็นสองครั้งหมด"], set:{v:1}}
  ] },

{ id:"triangles", x:235, y:346, requires:["equations"], methods:["M-05","M-06"],
  title:["Solving triangles","การแก้สามเหลี่ยม"],
  body:[["The sine rule a/sin A = b/sin B = c/sin C handles a triangle when you have a matched side–angle pair. Its extended form equals 2R, where R is the radius of the **circumcircle** — the circle through all three vertices, not the one inscribed inside.",
         "The cosine rule takes over when you have two sides and the included angle, or all three sides. Area is ½ab sin C, using the angle *between* the two sides — picking any other angle is trap T-04."],
        ["กฎของไซน์ a/sin A = b/sin B = c/sin C ใช้กับสามเหลี่ยมที่มีคู่ด้านกับมุมตรงข้ามกันครบหนึ่งคู่ รูปขยายของกฎนี้มีค่าเท่ากับ 2R โดย R คือรัศมีของ**วงกลมล้อมรอบ** ซึ่งเป็นวงกลมที่ผ่านจุดยอดทั้งสามจุด ไม่ใช่วงกลมที่แนบอยู่ข้างใน",
         "ถ้ามีสองด้านกับมุมระหว่างด้านนั้น หรือมีครบทั้งสามด้าน ให้ใช้กฎของโคไซน์แทน พื้นที่คือ ½ab sin C โดยใช้มุม*ระหว่าง*สองด้านนั้น ถ้าไปหยิบมุมอื่นมาใช้ก็ตกกับดัก T-04"]],
  formula:["a/sin A = 2R (circumcircle)        c² = a² + b² − 2ab cos C","a/sin A = 2R (วงกลมล้อมรอบ)        c² = a² + b² − 2ab cos C"],
  flabel:["2R is the circumcircle diameter","2R คือเส้นผ่านศูนย์กลางวงกลมล้อมรอบ"],
  viz:"tri",
  vizcfg:{
    title:["TWO SIDES AND THE ANGLE BETWEEN THEM","สองด้านกับมุมระหว่างด้าน"],
    sides:function(p){ return {a:p.a, b:p.b, C:p.C}; },
    ctrls:[
      {k:"a", lab:["Side a","ด้าน a"], min:1, max:10, step:.5, def:5, unit:""},
      {k:"b", lab:["Side b","ด้าน b"], min:1, max:10, step:.5, def:7, unit:""},
      {k:"C", lab:["Included angle C","มุมระหว่างด้าน C"], min:10, max:170, step:5, def:60, unit:"°"}
    ],
    readouts:[
      {lab:["Third side c","ด้านที่สาม c"], f:function(S){
        var p=S.p;
        return num(Math.sqrt(p.a*p.a+p.b*p.b-2*p.a*p.b*Math.cos(p.C*Math.PI/180))); }},
      {lab:["Area ½ab sin C","พื้นที่ ½ab sin C"], f:function(S){
        var p=S.p; return num(0.5*p.a*p.b*Math.sin(p.C*Math.PI/180)); }},
      {lab:["At C = 90°","ที่ C = 90°"], f:function(S){
        return L()?"กฎของโคไซน์ลดรูปเป็นพีทาโกรัส":"the cosine rule collapses to Pythagoras"; }},
      {lab:["Circumcircle radius R","รัศมีวงกลมล้อมรอบ R"], f:function(S){
        var p=S.p, c=Math.sqrt(p.a*p.a+p.b*p.b-2*p.a*p.b*Math.cos(p.C*Math.PI/180));
        return num(c/(2*Math.sin(p.C*Math.PI/180))); }}
    ],
    note:["watch the cosine term vanish as C passes 90° — that is the whole difference from Pythagoras","ดูพจน์โคไซน์ตอน C ผ่าน 90° มันหายไปที่ 90° พอดี และนี่คือสิ่งเดียวที่ต่างจากพีทาโกรัส"]
  },
  guide:[
    {say:["Two sides with a 60° angle between them. The cosine rule finds the third side directly.",
          "สองด้านที่มีมุม 60° อยู่ระหว่างกัน ใช้กฎของโคไซน์หาด้านที่สามได้เลย"], set:{a:5,b:7,C:60}},
    {say:["Open the angle to 90°. The cosine term drops to zero and Pythagoras takes over.",
          "เปิดมุมไปที่ 90° พจน์โคไซน์เป็น 0 เหลือแค่พีทาโกรัส"], set:{a:5,b:7,C:90}},
    {say:["Push past 90° and the cosine turns negative, so the third side grows longer than Pythagoras predicts.",
          "เปิดเกิน 90° ไป โคไซน์เป็นลบ ด้านที่สามจึงยาวกว่าที่พีทาโกรัสทำนายไว้"], set:{a:5,b:7,C:140}}
  ] }
],

methods:[
{id:"M-01", name:["Evaluate a trig ratio","หาค่าอัตราส่วนตรีโกณ"]},
{id:"M-02", name:["Use the unit circle and ASTC","ใช้วงกลมหนึ่งหน่วยและ ASTC"]},
{id:"M-03", name:["Apply an identity","ใช้เอกลักษณ์"]},
{id:"M-04", name:["Solve a trig equation over an interval","แก้สมการตรีโกณในช่วงที่กำหนด"]},
{id:"M-05", name:["Apply the sine or cosine rule","ใช้กฎของไซน์หรือโคไซน์"]},
{id:"M-06", name:["Find a triangle's area","หาพื้นที่สามเหลี่ยม"]}
],

traps:{
"T-01":["Quadrant ignored, so the sign is wrong. Locate the angle on the circle first.","มองข้ามควอดรันต์ เครื่องหมายจึงผิด ต้องหาตำแหน่งของมุมบนวงกลมก่อน"],
"T-02":["Only one solution given. Sine and cosine each take any value twice per revolution.","ตอบแค่คำตอบเดียว ทั้งที่ไซน์และโคไซน์มีค่าเดียวกันสองครั้งต่อหนึ่งรอบ"],
"T-03":["Degrees used where radians are required, or the conversion applied backwards.","ใช้องศาในที่ที่ต้องใช้เรเดียน หรือแปลงหน่วยกลับทาง"],
"T-04":["Area needs the angle BETWEEN the two sides, and 2R is the circumcircle, not the incircle.","พื้นที่ต้องใช้มุมระหว่างสองด้าน และ 2R คือวงกลมล้อมรอบ ไม่ใช่วงกลมแนบใน"]
},

gen:{
"M-01": function(sf){
  var C=[{q:["sin 30°","sin 30°"],a:"1/2",w:["√3/2","√2/2","1"]},
         {q:["cos 60°","cos 60°"],a:"1/2",w:["√3/2","√2/2","0"]},
         {q:["tan 45°","tan 45°"],a:"1",w:["√3","1/√3","0"]},
         {q:["sin 60°","sin 60°"],a:"√3/2",w:["1/2","√2/2","1"]}];
  var c=pick(C);
  if(sf==="S-04") return {stem:["Which ratio is the reciprocal of cosine?","อัตราส่วนใดเป็นส่วนกลับของโคไซน์"],
    opts:[{v:["secant","เซแคนต์"],ok:1},{v:["cosecant","โคเซแคนต์"],trap:"T-01"},
          {v:["cotangent","โคแทนเจนต์"],trap:"T-01"},{v:["tangent","แทนเจนต์"]}],unit:""};
  if(sf==="S-05") return {stem:["Convert 150° into radians.","จงแปลง 150° เป็นเรเดียน"],
    opts:[{v:"5π/6",ok:1},{v:"150π",trap:"T-03"},{v:"6π/5",trap:"T-03"},{v:"3π/4"}],unit:""};
  return {stem:["Find the exact value of "+c.q[0]+".","จงหาค่าที่แน่นอนของ "+c.q[1]],
    opts:[{v:c.a,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
},
"M-02": function(sf){
  var C=[{th:150,r:"sin",v:"positive",wq:"negative"},{th:210,r:"cos",v:"negative",wq:"positive"},
         {th:300,r:"sin",v:"negative",wq:"positive"},{th:120,r:"tan",v:"negative",wq:"positive"}];
  var c=pick(C);
  if(sf==="S-04") return {stem:["In which quadrant are sine and cosine both negative?",
                                "ไซน์และโคไซน์เป็นลบทั้งคู่ในควอดรันต์ใด"],
    opts:[{v:["Third","ที่สาม"],ok:1},{v:["Second","ที่สอง"],trap:"T-01"},
          {v:["Fourth","ที่สี่"],trap:"T-01"},{v:["First","ที่หนึ่ง"]}],unit:""};
  if(sf==="S-02") return {stem:["A point on the unit circle has coordinates (−0.6, 0.8). What is cos θ?",
                                "จุดบนวงกลมหนึ่งหน่วยมีพิกัด (−0.6, 0.8) cos θ เท่ากับเท่าไร"],
    opts:[{v:"−0.6",ok:1},{v:"0.8",trap:"T-01"},{v:"0.6",trap:"T-01"},{v:"−0.8"}],unit:""};
  return {stem:["Is "+c.r+" "+c.th+"° positive or negative?","ค่า "+c.r+" "+c.th+"° เป็นบวกหรือลบ"],
    opts:[{v:[c.v,c.v==="positive"?"เป็นบวก":"เป็นลบ"],ok:1},
          {v:[c.wq,c.wq==="positive"?"เป็นบวก":"เป็นลบ"],trap:"T-01"},
          {v:["Zero","เป็นศูนย์"]},{v:["Undefined","ไม่นิยาม"]}],unit:""};
},
"M-03": function(sf){
  if(sf==="S-04") return {stem:["Divide sin²θ + cos²θ = 1 through by cos²θ. What do you get?",
                                "หาร sin²θ + cos²θ = 1 ตลอดด้วย cos²θ จะได้อะไร"],
    opts:[{v:"tan²θ + 1 = sec²θ",ok:1},{v:"cot²θ + 1 = cosec²θ",trap:"T-01"},
          {v:"tan²θ − 1 = sec²θ"},{v:"sin²θ + 1 = sec²θ"}],unit:""};
  var C=[{q:["sin 2A","sin 2A"],a:"2 sin A cos A",w:["sin²A − cos²A","2 cos²A − 1","sin A + cos A"]},
         {q:["cos 2A","cos 2A"],a:"cos²A − sin²A",w:["2 sin A cos A","2 sin²A − 1","cos A − sin A"]},
         {q:["sin(A + B)","sin(A + B)"],a:"sin A cos B + cos A sin B",
          w:["cos A cos B + sin A sin B","sin A cos B − cos A sin B","sin A + sin B"]},
         {q:["cos(A + B)","cos(A + B)"],a:"cos A cos B − sin A sin B",
          w:["cos A cos B + sin A sin B","sin A cos B + cos A sin B","cos A + cos B"]}];
  var c=pick(C);
  return {stem:["Expand "+c.q[0]+".","จงกระจาย "+c.q[1]],
    opts:[{v:c.a,ok:1},{v:c.w[0],trap:"T-01"},{v:c.w[1]},{v:c.w[2]}],unit:""};
},
"M-04": function(sf){
  var C=[{e:"sin θ = 1/2",int:"0° ≤ θ < 360°",a:"30° and 150°",w:["30° only","30° and 210°","150° only"]},
         {e:"cos θ = 1/2",int:"0° ≤ θ < 360°",a:"60° and 300°",w:["60° only","60° and 120°","300° only"]},
         {e:"sin θ = −1/2",int:"0° ≤ θ < 360°",a:"210° and 330°",w:["210° only","30° and 150°","330° only"]}];
  var c=pick(C);
  var T=function(s){ return [s, s.replace(/ and /g," กับ ").replace(/ only/g," เท่านั้น")]; };
  if(sf==="S-04") return {stem:["Your calculator returns one angle for sin⁻¹(0.5). How many solutions are there in 0° ≤ θ < 360°?",
                                "เครื่องคิดเลขให้มุมเดียวสำหรับ sin⁻¹(0.5) ในช่วง 0° ≤ θ < 360° มีคำตอบกี่ค่า"],
    opts:[{v:"2",ok:1},{v:"1",trap:"T-02"},{v:"4"},{v:"0"}],unit:""};
  return {stem:["Solve "+c.e+" for "+c.int+".","จงแก้ "+c.e+" ในช่วง "+c.int],
    opts:[{v:T(c.a),ok:1},{v:T(c.w[0]),trap:"T-02"},{v:T(c.w[1]),trap:"T-01"},{v:T(c.w[2]),trap:"T-02"}],unit:""};
},
"M-05": function(sf){
  var a=pick([5,7,8]), b=pick([6,9,10]), C=pick([60,120]);
  var cosC={60:0.5,90:0,120:-0.5}[C];
  var c2=a*a+b*b-2*a*b*cosC;
  if(sf==="S-04") return {stem:["In the extended sine rule a/sin A = 2R, what is R?",
                                "ในกฎของไซน์รูปขยาย a/sin A = 2R ค่า R คืออะไร"],
    opts:[{v:["The circumcircle radius","รัศมีวงกลมล้อมรอบ"],ok:1},
          {v:["The inscribed circle radius","รัศมีวงกลมแนบใน"],trap:"T-04"},
          {v:["Half the longest side","ครึ่งหนึ่งของด้านที่ยาวที่สุด"],trap:"T-04"},
          {v:["The triangle's area","พื้นที่สามเหลี่ยม"]}],unit:""};
  if(sf==="S-03") return {stem:["You know two sides and the angle between them. Which rule applies?",
                                "รู้ความยาวสองด้านและมุมระหว่างด้านทั้งสอง ควรใช้กฎข้อใด"],
    opts:[{v:["The cosine rule","กฎของโคไซน์"],ok:1},{v:["The sine rule","กฎของไซน์"],trap:"T-04"},
          {v:["Pythagoras","พีทาโกรัส"]},{v:["Neither works","ใช้ไม่ได้ทั้งคู่"]}],unit:""};
  return {stem:["A triangle has sides "+a+" and "+b+" with an included angle of "+C+"°. Find the third side.",
                "สามเหลี่ยมมีด้านยาว "+a+" และ "+b+" โดยมุมระหว่างสองด้านนี้เป็น "+C+"° จงหาด้านที่สาม"],
    opts:[{v:num(Math.sqrt(c2)),ok:1},{v:num(Math.sqrt(a*a+b*b)),trap:"T-04"},
          {v:num(a+b)},{v:num(Math.sqrt(a*a+b*b+2*a*b*cosC)),trap:"T-04"}],unit:""};
},
"M-06": function(sf){
  var a=pick([6,8,10]), b=pick([5,7,12]), C=pick([30,60,120,150]);
  var sinC=Math.round(Math.sin(C*Math.PI/180)*1e12)/1e12;
  if(sf==="S-04") return {stem:["The area formula ½ab sin C uses which angle?","สูตรพื้นที่ ½ab sin C ใช้มุมใด"],
    opts:[{v:["The angle between sides a and b","มุมระหว่างด้าน a กับ b"],ok:1},
          {v:["Any angle of the triangle","มุมใดก็ได้ของสามเหลี่ยม"],trap:"T-04"},
          {v:["The largest angle","มุมที่ใหญ่ที่สุด"],trap:"T-04"},
          {v:["The angle opposite side a","มุมตรงข้ามด้าน a"],trap:"T-04"}],unit:""};
  return {stem:["Find the area of a triangle with sides "+a+" and "+b+" enclosing an angle of "+C+"°.",
                "จงหาพื้นที่สามเหลี่ยมที่มีด้านยาว "+a+" และ "+b+" และมุมระหว่างสองด้านนี้เป็น "+C+"°"],
    opts:[{v:num(0.5*a*b*sinC),ok:1},{v:num(a*b*sinC),trap:"T-04"},
          {v:num(a*b)},{v:num(0.5*a*b*Math.sqrt(1-sinC*sinC))}],unit:""};
}
}
};
