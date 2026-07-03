'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  Copy,
  Layers,
  Printer,
  Sparkles,
  Wand2,
  Briefcase,
  ClipboardPaste,
} from 'lucide-react'
import Breadcrumb from '@/components/skillnest/ui/Breadcrumb'
import Button from '@/components/skillnest/ui/Button'
import QuestionCard from '@/components/skillnest/QuestionCard'
import EmptyState from '@/components/skillnest/ui/EmptyState'
import { useToast } from '@/hooks/useToast'
import { cn, difficultyColor } from '@/utils/cn'
import { generateInterview, type GenResult } from '@/lib/skillnest/interview'

const SAMPLE = `Senior Full Stack Engineer

We are looking for a Senior Full Stack Engineer with 6+ years of experience.
You will build scalable web applications using React, TypeScript and Node.js on the
frontend and backend, backed by PostgreSQL and Redis. Experience with AWS, Docker
and Kubernetes for CI/CD is required. Bonus: GraphQL, Next.js, and strong testing skills.`

const DIFFICULTIES = ['Auto', 'All', 'Beginner', 'Intermediate', 'Advanced'] as const

export default function InterviewHelper() {
  const { toast } = useToast()
  const [text, setText] = useState('')
  const [count, setCount] = useState(15)
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>('Auto')
  const [result, setResult] = useState<GenResult | null>(null)
  const [copied, setCopied] = useState(false)

  const generate = () => {
    if (!text.trim()) {
      toast('Paste a job description first', 'info')
      return
    }
    const res = generateInterview(text, {
      count,
      difficulty: difficulty === 'Auto' ? undefined : difficulty,
    })
    setResult(res)
  }

  const copyAll = async () => {
    if (!result) return
    const body = result.items
      .map((it, i) => `${i + 1}. [${it.tech.name}] ${it.question.title}\n   ${it.question.question}`)
      .join('\n\n')
    await navigator.clipboard.writeText(body)
    setCopied(true)
    toast('All questions copied')
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sn-section py-10"
    >
      <Breadcrumb items={[{ label: 'Interview Helper' }]} />

      {/* Hero */}
      <div className="mt-6 flex flex-col gap-3">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          <Wand2 className="h-3.5 w-3.5" /> AI-free · Works offline
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Interview <span className="gradient-text">Helper</span>
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Paste a job description below. SkillNest detects the technologies, seniority and roles it
          mentions, then assembles a tailored interview-question set from its curated banks.
        </p>
      </div>

      {/* Input */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="jd" className="flex items-center gap-2 text-sm font-semibold">
            <Briefcase className="h-4 w-4 text-brand-500" /> Job description
          </label>
          <button
            onClick={() => setText(SAMPLE)}
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            <ClipboardPaste className="h-3.5 w-3.5" /> Use sample
          </button>
        </div>
        <textarea
          id="jd"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          placeholder="Paste the full job description here — e.g. 'Senior React + Node.js engineer with AWS and PostgreSQL experience…'"
          className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-800 dark:bg-slate-950/50"
        />

        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Questions
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[10, 15, 20, 30].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-xs font-semibold transition-all',
                    count === n
                      ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400'
                      : 'border-slate-200 text-slate-600 hover:border-brand-400 dark:border-slate-800 dark:text-slate-300',
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Difficulty
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-xs font-semibold transition-all',
                    difficulty === d
                      ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400'
                      : 'border-slate-200 text-slate-600 hover:border-brand-400 dark:border-slate-800 dark:text-slate-300',
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={generate} leftIcon={<Sparkles className="h-4 w-4" />} className="ml-auto">
            Generate Questions
          </Button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          {/* Analysis summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Layers className="h-4 w-4" /> What we detected
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                  result.analysis.seniority === 'Senior'
                    ? difficultyColor('Advanced')
                    : result.analysis.seniority === 'Junior'
                      ? difficultyColor('Beginner')
                      : difficultyColor('Intermediate'),
                )}
              >
                {result.analysis.seniority === 'Unspecified' ? 'Seniority: any' : `${result.analysis.seniority} level`}
              </span>
              {result.analysis.roles.map((r) => (
                <span key={r} className="chip capitalize">
                  {r}
                </span>
              ))}
              {result.analysis.technologies.length === 0 && (
                <span className="text-xs text-slate-500 dark:text-slate-400">No specific technologies found</span>
              )}
              {result.analysis.technologies.map(({ tech, score }) => (
                <span
                  key={tech.id}
                  className="inline-flex items-center gap-1 rounded-full border border-brand-500/20 bg-brand-500/5 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:text-brand-400"
                >
                  {tech.name}
                  <span className="rounded-full bg-brand-500/15 px-1.5 text-[10px]">{score}</span>
                </span>
              ))}
            </div>
            {result.usedFallback && (
              <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
                No specific technologies were detected — showing a general set. Add concrete tech names
                (React, Python, AWS…) to the description for sharper results.
              </p>
            )}

            <div className="no-print mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={copyAll}
                leftIcon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              >
                {copied ? 'Copied' : 'Copy all'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => window.print()} leftIcon={<Printer className="h-4 w-4" />}>
                Print
              </Button>
            </div>
          </div>

          {/* Question list */}
          <div className="mt-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {result.items.length} tailored question{result.items.length === 1 ? '' : 's'}
            </h3>
          </div>

          {result.items.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                title="No matching questions"
                description="Try increasing the count or switching difficulty to All."
              />
            </div>
          ) : (
            <ul className="mt-4 grid gap-4">
              {result.items.map((it, i) => (
                <QuestionCard key={`${it.tech.id}-${it.question.id}`} techId={it.tech.id} question={it.question} index={i} />
              ))}
            </ul>
          )}
        </motion.div>
      )}

      {!result && (
        <div className="mt-8">
          <EmptyState
            icon={<Wand2 className="h-6 w-6" />}
            title="Your tailored interview awaits"
            description="Paste a job description above and hit Generate to build a role-specific question set."
          />
        </div>
      )}
    </motion.div>
  )
}
