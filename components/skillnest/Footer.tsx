import Link from 'next/link'
import { Github, Twitter, Sparkles, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="no-print border-t border-slate-200 bg-white/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
      <div className="sn-section grid gap-8 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/skillnest" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-cyan shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Skill<span className="gradient-text">Nest</span>
            </span>
          </Link>
          <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-400">
            The modern, frontend-only interview preparation platform. Curated questions, code examples, and roadmaps
            across the technologies you actually use.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost h-9 w-9 p-0"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost h-9 w-9 p-0"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link className="hover:text-brand-600 dark:hover:text-brand-400" href="/skillnest/technologies">
                Technologies
              </Link>
            </li>
            <li>
              <Link className="hover:text-brand-600 dark:hover:text-brand-400" href="/skillnest/roadmaps">
                Roadmaps
              </Link>
            </li>
            <li>
              <Link className="hover:text-brand-600 dark:hover:text-brand-400" href="/skillnest/search">
                Search
              </Link>
            </li>
            <li>
              <Link className="hover:text-brand-600 dark:hover:text-brand-400" href="/skillnest/about">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              Made with <Heart className="mx-1 inline h-3 w-3 text-rose-500" fill="currentColor" /> for developers.
            </li>
            <li>© {new Date().getFullYear()} SkillNest.</li>
            <li>Developed by Sathappan with Copilot.</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
