/* Chapter 12 wisp: a moving source and the wavefronts it leaves behind.
   On screen, sound travels 80 px/s and the wisp at 80·v_s/v px/s, so the
   picture keeps the real ratio of the two speeds. */
var C12 = {
  y: 108, c: 80, Te: 0.4, at: 110, lx: 330,
  fa: function(p){ return p.fs * p.v / (p.v - p.vs); },
  fr: function(p){ return p.fs * p.v / (p.v + p.vs); },
  x: function(p, t){ return C12.at + C12.c * p.vs / p.v * t; },
  tpass: function(p){ return p.vs > 0 ? (C12.lx - C12.at) / (C12.c * p.vs / p.v) : Infinity; }
};

var CHAPTER = {
id:"ch12", num:"12", slug:"sound", subject:"physics",
kicker:["Physics · Chapter 12","ฟิสิกส์ · บทที่ 12"],
title:["Sound","เสียง"],
mapTitle:["A wave you can hear","คลื่นที่ได้ยินได้"],
lede:["Sound is the longitudinal case of everything in Chapter 9, with one extra idea attached: because our ears respond logarithmically, loudness needs a scale of its own.",
      "เสียงคือกรณีคลื่นตามยาวของทุกอย่างในบทที่ 9 โดยมีแนวคิดพิเศษเพิ่มอีกหนึ่งอย่าง เพราะหูของเราตอบสนองแบบลอการิทึม ความดังจึงต้องมีสเกลของตัวเอง"],
next:["→ continues in Chapter 13 · Electrostatics","→ ต่อในบทที่ 13 · ไฟฟ้าสถิต"],

nodes:[
{ id:"nature", x:235, y:52, requires:[], methods:["M-01"],
  title:["The nature of sound","ธรรมชาติของเสียง"],
  body:[["Sound is a longitudinal pressure wave: the air compresses and rarefies along the direction of travel. It needs a medium, which is why space is silent, and it travels fastest in solids where the particles are most tightly coupled.",
         "In air the speed rises with temperature, v ≈ 331 + 0.6t. Frequency sets pitch, amplitude sets loudness, and the audible range runs from about 20 Hz to 20 kHz."],
        ["เสียงเป็นคลื่นความดันตามยาว อากาศอัดและขยายไปตามทิศการเคลื่อนที่ มันต้องอาศัยตัวกลาง อวกาศจึงเงียบ และเดินทางเร็วที่สุดในของแข็งซึ่งอนุภาคยึดกันแน่นที่สุด",
         "ในอากาศ อัตราเร็วเพิ่มตามอุณหภูมิ v ≈ 331 + 0.6t ความถี่กำหนดระดับเสียง แอมพลิจูดกำหนดความดัง และช่วงที่ได้ยินอยู่ราว 20 เฮิรตซ์ ถึง 20 กิโลเฮิรตซ์"]],
  formula:["v = 331 + 0.6t   (t in °C)","v = 331 + 0.6t   (t เป็น °C)"],
  flabel:["Solids > liquids > gases","ของแข็ง > ของเหลว > แก๊ส"],
  viz:"wave",
  guide:[
    {say:["A sound wave drawn as displacement. Raise the frequency and the pitch rises with it.",
          "คลื่นเสียงที่วาดเป็นการกระจัด เพิ่มความถี่แล้วระดับเสียงจะสูงขึ้นตาม"], set:{A:5,lam:8,f:1,T:8}},
    {say:["Raise the amplitude instead. Same pitch, louder sound — the two are completely independent.",
          "ลองเพิ่มแอมพลิจูดแทน ระดับเสียงเดิมแต่ดังขึ้น ทั้งสองเป็นอิสระต่อกันสิ้นเชิง"], set:{A:9,lam:8,f:1,T:8}},
    {say:["Read the speed readout. It is always fλ — the same wave equation as every other wave.",
          "อ่านค่าอัตราเร็ว มันคือ fλ เสมอ เป็นสมการคลื่นเดียวกับคลื่นทุกชนิด"], set:{A:5,lam:16,f:2,T:8}}
  ]},

{ id:"intensity", x:100, y:150, requires:["nature"], methods:["M-02","M-03"],
  title:["Intensity and loudness","ความเข้มและความดัง"],
  body:[["Intensity is power per unit area, and a point source spreads its power over a sphere, so I = P/4πr². Double the distance and the intensity falls to a quarter.",
         "The ear does not hear intensity directly — it hears its logarithm. Sound level β = 10 log(I/I₀) in decibels, with I₀ = 10⁻¹² W/m². Ten times the intensity is only ten more decibels, which is why the scale is so compressed."],
        ["ความเข้มคือกำลังต่อหน่วยพื้นที่ และแหล่งกำเนิดแบบจุดกระจายกำลังออกไปทั่วผิวทรงกลม จึงได้ I = P/4πr² เพิ่มระยะเป็นสองเท่า ความเข้มลดเหลือหนึ่งในสี่",
         "หูไม่ได้ยินความเข้มโดยตรง แต่ได้ยินลอการิทึมของมัน ระดับเสียง β = 10 log(I/I₀) หน่วยเดซิเบล โดย I₀ = 10⁻¹² W/m² ความเข้มสิบเท่าเพิ่มเพียงสิบเดซิเบล จึงเป็นเหตุผลที่สเกลนี้ถูกบีบอัดมาก"]],
  formula:["I = P / 4πr²        β = 10 log(I / I₀)","I = P / 4πr²        β = 10 log(I / I₀)"],
  flabel:["I₀ = 10⁻¹² W/m²","I₀ = 10⁻¹² W/m²"],
  viz:"plot",
  vizcfg:{
    fn:function(x,p){ return p.P/(4*Math.PI*Math.max(x,0.3)*Math.max(x,0.3)); },
    xmin:0.3, xmax:20, fill:true,
    title:["INTENSITY AGAINST DISTANCE","ความเข้ม เทียบ ระยะทาง"],
    xlab:["r (m)","r (ม.)"], ylab:["I (W/m²)","I (วัตต์/ตร.ม.)"],
    mark:function(p){ return p.r; },
    ctrls:[
      {k:"P", lab:["Source power P","กำลังแหล่งกำเนิด P"], min:1, max:100, step:1, def:50, unit:" W"},
      {k:"r", lab:["Your distance r","ระยะของคุณ r"],      min:1, max:20, step:1, def:4,  unit:" m"}
    ],
    readouts:[
      {lab:["Intensity here","ความเข้ม ณ จุดนี้"], f:function(S){
        return (S.p.P/(4*Math.PI*S.p.r*S.p.r)).toExponential(2)+" W/m²"; }},
      {lab:["Sound level","ระดับเสียง"], f:function(S){
        var I=S.p.P/(4*Math.PI*S.p.r*S.p.r); return fmt(10*Math.log(I/1e-12)/Math.LN10)+" dB"; }},
      {lab:["At twice this distance","ที่ระยะสองเท่า"], f:function(S){
        var I=S.p.P/(4*Math.PI*4*S.p.r*S.p.r); return fmt(10*Math.log(I/1e-12)/Math.LN10)+" dB"; }}
    ]
  },
  guide:[
    {say:["The curve is an inverse square. It falls away steeply near the source and then flattens out.",
          "เส้นกราฟเป็นกำลังสองผกผัน ลดลงชันมากใกล้แหล่งกำเนิดแล้วค่อยแบนราบ"], set:{P:50,r:2}},
    {say:["Double your distance from 2 m to 4 m and read the intensity. It drops to a quarter, not a half.",
          "เพิ่มระยะจาก 2 เมตรเป็น 4 เมตร แล้วอ่านความเข้ม จะลดเหลือหนึ่งในสี่ ไม่ใช่ครึ่งหนึ่ง"], set:{P:50,r:4}},
    {say:["But the decibel readout only drops by about 6. That gap between physics and hearing is the whole point of the dB scale.",
          "แต่ค่าเดซิเบลลดลงเพียงราว 6 ช่องว่างระหว่างฟิสิกส์กับการได้ยินนี้คือเหตุผลทั้งหมดของสเกลเดซิเบล"], set:{P:50,r:8}}
  ]},

{ id:"pipes", x:370, y:150, requires:["nature"], methods:["M-04"],
  title:["Resonance in pipes","การสั่นพ้องในท่อ"],
  body:[["A pipe resonates when a standing wave fits it exactly. A closed end must be a node, an open end must be an antinode, and that single rule generates every harmonic.",
         "A pipe closed at one end fits a quarter wavelength at its fundamental and produces only odd harmonics. An open pipe fits half a wavelength and produces all of them. Treating a closed pipe like an open one is trap T-03."],
        ["ท่อจะสั่นพ้องเมื่อคลื่นนิ่งลงตัวพอดี ปลายปิดต้องเป็นบัพ ปลายเปิดต้องเป็นปฏิบัพ และกฎเดียวนี้สร้างฮาร์มอนิกทั้งหมด",
         "ท่อปลายปิดข้างเดียวบรรจุหนึ่งในสี่ความยาวคลื่นที่ความถี่มูลฐาน และให้เฉพาะฮาร์มอนิกคี่ ส่วนท่อปลายเปิดบรรจุครึ่งความยาวคลื่นและให้ทุกฮาร์มอนิก การมองท่อปลายปิดเป็นท่อปลายเปิดคือกับดัก T-03"]],
  formula:["Closed: L = λ/4, 3λ/4, …        Open: L = λ/2, λ, …","ปลายปิด: L = λ/4, 3λ/4, …        ปลายเปิด: L = λ/2, λ, …"],
  flabel:["Closed pipes give odd harmonics only","ท่อปลายปิดให้ฮาร์มอนิกคี่เท่านั้น"],
  viz:"bars",
  vizcfg:{
    title:["WHICH HARMONICS A PIPE ALLOWS","ท่อยอมให้ฮาร์มอนิกใดเกิดได้"],
    ylab:["frequency (Hz)","ความถี่ (Hz)"],
    ctrls:[
      {k:"closed", lab:["",""], opts:[["open both ends","เปิดสองปลาย"], ["closed one end","ปิดปลายเดียว"]], min:0, def:0, unit:""},
      {k:"Lp",     lab:["Pipe length","ความยาวท่อ"], min:.2, max:2, step:.1, def:1, unit:" m"},
      {k:"v",      lab:["Speed of sound","อัตราเร็วเสียง"], min:300, max:360, step:5, def:340, unit:" m/s"}
    ],
    readouts:[
      {lab:["Fundamental","ความถี่มูลฐาน"], f:function(S){
        var p=S.p; return fmt2(p.closed===0 ? p.v/(2*p.Lp) : p.v/(4*p.Lp))+" Hz"; }},
      {lab:["Harmonics present","ฮาร์มอนิกที่มี"], f:function(S){
        return S.p.closed===0 ? (L()?"ทุกจำนวนเต็ม 1,2,3,4…":"every integer 1,2,3,4…")
                              : (L()?"เฉพาะเลขคี่ 1,3,5,7…":"odd only 1,3,5,7…"); }},
      {lab:["Same length, which is lower?","ยาวเท่ากัน อันไหนเสียงต่ำกว่า"], f:function(){
        return L()?"ท่อปิดปลาย — ต่ำกว่าหนึ่งอ็อกเทฟ":"the closed pipe — an octave lower"; }},
      {lab:["Why the difference","ทำไมจึงต่างกัน"], f:function(){
        return L()?"ปลายปิดต้องเป็นบัพ ปลายเปิดต้องเป็นปฏิบัพ":"a closed end must be a node, an open end an antinode"; }}
    ],
    bars:[
      {lab:["1st","ที่ 1"], f:function(p){ return p.closed===0 ? p.v/(2*p.Lp) : p.v/(4*p.Lp); }, col:"accent"},
      {lab:["2nd","ที่ 2"], f:function(p){ return p.closed===0 ? 2*p.v/(2*p.Lp) : 0; }, col:"good"},
      {lab:["3rd","ที่ 3"], f:function(p){ return p.closed===0 ? 3*p.v/(2*p.Lp) : 3*p.v/(4*p.Lp); }, col:"good"},
      {lab:["4th","ที่ 4"], f:function(p){ return p.closed===0 ? 4*p.v/(2*p.Lp) : 0; }, col:"good"},
      {lab:["5th","ที่ 5"], f:function(p){ return p.closed===0 ? 5*p.v/(2*p.Lp) : 5*p.v/(4*p.Lp); }, col:"good"}
    ],
    note:["a closed pipe simply deletes the even harmonics — that missing pattern is its timbre","ท่อปิดปลายลบฮาร์มอนิกเลขคู่ทิ้ง แบบรูปที่หายไปนั้นคือคุณภาพเสียงของมัน"]
  },
  guide:[
    {say:["An open pipe sounds every harmonic — the bars step up in equal jumps.",
          "ท่อเปิดสองปลายให้ทุกฮาร์มอนิก แถบไต่ขึ้นทีละขั้นเท่าๆ กัน"], set:{closed:0,Lp:1,v:340}},
    {say:["Close one end and the even harmonics collapse to zero. Only 1, 3, 5 survive.",
          "ปิดปลายหนึ่ง ฮาร์มอนิกเลขคู่ยุบเป็นศูนย์ เหลือแค่ 1, 3, 5"], set:{closed:1,Lp:1,v:340}},
    {say:["Notice the closed pipe's fundamental is half the open one's — same length, an octave lower.",
          "สังเกตว่าความถี่มูลฐานของท่อปิดเป็นครึ่งของท่อเปิด ยาวเท่ากันแต่ต่ำกว่าหนึ่งอ็อกเทฟ"], set:{closed:1,Lp:1,v:340}}
  ] },

{ id:"beats", x:235, y:248, requires:["intensity","pipes"], methods:["M-05"],
  title:["Beats","บีต"],
  body:[["Two notes of nearly equal frequency alternately reinforce and cancel, producing a slow throb. The beat frequency is simply the difference: f_beat = |f₁ − f₂|.",
         "Musicians use this to tune: adjust one string until the beats slow and disappear. When you can no longer hear a throb, the two frequencies match."],
        ["โน้ตสองเสียงที่ความถี่ใกล้เคียงกันจะเสริมและหักล้างกันสลับไปมา เกิดเป็นเสียงเต้นช้าๆ ความถี่บีตคือผลต่างล้วนๆ f_beat = |f₁ − f₂|",
         "นักดนตรีใช้สิ่งนี้ตั้งสาย ปรับสายหนึ่งจนบีตช้าลงและหายไป เมื่อไม่ได้ยินเสียงเต้นอีก แสดงว่าความถี่ทั้งสองตรงกันแล้ว"]],
  formula:["f_beat = |f₁ − f₂|","f_beat = |f₁ − f₂|"],
  flabel:["The difference, never the sum","ผลต่าง ไม่ใช่ผลรวม"],
  viz:"plot",
  vizcfg:{
    title:["TWO CLOSE NOTES MAKE A THROB","สองเสียงใกล้กันทำให้เกิดจังหวะเต้น"],
    xlab:["time (s)","เวลา (s)"], ylab:["pressure","ความดัน"],
    xmin:0, xmax:2, fill:false,
    fn:function(x,p){
      return Math.sin(2*Math.PI*p.f1*x)+Math.sin(2*Math.PI*p.f2*x);
    },
    ctrls:[
      {k:"f1", lab:["First frequency","ความถี่ที่หนึ่ง"], min:10, max:30, step:.5, def:20, unit:" Hz"},
      {k:"f2", lab:["Second frequency","ความถี่ที่สอง"], min:10, max:30, step:.5, def:23, unit:" Hz"}
    ],
    readouts:[
      {lab:["Beat frequency","ความถี่บีต"], f:function(S){ return fmt2(Math.abs(S.p.f1-S.p.f2))+" Hz"; }},
      {lab:["Beats you hear","จำนวนบีตที่ได้ยิน"], f:function(S){
        var b=Math.abs(S.p.f1-S.p.f2);
        return b<0.25 ? (L()?"ไม่มี — เข้าจังหวะกันแล้ว":"none — they are in tune")
                      : fmt2(b)+(L()?" ครั้งต่อวินาที":" per second"); }},
      {lab:["Pitch you hear","ระดับเสียงที่ได้ยิน"], f:function(S){
        return fmt2((S.p.f1+S.p.f2)/2)+(L()?" Hz · ค่าเฉลี่ย":" Hz · the average"); }},
      {lab:["Tuning an instrument","การตั้งเสียงเครื่องดนตรี"], f:function(){
        return L()?"ปรับจนบีตหายไป":"adjust until the beating disappears"; }}
    ],
    note:["the envelope, not the fast wiggle, is what your ear registers as the throb","สิ่งที่หูรับรู้เป็นจังหวะเต้นคือเส้นกรอบ ไม่ใช่การสั่นเร็ว"]
  },
  guide:[
    {say:["Three hertz apart. The envelope swells and collapses three times a second.",
          "ห่างกันสามเฮิรตซ์ เส้นกรอบพองและยุบสามครั้งต่อวินาที"], set:{f1:20,f2:23}},
    {say:["Bring them closer and the throb slows right down — one lazy pulse per second.",
          "ทำให้ใกล้กันขึ้น จังหวะเต้นช้าลงมาก เหลือหนึ่งครั้งต่อวินาทีแบบเนิบๆ"], set:{f1:20,f2:21}},
    {say:["Match them exactly and the beating vanishes. That silence is how a piano gets tuned.",
          "ทำให้เท่ากันพอดี จังหวะเต้นหายไป ความเงียบนั้นคือวิธีตั้งเสียงเปียโน"], set:{f1:20,f2:20}}
  ] },

{ id:"doppler", x:235, y:346, requires:["beats"], methods:["M-06"],
  title:["The Doppler effect","ปรากฏการณ์ดอปเพลอร์"],
  body:[["When a source approaches, each successive wavefront is emitted from closer to you, so the wavelength you receive is squeezed and the pitch rises. Receding, the reverse. The source's own frequency never changes.",
         "The pitch drop happens exactly as the source passes, not before. Expecting a gradual slide is a common misreading — the shift is one value approaching and another value receding."],
        ["เมื่อแหล่งกำเนิดเคลื่อนเข้าหา หน้าคลื่นแต่ละลูกถูกปล่อยจากตำแหน่งที่ใกล้คุณขึ้นเรื่อยๆ ความยาวคลื่นที่รับได้จึงถูกบีบและระดับเสียงสูงขึ้น เมื่อเคลื่อนออกก็ตรงข้าม ความถี่ของแหล่งกำเนิดเองไม่เคยเปลี่ยน",
         "ระดับเสียงตกลงตอนที่แหล่งกำเนิดผ่านไปพอดี ไม่ใช่ก่อนหน้า การคาดว่าจะค่อยๆ ไล่ลงเป็นความเข้าใจผิดที่พบบ่อย การเลื่อนมีค่าหนึ่งตอนเข้าหาและอีกค่าหนึ่งตอนออกห่าง"]],
  formula:["f_L = f_s (v ± v_L) / (v ∓ v_s)","f_L = f_s (v ± v_L) / (v ∓ v_s)"],
  flabel:["Approaching raises · receding lowers","เข้าหา สูงขึ้น · ออกห่าง ต่ำลง"],
  viz:"stage",
  vizcfg:{
    anim:true,
    spellName:["The Wailing Wisp","ภูตโหยหวน"],
    question:["The wisp sings one steady note as it flies. Why does the listener ahead hear it higher, and the one behind lower?",
              "ภูตร้องโน้ตเดียวคงที่ขณะบิน ทำไมผู้ฟังข้างหน้าจึงได้ยินเสียงสูงขึ้น และคนข้างหลังได้ยินต่ำลง"],
    ctrls:[
      {k:"fs", lab:["The wisp's own note","โน้ตของภูต"], min:200, max:1200, step:20, def:500, unit:" Hz"},
      {k:"vs", lab:["The wisp's speed","อัตราเร็วของภูต"], min:0, max:300, step:10, def:150, unit:" m/s"},
      {k:"v",  lab:["Speed of sound","อัตราเร็วเสียง"], min:300, max:360, step:5, def:340, unit:" m/s"},
      {k:"T",  lab:["Watch for","ดูนาน"], min:4, max:14, step:1, def:11, unit:" s", isT:true}
    ],
    readouts:[
      {lab:["Ahead hears","ข้างหน้าได้ยิน"], f:function(S){ return fmt(C12.fa(S.p))+" Hz"; }},
      {lab:["Behind hears","ข้างหลังได้ยิน"], f:function(S){ return fmt(C12.fr(S.p))+" Hz"; }},
      {lab:["The wisp sings","ภูตร้อง"], f:function(S){ return S.p.fs+" Hz"; }},
      {lab:["Is the shift symmetric?","การเลื่อนสมมาตรไหม"], f:function(S){
        var p=S.p, up=C12.fa(p)-p.fs, dn=p.fs-C12.fr(p);
        return Math.abs(up-dn)<2 ? (L()?"เกือบ ที่ความเร็วต่ำ":"nearly, at low speed") : (L()?"ไม่ — ขาเข้าเลื่อนมากกว่า":"no — the approach shifts more"); }}
    ],
    world:{ kind:"free" },
    scene:function(o,S,W){
      var p=S.p, t=S.t, x=C12.x(p,t), y=C12.y, c=C12.c;
      /* each wavefront remembers where the wisp was when it left */
      o.push('<clipPath id="c12clip"><rect x="0" y="0" width="560" height="'+(STAGE.FRAME.div-4)+'"/></clipPath><g clip-path="url(#c12clip)">');
      for(var te=Math.floor(t/C12.Te)*C12.Te; te>=0 && c*(t-te)<520; te-=C12.Te){
        var r=c*(t-te); if(r<1) continue;
        o.push('<circle cx="'+fmt2(C12.x(p,te))+'" cy="'+y+'" r="'+fmt2(r)+'" fill="none" stroke="var(--accent)" stroke-width="'+(S.hl==="fs"?1.8:1.2)+'" opacity="'+fmt2(Math.max(0.12,0.75-r/600))+'"/>');
      }
      o.push('</g>');
      /* each listener hears the squeezed note until the wisp passes it, then the stretched one */
      var hear=function(px, lab){
        var gone=x>=px, hz=t>0||p.vs>0 ? (gone ? C12.fr(p) : C12.fa(p)) : p.fs, col=gone ? "var(--good)" : "var(--accent)";
        role("marker")(o, px, y+44, {on:true});
        fitText(o, px, y+60, lab, 120, 10, "var(--ink-faint)", "middle");
        fitText(o, px, y+74, [fmt(hz)+" Hz", fmt(hz)+" Hz"], 120, 12, col, "middle");
      };
      hear(500, ["far listener","ผู้ฟังไกล"]);
      hear(46, ["behind","ข้างหลัง"]);
      hear(C12.lx, ["listener","ผู้ฟัง"]);
      role("wisp")(o, x, y, {clock:STAGE.clock});
    },
    handles:[
      {k:"vs", at:function(p,S){ return {px:C12.x(p,S.t)+30+p.vs*0.25, py:C12.y-28}; },
       set:function(px,py,p,S){ return {vs:(px-30-C12.at)/0.25}; },
       lab:["drag its speed","ลากความเร็ว"], col:"accent2"}
    ],
    instrument:{ kind:"graph",
      xmin:0, xmax:14, ymin:0, ymax:2500,
      xlab:["seconds","วินาที"], ylab:["Hz the listener hears","Hz ที่ผู้ฟังได้ยิน"],
      fn:function(x,p){ var tp=C12.tpass(p); return x<tp ? C12.fa(p) : C12.fr(p); },
      mark:function(p,S){ return S.t; }
    },
    overlay:function(o,S,G){
      var y=fmt2(G.Y(S.p.fs));
      o.push('<line x1="'+fmt2(G.X(0))+'" y1="'+y+'" x2="'+fmt2(G.X(14))+'" y2="'+y+'" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="4 4"/>');
      o.push('<text x="'+fmt2(G.X(14)-4)+'" y="'+(+y-5)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="end">'+(L()?"โน้ตที่ภูตร้อง":"the note it sings")+'</text>');
    },
    spell:{
      tex:function(p){ return "f_\\text{ahead} = f_s\\,\\dfrac{v}{v - v_s} = "+p.fs+"\\cdot\\dfrac{"+p.v+"}{"+p.v+" - "+p.vs+"} = "+fmt(C12.fa(p))+"\\,\\text{Hz}"+
                              "\\qquad f_\\text{behind} = "+p.fs+"\\cdot\\dfrac{"+p.v+"}{"+p.v+" + "+p.vs+"} = "+fmt(C12.fr(p))+"\\,\\text{Hz}"; },
      terms:[
        {k:"fs", sym:"f_s", lab:["the note it sings","โน้ตที่ร้อง"], col:"faint", f:function(p){ return p.fs+" Hz"; }},
        {k:"vs", sym:"v_s", lab:["the wisp's speed","อัตราเร็วภูต"], col:"accent2", f:function(p){ return p.vs+" m/s"; }}
      ]
    },
    predict:{ kind:"choice",
      ask:["As the wisp flies past the listener, what happens to the pitch they hear?","ขณะที่ภูตบินผ่านผู้ฟัง เสียงที่ผู้ฟังได้ยินเป็นอย่างไร"],
      opts:[["It slides down gradually","ค่อย ๆ ต่ำลง"],["It drops suddenly as it passes","ต่ำลงทันทีตอนผ่าน"],["It stays the same","คงเดิม"],["It rises","สูงขึ้น"]],
      actual:function(p){ return p.vs>0 ? 1 : 2; },
      explain:function(p){ return ["Coming in, every wavefront is squeezed by the same amount, so the pitch is a steady "+fmt(C12.fa(p))+" Hz; going away it is a steady "+fmt(C12.fr(p))+" Hz. The change happens at the instant it passes — not a slow slide.",
                                   "ขาเข้า หน้าคลื่นทุกลูกถูกบีบเท่ากัน เสียงจึงคงที่ "+fmt(C12.fa(p))+" Hz ขาออกคงที่ "+fmt(C12.fr(p))+" Hz การเปลี่ยนเกิดขึ้นทันทีขณะผ่าน ไม่ใช่ค่อย ๆ ไล่ลง"]; }
    },
    trials:{
      veil:true,
      make:function(){
        var vs=10*ri(3,28), fs=20*ri(15,40), v=340, ahead=Math.random()<0.6;
        return {kind:ahead?"ahead":"behind", vs:vs, fs:fs, v:v, X:ahead?fs*v/(v-vs):fs*v/(v+vs), set:{fs:fs, v:v, vs:0, T:11}};
      },
      lock:["fs","v"],
      say:function(g){
        return g.kind==="ahead"
          ? ["The wisp sings "+g.fs+" Hz. How fast must it fly so the listener ahead hears exactly "+fmt(g.X)+" Hz? (v = 340 m/s)",
             "ภูตร้อง "+g.fs+" Hz ต้องบินเร็วเท่าใดให้ผู้ฟังข้างหน้าได้ยิน "+fmt(g.X)+" Hz พอดี (v = 340 ม./วิ)"]
          : ["The wisp sings "+g.fs+" Hz. How fast must it fly so the listener behind hears exactly "+fmt(g.X)+" Hz? (v = 340 m/s)",
             "ภูตร้อง "+g.fs+" Hz ต้องบินเร็วเท่าใดให้ผู้ฟังข้างหลังได้ยิน "+fmt(g.X)+" Hz พอดี (v = 340 ม./วิ)"];
      },
      check:function(p,S,g){
        if(p.vs===g.vs) return {ok:true, msg:[g.kind==="ahead" ? "Exactly "+fmt(g.X)+" Hz ahead. From f = f_s·v / (v − v_s): v_s = v(1 − f_s / f) = "+g.vs+" m/s."
                                                                : "Exactly "+fmt(g.X)+" Hz behind. From f = f_s·v / (v + v_s): v_s = v(f_s / f − 1) = "+g.vs+" m/s.",
                                              g.kind==="ahead" ? "ข้างหน้าได้ยิน "+fmt(g.X)+" Hz พอดี จาก f = f_s·v / (v − v_s) ได้ v_s = v(1 − f_s / f) = "+g.vs+" ม./วิ"
                                                                : "ข้างหลังได้ยิน "+fmt(g.X)+" Hz พอดี จาก f = f_s·v / (v + v_s) ได้ v_s = v(f_s / f − 1) = "+g.vs+" ม./วิ"]};
        var got=g.kind==="ahead"?C12.fa(p):C12.fr(p);
        return {ok:false, msg:["That listener heard "+fmt(got)+" Hz. Ahead the wisp chases its own waves (v − v_s); behind it runs from them (v + v_s).",
                               "ผู้ฟังได้ยิน "+fmt(got)+" Hz ข้างหน้าภูตไล่ตามคลื่นของตัวเอง (v − v_s) ข้างหลังมันหนีคลื่น (v + v_s)"]};
      }
    },
    note:["the wisp never changes its note — only the spacing of the arriving wavefronts does",
          "ภูตไม่เคยเปลี่ยนโน้ต มีเพียงระยะห่างของหน้าคลื่นที่มาถึงเท่านั้นที่เปลี่ยน"]
  },
  guide:[
    {say:["A wisp hovering still. The rings are evenly spaced and everyone hears 500 Hz.",
          "ภูตลอยนิ่ง วงคลื่นห่างเท่ากัน ทุกคนได้ยิน 500 Hz"], set:{fs:500,vs:0,v:340,T:11}},
    {say:["Set it flying. Rings bunch up ahead and stretch out behind. Watch the listener's graph drop in one step as it passes.",
          "ให้มันบิน วงคลื่นเบียดกันข้างหน้าและยืดออกข้างหลัง ดูกราฟของผู้ฟังตกลงทีเดียวตอนภูตผ่าน"], set:{fs:500,vs:150,v:340,T:11}},
    {say:["Near the speed of sound the rings ahead pile up and that pitch runs away — the shift is not symmetric.",
          "ใกล้อัตราเร็วเสียง วงคลื่นข้างหน้าอัดแน่นและเสียงสูงพุ่งขึ้น การเลื่อนไม่สมมาตร"], set:{fs:500,vs:300,v:340,T:7}}
  ]
}
],

methods:[
{id:"M-01", name:["Speed of sound and v = fλ","อัตราเร็วเสียงและ v = fλ"]},
{id:"M-02", name:["Inverse-square intensity","ความเข้มแบบกำลังสองผกผัน"]},
{id:"M-03", name:["Convert intensity to decibels","แปลงความเข้มเป็นเดซิเบล"]},
{id:"M-04", name:["Resonance in a pipe","การสั่นพ้องในท่อ"]},
{id:"M-05", name:["Beat frequency","ความถี่บีต"]},
{id:"M-06", name:["Doppler shift direction","ทิศทางการเลื่อนดอปเพลอร์"]}
],

traps:{
"T-01":["Intensity follows an inverse SQUARE. Doubling the distance quarters it, not halves it.","ความเข้มเป็นกำลังสองผกผัน เพิ่มระยะสองเท่าจะลดเหลือหนึ่งในสี่ ไม่ใช่ครึ่งหนึ่ง"],
"T-02":["Decibels are logarithmic. Ten times the intensity adds 10 dB, it does not multiply the dB by ten.","เดซิเบลเป็นลอการิทึม ความเข้มสิบเท่าเพิ่ม 10 dB ไม่ใช่คูณค่า dB ด้วยสิบ"],
"T-03":["A closed pipe fits a quarter wavelength and gives only odd harmonics. An open pipe fits a half.","ท่อปลายปิดบรรจุหนึ่งในสี่ความยาวคลื่นและให้ฮาร์มอนิกคี่เท่านั้น ส่วนท่อปลายเปิดบรรจุครึ่งหนึ่ง"],
"T-04":["Beat frequency is the difference of the two frequencies, not their sum or average.","ความถี่บีตคือผลต่างของสองความถี่ ไม่ใช่ผลรวมหรือค่าเฉลี่ย"]
},

gen:{
"M-01": function(sf){
  var t=pick([0,15,20,25,30]), v=331+0.6*t, f=pick([256,440,512,1000]);
  if(sf==="S-04") return {stem:["In which medium does sound travel fastest?","เสียงเดินทางเร็วที่สุดในตัวกลางใด"],
    opts:[{v:["Steel","เหล็กกล้า"],ok:1},{v:["Water","น้ำ"]},{v:["Air","อากาศ"]},{v:["A vacuum","สุญญากาศ"]}],unit:""};
  if(sf==="S-05") return {stem:["Sound of frequency "+f+" Hz has wavelength "+fmt2((331+0.6*20)/f)+" m in air. What is the speed of sound?",
                                "เสียงความถี่ "+f+" เฮิรตซ์ มีความยาวคลื่น "+fmt2((331+0.6*20)/f)+" เมตรในอากาศ อัตราเร็วเสียงเป็นเท่าใด"],
    opts:[{v:String(343),ok:1},{v:String(f),trap:"T-01"},{v:"331"},{v:"300"}],unit:" m/s"};
  return {stem:["Find the speed of sound in air at "+t+" °C.",
                "จงหาอัตราเร็วเสียงในอากาศที่ "+t+" องศาเซลเซียส"],
    opts:[{v:fmt(v),ok:1},{v:fmt(331-0.6*t)},{v:"331"},{v:fmt(331+t)}],unit:" m/s"};
},
"M-02": function(sf){
  var P=pick([10,50,100]), r=pick([2,4,5,10]);
  var I=P/(4*Math.PI*r*r);
  if(sf==="S-04") return {stem:["You move from 3 m to 6 m from a point source. The intensity you receive becomes:",
                                "คุณย้ายจาก 3 เมตรเป็น 6 เมตรจากแหล่งกำเนิดแบบจุด ความเข้มที่ได้รับกลายเป็น"],
    opts:[{v:["One quarter","หนึ่งในสี่"],ok:1},{v:["One half","ครึ่งหนึ่ง"],trap:"T-01"},
          {v:["One eighth","หนึ่งในแปด"]},{v:["Unchanged","เท่าเดิม"]}],unit:""};
  if(sf==="S-05") return {stem:["At "+r+" m the intensity is "+I.toExponential(2)+" W/m². Find the source power.",
                                "ที่ระยะ "+r+" เมตร ความเข้มเป็น "+I.toExponential(2)+" วัตต์/ตร.ม. จงหากำลังแหล่งกำเนิด"],
    opts:[{v:String(P),ok:1},{v:fmt(I*r),trap:"T-01"},{v:fmt(P/2)},{v:fmt(P*2)}],unit:" W"};
  return {stem:["A "+P+" W point source radiates evenly. Find the intensity at "+r+" m.",
                "แหล่งกำเนิดแบบจุด "+P+" วัตต์ แผ่ออกสม่ำเสมอ จงหาความเข้มที่ระยะ "+r+" เมตร"],
    opts:[{v:I.toExponential(2),ok:1},{v:(P/(4*Math.PI*r)).toExponential(2),trap:"T-01"},
          {v:(P/r).toExponential(2)},{v:(I/2).toExponential(2)}],unit:" W/m²"};
},
"M-03": function(sf){
  var n=pick([2,4,6,8]), I=Math.pow(10,-12+n);
  var b=10*n;
  if(sf==="S-04") return {stem:["The intensity of a sound is multiplied by 100. By how much does the level rise?",
                                "ความเข้มเสียงเพิ่มขึ้น 100 เท่า ระดับเสียงเพิ่มขึ้นเท่าใด"],
    opts:[{v:"20 dB",ok:1},{v:"100 dB",trap:"T-02"},{v:"2 dB"},{v:"1000 dB",trap:"T-02"}],unit:""};
  if(sf==="S-05") return {stem:["A sound measures "+b+" dB. Find its intensity, with I₀ = 10⁻¹² W/m².",
                                "เสียงวัดได้ "+b+" เดซิเบล จงหาความเข้ม โดย I₀ = 10⁻¹² W/m²"],
    opts:[{v:I.toExponential(0),ok:1},{v:(b*1e-12).toExponential(0),trap:"T-02"},
          {v:(I*10).toExponential(0)},{v:(I/10).toExponential(0)}],unit:" W/m²"};
  return {stem:["A sound has intensity "+I.toExponential(0)+" W/m². Find its level in decibels.",
                "เสียงมีความเข้ม "+I.toExponential(0)+" วัตต์/ตร.ม. จงหาระดับเสียงเป็นเดซิเบล"],
    opts:[{v:String(b),ok:1},{v:String(n),trap:"T-02"},{v:String(b*10),trap:"T-02"},{v:String(b/2)}],unit:" dB"};
},
"M-04": function(sf){
  var L=pick([0.25,0.5,0.85,1]), v=340;
  var fc=v/(4*L), fo=v/(2*L);
  if(sf==="S-04") return {stem:["Which harmonics does a pipe closed at one end produce?",
                                "ท่อปลายปิดข้างเดียวให้ฮาร์มอนิกใดบ้าง"],
    opts:[{v:["Odd harmonics only","ฮาร์มอนิกคี่เท่านั้น"],ok:1},
          {v:["All harmonics","ทุกฮาร์มอนิก"],trap:"T-03"},
          {v:["Even harmonics only","ฮาร์มอนิกคู่เท่านั้น"],trap:"T-03"},
          {v:["Only the fundamental","เฉพาะความถี่มูลฐาน"]}],unit:""};
  if(sf==="S-05") return {stem:["An open pipe has a fundamental of "+fmt(fo)+" Hz with v = 340 m/s. Find its length.",
                                "ท่อปลายเปิดมีความถี่มูลฐาน "+fmt(fo)+" เฮิรตซ์ ที่ v = 340 ม./วินาที จงหาความยาว"],
    opts:[{v:String(L),ok:1},{v:fmt(L/2),trap:"T-03"},{v:fmt(L*2),trap:"T-03"},{v:fmt(v/fo)}],unit:" m"};
  return {stem:["A pipe of length "+L+" m is closed at one end. Find its fundamental frequency, with v = 340 m/s.",
                "ท่อยาว "+L+" เมตร ปลายปิดข้างเดียว จงหาความถี่มูลฐาน โดย v = 340 ม./วินาที"],
    opts:[{v:fmt(fc),ok:1},{v:fmt(fo),trap:"T-03"},{v:fmt(v/L)},{v:fmt(fc*2)}],unit:" Hz"};
},
"M-05": function(sf){
  var f1=pick([256,330,440,512]), df=pick([2,3,4,5]);
  var f2=f1+df;
  if(sf==="S-04") return {stem:["A piano tuner hears the beats slow down and stop. What does that mean?",
                                "ช่างตั้งเสียงเปียโนได้ยินบีตช้าลงจนหยุด นั่นหมายความว่าอะไร"],
    opts:[{v:["The two frequencies now match","ความถี่ทั้งสองตรงกันแล้ว"],ok:1},
          {v:["The strings are an octave apart","สายทั้งสองห่างกันหนึ่งอ็อกเทฟ"]},
          {v:["One string has snapped","สายหนึ่งขาด"]},
          {v:["The frequencies have doubled","ความถี่เพิ่มเป็นสองเท่า"],trap:"T-04"}],unit:""};
  if(sf==="S-05") return {stem:["Two notes beat at "+df+" Hz. One is "+f1+" Hz. What could the other be?",
                                "โน้ตสองเสียงเกิดบีต "+df+" เฮิรตซ์ เสียงหนึ่งคือ "+f1+" เฮิรตซ์ อีกเสียงอาจเป็นเท่าใด"],
    opts:[{v:String(f2),ok:1},{v:String(f1+2*df)},{v:String(f1*df),trap:"T-04"},{v:String(f1+df*10)}],unit:" Hz"};
  return {stem:["Two tuning forks of "+f1+" Hz and "+f2+" Hz are struck together. Find the beat frequency.",
                "ส้อมเสียง "+f1+" เฮิรตซ์ และ "+f2+" เฮิรตซ์ ถูกเคาะพร้อมกัน จงหาความถี่บีต"],
    opts:[{v:String(df),ok:1},{v:String(f1+f2),trap:"T-04"},{v:fmt((f1+f2)/2),trap:"T-04"},{v:String(df*2)}],unit:" Hz"};
},
"M-06": function(sf){
  var C=[{s:["An ambulance approaches you with its siren on. What do you hear?","รถพยาบาลเปิดไซเรนวิ่งเข้าหาคุณ คุณได้ยินอย่างไร"],
          ok:["A higher pitch than the siren actually emits","ระดับเสียงสูงกว่าที่ไซเรนปล่อยออกมาจริง"],
          w:[["A lower pitch","ระดับเสียงต่ำกว่า"],["The true pitch","ระดับเสียงจริง"],["A louder but identical pitch","ดังขึ้นแต่ระดับเสียงเท่าเดิม"]]},
         {s:["When exactly does the pitch of a passing siren drop?","ระดับเสียงไซเรนที่วิ่งผ่านลดลงตอนใดพอดี"],
          ok:["At the instant it passes you","ในขณะที่มันผ่านคุณพอดี"],
          w:[["Gradually, over several seconds before","ค่อยๆ ลดลงหลายวินาทีก่อนหน้า"],
             ["Only after it is far away","หลังจากมันไปไกลแล้วเท่านั้น"],
             ["It never drops","ไม่เคยลดลง"]]},
         {s:["Does the Doppler effect change the frequency the source emits?","ปรากฏการณ์ดอปเพลอร์เปลี่ยนความถี่ที่แหล่งกำเนิดปล่อยออกมาหรือไม่"],
          ok:["No — only the frequency received changes","ไม่ มีเพียงความถี่ที่รับได้เท่านั้นที่เปลี่ยน"],
          w:[["Yes, the source slows down","เปลี่ยน แหล่งกำเนิดช้าลง"],
             ["Yes, it doubles","เปลี่ยน เป็นสองเท่า"],
             ["Only for light, not sound","เฉพาะแสง ไม่ใช่เสียง"]]}];
  var c=pick(C);
  return {stem:c.s, opts:[{v:c.ok,ok:1},{v:c.w[0]},{v:c.w[1]},{v:c.w[2]}],unit:""};
}
}
};
