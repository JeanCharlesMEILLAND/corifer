'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

// Same data as actualites page - will be replaced by DB fetching
const ARTICLES: Record<string, {
  title: string
  excerpt: string
  content: string
  date: string
  categoryLabel: string
  category: 'evenements' | 'annonces' | 'articles'
  image?: string
}> = {
  'journee-nationale-innovation-ferroviaire-2024': {
    title: 'Journée nationale de l\'innovation ferroviaire 2024',
    excerpt: 'Le CORIFER organise la première édition de la Journée nationale de l\'innovation ferroviaire.',
    content: `Le CORIFER organise la première édition de la Journée nationale de l'innovation ferroviaire, réunissant l'ensemble des acteurs de la filière autour des grands défis technologiques.

Cet événement majeur rassemblera industriels, opérateurs, centres de recherche, startups et représentants de l'État pour dresser un panorama complet des avancées technologiques du secteur ferroviaire français.

Au programme :
- Conférences plénières sur les 4 axes stratégiques de la feuille de route
- Ateliers thématiques : hydrogène, IA embarquée, infrastructure connectée
- Exposition de démonstrateurs et prototypes
- Sessions de networking et speed-dating projets
- Remise des Prix de l'Innovation Ferroviaire 2024

Plus de 300 participants attendus pour cette journée qui marque un tournant dans la coordination de la R&I ferroviaire en France.`,
    date: '15 mars 2024',
    categoryLabel: 'Événement',
    category: 'evenements',
    image: '/images/news-conference.jpg',
  },
  'salon-innotrans-2024-berlin': {
    title: 'Salon InnoTrans 2024 - Berlin',
    excerpt: 'Retrouvez la délégation française au salon mondial du transport ferroviaire.',
    content: `Retrouvez la délégation française au salon mondial du transport ferroviaire InnoTrans 2024 à Berlin. Le CORIFER coordonne la présence des acteurs de la R&I française sur le pavillon France.

InnoTrans est le plus grand salon mondial dédié au transport ferroviaire, réunissant plus de 3 000 exposants de 60 pays. L'édition 2024 mettra particulièrement en avant les innovations en matière de décarbonation et de digitalisation.

La délégation CORIFER présentera :
- Les résultats des projets soutenus dans le cadre de France 2030
- La feuille de route R&I actualisée de la filière
- Les opportunités de collaboration internationale
- Les appels à projets en cours et à venir

Rendez-vous du 24 au 27 septembre 2024 à Berlin Messe, Hall 2.2, Stand France.`,
    date: '24-27 septembre 2024',
    categoryLabel: 'Événement',
    category: 'evenements',
    image: '/images/news-cargo-sorting.jpg',
  },
  'comite-pilotage-corifer-juin-2024': {
    title: 'Comité de pilotage CORIFER',
    excerpt: 'Réunion du comité de pilotage du CORIFER pour le suivi de la feuille de route stratégique.',
    content: `Réunion du comité de pilotage du CORIFER pour le suivi de la feuille de route stratégique et l'examen des projets en cours de la filière ferroviaire.

Le comité de pilotage a examiné l'avancement des 28 projets en cours, validé 3 nouvelles orientations stratégiques et approuvé le lancement de 2 nouveaux appels à projets pour le second semestre 2024.

Points clés abordés :
- Bilan d'avancement des projets France 2030
- Validation du budget R&I 2025
- Nouvelles collaborations européennes
- Préparation du Forum CORIFER 2025`,
    date: '12 juin 2024',
    categoryLabel: 'Événement',
    category: 'evenements',
    image: '/images/news-meeting.jpg',
  },
  'workshop-decarbonation-ferroviaire': {
    title: 'Workshop Décarbonation ferroviaire',
    excerpt: 'Atelier de travail dédié aux solutions de décarbonation du matériel roulant.',
    content: `Atelier de travail dédié aux solutions de décarbonation du matériel roulant : hydrogène, batteries, biocarburants et solutions hybrides pour le réseau non électrifié.

Cet atelier technique réunit les experts de la filière pour faire le point sur les différentes technologies de propulsion alternative et définir les priorités de recherche pour les années à venir.

Thématiques abordées :
- Piles à combustible hydrogène : retours d'expérience des projets pilotes
- Batteries haute densité pour autorails régionaux
- Biocarburants et e-fuels : quelle place dans le mix énergétique ferroviaire ?
- Hybridation et gestion intelligente de l'énergie embarquée
- Infrastructures de recharge et d'avitaillement`,
    date: '8 novembre 2024',
    categoryLabel: 'Événement',
    category: 'evenements',
    image: '/images/news-hydrogen.jpg',
  },
  'lancement-ami-trains-autonomes-2024': {
    title: 'Lancement de l\'AMI Trains autonomes 2024',
    excerpt: 'Le CORIFER lance un appel à manifestation d\'intérêt dédié au développement des technologies d\'automatisation.',
    content: `Le CORIFER lance un appel à manifestation d'intérêt dédié au développement des technologies d'automatisation et de conduite autonome pour le transport ferroviaire.

Cet AMI vise à soutenir des projets innovants dans le domaine de l'automatisation ferroviaire, couvrant les niveaux GOA 2 à GOA 4.

Sont éligibles les projets portant sur :
- Systèmes de perception et détection d'obstacles
- Intelligence artificielle pour la conduite autonome
- Certification et homologation des systèmes automatisés
- Cybersécurité des trains connectés
- Supervision et téléconduite

Date limite de dépôt : 30 juin 2024
Budget indicatif : 15 M€`,
    date: '22 janvier 2024',
    categoryLabel: 'Annonce',
    category: 'annonces',
    image: '/images/news-freight-landscape.jpg',
  },
  'resultats-aap-france-2030': {
    title: 'Résultats de l\'appel à projets France 2030',
    excerpt: '12 projets retenus pour un financement total de 45 M€.',
    content: `Découvrez les lauréats de la vague 2 de l'appel à projets France 2030 dédié à l'innovation dans le secteur ferroviaire. 12 projets retenus pour un financement total de 45 M€.

Ces projets couvrent les 4 axes stratégiques de la feuille de route CORIFER et impliquent plus de 40 partenaires industriels et académiques.

Répartition par axe :
- Trains intelligents : 4 projets (18 M€)
- Décarbonation : 3 projets (12 M€)
- Infrastructure résiliente : 3 projets (9 M€)
- Compétitivité industrielle : 2 projets (6 M€)`,
    date: '5 mars 2024',
    categoryLabel: 'Annonce',
    category: 'annonces',
    image: '/images/news-presentation.jpg',
  },
  'partenariat-railenium': {
    title: 'Nouveau partenariat avec Railenium',
    excerpt: 'Convention de partenariat pour renforcer la synergie entre recherche académique et besoins industriels.',
    content: `Le CORIFER et l'IRT Railenium signent une convention de partenariat pour renforcer la synergie entre recherche académique et besoins industriels de la filière ferroviaire.

Ce partenariat stratégique permettra de :
- Mutualiser les moyens d'essai et les plateformes de test
- Coordonner les feuilles de route R&I respectives
- Faciliter le transfert de technologies vers l'industrie
- Développer des formations conjointes pour les ingénieurs de la filière`,
    date: '18 avril 2024',
    categoryLabel: 'Annonce',
    category: 'annonces',
    image: '/images/freight-yard.jpg',
  },
  'feuille-de-route-actualisee': {
    title: 'Publication de la feuille de route actualisée',
    excerpt: 'La feuille de route stratégique R&I mise à jour pour intégrer les nouveaux enjeux.',
    content: `La feuille de route stratégique R&I de la filière ferroviaire a été mise à jour pour intégrer les nouveaux enjeux de cybersécurité et de souveraineté numérique.

Principales évolutions :
- Ajout d'un volet cybersécurité transverse aux 4 axes
- Renforcement des objectifs de décarbonation alignés sur le Green Deal européen
- Intégration des recommandations du rapport sur la souveraineté numérique
- Mise à jour du calendrier des jalons 2025-2030`,
    date: '10 septembre 2024',
    categoryLabel: 'Annonce',
    category: 'annonces',
    image: '/images/freight-containers.jpg',
  },
  'hydrogene-ferroviaire-etat-des-lieux': {
    title: 'L\'hydrogène dans le ferroviaire : état des lieux',
    excerpt: 'Analyse complète des technologies hydrogène pour la traction ferroviaire.',
    content: `Analyse complète des technologies hydrogène pour la traction ferroviaire : piles à combustible, stockage embarqué, infrastructure de production et distribution.

L'hydrogène représente une alternative crédible au diesel pour les 5 000 km de lignes non électrifiées en France. Cet article fait le point sur les avancées technologiques et les défis restants.

Points clés :
- Les piles à combustible atteignent désormais des puissances de 400 kW
- Le stockage à 700 bar permet des autonomies de 600 km
- Le coût du kWh hydrogène vert reste un défi (encore 2x le diesel)
- 3 projets pilotes en cours en France (HYDRAIL, H2Rail, GreenTER)`,
    date: '12 février 2024',
    categoryLabel: 'Article',
    category: 'articles',
    image: '/images/news-hydrogen.jpg',
  },
  'ia-maintenance-predictive': {
    title: 'Intelligence artificielle et maintenance prédictive',
    excerpt: 'Comment l\'IA transforme la maintenance du matériel roulant et de l\'infrastructure.',
    content: `Comment l'IA transforme la maintenance du matériel roulant et de l'infrastructure : capteurs IoT, jumeaux numériques et algorithmes de prédiction des défaillances.

La maintenance prédictive basée sur l'IA permet de réduire les coûts de maintenance de 25% tout en améliorant la disponibilité du matériel roulant.

Technologies clés :
- Capteurs vibratoires et acoustiques embarqués
- Analyse d'images par vision artificielle (rails, caténaires)
- Jumeaux numériques pour la simulation de vieillissement
- Algorithmes de machine learning pour la prédiction de pannes`,
    date: '28 mars 2024',
    categoryLabel: 'Article',
    category: 'articles',
    image: '/images/news-locomotive.jpg',
  },
  'reseau-ferroviaire-decarbone': {
    title: 'Vers un réseau ferroviaire 100% décarboné',
    excerpt: 'Panorama des solutions technologiques pour atteindre la neutralité carbone.',
    content: `Panorama des solutions technologiques pour atteindre la neutralité carbone du transport ferroviaire à horizon 2050 : électrification, énergies alternatives et efficacité énergétique.

Le ferroviaire est déjà le mode de transport le plus sobre en carbone, mais des efforts restent nécessaires pour décarboner les 40% du réseau non électrifié.

Leviers identifiés :
- Électrification ciblée des lignes à fort trafic
- Déploiement de trains à hydrogène sur les lignes régionales
- Batteries pour les manœuvres et derniers kilomètres
- Éco-conduite assistée par IA (-30% de consommation)
- Récupération d'énergie au freinage`,
    date: '15 mai 2024',
    categoryLabel: 'Article',
    category: 'articles',
    image: '/images/news-tank-cars.jpg',
  },
  'enjeux-ertms-france': {
    title: 'Les enjeux de l\'ERTMS en France',
    excerpt: 'Le déploiement du système européen de gestion du trafic ferroviaire en France.',
    content: `Le déploiement du système européen de gestion du trafic ferroviaire (ERTMS) en France : calendrier, défis techniques, interopérabilité et bénéfices attendus pour la filière.

L'ERTMS est un système de signalisation standardisé à l'échelle européenne qui remplacera progressivement les systèmes nationaux existants.

Enjeux majeurs :
- Interopérabilité avec les 27 systèmes nationaux existants
- Coût de déploiement estimé à 15 milliards d'euros pour la France
- Augmentation de la capacité réseau de 20 à 40%
- Amélioration de la sécurité et réduction des incidents
- Calendrier de déploiement : 2025-2040`,
    date: '3 juillet 2024',
    categoryLabel: 'Article',
    category: 'articles',
    image: '/images/hero-freight.jpg',
  },
}

function categoryBadgeVariant(cat: string): 'info' | 'purple' | 'success' {
  if (cat === 'evenements') return 'info'
  if (cat === 'annonces') return 'purple'
  return 'success'
}

export default function ArticleDetailPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const article = ARTICLES[slug]

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#111827' }}>Article introuvable</h1>
        <p className="mb-6" style={{ color: '#4B5563' }}>Cet article n&apos;existe pas ou a été déplacé.</p>
        <Button href="/actualites" variant="primary">Retour aux actualités</Button>
      </div>
    )
  }

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
              <li><Link href="/actualites" className="hover:text-white transition-colors">Actualités</Link></li>
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
              Retour aux actualités
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
