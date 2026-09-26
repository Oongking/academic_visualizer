/* Share the reading preference with the other edu.gradual-lab.dev courses.
   Embedded in each page so downloaded chapters still work offline. */
(function () {
  "use strict";
  var key = "edu-reading-theme", names = ["paper", "warm", "blue", "dark"];
  var selected = "paper";
  try {
    var saved = localStorage.getItem(key) || localStorage.getItem("linear-algebra-reading-theme");
    if (names.indexOf(saved) !== -1) selected = saved;
  } catch (e) {}
  function apply(value) {
    selected = names.indexOf(value) !== -1 ? value : "paper";
    document.documentElement.setAttribute("data-reading-theme", selected);
    document.documentElement.setAttribute("data-theme", selected === "dark" ? "dark" : "light");
    var select = document.getElementById("readingTheme");
    if (select) select.value = selected;
    document.dispatchEvent(new Event("readingthemechange"));
  }
  apply(selected);
  document.addEventListener("DOMContentLoaded", function () {
    var select = document.getElementById("readingTheme");
    select.value = selected;
    select.addEventListener("change", function () {
      apply(select.value);
      try { localStorage.setItem(key, selected); } catch (e) {}
    });
  });
  window.addEventListener("storage", function (event) {
    if (event.key === key) apply(event.newValue);
  });
})();
