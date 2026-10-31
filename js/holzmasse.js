// Holzmaße-Rechner: rechnet nur im Browser, speichert nichts.
(function () {
  var E = HOLZMASSE.einheiten;

  // Deutsche Zahleneingabe: "1,5" und "1.5" sind beide erlaubt, Tausenderpunkte werden ignoriert.
  function leseZahl(text) {
    var t = String(text || "").trim().replace(/\s/g, "");
    if (t === "") return NaN;
    if (t.indexOf(",") >= 0) t = t.replace(/\./g, "").replace(",", ".");
    if (!/^\d*\.?\d+$|^\d+\.$/.test(t)) return NaN;
    return parseFloat(t);
  }

  function format(x, stellen) {
    return x.toLocaleString("de-DE", { minimumFractionDigits: stellen, maximumFractionDigits: stellen });
  }

  function umrechnen(menge, von, nach) {
    return menge / E[von].proFm * E[nach].proFm;
  }

  function icon(name) {
    return '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><use href="#' + name + '"/></svg>';
  }

  // ---------- Umrechnen ----------
  var mengeEl = document.getElementById("menge");
  var liste = document.getElementById("r-liste");
  var bigEl = document.getElementById("r-big");
  var headEl = document.getElementById("r-head");
  var tagEl = document.getElementById("menge-einheit");
  var hinweisEl = document.getElementById("r-hinweis");

  function gewaehlteEinheit() {
    var r = document.querySelector('input[name="von"]:checked');
    return r ? r.value : "rm33";
  }

  function rechnen() {
    var von = gewaehlteEinheit();
    var menge = leseZahl(mengeEl.value);
    tagEl.textContent = E[von].kurz;

    if (isNaN(menge) || menge < 0) {
      mengeEl.setAttribute("aria-invalid", "true");
      bigEl.innerHTML = "–";
      headEl.textContent = "Bitte gib eine Menge ein, zum Beispiel 3 oder 2,5.";
      liste.innerHTML = "";
      hinweisEl.textContent = "";
      return;
    }
    mengeEl.removeAttribute("aria-invalid");

    var fm = umrechnen(menge, von, "fm");
    headEl.textContent = format(menge, menge % 1 ? 2 : 0) + " " + E[von].name + " sind ungefähr";
    bigEl.innerHTML = format(fm, 2) + " <small>Festmeter</small>";

    var html = "";
    HOLZMASSE.reihenfolge.forEach(function (k) {
      if (k === "fm") return;
      var wert = umrechnen(menge, von, k);
      html += '<li' + (k === von ? ' class="is-source"' : '') + '>' + icon(E[k].icon) +
        '<span class="r-name"><b>' + E[k].name + '</b><small>' + E[k].info + '</small></span>' +
        '<span class="r-val">' + format(wert, 2) + ' ' + E[k].kurz + '</span></li>';
    });
    liste.innerHTML = html;

    // Praktischer Hinweis: Wie lang wird der Stapel?
    var rm33 = umrechnen(menge, von, "rm33");
    var laenge = rm33 * 3; // 1 m hoch, 33 cm (ein Drittel Meter) tief
    hinweisEl.textContent = rm33 > 0
      ? "Ofenfertig gestapelt (33-cm-Scheite, 1 m hoch) ergibt das einen Stapel von etwa " +
        format(laenge, 1) + " m Länge."
      : "";
  }

  if (mengeEl) {
    mengeEl.addEventListener("input", rechnen);
    document.querySelectorAll('input[name="von"]').forEach(function (r) { r.addEventListener("change", rechnen); });
    rechnen();
  }

  // ---------- Stapel ausmessen ----------
  var sL = document.getElementById("st-laenge");
  var sH = document.getElementById("st-hoehe");
  var sT = document.getElementById("st-scheit");
  var sOut = document.getElementById("st-ergebnis");
  var sDetail = document.getElementById("st-detail");

  function stapel() {
    var l = leseZahl(sL.value), h = leseZahl(sH.value);
    var tiefe = parseFloat(sT.value);
    [sL, sH].forEach(function (el) {
      var v = leseZahl(el.value);
      if (isNaN(v) || v < 0) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
    });
    if (isNaN(l) || isNaN(h) || l < 0 || h < 0) {
      sOut.innerHTML = "–";
      sDetail.textContent = "Bitte gib Länge und Höhe in Metern ein.";
      return;
    }
    var rm = l * h * tiefe;
    sOut.innerHTML = format(rm, 2) + " <small>Raummeter (Ster)</small>";
    var basis = tiefe >= 1 ? "rm1g" : "rm33";
    var fm = umrechnen(rm, basis, "fm");
    var srm = umrechnen(rm, basis, "srm33");
    var text = format(l, 2) + " m × " + format(h, 2) + " m × " + format(tiefe, 2) + " m Scheitlänge. " +
      "Das sind ungefähr " + format(fm, 2) + " Festmeter";
    if (tiefe < 1) text += " oder " + format(srm, 2) + " Schüttraummeter, wenn du das Holz lose in einen Anhänger kippst";
    text += ".";
    if (Math.abs(tiefe - 1 / 3) > 0.01 && tiefe < 1) text += " Für " + Math.round(tiefe * 100) + "-cm-Scheite gibt es keine eigenen Umrechnungszahlen, wir nehmen die Werte für 33 cm.";
    if (tiefe >= 1) text += " Gerechnet mit den Werten für gespaltenes Meterholz.";
    sDetail.textContent = text;
  }

  if (sL) {
    [sL, sH, sT].forEach(function (el) { el.addEventListener("input", stapel); el.addEventListener("change", stapel); });
    stapel();
  }
})();
