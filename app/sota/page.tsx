import Section from '@/components/Section'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { sotaContent } from '@/content/sota-identification'
import Link from 'next/link'

export default function SotaPage() {
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
            SOTA Identification & Selection
          </h1>
          <p className="text-lg text-slate-300">
            Comprehensive VLA landscape analysis and EO-1 selection rationale
          </p>

          {/* Key highlights */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
              <span className="text-slate-400 text-sm">Selected:</span>
              <span className="text-white ml-2">EO-1 (Oct 2025)</span>
            </div>
            <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
              <span className="text-slate-400 text-sm">LIBERO:</span>
              <span className="text-white ml-2">98.2% overall</span>
            </div>
            <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
              <span className="text-slate-400 text-sm">Backbone:</span>
              <span className="text-white ml-2">Qwen 2.5 VL (3B)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <Section id="sota" title="" className="py-12">
        <MarkdownRenderer content={sotaContent} />
      </Section>
    </div>
  )
}
