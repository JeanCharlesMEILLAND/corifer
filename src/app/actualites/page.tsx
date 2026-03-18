'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { MOTION_PRESETS } from '@/lib/constants'

// ========================================
// Types
// ========================================

type ActualiteItem = {
  id: string
  title: string
  excerpt: string
  date: string
  year: number
  category: 'evenements' | 'annonces' | 'articles'
  categoryLabel: string
  gradientFrom: string
  gradientTo: string
  slug: string
}

// ========================================
// Placeholder Data
// ========================================

const ACTUALITES_DATA: ActualiteItem[] = [
  // Evenements
  {
    id: 'evt-1',
    title: 'Journee nationale de l\'innovation ferroviaire 2024',
    excerpt: 'Le CORIFER organise la premiere edition de la Journee nationale de l\'innovation ferroviaire, reunissant l\'ensemble des acteurs de la filiere autour des grands defis technologiques.',
    date: '15 mars 2024',
    year: 2024,
    category: 'evenements',
    categoryLabel: 'Evenement',
    gradientFrom: '#2563EB',
    gradientTo: '#06B6D4',
    slug: 'journee-nationale-innovation-ferroviaire-2024',
  },
  {
    id: 'evt-2',
    title: 'Salon InnoTrans 2024 - Berlin',
    excerpt: 'Retrouvez la delegation francaise au salon mondial du transport ferroviaire. Le CORIFER coordonne la presence des acteurs de la R&I francaise sur le pavillon France.',
    date: '24-27 septembre 2024',
    year: 2024,
    category: 'evenements',
    categoryLabel: 'Evenement',
    gradientFrom: '#1E40AF',
    gradientTo: '#2563EB',
    slug: 'salon-innotrans-2024-berlin',
  },
  {
    id: 'evt-3',
    title: 'Comite de pilotage CORIFER',
    excerpt: 'Reunion du comite de pilotage du CORIFER pour le suivi de la feuille de route strategique et l\'examen des projets en cours de la filiere ferroviaire.',
    date: '12 juin 2024',
    year: 2024,
    category: 'evenements',
    categoryLabel: 'Evenement',
    gradientFrom: '#0F1B3D',
    gradientTo: '#1E3A8A',
    slug: 'comite-pilotage-corifer-juin-2024',
  },
  {
    id: 'evt-4',
    title: 'Workshop Decarbonation ferroviaire',
    excerpt: 'Atelier de travail dedie aux solutions de decarbonation du materiel roulant : hydrogene, batteries, biocarburants et solutions hybrides pour le reseau non electrifie.',
    date: '8 novembre 2024',
    year: 2024,
    category: 'evenements',
    categoryLabel: 'Evenement',
    gradientFrom: '#10B981',
    gradientTo: '#06B6D4',
    slug: 'workshop-decarbonation-ferroviaire',
  },

  // Annonces
  {
    id: 'ann-1',
    title: 'Lancement de l\'AMI Trains autonomes 2024',
    excerpt: 'Le CORIFER lance un appel a manifestation d\'interet dedie au developpement des technologies d\'automatisation et de conduite autonome pour le transport ferroviaire.',
    date: '22 janvier 2024',
    year: 2024,
    category: 'annonces',
    categoryLabel: 'Annonce',
    gradientFrom: '#8B5CF6',
    gradientTo: '#2563EB',
    slug: 'lancement-ami-trains-autonomes-2024',
  },
  {
    id: 'ann-2',
    title: 'Resultats de l\'appel a projets France 2030',
    excerpt: 'Decouvrez les laureats de la vague 2 de l\'appel a projets France 2030 dedie a l\'innovation dans le secteur ferroviaire. 12 projets retenus pour un financement total de 45 M\u20ac.',
    date: '5 mars 2024',
    year: 2024,
    category: 'annonces',
    categoryLabel: 'Annonce',
    gradientFrom: '#F59E0B',
    gradientTo: '#EF4444',
    slug: 'resultats-aap-france-2030',
  },
  {
    id: 'ann-3',
    title: 'Nouveau partenariat avec Railenium',
    excerpt: 'Le CORIFER et l\'IRT Railenium signent une convention de partenariat pour renforcer la synergie entre recherche academique et besoins industriels de la filiere ferroviaire.',
    date: '18 avril 2024',
    year: 2024,
    category: 'annonces',
    categoryLabel: 'Annonce',
    gradientFrom: '#2563EB',
    gradientTo: '#10B981',
    slug: 'partenariat-railenium',
  },
  {
    id: 'ann-4',
    title: 'Publication de la feuille de route actualisee',
    excerpt: 'La feuille de route strategique R&I de la filiere ferroviaire a ete mise a jour pour integrer les nouveaux enjeux de cybersecurite et de souverainete numerique.',
    date: '10 septembre 2024',
    year: 2024,
    category: 'annonces',
    categoryLabel: 'Annonce',
    gradientFrom: '#0F1B3D',
    gradientTo: '#8B5CF6',
    slug: 'feuille-de-route-actualisee',
  },

  // Articles
  {
    id: 'art-1',
    title: 'L\'hydrogene dans le ferroviaire : etat des lieux',
    excerpt: 'Analyse complete des technologies hydrogene pour la traction ferroviaire : piles a combustible, stockage embarque, infrastructure de production et distribution.',
    date: '12 fevrier 2024',
    year: 2024,
    category: 'articles',
    categoryLabel: 'Article',
    gradientFrom: '#10B981',
    gradientTo: '#2563EB',
    slug: 'hydrogene-ferroviaire-etat-des-lieux',
  },
  {
    id: 'art-2',
    title: 'Intelligence artificielle et maintenance predictive',
    excerpt: 'Comment l\'IA transforme la maintenance du materiel roulant et de l\'infrastructure : capteurs IoT, jumeaux numeriques et algorithmes de prediction des defaillances.',
    date: '28 mars 2024',
    year: 2024,
    category: 'articles',
    categoryLabel: 'Article',
    gradientFrom: '#8B5CF6',
    gradientTo: '#06B6D4',
    slug: 'ia-maintenance-predictive',
  },
  {
    id: 'art-3',
    title: 'Vers un reseau ferroviaire 100% decarbone',
    excerpt: 'Panorama des solutions technologiques pour atteindre la neutralite carbone du transport ferroviaire a horizon 2050 : electrification, energies alternatives et efficacite energetique.',
    date: '15 mai 2024',
    year: 2024,
    category: 'articles',
    categoryLabel: 'Article',
    gradientFrom: '#06B6D4',
    gradientTo: '#10B981',
    slug: 'reseau-ferroviaire-decarbone',
  },
  {
    id: 'art-4',
    title: 'Les enjeux de l\'ERTMS en France',
    excerpt: 'Le deploiement du systeme europeen de gestion du trafic ferroviaire (ERTMS) en France : calendrier, defis techniques, interoperabilite et benefices attendus pour la filiere.',
    date: '3 juillet 2024',
    year: 2024,
    category: 'articles',
    categoryLabel: 'Article',
    gradientFrom: '#1E40AF',
    gradientTo: '#0F1B3D',
    slug: 'enjeux-ertms-france',
  },
]

const TABS = [
  { id: 'evenements', label: 'Evenements', count: 4 },
  { id: 'annonces', label: 'Annonces', count: 4 },
  { id: 'articles', label: 'Articles', count: 4 },
]

const YEARS = [2024, 2023, 2022]

// ========================================
// Badge variant per category
// ========================================

function categoryBadgeVariant(category: string): 'info' | 'purple' | 'success' {
  switch (category) {
    case 'evenements':
      return 'info'
    case 'annonces':
      return 'purple'
    case 'articles':
      return 'success'
    default:
      return 'info'
  }
}

// ========================================
// Actualites Page
// ========================================

export default function ActualitesPage() {
  const [activeTab, setActiveTab] = useState('evenements')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredItems = useMemo(() => {
    return ACTUALITES_DATA.filter((item) => {
      const matchesTab = item.category === activeTab
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesYear = selectedYear === null || item.year === selectedYear
      return matchesTab && matchesSearch && matchesYear
    })
  }, [activeTab, searchQuery, selectedYear])

  return (
    <>
      {/* ===== Hero Banner - White with left accent bar ===== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
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
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-[#0F1B3D] font-medium" aria-current="page">
                Actualites
              </li>
            </ol>
          </motion.nav>

          <div className="flex items-stretch gap-6">
            {/* Decorative vertical blue bar */}
            <motion.div
              className="hidden sm:block w-1.5 rounded-full flex-shrink-0"
              style={{ background: 'linear-gradient(180deg, #2563EB, #06B6D4)' }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />

            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F1B3D] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Actualites
              </motion.h1>

              <motion.p
                className="mt-3 text-lg md:text-xl text-gray-500 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Suivez les dernieres actualites du CORIFER : evenements, annonces institutionnelles et articles d&apos;analyse.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Tabs + Filters + Content ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs
            tabs={TABS}
            activeTab={activeTab}
            onChange={(tabId) => {
              setActiveTab(tabId)
              setSearchQuery('')
              setSelectedYear(null)
            }}
          />
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Rechercher une actualite..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow"
            />
          </div>

          {/* Year Filter */}
          <select
            value={selectedYear ?? ''}
            onChange={(e) =>
              setSelectedYear(e.target.value ? Number(e.target.value) : null)
            }
            className="px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent cursor-pointer"
            aria-label="Filtrer par annee"
          >
            <option value="">Toutes les annees</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden shrink-0 self-center sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-3 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              aria-label="Affichage en grille"
              aria-pressed={viewMode === 'grid'}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-3 transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              aria-label="Affichage en liste"
              aria-pressed={viewMode === 'list'}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="mt-8"
        >
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">Aucun resultat trouve.</p>
                <p className="text-gray-400 text-sm mt-1">Essayez de modifier vos criteres de recherche.</p>
              </motion.div>
            ) : viewMode === 'grid' ? (
              <motion.div
                key={`grid-${activeTab}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="initial"
                animate="animate"
                exit={{ opacity: 0 }}
                variants={{
                  animate: { transition: { staggerChildren: 0.08 } },
                }}
              >
                {filteredItems.map((item) => (
                  <motion.article
                    key={item.id}
                    variants={MOTION_PRESETS.staggerItem}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                  >
                    {/* Gradient Image Placeholder */}
                    <div
                      className="relative w-full aspect-[16/10] overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <time className="text-sm text-gray-500" dateTime={item.date}>
                          {item.date}
                        </time>
                        <Badge variant={categoryBadgeVariant(item.category)} size="sm">
                          {item.categoryLabel}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-semibold text-[#0F1B3D] leading-snug mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                        {item.excerpt}
                      </p>

                      <Link
                        href={`/actualites/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group/link"
                      >
                        Lire la suite
                        <svg
                          className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              /* List View */
              <motion.div
                key={`list-${activeTab}`}
                className="flex flex-col gap-4"
                initial="initial"
                animate="animate"
                exit={{ opacity: 0 }}
                variants={{
                  animate: { transition: { staggerChildren: 0.06 } },
                }}
              >
                {filteredItems.map((item) => (
                  <motion.article
                    key={item.id}
                    variants={MOTION_PRESETS.staggerItem}
                    className="group flex flex-col sm:flex-row bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                  >
                    {/* Gradient Thumbnail */}
                    <div
                      className="sm:w-56 shrink-0 aspect-[16/10] sm:aspect-auto"
                      style={{
                        background: `linear-gradient(135deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center opacity-20 min-h-[120px]">
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <time className="text-sm text-gray-500" dateTime={item.date}>
                          {item.date}
                        </time>
                        <Badge variant={categoryBadgeVariant(item.category)} size="sm">
                          {item.categoryLabel}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-semibold text-[#0F1B3D] leading-snug mb-2 group-hover:text-[#2563EB] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
                        {item.excerpt}
                      </p>

                      <Link
                        href={`/actualites/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group/link self-start"
                      >
                        Lire la suite
                        <svg
                          className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results count */}
        <motion.p
          className="mt-8 text-sm text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {filteredItems.length} resultat{filteredItems.length !== 1 ? 's' : ''} affiche{filteredItems.length !== 1 ? 's' : ''}
        </motion.p>
      </section>
    </>
  )
}
