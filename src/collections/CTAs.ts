import type { CollectionConfig } from 'payload'
import type { MarketingPluginConfig } from '../types'

export const CTAs = (config?: MarketingPluginConfig): CollectionConfig => ({
  slug: config?.ctasSlug || 'mk-ctas',
  labels: {
    singular: 'CTA Widget',
    plural: config?.labels?.ctas || 'CTA Widgets',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'active', 'clicks', 'updatedAt'],
    group: 'Marketing',
    description: 'Floating Buttons, Sticky Bars & Slide-Ins für Conversions',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name (intern)',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktiv',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Widget-Typ',
      required: true,
      options: [
        { label: 'Floating Button (Rechts unten)', value: 'floating-button' },
        { label: 'Sticky Bar (Oben/Unten fixiert)', value: 'sticky-bar' },
        { label: 'Slide-In (Von der Seite)', value: 'slide-in' },
        { label: 'Corner Box (Kleine Info-Box)', value: 'corner-box' },
      ],
      admin: {
        description: 'Welcher Widget-Typ soll verwendet werden?',
      },
    },
    {
      name: 'text',
      type: 'text',
      label: 'Text',
      required: true,
      admin: {
        description: 'Button-Text oder Nachricht',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link-URL',
      required: true,
      admin: {
        description: 'Wohin führt der Klick?',
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon (optional)',
      options: [
        { label: 'Kein Icon', value: 'none' },
        { label: 'Telefon', value: 'phone' },
        { label: 'E-Mail', value: 'email' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Chat', value: 'chat' },
        { label: 'Kalender', value: 'calendar' },
        { label: 'Download', value: 'download' },
      ],
      defaultValue: 'none',
    },
    {
      name: 'position',
      type: 'select',
      label: 'Position',
      options: [
        { label: 'Rechts unten', value: 'bottom-right' },
        { label: 'Links unten', value: 'bottom-left' },
        { label: 'Oben fixiert', value: 'top-fixed' },
        { label: 'Unten fixiert', value: 'bottom-fixed' },
        { label: 'Rechts Mitte', value: 'right-center' },
      ],
      defaultValue: 'bottom-right',
      admin: {
        condition: (_, siblingData) => siblingData?.type !== 'sticky-bar',
      },
    },
    {
      name: 'barPosition',
      type: 'select',
      label: 'Bar-Position',
      options: [
        { label: 'Oben', value: 'top' },
        { label: 'Unten', value: 'bottom' },
      ],
      defaultValue: 'top',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'sticky-bar',
      },
    },
    {
      name: 'color',
      type: 'select',
      label: 'Farbe',
      options: [
        { label: 'Blau', value: 'blue' },
        { label: 'Grün', value: 'green' },
        { label: 'Rot', value: 'red' },
        { label: 'Orange', value: 'orange' },
        { label: 'Lila', value: 'purple' },
        { label: 'Dunkel', value: 'dark' },
      ],
      defaultValue: 'blue',
    },
    {
      name: 'showDelay',
      type: 'number',
      label: 'Verzögerung (Sekunden)',
      defaultValue: 0,
      admin: {
        description: 'Nach wie vielen Sekunden soll das Widget erscheinen?',
      },
    },
    {
      name: 'closeable',
      type: 'checkbox',
      label: 'Schließbar',
      defaultValue: true,
      admin: {
        description: 'Kann der Nutzer das Widget schließen?',
      },
    },
    {
      name: 'showOnPages',
      type: 'select',
      label: 'Auf welchen Seiten?',
      options: [
        { label: 'Alle Seiten', value: 'all' },
        { label: 'Nur Homepage', value: 'homepage' },
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
    // Analytics
    {
      name: 'views',
      type: 'number',
      label: 'Anzeigen',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'clicks',
      type: 'number',
      label: 'Klicks',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
})

