import type { GlobalConfig } from 'payload'

export const MarketingSettings: GlobalConfig = {
  slug: 'mk-settings',
  label: 'Marketing Einstellungen',
  admin: {
    group: 'Marketing',
    description: 'Globale Marketing-Konfiguration & Tracking-IDs',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tracking-IDs',
          fields: [
            {
              name: 'ga4MeasurementId',
              type: 'text',
              label: 'Google Analytics 4 Measurement ID',
              admin: {
                description: 'z.B. G-XXXXXXXXXX',
                placeholder: 'G-XXXXXXXXXX',
              },
            },
            {
              name: 'gtmId',
              type: 'text',
              label: 'Google Tag Manager ID',
              admin: {
                description: 'z.B. GTM-XXXXXXX',
                placeholder: 'GTM-XXXXXXX',
              },
            },
            {
              name: 'metaPixelId',
              type: 'text',
              label: 'Meta (Facebook) Pixel ID',
              admin: {
                description: 'Numerische Pixel-ID',
                placeholder: '123456789012345',
              },
            },
            {
              name: 'linkedInInsightTag',
              type: 'text',
              label: 'LinkedIn Insight Tag ID',
              admin: {
                placeholder: '1234567',
              },
            },
          ],
        },
        {
          label: 'Webhooks & Integrationen',
          fields: [
            {
              name: 'leadWebhookUrl',
              type: 'text',
              label: 'Lead-Webhook URL',
              admin: {
                description: 'URL für automatische Lead-Benachrichtigungen (z.B. Zapier, n8n)',
                placeholder: 'https://hooks.zapier.com/...',
              },
            },
            {
              name: 'webhookSecret',
              type: 'text',
              label: 'Webhook Secret Key',
              admin: {
                description: 'Optional: Secret für Webhook-Authentifizierung',
              },
            },
          ],
        },
        {
          label: 'DSGVO & Datenschutz',
          fields: [
            {
              name: 'gdprMode',
              type: 'checkbox',
              label: 'DSGVO-Modus aktiviert',
              defaultValue: true,
              admin: {
                description: 'Cookie-Consent vor Tracking erforderlich',
              },
            },
            {
              name: 'cookieConsentRequired',
              type: 'checkbox',
              label: 'Cookie-Consent erforderlich',
              defaultValue: true,
            },
            {
              name: 'dataRetentionDays',
              type: 'number',
              label: 'Daten-Aufbewahrung (Tage)',
              defaultValue: 365,
              admin: {
                description: 'Nach wie vielen Tagen werden Marketing-Events gelöscht?',
              },
            },
          ],
        },
      ],
    },
  ],
}

