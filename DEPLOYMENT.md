# 🚀 Deployment Guide - Schulnoten-Manager

## Teil A: Online-Veröffentlichung mit Netlify

### Schritt 1: GitHub Repository erstellen

1. Gehe zu https://github.com/new
2. Repository-Name: `schulnoten-manager-web`
3. Beschreibung: "📚 Moderne PWA für deutsche Schüler zum Verwalten von Noten mit iOS 26 Liquid Glass Design"
4. Wähle: **Public** (damit es für alle nutzbar ist)
5. **Nicht** "Initialize with README" ankreuzen (wir haben schon eins)
6. Klicke auf **Create repository**

### Schritt 2: Code zu GitHub pushen

Führe im Terminal (in diesem Projektordner) aus:

```bash
git remote add origin https://github.com/DEIN_USERNAME/schulnoten-manager-web.git
git branch -M main
git push -u origin main
```

(Ersetze `DEIN_USERNAME` mit deinem GitHub-Nutzernamen)

### Schritt 3: Netlify-Account erstellen und verbinden

1. Gehe zu https://app.netlify.com/signup
2. Wähle **"Sign up with GitHub"**
3. Autorisiere Netlify, auf deine GitHub-Repositories zuzugreifen

### Schritt 4: Site deployen

1. Klicke auf **"Add new site"** → **"Import an existing project"**
2. Wähle **"Deploy with GitHub"**
3. Suche und wähle `schulnoten-manager-web`
4. Build-Einstellungen werden automatisch erkannt (netlify.toml)
5. Klicke auf **"Deploy site"**

### Schritt 5: Custom Domain (optional)

Nach dem Deployment:
1. Gehe zu **Site settings** → **Domain management**
2. Klicke auf **"Add custom domain"**
3. Empfehlung: `schulnoten.netlify.app` oder eigene Domain

**🎉 Fertig! Deine App ist jetzt online unter: `https://DEIN-SITE-NAME.netlify.app`**

---

## Teil B: Mobile App Veröffentlichung

### iOS (App Store)

#### Voraussetzungen:
- Apple Developer Account (99€/Jahr): https://developer.apple.com/programs/
- macOS mit Xcode
- Capacitor oder PWABuilder

#### Option 1: PWA-Installation (Kostenlos, sofort verfügbar)
Die App ist bereits PWA-fähig! Benutzer können sie installieren:
1. Safari öffnen auf iOS
2. Zu deiner Netlify-URL gehen
3. Tippen auf Teilen-Button
4. "Zum Home-Bildschirm" wählen
5. ✅ App ist installiert!

#### Option 2: Native iOS App mit PWABuilder (Einfacher)

1. Gehe zu https://www.pwabuilder.com
2. Gib deine Netlify-URL ein
3. Klicke auf "Start"
4. PWABuilder analysiert deine App
5. Klicke auf **"Package For Stores"**
6. Wähle **"iOS"**
7. Folge den Anweisungen zum Erstellen eines iOS App Store Pakets

Dann:
8. Gehe zu https://appstoreconnect.apple.com
9. Erstelle eine neue App
10. Lade das Package hoch
11. Fülle App-Informationen, Screenshots aus
12. Sende zur Review

**Dauer:** 1-3 Tage für Apple-Review

#### Option 3: Native iOS App mit Capacitor (Mehr Kontrolle)

```bash
# Capacitor installieren
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios

# Projekt initialisieren
npx cap init "Schulnoten Manager" "com.schulnoten.manager"

# iOS Plattform hinzufügen
npx cap add ios

# Xcode öffnen
npx cap open ios
```

Dann in Xcode:
1. Signing & Capabilities konfigurieren
2. App auf echtem Gerät testen
3. Archive erstellen
4. Zu App Store hochladen

---

### Android (Google Play Store)

#### Voraussetzungen:
- Google Play Developer Account (25€ einmalig): https://play.google.com/console/signup
- Android Studio (optional)

#### Option 1: PWA-Installation (Kostenlos, sofort verfügbar)
1. Chrome öffnen auf Android
2. Zu deiner Netlify-URL gehen
3. Banner "App installieren" erscheint
4. Auf "Installieren" tippen
5. ✅ App ist installiert!

#### Option 2: Native Android App mit PWABuilder (Empfohlen)

1. Gehe zu https://www.pwabuilder.com
2. Gib deine Netlify-URL ein
3. Klicke auf "Start"
4. Klicke auf **"Package For Stores"**
5. Wähle **"Android"**
6. Lade **Android App Bundle (.aab)** herunter

Dann:
7. Gehe zu https://play.google.com/console
8. Erstelle eine neue App
9. Lade das .aab-File hoch
10. Fülle App-Informationen aus:
   - Titel: "Schulnoten-Manager"
   - Kurzbeschreibung: "Noten verwalten, Ziele setzen, Entwicklung tracken"
   - Vollständige Beschreibung: (siehe unten)
   - Screenshots: Min. 2 (Phone), optional Tablet
   - Icon: web-app-manifest-512x512.png
11. Content-Rating ausfüllen
12. Zielgruppe: Jugendliche & Erwachsene
13. Sende zur Review

**Dauer:** Normalerweise wenige Stunden, max. 1-2 Tage

#### Option 3: Native Android App mit Capacitor

```bash
# Android Plattform hinzufügen
npx cap add android

# Android Studio öffnen
npx cap open android
```

Dann in Android Studio:
1. Signing-Konfiguration einrichten
2. Build → Generate Signed Bundle / APK
3. App Bundle (.aab) erstellen
4. Zu Google Play hochladen

---

## App Store Beschreibungen

### Kurzbeschreibung (80 Zeichen)
```
Noten verwalten, Ziele setzen & Entwicklung tracken - für Schule & Oberstufe
```

### Vollständige Beschreibung

```
📚 Schulnoten-Manager - Deine Noten immer im Blick

Moderne, intuitive App für deutsche Schüler zum Verwalten von Schulnoten. 
Perfekt für Unter-, Mittel- und Oberstufe!

✨ FEATURES:

📊 Zwei Notensysteme
• Klassisch: 1-6 (mit 1+, 2-, etc.)
• Oberstufe: 0-15 Punkte
• Automatische Umrechnung

🎯 Intelligentes Tracking
• Fächer mit individueller Gewichtung (schriftlich/mündlich)
• Automatische Durchschnittsberechnung
• Historische Entwicklung visualisiert
• Gesamtübersicht über alle Fächer

🎖️ Ziele setzen & erreichen
• Persönliche Notenziele definieren
• Fortschrittsanzeige in Echtzeit
• Deadline-Tracking
• Motivierende Erfolgsanzeige

📈 Visualisierung
• Interaktive Charts zeigen deine Entwicklung
• Farbcodierung nach Fach
• Chronologische Darstellung

💾 Sicher & Privat
• Alle Daten nur lokal auf deinem Gerät
• Kein Cloud-Zwang, keine Accounts
• Export: JSON, CSV, PDF, Bild
• Automatische Backups

🎨 Modernes Design
• iOS 26 Liquid Glass Design
• Dark Mode
• Optimiert für Smartphone & Tablet
• Offline-fähig

🌍 Mehrsprachig
• Deutsch
• English

PERFEKT FÜR:
✓ Gymnasiasten (Unter-, Mittel-, Oberstufe)
✓ Realschüler
✓ Gesamtschüler
✓ Alle, die ihre Noten im Blick behalten wollen

🔒 DATENSCHUTZ:
• Keine Registrierung erforderlich
• Keine Datensammlung
• Keine Werbung
• 100% offline nutzbar

Entwickelt mit ❤️ für deutsche Schüler.
```

### Keywords (Google Play)
```
schulnoten, noten, notenverwaltung, schule, gymnasium, oberstufe, 
punkte, durchschnitt, zeugnis, lernen, bildung, schüler, abitur
```

---

## Screenshots erstellen

Für App Stores benötigst du Screenshots. Empfohlene Größen:

### iOS App Store
- iPhone: 1290 x 2796 px (iPhone 15 Pro Max)
- iPad: 2048 x 2732 px

### Google Play Store  
- Phone: 1080 x 1920 px (min) bis 1440 x 2560 px
- Tablet (optional): 1920 x 1200 px

**Tipp:** Nutze Chrome DevTools (F12) → Device Toolbar → Screenshot

Erstelle Screenshots von:
1. Fächer-Übersicht (mit Noten)
2. Gesamtübersicht (Durchschnitte)
3. Entwicklungs-Chart
4. Ziele-Ansicht
5. Export-Optionen

---

## Checkliste

### Vor der Veröffentlichung:
- [ ] App auf echtem Smartphone testen
- [ ] Beide Notensysteme testen
- [ ] Offline-Funktionalität prüfen
- [ ] Export-Funktionen testen
- [ ] Screenshots erstellen
- [ ] App-Icon vorbereiten (512x512 px)
- [ ] Datenschutzerklärung erstellen (falls erforderlich)

### Nach dem Launch:
- [ ] App-Link teilen
- [ ] Feedback sammeln
- [ ] Updates basierend auf Nutzer-Feedback

---

## Support & Updates

Bei Problemen oder Fragen:
1. Issues auf GitHub erstellen
2. Netlify-Logs prüfen
3. Browser-Console auf Fehler prüfen

**Viel Erfolg! 🎓✨**
