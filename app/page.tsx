import Link from 'next/link'

const sections = [
  {
    href: '/task',
    title: 'Task Definition',
    description: 'Bimanual LEGO assembly specification, challenges, and success metrics',
    color: 'blue',
  },
  {
    href: '/sota',
    title: 'SOTA Analysis',
    description: 'VLA landscape comparison and EO-1 selection rationale',
    color: 'emerald',
  },
  {
    href: '/limitations',
    title: 'Limitations & Future',
    description: 'Known limitations, unsolved problems, and research opportunities',
    color: 'purple',
  },
  {
    href: '/roadmap',
    title: 'Project Roadmap',
    description: '13-week execution plan with phases, milestones, and risk analysis',
    color: 'cyan',
  },
]

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="text-center px-4 relative z-10 max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">
            Research Thesis - Master&apos;s Project 2026
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Vision-Language-Action
            </span>
            <br />
            <span className="text-white">for Bimanual LEGO Assembly</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Replicating and extending the <strong className="text-white">EO-1 model</strong> for precision bimanual manipulation using the <strong className="text-white">Unitree H1 humanoid robot</strong>
          </p>

          {/* Key stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">8x</div>
              <div className="text-sm text-slate-400">A100 GPUs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">3B</div>
              <div className="text-sm text-slate-400">Parameters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">13</div>
              <div className="text-sm text-slate-400">Week Timeline</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">98%</div>
              <div className="text-sm text-slate-400">EO-1 LIBERO Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Explore the Research</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 hover:bg-slate-800 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 text-${section.color}-400 group-hover:text-${section.color}-300 transition-colors`}>
                      {section.title}
                    </h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                      {section.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800 text-center text-slate-400">
        <p>VLA Thesis Project - 2026</p>
      </footer>
    </div>
  )
}
