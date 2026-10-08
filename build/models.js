/* ---------- 3.55 · physics models ----------

   The physics every stage lab shares, as pure functions of a lab's
   parameters p and the clock t. They return numbers - positions, speeds,
   times - and never draw; drawing is the stage's and the skin's job. A
   chapter calls them as PHYS.<name>(...) from inside its vizcfg functions.

   g is 10 m/s² throughout, matching the course's chapter formulas. */
var PHYS = {
  g: 10,

  /* ----- one dimension (Ch02) ----- */

  /* out along a line and part-way back; you cannot go back past the start */
  trip: function(p){ var back = Math.min(p.back, p.out), s = p.out - back; return { back: back, s: s, d: p.out + back }; },

  /* speed ramps steadily from v1 to v2 over T */
  ramp: function(p, t){
    t = Math.min(Math.max(t, 0), p.T);
    var v = p.v1 + (p.v2 - p.v1) * t / p.T;
    return { v: v, x: (p.v1 + v) / 2 * t };
  },

  /* constant a from u over T; a slowing body stops rather than reversing */
  glide: function(p, t){
    t = Math.min(Math.max(t, 0), p.T);
    var ts = p.a < 0 ? Math.min(t, -p.u / p.a) : t, x = p.u * ts + 0.5 * p.a * ts * ts;
    return { x: Math.max(0, x), v: Math.max(0, p.u + p.a * t) };
  },

  /* reaction at steady u for rt, then braking at b until rest */
  stop: function(p, t){
    var th = p.u * p.rt, d = th + p.u * p.u / (2 * p.b), x, v;
    if(t <= p.rt){ x = p.u * t; v = p.u; }
    else { var tau = Math.min(t - p.rt, p.u / p.b); x = th + p.u * tau - 0.5 * p.b * tau * tau; v = p.u - p.b * tau; }
    return { x: x, v: Math.max(0, v), d: d };
  },

  /* distance fallen from rest after t, stopping at the ground h below */
  fall: function(p, t){ return Math.min(p.h, 0.5 * PHYS.g * t * t); },

  /* ----- projectiles (Ch07) ----- */

  /* launched at speed v, angle deg above horizontal, from height h0.
     Returns the state at t (clamped to landing) and the whole flight. */
  arc: function(v, deg, h0, t){
    var g = PHYS.g, a = deg * Math.PI / 180, vx = v * Math.cos(a), vy = v * Math.sin(a);
    h0 = h0 || 0;
    var T = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g;
    var tt = Math.min(Math.max(t || 0, 0), T);
    return { vx: vx, vy0: vy, T: T, range: vx * T, apexT: Math.max(0, vy / g),
             apexY: h0 + Math.max(0, vy * vy / (2 * g)),
             x: vx * tt, y: Math.max(0, h0 + vy * tt - 0.5 * g * tt * tt), vy: vy - g * tt, t: tt };
  },
  /* height of the arc where it crosses horizontal distance X (null if it lands first) */
  arcYAt: function(v, deg, h0, X){
    var r = PHYS.arc(v, deg, h0, 0);
    if(r.vx <= 1e-9 || X > r.range + 1e-9) return null;
    var t = X / r.vx;
    return (h0 || 0) + r.vy0 * t - 0.5 * PHYS.g * t * t;
  },

  /* ----- forces (Ch03) ----- */

  /* push F on mass m against kinetic friction mu*m*g; a static block stays put */
  push: function(F, m, mu, t){
    var g = PHYS.g, fmax = mu * m * g, net = F > fmax ? F - fmax : 0, a = net / m;
    return { fric: F > fmax ? fmax : F, net: net, a: a, v: a * t, x: 0.5 * a * t * t, moves: net > 0 };
  },

  /* ----- energy (Ch05) ----- */

  /* speed at height y on a frictionless track, released from rest at h0 (null if it cannot reach) */
  speedAt: function(h0, y, v0){
    var e = (v0 || 0) * (v0 || 0) + 2 * PHYS.g * (h0 - y);
    return e < 0 ? null : Math.sqrt(e);
  },

  /* ----- collisions (Ch06) ----- */

  /* 1-D collision with coefficient of restitution e (1 elastic, 0 sticks) */
  collide: function(m1, u1, m2, u2, e){
    var P = m1 * u1 + m2 * u2, M = m1 + m2;
    return { v1: (P - m2 * e * (u1 - u2)) / M, v2: (P + m1 * e * (u1 - u2)) / M, p: P,
             ke0: 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2 };
  },

  /* ----- oscillation (Ch08) ----- */

  springT: function(m, k){ return 2 * Math.PI * Math.sqrt(m / k); },
  pendulumT: function(L){ return 2 * Math.PI * Math.sqrt(L / PHYS.g); },
  shm: function(A, T, t, phase){ var w = 2 * Math.PI / T; return { x: A * Math.cos(w * t + (phase || 0)), v: -A * w * Math.sin(w * t + (phase || 0)) }; },

  /* ----- fields (Ch13, Ch15) ----- */

  k: 9e9,
  /* electric field at (x, y) from point charges [{x, y, q}] (units chosen by caller) */
  efield: function(charges, x, y, soft){
    var ex = 0, ey = 0;
    charges.forEach(function(c){
      var dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy + (soft || 0), r = Math.sqrt(r2);
      ex += c.q * dx / (r2 * r); ey += c.q * dy / (r2 * r);
    });
    return [ex, ey];
  },
  /* radius of a charged particle's circle in a uniform magnetic field */
  gyroR: function(m, v, q, B){ return m * v / (Math.abs(q) * B); },

  /* ----- decay (Ch20) ----- */
  remaining: function(N0, half, t){ return N0 * Math.pow(0.5, t / half); },

  /* seeded random numbers, so a "random" scene draws the same on every frame */
  rng: function(seed){ var s = seed % 2147483647; if(s <= 0) s += 2147483646;
    return function(){ s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
};
