'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ChevronRight, Clock, CalendarDays, Euro, Award, Users,
  FileText, Download, ExternalLink, Mail, Play, Image as ImageIcon,
  Leaf, Shield, TrendingUp, Briefcase, ArrowRight, Tag, CheckCircle2,
  Target, Lightbulb, Rocket, FlaskConical,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { STRATEGIC_AXES } from '@/lib/constants'

// ========================================
// Types
// ========================================

type ProjectDetail = {
  slug: string
  acronym: string
  title: string
  axisId: string
  trl: number
  trlLabel: string
  status: 'en-cours' | 'termine'
  progress: number
  startDate: string
  endDate: string
  duration: string
  budgetTotal: string
  budgetCorifer: string
  fundingDevices: { name: string; detail: string }[]
  summary: string
  objectives: string[]
  keywords: string[]
  lead: { name: string; org: string }
  partners: { name: string; type: string }[]
  progressSummary: string
  deliverables: { title: string; type: string }[]
  publications: { title: string; venue: string }[]
  barriers: string[]
  benefits: { icon: 'ecology' | 'safety' | 'competitiveness' | 'jobs'; text: string }[]
  indicators: { label: string; value: string }[]
  contact: { name: string; email: string; role: string }
  externalLinks: { label: string; url: string }[]
}

// ========================================
// Mock Data
// ========================================

const PROJECT_DATA: Record<string, ProjectDetail> = {
  draisy: {
    slug: 'draisy',
    acronym: 'DRAISY',
    title: 'Train autonome urbain',
    axisId: 'trains-intelligents',
    trl: 6,
    trlLabel: 'Prototype en environnement pertinent',
    status: 'en-cours',
    progress: 65,
    startDate: 'Janvier 2023',
    endDate: 'Décembre 2025',
    duration: '36 mois',
    budgetTotal: '4 200 k\u20AC',
    budgetCorifer: '1 260 k\u20AC',
    fundingDevices: [
      { name: 'France 2030', detail: 'i-Démo' },
      { name: 'CORIFER AMI', detail: 'AMI CORIFER 2023' },
    ],
    summary: 'Le projet DRAISY vise à développer et valider une solution complète de train autonome pour les liaisons urbaines et périurbaines. Il combine intelligence artificielle embarquée, capteurs de perception avancés et systèmes de décision temps réel pour atteindre un niveau d\'autonomie GOA 3/4 sur des lignes dédiées.',
    objectives: [
      'Développer un système de perception multi-capteurs (LiDAR, caméras, radar) pour la détection d\'obstacles en milieu ferroviaire urbain',
      'Concevoir une architecture de décision temps réel certifiable selon les normes CENELEC (EN 50128/50129)',
      'Valider le système sur un démonstrateur à échelle 1 en conditions réelles sur une ligne test dédiée',
      'Préparer le cadre réglementaire et normatif pour l\'homologation de trains autonomes en France',
    ],
    keywords: ['Automatisation', 'Intelligence artificielle', 'GOA 3/4', 'Perception', 'Sécurité ferroviaire'],
    lead: { name: 'Alstom Transport', org: 'Alstom' },
    partners: [
      { name: 'Alstom Transport', type: 'Industriel' },
      { name: 'SNCF Voyageurs', type: 'Opérateur' },
      { name: 'IRT Railenium', type: 'Recherche' },
      { name: 'INRIA', type: 'Recherche' },
      { name: 'Université Gustave Eiffel', type: 'Académique' },
      { name: 'Thales', type: 'Industriel' },
    ],
    progressSummary: 'Le projet a atteint les jalons clés des phases 1 et 2 : conception système validée, développement logiciel de perception opérationnel, et premiers tests sur voie d\'essai. La phase 3 (validation terrain) est en cours avec des essais nocturnes sur la ligne pilote.',
    deliverables: [
      { title: 'D1.3 - Spécification système de perception', type: 'PDF' },
      { title: 'D2.1 - Architecture logicielle embarquée', type: 'PDF' },
      { title: 'D2.4 - Rapport de tests unitaires', type: 'PDF' },
      { title: 'D3.1 - Plan d\'essais terrain (en cours)', type: 'PDF' },
    ],
    publications: [
      { title: 'Autonomous Train Perception in Urban Environments', venue: 'Transport Research Arena 2024' },
      { title: 'Safety-Critical AI for Railway Automation', venue: 'IEEE ITSC 2023' },
    ],
    barriers: [
      'Certification de l\'IA embarquée selon les normes de sécurité ferroviaire CENELEC SIL 4',
      'Détection fiable d\'obstacles en conditions dégradées (pluie, brouillard, nuit)',
      'Temps de réaction du système compatible avec les distances de freinage en milieu urbain',
      'Intégration avec les systèmes de signalisation existants (ERTMS, KVB)',
    ],
    benefits: [
      { icon: 'ecology', text: 'Réduction de 30% de la consommation énergétique grâce à l\'éco-conduite automatisée' },
      { icon: 'safety', text: 'Amélioration de la sécurité : suppression des erreurs humaines de conduite' },
      { icon: 'competitiveness', text: 'Augmentation de 15% de la capacité réseau par optimisation des intervalles' },
      { icon: 'jobs', text: 'Création de 200+ emplois qualifiés dans la filière IA ferroviaire en France' },
    ],
    indicators: [
      { label: 'Consommation énergétique', value: '-30% CO\u2082' },
      { label: 'Capacité réseau', value: '+15%' },
      { label: 'Ponctualité', value: '+8% estimé' },
      { label: 'Sécurité', value: 'SIL 4 visé' },
    ],
    contact: {
      name: 'Dr. Marie Dupont',
      email: 'marie.dupont@alstom.com',
      role: 'Chef de projet DRAISY',
    },
    externalLinks: [
      { label: 'Page projet Alstom', url: '#' },
      { label: 'IRT Railenium', url: '#' },
      { label: 'Programme France 2030', url: '#' },
    ],
  },
  hydrail: {
    slug: 'hydrail',
    acronym: 'HYDRAIL',
    title: 'Propulsion hydrogène régional',
    axisId: 'decarbonation',
    trl: 5,
    trlLabel: 'Validation en environnement pertinent',
    status: 'en-cours',
    progress: 45,
    startDate: 'Mars 2023',
    endDate: 'Mars 2026',
    duration: '36 mois',
    budgetTotal: '8 500 k\u20AC',
    budgetCorifer: '2 550 k\u20AC',
    fundingDevices: [
      { name: 'ADEME', detail: 'Appel à projets Hydrogène' },
    ],
    summary: 'HYDRAIL développe un système de propulsion hydrogène intégré pour les autorails régionaux, visant le remplacement des motorisations diesel sur les lignes non électrifiées. Le projet couvre la pile à combustible, le stockage embarqué et l\'intégration véhicule.',
    objectives: [
      'Développer une pile à combustible haute puissance (400 kW) adaptée aux contraintes ferroviaires',
      'Concevoir un système de stockage hydrogène embarqué sécurisé et certifiable',
      'Intégrer la chaîne de traction complète sur un prototype d\'autorail régional existant',
      'Valider l\'autonomie (600 km) et la disponibilité en conditions d\'exploitation réelles',
    ],
    keywords: ['Hydrogène', 'Pile à combustible', 'Décarbonation', 'Autorail', 'Traction'],
    lead: { name: 'CAF France', org: 'CAF' },
    partners: [
      { name: 'CAF France', type: 'Industriel' },
      { name: 'Air Liquide', type: 'Industriel' },
      { name: 'CEA', type: 'Recherche' },
      { name: 'Région Occitanie', type: 'Collectivité' },
    ],
    progressSummary: 'La pile à combustible prototype a été livrée et testée en banc d\'essai. L\'intégration véhicule est en cours de préparation. Les premiers essais sur voie sont prévus pour le T2 2025.',
    deliverables: [
      { title: 'D1.1 - Cahier des charges PAC ferroviaire', type: 'PDF' },
      { title: 'D2.1 - Rapport de tests banc PAC', type: 'PDF' },
    ],
    publications: [
      { title: 'Hydrogen Fuel Cells for Regional Rail: Challenges and Opportunities', venue: 'World Hydrogen Summit 2024' },
    ],
    barriers: [
      'Durabilité de la pile à combustible sur 30 000+ heures d\'exploitation',
      'Stockage hydrogène haute pression (700 bar) compatible avec les normes ferroviaires',
      'Coût du kWh hydrogène vs alternatives (batteries, biocarburants)',
    ],
    benefits: [
      { icon: 'ecology', text: 'Élimination totale des émissions directes CO\u2082 en exploitation' },
      { icon: 'safety', text: 'Réduction du bruit de 40% par rapport au diesel' },
      { icon: 'competitiveness', text: 'Solution compétitive pour les 5 000 km de lignes non électrifiées en France' },
      { icon: 'jobs', text: 'Structuration de la filière hydrogène ferroviaire française' },
    ],
    indicators: [
      { label: 'Émissions CO\u2082', value: '-100%' },
      { label: 'Autonomie visée', value: '600 km' },
      { label: 'Bruit', value: '-40%' },
      { label: 'Coût maintenance', value: '-25% estimé' },
    ],
    contact: {
      name: 'Ing. Pierre Martin',
      email: 'pierre.martin@caf.net',
      role: 'Chef de projet HYDRAIL',
    },
    externalLinks: [
      { label: 'Page projet CAF', url: '#' },
      { label: 'ADEME - Hydrogène', url: '#' },
    ],
  },
}

// Generate fallback data for unknown slugs
function getProjectData(slug: string): ProjectDetail {
  if (PROJECT_DATA[slug]) return PROJECT_DATA[slug]

  return {
    slug,
    acronym: slug.toUpperCase(),
    title: 'Projet de recherche et d\'innovation',
    axisId: 'trains-intelligents',
    trl: 4,
    trlLabel: 'Validation en laboratoire',
    status: 'en-cours',
    progress: 40,
    startDate: 'Janvier 2024',
    endDate: 'Décembre 2026',
    duration: '36 mois',
    budgetTotal: '3 000 k\u20AC',
    budgetCorifer: '900 k\u20AC',
    fundingDevices: [{ name: 'France 2030', detail: 'i-Démo' }],
    summary: 'Ce projet de recherche et d\'innovation vise à développer des solutions technologiques avancées pour le secteur ferroviaire français, dans le cadre de la feuille de route CORIFER 2023-2030.',
    objectives: [
      'Développer des solutions technologiques innovantes pour le secteur ferroviaire',
      'Valider les résultats par des démonstrateurs en conditions réelles',
      'Préparer le transfert industriel et l\'exploitation commerciale',
    ],
    keywords: ['Innovation', 'Ferroviaire', 'R&I'],
    lead: { name: 'Porteur du projet', org: 'Organisation' },
    partners: [
      { name: 'Partenaire industriel', type: 'Industriel' },
      { name: 'Laboratoire de recherche', type: 'Recherche' },
    ],
    progressSummary: 'Le projet est en cours de développement. Les résultats intermédiaires sont en cours de validation.',
    deliverables: [
      { title: 'Livrable 1 - Spécifications', type: 'PDF' },
    ],
    publications: [],
    barriers: [
      'Défis techniques à relever pour atteindre les objectifs du projet',
    ],
    benefits: [
      { icon: 'ecology', text: 'Contribution à la décarbonation du transport ferroviaire' },
      { icon: 'competitiveness', text: 'Renforcement de la compétitivité de la filière' },
    ],
    indicators: [
      { label: 'Indicateur principal', value: 'En cours de mesure' },
    ],
    contact: {
      name: 'Contact projet',
      email: 'contact@corifer.fr',
      role: 'Chef de projet',
    },
    externalLinks: [],
  }
}

// ========================================
// Helpers
// ========================================

function getAxisById(id: string) {
  return STRATEGIC_AXES.find(a => a.id === id)
}

const BENEFIT_ICONS = {
  ecology: Leaf,
  safety: Shield,
  competitiveness: TrendingUp,
  jobs: Briefcase,
}

const BENEFIT_COLORS = {
  ecology: '#10B981',
  safety: '#2563EB',
  competitiveness: '#8B5CF6',
  jobs: '#F59E0B',
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
// Client Component
// ========================================

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const project = getProjectData(slug)
  const axis = getAxisById(project.axisId)

  return (
    <>
      {/* ============ Header Block ============ */}
      <section className="relative overflow-hidden">
        <div
          className="relative h-[340px] md:h-[420px]"
          style={{
            background: `linear-gradient(135deg, ${axis?.color || '#2563EB'}20 0%, #0F1B3D 60%, ${axis?.color || '#2563EB'}30 100%)`,
          }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
              style={{ background: axis?.color || '#2563EB' }}
            />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
            <motion.nav
              aria-label="Fil d'Ariane"
              className="mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ol className="flex items-center gap-2 text-sm text-white/80" style={{ color: '#D1D5DB' }}>
                <li><Link href="/" className="hover:text-white transition-colors" style={{ color: '#D1D5DB' }}>Accueil</Link></li>
                <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
                <li><Link href="/les-travaux" className="hover:text-white transition-colors" style={{ color: '#D1D5DB' }}>Les travaux</Link></li>
                <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
                <li><Link href="/les-travaux/projets" className="hover:text-white transition-colors" style={{ color: '#D1D5DB' }}>Projets</Link></li>
                <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
                <li className="text-white font-medium" style={{ color: '#ffffff' }} aria-current="page">{project.acronym}</li>
              </ol>
            </motion.nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F1B3D] tracking-tight leading-tight">
                  {project.acronym}
                  <span className="text-gray-500 font-normal"> – </span>
                  <span className="text-gray-600 font-bold">{project.title}</span>
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <span
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: axis?.color || '#2563EB' }}
                  >
                    {axis?.name || project.axisId}
                  </span>
                  <Badge variant="info" size="md">
                    TRL {project.trl} – {project.trlLabel}
                  </Badge>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Bloc 1 - Infos clés ============ */}
      <section className="py-10 md:py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500" style={{ color: '#6B7280' }}>Statut</span>
                <Badge variant={project.status === 'en-cours' ? 'success' : 'default'} size="md" className="self-start">
                  {project.status === 'en-cours' ? 'En cours' : 'Terminé'}
                </Badge>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500" style={{ color: '#6B7280' }}>TRL actuel</span>
                <Badge variant="info" size="md" className="self-start">TRL {project.trl}</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500" style={{ color: '#6B7280' }}>Lancement</span>
                <div className="flex items-center gap-2 text-sm font-medium text-[#0F1B3D]">
                  <CalendarDays className="w-4 h-4 text-gray-500" />{project.startDate}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500" style={{ color: '#6B7280' }}>Fin prévue</span>
                <div className="flex items-center gap-2 text-sm font-medium text-[#0F1B3D]">
                  <CalendarDays className="w-4 h-4 text-gray-500" />{project.endDate}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <ProgressBar percentage={project.progress} label="Avancement global" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <span className="text-xs text-gray-600">Durée prévue</span>
                  <p className="text-sm font-semibold text-[#0F1B3D]">{project.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Euro className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-xs text-gray-600">Budget total</span>
                  <p className="text-sm font-semibold text-[#0F1B3D]">
                    {project.budgetTotal}
                    <span className="text-xs text-gray-500 font-normal ml-1">(dont {project.budgetCorifer} soutenus par CORIFER)</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-xs text-gray-600">Financement</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.fundingDevices.map(fd => (
                      <Badge key={fd.name} variant="warning" size="sm">{fd.name} – {fd.detail}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ Bloc 2 - Description ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B3D]">Description du projet</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">{project.summary}</p>
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Objectifs détaillés</h3>
              <ul className="space-y-3 mb-8">
                {project.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.keywords.map(kw => (
                  <button key={kw} type="button" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-colors cursor-pointer">
                    <Tag className="w-3.5 h-3.5" />#{kw}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ Bloc 3 - Porteur & Partenaires ============ */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B3D]">Porteur & Partenaires</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-xl border-2 border-[#2563EB]/20 shadow-sm p-6 mb-8 max-w-md">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#2563EB]">{project.lead.org.substring(0, 2).toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">Porteur du projet</span>
                  <h3 className="text-lg font-bold text-[#0F1B3D]">{project.lead.name}</h3>
                  <p className="text-sm text-gray-600">{project.lead.org}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Consortium</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {project.partners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-[#2563EB]/20 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                    <span className="text-sm font-bold text-gray-500">{partner.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#0F1B3D] leading-snug mb-1">{partner.name}</h4>
                  <span className="text-xs text-gray-500">{partner.type}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ Bloc 4 - Avancement & Résultats ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B3D]">Avancement & Résultats</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AnimatedSection delay={0.1}>
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Synthèse d&apos;avancement</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{project.progressSummary}</p>
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Livrables</h3>
              <div className="space-y-3">
                {project.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-[#2563EB]/20 transition-colors group cursor-pointer">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-sm text-gray-700 flex-1">{d.title}</span>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-[#2563EB] transition-colors" />
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Publications & Communications</h3>
              {project.publications.length > 0 ? (
                <div className="space-y-4">
                  {project.publications.map((pub, i) => (
                    <div key={i} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                      <h4 className="text-sm font-semibold text-[#0F1B3D] mb-1 leading-snug">{pub.title}</h4>
                      <p className="text-xs text-gray-700 italic">{pub.venue}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 text-center">
                  <p className="text-sm text-gray-500">Aucune publication à ce stade</p>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ Bloc 5 - Innovations & Impact ============ */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B3D]">Innovations & Impact</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AnimatedSection delay={0.1}>
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Verrous technologiques levés</h3>
              <div className="space-y-3">
                {project.barriers.map((barrier, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                    <Rocket className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{barrier}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Retombées attendues / obtenues</h3>
              <div className="space-y-3">
                {project.benefits.map((benefit, i) => {
                  const BenefitIcon = BENEFIT_ICONS[benefit.icon]
                  const color = BENEFIT_COLORS[benefit.icon]
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                        <BenefitIcon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">{benefit.text}</span>
                    </div>
                  )
                })}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-6 text-center">Indicateurs clés</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.indicators.map((ind, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white rounded-xl border border-gray-200 p-5 text-center"
                  >
                    <p className="text-2xl md:text-3xl font-extrabold text-[#2563EB] tracking-tight">{ind.value}</p>
                    <p className="mt-1 text-xs text-gray-700 font-medium">{ind.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ Bloc 6 - Pour aller plus loin ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B3D]">Pour aller plus loin</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <AnimatedSection delay={0.1}>
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Contact du projet</h3>
              <div className="bg-gradient-to-br from-[#0F1B3D] to-[#1a3068] rounded-xl p-6 text-white">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold" style={{ color: '#ffffff' }}>{project.contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                </div>
                <h4 className="text-lg font-semibold" style={{ color: '#ffffff' }}>{project.contact.name}</h4>
                <p className="text-sm text-white/80 mb-4" style={{ color: '#D1D5DB' }}>{project.contact.role}</p>
                <a href={`mailto:${project.contact.email}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:text-white transition-colors" style={{ color: '#93C5FD' }}>
                  <Mail className="w-4 h-4" />{project.contact.email}
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Liens externes</h3>
              {project.externalLinks.length > 0 ? (
                <div className="space-y-3">
                  {project.externalLinks.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-[#2563EB]/30 hover:bg-blue-50/30 transition-all group">
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#2563EB] transition-colors" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#2563EB] transition-colors">{link.label}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 text-center">
                  <p className="text-sm text-gray-500">Aucun lien externe disponible</p>
                </div>
              )}
              <div className="mt-6">
                <Button href="/les-travaux/projets" variant="outline" size="sm" className="gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" />Retour aux projets
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h3 className="text-lg font-semibold text-[#0F1B3D] mb-4">Médiathèque</h3>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="aspect-square rounded-xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-[#2563EB]/20 hover:bg-blue-50/30 transition-all cursor-pointer group">
                    {item <= 2 ? (
                      <ImageIcon className="w-6 h-6 text-gray-300 group-hover:text-[#2563EB]/40 transition-colors" />
                    ) : (
                      <Play className="w-6 h-6 text-gray-300 group-hover:text-[#2563EB]/40 transition-colors" />
                    )}
                    <span className="text-xs text-gray-500">{item <= 2 ? 'Photo' : 'Vidéo'}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">Contenu multimédia à venir</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ CTA Section ============ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="relative bg-gradient-to-br from-[#0F1B3D] to-[#1a3068] rounded-2xl p-10 md:p-14 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ color: '#ffffff' }}>Vous souhaitez en savoir plus sur ce projet ?</h2>
                <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: '#D1D5DB' }}>
                  Contactez l&apos;équipe du CORIFER pour échanger sur le projet {project.acronym} ou découvrir comment participer à nos travaux de recherche et d&apos;innovation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button href="/contact" variant="primary" size="lg" className="bg-white !text-[#0F1B3D] hover:bg-blue-50">Nous contacter</Button>
                  <Button href="/les-travaux/projets" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">Voir tous les projets</Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
