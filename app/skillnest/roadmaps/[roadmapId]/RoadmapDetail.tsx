'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'
import Breadcrumb from '@/components/skillnest/ui/Breadcrumb'
import { getRoadmap } from '@/data'
import { cn, difficultyColor } from '@/utils/cn'

export default function RoadmapDetail({ roadmapId }: { roadmapId: string }) {
  const r = getRoadmap(roadmapId)!
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[r.icon] ?? Icons.Rocket

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sn-section py-10"
    >
      <Breadcrumb items={[{ label: 'Roadmaps', to: '/skillnest/roadmaps' }, { label: r.title }]} />

      {/* Header */}
      <div className="relative mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className={cn('absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br opacity-20 blur-3xl', r.color)} />
        <div className="flex items-center gap-4">
          <div className={cn('grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md', r.color)}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{r.title}</h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">{r.tagline}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mt-10">
        <div className="absolute left-6 top-2 hidden h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-brand-500/80 via-brand-500/40 to-transparent sm:block" />

        <ol className="space-y-6">
          {r.steps.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-0 sm:pl-16"
            >
              <div className="absolute left-0 top-3 hidden h-12 w-12 place-items-center sm:grid">
                <div className={cn('grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br text-white shadow-glow ring-4 ring-white dark:ring-slate-950', r.color)}>
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:border-brand-500/40 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                      difficultyColor(s.level),
                    )}
                  >
                    {s.level}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Step {i + 1} of {r.steps.length}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.description}</p>

                {s.topics.length > 0 && (
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {s.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  )
}
