import type { Metadata } from 'next'
import Roadmaps from './Roadmaps'

export const metadata: Metadata = {
  title: 'Roadmaps',
  description: 'Follow structured learning paths across React, JavaScript, C#, SQL, Azure, and more.',
}

export default function Page() {
  return <Roadmaps />
}
