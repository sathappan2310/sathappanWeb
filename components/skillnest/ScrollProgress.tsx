'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-500 via-blue-500 to-accent-cyan"
      style={{ scaleX: p / 100 }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
    />
  )
}
