'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  variant?: 'default' | 'darker'
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  variant = 'default',
}: SectionWrapperProps) {
  const bgColor = variant === 'darker' ? 'bg-[#1d1a1d]' : 'bg-[#161316]'

  return (
    <section id={id} className={`relative py-20 md:py-24 px-4 ${bgColor} overflow-hidden`}>
      {/* Gradient divider at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6D29]/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#BABABA] text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Section content */}
        {children}
      </div>
    </section>
  )
}
