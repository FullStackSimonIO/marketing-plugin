import type { CollectionConfig } from 'payload'
import type { MarketingPluginConfig } from '../types'

export const Popups = (config?: MarketingPluginConfig): CollectionConfig => ({
  slug: config?.popupsSlug || 'mk-popups',
  labels: {
    singular: 'Popup',
    plural: config?.labels?.popups || 'Marketing Popups',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'trigger', 'active', 'conversions', 'updatedAt'],
    group: 'Marketing',
    description: 'Exit-Intent, Scroll & Time-Delay Popups für Lead-Generierung',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Inhalt',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name (intern)',
              required: true,
              admin: {
                description: 'Interner Name zur Identifikation',
              },
            },
            {
              name: 'active',
              type: 'checkbox',
              label: 'Aktiv',
              defaultValue: false,
              admin: {
                position: 'sidebar',
                description: 'Popup aktivieren/deaktivieren',
              },
            },
            {
              name: 'title',
              type: 'text',
              label: 'Überschrift',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Beschreibung',
              admin: {
                description: 'Haupttext des Popups',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: config?.mediaCollectionSlug || 'media',
              label: 'Bild (optional)',
            },
            {
              name: 'ctaButton',
              type: 'group',
              label: 'Call-to-Action Button',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Button-Text',
                  required: true,
                  defaultValue: 'Jetzt anfordern',
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Link-URL',
                  admin: {
                    description: 'Externe URL oder interner Pfad',
                  },
                },
                {
                  name: 'variant',
                  type: 'select',
                  label: 'Button-Stil',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Outline', value: 'outline' },
                  ],
                  defaultValue: 'primary',
                },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              label: 'Zweiter Button (optional)',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Zweiten Button anzeigen',
                  defaultValue: false,
                },
                {
                  name: 'text',
                  type: 'text',
                  label: 'Button-Text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Link-URL',
                  admin: {
                    condition: (_, siblingData) => siblingData?.enabled,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Trigger & Verhalten',
          fields: [
            {
              name: 'trigger',
              type: 'select',
              label: 'Trigger-Typ',
              required: true,
              options: [
                { label: 'Sofort beim Laden', value: 'immediate' },
                { label: 'Nach X Sekunden', value: 'delay' },
                { label: 'Bei X% Scroll', value: 'scroll' },
                { label: 'Exit-Intent (Maus verlässt Fenster)', value: 'exit-intent' },
                { label: 'Nach Inaktivität', value: 'idle' },
              ],
              defaultValue: 'delay',
              admin: {
                description: 'Wann soll das Popup erscheinen?',
              },
            },
            {
              name: 'delaySeconds',
              type: 'number',
              label: 'Verzögerung (Sekunden)',
              defaultValue: 5,
              admin: {
                condition: (_, siblingData) => siblingData?.trigger === 'delay',
                description: 'Nach wie vielen Sekunden soll das Popup erscheinen?',
              },
            },
            {
              name: 'scrollPercent',
              type: 'number',
              label: 'Scroll-Prozent',
              defaultValue: 50,
              min: 0,
              max: 100,
              admin: {
                condition: (_, siblingData) => siblingData?.trigger === 'scroll',
                description: 'Bei wie viel % Scroll soll das Popup erscheinen?',
              },
            },
            {
              name: 'idleSeconds',
              type: 'number',
              label: 'Inaktivität (Sekunden)',
              defaultValue: 30,
              admin: {
                condition: (_, siblingData) => siblingData?.trigger === 'idle',
                description: 'Nach wie vielen Sekunden Inaktivität?',
              },
            },
            {
              name: 'position',
              type: 'select',
              label: 'Position',
              options: [
                { label: 'Zentriert (Modal)', value: 'center' },
                { label: 'Oben Links', value: 'top-left' },
                { label: 'Oben Rechts', value: 'top-right' },
                { label: 'Unten Links', value: 'bottom-left' },
                { label: 'Unten Rechts', value: 'bottom-right' },
              ],
              defaultValue: 'center',
            },
            {
              name: 'showOnPages',
              type: 'select',
              label: 'Auf welchen Seiten anzeigen?',
              options: [
                { label: 'Alle Seiten', value: 'all' },
                { label: 'Nur Homepage', value: 'homepage' },
                { label: 'Nur Landingpages', value: 'landing' },
                { label: 'Spezifische URLs', value: 'specific' },
              ],
              defaultValue: 'all',
            },
            {
              name: 'specificUrls',
              type: 'array',
              label: 'Spezifische URLs',
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                },
              ],
              admin: {
                condition: (_, siblingData) => siblingData?.showOnPages === 'specific',
              },
            },
          ],
        },
        {
          label: 'Frequenz & Cookies',
          fields: [
            {
              name: 'showOnce',
              type: 'checkbox',
              label: 'Nur einmal anzeigen (Cookie)',
              defaultValue: true,
              admin: {
                description: 'Popup nur einmal pro Besucher anzeigen',
              },
            },
            {
              name: 'cookieDays',
              type: 'number',
              label: 'Cookie-Gültigkeit (Tage)',
              defaultValue: 7,
              admin: {
                condition: (_, siblingData) => siblingData?.showOnce,
                description: 'Nach wie vielen Tagen darf das Popup erneut erscheinen?',
              },
            },
            {
              name: 'showMax',
              type: 'number',
              label: 'Maximale Anzahl pro Session',
              defaultValue: 1,
              admin: {
                description: 'Wie oft maximal pro Session anzeigen?',
              },
            },
          ],
        },
        {
          label: 'Design',
          fields: [
            {
              name: 'theme',
              type: 'select',
              label: 'Theme',
              options: [
                { label: 'Standard', value: 'default' },
                { label: 'Minimal', value: 'minimal' },
                { label: 'Modern', value: 'modern' },
                { label: 'Bold', value: 'bold' },
              ],
              defaultValue: 'default',
            },
            {
              name: 'size',
              type: 'select',
              label: 'Größe',
              options: [
                { label: 'Klein', value: 'small' },
                { label: 'Mittel', value: 'medium' },
                { label: 'Groß', value: 'large' },
              ],
              defaultValue: 'medium',
            },
            {
              name: 'overlay',
              type: 'checkbox',
              label: 'Dunkler Hintergrund (Overlay)',
              defaultValue: true,
            },
            {
              name: 'closeButton',
              type: 'checkbox',
              label: 'Schließen-Button anzeigen',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            {
              name: 'views',
              type: 'number',
              label: 'Anzeigen',
              defaultValue: 0,
              admin: {
                readOnly: true,
                description: 'Wie oft wurde das Popup angezeigt?',
              },
            },
            {
              name: 'conversions',
              type: 'number',
              label: 'Conversions',
              defaultValue: 0,
              admin: {
                readOnly: true,
                description: 'Wie oft wurde der CTA geklickt?',
              },
            },
            {
              name: 'closes',
              type: 'number',
              label: 'Schließungen',
              defaultValue: 0,
              admin: {
                readOnly: true,
                description: 'Wie oft wurde das Popup geschlossen?',
              },
            },
            {
              name: 'conversionRate',
              type: 'number',
              label: 'Conversion-Rate (%)',
              admin: {
                readOnly: true,
                description: 'Automatisch berechnet',
              },
              hooks: {
                beforeChange: [
                  ({ siblingData }) => {
                    if (siblingData?.views && siblingData?.conversions) {
                      return Math.round((siblingData.conversions / siblingData.views) * 100 * 100) / 100
                    }
                    return 0
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
})

