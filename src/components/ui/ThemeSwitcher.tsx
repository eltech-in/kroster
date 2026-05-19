'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const options = [
    { value: 'light' as const, icon: Sun },
    { value: 'dark' as const, icon: Moon },
    { value: 'system' as const, icon: Monitor },
  ]

  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
      {options.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`w-7 h-7 flex items-center justify-center rounded-md transition-all duration-200 ${
            theme === value
              ? 'bg-white/15 text-white'
              : 'text-white/40 hover:text-white/70'
          }`}
          aria-label={`Set ${value} theme`}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  )
}
