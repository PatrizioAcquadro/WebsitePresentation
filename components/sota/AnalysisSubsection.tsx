'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnalysisSection } from '@/content/sota-data'

// Icon components for each section type
const ModelIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
)

const TrainingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)

const DataIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
)

const iconMap = {
  model: ModelIcon,
  training: TrainingIcon,
  data: DataIcon,
}

interface AnalysisSubsectionProps {
  section: AnalysisSection
  index: number
}

export default function AnalysisSubsection({ section, index }: AnalysisSubsectionProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0) // First section expanded by default
  const Icon = iconMap[section.iconType]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden"
    >
      {/* Header - clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 md:p-6 flex items-center gap-4 text-left hover:bg-[#453027]/10 transition-colors"
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center shrink-0">
          <span className="text-[#FF6D29]">
            <Icon />
          </span>
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-white">{section.title}</h3>
          <p className="text-sm text-[#BABABA] mt-1">
            {section.content.length} key concepts
          </p>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#FF6D29] shrink-0"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-[#453027]/50">
              {/* Content items */}
              <div className="mt-5 space-y-4">
                {section.content.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6D29] mt-2 shrink-0" />
                    <div>
                      <span className="text-white font-medium text-sm">{item.heading}:</span>
                      <span className="text-[#BABABA] text-sm ml-1">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* LEGO Implications callout */}
              <div className="mt-6 p-4 bg-[#FF6D29]/5 border border-[#FF6D29]/20 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                  <h4 className="text-sm font-semibold text-[#FF6D29]">LEGO Assembly Implications</h4>
                </div>
                <ul className="space-y-2">
                  {section.legoImplications.map((implication, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#BABABA]">
                      <span className="text-[#FF6D29] mt-0.5">→</span>
                      {implication}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
