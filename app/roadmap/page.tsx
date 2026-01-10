import Section from '@/components/Section'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { roadmapContent } from '@/content/roadmap'
import Link from 'next/link'

export default function RoadmapPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1d1a1d] to-[#161316] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-[#BABABA] hover:text-[#FF6D29] mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
            Project Roadmap
          </h1>
          <p className="text-lg text-[#BABABA]">
            13-week execution plan for EO-1 replication on bimanual LEGO assembly
          </p>

          {/* Timeline overview */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
              <span className="text-[#BABABA] text-sm">Start:</span>
              <span className="text-white ml-2">Jan 10, 2026</span>
            </div>
            <div className="px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
              <span className="text-[#BABABA] text-sm">End:</span>
              <span className="text-white ml-2">Apr 4, 2026</span>
            </div>
            <div className="px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
              <span className="text-[#BABABA] text-sm">Duration:</span>
              <span className="text-white ml-2">13 weeks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <Section id="roadmap" title="" className="py-12">
        <MarkdownRenderer content={roadmapContent} />
      </Section>
    </div>
  )
}
