'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Icons from 'lucide-react'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Compass,
  Layers,
  Search as SearchIcon,
  Sparkles,
  Zap,
  Rocket,
  ShieldCheck,
  Target,
} from 'lucide-react'
import SectionHeader from '@/components/skillnest/ui/SectionHeader'
import TechnologyCard from '@/components/skillnest/TechnologyCard'
import QuestionCard from '@/components/skillnest/QuestionCard'
import Accordion from '@/components/skillnest/ui/Accordion'
import Button from '@/components/skillnest/ui/Button'
import { getAllQuestions, getRoadmaps, getTechnologies } from '@/data'
import { cn } from '@/utils/cn'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

export default function Home() {
  const techs = getTechnologies()
  const featured = getAllQuestions().slice(0, 6)
  const roadmaps = getRoadmaps().slice(0, 4)
  const router = useRouter()
  const [q, setQ] = useState('')

  const categories = Array.from(new Set(techs.map((t) => t.category)))
  const totalQuestions = getAllQuestions().length

  const stats = [
    { label: 'Technologies', value: `${techs.length}+`, icon: Layers },
    { label: 'Questions', value: `${totalQuestions}+`, icon: BookOpen },
    { label: 'Roadmaps', value: `${roadmaps.length}`, icon: Compass },
    { label: 'Code Examples', value: `${totalQuestions}+`, icon: Zap },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-blob absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-brand-500" />
          <div className="hero-blob absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-accent-cyan" />
        </div>
        <div className="absolute inset-0 -z-10 bg-grid-light bg-[size:32px_32px] opacity-40 dark:bg-grid-dark" />

        <div className="sn-section relative pb-16 pt-16 sm:pt-24">
          <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-4xl text-center">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-xs font-medium text-brand-600 dark:text-brand-400"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Now with {totalQuestions}+ curated questions across {techs.length} technologies
            </motion.div>

            <motion.h1 variants={item} className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Master every <span className="gradient-text">interview</span>,
              <br className="hidden sm:block" /> one question at a time.
            </motion.h1>

            <motion.p variants={item} className="mx-auto mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              SkillNest is a modern, offline-friendly playground packed with hand-crafted questions,
              real-world code, and beautifully visual roadmaps for the technologies you actually use.
            </motion.p>

            <motion.form
              variants={item}
              onSubmit={(e) => {
                e.preventDefault()
                router.push(`/skillnest/search?q=${encodeURIComponent(q)}`)
              }}
              className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 p-2 shadow-glow backdrop-blur focus-within:border-brand-500 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <SearchIcon className="ml-3 h-5 w-5 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="search"
                placeholder="Search 'React hooks', 'SQL joins', 'Azure Functions'…"
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </motion.form>

            <motion.div variants={item} className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/skillnest/technologies">
                <Button leftIcon={<Layers className="h-4 w-4" />}>Browse Technologies</Button>
              </Link>
              <Link href="/skillnest/interview-helper">
                <Button variant="outline" leftIcon={<Sparkles className="h-4 w-4" />}>
                  Interview Helper
                </Button>
              </Link>
              <Link href="/skillnest/roadmaps">
                <Button variant="outline" leftIcon={<Compass className="h-4 w-4" />}>
                  Learning Roadmaps
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s) => {
              const I = s.icon
              return (
                <motion.div
                  key={s.label}
                  variants={item}
                  className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-center shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <I className="mx-auto mb-2 h-5 w-5 text-brand-500" />
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="sn-section py-16">
        <SectionHeader
          eyebrow="Categories"
          title="Explore by category"
          description="Everything is organised into six focused categories, so you always know where to look."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat, i) => {
            const count = techs.filter((t) => t.category === cat).length
            const icons = [Layers, BookOpen, Compass, Zap, Brain, ShieldCheck]
            const I = icons[i % icons.length]
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/skillnest/technologies?cat=${encodeURIComponent(cat)}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-cyan text-white">
                      <I className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-semibold">{cat}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{count} technologies</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* POPULAR TECHNOLOGIES */}
      <section className="sn-section py-16">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <SectionHeader
            align="left"
            eyebrow="Popular"
            title="Popular technologies"
            description="Curated picks — the frameworks and languages every developer meets."
          />
          <Link href="/skillnest/technologies">
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View all
            </Button>
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {techs.slice(0, 8).map((t, i) => (
            <TechnologyCard key={t.id} tech={t} index={i} />
          ))}
        </div>
      </section>

      {/* FEATURED QUESTIONS */}
      <section className="sn-section py-16">
        <SectionHeader
          eyebrow="Featured"
          title="Featured interview questions"
          description="A taste of what's inside. Every question comes with an answer, explanation, code example, and interview tips."
        />
        <ul className="mt-10 grid gap-4 lg:grid-cols-2">
          {featured.map(({ tech, question }, i) => (
            <QuestionCard key={`${tech.id}-${question.id}`} techId={tech.id} question={question} index={i} />
          ))}
        </ul>
      </section>

      {/* ROADMAPS */}
      <section className="sn-section py-16">
        <SectionHeader
          eyebrow="Roadmaps"
          title="Learning roadmaps"
          description="Follow a clear, opinionated path — from fundamentals to advanced patterns."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {roadmaps.map((r) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[r.icon] ?? Rocket
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/skillnest/roadmaps/${r.id}`}
                  className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className={cn('absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl', r.color)} />
                  <div className={cn('grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white', r.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{r.tagline}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{r.steps.length} steps</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-brand-600 transition-transform group-hover:translate-x-1 dark:text-brand-400">
                      Start <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* TIPS */}
      <section className="sn-section py-16">
        <SectionHeader
          eyebrow="Interview Prep Tips"
          title="How to prepare like a pro"
          description="Study smart, not just hard. These principles will change how you approach interviews."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Brain, title: "Understand, don't memorise", desc: 'Interviewers probe understanding. Practise explaining answers in your own words.' },
            { icon: Target, title: 'Focus on the fundamentals', desc: 'Data structures, HTTP, SQL, and OOP show up in every stack. Master them.' },
            { icon: Zap, title: 'Write code every day', desc: 'Small daily reps beat marathon cram sessions. Use SkillNest as your morning warm-up.' },
          ].map((t, i) => {
            const I = t.icon
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-cyan text-white">
                  <I className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* WHY */}
      <section className="sn-section py-16">
        <SectionHeader
          eyebrow="Why SkillNest"
          title="Everything you need — nothing you don't"
          description="No login, no backend, no data collection. Just a premium reading experience for your interview prep."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Privacy first', desc: 'Fully static. Your progress never leaves your browser.' },
            { icon: Rocket, title: 'Lightning fast', desc: 'Next.js App Router + code splitting + zero backend round-trips.' },
            { icon: BookOpen, title: 'Editorial quality', desc: 'Curated answers, real code, honest tradeoffs.' },
            { icon: Compass, title: 'Structured paths', desc: 'Follow roadmaps or dive straight into questions.' },
          ].map((f, i) => {
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
      </section>

      {/* FAQ */}
      <section className="sn-section py-16">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you might be wondering about SkillNest."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion
            items={[
              { title: 'Is SkillNest completely free?', content: "Yes. It's a static site — no accounts, no paywalls, no ads." },
              { title: 'Does SkillNest work offline?', content: 'Yes. Once loaded, the app runs entirely in your browser with no network dependency.' },
              { title: 'How can I add more questions?', content: 'Edit the JSON files under lib/skillnest/data/questions/*.json. The app picks them up automatically.' },
              { title: 'Can I deploy this on Vercel?', content: 'Yes — it is part of this Next.js site and deploys with it automatically.' },
              { title: 'Does it collect any personal data?', content: 'No. There is no backend, no analytics, and no cookies beyond your theme preference.' },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="sn-section pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-600 via-blue-600 to-accent-cyan p-10 text-white shadow-glow dark:border-slate-800">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark bg-[size:32px_32px] opacity-25" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold sm:text-3xl">Ready to level up your interviews?</h3>
              <p className="mt-2 text-sm text-white/85 sm:text-base">
                Browse every technology, follow a roadmap, or search across every question — zero login required.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/skillnest/technologies">
                <Button variant="ghost" className="!bg-white !text-brand-700 hover:!bg-slate-100">Get Started</Button>
              </Link>
              <Link href="/skillnest/roadmaps">
                <Button variant="ghost" className="!bg-white/10 hover:!bg-white/20 !text-white">Explore Roadmaps</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
