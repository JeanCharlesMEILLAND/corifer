import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CORIFER_ARTICLES = [
  {
    slug: 'journee-nationale-innovation-ferroviaire-2024',
    titleFr: 'Journée nationale de l\'innovation ferroviaire 2024',
    titleEn: 'National Railway Innovation Day 2024',
    excerptFr: 'Le CORIFER organise la première édition de la Journée nationale de l\'innovation ferroviaire, réunissant l\'ensemble des acteurs de la filière autour des grands défis technologiques.',
    excerptEn: 'CORIFER organizes the first National Railway Innovation Day, bringing together all stakeholders around major technological challenges.',
    contentFr: `Le CORIFER organise la première édition de la Journée nationale de l'innovation ferroviaire, réunissant l'ensemble des acteurs de la filière autour des grands défis technologiques.

Cet événement majeur rassemblera industriels, opérateurs, centres de recherche, startups et représentants de l'État pour dresser un panorama complet des avancées technologiques du secteur ferroviaire français.

Au programme :
- Conférences plénières sur les 4 axes stratégiques de la feuille de route
- Ateliers thématiques : hydrogène, IA embarquée, infrastructure connectée
- Exposition de démonstrateurs et prototypes
- Sessions de networking et speed-dating projets
- Remise des Prix de l'Innovation Ferroviaire 2024

Plus de 300 participants attendus pour cette journée qui marque un tournant dans la coordination de la R&I ferroviaire en France.`,
    contentEn: 'CORIFER organizes the first National Railway Innovation Day.',
    category: 'evenement',
    date: new Date('2024-03-15'),
    imageUrl: '/images/news-conference.jpg',
    source: 'corifer',
    coriferCategory: 'evenement',
    featured: true,
  },
  {
    slug: 'salon-innotrans-2024-berlin',
    titleFr: 'Salon InnoTrans 2024 - Berlin',
    titleEn: 'InnoTrans 2024 Trade Show - Berlin',
    excerptFr: 'Retrouvez la délégation française au salon mondial du transport ferroviaire. Le CORIFER coordonne la présence des acteurs de la R&I française sur le pavillon France.',
    excerptEn: 'Meet the French delegation at the world\'s largest railway trade show.',
    contentFr: `Retrouvez la délégation française au salon mondial du transport ferroviaire InnoTrans 2024 à Berlin. Le CORIFER coordonne la présence des acteurs de la R&I française sur le pavillon France.

InnoTrans est le plus grand salon mondial dédié au transport ferroviaire, réunissant plus de 3 000 exposants de 60 pays.

La délégation CORIFER présentera :
- Les résultats des projets soutenus dans le cadre de France 2030
- La feuille de route R&I actualisée de la filière
- Les opportunités de collaboration internationale
- Les appels à projets en cours et à venir

Rendez-vous du 24 au 27 septembre 2024 à Berlin Messe, Hall 2.2, Stand France.`,
    contentEn: 'Meet the French delegation at InnoTrans 2024 in Berlin.',
    category: 'evenement',
    date: new Date('2024-09-24'),
    imageUrl: '/images/news-cargo-sorting.jpg',
    source: 'corifer',
    coriferCategory: 'evenement',
    featured: false,
  },
  {
    slug: 'comite-pilotage-corifer-juin-2024',
    titleFr: 'Comité de pilotage CORIFER',
    titleEn: 'CORIFER Steering Committee',
    excerptFr: 'Réunion du comité de pilotage du CORIFER pour le suivi de la feuille de route stratégique et l\'examen des projets en cours de la filière ferroviaire.',
    excerptEn: 'CORIFER steering committee meeting for strategic roadmap follow-up.',
    contentFr: `Réunion du comité de pilotage du CORIFER pour le suivi de la feuille de route stratégique et l'examen des projets en cours de la filière ferroviaire.

Le comité de pilotage a examiné l'avancement des 28 projets en cours, validé 3 nouvelles orientations stratégiques et approuvé le lancement de 2 nouveaux appels à projets pour le second semestre 2024.

Points clés abordés :
- Bilan d'avancement des projets France 2030
- Validation du budget R&I 2025
- Nouvelles collaborations européennes
- Préparation du Forum CORIFER 2025`,
    contentEn: 'CORIFER steering committee meeting.',
    category: 'evenement',
    date: new Date('2024-06-12'),
    imageUrl: '/images/news-meeting.jpg',
    source: 'corifer',
    coriferCategory: 'evenement',
    featured: false,
  },
  {
    slug: 'workshop-decarbonation-ferroviaire',
    titleFr: 'Workshop Décarbonation ferroviaire',
    titleEn: 'Railway Decarbonization Workshop',
    excerptFr: 'Atelier de travail dédié aux solutions de décarbonation du matériel roulant : hydrogène, batteries, biocarburants et solutions hybrides pour le réseau non électrifié.',
    excerptEn: 'Workshop dedicated to rolling stock decarbonization solutions.',
    contentFr: `Atelier de travail dédié aux solutions de décarbonation du matériel roulant : hydrogène, batteries, biocarburants et solutions hybrides pour le réseau non électrifié.

Thématiques abordées :
- Piles à combustible hydrogène : retours d'expérience des projets pilotes
- Batteries haute densité pour autorails régionaux
- Biocarburants et e-fuels : quelle place dans le mix énergétique ferroviaire ?
- Hybridation et gestion intelligente de l'énergie embarquée
- Infrastructures de recharge et d'avitaillement`,
    contentEn: 'Workshop on railway decarbonization solutions.',
    category: 'evenement',
    date: new Date('2024-11-08'),
    imageUrl: '/images/news-hydrogen.jpg',
    source: 'corifer',
    coriferCategory: 'evenement',
    featured: false,
  },
  {
    slug: 'lancement-ami-trains-autonomes-2024',
    titleFr: 'Lancement de l\'AMI Trains autonomes 2024',
    titleEn: 'Launch of Autonomous Trains Call for Interest 2024',
    excerptFr: 'Le CORIFER lance un appel à manifestation d\'intérêt dédié au développement des technologies d\'automatisation et de conduite autonome pour le transport ferroviaire.',
    excerptEn: 'CORIFER launches a call for interest for autonomous train technologies.',
    contentFr: `Le CORIFER lance un appel à manifestation d'intérêt dédié au développement des technologies d'automatisation et de conduite autonome pour le transport ferroviaire.

Sont éligibles les projets portant sur :
- Systèmes de perception et détection d'obstacles
- Intelligence artificielle pour la conduite autonome
- Certification et homologation des systèmes automatisés
- Cybersécurité des trains connectés
- Supervision et téléconduite

Date limite de dépôt : 30 juin 2024
Budget indicatif : 15 M€`,
    contentEn: 'CORIFER launches a call for interest for autonomous train technologies.',
    category: 'communique',
    date: new Date('2024-01-22'),
    imageUrl: '/images/news-freight-landscape.jpg',
    source: 'corifer',
    coriferCategory: 'annonce',
    featured: true,
  },
  {
    slug: 'resultats-aap-france-2030',
    titleFr: 'Résultats de l\'appel à projets France 2030',
    titleEn: 'France 2030 Call for Projects Results',
    excerptFr: '12 projets retenus pour un financement total de 45 M€ dans le cadre de l\'appel à projets France 2030 dédié à l\'innovation ferroviaire.',
    excerptEn: '12 projects selected for a total funding of €45M.',
    contentFr: `Découvrez les lauréats de la vague 2 de l'appel à projets France 2030 dédié à l'innovation dans le secteur ferroviaire. 12 projets retenus pour un financement total de 45 M€.

Répartition par axe :
- Trains intelligents : 4 projets (18 M€)
- Décarbonation : 3 projets (12 M€)
- Infrastructure résiliente : 3 projets (9 M€)
- Compétitivité industrielle : 2 projets (6 M€)`,
    contentEn: '12 projects selected for France 2030 funding.',
    category: 'communique',
    date: new Date('2024-03-05'),
    imageUrl: '/images/news-presentation.jpg',
    source: 'corifer',
    coriferCategory: 'annonce',
    featured: false,
  },
  {
    slug: 'partenariat-railenium',
    titleFr: 'Nouveau partenariat avec Railenium',
    titleEn: 'New Partnership with Railenium',
    excerptFr: 'Le CORIFER et l\'IRT Railenium signent une convention de partenariat pour renforcer la synergie entre recherche académique et besoins industriels.',
    excerptEn: 'CORIFER and IRT Railenium sign a partnership agreement.',
    contentFr: `Le CORIFER et l'IRT Railenium signent une convention de partenariat pour renforcer la synergie entre recherche académique et besoins industriels de la filière ferroviaire.

Ce partenariat stratégique permettra de :
- Mutualiser les moyens d'essai et les plateformes de test
- Coordonner les feuilles de route R&I respectives
- Faciliter le transfert de technologies vers l'industrie
- Développer des formations conjointes`,
    contentEn: 'CORIFER and IRT Railenium sign a partnership agreement.',
    category: 'communique',
    date: new Date('2024-04-18'),
    imageUrl: '/images/freight-yard.jpg',
    source: 'corifer',
    coriferCategory: 'annonce',
    featured: false,
  },
  {
    slug: 'feuille-de-route-actualisee',
    titleFr: 'Publication de la feuille de route actualisée',
    titleEn: 'Updated Roadmap Publication',
    excerptFr: 'La feuille de route stratégique R&I mise à jour pour intégrer les nouveaux enjeux de cybersécurité et de souveraineté numérique.',
    excerptEn: 'Updated R&I strategic roadmap.',
    contentFr: `La feuille de route stratégique R&I de la filière ferroviaire a été mise à jour pour intégrer les nouveaux enjeux de cybersécurité et de souveraineté numérique.

Principales évolutions :
- Ajout d'un volet cybersécurité transverse aux 4 axes
- Renforcement des objectifs de décarbonation
- Intégration des recommandations sur la souveraineté numérique
- Mise à jour du calendrier des jalons 2025-2030`,
    contentEn: 'Updated R&I strategic roadmap.',
    category: 'communique',
    date: new Date('2024-09-10'),
    imageUrl: '/images/freight-containers.jpg',
    source: 'corifer',
    coriferCategory: 'annonce',
    featured: false,
  },
  {
    slug: 'hydrogene-ferroviaire-etat-des-lieux',
    titleFr: 'L\'hydrogène dans le ferroviaire : état des lieux',
    titleEn: 'Hydrogen in Railways: Current State',
    excerptFr: 'Analyse complète des technologies hydrogène pour la traction ferroviaire : piles à combustible, stockage embarqué, infrastructure.',
    excerptEn: 'Comprehensive analysis of hydrogen technologies for railway traction.',
    contentFr: `Analyse complète des technologies hydrogène pour la traction ferroviaire : piles à combustible, stockage embarqué, infrastructure de production et distribution.

Points clés :
- Les piles à combustible atteignent des puissances de 400 kW
- Le stockage à 700 bar permet des autonomies de 600 km
- Le coût du kWh hydrogène vert reste un défi
- 3 projets pilotes en cours en France`,
    contentEn: 'Hydrogen technologies for railway traction.',
    category: 'communique',
    date: new Date('2024-02-12'),
    imageUrl: '/images/news-hydrogen.jpg',
    source: 'corifer',
    coriferCategory: 'article',
    featured: false,
  },
  {
    slug: 'ia-maintenance-predictive',
    titleFr: 'Intelligence artificielle et maintenance prédictive',
    titleEn: 'AI and Predictive Maintenance',
    excerptFr: 'Comment l\'IA transforme la maintenance du matériel roulant et de l\'infrastructure ferroviaire.',
    excerptEn: 'How AI transforms rolling stock and infrastructure maintenance.',
    contentFr: `Comment l'IA transforme la maintenance du matériel roulant et de l'infrastructure : capteurs IoT, jumeaux numériques et algorithmes de prédiction des défaillances.

Technologies clés :
- Capteurs vibratoires et acoustiques embarqués
- Analyse d'images par vision artificielle
- Jumeaux numériques pour la simulation de vieillissement
- Algorithmes de machine learning pour la prédiction de pannes`,
    contentEn: 'How AI transforms railway maintenance.',
    category: 'communique',
    date: new Date('2024-03-28'),
    imageUrl: '/images/news-locomotive.jpg',
    source: 'corifer',
    coriferCategory: 'article',
    featured: false,
  },
  {
    slug: 'reseau-ferroviaire-decarbone',
    titleFr: 'Vers un réseau ferroviaire 100% décarboné',
    titleEn: 'Towards a 100% Decarbonized Railway Network',
    excerptFr: 'Panorama des solutions technologiques pour atteindre la neutralité carbone du transport ferroviaire à horizon 2050.',
    excerptEn: 'Technology solutions for carbon-neutral rail transport by 2050.',
    contentFr: `Panorama des solutions technologiques pour atteindre la neutralité carbone du transport ferroviaire à horizon 2050.

Leviers identifiés :
- Électrification ciblée des lignes à fort trafic
- Déploiement de trains à hydrogène sur les lignes régionales
- Batteries pour les manœuvres et derniers kilomètres
- Éco-conduite assistée par IA
- Récupération d'énergie au freinage`,
    contentEn: 'Solutions for carbon-neutral rail transport.',
    category: 'communique',
    date: new Date('2024-05-15'),
    imageUrl: '/images/news-tank-cars.jpg',
    source: 'corifer',
    coriferCategory: 'article',
    featured: false,
  },
  {
    slug: 'enjeux-ertms-france',
    titleFr: 'Les enjeux de l\'ERTMS en France',
    titleEn: 'ERTMS Challenges in France',
    excerptFr: 'Le déploiement du système européen de gestion du trafic ferroviaire en France : calendrier, défis techniques et bénéfices attendus.',
    excerptEn: 'ERTMS deployment in France: timeline and technical challenges.',
    contentFr: `Le déploiement du système européen de gestion du trafic ferroviaire (ERTMS) en France : calendrier, défis techniques, interopérabilité et bénéfices attendus.

Enjeux majeurs :
- Interopérabilité avec les 27 systèmes nationaux existants
- Coût de déploiement estimé à 15 milliards d'euros
- Augmentation de la capacité réseau de 20 à 40%
- Amélioration de la sécurité
- Calendrier de déploiement : 2025-2040`,
    contentEn: 'ERTMS deployment challenges in France.',
    category: 'communique',
    date: new Date('2024-07-03'),
    imageUrl: '/images/hero-freight.jpg',
    source: 'corifer',
    coriferCategory: 'article',
    featured: false,
  },
]

async function main() {
  console.log('Seeding CORIFER articles...')

  for (const article of CORIFER_ARTICLES) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        ...article,
      },
      create: {
        ...article,
      },
    })
    console.log(`  ✓ ${article.slug}`)
  }

  console.log(`\nDone! ${CORIFER_ARTICLES.length} articles seeded.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
