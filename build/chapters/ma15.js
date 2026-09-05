var CHAPTER = {
id:"ma15", num:"15", slug:"calculus", subject:"math",
kicker:["Mathematics · Chapter 15","คณิตศาสตร์ · บทที่ 15"],
title:["Calculus","แคลคูลัส"],
mapTitle:["Slope at a point, area under a curve","ความชันที่จุด พื้นที่ใต้เส้นโค้ง"],
lede:["Differentiation measures how fast something changes right now; integration adds up an accumulation. They look like separate subjects until you notice each undoes the other — which is the single most surprising fact in school mathematics.",
      "การหาอนุพันธ์วัดว่าบางสิ่งเปลี่ยนเร็วแค่ไหน ณ ขณะนี้ ส่วนการหาปริพันธ์รวมการสะสมเข้าด้วยกัน ทั้งสองดูเหมือนคนละวิชาจนกระทั่งเราสังเกตว่าแต่ละอย่างย้อนกลับอีกอย่างได้ ซึ่งเป็นข้อเท็จจริงที่น่าประหลาดใจที่สุดในคณิตศาสตร์ระดับโรงเรียน"],
next:["→ continues in Chapter 16 · Linear Programming","→ ต่อในบทที่ 16 · กำหนดการเชิงเส้น"],

nodes:[
{ id:"limits", x:235, y:52, requires:[], methods:["M-01"],
  title:["Limits","ลิมิต"],
  body:[["A limit asks what a function approaches as x closes in on a value — not what it equals there. The distinction is the whole point: a function can have a perfectly good limit at a point where it is undefined.",
         "Substitute first. If you get a number, that is the limit. If you get 0/0 the expression is indeterminate, not undefined: factor and cancel, then substitute again. Declaring 0/0 to be the answer, or to be zero, is trap T-01."],
        ["ลิมิตถามว่าฟังก์ชันเข้าใกล้อะไรเมื่อ x ขยับเข้าหาค่าหนึ่ง ไม่ใช่ถามว่ามันเท่ากับอะไรที่จุดนั้น ความต่างนี้คือหัวใจทั้งหมด ฟังก์ชันอาจมีลิมิตที่ดีอยู่ ณ จุดที่มันไม่นิยามก็ได้",
         "ให้แทนค่าก่อน ถ้าได้ตัวเลข นั่นคือลิมิต ถ้าได้ 0/0 นิพจน์นั้นอยู่ในรูปไม่กำหนด ไม่ใช่ไม่นิยาม ให้แยกตัวประกอบแล้วตัดทอน จากนั้นแทนค่าใหม่ การประกาศว่า 0/0 คือคำตอบ หรือว่าเท่ากับศูนย์ คือกับดัก T-01"]],
  formula:["lim(x→a) f(x) = L   asks about approach, not arrival","lim(x→a) f(x) = L   ถามถึงการเข้าใกล้ ไม่ใช่การไปถึง"],
  flabel:["0/0 means factor, not stop","0/0 แปลว่าให้แยกตัวประกอบ ไม่ใช่ให้หยุด"],
  viz:"bars",
  vizcfg:{
    title:["CLOSING IN ON A POINT FROM BOTH SIDES","เข้าใกล้จุดหนึ่งจากทั้งสองข้าง"],
    ylab:["value of (x² − a²)/(x − a)","ค่าของ (x² − a²)/(x − a)"],
    ctrls:[
      {k:"a", lab:["Approach a","เข้าใกล้ a"], min:1, max:6, step:1, def:2, unit:""},
      {k:"h", lab:["How close","ใกล้แค่ไหน"], min:.001, max:1, step:.001, def:.5, unit:""}
    ],
    readouts:[
      {lab:["From the left","จากทางซ้าย"], f:function(S){
        var p=S.p, x=p.a-p.h; return fmt2((x*x-p.a*p.a)/(x-p.a)); }},
      {lab:["From the right","จากทางขวา"], f:function(S){
        var p=S.p, x=p.a+p.h; return fmt2((x*x-p.a*p.a)/(x-p.a)); }},
      {lab:["Exactly at x = a","ที่ x = a พอดี"], f:function(){
        return L()?"0/0 — รูปไม่กำหนด ไม่ใช่คำตอบ":"0/0 — indeterminate, not an answer"; }},
      {lab:["The limit","ลิมิต"], f:function(S){ return fmt2(2*S.p.a); }}
    ],
    bars:[
      {lab:["Left of a","ซ้ายของ a"], f:function(p){ var x=p.a-p.h; return (x*x-p.a*p.a)/(x-p.a); }, col:"good"},
      {lab:["Right of a","ขวาของ a"], f:function(p){ var x=p.a+p.h; return (x*x-p.a*p.a)/(x-p.a); }, col:"warn"},
      {lab:["The limit 2a","ลิมิต 2a"], f:function(p){ return 2*p.a; }, col:"accent"}
    ],
    note:["shrink the gap and both bars converge on the red one — without ever reaching x = a","ลดช่องว่างลง แถบทั้งสองลู่เข้าหาแถบสีแดง โดยไม่เคยไปถึง x = a"]
  },
  guide:[
    {say:["Half a unit either side. The two approaches already bracket the answer closely.",
          "ห่างครึ่งหน่วยทั้งสองข้าง การเข้าใกล้ทั้งสองทางขนาบคำตอบไว้ใกล้แล้ว"], set:{a:2,h:.5}},
    {say:["Close the gap to a thousandth. Both bars are now indistinguishable from the limit.",
          "ลดช่องว่างเหลือหนึ่งในพัน แถบทั้งสองแยกไม่ออกจากค่าลิมิตแล้ว"], set:{a:2,h:.001}},
    {say:["The function is genuinely undefined AT x = a. Yet the limit is perfectly well behaved.",
          "ฟังก์ชันไม่นิยามที่ x = a จริงๆ แต่ลิมิตกลับมีพฤติกรรมที่ดีสมบูรณ์"], set:{a:5,h:.01}}
  ] },

{ id:"derivative", x:100, y:150, requires:["limits"], methods:["M-02","M-03"],
  title:["The derivative","อนุพันธ์"],
  body:[["The derivative is the limit of a gradient as the two points merge into one, so f′(x) is the slope of the tangent at x — the instantaneous rate of change. Drag the point in the lab and watch the tangent tilt: where the curve rises the slope is positive, where it falls it is negative, and at a turning point it is exactly zero.",
         "In practice you use rules, not the limit. The power rule drops the exponent to the front and reduces it by one. The product and quotient rules are needed whenever functions are multiplied or divided — differentiating each factor separately and multiplying the results is trap T-02, and it is the single most common error in the topic."],
        ["อนุพันธ์คือลิมิตของความชันเมื่อจุดสองจุดรวมเป็นจุดเดียว ดังนั้น f′(x) คือความชันของเส้นสัมผัสที่ x หรืออัตราการเปลี่ยนแปลงขณะใดขณะหนึ่ง ลองลากจุดในห้องทดลองแล้วดูเส้นสัมผัสเอียง ตรงที่เส้นโค้งขึ้นความชันเป็นบวก ตรงที่ลงเป็นลบ และที่จุดวกกลับเป็นศูนย์พอดี",
         "ในทางปฏิบัติเราใช้กฎ ไม่ใช่ลิมิต กฎยกกำลังดึงเลขชี้กำลังลงมาข้างหน้าแล้วลดลงหนึ่ง กฎผลคูณและผลหารจำเป็นเมื่อฟังก์ชันถูกคูณหรือหารกัน การหาอนุพันธ์แต่ละตัวแยกกันแล้วคูณผลลัพธ์คือกับดัก T-02 และเป็นข้อผิดพลาดที่พบบ่อยที่สุดในเรื่องนี้"]],
  formula:["d/dx (xⁿ) = n x^(n−1)        (uv)′ = u′v + uv′","d/dx (xⁿ) = n x^(n−1)        (uv)′ = u′v + uv′"],
  flabel:["The derivative IS the tangent's slope","อนุพันธ์คือความชันของเส้นสัมผัส"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"a", lab:["Coefficient a  (ax³)","สัมประสิทธิ์ a  (ax³)"], min:-1, max:1, step:.05, def:0.25, unit:""},
      {k:"b", lab:["Coefficient b  (bx²)","สัมประสิทธิ์ b  (bx²)"], min:-3, max:3, step:.1, def:-1, unit:""},
      {k:"c", lab:["Coefficient c  (cx)","สัมประสิทธิ์ c  (cx)"],   min:-4, max:4, step:.1, def:0, unit:""},
      {k:"x", lab:["Point x","จุด x"], min:-3.5, max:3.5, step:.05, def:-1.4, unit:""},
      {k:"show", lab:["0 curve · 1 curve + f′","0 เส้นโค้ง · 1 เส้นโค้ง + f′"], min:0, max:1, step:1, def:0, unit:""}
    ],
    readouts:[
      {lab:["f(x)","f(x)"], f:function(S){ var p=S.p,x=p.x;
        return fmt2(p.a*x*x*x + p.b*x*x + p.c*x); }},
      {lab:["f′(x) = slope","f′(x) = ความชัน"], f:function(S){ var p=S.p,x=p.x;
        return fmt2(3*p.a*x*x + 2*p.b*x + p.c); }},
      {lab:["Behaviour","พฤติกรรม"], f:function(S){ var p=S.p,x=p.x;
        var d=3*p.a*x*x + 2*p.b*x + p.c;
        if(Math.abs(d)<0.06) return L()?"จุดวกกลับ · f′ ≈ 0":"turning point · f′ ≈ 0";
        return d>0 ? (L()?"กำลังเพิ่ม":"increasing") : (L()?"กำลังลด":"decreasing"); }},
      {lab:["f″(x)","f″(x)"], f:function(S){ var p=S.p,x=p.x;
        var dd=6*p.a*x + 2*p.b;
        return fmt2(dd)+" · "+(dd>0?(L()?"หงาย":"concave up"):(L()?"คว่ำ":"concave down")); }}
    ],
    draw:function(S,o){
      var p=S.p;
      var f  = function(x){ return p.a*x*x*x + p.b*x*x + p.c*x; };
      var fp = function(x){ return 3*p.a*x*x + 2*p.b*x + p.c; };
      /* size the window to whatever the curve actually does */
      var lo=1e9, hi=-1e9, i, x;
      for(i=0;i<=140;i++){ x=-3.6+7.2*i/140; var v=f(x); if(v<lo)lo=v; if(v>hi)hi=v;
        if(p.show===1){ var d=fp(x); if(d<lo)lo=d; if(d>hi)hi=d; } }
      var pad=(hi-lo)*0.15+0.4;
      var A=axes(o,{x:56,y:30,w:462,h:242,xmin:-3.6,xmax:3.6,ymin:lo-pad,ymax:hi+pad,
                    title:"f(x) = ax³ + bx² + cx",xlab:"x",ylab:"y",xticks:6,yticks:5});
      /* the derivative curve, when asked for */
      if(p.show===1){
        var dpath="";
        for(i=0;i<=180;i++){ x=-3.6+7.2*i/180;
          dpath+=(i?" L":"M")+A.X(x)+" "+A.Y(fp(x)); }
        o.push('<path d="'+dpath+'" stroke="var(--good)" stroke-width="1.8" fill="none" stroke-dasharray="5 4" opacity="0.85"/>');
        o.push('<text x="'+(A.X(2.55))+'" y="'+(A.Y(fp(2.55))-8)+
               '" fill="var(--good)" font-family="IBM Plex Sans" font-size="10.5">f′(x)</text>');
      }
      /* the curve itself */
      var path="";
      for(i=0;i<=200;i++){ x=-3.6+7.2*i/200;
        path+=(i?" L":"M")+A.X(x)+" "+A.Y(f(x)); }
      o.push('<path d="'+path+'" stroke="var(--ink)" stroke-width="2.2" fill="none"/>');
      /* the tangent at the chosen point */
      var x0=p.x, y0=f(x0), m=fp(x0);
      var xl=x0-1.5, xr=x0+1.5;
      o.push('<line x1="'+A.X(xl)+'" y1="'+A.Y(y0+m*(xl-x0))+
             '" x2="'+A.X(xr)+'" y2="'+A.Y(y0+m*(xr-x0))+
             '" stroke="var(--accent)" stroke-width="2.4"/>');
      o.push('<line x1="'+A.X(x0)+'" y1="'+A.zy+'" x2="'+A.X(x0)+'" y2="'+A.Y(y0)+
             '" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="3 3"/>');
      o.push('<circle cx="'+A.X(x0)+'" cy="'+A.Y(y0)+'" r="5.5" fill="var(--accent)"/>');
      o.push('<text x="'+(A.X(x0)+10)+'" y="'+(A.Y(y0)-10)+
             '" fill="var(--accent)" font-family="IBM Plex Sans" font-size="11">slope = '+fmt2(m)+'</text>');
      /* mark the stationary points, which is where f′ crosses zero */
      var disc=4*p.b*p.b-12*p.a*p.c;
      if(Math.abs(p.a)>0.02 && disc>0){
        [(-2*p.b+Math.sqrt(disc))/(6*p.a), (-2*p.b-Math.sqrt(disc))/(6*p.a)].forEach(function(r){
          if(r>-3.6 && r<3.6)
            o.push('<circle cx="'+A.X(r)+'" cy="'+A.Y(f(r))+
                   '" r="4" fill="none" stroke="var(--warn)" stroke-width="2"/>');
        });
      }
      o.push('<text x="56" y="322" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["amber rings mark stationary points, where f′ = 0","วงเหลืองอำพันคือจุดวิกฤต ที่ซึ่ง f′ = 0"])+'</text>');
    }
  },
  guide:[
    {say:["The red line is the tangent at the marked point. On the way down the slope reads negative.",
          "เส้นสีแดงคือเส้นสัมผัสที่จุดที่ทำเครื่องหมายไว้ ในช่วงขาลงความชันอ่านค่าเป็นลบ"], set:{a:0.25,b:-1,c:0,x:-1.4,show:0}},
    {say:["Slide the point onto an amber ring. The tangent goes flat and f′ reads zero — that is a stationary point.",
          "เลื่อนจุดไปที่วงกลมสีเหลืองอำพัน เส้นสัมผัสจะราบและ f′ อ่านค่าเป็นศูนย์ นั่นคือจุดวิกฤต"], set:{a:0.25,b:-1,c:0,x:0,show:0}},
    {say:["Past the turning point the curve climbs and the slope turns positive. Slope sign tells you the direction of travel.",
          "เลยจุดวกกลับไป เส้นโค้งไต่ขึ้นและความชันกลายเป็นบวก เครื่องหมายความชันบอกทิศทางการเดินทาง"], set:{a:0.25,b:-1,c:0,x:2.2,show:0}},
    {say:["Now switch on the green dashed curve — that is f′ itself. It crosses zero exactly beneath each amber ring.",
          "ทีนี้เปิดเส้นประสีเขียว นั่นคือ f′ เอง มันตัดศูนย์ตรงใต้วงสีเหลืองอำพันแต่ละวงพอดี"], set:{a:0.25,b:-1,c:0,x:2.2,show:1}}
  ]},

{ id:"applications", x:370, y:150, requires:["derivative"], methods:["M-04"],
  title:["Using the derivative","การใช้อนุพันธ์"],
  body:[["Stationary points are where f′(x) = 0. To classify one, check f″: negative means a maximum, positive means a minimum. That pairing feels backwards until you picture the curvature — a concave-down curve holds a peak.",
         "The same derivative also gives the tangent's gradient at any point, and the normal's gradient is its negative reciprocal, −1/m. In kinematics, differentiating displacement gives velocity and differentiating again gives acceleration — the same operation reading a different physical quantity each time."],
        ["จุดวิกฤตคือจุดที่ f′(x) = 0 การจำแนกให้ดู f″ ถ้าเป็นลบคือค่าสูงสุด ถ้าเป็นบวกคือค่าต่ำสุด การจับคู่แบบนี้รู้สึกกลับด้านจนกว่าจะนึกภาพความโค้งออก เส้นโค้งที่คว่ำลงย่อมอุ้มยอดไว้",
         "อนุพันธ์ตัวเดียวกันนี้ยังให้ความชันของเส้นสัมผัสที่จุดใดก็ได้ และความชันของเส้นตั้งฉากคือส่วนกลับที่เป็นลบ −1/m ในจลนศาสตร์ การหาอนุพันธ์ของการกระจัดให้ความเร็ว และหาอีกครั้งให้ความเร่ง เป็นการดำเนินการเดียวกันที่อ่านปริมาณทางฟิสิกส์ต่างกันในแต่ละครั้ง"]],
  formula:["f′ = 0 and f″ < 0  →  maximum        f′ = 0 and f″ > 0  →  minimum","f′ = 0 และ f″ < 0  →  ค่าสูงสุด        f′ = 0 และ f″ > 0  →  ค่าต่ำสุด"],
  flabel:["Negative f″ gives the maximum","f″ ที่เป็นลบให้ค่าสูงสุด"],
  viz:"bars",
  vizcfg:{
    title:["CLASSIFYING A STATIONARY POINT","การจำแนกจุดวิกฤต"],
    ylab:["value","ค่า"],
    ctrls:[
      {k:"a", lab:["Coefficient of x²","สัมประสิทธิ์ของ x²"], min:-3, max:3, step:.5, def:1, unit:""},
      {k:"b", lab:["Coefficient of x","สัมประสิทธิ์ของ x"], min:-8, max:8, step:.5, def:-4, unit:""},
      {k:"x", lab:["Test at x","ทดสอบที่ x"], min:-5, max:5, step:.5, def:2, unit:""}
    ],
    readouts:[
      {lab:["f′(x)","f′(x)"], f:function(S){ return fmt2(2*S.p.a*S.p.x+S.p.b); }},
      {lab:["f″(x)","f″(x)"], f:function(S){ return fmt2(2*S.p.a); }},
      {lab:["Stationary point at","จุดวิกฤตที่"], f:function(S){
        return Math.abs(S.p.a)<1e-9 ? (L()?"ไม่มี — เป็นเส้นตรง":"none — the graph is a line")
                                    : "x = "+fmt2(-S.p.b/(2*S.p.a)); }},
      {lab:["Which kind","ชนิดใด"], f:function(S){
        return S.p.a>0 ? (L()?"ค่าต่ำสุด — f″ เป็นบวก":"a minimum — f″ is positive")
             : S.p.a<0 ? (L()?"ค่าสูงสุด — f″ เป็นลบ":"a maximum — f″ is negative")
             : (L()?"ไม่มีจุดวิกฤต":"no stationary point"); }}
    ],
    bars:[
      {lab:["f′(x)","f′(x)"], f:function(p){ return 2*p.a*p.x+p.b; }, col:"accent"},
      {lab:["f″(x)","f″(x)"], f:function(p){ return 2*p.a; }, col:"good"},
      {lab:["Distance to the turning point","ระยะถึงจุดวกกลับ"], f:function(p){
        return Math.abs(p.a)<1e-9 ? 0 : p.x+p.b/(2*p.a); }, col:"warn"}
    ],
    note:["a NEGATIVE second derivative gives a MAXIMUM — the pairing feels backwards until you picture the curvature","อนุพันธ์อันดับสองที่เป็นลบให้ค่าสูงสุด การจับคู่แบบนี้รู้สึกกลับด้านจนกว่าจะนึกภาพความโค้งออก"]
  } },

{ id:"integration", x:235, y:248, requires:["derivative"], methods:["M-05"],
  title:["Integration","การหาปริพันธ์"],
  body:[["Integration reverses differentiation: raise the exponent by one and divide by the new exponent. It is the power rule run backwards, which is why the two operations undo each other.",
         "An indefinite integral needs + C, because every constant differentiates to zero and so is invisible to the derivative. Omitting it is trap T-03. Note also that the rule fails for n = −1, since dividing by n + 1 would mean dividing by zero; that case integrates to ln|x| instead."],
        ["การหาปริพันธ์ย้อนการหาอนุพันธ์ คือเพิ่มเลขชี้กำลังหนึ่งแล้วหารด้วยเลขชี้กำลังใหม่ มันคือกฎยกกำลังที่เดินถอยหลัง ซึ่งเป็นเหตุผลว่าทำไมสองการดำเนินการนี้จึงย้อนกลับกันได้",
         "ปริพันธ์ไม่จำกัดเขตต้องมี + C เพราะค่าคงที่ทุกตัวหาอนุพันธ์แล้วได้ศูนย์ จึงมองไม่เห็นจากมุมของอนุพันธ์ การลืมมันคือกับดัก T-03 สังเกตด้วยว่ากฎนี้ใช้ไม่ได้เมื่อ n = −1 เพราะการหารด้วย n + 1 จะกลายเป็นหารด้วยศูนย์ กรณีนั้นได้ ln|x| แทน"]],
  formula:["∫xⁿ dx = x^(n+1)/(n+1) + C ,  n ≠ −1","∫xⁿ dx = x^(n+1)/(n+1) + C ,  n ≠ −1"],
  flabel:["+ C, and n = −1 is excluded","+ C และยกเว้น n = −1"],
  viz:"plot",
  vizcfg:{
    title:["THE +C IS A WHOLE FAMILY OF CURVES","+C คือตระกูลเส้นโค้งทั้งตระกูล"],
    xlab:["x","x"], ylab:["F(x)","F(x)"],
    xmin:-3, xmax:3, fill:false,
    fn:function(x,p){ return x*x*x/3 + p.c; },
    mark:function(p){ return p.x; },
    ctrls:[
      {k:"c", lab:["Constant C","ค่าคงที่ C"], min:-6, max:6, step:.5, def:0, unit:""},
      {k:"x", lab:["Point x","จุด x"], min:-2.8, max:2.8, step:.2, def:1, unit:""}
    ],
    readouts:[
      {lab:["F(x) = x³/3 + C","F(x) = x³/3 + C"], f:function(S){
        return fmt2(S.p.x*S.p.x*S.p.x/3+S.p.c); }},
      {lab:["Its derivative F′(x)","อนุพันธ์ F′(x)"], f:function(S){
        return fmt2(S.p.x*S.p.x)+(L()?" · ไม่ขึ้นกับ C เลย":" · completely independent of C"); }},
      {lab:["Why C is invisible","ทำไม C จึงมองไม่เห็น"], f:function(){
        return L()?"ค่าคงที่หาอนุพันธ์แล้วได้ศูนย์":"a constant differentiates to zero"; }},
      {lab:["In a definite integral","ในปริพันธ์จำกัดเขต"], f:function(){
        return L()?"C ตัดกันหมด จึงไม่ต้องเขียน":"the C cancels, so you never write it"; }}
    ],
    note:["slide C and the whole curve rides up and down — but its slope at every x never changes","เลื่อน C แล้วเส้นโค้งทั้งเส้นขึ้นลง แต่ความชันที่ทุกค่า x ไม่เคยเปลี่ยน"]
  },
  guide:[
    {say:["One member of the family, with C = 0.",
          "สมาชิกหนึ่งของตระกูล โดยที่ C = 0"], set:{c:0,x:1}},
    {say:["Raise C and the whole curve lifts bodily. Check the derivative readout — it has not moved.",
          "เพิ่ม C แล้วเส้นโค้งทั้งเส้นยกขึ้นทั้งก้อน ลองดูค่าอนุพันธ์ มันไม่ขยับเลย"], set:{c:5,x:1}},
    {say:["Lower it below the axis. Same slope everywhere, still the same antiderivative.",
          "ลดลงต่ำกว่าแกน ความชันเท่าเดิมทุกจุด และยังเป็นปฏิยานุพันธ์ตัวเดิม"], set:{c:-5,x:1}}
  ] },

{ id:"area", x:235, y:346, requires:["integration"], methods:["M-06"],
  title:["Definite integrals and area","ปริพันธ์จำกัดเขตและพื้นที่"],
  body:[["A definite integral has limits, so the + C cancels and you are left with a number: F(b) − F(a), upper minus lower. Reversing that order flips the sign, which is trap T-04.",
         "That number is the signed area between the curve and the x-axis. Signed matters — area below the axis counts as negative, so a curve that crosses the axis needs splitting at the crossing point and the pieces taken in absolute value. Integrating straight across a root and calling the result the area is the classic mistake here."],
        ["ปริพันธ์จำกัดเขตมีขอบเขต ค่า + C จึงตัดกันหมดและเหลือเป็นตัวเลข F(b) − F(a) คือขอบบนลบขอบล่าง การสลับลำดับจะกลับเครื่องหมาย ซึ่งคือกับดัก T-04",
         "ตัวเลขนั้นคือพื้นที่แบบมีเครื่องหมายระหว่างเส้นโค้งกับแกน x คำว่ามีเครื่องหมายสำคัญมาก พื้นที่ใต้แกนนับเป็นลบ ดังนั้นเส้นโค้งที่ตัดแกนต้องแบ่งที่จุดตัดแล้วคิดค่าสัมบูรณ์ทีละส่วน การอินทิเกรตพรวดข้ามรากแล้วเรียกผลลัพธ์ว่าพื้นที่คือความผิดพลาดคลาสสิกของเรื่องนี้"]],
  formula:["∫ₐᵇ f(x) dx = F(b) − F(a)        below the axis counts negative","∫ₐᵇ f(x) dx = F(b) − F(a)        ใต้แกนนับเป็นลบ"],
  flabel:["Split the integral at every root","แบ่งปริพันธ์ที่รากทุกตัว"],
  viz:"plot",
  vizcfg:{
    title:["SIGNED AREA IS NOT THE SAME AS AREA","พื้นที่แบบมีเครื่องหมายไม่เหมือนพื้นที่"],
    xlab:["x","x"], ylab:["y = x² − c","y = x² − c"],
    xmin:-3, xmax:3, fill:true,
    fn:function(x,p){ return x*x - p.c; },
    mark:function(p){ return p.b; },
    ctrls:[
      {k:"c", lab:["Shift the curve down by","เลื่อนเส้นโค้งลง"], min:0, max:6, step:.5, def:2, unit:""},
      {k:"b", lab:["Upper limit","ขอบบน"], min:-2.8, max:2.8, step:.2, def:2, unit:""}
    ],
    readouts:[
      {lab:["Roots","ราก"], f:function(S){
        return S.p.c<=0 ? (L()?"ไม่ตัดแกน":"the curve never crosses")
                        : "±"+fmt2(Math.sqrt(S.p.c)); }},
      {lab:["Integral from 0 to b","ปริพันธ์จาก 0 ถึง b"], f:function(S){
        var p=S.p; return fmt2(p.b*p.b*p.b/3-p.c*p.b); }},
      {lab:["Does it cross inside?","ตัดแกนภายในช่วงไหม"], f:function(S){
        var p=S.p;
        return (p.c>0 && Math.abs(p.b)>Math.sqrt(p.c))
          ? (L()?"ตัด — ต้องแบ่งที่ราก":"yes — you must split at the root")
          : (L()?"ไม่ตัด — อินทิเกรตรวดเดียวได้":"no — a single integral is safe"); }},
      {lab:["Below the axis counts as","ส่วนใต้แกนนับเป็น"], f:function(){
        return L()?"ลบ — จึงหักล้างส่วนที่อยู่เหนือแกน":"negative — so it cancels area above"; }}
    ],
    note:["when the curve dips below the axis, one integral gives you a difference, not a total","เมื่อเส้นโค้งจมใต้แกน ปริพันธ์เดียวให้ผลต่าง ไม่ใช่ผลรวม"]
  } }
],

methods:[
{id:"M-01", name:["Evaluate a limit","หาค่าลิมิต"]},
{id:"M-02", name:["Differentiate with the power rule","หาอนุพันธ์ด้วยกฎยกกำลัง"]},
{id:"M-03", name:["Apply the product or quotient rule","ใช้กฎผลคูณหรือผลหาร"]},
{id:"M-04", name:["Find and classify stationary points","หาและจำแนกจุดวิกฤต"]},
{id:"M-05", name:["Integrate a polynomial","หาปริพันธ์พหุนาม"]},
{id:"M-06", name:["Evaluate a definite integral or area","หาค่าปริพันธ์จำกัดเขตหรือพื้นที่"]}
],

traps:{
"T-01":["0/0 is indeterminate, not the answer. Factor, cancel, then substitute again.","0/0 อยู่ในรูปไม่กำหนด ไม่ใช่คำตอบ ให้แยกตัวประกอบ ตัดทอน แล้วแทนค่าใหม่"],
"T-02":["(uv)′ is not u′v′. Use u′v + uv′.","(uv)′ ไม่เท่ากับ u′v′ ให้ใช้ u′v + uv′"],
"T-03":["+ C missing from an indefinite integral, or n = −1 handled with the power rule.","ลืม + C ในปริพันธ์ไม่จำกัดเขต หรือใช้กฎยกกำลังกับ n = −1"],
"T-04":["Limits substituted the wrong way round, or area below the axis counted as positive.","แทนขอบเขตกลับด้าน หรือนับพื้นที่ใต้แกนเป็นบวก"]
},

gen:{
"M-01": function(sf){
  var a=pick([2,3,4,5]);
  if(sf==="S-04") return {stem:["Substituting gives 0/0. What does that tell you?","แทนค่าแล้วได้ 0/0 นั่นบอกอะไร"],
    opts:[{v:["It is indeterminate — factor and cancel","อยู่ในรูปไม่กำหนด ให้แยกตัวประกอบและตัดทอน"],ok:1},
          {v:["The limit is 0","ลิมิตเป็น 0"],trap:"T-01"},
          {v:["The limit does not exist","ลิมิตไม่มีอยู่"],trap:"T-01"},
          {v:["The limit is 1","ลิมิตเป็น 1"],trap:"T-01"}],unit:""};
  if(sf==="S-03") return {stem:["Can a function have a limit at a point where it is undefined?",
                                "ฟังก์ชันมีลิมิตที่จุดซึ่งมันไม่นิยามได้หรือไม่"],
    opts:[{v:["Yes — a limit is about approach, not arrival","ได้ ลิมิตพูดถึงการเข้าใกล้ ไม่ใช่การไปถึง"],ok:1},
          {v:["No, never","ไม่ได้ ไม่มีทาง"],trap:"T-01"},
          {v:["Only for polynomials","เฉพาะพหุนาม"]},
          {v:["Only if the function is continuous","เฉพาะเมื่อฟังก์ชันต่อเนื่อง"],trap:"T-01"}],unit:""};
  return {stem:["Evaluate lim(x→"+a+") (x² − "+(a*a)+")/(x − "+a+").",
                "จงหาค่า lim(x→"+a+") (x² − "+(a*a)+")/(x − "+a+")"],
    opts:[{v:String(2*a),ok:1},{v:"0/0",trap:"T-01"},{v:"0",trap:"T-01"},{v:String(a)}],unit:""};
},
"M-02": function(sf){
  var a=pick([2,3,4,5]), n=pick([2,3,4]), b=pick([1,5,7]);
  if(sf==="S-04") return {stem:["What is the derivative of a constant?","อนุพันธ์ของค่าคงที่คืออะไร"],
    opts:[{v:"0",ok:1},{v:["the constant itself","ตัวค่าคงที่เอง"],trap:"T-03"},{v:"1"},{v:"x"}],unit:""};
  if(sf==="S-05") return {stem:["f′(x) = "+(a*n)+"x^"+(n-1)+" came from f(x) = kxⁿ. What was n?",
                                "f′(x) = "+(a*n)+"x^"+(n-1)+" มาจาก f(x) = kxⁿ ค่า n คือเท่าใด"],
    opts:[{v:String(n),ok:1},{v:String(n-1),trap:"T-03"},{v:String(n+1)},{v:String(a*n)}],unit:""};
  return {stem:["Differentiate f(x) = "+a+"x^"+n+" + "+b+"x.","จงหาอนุพันธ์ของ f(x) = "+a+"x^"+n+" + "+b+"x"],
    opts:[{v:(a*n)+"x^"+(n-1)+" + "+b,ok:1},
          {v:(a*n)+"x^"+n+" + "+b,trap:"T-03"},
          {v:a+"x^"+(n-1)+" + "+b},
          {v:(a*n)+"x^"+(n-1)}],unit:""};
},
"M-03": function(sf){
  if(sf==="S-04") return {stem:["Is (uv)′ equal to u′v′?","(uv)′ เท่ากับ u′v′ หรือไม่"],
    opts:[{v:["No — it is u′v + uv′","ไม่ ที่ถูกคือ u′v + uv′"],ok:1},
          {v:["Yes, always","ใช่ เสมอ"],trap:"T-02"},
          {v:["Yes, for polynomials","ใช่ สำหรับพหุนาม"],trap:"T-02"},
          {v:["Only when u = v","เฉพาะเมื่อ u = v"],trap:"T-02"}],unit:""};
  var C=[{f:"x²·(x + 1)",a:"3x² + 2x",w:["2x","2x·1","x² + 2x"]},
         {f:"x³·(2x − 1)",a:"8x³ − 3x²",w:["6x²","6x²·2","2x³"]},
         {f:"(x + 2)(x − 3)",a:"2x − 1",w:["1","2x + 1","x − 1"]}];
  var c=pick(C);
  return {stem:["Differentiate f(x) = "+c.f+".","จงหาอนุพันธ์ของ f(x) = "+c.f],
    opts:[{v:c.a,ok:1},{v:c.w[0],trap:"T-02"},{v:c.w[1],trap:"T-02"},{v:c.w[2]}],unit:""};
},
"M-04": function(sf){
  var b=pick([2,3,4,6]);
  if(sf==="S-04") return {stem:["At a stationary point f″(x) < 0. What kind of point is it?",
                                "ที่จุดวิกฤตหนึ่ง f″(x) < 0 เป็นจุดชนิดใด"],
    opts:[{v:["A maximum","ค่าสูงสุด"],ok:1},{v:["A minimum","ค่าต่ำสุด"],trap:"T-04"},
          {v:["An inflection point","จุดเปลี่ยนเว้า"]},{v:["Cannot be determined","ระบุไม่ได้"]}],unit:""};
  if(sf==="S-03") return {stem:["A tangent has gradient "+b+". What is the gradient of the normal there?",
                                "เส้นสัมผัสมีความชัน "+b+" เส้นตั้งฉากที่จุดนั้นมีความชันเท่าใด"],
    opts:[{v:"−1/"+b,ok:1},{v:"1/"+b,trap:"T-04"},{v:String(-b),trap:"T-04"},{v:String(b)}],unit:""};
  return {stem:["Find the x-coordinate of the stationary point of f(x) = x² − "+(2*b)+"x + 1.",
                "จงหาพิกัด x ของจุดวิกฤตของ f(x) = x² − "+(2*b)+"x + 1"],
    opts:[{v:String(b),ok:1},{v:String(-b),trap:"T-04"},{v:String(2*b),trap:"T-03"},{v:"0"}],unit:""};
},
"M-05": function(sf){
  var a=pick([2,3,6,12]), n=pick([1,2,3]);
  var k=a/(n+1);
  if(sf==="S-04") return {stem:["Why does an indefinite integral need + C?","ทำไมปริพันธ์ไม่จำกัดเขตจึงต้องมี + C"],
    opts:[{v:["Every constant differentiates to zero, so it is invisible","ค่าคงที่ทุกตัวหาอนุพันธ์ได้ศูนย์ จึงมองไม่เห็น"],ok:1},
          {v:["It is just notation","เป็นเพียงสัญกรณ์"],trap:"T-03"},
          {v:["To keep the answer positive","เพื่อให้คำตอบเป็นบวก"],trap:"T-03"},
          {v:["It marks the limits","ใช้บอกขอบเขต"],trap:"T-03"}],unit:""};
  if(sf==="S-05") return {stem:["Why does ∫xⁿ dx fail for n = −1?","ทำไม ∫xⁿ dx จึงใช้ไม่ได้เมื่อ n = −1"],
    opts:[{v:["n + 1 would be zero, so you would divide by zero","n + 1 จะเป็นศูนย์ จึงกลายเป็นหารด้วยศูนย์"],ok:1},
          {v:["x⁻¹ has no integral","x⁻¹ ไม่มีปริพันธ์"],trap:"T-03"},
          {v:["The + C vanishes","+ C หายไป"],trap:"T-03"},
          {v:["It does work","จริงๆ แล้วใช้ได้"],trap:"T-03"}],unit:""};
  return {stem:["Find ∫ "+a+"x^"+n+" dx.","จงหา ∫ "+a+"x^"+n+" dx"],
    opts:[{v:fmt(k)+"x^"+(n+1)+" + C",ok:1},
          {v:fmt(k)+"x^"+(n+1),trap:"T-03"},
          {v:(a*n)+"x^"+(n-1)+" + C",trap:"T-03"},
          {v:a+"x^"+(n+1)+" + C"}],unit:""};
},
"M-06": function(sf){
  var b=pick([2,3,4]);
  var I=b*b*b/3;
  if(sf==="S-04") return {stem:["A curve crosses the x-axis inside your limits. What must you do?",
                                "เส้นโค้งตัดแกน x ภายในขอบเขตที่กำหนด ต้องทำอย่างไร"],
    opts:[{v:["Split at the root and take each piece in absolute value","แบ่งที่รากแล้วคิดค่าสัมบูรณ์ทีละส่วน"],ok:1},
          {v:["Integrate straight across","อินทิเกรตพรวดข้ามไปเลย"],trap:"T-04"},
          {v:["Ignore the negative part","ไม่ต้องสนใจส่วนที่เป็นลบ"],trap:"T-04"},
          {v:["Double the answer","คูณคำตอบด้วยสอง"],trap:"T-04"}],unit:""};
  if(sf==="S-03") return {stem:["Swapping the limits of a definite integral does what?",
                                "การสลับขอบเขตของปริพันธ์จำกัดเขตทำให้เกิดอะไร"],
    opts:[{v:["Flips the sign","กลับเครื่องหมาย"],ok:1},{v:["Nothing","ไม่เกิดอะไร"],trap:"T-04"},
          {v:["Doubles it","ได้สองเท่า"],trap:"T-04"},{v:["Makes it zero","กลายเป็นศูนย์"]}],unit:""};
  return {stem:["Evaluate ∫₀^"+b+" x² dx.","จงหาค่า ∫₀^"+b+" x² dx"],
    opts:[{v:fmt2(I),ok:1},{v:fmt2(-I),trap:"T-04"},
          {v:fmt2(b*b*b),trap:"T-03"},{v:fmt2(2*b)}],unit:""};
}
}
};
