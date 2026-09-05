var CHAPTER = {
id:"ma12", num:"12", slug:"graph-theory", subject:"math",
kicker:["Mathematics · Chapter 12","คณิตศาสตร์ · บทที่ 12"],
title:["Graph Theory","ทฤษฎีกราฟ"],
mapTitle:["Dots, lines, and what connects them","จุด เส้น และสิ่งที่เชื่อมโยงกัน"],
lede:["Strip a road map, a circuit or a friendship network down to dots and the lines between them and you get a graph. What survives that stripping is connection alone — and it turns out connection is enough to answer surprisingly hard questions.",
      "ถ้าลอกแผนที่ถนน วงจรไฟฟ้า หรือเครือข่ายมิตรภาพ ให้เหลือเพียงจุดกับเส้นที่เชื่อมระหว่างจุด สิ่งที่ได้คือกราฟ สิ่งที่รอดจากการลอกนั้นมีเพียงการเชื่อมโยง และกลายเป็นว่าการเชื่อมโยงอย่างเดียวก็เพียงพอจะตอบคำถามที่ยากอย่างน่าประหลาดใจ"],
next:["→ continues in Chapter 13 · Statistics","→ ต่อในบทที่ 13 · สถิติ"],

nodes:[
{ id:"basics", x:235, y:52, requires:[], methods:["M-01"],
  title:["Vertices and edges","จุดยอดและเส้นเชื่อม"],
  body:[["A graph is a set of vertices together with a set of edges joining them. Only the pattern of connection counts — position, length and curvature carry no meaning, so two drawings that look nothing alike can be the same graph.",
         "A loop joins a vertex to itself; parallel edges join the same pair twice. A simple graph has neither. A complete graph Kₙ joins every pair, and a subgraph is any part of a graph taken whole with its endpoints."],
        ["กราฟคือเซตของจุดยอดพร้อมกับเซตของเส้นเชื่อมที่โยงจุดเหล่านั้น สิ่งที่นับมีเพียงแบบรูปของการเชื่อมโยง ตำแหน่ง ความยาว และความโค้งไม่มีความหมาย ภาพวาดสองภาพที่ดูไม่เหมือนกันเลยจึงเป็นกราฟเดียวกันได้",
         "วงวนเชื่อมจุดยอดเข้ากับตัวเอง เส้นเชื่อมขนานเชื่อมจุดคู่เดิมสองครั้ง กราฟเชิงเดียวไม่มีทั้งสองอย่าง กราฟบริบูรณ์ Kₙ เชื่อมทุกคู่เข้าด้วยกัน และกราฟย่อยคือส่วนใดก็ได้ของกราฟที่ยกมาทั้งชิ้นพร้อมจุดปลาย"]],
  formula:["G = (V, E)        only connection matters, not drawing","G = (V, E)        สิ่งที่นับคือการเชื่อมโยง ไม่ใช่ภาพวาด"],
  flabel:["Same connections = same graph","การเชื่อมโยงเหมือนกัน = กราฟเดียวกัน"],
  viz:"grid",
  vizcfg:{
    title:["THE VOCABULARY OF A GRAPH","ศัพท์ของกราฟ"],
    cols:[["Term","คำศัพท์"],["What it means","หมายความว่า"],["Allowed in a simple graph?","อยู่ในกราฟเชิงเดียวได้ไหม"]],
    ctrls:[{k:"i", lab:["Highlight term","เน้นคำศัพท์"], min:0, max:4, step:1, def:0, unit:""}],
    readouts:[
      {lab:["Term","คำศัพท์"], f:function(S){
        return [["Loop","วงวน"],["Parallel edges","เส้นเชื่อมขนาน"],["Simple graph","กราฟเชิงเดียว"],
                ["Complete graph Kₙ","กราฟบริบูรณ์ Kₙ"],["Subgraph","กราฟย่อย"]][S.p.i][L()]; }},
      {lab:["Edges in Kₙ","จำนวนเส้นเชื่อมใน Kₙ"], f:function(){ return "n(n − 1) / 2"; }},
      {lab:["What actually matters","สิ่งที่สำคัญจริงๆ"], f:function(){
        return L()?"แบบรูปของการเชื่อมโยง ไม่ใช่ภาพวาด":"the pattern of connections, not the drawing"; }}
    ],
    rows:function(p){
      var R=[[["Loop","วงวน"],["an edge from a vertex to itself","เส้นเชื่อมจากจุดยอดกลับหาตัวเอง"],["no","ไม่ได้"]],
             [["Parallel edges","เส้นเชื่อมขนาน"],["two edges joining the same pair","เส้นเชื่อมสองเส้นโยงคู่เดิม"],["no","ไม่ได้"]],
             [["Simple graph","กราฟเชิงเดียว"],["neither loops nor parallel edges","ไม่มีทั้งวงวนและเส้นขนาน"],["by definition","ตามนิยาม"]],
             [["Complete Kₙ","บริบูรณ์ Kₙ"],["every pair is joined","ทุกคู่ถูกเชื่อม"],["yes","ได้"]],
             [["Subgraph","กราฟย่อย"],["any part taken with its endpoints","ส่วนใดก็ได้ที่ยกมาพร้อมจุดปลาย"],["yes","ได้"]]];
      return R.map(function(r,i){ return r.map(function(c,j){
        return {v:c, on:i===p.i, col:j===2?(i<2?"warn":"good"):"accent"}; }); });
    },
    note:["two drawings that look nothing alike are the same graph if the connections match","ภาพวาดสองภาพที่ดูไม่เหมือนกันเลยเป็นกราฟเดียวกัน ถ้าการเชื่อมโยงตรงกัน"]
  } },

{ id:"degree", x:100, y:150, requires:["basics"], methods:["M-02"],
  title:["Degree","ดีกรี"],
  body:[["The degree of a vertex is how many edge-ends meet it, with a loop counting twice because both of its ends land there. Forgetting that doubling is trap T-01.",
         "The handshake theorem follows immediately: every edge contributes two to the degree total, so the sum of all degrees is exactly 2|E| — always even. A direct consequence is that the number of odd-degree vertices in any graph is itself even, which is the fact the Euler test rests on."],
        ["ดีกรีของจุดยอดคือจำนวนปลายเส้นเชื่อมที่มาบรรจบที่จุดนั้น โดยวงวนนับสอง เพราะปลายทั้งสองข้างของมันตกลงที่จุดเดียวกัน การลืมการนับสองนี้คือกับดัก T-01",
         "ทฤษฎีบทการจับมือตามมาทันที เส้นเชื่อมทุกเส้นเพิ่มดีกรีรวมทีละสอง ผลบวกของดีกรีทั้งหมดจึงเท่ากับ 2|E| พอดี และเป็นจำนวนคู่เสมอ ผลที่ตามมาโดยตรงคือ จำนวนจุดยอดดีกรีคี่ในกราฟใดๆ ย่อมเป็นจำนวนคู่ ซึ่งเป็นข้อเท็จจริงที่การทดสอบออยเลอร์ตั้งอยู่บนนั้น"]],
  formula:["Σ deg(v) = 2|E|        odd-degree vertices always come in pairs","Σ deg(v) = 2|E|        จุดยอดดีกรีคี่มาเป็นคู่เสมอ"],
  flabel:["A loop adds two, not one","วงวนเพิ่มสอง ไม่ใช่หนึ่ง"],
  viz:"bars",
  vizcfg:{
    title:["EVERY EDGE CONTRIBUTES EXACTLY TWO","เส้นเชื่อมทุกเส้นให้ดีกรีสองพอดี"],
    ylab:["count","จำนวน"],
    ctrls:[
      {k:"E",     lab:["Number of edges","จำนวนเส้นเชื่อม"], min:1, max:20, step:1, def:7, unit:""},
      {k:"loops", lab:["Of which loops","ในจำนวนนั้นเป็นวงวน"], min:0, max:6, step:1, def:0, unit:""}
    ],
    readouts:[
      {lab:["Sum of all degrees","ผลบวกดีกรีทั้งหมด"], f:function(S){ return String(2*S.p.E); }},
      {lab:["2 × edges","2 × จำนวนเส้นเชื่อม"], f:function(S){ return String(2*S.p.E); }},
      {lab:["Contribution of one loop","วงวนหนึ่งวงให้ดีกรี"], f:function(){
        return L()?"2 — ปลายทั้งสองข้างตกที่จุดเดียวกัน":"2 — both its ends land on the same vertex"; }},
      {lab:["Odd-degree vertices","จุดยอดดีกรีคี่"], f:function(){
        return L()?"เป็นจำนวนคู่เสมอ":"always come in an even number"; }}
    ],
    bars:[
      {lab:["Edges |E|","เส้นเชื่อม |E|"], f:function(p){ return p.E; }, col:"faint"},
      {lab:["Σ deg(v)","Σ deg(v)"], f:function(p){ return 2*p.E; }, col:"accent"},
      {lab:["2|E|","2|E|"], f:function(p){ return 2*p.E; }, col:"good"}
    ],
    note:["the last two bars are the handshake theorem, and they can never disagree","สองแถบสุดท้ายคือทฤษฎีบทการจับมือ และไม่มีวันต่างกัน"]
  } },

{ id:"euler", x:370, y:150, requires:["degree"], methods:["M-03"],
  title:["Euler paths and circuits","แนวเดินและวงจรออยเลอร์"],
  body:[["An Euler path uses every edge exactly once; an Euler circuit does the same and returns to its start. The test is purely about odd-degree vertices, and nothing else about the graph matters.",
         "Zero odd vertices gives a circuit. Exactly two gives a path, which must start at one odd vertex and finish at the other. Any other count gives neither — and there can never be exactly one, since odd vertices come in pairs. Try it in the lab: toggle edges and watch the verdict flip the moment the odd count crosses a boundary."],
        ["แนวเดินออยเลอร์ใช้เส้นเชื่อมทุกเส้นเส้นละครั้งพอดี วงจรออยเลอร์ทำแบบเดียวกันแล้วกลับมาที่จุดเริ่ม การทดสอบขึ้นอยู่กับจุดยอดดีกรีคี่ล้วนๆ ไม่มีอย่างอื่นของกราฟที่มีผล",
         "จุดยอดดีกรีคี่ศูนย์ตัวให้วงจร สองตัวพอดีให้แนวเดิน ซึ่งต้องเริ่มที่จุดคี่ตัวหนึ่งและจบที่อีกตัวหนึ่ง จำนวนอื่นไม่ได้ทั้งสองอย่าง และเป็นหนึ่งตัวไม่ได้เลย เพราะจุดคี่มาเป็นคู่ ลองในห้องทดลอง สลับเส้นเชื่อมแล้วดูคำตัดสินพลิกทันทีที่จำนวนจุดคี่ข้ามเส้นแบ่ง"]],
  formula:["0 odd → circuit        exactly 2 odd → path        otherwise → neither","คี่ 0 → วงจร        คี่ 2 พอดี → แนวเดิน        นอกนั้น → ไม่ได้ทั้งสอง"],
  flabel:["Count the odd vertices, nothing else","นับจุดยอดดีกรีคี่ ไม่ต้องดูอย่างอื่น"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"e12", lab:["Edge A–B","เส้นเชื่อม A–B"], min:0, max:1, step:1, def:1, unit:""},
      {k:"e23", lab:["Edge B–C","เส้นเชื่อม B–C"], min:0, max:1, step:1, def:1, unit:""},
      {k:"e34", lab:["Edge C–D","เส้นเชื่อม C–D"], min:0, max:1, step:1, def:1, unit:""},
      {k:"e41", lab:["Edge D–A","เส้นเชื่อม D–A"], min:0, max:1, step:1, def:1, unit:""},
      {k:"e13", lab:["Edge A–C (diagonal)","เส้นเชื่อม A–C (แนวทแยง)"], min:0, max:1, step:1, def:0, unit:""},
      {k:"e24", lab:["Edge B–D (diagonal)","เส้นเชื่อม B–D (แนวทแยง)"], min:0, max:1, step:1, def:0, unit:""}
    ],
    readouts:[
      {lab:["Edges |E|","เส้นเชื่อม |E|"], f:function(S){ var p=S.p;
        return String(p.e12+p.e23+p.e34+p.e41+p.e13+p.e24); }},
      {lab:["Σ deg(v)","Σ deg(v)"], f:function(S){ var p=S.p;
        return String(2*(p.e12+p.e23+p.e34+p.e41+p.e13+p.e24))+(L()?" = 2|E|":" = 2|E|"); }},
      {lab:["Odd-degree vertices","จุดยอดดีกรีคี่"], f:function(S){ return String(S._odd||0); }},
      {lab:["Verdict","คำตัดสิน"], f:function(S){
        var od=S._odd||0;
        if(S._iso) return L()?"ไม่เชื่อมต่อกัน":"not connected";
        if(od===0) return L()?"มีวงจรออยเลอร์":"Euler circuit exists";
        if(od===2) return L()?"มีแนวเดินออยเลอร์":"Euler path exists";
        return L()?"ไม่มีทั้งสองอย่าง":"neither exists"; }}
    ],
    draw:function(S,o){
      var p=S.p;
      var V=[{n:"A",x:170,y:80},{n:"B",x:330,y:80},{n:"C",x:330,y:230},{n:"D",x:170,y:230}];
      var E=[[0,1,p.e12],[1,2,p.e23],[2,3,p.e34],[3,0,p.e41],[0,2,p.e13],[1,3,p.e24]];
      var deg=[0,0,0,0], i;
      E.forEach(function(e){ if(e[2]){ deg[e[0]]++; deg[e[1]]++; } });
      var odd=0, iso=false;
      for(i=0;i<4;i++){ if(deg[i]%2) odd++; if(deg[i]===0) iso=true; }
      S._odd=odd; S._iso=iso;
      o.push('<text x="34" y="28" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.4">'+tx(["TOGGLE EDGES · WATCH THE VERDICT","สลับเส้นเชื่อม · ดูคำตัดสิน"])+'</text>');
      /* edges first, so vertices sit on top */
      E.forEach(function(e){
        var a=V[e[0]], b=V[e[1]];
        if(e[2]) o.push('<line x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+
                        '" stroke="var(--ink)" stroke-width="2.4"/>');
        else     o.push('<line x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+
                        '" stroke="var(--rule)" stroke-width="1.2" stroke-dasharray="3 5"/>');
      });
      V.forEach(function(v,k){
        var isOdd = deg[k]%2===1;
        o.push('<circle cx="'+v.x+'" cy="'+v.y+'" r="20" fill="'+(isOdd?"var(--accent)":"var(--ground)")+
               '" stroke="'+(isOdd?"var(--accent)":"var(--ink)")+'" stroke-width="2.4"/>');
        o.push('<text x="'+v.x+'" y="'+(v.y+5)+'" fill="'+(isOdd?"#fff":"var(--ink)")+
               '" font-family="Bodoni Moda, serif" font-size="15" text-anchor="middle">'+v.n+'</text>');
        o.push('<text x="'+v.x+'" y="'+(v.y+38)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">deg '+deg[k]+'</text>');
      });
      /* the verdict panel */
      var vx=396, msg, col;
      if(iso){ msg=L()?"ไม่เชื่อมต่อ":"NOT CONNECTED"; col="var(--warn)"; }
      else if(odd===0){ msg=L()?"วงจรออยเลอร์":"EULER CIRCUIT"; col="var(--good)"; }
      else if(odd===2){ msg=L()?"แนวเดินออยเลอร์":"EULER PATH"; col="var(--good)"; }
      else { msg=L()?"ไม่มีทั้งสองอย่าง":"NEITHER"; col="var(--accent)"; }
      o.push('<text x="'+vx+'" y="92" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.2">'+tx(["ODD VERTICES","จุดยอดดีกรีคี่"])+'</text>');
      o.push('<text x="'+vx+'" y="128" fill="var(--ink)" font-family="Bodoni Moda, serif" font-size="34">'+odd+'</text>');
      o.push('<line x1="'+vx+'" y1="144" x2="'+(vx+124)+'" y2="144" stroke="var(--rule)"/>');
      o.push('<text x="'+vx+'" y="168" fill="'+col+'" font-family="IBM Plex Sans" font-size="11.5" font-weight="600">'+msg+'</text>');
      o.push('<text x="34" y="300" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="10.5">'+tx(["red vertices have odd degree · dashed edges are switched off","จุดยอดสีแดงมีดีกรีคี่ · เส้นประคือเส้นเชื่อมที่ปิดอยู่"])+'</text>');
      o.push('<text x="34" y="316" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["the odd count is always even — you can never make it 1 or 3","จำนวนจุดคี่เป็นเลขคู่เสมอ — ทำให้เป็น 1 หรือ 3 ไม่ได้เลย"])+'</text>');
    }
  },
  guide:[
    {say:["A plain square. Every vertex has degree 2, so nothing is odd and an Euler circuit exists.",
          "สี่เหลี่ยมธรรมดา ทุกจุดยอดมีดีกรี 2 จึงไม่มีจุดคี่เลย และมีวงจรออยเลอร์"], set:{e12:1,e23:1,e34:1,e41:1,e13:0,e24:0}},
    {say:["Add one diagonal. Two vertices go odd — a path now exists, but it must start and end at those two.",
          "เพิ่มแนวทแยงหนึ่งเส้น จุดยอดสองจุดกลายเป็นคี่ ตอนนี้มีแนวเดิน แต่ต้องเริ่มและจบที่สองจุดนั้น"], set:{e12:1,e23:1,e34:1,e41:1,e13:1,e24:0}},
    {say:["Add the second diagonal. All four go odd, and now neither a path nor a circuit is possible.",
          "เพิ่มแนวทแยงเส้นที่สอง ทั้งสี่จุดกลายเป็นคี่ ตอนนี้ไม่มีทั้งแนวเดินและวงจร"], set:{e12:1,e23:1,e34:1,e41:1,e13:1,e24:1}},
    {say:["Remove an edge and try to make exactly one vertex odd. You cannot — they always change in pairs.",
          "ลองลบเส้นเชื่อมออกแล้วทำให้มีจุดคี่เพียงจุดเดียว คุณทำไม่ได้ เพราะมันเปลี่ยนเป็นคู่เสมอ"], set:{e12:1,e23:1,e34:0,e41:1,e13:1,e24:0}}
  ]},

{ id:"connectivity", x:235, y:248, requires:["euler"], methods:["M-04"],
  title:["Connectivity and trees","การเชื่อมโยงและต้นไม้"],
  body:[["A graph is connected when a path runs between every pair of vertices; otherwise it splits into components. A tree is a connected graph with no cycles, and it always has exactly |V| − 1 edges — one fewer than the number of vertices.",
         "That count is tight in both directions. Remove any edge from a tree and it disconnects; add any edge and it gains a cycle. A spanning tree keeps every vertex but only enough edges to hold the graph together."],
        ["กราฟเชื่อมโยงเมื่อมีแนวเดินระหว่างจุดยอดทุกคู่ ถ้าไม่เช่นนั้นมันจะแตกเป็นส่วนประกอบหลายส่วน ต้นไม้คือกราฟเชื่อมโยงที่ไม่มีวัฏจักร และมีเส้นเชื่อม |V| − 1 เส้นพอดีเสมอ คือน้อยกว่าจำนวนจุดยอดอยู่หนึ่ง",
         "จำนวนนี้พอดีเป๊ะทั้งสองทาง ลบเส้นเชื่อมใดออกจากต้นไม้แล้วมันจะขาดจากกัน เพิ่มเส้นเชื่อมใดเข้าไปแล้วมันจะเกิดวัฏจักร ต้นไม้แผ่ทั่วเก็บจุดยอดไว้ครบ แต่เหลือเส้นเชื่อมเพียงพอที่จะยึดกราฟไว้ด้วยกัน"]],
  formula:["tree: connected, no cycles, |E| = |V| − 1","ต้นไม้: เชื่อมโยง ไม่มีวัฏจักร |E| = |V| − 1"],
  flabel:["One edge fewer than vertices","เส้นเชื่อมน้อยกว่าจุดยอดหนึ่งเส้น"],
  viz:"bars",
  vizcfg:{
    title:["A TREE IS THE LEANEST CONNECTED GRAPH","ต้นไม้คือกราฟเชื่อมโยงที่ประหยัดที่สุด"],
    ylab:["count","จำนวน"],
    ctrls:[
      {k:"V", lab:["Vertices","จุดยอด"], min:2, max:12, step:1, def:6, unit:""},
      {k:"E", lab:["Edges you actually have","เส้นเชื่อมที่มีจริง"], min:1, max:30, step:1, def:5, unit:""}
    ],
    readouts:[
      {lab:["Edges a tree needs","เส้นเชื่อมที่ต้นไม้ต้องมี"], f:function(S){ return String(S.p.V-1); }},
      {lab:["What you have","ที่มีอยู่"], f:function(S){ return String(S.p.E); }},
      {lab:["Verdict","ผลลัพธ์"], f:function(S){
        var need=S.p.V-1;
        return S.p.E<need ? (L()?"น้อยเกินไป — ต้องขาดจากกัน":"too few — it must be disconnected")
             : S.p.E===need ? (L()?"พอดี — เป็นต้นไม้ได้":"exactly right — it can be a tree")
             : (L()?"มากเกินไป — ต้องมีวัฏจักร":"too many — a cycle is unavoidable"); }},
      {lab:["Maximum possible edges","เส้นเชื่อมมากที่สุดที่เป็นไปได้"], f:function(S){
        return String(S.p.V*(S.p.V-1)/2); }}
    ],
    bars:[
      {lab:["Vertices |V|","จุดยอด |V|"], f:function(p){ return p.V; }, col:"faint"},
      {lab:["Tree needs |V|−1","ต้นไม้ต้องมี |V|−1"], f:function(p){ return p.V-1; }, col:"good"},
      {lab:["Edges you have","เส้นเชื่อมที่มี"], f:function(p){ return p.E; }, col:"accent"},
      {lab:["Complete graph max","สูงสุดของกราฟบริบูรณ์"], f:function(p){ return p.V*(p.V-1)/2; }, col:"faint"}
    ],
    note:["one edge short and it falls apart; one edge over and a cycle appears","ขาดไปหนึ่งเส้นแล้วมันแตกออก เกินไปหนึ่งเส้นแล้ววัฏจักรก็ปรากฏ"]
  } },

{ id:"weighted", x:235, y:346, requires:["connectivity"], methods:["M-05"],
  title:["Weighted graphs","กราฟถ่วงน้ำหนัก"],
  body:[["Attach a number to each edge — distance, cost, time — and the questions change from 'is there a route' to 'which route is cheapest'. Shortest-path problems and minimum-spanning-tree problems both live here.",
         "A Hamilton circuit visits every **vertex** once, where an Euler circuit uses every **edge** once. They sound like a matched pair but behave nothing alike: the Euler condition is a simple degree count, while no comparably easy test exists for Hamilton. Applying the odd-vertex rule to a Hamilton question is trap T-04."],
        ["ติดตัวเลขไว้กับเส้นเชื่อมแต่ละเส้น เช่น ระยะทาง ต้นทุน เวลา คำถามจะเปลี่ยนจาก มีเส้นทางหรือไม่ ไปเป็น เส้นทางไหนถูกที่สุด ปัญหาวิถีสั้นสุดและปัญหาต้นไม้แผ่ทั่วน้อยสุดอยู่ตรงนี้ทั้งคู่",
         "วงจรแฮมิลตันผ่านจุดยอดทุกจุดครั้งเดียว ขณะที่วงจรออยเลอร์ใช้เส้นเชื่อมทุกเส้นครั้งเดียว ทั้งสองฟังดูเป็นคู่ที่เข้ากัน แต่พฤติกรรมต่างกันสิ้นเชิง เงื่อนไขออยเลอร์เป็นเพียงการนับดีกรี ขณะที่ไม่มีการทดสอบที่ง่ายเทียบเท่าสำหรับแฮมิลตัน การเอากฎจุดยอดคี่ไปใช้กับคำถามแฮมิลตันคือกับดัก T-04"]],
  formula:["Euler: every EDGE once        Hamilton: every VERTEX once","ออยเลอร์: ทุกเส้นเชื่อมครั้งเดียว        แฮมิลตัน: ทุกจุดยอดครั้งเดียว"],
  flabel:["No easy degree test for Hamilton","แฮมิลตันไม่มีการทดสอบดีกรีที่ง่าย"],
  viz:"bars",
  vizcfg:{
    title:["THREE ROUTES, ONE CHEAPEST","สามเส้นทาง หนึ่งเส้นถูกที่สุด"],
    ylab:["total weight","น้ำหนักรวม"],
    ctrls:[
      {k:"a", lab:["Route 1 leg A","เส้นทาง 1 ช่วง A"], min:1, max:20, step:1, def:5, unit:""},
      {k:"b", lab:["Route 1 leg B","เส้นทาง 1 ช่วง B"], min:1, max:20, step:1, def:8, unit:""},
      {k:"c", lab:["Route 2 (direct)","เส้นทาง 2 (ตรง)"], min:1, max:40, step:1, def:14, unit:""},
      {k:"d", lab:["Route 3 detour","เส้นทาง 3 อ้อม"], min:1, max:40, step:1, def:11, unit:""}
    ],
    readouts:[
      {lab:["Route 1 total","รวมเส้นทาง 1"], f:function(S){ return String(S.p.a+S.p.b); }},
      {lab:["Cheapest route","เส้นทางที่ถูกที่สุด"], f:function(S){
        var p=S.p, r1=p.a+p.b, m=Math.min(r1,p.c,p.d);
        return (m===r1?"1":m===p.c?"2":"3")+(L()?" · น้ำหนัก "+m:" · weight "+m); }},
      {lab:["Is the direct route best?","เส้นทางตรงดีที่สุดไหม"], f:function(S){
        var p=S.p;
        return p.c<=Math.min(p.a+p.b,p.d) ? (L()?"ใช่":"yes") : (L()?"ไม่ — อ้อมกลับถูกกว่า":"no — a detour is cheaper"); }},
      {lab:["What Euler and Hamilton ignore","สิ่งที่ออยเลอร์กับแฮมิลตันไม่สนใจ"], f:function(){
        return L()?"น้ำหนัก — ทั้งสองสนใจแค่โครงสร้าง":"weights — both care only about structure"; }}
    ],
    bars:[
      {lab:["Route 1","เส้นทาง 1"], f:function(p){ return p.a+p.b; }, col:"accent"},
      {lab:["Route 2","เส้นทาง 2"], f:function(p){ return p.c; }, col:"good"},
      {lab:["Route 3","เส้นทาง 3"], f:function(p){ return p.d; }, col:"warn"}
    ],
    note:["the shortest route on a map is often not the one with fewest edges","เส้นทางที่สั้นที่สุดบนแผนที่มักไม่ใช่เส้นทางที่มีเส้นเชื่อมน้อยที่สุด"]
  } }
],

methods:[
{id:"M-01", name:["Read a graph's structure","อ่านโครงสร้างกราฟ"]},
{id:"M-02", name:["Compute degrees and use the handshake theorem","หาดีกรีและใช้ทฤษฎีบทการจับมือ"]},
{id:"M-03", name:["Test for an Euler path or circuit","ทดสอบแนวเดินหรือวงจรออยเลอร์"]},
{id:"M-04", name:["Identify trees and components","ระบุต้นไม้และส่วนประกอบ"]},
{id:"M-05", name:["Work with weights and Hamilton circuits","ทำงานกับน้ำหนักและวงจรแฮมิลตัน"]}
],

traps:{
"T-01":["A loop contributes 2 to the degree, not 1 — both its ends land on the same vertex.","วงวนเพิ่มดีกรี 2 ไม่ใช่ 1 เพราะปลายทั้งสองข้างตกที่จุดยอดเดียวกัน"],
"T-02":["Exactly two odd vertices gives a path, not a circuit. Zero gives a circuit.","จุดยอดคี่สองจุดพอดีให้แนวเดิน ไม่ใช่วงจร ศูนย์จุดจึงให้วงจร"],
"T-03":["A tree has |V| − 1 edges. Using |V| adds a cycle.","ต้นไม้มีเส้นเชื่อม |V| − 1 เส้น การใช้ |V| จะทำให้เกิดวัฏจักร"],
"T-04":["Euler is about edges, Hamilton about vertices. The odd-degree test applies only to Euler.","ออยเลอร์ว่าด้วยเส้นเชื่อม แฮมิลตันว่าด้วยจุดยอด การทดสอบดีกรีคี่ใช้ได้กับออยเลอร์เท่านั้น"]
},

gen:{
"M-01": function(sf){
  var n=pick([4,5,6,7]);
  if(sf==="S-04") return {stem:["Two graphs are drawn very differently. When are they the same graph?",
                                "กราฟสองรูปวาดต่างกันมาก เมื่อใดจึงถือว่าเป็นกราฟเดียวกัน"],
    opts:[{v:["When the pattern of connections matches","เมื่อแบบรูปของการเชื่อมโยงตรงกัน"],ok:1},
          {v:["When the vertices are in the same positions","เมื่อจุดยอดอยู่ตำแหน่งเดียวกัน"],trap:"T-01"},
          {v:["When the edges are the same length","เมื่อเส้นเชื่อมยาวเท่ากัน"],trap:"T-01"},
          {v:["They never can be","เป็นไปไม่ได้"]}],unit:""};
  return {stem:["How many edges does the complete graph K"+n+" have?","กราฟบริบูรณ์ K"+n+" มีเส้นเชื่อมกี่เส้น"],
    opts:[{v:String(n*(n-1)/2),ok:1},{v:String(n*(n-1)),trap:"T-01"},
          {v:String(n),trap:"T-03"},{v:String(n-1)}],unit:""};
},
"M-02": function(sf){
  var e=pick([5,7,9,12]);
  if(sf==="S-04") return {stem:["How much does a loop add to a vertex's degree?","วงวนเพิ่มดีกรีให้จุดยอดเท่าใด"],
    opts:[{v:"2",ok:1},{v:"1",trap:"T-01"},{v:"0",trap:"T-01"},{v:"4"}],unit:""};
  if(sf==="S-05") return {stem:["A graph's degrees sum to "+(2*e)+". How many edges has it?",
                                "ผลบวกดีกรีของกราฟหนึ่งเท่ากับ "+(2*e)+" กราฟนี้มีเส้นเชื่อมกี่เส้น"],
    opts:[{v:String(e),ok:1},{v:String(2*e),trap:"T-01"},{v:String(e/2)},{v:String(e+1)}],unit:""};
  if(sf==="S-03") return {stem:["Can a graph have exactly three odd-degree vertices?",
                                "กราฟมีจุดยอดดีกรีคี่สามจุดพอดีได้หรือไม่"],
    opts:[{v:["No — odd vertices always come in pairs","ไม่ได้ จุดยอดคี่มาเป็นคู่เสมอ"],ok:1},
          {v:["Yes, in a large enough graph","ได้ ถ้ากราฟใหญ่พอ"],trap:"T-02"},
          {v:["Yes, if it has loops","ได้ ถ้ามีวงวน"],trap:"T-01"},
          {v:["Only if it is disconnected","เฉพาะเมื่อไม่เชื่อมโยง"],trap:"T-02"}],unit:""};
  return {stem:["A graph has "+e+" edges. What is the sum of all its degrees?",
                "กราฟหนึ่งมีเส้นเชื่อม "+e+" เส้น ผลบวกดีกรีทั้งหมดเป็นเท่าใด"],
    opts:[{v:String(2*e),ok:1},{v:String(e),trap:"T-01"},
          {v:String(e*e)},{v:String(e-1),trap:"T-03"}],unit:""};
},
"M-03": function(sf){
  var C=[{odd:0,a:["An Euler circuit","วงจรออยเลอร์"]},
         {odd:2,a:["An Euler path but no circuit","แนวเดินออยเลอร์ แต่ไม่มีวงจร"]},
         {odd:4,a:["Neither","ไม่มีทั้งสองอย่าง"]}];
  var c=pick(C);
  if(sf==="S-04") return {stem:["A connected graph has exactly two odd vertices. What exists?",
                                "กราฟเชื่อมโยงมีจุดยอดคี่สองจุดพอดี มีอะไรอยู่"],
    opts:[{v:["An Euler path only","แนวเดินออยเลอร์เท่านั้น"],ok:1},
          {v:["An Euler circuit","วงจรออยเลอร์"],trap:"T-02"},
          {v:["Both","ทั้งสองอย่าง"],trap:"T-02"},
          {v:["Neither","ไม่มีทั้งสองอย่าง"],trap:"T-02"}],unit:""};
  if(sf==="S-03") return {stem:["An Euler path exists. Where must it start?","มีแนวเดินออยเลอร์อยู่ ต้องเริ่มที่ไหน"],
    opts:[{v:["At one of the two odd-degree vertices","ที่จุดยอดดีกรีคี่จุดใดจุดหนึ่งในสองจุด"],ok:1},
          {v:["At any vertex","ที่จุดยอดใดก็ได้"],trap:"T-02"},
          {v:["At an even-degree vertex","ที่จุดยอดดีกรีคู่"],trap:"T-02"},
          {v:["At the highest-degree vertex","ที่จุดยอดดีกรีสูงสุด"],trap:"T-02"}],unit:""};
  return {stem:["A connected graph has "+c.odd+" odd-degree vertices. What exists?",
                "กราฟเชื่อมโยงมีจุดยอดดีกรีคี่ "+c.odd+" จุด มีอะไรอยู่"],
    opts:[{v:c.a,ok:1},
          {v:c.odd===0?["An Euler path only","แนวเดินออยเลอร์เท่านั้น"]:["An Euler circuit","วงจรออยเลอร์"],trap:"T-02"},
          {v:["Neither exists","ไม่มีทั้งสองอย่าง"],trap:c.odd===4?undefined:"T-02"},
          {v:["A Hamilton circuit","วงจรแฮมิลตัน"],trap:"T-04"}],unit:""};
},
"M-04": function(sf){
  var v=pick([5,6,8,10]);
  if(sf==="S-04") return {stem:["What happens if you add one edge to a tree?","ถ้าเพิ่มเส้นเชื่อมหนึ่งเส้นเข้าไปในต้นไม้ จะเกิดอะไร"],
    opts:[{v:["It gains a cycle","จะเกิดวัฏจักร"],ok:1},
          {v:["It disconnects","จะขาดจากกัน"],trap:"T-03"},
          {v:["Nothing changes","ไม่มีอะไรเปลี่ยน"],trap:"T-03"},
          {v:["It becomes complete","จะกลายเป็นกราฟบริบูรณ์"]}],unit:""};
  if(sf==="S-05") return {stem:["A tree has "+(v-1)+" edges. How many vertices?","ต้นไม้มีเส้นเชื่อม "+(v-1)+" เส้น มีจุดยอดกี่จุด"],
    opts:[{v:String(v),ok:1},{v:String(v-1),trap:"T-03"},{v:String(v-2),trap:"T-03"},{v:String(2*v)}],unit:""};
  return {stem:["A tree has "+v+" vertices. How many edges?","ต้นไม้มีจุดยอด "+v+" จุด มีเส้นเชื่อมกี่เส้น"],
    opts:[{v:String(v-1),ok:1},{v:String(v),trap:"T-03"},
          {v:String(v+1),trap:"T-03"},{v:String(v*(v-1)/2)}],unit:""};
},
"M-05": function(sf){
  if(sf==="S-04") return {stem:["What is the difference between an Euler and a Hamilton circuit?",
                                "วงจรออยเลอร์กับวงจรแฮมิลตันต่างกันอย่างไร"],
    opts:[{v:["Euler uses every edge; Hamilton visits every vertex","ออยเลอร์ใช้ทุกเส้นเชื่อม แฮมิลตันผ่านทุกจุดยอด"],ok:1},
          {v:["They are the same thing","เป็นสิ่งเดียวกัน"],trap:"T-04"},
          {v:["Euler visits every vertex; Hamilton uses every edge","ออยเลอร์ผ่านทุกจุดยอด แฮมิลตันใช้ทุกเส้นเชื่อม"],trap:"T-04"},
          {v:["Hamilton needs weights","แฮมิลตันต้องมีน้ำหนัก"],trap:"T-04"}],unit:""};
  if(sf==="S-03") return {stem:["Can the odd-degree test decide whether a Hamilton circuit exists?",
                                "การทดสอบดีกรีคี่ตัดสินได้หรือไม่ว่ามีวงจรแฮมิลตัน"],
    opts:[{v:["No — it applies only to Euler circuits","ไม่ได้ ใช้ได้กับวงจรออยเลอร์เท่านั้น"],ok:1},
          {v:["Yes, the same rule works","ได้ กฎเดียวกันใช้ได้"],trap:"T-04"},
          {v:["Yes, if the graph is weighted","ได้ ถ้ากราฟมีน้ำหนัก"],trap:"T-04"},
          {v:["Yes, for trees only","ได้ เฉพาะต้นไม้"],trap:"T-04"}],unit:""};
  var a=pick([4,6,8]), b=pick([3,5,7]), c=pick([2,9,10]);
  return {stem:["A route uses three edges of weight "+a+", "+b+" and "+c+". What is its total weight?",
                "เส้นทางหนึ่งใช้เส้นเชื่อมสามเส้นน้ำหนัก "+a+", "+b+" และ "+c+" น้ำหนักรวมเป็นเท่าใด"],
    opts:[{v:String(a+b+c),ok:1},{v:String(a*b*c),trap:"T-04"},
          {v:String(Math.max(a,b,c))},{v:String(Math.min(a,b,c))}],unit:""};
}
}
};
