import ProjectDetailClient from './ProjectDetailClient'

export function generateStaticParams() {
  return [
    { slug: 'draisy' },
    { slug: 'hydrail' },
    { slug: 'smartrail' },
    { slug: 'greentrain' },
    { slug: 'cybersafe' },
    { slug: 'digitrack' },
  ]
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProjectDetailClient slug={slug} />
}
