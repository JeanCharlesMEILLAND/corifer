'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { MOTION_PRESETS } from '@/lib/constants'

// ========================================
// Types
// ========================================

export type ActualiteItem = {
  id: string
  title: string
  excerpt: string
  date: string
  year: number
  category: 'evenements' | 'annonces' | 'articles'
  categoryLabel: string
  gradientFrom: string
  gradientTo: string
  image?: string
  slug: string
}

type ActualitesClientProps = {
  articles: ActualiteItem[]
  counts: { evenements: number; annonces: number; articles: number }
}

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
// Actualites Client Component
// ========================================

export default function ActualitesClient({ articles, counts }: ActualitesClientProps) {
  const [activeTab, setActiveTab] = useState('evenements')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Derive the available years from the articles data
  const years = useMemo(() => {
    const uniqueYears = [...new Set(articles.map((a) => a.year))]
    return uniqueYears.sort((a, b) => b - a)
  }, [articles])

  const TABS = [
    { id: 'evenements', label: 'Evenements', count: counts.evenements },
    { id: 'annonces', label: 'Annonces', count: counts.annonces },
    { id: 'articles', label: 'Articles', count: counts.articles },
  ]

  const filteredItems = useMemo(() => {
    return articles.filter((item) => {
      const matchesTab = item.category === activeTab
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesYear = selectedYear === null || item.year === selectedYear
      return matchesTab && matchesSearch && matchesYear
    })
  }, [articles, activeTab, searchQuery, selectedYear])

  return (
    <>
      {/* ===== Hero Banner - White with left accent bar ===== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 md:py-20">
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
                className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl"
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
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
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
            {years.map((year) => (
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
                  : 'bg-white text-gray-600 hover:bg-gray-50'
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
                  : 'bg-white text-gray-600 hover:bg-gray-50'
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
                <p className="text-gray-600 text-lg">Aucun resultat trouve.</p>
                <p className="text-gray-600 text-sm mt-1">Essayez de modifier vos criteres de recherche.</p>
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
                    {/* Article Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(135deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
                          }}
                        />
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <time className="text-sm text-gray-600" dateTime={item.date}>
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
                    {/* Thumbnail */}
                    <div className="sm:w-56 shrink-0 aspect-[16/10] sm:aspect-auto relative overflow-hidden min-h-[120px]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(135deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
                          }}
                        />
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <time className="text-sm text-gray-600" dateTime={item.date}>
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
          className="mt-8 text-sm text-gray-500 text-center"
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
