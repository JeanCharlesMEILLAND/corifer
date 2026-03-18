import { notFound } from 'next/navigation'
import { getCoriferArticleBySlug, getCoriferArticles } from '@/lib/data'
import ArticleDetailClient from './ArticleDetailClient'
import type { ArticleDetailData } from './ArticleDetailClient'

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

function formatDateFr(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Generate static params for all CORIFER articles
export async function generateStaticParams() {
  const articles = await getCoriferArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const dbArticle = await getCoriferArticleBySlug(slug)

  if (!dbArticle) {
    notFound()
  }

  const articleDate = new Date(dbArticle.date)

  const article: ArticleDetailData = {
    title: dbArticle.titleFr,
    excerpt: dbArticle.excerptFr || '',
    content: dbArticle.contentFr,
    date: formatDateFr(articleDate),
    categoryLabel: mapCoriferCategoryToLabel(dbArticle.coriferCategory),
    category: mapCoriferCategoryToTab(dbArticle.coriferCategory),
    image: dbArticle.imageUrl || undefined,
  }

  return <ArticleDetailClient article={article} />
}
