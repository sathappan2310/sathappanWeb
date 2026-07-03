export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Technology {
  id: string
  name: string
  category: TechCategory
  description: string
  color: string // tailwind gradient endpoint keys "from-x to-y"
  icon: string // lucide icon name
  tags: string[]
}

export type TechCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Cloud'
  | 'Tools'

export interface Question {
  id: number
  title: string
  question: string
  answer: string
  explanation: string
  codeExample: string
  language?: string
  difficulty: Difficulty
  category: string
  tags: string[]
  bestPractices: string[]
  commonMistakes: string[]
  interviewTips: string[]
  relatedQuestions: number[]
}

export interface RoadmapStep {
  id: string
  title: string
  description: string
  topics: string[]
  level: Difficulty
}

export interface Roadmap {
  id: string
  title: string
  tagline: string
  color: string
  icon: string
  steps: RoadmapStep[]
}
