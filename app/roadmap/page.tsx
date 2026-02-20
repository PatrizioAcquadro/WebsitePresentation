'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/task/SectionWrapper'
import PhaseIndex from '@/components/roadmap/PhaseIndex'
import PhaseSection from '@/components/roadmap/PhaseSection'
import SuccessCriteriaCards from '@/components/roadmap/SuccessCriteriaCards'
import MetricTable from '@/components/task/MetricTable'
import { roadmapData } from '@/content/roadmap-data'
import { metricCategories } from '@/content/task-definition-data'

export default function RoadmapPage() {
  return (
    <div className="pt-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-[#1d1a1d] to-[#161316] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-[#BABABA] hover:text-[#FF6D29] mb-6 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
              Project Roadmap
            </h1>
            <p className="text-lg text-[#BABABA] max-w-3xl">
              13-week execution plan for EO-1 replication on bimanual LEGO assembly
            </p>

            {/* Timeline badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
                <span className="text-[#BABABA] text-sm">Start:</span>
                <span className="text-white ml-2">
                  {roadmapData.projectMeta.startDate}
                </span>
              </div>
              <div className="px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
                <span className="text-[#BABABA] text-sm">End:</span>
                <span className="text-white ml-2">
                  {roadmapData.projectMeta.endDate}
                </span>
              </div>
              <div className="px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
                <span className="text-[#BABABA] text-sm">Duration:</span>
                <span className="text-white ml-2">
                  {roadmapData.projectMeta.duration}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Phase Index (clickable navigation) */}
      <SectionWrapper
        id="phase-index"
        title="Phase Overview"
        subtitle="Click any phase to navigate to its detailed timeline"
      >
        <PhaseIndex phases={roadmapData.phases} />
      </SectionWrapper>

      {/* Individual Phase Sections */}
      <div className="px-4 bg-[#161316]">
        <div className="max-w-6xl mx-auto">
          {roadmapData.phases.map((phase) => (
            <PhaseSection key={phase.id} phase={phase} />
          ))}
        </div>
      </div>

      {/* Success Criteria */}
      <SectionWrapper
        id="success-criteria"
        title="Success Criteria"
        subtitle="Evaluation benchmarks for project outcomes at Week 13"
        variant="darker"
      >
        <SuccessCriteriaCards criteria={roadmapData.successCriteria} />

        {/* Success Metrics (moved from Task page) */}
        <div className="mt-16 pt-12 border-t border-[#453027]/30">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">Success Metrics</h3>
            <p className="text-[#BABABA] text-base md:text-lg max-w-2xl mx-auto">
              Evaluation criteria for task completion, efficiency, and generalization
            </p>
          </div>
          <div className="space-y-6 md:space-y-8">
            {metricCategories.map((category, index) => (
              <MetricTable
                key={category.title}
                title={category.title}
                description={category.description}
                metrics={category.metrics}
                index={index}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
