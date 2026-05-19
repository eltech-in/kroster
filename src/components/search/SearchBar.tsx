'use client'

import { useState, useCallback, useTransition } from 'react'
import { Search, X, Filter } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

type SearchBarProps = {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

const CATEGORIES = [
  'All', 'Real Estate', 'Finance', 'IT & Tech', 'Healthcare', 'Education',
  'Marketing', 'Legal', 'Construction', 'Food & Beverage', 'Retail',
]

export function SearchBar({ onSearch, placeholder, className }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [isPending, startTransition] = useTransition()

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch?.(value)
  }, 300)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    debouncedSearch(val)
  }

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
  }

  return (
    <div className={`w-full ${className ?? ''}`}>
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-white/40 pointer-events-none" />
        <input
          id="member-search"
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={placeholder ?? 'Search members, businesses, services...'}
          className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B61F2B]/50 focus:ring-2 focus:ring-[#B61F2B]/20 transition-all duration-200 text-base"
          aria-label="Search members"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-all duration-200"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#B61F2B] to-[#7A111B] text-white shadow-lg shadow-red-900/30'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
