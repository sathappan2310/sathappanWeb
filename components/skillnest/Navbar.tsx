'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search as SearchIcon, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/skillnest', label: 'Home' },
  { href: '/skillnest/technologies', label: 'Technologies' },
  { href: '/skillnest/roadmaps', label: 'Roadmaps' },
  { href: '/skillnest/interview-helper', label: 'Interview Helper' },
  { href: '/skillnest/search', label: 'Search' },
  { href: '/skillnest/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        router.push('/skillnest/search')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

  const isActive = (href: string) =>
    href === '/skillnest' ? pathname === '/skillnest' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'no-print sticky top-0 z-50 transition-all',
        scrolled
          ? 'glass border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="sn-section flex h-16 items-center justify-between">
        <Link href="/skillnest" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-cyan shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Skill<span className="gradient-text">Nest</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = isActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                )}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded bg-gradient-to-r from-brand-600 to-accent-cyan"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 sm:inline-flex"
          >
            ← Portfolio
          </Link>
          <button
            onClick={() => router.push('/skillnest/search')}
            className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-3 py-1.5 text-xs text-slate-500 shadow-sm hover:border-brand-400 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-white sm:flex"
            aria-label="Search"
          >
            <SearchIcon className="h-3.5 w-3.5" />
            <span>Search…</span>
            <span className="kbd">⌘K</span>
          </button>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="btn-ghost p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <nav className="sn-section flex flex-col gap-1 pb-4">
              {links.map((l) => {
                const active = isActive(l.href)
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60',
                    )}
                  >
                    {l.label}
                  </Link>
                )
              })}
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60"
              >
                ← Back to Portfolio
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
