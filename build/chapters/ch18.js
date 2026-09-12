var CHAPTER = {
id:"ch18", num:"18", slug:"em-waves", subject:"physics",
kicker:["Physics · Chapter 18","ฟิสิกส์ · บทที่ 18"],
title:["Electromagnetic Waves","คลื่นแม่เหล็กไฟฟ้า"],
mapTitle:["Light, finally explained","แสง ที่ในที่สุดก็อธิบายได้"],
lede:["Maxwell noticed that a changing electric field makes a magnetic one and vice versa, so the two could sustain each other across empty space. He calculated the speed of the result and got the speed of light.",
      "แม็กซ์เวลล์สังเกตว่าสนามไฟฟ้าที่เปลี่ยนแปลงสร้างสนามแม่เหล็ก และในทางกลับกันด้วย ทั้งสองจึงค้ำจุนกันเองข้ามอวกาศว่างเปล่าได้ เขาคำนวณอัตราเร็วของสิ่งนั้นแล้วได้อัตราเร็วแสงพอดี"],
next:["→ continues in Chapter 19 · Atomic Physics","→ ต่อในบทที่ 19 · ฟิสิกส์อะตอม"],

nodes:[
{ id:"maxwell", x:235, y:52, requires:[], methods:["M-01"],
  title:["Maxwell's insight","ข้อค้นพบของแม็กซ์เวลล์"],
  body:[["Faraday had shown that a changing magnetic field induces an electric one. Maxwell argued the converse must hold too, and that the pair could therefore propagate together with neither one ever dying out.",
         "His equations gave the speed as 3 × 10⁸ m/s — the measured speed of light, which nobody had connected to electricity at all. Hertz confirmed it experimentally twenty years later."],
        ["ฟาราเดย์แสดงให้เห็นว่าสนามแม่เหล็กที่เปลี่ยนแปลงเหนี่ยวนำสนามไฟฟ้า แม็กซ์เวลล์แย้งว่าในทางกลับกันก็ต้องเป็นจริงเช่นกัน ทั้งคู่จึงแผ่ไปด้วยกันได้โดยไม่มีฝ่ายใดดับหายไป",
         "สมการของเขาให้อัตราเร็ว 3 × 10⁸ m/s ซึ่งคืออัตราเร็วแสงที่วัดได้ ซึ่งไม่มีใครเคยเชื่อมโยงกับไฟฟ้ามาก่อนเลย เฮิรตซ์ยืนยันด้วยการทดลองในอีกยี่สิบปีต่อมา"]],
  formula:["c = 3 × 10⁸ m/s        c = fλ","c = 3 × 10⁸ m/s        c = fλ"],
  flabel:["Light is an electromagnetic wave","แสงคือคลื่นแม่เหล็กไฟฟ้า"],
  viz:"table",
  vizcfg:{
    title:["WHY A WAVE CAN CARRY ITSELF ALONG","ทำไมคลื่นจึงพาตัวเองไปได้"],
    cols:[["Step","ขั้น"],["What happens","เกิดอะไรขึ้น"],["Consequence","ผลที่ตามมา"]],
    rowKey:"i",
    readouts:[
      {lab:["Step","ขั้น"], f:function(S){ return String(S.p.i+1)+" / 4"; }},
      {lab:["Speed it predicts","อัตราเร็วที่ทำนายได้"], f:function(){
        return L()?"3.00 × 10⁸ m/s — ตรงกับอัตราเร็วแสงที่วัดได้":"3.00 × 10⁸ m/s — the measured speed of light"; }},
      {lab:["Needs a medium?","ต้องมีตัวกลางไหม"], f:function(){
        return L()?"ไม่ — สนามค้ำกันเอง":"no — the fields hold each other up"; }}
    ],
    rows:function(p){
      var R=[[["1","1"],["a changing electric field appears","สนามไฟฟ้าที่เปลี่ยนแปลงปรากฏขึ้น"],["it creates a magnetic field","มันสร้างสนามแม่เหล็ก"]],
             [["2","2"],["that magnetic field is also changing","สนามแม่เหล็กนั้นก็เปลี่ยนแปลงด้วย"],["it creates an electric field","มันสร้างสนามไฟฟ้า"]],
             [["3","3"],["the cycle feeds itself onward","วงจรป้อนตัวเองต่อไป"],["no medium is needed","ไม่ต้องมีตัวกลาง"]],
             [["4","4"],["the speed follows from ε₀ and µ₀","อัตราเร็วได้จาก ε₀ กับ µ₀"],["it equals c, exactly","เท่ากับ c พอดี"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i<=p.i, col:j===0?"ink":(i===p.i?"accent":"good")}; }); });
    },
    note:["Maxwell did not measure light — he calculated it, and it matched","แมกซ์เวลล์ไม่ได้วัดแสง เขาคำนวณมันออกมา แล้วมันตรงกัน"]
  } },

{ id:"properties", x:100, y:150, requires:["maxwell"], methods:["M-02","M-04"],
  title:["Properties","สมบัติ"],
  body:[["The electric and magnetic fields oscillate in phase, at right angles to each other and to the direction of travel. That makes every electromagnetic wave transverse, and therefore capable of polarisation.",
         "No medium is required — this is the one wave family that crosses a vacuum, which is why we can see the sun. And every member travels at exactly c in vacuum, from radio to gamma. Thinking they need a medium is trap T-01."],
        ["สนามไฟฟ้าและสนามแม่เหล็กสั่นด้วยเฟสตรงกัน ตั้งฉากกันและตั้งฉากกับทิศการเคลื่อนที่ ทำให้คลื่นแม่เหล็กไฟฟ้าทุกชนิดเป็นคลื่นตามขวาง และจึงเกิดโพลาไรเซชันได้",
         "ไม่ต้องอาศัยตัวกลาง นี่คือคลื่นตระกูลเดียวที่ข้ามสุญญากาศได้ จึงเป็นเหตุผลที่เรามองเห็นดวงอาทิตย์ และสมาชิกทุกตัวเดินทางด้วย c เท่ากันพอดีในสุญญากาศ ตั้งแต่คลื่นวิทยุถึงรังสีแกมมา การคิดว่าต้องมีตัวกลางคือกับดัก T-01"]],
  formula:["E ⟂ B ⟂ direction        all travel at c","E ⟂ B ⟂ ทิศเคลื่อนที่        เดินทางด้วย c เท่ากันหมด"],
  flabel:["Transverse · needs no medium","ตามขวาง · ไม่ต้องมีตัวกลาง"],
  viz:"wave",
  guide:[
    {say:["The trace stands for the oscillating electric field. A magnetic field oscillates in step, at right angles to it.",
          "เส้นกราฟแทนสนามไฟฟ้าที่สั่น มีสนามแม่เหล็กสั่นพร้อมกันในทิศตั้งฉากกับมัน"], set:{A:5,lam:8,f:1,T:8}},
    {say:["Change the wavelength and the frequency must change to keep fλ equal to c. They are locked together.",
          "เปลี่ยนความยาวคลื่นแล้วความถี่ต้องเปลี่ยนตาม เพื่อให้ fλ เท่ากับ c ทั้งสองผูกติดกัน"], set:{A:5,lam:16,f:0.5,T:8}},
    {say:["Short wavelength means high frequency — the gamma end. Long means low — the radio end. Same speed either way.",
          "ความยาวคลื่นสั้นหมายถึงความถี่สูง คือฝั่งรังสีแกมมา ยาวหมายถึงต่ำ คือฝั่งคลื่นวิทยุ อัตราเร็วเท่ากันทั้งคู่"], set:{A:5,lam:3,f:3,T:8}}
  ]},

{ id:"spectrum", x:370, y:150, requires:["maxwell"], methods:["M-03","M-06"],
  title:["The spectrum","สเปกตรัม"],
  body:[["Seven named bands, ordered by wavelength from longest to shortest: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma. Frequency and photon energy run the opposite way.",
         "Visible light occupies a laughably narrow slice, roughly 400 to 700 nm. Within it, red is the longest wavelength and violet the shortest. Getting the order backwards is trap T-02."],
        ["เจ็ดย่านที่มีชื่อ เรียงตามความยาวคลื่นจากยาวสุดไปสั้นสุด คลื่นวิทยุ ไมโครเวฟ อินฟราเรด แสงที่มองเห็น อัลตราไวโอเลต รังสีเอกซ์ รังสีแกมมา ส่วนความถี่และพลังงานโฟตอนเรียงกลับทาง",
         "แสงที่มองเห็นครอบครองช่วงที่แคบอย่างน่าขัน ราว 400 ถึง 700 นาโนเมตร ภายในช่วงนั้น สีแดงมีความยาวคลื่นยาวสุดและสีม่วงสั้นสุด การเรียงลำดับกลับด้านคือกับดัก T-02"]],
  formula:["radio → micro → IR → visible → UV → X-ray → gamma","วิทยุ → ไมโครเวฟ → IR → แสง → UV → เอกซ์ → แกมมา"],
  flabel:["Wavelength falling · energy rising","ความยาวคลื่นลดลง · พลังงานเพิ่มขึ้น"],
  viz:"scale",
  vizcfg:{
    title:["THE WHOLE SPECTRUM, IN POWERS OF TEN","สเปกตรัมทั้งหมด ในหน่วยกำลังของสิบ"],
    lo:-13, hi:4,
    ctrls:[{k:"e", lab:["Wavelength exponent","เลขชี้กำลังความยาวคลื่น"], min:-13, max:4, step:1, def:-6, unit:""}],
    readouts:[
      {lab:["Wavelength","ความยาวคลื่น"], f:function(S){ return "10^"+S.p.e+" m"; }},
      {lab:["Band","ย่าน"], f:function(S){
        var e=S.p.e;
        var B = e>=0?["radio","วิทยุ"] : e>=-3?["microwave","ไมโครเวฟ"] : e>=-6?["infrared","อินฟราเรด"]
              : e>=-7?["visible","ที่ตามองเห็น"] : e>=-8?["ultraviolet","อัลตราไวโอเลต"]
              : e>=-11?["X-ray","รังสีเอกซ์"] : ["gamma","แกมมา"];
        return B[L()]; }},
      {lab:["Frequency","ความถี่"], f:function(S){
        return fmt2(3/Math.pow(10,S.p.e)/1e8)+" × 10⁸ Hz"; }},
      {lab:["Visible band width","ความกว้างย่านที่มองเห็น"], f:function(){
        return L()?"เกือบหนึ่งอันดับขนาด จากสิบเจ็ดอันดับ":"barely one decade out of seventeen"; }}
    ],
    marks:function(p){
      return [{e:3, lab:["radio","วิทยุ"], col:"faint"},
              {e:-2, lab:["microwave","ไมโครเวฟ"], col:"faint"},
              {e:-5, lab:["infrared","อินฟราเรด"], col:"warn"},
              {e:-6.7, lab:["visible","ที่มองเห็น"], col:"accent"},
              {e:-8, lab:["UV","ยูวี"], col:"good"},
              {e:-10, lab:["X-ray","รังสีเอกซ์"], col:"faint"},
              {e:-12, lab:["gamma","แกมมา"], col:"faint"}];
    },
    cursor:function(p){ return p.e; },
    cursorLab:function(p){ return ["10^"+p.e+" m","10^"+p.e+" เมตร"]; },
    note:["everything we can see occupies one thin slice of a seventeen-decade range","ทุกสิ่งที่เรามองเห็นกินพื้นที่เพียงแผ่นบางๆ ของช่วงกว้างสิบเจ็ดอันดับขนาด"]
  } },

{ id:"polarisation", x:235, y:248, requires:["properties"], methods:["M-05"],
  title:["Polarisation","โพลาไรเซชัน"],
  body:[["Ordinary light oscillates in every plane at once. A polarising filter passes only one, so half the intensity is lost and what emerges is confined to a single direction of vibration.",
         "Put a second filter at right angles to the first and nothing gets through. This is only possible for transverse waves — sound can never be polarised, which is the cleanest proof that light is not longitudinal."],
        ["แสงธรรมดาสั่นในทุกระนาบพร้อมกัน แผ่นโพลารอยด์ยอมให้ผ่านเพียงระนาบเดียว ความเข้มจึงหายไปครึ่งหนึ่ง และสิ่งที่ออกมาถูกจำกัดให้สั่นในทิศทางเดียว",
         "วางแผ่นที่สองตั้งฉากกับแผ่นแรกแล้วจะไม่มีอะไรผ่านเลย สิ่งนี้เป็นไปได้เฉพาะกับคลื่นตามขวาง เสียงไม่มีวันโพลาไรซ์ได้ ซึ่งเป็นข้อพิสูจน์ที่ชัดเจนที่สุดว่าแสงไม่ใช่คลื่นตามยาว"]],
  formula:["Two crossed filters transmit nothing","แผ่นโพลารอยด์ไขว้กันสองแผ่นไม่ให้แสงผ่าน"],
  flabel:["Only transverse waves polarise","เฉพาะคลื่นตามขวางที่โพลาไรซ์ได้"],
  viz:"plot",
  vizcfg:{
    title:["MALUS'S LAW · INTENSITY THROUGH A POLARISER","กฎของมาลุส · ความเข้มที่ผ่านโพลาไรเซอร์"],
    xlab:["angle between the filters (°)","มุมระหว่างแผ่นกรอง (°)"], ylab:["transmitted intensity","ความเข้มที่ผ่าน"],
    xmin:0, xmax:180, ymin:0, fill:true,
    fn:function(x,p){ var c=Math.cos(x*Math.PI/180); return p.I0*c*c; },
    mark:function(p){ return p.th; },
    ctrls:[
      {k:"I0", lab:["Intensity after the first filter","ความเข้มหลังแผ่นแรก"], min:1, max:10, step:.5, def:5, unit:""},
      {k:"th", lab:["Angle between filters","มุมระหว่างแผ่นกรอง"], min:0, max:180, step:5, def:0, unit:"°"}
    ],
    readouts:[
      {lab:["Transmitted intensity","ความเข้มที่ผ่าน"], f:function(S){
        var c=Math.cos(S.p.th*Math.PI/180); return fmt2(S.p.I0*c*c); }},
      {lab:["Fraction passed","สัดส่วนที่ผ่าน"], f:function(S){
        var c=Math.cos(S.p.th*Math.PI/180); return fmt2(100*c*c)+" %"; }},
      {lab:["At 90°","ที่ 90°"], f:function(){
        return L()?"ไม่มีแสงผ่านเลย — แผ่นกรองไขว้กัน":"nothing gets through — the filters are crossed"; }},
      {lab:["Why sound cannot do this","ทำไมเสียงทำแบบนี้ไม่ได้"], f:function(){
        return L()?"เสียงเป็นคลื่นตามยาว ไม่มีทิศการสั่นให้กรอง":"sound is longitudinal — it has no vibration direction to filter"; }}
    ],
    note:["the square is what makes 45° pass a half, not the three-quarters you might guess","กำลังสองคือสิ่งที่ทำให้ 45° ผ่านครึ่งหนึ่ง ไม่ใช่สามในสี่อย่างที่อาจเดา"]
  } },

{ id:"uses", x:235, y:346, requires:["spectrum","polarisation"], methods:["M-06"],
  title:["Uses and hazards","การใช้งานและอันตราย"],
  body:[["Each band is used for what its wavelength allows. Radio diffracts round hills and buildings, microwaves resonate with water molecules, infrared reads heat, X-rays pass through flesh but not bone.",
         "Danger tracks photon energy, not intensity. Below ultraviolet the photons cannot ionise atoms however bright the source; above it they can, however faint. That threshold is why UV, X-rays and gamma are the hazardous end."],
        ["แต่ละย่านถูกใช้ตามที่ความยาวคลื่นเอื้ออำนวย คลื่นวิทยุเลี้ยวเบนอ้อมเนินเขาและอาคาร ไมโครเวฟสั่นพ้องกับโมเลกุลน้ำ อินฟราเรดอ่านความร้อน รังสีเอกซ์ทะลุเนื้อแต่ไม่ทะลุกระดูก",
         "อันตรายขึ้นกับพลังงานโฟตอน ไม่ใช่ความเข้ม ต่ำกว่าอัลตราไวโอเลต โฟตอนทำให้อะตอมแตกตัวไม่ได้ไม่ว่าแหล่งกำเนิดจะสว่างเพียงใด สูงกว่านั้นทำได้ แม้จะจางแค่ไหน เกณฑ์นี้คือเหตุผลที่ UV เอกซ์ และแกมมา คือฝั่งที่อันตราย"]],
  formula:["E = hf        ionising above UV","E = hf        ทำให้แตกตัวได้ตั้งแต่ UV ขึ้นไป"],
  flabel:["Photon energy decides the hazard","พลังงานโฟตอนเป็นตัวกำหนดอันตราย"],
  viz:"table",
  vizcfg:{
    title:["EACH BAND, ITS USE AND ITS DANGER","แต่ละย่าน ประโยชน์และอันตราย"],
    cols:[["Band","ย่าน"],["Typical use","การใช้งาน"],["Hazard","อันตราย"]],
    rowKey:"i",
    readouts:[
      {lab:["Band","ย่าน"], f:function(S){
        return [["Radio","วิทยุ"],["Microwave","ไมโครเวฟ"],["Infrared","อินฟราเรด"],["Visible","ที่มองเห็น"],
                ["Ultraviolet","อัลตราไวโอเลต"],["X-ray","รังสีเอกซ์"],["Gamma","แกมมา"]][S.p.i][L()]; }},
      {lab:["Photon energy","พลังงานโฟตอน"], f:function(S){
        return S.p.i<3 ? (L()?"ต่ำ":"low") : S.p.i===3 ? (L()?"ปานกลาง":"moderate") : (L()?"สูง — ไอออไนซ์ได้":"high — ionising"); }},
      {lab:["Danger rises with","อันตรายเพิ่มตาม"], f:function(){
        return L()?"ความถี่ ไม่ใช่ความสว่าง":"frequency, not brightness"; }}
    ],
    rows:function(p){
      var R=[[["Radio","วิทยุ"],["broadcasting, MRI","การกระจายเสียง, MRI"],["essentially none","แทบไม่มี"]],
             [["Microwave","ไมโครเวฟ"],["cooking, phones","ทำอาหาร, โทรศัพท์"],["internal heating","ความร้อนภายใน"]],
             [["Infrared","อินฟราเรด"],["thermal imaging, remotes","ภาพความร้อน, รีโมต"],["burns","ผิวไหม้"]],
             [["Visible","ที่มองเห็น"],["sight, photography","การมองเห็น, การถ่ายภาพ"],["glare damage","แสงจ้าทำร้ายตา"]],
             [["Ultraviolet","ยูวี"],["sterilising, tanning","ฆ่าเชื้อ, ทำผิวสีแทน"],["skin cancer","มะเร็งผิวหนัง"]],
             [["X-ray","รังสีเอกซ์"],["medical imaging","ภาพถ่ายทางการแพทย์"],["cell damage","ทำลายเซลล์"]],
             [["Gamma","แกมมา"],["cancer therapy, sterilising","รักษามะเร็ง, ฆ่าเชื้อ"],["severe tissue damage","ทำลายเนื้อเยื่อรุนแรง"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===0?"ink":(j===1?"good":"warn")}; }); });
    },
    note:["read the hazard column downwards — it tracks frequency, and nothing else","อ่านคอลัมน์อันตรายลงมา มันสอดคล้องกับความถี่ ไม่ใช่อย่างอื่น"]
  } }
],

methods:[
{id:"M-01", name:["Apply c = fλ","ใช้ c = fλ"]},
{id:"M-02", name:["Properties of electromagnetic waves","สมบัติของคลื่นแม่เหล็กไฟฟ้า"]},
{id:"M-03", name:["Order the spectrum","เรียงลำดับสเปกตรัม"]},
{id:"M-04", name:["Compare speeds across the spectrum","เทียบอัตราเร็วตลอดสเปกตรัม"]},
{id:"M-05", name:["Polarisation","โพลาไรเซชัน"]},
{id:"M-06", name:["Identify a band and its hazard","ระบุย่านและอันตราย"]}
],

traps:{
"T-01":["Electromagnetic waves need no medium. They cross a vacuum, which is how sunlight reaches us.","คลื่นแม่เหล็กไฟฟ้าไม่ต้องอาศัยตัวกลาง มันข้ามสุญญากาศได้ จึงเป็นวิธีที่แสงอาทิตย์มาถึงเรา"],
"T-02":["Spectrum order reversed. Radio has the longest wavelength; gamma the shortest.","เรียงสเปกตรัมกลับด้าน คลื่นวิทยุมีความยาวคลื่นยาวที่สุด รังสีแกมมาสั้นที่สุด"],
"T-03":["All electromagnetic waves travel at c in a vacuum. Gamma is not faster than radio.","คลื่นแม่เหล็กไฟฟ้าทุกชนิดเดินทางด้วย c ในสุญญากาศ รังสีแกมมาไม่ได้เร็วกว่าคลื่นวิทยุ"],
"T-04":["Hazard follows photon energy, not brightness. A dim gamma source still ionises.","อันตรายขึ้นกับพลังงานโฟตอน ไม่ใช่ความสว่าง แหล่งกำเนิดรังสีแกมมาที่จางก็ยังทำให้แตกตัวได้"]
},

gen:{
"M-01": function(sf){
  var lam=pick([3,300,0.03,6e-7]), c=3e8;
  var f=c/lam;
  if(sf==="S-05") return {stem:["An electromagnetic wave has frequency "+f.toExponential(1)+" Hz. Find its wavelength.",
                                "คลื่นแม่เหล็กไฟฟ้ามีความถี่ "+f.toExponential(1)+" เฮิรตซ์ จงหาความยาวคลื่น"],
    opts:[{v:lam.toExponential(1),ok:1},{v:(f/c).toExponential(1)},{v:(lam*2).toExponential(1)},{v:(c*f).toExponential(1)}],unit:" m"};
  return {stem:["Find the frequency of an electromagnetic wave of wavelength "+lam.toExponential(1)+" m.",
                "จงหาความถี่ของคลื่นแม่เหล็กไฟฟ้าความยาวคลื่น "+lam.toExponential(1)+" เมตร"],
    opts:[{v:f.toExponential(1),ok:1},{v:(c*lam).toExponential(1)},{v:(lam/c).toExponential(1)},{v:(f/2).toExponential(1)}],unit:" Hz"};
},
"M-02": function(sf){
  var C=[{s:["How do the electric and magnetic fields in an electromagnetic wave relate?","สนามไฟฟ้ากับสนามแม่เหล็กในคลื่นแม่เหล็กไฟฟ้าสัมพันธ์กันอย่างไร"],
          ok:["Perpendicular to each other and in phase","ตั้งฉากกันและมีเฟสตรงกัน"],
          w:[["Parallel and in phase","ขนานกันและเฟสตรงกัน"],["Perpendicular and out of phase","ตั้งฉากกันและเฟสตรงข้าม"],
             ["Only the electric field oscillates","มีเพียงสนามไฟฟ้าที่สั่น"]]},
         {s:["Why can sunlight reach the Earth across empty space?","ทำไมแสงอาทิตย์จึงเดินทางถึงโลกผ่านอวกาศว่างเปล่าได้"],
          ok:["Electromagnetic waves need no medium","คลื่นแม่เหล็กไฟฟ้าไม่ต้องอาศัยตัวกลาง"],
          w:[["Space contains a thin medium","อวกาศมีตัวกลางบางเบา"],
             ["Light is longitudinal","แสงเป็นคลื่นตามยาว"],
             ["Gravity carries it","แรงโน้มถ่วงพามันมา"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0],trap:"T-01"},{v:c.w[1]},{v:c.w[2]}],unit:""};
},
"M-03": function(sf){
  if(sf==="S-04") return {stem:["Which of these has the longest wavelength?","ข้อใดมีความยาวคลื่นยาวที่สุด"],
    opts:[{v:["Radio waves","คลื่นวิทยุ"],ok:1},{v:["Gamma rays","รังสีแกมมา"],trap:"T-02"},
          {v:["Ultraviolet","อัลตราไวโอเลต"],trap:"T-02"},{v:["Visible light","แสงที่มองเห็น"]}],unit:""};
  if(sf==="S-05") return {stem:["Which band has the highest photon energy?","ย่านใดมีพลังงานโฟตอนสูงที่สุด"],
    opts:[{v:["Gamma rays","รังสีแกมมา"],ok:1},{v:["Radio waves","คลื่นวิทยุ"],trap:"T-02"},
          {v:["Infrared","อินฟราเรด"]},{v:["Microwaves","ไมโครเวฟ"]}],unit:""};
  return {stem:["Place these in order of increasing frequency: X-ray, infrared, visible, microwave.",
                "จงเรียงลำดับความถี่จากน้อยไปมาก รังสีเอกซ์ อินฟราเรด แสง ไมโครเวฟ"],
    opts:[{v:["microwave, infrared, visible, X-ray","ไมโครเวฟ อินฟราเรด แสง เอกซ์"],ok:1},
          {v:["X-ray, visible, infrared, microwave","เอกซ์ แสง อินฟราเรด ไมโครเวฟ"],trap:"T-02"},
          {v:["infrared, microwave, visible, X-ray","อินฟราเรด ไมโครเวฟ แสง เอกซ์"]},
          {v:["visible, infrared, microwave, X-ray","แสง อินฟราเรด ไมโครเวฟ เอกซ์"]}],unit:""};
},
"M-04": function(sf){
  return {stem:["A radio wave and a gamma ray both travel through a vacuum. Compare their speeds.",
                "คลื่นวิทยุกับรังสีแกมมาเดินทางผ่านสุญญากาศทั้งคู่ จงเปรียบเทียบอัตราเร็ว"],
    opts:[{v:["Identical, both 3 × 10⁸ m/s","เท่ากัน ทั้งคู่คือ 3 × 10⁸ m/s"],ok:1},
          {v:["Gamma is much faster","รังสีแกมมาเร็วกว่ามาก"],trap:"T-03"},
          {v:["Radio is faster","คลื่นวิทยุเร็วกว่า"],trap:"T-03"},
          {v:["It depends on their intensity","ขึ้นกับความเข้ม"],trap:"T-03"}],unit:""};
},
"M-05": function(sf){
  var C=[{s:["Two polarising filters are crossed at 90°. How much light gets through?","แผ่นโพลารอยด์สองแผ่นไขว้กันที่ 90° มีแสงผ่านเท่าใด"],
          ok:["None","ไม่มีเลย"],w:[["Half","ครึ่งหนึ่ง"],["All of it","ทั้งหมด"],["A quarter","หนึ่งในสี่"]]},
         {s:["That sound cannot be polarised tells us what about it?","การที่เสียงโพลาไรซ์ไม่ได้ บอกอะไรเกี่ยวกับเสียง"],
          ok:["It is a longitudinal wave","มันเป็นคลื่นตามยาว"],
          w:[["It is a transverse wave","มันเป็นคลื่นตามขวาง"],["It carries no energy","มันไม่พาพลังงาน"],
             ["It travels faster than light","มันเดินทางเร็วกว่าแสง"]]},
         {s:["Unpolarised light passes one filter. What fraction of the intensity survives?","แสงไม่โพลาไรซ์ผ่านแผ่นกรองหนึ่งแผ่น ความเข้มเหลือเท่าใด"],
          ok:["One half","ครึ่งหนึ่ง"],w:[["All of it","ทั้งหมด"],["None","ไม่เหลือเลย"],["One quarter","หนึ่งในสี่"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
},
"M-06": function(sf){
  var C=[{s:["Which band is used in a domestic microwave oven, and why?","ย่านใดใช้ในเตาไมโครเวฟตามบ้าน และเพราะอะไร"],
          ok:["Microwaves, because water molecules absorb them strongly","ไมโครเวฟ เพราะโมเลกุลน้ำดูดกลืนได้ดี"],
          w:[["Infrared, because it is heat","อินฟราเรด เพราะมันคือความร้อน"],
             ["X-rays, because they penetrate food","รังสีเอกซ์ เพราะทะลุอาหารได้"],
             ["Radio, because it is safe","คลื่นวิทยุ เพราะปลอดภัย"]]},
         {s:["Why are gamma rays hazardous even at very low intensity?","ทำไมรังสีแกมมาจึงอันตรายแม้ที่ความเข้มต่ำมาก"],
          ok:["Each photon carries enough energy to ionise atoms","แต่ละโฟตอนมีพลังงานพอที่จะทำให้อะตอมแตกตัว"],
          w:[["They travel faster than other waves","มันเดินทางเร็วกว่าคลื่นอื่น"],
             ["They have the longest wavelength","มันมีความยาวคลื่นยาวที่สุด"],
             ["They are always intense","มันมีความเข้มสูงเสมอ"]]},
         {s:["A wavelength of 500 nm belongs to which band?","ความยาวคลื่น 500 นาโนเมตร อยู่ในย่านใด"],
          ok:["Visible light","แสงที่มองเห็น"],w:[["Ultraviolet","อัลตราไวโอเลต"],["Infrared","อินฟราเรด"],["X-ray","รังสีเอกซ์"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0],trap:"T-04"},{v:c.w[1]},{v:c.w[2]}],unit:""};
}
}
};
