'use client'

import { Search as SearchIcon, X } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  onClear?: () => void
  wrapperClassName?: string
}

const SearchBar = forwardRef<HTMLInputElement, Props>(function SearchBar(
  { value, onClear, wrapperClassName, className, ...rest },
  ref,
) {
  return (
    <div
      className={cn(
        'group relative flex items-center rounded-2xl border border-slate-200 bg-white/80 shadow-soft transition-all focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 dark:border-slate-800 dark:bg-slate-900/70',
        wrapperClassName,
      )}
    >
      <SearchIcon className="ml-4 h-5 w-5 shrink-0 text-slate-400" />
      <input
        ref={ref}
        type="search"
        value={value}
        className={cn(
          'w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-slate-400',
          className,
        )}
        {...rest}
      />
      {value && (
        <button
          onClick={onClear}
          className="mr-2 grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Clear"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
})

export default SearchBar
