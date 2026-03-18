import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================
// CORIFER Comprehensive Seed Script
// Seeds: StrategicAxes, Projects, CallsForProject, Documents,
//        Partners, TeamMembers, KeyFigures, FundingDevices
// ============================================================

async function main() {
  console.log('=== CORIFER Seed Script ===')
  console.log('')

  // ──────────────────────────────────────────────
  // 1. Strategic Axes (4 records)
  // ──────────────────────────────────────────────
  console.log('1/8 - Seeding CoriferStrategicAxis...')

  const axesData = [
    {
      slug: 'trains-intelligents',
      name: 'Trains intelligents',
      color: '#2563EB',
      icon: 'brain',
      description:
        "Développer l'autonomie, la connectivité et l'IA embarquée pour des trains plus sûrs, plus performants et plus intelligents.",
      priorities: JSON.stringify([
        'Train autonome et conduite assistée',
        'Maintenance prédictive par IA',
        'Déploiement ERTMS et signalisation avancée',
        'Cybersécurité des systèmes ferroviaires',
      ]),
      order: 0,
    },
    {
      slug: 'decarbonation',
      name: 'Décarbonation',
      color: '#10B981',
      icon: 'leaf',
      description:
        'Accélérer la transition énergétique du ferroviaire pour un transport décarboné et durable à horizon 2030.',
      priorities: JSON.stringify([
        'Traction hydrogène et piles à combustible',
        'Batteries haute densité et recharge rapide',
        "Efficacité énergétique et récupération d'énergie",
        'Éco-conception et cycle de vie des matériels',
      ]),
      order: 1,
    },
    {
      slug: 'infrastructure',
      name: 'Infrastructure résiliente',
      color: '#F59E0B',
      icon: 'building',
      description:
        'Moderniser et adapter les infrastructures ferroviaires pour répondre aux défis climatiques et aux nouveaux usages.',
      priorities: JSON.stringify([
        'Voie intelligente et capteurs embarqués',
        'Supervision et jumeau numérique du réseau',
        'Résilience climatique des infrastructures',
        'BIM ferroviaire et modélisation 3D',
      ]),
      order: 2,
    },
    {
      slug: 'competitivite',
      name: 'Compétitivité industrielle',
      color: '#8B5CF6',
      icon: 'trophy',
      description:
        'Renforcer la compétitivité de la filière industrielle ferroviaire française sur les marchés nationaux et internationaux.',
      priorities: JSON.stringify([
        'Industrie 4.0 et usines connectées',
        'Jumeaux numériques de production',
        'Nouveaux matériaux et procédés avancés',
        'Stratégie export et normalisation européenne',
      ]),
      order: 3,
    },
  ]

  const axisMap: Record<string, string> = {}

  for (const axis of axesData) {
    const record = await prisma.coriferStrategicAxis.upsert({
      where: { slug: axis.slug },
      update: {
        name: axis.name,
        color: axis.color,
        icon: axis.icon,
        description: axis.description,
        priorities: axis.priorities,
        order: axis.order,
      },
      create: axis,
    })
    axisMap[axis.slug] = record.id
    console.log(`   - ${axis.name} (${record.id})`)
  }

  console.log(`   Done: ${axesData.length} axes.`)
  console.log('')

  // ──────────────────────────────────────────────
  // 2. Projects (6 records)
  // ──────────────────────────────────────────────
  console.log('2/8 - Seeding CoriferProject...')

  const projectsData = [
    // DRAISY - full detail from ProjectDetailClient.tsx
    {
      slug: 'draisy',
      acronym: 'DRAISY',
      title: 'Train autonome urbain',
      description:
        "Le projet DRAISY vise à développer et valider une solution complète de train autonome pour les liaisons urbaines et périurbaines. Il combine intelligence artificielle embarquée, capteurs de perception avancés et systèmes de décision temps réel pour atteindre un niveau d'autonomie GOA 3/4 sur des lignes dédiées.",
      objectives: JSON.stringify([
        "Développer un système de perception multi-capteurs (LiDAR, caméras, radar) pour la détection d'obstacles en milieu ferroviaire urbain",
        'Concevoir une architecture de décision temps réel certifiable selon les normes CENELEC (EN 50128/50129)',
        "Valider le système sur un démonstrateur à échelle 1 en conditions réelles sur une ligne test dédiée",
        "Préparer le cadre réglementaire et normatif pour l'homologation de trains autonomes en France",
      ]),
      keywords: JSON.stringify([
        'Automatisation',
        'Intelligence artificielle',
        'GOA 3/4',
        'Perception',
        'Sécurité ferroviaire',
      ]),
      axisId: '', // will be resolved
      _axisSlug: 'trains-intelligents',
      trl: 6,
      trlLabel: 'Prototype en environnement pertinent',
      status: 'en-cours',
      progress: 65,
      startDate: 'Janvier 2023',
      endDate: 'Décembre 2025',
      duration: '36 mois',
      budgetTotal: '4 200 k€',
      budgetCorifer: '1 260 k€',
      leadName: 'Alstom Transport',
      leadOrg: 'Alstom',
      partners: JSON.stringify([
        { name: 'Alstom Transport', type: 'Industriel' },
        { name: 'SNCF Voyageurs', type: 'Opérateur' },
        { name: 'IRT Railenium', type: 'Recherche' },
        { name: 'INRIA', type: 'Recherche' },
        { name: 'Université Gustave Eiffel', type: 'Académique' },
        { name: 'Thales', type: 'Industriel' },
      ]),
      progressSummary:
        "Le projet a atteint les jalons clés des phases 1 et 2 : conception système validée, développement logiciel de perception opérationnel, et premiers tests sur voie d'essai. La phase 3 (validation terrain) est en cours avec des essais nocturnes sur la ligne pilote.",
      deliverables: JSON.stringify([
        { title: 'D1.3 - Spécification système de perception', type: 'PDF' },
        { title: 'D2.1 - Architecture logicielle embarquée', type: 'PDF' },
        { title: 'D2.4 - Rapport de tests unitaires', type: 'PDF' },
        { title: "D3.1 - Plan d'essais terrain (en cours)", type: 'PDF' },
      ]),
      publications: JSON.stringify([
        {
          title: 'Autonomous Train Perception in Urban Environments',
          venue: 'Transport Research Arena 2024',
        },
        {
          title: 'Safety-Critical AI for Railway Automation',
          venue: 'IEEE ITSC 2023',
        },
      ]),
      barriers: JSON.stringify([
        "Certification de l'IA embarquée selon les normes de sécurité ferroviaire CENELEC SIL 4",
        "Détection fiable d'obstacles en conditions dégradées (pluie, brouillard, nuit)",
        'Temps de réaction du système compatible avec les distances de freinage en milieu urbain',
        'Intégration avec les systèmes de signalisation existants (ERTMS, KVB)',
      ]),
      benefits: JSON.stringify([
        {
          icon: 'ecology',
          text: "Réduction de 30% de la consommation énergétique grâce à l'éco-conduite automatisée",
        },
        {
          icon: 'safety',
          text: 'Amélioration de la sécurité : suppression des erreurs humaines de conduite',
        },
        {
          icon: 'competitiveness',
          text: 'Augmentation de 15% de la capacité réseau par optimisation des intervalles',
        },
        {
          icon: 'jobs',
          text: 'Création de 200+ emplois qualifiés dans la filière IA ferroviaire en France',
        },
      ]),
      indicators: JSON.stringify([
        { label: 'Consommation énergétique', value: '-30% CO₂' },
        { label: 'Capacité réseau', value: '+15%' },
        { label: 'Ponctualité', value: '+8% estimé' },
        { label: 'Sécurité', value: 'SIL 4 visé' },
      ]),
      contactName: 'Dr. Marie Dupont',
      contactEmail: 'marie.dupont@alstom.com',
      contactRole: 'Chef de projet DRAISY',
      externalLinks: JSON.stringify([
        { label: 'Page projet Alstom', url: '#' },
        { label: 'IRT Railenium', url: '#' },
        { label: 'Programme France 2030', url: '#' },
      ]),
      fundingDevices: JSON.stringify([
        { name: 'France 2030', detail: 'i-Démo' },
        { name: 'CORIFER AMI', detail: 'AMI CORIFER 2023' },
      ]),
      featured: true,
      order: 0,
    },
    // HYDRAIL - full detail from ProjectDetailClient.tsx
    {
      slug: 'hydrail',
      acronym: 'HYDRAIL',
      title: 'Propulsion hydrogène régional',
      description:
        "HYDRAIL développe un système de propulsion hydrogène intégré pour les autorails régionaux, visant le remplacement des motorisations diesel sur les lignes non électrifiées. Le projet couvre la pile à combustible, le stockage embarqué et l'intégration véhicule.",
      objectives: JSON.stringify([
        'Développer une pile à combustible haute puissance (400 kW) adaptée aux contraintes ferroviaires',
        "Concevoir un système de stockage hydrogène embarqué sécurisé et certifiable",
        "Intégrer la chaîne de traction complète sur un prototype d'autorail régional existant",
        "Valider l'autonomie (600 km) et la disponibilité en conditions d'exploitation réelles",
      ]),
      keywords: JSON.stringify([
        'Hydrogène',
        'Pile à combustible',
        'Décarbonation',
        'Autorail',
        'Traction',
      ]),
      axisId: '',
      _axisSlug: 'decarbonation',
      trl: 5,
      trlLabel: 'Validation en environnement pertinent',
      status: 'en-cours',
      progress: 45,
      startDate: 'Mars 2023',
      endDate: 'Mars 2026',
      duration: '36 mois',
      budgetTotal: '8 500 k€',
      budgetCorifer: '2 550 k€',
      leadName: 'CAF France',
      leadOrg: 'CAF',
      partners: JSON.stringify([
        { name: 'CAF France', type: 'Industriel' },
        { name: 'Air Liquide', type: 'Industriel' },
        { name: 'CEA', type: 'Recherche' },
        { name: 'Région Occitanie', type: 'Collectivité' },
      ]),
      progressSummary:
        "La pile à combustible prototype a été livrée et testée en banc d'essai. L'intégration véhicule est en cours de préparation. Les premiers essais sur voie sont prévus pour le T2 2025.",
      deliverables: JSON.stringify([
        { title: 'D1.1 - Cahier des charges PAC ferroviaire', type: 'PDF' },
        { title: 'D2.1 - Rapport de tests banc PAC', type: 'PDF' },
      ]),
      publications: JSON.stringify([
        {
          title:
            'Hydrogen Fuel Cells for Regional Rail: Challenges and Opportunities',
          venue: 'World Hydrogen Summit 2024',
        },
      ]),
      barriers: JSON.stringify([
        "Durabilité de la pile à combustible sur 30 000+ heures d'exploitation",
        'Stockage hydrogène haute pression (700 bar) compatible avec les normes ferroviaires',
        'Coût du kWh hydrogène vs alternatives (batteries, biocarburants)',
      ]),
      benefits: JSON.stringify([
        {
          icon: 'ecology',
          text: 'Élimination totale des émissions directes CO₂ en exploitation',
        },
        {
          icon: 'safety',
          text: 'Réduction du bruit de 40% par rapport au diesel',
        },
        {
          icon: 'competitiveness',
          text: 'Solution compétitive pour les 5 000 km de lignes non électrifiées en France',
        },
        {
          icon: 'jobs',
          text: 'Structuration de la filière hydrogène ferroviaire française',
        },
      ]),
      indicators: JSON.stringify([
        { label: 'Émissions CO₂', value: '-100%' },
        { label: 'Autonomie visée', value: '600 km' },
        { label: 'Bruit', value: '-40%' },
        { label: 'Coût maintenance', value: '-25% estimé' },
      ]),
      contactName: 'Ing. Pierre Martin',
      contactEmail: 'pierre.martin@caf.net',
      contactRole: 'Chef de projet HYDRAIL',
      externalLinks: JSON.stringify([
        { label: 'Page projet CAF', url: '#' },
        { label: 'ADEME - Hydrogène', url: '#' },
      ]),
      fundingDevices: JSON.stringify([
        { name: 'ADEME', detail: 'Appel à projets Hydrogène' },
      ]),
      featured: true,
      order: 1,
    },
    // SMARTRAIL - basic data from listing
    {
      slug: 'smartrail',
      acronym: 'SMARTRAIL',
      title: 'Voie ferrée connectée',
      description:
        "Le projet SMARTRAIL vise à développer des solutions de voie ferrée connectée et instrumentée, intégrant des capteurs embarqués et des systèmes de supervision en temps réel pour améliorer la maintenance et la sécurité de l'infrastructure ferroviaire.",
      objectives: JSON.stringify([
        "Développer des capteurs embarqués pour la surveillance en temps réel de l'état de la voie",
        "Concevoir une plateforme de supervision intégrée pour la maintenance prédictive de l'infrastructure",
        'Valider les solutions sur un tronçon pilote en conditions réelles',
      ]),
      keywords: JSON.stringify([
        'Voie connectée',
        'Capteurs',
        'Infrastructure',
        'Maintenance prédictive',
      ]),
      axisId: '',
      _axisSlug: 'infrastructure',
      trl: 4,
      trlLabel: 'Validation en laboratoire',
      status: 'en-cours',
      progress: 30,
      startDate: 'Janvier 2024',
      endDate: 'Décembre 2026',
      duration: '36 mois',
      budgetTotal: '3 100 k€',
      budgetCorifer: '930 k€',
      leadName: 'SNCF Réseau',
      leadOrg: 'SNCF',
      partners: JSON.stringify([
        { name: 'SNCF Réseau', type: 'Opérateur' },
        { name: 'Vossloh', type: 'Industriel' },
        { name: 'Université Gustave Eiffel', type: 'Académique' },
      ]),
      progressSummary:
        "Le projet est en phase de développement des capteurs et de définition de l'architecture de supervision.",
      deliverables: JSON.stringify([
        { title: 'D1.1 - Spécifications capteurs', type: 'PDF' },
      ]),
      publications: JSON.stringify([]),
      barriers: JSON.stringify([
        "Intégration des capteurs dans l'environnement ferroviaire existant",
        'Fiabilité des communications en environnement perturbé',
      ]),
      benefits: JSON.stringify([
        {
          icon: 'safety',
          text: "Amélioration de la sécurité de l'infrastructure ferroviaire",
        },
        {
          icon: 'competitiveness',
          text: 'Réduction des coûts de maintenance par la prédiction des défaillances',
        },
      ]),
      indicators: JSON.stringify([
        { label: 'Indicateur principal', value: 'En cours de mesure' },
      ]),
      contactName: 'Contact projet',
      contactEmail: 'contact@corifer.fr',
      contactRole: 'Chef de projet SMARTRAIL',
      externalLinks: JSON.stringify([]),
      fundingDevices: JSON.stringify([
        { name: 'ANR', detail: 'Programme de recherche' },
      ]),
      featured: false,
      order: 2,
    },
    // GREENTRAIN - basic data from listing (terminé)
    {
      slug: 'greentrain',
      acronym: 'GREENTRAIN',
      title: 'Éco-conception du matériel roulant',
      description:
        "Le projet GREENTRAIN porte sur l'éco-conception du matériel roulant ferroviaire, visant à réduire l'empreinte environnementale sur l'ensemble du cycle de vie des trains : fabrication, exploitation et fin de vie.",
      objectives: JSON.stringify([
        "Développer une méthodologie d'éco-conception adaptée au matériel roulant ferroviaire",
        "Réduire de 20% l'empreinte carbone de fabrication des trains",
        'Améliorer la recyclabilité des composants en fin de vie',
      ]),
      keywords: JSON.stringify([
        'Éco-conception',
        'Cycle de vie',
        'Matériel roulant',
        'Recyclabilité',
        'Empreinte carbone',
      ]),
      axisId: '',
      _axisSlug: 'decarbonation',
      trl: 7,
      trlLabel: 'Prototype en environnement opérationnel',
      status: 'termine',
      progress: 100,
      startDate: 'Janvier 2021',
      endDate: 'Décembre 2023',
      duration: '36 mois',
      budgetTotal: '5 800 k€',
      budgetCorifer: '1 740 k€',
      leadName: 'Alstom',
      leadOrg: 'Alstom',
      partners: JSON.stringify([
        { name: 'Alstom', type: 'Industriel' },
        { name: 'Hutchinson', type: 'Industriel' },
        { name: 'IFPEN', type: 'Recherche' },
        { name: 'ADEME', type: 'Opérateur' },
      ]),
      progressSummary:
        "Le projet est terminé. Les méthodologies d'éco-conception ont été validées et les résultats sont en cours de transfert vers les lignes de production.",
      deliverables: JSON.stringify([
        { title: "D1.1 - Méthodologie d'éco-conception", type: 'PDF' },
        { title: 'D2.1 - Rapport final', type: 'PDF' },
      ]),
      publications: JSON.stringify([]),
      barriers: JSON.stringify([
        'Intégration des critères environnementaux dans les processus industriels existants',
        'Disponibilité de matériaux recyclés répondant aux normes ferroviaires',
      ]),
      benefits: JSON.stringify([
        {
          icon: 'ecology',
          text: "Réduction significative de l'empreinte carbone du matériel roulant",
        },
        {
          icon: 'competitiveness',
          text: "Avantage compétitif sur les marchés sensibles à l'environnement",
        },
      ]),
      indicators: JSON.stringify([
        { label: 'Empreinte carbone', value: '-20%' },
        { label: 'Recyclabilité', value: '+35%' },
      ]),
      contactName: 'Contact projet',
      contactEmail: 'contact@corifer.fr',
      contactRole: 'Chef de projet GREENTRAIN',
      externalLinks: JSON.stringify([]),
      fundingDevices: JSON.stringify([
        { name: 'France 2030', detail: 'Programme décarbonation' },
      ]),
      featured: false,
      order: 3,
    },
    // CYBERSAFE - basic data from listing
    {
      slug: 'cybersafe',
      acronym: 'CYBERSAFE',
      title: 'Cybersécurité ferroviaire',
      description:
        "Le projet CYBERSAFE développe des solutions de cybersécurité adaptées aux systèmes ferroviaires critiques, couvrant la protection des systèmes de signalisation, de contrôle-commande et des communications embarquées.",
      objectives: JSON.stringify([
        'Développer un cadre de cybersécurité adapté aux contraintes du ferroviaire',
        'Concevoir des solutions de détection et de réponse aux cyberattaques en temps réel',
        'Préparer la certification cybersécurité des systèmes ferroviaires critiques',
      ]),
      keywords: JSON.stringify([
        'Cybersécurité',
        'Systèmes critiques',
        'Signalisation',
        'Protection',
        'Résilience',
      ]),
      axisId: '',
      _axisSlug: 'trains-intelligents',
      trl: 3,
      trlLabel: 'Preuve de concept expérimentale',
      status: 'en-cours',
      progress: 20,
      startDate: 'Juin 2024',
      endDate: 'Juin 2027',
      duration: '36 mois',
      budgetTotal: '2 400 k€',
      budgetCorifer: '720 k€',
      leadName: 'Thales',
      leadOrg: 'Thales',
      partners: JSON.stringify([
        { name: 'Thales', type: 'Industriel' },
        { name: 'ANSSI', type: 'Institutionnel' },
        { name: 'Atos', type: 'Industriel' },
        { name: 'Télécom Paris', type: 'Académique' },
      ]),
      progressSummary:
        "Le projet est en phase initiale de définition du cadre de cybersécurité et d'analyse des menaces.",
      deliverables: JSON.stringify([
        { title: 'D1.1 - Analyse des menaces ferroviaires', type: 'PDF' },
      ]),
      publications: JSON.stringify([]),
      barriers: JSON.stringify([
        'Compatibilité des solutions de sécurité avec les systèmes ferroviaires legacy',
        "Performance des systèmes de détection en temps réel sans impact sur la disponibilité",
      ]),
      benefits: JSON.stringify([
        {
          icon: 'safety',
          text: 'Protection renforcée des systèmes ferroviaires contre les cybermenaces',
        },
        {
          icon: 'competitiveness',
          text: 'Conformité aux futures réglementations européennes de cybersécurité',
        },
      ]),
      indicators: JSON.stringify([
        { label: 'Indicateur principal', value: 'En cours de mesure' },
      ]),
      contactName: 'Contact projet',
      contactEmail: 'contact@corifer.fr',
      contactRole: 'Chef de projet CYBERSAFE',
      externalLinks: JSON.stringify([]),
      fundingDevices: JSON.stringify([
        { name: 'Bpifrance', detail: 'Programme cybersécurité' },
      ]),
      featured: false,
      order: 4,
    },
    // DIGITRACK - basic data from listing
    {
      slug: 'digitrack',
      acronym: 'DIGITRACK',
      title: 'Jumeau numérique infrastructure',
      description:
        "Le projet DIGITRACK développe un jumeau numérique complet de l'infrastructure ferroviaire, permettant la simulation, la supervision en temps réel et l'optimisation de la maintenance du réseau via des technologies de modélisation 3D et de données massives.",
      objectives: JSON.stringify([
        "Développer un jumeau numérique haute fidélité de l'infrastructure ferroviaire",
        "Intégrer les données de capteurs IoT pour une supervision en temps réel",
        "Optimiser la planification de maintenance par simulation prédictive",
      ]),
      keywords: JSON.stringify([
        'Jumeau numérique',
        'Infrastructure',
        'BIM',
        'IoT',
        'Simulation',
      ]),
      axisId: '',
      _axisSlug: 'competitivite',
      trl: 5,
      trlLabel: 'Validation en environnement pertinent',
      status: 'en-cours',
      progress: 55,
      startDate: 'Mars 2023',
      endDate: 'Mars 2026',
      duration: '36 mois',
      budgetTotal: '6 700 k€',
      budgetCorifer: '2 010 k€',
      leadName: 'Egis',
      leadOrg: 'Egis',
      partners: JSON.stringify([
        { name: 'Egis', type: 'Industriel' },
        { name: 'Dassault Systèmes', type: 'Industriel' },
        { name: 'SNCF Réseau', type: 'Opérateur' },
        { name: 'ENPC', type: 'Académique' },
      ]),
      progressSummary:
        "Le modèle 3D du tronçon pilote est finalisé et l'intégration des flux de données IoT est en cours.",
      deliverables: JSON.stringify([
        { title: 'D1.1 - Architecture jumeau numérique', type: 'PDF' },
        { title: 'D2.1 - Modèle 3D du tronçon pilote', type: 'PDF' },
      ]),
      publications: JSON.stringify([]),
      barriers: JSON.stringify([
        "Volume et hétérogénéité des données d'infrastructure à intégrer",
        "Performance de la simulation en temps réel à l'échelle du réseau",
      ]),
      benefits: JSON.stringify([
        {
          icon: 'competitiveness',
          text: "Optimisation de la maintenance et réduction des coûts d'exploitation",
        },
        {
          icon: 'safety',
          text: "Amélioration de la sécurité par la détection anticipée des défaillances",
        },
      ]),
      indicators: JSON.stringify([
        { label: 'Coûts de maintenance', value: '-20% estimé' },
        { label: 'Disponibilité réseau', value: '+10% estimé' },
      ]),
      contactName: 'Contact projet',
      contactEmail: 'contact@corifer.fr',
      contactRole: 'Chef de projet DIGITRACK',
      externalLinks: JSON.stringify([]),
      fundingDevices: JSON.stringify([
        { name: 'CORIFER AMI', detail: 'AMI Infrastructure numérique' },
      ]),
      featured: false,
      order: 5,
    },
  ]

  for (const project of projectsData) {
    const { _axisSlug, ...data } = project
    data.axisId = axisMap[_axisSlug]

    await prisma.coriferProject.upsert({
      where: { slug: data.slug },
      update: {
        acronym: data.acronym,
        title: data.title,
        description: data.description,
        objectives: data.objectives,
        keywords: data.keywords,
        axisId: data.axisId,
        trl: data.trl,
        trlLabel: data.trlLabel,
        status: data.status,
        progress: data.progress,
        startDate: data.startDate,
        endDate: data.endDate,
        duration: data.duration,
        budgetTotal: data.budgetTotal,
        budgetCorifer: data.budgetCorifer,
        leadName: data.leadName,
        leadOrg: data.leadOrg,
        partners: data.partners,
        progressSummary: data.progressSummary,
        deliverables: data.deliverables,
        publications: data.publications,
        barriers: data.barriers,
        benefits: data.benefits,
        indicators: data.indicators,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactRole: data.contactRole,
        externalLinks: data.externalLinks,
        fundingDevices: data.fundingDevices,
        featured: data.featured,
        order: data.order,
      },
      create: {
        slug: data.slug,
        acronym: data.acronym,
        title: data.title,
        description: data.description,
        objectives: data.objectives,
        keywords: data.keywords,
        axisId: data.axisId,
        trl: data.trl,
        trlLabel: data.trlLabel,
        status: data.status,
        progress: data.progress,
        startDate: data.startDate,
        endDate: data.endDate,
        duration: data.duration,
        budgetTotal: data.budgetTotal,
        budgetCorifer: data.budgetCorifer,
        leadName: data.leadName,
        leadOrg: data.leadOrg,
        partners: data.partners,
        progressSummary: data.progressSummary,
        deliverables: data.deliverables,
        publications: data.publications,
        barriers: data.barriers,
        benefits: data.benefits,
        indicators: data.indicators,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactRole: data.contactRole,
        externalLinks: data.externalLinks,
        fundingDevices: data.fundingDevices,
        featured: data.featured,
        order: data.order,
      },
    })
    console.log(`   - ${data.acronym}: ${data.title}`)
  }

  console.log(`   Done: ${projectsData.length} projects.`)
  console.log('')

  // ──────────────────────────────────────────────
  // 3. Calls for Projects (2 records)
  // ──────────────────────────────────────────────
  console.log('3/8 - Seeding CoriferCallForProject...')

  const callsData = [
    {
      slug: 'ami-decarbonation',
      title: 'AMI Décarbonation des mobilités ferroviaires',
      description:
        "Appel à manifestation d'intérêt visant à identifier et soutenir des solutions innovantes pour la décarbonation du matériel roulant sur les lignes non électrifiées : hydrogène, batteries, biocarburants et solutions hybrides.",
      status: 'en-cours',
      deadline: new Date('2024-06-30'),
      featured: true,
      order: 0,
    },
    {
      slug: 'aap-france-2030',
      title: 'AAP France 2030 - i-Démo Ferroviaire',
      description:
        "Appel à projets du programme France 2030, volet i-Démo, dédié aux projets de démonstration de technologies innovantes dans le secteur ferroviaire. Projets collaboratifs entre industriels et organismes de recherche.",
      status: 'cloture',
      deadline: null,
      featured: false,
      order: 1,
    },
  ]

  for (const call of callsData) {
    await prisma.coriferCallForProject.upsert({
      where: { slug: call.slug },
      update: {
        title: call.title,
        description: call.description,
        status: call.status,
        deadline: call.deadline,
        featured: call.featured,
        order: call.order,
      },
      create: call,
    })
    console.log(`   - ${call.title} (${call.status})`)
  }

  console.log(`   Done: ${callsData.length} calls for projects.`)
  console.log('')

  // ──────────────────────────────────────────────
  // 4. Documents (6 records)
  // ──────────────────────────────────────────────
  console.log('4/8 - Seeding CoriferDocument...')

  const documentsData = [
    {
      title: 'Rapport annuel CORIFER 2023',
      description:
        "Bilan complet des activités du CORIFER pour l'année 2023 : projets soutenus, résultats obtenus, perspectives et orientations stratégiques pour la filière ferroviaire.",
      category: 'rapport',
      fileSize: '4.2 Mo',
      date: new Date('2024-03-15'),
      order: 0,
    },
    {
      title: 'Note de position - Hydrogène ferroviaire',
      description:
        "Position du CORIFER sur le développement de la traction hydrogène dans le ferroviaire : état des lieux technologique, enjeux industriels et recommandations stratégiques.",
      category: 'note-position',
      fileSize: '1.8 Mo',
      date: new Date('2024-01-28'),
      order: 1,
    },
    {
      title: 'Étude - Marché européen du ferroviaire',
      description:
        "Analyse approfondie du marché européen du ferroviaire : tendances, parts de marché, investissements en R&I et positionnement de la France face à la concurrence internationale.",
      category: 'etude',
      fileSize: '6.1 Mo',
      date: new Date('2023-12-10'),
      order: 2,
    },
    {
      title: 'Bilan des projets France 2030',
      description:
        "Synthèse des projets ferroviaires financés dans le cadre de France 2030 : état d'avancement, résultats intermédiaires, retombées industrielles et scientifiques.",
      category: 'rapport',
      fileSize: '3.5 Mo',
      date: new Date('2023-11-22'),
      order: 3,
    },
    {
      title: 'Guide - Montage de projets R&I',
      description:
        "Guide pratique à destination des porteurs de projets : méthodologie de montage, identification des financements, constitution des consortiums et bonnes pratiques.",
      category: 'etude',
      fileSize: '2.3 Mo',
      date: new Date('2023-10-05'),
      order: 4,
    },
    {
      title: 'Présentation - Comité de pilotage Q4 2023',
      description:
        "Support de présentation du comité de pilotage du 4e trimestre 2023 : avancement des projets, points d'attention, décisions et prochaines étapes.",
      category: 'presentation',
      fileSize: '8.7 Mo',
      date: new Date('2023-09-18'),
      order: 5,
    },
  ]

  for (const doc of documentsData) {
    // Use title as unique identifier via upsert on id (create if not exists)
    // Since CoriferDocument has no slug, we check by title
    const existing = await prisma.coriferDocument.findFirst({
      where: { title: doc.title },
    })

    if (existing) {
      await prisma.coriferDocument.update({
        where: { id: existing.id },
        data: {
          description: doc.description,
          category: doc.category,
          fileSize: doc.fileSize,
          date: doc.date,
          order: doc.order,
        },
      })
    } else {
      await prisma.coriferDocument.create({ data: doc })
    }
    console.log(`   - ${doc.title} (${doc.category})`)
  }

  console.log(`   Done: ${documentsData.length} documents.`)
  console.log('')

  // ──────────────────────────────────────────────
  // 5. Partners (12 records)
  // ──────────────────────────────────────────────
  console.log('5/8 - Seeding CoriferPartner...')

  const partnersData = [
    // Clusters (4)
    {
      name: 'AIF',
      slug: 'aif',
      category: 'cluster',
      description:
        "Agence de l'Innovation Ferroviaire, cluster national dédié à l'innovation collaborative dans le secteur ferroviaire.",
      website: 'https://www.aif-ferroviaire.fr',
      order: 0,
    },
    {
      name: 'Ferrocampus',
      slug: 'ferrocampus',
      category: 'cluster',
      description:
        "Campus ferroviaire situé à Saintes, centre de formation et d'innovation pour les métiers du ferroviaire.",
      website: 'https://www.ferrocampus.fr',
      order: 1,
    },
    {
      name: 'TOTEM',
      slug: 'totem',
      category: 'cluster',
      description:
        'Cluster régional dédié aux technologies de transport, favorisant les synergies entre acteurs industriels et académiques.',
      website: null,
      order: 2,
    },
    {
      name: 'MecateamCluster',
      slug: 'mecateamcluster',
      category: 'cluster',
      description:
        'Cluster spécialisé dans la maintenance et la construction des infrastructures ferroviaires, basé à Montceau-les-Mines.',
      website: 'https://www.mecateamcluster.org',
      order: 3,
    },
    // IRT (3)
    {
      name: 'Railenium',
      slug: 'railenium',
      category: 'irt',
      description:
        "Institut de Recherche Technologique dédié au ferroviaire, couvrant l'infrastructure, le matériel roulant et les systèmes.",
      website: 'https://www.railenium.eu',
      order: 4,
    },
    {
      name: 'Jules Verne',
      slug: 'jules-verne',
      category: 'irt',
      description:
        "IRT spécialisé dans les technologies avancées de fabrication, contribuant à l'allègement et la durabilité des structures ferroviaires.",
      website: 'https://www.irt-jules-verne.fr',
      order: 5,
    },
    {
      name: 'Saint-Exupéry',
      slug: 'saint-exupery',
      category: 'irt',
      description:
        "IRT couvrant l'aéronautique, l'espace et les systèmes embarqués, avec des applications transverses au ferroviaire.",
      website: 'https://www.irt-saintexupery.com',
      order: 6,
    },
    // Opérateurs (2)
    {
      name: 'ADEME',
      slug: 'ademe',
      category: 'operateur',
      description:
        "Agence de la transition écologique, financeuse de projets de R&I en faveur de la mobilité durable et décarbonée.",
      website: 'https://www.ademe.fr',
      order: 7,
    },
    {
      name: 'Bpifrance',
      slug: 'bpifrance',
      category: 'operateur',
      description:
        "Banque publique d'investissement, soutenant l'innovation des entreprises de la filière ferroviaire via des aides et financements.",
      website: 'https://www.bpifrance.fr',
      order: 8,
    },
    // Pôles de compétitivité (3)
    {
      name: 'CARA',
      slug: 'cara',
      category: 'pole',
      description:
        'Pôle de compétitivité European Cluster for Mobility of the Future, basé en Auvergne-Rhône-Alpes.',
      website: 'https://www.pole-cara.com',
      order: 9,
    },
    {
      name: 'ID4Mobility',
      slug: 'id4mobility',
      category: 'pole',
      description:
        "Pôle de compétitivité dédié aux solutions de mobilité innovantes, couvrant le ferroviaire, l'automobile et les transports intelligents.",
      website: 'https://www.id4mobility.org',
      order: 10,
    },
    {
      name: 'I-Trans',
      slug: 'i-trans',
      category: 'pole',
      description:
        'Pôle de compétitivité des transports terrestres durables, au coeur de la filière ferroviaire dans les Hauts-de-France.',
      website: 'https://www.i-trans.org',
      order: 11,
    },
  ]

  for (const partner of partnersData) {
    await prisma.coriferPartner.upsert({
      where: { slug: partner.slug },
      update: {
        name: partner.name,
        category: partner.category,
        description: partner.description,
        website: partner.website,
        order: partner.order,
      },
      create: partner,
    })
    console.log(`   - ${partner.name} (${partner.category})`)
  }

  console.log(`   Done: ${partnersData.length} partners.`)
  console.log('')

  // ──────────────────────────────────────────────
  // 6. Team Members (8 records)
  // ──────────────────────────────────────────────
  console.log('6/8 - Seeding CoriferTeamMember...')

  const teamData = [
    // Key contacts (2)
    {
      name: 'Lionel Pujol',
      role: 'Chef de projet industrie ferroviaire',
      org: "DGE - Ministère de l'Économie",
      title: 'Président du CORIFER',
      featured: true,
      order: 0,
    },
    {
      name: 'Jean-Jacques Mogoro',
      role: 'Directeur Pôle Industrie',
      org: 'FIF',
      title: 'Secrétaire du CORIFER',
      featured: true,
      order: 1,
    },
    // Governance members (6)
    {
      name: 'SNCF',
      role: 'Opérateur national',
      org: 'SNCF',
      title: 'Membre',
      featured: false,
      order: 2,
    },
    {
      name: 'RATP',
      role: 'Opérateur transport urbain',
      org: 'RATP',
      title: 'Membre',
      featured: false,
      order: 3,
    },
    {
      name: 'Alstom',
      role: 'Constructeur ferroviaire',
      org: 'Alstom',
      title: 'Membre',
      featured: false,
      order: 4,
    },
    {
      name: 'DGITM',
      role: 'Direction générale des infrastructures',
      org: 'Ministère des Transports',
      title: 'Membre',
      featured: false,
      order: 5,
    },
    {
      name: 'DGRI',
      role: 'Direction générale de la recherche',
      org: 'Ministère de la Recherche',
      title: 'Membre',
      featured: false,
      order: 6,
    },
    {
      name: 'AIF',
      role: "Agence de l'innovation ferroviaire",
      org: 'AIF',
      title: 'Membre',
      featured: false,
      order: 7,
    },
  ]

  for (const member of teamData) {
    // Use name as unique key (findFirst + upsert pattern)
    const existing = await prisma.coriferTeamMember.findFirst({
      where: { name: member.name, title: member.title },
    })

    if (existing) {
      await prisma.coriferTeamMember.update({
        where: { id: existing.id },
        data: {
          role: member.role,
          org: member.org,
          title: member.title,
          featured: member.featured,
          order: member.order,
        },
      })
    } else {
      await prisma.coriferTeamMember.create({ data: member })
    }
    console.log(`   - ${member.name} (${member.title})`)
  }

  console.log(`   Done: ${teamData.length} team members.`)
  console.log('')

  // ──────────────────────────────────────────────
  // 7. Key Figures (4 records)
  // ──────────────────────────────────────────────
  console.log('7/8 - Seeding CoriferKeyFigure...')

  const keyFiguresData = [
    { value: 45, suffix: '', label: 'Projets soumis', icon: 'file-text', order: 0 },
    { value: 28, suffix: '', label: 'Projets soutenus', icon: 'check-circle', order: 1 },
    { value: 150, suffix: 'M€', label: "Soutien de l'État", icon: 'euro', order: 2 },
    { value: 12, suffix: '', label: 'Partenaires', icon: 'users', order: 3 },
  ]

  for (const figure of keyFiguresData) {
    const existing = await prisma.coriferKeyFigure.findFirst({
      where: { label: figure.label },
    })

    if (existing) {
      await prisma.coriferKeyFigure.update({
        where: { id: existing.id },
        data: {
          value: figure.value,
          suffix: figure.suffix,
          icon: figure.icon,
          order: figure.order,
        },
      })
    } else {
      await prisma.coriferKeyFigure.create({ data: figure })
    }
    console.log(
      `   - ${figure.value}${figure.suffix} ${figure.label}`
    )
  }

  console.log(`   Done: ${keyFiguresData.length} key figures.`)
  console.log('')

  // ──────────────────────────────────────────────
  // 8. Funding Devices (6 records)
  // ──────────────────────────────────────────────
  console.log('8/8 - Seeding CoriferFundingDevice...')

  const fundingDevicesData = [
    {
      name: 'France 2030',
      slug: 'france-2030',
      description:
        "Programme d'investissement de l'État pour l'innovation industrielle et technologique, incluant le volet i-Démo pour les projets de démonstration.",
      website: 'https://www.gouvernement.fr/france-2030',
      order: 0,
    },
    {
      name: 'ADEME',
      slug: 'ademe',
      description:
        'Agence de la transition écologique, finançant les projets de R&I en faveur de la mobilité durable et de la décarbonation des transports.',
      website: 'https://www.ademe.fr',
      order: 1,
    },
    {
      name: 'ANR',
      slug: 'anr',
      description:
        'Agence nationale de la recherche, soutenant les projets de recherche fondamentale et appliquée dans le domaine ferroviaire.',
      website: 'https://www.anr.fr',
      order: 2,
    },
    {
      name: 'Bpifrance',
      slug: 'bpifrance',
      description:
        "Banque publique d'investissement, proposant des aides à l'innovation, des prêts et des subventions pour les entreprises de la filière ferroviaire.",
      website: 'https://www.bpifrance.fr',
      order: 3,
    },
    {
      name: 'CORIFER AMI',
      slug: 'corifer-ami',
      description:
        "Appels à manifestation d'intérêt propres au CORIFER, visant à identifier et soutenir les projets innovants de la filière ferroviaire.",
      website: null,
      order: 4,
    },
    {
      name: 'Autres',
      slug: 'autres',
      description:
        'Autres dispositifs de financement nationaux et européens accessibles aux acteurs de la filière ferroviaire (Horizon Europe, CEF, etc.).',
      website: null,
      order: 5,
    },
  ]

  for (const device of fundingDevicesData) {
    await prisma.coriferFundingDevice.upsert({
      where: { slug: device.slug },
      update: {
        name: device.name,
        description: device.description,
        website: device.website,
        order: device.order,
      },
      create: device,
    })
    console.log(`   - ${device.name}`)
  }

  console.log(`   Done: ${fundingDevicesData.length} funding devices.`)
  console.log('')

  // ──────────────────────────────────────────────
  // Summary
  // ──────────────────────────────────────────────
  console.log('=== Seed Complete ===')
  console.log(`  Strategic Axes:     ${axesData.length}`)
  console.log(`  Projects:           ${projectsData.length}`)
  console.log(`  Calls for Projects: ${callsData.length}`)
  console.log(`  Documents:          ${documentsData.length}`)
  console.log(`  Partners:           ${partnersData.length}`)
  console.log(`  Team Members:       ${teamData.length}`)
  console.log(`  Key Figures:        ${keyFiguresData.length}`)
  console.log(`  Funding Devices:    ${fundingDevicesData.length}`)
  console.log(`  TOTAL:              ${
    axesData.length +
    projectsData.length +
    callsData.length +
    documentsData.length +
    partnersData.length +
    teamData.length +
    keyFiguresData.length +
    fundingDevicesData.length
  } records`)
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
