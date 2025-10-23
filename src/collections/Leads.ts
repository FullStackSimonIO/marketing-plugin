import type { CollectionConfig } from 'payload'
import type { MarketingPluginConfig } from '../types'

export const Leads = (config?: MarketingPluginConfig): CollectionConfig => ({
  slug: config?.leadsSlug || 'mk-leads',
  labels: {
    singular: 'Lead',
    plural: config?.labels?.leads || 'Leads',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'utm_campaign', 'createdAt'],
    group: 'Marketing',
    description: 'Erfasste Leads mit UTM-Tracking & Conversion-Daten',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Kontaktdaten',
          fields: [
            {
              name: 'email',
              type: 'email',
              label: 'E-Mail',
              required: true,
              unique: true,
            },
            {
              name: 'name',
              type: 'text',
              label: 'Name',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Telefon',
            },
            {
              name: 'company',
              type: 'text',
              label: 'Firma',
            },
            {
              name: 'message',
              type: 'textarea',
              label: 'Nachricht',
            },
          ],
        },
        {
          label: 'Tracking',
          fields: [
            {
              name: 'source',
              type: 'text',
              label: 'Quelle',
              admin: {
                description: 'Woher kommt der Lead? (z.B. Popup, CTA, Formular)',
                readOnly: true,
              },
            },
            {
              name: 'page',
              type: 'text',
              label: 'Seiten-URL',
              admin: {
                description: 'Auf welcher Seite wurde der Lead generiert?',
                readOnly: true,
              },
            },
            {
              name: 'referrer',
              type: 'text',
              label: 'Referrer',
              admin: {
                description: 'Von welcher Seite kam der Besucher?',
                readOnly: true,
              },
            },
          ],
        },
        {
          label: 'UTM Parameter',
          fields: [
            {
              name: 'utm_source',
              type: 'text',
              label: 'UTM Source',
              admin: {
                description: 'z.B. google, facebook, newsletter',
                readOnly: true,
              },
            },
            {
              name: 'utm_medium',
              type: 'text',
              label: 'UTM Medium',
              admin: {
                description: 'z.B. cpc, email, organic',
                readOnly: true,
              },
            },
            {
              name: 'utm_campaign',
              type: 'text',
              label: 'UTM Campaign',
              admin: {
                description: 'Kampagnen-Name',
                readOnly: true,
              },
            },
            {
              name: 'utm_term',
              type: 'text',
              label: 'UTM Term',
              admin: {
                description: 'Keyword (bei Paid Ads)',
                readOnly: true,
              },
            },
            {
              name: 'utm_content',
              type: 'text',
              label: 'UTM Content',
              admin: {
                description: 'Anzeigen-Variante oder Link-Text',
                readOnly: true,
              },
            },
          ],
        },
        {
          label: 'Verwaltung',
          fields: [
            {
              name: 'status',
              type: 'select',
              label: 'Status',
              options: [
                { label: 'Neu', value: 'new' },
                { label: 'Kontaktiert', value: 'contacted' },
                { label: 'Qualifiziert', value: 'qualified' },
                { label: 'Konvertiert', value: 'converted' },
                { label: 'Verloren', value: 'lost' },
              ],
              defaultValue: 'new',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'assignedTo',
              type: 'relationship',
              relationTo: 'users',
              label: 'Zugewiesen an',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                },
              ],
              admin: {
                description: 'Kategorisierung für Segmentierung',
              },
            },
            {
              name: 'notes',
              type: 'textarea',
              label: 'Notizen',
              admin: {
                description: 'Interne Notizen zum Lead',
              },
            },
          ],
        },
      ],
    },
  ],
})

