# 🚀 Payload Marketing Plugin

**Das ultimative All-in-One Marketing-Plugin für Payload CMS 3.x**

Verwandle dein Payload CMS in ein vollwertiges Marketing-Cockpit! Conversion-getrieben, messbar und DSGVO-konform.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/FullStackSimonIO/marketing-plugin)
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

### 2. TypeScript-Typen generieren

```bash
pnpm payload generate:types
```

### 3. Migrationen ausführen

```bash
# Development
pnpm payload migrate

# Production
pnpm payload migrate:prod
```

### 4. Admin Panel öffnen

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

```typescript
// Tracking-Event senden
await fetch('/api/marketing/event', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventType: 'popup_converted',
    elementId: 'popup-123',
    page: window.location.href,
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

### 1. Popup-Provider einbinden

```tsx
// app/(frontend)/layout.tsx
'use client'

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

### 2. CTA-Provider einbinden

```tsx
// app/(frontend)/layout.tsx
'use client'

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

### 3. Tracking-Script einbinden

```tsx
// app/(frontend)/layout.tsx
import { MarketingScripts } from '@fullstack-factory/payload-marketing-plugin/components'

export default function Layout({ children }) {
  return (
    <html>
      <head>
        <MarketingScripts />
      </head>
      <body>{children}</body>
    </html>
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
import { startMarketing Tracking } from '@fullstack-factory/payload-marketing-plugin/utils'

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

## 🔍 Troubleshooting

### Popups erscheinen nicht?

1. ✅ **Popup ist aktiv?** Check in Admin
2. ✅ **PopupProvider eingebunden?** In `layout.tsx`
3. ✅ **Cookie-Check:** Lösche Cookies und teste erneut
4. ✅ **URL-Filter:** Prüfe "Auf welchen Seiten anzeigen?"

### Tracking funktioniert nicht?

1. ✅ **Tracking-IDs korrekt?** GA4/GTM-ID prüfen
2. ✅ **DSGVO-Modus:** Cookie-Consent erforderlich?
3. ✅ **Browser-DevTools:** Console auf Fehler prüfen

### Leads werden nicht erfasst?

1. ✅ **API-Route erreichbar?** `/api/marketing/lead`
2. ✅ **CORS-Probleme?** Bei externen Formularen
3. ✅ **Webhook-URL:** Erreichbar? Secret korrekt?

---

## 📚 Beispiel-Use-Cases

### 1. Immobilienmakler

**Setup**:
- Exit-Intent Popup: "Kostenlose Bewertung Ihrer Immobilie"
- Sticky Bar: "Nur noch 3 Objekte verfügbar!"
- UTM-Tracking für Google Ads Kampagnen

### 2. SaaS-Startup

**Setup**:
- Time-Delay Popup nach 30s: "14 Tage kostenlos testen"
- Floating Button: "Live-Demo buchen"
- A/B-Test verschiedener CTA-Texte

### 3. E-Commerce

**Setup**:
- Scroll-Trigger bei 70%: "10% Rabatt für Newsletter"
- Corner-Box: "Kostenloser Versand ab 50€"
- Countdown-Timer: "Aktion endet in 2:14:59"

---

## 🤝 Support & Community

- 📧 **E-Mail**: support@fullstack-factory.de
- 🐛 **GitHub Issues**: [Marketing-Plugin Issues](https://github.com/FullStackSimonIO/marketing-plugin/issues)
- 📖 **Dokumentation**: [Ausführliche Docs](https://github.com/FullStackSimonIO/marketing-plugin/wiki)

---

## 📝 Lizenz

MIT © Fullstack Factory

---

## 🚀 Roadmap

### v1.1 (Coming Soon)
- [ ] A/B-Testing Dashboard
- [ ] Heatmap-Integration (Hotjar, Clarity)
- [ ] Erweiterte Landing-Page-Builder
- [ ] Multi-Step-Formulare

### v1.2 (Planned)
- [ ] KI-gestützte Conversion-Optimierung
- [ ] Automatische E-Mail-Sequenzen
- [ ] CRM-Integrationen (HubSpot, Pipedrive)

---

**Viel Erfolg mit deinem Marketing! 🚀**

Erstellt mit ❤️ von [Fullstack Factory](https://fullstack-factory.de)

