'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Lightbulb,
  Printer,
  Sparkles,
  Target,
  ThumbsDown,
  Trophy,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import Breadcrumb from '@/components/skillnest/ui/Breadcrumb'
import Button from '@/components/skillnest/ui/Button'
import CodeBlock from '@/components/skillnest/ui/CodeBlock'
import { getQuestion, getQuestions, getTechnology } from '@/data'
import { cn, difficultyColor, estimateReadingTime } from '@/utils/cn'
import { useToast } from '@/hooks/useToast'

export default function QuestionDetail({ techId, questionId }: { techId: string; questionId: number }) {
  const tech = getTechnology(techId)!
  const question = getQuestion(techId, questionId)!
  const { toast } = useToast()
  const [answerCopied, setAnswerCopied] = useState(false)

  const all = useMemo(() => getQuestions(techId), [techId])
  const index = all.findIndex((q) => q.id === questionId)
  const prev = index > 0 ? all[index - 1] : undefined
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : undefined

  const readTime = estimateReadingTime(question.answer + question.explanation)
  const related = question.relatedQuestions
    .map((id) => all.find((q) => q.id === id))
    .filter(Boolean) as typeof all

  const copyAnswer = async () => {
    await navigator.clipboard.writeText(`${question.title}\n\n${question.answer}\n\n${question.explanation}`)
    setAnswerCopied(true)
    toast('Answer copied')
    setTimeout(() => setAnswerCopied(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sn-section py-8"
    >
      <div className="no-print flex items-center justify-between">
        <Breadcrumb
          items={[
            { label: 'Technologies', to: '/skillnest/technologies' },
            { label: tech.name, to: `/skillnest/technologies/${techId}` },
            { label: `Q${question.id}` },
          ]}
        />
        <Link
          href={`/skillnest/technologies/${techId}`}
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 dark:hover:text-brand-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      {/* Header */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
              difficultyColor(question.difficulty),
            )}
          >
            {question.difficulty}
          </span>
          <span className="chip">{question.category}</span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="h-3 w-3" /> {readTime} min read
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{question.title}</h1>
        <p className="mt-3 text-slate-700 dark:text-slate-300">{question.question}</p>

        <div className="no-print mt-5 flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={copyAnswer}
            leftIcon={answerCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          >
            {answerCopied ? 'Copied' : 'Copy Answer'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => window.print()} leftIcon={<Printer className="h-4 w-4" />}>
            Print
          </Button>
        </div>

        {question.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {question.tags.map((t) => (
              <span key={t} className="chip">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body: split layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="space-y-6">
          <Section title="Answer" icon={<BookOpen className="h-4 w-4" />}>
            <p className="whitespace-pre-line">{question.answer}</p>
          </Section>

          {question.explanation && (
            <Section title="Explanation" icon={<Sparkles className="h-4 w-4" />}>
              <p className="whitespace-pre-line">{question.explanation}</p>
            </Section>
          )}

          {question.codeExample && (
            <Section title="Code Example" icon={<Target className="h-4 w-4" />}>
              <CodeBlock code={question.codeExample} language={question.language ?? 'tsx'} />
            </Section>
          )}

          {question.bestPractices.length > 0 && (
            <Section title="Best Practices" icon={<Trophy className="h-4 w-4 text-emerald-500" />}>
              <ul className="space-y-2">
                {question.bestPractices.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {question.commonMistakes.length > 0 && (
            <Section title="Common Mistakes" icon={<ThumbsDown className="h-4 w-4 text-rose-500" />}>
              <ul className="space-y-2">
                {question.commonMistakes.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {question.interviewTips.length > 0 && (
            <Section title="Interview Tips" icon={<Lightbulb className="h-4 w-4 text-amber-500" />}>
              <ul className="space-y-2">
                {question.interviewTips.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </article>

        <aside className="no-print space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h4 className="mb-3 text-sm font-semibold">Related questions</h4>
            {related.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">No related questions yet.</p>
            ) : (
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/skillnest/technologies/${techId}/${r.id}`}
                      className="group flex items-start gap-2 rounded-lg p-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    >
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 text-slate-400 group-hover:text-brand-500" />
                      <span className="line-clamp-2">{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h4 className="mb-3 text-sm font-semibold">All in {tech.name}</h4>
            <Link
              href={`/skillnest/technologies/${techId}`}
              className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
            >
              Browse {all.length} questions →
            </Link>
          </div>
        </aside>
      </div>

      {/* Prev / Next */}
      <div className="no-print mt-10 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/skillnest/technologies/${techId}/${prev.id}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-500/40 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <ArrowLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-1 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            href={`/skillnest/technologies/${techId}/${next.id}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 text-right transition-all hover:border-brand-500/40 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="inline-flex items-center justify-end gap-1 text-xs text-slate-500 dark:text-slate-400">
              Next <ArrowRight className="h-3 w-3" />
            </span>
            <span className="mt-1 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
          {icon}
        </span>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</h2>
      </div>
      <div className="prose prose-slate max-w-none text-slate-700 dark:prose-invert dark:text-slate-300">
        {children}
      </div>
    </section>
  )
}
