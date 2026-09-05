var CHAPTER = {
id:"ch20", num:"20", slug:"nuclear-physics", subject:"physics",
kicker:["Physics · Chapter 20","ฟิสิกส์ · บทที่ 20"],
title:["Nuclear and Particle","นิวเคลียร์และอนุภาค"],
mapTitle:["Where mass becomes energy","เมื่อมวลกลายเป็นพลังงาน"],
lede:["The nucleus is the one place where the bookkeeping of mass and the bookkeeping of energy turn out to be the same ledger. Everything here — decay, fission, fusion, the sun — follows from that single fact.",
      "นิวเคลียสคือที่แห่งเดียวที่บัญชีของมวลกับบัญชีของพลังงานกลายเป็นบัญชีเดียวกัน ทุกอย่างในบทนี้ ทั้งการสลาย ฟิชชัน ฟิวชัน และดวงอาทิตย์ ล้วนตามมาจากข้อเท็จจริงเดียวนั้น"],
next:null,

nodes:[
{ id:"nucleus", x:235, y:52, requires:[], methods:["M-01"],
  title:["The nucleus","นิวเคลียส"],
  body:[["A nuclide is written ᴬ_Z X: A is the nucleon number, Z the proton number, and A − Z the neutron count. Isotopes share Z and differ in A — same chemistry, different nuclear behaviour entirely.",
         "Every nuclear equation must balance twice over: the A values on each side must sum equally, and so must the Z values. That double check catches most errors before any physics is needed."],
        ["นิวไคลด์เขียนเป็น ᴬ_Z X โดย A คือเลขมวล Z คือเลขอะตอม และ A − Z คือจำนวนนิวตรอน ไอโซโทปมี Z เท่ากันแต่ A ต่างกัน เคมีเหมือนกัน แต่พฤติกรรมทางนิวเคลียร์ต่างกันสิ้นเชิง",
         "สมการนิวเคลียร์ทุกสมการต้องดุลสองชั้น ค่า A ทั้งสองข้างต้องรวมได้เท่ากัน และค่า Z ก็เช่นกัน การตรวจสองชั้นนี้จับข้อผิดพลาดได้เกือบหมดก่อนที่จะต้องใช้ฟิสิกส์ใดๆ"]],
  formula:["ᴬ_Z X        A balances · Z balances","ᴬ_Z X        A ดุล · Z ดุล"],
  flabel:["Balance top and bottom","ดุลทั้งบนและล่าง"],
  viz:"grid",
  vizcfg:{
    title:["WHAT THE NUCLEUS IS MADE OF","นิวเคลียสประกอบด้วยอะไร"],
    cols:[["Particle","อนุภาค"],["Charge","ประจุ"],["Relative mass","มวลเปรียบเทียบ"],["Where it sits","อยู่ที่ไหน"]],
    ctrls:[{k:"i", lab:["Highlight particle","เน้นอนุภาค"], min:0, max:2, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Particle","อนุภาค"], f:function(S){
        return [["Proton","โปรตอน"],["Neutron","นิวตรอน"],["Electron","อิเล็กตรอน"]][S.p.i][L()]; }},
      {lab:["Atomic number Z counts","เลขอะตอม Z นับ"], f:function(){
        return L()?"โปรตอน — เป็นตัวกำหนดธาตุ":"protons — they decide which element it is"; }},
      {lab:["Mass number A counts","เลขมวล A นับ"], f:function(){
        return L()?"โปรตอนบวกนิวตรอน":"protons plus neutrons"; }},
      {lab:["Isotopes differ in","ไอโซโทปต่างกันที่"], f:function(){
        return L()?"จำนวนนิวตรอนเท่านั้น — เคมีเหมือนกัน":"neutrons only — the chemistry is identical"; }}
    ],
    rows:function(p){
      var R=[[["Proton","โปรตอน"],["+1","+1"],["1","1"],["in the nucleus","ในนิวเคลียส"]],
             [["Neutron","นิวตรอน"],["0","0"],["1","1"],["in the nucleus","ในนิวเคลียส"]],
             [["Electron","อิเล็กตรอน"],["−1","−1"],["1/1836","1/1836"],["orbiting outside","โคจรอยู่ภายนอก"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===0?"ink":"accent"}; }); });
    },
    note:["almost all the mass is in the nucleus, and almost all the volume is not","มวลเกือบทั้งหมดอยู่ในนิวเคลียส และปริมาตรเกือบทั้งหมดไม่ได้อยู่ที่นั่น"]
  } },

{ id:"decay", x:100, y:150, requires:["nucleus"], methods:["M-02"],
  title:["Radioactive decay","การสลายกัมมันตรังสี"],
  body:[["Alpha emission ejects a helium nucleus: A falls by 4, Z by 2. Beta-minus turns a neutron into a proton, so Z rises by 1 while A is unchanged. Gamma carries away energy alone and changes neither.",
         "Penetration and ionisation run in opposite directions. Alpha is stopped by paper but ionises ferociously; gamma passes through lead but ionises weakly. Reversing that pairing is trap T-04."],
        ["การปล่อยแอลฟาคือการขับนิวเคลียสฮีเลียมออกมา A ลดลง 4 และ Z ลดลง 2 บีตาลบเปลี่ยนนิวตรอนเป็นโปรตอน Z จึงเพิ่มขึ้น 1 ขณะที่ A ไม่เปลี่ยน ส่วนแกมมาพาไปเพียงพลังงานและไม่เปลี่ยนทั้งคู่",
         "อำนาจทะลุทะลวงกับอำนาจการแตกตัวเรียงตรงข้ามกัน แอลฟาถูกกระดาษหยุดได้แต่ทำให้แตกตัวได้รุนแรง ส่วนแกมมาทะลุตะกั่วได้แต่ทำให้แตกตัวได้น้อย การสลับคู่นี้คือกับดัก T-04"]],
  formula:["α: A−4, Z−2    β⁻: A same, Z+1    γ: neither","α: A−4, Z−2    β⁻: A เท่าเดิม, Z+1    γ: ไม่เปลี่ยนทั้งคู่"],
  flabel:["Penetration and ionisation are opposites","ทะลุทะลวงกับแตกตัวเป็นตรงข้ามกัน"],
  viz:"grid",
  vizcfg:{
    title:["WHAT EACH DECAY DOES TO A AND Z","การสลายแต่ละแบบทำอะไรกับ A และ Z"],
    cols:[["Decay","การสลาย"],["Change in A","A เปลี่ยน"],["Change in Z","Z เปลี่ยน"],["Penetration","อำนาจทะลุทะลวง"]],
    ctrls:[{k:"i", lab:["Highlight decay","เน้นการสลาย"], min:0, max:2, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Decay","การสลาย"], f:function(S){
        return [["Alpha","แอลฟา"],["Beta minus","บีตาลบ"],["Gamma","แกมมา"]][S.p.i][L()]; }},
      {lab:["What is emitted","สิ่งที่ปล่อยออกมา"], f:function(S){
        return [["a helium nucleus","นิวเคลียสฮีเลียม"],["an electron from a neutron","อิเล็กตรอนจากนิวตรอน"],
                ["a photon, no particle","โฟตอน ไม่ใช่อนุภาค"]][S.p.i][L()]; }},
      {lab:["Does the element change?","ธาตุเปลี่ยนไหม"], f:function(S){
        return S.p.i===2 ? (L()?"ไม่ — Z เท่าเดิม":"no — Z is unchanged") : (L()?"ใช่":"yes"); }},
      {lab:["Stopped by","หยุดได้ด้วย"], f:function(S){
        return [["a sheet of paper","กระดาษหนึ่งแผ่น"],["a few mm of aluminium","อะลูมิเนียมไม่กี่มิลลิเมตร"],
                ["thick lead, and never fully","ตะกั่วหนา และไม่เคยหยุดได้หมด"]][S.p.i][L()]; }}
    ],
    rows:function(p){
      var R=[[["Alpha α","แอลฟา α"],["−4","−4"],["−2","−2"],["lowest","ต่ำสุด"]],
             [["Beta β⁻","บีตา β⁻"],["0","0"],["+1","+1"],["medium","ปานกลาง"]],
             [["Gamma γ","แกมมา γ"],["0","0"],["0","0"],["highest","สูงสุด"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===0?"ink":(j===3?"warn":"accent")}; }); });
    },
    note:["beta raises Z without touching A — a neutron simply turns into a proton","บีตาเพิ่ม Z โดยไม่แตะ A นิวตรอนเปลี่ยนเป็นโปรตอนเฉยๆ"]
  } },

{ id:"half-life", x:370, y:150, requires:["nucleus"], methods:["M-03","M-04"],
  title:["Half-life","ครึ่งชีวิต"],
  body:[["Decay is random for any single nucleus but exactly predictable for a large number. After each half-life, half of whatever remains has gone: N = N₀ / 2ⁿ, where n is the number of half-lives elapsed.",
         "The curve never reaches zero, it only halves forever. Dividing by n instead of by 2ⁿ is trap T-02, and it is the most frequent arithmetic slip in the chapter."],
        ["การสลายเป็นแบบสุ่มสำหรับนิวเคลียสเดี่ยว แต่ทำนายได้แม่นยำสำหรับจำนวนมาก หลังแต่ละครึ่งชีวิต ครึ่งหนึ่งของสิ่งที่เหลืออยู่จะหายไป N = N₀ / 2ⁿ โดย n คือจำนวนครึ่งชีวิตที่ผ่านไป",
         "เส้นกราฟไม่มีวันถึงศูนย์ มันเพียงลดครึ่งไปเรื่อยๆ การหารด้วย n แทนที่จะเป็น 2ⁿ คือกับดัก T-02 และเป็นความผิดพลาดทางเลขที่พบบ่อยที่สุดในบทนี้"]],
  formula:["N = N₀ / 2ⁿ        A = λN        λ = ln2 / T½","N = N₀ / 2ⁿ        A = λN        λ = ln2 / T½"],
  flabel:["Halves forever, never reaches zero","ลดครึ่งไปเรื่อยๆ ไม่ถึงศูนย์"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){ return p.N0*Math.pow(0.5, x/p.T); },
    xmin:0, xmax:40, fill:true,
    title:["RADIOACTIVE DECAY","การสลายกัมมันตรังสี"],
    xlab:["time (days)","เวลา (วัน)"], ylab:["N remaining","N ที่เหลือ"],
    mark:function(p){ return p.t; },
    ctrls:[
      {k:"N0", lab:["Initial nuclei N₀","จำนวนเริ่มต้น N₀"], min:100, max:1000, step:100, def:800, unit:""},
      {k:"T",  lab:["Half-life","ครึ่งชีวิต"],                min:2,   max:20,   step:1,   def:5,   unit:" d"},
      {k:"t",  lab:["Time elapsed","เวลาที่ผ่านไป"],           min:0,   max:40,   step:1,   def:10,  unit:" d"}
    ],
    readouts:[
      {lab:["Remaining","เหลืออยู่"], f:function(S){
        return String(Math.round(S.p.N0*Math.pow(0.5,S.p.t/S.p.T))); }},
      {lab:["Half-lives elapsed","ครึ่งชีวิตที่ผ่านไป"], f:function(S){
        return fmt(S.p.t/S.p.T); }},
      {lab:["Fraction left","สัดส่วนที่เหลือ"], f:function(S){
        return fmt2(Math.pow(0.5,S.p.t/S.p.T)*100)+" %"; }}
    ]
  },
  guide:[
    {say:["Half-life 5 days. Set the time to 5 and read the count — exactly half of what you started with.",
          "ครึ่งชีวิต 5 วัน ตั้งเวลาเป็น 5 แล้วอ่านจำนวน จะเหลือครึ่งหนึ่งของที่เริ่มต้นพอดี"], set:{N0:800,T:5,t:5}},
    {say:["Now 10 days — two half-lives. A quarter remains, not zero. Each halving applies to what is left.",
          "ทีนี้ 10 วัน คือสองครึ่งชีวิต เหลือหนึ่งในสี่ ไม่ใช่ศูนย์ การลดครึ่งแต่ละครั้งคิดจากสิ่งที่เหลืออยู่"], set:{N0:800,T:5,t:10}},
    {say:["Push time to 40 days — eight half-lives. Under four nuclei left, but the curve still has not touched zero.",
          "ดันเวลาไปที่ 40 วัน คือแปดครึ่งชีวิต เหลือไม่ถึงสี่นิวเคลียส แต่เส้นกราฟยังไม่แตะศูนย์"], set:{N0:800,T:5,t:40}},
    {say:["Lengthen the half-life and the whole curve stretches out. A long half-life means a weakly active source.",
          "เพิ่มครึ่งชีวิตแล้วเส้นกราฟทั้งเส้นยืดออก ครึ่งชีวิตยาวหมายถึงแหล่งกำเนิดที่มีกัมมันตภาพต่ำ"], set:{N0:800,T:15,t:10}}
  ]},

{ id:"mass-energy", x:235, y:248, requires:["decay","half-life"], methods:["M-05"],
  title:["Mass and binding energy","มวลและพลังงานยึดเหนี่ยว"],
  body:[["A nucleus weighs less than its separate nucleons. That missing mass, the mass defect, is the energy that was released when it formed: E = Δmc².",
         "In atomic mass units the arithmetic is quick — 1 u releases 931.5 MeV. The binding energy per nucleon peaks around iron, which is precisely why light nuclei release energy by fusing and heavy ones by splitting."],
        ["นิวเคลียสมีมวลน้อยกว่านิวคลีออนที่แยกกันอยู่ มวลที่หายไปนั้นคือมวลพร่อง ซึ่งเป็นพลังงานที่ถูกปลดปล่อยตอนที่มันก่อตัวขึ้น E = Δmc²",
         "ในหน่วยมวลอะตอมการคำนวณจะเร็ว 1 u ให้พลังงาน 931.5 MeV พลังงานยึดเหนี่ยวต่อนิวคลีออนสูงสุดราวธาตุเหล็ก ซึ่งเป็นเหตุผลที่นิวเคลียสเบาปล่อยพลังงานด้วยการหลอมรวม และนิวเคลียสหนักด้วยการแตกตัว"]],
  formula:["E = Δmc²        1 u → 931.5 MeV","E = Δmc²        1 u → 931.5 MeV"],
  flabel:["Binding energy peaks at iron","พลังงานยึดเหนี่ยวสูงสุดที่เหล็ก"],
  viz:"bars",
  vizcfg:{
    title:["THE MISSING MASS IS THE BINDING ENERGY","มวลที่หายไปคือพลังงานยึดเหนี่ยว"],
    ylab:["u  ·  MeV","u  ·  MeV"],
    ctrls:[
      {k:"Z",  lab:["Protons Z","โปรตอน Z"], min:1, max:30, step:1, def:2, unit:""},
      {k:"N",  lab:["Neutrons N","นิวตรอน N"], min:1, max:40, step:1, def:2, unit:""},
      {k:"dm", lab:["Mass defect","มวลพร่อง"], min:.005, max:.5, step:.005, def:.03, unit:" u"}
    ],
    readouts:[
      {lab:["Mass of the separate parts","มวลของชิ้นส่วนแยกกัน"], f:function(S){
        return fmt2(S.p.Z*1.00728+S.p.N*1.00867)+" u"; }},
      {lab:["Mass of the nucleus","มวลนิวเคลียส"], f:function(S){
        return fmt2(S.p.Z*1.00728+S.p.N*1.00867-S.p.dm)+" u"; }},
      {lab:["Binding energy","พลังงานยึดเหนี่ยว"], f:function(S){ return fmt2(S.p.dm*931.5)+" MeV"; }},
      {lab:["Per nucleon","ต่อนิวคลีออน"], f:function(S){
        return fmt2(S.p.dm*931.5/(S.p.Z+S.p.N))+" MeV"; }}
    ],
    bars:[
      {lab:["Parts apart","ชิ้นส่วนแยกกัน"], f:function(p){ return p.Z*1.00728+p.N*1.00867; }, col:"faint"},
      {lab:["Nucleus","นิวเคลียส"], f:function(p){ return p.Z*1.00728+p.N*1.00867-p.dm; }, col:"accent"},
      {lab:["Binding energy (MeV)","พลังงานยึดเหนี่ยว (MeV)"], f:function(p){ return p.dm*931.5; }, col:"good"}
    ],
    note:["a bound nucleus weighs LESS than its pieces — the difference left as energy","นิวเคลียสที่ยึดกันอยู่เบากว่าชิ้นส่วนของมัน ส่วนต่างออกไปเป็นพลังงาน"]
  } },

{ id:"fission-fusion", x:235, y:346, requires:["mass-energy"], methods:["M-06"],
  title:["Fission and fusion","ฟิชชันและฟิวชัน"],
  body:[["Fission splits a heavy nucleus, releasing neutrons that can split others — a chain reaction, which is what a reactor moderates and a bomb does not. Fusion joins light nuclei, and releases far more energy per kilogram.",
         "Both move mass towards iron on the binding-energy curve, and both convert the difference into energy. Fusion powers every star, including the one that makes this planet habitable; we still cannot sustain it on Earth."],
        ["ฟิชชันคือการแยกนิวเคลียสหนัก ปล่อยนิวตรอนที่ไปแยกนิวเคลียสอื่นต่อ เกิดเป็นปฏิกิริยาลูกโซ่ ซึ่งเตาปฏิกรณ์คอยหน่วงไว้ ส่วนระเบิดไม่หน่วง ฟิวชันคือการรวมนิวเคลียสเบา และปล่อยพลังงานต่อกิโลกรัมมากกว่ามาก",
         "ทั้งสองเคลื่อนมวลเข้าหาเหล็กบนเส้นโค้งพลังงานยึดเหนี่ยว และทั้งสองเปลี่ยนผลต่างเป็นพลังงาน ฟิวชันขับเคลื่อนดาวฤกษ์ทุกดวง รวมถึงดวงที่ทำให้โลกนี้อยู่อาศัยได้ เรายังคงรักษาปฏิกิริยานี้บนโลกไม่ได้"]],
  formula:["Fission: heavy → lighter        Fusion: light → heavier","ฟิชชัน: หนัก → เบาลง        ฟิวชัน: เบา → หนักขึ้น"],
  flabel:["Both move towards iron","ทั้งคู่เคลื่อนเข้าหาเหล็ก"],
  viz:"plot",
  vizcfg:{
    title:["BINDING ENERGY PER NUCLEON","พลังงานยึดเหนี่ยวต่อนิวคลีออน"],
    xlab:["mass number A","เลขมวล A"], ylab:["MeV per nucleon","MeV ต่อนิวคลีออน"],
    xmin:1, xmax:240, ymin:0, fill:false,
    fn:function(x,p){ return 8.8*Math.exp(-Math.pow(Math.log(x/56),2)/2.6) ; },
    mark:function(p){ return p.A; },
    ctrls:[
      {k:"A", lab:["Mass number","เลขมวล"], min:2, max:238, step:2, def:238, unit:""}
    ],
    readouts:[
      {lab:["Binding energy per nucleon","พลังงานยึดเหนี่ยวต่อนิวคลีออน"], f:function(S){
        return fmt2(8.8*Math.exp(-Math.pow(Math.log(S.p.A/56),2)/2.6))+" MeV"; }},
      {lab:["Which way releases energy","ทางไหนปลดปล่อยพลังงาน"], f:function(S){
        return S.p.A<56 ? (L()?"หลอมรวม — ไต่ขึ้นเนิน":"fusion — climbing towards the peak")
             : S.p.A>56 ? (L()?"แบ่งแยก — ไต่ขึ้นเนินจากอีกฝั่ง":"fission — climbing the peak from the other side")
             : (L()?"อยู่ที่ยอดแล้ว — ไม่ปลดปล่อยทางใด":"already at the peak — neither releases"); }},
      {lab:["The most stable nucleus","นิวเคลียสที่เสถียรที่สุด"], f:function(){
        return L()?"เหล็ก-56 ที่ยอดเนิน":"iron-56, right at the summit"; }},
      {lab:["Why both release energy","ทำไมทั้งสองจึงปลดปล่อยพลังงาน"], f:function(){
        return L()?"ทั้งคู่เคลื่อนเข้าหายอด ไม่ใช่ไปทางเดียวกัน":"both move TOWARDS the peak, from opposite sides"; }}
    ],
    note:["everything wants to climb this hill — light nuclei fuse upward, heavy ones split upward","ทุกอย่างอยากไต่ขึ้นเนินนี้ นิวเคลียสเบาหลอมรวมขึ้นไป นิวเคลียสหนักแบ่งแยกขึ้นไป"]
  },
  guide:[
    {say:["Uranium sits far down the right-hand slope. Splitting it moves the fragments UP the curve.",
          "ยูเรเนียมอยู่ต่ำลงไปทางลาดขวา การแบ่งแยกมันทำให้ชิ้นส่วนเลื่อนขึ้นบนเส้นโค้ง"], set:{A:238}},
    {say:["Iron-56 is the summit. Nothing gains energy by changing — this is the end of the road.",
          "เหล็ก-56 คือยอดเนิน ไม่มีอะไรได้พลังงานจากการเปลี่ยนแปลง นี่คือปลายทาง"], set:{A:56}},
    {say:["Hydrogen and helium sit low on the left. Fusing them climbs the steepest part of the hill.",
          "ไฮโดรเจนกับฮีเลียมอยู่ต่ำทางซ้าย การหลอมรวมพวกมันคือการไต่ส่วนที่ชันที่สุดของเนิน"], set:{A:4}}
  ] }
],

methods:[
{id:"M-01", name:["Balance a nuclear equation","ดุลสมการนิวเคลียร์"]},
{id:"M-02", name:["Identify a decay from A and Z","ระบุการสลายจาก A และ Z"]},
{id:"M-03", name:["Half-life calculations","คำนวณครึ่งชีวิต"]},
{id:"M-04", name:["Activity and decay constant","กัมมันตภาพและค่าคงตัวการสลาย"]},
{id:"M-05", name:["Mass defect and binding energy","มวลพร่องและพลังงานยึดเหนี่ยว"]},
{id:"M-06", name:["Compare fission and fusion","เปรียบเทียบฟิชชันกับฟิวชัน"]}
],

traps:{
"T-01":["Both A and Z must balance. Check the top row and the bottom row separately.","ทั้ง A และ Z ต้องดุล ตรวจแถวบนและแถวล่างแยกกัน"],
"T-02":["After n half-lives the fraction left is 1/2ⁿ, not 1/n.","หลังผ่าน n ครึ่งชีวิต สัดส่วนที่เหลือคือ 1/2ⁿ ไม่ใช่ 1/n"],
"T-03":["Beta decay leaves A unchanged and raises Z by one. Only alpha changes A.","การสลายบีตาทำให้ A เท่าเดิมและ Z เพิ่มขึ้นหนึ่ง มีเพียงแอลฟาที่เปลี่ยน A"],
"T-04":["Penetration and ionisation are opposites. Alpha ionises most but penetrates least.","ทะลุทะลวงกับแตกตัวเป็นตรงข้ามกัน แอลฟาทำให้แตกตัวมากสุดแต่ทะลุน้อยสุด"]
},

gen:{
"M-01": function(sf){
  var C=[{s:["²³⁸U (Z=92) emits an alpha particle. What is the daughter nuclide?","²³⁸U (Z=92) ปล่อยอนุภาคแอลฟา นิวไคลด์ลูกคืออะไร"],
          ok:["²³⁴Th, Z = 90","²³⁴Th, Z = 90"],
          w:[["²³⁴U, Z = 92","²³⁴U, Z = 92"],["²³⁸Th, Z = 90","²³⁸Th, Z = 90"],["²³⁶Ra, Z = 88","²³⁶Ra, Z = 88"]]},
         {s:["¹⁴C (Z=6) undergoes beta-minus decay. What is produced?","¹⁴C (Z=6) สลายแบบบีตาลบ ได้อะไรออกมา"],
          ok:["¹⁴N, Z = 7","¹⁴N, Z = 7"],
          w:[["¹⁴B, Z = 5","¹⁴B, Z = 5"],["¹³C, Z = 6","¹³C, Z = 6"],["¹⁰Be, Z = 4","¹⁰Be, Z = 4"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0],trap:"T-01"},{v:c.w[1],trap:"T-01"},{v:c.w[2]}],unit:""};
},
"M-02": function(sf){
  var C=[{s:["A nucleus loses 4 from A and 2 from Z. Which decay was it?","นิวเคลียสมี A ลดลง 4 และ Z ลดลง 2 เป็นการสลายแบบใด"],
          ok:["Alpha","แอลฟา"],w:[["Beta-minus","บีตาลบ"],["Gamma","แกมมา"],["Beta-plus","บีตาบวก"]]},
         {s:["A nucleus keeps its A but gains 1 in Z. Which decay was it?","นิวเคลียสมี A เท่าเดิมแต่ Z เพิ่มขึ้น 1 เป็นการสลายแบบใด"],
          ok:["Beta-minus","บีตาลบ"],w:[["Alpha","แอลฟา"],["Gamma","แกมมา"],["Neutron emission","การปล่อยนิวตรอน"]]},
         {s:["Which radiation is stopped by a sheet of paper but ionises most strongly?","รังสีใดถูกกระดาษแผ่นเดียวหยุดได้แต่ทำให้แตกตัวได้รุนแรงที่สุด"],
          ok:["Alpha","แอลฟา"],w:[["Gamma","แกมมา"],["Beta","บีตา"],["X-ray","รังสีเอกซ์"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0],trap:"T-03"},{v:c.w[1],trap:"T-04"},{v:c.w[2]}],unit:""};
},
"M-03": function(sf){
  var T=pick([2,5,10,20]), n=pick([2,3,4]), N0=pick([800,1600,3200]);
  var t=T*n, N=N0/Math.pow(2,n);
  if(sf==="S-04") return {stem:["After three half-lives, what fraction of a sample remains?",
                                "หลังผ่านสามครึ่งชีวิต เหลือสัดส่วนเท่าใดของตัวอย่าง"],
    opts:[{v:["One eighth","หนึ่งในแปด"],ok:1},{v:["One third","หนึ่งในสาม"],trap:"T-02"},
          {v:["One sixth","หนึ่งในหก"],trap:"T-02"},{v:["None","ไม่เหลือเลย"]}],unit:""};
  if(sf==="S-05") return {stem:["A sample falls from "+N0+" to "+N+" nuclei in "+t+" days. Find the half-life.",
                                "ตัวอย่างลดจาก "+N0+" เหลือ "+N+" นิวเคลียส ใน "+t+" วัน จงหาครึ่งชีวิต"],
    opts:[{v:String(T),ok:1},{v:String(t/n+1)},{v:String(t),trap:"T-02"},{v:String(T*2)}],unit:" days"};
  return {stem:["A source of half-life "+T+" days starts with "+N0+" nuclei. How many remain after "+t+" days?",
                "แหล่งกำเนิดครึ่งชีวิต "+T+" วัน เริ่มด้วย "+N0+" นิวเคลียส หลัง "+t+" วัน เหลือเท่าใด"],
    opts:[{v:String(N),ok:1},{v:String(Math.round(N0/n)),trap:"T-02"},{v:String(N0/2)},{v:"0"}],unit:""};
},
"M-04": function(sf){
  var T=pick([10,100,600]), N=pick([1e12,5e12]);
  var lam=Math.log(2)/T, A=lam*N;
  if(sf==="S-04") return {stem:["Two sources have equal numbers of nuclei but different half-lives. Which is more active?",
                                "แหล่งกำเนิดสองแหล่งมีจำนวนนิวเคลียสเท่ากันแต่ครึ่งชีวิตต่างกัน แหล่งใดมีกัมมันตภาพสูงกว่า"],
    opts:[{v:["The one with the shorter half-life","แหล่งที่มีครึ่งชีวิตสั้นกว่า"],ok:1},
          {v:["The one with the longer half-life","แหล่งที่มีครึ่งชีวิตยาวกว่า"],trap:"T-02"},
          {v:["They are equally active","มีกัมมันตภาพเท่ากัน"]},
          {v:["It depends on the radiation type","ขึ้นกับชนิดของรังสี"]}],unit:""};
  if(sf==="S-05") return {stem:["A source of half-life "+T+" s has activity "+A.toExponential(2)+" Bq. Find the number of nuclei present.",
                                "แหล่งกำเนิดครึ่งชีวิต "+T+" วินาที มีกัมมันตภาพ "+A.toExponential(2)+" เบ็กเคอเรล จงหาจำนวนนิวเคลียส"],
    opts:[{v:N.toExponential(1),ok:1},{v:(A*T).toExponential(1),trap:"T-02"},
          {v:(A/T).toExponential(1)},{v:(N/2).toExponential(1)}],unit:""};
  return {stem:["Find the decay constant of a nuclide with half-life "+T+" s.",
                "จงหาค่าคงตัวการสลายของนิวไคลด์ที่มีครึ่งชีวิต "+T+" วินาที"],
    opts:[{v:lam.toExponential(2),ok:1},{v:(1/T).toExponential(2),trap:"T-02"},
          {v:String(T)},{v:(lam*2).toExponential(2)}],unit:" s⁻¹"};
},
"M-05": function(sf){
  var dm=pick([0.02,0.05,0.1,0.2]);
  var E=dm*931.5;
  if(sf==="S-04") return {stem:["Why does a nucleus weigh less than the sum of its separate nucleons?",
                                "ทำไมนิวเคลียสจึงมีมวลน้อยกว่าผลรวมของนิวคลีออนที่แยกกัน"],
    opts:[{v:["The missing mass was released as binding energy","มวลที่หายไปถูกปล่อยเป็นพลังงานยึดเหนี่ยว"],ok:1},
          {v:["Nucleons shrink inside the nucleus","นิวคลีออนหดตัวลงในนิวเคลียส"]},
          {v:["Some nucleons are destroyed","นิวคลีออนบางตัวถูกทำลาย"]},
          {v:["The measurement is imprecise","การวัดไม่แม่นยำ"]}],unit:""};
  if(sf==="S-05") return {stem:["A reaction releases "+fmt(E)+" MeV. Find the mass defect in atomic mass units.",
                                "ปฏิกิริยาปล่อยพลังงาน "+fmt(E)+" เมกะอิเล็กตรอนโวลต์ จงหามวลพร่องเป็นหน่วยมวลอะตอม"],
    opts:[{v:String(dm),ok:1},{v:fmt2(E*931.5)},{v:fmt2(E/1000)},{v:fmt2(dm*2)}],unit:" u"};
  return {stem:["A mass defect of "+dm+" u is converted to energy. How much is released?",
                "มวลพร่อง "+dm+" หน่วยมวลอะตอม ถูกเปลี่ยนเป็นพลังงาน ปล่อยออกมาเท่าใด"],
    opts:[{v:fmt(E),ok:1},{v:fmt(dm/931.5)},{v:fmt(dm*3e8)},{v:fmt(E/2)}],unit:" MeV"};
},
"M-06": function(sf){
  var C=[{s:["Which process powers the sun?","กระบวนการใดขับเคลื่อนดวงอาทิตย์"],
          ok:["Fusion of light nuclei","การหลอมรวมของนิวเคลียสเบา"],
          w:[["Fission of heavy nuclei","การแตกตัวของนิวเคลียสหนัก"],["Chemical burning","การเผาไหม้ทางเคมี"],
             ["Radioactive decay alone","การสลายกัมมันตรังสีเพียงอย่างเดียว"]]},
         {s:["Why can both fission and fusion release energy?","ทำไมทั้งฟิชชันและฟิวชันจึงปล่อยพลังงานได้"],
          ok:["Both move nuclei towards iron, where binding energy per nucleon peaks","ทั้งคู่เคลื่อนนิวเคลียสเข้าหาเหล็ก ซึ่งพลังงานยึดเหนี่ยวต่อนิวคลีออนสูงสุด"],
          w:[["Both destroy mass completely","ทั้งคู่ทำลายมวลจนหมด"],
             ["Both split heavy nuclei","ทั้งคู่แยกนิวเคลียสหนัก"],
             ["Both are chemical reactions","ทั้งคู่เป็นปฏิกิริยาเคมี"]]},
         {s:["What makes a fission chain reaction possible?","อะไรทำให้เกิดปฏิกิริยาลูกโซ่ฟิชชันได้"],
          ok:["Each fission releases neutrons that trigger further fissions","ฟิชชันแต่ละครั้งปล่อยนิวตรอนที่ไปกระตุ้นฟิชชันต่อ"],
          w:[["Each fission releases alpha particles","ฟิชชันแต่ละครั้งปล่อยอนุภาคแอลฟา"],
             ["The fuel gets hotter","เชื้อเพลิงร้อนขึ้น"],
             ["Gamma rays split more nuclei","รังสีแกมมาแยกนิวเคลียสเพิ่ม"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
}
}
};
