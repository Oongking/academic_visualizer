var CHAPTER = {
id:"ma01", num:"01", slug:"sets", subject:"math",
kicker:["Mathematics · Chapter 01","คณิตศาสตร์ · บทที่ 1"],
title:["Sets","เซต"],
mapTitle:["The vocabulary everything else borrows","คำศัพท์ที่ทุกบทหยิบยืมไปใช้"],
lede:["A set is just a collection of things you have decided to care about. That sounds too simple to matter, and yet logic, probability and functions are all written in this notation — get it wrong here and it stays wrong everywhere.",
      "เซตคือกลุ่มของสิ่งที่เราตัดสินใจว่าจะสนใจ ฟังดูง่ายเกินกว่าจะสำคัญ แต่ตรรกศาสตร์ ความน่าจะเป็น และฟังก์ชัน ล้วนเขียนด้วยสัญกรณ์นี้ ถ้าพลาดตรงนี้ก็จะพลาดตลอดทุกบท"],
next:["→ continues in Chapter 02 · Logic","→ ต่อในบทที่ 2 · ตรรกศาสตร์"],

nodes:[
{ id:"basics", x:235, y:52, requires:[], methods:["M-01"],
  title:["Sets and elements","เซตและสมาชิก"],
  body:[["A set is written with braces and its members separated by commas. Order does not matter and repetition counts once: {1, 2, 2, 3} and {3, 2, 1} are the same set.",
         "The empty set ∅ has no members at all. Careful — {∅} is not empty, it is a set containing one thing, and that one thing happens to be the empty set. Treating them as equal is trap T-01."],
        ["เซตเขียนด้วยวงเล็บปีกกาและคั่นสมาชิกด้วยจุลภาค ลำดับไม่สำคัญและสมาชิกซ้ำนับเพียงครั้งเดียว {1, 2, 2, 3} กับ {3, 2, 1} จึงเป็นเซตเดียวกัน",
         "เซตว่าง ∅ ไม่มีสมาชิกเลย ระวังให้ดี {∅} ไม่ใช่เซตว่าง แต่เป็นเซตที่มีสมาชิกหนึ่งตัว และสมาชิกตัวนั้นบังเอิญเป็นเซตว่าง การมองว่าทั้งสองเท่ากันคือกับดัก T-01"]],
  formula:["∅ ≠ {∅}        n(∅) = 0 ,  n({∅}) = 1","∅ ≠ {∅}        n(∅) = 0 ,  n({∅}) = 1"],
  flabel:["Order and repetition are ignored","ไม่สนใจลำดับและการซ้ำ"],
  viz:"grid",
  vizcfg:{
    title:["MEMBERSHIP, ELEMENT BY ELEMENT","ความเป็นสมาชิก ทีละตัว"],
    cols:[["Set","เซต"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"]],
    ctrls:[
      {k:"a", lab:["A = {1 … a}","A = {1 … a}"], min:1, max:8, step:1, def:5, unit:""},
      {k:"b", lab:["B starts at","B เริ่มที่"], min:1, max:8, step:1, def:3, unit:""}
    ],
    readouts:[
      {lab:["n(A)","n(A)"], f:function(S){ return String(S.p.a); }},
      {lab:["n(B)","n(B)"], f:function(S){ return String(9-S.p.b); }},
      {lab:["n(A ∩ B)","n(A ∩ B)"], f:function(S){ return String(Math.max(0,S.p.a-S.p.b+1)); }},
      {lab:["n(A ∪ B)","n(A ∪ B)"], f:function(S){
        return String(S.p.a+(9-S.p.b)-Math.max(0,S.p.a-S.p.b+1)); }}
    ],
    rows:function(p){
      var names=[["A","A"],["B","B"],["A ∩ B","A ∩ B"],["A ∪ B","A ∪ B"]];
      var test=[function(e){ return e<=p.a; },
                function(e){ return e>=p.b; },
                function(e){ return e<=p.a && e>=p.b; },
                function(e){ return e<=p.a || e>=p.b; }];
      var cols=["ink","accent","good","warn"];
      return names.map(function(nm,i){
        var row=[{v:nm, on:false, col:"ink"}];
        for(var e=1;e<=8;e++) row.push({v:test[i](e)?"✓":"", on:test[i](e), col:cols[i]});
        return row;
      });
    },
    note:["intersection needs BOTH ticks above it; union needs only one","อินเตอร์เซกชันต้องมีเครื่องหมายถูกทั้งสองแถวบน ยูเนียนต้องการเพียงแถวเดียว"]
  },
  guide:[
    {say:["A holds 1 to 5, B holds 3 to 8. Read down any column to see what each element belongs to.",
          "A มี 1 ถึง 5 ส่วน B มี 3 ถึง 8 อ่านลงมาตามคอลัมน์ใดก็ได้เพื่อดูว่าสมาชิกนั้นอยู่ในเซตใดบ้าง"], set:{a:5,b:3}},
    {say:["Pull the sets apart until they no longer meet. The intersection row empties completely.",
          "ดึงสองเซตให้แยกจากกันจนไม่พบกัน แถวอินเตอร์เซกชันจะว่างเปล่า"], set:{a:3,b:6}},
    {say:["Now overlap them fully. A becomes a subset of B, and the intersection row equals the A row.",
          "ทีนี้ให้ซ้อนทับกันเต็มที่ A กลายเป็นสับเซตของ B และแถวอินเตอร์เซกชันเท่ากับแถว A"], set:{a:8,b:1}}
  ] },

{ id:"subsets", x:100, y:150, requires:["basics"], methods:["M-02"],
  title:["Subsets and power sets","สับเซตและเพาเวอร์เซต"],
  body:[["A ⊂ B means every member of A is also in B. The empty set is a subset of absolutely everything, and every set is a subset of itself — both facts are needed for counting.",
         "The power set P(A) collects all subsets of A. If A has n members then P(A) has 2ⁿ, because each element is independently either in or out. Note ∅ ∈ P(A) but ∅ ⊂ A — the symbols are not interchangeable, which is trap T-02."],
        ["A ⊂ B หมายความว่าสมาชิกทุกตัวของ A อยู่ใน B ด้วย เซตว่างเป็นสับเซตของทุกเซตอย่างไม่มีข้อยกเว้น และทุกเซตเป็นสับเซตของตัวเอง ทั้งสองข้อจำเป็นสำหรับการนับ",
         "เพาเวอร์เซต P(A) รวบรวมสับเซตทั้งหมดของ A ถ้า A มีสมาชิก n ตัว P(A) จะมี 2ⁿ ตัว เพราะสมาชิกแต่ละตัวเลือกได้อิสระว่าจะอยู่หรือไม่อยู่ สังเกตว่า ∅ ∈ P(A) แต่ ∅ ⊂ A สัญลักษณ์สองตัวนี้ใช้แทนกันไม่ได้ ซึ่งคือกับดัก T-02"]],
  formula:["n(P(A)) = 2ⁿ        proper subsets = 2ⁿ − 1","n(P(A)) = 2ⁿ        สับเซตแท้ = 2ⁿ − 1"],
  flabel:["Each element is in or out","สมาชิกแต่ละตัวเลือกอยู่หรือไม่อยู่"],
  viz:"plot",
  vizcfg:{
    title:["HOW FAST THE SUBSETS MULTIPLY","สับเซตเพิ่มจำนวนเร็วแค่ไหน"],
    xlab:["size of the set n","ขนาดของเซต n"], ylab:["number of subsets","จำนวนสับเซต"],
    xmin:0, xmax:10, ymin:0, fill:false,
    fn:function(x,p){ return Math.pow(2,x); },
    mark:function(p){ return p.n; },
    ctrls:[{k:"n", lab:["Set size n","ขนาดเซต n"], min:0, max:10, step:1, def:3, unit:""}],
    readouts:[
      {lab:["Subsets 2ⁿ","สับเซต 2ⁿ"], f:function(S){ return String(Math.pow(2,S.p.n)); }},
      {lab:["Proper subsets","สับเซตแท้"], f:function(S){ return String(Math.pow(2,S.p.n)-1); }},
      {lab:["Always included","มีอยู่เสมอ"], f:function(){
        return L()?"เซตว่างและตัวมันเอง":"the empty set and the set itself"; }},
      {lab:["Add one element?","เพิ่มสมาชิกหนึ่งตัว?"], f:function(){
        return L()?"จำนวนสับเซตเป็นสองเท่า":"the number of subsets doubles"; }}
    ],
    note:["each new element either joins a subset or does not — that binary choice is where 2ⁿ comes from","สมาชิกใหม่แต่ละตัวจะอยู่ในสับเซตหรือไม่อยู่ ทางเลือกสองทางนั้นคือที่มาของ 2ⁿ"]
  } },

{ id:"operations", x:370, y:150, requires:["basics"], methods:["M-03"],
  title:["Set operations","การดำเนินการของเซต"],
  body:[["Union A ∪ B collects everything in either. Intersection A ∩ B keeps only what is in both. Difference A − B takes what is in A but not B, and complement A′ is everything in the universe outside A.",
         "De Morgan's laws connect them: (A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′. Complementing flips the operation as well as the sets, and forgetting that flip is trap T-03."],
        ["ยูเนียน A ∪ B รวมทุกสิ่งที่อยู่ในเซตใดเซตหนึ่ง อินเตอร์เซกชัน A ∩ B เก็บเฉพาะสิ่งที่อยู่ในทั้งสอง ผลต่าง A − B เอาสิ่งที่อยู่ใน A แต่ไม่อยู่ใน B และคอมพลีเมนต์ A′ คือทุกสิ่งในเอกภพสัมพัทธ์ที่อยู่นอก A",
         "กฎเดอมอร์แกนเชื่อมทั้งหมดเข้าด้วยกัน (A ∪ B)′ = A′ ∩ B′ และ (A ∩ B)′ = A′ ∪ B′ การใส่คอมพลีเมนต์กลับทั้งตัวดำเนินการและตัวเซต การลืมสลับตัวดำเนินการคือกับดัก T-03"]],
  formula:["(A ∪ B)′ = A′ ∩ B′        (A ∩ B)′ = A′ ∪ B′","(A ∪ B)′ = A′ ∩ B′        (A ∩ B)′ = A′ ∪ B′"],
  flabel:["De Morgan flips the operation too","เดอมอร์แกนสลับตัวดำเนินการด้วย"],
  viz:{
    vb:"0 0 560 300", anim:false,
    ctrls:[
      {k:"op", lab:["",""], opts:[["A∪B","A∪B"], ["A∩B","A∩B"], ["A−B","A−B"], ["A′","A′"]], min:0, def:0, unit:""},
      {k:"nA", lab:["Only in A","อยู่ใน A อย่างเดียว"], min:0, max:20, step:1, def:8, unit:""},
      {k:"nAB",lab:["In both","อยู่ในทั้งสอง"],          min:0, max:20, step:1, def:5, unit:""},
      {k:"nB", lab:["Only in B","อยู่ใน B อย่างเดียว"], min:0, max:20, step:1, def:7, unit:""}
    ],
    readouts:[
      {lab:["Region shaded","บริเวณที่แรเงา"], f:function(S){
        var N=["A ∪ B","A ∩ B","A − B","A′"]; return N[S.p.op]; }},
      {lab:["Elements counted","จำนวนสมาชิก"], f:function(S){
        var p=S.p, out=6;
        return String([p.nA+p.nAB+p.nB, p.nAB, p.nA, p.nB+out][p.op]); }},
      {lab:["n(A ∪ B)","n(A ∪ B)"], f:function(S){
        return String(S.p.nA+S.p.nAB+S.p.nB); }}
    ],
    draw:function(S,o){
      var op=S.p.op, cxA=228, cxB=332, cy=150, r=86;
      o.push('<text x="24" y="24" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5" letter-spacing="1.4">'+tx(["VENN DIAGRAM","แผนภาพเวนน์"])+'</text>');
      o.push('<rect x="80" y="46" width="400" height="208" fill="none" stroke="var(--ink-faint)" stroke-width="1.4"/>');
      o.push('<text x="90" y="64" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="11">U</text>');
      /* the shaded region is built from clipped circles so each operation reads differently */
      o.push('<defs><clipPath id="ca"><circle cx="'+cxA+'" cy="'+cy+'" r="'+r+'"/></clipPath>'+
             '<clipPath id="cb"><circle cx="'+cxB+'" cy="'+cy+'" r="'+r+'"/></clipPath></defs>');
      var F='fill="var(--accent)" fill-opacity=".22"';
      if(op===0){
        o.push('<circle cx="'+cxA+'" cy="'+cy+'" r="'+r+'" '+F+'/>');
        o.push('<circle cx="'+cxB+'" cy="'+cy+'" r="'+r+'" '+F+'/>');
      } else if(op===1){
        o.push('<g clip-path="url(#ca)"><circle cx="'+cxB+'" cy="'+cy+'" r="'+r+'" '+F+'/></g>');
      } else if(op===2){
        o.push('<g clip-path="url(#ca)"><rect x="80" y="46" width="400" height="208" '+F+'/>'+
               '<circle cx="'+cxB+'" cy="'+cy+'" r="'+r+'" fill="var(--ground)"/></g>');
      } else {
        o.push('<rect x="80" y="46" width="400" height="208" '+F+'/>');
        o.push('<circle cx="'+cxA+'" cy="'+cy+'" r="'+r+'" fill="var(--ground)"/>');
        o.push('<circle cx="'+cxB+'" cy="'+cy+'" r="'+r+'" fill="var(--ground)"/>');
        o.push('<g clip-path="url(#cb)"><circle cx="'+cxA+'" cy="'+cy+'" r="'+r+'" fill="var(--ground)"/></g>');
      }
      o.push('<circle cx="'+cxA+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--ink)" stroke-width="1.8"/>');
      o.push('<circle cx="'+cxB+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--ink)" stroke-width="1.8"/>');
      o.push('<text x="'+(cxA-58)+'" y="'+(cy-58)+'" fill="var(--ink)" font-family="IBM Plex Sans" font-size="14" font-weight="600">A</text>');
      o.push('<text x="'+(cxB+50)+'" y="'+(cy-58)+'" fill="var(--ink)" font-family="IBM Plex Sans" font-size="14" font-weight="600">B</text>');
      /* the counts, placed in their own regions */
      o.push('<text x="'+(cxA-46)+'" y="'+(cy+6)+'" fill="var(--ink)" font-family="Bodoni Moda" font-size="22" text-anchor="middle">'+S.p.nA+'</text>');
      o.push('<text x="'+((cxA+cxB)/2)+'" y="'+(cy+6)+'" fill="var(--ink)" font-family="Bodoni Moda" font-size="22" text-anchor="middle">'+S.p.nAB+'</text>');
      o.push('<text x="'+(cxB+46)+'" y="'+(cy+6)+'" fill="var(--ink)" font-family="Bodoni Moda" font-size="22" text-anchor="middle">'+S.p.nB+'</text>');
      o.push('<text x="110" y="240" fill="var(--ink-faint)" font-family="Bodoni Moda" font-size="18">6</text>');
      o.push('<text x="24" y="284" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["6 elements lie outside both sets","มีสมาชิก 6 ตัวอยู่นอกทั้งสองเซต"])+'</text>');
    }
  },
  guide:[
    {say:["Union shades both circles entirely. Every element in either set is counted once — the overlap is not double counted.",
          "ยูเนียนแรเงาทั้งสองวงเต็ม สมาชิกทุกตัวในเซตใดเซตหนึ่งถูกนับครั้งเดียว ส่วนที่ซ้อนกันไม่ถูกนับซ้ำ"], set:{op:0,nA:8,nAB:5,nB:7}},
    {say:["Intersection keeps only the lens in the middle. That is why n(A∪B) must subtract it once.",
          "อินเตอร์เซกชันเก็บเฉพาะส่วนตรงกลาง จึงเป็นเหตุผลที่ n(A∪B) ต้องลบส่วนนี้ออกหนึ่งครั้ง"], set:{op:1,nA:8,nAB:5,nB:7}},
    {say:["Difference A − B is A with the overlap removed. Notice it is not symmetric: B − A would look different.",
          "ผลต่าง A − B คือ A ที่ตัดส่วนซ้อนออก สังเกตว่ามันไม่สมมาตร B − A จะหน้าตาต่างออกไป"], set:{op:2,nA:8,nAB:5,nB:7}},
    {say:["Complement shades everything outside A, including the part of B that A never touched.",
          "คอมพลีเมนต์แรเงาทุกอย่างนอก A รวมถึงส่วนของ B ที่ A ไม่เคยแตะ"], set:{op:3,nA:8,nAB:5,nB:7}}
  ]},

{ id:"counting", x:235, y:248, requires:["subsets","operations"], methods:["M-04","M-05"],
  title:["Counting members","การนับสมาชิก"],
  body:[["For two sets, n(A ∪ B) = n(A) + n(B) − n(A ∩ B). The subtraction is there because everything in the overlap was counted twice, once in each set.",
         "For three the pattern continues: add the singles, subtract the pairs, add the triple back. Any survey question with two or three categories is this formula wearing a costume."],
        ["สำหรับสองเซต n(A ∪ B) = n(A) + n(B) − n(A ∩ B) ที่ต้องลบเพราะทุกอย่างในส่วนซ้อนถูกนับสองครั้ง ครั้งหนึ่งในแต่ละเซต",
         "สำหรับสามเซตรูปแบบก็ดำเนินต่อ บวกเซตเดี่ยว ลบคู่ แล้วบวกสามกลับเข้าไป โจทย์สำรวจใดที่มีสองหรือสามหมวดหมู่ก็คือสูตรนี้ที่สวมเครื่องแต่งกายอยู่"]],
  formula:["n(A∪B) = n(A) + n(B) − n(A∩B)","n(A∪B) = n(A) + n(B) − n(A∩B)"],
  flabel:["Subtract what you counted twice","ลบสิ่งที่นับซ้ำออก"],
  viz:"bars",
  vizcfg:{
    title:["WHY YOU MUST SUBTRACT THE OVERLAP","ทำไมต้องลบส่วนที่ซ้อนกันออก"],
    ylab:["number of members","จำนวนสมาชิก"],
    ctrls:[
      {k:"a",   lab:["n(A)","n(A)"], min:1, max:40, step:1, def:20, unit:""},
      {k:"b",   lab:["n(B)","n(B)"], min:1, max:40, step:1, def:15, unit:""},
      {k:"both", lab:["In both","อยู่ทั้งสองเซต"], min:0, max:15, step:1, def:6, unit:""}
    ],
    readouts:[
      {lab:["n(A) + n(B)","n(A) + n(B)"], f:function(S){ return String(S.p.a+S.p.b); }},
      {lab:["n(A ∪ B)","n(A ∪ B)"], f:function(S){
        return String(S.p.a+S.p.b-Math.min(S.p.both,S.p.a,S.p.b)); }},
      {lab:["Double counted","ที่นับซ้ำ"], f:function(S){
        return String(Math.min(S.p.both,S.p.a,S.p.b)); }},
      {lab:["If the sets are disjoint","ถ้าสองเซตไม่มีส่วนร่วม"], f:function(){
        return L()?"ไม่ต้องลบ — บวกกันตรงๆ ได้เลย":"nothing to subtract — you may simply add"; }}
    ],
    bars:[
      {lab:["n(A)","n(A)"], f:function(p){ return p.a; }, col:"faint"},
      {lab:["n(B)","n(B)"], f:function(p){ return p.b; }, col:"faint"},
      {lab:["Naive sum","ผลบวกแบบง่าย"], f:function(p){ return p.a+p.b; }, col:"warn"},
      {lab:["True union","ยูเนียนที่ถูกต้อง"], f:function(p){
        return p.a+p.b-Math.min(p.both,p.a,p.b); }, col:"accent"}
    ],
    note:["the gap between the last two bars is exactly the overlap, counted once too often","ช่องว่างระหว่างสองแถบสุดท้ายคือส่วนซ้อนทับพอดี ที่ถูกนับเกินไปหนึ่งครั้ง"]
  } },

{ id:"applications", x:235, y:346, requires:["counting"], methods:["M-06"],
  title:["Solving survey problems","การแก้โจทย์สำรวจ"],
  body:[["The reliable method is not the formula but the diagram. Draw the Venn regions, put the innermost overlap in first as x, then work outwards subtracting what you have already placed.",
         "Every region must be filled before you add anything up, and the total of all regions must equal the universe. Starting from the outside is what makes these problems feel hard — always start from the centre."],
        ["วิธีที่เชื่อถือได้ไม่ใช่สูตรแต่คือแผนภาพ วาดบริเวณเวนน์ ใส่ส่วนซ้อนในสุดเป็น x ก่อน แล้วค่อยไล่ออกด้านนอกโดยลบสิ่งที่ใส่ไปแล้ว",
         "ต้องเติมทุกบริเวณให้ครบก่อนจะรวมค่าใดๆ และผลรวมของทุกบริเวณต้องเท่ากับเอกภพสัมพัทธ์ การเริ่มจากด้านนอกคือสิ่งที่ทำให้โจทย์พวกนี้รู้สึกยาก ให้เริ่มจากตรงกลางเสมอ"]],
  formula:["Fill the centre first, then work outwards","เติมตรงกลางก่อน แล้วค่อยไล่ออก"],
  flabel:["A method, not a formula","เป็นวิธี ไม่ใช่สูตร"],
  viz:"bars",
  vizcfg:{
    title:["A SURVEY BROKEN INTO FOUR REGIONS","ผลสำรวจแยกเป็นสี่ส่วน"],
    ylab:["people","จำนวนคน"],
    ctrls:[
      {k:"tot",  lab:["People surveyed","จำนวนผู้ตอบ"], min:20, max:200, step:10, def:100, unit:""},
      {k:"a",    lab:["Like tea","ชอบชา"], min:0, max:150, step:5, def:60, unit:""},
      {k:"b",    lab:["Like coffee","ชอบกาแฟ"], min:0, max:150, step:5, def:50, unit:""},
      {k:"both", lab:["Like both","ชอบทั้งสอง"], min:0, max:100, step:5, def:25, unit:""}
    ],
    readouts:[
      {lab:["Tea only","ชาอย่างเดียว"], f:function(S){ return String(Math.max(0,S.p.a-S.p.both)); }},
      {lab:["Coffee only","กาแฟอย่างเดียว"], f:function(S){ return String(Math.max(0,S.p.b-S.p.both)); }},
      {lab:["Neither","ไม่ชอบทั้งคู่"], f:function(S){
        var u=S.p.a+S.p.b-S.p.both;
        return String(Math.max(0,S.p.tot-u)); }},
      {lab:["Do the four add up?","สี่ส่วนรวมกันได้ไหม"], f:function(S){
        var u=S.p.a+S.p.b-S.p.both;
        return u>S.p.tot ? (L()?"ไม่ — ตัวเลขขัดแย้งกัน":"no — the figures contradict each other")
                         : (L()?"ได้ — รวมเป็นจำนวนผู้ตอบพอดี":"yes — they total the sample exactly"); }}
    ],
    bars:[
      {lab:["Tea only","ชาอย่างเดียว"], f:function(p){ return Math.max(0,p.a-p.both); }, col:"accent"},
      {lab:["Both","ทั้งสอง"], f:function(p){ return p.both; }, col:"warn"},
      {lab:["Coffee only","กาแฟอย่างเดียว"], f:function(p){ return Math.max(0,p.b-p.both); }, col:"good"},
      {lab:["Neither","ไม่ชอบทั้งคู่"], f:function(p){
        return Math.max(0,p.tot-(p.a+p.b-p.both)); }, col:"faint"}
    ],
    note:["always fill the overlap first, then work outwards — that is the whole method","ให้เติมส่วนซ้อนทับก่อนเสมอ แล้วค่อยขยายออก นั่นคือวิธีทำทั้งหมด"]
  },
  guide:[
    {say:["Start in the middle: 25 people like both. Every other region is measured from there.",
          "เริ่มที่ตรงกลาง มี 25 คนที่ชอบทั้งสอง ส่วนอื่นทั้งหมดวัดจากตรงนั้น"], set:{tot:100,a:60,b:50,both:25}},
    {say:["Raise the overlap and both 'only' bars shrink together — the totals for tea and coffee never moved.",
          "เพิ่มส่วนซ้อนทับ แถบ อย่างเดียว ทั้งสองหดลงพร้อมกัน ทั้งที่ยอดชาและกาแฟไม่เปลี่ยน"], set:{tot:100,a:60,b:50,both:45}},
    {say:["Push it too far and the union exceeds the sample. The readout flags the contradiction.",
          "ดันมากเกินไป ยูเนียนจะเกินจำนวนผู้ตอบ ค่าที่แสดงจะเตือนว่าข้อมูลขัดแย้งกัน"], set:{tot:100,a:150,b:150,both:0}}
  ] }
],

methods:[
{id:"M-01", name:["Identify members and the empty set","ระบุสมาชิกและเซตว่าง"]},
{id:"M-02", name:["Count subsets and power sets","นับสับเซตและเพาเวอร์เซต"]},
{id:"M-03", name:["Apply set operations and De Morgan","ใช้การดำเนินการของเซตและเดอมอร์แกน"]},
{id:"M-04", name:["Count with the two-set formula","นับด้วยสูตรสองเซต"]},
{id:"M-05", name:["Count with the three-set formula","นับด้วยสูตรสามเซต"]},
{id:"M-06", name:["Solve a survey problem","แก้โจทย์สำรวจ"]}
],

traps:{
"T-01":["∅ and {∅} are different. The first is empty; the second contains one element.","∅ กับ {∅} ต่างกัน ตัวแรกว่างเปล่า ตัวที่สองมีสมาชิกหนึ่งตัว"],
"T-02":["∈ is membership, ⊂ is inclusion. ∅ ∈ P(A) but ∅ ⊂ A.","∈ คือการเป็นสมาชิก ⊂ คือการเป็นสับเซต  ∅ ∈ P(A) แต่ ∅ ⊂ A"],
"T-03":["De Morgan flips the operation as well as complementing the sets.","เดอมอร์แกนสลับตัวดำเนินการด้วย ไม่ใช่แค่ใส่คอมพลีเมนต์"],
"T-04":["The overlap was counted twice, or subtracted twice. Draw the diagram before adding.","นับส่วนซ้อนสองครั้ง หรือลบออกสองครั้ง ให้วาดแผนภาพก่อนบวก"]
},

gen:{
"M-01": function(sf){
  if(sf==="S-04") return {stem:["Which statement about the empty set is true?","ข้อใดถูกต้องเกี่ยวกับเซตว่าง"],
    opts:[{v:["n(∅) = 0 but n({∅}) = 1","n(∅) = 0 แต่ n({∅}) = 1"],ok:1},
          {v:["∅ = {∅}","∅ = {∅}"],trap:"T-01"},
          {v:["n({∅}) = 0","n({∅}) = 0"],trap:"T-01"},
          {v:["∅ has one element","∅ มีสมาชิกหนึ่งตัว"],trap:"T-01"}],unit:""};
  var s=pick([{d:"{1, 2, 2, 3, 3, 3}",n:3},{d:"{a, b, a, c}",n:3},{d:"{5, 5, 5}",n:1},{d:"{0, {1}, 2}",n:3}]);
  return {stem:["How many elements does "+s.d+" have?","เซต "+s.d+" มีสมาชิกกี่ตัว"],
    opts:[{v:String(s.n),ok:1},{v:String(s.n+1)},{v:String(s.n+2)},{v:String(s.n+3)}],unit:""};
},
"M-02": function(sf){
  var n=pick([3,4,5,6]);
  if(sf==="S-04") return {stem:["Which relation is correct for any set A?","ความสัมพันธ์ใดถูกต้องสำหรับเซต A ใดๆ"],
    opts:[{v:["∅ ⊂ A and ∅ ∈ P(A)","∅ ⊂ A และ ∅ ∈ P(A)"],ok:1},
          {v:["∅ ∈ A and ∅ ⊂ P(A)","∅ ∈ A และ ∅ ⊂ P(A)"],trap:"T-02"},
          {v:["∅ ∈ A only","∅ ∈ A เท่านั้น"],trap:"T-02"},
          {v:["Neither holds","ไม่มีข้อใดจริง"]}],unit:""};
  if(sf==="S-05") return {stem:["A power set has "+Math.pow(2,n)+" members. How many elements has the original set?",
                                "เพาเวอร์เซตมีสมาชิก "+Math.pow(2,n)+" ตัว เซตเดิมมีสมาชิกกี่ตัว"],
    opts:[{v:String(n),ok:1},{v:String(Math.pow(2,n)/2)},{v:String(n+1)},{v:String(n*2)}],unit:""};
  return {stem:["A set has "+n+" elements. How many subsets does it have?","เซตหนึ่งมีสมาชิก "+n+" ตัว มีสับเซตกี่เซต"],
    opts:[{v:String(Math.pow(2,n)),ok:1},{v:String(Math.pow(2,n)-1),trap:"T-02"},
          {v:String(n*n)},{v:String(n*2)}],unit:""};
},
"M-03": function(sf){
  if(sf==="S-04") return {stem:["Simplify (A ∪ B)′ using De Morgan's law.","จงลดรูป (A ∪ B)′ ด้วยกฎเดอมอร์แกน"],
    opts:[{v:"A′ ∩ B′",ok:1},{v:"A′ ∪ B′",trap:"T-03"},{v:"A ∩ B",trap:"T-03"},{v:"A ∪ B′"}],unit:""};
  var A=[1,2,3,4], B=[3,4,5,6];
  var C=pick([{q:["A ∪ B","A ∪ B"],a:"{1, 2, 3, 4, 5, 6}",w:["{3, 4}","{1, 2}","{5, 6}"]},
              {q:["A ∩ B","A ∩ B"],a:"{3, 4}",w:["{1, 2, 3, 4, 5, 6}","{1, 2}","{5, 6}"]},
              {q:["A − B","A − B"],a:"{1, 2}",w:["{5, 6}","{3, 4}","{1, 2, 5, 6}"]}]);
  return {stem:["Given A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, find "+C.q[0]+".",
                "กำหนด A = {1, 2, 3, 4} และ B = {3, 4, 5, 6} จงหา "+C.q[1]],
    opts:[{v:C.a,ok:1},{v:C.w[0]},{v:C.w[1]},{v:C.w[2]}],unit:""};
},
"M-04": function(sf){
  var a=pick([18,20,25,30]), b=pick([15,22,28]), both=pick([5,8,10]);
  var u=a+b-both;
  if(sf==="S-05") return {stem:["n(A) = "+a+", n(B) = "+b+" and n(A ∪ B) = "+u+". Find n(A ∩ B).",
                                "n(A) = "+a+", n(B) = "+b+" และ n(A ∪ B) = "+u+" จงหา n(A ∩ B)"],
    opts:[{v:String(both),ok:1},{v:String(a+b),trap:"T-04"},{v:String(u-a)},{v:String(both*2)}],unit:""};
  if(sf==="S-03") return {stem:["In a class of "+u+", "+a+" study French and "+b+" study German, with everyone studying at least one. How many study both?",
                                "ในห้องเรียน "+u+" คน มี "+a+" คนเรียนฝรั่งเศส และ "+b+" คนเรียนเยอรมัน โดยทุกคนเรียนอย่างน้อยหนึ่งภาษา มีกี่คนเรียนทั้งสอง"],
    opts:[{v:String(both),ok:1},{v:String(a+b-u+both),trap:"T-04"},{v:String(u-a)},{v:String(u-b)}],unit:""};
  return {stem:["n(A) = "+a+", n(B) = "+b+" and n(A ∩ B) = "+both+". Find n(A ∪ B).",
                "n(A) = "+a+", n(B) = "+b+" และ n(A ∩ B) = "+both+" จงหา n(A ∪ B)"],
    opts:[{v:String(u),ok:1},{v:String(a+b),trap:"T-04"},{v:String(a+b+both),trap:"T-04"},{v:String(both)}],unit:""};
},
"M-05": function(sf){
  var a=20,b=18,c=15,ab=8,ac=6,bc=5,abc=3;
  var u=a+b+c-ab-ac-bc+abc;
  if(sf==="S-04") return {stem:["In the three-set counting formula, what happens to n(A ∩ B ∩ C)?",
                                "ในสูตรนับสามเซต n(A ∩ B ∩ C) ถูกจัดการอย่างไร"],
    opts:[{v:["It is added back at the end","ถูกบวกกลับเข้าไปตอนท้าย"],ok:1},
          {v:["It is subtracted at the end","ถูกลบออกตอนท้าย"],trap:"T-04"},
          {v:["It is ignored","ไม่นำมาคิด"],trap:"T-04"},
          {v:["It is subtracted twice","ถูกลบสองครั้ง"],trap:"T-04"}],unit:""};
  return {stem:["With n(A)=20, n(B)=18, n(C)=15, n(A∩B)=8, n(A∩C)=6, n(B∩C)=5 and n(A∩B∩C)=3, find n(A∪B∪C).",
                "กำหนด n(A)=20, n(B)=18, n(C)=15, n(A∩B)=8, n(A∩C)=6, n(B∩C)=5 และ n(A∩B∩C)=3 จงหา n(A∪B∪C)"],
    opts:[{v:String(u),ok:1},{v:String(a+b+c),trap:"T-04"},{v:String(u-2*abc),trap:"T-04"},{v:String(u+abc)}],unit:""};
},
"M-06": function(sf){
  var total=pick([40,50,60]), onlyA=pick([12,15]), onlyB=pick([10,18]), both=pick([6,9]);
  var neither=total-onlyA-onlyB-both;
  if(sf==="S-04") return {stem:["What is the reliable first step in a Venn survey problem?",
                                "ขั้นตอนแรกที่เชื่อถือได้ในโจทย์สำรวจแบบเวนน์คืออะไร"],
    opts:[{v:["Fill the innermost overlap first, then work outwards","เติมส่วนซ้อนในสุดก่อน แล้วไล่ออกด้านนอก"],ok:1},
          {v:["Add all the given totals together","บวกยอดรวมที่โจทย์ให้มาทั้งหมด"],trap:"T-04"},
          {v:["Start from the outside region","เริ่มจากบริเวณด้านนอก"],trap:"T-04"},
          {v:["Assume nobody is in both","สมมติว่าไม่มีใครอยู่ทั้งสองกลุ่ม"],trap:"T-04"}],unit:""};
  return {stem:["Of "+total+" students, "+onlyA+" play only football, "+onlyB+" only tennis and "+both+" play both. How many play neither?",
                "จากนักเรียน "+total+" คน มี "+onlyA+" คนเล่นฟุตบอลอย่างเดียว "+onlyB+" คนเล่นเทนนิสอย่างเดียว และ "+both+" คนเล่นทั้งสอง มีกี่คนที่ไม่เล่นเลย"],
    opts:[{v:String(neither),ok:1},{v:String(total-onlyA-onlyB),trap:"T-04"},
          {v:String(neither+both)},{v:String(both)}],unit:""};
}
}
};
