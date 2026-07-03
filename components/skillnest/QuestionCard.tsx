'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import type { Question } from '@/types'
import { cn, difficultyColor, estimateReadingTime } from '@/utils/cn'
import Badge from './ui/Badge'

interface Props {
  techId: string
  question: Question
  index?: number
  highlight?: string
}

function highlight(text: string, query?: string): { __html: string } {
  if (!query) return { __html: escape(text) }
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(${escaped})`, 'ig')
  return {
    __html: escape(text).replace(
      re,
      '<mark class="bg-brand-200/60 dark:bg-brand-500/30 text-inherit rounded px-0.5">$1</mark>',
    ),
  }
}
function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

export default function QuestionCard({ techId, question, index = 0, highlight: q }: Props) {
  const time = estimateReadingTime(question.answer + question.explanation)

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: (index % 10) * 0.03 }}
    >
      <Link
        href={`/skillnest/technologies/${techId}/${question.id}`}
        className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500/10 to-accent-cyan/10 text-brand-600 dark:text-brand-400">
          <span className="text-sm font-bold">{String(question.id).padStart(2, '0')}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                difficultyColor(question.difficulty),
              )}
            >
              {question.difficulty}
            </span>
            <Badge variant="primary">{question.category}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="h-3 w-3" /> {time} min read
            </span>
          </div>

          <h3
            className="mt-2 text-base font-semibold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400"
            dangerouslySetInnerHTML={highlight(question.title, q)}
          />
          <p
            className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400"
            dangerouslySetInnerHTML={highlight(question.question, q)}
          />

          {question.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {question.tags.slice(0, 4).map((t) => (
                <span key={t} className="chip">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
      </Link>
    </motion.li>
  )
}
