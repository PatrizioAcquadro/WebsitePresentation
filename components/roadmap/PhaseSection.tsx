'use client'

import { motion } from 'framer-motion'
import { Phase } from '@/content/roadmap-data'
import DateBadge from './DateBadge'
import TimelineItem from './TimelineItem'

interface PhaseSectionProps {
  phase: Phase
}

export default function PhaseSection({ phase }: PhaseSectionProps) {
  return (
    <section
      id={`phase-${phase.id}`}
      className="py-16 md:py-20 scroll-mt-20"
    >
      {/* Gradient divider at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#FF6D29]/20 to-transparent mb-12" />

      {/* Phase Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          Phase {phase.id}: {phase.title}
        </h2>
        <p className="text-[#BABABA] text-base md:text-lg max-w-2xl mx-auto">
          {phase.goal}
        </p>

        {/* Resource badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <div className="px-3 py-1.5 bg-[#453027]/30 border border-[#453027] rounded-lg">
            <span className="text-[#BABABA] text-xs">GPU:</span>
            <span className="text-white text-sm ml-2">{phase.resources.gpuHours} hrs</span>
          </div>
          <div className="px-3 py-1.5 bg-[#453027]/30 border border-[#453027] rounded-lg">
            <span className="text-[#BABABA] text-xs">Focus:</span>
            <span className="text-white text-sm ml-2">{phase.resources.purpose}</span>
          </div>
          <div className="px-3 py-1.5 bg-[#453027]/30 border border-[#453027] rounded-lg">
            <span className="text-[#BABABA] text-xs">Duration:</span>
            <span className="text-white text-sm ml-2">{phase.duration}</span>
          </div>
        </div>
      </motion.div>

      {/* Timeline Container with integrated date badges */}
      <div className="relative">
        {/* Central vertical line - visible on md+, connects from start to end date */}
        <div className="hidden md:block absolute left-1/2 top-[28px] bottom-[28px] w-0.5 bg-gradient-to-b from-[#FF6D29]/70 via-[#FF6D29]/50 to-[#FF6D29]/70 -translate-x-1/2" />

        {/* Mobile left line */}
        <div className="md:hidden absolute left-4 top-[28px] bottom-[28px] w-0.5 bg-gradient-to-b from-[#FF6D29]/70 via-[#FF6D29]/50 to-[#FF6D29]/70" />

        {/* Start Date */}
        <DateBadge date={phase.startDate} position="start" />

        {/* Timeline items */}
        <div className="relative space-y-8 md:space-y-6 py-8">
          {phase.subphases.map((subphase, i) => (
            <TimelineItem
              key={subphase.id}
              subphase={subphase}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>

        {/* End Date */}
        <DateBadge date={phase.endDate} position="end" />
      </div>

      {/* Milestone (if exists) */}
      {phase.milestone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 max-w-lg mx-auto"
        >
          <div className="p-4 bg-[#FF6D29]/5 border border-[#FF6D29]/20 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-[#FF6D29]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <span className="text-[#FF6D29] font-semibold text-sm">
                Phase {phase.id} Milestone
              </span>
            </div>
            <h4 className="text-white font-medium">{phase.milestone.title}</h4>
            <p className="text-[#BABABA] text-sm mt-1">
              {phase.milestone.keyDeliverable}
            </p>
            <p className="text-green-400 text-xs mt-2">
              Go/No-Go: {phase.milestone.goNoGoCriteria}
            </p>
          </div>
        </motion.div>
      )}
    </section>
  )
}
