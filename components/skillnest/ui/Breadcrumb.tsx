import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import type { ReactNode } from 'react'

interface Crumb {
  label: ReactNode
  to?: string
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
      <Link href="/skillnest" className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400">
        <Home className="h-3.5 w-3.5" /> Home
      </Link>
      {items.map((c, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5" />
          {c.to ? (
            <Link href={c.to} className="hover:text-brand-600 dark:hover:text-brand-400">
              {c.label}
            </Link>
          ) : (
            <span className="text-slate-700 dark:text-slate-200">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
