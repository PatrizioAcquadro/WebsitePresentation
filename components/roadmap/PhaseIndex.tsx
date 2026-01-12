'use client'

import { motion } from 'framer-motion'
import { Phase } from '@/content/roadmap-data'

interface PhaseIndexProps {
  phases: Phase[]
}

export default function PhaseIndex({ phases }: PhaseIndexProps) {
  const handleClick = (phaseId: number) => {
    const element = document.getElementById(`phase-${phaseId}`)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden"
    >
      <div className="divide-y divide-[#453027]/50">
        {phases.map((phase, index) => (
          <motion.button
            key={phase.id}
            onClick={() => handleClick(phase.id)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="w-full flex flex-col sm:flex-row sm:items-center justify-between px-5 md:px-6 py-4 text-left hover:bg-[#453027]/20 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center text-[#FF6D29] text-sm font-semibold group-hover:bg-[#FF6D29]/20 transition-colors shrink-0">
                {phase.id}
              </span>
              <div>
                <span className="text-white font-medium group-hover:text-[#FF6D29] transition-colors">
                  {phase.title}
                </span>
                <span className="text-[#BABABA] text-sm ml-3 hidden sm:inline">
                  {phase.duration}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2 sm:mt-0 ml-12 sm:ml-0">
              <span className="text-[#BABABA] text-sm">
                {phase.startDate} - {phase.endDate}
              </span>
              <svg
                className="w-4 h-4 text-[#BABABA] group-hover:text-[#FF6D29] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
