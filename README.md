# Schulnoten‑Manager

Eine moderne, vollständig funktionale Progressive Web App (PWA) mit iOS 26 Liquid Glass Design für deutsche Schülerinnen und Schüler, um Noten zu erfassen, zu gewichten, zu analysieren und zu exportieren.

## ✨ Features

### 📊 Notenverwaltung
- **Zwei Notensysteme**: 1–6 (mit +/−) oder 0–15 Punkte (Oberstufe)
- **Fächer**: Name, Farbe, Gewichtung (schriftlich/mündlich)
- **Noten**: Schriftlich & mündlich mit Typ, Datum, Löschfunktion
- **Bearbeitung**: Fächer und Noten können bearbeitet/gelöscht werden
- **Validierung**: Automatische Prüfung von Noteneingaben

### 🎯 Ziele & Tracking
- Individuelle Ziele pro Fach setzen
- Fortschrittsbalken mit Prozentanzeige
- Deadline-Tracking
- Zielerreichung markieren

### 📊 Analysen & Trends
- Gesamtdurchschnitt über alle Fächer
- Historische Notenentwicklung als Liniendiagramm
- Farbcodierte Visualisierung nach Fach
- Chronologische Darstellung aller Noten

### 💾 Daten & Sicherheit
- **IndexedDB**: Persistente Speicherung (auch nach Cache-Löschung)
- **Export**: JSON, CSV, PDF, PNG
- **Import**: JSON-Datenimport
- **Backup**: Automatische Backups mit Wiederherstellung
- **Offline**: Vollständig offline-fähig (PWA)

### 🎨 Design
- **iOS 26 Liquid Glass**: Frosted Glass-Effekte, Blur, Transluzenz
- **Responsive**: Optimiert für Mobile, Tablet, Desktop
- **Dark Mode**: Modernes dunkles Design
- **Animationen**: Smooth transitions und hover-effects

### 🌍 Internationalisierung
- Deutsch & Englisch
- Erweiterbar für weitere Sprachen

### ♿ Barrierefreiheit
- ARIA-Labels
- Keyboard-Navigation
- Screen-Reader-Unterstützung

## 🚀 Starten

### Lokal
Öffne `index.html` direkt im Browser. Kein Build-Prozess nötig!

### Mit Live-Reload
```bash
python -m http.server 8000
# oder
npx serve
```

Dann zu `http://localhost:8000` navigieren.

### Als PWA installieren
1. Öffne die App in Chrome/Edge/Safari
2. Klicke auf das Install-Icon in der Adressleiste
3. Die App wird wie eine native App installiert

## 🛠️ Technologie

- **Vanilla JavaScript** (ES6 Modules)
- **CSS3** (Custom Properties, Backdrop Filter)
- **IndexedDB** (Persistente Speicherung)
- **Service Worker** (Offline-Funktionalität)
- **Canvas API** (Charts & Export)
- **jsPDF** (PDF-Export)
- **Keine Dependencies** (außer jsPDF via CDN)

## 📝 Architektur

```
src/
  js/
    app.js       → Entry point, initialization
    state.js     → State management & persistence
    storage.js   → IndexedDB wrapper
    ui.js        → UI rendering & views
    grades.js    → Grade calculations & conversions
    modal.js     → Modal dialogs & toasts
    export.js    → Export/Import functionality
    i18n.js      → Internationalization
  css/
    styles.css   → iOS 26 Liquid Glass design
  assets/
    (PWA icons)
index.html       → Main HTML
manifest.json    → PWA manifest
sw.js            → Service Worker
```

## 🎓 Nutzung

1. **Fach hinzufügen**: Klicke "Fach hinzufügen", gib Name, Farbe und Gewichtung ein
2. **Note hinzufügen**: In der Fach-Karte auf "Schriftliche Note" oder "Mündliche Note" klicken
3. **Ziel setzen**: Im Ziele-Tab auf "Ziel hinzufügen" klicken
4. **Export**: Im Export-Tab gewünschtes Format wählen
5. **Backup**: Regelmäßig Backups erstellen für zusätzliche Sicherheit

## 📱 Mobile App

Die PWA kann auf iOS/iPadOS und Android wie eine native App installiert werden:

- **iOS/iPadOS**: Safari → Teilen → "Zum Home-Bildschirm"
- **Android**: Chrome → Menü → "Zum Startbildschirm hinzufügen"
- **Desktop**: Chrome/Edge → Install-Icon in Adressleiste

## 🔐 Datensicherheit

Alle Daten werden **ausschließlich lokal** auf deinem Gerät gespeichert:
- Keine Server-Kommunikation
- Keine Cloud-Speicherung
- Keine Tracking oder Analytics
- Du hast volle Kontrolle über deine Daten

## 🧑‍💻 Entwicklung

Siehe [WARP.md](WARP.md) für detaillierte Entwickler-Dokumentation.

## 📝 Lizenz

Dieses Projekt ist Open Source. Fühle dich frei, es zu nutzen und anzupassen!

---

**Viel Erfolg beim Lernen! 🎓✨**
