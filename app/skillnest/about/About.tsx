'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Breadcrumb from '@/components/skillnest/ui/Breadcrumb'
import SectionHeader from '@/components/skillnest/ui/SectionHeader'
import Button from '@/components/skillnest/ui/Button'
import { getTechnologies } from '@/data'
import {
  Sparkles,
  Rocket,
  ShieldCheck,
  BookOpen,
  Compass,
  Zap,
  Layers,
  ArrowRight,
  Github,
} from 'lucide-react'

export default function About() {
  const techs = getTechnologies()

  const features = [
    { icon: BookOpen, title: 'Curated question banks', desc: 'Hand-picked interview questions with detailed answers.' },
    { icon: Zap, title: 'Real code examples', desc: 'Syntax-highlighted, copy-paste ready snippets.' },
    { icon: Compass, title: 'Learning roadmaps', desc: 'Beautiful step-by-step timelines for major stacks.' },
    { icon: ShieldCheck, title: 'Zero backend, zero tracking', desc: 'Works offline. Nothing leaves your browser.' },
    { icon: Layers, title: '25+ technologies', desc: 'Languages, frontend, backend, databases, cloud, tools.' },
    { icon: Rocket, title: 'Blazing fast', desc: 'Next.js App Router, code splitting, and lazy loading throughout.' },
  ]

  const future = [
    'Adding 100+ more curated questions per technology.',
    'Personal bookmarks & progress (local-storage only).',
    'Downloadable PDF cheat sheets.',
    'Community-contributed roadmaps via GitHub.',
    'Interactive quizzes and practice mode.',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sn-section py-10"
    >
      <Breadcrumb items={[{ label: 'About' }]} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <SectionHeader
            align="left"
            eyebrow="About"
            title="SkillNest — built for developers preparing for real interviews."
            description="A modern, static, frontend-only interview prep platform inspired by the developer tools we all love: Linear, Vercel, Notion, GitHub, and Microsoft Learn."
          />
          <p className="mt-6 max-w-2xl text-slate-600 dark:text-slate-400">
            The web is full of interview prep sites, but most feel dated, ad-heavy, or hide content behind logins.
            SkillNest is different: it&apos;s a fast, beautiful, privacy-first playground you can install once and take offline.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-500/5 to-accent-cyan/5 p-6 dark:border-slate-800">
          <Sparkles className="h-6 w-6 text-brand-500" />
          <h3 className="mt-3 text-lg font-semibold">Our mission</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Help every developer walk into their next interview with confidence, calm, and clarity.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mt-14">
        <SectionHeader align="left" eyebrow="Features" title="What's inside" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const I = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
              >
                <I className="h-6 w-6 text-brand-500" />
                <h4 className="mt-4 font-semibold">{f.title}</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Technologies covered */}
      <div className="mt-14">
        <SectionHeader
          align="left"
          eyebrow="Coverage"
          title="Technologies covered"
          description={`${techs.length} technologies and growing.`}
        />
        <div className="mt-8 flex flex-wrap gap-2">
          {techs.map((t) => (
            <Link
              key={t.id}
              href={`/skillnest/technologies/${t.id}`}
              className="chip hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Future */}
      <div className="mt-14">
        <SectionHeader align="left" eyebrow="Roadmap" title="Future improvements" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {future.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-soft dark:border-slate-800 dark:bg-slate-900"
            >
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {f}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h3 className="text-xl font-bold">Contribute a question, fix a typo, or suggest a topic.</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Everything lives in JSON — edit and open a PR.
          </p>
        </div>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          <Button leftIcon={<Github className="h-4 w-4" />}>Contribute on GitHub</Button>
        </a>
      </div>
    </motion.div>
  )
}
