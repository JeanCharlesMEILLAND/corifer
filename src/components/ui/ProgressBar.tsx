'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type ProgressBarProps = {
  percentage: number
  label?: string
  showPercentage?: boolean
  className?: string
}

function getBarColor(percentage: number): string {
  if (percentage < 25) return 'bg-red-500'
  if (percentage < 50) return 'bg-amber-500'
  if (percentage < 75) return 'bg-[#2563EB]'
  return 'bg-emerald-500'
}

export function ProgressBar({
  percentage,
  label,
  showPercentage = true,
  className = '',
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const clampedPercentage = Math.min(100, Math.max(0, percentage))

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-900">
              {clampedPercentage}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `Progression: ${clampedPercentage}%`}
      >
        <motion.div
          className={`h-full rounded-full ${getBarColor(clampedPercentage)}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${clampedPercentage}%` } : { width: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
