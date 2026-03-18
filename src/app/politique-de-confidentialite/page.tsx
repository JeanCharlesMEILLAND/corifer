import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <li className="text-[#0F1B3D] font-medium" aria-current="page">
                Politique de confidentialité
              </li>
            </ol>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F1B3D] tracking-tight">
            Politique de confidentialité
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">
            La Fédération des Industries Ferroviaires (FIF) accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité décrit les données que nous collectons, comment nous les utilisons et les droits dont vous disposez.
          </p>

          <h2 className="text-xl font-bold text-[#0F1B3D] mt-8 mb-4">Responsable du traitement</h2>
          <ul className="text-gray-600 space-y-1 mb-6 list-none pl-0">
            <li><strong>Organisme :</strong> Fédération des Industries Ferroviaires (FIF)</li>
            <li><strong>Adresse :</strong> {SITE_CONFIG.contact.address}</li>
            <li><strong>Email :</strong> {SITE_CONFIG.contact.email}</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0F1B3D] mt-8 mb-4">Données collectées</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Nous collectons uniquement les données que vous nous transmettez volontairement via le formulaire de contact :
          </p>
          <ul className="text-gray-600 space-y-1 mb-6">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Organisme / entreprise</li>
            <li>Message</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0F1B3D] mt-8 mb-4">Finalités du traitement</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Les données collectées sont utilisées exclusivement pour répondre à vos demandes de contact et d&apos;information concernant les activités du CORIFER et de la FIF.
          </p>

          <h2 className="text-xl font-bold text-[#0F1B3D] mt-8 mb-4">Base légale</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Le traitement de vos données est fondé sur votre consentement (article 6.1.a du RGPD), exprimé lors de l&apos;envoi du formulaire de contact.
          </p>

          <h2 className="text-xl font-bold text-[#0F1B3D] mt-8 mb-4">Durée de conservation</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Vos données personnelles sont conservées pendant une durée de 3 ans à compter de votre dernier contact, puis supprimées.
          </p>

          <h2 className="text-xl font-bold text-[#0F1B3D] mt-8 mb-4">Destinataires des données</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Vos données sont destinées uniquement aux équipes de la FIF en charge du CORIFER. Elles ne sont ni vendues, ni partagées avec des tiers à des fins commerciales.
          </p>

          <h2 className="text-xl font-bold text-[#0F1B3D] mt-8 mb-4">Cookies</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Ce site utilise uniquement des cookies techniques strictement nécessaires à son fonctionnement. Aucun cookie de traçage publicitaire n&apos;est déposé.
          </p>

          <h2 className="text-xl font-bold text-[#0F1B3D] mt-8 mb-4">Vos droits</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
          </p>
          <ul className="text-gray-600 space-y-1 mb-4">
            <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-6">
            Pour exercer ces droits, contactez-nous à : <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-[#2563EB] hover:underline">{SITE_CONFIG.contact.email}</a>
          </p>

          <h2 className="text-xl font-bold text-[#0F1B3D] mt-8 mb-4">Réclamation</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Si vous estimez que le traitement de vos données n&apos;est pas conforme à la réglementation, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">www.cnil.fr</a>.
          </p>

          <p className="text-sm text-gray-400 mt-12">
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </section>
    </>
  )
}
