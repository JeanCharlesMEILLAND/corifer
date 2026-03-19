'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  ChevronDown,
  Eye,
  Users,
  Award,
  FileText,
  Handshake,
  Network,
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

const president = {
  name: 'Carole DESNOST',
  role: 'Présidente du CORIFER',
  subtitle: 'Vice-Présidente du Directoire SNCF – Ambassadrice France 2030',
  initials: 'CD',
  color: 'bg-gradient-to-br from-[#2563EB] to-[#0F1B3D]',
}

const secretary = {
  name: 'Jean-Jacques Mogoro',
  role: 'Secrétaire du CORIFER',
  subtitle: 'Directeur Pôle Industrie, FIF',
  initials: 'JM',
  color: 'bg-[#0F1B3D]',
}

type CommitteeKey = 'copil' | 'rd' | 'pme'

const committees: {
  key: CommitteeKey
  name: string
  fullName: string
  description: string
  presidence?: string
  fonctionnement: string
  members: { name: string; org?: string }[]
  invites?: { name: string; org?: string }[]
}[] = [
  {
    key: 'copil',
    name: 'CoPil',
    fullName: 'Comité de Pilotage',
    description:
      'Prépare les évolutions des feuilles de route, assure le suivi macro des projets RDI, promeut les programmes structurants.',
    fonctionnement: '2 réunions par an, décisions à l\'unanimité',
    members: [
      { name: 'SNCF' },
      { name: 'RATP' },
      { name: 'Alstom' },
      { name: 'DGE' },
      { name: 'DGITM' },
      { name: 'DGRI' },
      { name: 'ADEME' },
      { name: 'Bpifrance' },
      { name: 'SNCF Réseau' },
      { name: 'Keolis' },
      { name: 'Transdev' },
      { name: 'FIF' },
      { name: 'UTP' },
      { name: 'EPSF' },
    ],
    invites: [
      { name: 'Railenium', org: 'IRT' },
      { name: 'AIF', org: 'Cluster' },
      { name: 'I-Trans', org: 'Pôle' },
      { name: 'CARA', org: 'Pôle' },
    ],
  },
  {
    key: 'rd',
    name: 'R&D',
    fullName: 'Comité R&D',
    description:
      'Bâtit la feuille de route R&I, émet un avis sur les projets, assure le suivi des projets cofinancés.',
    presidence: 'Assurée par le/la Président(e) du COSS de l\'IRT Railenium',
    fonctionnement: '3 à 4 réunions par an',
    members: [
      { name: 'Alstom' },
      { name: 'SNCF' },
      { name: 'SNCF Réseau' },
      { name: 'RATP' },
      { name: 'Railenium' },
      { name: 'ADEME' },
      { name: 'Bpifrance' },
      { name: 'DGE' },
      { name: 'DGITM' },
      { name: 'DGRI' },
    ],
  },
  {
    key: 'pme',
    name: 'PME',
    fullName: 'Comité PME',
    description:
      'Favorise l\'innovation des PME, diffuse les opportunités, identifie les projets sous seuil France 2030, oriente vers les financeurs.',
    presidence: 'Assurée par le/la Président(e) du Railway Business Cluster (RBC) de la FIF',
    fonctionnement: '4 réunions par an',
    members: [
      { name: 'FIF (RBC)' },
      { name: 'AIF' },
      { name: 'Bpifrance' },
      { name: 'ADEME' },
      { name: 'DGE' },
      { name: 'I-Trans' },
      { name: 'CARA' },
      { name: 'ID4Mobility' },
    ],
  },
]

const missions = [
  {
    icon: Eye,
    title: 'Structurer et promouvoir une vision stratégique pour la filière',
    description:
      'Définir les orientations de long terme pour la recherche et l\'innovation ferroviaire française, en lien avec les priorités nationales et européennes.',
  },
  {
    icon: Users,
    title: 'Mobiliser les industriels sur l\'innovation et favoriser les synergies entre acteurs',
    description:
      'Rassembler les acteurs publics et privés de la filière pour construire des projets collaboratifs et renforcer la compétitivité collective.',
  },
  {
    icon: Award,
    title: 'Identifier et labelliser les projets structurants de filière',
    description:
      'Évaluer et sélectionner les projets à fort impact pour la filière, leur attribuer un label facilitant l\'accès aux financements publics.',
  },
  {
    icon: FileText,
    title: 'Participer à la constitution des AAP et des AMI',
    description:
      'Contribuer à l\'élaboration des appels à projets et appels à manifestation d\'intérêt en lien avec les opérateurs de l\'État.',
  },
  {
    icon: Handshake,
    title: 'Participer à l\'orientation vers les financements publics',
    description:
      'Accompagner les porteurs de projets dans l\'identification des dispositifs de financement adaptés (France 2030, ADEME, Bpifrance, ANR).',
  },
  {
    icon: Network,
    title: 'Gérer la relation de coordination entre les acteurs de filière industrielle',
    description:
      'Assurer l\'interface entre les différents échelons de gouvernance et les acteurs opérationnels pour garantir la cohérence des actions.',
  },
]

// ========================================
// Component
// ========================================

export default function LeCoriferPage() {
  const [activeCommittee, setActiveCommittee] = useState<CommitteeKey>('copil')

  const currentCommittee = committees.find((c) => c.key === activeCommittee)!

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
              recherche et de l&apos;innovation au service de la filière ferroviaire
              française.
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
              { label: 'Rôle & missions', href: '#role-missions' },
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
              subtitle="Le CORIFER est une instance de dialogue entre les industriels de la filière et les pouvoirs publics."
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
              <p className="text-gray-600 leading-relaxed text-lg">
                Le <strong className="text-[#0F1B3D]">CORIFER</strong> est une instance de dialogue
                entre les industriels de la filière et les pouvoirs publics. Il est coordonné par la{' '}
                <strong className="text-[#0F1B3D]">Fédération des Industries Ferroviaires (FIF)</strong>{' '}
                qui en assure le secrétariat.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Il est présidé par une personnalité qualifiée issue du monde industriel, élue pour un
                mandat de 2 ans renouvelable.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Le CORIFER élabore la feuille de route stratégique de recherche et d&apos;innovation
                de la filière ferroviaire française, identifie et labellise les projets structurants,
                et coordonne les acteurs publics et privés de l&apos;écosystème.
              </p>

              {/* Key facts */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                {[
                  { value: '2015', label: 'Année de création' },
                  { value: 'National', label: 'Périmètre' },
                  { value: 'R&I', label: 'Mandat stratégique' },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-xl bg-[#F8FAFC] border border-gray-100 p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-[#2563EB]">{fact.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{fact.label}</div>
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
              subtitle="Le CORIFER est piloté par une Présidente élue et structuré en trois comités spécialisés."
            />
          </motion.div>

          {/* President spotlight */}
          <motion.div {...fadeInUp} className="mt-12 mb-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
                {/* President avatar */}
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#2563EB]/20 shadow-lg shadow-[#2563EB]/20">
                    <Image
                      src="/images/carole-desnost.jpg"
                      alt={president.name}
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                {/* President info */}
                <div className="text-center md:text-left flex-1">
                  <Badge variant="info" size="md" className="mb-3">
                    {president.role}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F1B3D] mb-1">
                    {president.name}
                  </h3>
                  <p className="text-base text-gray-600">
                    {president.subtitle}
                  </p>
                  <blockquote className="mt-6 relative pl-5 border-l-4 border-[#2563EB] max-w-lg">
                    <p className="text-lg italic leading-relaxed text-[#374151]">
                      &laquo; Le CORIFER va établir une stratégie d&apos;innovation ambitieuse et pilotera
                      la feuille de route de la filière. &raquo;
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secretary */}
          <motion.div {...fadeInUp} className="mb-12">
            <div className="flex items-center gap-5 bg-white rounded-xl border border-gray-100 p-5 max-w-md">
              <div className={`shrink-0 w-14 h-14 rounded-full ${secretary.color} flex items-center justify-center text-white text-lg font-bold`}>
                {secretary.initials}
              </div>
              <div>
                <Badge variant="purple" size="sm" className="mb-1">
                  {secretary.role}
                </Badge>
                <h4 className="font-bold text-[#0F1B3D]">{secretary.name}</h4>
                <p className="text-sm text-gray-600">{secretary.subtitle}</p>
              </div>
            </div>
          </motion.div>

          {/* Committees tabs */}
          <motion.div {...fadeInUp}>
            <h3 className="text-xl font-bold text-[#0F1B3D] mb-6">
              Les comités
            </h3>

            {/* Tab buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {committees.map((committee) => (
                <button
                  key={committee.key}
                  type="button"
                  onClick={() => setActiveCommittee(committee.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border transition-all duration-200 ${
                    activeCommittee === committee.key
                      ? 'bg-[#0F1B3D] text-white border-[#0F1B3D] shadow-md'
                      : 'bg-white text-[#0F1B3D]/70 border-gray-200 hover:border-[#0F1B3D]/30 hover:text-[#0F1B3D]'
                  }`}
                >
                  {committee.fullName}
                </button>
              ))}
            </div>

            {/* Active committee content */}
            <motion.div
              key={activeCommittee}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8"
            >
              <h4 className="text-xl font-bold text-[#0F1B3D] mb-2">
                {currentCommittee.fullName}
              </h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                {currentCommittee.description}
              </p>

              {currentCommittee.presidence && (
                <div className="mb-4 flex items-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563EB] whitespace-nowrap mt-0.5">
                    Présidence
                  </span>
                  <p className="text-sm text-gray-600">{currentCommittee.presidence}</p>
                </div>
              )}

              <div className="mb-6 flex items-start gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#10B981] whitespace-nowrap mt-0.5">
                  Fonctionnement
                </span>
                <p className="text-sm text-gray-600">{currentCommittee.fonctionnement}</p>
              </div>

              {/* Members grid */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-[#0F1B3D] mb-3">
                  Membres ({currentCommittee.members.length})
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {currentCommittee.members.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-3 rounded-lg bg-[#F8FAFC] border border-gray-100 px-4 py-3 hover:shadow-sm transition-shadow"
                    >
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#2563EB]">
                          {member.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#0F1B3D] text-sm truncate">
                          {member.name}
                        </p>
                        {member.org && (
                          <p className="text-xs text-gray-500 truncate">{member.org}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invites (if any) */}
              {currentCommittee.invites && currentCommittee.invites.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h5 className="text-sm font-semibold text-[#6B7280] mb-3">
                    Invités permanents ({currentCommittee.invites.length})
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {currentCommittee.invites.map((invite) => (
                      <div
                        key={invite.name}
                        className="inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] border border-[#2563EB]/10 px-4 py-2"
                      >
                        <span className="text-sm font-medium text-[#2563EB]">
                          {invite.name}
                        </span>
                        {invite.org && (
                          <span className="text-xs text-[#6B7280]">({invite.org})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          Section 4 - Rôle & Missions
          ======================================== */}
      <section id="role-missions" className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div {...fadeInUp}>
            <SectionTitle
              title="Rôle & missions"
              subtitle="Le CORIFER structure son action autour de six missions fondamentales pour accompagner la transformation de la filière ferroviaire."
              centered
            />
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            {...staggerContainer}
          >
            {missions.map((mission, index) => {
              const Icon = mission.icon
              return (
                <motion.div key={index} {...staggerItem}>
                  <div className="group relative rounded-2xl bg-[#F8FAFC] border border-gray-100 p-6 h-full hover:shadow-lg hover:border-[#2563EB]/20 transition-all duration-300">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                    </div>
                    {/* Number */}
                    <span className="absolute top-4 right-5 text-5xl font-black text-[#2563EB]/10 leading-none">
                      0{index + 1}
                    </span>
                    {/* Content */}
                    <h3 className="text-base font-bold text-[#0F1B3D] mb-3 leading-snug pr-8" style={{ color: '#111827' }}>
                      {mission.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed" style={{ color: '#4B5563' }}>
                      {mission.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}
