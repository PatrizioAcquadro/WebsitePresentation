interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`min-h-screen py-24 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white border-b border-slate-600 pb-4">
          {title}
        </h2>
        <div className="prose prose-lg max-w-none">
          {children}
        </div>
      </div>
    </section>
  )
}
