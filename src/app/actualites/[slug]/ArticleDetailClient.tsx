'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export type ArticleDetailData = {
  title: string
  excerpt: string
  content: string
  date: string
  categoryLabel: string
  category: 'evenements' | 'annonces' | 'articles'
  image?: string
}

function categoryBadgeVariant(cat: string): 'info' | 'purple' | 'success' {
  if (cat === 'evenements') return 'info'
  if (cat === 'annonces') return 'purple'
  return 'success'
}

export default function ArticleDetailClient({ article }: { article: ArticleDetailData }) {
  return (
    <>
      {/* Hero with image */}
      <section className="relative overflow-hidden" style={{ minHeight: '340px' }}>
        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(15, 27, 61, 0.75)' }} />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 pb-16 flex flex-col justify-end" style={{ minHeight: '340px' }}>
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Fil d'Ariane"
            className="mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ol className="flex items-center gap-2 text-sm" style={{ color: '#D1D5DB' }}>
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
              <li><Link href="/actualites" className="hover:text-white transition-colors">Actualites</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
              <li style={{ color: '#ffffff' }} className="font-medium">{article.title.substring(0, 40)}...</li>
            </ol>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={categoryBadgeVariant(article.category)} size="md">
                {article.categoryLabel}
              </Badge>
              <span className="flex items-center gap-1.5 text-sm" style={{ color: '#D1D5DB' }}>
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight" style={{ color: '#ffffff' }}>
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Excerpt */}
            <p className="text-lg font-medium leading-relaxed mb-8 border-l-4 pl-6" style={{ color: '#111827', borderColor: '#2563EB' }}>
              {article.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(l => l.startsWith('- '))
                  return (
                    <ul key={i} className="space-y-2 mb-6 list-none pl-0">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <Tag className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#2563EB' }} />
                          <span style={{ color: '#374151' }}>{item.replace('- ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={i} className="mb-6 leading-relaxed text-base" style={{ color: '#374151' }}>
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </motion.div>

          {/* Back link */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all duration-200"
              style={{ color: '#2563EB' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux actualites
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
