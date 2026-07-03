'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Breadcrumb from '@/components/skillnest/ui/Breadcrumb'
import SearchBar from '@/components/skillnest/SearchBar'
import QuestionCard from '@/components/skillnest/QuestionCard'
import EmptyState from '@/components/skillnest/ui/EmptyState'
import { getAllQuestions, getTechnologies } from '@/data'
import { useDebounced } from '@/hooks/useDebounced'
import { cn } from '@/utils/cn'

export default function Search() {
  const params = useSearchParams()
  const router = useRouter()
  const [q, setQ] = useState(params.get('q') ?? '')
  const debounced = useDebounced(q, 150)
  const [diff, setDiff] = useState('All')
  const [techId, setTechId] = useState('All')
  const techs = getTechnologies()

  useEffect(() => {
    const next = new URLSearchParams(params.toString())
    if (debounced) next.set('q', debounced)
    else next.delete('q')
    const qs = next.toString()
    router.replace(qs ? `/skillnest/search?${qs}` : '/skillnest/search')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const results = useMemo(() => {
    const all = getAllQuestions()
    const query = debounced.trim().toLowerCase()
    return all.filter(({ tech, question }) => {
      const tOk = techId === 'All' || tech.id === techId
      const dOk = diff === 'All' || question.difficulty === diff
      if (!query) return tOk && dOk
      const hay =
        `${question.title} ${question.question} ${question.tags.join(' ')} ${question.category} ${tech.name}`.toLowerCase()
      return tOk && dOk && hay.includes(query)
    })
  }, [debounced, diff, techId])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sn-section py-10"
    >
      <Breadcrumb items={[{ label: 'Search' }]} />

      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Instant Search</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Search across every technology, question, tag, and category.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <SearchBar
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ('')}
          placeholder="Try 'react hooks', 'sql joins', 'docker volumes'…"
          autoFocus
        />

        <div className="flex flex-wrap gap-3">
          <Filter label="Difficulty" value={diff} onChange={setDiff} options={['All', 'Beginner', 'Intermediate', 'Advanced']} />
          <Filter
            label="Technology"
            value={techId}
            onChange={setTechId}
            options={['All', ...techs.map((t) => t.id)]}
            renderLabel={(v) => (v === 'All' ? 'All' : techs.find((t) => t.id === v)?.name ?? v)}
          />
        </div>
      </div>

      <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        {results.length} result{results.length === 1 ? '' : 's'}
      </div>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No matches found" description="Try a different keyword or clear the filters." />
        </div>
      ) : (
        <ul className="mt-4 grid gap-4">
          {results.slice(0, 100).map(({ tech, question }, i) => (
            <QuestionCard
              key={`${tech.id}-${question.id}`}
              techId={tech.id}
              question={question}
              index={i}
              highlight={debounced}
            />
          ))}
        </ul>
      )}
    </motion.div>
  )
}

function Filter({
  label,
  value,
  onChange,
  options,
  renderLabel,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  renderLabel?: (v: string) => string
}) {
  return (
    <div>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="flex max-w-full flex-wrap gap-1.5">
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
              {renderLabel ? renderLabel(o) : o}
            </button>
          )
        })}
      </div>
    </div>
  )
}
