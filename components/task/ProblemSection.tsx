'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChallengeDimension } from '@/content/problem-data'

interface ProblemSectionProps {
  dimensions: ChallengeDimension[]
}

export default function ProblemSection({ dimensions }: ProblemSectionProps) {
  const topRow = dimensions.slice(0, 3)
  const bottomRow = dimensions.slice(3, 6)

  return (
    <div>
      {/* Top row — overlaps into image via negative bottom margin */}
      <div className="relative z-10 mb-[-4rem] md:mb-[-5rem]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topRow.map((dim, index) => (
            <DimensionCard key={dim.id} dim={dim} index={index} />
          ))}
        </div>
      </div>

      {/* Image with fading edges on all sides */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full"
      >
        <Image
          src="/BimanualManipulation.png"
          alt="Humanoid robot performing bimanual manipulation — two robotic hands coordinating on a shared assembly task"
          width={1200}
          height={675}
          className="w-full h-auto"
          quality={85}
        />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-[#1d1a1d] via-[#1d1a1d]/80 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#1d1a1d] via-[#1d1a1d]/80 to-transparent" />
        {/* Left fade */}
        <div className="absolute top-0 bottom-0 left-0 w-[20%] bg-gradient-to-r from-[#1d1a1d] to-transparent" />
        {/* Right fade */}
        <div className="absolute top-0 bottom-0 right-0 w-[20%] bg-gradient-to-l from-[#1d1a1d] to-transparent" />
      </motion.div>

      {/* Bottom row — overlaps into image via negative top margin */}
      <div className="relative z-10 mt-[-4rem] md:mt-[-5rem]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {bottomRow.map((dim, index) => (
            <DimensionCard key={dim.id} dim={dim} index={index + 3} />
          ))}
        </div>
      </div>
    </div>
  )
}

function DimensionCard({ dim, index }: { dim: ChallengeDimension; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      className="
        p-4 md:p-5 rounded-xl
        bg-[#1d1a1d]/85 backdrop-blur-sm
        border border-[#453027]/50
        hover:border-[#FF6D29]/30 transition-colors duration-300
      "
    >
      <h3 className="text-sm md:text-base font-semibold text-white mb-2 leading-snug">
        {dim.title}
      </h3>
      <p className="text-xs md:text-sm text-[#BABABA] leading-relaxed">
        {dim.description}
      </p>
    </motion.div>
  )
}
