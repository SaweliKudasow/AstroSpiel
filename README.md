# Sternen-Memory · Astro Spiel

> Ein **Memory-Spiel** im Look des Nachthimmels: Ordne **Namen** und **Abbilder** von Sternbildern – rein im Browser, ohne Build-Tool und ohne Server.

---

## Über das Projekt

**Sternen-Memory** ist eine kleine Web-App zum Üben von Gedächtnis und Sternkunde. Auf einem **4×4-Feld** liegen **16 Karten** – je **8 Sternbilder** mit je zwei Karten:

- eine Karte zeigt den **deutschen Namen** des Sternbilds  
- die andere zeigt eine **stilisierte Sternfigur** (SVG, eingebettet, **ohne externe Bilder**)

Gültig ist nur ein Paar, wenn **derselbe Sternbild-Name** zur **passenden Abbildung** gehört (nicht zwei Namen- oder zwei Bildkarten).

Die Oberfläche ist **auf Deutsch**, mit **dunklem Astronomie-Design**, **funkelnden Sternen** im Hintergrund und einem **Gratulations-Overlay** nach dem letzten Paar.

---

## Funktionen


| Bereich                 | Beschreibung                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Spiel**               | Züge, gefundene Paare, Stoppuhr ab dem ersten Aufdecken                                                              |
| **Neues Spiel**         | Mischt die Karten neu, setzt Statistik und Zeit                                                                      |
| **Sternbilder**         | Orion, Großer Bär, Kassiopeia, Leier, Schwan, Skorpion, Löwe, Pegasus                                                |
| **Design**              | Dunkles Farbschema, Nebel-Verlauf, CSS-Animationen, `viewport-fit=cover` für iPhone                                  |
| **Sieg**                | Vollbild-Dialog mit Sternenregen, Meteoren, Aurora und Statistik                                                     |
| **Barrierefreiheit**    | `aria-live` für Status, Dialog mit Fokus, Tastatur (Enter/Leertaste auf Karten), **Escape** schließt den Sieg-Dialog |
| **Reduzierte Bewegung** | Bei `prefers-reduced-motion: reduce` werden intensive Animationen abgeschwächt                                       |


---

## Technologie

- **HTML5** – Struktur
- **CSS3** – Grid, Flexbox, Custom Properties, 3D-Kartenflip, Keyframes
- **Vanilla JavaScript** – ein IIFE, keine Frameworks

---

## Projektstruktur

```
Astro Spiel/
├── index.html      # Seite, Spielfeld, Sieg-Overlay
├── style.css       # Layout, Thema, Animationen
├── script.js       # Logik, Sternbild-Daten (SVG als Data-URLs), Effekte
└── README.md       # Diese Datei
```

---

## Starten

1. Repository bzw. Ordner lokal öffnen.
2. `**index.html**` im Browser öffnen (Doppelklick oder „Open with Live Server“ o. Ä.).

> Es ist **kein npm install** und **kein Build** nötig. Alle Grafiken der Sternfiguren sind **inline SVG** im JavaScript – das Spiel funktioniert auch **offline**, sobald die Dateien geladen sind.

---

## Lizenz & Mitwirkung

Projekt für Lern- und Demonstrationszwecke. Bei Ideen oder Fehlern einfach ein Issue oder Pull Request im jeweiligen Repository – oder lokal weiterbauen.

**Viel Spaß beim Spielen und Sterne zählen.**