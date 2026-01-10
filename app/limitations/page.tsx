import Section from '@/components/Section'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { limitationsContent } from '@/content/limitations-future'
import Link from 'next/link'

export default function LimitationsPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Limitations & Future Directions
          </h1>
          <p className="text-lg text-slate-300">
            Known limitations, unsolved problems, and research opportunities
          </p>

          {/* Key areas */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
              <span className="text-slate-400 text-sm">Focus:</span>
              <span className="text-white ml-2">EO-1 Limitations</span>
            </div>
            <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
              <span className="text-slate-400 text-sm">Research:</span>
              <span className="text-white ml-2">Cross-action-space</span>
            </div>
            <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
              <span className="text-slate-400 text-sm">Challenge:</span>
              <span className="text-white ml-2">Sim-to-Real Gap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <Section id="limitations" title="" className="py-12">
        <MarkdownRenderer content={limitationsContent} />
      </Section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800 text-center text-slate-400">
        <p>VLA Thesis Project - 2026</p>
      </footer>
    </div>
  )
}
