'use client'

import { motion } from 'framer-motion'
import { Subphase } from '@/content/roadmap-data'

interface TimelineItemProps {
  subphase: Subphase
  index: number
  isLeft: boolean
}

export default function TimelineItem({ subphase, index, isLeft }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative flex items-center gap-0
        ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
        flex-row
      `}
    >
      {/* Content Card */}
      <div
        className={`
          flex-1 md:max-w-md
          bg-gradient-to-br from-[#1d1a1d] to-[#161316]
          border border-[#453027] rounded-2xl
          hover:border-[#FF6D29]/30 transition-colors
          overflow-hidden
        `}
      >
        {/* Header with title and time estimate */}
        <div className="p-4 md:p-5 border-b border-[#453027]/50">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <span className="text-[#BABABA] text-xs font-medium">{subphase.id}</span>
              <h4 className="text-white font-semibold text-sm md:text-base mt-1">
                {subphase.title}
              </h4>
            </div>
            <span className="text-[#FF6D29] font-semibold text-sm whitespace-nowrap">
              {subphase.estimatedDays} days
            </span>
          </div>
        </div>

        {/* Tasks list */}
        <div className="p-4 md:p-5 space-y-3">
          {subphase.tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D29] mt-2 shrink-0" />
              <div>
                <span className="text-white text-sm">{task.title}</span>
                <span className="text-[#BABABA] text-xs block mt-0.5">
                  {task.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal connector line - visible on md+ */}
      <div className="hidden md:block w-8 h-0.5 bg-[#FF6D29]/70 flex-shrink-0" />

      {/* Spacer for opposite side - visible on md+ */}
      <div className="hidden md:block flex-1 max-w-md" />
    </motion.div>
  )
}
