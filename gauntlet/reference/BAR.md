# Referenz-Qualitätsbar: Coursera-Kursseite

Diese Datei fasst die beobachtbaren Struktur-/UX-Merkmale echter Coursera-Kursseiten zusammen,
die jeder Kritiker-Subagent als blinden Vergleichsmaßstab nutzt. Kein Screenshot-Tool war in
dieser Umgebung verfügbar (kein lauffähiger Chrome/Firefox) — die Referenz basiert daher auf
strukturiertem Text-Extrakt zweier echter, aktueller Coursera-Seiten (siehe coursera-course-page-*.md),
nicht auf Pixel-Screenshots. Das ist eine dokumentierte Einschränkung, keine Erfindung.

## Beobachtete Merkmale (aus echten Coursera-Seiten extrahiert)

1. **Modul-als-Wochen-Struktur**: "Week 1: Introduction to Machine Learning — 7 hours to complete",
   mit klarer Zeitangabe pro Modul, nicht nur Titel.
2. **Content-Typ-Aufschlüsselung pro Modul**: "20 videos • 1 reading • 3 assignments • 1 app item • 4 ungraded labs",
   sofort sichtbar was einen erwartet, bevor man klickt.
3. **Granulare Videoliste mit Einzeldauer**: jedes Video einzeln mit Titel + Minutenangabe gelistet.
4. **Skill-Tags als Chips**: "Machine Learning", "Regression Analysis" etc. als anklickbare Pillen,
   nicht als Fließtext.
5. **Sternebewertung + Reviewanzahl prominent**: "4.9 ★ · 32,830 reviews", mit Sterne-Verteilungsbalken
   (5★ 91.54%, 4★ 7.24% usw.).
6. **Soziale Beweisführung**: "1,236,565 already enrolled", "98% Most learners liked this course".
7. **Klare Aufwandserwartung**: "Beginner level", "3 weeks at 10 hours a week", "Flexible schedule".
8. **Echte Learner-Reviews mit Datum und Freitext**, nicht nur aggregierte Zahl.
9. **Klarer Call-to-Action**: "Enroll for free — Starts [Datum]" immer sichtbar.
10. **Progressive Disclosure**: "Show info about module content" collapsible statt alles auf einmal.

## Wie der Kritiker das nutzt

Für jedes zu bewertende Stück der AB-620-Seite: identifiziere das nächstliegende Coursera-Merkmal
aus der Liste oben, vergleiche BLIND (ohne zu wissen welche Version "unsere" ist) Version A gegen
Version B anhand dieses Merkmals, und entscheide, welche wirkt wie ein echter, poliert wirkender
Kurs vs. welche wirkt wie ein Prototyp. Beschreibe den größten verbleibenden Gap konkret und
umsetzbar (nicht "besser machen", sondern "füge X hinzu, ändere Y").
