'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CoordinationMode } from '@/content/task-definition-data'

interface CoordinationModeCardProps {
  mode: CoordinationMode
  index: number
}

export default function CoordinationModeCard({ mode, index }: CoordinationModeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden hover:border-[#FF6D29]/30 transition-colors"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 md:p-6 flex items-start gap-4 text-left"
      >
        {/* Number indicator */}
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center shrink-0">
          <span className="text-[#FF6D29] font-semibold text-lg">{mode.id}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base md:text-lg font-semibold text-white mb-1">{mode.name}</h4>
          <p className="text-sm text-[#BABABA]">{mode.description}</p>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#FF6D29] shrink-0 mt-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      {/* Expandable example */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2 border-t border-[#453027]/50">
              <div className="flex items-start gap-2">
                <span className="text-[#FF6D29] text-sm font-medium shrink-0">Example:</span>
                <p className="text-sm text-[#BABABA]">{mode.example}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
