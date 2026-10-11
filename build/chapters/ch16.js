var CHAPTER = {
id:"ch16", num:"16", slug:"heat-and-gases", subject:"physics",
kicker:["Physics · Chapter 16","ฟิสิกส์ · บทที่ 16"],
title:["Heat and Gases","ความร้อนและแก๊ส"],
mapTitle:["Mechanics of things too small to count","กลศาสตร์ของสิ่งที่เล็กเกินกว่าจะนับ"],
lede:["Temperature is not a substance. It is the average kinetic energy of particles you could never track individually — and once that is accepted, the gas laws stop being arbitrary and become bookkeeping.",
      "อุณหภูมิไม่ใช่สสาร แต่เป็นพลังงานจลน์เฉลี่ยของอนุภาคที่เราไม่มีทางตามดูทีละตัวได้ พอเข้าใจตรงนี้ กฎของแก๊สก็ไม่ใช่เรื่องท่องจำอีกต่อไป แต่เป็นแค่การจดบัญชีพลังงาน"],
next:["→ continues in Chapter 17 · Solids and Fluids","→ ต่อในบทที่ 17 · ของแข็งและของไหล"],

nodes:[
{ id:"temperature", x:235, y:52, requires:[], methods:["M-01"],
  title:["Temperature","อุณหภูมิ"],
  body:[["Celsius is a convenience; kelvin is the physics. Absolute zero at −273 °C is where particle motion would cease, and it is the only defensible place to start counting. T(K) = T(°C) + 273.",
         "Every gas law and every kinetic-theory result requires kelvin. Substituting celsius is trap T-01, and because it rarely gives an absurd-looking answer, it usually survives all the way to the mark scheme."],
        ["เซลเซียสเป็นสเกลที่ใช้สะดวก แต่เคลวินคือสเกลของฟิสิกส์ ศูนย์สัมบูรณ์ที่ −273 องศาเซลเซียสคือจุดที่อนุภาคหยุดเคลื่อนที่ และเป็นจุดเริ่มนับเพียงจุดเดียวที่มีเหตุผลรองรับ T(K) = T(°C) + 273",
         "กฎของแก๊สและผลจากทฤษฎีจลน์ทุกข้อต้องใช้เคลวิน ถ้าแทนค่าเซลเซียสก็ตกกับดัก T-01 และเพราะคำตอบที่ได้มักไม่ดูแปลกประหลาด ความผิดพลาดนี้จึงมักหลุดไปถึงตอนตรวจให้คะแนน"]],
  formula:["T(K) = T(°C) + 273","T(K) = T(°C) + 273"],
  flabel:["Kelvin in every formula","ใช้เคลวินในทุกสูตร"],
  viz:"bars",
  vizcfg:{
    title:["ONE TEMPERATURE, THREE SCALES","อุณหภูมิเดียว สามมาตรา"],
    ylab:["degrees","องศา"],
    ctrls:[{k:"c", lab:["Temperature","อุณหภูมิ"], min:-273, max:200, step:1, def:25, unit:" °C"}],
    readouts:[
      {lab:["Celsius","เซลเซียส"], f:function(S){ return fmt2(S.p.c)+" °C"; }},
      {lab:["Kelvin","เคลวิน"], f:function(S){ return fmt2(S.p.c+273.15)+" K"; }},
      {lab:["Fahrenheit","ฟาเรนไฮต์"], f:function(S){ return fmt2(S.p.c*9/5+32)+" °F"; }},
      {lab:["Which one goes in gas laws?","มาตราใดใช้ในกฎแก๊ส"], f:function(){
        return L()?"เคลวินเท่านั้น — ศูนย์ของมันคือศูนย์จริง":"kelvin only — its zero is a real zero"; }}
    ],
    bars:[
      {lab:["°C","°C"], f:function(p){ return p.c; }, col:"faint"},
      {lab:["K","K"],   f:function(p){ return p.c+273.15; }, col:"accent"},
      {lab:["°F","°F"], f:function(p){ return p.c*9/5+32; }, col:"good"}
    ],
    note:["drag towards −273 °C and only the kelvin bar reaches zero — the others sail past it","ลากไปทาง −273 °C จะมีแค่แถบเคลวินที่ถึงศูนย์ ส่วนอีกสองแถบเลยศูนย์ไปแล้ว"]
  },
  guide:[
    {say:["Room temperature, read three ways. All three bars describe exactly the same hotness.",
          "อุณหภูมิห้อง อ่านค่าได้สามแบบ ทั้งสามแถบบอกความร้อนระดับเดียวกันพอดี"], set:{c:25}},
    {say:["At 0 °C the kelvin bar still stands at 273. Celsius zero is a convention, not an absence of heat.",
          "ที่ 0 °C แถบเคลวินยังอยู่ที่ 273 ศูนย์เซลเซียสเป็นแค่ข้อตกลง ไม่ได้แปลว่าไม่มีความร้อน"], set:{c:0}},
    {say:["Only at −273 °C does kelvin reach zero. That is why every gas law insists on kelvin.",
          "เคลวินถึงศูนย์ที่ −273 °C เท่านั้น เราจึงต้องใช้เคลวินกับกฎของแก๊สทุกข้อ"], set:{c:-273}}
  ] },

{ id:"heat-capacity", x:100, y:150, requires:["temperature"], methods:["M-02","M-04"],
  title:["Heat and phase change","ความร้อนและการเปลี่ยนสถานะ"],
  body:[["Raising a substance's temperature costs Q = mcΔT, where c is the specific heat capacity. Water's is unusually large, which is why the sea moderates coastal climates and why a radiator is filled with it.",
         "Changing state costs Q = mL and happens at constant temperature — all the energy goes into breaking bonds, none into motion. Expecting the temperature to rise during melting or boiling is trap T-02."],
        ["การทำให้สารมีอุณหภูมิสูงขึ้นต้องใช้ความร้อน Q = mcΔT โดย c คือความจุความร้อนจำเพาะ น้ำมีค่า c สูงผิดปกติ ทะเลจึงช่วยให้อากาศชายฝั่งไม่ร้อนหรือเย็นจัด และหม้อน้ำรถก็ใช้น้ำเป็นตัวระบายความร้อน",
         "การเปลี่ยนสถานะต้องใช้ความร้อน Q = mL และเกิดที่อุณหภูมิคงที่ เพราะพลังงานทั้งหมดไปทำลายพันธะ ไม่ได้ไปทำให้อนุภาคเคลื่อนที่เร็วขึ้น ถ้าคิดว่าอุณหภูมิจะเพิ่มขึ้นขณะหลอมเหลวหรือเดือด ก็ตกกับดัก T-02"]],
  formula:["Q = mcΔT        Q = mL","Q = mcΔT        Q = mL"],
  flabel:["Phase change at constant temperature","เปลี่ยนสถานะที่อุณหภูมิคงที่"],
  viz:"plot",
  vizcfg:{
    title:["HEATING ICE ALL THE WAY TO STEAM","ให้ความร้อนน้ำแข็งจนกลายเป็นไอ"],
    xlab:["heat supplied (kJ)","ความร้อนที่ให้ (kJ)"], ylab:["temperature (°C)","อุณหภูมิ (°C)"],
    xmin:0, xmax:3200, fill:false,
    fn:function(x,p){
      var m=p.m;
      var q1=2.1*m*20, q2=334*m, q3=4.2*m*100, q4=2260*m;
      if(x<q1) return -20+x/(2.1*m);
      if(x<q1+q2) return 0;
      if(x<q1+q2+q3) return (x-q1-q2)/(4.2*m);
      if(x<q1+q2+q3+q4) return 100;
      return 100+(x-q1-q2-q3-q4)/(2.0*m);
    },
    mark:function(p){ return p.q; },
    ctrls:[
      {k:"m", lab:["Mass of water","มวลน้ำ"], min:.2, max:2, step:.1, def:1, unit:" kg"},
      {k:"q", lab:["Heat supplied","ความร้อนที่ให้"], min:0, max:3100, step:20, def:200, unit:" kJ"}
    ],
    readouts:[
      {lab:["Temperature now","อุณหภูมิขณะนี้"], f:function(S){
        var p=S.p, m=p.m, x=p.q;
        var q1=2.1*m*20, q2=334*m, q3=4.2*m*100, q4=2260*m;
        var T = x<q1 ? -20+x/(2.1*m) : x<q1+q2 ? 0 : x<q1+q2+q3 ? (x-q1-q2)/(4.2*m)
              : x<q1+q2+q3+q4 ? 100 : 100+(x-q1-q2-q3-q4)/(2.0*m);
        return fmt2(T)+" °C"; }},
      {lab:["State","สถานะ"], f:function(S){
        var p=S.p, m=p.m, x=p.q;
        var q1=2.1*m*20, q2=334*m, q3=4.2*m*100, q4=2260*m;
        var S2 = x<q1?["ice","น้ำแข็ง"] : x<q1+q2?["melting","กำลังหลอมเหลว"]
               : x<q1+q2+q3?["water","น้ำ"] : x<q1+q2+q3+q4?["boiling","กำลังเดือด"] : ["steam","ไอน้ำ"];
        return S2[L()]; }},
      {lab:["Why the flat parts","ทำไมจึงมีช่วงราบ"], f:function(){
        return L()?"ความร้อนแฝงไปทำลายพันธะ ไม่ได้ทำให้ร้อนขึ้น":"latent heat breaks bonds instead of raising temperature"; }},
      {lab:["Longest plateau","ช่วงราบที่ยาวที่สุด"], f:function(){
        return L()?"การเดือด — ต้องใช้พลังงานมากกว่าการหลอมเหลวเกือบเจ็ดเท่า":"boiling — it needs nearly seven times the melting energy"; }}
    ],
    note:["during a plateau you are pouring in energy and the thermometer does not move at all","ช่วงที่กราฟราบ เราใส่พลังงานเข้าไปเรื่อยๆ แต่เทอร์โมมิเตอร์ไม่ขยับเลย"]
  },
  guide:[
    {say:["Warming solid ice. The line climbs steeply because ice has a small heat capacity.",
          "อุ่นน้ำแข็งที่ยังเป็นของแข็ง เส้นกราฟชันขึ้นเพราะน้ำแข็งมีความจุความร้อนน้อย"], set:{m:1,q:20}},
    {say:["Now it melts. Energy keeps pouring in but the temperature is pinned at 0 °C.",
          "ตอนนี้น้ำแข็งกำลังหลอมเหลว พลังงานยังเข้าไปเรื่อยๆ แต่อุณหภูมิค้างอยู่ที่ 0 °C"], set:{m:1,q:200}},
    {say:["Boiling is the long flat stretch — vaporising water costs far more than melting ice.",
          "ช่วงเดือดคือช่วงราบที่ยาว การทำให้น้ำกลายเป็นไอใช้พลังงานมากกว่าการทำให้น้ำแข็งละลายมาก"], set:{m:1,q:1600}}
  ] },

{ id:"gas-laws", x:370, y:150, requires:["temperature"], methods:["M-03"],
  title:["The gas laws","กฎของแก๊ส"],
  body:[["Boyle found P ∝ 1/V at fixed temperature, Charles found V ∝ T at fixed pressure. Both are special cases of PV = nRT, which is the only one worth memorising.",
         "The isotherm below is Boyle's law drawn. Squeeze the volume and the pressure rises hyperbolically — halve V and you exactly double P, provided the temperature is held."],
        ["บอยล์พบว่า P ∝ 1/V เมื่ออุณหภูมิคงที่ ชาร์ลพบว่า V ∝ T เมื่อความดันคงที่ สองกฎนี้เป็นกรณีพิเศษของ PV = nRT ซึ่งเป็นสูตรเดียวที่ควรจำ",
         "เส้นไอโซเทอร์มด้านล่างคือกฎของบอยล์ที่วาดเป็นกราฟ เมื่อบีบปริมาตรลง ความดันจะเพิ่มขึ้นตามเส้นไฮเพอร์โบลา ลด V ลงครึ่งหนึ่ง P จะเป็นสองเท่าพอดี ถ้าอุณหภูมิคงที่"]],
  formula:["PV = nRT        P₁V₁/T₁ = P₂V₂/T₂","PV = nRT        P₁V₁/T₁ = P₂V₂/T₂"],
  flabel:["R = 8.31 J/mol·K","R = 8.31 J/mol·K"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){ return p.n*8.31*p.T/Math.max(x,0.002)/1000; },
    xmin:0.002, xmax:0.05, fill:true,
    title:["ISOTHERM · PRESSURE AGAINST VOLUME","ไอโซเทอร์ม · ความดัน เทียบ ปริมาตร"],
    xlab:["V (m³)","V (ลบ.ม.)"], ylab:["P (kPa)","P (กิโลปาสคาล)"],
    mark:function(p){ return p.V; },
    ctrls:[
      {k:"n", lab:["Amount n","ปริมาณ n"],       min:0.1, max:2,   step:.1,   def:1,     unit:" mol"},
      {k:"T", lab:["Temperature T","อุณหภูมิ T"], min:200, max:600, step:20,   def:300,   unit:" K"},
      {k:"V", lab:["Volume V","ปริมาตร V"],       min:0.005, max:0.05, step:.005, def:0.025, unit:" m³"}
    ],
    readouts:[
      {lab:["Pressure here","ความดัน ณ จุดนี้"], f:function(S){
        return fmt(S.p.n*8.31*S.p.T/S.p.V/1000)+" kPa"; }},
      {lab:["At half the volume","ที่ปริมาตรครึ่งหนึ่ง"], f:function(S){
        return fmt(S.p.n*8.31*S.p.T/(S.p.V/2)/1000)+" kPa"; }},
      {lab:["PV product","ผลคูณ PV"], f:function(S){
        return fmt(S.p.n*8.31*S.p.T)+" J"; }}
    ]
  },
  guide:[
    {say:["A hyperbola. Every point on this curve has the same temperature — that is what an isotherm means.",
          "นี่คือไฮเพอร์โบลา ทุกจุดบนเส้นนี้มีอุณหภูมิเท่ากัน ไอโซเทอร์มก็หมายความอย่างนั้น"], set:{n:1,T:300,V:0.03}},
    {say:["Halve the volume and read both pressures. The product PV stays fixed — that is Boyle's law.",
          "ลดปริมาตรลงครึ่งหนึ่ง แล้วอ่านค่าความดันทั้งสองค่า ผลคูณ PV ยังคงเดิม นี่คือกฎของบอยล์"], set:{n:1,T:300,V:0.015}},
    {say:["Now raise the temperature. The whole curve lifts — a hotter gas sits on a higher isotherm.",
          "ทีนี้เพิ่มอุณหภูมิ เส้นกราฟทั้งเส้นยกสูงขึ้น แก๊สที่ร้อนกว่าจะอยู่บนไอโซเทอร์มที่สูงกว่า"], set:{n:1,T:500,V:0.015}},
    {say:["More moles does the same thing. P depends on n and T together, and on V inversely.",
          "เพิ่มจำนวนโมลก็ให้ผลแบบเดียวกัน P ขึ้นกับ n และ T พร้อมกัน และแปรผกผันกับ V"], set:{n:2,T:300,V:0.015}}
  ]},

{ id:"kinetic", x:235, y:248, requires:["heat-capacity","gas-laws"], methods:["M-05"],
  title:["Kinetic theory","ทฤษฎีจลน์"],
  body:[["Pressure is molecules drumming on the walls. The average kinetic energy per molecule is (3/2)k_BT, which says something remarkable: temperature IS kinetic energy, up to a constant.",
         "The typical molecular speed is v_rms = √(3RT/M). Note the square root — quadrupling the absolute temperature only doubles the speed. Treating speed as proportional to T is trap T-04."],
        ["ความดันเกิดจากโมเลกุลที่วิ่งชนผนังรัวๆ พลังงานจลน์เฉลี่ยต่อโมเลกุลคือ (3/2)k_BT ซึ่งบอกอะไรที่น่าทึ่งว่า อุณหภูมิก็คือพลังงานจลน์นั่นเอง ต่างกันเพียงค่าคงตัว",
         "อัตราเร็วของโมเลกุลโดยทั่วไปคือ v_rms = √(3RT/M) สังเกตว่ามีรากที่สอง เมื่อเพิ่มอุณหภูมิสัมบูรณ์เป็นสี่เท่า อัตราเร็วเพิ่มเพียงสองเท่า ถ้าคิดว่าอัตราเร็วแปรผันตรงกับ T ก็ตกกับดัก T-04"]],
  formula:["Ē_k = (3/2)k_BT        v_rms = √(3RT/M)","Ē_k = (3/2)k_BT        v_rms = √(3RT/M)"],
  flabel:["Speed follows the square root of T","อัตราเร็วแปรตามรากที่สองของ T"],
  viz:"plot",
  vizcfg:{
    title:["HOW MOLECULAR SPEEDS ARE SPREAD","อัตราเร็วโมเลกุลกระจายตัวอย่างไร"],
    xlab:["molecular speed (m/s)","อัตราเร็วโมเลกุล (m/s)"], ylab:["how many molecules","จำนวนโมเลกุล"],
    xmin:0, xmax:2000, ymin:0, fill:true,
    fn:function(x,p){
      var a=p.T/300, s=340*Math.sqrt(a);
      return Math.pow(x/s,2)*Math.exp(-(x*x)/(2*s*s));
    },
    ctrls:[
      {k:"T", lab:["Temperature","อุณหภูมิ"], min:100, max:1200, step:25, def:300, unit:" K"}
    ],
    readouts:[
      {lab:["Most probable speed","อัตราเร็วที่น่าจะเป็นมากสุด"], f:function(S){
        return fmt2(340*Math.sqrt(S.p.T/300)*1.41)+" m/s"; }},
      {lab:["Average kinetic energy","พลังงานจลน์เฉลี่ย"], f:function(S){
        return fmt2(1.5*1.38e-23*S.p.T*1e21)+" × 10⁻²¹ J"; }},
      {lab:["Do all molecules share it?","โมเลกุลทุกตัวมีเท่ากันไหม"], f:function(){
        return L()?"ไม่ — มีการกระจาย อุณหภูมิบอกแค่ค่าเฉลี่ย":"no — there is a spread; temperature gives only the average"; }},
      {lab:["Raise the temperature","เมื่อเพิ่มอุณหภูมิ"], f:function(){
        return L()?"เส้นโค้งแบนลงและเลื่อนไปทางขวา":"the curve flattens and slides right"; }}
    ],
    note:["temperature is an average, and a hot gas still contains some very slow molecules","อุณหภูมิเป็นค่าเฉลี่ย ในแก๊สร้อนก็ยังมีโมเลกุลที่เคลื่อนที่ช้ามากปนอยู่บ้าง"]
  } },

{ id:"first-law", x:235, y:346, requires:["kinetic"], methods:["M-06"],
  title:["The first law","กฎข้อที่หนึ่ง"],
  body:[["Q = ΔU + W. Heat added either raises the internal energy or is spent doing work on the surroundings, and usually some of each. It is conservation of energy with a thermal vocabulary.",
         "The signs are where marks go. Q is positive when heat enters, W is positive when the gas expands. An isothermal change has ΔU = 0 so Q = W; an adiabatic one has Q = 0 so ΔU = −W. Reversing a sign is trap T-03."],
        ["Q = ΔU + W ความร้อนที่ให้เข้าไปจะเพิ่มพลังงานภายใน หรือถูกใช้ไปทำงานต่อสิ่งแวดล้อม และส่วนใหญ่เป็นทั้งสองอย่างรวมกัน นี่คือการอนุรักษ์พลังงานที่เขียนด้วยภาษาของความร้อน",
         "เครื่องหมายคือจุดที่เสียคะแนนบ่อย Q เป็นบวกเมื่อความร้อนเข้า W เป็นบวกเมื่อแก๊สขยายตัว กระบวนการอุณหภูมิคงที่มี ΔU = 0 จึงได้ Q = W ส่วนกระบวนการอะเดียแบติกมี Q = 0 จึงได้ ΔU = −W ถ้ากลับเครื่องหมายก็ตกกับดัก T-03"]],
  formula:["Q = ΔU + W        W = PΔV","Q = ΔU + W        W = PΔV"],
  flabel:["Q in positive · gas expanding positive","ความร้อนเข้าเป็นบวก · แก๊สขยายเป็นบวก"],
  viz:"stack",
  vizcfg:{
    title:["THE ENERGY BOOKKEEPING OF A GAS","บัญชีพลังงานของแก๊ส"],
    total:["heat supplied Q","ความร้อนที่ให้ Q"],
    ctrls:[
      {k:"Q", lab:["Heat supplied Q","ความร้อนที่ให้ Q"], min:0, max:500, step:10, def:300, unit:" J"},
      {k:"W", lab:["Work done BY the gas","งานที่แก๊สทำ"], min:0, max:500, step:10, def:120, unit:" J"}
    ],
    readouts:[
      {lab:["Change in internal energy","พลังงานภายในที่เปลี่ยน"], f:function(S){
        return fmt2(S.p.Q-S.p.W)+" J"; }},
      {lab:["Temperature","อุณหภูมิ"], f:function(S){
        var d=S.p.Q-S.p.W;
        return d>0 ? (L()?"สูงขึ้น":"rises") : d<0 ? (L()?"ลดลง":"falls") : (L()?"คงที่ — ไอโซเทอร์มอล":"unchanged — isothermal"); }},
      {lab:["If no work is done","ถ้าไม่มีการทำงาน"], f:function(){
        return L()?"ความร้อนทั้งหมดกลายเป็นพลังงานภายใน":"every joule of heat becomes internal energy"; }},
      {lab:["Sign convention","หลักเครื่องหมาย"], f:function(){
        return L()?"Q เข้าเป็นบวก · W ที่แก๊สทำเป็นบวก":"Q into the gas is positive; W done BY the gas is positive"; }}
    ],
    parts:function(p){
      var d=p.Q-p.W;
      return [{v:Math.max(0,d), lab:["internal energy ΔU","พลังงานภายใน ΔU"], col:"accent"},
              {v:Math.min(p.Q,p.W), lab:["work done W","งานที่ทำ W"], col:"good"}];
    },
    note:["heat in splits between warming the gas and pushing the piston — nothing else","ความร้อนที่ใส่เข้าไปแบ่งเป็นสองส่วนเท่านั้น คือทำให้แก๊สร้อนขึ้น กับดันลูกสูบ"]
  } }
],

methods:[
{id:"M-01", name:["Convert temperature to kelvin","แปลงอุณหภูมิเป็นเคลวิน"]},
{id:"M-02", name:["Apply Q = mcΔT and Q = mL","ใช้ Q = mcΔT และ Q = mL"]},
{id:"M-03", name:["Apply the gas laws","ใช้กฎของแก๊ส"]},
{id:"M-04", name:["Thermal equilibrium in a mixture","สมดุลความร้อนของของผสม"]},
{id:"M-05", name:["Kinetic theory of gases","ทฤษฎีจลน์ของแก๊ส"]},
{id:"M-06", name:["Apply the first law with signs","ใช้กฎข้อหนึ่งพร้อมเครื่องหมาย"]}
],

traps:{
"T-01":["Celsius was used where kelvin is required. Every gas law needs absolute temperature.","ใช้เซลเซียสในที่ที่ต้องใช้เคลวิน กฎของแก๊สทุกข้อต้องใช้อุณหภูมิสัมบูรณ์"],
"T-02":["During a phase change the temperature does not rise. That energy is Q = mL, not mcΔT.","ระหว่างเปลี่ยนสถานะ อุณหภูมิไม่เพิ่มขึ้น พลังงานช่วงนี้คือ Q = mL ไม่ใช่ mcΔT"],
"T-03":["First-law sign convention. Q is positive entering; W is positive when the gas expands.","เครื่องหมายในกฎข้อที่หนึ่ง Q เป็นบวกเมื่อความร้อนเข้า W เป็นบวกเมื่อแก๊สขยายตัว"],
"T-04":["Molecular speed goes as the square root of temperature, not as temperature itself.","อัตราเร็วของโมเลกุลแปรตามรากที่สองของอุณหภูมิ ไม่ได้แปรตามอุณหภูมิโดยตรง"]
},

gen:{
"M-01": function(sf){
  var c=pick([0,25,27,100,-73]);
  if(sf==="S-04") return {stem:["Why must kelvin be used in the gas laws rather than celsius?",
                                "ทำไมกฎของแก๊สต้องใช้เคลวิน ไม่ใช้เซลเซียส"],
    opts:[{v:["Kelvin starts at absolute zero, so ratios are meaningful","เคลวินเริ่มที่ศูนย์สัมบูรณ์ อัตราส่วนจึงมีความหมาย"],ok:1},
          {v:["Kelvin is the larger unit","เคลวินเป็นหน่วยที่ใหญ่กว่า"],trap:"T-01"},
          {v:["Celsius cannot be negative","เซลเซียสติดลบไม่ได้"]},
          {v:["It makes no difference","ไม่ต่างกัน"],trap:"T-01"}],unit:""};
  return {stem:["Convert "+c+" °C to kelvin.","จงแปลง "+c+" องศาเซลเซียส เป็นเคลวิน"],
    opts:[{v:String(c+273),ok:1},{v:String(c),trap:"T-01"},{v:String(273-c)},{v:String(c+100)}],unit:" K"};
},
"M-02": function(sf){
  var m=pick([0.2,0.5,2]), c=4200, dT=pick([10,20,50]), L=3.3e5;
  var Q=m*c*dT, Ql=m*L;
  if(sf==="S-04") return {stem:["Ice at 0 °C is heated while melting. What happens to its temperature?",
                                "ให้ความร้อนแก่น้ำแข็งที่ 0 องศาเซลเซียสขณะกำลังหลอมเหลว อุณหภูมิจะเป็นอย่างไร"],
    opts:[{v:["It stays at 0 °C until all the ice has melted","คงที่ที่ 0 องศาเซลเซียส จนกว่าน้ำแข็งจะละลายหมด"],ok:1},
          {v:["It rises steadily","สูงขึ้นเรื่อยๆ"],trap:"T-02"},
          {v:["It rises then falls","สูงขึ้นแล้วลดลง"],trap:"T-02"},
          {v:["It falls","ลดลง"]}],unit:""};
  if(sf==="S-03") return {stem:["How much energy melts "+m+" kg of ice at 0 °C? Take L = 3.3 × 10⁵ J/kg.",
                                "ต้องใช้พลังงานเท่าใดในการหลอมน้ำแข็ง "+m+" กิโลกรัม ที่ 0 องศาเซลเซียส ให้ L = 3.3 × 10⁵ จูล/กก."],
    opts:[{v:Ql.toExponential(2),ok:1},{v:(m*4200*0).toExponential(2),trap:"T-02"},
          {v:(Ql/2).toExponential(2)},{v:(m*L*2).toExponential(2)}],unit:" J"};
  return {stem:["Find the energy needed to raise "+m+" kg of water by "+dT+" °C, with c = 4200 J/kg·K.",
                "จงหาพลังงานที่ต้องใช้เพื่อเพิ่มอุณหภูมิน้ำ "+m+" กิโลกรัม ขึ้น "+dT+" องศาเซลเซียส โดย c = 4200 จูล/กก.·เคลวิน"],
    opts:[{v:Q.toExponential(2),ok:1},{v:(Q/dT).toExponential(2)},{v:(m*dT).toExponential(2)},{v:(Q*2).toExponential(2)}],unit:" J"};
},
"M-03": function(sf){
  var P1=pick([100,200]), V1=pick([2,4,6]), V2=pick([1,3,8]);
  var P2=P1*V1/V2;
  var T1=pick([300,400]), T2=pick([600,200]);
  if(sf==="S-04") return {stem:["A gas is compressed to half its volume at constant temperature. Its pressure:",
                                "อัดแก๊สจนปริมาตรเหลือครึ่งหนึ่งที่อุณหภูมิคงที่ ความดันจะ"],
    opts:[{v:["Doubles","เพิ่มเป็นสองเท่า"],ok:1},{v:["Halves","ลดลงครึ่งหนึ่ง"]},
          {v:["Is unchanged","เท่าเดิม"]},{v:["Quadruples","เพิ่มเป็นสี่เท่า"]}],unit:""};
  if(sf==="S-05") return {stem:["A gas at "+T1+" K is heated at constant pressure until its volume doubles. Find its new temperature.",
                                "แก๊สที่ "+T1+" เคลวิน ถูกให้ความร้อนที่ความดันคงที่จนปริมาตรเป็นสองเท่า จงหาอุณหภูมิใหม่"],
    opts:[{v:String(T1*2),ok:1},{v:String(T1/2)},{v:String(T1),trap:"T-01"},{v:String(T1+273),trap:"T-01"}],unit:" K"};
  return {stem:["A gas at "+P1+" kPa occupies "+V1+" L. At constant temperature it is squeezed to "+V2+" L. Find the new pressure.",
                "แก๊สที่ "+P1+" กิโลปาสคาล มีปริมาตร "+V1+" ลิตร ถูกบีบเหลือ "+V2+" ลิตร ที่อุณหภูมิคงที่ จงหาความดันใหม่"],
    opts:[{v:fmt(P2),ok:1},{v:fmt(P1*V2/V1)},{v:String(P1)},{v:fmt(P2*2)}],unit:" kPa"};
},
"M-04": function(sf){
  var m1=pick([0.2,0.5]), T1=pick([80,90]), m2=pick([0.3,1]), T2=pick([10,20]);
  var Tf=(m1*T1+m2*T2)/(m1+m2);
  if(sf==="S-04") return {stem:["Two objects at different temperatures touch. Heat flows until:",
                                "วัตถุสองชิ้นที่มีอุณหภูมิต่างกันสัมผัสกัน ความร้อนจะไหลจนกระทั่ง"],
    opts:[{v:["Their temperatures are equal","อุณหภูมิเท่ากัน"],ok:1},
          {v:["Their internal energies are equal","พลังงานภายในเท่ากัน"]},
          {v:["Their masses are equal","มวลเท่ากัน"]},
          {v:["The hotter one reaches 0 °C","ชิ้นที่ร้อนกว่าลดถึง 0 องศาเซลเซียส"]}],unit:""};
  return {stem:[m1+" kg of water at "+T1+" °C is mixed with "+m2+" kg at "+T2+" °C. Find the final temperature.",
                "ผสมน้ำ "+m1+" กิโลกรัม ที่ "+T1+" องศาเซลเซียส กับ "+m2+" กิโลกรัม ที่ "+T2+" องศาเซลเซียส จงหาอุณหภูมิสุดท้าย"],
    opts:[{v:fmt(Tf),ok:1},{v:fmt((T1+T2)/2),trap:"T-02"},{v:String(T1)},{v:String(T2)}],unit:" °C"};
},
"M-05": function(sf){
  var T=pick([300,400,600]), M=pick([0.028,0.032,0.004]);
  var v=Math.sqrt(3*8.31*T/M);
  if(sf==="S-04") return {stem:["The absolute temperature of a gas is quadrupled. Its rms speed:",
                                "อุณหภูมิสัมบูรณ์ของแก๊สเพิ่มเป็นสี่เท่า อัตราเร็ว rms จะ"],
    opts:[{v:["Doubles","เพิ่มเป็นสองเท่า"],ok:1},{v:["Quadruples","เพิ่มเป็นสี่เท่า"],trap:"T-04"},
          {v:["Is unchanged","เท่าเดิม"]},{v:["Rises sixteen times","เพิ่มสิบหกเท่า"],trap:"T-04"}],unit:""};
  if(sf==="S-03") return {stem:["What does the average kinetic energy of a gas molecule depend on?",
                                "พลังงานจลน์เฉลี่ยของโมเลกุลแก๊สขึ้นอยู่กับอะไร"],
    opts:[{v:["Absolute temperature only","อุณหภูมิสัมบูรณ์เท่านั้น"],ok:1},
          {v:["Temperature and molar mass","อุณหภูมิและมวลโมลาร์"],trap:"T-04"},
          {v:["Pressure only","ความดันเท่านั้น"]},{v:["Volume only","ปริมาตรเท่านั้น"]}],unit:""};
  return {stem:["Find v_rms for a gas of molar mass "+M+" kg/mol at "+T+" K, with R = 8.31.",
                "จงหา v_rms ของแก๊สมวลโมลาร์ "+M+" กก./โมล ที่ "+T+" เคลวิน โดย R = 8.31"],
    opts:[{v:fmt(v),ok:1},{v:fmt(3*8.31*T/M),trap:"T-04"},{v:fmt(v/2)},{v:fmt(Math.sqrt(T))}],unit:" m/s"};
},
"M-06": function(sf){
  var Q=pick([500,1200,2000]), W=pick([200,400,800]);
  var dU=Q-W;
  if(sf==="S-04") return {stem:["A gas expands with no heat entering or leaving. What happens to its internal energy?",
                                "แก๊สขยายตัวโดยไม่มีความร้อนเข้าหรือออก พลังงานภายในจะเป็นอย่างไร"],
    opts:[{v:["It falls, since ΔU = −W","ลดลง เพราะ ΔU = −W"],ok:1},
          {v:["It rises","เพิ่มขึ้น"],trap:"T-03"},{v:["It is unchanged","เท่าเดิม"],trap:"T-03"},
          {v:["It becomes zero","กลายเป็นศูนย์"]}],unit:""};
  if(sf==="S-03") return {stem:["In an isothermal expansion, how do Q and W compare?",
                                "ในการขยายตัวแบบอุณหภูมิคงที่ Q กับ W เกี่ยวข้องกันอย่างไร"],
    opts:[{v:["Q = W, because ΔU = 0","Q = W เพราะ ΔU = 0"],ok:1},
          {v:["Q = −W","Q = −W"],trap:"T-03"},{v:["Q = 0","Q = 0"],trap:"T-03"},
          {v:["W = 0","W = 0"]}],unit:""};
  return {stem:[Q+" J of heat is added to a gas which does "+W+" J of work. Find the change in internal energy.",
                "ใส่ความร้อน "+Q+" จูล ให้แก๊สที่ทำงาน "+W+" จูล จงหาการเปลี่ยนแปลงพลังงานภายใน"],
    opts:[{v:String(dU),ok:1},{v:String(Q+W),trap:"T-03"},{v:String(-dU),trap:"T-03"},{v:String(Q)}],unit:" J"};
}
}
};
