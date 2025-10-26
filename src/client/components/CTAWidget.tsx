'use client'

import React from 'react'

interface CTAWidgetProps {
  cta: {
    id: number
    type: 'floating-button' | 'sticky-bar' | 'slide-in' | 'corner-box'
    text: string
    link: string
    icon?: string
    position?: string
    barPosition?: string
    color: string
    closeable: boolean
  }
  onClose: () => void
  onClick: () => void
}

const colorClasses = {
  blue: 'bg-blue-600 hover:bg-blue-700',
  green: 'bg-green-600 hover:bg-green-700',
  red: 'bg-red-600 hover:bg-red-700',
  orange: 'bg-orange-600 hover:bg-orange-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
  dark: 'bg-gray-900 hover:bg-gray-800',
}

export function CTAWidget({ cta, onClose, onClick }: CTAWidgetProps) {
  if (cta.type === 'floating-button') {
    const positionClasses = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'top-fixed': 'top-6 right-6',
      'bottom-fixed': 'bottom-6 right-6',
      'right-center': 'right-6 top-1/2 -translate-y-1/2',
    }

    return (
      <a
        href={cta.link}
        onClick={onClick}
        className={`fixed ${positionClasses[cta.position as keyof typeof positionClasses] || positionClasses['bottom-right']} ${colorClasses[cta.color as keyof typeof colorClasses]} text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center group`}
      >
        <span className="text-sm font-bold">{cta.text}</span>
        {cta.closeable && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            className="absolute -top-2 -right-2 bg-white text-gray-700 rounded-full p-1 shadow-lg hover:bg-gray-100"
          >
            ×
          </button>
        )}
      </a>
    )
  }

  if (cta.type === 'sticky-bar') {
    const barPositionClasses = {
      top: 'top-0',
      bottom: 'bottom-0',
    }

    return (
      <div
        className={`fixed ${barPositionClasses[cta.barPosition as keyof typeof barPositionClasses] || barPositionClasses.top} left-0 right-0 ${colorClasses[cta.color as keyof typeof colorClasses]} text-white py-3 px-6 shadow-lg z-40`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <span className="font-semibold">{cta.text}</span>
          <div className="flex items-center gap-3">
            <a
              href={cta.link}
              onClick={onClick}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Mehr erfahren
            </a>
            {cta.closeable && (
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (cta.type === 'slide-in') {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <div className={`${colorClasses[cta.color as keyof typeof colorClasses]} text-white rounded-lg shadow-2xl p-6 max-w-sm relative`}>
          {cta.closeable && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          )}
          <div>
            <p className="font-semibold mb-3">{cta.text}</p>
            <a
              href={cta.link}
              onClick={onClick}
              className="inline-block bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Mehr erfahren
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (cta.type === 'corner-box') {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <div className={`${colorClasses[cta.color as keyof typeof colorClasses]} text-white rounded-lg shadow-xl p-4 max-w-xs relative`}>
          {cta.closeable && (
            <button
              onClick={onClose}
              className="absolute top-1 right-1 text-white hover:text-gray-200"
            >
              ×
            </button>
          )}
          <a href={cta.link} onClick={onClick} className="hover:underline font-medium text-sm">
            {cta.text}
          </a>
        </div>
      </div>
    )
  }

  return null
}
