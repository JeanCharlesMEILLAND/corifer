'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Brain,
  Leaf,
  Building,
  Trophy,
  ArrowRight,
  Map,
  FolderOpen,
  Calendar,
  Users,
  Briefcase,
  TrendingUp,
} from 'lucide-react'
import { STRATEGIC_AXES } from '@/lib/constants'
import { Counter } from '@/components/ui/Counter'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'

// ========================================
// Axis icon mapping
// ========================================
const axisIcons: Record<string, React.ReactNode> = {
  'trains-intelligents': <Brain className="w-7 h-7" />,
  'decarbonation': <Leaf className="w-7 h-7" />,
  'infrastructure': <Building className="w-7 h-7" />,
  'competitivite': <Trophy className="w-7 h-7" />,
}

const axisDescriptions: Record<string, string> = {
  'trains-intelligents':
    'Automatisation, connectivité, maintenance prédictive et exploitation intelligente du réseau ferroviaire.',
  'decarbonation':
    'Hydrogène, batteries, efficacité énergétique et réduction de l\'empreinte carbone du transport ferroviaire.',
  'infrastructure':
    'Surveillance, maintenance avancée et adaptation de l\'infrastructure aux enjeux climatiques.',
  'competitivite':
    'Productivité industrielle, digitalisation de la production et renforcement de la chaîne de valeur française.',
}

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
    gradient: 'from-blue-600 to-blue-800',
    href: '/actualites/ami-trains-legers-2025',
  },
  {
    id: 2,
    title: 'Résultats du programme Hydrogène Ferroviaire : premiers essais concluants',
    excerpt:
      'Les résultats des premiers essais du prototype de train à hydrogène confirment les objectifs d\'autonomie et de performance.',
    date: '28 février 2026',
    category: 'Recherche',
    gradient: 'from-emerald-600 to-emerald-800',
    href: '/actualites/resultats-hydrogene-ferroviaire',
  },
  {
    id: 3,
    title: 'Forum CORIFER 2026 : rendez-vous le 15 avril à Paris',
    excerpt:
      'Le forum annuel réunira l\'ensemble des acteurs de l\'écosystème ferroviaire pour présenter les avancées des projets soutenus.',
    date: '15 février 2026',
    category: 'Événement',
    gradient: 'from-purple-600 to-purple-800',
    href: '/actualites/forum-corifer-2026',
  },
]

// ========================================
// Partner logos
// ========================================
const PARTNERS = [
  'SNCF',
  'Alstom',
  'RATP',
  'DGITM',
  'ADEME',
  'Bpifrance',
  'Railenium',
  'SNCF Réseau',
  'Keolis',
  'Transdev',
  'Faiveley',
  'DGE',
]

// ========================================
// Animation variants
// ========================================
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

// ========================================
// Homepage Component
// ========================================
export default function Home() {
  return (
    <>
      {/* ========================================
          Section 1 - Hero
          ======================================== */}
      <section className="relative overflow-hidden bg-[#0F1B3D] min-h-[90vh] flex items-center">
        {/* Geometric pattern background - CSS only */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F1B3D] via-[#162450] to-[#0a1128]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          {/* Diagonal accent lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(37,99,235,0.3) 80px, rgba(37,99,235,0.3) 81px)',
            }}
          />
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563EB]/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.p
              variants={heroItemVariants}
              className="text-[#2563EB] font-semibold tracking-widest uppercase text-sm mb-6"
            >
              Filière ferroviaire
            </motion.p>

            <motion.h1
              variants={heroItemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
            >
              CORIFER
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="mt-4 text-xl sm:text-2xl text-blue-200/90 font-medium leading-relaxed max-w-3xl"
            >
              Conseil d&apos;Orientation de la Recherche et de l&apos;Innovation
              de la filière <span className="text-white font-bold">FER</span>roviaire
            </motion.p>

            <motion.p
              variants={heroItemVariants}
              className="mt-6 text-lg text-gray-300/90 leading-relaxed max-w-2xl"
            >
              Fédérer les acteurs, orienter la recherche et accélérer
              l&apos;innovation pour construire le ferroviaire de demain.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button href="/le-corifer" size="lg" variant="primary">
                Découvrir le CORIFER
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button href="/les-travaux/projets" size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                Voir les projets
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom decorative edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ========================================
          Section 2 - Key Figures
          ======================================== */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <SectionTitle
              title="Le CORIFER en chiffres"
              subtitle="Piloter et soutenir la recherche et l'innovation ferroviaire en France"
              centered
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <Counter target={45} label="Projets soumis" />
            <Counter target={28} label="Projets soutenus" />
            <Counter target={150} suffix=" M€" label="Soutien de l'État" />
            <Counter target={12} label="Partenaires de l'écosystème" />
          </div>
        </div>
      </section>

      {/* ========================================
          Section 3 - Strategic Axes
          ======================================== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Axes stratégiques"
              subtitle="Quatre grandes priorités de recherche et d'innovation pour la filière ferroviaire française."
              centered
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-6 mt-2"
          >
            {STRATEGIC_AXES.map((axis) => (
              <motion.div key={axis.id} variants={itemVariants}>
                <div
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full border-l-4 p-6"
                  style={{ borderLeftColor: axis.color }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${axis.color}15`, color: axis.color }}
                    >
                      {axisIcons[axis.id]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#0F1B3D] mb-2">
                        {axis.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {axisDescriptions[axis.id]}
                      </p>
                      <Link
                        href="/feuille-de-route"
                        className="inline-flex items-center text-sm font-semibold hover:underline"
                        style={{ color: axis.color }}
                      >
                        En savoir plus
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================
          Section 4 - Latest News
          ======================================== */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Dernières actualités"
              subtitle="Suivez les dernières avancées, événements et appels à projets de la filière."
              centered
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-8 mt-2"
          >
            {PLACEHOLDER_ARTICLES.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Card href={article.href} className="h-full group" padding={false}>
                  {/* Image placeholder */}
                  <div
                    className={`relative w-full aspect-[16/10] bg-gradient-to-br ${article.gradient} flex items-center justify-center`}
                  >
                    <span className="text-white/20 text-6xl font-bold">
                      {article.id}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-gray-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <Badge variant="info" size="sm">
                        {article.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F1B3D] mb-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center mt-4 text-sm font-semibold text-[#2563EB] group-hover:underline">
                      Lire la suite
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button href="/actualites" variant="outline">
              Toutes les actualités
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          Section 5 - Featured Project
          ======================================== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Projet à la une"
              subtitle="Découvrez les projets de recherche et d'innovation soutenus par le CORIFER."
              centered
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F1B3D] via-[#162450] to-[#1a2d5e] shadow-xl">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Left content */}
                <div className="lg:col-span-3 p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge variant="info" size="md">
                      Axe : Décarbonation
                    </Badge>
                    <Badge variant="success" size="md">
                      TRL 5-6
                    </Badge>
                    <Badge variant="warning" size="md">
                      France 2030
                    </Badge>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    HydrauRail&nbsp;&mdash;&nbsp;Train Régional à Hydrogène Vert
                  </h3>

                  <p className="text-gray-300 leading-relaxed mb-8 max-w-xl">
                    Développement d&apos;une motorisation hydrogène pour les
                    autorails régionaux, visant une autonomie de 600 km et zéro
                    émission directe. Le projet associe industriels, opérateurs
                    et laboratoires pour accélérer la transition énergétique du
                    transport ferroviaire régional.
                  </p>

                  <div className="mb-8 max-w-md">
                    <ProgressBar
                      percentage={62}
                      label="Avancement du projet"
                      className="[&_span]:text-gray-300 [&_span]:text-white [&_.text-gray-700]:text-gray-300 [&_.text-gray-900]:text-white"
                    />
                  </div>

                  <div className="mb-8">
                    <p className="text-sm text-gray-400 mb-3 font-medium">
                      Partenaires du projet
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['Alstom', 'SNCF', 'Railenium', 'CEA', 'ADEME'].map(
                        (partner) => (
                          <span
                            key={partner}
                            className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white/80 font-medium"
                          >
                            {partner}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <Button
                    href="/les-travaux/projets/hydraurail"
                    variant="primary"
                    size="lg"
                  >
                    Découvrir ce projet
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>

                {/* Right decorative panel */}
                <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-[#2563EB]/20 to-[#2563EB]/5 items-center justify-center relative">
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 30% 40%, rgba(37,99,235,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(16,185,129,0.3) 0%, transparent 50%)',
                      }}
                    />
                  </div>
                  <div className="text-center relative z-10 px-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
                      <TrendingUp className="w-12 h-12 text-[#2563EB]" />
                    </div>
                    <p className="text-5xl font-extrabold text-white mb-2">
                      8,2 M&euro;
                    </p>
                    <p className="text-gray-400 text-sm">
                      Budget total du projet
                    </p>
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-3xl font-bold text-emerald-400 mb-1">
                        2024&ndash;2028
                      </p>
                      <p className="text-gray-400 text-sm">
                        Durée du programme
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          Section 6 - Quick Links CTA
          ======================================== */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Accompagnement */}
            <motion.div variants={itemVariants}>
              <Link
                href="/accompagnement"
                className="group block h-full rounded-2xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:border-[#2563EB]/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#2563EB] transition-colors duration-300">
                  <Briefcase className="w-7 h-7 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1B3D] mb-3">
                  Accompagnement
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Découvrez nos dispositifs de soutien, appels à projets et
                  mécanismes de financement pour l&apos;innovation ferroviaire.
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform duration-200">
                  Explorer
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Feuille de route */}
            <motion.div variants={itemVariants}>
              <Link
                href="/feuille-de-route"
                className="group block h-full rounded-2xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:border-[#2563EB]/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#2563EB] transition-colors duration-300">
                  <Map className="w-7 h-7 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1B3D] mb-3">
                  Feuille de route
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Notre stratégie 2023-2030 pour structurer et orienter la
                  recherche et l&apos;innovation de la filière ferroviaire.
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform duration-200">
                  Consulter
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Les travaux */}
            <motion.div variants={itemVariants}>
              <Link
                href="/les-travaux"
                className="group block h-full rounded-2xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:border-[#2563EB]/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#2563EB] transition-colors duration-300">
                  <FolderOpen className="w-7 h-7 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1B3D] mb-3">
                  Les travaux
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Projets de recherche soutenus, documentation technique et
                  publications de la filière ferroviaire.
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform duration-200">
                  Découvrir
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          Section 7 - Partners / Members Logos
          ======================================== */}
      <section className="py-20 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Ils font le ferroviaire de demain"
              subtitle="Industriels, opérateurs, laboratoires et institutions publiques : un écosystème mobilisé."
              centered
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 mt-4"
          >
            {PARTNERS.map((partner) => (
              <motion.div
                key={partner}
                variants={itemVariants}
                className="flex items-center justify-center h-20 md:h-24 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#2563EB]/20 hover:shadow-sm transition-all duration-200"
              >
                <span className="text-sm md:text-base font-bold text-gray-400 tracking-wide">
                  {partner}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button href="/le-corifer#les-acteurs" variant="ghost">
              <Users className="mr-2 w-4 h-4" />
              Voir tous les acteurs
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
