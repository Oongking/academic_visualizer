var CHAPTER = {
id:"ma02", num:"02", slug:"logic", subject:"math",
kicker:["Mathematics · Chapter 02","คณิตศาสตร์ · บทที่ 2"],
title:["Logic","ตรรกศาสตร์"],
mapTitle:["One four-row table, and everything that follows from it","ตารางสี่แถวเดียว กับทุกอย่างที่ตามมาจากมัน"],
lede:["Logic is where mathematical sentences stop being about numbers and start being about each other. Almost the whole chapter collapses into a single table of four rows, and almost every mark lost in it comes from two of those rows being misread.",
      "ตรรกศาสตร์คือจุดที่ประโยคทางคณิตศาสตร์เลิกพูดถึงตัวเลข แล้วหันมาพูดถึงกันเอง เกือบทั้งบทย่อลงเหลือตารางเพียงสี่แถว และคะแนนที่เสียไปในบทนี้เกือบทั้งหมดเกิดจากการอ่านสองแถวในตารางนั้นผิด"],
next:["→ continues in Chapter 03 · Real Numbers","→ ต่อในบทที่ 3 · จำนวนจริง"],

nodes:[
{ id:"propositions", x:235, y:52, requires:[], methods:["M-01"],
  title:["Propositions and truth values","ประพจน์และค่าความจริง"],
  body:[["A proposition is a sentence that makes a claim you can actually settle: it is either true or false, exactly one of the two, never both and never neither. 1 + 5 = 10 is a perfectly good proposition — a false one. Questions, commands and matters of taste make no claim of that kind, so they never enter a truth table at all.",
         "A sentence carrying a free variable, such as x + 1 = 5, is an open sentence. It is not false; it simply has no truth value yet. It acquires one only when you substitute a value for the variable or attach a quantifier to it. That single distinction is what the last node of this chapter is built on, so it is worth holding onto from the start."],
        ["ประพจน์คือประโยคบอกเล่าหรือปฏิเสธที่ตัดสินได้จริงว่าเป็นจริงหรือเท็จ อย่างใดอย่างหนึ่งเพียงอย่างเดียว ไม่เป็นทั้งสองอย่างและไม่เป็นทั้งคู่ไม่ได้ เช่น 1 + 5 = 10 เป็นประพจน์ที่ดีสมบูรณ์ เพียงแต่มีค่าความจริงเป็นเท็จ ส่วนประโยคคำถาม ประโยคคำสั่ง และเรื่องของรสนิยม ไม่ได้อ้างสิ่งใดในลักษณะนี้ จึงไม่เข้าตารางค่าความจริงเลย",
         "ประโยคที่ติดตัวแปรอิสระ เช่น x + 1 = 5 เรียกว่าประโยคเปิด มันไม่ได้เป็นเท็จ แต่ยังไม่มีค่าความจริงต่างหาก จะมีค่าความจริงก็ต่อเมื่อแทนค่าตัวแปรหรือเติมตัวบ่งปริมาณเข้าไป ข้อแตกต่างเพียงข้อนี้คือฐานของหัวข้อสุดท้ายของบท จึงควรจำไว้ตั้งแต่ต้น"]],
  formula:["A proposition has exactly one truth value: T or F","ประพจน์มีค่าความจริงเพียงค่าเดียว จริง หรือ เท็จ"],
  flabel:["Never both, never neither","ไม่เป็นทั้งสอง และไม่เป็นไม่มีเลย"],
  viz:"grid",
  vizcfg:{
    title:["WHICH SENTENCES CAN BE TRUE OR FALSE","ประโยคใดบ้างที่เป็นจริงหรือเท็จได้"],
    cols:[["Sentence","ประโยค"],["A proposition?","เป็นประพจน์ไหม"],["Why","เพราะ"]],
    ctrls:[{k:"i", lab:["Highlight sentence","เน้นประโยค"], min:0, max:5, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Verdict","คำตัดสิน"], f:function(S){
        return [1,0,1,0,1,0][S.p.i] ? (L()?"เป็นประพจน์":"a proposition") : (L()?"ไม่เป็นประพจน์":"not a proposition"); }},
      {lab:["The test","เกณฑ์ทดสอบ"], f:function(){
        return L()?"ตัดสินได้ไหมว่าจริงหรือเท็จ":"can you decide whether it is true or false"; }},
      {lab:["Questions and commands","คำถามและคำสั่ง"], f:function(){
        return L()?"ไม่เคยเป็นประพจน์":"are never propositions"; }}
    ],
    rows:function(p){
      var R=[[["2 + 2 = 4","2 + 2 = 4"],["yes","ใช่"],["it is definitely true","เป็นจริงแน่นอน"]],
             [["Close the door.","ปิดประตูด้วย"],["no","ไม่"],["a command has no truth value","คำสั่งไม่มีค่าความจริง"]],
             [["7 is even","7 เป็นจำนวนคู่"],["yes","ใช่"],["false, but still decidable","เป็นเท็จ แต่ก็ตัดสินได้"]],
             [["What time is it?","ตอนนี้กี่โมง"],["no","ไม่"],["a question asserts nothing","คำถามไม่ได้ยืนยันอะไร"]],
             [["Bangkok is in Thailand","กรุงเทพอยู่ในประเทศไทย"],["yes","ใช่"],["a checkable claim","เป็นข้ออ้างที่ตรวจสอบได้"]],
             [["x + 1 = 5","x + 1 = 5"],["no","ไม่"],["depends on x — an open sentence","ขึ้นกับ x — เป็นประโยคเปิด"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===1?([1,0,1,0,1,0][i]?"good":"warn"):"accent"}; }); });
    },
    note:["an open sentence becomes a proposition only once you pin down the variable","ประโยคเปิดจะกลายเป็นประพจน์ก็ต่อเมื่อกำหนดค่าตัวแปรแล้วเท่านั้น"]
  } },

{ id:"connectives", x:100, y:150, requires:["propositions"], methods:["M-02"],
  title:["Connectives and truth tables","ตัวเชื่อมและตารางค่าความจริง"],
  body:[["Four connectives join propositions — ∧ and, ∨ or, → if…then, ↔ if and only if — while ~ acts on a single one and simply reverses it. Two propositions can be assigned truth values in four ways, so any compound built from p and q is described completely by a table of four rows; with n propositions the table has 2ⁿ rows and nothing is hidden from it.",
         "Three of those rows carry almost all the difficulty. ∧ is true in exactly one row, T ∧ T, which makes it the hardest connective to satisfy. ∨ is false in exactly one row, F ∨ F, so mathematical or deliberately includes the case where both parts hold — reading it as an exclusive choice is trap T-04. And → is false in exactly one row, T → F, which means a conditional with a false hypothesis is true no matter what it promises; forgetting that is trap T-02."],
        ["ตัวเชื่อมมีสี่ชนิด ได้แก่ ∧ และ, ∨ หรือ, → ถ้า…แล้ว, ↔ ก็ต่อเมื่อ ส่วน ~ กระทำกับประพจน์เดียวและกลับค่าความจริงให้ตรงข้าม สองประพจน์กำหนดค่าความจริงได้สี่แบบ ประพจน์เชิงประกอบใดที่สร้างจาก p และ q จึงอธิบายได้ครบด้วยตารางสี่แถว และถ้ามี n ประพจน์ ตารางจะมี 2ⁿ แถว โดยไม่มีกรณีใดหลุดรอดไปได้",
         "ความยากเกือบทั้งหมดอยู่ที่สามแถวนี้ ∧ เป็นจริงเพียงแถวเดียวคือ T ∧ T จึงเป็นตัวเชื่อมที่ทำให้เป็นจริงได้ยากที่สุด ∨ เป็นเท็จเพียงแถวเดียวคือ F ∨ F ดังนั้นคำว่า หรือ ทางคณิตศาสตร์จึงจงใจรวมกรณีที่จริงทั้งคู่ไว้ด้วย การอ่านว่าเป็นการเลือกอย่างใดอย่างหนึ่งคือกับดัก T-04 ส่วน → เป็นเท็จเพียงแถวเดียวคือ T → F นั่นแปลว่าประพจน์เงื่อนไขที่เหตุเป็นเท็จจะเป็นจริงเสมอไม่ว่าจะสัญญาอะไรไว้ การลืมข้อนี้คือกับดัก T-02"]],
  formula:["p → q is false only when p is T and q is F","p → q เป็นเท็จกรณีเดียวคือ p จริง และ q เท็จ"],
  flabel:["One row does all the work","แถวเดียวที่ตัดสินทุกอย่าง"],
  viz:{
    vb:"0 0 560 300", anim:false,
    ctrls:[
      {k:"c",  lab:["0 p∧q · 1 p∨q · 2 p→q · 3 p↔q","0 p∧q · 1 p∨q · 2 p→q · 3 p↔q"], min:0, max:3, step:1, def:2, unit:""},
      {k:"pv", lab:["p    0 false · 1 true","p    0 เท็จ · 1 จริง"], min:0, max:1, step:1, def:1, unit:""},
      {k:"qv", lab:["q    0 false · 1 true","q    0 เท็จ · 1 จริง"], min:0, max:1, step:1, def:0, unit:""}
    ],
    readouts:[
      {lab:["Connective","ตัวเชื่อม"], f:function(S){
        var N=[["p ∧ q · and","p ∧ q · และ"],["p ∨ q · or","p ∨ q · หรือ"],
               ["p → q · if…then","p → q · ถ้า…แล้ว"],["p ↔ q · if and only if","p ↔ q · ก็ต่อเมื่อ"]];
        return N[S.p.c][L()]; }},
      {lab:["Your row","แถวที่เลือก"], f:function(S){
        var c=S.p.c, a=S.p.pv===1, b=S.p.qv===1;
        var r=c===0?(a&&b):c===1?(a||b):c===2?(!a||b):(a===b);
        var g=function(v){ return v?"T":"F"; };
        return g(a)+" "+["∧","∨","→","↔"][c]+" "+g(b)+"   =   "+g(r); }},
      {lab:["The row that decides","แถวที่เป็นตัวตัดสิน"], f:function(S){
        var N=[["true only at T ∧ T","จริงกรณีเดียวคือ T ∧ T"],
               ["false only at F ∨ F","เท็จกรณีเดียวคือ F ∨ F"],
               ["false only at T → F","เท็จกรณีเดียวคือ T → F"],
               ["no single row — two of each","ไม่มีแถวเดียว มีอย่างละสองแถว"]];
        return N[S.p.c][L()]; }}
    ],
    draw:function(S,o){
      var c=S.p.c, pv=S.p.pv, qv=S.p.qv;
      var SY=["∧","∨","→","↔"];
      var R=[[1,1],[1,0],[0,1],[0,0]];
      var ev=function(a,b){
        if(c===0) return (a&&b)?1:0;
        if(c===1) return (a||b)?1:0;
        if(c===2) return (!a||b)?1:0;
        return (a===b)?1:0; };
      var g=function(v){ return v?"T":"F"; };
      var xa=40, xb=112, xc=184, xd=330, yh=52, y0=88, rh=42;
      var sel=(1-pv)*2+(1-qv);
      var rare=[0,3,1,-1][c];
      o.push('<text x="24" y="26" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5" letter-spacing="1.4">'+tx(["TRUTH TABLE","ตารางค่าความจริง"])+'</text>');
      /* the accent band marks the row the learner has dialled in */
      o.push('<rect x="'+xa+'" y="'+(y0+sel*rh)+'" width="'+(xd-xa)+'" height="'+rh+'" fill="var(--accent)" fill-opacity=".20"/>');
      o.push('<rect x="'+xa+'" y="'+yh+'" width="'+(xd-xa)+'" height="'+(y0-yh+4*rh)+'" fill="none" stroke="var(--ink-faint)" stroke-width="1.4"/>');
      o.push('<line x1="'+xa+'" y1="'+y0+'" x2="'+xd+'" y2="'+y0+'" stroke="var(--ink)" stroke-width="1.6"/>');
      o.push('<line x1="'+xb+'" y1="'+yh+'" x2="'+xb+'" y2="'+(y0+4*rh)+'" stroke="var(--ink-faint)" stroke-width="1"/>');
      o.push('<line x1="'+xc+'" y1="'+yh+'" x2="'+xc+'" y2="'+(y0+4*rh)+'" stroke="var(--ink)" stroke-width="1.6"/>');
      var hd=function(cx,s){
        return '<text x="'+cx+'" y="'+(yh+25)+'" text-anchor="middle" fill="var(--ink)" font-family="IBM Plex Sans" font-size="15" font-weight="600">'+s+'</text>'; };
      o.push(hd((xa+xb)/2,"p"));
      o.push(hd((xb+xc)/2,"q"));
      o.push(hd((xc+xd)/2,"p "+SY[c]+" q"));
      for(var i=0;i<4;i++){
        var yy=y0+i*rh+28, r=ev(R[i][0]===1,R[i][1]===1);
        var ink=(i===sel)?"var(--ink)":"var(--ink-faint)";
        o.push('<text x="'+((xa+xb)/2)+'" y="'+yy+'" text-anchor="middle" fill="'+ink+'" font-family="Bodoni Moda" font-size="19">'+g(R[i][0])+'</text>');
        o.push('<text x="'+((xb+xc)/2)+'" y="'+yy+'" text-anchor="middle" fill="'+ink+'" font-family="Bodoni Moda" font-size="19">'+g(R[i][1])+'</text>');
        o.push('<text x="'+((xc+xd)/2)+'" y="'+yy+'" text-anchor="middle" fill="'+(r?"var(--good)":"var(--warn)")+'" font-family="Bodoni Moda" font-size="21" font-weight="600">'+g(r)+'</text>');
        /* a dot beside the one row that characterises this connective */
        if(i===rare) o.push('<circle cx="26" cy="'+(yy-6)+'" r="4.5" fill="var(--warn)"/>');
      }
      /* the panel restates the selected row on its own, away from the table */
      var px=362, pw=176;
      var res=ev(pv===1,qv===1);
      o.push('<rect x="'+px+'" y="'+yh+'" width="'+pw+'" height="'+(y0-yh+4*rh)+'" fill="none" stroke="var(--ink-faint)" stroke-width="1.4"/>');
      o.push('<text x="'+(px+14)+'" y="'+(yh+22)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.2">'+tx(["YOUR ROW","แถวของคุณ"])+'</text>');
      o.push('<text x="'+(px+pw/2)+'" y="'+(yh+64)+'" text-anchor="middle" fill="var(--ink)" font-family="Bodoni Moda" font-size="24">'+g(pv)+' '+SY[c]+' '+g(qv)+'</text>');
      o.push('<text x="'+(px+pw/2)+'" y="'+(yh+134)+'" text-anchor="middle" fill="'+(res?"var(--good)":"var(--warn)")+'" font-family="Bodoni Moda" font-size="54">'+g(res)+'</text>');
      var NT=[["AND is true in only","one of the four rows"],
              ["OR is false in only","one of the four rows"],
              ["IF-THEN fails in only","one row, T then F"],
              ["IFF is true whenever","p and q agree"]];
      o.push('<text x="'+(px+14)+'" y="'+(yh+170)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5">'+NT[c][0]+'</text>');
      o.push('<text x="'+(px+14)+'" y="'+(yh+185)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10.5">'+NT[c][1]+'</text>');
      var cap=(rare<0)?"↔ has two true rows and two false rows — no single deciding row"
                      :"The dot marks the one row that decides this connective";
      o.push('<text x="24" y="284" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+cap+'</text>');
    }
  },
  guide:[
    {say:["Start with the conditional, p true and q false. This is the single row where p → q comes out false. Every question about implication is really a question about this one row.",
          "เริ่มที่ประพจน์เงื่อนไข ให้ p เป็นจริงและ q เป็นเท็จ นี่คือแถวเดียวที่ p → q เป็นเท็จ คำถามเกี่ยวกับการแจงนัยทุกข้อ แท้จริงคือคำถามเกี่ยวกับแถวนี้เพียงแถวเดียว"], set:{c:2,pv:0*1+1,qv:0}},
    {say:["Now drop the hypothesis to false. Both halves are false, yet p → q reads true — the statement never promised anything about the case where p fails, so nothing can break it there.",
          "ทีนี้ลดเหตุลงให้เป็นเท็จ ทั้งสองส่วนเป็นเท็จ แต่ p → q กลับเป็นจริง เพราะประพจน์นี้ไม่เคยสัญญาอะไรไว้กับกรณีที่ p เป็นเท็จ จึงไม่มีอะไรทำให้มันเป็นเท็จได้"], set:{c:2,pv:0,qv:0}},
    {say:["Switch to ∧. Now the dot sits on the top row: T ∧ T is the only place the column shows true. Move either slider off T and the whole column collapses.",
          "เปลี่ยนไปที่ ∧ จุดจะย้ายไปอยู่แถวบนสุด T ∧ T เป็นที่เดียวที่คอลัมน์เป็นจริง ถ้าเลื่อนตัวใดตัวหนึ่งออกจาก T คอลัมน์ก็พังทั้งแถว"], set:{c:0,pv:1,qv:1}},
    {say:["Finally ∨, the mirror image: false in exactly one row, F ∨ F. Raise p back to T and it stays true even when q is true as well — mathematical or keeps the both-true case.",
          "สุดท้าย ∨ ซึ่งเป็นภาพสะท้อน คือเป็นเท็จเพียงแถวเดียวคือ F ∨ F ถ้ายก p กลับขึ้นเป็น T ก็ยังคงเป็นจริงแม้ q จะจริงด้วย เพราะ หรือ ทางคณิตศาสตร์เก็บกรณีจริงทั้งคู่ไว้"], set:{c:1,pv:0,qv:0}}
  ]},

{ id:"equivalence", x:370, y:150, requires:["propositions"], methods:["M-03","M-04"],
  title:["Equivalent statements","ประพจน์ที่สมมูลกัน"],
  body:[["Two compound statements are logically equivalent when their truth-table columns agree row for row — not sometimes, but in all four. The most valuable equivalence in the chapter is p → q ≡ ~p ∨ q ≡ ~q → ~p, which says a conditional can always be rewritten as an or-statement, or turned around and negated on both sides. De Morgan does the same work inside a negation: ~(p ∨ q) ≡ ~p ∧ ~q, and ~(p ∧ q) ≡ ~p ∨ ~q.",
         "From p → q you can build three relatives: the converse q → p, the inverse ~p → ~q, and the contrapositive ~q → ~p. Only the contrapositive is equivalent to the original. The converse and inverse are equivalent to each other and to nothing else on the list, which is why an argument that quietly swaps a statement for its converse can look watertight and still be wrong. Mixing the two up is trap T-01."],
        ["ประพจน์เชิงประกอบสองประพจน์สมมูลกันเมื่อค่าความจริงตรงกันทุกแถวในตาราง ไม่ใช่ตรงกันบางแถว แต่ต้องครบทั้งสี่แถว สมมูลที่มีค่าที่สุดของบทนี้คือ p → q ≡ ~p ∨ q ≡ ~q → ~p ซึ่งบอกว่าประพจน์เงื่อนไขเขียนใหม่ในรูป หรือ ได้เสมอ หรือจะสลับที่แล้วใส่นิเสธทั้งสองข้างก็ได้ ส่วนกฎเดอมอร์แกนทำหน้าที่เดียวกันภายในนิเสธ คือ ~(p ∨ q) ≡ ~p ∧ ~q และ ~(p ∧ q) ≡ ~p ∨ ~q",
         "จาก p → q สร้างประพจน์ที่เกี่ยวข้องได้สามแบบ คือ ผกผัน q → p, ตรงข้าม ~p → ~q และแย้งสลับที่ ~q → ~p โดยมีเพียงแย้งสลับที่เท่านั้นที่สมมูลกับประพจน์เดิม ส่วนผกผันกับตรงข้ามสมมูลกันเองและไม่สมมูลกับตัวใดในรายการนี้ นี่คือเหตุผลที่การอ้างเหตุผลซึ่งแอบเปลี่ยนประพจน์เป็นผกผันของมัน อาจดูแน่นหนาแต่ยังผิดอยู่ดี การสับสนระหว่างสองตัวนี้คือกับดัก T-01"]],
  formula:["p → q ≡ ~p ∨ q ≡ ~q → ~p","p → q ≡ ~p ∨ q ≡ ~q → ~p"],
  flabel:["Only the contrapositive survives","มีเพียงแย้งสลับที่ที่สมมูล"],
  viz:"grid",
  vizcfg:{
    title:["TWO EXPRESSIONS, COMPARED ROW BY ROW","สองนิพจน์ เทียบกันทีละแถว"],
    cols:[["p","p"],["q","q"],["Left","ซ้าย"],["Right","ขวา"],["Match?","ตรงกันไหม"]],
    ctrls:[{k:"pair", lab:["0 p→q vs ~p∨q · 1 ~(p∧q) vs ~p∨~q · 2 p→q vs q→p","0 · 1 · 2"], min:0, max:2, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Comparing","กำลังเทียบ"], f:function(S){
        return ["p → q   vs   ~p ∨ q","~(p ∧ q)   vs   ~p ∨ ~q","p → q   vs   q → p"][S.p.pair]; }},
      {lab:["Equivalent?","สมมูลกันไหม"], f:function(S){
        return S.p.pair<2 ? (L()?"สมมูลกัน — ทุกแถวตรงกัน":"equivalent — every row agrees")
                          : (L()?"ไม่สมมูล — บทกลับไม่เท่ากับเดิม":"NOT equivalent — a converse is a different claim"); }},
      {lab:["Name","ชื่อ"], f:function(S){
        return [["definition of implication","นิยามของการแจงความ"],["De Morgan's law","กฎเดอมอร์แกน"],
                ["the converse fallacy","ความผิดพลาดเรื่องบทกลับ"]][S.p.pair][L()]; }}
    ],
    rows:function(p){
      var TF=[[1,1],[1,0],[0,1],[0,0]];
      return TF.map(function(r){
        var P=r[0], Q=r[1], l, rr;
        if(p.pair===0){ l = (!P||Q)?1:0; rr = (!P||Q)?1:0; }
        else if(p.pair===1){ l = !(P&&Q)?1:0; rr = ((!P)||(!Q))?1:0; }
        else { l = (!P||Q)?1:0; rr = (!Q||P)?1:0; }
        var same = (l===rr);
        return [{v:P?"T":"F", on:!!P, col:"ink"},
                {v:Q?"T":"F", on:!!Q, col:"ink"},
                {v:l?"T":"F", on:!!l, col:"accent"},
                {v:rr?"T":"F", on:!!rr, col:"good"},
                {v:same?"✓":"✗", on:true, col:same?"good":"warn"}];
      });
    },
    note:["equivalence means the last column is all ticks — a single cross destroys it","สมมูลกันคือคอลัมน์สุดท้ายเป็นเครื่องหมายถูกทั้งหมด กากบาทเพียงตัวเดียวก็ทำลายมันได้"]
  },
  guide:[
    {say:["p → q and ~p ∨ q agree on all four rows, so they are genuinely the same statement.",
          "p → q กับ ~p ∨ q ตรงกันทั้งสี่แถว จึงเป็นข้อความเดียวกันจริงๆ"], set:{pair:0}},
    {say:["De Morgan's law also survives every row. Negation turns AND into OR.",
          "กฎเดอมอร์แกนก็ผ่านทุกแถวเช่นกัน การนิเสธเปลี่ยน AND เป็น OR"], set:{pair:1}},
    {say:["Now compare a statement with its converse. Two rows disagree — they were never the same claim.",
          "ทีนี้เทียบข้อความกับบทกลับของมัน สองแถวไม่ตรงกัน ทั้งสองไม่เคยเป็นข้ออ้างเดียวกัน"], set:{pair:2}}
  ] },

{ id:"tautology", x:235, y:248, requires:["connectives","equivalence"], methods:["M-05"],
  title:["Tautology and valid arguments","สัจนิรันดร์และการอ้างเหตุผล"],
  body:[["A tautology is a compound statement whose column reads T in every row of the table; a contradiction reads F in every row and is exactly the negation of a tautology. You can always settle which you have by writing out all 2ⁿ rows, but for anything with three or more letters that becomes slow, and there is a much faster route.",
         "Assume the statement is false, then chase the consequences. Because → fails in only one row, assuming a conditional false pins its hypothesis to T and its conclusion to F immediately, and the remaining values usually fall out with no choices left. If the assumption forces a contradiction, no false row exists and the statement is a tautology. An argument with premises P₁ … Pₙ and conclusion C is valid precisely when (P₁ ∧ … ∧ Pₙ) → C is a tautology, so the working is identical: set every premise T and the conclusion F and hunt for the clash. Forgetting that a false hypothesis already makes a conditional true is trap T-02."],
        ["สัจนิรันดร์คือประพจน์เชิงประกอบที่คอลัมน์เป็นจริงทุกแถวในตาราง ส่วนข้อขัดแย้งเป็นเท็จทุกแถวและเป็นนิเสธของสัจนิรันดร์พอดี เราตัดสินได้เสมอด้วยการเขียนตารางให้ครบ 2ⁿ แถว แต่ถ้ามีตัวแปรตั้งแต่สามตัวขึ้นไปจะช้ามาก และยังมีทางที่เร็วกว่านั้น",
         "ให้สมมติว่าประพจน์นั้นเป็นเท็จ แล้วไล่ผลที่ตามมา เนื่องจาก → เป็นเท็จได้กรณีเดียว การสมมติให้ประพจน์เงื่อนไขเป็นเท็จจึงบังคับให้เหตุเป็นจริงและผลเป็นเท็จทันที ค่าที่เหลือมักตามมาโดยไม่มีทางเลือกอื่น ถ้าข้อสมมตินั้นบังคับให้เกิดข้อขัดแย้ง แปลว่าไม่มีแถวที่เป็นเท็จอยู่จริง ประพจน์นั้นจึงเป็นสัจนิรันดร์ การอ้างเหตุผลที่มีเหตุ P₁ … Pₙ และผล C จะสมเหตุสมผลก็ต่อเมื่อ (P₁ ∧ … ∧ Pₙ) → C เป็นสัจนิรันดร์ วิธีทำจึงเหมือนกันทุกประการ คือให้เหตุทุกข้อเป็นจริงและผลเป็นเท็จ แล้วมองหาข้อขัดแย้ง การลืมว่าเหตุที่เป็นเท็จทำให้ประพจน์เงื่อนไขเป็นจริงไปแล้วคือกับดัก T-02"]],
  formula:["Valid ⟺ (P₁ ∧ … ∧ Pₙ) → C is a tautology","สมเหตุสมผล ⟺ (P₁ ∧ … ∧ Pₙ) → C เป็นสัจนิรันดร์"],
  flabel:["Assume it fails, hunt the clash","สมมติให้เป็นเท็จ แล้วหาข้อขัดแย้ง"],
  viz:"grid",
  vizcfg:{
    title:["TRUE IN EVERY ROW, OR NOT","จริงทุกแถว หรือไม่"],
    cols:[["p","p"],["q","q"],["Expression","นิพจน์"],["Verdict","ผล"]],
    ctrls:[{k:"e", lab:["0 p∨~p · 1 p∧~p · 2 (p→q)∧p→q · 3 p∨q","0 · 1 · 2 · 3"], min:0, max:3, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Expression","นิพจน์"], f:function(S){
        return ["p ∨ ~p","p ∧ ~p","((p → q) ∧ p) → q","p ∨ q"][S.p.e]; }},
      {lab:["Kind","ชนิด"], f:function(S){
        return [["tautology — always true","สัจนิรันดร์ — จริงเสมอ"],["contradiction — never true","ข้อขัดแย้ง — ไม่เคยจริง"],
                ["tautology — a valid argument","สัจนิรันดร์ — การอ้างเหตุผลสมเหตุสมผล"],
                ["contingent — depends","ขึ้นกับกรณี"]][S.p.e][L()]; }},
      {lab:["Why it matters","ทำไมจึงสำคัญ"], f:function(){
        return L()?"การอ้างเหตุผลสมเหตุสมผลก็ต่อเมื่อรูปแบบเป็นสัจนิรันดร์":"an argument is valid exactly when its form is a tautology"; }}
    ],
    rows:function(p){
      var TF=[[1,1],[1,0],[0,1],[0,0]];
      return TF.map(function(r){
        var P=r[0], Q=r[1], v;
        if(p.e===0) v = (P||!P)?1:0;
        else if(p.e===1) v = (P&&!P)?1:0;
        else if(p.e===2) v = ((((!P||Q)&&P)?1:0) ? (Q?1:0) : 1);
        else v = (P||Q)?1:0;
        return [{v:P?"T":"F", on:!!P, col:"ink"},
                {v:Q?"T":"F", on:!!Q, col:"ink"},
                {v:v?"T":"F", on:!!v, col:v?"good":"warn"},
                {v:v?"true":"false", on:!!v, col:v?"good":"warn"}];
      });
    },
    note:["a tautology has no false row anywhere — that is the only thing you check","สัจนิรันดร์ไม่มีแถวที่เป็นเท็จเลย นั่นคือสิ่งเดียวที่ต้องตรวจ"]
  } },

{ id:"quantifiers", x:235, y:346, requires:["tautology"], methods:["M-06"],
  title:["Quantifiers","ตัวบ่งปริมาณ"],
  body:[["A quantifier turns an open sentence into a proposition by declaring how much of the universe it has to cover. ∀x[P(x)] claims P holds for every x and dies on a single counterexample; ∃x[P(x)] claims at least one x works and needs only a single witness to survive. Which universe you are standing in decides the answer: ∀x[x² > 0] is false over the real numbers because x = 0 exists, and true the moment zero is excluded.",
         "With two quantifiers the order carries meaning. ∀x∃y promises that every x can be answered by some y chosen to suit it, while ∃x∀y demands one single x that works against every y at once — a far stronger claim that is usually false when the first one is true. Negation, by contrast, is purely mechanical: ~∀x[P(x)] ≡ ∃x[~P(x)] and ~∃x[P(x)] ≡ ∀x[~P(x)]. Pushing the negation inwards flips every ∀ into ∃ and every ∃ into ∀; negating only the inside and leaving the symbol untouched is trap T-03."],
        ["ตัวบ่งปริมาณเปลี่ยนประโยคเปิดให้กลายเป็นประพจน์ โดยประกาศว่าข้อความต้องครอบคลุมเอกภพสัมพัทธ์มากเพียงใด ∀x[P(x)] อ้างว่า P เป็นจริงสำหรับ x ทุกตัว และล้มลงด้วยตัวอย่างค้านเพียงตัวเดียว ส่วน ∃x[P(x)] อ้างว่ามี x อย่างน้อยหนึ่งตัวที่ใช้ได้ จึงต้องการพยานเพียงตัวเดียวก็อยู่รอด เอกภพสัมพัทธ์ที่เรายืนอยู่เป็นตัวตัดสินคำตอบ เช่น ∀x[x² > 0] เป็นเท็จบนจำนวนจริงเพราะมี x = 0 อยู่ และกลายเป็นจริงทันทีที่ตัดศูนย์ออก",
         "เมื่อมีตัวบ่งปริมาณสองตัว ลำดับมีความหมาย ∀x∃y ให้คำมั่นว่าทุก x หา y บางตัวมาตอบให้เหมาะกับมันได้ ส่วน ∃x∀y เรียกร้อง x เพียงตัวเดียวที่ใช้ได้กับ y ทุกตัวพร้อมกัน ซึ่งเป็นข้ออ้างที่แรงกว่ามากและมักเป็นเท็จในขณะที่แบบแรกเป็นจริง ในทางกลับกัน การหานิเสธเป็นเรื่องกลไกล้วนๆ คือ ~∀x[P(x)] ≡ ∃x[~P(x)] และ ~∃x[P(x)] ≡ ∀x[~P(x)] การดันนิเสธเข้าไปข้างในจะพลิก ∀ ทุกตัวเป็น ∃ และ ∃ ทุกตัวเป็น ∀ การใส่นิเสธเฉพาะข้างในโดยไม่แตะสัญลักษณ์คือกับดัก T-03"]],
  formula:["~∀x[P(x)] ≡ ∃x[~P(x)]        ~∃x[P(x)] ≡ ∀x[~P(x)]","~∀x[P(x)] ≡ ∃x[~P(x)]        ~∃x[P(x)] ≡ ∀x[~P(x)]"],
  flabel:["Negation swaps the symbol too","นิเสธสลับสัญลักษณ์ด้วย"],
  viz:"grid",
  vizcfg:{
    title:["NEGATING A QUANTIFIER FLIPS IT","การนิเสธตัวบ่งปริมาณทำให้มันพลิก"],
    cols:[["Statement","ข้อความ"],["Its negation","นิเสธของมัน"],["Rule","กฎ"]],
    ctrls:[{k:"i", lab:["Highlight row","เน้นแถวที่"], min:0, max:3, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Statement","ข้อความ"], f:function(S){
        return ["∀x P(x)","∃x P(x)","∀x ~P(x)","∃x ~P(x)"][S.p.i]; }},
      {lab:["Negation","นิเสธ"], f:function(S){
        return ["∃x ~P(x)","∀x ~P(x)","∃x P(x)","∀x P(x)"][S.p.i]; }},
      {lab:["To disprove 'all'","การหักล้าง ทุกตัว"], f:function(){
        return L()?"หาตัวอย่างค้านเพียงตัวเดียวก็พอ":"one counter-example is enough"; }},
      {lab:["To disprove 'some'","การหักล้าง บางตัว"], f:function(){
        return L()?"ต้องตรวจทุกตัว":"you must check every case"; }}
    ],
    rows:function(p){
      var R=[[["∀x P(x)  ·  all are","∀x P(x)  ·  ทุกตัวเป็น"],["∃x ~P(x)  ·  at least one is not","∃x ~P(x)  ·  มีอย่างน้อยหนึ่งตัวที่ไม่เป็น"],["∀ becomes ∃","∀ กลายเป็น ∃"]],
             [["∃x P(x)  ·  some is","∃x P(x)  ·  บางตัวเป็น"],["∀x ~P(x)  ·  none is","∀x ~P(x)  ·  ไม่มีตัวใดเป็น"],["∃ becomes ∀","∃ กลายเป็น ∀"]],
             [["∀x ~P(x)  ·  none is","∀x ~P(x)  ·  ไม่มีตัวใดเป็น"],["∃x P(x)  ·  some is","∃x P(x)  ·  บางตัวเป็น"],["∀ becomes ∃","∀ กลายเป็น ∃"]],
             [["∃x ~P(x)  ·  some is not","∃x ~P(x)  ·  บางตัวไม่เป็น"],["∀x P(x)  ·  all are","∀x P(x)  ·  ทุกตัวเป็น"],["∃ becomes ∀","∃ กลายเป็น ∀"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===0?"accent":(j===1?"good":"ink")}; }); });
    },
    note:["the negation of 'all swans are white' is not 'no swan is white' — it is 'one swan is not'","นิเสธของ หงส์ทุกตัวสีขาว ไม่ใช่ ไม่มีหงส์ตัวใดสีขาว แต่คือ มีหงส์ตัวหนึ่งที่ไม่ขาว"]
  } }
],

methods:[
{id:"M-01", name:["Identify propositions and truth values","ระบุประพจน์และค่าความจริง"]},
{id:"M-02", name:["Evaluate a compound proposition","หาค่าความจริงของประพจน์เชิงประกอบ"]},
{id:"M-03", name:["Recognise equivalent forms","ระบุประพจน์ที่สมมูลกัน"]},
{id:"M-04", name:["Form converse, inverse and contrapositive","เขียนผกผัน ตรงข้าม และแย้งสลับที่"]},
{id:"M-05", name:["Test a tautology and the validity of an argument","ตรวจสอบสัจนิรันดร์และความสมเหตุสมผล"]},
{id:"M-06", name:["Use quantifiers and their negations","ใช้ตัวบ่งปริมาณและนิเสธของมัน"]}
],

traps:{
"T-01":["The converse q → p is not equivalent to p → q. Only the contrapositive ~q → ~p is.","ผกผัน q → p ไม่สมมูลกับ p → q มีเพียงแย้งสลับที่ ~q → ~p เท่านั้นที่สมมูล"],
"T-02":["A conditional with a false hypothesis is true. p → q fails only in the row T → F.","ประพจน์เงื่อนไขที่เหตุเป็นเท็จมีค่าเป็นจริง p → q เป็นเท็จเฉพาะแถว T → F"],
"T-03":["Negating a quantifier swaps ∀ and ∃ as well as negating what is inside.","การหานิเสธของตัวบ่งปริมาณต้องสลับ ∀ กับ ∃ ด้วย ไม่ใช่ใส่นิเสธเฉพาะข้างใน"],
"T-04":["Mathematical or is inclusive. p ∨ q is still true when p and q are both true.","หรือ ทางคณิตศาสตร์รวมกรณีจริงทั้งคู่ p ∨ q ยังเป็นจริงเมื่อ p และ q จริงพร้อมกัน"]
},

gen:{
"M-01": function(sf){
  if(sf==="S-04") return {stem:["What is the truth value of: if 2 + 2 = 5, then the moon is made of cheese?",
                                "ประพจน์ ถ้า 2 + 2 = 5 แล้วดวงจันทร์ทำจากเนยแข็ง มีค่าความจริงเป็นอย่างไร"],
    opts:[{v:["True — the hypothesis is false, so the conditional cannot fail","จริง เพราะเหตุเป็นเท็จ ประพจน์เงื่อนไขจึงเป็นเท็จไม่ได้"],ok:1},
          {v:["False — both halves are false","เท็จ เพราะทั้งสองส่วนเป็นเท็จ"],trap:"T-02"},
          {v:["False — the conclusion is false","เท็จ เพราะผลเป็นเท็จ"],trap:"T-02"},
          {v:["It has no truth value","ไม่มีค่าความจริง"]}],unit:""};
  if(sf==="S-05") return {stem:["Which of these sentences is not a proposition?","ประโยคใดไม่เป็นประพจน์"],
    opts:[{v:["x + 1 = 5","x + 1 = 5"],ok:1},
          {v:["11 is a prime number","11 เป็นจำนวนเฉพาะ"]},
          {v:["2 + 2 = 5","2 + 2 = 5"]},
          {v:["Every rectangle has four sides","รูปสี่เหลี่ยมผืนผ้าทุกรูปมีสี่ด้าน"]}],unit:""};
  if(sf==="S-03") return {stem:["A teacher writes four sentences on the board: a question, an order, an open sentence in x, and a false equation. How many of the four are propositions?",
                                "ครูเขียนประโยคสี่ประโยคบนกระดาน ได้แก่ ประโยคคำถาม ประโยคคำสั่ง ประโยคเปิดที่ติดตัวแปร x และสมการที่เป็นเท็จ มีกี่ประโยคที่เป็นประพจน์"],
    opts:[{v:"1",ok:1},{v:"2"},{v:"3"},{v:"4"}],unit:""};
  var Q=pick([{s:["17 is a prime number","17 เป็นจำนวนเฉพาะ"],tv:1},
              {s:["6 is a multiple of 4","6 เป็นพหุคูณของ 4"],tv:0},
              {s:["Every integer is a rational number","จำนวนเต็มทุกจำนวนเป็นจำนวนตรรกยะ"],tv:1},
              {s:["√9 = −3","√9 = −3"],tv:0}]);
  return {stem:["What is the truth value of the proposition: "+Q.s[0],"ประพจน์ "+Q.s[1]+" มีค่าความจริงเป็นอย่างไร"],
    opts:[{v:Q.tv?["True","จริง"]:["False","เท็จ"],ok:1},
          {v:Q.tv?["False","เท็จ"]:["True","จริง"]},
          {v:["Neither — it is an open sentence","ไม่ใช่ทั้งสอง เพราะเป็นประโยคเปิด"]},
          {v:["True and false at the same time","จริงและเท็จพร้อมกัน"]}],unit:""};
},
"M-02": function(sf){
  var mkfig=function(sym){
    var R=[["T","T"],["T","F"],["F","T"],["F","F"]], s='<svg viewBox="0 0 300 178">';
    s+='<rect x="18" y="12" width="264" height="152" fill="none" stroke="var(--rule)" stroke-width="1.2"/>';
    s+='<line x1="18" y1="46" x2="282" y2="46" stroke="var(--ink)" stroke-width="1.4"/>';
    s+='<line x1="106" y1="12" x2="106" y2="164" stroke="var(--rule)" stroke-width="1"/>';
    s+='<line x1="194" y1="12" x2="194" y2="164" stroke="var(--ink)" stroke-width="1.4"/>';
    s+='<text x="62" y="35" text-anchor="middle" font-family="IBM Plex Sans" font-size="14" fill="var(--ink)">p</text>';
    s+='<text x="150" y="35" text-anchor="middle" font-family="IBM Plex Sans" font-size="14" fill="var(--ink)">q</text>';
    s+='<text x="238" y="35" text-anchor="middle" font-family="IBM Plex Sans" font-size="14" fill="var(--ink)">p '+sym+' q</text>';
    for(var i=0;i<4;i++){
      var yy=46+i*29.5;
      s+='<text x="62" y="'+(yy+20)+'" text-anchor="middle" font-family="IBM Plex Sans" font-size="13" fill="var(--ink-soft)">'+R[i][0]+'</text>';
      s+='<text x="150" y="'+(yy+20)+'" text-anchor="middle" font-family="IBM Plex Sans" font-size="13" fill="var(--ink-soft)">'+R[i][1]+'</text>';
      s+='<text x="238" y="'+(yy+20)+'" text-anchor="middle" font-family="IBM Plex Sans" font-size="13" fill="var(--ink-faint)">?</text>';
    }
    return s+'</svg>';
  };
  if(sf==="S-02"){
    if(ri(0,1)===1) return {stem:["The last column of this table is F in exactly one row. Which row is it?",
                                  "คอลัมน์สุดท้ายของตารางนี้เป็นเท็จเพียงแถวเดียว คือแถวใด"],
      opts:[{v:["p = F , q = F","p = F , q = F"],ok:1},
            {v:["p = T , q = T","p = T , q = T"],trap:"T-04"},
            {v:["p = T , q = F","p = T , q = F"]},
            {v:["p = F , q = T","p = F , q = T"]}],unit:"",fig:mkfig("∨")};
    return {stem:["The last column of this table is F in exactly one row. Which row is it?",
                  "คอลัมน์สุดท้ายของตารางนี้เป็นเท็จเพียงแถวเดียว คือแถวใด"],
      opts:[{v:["p = T , q = F","p = T , q = F"],ok:1},
            {v:["p = F , q = T","p = F , q = T"],trap:"T-02"},
            {v:["p = F , q = F","p = F , q = F"],trap:"T-02"},
            {v:["p = T , q = T","p = T , q = T"]}],unit:"",fig:mkfig("→")};
  }
  if(sf==="S-03") return {stem:["Nok promises: I will buy a book or I will buy a pen. She comes home with both. Is her promise true?",
                                "นกสัญญาว่า ฉันจะซื้อหนังสือ หรือ ฉันจะซื้อปากกา แล้วเธอกลับบ้านพร้อมทั้งสองอย่าง คำสัญญาของเธอเป็นจริงหรือไม่"],
    opts:[{v:["True — or in logic allows both to happen","จริง เพราะ หรือ ในตรรกศาสตร์ยอมให้เกิดทั้งสองอย่างได้"],ok:1},
          {v:["False — or means exactly one of the two","เท็จ เพราะ หรือ หมายถึงอย่างใดอย่างหนึ่งเท่านั้น"],trap:"T-04"},
          {v:["False — she promised to buy nothing else","เท็จ เพราะเธอสัญญาว่าจะไม่ซื้ออย่างอื่น"]},
          {v:["The promise is not a proposition","คำสัญญานี้ไม่เป็นประพจน์"]}],unit:""};
  if(sf==="S-04") return {stem:["Which connective is false in exactly one row, namely when the first part is true and the second is false?",
                                "ตัวเชื่อมใดเป็นเท็จเพียงแถวเดียว คือแถวที่ส่วนหน้าเป็นจริงและส่วนหลังเป็นเท็จ"],
    opts:[{v:["→","→"],ok:1},
          {v:["∨","∨"],trap:"T-04"},
          {v:["∧","∧"]},
          {v:["↔","↔"]}],unit:""};
  if(sf==="S-05") return {stem:["p → q is false. What must p and q be?","p → q เป็นเท็จ ค่าของ p และ q ต้องเป็นอย่างไร"],
    opts:[{v:["p = T , q = F","p = T , q = F"],ok:1},
          {v:["p = F , q = T","p = F , q = T"],trap:"T-02"},
          {v:["p = F , q = F","p = F , q = F"],trap:"T-02"},
          {v:["p = T , q = T","p = T , q = T"]}],unit:""};
  var E=pick([{e:"p ∨ q",  n:3, w:2, t:"T-04"},
              {e:"p → q",  n:3, w:1, t:"T-02"},
              {e:"~p ∨ q", n:3, w:1, t:"T-02"},
              {e:"~(p → q)", n:1, w:3, t:"T-02"}]);
  var rest=shuffle([0,1,2,3,4].filter(function(k){ return k!==E.n && k!==E.w; }));
  var op=[{v:String(E.n),ok:1},{v:String(E.w),trap:E.t},{v:String(rest[0])},{v:String(rest[1])}];
  return {stem:["In how many of the four rows of the truth table is "+E.e+" true?",
                "ในตารางค่าความจริงสี่แถว ประพจน์ "+E.e+" เป็นจริงกี่แถว"],opts:op,unit:""};
},
"M-03": function(sf){
  if(sf==="S-04") return {stem:["Which statement is logically equivalent to p → q?","ข้อใดสมมูลกับ p → q"],
    opts:[{v:["~p ∨ q","~p ∨ q"],ok:1},
          {v:["q → p","q → p"],trap:"T-01"},
          {v:["p ∨ ~q","p ∨ ~q"]},
          {v:["~p ∧ q","~p ∧ q"]}],unit:""};
  if(sf==="S-05") return {stem:["Which of these is not equivalent to p → q?","ข้อใดไม่สมมูลกับ p → q"],
    opts:[{v:["q → p","q → p"],ok:1},
          {v:["~q → ~p","~q → ~p"],trap:"T-01"},
          {v:["~p ∨ q","~p ∨ q"]},
          {v:["~(p ∧ ~q)","~(p ∧ ~q)"]}],unit:""};
  if(sf==="S-03") return {stem:["If it rains, the match is cancelled. Which sentence says exactly the same thing?",
                                "ถ้าฝนตก แล้วการแข่งขันถูกยกเลิก ข้อความใดมีความหมายเหมือนกันทุกประการ"],
    opts:[{v:["It does not rain, or the match is cancelled","ฝนไม่ตก หรือ การแข่งขันถูกยกเลิก"],ok:1},
          {v:["If the match is cancelled, then it rained","ถ้าการแข่งขันถูกยกเลิก แล้วฝนตก"],trap:"T-01"},
          {v:["If it does not rain, the match is not cancelled","ถ้าฝนไม่ตก แล้วการแข่งขันไม่ถูกยกเลิก"],trap:"T-01"},
          {v:["It rains and the match is cancelled","ฝนตกและการแข่งขันถูกยกเลิก"]}],unit:""};
  if(sf==="S-02") return {stem:["In a four-row truth table the column for A reads T, F, T, T and the column for B also reads T, F, T, T. What follows?",
                                "ในตารางค่าความจริงสี่แถว คอลัมน์ของ A อ่านได้ T, F, T, T และคอลัมน์ของ B ก็อ่านได้ T, F, T, T เช่นกัน สรุปได้อย่างไร"],
    opts:[{v:["A ≡ B, and therefore A ↔ B is a tautology","A ≡ B ดังนั้น A ↔ B เป็นสัจนิรันดร์"],ok:1},
          {v:["A and B are both tautologies","A และ B เป็นสัจนิรันดร์ทั้งคู่"]},
          {v:["A ↔ B is a contradiction","A ↔ B เป็นข้อขัดแย้ง"]},
          {v:["Nothing — matching columns do not imply equivalence","สรุปไม่ได้ เพราะคอลัมน์ที่ตรงกันไม่ได้แปลว่าสมมูล"]}],unit:""};
  var E=pick([{q:"~(p ∨ q)", a:"~p ∧ ~q", w:["~p ∨ ~q","p ∧ q","~q → p"], t:""},
              {q:"~(p ∧ q)", a:"~p ∨ ~q", w:["~p ∧ ~q","p ∨ q","p → ~q"], t:""},
              {q:"~(p → q)", a:"p ∧ ~q",  w:["q → p","~p ∨ q","~p ∧ q"],  t:"T-01"},
              {q:"p ↔ q",    a:"(p → q) ∧ (q → p)", w:["(p → q) ∨ (q → p)","p → q","~p ∨ ~q"], t:""}]);
  var op=[{v:E.a,ok:1},{v:E.w[0]},{v:E.w[1]},{v:E.w[2]}];
  if(E.t) op[1].trap=E.t;
  return {stem:["Which statement is logically equivalent to "+E.q+" ?","ข้อใดสมมูลกับ "+E.q],opts:op,unit:""};
},
"M-04": function(sf){
  if(sf==="S-04") return {stem:["What is the contrapositive of p → q?","แย้งสลับที่ของ p → q คือข้อใด"],
    opts:[{v:["~q → ~p","~q → ~p"],ok:1},
          {v:["q → p","q → p"],trap:"T-01"},
          {v:["~p → ~q","~p → ~q"],trap:"T-01"},
          {v:["~q → p","~q → p"]}],unit:""};
  if(sf==="S-03") return {stem:["If a number is divisible by 6, then it is divisible by 3. What is the contrapositive?",
                                "ถ้าจำนวนหนึ่งหารด้วย 6 ลงตัว แล้วจำนวนนั้นหารด้วย 3 ลงตัว แย้งสลับที่คือข้อใด"],
    opts:[{v:["If a number is not divisible by 3, then it is not divisible by 6","ถ้าจำนวนหนึ่งหารด้วย 3 ไม่ลงตัว แล้วจำนวนนั้นหารด้วย 6 ไม่ลงตัว"],ok:1},
          {v:["If a number is divisible by 3, then it is divisible by 6","ถ้าจำนวนหนึ่งหารด้วย 3 ลงตัว แล้วจำนวนนั้นหารด้วย 6 ลงตัว"],trap:"T-01"},
          {v:["If a number is not divisible by 6, then it is not divisible by 3","ถ้าจำนวนหนึ่งหารด้วย 6 ไม่ลงตัว แล้วจำนวนนั้นหารด้วย 3 ไม่ลงตัว"],trap:"T-01"},
          {v:["A number is divisible by 6 and by 3","จำนวนหนึ่งหารด้วย 6 และ 3 ลงตัว"]}],unit:""};
  if(sf==="S-05") return {stem:["Of p → q, its converse, its inverse and its contrapositive, which pair always share a truth value with each other but not with p → q?",
                                "ในบรรดา p → q, ผกผัน, ตรงข้าม และแย้งสลับที่ คู่ใดมีค่าความจริงตรงกันเสมอแต่ไม่ตรงกับ p → q"],
    opts:[{v:["The converse and the inverse","ผกผันกับตรงข้าม"],ok:1},
          {v:["The original and the converse","ประพจน์เดิมกับผกผัน"],trap:"T-01"},
          {v:["The original and the inverse","ประพจน์เดิมกับตรงข้าม"],trap:"T-01"},
          {v:["All four always agree","ทั้งสี่ตรงกันเสมอ"],trap:"T-01"}],unit:""};
  if(sf==="S-02") return {stem:["The column of p → q reads T, F, T, T. Exactly one of its three relatives has the same column. Which one?",
                                "คอลัมน์ของ p → q อ่านได้ T, F, T, T และมีประพจน์ที่เกี่ยวข้องเพียงหนึ่งในสามตัวที่มีคอลัมน์เหมือนกัน คือข้อใด"],
    opts:[{v:["The contrapositive ~q → ~p","แย้งสลับที่ ~q → ~p"],ok:1},
          {v:["The converse q → p","ผกผัน q → p"],trap:"T-01"},
          {v:["The inverse ~p → ~q","ตรงข้าม ~p → ~q"],trap:"T-01"},
          {v:["None of the three","ไม่มีข้อใดเลย"]}],unit:""};
  var E=pick([{o:"p → q",  cp:"~q → ~p", cv:"q → p",  iv:"~p → ~q"},
              {o:"~p → q", cp:"~q → p",  cv:"q → ~p", iv:"p → ~q"},
              {o:"p → ~q", cp:"q → ~p",  cv:"~q → p", iv:"~p → q"}]);
  var W=pick([{k:"cp",n:["contrapositive","แย้งสลับที่"]},
              {k:"cv",n:["converse","ผกผัน"]},
              {k:"iv",n:["inverse","ตรงข้าม"]}]);
  var other=["cp","cv","iv"].filter(function(z){ return z!==W.k; });
  return {stem:["What is the "+W.n[0]+" of "+E.o+" ?","จงหา"+W.n[1]+"ของ "+E.o],
    opts:[{v:E[W.k],ok:1},{v:E[other[0]],trap:"T-01"},{v:E[other[1]],trap:"T-01"},{v:E.o}],unit:""};
},
"M-05": function(sf){
  if(sf==="S-04") return {stem:["How do you test whether an argument is valid without writing out the whole table?",
                                "จะตรวจสอบว่าการอ้างเหตุผลสมเหตุสมผลหรือไม่โดยไม่ต้องเขียนตารางทั้งหมด ทำอย่างไร"],
    opts:[{v:["Set every premise T and the conclusion F; if that forces a contradiction, the argument is valid","ให้เหตุทุกข้อเป็นจริงและผลเป็นเท็จ ถ้าบังคับให้เกิดข้อขัดแย้ง แสดงว่าสมเหตุสมผล"],ok:1},
          {v:["If any premise turns out to be false, the argument is invalid","ถ้าเหตุข้อใดกลายเป็นเท็จ การอ้างเหตุผลจะไม่สมเหตุสมผล"],trap:"T-02"},
          {v:["Show the conclusion is true in at least one row","แสดงว่าผลเป็นจริงอย่างน้อยหนึ่งแถว"]},
          {v:["Check that the premises are true in the real world","ตรวจว่าเหตุเป็นจริงในโลกความเป็นจริง"]}],unit:""};
  if(sf==="S-02") return {stem:["A compound statement's truth-table column comes out F in all four rows. What is it?",
                                "คอลัมน์ค่าความจริงของประพจน์เชิงประกอบหนึ่งเป็นเท็จทั้งสี่แถว ประพจน์นั้นคืออะไร"],
    opts:[{v:["A contradiction — the negation of a tautology","ข้อขัดแย้ง ซึ่งเป็นนิเสธของสัจนิรันดร์"],ok:1},
          {v:["A tautology","สัจนิรันดร์"]},
          {v:["An open sentence, not a proposition","ประโยคเปิด ไม่ใช่ประพจน์"]},
          {v:["A conditional whose hypothesis is false","ประพจน์เงื่อนไขที่เหตุเป็นเท็จ"],trap:"T-02"}],unit:""};
  if(sf==="S-03") return {stem:["If it rains, the ground is wet. The ground is wet. Therefore it rained. Is this argument valid?",
                                "ถ้าฝนตก แล้วพื้นเปียก พื้นเปียก ดังนั้นฝนตก การอ้างเหตุผลนี้สมเหตุสมผลหรือไม่"],
    opts:[{v:["No — rain is not the only way the ground gets wet, so the premises can be T with the conclusion F","ไม่ เพราะฝนไม่ใช่ทางเดียวที่ทำให้พื้นเปียก เหตุจึงเป็นจริงพร้อมกับผลเป็นเท็จได้"],ok:1},
          {v:["Yes — it just states the conditional the other way round","สมเหตุสมผล เพราะเป็นการกล่าวประพจน์เงื่อนไขกลับทางเท่านั้น"],trap:"T-01"},
          {v:["Yes — it is the contrapositive of the first premise","สมเหตุสมผล เพราะเป็นแย้งสลับที่ของเหตุข้อแรก"],trap:"T-01"},
          {v:["No — the first premise is false in the real world","ไม่ เพราะเหตุข้อแรกเป็นเท็จในโลกความเป็นจริง"]}],unit:""};
  if(sf==="S-05") return {stem:["An argument turned out to be invalid. What exactly must have been found?",
                                "การอ้างเหตุผลหนึ่งไม่สมเหตุสมผล สิ่งที่ต้องพบคืออะไรกันแน่"],
    opts:[{v:["At least one assignment making every premise T and the conclusion F","การกำหนดค่าอย่างน้อยหนึ่งแบบที่ทำให้เหตุทุกข้อเป็นจริงและผลเป็นเท็จ"],ok:1},
          {v:["At least one assignment making every premise F","การกำหนดค่าอย่างน้อยหนึ่งแบบที่ทำให้เหตุทุกข้อเป็นเท็จ"],trap:"T-02"},
          {v:["A row in which the conclusion is false","แถวที่ผลเป็นเท็จ"],trap:"T-02"},
          {v:["Two premises that contradict each other","เหตุสองข้อที่ขัดแย้งกันเอง"]}],unit:""};
  var F=pick([{e:"[(p → q) ∧ p] → q",   taut:1},
              {e:"[(p → q) ∧ ~q] → ~p", taut:1},
              {e:"[(p → q) ∧ q] → p",   taut:0}]);
  if(F.taut) return {stem:["Is "+F.e+" a tautology?","ประพจน์ "+F.e+" เป็นสัจนิรันดร์หรือไม่"],
    opts:[{v:["Yes — assuming it false forces a contradiction in the premises","ใช่ เพราะการสมมติให้เป็นเท็จบังคับให้เหตุเกิดข้อขัดแย้ง"],ok:1},
          {v:["No — it fails whenever p is false","ไม่ใช่ เพราะเป็นเท็จเมื่อใดก็ตามที่ p เป็นเท็จ"],trap:"T-02"},
          {v:["No — it is a contradiction","ไม่ใช่ เพราะเป็นข้อขัดแย้ง"]},
          {v:["Only in two of the four rows","จริงเพียงสองในสี่แถว"]}],unit:""};
  return {stem:["Is "+F.e+" a tautology?","ประพจน์ "+F.e+" เป็นสัจนิรันดร์หรือไม่"],
    opts:[{v:["No — p = F with q = T makes every premise T and the conclusion F","ไม่ใช่ เพราะ p = F และ q = T ทำให้เหตุทุกข้อเป็นจริงและผลเป็นเท็จ"],ok:1},
          {v:["Yes — it is the converse of a valid form, so it is valid too","ใช่ เพราะเป็นผกผันของรูปที่สมเหตุสมผล จึงสมเหตุสมผลด้วย"],trap:"T-01"},
          {v:["Yes — any conditional built from its own premises is a tautology","ใช่ เพราะประพจน์เงื่อนไขที่สร้างจากเหตุของตัวเองเป็นสัจนิรันดร์เสมอ"],trap:"T-02"},
          {v:["It is a contradiction","เป็นข้อขัดแย้ง"]}],unit:""};
},
"M-06": function(sf){
  if(sf==="S-04") return {stem:["What is the negation of ∀x[P(x)]?","นิเสธของ ∀x[P(x)] คือข้อใด"],
    opts:[{v:["∃x[~P(x)]","∃x[~P(x)]"],ok:1},
          {v:["∀x[~P(x)]","∀x[~P(x)]"],trap:"T-03"},
          {v:["∃x[P(x)]","∃x[P(x)]"],trap:"T-03"},
          {v:["∀x[P(x)] itself","∀x[P(x)] ตัวมันเอง"]}],unit:""};
  if(sf==="S-03") return {stem:["Every student in the room passed the exam. What is the negation of this statement?",
                                "นักเรียนทุกคนในห้องสอบผ่าน นิเสธของข้อความนี้คือข้อใด"],
    opts:[{v:["At least one student in the room did not pass","มีนักเรียนในห้องอย่างน้อยหนึ่งคนที่สอบไม่ผ่าน"],ok:1},
          {v:["No student in the room passed","ไม่มีนักเรียนในห้องคนใดสอบผ่าน"],trap:"T-03"},
          {v:["Every student in the room did not pass","นักเรียนทุกคนในห้องสอบไม่ผ่าน"],trap:"T-03"},
          {v:["Some student in the room passed","มีนักเรียนบางคนในห้องสอบผ่าน"]}],unit:""};
  if(sf==="S-05") return {stem:["The negation of a statement is ∀x[x² ≠ 9]. What was the original statement?",
                                "นิเสธของประพจน์หนึ่งคือ ∀x[x² ≠ 9] ประพจน์เดิมคือข้อใด"],
    opts:[{v:["∃x[x² = 9]","∃x[x² = 9]"],ok:1},
          {v:["∀x[x² = 9]","∀x[x² = 9]"],trap:"T-03"},
          {v:["∃x[x² ≠ 9]","∃x[x² ≠ 9]"],trap:"T-03"},
          {v:["∀x[x² ≥ 9]","∀x[x² ≥ 9]"]}],unit:""};
  if(sf==="S-02") return {stem:["Let x range over children and y over kinds of pet. Which form says: every child owns at least one kind of pet?",
                                "ให้ x แทนเด็ก และ y แทนชนิดของสัตว์เลี้ยง รูปแบบใดหมายถึง เด็กทุกคนเลี้ยงสัตว์เลี้ยงบางชนิด"],
    opts:[{v:["∀x∃y","∀x∃y"],ok:1},
          {v:["∃x∀y","∃x∀y"]},
          {v:["∀x∀y","∀x∀y"]},
          {v:["∃x∃y","∃x∃y"]}],unit:""};
  var V=pick([{a:["∃x[x² = 2]","∃x[x² = 2]"], w:[["∀x[x² > 0]","∀x[x² > 0]"],["∀x[x = x²]","∀x[x = x²]"],["∃x[x² + 1 = 0]","∃x[x² + 1 = 0]"]]},
              {a:["∀x[x² ≥ 0]","∀x[x² ≥ 0]"], w:[["∃x[x² < 0]","∃x[x² < 0]"],["∀x[x > 0]","∀x[x > 0]"],["∀x[2x ≠ x]","∀x[2x ≠ x]"]]}]);
  return {stem:["Over the universe of real numbers, which statement is true?","บนเอกภพสัมพัทธ์ที่เป็นจำนวนจริง ข้อใดเป็นจริง"],
    opts:[{v:V.a,ok:1},{v:V.w[0]},{v:V.w[1]},{v:V.w[2]}],unit:""};
}
}
};
