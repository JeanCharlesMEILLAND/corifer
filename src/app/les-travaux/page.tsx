'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { FileText, Folder, FlaskConical, CheckCircle2, Euro, Users, ArrowRight, ChevronRight } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'

// ========================================
// Animated Section Wrapper
// ========================================

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ========================================
// Animated Counter
// ========================================

function AnimatedCounter({ value, suffix = '', label, icon: Icon }: { value: number; suffix?: string; label: string; icon: React.ElementType }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <motion.p
        className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {value}{suffix}
      </motion.p>
      <p className="mt-2 text-sm md:text-base text-white/70 font-medium">{label}</p>
    </motion.div>
  )
}

// ========================================
// Sub-sections data
// ========================================

const SUB_SECTIONS = [
  {
    title: 'Documentation',
    description: 'Notes de position, rapports et ressources',
    icon: FileText,
    href: '/les-travaux/documentation',
    color: '#2563EB',
  },
  {
    title: 'Projets',
    description: 'Projets de recherche et d\'innovation',
    icon: Folder,
    href: '/les-travaux/projets',
    color: '#10B981',
  },
]

const STATS = [
  { value: 12, suffix: '', label: 'Projets en cours', icon: FlaskConical },
  { value: 8, suffix: '', label: 'Projets terminés', icon: CheckCircle2 },
  { value: 42, suffix: 'M\u20AC', label: 'Budget total mobilisé', icon: Euro },
  { value: 65, suffix: '', label: 'Partenaires impliqués', icon: Users },
]

// ========================================
// Page Component
// ========================================

export default function LesTravauxPage() {
  return (
    <>
      {/* ============ Hero - Light gray with stats overlay ============ */}
      <section className="relative bg-[#F9FAFB] border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-14 md:pt-20 pb-28 md:pb-36">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Fil d'Ariane"
            className="mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
              <li>
                <Link href="/" className="hover:text-[#0F1B3D] transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li className="text-[#0F1B3D] font-medium" aria-current="page">
                Les travaux
              </li>
            </ol>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F1B3D] tracking-tight leading-tight">
              Les <span className="text-[#2563EB]">travaux</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-2xl">
              Documentation, projets de recherche et résultats
            </p>
          </motion.div>
        </div>

        {/* Stats cards overlapping bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { value: '12', label: 'Projets en cours', icon: FlaskConical },
                { value: '8', label: 'Projets terminés', icon: CheckCircle2 },
                { value: '42M\u20AC', label: 'Budget mobilisé', icon: Euro },
                { value: '65', label: 'Partenaires', icon: Users },
              ].map((stat) => {
                const StatIcon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 text-center"
                  >
                    <StatIcon className="w-5 h-5 text-[#2563EB] mx-auto mb-2" />
                    <p className="text-2xl md:text-3xl font-extrabold text-[#0F1B3D] tracking-tight">{stat.value}</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spacer for overlapping stats cards */}
      <div className="h-20 md:h-24 bg-white" />

      {/* ============ Internal Navigation Cards ============ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <SectionTitle
              title="Explorer nos travaux"
              subtitle="Accédez à l'ensemble de la documentation et des projets de recherche et d'innovation pilotés par le CORIFER"
              centered
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            {SUB_SECTIONS.map((section, i) => {
              const Icon = section.icon
              return (
                <AnimatedSection key={section.title} delay={0.1 + i * 0.1}>
                  <Link
                    href={section.href}
                    className="group relative block bg-white rounded-2xl border border-gray-200 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
                  >
                    {/* Colored top border */}
                    <div
                      className="h-1.5 w-full"
                      style={{ backgroundColor: section.color }}
                    />

                    <div className="p-8 md:p-10 flex flex-col items-center text-center">
                      {/* Icon container */}
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300"
                        style={{ backgroundColor: `${section.color}10` }}
                      >
                        <Icon
                          className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: section.color }}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-[#0F1B3D] mb-3 group-hover:text-[#2563EB] transition-colors">
                        {section.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {section.description}
                      </p>

                      {/* Link indicator */}
                      <span
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                        style={{ color: section.color }}
                      >
                        Accéder
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ Stats Section ============ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#0F1B3D] to-[#1a3068] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="w-12 h-1 bg-[#60A5FA] rounded-full mb-4 mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Les travaux en chiffres
              </h2>
              <p className="mt-3 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                L&apos;activité de recherche et d&apos;innovation coordonnée par le CORIFER
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={0.1 + i * 0.08}>
                <AnimatedCounter {...stat} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
