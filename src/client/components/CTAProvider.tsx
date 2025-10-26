'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { CTAWidget } from './CTAWidget'

interface CTAData {
  id: number
  name: string
  active: boolean
  type: 'floating-button' | 'sticky-bar' | 'slide-in' | 'corner-box'
  text: string
  link: string
  icon?: string
  position?: string
  barPosition?: string
  color: string
  showDelay: number
  closeable: boolean
  showOnPages: 'all' | 'homepage' | 'specific'
  specificUrls?: { url: string }[]
}

export function CTAProvider() {
  const [ctas, setCtas] = useState<CTAData[]>([])
  const [visibleCtas, setVisibleCtas] = useState<CTAData[]>([])
  const [closedCtas, setClosedCtas] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCTAs()
  }, [])

  const fetchCTAs = async () => {
    try {
      const res = await fetch('/api/mk-ctas?where[active][equals]=true&limit=100')
      if (res.ok) {
        const data = await res.json()
        setCtas(data.docs || [])
      }
    } catch (error) {
      console.error('Fehler beim Laden der CTAs:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackEvent = useCallback(async (eventType: string, elementId: number) => {
    try {
      await fetch('/api/mk-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          elementId: String(elementId),
          page: window.location.href,
          sessionId: getSessionId(),
        }),
      })
    } catch (error) {
      console.error('Tracking error:', error)
    }
  }, [])

  useEffect(() => {
    if (loading || ctas.length === 0) return

    const currentPath = window.location.pathname
    const isHomepage = currentPath === '/'

    const validCtas = ctas.filter((cta) => {
      if (closedCtas.has(cta.id)) return false
      if (cta.showOnPages === 'all') return true
      if (cta.showOnPages === 'homepage' && isHomepage) return true
      if (cta.showOnPages === 'specific' && cta.specificUrls) {
        return cta.specificUrls.some((u) => currentPath.includes(u.url))
      }
      return false
    })

    validCtas.forEach((cta) => {
      if (cta.showDelay > 0) {
        setTimeout(() => {
          setVisibleCtas((prev) => {
            if (!prev.find((c) => c.id === cta.id)) {
              trackEvent('cta_shown', cta.id)
              return [...prev, cta]
            }
            return prev
          })
        }, cta.showDelay * 1000)
      } else {
        setVisibleCtas((prev) => {
          if (!prev.find((c) => c.id === cta.id)) {
            trackEvent('cta_shown', cta.id)
            return [...prev, cta]
          }
          return prev
        })
      }
    })
  }, [loading, ctas, closedCtas, trackEvent])

  const handleClose = (ctaId: number) => {
    setClosedCtas((prev) => new Set(prev).add(ctaId))
    setVisibleCtas((prev) => prev.filter((cta) => cta.id !== ctaId))
  }

  const handleClick = (cta: CTAData) => {
    trackEvent('cta_clicked', cta.id)
  }

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('marketing-session-id')
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('marketing-session-id', sessionId)
    }
    return sessionId
  }

  if (visibleCtas.length === 0) return null

  return (
    <>
      {visibleCtas.map((cta) => (
        <CTAWidget
          key={cta.id}
          cta={cta}
          onClose={() => handleClose(cta.id)}
          onClick={() => handleClick(cta)}
        />
      ))}
    </>
  )
}
