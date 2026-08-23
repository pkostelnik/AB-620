# AB-620 Prüfungsvorbereitung

Interaktive, live gehostete Lernplattform (statisches HTML/CSS/JS) zur Vorbereitung auf die Microsoft-Zertifizierung **AB-620: Designing and Building Integrated AI Agent Solutions in Copilot Studio**.

Live erreichbar unter: **https://snat.ovh/AB-620/**

Kein offizielles Microsoft-Produkt. Alle Lerninhalte sind einzeln mit einer echten, verifizierten Microsoft-Learn-Quelle belegt.

## Was diese Seite tatsächlich kann

- **157 quellenbelegte Lerninhalte** in **19 Unterthemen**, gegliedert nach den 3 offiziellen Prüfungsdomänen (Plan and configure agent solutions 30-35 %, Integrate and extend agents in Copilot Studio 40-45 %, Test and manage agents 20-25 %). Jeder Lerninhalt trägt einen direkten Link zur zugrunde liegenden Microsoft-Learn-Seite.
- **20 verbundene Hands-on Labs** mit Schritt-für-Schritt-Anleitung, Artefakten und Verifikationskriterium; individuell als "abgeschlossen" markierbar. Die Labs bauen als durchgängiges Contoso-Service-Operations-Agent-Szenario aufeinander auf.
- **Prüfungssimulator**: zieht 30 zufällige Fragen aus einem Pool von 75, 45-Minuten-Countdown mit automatischer Abgabe, **kein Sofort-Feedback während der Prüfung** (wie im echten Examen), am Ende Score auf 1000-Punkte-Skala (Bestehensgrenze 700), Aufschlüsselung nach Domäne und vollständiger Review mit Microsoft-Learn-Links. Jede Frage ist auf einen einzelnen, konkreten Lerninhalt zurückverfolgbar.
- **Fortschrittsanzeige**: Fortschrittsring im Dashboard, Unterthemen als "gelesen" markierbar, gespeichert im `localStorage` des Browsers (geräte-/browserabhängig, kein Server-Backend).
- **Suche/Filter** über alle Lerninhalte, Unterthemen und Labs per Freitext.
- **Drei Farbschemata**: Hell (Basis, angelehnt an microsoft.com), Dunkel und Hoher Kontrast — wählbar über das Dropdown im Header, inklusive automatischer Übernahme der Systemeinstellung (`prefers-color-scheme`) bei Einstellung "Automatisch".
- **Barrierefreiheit**: Skip-Link, sichtbare Fokusringe, ARIA-Live-Region für Statusmeldungen, Radiogroup-Pattern mit Pfeiltastennavigation im Prüfungssimulator, semantisches HTML5.

## Ordnerstruktur

```
AB-620/
├── index.html                  Einstiegspunkt
├── assets/
│   ├── css/style.css           Design-System (Tokens, Themes, Komponenten)
│   ├── js/app.js               Theme-Manager, Fortschritts-Tracker, Rendering, Exam-Simulator-Logik
│   └── data/content.js         Domänen, Unterthemen, 157 Lerninhalte, 20 Labs, 75 Prüfungsfragen (globales Objekt AB620_CONTENT)
├── docs/                       Ergänzende Referenzdokumente (Downloads im Footer verlinkt)
│   ├── AB-620_Microsoft_AI_Agent_Builder_Lernplan.docx
│   ├── AB-620_HandsOn_Labs.md
│   ├── AB-620_Executive_Briefing.md
│   └── ab620_exam_simulator.py  (eigenständiger CLI-Prüfungssimulator ohne Browser)
├── qa/
│   ├── qa_live_test.js         Automatisierter Live-Funktionstest (jsdom, läuft alle 6h per Cronjob gegen die Produktiv-URL)
│   ├── research_domain1.json   Rohdaten-Archiv: 53 quellenbelegte Lerninhalte Domäne 1
│   ├── research_domain2.json   Rohdaten-Archiv: 54 quellenbelegte Lerninhalte Domäne 2
│   ├── research_domain3.json   Rohdaten-Archiv: 50 quellenbelegte Lerninhalte Domäne 3
│   └── research_examBank.json  Rohdaten-Archiv: 75 Prüfungsfragen mit Quell-Rückverfolgung
└── readme.md                    dieses Dokument
```

## Nutzung

Live-Version nutzen: https://snat.ovh/AB-620/

Lokal servieren:

```bash
cd AB-620
python3 -m http.server 8080
# dann im Browser: http://localhost:8080
```

## Qualitätssicherung — was tatsächlich geprüft wurde

Die Sektion „Qualitätssicherung“ auf der Seite selbst dokumentiert den aktuellen Prüfstand. Zusätzlich, für volle Transparenz, hier der Ablauf der durchgeführten Prüfungen:

1. **Quellenrecherche**: Alle 157 Lerninhalte wurden von spezialisierten Recherche-Agenten individuell per `web_search`/`web_extract` gegen echte Microsoft-Learn-Seiten erarbeitet, jeder Fakt mit tatsächlich besuchter Quell-URL belegt.
2. **Quellenverifikation**: Stichprobenartige HTTP-Prüfung von Quell-URLs gegen den offiziellen AB-620 Study Guide (Skills-Katalog). Ein ursprünglich enthaltener Lerninhalt, der auf einen Microsoft-Q&A-Community-Forumsbeitrag verwies (kein autoritatives Curriculum-Material), wurde identifiziert und vollständig entfernt (daher 157 statt ursprünglich 158 Lerninhalte).
3. **Datenvalidierung** (automatisiert, per Node-Skript): `content.js` gegen ein Schema geprüft — 3 Domänen, 19 Unterthemen, 157 Lerninhalte, 20 Labs, 75 Prüfungsfragen mit je 4 Optionen und gültigem `correctIndex`, jede Frage rückverfolgbar auf ihren Quell-Lerninhalt. Ergebnis: keine Fehler.
4. **Syntaxprüfung** (automatisiert): `node --check` auf `content.js` und `app.js` — beide fehlerfrei.
5. **Laufzeitprüfung lokal**: `qa/validate_runtime_20_labs.js` lädt die echte `index.html` mit jsdom und prüft nachweislich 20 gerenderte Lab-Karten, Topic-/Domänenfilter, Lab-Abschluss sowie den Start des Exam-Simulators.
6. **Produktivprüfung**: `qa/qa_live_test.js` ist auf die neue Erwartung von 20 Lab-Karten aktualisiert. Die öffentlich erreichbare Version unter `https://snat.ovh/AB-620/` muss nach dem Deployment erneut geprüft werden; sie lief zum Zeitpunkt dieses Umbaus noch mit dem vorherigen Stand.

## Bekannte Einschränkungen

- Fortschritt wird ausschließlich lokal im Browser gespeichert (`localStorage`) — kein Konto, keine Synchronisation zwischen Geräten.
- Die Inhalte sind eine eigenständige Aufbereitung des Prüfungsstoffs, kein Ersatz für die offizielle Microsoft-Dokumentation.

## Weiterführende Links

- [Offizieller Microsoft Learn Study Guide zu AB-620](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-620)
