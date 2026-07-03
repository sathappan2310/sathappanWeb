import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface Props {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

const map: Record<string, string> = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  primary: 'bg-brand-500/10 text-brand-600 border-brand-500/20 dark:text-brand-400',
  success: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
  danger: 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400',
  info: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400',
}

export default function Badge({ children, variant = 'default', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium',
        map[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
