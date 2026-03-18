'use client'

import { useRef, useEffect, useState } from 'react'

type Tab = {
  id: string
  label: string
  count?: number
}

type TabsProps = {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map())
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const activeElement = tabsRef.current.get(activeTab)
    if (activeElement) {
      const parent = activeElement.parentElement
      if (parent) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
        })
      }
    }
  }, [activeTab])

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex: number | null = null

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = tabs.length - 1
    }

    if (nextIndex !== null) {
      const nextTab = tabs[nextIndex]
      onChange(nextTab.id)
      tabsRef.current.get(nextTab.id)?.focus()
    }
  }

  return (
    <div
      className={`relative border-b border-gray-200 ${className}`}
      role="tablist"
      aria-label="Onglets"
    >
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabsRef.current.set(tab.id, el)
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-inset rounded-t-lg ${
                isActive
                  ? 'text-[#2563EB]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`ml-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold ${
                    isActive
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {/* Animated active indicator */}
      <div
        className="absolute bottom-0 h-0.5 bg-[#2563EB] transition-all duration-200 ease-out"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        aria-hidden="true"
      />
    </div>
  )
}
