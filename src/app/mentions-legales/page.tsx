import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Mentions légales',
}

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Breadcrumb header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-10">
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
                Mentions légales
              </li>
            </ol>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F1B3D] tracking-tight">
            Mentions légales
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Informations légales du site corifer.fr
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 lg:p-14">
            <h2 className="text-lg font-bold text-[#0F1B3D] mb-4 pb-2 border-b border-gray-100">Éditeur du site</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
              Le site <strong>corifer.fr</strong> est édité par la <strong>Fédération des Industries Ferroviaires (FIF)</strong>, syndicat professionnel régi par la loi du 21 mars 1884.
            </p>
            <ul className="text-gray-600 space-y-2 mb-8 list-none pl-0 text-[15px]">
              <li><strong>Siège social :</strong> {SITE_CONFIG.contact.address}</li>
              <li><strong>Téléphone :</strong> {SITE_CONFIG.contact.phone}</li>
              <li><strong>Email :</strong> {SITE_CONFIG.contact.email}</li>
            </ul>

            <h2 className="text-lg font-bold text-[#0F1B3D] mt-10 mb-4 pb-2 border-b border-gray-100">Directeur de la publication</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              Le directeur de la publication est le Président de la FIF.
            </p>

            <h2 className="text-lg font-bold text-[#0F1B3D] mt-10 mb-4 pb-2 border-b border-gray-100">Hébergement</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              Ce site est hébergé par <strong>Vercel Inc.</strong>, 440 N Baxter St, Coppell, TX 75019, États-Unis.
            </p>

            <h2 className="text-lg font-bold text-[#0F1B3D] mt-10 mb-4 pb-2 border-b border-gray-100">Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              L&apos;ensemble du contenu de ce site (textes, images, graphiques, logo, icônes, etc.) est la propriété exclusive de la FIF ou de ses partenaires. Toute reproduction, représentation, modification, publication, distribution ou retransmission, totale ou partielle, est interdite sans l&apos;autorisation écrite préalable de la FIF.
            </p>

            <h2 className="text-lg font-bold text-[#0F1B3D] mt-10 mb-4 pb-2 border-b border-gray-100">Responsabilité</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              La FIF s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, elle ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition. En conséquence, la FIF décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
            </p>

            <h2 className="text-lg font-bold text-[#0F1B3D] mt-10 mb-4 pb-2 border-b border-gray-100">Liens hypertextes</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              Le site peut contenir des liens vers d&apos;autres sites internet. La FIF ne dispose d&apos;aucun moyen de contrôle du contenu de ces sites tiers et n&apos;assume aucune responsabilité quant à leur contenu.
            </p>

            <h2 className="text-lg font-bold text-[#0F1B3D] mt-10 mb-4 pb-2 border-b border-gray-100">Crédits</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
              Conception et développement : FIF.<br />
              Photographies : droits réservés.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
