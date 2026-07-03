'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/cn'

interface Props {
  code: string
  language?: string
  className?: string
}

export default function CodeBlock({ code, language = 'tsx', className }: Props) {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* no-op */
    }
  }

  return (
    <div className={cn('group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800', className)}>
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/60">
        <span className="uppercase tracking-wider">{language}</span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.85rem',
          background: 'transparent',
        }}
        codeTagProps={{ style: { fontFamily: 'JetBrains Mono, ui-monospace, monospace' } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
