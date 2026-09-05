var CHAPTER = {
id:"ma09", num:"09", slug:"vectors", subject:"math",
kicker:["Mathematics · Chapter 09","คณิตศาสตร์ · บทที่ 9"],
title:["Vectors","เวกเตอร์"],
mapTitle:["Arrows that obey algebra","ลูกศรที่เชื่อฟังพีชคณิต"],
lede:["A vector is the smallest object that knows where it is going. Once direction becomes part of the number, addition stops behaving like ordinary addition, two entirely different products appear, and questions about angles, areas and volumes turn into arithmetic you can do without ever drawing the picture.",
      "เวกเตอร์คือสิ่งที่เล็กที่สุดซึ่งรู้ว่าตัวเองกำลังมุ่งไปทางไหน เมื่อทิศทางกลายเป็นส่วนหนึ่งของตัวเลข การบวกก็ไม่ทำงานแบบเลขธรรมดาอีกต่อไป เกิดผลคูณสองชนิดที่ต่างกันโดยสิ้นเชิง และคำถามเรื่องมุม พื้นที่ และปริมาตร ก็กลายเป็นการคำนวณที่ทำได้โดยไม่ต้องวาดรูปเลย"],
next:["→ continues in Chapter 10 · Complex Numbers","→ ต่อในบทที่ 10 · จำนวนเชิงซ้อน"],

nodes:[
{ id:"basics", x:235, y:52, requires:[], methods:["M-01"],
  title:["Magnitude, direction, and adding arrows","ขนาด ทิศทาง และการบวกลูกศร"],
  body:[["A vector carries two facts at once — a magnitude and a direction — where a scalar carries only the first. Two vectors are equal when both facts agree, so an arrow may be slid anywhere on the page and remain the same vector as long as it is not turned or resized. The zero vector 0 is the one exception: its magnitude is zero and no direction needs to be named for it. Addition is head to tail — slide v until its tail sits on the head of u, and u + v is the arrow from the tail of u to the head of v. Multiplying by a scalar k stretches the arrow by a factor |k| and reverses it when k is negative, which is all that −u means.",
         "Because direction is part of the arithmetic, magnitudes almost never add. |u + v| = |u| + |v| holds only when u and v point exactly the same way; put any angle at all between them and the sum comes out shorter than the two parts. Reading |u + v| as |u| + |v| is trap T-01, and it costs more marks in this chapter than every algebraic slip combined."],
        ["เวกเตอร์บอกข้อมูลสองอย่างพร้อมกัน คือ ขนาด และ ทิศทาง ต่างจากสเกลาร์ที่มีแต่ขนาด เวกเตอร์สองตัวเท่ากันเมื่อข้อมูลทั้งสองตรงกัน ดังนั้นเลื่อนลูกศรไปที่ใดบนหน้ากระดาษก็ยังเป็นเวกเตอร์เดิม ตราบใดที่ไม่หมุนและไม่ยืดหด เวกเตอร์ศูนย์ 0 เป็นข้อยกเว้นเดียว คือมีขนาดเป็นศูนย์และไม่จำเป็นต้องกล่าวถึงทิศทาง การบวกใช้วิธีหัวต่อหาง เลื่อน v จนหางของ v ไปอยู่ที่หัวของ u แล้ว u + v คือลูกศรจากหางของ u ไปหัวของ v การคูณด้วยสเกลาร์ k ยืดลูกศรเป็น |k| เท่า และกลับทิศเมื่อ k เป็นลบ ซึ่งก็คือความหมายทั้งหมดของ −u",
         "เพราะทิศทางเป็นส่วนหนึ่งของการคำนวณ ขนาดจึงแทบไม่เคยบวกกันตรงๆ |u + v| = |u| + |v| เป็นจริงเฉพาะเมื่อ u และ v มีทิศทางเดียวกันพอดี ถ้ามีมุมระหว่างกันแม้เพียงเล็กน้อย ผลบวกก็จะสั้นกว่าผลรวมของสองส่วน การอ่าน |u + v| ว่าเป็น |u| + |v| คือกับดัก T-01 และมันทำคะแนนหายในบทนี้มากกว่าความผิดพลาดทางพีชคณิตทุกแบบรวมกัน"]],
  formula:["u + (−u) = 0        |u + v| ≤ |u| + |v|","u + (−u) = 0        |u + v| ≤ |u| + |v|"],
  flabel:["Equality needs size and direction","การเท่ากันต้องตรงทั้งขนาดและทิศ"],
  viz:"vector" },

{ id:"components", x:100, y:150, requires:["basics"], methods:["M-02"],
  title:["Components, unit vectors, direction cosines","ส่วนประกอบ เวกเตอร์หนึ่งหน่วย โคไซน์แสดงทิศทาง"],
  body:[["Fix a set of axes and every vector becomes a short list of numbers. Write a = a₁i + a₂j + a₃k, where i, j and k are the unit vectors along the positive axes. A vector between two points is terminal minus initial, coordinate by coordinate, so AB from A(1, 2, 2) to B(3, 5, 8) is 2i + 3j + 6k. Magnitude follows from Pythagoras extended into space: |a| = √(a₁² + a₂² + a₃²). Dividing a vector by its own length gives â = a / |a|, the unit vector pointing the same way, which is how you separate a direction from a size and rescale it to whatever length you need.",
         "The three ratios a₁/|a|, a₂/|a|, a₃/|a| are the direction cosines cos α, cos β and cos γ — the cosines of the angles the vector makes with each axis — and they always satisfy cos²α + cos²β + cos²γ = 1. Notice that it is the squares that add to one, not the cosines. Adding the raw cosines, or adding the components themselves to get a length, is trap T-01 wearing a three-dimensional disguise."],
        ["กำหนดแกนพิกัดแล้วเวกเตอร์ทุกตัวจะกลายเป็นชุดตัวเลขสั้นๆ เขียน a = a₁i + a₂j + a₃k โดย i, j และ k คือเวกเตอร์หนึ่งหน่วยตามแกนบวก เวกเตอร์ระหว่างจุดสองจุดคือจุดสิ้นสุดลบจุดเริ่มต้นทีละพิกัด ดังนั้น AB จาก A(1, 2, 2) ไป B(3, 5, 8) คือ 2i + 3j + 6k ขนาดหาได้จากพีทาโกรัสที่ขยายเข้าสู่สามมิติ |a| = √(a₁² + a₂² + a₃²) การหารเวกเตอร์ด้วยความยาวของตัวเองให้ â = a / |a| ซึ่งเป็นเวกเตอร์หนึ่งหน่วยทิศเดียวกัน นี่คือวิธีแยกทิศทางออกจากขนาด แล้วปรับขนาดใหม่เป็นเท่าใดก็ได้ตามต้องการ",
         "อัตราส่วนสามค่า a₁/|a|, a₂/|a|, a₃/|a| คือโคไซน์แสดงทิศทาง cos α, cos β และ cos γ ซึ่งเป็นโคไซน์ของมุมที่เวกเตอร์ทำกับแต่ละแกน และเป็นจริงเสมอว่า cos²α + cos²β + cos²γ = 1 สังเกตว่าสิ่งที่บวกกันได้ 1 คือกำลังสอง ไม่ใช่ตัวโคไซน์เอง การบวกโคไซน์ดิบๆ หรือการบวกส่วนประกอบเพื่อหาความยาว คือกับดัก T-01 ที่มาในคราบสามมิติ"]],
  formula:["|a| = √(a₁² + a₂² + a₃²)        â = a / |a|","|a| = √(a₁² + a₂² + a₃²)        â = a / |a|"],
  flabel:["Squares add to one, not cosines","กำลังสองรวมได้ 1 ไม่ใช่ตัวโคไซน์"],
  viz:"bars",
  vizcfg:{
    title:["A VECTOR SPLIT INTO ITS COMPONENTS","เวกเตอร์ที่แตกเป็นองค์ประกอบ"],
    ylab:["units","หน่วย"],
    ctrls:[
      {k:"m",  lab:["Magnitude","ขนาด"], min:1, max:20, step:.5, def:10, unit:""},
      {k:"th", lab:["Direction","ทิศทาง"], min:0, max:360, step:5, def:35, unit:"°"}
    ],
    readouts:[
      {lab:["x-component","องค์ประกอบ x"], f:function(S){
        return fmt2(S.p.m*Math.cos(S.p.th*Math.PI/180)); }},
      {lab:["y-component","องค์ประกอบ y"], f:function(S){
        return fmt2(S.p.m*Math.sin(S.p.th*Math.PI/180)); }},
      {lab:["Check by Pythagoras","ตรวจด้วยพีทาโกรัส"], f:function(S){
        var p=S.p, x=p.m*Math.cos(p.th*Math.PI/180), y=p.m*Math.sin(p.th*Math.PI/180);
        return fmt2(Math.sqrt(x*x+y*y))+(L()?" · กลับมาเท่าขนาดเดิม":" · back to the magnitude"); }},
      {lab:["Do components add as numbers?","องค์ประกอบบวกกันแบบตัวเลขได้ไหม"], f:function(){
        return L()?"ได้ — นั่นคือเหตุผลที่เราแตกองค์ประกอบ":"yes — that is the entire reason for resolving"; }}
    ],
    bars:[
      {lab:["Magnitude","ขนาด"], f:function(p){ return p.m; }, col:"ink"},
      {lab:["x-component","องค์ประกอบ x"], f:function(p){ return p.m*Math.cos(p.th*Math.PI/180); }, col:"accent"},
      {lab:["y-component","องค์ประกอบ y"], f:function(p){ return p.m*Math.sin(p.th*Math.PI/180); }, col:"good"}
    ],
    note:["a component goes negative when the vector points backwards along that axis","องค์ประกอบเป็นลบเมื่อเวกเตอร์ชี้ย้อนไปตามแกนนั้น"]
  },
  guide:[
    {say:["At 37° both components are positive, and the x one is the larger.",
          "ที่ 37° องค์ประกอบทั้งสองเป็นบวก และตัว x ใหญ่กว่า"], set:{m:10,th:37}},
    {say:["Straight up. The x-component collapses to zero and all the magnitude is vertical.",
          "ชี้ขึ้นตรงๆ องค์ประกอบ x ยุบเป็นศูนย์ และขนาดทั้งหมดอยู่ในแนวดิ่ง"], set:{m:10,th:90}},
    {say:["Point it into the third quadrant and both components go negative together.",
          "ชี้ไปยังควอดรันต์ที่สาม องค์ประกอบทั้งสองเป็นลบพร้อมกัน"], set:{m:10,th:215}}
  ] },

{ id:"dot", x:370, y:150, requires:["basics"], methods:["M-03"],
  title:["The dot product","ผลคูณเชิงสเกลาร์"],
  body:[["The dot product has two faces that always agree: a · b = |a||b| cos θ, and in components a · b = a₁b₁ + a₂b₂ + a₃b₃. Use the component form to compute and the cosine form to interpret. Its output is a single number — a scalar — and the sign of that number reports the angle for free: positive means θ is acute, zero means θ is exactly 90°, and negative means θ is obtuse. The perpendicularity test falls straight out of this, since cos 90° = 0 makes a · b = 0 the definition of a ⊥ b for non-zero vectors. Taking a with itself gives a · a = |a|², which is how magnitude re-enters an argument written entirely in dot products.",
         "Two traps share this node. The first is species confusion: a dot product is a scalar and must never be written carrying an i, j or k, just as a cross product is never a bare number — that is trap T-02. The second is the function itself. The dot product takes cosine, not sine; substituting sin makes a · b vanish for parallel vectors and peak for perpendicular ones, which is exactly backwards, and that is trap T-04."],
        ["ผลคูณเชิงสเกลาร์มีสองหน้าที่สอดคล้องกันเสมอ คือ a · b = |a||b| cos θ และในรูปส่วนประกอบ a · b = a₁b₁ + a₂b₂ + a₃b₃ ใช้รูปส่วนประกอบเพื่อคำนวณ และใช้รูปโคไซน์เพื่อตีความ ผลลัพธ์เป็นจำนวนเดียว คือสเกลาร์ และเครื่องหมายของจำนวนนั้นบอกมุมให้ฟรีๆ ค่าบวกแปลว่า θ เป็นมุมแหลม ค่าศูนย์แปลว่า θ เท่ากับ 90° พอดี และค่าลบแปลว่า θ เป็นมุมป้าน การทดสอบการตั้งฉากจึงตามมาทันที เพราะ cos 90° = 0 ทำให้ a · b = 0 เป็นนิยามของ a ⊥ b สำหรับเวกเตอร์ที่ไม่เป็นศูนย์ และการคูณ a กับตัวเองให้ a · a = |a|² ซึ่งเป็นทางที่ขนาดกลับเข้ามาในการพิสูจน์ที่เขียนด้วยผลคูณเชิงสเกลาร์ล้วนๆ",
         "กับดักสองข้ออยู่ที่โหนดนี้ ข้อแรกคือความสับสนเรื่องชนิด ผลคูณเชิงสเกลาร์เป็นสเกลาร์และต้องไม่มี i, j หรือ k ติดมาด้วยเด็ดขาด เช่นเดียวกับที่ผลคูณเชิงเวกเตอร์ไม่มีทางเป็นตัวเลขเปล่าๆ นั่นคือกับดัก T-02 ข้อที่สองคือตัวฟังก์ชันเอง ผลคูณเชิงสเกลาร์ใช้โคไซน์ ไม่ใช่ไซน์ การใส่ sin แทนจะทำให้ a · b เป็นศูนย์เมื่อเวกเตอร์ขนานกัน และมีค่าสูงสุดเมื่อตั้งฉาก ซึ่งกลับด้านกันพอดี นั่นคือกับดัก T-04"]],
  formula:["a · b = |a||b| cos θ = a₁b₁ + a₂b₂ + a₃b₃","a · b = |a||b| cos θ = a₁b₁ + a₂b₂ + a₃b₃"],
  flabel:["A number, never an arrow","เป็นจำนวน ไม่ใช่ลูกศร"],
  viz:"vector",
  guide:[
    {say:["Start perpendicular. A runs along the axis and B stands at 90° to it, so cos θ = 0 and the dot product is exactly zero — 12 × 9 × 0. Read the resultant: R = 15, and 15² = 12² + 9². When the dot product vanishes, Pythagoras is restored.",
          "เริ่มที่การตั้งฉาก A วางตามแกนและ B ตั้งฉาก 90° กับมัน ดังนั้น cos θ = 0 และผลคูณเชิงสเกลาร์เป็นศูนย์พอดี คือ 12 × 9 × 0 ดูค่าผลลัพธ์ R = 15 และ 15² = 12² + 9² เมื่อผลคูณเชิงสเกลาร์เป็นศูนย์ พีทาโกรัสก็กลับมาใช้ได้"], set:{A:12,tA:0,B:12,tB:90}},
    {say:["Now swing B onto A. With θ = 0 the cosine is 1 and the dot product hits its maximum, 12 × 9 = 108. This is the only arrangement in which magnitudes really do add: R = 21 = 12 + 9. Every other angle gives a shorter resultant.",
          "ตอนนี้หมุน B ให้ทับ A เมื่อ θ = 0 โคไซน์เป็น 1 และผลคูณเชิงสเกลาร์ขึ้นถึงค่าสูงสุด 12 × 9 = 108 นี่เป็นการจัดวางแบบเดียวที่ขนาดบวกกันได้จริง R = 21 = 12 + 9 มุมอื่นทุกมุมให้ผลลัพธ์ที่สั้นกว่านี้"], set:{A:12,tA:0,B:9,tB:0}},
    {say:["Open the angle past 90° to 140°. The cosine has gone negative, so the dot product is negative too, about −83. The resultant collapses to under 8 — a shrinking resultant is the visible signature of an obtuse angle.",
          "เปิดมุมให้เกิน 90° ไปที่ 140° โคไซน์กลายเป็นลบ ผลคูณเชิงสเกลาร์จึงเป็นลบด้วย ราว −83 ผลลัพธ์หดลงเหลือไม่ถึง 8 การที่ผลลัพธ์หดสั้นคือร่องรอยที่มองเห็นได้ของมุมป้าน"], set:{A:12,tA:0,B:9,tB:140}},
    {say:["Push to 180° and the dot product bottoms out at −108. Since R² = |a|² + |b|² + 2(a · b), you can always read the dot product off the picture: a · b = (R² − 144 − 81) / 2, which here gives (9 − 225) / 2 = −108.",
          "ดันไปถึง 180° ผลคูณเชิงสเกลาร์ลงต่ำสุดที่ −108 เนื่องจาก R² = |a|² + |b|² + 2(a · b) เราจึงอ่านผลคูณเชิงสเกลาร์จากภาพได้เสมอ a · b = (R² − 144 − 81) / 2 ซึ่งในที่นี้ได้ (9 − 225) / 2 = −108"], set:{A:12,tA:0,B:9,tB:180}}
  ]},

{ id:"cross", x:235, y:248, requires:["components","dot"], methods:["M-04"],
  title:["The cross product","ผลคูณเชิงเวกเตอร์"],
  body:[["The cross product exists in three dimensions only, and it is easiest to remember as a determinant with i, j, k across the top row and the components of u and v on the two rows beneath. Expanding along that top row gives u × v = (u₂v₃ − u₃v₂)i − (u₁v₃ − u₃v₁)j + (u₁v₂ − u₂v₁)k, where the minus sign attached to the j term is part of the determinant expansion and not an optional decoration. Its magnitude is |u × v| = |u||v| sin θ, and its direction is perpendicular to both u and v — which is precisely why it is the standard tool for producing a normal to a plane.",
         "Order matters here in a way it never did for the dot product. Swapping the two rows of a determinant flips its sign, so u × v = −v × u; writing them as equal is trap T-03. Two consequences follow immediately: u × u = 0 for every vector, and u · (u × v) = 0 always, since the cross product is perpendicular to its own factors. And keep the species straight — this product returns a vector while the dot product returns a scalar, which is trap T-02."],
        ["ผลคูณเชิงเวกเตอร์มีเฉพาะในสามมิติ และจำง่ายที่สุดในรูปดีเทอร์มิแนนต์ที่มี i, j, k อยู่แถวบน และส่วนประกอบของ u กับ v อยู่สองแถวล่าง กระจายตามแถวบนจะได้ u × v = (u₂v₃ − u₃v₂)i − (u₁v₃ − u₃v₁)j + (u₁v₂ − u₂v₁)k โดยเครื่องหมายลบหน้าพจน์ j เป็นส่วนหนึ่งของการกระจายดีเทอร์มิแนนต์ ไม่ใช่ของประดับที่จะใส่หรือไม่ใส่ก็ได้ ขนาดของมันคือ |u × v| = |u||v| sin θ และทิศทางตั้งฉากกับทั้ง u และ v ซึ่งเป็นเหตุผลตรงๆ ที่มันเป็นเครื่องมือมาตรฐานสำหรับหาเวกเตอร์ตั้งฉากกับระนาบ",
         "ลำดับสำคัญในแบบที่ไม่เคยสำคัญกับผลคูณเชิงสเกลาร์ การสลับสองแถวของดีเทอร์มิแนนต์ทำให้เครื่องหมายกลับ ดังนั้น u × v = −v × u การเขียนว่าทั้งสองเท่ากันคือกับดัก T-03 ผลที่ตามมาทันทีมีสองข้อ คือ u × u = 0 สำหรับทุกเวกเตอร์ และ u · (u × v) = 0 เสมอ เพราะผลคูณเชิงเวกเตอร์ตั้งฉากกับตัวประกอบของมันเอง และอย่าสับสนเรื่องชนิด ผลคูณนี้ให้เวกเตอร์ ส่วนผลคูณเชิงสเกลาร์ให้สเกลาร์ นั่นคือกับดัก T-02"]],
  formula:["|u × v| = |u||v| sin θ        u × v = −v × u","|u × v| = |u||v| sin θ        u × v = −v × u"],
  flabel:["An arrow, and the order decides its sign","เป็นลูกศร และลำดับกำหนดเครื่องหมาย"],
  viz:"bars",
  vizcfg:{
    title:["DOT AND CROSS PULL IN OPPOSITE DIRECTIONS","ผลคูณจุดกับผลคูณไขว้ดึงกันคนละทาง"],
    ylab:["value","ค่า"],
    ctrls:[
      {k:"A",  lab:["|A|","|A|"], min:1, max:10, step:.5, def:4, unit:""},
      {k:"B",  lab:["|B|","|B|"], min:1, max:10, step:.5, def:5, unit:""},
      {k:"th", lab:["Angle between them","มุมระหว่างกัน"], min:0, max:180, step:5, def:60, unit:"°"}
    ],
    readouts:[
      {lab:["Dot product A·B","ผลคูณจุด A·B"], f:function(S){
        return fmt2(S.p.A*S.p.B*Math.cos(S.p.th*Math.PI/180)); }},
      {lab:["Cross magnitude |A×B|","ขนาดผลคูณไขว้ |A×B|"], f:function(S){
        return fmt2(S.p.A*S.p.B*Math.sin(S.p.th*Math.PI/180)); }},
      {lab:["At 0°","ที่ 0°"], f:function(){
        return L()?"จุดสูงสุด · ไขว้เป็นศูนย์":"dot is maximal, cross is zero"; }},
      {lab:["At 90°","ที่ 90°"], f:function(){
        return L()?"จุดเป็นศูนย์ · ไขว้สูงสุด":"dot is zero, cross is maximal"; }}
    ],
    bars:[
      {lab:["Dot A·B","จุด A·B"], f:function(p){ return p.A*p.B*Math.cos(p.th*Math.PI/180); }, col:"accent"},
      {lab:["Cross |A×B|","ไขว้ |A×B|"], f:function(p){ return p.A*p.B*Math.sin(p.th*Math.PI/180); }, col:"good"},
      {lab:["|A||B|","|A||B|"], f:function(p){ return p.A*p.B; }, col:"faint"}
    ],
    note:["one uses cosine and the other sine, so whenever one peaks the other vanishes","ตัวหนึ่งใช้โคไซน์ อีกตัวใช้ไซน์ เมื่อตัวหนึ่งสูงสุด อีกตัวจึงหายไป"]
  },
  guide:[
    {say:["Parallel vectors. The dot product is at its maximum and the cross product is exactly zero.",
          "เวกเตอร์ขนานกัน ผลคูณจุดสูงสุดและผลคูณไขว้เป็นศูนย์พอดี"], set:{A:4,B:5,th:0}},
    {say:["Perpendicular now. The bars have swapped roles completely.",
          "ตอนนี้ตั้งฉากกัน แถบทั้งสองสลับบทบาทกันหมด"], set:{A:4,B:5,th:90}},
    {say:["Antiparallel. The dot product goes negative while the cross product returns to zero.",
          "ขนานกันแต่สวนทาง ผลคูณจุดเป็นลบ ขณะที่ผลคูณไขว้กลับมาเป็นศูนย์"], set:{A:4,B:5,th:180}}
  ] },

{ id:"applications", x:235, y:346, requires:["cross"], methods:["M-05","M-06"],
  title:["Areas, volumes, projections","พื้นที่ ปริมาตร โปรเจกชัน"],
  body:[["The whole chapter pays off here. A parallelogram with adjacent sides u and v has base |u| and height |v| sin θ, so its area is exactly |u × v| — and a triangle on the same two sides is half of that. Stack a third vector r on top and the parallelepiped they span has volume |u · (v × r)|, the scalar triple product, which is the absolute value of the determinant of the 3 × 3 matrix built from the three vectors. In two dimensions the same determinant collapses to the neat |u₁v₂ − u₂v₁| for a parallelogram, so plane-geometry area questions never need a base or a height to be found first. Projection runs the other way: Proj_v u = ((u · v) / |v|²) v resolves u into the part that lies along v.",
         "The two products divide the work cleanly, and swapping them is where marks go. Anything about area or volume is built on sines and the cross product; anything about angle, perpendicularity or projection is built on cosines and the dot product. Reaching for cosine when an area is asked for is trap T-04. And the triple product must finish as a scalar with an absolute value taken, because interchanging any two of the three vectors flips its sign while the box itself has not moved — that sign flip is trap T-03."],
        ["ทั้งบทมาออกดอกออกผลที่ตรงนี้ รูปสี่เหลี่ยมด้านขนานที่มีด้านประชิดเป็น u และ v มีฐาน |u| และสูง |v| sin θ พื้นที่จึงเท่ากับ |u × v| พอดี และรูปสามเหลี่ยมบนสองด้านเดียวกันมีพื้นที่ครึ่งหนึ่งของนั้น เพิ่มเวกเตอร์ที่สาม r เข้าไป ทรงสี่เหลี่ยมด้านขนานที่เกิดขึ้นมีปริมาตร |u · (v × r)| ซึ่งคือผลคูณสเกลาร์สามตัว และเท่ากับค่าสัมบูรณ์ของดีเทอร์มิแนนต์ของเมทริกซ์ 3 × 3 ที่สร้างจากเวกเตอร์ทั้งสาม ในสองมิติดีเทอร์มิแนนต์เดียวกันยุบเหลือ |u₁v₂ − u₂v₁| สำหรับสี่เหลี่ยมด้านขนาน โจทย์พื้นที่ในระนาบจึงไม่ต้องหาฐานหรือความสูงก่อนเลย ส่วนโปรเจกชันวิ่งไปอีกทาง Proj_v u = ((u · v) / |v|²) v แยกส่วนของ u ที่อยู่ตามแนว v ออกมา",
         "ผลคูณสองชนิดแบ่งงานกันชัดเจน และการสลับกันคือจุดที่คะแนนหาย เรื่องพื้นที่และปริมาตรสร้างบนไซน์และผลคูณเชิงเวกเตอร์ ส่วนเรื่องมุม การตั้งฉาก และโปรเจกชัน สร้างบนโคไซน์และผลคูณเชิงสเกลาร์ การคว้าโคไซน์มาใช้ตอนโจทย์ถามพื้นที่คือกับดัก T-04 และผลคูณสเกลาร์สามตัวต้องจบเป็นสเกลาร์ที่ใส่ค่าสัมบูรณ์แล้ว เพราะการสลับเวกเตอร์สองในสามตัวทำให้เครื่องหมายกลับทั้งที่กล่องยังไม่ขยับไปไหน การกลับเครื่องหมายนั้นคือกับดัก T-03"]],
  formula:["Area = |u × v|        Volume = |u · (v × r)|","พื้นที่ = |u × v|        ปริมาตร = |u · (v × r)|"],
  flabel:["Sine for size, cosine for alignment","ไซน์ไว้หาขนาด โคไซน์ไว้ดูแนว"],
  viz:"bars",
  vizcfg:{
    title:["AREAS AND PROJECTIONS FROM TWO VECTORS","พื้นที่และการฉายจากเวกเตอร์สองตัว"],
    ylab:["value","ค่า"],
    ctrls:[
      {k:"A",  lab:["|A|","|A|"], min:1, max:10, step:.5, def:6, unit:""},
      {k:"B",  lab:["|B|","|B|"], min:1, max:10, step:.5, def:4, unit:""},
      {k:"th", lab:["Angle between them","มุมระหว่างกัน"], min:5, max:175, step:5, def:50, unit:"°"}
    ],
    readouts:[
      {lab:["Parallelogram area","พื้นที่สี่เหลี่ยมด้านขนาน"], f:function(S){
        return fmt2(S.p.A*S.p.B*Math.sin(S.p.th*Math.PI/180)); }},
      {lab:["Triangle area","พื้นที่สามเหลี่ยม"], f:function(S){
        return fmt2(0.5*S.p.A*S.p.B*Math.sin(S.p.th*Math.PI/180)); }},
      {lab:["Projection of A onto B","การฉาย A ลงบน B"], f:function(S){
        return fmt2(S.p.A*Math.cos(S.p.th*Math.PI/180)); }},
      {lab:["When is the area zero?","พื้นที่เป็นศูนย์เมื่อใด"], f:function(){
        return L()?"เมื่อเวกเตอร์ขนานกัน — ไม่มีรูปให้วัด":"when the vectors are parallel — there is no shape left"; }}
    ],
    bars:[
      {lab:["Parallelogram","สี่เหลี่ยมด้านขนาน"], f:function(p){ return p.A*p.B*Math.sin(p.th*Math.PI/180); }, col:"accent"},
      {lab:["Triangle","สามเหลี่ยม"], f:function(p){ return 0.5*p.A*p.B*Math.sin(p.th*Math.PI/180); }, col:"good"},
      {lab:["Projection A on B","การฉาย A บน B"], f:function(p){ return p.A*Math.cos(p.th*Math.PI/180); }, col:"warn"}
    ],
    note:["the triangle is always exactly half the parallelogram — the two bars keep that ratio forever","สามเหลี่ยมเป็นครึ่งหนึ่งของสี่เหลี่ยมด้านขนานเสมอ สองแถบนี้รักษาอัตราส่วนนั้นตลอด"]
  } }
],

methods:[
{id:"M-01", name:["Add, subtract and scale vectors geometrically","บวก ลบ และคูณสเกลาร์เชิงเรขาคณิต"]},
{id:"M-02", name:["Work in components — magnitude and unit vectors","ทำงานในรูปส่วนประกอบ ขนาดและเวกเตอร์หนึ่งหน่วย"]},
{id:"M-03", name:["Compute a dot product and the angle between vectors","หาผลคูณเชิงสเกลาร์และมุมระหว่างเวกเตอร์"]},
{id:"M-04", name:["Compute a cross product as a determinant","หาผลคูณเชิงเวกเตอร์ด้วยดีเทอร์มิแนนต์"]},
{id:"M-05", name:["Find areas with the cross product","หาพื้นที่ด้วยผลคูณเชิงเวกเตอร์"]},
{id:"M-06", name:["Find volumes and projections","หาปริมาตรและโปรเจกชัน"]}
],

traps:{
"T-01":["Magnitudes do not add. |u + v| = |u| + |v| only for parallel vectors — add components, not lengths.","ขนาดบวกกันตรงๆ ไม่ได้ |u + v| = |u| + |v| เฉพาะเวกเตอร์ที่ขนานทิศเดียวกัน ให้บวกส่วนประกอบ ไม่ใช่บวกความยาว"],
"T-02":["A dot product is a scalar; a cross product is a vector. Never hand back the wrong species.","ผลคูณเชิงสเกลาร์ให้สเกลาร์ ผลคูณเชิงเวกเตอร์ให้เวกเตอร์ อย่าตอบผิดชนิด"],
"T-03":["Order matters for the cross product: u × v = −v × u. Swapping two rows flips the determinant's sign.","ลำดับสำคัญสำหรับผลคูณเชิงเวกเตอร์ u × v = −v × u การสลับสองแถวทำให้เครื่องหมายดีเทอร์มิแนนต์กลับ"],
"T-04":["The dot product takes cos θ; the cross product's magnitude takes sin θ. Swapping them inverts the answer.","ผลคูณเชิงสเกลาร์ใช้ cos θ ส่วนขนาดของผลคูณเชิงเวกเตอร์ใช้ sin θ การสลับกันทำให้คำตอบกลับด้าน"]
},

gen:{
"M-01": function(sf){
  if(sf==="S-04") return {stem:["For non-zero vectors u and v, when is |u + v| = |u| + |v| true?",
                                "สำหรับเวกเตอร์ u และ v ที่ไม่เป็นเวกเตอร์ศูนย์ |u + v| = |u| + |v| เป็นจริงเมื่อใด"],
    opts:[{v:["Only when u and v point in the same direction","เมื่อ u และ v มีทิศทางเดียวกันเท่านั้น"],ok:1},
          {v:["Always — magnitudes simply add","เป็นจริงเสมอ เพราะขนาดบวกกันตรงๆ"],trap:"T-01"},
          {v:["Whenever u is perpendicular to v","เมื่อใดก็ตามที่ u ตั้งฉากกับ v"],trap:"T-01"},
          {v:["Only when u = −v","เมื่อ u = −v เท่านั้น"]}],unit:""};
  if(sf==="S-05"){
    var g=pick([{m:5,k:4},{m:3,k:6},{m:7,k:3},{m:6,k:5}]);
    return {stem:["A vector u has magnitude "+g.m+". The vector ku has magnitude "+(g.m*g.k)+" and points the opposite way to u. Find k.",
                  "เวกเตอร์ u มีขนาด "+g.m+" เวกเตอร์ ku มีขนาด "+(g.m*g.k)+" และมีทิศทางตรงข้ามกับ u จงหา k"],
      opts:[{v:"−"+g.k,ok:1},{v:String(g.k)},{v:"−"+(g.m*g.k-g.m),trap:"T-01"},{v:String(g.m*g.k*g.m)}],unit:""};
  }
  if(sf==="S-03"){
    var t=pick([{a:3,b:4,c:5},{a:6,b:8,c:10},{a:5,b:12,c:13},{a:9,b:12,c:15}]);
    return {stem:["A surveyor walks "+t.a+" km due east and then "+t.b+" km due north. How far is she from her starting point?",
                  "นักสำรวจเดินไปทางทิศตะวันออก "+t.a+" กม. แล้วเดินขึ้นเหนือต่ออีก "+t.b+" กม. เธออยู่ห่างจากจุดเริ่มต้นเท่าใด"],
      opts:[{v:String(t.c),ok:1},{v:String(t.a+t.b),trap:"T-01"},{v:String(t.c*2)},{v:String(t.b-t.a)}],unit:" km"};
  }
  var p=pick([14,18,20,25]), q=pick([6,8,11]);
  return {stem:["u points due north with magnitude "+p+" and v points due south with magnitude "+q+". Find |u + v|.",
                "u ชี้ไปทางทิศเหนือมีขนาด "+p+" และ v ชี้ไปทางทิศใต้มีขนาด "+q+" จงหา |u + v|"],
    opts:[{v:String(p-q),ok:1},{v:String(p+q),trap:"T-01"},{v:String(p)},{v:String(q)}],unit:""};
},
"M-02": function(sf){
  if(sf==="S-04") return {stem:["cos α, cos β and cos γ are the direction cosines of a non-zero vector in space. Which identity always holds?",
                                "cos α, cos β และ cos γ เป็นโคไซน์แสดงทิศทางของเวกเตอร์ในสามมิติที่ไม่เป็นศูนย์ เอกลักษณ์ใดเป็นจริงเสมอ"],
    opts:[{v:"cos²α + cos²β + cos²γ = 1",ok:1},
          {v:"cos α + cos β + cos γ = 1",trap:"T-01"},
          {v:"cos²α + cos²β + cos²γ = 0"},
          {v:"cos α · cos β · cos γ = 1"}],unit:""};
  if(sf==="S-05") return {stem:["û = (1/9)(p i + 4j + 8k) is a unit vector and p > 0. Find p.",
                                "û = (1/9)(p i + 4j + 8k) เป็นเวกเตอร์หนึ่งหน่วย และ p > 0 จงหา p"],
    opts:[{v:"1",ok:1},{v:"−3",trap:"T-01"},{v:"3"},{v:"9"}],unit:""};
  if(sf==="S-03") return {stem:["A drone flies in a straight line from A(1, 2, 2) to B(3, 5, 8), distances in metres. How long is the flight path?",
                                "โดรนบินเป็นเส้นตรงจาก A(1, 2, 2) ไป B(3, 5, 8) ระยะเป็นเมตร เส้นทางบินยาวเท่าใด"],
    opts:[{v:"7",ok:1},{v:"11",trap:"T-01"},{v:"49"},{v:"9"}],unit:" m"};
  var C=pick([{d:"2i + 3j + 6k",m:"7", s:"11",q:"49", o:"5"},
              {d:"i + 2j + 2k", m:"3", s:"5", q:"9",  o:"7"},
              {d:"4i + 4j + 7k",m:"9", s:"15",q:"81", o:"11"},
              {d:"3i + 4j + 12k",m:"13",s:"19",q:"169",o:"7"}]);
  return {stem:["Find the magnitude of a = "+C.d+".","จงหาขนาดของ a = "+C.d],
    opts:[{v:C.m,ok:1},{v:C.s,trap:"T-01"},{v:C.q},{v:C.o}],unit:""};
},
"M-03": function(sf){
  if(sf==="S-04") return {stem:["u and v are non-zero and u · v = 0. What does that tell you?",
                                "u และ v ไม่เป็นเวกเตอร์ศูนย์ และ u · v = 0 ข้อนี้บอกอะไรเรา"],
    opts:[{v:["θ = 90°, so u is perpendicular to v","θ = 90° ดังนั้น u ตั้งฉากกับ v"],ok:1},
          {v:["θ = 0°, so u is parallel to v","θ = 0° ดังนั้น u ขนานกับ v"],trap:"T-04"},
          {v:["u × v = 0 as well","u × v = 0 ด้วยเช่นกัน"],trap:"T-02"},
          {v:["u = v","u = v"]}],unit:""};
  if(sf==="S-05"){
    var g=pick([{p:4,q:6,d:12,ang:"60°",bad:"30°"},{p:5,q:8,d:20,ang:"60°",bad:"30°"},
                {p:3,q:10,d:15,ang:"60°",bad:"30°"},{p:6,q:6,d:18,ang:"60°",bad:"30°"}]);
    return {stem:["u · v = "+g.d+", |u| = "+g.p+" and |v| = "+g.q+". Find the angle θ between them.",
                  "u · v = "+g.d+", |u| = "+g.p+" และ |v| = "+g.q+" จงหามุม θ ระหว่างเวกเตอร์ทั้งสอง"],
      opts:[{v:g.ang,ok:1},{v:g.bad,trap:"T-04"},{v:"45°"},{v:"120°"}],unit:""};
  }
  if(sf==="S-03") return {stem:["A robot arm travels along u = 5i + 12j while a fixed guide rail lies along v = 12i − 5j. Compute u · v and say what it means.",
                                "แขนกลเคลื่อนที่ตามแนว u = 5i + 12j ขณะที่รางนำที่ยึดอยู่กับที่วางตามแนว v = 12i − 5j จงหา u · v และบอกความหมาย"],
    opts:[{v:["0 — the arm moves perpendicular to the rail","0 แขนกลเคลื่อนที่ในแนวตั้งฉากกับราง"],ok:1},
          {v:["0 — the arm moves along the rail","0 แขนกลเคลื่อนที่ไปตามแนวราง"],trap:"T-04"},
          {v:["0k — a zero-length vector perpendicular to both","0k เวกเตอร์ความยาวศูนย์ที่ตั้งฉากกับทั้งสอง"],trap:"T-02"},
          {v:["169 — the two run parallel","169 ทั้งสองวางขนานกัน"]}],unit:""};
  var C=pick([{u:"3i + 4j",     v:"2i − 5j",      a:"−14",t1:"−21",t2:"−14k",o:"26"},
              {u:"5i + 2j",     v:"3i − 4j",      a:"7",  t1:"−7", t2:"7k",  o:"23"},
              {u:"2i + 6j",     v:"4i − j",       a:"2",  t1:"24", t2:"2k",  o:"14"},
              {u:"i + 3j + 2k", v:"4i − 2j + 5k", a:"8",  t1:"42", t2:"8k",  o:"20"}]);
  return {stem:["Given u = "+C.u+" and v = "+C.v+", find u · v.",
                "กำหนด u = "+C.u+" และ v = "+C.v+" จงหา u · v"],
    opts:[{v:C.a,ok:1},{v:C.t1,trap:"T-01"},{v:C.t2,trap:"T-02"},{v:C.o}],unit:""};
},
"M-04": function(sf){
  if(sf==="S-04") return {stem:["Which statement about u × v is correct for non-parallel, non-zero u and v?",
                                "ข้อใดถูกต้องเกี่ยวกับ u × v เมื่อ u และ v ไม่เป็นศูนย์และไม่ขนานกัน"],
    opts:[{v:["It is a vector perpendicular to both u and v","เป็นเวกเตอร์ที่ตั้งฉากกับทั้ง u และ v"],ok:1},
          {v:["It is a scalar equal to |u||v| sin θ","เป็นสเกลาร์ที่มีค่าเท่ากับ |u||v| sin θ"],trap:"T-02"},
          {v:["It is equal to v × u","มีค่าเท่ากับ v × u"],trap:"T-03"},
          {v:["It is a vector parallel to u","เป็นเวกเตอร์ที่ขนานกับ u"]}],unit:""};
  if(sf==="S-05"){
    var g=pick([{p:6,q:5,cr:15},{p:8,q:3,cr:12},{p:4,q:9,cr:18},{p:10,q:7,cr:35}]);
    return {stem:["|u| = "+g.p+", |v| = "+g.q+" and |u × v| = "+g.cr+". Find the acute angle θ between them.",
                  "|u| = "+g.p+", |v| = "+g.q+" และ |u × v| = "+g.cr+" จงหามุมแหลม θ ระหว่างเวกเตอร์ทั้งสอง"],
      opts:[{v:"30°",ok:1},{v:"60°",trap:"T-04"},{v:"45°"},{v:"15°"}],unit:""};
  }
  if(sf==="S-03"){
    var c=pick([{p:3,q:8,ang:30,a:"12",cw:"20.8",h:"6"},
                {p:5,q:6,ang:150,a:"15",cw:"−26",h:"7.5"},
                {p:4,q:9,ang:150,a:"18",cw:"−31.2",h:"9"}]);
    return {stem:["Two cables leave the same point on a mast along u and v, with |u| = "+c.p+", |v| = "+c.q+" and "+c.ang+"° between them. Find |u × v|.",
                  "สายเคเบิลสองเส้นออกจากจุดเดียวกันบนเสาตามแนว u และ v โดย |u| = "+c.p+", |v| = "+c.q+" และมีมุมระหว่างกัน "+c.ang+"° จงหา |u × v|"],
      opts:[{v:c.a,ok:1},{v:c.cw,trap:"T-04"},{v:String(c.p*c.q)},{v:c.h}],unit:""};
  }
  var C=pick([{u:"2i + 3j + 4k",v:"i − j + k",  a:"7i + 2j − 5k", r:"−7i − 2j + 5k", d:"3", j:"7i − 2j − 5k"},
              {u:"i + 2j + 3k", v:"2i + j − k", a:"−5i + 7j − 3k",r:"5i − 7j + 3k",  d:"1", j:"−5i − 7j − 3k"},
              {u:"3i + j + 2k", v:"i + 4j + k", a:"−7i − j + 11k",r:"7i + j − 11k",  d:"9", j:"−7i + j + 11k"}]);
  return {stem:["Given u = "+C.u+" and v = "+C.v+", find u × v.",
                "กำหนด u = "+C.u+" และ v = "+C.v+" จงหา u × v"],
    opts:[{v:C.a,ok:1},{v:C.r,trap:"T-03"},{v:C.d,trap:"T-02"},{v:C.j}],unit:""};
},
"M-05": function(sf){
  if(sf==="S-04") return {stem:["The area of the parallelogram with adjacent sides u and v is equal to which expression?",
                                "พื้นที่ของสี่เหลี่ยมด้านขนานที่มีด้านประชิดเป็น u และ v เท่ากับนิพจน์ใด"],
    opts:[{v:["|u × v|","|u × v|"],ok:1},
          {v:["u · v","u · v"],trap:"T-04"},
          {v:["u × v, taken as the area itself","u × v โดยถือว่าเป็นพื้นที่โดยตรง"],trap:"T-02"},
          {v:["½|u × v|","½|u × v|"]}],unit:""};
  if(sf==="S-05"){
    var g=pick([{p:8,q:6,ar:24},{p:10,q:4,ar:20},{p:12,q:5,ar:30},{p:9,q:8,ar:36}]);
    return {stem:["A parallelogram spanned by u and v has area "+g.ar+", with |u| = "+g.p+" and |v| = "+g.q+". Find the acute angle between them.",
                  "สี่เหลี่ยมด้านขนานที่สร้างจาก u และ v มีพื้นที่ "+g.ar+" โดย |u| = "+g.p+" และ |v| = "+g.q+" จงหามุมแหลมระหว่างเวกเตอร์ทั้งสอง"],
      opts:[{v:"30°",ok:1},{v:"60°",trap:"T-04"},{v:"45°"},{v:"25°"}],unit:""};
  }
  if(sf==="S-03"){
    var t=pick([{pa:"A(1, 1)",pb:"B(4, 2)",pc:"C(2, 5)",ar:"5.5",full:"11",o1:"6",  o2:"2.75"},
                {pa:"A(0, 0)",pb:"B(5, 1)",pc:"C(2, 6)",ar:"14", full:"28",o1:"7.5",o2:"15"}]);
    return {stem:["A triangular plate has corners "+t.pa+", "+t.pb+" and "+t.pc+", measured in metres. Find its area.",
                  "แผ่นสามเหลี่ยมมีมุมที่ "+t.pa+", "+t.pb+" และ "+t.pc+" หน่วยเป็นเมตร จงหาพื้นที่"],
      opts:[{v:t.ar,ok:1},{v:t.full},{v:t.o1},{v:t.o2}],unit:" m²"};
  }
  var C=pick([{u:"3i + j", v:"i + 4j", ar:11},{u:"5i + 2j",v:"i + 3j", ar:13},
              {u:"4i + 3j",v:"2i + 5j",ar:14},{u:"6i + j", v:"2i + 3j",ar:16}]);
  var dp=(function(s){ var n=s.split("+"); return 0; })("");
  var dt=pick([0]);
  var dots={11:"7",13:"11",14:"23",16:"15"};
  return {stem:["Find the area of the parallelogram with adjacent sides u = "+C.u+" and v = "+C.v+".",
                "จงหาพื้นที่ของสี่เหลี่ยมด้านขนานที่มีด้านประชิดเป็น u = "+C.u+" และ v = "+C.v],
    opts:[{v:String(C.ar),ok:1},{v:dots[C.ar],trap:"T-04"},{v:fmt(C.ar/2+dp+dt)},{v:String(C.ar*2)}],unit:""};
},
"M-06": function(sf){
  if(sf==="S-04") return {stem:["Which expression gives the projection of u onto v as a vector?",
                                "นิพจน์ใดให้โปรเจกชันของ u บน v ในรูปเวกเตอร์"],
    opts:[{v:["((u · v) / |v|²) v","((u · v) / |v|²) v"],ok:1},
          {v:["((u · v) / |u|²) u","((u · v) / |u|²) u"]},
          {v:["((u × v) / |v|²) v","((u × v) / |v|²) v"],trap:"T-02"},
          {v:["((|u||v| sin θ) / |v|²) v","((|u||v| sin θ) / |v|²) v"],trap:"T-04"}],unit:""};
  if(sf==="S-05"){
    var g=pick([{vol:30,ans:5},{vol:42,ans:7},{vol:54,ans:9},{vol:24,ans:4}]);
    return {stem:["The parallelepiped spanned by u = p i, v = 3j and r = 2k has volume "+g.vol+". Find p, given p > 0.",
                  "ทรงสี่เหลี่ยมด้านขนานที่สร้างจาก u = p i, v = 3j และ r = 2k มีปริมาตร "+g.vol+" จงหา p เมื่อ p > 0"],
      opts:[{v:String(g.ans),ok:1},{v:String(g.vol-5),trap:"T-01"},{v:String(g.vol/2)},{v:"6"}],unit:""};
  }
  if(sf==="S-03") return {stem:["A crystal cell is spanned by u = 4i, v = 3j + 2k and r = i + 5k, lengths in nanometres. Find its volume.",
                                "เซลล์ผลึกสร้างจาก u = 4i, v = 3j + 2k และ r = i + 5k ความยาวเป็นนาโนเมตร จงหาปริมาตร"],
    opts:[{v:"60",ok:1},{v:"−60",trap:"T-03"},{v:"30"},{v:"20"}],unit:" nm³"};
  return {stem:["Find the volume of the parallelepiped spanned by u = 2i, v = i + 3j and r = i + j + 4k.",
                "จงหาปริมาตรของทรงสี่เหลี่ยมด้านขนานที่สร้างจาก u = 2i, v = i + 3j และ r = i + j + 4k"],
    opts:[{v:"24",ok:1},{v:"9",trap:"T-01"},{v:["12i − 4j − 2k","12i − 4j − 2k"],trap:"T-02"},{v:"12"}],unit:""};
}
}
};
