'use client'

import { useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Search, Filter, ChevronRight, ChevronDown, LayoutGrid, Table,
  ArrowRight, ArrowUpDown, Download,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { STRATEGIC_AXES, FUNDING_DEVICES } from '@/lib/constants'

// ========================================
// Types
// ========================================

type ProjectStatus = 'en-cours' | 'termine'

type Project = {
  slug: string
  acronym: string
  title: string
  axisId: string
  trl: number
  status: ProjectStatus
  progress: number
  budget: string
  budgetValue: number
  fundingDevices: string[]
  partners: string[]
}

type ViewMode = 'grid' | 'table'
type StatusFilter = 'tous' | 'en-cours' | 'termine'

// ========================================
// Data
// ========================================

const PROJECTS: Project[] = [
  {
    slug: 'draisy',
    acronym: 'DRAISY',
    title: 'Train autonome urbain',
    axisId: 'trains-intelligents',
    trl: 6,
    status: 'en-cours',
    progress: 65,
    budget: '4,2 M\u20AC',
    budgetValue: 4200000,
    fundingDevices: ['France 2030'],
    partners: ['Alstom', 'SNCF Voyageurs', 'IRT Railenium', 'INRIA'],
  },
  {
    slug: 'hydrail',
    acronym: 'HYDRAIL',
    title: 'Propulsion hydrogène régional',
    axisId: 'decarbonation',
    trl: 5,
    status: 'en-cours',
    progress: 45,
    budget: '8,5 M\u20AC',
    budgetValue: 8500000,
    fundingDevices: ['ADEME'],
    partners: ['CAF', 'Air Liquide', 'CEA', 'Région Occitanie'],
  },
  {
    slug: 'smartrail',
    acronym: 'SMARTRAIL',
    title: 'Voie ferrée connectée',
    axisId: 'infrastructure',
    trl: 4,
    status: 'en-cours',
    progress: 30,
    budget: '3,1 M\u20AC',
    budgetValue: 3100000,
    fundingDevices: ['ANR'],
    partners: ['SNCF Réseau', 'Vossloh', 'Université Gustave Eiffel'],
  },
  {
    slug: 'greentrain',
    acronym: 'GREENTRAIN',
    title: 'Éco-conception du matériel roulant',
    axisId: 'decarbonation',
    trl: 7,
    status: 'termine',
    progress: 100,
    budget: '5,8 M\u20AC',
    budgetValue: 5800000,
    fundingDevices: ['France 2030'],
    partners: ['Alstom', 'Hutchinson', 'IFPEN', 'ADEME'],
  },
  {
    slug: 'cybersafe',
    acronym: 'CYBERSAFE',
    title: 'Cybersécurité ferroviaire',
    axisId: 'trains-intelligents',
    trl: 3,
    status: 'en-cours',
    progress: 20,
    budget: '2,4 M\u20AC',
    budgetValue: 2400000,
    fundingDevices: ['Bpifrance'],
    partners: ['Thales', 'ANSSI', 'Atos', 'Télécom Paris'],
  },
  {
    slug: 'digitrack',
    acronym: 'DIGITRACK',
    title: 'Jumeau numérique infrastructure',
    axisId: 'competitivite',
    trl: 5,
    status: 'en-cours',
    progress: 55,
    budget: '6,7 M\u20AC',
    budgetValue: 6700000,
    fundingDevices: ['CORIFER AMI'],
    partners: ['Egis', 'Dassault Systèmes', 'SNCF Réseau', 'ENPC'],
  },
]

// ========================================
// Helpers
// ========================================

function getAxisById(id: string) {
  return STRATEGIC_AXES.find(a => a.id === id)
}

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
// Project Card (Grid View)
// ========================================

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const axis = getAxisById(project.axisId)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-xl border border-gray-200 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Colored top border */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: axis?.color || '#2563EB' }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Title & Acronym */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#0F1B3D] group-hover:text-[#2563EB] transition-colors leading-snug">
            {project.acronym}
          </h3>
          <p className="text-sm text-gray-600 mt-0.5">{project.title}</p>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Axis badge */}
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: axis?.color || '#2563EB' }}
          >
            {axis?.name || project.axisId}
          </span>

          {/* TRL badge */}
          <Badge variant="info" size="sm">
            TRL {project.trl}
          </Badge>

          {/* Status badge */}
          <Badge
            variant={project.status === 'en-cours' ? 'success' : 'default'}
            size="sm"
          >
            {project.status === 'en-cours' ? 'En cours' : 'Terminé'}
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <ProgressBar
            percentage={project.progress}
            label="Avancement"
          />
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="text-gray-600">Budget :</span>
          <span className="font-semibold text-[#0F1B3D]">{project.budget}</span>
        </div>

        {/* Funding devices */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.fundingDevices.map(fd => (
            <Badge key={fd} variant="warning" size="sm">{fd}</Badge>
          ))}
        </div>

        {/* Partners */}
        <p className="text-xs text-gray-500 mb-5 flex-1">
          <span className="font-medium text-gray-600">Partenaires :</span>{' '}
          {project.partners.join(', ')}
        </p>

        {/* CTA */}
        <Link
          href={`/les-travaux/projets/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-all duration-200 group-hover:gap-3 mt-auto"
        >
          Voir la fiche
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  )
}

// ========================================
// Page Component
// ========================================

export default function ProjetsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [axisFilter, setAxisFilter] = useState<string>('tous')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('tous')
  const [fundingFilter, setFundingFilter] = useState<string>('tous')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // Filter projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matchesSearch =
          project.acronym.toLowerCase().includes(q) ||
          project.title.toLowerCase().includes(q) ||
          project.partners.some(p => p.toLowerCase().includes(q))
        if (!matchesSearch) return false
      }

      // Axis filter
      if (axisFilter !== 'tous' && project.axisId !== axisFilter) return false

      // Status filter
      if (statusFilter !== 'tous' && project.status !== statusFilter) return false

      // Funding filter
      if (fundingFilter !== 'tous' && !project.fundingDevices.includes(fundingFilter)) return false

      return true
    })
  }, [searchQuery, axisFilter, statusFilter, fundingFilter])

  return (
    <>
      {/* ============ Hero - Compact breadcrumb header, filter IS the hero ============ */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-10">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
              <li>
                <Link href="/" className="hover:text-[#0F1B3D] transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li>
                <Link href="/les-travaux" className="hover:text-[#0F1B3D] transition-colors">
                  Les travaux
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li className="text-[#0F1B3D] font-medium" aria-current="page">
                Projets
              </li>
            </ol>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-[#0F1B3D] tracking-tight">
            Projets de recherche et d&apos;innovation
          </h1>
          <p className="mt-1.5 text-base text-gray-600 max-w-2xl">
            Découvrez les projets soutenus et coordonnés par le CORIFER dans le cadre de la feuille de route 2023-2030
          </p>
        </div>
      </section>

      {/* ============ Filters & Projects ============ */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Filter bar */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-10">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-5">
                <Filter className="w-4 h-4" />
                Filtres
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative lg:col-span-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all"
                  />
                </div>

                {/* Axis filter */}
                <div className="relative">
                  <select
                    value={axisFilter}
                    onChange={(e) => setAxisFilter(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="tous">Tous les axes</option>
                    {STRATEGIC_AXES.map(axis => (
                      <option key={axis.id} value={axis.id}>{axis.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Status filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    className="w-full appearance-none px-4 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="tous">Tous les statuts</option>
                    <option value="en-cours">En cours</option>
                    <option value="termine">Terminé</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Funding filter */}
                <div className="relative">
                  <select
                    value={fundingFilter}
                    onChange={(e) => setFundingFilter(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="tous">Tous les financements</option>
                    {FUNDING_DEVICES.map(fd => (
                      <option key={fd} value={fd}>{fd}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View toggle */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-[#2563EB] shadow-sm'
                        : 'text-gray-600 hover:text-gray-700'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Grille
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === 'table'
                        ? 'bg-white text-[#2563EB] shadow-sm'
                        : 'text-gray-600 hover:text-gray-700'
                    }`}
                  >
                    <Table className="w-4 h-4" />
                    Tableau
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Results count + Export */}
          <AnimatedSection delay={0.1}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
              </p>
              {viewMode === 'table' && (
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Exporter
                </Button>
              )}
            </div>
          </AnimatedSection>

          {/* ======== Grid View ======== */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* ======== Table View ======== */}
          {viewMode === 'table' && (
            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">
                          <button type="button" className="inline-flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                            Projet
                            <ArrowUpDown className="w-3.5 h-3.5" />
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">
                          <button type="button" className="inline-flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                            Axe
                            <ArrowUpDown className="w-3.5 h-3.5" />
                          </button>
                        </th>
                        <th className="text-center px-4 py-3 font-semibold text-gray-700">
                          <button type="button" className="inline-flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                            TRL
                            <ArrowUpDown className="w-3.5 h-3.5" />
                          </button>
                        </th>
                        <th className="text-center px-4 py-3 font-semibold text-gray-700">
                          Statut
                        </th>
                        <th className="text-center px-4 py-3 font-semibold text-gray-700">
                          <button type="button" className="inline-flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                            Avancement
                            <ArrowUpDown className="w-3.5 h-3.5" />
                          </button>
                        </th>
                        <th className="text-right px-4 py-3 font-semibold text-gray-700">
                          <button type="button" className="inline-flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                            Budget
                            <ArrowUpDown className="w-3.5 h-3.5" />
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">
                          Financement
                        </th>
                        <th className="text-center px-4 py-3 font-semibold text-gray-700">
                          Fiche
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => {
                        const axis = getAxisById(project.axisId)
                        return (
                          <tr
                            key={project.slug}
                            className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div>
                                <span className="font-semibold text-[#0F1B3D]">{project.acronym}</span>
                                <p className="text-xs text-gray-600 mt-0.5">{project.title}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                                style={{ backgroundColor: axis?.color || '#2563EB' }}
                              >
                                {axis?.name || project.axisId}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Badge variant="info" size="sm">TRL {project.trl}</Badge>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Badge
                                variant={project.status === 'en-cours' ? 'success' : 'default'}
                                size="sm"
                              >
                                {project.status === 'en-cours' ? 'En cours' : 'Terminé'}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2 min-w-[120px]">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      project.progress === 100
                                        ? 'bg-emerald-500'
                                        : project.progress >= 50
                                        ? 'bg-[#2563EB]'
                                        : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${project.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs font-semibold text-gray-700 w-8 text-right">
                                  {project.progress}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-[#0F1B3D] whitespace-nowrap">
                              {project.budget}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {project.fundingDevices.map(fd => (
                                  <Badge key={fd} variant="warning" size="sm">{fd}</Badge>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Link
                                href={`/les-travaux/projets/${project.slug}`}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                              >
                                Voir
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center bg-white mt-4"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                <Search className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-1">Aucun projet correspondant</p>
              <p className="text-sm text-gray-600">
                Essayez de modifier vos filtres ou votre recherche.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
