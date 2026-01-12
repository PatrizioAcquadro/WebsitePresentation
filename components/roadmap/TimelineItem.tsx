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
      className="relative flex items-center"
    >
      {/* Left side */}
      <div className={`hidden md:flex flex-1 items-center ${isLeft ? 'justify-end' : 'justify-start'}`}>
        {isLeft ? (
          <>
            {/* Content Card on left */}
            <div
              className="max-w-md w-full bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl hover:border-[#FF6D29]/30 transition-colors overflow-hidden"
            >
              <div className="p-4 md:p-5 border-b border-[#453027]/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-[#BABABA] text-sm font-medium">{subphase.id}</span>
                    <h4 className="text-white font-semibold text-base md:text-lg mt-1">
                      {subphase.title}
                    </h4>
                  </div>
                  <span className="text-[#FF6D29] font-semibold text-base whitespace-nowrap">
                    {subphase.estimatedDays} days
                  </span>
                </div>
              </div>
              <div className="p-4 md:p-5 space-y-3">
                {subphase.tasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D29] mt-2 shrink-0" />
                    <div>
                      <span className="text-white text-base">{task.title}</span>
                      <span className="text-[#BABABA] text-sm block mt-0.5">{task.deliverable}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Horizontal line from card to center */}
            <div className="w-8 h-0.5 bg-[#FF6D29]/70 flex-shrink-0" />
          </>
        ) : (
          /* Empty spacer when card is on right */
          <div className="max-w-md w-full" />
        )}
      </div>

      {/* Right side */}
      <div className={`hidden md:flex flex-1 items-center ${isLeft ? 'justify-end' : 'justify-start'}`}>
        {!isLeft ? (
          <>
            {/* Horizontal line from center to card */}
            <div className="w-8 h-0.5 bg-[#FF6D29]/70 flex-shrink-0" />
            {/* Content Card on right */}
            <div
              className="max-w-md w-full bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl hover:border-[#FF6D29]/30 transition-colors overflow-hidden"
            >
              <div className="p-4 md:p-5 border-b border-[#453027]/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-[#BABABA] text-sm font-medium">{subphase.id}</span>
                    <h4 className="text-white font-semibold text-base md:text-lg mt-1">
                      {subphase.title}
                    </h4>
                  </div>
                  <span className="text-[#FF6D29] font-semibold text-base whitespace-nowrap">
                    {subphase.estimatedDays} days
                  </span>
                </div>
              </div>
              <div className="p-4 md:p-5 space-y-3">
                {subphase.tasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D29] mt-2 shrink-0" />
                    <div>
                      <span className="text-white text-base">{task.title}</span>
                      <span className="text-[#BABABA] text-sm block mt-0.5">{task.deliverable}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Empty spacer when card is on left */
          <div className="max-w-md w-full" />
        )}
      </div>

      {/* Mobile layout - card only, no timeline */}
      <div className="md:hidden flex-1">
        <div
          className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl hover:border-[#FF6D29]/30 transition-colors overflow-hidden"
        >
          <div className="p-4 border-b border-[#453027]/50">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-[#BABABA] text-sm font-medium">{subphase.id}</span>
                <h4 className="text-white font-semibold text-base mt-1">{subphase.title}</h4>
              </div>
              <span className="text-[#FF6D29] font-semibold text-base whitespace-nowrap">
                {subphase.estimatedDays} days
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {subphase.tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D29] mt-2 shrink-0" />
                <div>
                  <span className="text-white text-base">{task.title}</span>
                  <span className="text-[#BABABA] text-sm block mt-0.5">{task.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
