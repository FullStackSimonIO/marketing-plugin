import type { Config, Block, Field } from 'payload'

/**
 * Konfigurationsoptionen für das Marketing Plugin
 */
export interface MarketingPluginConfig {
  /**
   * Aktiviert oder deaktiviert das Plugin
   * @default true
   */
  enabled?: boolean

  /**
   * Slug für die Popups Collection
   * @default 'mk-popups'
   */
  popupsSlug?: string

  /**
   * Slug für die CTAs Collection
   * @default 'mk-ctas'
   */
  ctasSlug?: string

  /**
   * Slug für die Landing Pages Collection
   * @default 'mk-landing'
   */
  landingPagesSlug?: string

  /**
   * Slug für die Leads Collection
   * @default 'mk-leads'
   */
  leadsSlug?: string

  /**
   * Slug für die Marketing Events Collection
   * @default 'mk-events'
   */
  eventsSlug?: string

  /**
   * Labels im Admin anpassen
   */
  labels?: {
    popups?: string
    ctas?: string
    landingPages?: string
    leads?: string
    events?: string
  }

  /**
   * Media Collection Slug
   * @default 'media'
   */
  mediaCollectionSlug?: string

  /**
   * Benutzerdefinierte Hero-Blöcke für Landing Pages
   */
  heroBlocks?: Block[]

  /**
   * Benutzerdefinierte Content-Blöcke für Landing Pages
   */
  contentBlocks?: Block[]

  /**
   * Google Analytics 4 Measurement ID
   */
  ga4MeasurementId?: string

  /**
   * Google Tag Manager ID
   */
  gtmId?: string

  /**
   * Meta (Facebook) Pixel ID
   */
  metaPixelId?: string

  /**
   * Aktiviert das Analytics Dashboard
   * @default true
   */
  enableAnalyticsDashboard?: boolean

  /**
   * Aktiviert UTM-Tracking
   * @default true
   */
  enableUTMTracking?: boolean

  /**
   * Aktiviert A/B Testing
   * @default false
   */
  enableABTesting?: boolean

  /**
   * Webhook-URL für Lead-Benachrichtigungen
   */
  webhookUrl?: string

  /**
   * DSGVO-Modus aktivieren
   * @default true
   */
  gdprMode?: boolean
}

/**
 * Popup Trigger Types
 */
export type PopupTrigger = 'immediate' | 'delay' | 'scroll' | 'exit-intent' | 'idle'

/**
 * Popup Position
 */
export type PopupPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/**
 * CTA Widget Types
 */
export type CTAWidgetType = 'floating-button' | 'sticky-bar' | 'slide-in' | 'corner-box'

/**
 * Tracking Event Types
 */
export type EventType =
  | 'popup_shown'
  | 'popup_closed'
  | 'popup_converted'
  | 'cta_clicked'
  | 'form_submitted'
  | 'page_viewed'
  | 'link_clicked'

/**
 * UTM Parameters
 */
export interface UTMParams {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
}

/**
 * Analytics Data
 */
export interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  conversions: number
  conversionRate: number
  avgTimeOnPage: number
  bounceRate: number
  topPages: Array<{
    url: string
    views: number
  }>
  topSources: Array<{
    source: string
    visitors: number
  }>
}

