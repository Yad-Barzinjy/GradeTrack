# 📱 App Store Veröffentlichung - GradeTrack

Deine App ist jetzt online unter: https://gradetrack-online.netlify.app

## Schnellstart: PWABuilder nutzen

### Schritt 1: PWABuilder öffnen

1. Gehe zu: https://www.pwabuilder.com
2. Gib deine URL ein: `https://gradetrack-online.netlify.app`
3. Klicke: **"Start"**

### Schritt 2: PWA Score überprüfen

PWABuilder analysiert deine App automatisch:
- ✅ Manifest vorhanden
- ✅ Service Worker aktiv
- ✅ HTTPS aktiviert
- ✅ Icons vorhanden
- ✅ Offline-fähig

Deine App sollte einen **hohen Score** haben! (85-100)

### Schritt 3: Für iOS verpacken

1. Scrolle runter zu **"Package For Stores"**
2. Klicke auf: **"iOS"**
3. PWABuilder erstellt ein Xcode-Projekt
4. Folge den Anweisungen zum Download

**Was du brauchst:**
- Apple Developer Account (99€/Jahr): https://developer.apple.com/programs/
- Mac mit Xcode installiert
- iPhone zum Testen (optional, aber empfohlen)

**Schritte in Xcode:**
1. Öffne das heruntergeladene Projekt
2. Ändere Bundle Identifier: `com.gradetrack.app`
3. Signing & Capabilities konfigurieren
4. Auf echtem Gerät testen
5. Archive erstellen
6. Zu App Store Connect hochladen
7. App-Informationen ausfüllen
8. Screenshots erstellen (siehe unten)
9. Zur Review einreichen

**Dauer:** 1-3 Tage für Apple Review

### Schritt 4: Für Android verpacken

1. Scrolle zu **"Package For Stores"**
2. Klicke auf: **"Android"**
3. Konfiguriere:
   - App Name: **GradeTrack**
   - Package ID: `com.gradetrack.app`
   - App Version: `1.0.0`
4. Klicke: **"Generate"**
5. Lade **Android App Bundle (.aab)** herunter

**Was du brauchst:**
- Google Play Console Account (25€ einmalig): https://play.google.com/console/signup

**Schritte im Play Console:**
1. Gehe zu: https://play.google.com/console
2. Klicke: **"Create app"**
3. Fülle aus:
   - App-Name: **GradeTrack - Notenverwaltung**
   - Standardsprache: **Deutsch**
   - App oder Spiel: **App**
   - Kostenlos oder kostenpflichtig: **Kostenlos**
4. Lade die .aab-Datei hoch (unter "Release" → "Production")
5. Fülle Store-Listing aus (siehe Texte unten)
6. Lade Screenshots hoch
7. Content-Rating ausfüllen (Everyone/Alle)
8. Datenschutzerklärung URL (optional)
9. Zur Review einreichen

**Dauer:** Normalerweise 1-2 Tage, manchmal nur Stunden

---

## 📝 Store-Listing Texte

### App-Name
```
GradeTrack - Notenverwaltung
```

### Kurzbeschreibung (80 Zeichen - Google Play)
```
Schulnoten verwalten, Ziele setzen & Entwicklung tracken - offline nutzbar
```

### Beschreibung (beide Stores)

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
• Daten überleben Browser-Cache-Löschungen

🎨 Modernes Design
• iOS 26 Liquid Glass Design mit Frosted Glass-Effekten
• Dunkles Design (optimiert für OLED)
• Vollständig responsive für Smartphone & Tablet
• Smooth Animationen und intuitive Bedienung

🌐 Offline-First
• Vollständig offline nutzbar
• Progressive Web App (PWA)
• Service Worker für Performance
• Kein Internet erforderlich

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

---

Du hast Fragen oder Verbesserungsvorschläge? 
Kontaktiere uns auf GitHub: https://github.com/Yad-Barzinjy/GradeTrack
```

### Keywords (Google Play)
```
schulnoten, noten, notenverwaltung, notenrechner, schule, gymnasium, 
realschule, oberstufe, abitur, punkte, durchschnitt, zeugnis, lernen, 
bildung, schüler, student, offline, pwa, deutsch, grade tracker
```

### Kategorie
- **Google Play:** Education
- **iOS App Store:** Education

---

## 📸 Screenshots erstellen

Du brauchst hochwertige Screenshots für beide Stores.

### Benötigte Größen:

**iOS App Store:**
- iPhone: 1290 x 2796 px (iPhone 15 Pro Max)
- Optional iPad: 2048 x 2732 px

**Google Play Store:**
- Phone: 1080 x 1920 px (Minimum)
- Empfohlen: 1440 x 2560 px
- Optional Tablet: 1920 x 1200 px

### Wie Screenshots erstellen:

**Methode 1: Chrome DevTools (Einfach)**
1. Öffne https://gradetrack-online.netlify.app in Chrome
2. Drücke F12 (DevTools öffnen)
3. Klicke auf das Device-Symbol (Toggle device toolbar)
4. Wähle Device: "Responsive"
5. Setze Dimension: 1440 x 2560 (oder 1290 x 2796 für iOS)
6. Klicke auf ⋮ (drei Punkte) → "Capture screenshot"

**Methode 2: Online-Tool**
- Nutze https://mockuphone.com für professionelle Screenshots mit Device-Rahmen

### Welche Screenshots:

**Mindestens 4-5 Screenshots:**
1. **Fächer-Übersicht** (mit mehreren Fächern und Noten)
2. **Gesamtübersicht** (zeigt Durchschnitte)
3. **Entwicklungs-Chart** (zeigt Notenverläufe)
4. **Ziele-Ansicht** (mit Fortschrittsbalken)
5. **Export-Optionen** (zeigt Features)

**Tipp:** Füge mit einem Bildbearbeitungsprogramm Text hinzu:
- "Beide Notensysteme"
- "Ziele setzen & erreichen"
- "Entwicklung visualisieren"
- "Vollständig offline"

---

## 🎨 App-Icon

Du hast bereits perfekte Icons:
- `web-app-manifest-192x192.png` (für Android)
- `web-app-manifest-512x512.png` (für hochauflösende Displays)
- `apple-touch-icon.png` (für iOS)

Diese kannst du direkt nutzen!

---

## 📋 Checkliste vor der Veröffentlichung

### Technisch:
- [x] App läuft auf https://gradetrack-online.netlify.app
- [x] PWA-Manifest vorhanden
- [x] Service Worker aktiv
- [x] Icons in allen Größen vorhanden
- [x] Offline-Funktionalität getestet
- [ ] Auf echtem iPhone getestet
- [ ] Auf echtem Android-Gerät getestet
- [ ] Alle Features manuell durchgetestet

### Content:
- [ ] Screenshots erstellt (mindestens 4-5)
- [ ] App-Icon vorbereitet
- [ ] Beschreibungstext kopiert
- [ ] Keywords definiert
- [ ] Datenschutzerklärung erstellt (optional, aber empfohlen)
- [ ] Support-Email/URL bereit

### Accounts:
- [ ] Apple Developer Account (falls iOS gewünscht)
- [ ] Google Play Console Account (falls Android gewünscht)

---

## 💰 Kosten Übersicht

| Platform | Einmalig | Jährlich | Dauer bis live |
|----------|----------|----------|----------------|
| PWA (Kostenlos) | 0€ | 0€ | Sofort ✅ |
| Google Play | 25€ | 0€ | 1-2 Tage |
| Apple App Store | 0€ | 99€ | 1-3 Tage |

**Empfehlung:** Starte mit PWA (ist bereits live!) und veröffentliche später in den Stores, wenn du Feedback gesammelt hast.

---

## 🆘 Support & Hilfe

**Bei Fragen:**
1. GitHub Issues: https://github.com/Yad-Barzinjy/GradeTrack/issues
2. PWABuilder Discord: https://discord.gg/pwabuilder
3. Netlify Support: https://answers.netlify.com

**Häufige Probleme:**
- **"App wird nicht installiert":** Überprüfe, ob HTTPS aktiv ist (✅ ist es!)
- **"PWA Score zu niedrig":** Alle Kriterien sind erfüllt (✅)
- **"Icons fehlen":** Sind vorhanden (✅)

---

## 🚀 Nächste Schritte

1. **Sofort:** Installiere die PWA auf deinem Smartphone
2. **Diese Woche:** Teste alle Features gründlich
3. **Nächste Woche:** Sammle Feedback von Freunden/Mitschülern
4. **Später:** Entscheide, ob du in App Stores veröffentlichen möchtest

**Die PWA ist bereits vollständig funktional und kann von jedem genutzt werden! 🎉**

Teile einfach den Link: https://gradetrack-online.netlify.app
