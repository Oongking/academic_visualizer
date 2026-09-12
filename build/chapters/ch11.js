var CHAPTER = {
id:"ch11", num:"11", slug:"ray-optics", subject:"physics",
kicker:["Physics · Chapter 11","ฟิสิกส์ · บทที่ 11"],
title:["Ray Optics","แสงเชิงรังสี"],
mapTitle:["When light can be drawn as lines","เมื่อแสงเขียนเป็นเส้นได้"],
lede:["Whenever the objects light meets are far larger than its wavelength, the wave nature stops mattering and light can be treated as straight lines. Every mirror, lens and eye is designed in that approximation.",
      "เมื่อใดที่วัตถุที่แสงพบมีขนาดใหญ่กว่าความยาวคลื่นมาก ความเป็นคลื่นก็หมดความสำคัญ และเราถือว่าแสงเดินทางเป็นเส้นตรงได้ กระจก เลนส์ และดวงตาทุกชิ้นถูกออกแบบภายใต้การประมาณนี้"],
next:["→ continues in Chapter 12 · Sound","→ ต่อในบทที่ 12 · เสียง"],

nodes:[
{ id:"reflection", x:235, y:52, requires:[], methods:["M-01"],
  title:["Reflection","การสะท้อน"],
  body:[["The angle of incidence equals the angle of reflection, both measured from the normal rather than from the surface. Measuring from the surface is a small habit that produces consistently wrong answers.",
         "A plane mirror gives an image as far behind the glass as the object is in front, the same size, upright, and virtual — no light actually reaches where it appears to be."],
        ["มุมตกกระทบเท่ากับมุมสะท้อน โดยวัดจากเส้นปกติไม่ใช่จากผิว การวัดจากผิวเป็นนิสัยเล็กๆ ที่ให้คำตอบผิดอย่างสม่ำเสมอ",
         "กระจกเงาราบให้ภาพอยู่หลังกระจกเป็นระยะเท่ากับที่วัตถุอยู่หน้ากระจก ขนาดเท่าเดิม หัวตั้ง และเป็นภาพเสมือน ไม่มีแสงไปถึงตำแหน่งที่ภาพปรากฏจริงๆ"]],
  formula:["θ_incidence = θ_reflection","θ_incidence = θ_reflection"],
  flabel:["Both measured from the normal","วัดจากเส้นปกติทั้งคู่"],
  viz:"bars",
  vizcfg:{
    title:["THE ONE LAW THAT NEVER BENDS","กฎเดียวที่ไม่เคยเปลี่ยน"],
    ylab:["degrees from the normal","องศาจากเส้นแนวฉาก"],
    ctrls:[
      {k:"i", lab:["Angle of incidence","มุมตกกระทบ"], min:0, max:89, step:1, def:35, unit:"°"},
      {k:"rough", lab:["",""], opts:[["smooth","ผิวเรียบ"], ["rough surface","ผิวขรุขระ"]], min:0, def:0, unit:""}
    ],
    readouts:[
      {lab:["Angle of incidence","มุมตกกระทบ"], f:function(S){ return S.p.i+"°"; }},
      {lab:["Angle of reflection","มุมสะท้อน"],  f:function(S){ return S.p.i+"°"; }},
      {lab:["Measured from","วัดจาก"], f:function(){
        return L()?"เส้นแนวฉาก ไม่ใช่จากผิว":"the normal, never from the surface"; }},
      {lab:["Kind of reflection","ชนิดการสะท้อน"], f:function(S){
        return S.p.rough===0 ? (L()?"สะท้อนแบบราบเรียบ — เกิดภาพ":"specular — you get an image")
                             : (L()?"สะท้อนแบบกระจาย — เห็นวัตถุแต่ไม่เห็นภาพ":"diffuse — you see the object, not an image"); }}
    ],
    bars:[
      {lab:["Incidence","ตกกระทบ"], f:function(p){ return p.i; }, col:"accent"},
      {lab:["Reflection","สะท้อน"],  f:function(p){ return p.i; }, col:"good"},
      {lab:["From the surface","วัดจากผิว"], f:function(p){ return 90-p.i; }, col:"faint"}
    ],
    note:["the grey bar is the angle people quote by mistake — always use the normal","แถบสีเทาคือมุมที่คนมักตอบผิด ให้ใช้เส้นแนวฉากเสมอ"]
  } },

{ id:"refraction", x:100, y:150, requires:["reflection"], methods:["M-02","M-06"],
  title:["Refraction","การหักเห"],
  body:[["Light changes speed when it enters a new medium, and that speed change bends it. The refractive index n = c/v measures the slowing, and Snell's law n₁ sin θ₁ = n₂ sin θ₂ measures the bending.",
         "Entering a denser medium slows the light and bends it towards the normal. Inverting the ratio is trap T-01 — check the direction of bending against physical sense before trusting the arithmetic."],
        ["แสงเปลี่ยนอัตราเร็วเมื่อเข้าสู่ตัวกลางใหม่ และการเปลี่ยนอัตราเร็วนั้นทำให้มันเบน ดัชนีหักเห n = c/v วัดการช้าลง และกฎสเนลล์ n₁ sin θ₁ = n₂ sin θ₂ วัดการเบน",
         "การเข้าสู่ตัวกลางที่หนาแน่นกว่าทำให้แสงช้าลงและเบนเข้าหาเส้นปกติ การกลับอัตราส่วนคือกับดัก T-01 ให้ตรวจทิศการเบนกับสามัญสำนึกทางฟิสิกส์ก่อนเชื่อผลการคำนวณ"]],
  formula:["n = c/v        n₁ sin θ₁ = n₂ sin θ₂","n = c/v        n₁ sin θ₁ = n₂ sin θ₂"],
  flabel:["Denser medium · bends towards the normal","ตัวกลางหนาแน่นกว่า · เบนเข้าหาเส้นปกติ"],
  viz:"plot",
  vizcfg:{
    title:["HOW MUCH THE RAY BENDS","รังสีหักเหไปเท่าใด"],
    xlab:["angle of incidence (°)","มุมตกกระทบ (°)"], ylab:["angle of refraction (°)","มุมหักเห (°)"],
    xmin:0, xmax:89, ymin:0, fill:false,
    fn:function(x,p){
      var s=p.n1*Math.sin(x*Math.PI/180)/p.n2;
      return s>1 ? 90 : Math.asin(s)*180/Math.PI;
    },
    mark:function(p){ return p.i; },
    ctrls:[
      {k:"n1", lab:["n of first medium","n ของตัวกลางแรก"], min:1, max:2.5, step:.05, def:1, unit:""},
      {k:"n2", lab:["n of second medium","n ของตัวกลางที่สอง"], min:1, max:2.5, step:.05, def:1.5, unit:""},
      {k:"i",  lab:["Angle of incidence","มุมตกกระทบ"], min:0, max:88, step:1, def:40, unit:"°"}
    ],
    readouts:[
      {lab:["Angle of refraction","มุมหักเห"], f:function(S){
        var p=S.p, s=p.n1*Math.sin(p.i*Math.PI/180)/p.n2;
        return s>1 ? (L()?"ไม่มี — สะท้อนกลับหมด":"none — total internal reflection")
                   : fmt2(Math.asin(s)*180/Math.PI)+"°"; }},
      {lab:["Bends towards","หักเหเข้าหา"], f:function(S){
        return S.p.n2>S.p.n1 ? (L()?"เส้นแนวฉาก — เข้าสู่ตัวกลางหนาแน่นกว่า":"the normal — entering a denser medium")
             : S.p.n2<S.p.n1 ? (L()?"ออกจากเส้นแนวฉาก":"away from the normal")
             : (L()?"ไม่หักเห":"not at all"); }},
      {lab:["Speed in medium 2","อัตราเร็วในตัวกลางที่ 2"], f:function(S){
        return fmt2(3e8/S.p.n2/1e8)+" × 10⁸ m/s"; }},
      {lab:["Frequency change","การเปลี่ยนความถี่"], f:function(){
        return L()?"ไม่มีเลย — ความยาวคลื่นเปลี่ยนแทน":"none at all — the wavelength changes instead"; }}
    ],
    note:["the curve flattens at 90° once total internal reflection takes over","เส้นโค้งแบนที่ 90° เมื่อการสะท้อนกลับหมดเข้ามาแทน"]
  } },

{ id:"tir", x:370, y:150, requires:["refraction"], methods:["M-03"],
  title:["Total internal reflection","การสะท้อนกลับหมด"],
  body:[["Going from a denser medium to a rarer one, the refracted ray bends away from the normal. Past a certain incident angle it would have to bend beyond 90°, which is impossible — so none of it escapes and all of it reflects.",
         "That angle is the critical angle, sin θc = n₂/n₁, and it only exists when n₁ > n₂. Looking for a critical angle going into a denser medium is trap T-02. Optical fibres are this effect used deliberately."],
        ["เมื่อเดินทางจากตัวกลางหนาแน่นกว่าไปหาที่เบาบางกว่า รังสีหักเหจะเบนออกจากเส้นปกติ เลยมุมตกกระทบค่าหนึ่งไป มันจะต้องเบนเกิน 90° ซึ่งเป็นไปไม่ได้ จึงไม่มีแสงออกไปเลยและสะท้อนกลับทั้งหมด",
         "มุมนั้นคือมุมวิกฤต sin θc = n₂/n₁ และมีอยู่เฉพาะเมื่อ n₁ > n₂ การหามุมวิกฤตขณะเข้าสู่ตัวกลางที่หนาแน่นกว่าคือกับดัก T-02 เส้นใยนำแสงคือการใช้ปรากฏการณ์นี้อย่างจงใจ"]],
  formula:["sin θc = n₂ / n₁ ,  n₁ > n₂","sin θc = n₂ / n₁ ,  n₁ > n₂"],
  flabel:["Dense to rare only","จากหนาแน่นไปเบาบางเท่านั้น"],
  viz:"numline",
  vizcfg:{
    title:["WHICH ANGLES ESCAPE, AND WHICH DO NOT","มุมใดออกไปได้ และมุมใดออกไม่ได้"],
    min:0, max:90,
    ctrls:[
      {k:"n1", lab:["n inside","n ของตัวกลางใน"],  min:1.1, max:2.5, step:.05, def:1.5, unit:""},
      {k:"n2", lab:["n outside","n ของตัวกลางนอก"], min:1, max:2.4, step:.05, def:1, unit:""},
      {k:"i",  lab:["Angle of incidence","มุมตกกระทบ"], min:0, max:89, step:1, def:30, unit:"°"}
    ],
    readouts:[
      {lab:["Critical angle","มุมวิกฤต"], f:function(S){
        var p=S.p;
        return p.n2>=p.n1 ? (L()?"ไม่มี — ต้องออกจากตัวกลางหนาแน่นกว่า":"none — you must go dense to less dense")
                          : fmt2(Math.asin(p.n2/p.n1)*180/Math.PI)+"°"; }},
      {lab:["What happens","เกิดอะไรขึ้น"], f:function(S){
        var p=S.p;
        if(p.n2>=p.n1) return L()?"หักเหออกไปเสมอ":"it always refracts out";
        var c=Math.asin(p.n2/p.n1)*180/Math.PI;
        return p.i<c ? (L()?"หักเหออกไปได้":"refracts out") : (L()?"สะท้อนกลับหมด":"totally internally reflected"); }},
      {lab:["Needs which direction?","ต้องเดินทางทิศใด"], f:function(){
        return L()?"จากหนาแน่นมากไปหาหนาแน่นน้อย เท่านั้น":"dense to less dense, only"; }},
      {lab:["Used in","ใช้ใน"], f:function(){
        return L()?"ใยแก้วนำแสง ปริซึมกล้องส่องทางไกล เพชร":"optical fibres, binocular prisms, diamonds"; }}
    ],
    regions:function(p){
      if(p.n2>=p.n1) return [{a:0,b:90,col:"good",lab:["always refracts","หักเหได้เสมอ"]}];
      var c=Math.asin(p.n2/p.n1)*180/Math.PI;
      return [{a:0,b:c,col:"good",lab:["refracts out","หักเหออกไป"],openB:true},
              {a:c,b:90,col:"accent",lab:["total internal reflection","สะท้อนกลับหมด"]}];
    },
    points:function(p){
      var pts=[{v:p.i, lab:["your ray","รังสีของคุณ"], col:"warn"}];
      if(p.n2<p.n1) pts.push({v:Math.asin(p.n2/p.n1)*180/Math.PI, lab:["critical angle","มุมวิกฤต"], col:"ink"});
      return pts;
    },
    note:["raise n outside towards n inside and the escape window widens until it swallows everything","เพิ่ม n ด้านนอกเข้าใกล้ n ด้านใน หน้าต่างที่ออกได้จะกว้างขึ้นจนกลืนทุกมุม"]
  },
  guide:[
    {say:["Glass to air. Shallow angles escape, but past the critical angle the light is trapped completely.",
          "จากแก้วสู่อากาศ มุมน้อยออกไปได้ แต่เลยมุมวิกฤตไปแสงถูกกักไว้ทั้งหมด"], set:{n1:1.5,n2:1,i:30}},
    {say:["Push the ray past the critical angle and it lands in the red zone — none of it gets out.",
          "ดันรังสีให้เลยมุมวิกฤต มันจะตกในโซนสีแดง ไม่มีแสงออกไปได้เลย"], set:{n1:1.5,n2:1,i:60}},
    {say:["A diamond has a very high n, so its critical angle is tiny — which is exactly why it sparkles.",
          "เพชรมีค่า n สูงมาก มุมวิกฤตจึงเล็กมาก ซึ่งเป็นเหตุผลที่มันแวววาว"], set:{n1:2.4,n2:1,i:30}}
  ] },

{ id:"lenses", x:235, y:248, requires:["refraction"], methods:["M-04"],
  title:["Lenses","เลนส์"],
  body:[["A converging lens brings parallel rays to a focus a distance f beyond it. Two rays are enough to locate any image: one arriving parallel to the axis leaves through the focus, and one through the centre carries straight on undeviated.",
         "The lens equation 1/f = 1/s + 1/s' does the same job arithmetically. Note that the reciprocals add — adding f, s and s' directly is trap T-04."],
        ["เลนส์นูนรวมรังสีขนานให้ไปตัดกันที่ระยะ f หลังเลนส์ ใช้เพียงสองรังสีก็ระบุตำแหน่งภาพได้ รังสีที่มาขนานแกนจะออกผ่านจุดโฟกัส และรังสีที่ผ่านจุดกึ่งกลางจะทะลุตรงไปไม่เบน",
         "สมการเลนส์ 1/f = 1/s + 1/s' ทำงานเดียวกันด้วยการคำนวณ สังเกตว่าเป็นการบวกส่วนกลับ การบวก f, s และ s' ตรงๆ คือกับดัก T-04"]],
  formula:["1/f = 1/s + 1/s'","1/f = 1/s + 1/s'"],
  flabel:["Reciprocals, not the values","บวกส่วนกลับ ไม่ใช่บวกค่า"],
  viz:{
    vb:"0 0 560 300", anim:false,
    ctrls:[
      {k:"f", lab:["Focal length f","ความยาวโฟกัส f"], min:5,  max:30, step:1, def:15, unit:" cm"},
      {k:"s", lab:["Object distance s","ระยะวัตถุ s"],  min:4,  max:60, step:1, def:40, unit:" cm"},
      {k:"h", lab:["Object height","ความสูงวัตถุ"],     min:2,  max:10, step:1, def:6,  unit:" cm"}
    ],
    readouts:[
      {lab:["Image distance s'","ระยะภาพ s'"], f:function(S){
        var d=1/S.p.f-1/S.p.s; return Math.abs(d)<1e-6 ? "∞" : fmt(1/d)+" cm"; }},
      {lab:["Magnification m","กำลังขยาย m"], f:function(S){
        var d=1/S.p.f-1/S.p.s; return Math.abs(d)<1e-6 ? "∞" : fmt(-(1/d)/S.p.s); }},
      {lab:["Image","ภาพ"], f:function(S){
        var d=1/S.p.f-1/S.p.s;
        if(Math.abs(d)<1e-6) return L()?"ไม่เกิดภาพ":"none";
        var sp=1/d;
        return sp>0 ? (L()?"จริง หัวกลับ":"real, inverted") : (L()?"เสมือน หัวตั้ง":"virtual, upright"); }}
    ],
    draw:function(S,o){
      var f=S.p.f, s=S.p.s, ho=S.p.h;
      var LX=300, AY=170, sc=3.6;               /* lens x, axis y, px per cm */
      var d=1/f-1/s, sp=(Math.abs(d)<1e-6)? 1e6 : 1/d;
      var hi=-ho*sp/s;
      /* principal axis with a centimetre scale */
      o.push('<text x="30" y="24" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5" letter-spacing="1.4">'+tx(["RAY DIAGRAM","แผนภาพรังสี"])+'</text>');
      o.push('<line x1="20" y1="'+AY+'" x2="540" y2="'+AY+'" stroke="var(--ink-faint)" stroke-width="1.4"/>');
      for(var c=-70;c<=60;c+=10){
        var px=LX+c*sc; if(px<24||px>538) continue;
        o.push('<line x1="'+px+'" y1="'+AY+'" x2="'+px+'" y2="'+(AY+6)+'" stroke="var(--ink-faint)" stroke-width="1"/>');
        if(c%20===0) o.push('<text x="'+px+'" y="'+(AY+19)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="9.5" text-anchor="middle">'+c+'</text>');
      }
      o.push('<text x="538" y="'+(AY+19)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="end">cm</text>');
      /* the lens */
      o.push('<ellipse cx="'+LX+'" cy="'+AY+'" rx="9" ry="70" fill="var(--accent)" fill-opacity=".10" stroke="var(--accent)" stroke-width="1.6"/>');
      /* focal points */
      [-f,f].forEach(function(fp){
        var px=LX+fp*sc;
        o.push('<circle cx="'+px+'" cy="'+AY+'" r="3" fill="var(--ink-soft)"/>');
        o.push('<text x="'+px+'" y="'+(AY-8)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">F</text>');
      });
      /* object arrow */
      var ox=LX-s*sc, oy=AY-ho*sc;
      o.push('<line x1="'+ox+'" y1="'+AY+'" x2="'+ox+'" y2="'+oy+'" stroke="var(--ink)" stroke-width="2.4"/>');
      o.push('<path d="M'+ox+' '+oy+' l-4 8 l8 0 z" fill="var(--ink)"/>');
      /* ray 1: parallel in, through the far focus out */
      o.push('<line x1="'+ox+'" y1="'+oy+'" x2="'+LX+'" y2="'+oy+'" stroke="var(--accent)" stroke-width="1.6"/>');
      var slope1=(AY-oy)/(f*sc);
      o.push('<line x1="'+LX+'" y1="'+oy+'" x2="538" y2="'+(oy+slope1*(538-LX))+'" stroke="var(--accent)" stroke-width="1.6"/>');
      /* ray 2: straight through the centre */
      var slope2=(AY-oy)/(LX-ox);
      o.push('<line x1="'+ox+'" y1="'+oy+'" x2="538" y2="'+(oy+slope2*(538-ox))+'" stroke="var(--accent)" stroke-width="1.6"/>');
      /* image */
      if(sp>0 && sp<80){
        var ix=LX+sp*sc, iy=AY-hi*sc;
        o.push('<line x1="'+ix+'" y1="'+AY+'" x2="'+ix+'" y2="'+iy+'" stroke="var(--good)" stroke-width="2.8"/>');
        o.push('<path d="M'+ix+' '+iy+' l-4 '+(hi<0?-8:8)+' l8 0 z" fill="var(--good)"/>');
        o.push('<text x="'+ix+'" y="'+(iy+(hi<0?18:-8))+'" fill="var(--good)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">'+tx(["real","จริง"])+'</text>');
      } else if(sp<0 && sp>-120){
        var vx=LX+sp*sc, vy=AY-hi*sc;
        o.push('<line x1="'+vx+'" y1="'+AY+'" x2="'+vx+'" y2="'+vy+'" stroke="var(--warn)" stroke-width="2.4" stroke-dasharray="4 3"/>');
        o.push('<path d="M'+vx+' '+vy+' l-4 8 l8 0 z" fill="var(--warn)"/>');
        o.push('<text x="'+vx+'" y="'+(vy-8)+'" fill="var(--warn)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">'+tx(["virtual","เสมือน"])+'</text>');
        /* dashed back-extensions showing where the rays appear to come from */
        o.push('<line x1="'+LX+'" y1="'+oy+'" x2="'+vx+'" y2="'+vy+'" stroke="var(--warn)" stroke-width="1" stroke-dasharray="3 3"/>');
      }
      o.push('<text x="30" y="288" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["object — black    rays — red    image — green real / amber virtual","วัตถุ — ดำ    รังสี — แดง    ภาพ — เขียวคือภาพจริง / เหลืองอำพันคือภาพเสมือน"])+'</text>');
    }
  },
  guide:[
    {say:["Object well outside the focus. Two red rays cross beyond the lens and the green image is real and inverted.",
          "วัตถุอยู่นอกจุดโฟกัสมาก รังสีแดงสองเส้นตัดกันหลังเลนส์ ภาพสีเขียวเป็นภาพจริงหัวกลับ"], set:{f:15,s:40,h:6}},
    {say:["Slide the object towards the focus. The image races away and grows — at s = f it would be infinitely far.",
          "เลื่อนวัตถุเข้าหาจุดโฟกัส ภาพวิ่งออกไปไกลและใหญ่ขึ้น ที่ s = f ภาพจะอยู่ไกลอนันต์"], set:{f:15,s:18,h:6}},
    {say:["Now bring it inside the focus. The rays diverge, so the image goes virtual, upright and magnified — a magnifying glass.",
          "ทีนี้เลื่อนเข้ามาในจุดโฟกัส รังสีบานออก ภาพจึงกลายเป็นภาพเสมือน หัวตั้ง และขยาย นี่คือแว่นขยาย"], set:{f:15,s:9,h:6}},
    {say:["Shorten the focal length instead. A stronger lens bends the rays harder and pulls the image in closer.",
          "ลองลดความยาวโฟกัสแทน เลนส์ที่กำลังสูงกว่าหักเหรังสีมากกว่า และดึงภาพเข้ามาใกล้ขึ้น"], set:{f:8,s:20,h:6}}
  ]},

{ id:"images", x:235, y:346, requires:["lenses","tir"], methods:["M-05"],
  title:["Describing an image","การบรรยายภาพ"],
  body:[["Magnification is m = −s'/s, and its sign carries the orientation: negative means inverted. Its size carries the scale: |m| > 1 is enlarged.",
         "A real image has positive s' and can be caught on a screen; a virtual image has negative s' and cannot. Getting the sign convention backwards is trap T-03, and it turns every answer inside out."],
        ["กำลังขยายคือ m = −s'/s และเครื่องหมายของมันบอกการวางตัว ค่าลบหมายถึงหัวกลับ ส่วนขนาดบอกอัตราส่วน |m| > 1 คือภาพขยาย",
         "ภาพจริงมี s' เป็นบวกและรับบนฉากได้ ภาพเสมือนมี s' เป็นลบและรับไม่ได้ การใช้เครื่องหมายกลับด้านคือกับดัก T-03 ซึ่งทำให้คำตอบกลับตาลปัตรทั้งหมด"]],
  formula:["m = −s'/s        s' > 0 real  ·  s' < 0 virtual","m = −s'/s        s' > 0 ภาพจริง  ·  s' < 0 ภาพเสมือน"],
  flabel:["Sign is orientation, size is scale","เครื่องหมายบอกการวางตัว ขนาดบอกอัตราส่วน"],
  viz:"table",
  vizcfg:{
    title:["REAL AGAINST VIRTUAL IMAGES","ภาพจริง เทียบ ภาพเสมือน"],
    cols:[["Property","สมบัติ"],["Real image","ภาพจริง"],["Virtual image","ภาพเสมือน"]],
    rowKey:"i",
    readouts:[
      {lab:["Row","แถว"], f:function(S){
        return [["Do rays actually meet?","รังสีมาบรรจบจริงไหม"],["Catch it on a screen?","รับบนฉากได้ไหม"],
                ["Orientation","การกลับหัว"],["Sign of image distance v","เครื่องหมายของ v"],
                ["Everyday example","ตัวอย่างในชีวิตประจำวัน"]][S.p.i][L()]; }},
      {lab:["The test that settles it","เกณฑ์ที่ตัดสินได้"], f:function(){
        return L()?"รับบนฉากได้หรือไม่":"can you catch it on a screen"; }}
    ],
    rows:function(p){
      var R=[[["Rays actually meet?","รังสีบรรจบจริงไหม"],["yes","ใช่"],["no — they only appear to","ไม่ — แค่ดูเหมือนบรรจบ"]],
             [["On a screen?","รับบนฉาก"],["yes","ได้"],["never","ไม่ได้เลย"]],
             [["Orientation","การวางตัว"],["inverted","หัวกลับ"],["upright","หัวตั้ง"]],
             [["Image distance v","ระยะภาพ v"],["positive","เป็นบวก"],["negative","เป็นลบ"]],
             [["Example","ตัวอย่าง"],["cinema projection","ภาพฉายในโรงหนัง"],["a plane mirror","กระจกเงาราบ"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===0?"ink":(j===1?"good":"warn")}; }); });
    },
    note:["a mirror image is virtual — that is why no screen behind the glass ever shows it","ภาพในกระจกเป็นภาพเสมือน จึงไม่มีฉากใดหลังกระจกที่รับภาพนั้นได้"]
  } }
],

methods:[
{id:"M-01", name:["Apply the law of reflection","ใช้กฎการสะท้อน"]},
{id:"M-02", name:["Apply Snell's law","ใช้กฎสเนลล์"]},
{id:"M-03", name:["Find the critical angle","หามุมวิกฤต"]},
{id:"M-04", name:["Use the lens equation","ใช้สมการเลนส์"]},
{id:"M-05", name:["Find magnification and describe the image","หากำลังขยายและบรรยายภาพ"]},
{id:"M-06", name:["Real and apparent depth","ความลึกจริงและความลึกปรากฏ"]}
],

traps:{
"T-01":["Snell's law was inverted. Light entering a denser medium bends TOWARDS the normal.","กลับด้านกฎสเนลล์ แสงที่เข้าสู่ตัวกลางหนาแน่นกว่าจะเบนเข้าหาเส้นปกติ"],
"T-02":["A critical angle exists only going from dense to rare. There is none in the other direction.","มุมวิกฤตมีเฉพาะตอนไปจากตัวกลางหนาแน่นสู่เบาบาง ทิศตรงข้ามไม่มี"],
"T-03":["Sign convention. A virtual image has a negative image distance and a positive magnification.","เครื่องหมายผิด ภาพเสมือนมีระยะภาพเป็นลบและกำลังขยายเป็นบวก"],
"T-04":["The lens equation adds reciprocals. You cannot add f, s and s' directly.","สมการเลนส์บวกส่วนกลับ จะบวก f, s และ s' ตรงๆ ไม่ได้"]
},

gen:{
"M-01": function(sf){
  var a=pick([20,30,40,55]);
  if(sf==="S-04") return {stem:["The angle of incidence is measured from which line?","มุมตกกระทบวัดจากเส้นใด"],
    opts:[{v:["The normal to the surface","เส้นปกติของผิว"],ok:1},{v:["The surface itself","ตัวผิวเอง"],trap:"T-01"},
          {v:["The reflected ray","รังสีสะท้อน"]},{v:["The vertical","แนวดิ่ง"]}],unit:""};
  return {stem:["A ray strikes a mirror at "+a+"° to the surface. Find the angle of reflection from the normal.",
                "รังสีตกกระทบกระจกทำมุม "+a+"° กับผิว จงหามุมสะท้อนวัดจากเส้นปกติ"],
    opts:[{v:String(90-a),ok:1},{v:String(a),trap:"T-01"},{v:String(180-a)},{v:String(a/2)}],unit:"°"};
},
"M-02": function(sf){
  var n=pick([1.33,1.5,1.6]), th=pick([30,45,60]);
  var s1={30:0.5,45:0.707,60:0.866}[th], s2=s1/n;
  if(sf==="S-04") return {stem:["Light passes from air into glass. Which way does it bend?",
                                "แสงผ่านจากอากาศเข้าสู่แก้ว มันเบนไปทางใด"],
    opts:[{v:["Towards the normal","เข้าหาเส้นปกติ"],ok:1},{v:["Away from the normal","ออกจากเส้นปกติ"],trap:"T-01"},
          {v:["It does not bend","ไม่เบน"]},{v:["It reflects entirely","สะท้อนทั้งหมด"]}],unit:""};
  if(sf==="S-05") return {stem:["Light slows to "+fmt(3e8/n/1e8)+" × 10⁸ m/s in a medium. Find its refractive index.",
                                "แสงช้าลงเหลือ "+fmt(3e8/n/1e8)+" × 10⁸ ม./วินาที ในตัวกลาง จงหาดัชนีหักเห"],
    opts:[{v:String(n),ok:1},{v:fmt2(1/n),trap:"T-01"},{v:fmt2(n*2)},{v:"1.00"}],unit:""};
  return {stem:["Light enters glass of index "+n+" at "+th+"° from air. Find sin of the refracted angle.",
                "แสงเข้าสู่แก้วดัชนี "+n+" ที่มุม "+th+"° จากอากาศ จงหาไซน์ของมุมหักเห"],
    opts:[{v:fmt2(s2),ok:1},{v:fmt2(s1*n),trap:"T-01"},{v:fmt2(s1)},{v:fmt2(s2/2)}],unit:""};
},
"M-03": function(sf){
  var n=pick([1.33,1.5,1.6,2.0]);
  var sc=1/n;
  if(sf==="S-04") return {stem:["Light travels from water into air. Under what condition can total internal reflection occur?",
                                "แสงเดินทางจากน้ำสู่อากาศ เงื่อนไขใดที่ทำให้เกิดการสะท้อนกลับหมด"],
    opts:[{v:["The incident angle exceeds the critical angle","มุมตกกระทบเกินมุมวิกฤต"],ok:1},
          {v:["It travels from air into water instead","เดินทางจากอากาศเข้าสู่น้ำแทน"],trap:"T-02"},
          {v:["The incident angle is zero","มุมตกกระทบเป็นศูนย์"]},
          {v:["It never can","เกิดไม่ได้เลย"],trap:"T-02"}],unit:""};
  return {stem:["Find sin of the critical angle for a medium of index "+n+" against air.",
                "จงหาไซน์ของมุมวิกฤตสำหรับตัวกลางดัชนี "+n+" เทียบกับอากาศ"],
    opts:[{v:fmt2(sc),ok:1},{v:fmt2(n),trap:"T-02"},{v:fmt2(sc/2)},{v:fmt2(n/2)}],unit:""};
},
"M-04": function(sf){
  var f=pick([10,15,20]), s=pick([30,40,60]);
  var sp=1/(1/f-1/s);
  if(sf==="S-04") return {stem:["An object sits exactly at the focal point of a converging lens. Where is the image?",
                                "วางวัตถุที่จุดโฟกัสของเลนส์นูนพอดี ภาพอยู่ที่ใด"],
    opts:[{v:["At infinity — no image forms","ที่อนันต์ ไม่เกิดภาพ"],ok:1},
          {v:["At the focal point on the other side","ที่จุดโฟกัสอีกด้าน"],trap:"T-04"},
          {v:["At the lens","ที่ตัวเลนส์"]},{v:["At twice the focal length","ที่สองเท่าของความยาวโฟกัส"]}],unit:""};
  if(sf==="S-05") return {stem:["A lens forms an image "+fmt(sp)+" cm away from an object "+s+" cm away. Find the focal length.",
                                "เลนส์สร้างภาพห่าง "+fmt(sp)+" ซม. จากวัตถุที่อยู่ห่าง "+s+" ซม. จงหาความยาวโฟกัส"],
    opts:[{v:String(f),ok:1},{v:fmt(s+sp),trap:"T-04"},{v:fmt(s-sp)},{v:fmt(f*2)}],unit:" cm"};
  return {stem:["An object is "+s+" cm from a converging lens of focal length "+f+" cm. Find the image distance.",
                "วัตถุอยู่ห่างเลนส์นูนความยาวโฟกัส "+f+" ซม. เป็นระยะ "+s+" ซม. จงหาระยะภาพ"],
    opts:[{v:fmt(sp),ok:1},{v:fmt(s-f),trap:"T-04"},{v:fmt(s+f),trap:"T-04"},{v:fmt(sp*2)}],unit:" cm"};
},
"M-05": function(sf){
  var f=pick([10,15,20]), s=pick([8,30,50]);
  var sp=1/(1/f-1/s), m=-sp/s;
  if(sf==="S-04") return {stem:["An image has magnification m = +2. What is it like?",
                                "ภาพมีกำลังขยาย m = +2 ภาพเป็นอย่างไร"],
    opts:[{v:["Virtual, upright and twice the size","เสมือน หัวตั้ง และใหญ่เป็นสองเท่า"],ok:1},
          {v:["Real, inverted and twice the size","จริง หัวกลับ และใหญ่เป็นสองเท่า"],trap:"T-03"},
          {v:["Real, upright and half the size","จริง หัวตั้ง และเล็กลงครึ่งหนึ่ง"],trap:"T-03"},
          {v:["Virtual, inverted and half the size","เสมือน หัวกลับ และเล็กลงครึ่งหนึ่ง"],trap:"T-03"}],unit:""};
  if(sf==="S-03") return {stem:["An object sits inside the focal length of a converging lens. Describe the image.",
                                "วางวัตถุไว้ในระยะโฟกัสของเลนส์นูน จงบรรยายภาพ"],
    opts:[{v:["Virtual, upright, enlarged","เสมือน หัวตั้ง ขยาย"],ok:1},
          {v:["Real, inverted, enlarged","จริง หัวกลับ ขยาย"],trap:"T-03"},
          {v:["Real, upright, reduced","จริง หัวตั้ง ย่อ"],trap:"T-03"},
          {v:["No image forms","ไม่เกิดภาพ"]}],unit:""};
  return {stem:["An object "+s+" cm from a lens of focal length "+f+" cm. Find the magnification.",
                "วัตถุอยู่ห่างเลนส์ความยาวโฟกัส "+f+" ซม. เป็นระยะ "+s+" ซม. จงหากำลังขยาย"],
    opts:[{v:fmt(m),ok:1},{v:fmt(-m),trap:"T-03"},{v:fmt(sp/s)},{v:fmt(s/sp)}],unit:""};
},
"M-06": function(sf){
  var n=pick([1.33,1.5]), real=pick([12,20,30]);
  var app=real/n;
  if(sf==="S-04") return {stem:["A coin at the bottom of a pool appears:",
                                "เหรียญที่ก้นสระว่ายน้ำจะปรากฏ"],
    opts:[{v:["Shallower than it really is","ตื้นกว่าความเป็นจริง"],ok:1},
          {v:["Deeper than it really is","ลึกกว่าความเป็นจริง"],trap:"T-01"},
          {v:["At its true depth","ที่ความลึกจริง"]},{v:["Larger and deeper","ใหญ่ขึ้นและลึกขึ้น"],trap:"T-01"}],unit:""};
  return {stem:["A pool of water (n = "+n+") is "+real+" cm deep. Find its apparent depth viewed from above.",
                "สระน้ำ (n = "+n+") ลึก "+real+" ซม. จงหาความลึกปรากฏเมื่อมองจากด้านบน"],
    opts:[{v:fmt(app),ok:1},{v:fmt(real*n),trap:"T-01"},{v:String(real)},{v:fmt(app/2)}],unit:" cm"};
}
}
};
