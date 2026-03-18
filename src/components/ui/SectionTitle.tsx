type SectionTitleProps = {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionTitle({
  title,
  subtitle,
  centered = false,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''} ${className}`}>
      <div
        className={`w-12 h-1 bg-[#2563EB] rounded-full mb-4 ${centered ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
      <h2 className="text-3xl md:text-4xl font-bold text-[#0F1B3D] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-lg text-gray-600 max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
