var CHAPTER = {
id:"ch17", num:"17", slug:"solids-and-fluids", subject:"physics",
kicker:["Physics · Chapter 17","ฟิสิกส์ · บทที่ 17"],
title:["Solids and Fluids","ของแข็งและของไหล"],
mapTitle:["Matter that pushes back","สสารที่ดันกลับ"],
lede:["Chapter 3 treated bodies as points. Real materials stretch, real fluids press, and real flows speed up when they narrow. All of it follows from force spread over an area.",
      "บทที่ 3 มองวัตถุเป็นจุด แต่วัสดุจริงยืดได้ ของไหลจริงกดดัน และการไหลจริงเร็วขึ้นเมื่อทางแคบลง ทั้งหมดนี้มาจากแรงที่กระจายบนพื้นที่"],
next:["→ continues in Chapter 18 · Electromagnetic Waves","→ ต่อในบทที่ 18 · คลื่นแม่เหล็กไฟฟ้า"],

nodes:[
{ id:"elasticity", x:235, y:52, requires:[], methods:["M-01"],
  title:["Stress and strain","ความเค้นและความเครียด"],
  body:[["Stress is force per unit area, strain is the fractional extension, and their ratio in the elastic region is the Young modulus: Y = (F/A)(L₀/ΔL). It is a property of the material, not of the sample.",
         "Below the elastic limit the material springs back. Beyond it, deformation is permanent. The curve below shows both regions, and the point where it stops being a straight line is the whole engineering question."],
        ["ความเค้นคือแรงต่อหน่วยพื้นที่ ความเครียดคือสัดส่วนการยืด และอัตราส่วนของทั้งสองในช่วงยืดหยุ่นคือมอดุลัสของยัง Y = (F/A)(L₀/ΔL) มันเป็นสมบัติของวัสดุ ไม่ใช่ของชิ้นงาน",
         "ต่ำกว่าขีดจำกัดยืดหยุ่น วัสดุจะดีดกลับ เกินกว่านั้นการเปลี่ยนรูปจะถาวร เส้นกราฟด้านล่างแสดงทั้งสองช่วง และจุดที่มันเลิกเป็นเส้นตรงคือคำถามทางวิศวกรรมทั้งหมด"]],
  formula:["Y = (F/A) / (ΔL/L₀)","Y = (F/A) / (ΔL/L₀)"],
  flabel:["A property of the material","สมบัติของวัสดุ"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){
      var el=p.el/1000;
      if(x<=el) return p.Y*x;                       /* linear elastic region */
      var over=x-el;
      return p.Y*el + p.Y*over*0.22/(1+over*90);    /* plastic region flattens off */
    },
    xmin:0, xmax:0.02, fill:false,
    title:["STRESS AGAINST STRAIN","ความเค้น เทียบ ความเครียด"],
    xlab:["strain ΔL/L₀","ความเครียด ΔL/L₀"], ylab:["stress (GPa)","ความเค้น (GPa)"],
    mark:function(p){ return p.el/1000; },
    ctrls:[
      {k:"Y",  lab:["Young modulus","มอดุลัสของยัง"],   min:20, max:220, step:10, def:200, unit:" GPa"},
      {k:"el", lab:["Elastic limit","ขีดจำกัดยืดหยุ่น"], min:1,  max:12,  step:.5, def:4,   unit:" ‰"}
    ],
    readouts:[
      {lab:["Stress at the limit","ความเค้นที่ขีดจำกัด"], f:function(S){
        return fmt(S.p.Y*S.p.el/1000)+" GPa"; }},
      {lab:["Gradient","ความชัน"], f:function(S){ return S.p.Y+" GPa"; }}
    ]
  },
  guide:[
    {say:["The straight part is the elastic region. Its gradient IS the Young modulus — read it off the axes.",
          "ช่วงที่เป็นเส้นตรงคือช่วงยืดหยุ่น ความชันของมันคือมอดุลัสของยัง อ่านได้จากแกน"], set:{Y:200,el:4}},
    {say:["Beyond the marked point the line bends over. The material is now deforming permanently.",
          "เลยจุดที่ทำเครื่องหมายไว้ เส้นจะโค้งลง วัสดุกำลังเปลี่ยนรูปอย่างถาวรแล้ว"], set:{Y:200,el:4}},
    {say:["Lower the modulus. A shallower line means the same stress produces far more strain — rubber, not steel.",
          "ลดค่ามอดุลัส เส้นที่ชันน้อยลงหมายถึงความเค้นเท่าเดิมให้ความเครียดมากกว่ามาก คือยาง ไม่ใช่เหล็ก"], set:{Y:40,el:8}}
  ]},

{ id:"pressure", x:100, y:150, requires:["elasticity"], methods:["M-02"],
  title:["Pressure in fluids","ความดันในของไหล"],
  body:[["Pressure is P = F/A, and in a fluid at rest it increases with depth as P = ρgh. It acts equally in every direction, which is why a diver feels it on all sides rather than just from above.",
         "Depth is all that matters — not the shape of the container, not how much water it holds. A narrow tube and a wide lake of the same depth exert exactly the same pressure at the bottom. Believing volume matters is trap T-02."],
        ["ความดันคือ P = F/A และในของไหลที่อยู่นิ่งจะเพิ่มตามความลึกเป็น P = ρgh มันกระทำเท่ากันทุกทิศทาง จึงเป็นเหตุผลที่นักดำน้ำรู้สึกแรงดันรอบตัว ไม่ใช่แค่จากด้านบน",
         "ความลึกคือสิ่งเดียวที่สำคัญ ไม่ใช่รูปร่างภาชนะ ไม่ใช่ปริมาณน้ำที่บรรจุ ท่อแคบกับทะเลสาบกว้างที่ลึกเท่ากันให้ความดันที่ก้นเท่ากันพอดี การเชื่อว่าปริมาตรมีผลคือกับดัก T-02"]],
  formula:["P = F/A        P = ρgh        P_abs = P₀ + ρgh","P = F/A        P = ρgh        P_abs = P₀ + ρgh"],
  flabel:["Depth only · shape is irrelevant","ขึ้นกับความลึกเท่านั้น · รูปทรงไม่เกี่ยว"],
  viz:"plot",
  vizcfg:{
    title:["PRESSURE AGAINST DEPTH","ความดัน เทียบ ความลึก"],
    xlab:["depth (m)","ความลึก (m)"], ylab:["pressure (kPa)","ความดัน (kPa)"],
    xmin:0, xmax:30, ymin:0, fill:false,
    fn:function(x,p){ return (p.atm?101:0) + p.rho*9.8*x/1000; },
    mark:function(p){ return p.h; },
    ctrls:[
      {k:"rho", lab:["Fluid density","ความหนาแน่นของไหล"], min:700, max:13600, step:100, def:1000, unit:" kg/m³"},
      {k:"h",   lab:["Depth","ความลึก"], min:0, max:29, step:.5, def:10, unit:" m"},
      {k:"atm", lab:["",""], opts:[["gauge","ความดันเกจ"], ["include atmosphere","รวมบรรยากาศ"]], min:0, def:1, unit:""}
    ],
    readouts:[
      {lab:["Pressure there","ความดัน ณ ที่นั้น"], f:function(S){
        return fmt2((S.p.atm?101:0)+S.p.rho*9.8*S.p.h/1000)+" kPa"; }},
      {lab:["From the fluid alone","จากของไหลอย่างเดียว"], f:function(S){
        return fmt2(S.p.rho*9.8*S.p.h/1000)+" kPa"; }},
      {lab:["Does the container shape matter?","รูปทรงภาชนะมีผลไหม"], f:function(){
        return L()?"ไม่เลย — มีแต่ความลึกที่สำคัญ":"not at all — only the depth counts"; }},
      {lab:["Direction of the pressure","ทิศของความดัน"], f:function(){
        return L()?"ทุกทิศทางเท่ากัน":"equal in every direction"; }}
    ],
    note:["a narrow tube and a wide lake give the same pressure at the same depth","ท่อแคบกับทะเลสาบกว้างให้ความดันเท่ากันที่ความลึกเดียวกัน"]
  } },

{ id:"pascal", x:370, y:150, requires:["pressure"], methods:["M-03"],
  title:["Pascal's principle","หลักของปาสคาล"],
  body:[["Pressure applied to an enclosed fluid is transmitted undiminished throughout it. Push on a small piston and the same pressure appears under a large one — which multiplies the force by the ratio of areas.",
         "A hydraulic jack lifts a car from hand pressure this way. Energy is not created: the small piston must travel far further than the large one moves, exactly as with a lever."],
        ["ความดันที่กระทำต่อของไหลในภาชนะปิดจะถูกส่งต่อไปทั่วโดยไม่ลดลง กดลูกสูบเล็กแล้วความดันเดียวกันจะปรากฏใต้ลูกสูบใหญ่ ซึ่งคูณแรงด้วยอัตราส่วนของพื้นที่",
         "แม่แรงไฮดรอลิกยกรถด้วยแรงมือได้แบบนี้ พลังงานไม่ได้ถูกสร้างขึ้น ลูกสูบเล็กต้องเคลื่อนที่ไกลกว่าลูกสูบใหญ่มาก เช่นเดียวกับคานงัด"]],
  formula:["F₁/A₁ = F₂/A₂","F₁/A₁ = F₂/A₂"],
  flabel:["Force multiplied, distance divided","แรงถูกคูณ ระยะถูกหาร"],
  viz:"bars",
  vizcfg:{
    title:["A HYDRAULIC PRESS MULTIPLIES FORCE","แม่แรงไฮดรอลิกทวีแรง"],
    ylab:["N  ·  cm²  ·  cm","N  ·  cm²  ·  cm"],
    ctrls:[
      {k:"F1", lab:["Force you apply","แรงที่คุณออก"], min:10, max:300, step:10, def:100, unit:" N"},
      {k:"A1", lab:["Small piston area","พื้นที่ลูกสูบเล็ก"], min:1, max:20, step:1, def:2, unit:" cm²"},
      {k:"A2", lab:["Large piston area","พื้นที่ลูกสูบใหญ่"], min:5, max:200, step:5, def:50, unit:" cm²"},
      {k:"d1", lab:["Distance you push","ระยะที่คุณกด"], min:1, max:50, step:1, def:20, unit:" cm"}
    ],
    readouts:[
      {lab:["Pressure (same throughout)","ความดัน (เท่ากันทั้งระบบ)"], f:function(S){
        return fmt2(S.p.F1/S.p.A1*10)+" kPa"; }},
      {lab:["Force out","แรงที่ได้ออกมา"], f:function(S){ return fmt2(S.p.F1*S.p.A2/S.p.A1)+" N"; }},
      {lab:["Distance the load rises","ระยะที่ของหนักยกขึ้น"], f:function(S){
        return fmt2(S.p.d1*S.p.A1/S.p.A2)+" cm"; }},
      {lab:["Work in vs work out","งานเข้า เทียบ งานออก"], f:function(S){
        return fmt2(S.p.F1*S.p.d1/100)+(L()?" J · เท่ากันทั้งสองฝั่ง":" J · identical on both sides"); }}
    ],
    bars:[
      {lab:["Force in","แรงเข้า"],   f:function(p){ return p.F1; }, col:"faint"},
      {lab:["Force out","แรงออก"],   f:function(p){ return p.F1*p.A2/p.A1; }, col:"accent"},
      {lab:["Distance in","ระยะเข้า"], f:function(p){ return p.d1; }, col:"faint"},
      {lab:["Distance out","ระยะออก"], f:function(p){ return p.d1*p.A1/p.A2; }, col:"good"}
    ],
    note:["the force is multiplied and the distance is divided by exactly the same factor","แรงถูกคูณและระยะทางถูกหารด้วยตัวเลขเดียวกันพอดี"]
  } },

{ id:"buoyancy", x:235, y:248, requires:["pascal"], methods:["M-04"],
  title:["Upthrust","แรงพยุง"],
  body:[["Archimedes: the upthrust equals the weight of fluid displaced, F_B = ρ_fluid V_submerged g. It arises because pressure at the bottom of an object exceeds pressure at the top.",
         "An object floats when it can displace its own weight before going under, which happens exactly when its density is below the fluid's. Using total volume rather than submerged volume for a floating body is trap T-03."],
        ["อาร์คิมิดีส แรงพยุงเท่ากับน้ำหนักของของไหลที่ถูกแทนที่ F_B = ρ ของไหล × V จม × g มันเกิดขึ้นเพราะความดันที่ก้นวัตถุมากกว่าความดันที่ด้านบน",
         "วัตถุลอยได้เมื่อมันแทนที่ของไหลได้เท่ากับน้ำหนักตัวเองก่อนที่จะจมมิด ซึ่งเกิดขึ้นพอดีเมื่อความหนาแน่นของมันน้อยกว่าของไหล การใช้ปริมาตรทั้งหมดแทนปริมาตรส่วนที่จมสำหรับวัตถุลอยคือกับดัก T-03"]],
  formula:["F_B = ρ V_sub g        V_sub / V = ρ_object / ρ_fluid","F_B = ρ V_sub g        V_sub / V = ρ_object / ρ_fluid"],
  flabel:["Submerged volume, not total","ปริมาตรส่วนที่จม ไม่ใช่ทั้งหมด"],
  viz:"bars",
  vizcfg:{
    title:["FLOAT OR SINK, DECIDED BY TWO BARS","ลอยหรือจม ตัดสินด้วยสองแถบ"],
    ylab:["newtons","นิวตัน"],
    ctrls:[
      {k:"V",   lab:["Volume of the object","ปริมาตรวัตถุ"], min:100, max:2000, step:50, def:1000, unit:" cm³"},
      {k:"rho", lab:["Density of the object","ความหนาแน่นวัตถุ"], min:200, max:3000, step:50, def:700, unit:" kg/m³"},
      {k:"rf",  lab:["Density of the fluid","ความหนาแน่นของไหล"], min:700, max:13600, step:100, def:1000, unit:" kg/m³"}
    ],
    readouts:[
      {lab:["Weight","น้ำหนัก"], f:function(S){ return fmt2(S.p.V*1e-6*S.p.rho*9.8)+" N"; }},
      {lab:["Upthrust if fully submerged","แรงลอยตัวเมื่อจมทั้งก้อน"], f:function(S){
        return fmt2(S.p.V*1e-6*S.p.rf*9.8)+" N"; }},
      {lab:["Verdict","ผลลัพธ์"], f:function(S){
        return S.p.rho<S.p.rf ? (L()?"ลอย":"floats") : S.p.rho>S.p.rf ? (L()?"จม":"sinks")
                              : (L()?"ลอยปริ่มน้ำ":"hovers, neutrally buoyant"); }},
      {lab:["Fraction submerged when floating","สัดส่วนที่จมเมื่อลอย"], f:function(S){
        return S.p.rho<S.p.rf ? fmt2(100*S.p.rho/S.p.rf)+" %" : (L()?"จมทั้งหมด":"all of it"); }}
    ],
    bars:[
      {lab:["Weight","น้ำหนัก"], f:function(p){ return p.V*1e-6*p.rho*9.8; }, col:"ink"},
      {lab:["Upthrust","แรงลอยตัว"], f:function(p){ return p.V*1e-6*p.rf*9.8; }, col:"accent"},
      {lab:["Apparent weight","น้ำหนักปรากฏ"], f:function(p){
        return Math.max(0, p.V*1e-6*(p.rho-p.rf)*9.8); }, col:"warn"}
    ],
    note:["compare only the two densities — the volume cancels out of the comparison entirely","เทียบแค่ความหนาแน่นสองค่า ปริมาตรตัดทิ้งไปหมดในการเปรียบเทียบ"]
  },
  guide:[
    {say:["Wood in water. The upthrust bar overtops the weight bar, so it floats.",
          "ไม้ในน้ำ แถบแรงลอยตัวสูงกว่าแถบน้ำหนัก มันจึงลอย"], set:{V:1000,rho:700,rf:1000}},
    {say:["Make the object denser than water and the bars swap over. Now it sinks.",
          "ทำให้วัตถุหนาแน่นกว่าน้ำ แถบสลับกัน ตอนนี้มันจม"], set:{V:1000,rho:2500,rf:1000}},
    {say:["Change the fluid to mercury instead and the same dense object floats again.",
          "เปลี่ยนของไหลเป็นปรอทแทน วัตถุหนาแน่นก้อนเดิมก็ลอยได้อีกครั้ง"], set:{V:1000,rho:2500,rf:13600}}
  ] },

{ id:"flow", x:235, y:346, requires:["buoyancy"], methods:["M-05","M-06"],
  title:["Fluid flow","การไหลของของไหล"],
  body:[["Continuity says the same volume passes every cross-section per second: A₁v₁ = A₂v₂. Narrow the pipe and the fluid must speed up — the reason a thumb over a hose makes a jet.",
         "Bernoulli then says the faster stream has the lower pressure. That is what lifts an aeroplane wing and what pulls two ships alongside each other. Expecting fast flow to mean high pressure is trap T-04."],
        ["สมการความต่อเนื่องบอกว่าปริมาตรเท่ากันผ่านทุกหน้าตัดในแต่ละวินาที A₁v₁ = A₂v₂ ทำให้ท่อแคบลงแล้วของไหลต้องเร็วขึ้น เป็นเหตุผลที่เอานิ้วอุดปลายสายยางแล้วน้ำพุ่ง",
         "แบร์นูลลีบอกต่อว่ากระแสที่เร็วกว่ามีความดันต่ำกว่า นั่นคือสิ่งที่ยกปีกเครื่องบินและดึงเรือสองลำเข้าหากัน การคาดว่าไหลเร็วแปลว่าความดันสูงคือกับดัก T-04"]],
  formula:["A₁v₁ = A₂v₂        P + ½ρv² + ρgh = constant","A₁v₁ = A₂v₂        P + ½ρv² + ρgh = ค่าคงที่"],
  flabel:["Faster flow · lower pressure","ไหลเร็วกว่า · ความดันต่ำกว่า"],
  viz:"bars",
  vizcfg:{
    title:["NARROW THE PIPE, SPEED THE FLOW","บีบท่อให้แคบ ของไหลจะเร็วขึ้น"],
    ylab:["cm²  ·  m/s  ·  kPa","cm²  ·  m/s  ·  kPa"],
    ctrls:[
      {k:"A1", lab:["Wide section area","พื้นที่ช่วงกว้าง"], min:5, max:60, step:1, def:40, unit:" cm²"},
      {k:"A2", lab:["Narrow section area","พื้นที่ช่วงแคบ"], min:2, max:40, step:1, def:10, unit:" cm²"},
      {k:"v1", lab:["Speed in the wide part","อัตราเร็วช่วงกว้าง"], min:.5, max:6, step:.5, def:2, unit:" m/s"}
    ],
    readouts:[
      {lab:["Speed in the narrow part","อัตราเร็วช่วงแคบ"], f:function(S){
        return fmt2(S.p.v1*S.p.A1/S.p.A2)+" m/s"; }},
      {lab:["Flow rate (same in both)","อัตราการไหล (เท่ากันทั้งสอง)"], f:function(S){
        return fmt2(S.p.A1*1e-4*S.p.v1*1000)+" L/s"; }},
      {lab:["Pressure in the narrow part","ความดันช่วงแคบ"], f:function(S){
        var p=S.p, v2=p.v1*p.A1/p.A2;
        return fmt2(-0.5*1000*(v2*v2-p.v1*p.v1)/1000)+(L()?" kPa เทียบกับช่วงกว้าง":" kPa relative to the wide part"); }},
      {lab:["Faster flow means","ไหลเร็วขึ้นแปลว่า"], f:function(){
        return L()?"ความดันต่ำลง — ขัดกับสัญชาตญาณ":"lower pressure — which feels backwards"; }}
    ],
    bars:[
      {lab:["Wide area","พื้นที่กว้าง"], f:function(p){ return p.A1; }, col:"faint"},
      {lab:["Narrow area","พื้นที่แคบ"], f:function(p){ return p.A2; }, col:"faint"},
      {lab:["Speed wide","เร็วช่วงกว้าง"], f:function(p){ return p.v1; }, col:"good"},
      {lab:["Speed narrow","เร็วช่วงแคบ"], f:function(p){ return p.v1*p.A1/p.A2; }, col:"accent"}
    ],
    note:["area down means speed up, because the same volume must pass every second","พื้นที่ลดแปลว่าอัตราเร็วเพิ่ม เพราะปริมาตรเท่ากันต้องผ่านไปทุกวินาที"]
  } }
],

methods:[
{id:"M-01", name:["Stress, strain and Young modulus","ความเค้น ความเครียด และมอดุลัสของยัง"]},
{id:"M-02", name:["Pressure at depth","ความดันที่ความลึก"]},
{id:"M-03", name:["Apply Pascal's principle","ใช้หลักของปาสคาล"]},
{id:"M-04", name:["Upthrust and floating","แรงพยุงและการลอย"]},
{id:"M-05", name:["Apply continuity","ใช้สมการความต่อเนื่อง"]},
{id:"M-06", name:["Apply Bernoulli","ใช้สมการแบร์นูลลี"]}
],

traps:{
"T-01":["Strain is a ratio and has no units. Do not leave metres attached to it.","ความเครียดเป็นอัตราส่วนและไม่มีหน่วย อย่าติดหน่วยเมตรไว้"],
"T-02":["Pressure depends on depth alone. The shape of the container and the volume held are irrelevant.","ความดันขึ้นกับความลึกเพียงอย่างเดียว รูปทรงภาชนะและปริมาตรที่บรรจุไม่เกี่ยวข้อง"],
"T-03":["For a floating body use the SUBMERGED volume, not the whole volume.","สำหรับวัตถุที่ลอย ให้ใช้ปริมาตรส่วนที่จม ไม่ใช่ปริมาตรทั้งก้อน"],
"T-04":["Bernoulli runs the other way: where the fluid moves faster, the pressure is lower.","แบร์นูลลีเป็นตรงข้าม ที่ใดของไหลเร็วกว่า ความดันจะต่ำกว่า"]
},

gen:{
"M-01": function(sf){
  var F=pick([500,1000,2000]), A=pick([1e-4,2e-4,5e-4]), L0=pick([1,2,4]), dL=pick([0.001,0.002,0.005]);
  var Y=(F/A)/(dL/L0);
  if(sf==="S-04") return {stem:["What are the units of strain?","ความเครียดมีหน่วยอะไร"],
    opts:[{v:["None — it is a ratio","ไม่มีหน่วย เพราะเป็นอัตราส่วน"],ok:1},
          {v:["Metres","เมตร"],trap:"T-01"},{v:["Pascals","ปาสคาล"],trap:"T-01"},{v:["Newtons","นิวตัน"]}],unit:""};
  if(sf==="S-02") return {stem:["On a stress–strain graph, what does the gradient of the straight region give?",
                                "บนกราฟความเค้น–ความเครียด ความชันของช่วงเส้นตรงให้ค่าอะไร"],
    opts:[{v:["The Young modulus","มอดุลัสของยัง"],ok:1},{v:["The elastic limit","ขีดจำกัดยืดหยุ่น"]},
          {v:["The breaking stress","ความเค้นที่จุดขาด"]},{v:["The strain energy","พลังงานความเครียด"]}],unit:""};
  return {stem:["A force of "+F+" N on area "+A.toExponential(0)+" m² stretches a "+L0+" m wire by "+dL+" m. Find the Young modulus.",
                "แรง "+F+" นิวตัน บนพื้นที่ "+A.toExponential(0)+" ตร.ม. ยืดลวดยาว "+L0+" เมตร ออกไป "+dL+" เมตร จงหามอดุลัสของยัง"],
    opts:[{v:Y.toExponential(2),ok:1},{v:(F/A).toExponential(2),trap:"T-01"},
          {v:(dL/L0).toExponential(2)},{v:(Y/2).toExponential(2)}],unit:" Pa"};
},
"M-02": function(sf){
  var h=pick([2,5,10,20]), rho=1000, g=10;
  var P=rho*g*h;
  if(sf==="S-04") return {stem:["Two tanks of the same depth hold very different volumes of water. Compare the pressure at the bottom.",
                                "ถังสองใบลึกเท่ากันแต่บรรจุน้ำปริมาณต่างกันมาก จงเปรียบเทียบความดันที่ก้นถัง"],
    opts:[{v:["Identical — pressure depends only on depth","เท่ากัน เพราะความดันขึ้นกับความลึกเท่านั้น"],ok:1},
          {v:["Greater in the larger tank","มากกว่าในถังใบใหญ่"],trap:"T-02"},
          {v:["Greater in the smaller tank","มากกว่าในถังใบเล็ก"],trap:"T-02"},
          {v:["It depends on the tank's shape","ขึ้นกับรูปทรงของถัง"],trap:"T-02"}],unit:""};
  if(sf==="S-05") return {stem:["The gauge pressure at the bottom of a lake is "+P+" Pa. Find its depth, with ρ = 1000 and g = 10.",
                                "ความดันเกจที่ก้นทะเลสาบคือ "+P+" ปาสคาล จงหาความลึก โดย ρ = 1000 และ g = 10"],
    opts:[{v:String(h),ok:1},{v:fmt(P/1000)},{v:fmt(P*10)},{v:fmt(h*2)}],unit:" m"};
  return {stem:["Find the gauge pressure "+h+" m below the surface of water, with ρ = 1000 kg/m³ and g = 10 m/s².",
                "จงหาความดันเกจที่ระดับ "+h+" เมตร ใต้ผิวน้ำ โดย ρ = 1000 กก./ลบ.ม. และ g = 10 ม./วินาที²"],
    opts:[{v:String(P),ok:1},{v:String(P+101300),trap:"T-02"},{v:String(rho*h)},{v:String(P/2)}],unit:" Pa"};
},
"M-03": function(sf){
  var A1=pick([0.001,0.002]), A2=pick([0.02,0.05,0.1]), F1=pick([50,100,200]);
  var F2=F1*A2/A1;
  if(sf==="S-04") return {stem:["A hydraulic jack multiplies force. What is the catch?",
                                "แม่แรงไฮดรอลิกคูณแรงได้ ข้อแลกเปลี่ยนคืออะไร"],
    opts:[{v:["The small piston must move much further","ลูกสูบเล็กต้องเคลื่อนที่ไกลกว่ามาก"],ok:1},
          {v:["Energy is created from nothing","พลังงานถูกสร้างจากความว่างเปล่า"]},
          {v:["The fluid heats up","ของไหลร้อนขึ้น"]},{v:["There is no catch","ไม่มีข้อแลกเปลี่ยน"]}],unit:""};
  return {stem:["A hydraulic press has pistons of "+A1+" m² and "+A2+" m². A force of "+F1+" N acts on the small one. Find the output force.",
                "เครื่องอัดไฮดรอลิกมีลูกสูบพื้นที่ "+A1+" และ "+A2+" ตร.ม. แรง "+F1+" นิวตัน กระทำที่ลูกสูบเล็ก จงหาแรงขาออก"],
    opts:[{v:fmt(F2),ok:1},{v:fmt(F1*A1/A2)},{v:String(F1)},{v:fmt(F2/2)}],unit:" N"};
},
"M-04": function(sf){
  var V=pick([0.002,0.005,0.01]), rho=1000, g=10, rob=pick([600,800,2700]);
  var FB=rho*V*g, W=rob*V*g;
  if(sf==="S-04") return {stem:["A block floats with three quarters of its volume submerged. What is its density?",
                                "ก้อนวัตถุลอยโดยจมสามในสี่ของปริมาตร ความหนาแน่นเป็นเท่าใด"],
    opts:[{v:["750 kg/m³","750 กก./ลบ.ม."],ok:1},{v:["1000 kg/m³","1000 กก./ลบ.ม."],trap:"T-03"},
          {v:["1333 kg/m³","1333 กก./ลบ.ม."],trap:"T-03"},{v:["250 kg/m³","250 กก./ลบ.ม."]}],unit:""};
  if(sf==="S-03") return {stem:["A "+rob+" kg/m³ block of volume "+V+" m³ is fully submerged in water. Find the upthrust.",
                                "ก้อนวัตถุความหนาแน่น "+rob+" กก./ลบ.ม. ปริมาตร "+V+" ลบ.ม. จมมิดในน้ำ จงหาแรงพยุง"],
    opts:[{v:fmt(FB),ok:1},{v:fmt(W),trap:"T-03"},{v:fmt(FB-W)},{v:fmt(FB*2)}],unit:" N"};
  return {stem:["Find the upthrust on a body displacing "+V+" m³ of water, with ρ = 1000 kg/m³ and g = 10 m/s².",
                "จงหาแรงพยุงของวัตถุที่แทนที่น้ำ "+V+" ลบ.ม. โดย ρ = 1000 กก./ลบ.ม. และ g = 10 ม./วินาที²"],
    opts:[{v:fmt(FB),ok:1},{v:fmt(rho*V),trap:"T-03"},{v:fmt(FB/g)},{v:fmt(FB*2)}],unit:" N"};
},
"M-05": function(sf){
  var A1=pick([0.01,0.02,0.04]), v1=pick([1,2,4]), A2=pick([0.005,0.002]);
  var v2=A1*v1/A2;
  if(sf==="S-04") return {stem:["Water flows through a pipe that narrows. What happens to its speed?",
                                "น้ำไหลผ่านท่อที่แคบลง อัตราเร็วเปลี่ยนอย่างไร"],
    opts:[{v:["It increases","เพิ่มขึ้น"],ok:1},{v:["It decreases","ลดลง"],trap:"T-04"},
          {v:["It is unchanged","เท่าเดิม"]},{v:["It depends on the pressure","ขึ้นกับความดัน"]}],unit:""};
  return {stem:["Water at "+v1+" m/s in a pipe of area "+A1+" m² enters a section of "+A2+" m². Find the new speed.",
                "น้ำไหลด้วย "+v1+" ม./วินาที ในท่อพื้นที่ "+A1+" ตร.ม. เข้าสู่ช่วงที่มีพื้นที่ "+A2+" ตร.ม. จงหาอัตราเร็วใหม่"],
    opts:[{v:fmt(v2),ok:1},{v:fmt(v1*A2/A1),trap:"T-04"},{v:String(v1)},{v:fmt(v2/2)}],unit:" m/s"};
},
"M-06": function(sf){
  var C=[{s:["Why does an aeroplane wing generate lift?","ทำไมปีกเครื่องบินจึงเกิดแรงยก"],
          ok:["Air moves faster over the top, so the pressure there is lower","อากาศไหลเร็วกว่าด้านบน ความดันตรงนั้นจึงต่ำกว่า"],
          w:[["Air moves faster over the top, so the pressure there is higher","อากาศไหลเร็วกว่าด้านบน ความดันตรงนั้นจึงสูงกว่า"],
             ["The wing is heavier underneath","ปีกหนักกว่าด้านล่าง"],
             ["Air is denser above the wing","อากาศหนาแน่นกว่าเหนือปีก"]]},
         {s:["Two ships sailing side by side tend to be pulled together. Why?","เรือสองลำที่แล่นเคียงกันมักถูกดึงเข้าหากัน เพราะอะไร"],
          ok:["Water between them speeds up, lowering the pressure there","น้ำระหว่างเรือไหลเร็วขึ้น ทำให้ความดันตรงนั้นลดลง"],
          w:[["Water between them slows down, raising the pressure","น้ำระหว่างเรือไหลช้าลง ทำให้ความดันสูงขึ้น"],
             ["Their hulls are magnetic","ตัวเรือมีสภาพแม่เหล็ก"],
             ["Upthrust pulls them together","แรงพยุงดึงเข้าหากัน"]]},
         {s:["A thumb over a hose end makes the water jet further. Which principle explains the speed increase?",
             "การเอานิ้วอุดปลายสายยางทำให้น้ำพุ่งไกลขึ้น หลักการใดอธิบายอัตราเร็วที่เพิ่มขึ้น"],
          ok:["Continuity — the same volume through a smaller area","ความต่อเนื่อง ปริมาตรเท่าเดิมผ่านพื้นที่ที่เล็กลง"],
          w:[["Archimedes' principle","หลักของอาร์คิมิดีส"],["Pascal's principle","หลักของปาสคาล"],
             ["Hooke's law","กฎของฮุก"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0],trap:"T-04"},{v:c.w[1]},{v:c.w[2]}],unit:""};
}
}
};
