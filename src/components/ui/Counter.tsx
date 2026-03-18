'use client'

import { useEffect, useRef } from 'react'
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  motion,
} from 'framer-motion'

type CounterProps = {
  target: number
  prefix?: string
  suffix?: string
  label: string
  duration?: number
  className?: string
}

export function Counter({
  target,
  prefix = '',
  suffix = '',
  label,
  duration = 2,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(motionValue, target, {
      duration,
      ease: 'easeOut',
    })

    return () => controls.stop()
  }, [isInView, motionValue, target, duration])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (value) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${value.toLocaleString('fr-FR')}${suffix}`
      }
    })

    return () => unsubscribe()
  }, [rounded, prefix, suffix])

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <span
        ref={displayRef}
        className="block text-3xl md:text-4xl font-bold text-[#2563EB] tabular-nums whitespace-nowrap"
        aria-label={`${prefix}${target.toLocaleString('fr-FR')}${suffix}`}
      >
        {prefix}0{suffix}
      </span>
      <span className="block mt-2 text-sm md:text-base text-gray-600 font-medium">
        {label}
      </span>
    </motion.div>
  )
}
