import type { CollectionConfig } from 'payload'
import type { MarketingPluginConfig } from '../types'

export const MarketingEvents = (config?: MarketingPluginConfig): CollectionConfig => ({
  slug: config?.eventsSlug || 'mk-events',
  labels: {
    singular: 'Marketing Event',
    plural: config?.labels?.events || 'Marketing Events',
  },
  admin: {
    useAsTitle: 'eventType',
    defaultColumns: ['eventType', 'page', 'createdAt'],
    group: 'Marketing',
    description: 'Tracking von Marketing-Aktivitäten & User-Interaktionen',
    hidden: ({ user }) => !user,
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
  },
  fields: [
    {
      name: 'eventType',
      type: 'select',
      label: 'Event-Typ',
      required: true,
      options: [
        { label: 'Popup angezeigt', value: 'popup_shown' },
        { label: 'Popup geschlossen', value: 'popup_closed' },
        { label: 'Popup konvertiert', value: 'popup_converted' },
        { label: 'CTA geklickt', value: 'cta_clicked' },
        { label: 'Formular abgesendet', value: 'form_submitted' },
        { label: 'Seite aufgerufen', value: 'page_viewed' },
        { label: 'Link geklickt', value: 'link_clicked' },
      ],
    },
    {
      name: 'elementId',
      type: 'text',
      label: 'Element-ID',
      admin: {
        description: 'ID des Popups/CTAs/etc.',
      },
    },
    {
      name: 'page',
      type: 'text',
      label: 'Seiten-URL',
    },
    {
      name: 'sessionId',
      type: 'text',
      label: 'Session-ID',
      admin: {
        description: 'Eindeutige Session-Identifikation',
      },
    },
    {
      name: 'userId',
      type: 'text',
      label: 'User-ID (falls verfügbar)',
    },
    {
      name: 'metadata',
      type: 'json',
      label: 'Zusätzliche Daten',
      admin: {
        description: 'Event-spezifische Metadaten',
      },
    },
  ],
})

