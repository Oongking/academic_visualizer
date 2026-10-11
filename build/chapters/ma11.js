var CHAPTER = {
id:"ma11", num:"11", slug:"probability", subject:"math",
kicker:["Mathematics · Chapter 11","คณิตศาสตร์ · บทที่ 11"],
title:["Probability","ความน่าจะเป็น"],
mapTitle:["Counting the ways things can happen","การนับวิธีที่เหตุการณ์เกิดขึ้นได้"],
lede:["Probability is counting in disguise. Almost every question reduces to two counts — the outcomes you want, and the outcomes there are — so most of the difficulty is combinatorial rather than probabilistic.",
      "ความน่าจะเป็นก็คือการนับในคราบอื่น โจทย์เกือบทุกข้อลงท้ายที่การนับสองอย่าง คือจำนวนผลลัพธ์ที่เราต้องการ กับจำนวนผลลัพธ์ทั้งหมดที่เกิดได้ ส่วนที่ยากจริง ๆ จึงมักเป็นเรื่องการนับแบบจัดหมู่ มากกว่าเรื่องความน่าจะเป็น"],
next:["→ continues in Chapter 12 · Graph Theory","→ ต่อในบทที่ 12 · ทฤษฎีกราฟ"],

nodes:[
{ id:"counting", x:235, y:52, requires:[], methods:["M-01"],
  title:["Counting principles","หลักการนับ"],
  body:[["If a task splits into independent stages, multiply the choices at each stage — that is the multiplication principle. If instead you are choosing between mutually exclusive alternatives, add. Confusing 'and' with 'or' here is the root of most counting errors.",
         "Factorials count arrangements of everything: n! orders n distinct objects. When some objects repeat, divide by the factorial of each repeated group, otherwise you count the same arrangement several times over."],
        ["ถ้างานแบ่งเป็นหลายขั้นที่ไม่เกี่ยวข้องกัน ให้คูณจำนวนตัวเลือกของแต่ละขั้น นี่คือหลักการคูณ แต่ถ้าเราเลือกระหว่างทางเลือกที่เกิดพร้อมกันไม่ได้ ให้บวก การสับสนระหว่าง และ กับ หรือ ตรงนี้ เป็นต้นเหตุของการนับผิดส่วนใหญ่",
         "แฟกทอเรียลใช้นับการจัดเรียงของทุกชิ้น n! คือจำนวนวิธีเรียงวัตถุที่ต่างกัน n ชิ้น ถ้ามีวัตถุซ้ำกัน ให้หารด้วยแฟกทอเรียลของแต่ละกลุ่มที่ซ้ำ ไม่อย่างนั้นเราจะนับการจัดเรียงแบบเดียวกันหลายรอบ"]],
  formula:["stages: multiply        alternatives: add        n! arranges n objects","ขั้นตอน: คูณ        ทางเลือก: บวก        n! คือจำนวนวิธีเรียงวัตถุ n ชิ้น"],
  flabel:["'And' multiplies, 'or' adds","และ คือคูณ, หรือ คือบวก"],
  viz:"bars",
  vizcfg:{
    title:["'AND' MULTIPLIES · 'OR' ADDS","และ คือคูณ · หรือ คือบวก"],
    ylab:["number of outcomes","จำนวนผลลัพธ์"],
    ctrls:[
      {k:"a", lab:["Choices at stage 1","ตัวเลือกขั้นที่ 1"], min:1, max:10, step:1, def:4, unit:""},
      {k:"b", lab:["Choices at stage 2","ตัวเลือกขั้นที่ 2"], min:1, max:10, step:1, def:3, unit:""},
      {k:"c", lab:["Choices at stage 3","ตัวเลือกขั้นที่ 3"], min:1, max:10, step:1, def:2, unit:""}
    ],
    readouts:[
      {lab:["All three stages ('and')","ครบทั้งสามขั้น (และ)"], f:function(S){
        return String(S.p.a*S.p.b*S.p.c); }},
      {lab:["Pick just one ('or')","เลือกเพียงขั้นเดียว (หรือ)"], f:function(S){
        return String(S.p.a+S.p.b+S.p.c); }},
      {lab:["Which grows faster","อันไหนโตเร็วกว่า"], f:function(){
        return L()?"การคูณ — เร็วกว่ามาก":"multiplication, by a very long way"; }},
      {lab:["The deciding word","คำที่ตัดสิน"], f:function(){
        return L()?"ทำทุกขั้น หรือ เลือกขั้นเดียว":"do every stage, or choose just one"; }}
    ],
    bars:[
      {lab:["Stage 1","ขั้นที่ 1"], f:function(p){ return p.a; }, col:"faint"},
      {lab:["Stage 2","ขั้นที่ 2"], f:function(p){ return p.b; }, col:"faint"},
      {lab:["Stage 3","ขั้นที่ 3"], f:function(p){ return p.c; }, col:"faint"},
      {lab:["Sum ('or')","ผลบวก (หรือ)"], f:function(p){ return p.a+p.b+p.c; }, col:"good"},
      {lab:["Product ('and')","ผลคูณ (และ)"], f:function(p){ return p.a*p.b*p.c; }, col:"accent"}
    ],
    note:["read the question for 'and' or 'or' before writing a single number down","อ่านโจทย์หาคำว่า และ หรือ หรือ ก่อนเขียนตัวเลขแม้แต่ตัวเดียว"]
  } },

{ id:"perm-comb", x:100, y:150, requires:["counting"], methods:["M-02"],
  title:["Permutations and combinations","การเรียงสับเปลี่ยนและการจัดหมู่"],
  body:[["A permutation counts selections where order matters — nPr = n!/(n−r)!. A combination counts selections where it does not — nCr = n!/[r!(n−r)!], which is exactly nPr divided by the r! ways of shuffling the chosen items among themselves.",
         "Deciding which one applies is the whole skill. A committee is a combination; a ranked podium is a permutation. Using nPr where nCr belongs inflates the answer by a factor of r!, and that is trap T-01 — the single most expensive error in this chapter."],
        ["การเรียงสับเปลี่ยนนับการเลือกที่ลำดับมีผล คือ nPr = n!/(n−r)! ส่วนการจัดหมู่นับการเลือกที่ลำดับไม่มีผล คือ nCr = n!/[r!(n−r)!] ซึ่งก็คือ nPr หารด้วย r! เพราะของที่เลือกมาแล้วสลับที่กันเองได้ r! วิธี",
         "ทักษะสำคัญของเรื่องนี้คือตัดสินให้ได้ว่าโจทย์ต้องใช้แบบไหน คณะกรรมการเป็นการจัดหมู่ ส่วนผู้ขึ้นแท่นรับรางวัลที่มีการจัดอันดับเป็นการเรียงสับเปลี่ยน ถ้าใช้ nPr ทั้งที่ต้องใช้ nCr คำตอบจะมากเกินจริง r! เท่า นี่คือกับดัก T-01 ที่ทำให้เสียคะแนนมากที่สุดในบทนี้"]],
  formula:["nPr = n!/(n−r)!        nCr = nPr / r!","nPr = n!/(n−r)!        nCr = nPr / r!"],
  flabel:["Order matters → P. It does not → C.","ลำดับสำคัญ → P ไม่สำคัญ → C"],
  viz:"bars",
  vizcfg:{
    title:["THE COST OF CARING ABOUT ORDER","ราคาของการสนใจลำดับ"],
    ylab:["number of selections","จำนวนวิธีเลือก"],
    ctrls:[
      {k:"n", lab:["Choose from n","เลือกจาก n"], min:2, max:10, step:1, def:8, unit:""},
      {k:"r", lab:["Choose r of them","เลือก r ตัว"], min:1, max:6, step:1, def:3, unit:""}
    ],
    readouts:[
      {lab:["nPr — order matters","nPr — ลำดับสำคัญ"], f:function(S){
        var v=1; for(var i=0;i<S.p.r;i++) v*=(S.p.n-i); return String(v); }},
      {lab:["nCr — order ignored","nCr — ไม่สนใจลำดับ"], f:function(S){
        var v=1,i; for(i=0;i<S.p.r;i++) v*=(S.p.n-i);
        var f=1; for(i=2;i<=S.p.r;i++) f*=i; return String(v/f); }},
      {lab:["Ratio between them","อัตราส่วนระหว่างกัน"], f:function(S){
        var f=1; for(var i=2;i<=S.p.r;i++) f*=i;
        return String(f)+" = "+S.p.r+"!"; }},
      {lab:["Which is always larger","อันไหนมากกว่าเสมอ"], f:function(){
        return L()?"nPr — เพราะนับการเรียงซ้ำ":"nPr — it counts the reorderings separately"; }}
    ],
    bars:[
      {lab:["nPr","nPr"], f:function(p){ var v=1; for(var i=0;i<p.r;i++) v*=(p.n-i); return v; }, col:"accent"},
      {lab:["nCr","nCr"], f:function(p){
        var v=1,i; for(i=0;i<p.r;i++) v*=(p.n-i);
        var f=1; for(i=2;i<=p.r;i++) f*=i; return v/f; }, col:"good"},
      {lab:["r!","r!"], f:function(p){ var f=1; for(var i=2;i<=p.r;i++) f*=i; return f; }, col:"warn"}
    ],
    note:["using nPr where nCr belongs inflates your answer by exactly r! — the amber bar","ใช้ nPr ทั้งที่ต้องใช้ nCr คำตอบจะมากเกินไปพอดี r! เท่า ดูได้จากแถบสีเหลืองอำพัน"]
  },
  guide:[
    {say:["Choosing 3 from 8. The permutation count is six times the combination count.",
          "เลือก 3 จาก 8 จำนวนแบบเรียงสับเปลี่ยนมากกว่าแบบจัดหมู่หกเท่า"], set:{n:8,r:3}},
    {say:["That factor of six is exactly 3! — the number of ways to shuffle the three you picked.",
          "ที่ต่างกันหกเท่าก็เพราะ 3! พอดี คือจำนวนวิธีสลับที่ของสามชิ้นที่เลือกมา"], set:{n:8,r:3}},
    {say:["Choose only one and the gap disappears. With a single item there is nothing to reorder.",
          "ถ้าเลือกเพียงชิ้นเดียว ความต่างนี้จะหายไป เพราะของชิ้นเดียวไม่มีอะไรให้สลับที่"], set:{n:8,r:1}}
  ] },

{ id:"sample-space", x:370, y:150, requires:["counting"], methods:["M-03"],
  title:["Sample space","แซมเปิลสเปซ"],
  body:[["The sample space is the set of every possible outcome, and an event is a subset of it. For equally likely outcomes, P(E) = n(E)/n(S) — favourable over total.",
         "Two dice make this concrete: the sample space is a 6 × 6 grid of 36 ordered pairs. Highlight an event in the lab and the probability is simply how much of the grid lights up. Notice that a total of 7 covers a whole diagonal while a total of 2 covers a single cell — which is why the sums are not equally likely even though the 36 cells are."],
        ["แซมเปิลสเปซคือเซตของผลลัพธ์ที่เป็นไปได้ทั้งหมด ส่วนเหตุการณ์คือสับเซตของมัน เมื่อทุกผลลัพธ์มีโอกาสเท่ากัน P(E) = n(E)/n(S) คือจำนวนที่ต้องการหารด้วยจำนวนทั้งหมด",
         "ลูกเต๋าสองลูกช่วยให้เห็นภาพ แซมเปิลสเปซคือตาราง 6 × 6 ที่มีคู่อันดับ 36 คู่ ลองเลือกเหตุการณ์ในห้องทดลอง แล้วความน่าจะเป็นก็คือสัดส่วนของช่องที่สว่างขึ้นในตาราง สังเกตว่าผลรวม 7 กินพื้นที่ทั้งแนวทแยง แต่ผลรวม 2 มีช่องเดียว ผลรวมจึงมีโอกาสไม่เท่ากัน ทั้งที่ทั้ง 36 ช่องมีโอกาสเท่ากัน"]],
  formula:["P(E) = n(E) / n(S)        0 ≤ P(E) ≤ 1","P(E) = n(E) / n(S)        0 ≤ P(E) ≤ 1"],
  flabel:["36 equal cells, but unequal sums","36 ช่องเท่ากัน แต่ผลรวมไม่เท่ากัน"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"mode", lab:["Event:","เหตุการณ์:"], opts:[["sum","ผลรวม"], ["doubles","เลขคู่เหมือน"], ["at-least","อย่างน้อย"], ["difference","ผลต่าง"]], min:0, def:0, unit:""},
      {k:"val", lab:["Target value","ค่าเป้าหมาย"], min:1, max:12, step:1, def:7, unit:""}
    ],
    readouts:[
      {lab:["Favourable n(E)","ที่ต้องการ n(E)"], f:function(S){ return String(S._hit||0); }},
      {lab:["Total n(S)","ทั้งหมด n(S)"], f:function(){ return "36"; }},
      {lab:["P(E)","P(E)"], f:function(S){
        var h=S._hit||0;
        return h+"/36 = "+fmt2(h/36); }},
      {lab:["P(not E)","P(E ไม่เกิด)"], f:function(S){
        var h=S._hit||0;
        return (36-h)+"/36 = "+fmt2((36-h)/36); }}
    ],
    draw:function(S,o){
      var p=S.p, m=p.mode, v=p.val, hit=0;
      var test=function(i,j){
        if(m===0) return (i+j)===v;
        if(m===1) return i===j;
        if(m===2) return (i+j)>=v;
        return Math.abs(i-j)===Math.min(v,5);
      };
      var LBL=[["Sum equals "+v,"ผลรวมเท่ากับ "+v],
               ["Both dice the same","ลูกเต๋าเหมือนกันทั้งสอง"],
               ["Sum at least "+v,"ผลรวมอย่างน้อย "+v],
               ["Difference equals "+Math.min(v,5),"ผลต่างเท่ากับ "+Math.min(v,5)]][m];
      var x0=96, y0=54, c=36;
      o.push('<text x="'+x0+'" y="28" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.4">'+tx(["SAMPLE SPACE · TWO DICE","แซมเปิลสเปซ · ลูกเต๋าสองลูก"])+'</text>');
      o.push('<text x="'+x0+'" y="44" fill="var(--accent)" font-family="IBM Plex Sans" font-size="11.5" font-weight="600">'+
             (L()?LBL[1]:LBL[0])+'</text>');
      var i,j;
      for(i=1;i<=6;i++){
        o.push('<text x="'+(x0+(i-1)*c+c/2)+'" y="'+(y0-6)+
               '" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="11" text-anchor="middle">'+i+'</text>');
        o.push('<text x="'+(x0-12)+'" y="'+(y0+(i-1)*c+c/2+4)+
               '" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="11" text-anchor="middle">'+i+'</text>');
      }
      for(i=1;i<=6;i++) for(j=1;j<=6;j++){
        var on=test(i,j); if(on) hit++;
        var cx=x0+(i-1)*c, cy=y0+(j-1)*c;
        o.push('<rect x="'+cx+'" y="'+cy+'" width="'+(c-2)+'" height="'+(c-2)+
               '" fill="'+(on?"var(--accent)":"var(--surface)")+
               '" stroke="var(--rule)" stroke-width="1"'+(on?'':' opacity="0.9"')+'/>');
        o.push('<text x="'+(cx+c/2-1)+'" y="'+(cy+c/2+3)+
               '" fill="'+(on?"#fff":"var(--ink-faint)")+
               '" font-family="IBM Plex Sans" font-size="10" text-anchor="middle">'+(i+j)+'</text>');
      }
      S._hit=hit;
      o.push('<text x="'+x0+'" y="'+(y0+6*c+22)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="11">'+tx(["die A across · die B down · each cell shows the total","ลูกเต๋า A ตามแนวนอน · ลูกเต๋า B ตามแนวตั้ง · แต่ละช่องแสดงผลรวม"])+'</text>');
      /* the probability read as a bar, so the fraction has a picture */
      var bx=352, bw=170;
      o.push('<text x="'+bx+'" y="'+(y0+18)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.2">P(E)</text>');
      o.push('<rect x="'+bx+'" y="'+(y0+28)+'" width="'+bw+'" height="18" fill="var(--surface)" stroke="var(--rule)"/>');
      o.push('<rect x="'+bx+'" y="'+(y0+28)+'" width="'+(bw*hit/36)+'" height="18" fill="var(--accent)"/>');
      o.push('<text x="'+bx+'" y="'+(y0+66)+'" fill="var(--ink)" font-family="IBM Plex Sans" font-size="13" font-weight="600">'+
             hit+' / 36</text>');
      o.push('<text x="'+bx+'" y="'+(y0+86)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="11">= '+fmt2(hit/36)+'</text>');
    }
  },
  guide:[
    {say:["A total of 7 lights up a full diagonal — six cells out of 36, the most likely total there is.",
          "ผลรวม 7 ทำให้แนวทแยงสว่างทั้งเส้น คือ 6 ช่องจาก 36 ช่อง เป็นผลรวมที่มีโอกาสมากที่สุด"], set:{mode:0,val:7}},
    {say:["Now ask for 2. Only one cell qualifies. Same 36 equally likely cells, wildly unequal sums.",
          "ลองเปลี่ยนเป็น 2 ดูบ้าง มีช่องเดียวที่ตรงเงื่อนไข ทั้งที่ทั้ง 36 ช่องมีโอกาสเท่ากัน แต่ผลรวมแต่ละค่ากลับต่างกันมาก"], set:{mode:0,val:2}},
    {say:["Doubles form the main diagonal — six cells, the same count as a total of 7, so the same probability.",
          "แต้มเหมือนกันอยู่บนแนวทแยงหลัก มี 6 ช่อง เท่ากับผลรวม 7 ความน่าจะเป็นจึงเท่ากัน"], set:{mode:1,val:7}},
    {say:["'At least 10' fills a corner triangle. Watch P(not E) in the readout — it is always what is left over.",
          "เงื่อนไข อย่างน้อย 10 ครอบคลุมสามเหลี่ยมมุมหนึ่งของตาราง ลองดูค่า P(E ไม่เกิด) ในช่องแสดงผล มันคือส่วนที่เหลือเสมอ"], set:{mode:2,val:10}}
  ]},

{ id:"rules", x:235, y:248, requires:["sample-space"], methods:["M-04"],
  title:["Probability rules","กฎของความน่าจะเป็น"],
  body:[["The addition rule is P(A∪B) = P(A) + P(B) − P(A∩B). The subtraction is not optional: without it the overlap gets counted twice. Only for mutually exclusive events does the intersection vanish and the rule simplify — assuming that without checking is trap T-02.",
         "The complement rule P(not A) = 1 − P(A) is worth reaching for whenever a question says 'at least one'. Counting the single case where nothing happens is nearly always faster than counting every case where something does."],
        ["กฎการบวกคือ P(A∪B) = P(A) + P(B) − P(A∩B) ต้องลบเสมอ ถ้าไม่ลบ ส่วนที่ซ้อนกันจะถูกนับสองรอบ จะไม่ต้องลบก็ต่อเมื่อเหตุการณ์เกิดร่วมกันไม่ได้ เพราะส่วนร่วมเป็นศูนย์ กฎจึงง่ายลง การสรุปแบบนั้นโดยไม่ตรวจก่อนคือกับดัก T-02",
         "กฎคอมพลีเมนต์ P(A ไม่เกิด) = 1 − P(A) ควรนึกถึงทุกครั้งที่โจทย์ถามว่า อย่างน้อยหนึ่ง เพราะการนับกรณีเดียวที่ไม่มีอะไรเกิดเลย มักเร็วกว่านับทุกกรณีที่มีบางอย่างเกิดขึ้น"]],
  formula:["P(A∪B) = P(A) + P(B) − P(A∩B)        P(not A) = 1 − P(A)","P(A∪B) = P(A) + P(B) − P(A∩B)        P(A ไม่เกิด) = 1 − P(A)"],
  flabel:["'At least one' → use the complement","อย่างน้อยหนึ่ง → ใช้คอมพลีเมนต์"],
  viz:"bars",
  vizcfg:{
    title:["THE OVERLAP GETS COUNTED TWICE","ส่วนซ้อนทับถูกนับสองครั้ง"],
    ylab:["probability","ความน่าจะเป็น"],
    ctrls:[
      {k:"a",  lab:["P(A)","P(A)"], min:0, max:100, step:5, def:40, unit:" %"},
      {k:"b",  lab:["P(B)","P(B)"], min:0, max:100, step:5, def:35, unit:" %"},
      {k:"ab", lab:["P(A ∩ B)","P(A ∩ B)"], min:0, max:60, step:5, def:15, unit:" %"}
    ],
    readouts:[
      {lab:["P(A) + P(B)","P(A) + P(B)"], f:function(S){ return fmt2((S.p.a+S.p.b)/100); }},
      {lab:["P(A ∪ B)","P(A ∪ B)"], f:function(S){
        return fmt2((S.p.a+S.p.b-Math.min(S.p.ab,S.p.a,S.p.b))/100); }},
      {lab:["Mutually exclusive?","ไม่เกิดร่วมกันไหม"], f:function(S){
        return S.p.ab===0 ? (L()?"ใช่ — ไม่ต้องลบ":"yes — nothing to subtract")
                          : (L()?"ไม่ใช่ — ต้องลบส่วนร่วม":"no — the overlap must come off"); }},
      {lab:["P(not A)","P(A ไม่เกิด)"], f:function(S){ return fmt2(1-S.p.a/100); }}
    ],
    bars:[
      {lab:["P(A)","P(A)"], f:function(p){ return p.a/100; }, col:"faint"},
      {lab:["P(B)","P(B)"], f:function(p){ return p.b/100; }, col:"faint"},
      {lab:["Naive sum","ผลบวกแบบง่าย"], f:function(p){ return (p.a+p.b)/100; }, col:"warn"},
      {lab:["True union","ยูเนียนที่ถูก"], f:function(p){
        return (p.a+p.b-Math.min(p.ab,p.a,p.b))/100; }, col:"accent"}
    ],
    note:["drop the overlap to zero and the last two bars snap together — that is the exclusive case","ลดส่วนซ้อนทับให้เป็นศูนย์ สองแถบสุดท้ายจะเท่ากันพอดี นั่นคือกรณีที่เหตุการณ์เกิดร่วมกันไม่ได้"]
  } },

{ id:"conditional", x:235, y:346, requires:["rules"], methods:["M-05"],
  title:["Conditional probability","ความน่าจะเป็นแบบมีเงื่อนไข"],
  body:[["P(A|B) = P(A∩B)/P(B) asks for the probability of A once you already know B happened. Knowing B shrinks the sample space to B alone, which is why you divide by P(B) rather than by 1.",
         "Events are independent when P(A|B) = P(A) — learning B tells you nothing about A — and only then does P(A∩B) = P(A)P(B). Independent and mutually exclusive are opposites, not synonyms: mutually exclusive events are maximally dependent, since one occurring guarantees the other did not. Treating them as the same thing is trap T-03."],
        ["P(A|B) = P(A∩B)/P(B) คือความน่าจะเป็นของ A เมื่อเรารู้แล้วว่า B เกิดขึ้น พอรู้ว่า B เกิด แซมเปิลสเปซก็เหลือแค่ B เราจึงหารด้วย P(B) ไม่ใช่หารด้วย 1",
         "เหตุการณ์เป็นอิสระต่อกันเมื่อ P(A|B) = P(A) คือรู้ว่า B เกิดแล้วก็ไม่ได้ข้อมูลเกี่ยวกับ A เพิ่มเลย และจะได้ P(A∩B) = P(A)P(B) ก็ต่อเมื่อเป็นอิสระเท่านั้น เหตุการณ์ที่เป็นอิสระต่อกันกับเหตุการณ์ที่เกิดร่วมกันไม่ได้ ไม่ใช่คำเดียวกัน แต่เป็นคนละเรื่องที่ตรงข้ามกัน เหตุการณ์ที่เกิดร่วมกันไม่ได้ยิ่งขึ้นต่อกันที่สุด เพราะถ้าอันหนึ่งเกิด อีกอันก็ไม่เกิดแน่นอน การมองว่าสองอย่างนี้เหมือนกันคือกับดัก T-03"]],
  formula:["P(A|B) = P(A∩B)/P(B)        independent ⟺ P(A∩B) = P(A)P(B)","P(A|B) = P(A∩B)/P(B)        เป็นอิสระ ⟺ P(A∩B) = P(A)P(B)"],
  flabel:["Independent ≠ mutually exclusive","เป็นอิสระ ≠ ไม่เกิดร่วมกัน"],
  viz:"bars",
  vizcfg:{
    title:["KNOWING B SHRINKS THE SAMPLE SPACE","การรู้ว่า B เกิด ทำให้แซมเปิลสเปซหดลง"],
    ylab:["probability","ความน่าจะเป็น"],
    ctrls:[
      {k:"a",  lab:["P(A)","P(A)"], min:5, max:95, step:5, def:30, unit:" %"},
      {k:"b",  lab:["P(B)","P(B)"], min:5, max:95, step:5, def:50, unit:" %"},
      {k:"ab", lab:["P(A ∩ B)","P(A ∩ B)"], min:0, max:60, step:5, def:15, unit:" %"}
    ],
    readouts:[
      {lab:["P(A|B)","P(A|B)"], f:function(S){ return fmt2(S.p.ab/S.p.b); }},
      {lab:["P(A)","P(A)"], f:function(S){ return fmt2(S.p.a/100); }},
      {lab:["Independent?","เป็นอิสระต่อกันไหม"], f:function(S){
        var d=Math.abs(S.p.ab/S.p.b-S.p.a/100);
        return d<0.02 ? (L()?"ใช่ — การรู้ B ไม่บอกอะไรเกี่ยวกับ A":"yes — knowing B tells you nothing about A")
                      : (L()?"ไม่ — B เปลี่ยนโอกาสของ A":"no — B shifts the odds on A"); }},
      {lab:["For independence you need","ความเป็นอิสระต้องการ"], f:function(S){
        return "P(A∩B) = "+fmt2(S.p.a*S.p.b/10000)+(L()?" (ตอนนี้ "+fmt2(S.p.ab/100)+")":" (currently "+fmt2(S.p.ab/100)+")"); }}
    ],
    bars:[
      {lab:["P(A)","P(A)"], f:function(p){ return p.a/100; }, col:"faint"},
      {lab:["P(A|B)","P(A|B)"], f:function(p){ return p.ab/p.b; }, col:"accent"},
      {lab:["P(A)·P(B)","P(A)·P(B)"], f:function(p){ return p.a*p.b/10000; }, col:"good"},
      {lab:["P(A ∩ B)","P(A ∩ B)"], f:function(p){ return p.ab/100; }, col:"warn"}
    ],
    note:["when the last two bars match, the events are independent — and only then","ถ้าสองแถบสุดท้ายเท่ากัน เหตุการณ์ทั้งสองเป็นอิสระต่อกัน และเป็นเช่นนี้เมื่อเท่ากันเท่านั้น"]
  },
  guide:[
    {say:["P(A|B) is well above P(A), so learning that B happened makes A more likely.",
          "P(A|B) สูงกว่า P(A) มาก แปลว่าเมื่อรู้ว่า B เกิด A ก็มีโอกาสมากขึ้น"], set:{a:30,b:50,ab:15}},
    {say:["Tune the overlap until the last two bars are level. Now the events are independent.",
          "ปรับส่วนซ้อนทับจนสองแถบสุดท้ายเท่ากัน ตอนนี้เหตุการณ์เป็นอิสระต่อกัน"], set:{a:30,b:50,ab:15}},
    {say:["Set the overlap to zero. They are mutually exclusive — which makes them maximally DEPENDENT.",
          "ตั้งส่วนซ้อนทับเป็นศูนย์ ทั้งสองเหตุการณ์เกิดร่วมกันไม่ได้ และนั่นทำให้ขึ้นต่อกันมากที่สุด"], set:{a:30,b:50,ab:0}}
  ] }
],

methods:[
{id:"M-01", name:["Apply a counting principle","ใช้หลักการนับ"]},
{id:"M-02", name:["Choose between nPr and nCr","เลือกใช้ nPr หรือ nCr"]},
{id:"M-03", name:["Compute from a sample space","คำนวณจากแซมเปิลสเปซ"]},
{id:"M-04", name:["Use the addition or complement rule","ใช้กฎการบวกหรือคอมพลีเมนต์"]},
{id:"M-05", name:["Conditional probability and independence","ความน่าจะเป็นมีเงื่อนไขและความเป็นอิสระ"]}
],

traps:{
"T-01":["Order was assumed to matter when it does not, so nPr was used where nCr belongs.","คิดว่าลำดับมีผลทั้งที่ไม่มี จึงใช้ nPr ทั้งที่ต้องใช้ nCr"],
"T-02":["The overlap P(A∩B) was not subtracted, so the union is double-counted.","ไม่ได้ลบส่วนร่วม P(A∩B) ออก ยูเนียนจึงถูกนับซ้ำ"],
"T-03":["Independent and mutually exclusive are not the same thing — they are opposites.","เป็นอิสระต่อกันกับเกิดร่วมกันไม่ได้ ไม่ใช่เรื่องเดียวกัน แต่เป็นสิ่งตรงข้ามกัน"],
"T-04":["A probability outside 0 to 1, or a favourable count larger than the total.","ได้ความน่าจะเป็นนอกช่วง 0 ถึง 1 หรือจำนวนผลลัพธ์ที่ต้องการมากกว่าจำนวนทั้งหมด"]
},

gen:{
"M-01": function(sf){
  var a=pick([3,4,5]), b=pick([2,4,6]), c=pick([3,5,7]);
  if(sf==="S-04") return {stem:["A task has independent stages. Do you add or multiply the choices?",
                                "งานหนึ่งมีหลายขั้นตอนที่ไม่เกี่ยวข้องกัน เราควรบวกหรือคูณจำนวนตัวเลือก"],
    opts:[{v:["Multiply","คูณ"],ok:1},{v:["Add","บวก"],trap:"T-01"},
          {v:["Subtract","ลบ"]},{v:["Take the larger","เอาค่าที่มากกว่า"]}],unit:""};
  if(sf==="S-03") return {stem:["How many distinct arrangements has the word BOOK?","คำว่า BOOK เรียงตัวอักษรได้กี่แบบที่ไม่ซ้ำกัน"],
    opts:[{v:"12",ok:1},{v:"24",trap:"T-01"},{v:"4"},{v:"6"}],unit:""};
  return {stem:["A menu offers "+a+" starters, "+b+" mains and "+c+" desserts. How many three-course meals?",
                "เมนูมีอาหารเรียกน้ำย่อย "+a+" อย่าง จานหลัก "+b+" อย่าง ของหวาน "+c+" อย่าง จัดชุดสามคอร์สได้กี่แบบ"],
    opts:[{v:String(a*b*c),ok:1},{v:String(a+b+c),trap:"T-01"},
          {v:String(a*b),trap:"T-01"},{v:String(a*b*c*6)}],unit:""};
},
"M-02": function(sf){
  var n=pick([6,7,8,10]), r=pick([2,3]);
  var f=function(k){ var v=1,i; for(i=2;i<=k;i++) v*=i; return v; };
  var P=f(n)/f(n-r), C=P/f(r);
  if(sf==="S-04") return {stem:["Choosing a committee of 3 from 10 — permutation or combination?",
                                "เลือกคณะกรรมการ 3 คนจาก 10 คน เป็นการเรียงสับเปลี่ยนหรือการจัดหมู่"],
    opts:[{v:["Combination — order does not matter","การจัดหมู่ เพราะลำดับไม่สำคัญ"],ok:1},
          {v:["Permutation — order matters","การเรียงสับเปลี่ยน เพราะลำดับสำคัญ"],trap:"T-01"},
          {v:["Neither applies","ใช้ไม่ได้ทั้งคู่"]},
          {v:["Both give the same answer","ได้คำตอบเท่ากันทั้งคู่"],trap:"T-01"}],unit:""};
  if(sf==="S-05") return {stem:["nPr = "+P+" for these values. What is nCr?","ค่าเหล่านี้ให้ nPr = "+P+" แล้ว nCr เป็นเท่าใด"],
    opts:[{v:String(C),ok:1},{v:String(P),trap:"T-01"},{v:String(P*f(r)),trap:"T-01"},{v:String(n)}],unit:""};
  var ordered = sf==="S-02";
  return {stem:[ordered
      ? "In how many ways can "+r+" people be placed on a ranked podium from a group of "+n+"?"
      : "In how many ways can a group of "+r+" be chosen from "+n+" people?",
    ordered
      ? "จัด "+r+" คนขึ้นแท่นรับรางวัลที่มีอันดับ จากกลุ่ม "+n+" คน ได้กี่วิธี"
      : "เลือกกลุ่ม "+r+" คนจาก "+n+" คน ได้กี่วิธี"],
    opts:[{v:String(ordered?P:C),ok:1},
          {v:String(ordered?C:P),trap:"T-01"},
          {v:String(n*r)},{v:String(f(n))}],unit:""};
},
"M-03": function(sf){
  var C=[{q:["a total of 7","ผลรวมเป็น 7"],n:6},{q:["a total of 5","ผลรวมเป็น 5"],n:4},
         {q:["a double","เลขคู่เหมือน"],n:6},{q:["a total of at least 10","ผลรวมอย่างน้อย 10"],n:6},
         {q:["a total of 2","ผลรวมเป็น 2"],n:1}];
  var c=pick(C);
  if(sf==="S-04") return {stem:["Can a probability ever exceed 1?","ความน่าจะเป็นมากกว่า 1 ได้หรือไม่"],
    opts:[{v:["No — favourable outcomes cannot exceed the total","ไม่ได้ เพราะจำนวนผลลัพธ์ที่ต้องการมากกว่าจำนวนทั้งหมดไม่ได้"],ok:1},
          {v:["Yes, for certain events","ได้ สำหรับเหตุการณ์ที่แน่นอน"],trap:"T-04"},
          {v:["Yes, when events combine","ได้ เมื่อเหตุการณ์รวมกัน"],trap:"T-04"},
          {v:["Only in conditional probability","เฉพาะในความน่าจะเป็นมีเงื่อนไข"],trap:"T-04"}],unit:""};
  if(sf==="S-03") return {stem:["Why are the 36 cells equally likely but the totals not?",
                                "ทำไมทั้ง 36 ช่องมีโอกาสเท่ากัน แต่ผลรวมกลับมีโอกาสไม่เท่ากัน"],
    opts:[{v:["Different totals cover different numbers of cells","ผลรวมแต่ละค่าครอบคลุมจำนวนช่องไม่เท่ากัน"],ok:1},
          {v:["The dice are biased","ลูกเต๋าถ่วงน้ำหนัก"],trap:"T-04"},
          {v:["The totals are also equally likely","ผลรวมก็มีโอกาสเท่ากัน"],trap:"T-04"},
          {v:["Because order is ignored","เพราะไม่สนใจลำดับ"]}],unit:""};
  return {stem:["Two dice are thrown. Find the probability of "+c.q[0]+".",
                "ทอยลูกเต๋าสองลูก จงหาความน่าจะเป็นที่จะได้"+c.q[1]],
    opts:[{v:c.n+"/36",ok:1},{v:(c.n)+"/12",trap:"T-04"},
          {v:(36-c.n)+"/36",trap:"T-02"},{v:c.n+"/6"}],unit:""};
},
"M-04": function(sf){
  var pa=pick([0.3,0.4,0.5]), pb=pick([0.2,0.3,0.5]), pi=pick([0.1,0.2]);
  if(sf==="S-04") return {stem:["When may you write P(A∪B) = P(A) + P(B) with no subtraction?",
                                "เมื่อไรที่เขียน P(A∪B) = P(A) + P(B) ได้โดยไม่ต้องลบ"],
    opts:[{v:["Only when A and B are mutually exclusive","เฉพาะเมื่อ A กับ B ไม่เกิดร่วมกัน"],ok:1},
          {v:["Always","เสมอ"],trap:"T-02"},
          {v:["When A and B are independent","เมื่อ A กับ B เป็นอิสระต่อกัน"],trap:"T-03"},
          {v:["When both probabilities are small","เมื่อความน่าจะเป็นทั้งสองมีค่าน้อย"],trap:"T-02"}],unit:""};
  if(sf==="S-03") return {stem:["A question asks for P(at least one success). What is the fastest route?",
                                "โจทย์ถาม P(สำเร็จอย่างน้อยหนึ่งครั้ง) วิธีไหนเร็วที่สุด"],
    opts:[{v:["1 − P(no successes)","1 − P(ไม่สำเร็จเลย)"],ok:1},
          {v:["Add every case up","บวกทุกกรณี"],trap:"T-02"},
          {v:["P(exactly one)","P(สำเร็จพอดีหนึ่งครั้ง)"],trap:"T-02"},
          {v:["Multiply the probabilities","คูณความน่าจะเป็นเข้าด้วยกัน"],trap:"T-03"}],unit:""};
  return {stem:["P(A) = "+pa+", P(B) = "+pb+", P(A∩B) = "+pi+". Find P(A∪B).",
                "P(A) = "+pa+", P(B) = "+pb+", P(A∩B) = "+pi+" จงหา P(A∪B)"],
    opts:[{v:fmt2(pa+pb-pi),ok:1},{v:fmt2(pa+pb),trap:"T-02"},
          {v:fmt2(pa*pb),trap:"T-03"},{v:fmt2(pa+pb+pi),trap:"T-02"}],unit:""};
},
"M-05": function(sf){
  var pi=pick([0.12,0.15,0.2]), pb=pick([0.4,0.5,0.6]);
  if(sf==="S-04") return {stem:["Two mutually exclusive events with non-zero probability — are they independent?",
                                "เหตุการณ์สองอย่างที่เกิดร่วมกันไม่ได้และมีความน่าจะเป็นไม่เป็นศูนย์ เป็นอิสระต่อกันไหม"],
    opts:[{v:["No — one occurring guarantees the other did not","ไม่เป็น เพราะถ้าอันหนึ่งเกิด อีกอันก็ไม่เกิดแน่นอน"],ok:1},
          {v:["Yes, always","ใช่ เสมอ"],trap:"T-03"},
          {v:["Yes, if the probabilities are equal","ใช่ ถ้าความน่าจะเป็นเท่ากัน"],trap:"T-03"},
          {v:["It cannot be determined","ระบุไม่ได้"],trap:"T-03"}],unit:""};
  if(sf==="S-03") return {stem:["Why does conditioning on B mean dividing by P(B)?",
                                "ทำไมเมื่อกำหนดว่า B เกิดแล้ว จึงต้องหารด้วย P(B)"],
    opts:[{v:["Knowing B shrinks the sample space to B alone","เพราะรู้ว่า B เกิด แซมเปิลสเปซจึงเหลือแค่ B"],ok:1},
          {v:["To keep the answer below 1","เพื่อให้คำตอบต่ำกว่า 1"],trap:"T-04"},
          {v:["It is only a convention","เป็นเพียงข้อตกลง"],trap:"T-03"},
          {v:["Because B is independent","เพราะ B เป็นอิสระ"],trap:"T-03"}],unit:""};
  return {stem:["P(A∩B) = "+pi+" and P(B) = "+pb+". Find P(A|B).",
                "P(A∩B) = "+pi+" และ P(B) = "+pb+" จงหา P(A|B)"],
    opts:[{v:fmt2(pi/pb),ok:1},{v:fmt2(pi*pb),trap:"T-03"},
          {v:fmt2(pi),trap:"T-03"},{v:fmt2(pb/pi),trap:"T-04"}],unit:""};
}
}
};
