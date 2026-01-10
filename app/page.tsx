import Section from '@/components/Section'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { taskDefinitionContent } from '@/content/task-definition'
import { sotaContent } from '@/content/sota-identification'
import { limitationsContent } from '@/content/limitations-future'

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="text-center px-4 relative z-10 max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">
            Research Thesis - Master&apos;s Project 2026
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-primary-400 to-emerald-400 bg-clip-text text-transparent">
              Vision-Language-Action
            </span>
            <br />
            <span className="text-white">for Bimanual LEGO Assembly</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Replicating and extending the <strong className="text-white">EO-1 model</strong> for precision bimanual manipulation using the <strong className="text-white">Unitree H1 humanoid robot</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#task-definition"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Explore Research
            </a>
            <a
              href="/roadmap"
              className="px-8 py-3 border border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 rounded-lg font-medium transition-all duration-200"
            >
              View Roadmap
            </a>
          </div>

          {/* Key stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
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

      {/* Content Sections */}
      <Section id="task-definition" title="Task Definition & Analysis">
        <MarkdownRenderer content={taskDefinitionContent} />
      </Section>

      <Section id="sota" title="SOTA Identification & Selection" className="bg-slate-800/30">
        <MarkdownRenderer content={sotaContent} />
      </Section>

      <Section id="limitations" title="Limitations & Future Directions">
        <MarkdownRenderer content={limitationsContent} />
      </Section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800 text-center text-slate-400">
        <p>VLA Thesis Project - 2026</p>
      </footer>
    </div>
  )
}
