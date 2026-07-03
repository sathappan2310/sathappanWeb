import type { Metadata } from 'next'
import { Suspense } from 'react'
import Search from './Search'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Instant search across every interview question in SkillNest.',
}

export default function Page() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  )
}
