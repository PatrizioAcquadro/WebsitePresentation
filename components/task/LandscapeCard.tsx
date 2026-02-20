'use client'

import { motion } from 'framer-motion'
import { ManipulationApproach } from '@/content/landscape-data'

// Icons for each approach type
const icons: Record<ManipulationApproach['iconType'], React.ReactNode> = {
  rl: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
    </svg>
  ),
  imitation: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  vla: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  modular: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25L12 17.25 2.25 12l4.179-2.25m11.142 0l4.179 2.25L12 22.5l-9.75-5.25 4.179-2.25" />
    </svg>
  ),
}

interface LandscapeCardProps {
  approach: ManipulationApproach
  index: number
}

export default function LandscapeCard({ approach, index }: LandscapeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="
        bg-gradient-to-br from-[#1d1a1d] to-[#161316] rounded-2xl overflow-hidden
        border border-[#453027]/50 transition-colors duration-300 flex flex-col
        hover:border-[#FF6D29]/30
      "
    >
      {/* Header */}
      <div className="p-4 border-b border-[#453027]/50">
        <div className="
          w-10 h-10 rounded-xl flex items-center justify-center mb-3
          bg-[#453027]/30 border border-[#453027] text-[#BABABA]
        ">
          {icons[approach.iconType]}
        </div>
        <h3 className="text-base md:text-lg font-semibold mb-2 text-white">
          {approach.name}
        </h3>
        <p className="text-sm md:text-base text-[#BABABA]/85 leading-relaxed">{approach.definition}</p>
      </div>

      {/* Strengths & Limitations — stacked vertically */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Strengths */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400/80">Strengths</span>
          </div>
          <ul className="space-y-1.5">
            {approach.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm md:text-base text-[#BABABA]">
                <span className="text-green-500/60 mt-0.5 shrink-0">+</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400/80">Limitations</span>
          </div>
          <ul className="space-y-1.5">
            {approach.limitations.map((l, i) => (
              <li key={i} className="flex items-start gap-2 text-sm md:text-base text-[#BABABA]">
                <span className="text-red-400/60 mt-0.5 shrink-0">&minus;</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
