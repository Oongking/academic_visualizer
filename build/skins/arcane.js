/* ---------- skin · arcane ----------
   Physics as spellcraft: the formula is the incantation, and knowing it is
   what lets the apprentice place a spell exactly. A night sky over a ley
   line, a wizard's tower, waystones, portals, a floating island.

   The stage is a self-contained night scene, so its colours are this skin's
   own tokens (set on .lab-stage below) rather than the reading theme's; it
   reads the same on Paper, Warm, Soft Blue and Dark. Everything around the
   picture - controls, readouts, guide - keeps the reading theme. */
(function(){
  var F2 = function(n){ return fmt2(n); };

  /* deterministic scatter, so the sky is the same on every visit */
  function rng(seed){ return function(){ seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

  function star4(cx, cy, r){
    var k = r * 0.32;
    return 'M' + F2(cx) + ' ' + F2(cy - r) + ' L' + F2(cx + k) + ' ' + F2(cy - k) + ' L' + F2(cx + r) + ' ' + F2(cy) +
           ' L' + F2(cx + k) + ' ' + F2(cy + k) + ' L' + F2(cx) + ' ' + F2(cy + r) + ' L' + F2(cx - k) + ' ' + F2(cy + k) +
           ' L' + F2(cx - r) + ' ' + F2(cy) + ' L' + F2(cx - k) + ' ' + F2(cy - k) + ' Z';
  }

  SKINS.add({
    id: "arcane",
    name: ["Arcane", "เวทมนตร์"],
    ambient: true,
    spellNames: true,
    lift: { agent: 66, orb: 34, relic: 18, goal: 66, marker: 50, origin: 112, hazard: 42, perch: 14 },

    nouns: {
      agent: ["the apprentice", "นักเวทฝึกหัด"],
      fly: ["fly", "บิน"], flies: ["flies", "บิน"], flown: ["flown", "บิน"],
      origin: ["the tower", "หอคอยเวท"],
      marker: ["waystone", "หินบอกทาง"],
      markers: ["waystones", "หินบอกทาง"],
      goal: ["the portal", "ประตูมิติ"],
      hazard: ["the sleeping dragon", "มังกรน้อยที่หลับอยู่"],
      perch: ["the floating island", "เกาะลอยฟ้า"],
      heavy: ["the runestone", "หินรูน"],
      light: ["the gem", "อัญมณี"],
      push: ["the gust sigil", "ตราเวทลม"],
      brake: ["the slowing charm", "คาถาหน่วง"],
      clock: ["the hourglass", "นาฬิกาทราย"],
      world: ["the ley line", "สายพลังเวท"]
    },

    ui: {
      labTitle: ["Spell", "เวท"],
      spell: ["Incantation", "บทร่าย"],
      terms: ["Terms of the spell", "พจน์ในบทร่าย"],
      trials: ["Trials ✦", "บททดสอบ ✦"],
      cast: ["Cast the spell", "ร่ายเวท"],
      newTrial: ["New trial", "บททดสอบใหม่"],
      solved: ["mastered", "ผ่านแล้ว"]
    },

    defs:
      '<linearGradient id="ak-sky" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#0b0a26"/><stop offset=".55" stop-color="#1d1650"/><stop offset="1" stop-color="#3a2a6e"/></linearGradient>' +
      '<radialGradient id="ak-orb" cx=".38" cy=".35" r=".7">' +
        '<stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#b8f4ff"/><stop offset="1" stop-color="#2a8fd0"/></radialGradient>' +
      '<radialGradient id="ak-aura"><stop offset="0" stop-color="#7fe3ff" stop-opacity=".55"/>' +
        '<stop offset="1" stop-color="#7fe3ff" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="ak-portal"><stop offset="0" stop-color="#e9fff2" stop-opacity=".95"/>' +
        '<stop offset=".5" stop-color="#7ff0b8" stop-opacity=".55"/><stop offset="1" stop-color="#5a3fd0" stop-opacity=".15"/></radialGradient>' +
      '<radialGradient id="ak-moon"><stop offset="0" stop-color="#fff4cf" stop-opacity=".45"/>' +
        '<stop offset="1" stop-color="#fff4cf" stop-opacity="0"/></radialGradient>' +
      '<filter id="ak-glow" x="-60%" y="-60%" width="220%" height="220%">' +
        '<feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',

    css:
      '.lab[data-skin="arcane"] .lab-stage{--ink:#f1edff;--ink-soft:#d3ccf5;--ink-faint:#aaa2da;--rule:#4d4789;' +
        '--accent:#7fe3ff;--accent2:#ff9bd2;--good:#9cf5b5;--warn:#ffcf6e;--ground:#100c28;--surface:#1a1542;background:#0d0b2a}' +
      '.lab[data-skin="arcane"] .ak-tw{animation:ak-tw 3.4s ease-in-out infinite}' +
      '@keyframes ak-tw{0%,100%{opacity:.2}50%{opacity:1}}' +
      '.lab[data-skin="arcane"] .spell{--accent:#7fe3ff;--accent2:#ff9bd2;--good:#9cf5b5;--warn:#ffcf6e;--ink:#f1edff;' +
        '--ink-soft:#d3ccf5;--ink-faint:#aaa2da;background:linear-gradient(180deg,#1a1542,#110d2e);color:#f1edff;' +
        'border-top:1px solid #3d3778;border-bottom:1px solid #3d3778}' +
      '.lab[data-skin="arcane"] .spell .term{background:#120e30;color:#f1edff}' +
      '.lab[data-skin="arcane"] .spell .term small{color:#aaa2da}' +
      '.lab[data-skin="arcane"] .spell-k{color:#ffcf6e}' +
      '.lab[data-skin="arcane"] .spell-k::before{content:"✦ "}',

    backdrop: function(o, w, h, opt){
      var r = rng(7), div = opt.div || 250;
      o.push('<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="#0d0b2a"/>');
      o.push('<rect x="0" y="0" width="' + w + '" height="' + (div - 30) + '" fill="url(#ak-sky)"/>');
      /* stars */
      for(var i = 0; i < 70; i++){
        var sx = r() * w, sy = 30 + r() * (div - 110), sr = 0.5 + r() * 1.1;
        o.push('<circle class="ak-tw" cx="' + F2(sx) + '" cy="' + F2(sy) + '" r="' + F2(sr) + '" fill="#fff" ' +
               'style="animation-delay:' + F2(-r() * 3.4) + 's"/>');
      }
      for(var j = 0; j < 5; j++){
        var bx = 40 + r() * (w - 80), by = 40 + r() * 90;
        o.push('<path class="ak-tw" d="' + star4(bx, by, 3.4) + '" fill="#fff6d8" style="animation-delay:' + F2(-r() * 3.4) + 's"/>');
      }
      /* a faint constellation */
      o.push('<path d="M70 70 L104 58 L132 74 L160 62 M104 58 L112 40" stroke="#bfb6ff" stroke-width=".6" opacity=".35" fill="none"/>');
      /* moon */
      o.push('<circle cx="498" cy="62" r="34" fill="url(#ak-moon)"/>');
      o.push('<path d="M498 46 A16 16 0 1 0 498 78 A12.5 12.5 0 1 1 498 46 Z" fill="#fff4cf"/>');
      /* far mountains and a castle */
      var g = 214;
      o.push('<path d="M0 ' + (g - 26) + ' L46 ' + (g - 60) + ' L88 ' + (g - 34) + ' L140 ' + (g - 78) + ' L196 ' + (g - 30) +
             ' L250 ' + (g - 52) + ' L318 ' + (g - 22) + ' L380 ' + (g - 66) + ' L446 ' + (g - 28) + ' L500 ' + (g - 58) +
             ' L560 ' + (g - 24) + ' L560 ' + g + ' L0 ' + g + ' Z" fill="#1a1442"/>');
      o.push('<path d="M396 ' + (g - 66) + ' v-14 h4 v6 h5 v-12 l3 -6 l3 6 v12 h5 v-6 h4 v14 z" fill="#1a1442"/>');
      o.push('<rect x="406" y="' + (g - 80) + '" width="2" height="3" fill="#ffcf6e" opacity=".8"/>');
      o.push('<path d="M0 ' + (g - 8) + ' Q70 ' + (g - 30) + ' 150 ' + (g - 12) + ' T320 ' + (g - 14) + ' T560 ' + (g - 10) +
             ' L560 ' + g + ' L0 ' + g + ' Z" fill="#141036"/>');
      /* meadow under the line */
      o.push('<rect x="0" y="' + g + '" width="' + w + '" height="' + (div - g) + '" fill="#100c28"/>');
      /* the scrying glass the instrument sits in */
      o.push('<rect x="12" y="' + (div + 6) + '" width="' + (w - 24) + '" height="' + (h - div - 14) + '" rx="10" fill="#0a0820" stroke="#3d3778"/>');
      [[22, div + 16], [w - 22, div + 16], [22, h - 18], [w - 22, h - 18]].forEach(function(c){
        o.push('<path d="' + star4(c[0], c[1], 4) + '" fill="#6f66c0"/>');
      });
    },

    ground: function(o, x1, x2, y){
      o.push('<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="#7fe3ff" stroke-width="6" opacity=".16"/>');
      o.push('<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="#7fe3ff" stroke-width="1.6" opacity=".9"/>');
      for(var x = x1 + 9; x < x2; x += 37)
        o.push('<path d="M' + x + ' ' + y + ' l2 -5 l1.5 5 l2 -3.5 l1 3.5" fill="none" stroke="#3fa36b" stroke-width="1" opacity=".6"/>');
    },

    agent: function(o, x, y, opt){
      var d = opt.flip ? -1 : 1, c = opt.clock || 0;
      var bob = Math.sin(c * 3.1) * 2, wave = Math.sin(c * 7) * 2;
      o.push('<ellipse cx="' + F2(x) + '" cy="' + F2(y + 2) + '" rx="16" ry="3" fill="#000" opacity=".4"/>');
      o.push('<g transform="translate(' + F2(x) + ' ' + F2(y - 16 + bob) + ') scale(' + d + ' 1)">');
      if(opt.moving){
        o.push('<circle cx="-40" cy="-1" r="2.4" fill="#7fe3ff" opacity=".7"/>');
        o.push('<circle cx="-50" cy="2" r="1.6" fill="#7fe3ff" opacity=".45"/>');
        o.push('<circle cx="-58" cy="-2" r="1.1" fill="#7fe3ff" opacity=".25"/>');
      }
      o.push('<path d="M-20 0 L-36 -7 L-38 0 L-36 7 Z" fill="#e8b85c" stroke="#9c6b2c" stroke-width="1"/>');
      o.push('<rect x="-21" y="-2.5" width="4" height="5" fill="#9c6b2c"/>');
      o.push('<line x1="-18" y1="0" x2="22" y2="-3" stroke="#b07a40" stroke-width="2.6" stroke-linecap="round"/>');
      o.push('<path d="M-1 -21 q-8 ' + F2(2 + wave) + ' -16 ' + F2(-1 + wave) + ' q-6 -2 -10 ' + F2(3 - wave) +
             '" stroke="#ff8fc7" stroke-width="2.6" fill="none" stroke-linecap="round"/>');
      o.push('<path d="M-10 -1 C-12 -14 -6 -24 1 -25 C7 -24 10 -16 9 -1 Z" fill="#6c4ce0" stroke="#a48cff" stroke-width="1"/>');
      o.push('<path d="M4 -2 L12 4 L16 4" stroke="#2e2273" stroke-width="3" fill="none" stroke-linecap="round"/>');
      o.push('<path d="M5 -18 L14 -14" stroke="#6c4ce0" stroke-width="3.2" stroke-linecap="round"/>');
      o.push('<line x1="13" y1="-14" x2="25" y2="-21" stroke="#5b3b1d" stroke-width="1.8" stroke-linecap="round"/>');
      o.push('<circle cx="25" cy="-21" r="2.6" fill="#fff" filter="url(#ak-glow)"/>');
      o.push('<circle cx="2" cy="-29" r="5" fill="#ffd9b8"/>');
      o.push('<circle cx="4.6" cy="-29.6" r=".95" fill="#2a1f4d"/>');
      o.push('<ellipse cx="1" cy="-33" rx="9" ry="2.2" fill="#2e2273"/>');
      o.push('<path d="M-5 -33 L7 -33 L3 -46 Q1 -52 -7 -53 Q-1 -48 -5 -33 Z" fill="#3b2c8f" stroke="#a48cff" stroke-width=".8"/>');
      o.push('<path d="' + star4(1, -39, 2.6) + '" fill="#ffd36e"/>');
      o.push('</g>');
    },

    orb: function(o, x, y, opt){
      var r = opt.size || 8, c = opt.clock || 0, cy = y - r - 10;
      o.push('<ellipse cx="' + F2(x) + '" cy="' + F2(y + 2) + '" rx="' + F2(r * 1.2) + '" ry="2.6" fill="#7fe3ff" opacity=".22"/>');
      o.push('<circle cx="' + F2(x) + '" cy="' + F2(cy) + '" r="' + F2(r * 2.3) + '" fill="url(#ak-aura)"/>');
      o.push('<circle cx="' + F2(x) + '" cy="' + F2(cy) + '" r="' + F2(r) + '" fill="url(#ak-orb)"/>');
      for(var i = 0; i < 2; i++){
        var a = c * 3 + i * Math.PI;
        o.push('<circle cx="' + F2(x + Math.cos(a) * r * 1.6) + '" cy="' + F2(cy + Math.sin(a) * r * 0.6) + '" r="1.4" fill="#fff"/>');
      }
    },

    relic: function(o, x, y, opt){
      if(opt.variant === "light"){
        o.push('<circle cx="' + F2(x) + '" cy="' + F2(y) + '" r="11" fill="url(#ak-aura)"/>');
        o.push('<path d="M' + F2(x) + ' ' + F2(y - 6) + ' L' + F2(x + 4.5) + ' ' + F2(y) + ' L' + F2(x) + ' ' + F2(y + 6) +
               ' L' + F2(x - 4.5) + ' ' + F2(y) + ' Z" fill="#ff9bd2" stroke="#fff" stroke-width=".8" filter="url(#ak-glow)"/>');
        return;
      }
      var p = '';
      for(var i = 0; i < 6; i++){
        var a = Math.PI / 6 + i * Math.PI / 3;
        p += (i ? ' L' : 'M') + F2(x + Math.cos(a) * 11) + ' ' + F2(y + Math.sin(a) * 11);
      }
      o.push('<path d="' + p + ' Z" fill="#4f4888" stroke="#a9a1e6" stroke-width="1.2"/>');
      o.push('<path d="M' + F2(x) + ' ' + F2(y - 6) + ' V' + F2(y + 6) + ' M' + F2(x) + ' ' + F2(y - 3) + ' l4 3 M' + F2(x) + ' ' + F2(y + 1) +
             ' l-4 3" stroke="#7fe3ff" stroke-width="1.5" fill="none" filter="url(#ak-glow)"/>');
    },

    origin: function(o, x, y){
      o.push('<path d="M' + (x - 11) + ' ' + y + ' L' + (x - 9) + ' ' + (y - 62) + ' L' + (x + 9) + ' ' + (y - 62) + ' L' + (x + 11) + ' ' + y +
             ' Z" fill="#2a2459" stroke="#5d55a5"/>');
      [16, 32, 48].forEach(function(k){
        o.push('<line x1="' + (x - 10) + '" y1="' + (y - k) + '" x2="' + (x + 10) + '" y2="' + (y - k) + '" stroke="#3d3678"/>');
      });
      o.push('<path d="M' + (x - 4) + ' ' + y + ' V' + (y - 9) + ' A4 4 0 0 1 ' + (x + 4) + ' ' + (y - 9) + ' V' + y + ' Z" fill="#120e2e"/>');
      o.push('<rect x="' + (x - 3) + '" y="' + (y - 45) + '" width="6" height="9" rx="3" fill="#ffcf6e" filter="url(#ak-glow)"/>');
      o.push('<path d="M' + (x - 15) + ' ' + (y - 62) + ' L' + x + ' ' + (y - 94) + ' L' + (x + 15) + ' ' + (y - 62) + ' Z" fill="#5a35b0" stroke="#a48cff"/>');
      o.push('<line x1="' + x + '" y1="' + (y - 94) + '" x2="' + x + '" y2="' + (y - 104) + '" stroke="#a48cff" stroke-width="1.2"/>');
      o.push('<path d="M' + x + ' ' + (y - 104) + ' l10 3 l-10 3 z" fill="#ff8fc7"/>');
    },

    marker: function(o, x, y, opt){
      var on = opt.on, rc = on ? "#7fe3ff" : "#8a82c8";
      o.push('<ellipse cx="' + F2(x) + '" cy="' + F2(y) + '" rx="11" ry="2.5" fill="#3fa36b" opacity=".45"/>');
      o.push('<path d="M' + F2(x - 8) + ' ' + y + ' L' + F2(x - 7) + ' ' + (y - 30) + ' Q' + F2(x - 6) + ' ' + (y - 38) + ' ' + F2(x) + ' ' + (y - 39) +
             ' Q' + F2(x + 6) + ' ' + (y - 38) + ' ' + F2(x + 7) + ' ' + (y - 30) + ' L' + F2(x + 8) + ' ' + y + ' Z" fill="#3a3570" stroke="#6c64b0"/>');
      o.push('<path d="M' + F2(x) + ' ' + (y - 31) + ' V' + (y - 13) + ' M' + F2(x) + ' ' + (y - 27) + ' l5 4 M' + F2(x) + ' ' + (y - 20) +
             ' l-5 4" stroke="' + rc + '" stroke-width="1.7" fill="none"' + (on ? ' filter="url(#ak-glow)"' : '') + '/>');
    },

    goal: function(o, x, y, opt){
      var c = opt.clock || 0, cy = y - 30, col = opt.on ? "#9cf5b5" : "#7fe3ff";
      o.push('<ellipse cx="' + F2(x) + '" cy="' + y + '" rx="15" ry="3" fill="' + col + '" opacity=".3"/>');
      o.push('<ellipse cx="' + F2(x) + '" cy="' + cy + '" rx="12" ry="27" fill="url(#ak-portal)" opacity="' + (opt.on ? 1 : .75) + '"/>');
      o.push('<ellipse cx="' + F2(x) + '" cy="' + cy + '" rx="13" ry="28" fill="none" stroke="' + col + '" stroke-width="3" ' +
             'stroke-dasharray="11 5" stroke-dashoffset="' + F2(-c * 28) + '" filter="url(#ak-glow)"/>');
      for(var i = 0; i < 3; i++){
        var a = c * 2 + i * 2.1;
        o.push('<path d="' + star4(x + Math.cos(a) * 18, cy + Math.sin(a) * 32, 2.4) + '" fill="#fff" opacity=".85"/>');
      }
    },

    hazard: function(o, x, y, opt){
      var c = opt.clock || 0, aw = opt.awake;
      o.push('<ellipse cx="' + F2(x) + '" cy="' + F2(y + 1) + '" rx="22" ry="3" fill="#000" opacity=".35"/>');
      o.push('<path d="M' + F2(x - 15) + ' ' + F2(y - 7) + ' q-13 2 -11 -9 q2 -5 7 -3" stroke="#3fa36b" stroke-width="4" fill="none" stroke-linecap="round"/>');
      o.push('<ellipse cx="' + F2(x) + '" cy="' + F2(y - 9) + '" rx="17" ry="9" fill="#3fa36b" stroke="#1f6b41"/>');
      o.push('<ellipse cx="' + F2(x + 2) + '" cy="' + F2(y - 5) + '" rx="10" ry="3.6" fill="#a6e4b5"/>');
      o.push('<path d="M' + F2(x - 4) + ' ' + F2(y - 15) + ' q4 -15 15 -11 q-4 2 -3 6 q-5 -1 -12 5z" fill="#2f8a59" stroke="#1f6b41"/>');
      o.push('<circle cx="' + F2(x + 15) + '" cy="' + F2(y - 15) + '" r="7.5" fill="#3fa36b" stroke="#1f6b41"/>');
      o.push('<ellipse cx="' + F2(x + 21) + '" cy="' + F2(y - 13) + '" rx="4.4" ry="3.2" fill="#4fb57b"/>');
      o.push('<path d="M' + F2(x + 11) + ' ' + F2(y - 21) + ' l-2 -7 l6 5z" fill="#ffe6a8"/>');
      if(aw){
        o.push('<circle cx="' + F2(x + 16) + '" cy="' + F2(y - 17) + '" r="2.4" fill="#fff"/>');
        o.push('<circle cx="' + F2(x + 16.8) + '" cy="' + F2(y - 17) + '" r="1.2" fill="#2a1f4d"/>');
        o.push('<text x="' + F2(x + 28) + '" y="' + F2(y - 26) + '" fill="#ffcf6e" font-family="IBM Plex Sans" font-size="15" font-weight="700">!</text>');
      } else {
        o.push('<path d="M' + F2(x + 14) + ' ' + F2(y - 17) + ' q2 2 4 0" stroke="#123" fill="none" stroke-width="1.3"/>');
        var zy = (c * 7) % 12;
        o.push('<text x="' + F2(x + 24) + '" y="' + F2(y - 24 - zy) + '" fill="#d3ccf5" font-family="IBM Plex Sans" font-size="9" opacity="' +
               F2(1 - zy / 12) + '">z</text>');
        o.push('<text x="' + F2(x + 30) + '" y="' + F2(y - 32 - zy) + '" fill="#d3ccf5" font-family="IBM Plex Sans" font-size="11" opacity="' +
               F2(0.8 - zy / 15) + '">Z</text>');
      }
    },

    perch: function(o, x, y, opt){
      var w = opt.w || 130, hw = w / 2;
      o.push('<path d="M' + F2(x - hw) + ' ' + F2(y) + ' L' + F2(x + hw) + ' ' + F2(y) + ' L' + F2(x + w / 4) + ' ' + F2(y + 16) +
             ' L' + F2(x + w / 10) + ' ' + F2(y + 30) + ' L' + F2(x) + ' ' + F2(y + 42) + ' L' + F2(x - w / 8) + ' ' + F2(y + 28) +
             ' L' + F2(x - w / 3) + ' ' + F2(y + 14) + ' Z" fill="#2d2758" stroke="#554d99"/>');
      o.push('<path d="' + star4(x - w / 8, y + 22, 3) + '" fill="#7fe3ff" filter="url(#ak-glow)"/>');
      o.push('<path d="' + star4(x + w / 6, y + 12, 2.4) + '" fill="#ff9bd2" filter="url(#ak-glow)"/>');
      o.push('<line x1="' + F2(x - hw) + '" y1="' + F2(y) + '" x2="' + F2(x + hw) + '" y2="' + F2(y) + '" stroke="#3fa36b" stroke-width="4" stroke-linecap="round"/>');
      o.push('<line x1="' + F2(x - hw + 18) + '" y1="' + F2(y) + '" x2="' + F2(x - hw + 18) + '" y2="' + F2(y - 16) + '" stroke="#6b4a2b" stroke-width="2.4"/>');
      o.push('<circle cx="' + F2(x - hw + 18) + '" cy="' + F2(y - 21) + '" r="9" fill="#2f8a59"/>');
      o.push('<path d="M' + F2(x + hw - 6) + ' ' + F2(y) + ' q2 10 -2 18" stroke="#3fa36b" stroke-width="1.2" fill="none"/>');
    },

    vector: function(o, x1, y1, x2, y2, opt){
      var ang = Math.atan2(y2 - y1, x2 - x1), hl = 9, c = opt.col;
      o.push('<line x1="' + F2(x1) + '" y1="' + F2(y1) + '" x2="' + F2(x2) + '" y2="' + F2(y2) + '" stroke="' + c + '" stroke-width="' + (opt.hl ? 9 : 6) + '" opacity=".22" stroke-linecap="round"/>');
      o.push('<line x1="' + F2(x1) + '" y1="' + F2(y1) + '" x2="' + F2(x2) + '" y2="' + F2(y2) + '" stroke="' + c + '" stroke-width="' + (opt.hl ? 3.6 : 2.6) + '" stroke-linecap="round"/>');
      if(Math.abs(x2 - x1) + Math.abs(y2 - y1) > 4)
        o.push('<path d="M' + F2(x2 + 2 * Math.cos(ang)) + ' ' + F2(y2 + 2 * Math.sin(ang)) + ' L' + F2(x2 - hl * Math.cos(ang - .5)) + ' ' + F2(y2 - hl * Math.sin(ang - .5)) +
               ' L' + F2(x2 - hl * Math.cos(ang + .5)) + ' ' + F2(y2 - hl * Math.sin(ang + .5)) + ' Z" fill="' + c + '"/>');
    },

    trail: function(o, d, opt){
      o.push('<path d="' + d + '" fill="none" stroke="' + opt.col + '" stroke-width="' + (opt.hl ? 9 : 6) + '" opacity=".14" stroke-linecap="round" stroke-linejoin="round"/>');
      o.push('<path d="' + d + '" fill="none" stroke="' + opt.col + '" stroke-width="' + (opt.hl ? 3.4 : 2.2) +
             '" stroke-dasharray="' + (opt.dash || "1 6") + '" stroke-linecap="round" stroke-linejoin="round"/>');
    },

    measure: function(o, x1, x2, y, lab, c){ dim(o, x1, x2, y, lab, c); },

    halo: function(o, x, y){
      o.push('<circle cx="' + F2(x) + '" cy="' + F2(y) + '" r="34" fill="url(#ak-aura)"/>');
    },

    handle: function(o, x, y, opt){
      var c = opt.col || "#7fe3ff", r = opt.active ? 14 : 11.5, rot = (opt.clock || 0) * 50 % 360;
      o.push('<circle cx="' + F2(x) + '" cy="' + F2(y) + '" r="' + (r + 6) + '" fill="url(#ak-aura)"/>');
      o.push('<circle cx="' + F2(x) + '" cy="' + F2(y) + '" r="' + r + '" fill="#120e30" fill-opacity=".7" stroke="' + c +
             '" stroke-width="1.8" stroke-dasharray="4 3" transform="rotate(' + F2(rot) + ' ' + F2(x) + ' ' + F2(y) + ')"/>');
      o.push('<path d="' + star4(x, y, opt.active ? 6.5 : 5) + '" fill="' + c + '" filter="url(#ak-glow)"/>');
    },

    spark: function(o, x, y, life, c){
      o.push('<path d="' + star4(x, y, 1.5 + 3.5 * life) + '" fill="' + c + '" opacity="' + F2(Math.min(1, life * 1.4)) + '"/>');
    }
  });
})();
