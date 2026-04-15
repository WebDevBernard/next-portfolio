'use client'

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

export type TurnstileHandle = {
  reset: () => void
}

type TurnstileProps = {
  siteKey: string
  onSuccess?: (token: string) => void
  onError?: () => void
  onExpire?: () => void
  options?: {
    theme?: 'light' | 'dark' | 'auto'
    size?: 'normal' | 'flexible' | 'compact'
    retry?: 'auto' | 'never'
    retryInterval?: number
  }
}

const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile(
  { siteKey, onSuccess, onError, onExpire, options },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    },
  }))

  useEffect(() => {
    let cancelled = false
    let pollId: ReturnType<typeof setInterval> | null = null

    function renderWidget() {
      if (cancelled || !containerRef.current || !window.turnstile) return
      if (widgetIdRef.current != null) return

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: options?.theme ?? 'light',
        size: options?.size ?? 'flexible',
        retry: options?.retry ?? 'auto',
        'retry-interval': options?.retryInterval ?? 3000,
        callback: onSuccess,
        'error-callback': onError,
        'expired-callback': onExpire,
      })
    }

    function startPolling() {
      let elapsed = 0
      pollId = setInterval(() => {
        elapsed += 50
        if (cancelled || elapsed > 10_000) {
          clearInterval(pollId!)
          return
        }
        if (window.turnstile) {
          clearInterval(pollId!)
          renderWidget()
        }
      }, 50)
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      const existing = document.getElementById(SCRIPT_ID)
      if (!existing) {
        const script = document.createElement('script')
        script.id = SCRIPT_ID
        script.src = SCRIPT_SRC
        script.async = true
        script.defer = true
        script.onload = () => { if (!cancelled) renderWidget() }
        document.head.appendChild(script)
      }
      startPolling()
    }

    return () => {
      cancelled = true
      if (pollId != null) clearInterval(pollId)
      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  return <div ref={containerRef} />
})

export default Turnstile
