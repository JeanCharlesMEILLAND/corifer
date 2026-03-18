'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Compass,
  Users,
  Rocket,
  Target,
  ChevronRight,
  ExternalLink,
  Building2,
  FlaskConical,
  Landmark,
  Lightbulb,
} from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SITE_CONFIG } from '@/lib/constants'

// ========================================
// Animation variants
// ========================================

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-60px' as const },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

// ========================================
// Data
// ========================================

const keyContacts = [
  {
    name: 'Lionel Pujol',
    role: 'Chef de projet industrie ferroviaire',
    org: 'DGE - Ministere de l\'Economie',
    title: 'President du CORIFER',
    initials: 'LP',
    color: 'bg-[#2563EB]',
  },
  {
    name: 'Jean-Jacques Mogoro',
    role: 'Directeur Pole Industrie',
    org: 'FIF',
    title: 'Secretaire du CORIFER',
    initials: 'JM',
    color: 'bg-[#0F1B3D]',
  },
]

const governanceMembers = [
  { name: 'SNCF', role: 'Operateur national', initials: 'SN', color: 'bg-[#64748B]' },
  { name: 'RATP', role: 'Operateur transport urbain', initials: 'RA', color: 'bg-[#64748B]' },
  { name: 'Alstom', role: 'Constructeur ferroviaire', initials: 'AL', color: 'bg-[#2563EB]' },
  { name: 'DGITM', role: 'Direction generale des infrastructures', initials: 'DG', color: 'bg-[#10B981]' },
  { name: 'DGRI', role: 'Direction generale de la recherche', initials: 'DR', color: 'bg-[#10B981]' },
  { name: 'AIF', role: 'Agence de l\'innovation ferroviaire', initials: 'AI', color: 'bg-[#F59E0B]' },
]

const missions = [
  {
    icon: Compass,
    title: 'Orienter',
    description:
      'Definir les priorites strategiques de recherche et d\'innovation pour la filiere ferroviaire francaise, en coherence avec les enjeux europeens et les objectifs de decarbonation.',
  },
  {
    icon: Users,
    title: 'Federer',
    description:
      'Rassembler l\'ensemble des acteurs publics et prives de la filiere : industriels, operateurs, centres de recherche, pouvoirs publics et poles de competitivite.',
  },
  {
    icon: Rocket,
    title: 'Accelerer',
    description:
      'Soutenir le passage de la recherche fondamentale a l\'innovation operationnelle, en facilitant les collaborations et en identifiant les verrous technologiques.',
  },
  {
    icon: Target,
    title: 'Evaluer',
    description:
      'Suivre l\'avancement des projets de R&I, mesurer leur impact sur la competitivite de la filiere et formuler des recommandations pour les orientations futures.',
  },
]

type ActorCategory = 'all' | 'clusters' | 'irt' | 'operateurs' | 'poles'

const categories: { key: ActorCategory; label: string; color: string; badgeVariant: 'info' | 'success' | 'warning' | 'purple' }[] = [
  { key: 'all', label: 'Tous', color: '', badgeVariant: 'info' },
  { key: 'clusters', label: 'Clusters', color: 'text-[#2563EB]', badgeVariant: 'info' },
  { key: 'irt', label: 'IRT', color: 'text-[#10B981]', badgeVariant: 'success' },
  { key: 'operateurs', label: 'Operateurs', color: 'text-[#F59E0B]', badgeVariant: 'warning' },
  { key: 'poles', label: 'Poles de competitivite', color: 'text-[#8B5CF6]', badgeVariant: 'purple' },
]

const actors: {
  name: string
  category: ActorCategory
  description: string
  url: string
}[] = [
  // Clusters
  {
    name: 'AIF',
    category: 'clusters',
    description:
      'Agence de l\'Innovation Ferroviaire, cluster national dedie a l\'innovation collaborative dans le secteur ferroviaire.',
    url: 'https://www.aif-ferroviaire.fr',
  },
  {
    name: 'Ferrocampus',
    category: 'clusters',
    description:
      'Campus ferroviaire situe a Saintes, centre de formation et d\'innovation pour les metiers du ferroviaire.',
    url: 'https://www.ferrocampus.fr',
  },
  {
    name: 'TOTEM',
    category: 'clusters',
    description:
      'Cluster regional dedie aux technologies de transport, favorisant les synergies entre acteurs industriels et academiques.',
    url: '#',
  },
  {
    name: 'MecateamCluster',
    category: 'clusters',
    description:
      'Cluster specialise dans la maintenance et la construction des infrastructures ferroviaires, base a Montceau-les-Mines.',
    url: 'https://www.mecateamcluster.org',
  },
  // IRT
  {
    name: 'Railenium',
    category: 'irt',
    description:
      'Institut de Recherche Technologique dedie au ferroviaire, couvrant l\'infrastructure, le materiel roulant et les systemes.',
    url: 'https://www.railenium.eu',
  },
  {
    name: 'Jules Verne',
    category: 'irt',
    description:
      'IRT specialise dans les technologies avancees de fabrication, contribuant a l\'allegement et la durabilite des structures ferroviaires.',
    url: 'https://www.irt-jules-verne.fr',
  },
  {
    name: 'Saint-Exupery',
    category: 'irt',
    description:
      'IRT couvrant l\'aeronautique, l\'espace et les systemes embarques, avec des applications transverses au ferroviaire.',
    url: 'https://www.irt-saintexupery.com',
  },
  // Operateurs
  {
    name: 'ADEME',
    category: 'operateurs',
    description:
      'Agence de la transition ecologique, financeuse de projets de R&I en faveur de la mobilite durable et decarbonee.',
    url: 'https://www.ademe.fr',
  },
  {
    name: 'Bpifrance',
    category: 'operateurs',
    description:
      'Banque publique d\'investissement, soutenant l\'innovation des entreprises de la filiere ferroviaire via des aides et financements.',
    url: 'https://www.bpifrance.fr',
  },
  // Poles de competitivite
  {
    name: 'CARA',
    category: 'poles',
    description:
      'Pole de competitivite European Cluster for Mobility of the Future, base en Auvergne-Rhone-Alpes.',
    url: 'https://www.pole-cara.com',
  },
  {
    name: 'ID4Mobility',
    category: 'poles',
    description:
      'Pole de competitivite dedie aux solutions de mobilite innovantes, couvrant le ferroviaire, l\'automobile et les transports intelligents.',
    url: 'https://www.id4mobility.org',
  },
  {
    name: 'I-Trans',
    category: 'poles',
    description:
      'Pole de competitivite des transports terrestres durables, au coeur de la filiere ferroviaire dans les Hauts-de-France.',
    url: 'https://www.i-trans.org',
  },
]

const categoryIcons: Record<string, typeof Building2> = {
  clusters: Building2,
  irt: FlaskConical,
  operateurs: Landmark,
  poles: Lightbulb,
}

// ========================================
// Component
// ========================================

export default function LeCoriferPage() {
  const [activeFilter, setActiveFilter] = useState<ActorCategory>('all')

  const filteredActors =
    activeFilter === 'all'
      ? actors
      : actors.filter((a) => a.category === activeFilter)

  const getCategoryMeta = (cat: ActorCategory) =>
    categories.find((c) => c.key === cat)!

  return (
    <>
      {/* ========================================
          Hero Banner - Light with rail pattern
          ======================================== */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle rail-pattern CSS background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #0F1B3D 0px, #0F1B3D 4px, transparent 4px, transparent 60px), repeating-linear-gradient(0deg, transparent 0px, transparent 14px, #0F1B3D 14px, #0F1B3D 16px, transparent 16px, transparent 30px)',
            backgroundSize: '60px 30px',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-14 md:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'ariane" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
              <li>
                <Link href="/" className="hover:text-[#0F1B3D] transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="text-[#0F1B3D] font-medium">Le CORIFER</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F1B3D] tracking-tight mb-4">
              Le CORIFER
            </h1>
            {/* Gradient accent line */}
            <div
              className="h-1 w-24 rounded-full mb-6"
              style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)' }}
            />
            <p className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
              {SITE_CONFIG.fullName}. L&apos;instance nationale de coordination de la
              recherche et de l&apos;innovation au service de la filiere ferroviaire
              francaise.
            </p>
          </motion.div>

          {/* Quick nav pills */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            {[
              { label: 'Qui sommes-nous ?', href: '#qui-sommes-nous' },
              { label: 'Gouvernance', href: '#gouvernance' },
              { label: 'Role & missions', href: '#role-missions' },
              { label: 'Les acteurs', href: '#les-acteurs' },
            ].map((pill) => (
              <a
                key={pill.href}
                href={pill.href}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-[#F8FAFC] px-5 py-2.5 text-sm font-medium text-[#0F1B3D] hover:bg-[#EFF6FF] hover:border-[#2563EB]/30 transition-colors"
              >
                {pill.label}
                <ChevronRight className="h-4 w-4 text-[#6B7280]" />
              </a>
            ))}
          </motion.div>
        </div>
        {/* Bottom border */}
        <div className="h-px bg-gray-200" />
      </section>

      {/* ========================================
          Section 2 - Qui sommes-nous ?
          ======================================== */}
      <section id="qui-sommes-nous" className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeInUp}>
            <SectionTitle
              title="Qui sommes-nous ?"
              subtitle="Le CORIFER federe l'ensemble des acteurs de la filiere ferroviaire francaise autour d'une ambition commune : faire du rail un levier majeur de la transition ecologique."
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mt-12">
            {/* Text content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="text-gray-600 leading-relaxed">
                Le <strong className="text-[#0F1B3D]">Conseil d&apos;Orientation de la Recherche et de
                l&apos;Innovation de la filiere FERroviaire (CORIFER)</strong> a ete cree pour
                coordonner et orienter les efforts de recherche et d&apos;innovation (R&I) dans le
                secteur ferroviaire francais.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Il rassemble les acteurs cles de l&apos;ecosysteme : industriels, operateurs de
                transport, centres de recherche, instituts de recherche technologique (IRT), poles
                de competitivite, clusters et representants de l&apos;Etat.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Place sous l&apos;egide du Ministere de l&apos;Economie (DGE) et porte par la
                Federation des Industries Ferroviaires (FIF), le CORIFER elabore la feuille de
                route strategique de R&I de la filiere et en assure le suivi.
              </p>

              {/* Key facts */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                {[
                  { value: '2015', label: 'Annee de creation' },
                  { value: 'National', label: 'Perimetre' },
                  { value: 'R&I', label: 'Mandat strategique' },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-xl bg-[#F8FAFC] border border-gray-100 p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-[#2563EB]">{fact.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{fact.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Railway station image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <Image
                  src="/images/freight-yard.jpg"
                  alt="Gare de triage ferroviaire - CORIFER"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-[#2563EB]/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          Section 3 - Gouvernance
          ======================================== */}
      <section id="gouvernance" className="section-padding bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeInUp}>
            <SectionTitle
              title="Gouvernance"
              subtitle="Le CORIFER est pilote par des representants de l'Etat et de la filiere industrielle, garants de la coherence strategique."
            />
          </motion.div>

          {/* Key contacts */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mt-12"
            {...staggerContainer}
          >
            {keyContacts.map((contact) => (
              <motion.div key={contact.name} {...staggerItem}>
                <Card className="border border-gray-100">
                  <div className="flex items-start gap-5">
                    {/* Avatar */}
                    <div
                      className={`shrink-0 w-16 h-16 rounded-full ${contact.color} flex items-center justify-center text-white text-xl font-bold`}
                    >
                      {contact.initials}
                    </div>
                    <div className="min-w-0">
                      <Badge variant="info" size="sm" className="mb-2">
                        {contact.title}
                      </Badge>
                      <h3 className="text-lg font-bold text-[#0F1B3D]">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{contact.role}</p>
                      <p className="text-sm font-medium text-[#2563EB] mt-0.5">
                        {contact.org}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional governance members */}
          <motion.div {...fadeInUp} className="mt-10">
            <h3 className="text-lg font-semibold text-[#0F1B3D] mb-6">
              Membres du comite de pilotage
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {governanceMembers.map((member) => (
                <motion.div key={member.name} {...staggerItem}>
                  <div className="flex items-center gap-4 rounded-xl bg-white border border-gray-100 p-4 hover:shadow-md transition-shadow">
                    <div
                      className={`shrink-0 w-11 h-11 rounded-full ${member.color} flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {member.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0F1B3D] text-sm truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          Section 4 - Role & Missions
          ======================================== */}
      <section id="role-missions" className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeInUp}>
            <SectionTitle
              title="Role & missions"
              subtitle="Le CORIFER structure son action autour de quatre missions fondamentales pour accompagner la transformation de la filiere ferroviaire."
              centered
            />
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            {...staggerContainer}
          >
            {missions.map((mission, index) => {
              const Icon = mission.icon
              return (
                <motion.div key={mission.title} {...staggerItem}>
                  <div className="group relative rounded-2xl bg-[#F8FAFC] border border-gray-100 p-6 h-full hover:shadow-lg hover:border-[#2563EB]/20 transition-all duration-300">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                    </div>
                    {/* Number */}
                    <span className="absolute top-4 right-5 text-5xl font-black text-[#2563EB]/15 leading-none">
                      0{index + 1}
                    </span>
                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#0F1B3D] mb-3">
                      {mission.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {mission.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================
          Section 5 - Les acteurs
          ======================================== */}
      <section id="les-acteurs" className="section-padding bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeInUp}>
            <SectionTitle
              title="Les acteurs de l'ecosysteme"
              subtitle="Le CORIFER s'appuie sur un reseau d'acteurs complementaires couvrant l'ensemble de la chaine d'innovation ferroviaire."
              centered
            />
          </motion.div>

          {/* Filter buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-10 mb-10"
            {...fadeInUp}
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveFilter(cat.key)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border transition-all duration-200 ${
                  activeFilter === cat.key
                    ? 'bg-[#0F1B3D] text-white border-[#0F1B3D] shadow-md'
                    : 'bg-white text-[#0F1B3D]/70 border-gray-200 hover:border-[#0F1B3D]/30 hover:text-[#0F1B3D]'
                }`}
              >
                {cat.key !== 'all' && (() => {
                  const CatIcon = categoryIcons[cat.key]
                  return CatIcon ? <CatIcon className="h-4 w-4" /> : null
                })()}
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Actor cards grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredActors.map((actor, idx) => {
              const catMeta = getCategoryMeta(actor.category)
              const CatIcon = categoryIcons[actor.category]
              return (
                <motion.div
                  key={actor.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Card className="h-full border border-gray-100 hover:border-[#2563EB]/20 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {CatIcon && (
                          <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-gray-100 flex items-center justify-center">
                            <CatIcon className={`h-5 w-5 ${catMeta.color}`} />
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-[#0F1B3D]">
                          {actor.name}
                        </h3>
                      </div>
                      <Badge variant={catMeta.badgeVariant} size="sm">
                        {catMeta.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {actor.description}
                    </p>
                    {actor.url !== '#' && (
                      <a
                        href={actor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                      >
                        Visiter le site
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {filteredActors.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Aucun acteur dans cette categorie.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
