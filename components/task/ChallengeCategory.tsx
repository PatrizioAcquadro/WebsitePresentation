'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChallengeCard from './ChallengeCard'
import { Challenge } from '@/content/task-definition-data'

interface ChallengeCategoryProps {
  title: string
  icon: ReactNode
  challenges: Challenge[]
  defaultExpanded?: boolean
  index: number
}

export default function ChallengeCategory({
  title,
  icon,
  challenges,
  defaultExpanded = true,
  index,
}: ChallengeCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // Count by severity for summary
  const criticalCount = challenges.filter((c) => c.severity === 'Critical').length
  const highCount = challenges.filter((c) => c.severity === 'High').length
  const mediumCount = challenges.filter((c) => c.severity === 'Medium').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8 last:mb-0"
    >
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 md:gap-4 mb-4 group"
      >
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center text-[#FF6D29]">
          {icon}
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-white flex-1 text-left">{title}</h3>

        {/* Severity summary badges */}
        <div className="hidden sm:flex gap-2">
          {criticalCount > 0 && (
            <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
              {criticalCount} Critical
            </span>
          )}
          {highCount > 0 && (
            <span className="px-2 py-0.5 text-xs bg-[#FF6D29]/20 text-[#FF6D29] rounded-full border border-[#FF6D29]/30">
              {highCount} High
            </span>
          )}
          {mediumCount > 0 && (
            <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
              {mediumCount} Medium
            </span>
          )}
        </div>

        {/* Expand/collapse icon */}
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-[#BABABA]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      {/* Challenge cards grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {challenges.map((challenge, idx) => (
                <ChallengeCard
                  key={challenge.name}
                  name={challenge.name}
                  description={challenge.description}
                  severity={challenge.severity}
                  index={idx}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
