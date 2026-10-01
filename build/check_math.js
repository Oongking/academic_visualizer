/* Validate every bilingual chapter equation using the bundled KaTeX parser.
   Run after build: node build/check_math.js */
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const katex = require("./vendor/katex/katex.min.js");
const MATH = vm.runInNewContext(fs.readFileSync(path.join(__dirname,
  "math-notation.js"), "utf8") + "\nMATH;");
let chapters = 0, formulas = 0, clauses = 0;
for (const file of fs.readdirSync(path.join(__dirname, "chapters")).filter(
  name => name.endsWith(".js"))) {
  const chapter = vm.runInNewContext(fs.readFileSync(path.join(__dirname,
    "chapters", file), "utf8") + "\nCHAPTER;");
  chapters++;
  for (const node of chapter.nodes) {
    const pair = node.formulaTeX || node.formula;
    if (!pair) continue;
    if (!Array.isArray(pair) || pair.length !== 2) throw Error(file + ": invalid formula pair");
    formulas++;
    for (const source of pair) {
      for (const part of source.trim().split(/\s{3,}/)) {
        if (!node.formulaTeX && !MATH.looksMath(part)) continue;
        const tex = node.formulaTeX ? part : MATH.toTeX(part);
        try { katex.renderToString(tex,{throwOnError:true,strict:"ignore",trust:false}); }
        catch (error) { throw Error(file + " / " + node.id + " / " + part + ": " + error.message); }
        clauses++;
      }
    }
  }
  const name = chapter.subject + "/ch" +
    chapter.num + "-" + chapter.slug + ".html";
  const output = fs.readFileSync(path.join(root, name), "utf8");
  if (!output.includes("data:font/woff2;base64,") ||
      !output.includes("KaTeX") || output.includes("__KATEX_"))
    throw Error(name + ": missing offline KaTeX bundle");
}
/* Stage labs typeset their live "spell" with KaTeX on every frame. Render
   each one for the default setup, every guided step, and a sample of trial
   setups, in both languages, so a bad TeX string fails here, not on a page. */
const stub = `
  var STATE={lang:"en"}; function L(){ return STATE.lang==="th"?1:0; }
  function tx(p){ return Array.isArray(p)?p[L()]:p; }
  function fmt(n){ return (Math.round(n*10)/10).toString(); }
  function fmt2(n){ return (Math.round(n*100)/100).toString(); }
  function ri(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  var FR={sx:30,sw:500,sy:34,ground:214,div:302,iy:318,ih:118};
  var STAGE={FRAME:{div:302},guessing:function(){return false;},clock:0,C:function(k){return k;}};
  function role(){ return function(){}; } function fitText(){} function ui(){ return ""; }
`;
const models = fs.readFileSync(path.join(__dirname, "models.js"), "utf8");
let spells = 0;
for (const file of fs.readdirSync(path.join(__dirname, "chapters")).filter(n => n.endsWith(".js"))) {
  const ctx = vm.createContext({ Math, JSON });
  vm.runInContext(stub + models + "\n" + fs.readFileSync(path.join(__dirname, "chapters", file), "utf8"), ctx);
  const chapter = vm.runInContext("CHAPTER", ctx);
  for (const node of chapter.nodes) {
    const cfg = node.vizcfg;
    if (node.viz !== "stage" || !cfg || !cfg.spell) continue;
    const base = {};
    (cfg.ctrls || []).forEach(c => { base[c.k] = c.def; });
    const setups = [base];
    (node.guide || []).forEach(g => setups.push(Object.assign({}, base, g.set)));
    for (let i = 0; cfg.trials && i < 12; i++) {
      const g = cfg.trials.make(Object.assign({}, base));
      setups.push(Object.assign({}, base, g.set));
    }
    for (const lang of ["en", "th"]) {
      vm.runInContext(`STATE.lang=${JSON.stringify(lang)}`, ctx);
      for (const p of setups) for (const t of [0, 1, 3]) {
        const S = { p, t, trial: null, playing: false };
        let tex;
        try { tex = cfg.spell.tex(p, S); }
        catch (error) { throw Error(file + " / " + node.id + ": spell threw " + error.message); }
        try { katex.renderToString(tex, { throwOnError: true, strict: "ignore", trust: false }); }
        catch (error) { throw Error(file + " / " + node.id + " / " + tex + ": " + error.message); }
        (cfg.spell.terms || []).forEach(term => { const v = term.f(p, S); if (v == null || /NaN|undefined/.test(String(v))) throw Error(file + " / " + node.id + " / term " + term.k + ": " + v); });
        spells++;
      }
    }
  }
}
console.log(`PASS ${formulas} formula panels, ${clauses} KaTeX clauses, ${chapters} offline chapters, ${spells} live spell renders`);
