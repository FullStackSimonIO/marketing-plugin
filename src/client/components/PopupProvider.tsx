'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Popup } from './Popup'

interface PopupData {
  id: number
  name: string
  active: boolean
  title: string
  description: unknown
  image?: { url: string; alt?: string }
  ctaButton: {
    text: string
    link: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  secondaryButton?: {
    enabled: boolean
    text?: string
    link?: string
  }
  trigger: 'immediate' | 'delay' | 'scroll' | 'exit-intent' | 'idle'
  delaySeconds?: number
  scrollPercent?: number
  idleSeconds?: number
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  showOnPages: 'all' | 'homepage' | 'landing' | 'specific'
  specificUrls?: { url: string }[]
  showOnce: boolean
  cookieDays: number
  showMax: number
  theme: 'default' | 'minimal' | 'modern' | 'bold'
  size: 'small' | 'medium' | 'large'
  overlay: boolean
  closeButton: boolean
}

export function PopupProvider() {
  const [popups, setPopups] = useState<PopupData[]>([])
  const [activePopup, setActivePopup] = useState<PopupData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPopups()
  }, [])

  const fetchPopups = async () => {
    try {
      const res = await fetch('/api/mk-popups?where[active][equals]=true&limit=100')
      if (res.ok) {
        const data = await res.json()
        setPopups(data.docs || [])
      }
    } catch (error) {
      console.error('Fehler beim Laden der Popups:', error)
    } finally {
      setLoading(false)
    }
  }

  const triggerPopup = useCallback((popup: PopupData) => {
    const trigger = popup.trigger
    let triggered = false

    const showPopup = () => {
      if (triggered) return
      triggered = true
      setActivePopup(popup)
      trackEvent('popup_shown', popup.id)
      incrementSessionCount(popup.id)
    }

    if (trigger === 'immediate') {
      showPopup()
    } else if (trigger === 'delay') {
      setTimeout(showPopup, (popup.delaySeconds || 5) * 1000)
    } else if (trigger === 'scroll') {
      const handleScroll = () => {
        const scrollPercent =
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        if (scrollPercent >= (popup.scrollPercent || 50)) {
          showPopup()
          window.removeEventListener('scroll', handleScroll)
        }
      }
      window.addEventListener('scroll', handleScroll)
    } else if (trigger === 'exit-intent') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          showPopup()
          document.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
      document.addEventListener('mouseleave', handleMouseLeave)
    } else if (trigger === 'idle') {
      let timeout: NodeJS.Timeout
      const resetTimer = () => {
        clearTimeout(timeout)
        timeout = setTimeout(showPopup, (popup.idleSeconds || 30) * 1000)
      }
      document.addEventListener('mousemove', resetTimer)
      document.addEventListener('keypress', resetTimer)
      resetTimer()
    }
  }, [])

  useEffect(() => {
    if (loading || popups.length === 0) return

    const currentPath = window.location.pathname
    const isHomepage = currentPath === '/'

    const validPopups = popups.filter((popup) => {
      if (popup.showOnPages === 'all') return true
      if (popup.showOnPages === 'homepage' && isHomepage) return true
      if (popup.showOnPages === 'specific' && popup.specificUrls) {
        return popup.specificUrls.some((u) => currentPath.includes(u.url))
      }
      return false
    })

    if (validPopups.length === 0) return

    const eligiblePopups = validPopups.filter((popup) => {
      const cookieName = `popup-${popup.id}-shown`
      const sessionKey = `popup-${popup.id}-session-count`

      if (popup.showOnce) {
        const cookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith(cookieName))
        if (cookie) return false
      }

      const sessionCount = parseInt(sessionStorage.getItem(sessionKey) || '0', 10)
      if (sessionCount >= popup.showMax) return false

      return true
    })

    if (eligiblePopups.length === 0) return

    const popup = eligiblePopups[0]
    if (popup) {
      triggerPopup(popup)
    }
  }, [loading, popups, triggerPopup])

  const incrementSessionCount = (popupId: number) => {
    const sessionKey = `popup-${popupId}-session-count`
    const currentCount = parseInt(sessionStorage.getItem(sessionKey) || '0', 10)
    sessionStorage.setItem(sessionKey, String(currentCount + 1))
  }

  const setCookie = (popupId: number, days: number) => {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `popup-${popupId}-shown=true; expires=${date.toUTCString()}; path=/`
  }

  const handleClose = () => {
    if (activePopup) {
      trackEvent('popup_closed', activePopup.id)
      if (activePopup.showOnce) {
        setCookie(activePopup.id, activePopup.cookieDays)
      }
    }
    setActivePopup(null)
  }

  const handleConversion = () => {
    if (activePopup) {
      trackEvent('popup_converted', activePopup.id)
      if (activePopup.showOnce) {
        setCookie(activePopup.id, activePopup.cookieDays)
      }
    }
    setActivePopup(null)
  }

  const trackEvent = async (eventType: string, elementId: number) => {
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
  }

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('marketing-session-id')
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('marketing-session-id', sessionId)
    }
    return sessionId
  }

  if (!activePopup) return null

  return (
    <Popup
      popup={activePopup}
      onClose={handleClose}
      onConversion={handleConversion}
    />
  )
}
