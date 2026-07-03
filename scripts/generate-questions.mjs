#!/usr/bin/env node
/**
 * SkillNest daily question generator.
 *
 * Adds fresh, role-aware interview questions to the banks under
 * lib/skillnest/data/questions/*.json — and can register brand-new
 * (latest) technologies automatically.
 *
 * Usage:
 *   node scripts/generate-questions.mjs --tech react --count 3
 *   node scripts/generate-questions.mjs --auto --count 3
 *   node scripts/generate-questions.mjs --new --tech zig --name "Zig" \
 *        --category Languages --count 20 --language zig
 *   node scripts/generate-questions.mjs --auto --count 2 --mock   (no LLM, for testing)
 *
 * LLM provider (auto-detected):
 *   1. OPENAI_API_KEY  -> OpenAI-compatible API (OPENAI_BASE_URL, OPENAI_MODEL)
 *   2. MODELS_TOKEN / GITHUB_TOKEN -> GitHub Models (free in Actions)
 *   3. --mock          -> generates schema-valid placeholder questions
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const QDIR = path.join(ROOT, 'lib/skillnest/data/questions')
const TECH_FILE = path.join(ROOT, 'lib/skillnest/data/technologies.json')
const INDEX_FILE = path.join(ROOT, 'lib/skillnest/data/index.ts')
const EMERGING_FILE = path.join(__dirname, 'emerging-tech.json')

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']
const MAX_TARGET = Number(process.env.SKILLNEST_MAX_TARGET || 40)

// ---------- CLI ----------
function parseArgs(argv) {
  const args = { count: 3 }
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--auto') args.auto = true
    else if (a === '--new') args.new = true
    else if (a === '--mock') args.mock = true
    else if (a === '--dry') args.dry = true
    else if (a.startsWith('--')) {
      args[a.slice(2)] = argv[i + 1]
      i++
    }
  }
  if (args.count) args.count = Number(args.count)
  return args
}

// ---------- helpers ----------
const read = (p) => fs.readFileSync(p, 'utf8')
const readJson = (p) => JSON.parse(read(p))
const sanitizeId = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '')

function bankPath(id) {
  return path.join(QDIR, `${id}.json`)
}

function loadBank(id) {
  const p = bankPath(id)
  if (!fs.existsSync(p)) return []
  try {
    return readJson(p)
  } catch {
    return []
  }
}

function writeBank(id, arr) {
  fs.writeFileSync(bankPath(id), JSON.stringify(arr, null, 2) + '\n')
}

function writeTechnologies(list) {
  const body = list.map((o) => '  ' + JSON.stringify(o)).join(',\n')
  fs.writeFileSync(TECH_FILE, `[\n${body}\n]\n`)
}

// ---------- normalization ----------
function normalize(generated, existing) {
  const maxId = existing.reduce((m, q) => Math.max(m, q.id || 0), 0)
  const existingTitles = new Set(existing.map((q) => (q.title || '').trim().toLowerCase()))
  const out = []
  let nextId = maxId + 1
  const newIds = new Set()

  for (const raw of generated) {
    if (!raw || typeof raw !== 'object') continue
    const title = String(raw.title || '').trim()
    if (!title) continue
    const key = title.toLowerCase()
    if (existingTitles.has(key)) continue // dedupe
    existingTitles.add(key)

    const id = nextId++
    newIds.add(id)
    out.push({
      id,
      title,
      question: String(raw.question || title),
      answer: String(raw.answer || ''),
      explanation: String(raw.explanation || ''),
      codeExample: String(raw.codeExample || ''),
      language: String(raw.language || 'text'),
      difficulty: DIFFICULTIES.includes(raw.difficulty) ? raw.difficulty : 'Intermediate',
      category: String(raw.category || 'General'),
      tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
      bestPractices: Array.isArray(raw.bestPractices) ? raw.bestPractices.map(String) : [],
      commonMistakes: Array.isArray(raw.commonMistakes) ? raw.commonMistakes.map(String) : [],
      interviewTips: Array.isArray(raw.interviewTips) ? raw.interviewTips.map(String) : [],
      relatedQuestions: Array.isArray(raw.relatedQuestions) ? raw.relatedQuestions.map(Number) : [],
    })
  }

  // clamp relatedQuestions to valid ids (existing + new)
  const validIds = new Set([...existing.map((q) => q.id), ...newIds])
  for (const q of out) {
    q.relatedQuestions = [...new Set(q.relatedQuestions.filter((r) => validIds.has(r) && r !== q.id))].slice(0, 4)
  }
  return out
}

// ---------- LLM ----------
function buildPrompt(tech, existing, count) {
  const titles = existing.map((q) => q.title).slice(-40)
  return `You are an expert technical interviewer. Generate ${count} NEW, high-quality interview questions for "${tech.name}" (${tech.category}).

Return ONLY a JSON array (no markdown fences) of ${count} objects with EXACTLY these keys:
id (integer placeholder), title (short), question, answer, explanation, codeExample (use \\n for newlines, language ${JSON.stringify(tech.language || 'text')}), language, difficulty (one of Beginner|Intermediate|Advanced), category, tags (array, MUST include a seniority tag junior|mid|senior and relevant role tags), bestPractices (array), commonMistakes (array), interviewTips (array), relatedQuestions (array of integers).

Cover modern, up-to-date topics and spread difficulty. Do NOT duplicate any of these existing titles:
${titles.map((t) => '- ' + t).join('\n')}`
}

function extractJsonArray(text) {
  let t = text.trim()
  t = t.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim()
  const start = t.indexOf('[')
  const end = t.lastIndexOf(']')
  if (start === -1 || end === -1) throw new Error('No JSON array found in model output')
  return JSON.parse(t.slice(start, end + 1))
}

async function callOpenAI(prompt) {
  const base = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      messages: [
        { role: 'system', content: 'You output only valid JSON arrays.' },
        { role: 'user', content: prompt },
      ],
    }),
  })
  if (!res.ok) throw new Error(`OpenAI API ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return extractJsonArray(data.choices[0].message.content)
}

async function callGitHubModels(prompt) {
  const token = process.env.MODELS_TOKEN || process.env.GITHUB_TOKEN
  const model = process.env.MODELS_NAME || 'openai/gpt-4o-mini'
  const res = await fetch('https://models.github.ai/inference/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      messages: [
        { role: 'system', content: 'You output only valid JSON arrays.' },
        { role: 'user', content: prompt },
      ],
    }),
  })
  if (!res.ok) throw new Error(`GitHub Models ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return extractJsonArray(data.choices[0].message.content)
}

function mockQuestions(tech, existing, count) {
  const maxId = existing.reduce((m, q) => Math.max(m, q.id || 0), 0)
  const out = []
  for (let i = 1; i <= count; i++) {
    out.push({
      id: maxId + i,
      title: `${tech.name} sample topic #${maxId + i}`,
      question: `Explain an important ${tech.name} concept (auto-generated placeholder).`,
      answer: `A concise answer about ${tech.name}.`,
      explanation: `Deeper explanation about ${tech.name}.`,
      codeExample: `// ${tech.name} example\nconsole.log('hello');`,
      language: tech.language || 'text',
      difficulty: DIFFICULTIES[i % 3],
      category: 'General',
      tags: ['mid', String(tech.category || '').toLowerCase() || 'general'],
      bestPractices: ['Follow idiomatic conventions.'],
      commonMistakes: ['Skipping fundamentals.'],
      interviewTips: ['Explain with a concrete example.'],
      relatedQuestions: [],
    })
  }
  return out
}

async function generate(tech, existing, count, args) {
  if (args.mock) return mockQuestions(tech, existing, count)
  const prompt = buildPrompt(tech, existing, count)
  if (process.env.OPENAI_API_KEY) return callOpenAI(prompt)
  if (process.env.MODELS_TOKEN || process.env.GITHUB_TOKEN) return callGitHubModels(prompt)
  throw new Error('No LLM provider configured. Set OPENAI_API_KEY or MODELS_TOKEN/GITHUB_TOKEN, or pass --mock.')
}

// ---------- tech registration ----------
function registerTechnology(meta) {
  const list = readJson(TECH_FILE)
  if (list.some((t) => t.id === meta.id)) return false
  list.push({
    id: meta.id,
    name: meta.name,
    category: meta.category || 'Languages',
    description: meta.description || `${meta.name} interview questions.`,
    color: meta.color || 'from-slate-500 to-slate-700',
    icon: meta.icon || 'Code2',
    tags: meta.tags || [],
  })
  writeTechnologies(list)

  // create empty bank
  if (!fs.existsSync(bankPath(meta.id))) writeBank(meta.id, [])

  // patch index.ts
  let src = read(INDEX_FILE)
  if (!src.includes(`questions/${meta.id}.json`)) {
    src = src.replace(
      /\nconst questionMap/,
      `import ${meta.id} from '@/data/questions/${meta.id}.json'\n\nconst questionMap`,
    )
    src = src.replace(
      /\n\} as unknown as Record<string, Question\[\]>/,
      `\n  ${meta.id},\n} as unknown as Record<string, Question[]>`,
    )
    fs.writeFileSync(INDEX_FILE, src)
  }
  return true
}

function pickAutoTarget(args) {
  const techs = readJson(TECH_FILE)
  const emerging = fs.existsSync(EMERGING_FILE) ? readJson(EMERGING_FILE) : []

  // 1. Register the first not-yet-added emerging technology.
  for (const e of emerging) {
    const id = sanitizeId(e.id)
    if (!techs.some((t) => t.id === id)) {
      return { meta: { ...e, id }, isNew: true }
    }
  }

  // 2. Otherwise expand the existing bank with the fewest questions (below MAX_TARGET).
  let best = null
  for (const t of techs) {
    const n = loadBank(t.id).length
    if (n < MAX_TARGET && (!best || n < best.n)) best = { meta: t, n }
  }
  return best ? { meta: best.meta, isNew: false } : null
}

// ---------- main ----------
async function main() {
  const args = parseArgs(process.argv)
  let target

  if (args.auto) {
    target = pickAutoTarget(args)
    if (!target) {
      console.log('Nothing to do — every bank is at or above the target.')
      return
    }
  } else if (args.new) {
    const id = sanitizeId(args.tech || args.id)
    if (!id || !args.name) throw new Error('--new requires --tech <id> and --name <name>')
    target = {
      meta: {
        id,
        name: args.name,
        category: args.category || 'Languages',
        description: args.description,
        color: args.color,
        icon: args.icon,
        language: args.language,
        tags: args.tags ? String(args.tags).split(',') : [],
      },
      isNew: true,
    }
  } else {
    const id = sanitizeId(args.tech)
    const techs = readJson(TECH_FILE)
    const meta = techs.find((t) => t.id === id)
    if (!meta) throw new Error(`Unknown --tech "${args.tech}". Use --new to add it.`)
    target = { meta, isNew: false }
  }

  const { meta, isNew } = target
  console.log(`${isNew ? 'Adding NEW' : 'Expanding'} technology: ${meta.name} (${meta.id}) — +${args.count} question(s)`)

  if (args.dry) {
    console.log('[dry-run] no files written.')
    return
  }

  if (isNew) registerTechnology(meta)

  const existing = loadBank(meta.id)
  const generated = await generate(meta, existing, args.count, args)
  const normalized = normalize(generated, existing)
  if (normalized.length === 0) {
    console.log('No new (non-duplicate) questions were produced.')
    return
  }
  writeBank(meta.id, [...existing, ...normalized])
  console.log(`Wrote ${normalized.length} new question(s). ${meta.id}.json now has ${existing.length + normalized.length}.`)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
