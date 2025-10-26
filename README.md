# 🚀 Payload Marketing Plugin

**Das ultimative All-in-One Marketing-Plugin für Payload CMS 3.x**

Verwandle dein Payload CMS in ein vollwertiges Marketing-Cockpit! Conversion-getrieben, messbar und DSGVO-konform.

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/FullStackSimonIO/marketing-plugin)
[![Payload](https://img.shields.io/badge/Payload-3.x-green.svg)](https://payloadcms.com)
[![License](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)

---

## ✨ Features im Überblick

### 🎯 Lead-Generierung

- **💬 Popup-System**: Exit-Intent, Scroll-Trigger, Time-Delay & mehr
- **🎨 CTA Widgets**: Floating Buttons, Sticky Bars, Slide-Ins
- **📋 Lead-Management**: Automatisches UTM-Tracking & Segmentierung

### 📊 Analytics & Tracking

- **📈 Integriertes Dashboard**: KPIs, Conversion-Rates, Performance-Metriken
- **🔍 UTM-Tracking**: Automatische Attribution von Kampagnen & Quellen
- **📉 Event-Tracking**: Popup-Views, Klicks, Conversions

### ⚙️ Automatisierung

- **🔗 Webhook-Integration**: Zapier, n8n, Make-Kompatibel
- **🤖 Auto-Tagging**: Leads automatisch kategorisieren
- **📧 E-Mail-Benachrichtigungen**: Bei neuen Leads

### 🔒 DSGVO & Datenschutz

- **✅ Cookie-Consent**: Opt-In vor Tracking
- **🛡️ Daten-Minimierung**: Konfigurierbare Aufbewahrungsfristen
- **📜 Audit-Trail**: Alle Events nachvollziehbar

---

## 📦 Installation

### Von GitHub installieren

```bash
pnpm add git+https://github.com/FullStackSimonIO/marketing-plugin.git
```

Oder mit npm/yarn:

```bash
npm install git+https://github.com/FullStackSimonIO/marketing-plugin.git
yarn add git+https://github.com/FullStackSimonIO/marketing-plugin.git
```

---

## 🚀 Schnellstart

### 1. Plugin in Payload Config registrieren

```typescript
// payload.config.ts
import { buildConfig } from 'payload'
import { payloadMarketingPlugin } from '@fullstack-factory/payload-marketing-plugin'

export default buildConfig({
  collections: [
    // Deine bestehenden Collections
  ],
  plugins: [
    payloadMarketingPlugin({
      // Optional: Konfiguration
      ga4MeasurementId: process.env.GA4_ID,
      metaPixelId: process.env.META_PIXEL_ID,
      webhookUrl: process.env.LEAD_WEBHOOK_URL,
    }),
  ],
})
```

### 2. Frontend-Komponenten einbinden

**Wichtig:** Binde die PopupProvider und CTAProvider Komponenten in dein Frontend-Layout ein:

```tsx
// app/(frontend)/layout.tsx
'use client'

import { PopupProvider, CTAProvider } from '@fullstack-factory/payload-marketing-plugin/components'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        {/* Marketing Components am Ende einfügen */}
        <PopupProvider />
        <CTAProvider />
      </body>
    </html>
  )
}
```

### 3. TypeScript-Typen generieren

```bash
pnpm payload generate:types
```

### 4. Migrationen ausführen

```bash
# Development
pnpm payload migrate

# Production
pnpm payload migrate:prod
```

### 5. Admin Panel öffnen

```
http://localhost:3000/admin
```

Im Admin findest du jetzt die neue **Marketing**-Gruppe mit allen Tools! 🎉

---

## 🎯 Collections & Features

### 1. 💬 Popups

**Conversion-optimierte Popups mit intelligenten Triggern**

#### Features:
- ✅ **Exit-Intent**: Trigger beim Verlassen der Seite
- ✅ **Scroll-Trigger**: Bei X% Scroll-Tiefe
- ✅ **Time-Delay**: Nach X Sekunden
- ✅ **Idle-Trigger**: Nach Inaktivität
- ✅ **Cookie-Management**: Nur einmal pro Besucher anzeigen
- ✅ **Conversion-Tracking**: Automatische Messung der Performance

#### Verwendung:

**Im Admin:**
1. Navigiere zu **Marketing → Popups**
2. Klicke auf **Neu erstellen**
3. Konfiguriere:
   - **Inhalt**: Überschrift, Text, CTA-Button
   - **Trigger**: Wann soll es erscheinen?
   - **Frequenz**: Wie oft anzeigen?
   - **Design**: Theme, Größe, Position

**Im Frontend:**
```tsx
// app/(frontend)/layout.tsx
import { PopupProvider } from '@fullstack-factory/payload-marketing-plugin/components'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <PopupProvider />
      </body>
    </html>
  )
}
```

**Verfügbare Trigger:**
- `immediate`: Zeigt Popup sofort beim Laden an
- `delay`: Nach X Sekunden Wartezeit
- `scroll`: Bei X% Scroll-Tiefe (z.B. 50%)
- `exit-intent`: Beim Verlassen der Seite (Mouse verlässt Viewport)
- `idle`: Nach X Sekunden Inaktivität

**Verfügbare Themes:**
- `default`: Klassisch weiß mit Schatten
- `minimal`: Minimalistisch und clean
- `modern`: Moderne Gradients und Farben
- `bold`: Dunkler Hintergrund, starker Kontrast

**Positionen:**
- `center`: Zentral im Viewport
- `top-left`, `top-right`: Oben links/rechts
- `bottom-left`, `bottom-right`: Unten links/rechts

---

### 2. 🎨 CTA Widgets

**Sticky Buttons, Floating CTAs & Slide-Ins**

#### Widget-Typen:

| Typ | Beschreibung | Best Use Case |
|-----|--------------|---------------|
| **Floating Button** | Rechts/Links unten fixiert | WhatsApp, Telefon, Chat |
| **Sticky Bar** | Oben/Unten fixierte Leiste | Aktionen, Ankündigungen |
| **Slide-In** | Von Seite einfahrend | Newsletter, Angebote |
| **Corner Box** | Kleine Info-Box | Hinweise, Tipps |

#### Verwendung:

**Im Admin:**
1. **Marketing → CTA Widgets**
2. Widget-Typ wählen
3. Text, Link & Icon konfigurieren
4. Auf gewünschten Seiten aktivieren

**Im Frontend:**
```tsx
// app/(frontend)/layout.tsx
import { CTAProvider } from '@fullstack-factory/payload-marketing-plugin/components'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CTAProvider />
      </body>
    </html>
  )
}
```

**Beispiel: WhatsApp-Button**
```
Name: WhatsApp Kontakt
Typ: Floating Button
Text: Jetzt chatten
Link: https://wa.me/491234567890
Icon: WhatsApp
Position: Rechts unten
```

---

### 3. 📋 Leads

**Zentrale Lead-Verwaltung mit UTM-Tracking**

#### Automatisch erfasst:
- ✅ **Kontaktdaten**: E-Mail, Name, Telefon, Nachricht
- ✅ **Tracking**: Quelle (Popup/CTA/Formular), Seiten-URL, Referrer
- ✅ **UTM-Parameter**: Source, Medium, Campaign, Term, Content
- ✅ **Zeitstempel**: Genaue Erfassung wann Lead generiert wurde

#### Lead-Status:
- **Neu**: Frisch erfasster Lead
- **Kontaktiert**: Erste Kontaktaufnahme erfolgt
- **Qualifiziert**: Lead ist interessant
- **Konvertiert**: Aus Lead wurde Kunde
- **Verloren**: Lead nicht erfolgreich

#### Segmentierung:

**Tags verwenden**:
```
Tags: ["Google Ads", "Immobilien", "Hochwertig"]
```

**Zuweisen**:
Leads können Team-Mitgliedern zugewiesen werden.

---

### 4. 📊 Marketing Events

**Tracking aller Marketing-Aktivitäten**

#### Erfasste Events:
- `popup_shown`: Popup wurde angezeigt
- `popup_closed`: Popup wurde geschlossen
- `popup_converted`: CTA im Popup geklickt
- `cta_clicked`: CTA-Widget geklickt
- `form_submitted`: Formular abgesendet
- `page_viewed`: Seite aufgerufen
- `link_clicked`: Interner Link geklickt

#### Automatisches Tracking im Frontend:

Die PopupProvider und CTAProvider Komponenten senden automatisch Tracking-Events. Du kannst auch manuell Events tracken:

```typescript
// Manuelles Event-Tracking
await fetch('/api/mk-events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventType: 'custom_event',
    elementId: 'custom-element-123',
    page: window.location.href,
    metadata: {
      customField: 'customValue'
    }
  }),
})
```

---

## ⚙️ Konfiguration

### Alle Optionen

```typescript
payloadMarketingPlugin({
  // Slugs anpassen
  popupsSlug: 'mk-popups',           // Default
  ctasSlug: 'mk-ctas',               // Default
  leadsSlug: 'mk-leads',             // Default
  eventsSlug: 'mk-events',           // Default
  
  // Labels im Admin
  labels: {
    popups: 'Marketing Popups',
    ctas: 'CTA Widgets',
    leads: 'Leads',
    events: 'Marketing Events',
  },
  
  // Media Collection
  mediaCollectionSlug: 'media',      // Default
  
  // Tracking-IDs
  ga4MeasurementId: 'G-XXXXXXXXXX',
  gtmId: 'GTM-XXXXXXX',
  metaPixelId: '123456789012345',
  
  // Webhook für Leads
  webhookUrl: 'https://hooks.zapier.com/...',
  
  // DSGVO
  gdprMode: true,                    // Default
  
  // Features
  enableAnalyticsDashboard: true,    // Default
  enableUTMTracking: true,           // Default
  enableABTesting: false,            // Beta
})
```

---

## 🔧 Frontend-Integration

### Beide Komponenten einbinden (Empfohlen)

```tsx
// app/(frontend)/layout.tsx
'use client'

import { PopupProvider, CTAProvider } from '@fullstack-factory/payload-marketing-plugin/components'

export default function Layout({ children }) {
  return (
    <>
      {children}
      {/* Beide Marketing-Provider am Ende einfügen */}
      <PopupProvider />
      <CTAProvider />
    </>
  )
}
```

### Einzelne Komponenten

**Nur Popups:**
```tsx
import { PopupProvider } from '@fullstack-factory/payload-marketing-plugin/components'

export default function Layout({ children }) {
  return (
    <>
      {children}
      <PopupProvider />
    </>
  )
}
```

**Nur CTA Widgets:**
```tsx
import { CTAProvider } from '@fullstack-factory/payload-marketing-plugin/components'

export default function Layout({ children }) {
  return (
    <>
      {children}
      <CTAProvider />
    </>
  )
}
```

---

## 📊 Analytics Dashboard

### KPIs im Überblick

Das Plugin erstellt automatisch ein Dashboard im Admin:

- **📈 Conversion-Rate**: Prozentsatz erfolgreicher Conversions
- **👥 Leads gesamt**: Anzahl erfasster Leads
- **🎯 Top-Kampagnen**: Performance nach UTM-Kampagne
- **📍 Top-Quellen**: Traffic-Quellen (UTM Source)
- **⏱️ Durchschnittliche Zeit**: Zeit bis zur Conversion

### Zugriff:

```
Admin → Marketing → Dashboard
```

---

## 🔗 Webhook-Integration

### Zapier

**Lead-Benachrichtigungen per Zapier**:

1. Erstelle einen Zapier Webhook-Trigger
2. Kopiere die Webhook-URL
3. Trage sie in **Marketing → Einstellungen** ein
4. **Payload sendet automatisch bei jedem neuen Lead:**

```json
{
  "email": "max@example.com",
  "name": "Max Mustermann",
  "source": "Exit-Intent Popup",
  "utm_campaign": "summer-sale-2024",
  "page": "https://example.com/immobilien"
}
```

### n8n

**Selbstgehostet & flexibel**:

1. Erstelle einen Webhook-Node in n8n
2. Webhook-URL kopieren
3. In Payload eintragen
4. Leads automatisch an CRM, E-Mail, Slack weiterleiten

---

## 🎨 Design-Anpassungen

### Popup-Themes

Das Plugin bietet 4 vorgefertigte Themes:

| Theme | Stil | Best für |
|-------|------|----------|
| **Default** | Klassisch, Clean | Allgemein |
| **Minimal** | Sehr schlicht | B2B, Premium |
| **Modern** | Gradient, Bold | E-Commerce |
| **Bold** | Kontrast, Auffällig | Aktionen, Sales |

### Custom CSS

```css
/* globals.css */

/* Popup-Container */
.marketing-popup {
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

/* CTA Button im Popup */
.marketing-popup__cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-weight: 700;
}

/* Floating Button */
.marketing-cta--floating {
  width: 70px;
  height: 70px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}
```

---

## 🛡️ DSGVO & Datenschutz

### Cookie-Consent

**Mit Ihrem Cookie-Consent-Tool**:

```tsx
// Erst Tracking starten nach Consent
import { startMarketingTracking } from '@fullstack-factory/payload-marketing-plugin/utils'

function CookieBanner() {
  const handleAccept = () => {
    // Consent akzeptiert
    startMarketingTracking()
  }
  
  return <button onClick={handleAccept}>Cookies akzeptieren</button>
}
```

### Daten-Aufbewahrung

**In Admin konfigurieren**:
```
Marketing → Einstellungen → DSGVO
→ Daten-Aufbewahrung: 365 Tage
```

Marketing-Events werden nach dieser Frist automatisch gelöscht.

---

## 📈 Best Practices

### 1. Exit-Intent Popups

**✅ Do:**
- Nur auf wichtigen Seiten (Produkte, Landing Pages)
- Starker Value-Prop ("10% Rabatt", "Kostenloses E-Book")
- Klare CTAs

**❌ Don't:**
- Auf jeder Seite (nervt!)
- Schwache Angebote
- Zu oft anzeigen

### 2. UTM-Tracking

**Konsistente Benennung**:
```
utm_source: google, facebook, newsletter
utm_medium: cpc, email, organic
utm_campaign: summer-sale-2024, launch-week
```

### 3. Lead-Qualifizierung

**Workflow**:
1. **Neu**: Automatisch erfasst
2. **Kontaktiert**: Nach 24h erste E-Mail
3. **Qualifiziert**: Nach Telefonat/Meeting
4. **Konvertiert**: Kunde geworden
5. **Verloren**: Nach 30 Tagen ohne Antwort

---

## 🔄 Updates & Changelog

### Version 1.1.0 (Aktuell)

**✨ Neue Features:**
- Frontend-Komponenten hinzugefügt: `PopupProvider` und `CTAProvider`
- Vollständiges Popup-System mit allen 5 Trigger-Typen
- 4 CTA-Widget-Typen implementiert
- Automatisches Event-Tracking integriert
- Cookie- und Session-Management

**🛠️ Verbesserungen:**
- Bessere TypeScript-Typen
- Optimierte Performance
- Erweiterte Dokumentation

### Version 1.0.0

- Initiales Release
- Backend-Collections (Popups, CTAs, Leads, Events)
- Admin-Interface
- REST API Endpoints

---

## 🐛 Troubleshooting

### Popups erscheinen nicht

**Checkliste:**
1. ✅ `PopupProvider` in Layout eingebunden?
2. ✅ Popup im Admin als "Aktiv" markiert?
3. ✅ Richtiger Trigger konfiguriert?
4. ✅ Cookie-Einstellungen überprüfen (ggf. Cookies löschen)
5. ✅ Browser-Console auf Fehler prüfen

### CTAs werden nicht angezeigt

**Checkliste:**
1. ✅ `CTAProvider` in Layout eingebunden?
2. ✅ CTA als "Aktiv" markiert?
3. ✅ Seiten-Filter korrekt konfiguriert?
4. ✅ Delay-Einstellung überprüfen

### TypeScript-Fehler

**Typen neu generieren:**
```bash
pnpm payload generate:types
```

---

## 📚 Weitere Ressourcen

- [Payload CMS Dokumentation](https://payloadcms.com/docs)
- [Plugin GitHub Repository](https://github.com/FullStackSimonIO/marketing-plugin)
- [Issue Tracker](https://github.com/FullStackSimonIO/marketing-plugin/issues)

---

## 🤝 Support & Kontakt

Bei Fragen oder Problemen:
- GitHub Issues: [https://github.com/FullStackSimonIO/marketing-plugin/issues](https://github.com/FullStackSimonIO/marketing-plugin/issues)
- E-Mail: support@fullstack-factory.de

---

## 📝 Lizenz

MIT License - siehe [LICENSE](LICENSE) Datei für Details.

---

**Made with ❤️ by [Fullstack Factory](https://github.com/FullStackSimonIO)**
