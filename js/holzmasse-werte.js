// Umrechnungszahlen für Brennholz – alle Werte an einer Stelle.
// Quelle: Bayerische Landesanstalt für Wald und Forstwirtschaft (LWF),
// Merkblatt 20 „Scheitholz – Produktion, Lagerung, Kennzahlen“, Stand Juli 2025,
// Tabelle „Verhältniszahlen zwischen den Raummaßen“ (erste Zeile: 1 Festmeter = …).
// Die Zahlen sind Anhaltswerte. Wenn die LWF die Tabelle ändert, nur hier anpassen
// und das Stand-Datum auf /quellen/ aktualisieren.
var HOLZMASSE = {
  stand: "Juli 2025",
  geprueft: "Oktober 2026",
  // Wie viele Einheiten entsprechen 1 Festmeter?
  einheiten: {
    fm:     { proFm: 1.0, kurz: "Fm",  name: "Festmeter",                 info: "massives Holz ohne Luft",           icon: "i-fm" },
    rm1u:   { proFm: 1.4, kurz: "Rm",  name: "Raummeter Meterholz, rund", info: "1-m-Rundlinge, ungespalten gestapelt", icon: "i-rm-rund" },
    rm1g:   { proFm: 1.6, kurz: "Rm",  name: "Raummeter Meterholz, gespalten", info: "1-m-Scheite, gespalten gestapelt", icon: "i-rm-gespalten" },
    rm33:   { proFm: 1.4, kurz: "Rm",  name: "Raummeter (Ster) ofenfertig", info: "33-cm-Scheite, ordentlich gestapelt", icon: "i-rm33" },
    srm33:  { proFm: 2.1, kurz: "SRm", name: "Schüttraummeter",            info: "33-cm-Scheite, lose geschüttet",    icon: "i-srm" }
  },
  reihenfolge: ["fm", "rm1u", "rm1g", "rm33", "srm33"]
};
