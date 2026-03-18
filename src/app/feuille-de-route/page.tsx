'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Brain, Leaf, Building, Trophy, Download, ArrowRight, Target, Users, Lightbulb, TrendingUp } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { STRATEGIC_AXES } from '@/lib/constants'

// ========================================
// Data
// ========================================

const MILESTONES = [
  { year: '2023', label: 'Lancement de la feuille de route', description: 'Définition des axes stratégiques et mobilisation des acteurs de la filière' },
  { year: '2024', label: 'Premiers appels à projets', description: 'Lancement des AMI et appels à projets sur les 4 axes prioritaires' },
  { year: '2025', label: 'Projets pilotes', description: 'Démarrage des premiers démonstrateurs et projets collaboratifs' },
  { year: '2026', label: 'Premiers résultats', description: 'Évaluation des projets pilotes et capitalisation des retours d\'expérience' },
  { year: '2027', label: 'Déploiement industriel', description: 'Transfert technologique et industrialisation des solutions validées' },
  { year: '2028-2030', label: 'Passage à l\'échelle', description: 'Généralisation des innovations et rayonnement européen de la filière' },
]

const AXES_DETAILS = [
  {
    ...STRATEGIC_AXES[0],
    icon: Brain,
    description: 'Développer l\'autonomie, la connectivité et l\'IA embarquée pour des trains plus sûrs, plus performants et plus intelligents.',
    priorities: [
      'Train autonome et conduite assistée',
      'Maintenance prédictive par IA',
      'Déploiement ERTMS et signalisation avancée',
      'Cybersécurité des systèmes ferroviaires',
    ],
  },
  {
    ...STRATEGIC_AXES[1],
    icon: Leaf,
    description: 'Accélérer la transition énergétique du ferroviaire pour un transport décarboné et durable à horizon 2030.',
    priorities: [
      'Traction hydrogène et piles à combustible',
      'Batteries haute densité et recharge rapide',
      'Efficacité énergétique et récupération d\'énergie',
      'Éco-conception et cycle de vie des matériels',
    ],
  },
  {
    ...STRATEGIC_AXES[2],
    icon: Building,
    description: 'Moderniser et adapter les infrastructures ferroviaires pour répondre aux défis climatiques et aux nouveaux usages.',
    priorities: [
      'Voie intelligente et capteurs embarqués',
      'Supervision et jumeau numérique du réseau',
      'Résilience climatique des infrastructures',
      'BIM ferroviaire et modélisation 3D',
    ],
  },
  {
    ...STRATEGIC_AXES[3],
    icon: Trophy,
    description: 'Renforcer la compétitivité de la filière industrielle ferroviaire française sur les marchés nationaux et internationaux.',
    priorities: [
      'Industrie 4.0 et usines connectées',
      'Jumeaux numériques de production',
      'Nouveaux matériaux et procédés avancés',
      'Stratégie export et normalisation européenne',
    ],
  },
]

const KEY_OBJECTIVES = [
  { icon: Target, text: 'Structurer la R&I ferroviaire autour de 4 axes stratégiques prioritaires' },
  { icon: Lightbulb, text: 'Accélérer le transfert technologique entre recherche et industrie' },
  { icon: Users, text: 'Fédérer l\'ensemble des acteurs de la filière (industriels, opérateurs, académiques)' },
  { icon: TrendingUp, text: 'Positionner la France comme leader européen de l\'innovation ferroviaire' },
]

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
// Page Component
// ========================================

export default function FeuilleDeRoutePage() {
  return (
    <>
      {/* ============ Hero - Dark with diagonal stripes ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1B3D] via-[#162650] to-[#1a3068] py-24 md:py-32">
        {/* Diagonal CSS stripes pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 22px)',
          }}
          aria-hidden="true"
        />
        {/* Decorative glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Prominent 2023-2030 badge */}
            <motion.div
              className="inline-flex items-center gap-3 mb-6 px-6 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
              <span className="text-base font-bold text-white tracking-wide">Strategie 2023 &mdash; 2030</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              La feuille de route
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Stratégie nationale de recherche et d&apos;innovation ferroviaire, structurée autour de 4 axes pour positionner la France comme leader européen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ Section 1: Vision ============ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              title="Notre vision"
              subtitle="Une stratégie coordonnée pour transformer la filière ferroviaire française"
              centered
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-gray-600 leading-relaxed text-lg">
                La feuille de route 2023-2030 du CORIFER définit une stratégie coordonnée de recherche et d&apos;innovation
                pour l&apos;ensemble de la filière ferroviaire française. Élaborée en concertation avec les industriels,
                les opérateurs, les organismes de recherche et les pouvoirs publics, elle structure les priorités de R&amp;I
                autour de <strong className="text-[#0F1B3D]">4 axes stratégiques</strong> complémentaires, avec l&apos;ambition de faire du
                ferroviaire français un modèle d&apos;innovation en Europe.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {KEY_OBJECTIVES.map((obj, i) => (
              <AnimatedSection key={i} delay={0.15 + i * 0.08}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#2563EB]/20 hover:bg-blue-50/30 transition-colors duration-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                    <obj.icon className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                    {obj.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Section 2: Timeline ============ */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              title="Jalons clés"
              subtitle="Les grandes étapes de la feuille de route, du lancement au passage à l'échelle"
              centered
            />
          </AnimatedSection>

          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block mt-16">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563EB] via-[#10B981] to-[#8B5CF6]" />

              <div className="grid grid-cols-6 gap-4">
                {MILESTONES.map((milestone, i) => (
                  <AnimatedSection key={milestone.year} delay={0.1 + i * 0.1}>
                    <div className="relative flex flex-col items-center text-center">
                      {/* Dot on the line */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-white border-4 border-[#2563EB] flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold text-[#0F1B3D]">{milestone.year}</span>
                      </div>
                      <h3 className="mt-4 text-sm font-bold text-[#0F1B3D] leading-tight">
                        {milestone.label}
                      </h3>
                      <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/tablet vertical timeline */}
          <div className="lg:hidden mt-12">
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-[#2563EB] via-[#10B981] to-[#8B5CF6]" />

              <div className="space-y-8">
                {MILESTONES.map((milestone, i) => (
                  <AnimatedSection key={milestone.year} delay={0.1 + i * 0.08}>
                    <div className="relative flex items-start gap-6 pl-0">
                      {/* Dot */}
                      <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-[#2563EB] flex items-center justify-center shadow-lg">
                        <span className="text-xs font-bold text-[#0F1B3D]">{milestone.year}</span>
                      </div>
                      <div className="pt-2">
                        <h3 className="text-base font-bold text-[#0F1B3D]">{milestone.label}</h3>
                        <p className="mt-1 text-sm text-gray-500 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Section 3: 4 Strategic Axes ============ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              title="Les 4 axes stratégiques"
              subtitle="Chaque axe structure les priorités de recherche et d'innovation de la filière ferroviaire"
              centered
            />
          </AnimatedSection>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {AXES_DETAILS.map((axis, i) => {
              const Icon = axis.icon
              return (
                <AnimatedSection key={axis.id} delay={0.1 + i * 0.1}>
                  <div
                    className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 h-full flex flex-col"
                  >
                    {/* Colored top border */}
                    <div
                      className="h-1.5 w-full"
                      style={{ backgroundColor: axis.color }}
                    />

                    <div className="p-7 flex flex-col flex-1">
                      {/* Header with icon */}
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${axis.color}15` }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: axis.color }}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-[#0F1B3D]">
                          {axis.name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-5">
                        {axis.description}
                      </p>

                      {/* Priorities */}
                      <div className="mb-6 flex-1">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                          Priorités
                        </h4>
                        <ul className="space-y-2.5">
                          {axis.priorities.map((priority, j) => (
                            <li key={j} className="flex items-start gap-2.5">
                              <div
                                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                                style={{ backgroundColor: axis.color }}
                              />
                              <span className="text-sm text-gray-700">{priority}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Link */}
                      <Link
                        href={`/les-travaux/projets?axe=${axis.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3"
                        style={{ color: axis.color }}
                      >
                        Voir les projets
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ Section 4: Download CTA ============ */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative bg-gradient-to-br from-[#0F1B3D] to-[#1a3068] rounded-2xl p-10 md:p-14 text-center overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden="true" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Télécharger la feuille de route complète
                </h2>
                <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                  Accédez au document complet de la stratégie nationale de recherche et d&apos;innovation ferroviaire 2023-2030, incluant les fiches détaillées de chaque axe.
                </p>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white/70 rounded-xl text-sm font-medium cursor-default">
                  <Download className="w-5 h-5" />
                  PDF bient&ocirc;t disponible
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
