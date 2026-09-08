# Unabhängige Gauntlet-Kritik R1

**Urteil: PASS für den begrenzten optischen Redesign-Scope. Keine nachgewiesenen Release-Blocker.** Optionaler Feinschliff unten; keine Forderung nach zusätzlichen Funktionen oder erfundenem Social Proof.

## Grundlage und Grenzen

Eigenständig geprüft: `http://127.0.0.1:8130/` in echtem Headless Chromium, 1440 × 1000 und 390 × 844, jeweils frische isolierte Browserkontexte; Chromium anschließend geschlossen. DOM, Klicks, Touch, Tastatur, Screenshots und Console-Ausgaben wurden selbst erhoben. Die gemeldeten 27/27 Lead-Tests sind **nicht** Grundlage dieses Urteils. Keine Repository-Quelldateien, Live-Lernstände, main oder Produktion verändert.

**Kein Blindvergleich:** Die Identität der Varianten war bekannt. Tatsächlich visuell verglichen wurden `baseline-desktop.png`, `baseline-mobile.png`, `reference-archive-desktop.png`, `reference-archive-mobile.png` und eigene aktuelle Chromium-Aufnahmen. Whizlabs ist nur durch das partielle Archiv vom 04.08.2026 belegt: <https://web.archive.org/web/20260804120647/https://www.whizlabs.com/>. Fehlendes Hero-Bild und beschädigtes Branding sind Archivgrenzen, **kein Qualitätsvorteil unserer Seite**. Keine Behauptung vollständiger Parität mit der aktuellen Whizlabs-Seite.

## Größte verbleibende Lücke

**Mobile Einstiegskomposition, nicht Funktion:** Der Header verbraucht bei 390 px Breite rund 227 px Höhe; der Farbschema-Wähler belegt eine eigene, rechts ausgerichtete Zeile vor der zweizeiligen Navigation. Das macht den Auftakt schwerer als nötig. Der primäre CTA bleibt immerhin vollständig im ersten Bildschirm: y=547,7–599,7, Höhe 52 px. Die Illustration beginnt erst darunter und ist im ersten Screenshot nur angeschnitten – regulärer Seitenfluss, kein verlorener Inhalt.

Optional: Header-Abstände/Anordnung des vorhandenen Theme-Wählers verdichten, ohne die gut erreichbaren Navigationslinks zu verstecken. **Kein Release-Blocker.** Beleg: `critic-r1-stable-light-390.png`, CTA-/Nav-Geometrie in `critic-r1-metrics.json`.

## Stärken und tatsächlicher Referenzabstand

- Gegenüber dem grauen, textlastigen Baseline-Einstieg jetzt ein klarer Desktop-Split: große zweifarbige Nutzenüberschrift links, eigenständige Lern-/Agentenillustration rechts. Orange „Jetzt lernen“ dominiert die umrandete Simulator-Aktion. Kompetenzbereiche und Fortschritt konkurrieren nicht mehr mit dem Hauptversprechen. Beleg: `critic-r1-stable-light-1440.png` versus `baseline-desktop.png`.
- Warmes Elfenbein, dunkle Schrift und Orange nehmen die warme/orange Whizlabs-Richtung auf, bleiben aber sachlicher. Das Archiv zeigt einen stärker eingefärbten, gerundeten Hero mit orangem CTA; unsere Typografie und Flächengestaltung sind bewusst zurückhaltender. Das ist eine Interpretation für deutschsprachige Engineers/Architekten, keine Kopie.
- Reale Umfangsangaben und klarer Hinweis auf das unabhängige Angebot statt unbewiesener Bewertungen/Kundenlogos. Der CTA führt in echte Lernkarten, nicht in eine optische Sackgasse.

## Eigene Funktions- und Darstellungsbelege

| Prüfung | Tatsächliches Ergebnis | Evidenz |
|---|---|---|
| Breite / Navigation | Dokumentbreite entspricht 1440 bzw. 390 px; kein horizontaler Seitenüberlauf. Mobile Headerlinks jeweils 44 px hoch. Quellen- und Lernpfadanker landen nach Ende des Smooth-Scrolls bei ca. y=112. | `critic-r1-flow.json`, `critic-r1-metrics.json` |
| Quellen auf Mobilgeräten | Tabelle bewusst intern horizontal scrollbar: 348 px sichtbare Breite, 672 px Inhalt. Tastatur bewegt `scrollLeft` auf 40; echter Touch-Swipe erreicht 324, das rechte Ende. | `critic-r1-flow.json`, `critic-r1-sources-stable-390.png` |
| Lernweg / lange Texte | CTA per Enter und Touch, Domäne per Enter und Touch geöffnet. Desktop-Lesefeld: 509 px Inhalt in 430 px Höhe; fokussiert und per End vollständig bis `scrollTop=79` gescrollt. Mobil: 952 px Inhalt ohne innere Höhenkappung, normaler Seitenfluss. | `critic-r1-flow.json`, `critic-r1-reading-1440.png` |
| Quelle / Vor / Zurück | Tab vom Lesefeld erreicht den Quellenlink; nach Scrollende mobil vollständig sichtbar bei y=391–453 und x=54–336. Touch „Weiter“ zeigt die nächste Erklärung; „Zurück“ stellt die erste wieder her. | `critic-r1-mobile.json`, `critic-r1-mobile-source-controls.png` |
| Domänenende | Tatsächlich bis „Lerninhalt 53 von 53“ navigiert. Wahrheitsgemäßer Endhinweis, Lesestatus bleibt eine bewusste Nutzeraktion; kein falsches nächstes Lernziel. | `critic-r1-mobile.json`, `critic-r1-mobile-domain-end.png` |
| Themes / Simulator | Hell, Dunkel, hoher Kontrast und Auto umgeschaltet; finale DOM-Farben unterscheiden sich korrekt. Lesefeld Dunkel: RGB 37/46/53 mit 247/241/233; hoher Kontrast: Schwarz/Weiß. Simulator startet auf beiden Größen mit „Frage 1 von 30“ und 45:00. Keine Page- oder Console-Errors im Flow-Lauf. | `critic-r1-flow.json`, `critic-r1-stable-*.png`, `critic-r1-reading-dark-390.png`, `critic-r1-reading-high-contrast-390.png` |

## Restliche Hinweise

Die mobile Qualitätstabelle verlangt seitliches Lesen; die Interaktion funktioniert, eine dezentere Scroll-Erkennbarkeit wäre optionaler Darstellungsfeinschliff. Keine umfassende WCAG-, Inhalts-, externe Linkziel- oder Cross-Browser-Freigabe.

Messhinweis: Der erste Kurzlauf erfasste noch laufende Farb-/Scrollanimationen. Für Ankerpositionen und Theme-Farben gelten deshalb die stabilisierten Werte aus `critic-r1-flow.json`. Ein zusätzlicher Testlauf wartete zunächst irrtümlich auf einen Weiter-Button am Domänenende; der korrigierte DOM-gesteuerte Lauf bestätigt dessen erwartetes Verschwinden. Das war ein Testskriptproblem, kein App-Defekt.
