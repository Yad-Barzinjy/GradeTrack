# 🤖 Google Play Store - Schritt-für-Schritt Anleitung

## Vorbereitung (Einmalig)

### 1. Google Play Developer Account erstellen

**Kosten:** 25€ einmalig (nur einmal, für alle zukünftigen Apps)

1. Gehe zu: https://play.google.com/console/signup
2. Logge dich mit deinem Google-Account ein
3. Akzeptiere die Entwickler-Vereinbarung
4. Zahle die 25€ Registrierungsgebühr
5. ✅ Account ist aktiviert (dauert ca. 48 Stunden)

---

## App mit PWABuilder erstellen

### Schritt 1: PWABuilder öffnen

1. Gehe zu: https://www.pwabuilder.com
2. Gib ein: `https://gradetrack-online.netlify.app`
3. Klicke: **"Start"**
4. Warte auf Analyse (5-10 Sekunden)

### Schritt 2: Android Package generieren

1. Scrolle zu **"Package For Stores"**
2. Finde die **Android** Karte
3. Klicke: **"Store Package"**

### Schritt 3: App-Details eingeben

Fülle das Formular aus:

```
Package ID: com.gradetrack.app
App name: GradeTrack
Launcher name: GradeTrack
Theme color: #007AFF
Background color: #0a0e27
Start URL: /
Display mode: standalone
Orientation: portrait
Icon URL: (wird automatisch erkannt)
Status bar color: #007AFF
```

**App Signing:**
- Wähle: **"New"** 
- PWABuilder generiert automatisch einen Signing Key für dich
- **WICHTIG:** Lade die `.zip` Datei mit den Keys herunter und bewahre sie sicher auf!

### Schritt 4: Generieren & Download

1. Klicke: **"Generate"**
2. Warte 10-20 Sekunden
3. **Download:** `gradetrack.aab` (Android App Bundle)
4. **Download:** `signing-key.zip` (Wichtig für Updates!)

**⚠️ WICHTIG:** Speichere `signing-key.zip` sicher! Du brauchst es für jedes Update!

---

## App zu Google Play hochladen

### Schritt 1: Play Console öffnen

1. Gehe zu: https://play.google.com/console
2. Logge dich ein
3. Klicke: **"Create app"**

### Schritt 2: App-Grunddaten

Fülle das Formular aus:

**App details:**
- **App name:** `GradeTrack - Notenverwaltung`
- **Default language:** Deutsch (Deutschland)
- **App or game:** App
- **Free or paid:** Free

**Declarations:**
- ✅ Bestätige, dass du die Developer Program Policies befolgst
- ✅ Bestätige, dass die App den US-Exportgesetzen entspricht

Klicke: **"Create app"**

### Schritt 3: Dashboard-Aufgaben

Du siehst jetzt eine Liste von Aufgaben, die du erledigen musst:

---

## 📋 Pflichtaufgaben erledigen

### 1. App access

**Frage:** Hat deine App eingeschränkten Zugang?
**Antwort:** Nein (die App ist für alle frei zugänglich)

Klicke: **"Save"**

### 2. Ads

**Frage:** Enthält deine App Werbung?
**Antwort:** **Nein**

Klicke: **"Save"**

### 3. Content rating

1. Klicke: **"Start questionnaire"**
2. **E-Mail eingeben** (für Kontakt)
3. **Kategorie:** Education
4. Frage zur Gewalt/Themen: **Nein** zu allen
5. Klicke: **"Save"**
6. Klicke: **"Submit"**
7. ✅ Rating: **Everyone** (sollte automatisch sein)

### 4. Target audience

1. **Age groups:** 13+ (da keine Elternfreigabe nötig)
2. **Appeal to children:** Nein
3. Klicke: **"Save"**

### 5. News app

**Frage:** Ist das eine News-App?
**Antwort:** **Nein**

### 6. COVID-19 contact tracing and status apps

**Frage:** Ist das eine COVID-Tracing-App?
**Antwort:** **Nein**

### 7. Data safety

**Wichtig!** Da deine App KEINE Daten sammelt:

1. **Does your app collect or share any user data?**
   - **Antwort:** No, this app does not collect or share any user data

2. Klicke: **"Save"**

Das ist einer der größten Vorteile deiner App! ✅

### 8. Government apps

**Frage:** Regierungs-App?
**Antwort:** **Nein**

### 9. Financial features

**Frage:** In-App-Käufe oder Finanz-Features?
**Antwort:** **Nein**

### 10. Health

**Frage:** Gesundheits-App?
**Antwort:** **Nein**

---

## 📱 Store Listing (App-Präsentation)

Klicke im Menü: **"Store listing"**

### App details

**App name:**
```
GradeTrack - Notenverwaltung
```

**Short description:** (Max. 80 Zeichen)
```
Schulnoten verwalten, Ziele setzen & Entwicklung tracken - offline
```

**Full description:** (Max. 4000 Zeichen)

```
📚 GradeTrack - Deine Noten immer im Blick

Die moderne App für deutsche Schüler zum Verwalten von Schulnoten. 
Perfekt für Unter-, Mittel- und Oberstufe!

✨ HAUPTFUNKTIONEN

📊 Flexible Notensysteme
• Klassisch: 1-6 (mit 1+, 2-, etc.)
• Oberstufe: 0-15 Punkte
• Automatische Umrechnung und Durchschnittsberechnung

🎯 Intelligentes Grade Tracking
• Fächer mit individueller Gewichtung (schriftlich/mündlich)
• Automatische Berechnung gewichteter Durchschnitte
• Gesamtübersicht über alle Fächer
• Historische Entwicklung visualisiert

🎖️ Ziele setzen & erreichen
• Persönliche Notenziele pro Fach definieren
• Visueller Fortschrittsbalken
• Deadline-Tracking
• Motivierende Erfolgsanzeige bei Zielerreichung

📈 Visualisierung & Analysen
• Interaktive Charts zeigen deine Notenentwicklung
• Farbcodierung nach Fach
• Chronologische Darstellung aller Noten
• Trends auf einen Blick erkennen

💾 Datensicherheit & Backup
• Alle Daten nur lokal auf deinem Gerät gespeichert
• Kein Cloud-Zwang, keine Accounts erforderlich
• Automatische Backups in IndexedDB
• Export: JSON, CSV, PDF, PNG
• Import-Funktion für Datenwiederherstellung

🎨 Modernes Design
• iOS 26 Liquid Glass Design mit Frosted Glass-Effekten
• Dunkles Design (optimiert für OLED)
• Vollständig responsive für Smartphone & Tablet
• Smooth Animationen und intuitive Bedienung

🌐 Offline-First
• Vollständig offline nutzbar
• Kein Internet erforderlich
• Alle Funktionen immer verfügbar

PERFEKT FÜR:
✓ Gymnasiasten (Sekundarstufe I & II)
✓ Realschüler
✓ Gesamtschüler
✓ Studenten (Notenverwaltung für Module)
✓ Alle, die ihre Noten organisiert im Blick behalten wollen

DATENSCHUTZ & SICHERHEIT:
• Keine Registrierung erforderlich
• Keine Datensammlung oder Tracking
• Keine Werbung
• Open Source (Code auf GitHub)
• 100% offline nutzbar
• DSGVO-konform

EXPORT-FUNKTIONEN:
• JSON: Für Backup und Datenübertragung
• CSV: Für Excel/Sheets-Import
• PDF: Professionelle Übersichten mit Diagrammen
• PNG: Visualisierungen als Bild

Die App wurde speziell für deutsche Schüler entwickelt und berücksichtigt 
beide gängigen Notensysteme. Egal ob du noch mit 1-6 bewertet wirst oder 
schon im Punktesystem der Oberstufe bist - GradeTrack passt sich an!

Entwickelt mit ❤️ für deutsche Schüler und Studenten.

Fragen oder Feedback? GitHub: https://github.com/Yad-Barzinjy/GradeTrack
```

**App icon:**
- Lade hoch: `web-app-manifest-512x512.png` aus deinem Projekt

**Feature graphic:** (1024 x 500 px)
- Erstelle ein Banner-Bild mit Logo und Text
- Oder nutze: https://www.canva.com (kostenlos)

**Phone screenshots:** (Minimum 2, Maximum 8)
- Du brauchst mindestens 2 Screenshots!
- Siehe unten wie du sie erstellst

**Contact details:**
- **Email:** deine-email@beispiel.de
- **Website:** https://gradetrack-online.netlify.app
- **Phone:** (optional)

**Privacy Policy URL:** (optional, aber empfohlen)
- Falls du keine hast, erstelle eine einfache auf: https://www.freeprivacypolicy.com

Klicke: **"Save"**

---

## 📸 Screenshots erstellen (WICHTIG!)

Du brauchst **mindestens 2 Screenshots** für Phone.

### Schnelle Methode mit Chrome:

1. Öffne: https://gradetrack-online.netlify.app in Chrome
2. Drücke **F12** (DevTools)
3. Klicke auf das **📱 Device-Symbol** (Toggle device toolbar)
4. Wähle: **"Pixel 5"** oder **"Responsive"**
5. Setze Auflösung: **1080 x 1920** (oder 1440 x 2560)
6. Navigiere zu verschiedenen Ansichten:
   - Fächer-Übersicht (füge Testdaten ein!)
   - Gesamtübersicht
   - Entwicklungs-Chart
   - Ziele
   - Export-Optionen
7. Für jeden Screenshot:
   - Klicke auf **⋮** (drei Punkte in DevTools)
   - **"Capture screenshot"**
   - Datei wird heruntergeladen

**Tipp:** Füge zuerst Testdaten ein (Fächer, Noten), damit die Screenshots nicht leer sind!

---

## 🚀 App hochladen & Release

### Schritt 1: Production Track

1. Klicke im Menü: **"Production"**
2. Klicke: **"Create new release"**

### Schritt 2: App Bundle hochladen

1. Klicke: **"Upload"** unter "App bundles"
2. Wähle die `.aab` Datei von PWABuilder
3. Warte auf Upload (30-60 Sekunden)
4. ✅ Bundle wird analysiert

### Schritt 3: Release details

**Release name:**
```
1.0.0
```

**Release notes - Deutsch:**
```
🎉 Erste Version von GradeTrack!

✨ Features:
• Beide Notensysteme (1-6 und 0-15 Punkte)
• Fächer mit Gewichtung verwalten
• Ziele setzen und tracken
• Entwicklung visualisieren
• Export: JSON, CSV, PDF, PNG
• Vollständig offline nutzbar
• Keine Werbung, kein Tracking
```

**Release notes - English:** (optional)
```
🎉 First release of GradeTrack!

✨ Features:
• Both grading systems (1-6 and 0-15 points)
• Manage subjects with weighting
• Set and track goals
• Visualize progress
• Export: JSON, CSV, PDF, PNG
• Fully offline capable
• No ads, no tracking
```

### Schritt 4: Review & Release

1. Scrolle nach unten
2. Überprüfe alles nochmal
3. Klicke: **"Save"**
4. Klicke: **"Review release"**
5. Überprüfe die Zusammenfassung
6. Klicke: **"Start rollout to Production"**
7. Bestätige mit: **"Rollout"**

---

## ⏱️ Review-Prozess

**Status:** "In review"

**Dauer:**
- Normalerweise: **2-24 Stunden**
- Manchmal: **1-3 Tage**

**Du wirst per Email benachrichtigt wenn:**
- ✅ App approved und live
- ❌ App rejected (mit Gründen)

**Nach Approval:**
- App ist im Google Play Store!
- Link: `https://play.google.com/store/apps/details?id=com.gradetrack.app`

---

## 📊 Nach dem Launch

### App-Link teilen:

```
https://play.google.com/store/apps/details?id=com.gradetrack.app
```

### Updates veröffentlichen:

1. Ändere Code auf GitHub
2. Netlify deployed automatisch
3. Gehe zu PWABuilder
4. Generiere neue `.aab` mit erhöhter Versionsnummer
5. Lade in Play Console hoch (gleicheProcess)
6. **Nutze die gleichen Signing Keys!** (aus `signing-key.zip`)

---

## 💡 Tipps & Tricks

**✅ Best Practices:**
- Antworte auf User-Reviews
- Nutze Google Play Console Analytics
- Aktualisiere regelmäßig
- Höre auf User-Feedback

**⚠️ Häufige Fehler:**
- Signing Keys verlieren → Keine Updates mehr möglich!
- Screenshots vergessen → App kann nicht reviewed werden
- Content Rating nicht ausgefüllt → Blockiert Release

**🆘 Probleme?**
- Google Play Console hat ein Help Center
- Community: https://support.google.com/googleplay/android-developer

---

## 🎉 Geschafft!

Deine App ist jetzt im Google Play Store!

**Nächste Schritte:**
1. Teile den Link mit Freunden
2. Bitte um Reviews
3. Sammle Feedback
4. Release Updates

**Glückwunsch! 🎊**
