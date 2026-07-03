import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JetBrains_Mono } from 'next/font/google'
import { ToastProvider } from '@/hooks/useToast'
import Navbar from '@/components/skillnest/Navbar'
import Footer from '@/components/skillnest/Footer'
import ScrollProgress from '@/components/skillnest/ScrollProgress'
import BackToTop from '@/components/skillnest/BackToTop'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SkillNest — Master Every Interview',
    template: '%s · SkillNest',
  },
  description:
    'SkillNest — curated interview questions, answers, and roadmaps across 25+ technologies.',
}

export default function SkillNestLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${mono.variable} relative flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100`}>
      <ToastProvider>
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </ToastProvider>
    </div>
  )
}
