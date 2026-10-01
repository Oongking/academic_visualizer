/* ---------- 3.6 · stage: model · stage · skin ----------

   The "stage" visualizer splits a lab into three layers so each can change
   without touching the others:

     MODEL  the physics. Lives in the chapter's vizcfg as plain functions of
            the parameters p and the clock S.t: where things are, how fast,
            whether a trial was won. It never draws.

     STAGE  this file. Lays the world out (a horizontal lane or a vertical
            tower, with a scale in metres), places what the model returns,
            and adds the interaction every stage lab shares: drag handles,
            the live formula ("spell") with hoverable terms, trials, and
            particle effects.

     SKIN   build/skins/*.js. Draws each *role* the stage asks for - agent,
            orb, origin, marker, goal, hazard, perch, relic, vector, trail,
            handle, spark - plus the backdrop, colour tokens, and the nouns
            that fill {@agent}-style words in chapter text.

   To restyle every stage lab, write one skin file and select it. A skin
   that leaves a role out falls back to the classic skin's drawing, so a new
   style can start small. See DESIGN_SYSTEM.md, "Stage labs and art skins". */

var SKINS = {
  KEY: "edu-art-skin",
  list: [], by: {}, active: null, fallback: "classic", preferred: "arcane",

  add: function(s){ SKINS.list.push(s); SKINS.by[s.id] = s; },

  pick: function(){
    var id = null;
    try{ id = localStorage.getItem(SKINS.KEY); }catch(e){}
    return SKINS.by[id] || SKINS.by[CHAPTER.skin] || SKINS.by[SKINS.preferred] ||
           SKINS.by[SKINS.fallback] || SKINS.list[0];
  },

  use: function(id){
    if(!SKINS.by[id]) return;
    SKINS.active = SKINS.by[id];
    try{ localStorage.setItem(SKINS.KEY, id); }catch(e){}
    SKINS.install();
  },

  /* A skin's stylesheet and its shared SVG <defs> (gradients, glow filters)
     go into the document once; every lab's SVG can then use url(#id). */
  install: function(){
    var s = SKINS.active; if(!s || typeof document === "undefined") return;
    var st = document.getElementById("skinCss");
    if(!st){ st = document.createElement("style"); st.id = "skinCss"; document.head.appendChild(st); }
    st.textContent = s.css || "";
    var df = document.getElementById("skinDefs");
    if(!df){
      df = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      df.id = "skinDefs"; df.setAttribute("aria-hidden", "true"); df.setAttribute("focusable", "false");
      df.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
      document.body.appendChild(df);
    }
    df.innerHTML = "<defs>" + (s.defs || "") + "</defs>";
  }
};

function SK(){
  if(!SKINS.active){ SKINS.active = SKINS.pick(); SKINS.install(); }
  return SKINS.active;
}

/* A role from the active skin, or the fallback skin's version of it. */
function role(name){
  var s = SK(), f = s[name] || (SKINS.by[SKINS.fallback] || {})[name];
  return f || function(){};
}

/* Fill {@noun} and {@Noun} from the skin's word list. */
function skinWords(str){
  return str.replace(/\{@(\w+)\}/g, function(all, key){
    var low = key.charAt(0).toLowerCase() + key.slice(1);
    var s = SK(), n = (s.nouns && s.nouns[low]) || ((SKINS.by[SKINS.fallback] || {}).nouns || {})[low];
    if(!n) return all;
    var w = n[L()];
    if(key !== low && !L()) w = w.charAt(0).toUpperCase() + w.slice(1);
    return w;
  });
}
function ui(k){ var u = SK().ui || {}, f = (SKINS.by[SKINS.fallback] || {}).ui || {}; return tx(u[k] || f[k] || ["", ""]); }

var STAGE = {
  reduced: function(){
    return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  },

  C: function(k){
    if(!k) return "var(--accent)";
    if(k.indexOf("var(") === 0 || k.charAt(0) === "#") return k;
    return k === "accent2" ? "var(--accent2)" : col(k);
  },

  /* ----- world: metres <-> pixels ----- */
  world: function(S, cfg){
    var w = cfg.world || { kind: "lane" }, p = S.p;
    var span = (S.lock && S.lock.span != null) ? S.lock.span : (w.span ? w.span(p, S) : 50);
    if(!(span > 0)) span = 1;
    if(w.kind === "tower"){
      var base = FR.ground, top = FR.sy + 30;
      return { kind: "tower", span: span, base: base, top: top, unit: w.unit,
        Y: function(h){ return base - (h / span) * (base - top); },
        H: function(py){ return (base - py) / (base - top) * span; },
        lane: function(i){ return FR.sx + 230 + i * 110; },
        X: function(){ return FR.sx + FR.sw / 2; } };
    }
    var x0 = FR.sx + 14, ww = FR.sw - 22;
    return { kind: "lane", span: span, g: FR.ground, unit: w.unit,
      X: function(m){ return x0 + (m / span) * ww; },
      M: function(px){ return (px - x0) / ww * span; } };
  },

  pos: function(W, it){
    if(W.kind === "tower"){
      var px = it.lane != null ? W.lane(it.lane) : (it.px != null ? it.px : W.X());
      return [px, W.Y(it.h || 0) - (it.lift || 0)];
    }
    return [W.X(it.x || 0), W.g - (it.lift || 0)];
  },

  ground: function(o, W){
    var R = role;
    if(W.kind === "lane"){
      R("ground")(o, FR.sx, FR.sx + FR.sw, W.g, { clock: STAGE.clock });
      var step = niceStep(W.span, 6);
      for(var m = 0; m <= W.span + 1e-9; m += step){
        var gx = fmt2(W.X(m));
        o.push('<line x1="' + gx + '" y1="' + W.g + '" x2="' + gx + '" y2="' + (W.g + 7) + '" stroke="var(--ink-faint)" stroke-width="1"/>');
        o.push('<text x="' + gx + '" y="' + (W.g + 20) + '" ' + FT + ' text-anchor="middle">' + tk(m) + '</text>');
      }
      o.push('<text x="' + (FR.sx + FR.sw) + '" y="' + (W.g + 34) + '" ' + FT + ' text-anchor="end">' +
             tx(W.unit || ["metres", "เมตร"]) + '</text>');
    } else {
      R("ground")(o, FR.sx, FR.sx + FR.sw, W.base, { clock: STAGE.clock });
      var st = niceStep(W.span, 5);
      for(var h = 0; h <= W.span + 1e-9; h += st){
        var gy = fmt2(W.Y(h));
        o.push('<line x1="' + (FR.sx + 172) + '" y1="' + gy + '" x2="' + (FR.sx + FR.sw) + '" y2="' + gy +
               '" stroke="var(--rule)" stroke-width="1" opacity=".55"/>');
        o.push('<text x="' + (FR.sx + 166) + '" y="' + fmt2(+gy + 3.5) + '" ' + FT + ' text-anchor="end">' + tk(h) + '</text>');
      }
      o.push('<text x="' + (FR.sx + 166) + '" y="' + (W.top - 8) + '" ' + FT + ' text-anchor="end">' +
             tx(W.unit || ["m", "ม."]) + '</text>');
    }
  },

  /* ----- one placed thing ----- */
  item: function(o, S, W, it){
    var P = STAGE.pos(W, it), px = P[0], py = P[1];
    var opt = { col: STAGE.C(it.col), flip: it.flip, size: it.size, variant: it.variant,
                on: it.on, awake: it.awake, w: it.w, hl: !!(S.hl && it.term === S.hl),
                clock: STAGE.clock, moving: it.moving };
    if(opt.hl) role("halo")(o, px, py - (it.haloLift != null ? it.haloLift : 18), opt);
    if(it.ghost) o.push('<g opacity="' + (it.ghost === true ? 0.3 : it.ghost) + '">');
    role(it.role)(o, px, py, opt);
    if(it.ghost) o.push('</g>');
    if(it.vel != null && Math.abs(it.vel) > 1e-6){
      var vy = py - (it.velLift != null ? it.velLift : 80), len = it.vel * (it.velScale || 4);
      role("vector")(o, px, vy, px + len, vy, { col: STAGE.C(it.velCol || "accent2"),
                     hl: !!(S.hl && it.velTerm === S.hl) });
      if(it.velLab) fitText(o, px + len + (len >= 0 ? 6 : -6), vy + 4, it.velLab, 80, 10,
                            STAGE.C(it.velCol || "accent2"), len >= 0 ? "start" : "end");
    }
    if(it.lab){
      var ly = py - (it.labLift != null ? it.labLift : (SK().lift && SK().lift[it.role]) || 24);
      fitText(o, px, ly, it.lab, 130, 10.5, opt.col, "middle");
    }
  },

  paths: function(o, S, W, list){
    (list || []).forEach(function(pth){
      var d = "";
      pth.pts.forEach(function(q, i){
        var P = W.kind === "tower" ? [q[0], W.Y(q[1])] : [W.X(q[0]), W.g - (q[1] || 0)];
        d += (i ? " L" : "M") + fmt2(P[0]) + " " + fmt2(P[1]);
      });
      role("trail")(o, d, { col: STAGE.C(pth.col), hl: !!(S.hl && pth.term === S.hl), dash: pth.dash });
    });
  },

  marks: function(o, S, W, list){
    (list || []).forEach(function(mk, i){
      var c = STAGE.C(mk.col), hl = !!(S.hl && mk.term === S.hl);
      if(W.kind === "lane"){
        var y = W.g + 52 + (mk.row != null ? mk.row : i) * 24;
        if(hl) o.push('<rect x="' + fmt2(Math.min(W.X(mk.a), W.X(mk.b)) - 4) + '" y="' + (y - 17) + '" width="' +
                      fmt2(Math.abs(W.X(mk.b) - W.X(mk.a)) + 8) + '" height="22" rx="6" fill="' + c + '" opacity=".16"/>');
        role("measure")(o, W.X(mk.a), W.X(mk.b), y, mk.lab, c);
      } else {
        var mx = FR.sx + 186 + i * 18, y1 = W.Y(mk.a), y2 = W.Y(mk.b);
        o.push('<line x1="' + mx + '" y1="' + fmt2(y1) + '" x2="' + mx + '" y2="' + fmt2(y2) + '" stroke="' + c +
               '" stroke-width="' + (hl ? 3 : 1.3) + '"/>');
        [y1, y2].forEach(function(yy){
          o.push('<line x1="' + (mx - 4) + '" y1="' + fmt2(yy) + '" x2="' + (mx + 4) + '" y2="' + fmt2(yy) + '" stroke="' + c + '" stroke-width="1.3"/>');
        });
      }
    });
  },

  /* ----- handles: things the reader can grab ----- */
  handlePos: function(S, W, G, h){
    var at = h.at(S.p, S);
    if(h.space === "graph"){
      if(!G || !G.Y) return null;
      return [G.X(at.t), G.Y(at.v)];
    }
    if(W.kind === "tower") return [at.px != null ? at.px : (at.lane != null ? W.lane(at.lane) : W.X()), W.Y(at.h)];
    return [W.X(at.x), W.g - (at.lift != null ? at.lift : 0)];
  },

  handles: function(o, S, W, G, cfg){
    (cfg.handles || []).forEach(function(h, i){
      if(S.trial && h.k && S.trial.lock.indexOf(h.k) >= 0) return;
      var P = STAGE.handlePos(S, W, G, h); if(!P) return;
      var active = S.drag && S.drag.i === i;
      o.push('<g class="stg-h" data-h="' + i + '">');
      o.push('<circle cx="' + fmt2(P[0]) + '" cy="' + fmt2(P[1]) + '" r="20" fill="#000" fill-opacity="0"/>');
      role("handle")(o, P[0], P[1], { active: active, hl: !!(S.hl && h.term === S.hl), clock: STAGE.clock,
                                     col: STAGE.C(h.col) });
      if(h.lab && !active) fitText(o, P[0], P[1] + (h.labBelow ? 26 : -16), h.lab, 110, 9.5, STAGE.C(h.col), "middle");
      o.push('</g>');
    });
  },

  /* ----- effects ----- */
  emit: function(S, x, y, kind, c){
    if(STAGE.reduced()) return;
    var n = kind === "burst" ? 26 : 16;
    for(var i = 0; i < n; i++){
      var a = Math.random() * Math.PI * 2, sp = (kind === "burst" ? 40 : 25) + Math.random() * 70;
      S.fx.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (kind === "burst" ? 30 : 50),
                  life: 1, decay: 0.7 + Math.random() * 0.8, col: c || "var(--accent)" });
    }
    if(kind === "impact" && S.svg){
      S.svg.classList.remove("stg-shake"); void S.svg.getBoundingClientRect(); S.svg.classList.add("stg-shake");
    }
    if(S.wake) S.wake();
  },

  events: function(S, W, cfg){
    if(!cfg.events) return;
    S.fired = S.fired || {};
    cfg.events(S.p, S).forEach(function(ev){
      if(ev.when && !S.fired[ev.id]){
        S.fired[ev.id] = true;
        var P = STAGE.pos(W, ev);
        STAGE.emit(S, P[0], P[1], ev.kind || "impact", STAGE.C(ev.col));
      } else if(!ev.when) S.fired[ev.id] = false;
    });
  },

  stepFx: function(S, o){
    var now = (typeof performance !== "undefined" ? performance.now() : Date.now()) / 1000;
    var dt = Math.min(0.05, Math.max(0, now - (S.fxNow || now))); S.fxNow = now;
    S.fx = S.fx.filter(function(f){
      f.life -= dt * f.decay; f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 120 * dt;
      return f.life > 0;
    });
    S.fx.forEach(function(f){ role("spark")(o, f.x, f.y, f.life, f.col); });
  },

  clock: 0,

  /* ----- the frame -----
     A stage is taller than a scene plate: two rows of dimension lines fit
     under the ground before the instrument band starts, so measurements
     never run into the graph. The shared frame FR is borrowed for the
     duration of one draw and handed back unchanged. */
  FRAME: { div: 302, iy: 318, ih: 118 },

  draw: function(S, o, cfg){
    var keep = { div: FR.div, iy: FR.iy, ih: FR.ih };
    FR.div = STAGE.FRAME.div; FR.iy = STAGE.FRAME.iy; FR.ih = STAGE.FRAME.ih;
    try{ STAGE.frame(S, o, cfg); }
    finally{ FR.div = keep.div; FR.iy = keep.iy; FR.ih = keep.ih; }
  },

  frame: function(S, o, cfg){
    STAGE.clock = STAGE.reduced() ? 0 : ((typeof performance !== "undefined" ? performance.now() : Date.now()) / 1000);
    S.fx = S.fx || [];
    var W = STAGE.world(S, cfg), p = S.p;
    S.W = W;
    var q = S.trial && cfg.trials && cfg.trials.question ? cfg.trials.question(S.trial.goal) : cfg.question;
    if(q) fitText(o, FR.sx, FR.qy, q, FR.sw, 12.5, "var(--ink)");

    STAGE.ground(o, W);
    STAGE.paths(o, S, W, cfg.paths ? cfg.paths(p, S, W) : []);
    (cfg.props ? cfg.props(p, S) : []).forEach(function(it){ STAGE.item(o, S, W, it); });
    STAGE.marks(o, S, W, cfg.marks ? cfg.marks(p, S) : []);
    (cfg.cast ? cfg.cast(p, S) : []).forEach(function(it){ STAGE.item(o, S, W, it); });

    o.push('<line x1="' + FR.sx + '" y1="' + FR.div + '" x2="' + (FR.sx + FR.sw) + '" y2="' + FR.div +
           '" stroke="var(--rule)" stroke-width="1"/>');
    var ins = cfg.instrument, G = null;
    if(ins){
      if(S.lock && S.lock.y && ins.kind !== "bar"){
        var ci = {}; for(var k in ins) ci[k] = ins[k]; ci.lockY = S.lock.y; ins = ci;
      }
      G = instrument(S, o, ins, null);
    }
    S.G = G;
    if(cfg.overlay && G) cfg.overlay(o, S, G, W);
    if(cfg.leader && G && G.markX != null){
      var sxp = W.kind === "lane" ? W.X(cfg.leader(p, S)) : W.X();
      o.push('<path d="M' + fmt2(sxp) + ' ' + (FR.ground + 4) + ' L' + fmt2(sxp) + ' ' + (FR.div - 6) +
             ' L' + fmt2(G.markX) + ' ' + (FR.div + 6) + ' L' + fmt2(G.markX) + ' ' + FR.iy +
             '" fill="none" stroke="var(--accent)" stroke-width="1.1" stroke-dasharray="3 4" opacity=".7"/>');
    }
    STAGE.handles(o, S, W, G, cfg);
    STAGE.events(S, W, cfg);
    STAGE.stepFx(S, o);
    if(cfg.note) cap(o, FR.sx, 486, cfg.note, "note");
  },

  backdrop: function(S, cfg, vb){
    var v = vb.split(/\s+/), o = [];
    role("backdrop")(o, +v[2], +v[3], { kind: (cfg.world || {}).kind || "lane", div: STAGE.FRAME.div });
    return o.join("");
  },

  /* ----- the extra interface around the picture ----- */
  mount: function(S, host, api){
    var cfg = api.cfg, sk = SK(), q = api.q, svg = api.svg;
    S.svg = svg;
    host.setAttribute("data-skin", sk.id);
    host.classList.add("stage-lab");
    var head = host.querySelector(".lab-head .label");
    if(head) head.textContent = cfg.spellName && sk.spellNames
      ? ui("labTitle") + " · " + tx(cfg.spellName) : t("lab.title");

    function snap(k, v){
      for(var i = 0; i < api.ctrls.length; i++){
        var c = api.ctrls[i]; if(c.k !== k) continue;
        v = Math.max(c.min, Math.min(c.max, v));
        v = Math.round((v - c.min) / c.step) * c.step + c.min;
        return +v.toFixed(6);
      }
      return v;
    }
    function locked(k){ return !!(S.trial && S.trial.lock.indexOf(k) >= 0); }

    /* --- the spell: live formula plus hoverable terms --- */
    var sp = cfg.spell, lastTex = null;
    if(sp){
      var box = document.createElement("div");
      box.className = "spell";
      var h = '<span class="spell-k">' + esc(ui("spell")) + '</span><div class="spell-tex"></div>';
      if(sp.terms && sp.terms.length){
        h += '<div class="spell-terms" role="group" aria-label="' + esc(ui("terms")) + '">';
        sp.terms.forEach(function(tm, i){
          h += '<button type="button" class="term" data-i="' + i + '" style="--term:' + STAGE.C(tm.col) + '">' +
               '<i>' + esc(tm.sym) + '</i> <span class="term-v"></span><small>' + esc(tx(tm.lab)) + '</small></button>';
        });
        h += '</div>';
      }
      box.innerHTML = h;
      q(".lab-stage").insertAdjacentElement("afterend", box);
      box.querySelectorAll(".term").forEach(function(b){
        var k = sp.terms[+b.getAttribute("data-i")].k;
        var on = function(){ S.hl = k; api.draw(); }, off = function(){ if(S.hl === k){ S.hl = null; api.draw(); } };
        b.addEventListener("mouseenter", on); b.addEventListener("focus", on);
        b.addEventListener("mouseleave", off); b.addEventListener("blur", off);
        b.addEventListener("click", function(){ S.hl = S.hl === k ? null : k; api.draw(); });
      });
    }
    S.afterPaint = function(){
      if(!sp) return;
      var tex = sp.tex(S.p, S);
      if(tex !== lastTex){
        lastTex = tex;
        var el = host.querySelector(".spell-tex");
        try{ katex.render(tex, el, { throwOnError: false, strict: "ignore", trust: false, displayMode: false }); }
        catch(e){ el.textContent = tex; }
      }
      host.querySelectorAll(".term").forEach(function(b){
        var tm = sp.terms[+b.getAttribute("data-i")];
        b.querySelector(".term-v").textContent = "= " + tm.f(S.p, S);
        b.classList.toggle("on", S.hl === tm.k);
      });
    };

    /* --- trials: a goal the formula lets you hit first time --- */
    var tr = cfg.trials;
    if(tr){
      var mb = document.createElement("button");
      mb.type = "button"; mb.className = "btn m-trial"; mb.textContent = ui("trials");
      q(".lab-mode").appendChild(mb);
      var pane = document.createElement("div");
      pane.className = "trial"; pane.hidden = true;
      pane.innerHTML = '<span class="step t-step"></span><p class="t-text"></p>' +
        '<div class="transport"><button class="btn t-cast" type="button"></button>' +
        '<button class="btn t-new" type="button"></button></div><p class="t-result" role="status" aria-live="polite"></p>';
      q(".lab-body").insertBefore(pane, q(".lab-body").firstChild);
      q(".t-cast").textContent = ui("cast"); q(".t-new").textContent = ui("newTrial");
      mb.addEventListener("click", function(){ api.setMode("trial"); });

      var solved = function(){ return (STATE.trials && STATE.trials[api.nd.id]) || 0; };
      var newTrial = function(){
        var g = tr.make(S.p);
        S.trial = { goal: g, lock: tr.lock || [], done: false };
        for(var k in g.set) S.p[k] = g.set[k];
        S.t = 0; S.fired = {}; S.playing = false;
        host.querySelectorAll(".cv").forEach(function(el){
          var c = api.ctrls[+el.getAttribute("data-i")];
          el.disabled = locked(c.k);
          el.closest(".ctrl").classList.toggle("locked", locked(c.k));
        });
        q(".t-step").textContent = ui("trials") + " · " + ui("solved") + " " + solved();
        /* plain text on purpose: these sentences mix words and arithmetic,
           which the inline-math detector would split mid-phrase */
        q(".t-text").textContent = tx(tr.say(g));
        var r = q(".t-result"); r.textContent = ""; r.className = "t-result";
        api.sync(); api.draw();
      };
      var judge = function(){
        if(!S.trial) return;
        var res = tr.check(S.p, S, S.trial.goal), r = q(".t-result");
        r.textContent = tx(res.msg);
        r.className = "t-result " + (res.ok ? "won" : "missed");
        var W = S.W, at = tr.at ? tr.at(S.trial.goal, S.p) : null;
        var P = at && W ? STAGE.pos(W, at) : [FR.sx + FR.sw / 2, FR.ground - 40];
        if(res.ok){
          if(!S.trial.done){
            S.trial.done = true;
            STATE.trials = STATE.trials || {};
            STATE.trials[api.nd.id] = solved() + 1; save();
            q(".t-step").textContent = ui("trials") + " · " + ui("solved") + " " + solved();
          }
          STAGE.emit(S, P[0], P[1], "burst", "var(--good)");
        } else STAGE.emit(S, P[0], P[1], "impact", "var(--warn)");
        api.draw();
      };
      q(".t-cast").addEventListener("click", function(){
        if(!S.trial) return;
        S.fired = {};
        if(tr.play === false){ judge(); return; }
        S.onEnd = judge; api.play();
      });
      q(".t-new").addEventListener("click", newTrial);
      S.onMode = function(m){
        mb.classList.toggle("on", m === "trial");
        pane.hidden = m !== "trial";
        if(m === "trial"){
          q(".guide").hidden = true; q(".g-nav").hidden = true;
          newTrial();
        } else if(S.trial){
          S.trial = null; S.onEnd = null;
          host.querySelectorAll(".cv").forEach(function(el){ el.disabled = false; el.closest(".ctrl").classList.remove("locked"); });
        }
      };
    }
    S.onInput = function(){ S.fired = {}; if(S.trial){ var r = q(".t-result"); r.textContent = ""; r.className = "t-result"; } };

    /* --- pointer: drag a handle to set a quantity --- */
    if(cfg.handles && cfg.handles.length){
      svg.classList.add("has-handles");
      var toSvg = function(e){
        var m = svg.getScreenCTM(); if(!m) return null;
        var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        return pt.matrixTransform(m.inverse());
      };
      svg.addEventListener("pointerdown", function(e){
        var g = e.target.closest && e.target.closest("[data-h]"); if(!g) return;
        var i = +g.getAttribute("data-h"), h = cfg.handles[i];
        S.drag = { i: i };
        S.lock = { span: S.W.span, y: S.G ? [S.G.lo, S.G.hi] : null };
        /* freeze the mapping the reader is pulling against */
        var W = S.W, G = S.G;
        S.drag.map = h.space === "graph" && G ? {
          t: function(px){ var a = G.X(0), b = G.X(1); return (px - a) / (b - a); },
          v: function(py){ var a = G.Y(0), b = G.Y(1); return (py - a) / (b - a); }
        } : { x: W.M, h: W.H };
        if(S.playing){ S.playing = false; var pb = q(".b-play"); if(pb) pb.textContent = t("lab.play"); }
        try{ svg.setPointerCapture(e.pointerId); }catch(err){}
        e.preventDefault(); api.draw();
      });
      svg.addEventListener("pointermove", function(e){
        if(!S.drag) return;
        var pt = toSvg(e); if(!pt) return;
        var h = cfg.handles[S.drag.i], m = S.drag.map, set;
        if(h.space === "graph") set = h.set(m.t(pt.x), m.v(pt.y), S.p);
        else set = h.set(S.W.kind === "tower" ? m.h(pt.y) : m.x(pt.x), S.p);
        var changed = false;
        for(var k in set){
          if(locked(k)) continue;
          var v = snap(k, set[k]);
          if(S.p[k] !== v){ S.p[k] = v; changed = true; }
        }
        if(changed){ S.fired = {}; if(S.onInput) S.onInput(); api.sync(); api.draw(); }
      });
      var end = function(){ if(!S.drag) return; S.drag = null; S.lock = null; api.draw(); };
      svg.addEventListener("pointerup", end);
      svg.addEventListener("pointercancel", end);
    }

    /* --- ambient motion: only while on screen, never under reduced motion --- */
    S.visible = false; S.ambRaf = null;
    var last = 0;
    var loop = function(now){
      S.ambRaf = null;
      if(!S.visible || document.hidden) return;
      if(!(sk.ambient || S.fx.length)) return;
      if(!S.playing && now - last > 40){ last = now; api.paint(); }
      S.ambRaf = requestAnimationFrame(loop);
    };
    S.wake = function(){
      if(STAGE.reduced() || S.ambRaf != null) return;
      S.ambRaf = requestAnimationFrame(loop);
    };
    var io = null;
    if(typeof IntersectionObserver !== "undefined"){
      io = new IntersectionObserver(function(en){
        S.visible = en[0].isIntersecting;
        if(S.visible) S.wake();
      });
      io.observe(host);
    }
    S.dispose = function(){
      if(io) io.disconnect();
      if(S.ambRaf != null) cancelAnimationFrame(S.ambRaf);
      S.ambRaf = null; S.visible = false;
    };
  }
};

VIZLIB.stage = {
  vb: "0 0 560 494", anim: false,
  draw: function(S, o, cfg){ STAGE.draw(S, o, cfg); },
  backdrop: function(S, cfg, vb){ return STAGE.backdrop(S, cfg, vb); },
  mount: function(S, host, api){ STAGE.mount(S, host, api); }
};
