'use client'

import { motion } from 'framer-motion'

interface ChallengeCardProps {
  name: string
  description: string
  severity: 'Critical' | 'High' | 'Medium'
  index: number
}

const severityConfig = {
  Critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    badge: 'bg-red-500/20 text-red-400 border-red-500/40',
    glow: 'hover:shadow-red-500/10',
  },
  High: {
    bg: 'bg-[#FF6D29]/10',
    border: 'border-[#FF6D29]/30',
    badge: 'bg-[#FF6D29]/20 text-[#FF6D29] border-[#FF6D29]/40',
    glow: 'hover:shadow-[#FF6D29]/10',
  },
  Medium: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
    glow: 'hover:shadow-yellow-500/10',
  },
}

export default function ChallengeCard({ name, description, severity, index }: ChallengeCardProps) {
  const config = severityConfig[severity]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`
        p-4 md:p-5 rounded-xl border ${config.border} ${config.bg}
        hover:shadow-lg ${config.glow} transition-all duration-300
        group cursor-default
      `}
    >
      {/* Header with name and badge */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-semibold text-white text-sm md:text-base group-hover:text-[#FF6D29] transition-colors">
          {name}
        </h4>
        <span
          className={`
          px-2 py-0.5 text-xs font-medium rounded-full border shrink-0
          ${config.badge}
        `}
        >
          {severity}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm text-[#BABABA] leading-relaxed">{description}</p>
    </motion.div>
  )
}
