var CHAPTER = {
id:"ma06", num:"06", slug:"matrices", subject:"math",
kicker:["Mathematics · Chapter 06","คณิตศาสตร์ · บทที่ 6"],
title:["Matrices","เมทริกซ์"],
mapTitle:["Arithmetic with its own rules","เลขคณิตที่มีกฎของตัวเอง"],
lede:["A matrix looks like a table of numbers, but it behaves like a single object with its own arithmetic — one where multiplication does not commute and division does not exist. Most mistakes in this chapter come from assuming otherwise.",
      "เมทริกซ์ดูเหมือนตารางตัวเลข แต่มันทำตัวเป็นวัตถุชิ้นเดียวที่มีเลขคณิตของตัวเอง เป็นเลขคณิตที่การคูณสลับที่ไม่ได้และไม่มีการหาร ข้อผิดพลาดส่วนใหญ่ในบทนี้เกิดจากการเผลอคิดว่ามันเหมือนจำนวนธรรมดา"],
next:["→ continues in Chapter 07 · Exponentials and Logs","→ ต่อในบทที่ 7 · เอกซ์โพเนนเชียลและลอการิทึม"],

nodes:[
{ id:"basics", x:235, y:52, requires:[], methods:["M-01"],
  title:["Dimensions and addition","มิติและการบวก"],
  body:[["A matrix is described m × n, rows first then columns. Addition, subtraction and scalar multiplication all work entry by entry, and all of them require the matrices to have identical dimensions — there is no way to add a 2×3 to a 3×2.",
         "The transpose Aᵗ swaps rows and columns, turning an m × n into an n × m. It obeys (A + B)ᵗ = Aᵗ + Bᵗ and, importantly, (AB)ᵗ = BᵗAᵗ with the order reversed — the same reversal that will reappear for inverses."],
        ["เมทริกซ์ระบุขนาดเป็น m × n โดยบอกแถวก่อนแล้วจึงบอกหลัก การบวก การลบ และการคูณด้วยสเกลาร์ ทำทีละสมาชิกตรงตำแหน่งกัน และทั้งหมดต้องการให้เมทริกซ์มีมิติเท่ากันพอดี ไม่มีทางบวก 2×3 กับ 3×2 ได้",
         "ทรานสโพส Aᵗ สลับแถวกับหลัก เปลี่ยน m × n เป็น n × m มันเป็นไปตาม (A + B)ᵗ = Aᵗ + Bᵗ และที่สำคัญคือ (AB)ᵗ = BᵗAᵗ ซึ่งกลับลำดับ เป็นการกลับลำดับแบบเดียวกับที่จะปรากฏอีกครั้งในเรื่องอินเวอร์ส"]],
  formula:["A ± B needs equal dimensions        (AB)ᵗ = BᵗAᵗ","A ± B ต้องมิติเท่ากัน        (AB)ᵗ = BᵗAᵗ"],
  flabel:["Entry by entry, same size only","ทีละสมาชิก ขนาดเท่ากันเท่านั้น"],
  viz:"grid",
  vizcfg:{
    title:["WHEN TWO MATRICES MAY BE ADDED","เมื่อใดจึงบวกเมทริกซ์สองตัวได้"],
    cols:[["Matrix A","เมทริกซ์ A"],["Matrix B","เมทริกซ์ B"],["A + B allowed?","บวกได้ไหม"],["Result","ผลลัพธ์"]],
    ctrls:[
      {k:"r1", lab:["Rows of A","แถวของ A"], min:1, max:4, step:1, def:2, unit:""},
      {k:"c1", lab:["Columns of A","คอลัมน์ของ A"], min:1, max:4, step:1, def:3, unit:""},
      {k:"r2", lab:["Rows of B","แถวของ B"], min:1, max:4, step:1, def:2, unit:""},
      {k:"c2", lab:["Columns of B","คอลัมน์ของ B"], min:1, max:4, step:1, def:3, unit:""}
    ],
    readouts:[
      {lab:["Order of A","มิติของ A"], f:function(S){ return S.p.r1+" × "+S.p.c1; }},
      {lab:["Order of B","มิติของ B"], f:function(S){ return S.p.r2+" × "+S.p.c2; }},
      {lab:["Can they be added?","บวกกันได้ไหม"], f:function(S){
        var ok=S.p.r1===S.p.r2 && S.p.c1===S.p.c2;
        return ok ? (L()?"ได้ — มิติตรงกันทุกประการ":"yes — the orders match exactly")
                  : (L()?"ไม่ได้ — มิติต้องเหมือนกันเป๊ะ":"no — the orders must be identical"); }},
      {lab:["How addition works","การบวกทำอย่างไร"], f:function(){
        return L()?"บวกทีละตำแหน่งที่ตรงกัน":"entry by matching entry"; }}
    ],
    rows:function(p){
      var ok = p.r1===p.r2 && p.c1===p.c2;
      return [[{v:p.r1+" × "+p.c1, on:true, col:"accent"},
               {v:p.r2+" × "+p.c2, on:true, col:"good"},
               {v:ok?"✓":"✗", on:true, col:ok?"good":"warn"},
               {v:ok?(p.r1+" × "+p.c1):(L()?"ไม่นิยาม":"undefined"), on:true, col:ok?"ink":"warn"}]];
    },
    note:["addition demands identical orders — unlike multiplication, which only needs a shared inner size","การบวกต้องมีมิติเหมือนกันเป๊ะ ต่างจากการคูณที่ต้องการเพียงขนาดด้านในตรงกัน"]
  } },

{ id:"multiplication", x:100, y:150, requires:["basics"], methods:["M-02"],
  title:["Multiplication","การคูณ"],
  body:[["To multiply A by B the inner dimensions must agree: an m × p times a p × n gives an m × n. The entry in row i, column j is the row i of A paired term by term with column j of B and summed.",
         "Matrix multiplication is not commutative. AB and BA are usually different, and often only one of them is even defined. Assuming AB = BA is trap T-01 and it invalidates every step that follows it."],
        ["การคูณ A กับ B ต้องให้มิติด้านในตรงกัน เมทริกซ์ m × p คูณ p × n ได้ผลลัพธ์ m × n สมาชิกในแถวที่ i หลักที่ j คือแถวที่ i ของ A จับคู่ทีละพจน์กับหลักที่ j ของ B แล้วบวกกัน",
         "การคูณเมทริกซ์สลับที่ไม่ได้ AB กับ BA มักไม่เท่ากัน และบ่อยครั้งมีเพียงตัวเดียวที่นิยามได้ด้วยซ้ำ การสมมติว่า AB = BA คือกับดัก T-01 และมันทำให้ทุกขั้นตอนหลังจากนั้นใช้ไม่ได้"]],
  formula:["(m×p)(p×n) = m×n        AB ≠ BA in general","(m×p)(p×n) = m×n        โดยทั่วไป AB ≠ BA"],
  flabel:["Inner dimensions must match","มิติด้านในต้องตรงกัน"],
  viz:"grid",
  vizcfg:{
    title:["THE INNER DIMENSIONS MUST MATCH","มิติด้านในต้องตรงกัน"],
    cols:[["A","A"],["B","B"],["Inner sizes","ขนาดด้านใน"],["AB","AB"],["BA","BA"]],
    ctrls:[
      {k:"r1", lab:["Rows of A","แถวของ A"], min:1, max:4, step:1, def:2, unit:""},
      {k:"c1", lab:["Columns of A","คอลัมน์ของ A"], min:1, max:4, step:1, def:3, unit:""},
      {k:"c2", lab:["Columns of B","คอลัมน์ของ B"], min:1, max:4, step:1, def:2, unit:""}
    ],
    readouts:[
      {lab:["A × B","A × B"], f:function(S){ return S.p.r1+" × "+S.p.c2; }},
      {lab:["B × A","B × A"], f:function(S){
        return S.p.c2===S.p.r1 ? (S.p.c1+" × "+S.p.c1) : (L()?"ไม่นิยาม":"undefined"); }},
      {lab:["Is AB = BA?","AB เท่ากับ BA ไหม"], f:function(S){
        return S.p.c2===S.p.r1 && S.p.r1===S.p.c1
          ? (L()?"มิติเท่ากัน แต่ค่ามักต่างกันอยู่ดี":"same order, but usually still different")
          : (L()?"ไม่ — คนละมิติหรือทำไม่ได้เลย":"no — different orders, or not even defined"); }},
      {lab:["The rule","กฎ"], f:function(){
        return L()?"(m × n)(n × p) = m × p":"(m × n)(n × p) = m × p"; }}
    ],
    rows:function(p){
      var ba = (p.c2===p.r1);
      return [[{v:p.r1+" × "+p.c1, on:true, col:"accent"},
               {v:p.c1+" × "+p.c2, on:true, col:"good"},
               {v:p.c1+" = "+p.c1+" ✓", on:true, col:"good"},
               {v:p.r1+" × "+p.c2, on:true, col:"ink"},
               {v:ba?(p.c1+" × "+p.c1):(L()?"ไม่นิยาม":"undefined"), on:true, col:ba?"ink":"warn"}]];
    },
    note:["AB can exist while BA does not — matrix multiplication is not commutative","AB อาจมีอยู่ขณะที่ BA ไม่มี การคูณเมทริกซ์ไม่มีสมบัติสลับที่"]
  } },

{ id:"determinant", x:370, y:150, requires:["basics"], methods:["M-03"],
  title:["The determinant","ดีเทอร์มิแนนต์"],
  body:[["For a 2×2 the determinant is ad − bc; for larger square matrices you expand along a row or column using cofactors, choosing whichever line has the most zeros. Only square matrices have one at all.",
         "Geometrically the 2×2 determinant is the signed area of the parallelogram spanned by the two columns. Drive the lab until that area collapses to nothing: the columns have become parallel, the determinant is zero, and the matrix is singular — which is precisely why it cannot be inverted."],
        ["สำหรับ 2×2 ดีเทอร์มิแนนต์คือ ad − bc สำหรับเมทริกซ์จัตุรัสที่ใหญ่กว่าให้กระจายตามแถวหรือหลักด้วยโคแฟกเตอร์ โดยเลือกแนวที่มีศูนย์มากที่สุด มีเพียงเมทริกซ์จัตุรัสเท่านั้นที่มีดีเทอร์มิแนนต์",
         "ในเชิงเรขาคณิต ดีเทอร์มิแนนต์ของ 2×2 คือพื้นที่มีเครื่องหมายของสี่เหลี่ยมด้านขนานที่สร้างจากสองหลัก ลองปรับในห้องทดลองจนพื้นที่ยุบเป็นศูนย์ หลักทั้งสองจะขนานกัน ดีเทอร์มิแนนต์เป็นศูนย์ และเมทริกซ์เป็นเอกฐาน ซึ่งเป็นเหตุผลว่าทำไมจึงหาอินเวอร์สไม่ได้"]],
  formula:["det = ad − bc        det(AB) = det(A)·det(B)","det = ad − bc        det(AB) = det(A)·det(B)"],
  flabel:["Zero determinant means singular","ดีเทอร์มิแนนต์ศูนย์คือเอกฐาน"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"a", lab:["a  (col 1, x)","a  (หลัก 1, x)"], min:-6, max:6, step:1, def:3, unit:""},
      {k:"c", lab:["c  (col 1, y)","c  (หลัก 1, y)"], min:-6, max:6, step:1, def:1, unit:""},
      {k:"b", lab:["b  (col 2, x)","b  (หลัก 2, x)"], min:-6, max:6, step:1, def:1, unit:""},
      {k:"d", lab:["d  (col 2, y)","d  (หลัก 2, y)"], min:-6, max:6, step:1, def:4, unit:""}
    ],
    readouts:[
      {lab:["det = ad − bc","det = ad − bc"], f:function(S){
        return fmt(S.p.a*S.p.d - S.p.b*S.p.c); }},
      {lab:["Area","พื้นที่"], f:function(S){
        return fmt(Math.abs(S.p.a*S.p.d - S.p.b*S.p.c))+" sq units"; }},
      {lab:["Invertible","หาอินเวอร์สได้"], f:function(S){
        var d=S.p.a*S.p.d-S.p.b*S.p.c;
        return Math.abs(d)<1e-9 ? (L()?"ไม่ได้ · เอกฐาน":"no · singular") : (L()?"ได้":"yes"); }}
    ],
    draw:function(S,o){
      var p=S.p, det=p.a*p.d-p.b*p.c;
      var A=axes(o,{x:58,y:44,w:462,h:212,xmin:-8,xmax:8,ymin:-8,ymax:8,
                    title:["THE COLUMNS AS VECTORS","คอลัมน์ในฐานะเวกเตอร์"],xlab:"x",ylab:"y"});
      var O=[A.X(0),A.Y(0)];
      var v1=[A.X(p.a),A.Y(p.c)], v2=[A.X(p.b),A.Y(p.d)];
      var v3=[A.X(p.a+p.b),A.Y(p.c+p.d)];
      /* the parallelogram the two columns span — its area IS |det| */
      o.push('<path d="M'+O[0]+' '+O[1]+' L'+v1[0]+' '+v1[1]+' L'+v3[0]+' '+v3[1]+' L'+v2[0]+' '+v2[1]+' Z" '+
             'fill="var(--accent)" fill-opacity="'+(Math.abs(det)<1e-9?0.05:0.18)+'" stroke="var(--accent)" stroke-width="1.2"/>');
      function arrow(x2,y2,col,lab){
        var ang=Math.atan2(y2-O[1],x2-O[0]), h=9;
        o.push('<line x1="'+O[0]+'" y1="'+O[1]+'" x2="'+x2+'" y2="'+y2+'" stroke="'+col+'" stroke-width="2.4"/>');
        if(Math.abs(x2-O[0])+Math.abs(y2-O[1])>4)
          o.push('<path d="M'+x2+' '+y2+' L'+(x2-h*Math.cos(ang-.4))+' '+(y2-h*Math.sin(ang-.4))+
                 ' L'+(x2-h*Math.cos(ang+.4))+' '+(y2-h*Math.sin(ang+.4))+' Z" fill="'+col+'"/>');
        o.push('<text x="'+(x2+8)+'" y="'+(y2-6)+'" fill="'+col+'" font-family="IBM Plex Sans" font-size="11" font-weight="600">'+lab+'</text>');
      }
      arrow(v1[0],v1[1],"var(--ink)","col 1");
      arrow(v2[0],v2[1],"var(--ink-soft)","col 2");
      /* the matrix written out, and the verdict */
      o.push('<text x="58" y="292" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["MATRIX","เมทริกซ์"])+'</text>');
      o.push('<text x="58" y="312" fill="var(--ink)" font-family="Bodoni Moda" font-size="17">[ '+p.a+'  '+p.b+' ;  '+p.c+'  '+p.d+' ]</text>');
      var msg = Math.abs(det)<1e-9
        ? tx(["det = 0 — the columns are parallel, the area collapsed, no inverse exists",
              "det = 0 — คอลัมน์ขนานกัน พื้นที่ยุบเป็นศูนย์ จึงไม่มีเมทริกซ์ผกผัน"])
        : tx(["det = "+fmt(det)+" — the shaded area, signed",
              "det = "+fmt(det)+" — พื้นที่แรเงา คิดเครื่องหมายด้วย"]);
      o.push('<text x="300" y="312" fill="'+(Math.abs(det)<1e-9?"var(--warn)":"var(--ink-faint)")+
             '" font-family="IBM Plex Sans" font-size="10.5">'+msg+'</text>');
    }
  },
  guide:[
    {say:["The two columns of the matrix, drawn as vectors from the origin. The shaded parallelogram is what they span.",
          "สองหลักของเมทริกซ์ วาดเป็นเวกเตอร์จากจุดกำเนิด สี่เหลี่ยมด้านขนานที่แรเงาคือสิ่งที่ทั้งสองสร้างขึ้น"], set:{a:3,c:1,b:1,d:4}},
    {say:["Read the determinant and the area. They are the same number — the sign only records the orientation.",
          "อ่านค่าดีเทอร์มิแนนต์กับพื้นที่ ทั้งสองคือตัวเลขเดียวกัน เครื่องหมายเพียงบันทึกทิศการวน"], set:{a:4,c:0,b:0,d:3}},
    {say:["Now make column 2 a multiple of column 1. The parallelogram flattens to a line and the area vanishes.",
          "ทีนี้ทำให้หลัก 2 เป็นจำนวนเท่าของหลัก 1 สี่เหลี่ยมด้านขนานแบนเป็นเส้น และพื้นที่หายไป"], set:{a:2,c:1,b:4,d:2}},
    {say:["det = 0. There is no inverse, because the matrix has squashed the plane onto a line and nothing can undo that.",
          "det = 0 ไม่มีอินเวอร์ส เพราะเมทริกซ์บีบระนาบลงเป็นเส้น และไม่มีอะไรย้อนกลับได้"], set:{a:2,c:1,b:4,d:2}}
  ]},

{ id:"inverse", x:235, y:248, requires:["multiplication","determinant"], methods:["M-04"],
  title:["The inverse","อินเวอร์ส"],
  body:[["A⁻¹ is the matrix satisfying AA⁻¹ = I. For a 2×2 it is the swap-and-negate pattern divided by the determinant, which makes the requirement obvious: divide by zero and nothing exists. A singular matrix has no inverse, full stop.",
         "For larger matrices A⁻¹ = adj(A)/det(A). The property that catches people is (AB)⁻¹ = B⁻¹A⁻¹ — the order reverses, exactly as it did for transposes. Writing A⁻¹B⁻¹ is trap T-02."],
        ["A⁻¹ คือเมทริกซ์ที่ทำให้ AA⁻¹ = I สำหรับ 2×2 มันคือรูปแบบสลับและใส่เครื่องหมายลบ แล้วหารด้วยดีเทอร์มิแนนต์ ซึ่งทำให้เงื่อนไขชัดเจน หารด้วยศูนย์แล้วไม่มีอะไรเหลือ เมทริกซ์เอกฐานไม่มีอินเวอร์ส จบ",
         "สำหรับเมทริกซ์ที่ใหญ่กว่า A⁻¹ = adj(A)/det(A) สมบัติที่ดักคนคือ (AB)⁻¹ = B⁻¹A⁻¹ ลำดับกลับด้าน เหมือนกับที่เกิดกับทรานสโพส การเขียน A⁻¹B⁻¹ คือกับดัก T-02"]],
  formula:["A⁻¹ = adj(A) / det(A)        (AB)⁻¹ = B⁻¹A⁻¹","A⁻¹ = adj(A) / det(A)        (AB)⁻¹ = B⁻¹A⁻¹"],
  flabel:["Order reverses, as with transposes","ลำดับกลับด้าน เหมือนทรานสโพส"],
  viz:"bars",
  vizcfg:{
    title:["THE DETERMINANT DECIDES EVERYTHING","ดีเทอร์มิแนนต์ตัดสินทุกอย่าง"],
    ylab:["value","ค่า"],
    ctrls:[
      {k:"a", lab:["a","a"], min:-6, max:6, step:1, def:3, unit:""},
      {k:"b", lab:["b","b"], min:-6, max:6, step:1, def:1, unit:""},
      {k:"c", lab:["c","c"], min:-6, max:6, step:1, def:2, unit:""},
      {k:"d", lab:["d","d"], min:-6, max:6, step:1, def:4, unit:""}
    ],
    readouts:[
      {lab:["Determinant ad − bc","ดีเทอร์มิแนนต์ ad − bc"], f:function(S){
        return fmt2(S.p.a*S.p.d-S.p.b*S.p.c); }},
      {lab:["Does an inverse exist?","มีตัวผกผันไหม"], f:function(S){
        var D=S.p.a*S.p.d-S.p.b*S.p.c;
        return Math.abs(D)<1e-9 ? (L()?"ไม่มี — เมทริกซ์เอกฐาน":"no — the matrix is singular")
                                : (L()?"มี":"yes"); }},
      {lab:["Area scale factor","ตัวคูณพื้นที่"], f:function(S){
        return fmt2(Math.abs(S.p.a*S.p.d-S.p.b*S.p.c))+" ×"; }},
      {lab:["Determinant zero means","ดีเทอร์มิแนนต์เป็นศูนย์แปลว่า"], f:function(){
        return L()?"พื้นที่ยุบเป็นศูนย์ — ย้อนกลับไม่ได้":"area collapses to nothing — you cannot undo it"; }}
    ],
    bars:[
      {lab:["ad","ad"], f:function(p){ return p.a*p.d; }, col:"good"},
      {lab:["bc","bc"], f:function(p){ return p.b*p.c; }, col:"warn"},
      {lab:["det = ad − bc","det = ad − bc"], f:function(p){ return p.a*p.d-p.b*p.c; }, col:"accent"}
    ],
    note:["make the first two bars equal and the determinant bar vanishes — no inverse exists there","ทำให้สองแถบแรกเท่ากัน แถบดีเทอร์มิแนนต์จะหายไป และตรงนั้นไม่มีตัวผกผัน"]
  },
  guide:[
    {say:["A healthy determinant. The inverse exists and the transformation can be undone.",
          "ดีเทอร์มิแนนต์ปกติ ตัวผกผันมีอยู่และการแปลงย้อนกลับได้"], set:{a:3,b:1,c:2,d:4}},
    {say:["Now tune the entries so ad equals bc. The determinant bar collapses to nothing.",
          "ทีนี้ปรับค่าให้ ad เท่ากับ bc แถบดีเทอร์มิแนนต์ยุบเป็นศูนย์"], set:{a:2,b:1,c:4,d:2}},
    {say:["A zero determinant means the matrix squashes the plane flat. Nothing can unflatten it.",
          "ดีเทอร์มิแนนต์เป็นศูนย์แปลว่าเมทริกซ์บีบระนาบให้แบน ไม่มีอะไรคลี่มันกลับได้"], set:{a:2,b:1,c:4,d:2}}
  ] },

{ id:"systems", x:235, y:346, requires:["inverse"], methods:["M-05","M-06"],
  title:["Solving systems","การแก้ระบบสมการ"],
  body:[["Write the system as AX = B, where A holds the coefficients, X the unknowns and B the constants. Then X = A⁻¹B, provided A is invertible.",
         "Cramer's rule gives each unknown directly as a ratio of determinants: replace the relevant column of A with B and divide by det(A). Either way, det(A) = 0 means the system has no unique solution — either none at all, or infinitely many."],
        ["เขียนระบบเป็น AX = B โดย A เก็บสัมประสิทธิ์ X เก็บตัวไม่รู้ค่า และ B เก็บค่าคงที่ จากนั้น X = A⁻¹B โดยมีเงื่อนไขว่า A ต้องหาอินเวอร์สได้",
         "กฎของคราเมอร์ให้ตัวไม่รู้ค่าแต่ละตัวโดยตรงในรูปอัตราส่วนของดีเทอร์มิแนนต์ ให้แทนหลักที่เกี่ยวข้องของ A ด้วย B แล้วหารด้วย det(A) ไม่ว่าจะทางใด det(A) = 0 หมายความว่าระบบไม่มีคำตอบเดียว คือไม่มีคำตอบเลยหรือมีคำตอบมากมายไม่จำกัด"]],
  formula:["AX = B  ⟹  X = A⁻¹B        xᵢ = det(Aᵢ) / det(A)","AX = B  ⟹  X = A⁻¹B        xᵢ = det(Aᵢ) / det(A)"],
  flabel:["det = 0 means no unique solution","det = 0 คือไม่มีคำตอบเดียว"],
  viz:"bars",
  vizcfg:{
    title:["ONE ANSWER, NONE, OR INFINITELY MANY","คำตอบเดียว ไม่มี หรือมีอนันต์"],
    ylab:["value","ค่า"],
    ctrls:[
      {k:"a", lab:["a  (ax + by = e)","a  (ax + by = e)"], min:-6, max:6, step:1, def:2, unit:""},
      {k:"b", lab:["b","b"], min:-6, max:6, step:1, def:3, unit:""},
      {k:"c", lab:["c  (cx + dy = f)","c  (cx + dy = f)"], min:-6, max:6, step:1, def:4, unit:""},
      {k:"d", lab:["d","d"], min:-6, max:6, step:1, def:1, unit:""}
    ],
    readouts:[
      {lab:["Determinant","ดีเทอร์มิแนนต์"], f:function(S){ return fmt2(S.p.a*S.p.d-S.p.b*S.p.c); }},
      {lab:["Number of solutions","จำนวนคำตอบ"], f:function(S){
        var D=S.p.a*S.p.d-S.p.b*S.p.c;
        return Math.abs(D)>1e-9 ? (L()?"หนึ่งคำตอบพอดี":"exactly one")
                                : (L()?"ไม่มีเลย หรือมีอนันต์":"none, or infinitely many"); }},
      {lab:["Geometrically","ในเชิงเรขาคณิต"], f:function(S){
        var D=S.p.a*S.p.d-S.p.b*S.p.c;
        return Math.abs(D)>1e-9 ? (L()?"เส้นสองเส้นตัดกันที่จุดเดียว":"two lines crossing at one point")
                                : (L()?"เส้นขนานกัน หรือทับกันสนิท":"parallel lines, or the very same line"); }},
      {lab:["Which method to use","ใช้วิธีใด"], f:function(S){
        var D=S.p.a*S.p.d-S.p.b*S.p.c;
        return Math.abs(D)>1e-9 ? (L()?"เมทริกซ์ผกผัน หรือกฎของคราเมอร์":"the inverse matrix, or Cramer's rule")
                                : (L()?"ทั้งสองวิธีใช้ไม่ได้":"neither method works"); }}
    ],
    bars:[
      {lab:["Slope of line 1","ความชันเส้นที่ 1"], f:function(p){ return Math.abs(p.b)<1e-9?0:-p.a/p.b; }, col:"accent"},
      {lab:["Slope of line 2","ความชันเส้นที่ 2"], f:function(p){ return Math.abs(p.d)<1e-9?0:-p.c/p.d; }, col:"good"},
      {lab:["Determinant","ดีเทอร์มิแนนต์"], f:function(p){ return p.a*p.d-p.b*p.c; }, col:"warn"}
    ],
    note:["equal slopes mean parallel lines, and a determinant of zero says exactly that","ความชันเท่ากันแปลว่าเส้นขนาน และดีเทอร์มิแนนต์ที่เป็นศูนย์บอกอย่างนั้นพอดี"]
  } }
],

methods:[
{id:"M-01", name:["Dimensions, addition and transpose","มิติ การบวก และทรานสโพส"]},
{id:"M-02", name:["Multiply matrices","คูณเมทริกซ์"]},
{id:"M-03", name:["Evaluate a determinant","หาดีเทอร์มิแนนต์"]},
{id:"M-04", name:["Find an inverse","หาอินเวอร์ส"]},
{id:"M-05", name:["Solve AX = B","แก้ AX = B"]},
{id:"M-06", name:["Apply Cramer's rule","ใช้กฎของคราเมอร์"]}
],

traps:{
"T-01":["Matrix multiplication does not commute. AB and BA are generally different.","การคูณเมทริกซ์สลับที่ไม่ได้ AB กับ BA โดยทั่วไปไม่เท่ากัน"],
"T-02":["The order reverses: (AB)⁻¹ = B⁻¹A⁻¹, not A⁻¹B⁻¹.","ลำดับกลับด้าน (AB)⁻¹ = B⁻¹A⁻¹ ไม่ใช่ A⁻¹B⁻¹"],
"T-03":["A matrix with zero determinant is singular and has no inverse at all.","เมทริกซ์ที่ดีเทอร์มิแนนต์เป็นศูนย์เป็นเอกฐาน และไม่มีอินเวอร์สเลย"],
"T-04":["det(A + B) is not det A + det B. The determinant does not distribute over addition.","det(A + B) ไม่เท่ากับ det A + det B ดีเทอร์มิแนนต์ไม่กระจายบนการบวก"]
},

gen:{
"M-01": function(sf){
  var m=pick([2,3]), p=pick([3,4]), n=pick([2,5]);
  if(sf==="S-04") return {stem:["A matrix is 3 × 5. What are the dimensions of its transpose?",
                                "เมทริกซ์มีขนาด 3 × 5 ทรานสโพสของมันมีขนาดเท่าใด"],
    opts:[{v:"5 × 3",ok:1},{v:"3 × 5"},{v:"5 × 5"},{v:"3 × 3"}],unit:""};
  if(sf==="S-05") return {stem:["Two matrices can be added. What must be true of their dimensions?",
                                "เมทริกซ์สองตัวบวกกันได้ มิติของทั้งสองต้องเป็นอย่างไร"],
    opts:[{v:["Identical","เท่ากันทุกประการ"],ok:1},
          {v:["Inner dimensions match","มิติด้านในตรงกัน"],trap:"T-01"},
          {v:["Both square","เป็นจัตุรัสทั้งคู่"]},{v:["Any dimensions","มิติใดก็ได้"]}],unit:""};
  return {stem:["Can a "+m+" × "+p+" matrix be added to a "+p+" × "+m+" matrix?",
                "เมทริกซ์ "+m+" × "+p+" บวกกับเมทริกซ์ "+p+" × "+m+" ได้หรือไม่"],
    opts:[{v:["No — addition needs identical dimensions","ไม่ได้ การบวกต้องมิติเท่ากันพอดี"],ok:1},
          {v:["Yes, always","ได้เสมอ"],trap:"T-01"},
          {v:["Yes, if m = p","ได้ ถ้า m = p"]},
          {v:["Only after transposing one","ได้หลังจากทรานสโพสตัวหนึ่ง"]}],unit:""};
},
"M-02": function(sf){
  var m=pick([2,3]), p=pick([3,4]), n=pick([2,5]);
  if(sf==="S-04") return {stem:["For AB to be defined, what must hold?","AB จะนิยามได้ต้องเป็นอย่างไร"],
    opts:[{v:["Columns of A equal rows of B","จำนวนหลักของ A เท่ากับจำนวนแถวของ B"],ok:1},
          {v:["A and B are the same size","A กับ B ขนาดเท่ากัน"],trap:"T-01"},
          {v:["Both are square","ทั้งคู่เป็นจัตุรัส"]},
          {v:["Rows of A equal rows of B","จำนวนแถวของ A เท่ากับจำนวนแถวของ B"],trap:"T-01"}],unit:""};
  if(sf==="S-03") return {stem:["If AB is defined and BA is also defined, must they be equal?",
                                "ถ้า AB นิยามได้และ BA ก็นิยามได้ ทั้งสองต้องเท่ากันหรือไม่"],
    opts:[{v:["No — matrix multiplication does not commute","ไม่ การคูณเมทริกซ์สลับที่ไม่ได้"],ok:1},
          {v:["Yes, always","ใช่ เสมอ"],trap:"T-01"},
          {v:["Yes, if both are square","ใช่ ถ้าทั้งคู่เป็นจัตุรัส"],trap:"T-01"},
          {v:["Only if one is the identity","เฉพาะเมื่อตัวหนึ่งเป็นเมทริกซ์เอกลักษณ์"]}],unit:""};
  return {stem:["A is "+m+" × "+p+" and B is "+p+" × "+n+". What are the dimensions of AB?",
                "A มีขนาด "+m+" × "+p+" และ B มีขนาด "+p+" × "+n+" AB มีขนาดเท่าใด"],
    opts:[{v:m+" × "+n,ok:1},{v:p+" × "+p},{v:n+" × "+m,trap:"T-01"},{v:m+" × "+p}],unit:""};
},
"M-03": function(sf){
  var a=ri(1,6), b=ri(1,6), c=ri(1,6), d=ri(1,6);
  var det=a*d-b*c;
  if(sf==="S-02"||sf==="S-04") return {stem:["The two columns of a 2×2 matrix are parallel. What is its determinant?",
                                             "สองหลักของเมทริกซ์ 2×2 ขนานกัน ดีเทอร์มิแนนต์เป็นเท่าใด"],
    opts:[{v:["Zero","ศูนย์"],ok:1},{v:["One","หนึ่ง"],trap:"T-03"},
          {v:["Undefined","ไม่นิยาม"],trap:"T-03"},{v:["Always positive","เป็นบวกเสมอ"]}],unit:""};
  if(sf==="S-05") return {stem:["det(A) = 3 and det(B) = 5. Find det(AB).","det(A) = 3 และ det(B) = 5 จงหา det(AB)"],
    opts:[{v:"15",ok:1},{v:"8",trap:"T-04"},{v:"3"},{v:"5"}],unit:""};
  return {stem:["Find the determinant of [ "+a+"  "+b+" ; "+c+"  "+d+" ].",
                "จงหาดีเทอร์มิแนนต์ของ [ "+a+"  "+b+" ; "+c+"  "+d+" ]"],
    opts:[{v:String(det),ok:1},{v:String(a*d+b*c),trap:"T-04"},
          {v:String(a*b-c*d)},{v:String(a+d)}],unit:""};
},
"M-04": function(sf){
  var a=ri(1,5), b=ri(1,4), c=ri(1,4), d=ri(2,6);
  var det=a*d-b*c;
  if(sf==="S-04") return {stem:["Simplify (AB)⁻¹.","จงลดรูป (AB)⁻¹"],
    opts:[{v:"B⁻¹A⁻¹",ok:1},{v:"A⁻¹B⁻¹",trap:"T-02"},{v:"(BA)⁻¹",trap:"T-02"},{v:"AB"}],unit:""};
  if(sf==="S-03") return {stem:["A 2×2 matrix has determinant zero. What can you say about its inverse?",
                                "เมทริกซ์ 2×2 มีดีเทอร์มิแนนต์เป็นศูนย์ พูดอะไรได้เกี่ยวกับอินเวอร์สของมัน"],
    opts:[{v:["It has none — the matrix is singular","ไม่มี เมทริกซ์เป็นเอกฐาน"],ok:1},
          {v:["Its inverse is the identity","อินเวอร์สคือเมทริกซ์เอกลักษณ์"],trap:"T-03"},
          {v:["Its inverse is itself","อินเวอร์สคือตัวมันเอง"],trap:"T-03"},
          {v:["The inverse is zero","อินเวอร์สเป็นศูนย์"],trap:"T-03"}],unit:""};
  return {stem:["For A = [ "+a+"  "+b+" ; "+c+"  "+d+" ], what scalar multiplies the adjugate in A⁻¹?",
                "สำหรับ A = [ "+a+"  "+b+" ; "+c+"  "+d+" ] สเกลาร์ใดคูณกับ adj ใน A⁻¹"],
    opts:[{v:"1/"+det,ok:1},{v:String(det),trap:"T-03"},{v:"1/"+(a*d+b*c),trap:"T-04"},{v:"1"}],unit:""};
},
"M-05": function(sf){
  var x=ri(1,5), y=ri(1,5);
  var a=ri(1,3), b=ri(1,3), c=ri(1,3), d=ri(2,4);
  var e=a*x+b*y, f=c*x+d*y;
  if(sf==="S-04") return {stem:["A system AX = B has det(A) = 0. What follows?",
                                "ระบบ AX = B มี det(A) = 0 สรุปได้ว่าอย่างไร"],
    opts:[{v:["There is no unique solution","ไม่มีคำตอบเดียว"],ok:1},
          {v:["There is exactly one solution","มีคำตอบเดียวพอดี"],trap:"T-03"},
          {v:["X must be zero","X ต้องเป็นศูนย์"],trap:"T-03"},
          {v:["B must be zero","B ต้องเป็นศูนย์"]}],unit:""};
  return {stem:["Write "+a+"x + "+b+"y = "+e+" and "+c+"x + "+d+"y = "+f+" as AX = B. What is A?",
                "จงเขียน "+a+"x + "+b+"y = "+e+" และ "+c+"x + "+d+"y = "+f+" ในรูป AX = B เมทริกซ์ A คืออะไร"],
    opts:[{v:"[ "+a+"  "+b+" ; "+c+"  "+d+" ]",ok:1},
          {v:"[ "+e+" ; "+f+" ]"},
          {v:"[ "+a+"  "+c+" ; "+b+"  "+d+" ]",trap:"T-01"},
          {v:"[ x ; y ]"}],unit:""};
},
"M-06": function(sf){
  var a=ri(1,4), b=ri(1,4), c=ri(1,4), d=ri(2,5);
  var det=a*d-b*c;
  var e=ri(3,12), f=ri(3,12);
  var dx=e*d-b*f;
  if(sf==="S-04") return {stem:["In Cramer's rule, how do you build the numerator for x?",
                                "ในกฎของคราเมอร์ สร้างตัวเศษสำหรับ x อย่างไร"],
    opts:[{v:["Replace the x-column of A with B, then take the determinant","แทนหลักของ x ใน A ด้วย B แล้วหาดีเทอร์มิแนนต์"],ok:1},
          {v:["Take the determinant of B","หาดีเทอร์มิแนนต์ของ B"]},
          {v:["Multiply det(A) by B","คูณ det(A) ด้วย B"]},
          {v:["Replace the y-column instead","แทนหลักของ y แทน"],trap:"T-01"}],unit:""};
  if(det===0) det=1;
  return {stem:["For the system with A = [ "+a+"  "+b+" ; "+c+"  "+d+" ] and B = [ "+e+" ; "+f+" ], find x by Cramer's rule.",
                "สำหรับระบบที่ A = [ "+a+"  "+b+" ; "+c+"  "+d+" ] และ B = [ "+e+" ; "+f+" ] จงหา x ด้วยกฎของคราเมอร์"],
    opts:[{v:fmt2(dx/det),ok:1},{v:fmt2(det/dx),trap:"T-04"},
          {v:fmt2(dx)},{v:fmt2((a*f-c*e)/det)}],unit:""};
}
}
};
