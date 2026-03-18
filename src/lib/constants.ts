// ========================================
// CORIFER Website - Site Constants
// ========================================

export const SITE_CONFIG = {
  name: 'CORIFER',
  fullName: 'Conseil d\'Orientation de la Recherche et de l\'Innovation de la filière FERroviaire',
  description: 'Conseil d\'Orientation de la Recherche et de l\'Innovation de la filière FERroviaire',
  url: 'https://www.corifer.fr',
  contact: {
    email: 'fif@fif.asso.fr',
    phone: '01 55 63 83 60',
    address: '60 avenue Anatole France, 92300 Levallois-Perret',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/fif-ferroviaire/',
    youtube: '#',
  },
  keyContacts: [
    { name: 'Lionel Pujol', role: 'Chef de projet industrie ferroviaire', org: 'DGE - Ministère de l\'Économie' },
    { name: 'Jean-Jacques Mogoro', role: 'Secrétaire CORIFER & Directeur Pôle Industrie', org: 'FIF' },
  ],
} as const

// ========================================
// Navigation
// ========================================

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Le CORIFER',
    href: '/le-corifer',
    children: [
      { label: 'Qui sommes-nous ?', href: '/le-corifer#qui-sommes-nous' },
      { label: 'Gouvernance', href: '/le-corifer#gouvernance' },
      { label: 'Rôle & missions', href: '/le-corifer#role-missions' },
      { label: 'Les acteurs', href: '/le-corifer#les-acteurs' },
    ],
  },
  {
    label: 'Actualités',
    href: '/actualites',
    children: [
      { label: 'Événements', href: '/actualites?tab=evenements' },
      { label: 'Annonces', href: '/actualites?tab=annonces' },
      { label: 'Articles', href: '/actualites?tab=articles' },
    ],
  },
  {
    label: 'Accompagnement',
    href: '/accompagnement',
    children: [
      { label: 'Appels à projets / AMI', href: '/accompagnement#appels-projets' },
      { label: 'Financement & aides', href: '/accompagnement#financement' },
      { label: 'Conseil & expertise', href: '/accompagnement#conseil' },
    ],
  },
  { label: 'La feuille de route', href: '/feuille-de-route' },
  {
    label: 'Les travaux',
    href: '/les-travaux',
    children: [
      { label: 'Documentation', href: '/les-travaux/documentation' },
      { label: 'Projets', href: '/les-travaux/projets' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

// ========================================
// Funding Devices
// ========================================

export const FUNDING_DEVICES = [
  'France 2030',
  'ADEME',
  'ANR',
  'Bpifrance',
  'CORIFER AMI',
  'Autres',
] as const

export type FundingDevice = (typeof FUNDING_DEVICES)[number]

// ========================================
// Strategic Axes
// ========================================

export const STRATEGIC_AXES = [
  { id: 'trains-intelligents', name: 'Trains intelligents', color: '#2563EB' },
  { id: 'decarbonation', name: 'Décarbonation', color: '#10B981' },
  { id: 'infrastructure', name: 'Infrastructure résiliente', color: '#F59E0B' },
  { id: 'competitivite', name: 'Compétitivité industrielle', color: '#8B5CF6' },
] as const

export type StrategicAxis = (typeof STRATEGIC_AXES)[number]
export type StrategicAxisId = StrategicAxis['id']

// ========================================
// TRL Levels (Technology Readiness Levels)
// ========================================

export const TRL_LEVELS = [
  { level: 1, label: 'Principes de base observés' },
  { level: 2, label: 'Concept technologique formulé' },
  { level: 3, label: 'Preuve de concept expérimentale' },
  { level: 4, label: 'Validation en laboratoire' },
  { level: 5, label: 'Validation en environnement pertinent' },
  { level: 6, label: 'Prototype en environnement pertinent' },
  { level: 7, label: 'Prototype en environnement opérationnel' },
  { level: 8, label: 'Système complet qualifié' },
  { level: 9, label: 'Système opérationnel en conditions réelles' },
] as const

export type TRLLevel = (typeof TRL_LEVELS)[number]['level']

// ========================================
// Metadata Defaults
// ========================================

export const DEFAULT_METADATA = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    type: 'website' as const,
    locale: 'fr_FR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
  },
} as const

// ========================================
// Breakpoints (mirroring Tailwind)
// ========================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
} as const

// ========================================
// Animation Presets (for Framer Motion)
// ========================================

export const MOTION_PRESETS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
} as const
