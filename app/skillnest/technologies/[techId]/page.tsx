import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTechnologies, getTechnology } from '@/data'
import Questions from './Questions'

interface Props {
  params: { techId: string }
}

export function generateStaticParams() {
  return getTechnologies().map((t) => ({ techId: t.id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const { techId } = params
  const tech = getTechnology(techId)
  if (!tech) return { title: 'Technology not found' }
  return {
    title: `${tech.name} Interview Questions`,
    description: tech.description,
  }
}

export default function Page({ params }: Props) {
  const { techId } = params
  const tech = getTechnology(techId)
  if (!tech) notFound()
  return <Questions techId={techId} />
}
