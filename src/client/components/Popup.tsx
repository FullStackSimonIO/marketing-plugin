'use client'

import React from 'react'

interface PopupProps {
  popup: {
    id: number
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
    position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    theme: 'default' | 'minimal' | 'modern' | 'bold'
    size: 'small' | 'medium' | 'large'
    overlay: boolean
    closeButton: boolean
  }
  onClose: () => void
  onConversion: () => void
}

export function Popup({ popup, onClose, onConversion }: PopupProps) {
  const positionClasses = {
    center: 'items-center justify-center',
    'top-left': 'items-start justify-start',
    'top-right': 'items-start justify-end',
    'bottom-left': 'items-end justify-start',
    'bottom-right': 'items-end justify-end',
  }

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
  }

  const themeClasses = {
    default: 'bg-white border border-gray-200',
    minimal: 'bg-white',
    modern: 'bg-gradient-to-br from-purple-50 to-blue-50',
    bold: 'bg-gray-900 text-white',
  }

  const buttonVariants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  }

  const handleCtaClick = () => {
    onConversion()
    if (popup.ctaButton.link) {
      window.location.href = popup.ctaButton.link
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex ${positionClasses[popup.position]} p-4`}
      role="dialog"
      aria-modal="true"
    >
      {popup.overlay && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={`relative ${sizeClasses[popup.size]} ${themeClasses[popup.theme]} rounded-lg shadow-2xl p-6 w-full`}
      >
        {popup.closeButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Schließen"
          >
            ×
          </button>
        )}

        {popup.image && (
          <div className="mb-4">
            <img
              src={popup.image.url}
              alt={popup.image.alt || popup.title}
              className="rounded-lg w-full object-cover max-h-64"
            />
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">{popup.title}</h2>

        {popup.description && (
          <div className="mb-6 prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: renderDescription(popup.description) }} />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleCtaClick}
            className={`${buttonVariants[popup.ctaButton.variant || 'primary']} px-6 py-3 rounded-lg font-semibold transition-colors flex-1`}
          >
            {popup.ctaButton.text}
          </button>

          {popup.secondaryButton?.enabled && popup.secondaryButton.text && (
            <button
              onClick={() => {
                onClose()
                if (popup.secondaryButton?.link) {
                  window.location.href = popup.secondaryButton.link
                }
              }}
              className="border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              {popup.secondaryButton.text}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function renderDescription(description: unknown): string {
  if (typeof description === 'string') {
    return `<p>${description}</p>`
  }
  return ''
}
