'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOTION_PRESETS } from '@/lib/constants'

// ========================================
// Types
// ========================================

type AppelProjet = {
  id: string
  title: string
  description: string
  status: 'en-cours' | 'cloture'
  statusLabel: string
  deadline?: string
}

type FundingDeviceInfo = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  href: string
}

type ServiceCard = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

// ========================================
// Data
// ========================================

const APPELS_PROJETS: AppelProjet[] = [
  {
    id: 'ami-decarbonation',
    title: 'AMI Decarbonation des mobilites ferroviaires',
    description:
      'Appel a manifestation d\'interet visant a identifier et soutenir des solutions innovantes pour la decarbonation du materiel roulant sur les lignes non electrifiees : hydrogene, batteries, biocarburants et solutions hybrides.',
    status: 'en-cours',
    statusLabel: 'En cours',
    deadline: '30 juin 2024',
  },
  {
    id: 'aap-france-2030',
    title: 'AAP France 2030 - i-Demo Ferroviaire',
    description:
      'Appel a projets du programme France 2030, volet i-Demo, dedie aux projets de demonstration de technologies innovantes dans le secteur ferroviaire. Projets collaboratifs entre industriels et organismes de recherche.',
    status: 'cloture',
    statusLabel: 'Cloture',
  },
]

const FUNDING_DEVICES_INFO: FundingDeviceInfo[] = [
  {
    id: 'france-2030',
    name: 'France 2030',
    description: 'Programme d\'investissement de l\'Etat pour l\'innovation',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    href: '#',
  },
  {
    id: 'ademe',
    name: 'ADEME',
    description: 'Agence de la transition ecologique',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: '#',
  },
  {
    id: 'anr',
    name: 'ANR',
    description: 'Agence nationale de la recherche',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    href: '#',
  },
  {
    id: 'bpifrance',
    name: 'Bpifrance',
    description: 'Banque publique d\'investissement',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: '#',
  },
  {
    id: 'corifer-ami',
    name: 'CORIFER AMI',
    description: 'Appels a manifestation d\'interet du CORIFER',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    href: '#',
  },
]

const SERVICES: ServiceCard[] = [
  {
    id: 'orientation',
    title: 'Orientation strategique',
    description:
      'Aide a la definition des priorites R&I en coherence avec la feuille de route nationale et les enjeux de la filiere ferroviaire. Analyse des tendances technologiques et identification des opportunites.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: 'montage',
    title: 'Montage de projets',
    description:
      'Accompagnement dans la structuration des consortiums, l\'identification des partenaires et la preparation des dossiers de candidature aux appels a projets nationaux et europeens.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 'suivi',
    title: 'Suivi & evaluation',
    description:
      'Pilotage des projets finances, suivi des indicateurs de performance et evaluation de l\'impact des programmes de recherche et d\'innovation sur la competitivite de la filiere.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

// ========================================
// Accompagnement Page
// ========================================

export default function AccompagnementPage() {
  return (
    <>
      {/* ===== Hero Banner ===== */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F1B3D 0%, #1E3A8A 100%)' }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.nav
            aria-label="Fil d'Ariane"
            className="mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ol className="flex items-center gap-2 text-sm text-blue-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-white font-medium" aria-current="page">
                Accompagnement
              </li>
            </ol>
          </motion.nav>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Accompagnement
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Decouvrez nos dispositifs de soutien a l&apos;innovation ferroviaire
          </motion.p>
        </div>
      </section>

      {/* ===== Section 1: Appels a projets / AMI ===== */}
      <section id="appels-projets" className="section-padding bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Appels a projets & AMI"
              subtitle="Le CORIFER coordonne et relaie les appels a projets et appels a manifestation d'interet en lien avec l'innovation ferroviaire. Ces dispositifs visent a stimuler la R&I collaborative au sein de la filiere."
            />
          </motion.div>

          <motion.p
            className="text-gray-600 leading-relaxed max-w-3xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            En lien avec l&apos;Etat, les operateurs de financement et les acteurs de la filiere, le CORIFER identifie les opportunites de financement et accompagne les porteurs de projets dans leurs demarches de candidature.
          </motion.p>

          {/* Appels cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {APPELS_PROJETS.map((appel, index) => (
              <motion.div
                key={appel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-[#0F1B3D] leading-snug">
                    {appel.title}
                  </h3>
                  <Badge
                    variant={appel.status === 'en-cours' ? 'success' : 'default'}
                    size="md"
                  >
                    {appel.statusLabel}
                  </Badge>
                </div>

                {appel.deadline && (
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Date limite : <strong className="text-gray-700">{appel.deadline}</strong></span>
                  </div>
                )}

                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {appel.description}
                </p>

                <Button
                  href={`/accompagnement/${appel.id}`}
                  variant={appel.status === 'en-cours' ? 'primary' : 'outline'}
                  size="sm"
                >
                  En savoir plus
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Empty state design */}
          <motion.div
            className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium mb-1">Aucun appel en cours actuellement</p>
            <p className="text-sm text-gray-400">
              Les prochains appels a projets seront publies ici. Abonnez-vous a notre newsletter pour etre informe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Section 2: Financement & aides ===== */}
      <section id="financement" className="section-padding bg-[#F8FAFC] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Financement & aides"
              subtitle="Retrouvez les principaux dispositifs de financement accessibles aux acteurs de l'innovation ferroviaire en France."
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUNDING_DEVICES_INFO.map((device, index) => (
              <motion.a
                key={device.id}
                href={device.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-white rounded-xl border border-gray-200 hover:border-[#2563EB]/30 shadow-sm hover:shadow-lg transition-all duration-300 p-6 block"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-[#2563EB] text-[#2563EB] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-5">
                  {device.icon}
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-[#0F1B3D] mb-2 group-hover:text-[#2563EB] transition-colors">
                  {device.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {device.description}
                </p>

                {/* Link indicator */}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors">
                  En savoir plus
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 3: Conseil & expertise ===== */}
      <section id="conseil" className="section-padding bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Conseil & expertise"
              subtitle="Le CORIFER joue un role de facilitateur et de conseil aupres des acteurs de la filiere ferroviaire pour structurer et accompagner les projets d'innovation."
            />
          </motion.div>

          <motion.p
            className="text-gray-600 leading-relaxed max-w-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Fort de sa connaissance transversale de la filiere et de ses liens privilegies avec les pouvoirs publics, les operateurs ferroviaires et les organismes de recherche, le CORIFER propose un accompagnement sur mesure a chaque etape du cycle d&apos;innovation.
          </motion.p>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white rounded-xl border border-gray-200 hover:border-[#2563EB]/30 shadow-sm hover:shadow-lg transition-all duration-300 p-7 group"
              >
                {/* Decorative top gradient bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-1 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, #2563EB 0%, #06B6D4 100%)' }}
                />

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-[#2563EB] text-[#2563EB] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-5">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#0F1B3D] mb-3 group-hover:text-[#2563EB] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div
              className="rounded-2xl p-10 md:p-14"
              style={{ background: 'linear-gradient(135deg, #0F1B3D 0%, #1E3A8A 100%)' }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Un projet d&apos;innovation ferroviaire ?
              </h3>
              <p className="text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed">
                Contactez l&apos;equipe du CORIFER pour echanger sur votre projet et identifier les dispositifs d&apos;accompagnement adaptes a vos besoins.
              </p>
              <Button href="/contact" variant="primary" size="lg" className="bg-white !text-[#0F1B3D] hover:bg-blue-50">
                Contactez-nous
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
