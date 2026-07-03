'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/skillnest/ui/Breadcrumb'
import SectionHeader from '@/components/skillnest/ui/SectionHeader'
import { getRoadmaps } from '@/data'
import { cn } from '@/utils/cn'

export default function Roadmaps() {
  const roadmaps = getRoadmaps()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sn-section py-10"
    >
      <Breadcrumb items={[{ label: 'Roadmaps' }]} />
      <div className="mt-6">
        <SectionHeader
          align="left"
          eyebrow="Guided paths"
          title="Learning roadmaps"
          description="Follow structured, opinionated paths from beginner to advanced across the technologies you care about."
        />
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {roadmaps.map((r, i) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[r.icon] ?? Icons.Rocket
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/skillnest/roadmaps/${r.id}`}
                className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900"
              >
                <div className={cn('absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl', r.color)} />
                <div className={cn('grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md', r.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{r.tagline}</p>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{r.steps.length} steps</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-600 transition-transform group-hover:translate-x-1 dark:text-brand-400">
                    View <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
