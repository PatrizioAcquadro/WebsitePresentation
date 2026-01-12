'use client'

import { motion } from 'framer-motion'

interface DateBadgeProps {
  date: string
  position: 'start' | 'end'
}

export default function DateBadge({ date, position }: DateBadgeProps) {
  const isStart = position === 'start'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex justify-center"
    >
      <div
        className={`
          relative px-6 py-3 rounded-xl
          bg-gradient-to-br from-[#1d1a1d] to-[#161316]
          border-2 ${isStart ? 'border-[#FF6D29]/40' : 'border-green-500/40'}
          shadow-lg ${isStart ? 'shadow-[#FF6D29]/10' : 'shadow-green-500/10'}
        `}
      >
        <span
          className={`
            text-xs font-semibold uppercase tracking-wider
            ${isStart ? 'text-[#FF6D29]' : 'text-green-400'}
          `}
        >
          {isStart ? 'Start' : 'End'}
        </span>
        <div className="text-white font-medium mt-1">{date}</div>
      </div>
    </motion.div>
  )
}
