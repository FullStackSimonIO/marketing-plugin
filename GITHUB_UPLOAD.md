# 📤 GitHub Upload - Anleitung

Das Marketing-Plugin ist fertig! Jetzt muss es nur noch auf GitHub hochgeladen werden.

## 🚀 Schnellstart (mit GitHub CLI)

```bash
cd /Users/fullstacksimon/Desktop/marketing-plugin

# GitHub CLI authentifizieren (einmalig)
gh auth login

# Repository erstellen und pushen
gh repo create marketing-plugin --public --source=. --description="🚀 Umfassendes Marketing-Plugin für Payload CMS 3.x - Popups, CTAs, Landing Pages, Analytics & Tracking" --push
```

---

## 📋 Alternative: Manuell über GitHub.com

### 1. GitHub Repository erstellen

1. Gehe zu [github.com/new](https://github.com/new)
2. **Repository name**: `marketing-plugin`
3. **Description**: `🚀 Umfassendes Marketing-Plugin für Payload CMS 3.x - Popups, CTAs, Landing Pages, Analytics & Tracking`
4. **Public** auswählen
5. **NICHT** "Initialize with README" ankreuzen (haben wir schon!)
6. Klicke **Create repository**

### 2. Lokal mit Remote verbinden

```bash
cd /Users/fullstacksimon/Desktop/marketing-plugin

# Remote hinzufügen
git remote add origin https://github.com/FullStackSimonIO/marketing-plugin.git

# Pushen
git branch -M main
git push -u origin main
```

---

## ✅ Bestätigung

Nach erfolgreichem Push solltest du sehen:

```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
...
To https://github.com/FullStackSimonIO/marketing-plugin.git
 * [new branch]      main -> main
```

Das Plugin ist jetzt live! 🎉

---

## 📦 Installation in anderen Projekten

Ab jetzt kann das Plugin so installiert werden:

```bash
pnpm add git+https://github.com/FullStackSimonIO/marketing-plugin.git
```

---

## 🏷️ Optional: Release erstellen

```bash
# Tag erstellen
git tag -a v1.0.0 -m "Version 1.0.0 - Initial Release"

# Tag pushen
git push origin v1.0.0
```

Dann auf GitHub: **Releases → Create a new release**

