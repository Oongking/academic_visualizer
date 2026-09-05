var CHAPTER = {
id:"ch02", num:"02", slug:"linear-motion", subject:"physics",
kicker:["Physics · Chapter 02","ฟิสิกส์ · บทที่ 2"],
title:["Linear Motion","การเคลื่อนที่แนวตรง"],
mapTitle:["Six ideas, one chain","หกแนวคิด หนึ่งสายโซ่"],
lede:["Nothing here stands alone. Displacement defines velocity, velocity defines acceleration, and the graph ties them together before the five equations fall out of it. The map tracks where you are — everything below it is one continuous read.",
      "ไม่มีหัวข้อใดอยู่ลำพัง การกระจัดนิยามความเร็ว ความเร็วนิยามความเร่ง และกราฟผูกทั้งหมดเข้าด้วยกันก่อนที่สมการทั้งห้าจะตามมา แผนที่คอยบอกว่าคุณอยู่ตรงไหน ส่วนเนื้อหาทั้งหมดด้านล่างอ่านต่อเนื่องได้เลย"],
next:["→ continues in Chapter 07 · Curved Motion","→ ต่อในบทที่ 7 · การเคลื่อนที่แนวโค้ง"],

nodes:[
{ id:"displacement", x:235, y:52, requires:[], methods:[],
  title:["Displacement","การกระจัด"],
  body:[["Distance is how far you travelled. Displacement is how far you ended up from where you began, and in which direction. Distance is a scalar and never shrinks; displacement is a vector and can return to zero.",
         "Run a full lap of a track and your distance is 400 m while your displacement is exactly zero. Every formula in this chapter is built on displacement, not distance — the single most common place marks are lost."],
        ["ระยะทางคือความยาวเส้นทางที่เคลื่อนที่จริง ส่วนการกระจัดคือระยะจากจุดเริ่มถึงจุดสุดท้ายพร้อมทิศทาง ระยะทางเป็นสเกลาร์และไม่มีวันลดลง แต่การกระจัดเป็นเวกเตอร์และกลับมาเป็นศูนย์ได้",
         "วิ่งรอบสนามครบหนึ่งรอบ ระยะทางคือ 400 เมตร แต่การกระจัดเป็นศูนย์พอดี ทุกสูตรในบทนี้สร้างอยู่บนการกระจัด ไม่ใช่ระยะทาง ซึ่งเป็นจุดที่เสียคะแนนบ่อยที่สุด"]],
  formula:["|s| ≤ distance","การกระจัด ≤ ระยะทาง เสมอ"], flabel:["Always true","จริงเสมอ"],
  viz:"scene",
  vizcfg:{
    question:["He rode 3 km up the soi and back. Why is he only 800 m from home?",
              "เขาขี่ขึ้นซอยไป 3 กม. แล้วย้อนกลับ ทำไมจึงห่างจากบ้านแค่ 800 ม."],
    ctrls:[
      {k:"out",  lab:["Rides up the soi to","ขี่ขึ้นซอยถึง"], min:0, max:55, step:1, def:40, unit:" m"},
      {k:"back", lab:["Then turns back by","แล้วย้อนกลับ"],   min:0, max:55, step:1, def:24, unit:" m"}
    ],
    readouts:[
      {lab:["Distance ridden","ระยะทางที่ขี่"], f:function(S){ return fmt(S.p.out+S.p.back)+" m"; }},
      {lab:["Displacement","การกระจัด"],        f:function(S){ return fmt(S.p.out-S.p.back)+" m"; }},
      {lab:["Odometer vs arrow","มาตรวัดเทียบลูกศร"], f:function(S){
        var d=(S.p.out+S.p.back)-(S.p.out-S.p.back);
        return d<1e-9 ? (L()?"ตรงกัน — ไม่ได้ย้อนกลับ":"identical — he never turned back")
                      : (L()?"ต่างกัน "+fmt(d)+" ม.":"apart by "+fmt(d)+" m"); }},
      {lab:["Back home?","ถึงบ้านหรือยัง"], f:function(S){
        return Math.abs(S.p.out-S.p.back)<1e-9
          ? (L()?"ถึงแล้ว · การกระจัดเป็นศูนย์":"yes · displacement is zero")
          : (L()?"ยัง":"not yet"); }}
    ],
    scene:{ kind:"road", span:function(){ return 56; },
      props:function(p){ return [
        {kind:"tree", x:2},
        {kind:"post", x:52},
        {kind:"zebra", x:p.out, arg:26}
      ]; },
      cast:function(p){
        var here=p.out-p.back;
        return [{kind:"moto", x:Math.max(0,here), col:"var(--accent)", arg:(p.back>0?1:0),
                 lab:["he is here","เขาอยู่ตรงนี้"]}];
      },
      marks:function(p){
        var m=[{a:0, b:p.out, lab:["rode out","ขาไป"], col:"var(--ink-faint)"}];
        if(p.back>0) m.push({a:Math.max(0,p.out-p.back), b:p.out, lab:["rode back","ขากลับ"], col:"var(--warn)"});
        m.push({a:0, b:Math.max(0,p.out-p.back), lab:["how far from home","ห่างจากบ้าน"], col:"var(--accent)"});
        return m;
      }
    },
    instrument:{ kind:"bar",
      ylab:["metres","เมตร"],
      bars:[
        {lab:["Distance ridden","ระยะทางที่ขี่"], f:function(p){ return p.out+p.back; }, col:"faint"},
        {lab:["Displacement","การกระจัด"],        f:function(p){ return p.out-p.back; }, col:"accent"}
      ]
    },
    note:["the odometer only ever climbs; the arrow home can shrink back to nothing",
          "มาตรวัดระยะมีแต่เพิ่ม แต่ลูกศรที่ชี้กลับบ้านหดลงจนเป็นศูนย์ได้"]
  },
  guide:[
    {say:["He rides straight up the soi and stops. Nothing has doubled back, so the two bars match.",
          "เขาขี่ตรงขึ้นซอยแล้วหยุด ยังไม่ได้ย้อนกลับ แถบทั้งสองจึงเท่ากัน"], set:{out:40,back:0}},
    {say:["Now he turns and comes part-way back. The odometer keeps climbing while the arrow home shortens.",
          "ทีนี้เขาเลี้ยวกลับมาบางส่วน มาตรวัดยังเพิ่มขึ้น ขณะที่ลูกศรกลับบ้านสั้นลง"], set:{out:40,back:24}},
    {say:["He rides all the way home. Eighty metres on the odometer, and a displacement of exactly zero.",
          "เขาขี่กลับถึงบ้าน มาตรวัดขึ้นแปดสิบเมตร แต่การกระจัดเป็นศูนย์พอดี"], set:{out:40,back:40}}
  ]
},

{ id:"velocity", x:235, y:150, requires:["displacement"], methods:["M-02"],
  title:["Velocity","ความเร็ว"],
  body:[["Velocity is the rate of change of displacement. Speed is its scalar twin: run that lap again and your average speed is healthy while your average velocity is zero.",
         "Drive the lab with acceleration set to zero and watch the velocity–time trace go flat. A flat trace is the signature of constant velocity, and the rectangle beneath it is the displacement."],
        ["ความเร็วคืออัตราการเปลี่ยนแปลงของการกระจัด ส่วนอัตราเร็วคือคู่แฝดที่เป็นสเกลาร์ วิ่งรอบสนามอีกครั้ง อัตราเร็วเฉลี่ยมีค่าพอควรแต่ความเร็วเฉลี่ยเป็นศูนย์",
         "ลองตั้งความเร่งเป็นศูนย์แล้วดูเส้นกราฟความเร็ว–เวลาแบนราบ เส้นแบนคือลายเซ็นของความเร็วคงที่ และสี่เหลี่ยมใต้เส้นคือการกระจัด"]],
  formula:["v = s / t","v = s / t"], flabel:["Average velocity","ความเร็วเฉลี่ย"],
  viz:"scene",
  vizcfg:{
    anim:true,
    question:["The whole trip averaged 8 m/s. Was he ever doing exactly that?",
              "ทั้งเที่ยวเฉลี่ยได้ 8 ม./วิ เขาเคยขี่ที่ความเร็วนั้นพอดีไหม"],
    ctrls:[
      {k:"v1", lab:["Speed past the first post","ความเร็วช่วงเสาแรก"], min:2, max:22, step:1, def:5, unit:" m/s"},
      {k:"v2", lab:["Speed past the second","ความเร็วช่วงเสาที่สอง"],  min:2, max:22, step:1, def:14, unit:" m/s"},
      {k:"T",  lab:["Watch for","ดูนาน"], min:2, max:8, step:1, def:6, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Average speed","อัตราเร็วเฉลี่ย"], f:function(S){ return fmt2((S.p.v1+S.p.v2)/2)+" m/s"; }},
      {lab:["Speed right now","ความเร็วขณะนี้"], f:function(S){
        var f=Math.min(1,S.t/S.p.T); return fmt2(S.p.v1+(S.p.v2-S.p.v1)*f)+" m/s"; }},
      {lab:["Distance so far","ระยะทางถึงตอนนี้"], f:function(S){
        var t=Math.min(S.t,S.p.T), f=t/S.p.T;
        return fmt2((S.p.v1+(S.p.v1+(S.p.v2-S.p.v1)*f))/2*t)+" m"; }},
      {lab:["Steady or changing?","คงที่หรือกำลังเปลี่ยน"], f:function(S){
        return Math.abs(S.p.v1-S.p.v2)<0.5 ? (L()?"คงที่ — เฉลี่ยคือค่าจริง":"steady — the average is the truth")
          : (L()?"กำลังเปลี่ยน — เฉลี่ยซ่อนรายละเอียด":"changing — the average hides the story"); }}
    ],
    scene:{ kind:"road", span:function(p){ return Math.max(30,(p.v1+p.v2)/2*p.T*1.15); },
      props:function(p){ return [{kind:"post", x:0}, {kind:"post", x:(p.v1+p.v2)/2*p.T}]; },
      cast:function(p,S){
        var t=Math.min(S.t,p.T), f=t/p.T;
        var d=(p.v1+(p.v1+(p.v2-p.v1)*f))/2*t;
        return [{kind:"moto", x:d, lab:[fmt2(p.v1+(p.v2-p.v1)*f)+" m/s", fmt2(p.v1+(p.v2-p.v1)*f)+" ม./วิ"]}];
      },
      marks:function(p){ return [{a:0, b:(p.v1+p.v2)/2*p.T, lab:["between the two posts","ระหว่างเสาสองต้น"]}]; }
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:8, ymin:0,
      xlab:["seconds","วินาที"], ylab:["m/s","ม./วิ"],
      fn:function(x,p){ var f=Math.min(1,x/p.T); return p.v1+(p.v2-p.v1)*f; },
      mark:function(p,S){ return Math.min(S.t,p.T); }
    },
    leader:function(p,S){
      var t=Math.min(S.t,p.T), f=t/p.T;
      return (p.v1+(p.v1+(p.v2-p.v1)*f))/2*t;
    },
    note:["the average is one number; the needle tells a different story at every instant",
          "ค่าเฉลี่ยเป็นเลขตัวเดียว แต่เข็มวัดเล่าเรื่องต่างกันในทุกขณะ"]
  },
  guide:[
    {say:["Both posts see the same speed. Here the average really is what he was doing throughout.",
          "เสาทั้งสองวัดความเร็วเท่ากัน ตรงนี้ค่าเฉลี่ยคือสิ่งที่เขาทำจริงตลอดทาง"], set:{v1:9,v2:9,T:6}},
    {say:["Now he speeds up between the posts. The average still reads 9.5, but he was never doing 9.5 for long.",
          "ทีนี้เขาเร่งขึ้นระหว่างเสา ค่าเฉลี่ยยังอ่านได้ 9.5 แต่เขาแทบไม่ได้ขี่ที่ 9.5 เลย"], set:{v1:5,v2:14,T:6}},
    {say:["Press play and watch the needle sweep past the average without stopping there.",
          "กดเล่นแล้วดูเข็มกวาดผ่านค่าเฉลี่ยไปโดยไม่หยุดที่นั่น"], set:{v1:2,v2:22,T:6}}
  ]
},

{ id:"acceleration", x:100, y:248, requires:["velocity"], methods:["M-02"],
  title:["Acceleration","ความเร่ง"],
  body:[["Acceleration is the rate of change of velocity. It says nothing about which way you are moving — only about how your motion is changing.",
         "A car braking from 30 m/s has negative acceleration while still moving forward. Negative acceleration does not mean reversing; it means the velocity is being driven downward, which may eventually flip its sign."],
        ["ความเร่งคืออัตราการเปลี่ยนแปลงของความเร็ว มันไม่ได้บอกว่าคุณเคลื่อนที่ไปทางไหน บอกแค่ว่าการเคลื่อนที่กำลังเปลี่ยนอย่างไร",
         "รถที่เบรกจาก 30 เมตร/วินาที มีความเร่งเป็นลบทั้งที่ยังวิ่งไปข้างหน้า ความเร่งเป็นลบไม่ได้แปลว่าถอยหลัง แต่แปลว่าความเร็วกำลังถูกกดให้ลดลง ซึ่งสุดท้ายอาจกลับเครื่องหมายได้"]],
  formula:["a = (v − u) / t","a = (v − u) / t"], flabel:["Constant acceleration","ความเร่งคงที่"],
  viz:"scene",
  vizcfg:{
    anim:true,
    question:["The light turns green. How fast is his speed itself changing?",
              "ไฟเขียวแล้ว ความเร็วของเขาเปลี่ยนเร็วแค่ไหน"],
    ctrls:[
      {k:"a", lab:["How hard he opens the throttle","เร่งคันเร่งแรงแค่ไหน"], min:0.5, max:6, step:.5, def:2.5, unit:" m/s²"},
      {k:"T", lab:["Watch for","ดูนาน"], min:2, max:8, step:1, def:6, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Speed now","ความเร็วขณะนี้"], f:function(S){ return fmt2(S.p.a*Math.min(S.t,S.p.T))+" m/s"; }},
      {lab:["Acceleration","ความเร่ง"], f:function(S){
        return fmt2(S.p.a)+(L()?" ม./วิ² · คงที่":" m/s² · constant"); }},
      {lab:["Gained each second","เพิ่มขึ้นทุกวินาที"], f:function(S){
        return fmt2(S.p.a)+(L()?" ม./วิ":" m/s"); }},
      {lab:["Distance from the light","ระยะจากไฟแดง"], f:function(S){
        var t=Math.min(S.t,S.p.T); return fmt2(0.5*S.p.a*t*t)+" m"; }}
    ],
    scene:{ kind:"road", span:function(p){ return Math.max(24,0.5*p.a*p.T*p.T*1.1); },
      props:function(p){ return [{kind:"light", x:0, arg:1}]; },
      cast:function(p,S){
        var t=Math.min(S.t,p.T);
        return [{kind:"moto", x:0.5*p.a*t*t, lab:[fmt2(p.a*t)+" m/s", fmt2(p.a*t)+" ม./วิ"]}];
      },
      marks:function(p){ return []; }
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:8, ymin:0,
      xlab:["seconds since green","วินาทีหลังไฟเขียว"], ylab:["m/s","ม./วิ"],
      fn:function(x,p){ return p.a*Math.min(x,p.T); },
      mark:function(p,S){ return Math.min(S.t,p.T); }
    },
    leader:function(p,S){ var t=Math.min(S.t,p.T); return 0.5*p.a*t*t; },
    note:["the slope of this line IS the acceleration — steeper throttle, steeper line",
          "ความชันของเส้นนี้คือความเร่ง เร่งแรงขึ้น เส้นก็ชันขึ้น"]
  },
  guide:[
    {say:["A gentle pull-away. The speed climbs steadily and the line is a shallow ramp.",
          "ออกตัวนุ่มนวล ความเร็วไต่ขึ้นสม่ำเสมอ เส้นกราฟเป็นทางลาดชันน้อย"], set:{a:1,T:6}},
    {say:["Open the throttle harder. Same shape, steeper line — the acceleration is the slope.",
          "เร่งแรงขึ้น รูปเดิม แต่เส้นชันขึ้น ความเร่งคือความชัน"], set:{a:5,T:6}},
    {say:["Notice the speed keeps rising even though the throttle is held constant. Constant acceleration, not constant speed.",
          "สังเกตว่าความเร็วยังเพิ่มขึ้นแม้จะคงคันเร่งไว้ นั่นคือความเร่งคงที่ ไม่ใช่ความเร็วคงที่"], set:{a:2.5,T:8}}
  ]
},

{ id:"vt-graph", x:370, y:248, requires:["velocity"], methods:["M-04","M-05"],
  title:["The v–t graph","กราฟความเร็ว–เวลา"],
  body:[["The velocity–time graph is the most efficient object in this chapter, because it carries two answers at once. Its slope is the acceleration. The area beneath it is the displacement.",
         "Area below the axis counts as negative. A learner who reports the total shaded region as distance travelled has answered a different question from the one asked — that is trap T-01, and it is everywhere."],
        ["กราฟความเร็ว–เวลาเป็นวัตถุที่คุ้มค่าที่สุดในบทนี้ เพราะให้คำตอบสองอย่างพร้อมกัน ความชันคือความเร่ง และพื้นที่ใต้กราฟคือการกระจัด",
         "พื้นที่ใต้แกนมีค่าเป็นลบ ผู้เรียนที่ตอบพื้นที่แรเงารวมว่าเป็นระยะทาง กำลังตอบคนละคำถามกับที่ถูกถาม นั่นคือกับดัก T-01 ซึ่งพบได้ทั่วไป"]],
  formula:["slope = a   ·   area = s","ความชัน = a   ·   พื้นที่ = s"],
  flabel:["Read both from one figure","อ่านได้สองค่าจากรูปเดียว"],
  viz:"scene",
  vizcfg:{
    anim:true,
    question:["The dashcam plots his speed. What is the shaded area actually measuring?",
              "กล้องหน้ารถวาดกราฟความเร็ว พื้นที่แรเงานั้นวัดอะไรกันแน่"],
    ctrls:[
      {k:"u", lab:["Speed as he sets off","ความเร็วตอนออกตัว"], min:0, max:16, step:1, def:4, unit:" m/s"},
      {k:"a", lab:["Throttle","คันเร่ง"], min:-2, max:5, step:.5, def:2, unit:" m/s²"},
      {k:"T", lab:["Watch for","ดูนาน"], min:2, max:8, step:1, def:6, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Speed now","ความเร็วขณะนี้"], f:function(S){
        var t=Math.min(S.t,S.p.T); return fmt2(Math.max(0,S.p.u+S.p.a*t))+" m/s"; }},
      {lab:["Shaded area","พื้นที่แรเงา"], f:function(S){
        var t=Math.min(S.t,S.p.T); return fmt2(Math.max(0,S.p.u*t+0.5*S.p.a*t*t))+" m"; }},
      {lab:["Distance on the road","ระยะบนถนน"], f:function(S){
        var t=Math.min(S.t,S.p.T); return fmt2(Math.max(0,S.p.u*t+0.5*S.p.a*t*t))+" m"; }},
      {lab:["So the area is","พื้นที่จึงคือ"], f:function(){
        return L()?"ระยะทาง ไม่ใช่ความเร็ว":"a distance, not a speed"; }}
    ],
    scene:{ kind:"road", span:function(p){ return Math.max(30, Math.abs(p.u*p.T+0.5*p.a*p.T*p.T)*1.15); },
      props:function(p){ return [{kind:"post", x:0}]; },
      cast:function(p,S){
        var t=Math.min(S.t,p.T);
        return [{kind:"moto", x:Math.max(0,p.u*t+0.5*p.a*t*t), lab:["", ""]}];
      },
      marks:function(p,S){ return []; }
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:8, ymin:0, fill:true,
      xlab:["seconds","วินาที"], ylab:["m/s","ม./วิ"],
      fn:function(x,p){ return Math.max(0, p.u+p.a*x); },
      upto:function(p,S){ return Math.min(S.t,p.T); },
      mark:function(p,S){ return Math.min(S.t,p.T); }
    },
    leader:function(p,S){ var t=Math.min(S.t,p.T); return Math.max(0,p.u*t+0.5*p.a*t*t); },
    note:["height is how fast, width is how long, so the area can only be how far",
          "ความสูงคือเร็วแค่ไหน ความกว้างคือนานแค่ไหน พื้นที่จึงเป็นได้แค่ไกลแค่ไหน"]
  },
  guide:[
    {say:["Play it. The shaded area grows at exactly the rate the bike covers ground.",
          "กดเล่น พื้นที่แรเงาโตขึ้นด้วยอัตราเดียวกับที่รถวิ่งกินระยะทาง"], set:{u:4,a:2,T:6}},
    {say:["Hold the speed constant. The area is now a plain rectangle: speed times time.",
          "คงความเร็วไว้ พื้นที่กลายเป็นสี่เหลี่ยมผืนผ้าธรรมดา คือความเร็วคูณเวลา"], set:{u:8,a:0,T:6}},
    {say:["Ease off and the line slopes down. The area still measures distance — it just grows more slowly.",
          "ผ่อนคันเร่ง เส้นลาดลง พื้นที่ยังวัดระยะทางอยู่ เพียงแต่โตช้าลง"], set:{u:12,a:-1.5,T:6}}
  ]
},

{ id:"five-equations", x:235, y:346, requires:["acceleration","vt-graph"], methods:["M-01","M-03"],
  title:["The five equations","สมการทั้งห้า"],
  body:[["For constant acceleration there are five equations, and each one is simply missing a different variable. That absence is how you choose.",
         "List what the question gives you and what it asks. One variable will be mentioned nowhere — pick the equation that omits it. This is method M-01, and it converts the whole topic from memory into a two-second lookup."],
        ["สำหรับความเร่งคงที่มีสมการห้าสูตร แต่ละสูตรเพียงแค่ขาดตัวแปรคนละตัว การขาดหายนั้นคือวิธีเลือก",
         "ไล่ดูว่าโจทย์ให้อะไรมาและถามหาอะไร จะมีตัวแปรหนึ่งที่ไม่ถูกกล่าวถึงเลย ให้เลือกสูตรที่ไม่มีตัวแปรนั้น นี่คือวิธี M-01 ซึ่งเปลี่ยนทั้งหัวข้อจากการท่องจำเป็นการเปิดตารางสองวินาที"]],
  formula:["v = u + at   ·   v² = u² + 2as   ·   s = ut + ½at²","v = u + at   ·   v² = u² + 2as   ·   s = ut + ½at²"],
  flabel:["Three of five · the other two omit u and a","สามในห้า · อีกสองสูตรตัด u และ a"],
  viz:"scene",
  vizcfg:{
    question:["A child steps onto the crossing 30 m ahead. Can he stop in time?",
              "มีเด็กก้าวลงทางม้าลายข้างหน้า 30 เมตร เขาเบรกทันไหม"],
    ctrls:[
      {k:"u",  lab:["Speed when he spots the child","ความเร็วตอนเห็นเด็ก"], min:4, max:24, step:1, def:14, unit:" m/s"},
      {k:"b",  lab:["How hard he brakes","เบรกแรงแค่ไหน"], min:1, max:9, step:.5, def:5, unit:" m/s²"},
      {k:"rt", lab:["Reaction time","เวลาตอบสนอง"], min:0, max:1.5, step:.1, def:.8, unit:" s"}
    ],
    readouts:[
      {lab:["Thinking distance","ระยะคิด"], f:function(S){ return fmt2(S.p.u*S.p.rt)+" m"; }},
      {lab:["Braking distance","ระยะเบรก"], f:function(S){
        return fmt2(S.p.u*S.p.u/(2*S.p.b))+" m"; }},
      {lab:["Total stopping distance","ระยะหยุดรวม"], f:function(S){
        return fmt2(S.p.u*S.p.rt + S.p.u*S.p.u/(2*S.p.b))+" m"; }},
      {lab:["Verdict","ผลลัพธ์"], f:function(S){
        var d=S.p.u*S.p.rt + S.p.u*S.p.u/(2*S.p.b);
        return d<=30 ? (L()?"หยุดทัน · เหลือ "+fmt2(30-d)+" ม.":"stops in time · "+fmt2(30-d)+" m to spare")
                     : (L()?"ไม่ทัน · เลยไป "+fmt2(d-30)+" ม.":"too late · overruns by "+fmt2(d-30)+" m"); }}
    ],
    scene:{ kind:"road", span:function(){ return 60; },
      props:function(p){ return [
        {kind:"zebra", x:30, arg:30},
        {kind:"post", x:58}
      ]; },
      cast:function(p){
        var d=p.u*p.rt + p.u*p.u/(2*p.b);
        return [{kind:"moto", x:Math.min(59,d),
                 col: d<=30 ? "var(--good)" : "var(--accent)",
                 lab: d<=30 ? ["stops here","หยุดตรงนี้"] : ["still moving","ยังไม่หยุด"]}];
      },
      marks:function(p){
        var think=p.u*p.rt, brake=p.u*p.u/(2*p.b);
        return [{a:0, b:think, lab:["thinking","ระยะคิด"], col:"var(--ink-faint)"},
                {a:think, b:Math.min(60,think+brake), lab:["braking","ระยะเบรก"], col:"var(--warn)"},
                {a:0, b:30, lab:["to the crossing","ถึงทางม้าลาย"], col:"var(--good)"}];
      }
    },
    instrument:{ kind:"bar",
      ylab:["metres","เมตร"],
      bars:[
        {lab:["Thinking","ระยะคิด"], f:function(p){ return p.u*p.rt; }, col:"faint"},
        {lab:["Braking","ระยะเบรก"], f:function(p){ return p.u*p.u/(2*p.b); }, col:"warn"},
        {lab:["Total needed","ที่ต้องใช้"], f:function(p){ return p.u*p.rt+p.u*p.u/(2*p.b); }, col:"accent"},
        {lab:["Available","ที่มี"], f:function(){ return 30; }, col:"good"}
      ]
    },
    note:["thinking distance doubles with speed, but braking distance quadruples",
          "ระยะคิดเพิ่มเป็นสองเท่าตามความเร็ว แต่ระยะเบรกเพิ่มเป็นสี่เท่า"]
  },
  guide:[
    {say:["At 14 m/s with a firm brake he stops with room to spare.",
          "ที่ 14 ม./วิ พร้อมเบรกหนักแน่น เขาหยุดได้โดยยังเหลือระยะ"], set:{u:14,b:5,rt:.8}},
    {say:["Add just 6 m/s. Thinking distance grew a little; braking distance grew enormously.",
          "เพิ่มอีกแค่ 6 ม./วิ ระยะคิดเพิ่มนิดเดียว แต่ระยะเบรกเพิ่มมหาศาล"], set:{u:20,b:5,rt:.8}},
    {say:["Same speed, but he glances at his phone first. Reaction time alone can decide it.",
          "ความเร็วเท่าเดิม แต่เขาเหลือบดูโทรศัพท์ก่อน เวลาตอบสนองอย่างเดียวก็ตัดสินได้"], set:{u:14,b:5,rt:1.5}}
  ]
},

{ id:"free-fall", x:235, y:444, requires:["five-equations"], methods:["M-06"],
  title:["Free fall","การตกแบบเสรี"],
  body:[["Free fall is the five equations with a fixed acceleration of g. Everything hard about it is bookkeeping, not physics.",
         "Choose a positive direction once and hold it for the entire problem. If up is positive then g is −10 m/s² the whole way, including on the way down. At the very top the velocity is zero but the acceleration is still −10 — trap T-02, and it catches almost everyone once."],
        ["การตกแบบเสรีคือสมการทั้งห้าที่ความเร่งถูกตรึงไว้ที่ g ความยากทั้งหมดอยู่ที่การจัดระเบียบเครื่องหมาย ไม่ใช่ฟิสิกส์",
         "เลือกทิศบวกครั้งเดียวและยึดไว้ตลอดทั้งข้อ ถ้าขึ้นเป็นบวก g ก็เป็น −10 เมตร/วินาที² ตลอด รวมถึงตอนขาลง ที่จุดสูงสุดความเร็วเป็นศูนย์แต่ความเร่งยังเป็น −10 นั่นคือกับดัก T-02 ซึ่งดักเกือบทุกคนอย่างน้อยหนึ่งครั้ง"]],
  formula:["a = g = −10 m/s²  (taking up as +)","a = g = −10 m/s²  (ให้ขึ้นเป็นบวก)"],
  flabel:["One sign convention, held throughout","เครื่องหมายเดียว ใช้ตลอดทั้งข้อ"],
  viz:"scene",
  vizcfg:{
    anim:true,
    question:["A mango and a one-baht coin leave the branch together. Which lands first?",
              "มะม่วงกับเหรียญบาทหลุดจากกิ่งพร้อมกัน อันไหนถึงพื้นก่อน"],
    ctrls:[
      {k:"h",  lab:["Height of the branch","ความสูงของกิ่ง"], min:2, max:20, step:1, def:12, unit:" m"},
      {k:"mm", lab:["Mass of the mango","มวลมะม่วง"], min:.05, max:2, step:.05, def:.4, unit:" kg"},
      {k:"T",  lab:["Watch for","ดูนาน"], min:1, max:3, step:.2, def:2, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Mango has fallen","มะม่วงตกไปแล้ว"], f:function(S){
        return fmt2(Math.min(S.p.h, 4.9*S.t*S.t))+" m"; }},
      {lab:["Coin has fallen","เหรียญตกไปแล้ว"], f:function(S){
        return fmt2(Math.min(S.p.h, 4.9*S.t*S.t))+" m"; }},
      {lab:["Time to land","เวลาถึงพื้น"], f:function(S){
        return fmt2(Math.sqrt(2*S.p.h/9.8))+(L()?" วินาที · ทั้งคู่":" s · both of them"); }},
      {lab:["Does mass matter?","มวลมีผลไหม"], f:function(){
        return L()?"ไม่เลย — ลากแถบมวลดูก็ได้":"not at all — drag the mass slider and see"; }}
    ],
    scene:{ kind:"drop", span:function(p){ return p.h; }, unit:["m","ม."],
      cast:function(p,S){
        var fallen=Math.min(p.h, 4.9*S.t*S.t);
        return [
          {kind:"ball", h:p.h-fallen, lane:0, col:"var(--accent)", arg:9,
           trail:true, from:p.h, lab:["mango","มะม่วง"]},
          {kind:"ball", h:p.h-fallen, lane:1, col:"var(--good)", arg:4,
           trail:true, from:p.h, lab:["coin","เหรียญ"]}
        ];
      },
      marks:function(p){ return [{a:0, b:p.h, lab:["branch height","ความสูงกิ่ง"], col:"var(--ink-faint)"}]; }
    },
    instrument:{ kind:"graph",
      xmin:0, xmax:3, ymin:0,
      xlab:["seconds","วินาที"], ylab:["metres fallen","เมตรที่ตกไป"],
      fn:function(x,p){ return Math.min(p.h, 4.9*x*x); },
      mark:function(p,S){ return S.t; }
    },
    note:["one curve, not two — the heavy one and the light one fall along exactly the same line",
          "มีเส้นเดียว ไม่ใช่สองเส้น ของหนักกับของเบาตกตามเส้นเดียวกันพอดี"]
  },
  guide:[
    {say:["Press play. They leave together and they arrive together.",
          "กดเล่น ทั้งคู่ออกพร้อมกันและถึงพื้นพร้อมกัน"], set:{h:12,mm:.4,T:2}},
    {say:["Make the mango forty times heavier than the coin. Play it again — nothing changes.",
          "ทำให้มะม่วงหนักกว่าเหรียญสี่สิบเท่า เล่นใหม่อีกครั้ง ไม่มีอะไรเปลี่ยน"], set:{h:12,mm:2,T:2}},
    {say:["Raise the branch and both simply take longer, still in step the whole way down.",
          "ยกกิ่งให้สูงขึ้น ทั้งคู่ใช้เวลานานขึ้นเท่ากัน และยังลงมาพร้อมกันตลอดทาง"], set:{h:20,mm:.4,T:2.2}}
  ]
}
],

methods:[
{id:"M-01", name:["Select the equation by what is missing","เลือกสูตรจากตัวแปรที่ขาด"]},
{id:"M-02", name:["Apply v = u + at","ใช้ v = u + at"]},
{id:"M-03", name:["Apply v² = u² + 2as","ใช้ v² = u² + 2as"]},
{id:"M-04", name:["Acceleration as slope of v–t","ความเร่งจากความชันกราฟ v–t"]},
{id:"M-05", name:["Displacement as area under v–t","การกระจัดจากพื้นที่ใต้กราฟ v–t"]},
{id:"M-06", name:["Sign convention in free fall","เครื่องหมายในการตกแบบเสรี"]}
],

traps:{
"T-01":["You reported distance where displacement was asked. Area below the axis subtracts.","คุณตอบระยะทางในขณะที่โจทย์ถามการกระจัด พื้นที่ใต้แกนต้องหักลบ"],
"T-02":["Sign slip. Hold one positive direction for the whole problem, including the downward leg.","เครื่องหมายพลาด ยึดทิศบวกเดียวตลอดทั้งข้อ รวมถึงช่วงขาลง"],
"T-03":["Unit mismatch — convert km/h to m/s before substituting.","หน่วยไม่ตรงกัน แปลง กม./ชม. เป็น ม./วินาที ก่อนแทนค่า"],
"T-04":["You dropped the ½. In s = ut + ½at² the triangle is half the rectangle it sits on.","คุณลืม ½ ในสูตร s = ut + ½at²"]
},

fig:function(f){
  var vmax=Math.max(f.u,f.v,0)*1.2+1, vmin=Math.min(f.u,f.v,0)*1.2-1, W=300,x0=36,y1=16,yh=100;
  var Y=function(v){ return y1+yh-((v-vmin)/(vmax-vmin))*yh; }, yz=Y(0);
  var b='<line x1="'+x0+'" y1="'+y1+'" x2="'+x0+'" y2="'+(y1+yh)+'" stroke="var(--ink-faint)" stroke-width="1.4"/>'+
        '<line x1="'+x0+'" y1="'+yz+'" x2="'+(W-14)+'" y2="'+yz+'" stroke="var(--ink-faint)" stroke-width="1.4"/>';
  if(f.shade) b+='<path d="M'+x0+' '+yz+' L'+x0+' '+Y(f.u)+' L'+(W-40)+' '+Y(f.v)+' L'+(W-40)+' '+yz+' Z" fill="var(--accent)" fill-opacity=".14"/>';
  b+='<line x1="'+x0+'" y1="'+Y(f.u)+'" x2="'+(W-40)+'" y2="'+Y(f.v)+'" stroke="var(--accent)" stroke-width="2.4"/>'+
     '<text x="'+(x0-6)+'" y="'+(Y(f.u)+4)+'" text-anchor="end" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+f.u+'</text>'+
     '<text x="'+(W-36)+'" y="'+(Y(f.v)+4)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+f.v+'</text>'+
     '<text x="'+(W-40)+'" y="'+(yz+14)+'" text-anchor="middle" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+f.T+'s</text>';
  return '<svg viewBox="0 0 '+W+' 140" role="img" aria-label="velocity time graph">'+b+'</svg>';
},

gen:{
"M-02": function(sf){
  var u=ri(2,12), a=ri(2,6), T=ri(3,8), v=u+a*T;
  if(sf==="S-05") return {stem:["A cart leaves at "+u+" m/s and is measured at "+v+" m/s after "+T+" s. Find its acceleration.",
                                "รถเริ่มที่ "+u+" ม./วินาที และวัดได้ "+v+" ม./วินาที หลังผ่านไป "+T+" วินาที จงหาความเร่ง"],
    opts:[{v:fmt(a),ok:1},{v:fmt(v/T),trap:"T-01"},{v:fmt(a*2)},{v:fmt(u/T)}],unit:" m/s²"};
  if(sf==="S-04") return {stem:["A body starts at u and accelerates uniformly at a. Which expression gives its velocity after time t?",
                                "วัตถุเริ่มที่ u และมีความเร่งคงที่ a นิพจน์ใดให้ความเร็วหลังเวลา t"],
    opts:[{v:"u + at",ok:1},{v:"ut + ½at²",trap:"T-04"},{v:"u² + 2at"},{v:"(u+v)t / 2"}],unit:""};
  if(sf==="S-03") return {stem:["A train pulls away from a platform at "+u+" m/s, gaining speed steadily at "+a+" m/s². How fast is it moving "+T+" seconds later?",
                                "รถไฟออกจากชานชาลาที่ "+u+" ม./วินาที และเร่งสม่ำเสมอ "+a+" ม./วินาที² หลังจากนั้น "+T+" วินาที รถไฟเร็วเท่าใด"],
    opts:[{v:fmt(v),ok:1},{v:fmt(u+a)},{v:fmt(a*T),trap:"T-03"},{v:fmt(u*T)}],unit:" m/s"};
  return {stem:["Given u = "+u+" m/s, a = "+a+" m/s² and t = "+T+" s, find v.",
                "กำหนด u = "+u+" ม./วินาที, a = "+a+" ม./วินาที² และ t = "+T+" วินาที จงหา v"],
    opts:[{v:fmt(v),ok:1},{v:fmt(u*a*T)},{v:fmt(u+a)},{v:fmt(a*T)}],unit:" m/s"};
},
"M-03": function(sf){
  var u=ri(0,8), a=ri(2,5), s=ri(10,40), v=Math.sqrt(u*u+2*a*s);
  if(sf==="S-05") return {stem:["A body speeds up from "+u+" m/s to "+fmt(v)+" m/s over "+s+" m. Find its acceleration.",
                                "วัตถุเร่งจาก "+u+" ม./วินาที เป็น "+fmt(v)+" ม./วินาที ในระยะ "+s+" เมตร จงหาความเร่ง"],
    opts:[{v:fmt(a),ok:1},{v:fmt(v/s)},{v:fmt((v-u)/s)},{v:fmt(a*2)}],unit:" m/s²"};
  if(sf==="S-04") return {stem:["Time is not mentioned anywhere in the question. Which relation should you reach for?",
                                "โจทย์ไม่กล่าวถึงเวลาเลย ควรใช้ความสัมพันธ์ใด"],
    opts:[{v:"v² = u² + 2as",ok:1},{v:"v = u + at"},{v:"s = ut + ½at²"},{v:"s = ((u+v)/2)t"}],unit:""};
  return {stem:["A body starts at "+u+" m/s and accelerates at "+a+" m/s² over "+s+" m. Find its final velocity.",
                "วัตถุเริ่มที่ "+u+" ม./วินาที เร่ง "+a+" ม./วินาที² เป็นระยะ "+s+" เมตร จงหาความเร็วปลาย"],
    opts:[{v:fmt(v),ok:1},{v:fmt(u+a*s)},{v:fmt(Math.sqrt(2*a*s))},{v:fmt(u*u+2*a*s)}],unit:" m/s"};
},
"M-04": function(sf){
  var u=ri(0,6), T=ri(3,6), a=ri(2,6), v=u+a*T;
  var q={stem:["A velocity–time trace rises in a straight line from "+u+" m/s to "+v+" m/s over "+T+" s. Find the acceleration.",
               "กราฟความเร็ว–เวลาเป็นเส้นตรงไต่จาก "+u+" ม./วินาที ถึง "+v+" ม./วินาที ใน "+T+" วินาที จงหาความเร่ง"],
    opts:[{v:fmt(a),ok:1},{v:fmt(v/T),trap:"T-01"},{v:fmt((v+u)/T)},{v:fmt(v-u)}],unit:" m/s²"};
  if(sf==="S-02") q.fig=CHAPTER.fig({u:u,v:v,T:T,shade:false});
  return q;
},
"M-05": function(sf){
  var u=ri(2,10), T=ri(3,6), a=pick([0,2,3]), v=u+a*T, s=u*T+0.5*a*T*T;
  var q={stem:["A velocity–time trace runs from "+u+" m/s to "+v+" m/s over "+T+" s. Find the displacement.",
               "กราฟความเร็ว–เวลาไล่จาก "+u+" ม./วินาที ถึง "+v+" ม./วินาที ใน "+T+" วินาที จงหาการกระจัด"],
    opts:[{v:fmt(s),ok:1},{v:fmt(u*T),trap:"T-04"},{v:fmt(v*T)},{v:fmt((v-u)*T)}],unit:" m"};
  if(sf==="S-02") q.fig=CHAPTER.fig({u:u,v:v,T:T,shade:true});
  return q;
},
"M-06": function(sf){
  var u=pick([10,15,20,25]), g=10, tTop=u/g, hMax=u*u/(2*g);
  if(sf==="S-05"||sf==="S-01") return {stem:["A ball is thrown straight up at "+u+" m/s. Taking g = 10 m/s², how high does it rise?",
                                             "ขว้างลูกบอลขึ้นตรงๆ ด้วย "+u+" ม./วินาที ให้ g = 10 ม./วินาที² ลูกบอลขึ้นสูงเท่าใด"],
    opts:[{v:fmt(hMax),ok:1},{v:fmt(u*tTop),trap:"T-04"},{v:fmt(hMax*2),trap:"T-02"},{v:fmt(u/g)}],unit:" m"};
  if(sf==="S-04") return {stem:["A ball is thrown upward. At the very top of its flight, which statement is true?",
                                "ขว้างลูกบอลขึ้น ที่จุดสูงสุดของการเคลื่อนที่ ข้อใดถูกต้อง"],
    opts:[{v:["v = 0, a = −10 m/s²","v = 0, a = −10 ม./วินาที²"],ok:1},
          {v:["v = 0, a = 0","v = 0, a = 0"],trap:"T-02"},
          {v:["v = 0, a = +10 m/s²","v = 0, a = +10 ม./วินาที²"],trap:"T-02"},
          {v:["v is maximum, a = 0","v สูงสุด, a = 0"]}],unit:""};
  return {stem:["A ball is thrown straight up at "+u+" m/s with g = 10 m/s². How long until it returns to the thrower's hand?",
                "ขว้างลูกบอลขึ้นตรงๆ ด้วย "+u+" ม./วินาที ให้ g = 10 ม./วินาที² ใช้เวลาเท่าใดกว่าจะกลับถึงมือ"],
    opts:[{v:fmt(2*tTop),ok:1},{v:fmt(tTop),trap:"T-02"},{v:fmt(u),trap:"T-03"},{v:fmt(hMax)}],unit:" s"};
},
"M-01": function(sf){
  var miss=pick([{m:["displacement s","การกระจัด s"],eq:"v = u + at"},
                 {m:["time t","เวลา t"],eq:"v² = u² + 2as"},
                 {m:["final velocity v","ความเร็วปลาย v"],eq:"s = ut + ½at²"},
                 {m:["acceleration a","ความเร่ง a"],eq:"s = ((u+v)/2)t"}]);
  var all=["v = u + at","v² = u² + 2as","s = ut + ½at²","s = ((u+v)/2)t"], opts=[{v:miss.eq,ok:1}];
  for(var i=0;i<all.length&&opts.length<4;i++) if(all[i]!==miss.eq) opts.push({v:all[i]});
  return {stem:["A question mentions neither "+miss.m[0]+" nor asks for it. Which equation should you select?",
                "โจทย์ไม่กล่าวถึงและไม่ถามหา"+miss.m[1]+" ควรเลือกสมการใด"],opts:opts,unit:""};
}
}
};
