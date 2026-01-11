'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExpandableCardProps {
  icon: ReactNode
  title: string
  summary: string
  children: ReactNode
  defaultExpanded?: boolean
}

export default function ExpandableCard({
  icon,
  title,
  summary,
  children,
  defaultExpanded = false,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden hover:border-[#FF6D29]/30 transition-colors"
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 md:p-6 flex items-start gap-4 text-left"
      >
        {/* Icon */}
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center text-[#FF6D29] shrink-0">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-[#BABABA] text-sm">{summary}</p>
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

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2 border-t border-[#453027]/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
