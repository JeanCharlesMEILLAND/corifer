import { prisma } from './prisma'

/**
 * Get articles for the CORIFER site.
 * Fetches articles where source is "corifer" or "both".
 */
export async function getCoriferArticles(options?: {
  coriferCategory?: string
  limit?: number
  year?: number
}) {
  const where: Record<string, unknown> = {
    source: { in: ['corifer', 'both'] },
  }

  if (options?.coriferCategory) {
    where.coriferCategory = options.coriferCategory
  }

  if (options?.year) {
    where.date = {
      gte: new Date(`${options.year}-01-01`),
      lt: new Date(`${options.year + 1}-01-01`),
    }
  }

  return prisma.article.findMany({
    where,
    orderBy: { date: 'desc' },
    take: options?.limit,
  })
}

/**
 * Get a single article by slug (must be corifer or both source).
 */
export async function getCoriferArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: {
      slug,
      source: { in: ['corifer', 'both'] },
    },
  })
}

/**
 * Get featured articles for the CORIFER homepage.
 */
export async function getCoriferFeaturedArticles(limit = 3) {
  return prisma.article.findMany({
    where: {
      source: { in: ['corifer', 'both'] },
      featured: true,
    },
    orderBy: { date: 'desc' },
    take: limit,
  })
}

/**
 * Count articles by CORIFER category.
 */
export async function getCoriferArticleCounts() {
  const [evenements, annonces, articles] = await Promise.all([
    prisma.article.count({
      where: { source: { in: ['corifer', 'both'] }, coriferCategory: 'evenement' },
    }),
    prisma.article.count({
      where: { source: { in: ['corifer', 'both'] }, coriferCategory: 'annonce' },
    }),
    prisma.article.count({
      where: { source: { in: ['corifer', 'both'] }, coriferCategory: 'article' },
    }),
  ])

  return { evenements, annonces, articles, total: evenements + annonces + articles }
}

/**
 * Get team members by committee type (title field).
 */
export async function getCoriferTeamMembers(title?: string) {
  const where: Record<string, unknown> = {}
  if (title) where.title = title
  return prisma.coriferTeamMember.findMany({
    where,
    orderBy: { order: 'asc' },
  })
}

/**
 * Get featured team members (President, Secretary).
 */
export async function getCoriferLeadership() {
  return prisma.coriferTeamMember.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
  })
}

/**
 * Get key figures for CORIFER.
 */
export async function getCoriferKeyFigures() {
  return prisma.coriferKeyFigure.findMany({
    orderBy: { order: 'asc' },
  })
}

/**
 * Get partners/ecosystem actors.
 */
export async function getCoriferPartners(category?: string) {
  const where: Record<string, unknown> = {}
  if (category) where.category = category
  return prisma.coriferPartner.findMany({
    where,
    orderBy: { order: 'asc' },
  })
}
