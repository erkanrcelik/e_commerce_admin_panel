'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { useEffect } from 'react'

/**
 * NProgress Provider
 * 
 * Sayfa geçişlerinde header'ın üstünde progress bar gösterir
 */
export function NProgressProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,
      minimum: 0.1,
      easing: 'ease',
      speed: 500,
      trickleSpeed: 200
    })
  }, [])

  useEffect(() => {
    NProgress.start()
    
    // Kısa bir gecikme ile progress'i tamamla
    const timer = setTimeout(() => {
      NProgress.done()
    }, 100)

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [pathname, searchParams])

  return <>{children}</>
} 