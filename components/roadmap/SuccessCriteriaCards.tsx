'use client'

import { motion } from 'framer-motion'
import { SuccessCriteria } from '@/content/roadmap-data'

const levelStyles = {
  minimum: {
    gradient: 'from-yellow-500/10 to-yellow-500/5',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-400',
    iconBg: 'bg-yellow-500/20',
  },
  target: {
    gradient: 'from-[#FF6D29]/10 to-[#FF6D29]/5',
    border: 'border-[#FF6D29]/30',
    accent: 'text-[#FF6D29]',
    iconBg: 'bg-[#FF6D29]/20',
  },
  stretch: {
    gradient: 'from-green-500/10 to-green-500/5',
    border: 'border-green-500/30',
    accent: 'text-green-400',
    iconBg: 'bg-green-500/20',
  },
}

// Icons for each level
const MinimumIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const TargetIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
    />
  </svg>
)

const StretchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

const iconMap = {
  minimum: MinimumIcon,
  target: TargetIcon,
  stretch: StretchIcon,
}

interface SuccessCriteriaCardsProps {
  criteria: SuccessCriteria[]
}

export default function SuccessCriteriaCards({ criteria }: SuccessCriteriaCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {criteria.map((item, index) => {
        const styles = levelStyles[item.level]
        const Icon = iconMap[item.level]

        return (
          <motion.div
            key={item.level}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`
              bg-gradient-to-b ${styles.gradient}
              border ${styles.border} rounded-2xl
              p-5 md:p-6
            `}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#453027]/50">
              <div className={`w-10 h-10 rounded-xl ${styles.iconBg} flex items-center justify-center ${styles.accent}`}>
                <Icon />
              </div>
              <h3 className={`font-semibold ${styles.accent}`}>{item.title}</h3>
            </div>

            {/* Items */}
            <ul className="space-y-3">
              {item.items.map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`${styles.accent} mt-1 shrink-0`}></span>
                  <span className="text-[#BABABA] text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
