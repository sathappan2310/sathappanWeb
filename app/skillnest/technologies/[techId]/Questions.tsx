'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import * as Icons from 'lucide-react'
import Breadcrumb from '@/components/skillnest/ui/Breadcrumb'
import SearchBar from '@/components/skillnest/SearchBar'
import QuestionCard from '@/components/skillnest/QuestionCard'
import EmptyState from '@/components/skillnest/ui/EmptyState'
import { getQuestions, getTechnology } from '@/data'
import { cn } from '@/utils/cn'

export default function Questions({ techId }: { techId: string }) {
  const tech = getTechnology(techId)!
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string>('All')
  const [diff, setDiff] = useState<string>('All')

  const questions = getQuestions(techId)
  const categories = ['All', ...Array.from(new Set(questions.map((x) => x.category)))]
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[tech.icon] ?? Icons.Code2

  const filtered = useMemo(() => {
    return questions.filter((x) => {
      const qOk =
        !q ||
        (x.title + ' ' + x.question + ' ' + x.tags.join(' '))
          .toLowerCase()
          .includes(q.toLowerCase())
      const cOk = cat === 'All' || x.category === cat
      const dOk = diff === 'All' || x.difficulty === diff
      return qOk && cOk && dOk
    })
  }, [questions, q, cat, diff])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sn-section py-10"
    >
      <Breadcrumb items={[{ label: 'Technologies', to: '/skillnest/technologies' }, { label: tech.name }]} />

      {/* Header */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className={cn('absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br opacity-20 blur-3xl', tech.color)} />
          <div className="flex items-center gap-4">
            <div className={cn('grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md', tech.color)}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {tech.category}
              </div>
              <h1 className="text-2xl font-bold sm:text-3xl">{tech.name}</h1>
              <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-400">{tech.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map((d) => (
              <div
                key={d}
                className="min-w-[80px] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="text-lg font-bold">{questions.filter((x) => x.difficulty === d).length}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <SearchBar
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ('')}
          placeholder={`Search ${tech.name} questions…`}
        />
        <div className="flex flex-wrap gap-3">
          <FilterGroup label="Difficulty" options={difficulties} value={diff} onChange={setDiff} />
          <FilterGroup label="Category" options={categories} value={cat} onChange={setCat} />
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No questions match your filters" description="Try clearing the search or filters." />
        </div>
      ) : (
        <ul className="mt-8 grid gap-4">
          {filtered.map((question, i) => (
            <QuestionCard key={question.id} techId={techId} question={question} index={i} highlight={q} />
          ))}
        </ul>
      )}
    </motion.div>
  )
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o === value
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={cn(
                'rounded-full border px-2.5 py-1 text-xs font-semibold transition-all',
                active
                  ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400'
                  : 'border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-600 dark:border-slate-800 dark:text-slate-300',
              )}
            >
              {o}
            </button>
          )
        })}
      </div>
    </div>
  )
}
