var CHAPTER = {
id:"ch19", num:"19", slug:"atomic-physics", subject:"physics",
kicker:["Physics · Chapter 19","ฟิสิกส์ · บทที่ 19"],
title:["Atomic Physics","ฟิสิกส์อะตอม"],
mapTitle:["Where the waves turn out to be particles","เมื่อคลื่นกลับกลายเป็นอนุภาค"],
lede:["Chapter 10 proved light is a wave. This one shows the same light arriving in indivisible lumps. Both are true, and learning to hold both at once is the point of the chapter.",
      "บทที่ 10 พิสูจน์ว่าแสงเป็นคลื่น บทนี้แสดงว่าแสงเดียวกันนั้นมาถึงเป็นก้อนที่แบ่งไม่ได้ ทั้งสองเป็นจริง และการเรียนรู้ที่จะยึดทั้งสองไว้พร้อมกันคือหัวใจของบทนี้"],
next:["→ continues in Chapter 20 · Nuclear Physics","→ ต่อในบทที่ 20 · ฟิสิกส์นิวเคลียร์"],

nodes:[
{ id:"photon", x:235, y:52, requires:[], methods:["M-01","M-06"],
  title:["The photon","โฟตอน"],
  body:[["Light comes in packets of energy E = hf = hc/λ, with h = 6.63 × 10⁻³⁴ J·s. A dim beam is fewer photons, not smaller ones — each photon of a given colour always carries exactly the same energy.",
         "These energies are tiny in joules, so the electronvolt is used instead: 1 eV = 1.6 × 10⁻¹⁹ J. Forgetting the conversion is trap T-02 and it shifts every answer by nineteen orders of magnitude."],
        ["แสงมาเป็นก้อนพลังงาน E = hf = hc/λ โดย h = 6.63 × 10⁻³⁴ จูล·วินาที ลำแสงที่จางคือโฟตอนจำนวนน้อยลง ไม่ใช่โฟตอนที่เล็กลง โฟตอนของสีหนึ่งๆ พาพลังงานเท่ากันเป๊ะเสมอ",
         "พลังงานเหล่านี้เล็กมากเมื่อวัดเป็นจูล จึงใช้อิเล็กตรอนโวลต์แทน 1 eV = 1.6 × 10⁻¹⁹ จูล การลืมแปลงหน่วยคือกับดัก T-02 และมันเลื่อนคำตอบไปสิบเก้าอันดับ"]],
  formula:["E = hf = hc/λ        1 eV = 1.6 × 10⁻¹⁹ J","E = hf = hc/λ        1 eV = 1.6 × 10⁻¹⁹ J"],
  flabel:["Energy per packet, fixed by colour","พลังงานต่อก้อน กำหนดโดยสี"],
  viz:"plot",
  vizcfg:{
    title:["PHOTON ENERGY IS SET BY FREQUENCY ALONE","พลังงานโฟตอนกำหนดโดยความถี่เท่านั้น"],
    xlab:["frequency (10¹⁴ Hz)","ความถี่ (10¹⁴ Hz)"], ylab:["photon energy (eV)","พลังงานโฟตอน (eV)"],
    xmin:0, xmax:20, ymin:0, fill:false,
    fn:function(x,p){ return 4.136e-15*x*1e14; },
    mark:function(p){ return p.f; },
    ctrls:[
      {k:"f", lab:["Frequency","ความถี่"], min:1, max:19, step:.5, def:5, unit:" ×10¹⁴ Hz"},
      {k:"n", lab:["How many photons","จำนวนโฟตอน"], min:1, max:100, step:1, def:1, unit:""}
    ],
    readouts:[
      {lab:["Energy of one photon","พลังงานของโฟตอนหนึ่งตัว"], f:function(S){
        return fmt2(4.136e-15*S.p.f*1e14)+" eV"; }},
      {lab:["Wavelength","ความยาวคลื่น"], f:function(S){
        return fmt2(3e8/(S.p.f*1e14)*1e9)+" nm"; }},
      {lab:["Total energy delivered","พลังงานรวมที่ส่งมา"], f:function(S){
        return fmt2(S.p.n*4.136e-15*S.p.f*1e14)+" eV"; }},
      {lab:["Brighter light means","แสงสว่างขึ้นแปลว่า"], f:function(){
        return L()?"โฟตอนมากขึ้น ไม่ใช่โฟตอนที่แรงขึ้น":"more photons, not stronger photons"; }}
    ],
    note:["turning up the brightness slides no point along this line — it only adds more points","การเพิ่มความสว่างไม่ได้เลื่อนจุดไปตามเส้นนี้ แต่เพิ่มจำนวนจุดเท่านั้น"]
  } },

{ id:"photoelectric", x:100, y:150, requires:["photon"], methods:["M-02"],
  title:["The photoelectric effect","ปรากฏการณ์โฟโตอิเล็กทริก"],
  body:[["Shine light on a metal and electrons may be ejected — but only if the frequency exceeds a threshold. Below it, nothing happens no matter how bright the source, which no wave theory can explain.",
         "One photon frees one electron: hf = W + E_k. Raising the intensity releases more electrons but never faster ones. Believing brighter light gives more energetic electrons is trap T-01, and it is the single most tested misconception in the chapter."],
        ["ฉายแสงบนโลหะแล้วอิเล็กตรอนอาจหลุดออกมา แต่เฉพาะเมื่อความถี่เกินค่าขีดเริ่ม ต่ำกว่านั้นจะไม่เกิดอะไรเลยไม่ว่าแหล่งกำเนิดจะสว่างแค่ไหน ซึ่งทฤษฎีคลื่นอธิบายไม่ได้",
         "หนึ่งโฟตอนปลดปล่อยหนึ่งอิเล็กตรอน hf = W + E_k การเพิ่มความเข้มปล่อยอิเล็กตรอนมากขึ้นแต่ไม่เคยเร็วขึ้น การเชื่อว่าแสงสว่างกว่าให้อิเล็กตรอนพลังงานสูงกว่าคือกับดัก T-01 และเป็นความเข้าใจผิดที่ถูกออกสอบมากที่สุดในบทนี้"]],
  formula:["hf = W + E_k,max        f₀ = W/h","hf = W + E_k,max        f₀ = W/h"],
  flabel:["Brighter means more, not faster","สว่างกว่าคือมากกว่า ไม่ใช่เร็วกว่า"],
  viz:"plot",
  vizcfg:{
    title:["MAXIMUM KINETIC ENERGY AGAINST FREQUENCY","พลังงานจลน์สูงสุด เทียบ ความถี่"],
    xlab:["frequency (10¹⁴ Hz)","ความถี่ (10¹⁴ Hz)"], ylab:["max kinetic energy (eV)","พลังงานจลน์สูงสุด (eV)"],
    xmin:0, xmax:20, fill:false,
    fn:function(x,p){ return Math.max(0, 4.136e-15*x*1e14 - p.phi); },
    mark:function(p){ return p.f; },
    ctrls:[
      {k:"phi", lab:["Work function","ฟังก์ชันงาน"], min:1, max:6, step:.1, def:2.3, unit:" eV"},
      {k:"f",   lab:["Frequency","ความถี่"], min:1, max:19, step:.5, def:8, unit:" ×10¹⁴ Hz"},
      {k:"I",   lab:["Intensity (a decoy)","ความเข้ม (ตัวลวง)"], min:1, max:20, step:1, def:5, unit:""}
    ],
    readouts:[
      {lab:["Threshold frequency","ความถี่ขีดเริ่ม"], f:function(S){
        return fmt2(S.p.phi/4.136e-15/1e14)+" ×10¹⁴ Hz"; }},
      {lab:["Maximum kinetic energy","พลังงานจลน์สูงสุด"], f:function(S){
        var e=4.136e-15*S.p.f*1e14-S.p.phi;
        return e<=0 ? (L()?"ไม่มีอิเล็กตรอนหลุดออกมา":"no electrons emitted at all") : fmt2(e)+" eV"; }},
      {lab:["Effect of intensity","ผลของความเข้ม"], f:function(){
        return L()?"เพิ่มจำนวนอิเล็กตรอน ไม่เพิ่มพลังงาน":"more electrons, never more energy each"; }},
      {lab:["Slope of the line","ความชันของเส้น"], f:function(){
        return L()?"คือค่าคงตัวของพลังค์ h":"is Planck's constant h"; }}
    ],
    note:["drag the intensity slider all the way — the line will not move by one pixel","ลากแถบความเข้มจนสุด เส้นกราฟจะไม่ขยับแม้แต่พิกเซลเดียว"]
  },
  guide:[
    {say:["Below the threshold nothing happens at all, however long you wait. The line sits on the floor.",
          "ต่ำกว่าความถี่ขีดเริ่ม ไม่มีอะไรเกิดขึ้นเลย ไม่ว่าจะรอนานแค่ไหน เส้นกราฟติดพื้น"], set:{phi:2.3,f:4,I:5}},
    {say:["Cross the threshold and electrons appear immediately, with energy that climbs in a straight line.",
          "ผ่านความถี่ขีดเริ่มไป อิเล็กตรอนปรากฏทันที โดยมีพลังงานที่ไต่ขึ้นเป็นเส้นตรง"], set:{phi:2.3,f:8,I:5}},
    {say:["Now crank the intensity to maximum. Nothing moves — this is exactly what broke the wave theory.",
          "ทีนี้เร่งความเข้มจนสุด ไม่มีอะไรขยับ นี่คือสิ่งที่ทำให้ทฤษฎีคลื่นพังลงพอดี"], set:{phi:2.3,f:8,I:20}},
    {say:["A different metal shifts the whole line sideways, but the slope stays h — the same for every metal.",
          "โลหะต่างชนิดเลื่อนเส้นทั้งเส้นไปด้านข้าง แต่ความชันยังเป็น h เท่าเดิมสำหรับทุกโลหะ"], set:{phi:5,f:16,I:5}}
  ] },

{ id:"bohr", x:370, y:150, requires:["photon"], methods:["M-03","M-04"],
  title:["Energy levels","ระดับพลังงาน"],
  body:[["An electron in hydrogen may occupy only certain energies, E_n = −13.6/n² eV. The negative sign means bound; zero energy is a free electron, and n = 1 at −13.6 eV is the ground state.",
         "A photon is emitted when the electron drops between levels, carrying exactly the difference. Because the levels are discrete, the emitted wavelengths are too — which is why every element has its own fingerprint spectrum."],
        ["อิเล็กตรอนในไฮโดรเจนอยู่ได้เฉพาะบางระดับพลังงานเท่านั้น E_n = −13.6/n² อิเล็กตรอนโวลต์ เครื่องหมายลบหมายถึงถูกยึดไว้ พลังงานศูนย์คืออิเล็กตรอนอิสระ และ n = 1 ที่ −13.6 eV คือสถานะพื้น",
         "โฟตอนถูกปล่อยออกมาเมื่ออิเล็กตรอนตกลงระหว่างระดับ โดยพาพลังงานเท่ากับผลต่างพอดี เพราะระดับพลังงานไม่ต่อเนื่อง ความยาวคลื่นที่ปล่อยออกมาจึงไม่ต่อเนื่องด้วย นี่คือเหตุผลที่ทุกธาตุมีสเปกตรัมเป็นลายนิ้วมือของตัวเอง"]],
  formula:["E_n = −13.6 / n²  eV        ΔE = E_i − E_f","E_n = −13.6 / n²  eV        ΔE = E_i − E_f"],
  flabel:["Discrete levels · discrete spectrum","ระดับไม่ต่อเนื่อง · สเปกตรัมไม่ต่อเนื่อง"],
  viz:{
    vb:"0 0 560 340", anim:false,
    ctrls:[
      {k:"ni", lab:["From level nᵢ","จากระดับ nᵢ"], min:2, max:6, step:1, def:3, unit:""},
      {k:"nf", lab:["To level n_f","ไปยังระดับ n_f"], min:1, max:5, step:1, def:2, unit:""}
    ],
    readouts:[
      {lab:["Photon energy","พลังงานโฟตอน"], f:function(S){
        var dE=13.6*(1/(S.p.nf*S.p.nf)-1/(S.p.ni*S.p.ni));
        return dE>0 ? fmt2(dE)+" eV" : (L()?"ต้องดูดกลืน":"absorbed"); }},
      {lab:["Wavelength","ความยาวคลื่น"], f:function(S){
        var dE=13.6*(1/(S.p.nf*S.p.nf)-1/(S.p.ni*S.p.ni));
        return dE>0 ? String(Math.round(1240/dE))+" nm" : "—"; }},
      {lab:["Series","อนุกรม"], f:function(S){
        var N={1:"Lyman (UV)",2:"Balmer (visible)",3:"Paschen (IR)"};
        return N[String(S.p.nf)]||(L()?"อินฟราเรดไกล":"far IR"); }}
    ],
    draw:function(S,o){
      var ni=S.p.ni, nf=S.p.nf;
      var x0=110, x1=430, top=44, bot=286;
      function Y(E){ return top + (E-0)/(-13.6-0)*(bot-top); }   /* 0 eV at top, −13.6 at bottom */
      o.push('<text x="24" y="24" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5" letter-spacing="1.4">'+tx(["HYDROGEN ENERGY LEVELS","ระดับพลังงานของไฮโดรเจน"])+'</text>');
      /* the energy scale itself */
      for(var e=0;e>=-14;e-=2){
        var gy=Y(e);
        o.push('<line x1="'+(x0-8)+'" y1="'+gy+'" x2="'+(x0-2)+'" y2="'+gy+'" stroke="var(--ink-faint)" stroke-width="1"/>');
        o.push('<text x="'+(x0-12)+'" y="'+(gy+3.5)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="end">'+e+'</text>');
      }
      o.push('<text transform="rotate(-90 34 '+((top+bot)/2)+')" x="34" y="'+((top+bot)/2)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">E (eV)</text>');
      /* the levels */
      for(var n=1;n<=6;n++){
        var E=-13.6/(n*n), y=Y(E);
        var on=(n===ni||n===nf);
        o.push('<line x1="'+x0+'" y1="'+y+'" x2="'+x1+'" y2="'+y+'" stroke="'+(on?"var(--accent)":"var(--ink-soft)")+'" stroke-width="'+(on?2.4:1.4)+'"/>');
        o.push('<text x="'+(x1+10)+'" y="'+(y+4)+'" fill="'+(on?"var(--accent)":"var(--ink-faint)")+'" font-family="IBM Plex Sans" font-size="11" font-weight="600">n='+n+'</text>');
        o.push('<text x="'+(x1+56)+'" y="'+(y+4)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="9.5">'+fmt2(E)+'</text>');
      }
      o.push('<line x1="'+x0+'" y1="'+Y(0)+'" x2="'+x1+'" y2="'+Y(0)+'" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="4 3"/>');
      o.push('<text x="'+(x1+10)+'" y="'+(Y(0)+4)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["free","อิสระ"])+'</text>');
      /* the transition */
      var yi=Y(-13.6/(ni*ni)), yf=Y(-13.6/(nf*nf)), txx=(x0+x1)/2;
      var dE=13.6*(1/(nf*nf)-1/(ni*ni));
      var down=(yf>yi);
      o.push('<line x1="'+txx+'" y1="'+yi+'" x2="'+txx+'" y2="'+yf+'" stroke="var(--accent)" stroke-width="2.4"/>');
      var ay=down?yf:yf;
      o.push('<path d="M'+txx+' '+ay+' l-5 '+(down?-9:9)+' l10 0 z" fill="var(--accent)"/>');
      if(dE>0){
        o.push('<text x="'+(txx+12)+'" y="'+((yi+yf)/2)+'" fill="var(--accent)" font-family="IBM Plex Sans" font-size="11" font-weight="600">'+fmt2(dE)+' eV</text>');
        o.push('<text x="'+(txx+12)+'" y="'+((yi+yf)/2+15)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+Math.round(1240/dE)+' nm emitted</text>');
      } else {
        o.push('<text x="'+(txx+12)+'" y="'+((yi+yf)/2)+'" fill="var(--warn)" font-family="IBM Plex Sans" font-size="11">absorbs '+fmt2(-dE)+' eV</text>');
      }
      o.push('<text x="24" y="320" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["levels crowd together towards zero — that is why series converge","ระดับพลังงานเบียดกันเข้าหาศูนย์ — นั่นคือเหตุผลที่อนุกรมลู่เข้า"])+'</text>');
    }
  },
  guide:[
    {say:["Six levels, drawn against a real energy scale. Notice how they crowd together as they approach zero.",
          "หกระดับ วาดเทียบกับสเกลพลังงานจริง สังเกตว่าระดับเบียดกันแน่นขึ้นเมื่อเข้าใกล้ศูนย์"], set:{ni:3,nf:2}},
    {say:["A drop from n=3 to n=2 emits 1.89 eV — red light, and the first line of the Balmer series.",
          "การตกจาก n=3 ไป n=2 ปล่อยพลังงาน 1.89 eV คือแสงสีแดง และเป็นเส้นแรกของอนุกรมบัลเมอร์"], set:{ni:3,nf:2}},
    {say:["Drop all the way to n=1 instead. Far more energy, far shorter wavelength — the Lyman series is ultraviolet.",
          "ลองตกลงไปถึง n=1 แทน พลังงานมากกว่ามาก ความยาวคลื่นสั้นกว่ามาก อนุกรมไลมันอยู่ในย่านอัลตราไวโอเลต"], set:{ni:3,nf:1}},
    {say:["Now set nᵢ below n_f. The electron must climb, so a photon is absorbed rather than emitted.",
          "ทีนี้ตั้ง nᵢ ให้ต่ำกว่า n_f อิเล็กตรอนต้องไต่ขึ้น โฟตอนจึงถูกดูดกลืนแทนที่จะถูกปล่อย"], set:{ni:2,nf:4}}
  ]},

{ id:"spectra", x:235, y:248, requires:["bohr"], methods:["M-04"],
  title:["Line spectra","สเปกตรัมเส้น"],
  body:[["A hot gas emits only the wavelengths its energy gaps allow, giving bright lines on a dark background. The same gas, cold and lit from behind, absorbs exactly those wavelengths and leaves dark lines instead.",
         "Transitions ending at n = 1 form the Lyman series in the ultraviolet, at n = 2 the Balmer series in visible light, at n = 3 the Paschen series in the infrared. This is how we know what stars are made of."],
        ["แก๊สร้อนปล่อยเฉพาะความยาวคลื่นที่ช่องว่างพลังงานอนุญาต เกิดเป็นเส้นสว่างบนพื้นมืด แก๊สเดียวกันเมื่อเย็นและมีแสงส่องจากด้านหลัง จะดูดกลืนความยาวคลื่นเหล่านั้นพอดีและเหลือเป็นเส้นมืดแทน",
         "การเปลี่ยนระดับที่จบที่ n = 1 เกิดอนุกรมไลมันในย่านอัลตราไวโอเลต ที่ n = 2 เกิดอนุกรมบัลเมอร์ในย่านแสงที่มองเห็น ที่ n = 3 เกิดอนุกรมพาสเชนในย่านอินฟราเรด นี่คือวิธีที่เรารู้ว่าดาวฤกษ์ประกอบด้วยอะไร"]],
  formula:["1/λ = R_H (1/n_f² − 1/n_i²)","1/λ = R_H (1/n_f² − 1/n_i²)"],
  flabel:["Lyman UV · Balmer visible · Paschen IR","ไลมัน UV · บัลเมอร์ แสง · พาสเชน IR"],
  viz:"bars",
  vizcfg:{
    title:["THE BALMER LINES CROWD TOGETHER","เส้นบัลเมอร์เบียดเข้าหากัน"],
    ylab:["wavelength (nm)","ความยาวคลื่น (nm)"],
    ctrls:[
      {k:"nf", lab:["Series ends on level","อนุกรมจบที่ระดับ"], min:1, max:4, step:1, def:2, unit:""}
    ],
    readouts:[
      {lab:["Series name","ชื่ออนุกรม"], f:function(S){
        return [["Lyman · ultraviolet","ไลมัน · อัลตราไวโอเลต"],["Balmer · visible","บัลเมอร์ · ที่ตามองเห็น"],
                ["Paschen · infrared","พาสเชน · อินฟราเรด"],["Brackett · infrared","แบร็กเกตต์ · อินฟราเรด"]][S.p.nf-1][L()]; }},
      {lab:["Longest wavelength","ความยาวคลื่นมากสุด"], f:function(S){
        var nf=S.p.nf, ni=nf+1;
        return fmt2(1/(1.097e-2*(1/(nf*nf)-1/(ni*ni))))+" nm"; }},
      {lab:["Series limit","ขีดจำกัดอนุกรม"], f:function(S){
        var nf=S.p.nf;
        return fmt2(1/(1.097e-2*(1/(nf*nf))))+" nm"; }},
      {lab:["Why they bunch up","ทำไมจึงเบียดกัน"], f:function(){
        return L()?"ระดับพลังงานสูงๆ อยู่ชิดกันมากขึ้น":"the upper energy levels crowd closer and closer"; }}
    ],
    bars:[
      {lab:["nᵢ = nf+1","nᵢ = nf+1"], f:function(p){ var n=p.nf+1; return 1/(1.097e-2*(1/(p.nf*p.nf)-1/(n*n))); }, col:"accent"},
      {lab:["nᵢ = nf+2","nᵢ = nf+2"], f:function(p){ var n=p.nf+2; return 1/(1.097e-2*(1/(p.nf*p.nf)-1/(n*n))); }, col:"good"},
      {lab:["nᵢ = nf+3","nᵢ = nf+3"], f:function(p){ var n=p.nf+3; return 1/(1.097e-2*(1/(p.nf*p.nf)-1/(n*n))); }, col:"good"},
      {lab:["nᵢ = nf+4","nᵢ = nf+4"], f:function(p){ var n=p.nf+4; return 1/(1.097e-2*(1/(p.nf*p.nf)-1/(n*n))); }, col:"good"},
      {lab:["limit","ขีดจำกัด"], f:function(p){ return 1/(1.097e-2*(1/(p.nf*p.nf))); }, col:"warn"}
    ],
    note:["the bars converge on the amber one — every series has a limit it never passes","แถบต่างๆ ลู่เข้าหาแถบสีเหลืองอำพัน ทุกอนุกรมมีขีดจำกัดที่ไม่มีวันข้าม"]
  } },

{ id:"debroglie", x:235, y:346, requires:["photoelectric","spectra"], methods:["M-05"],
  title:["Wave–particle duality","ทวิภาวะคลื่น–อนุภาค"],
  body:[["If waves can behave as particles, de Broglie asked, might particles behave as waves? He proposed λ = h/p, and electron diffraction confirmed it within a few years.",
         "The wavelength is absurdly small for anything macroscopic — a thrown ball has one around 10⁻³⁴ m, which is why we never notice. Only for electrons and lighter does the wave nature become measurable."],
        ["ถ้าคลื่นประพฤติตัวเป็นอนุภาคได้ เดอบรอยล์ถามว่า แล้วอนุภาคจะประพฤติตัวเป็นคลื่นได้ไหม เขาเสนอ λ = h/p และการเลี้ยวเบนของอิเล็กตรอนก็ยืนยันภายในไม่กี่ปี",
         "ความยาวคลื่นเล็กจนน่าขันสำหรับสิ่งที่มองเห็นได้ ลูกบอลที่ขว้างออกไปมีค่าราว 10⁻³⁴ เมตร จึงเป็นเหตุผลที่เราไม่เคยสังเกตเห็น มีเพียงอิเล็กตรอนและสิ่งที่เบากว่าเท่านั้นที่ความเป็นคลื่นวัดได้"]],
  formula:["λ = h/p = h/mv","λ = h/p = h/mv"],
  flabel:["Everything has a wavelength","ทุกสิ่งมีความยาวคลื่น"],
  viz:"plot",
  vizcfg:{
    title:["WAVELENGTH OF A MOVING PARTICLE","ความยาวคลื่นของอนุภาคที่เคลื่อนที่"],
    xlab:["momentum (10⁻²⁴ kg m/s)","โมเมนตัม (10⁻²⁴ kg m/s)"], ylab:["wavelength (nm)","ความยาวคลื่น (nm)"],
    xmin:.2, xmax:10, ymin:0, fill:false,
    fn:function(x,p){ return 6.626e-34/(x*1e-24)*1e9; },
    mark:function(p){ return p.pm; },
    ctrls:[
      {k:"pm", lab:["Momentum","โมเมนตัม"], min:.3, max:9.5, step:.1, def:2, unit:" ×10⁻²⁴"}
    ],
    readouts:[
      {lab:["Wavelength","ความยาวคลื่น"], f:function(S){
        return fmt2(6.626e-34/(S.p.pm*1e-24)*1e9)+" nm"; }},
      {lab:["Compared with an atom","เทียบกับอะตอม"], f:function(S){
        var l=6.626e-34/(S.p.pm*1e-24)*1e9;
        return l>0.3 ? (L()?"ใหญ่กว่าอะตอม — เห็นการเลี้ยวเบนได้":"bigger than an atom — diffraction is observable")
                     : (L()?"เล็กกว่าอะตอม":"smaller than an atom"); }},
      {lab:["For a cricket ball","สำหรับลูกคริกเก็ต"], f:function(){
        return L()?"ราว 10⁻³⁴ เมตร — วัดไม่ได้เลย":"about 10⁻³⁴ m — utterly unmeasurable"; }},
      {lab:["Why we never notice it","ทำไมเราไม่เคยสังเกตเห็น"], f:function(){
        return L()?"h เล็กมาก โมเมนตัมของสิ่งของทั่วไปจึงใหญ่เกินไป":"h is tiny, so everyday momenta are far too large"; }}
    ],
    note:["a hyperbola: double the momentum and the wavelength halves","ไฮเพอร์โบลา โมเมนตัมสองเท่าทำให้ความยาวคลื่นเหลือครึ่ง"]
  } }
],

methods:[
{id:"M-01", name:["Photon energy from f or λ","พลังงานโฟตอนจาก f หรือ λ"]},
{id:"M-02", name:["Apply the photoelectric equation","ใช้สมการโฟโตอิเล็กทริก"]},
{id:"M-03", name:["Bohr energy levels","ระดับพลังงานของโบร์"]},
{id:"M-04", name:["Transition energy and wavelength","พลังงานและความยาวคลื่นของการเปลี่ยนระดับ"]},
{id:"M-05", name:["de Broglie wavelength","ความยาวคลื่นเดอบรอยล์"]},
{id:"M-06", name:["Convert between joules and eV","แปลงระหว่างจูลกับ eV"]}
],

traps:{
"T-01":["Brighter light releases MORE electrons, not faster ones. Only frequency sets their energy.","แสงที่สว่างกว่าปล่อยอิเล็กตรอนมากขึ้น ไม่ใช่เร็วขึ้น มีเพียงความถี่ที่กำหนดพลังงานของมัน"],
"T-02":["Electronvolts and joules were mixed. 1 eV = 1.6 × 10⁻¹⁹ J.","สับสนระหว่างอิเล็กตรอนโวลต์กับจูล 1 eV = 1.6 × 10⁻¹⁹ จูล"],
"T-03":["Energy levels are negative and E_n = −13.6/n². Higher n means less negative, not larger.","ระดับพลังงานเป็นลบและ E_n = −13.6/n² ค่า n สูงขึ้นหมายถึงติดลบน้อยลง ไม่ใช่ใหญ่ขึ้น"],
"T-04":["Below the threshold frequency nothing is emitted, however intense the light.","ต่ำกว่าความถี่ขีดเริ่ม จะไม่มีอิเล็กตรอนหลุดออกมาเลย ไม่ว่าแสงจะเข้มแค่ไหน"]
},

gen:{
"M-01": function(sf){
  var lam=pick([400,500,600,700]), h=6.63e-34, c=3e8;
  var E=h*c/(lam*1e-9);
  if(sf==="S-04") return {stem:["A beam of red light is made dimmer. What happens to the energy of each photon?",
                                "ทำให้ลำแสงสีแดงจางลง พลังงานของแต่ละโฟตอนเปลี่ยนอย่างไร"],
    opts:[{v:["Unchanged — only the number of photons falls","ไม่เปลี่ยน มีเพียงจำนวนโฟตอนที่ลดลง"],ok:1},
          {v:["It falls","ลดลง"],trap:"T-01"},{v:["It rises","เพิ่มขึ้น"],trap:"T-01"},
          {v:["It becomes zero","กลายเป็นศูนย์"]}],unit:""};
  return {stem:["Find the energy of a photon of wavelength "+lam+" nm, with h = 6.63 × 10⁻³⁴ J·s.",
                "จงหาพลังงานของโฟตอนความยาวคลื่น "+lam+" นาโนเมตร โดย h = 6.63 × 10⁻³⁴ จูล·วินาที"],
    opts:[{v:E.toExponential(2),ok:1},{v:(E/1.6e-19).toExponential(2),trap:"T-02"},
          {v:(h*lam).toExponential(2)},{v:(E*2).toExponential(2)}],unit:" J"};
},
"M-02": function(sf){
  var W=pick([2.0,2.3,3.0,4.5]), E=pick([4.0,5.0,6.0]);
  var Ek=E-W, h=6.63e-34;
  var f0=W*1.6e-19/h;
  if(sf==="S-04") return {stem:["Light below the threshold frequency shines very brightly on a metal. What is emitted?",
                                "แสงที่ความถี่ต่ำกว่าขีดเริ่มส่องโลหะอย่างสว่างมาก มีอะไรหลุดออกมา"],
    opts:[{v:["Nothing at all","ไม่มีอะไรเลย"],ok:1},
          {v:["Many slow electrons","อิเล็กตรอนช้าจำนวนมาก"],trap:"T-04"},
          {v:["A few fast electrons","อิเล็กตรอนเร็วจำนวนน้อย"],trap:"T-04"},
          {v:["Electrons, after a delay","อิเล็กตรอน หลังจากรอสักครู่"],trap:"T-04"}],unit:""};
  if(sf==="S-05") return {stem:["A metal has work function "+W+" eV. Find its threshold frequency, with h = 6.63 × 10⁻³⁴ J·s.",
                                "โลหะมีฟังก์ชันงาน "+W+" eV จงหาความถี่ขีดเริ่ม โดย h = 6.63 × 10⁻³⁴ จูล·วินาที"],
    opts:[{v:f0.toExponential(2),ok:1},{v:(W/h).toExponential(2),trap:"T-02"},
          {v:(f0/2).toExponential(2)},{v:(h/W).toExponential(2)}],unit:" Hz"};
  return {stem:["A photon of "+E+" eV strikes a metal of work function "+W+" eV. Find the maximum kinetic energy of the electron.",
                "โฟตอนพลังงาน "+E+" eV ชนโลหะที่มีฟังก์ชันงาน "+W+" eV จงหาพลังงานจลน์สูงสุดของอิเล็กตรอน"],
    opts:[{v:fmt2(Ek),ok:1},{v:fmt2(E+W),trap:"T-01"},{v:String(E)},{v:String(W)}],unit:" eV"};
},
"M-03": function(sf){
  var n=pick([1,2,3,4]);
  var E=-13.6/(n*n);
  if(sf==="S-04") return {stem:["Why are hydrogen's energy levels written as negative numbers?",
                                "ทำไมระดับพลังงานของไฮโดรเจนจึงเขียนเป็นจำนวนลบ"],
    opts:[{v:["The electron is bound; zero means free","อิเล็กตรอนถูกยึดไว้ ศูนย์หมายถึงเป็นอิสระ"],ok:1},
          {v:["It is only a convention","เป็นเพียงข้อตกลง"],trap:"T-03"},
          {v:["The electron has negative charge","อิเล็กตรอนมีประจุลบ"],trap:"T-03"},
          {v:["Energy is always negative","พลังงานเป็นลบเสมอ"],trap:"T-03"}],unit:""};
  if(sf==="S-05") return {stem:["A hydrogen level sits at "+fmt2(E)+" eV. Which level is it?",
                                "ระดับพลังงานของไฮโดรเจนอยู่ที่ "+fmt2(E)+" eV เป็นระดับใด"],
    opts:[{v:"n = "+n,ok:1},{v:"n = "+(n+1)},{v:"n = "+(n+2)},{v:"n = 1",trap:"T-03"}],unit:""};
  return {stem:["Find the energy of the n = "+n+" level in hydrogen.",
                "จงหาพลังงานของระดับ n = "+n+" ในไฮโดรเจน"],
    opts:[{v:fmt2(E),ok:1},{v:fmt2(-E),trap:"T-03"},{v:fmt2(-13.6/n),trap:"T-03"},{v:"-13.6"}],unit:" eV"};
},
"M-04": function(sf){
  var ni=pick([3,4,5]), nf=pick([1,2]);
  var dE=13.6*(1/(nf*nf)-1/(ni*ni));
  var lam=1240/dE;
  if(sf==="S-04") return {stem:["Transitions ending at n = 2 in hydrogen produce which series?",
                                "การเปลี่ยนระดับที่จบที่ n = 2 ในไฮโดรเจนให้อนุกรมใด"],
    opts:[{v:["Balmer, in visible light","บัลเมอร์ ในย่านแสงที่มองเห็น"],ok:1},
          {v:["Lyman, in the ultraviolet","ไลมัน ในย่านอัลตราไวโอเลต"],trap:"T-03"},
          {v:["Paschen, in the infrared","พาสเชน ในย่านอินฟราเรด"],trap:"T-03"},
          {v:["No series at all","ไม่เกิดอนุกรมใด"]}],unit:""};
  if(sf==="S-02"||sf==="S-05") return {stem:["A hydrogen transition emits a photon of wavelength "+Math.round(lam)+" nm. Find its energy in eV, using E = 1240/λ.",
                                             "การเปลี่ยนระดับของไฮโดรเจนปล่อยโฟตอนความยาวคลื่น "+Math.round(lam)+" นาโนเมตร จงหาพลังงานเป็น eV โดยใช้ E = 1240/λ"],
    opts:[{v:fmt2(dE),ok:1},{v:fmt2(dE*1.6e-19),trap:"T-02"},{v:fmt2(lam/1240)},{v:fmt2(dE/2)}],unit:" eV"};
  return {stem:["An electron falls from n = "+ni+" to n = "+nf+" in hydrogen. Find the photon energy.",
                "อิเล็กตรอนตกจาก n = "+ni+" ไป n = "+nf+" ในไฮโดรเจน จงหาพลังงานโฟตอน"],
    opts:[{v:fmt2(dE),ok:1},{v:fmt2(-dE),trap:"T-03"},{v:fmt2(13.6/nf)},{v:fmt2(13.6)}],unit:" eV"};
},
"M-05": function(sf){
  var m=9.11e-31, v=pick([1e6,2e6,5e6]), h=6.63e-34;
  var lam=h/(m*v);
  if(sf==="S-04") return {stem:["Why is the wave nature of a thrown cricket ball never observed?",
                                "ทำไมจึงไม่เคยสังเกตเห็นความเป็นคลื่นของลูกคริกเก็ตที่ขว้างออกไป"],
    opts:[{v:["Its de Broglie wavelength is around 10⁻³⁴ m","ความยาวคลื่นเดอบรอยล์ของมันราว 10⁻³⁴ เมตร"],ok:1},
          {v:["Large objects have no wavelength","วัตถุขนาดใหญ่ไม่มีความยาวคลื่น"]},
          {v:["It moves too slowly","มันเคลื่อนที่ช้าเกินไป"]},
          {v:["Only charged particles have wavelengths","เฉพาะอนุภาคมีประจุที่มีความยาวคลื่น"]}],unit:""};
  return {stem:["An electron of mass 9.11 × 10⁻³¹ kg moves at "+v.toExponential(0)+" m/s. Find its de Broglie wavelength.",
                "อิเล็กตรอนมวล 9.11 × 10⁻³¹ กิโลกรัม เคลื่อนที่ด้วย "+v.toExponential(0)+" ม./วินาที จงหาความยาวคลื่นเดอบรอยล์"],
    opts:[{v:lam.toExponential(2),ok:1},{v:(m*v/h).toExponential(2)},
          {v:(h*m*v).toExponential(2)},{v:(lam*2).toExponential(2)}],unit:" m"};
},
"M-06": function(sf){
  var eV=pick([1.5,2.5,4,10]);
  var J=eV*1.6e-19;
  if(sf==="S-05") return {stem:["An energy of "+J.toExponential(2)+" J is how many electronvolts?",
                                "พลังงาน "+J.toExponential(2)+" จูล คิดเป็นกี่อิเล็กตรอนโวลต์"],
    opts:[{v:String(eV),ok:1},{v:J.toExponential(2),trap:"T-02"},{v:String(eV*1.6)},{v:String(eV/1.6)}],unit:" eV"};
  return {stem:["Convert "+eV+" eV into joules.","จงแปลง "+eV+" อิเล็กตรอนโวลต์ เป็นจูล"],
    opts:[{v:J.toExponential(2),ok:1},{v:(eV/1.6e-19).toExponential(2),trap:"T-02"},
          {v:String(eV),trap:"T-02"},{v:(J*2).toExponential(2)}],unit:" J"};
}
}
};
