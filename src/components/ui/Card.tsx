import Image from 'next/image'
import Link from 'next/link'

type CardProps = {
  children: React.ReactNode
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  href?: string
  onClick?: () => void
  className?: string
  padding?: boolean
}

export function Card({
  children,
  image,
  href,
  onClick,
  className = '',
  padding = true,
}: CardProps) {
  const cardClasses = `bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${onClick || href ? 'cursor-pointer' : ''} ${className}`

  const content = (
    <>
      {image && (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className={padding ? 'p-6' : ''}>{children}</div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`block ${cardClasses}`}>
        {content}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`text-left w-full ${cardClasses}`}
      >
        {content}
      </button>
    )
  }

  return <div className={cardClasses}>{content}</div>
}
