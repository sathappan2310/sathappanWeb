import type { Metadata } from 'next'
import InterviewHelper from './InterviewHelper'

export const metadata: Metadata = {
  title: 'Interview Helper',
  description:
    'Paste a job description and instantly generate a tailored interview-question set from SkillNest — fully offline, no login.',
}

export default function Page() {
  return <InterviewHelper />
}
