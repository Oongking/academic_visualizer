/* KaTeX presentation for the existing Unicode formula data. Keep the chapter
   content bilingual; only mathematical clauses are sent to KaTeX. */
var MATH = (function () {
  "use strict";
  var supers = {"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5",
    "⁶":"6","⁷":"7","⁸":"8","⁹":"9","ⁿ":"n","⁻":"-","⁺":"+",
    "ᵗ":"t","ᵐ":"m","ᵇ":"b","ˣ":"x","ᴬ":"A"};
  var subs = {"₀":"0","₁":"1","₂":"2","₃":"3","ₙ":"n","ₐ":"a","ᵢ":"i"};
  var symbols = {"−":"-","×":"\\times ","÷":"\\div ","·":"\\cdot ",
    "→":"\\to ","←":"\\leftarrow ","⇒":"\\Rightarrow ",
    "⟹":"\\Longrightarrow ","⟺":"\\Longleftrightarrow ",
    "≤":"\\leq ","≥":"\\geq ","≠":"\\neq ","≡":"\\equiv ",
    "∝":"\\propto ","⟂":"\\perp ","⊥":"\\perp ","∥":"\\parallel ",
    "∈":"\\in ","∩":"\\cap ","∪":"\\cup ","⊂":"\\subset ",
    "∅":"\\varnothing ","∀":"\\forall ","∃":"\\exists ",
    "∧":"\\land ","∨":"\\lor ","ℝ":"\\mathbb{R}",
    "∞":"\\infty ","…":"\\ldots ","°":"^{\\circ}",
    "½":"\\tfrac{1}{2}","±":"\\pm ","∓":"\\mp ",
    "Σ":"\\sum ","Π":"\\prod ","•":"\\bullet ",
    "∘":"\\circ ","—":"\\text{—}"};
  var functions = {sin:"\\sin",cos:"\\cos",tan:"\\tan",log:"\\log",
    ln:"\\ln",det:"\\det",lim:"\\lim",arg:"\\arg",max:"\\max",min:"\\min"};
  var units = {kg:1,mol:1,rad:1,eV:1,MeV:1,Hz:1};
  var words = {the:1,and:1,for:1,not:1,per:1,two:1,one:1,sum:1,
    out:1,its:1,are:1,all:1};

  function looksMath(s) {
    return /[=<>≤≥≠≡±×÷√ΣΠ∫πλθρμΦΔεω∧∨∪∩∈⊂∅⟹⟺~]|[⁰-⁹₀-₉]|\b(?:sin|cos|tan|log|lim|det)\b/.test(s);
  }
  function toTeX(source) {
    var s=String(source).trim();
    s=s.replace(/\{/g,"\\{").replace(/\}/g,"\\}");
    s=s.replace(/lim\(x→a\)/g,"\\lim_{x\\to a}");
    s=s.replace(/∫ₐᵇ/g,"\\int_{a}^{b}");
    s=s.replace(/([A-Za-z])\u0304/g,"\\bar{$1}");
    s=s.replace(/Ē/g,"\\bar{E}").replace(/â/g,"\\hat{a}");
    s=s.replace(/ⁿ√([A-Za-z])/g,"\\sqrt[n]{$1}");
    s=s.replace(/√\(([^()]*)\)/g,"\\sqrt{$1}");
    s=s.replace(/√([A-Za-z])/g,"\\sqrt{$1}");
    s=s.replace(/∫/g,"\\int ");
    s=s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ⁻⁺ᵗᵐᵇˣᴬ]+/g,function(run){
      return "^{"+Array.from(run).map(function(c){return supers[c];}).join("")+"}";
    });
    s=s.replace(/[₀₁₂₃ₙₐᵢ]+/g,function(run){
      return "_{"+Array.from(run).map(function(c){return subs[c];}).join("")+"}";
    });
    s=s.replace(/′/g,"^{\\prime}").replace(/″/g,"^{\\prime\\prime}");
    s=s.replace(/\^\(([^()]*)\)/g,"^{$1}");
    s=s.replace(/_([A-Za-z]+)/g,"_{\\mathrm{$1}}");
    s=s.replace(/[−×÷·→←⇒⟹⟺≤≥≠≡∝⟂⊥∥∈∩∪⊂∅∀∃∧∨ℝ∞…°½±∓ΣΠ•∘—]/g,
      function(c){return symbols[c];});
    s=s.replace(/%/g,"\\%");
    s=s.replace(/[ก-๙]+(?:\s+[ก-๙]+)*/g,function(w){return "\\text{"+w+"}";});
    s=s.replace(/(?<!\\)\b[A-Za-z]{2,}\b/g,function(w){
      if(functions[w]) return functions[w];
      if(units[w]) return "\\mathrm{"+w+"}";
      if(w==="dx") return "\\,dx";
      if(w.length<=3 && !words[w]) return w;
      return "\\text{"+w+"}";
    });
    while(/\\text\{[^}]+\}\s+\\text\{[^}]+\}/.test(s))
      s=s.replace(/\\text\{([^}]+)\}\s+\\text\{([^}]+)\}/g,"\\text{$1 $2}");
    return s;
  }
  function renderFormula(container, source, alreadyTeX) {
    String(source).trim().split(/\s{3,}/).forEach(function(part){
      if(!part) return;
      var span=document.createElement("span");
      span.className="formula-part";
      if(alreadyTeX || looksMath(part)) {
        try { katex.render(alreadyTeX?part:toTeX(part), span,
          {throwOnError:true,strict:"ignore",trust:false}); }
        catch(e) { console.error("Formula render failed:", part, e); span.textContent=part; }
      } else span.textContent=part;
      container.appendChild(span);
    });
  }
  var stops = {a:1,an:1,at:1,as:1,and:1,are:1,be:1,by:1,do:1,
    for:1,from:1,if:1,in:1,is:1,of:1,on:1,or:1,the:1,to:1,
    was:1,what:1,when:1,which:1,with:1};
  function mathToken(raw) {
    var core=raw.replace(/^[('"“]+|[),.!?;:'"”]+$/g,"");
    if(!core || stops[core.toLowerCase()]) return false;
    if(/[ก-๙]/.test(core)) return false;
    if(/^[A-Za-z]{4,}$/.test(core)) return false;
    return /^[A-Za-z0-9α-ωΑ-ΩπθλμρΔΣΦεω∫√½±=≤≥≠×÷−+*/^().|∩∪₀-₉⁰-⁹⁻⁺°′″]+$/.test(core);
  }
  function renderInlineText(source) {
    var tokens=[], match;
    var re=/\S+/g;
    while((match=re.exec(source))) tokens.push({start:match.index,end:re.lastIndex,
      text:match[0],math:mathToken(match[0])});
    var fragment=document.createDocumentFragment(), cursor=0, i=0;
    while(i<tokens.length){
      if(!tokens[i].math){i++;continue;}
      var first=i;
      while(i<tokens.length && tokens[i].math)i++;
      var start=tokens[first].start,end=tokens[i-1].end;
      var raw=source.slice(start,end);
      if(!/[=≤≥≠±×÷∫√Σ^²³ⁿ∩∪]/.test(raw))continue;
      var lead=(raw.match(/^[('"“]+/)||[""])[0];
      var tail=(raw.match(/[,.!?;:'"”]+$/)||[""])[0];
      var body=raw.slice(lead.length,raw.length-tail.length);
      if(!body)continue;
      var span=document.createElement("span"); span.className="inline-math";
      try { katex.render(toTeX(body),span,{throwOnError:true,strict:"ignore",trust:false}); }
      catch(e){continue;}
      fragment.appendChild(document.createTextNode(source.slice(cursor,start+lead.length)));
      fragment.appendChild(span);cursor=end-tail.length;
    }
    if(cursor===0)return null;
    fragment.appendChild(document.createTextNode(source.slice(cursor)));
    return fragment;
  }
  function renderInline(container) {
    var nodes=[], walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT), node;
    while((node=walker.nextNode())) nodes.push(node);
    nodes.forEach(function(textNode){
      var replacement=renderInlineText(textNode.nodeValue);
      if(replacement) textNode.replaceWith(replacement);
    });
  }
  return {toTeX:toTeX,looksMath:looksMath,renderFormula:renderFormula,
    renderInline:renderInline};
})();
