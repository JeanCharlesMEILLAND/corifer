'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FileText, Download, Calendar, Filter, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

// ========================================
// Types
// ========================================

type DocumentCategory = 'Tous' | 'Rapports' | 'Notes de position' | 'Études' | 'Présentations'

type Document = {
  id: string
  title: string
  category: Exclude<DocumentCategory, 'Tous'>
  date: string
  description: string
  fileSize: string
}

// ========================================
// Data
// ========================================

const CATEGORIES: DocumentCategory[] = ['Tous', 'Rapports', 'Notes de position', 'Études', 'Présentations']

const CATEGORY_COLORS: Record<Exclude<DocumentCategory, 'Tous'>, { variant: 'info' | 'success' | 'warning' | 'purple' }> = {
  'Rapports': { variant: 'info' },
  'Notes de position': { variant: 'success' },
  'Études': { variant: 'warning' },
  'Présentations': { variant: 'purple' },
}

const DOCUMENTS: Document[] = [
  {
    id: 'rapport-annuel-2023',
    title: 'Rapport annuel CORIFER 2023',
    category: 'Rapports',
    date: '15 mars 2024',
    description: 'Bilan complet des activités du CORIFER pour l\'année 2023 : projets soutenus, résultats obtenus, perspectives et orientations stratégiques pour la filière ferroviaire.',
    fileSize: '4.2 Mo',
  },
  {
    id: 'note-hydrogene',
    title: 'Note de position - Hydrogène ferroviaire',
    category: 'Notes de position',
    date: '28 janvier 2024',
    description: 'Position du CORIFER sur le développement de la traction hydrogène dans le ferroviaire : état des lieux technologique, enjeux industriels et recommandations stratégiques.',
    fileSize: '1.8 Mo',
  },
  {
    id: 'etude-marche-europeen',
    title: 'Étude - Marché européen du ferroviaire',
    category: 'Études',
    date: '10 décembre 2023',
    description: 'Analyse approfondie du marché européen du ferroviaire : tendances, parts de marché, investissements en R&I et positionnement de la France face à la concurrence internationale.',
    fileSize: '6.1 Mo',
  },
  {
    id: 'bilan-france-2030',
    title: 'Bilan des projets France 2030',
    category: 'Rapports',
    date: '22 novembre 2023',
    description: 'Synthèse des projets ferroviaires financés dans le cadre de France 2030 : état d\'avancement, résultats intermédiaires, retombées industrielles et scientifiques.',
    fileSize: '3.5 Mo',
  },
  {
    id: 'guide-montage-projets',
    title: 'Guide - Montage de projets R&I',
    category: 'Études',
    date: '5 octobre 2023',
    description: 'Guide pratique à destination des porteurs de projets : méthodologie de montage, identification des financements, constitution des consortiums et bonnes pratiques.',
    fileSize: '2.3 Mo',
  },
  {
    id: 'presentation-copil-q4-2023',
    title: 'Présentation - Comité de pilotage Q4 2023',
    category: 'Présentations',
    date: '18 septembre 2023',
    description: 'Support de présentation du comité de pilotage du 4e trimestre 2023 : avancement des projets, points d\'attention, décisions et prochaines étapes.',
    fileSize: '8.7 Mo',
  },
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
// Document Card Component
// ========================================

function DocumentCard({ doc, index }: { doc: Document; index: number }) {
  const categoryStyle = CATEGORY_COLORS[doc.category]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-xl border border-gray-200 hover:border-[#2563EB]/30 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Icon header */}
      <div className="p-6 pb-0 flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-[#2563EB] text-[#2563EB] group-hover:text-white flex items-center justify-center transition-colors duration-300">
          <FileText className="w-6 h-6" />
        </div>
        <Badge variant={categoryStyle.variant} size="sm">
          {doc.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-[#0F1B3D] mb-2 leading-snug group-hover:text-[#2563EB] transition-colors">
          {doc.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-1.5 mb-3 text-sm text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{doc.date}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
          {doc.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400 font-medium">PDF - {doc.fileSize}</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400">
            <Download className="w-3.5 h-3.5" />
            Bient&ocirc;t disponible
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ========================================
// Page Component
// ========================================

export default function DocumentationPage() {
  const [activeCategory, setActiveCategory] = useState<DocumentCategory>('Tous')

  const filteredDocuments = activeCategory === 'Tous'
    ? DOCUMENTS
    : DOCUMENTS.filter(d => d.category === activeCategory)

  return (
    <>
      {/* ============ Hero - Minimal breadcrumb header ============ */}
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
                Documentation
              </li>
            </ol>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-[#0F1B3D] tracking-tight">
            Documentation
          </h1>
          <p className="mt-1.5 text-base text-gray-500">
            Notes de position, rapports, études et présentations du CORIFER
          </p>
        </div>
      </section>

      {/* ============ Filter & Documents ============ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Filter bar */}
          <AnimatedSection>
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mr-2">
                <Filter className="w-4 h-4" />
                Filtrer :
              </div>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Results count */}
          <AnimatedSection delay={0.1}>
            <p className="text-sm text-gray-500 mb-6">
              {filteredDocuments.length} document{filteredDocuments.length > 1 ? 's' : ''} trouvé{filteredDocuments.length > 1 ? 's' : ''}
            </p>
          </AnimatedSection>

          {/* Documents grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDocuments.map((doc, i) => (
                <DocumentCard key={doc.id} doc={doc} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredDocuments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center mt-4"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                <FileText className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium mb-1">Aucun document dans cette catégorie</p>
              <p className="text-sm text-gray-400">
                Essayez un autre filtre ou consultez l&apos;ensemble de la documentation.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
