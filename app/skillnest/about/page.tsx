import type { Metadata } from 'next'
import About from './About'

export const metadata: Metadata = {
  title: 'About',
  description: 'About SkillNest — the modern, frontend-only interview prep platform.',
}

export default function Page() {
  return <About />
}
