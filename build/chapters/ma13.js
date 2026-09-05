var CHAPTER = {
id:"ma13", num:"13", slug:"statistics", subject:"math",
kicker:["Mathematics · Chapter 13","คณิตศาสตร์ · บทที่ 13"],
title:["Statistics","สถิติ"],
mapTitle:["Summarising a pile of numbers","การสรุปกองตัวเลข"],
lede:["Statistics compresses many numbers into a few. Every such compression throws information away, so the real skill is knowing which summary survives the data you actually have — and which one a single strange value can destroy.",
      "สถิติบีบอัดตัวเลขจำนวนมากให้เหลือไม่กี่ตัว การบีบอัดทุกครั้งย่อมทิ้งข้อมูลบางส่วนไป ทักษะที่แท้จริงจึงคือการรู้ว่าค่าสรุปตัวไหนอยู่รอดกับข้อมูลที่เรามีจริง และตัวไหนที่ค่าประหลาดเพียงค่าเดียวก็ทำลายได้"],
next:["→ continues in Chapter 14 · Sequences and Series","→ ต่อในบทที่ 14 · ลำดับและอนุกรม"],

nodes:[
{ id:"data", x:235, y:52, requires:[], methods:["M-01"],
  title:["Kinds of data","ชนิดของข้อมูล"],
  body:[["Qualitative data names categories; quantitative data measures amounts. Quantitative splits again into discrete, which counts in whole steps, and continuous, which can take any value in a range.",
         "The distinction is not academic — it decides which summaries and which charts are even legal. A mean of shirt colours is meaningless, and a pie chart of continuous measurements is misleading. Choosing a summary the data type does not support is trap T-04."],
        ["ข้อมูลเชิงคุณภาพระบุหมวดหมู่ ส่วนข้อมูลเชิงปริมาณวัดจำนวน ข้อมูลเชิงปริมาณแบ่งต่อเป็นแบบไม่ต่อเนื่อง ซึ่งนับเป็นขั้นจำนวนเต็ม และแบบต่อเนื่อง ซึ่งรับค่าใดก็ได้ในช่วง",
         "ความแตกต่างนี้ไม่ใช่เรื่องวิชาการเปล่าๆ มันตัดสินว่าค่าสรุปและแผนภูมิแบบใดใช้ได้บ้าง ค่าเฉลี่ยของสีเสื้อไม่มีความหมาย และแผนภูมิวงกลมของการวัดแบบต่อเนื่องก็ชวนเข้าใจผิด การเลือกค่าสรุปที่ชนิดข้อมูลไม่รองรับคือกับดัก T-04"]],
  formula:["qualitative | quantitative → discrete | continuous","เชิงคุณภาพ | เชิงปริมาณ → ไม่ต่อเนื่อง | ต่อเนื่อง"],
  flabel:["Data type decides the legal summary","ชนิดข้อมูลตัดสินค่าสรุปที่ใช้ได้"],
  viz:"table",
  vizcfg:{
    title:["WHICH SUMMARY IS EVEN LEGAL","ค่าสรุปใดใช้ได้บ้าง"],
    cols:[["Data type","ชนิดข้อมูล"],["Mode","ฐานนิยม"],["Median","มัธยฐาน"],["Mean","ค่าเฉลี่ย"],["Std dev","ส่วนเบี่ยงเบน"]],
    rowKey:"i",
    readouts:[
      {lab:["Data type","ชนิดข้อมูล"], f:function(S){
        return [["Nominal (names)","นามบัญญัติ (ชื่อ)"],["Ordinal (ranked)","เรียงอันดับ"],
                ["Discrete (counts)","ไม่ต่อเนื่อง (นับได้)"],["Continuous (measured)","ต่อเนื่อง (วัดได้)"]][S.p.i][L()]; }},
      {lab:["Example","ตัวอย่าง"], f:function(S){
        return [["blood type","หมู่เลือด"],["exam grade A–F","เกรด A–F"],
                ["number of siblings","จำนวนพี่น้อง"],["height in cm","ส่วนสูงเป็นเซนติเมตร"]][S.p.i][L()]; }},
      {lab:["Why some are barred","ทำไมบางตัวใช้ไม่ได้"], f:function(){
        return L()?"ค่าเฉลี่ยต้องบวกและหารได้ ชื่อทำแบบนั้นไม่ได้":"a mean needs adding and dividing — names cannot do that"; }}
    ],
    rows:function(p){
      var R=[[["Nominal","นามบัญญัติ"],1,0,0,0],
             [["Ordinal","เรียงอันดับ"],1,1,0,0],
             [["Discrete","ไม่ต่อเนื่อง"],1,1,1,1],
             [["Continuous","ต่อเนื่อง"],1,1,1,1]];
      return R.map(function(r,i){
        var row=[{v:r[0], on:i===p.i, col:"ink"}];
        for(var j=1;j<=4;j++) row.push({v:r[j]?"✓":"✗", on:i===p.i, col:r[j]?"good":"warn"});
        return row;
      });
    },
    note:["the ticks only ever get more permissive as you go down — never less","เครื่องหมายถูกมีแต่จะเพิ่มขึ้นเมื่อไล่ลงมา ไม่เคยลดลง"]
  } },

{ id:"central", x:100, y:150, requires:["data"], methods:["M-02"],
  title:["Measures of central tendency","การวัดแนวโน้มสู่ส่วนกลาง"],
  body:[["The mean adds everything and divides by n. The median is the middle value once sorted — sorting first is not optional, and skipping it is trap T-01. The mode is whatever occurs most often, and a set can have several modes or none.",
         "Their behaviour under an outlier is the whole story. Drag the outlier slider in the lab: the mean chases it across the axis while the median barely moves. That is why house prices and salaries are reported as medians — one mansion should not redefine a neighbourhood."],
        ["ค่าเฉลี่ยเลขคณิตบวกทุกค่าแล้วหารด้วย n มัธยฐานคือค่ากลางหลังเรียงลำดับแล้ว การเรียงก่อนไม่ใช่ทางเลือก และการข้ามขั้นนี้คือกับดัก T-01 ฐานนิยมคือค่าที่ปรากฏบ่อยที่สุด ชุดข้อมูลหนึ่งมีฐานนิยมได้หลายค่าหรือไม่มีเลยก็ได้",
         "พฤติกรรมของทั้งสามภายใต้ค่าผิดปกติคือเรื่องราวทั้งหมด ลองลากแถบเลื่อนค่าผิดปกติในห้องทดลอง ค่าเฉลี่ยจะวิ่งไล่ตามมันไปตามแกน ขณะที่มัธยฐานแทบไม่ขยับ นั่นคือเหตุผลที่ราคาบ้านและเงินเดือนรายงานเป็นมัธยฐาน คฤหาสน์หลังเดียวไม่ควรนิยามทั้งย่านใหม่"]],
  formula:["x̄ = Σx / n        median = middle of the SORTED list","x̄ = Σx / n        มัธยฐาน = ค่ากลางของรายการที่เรียงแล้ว"],
  flabel:["The mean chases outliers; the median resists","ค่าเฉลี่ยวิ่งตามค่าผิดปกติ มัธยฐานต้านทาน"],
  viz:{
    vb:"0 0 560 330", anim:false,
    ctrls:[
      {k:"out", lab:["Move the outlier","เลื่อนค่าผิดปกติ"], min:8, max:96, step:1, def:14, unit:""},
      {k:"spread", lab:["Spread of the other values","การกระจายของค่าอื่น"], min:0, max:10, step:.5, def:3, unit:""},
      {k:"n", lab:["How many other values","จำนวนค่าอื่น"], min:5, max:11, step:2, def:7, unit:""}
    ],
    readouts:[
      {lab:["Mean x̄","ค่าเฉลี่ย x̄"], f:function(S){ return fmt2(S._mean||0); }},
      {lab:["Median","มัธยฐาน"], f:function(S){ return fmt2(S._med||0); }},
      {lab:["Mean − median","ค่าเฉลี่ย − มัธยฐาน"], f:function(S){
        var d=(S._mean||0)-(S._med||0);
        var w = Math.abs(d)<0.8 ? (L()?"สมมาตร":"symmetric")
              : d>0 ? (L()?"เบ้ขวา":"skewed right") : (L()?"เบ้ซ้าย":"skewed left");
        return fmt2(d)+" · "+w; }},
      {lab:["Std deviation s","ส่วนเบี่ยงเบนมาตรฐาน s"], f:function(S){ return fmt2(S._sd||0); }}
    ],
    draw:function(S,o){
      var p=S.p, n=Math.round(p.n), i;
      /* a small symmetric cluster, plus one value the user can drag away */
      var vals=[];
      for(i=0;i<n;i++) vals.push(14 + (i-(n-1)/2)*p.spread);
      vals.push(p.out);
      var N=vals.length;
      var sum=0; vals.forEach(function(v){ sum+=v; });
      var mean=sum/N;
      var sorted=vals.slice().sort(function(a,b){ return a-b; });
      var med = N%2 ? sorted[(N-1)/2] : (sorted[N/2-1]+sorted[N/2])/2;
      var ss=0; vals.forEach(function(v){ ss+=(v-mean)*(v-mean); });
      var sd=Math.sqrt(ss/N);
      S._mean=mean; S._med=med; S._sd=sd;
      var A=axes(o,{x:52,y:34,w:470,h:170,xmin:0,xmax:100,ymin:0,ymax:1,
                    title:["THE SAME DATA, ONE VALUE DRAGGED","ข้อมูลชุดเดิม ลากไปหนึ่งค่า"],xlab:["value","ค่า"],ylab:"",
                    xticks:5,yticks:0});
      var base=A.Y(0.12);
      /* the data points, stacked a little so ties stay visible */
      var seen={};
      vals.forEach(function(v,k){
        var key=Math.round(v);
        seen[key]=(seen[key]||0)+1;
        var yy=base-(seen[key]-1)*13;
        var isOut = k===N-1;
        o.push('<circle cx="'+A.X(v)+'" cy="'+yy+'" r="'+(isOut?7:6)+
               '" fill="'+(isOut?"var(--warn)":"var(--ink-soft)")+
               '" stroke="var(--ground)" stroke-width="1.5"/>');
      });
      /* mean and median markers */
      var top=A.Y(0.92);
      o.push('<line x1="'+A.X(mean)+'" y1="'+top+'" x2="'+A.X(mean)+'" y2="'+(base+14)+
             '" stroke="var(--accent)" stroke-width="2.4"/>');
      o.push('<text x="'+A.X(mean)+'" y="'+(top-6)+'" fill="var(--accent)" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">mean '+fmt2(mean)+'</text>');
      o.push('<line x1="'+A.X(med)+'" y1="'+(top+22)+'" x2="'+A.X(med)+'" y2="'+(base+14)+
             '" stroke="var(--good)" stroke-width="2.4" stroke-dasharray="5 4"/>');
      o.push('<text x="'+A.X(med)+'" y="'+(top+16)+'" fill="var(--good)" font-family="IBM Plex Sans" font-size="10.5" text-anchor="middle">median '+fmt2(med)+'</text>');
      /* the gap between them, drawn as a bar, is the skew */
      var gy=252, gx=52, gw=470;
      o.push('<text x="'+gx+'" y="'+(gy-10)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10" letter-spacing="1.2">'+tx(["HOW FAR THE MEAN HAS BEEN PULLED","ค่าเฉลี่ยถูกดึงไปไกลแค่ไหน"])+'</text>');
      o.push('<rect x="'+gx+'" y="'+gy+'" width="'+gw+'" height="16" fill="var(--surface)" stroke="var(--rule)"/>');
      var gap=Math.min(Math.abs(mean-med)/25,1);
      o.push('<rect x="'+gx+'" y="'+gy+'" width="'+(gw*gap)+'" height="16" fill="var(--accent)"/>');
      o.push('<text x="'+gx+'" y="'+(gy+38)+'" fill="var(--ink-soft)" font-family="IBM Plex Sans" font-size="10.5">'+tx(["amber dot = the outlier · drag it and watch which marker follows","จุดเหลืองอำพัน = ค่าผิดปกติ · ลากดูว่าเครื่องหมายไหนวิ่งตาม"])+'</text>');
      o.push('<text x="'+gx+'" y="'+(gy+54)+'" fill="var(--ink-faint)" font-family="IBM Plex Sans" font-size="10">'+tx(["mean &gt; median means the tail runs to the right","ค่าเฉลี่ย &gt; มัธยฐาน หมายถึงหางข้อมูลลากไปทางขวา"])+'</text>');
    }
  },
  guide:[
    {say:["One value sits with the rest. Mean and median land almost on top of each other.",
          "ค่าหนึ่งอยู่ปนกับค่าอื่น ค่าเฉลี่ยกับมัธยฐานตกเกือบทับกัน"], set:{out:14,spread:3,n:7}},
    {say:["Drag the amber point out to 60. The red mean marker slides after it; the green median hardly stirs.",
          "ลากจุดสีเหลืองอำพันออกไปที่ 60 เครื่องหมายค่าเฉลี่ยสีแดงไถลตามไป ส่วนมัธยฐานสีเขียวแทบไม่ไหวติง"], set:{out:60,spread:3,n:7}},
    {say:["Push it to 96. The mean is now nowhere near any actual data point — that is the failure mode.",
          "ดันไปที่ 96 ตอนนี้ค่าเฉลี่ยไม่ได้อยู่ใกล้ข้อมูลจริงจุดไหนเลย นั่นคือรูปแบบความล้มเหลว"], set:{out:96,spread:3,n:7}},
    {say:["Add more ordinary values. Each one dilutes the outlier's pull, so the mean creeps back towards the median.",
          "เพิ่มค่าปกติเข้าไปอีก แต่ละค่าเจือจางแรงดึงของค่าผิดปกติ ค่าเฉลี่ยจึงคืบกลับเข้าหามัธยฐาน"], set:{out:96,spread:3,n:11}}
  ]},

{ id:"position", x:370, y:150, requires:["central"], methods:["M-03"],
  title:["Measures of position","การวัดตำแหน่ง"],
  body:[["Quartiles cut a sorted set into four equal parts: Q1 at 25%, Q2 the median, Q3 at 75%. Percentiles do the same with a hundred cuts instead of four.",
         "The interquartile range Q3 − Q1 measures the spread of the middle half only, which makes it immune to outliers in the same way the median is. A value more than 1.5 × IQR beyond either quartile is conventionally flagged as an outlier — and note that percentile means the share of data *below* a value, not the score achieved."],
        ["ควอร์ไทล์ตัดชุดข้อมูลที่เรียงแล้วออกเป็นสี่ส่วนเท่ากัน Q1 ที่ 25% Q2 คือมัธยฐาน Q3 ที่ 75% เปอร์เซ็นไทล์ทำอย่างเดียวกันแต่ตัดร้อยส่วนแทนที่จะเป็นสี่",
         "พิสัยระหว่างควอร์ไทล์ Q3 − Q1 วัดการกระจายของครึ่งกลางเท่านั้น จึงทนต่อค่าผิดปกติแบบเดียวกับมัธยฐาน ค่าที่ห่างจากควอร์ไทล์ใดเกิน 1.5 × IQR ตามธรรมเนียมจะถูกทำเครื่องหมายว่าเป็นค่าผิดปกติ และสังเกตว่าเปอร์เซ็นไทล์หมายถึงสัดส่วนของข้อมูลที่อยู่ต่ำกว่าค่านั้น ไม่ใช่คะแนนที่ทำได้"]],
  formula:["IQR = Q3 − Q1        outlier if beyond 1.5 × IQR from a quartile","IQR = Q3 − Q1        เป็นค่าผิดปกติถ้าห่างจากควอร์ไทล์เกิน 1.5 × IQR"],
  flabel:["Percentile = share below, not score","เปอร์เซ็นไทล์ = สัดส่วนที่อยู่ต่ำกว่า ไม่ใช่คะแนน"],
  viz:"numline",
  vizcfg:{
    title:["QUARTILES, THE IQR, AND THE OUTLIER FENCES","ควอร์ไทล์ IQR และรั้วค่าผิดปกติ"],
    min:0, max:100,
    ctrls:[
      {k:"q1", lab:["Q1","Q1"], min:5, max:60, step:1, def:30, unit:""},
      {k:"q2", lab:["Median Q2","มัธยฐาน Q2"], min:5, max:80, step:1, def:45, unit:""},
      {k:"q3", lab:["Q3","Q3"], min:10, max:90, step:1, def:60, unit:""},
      {k:"x",  lab:["A data value","ค่าข้อมูลหนึ่งค่า"], min:0, max:100, step:1, def:85, unit:""}
    ],
    readouts:[
      {lab:["Interquartile range","พิสัยระหว่างควอร์ไทล์"], f:function(S){
        return fmt2(S.p.q3-S.p.q1); }},
      {lab:["Lower fence","รั้วล่าง"], f:function(S){
        return fmt2(S.p.q1-1.5*(S.p.q3-S.p.q1)); }},
      {lab:["Upper fence","รั้วบน"], f:function(S){
        return fmt2(S.p.q3+1.5*(S.p.q3-S.p.q1)); }},
      {lab:["Is your value an outlier?","ค่าของคุณเป็นค่าผิดปกติไหม"], f:function(S){
        var p=S.p, iqr=p.q3-p.q1;
        return (p.x<p.q1-1.5*iqr || p.x>p.q3+1.5*iqr)
          ? (L()?"ใช่ — อยู่นอกรั้ว":"yes — beyond the fence")
          : (L()?"ไม่ — อยู่ในเกณฑ์ปกติ":"no — within the normal range"); }}
    ],
    regions:function(p){
      var iqr=p.q3-p.q1;
      return [{a:p.q1, b:p.q3, col:"accent", lab:["the middle half (IQR)","ครึ่งกลาง (IQR)"]},
              {a:p.q1-1.5*iqr, b:p.q3+1.5*iqr, col:"good", lab:["inside the fences","ในรั้ว"]}];
    },
    points:function(p){
      return [{v:p.q1, lab:["Q1","Q1"], col:"soft"},
              {v:p.q2, lab:["median","มัธยฐาน"], col:"ink"},
              {v:p.q3, lab:["Q3","Q3"], col:"soft"},
              {v:p.x,  lab:["your value","ค่าของคุณ"], col:"warn"}];
    },
    note:["the IQR uses only the middle half, which is why outliers cannot distort it","IQR ใช้เพียงครึ่งกลาง จึงเป็นเหตุผลที่ค่าผิดปกติบิดเบือนมันไม่ได้"]
  } },

{ id:"spread", x:235, y:248, requires:["central"], methods:["M-04"],
  title:["Measures of dispersion","การวัดการกระจาย"],
  body:[["Range is max minus min and uses only two values, so it wastes almost all the data. Variance averages the squared deviations from the mean, and standard deviation is its square root — which returns the answer to the original units, and is the whole reason for taking that root.",
         "Deviations are squared rather than added raw because raw deviations always cancel to zero: the mean sits exactly at their balance point. Reporting variance where standard deviation was asked for leaves the answer in squared units, which is trap T-02."],
        ["พิสัยคือค่ามากสุดลบค่าน้อยสุด ใช้ข้อมูลเพียงสองค่า จึงทิ้งข้อมูลไปแทบทั้งหมด ความแปรปรวนหาค่าเฉลี่ยของกำลังสองของส่วนเบี่ยงเบนจากค่าเฉลี่ย และส่วนเบี่ยงเบนมาตรฐานคือรากที่สองของมัน ซึ่งพาคำตอบกลับสู่หน่วยเดิม และนั่นคือเหตุผลทั้งหมดของการถอดราก",
         "เราต้องยกกำลังสองของส่วนเบี่ยงเบนแทนที่จะบวกตรงๆ เพราะส่วนเบี่ยงเบนดิบจะหักล้างกันเป็นศูนย์เสมอ ค่าเฉลี่ยอยู่ที่จุดสมดุลของมันพอดี การรายงานความแปรปรวนในที่ที่โจทย์ถามหาส่วนเบี่ยงเบนมาตรฐาน ทำให้คำตอบอยู่ในหน่วยกำลังสอง ซึ่งคือกับดัก T-02"]],
  formula:["s² = Σ(x − x̄)² / n        s = √(s²) , back in original units","s² = Σ(x − x̄)² / n        s = √(s²) กลับสู่หน่วยเดิม"],
  flabel:["Raw deviations always sum to zero","ส่วนเบี่ยงเบนดิบบวกกันได้ศูนย์เสมอ"],
  viz:"bars",
  vizcfg:{
    title:["THREE WAYS TO MEASURE SPREAD","สามวิธีวัดการกระจาย"],
    ylab:["value","ค่า"],
    ctrls:[
      {k:"sd",  lab:["Typical deviation","ส่วนเบี่ยงเบนโดยทั่วไป"], min:1, max:20, step:1, def:6, unit:""},
      {k:"out", lab:["One extreme value at","ค่าสุดขั้วหนึ่งค่าที่"], min:0, max:100, step:5, def:20, unit:""}
    ],
    readouts:[
      {lab:["Range","พิสัย"], f:function(S){ return fmt2(Math.max(S.p.out, 4*S.p.sd)); }},
      {lab:["Interquartile range","พิสัยระหว่างควอร์ไทล์"], f:function(S){ return fmt2(1.35*S.p.sd); }},
      {lab:["Standard deviation","ส่วนเบี่ยงเบนมาตรฐาน"], f:function(S){ return fmt2(S.p.sd); }},
      {lab:["Variance","ความแปรปรวน"], f:function(S){
        return fmt2(S.p.sd*S.p.sd)+(L()?" · หน่วยกำลังสอง":" · in squared units"); }}
    ],
    bars:[
      {lab:["Range","พิสัย"], f:function(p){ return Math.max(p.out, 4*p.sd); }, col:"warn"},
      {lab:["IQR","IQR"], f:function(p){ return 1.35*p.sd; }, col:"good"},
      {lab:["Std deviation","ส่วนเบี่ยงเบนมาตรฐาน"], f:function(p){ return p.sd; }, col:"accent"},
      {lab:["Variance","ความแปรปรวน"], f:function(p){ return p.sd*p.sd; }, col:"faint"}
    ],
    note:["push the extreme value out and only the range bar chases it — the other two hold steady","ดันค่าสุดขั้วออกไป มีเพียงแถบพิสัยที่วิ่งตาม อีกสองแถบนิ่งอยู่กับที่"]
  },
  guide:[
    {say:["With no extreme value, all three measures tell a similar story.",
          "เมื่อไม่มีค่าสุดขั้ว ทั้งสามตัววัดเล่าเรื่องคล้ายกัน"], set:{sd:6,out:20}},
    {say:["Now drag one value far out. The range bar explodes while the IQR does not move at all.",
          "ทีนี้ลากค่าหนึ่งออกไปไกล แถบพิสัยพุ่งขึ้น ขณะที่ IQR ไม่ขยับเลย"], set:{sd:6,out:100}},
    {say:["That is why the range is the weakest measure — it depends on exactly two data points.",
          "นั่นคือเหตุผลที่พิสัยเป็นตัววัดที่อ่อนแอที่สุด มันขึ้นกับข้อมูลเพียงสองจุดเท่านั้น"], set:{sd:6,out:100}}
  ] },

{ id:"normal", x:235, y:346, requires:["spread","position"], methods:["M-05"],
  title:["The normal distribution","การแจกแจงปกติ"],
  body:[["The normal curve is symmetric about the mean, with mean, median and mode all at the same point. Its spread is set entirely by the standard deviation, and the empirical rule gives the familiar 68 − 95 − 99.7 percentages for one, two and three deviations either side.",
         "The z-score z = (x − x̄)/s converts any value into 'how many standard deviations from the mean', which lets scores from different tests be compared directly. A negative z simply means below the mean, and treating it as an error is trap T-03."],
        ["เส้นโค้งปกติสมมาตรรอบค่าเฉลี่ย โดยค่าเฉลี่ย มัธยฐาน และฐานนิยมอยู่ที่จุดเดียวกันทั้งหมด การกระจายของมันกำหนดโดยส่วนเบี่ยงเบนมาตรฐานล้วนๆ และกฎเชิงประจักษ์ให้เปอร์เซ็นต์ที่คุ้นเคยคือ 68 − 95 − 99.7 สำหรับหนึ่ง สอง และสามส่วนเบี่ยงเบนทั้งสองข้าง",
         "ค่ามาตรฐาน z = (x − x̄)/s แปลงค่าใดก็ได้เป็น ห่างจากค่าเฉลี่ยกี่ส่วนเบี่ยงเบนมาตรฐาน ซึ่งทำให้เปรียบเทียบคะแนนจากข้อสอบคนละชุดได้โดยตรง ค่า z ที่เป็นลบหมายถึงอยู่ต่ำกว่าค่าเฉลี่ยเท่านั้น การถือว่าเป็นความผิดพลาดคือกับดัก T-03"]],
  formula:["z = (x − x̄)/s        68% · 95% · 99.7% within 1 · 2 · 3 s","z = (x − x̄)/s        68% · 95% · 99.7% ภายใน 1 · 2 · 3 s"],
  flabel:["Negative z just means below the mean","z ที่เป็นลบแปลว่าอยู่ต่ำกว่าค่าเฉลี่ย"],
  viz:"plot",
  vizcfg:{
    title:["THE NORMAL CURVE AND THE 68–95–99.7 RULE","เส้นโค้งปกติและกฎ 68–95–99.7"],
    xlab:["z, standard deviations from the mean","z ส่วนเบี่ยงเบนมาตรฐานจากค่าเฉลี่ย"], ylab:["density","ความหนาแน่น"],
    xmin:-4, xmax:4, ymin:0, fill:true,
    fn:function(x,p){ return Math.exp(-x*x/2); },
    mark:function(p){ return p.z; },
    ctrls:[
      {k:"z",  lab:["z-score","ค่ามาตรฐาน z"], min:-3.5, max:3.5, step:.1, def:1, unit:""},
      {k:"m",  lab:["Mean","ค่าเฉลี่ย"], min:0, max:100, step:5, def:50, unit:""},
      {k:"sd", lab:["Standard deviation","ส่วนเบี่ยงเบนมาตรฐาน"], min:1, max:25, step:1, def:10, unit:""}
    ],
    readouts:[
      {lab:["Raw score at that z","คะแนนดิบที่ z นั้น"], f:function(S){
        return fmt2(S.p.m+S.p.z*S.p.sd); }},
      {lab:["Within ±1 s","ภายใน ±1 s"], f:function(){ return "68 %"; }},
      {lab:["Within ±2 s","ภายใน ±2 s"], f:function(){ return "95 %"; }},
      {lab:["A negative z means","z ที่เป็นลบหมายถึง"], f:function(){
        return L()?"อยู่ต่ำกว่าค่าเฉลี่ย ไม่ใช่ความผิดพลาด":"below the mean — not a mistake"; }}
    ],
    note:["mean, median and mode all sit at the peak, which is what makes this curve symmetric","ค่าเฉลี่ย มัธยฐาน และฐานนิยมอยู่ที่ยอดเดียวกัน นั่นคือสิ่งที่ทำให้เส้นโค้งนี้สมมาตร"]
  },
  guide:[
    {say:["One standard deviation from the mean. About 68 % of everything lies inside that band.",
          "หนึ่งส่วนเบี่ยงเบนมาตรฐานจากค่าเฉลี่ย ราว 68% ของทั้งหมดอยู่ในแถบนั้น"], set:{z:1,m:50,sd:10}},
    {say:["Two deviations catches 95 %. The tails are already very thin out here.",
          "สองส่วนเบี่ยงเบนครอบคลุม 95% หางกราฟตรงนี้บางมากแล้ว"], set:{z:2,m:50,sd:10}},
    {say:["A negative z is simply the mirror image. Nothing has gone wrong — the value is below average.",
          "z ที่เป็นลบก็แค่ภาพสะท้อน ไม่มีอะไรผิดพลาด ค่านั้นแค่ต่ำกว่าค่าเฉลี่ย"], set:{z:-2,m:50,sd:10}}
  ] }
],

methods:[
{id:"M-01", name:["Classify data and choose a summary","จำแนกข้อมูลและเลือกค่าสรุป"]},
{id:"M-02", name:["Find mean, median, mode","หาค่าเฉลี่ย มัธยฐาน ฐานนิยม"]},
{id:"M-03", name:["Find quartiles and percentiles","หาควอร์ไทล์และเปอร์เซ็นไทล์"]},
{id:"M-04", name:["Compute range, variance, standard deviation","หาพิสัย ความแปรปรวน ส่วนเบี่ยงเบนมาตรฐาน"]},
{id:"M-05", name:["Use z-scores and the normal curve","ใช้ค่ามาตรฐานและเส้นโค้งปกติ"]}
],

traps:{
"T-01":["The median needs the data SORTED first. The middle of an unsorted list means nothing.","มัธยฐานต้องเรียงข้อมูลก่อน ค่ากลางของรายการที่ยังไม่เรียงไม่มีความหมาย"],
"T-02":["Variance was reported where standard deviation was asked for — take the square root.","รายงานความแปรปรวนในที่ที่ถามหาส่วนเบี่ยงเบนมาตรฐาน ต้องถอดรากที่สอง"],
"T-03":["A negative z-score is perfectly normal; it means the value is below the mean.","ค่า z ที่เป็นลบเป็นเรื่องปกติ หมายความว่าค่านั้นอยู่ต่ำกว่าค่าเฉลี่ย"],
"T-04":["The summary does not suit the data type, or the outlier-sensitive measure was chosen.","ค่าสรุปไม่เหมาะกับชนิดข้อมูล หรือเลือกตัววัดที่ไวต่อค่าผิดปกติ"]
},

gen:{
"M-01": function(sf){
  var C=[{d:["shirt colour","สีเสื้อ"],a:["Qualitative","เชิงคุณภาพ"]},
         {d:["number of siblings","จำนวนพี่น้อง"],a:["Discrete quantitative","เชิงปริมาณไม่ต่อเนื่อง"]},
         {d:["height in cm","ส่วนสูงเป็นเซนติเมตร"],a:["Continuous quantitative","เชิงปริมาณต่อเนื่อง"]},
         {d:["blood type","หมู่เลือด"],a:["Qualitative","เชิงคุณภาพ"]}];
  var c=pick(C);
  if(sf==="S-04") return {stem:["Which summary can you compute for qualitative data?",
                                "ค่าสรุปใดคำนวณได้สำหรับข้อมูลเชิงคุณภาพ"],
    opts:[{v:["The mode","ฐานนิยม"],ok:1},{v:["The mean","ค่าเฉลี่ย"],trap:"T-04"},
          {v:["The standard deviation","ส่วนเบี่ยงเบนมาตรฐาน"],trap:"T-04"},
          {v:["The variance","ความแปรปรวน"],trap:"T-04"}],unit:""};
  return {stem:["What type of data is "+c.d[0]+"?","ข้อมูล"+c.d[1]+"เป็นชนิดใด"],
    opts:[{v:c.a,ok:1},{v:["Continuous quantitative","เชิงปริมาณต่อเนื่อง"],trap:"T-04"},
          {v:["Qualitative","เชิงคุณภาพ"],trap:"T-04"},{v:["Discrete quantitative","เชิงปริมาณไม่ต่อเนื่อง"],trap:"T-04"}],unit:""};
},
"M-02": function(sf){
  var S=shuffle([4,7,2,9,5,7,6]).slice(0,5);
  var srt=S.slice().sort(function(a,b){ return a-b; });
  var mean=S.reduce(function(a,b){ return a+b; },0)/S.length;
  if(sf==="S-04") return {stem:["A neighbourhood gains one very expensive house. Which summary should be reported?",
                                "ย่านหนึ่งมีบ้านราคาแพงมากเพิ่มมาหนึ่งหลัง ควรรายงานค่าสรุปใด"],
    opts:[{v:["The median — it resists outliers","มัธยฐาน เพราะทนต่อค่าผิดปกติ"],ok:1},
          {v:["The mean — it uses all the data","ค่าเฉลี่ย เพราะใช้ข้อมูลทั้งหมด"],trap:"T-04"},
          {v:["The range","พิสัย"],trap:"T-04"},
          {v:["The variance","ความแปรปรวน"],trap:"T-04"}],unit:""};
  if(sf==="S-03") return {stem:["Find the median of "+S.join(", ")+".","จงหามัธยฐานของ "+S.join(", ")],
    opts:[{v:String(srt[2]),ok:1},{v:String(S[2]),trap:"T-01"},
          {v:fmt2(mean),trap:"T-04"},{v:String(srt[0])}],unit:""};
  return {stem:["Find the mean of "+S.join(", ")+".","จงหาค่าเฉลี่ยของ "+S.join(", ")],
    opts:[{v:fmt2(mean),ok:1},{v:String(srt[2]),trap:"T-04"},
          {v:String(srt[4]-srt[0]),trap:"T-04"},{v:String(S.length)}],unit:""};
},
"M-03": function(sf){
  var q1=pick([12,15,20]), q3=q1+pick([8,10,16]);
  if(sf==="S-04") return {stem:["A student is at the 80th percentile. What does that mean?",
                                "นักเรียนคนหนึ่งอยู่ที่เปอร์เซ็นไทล์ที่ 80 หมายความว่าอย่างไร"],
    opts:[{v:["80% of the data lies below them","ข้อมูล 80% อยู่ต่ำกว่าเขา"],ok:1},
          {v:["They scored 80","เขาได้คะแนน 80"],trap:"T-04"},
          {v:["They got 80% correct","เขาตอบถูก 80%"],trap:"T-04"},
          {v:["80% scored above them","80% ได้คะแนนสูงกว่าเขา"],trap:"T-04"}],unit:""};
  if(sf==="S-03") return {stem:["Why is the IQR preferred to the range when outliers are present?",
                                "ทำไม IQR จึงดีกว่าพิสัยเมื่อมีค่าผิดปกติ"],
    opts:[{v:["It uses only the middle half, so extremes cannot distort it","ใช้เพียงครึ่งกลาง ค่าสุดขั้วจึงบิดเบือนไม่ได้"],ok:1},
          {v:["It is easier to compute","คำนวณง่ายกว่า"],trap:"T-04"},
          {v:["It uses every value","ใช้ทุกค่า"],trap:"T-04"},
          {v:["It is always larger","มีค่ามากกว่าเสมอ"],trap:"T-04"}],unit:""};
  return {stem:["Q1 = "+q1+" and Q3 = "+q3+". Find the interquartile range.",
                "Q1 = "+q1+" และ Q3 = "+q3+" จงหาพิสัยระหว่างควอร์ไทล์"],
    opts:[{v:String(q3-q1),ok:1},{v:String(q3+q1),trap:"T-04"},
          {v:fmt2((q3+q1)/2),trap:"T-04"},{v:String(q3)}],unit:""};
},
"M-04": function(sf){
  var v=pick([4,9,16,25]);
  if(sf==="S-04") return {stem:["Why are deviations squared before averaging?","ทำไมต้องยกกำลังสองส่วนเบี่ยงเบนก่อนหาค่าเฉลี่ย"],
    opts:[{v:["Raw deviations always cancel to zero","ส่วนเบี่ยงเบนดิบหักล้างกันเป็นศูนย์เสมอ"],ok:1},
          {v:["To make the numbers larger","เพื่อให้ตัวเลขใหญ่ขึ้น"],trap:"T-02"},
          {v:["It is only a convention","เป็นเพียงข้อตกลง"],trap:"T-02"},
          {v:["To remove the units","เพื่อกำจัดหน่วย"],trap:"T-02"}],unit:""};
  if(sf==="S-03") return {stem:["Why take the square root of the variance?","ทำไมต้องถอดรากที่สองของความแปรปรวน"],
    opts:[{v:["To return the answer to the original units","เพื่อพาคำตอบกลับสู่หน่วยเดิม"],ok:1},
          {v:["To make it smaller","เพื่อให้ค่าน้อยลง"],trap:"T-02"},
          {v:["To remove negatives","เพื่อกำจัดค่าลบ"],trap:"T-02"},
          {v:["It is optional","ไม่ต้องก็ได้"],trap:"T-02"}],unit:""};
  return {stem:["A data set has variance "+v+". What is its standard deviation?",
                "ชุดข้อมูลมีความแปรปรวน "+v+" ส่วนเบี่ยงเบนมาตรฐานเป็นเท่าใด"],
    opts:[{v:String(Math.sqrt(v)),ok:1},{v:String(v),trap:"T-02"},
          {v:String(v*v),trap:"T-02"},{v:fmt2(v/2)}],unit:""};
},
"M-05": function(sf){
  /* keep the offset negative so the "dropped the minus sign" distractor stays distinct */
  var m=pick([50,60,70]), s=pick([5,10]), x=m-pick([5,10,15,20]);
  var z=(x-m)/s;
  if(sf==="S-04") return {stem:["What proportion of a normal distribution lies within 2 standard deviations of the mean?",
                                "การแจกแจงปกติมีสัดส่วนเท่าใดอยู่ภายใน 2 ส่วนเบี่ยงเบนมาตรฐานจากค่าเฉลี่ย"],
    opts:[{v:"95%",ok:1},{v:"68%",trap:"T-03"},{v:"99.7%",trap:"T-03"},{v:"50%"}],unit:""};
  if(sf==="S-03") return {stem:["A z-score comes out negative. What does that tell you?",
                                "ค่า z ออกมาเป็นลบ นั่นบอกอะไร"],
    opts:[{v:["The value is below the mean","ค่านั้นอยู่ต่ำกว่าค่าเฉลี่ย"],ok:1},
          {v:["A mistake was made","คำนวณผิด"],trap:"T-03"},
          {v:["The data is not normal","ข้อมูลไม่เป็นการแจกแจงปกติ"],trap:"T-03"},
          {v:["The standard deviation is negative","ส่วนเบี่ยงเบนมาตรฐานเป็นลบ"],trap:"T-03"}],unit:""};
  return {stem:["A score of "+x+" comes from a distribution with mean "+m+" and s = "+s+". Find its z-score.",
                "คะแนน "+x+" มาจากการแจกแจงที่มีค่าเฉลี่ย "+m+" และ s = "+s+" จงหาค่า z"],
    opts:[{v:fmt2(z),ok:1},{v:fmt2(Math.abs(z)),trap:"T-03"},
          {v:fmt2(x-m),trap:"T-02"},{v:fmt2(z*z),trap:"T-02"}],unit:""};
}
}
};
