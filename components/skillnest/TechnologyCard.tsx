'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import type { Technology } from '@/types'
import { getQuestions } from '@/data'
import { cn } from '@/utils/cn'
import Badge from './ui/Badge'

interface Props {
  tech: Technology
  index?: number
}

export default function TechnologyCard({ tech, index = 0 }: Props) {
  const questions = getQuestions(tech.id)
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[tech.icon] ?? Icons.Code2

  const levels = {
    Beginner: questions.filter((q) => q.difficulty === 'Beginner').length,
    Intermediate: questions.filter((q) => q.difficulty === 'Intermediate').length,
    Advanced: questions.filter((q) => q.difficulty === 'Advanced').length,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
    >
      <Link
        href={`/skillnest/technologies/${tech.id}`}
        className="group relative block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow hover:border-brand-500/40 dark:border-slate-800 dark:bg-slate-900"
      >
        <div
          className={cn(
            'absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity group-hover:opacity-40',
            tech.color,
          )}
        />

        <div className="relative flex items-start justify-between">
          <div className={cn('grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md', tech.color)}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="chip">{questions.length} Qs</span>
        </div>

        <h3 className="relative mt-4 text-lg font-semibold">{tech.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{tech.description}</p>

        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {levels.Beginner > 0 && <Badge variant="success">Beginner · {levels.Beginner}</Badge>}
          {levels.Intermediate > 0 && <Badge variant="warning">Intermediate · {levels.Intermediate}</Badge>}
          {levels.Advanced > 0 && <Badge variant="danger">Advanced · {levels.Advanced}</Badge>}
        </div>

        <div className="relative mt-5 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{tech.category}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-transform group-hover:translate-x-1 dark:text-brand-400">
            Start Learning
            <Icons.ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
