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
console.log(`PASS ${formulas} formula panels, ${clauses} KaTeX clauses, ${chapters} offline chapters`);
