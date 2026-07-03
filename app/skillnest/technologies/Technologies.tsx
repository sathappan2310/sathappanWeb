'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SectionHeader from '@/components/skillnest/ui/SectionHeader'
import SearchBar from '@/components/skillnest/SearchBar'
import TechnologyCard from '@/components/skillnest/TechnologyCard'
import { getCategories, getTechnologies } from '@/data'
import Breadcrumb from '@/components/skillnest/ui/Breadcrumb'
import EmptyState from '@/components/skillnest/ui/EmptyState'
import { cn } from '@/utils/cn'

export default function Technologies() {
  const techs = getTechnologies()
  const cats = getCategories()
  const params = useSearchParams()
  const router = useRouter()
  const activeCat = params.get('cat') ?? 'All'
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    return techs.filter((t) => {
      const catOk = activeCat === 'All' || t.category === activeCat
      const qOk =
        !q || (t.name + ' ' + t.description + ' ' + t.tags.join(' ')).toLowerCase().includes(q.toLowerCase())
      return catOk && qOk
    })
  }, [techs, activeCat, q])

  const setCat = (c: string) => {
    const next = new URLSearchParams(params.toString())
    if (c === 'All') next.delete('cat')
    else next.set('cat', c)
    const qs = next.toString()
    router.replace(qs ? `/skillnest/technologies?${qs}` : '/skillnest/technologies')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sn-section py-10"
    >
      <Breadcrumb items={[{ label: 'Technologies' }]} />
      <div className="mt-6">
        <SectionHeader
          align="left"
          eyebrow="Explore"
          title="All technologies"
          description="Pick a category, search, and dive into curated interview questions."
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ('')}
          placeholder="Search technologies…"
          wrapperClassName="w-full lg:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          {['All', ...cats].map((c) => {
            const active = activeCat === c
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                  active
                    ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400'
                    : 'border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-600 dark:border-slate-800 dark:text-slate-300',
                )}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="No technologies match" description="Try a different search term or category." />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t, i) => (
            <TechnologyCard key={t.id} tech={t} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
