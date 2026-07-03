import type { Metadata } from 'next'
import { Suspense } from 'react'
import Technologies from './Technologies'

export const metadata: Metadata = {
  title: 'Technologies',
  description: 'Browse curated interview questions across 25+ technologies.',
}

export default function Page() {
  return (
    <Suspense>
      <Technologies />
    </Suspense>
  )
}
