# Kaminofen- und Brennholz-Seite – Plan und Anleitung

Stand: 31. Oktober 2026

## 1. Was in Version 1 fertig ist

| Seite | Adresse | Inhalt |
|---|---|---|
| Startseite | `/` | Übersicht der Rechner (vier davon „kommt bald“), die drei Holzmaße erklärt |
| Holzmaße-Rechner | `/holzmasse-rechner/` | Festmeter, Raummeter (Ster), Schüttraummeter umrechnen, Stapel ausmessen |
| Quellen | `/quellen/` | Alle Zahlen mit Quelle und Stand |
| Impressum | `/impressum/` | **Platzhalter, du musst deine Daten eintragen** |
| Datenschutz | `/datenschutz/` | **Platzhalter, bitte prüfen und Daten eintragen** |
| Fehlerseite | `/404.html` | |

Alle Umrechnungszahlen stehen an einer einzigen Stelle: `js/holzmasse-werte.js`.

## 2. Bitte prüfen, bevor die Seite online geht

1. **Umrechnungszahlen:** Quelle ist das LWF-Merkblatt 20 (Stand Juli 2025), Tabelle
   „Verhältniszahlen zwischen den Raummaßen“. Ich konnte das PDF nur als Text auslesen,
   die Spaltenzuordnung habe ich daraus rekonstruiert. Bitte vergleiche die erste Zeile
   mit dem Original: 1 Fm = 1,4 Rm Meterholz rund = 1,6 Rm Meterholz gespalten
   = 1,4 Rm 33-cm-Scheite gestapelt = 2,1 SRm 33-cm-Scheite geschüttet.
2. **Platzhalter ersetzen** (nach `PLATZHALTER` und `placeholder` suchen):
   - `DOMAIN-PLATZHALTER.de` in allen HTML-Dateien (canonical), `robots.txt`, `sitemap.xml`, `netlify.toml`
   - Name, Anschrift, E-Mail in `impressum/index.html` und `datenschutz/index.html`
3. **Arbeitsname:** „Kaminholz-Rechner“ steht im Logo und in den Seitentiteln. Wenn die Domain
   feststeht, passe den Namen an.

## 3. Design „Glut und Birke“

- Farben: Birkenpapier `#f7f1e8` als Hintergrund, Ruß `#2b211b` als Schrift, Glut-Orange `#c4501c` als Akzent,
  dunkler Kopfbereich mit warmem Schein. Dunkelmodus folgt automatisch der Geräte-Einstellung.
- Schriften: Fraunces (Überschriften) und Source Sans 3 (Text), lokal in `/fonts/`, SIL Open Font License.
- Erkennungszeichen: Holzstapel-Band unter dem Kopfbereich, Jahresringe im Kopfbereich, Logo als Baumscheibe mit Flamme.
- Alle Farben stehen als Variablen oben in `css/style.css`.

## 4. Nächste Versionen

- Preisvergleich pro Raummeter und kWh
- Holzbedarf pro Winter
- „Darf mein Ofen weiterlaufen?“ (1. BImSchV, nach Typschild-Datum)
- Trocknungsdauer
- Später: Umami-Reichweitenmessung wie bei nebenjob365 (dann Datenschutz und CSP in `netlify.toml` erweitern)

## 5. Online bringen

Wie bei nebenjob365: Netlify → **Add new site** → **Import an existing project** → GitHub → Repository
`kaminofen`. Kein Build-Befehl, Veröffentlichungsordner `.` (steht schon in `netlify.toml`).
