import Link from 'next/link'

const sections = [
  {
    href: '/task',
    title: 'Task Definition',
    description: 'Bimanual LEGO assembly specification, challenges, and success metrics',
  },
  {
    href: '/sota',
    title: 'SOTA Analysis',
    description: 'VLA landscape comparison and EO-1 selection rationale',
  },
  {
    href: '/limitations',
    title: 'Limitations & Future',
    description: 'Known limitations, unsolved problems, and research opportunities',
  },
  {
    href: '/roadmap',
    title: 'Project Roadmap',
    description: '13-week execution plan with phases, milestones, and risk analysis',
  },
]

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#1d1a1d] via-[#161316] to-[#161316] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6D29]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#453027]/30 rounded-full blur-3xl" />
        </div>

        <div className="text-center px-4 relative z-10 max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-full text-sm text-[#BABABA]">
            Research Thesis - Master&apos;s Project 2026
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 leading-tight">
            <span className="text-[#FF6D29]">
              Vision-Language-Action
            </span>
            <br />
            <span className="text-white">for Bimanual LEGO Assembly</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#BABABA] max-w-2xl mx-auto mb-8 leading-relaxed">
            Replicating and extending the <strong className="text-white">EO-1 model</strong> for precision bimanual manipulation using the <strong className="text-white">Unitree H1 humanoid robot</strong>
          </p>

          {/* Key stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-semibold text-[#FF6D29]">8x</div>
              <div className="text-sm text-[#BABABA]">A100 GPUs</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white">3B</div>
              <div className="text-sm text-[#BABABA]">Parameters</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-[#FF6D29]">13</div>
              <div className="text-sm text-[#BABABA]">Week Timeline</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white">98%</div>
              <div className="text-sm text-[#BABABA]">EO-1 LIBERO Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16 px-4 bg-[#161316]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Explore the Research</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group p-6 bg-[#1d1a1d] border border-[#453027] rounded-xl hover:border-[#FF6D29]/50 hover:bg-[#453027]/20 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#FF6D29] transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-[#BABABA] group-hover:text-white transition-colors">
                      {section.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-[#BABABA] group-hover:text-[#FF6D29] group-hover:translate-x-1 transition-all"
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
    </div>
  )
}
