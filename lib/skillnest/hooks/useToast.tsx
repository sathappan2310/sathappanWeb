'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X } from 'lucide-react'

interface Toast {
  id: number
  message: string
  kind?: 'success' | 'info'
}

interface Ctx {
  toast: (message: string, kind?: Toast['kind']) => void
}

const ToastCtx = createContext<Ctx | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toast = useCallback((message: string, kind: Toast['kind'] = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, kind }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])
  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="pointer-events-auto flex items-center gap-3 rounded-xl glass px-4 py-3 shadow-glow"
            >
              {t.kind === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <Info className="h-5 w-5 text-brand-500" />
              )}
              <span className="text-sm font-medium">{t.message}</span>
              <button
                onClick={() => setToasts((tt) => tt.filter((x) => x.id !== t.id))}
                className="ml-2 rounded p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be within ToastProvider')
  return ctx
}
