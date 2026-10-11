/* ---------- skin · dawn ----------
   Arcane at first light: the same apprentice, towers, portals and wisps,
   on a pale sunrise for long study sessions. It is a small skin on purpose:
   it borrows every role from arcane and redraws only the backdrop, the
   colour tokens, and the few parts arcane draws in light-on-dark colours.
   Copy this file to see how little a new style needs. */
(function(){
  var A = SKINS.by.arcane;
  if(!A) return;
  var F2 = function(n){ return fmt2(n); };

  var dawn = {};
  for(var k in A) dawn[k] = A[k];

  dawn.id = "dawn";
  dawn.name = ["Arcane dawn", "รุ่งอรุณเวท"];

  /* arcane's gradients and glow, with a sunrise in place of the night sky */
  dawn.defs = A.defs.replace(
    /<linearGradient id="ak-sky"[\s\S]*?<\/linearGradient>/,
    '<linearGradient id="ak-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#c9dcff"/><stop offset=".55" stop-color="#f3dcf2"/><stop offset="1" stop-color="#ffe2c2"/></linearGradient>') +
    '<radialGradient id="dn-sun"><stop offset="0" stop-color="#fff6d6"/><stop offset=".45" stop-color="#ffd9a0" stop-opacity=".8"/>' +
    '<stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/></radialGradient>';

  dawn.css =
    '.lab[data-skin="dawn"] .lab-stage{--ink:#2b2350;--ink-soft:#463c74;--ink-faint:#6b6194;--rule:#b7acd9;' +
      '--accent:#13789f;--accent2:#b0337c;--good:#1f7a45;--warn:#9a5a12;--ground:#fbf5ff;--surface:#fffaf3;background:#f6eee6}' +
    '.lab[data-skin="dawn"] .spell{--accent:#13789f;--accent2:#b0337c;--good:#1f7a45;--warn:#9a5a12;--ink:#2b2350;' +
      '--ink-soft:#463c74;--ink-faint:#6b6194;background:linear-gradient(180deg,#f3e9ff,#fbf3ea);color:#2b2350;' +
      'border-top:1px solid #d9cdf2;border-bottom:1px solid #d9cdf2}' +
    '.lab[data-skin="dawn"] .spell .term{background:#fffaf3;color:#2b2350}' +
    '.lab[data-skin="dawn"] .spell-k{color:#9a5a12}' +
    '.lab[data-skin="dawn"] .spell-k::before{content:"☀ "}';

  dawn.backdrop = function(o, w, h, opt){
    var div = opt.div || 250, g = 214;
    o.push('<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="#f6eee6"/>');
    o.push('<rect x="0" y="0" width="' + w + '" height="' + (div - 30) + '" fill="url(#ak-sky)"/>');
    o.push('<circle cx="470" cy="150" r="70" fill="url(#dn-sun)"/>');
    o.push('<circle cx="470" cy="150" r="18" fill="#fff3cf"/>');
    [[60, 52, 1.1], [220, 40, .8], [380, 70, 1]].forEach(function(c){
      var x = c[0], y = c[1], s = c[2];
      o.push('<path d="M' + F2(x) + ' ' + F2(y) + ' q' + F2(14 * s) + ' ' + F2(-16 * s) + ' ' + F2(30 * s) + ' ' + F2(-2 * s) + ' q' + F2(16 * s) + ' ' + F2(-10 * s) + ' ' +
             F2(26 * s) + ' ' + F2(6 * s) + ' q' + F2(12 * s) + ' 0 ' + F2(10 * s) + ' ' + F2(10 * s) + ' Z" fill="#ffffff" opacity=".7"/>');
    });
    o.push('<path d="M0 ' + (g - 26) + ' L46 ' + (g - 60) + ' L88 ' + (g - 34) + ' L140 ' + (g - 78) + ' L196 ' + (g - 30) +
           ' L250 ' + (g - 52) + ' L318 ' + (g - 22) + ' L380 ' + (g - 66) + ' L446 ' + (g - 28) + ' L500 ' + (g - 58) +
           ' L560 ' + (g - 24) + ' L560 ' + g + ' L0 ' + g + ' Z" fill="#d8c8ea"/>');
    o.push('<path d="M396 ' + (g - 66) + ' v-14 h4 v6 h5 v-12 l3 -6 l3 6 v12 h5 v-6 h4 v14 z" fill="#d8c8ea"/>');
    o.push('<path d="M0 ' + (g - 8) + ' Q70 ' + (g - 30) + ' 150 ' + (g - 12) + ' T320 ' + (g - 14) + ' T560 ' + (g - 10) +
           ' L560 ' + g + ' L0 ' + g + ' Z" fill="#c4dcc0"/>');
    o.push('<rect x="0" y="' + g + '" width="' + w + '" height="' + (div - g) + '" fill="#e3efd9"/>');
    o.push('<rect x="12" y="' + (div + 6) + '" width="' + (w - 24) + '" height="' + (h - div - 14) + '" rx="10" fill="#fffaf3" stroke="#d9cdf2"/>');
  };

  dawn.ground = function(o, x1, x2, y){
    o.push('<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="#13789f" stroke-width="5" opacity=".15"/>');
    o.push('<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="#13789f" stroke-width="1.6"/>');
  };

  dawn.rope = function(o, pts, opt){
    var c = opt.col || "#3b2c8f", o2 = {};
    for(var k in opt) o2[k] = opt[k];
    o2.col = c;
    A.rope(o, pts, o2);
  };

  dawn.string = function(o, x1, y1, x2, y2){
    o.push('<line x1="' + F2(x1) + '" y1="' + F2(y1) + '" x2="' + F2(x2) + '" y2="' + F2(y2) + '" stroke="#6e5fc0" stroke-width="1.4" stroke-dasharray="3 2"/>');
  };

  SKINS.add(dawn);
})();
