import { getCoriferArticles, getCoriferArticleCounts } from '@/lib/data'
import ActualitesClient from './ActualitesClient'
import type { ActualiteItem } from './ActualitesClient'

// Map DB coriferCategory (singular) to client tab category (plural)
function mapCoriferCategoryToTab(coriferCategory: string | null): 'evenements' | 'annonces' | 'articles' {
  switch (coriferCategory) {
    case 'evenement':
      return 'evenements'
    case 'annonce':
      return 'annonces'
    case 'article':
      return 'articles'
    default:
      return 'articles'
  }
}

// Map DB coriferCategory to French label
function mapCoriferCategoryToLabel(coriferCategory: string | null): string {
  switch (coriferCategory) {
    case 'evenement':
      return 'Evenement'
    case 'annonce':
      return 'Annonce'
    case 'article':
      return 'Article'
    default:
      return 'Article'
  }
}

// Gradient colors per category
function getCategoryGradient(coriferCategory: string | null): { from: string; to: string } {
  switch (coriferCategory) {
    case 'evenement':
      return { from: '#2563EB', to: '#06B6D4' }
    case 'annonce':
      return { from: '#8B5CF6', to: '#2563EB' }
    case 'article':
      return { from: '#10B981', to: '#2563EB' }
    default:
      return { from: '#2563EB', to: '#06B6D4' }
  }
}

// Format a Date to a localized French date string
function formatDateFr(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ActualitesPage() {
  const [dbArticles, counts] = await Promise.all([
    getCoriferArticles(),
    getCoriferArticleCounts(),
  ])

  const articles: ActualiteItem[] = dbArticles.map((article) => {
    const articleDate = new Date(article.date)
    const gradient = getCategoryGradient(article.coriferCategory)

    return {
      id: article.id,
      title: article.titleFr,
      excerpt: article.excerptFr || '',
      date: formatDateFr(articleDate),
      year: articleDate.getFullYear(),
      category: mapCoriferCategoryToTab(article.coriferCategory),
      categoryLabel: mapCoriferCategoryToLabel(article.coriferCategory),
      gradientFrom: gradient.from,
      gradientTo: gradient.to,
      image: article.imageUrl || undefined,
      slug: article.slug,
    }
  })

  return (
    <ActualitesClient
      articles={articles}
      counts={{
        evenements: counts.evenements,
        annonces: counts.annonces,
        articles: counts.articles,
      }}
    />
  )
}
