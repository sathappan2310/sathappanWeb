import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function highlightMatch(text: string, query: string): string {
  if (!query) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(${escaped})`, 'ig')
  return text.replace(re, '<mark class="bg-brand-200/60 dark:bg-brand-500/30 text-inherit rounded px-0.5">$1</mark>')
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function difficultyColor(d: string) {
  switch (d) {
    case 'Beginner':
      return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20'
    case 'Intermediate':
      return 'text-amber-600 bg-amber-500/10 border-amber-500/20'
    case 'Advanced':
      return 'text-rose-600 bg-rose-500/10 border-rose-500/20'
    default:
      return 'text-slate-600 bg-slate-500/10 border-slate-500/20'
  }
}
