import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getQuestion, getQuestions, getTechnologies, getTechnology } from '@/data'
import QuestionDetail from './QuestionDetail'

interface Props {
  params: { techId: string; questionId: string }
}

export function generateStaticParams() {
  const out: { techId: string; questionId: string }[] = []
  for (const t of getTechnologies()) {
    for (const q of getQuestions(t.id)) {
      out.push({ techId: t.id, questionId: String(q.id) })
    }
  }
  return out
}

export function generateMetadata({ params }: Props): Metadata {
  const { techId, questionId } = params
  const tech = getTechnology(techId)
  const question = getQuestion(techId, Number(questionId))
  if (!tech || !question) return { title: 'Question not found' }
  return {
    title: `${question.title} — ${tech.name}`,
    description: question.question.slice(0, 160),
  }
}

export default function Page({ params }: Props) {
  const { techId, questionId } = params
  const tech = getTechnology(techId)
  const question = getQuestion(techId, Number(questionId))
  if (!tech || !question) notFound()
  return <QuestionDetail techId={techId} questionId={Number(questionId)} />
}
