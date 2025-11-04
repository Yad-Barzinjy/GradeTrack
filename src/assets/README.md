# PWA Icons

Um die App vollständig als PWA zu nutzen, benötigen Sie Icons in folgenden Größen:

- icon-192.png (192x192 px)
- icon-512.png (512x512 px)

Sie können diese mit einem Online-Tool wie https://realfavicongenerator.net/ oder mit ImageMagick erstellen:

```bash
# Beispiel mit ImageMagick (wenn ein Logo vorhanden ist)
convert logo.png -resize 192x192 icon-192.png
convert logo.png -resize 512x512 icon-512.png
```

Bis dahin funktioniert die App vollständig, nur die Installation als PWA zeigt möglicherweise Standard-Icons an.
