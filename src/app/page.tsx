'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react'
import { Counter } from '@/components/ui/Counter'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

// ========================================
// Placeholder news articles
// ========================================
const PLACEHOLDER_ARTICLES = [
  {
    id: 1,
    title: 'Lancement de l\'AMI « Trains Légers Innovants » 2025',
    excerpt:
      'Le CORIFER lance un nouvel appel à manifestation d\'intérêt dédié au développement de rames légères à faibles émissions pour les lignes régionales.',
    date: '12 mars 2026',
    category: 'Appel à projets',
    href: '/actualites/ami-trains-legers-2025',
  },
  {
    id: 2,
    title: 'Résultats du programme Hydrogène Ferroviaire : premiers essais concluants',
    excerpt:
      'Les résultats des premiers essais du prototype de train à hydrogène confirment les objectifs d\'autonomie et de performance.',
    date: '28 février 2026',
    category: 'Recherche',
    href: '/actualites/resultats-hydrogene-ferroviaire',
  },
  {
    id: 3,
    title: 'Forum CORIFER 2026 : rendez-vous le 15 avril à Paris',
    excerpt:
      'Le forum annuel réunira l\'ensemble des acteurs de l\'écosystème ferroviaire pour présenter les avancées des projets soutenus.',
    date: '15 février 2026',
    category: 'Événement',
    href: '/actualites/forum-corifer-2026',
  },
]

// ========================================
// Partner / Ecosystem names
// ========================================
const PARTNERS_ROW_1 = ['SNCF', 'Alstom', 'RATP', 'DGITM', 'ADEME', 'Bpifrance']
const PARTNERS_ROW_2 = ['Railenium', 'SNCF Réseau', 'Keolis', 'Transdev', 'Faiveley', 'DGE']

// ========================================
// Animation variants
// ========================================
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7 },
  },
}

// ========================================
// Homepage Component
// ========================================
export default function Home() {
  return (
    <>
      {/* ========================================
          SECTION 1 — Hero
          Light background, CORIFER identity, railway pattern
          ======================================== */}
      <section className="relative overflow-hidden bg-white min-h-[92vh] flex flex-col justify-center">
        {/* Subtle dot grid pattern background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Faint diagonal railway-track lines */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, transparent, transparent 40px, #0F1B3D 40px, #0F1B3D 41px, transparent 41px, transparent 48px, #0F1B3D 48px, #0F1B3D 49px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* CORIFER wordmark */}
            <motion.h1
              variants={fadeUp}
              className="font-[var(--font-plus-jakarta-sans)] text-6xl sm:text-7xl lg:text-[6.5rem] font-extrabold tracking-[-0.03em] text-[#0F1B3D] leading-none"
            >
              CORI
              <span className="bg-gradient-to-r from-[#2563EB] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                FER
              </span>
            </motion.h1>

            {/* Full name */}
            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg sm:text-xl text-[#0F1B3D]/70 font-medium tracking-wide max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Conseil d&apos;Orientation de la Recherche
              <br className="hidden sm:block" />
              {' '}et de l&apos;Innovation de la filière{' '}
              <span className="font-bold text-[#0F1B3D]">FER</span>roviaire
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="mt-8 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed font-normal"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Fédérer les acteurs, orienter la recherche et accélérer
              l&apos;innovation pour construire le ferroviaire de demain.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-5"
            >
              <Button href="/le-corifer" size="lg" variant="primary" className="shadow-lg shadow-[#2563EB]/25 text-base px-10 py-4">
                Découvrir le CORIFER
              </Button>
              <Button href="/les-travaux/projets" size="lg" variant="outline" className="text-base px-10 py-4">
                Voir les projets
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Wide photo banner strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full h-48 sm:h-56 md:h-72 lg:h-80 mt-auto"
        >
          <Image
            src="/images/hero-train.jpg"
            alt="Train à grande vitesse - Innovation ferroviaire"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B3D]/60 via-[#0F1B3D]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-transparent" />
          {/* Bottom gradient fade into next section */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F0F4F8] to-transparent" />
        </motion.div>
      </section>

      {/* ========================================
          SECTION 2 — Key Figures (floating card)
          Overlapping card sits between hero and quote
          ======================================== */}
      <section className="relative bg-[#F0F4F8] pt-0 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="-mt-16 relative z-20"
          >
            <div className="bg-white rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                {/* Counter 1 */}
                <div className="relative p-6 md:p-8">
                  <div className="absolute top-0 left-6 right-6 h-[3px] bg-[#2563EB] rounded-b-full" />
                  <Counter target={45} label="Projets soumis" />
                </div>
                {/* Counter 2 */}
                <div className="relative p-6 md:p-8">
                  <div className="absolute top-0 left-6 right-6 h-[3px] bg-[#10B981] rounded-b-full" />
                  <Counter target={28} label="Projets soutenus" />
                </div>
                {/* Counter 3 */}
                <div className="relative p-6 md:p-8">
                  <div className="absolute top-0 left-6 right-6 h-[3px] bg-[#F59E0B] rounded-b-full" />
                  <Counter target={150} suffix=" M€" label="Soutien de l'État" />
                </div>
                {/* Counter 4 */}
                <div className="relative p-6 md:p-8">
                  <div className="absolute top-0 left-6 right-6 h-[3px] bg-[#8B5CF6] rounded-b-full" />
                  <Counter target={12} label="Partenaires écosystème" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          SECTION 3 — Editorial Quote Block
          Asymmetric layout, president quote
          ======================================== */}
      <section className="bg-[#F0F4F8] pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
              {/* Large quotation mark */}
              <div className="flex-shrink-0" aria-hidden="true">
                <span
                  className="block text-[8rem] md:text-[10rem] leading-none font-serif text-[#2563EB]/15 select-none"
                  style={{ marginTop: '-2rem' }}
                >
                  &ldquo;
                </span>
              </div>
              {/* Quote text */}
              <div className="flex-1 min-w-0">
                <blockquote>
                  <p
                    className="text-xl sm:text-2xl md:text-[1.65rem] text-[#0F1B3D] font-medium italic leading-relaxed"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    Le CORIFER incarne la volonté collective de la filière ferroviaire
                    française de placer la recherche et l&apos;innovation au c&oelig;ur de sa
                    stratégie. Notre ambition : faire du ferroviaire le mode de
                    transport le plus innovant, le plus décarboné et le plus compétitif
                    d&apos;Europe.
                  </p>
                  <footer className="mt-8 flex items-center gap-4">
                    {/* Decorative avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-[#0F1B3D] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">LP</span>
                    </div>
                    <div>
                      <cite className="not-italic font-bold text-[#0F1B3D] text-base">
                        Lionel Pujol
                      </cite>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Chef de projet industrie ferroviaire, DGE
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          Railway-track decorative divider
          A unique CSS element: two parallel lines with cross-ties
          ======================================== */}
      <div className="relative bg-white h-12 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col gap-[6px] items-center">
          <div className="w-full h-[2px] bg-gray-200" />
          <div className="w-full h-[2px] bg-gray-200" />
        </div>
        {/* Cross ties */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 30px, #e5e7eb 30px, #e5e7eb 34px)',
          }}
        />
        {/* Center diamond */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#2563EB] rotate-45" />
      </div>

      {/* ========================================
          SECTION 4 — Discover (3 entry points)
          Staggered asymmetric layout
          ======================================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading - left aligned for editorial feel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
              Explorer
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F1B3D] tracking-tight">
              Nos missions
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-5 gap-5"
          >
            {/* Card 1 - La feuille de route (large, spans 3 cols) */}
            <motion.div variants={fadeUp} className="md:col-span-3">
              <Link
                href="/feuille-de-route"
                className="group block h-full bg-[#EFF6FF] hover:bg-[#DBEAFE] transition-colors duration-300 p-8 md:p-10 rounded-sm relative overflow-hidden"
              >
                {/* Timeline illustration (CSS drawn) */}
                <div className="absolute right-6 top-6 bottom-6 w-[2px] bg-[#2563EB]/10 hidden md:block" aria-hidden="true">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2563EB]/30" />
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2563EB]/50" />
                  <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2563EB]/70" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2563EB]" />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563EB]/70 mb-4 block">
                  Stratégie 2023 &mdash; 2030
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F1B3D] mb-3 leading-tight max-w-md">
                  La feuille de route
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-lg mb-8 text-[15px]">
                  Quatre axes stratégiques pour structurer et orienter la recherche
                  et l&apos;innovation de la filière ferroviaire française.
                  Trains intelligents, décarbonation, infrastructure résiliente et
                  compétitivité industrielle.
                </p>

                <span className="inline-flex items-center text-sm font-bold text-[#2563EB] group-hover:gap-3 gap-2 transition-all duration-200">
                  Consulter la feuille de route
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Right column - 2 stacked cards */}
            <div className="md:col-span-2 flex flex-col gap-5">
              {/* Card 2 - Les travaux */}
              <motion.div variants={fadeUp} className="flex-1">
                <Link
                  href="/les-travaux"
                  className="group block h-full bg-[#F0FDF4] hover:bg-[#DCFCE7] transition-colors duration-300 p-8 rounded-sm relative overflow-hidden"
                >
                  {/* Project count badge */}
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#10B981]/10 text-[#10B981] font-extrabold text-sm">
                      28
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#10B981]/70 mb-4 block">
                    Projets & Recherche
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0F1B3D] mb-2 leading-tight">
                    Les travaux
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Projets de recherche soutenus, documentation technique et
                    publications de la filière.
                  </p>
                  <span className="inline-flex items-center text-sm font-bold text-[#10B981] group-hover:gap-3 gap-2 transition-all duration-200">
                    Découvrir
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>

              {/* Card 3 - Accompagnement */}
              <motion.div variants={fadeUp} className="flex-1">
                <Link
                  href="/accompagnement"
                  className="group block h-full bg-[#FAF5FF] hover:bg-[#F3E8FF] transition-colors duration-300 p-8 rounded-sm relative overflow-hidden"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#8B5CF6]/70 mb-4 block">
                    Soutien & Financement
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0F1B3D] mb-2 leading-tight">
                    Accompagnement
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Appels à projets, AMI, mécanismes de financement pour
                    l&apos;innovation ferroviaire.
                  </p>
                  <span className="inline-flex items-center text-sm font-bold text-[#8B5CF6] group-hover:gap-3 gap-2 transition-all duration-200">
                    Explorer
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          SECTION 5 — Latest News
          Editorial magazine-style layout
          ======================================== */}
      <section className="bg-[#FAFBFC] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                Actualités
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F1B3D] tracking-tight">
                Dernières nouvelles
              </h2>
            </div>
            <Link
              href="/actualites"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
            >
              Toutes les actualités
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Featured article - large, horizontal */}
            <motion.div variants={fadeUp}>
              <Link
                href={PLACEHOLDER_ARTICLES[0].href}
                className="group block h-full"
              >
                {/* Image placeholder with gradient */}
                <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#1e3a5f] via-[#2563EB] to-[#3b82f6] rounded-sm overflow-hidden mb-5">
                  {/* Subtle pattern on image placeholder */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)',
                    }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="info" size="md">
                      {PLACEHOLDER_ARTICLES[0].category}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">
                  {PLACEHOLDER_ARTICLES[0].date}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-[#0F1B3D] leading-snug mb-3 group-hover:text-[#2563EB] transition-colors duration-200">
                  {PLACEHOLDER_ARTICLES[0].title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed line-clamp-3">
                  {PLACEHOLDER_ARTICLES[0].excerpt}
                </p>
              </Link>
            </motion.div>

            {/* Two smaller articles stacked */}
            <div className="flex flex-col gap-6">
              {PLACEHOLDER_ARTICLES.slice(1).map((article) => (
                <motion.div key={article.id} variants={fadeUp} className="flex-1">
                  <Link
                    href={article.href}
                    className="group flex gap-5 h-full items-start"
                  >
                    {/* Small image placeholder */}
                    <div className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-gray-200 to-gray-300 rounded-sm relative overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            article.id === 2
                              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, #8B5CF6 0%, #7c3aed 100%)',
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-1.5">
                        {article.date}
                      </p>
                      <h3 className="text-base font-bold text-[#0F1B3D] leading-snug mb-2 group-hover:text-[#2563EB] transition-colors duration-200 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile: show link below */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:hidden mt-8"
          >
            <Link
              href="/actualites"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
            >
              Toutes les actualités
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          SECTION 6 — Ecosystem Partners
          Clean horizontal flow, light gray background
          ======================================== */}
      <section className="bg-[#F5F5F5] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-10">
              Ils font le ferroviaire de demain
            </p>

            {/* Row 1 */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 mb-4">
              {PARTNERS_ROW_1.map((partner, i) => (
                <span key={partner} className="flex items-center gap-3">
                  <span className="text-base sm:text-lg font-bold text-gray-400 tracking-wide whitespace-nowrap hover:text-[#0F1B3D] transition-colors duration-200 cursor-default">
                    {partner}
                  </span>
                  {i < PARTNERS_ROW_1.length - 1 && (
                    <span className="text-gray-300 select-none" aria-hidden="true">&middot;</span>
                  )}
                </span>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
              {PARTNERS_ROW_2.map((partner, i) => (
                <span key={partner} className="flex items-center gap-3">
                  <span className="text-base sm:text-lg font-bold text-gray-400 tracking-wide whitespace-nowrap hover:text-[#0F1B3D] transition-colors duration-200 cursor-default">
                    {partner}
                  </span>
                  {i < PARTNERS_ROW_2.length - 1 && (
                    <span className="text-gray-300 select-none" aria-hidden="true">&middot;</span>
                  )}
                </span>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/le-corifer#les-acteurs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
              >
                Voir l&apos;écosystème complet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          SECTION 7 — CTA (Split Design)
          Dark left / Electric blue right
          ======================================== */}
      <section className="relative">
        <div className="grid md:grid-cols-2">
          {/* Left panel - dark */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#0F1B3D] px-8 sm:px-12 lg:px-16 py-16 md:py-20 flex items-center"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-extrabold text-white leading-snug tracking-tight max-w-md">
                Vous avez un projet d&apos;innovation ferroviaire&nbsp;?
              </h2>
              <p className="mt-4 text-gray-400 text-base leading-relaxed max-w-sm">
                Le CORIFER accompagne les acteurs de la filière dans le
                montage et le financement de projets de recherche.
              </p>
            </div>
          </motion.div>

          {/* Right panel - electric blue */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#2563EB] px-8 sm:px-12 lg:px-16 py-16 md:py-20 flex items-center justify-center md:justify-start"
          >
            <div className="text-center md:text-left">
              <p className="text-white/80 text-base mb-6 font-medium">
                Prenons contact pour en discuter.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-[#2563EB] font-bold px-8 py-4 rounded-sm text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg shadow-black/10"
              >
                Contactez-nous
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
