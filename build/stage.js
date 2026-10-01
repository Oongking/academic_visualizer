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

  /* ----- world: metres <-> pixels -----
     Every world answers the same questions, so nothing else needs to know
     which one it is: where an item goes (pos), where a path point goes (pt),
     what a pointer position means to a handle's set() (args), where a
     handle sits (hpos), and how a prediction is placed and read back.

       lane   1-D horizontal track in metres; items rise by `lift` pixels
       tower  1-D vertical track in metres, with side-by-side lanes
       plane  2-D, one scale for both axes so an arc keeps its true shape
       free   raw picture coordinates, for fields and patterns that draw
              themselves through cfg.scene */
  world: function(S, cfg){
    var w = cfg.world || { kind: "lane" }, p = S.p, kind = w.kind || "lane";
    var span = (S.lock && S.lock.span != null) ? S.lock.span : (w.span ? w.span(p, S) : 50);
    /* a scale sized to the answer would give a prediction away */
    if(S.pred && S.pred.f && (kind === "lane" || kind === "plane")) span *= S.pred.f;
    if(!(span > 0)) span = 1;
    var g = FR.ground, W;
    if(kind === "tower"){
      var base = g, top = FR.sy + 30;
      W = { span: span, base: base, top: top,
        Y: function(h){ return base - (h / span) * (base - top); },
        H: function(py){ return (base - py) / (base - top) * span; },
        lane: function(i){ return FR.sx + 230 + i * 110; },
        X: function(){ return FR.sx + FR.sw / 2; } };
      W.pos = function(it){
        var px = it.lane != null ? W.lane(it.lane) : (it.px != null ? it.px : W.X());
        return [px, W.Y(it.h || 0) - (it.lift || 0)]; };
      W.pt = function(q){ return [q[0], W.Y(q[1])]; };
      W.args = function(px, py){ return [W.H(py)]; };
      W.hpos = function(at){ return [at.px != null ? at.px : (at.lane != null ? W.lane(at.lane) : W.X()), W.Y(at.h)]; };
      W.guessPt = function(v, pc){ return [W.lane((pc && pc.lane) || 0) - 46, W.Y(v)]; };
      W.guessVal = function(px, py){ return W.H(py); };
    } else if(kind === "plane"){
      var yspan = (S.lock && S.lock.yspan != null) ? S.lock.yspan : (w.yspan ? w.yspan(p, S) : span * 0.35);
      if(S.pred && S.pred.f) yspan *= S.pred.f;
      var px0 = FR.sx + (w.left != null ? w.left : 18), ww = FR.sx + FR.sw - 8 - px0, hh = g - (FR.sy + 22);
      var sc = Math.min(ww / span, hh / Math.max(yspan, 1e-6));
      W = { span: span, yspan: span ? hh / sc : yspan, g: g, s: sc,
        X: function(m){ return px0 + m * sc; }, M: function(px){ return (px - px0) / sc; },
        Y: function(m){ return g - m * sc; },   H: function(py){ return (g - py) / sc; } };
      W.xmax = ww / sc;
      W.pos = function(it){ return [it.px != null ? it.px : W.X(it.x || 0), W.Y(it.y || 0) - (it.lift || 0)]; };
      W.pt = function(q){ return [W.X(q[0]), W.Y(q[1] || 0)]; };
      W.args = function(px, py){ return [W.M(px), W.H(py)]; };
      W.hpos = function(at){ return [W.X(at.x), W.Y(at.y || 0) - (at.lift || 0)]; };
      W.guessPt = function(v){ return [W.X(v), g]; };
      W.guessVal = function(px){ return W.M(px); };
    } else if(kind === "free"){
      W = { span: FR.sw, g: g,
        X: function(v){ return v; }, M: function(v){ return v; }, Y: function(v){ return v; }, H: function(v){ return v; } };
      W.pos = function(it){ return [it.px, it.py]; };
      W.pt = function(q){ return [q[0], q[1]]; };
      W.args = function(px, py){ return [px, py]; };
      W.hpos = function(at){ return [at.px, at.py]; };
      W.guessPt = function(v){ return [v, g]; };
      W.guessVal = function(px){ return px; };
    } else {
      var x0 = FR.sx + (w.left != null ? w.left : 14), wl = FR.sx + FR.sw - 8 - x0;
      W = { span: span, g: g,
        X: function(m){ return x0 + (m / span) * wl; },
        M: function(px){ return (px - x0) / wl * span; } };
      W.pos = function(it){ return [W.X(it.x || 0), g - (it.lift || 0)]; };
      W.pt = function(q){ return [W.X(q[0]), g - (q[1] || 0)]; };
      W.args = function(px){ return [W.M(px)]; };
      W.hpos = function(at){ return [W.X(at.x), g - (at.lift != null ? at.lift : 0)]; };
      W.guessPt = function(v){ return [W.X(v), g]; };
      W.guessVal = function(px){ return W.M(px); };
    }
    W.kind = kind; W.unit = w.unit; W.cfg = w;
    return W;
  },

  pos: function(W, it){ return W.pos(it); },

  ground: function(o, W, k){
    var R = role, dense = (k || 1) > 1.3 ? 4 : 6;
    if(W.kind === "free"){ if(W.cfg.ground) R("ground")(o, FR.sx, FR.sx + FR.sw, W.g, { clock: STAGE.clock }); return; }
    if(W.kind === "plane"){
      R("ground")(o, FR.sx, FR.sx + FR.sw, W.g, { clock: STAGE.clock });
      var sx = niceStep(W.xmax, dense);
      for(var mx = 0; mx <= W.xmax + 1e-9; mx += sx){
        var tx0 = fmt2(W.X(mx));
        o.push('<line x1="' + tx0 + '" y1="' + W.g + '" x2="' + tx0 + '" y2="' + (W.g + 7) + '" stroke="var(--ink-faint)" stroke-width="1"/>');
        o.push('<text x="' + tx0 + '" y="' + (W.g + 20) + '" ' + FT + ' text-anchor="middle">' + tk(mx) + '</text>');
      }
      if(W.cfg.heights !== false){
        /* heights on the right edge, clear of whoever launches from the left */
        var sy = niceStep(W.yspan, dense - 2), xr = FR.sx + FR.sw;
        for(var my = sy; my <= W.yspan + 1e-9; my += sy){
          var ty = fmt2(W.Y(my));
          o.push('<line x1="' + (xr - 6) + '" y1="' + ty + '" x2="' + xr + '" y2="' + ty + '" stroke="var(--ink-faint)" stroke-width="1"/>');
          o.push('<text x="' + (xr - 9) + '" y="' + fmt2(+ty + 3.5) + '" ' + FT + ' text-anchor="end">' + tk(my) + '</text>');
        }
      }
      o.push('<text x="' + (FR.sx + FR.sw) + '" y="' + (W.g + 34) + '" ' + FT + ' text-anchor="end">' +
             tx(W.unit || ["metres", "เมตร"]) + '</text>');
      return;
    }
    if(W.kind === "lane"){
      R("ground")(o, FR.sx, FR.sx + FR.sw, W.g, { clock: STAGE.clock });
      var step = niceStep(W.span, dense);
      for(var m = 0; m <= W.span + 1e-9; m += step){
        var gx = fmt2(W.X(m));
        o.push('<line x1="' + gx + '" y1="' + W.g + '" x2="' + gx + '" y2="' + (W.g + 7) + '" stroke="var(--ink-faint)" stroke-width="1"/>');
        o.push('<text x="' + gx + '" y="' + (W.g + 20) + '" ' + FT + ' text-anchor="middle">' + tk(m) + '</text>');
      }
      o.push('<text x="' + (FR.sx + FR.sw) + '" y="' + (W.g + 34) + '" ' + FT + ' text-anchor="end">' +
             tx(W.unit || ["metres", "เมตร"]) + '</text>');
    } else {
      R("ground")(o, FR.sx, FR.sx + FR.sw, W.base, { clock: STAGE.clock });
      var st = niceStep(W.span, dense - 1);
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
                clock: STAGE.clock, moving: it.moving, ang: it.ang, h: it.hpx, gapY: it.gapY, gapR: it.gapR };
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
        var P = W.pt(q);
        d += (i ? " L" : "M") + fmt2(P[0]) + " " + fmt2(P[1]);
      });
      role("trail")(o, d, { col: STAGE.C(pth.col), hl: !!(S.hl && pth.term === S.hl), dash: pth.dash });
    });
  },

  marks: function(o, S, W, list){
    (list || []).forEach(function(mk, i){
      var c = STAGE.C(mk.col), hl = !!(S.hl && mk.term === S.hl);
      if(W.kind === "free") return;
      if(W.kind === "lane" || W.kind === "plane"){
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
    return W.hpos(at);
  },

  handles: function(o, S, W, G, cfg){
    if(STAGE.guessing(S)) return;
    (cfg.handles || []).forEach(function(h, i){
      if(S.trial && h.k && S.trial.lock.indexOf(h.k) >= 0) return;
      if(h.hide && h.hide(S.p, S)) return;
      var P = STAGE.handlePos(S, W, G, h); if(!P) return;
      var active = (S.drag && S.drag.i === i) || (S.kbd && S.kbd.on && S.kbd.i === i);
      if(S.kbd && S.kbd.on && S.kbd.i === i)
        o.push('<circle cx="' + fmt2(P[0]) + '" cy="' + fmt2(P[1]) + '" r="21" fill="none" stroke="var(--ink)" ' +
               'stroke-width="2" stroke-dasharray="5 3"/>');
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
    /* On a phone the 560-unit picture is drawn ~360px wide, which would put
       10-unit labels at 6px. Every label grows by the same factor instead,
       so the hierarchy holds and nothing drops below a readable size. */
    var k = S.textK || 1;
    if(k > 1.01) for(var i = 0; i < o.length; i++)
      if(o[i].indexOf("font-size") >= 0)
        o[i] = o[i].replace(/font-size="([\d.]+)"/g, function(a, n){ return 'font-size="' + fmt2(n * k) + '"'; });
  },

  guessing: function(S){ return !!(S.pred && S.pred.phase === "guess"); },

  frame: function(S, o, cfg){
    STAGE.clock = STAGE.reduced() ? 0 : ((typeof performance !== "undefined" ? performance.now() : Date.now()) / 1000);
    S.fx = S.fx || [];
    var W = STAGE.world(S, cfg), p = S.p;
    S.W = W;
    STAGE.ground(o, W, S.textK);
    if(cfg.under) cfg.under(o, S, W);
    STAGE.paths(o, S, W, cfg.paths ? cfg.paths(p, S, W) : []);
    (cfg.props ? cfg.props(p, S) : []).forEach(function(it){ STAGE.item(o, S, W, it); });
    if(cfg.scene) cfg.scene(o, S, W);
    STAGE.trace(o, S, W, cfg);
    if(!STAGE.guessing(S)) STAGE.marks(o, S, W, cfg.marks ? cfg.marks(p, S) : []);
    (cfg.cast ? cfg.cast(p, S) : []).forEach(function(it){ STAGE.item(o, S, W, it); });

    o.push('<line x1="' + FR.sx + '" y1="' + FR.div + '" x2="' + (FR.sx + FR.sw) + '" y2="' + FR.div +
           '" stroke="var(--rule)" stroke-width="1"/>');
    o.push('<g class="stg-ins">');
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
      var sxp = W.kind === "tower" ? W.X() : W.X(cfg.leader(p, S));
      o.push('<path d="M' + fmt2(sxp) + ' ' + (FR.ground + 4) + ' L' + fmt2(sxp) + ' ' + (FR.div - 6) +
             ' L' + fmt2(G.markX) + ' ' + (FR.div + 6) + ' L' + fmt2(G.markX) + ' ' + FR.iy +
             '" fill="none" stroke="var(--accent)" stroke-width="1.1" stroke-dasharray="3 4" opacity=".7"/>');
    }
    o.push('</g>');
    STAGE.prophecy(o, S, W, cfg);
    STAGE.handles(o, S, W, G, cfg);
    STAGE.events(S, W, cfg);
    STAGE.stepFx(S, o);
  },

  /* The path of the moving thing, recorded while it runs, and the path of
     the run before it left faintly behind - so a learner who changes one
     quantity sees exactly what that change did. */
  endTrace: function(S){
    if(S.runTrace && S.runTrace.length > 2) S.lastTrace = S.runTrace;
    S.runTrace = [];
  },
  trace: function(o, S, W, cfg){
    if(!cfg.trace) return;
    S.runTrace = S.runTrace || [];
    if(S.prevT != null && S.t < S.prevT - 1e-9) STAGE.endTrace(S);
    S.prevT = S.t;
    var tp = cfg.trace(S.p, S);
    if(S.t > 0 && tp){
      var last = S.runTrace[S.runTrace.length - 1];
      if(!last || Math.abs(last[0] - tp[0]) + Math.abs(last[1] - tp[1]) > 1e-9) S.runTrace.push(tp);
    }
    var line = function(pts){
      return pts.map(function(q, i){ var P = W.pt(q); return (i ? "L" : "M") + fmt2(P[0]) + " " + fmt2(P[1]); }).join(" ");
    };
    if(S.lastTrace && S.lastTrace.length > 2 && !STAGE.guessing(S)){
      role("trail")(o, line(S.lastTrace), { col: "var(--ink-faint)", dash: "2 5" });
      var e = W.pt(S.lastTrace[S.lastTrace.length - 1]);
      fitText(o, e[0], e[1] - 10, [ui("lastRun"), ui("lastRun")], 90, 9.5, "var(--ink-faint)", "middle");
    }
    if(S.runTrace.length > 1) role("trail")(o, line(S.runTrace), { col: STAGE.C(cfg.traceCol || "accent"), dash: "none" });
  },

  /* the learner's prediction, pinned where they put it */
  prophecy: function(o, S, W, cfg){
    var pr = S.pred, pc = cfg.predict;
    if(!pr || pr.guess == null || !pc || pc.kind === "choice") return;
    var P = W.guessPt(pr.guess, pc);
    var on = S.kbd && S.kbd.on;
    role("prophecy")(o, P[0], P[1], { clock: STAGE.clock, active: on || !!S.dragGuess,
                                       done: pr.phase === "done", hit: pr.hit, tower: W.kind === "tower" });
    var txt = ui("yourGuess") + " · " + fmt2(pr.guess) + tx(pc.unit || [" m", " ม."]);
    fitText(o, P[0], P[1] - (W.kind === "tower" ? 12 : 78), [txt, txt], 150, 10.5, "var(--accent2)", "middle");
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

    /* several features react to a mode change; each adds a hook */
    var hooks = [];
    S.onMode = function(m){ hooks.forEach(function(f){ f(m); }); };

    /* The question and the note are page text, not picture text: they wrap
       on a phone, follow the language switch and reach a screen reader. */
    var qEl = document.createElement("p");
    qEl.className = "stage-q";
    q(".lab-stage").insertAdjacentElement("beforebegin", qEl);
    var curQ = function(){
      return S.trial && cfg.trials && cfg.trials.question ? cfg.trials.question(S.trial.goal) : cfg.question;
    };

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
    if(cfg.note){
      var nEl = document.createElement("p");
      nEl.className = "stage-note"; nEl.textContent = tx(cfg.note);
      (host.querySelector(".spell") || q(".lab-stage")).insertAdjacentElement("afterend", nEl);
    }
    S.afterPaint = function(){
      var qt = curQ(), qs = qt ? tx(qt) : "";
      if(qEl.textContent !== qs){ qEl.textContent = qs; qEl.hidden = !qs; }
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
        S.trial = { goal: g, lock: tr.lockFor ? tr.lockFor(g) : (tr.lock || []), done: false };
        for(var k in g.set) S.p[k] = g.set[k];
        S.t = 0; S.fired = {}; S.playing = false;
        host.querySelectorAll(".cv,.opt-b:not(.p-opt)").forEach(function(el){
          var c = api.ctrls[+el.getAttribute("data-i")];
          el.disabled = locked(c.k);
          el.closest(".ctrl").classList.toggle("locked", locked(c.k));
        });
        q(".t-step").textContent = ui("trials") + " · " + ui("solved") + " " + solved();
        /* plain text on purpose: these sentences mix words and arithmetic,
           which the inline-math detector would split mid-phrase */
        q(".t-text").textContent = tx(tr.say(g));
        var r = q(".t-result"); r.textContent = ""; r.className = "t-result";
        /* a trial is solved with the formula, so the readouts that would
           let you slide to the answer stay veiled until you cast */
        host.classList.toggle("is-veiled", !!tr.veil);
        api.sync(); api.draw();
      };
      var judge = function(){
        if(!S.trial) return;
        var res = tr.check(S.p, S, S.trial.goal), r = q(".t-result");
        host.classList.remove("is-veiled");
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
      hooks.push(function(m){
        mb.classList.toggle("on", m === "trial");
        pane.hidden = m !== "trial";
        if(m === "trial"){
          q(".guide").hidden = true; q(".g-nav").hidden = true;
          newTrial();
        } else if(S.trial){
          S.trial = null; S.onEnd = null; host.classList.remove("is-veiled");
          host.querySelectorAll(".cv,.opt-b:not(.p-opt)").forEach(function(el){ el.disabled = false; el.closest(".ctrl").classList.remove("locked"); });
        }
      });
    }
    S.onInput = function(){ S.fired = {}; STAGE.endTrace(S);
      if(S.trial){ var r = q(".t-result"); r.textContent = ""; r.className = "t-result";
                   if(cfg.trials.veil) host.classList.add("is-veiled"); } };

    /* --- predict, then reveal ---
       Committing to a guess before the run is what exposes an intuition to
       correction. While the learner guesses, everything that would give the
       answer away - readouts, the formula's values, the instrument band,
       dimension lines - is veiled, and the controls are held still. */
    var pc = cfg.predict;
    var setPred = null;
    if(pc){
      var pb = document.createElement("button");
      pb.type = "button"; pb.className = "btn b-pred"; pb.textContent = ui("predict");
      var tp = host.querySelector(".lab-body > .transport:not(.g-nav)");
      if(tp) tp.appendChild(pb); else q(".ctrls").insertAdjacentElement("afterend", pb);
      var pp = document.createElement("div");
      pp.className = "predict"; pp.hidden = true;
      /* options may be a list, or a function of the setup that builds them */
      var optHTML = function(){
        var ops = typeof pc.opts === "function" ? pc.opts(S.p) : pc.opts;
        return ops.map(function(op, i){
          return '<button type="button" class="opt-b p-opt" data-v="' + i + '">' + esc(tx(op)) + '</button>'; }).join("");
      };
      var oh = pc.kind === "choice" ? '<div class="opts p-opts" role="group"></div>' : "";
      pp.innerHTML = '<span class="step p-step"></span><p class="p-ask"></p>' + oh +
        '<div class="transport"><button class="btn p-go" type="button"></button>' +
        '<button class="btn p-quit" type="button"></button></div><p class="p-result" role="status" aria-live="polite"></p>';
      q(".lab-body").insertBefore(pp, q(".lab-body").firstChild);
      q(".p-go").textContent = ui("reveal"); q(".p-quit").textContent = ui("endPredict");

      var score = function(){ var r = (STATE.preds && STATE.preds[api.nd.id]) || { n: 0, hit: 0 }; return r; };
      var stepText = function(){ var r = score(); return ui("predict") + " · " + ui("foresight") + " " + r.hit + " / " + r.n; };
      var hold = function(on){
        host.classList.toggle("is-veiled", on && pc.veil !== false);
        host.querySelectorAll(".cv,.opt-b:not(.p-opt)").forEach(function(el){ el.disabled = on; });
        var b = q(".b-play"); if(b) b.disabled = on;
      };
      setPred = function(v){
        if(!S.pred || S.pred.phase !== "guess") return;
        if(pc.kind !== "choice"){
          var lo = pc.min != null ? pc.min : 0, hi = pc.max != null ? pc.max(S.p) : S.W.span;
          v = Math.max(lo, Math.min(hi, Math.round(v * 2) / 2));
        }
        S.pred.guess = v;
        q(".p-go").disabled = false;
        host.querySelectorAll(".p-opt").forEach(function(b){
          var on = +b.getAttribute("data-v") === v;
          b.classList.toggle("on", on); b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        api.draw();
      };
      var start = function(){
        if(S.mode !== "sandbox") api.setMode("sandbox");
        cancelAnimationFrame(S.raf); S.playing = false; var b = q(".b-play"); if(b) b.textContent = t("lab.play");
        S.pred = { phase: "guess", guess: null, f: (pc.stretch === false || pc.kind === "choice") ? 1 : 1.2 + Math.random() * 0.6 };
        S.t = 0; S.fired = {};
        pp.hidden = false; pb.hidden = true;
        q(".p-step").textContent = stepText();
        q(".p-ask").textContent = tx(pc.ask) + (pc.kind === "choice" ? "" : " " + ui(S.W && S.W.kind === "tower" ? "tapHeight" : "tapLine"));
        var r = q(".p-result"); r.textContent = ""; r.className = "p-result";
        bindOpts();
        q(".p-go").disabled = true;
        host.querySelectorAll(".p-opt").forEach(function(b){ b.disabled = false; b.classList.remove("on"); });
        hold(true); api.draw();
        if(pc.kind !== "choice") svg.focus({ preventScroll: true });
      };
      var finish = function(){
        var actual = pc.actual(S.p), g = S.pred.guess, hit, msg;
        if(pc.kind === "choice"){
          hit = g === actual;
          var ops = typeof pc.opts === "function" ? pc.opts(S.p) : pc.opts;
          msg = [ (L() ? "คุณเลือก: " : "You chose: ") + tx(ops[g]) + " · " + (L() ? "ผลจริง: " : "actually: ") + tx(ops[actual]) ];
        } else {
          var err = Math.abs(g - actual), tol = pc.tol ? pc.tol(S.p) : 1;
          hit = err <= tol;
          var u = tx(pc.unit || [" m", " ม."]);
          msg = [ (L() ? "คุณทำนาย " : "You foresaw ") + fmt2(g) + u + " · " + (L() ? "ผลจริง " : "actual ") + fmt2(actual) + u +
                  " · " + (L() ? "คลาดไป " : "off by ") + fmt2(err) + u ];
        }
        S.pred.phase = "done"; S.pred.hit = hit;
        STATE.preds = STATE.preds || {};
        var sc = score(); STATE.preds[api.nd.id] = { n: sc.n + 1, hit: sc.hit + (hit ? 1 : 0) }; save();
        q(".p-step").textContent = stepText();
        var r = q(".p-result");
        r.textContent = (hit ? ui("trueSight") : ui("notQuite")) + " " + msg[0] + ". " + (pc.explain ? tx(pc.explain(S.p, actual)) : "");
        r.className = "p-result " + (hit ? "won" : "missed");
        pb.hidden = false; pb.textContent = ui("predictAgain");
        hold(false);
        var W = S.W, P = pc.kind === "choice" || g == null ? [FR.sx + FR.sw / 2, FR.ground - 40]
          : W.guessPt(g, pc);
        STAGE.emit(S, P[0], P[1], hit ? "burst" : "impact", hit ? "var(--good)" : "var(--warn)");
        api.draw();
      };
      var quit = function(){
        if(!S.pred) return;
        S.pred = null; S.onEnd = null; pp.hidden = true; pb.hidden = false; pb.textContent = ui("predict");
        hold(false); api.draw();
      };
      pb.addEventListener("click", start);
      q(".p-quit").addEventListener("click", quit);
      var bindOpts = function(){
        var box = q(".p-opts"); if(!box) return;
        box.innerHTML = optHTML();
        box.querySelectorAll(".p-opt").forEach(function(b){
          b.addEventListener("click", function(){ setPred(+b.getAttribute("data-v")); });
        });
      };
      q(".p-go").addEventListener("click", function(){
        if(!S.pred || S.pred.guess == null || S.pred.phase !== "guess") return;
        S.pred.phase = "run";
        host.classList.remove("is-veiled");
        host.querySelectorAll(".p-opt").forEach(function(b){ b.disabled = true; });
        q(".p-go").disabled = true;
        S.onEnd = finish; api.play();
      });
      hooks.push(function(m){ if(m !== "sandbox") quit(); });
    }

    /* --- pointer: drag a handle, or place a prediction --- */
    var toSvg = function(e){
      var m = svg.getScreenCTM(); if(!m) return null;
      var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      return pt.matrixTransform(m.inverse());
    };
    var guessAt = function(pt){
      if(!pt || !setPred) return;
      setPred(S.W.guessVal(pt.x, pt.y));
    };
    var applySet = function(set){
      var changed = false;
      for(var k in set){
        if(locked(k)) continue;
        var v = snap(k, set[k]);
        if(S.p[k] !== v){ S.p[k] = v; changed = true; }
      }
      if(changed){ S.fired = {}; if(S.onInput) S.onInput(); api.sync(); api.draw(); }
      return changed;
    };
    var hasHandles = !!(cfg.handles && cfg.handles.length);
    if(hasHandles || (pc && pc.kind !== "choice")){
      svg.classList.add("has-handles");
      svg.addEventListener("pointerdown", function(e){
        if(STAGE.guessing(S)){
          if(pc.kind === "choice") return;
          var pt0 = toSvg(e); if(!pt0 || pt0.y > STAGE.FRAME.div) return;
          S.dragGuess = true; guessAt(pt0);
          try{ svg.setPointerCapture(e.pointerId); }catch(err){}
          e.preventDefault(); return;
        }
        var g = e.target.closest && e.target.closest("[data-h]"); if(!g) return;
        var i = +g.getAttribute("data-h"), h = cfg.handles[i];
        S.drag = { i: i };
        S.lock = { span: S.W.span, yspan: S.W.yspan, y: S.G ? [S.G.lo, S.G.hi] : null };
        /* freeze the mapping the reader is pulling against */
        var W = S.W, G = S.G;
        S.drag.map = h.space === "graph" && G ? {
          t: function(px){ var a = G.X(0), b = G.X(1); return (px - a) / (b - a); },
          v: function(py){ var a = G.Y(0), b = G.Y(1); return (py - a) / (b - a); }
        } : { W: W };
        if(S.playing){ S.playing = false; var pb2 = q(".b-play"); if(pb2) pb2.textContent = t("lab.play"); }
        try{ svg.setPointerCapture(e.pointerId); }catch(err){}
        e.preventDefault(); api.draw();
      });
      svg.addEventListener("pointermove", function(e){
        if(S.dragGuess){ guessAt(toSvg(e)); return; }
        if(!S.drag) return;
        var pt = toSvg(e); if(!pt) return;
        var h = cfg.handles[S.drag.i], m = S.drag.map;
        applySet(h.space === "graph" ? h.set(m.t(pt.x), m.v(pt.y), S.p)
                                     : h.set.apply(null, m.W.args(pt.x, pt.y).concat([S.p])));
      });
      var end = function(){
        if(S.dragGuess){ S.dragGuess = false; api.draw(); return; }
        if(!S.drag) return; S.drag = null; S.lock = null; api.draw();
      };
      svg.addEventListener("pointerup", end);
      svg.addEventListener("pointercancel", end);

      /* --- keyboard: the same moves without a pointer ---
         The picture takes focus as one stop. Arrow keys move the ringed
         handle (or the prediction); Enter or Space rings the next handle. */
      svg.setAttribute("tabindex", "0");
      svg.setAttribute("role", "application");
      svg.setAttribute("aria-label", ui("kbdHelp"));
      S.kbd = { i: 0, on: false };
      var usable = function(){
        return (cfg.handles || []).map(function(h, i){ return i; })
          .filter(function(i){ var h = cfg.handles[i]; return !(h.k && locked(h.k)); });
      };
      svg.addEventListener("focus", function(){ S.kbd.on = true; var u = usable(); if(u.indexOf(S.kbd.i) < 0) S.kbd.i = u[0] || 0; api.draw(); });
      svg.addEventListener("blur", function(){ S.kbd.on = false; api.draw(); });
      svg.addEventListener("keydown", function(e){
        var key = e.key, dir = 0, vert = false;
        if(key === "ArrowRight"){ dir = 1; } else if(key === "ArrowLeft"){ dir = -1; }
        else if(key === "ArrowUp"){ dir = -1; vert = true; } else if(key === "ArrowDown"){ dir = 1; vert = true; }
        if(STAGE.guessing(S) && pc && pc.kind !== "choice"){
          if(!dir) return;
          e.preventDefault();
          var stepG = Math.max(0.5, Math.round(S.W.span / 60 * 2) / 2);
          var g0 = S.pred.guess == null ? S.W.span / 2 : S.pred.guess;
          setPred(g0 + (S.W.kind === "tower" ? -dir : dir) * stepG);
          return;
        }
        if(!hasHandles) return;
        var u = usable(); if(!u.length) return;
        if(key === "Enter" || key === " "){
          e.preventDefault();
          S.kbd.i = u[(u.indexOf(S.kbd.i) + 1) % u.length]; api.draw(); return;
        }
        if(!dir) return;
        e.preventDefault();
        /* move the handle on screen and let its own set() decide the value,
           taking the smallest nudge that changes something */
        var h = cfg.handles[S.kbd.i], P = STAGE.handlePos(S, S.W, S.G, h); if(!P) return;
        S.lock = { span: S.W.span, yspan: S.W.yspan, y: S.G ? [S.G.lo, S.G.hi] : null };
        var W = S.W, G = S.G;
        for(var n = 1; n <= 60; n++){
          var px = P[0] + (vert ? 0 : dir * n * 2), py = P[1] + (vert ? dir * n * 2 : 0), set;
          if(h.space === "graph"){
            if(!G) break;
            set = h.set((px - G.X(0)) / (G.X(1) - G.X(0)), (py - G.Y(0)) / (G.Y(1) - G.Y(0)), S.p);
          } else set = h.set.apply(null, W.args(px, py).concat([S.p]));
          if(applySet(set)) break;
        }
        S.lock = null; api.draw();
      });
    }

    /* --- text size follows the drawn width --- */
    var measure = function(){
      var w = svg.getBoundingClientRect().width;
      var k = w > 0 ? Math.max(1, Math.min(1.6, 588 / w)) : 1;
      if(Math.abs(k - (S.textK || 1)) > 0.02){ S.textK = k; api.draw(); }
    };
    var ro = null;
    if(typeof ResizeObserver !== "undefined"){ ro = new ResizeObserver(measure); ro.observe(svg); }
    measure();

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
      if(ro) ro.disconnect();
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
