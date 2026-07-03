'use client'

import type { ReactNode } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

/**
 * SkillNest shares the portfolio's next-themes provider, so this ThemeProvider
 * is a passthrough kept only for API compatibility with the original code.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/**
 * Thin adapter over next-themes so SkillNest components read/write the exact
 * same light/dark state as the rest of the site.
 */
export function useTheme() {
  const { theme, resolvedTheme, setTheme } = useNextTheme()
  const current = (resolvedTheme ?? theme) === 'dark' ? 'dark' : 'light'
  return {
    theme: current as 'light' | 'dark',
    setTheme: (t: 'light' | 'dark') => setTheme(t),
    toggle: () => setTheme(current === 'dark' ? 'light' : 'dark'),
  }
}
