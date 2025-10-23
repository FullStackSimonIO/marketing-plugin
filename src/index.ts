import type { Config } from 'payload'
import type { MarketingPluginConfig } from './types'
import { Popups } from './collections/Popups'
import { CTAs } from './collections/CTAs'
import { Leads } from './collections/Leads'
import { MarketingEvents } from './collections/MarketingEvents'
import { MarketingSettings } from './globals/MarketingSettings'

export const payloadMarketingPlugin =
  (pluginConfig?: MarketingPluginConfig) =>
  (incomingConfig: Config): Config => {
    if (pluginConfig?.enabled === false) {
      return incomingConfig
    }

    const config = { ...incomingConfig }

    // Add collections
    config.collections = [
      ...(config.collections || []),
      Popups(pluginConfig),
      CTAs(pluginConfig),
      Leads(pluginConfig),
      MarketingEvents(pluginConfig),
    ]

    // Add globals
    config.globals = [...(config.globals || []), MarketingSettings]

    return config
  }

// Export types
export type { MarketingPluginConfig, PopupTrigger, CTAWidgetType, EventType, UTMParams, AnalyticsData } from './types'

// Export collections for customization
export { Popups, CTAs, Leads, MarketingEvents }

// Export globals
export { MarketingSettings }

