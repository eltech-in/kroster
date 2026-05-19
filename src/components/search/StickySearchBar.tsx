'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Filter } from 'lucide-react'

type Props = {
  onSearch: (q: string) => void
  value: string
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (c: string | null) => void
}

export function StickySearchBar({
  onSearch,
  value,
  categories,
  selectedCategory,
  onSelectCategory
}: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
          className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
        >
          <div className="container-main flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex items-center w-full md:max-w-md">
              <Search className="absolute left-4 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="search"
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search members..."
                className="w-full h-10 pl-10 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B61F2B]/50 focus:bg-white/10 text-sm transition-all duration-300"
                aria-label="Search members (sticky)"
              />
              {value && (
                <button
                  onClick={() => onSearch('')}
                  className="absolute right-3 text-white/40 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Chips */}
            <div className="flex-1 w-full overflow-x-auto scrollbar-none snap-x flex items-center gap-2 pb-1 md:pb-0 mask-edges-horizontal">
              <button
                onClick={() => onSelectCategory(null)}
                className={`snap-start flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedCategory === null 
                    ? 'bg-gradient-to-r from-[#B61F2B] to-[#7A111B] text-white shadow-lg border border-transparent' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`snap-start flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedCategory === cat 
                      ? 'bg-gradient-to-r from-[#B61F2B] to-[#7A111B] text-white shadow-lg border border-transparent' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
