/* ---------- skin · classic ----------
   The course's original look: quiet silhouettes in the reading theme's own
   colours, no backdrop, no ambient motion. It is also the fallback every
   other skin inherits a role from when it leaves that role out, so it must
   implement them all. */
SKINS.add({
  id: "classic",
  name: ["Classic", "คลาสสิก"],
  ambient: false,
  spellNames: false,
  lift: { agent: 42, orb: 16, relic: 18, goal: 52, marker: 60, origin: 60, hazard: 34, perch: 16 },

  nouns: {
    agent: ["the rider", "คนขี่"],
    fly: ["ride", "ขี่"], flies: ["rides", "ขี่"], flown: ["ridden", "ขี่"],
    origin: ["home", "บ้าน"],
    marker: ["post", "เสา"],
    markers: ["posts", "เสา"],
    goal: ["the finish line", "เส้นชัย"],
    hazard: ["the child on the crossing", "เด็กบนทางม้าลาย"],
    perch: ["the branch", "กิ่งไม้"],
    heavy: ["the mango", "มะม่วง"],
    light: ["the coin", "เหรียญ"],
    push: ["the throttle", "คันเร่ง"],
    brake: ["the brakes", "เบรก"],
    clock: ["the stopwatch", "นาฬิกาจับเวลา"],
    world: ["the road", "ถนน"]
  },

  ui: {
    labTitle: ["Lab", "ห้องทดลอง"],
    spell: ["Formula", "สูตร"],
    terms: ["Formula terms", "พจน์ในสูตร"],
    trials: ["Challenges", "โจทย์ท้าทาย"],
    cast: ["Run it", "ทดลอง"],
    newTrial: ["New challenge", "โจทย์ใหม่"],
    solved: ["solved", "ทำได้"],
    predict: ["Predict first", "ทำนายก่อน"],
    predictAgain: ["Predict again", "ทำนายอีกครั้ง"],
    reveal: ["Run and reveal", "ทดลองและเฉลย"],
    endPredict: ["Done", "เสร็จ"],
    lastRun: ["last run", "ครั้งก่อน"],
    foresight: ["correct", "ถูก"],
    trueSight: ["Spot on!", "แม่นยำ!"],
    notQuite: ["Not quite.", "ยังไม่ใช่"],
    yourGuess: ["your prediction", "คำทำนายของคุณ"],
    tapLine: ["Tap or drag on the scene to mark it (or focus the picture and use the arrow keys).",
              "แตะหรือลากบนภาพเพื่อปักหมุด (หรือโฟกัสที่ภาพแล้วใช้ปุ่มลูกศร)"],
    tapHeight: ["Tap or drag on the scene to mark the height (or focus the picture and use the arrow keys).",
                "แตะหรือลากบนภาพเพื่อปักความสูง (หรือโฟกัสที่ภาพแล้วใช้ปุ่มลูกศร)"],
    kbdHelp: ["Interactive scene. Arrow keys move the ringed handle; Enter or Space selects the next handle.",
              "ฉากโต้ตอบ ปุ่มลูกศรเลื่อนจุดที่มีวงล้อม ปุ่ม Enter หรือเว้นวรรคเลือกจุดถัดไป"]
  },

  backdrop: function(o, w, h){ },

  ground: function(o, x1, x2, y){
    o.push('<rect x="' + x1 + '" y="' + (y - 2) + '" width="' + (x2 - x1) + '" height="16" fill="var(--ink)" opacity=".055"/>');
    o.push('<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="var(--ink-soft)" stroke-width="1.6"/>');
  },

  agent: function(o, x, y, opt){ FIG.moto(o, x, y, opt.col, opt.flip); },
  orb:   function(o, x, y, opt){ FIG.ball(o, x, y - (opt.size || 7), opt.col, opt.size || 7); },
  relic: function(o, x, y, opt){ FIG.ball(o, x, y, opt.col, opt.variant === "light" ? 4 : 9); },
  marker: function(o, x, y, opt){ FIG.post(o, x, y, opt.on ? "var(--accent)" : "var(--ink-faint)"); },

  origin: function(o, x, y){
    o.push('<path d="M' + (x - 12) + ' ' + y + ' V' + (y - 22) + ' L' + x + ' ' + (y - 36) + ' L' + (x + 12) + ' ' + (y - 22) +
           ' V' + y + ' Z" fill="none" stroke="var(--ink-faint)" stroke-width="1.8" stroke-linejoin="round"/>');
    o.push('<rect x="' + (x - 3.5) + '" y="' + (y - 11) + '" width="7" height="11" fill="var(--ink-faint)"/>');
  },

  goal: function(o, x, y, opt){
    var c = opt.on ? "var(--good)" : "var(--ink-soft)";
    o.push('<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y - 44) + '" stroke="' + c + '" stroke-width="2"/>');
    o.push('<path d="M' + x + ' ' + (y - 44) + ' l18 6 l-18 6 z" fill="' + c + '"/>');
  },

  hazard: function(o, x, y, opt){
    FIG.zebra(o, x, y, null, 30);
    var c = opt.awake ? "var(--warn)" : "var(--ink-soft)";
    o.push('<circle cx="' + x + '" cy="' + (y - 25) + '" r="4" fill="' + c + '"/>');
    o.push('<path d="M' + x + ' ' + (y - 20) + ' V' + (y - 9) + ' M' + (x - 6) + ' ' + (y - 16) + ' H' + (x + 6) +
           ' M' + x + ' ' + (y - 9) + ' l-4 9 M' + x + ' ' + (y - 9) + ' l4 9" stroke="' + c + '" stroke-width="2" fill="none"/>');
  },

  perch: function(o, x, y, opt){
    var w = opt.w || 120;
    o.push('<path d="M' + (x - w / 2) + ' ' + y + ' Q' + x + ' ' + (y - 6) + ' ' + (x + w / 2) + ' ' + (y + 2) +
           '" fill="none" stroke="var(--ink-faint)" stroke-width="4" stroke-linecap="round"/>');
    o.push('<path d="M' + (x + w / 2 - 20) + ' ' + y + ' q12 -18 26 -6 q-10 10 -26 6z" fill="var(--good)" opacity=".3"/>');
  },

  vector: function(o, x1, y1, x2, y2, opt){
    var ang = Math.atan2(y2 - y1, x2 - x1), hl = 8, w = opt.hl ? 3.4 : 2.2;
    o.push('<line x1="' + fmt2(x1) + '" y1="' + fmt2(y1) + '" x2="' + fmt2(x2) + '" y2="' + fmt2(y2) + '" stroke="' + opt.col + '" stroke-width="' + w + '"/>');
    if(Math.abs(x2 - x1) + Math.abs(y2 - y1) > 4)
      o.push('<path d="M' + fmt2(x2) + ' ' + fmt2(y2) + ' L' + fmt2(x2 - hl * Math.cos(ang - .45)) + ' ' + fmt2(y2 - hl * Math.sin(ang - .45)) +
             ' L' + fmt2(x2 - hl * Math.cos(ang + .45)) + ' ' + fmt2(y2 - hl * Math.sin(ang + .45)) + ' Z" fill="' + opt.col + '"/>');
  },

  trail: function(o, d, opt){
    o.push('<path d="' + d + '" fill="none" stroke="' + opt.col + '" stroke-width="' + (opt.hl ? 3 : 1.5) +
           '" stroke-dasharray="' + (opt.dash || "4 4") + '" opacity=".8"/>');
  },

  measure: function(o, x1, x2, y, lab, c){ dim(o, x1, x2, y, lab, c); },

  halo: function(o, x, y){
    o.push('<circle cx="' + fmt2(x) + '" cy="' + fmt2(y) + '" r="26" fill="var(--accent)" opacity=".12"/>');
  },

  handle: function(o, x, y, opt){
    o.push('<circle cx="' + fmt2(x) + '" cy="' + fmt2(y) + '" r="' + (opt.active ? 11 : 9) + '" fill="var(--surface)" stroke="' +
           (opt.col || "var(--accent)") + '" stroke-width="2" stroke-dasharray="3 2"/>');
    o.push('<circle cx="' + fmt2(x) + '" cy="' + fmt2(y) + '" r="3" fill="' + (opt.col || "var(--accent)") + '"/>');
  },

  /* a ball in flight, drawn about its centre */
  fireball: function(o, x, y, opt){
    o.push('<circle cx="' + fmt2(x) + '" cy="' + fmt2(y) + '" r="' + (opt.size || 6) + '" fill="' + (opt.col || "var(--accent)") + '"/>');
  },

  /* a wall standing on the ground at x, opt.h pixels tall, with a gap
     (opt.gapY centre, opt.gapR half-height) a body can pass through */
  wall: function(o, x, y, opt){
    var top = y - opt.h, c = "var(--ink-soft)";
    if(opt.gapY != null){
      o.push('<rect x="' + fmt2(x - 6) + '" y="' + fmt2(top) + '" width="12" height="' + fmt2(Math.max(0, opt.gapY - opt.gapR - top)) + '" fill="' + c + '" opacity=".5"/>');
      o.push('<rect x="' + fmt2(x - 6) + '" y="' + fmt2(opt.gapY + opt.gapR) + '" width="12" height="' + fmt2(Math.max(0, y - opt.gapY - opt.gapR)) + '" fill="' + c + '" opacity=".5"/>');
      o.push('<rect x="' + fmt2(x - 6) + '" y="' + fmt2(opt.gapY - opt.gapR) + '" width="12" height="' + fmt2(2 * opt.gapR) + '" fill="none" stroke="' +
             (opt.on ? "var(--good)" : "var(--accent)") + '" stroke-width="2"/>');
    } else o.push('<rect x="' + fmt2(x - 6) + '" y="' + fmt2(top) + '" width="12" height="' + fmt2(opt.h) + '" fill="' + c + '" opacity=".5"/>');
  },

  prophecy: function(o, x, y, opt){
    var c = opt.done ? (opt.hit ? "var(--good)" : "var(--warn)") : "var(--accent2)";
    if(opt.tower){
      o.push('<line x1="' + fmt2(x - 30) + '" y1="' + fmt2(y) + '" x2="' + fmt2(x + 250) + '" y2="' + fmt2(y) +
             '" stroke="' + c + '" stroke-width="2" stroke-dasharray="6 4"/>');
      o.push('<path d="M' + fmt2(x - 30) + ' ' + fmt2(y - 7) + ' l12 7 l-12 7z" fill="' + c + '"/>');
      return;
    }
    o.push('<line x1="' + fmt2(x) + '" y1="' + fmt2(y) + '" x2="' + fmt2(x) + '" y2="' + fmt2(y - 66) +
           '" stroke="' + c + '" stroke-width="2" stroke-dasharray="4 3"/>');
    o.push('<path d="M' + fmt2(x) + ' ' + fmt2(y - 66) + ' l16 6 l-16 6z" fill="' + c + '"/>');
    o.push('<circle cx="' + fmt2(x) + '" cy="' + fmt2(y) + '" r="' + (opt.active ? 5 : 3.5) + '" fill="' + c + '"/>');
  },

  spark: function(o, x, y, life, c){
    o.push('<circle cx="' + fmt2(x) + '" cy="' + fmt2(y) + '" r="' + fmt2(1 + 2.5 * life) + '" fill="' + c + '" opacity="' + fmt2(life) + '"/>');
  }
});
