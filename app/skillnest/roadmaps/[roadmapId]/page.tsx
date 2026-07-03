import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRoadmap, getRoadmaps } from '@/data'
import RoadmapDetail from './RoadmapDetail'

interface Props {
  params: { roadmapId: string }
}

export function generateStaticParams() {
  return getRoadmaps().map((r) => ({ roadmapId: r.id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const { roadmapId } = params
  const r = getRoadmap(roadmapId)
  if (!r) return { title: 'Roadmap not found' }
  return { title: r.title, description: r.tagline }
}

export default function Page({ params }: Props) {
  const { roadmapId } = params
  const r = getRoadmap(roadmapId)
  if (!r) notFound()
  return <RoadmapDetail roadmapId={roadmapId} />
}
