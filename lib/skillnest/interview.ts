import type { Difficulty, Question, Technology } from '@/types'
import { getQuestions, getTechnologies } from '@/data'

/**
 * Interview Helper engine — fully client-side.
 * Analyses a pasted job description and assembles a tailored interview-question
 * set from the existing SkillNest banks (no backend, no API key required).
 */

export type Seniority = 'Junior' | 'Mid' | 'Senior' | 'Unspecified'

export interface Analysis {
  technologies: { tech: Technology; score: number }[]
  seniority: Seniority
  roles: string[]
  difficulties: Difficulty[]
}

export interface GenItem {
  tech: Technology
  question: Question
}

export interface GenResult {
  analysis: Analysis
  items: GenItem[]
  usedFallback: boolean
}

export interface GenOptions {
  count?: number
  difficulty?: Difficulty | 'All'
}

// Technology id -> alias phrases found in job descriptions.
const ALIASES: Record<string, string[]> = {
  javascript: ['javascript', 'java script', 'es6', 'es2015', 'ecmascript', 'vanilla js'],
  typescript: ['typescript', 'type script', ' ts '],
  react: ['react', 'react.js', 'reactjs', 'react native', 'next.js', 'nextjs', 'redux'],
  angular: ['angular', 'angularjs', 'rxjs', 'ngrx'],
  vue: ['vue', 'vue.js', 'vuejs', 'nuxt', 'pinia', 'vuex'],
  csharp: ['c#', 'csharp', 'c sharp', '.net', 'dotnet', 'dot net'],
  aspnet: ['asp.net', 'aspnet', 'asp .net', 'web api', 'blazor', 'entity framework', 'ef core'],
  java: ['java ', 'jvm', 'j2ee', 'jakarta ee'],
  spring: ['spring', 'spring boot', 'springboot', 'hibernate'],
  python: ['python', 'django', 'flask', 'fastapi', 'pandas', 'numpy'],
  cpp: ['c++', 'cpp', 'c plus plus'],
  c: ['c programming', 'c language', 'embedded c', ' c/c++'],
  go: ['golang', 'go lang', 'go programming', 'go developer'],
  rust: ['rust'],
  kotlin: ['kotlin'],
  swift: ['swift', 'swiftui'],
  php: ['php', 'laravel', 'symfony', 'wordpress'],
  ruby: ['ruby', 'ruby on rails', 'rails'],
  scala: ['scala', 'akka'],
  dart: ['dart', 'flutter'],
  r: ['r programming', 'r language', 'rstats', 'tidyverse'],
  perl: ['perl'],
  objectivec: ['objective-c', 'objective c', 'objc'],
  haskell: ['haskell'],
  elixir: ['elixir', 'phoenix framework'],
  erlang: ['erlang', 'otp'],
  clojure: ['clojure', 'clojurescript'],
  fsharp: ['f#', 'fsharp'],
  lua: ['lua'],
  julia: ['julia'],
  groovy: ['groovy', 'gradle', 'jenkins pipeline'],
  solidity: ['solidity', 'smart contract', 'ethereum', 'web3', 'blockchain'],
  bash: ['bash', 'shell script', 'shell scripting', 'shell scripts'],
  powershell: ['powershell'],
  cobol: ['cobol', 'mainframe'],
  assembly: ['assembly', 'x86', 'nasm', 'assembler'],
  html: ['html', 'html5', 'semantic markup'],
  css: ['css', 'css3', 'scss', 'sass', 'less', 'styled components'],
  bootstrap: ['bootstrap'],
  tailwind: ['tailwind', 'tailwindcss', 'tailwind css'],
  node: ['node', 'node.js', 'nodejs'],
  express: ['express', 'express.js', 'expressjs'],
  sqlserver: ['sql server', 'mssql', 't-sql', 'tsql', 'ssms'],
  mysql: ['mysql', 'mariadb'],
  postgres: ['postgres', 'postgresql', 'psql'],
  mongo: ['mongo', 'mongodb', 'mongoose'],
  azure: ['azure', 'azure devops', 'app service', 'cosmos db'],
  aws: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'dynamodb'],
  docker: ['docker', 'container', 'containeri'],
  kubernetes: ['kubernetes', 'k8s', 'helm', 'openshift'],
  git: ['git ', 'version control'],
  github: ['github', 'github actions'],
  postman: ['postman', 'api testing'],
}

const SENIOR_WORDS = ['senior', 'lead', 'principal', 'staff', 'architect', 'sr.', 'sr ', 'expert', '5+ years', '6+ years', '7+ years', '8+ years', '10+ years']
const JUNIOR_WORDS = ['junior', 'entry level', 'entry-level', 'graduate', 'intern', 'trainee', 'fresher', 'associate', '0-1 year', '0-2 year', 'jr.', 'jr ']
const MID_WORDS = ['mid level', 'mid-level', 'intermediate', '2+ years', '3+ years', '4+ years']

const ROLE_WORDS: Record<string, string[]> = {
  frontend: ['frontend', 'front-end', 'front end', 'ui developer', 'ui engineer'],
  backend: ['backend', 'back-end', 'back end', 'server-side', 'server side'],
  fullstack: ['full stack', 'full-stack', 'fullstack'],
  devops: ['devops', 'sre', 'site reliability', 'ci/cd', 'infrastructure'],
  data: ['data engineer', 'data scientist', 'data analyst', 'analytics', 'machine learning', 'ml engineer'],
  mobile: ['mobile', 'android', 'ios', 'react native', 'flutter'],
  qa: ['qa', 'quality assurance', 'test engineer', 'sdet', 'automation testing'],
  security: ['security', 'appsec', 'penetration', 'cybersecurity'],
  cloud: ['cloud', 'aws', 'azure', 'gcp'],
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0
  let count = 0
  let idx = 0
  while ((idx = haystack.indexOf(needle, idx)) !== -1) {
    count++
    idx += needle.length
  }
  return count
}

export function analyzeJobDescription(text: string): Analysis {
  const hay = ` ${text.toLowerCase()} `
  const techs = getTechnologies()

  // Score technologies by alias occurrences.
  const scored: { tech: Technology; score: number }[] = []
  for (const tech of techs) {
    const aliases = ALIASES[tech.id] ?? [tech.name.toLowerCase()]
    let score = 0
    for (const a of aliases) score += countOccurrences(hay, a)
    // avoid "java" matching inside "javascript"
    if (tech.id === 'java') score -= countOccurrences(hay, 'javascript')
    if (score > 0) scored.push({ tech, score })
  }
  scored.sort((a, b) => b.score - a.score)

  // Seniority.
  let seniority: Seniority = 'Unspecified'
  if (SENIOR_WORDS.some((w) => hay.includes(w))) seniority = 'Senior'
  else if (JUNIOR_WORDS.some((w) => hay.includes(w))) seniority = 'Junior'
  else if (MID_WORDS.some((w) => hay.includes(w))) seniority = 'Mid'

  // Roles.
  const roles: string[] = []
  for (const [role, words] of Object.entries(ROLE_WORDS)) {
    if (words.some((w) => hay.includes(w))) roles.push(role)
  }

  const difficulties: Difficulty[] =
    seniority === 'Senior'
      ? ['Intermediate', 'Advanced']
      : seniority === 'Junior'
        ? ['Beginner', 'Intermediate']
        : ['Beginner', 'Intermediate', 'Advanced']

  return { technologies: scored, seniority, roles, difficulties }
}

function rankQuestions(tech: Technology, difficulties: Difficulty[], roles: string[]): Question[] {
  const pool = getQuestions(tech.id).filter((q) => difficulties.includes(q.difficulty))
  const scoreOf = (q: Question) => {
    let s = 0
    const tags = q.tags.map((t) => t.toLowerCase())
    if (roles.some((r) => tags.includes(r))) s += 3
    if (q.difficulty === 'Advanced') s += 1
    return s
  }
  return [...pool].sort((a, b) => scoreOf(b) - scoreOf(a) || a.id - b.id)
}

export function generateInterview(text: string, opts: GenOptions = {}): GenResult {
  const count = Math.max(1, Math.min(60, opts.count ?? 15))
  const analysis = analyzeJobDescription(text)

  let difficulties = analysis.difficulties
  if (opts.difficulty && opts.difficulty !== 'All') difficulties = [opts.difficulty]

  let techList = analysis.technologies.map((t) => t.tech)
  let usedFallback = false
  if (techList.length === 0) {
    usedFallback = true
    techList = getTechnologies().slice(0, 8)
  }

  // Ranked question queues per technology.
  const queues = techList.map((tech) => ({
    tech,
    queue: rankQuestions(tech, difficulties, analysis.roles),
  }))

  // Round-robin interleave, weighted by technology order (higher score first).
  const items: GenItem[] = []
  let added = true
  while (items.length < count && added) {
    added = false
    for (const q of queues) {
      if (items.length >= count) break
      const next = q.queue.shift()
      if (next) {
        items.push({ tech: q.tech, question: next })
        added = true
      }
    }
  }

  return { analysis, items, usedFallback }
}
